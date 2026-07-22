/*
 * web_repl_export.mjs
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */

import fs from 'fs';
import path from 'path';
import * as utils from './utils.mjs';

export default async function run_web_repl_export(base_path, lib_path, argv) {
    if (globalThis.__rapydscript_embedded__) {
        console.error('web-repl-export requires the full source repository and cannot run from a standalone binary.');
        process.exit(1);
    }
    var output_dir = argv.files[0];
    if (!output_dir) {
        console.error('Usage: rapydscript web-repl-export /path/to/export/directory');
        process.exit(1);
    }

    var meta = JSON.parse(await fs.promises.readFile(path.join(base_path, 'package.json'), 'utf-8'));
    var commit_sha = (await fs.promises.readFile(path.join(base_path, '.git', 'refs', 'heads', 'master'), 'utf-8')).trim();

    var manifest = {}, total = 0;
    for (const x of ['compiler.js', 'baselib-plain-pretty.js']) {
        manifest[x] = await fs.promises.readFile(path.join(lib_path, x), 'utf-8');
        total += manifest[x].length;
    }

    for (const x of ['web_repl.js', 'embedded_compiler.js', 'treeshake.js', 'sourcemap.js', 'utils.js', 'completer.js', 'msgfmt.js', 'gettext.js', 'ast_serialize.mjs']) {
        var mjs = x.replace(/\.js$/, '.mjs');
        var mjs_path = path.join(base_path, 'tools', mjs);
        var js_path = path.join(base_path, 'tools', x);
        var use_mjs = await utils.path_exists(mjs_path);
        var key = 'tools/' + (use_mjs ? mjs : x);
        manifest[key] = await fs.promises.readFile(use_mjs ? mjs_path : js_path, 'utf-8');
        total += manifest[key].length;
    }

    var stdlib = path.join(base_path, 'src', 'lib');

    async function process_stdlib_dir(relpath) {
        var fullpath = relpath ? path.join(stdlib, relpath) : stdlib;
        var entries = await fs.promises.readdir(fullpath);
        for (const x of entries) {
            var q = path.join(fullpath, x);
            var s = await fs.promises.stat(q);
            if (s.isDirectory()) { await process_stdlib_dir(relpath + '/' + x); continue; }
            if (!x.endsWith('.pyj')) continue;
            var iname = path.normalize('__stdlib__' + '/' + relpath + '/' + x);
            var raw = await fs.promises.readFile(q, 'utf-8');
            manifest[iname] = raw;
            total += s.size;
        }
    }
    await process_stdlib_dir('');

    var rs = '// vim:fileencoding=utf-8\n';
    rs += '(function(external_namespace) {\n';
    rs += '"use strict;"\n';
    rs += 'var rs_version = ' + JSON.stringify(meta.version) + ';\n';
    rs += 'var rs_commit_sha = ' + JSON.stringify(commit_sha) + ';\n';
    rs += '\n// Embedded modules {{{\n';
    rs += 'var data = ' + JSON.stringify(manifest) + ';\n\n';
    rs += '// End embedded modules }}}\n\n';
    rs += await fs.promises.readFile(path.join(base_path, 'web-repl', 'env.js'));
    rs += '\n// Embedded sha1 implementation {{{\n';
    rs += '(function() {\n';
    rs += await fs.promises.readFile(path.join(base_path, 'web-repl', 'sha1.js'));
    rs += '}).call(jsSHA);\n';
    rs += '// End embedded sha1 implementation }}}\n\n';
    rs += 'var exports = namespace;\n';
    rs += await fs.promises.readFile(path.join(base_path, 'tools', 'export.js'), 'utf-8');
    rs += 'external_namespace.RapydScript = namespace;\n';
    rs += '})(this);\n';

    var base_dir = path.normalize(path.resolve(output_dir));

    try {
        await fs.promises.mkdir(base_dir);
    } catch(e) {
        if (e.code !== 'EEXIST') throw e;
    }

    await fs.promises.writeFile(path.join(base_dir, 'rapydscript.js'), rs, 'utf-8');
    var web_repl_dir = path.join(base_path, 'web-repl');
    var web_repl_files = await fs.promises.readdir(web_repl_dir);
    for (const x of web_repl_files) {
        if (['sha1.js', 'env.js'].indexOf(x) !== -1) continue;
        var file_data = await fs.promises.readFile(path.join(web_repl_dir, x), 'utf-8');
        await fs.promises.writeFile(path.join(base_dir, x), file_data, 'utf-8');
    }
    console.log('RapydScript compiler (uncompressed) size: ' + (total/(1024)).toFixed(1) + ' KB');
    console.log('web-repl exported to: ' + base_dir);
}
