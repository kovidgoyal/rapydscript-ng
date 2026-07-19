/* vim:fileencoding=utf-8
 *
 * lsp_protocol.mjs -- Minimal Language Server Protocol transport for RapydScript.
 *
 * Copyright (C) 2026 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 *
 * This implements just enough of the LSP wire protocol (JSON-RPC 2.0 with
 * Content-Length framing over a byte stream) to drive an editor. We deliberately
 * do not depend on the vscode-languageserver npm package: the surface we need is
 * small and the project prefers to avoid external dependencies.
 */
"use strict";

// ---------------------------------------------------------------------------
// JSON-RPC error codes (subset used here)
// ---------------------------------------------------------------------------
export var ErrorCodes = {
    ParseError: -32700,
    InvalidRequest: -32600,
    MethodNotFound: -32601,
    InvalidParams: -32602,
    InternalError: -32603,
    RequestCancelled: -32800,
};

// A handler may throw this to produce a specific JSON-RPC error response.
export function ResponseError(code, message, data) {
    var e = new Error(message);
    e.code = code;
    e.data = data;
    e.is_response_error = true;
    return e;
}

// ---------------------------------------------------------------------------
// Message framing: parse a byte stream of `Content-Length: N\r\n\r\n<body>`
// ---------------------------------------------------------------------------
function MessageReader(stream, on_message, on_error) {
    var buffer = Buffer.alloc(0);
    var content_length = -1;

    function try_parse() {
        // Loop so that multiple messages contained in one chunk are all handled.
        while (true) {
            if (content_length < 0) {
                var idx = buffer.indexOf('\r\n\r\n');
                if (idx < 0) return;
                var header = buffer.slice(0, idx).toString('ascii');
                content_length = -1;
                header.split('\r\n').forEach(function (line) {
                    var sep = line.indexOf(':');
                    if (sep < 0) return;
                    var name = line.slice(0, sep).trim().toLowerCase();
                    var value = line.slice(sep + 1).trim();
                    if (name === 'content-length') content_length = parseInt(value, 10);
                });
                buffer = buffer.slice(idx + 4);
                if (isNaN(content_length) || content_length < 0) {
                    content_length = -1;
                    if (on_error) on_error(new Error('Invalid or missing Content-Length header'));
                    return;
                }
            }
            if (buffer.length < content_length) return;  // wait for more bytes
            var body = buffer.slice(0, content_length).toString('utf-8');
            buffer = buffer.slice(content_length);
            content_length = -1;
            var msg;
            try { msg = JSON.parse(body); }
            catch (e) { if (on_error) on_error(e); continue; }
            on_message(msg);
        }
    }

    stream.on('data', function (chunk) {
        buffer = Buffer.concat([buffer, chunk]);
        try { try_parse(); }
        catch (e) { if (on_error) on_error(e); }
    });
    return {};
}

function write_message(stream, msg) {
    var body = JSON.stringify(msg);
    var payload = Buffer.from(body, 'utf-8');
    stream.write('Content-Length: ' + payload.length + '\r\n\r\n');
    stream.write(payload);
}

// ---------------------------------------------------------------------------
// Connection: dispatch requests / notifications to registered handlers
// ---------------------------------------------------------------------------
export function create_connection(input, output, log) {
    var request_handlers = Object.create(null);
    var notification_handlers = Object.create(null);
    var cancelled = Object.create(null);  // request id -> true
    var pending_requests = Object.create(null);  // id -> {resolve, reject}
    var next_request_id = 1;

    function send(msg) { write_message(output, msg); }

    function send_error(id, code, message, data) {
        send({ jsonrpc: '2.0', id: id, error: { code: code, message: message, data: data } });
    }

    function handle_response(msg) {
        var pending = pending_requests[msg.id];
        if (!pending) return;
        delete pending_requests[msg.id];
        if (msg.error) {
            var err = new Error(msg.error.message || 'Request failed');
            err.code = msg.error.code;
            pending.reject(err);
        } else {
            pending.resolve(msg.result);
        }
    }

    async function handle_request(msg) {
        var handler = request_handlers[msg.method];
        if (!handler) {
            // Unknown request: respond with MethodNotFound (required by spec).
            send_error(msg.id, ErrorCodes.MethodNotFound, 'Unhandled method: ' + msg.method);
            return;
        }
        try {
            if (cancelled[msg.id]) {
                delete cancelled[msg.id];
                send_error(msg.id, ErrorCodes.RequestCancelled, 'Request cancelled');
                return;
            }
            var result = await handler(msg.params, msg.id);
            if (cancelled[msg.id]) { delete cancelled[msg.id]; send_error(msg.id, ErrorCodes.RequestCancelled, 'Request cancelled'); return; }
            send({ jsonrpc: '2.0', id: msg.id, result: (result === undefined) ? null : result });
        } catch (e) {
            if (e && e.is_response_error) send_error(msg.id, e.code, e.message, e.data);
            else {
                if (log) log('Error handling ' + msg.method + ': ' + (e && e.stack ? e.stack : e));
                send_error(msg.id, ErrorCodes.InternalError, (e && e.message) ? e.message : String(e));
            }
        }
    }

    async function handle_notification(msg) {
        if (msg.method === '$/cancelRequest' && msg.params && msg.params.id !== undefined) {
            cancelled[msg.params.id] = true;
            return;
        }
        var handler = notification_handlers[msg.method];
        if (!handler) return;  // Unknown notifications are silently ignored per spec.
        try { await handler(msg.params); }
        catch (e) { if (log) log('Error handling notification ' + msg.method + ': ' + (e && e.stack ? e.stack : e)); }
    }

    function on_message(msg) {
        if (!msg || msg.jsonrpc !== '2.0') return;
        if (msg.method !== undefined && msg.id !== undefined) handle_request(msg);
        else if (msg.method !== undefined) handle_notification(msg);
        else if (msg.id !== undefined) handle_response(msg);
    }

    MessageReader(input, on_message, function (e) { if (log) log('Message parse error: ' + e); });

    return {
        on_request: function (method, handler) { request_handlers[method] = handler; },
        on_notification: function (method, handler) { notification_handlers[method] = handler; },
        send_notification: function (method, params) { send({ jsonrpc: '2.0', method: method, params: params }); },
        send_request: function (method, params) {
            return new Promise(function (resolve, reject) {
                var id = next_request_id++;
                pending_requests[id] = { resolve: resolve, reject: reject };
                send({ jsonrpc: '2.0', id: id, method: method, params: params });
            });
        },
        dispose: function () { request_handlers = Object.create(null); notification_handlers = Object.create(null); },
    };
}

