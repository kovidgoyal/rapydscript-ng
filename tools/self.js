/*
 * self.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */
"use strict;";

var path = require('path');
var crypto = require('crypto');
var fs = require('fs');

function check_for_changes(base_path, src_path, signatures) {
    // Check if any of the files involved in the build process have changed,
    // as compared to the saved sha1 hashes from the last build
    var saved_hashes = {}, hashes = {}, sources = {};
    var compiler_changed = false, compiler_hash, source_hash;
    try {
        saved_hashes = JSON.parse(fs.readFileSync(signatures, 'utf-8'));
    } catch (e) {
        if (e.code != 'ENOENT') throw (e);
    }

    var src_file_names = fs.readdirSync(src_path).filter(function(fname) {
        return fname.substr(-4) === '.pyj';
    });
    compiler_hash = crypto.createHash('sha1');
    source_hash = crypto.createHash('sha1');
    src_file_names.forEach(function(fname) {
        var src = path.join(src_path, fname);
        sources[src] = fs.readFileSync(src, 'utf-8');
        compiler_hash.update(sources[src]);
        source_hash.update(sources[src]);
        var h = crypto.createHash('sha1');
        h.update(sources[src]);
        hashes[fname.split('.')[0]] = h.digest('hex');
    });
    var compiler_files = [module.filename, path.join(base_path, 'tools', 'compiler.js')];
    compiler_files.forEach(function(fpath) { 
        compiler_hash.update(fs.readFileSync(fpath, 'utf-8'));
    });
    hashes['#compiler#'] = compiler_hash.digest('hex');
    hashes['#compiled_with#'] = saved_hashes['#compiler#'] || 'unknown';
    source_hash = source_hash.digest('hex');
    if (hashes['#compiler#'] != saved_hashes['#compiler#']) {
        console.log('There are changes to the source files of the compiler, rebuiliding');
        compiler_changed = true;
    } else if (hashes['#compiled_with#'] != saved_hashes['#compiled_with#']) {
        console.log('Re-building compiler with updated version of itself');
        compiler_changed = true;
    }

    return [source_hash, compiler_changed, sources, hashes];
}

function compile(src_path, lib_path, sources, source_hash) {
    var file = path.join(src_path, 'compiler.pyj');
    var t1 = new Date().getTime();
    var RapydScript = require('./compiler').create_compiler();
    var output_options; 
    try {
        output_options = {
            'beautify': true, 'baselib':  RapydScript.parse_baselib(src_path, true),
        };
    } catch(e) {
        if (!(e instanceof RapydScript.JS_Parse_Error)) throw e;
        console.error(e.toString());
        process.exit(1);
    }
    var raw = sources[file], toplevel;

	function parse_file(code, file) {
		return RapydScript.parse(code, {
			filename: file,
			basedir: path.dirname(file),
			libdir: path.join(src_path, 'lib'),
		});
	}

    try {
        toplevel = parse_file(raw, file);
    } catch (e) {
        if (!(e instanceof RapydScript.JS_Parse_Error)) throw e;
        console.error(e.toString());
        process.exit(1);
    }
    var output = RapydScript.OutputStream(output_options);
    toplevel.print(output);
    output = output.get().replace('__COMPILER_VERSION__', source_hash);
    fs.writeFileSync(path.join(lib_path, 'compiler.js'), output, "utf8");
    console.log('Compiler built in', (new Date().getTime() - t1)/1000, 'seconds\n');
    RapydScript.reset_index_counter();
    return output;
}

function run_single_compile(base_path, src_path, lib_path) {
    var signatures = path.join(lib_path, 'signatures.json');
    var temp = check_for_changes(base_path, src_path, signatures);
    var source_hash = temp[0], compiler_changed = temp[1], sources = temp[2], hashes = temp[3];
    
    if (compiler_changed) {
        compile(src_path, lib_path, sources, source_hash);
        fs.writeFileSync(signatures, JSON.stringify(hashes, null, 4));
    } else console.log('Compiler is built with the up-to-date version of itself');
    return compiler_changed;
}

module.exports = function compile_self(base_path, src_path, lib_path, complete) {
    var changed;
    do {
        changed = run_single_compile(base_path, src_path, lib_path);
    } while (changed && complete);
};
