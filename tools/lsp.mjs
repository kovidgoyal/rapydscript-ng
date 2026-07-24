/* vim:fileencoding=utf-8
 *
 * lsp.mjs -- Language Server Protocol server for RapydScript.
 *
 * Copyright (C) 2026 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 *
 * Provides: code completion, diagnostics, hover, code actions, document
 * formatting, go-to-definition, find-all-references and rename. Diagnostics
 * reuse the linter (tools/lint.mjs) plus a check for unresolved imports.
 * Formatting reuses the formatter (tools/fmt.mjs). Cross-file references and
 * rename are resolved through the module import graph.
 *
 * The server reuses the single compiler instance created by bin/rapydscript.
 */
"use strict";

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { pathToFileURL, fileURLToPath } from 'url';
import * as utils from './utils.mjs';
import { lint_parsed, BUILTINS, WARN, ERROR, MESSAGES } from './lint.mjs';
import { format_string, organize_imports } from './fmt.mjs';
import * as sym from './lsp_symbols.mjs';
import { create_connection, DocumentStore, TextDocument, ResponseError, ErrorCodes } from './lsp_protocol.mjs';
import { read_pyproject_config } from './ini.mjs';

const RapydScript = globalThis.create_rapydscript_compiler();

// ---------------------------------------------------------------------------
// LSP enum constants
// ---------------------------------------------------------------------------
var DiagnosticSeverity = { Error: 1, Warning: 2, Information: 3, Hint: 4 };
var CompletionItemKind = {
    Text: 1, Method: 2, Function: 3, Constructor: 4, Field: 5, Variable: 6,
    Class: 7, Interface: 8, Module: 9, Property: 10, Keyword: 14, Constant: 21,
};
var SymbolKindLSP = { File: 1, Module: 2, Class: 5, Method: 6, Property: 7, Field: 8, Function: 12, Variable: 13, Constant: 14 };
var CodeActionKind = { QuickFix: 'quickfix', SourceFixAll: 'source.fixAll', Source: 'source', OrganizeImports: 'source.organizeImports' };

function kind_to_completion(kind) {
    switch (kind) {
        case sym.KIND.FUNCTION: return CompletionItemKind.Function;
        case sym.KIND.CLASS: return CompletionItemKind.Class;
        case sym.KIND.METHOD: return CompletionItemKind.Method;
        case sym.KIND.IMPORT: return CompletionItemKind.Module;
        case sym.KIND.IMPORTED_NAME: return CompletionItemKind.Variable;
        case sym.KIND.PARAMETER: return CompletionItemKind.Variable;
        default: return CompletionItemKind.Variable;
    }
}

// ---------------------------------------------------------------------------
// URI <-> path and text normalization
// ---------------------------------------------------------------------------
function uri_to_path(uri) {
    if (uri.slice(0, 5) === 'file:') return fileURLToPath(uri);
    return uri;
}
function path_to_uri(p) { return pathToFileURL(p).href; }
// The tokenizer normalizes line endings; keep all offset math on normalized text.
function normalize(text) { return text.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/\uFEFF/g, ""); }

// ---------------------------------------------------------------------------
// Server context: caches, import dirs, document store, workspace.
// ---------------------------------------------------------------------------
export function create_server_context(opts) {
    opts = opts || {};
    return {
        import_dirs: opts.import_dirs || [],          // user --import-path dirs
        libdir: opts.libdir || null,                  // stdlib dir (src/lib)
        line_length: opts.line_length || 80,
        preferred_quote: opts.preferred_quote || 'single',
        join_lines: opts.join_lines || false,
        docs: new DocumentStore(),
        analysis_cache: Object.create(null),          // key -> analysis
        workspace_roots: opts.workspace_roots ? opts.workspace_roots.slice() : [],
        _scan_cache: null,                            // {files:[...], at:mtime-ish}
    };
}

// Apply a workspace/didChangeConfiguration settings object to ctx.
// Returns {import_dirs: true} if import_dirs changed (caller should re-run diagnostics).
export function apply_configuration(ctx, settings) {
    if (!settings) return {};
    var changed = {};

    if (settings.lineLength !== undefined && settings.lineLength !== null) {
        var ll = typeof settings.lineLength === 'number'
            ? Math.floor(settings.lineLength)
            : parseInt(settings.lineLength, 10);
        if (!isNaN(ll) && ll > 0) ctx.line_length = ll;
    }

    if (settings.preferredQuote === 'single' || settings.preferredQuote === 'double') {
        ctx.preferred_quote = settings.preferredQuote;
    }

    if (settings.joinLines !== undefined && settings.joinLines !== null) {
        ctx.join_lines = !!settings.joinLines;
    }

    if (settings.importPath !== undefined && settings.importPath !== null) {
        var new_dirs;
        if (Array.isArray(settings.importPath)) {
            new_dirs = settings.importPath
                .filter(function (p) { return p && typeof p === 'string'; })
                .map(function (p) { return path.resolve(p); });
        } else if (typeof settings.importPath === 'string') {
            new_dirs = utils.get_import_dirs(settings.importPath)
                .map(function (p) { return path.resolve(p); });
        }
        if (new_dirs !== undefined) {
            ctx.import_dirs = new_dirs;
            ctx.analysis_cache = Object.create(null);
            invalidate_workspace_scan(ctx);
            changed.import_dirs = true;
        }
    }

    return changed;
}