// ---------------------------------------------------------------------------
// TextDocument: in-memory buffer with UTF-16 position <-> offset conversion.
// LSP positions are 0-based (line, character) where character counts UTF-16
// code units. JavaScript strings are already UTF-16, so a plain index into the
// string is the correct offset.
// ---------------------------------------------------------------------------
export function TextDocument(uri, language_id, version, text) {
    this.uri = uri;
    this.language_id = language_id;
    this.version = version;
    this._set_text(text);
}

TextDocument.prototype._set_text = function (text) {
    this.text = text;
    // Precompute the offset at which each line starts so position<->offset
    // conversion is O(log n) / O(1) instead of rescanning the whole buffer.
    var starts = [0];
    for (var i = 0; i < text.length; i++) {
        var c = text.charCodeAt(i);
        if (c === 10 /*\n*/) starts.push(i + 1);
        else if (c === 13 /*\r*/) {
            if (text.charCodeAt(i + 1) === 10) { i++; }
            starts.push(i + 1);
        }
    }
    this._line_starts = starts;
};

TextDocument.prototype.update = function (text, version) {
    if (version !== undefined && version !== null) this.version = version;
    this._set_text(text);
};

TextDocument.prototype.line_count = function () { return this._line_starts.length; };

// {line, character} -> integer offset into the buffer.
TextDocument.prototype.offset_at = function (position) {
    var starts = this._line_starts;
    if (position.line >= starts.length) return this.text.length;
    if (position.line < 0) return 0;
    var line_start = starts[position.line];
    var line_end = (position.line + 1 < starts.length) ? starts[position.line + 1] : this.text.length;
    var offset = line_start + Math.max(0, position.character);
    return Math.min(offset, line_end);
};

// integer offset -> {line, character}
TextDocument.prototype.position_at = function (offset) {
    offset = Math.max(0, Math.min(offset, this.text.length));
    var starts = this._line_starts;
    // binary search for the last line start <= offset
    var low = 0, high = starts.length - 1, line = 0;
    while (low <= high) {
        var mid = (low + high) >> 1;
        if (starts[mid] <= offset) { line = mid; low = mid + 1; }
        else high = mid - 1;
    }
    return { line: line, character: offset - starts[line] };
};

// Convenience: 1-based (line, col0) parser coordinates -> LSP 0-based position.
TextDocument.prototype.lsp_position = function (parser_line, parser_col) {
    return { line: Math.max(0, (parser_line || 1) - 1), character: Math.max(0, parser_col || 0) };
};

// A document store keyed by uri.
export function DocumentStore() { this.docs = Object.create(null); }
DocumentStore.prototype.open = function (uri, language_id, version, text) {
    var d = new TextDocument(uri, language_id, version, text);
    this.docs[uri] = d;
    return d;
};
DocumentStore.prototype.get = function (uri) { return this.docs[uri]; };
DocumentStore.prototype.close = function (uri) { delete this.docs[uri]; };
DocumentStore.prototype.all = function () {
    var self = this;
    return Object.keys(this.docs).map(function (k) { return self.docs[k]; });
};
