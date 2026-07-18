/* vim:fileencoding=utf-8
 *
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict";

// Thin wrapper around (release|dev)/compiler.js to setup some global facilities and
// export the compiler's symbols safely.

import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import vm from 'vm';
import * as terser from 'terser';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { generate_source_map } from './sourcemap.mjs';
import embedded_compiler_factory from './embedded_compiler.mjs';
import tree_shake from './treeshake.mjs';
import { make_ast_serializer } from './ast_serialize.mjs';

const _cjs_require = createRequire(import.meta.url);

function sha1sum(data) {
    var h = crypto.createHash('sha1');
    h.update(data);
    return h.digest('hex');
}

async function path_exists(p) {
    try {
        await fs.promises.stat(p);
        return true;
    } catch(e) {
        if (e.code != 'ENOENT') throw e;
        return false;
    }
}

function uglify(code) {
    var ans = terser.minify_sync(code);
    if (ans.error) throw ans.error;
    return ans.code;
}


async function find_compiler_dir() {
    var base = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
    var compiler_dir = path.join(base, 'dev');
    if (!await path_exists(path.join(compiler_dir, 'compiler.js'))) compiler_dir = path.join(base, 'release');
    return { base, compiler_dir };
}

async function create_compiler(opts) {
    opts = opts || {};
    var vfs = opts.virtual_file_system;

    const { base, compiler_dir } = await find_compiler_dir();

    var readfile, writefile;
    if (vfs) {
        var stdlib_dir = path.join(base, 'src', 'lib');
        readfile = async (p, enc) => {
            if (p.startsWith('__stdlib__/')) {
                return fs.promises.readFile(path.join(stdlib_dir, p.slice('__stdlib__/'.length)), enc);
            }
            return vfs.read_file(p, enc);
        };
        writefile = async (p, data) => {
            if (p.startsWith('__vfs__/')) return vfs.write_file(p, data);
            return fs.promises.writeFile(p, data);
        };
    } else {
        readfile = async (p, enc) => fs.promises.readFile(p, enc);
        writefile = async (p, data) => fs.promises.writeFile(p, data);
    }

    var compiler_exports = {};
    var compiler_context = vm.createContext({
        console       : console,
        readfile      : readfile,
        writefile     : writefile,
        sha1sum       : sha1sum,
        require       : _cjs_require,
        exports       : compiler_exports,
    });
    var compiler_file = path.join(compiler_dir, 'compiler.js');
    var compilerjs = await fs.promises.readFile(compiler_file, 'utf-8');
    vm.runInContext(compilerjs, compiler_context, path.relative(base, compiler_file));
    const { ast_to_json, ast_from_json } = make_ast_serializer(compiler_exports);
    compiler_exports.ast_to_json = ast_to_json;
    compiler_exports.ast_from_json = ast_from_json;
    // Inject into the VM context so parse.pyj compiled code can call them as globals.
    compiler_context.ast_to_json = ast_to_json;
    compiler_context.ast_from_json = ast_from_json;
    return compiler_exports;
}

async function create_embedded_compiler(compiler, baselib, runjs, name) {
    return await embedded_compiler_factory(compiler || await create_compiler(), baselib, runjs, name, tree_shake, generate_source_map);
}

export { create_compiler, create_embedded_compiler, generate_source_map };
