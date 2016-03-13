/* 
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */

var vm = require('vm');
var native_require = require;

function normalize_array(parts, allowAboveRoot) {
  var res = [];
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];

    // ignore empty parts
    if (!p || p === '.')
      continue;

    if (p === '..') {
      if (res.length && res[res.length - 1] !== '..') {
        res.pop();
      } else if (allowAboveRoot) {
        res.push('..');
      }
    } else {
      res.push(p);
    }
  }

  return res;
}

function normalize(path) {
    var is_abs = path && path[0] === '/';
    var trailing_slash = path && path[path.length - 1] === '/';
    path = normalize_array(path.split('/'), !is_abs).join('/');

    if (!path && !is_abs) {
        path = '.';
    }
    if (path && trailing_slash) {
        path += '/';
    }

    return (is_abs ? '/' : '') + path;
}

function dirname(path) {
    var idx = path.lastIndexOf('/');
    if (idx != -1) path = path.slice(0, idx);
    else path = '';
    return path;
}

function basename(path) {
    var idx = path.lastIndexOf('/');
    if (idx != -1) path = path.slice(idx + 1);
    return path;
}

var cache = {};

function load(filepath) {
    var cached = cache[filepath];
    if (cached) return cached.exports;
    var module = {'id':filepath, 'exports':{}};
    cache[filepath] = module;

    var content = data[filepath];
    if (Array.isArray(content)) content = data[content[0]];
    if (!content) throw 'Failed to load: ' + JSON.stringify(filepath);

    if (filepath.slice(-5) == '.json') { module.exports = JSON.parse(content); return module.exports; }

    var base = dirname(filepath);
    function mrequire(x) {
        return vrequire(x, base);
    }
    content = content.replace(/^\#\!.*/, '');
    var wrapped = '(function(exports, require, module, __filename, __dirname, create_rapydscript_compiler) { ';
    wrapped += content + '\n;})';
    try {
        vm.runInThisContext(wrapped, {'filename': filepath})(module.exports, mrequire, module, filepath, dirname(filepath), create_compiler);
    } catch (e) {
        console.error(e);
        delete cache[filepath];
        throw e;
    }
    return module.exports;
}

function has(x, y) { return Object.prototype.hasOwnProperty.call(x, y); }

function try_files(candidate) {
    if (has(data, candidate)) return candidate;
    if (has(data, candidate + '.js')) return candidate + '.js';
    if (has(data, candidate + '.json')) return candidate + '.json';
    return null;
}

function find_in_modules_dir(name, base) {
    var candidate = normalize(base + (base ? '/':'') + 'node_modules/' + name);
    var q = try_files(candidate);
    if (q) return q;

    var pj = candidate + '/package.json';
    if (has(data, pj)) {
        var ans = normalize(candidate + '/' + JSON.parse(data[pj]).main);
        if (has(data, ans)) return ans;
    }
    var index = candidate + '/index.js';
    if (has(data, index)) return index;

    var p = dirname(base);
    if (p) return find_in_modules_dir(name, p);
    return null;
}

function find_module(name, base) {
    if (name[0] == '/') throw 'Cannot find absolute module: ' + name;
    if (name.slice(0, 2) == './' || name.slice(0, 3) == '../') {
        var candidate = normalize((base ? base + '/' : base) + name);
        return try_files(candidate);
    }
    var q = try_files(name);
    if (q) return q;
    return find_in_modules_dir(name, base);
}

function vrequire(name, base) {
    var exports = {};
    var modpath = '';
    base = base || '';
    // console.log('vrequire', name, base);
    if (!name) throw new Error('Cannot load a module from an empty name');

    modpath = find_module(name, base);
    if (!modpath && name && './'.indexOf(name[0]) === -1) {
            try {
                return native_require(name);
            } catch (e) {}
        }

    if (!modpath) throw new Error("Failed to find module: " + JSON.stringify(name) + " with base: " + JSON.stringify(base));
    return load(modpath);
}

var UglifyJS = null, regenerator = null;
var crypto = null, fs = require('fs');

function uglify(x) {
    if (!UglifyJS) UglifyJS = vrequire("uglify-js");
    return UglifyJS.minify(ans, {fromString:true}).code;
}

function regenerate(code, beautify) {
    var orig = fs.readFileSync;
    fs.readFileSync = function(name) { 
        if (!has(data, name)) {
            throw {message: "Failed to readfile from data: " + name};
        }
        return data[name]; 
    };
    if (!regenerator) regenerator = vrequire('regenerator');
    var ans;
    if (code) {
        try {
            ans = regenerator.compile(code).code;
        } catch (e) {
            console.error('regenerator failed for code: ' + code + 'with error stack:\n' + e.stack);
            throw e;
        }
        if (!beautify) ans = uglify(ans);
    } else {
        // Return the runtime
        ans = regenerator.compile('', {includeRuntime:true}).code;
        ans = ans.slice(ans.indexOf('!'), ans.lastIndexOf(')(')) + ')';
        if (!beautify) ans = uglify(ans+'();').slice(0, -3);
    }
    fs.readFileSync = orig;
    return ans;
}

if (typeof this != 'object' || typeof this.sha1sum !== 'function') {
    var sha1sum = function (data) { 
        if (!crypto) crypto = require('crypto');
        var h = crypto.createHash('sha1');
        h.update(data);
        return h.digest('hex');
    };
} else var sha1sum = this.sha1sum;

function create_compiler() {
    var compilerjs = data['compiler.js'];
    var module = {'id':'compiler', 'exports':{}};
    var wrapped = '(function(module, exports, readfile, writefile, sha1sum, regenerate) {' + data['compiler.js'] + ';\n})';
    vm.runInThisContext(wrapped, {'filename': 'compiler.js'})(module, module.exports, fs.readFileSync, fs.writeFileSync, sha1sum, regenerate);
    return module.exports;
}

var RapydScript = null;

function compile(code, filename, options) {
    if (!RapydScript) RapydScript = create_compiler();
    options = options || {};
    var ast = RapydScript.parse(code, {
        filename: filename || '<eval>',
        auto_bind: !!options.auto_bind,
        basedir: options.basedir || dirname(filename || ''),
        libdir: options.libdir,
    });
    var out_ops = {
        beautify: (options.beautify === undefined ? true : options.beautify),
        private_scope: !options.bare,
        auto_bind: !!options.auto_bind,
        omit_baselib: !!options.omit_baselib,
        js_version: options.js_version || 5,
    };
    if (!out_ops.omit_baselib) out_ops.baselib = data['baselib-' + (out_ops.beautify ? 'pretty' : 'ugly') + '.js'];
    var out = RapydScript.OutputStream(out_ops);
    ast.print(out);
    return out.get();
}

function create_embedded_compiler(runjs) {
    var c = vrequire('tools/embedded_compiler.js');
    return c(create_compiler(), data['baselib-plain-pretty.js'], runjs);
}

function web_repl() {
    var repl = vrequire('tools/web_repl.js');
    return repl(create_compiler(), data['baselib-plain-pretty.js']);
}

function init_repl(options) {
    var repl = vrequire('tools/repl.js');
    options.baselib = data['baselib-plain-pretty.js'];
    return repl(options);
}

function gettext_parse(catalog, code, filename) {
    g = vrequire('tools/gettext.js');
    g.gettext(catalog, code, filename);
}

function gettext_output(catalog, options, write) {
    g = vrequire('tools/gettext.js');
    g.write_output(catalog, options, write);
}

function msgfmt(data, options) {
    m = vrequire('tools/msgfmt.js');
    return m.build(data, options);
}

function completer(compiler, options) {
    m = vrequire('tools/completer.js');
    return m(compiler, options);
}

if (typeof exports === 'object') {
    exports.compile = compile;
    exports.create_embedded_compiler = create_embedded_compiler;
    exports.web_repl = web_repl;
    exports.init_repl = init_repl;
    exports.gettext_parse = gettext_parse;
    exports.gettext_output = gettext_output;
    exports.msgfmt = msgfmt;
    exports.rs_version = rs_version;
    exports.file_data = data;
    exports.completer = completer;
}
