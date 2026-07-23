/* vim:fileencoding=utf-8
 *
 * fmt.mjs -- A PEP8 style code formatter for RapydScript source code.
 *
 * Copyright (C) 2026 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 *
 * The formatter deliberately does not reuse the compiler's tokenizer because
 * that tokenizer is lossy for a formatter: it decodes string escapes, converts
 * numbers to JavaScript values, turns regexps into RegExp objects, rewrites
 * f-strings by mutating the source buffer and maps operators (and -> &&, is ->
 * === etc.). Instead we use a small, purpose built, loss-less lexer that
 * preserves the exact source lexeme of every token.
 *
 * RapydScript is close to, but not identical to, Python. In particular it
 * supports multi-line anonymous functions, leading-dot call chaining, verbatim
 * JavaScript string/regex literals and newline sensitive blocks. Reformatting
 * these constructs incorrectly would change program semantics, so the formatter
 * is conservative: "complex" logical lines (those containing anonymous
 * functions, block colons that span lines, semicolon inlined blocks, leading
 * dot chains, backslash continuations or multi-line string/regex literals) have
 * their spacing/indentation/quotes normalized but their physical line structure
 * preserved -- they are never reflowed onto a single line nor wrapped.
 */
"use strict";

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { read_pyproject_config } from './ini.mjs';

// ---------------------------------------------------------------------------
// Lexer
// ---------------------------------------------------------------------------

var ATOMS = new Set(['True', 'False', 'None']);
// Keywords that stay keywords (word operators like and/or/not/in/is/new/del are
// classified as operators, mirroring the compiler's tokenizer).
var KEYWORDS = new Set([
    'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'do',
    'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import',
    'nonlocal', 'pass', 'raise', 'return', 'yield', 'try', 'while', 'with',
]);
var WORD_OPS = new Set(['and', 'or', 'not', 'in', 'is', 'new', 'del', 'void', 'typeof', 'instanceof']);
// After these tokens a `/` begins a regular expression rather than division.
var KW_BEFORE_EXPR = new Set(['return', 'yield', 'raise', 'elif', 'else', 'if', 'await', 'in', 'assert', 'while']);
var PUNC_BEFORE_EXPR = new Set(['[', '{', '(', ',', '.', ';', ':']);
var PUNC_CHARS = new Set(['(', ')', '[', ']', '{', '}', ',', ';', ':', '?']);
var STRING_MOD = /^[vrufVRUF]+$/;

// Symbolic operators, ordered longest-first for greedy matching.
var OPERATORS = [
    '>>>=', '>>>', '>>=', '<<=', '//=', '**=', '>>', '<<', '//', '**', '<=',
    '>=', '==', '!=', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '->',
    '~', '+', '-', '*', '/', '%', '<', '>', '=', '&', '|', '^', '@', '!',
];
var OPERATOR_CHARS = new Set('+-*&%=<>!?|~^@/'.split(''));

function is_ws(c) { return c === ' ' || c === '\t' || c === '\f' || c === '\v' || c === ' '; }
function is_digit(c) { return c >= '0' && c <= '9'; }
function is_ident_start(c) {
    if (c === '_' || c === '$') return true;
    var k = c.charCodeAt(0);
    return (k >= 65 && k <= 90) || (k >= 97 && k <= 122) || k > 127;
}
function is_ident_char(c) { return is_ident_start(c) || is_digit(c); }

function FormatError(message, line) {
    var e = new Error(message + (line ? ' (line ' + line + ')' : ''));
    e.is_format_error = true;
    return e;
}

