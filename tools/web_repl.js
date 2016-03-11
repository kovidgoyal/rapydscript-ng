/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2016 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the GPLv3 license
 */
"use strict";  /*jshint node:true */


module.exports = function(compiler, baselib) {
	var output_options = {'omit_baselib':true, 'write_name':false, 'private_scope':false, 'beautify':true};
    var vm = require('vm');
    compiler.AST_Node.warn_function = function() {};
    var ctx = vm.createContext();
    vm.runInContext(baselib, ctx);
    vm.runInContext('var __name__ = "__repl__";', ctx);

    return {
        'toplevel': null,

        'replace_print': function replace_print(write_line_func) {
            ctx.print = function() {
                var parts = [];
                for (var i = 0; i < arguments.length; i++) 
                    parts.push(ctx._$rapyd$_str(arguments[i]));
                write_line_func(parts.join(' '));
            };
        },

        'compile': function web_repl_compile(code, options) {
            var classes = (this.toplevel) ? this.toplevel.classes : undefined;
            options = options || {};
            this.toplevel = compiler.parse(code, {
                'filename': '<repl>',
                'basedir': '::',
                'classes': classes,
            });
            var out = compiler.OutputStream(output_options);
            this.toplevel.print(out);
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
    };
};

