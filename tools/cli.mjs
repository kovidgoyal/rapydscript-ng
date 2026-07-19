/*
 * cli.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */

import path from 'path';
import * as utils from './utils.mjs';
import packageJson from '../package.json' with { type: 'json' };

var colored = utils.safe_colored;
var has_prop = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);

function OptionGroup(name) {
    this.name = name;
    this.description = undefined;
    this.extra = undefined;
    this.options = {
        'string': {},
        'boolean': {},
        'alias': {},
        'default': {},
        'choices': {},
    };

    this.help = {};
    this.seen = {};
}

var groups = {}, group;

function create_group(name, usage, description, extra) {
    group = new OptionGroup(name);
    group.description = description;
    group.usage = name + ' [options] ' + usage;
    groups[name] = group;

    if (extra) group.extra = extra;

opt('help', 'h', 'bool', false, 'show this help message and exit');

opt('version', 'V', 'bool', false, 'show the version and exit');


}

var COL1 = 'yellow', COL2 = 'green';

function print_usage(group) {  // {{{
	var COL_WIDTH = 79;
	var OPT_WIDTH = 23;

    var usage = (group) ? group.usage :  "[sub-command] ...";
	console.log(colored('Usage:', COL1), colored(path.basename(process.argv[1]), COL2), usage, '\n');
    if (!group) {
        // Overall usage
        help = ('RapydScript can perform many actions, depending on which' +
                '\nsub-command is invoked. With no arguments, it will start a REPL,' +
                '\nunless STDIN is a pipe, in which case it will compile whatever' +
                '\nyou pass on STDIN and write the output to STDOUT. See the full' +
                '\nlist of sub-commands below.');
        console.log(help, '\n');
        console.log(colored('Sub-commands:', COL1));
        Object.keys(groups).forEach(function (name) {
            console.log();
            var dt = utils.wrap(groups[name].description.split('\n'), COL_WIDTH - OPT_WIDTH);
            console.log(colored((name + utils.repeat(' ', OPT_WIDTH)).slice(0, OPT_WIDTH), COL2), dt[0]);
            dt.slice(1).forEach(function (line) {
                console.log(utils.repeat(' ', OPT_WIDTH), line);
            });
        });
        return;
    }

    // Group specific usage

    console.log(group.description);
    if (group.extra) console.log('\n' + group.extra);
	console.log(colored('\nOptions:', COL1));
    var options = group.options;
    var help = group.help;

	Object.getOwnPropertyNames(options.alias).forEach(function (name) {
		var optstr = '  --' + name.replace(/_/g, '-');
		options.alias[name].forEach(function (alias) {
			optstr += ', ' + ((alias.length > 1) ? '--' : '-') + alias.replace(/_/g, '-');
		});
		var ht = utils.wrap(help[name].split('\n'), COL_WIDTH - OPT_WIDTH);

		if (optstr.length > OPT_WIDTH) console.log(colored(optstr, COL2));
		else {
			console.log(colored((optstr + utils.repeat(' ', OPT_WIDTH)).slice(0, OPT_WIDTH), COL2), ht[0]);
			ht = ht.splice(1);
		}
		ht.forEach(function (line) {
			console.log(utils.repeat(' ', OPT_WIDTH), line);
		});
		console.log();
	});

}  // }}}

// Process options {{{

function opt(name, aliases, type, default_val, help_text, choices) {
    var options = group.options;
    var seen = group.seen;
    var help = group.help;

	if (!type || type == 'bool') options.boolean[name] = true;
	else if (type == 'string') {
        options.string[name] = true;
        if (choices) options.choices[name] = choices;
    }

	if (default_val !== undefined) options.default[name] = default_val;

	if (aliases && aliases.length) {
		aliases.split(',').forEach(function(alias) {
			if (has_prop(seen, alias)) throw "The option name:" + alias + " has already been used.";
			seen[alias] = true;
		});
		options.alias[name] = aliases.split(',');
	} else options.alias[name] = [];

	if (has_prop(seen, name)) throw "The option name:" + name + " has already been used.";
	seen[name] = true;

	help[name] = help_text;
}
// }}}

