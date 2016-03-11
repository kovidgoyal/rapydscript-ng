/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2016 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
(function() {
    "use strict";

    var web_repl = null;

    function compile(code) {
        return web_repl.compile(code);
    }

    function runjs(code) {
        return web_repl.runjs(code);
    }

    function add_output(text) {
        var output = document.getElementById('output');
        output.appendChild(document.createTextNode(text));
        output.appendChild(document.createElement('hr'));
    }

    function add_javascript(text) {
        var output = document.getElementById('js');
        output.appendChild(document.createTextNode(text));
        output.appendChild(document.createElement('hr'));
    }

    function on_load() {
        web_repl = exports.web_repl();
        document.getElementById('loading').style.display = 'none';
        document.getElementById('top').style.display = 'flex';
        document.getElementById('bottom').style.display = 'flex';
        add_javascript(compile('a = "a"; alert(a)'));
    }

    window.onload = on_load;
})();
