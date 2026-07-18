/*
 * test.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */

import path from 'path';
import fs from 'fs';
import assert from 'assert';
import os from 'os';
import vm from 'vm';
import { createRequire } from 'module';
import { create_compiler } from './compiler.mjs';
import embedded_compiler_factory from './embedded_compiler.mjs';
import * as utils from './utils.mjs';
import { gettext as rs_gettext, entry_to_string as rs_entry_to_string } from './gettext.mjs';
import { parse as rs_msgfmt_parse, build as rs_msgfmt_build } from './msgfmt.mjs';
import rs_repl_fn from './repl.mjs';
import { generate_source_map as rs_generate_source_map } from './sourcemap.mjs';

const require = createRequire(import.meta.url);
const RapydScript = await create_compiler();
var colored = utils.safe_colored;

export default async function(argv, base_path, src_path, lib_path) {
    // run all tests and exit
    var failures = [];
    var compiler_dir = path.join(base_path, 'dev');
    if (!await utils.path_exists(path.join(compiler_dir, 'compiler.js'))) compiler_dir = path.join(base_path, 'release');
    var test_dir = path.join(base_path, 'test');
    var baselib = await fs.promises.readFile(path.join(lib_path, 'baselib-plain-pretty.js'), 'utf-8');
    var files;
    var deep_eq = assert.deepEqual;
    assert.deepEqual = function(a, b, message) {
        // Compare array objects that have extra properties as simple arrays
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a === b) return;
            if (a.length !== b.length) throw new assert.AssertionError({actual:a, expected:b, operator:'deepEqual', stackStartFunction:assert.deepEqual});
            for(var i=0; i < a.length; i++) assert.deepEqual(a[i], b[i], message);
        } else if (a !== undefined && a !== null && typeof a.__eq__ === 'function') {
            if (!a.__eq__(b)) throw new assert.AssertionError({actual:a, expected:b, operator:'deepEqual', stackStartFunction:assert.deepEqual});
        } else return deep_eq(a, b, message);
    };

    if (argv.files.length) {
        files = argv.files.map(fname => fname + '.pyj');
    } else {
        files = (await fs.promises.readdir(test_dir)).filter(function(name){
            return /^[^_].*\.pyj$/.test(name);
        });
    }

    for (const file of files) {
        let filepath = path.join(test_dir, file);
        let failed = false;
        let src;
        let ast;
        try {
            src = await fs.promises.readFile(filepath, "utf-8");
            ast = await RapydScript.parse(src, {
                filename: file,
                toplevel: ast,
                basedir: test_dir,
                libdir: path.join(src_path, 'lib'),
            });
        } catch(e) {
            failures.push(file);
            failed = true;
            console.log(colored(file, 'red') + ': ' + e + "\n\n");
            continue;
        }

        // generate output
        var output = new RapydScript.OutputStream({
            baselib_plain: baselib,
            beautify: true,
            js_version: 6,
            keep_docstrings: true,
        });
        ast.print(output);

        // test that output performs correct JS operations
        var jsfile = path.join(os.tmpdir(), file + '-es6.js');
        var code = output.toString();
        try {
            let result = vm.runInNewContext(code, {
                'assrt':assert,
                '__name__': jsfile,
                'require':require,
                'fs':fs,
                'RapydScript':RapydScript,
                'console':console,
                'compiler_dir': compiler_dir,
                'test_path':test_dir,
                'Buffer': Buffer,
                'rs_gettext': rs_gettext,
                'rs_entry_to_string': rs_entry_to_string,
                'rs_msgfmt': { parse: rs_msgfmt_parse, build: rs_msgfmt_build },
                'rs_repl': rs_repl_fn,
                'rs_generate_source_map': rs_generate_source_map,
                'rs_create_embedded_compiler': async function(opts) {
                    // Mirror what the browser bundle does: compiler + embedded baselib → factory.
                    // Tests may pass { virtual_file_system } to override readfile/writefile.
                    var compiler = await create_compiler(opts);
                    return await embedded_compiler_factory(compiler, baselib, undefined, undefined, undefined, undefined);
                },
            }, {'filename':jsfile});
            if (result && typeof result.then === 'function') {
                await result;
            }
        } catch (e) {
            failures.push(file);
            failed = true;
            await fs.promises.writeFile(jsfile, code);
            console.error('Failed running: ' + colored(jsfile, 'red'));
            if (e.stack)
                console.error(colored(file, 'red') + ":\n" + e.stack + "\n\n");
            else
                console.error(colored(file, 'red') + ": " + e + "\n\n");
        }
        if (!failed) console.log(colored(file, 'green') + ": test completed successfully\n");
        else { console.log(colored(file, 'red') + ":\ttest failed\n"); }
    }
    if (failures.length) {
        console.log(colored('There were ' + failures.length + ' test failure(s):', 'red'));
        console.log.apply(console, failures);
    } else console.log(colored('All tests passed!', 'green'));
    process.exit((failures.length) ? 1 : 0);
}