function parse_args() {  // {{{
	var ans = {'files':[]};
	var name_map = {};
	var state, options, group;

	function plain_arg(arg) {
		if (state !== undefined) ans[state] = arg;
		else ans.files.push(arg);
		state = undefined;
	}

	function handle_opt(arg) {
		var oarg = arg;
        var is_long_opt = (arg[0] === '-') ? true : false;
		if (is_long_opt) arg = arg.substr(1);
		if (state !== undefined) ans[state] = '';
		state = undefined;
        if (!is_long_opt && arg.length > 1) {
            arg.split('').forEach(handle_opt);
            return;
        }
		var val = arg.indexOf('=');
		if (val > -1) {
			var t = arg.substr(val + 1);
			arg = arg.substr(0, val);
			val = t;
		} else val = undefined;

		var name = name_map[arg.replace(/-/g, '_')];
		if (!name) {
			print_usage(group);
			console.error('\nThe option:', colored('-' + oarg, 'red'), 'is not recognized');
			process.exit(1);
		}
		if (has_prop(options.boolean, name)) {
			if (!val) val = 'true';
			if (val === 'true' || val === '1') val = true;
			else if (val === 'false' || val === '0') val = false;
			else { console.error('The value:', colored(val, 'red'), 'is invalid for the boolean option:', colored(name, 'red')); process.exit(1); }
			ans[name] = val;
		} else {
			if (val !== undefined) ans[name] = val;
			else state = name;
		}
	}

    var all_args = process.argv.slice(2);
    ans.auto_mode = false;
    if (has_prop(groups, all_args[0])) {
        ans.mode = all_args[0];
        all_args = all_args.slice(1);
    } else {
        // this check is not robust, but, it will only fail if the repl mode takes any non-boolean options
        var has_files = all_args.filter(function (a) { return a[0] !== '-'; }).length > 0;
        ans.mode = (!has_files && process.stdin.isTTY) ? 'repl' : 'compile';
        ans.auto_mode = true;
    }
    options = groups[ans.mode].options;

	Object.getOwnPropertyNames(options.default).forEach(function(name) { ans[name] = options['default'][name]; });

	Object.getOwnPropertyNames(options.alias).forEach(function(name) {
		name_map[name] = name;
		options.alias[name].forEach(function (alias) { name_map[alias] = name; });
	});

    var options_ended = false;

	all_args.forEach(function(arg) {
        if (options_ended) plain_arg(arg);
        else if (arg === '--') options_ended = true;
		else if (arg === '-') plain_arg(arg);

		else if (arg[0] === '-') handle_opt(arg.substr(1));

		else plain_arg(arg);
	});
	if (state !== undefined) plain_arg('');
    Object.keys(options.choices).forEach(function(name) {
        var allowed = options.choices[name];
        if (allowed.indexOf(ans[name]) < 0) {
            print_usage(groups[ans.mode]);
            console.error('The value "' + colored(ans[name], 'red') + '" is not allowed for ' + colored(name, 'red') + '. Allowed values: ' + options.choices[name].join(', '));
            process.exit(1);
        }
    });
	return ans;
} // }}}

create_group('compile', "[input1.pyj input2.pyj ...]", `Compile RapydScript source code into JavaScript
output. You can also pipe the source code into
stdin.`);

opt("output", 'o', 'string', '', `Output file (default STDOUT)`);

opt("bare", 'b', 'bool', false, `Remove the module wrapper that prevents RapydScript
scope from bleeding into other JavaScript logic`);

opt("keep_docstrings", 'd', 'bool', false, `Keep the docstrings in the generated JavaScript as __doc__
attributes on functions, classes and modules. Normally,
the docstring are deleted to reduce download size.`);

opt("discard_asserts", 'a', 'bool', false, `Discard any assert statements. If you use assert statements
for debugging, then use this option to generate an optimized build
without the assert statements.`);

opt("uglify", 'u', 'bool', false, `Minify the output instead of pretty printing it.`);

opt("omit_baselib", 'm', 'bool', false, `Omit baselib functions. Use this if you have a
different way of ensuring they're imported. For example,
you could import one of the baselib-plain-*.js files directly
into the global namespace.`);

opt("js_version", 'js,j', 'string', '6', `The JavaScript version to output. ES 6
compatible JavaScript is output. Only ES 6 is supported.`, ['6']);

opt("import_path", "p", 'string', '', `A list of paths in which to look for imported modules.
Multiple paths must be separated by the path separator
(: on Unix and ; on Windows). You can also use the
environment variable RAPYDSCRIPT_IMPORT_PATH for this,
with identical syntax. Note that these directories
are searched before the builtin paths, which means you
can use them to replace builtin modules.`);

