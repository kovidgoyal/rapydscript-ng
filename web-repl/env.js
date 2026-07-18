/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2016 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */

var namespace = {}, jsSHA = {};

var write_cache = {};

async function readfile(name, encoding) {
    if (namespace.virtual_file_system && namespace.virtual_file_system.read_file) {
        return namespace.virtual_file_system.read_file(name, encoding);
    }
    var data = namespace.file_data[name];
    if (data !== undefined) return data;
    data = write_cache[name];
    if (data !== undefined) return data;
    var err = new Error('ENOENT: no such file or directory: ' + name);
    err.code = 'ENOENT';
    throw err;
}

async function writefile(name, data) {
    if (namespace.virtual_file_system && namespace.virtual_file_system.write_file) {
        return namespace.virtual_file_system.write_file(name, data);
    }
    write_cache[name] = data;
}

var builtin_modules = {
    'crypto' : {
        'createHash': function create_hash() {
            var ans = new jsSHA.jsSHA('SHA-1', 'TEXT');
            ans.digest = function hex_digest() { return ans.getHash('HEX'); };
            return ans;
        },
    },

    'vm': {
        'createContext': function create_context(ctx) {
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            var win = iframe.contentWindow;
            if(!ctx) ctx = {};
            if (!ctx.sha1sum) ctx.sha1sum = sha1sum;
            if (!ctx.require) ctx.require = require;
            Object.keys(ctx).forEach(function(k) { win[k] = ctx[k]; });
            return win;
        },

        'runInContext': function run_in_context(code, ctx) {
            return ctx.eval(code);
        },

        'runInThisContext': eval,
    },
    'path': {
        'join': function path_join() { return Array.prototype.slice.call(arguments).join('/'); },
        'dirname': function path_dirname(path) {
            return path.split('/').slice(0, -1).join('/');
        },
    },
    'inspect': function inspect(x) { return x.toString(); },

    'fs': {},
};

function require(name) {
    return builtin_modules[name] || {};
}
