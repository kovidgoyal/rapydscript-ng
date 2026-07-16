/*
 * tree_shaking.js
 * Copyright (C) 2024 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */
"use strict";  /*jshint node:true */

// Tree shaking: removes unused top-level function and class definitions
// from the __main__ module and all imported modules.

function collect_symbol_refs(node, refs) {
    // Walk the AST node and collect all AST_SymbolRef names
    node.walk({
        _visit: function(n, descend) {
            if (n.constructor.name === 'AST_SymbolRef') {
                refs[n.name] = true;
            }
            if (descend) descend();
        },
        stack: []
    });
}

function collect_dot_accesses(node, accesses) {
    // Walk the AST node and collect property accesses on symbols: obj.prop
    node.walk({
        _visit: function(n, descend) {
            if (n.constructor.name === 'AST_Dot') {
                if (n.expression && n.expression.constructor.name === 'AST_SymbolRef') {
                    var obj = n.expression.name;
                    if (!accesses[obj]) accesses[obj] = {};
                    accesses[obj][n.property] = true;
                }
            }
            if (descend) descend();
        },
        stack: []
    });
}

function extract_name(node) {
    return node.name || (node.end && node.end.value);
}

function get_definition_name(node) {
    // Returns the name defined by a top-level statement, or null if not a definition
    var cname = node.constructor.name;
    if (cname === 'AST_Function' && node.name) {
        return node.name.name;
    }
    if (cname === 'AST_Class' && node.name) {
        return node.name.name;
    }
    // Top-level variable assignment: x = ...
    if (cname === 'AST_SimpleStatement' && node.body &&
        node.body.constructor.name === 'AST_Assign' &&
        node.body.operator === '=' &&
        node.body.left && node.body.left.constructor.name === 'AST_SymbolRef') {
        return node.body.left.name;
    }
    return null;
}

function shake_module_body(module_ast, used_names) {
    // Shake a module's body, keeping only definitions needed by used_names
    // and non-definition statements (like conditionals, imports, etc.)
    if (!module_ast || !module_ast.body || !Array.isArray(module_ast.body)) {
        return;
    }

    var body = module_ast.body;
    var definitions = {};
    var non_definitions = [];

    for (var i = 0; i < body.length; i++) {
        var name = get_definition_name(body[i]);
        if (name !== null) {
            definitions[name] = {node: body[i], index: i};
        } else {
            non_definitions.push(i);
        }
    }

    if (Object.keys(definitions).length === 0) {
        return;
    }

    // Start with the used_names as seeds
    var used = {};
    var keys = Object.keys(used_names);
    for (var j = 0; j < keys.length; j++) {
        used[keys[j]] = true;
    }

    // Also collect refs from non-definition statements (they may reference definitions)
    for (var nd = 0; nd < non_definitions.length; nd++) {
        collect_symbol_refs(body[non_definitions[nd]], used);
    }

    // Iteratively resolve transitive dependencies
    var changed = true;
    while (changed) {
        changed = false;
        var def_names = Object.keys(definitions);
        for (var k = 0; k < def_names.length; k++) {
            var dname = def_names[k];
            if (used[dname] && !definitions[dname].resolved) {
                definitions[dname].resolved = true;
                var new_refs = {};
                collect_symbol_refs(definitions[dname].node, new_refs);
                var ref_keys = Object.keys(new_refs);
                for (var m = 0; m < ref_keys.length; m++) {
                    if (!used[ref_keys[m]]) {
                        used[ref_keys[m]] = true;
                        changed = true;
                    }
                }
            }
        }
    }

    // Resolve class inheritance
    changed = true;
    while (changed) {
        changed = false;
        var all_def_names = Object.keys(definitions);
        for (var p = 0; p < all_def_names.length; p++) {
            var dn = all_def_names[p];
            if (used[dn]) {
                var dnode = definitions[dn].node;
                if (dnode.constructor.name === 'AST_Class' && dnode.parent) {
                    var parent_name = extract_name(dnode.parent);
                    if (parent_name && !used[parent_name]) {
                        used[parent_name] = true;
                        changed = true;
                    }
                }
                if (dnode.constructor.name === 'AST_Class' && dnode.bases) {
                    for (var bi = 0; bi < dnode.bases.length; bi++) {
                        var base_name = extract_name(dnode.bases[bi]);
                        if (base_name && !used[base_name]) {
                            used[base_name] = true;
                            changed = true;
                        }
                    }
                }
            }
        }
    }

    // Filter body
    var new_body = [];
    for (var n = 0; n < body.length; n++) {
        var def_name = get_definition_name(body[n]);
        if (def_name === null) {
            new_body.push(body[n]);
        } else if (used[def_name]) {
            new_body.push(body[n]);
        }
    }
    module_ast.body = new_body;

    // Filter exports to only include used names
    if (module_ast.exports && Array.isArray(module_ast.exports)) {
        module_ast.exports = module_ast.exports.filter(function(exp) {
            var ename = exp.name;
            if (!ename) return true;
            // Keep if used or if it's not a definition we track
            if (used[ename]) return true;
            if (!definitions[ename]) return true;
            return false;
        });
    }

    // Filter localvars
    if (module_ast.localvars && Array.isArray(module_ast.localvars)) {
        module_ast.localvars = module_ast.localvars.filter(function(v) {
            var vname = v.name || (v.end && v.end.value);
            if (!vname) return true;
            if (definitions[vname] && !used[vname]) return false;
            return true;
        });
    }
}

