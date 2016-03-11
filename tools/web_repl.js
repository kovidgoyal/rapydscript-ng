/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2016 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict";  /*jshint node:true */


module.exports = function(compiler, baselib) {
	var output_options = {'omit_baselib':true, 'write_name':false, 'private_scope':false, 'beautify':true, 'js_version': 6};
    var vm = require('vm');
    compiler.AST_Node.warn_function = function() {};
    var ctx = vm.createContext();
    var LINE_CONTINUATION_CHARS = ':\\';
    var find_completions = null;
    vm.runInContext(baselib, ctx);
    vm.runInContext('var __name__ = "__repl__";', ctx);

    return {
        'toplevel': null,
        'in_block_mode': false,

        'replace_print': function replace_print(write_line_func) {
            ctx.print = function() {
                var parts = [];
                for (var i = 0; i < arguments.length; i++) 
                    parts.push(ctx._$rapyd$_str(arguments[i]));
                write_line_func(parts.join(' '));
            };
        },

        'is_input_complete': function is_input_complete(source) {
            if (!source || !source.trim()) return false;
            var lines = source.split('\n');
            var last_line = lines[lines.length - 1].trimRight();
            if (this.in_block_mode) {
                // In a block only exit after two blank lines
                if (lines.length < 2) return false;
                var second_last_line = lines[lines.length - 2].trimRight();
                var block_ended = !!(!last_line && !second_last_line);
                if (!block_ended) return false;
                this.in_block_mode = false;
                return true;
            }

            if (last_line && LINE_CONTINUATION_CHARS.indexOf(last_line.substr(last_line.length - 1)) > -1) {
                this.in_block_mode = true;
                return false;
            }
            try {
                compiler.parse(source, {'filename': '<repl>', 'basedir': '__stdlib__'});
            } catch(e) {
                if (e.is_eof && e.line === lines.length && e.col > 0) {
                    return false;
                }
                this.in_block_mode = false;
                return true;
            }
            this.in_block_mode = false;
            return true;
        },

        'compile': function web_repl_compile(code, options) {
            var classes = (this.toplevel) ? this.toplevel.classes : undefined;
            options = options || {};
            this.toplevel = compiler.parse(code, {
                'filename': '<repl>',
                'basedir': '__stdlib__',
                'classes': classes,
            });
            var out = compiler.OutputStream(output_options);
            this.toplevel.print(out);
            if (classes) {
                var exports = {};
                var self = this;
                this.toplevel.exports.forEach(function (name) { exports[name] = true; });
                Object.getOwnPropertyNames(classes).forEach(function (name) {
                    if (!exports.hasOwnProperty(name) && !self.toplevel.classes.hasOwnProperty(name))
                        self.toplevel.classes[name] = classes[name];
                });
            }
    
            return out.toString();
        },

        'runjs': function runjs(code) {
            var ans = vm.runInContext(code, ctx);
            if (ans !== undefined || ans === null) {
                ctx._$rapyd$_repl_val = ans;
                var q = vm.runInContext('_$rapyd$_repr(_$rapyd$_repl_val)', ctx);
                ans = (q === 'undefined') ? ans.toString() : q;
            }
            return ans;
        },

        'init_completions': function init_completions(completelib) {
            find_completions = completelib(compiler);
        },

        'find_completions': function find_completions_(line) {
            return find_completions(line, ctx);
        },

    };
};

