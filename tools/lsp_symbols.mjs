/* vim:fileencoding=utf-8
 *
 * lsp_symbols.mjs -- Scope and symbol analysis for the RapydScript LSP.
 *
 * Copyright (C) 2026 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 *
 * Walks a parsed AST once and records, for every binding, its definition
 * identifier node(s) and every reference to it (resolved to the nearest
 * enclosing scope). This single index powers go-to-definition, find-references,
 * rename, hover and scope aware completion. The traversal mirrors the linter's
 * scope handling (tools/lint.mjs) but, unlike the linter, it keeps the nodes so
 * they can be queried by source position.
 */
"use strict";

// Reuse the single compiler instance created synchronously by bin/rapydscript.
const RapydScript = globalThis.create_rapydscript_compiler();
var has_prop = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);

// Symbol kinds also map to LSP CompletionItemKind / SymbolKind in lsp.mjs.
export var KIND = {
    IMPORT: 'import', IMPORTED_NAME: 'imported-name', FUNCTION: 'function',
    CLASS: 'class', METHOD: 'method', PARAMETER: 'parameter', VARIABLE: 'variable',
    LOOPVAR: 'loopvar', EXCEPT: 'except',
};

// ---------------------------------------------------------------------------
// Position helpers. Tokenizer positions (`pos`, `endpos`) are character offsets
// into the newline-normalized source, which is exactly what we analyze.
// ---------------------------------------------------------------------------
export function symbol_range(node, name) {
    // For a symbol/identifier node, the start token IS the identifier token.
    if (!node) return null;
    var s = node.start || node;
    if (s && typeof s.pos === 'number') {
        var end = (typeof s.endpos === 'number') ? s.endpos : (s.pos + (name ? name.length : 0));
        return [s.pos, end];
    }
    return null;
}

export function node_span(node) {
    if (!node || !node.start) return null;
    var s = node.start;
    var e = node.end || node.start;
    if (typeof s.pos !== 'number') return null;
    var end = (typeof e.endpos === 'number') ? e.endpos : (typeof e.pos === 'number' ? e.pos : s.pos);
    return [s.pos, end];
}

// The identifier token of a `.property` access is the AST_Dot's end token.
function dot_property_range(node) {
    var e = node.end;
    if (e && typeof e.pos === 'number' && typeof e.endpos === 'number') return [e.pos, e.endpos];
    return null;
}

// ---------------------------------------------------------------------------
// Scope / SymbolDef model
// ---------------------------------------------------------------------------
function SymbolDef(name, scope, kind) {
    this.name = name;
    this.scope = scope;
    this.kind = kind;
    this.def_nodes = [];   // identifier nodes that (re)define the symbol
    this.ref_nodes = [];   // identifier nodes that reference the symbol
    this.docstring = null; // populated for functions/classes
}

function Scope(node, parent, kind) {
    this.node = node;
    this.parent = parent;
    this.kind = kind;            // 'toplevel' | 'function' | 'class' | 'comprehension'
    this.is_class = kind === 'class';
    this.is_toplevel = kind === 'toplevel';
    this.bindings = Object.create(null);  // name -> SymbolDef
    this.nonlocals = Object.create(null);
    this.children = [];
}

Scope.prototype.define = function (name, node, kind) {
    var def = this.bindings[name];
    if (!def) { def = new SymbolDef(name, this, kind); this.bindings[name] = def; }
    else if (kind && def.kind === KIND.VARIABLE) def.kind = kind;  // prefer a more specific kind
    if (node) { node._rs_def = def; def.def_nodes.push(node); }
    return def;
};

// ---------------------------------------------------------------------------
// The analyzer walks the AST building scopes, definitions and references.
// ---------------------------------------------------------------------------
function Analyzer(toplevel, filename) {
    this.filename = filename;
    this.toplevel = toplevel;
    this.scopes = [];
    this.pending_refs = [];   // {name, node, scope}
    this.member_accesses = []; // {object_name, property, range, node}
    this.all_defs = [];
    this.all_refs = [];       // resolved references {name, node, range, def}
    this.imports = [];        // {key, kind, node, alias, argnames, module_node}
}

Analyzer.prototype.current = function () { return this.scopes[this.scopes.length - 1]; };

Analyzer.prototype.define = function (name, node, kind) {
    var d = this.current().define(name, node, kind);
    if (this.all_defs.indexOf(d) < 0) this.all_defs.push(d);
    return d;
};

Analyzer.prototype.reference = function (name, node) {
    this.pending_refs.push({ name: name, node: node, scope: this.current() });
};

