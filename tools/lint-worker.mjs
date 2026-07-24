/* vim:fileencoding=utf-8
 *
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license
 *
 * Worker thread for parallel linting. Each worker owns its own compiler
 * instance so parsing can run on multiple CPU cores simultaneously.
 */

import { parentPort, workerData } from 'worker_threads';
import { create_compiler } from './compiler.mjs';
import { read_config } from './ini.mjs';
import * as utils from './utils.mjs';
import fs from 'fs';
import path from 'path';

const merge = utils.merge;
const has_prop = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);

// Restore embedded assets forwarded by the main thread (needed in compiled binaries
// where workers don't inherit the main thread's globalThis).
if (workerData && workerData.embedded) {
    globalThis.__rapydscript_embedded__ = workerData.embedded;
}

// Initialize the compiler first — lint.mjs reads globalThis.create_rapydscript_compiler
// at module evaluation time, so the global must be set before the dynamic import.
const compiler = await create_compiler();
globalThis.create_rapydscript_compiler = () => compiler;

// Safe to import now.
const { lint_code } = await import('./lint.mjs');

// Per-worker ini cache keyed by directory. Stores promises to deduplicate
// concurrent lookups for the same directory.
const ini_cache = {};

function get_ini(dir) {
    if (!has_prop(ini_cache, dir)) {
        ini_cache[dir] = read_config(dir).then(r => r.rapydscript || {});
    }
    return ini_cache[dir];
}

// Signal to the main thread that this worker is ready to receive jobs.
parentPort.postMessage({ type: 'ready' });

parentPort.on('message', async (msg) => {
    if (msg.type !== 'lint') return;
    const { id, filename, base_builtins, base_noqa } = msg;

    try {
        const code = await fs.promises.readFile(filename, 'utf-8');

        const final_builtins = merge(base_builtins);
        const final_noqa = merge(base_noqa);

        const rl = await get_ini(path.dirname(filename));
        const g = {};
        (rl.globals || rl.builtins || '').split(',').forEach(function(x) { g[x.trim()] = true; });
        Object.assign(final_builtins, g);

        const ng = {};
        (rl.noqa || '').split(',').forEach(function(x) { ng[x.trim()] = true; });
        Object.assign(final_noqa, ng);

        code.split('\n', 20).forEach(function(line) {
            var lq = line.replace(/\s+/g, '');
            if (lq.startsWith('#globals:')) {
                (lq.split(':', 2)[1] || '').split(',').forEach(function(item) { final_builtins[item] = true; });
            } else if (lq.startsWith('#noqa:')) {
                (lq.split(':', 2)[1] || '').split(',').forEach(function(item) { final_noqa[item] = true; });
            }
        });

        // Suppress per-file output; the main thread reports in file order.
        const messages = await lint_code(code, {
            filename,
            builtins: final_builtins,
            noqa: final_noqa,
            errorformat: false,
            report: function() {},
        });

        // Strip code_lines — it is never used by the CLI report functions and
        // transferring it across threads would be wasteful.
        const clean = messages.map(function(m) {
            return {
                filename: m.filename,
                start_line: m.start_line,
                start_col: m.start_col,
                end_line: m.end_line,
                end_col: m.end_col,
                ident: m.ident,
                message: m.message,
                level: m.level,
                name: m.name,
                other_line: m.other_line,
            };
        });

        parentPort.postMessage({ type: 'result', id, messages: clean });
    } catch (e) {
        parentPort.postMessage({ type: 'error', id, error: e.message || String(e) });
    }
});
