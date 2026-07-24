/* vim:fileencoding=utf-8
 *
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { read_config } from './ini.mjs';
import * as utils from './utils.mjs';

// Use the compiler instance pre-created by bin/rapydscript. It is set as a
// synchronous global before any dynamic imports, so this module can be
// require()'d without top-level await.
const RapydScript = globalThis.create_rapydscript_compiler();
var colored = utils.safe_colored;

export var WARN = 1, ERROR = 2;
export var MESSAGES = {
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
    'dup-method': 'The method {name} was defined previously at line: {line}',
};

var BUILTINS = Object.create(null);
('this self window document chr ord iterator_symbol print len range dir' +
 ' eval undefined arguments abs max min enumerate pow callable reversed sum' +
 ' getattr isFinite setattr hasattr parseInt parseFloat options_object' +
 ' isNaN JSON Math list set list_wrap ρσ_modules require bool int bin' +
 ' float iter Error EvalError set_wrap RangeError ReferenceError SyntaxError' +
 ' str TypeError URIError Exception AssertionError IndexError AttributeError KeyError' +
 ' ValueError ZeroDivisionError map hex filter zip dict dict_wrap UnicodeDecodeError HTMLCollection' +
 ' NodeList alert console Node Symbol NamedNodeMap ρσ_eslice ρσ_delslice Number' +
 ' Boolean encodeURIComponent decodeURIComponent setTimeout setInterval' +
 ' setImmediate clearTimeout clearInterval clearImmediate requestAnimationFrame' +
 ' id repr sorted __name__ equals get_module ρσ_str jstype divmod NaN no_prune'
 ).split(' ').forEach(function(x) { BUILTINS[x] = true; });

Object.keys(RapydScript.NATIVE_CLASSES).forEach(function (name) { BUILTINS[name] = true; });
var has_prop = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

function cmp(a, b) {
    return (a < b) ? -1 : ((a > b) ? 1 : 0);
}

async function parse_file(code, filename) {
    return await RapydScript.parse(code, {
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
    this.seen_method_names = {};
    this.methods = {};

    this.add_binding = function(name, node, options) {
        var already_bound = has_prop(this.bindings, name);
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
        if (has_prop(this.bindings, name)) {
            this.bindings[name].used = true;
        } else {
            this.undefined_references[name] = node;
        }
    };

    this.finalize = function() {
        // Find defined after use
        Object.keys(this.undefined_references).forEach(function (name) {
            if (has_prop(this.bindings, name) && !has_prop(this.nonlocals, name)) {
                var b = this.bindings[name];
                b.used = true;
                if (!has_prop(this.defined_after_use, name)) {
                    this.defined_after_use[name] = [this.undefined_references[name], b];
                }
                delete this.undefined_references[name];
            }
            if (has_prop(this.methods, name)) delete this.undefined_references[name];
        }, this);

        // Find unused bindings
        Object.keys(this.bindings).forEach(function(name) {
            var b = this.bindings[name];
            // Check if it is used in a descendant scope
            var found = false;
            this.for_descendants(function (scope) {
                if (has_prop(scope.undefined_references, name)) {
                    found = true;
                    // Remove from childs' undefined references
                    delete scope.undefined_references[name];
                } else if (has_prop(scope.nonlocals, name) && has_prop(scope.bindings, name)) found = true;
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
            if (!(this.is_toplevel && has_prop(this.nonlocals, name))) {
                var node = this.undefined_references[name];
                ans.push(msg_from_node(filename, 'undef', name, node));
            }
        }, this);

        Object.keys(this.unused_bindings).forEach(function (name) {
            var b = this.unused_bindings[name];
            if (b.is_import) {
                ans.push(msg_from_node(filename, 'unused-import', name, b.node));
            } else if (!this.is_toplevel && !this.is_class && !b.is_func_arg && !b.is_method && !has_prop(this.nonlocals, name)) {
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
        var scope = this.scopes[this.scopes.length - 1];
        if (this.branches.length && name) {
            this.messages.push(msg_from_node(filename, 'func-in-branch', node.name, node));
        }
        if (name) {
            if (node instanceof RapydScript.AST_Method) {
                scope.methods[name] = true;
                if (has_prop(scope.seen_method_names, name)) {
                    if (!node.is_setter) this.messages.push(msg_from_node(filename, 'dup-method', node.name, node, WARN, scope.seen_method_names[name]));
                } else scope.seen_method_names[name] = node.start.line;
            } else this.add_binding(name);
        }
    };

    this.handle_assign = function() {
        var node = this.current_node;

        var handle_destructured = function(self, flat) {
            for (var i = 0; i < flat.length; i++) {
                var cnode = flat[i];
                if (cnode instanceof RapydScript.AST_SymbolRef) {
                    self.current_node = cnode;
                    cnode.lint_visited = true;
                    self.add_binding(cnode.name);
                    self.current_node = node;
                }
            }
        };

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
            var flat = node.left.flatten();
            handle_destructured(this, node.left.flatten());

        } else if (node.left instanceof RapydScript.AST_Seq && node.left.car instanceof RapydScript.AST_SymbolRef) {
            handle_destructured(this, node.left.to_array());
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
        var node = this.current_node.expression;
        if (node instanceof RapydScript.AST_SymbolRef && RapydScript.compile_time_decorators.indexOf(node.name) != -1) node.link_visited = true;
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
                if (cnode instanceof RapydScript.AST_Seq) cnode = cnode.to_array();
                if (cnode instanceof RapydScript.AST_SymbolRef) cnode = [cnode];
                if (Array.isArray(cnode)) {
                    for (var j = 0; j < cnode.length; j++) {
                        var elem = cnode[j];
                        if (elem instanceof RapydScript.AST_SymbolRef) {
                            this.current_node = elem;
                            elem.lint_visited = true;
                            this.add_binding(elem.name).is_loop = true;
                            this.current_node = node;
                        }
                    }
                }
            }

        }
    };

    this.handle_for_js = function() {
        var node = this.current_node;
        var js = node.condition.value;
        var statements = js.split(';');
        var decl = statements[0].trim();
        if (decl.startsWith('var ')) decl = decl.slice(4);
        var self = this;
        decl.split(',').forEach(function (part) {
            var name = /^[a-zA-Z0-9_]+/.exec(part.trimLeft())[0];
            self.add_binding(name);
        });
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
            if (prop.key instanceof RapydScript.AST_Constant) {
                var val = prop.key.value;
                if (has_prop(seen, val))
                    this.messages.push(msg_from_node(filename, 'dup-key', val, prop));
                seen[val] = true;
            }
        }, this);
    };

    this.handle_call = function() {
        var node = this.current_node;
        if (node.args.kwargs) node.args.kwargs.forEach(function(kw) { kw[0].lint_visited = true; });
    };

    this.handle_with_clause = function() {
        var node = this.current_node;
        if (node.alias) this.add_binding(node.alias.name);
    };

    this._visit = function (node, cont) {
        if (node.lint_visited) return;
        this.current_node = node;
        var scope_count = this.scopes.length;
        var branch_count = this.branches.length;
        if (node instanceof RapydScript.AST_If || node instanceof RapydScript.AST_Try || node instanceof RapydScript.AST_Catch || node instanceof RapydScript.AST_Except || node instanceof RapydScript.AST_Else) {
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
        } else if (node instanceof RapydScript.AST_BaseCall) {
            this.handle_call();
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
        } else if (node instanceof RapydScript.AST_ForJS) {
            this.handle_for_js();
        } else if (node instanceof RapydScript.AST_Except) {
            this.handle_except();
        } else if (node instanceof RapydScript.AST_EmptyStatement) {
            this.handle_empty_statement();
        } else if (node instanceof RapydScript.AST_WithClause) {
            this.handle_with_clause();
        } else if (node instanceof RapydScript.AST_Object) {
            this.handle_object_literal();
        }

        if (node instanceof RapydScript.AST_Scope) {
            this.handle_scope();
        }

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
        var in_multiline_str = false;
        var ml_quote = null;

        code.split('\n').forEach(function(line, num) {
            line = line.trimRight();
            num++;

            // Track triple-quoted multiline string state so we can skip
            // eol-semicolon checks for lines that are inside string literals.
            var line_starts_in_multiline = in_multiline_str;
            var pos = 0, close_pos;
            while (pos < line.length) {
                if (!in_multiline_str) {
                    var dq = line.indexOf('"""', pos);
                    var sq = line.indexOf("'''", pos);
                    var first, quote;
                    if (dq !== -1 && (sq === -1 || dq < sq)) { first = dq; quote = '"""'; }
                    else if (sq !== -1) { first = sq; quote = "'''"; }
                    else break;
                    in_multiline_str = true;
                    ml_quote = quote;
                    pos = first + 3;
                    close_pos = line.indexOf(ml_quote, pos);
                    if (close_pos !== -1) { in_multiline_str = false; ml_quote = null; pos = close_pos + 3; }
                    else break;
                } else {
                    close_pos = line.indexOf(ml_quote, pos);
                    if (close_pos !== -1) { in_multiline_str = false; ml_quote = null; pos = close_pos + 3; }
                    else break;
                }
            }

            if (!line_starts_in_multiline && !in_multiline_str && line[line.length - 1] === ';') {
                var ident = 'eol-semicolon';
                messages.push({filename:filename, ident:ident, message:MESSAGES[ident],
                    level:WARN, name:';', start_line:num, start_col:line.lastIndexOf(';')});
            }
            var parts = line.split('#');
            var last = parts[parts.length - 1], filters;
            if (last && last.trimLeft().substr(0, 4).toLowerCase() === 'noqa') {
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
        var noqa = options.noqa || {};
        messages = messages.filter(function(msg) {
            var ignore = (msg.start_line !== undefined && has_prop(line_filters, msg.start_line) && has_prop(line_filters[msg.start_line], msg.ident));
            var filter = has_prop(noqa, msg.ident);
            return !ignore && !filter && (msg.ident != 'undef' || !has_prop(this.builtins, msg.name));
        }, this);
        messages.sort(function (a, b) { return cmp(a.start_line, b.start_line) || cmp(a.start_col, b.start_col_); });
        return messages;
    };

}

// Run only the linter analysis over an already parsed toplevel. Used by both
// lint_code and the LSP (which parses once, in error-recovery mode, and reuses
// the resulting AST for all of its services).
export function lint_parsed(toplevel, code, options) {
    options = options || {};
    var filename = options.filename || '<eval>';
    var linter = new Linter(toplevel, filename, code, options);
    toplevel.walk(linter);
    return linter.resolve();
}

export async function lint_code(code, options) {
    options = options || {};
    var reportcb = {'json':cli_json_report, 'vim': cli_vim_report, 'undef': cli_undef_report}[options.errorformat] || (options.report || cli_report);
    var filename = options.filename || '<eval>';
    var toplevel, messages;
    var lines = code.split('\n');  // Can be used (in the future) to display extract from code corresponding to error location

    try {
        toplevel = await parse_file(code, filename);
    } catch(e) {
        if (e instanceof RapydScript.ImportError) {
            messages = [{filename:filename, start_line:e.line, start_col:e.col, level:ERROR, ident:'import-err', message:e.message}];
        } else if (e instanceof RapydScript.SyntaxError) {
            messages = [{filename:filename, start_line:e.line, start_col:e.col, level:ERROR, ident:'syntax-err', message:e.message}];
        } else throw e;
    }

    if (toplevel) {
        messages = lint_parsed(toplevel, code, options);
    }
    messages.forEach(function(msg, i) { msg.code_lines = lines; reportcb(msg, i, messages); });
    return messages;
}

export { BUILTINS };

// CLI {{{

async function read_whole_file(filename) {
    if (!filename || filename === '-') {
        var chunks = [];
        process.stdin.setEncoding('utf-8');
        await new Promise((resolve, reject) => {
            process.stdin.on('data', chunk => chunks.push(chunk));
            process.stdin.on('end', resolve);
            process.stdin.on('error', reject);
        });
        process.openStdin();
        return chunks.join('');
    } else {
        return await fs.promises.readFile(filename, 'utf-8');
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
    if (!has_prop(ini_cache, toplevel_dir)) {
        // Store the promise so concurrent callers for the same dir share one read.
        ini_cache[toplevel_dir] = read_config(toplevel_dir).then(function(r) { return r.rapydscript || {}; });
    }
    return ini_cache[toplevel_dir];
}

export async function cli(argv, base_path, src_path, lib_path) {
    var files = argv.files.slice();

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

    if (argv.input_list) {
        // Check for conflict: --input-list=- and - as an input file
        if (argv.input_list === '-' && files.indexOf('-') !== -1) {
            console.error("ERROR: Cannot use - as both --input-list source and an input file");
            process.exit(1);
        }
        var list_data;
        try {
            list_data = await read_whole_file(argv.input_list === '-' ? null : argv.input_list);
        } catch(e) {
            console.error("ERROR: can't read input list file: " + argv.input_list);
            process.exit(1);
        }
        var list_files = list_data.split('\n').map(function(l) { return l.trim(); }).filter(function(l) { return l.length > 0; });
        files = files.concat(list_files);
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

    function path_for_filename(x) {
        return x === '-' ? argv.stdin_filename : x;
    }

    // reportcb used for final output (same logic as inside lint_code)
    var reportcb = {'json': cli_json_report, 'vim': cli_vim_report, 'undef': cli_undef_report}[argv.errorformat] || cli_report;

    // Expand directories to .pyj files recursively, stat-ing entries in parallel.
    async function expand_dirs(inputs, toplevel) {
        // Stat all entries concurrently, then process results in sorted order.
        var entries = await Promise.all(inputs.map(async function(f) {
            if (f === '-') return { f, type: 'stdin' };
            var st;
            try { st = await fs.promises.lstat(f); }
            catch (e) {
                if (toplevel) { console.error("ERROR: can't access: " + f); process.exit(1); }
                return null;
            }
            if (st.isDirectory()) return { f, type: 'dir' };
            if (st.isFile()) return { f, type: 'file' };
            return null;
        }));

        var result = [];
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            if (!entry) continue;
            if (entry.type === 'stdin') { result.push(entry.f); continue; }
            if (entry.type === 'file') { result.push(entry.f); continue; }
            // Directory: read children and recurse
            var children;
            try {
                children = (await fs.promises.readdir(entry.f)).sort().map(function(x) { return path.join(entry.f, x); });
            } catch(e) {
                if (toplevel) { console.error("ERROR: can't read directory: " + entry.f); process.exit(1); }
                continue;
            }
            var sub = await expand_dirs(children, false);
            sub.forEach(function(x) { if (x.endsWith('.pyj')) result.push(x); });
        }
        return result;
    }
    if (files.length) files = await expand_dirs(files, true);

    var all_files = files.length ? files : [null];
    var has_stdin = all_files.indexOf('-') !== -1 || all_files.indexOf(null) !== -1;

    // Process a single file and return its messages without printing them.
    // Used when the worker pool is not active (stdin, or too few files).
    async function process_file(filename) {
        var code;
        try {
            code = await read_whole_file(filename === '-' ? null : filename);
        } catch(e) {
            console.error("ERROR: can't read file: " + filename);
            process.exit(1);
        }

        var final_builtins = merge(builtins), final_noqa = merge(noqa);

        // Read setup.cfg
        var rl = await get_ini(path.dirname(path_for_filename(filename || '-')));
        var g = {};
        (rl.globals || rl.builtins || '').split(',').forEach(function (x) { g[x.trim()] = true; });
        final_builtins = merge(final_builtins, g);
        g = {};
        (rl.noqa || '').split(',').forEach(function (x) { g[x.trim()] = true; });
        final_noqa = merge(final_noqa, g);

        // Look for # globals: or # noqa: in the first few lines of the file
        code.split('\n', 20).forEach(function (line) {
            var lq = line.replace(/\s+/g, '');
            if (lq.startsWith('#globals:')) {
                (lq.split(':', 2)[1] || '').split(',').forEach(function (item) { final_builtins[item] = true; });
            }
            else if (lq.startsWith('#noqa:')) {
                (lq.split(':', 2)[1] || '').split(',').forEach(function (item) { final_noqa[item] = true; });
            }
        });

        var lines = code.split('\n');
        var msgs = await lint_code(code, {filename:path_for_filename(filename || '-'), builtins:final_builtins, noqa:final_noqa, errorformat:argv.errorformat || false, report:function() {}});
        msgs.forEach(function(msg) { msg.code_lines = lines; });
        return msgs;
    }

    var all_results;
    // Use a worker pool when there are enough files to justify the overhead.
    // Workers own their own compiler instance so parsing runs in parallel across CPU cores.
    var WORKER_THRESHOLD = 4;

    if (!has_stdin && all_files.length >= WORKER_THRESHOLD) {
        var { Worker } = await import('worker_threads');
        var os_mod = await import('os');

        var worker_path = path.join(path.dirname(fileURLToPath(import.meta.url)), 'lint-worker.mjs');
        var num_workers = Math.min(os_mod.cpus().length, all_files.length, 8);

        // Dispatch files to workers dynamically so fast files don't leave workers idle.
        var ordered_results = new Array(all_files.length);
        var next_idx = 0;
        var pending = all_files.length;
        var done_resolve;
        var done_promise = new Promise(function(res) { done_resolve = res; });
        if (pending === 0) done_resolve();

        function dispatch(worker) {
            if (next_idx >= all_files.length) return;
            var idx = next_idx++;
            worker.postMessage({
                type: 'lint',
                id: idx,
                filename: all_files[idx],
                base_builtins: builtins,
                base_noqa: noqa,
            });
        }

        // Create workers and dispatch eagerly as each becomes ready rather than
        // waiting for all workers before starting any work.
        var worker_promises = Array.from({length: num_workers}, function() {
            return new Promise(function(resolve) {
                var w = new Worker(worker_path);
                w.once('message', function(m) {
                    if (m.type !== 'ready') return;
                    w.on('message', function(msg) {
                        if (msg.type === 'result') {
                            ordered_results[msg.id] = msg.messages;
                        } else if (msg.type === 'error') {
                            console.error("ERROR: lint failed for " + all_files[msg.id] + ": " + msg.error);
                            ordered_results[msg.id] = [];
                        }
                        pending--;
                        if (pending === 0) { done_resolve(); return; }
                        dispatch(w);
                    });
                    dispatch(w);
                    resolve(w);
                });
            });
        });

        await done_promise;
        var workers = await Promise.all(worker_promises);
        workers.forEach(function(w) { w.terminate(); });
        all_results = ordered_results;
    } else {
        // Single-threaded path: process concurrently on the main thread.
        all_results = await Promise.all(all_files.map(process_file));
    }

    var all_messages = [];
    all_results.forEach(function(msgs) { Array.prototype.push.apply(all_messages, msgs); });
    if (all_messages.length) all_ok = false;
    all_messages.forEach(function(msg, i) { reportcb(msg, i, all_messages); });

    process.exit((all_ok) ? 0 : 1);
}
// }}}