function lex(text) {
    var n = text.length;
    var pos = 0, line = 1;
    var toks = [];
    var prev_sig = null;  // previous non-comment token, for regex/kind decisions

    function regex_allowed() {
        if (!prev_sig) return true;
        if (prev_sig.type === 'op') return true;
        if (prev_sig.type === 'keyword' && KW_BEFORE_EXPR.has(prev_sig.value)) return true;
        if (prev_sig.type === 'punc' && PUNC_BEFORE_EXPR.has(prev_sig.value)) return true;
        return false;
    }

    function consume_ws() {
        var nlb = 0, had_ws = false, cont = false;
        while (pos < n) {
            var c = text[pos];
            if (c === '\\' && text[pos + 1] === '\n') { pos += 2; line++; nlb++; cont = true; continue; }
            if (c === '\n') { nlb++; line++; pos++; had_ws = true; continue; }
            if (is_ws(c)) { had_ws = true; pos++; continue; }
            break;
        }
        // Leading whitespace of the current physical line.
        var ls = pos;
        while (ls > 0 && text[ls - 1] !== '\n') ls--;
        var ie = ls;
        while (ie < n && is_ws(text[ie])) ie++;
        return { nlb: nlb, sp: (had_ws && nlb === 0), cont: cont, indent: text.slice(ls, ie) };
    }

    function read_string_body(qpos) {
        // qpos points at the opening quote (prefix already consumed). Advances pos
        // past the closing quote and returns nothing; caller slices the lexeme.
        var q = text[qpos];
        if (text[qpos + 1] === q && text[qpos + 2] === q) {
            pos = qpos + 3;
            while (pos < n) {
                if (text[pos] === '\\') { pos += 2; continue; }
                if (text[pos] === q && text[pos + 1] === q && text[pos + 2] === q) { pos += 3; return; }
                if (text[pos] === '\n') line++;
                pos++;
            }
            throw FormatError('Unterminated triple-quoted string', line);
        }
        pos = qpos + 1;
        while (pos < n) {
            var c = text[pos];
            if (c === '\\') { pos += 2; continue; }
            if (c === q) { pos++; return; }
            if (c === '\n') throw FormatError('End of line while scanning string literal', line);
            pos++;
        }
        throw FormatError('Unterminated string', line);
    }

    function read_regexp() {
        var start = pos;
        pos++;  // first '/'
        if (text[pos] === '/') {
            pos++;
            if (text[pos] === '/') {
                pos++;  // verbose ///.../// regex
                while (pos < n) {
                    if (text[pos] === '\\') { pos += 2; continue; }
                    if (text[pos] === '/' && text[pos + 1] === '/' && text[pos + 2] === '/') { pos += 3; break; }
                    if (text[pos] === '\n') line++;
                    pos++;
                }
            }
            // else: empty regexp //, nothing more to read before modifiers
        } else {
            var in_class = false;
            while (pos < n) {
                var c = text[pos];
                if (c === '\\') { pos += 2; continue; }
                if (c === '[') { in_class = true; pos++; continue; }
                if (c === ']' && in_class) { in_class = false; pos++; continue; }
                if (c === '/' && !in_class) { pos++; break; }
                if (c === '\n') { throw FormatError('Unterminated regular expression', line); }
                pos++;
            }
        }
        while (pos < n && /[a-zA-Z]/.test(text[pos])) pos++;
        return text.slice(start, pos);
    }

    function read_number(from_dot) {
        var start = pos;
        if (!from_dot && text[pos] === '0' && (text[pos + 1] === 'x' || text[pos + 1] === 'X')) {
            pos += 2;
            while (pos < n && /[0-9a-fA-F]/.test(text[pos])) pos++;
        } else if (!from_dot && text[pos] === '0' && (text[pos + 1] === 'b' || text[pos + 1] === 'B')) {
            pos += 2;
            while (pos < n && (text[pos] === '0' || text[pos] === '1')) pos++;
        } else {
            if (from_dot) { pos++; while (pos < n && is_digit(text[pos])) pos++; }
            else {
                while (pos < n && is_digit(text[pos])) pos++;
                if (text[pos] === '.') { pos++; while (pos < n && is_digit(text[pos])) pos++; }
            }
            if (text[pos] === 'e' || text[pos] === 'E') {
                pos++;
                if (text[pos] === '+' || text[pos] === '-') pos++;
                while (pos < n && is_digit(text[pos])) pos++;
            }
        }
        return text.slice(start, pos);
    }

    function match_operator() {
        for (var i = 0; i < OPERATORS.length; i++) {
            if (text.startsWith(OPERATORS[i], pos)) return OPERATORS[i];
        }
        return text[pos];
    }

    function push(type, value, ws) {
        var t = {
            type: type, value: value, nlb: ws.nlb, sp: ws.sp, cont: ws.cont,
            line_indent: ws.indent, line: line,
        };
        toks.push(t);
        if (type !== 'comment' && type !== 'shebang') prev_sig = t;
        return t;
    }

    while (pos < n) {
        var ws = consume_ws();
        if (pos >= n) break;
        var c = text[pos];

        if (c === '#') {
            var c_start = pos;
            var eol = text.indexOf('\n', pos);
            if (eol === -1) eol = n;
            var raw = text.slice(pos, eol);
            pos = eol;
            if (c_start === 0 && raw[1] === '!') push('shebang', raw, ws);
            else push('comment', raw, ws);
            continue;
        }
        if (c === '"' || c === "'") {
            var s = pos;
            read_string_body(pos);
            push('string', text.slice(s, pos), ws);
            continue;
        }
        if (is_ident_start(c)) {
            var ws_start = pos;
            while (pos < n && is_ident_char(text[pos])) pos++;
            var word = text.slice(ws_start, pos);
            if (STRING_MOD.test(word) && (text[pos] === '"' || text[pos] === "'")) {
                var qpos = pos;
                read_string_body(pos);
                push('string', word + text.slice(qpos, pos), ws);
                continue;
            }
            if (ATOMS.has(word)) push('atom', word, ws);
            else if (WORD_OPS.has(word)) push('op', word, ws);
            else if (KEYWORDS.has(word)) push('keyword', word, ws);
            else push('name', word, ws);
            continue;
        }
        if (is_digit(c)) { push('number', read_number(false), ws); continue; }
        if (c === '.') {
            if (is_digit(text[pos + 1])) { push('number', read_number(true), ws); continue; }
            pos++; push('punc', '.', ws); continue;
        }
        if (c === '/') {
            if (regex_allowed()) { push('regexp', read_regexp(), ws); continue; }
            var op = match_operator(); pos += op.length; push('op', op, ws); continue;
        }
        if (PUNC_CHARS.has(c)) { pos++; push('punc', c, ws); continue; }
        if (OPERATOR_CHARS.has(c)) { var op2 = match_operator(); pos += op2.length; push('op', op2, ws); continue; }
        throw FormatError('Unexpected character «' + c + '»', line);
    }

    push('eof', '', { nlb: 0, sp: false, cont: false, indent: '' });
    return toks;
}

