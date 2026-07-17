/* vim:fileencoding=utf-8
 *
 * Copyright (C) 2016 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict";

var has_prop = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);

export default function(compiler, baselib, runjs, name, tree_shake, generate_source_map) {
    var LINE_CONTINUATION_CHARS = ':\\';
    runjs = runjs || eval;
    runjs(print_ast(compiler.parse(''), true));
    runjs('var __name__ = "' + (name || '__embedded__') + '";');

    function print_ast(ast, keep_baselib, keep_docstrings, js_version, private_scope, write_name, source_map, source_map_line_offset) {
        var output_options = {omit_baselib:!keep_baselib, write_name:!!write_name, private_scope:!!private_scope, beautify:true, js_version: (js_version || 6), keep_docstrings:keep_docstrings, source_map:!!source_map, source_map_line_offset: source_map_line_offset || 0};
        if (keep_baselib) output_options.baselib_plain = baselib;
        var output = new compiler.OutputStream(output_options);
        ast.print(output);
        if (source_map && generate_source_map) return {code: output.get(), source_map: generate_source_map(output.get_source_map_segments(), '', '')};
        return output.get();
    }

    return {
        'toplevel': null,

        'compile': function streaming_compile(code, opts) {
            opts = opts || {};
            var classes = (this.toplevel) ? this.toplevel.classes : undefined;
            var scoped_flags = (this.toplevel) ? this.toplevel.scoped_flags: undefined;
            this.toplevel = compiler.parse(code, {
                'filename': opts.filename || '<embedded>',
                'basedir': '__stdlib__',
                'classes': classes,
                'scoped_flags': scoped_flags,
                'discard_asserts': opts.discard_asserts,
            });
            if (opts.tree_shaking && tree_shake) {
                this.toplevel = tree_shake(this.toplevel);
            }
            var ans = print_ast(this.toplevel, opts.keep_baselib, opts.keep_docstrings, opts.js_version, opts.private_scope, opts.write_name, opts.source_map, opts.source_map_line_offset);
            if (classes) {
                var exports = {};
                var self = this;
                this.toplevel.exports.forEach(function (name) { exports[name] = true; });
                Object.getOwnPropertyNames(classes).forEach(function (name) {
                    if (!has_prop(exports, name) && !has_prop(self.toplevel.classes, name))
                        self.toplevel.classes[name] = classes[name];
                });
            }
            scoped_flags = this.toplevel.scoped_flags;

            return ans;
        },

    };
}
