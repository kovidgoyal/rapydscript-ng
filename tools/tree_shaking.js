/*
 * tree_shaking.js
 * Copyright (C) 2024 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */
"use strict";  /*jshint node:true */

// Tree shaking: removes unused top-level function and class definitions
// from the __main__ module's AST body.

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

function is_definition_node(node) {
    return get_definition_name(node) !== null;
}

function shake_tree(toplevel) {
    // Only shake the __main__ module body
    if (!toplevel || !toplevel.body || !Array.isArray(toplevel.body)) {
        return toplevel;
    }

    var body = toplevel.body;

    // Separate definitions from non-definitions (executable statements)
    var definitions = {};  // name -> {node, index}
    var non_definitions = [];  // indices of non-definition statements
    var definition_indices = [];  // track original indices of definitions

    for (var i = 0; i < body.length; i++) {
        var name = get_definition_name(body[i]);
        if (name !== null) {
            definitions[name] = {node: body[i], index: i};
            definition_indices.push(i);
        } else {
            non_definitions.push(i);
        }
    }

    // If no definitions, nothing to shake
    if (Object.keys(definitions).length === 0) {
        return toplevel;
    }

    // Collect all symbol references from non-definition statements
    var used = {};
    for (var j = 0; j < non_definitions.length; j++) {
        collect_symbol_refs(body[non_definitions[j]], used);
    }

    // Iteratively resolve: if a definition is used, its body may reference
    // other definitions that should also be kept
    var changed = true;
    while (changed) {
        changed = false;
        var def_names = Object.keys(definitions);
        for (var k = 0; k < def_names.length; k++) {
            var dname = def_names[k];
            if (used[dname] && !definitions[dname].resolved) {
                definitions[dname].resolved = true;
                // Collect refs from this definition's body
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

    // Also mark class parents as used (inheritance)
    changed = true;
    while (changed) {
        changed = false;
        var all_def_names = Object.keys(definitions);
        for (var p = 0; p < all_def_names.length; p++) {
            var dn = all_def_names[p];
            if (used[dn]) {
                var dnode = definitions[dn].node;
                if (dnode.constructor.name === 'AST_Class' && dnode.parent) {
                    var parent_name = dnode.parent.name || (dnode.parent.end && dnode.parent.end.value);
                    if (parent_name && !used[parent_name]) {
                        used[parent_name] = true;
                        changed = true;
                    }
                }
                // Also check bases array for multiple inheritance
                if (dnode.constructor.name === 'AST_Class' && dnode.bases) {
                    for (var bi = 0; bi < dnode.bases.length; bi++) {
                        var base = dnode.bases[bi];
                        var base_name = base.name || (base.end && base.end.value);
                        if (base_name && !used[base_name]) {
                            used[base_name] = true;
                            changed = true;
                        }
                    }
                }
            }
        }
    }

    // Filter body: keep non-definitions and used definitions
    var new_body = [];
    for (var n = 0; n < body.length; n++) {
        var def_name = get_definition_name(body[n]);
        if (def_name === null) {
            // Non-definition statement: always keep
            new_body.push(body[n]);
        } else if (used[def_name]) {
            // Used definition: keep
            new_body.push(body[n]);
        }
        // else: unused definition, remove it
    }

    toplevel.body = new_body;

    // Also remove unused names from localvars if present
    if (toplevel.localvars && Array.isArray(toplevel.localvars)) {
        toplevel.localvars = toplevel.localvars.filter(function(v) {
            var vname = v.name || (v.end && v.end.value);
            // Keep if not a definition we removed, or if it's used
            if (!vname) return true;
            if (definitions[vname] && !used[vname]) return false;
            return true;
        });
    }

    return toplevel;
}

module.exports = shake_tree;