// ---------------------------------------------------------------------------
// Token rendering (spacing engine)
// ---------------------------------------------------------------------------

function is_operand(p) {
    if (!p) return false;
    if (p.type === 'name' || p.type === 'number' || p.type === 'string' || p.type === 'atom' || p.type === 'regexp') return true;
    return p.value === ')' || p.value === ']' || p.value === '}';
}

function is_call_paren(p) {
    if (!p) return false;
    if (p.type === 'name' || p.type === 'string' || p.type === 'atom') return true;
    return p.value === ')' || p.value === ']' || p.value === '}';
}

function is_index_bracket(p) {
    if (!p) return false;
    if (p.type === 'name' || p.type === 'string' || p.type === 'number' || p.type === 'atom') return true;
    return p.value === ')' || p.value === ']' || p.value === '}';
}

function is_unary_here(p, t) {
    if (t.type === 'op') {
        var v = t.value;
        if (v === '+' || v === '-' || v === '~' || v === '*' || v === '**') return !is_operand(p);
        if (v === '@' && p === null) return true;
    }
    return false;
}

function separator(p, t, stack, prev_was_unary, sig_count, first_at) {
    var pv = p.value, tv = t.value, pty = p.type, tty = t.type;
    var top = stack.length ? stack[stack.length - 1] : null;
    if (pty === 'punc' && (pv === '(' || pv === '[' || pv === '{')) return false;
    if (tty === 'punc' && (tv === ')' || tv === ']' || tv === '}')) return false;
    if (tv === ',' || tv === ';') return false;
    if (tv === '.' || pv === '.') return false;
    if (tv === '?' || pv === '?') return !!t.sp;   // existential: preserve source spacing
    if (tv === ':') return false;
    if (pv === ':') { if (top && top.kind === 'index') return false; return true; }
    if (pv === '@' && first_at && sig_count === 1) return false;  // decorator
    if (tv === '(' && is_call_paren(p)) return false;
    if (tv === '[' && is_index_bracket(p)) return false;
    if ((tv === '=' || pv === '=') && top && top.kind === 'call' && !top.in_def_body) return false;  // kwarg / default
    if (prev_was_unary) return false;
    return true;
}

