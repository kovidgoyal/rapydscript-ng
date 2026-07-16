// AST serialization/deserialization for RapydScript.
//
// Strategy: flat node pool. Every unique AST object is assigned a numeric index.
// Child references are stored as {_n: idx}. Pre-registering each node before
// serializing its properties handles shared references (e.g. AST_Class.init
// pointing to a node also in body) and self-referential structures (e.g.
// AST_Toplevel.imports["__main__"] pointing back to itself) without infinite
// recursion.
//
// Properties skipped (SymbolDef back-references or redundant):
//   scope   - AST_Symbol/AST_Directive back-ref to ancestor scope
//   globals - AST_Toplevel SymbolDef map (not needed for code generation)
//   exports - AST_Toplevel SymbolDef array (used only for non-main modules)
//
// thedef on AST_Symbol is handled specially: if it is an AST node (class
// variables get thedef=AST_SymbolDefun whose .name is "Cls.prototype.var"),
// it is serialized as a normal node reference; otherwise it is a SymbolDef
// plain object and only its .name/.mangled_name are preserved (as a compact
// stub), because those are the only fields read by code generation.
//
// AST_Import.body is a lazy getter returning another module's full AST_Toplevel;
// already captured in AST_Toplevel.imports — skipped to avoid duplication.
//
// AST_RegExp.value is a live RegExp object; serialized as {_re: source, _rf: flags}.

'use strict';

const SKIP_PROPS = new Set(['scope', 'globals', 'exports']);
// AST_Toplevel.imports is the global shared imported_modules dict (all modules
// across the entire compilation, including back-references to itself).  It is
// rebuilt at load time and must not be serialized.
const SKIP_PER_TYPE = {
    AST_Import:    new Set(['body']),
    AST_Toplevel:  new Set(['imports']),
};
const RE_TAG = '[object RegExp]';

function is_ast_node(val) {
    return (
        val !== null &&
        typeof val === 'object' &&
        typeof val.constructor === 'function' &&
        val.constructor.name.startsWith('AST_')
    );
}

function is_regexp(val) {
    return Object.prototype.toString.call(val) === RE_TAG;
}

// Walk the prototype chain collecting all keys from each class's `properties` dict.
function collect_declared_keys(node) {
    const keys = new Set();
    let proto = node;
    while ((proto = Object.getPrototypeOf(proto)) !== null) {
        if (Object.prototype.hasOwnProperty.call(proto, 'properties')) {
            for (const k of Object.keys(proto.properties)) keys.add(k);
        }
    }
    return keys;
}

// ─── Serialization ───────────────────────────────────────────────────────────

function ser_val(val, pool, seen) {
    if (val === null || val === undefined) return null;
    const t = typeof val;
    if (t === 'string' || t === 'boolean' || t === 'number') return val;
    if (is_regexp(val)) {
        return { _re: val.source, _rf: (val.flags !== undefined ? val.flags : '') };
    }
    if (Array.isArray(val)) {
        return val.map(el => ser_val(el, pool, seen));
    }
    if (is_ast_node(val)) {
        return { _n: ser_node(val, pool, seen) };
    }
    // Plain object: defaults dict, classvars, static dict, baselib, etc.
    const out = {};
    for (const k of Object.keys(val)) {
        out[k] = ser_val(val[k], pool, seen);
    }
    return out;
}

function ser_node(node, pool, seen) {
    if (seen.has(node)) return seen.get(node);
    const idx = pool.length;
    pool.push(null);   // placeholder — must be pushed before recursive calls
    seen.set(node, idx);

    const type_name = node.constructor.name;
    const per_type_skip = SKIP_PER_TYPE[type_name];
    const p = {};

    for (const key of collect_declared_keys(node)) {
        if (SKIP_PROPS.has(key)) continue;
        if (per_type_skip && per_type_skip.has(key)) continue;
        const val = node[key];
        if (val === undefined) continue;
        // thedef: AST node (class-variable case) or SymbolDef plain object.
        // For SymbolDef only preserve name+mangled_name; avoid serializing
        // its scope/orig/refs back-references to keep JSON compact.
        if (key === 'thedef') {
            if (is_ast_node(val)) {
                p.thedef = { _n: ser_node(val, pool, seen) };
            } else if (val !== null && typeof val.name === 'string') {
                p.thedef = { _td: 1, _n: val.name, _mn: val.mangled_name || null };
            }
        } else {
            p[key] = ser_val(val, pool, seen);
        }
    }

    pool[idx] = { t: type_name, p };
    return idx;
}

// ─── Deserialization ──────────────────────────────────────────────────────────

// Returns a pair of mutually-recursive functions bound to a specific
// compiler_exports + pool + built triple.
function make_deserializer(compiler_exports, pool, built) {
    function dv(val) {
        if (val === null || val === undefined) return null;
        const t = typeof val;
        if (t === 'string' || t === 'boolean' || t === 'number') return val;
        if (Array.isArray(val)) return val.map(dv);
        if (t === 'object') {
            const keys = Object.keys(val);
            // Node reference sentinel: exactly {"_n": <non-negative integer>}
            if (keys.length === 1 && keys[0] === '_n' && Number.isInteger(val._n) && val._n >= 0) {
                return bn(val._n);
            }
            // RegExp sentinel: exactly {"_re": string, "_rf": string}
            if (keys.length === 2 && Object.prototype.hasOwnProperty.call(val, '_re') &&
                    Object.prototype.hasOwnProperty.call(val, '_rf')) {
                return new RegExp(val._re, val._rf);
            }
            // SymbolDef stub: {"_td": 1, "_n": name_string, "_mn": mangled_name|null}
            if (val._td === 1 && typeof val._n === 'string') {
                return { name: val._n, mangled_name: val._mn || null };
            }
            // Plain object
            const out = {};
            for (const k of keys) out[k] = dv(val[k]);
            return out;
        }
        return val;
    }

    function bn(idx) {
        if (built[idx] !== null) return built[idx];
        const { t, p } = pool[idx];
        const cls = compiler_exports[t];
        if (!cls) throw new Error('ast_from_json: unknown AST type "' + t + '"');
        // Create instance without the constructor to avoid side-effects.
        const node = Object.create(cls.prototype);
        built[idx] = node;  // register BEFORE filling props (handles shared/self refs)
        for (const k of Object.keys(p)) node[k] = dv(p[k]);
        // imports is the global shared dict, skipped during serialization.
        // Set a minimal self-referential default so print() works in standalone
        // contexts (e.g. tests).  The module-cache loader overwrites this with
        // the full imported_modules dict after calling ast_from_json.
        if (t === 'AST_Toplevel' && !node.imports) {
            node.imports = {};
            if (node.module_id) node.imports[node.module_id] = node;
        }
        return node;
    }

    return bn;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function make_ast_serializer(compiler_exports) {
    function ast_to_json(root) {
        const pool = [];
        const seen = new WeakMap();
        ser_node(root, pool, seen);
        return { v: 1, nodes: pool, root: 0 };
    }

    function ast_from_json(data) {
        if (data.v !== 1) {
            throw new Error('ast_from_json: unsupported version ' + data.v);
        }
        const built = new Array(data.nodes.length).fill(null);
        const bn = make_deserializer(compiler_exports, data.nodes, built);
        return bn(data.root);
    }

    return { ast_to_json, ast_from_json };
}
