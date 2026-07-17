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

export default function run_export(base_path, lib_path) {
    var meta = JSON.parse(fs.readFileSync(path.join(base_path, 'package.json'), {'encoding':'utf-8'}));

    var manifest = {}, total = 0;
    ['compiler.js', 'baselib-plain-pretty.js', 'baselib-plain-ugly.js'].forEach(function(x) {
        manifest[x] = fs.readFileSync(path.join(lib_path, x), {'encoding':'utf-8'});
        total += manifest[x].length;
    });

    ['web_repl.js', 'repl.js', 'completer.js', 'utils.js', 'gettext.js', 'msgfmt.js', 'treeshake.js', 'sourcemap.js'].forEach(function(x) {
        var mjs = x.replace(/\.js$/, '.mjs');
        var mjs_path = path.join(base_path, 'tools', mjs);
        var js_path = path.join(base_path, 'tools', x);
        var use_mjs = utils.path_exists(mjs_path);
        var key = 'tools/' + (use_mjs ? mjs : x);
        manifest[key] = fs.readFileSync(use_mjs ? mjs_path : js_path, {'encoding':'utf-8'});
        total += manifest[key].length;
    });

    var dedup = {};

    function sha1sum(data) {
        var h = crypto.createHash('sha1');
        h.update(data);
        return h.digest('hex');
    }

    function process_dir(name) {
        var dpath = path.join(base_path, name);
        var items = fs.readdirSync(dpath);
        items.forEach(function (x) {
            var iname = name + '/' + x;
            var ipath = path.join(dpath, x);
            var s = fs.statSync(ipath);
            if (s.isDirectory()) return process_dir(iname);
            var raw = fs.readFileSync(ipath, {'encoding':'utf-8'});
            var sig = sha1sum(raw);
            if (dedup.hasOwnProperty(sig)) {
                manifest[iname] = [dedup[sig]];
            } else {
                manifest[iname] = raw;
                dedup[sig] = iname;
                total += s.size;
            }
        });
    }

    Object.keys(meta.dependencies).forEach(function (x) {
        process_dir('node_modules/' + x);
    });
    console.log('// vim:fileencoding=utf-8');
    console.log('(function() {');
    console.log('var rs_version = ' + JSON.stringify(meta.version) + ';');
    console.log('var data = ' + JSON.stringify(manifest) + ';');
    console.log();
    console.log(fs.readFileSync(path.join(base_path, 'tools', 'export.js'), {'encoding':'utf-8'}));
    console.log('})()');
    console.error('RapydScript compiler (uncompressed) size: ' + (total/(1024 * 1024)).toFixed(1) + ' MB');
}