opt("filename_for_stdin", "P", 'string', '', `filename to use for data piped into STDIN. Imports will
be resolved relative to the directory this filename is in.
Note, that you can also use the --import-path option to
add directories to the import path.`);

opt("cache_dir", "C", 'string', '', `directory to use to store the cached files generated
by the compiler. Normally, these are stored right next to
every compiled pyj file, with the extension pyj-cached. This
option allows them to be consolidated in a single directory.`);

opt("comments", undefined, 'string', '', `Preserve copyright comments in the output.
By default this works like Google Closure, keeping
JSDoc-style comments that contain "@license" or
"@preserve". You can optionally pass one of the
following arguments to this flag:
- "all" to keep all comments
- a valid JS regexp (needs to start with a slash) to
keep only comments that match.

Note that currently not *all* comments can be kept
when compression is on, because of dead code removal
or cascading statements into sequences.`);

opt("stats", undefined, 'bool', false, `Display operations run time on STDERR.`);

opt("tree_shaking", 'T,tree-shake', 'bool', false, `Enable tree shaking (dead code elimination). Removes
unused top-level functions and classes from the compiled
output. If an imported module is referenced only from
dead code, its import is removed entirely. Stdlib
modules that are not used are also removed.
Defaults to off. You can use the @no_prune decorator
to prevent functions or classes from being pruned
even when they are unused.`);

opt("execute", 'x,exec', 'bool', false, `Compile and execute the RapydScript code, all in
one invocation. Useful if you wish to use RapydScript for
scripting. Note that you can also use the -o option to
have the compiled JavaScript written out to a file
before being executed. If you specify this option you
should not specify the -m option to omit the baselib, or
execution will fail.`);

opt("source_map_line_offset", '', 'number', 0, `Shift all generated line numbers in the source map by
this many lines. Useful when the compiled JavaScript will
be embedded inside a larger file (e.g. prepended with a
header), so that debugger mappings remain accurate.`);

opt("source_map", 'S,sm', 'string', '', `Generate a source map and write it to the specified
file path. A source map allows debuggers to map
positions in the compiled JavaScript back to the
original RapydScript source. When --output is set,
a //# sourceMappingURL comment is automatically
appended to the JavaScript output. When outputting
to stdout, the comment is omitted since no output
path is available to compute the URL.`);

create_group('repl', '', `Run a Read-Eval-Print-Loop (REPL). This allows
you to type and run RapydScript at a live
command prompt.`);

opt("no_js", '', 'bool', false, `Do not display the compiled JavaScript before executing
it.`);

create_group('lint', "[input1.pyj input2.pyj ...]", `Run the RapydScript linter. This will find various
possible problems in the .pyj files you specify and
write messages about them to stdout. Use - to read from STDIN.
The main check it performs is for unused/undefined
symbols, like pyflakes does for python.`,
`In addition to the command line options listed below,
you can also control the linter in a couple of other ways.

In the actual source files, you can turn off specific checks
on a line by line basis by adding: # noqa:check1,check2...
to the end of the line. For example:

  f()  # noqa: undef

will prevent the linter from showing undefined symbol
errors for this line. You can also turn off individual checks
at the file level, by putting the noqa directive on a
line by itself near the top of the file, for example:

# noqa: undef

Similarly, you can tell the linter
about global (builtin) symbols with a comment near the top
of the file, for example:

# globals:assert,myglobalvar

This will prevent the linter form treating these names as
undefined symbols.

Finally, the linter looks for a setup.cfg file in the
directory containing the file being linted or any of its
parent directories. You can both turn off individual checks
and define project specific global symbols in the setup.cfg
file, like this:

[rapydscript]
globals=myglobalvar,otherglobalvar
noqa=undef,eol-semicolon`);

opt("globals", 'g,b,builtins', 'string', '', `Comma separated list of additional names that the linter will
treat as global symbols. It ignores undefined errors for
global symbols.`);

opt("noqa", 'e,ignore,exclude', 'string', '', `Comma separated list of linter checks to skip. The linter
will not report errors corresponding to these checks.
The check names are output in the linter's normal output, you
can also list all check names with --noqa-list.`);

