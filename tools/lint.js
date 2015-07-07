/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict;";

var fs = require('fs');
var RapydScript = require("./compiler").create_compiler();
var path = require('path');
var utils = require('./utils');
var colored = utils.safe_colored;

var WARN = 1, ERROR = 2;
var MESSAGES = {
    'undef': 'undefined symbol: "{name}"',
    'unused-import': '"{name}" is imported but not used',
    'unused-local' : '"{name}" is defined but not used',
    'loop-shadowed': 'The loop variable "{name}" was previously used in this scope at line: {line}',
    'extra-semicolon': 'This semi-colon is not needed',
    'eol-semicolon': 'Semi-colons at the end of the line are unnecessary',
    'func-in-branch': 'JavaScript in strict mode does not allow the definition of named functions/classes inside a branch such as an if/try/switch',
    'syntax-err': 'A syntax error caused compilation to abort',
    'import-err': 'An import error caused compilation to abort',
    'def-after-use': 'The symbol "{name}" is defined (at line {line}) after it is used',
    'dup-key': 'JavaScript in strict mode does not allow for duplicate keys ("{name}" is duplicated) in object mode',
};

BUILTINS = {
    'this':true, 'self':true, 'window':true, 'document':true, 
    'print':true, 'len':true, 'range':true, 'dir':true, 'eval':true,
    'undefined':true, 'arguments':true, 'bind':true, 'abs':true, 'max':true, 'min':true,
    'enumerate':true, 'rebind_all':true, 'extends':true, 'reversed':true,
    'sum':true, 'getattr':true, 'setattr':true, 'hasattr':true, 'symbolfor':true,
    'parseInt':true, 'parseFloat':true, 'isNaN':true, 'JSON':true, 'Math':true,
    '_$rapyd$_modules':true, 'require':true, 'bool':true, 'int':true, 'float':true,
};
Object.keys(RapydScript.NATIVE_CLASSES).forEach(function (name) { BUILTINS[name] = true; });

function cmp(a, b) {
    return (a < b) ? -1 : ((a > b) ? 1 : 0);
}

function parse_file(code, filename) {
    return RapydScript.parse(code, {
        filename: filename,
        basedir: path.dirname(filename),
        libdir: path.dirname(filename),
        for_linting: true,
    });
}

function msg_from_node(filename, ident, name, node, level, line) {
    name = name || ((node.name) ? ((node.name.name) ? node.name.name : node.name) : '');
    if (node instanceof RapydScript.AST_Lambda && node.name) name = node.name.name;
    var msg = MESSAGES[ident].replace('{name}', name || '').replace('{line}', line || '');
    return {
        filename: filename, 
        start_line: (node.start) ? node.start.line : undefined,
        start_col: (node.start) ? node.start.col : undefined,
        end_line: (node.end) ? node.end.line : undefined,
        end_col: (node.end) ? node.end.col: undefined,
        ident: ident,
        message: msg,
        level: level || ERROR,
        name:name,
        other_line: line,
    };
}

function Binding(name, node, options) {
    options = options || {};
    this.node = node;
    this.name = name;
    this.is_import = !!options.is_import;
    this.is_function = !!options.is_function;
    this.is_func_arg = !!options.is_func_arg;
    this.is_method = !!options.is_method;

    this.is_loop = false;
    this.used = false;
}

var merge = utils.merge;