function format_comment(raw) {
    var m = raw.match(/^#+/)[0];
    var rest = raw.slice(m.length).replace(/\s+$/, '');
    if (rest === '') return m;
    if (rest[0] !== ' ' && rest[0] !== '!') rest = ' ' + rest;
    return m + rest;
}

function normalize_quotes(lex_val, preferred) {
    var i = 0;
    while (i < lex_val.length && /[vrufVRUF]/.test(lex_val[i])) i++;
    var prefix = lex_val.slice(0, i);
    var q = lex_val[i];
    if (q !== "'" && q !== '"') return lex_val;
    var lower = prefix.toLowerCase();
    if (lower.indexOf('v') >= 0 || lower.indexOf('r') >= 0 || lower.indexOf('f') >= 0) return lex_val;
    if (lex_val[i + 1] === q && lex_val[i + 2] === q) return lex_val;  // triple-quoted: leave as-is
    var target = preferred;
    if (q === target) return lex_val;
    var body = lex_val.slice(i + 1, lex_val.length - 1);
    var nb = '', j = 0;
    while (j < body.length) {
        var c = body[j];
        if (c === '\\' && j + 1 < body.length) {
            var nx = body[j + 1];
            if (nx === q) { nb += q; j += 2; continue; }  // escaped old quote -> unescape
            nb += '\\' + nx; j += 2; continue;
        }
        if (c === target) { nb += '\\' + target; j++; continue; }  // must escape target
        nb += c; j++;
    }
    var count = function (s) { var k = 0; for (var x = 0; x < s.length; x++) if (s[x] === '\\') k++; return k; };
    if (count(nb) > count(body)) return lex_val;  // don't increase escapes
    return prefix + target + nb + target;
}

function token_text(t, opts) {
    if (t.type === 'string') return normalize_quotes(t.value, opts.preferred);
    return t.value;
}

// Render a list of tokens to a string. When honor_breaks is true, source line
// breaks (nlb>0) are preserved as newlines + re-based indentation; otherwise
// everything is emitted on one line (reflow).
function render(toks, honor_breaks, src_base, new_base, opts, initial_stack) {
    var out = '';
    var stack = initial_stack ? initial_stack.slice() : [];
    var prev_sig = null, prev_was_unary = false, sig_count = 0, first_at = false;
    // after_def: true after seeing 'def' (and optionally a function name), so the
    // next '(' can be identified as the def's parameter list.
    // prev_closed_def_params: true when we just popped a def parameter list ')'.
    // When the very next ':' is seen we mark the enclosing stack frame in_def_body
    // so that '=' tokens inside the body are not suppressed as kwargs.
    var after_def = false, prev_closed_def_params = false;
    for (var k = 0; k < toks.length; k++) {
        var t = toks[k];
        var did_break = false;
        if (k > 0 && honor_breaks && t.nlb > 0) {
            out += (t.cont ? ' \\\n' : '\n');
            var li = t.line_indent || '';
            // Rebase indentation that shares the statement's base prefix; preserve
            // dedented continuation lines verbatim (e.g. a leading-dot line that
            // binds to an outer block, or a `.while` clause of a do/while loop).
            if (li.startsWith(src_base)) out += new_base + li.slice(src_base.length);
            else out += li;
            did_break = true;
        }
        if (t.type === 'comment' || t.type === 'shebang') {
            var ctext = (t.type === 'shebang') ? t.value : format_comment(t.value);
            if (k === 0 || did_break) out += ctext;
            else out += '  ' + ctext;
            continue;
        }
        if (k > 0 && !did_break && prev_sig !== null) {
            if (separator(prev_sig, t, stack, prev_was_unary, sig_count, first_at)) out += ' ';
        }
        out += token_text(t, opts);
        prev_was_unary = is_unary_here(prev_sig, t);
        if (t.type === 'punc') {
            if (t.value === '(') {
                stack.push({ kind: is_call_paren(prev_sig) ? 'call' : 'group', is_def_params: after_def });
                after_def = false; prev_closed_def_params = false;
            } else if (t.value === '[') {
                stack.push({ kind: is_index_bracket(prev_sig) ? 'index' : 'list' });
                after_def = false; prev_closed_def_params = false;
            } else if (t.value === '{') {
                stack.push({ kind: 'dict' });
                after_def = false; prev_closed_def_params = false;
            } else if (t.value === ')' || t.value === ']' || t.value === '}') {
                var popped = stack.length ? stack.pop() : null;
                prev_closed_def_params = !!(popped && popped.is_def_params);
                after_def = false;
            } else if (t.value === ':') {
                if (prev_closed_def_params && stack.length > 0) {
                    // Only mark in_def_body for multi-line def bodies. For inline
                    // defs (def():stmt; inside a call), the body is on the same
                    // line and subsequent same-depth tokens are still kwargs.
                    var next_is_newline = false;
                    for (var nk = k + 1; nk < toks.length; nk++) {
                        if (toks[nk].type === 'eof') break;
                        if (toks[nk].type !== 'comment' && toks[nk].type !== 'shebang') {
                            next_is_newline = toks[nk].nlb > 0; break;
                        }
                    }
                    if (next_is_newline) stack[stack.length - 1].in_def_body = true;
                }
                prev_closed_def_params = false; after_def = false;
            } else {
                after_def = false; prev_closed_def_params = false;
            }
        } else if (t.type === 'keyword' && t.value === 'def') {
            after_def = true; prev_closed_def_params = false;
        } else if (after_def && t.type === 'name') {
            prev_closed_def_params = false;  // named def: keep after_def for next '('
        } else {
            after_def = false; prev_closed_def_params = false;
        }
        if (sig_count === 0 && t.value === '@' && t.type === 'op') first_at = true;
        prev_sig = t; sig_count++;
    }
    return out;
}

// ---------------------------------------------------------------------------
// Line wrapping (conservative)
// ---------------------------------------------------------------------------

function wrap_line(code, level, opts) {
    // Locate the top-level (depth 0 -> 1) bracket group with commas and the
    // largest span, then explode it across multiple lines with hanging indent.
    var depth = 0, open_stack = [], groups = [];
    for (var i = 0; i < code.length; i++) {
        var v = code[i].value, ty = code[i].type;
        if (ty === 'punc' && (v === '(' || v === '[' || v === '{')) { if (depth === 0) open_stack.push({ open: i, ch: v }); depth++; }
        else if (ty === 'punc' && (v === ')' || v === ']' || v === '}')) { depth--; if (depth === 0 && open_stack.length) { var g = open_stack.pop(); g.close = i; groups.push(g); } }
    }
    var best = null;
    for (var gi = 0; gi < groups.length; gi++) {
        var grp = groups[gi];
        if (grp.close === undefined) continue;
        var d = 0, has_comma = false, is_comprehension = false;
        for (var x = grp.open + 1; x < grp.close; x++) {
            var vv = code[x].value, tt = code[x].type;
            if (tt === 'punc' && (vv === '(' || vv === '[' || vv === '{')) d++;
            else if (tt === 'punc' && (vv === ')' || vv === ']' || vv === '}')) d--;
            else if (d === 0 && tt === 'punc' && vv === ',') has_comma = true;
            else if (d === 0 && tt === 'keyword' && vv === 'for') is_comprehension = true;
        }
        // In a comprehension/generator the top-level commas are tuple unpacking,
        // not element separators, so it is not safe to explode on them.
        if (!has_comma || is_comprehension) continue;
        var span = grp.close - grp.open;
        if (!best || span > best.span) best = { open: grp.open, close: grp.close, ch: grp.ch, span: span };
    }
    if (!best) return null;

    var base_indent = ' '.repeat(4 * level);
    var child_indent = ' '.repeat(4 * (level + 1));
    var open_ch = best.ch;
    var seed_kind = (open_ch === '(') ? (is_call_paren(best.open > 0 ? code[best.open - 1] : null) ? 'call' : 'group')
        : (open_ch === '[') ? (is_index_bracket(best.open > 0 ? code[best.open - 1] : null) ? 'index' : 'list')
            : 'dict';

    var head = code.slice(0, best.open + 1);
    var head_str = base_indent + render(head, false, '', base_indent, opts);

    var inner = code.slice(best.open + 1, best.close);
    var elems = [], cur = [], dd = 0;
    for (var y = 0; y < inner.length; y++) {
        var tk = inner[y], iv = tk.value, it = tk.type;
        if (it === 'punc' && (iv === '(' || iv === '[' || iv === '{')) { dd++; cur.push(tk); }
        else if (it === 'punc' && (iv === ')' || iv === ']' || iv === '}')) { dd--; cur.push(tk); }
        else if (dd === 0 && it === 'punc' && iv === ',') { elems.push(cur); cur = []; }
        else cur.push(tk);
    }
    if (cur.length) elems.push(cur);
    elems = elems.filter(function (e) { return e.length; });
    if (!elems.length) return null;

    var elem_lines = elems.map(function (e) { return child_indent + render(e, false, '', child_indent, opts, [{ kind: seed_kind }]); });
    var body = elem_lines.join(',\n');
    if (open_ch === '[' || open_ch === '{') body += ',';  // magic trailing comma for literals only

    var tail = code.slice(best.close);
    var tail_str = base_indent + render(tail, false, '', base_indent, opts);
    return head_str + '\n' + body + '\n' + tail_str;
}

// ---------------------------------------------------------------------------
// Grouping into logical lines / elements
// ---------------------------------------------------------------------------

function make_stmt(tokens) {
    var sig = tokens.filter(function (t) { return t.type !== 'comment' && t.type !== 'shebang'; });
    var first_sig = sig[0], last_sig = sig[sig.length - 1];
    var has_def_or_class = sig.some(function (t) { return t.type === 'keyword' && (t.value === 'def' || t.value === 'class'); });
    var has_semicolon = sig.some(function (t) { return t.value === ';'; });
    // A logical line that starts with `.` or that contains a physical line
    // beginning with `.` is a leading-dot chain (or a do/while `.while` clause).
    // These bind to an outer block by indentation, so we preserve their layout.
    var leading_dot = (first_sig && first_sig.value === '.') ||
        tokens.some(function (t, i) { return i > 0 && t.nlb > 0 && t.type === 'punc' && t.value === '.'; });
    var used_backslash = tokens.some(function (t) { return t.cont; });
    var multi_physical = tokens.some(function (t, i) { return i > 0 && t.nlb > 0; });
    var colon_then_newline = false;
    for (var i = 0; i < tokens.length - 1; i++) { if (tokens[i].value === ':' && tokens[i + 1].nlb > 0) { colon_then_newline = true; break; } }
    var has_multiline_token = tokens.some(function (t) { return typeof t.value === 'string' && t.value.indexOf('\n') >= 0; });
    var interior_comment = false;
    for (var j = 0; j < tokens.length; j++) {
        if (tokens[j].type === 'comment') {
            if (j < tokens.length - 1) interior_comment = true;
            else if (tokens[j].nlb > 0) interior_comment = true;
        }
    }
    var complex = leading_dot || used_backslash || interior_comment || has_def_or_class ||
        has_semicolon || has_multiline_token || (multi_physical && colon_then_newline);

    var inline_body_colon = false, d = 0;
    for (var s = 0; s < sig.length; s++) {
        var v = sig[s].value, ty = sig[s].type;
        if (ty === 'punc' && (v === '(' || v === '[' || v === '{')) d++;
        else if (ty === 'punc' && (v === ')' || v === ']' || v === '}')) d--;
        else if (d === 0 && v === ':' && s < sig.length - 1) inline_body_colon = true;
    }
    var wrappable = !complex && !has_def_or_class && !has_semicolon && !inline_body_colon;
    var is_def_like = first_sig && ((first_sig.type === 'keyword' && (first_sig.value === 'def' || first_sig.value === 'class')) || first_sig.value === 'async');
    var is_decorator = first_sig && first_sig.value === '@';
    var ends_block = last_sig && last_sig.value === ':';
    return {
        kind: 'stmt', tokens: tokens, indent: tokens[0].line_indent || '',
        blank_before: Math.max(0, tokens[0].nlb - 1), complex: complex, wrappable: wrappable,
        is_def_like: !!is_def_like, is_decorator: !!is_decorator, ends_block: !!ends_block, level: 0,
    };
}

function group(toks) {
    var elements = [];
    var cur = [], depth = 0;
    function flush() { if (cur.length) { elements.push(make_stmt(cur)); cur = []; } }
    for (var k = 0; k < toks.length; k++) {
        var t = toks[k];
        if (t.type === 'eof') break;
        var is_boundary = depth === 0 && cur.length > 0 && t.nlb > 0 && !t.cont && !(t.value === '.' && t.type === 'punc');
        if (is_boundary) flush();
        if (depth === 0 && cur.length === 0 && (t.type === 'comment' || t.type === 'shebang') && (t.nlb > 0 || k === 0)) {
            elements.push({
                kind: 'comment', value: t.value, is_shebang: t.type === 'shebang',
                indent: t.line_indent || '', blank_before: (k === 0 ? 0 : Math.max(0, t.nlb - 1)),
                level: 0, ends_block: false,
            });
            continue;
        }
        cur.push(t);
        if (t.type === 'punc') {
            if (t.value === '(' || t.value === '[' || t.value === '{') depth++;
            else if (t.value === ')' || t.value === ']' || t.value === '}') depth = Math.max(0, depth - 1);
        }
    }
    flush();
    return elements;
}

function compute_levels(elements) {
    var stack = [{ w: -1 }];
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        if (el.kind !== 'stmt') continue;
        var w = el.indent.length;
        if (w > stack[stack.length - 1].w) stack.push({ w: w });
        else {
            while (stack.length > 1 && w < stack[stack.length - 1].w) stack.pop();
            if (w > stack[stack.length - 1].w) stack.push({ w: w });
        }
        el.level = stack.length - 2;
        if (el.level < 0) el.level = 0;
    }
    // Comments take the level of the following statement (or the previous one at EOF).
    for (var c = 0; c < elements.length; c++) {
        if (elements[c].kind !== 'comment') continue;
        var lvl = null;
        for (var f = c + 1; f < elements.length; f++) { if (elements[f].kind === 'stmt') { lvl = elements[f].level; break; } }
        if (lvl === null) { for (var b = c - 1; b >= 0; b--) { if (elements[b].kind === 'stmt') { lvl = elements[b].level; break; } } }
        elements[c].level = lvl === null ? 0 : lvl;
    }
}

