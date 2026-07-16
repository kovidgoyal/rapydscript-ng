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
import regenerator from 'regenerator';
import UglifyJS from 'uglify-js';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { generate_source_map } from './sourcemap.mjs';
import embedded_compiler_factory from './embedded_compiler.mjs';

const _cjs_require = createRequire(import.meta.url);

function sha1sum(data) {
    var h = crypto.createHash('sha1');
    h.update(data);
    return h.digest('hex');
}

function path_exists(path) {
    try {
        fs.statSync(path);
        return true;
    } catch(e) {
        if (e.code != 'ENOENT') throw e;
    }
}

function uglify(code) {
    var ans = UglifyJS.minify(code);
    if (ans.error) throw ans.error;
    return ans.code;
}


function regenerate(code, beautify) {
    var ans, start, end;
    if (code) {
        ans = regenerator.compile(code).code;
        if (!beautify) {
            ans = uglify(ans);
        }
    } else {
        // Return the runtime
        ans = regenerator.compile('', {includeRuntime:true}).code;
        start = ans.indexOf('=') + 1;
        end = ans.lastIndexOf('typeof');
        end = ans.lastIndexOf('}(', end);
        ans = ans.slice(start + 1, end);
        if (!beautify) {
            var extra = '})()';
            ans = uglify(ans + extra).slice(0, extra.length);
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
        require       : _cjs_require,
        regenerate    : regenerate,
        exports       : compiler_exports,
    });

    var base = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
    var compiler_dir = path.join(base, 'dev');
    if (!path_exists(path.join(compiler_dir, 'compiler.js'))) compiler_dir = path.join(base, 'release');
    var compiler_file = path.join(compiler_dir, 'compiler.js');
    var compilerjs = fs.readFileSync(compiler_file, 'utf-8');
    vm.runInContext(compilerjs, compiler_context, path.relative(base, compiler_file));
    return compiler_exports;
}

function create_embedded_compiler(compiler, baselib, runjs, name) {
    return embedded_compiler_factory(compiler || create_compiler(), baselib, runjs, name);
}

export { create_compiler, create_embedded_compiler, generate_source_map };