function Scope(is_toplevel, parent_scope, filename, is_class) {
    this.parent_scope = parent_scope;
    this.is_toplevel = !!is_toplevel;
    this.is_class = !!is_class;
    this.bindings = {};
    this.children = [];
    this.shadowed = [];
    this.undefined_references = {};
    this.unused_bindings = {};
    this.nonlocals = {};
    this.defined_after_use = {};

    this.add_binding = function(name, node, options) {
        var already_bound = this.bindings.hasOwnProperty(name);
        var b = new Binding(name, node, options);
        if (already_bound) {
            if (this.bindings[name].used) b.used = true;
            this.shadowed.push([name, this.bindings[name], b]);
        }
        this.bindings[name] = b;
        return b;
    };

    this.add_nonlocal = function(name) {
        this.nonlocals[name] = true;
    };

    this.register_use = function(name, node) {
        if (this.bindings.hasOwnProperty(name)) {
            this.bindings[name].used = true;
        } else {
            this.undefined_references[name] = node;
        }
    };

    this.finalize = function() {
        // Find defined after use
        Object.keys(this.undefined_references).forEach(function (name) {
            if (this.bindings.hasOwnProperty(name) && !this.nonlocals.hasOwnProperty(name)) {
                var b = this.bindings[name];
                b.used = true;
                if (!this.defined_after_use.hasOwnProperty(name)) {
                    this.defined_after_use[name] = [this.undefined_references[name], b];
                }
                delete this.undefined_references[name];
            }
        }, this);

        // Find unused bindings
        Object.keys(this.bindings).forEach(function(name) {
            var b = this.bindings[name];
            // Check if it is used in a descendant scope
            var found = false;
            this.for_descendants(function (scope) {
                if (scope.undefined_references.hasOwnProperty(name)) {
                    found = true;
                    // Remove from childs' undefined references 
                    delete scope.undefined_references[name];
                } else if (scope.nonlocals.hasOwnProperty(name) && scope.bindings.hasOwnProperty(name)) found = true;
            });
            if (!found && !b.used && !b.is_loop)
                // We deliberately ignore unused loop variables so as not to complain for the
                // common idiom of using a for loop to repeat an action, without referring to the
                // loop variable
                this.unused_bindings[name] = b;
        }, this);
    };

    this.for_descendants = function(func) {
        this.children.forEach(function (child) {
            func(child);
            child.for_descendants(func);
        });
    };

    this.messages = function() {
        var ans = [];

        Object.keys(this.undefined_references).forEach(function (name) {
            if (!(this.is_toplevel && this.nonlocals.hasOwnProperty(name))) {
                var node = this.undefined_references[name];
                ans.push(msg_from_node(filename, 'undef', name, node));
            }
        }, this);

        Object.keys(this.unused_bindings).forEach(function (name) {
            var b = this.unused_bindings[name];
            if (b.is_import) {
                ans.push(msg_from_node(filename, 'unused-import', name, b.node));
            } else if (!this.is_toplevel && !this.is_class && !b.is_func_arg && !b.is_method && !this.nonlocals.hasOwnProperty(name)) {
                ans.push(msg_from_node(filename, 'unused-local', name, b.node));
            }
        }, this);

        this.shadowed.forEach(function(x) {
            var name = x[0], first = x[1], second = x[2];
            if (second.is_loop && !first.is_loop) {
                var line = (first.node.start) ? first.node.start.line : undefined;
                ans.push(msg_from_node(filename, 'loop-shadowed', name, second.node, ERROR, line));
            }
        });

        Object.keys(this.defined_after_use).forEach(function (name) {
            var use = this.defined_after_use[name][0], binding = this.defined_after_use[name][1];
            ans.push(msg_from_node(filename, 'def-after-use', name, use, ERROR, binding.node.start.line));
        }, this);

        return ans;
    };

}

