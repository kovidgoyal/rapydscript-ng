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
        hide_completions();
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

    function hide_completions() {
        document.getElementById('completions').style.display = 'none';
    }

    function completions_visible() {
        return document.getElementById('completions').style.display !== 'none';
    }

    function show_completions(completions) {
        var comps = document.getElementById('completions'), e = comps.lastChild;
        e.innerHTML = '';
        var groups = [], current_group = [];
        completions.forEach(function(x) {
            if (x) current_group.push(x);
            else {
                if (current_group.length) groups.push(current_group);
                current_group = [];
            }
        });
        if (current_group.length) groups.push(current_group);
        groups.forEach(function(group) {
            if (!group.length) return;
            var g = document.createElement('div');
            g.setAttribute('class', 'completion-group');
            var longest_length = group.concat().sort(function (a, b) { return b.length - a.length; })[0].length + 1;
            group.forEach(function(word) {
                var node = document.createTextNode(word + '\xa0'.repeat(longest_length - word.length));
                var div = document.createElement('div');
                div.appendChild(node);
                g.appendChild(div);
            });
            e.appendChild(g);
        });
        comps.style.display = 'block';
    }

    function check_for_completions() {
        var input = document.getElementById('input'), source = input.value;
        var ss = input.selectionStart;
        if (ss === undefined || input.selectionEnd !== ss) return hide_completions();
        var before = source.substr(0, ss);
        var ret = web_repl.find_completions(before);
        if (!ret || ret.length != 2) return hide_completions();
        var completions = ret[0], prefix = longest_common_prefix(completions), last_tok = ret[1];
        if (prefix == last_tok && completions.length == 1) return hide_completions();
        if (completions_visible() || completions.length == 1) {
            if (prefix.length > last_tok.length) {
                var insertion = prefix.substr(last_tok.length);
                input.value = before + insertion + source.substr(ss);
                input.setSelectionRange(ss + insertion.length, ss + insertion.length);
            }
        }
        if (completions.length > 1) show_completions(completions);
        else hide_completions();
    }

    function update_completions() {
        if (completions_visible()) {
            check_for_completions();
        }
    }

    function longest_common_prefix(items) {
        if (!items.length) return '';
        var sorted = items.concat().sort(), a1 = sorted[0], a2 = sorted[sorted.length-1], limit = a1.length, i = 0;
        while ( i < limit && a1.charAt(i) === a2.charAt(i)) i++;
        return a1.substr(0, i);
    }

    function on_input(ev) {
        var input, source;
        var code = ev.keyCode || ev.which;
        if (code === 13 && !ev.ctrlKey && !ev.shiftKey && !ev.altKey && !ev.metaKey) {  // Enter
            input = document.getElementById('input');
            source = input.value;
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
        else if (code === 9 && !ev.ctrlKey && !ev.shiftKey && !ev.altKey && !ev.metaKey) {  // Tab
            ev.preventDefault();
            check_for_completions();
        }
        else if (code === 27 && !ev.ctrlKey && !ev.shiftKey && !ev.altKey && !ev.metaKey) {  // Esc
            hide_completions();
        }
    }

    function on_load() {
        web_repl = RapydScript.web_repl();
        web_repl.replace_print(println);
        web_repl.init_completions(RapydScript.completer);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('top').style.display = 'flex';
        document.getElementById('bottom').style.display = 'flex';
        add_output(
            ('RapydScript-ng ' + RapydScript.rs_version + '\n' +
            'Type RapydScript code into the box at the bottom and click the' + 
            ' Run button. You can press Tab for completions.'), 'blue'
        );
        document.getElementById('run').addEventListener('click', run_code);
        document.getElementById('input').focus();
        document.getElementById('input').addEventListener('keydown', on_input);
        document.getElementById('input').addEventListener('keyup', function() { setTimeout(update_completions, 0); });
        document.getElementById('completions').firstChild.addEventListener('click', hide_completions);
    }

    window.onload = on_load;
})();
