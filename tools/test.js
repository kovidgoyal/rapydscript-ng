/*
 * test.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */
"use strict;";
var path = require('path');
var fs = require('fs');
var RapydScript = require('./compiler').create_compiler();
var colored = require('./utils').safe_colored;

module.exports = function(argv, base_path, src_path, lib_path) {
    // run all tests and exit
    var assert = require("assert");
    var os = require('os');
    var failures = [];
    var vm = require('vm');
    var test_dir = path.join(base_path, 'test');
	var baselib = JSON.parse(fs.readFileSync(path.join(lib_path, 'baselib-pretty.js'), 'utf-8'));
    var files;
    var deep_eq = assert.deepEqual;
    assert.deepEqual = function(a, b, message) {
        // Compare array objects that have extra properties as simple arrays
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a === b) return;
            if (a.length !== b.length) throw new assert.AssertionError({actual:a, expected:b, operator:'deepEqual', stackStartFunction:assert.deepEqual});
            for(var i=0; i < a.length; i++) assert.deepEqual(a[i], b[i], message);
        } else return deep_eq(a, b, message);
    };

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
        var failed = false;
        try {
            ast = RapydScript.parse(fs.readFileSync(filepath, "utf-8"), {
                filename: file,
                toplevel: ast,
                basedir: test_dir,
                libdir: path.join(src_path, 'lib'),
            });
        } catch(e) {
            failures.push(file);
            failed = true;
            if (e.stack) 
                console.log(colored(file, 'red') + ": Parsing failed\n" + e.stack + "\n\n");
             else 
                console.log(colored(file, 'red') + ": Parsing failed: " + e + "\n\n");
            return;
        }

        var js_version = 5;
        while (js_version < 7) {
            // generate output
            var output = RapydScript.OutputStream({
                baselib: baselib,
                beautify: true,
                js_version: js_version,
            });
            ast.print(output);

            // test that output performs correct JS operations
            var jsfile = path.join(os.tmpdir(), file + '-es' + js_version + '.js');
            var code = output.toString();
            try {
                vm.runInNewContext(code, {
                    'assert':assert, 
                    'require':require, 
                    'fs':fs,
                    'RapydScript':RapydScript, 
                    'console':console,
                    'base_path': base_path,
                    'test_path':test_dir,
                }, {'filename':jsfile});
            } catch (e) {
                failures.push(file);
                failed = true;
                fs.writeFileSync(jsfile, code);
                if (e.stack) 
                    console.log(colored(file, 'red') + ":\n" + e.stack + "\n\n");
                else 
                    console.log(colored(file, 'red') + ": " + e + "\n\n");
                js_version = 1000;
            }
            js_version++;
        }
		if (!failed) console.log(colored(file, 'green') + ": test completed successfully\n");
        else { console.log(colored(file, 'red') + ":\ttest failed\n"); }
    });
    if (failures.length) {
        console.log(colored('There were ' + failures.length + ' test failure(s):', 'red'));
        console.log.apply(console, failures);
    } else console.log(colored('All tests passed!', 'green'));
    process.exit((failures.length) ? 1 : 0);
};
