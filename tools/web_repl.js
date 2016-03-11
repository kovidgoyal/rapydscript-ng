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

    return {
        'toplevel': null,
        'compile': function web_repl_compile(code, options) {
            options = options || {};
            this.toplevel = compiler.parse(code, {
                filename: '<repl>',
                basedir: '::',
            });
            var out = compiler.OutputStream(output_options);
            this.toplevel.print(out);
            return out.toString();
        },
        'runjs': function runjs(code) {
            vm.runInContext(code, ctx);
        },
    };
};

