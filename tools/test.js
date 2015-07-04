/*
 * test.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */
"use strict;";
var path = require('path');
var fs = require('fs');
var RapydScript = require('./compiler');
var colored = require('./utils').safe_colored;

module.exports = function(argv, base_path, src_path, lib_path) {
    // run all tests and exit
    var assert = require("assert");
    var os = require('os');
    var failures = [];
    var vm = require('vm');
    var test_dir = path.join(base_path, 'test');
	var baselib = RapydScript.parse_baselib(src_path, true);
    var files;

    if (argv.files.length) {
        files = [];
		argv.files.forEach(function(fname) { files.push(fname + '.pyj'); });
	} else {
        files = fs.readdirSync(test_dir).filter(function(name){
            return /^[^_].*\.pyj$/.test(name);
        });
	}
    files.forEach(function(file){
        var ast;
        var filepath = path.join(test_dir, file);
        try {
            ast = RapydScript.parse(fs.readFileSync(filepath, "utf-8"), {
                filename: file,
                toplevel: ast,
                basedir: test_dir,
                libdir: path.join(src_path, 'lib'),
            });
        } catch(e) {
            failures.push(file);
            if (e.stack) 
                console.log(colored(file, 'red') + ": Parsing failed\n" + e.stack + "\n\n");
             else 
                console.log(colored(file, 'red') + ": Parsing failed: " + e + "\n\n");
            return;
        }
        // generate output
        var output = RapydScript.OutputStream({
            baselib: baselib,
            beautify: true
        });
        ast.print(output);

        // test that output performs correct JS operations
        var jsfile = path.join(os.tmpdir(), file + '.js');
        var code = output.toString();
        try {
            vm.runInNewContext(code, {
                'assert':require('assert'), 
                'require':require, 
                'fs':fs,
                'RapydScript':RapydScript, 
                'console':console,
                'base_path': base_path
            }, {'filename':jsfile});
        } catch (e) {
            fs.writeFileSync(jsfile, code);
            if (e.stack) 
                console.log(colored(file, 'red') + ":\n" + e.stack + "\n\n");
             else 
                console.log(colored(file, 'red') + ": " + e + "\n\n");
        }
		if (!failures.length) console.log(colored(file, 'green') + ": test completed successfully\n");
        else { failures.push(file); console.log(colored(file, 'red') + ":\ttest failed\n"); }
    });
    if (failures.length) {
        console.log(colored('There were ' + failures.length + ' test failure(s):', 'red'));
        console.log.apply(console, failures);
    } else console.log(colored('All tests passed!', 'green'));
    process.exit((failures.length) ? 1 : 0);
};