// Import search dirs for a given file: user dirs + stdlib + the file's directory.
function import_dirs_for(ctx, file_path) {
    var dirs = ctx.import_dirs.slice();
    if (ctx.libdir) dirs.push(ctx.libdir);
    if (file_path) dirs.push(path.dirname(file_path));
    return dirs;
}

// ---------------------------------------------------------------------------
// Analysis: parse (with error recovery) + build the symbol index. Cached per
// (uri, text) so hover/definition/references/completion reuse a single parse.
// ---------------------------------------------------------------------------
export async function analyze(ctx, uri, raw_text) {
    var text = normalize(raw_text);
    var cache_key = crypto.createHash('sha1').update(text).digest('hex');
    var cached = ctx.analysis_cache[uri];
    if (cached && cached.cache_key === cache_key) return cached;

    var file_path = uri_to_path(uri);
    var toplevel = null, recovered = [];
    try {
        toplevel = await RapydScript.parse(text, {
            filename: file_path,
            for_linting: true,
            recover_errors: true,
            basedir: path.dirname(file_path),
            libdir: ctx.libdir || path.dirname(file_path),
            import_dirs: ctx.import_dirs,
        });
        recovered = toplevel.recovered_errors || [];
    } catch (e) {
        // Even in recovery mode an unexpected internal error can occur; degrade
        // gracefully to a single diagnostic rather than crashing the server.
        if (e instanceof RapydScript.SyntaxError) {
            recovered = [{ message: e.message, line: e.line, col: e.col, pos: e.pos, is_eof: e.is_eof }];
        } else {
            recovered = [{ message: 'Internal parse error: ' + (e && e.message ? e.message : e), line: 1, col: 0, pos: 0 }];
        }
    }
    var index = toplevel ? sym.build_index(toplevel, file_path) : null;
    var doc = new TextDocument(uri, 'rapydscript', 0, text);
    var analysis = {
        uri: uri, file_path: file_path, text: text, cache_key: cache_key,
        toplevel: toplevel, index: index, recovered_errors: recovered, doc: doc,
    };
    ctx.analysis_cache[uri] = analysis;
    return analysis;
}

// Convenience: get the current text for a uri (open document wins over disk).
async function text_for_uri(ctx, uri) {
    var doc = ctx.docs.get(uri);
    if (doc) return doc.text;
    return normalize(await fs.promises.readFile(uri_to_path(uri), 'utf-8'));
}

function offset_to_range(doc, span) {
    return { start: doc.position_at(span[0]), end: doc.position_at(span[1]) };
}

// ---------------------------------------------------------------------------
// Import resolution (for the unresolved-import diagnostic and go-to-definition)
// ---------------------------------------------------------------------------
async function resolve_module(ctx, key, from_file, stat_cache) {
    var modpath = key.replace(/\./g, '/');
    var dirs = import_dirs_for(ctx, from_file);
    for (var i = 0; i < dirs.length; i++) {
        if (!dirs[i]) continue;
        var base = dirs[i] + '/' + modpath;
        for (const candidate of [base + '.pyj', base + '/__init__.pyj']) {
            if (await path_exists_cached(candidate, stat_cache)) return path.normalize(candidate);
        }
    }
    return null;
}

async function path_exists_cached(p, cache) {
    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) return cache[p];
    var ok;
    try { await fs.promises.stat(p); ok = true; }
    catch (e) { ok = false; }
    if (cache) cache[p] = ok;
    return ok;
}

// ---------------------------------------------------------------------------
// Diagnostics
// ---------------------------------------------------------------------------
export async function compute_diagnostics(ctx, uri, raw_text) {
    var a = await analyze(ctx, uri, raw_text);
    var doc = a.doc;
    var out = [];

    // 1. Syntax errors surfaced by recovery parsing.
    (a.recovered_errors || []).forEach(function (e) {
        var pos = (typeof e.pos === 'number') ? e.pos : doc.offset_at(doc.lsp_position(e.line, e.col));
        var end = (typeof e.endpos === 'number') ? e.endpos : pos + 1;
        out.push({
            range: { start: doc.position_at(pos), end: doc.position_at(Math.max(end, pos + 1)) },
            severity: DiagnosticSeverity.Error, code: 'syntax-err', source: 'rapydscript',
            message: e.message,
        });
    });

    // 2. Linter diagnostics -- only when the file parsed cleanly, so we do not
    //    emit misleading undefined/unused warnings from a partial AST.
    if (a.toplevel && (!a.recovered_errors || a.recovered_errors.length === 0)) {
        var builtins = utils.merge(BUILTINS, file_globals(a.text));
        var messages = lint_parsed(a.toplevel, a.text, { filename: a.file_path, builtins: builtins, noqa: file_noqa(a.text) });
        messages.forEach(function (m) {
            out.push(lint_message_to_diagnostic(doc, m));
        });
    }

    // 3. Unresolved imports.
    if (a.index) {
        var stat_cache = Object.create(null);
        for (const imp of a.index.imports) {
            var resolved = await resolve_module(ctx, imp.key, a.file_path, stat_cache);
            if (!resolved) {
                var span = sym.node_span(imp.node) || [0, 1];
                out.push({
                    range: offset_to_range(doc, span),
                    severity: DiagnosticSeverity.Error, code: 'import-unresolved', source: 'rapydscript',
                    message: 'Unresolved import: "' + imp.key + '" was not found in the import path',
                });
            }
        }
    }
    return out;
}

