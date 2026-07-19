/*
 * treeshake.js - Dead code elimination for RapydScript
 * Copyright (C) 2024 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */

var has_prop = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);

// Node-type check via constructor name.  Works across Node.js VM context
// boundaries because it relies on string comparison rather than instanceof.
function node_type(node) {
    return node && node.constructor && node.constructor.name;
}
function is_function(node) { return node_type(node) === 'AST_Function'; }
function is_class(node)    { return node_type(node) === 'AST_Class'; }
function is_imports(node)  { return node_type(node) === 'AST_Imports'; }
function is_symref(node)   { return node_type(node) === 'AST_SymbolRef'; }

// Returns true when a decorator node is the special @no_prune annotation.
// @no_prune is a tree-shaking annotation, not a runtime function — it pins the
// decorated symbol so the shaker never removes it, and is stripped from output.
function is_no_prune_decorator(dec) {
    return dec && dec.expression && is_symref(dec.expression) &&
           dec.expression.name === 'no_prune';
}

// Returns true when stmt (an AST_Function or AST_Class) carries @no_prune.
function node_is_pinned(stmt) {
    if (!stmt.decorators || !stmt.decorators.length) return false;
    for (var i = 0; i < stmt.decorators.length; i++) {
        if (is_no_prune_decorator(stmt.decorators[i])) return true;
    }
    return false;
}

// Returns true when a module's immediately-executing body contains at least one
// function call — a conservative signal that the module has externally
// observable side effects (e.g. patching String.prototype).
function has_side_effect_calls(mod) {
    if (!mod) return false;
    // Use pre-computed flag if available (avoids body access for lazy modules).
    if (typeof mod._has_side_effects === 'boolean') return mod._has_side_effects;
    if (!mod.body) return false;
    var found = false;
    mod.body.forEach(function(stmt) {
        if (found) return;
        if (is_function(stmt) || is_class(stmt) || is_imports(stmt)) return;
        var walker = new TreeWalker(function(n) {
            if (node_type(n) === 'AST_Call') { found = true; return true; }
        });
        stmt.walk(walker);
    });
    return found;
}

// Minimal TreeWalker compatible with the AST's _walk() protocol.
// If the callback returns truthy, descend is suppressed.
function noop() {}
function TreeWalker(callback) { this.visit = callback; }
TreeWalker.prototype._visit = function(node, descend) {
    var ret = this.visit(node, descend || noop);
    if (!ret && descend) descend.call(node);
    return ret;
};

/*
 * tree_shake(toplevel)
 *
 * Performs dead code elimination on the parsed AST.
 *
 * Removes:
 *   - Unused top-level function and class definitions from all modules
 *   - Import statements for modules that are completely unused
 *   - Unused argnames from "from X import a, b" statements
 *
 * A definition is "live" if it is transitively reachable from any
 * immediately-executing (non-def/class/import) top-level statement,
 * starting from __main__ and following import references.
 *
 * Modifies the AST in-place and returns the modified toplevel.
 *
 * Cached modules (is_cached=true, empty body): their pre-built IIFE output
 * cannot be modified internally, but the entire module can still be removed.
 */