// ---------------------------------------------------------------------------
// Blank line policy helpers
// ---------------------------------------------------------------------------

function leads_def(elements, idx) {
    var j = idx;
    while (j < elements.length) {
        var e = elements[j];
        if (e.kind === 'comment') {
            if (j + 1 < elements.length && elements[j + 1].blank_before === 0) { j++; continue; }
            return false;
        }
        if (e.kind === 'stmt') {
            if (e.is_decorator) { if (j + 1 < elements.length && elements[j + 1].blank_before === 0) { j++; continue; } return false; }
            return !!e.is_def_like;
        }
        return false;
    }
    return false;
}

function is_visual_def_start(elements, idx) {
    if (!leads_def(elements, idx)) return false;
    if (idx === 0) return true;
    var prev = elements[idx - 1], el = elements[idx];
    if (el.blank_before === 0 && (prev.kind === 'comment' || (prev.kind === 'stmt' && prev.is_decorator))) return false;
    return true;
}

// ---------------------------------------------------------------------------
// Import organization: __python__ group first, then stdlib group, then other group
// ---------------------------------------------------------------------------

// Stdlib module list is generated by self.mjs into dev/stdlib_modules.json by
// reading src/lib/. Fall back to reading src/lib/ directly when the generated
// file is absent (e.g. running straight from the release/ tree).
var STDLIB_MODULES = (function () {
    try {
        return new Set(JSON.parse(fs.readFileSync(
            new URL('../dev/stdlib_modules.json', import.meta.url), 'utf-8')));
    } catch (e) { /* generated file absent; fall through */ }
    try {
        return new Set(fs.readdirSync(fileURLToPath(new URL('../src/lib/', import.meta.url)))
            .filter(function (n) { return n.slice(-4) === '.pyj'; })
            .map(function (n) { return n.slice(0, -4); }));
    } catch (e) { return new Set(); }
}());

