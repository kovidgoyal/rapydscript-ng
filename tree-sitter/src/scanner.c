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
    FSTRING_START,
    FSTRING_CONTENT,
    FSTRING_END,
};

// Per-nesting-level metadata for f-strings.
typedef struct {
    char quote_char;  // '"' or '\''
    uint8_t triple;   // 1 if triple-quoted, 0 otherwise
} FStringFrame;

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
    // Stack of open f-string frames.
    uint32_t fstring_size;
    uint32_t fstring_capacity;
    FStringFrame *fstring_data;
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

static void fstack_push(Scanner *s, FStringFrame frame) {
    if (s->fstring_size >= s->fstring_capacity) {
        uint32_t new_cap = s->fstring_capacity ? s->fstring_capacity * 2 : 4;
        s->fstring_data = realloc(s->fstring_data, new_cap * sizeof(FStringFrame));
        s->fstring_capacity = new_cap;
    }
    s->fstring_data[s->fstring_size++] = frame;
}

static void fstack_pop(Scanner *s) {
    if (s->fstring_size > 0) {
        s->fstring_size--;
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
    if (s->fstring_data) {
        free(s->fstring_data);
    }
    free(s);
}

unsigned tree_sitter_rapydscript_external_scanner_serialize(void *payload, char *buffer) {
    Scanner *s = (Scanner *)payload;
    unsigned i = 0;

    // has_pending flag and pending_indent value
    buffer[i++] = (char)(s->has_pending ? 1 : 0);
    buffer[i++] = (char)(s->pending_indent & 0xFF);
    buffer[i++] = (char)((s->pending_indent >> 8) & 0xFF);

    // Indent stack size (so we can distinguish it from fstring data)
    uint16_t indent_count = (uint16_t)(s->size < 0xFFFF ? s->size : 0xFFFF);
    buffer[i++] = (char)(indent_count & 0xFF);
    buffer[i++] = (char)((indent_count >> 8) & 0xFF);

    for (uint32_t k = 0; k < s->size; k++) {
        if (i + 2 > TREE_SITTER_SERIALIZATION_BUFFER_SIZE) break;
        uint16_t v = s->data[k];
        buffer[i++] = (char)(v & 0xFF);
        buffer[i++] = (char)((v >> 8) & 0xFF);
    }

    // F-string stack
    if (i + 1 <= TREE_SITTER_SERIALIZATION_BUFFER_SIZE) {
        buffer[i++] = (char)(s->fstring_size & 0xFF);
        for (uint32_t k = 0; k < s->fstring_size; k++) {
            if (i + 2 > TREE_SITTER_SERIALIZATION_BUFFER_SIZE) break;
            buffer[i++] = s->fstring_data[k].quote_char;
            buffer[i++] = s->fstring_data[k].triple;
        }
    }

    return i;
}

void tree_sitter_rapydscript_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
    Scanner *s = (Scanner *)payload;
    s->size = 0;
    s->has_pending = 0;
    s->pending_indent = 0;
    s->fstring_size = 0;
    unsigned i = 0;

    if (length < 5) {
        stack_push(s, 0);
        return;
    }

    s->has_pending = (uint8_t)buffer[i++];
    s->pending_indent = (uint8_t)buffer[i] | ((uint16_t)(uint8_t)buffer[i + 1] << 8);
    i += 2;

    uint16_t indent_count = (uint8_t)buffer[i] | ((uint16_t)(uint8_t)buffer[i + 1] << 8);
    i += 2;

    for (uint16_t k = 0; k < indent_count && i + 2 <= length; k++) {
        uint16_t v = (uint8_t)buffer[i] | ((uint16_t)(uint8_t)buffer[i + 1] << 8);
        i += 2;
        stack_push(s, v);
    }
    if (s->size == 0) {
        stack_push(s, 0);
    }

    // F-string stack
    if (i < length) {
        uint8_t fcount = (uint8_t)buffer[i++];
        for (uint8_t k = 0; k < fcount && i + 2 <= length; k++) {
            FStringFrame frame;
            frame.quote_char = buffer[i++];
            frame.triple = (uint8_t)buffer[i++];
            fstack_push(s, frame);
        }
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

// Scan the opening of an f-string: optional modifier chars containing at least
// one f/F (but no v/V), followed by 1 or 3 quote characters.
static bool scan_fstring_start(TSLexer *lexer, Scanner *s) {
    // Skip leading whitespace (the extras rule handles it for most tokens, but
    // we do it here explicitly to match the REGEX scanner's behaviour).
    while (lexer->lookahead == ' ' || lexer->lookahead == '\t' ||
           lexer->lookahead == '\n' || lexer->lookahead == '\r' ||
           lexer->lookahead == '\f') {
        skip(lexer);
    }

    bool has_f = false;
    int mod_count = 0;

    while (mod_count < 6) {
        int32_t c = lexer->lookahead;
        if (c == 'f' || c == 'F') {
            has_f = true;
            advance(lexer);
            mod_count++;
        } else if (c == 'r' || c == 'R' || c == 'b' || c == 'B' ||
                   c == 'u' || c == 'U') {
            advance(lexer);
            mod_count++;
        } else if (c == 'v' || c == 'V') {
            // Verbatim string — not an f-string.
            return false;
        } else {
            break;
        }
    }

    if (!has_f) return false;

    int32_t q = lexer->lookahead;
    if (q != '"' && q != '\'') return false;

    advance(lexer);          // consume first quote
    lexer->mark_end(lexer);  // tentative token end after one quote

    bool triple = false;
    if (lexer->lookahead == q) {
        advance(lexer);  // peek at second quote
        if (lexer->lookahead == q) {
            advance(lexer);  // consume third quote
            triple = true;
            lexer->mark_end(lexer);  // extend token to include triple quote
        }
        // If only two quotes (f''), mark_end is still after the first quote;
        // the second quote will be scanned as FSTRING_END immediately.
    }

    FStringFrame frame = {(char)q, triple ? 1 : 0};
    fstack_push(s, frame);

    lexer->result_symbol = FSTRING_START;
    return true;
}

// Scan literal content inside an f-string up to (but not including) the next
// interpolation opener '{' or the closing quote sequence.  Returns false if
// there is no content (e.g. we are already at '{' or the closing quote).
static bool scan_fstring_content(TSLexer *lexer, Scanner *s) {
    if (s->fstring_size == 0) return false;
    FStringFrame frame = s->fstring_data[s->fstring_size - 1];
    int32_t q = (int32_t)(unsigned char)frame.quote_char;
    bool triple = frame.triple != 0;

    bool has_content = false;

    while (true) {
        int32_t c = lexer->lookahead;

        if (c == 0) break;  // EOF

        // Unterminated single-line f-string.
        if (c == '\n' && !triple) break;

        if (c == q) {
            if (triple) {
                // Check for closing triple quote.
                advance(lexer);
                if (lexer->lookahead == q) {
                    advance(lexer);
                    if (lexer->lookahead == q) {
                        // Found closing """/'''.  Stop before it.
                        // mark_end was last set before we advanced into the quotes.
                        break;
                    }
                    // Two matching quotes but not three: include both in content.
                    lexer->mark_end(lexer);
                    has_content = true;
                    continue;
                }
                // Single matching quote in a triple-quoted string: part of content.
                lexer->mark_end(lexer);
                has_content = true;
                continue;
            } else {
                // Single-quoted: closing quote.  Stop before it.
                break;
            }
        }

        if (c == '{') {
            advance(lexer);  // tentatively consume
            if (lexer->lookahead == '{') {
                // '{{' is an escaped brace — include both in content.
                advance(lexer);
                lexer->mark_end(lexer);
                has_content = true;
                continue;
            }
            // Lone '{' starts an interpolation.  The last mark_end is before
            // this '{', so returning false here leaves the '{' unconsumed.
            break;
        }

        if (c == '}') {
            advance(lexer);  // tentatively consume
            if (lexer->lookahead == '}') {
                // '}}' is an escaped brace — include both in content.
                advance(lexer);
                lexer->mark_end(lexer);
                has_content = true;
                continue;
            }
            // Lone '}' — either a format-spec terminator or a syntax error.
            // Stop before it.
            break;
        }

        if (c == '\\') {
            advance(lexer);  // consume backslash
            if (lexer->lookahead != 0) {
                advance(lexer);  // consume escaped character
            }
            lexer->mark_end(lexer);
            has_content = true;
            continue;
        }

        advance(lexer);
        lexer->mark_end(lexer);
        has_content = true;
    }

    if (!has_content) return false;

    lexer->result_symbol = FSTRING_CONTENT;
    return true;
}

// Scan the closing quote sequence of an f-string and pop the frame.
static bool scan_fstring_end(TSLexer *lexer, Scanner *s) {
    if (s->fstring_size == 0) return false;
    FStringFrame frame = s->fstring_data[s->fstring_size - 1];
    int32_t q = (int32_t)(unsigned char)frame.quote_char;

    if (lexer->lookahead != q) return false;

    if (frame.triple) {
        advance(lexer);
        if (lexer->lookahead != q) return false;
        advance(lexer);
        if (lexer->lookahead != q) return false;
        advance(lexer);
    } else {
        advance(lexer);
    }

    fstack_pop(s);
    lexer->mark_end(lexer);
    lexer->result_symbol = FSTRING_END;
    return true;
}

bool tree_sitter_rapydscript_external_scanner_scan(void *payload, TSLexer *lexer,
                                                   const bool *valid_symbols) {
    Scanner *scanner = (Scanner *)payload;

    // F-string content must be handled before any whitespace skipping because
    // the whitespace is part of the string's content.
    if (valid_symbols[FSTRING_CONTENT]) {
        if (scan_fstring_content(lexer, scanner)) return true;
    }
    if (valid_symbols[FSTRING_END]) {
        if (scan_fstring_end(lexer, scanner)) return true;
    }

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

    // 2. Regular expression literals and f-string starts are both only valid
    //    where a primary expression may begin, so neither '/' (division) nor an
    //    f-modifier identifier causes ambiguity in other positions.
    if ((valid_symbols[REGEX] || valid_symbols[FSTRING_START]) &&
        !valid_symbols[NEWLINE] && !valid_symbols[INDENT] && !valid_symbols[DEDENT]) {
        // Skip surrounding whitespace, including newlines: a literal may appear
        // on its own line, e.g. as an argument following a preceding multi-line
        // one (`foo(\n def(): ...\n ,\n /re/\n)`).
        while (lexer->lookahead == ' ' || lexer->lookahead == '\t' ||
               lexer->lookahead == '\n' || lexer->lookahead == '\r' ||
               lexer->lookahead == '\f') {
            skip(lexer);
        }
        if (valid_symbols[REGEX] && lexer->lookahead == '/') {
            return scan_regex(lexer);
        }
        if (valid_symbols[FSTRING_START]) {
            return scan_fstring_start(lexer, scanner);
        }
        return false;
    }

    // 4. Indentation / newline handling.
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