// Parse `# noqa: a,b` file-level directives from the first lines (mirrors lint cli).
function file_noqa(code) {
    var noqa = Object.create(null);
    code.split('\n', 20).forEach(function (line) {
        var lq = line.replace(/\s+/g, '');
        if (lq.slice(0, 6).toLowerCase() === '#noqa:') (lq.split(':', 2)[1] || '').split(',').forEach(function (x) { if (x) noqa[x] = true; });
    });
    return noqa;
}

// Parse `# globals: a,b` file-level directives from the first lines (mirrors lint cli).
function file_globals(code) {
    var globals = Object.create(null);
    code.split('\n', 20).forEach(function (line) {
        var lq = line.replace(/\s+/g, '');
        if (lq.slice(0, 9).toLowerCase() === '#globals:') (lq.split(':', 2)[1] || '').split(',').forEach(function (x) { if (x) globals[x] = true; });
    });
    return globals;
}

function lint_message_to_diagnostic(doc, m) {
    var start_line = (m.start_line || 1) - 1;
    var start_col = (m.start_col === undefined || m.start_col === null) ? 0 : m.start_col;
    var end_line = (m.end_line || m.start_line || 1) - 1;
    var end_col = (m.end_col === undefined || m.end_col === null) ? start_col + 1 : m.end_col;
    return {
        range: { start: { line: start_line, character: start_col }, end: { line: end_line, character: end_col } },
        severity: (m.level === WARN) ? DiagnosticSeverity.Warning : DiagnosticSeverity.Error,
        code: m.ident, source: 'rapydscript', message: m.message,
    };
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------
export function format_document(ctx, raw_text) {
    var text = normalize(raw_text);
    var formatted = format_string(text, { line_length: ctx.line_length, preferred_quote: ctx.preferred_quote, join_lines: ctx.join_lines });
    if (formatted === text) return [];
    // Single edit that replaces the whole document.
    var doc = new TextDocument('inmem', 'rapydscript', 0, text);
    var end = doc.position_at(text.length);
    return [{ range: { start: { line: 0, character: 0 }, end: end }, newText: formatted }];
}

// ---------------------------------------------------------------------------
// Organize imports
// ---------------------------------------------------------------------------
export function organize_imports_document(ctx, raw_text) {
    var text = normalize(raw_text);
    var organized = organize_imports(text, { line_length: ctx.line_length, preferred_quote: ctx.preferred_quote, join_lines: ctx.join_lines });
    if (organized === text) return [];
    var doc = new TextDocument('inmem', 'rapydscript', 0, text);
    var end = doc.position_at(text.length);
    return [{ range: { start: { line: 0, character: 0 }, end: end }, newText: organized }];
}

// ---------------------------------------------------------------------------
// Completion
// ---------------------------------------------------------------------------
var KEYWORD_LIST = ('and as assert async await break class continue def del do elif else except finally ' +
    'for from global if import in instanceof is new nonlocal not or pass raise return try typeof void while with yield ' +
    'True False None').split(' ');

export async function completions(ctx, uri, raw_text, offset) {
    var a = await analyze(ctx, uri, raw_text);
    var items = [];
    var seen = Object.create(null);
    function add(label, kind, detail, doc) {
        if (seen[label + '\0' + kind]) return;
        seen[label + '\0' + kind] = true;
        var it = { label: label, kind: kind };
        if (detail) it.detail = detail;
        if (doc) it.documentation = { kind: 'markdown', value: doc };
        items.push(it);
    }

    // Member completion: `expr.<here>` where expr is an imported module -> its exports.
    var dotted = dotted_prefix(a.text, offset);
    if (dotted && a.index) {
        var moddef = find_binding_by_name(a.index, dotted.object, offset);
        if (moddef && moddef.kind === sym.KIND.IMPORT && moddef.import_key) {
            var exports = await module_exports(ctx, moddef.import_key, a.file_path);
            exports.forEach(function (name) { add(name, CompletionItemKind.Field, 'from ' + moddef.import_key); });
        }
        return items;  // after a dot only member names are relevant
    }

    // In-scope symbols.
    if (a.index) {
        sym.visible_symbols(a.index, offset).forEach(function (v) {
            add(v.name, kind_to_completion(v.def.kind), v.def.kind, v.def.docstring || undefined);
        });
    }
    // Builtins + keywords.
    Object.keys(BUILTINS).forEach(function (name) { add(name, CompletionItemKind.Constant, 'builtin'); });
    KEYWORD_LIST.forEach(function (k) { add(k, CompletionItemKind.Keyword); });
    return items;
}

// Extract `<object>.<partial>` immediately before offset, if the cursor is after a dot.
function dotted_prefix(text, offset) {
    var i = offset;
    while (i > 0 && /[A-Za-z0-9_$]/.test(text[i - 1])) i--;
    // i is now at the start of the partial identifier
    if (i > 0 && text[i - 1] === '.') {
        var j = i - 1;
        var k = j;
        while (k > 0 && /[A-Za-z0-9_$]/.test(text[k - 1])) k--;
        var object = text.slice(k, j);
        if (object && /[A-Za-z_$]/.test(object[0])) return { object: object, partial: text.slice(i, offset) };
    }
    return null;
}

function find_binding_by_name(index, name, offset) {
    // Prefer a binding visible at the offset; fall back to any binding of that name.
    var vis = sym.visible_symbols(index, offset);
    for (var i = 0; i < vis.length; i++) if (vis[i].name === name) return vis[i].def;
    for (var j = 0; j < index.defs.length; j++) if (index.defs[j].name === name) return index.defs[j];
    return null;
}

async function module_exports(ctx, key, from_file) {
    var stat_cache = Object.create(null);
    var file = await resolve_module(ctx, key, from_file, stat_cache);
    if (!file) return [];
    var uri = path_to_uri(file);
    var text;
    try { text = await text_for_uri(ctx, uri); }
    catch (e) { return []; }
    var a = await analyze(ctx, uri, text);
    if (!a.index || !a.toplevel) return [];
    // Exported names = top-level bindings (functions/classes/vars) that are not imports.
    return top_level_export_names(a.index);
}

function top_level_export_names(index) {
    var root = index.toplevel_scope;
    if (!root) return [];
    var names = [];
    for (var name in root.bindings) {
        var d = root.bindings[name];
        if (d.kind === sym.KIND.IMPORT || d.kind === sym.KIND.IMPORTED_NAME) continue;
        if (name[0] === '_') continue;  // convention: underscore-prefixed names are private
        names.push(name);
    }
    return names;
}

// ---------------------------------------------------------------------------
// Hover
// ---------------------------------------------------------------------------
export async function hover(ctx, uri, raw_text, offset) {
    var a = await analyze(ctx, uri, raw_text);
    if (!a.index) return null;
    var loc = sym.locate(a.index, offset);
    if (!loc) return null;
    var def = loc.def || (loc.import_name && loc.import_name.def) || null;
    if (loc.kind === 'member') {
        return { contents: { kind: 'markdown', value: '```rapydscript\n(property) ' + loc.member.property + '\n```' }, range: offset_to_range(a.doc, loc.range) };
    }
    if (!def) {
        // Maybe a builtin.
        var name = a.text.slice(loc.range[0], loc.range[1]);
        if (Object.prototype.hasOwnProperty.call(BUILTINS, name)) {
            return { contents: { kind: 'markdown', value: '```rapydscript\n(builtin) ' + name + '\n```' }, range: offset_to_range(a.doc, loc.range) };
        }
        return null;
    }
    var md = '```rapydscript\n(' + def.kind + ') ' + def.name + '\n```';
    if (def.docstring) md += '\n\n' + String(def.docstring).trim();
    if (def.import_key) md += '\n\nimported from `' + def.import_key + '`';
    return { contents: { kind: 'markdown', value: md }, range: offset_to_range(a.doc, loc.range) };
}

// ---------------------------------------------------------------------------
// Go to definition
// ---------------------------------------------------------------------------
export async function definition(ctx, uri, raw_text, offset) {
    var a = await analyze(ctx, uri, raw_text);
    if (!a.index) return null;
    var loc = sym.locate(a.index, offset);
    if (!loc) return null;

    // Member access `mod.name` or `from M import ... as ...` original name -> other file.
    if (loc.kind === 'member') {
        var obj = loc.member.object_node;
        var odef = obj._rs_ref ? obj._rs_ref.def : null;
        if (odef && odef.kind === sym.KIND.IMPORT && odef.import_key) {
            return await definition_in_module(ctx, odef.import_key, a.file_path, loc.member.property);
        }
        return null;
    }
    if (loc.kind === 'import-name') {
        return await definition_in_module(ctx, loc.import_name.key, a.file_path, loc.import_name.original);
    }

    var def = loc.def;
    if (!def) return null;

    // For an imported name, jump to its definition in the source module.
    if ((def.kind === sym.KIND.IMPORTED_NAME || def.kind === sym.KIND.IMPORT) && def.import_key) {
        var orig = def.import_original_name || null;
        if (def.kind === sym.KIND.IMPORT) {
            // `import M` -> definition is the module file itself.
            var loc2 = await module_location(ctx, def.import_key, a.file_path);
            if (loc2) return loc2;
        } else if (orig) {
            var d2 = await definition_in_module(ctx, def.import_key, a.file_path, orig);
            if (d2) return d2;
        }
    }

    // Local definition(s).
    if (def.def_nodes.length) {
        return def.def_nodes.map(function (n) {
            return { uri: uri, range: offset_to_range(a.doc, sym.symbol_range(n, def.name)) };
        });
    }
    return null;
}

async function module_location(ctx, key, from_file) {
    var stat_cache = Object.create(null);
    var file = await resolve_module(ctx, key, from_file, stat_cache);
    if (!file) return null;
    return { uri: path_to_uri(file), range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } } };
}