function is_import_stmt(el) {
    if (el.kind !== 'stmt') return false;
    var sig = el.tokens.filter(function (t) { return t.type !== 'comment'; });
    if (!sig.length) return false;
    return sig[0].type === 'keyword' && (sig[0].value === 'import' || sig[0].value === 'from');
}

function is_python_builtin_import(el) {
    var sig = el.tokens.filter(function (t) { return t.type !== 'comment'; });
    if (sig.length < 3) return false;
    return sig[0].type === 'keyword' && sig[0].value === 'from' &&
           sig[1].type === 'name' && sig[1].value === '__python__' &&
           sig[2].type === 'keyword' && sig[2].value === 'import';
}

function import_top_module(el) {
    var sig = el.tokens.filter(function (t) { return t.type !== 'comment'; });
    var i = 1;  // skip leading 'import' or 'from'
    while (i < sig.length && sig[i].type === 'punc' && sig[i].value === '.') i++;  // skip relative dots
    if (i < sig.length && sig[i].type === 'name') return sig[i].value;
    return '';
}

// Returns a string sort key: '0\0<module>\0' for 'import X', '1\0<module>\0<names>' for 'from X import Y'.
// This puts bare imports before from-imports (isort convention), then sorts alphabetically.
function import_sort_key(el) {
    var sig = el.tokens.filter(function (t) { return t.type !== 'comment'; });
    if (!sig.length) return '2\0\0';
    var is_from = sig[0].value === 'from';
    var i = 1, dots = '', mod_parts = [];
    while (i < sig.length && sig[i].type === 'punc' && sig[i].value === '.') { dots += '.'; i++; }
    while (i < sig.length && !(sig[i].type === 'keyword' && sig[i].value === 'import')) {
        if (sig[i].type === 'name') mod_parts.push(sig[i].value);
        i++;
    }
    var mod = (dots + mod_parts.join('.')).toLowerCase();
    if (!is_from) return '0\0' + mod + '\0';
    i++;  // skip 'import' keyword
    var names = [];
    while (i < sig.length) { if (sig[i].type === 'name') names.push(sig[i].value.toLowerCase()); i++; }
    return '1\0' + mod + '\0' + names.join(',');
}

