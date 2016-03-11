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

    function println(text) {
        document.getElementById('output').appendChild(document.createTextNode(text + '\n'));
    }

    function add_output(text, color) {
        var output = document.getElementById('output');
        var node = document.createTextNode(text);
        if (color) {
            var e = document.createElement('span');
            e.style.color = color;
            e.appendChild(node);
            node = e;
        }
        output.appendChild(node);
        output.appendChild(document.createElement('hr'));
    }

    function add_javascript(text) {
        var output = document.getElementById('js');
        output.appendChild(document.createTextNode(text));
        output.appendChild(document.createElement('hr'));
    }

    function read_eval(code) {
        var js, obj, text;
        try {
            js = compile(code);
        } catch(e) {
            if (e.is_eof && e.line == buffer.length && e.col > 0) return true;
            if (e.message && e.line !== undefined) text = ('Error:' + e.line + ':' + e.col + ':' + e.message);
            else text = e.stack || e.toString();
            add_output(text, 'red');
            return false;
        }
        add_javascript(js);
        try {
            obj = runjs(js);
        } catch(e) {
            add_output(e.toString(), 'red');
            return;
        }
        if (typeof obj === 'string') add_output(obj, 'brown');
        return false;
    }

    function run_code() {
        var input = document.getElementById('input');
        var code = input.value;
        input.value = '';
        if (code) read_eval(code);
        document.getElementById('input').focus();
    }

    function on_load() {
        web_repl = exports.web_repl();
        web_repl.replace_print(println);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('top').style.display = 'flex';
        document.getElementById('bottom').style.display = 'flex';
        add_output(
            ('RapydScript-ng ' + exports.rs_version + '\n' +
            'Type RapydScript code into the box at the bottom and click the' + 
            ' Run button.'), 'blue'
        );
        document.getElementById('run').addEventListener('click', run_code);
        document.getElementById('input').focus();
    }

    window.onload = on_load;
})();