async function definition_in_module(ctx, key, from_file, name) {
    var stat_cache = Object.create(null);
    var file = await resolve_module(ctx, key, from_file, stat_cache);
    if (!file) return null;
    var uri = path_to_uri(file);
    var text;
    try { text = await text_for_uri(ctx, uri); } catch (e) { return null; }
    var a = await analyze(ctx, uri, text);
    if (!a.index || !a.toplevel) return null;
    var root = a.index.toplevel_scope;
    var d = root && root.bindings[name];
    if (!d || !d.def_nodes.length) return null;
    return d.def_nodes.map(function (n) { return { uri: uri, range: offset_to_range(a.doc, sym.symbol_range(n, name)) }; });
}

// ---------------------------------------------------------------------------
// Cross-file target resolution (shared by references and rename)
// ---------------------------------------------------------------------------
// Returns either {local: def} for a file-private symbol, or
// {exported:{module, name}} for a symbol that participates in the import graph.
function resolve_target(a, loc) {
    var this_module = a.module_id;  // may be undefined for a standalone file
    if (loc.kind === 'member') {
        var obj = loc.member.object_node;
        var odef = obj._rs_ref ? obj._rs_ref.def : null;
        if (odef && odef.kind === sym.KIND.IMPORT && odef.import_key) return { exported: { module: odef.import_key, name: loc.member.property } };
        return null;
    }
    if (loc.kind === 'import-name') {
        return { exported: { module: loc.import_name.key, name: loc.import_name.original } };
    }
    var def = loc.def;
    if (!def) return null;
    if (def.kind === sym.KIND.IMPORTED_NAME && def.import_key) {
        if (def.import_alias) {
            // Renaming the alias is a purely local operation.
            if (loc.kind !== 'import-name') return { local: def };
        }
        return { exported: { module: def.import_key, name: def.import_original_name } };
    }
    // A top-level function/class/variable in a module is exported.
    if (def.scope && def.scope.is_toplevel && this_module &&
        (def.kind === sym.KIND.FUNCTION || def.kind === sym.KIND.CLASS || def.kind === sym.KIND.VARIABLE)) {
        return { exported: { module: this_module, name: def.name } };
    }
    return { local: def };
}

