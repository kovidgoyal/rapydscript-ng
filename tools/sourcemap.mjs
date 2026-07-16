/*
 * sourcemap.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */
"use strict";

import path from 'path';

// Base64 VLQ encoding for source maps (see http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
var BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var VLQ_BASE_SHIFT = 5;
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;          // 32
var VLQ_BASE_MASK = VLQ_BASE - 1;             // 31
var VLQ_CONTINUATION_BIT = VLQ_BASE;          // 32

function to_vlq_signed(value) {
    return (value < 0) ? ((-value) << 1) + 1 : (value << 1);
}

function encode_vlq(value) {
    var encoded = '';
    var vlq = to_vlq_signed(value);
    do {
        var digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) digit |= VLQ_CONTINUATION_BIT;
        encoded += BASE64_CHARS[digit];
    } while (vlq > 0);
    return encoded;
}

function encode_segment(fields) {
    return fields.map(encode_vlq).join('');
}

// Generate a source map JSON object from an array of segments.
// Each segment is: [gen_line_0based, gen_col, src_file, src_line_0based, src_col]
// output_file: the name of the generated JS file
// source_root: optional prefix for source paths
function generate_source_map(segments, output_file, source_root) {
    if (!segments || !segments.length) {
        return JSON.stringify({
            version: 3,
            file: output_file || '',
            sourceRoot: source_root || '',
            sources: [],
            names: [],
            mappings: ''
        });
    }

    // Build sources index
    var sources_index = {};
    var sources = [];
    segments.forEach(function(seg) {
        var src = seg[2];
        if (src && !(src in sources_index)) {
            sources_index[src] = sources.length;
            sources.push(src);
        }
    });

    // Sort segments by generated position
    var sorted = segments.slice().sort(function(a, b) {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });

    // Remove duplicate segments at the same generated position
    var deduped = [];
    var prev_gen_line = -1, prev_gen_col = -1;
    sorted.forEach(function(seg) {
        if (seg[0] === prev_gen_line && seg[1] === prev_gen_col) return;
        prev_gen_line = seg[0];
        prev_gen_col = seg[1];
        deduped.push(seg);
    });

    // Find max line
    var max_line = 0;
    deduped.forEach(function(seg) { if (seg[0] > max_line) max_line = seg[0]; });

    // Group segments by generated line
    var by_line = [];
    for (var i = 0; i <= max_line; i++) by_line.push([]);
    deduped.forEach(function(seg) { by_line[seg[0]].push(seg); });

    // Encode mappings
    var prev_src_idx = 0, prev_src_line = 0, prev_src_col = 0;
    var mappings_lines = by_line.map(function(line_segs) {
        var prev_col = 0;
        return line_segs.map(function(seg) {
            var gen_col = seg[1];
            var src_idx = sources_index[seg[2]];
            var src_line = seg[3];
            var src_col = seg[4];
            var result = encode_segment([
                gen_col - prev_col,
                src_idx - prev_src_idx,
                src_line - prev_src_line,
                src_col - prev_src_col
            ]);
            prev_col = gen_col;
            prev_src_idx = src_idx;
            prev_src_line = src_line;
            prev_src_col = src_col;
            return result;
        }).join(',');
    });

    return JSON.stringify({
        version: 3,
        file: output_file ? path.basename(output_file) : '',
        sourceRoot: source_root || '',
        sources: sources,
        names: [],
        mappings: mappings_lines.join(';')
    });
}

export { generate_source_map };
