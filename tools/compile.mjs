/*
 * compile.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { createRequire } from 'module';
import { create_compiler, EMBEDDED_STDLIB_PREFIX } from './compiler.mjs';
import * as utils from './utils.mjs';
import { generate_source_map } from './sourcemap.mjs';
import tree_shake from './treeshake.mjs';

const require = createRequire(import.meta.url);
const RapydScript = await create_compiler();

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

async function makedirs(dir) {
    try {
        await fs.promises.mkdir(dir);
    } catch(e) {
        if (e.code == 'EEXIST') return;
        if (e.code == 'ENOENT') { await makedirs(path.dirname(dir)); await fs.promises.mkdir(dir); }
        else throw e;
    }
}

async function process_cache_dir(dir) {
    dir = path.resolve(path.normalize(dir));
    await makedirs(dir);
    return dir;
}

export default async function(start_time, argv, base_path, src_path, lib_path) {
    // configure settings for the output
    var cache_dir = argv.cache_dir ? await process_cache_dir(argv.cache_dir) : '';
    var OUTPUT_OPTIONS = {
        beautify: !argv.uglify,
        private_scope: !argv.bare,
        omit_baselib: argv.omit_baselib,
        js_version: parseInt(argv.js_version),
        keep_docstrings: argv.keep_docstrings,
        discard_asserts: argv.discard_asserts,
        module_cache_dir: cache_dir,
        source_map: !!argv.source_map,
        source_map_line_offset: parseInt(argv.source_map_line_offset) || 0,
    };

    if (argv.comments) {
        if (/^\//.test(argv.comments)) {
            OUTPUT_OPTIONS.comments = new Function("return(" + argv.comments + ")")();  // jshint ignore:line
        } else if (argv.comments == "all") {
            OUTPUT_OPTIONS.comments = true;
        } else {
            OUTPUT_OPTIONS.comments = function(node, comment) {
                var text = comment.value;
                var type = comment.type;
                if (type == "comment2") {
                    // multiline comment
                    return /@preserve|@license|@cc_on/i.test(text);
                }
            };
        }
    }

    if (!argv.omit_baselib) {
        var which = (OUTPUT_OPTIONS.beautify) ? 'pretty' : 'ugly';
        const baselib_key = 'baselib-plain-' + which + '.js';
        const embedded = globalThis.__rapydscript_embedded__;
        OUTPUT_OPTIONS.baselib_plain = embedded?.[baselib_key] ??
            await fs.promises.readFile(path.join(lib_path, baselib_key), 'utf-8');
    }

    var files = argv.files.slice();
    var STATS = {}, TOPLEVEL;
    var num_of_files = files.length || 1;

    if (files.filter(function(el){ return el == "-"; }).length > 1) {
        console.error("ERROR: Can read a single file from STDIN (two or more dashes specified)");
        process.exit(1);
    }

    async function parse_file(code, file, toplevel) {
        const embedded = globalThis.__rapydscript_embedded__;
        return await RapydScript.parse(code, {
            filename: file,
            toplevel: toplevel,
            basedir: (file !== '<stdin>') ? path.dirname(file) : undefined,
            libdir: embedded ? EMBEDDED_STDLIB_PREFIX : path.join(src_path, 'lib'),
            import_dirs: utils.get_import_dirs(argv.import_path),
            discard_asserts: argv.discard_asserts,
            module_cache_dir: cache_dir,
        });
    }

    function write_to_stream(stream, data) {
        return new Promise((resolve, reject) => {
            stream.write(data + '\n', 'utf8', err => err ? reject(err) : resolve());
        });
    }

    async function write_output(js_output, output_stream) {
        if (argv.source_map && output_stream) {
            var segments = output_stream.get_source_map_segments();
            var map_json = generate_source_map(segments, argv.output, '');
            await fs.promises.writeFile(argv.source_map, map_json, 'utf8');
            if (argv.output) {
                var map_url = path.relative(path.dirname(path.resolve(argv.output)), path.resolve(argv.source_map));
                js_output = js_output + '\n//# sourceMappingURL=' + map_url + '\n';
            }
        }
        if (argv.output) {
            // Node's filesystem module cannot write directly to /dev/stdout
            if (argv.output == '/dev/stdout') await write_to_stream(process.stdout, js_output);
            else if (argv.output == '/dev/stderr') await write_to_stream(process.stderr, js_output);
            else await fs.promises.writeFile(argv.output, js_output, "utf8");
        } else if (!argv.execute){
            await write_to_stream(process.stdout, js_output);
        }
        if (argv.execute) {
            vm.runInNewContext(js_output, {'console':console, 'require':require}, {'filename':files[0]});
        }
    }

    async function time_it(name, cont) {
        var t1 = new Date().getTime();
        var ret = await cont();
        if (argv.stats) {
            var spent = new Date().getTime() - t1;
            if (STATS[name]) STATS[name] += spent;
            else STATS[name] = spent;
        }
        return ret;
    }

    var filenames = files.length ? files : [null];
    for (var i = 0; i < filenames.length; i++) {
        var filename = filenames[i];
        var code;
        try {
            code = await read_whole_file(filename);
        } catch(e) {
            console.error("ERROR: can't read file: " + filename);
            process.exit(1);
        }

        var output_stream;
        await time_it("parse", async function(){
            var file = filename || argv.filename_for_stdin || '<stdin>';
            try {
                TOPLEVEL = await parse_file(code, file, TOPLEVEL);
            } catch (e) {
                if (!(e instanceof RapydScript.SyntaxError)) throw e;
                console.error(e.toString());
                process.exit(1);
            }
        });

        try {
            output_stream = new RapydScript.OutputStream(OUTPUT_OPTIONS);
        } catch(ex) {
            if (ex instanceof RapydScript.DefaultsError) {
                console.error(ex.message);
                process.exit(1);
            }
            throw ex;
        }

        if (argv.tree_shaking) {
            time_it("tree_shaking", function(){
                TOPLEVEL = tree_shake(TOPLEVEL);
            });
        }

        time_it("generate", function(){
            TOPLEVEL.print(output_stream);
        });

        await write_output(output_stream.get(), output_stream);
    }

    if (argv.stats) {
        console.error(RapydScript.string_template("Timing information (compressed {count} files):", {
            count: num_of_files
        }));
        for (var i in STATS) if (Object.prototype.hasOwnProperty.call(STATS, i)) {
            console.error(RapydScript.string_template("- {name}: {time}s", {
                name: i,
                time: (STATS[i] / 1000).toFixed(3)
            }));
        }
    }
}