function tree_shake(toplevel) {

    // ── 1. Collect all modules ────────────────────────────────────────────
    var all_modules = {};
    all_modules['__main__'] = toplevel;
    Object.keys(toplevel.imports).forEach(function(mid) {
        all_modules[mid] = toplevel.imports[mid];
    });

    // ── 2. Per-module index tables (built lazily when a module is first marked live) ──
    //
    //  top_defs[mid]        : {name -> ast_node}  (top-level defs only)
    //  import_bindings[mid] : {local_name -> {source_module, imported_name, is_namespace}}
    //
    // Building lazily means dead modules' bodies are never accessed, enabling
    // lazy AST deserialization: ast_from_json() is skipped for dead modules.

    var top_defs = {};
    var import_bindings = {};
    // pinned_defs[mid][name] = true  when the def carries @no_prune
    var pinned_defs = {};

    function ensure_module_indexed(mid) {
        if (has_prop(top_defs, mid)) return;  // already indexed
        top_defs[mid] = {};
        import_bindings[mid] = {};
        pinned_defs[mid] = {};
        var mod = all_modules[mid];
        if (!mod) return;

        // Use precomputed index when available (v7+ caches): avoids body access,
        // so ast_from_json is not triggered during the fixpoint iteration.
        var idx = mod._cache_index;
        if (idx) {
            Object.keys(idx.top_defs || {}).forEach(function(name) {
                var di = idx.top_defs[name];
                // Store a plain index entry ({_idx:true, refs:[...]}) so mark_def_live
                // can push refs directly without needing the AST node.
                top_defs[mid][name] = {_idx: true, refs: di.refs || []};
                if (di.pinned) pinned_defs[mid][name] = true;
            });
            Object.keys(idx.import_bindings || {}).forEach(function(local) {
                var b = idx.import_bindings[local];
                import_bindings[mid][local] = {
                    source_module: b.source,
                    imported_name: b.imported_name,
                    is_namespace: b.is_namespace,
                };
            });
            return;
        }

        if (!mod.body) return;
        mod.body.forEach(function(stmt) {
            if ((is_function(stmt) || is_class(stmt)) && stmt.name) {
                top_defs[mid][stmt.name.name] = stmt;
                if (node_is_pinned(stmt)) {
                    pinned_defs[mid][stmt.name.name] = true;
                }
            } else if (is_imports(stmt)) {
                stmt.imports.forEach(function(imp) {
                    if (imp.argnames && imp.argnames.length) {
                        // from X import a [as b], c [as d], …
                        imp.argnames.forEach(function(arg) {
                            var local = arg.alias ? arg.alias.name : arg.name;
                            import_bindings[mid][local] = {
                                source_module: imp.key,
                                imported_name: arg.name,
                                is_namespace: false,
                            };
                        });
                    } else {
                        // import X [as Y]  or  import X.Y [as Z]
                        var local;
                        if (imp.alias) {
                            local = imp.alias.name;
                        } else {
                            local = imp.key.split('.')[0];
                        }
                        import_bindings[mid][local] = {
                            source_module: imp.key,
                            imported_name: null,
                            is_namespace: true,
                        };
                    }
                });
            }
        });
    }

    // ── 3. Liveness tracking ─────────────────────────────────────────────
    var live_modules  = {};   // {mid -> true}
    var live_defs     = {};   // {mid -> {def_name -> true}}  (initialised lazily)
    var used_bindings = {};   // {mid -> {local_name -> true}} (initialised lazily)

    var work_queue = [];

    // Collect all AST_SymbolRef names reachable from `node`.
    // Reuse a single TreeWalker (JS is single-threaded; no re-entrancy risk).
    var _collect_refs_target = null;
    var _collect_refs_walker = new TreeWalker(function(n) {
        if (is_symref(n)) _collect_refs_target[n.name] = true;
    });
    function collect_refs(node, refs) {
        _collect_refs_target = refs;
        node.walk(_collect_refs_walker);
        _collect_refs_target = null;
    }

    // Mark a module as live; seed its immediately-executing code into the queue
    function mark_module_live(mod_id) {
        if (live_modules[mod_id]) return;
        live_modules[mod_id] = true;
        if (!live_defs[mod_id]) live_defs[mod_id] = {};
        if (!used_bindings[mod_id]) used_bindings[mod_id] = {};
        ensure_module_indexed(mod_id);
        var mod = all_modules[mod_id];
        if (!mod) return;
        // @no_prune defs are unconditionally live whenever their module is live
        Object.keys(pinned_defs[mod_id]).forEach(function(name) {
            mark_def_live(mod_id, name);
        });

        // Fast path: use precomputed index — no body access, no AST deserialization.
        var idx = mod._cache_index;
        if (idx) {
            if (idx.exec_refs && idx.exec_refs.length) {
                work_queue.push({mod_id: mod_id, refs: idx.exec_refs});
            }
            // Check namespace imports for side-effect-bearing modules.
            // has_side_effect_calls uses mod._has_side_effects for v6+ modules,
            // so this never triggers body access on cached modules.
            Object.keys(import_bindings[mod_id]).forEach(function(local) {
                var b = import_bindings[mod_id][local];
                if (!b.is_namespace) return;
                var parts = b.source_module.split('.');
                var partial = '';
                for (var p = 0; p < parts.length; p++) {
                    partial = (p === 0) ? parts[0] : partial + '.' + parts[p];
                    if (has_side_effect_calls(all_modules[partial])) {
                        mark_module_live(partial);
                    }
                }
            });
            return;
        }

        if (!mod.body) return;
        mod.body.forEach(function(stmt) {
            if (!is_function(stmt) && !is_class(stmt) && !is_imports(stmt)) {
                work_queue.push({mod_id: mod_id, node: stmt});
            } else if (is_imports(stmt)) {
                // "import X" always executes X's module code.  When X has
                // immediately-executing function calls that may have globally
                // observable side effects (e.g. patching String.prototype),
                // mark X live even if its local name is never referenced.
                stmt.imports.forEach(function(imp) {
                    if (imp.argnames && imp.argnames.length) return;
                    var parts = imp.key.split('.');
                    var partial = '';
                    for (var p = 0; p < parts.length; p++) {
                        partial = (p === 0) ? parts[0] : partial + '.' + parts[p];
                        if (has_side_effect_calls(all_modules[partial])) {
                            mark_module_live(partial);
                        }
                    }
                });
            }
        });
    }

    // Mark a top-level def as live; enqueue its body for scanning
    function mark_def_live(mod_id, def_name) {
        if (!live_defs[mod_id]) live_defs[mod_id] = {};
        if (live_defs[mod_id][def_name]) return;
        live_defs[mod_id][def_name] = true;
        if (top_defs[mod_id] && has_prop(top_defs[mod_id], def_name)) {
            var entry = top_defs[mod_id][def_name];
            if (entry._idx) {
                // Precomputed index entry: push refs directly, no AST walk needed.
                work_queue.push({mod_id: mod_id, refs: entry.refs});
            } else {
                work_queue.push({mod_id: mod_id, node: entry});
            }
        }
    }

    // For namespace imports (import X [as Y]), we cannot statically determine
    // which properties of X are accessed.  Mark every top-level def in mod_id
    // as live so that X.any_func() calls work correctly at runtime.
    function mark_all_defs_live(mod_id) {
        if (!top_defs[mod_id]) return;
        Object.keys(top_defs[mod_id]).forEach(function(def_name) {
            mark_def_live(mod_id, def_name);
        });
    }

    // Process a single symbol reference found in live code of `mod_id`
    function process_ref(mod_id, name) {
        // Local top-level def?
        if (top_defs[mod_id] && has_prop(top_defs[mod_id], name)) {
            mark_def_live(mod_id, name);
            return;
        }
        // Import binding?
        if (import_bindings[mod_id] && has_prop(import_bindings[mod_id], name)) {
            if (!used_bindings[mod_id]) used_bindings[mod_id] = {};
            used_bindings[mod_id][name] = true;
            var b = import_bindings[mod_id][name];
            // Mark every partial module in the path as live (e.g. A, A.B, A.B.C).
            // For namespace imports also mark ALL top-level defs in each partial
            // module live, since we cannot know which properties are accessed via
            // the namespace object (e.g. A.func(), A.B.other()).
            var parts = b.source_module.split('.');
            var partial = '';
            for (var p = 0; p < parts.length; p++) {
                partial = (p === 0) ? parts[0] : partial + '.' + parts[p];
                mark_module_live(partial);
                if (b.is_namespace) mark_all_defs_live(partial);
            }
            // For "from X import foo" mark only the specific def in X
            if (!b.is_namespace && b.imported_name) {
                mark_def_live(b.source_module, b.imported_name);
            }
        }
        // Built-in, global, or unknown → ignore
    }

    // ── 4. Seed from __main__ ─────────────────────────────────────────────
    mark_module_live('__main__');

    // ── 5. Fixed-point iteration ──────────────────────────────────────────
    // Use pop() (O(1)) instead of shift() (O(n)) — order doesn't matter for correctness.
    while (work_queue.length > 0) {
        var item = work_queue.pop();
        if (item.refs) {
            // Precomputed ref list from the cache index — no AST walk needed.
            item.refs.forEach(function(name) {
                process_ref(item.mod_id, name);
            });
        } else {
            var refs = {};
            collect_refs(item.node, refs);
            Object.keys(refs).forEach(function(name) {
                process_ref(item.mod_id, name);
            });
        }
    }

    // ── 6. Prune dead code from live modules ──────────────────────────────
    Object.keys(all_modules).forEach(function(mid) {
        if (!live_modules[mid]) return;  // dead modules handled below

        var mod = all_modules[mid];
        if (!mod || !mod.body) return;

        var ld = live_defs[mid] || {};
        var ub = used_bindings[mid] || {};
        var td = top_defs[mid] || {};
        var new_body = [];
        mod.body.forEach(function(stmt) {
            if ((is_function(stmt) || is_class(stmt)) && stmt.name) {
                if (!ld[stmt.name.name]) return;  // dead def
                // Strip @no_prune — it is a tree-shaking annotation, not a
                // runtime function, so it must not appear in compiled output.
                if (stmt.decorators && stmt.decorators.length) {
                    stmt.decorators = stmt.decorators.filter(function(d) {
                        return !is_no_prune_decorator(d);
                    });
                }
            } else if (is_imports(stmt)) {
                var live_imps = [];
                stmt.imports.forEach(function(imp) {
                    if (!live_modules[imp.key]) return;  // entire source module dead

                    if (imp.argnames && imp.argnames.length) {
                        // "from X import a, b" – keep only used argnames
                        var live_args = imp.argnames.filter(function(arg) {
                            var local = arg.alias ? arg.alias.name : arg.name;
                            return !!ub[local];
                        });
                        if (live_args.length === 0) return;  // no argnames used
                        imp.argnames = live_args;
                    }
                    // "import X [as Y]": keep when module is live
                    live_imps.push(imp);
                });
                if (live_imps.length === 0) return;  // every import in this stmt dead
                stmt.imports = live_imps;
            }
            new_body.push(stmt);
        });
        mod.body = new_body;

        // Update exports: remove entries for dead defs
        if (mod.exports) {
            mod.exports = mod.exports.filter(function(sym) {
                var name = sym.name;
                if (!has_prop(td, name)) return true;  // variable – always keep
                return !!ld[name];
            });
        }
    });

    // ── 7. Remove dead modules from the shared imports map ───────────────
    Object.keys(toplevel.imports).forEach(function(mod_id) {
        if (!live_modules[mod_id]) {
            delete toplevel.imports[mod_id];
        }
    });

    return toplevel;
}

export default tree_shake;
