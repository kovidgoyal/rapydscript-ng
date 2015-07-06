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
var vm = require('vm');

function generate_baselib(ast, beautify, RapydScript) {
    output = RapydScript.OutputStream({
        beautify: beautify, write_name: false,
        omit_baselib: true,  // We are generating baselib here, cannot depend on it
    });
    ast.print(output);
    code = output.get();
    exports = {};
    ctx = vm.createContext({'console':console, 'exports':exports, '_$rapyd$_modules':{}});
    vm.runInContext(code, ctx, {filename:'baselib.pyj'});
    ans = {};
    Object.keys(exports).forEach(function(key) { ans[key] = exports[key].toString(); });
    return ans;
}

function parse_baselib(RapydScript, src_path) {
    baselib_path = path.join(src_path, 'baselib.pyj');
    ast = RapydScript.parse(fs.readFileSync(baselib_path, "utf-8"), {'filename':baselib_path, 'module_id':'baselib', basedir:src_path});
    return [generate_baselib(ast, true, RapydScript), generate_baselib(ast, false, RapydScript)];
}

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
    var pretty_baselib, ugly_baselib;
    var temp = parse_baselib(RapydScript, src_path);
    pretty_baselib = temp[0]; ugly_baselib = temp[1];
    output_options = {'beautify': true, 'baselib': pretty_baselib};
    var raw = sources[file], toplevel;

	function parse_file(code, file) {
		return RapydScript.parse(code, {
			filename: file,
			basedir: path.dirname(file),
			libdir: path.join(src_path, 'lib'),
		});
	}

    function write_baselib(which) {
        var baselib = (which === 'pretty') ? pretty_baselib : ugly_baselib;
        var text = JSON.stringify(baselib, null, 2);
        fs.writeFileSync(path.join(lib_path, 'baselib-' + which + '.js'), text, 'utf-8');
    }

    try {
        toplevel = parse_file(raw, file);
    } catch (e) {
        if (!(e instanceof RapydScript.SyntaxError)) throw e;
        console.error(e.toString());
        process.exit(1);
    }
    var output = RapydScript.OutputStream(output_options);
    toplevel.print(output);
    output = output.get().replace('__COMPILER_VERSION__', source_hash);
    fs.writeFileSync(path.join(lib_path, 'compiler.js'), output, "utf8");
    write_baselib('pretty'); write_baselib('ugly');
    console.log('Compiler built in', (new Date().getTime() - t1)/1000, 'seconds\n');
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