function Linter(toplevel, filename, code, options) {

    this.scopes = [];
    this.walked_scopes = [];
    this.current_node = null;
    this.in_assign = false;
    this.branches = [];
    this.messages = [];
    this.builtins = utils.merge(BUILTINS, options.builtins || {});

    this.add_binding = function(name, binding_node) {
        var scope = this.scopes[this.scopes.length - 1];
        var node = this.current_node;
        var options = {
            is_import: (node instanceof RapydScript.AST_Import || node instanceof RapydScript.AST_ImportedVar),
            is_function: (node instanceof RapydScript.AST_Lambda),
            is_method: (node instanceof RapydScript.AST_Method),
            is_func_arg: (node instanceof RapydScript.AST_SymbolFunarg),
        };
        return scope.add_binding(name, (binding_node || node), options);
    };

    this.add_nonlocal = function(name) {
        var scope = this.scopes[this.scopes.length - 1];
        return scope.add_nonlocal(name);
    };

    this.register_use = function(name) {
        var scope = this.scopes[this.scopes.length - 1];
        var node = this.current_node;
        return scope.register_use(name, node);
    };

    this.handle_import = function() {
        var node = this.current_node;
        if (!node.argnames) {
            var name = (node.alias) ? node.alias.name : node.key.split('.', 1)[0];
            this.add_binding(name, (node.alias || node));
        }
    };

    this.handle_imported_var = function() {
        var node = this.current_node;
        var name = (node.alias) ? node.alias.name : node.name;
        this.add_binding(name);
    };

    this.handle_lambda = function() {
        var node = this.current_node;
        var name = (node.name) ? node.name.name : undefined;
        if (this.branches.length && name) {
            this.messages.push(msg_from_node(filename, 'func-in-branch', node.name, node));
        }
        if (name) this.add_binding(name);
    };

    this.handle_assign = function() {
        var node = this.current_node;

        if (node.left instanceof RapydScript.AST_SymbolRef) {
            node.left.lint_visited = node.operator === '=';  // Could be compound assignment like: +=
            if (node.operator === '=') {
                // Only create a binding if the operator is not 
                // a compound assignment operator
                this.current_node = node.left;
                this.add_binding(node.left.name);
                this.current_node = node;
            }
        } else if (node.left instanceof RapydScript.AST_Array) {
            // destructuring assignment: a, b = 1, 2
            for (var i = 0; i < node.left.elements.length; i++) {
                var cnode = node.left.elements[i];
                if (cnode instanceof RapydScript.AST_SymbolRef) {
                    this.current_node = cnode;
                    cnode.lint_visited = true;
                    this.add_binding(cnode.name);
                    this.current_node = node;
                }
            }
        }

    };

    this.handle_vardef = function() {
        var node = this.current_node;
        if (node.value) this.current_node = node.value;
        if (node.name instanceof RapydScript.AST_SymbolNonlocal) {
            this.add_nonlocal(node.name.name);
        } else {
            this.add_binding(node.name.name, node.name);
        }
        this.current_node = node;
    };

    this.handle_symbol_ref = function() {
        var node = this.current_node;
        this.register_use(node.name);
    };

    this.handle_decorator = function() {
        var node = this.current_node;
        this.register_use(node.name);
    };

    this.handle_scope = function() {
        var node = this.current_node;
        var nscope = new Scope(node instanceof RapydScript.AST_Toplevel, this.scopes[this.scopes.length - 1], filename, node instanceof RapydScript.AST_Class);
        if (this.scopes.length) this.scopes[this.scopes.length - 1].children.push(nscope);
        this.scopes.push(nscope);
    };

    this.handle_symbol_funarg = function() {
        // Arguments in a function definition
        var node = this.current_node;
        this.add_binding(node.name);
    };

    this.handle_comprehension = function() {
        this.handle_scope();  // Comprehensions create their own scope
        this.handle_for_in();
    };

    this.handle_for_in = function() {
        var node = this.current_node;
        if (node.init instanceof RapydScript.AST_SymbolRef) {
            this.add_binding(node.init.name).is_loop = true;
            node.init.lint_visited = true;
        } else if (node.init instanceof RapydScript.AST_Array) {
            // destructuring assignment: for a, b in []
            for (var i = 0; i < node.init.elements.length; i++) {
                var cnode = node.init.elements[i];
                if (cnode instanceof RapydScript.AST_SymbolRef) {
                    this.current_node = cnode;
                    cnode.lint_visited = true;
                    this.add_binding(cnode.name).is_loop = true;
                    this.current_node = node;
                }
            }
 
        }
    };

    this.handle_except = function() {
        var node = this.current_node;
        if (node.argname) {
            this.add_binding(node.argname.name, node.argname);
        }
    };

    this.handle_empty_statement = function() {
        var node = this.current_node;
        if (node.stype == ';') {
            this.messages.push(msg_from_node(filename, 'extra-semicolon', ';', node, WARN));
        }
    };

    this.handle_class = function() {
        var node = this.current_node;
        if (node.name) {
            node.name.lint_visited = true;
            this.add_binding(node.name.name, node.name);
        }
    };

    this.handle_object_literal = function() {
        var node = this.current_node;
        var seen = {};
        (node.properties || []).forEach(function (prop) {
            if (Object.prototype.hasOwnProperty.call(seen, prop.key)) 
                this.messages.push(msg_from_node(filename, 'dup-key', prop.key, prop));
            seen[prop.key] = true;
        }, this);
    };

    this._visit = function (node, cont) {
        if (node.lint_visited) return;
        this.current_node = node;
        var scope_count = this.scopes.length;
        var branch_count = this.branches.length;
        if (node instanceof RapydScript.AST_If || node instanceof RapydScript.AST_Switch || node instanceof RapydScript.AST_Try || node instanceof RapydScript.AST_Catch || node instanceof RapydScript.AST_Except) {
            this.branches.push(1);
        }

        if (node instanceof RapydScript.AST_Lambda) {
            this.handle_lambda();
        } else if (node instanceof RapydScript.AST_Import) {
            this.handle_import();
        } else if (node instanceof RapydScript.AST_ImportedVar) {
            this.handle_imported_var();
        } else if (node instanceof RapydScript.AST_Class) {
            this.handle_class();
        } else if (node instanceof RapydScript.AST_Assign) {
            this.handle_assign();
        } else if (node instanceof RapydScript.AST_VarDef) {
            this.handle_vardef();
        } else if (node instanceof RapydScript.AST_SymbolRef) {
            this.handle_symbol_ref();
        } else if (node instanceof RapydScript.AST_Decorator) {
            this.handle_decorator();
        } else if (node instanceof RapydScript.AST_SymbolFunarg) {
            this.handle_symbol_funarg();
        } else if (node instanceof RapydScript.AST_ListComprehension) {
            this.handle_comprehension();
        } else if (node instanceof RapydScript.AST_ForIn) {
            this.handle_for_in();
        } else if (node instanceof RapydScript.AST_Except) {
            this.handle_except();
        } else if (node instanceof RapydScript.AST_EmptyStatement) {
            this.handle_empty_statement();
        } else if (node instanceof RapydScript.AST_Object) {
            this.handle_object_literal();
        }

        if (node instanceof RapydScript.AST_Scope) {
            this.handle_scope();
        } 

        // console.log(node.TYPE);
         
        if (cont !== undefined) cont();

        if (this.scopes.length > scope_count) {
            this.scopes[this.scopes.length - 1].finalize();
            this.walked_scopes.push(this.scopes.pop());
        }

        if (this.branches.length > branch_count) this.branches.pop();
    };

    this.resolve = function() {
        var messages = this.messages;
        var line_filters = {};

        code.split('\n').forEach(function(line, num) {
            line = line.trimRight();
            num++;
            if (line[line.length - 1] === ';') {
                var ident = 'eol-semicolon';
                messages.push({filename:filename, ident:ident, message:MESSAGES[ident],
                    level:WARN, name:';', start_line:num, start_col:line.lastIndexOf(';')});
            }
            var parts = line.split(' ');
            var last = parts[parts.length - 1], filters;
            if (last && last.substr(0, 4).toLowerCase().replace('#', '') === 'noqa') {
                parts = last.split(':').slice(1);
                if (parts.length) {
                    filters = {};
                    parts = parts[0].split(',');
                    for (var i = 0; i < parts.length; i++) filters[parts[i].trim()] = true;
                } else filters = MESSAGES;
            }
            if (filters) line_filters[num] = filters;
        });

        this.walked_scopes.forEach(function (scope) {
            messages = messages.concat(scope.messages());
        });
        noqa = options.noqa || {};
        messages = messages.filter(function(msg) {
            var ignore = (msg.start_line !== undefined && line_filters.hasOwnProperty(msg.start_line) && line_filters[msg.start_line].hasOwnProperty(msg.ident));
            var filter = noqa.hasOwnProperty(msg.ident);
            return !ignore && !filter && (msg.ident != 'undef' || !this.builtins.hasOwnProperty(msg.name));
        }, this);
        messages.sort(function (a, b) { return cmp(a.start_line, b.start_line) || cmp(a.start_col, b.start_col_); });
        return messages;
    };

}

