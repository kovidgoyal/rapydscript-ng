/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2016 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */

exports = {};

function sha1sum(text) {
    var sha = new jsSHA("SHA-1", "TEXT");
    sha.update(text);
    return sha.getHash('HEX');
}

(function() {
    var builtin_modules = {
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
    };

    function require(name) {
        return builtin_modules[name] || {};
    }
    window.require = require;
})();
