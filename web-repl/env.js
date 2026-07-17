/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2016 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */

var namespace = {}, jsSHA = {};

var write_cache = {};

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

    'fs': {
        'readFileSync': function readfile(name) {
            if (namespace.virtual_file_system && namespace.virtual_file_system.read_file) {
                var data = namespace.virtual_file_system.read_file(name);
                // read_file may return a string directly (for synchronous in-memory VFS)
                if (data !== null && data !== undefined && typeof data !== 'object') return data;
                // Fall through if null/undefined (file not found in VFS)
            }
            var data = namespace.file_data[name];
            if (data) return data;
            data = write_cache[name];
            if (data) return data;
            var err = Error();
            err.code = 'ENOENT';
            throw err;
        },

        'writeFileSync': function writefile(name, data) {
            if (namespace.virtual_file_system && namespace.virtual_file_system.write_file) {
                namespace.virtual_file_system.write_file(name, data);
            } else write_cache[name] = data;
        },

    },
};

function require(name) {
    return builtin_modules[name] || {};
}