Analyzer.prototype.push_scope = function (node, kind) {
    var s = new Scope(node, this.current() || null, kind);
    if (this.scopes.length) this.current().children.push(s);
    this.scopes.push(s);
    if (node) node._rs_scope = s;
    return s;
};

Analyzer.prototype.pop_scope = function () { return this.scopes.pop(); };

// -- individual node handlers (mirrors lint.mjs) ----------------------------

Analyzer.prototype.handle_import = function (node) {
    if (!node.argnames) {
        // `import M` / `import M.sub` / `import M as alias`
        var name = (node.alias) ? node.alias.name : node.key.split('.', 1)[0];
        var idnode = node.alias || node.module || node;
        var d = this.define(name, idnode, KIND.IMPORT);
        d.import_key = node.key;
        this.imports.push({ key: node.key, kind: 'module', node: node, alias: node.alias, argnames: null, def: d });
    } else {
        // `from M import a, b as c` -- the argnames are visited as AST_ImportedVar.
        this.imports.push({ key: node.key, kind: 'from', node: node, alias: node.alias, argnames: node.argnames });
    }
};

Analyzer.prototype.handle_imported_var = function (node) {
    // `node` is an AST_ImportedVar: node.name is the original exported name, and
    // node.alias (if present) is the local name it is bound to.
    var name = (node.alias) ? node.alias.name : node.name;
    var idnode = node.alias || node;
    var d = this.define(name, idnode, KIND.IMPORTED_NAME);
    d.import_original_name = node.name;
    d.import_alias = node.alias ? node.alias.name : null;
    // The token spelling the *original* name is `node` itself (start token).
    d.import_original_node = node;
    // import_key is filled in during finalize (the ImportedVar does not carry it).
    node._rs_imported_var_def = d;
};

Analyzer.prototype.handle_lambda = function (node) {
    var name = (node.name) ? node.name.name : undefined;
    if (!name) return;
    if (node instanceof RapydScript.AST_Method) {
        // Methods live in the enclosing class scope.
        var d = this.define(name, node.name, KIND.METHOD);
        d.docstring = docstring_of(node);
    } else {
        var fd = this.define(name, node.name, KIND.FUNCTION);
        fd.docstring = docstring_of(node);
    }
};

Analyzer.prototype.handle_class = function (node) {
    if (node.name) {
        node.name._rs_is_binding = true;
        var d = this.define(node.name.name, node.name, KIND.CLASS);
        d.docstring = docstring_of(node);
    }
};

Analyzer.prototype.handle_assign = function (node) {
    var self = this;
    function destructured(flat) {
        for (var i = 0; i < flat.length; i++) {
            var cnode = flat[i];
            if (cnode instanceof RapydScript.AST_SymbolRef) { cnode._rs_is_binding = true; self.define(cnode.name, cnode, KIND.VARIABLE); }
        }
    }
    if (node.left instanceof RapydScript.AST_SymbolRef) {
        if (node.operator === '=') { node.left._rs_is_binding = true; this.define(node.left.name, node.left, KIND.VARIABLE); }
        // compound assignment (+=) references the existing binding, handled by the generic ref path
    } else if (node.left instanceof RapydScript.AST_Array) {
        destructured(node.left.flatten());
    } else if (node.left instanceof RapydScript.AST_Seq && node.left.car instanceof RapydScript.AST_SymbolRef) {
        destructured(node.left.to_array());
    }
};

Analyzer.prototype.handle_vardef = function (node) {
    if (node.name instanceof RapydScript.AST_SymbolNonlocal) {
        this.current().nonlocals[node.name.name] = true;
    } else {
        this.define(node.name.name, node.name, KIND.VARIABLE);
    }
};

Analyzer.prototype.handle_symbol_funarg = function (node) {
    this.define(node.name, node, KIND.PARAMETER);
};

Analyzer.prototype.handle_for_in = function (node) {
    var self = this;
    if (node.init instanceof RapydScript.AST_SymbolRef) {
        node.init._rs_is_binding = true;
        this.define(node.init.name, node.init, KIND.LOOPVAR);
    } else if (node.init instanceof RapydScript.AST_Array) {
        for (var i = 0; i < node.init.elements.length; i++) {
            var cnode = node.init.elements[i];
            if (cnode instanceof RapydScript.AST_Seq) cnode = cnode.to_array();
            if (cnode instanceof RapydScript.AST_SymbolRef) cnode = [cnode];
            if (Array.isArray(cnode)) cnode.forEach(function (elem) {
                if (elem instanceof RapydScript.AST_SymbolRef) { elem._rs_is_binding = true; self.define(elem.name, elem, KIND.LOOPVAR); }
            });
        }
    }
};