// Compute the module id(s) for a file relative to the import dirs.
function module_ids_for_file(ctx, file_path) {
    var ids = [];
    var dirs = ctx.import_dirs.concat(ctx.libdir ? [ctx.libdir] : []);
    dirs.forEach(function (dir) {
        var rel = path.relative(dir, file_path);
        if (rel.slice(0, 2) === '..' || path.isAbsolute(rel)) return;
        rel = rel.replace(/\\/g, '/');
        if (rel.slice(-4) === '.pyj') rel = rel.slice(0, -4);
        var parts = rel.split('/');
        if (parts[parts.length - 1] === '__init__') parts.pop();
        if (parts.length) ids.push(parts.join('.'));
    });
    return ids;
}

// ---------------------------------------------------------------------------
// Workspace scan (for cross-file references / rename)
// ---------------------------------------------------------------------------
async function workspace_files(ctx) {
    if (ctx._scan_cache) return ctx._scan_cache;
    var roots = [];
    var add_root = function (d) { if (d && roots.indexOf(d) < 0) roots.push(d); };
    ctx.workspace_roots.forEach(add_root);
    ctx.import_dirs.forEach(add_root);
    ctx.docs.all().forEach(function (doc) { add_root(path.dirname(uri_to_path(doc.uri))); });

    var files = [];
    var seen = Object.create(null);
    var SKIP = { 'node_modules': 1, '.git': 1, '.hg': 1, '__pycache__': 1 };
    async function walk(dir, depth) {
        if (depth > 24) return;
        var entries;
        try { entries = await fs.promises.readdir(dir, { withFileTypes: true }); }
        catch (e) { return; }
        for (const ent of entries) {
            var full = path.join(dir, ent.name);
            if (ent.isDirectory()) { if (!SKIP[ent.name]) await walk(full, depth + 1); }
            else if (ent.isFile() && ent.name.slice(-4) === '.pyj') {
                var norm = path.normalize(full);
                if (!seen[norm]) { seen[norm] = true; files.push(norm); }
            }
        }
    }
    for (const r of roots) await walk(r, 0);
    ctx._scan_cache = files;
    return files;
}
export function invalidate_workspace_scan(ctx) { ctx._scan_cache = null; }

// Analyze a workspace file by path (open document text wins over disk).
async function analyze_file(ctx, file_path) {
    var uri = path_to_uri(file_path);
    var text;
    try { text = await text_for_uri(ctx, uri); } catch (e) { return null; }
    var a = await analyze(ctx, uri, text);
    a.uri = uri;
    a.module_id = module_ids_for_file(ctx, file_path)[0];
    return a;
}