function lint_code(code, options) {
    options = options || {};
    var reportcb = {'json':cli_json_report, 'vim': cli_vim_report, 'undef': cli_undef_report}[options.errorformat] || (options.report || cli_report);
    var filename = options.filename || '<eval>';
    var toplevel, messages;
    var lines = code.split('\n');  // Can be used (in the future) to display extract from code corresponding to error location
    RapydScript.AST_Node.warn_function = function() {};

    try {
        toplevel = parse_file(code, filename);
    } catch(e) {
        if (e instanceof RapydScript.ImportError) {
            messages = [{filename:filename, start_line:e.line, start_col:e.col, level:ERROR, ident:'import-err', message:e.message}];
        } else if (e instanceof RapydScript.SyntaxError) {
            messages = [{filename:filename, start_line:e.line, start_col:e.col, level:ERROR, ident:'syntax-err', message:e.message}];
        } else throw e;
    }

    if (toplevel) {
        var linter = new Linter(toplevel, filename, code, options);
        toplevel.walk(linter);
        messages = linter.resolve();
    }
    messages.forEach(function(msg, i) { msg.code_lines = lines; reportcb(msg, i, messages); });
    return messages;
}

// CLI {{{

function read_whole_file(filename, cb) {
    if (!filename) {
        var chunks = [];
        process.stdin.setEncoding('utf-8');
        process.stdin.on('data', function (chunk) {
            chunks.push(chunk);
        }).on('end', function () {
            cb(null, chunks.join(""));
        });
        process.openStdin();
    } else {
        fs.readFile(filename, "utf-8", cb);
    }
}

