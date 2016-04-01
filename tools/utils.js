/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */
"use strict";  /*jshint node:true */

var comment_contents = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)[ \t]*\*\//;
var colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

function ansi(code) {
    code = code || 0;
    return String.fromCharCode(27) + '[' + code + 'm';
}

function path_exists(path) {
    var fs = require('fs');
    try {
        fs.statSync(path);
        return true;
    } catch(e) {
        if (e.code != 'ENOENT') throw e;
    }
}

function colored(string, color, bold) {
    var prefix = [];
    if (bold) prefix.push(ansi(1));
    if (color) prefix.push(ansi(colors.indexOf(color) + 31));
    return prefix.join('') + string + ansi(0);
}

function supports_color(stdout) {
    stdout = stdout || process.stdout;
	if (stdout && !stdout.isTTY) {
		return false;
	}

	if (process.platform === 'win32') {
		return false;
	}

	if ('COLORTERM' in process.env) {
		return true;
	}

	if (process.env.TERM === 'dumb') {
		return false;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return true;
	}

    return false;

}

function safe_colored(string) {
    return string;
}

function repeat(str, num) {
    return new Array( num + 1 ).join( str );
}

function generators_available() {
    var gen;
    try {
        eval('gen = function *(){}'); // jshint ignore:line
        return typeof gen === 'function' && gen.constructor.name == 'GeneratorFunction';
    } catch(e) {
        return false;
    }
}

function wrap(lines, width) {
	var ans = [];
	var prev = '';
	lines.forEach(function (line) {
		line = prev + line;
		prev = '';
		if (line.length > width) {
			prev = line.substr(width);
            if (prev) prev += ' ';
			line = line.substr(0, width - 1);
			if (line.substr(line.length - 1 !== ' ')) line += '-';
		} 
		ans.push(line);
	});
	if (prev) ans = ans.concat(wrap([prev]));
	return ans;
}

function merge() {
    // Simple merge of properties from all objects
    var ans = {};
    Array.prototype.slice.call(arguments).forEach(function (arg) {
        Object.keys(arg).forEach(function(key) {
            ans[key] = arg[key];
        });
    });
    return ans;
}

function get_import_dirs(paths_string, ignore_env) {
    var path = require('path');
    var paths = [];
    function merge(new_path) {
        if (paths.indexOf(new_path) == -1) paths.push(new_path);
    }
    if (!ignore_env && process && process.env && process.env.RAPYDSCRIPT_IMPORT_PATH) {
        process.env.RAPYDSCRIPT_IMPORT_PATH.split(path.delimiter).forEach(merge);
    }
    if (paths_string) paths_string.split(path.delimiter).forEach(merge);
    return paths;
}

exports.comment_contents = comment_contents;
exports.repeat = repeat;
exports.wrap = wrap;
exports.merge = merge;
exports.colored = colored;
exports.safe_colored = (supports_color()) ? colored : safe_colored;
exports.generators_available = generators_available;
exports.get_import_dirs = get_import_dirs;
exports.path_exists = path_exists;