// Find every occurrence of an exported symbol (module, name) across the workspace.
// Returns [{uri, doc, range}]. When for_rename is true, aliased local uses are
// excluded (they keep their alias); only occurrences that literally spell `name`
// and refer to the target are included.
async function find_exported_occurrences(ctx, target, for_rename) {
    var out = [];
    var module = target.module, name = target.name;
    var files = await workspace_files(ctx);

    // Ensure open documents that were never scanned (e.g. untitled dirs) are covered.
    var extra = [];
    ctx.docs.all().forEach(function (doc) { var p = path.normalize(uri_to_path(doc.uri)); if (files.indexOf(p) < 0) extra.push(p); });
    var all = files.concat(extra);

    for (const file_path of all) {
        var a = await analyze_file(ctx, file_path);
        if (!a || !a.index) continue;
        var push = function (span) { if (span) out.push({ uri: a.uri, doc: a.doc, range: offset_to_range(a.doc, span) }); };

        // (a) The defining module itself: its top-level binding + local refs.
        if (a.module_id === module) {
            var root = a.index.toplevel_scope;
            var d = root && root.bindings[name];
            if (d) {
                d.def_nodes.forEach(function (n) { push(sym.symbol_range(n, name)); });
                d.ref_nodes.forEach(function (n) { push(sym.symbol_range(n, name)); });
            }
        }

        // (b) Importers.
        for (const imp of a.index.imports) {
            if (imp.key !== module) continue;
            if (imp.kind === 'from') {
                (imp.argnames || []).forEach(function (av) {
                    if (av.name !== name) return;
                    // The original-name token always spells `name`.
                    push(sym.symbol_range(av, name));
                    var bdef = av._rs_imported_var_def;
                    if (bdef && !av.alias) {
                        // Non-aliased: local uses also spell `name`.
                        bdef.ref_nodes.forEach(function (n) { push(sym.symbol_range(n, name)); });
                    }
                    // Aliased: alias + its uses keep their own name -> excluded.
                });
            }
        }

        // (c) Member accesses `mod.name` where mod is imported from `module`.
        a.index.member_accesses.forEach(function (ma) {
            if (ma.property !== name) return;
            var odef = ma.object_node._rs_ref ? ma.object_node._rs_ref.def : null;
            if (odef && odef.kind === sym.KIND.IMPORT && odef.import_key === module) push(ma.range);
        });
    }
    // Deduplicate ranges within the same uri.
    return dedup_locations(out);
}

function dedup_locations(list) {
    var seen = Object.create(null);
    var out = [];
    list.forEach(function (l) {
        var key = l.uri + ':' + l.range.start.line + ':' + l.range.start.character + ':' + l.range.end.line + ':' + l.range.end.character;
        if (seen[key]) return;
        seen[key] = true;
        out.push(l);
    });
    return out;
}

function local_occurrences(a, def) {
    var out = [];
    def.def_nodes.forEach(function (n) { out.push({ uri: a.uri, doc: a.doc, range: offset_to_range(a.doc, sym.symbol_range(n, def.name)) }); });
    def.ref_nodes.forEach(function (n) { out.push({ uri: a.uri, doc: a.doc, range: offset_to_range(a.doc, sym.symbol_range(n, def.name)) }); });
    return dedup_locations(out);
}

// ---------------------------------------------------------------------------
// References
// ---------------------------------------------------------------------------
export async function references(ctx, uri, raw_text, offset, include_declaration) {
    var a = await analyze(ctx, uri, raw_text);
    if (!a.index) return [];
    a.uri = uri;
    a.module_id = module_ids_for_file(ctx, a.file_path)[0];
    var loc = sym.locate(a.index, offset);
    if (!loc) return [];
    var target = resolve_target(a, loc);
    if (!target) return [];
    var occ;
    if (target.local) occ = local_occurrences(a, target.local);
    else occ = await find_exported_occurrences(ctx, target.exported, false);
    return occ.map(function (o) { return { uri: o.uri, range: o.range }; });
}

// ---------------------------------------------------------------------------
// Rename
// ---------------------------------------------------------------------------
var IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

export async function rename(ctx, uri, raw_text, offset, new_name) {
    if (!IDENT_RE.test(new_name)) throw ResponseError(ErrorCodes.InvalidParams, 'Invalid identifier: "' + new_name + '"');
    var a = await analyze(ctx, uri, raw_text);
    if (!a.index) return null;
    a.uri = uri;
    a.module_id = module_ids_for_file(ctx, a.file_path)[0];
    var loc = sym.locate(a.index, offset);
    if (!loc) return null;
    var target = resolve_target(a, loc);
    if (!target) return null;
    var occ;
    if (target.local) occ = local_occurrences(a, target.local);
    else occ = await find_exported_occurrences(ctx, target.exported, true);
    if (!occ.length) return null;

    var changes = Object.create(null);
    occ.forEach(function (o) {
        if (!changes[o.uri]) changes[o.uri] = [];
        changes[o.uri].push({ range: o.range, newText: new_name });
    });
    return { changes: changes };
}

// ---------------------------------------------------------------------------
// Code actions (quick fixes derived from diagnostics)
// ---------------------------------------------------------------------------
export async function code_actions(ctx, uri, raw_text, range, diagnostics) {
    var a = await analyze(ctx, uri, raw_text);
    var actions = [];
    (diagnostics || []).forEach(function (d) {
        if (d.code === 'unused-import' || d.code === 'unused-local') {
            // Remove the whole line containing the unused binding.
            var line = d.range.start.line;
            var edit = { range: { start: { line: line, character: 0 }, end: { line: line + 1, character: 0 } }, newText: '' };
            actions.push({
                title: 'Remove unused ' + (d.code === 'unused-import' ? 'import' : 'local'),
                kind: CodeActionKind.QuickFix, diagnostics: [d],
                edit: { changes: single_change(uri, [edit]) },
            });
        }
        if (d.code && d.code !== 'syntax-err' && d.code !== 'import-unresolved') {
            // Suppress this check on the line with a noqa comment.
            var ln = d.range.start.line;
            var line_text = line_at(a.text, ln);
            var insert_col = line_text.replace(/\s+$/, '').length;
            var noqa_edit = { range: { start: { line: ln, character: insert_col }, end: { line: ln, character: insert_col } }, newText: '  # noqa: ' + d.code };
            actions.push({
                title: 'Ignore ' + d.code + ' on this line (# noqa)',
                kind: CodeActionKind.QuickFix, diagnostics: [d],
                edit: { changes: single_change(uri, [noqa_edit]) },
            });
        }
    });
    // Source action: format the document.
    var fmt_edits = format_document(ctx, a.text);
    if (fmt_edits.length) actions.push({ title: 'Format document', kind: CodeActionKind.Source, edit: { changes: single_change(uri, fmt_edits) } });
    // Source action: organize imports.
    var org_edits = organize_imports_document(ctx, a.text);
    if (org_edits.length) actions.push({ title: 'Organize imports', kind: CodeActionKind.OrganizeImports, edit: { changes: single_change(uri, org_edits) } });
    return actions;
}