function get_imported_names_for_module(toplevel, module_key) {
    // Determine which names from a module are actually used by all consuming modules.
    // For "from module import a, b, c" - only keep names that are actually referenced
    // in the consuming module's code.
    // For "import module" - scan for module.prop dot accesses.
    var used_names = {};
    var full_import_aliases = {};  // alias -> consumer_module_key

    var all_modules = toplevel.imports || {};
    var mod_keys = Object.keys(all_modules);

    for (var mi = 0; mi < mod_keys.length; mi++) {
        var consumer_key = mod_keys[mi];
        var consumer = all_modules[consumer_key];
        if (!consumer || !consumer.body || !Array.isArray(consumer.body)) continue;

        for (var bi = 0; bi < consumer.body.length; bi++) {
            var node = consumer.body[bi];
            if (node.constructor.name !== 'AST_Imports') continue;
            if (!node.imports) continue;

            for (var ii = 0; ii < node.imports.length; ii++) {
                var imp = node.imports[ii];
                if (imp.key !== module_key) continue;

                if (imp.argnames) {
                    // from module import name1, name2
                    // Only mark names that are actually referenced in the consumer
                    var consumer_refs = {};
                    for (var cbi = 0; cbi < consumer.body.length; cbi++) {
                        collect_symbol_refs(consumer.body[cbi], consumer_refs);
                    }
                    for (var ai = 0; ai < imp.argnames.length; ai++) {
                        var imported_name = imp.argnames[ai].name;
                        // The name might be aliased: "from mod import x as y"
                        var local_name = imp.argnames[ai].alias ? imp.argnames[ai].alias.name : imported_name;
                        if (consumer_refs[local_name]) {
                            used_names[imported_name] = true;
                        }
                    }
                } else {
                    // import module / import module as alias
                    var alias = imp.alias ? imp.alias.name : module_key.split('.').pop();
                    full_import_aliases[alias] = consumer_key;
                }
            }
        }
    }

    // For full imports, scan consuming modules for dot accesses
    var alias_keys = Object.keys(full_import_aliases);
    if (alias_keys.length > 0) {
        for (var fi = 0; fi < alias_keys.length; fi++) {
            var import_alias = alias_keys[fi];
            var consumer_mod_key = full_import_aliases[import_alias];
            var consumer_mod = all_modules[consumer_mod_key];
            if (!consumer_mod || !consumer_mod.body) continue;

            var accesses = {};
            for (var abi = 0; abi < consumer_mod.body.length; abi++) {
                collect_dot_accesses(consumer_mod.body[abi], accesses);
            }
            if (accesses[import_alias]) {
                var props = Object.keys(accesses[import_alias]);
                for (var pi = 0; pi < props.length; pi++) {
                    used_names[props[pi]] = true;
                }
            }
        }
    }

    return used_names;
}

function shake_tree(toplevel) {
    if (!toplevel || !toplevel.body || !Array.isArray(toplevel.body)) {
        return toplevel;
    }

    // Shake the __main__ module body
    shake_module_body(toplevel, {});

    // Shake imported modules
    if (toplevel.imports) {
        var module_keys = Object.keys(toplevel.imports);
        for (var i = 0; i < module_keys.length; i++) {
            var key = module_keys[i];
            if (key === '__main__') continue;

            var mod = toplevel.imports[key];
            if (!mod || !mod.body || !Array.isArray(mod.body)) continue;

            // Determine which names from this module are actually used
            var used_names = get_imported_names_for_module(toplevel, key);

            // If no specific names are determined (shouldn't happen normally),
            // skip shaking this module to be safe
            if (Object.keys(used_names).length === 0) continue;

            shake_module_body(mod, used_names);
        }
    }

    return toplevel;
}

module.exports = shake_tree;
