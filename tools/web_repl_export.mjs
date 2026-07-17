/*
 * web_repl_export.mjs
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */

import fs from 'fs';
import path from 'path';
import * as utils from './utils.mjs';

export default function run_web_repl_export(base_path, lib_path, argv) {
    var output_dir = argv.files[0];
    if (!output_dir) {
        console.error('Usage: rapydscript web-repl-export /path/to/export/directory');
        process.exit(1);
    }

    var meta = JSON.parse(fs.readFileSync(path.join(base_path, 'package.json'), {'encoding':'utf-8'}));
    var commit_sha = fs.readFileSync(path.join(base_path, '.git', 'refs', 'heads', 'master'), {'encoding':'utf-8'}).trim();

    var manifest = {}, total = 0;
    ['compiler.js', 'baselib-plain-pretty.js'].forEach(function(x) {
        manifest[x] = fs.readFileSync(path.join(lib_path, x), {'encoding':'utf-8'});
        total += manifest[x].length;
    });

    ['web_repl.js', 'embedded_compiler.js', 'treeshake.js', 'sourcemap.js', 'utils.js', 'completer.js', 'msgfmt.js', 'gettext.js'].forEach(function(x) {
        var mjs = x.replace(/\.js$/, '.mjs');
        var mjs_path = path.join(base_path, 'tools', mjs);
        var js_path = path.join(base_path, 'tools', x);
        var use_mjs = utils.path_exists(mjs_path);
        var key = 'tools/' + (use_mjs ? mjs : x);
        manifest[key] = fs.readFileSync(use_mjs ? mjs_path : js_path, {'encoding':'utf-8'});
        total += manifest[key].length;
    });

    var stdlib = path.join(base_path, 'src', 'lib');

    function process_stdlib_dir(relpath) {
        var fullpath = relpath ? path.join(stdlib, relpath) : stdlib;
        fs.readdirSync(fullpath).forEach(function (x) {
            var q = path.join(fullpath, x);
            var s = fs.statSync(q);
            if (s.isDirectory()) return process_stdlib_dir(relpath + '/' + x);
            if (!x.endsWith('.pyj')) return;
            var iname = path.normalize('__stdlib__' + '/' + relpath + '/' + x);
            var raw = fs.readFileSync(q, {'encoding':'utf-8'});
            manifest[iname] = raw;
            total += s.size;
        });
    }
    process_stdlib_dir('');

    var rs = '// vim:fileencoding=utf-8\n';
    rs += '(function(external_namespace) {\n';
    rs += '"use strict;"\n';
    rs += 'var rs_version = ' + JSON.stringify(meta.version) + ';\n';
    rs += 'var rs_commit_sha = ' + JSON.stringify(commit_sha) + ';\n';
    rs += '\n// Embedded modules {{{\n';
    rs += 'var data = ' + JSON.stringify(manifest) + ';\n\n';
    rs += '// End embedded modules }}}\n\n';
    rs += fs.readFileSync(path.join(base_path, 'web-repl', 'env.js'));
    rs += '\n// Embedded sha1 implementation {{{\n';
    rs += '(function() {\n';
    rs += fs.readFileSync(path.join(base_path, 'web-repl', 'sha1.js'));
    rs += '}).call(jsSHA);\n';
    rs += '// End embedded sha1 implementation }}}\n\n';
    rs += 'var exports = namespace;\n';
    rs += fs.readFileSync(path.join(base_path, 'tools', 'export.js'), {'encoding':'utf-8'});
    rs += 'external_namespace.RapydScript = namespace;\n';
    rs += '})(this);\n';

    var base_dir = path.normalize(path.resolve(output_dir));

    try {
        fs.mkdirSync(base_dir);
    } catch(e) {
        if (e.code !== 'EEXIST') throw e;
    }

    try {
        process.chdir(base_dir);
    } catch(e) {
        if (e.code === 'ENOTDIR') { console.error(base_dir + ' is not a directory'); process.exit(1); }
        throw e;
    }
    fs.writeFileSync('rapydscript.js', rs, {'encoding':'utf-8'});
    var web_repl_dir = path.join(base_path, 'web-repl');
    fs.readdirSync(web_repl_dir).forEach(function(x) {
        if (['sha1.js', 'env.js'].indexOf(x) !== -1) return;
        var file_data = fs.readFileSync(path.join(web_repl_dir, x), {'encoding':'utf-8'});
        fs.writeFileSync(x, file_data, {'encoding':'utf-8'});
    });
    console.log('RapydScript compiler (uncompressed) size: ' + (total/(1024)).toFixed(1) + ' KB');
    console.log('web-repl exported to: ' + base_dir);
}
