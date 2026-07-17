/* vim:fileencoding=utf-8
 *
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict";

import fs from 'fs';
import path from 'path';

var _rapydscript_compiler = typeof create_rapydscript_compiler !== 'undefined' ? create_rapydscript_compiler : globalThis.create_rapydscript_compiler;
var RapydScript = _rapydscript_compiler();

function parse_file(code, filename) {
    return RapydScript.parse(code, {
        filename: filename,
        basedir: path.dirname(filename),
        libdir: path.dirname(filename),
        for_linting: true,
    });
}

function detect_format(msgid) {
    var q = msgid.replace('{{', '');
    if (/\{[0-9a-zA-Z_}]+/.test(q)) return 'python-brace-format';
    return null;
}

function Gettext(catalog, filename) {
    this._visit = function (node, cont) {
        if (node instanceof RapydScript.AST_Call && node.args && node.args.args && node.args.args.length && node.expression instanceof RapydScript.AST_Symbol) {
            var name = node.expression.name;
            if (name === '_' || name === 'gettext' || name === 'ngettext') {
                var nargs = (name === 'ngettext') ? 2 : 1;
                var line = node.start.line;
                var pargs = node.args.args;
                for (var i = 0; i < nargs; i++) {
                    if (!(pargs[i].value instanceof RapydScript.AST_String)) {
                        console.error('Translation function: ' + name + ' does not have a string literal argument at line: ' + line + ' of ' + filename);
                        process.exit(1);
                    }
                }
                var msgid = pargs[0].value.value;
                if (!Object.prototype.hasOwnProperty.call(catalog, msgid)) {
                    catalog[msgid] = {
                        'locations': [],
                        'plural': null,
                        'format': detect_format(msgid),
                    };
                }
                if (name === 'ngettext') catalog[msgid].plural = pargs[1].value.value;
                if (filename) catalog[msgid].locations.push(filename + ':' + line);
            }

        }
        if (cont !== undefined) cont();
    };
}

function gettext(catalog, code, filename) {
    var toplevel;

    try {
        toplevel = parse_file(code, filename);
    } catch(e) {
        if (e instanceof RapydScript.SyntaxError) {
            console.error('Failed to parse: ' + filename + ' with error: ' + e.line + ':' + e.col + ':' + e.message);
            process.exit(1);
        } else throw e;
    }

    if (toplevel) {
        var gt = new Gettext(catalog, filename);
        toplevel.walk(gt);
    }
}

function esc(string) {
    return (string || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\r/g, '');
}

function entry_to_string(msgid, data) {
    var ans = [];
    data.locations.forEach(function (loc) { ans.push('#: ' + loc); });
    if (data.format) ans.push('#, ' + data.format);
    ans.push('msgid "' + esc(msgid) + '"');
    if (data.plural) {
        ans.push('msgid_plural "' + esc(data.plural) + '"');
        ans.push('msgstr[0] ""');
        ans.push('msgstr[1] ""');
    } else ans.push('msgstr ""');
    return ans.join('\n');
}

function write_output(catalog, options, write) {
    write = write || (function(x) { process.stdout.write(new Buffer(x, 'utf-8')); });
    function print() {
        var val = Array.prototype.slice.call(arguments).join(' ') + '\n';
        write(val);
    }
    function header_line() {
        var val = '"' + Array.prototype.slice.call(arguments).join(' ') + '\\n"\n';
        write(val);
    }
    if (!options.omit_header) {
        var now = (new Date()).toISOString();
        print('msgid', '""');
        print('msgstr', '""');
        header_line('Project-Id-Version:', esc(options.package_name), esc(options.package_version));
        header_line('POT-Creation-Date:', now);
        header_line("PO-Revision-Date:", now);
        header_line("Report-Msgid-Bugs-To:", esc(options.bugs_address));
        header_line("Last-Translator: Automatically generated");
        header_line("Language-Team: LANGUAGE");
        header_line("MIME-Version: 1.0");
        header_line("Plural-Forms: nplurals=INTEGER; plural=EXPRESSION;");
        header_line("Content-Type: text/plain; charset=UTF-8");
        header_line("Content-Transfer-Encoding: 8bit");
        print();
    }
    Object.keys(catalog).forEach(function(msgid) {
        var data = catalog[msgid];
        print(entry_to_string(msgid, data));
        print();
    });
}

// CLI {{{

async function read_whole_file(filename) {
    if (!filename) {
        var chunks = [];
        process.stdin.setEncoding('utf-8');
        await new Promise((resolve, reject) => {
            process.stdin.on('data', chunk => chunks.push(chunk));
            process.stdin.on('end', resolve);
            process.stdin.on('error', reject);
        });
        process.openStdin();
        return chunks.join('');
    } else {
        return await fs.promises.readFile(filename, 'utf-8');
    }
}

export async function cli(argv, base_path, src_path, lib_path) {
    var files = [];
    var catalog = {};

    async function read_files(src) {
        for (const f of src) {
            var stat = await fs.promises.lstat(f);
            if (stat.isDirectory()) {
                var children = (await fs.promises.readdir(f)).map(x => path.join(f, x));
                await read_files(children);
            } else files.push(f);
        }
    }
    await read_files(argv.files);

    for (const f of (files.length ? files : [null])) {
        var code;
        try {
            code = await read_whole_file(f);
        } catch(e) {
            console.error("ERROR: can't read file: " + f);
            process.exit(1);
        }
        gettext(catalog, code, f);
    }

    write_output(catalog, argv);
    process.exit(0);
}

export { gettext, entry_to_string, write_output };
// }}}
