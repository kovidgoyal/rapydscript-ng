/* vim:fileencoding=utf-8
 *
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 */

import fs from 'fs';
import path from 'path';

function parse_ini_data(data) {
    // Based on MIT licensed code from:
    // https://github.com/shockie/node-iniparser/blob/master/lib/node-iniparser.js
    var ans = {}, match;
	var lines = data.split(/\r\n|\r|\n/);
	var section = null;
    var section_pat = /^\s*\[\s*([^\]]*)\s*\]\s*$/;
    var param_pat = /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/;
    var comment_pat = /^\s*;.*$/;

	lines.forEach(function(line) {
		if(comment_pat.test(line)) {
			return;
		} else if(param_pat.test(line)) {
			match = line.match(param_pat);
			if(section) {
				ans[section][match[1]] = match[2];
			} else {
				ans[match[1]] = match[2];
			}
		} else if(section_pat.test(line)) {
			match = line.match(section_pat);
			ans[match[1]] = {};
			section = match[1];
		} else if(line.length === 0 && section) {
			section = null;
		}
	});
	return ans;
}

async function find_cfg_file(toplevel_dir) {
    var current_dir = toplevel_dir, previous_dir = toplevel_dir;
    do {
        try {
            return await fs.promises.readFile(path.join(current_dir, 'setup.cfg'), 'utf-8');
        } catch (e) {
            if (e.code !== 'ENOENT') throw e;
        }
        previous_dir = current_dir;
        current_dir = path.dirname(current_dir);
    } while(current_dir != previous_dir && current_dir);

    return null;
}

async function read_config(toplevel_dir) {
    var data = await find_cfg_file(toplevel_dir);
    if (!data) return {};
    return parse_ini_data(data);
}

// ---------------------------------------------------------------------------
// pyproject.toml reading
// ---------------------------------------------------------------------------

async function find_pyproject_toml(start_dir) {
    var current = start_dir;
    while (true) {
        try {
            return await fs.promises.readFile(path.join(current, 'pyproject.toml'), 'utf-8');
        } catch (e) {
            if (e.code !== 'ENOENT' && e.code !== 'EACCES' && e.code !== 'EPERM') throw e;
        }
        var parent = path.dirname(current);
        if (parent === current) return null;
        current = parent;
    }
}

function parse_toml_sections(text) {
    // Minimal TOML parser: returns a flat map of dotted-section-name -> {key: value}.
    // Only handles simple string and integer scalar values needed for config settings.
    var sections = {};
    var cur = null;
    var lines = text.split(/\r?\n/);
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (!line || line[0] === '#') continue;
        // Section header: [tool.ruff] or [tool.ruff.format] — not [[array]] tables.
        var sec_m = line.match(/^\[([^\[\]]+)\]$/);
        if (sec_m) {
            var sec_name = sec_m[1].trim();
            if (!sections[sec_name]) sections[sec_name] = {};
            cur = sections[sec_name];
            continue;
        }
        if (!cur) continue;
        var eq = line.indexOf('=');
        if (eq < 0) continue;
        var key = line.slice(0, eq).trim();
        var rest = line.slice(eq + 1).trim();
        if (!key) continue;
        var val;
        if (rest[0] === '"' || rest[0] === "'") {
            var q = rest[0];
            if (rest.slice(0, 3) === q + q + q) continue;  // triple-quoted: skip
            var j = 1;
            while (j < rest.length && rest[j] !== q) {
                if (rest[j] === '\\') j++;
                j++;
            }
            val = rest.slice(1, j);
        } else {
            var hash = rest.indexOf('#');
            if (hash >= 0) rest = rest.slice(0, hash).trim();
            val = rest;
        }
        cur[key] = val;
    }
    return sections;
}

function pyproject_line_length(sections) {
    var candidates = [
        ['tool.ruff', 'line-length'],
        ['tool.black', 'line-length'],
        ['tool.isort', 'line_length'],
        ['tool.isort', 'line-length'],
    ];
    for (var i = 0; i < candidates.length; i++) {
        var sec = sections[candidates[i][0]];
        if (sec && sec[candidates[i][1]] !== undefined) {
            var ll = parseInt(sec[candidates[i][1]], 10);
            if (!isNaN(ll) && ll > 0) return ll;
        }
    }
    return null;
}

function pyproject_quote(sections) {
    // tool.ruff.format.quote-style (skip 'preserve')
    var rf = sections['tool.ruff.format'];
    if (rf && rf['quote-style']) {
        if (rf['quote-style'] === 'double') return 'double';
        if (rf['quote-style'] === 'single') return 'single';
    }
    // tool.ruff.lint.flake8-quotes.inline-quotes
    var fq = sections['tool.ruff.lint.flake8-quotes'];
    if (fq && fq['inline-quotes']) {
        if (fq['inline-quotes'] === 'double') return 'double';
        if (fq['inline-quotes'] === 'single') return 'single';
    }
    // tool.flake8.inline-quotes
    var flk = sections['tool.flake8'];
    if (flk && flk['inline-quotes']) {
        if (flk['inline-quotes'] === 'double') return 'double';
        if (flk['inline-quotes'] === 'single') return 'single';
    }
    return null;
}

async function read_pyproject_config(start_dir) {
    var text = await find_pyproject_toml(start_dir);
    if (!text) return {};
    var sections = parse_toml_sections(text);
    var result = {};
    var ll = pyproject_line_length(sections);
    if (ll !== null) result.line_length = ll;
    var q = pyproject_quote(sections);
    if (q !== null) result.preferred_quote = q;
    return result;
}

export { read_config, read_pyproject_config };