opt("errorformat", 'f,s,style', 'string', 'human', `Output the results in the specified format. Valid formats are:
human - output is suited for reading by humans (the default)
json  - output is in JSON format
vim   - output can be consumed easily by vim's errorformat
        directive. Format is:
        filename:line:col:errortype:token:message [identifier]
undef - output only the names of undefined symbols in a form that
        can be easily copy/pasted`, ['human', 'json', 'vim', 'undef']);

opt("noqa_list", '', 'bool', false, `List all available linter checks, with a brief
description, and exit.`);

opt('stdin_filename', '', 'string', 'STDIN', `The filename for data read from STDIN. If not specified
STDIN is used.`);

opt('input_list', 'l', 'string', '', `Read the list of input files from the specified file,
one filename per line. Use - to read the list from STDIN.
Cannot be combined with - as an input file.`);

create_group('test', '[test1 test2...]', `Run RapydScript tests. You can specify the name of
individual test files to only run tests from those
files. For example:
test baselib functions`);

create_group('self', '', `Compile the compiler itself. It will only actually
compile if something has changed since the last time
it was called. To force a recompilation, simply
delete lib/signatures.json`);

opt("complete", 'c,f,full', 'bool', false, `Run the compilation repeatedly, as many times as neccessary,
so that the compiler is built with the most upto date version
of itself.`);

opt("test", 't', 'bool', false, `Run the test suite after building completes.`);

opt("profile", 'p', 'bool', false, `Run a CPU profiler which will output its data to
self.cpuprofile. The data can then be analysed with
node-inspector.`);

create_group('gettext', "[input1.pyj input_dir ...]", `Extract strings marked for translation from the specified
source files and directories.`,
`Directories are scanned recursively for .pyj files. If no
arguments are specified, the source code is read from stdin.

Translatable string are output on stdout in the .po format.
Translatable strings are detected in the input as literal
string arguments to the functions _(), gettext() and ngettext().`);

opt("omit_header", 'm', 'bool', false, `Do not write header with 'msgid ""' entry.`);

opt("package_name", '', 'string', 'XXX', `Set the package name in the header`);

opt("package_version", '', 'string', 'XXX', `Set the package version in the header`);

opt("bugs_address", 'bug_address', 'string', 'bugs@example.com', `Set the email address for bug reports in the header`);

create_group('msgfmt', "", `Compile a .po file into a .json file that can
be used to load translations in a browser.`,
`The .po file is read from
stdin and the .json file written to stdout. Note
that it is assumed the .po file is encoded in UTF-8.
If you .po file is in some other encoding, you will need to
convert it to UTF-8 first.`);

opt("use_fuzzy", 'f', 'bool', false, `Use fuzzy translations, they are ignored by default.`);

create_group('web-repl-export', '<output-directory>', `Export the web REPL to a directory. Creates a
self-contained set of files including index.html that
you can open in a browser to use the RapydScript web REPL.`);

create_group('fmt', "[input1.pyj dir1 ...]", `Format RapydScript source code according to PEP8
style guidelines (adapted sensibly for RapydScript
specific syntax such as multi-line anonymous functions).`,
`If files and/or directories are specified, they are formatted in place.
Directories are scanned recursively for .pyj files. Use the --check-only
option to instead report files that would be reformatted without changing
them.

If no files or directories are specified, the source code is read from
STDIN and the formatted result is written to STDOUT.`);

opt("line_length", 'l', 'string', '80', `The maximum allowed line length. Lines longer than this
are wrapped where it is safe to do so. Defaults to 80.`);

opt("preferred_quote", 'q', 'string', 'single', `The preferred quote character for string literals. Either
"single" or "double". A string is only re-quoted when doing
so does not increase the number of backslash escapes.
Defaults to single.`, ['single', 'double']);

opt("check_only", 'c', 'bool', false, `Do not modify files. Instead, print the names of files that
would be reformatted (and any lines that exceed the maximum
length) to STDERR. Exit with a status of 1 if any issues are
found, otherwise 0.`);


export var argv = parse_args();
if (typeof argv.js_version === 'string') {
    argv.js_version = parseInt(argv.js_version);
    if (isNaN(argv.js_version)) {
        console.log('--js-version must be a number');
        process.exit(1);
    }
}

if (argv.help) {
	print_usage((!argv.auto_mode) ? groups[argv.mode]: undefined);
	process.exit(0);
}

if (argv.version) {
    console.log(packageJson.name + ' ' + packageJson.version);
    process.exit(0);
}
