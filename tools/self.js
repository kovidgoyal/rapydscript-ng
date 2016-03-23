/*
 * self.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */
"use strict";  /*jshint node:true */

var path = require('path');
var crypto = require('crypto');
var fs = require('fs');
var vm = require('vm');
var zlib = require('zlib');

function read_baselib_modules(RapydScript, src_path, lib_path) {
    var items = fs.readdirSync(src_path).filter(function(name) {
        return name.slice(0, 'baselib-'.length) === 'baselib-' && name.slice(-4) == '.pyj';
    });
    var ans = {};
    items.forEach(function(fname) {
        var name = fname.slice('baselib-'.length, -4), ast;
        ans[name] = {'code':{}};
        var raw = fs.readFileSync(path.join(src_path, fname), 'utf-8');
        try {
            ast = RapydScript.parse(raw, {'filename':fname, basedir:src_path});
        } catch (e) {
            if (!(e instanceof RapydScript.SyntaxError)) throw e;
            console.error(e.toString());
            process.exit(1);
        }
        ans[name].baselib_items = ast.baselib;
        [true, false].forEach(function (beautify) {
            var output = new RapydScript.OutputStream({
                beautify: beautify, write_name: false, private_scope:false, omit_baselib: true,  
            });
            ast.print(output);
            ans[name].code[beautify] = output.get();
        });
    });
    return ans;
}

function generate_baselib(ast, beautify, RapydScript, baselib_modules) {
    var output = new RapydScript.OutputStream({
        beautify: beautify, write_name: false,
        omit_baselib: true,  // We are generating baselib here, cannot depend on it
    });
    ast.print(output);
    var code = output.get();
    var exports = {};
    var ctx = vm.createContext({'console':console, 'exports':exports, '_$rapyd$_modules':{}});
    vm.runInContext(code, ctx, {filename:'baselib.pyj'});
    var ans = {};
    Object.keys(exports).forEach(function(key) { ans[key] = exports[key].toString(); });
    ans['#dependencies#'] = {};
    Object.keys(baselib_modules).forEach(function(key) {
        ans[key] = baselib_modules[key].code[beautify];
        ans['#dependencies#'][key] = baselib_modules[key].baselib_items;
    });
    return ans;
}

function parse_baselib(RapydScript, src_path, lib_path) {
    var baselib_modules = read_baselib_modules(RapydScript, src_path, lib_path);
    var baselib_path = path.join(src_path, 'baselib.pyj');
    try {
        var ast = RapydScript.parse(fs.readFileSync(baselib_path, "utf-8"), {'filename':baselib_path, 'module_id':'baselib', basedir:src_path});
        return [generate_baselib(ast, true, RapydScript, baselib_modules), generate_baselib(ast, false, RapydScript, baselib_modules)];
    } catch (e) {
        if (!(e instanceof RapydScript.SyntaxError)) throw e;
        console.error(e.toString());
        process.exit(1);
    }
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


function compile(src_path, lib_path, sources, source_hash, profile) {
    var file = path.join(src_path, 'compiler.pyj');
    var t1 = new Date().getTime();
    var RapydScript = require('./compiler').create_compiler();
    var output_options, profiler, cpu_profile;
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

        var ast = RapydScript.parse('');
        Object.keys(baselib).forEach(function(k) { if (k.indexOf('#') == -1) ast.baselib[k] = true; });
        ast.baselib['yield'] = true;
        var output = new RapydScript.OutputStream({'private_scope':false, 'write_name':false, 'baselib':baselib,
            'beautify':which === 'pretty'});
        ast.print(output);
        var raw = output.get();
        console.log('Entire baselib ('+which+') is: ' + zlib.deflateSync(raw).length + ' bytes gzipped and: ' + raw.length + ' bytes uncompressed');
        fs.writeFileSync(path.join(lib_path, 'baselib-plain-' + which + '.js'), raw, 'utf-8');
    }

    try {
        if (profile) {
            profiler = require('v8-profiler');
            profiler.startProfiling();
        }
        toplevel = parse_file(raw, file);
        if (profile) {
            cpu_profile = profiler.stopProfiling();
            fs.writeFileSync('self.cpuprofile', JSON.stringify(cpu_profile), 'utf-8');
        }
    } catch (e) {
        if (!(e instanceof RapydScript.SyntaxError)) throw e;
        console.error(e.toString());
        process.exit(1);
    }
    var output = new RapydScript.OutputStream(output_options);
    toplevel.print(output);
    output = output.get().replace('__COMPILER_VERSION__', source_hash);
    fs.writeFileSync(path.join(lib_path, 'compiler.js'), output, "utf8");
    write_baselib('pretty'); write_baselib('ugly');
    console.log('Compiler built in', (new Date().getTime() - t1)/1000, 'seconds\n');
    return output;
}

function run_single_compile(base_path, src_path, lib_path, profile) {
    var signatures = path.join(lib_path, 'signatures.json');
    var temp = check_for_changes(base_path, src_path, signatures);
    var source_hash = temp[0], compiler_changed = temp[1], sources = temp[2], hashes = temp[3];
    
    if (compiler_changed) {
        compile(src_path, lib_path, sources, source_hash, profile);
        fs.writeFileSync(signatures, JSON.stringify(hashes, null, 4));
    } else console.log('Compiler is built with the up-to-date version of itself');
    return compiler_changed;
}

module.exports = function compile_self(base_path, src_path, lib_path, complete, profile) {
    var changed;
    do {
        changed = run_single_compile(base_path, src_path, lib_path, profile);
    } while (changed && complete);
};
