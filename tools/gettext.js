/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict;";

var fs = require('fs');
var RapydScript = require("./compiler").create_compiler();
var path = require('path');

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
    if (/{[0-9a-zA-Z_}]+/.test(q)) return 'python-brace-format';
    return null;
}

function Gettext(catalog, filename) {
    this._visit = function (node, cont) {
        if (node instanceof RapydScript.AST_Call && node.args && node.args.length && node.expression instanceof RapydScript.AST_Symbol) {
            var name = node.expression.name;
            if (name === '_' || name === 'gettext' || name === 'ngettext') {
                var nargs = (name === 'ngettext') ? 2 : 1;
                var line = node.start.line;
                for (var i = 0; i < nargs; i++) {
                    if (!(node.args[i] instanceof RapydScript.AST_String)) {
                        console.error('Translation function: ' + name + ' does not have a string literal argument at line: ' + line + ' of ' + filename);
                        process.exit(1);
                    }
                }
                var msgid = node.args[0].value;
                if (!Object.prototype.hasOwnProperty.call(catalog, msgid)) {
                    catalog[msgid] = {
                        'locations': [],
                        'plural': null,
                        'format': detect_format(msgid),
                    };
                }
                if (name === 'ngettext') catalog[msgid].plural = node.args[1].value;
                if (filename) catalog[msgid].locations.push(filename + ':' + line);
            }
            
        }
        if (cont !== undefined) cont();
    };
}

function gettext(catalog, code, filename) {
    var toplevel;
    RapydScript.AST_Node.warn_function = function() {};

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
    return (string || '').replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\t', '\\t').replace('\r', '');
}

function entry_to_string(msgid, data) {
    var ans = [];
    data.locations.forEach(function (loc) { ans.push('#: ' + loc); });
    if (data.format) ans.push('#, ' + data.format);
    ans.push('msgid "' + esc(msgid) + '"');
    if (data.plural) ans.push('msgid_plural "' + esc(data.plural) + '"');
    ans.push('msgstr ""');
    return ans.join('\n');
}

function write_output(catalog, options, write) {
    write = write || (function(x) { process.stdout.write(x); });
    function print() {
        var val = Array.prototype.slice.call(arguments).join(' ') + '\n';
        write(new Buffer(val, 'utf-8'));
    }
    function header_line() {
        var val = '"' + Array.prototype.slice.call(arguments).join(' ') + '\\n"\n';
        write(new Buffer(val, 'utf-8'));
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

function read_whole_file(filename, cb) {
    if (!filename) {
        var chunks = [];
        process.stdin.setEncoding('utf-8');
        process.stdin.on('data', function (chunk) {
            chunks.push(chunk);
        }).on('end', function () {
            cb(null, chunks.join(""));
        });
        process.openStdin();
    } else {
        fs.readFile(filename, "utf-8", cb);
    }
}

module.exports.cli = function(argv, base_path, src_path, lib_path) {
    var files = [];
    var num_of_files = files.length || 1;
    var catalog = {};

    function read_files(src) {
        src.forEach(function(f) {
            if (fs.lstatSync(f).isDirectory()) read_files(fs.readdirSync(f));
            else files.push(f);
        });
    }
    read_files(argv.files);

    function process_single_file(err, code) {
        if (err) {
            console.error("ERROR: can't read file: " + files[0]);
            process.exit(1);
        }

        gettext(catalog, code, files[0]);

        files = files.slice(1);
        if (files.length) {
            setImmediate(read_whole_file, files[0], process_single_file);
            return;
        } else {
            write_output(catalog, argv);
            process.exit(0);
        }
    }
 
    setImmediate(read_whole_file, files[0], process_single_file);

};

module.exports.gettext = gettext;
module.exports.entry_to_string = entry_to_string;
module.exports.write_output = write_output;
// }}}
