#include "tree_sitter/parser.h"
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

// External tokens produced by this scanner.
enum TokenType {
    NEWLINE,
    INDENT,
    DEDENT,
    REGEX,
};

// A simple growable stack of indentation widths. The bottom of the stack is
// always 0 (the module level indentation).
typedef struct {
    uint32_t size;
    uint32_t capacity;
    uint16_t *data;
    // When `has_pending` is set, `pending_indent` records the indentation of a
    // line whose NEWLINE has already been emitted but whose INDENT/DEDENT
    // tokens still need to be reconciled against the stack. This lets us emit
    // several DEDENT tokens for a single line without needing to re-read the
    // (already consumed) newline.
    uint16_t pending_indent;
    uint8_t has_pending;
} Scanner;

static void stack_push(Scanner *s, uint16_t value) {
    if (s->size >= s->capacity) {
        uint32_t new_cap = s->capacity ? s->capacity * 2 : 8;
        s->data = realloc(s->data, new_cap * sizeof(uint16_t));
        s->capacity = new_cap;
    }
    s->data[s->size++] = value;
}

static uint16_t stack_top(Scanner *s) {
    return s->size ? s->data[s->size - 1] : 0;
}

static void stack_pop(Scanner *s) {
    // Never pop the base (module) level.
    if (s->size > 1) {
        s->size--;
    }
}

void *tree_sitter_rapydscript_external_scanner_create(void) {
    Scanner *s = calloc(1, sizeof(Scanner));
    stack_push(s, 0);
    return s;
}

void tree_sitter_rapydscript_external_scanner_destroy(void *payload) {
    Scanner *s = (Scanner *)payload;
    if (s->data) {
        free(s->data);
    }
    free(s);
}

unsigned tree_sitter_rapydscript_external_scanner_serialize(void *payload, char *buffer) {
    Scanner *s = (Scanner *)payload;
    unsigned i = 0;
    buffer[i++] = (char)(s->has_pending ? 1 : 0);
    buffer[i++] = (char)(s->pending_indent & 0xFF);
    buffer[i++] = (char)((s->pending_indent >> 8) & 0xFF);
    for (uint32_t k = 0; k < s->size; k++) {
        if (i + 2 > TREE_SITTER_SERIALIZATION_BUFFER_SIZE) {
            break;
        }
        uint16_t v = s->data[k];
        buffer[i++] = (char)(v & 0xFF);
        buffer[i++] = (char)((v >> 8) & 0xFF);
    }
    return i;
}

void tree_sitter_rapydscript_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
    Scanner *s = (Scanner *)payload;
    s->size = 0;
    s->has_pending = 0;
    s->pending_indent = 0;
    unsigned i = 0;
    if (length >= 3) {
        s->has_pending = (uint8_t)buffer[i++];
        s->pending_indent = (uint8_t)buffer[i] | ((uint16_t)(uint8_t)buffer[i + 1] << 8);
        i += 2;
    }
    while (i + 2 <= length) {
        uint16_t v = (uint8_t)buffer[i] | ((uint16_t)(uint8_t)buffer[i + 1] << 8);
        i += 2;
        stack_push(s, v);
    }
    if (s->size == 0) {
        stack_push(s, 0);
    }
}

static void advance(TSLexer *lexer) { lexer->advance(lexer, false); }
static void skip(TSLexer *lexer) { lexer->advance(lexer, true); }