Analyzer.prototype.handle_for_js = function (node) {
    var js = node.condition.value;
    var decl = js.split(';')[0].trim();
    if (decl.slice(0, 4) === 'var ') decl = decl.slice(4);
    var self = this;
    decl.split(',').forEach(function (part) {
        var m = /^[a-zA-Z0-9_$]+/.exec(part.replace(/^\s+/, ''));
        if (m) self.define(m[0], node, KIND.VARIABLE);
    });
};

Analyzer.prototype.handle_except = function (node) {
    if (node.argname) this.define(node.argname.name, node.argname, KIND.EXCEPT);
};

Analyzer.prototype.handle_with_clause = function (node) {
    if (node.alias) this.define(node.alias.name, node.alias, KIND.VARIABLE);
};

Analyzer.prototype.handle_symbol_ref = function (node) {
    if (node._rs_is_binding) return;  // already consumed as a definition
    this.reference(node.name, node);
};

Analyzer.prototype.handle_dot = function (node) {
    // Record `object.property` where object is a simple name, for cross-file
    // member resolution (e.g. `mod.func`).
    if (node.expression instanceof RapydScript.AST_SymbolRef) {
        var r = dot_property_range(node);
        if (r) this.member_accesses.push({ object_node: node.expression, property: node.property, range: r, node: node });
    }
};

// -- the visitor -------------------------------------------------------------

Analyzer.prototype.visit = function (node, cont) {
    var scope_count = this.scopes.length;

    if (node instanceof RapydScript.AST_Lambda) this.handle_lambda(node);
    else if (node instanceof RapydScript.AST_Import) this.handle_import(node);
    else if (node instanceof RapydScript.AST_ImportedVar) this.handle_imported_var(node);
    else if (node instanceof RapydScript.AST_Class) this.handle_class(node);
    else if (node instanceof RapydScript.AST_BaseCall) this.handle_call(node);
    else if (node instanceof RapydScript.AST_Assign) this.handle_assign(node);
    else if (node instanceof RapydScript.AST_VarDef) this.handle_vardef(node);
    else if (node instanceof RapydScript.AST_Dot) this.handle_dot(node);
    else if (node instanceof RapydScript.AST_SymbolRef) this.handle_symbol_ref(node);
    else if (node instanceof RapydScript.AST_Decorator) this.handle_decorator(node);
    else if (node instanceof RapydScript.AST_SymbolFunarg) this.handle_symbol_funarg(node);
    else if (node instanceof RapydScript.AST_ListComprehension) { this.push_scope(node, 'comprehension'); this.handle_for_in(node); }
    else if (node instanceof RapydScript.AST_ForIn) this.handle_for_in(node);
    else if (node instanceof RapydScript.AST_ForJS) this.handle_for_js(node);
    else if (node instanceof RapydScript.AST_Except) this.handle_except(node);
    else if (node instanceof RapydScript.AST_WithClause) this.handle_with_clause(node);

    if (!(node instanceof RapydScript.AST_ListComprehension) && node instanceof RapydScript.AST_Scope) {
        this.push_scope(node, node instanceof RapydScript.AST_Class ? 'class' : (node instanceof RapydScript.AST_Toplevel ? 'toplevel' : 'function'));
    }

    if (cont !== undefined) cont();

    if (this.scopes.length > scope_count) this.pop_scope();
};

Analyzer.prototype.handle_call = function (node) {
    if (node.args && node.args.kwargs) node.args.kwargs.forEach(function (kw) { if (kw[0]) kw[0]._rs_is_binding = true; });
};

Analyzer.prototype.handle_decorator = function (node) {
    var e = node.expression;
    if (e instanceof RapydScript.AST_SymbolRef && RapydScript.compile_time_decorators.indexOf(e.name) !== -1) e._rs_is_binding = true;
};

// Resolve a reference to the nearest enclosing scope that binds `name`.
function resolve_in_scopes(scope, name) {
    for (var s = scope; s; s = s.parent) {
        if (has_prop(s.bindings, name)) return s.bindings[name];
    }
    return null;
}

Analyzer.prototype.finalize = function () {
    var self = this;
    this.pending_refs.forEach(function (r) {
        if (r.node._rs_is_binding) return;
        var def = resolve_in_scopes(r.scope, r.name);
        var range = symbol_range(r.node, r.name);
        var rec = { name: r.name, node: r.node, range: range, def: def || null };
        self.all_refs.push(rec);
        if (def) def.ref_nodes.push(r.node);
        r.node._rs_ref = rec;
    });
};