function organize_import_elements(elements) {
    // Identify the contiguous top-level import block: from the first level-0 import
    // statement to the last, stopping at the first level-0 non-import statement.
    var block_start = -1, block_end = -1;
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        if (el.kind !== 'stmt' || el.level !== 0) continue;
        if (is_import_stmt(el)) {
            if (block_start < 0) block_start = i;
            block_end = i;
        } else {
            if (block_start >= 0) break;
        }
    }
    if (block_start < 0) return elements;

    var block = elements.slice(block_start, block_end + 1);
    var imports = [], leading_comments = [], seen_import = false;
    for (var j = 0; j < block.length; j++) {
        var bel = block[j];
        if (bel.kind === 'stmt') { seen_import = true; imports.push(bel); }
        else if (bel.kind === 'comment' && !seen_import) leading_comments.push(bel);
        // Comments after the first import are dropped (import organizers conventionally do this).
    }
    if (!imports.length) return elements;

    var python = [], stdlib = [], other = [];
    for (var k = 0; k < imports.length; k++) {
        if (is_python_builtin_import(imports[k])) python.push(imports[k]);
        else if (STDLIB_MODULES.has(import_top_module(imports[k]))) stdlib.push(imports[k]);
        else other.push(imports[k]);
    }
    function cmp(a, b) { var ka = import_sort_key(a), kb = import_sort_key(b); return ka < kb ? -1 : ka > kb ? 1 : 0; }
    python.sort(cmp);
    stdlib.sort(cmp);
    other.sort(cmp);

    var new_block = [], first_blank = block[0].blank_before || 0;
    for (var lc = 0; lc < leading_comments.length; lc++) {
        var cm = Object.assign({}, leading_comments[lc]);
        if (lc === 0) cm.blank_before = first_blank;
        new_block.push(cm);
        first_blank = 0;
    }
    for (var p = 0; p < python.length; p++) {
        var pi = Object.assign({}, python[p]);
        pi.blank_before = (p === 0) ? first_blank : 0;
        new_block.push(pi);
        first_blank = 0;
    }
    var has_python = python.length > 0;
    for (var s = 0; s < stdlib.length; s++) {
        var si = Object.assign({}, stdlib[s]);
        si.blank_before = (s === 0 && has_python) ? 1 : (s === 0 ? first_blank : 0);
        new_block.push(si);
        first_blank = 0;
    }
    var has_stdlib_or_python = stdlib.length > 0 || has_python;
    for (var o = 0; o < other.length; o++) {
        var oi = Object.assign({}, other[o]);
        oi.blank_before = (o === 0 && has_stdlib_or_python) ? 1 : (o === 0 ? first_blank : 0);
        new_block.push(oi);
    }
    return elements.slice(0, block_start).concat(new_block).concat(elements.slice(block_end + 1));
}

// ---------------------------------------------------------------------------
// Element rendering + assembly
// ---------------------------------------------------------------------------

function render_stmt(el, opts) {
    var base_indent = ' '.repeat(4 * el.level);
    if (el.complex) {
        return base_indent + render(el.tokens, true, el.indent, base_indent, opts);
    }
    var comment = null, code = el.tokens;
    if (code.length && code[code.length - 1].type === 'comment') { comment = code[code.length - 1]; code = code.slice(0, -1); }
    var comment_str = comment ? '  ' + format_comment(comment.value) : '';
    if (!opts.join_lines) {
        // Preserve source line breaks unless a resulting line exceeds the limit,
        // in which case fall through to the collapse+wrap path below.
        var preserved = base_indent + render(code, true, el.indent, base_indent, opts);
        var preserved_full = preserved + comment_str;
        var plines = preserved_full.split('\n');
        var fits = true;
        for (var pi = 0; pi < plines.length; pi++) {
            if (plines[pi].length > opts.line_length) { fits = false; break; }
        }
        if (fits) return preserved_full;
    }
    var line = render(code, false, el.indent, base_indent, opts);
    var full = base_indent + line;
    if ((full.length + comment_str.length) > opts.line_length && el.wrappable) {
        var wrapped = wrap_line(code, el.level, opts);
        if (wrapped !== null) return comment_str ? wrapped + comment_str : wrapped;
    }
    return full + comment_str;
}

