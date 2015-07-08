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
var regenerator = require('regenerator');
var UglifyJS = require("uglify-js");

function sha1sum(data) { 
    var h = crypto.createHash('sha1');
    h.update(data);
    return h.digest('hex');
}

function regenerate(code, beautify) {
    var ans;
    if (code) {
        ans = regenerator.compile(code).code;
        if (!beautify) {
            ans = UglifyJS.minify(ans, {fromString:true}).code;
        }
    } else {
        // Return the runtime
        ans = regenerator.compile('', {includeRuntime:true}).code;
        ans = ans.slice(ans.indexOf('!'), ans.lastIndexOf(')(')) + ')';
        if (!beautify) {
            ans = UglifyJS.minify(ans+'();', {fromString:true}).code.slice(0, -3);
        }
    }
    return ans;
}

function create_compiler() {
    var compiler_exports = {};
    var compiler_context = vm.createContext({
        console       : console,
        readfile      : fs.readFileSync,
        writefile     : fs.writeFileSync,
        sha1sum       : sha1sum,
        require       : require,
        regenerate    : regenerate,
        exports       : compiler_exports,
    });

    var compilerjs = fs.readFileSync(path.join(
                path.dirname(path.dirname(module.filename)), 'lib', 'compiler.js'), 'utf-8');
    vm.runInContext(compilerjs, compiler_context, 'lib/compiler.js');
    return compiler_exports;
}

exports.create_compiler = create_compiler;
