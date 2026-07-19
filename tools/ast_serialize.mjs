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
    // file is redundant on every token — filled in from AST_Toplevel.filename at load time
    AST_Token:     new Set(['file']),
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

const _declared_keys_cache = new Map();

// Walk the prototype chain collecting all keys from each class's `properties` dict.
function collect_declared_keys(node) {
    const cls = node.constructor;
    if (_declared_keys_cache.has(cls)) return _declared_keys_cache.get(cls);
    const keys = new Set();
    let proto = node;
    while ((proto = Object.getPrototypeOf(proto)) !== null) {
        if (Object.prototype.hasOwnProperty.call(proto, 'properties')) {
            for (const k of Object.keys(proto.properties)) keys.add(k);
        }
    }
    _declared_keys_cache.set(cls, keys);
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
        if (t !== 'object') return val;
        if (Array.isArray(val)) return val.map(dv);
        // Fast sentinel detection without Object.keys allocation.
        // Node ref: {_n: integer}  — most common case, check first
        const vn = val._n;
        if (vn !== undefined) {
            if (typeof vn === 'number') return bn(vn);
            // SymbolDef stub: {_td: 1, _n: string, _mn: string|null}
            return { name: vn, mangled_name: val._mn || null };
        }
        // RegExp sentinel: {_re: string, _rf: string}
        if (val._re !== undefined) return new RegExp(val._re, val._rf || '');
        // Plain object (defaults, classvars, baselib, etc.)
        const out = {};
        for (const k of Object.keys(val)) out[k] = dv(val[k]);
        return out;
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

// ─── Binary format (RSPB v1) ─────────────────────────────────────────────────
//
// Header (16 bytes):
//   [0-3]   magic: 'R','S','P','B'
//   [4-5]   format version: uint16 LE = 1
//   [6-9]   string_count: uint32 LE
//   [10-13] node_count: uint32 LE
//   [14-15] reserved: 0
//
// String table (string_count entries):
//   uint16 LE byte-length + utf-8 bytes
//
// Node table (node_count entries, in serialization order):
//   uint16 LE type_idx, uint16 LE prop_count
//   [uint16 key_idx + value] * prop_count
//
// Value encoding (uint8 tag + payload):
//    0 NULL   1 FALSE   2 TRUE
//    3 INT_U8  +u8      4 INT_U16 +u16LE   5 INT_I32 +i32LE   6 FLOAT +f64LE
//    7 STR     +u32LE string_index
//    8 ARR     +u32LE count  + count*value
//    9 NODE    +u32LE node_index
//   10 OBJ     +u16LE count  + count*(u16 key_idx + value)
//   11 REGEXP  +u32LE source_idx  +u32LE flags_idx
//   12 SYMDEF  +u32LE name_idx  +u8 has_mangled  [+u32LE mangled_idx]
//
// Deserialization is two-pass: pass 1 allocates all node objects (so forward
// references resolve to the right instance), pass 2 fills their properties.

const RSPB_MAGIC = [0x52, 0x53, 0x50, 0x42];  // "RSPB"
const RSPB_VERSION = 1;

function ast_to_bin(root) {
    // Phase 1: build flat pool using existing serializer logic.
    const pool = [];
    const seen = new WeakMap();
    ser_node(root, pool, seen);

    // Phase 2: intern all strings into a string table.
    const strings = [];
    const str_map = new Map();

    function intern(s) {
        if (typeof s !== 'string') return 0;
        let i = str_map.get(s);
        if (i === undefined) { i = strings.length; strings.push(s); str_map.set(s, i); }
        return i;
    }

    function scan_val(val) {
        if (val === null || val === undefined) return;
        const t = typeof val;
        if (t === 'string') { intern(val); return; }
        if (t !== 'object') return;
        if (Array.isArray(val)) { for (const el of val) scan_val(el); return; }
        if (val._n !== undefined) {
            if (typeof val._n === 'string') { intern(val._n); if (val._mn) intern(val._mn); }
            return;
        }
        if (val._re !== undefined) { intern(val._re); intern(val._rf || ''); return; }
        for (const k of Object.keys(val)) { intern(k); scan_val(val[k]); }
    }

    for (const node of pool) {
        if (!node) continue;
        intern(node.t);
        for (const k of Object.keys(node.p)) { intern(k); scan_val(node.p[k]); }
    }

    // Phase 3: write binary into a growable Uint8Array.
    const te = new TextEncoder();
    let cap = 4 * 1024 * 1024;
    let buf = new Uint8Array(cap);
    let dv = new DataView(buf.buffer);
    let pos = 0;

    function ensure(n) {
        if (pos + n <= cap) return;
        cap = Math.max(cap * 2, pos + n);
        const nb = new Uint8Array(cap);
        nb.set(buf.subarray(0, pos));
        buf = nb;
        dv = new DataView(buf.buffer);
    }

    function w8(v)   { ensure(1); buf[pos++] = v & 0xFF; }
    function w16(v)  { ensure(2); dv.setUint16(pos, v, true); pos += 2; }
    function w32(v)  { ensure(4); dv.setUint32(pos, v >>> 0, true); pos += 4; }
    function wi32(v) { ensure(4); dv.setInt32(pos, v, true); pos += 4; }
    function wf64(v) { ensure(8); dv.setFloat64(pos, v, true); pos += 8; }

    // Header
    for (const b of RSPB_MAGIC) w8(b);
    w16(RSPB_VERSION);
    w32(strings.length);
    w32(pool.length);
    w16(0);  // reserved

    // String table
    for (const s of strings) {
        const bytes = te.encode(s);
        w16(bytes.length);
        ensure(bytes.length);
        buf.set(bytes, pos);
        pos += bytes.length;
    }

    // Value writer
    function write_val(val) {
        if (val === null || val === undefined) { w8(0); return; }
        const t = typeof val;
        if (t === 'boolean') { w8(val ? 2 : 1); return; }
        if (t === 'number') {
            if (Number.isInteger(val)) {
                if (val >= 0 && val <= 255)                           { w8(3); w8(val); }
                else if (val >= 0 && val <= 65535)                    { w8(4); w16(val); }
                else if (val >= -2147483648 && val <= 2147483647)     { w8(5); wi32(val); }
                else                                                   { w8(6); wf64(val); }
            } else { w8(6); wf64(val); }
            return;
        }
        if (t === 'string') { w8(7); w32(str_map.get(val)); return; }
        if (Array.isArray(val)) {
            w8(8); w32(val.length);
            for (const el of val) write_val(el);
            return;
        }
        // Sentinel objects from ser_val/ser_node
        if (val._n !== undefined) {
            if (typeof val._n === 'number') {
                w8(9); w32(val._n);
            } else {
                // SymbolDef stub: {_td:1, _n: name_str, _mn: mangled_str|null}
                w8(12);
                w32(str_map.get(val._n) || 0);
                if (val._mn) { w8(1); w32(str_map.get(val._mn) || 0); }
                else w8(0);
            }
            return;
        }
        if (val._re !== undefined) {
            w8(11); w32(str_map.get(val._re) || 0); w32(str_map.get(val._rf || '') || 0);
            return;
        }
        // Plain object (defaults dict, classvars, baselib, etc.)
        const keys = Object.keys(val);
        w8(10); w16(keys.length);
        for (const k of keys) { w16(str_map.get(k)); write_val(val[k]); }
    }

    // Node table
    for (const node of pool) {
        if (!node) { w16(0); w16(0); continue; }
        w16(str_map.get(node.t));
        const keys = Object.keys(node.p);
        w16(keys.length);
        for (const k of keys) { w16(str_map.get(k)); write_val(node.p[k]); }
    }

    return buf.subarray(0, pos);
}

// Combine metadata JSON string and binary AST into one Uint8Array:
//   <meta_json_str>\n<binary_ast>
function encode_cache(meta_json_str, root) {
    const te = new TextEncoder();
    const meta_bytes = te.encode(meta_json_str + '\n');
    const ast_bytes = ast_to_bin(root);
    const out = new Uint8Array(meta_bytes.length + ast_bytes.length);
    out.set(meta_bytes, 0);
    out.set(ast_bytes, meta_bytes.length);
    return out;
}

// Split a cache entry (Uint8Array or legacy string) into {meta: string, ast}.
// For binary data: ast is a Uint8Array (subarray — zero-copy).
// For legacy string data: ast is a string (old JSON format) or null (no newline).
// Returns null if data is falsy.
function decode_cache(data) {
    if (!data) return null;
    if (typeof data === 'string') {
        const nl = data.indexOf('\n');
        if (nl < 0) return { meta: data, ast: null };
        return { meta: data.slice(0, nl), ast: data.slice(nl + 1) };
    }
    // Uint8Array (or Buffer, which is a subclass of Uint8Array)
    let nl = -1;
    for (let i = 0; i < data.length; i++) { if (data[i] === 10) { nl = i; break; } }
    if (nl < 0) return null;
    const td = new TextDecoder();
    return { meta: td.decode(data.subarray(0, nl)), ast: data.subarray(nl + 1) };
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
        const root = bn(data.root);
        const filename = (root && root.filename) || null;
        for (const node of built) {
            if (node !== null && node.constructor && node.constructor.name === 'AST_Token') {
                node.file = filename;
            }
        }
        return root;
    }

    // Binary deserializer — needs compiler_exports to resolve AST class names.
    // Two-pass: pass 1 allocates node shells, pass 2 fills properties.
    // This lets forward references (node A references node B at a later index)
    // resolve to the correct already-allocated object without recursion.
    function ast_from_bin(buf) {
        const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        let pos = 0;
        function r8()   { return dv.getUint8(pos++); }
        function r16()  { const v = dv.getUint16(pos, true); pos += 2; return v; }
        function r32()  { const v = dv.getUint32(pos, true); pos += 4; return v; }
        function ri32() { const v = dv.getInt32(pos,  true); pos += 4; return v; }
        function rf64() { const v = dv.getFloat64(pos, true); pos += 8; return v; }

        if (r8()!==0x52||r8()!==0x53||r8()!==0x50||r8()!==0x42)
            throw new Error('ast_from_bin: invalid magic');
        const version = r16();
        if (version !== RSPB_VERSION)
            throw new Error('ast_from_bin: unsupported version ' + version);
        const str_count  = r32();
        const node_count = r32();
        r16();  // reserved

        // String table
        const td = new TextDecoder();
        const str_table = new Array(str_count);
        for (let i = 0; i < str_count; i++) {
            const len = r16();
            str_table[i] = td.decode(new Uint8Array(buf.buffer, buf.byteOffset + pos, len));
            pos += len;
        }

        const nodes_start = pos;

        // Pass 1: allocate all node objects without filling properties.
        const built = new Array(node_count);

        function skip_val() {
            switch (r8()) {
                case 0: case 1: case 2: break;
                case 3: pos += 1; break;
                case 4: pos += 2; break;
                case 5: pos += 4; break;
                case 6: pos += 8; break;
                case 7: pos += 4; break;
                case 8: { const n = r32(); for (let i = 0; i < n; i++) skip_val(); break; }
                case 9: pos += 4; break;
                case 10: { const n = r16(); for (let i = 0; i < n; i++) { pos += 2; skip_val(); } break; }
                case 11: pos += 8; break;
                case 12: pos += 4; if (r8()) pos += 4; break;
            }
        }

        for (let i = 0; i < node_count; i++) {
            const type_name = str_table[r16()];
            const prop_count = r16();
            const cls = compiler_exports[type_name];
            if (!cls) throw new Error('ast_from_bin: unknown AST type "' + type_name + '"');
            built[i] = Object.create(cls.prototype);
            for (let j = 0; j < prop_count; j++) { pos += 2; skip_val(); }
        }

        // Pass 2: fill properties. All nodes exist now so forward refs are safe.
        pos = nodes_start;

        function decode_val() {
            switch (r8()) {
                case 0:  return null;
                case 1:  return false;
                case 2:  return true;
                case 3:  return r8();
                case 4:  return r16();
                case 5:  return ri32();
                case 6:  return rf64();
                case 7:  return str_table[r32()];
                case 8:  { const n = r32(); const a = new Array(n); for (let i = 0; i < n; i++) a[i] = decode_val(); return a; }
                case 9:  return built[r32()];
                case 10: { const n = r16(); const o = {}; for (let i = 0; i < n; i++) { o[str_table[r16()]] = decode_val(); } return o; }
                case 11: return new RegExp(str_table[r32()], str_table[r32()]);
                case 12: { const name = str_table[r32()]; const mn = r8() ? str_table[r32()] : null; return { name, mangled_name: mn }; }
            }
        }

        for (let i = 0; i < node_count; i++) {
            pos += 2;  // skip type_idx (already consumed in pass 1)
            const prop_count = r16();
            const node = built[i];
            for (let j = 0; j < prop_count; j++) {
                node[str_table[r16()]] = decode_val();
            }
            if (node.constructor.name === 'AST_Toplevel' && !node.imports) {
                node.imports = {};
                if (node.module_id) node.imports[node.module_id] = node;
            }
        }

        const filename = built[0] ? (built[0].filename || null) : null;
        if (filename) {
            for (const node of built) {
                if (node.constructor.name === 'AST_Token') node.file = filename;
            }
        }

        return built[0];
    }

    // Properties deferred until first access of any of them — these are needed
    // by the code generator before or alongside body.
    const LAZY_PROPS = ['body', 'localvars', 'nonlocalvars'];

    // Create a lazy AST_Toplevel shell: metadata is available immediately,
    // body (and the rest of the full AST) is deserialized on first access of
    // any lazy prop.  Dead modules (never accessed by the tree-shaker) are
    // never deserialized.
    // ast_data: Uint8Array (binary, v9+), JSON string (v8 legacy), or
    //           already-parsed object (legacy bootstrap path).
    function make_lazy_ast_module(ast_data, meta) {
        const AST_Toplevel = compiler_exports['AST_Toplevel'];
        const shell = Object.create(AST_Toplevel.prototype);
        const preserve = new Set(Object.keys(meta));
        for (const k of Object.keys(meta)) shell[k] = meta[k];

        let _loaded = false;

        function ensure_loaded() {
            if (_loaded) return;
            _loaded = true;
            let full;
            if (ast_data instanceof Uint8Array) {
                full = ast_from_bin(ast_data);
            } else {
                // String (legacy JSON format) or already-parsed object (bootstrap).
                const parsed = typeof ast_data === 'string' ? JSON.parse(ast_data) : ast_data;
                full = ast_from_json(parsed);
            }
            for (const k of Object.keys(full)) {
                if (!preserve.has(k) && LAZY_PROPS.indexOf(k) === -1) shell[k] = full[k];
            }
            // Use defineProperty to atomically replace getter descriptors with values,
            // bypassing the setters below (which would also replace them, but
            // defineProperty is unconditional and handles the undefined case cleanly).
            for (const p of LAZY_PROPS) {
                Object.defineProperty(shell, p, {
                    value: (full[p] !== undefined) ? full[p] : [],
                    writable: true, configurable: true, enumerable: true,
                });
            }
        }

        for (const prop of LAZY_PROPS) {
            Object.defineProperty(shell, prop, {
                get() { ensure_loaded(); return shell[prop]; },
                set(v) {
                    Object.defineProperty(shell, prop, {value: v, writable: true, configurable: true, enumerable: true});
                },
                configurable: true,
                enumerable: true,
            });
        }

        return shell;
    }

    return { ast_to_json, ast_from_json, make_lazy_ast_module, encode_cache, decode_cache };
}
