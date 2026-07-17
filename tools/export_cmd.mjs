/*
 * export_cmd.mjs
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import * as utils from './utils.mjs';

export default async function run_export(base_path, lib_path) {
    var meta = JSON.parse(await fs.promises.readFile(path.join(base_path, 'package.json'), 'utf-8'));

    var manifest = {}, total = 0;
    for (const x of ['compiler.js', 'baselib-plain-pretty.js', 'baselib-plain-ugly.js']) {
        manifest[x] = await fs.promises.readFile(path.join(lib_path, x), 'utf-8');
        total += manifest[x].length;
    }

    for (const x of ['web_repl.js', 'repl.js', 'completer.js', 'utils.js', 'gettext.js', 'msgfmt.js', 'treeshake.js', 'sourcemap.js']) {
        var mjs = x.replace(/\.js$/, '.mjs');
        var mjs_path = path.join(base_path, 'tools', mjs);
        var js_path = path.join(base_path, 'tools', x);
        var use_mjs = await utils.path_exists(mjs_path);
        var key = 'tools/' + (use_mjs ? mjs : x);
        manifest[key] = await fs.promises.readFile(use_mjs ? mjs_path : js_path, 'utf-8');
        total += manifest[key].length;
    }

    var dedup = {};

    function sha1sum(data) {
        var h = crypto.createHash('sha1');
        h.update(data);
        return h.digest('hex');
    }

    async function process_dir(name) {
        var dpath = path.join(base_path, name);
        var items = await fs.promises.readdir(dpath);
        for (const x of items) {
            var iname = name + '/' + x;
            var ipath = path.join(dpath, x);
            var s = await fs.promises.stat(ipath);
            if (s.isDirectory()) { await process_dir(iname); continue; }
            var raw = await fs.promises.readFile(ipath, 'utf-8');
            var sig = sha1sum(raw);
            if (dedup.hasOwnProperty(sig)) {
                manifest[iname] = [dedup[sig]];
            } else {
                manifest[iname] = raw;
                dedup[sig] = iname;
                total += s.size;
            }
        }
    }

    for (const x of Object.keys(meta.dependencies)) {
        await process_dir('node_modules/' + x);
    }
    console.log('// vim:fileencoding=utf-8');
    console.log('(function() {');
    console.log('var rs_version = ' + JSON.stringify(meta.version) + ';');
    console.log('var data = ' + JSON.stringify(manifest) + ';');
    console.log();
    console.log(await fs.promises.readFile(path.join(base_path, 'tools', 'export.js'), 'utf-8'));
    console.log('})()');
    console.error('RapydScript compiler (uncompressed) size: ' + (total/(1024 * 1024)).toFixed(1) + ' MB');
}
