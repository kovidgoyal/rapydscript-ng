/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict;";

// Thin wrapper around lib/compiler.js to setup some global facilities and
// export the compiler's symbols safely.

var path = require("path");
var fs = require("fs");
var crypto = require('crypto');
var vm = require("vm");

function sha1sum(data) { 
    var h = crypto.createHash('sha1');
    h.update(data);
    return h.digest('hex');
}

function create_compiler() {
    var compiler_exports = {};
    var compiler_context = vm.createContext({
        console       : console,
        readfile      : fs.readFileSync,
        writefile     : fs.writeFileSync,
        sha1sum       : sha1sum,
        require       : require,
        exports       : compiler_exports,
    });

    var compilerjs = fs.readFileSync(path.join(
                path.dirname(path.dirname(module.filename)), 'lib', 'compiler.js'), 'utf-8');
    vm.runInContext(compilerjs, compiler_context, 'lib/compiler.js');
    return compiler_exports;
}

exports.create_compiler = create_compiler;