static bool is_letter(int32_t c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

// Reads a JavaScript style regular expression literal. Assumes the current
// lookahead is the opening '/'. Handles both plain literals (/ab/gi) and the
// RapydScript "verbose" form (///  ab  ///).
static bool scan_regex(TSLexer *lexer) {
    advance(lexer); // consume opening '/'

    if (lexer->lookahead == '/') {
        advance(lexer);
        if (lexer->lookahead == '/') {
            // verbose regex: read until the closing '///'
            advance(lexer);
            int slashes = 0;
            while (lexer->lookahead != 0) {
                if (lexer->lookahead == '\\') {
                    advance(lexer);
                    if (lexer->lookahead != 0) {
                        advance(lexer);
                    }
                    slashes = 0;
                    continue;
                }
                if (lexer->lookahead == '/') {
                    slashes++;
                    advance(lexer);
                    if (slashes == 3) {
                        break;
                    }
                } else {
                    slashes = 0;
                    advance(lexer);
                }
            }
        }
        // else: empty regex '//' -> nothing more to read in the body
    } else {
        // plain regex literal: read until an unescaped '/', respecting classes
        bool in_class = false;
        while (lexer->lookahead != 0 && lexer->lookahead != '\n') {
            if (lexer->lookahead == '\\') {
                advance(lexer);
                if (lexer->lookahead != 0) {
                    advance(lexer);
                }
                continue;
            }
            if (lexer->lookahead == '[') {
                in_class = true;
                advance(lexer);
                continue;
            }
            if (lexer->lookahead == ']') {
                in_class = false;
                advance(lexer);
                continue;
            }
            if (lexer->lookahead == '/' && !in_class) {
                advance(lexer);
                break;
            }
            advance(lexer);
        }
    }

    // trailing flags (g, i, m, s, u, y, ...)
    while (is_letter(lexer->lookahead)) {
        advance(lexer);
    }

    lexer->mark_end(lexer);
    lexer->result_symbol = REGEX;
    return true;
}

bool tree_sitter_rapydscript_external_scanner_scan(void *payload, TSLexer *lexer,
                                                   const bool *valid_symbols) {
    Scanner *scanner = (Scanner *)payload;

    // 1. Reconcile any pending indentation left over from a previously emitted
    //    NEWLINE/DEDENT. This is how we emit several DEDENT tokens for a single
    //    line without re-reading the (already consumed) newline. Only DEDENT is
    //    reconciled here: a pending INDENT is never correct (a new block always
    //    begins with a freshly scanned indent), and acting on a stale pending
    //    value would corrupt the stack when the scanner is next consulted for
    //    an unrelated block.
    if (scanner->has_pending) {
        uint16_t current = stack_top(scanner);
        if (valid_symbols[DEDENT] && scanner->pending_indent < current) {
            stack_pop(scanner);
            lexer->result_symbol = DEDENT;
            return true;
        }
        // Nothing left to reconcile (or the grammar does not want it here).
        scanner->has_pending = 0;
    }

    // 2. Regular expression literals. Only valid where a primary expression may
    //    begin, so '/' cannot be a division operator in that position.
    if (valid_symbols[REGEX] && !valid_symbols[NEWLINE] && !valid_symbols[INDENT] &&
        !valid_symbols[DEDENT]) {
        // Skip surrounding whitespace, including newlines: a regex literal may
        // appear on its own line, e.g. as an argument following a preceding
        // multi-line one (`foo(\n def(): ...\n ,\n /re/\n)`).
        while (lexer->lookahead == ' ' || lexer->lookahead == '\t' ||
               lexer->lookahead == '\n' || lexer->lookahead == '\r' ||
               lexer->lookahead == '\f') {
            skip(lexer);
        }
        if (lexer->lookahead == '/') {
            return scan_regex(lexer);
        }
        return false;
    }

    // 3. Indentation / newline handling.
    bool found_end_of_line = false;
    uint32_t indent_length = 0;

    for (;;) {
        if (lexer->lookahead == '\n') {
            found_end_of_line = true;
            indent_length = 0;
            skip(lexer);
        } else if (lexer->lookahead == '\r' || lexer->lookahead == '\f' ||
                   lexer->lookahead == 0x0b) {
            indent_length = 0;
            skip(lexer);
        } else if (lexer->lookahead == ' ') {
            indent_length++;
            skip(lexer);
        } else if (lexer->lookahead == '\t') {
            indent_length += 8;
            skip(lexer);
        } else if (lexer->eof(lexer)) {
            found_end_of_line = true;
            indent_length = 0;
            break;
        } else {
            break;
        }
    }

    if (found_end_of_line) {
        uint16_t current = stack_top(scanner);

        // Leading-dot chaining: a line at the same indentation that begins with
        // '.' binds to the previous logical line (e.g. jQuery-style method
        // chains and `do: ... .while`). Suppress the newline so the '.' simply
        // continues the preceding expression. When the indentation differs a
        // real INDENT/DEDENT is still required (that is how `.while` closes a
        // `do` block), so this only applies at matching indentation.
        if (lexer->lookahead == '.' && indent_length == current &&
            !valid_symbols[INDENT]) {
            return false;
        }

        if (valid_symbols[INDENT] && indent_length > current) {
            stack_push(scanner, (uint16_t)indent_length);
            lexer->result_symbol = INDENT;
            return true;
        }

        if (valid_symbols[DEDENT] && indent_length < current) {
            stack_pop(scanner);
            // There may be more levels to pop; remember for subsequent calls.
            if (indent_length < stack_top(scanner)) {
                scanner->pending_indent = (uint16_t)indent_length;
                scanner->has_pending = 1;
            }
            lexer->result_symbol = DEDENT;
            return true;
        }

        if (valid_symbols[NEWLINE]) {
            // The newline (and the next line's indentation) has been consumed.
            // Record that indentation so we can emit the DEDENT/INDENT tokens
            // that follow, once the grammar reaches a state that accepts them.
            if (indent_length != current) {
                scanner->pending_indent = (uint16_t)indent_length;
                scanner->has_pending = 1;
            }
            lexer->result_symbol = NEWLINE;
            return true;
        }
    }

    return false;
}
