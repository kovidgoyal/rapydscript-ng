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
            const unhandled = [];
            const on_rejection = (reason) => unhandled.push(reason);
            process.on('unhandledRejection', on_rejection);
            try {
                // __test_async_done__ is a sandbox global that async test files can assign
                // their top-level Promise to (e.g. `__test_async_done__ = run_tests()`).
                // Assigning to an existing global inside a strict-mode IIFE is legal, so
                // this lets us properly await tests whose async Promise is otherwise buried
                // inside a synchronous wrapper IIFE and never returned from the script.
                const sandbox = {
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
                    '__test_async_done__': null,
                };
                let result = vm.runInNewContext(code, sandbox, {'filename':jsfile});
                if (result && typeof result.then === 'function') {
                    await result;
                }
                // Await any async Promise that the test file registered via __test_async_done__.
                if (sandbox.__test_async_done__ && typeof sandbox.__test_async_done__.then === 'function') {
                    await sandbox.__test_async_done__;
                }
                // Drain one event-loop tick so Node.js can fire unhandledRejection
                // for any async work that was not captured by either mechanism above.
                await new Promise(resolve => setImmediate(resolve));
                if (unhandled.length) throw unhandled[0];
            } finally {
                process.removeListener('unhandledRejection', on_rejection);
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
    // Run the bun standalone binary test when doing a full test suite run and bun
    // is available.  Individual file runs (argv.files.length > 0) skip it.
    if (!argv.files.length) {
        const bun_test_name = 'bun_standalone_binary';
        let bun_ok = false;
        try {
            bun_ok = await run_bun_standalone_test(base_path, colored);
        } catch (e) {
            console.error(colored(bun_test_name, 'red') + ': unexpected error: ' + (e.stack || e));
        }
        if (bun_ok) {
            console.log(colored(bun_test_name, 'green') + ': test completed successfully\n');
        } else {
            failures.push(bun_test_name);
            console.log(colored(bun_test_name, 'red') + ':\ttest failed\n');
        }
    }

    if (failures.length) {
        console.log(colored('There were ' + failures.length + ' test failure(s):', 'red'));
        console.log.apply(console, failures);
    } else console.log(colored('All tests passed!', 'green'));
    process.exit((failures.length) ? 1 : 0);
}

async function run_bun_standalone_test(base_path, colored) {
    const { spawnSync } = await import('child_process');
    const test_name = 'bun_standalone_binary';

    // Check if bun is available.
    const bun_check = spawnSync('bun', ['--version'], { encoding: 'utf-8' });
    if (bun_check.error || bun_check.status !== 0) {
        console.log(colored(test_name, 'yellow') + ': bun not found, skipping');
        return true;
    }

    // Generate bin/rapydscript.mjs via build.ts.
    const build_ts = path.join(base_path, 'bin', 'build.ts');
    const gen_result = spawnSync('bun', [build_ts], { encoding: 'utf-8', cwd: base_path });
    if (gen_result.status !== 0) {
        console.error(colored(test_name, 'red') + ': build.ts failed:\n' + (gen_result.stderr || gen_result.stdout));
        return false;
    }

    // Compile the standalone binary.
    const binary_path = path.join(os.tmpdir(), 'rapydscript-bun-test-binary');
    const entry_mjs = path.join(base_path, 'bin', 'rapydscript.mjs');
    const compile_result = spawnSync(
        'bun', ['build', entry_mjs, '--compile', '--outfile', binary_path],
        { encoding: 'utf-8', cwd: base_path }
    );
    if (compile_result.status !== 0) {
        console.error(colored(test_name, 'red') + ': bun build --compile failed:\n' + (compile_result.stderr || compile_result.stdout));
        return false;
    }

    // Create test fixtures in a temp directory.
    const tmp_dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'rs-bun-test-'));
    try {
        // A local module the test will import from the filesystem.
        await fs.promises.writeFile(path.join(tmp_dir, 'greeter.pyj'),
            'def greet(name):\n    return "Hello, " + name\n');

        // Main source: imports a stdlib module (re) AND the local module.
        const src_file = path.join(tmp_dir, 'main.pyj');
        await fs.promises.writeFile(src_file, [
            'import re',
            'from greeter import greet',
            '',
            'pattern = re.compile(r"world", re.I)',
            'result = pattern.sub("RapydScript", "Hello world")',
            'if result != "Hello RapydScript":',
            '    raise AssertionError("re.sub gave: " + result)',
            '',
            'msg = greet("world")',
            'if msg != "Hello, world":',
            '    raise AssertionError("greet gave: " + msg)',
        ].join('\n'));

        const out_file = path.join(tmp_dir, 'main.js');

        // Compile main.pyj with the standalone binary.
        const run_result = spawnSync(
            binary_path, [src_file, '--output', out_file],
            { encoding: 'utf-8', cwd: tmp_dir }
        );
        if (run_result.status !== 0) {
            console.error(colored(test_name, 'red') + ': standalone binary compilation failed:\n' +
                (run_result.stderr || run_result.stdout));
            return false;
        }

        // Execute the compiled output with node to verify correctness.
        const js_code = await fs.promises.readFile(out_file, 'utf-8');
        try {
            vm.runInNewContext(js_code, { console }, { filename: out_file });
        } catch (e) {
            console.error(colored(test_name, 'red') + ': compiled output threw:\n' + (e.stack || e));
            return false;
        }

        return true;
    } finally {
        await fs.promises.rm(tmp_dir, { recursive: true, force: true });
    }
}
