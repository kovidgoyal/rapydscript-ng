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
        output.lastChild.scrollIntoView();
    }

    function add_javascript(text) {
        var output = document.getElementById('js');
        var code = document.createElement('code');
        code.appendChild(document.createTextNode(text));
        code.setAttribute('class', 'language-javascript');
        output.appendChild(code);
        output.appendChild(document.createElement('hr'));
        Prism.highlightElement(code);
        output.lastChild.scrollIntoView();
    }

    function show_compiler_error(text, line, col) {
        var output = document.getElementById('js');
        var e = document.createElement('div');
        e.style.color = 'red';
        var b = document.createElement('b');
        b.textContent = "Failed to compile RapydScript with error:\n";
        e.appendChild(b);
        e.appendChild(document.createTextNode(text + '\n'));
        if (line) {
            var t = document.createElement('span');
            t.style.color = 'black';
            e.appendChild(document.createTextNode('☛ '));
            t.textContent = line + '\n';
            e.appendChild(t);
            if (col !== null) {
                t = document.createElement('span');
                e.appendChild(document.createTextNode('☛ '));
                t.textContent = ' '.repeat(col) + '⬆';
                e.appendChild(t);
            }
        }
        output.appendChild(e);
        output.appendChild(document.createElement('hr'));
        output.lastChild.scrollIntoView();
    }

    function read_eval(code) {
        var js, obj, text;
        try {
            js = compile(code);
        } catch(e) {
            var text, line = null, col = null;
            if (e.message && e.line) {
                text = e.message;
                line = code.split('\n')[e.line - 1];
                col = e.col;
            } else text = e.stack || e.toString();
            show_compiler_error(text, line, col);
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

    function on_input(ev) {
        if (ev.keyCode === 13 && !ev.ctrlKey && !ev.shiftKey && !ev.altKey && !ev.metaKey) {
            var input = document.getElementById('input');
            var source = input.value;
            ev.preventDefault();
            if (web_repl.is_input_complete(source)) {
                setTimeout(run_code, 0);
                return;
            }
            var lines = source.split('\n');
            var last_line = lines[lines.length - 1];
            var prev_leading_whitespace = last_line.match(/^\s+/);
            var next_line = prev_leading_whitespace || '';
            if (source.trimRight().endsWith(':')) next_line += '    ';
            input.value = source + '\n' + next_line;
        }
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
        document.getElementById('input').addEventListener('keypress', on_input);
    }

    window.onload = on_load;
})();
