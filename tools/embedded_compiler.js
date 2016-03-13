/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2016 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict";  /*jshint node:true */


module.exports = function(compiler, baselib, runjs, name) {
	var output_options = {'omit_baselib':true, 'write_name':false, 'private_scope':false, 'beautify':true, 'js_version': 6};
    compiler.AST_Node.warn_function = function() {};
    var LINE_CONTINUATION_CHARS = ':\\';
    runjs = runjs || eval;
    runjs(baselib);
    runjs('var __name__ = "' + (name || '__embedded__') + '";');

    return {
        'toplevel': null,

        'compile': function web_repl_compile(code, filename) {
            var classes = (this.toplevel) ? this.toplevel.classes : undefined;
            this.toplevel = compiler.parse(code, {
                'filename': filename || '<embedded>',
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

    };
};