function cli_report(r, i, messages) {
    var parts = [];
    function push(x, color) {
        parts.push((x === undefined) ? '' : colored(x.toString(), color));
    }
    push(r.filename); push((r.level === WARN) ? 'WARN' : 'ERR', (r.level === WARN) ? 'yellow' : 'red');
    push(r.start_line, 'green'); push((r.start_col === undefined) ? '' : r.start_col + 1);
    console.log(parts.join(':') + ':' + r.message + colored(' [' + r.ident + ']', 'green'));
    if (i < messages.length - 1) console.log();
}

var undef_buf = {};

function cli_undef_report(r, i, messages) {
    if (r.ident == 'undef' && r.name) undef_buf[r.name] = true;
    if (i == messages.length - 1) console.log(Object.keys(undef_buf).sort().join(', '));
}

function cli_json_report(r, i, messages) {
    var j = {};
    Object.keys(r).forEach(function(key) {
        var val = r[key];
        if (val !== undefined && key != 'code_lines') {
            if (key === 'level') val = (val === WARN) ? 'WARN' : 'ERR';
            j[key] = val;
        }
    });
    if (i === 0) console.log('[');
    console.log(JSON.stringify(j, null, 2));
    console.log((i < messages.length - 1) ? ',' : ']');
}

function cli_vim_report(r) {
    var parts = [];
    parts.push(r.filename); parts.push(r.start_line || 0); parts.push((r.start_col === undefined) ? 0 : r.start_col + 1);
    parts.push((r.level === WARN) ? 'W' : 'E'); parts.push(r.name || ''); parts.push(r.message + ' [' + r.ident + ']');
    console.log(parts.join(':'));
}

var ini_cache = {};

function get_ini(toplevel_dir) {
    if (ini_cache.hasOwnProperty(toplevel_dir)) return ini_cache[toplevel_dir];
    var rl = require('./ini').read_config(toplevel_dir).rapydscript || {};
    ini_cache[toplevel_dir] = rl;
    return rl;
}

module.exports.cli = function(argv, base_path, src_path, lib_path) {
    var files = argv.files.slice();
    var num_of_files = files.length || 1;
    var read_config = require('./ini');

    if (argv.noqa_list) {
        Object.keys(MESSAGES).forEach(function(ident) {
            var i = (ident + utils.repeat(' ', 20)).slice(0, 20);
            var h = utils.wrap(MESSAGES[ident].split('\n'), 59);
            console.log(i + h[0]);
            h.slice(1).forEach(function(t) { console.log(utils.repeat(' ', 20) + t); });
            console.log();
        });
        process.exit(0);
    }

    if (files.filter(function(el){ return el === "-"; }).length > 1) {
        console.error("ERROR: Can read a single file from STDIN (two or more dashes specified)");
        process.exit(1);
    }

    var all_ok = true;
    var builtins = {};
    var noqa = {};
    if (argv.globals) argv.globals.split(',').forEach(function(sym) { builtins[sym] = true; });
    if (argv.noqa) argv.noqa.split(',').forEach(function(sym) { noqa[sym] = true; });

    function lint_single_file(err, code) {
        var output, final_builtins = merge(builtins), final_noqa = merge(noqa), rl;
        if (err) {
            console.error("ERROR: can't read file: " + files[0]);
            process.exit(1);
        }

        // Read setup.cfg
        rl = get_ini(path.dirname(files[0]));
        var g = {};
        (rl.globals || rl.builtins || '').split(',').forEach(function (x) { g[x.trim()] = true; });
        final_builtins = merge(final_builtins, g);
        g = {};
        (rl.noqa || '').split(',').forEach(function (x) { g[x.trim()] = true; });
        final_noqa = merge(final_noqa, g);

        // Look for # globals: in the first few lines of the file
        code.split('\n', 20).forEach(function (line) {
            if (line.replace(' ', '').substr(0, 9) === '#globals:') 
                (line.split(':', 2)[1] || '').split(',').forEach(function (item) { final_builtins[item.trim()] = true; });
        });

        // Lint!
        if (lint_code(code, {filename:files[0], builtins:final_builtins, noqa:final_noqa, errorformat:argv.errorformat || false}).length) all_ok = false;

        files = files.slice(1);
        if (files.length) {
            setImmediate(read_whole_file, files[0], lint_single_file);
            return;
        } else process.exit((all_ok) ? 0 : 1);
    }
 
    setImmediate(read_whole_file, files[0], lint_single_file);

};

module.exports.lint_code = lint_code;
module.exports.WARN = WARN;
module.exports.ERROR = ERROR;
module.exports.MESSAGES = MESSAGES;
// }}}
