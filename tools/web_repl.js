/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2016 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict";  /*jshint node:true */
var vm = require('vm');
var embedded_compiler = require('tools/embedded_compiler.js');

module.exports = function(compiler, baselib) {
    var ctx = vm.createContext();
    var LINE_CONTINUATION_CHARS = ':\\';
    var find_completions = null;
    var streaming_compiler = embedded_compiler(compiler, baselib, function(js) { return vm.runInContext(js, ctx); }, '__repl__');

    return {
        'in_block_mode': false,

        'replace_print': function replace_print(write_line_func) {
            ctx.print = function() {
                var parts = [];
                for (var i = 0; i < arguments.length; i++) 
                    parts.push(ctx._$rapyd$_str(arguments[i]));
                write_line_func(parts.join(' '));
            };
        },

        'is_input_complete': function is_input_complete(source) {
            if (!source || !source.trim()) return false;
            var lines = source.split('\n');
            var last_line = lines[lines.length - 1].trimRight();
            if (this.in_block_mode) {
                // In a block only exit after two blank lines
                if (lines.length < 2) return false;
                var second_last_line = lines[lines.length - 2].trimRight();
                var block_ended = !!(!last_line && !second_last_line);
                if (!block_ended) return false;
                this.in_block_mode = false;
                return true;
            }

            if (last_line && LINE_CONTINUATION_CHARS.indexOf(last_line.substr(last_line.length - 1)) > -1) {
                this.in_block_mode = true;
                return false;
            }
            try {
                compiler.parse(source, {'filename': '<repl>', 'basedir': '__stdlib__'});
            } catch(e) {
                if (e.is_eof && e.line === lines.length && e.col > 0) {
                    return false;
                }
                this.in_block_mode = false;
                return true;
            }
            this.in_block_mode = false;
            return true;
        },

        'compile': function web_repl_compile(code, filename) {
            return streaming_compiler.compile(code, filename);
        },

        'runjs': function runjs(code) {
            var ans = vm.runInContext(code, ctx);
            if (ans !== undefined || ans === null) {
                ctx._$rapyd$_repl_val = ans;
                var q = vm.runInContext('_$rapyd$_repr(_$rapyd$_repl_val)', ctx);
                ans = (q === 'undefined') ? ans.toString() : q;
            }
            return ans;
        },

        'init_completions': function init_completions(completelib) {
            find_completions = completelib(compiler);
        },

        'find_completions': function find_completions_(line) {
            return find_completions(line, ctx);
        },

    };
};