function single_change(uri, edits) { var c = Object.create(null); c[uri] = edits; return c; }

function line_at(text, line) {
    var doc = new TextDocument('x', 'rapydscript', 0, text);
    var start = doc.offset_at({ line: line, character: 0 });
    var end = doc.offset_at({ line: line + 1, character: 0 });
    return text.slice(start, end).replace(/\n$/, '');
}

// Document symbols (outline) -- top-level and nested defs/classes.
export async function document_symbols(ctx, uri, raw_text) {
    var a = await analyze(ctx, uri, raw_text);
    if (!a.index) return [];
    var out = [];
    a.index.defs.forEach(function (d) {
        if (!d.def_nodes.length) return;
        var kind = (d.kind === sym.KIND.CLASS) ? SymbolKindLSP.Class
            : (d.kind === sym.KIND.FUNCTION) ? SymbolKindLSP.Function
                : (d.kind === sym.KIND.METHOD) ? SymbolKindLSP.Method : null;
        if (!kind) return;
        var n = d.def_nodes[0];
        out.push({ name: d.name, kind: kind, range: offset_to_range(a.doc, sym.symbol_range(n, d.name)), selectionRange: offset_to_range(a.doc, sym.symbol_range(n, d.name)) });
    });
    return out;
}

// ===========================================================================
// Server / CLI
// ===========================================================================
function argv_has_flag(flag_names) {
    var args = process.argv.slice(3);  // skip: node, script path, mode
    for (var i = 0; i < args.length; i++) {
        var a = args[i];
        if (a === '--') break;
        for (var j = 0; j < flag_names.length; j++) {
            var f = flag_names[j];
            if (a === f || a.startsWith(f + '=')) return true;
        }
    }
    return false;
}

