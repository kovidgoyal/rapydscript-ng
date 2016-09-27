/*
 * repl.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */
"use strict";  /*jshint node:true */

var fs = require('fs');
var path = require('path');
var vm = require('vm');
var util = require('util');
var utils = require('./utils');
var completelib = require('./completer');
var colored = utils.safe_colored;
var RapydScript = (typeof create_rapydscript_compiler === 'function') ? create_rapydscript_compiler() : require('./compiler').create_compiler();
var has_prop = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);

function create_ctx(baselib, show_js, console) {
    var ctx = vm.createContext({'console':console, 'show_js': !!show_js, 'RapydScript':RapydScript, 'require':require});
	vm.runInContext(baselib, ctx, {'filename':'baselib-plain-pretty.js'});
    vm.runInContext('var __name__ = "__repl__";', ctx);
    return ctx;
}


var homedir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var cachedir = expanduser(process.env.XDG_CACHE_HOME || '~/.cache');

function expanduser(x) {
  if (!x) return x;
  if (x === '~') return homedir;
  if (x.slice(0, 2) != '~/') return path;
  return path.join(homedir, x.slice(2));
}

function repl_defaults(options) {
    options = options || {};
    if (!options.input) options.input = process.stdin;
    if (!options.output) options.output = process.stdout;
    if (options.show_js === undefined) options.show_js = true;
    if (!options.ps1) options.ps1 = '>>> ';
    if (!options.ps2) options.ps2 = '... ';
    if (!options.console) options.console = console;
    if (!options.readline) options.readline = require('readline');
    if (options.terminal === undefined) options.terminal = options.output.isTTY;
    if (options.histfile === undefined) options.histfile = path.join(cachedir, 'rapydscript-repl.history');
        
    options.colored = (options.terminal) ? colored : (function (string) { return string; });
    options.historySize = options.history_size || 1000;
    return options;
}

function read_history(options) {
    if (options.histfile) {
        try {
            return fs.readFileSync(options.histfile, 'utf-8').split('\n');
        } catch (e) { return []; }
    }
}

function write_history(options, history) {
    if (options.histfile) {
        history = history.join('\n');
        try {
            return fs.writeFileSync(options.histfile, history, 'utf-8');
        } catch (e) {}
    }
}


module.exports = function(options) {
    options = repl_defaults(options);
    options.completer = completer;
    var rl = options.readline.createInterface(options);
	var ps1 = options.colored(options.ps1, 'green');
	var ps2 = options.colored(options.ps2, 'yellow');
	var ctx = create_ctx(print_ast(RapydScript.parse('(def ():\n yield 1\n)'), true), options.show_js, options.console);
    var buffer = [];
    var more = false;
    var LINE_CONTINUATION_CHARS = ':\\';
    var toplevel;
    var import_dirs = utils.get_import_dirs();
    var find_completions = completelib(RapydScript, options);

    options.console.log(options.colored('Welcome to the RapydScript REPL! Press Ctrl+C then Ctrl+D to quit.', 'green', true));
    if (options.show_js)
        options.console.log(options.colored('Use show_js=False to stop the REPL from showing the compiled JavaScript.', 'green', true));
    else
        options.console.log(options.colored('Use show_js=True to have the REPL show the compiled JavaScript before executing it.', 'green', true));
    options.console.log();

    function print_ast(ast, keep_baselib) {
        var output_options = {omit_baselib:!keep_baselib, write_name:false, private_scope:false, beautify:true, keep_docstrings:true};
        if (keep_baselib) output_options.baselib_plain = fs.readFileSync(path.join(options.lib_path, 'baselib-plain-pretty.js'), 'utf-8');
        var output = new RapydScript.OutputStream(output_options);
        ast.print(output);
        return output.get();
    }


    function resetbuffer() { buffer = []; }

    function completer(line) {
        return find_completions(line, ctx);
    }

    function prompt() {
        var lw = '';
        if (more && buffer.length) {
            var prev_line = buffer[buffer.length - 1];
            if (prev_line.trimRight().substr(prev_line.length - 1) == ':') lw = '    ';
            prev_line = prev_line.match(/^\s+/);
            if (prev_line) lw += prev_line;
        }
        rl.setPrompt((more) ? ps2 : ps1);
        if (rl.sync_prompt) rl.prompt(lw);
        else {
            rl.prompt();
            if (lw) rl.write(lw);
        }
    }

    function runjs(js) {
        var result;
        if (vm.runInContext('show_js', ctx)) {
            options.console.log(options.colored('---------- Compiled JavaScript ---------', 'green', true));
            options.console.log(js);
            options.console.log(options.colored('---------- Running JavaScript ---------', 'green', true));
        }
        try {
            // Despite what the docs say node does not actually output any errors by itself
            // so, in case this bug is fixed later, we turn it off explicitly.
            result = vm.runInContext(js, ctx, {'filename':'<repl>', 'displayErrors':false});
        } catch(e) {
            if (e.stack) options.console.error(e.stack);
            else options.console.error(e.toString());
        }

        if (result !== undefined) {
            options.console.log(util.inspect(result, {'colors':options.terminal}));
        }
    }

    function compile_source(source) {
        var classes = (toplevel) ? toplevel.classes : undefined;
        var scoped_flags = (toplevel) ? toplevel.scoped_flags: undefined;
        try {
            toplevel = RapydScript.parse(source, {
                'filename':'<repl>',
                'basedir': process.cwd(),
                'libdir': options.imp_path,
                'import_dirs': import_dirs,
                'classes': classes,
                'scoped_flags': scoped_flags,
            });
        } catch(e) {
            if (e.is_eof && e.line == buffer.length && e.col > 0) return true;
            if (e.message && e.line !== undefined) options.console.log(e.line + ':' + e.col + ':' + e.message);
            else options.console.log(e.stack || e.toString());
            return false;
        }
        var output = print_ast(toplevel);
        if (classes) {
            var exports = {};
            toplevel.exports.forEach(function (name) { exports[name] = true; });
            Object.getOwnPropertyNames(classes).forEach(function (name) {
                if (!has_prop(exports, name) && !has_prop(toplevel.classes, name))
                    toplevel.classes[name] = classes[name];
            });
        }
        scoped_flags = toplevel.scoped_flags;
        runjs(output);
        return false;
    }

    function push(line) {
        buffer.push(line);
        var ll = line.trimRight();
        if (ll && LINE_CONTINUATION_CHARS.indexOf(ll.substr(ll.length - 1)) > -1)
            return true;
        var source = buffer.join('\n');
        if (!source.trim()) { resetbuffer(); return false; }
        var incomplete = compile_source(source);
        if (!incomplete) resetbuffer();
        return incomplete;
    }

	rl.on('line', function(line) {
        if (more) {
            // We are in a block 
            var line_is_empty = !line.trimLeft();
            if (line_is_empty && buffer.length && !buffer[buffer.length - 1].trimLeft()) {
                // We have two empty lines, evaluate the block
                more = push(line.trimLeft());
            } else buffer.push(line);
        } else more = push(line);  // Not in a block, evaluate line
		prompt();
	})
	
	.on('close', function() {
		options.console.log('Bye!');
        if (rl.history) write_history(options, rl.history);
		process.exit(0);
	})

	.on('SIGINT', function() {
        rl.clearLine();
		options.console.log('Keyboard Interrupt');
        resetbuffer();
        more = false;
		prompt();
	})

	.on('SIGCONT', function() {
		prompt();
	});

    rl.history = read_history(options);
	prompt();
};