function render_elements(elements, opts) {
    var result = '';
    for (var idx = 0; idx < elements.length; idx++) {
        var el = elements[idx];
        var etext = (el.kind === 'comment')
            ? (' '.repeat(4 * el.level) + (el.is_shebang ? el.value : format_comment(el.value)))
            : render_stmt(el, opts);
        var blanks = 0;
        if (idx > 0) {
            var prev = elements[idx - 1];
            var cap = (el.level === 0) ? 2 : 1;
            blanks = Math.min(el.blank_before, cap);
            if (prev.ends_block) blanks = 0;
            if (is_visual_def_start(elements, idx)) {
                var req = (el.level === 0) ? 2 : 1;
                if (!prev.ends_block) blanks = Math.max(blanks, req);
            }
        }
        if (idx === 0) result += etext;
        else result += '\n' + '\n'.repeat(blanks) + etext;
    }
    if (result === '') return '';
    return result + '\n';
}

export function format_string(src, options) {
    var opts = normalize_opts(options);
    var text = src.replace(/\r\n?/g, '\n');
    var toks = lex(text);
    var elements = group(toks);
    compute_levels(elements);
    elements = organize_import_elements(elements);
    return render_elements(elements, opts);
}

export function organize_imports(src, options) {
    var opts = normalize_opts(options);
    var text = src.replace(/\r\n?/g, '\n');
    var toks = lex(text);
    var elements = group(toks);
    compute_levels(elements);
    elements = organize_import_elements(elements);
    return render_elements(elements, opts);
}

function normalize_opts(options) {
    options = options || {};
    var ll = options.line_length;
    if (typeof ll === 'string') ll = parseInt(ll, 10);
    if (!ll || isNaN(ll) || ll < 1) ll = 80;
    var pref = options.preferred;
    if (!pref) {
        var pq = options.preferred_quote;
        pref = (pq === 'double' || pq === '"') ? '"' : "'";
    }
    return { line_length: ll, preferred: pref, join_lines: !!options.join_lines };
}

// ---------------------------------------------------------------------------
// check-only reporting
// ---------------------------------------------------------------------------

export function check_report(file, src, formatted, options) {
    var opts = normalize_opts(options);
    var errs = [];
    if (formatted !== src.replace(/\r\n?/g, '\n')) errs.push(file + ': would be reformatted');
    var lines = formatted.split('\n');
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].length > opts.line_length) {
            errs.push(file + ':' + (i + 1) + ': line exceeds ' + opts.line_length + ' characters (' + lines[i].length + ')');
        }
    }
    return errs;
}

// ---------------------------------------------------------------------------
// File collection + CLI
// ---------------------------------------------------------------------------

export async function collect_pyj_files(inputs) {
    var files = [];
    async function walk(list, from_dir) {
        for (var i = 0; i < list.length; i++) {
            var f = list[i];
            var st;
            try { st = await fs.promises.lstat(f); }
            catch (e) {
                if (from_dir && (e.code === 'EACCES' || e.code === 'EPERM')) continue;
                throw new Error("can't access: " + f);
            }
            if (st.isDirectory()) {
                var children;
                try {
                    children = (await fs.promises.readdir(f)).sort().map(function (x) { return path.join(f, x); });
                } catch (e) {
                    if (from_dir && (e.code === 'EACCES' || e.code === 'EPERM')) continue;
                    throw new Error("can't read directory: " + f);
                }
                await walk(children, true);
            } else if (st.isFile()) {
                if (from_dir) { if (f.endsWith('.pyj')) files.push(f); }
                else files.push(f);
            }
        }
    }
    await walk(inputs, false);
    return files;
}

async function read_stdin() {
    var chunks = [];
    process.stdin.setEncoding('utf-8');
    await new Promise(function (resolve, reject) {
        process.stdin.on('data', function (chunk) { chunks.push(chunk); });
        process.stdin.on('end', resolve);
        process.stdin.on('error', reject);
    });
    return chunks.join('');
}

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

    var opts = normalize_opts({ line_length: effective_ll, preferred_quote: effective_quote, join_lines: argv.join_lines });
    var inputs = (argv.files || []).slice();

    if (inputs.length === 0) {
        var src = await read_stdin();
        var out;
        try { out = format_string(src, opts); }
        catch (e) { console.error('Error formatting stdin: ' + (e.message || e)); process.exit(2); }
        process.stdout.write(out);
        process.exit(0);
    }

    var files;
    try { files = await collect_pyj_files(inputs); }
    catch (e) { console.error('ERROR: ' + (e.message || e)); process.exit(2); }

    var had_errors = false;
    for (var i = 0; i < files.length; i++) {
        var f = files[i];
        var code;
        try { code = await fs.promises.readFile(f, 'utf-8'); }
        catch (e) { console.error("ERROR: can't read file: " + f); process.exit(2); }
        var formatted;
        try { formatted = format_string(code, opts); }
        catch (e) { console.error(f + ': ' + (e.message || e)); had_errors = true; continue; }
        if (argv.check_only) {
            var errs = check_report(f, code, formatted, opts);
            if (errs.length) { had_errors = true; errs.forEach(function (m) { console.error(m); }); }
        } else if (formatted !== code.replace(/\r\n?/g, '\n')) {
            try { await fs.promises.writeFile(f, formatted); }
            catch (e) { console.error("ERROR: can't write file: " + f); process.exit(2); }
            console.log('reformatted ' + f);
        }
    }
    process.exit(had_errors ? 1 : 0);
}
