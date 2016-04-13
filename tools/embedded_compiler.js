/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2016 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict";  /*jshint node:true */

var has_prop = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);

module.exports = function(compiler, baselib, runjs, name) {
    compiler.AST_Node.warn_function = function() {};
    var LINE_CONTINUATION_CHARS = ':\\';
    runjs = runjs || eval;
    runjs(print_ast(compiler.parse(''), true));
    runjs('var __name__ = "' + (name || '__embedded__') + '";');

    function print_ast(ast, keep_baselib, keep_docstrings) {
        var output_options = {omit_baselib:!keep_baselib, write_name:false, private_scope:false, beautify:true, js_version: 6, keep_docstrings:keep_docstrings};
        if (keep_baselib) output_options.baselib_plain = baselib;
        var output = new compiler.OutputStream(output_options);
        ast.print(output);
        return output.get();
    }

    return {
        'toplevel': null,

        'compile': function web_repl_compile(code, filename, keep_docstrings, discard_asserts) {
            var classes = (this.toplevel) ? this.toplevel.classes : undefined;
            var scoped_flags = (this.toplevel) ? this.toplevel.scoped_flags: undefined;
            this.toplevel = compiler.parse(code, {
                'filename': filename || '<embedded>',
                'basedir': '__stdlib__',
                'classes': classes,
                'scoped_flags': scoped_flags,
                'discard_asserts': discard_asserts,
            });
            var ans = print_ast(this.toplevel, false, keep_docstrings);
            if (classes) {
                var exports = {};
                var self = this;
                this.toplevel.exports.forEach(function (name) { exports[name] = true; });
                Object.getOwnPropertyNames(classes).forEach(function (name) {
                    if (!has_prop(exports, name) && !has_prop(self.toplevel.classes, name))
                        self.toplevel.classes[name] = classes[name];
                });
            }
            scoped_flags = this.toplevel.scoped_flags;
    
            return ans;
        },

    };
};