export async function cli(argv, base_path, src_path, lib_path) {
    var ll_from_cli = argv_has_flag(['--line-length', '--line_length', '-l']);
    var q_from_cli = argv_has_flag(['--preferred-quote', '--preferred_quote', '-q']);

    var effective_ll = ll_from_cli ? (parseInt(argv.line_length, 10) || 80) : null;
    var effective_quote = q_from_cli ? argv.preferred_quote : null;

    if (!ll_from_cli || !q_from_cli) {
        var pyconf = await read_pyproject_config(process.cwd());
        if (!ll_from_cli && pyconf.line_length) effective_ll = pyconf.line_length;
        if (!q_from_cli && pyconf.preferred_quote) effective_quote = pyconf.preferred_quote;
    }

    if (!effective_ll) effective_ll = 80;
    if (!effective_quote) effective_quote = 'single';

    var ctx = create_server_context({
        import_dirs: utils.get_import_dirs(argv.import_path).map(function (p) { return path.resolve(p); }),
        libdir: path.join(src_path, 'lib'),
        line_length: effective_ll,
        preferred_quote: effective_quote,
        join_lines: argv.join_lines || false,
    });

    // Diagnostics are pushed to the client, debounced per document.
    var diag_timers = Object.create(null);
    function log(msg) { process.stderr.write('[rapydscript-lsp] ' + msg + '\n'); }

    var connection = create_connection(process.stdin, process.stdout, log);
    var client_capabilities = {};

    function schedule_diagnostics(uri) {
        if (diag_timers[uri]) clearTimeout(diag_timers[uri]);
        diag_timers[uri] = setTimeout(async function () {
            delete diag_timers[uri];
            var doc = ctx.docs.get(uri);
            if (!doc) return;
            try {
                var diags = await compute_diagnostics(ctx, uri, doc.text);
                connection.send_notification('textDocument/publishDiagnostics', { uri: uri, version: doc.version, diagnostics: diags });
            } catch (e) { log('diagnostics failed for ' + uri + ': ' + (e && e.stack ? e.stack : e)); }
        }, 200);
    }

    connection.on_request('initialize', function (params) {
        client_capabilities = (params && params.capabilities) || {};
        if (params && params.workspaceFolders) params.workspaceFolders.forEach(function (f) { if (f.uri) ctx.workspace_roots.push(uri_to_path(f.uri)); });
        else if (params && params.rootUri) ctx.workspace_roots.push(uri_to_path(params.rootUri));
        else if (params && params.rootPath) ctx.workspace_roots.push(params.rootPath);
        return {
            capabilities: {
                textDocumentSync: { openClose: true, change: 1 /* full */, save: { includeText: false } },
                completionProvider: { triggerCharacters: ['.'] },
                hoverProvider: true,
                definitionProvider: true,
                referencesProvider: true,
                renameProvider: true,
                documentFormattingProvider: true,
                documentSymbolProvider: true,
                codeActionProvider: { codeActionKinds: [CodeActionKind.QuickFix, CodeActionKind.Source, CodeActionKind.OrganizeImports] },
            },
            serverInfo: { name: 'rapydscript-lsp', version: '1.0.0' },
        };
    });
    connection.on_notification('initialized', async function () {
        var registrations = [];
        var ws = client_capabilities.workspace || {};
        if (ws.didChangeConfiguration && ws.didChangeConfiguration.dynamicRegistration) {
            registrations.push({
                id: 'rapydscript-config',
                method: 'workspace/didChangeConfiguration',
                registerOptions: {},
            });
        }
        if (ws.didChangeWatchedFiles && ws.didChangeWatchedFiles.dynamicRegistration) {
            registrations.push({
                id: 'rapydscript-file-watcher',
                method: 'workspace/didChangeWatchedFiles',
                registerOptions: { watchers: [{ globPattern: '**/*.pyj' }] },
            });
        }
        if (registrations.length) {
            try {
                await connection.send_request('client/registerCapability', { registrations: registrations });
            } catch (e) {
                log('client/registerCapability failed: ' + (e && e.message ? e.message : e));
            }
        }
    });
    connection.on_notification('workspace/didChangeWatchedFiles', function () {
        invalidate_workspace_scan(ctx);
    });
    connection.on_notification('workspace/didChangeConfiguration', function (params) {
        var settings = (params && params.settings && params.settings.rapydscript) || {};
        var changed = apply_configuration(ctx, settings);
        if (changed.import_dirs) {
            ctx.docs.all().forEach(function (doc) { schedule_diagnostics(doc.uri); });
        }
    });
    connection.on_request('shutdown', function () { return null; });
    connection.on_notification('exit', function () { process.exit(0); });

    // --- document lifecycle ---
    connection.on_notification('textDocument/didOpen', function (params) {
        var td = params.textDocument;
        ctx.docs.open(td.uri, td.languageId || 'rapydscript', td.version, normalize(td.text));
        invalidate_workspace_scan(ctx);
        schedule_diagnostics(td.uri);
    });
    connection.on_notification('textDocument/didChange', function (params) {
        var doc = ctx.docs.get(params.textDocument.uri);
        if (!doc) return;
        // Full sync: the last content change holds the whole document.
        var changes = params.contentChanges || [];
        if (changes.length) doc.update(normalize(changes[changes.length - 1].text), params.textDocument.version);
        schedule_diagnostics(params.textDocument.uri);
    });
    connection.on_notification('textDocument/didSave', function (params) {
        invalidate_workspace_scan(ctx);
        schedule_diagnostics(params.textDocument.uri);
    });
    connection.on_notification('textDocument/didClose', function (params) {
        ctx.docs.close(params.textDocument.uri);
        delete ctx.analysis_cache[params.textDocument.uri];
        connection.send_notification('textDocument/publishDiagnostics', { uri: params.textDocument.uri, diagnostics: [] });
    });

    // --- helpers to fetch a document's text and an offset from a position ---
    function doc_or_throw(uri) {
        var doc = ctx.docs.get(uri);
        if (!doc) throw ResponseError(ErrorCodes.InvalidParams, 'Unknown document: ' + uri);
        return doc;
    }
    function offset_of(doc, position) { return doc.offset_at(position); }

    // --- feature requests ---
    connection.on_request('textDocument/completion', async function (params) {
        var doc = doc_or_throw(params.textDocument.uri);
        return await completions(ctx, doc.uri, doc.text, offset_of(doc, params.position));
    });
    connection.on_request('textDocument/hover', async function (params) {
        var doc = doc_or_throw(params.textDocument.uri);
        return await hover(ctx, doc.uri, doc.text, offset_of(doc, params.position));
    });
    connection.on_request('textDocument/definition', async function (params) {
        var doc = doc_or_throw(params.textDocument.uri);
        return await definition(ctx, doc.uri, doc.text, offset_of(doc, params.position));
    });
    connection.on_request('textDocument/references', async function (params) {
        var doc = doc_or_throw(params.textDocument.uri);
        return await references(ctx, doc.uri, doc.text, offset_of(doc, params.position), params.context && params.context.includeDeclaration);
    });
    connection.on_request('textDocument/rename', async function (params) {
        var doc = doc_or_throw(params.textDocument.uri);
        return await rename(ctx, doc.uri, doc.text, offset_of(doc, params.position), params.newName);
    });
    connection.on_request('textDocument/formatting', async function (params) {
        var doc = doc_or_throw(params.textDocument.uri);
        return format_document(ctx, doc.text);
    });
    connection.on_request('textDocument/documentSymbol', async function (params) {
        var doc = doc_or_throw(params.textDocument.uri);
        return await document_symbols(ctx, doc.uri, doc.text);
    });
    connection.on_request('textDocument/codeAction', async function (params) {
        var doc = doc_or_throw(params.textDocument.uri);
        var diags = (params.context && params.context.diagnostics) || [];
        return await code_actions(ctx, doc.uri, doc.text, params.range, diags);
    });

    log('RapydScript language server started');
    // Keep the process alive; stdin 'end' means the client disconnected.
    process.stdin.on('end', function () { process.exit(0); });
}