function docstring_of(node) {
    // Functions/classes keep their docstring on node.docstring (AST_String) when present.
    if (node && node.docstrings && node.docstrings.length) {
        var d = node.docstrings[0];
        return (d && typeof d.value === 'string') ? d.value : (typeof d === 'string' ? d : null);
    }
    if (node && node.docstring && typeof node.docstring.value === 'string') return node.docstring.value;
    return null;
}

// ---------------------------------------------------------------------------
// Public: build a SymbolIndex from an already-parsed toplevel.
// ---------------------------------------------------------------------------
function SymbolIndex(analyzer) {
    this.toplevel = analyzer.toplevel;
    this.filename = analyzer.filename;
    this.defs = analyzer.all_defs;
    this.refs = analyzer.all_refs;
    this.imports = analyzer.imports;
    this.member_accesses = analyzer.member_accesses;
    this.import_names = analyzer.import_names || [];  // aliased `from M import ORIG as x` ORIG spans
    this.toplevel_scope = analyzer.scopes_root;
}

export function build_index(toplevel, filename) {
    var a = new Analyzer(toplevel, filename);
    var visitor = { _visit: function (node, descend) { a.visit(node, descend); } };
    toplevel.walk(visitor);
    a.scopes_root = toplevel._rs_scope || null;
    a.finalize();
    // Link `from M import name` bindings to their module key so cross-file
    // resolution knows the exported symbol they came from.
    a.import_names = [];
    a.imports.forEach(function (imp) {
        if (imp.kind === 'from' && imp.argnames) imp.argnames.forEach(function (av) {
            if (av._rs_imported_var_def) av._rs_imported_var_def.import_key = imp.key;
            if (av.alias) {
                // The original exported name has its own span, distinct from the alias.
                var r = symbol_range(av, av.name);
                if (r) a.import_names.push({ range: r, key: imp.key, original: av.name, def: av._rs_imported_var_def });
            }
        });
    });
    return new SymbolIndex(a);
}

// Which def/ref covers `offset`? Returns {kind:'def'|'ref'|'member', def, node, range}.
export function locate(index, offset) {
    function contains(range) { return range && offset >= range[0] && offset <= range[1]; }
    // Prefer the innermost/most-specific: defs and refs are identifier sized so no nesting.
    for (var i = 0; i < index.defs.length; i++) {
        var d = index.defs[i];
        for (var j = 0; j < d.def_nodes.length; j++) {
            var r = symbol_range(d.def_nodes[j], d.name);
            if (contains(r)) return { kind: 'def', def: d, node: d.def_nodes[j], range: r };
        }
    }
    for (var k = 0; k < index.refs.length; k++) {
        if (contains(index.refs[k].range)) return { kind: 'ref', def: index.refs[k].def, node: index.refs[k].node, range: index.refs[k].range, ref: index.refs[k] };
    }
    for (var m = 0; m < index.member_accesses.length; m++) {
        if (contains(index.member_accesses[m].range)) return { kind: 'member', member: index.member_accesses[m], range: index.member_accesses[m].range };
    }
    for (var n = 0; n < index.import_names.length; n++) {
        if (contains(index.import_names[n].range)) return { kind: 'import-name', import_name: index.import_names[n], range: index.import_names[n].range };
    }
    return null;
}

// Collect the set of visible symbol names at a given offset (for completion):
// walk the scope tree to the deepest scope containing the offset, then gather
// bindings from that scope outward.
export function visible_symbols(index, offset) {
    var root = index.toplevel_scope;
    var out = [];
    var seen = Object.create(null);
    function span_contains(scope) {
        var sp = node_span(scope.node);
        return sp && offset >= sp[0] && offset <= sp[1];
    }
    function deepest(scope) {
        for (var i = 0; i < scope.children.length; i++) {
            if (span_contains(scope.children[i])) { var d = deepest(scope.children[i]); if (d) return d; }
        }
        return scope;
    }
    if (!root) return out;
    var scope = deepest(root);
    for (var s = scope; s; s = s.parent) {
        if (s.is_class && s !== scope) continue;  // class scope not visible to nested functions
        for (var name in s.bindings) {
            if (seen[name]) continue;
            seen[name] = true;
            out.push({ name: name, def: s.bindings[name] });
        }
    }
    return out;
}

export { RapydScript };
