/**
 * @file RapydScript grammar for tree-sitter
 * @author Generated for rapydscript-ng
 * @license BSD
 *
 * RapydScript is a Python-like language that compiles to JavaScript. It shares
 * most of Python's surface syntax (indentation based blocks, comprehensions,
 * decorators, keyword arguments, slices, ...) but differs in important ways:
 *
 *   - anonymous, *multi-line* functions declared with `def(...)` (and
 *     `async def(...)`) instead of Python's single-expression `lambda`.
 *   - the existential operator `?` (`a?.b`, `a?[1]`, `a?()`, `a ? b`).
 *   - verbatim JavaScript string/for literals (the `v` string modifier).
 *   - JavaScript style regular expression literals, including the verbose
 *     `/// ... ///` form.
 *   - `do: ... .while cond` loops and leading-dot chaining.
 *   - the JavaScript keyword set is reserved in addition to Python's.
 *
 * It deliberately does NOT support several newer Python constructs, such as the
 * walrus operator `:=`, `match`/`case`, or `*`-unpacking in assignment targets.
 * Those are therefore intentionally absent from this grammar.
 */

/* eslint-disable arrow-parens */
/* eslint-disable camelcase */
/* eslint-disable-next-line spaced-comment */
/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const PREC = {
  // Lowest precedence first.
  assign: -3,
  lambda: -2,
  conditional: -1,
  or: 10,
  and: 11,
  not: 12,
  compare: 13,
  bitwise_or: 14,
  bitwise_xor: 15,
  bitwise_and: 16,
  shift: 17,
  plus: 18,
  times: 19,
  power: 21,
  unary: 22,
  existential: 23,
  call: 24,
  member: 25,
};

module.exports = grammar({
  name: 'rapydscript',

  externals: $ => [
    $._newline,
    $._indent,
    $._dedent,
    $.regex,
    $.fstring_start,
    $.fstring_content,
    $.fstring_end,
  ],

  extras: $ => [
    $.comment,
    // Whitespace, including newlines. At statement boundaries the external
    // scanner claims the newline first (producing _newline/_indent/_dedent);
    // everywhere else (e.g. inside brackets) it is skipped as trivia.
    /[ \t\r\n\f ﻿​]/,
    // explicit line continuation
    /\\\r?\n/,
  ],

  supertypes: $ => [
    $._simple_statement,
    $._compound_statement,
    $._expression,
    $._primary_expression,
  ],

  word: $ => $.identifier,

  conflicts: $ => [
    // Assignment / for targets overlap with ordinary expressions until the
    // `=`/`in` is seen, so the parser must keep both interpretations alive.
    [$._primary_expression, $.pattern],
    [$.list, $.list_pattern],
    [$.tuple, $.tuple_pattern],
    // `a?()` : safe-call (empty argument list) vs `a ? ()` (default empty tuple)
    [$.argument_list, $.tuple],
    [$.argument_list, $.tuple, $.tuple_pattern],
    [$.argument_list, $.generator_expression],
    // `def(): <block>` at statement tail: is it an expression whose value is an
    // anonymous function, or the dedicated block-tailed compound statement?
    [$._anon_suite, $._block_anonymous_function],
    // `def name(): ...` : a function definition (statement) vs a named function
    // expression (RapydScript allows both).
    [$._suite, $._anon_suite],
    [$._simple_statement, $._inline_simple_statement],
    [$._primary_expression, $.concatenated_string],
    [$._expression_statement, $.expression_list],
    [$._argument, $._collection_element],
    [$.delete_statement, $.expression_list],
    [$._assign_rhs, $.expression_list],
  ],

  rules: {
    module: $ => repeat($._statement),

    // ---------------------------------------------------------------------
    // Statements
    // ---------------------------------------------------------------------

    _statement: $ => choice(
      $._simple_statements,
      $._compound_statement,
    ),

    // one or more simple statements on a logical line, terminated by a newline
    _simple_statements: $ => seq(
      sep1($._simple_statement, ';'),
      optional(';'),
      $._newline,
    ),

    _simple_statement: $ => choice(
      $.import_statement,
      $.import_from_statement,
      $.scoped_flag_statement,
      $._expression_statement,
      $.assert_statement,
      $.return_statement,
      $.delete_statement,
      $.raise_statement,
      $.pass_statement,
      $.break_statement,
      $.continue_statement,
      $.global_statement,
      $.nonlocal_statement,
      $.debugger_statement,
      $.yield_statement,
    ),

    _compound_statement: $ => choice(
      $.if_statement,
      $.for_statement,
      $.for_js_statement,
      $.while_statement,
      $.do_statement,
      $.try_statement,
      $.with_statement,
      $.function_definition,
      $.async_function_definition,
      $.class_definition,
      $.decorated_definition,
      $.block_tailed_statement,
    ),

    // A statement whose trailing value is a multi-line-block anonymous
    // function, e.g.
    //
    //     turnGreen = def(event):
    //         div.css('background', 'green')
    //     div.mousedown(turnGreen)   # <- no blank line needed
    //
    // Because the anonymous function ends with an indented block, the block's
    // closing dedent terminates the statement (there is no trailing newline),
    // so this is modelled as a compound statement rather than a simple one.
    block_tailed_statement: $ => seq(
      optional(choice(
        seq(field('left', $._assign_lhs), '='),
        'return',
      )),
      field('value', alias($._block_anonymous_function, $.anonymous_function)),
    ),

    _block_anonymous_function: $ => seq(
      optional('async'),
      'def',
      field('parameters', $.parameters),
      optional(seq('->', field('return_type', $._expression))),
      ':',
      field('body', $.block),
    ),

    // ---- simple statements ----------------------------------------------

    _expression_statement: $ => choice(
      $._expression,
      $.expression_list,
    ),

    // In RapydScript (as in JavaScript) assignment is an *expression*: it can
    // appear inside conditions, parentheses, subscripts, etc.
    //   if m = re.exec(x): ...
    //   node = a[i -= 1]
    //   while (ch = peek()) and pred(ch): ...
    assignment: $ => prec.right(PREC.assign, seq(
      field('left', $._assign_lhs),
      '=',
      field('right', $._assign_rhs),
    )),

    augmented_assignment: $ => prec.right(PREC.assign, seq(
      field('left', $._assign_lhs),
      field('operator', choice(
        '+=', '-=', '*=', '/=', '//=', '%=', '**=',
        '>>=', '<<=', '>>>=', '&=', '^=', '|=',
      )),
      field('right', $._assign_rhs),
    )),

    _assign_lhs: $ => choice(
      $.pattern,
      $.pattern_list,
    ),

    _assign_rhs: $ => choice(
      $._expression,
      $.expression_list,
      $.yield,
    ),

    expression_list: $ => prec.right(seq(
      $._expression,
      choice(
        ',',
        seq(repeat1(seq(',', $._expression)), optional(',')),
      ),
    )),

    // Assignment targets (tuple/list destructuring). RapydScript supports
    // nested destructuring, e.g. `a, (b, c) = ...`, but NOT starred targets.
    pattern_list: $ => prec.right(seq(
      $.pattern,
      choice(
        ',',
        seq(repeat1(seq(',', $.pattern)), optional(',')),
      ),
    )),

    pattern: $ => choice(
      $.identifier,
      $.this,
      $.attribute,
      $.subscript,
      $.tuple_pattern,
      $.list_pattern,
    ),

    tuple_pattern: $ => seq('(', optional($._pattern_seq), ')'),
    list_pattern: $ => seq('[', optional($._pattern_seq), ']'),

    _pattern_seq: $ => seq(
      commaSep1($.pattern),
      optional(','),
    ),

    return_statement: $ => prec.right(seq(
      'return',
      optional(choice($._expression, $.expression_list)),
    )),

    delete_statement: $ => seq(
      'del',
      choice($._expression, $.expression_list),
    ),

    raise_statement: $ => prec.right(seq(
      'raise',
      optional($._expression),
    )),

    pass_statement: _ => 'pass',
    break_statement: _ => 'break',
    continue_statement: _ => 'continue',
    debugger_statement: _ => 'debugger',

    assert_statement: $ => prec.right(seq(
      'assert',
      $._expression,
      optional(seq(',', $._expression)),
    )),

    global_statement: $ => prec.right(seq('global', commaSep1($.identifier))),
    nonlocal_statement: $ => prec.right(seq('nonlocal', commaSep1($.identifier))),

    yield_statement: $ => $.yield,

    yield: $ => prec.right(seq(
      'yield',
      choice(
        seq('from', field('from', $._expression)),
        optional(choice($._expression, $.expression_list)),
      ),
    )),

    // ---- imports ---------------------------------------------------------

    import_statement: $ => prec.right(seq(
      'import',
      commaSep1(field('name', choice(
        $.dotted_name,
        $.aliased_import,
      ))),
    )),

    aliased_import: $ => seq(
      field('name', $.dotted_name),
      'as',
      field('alias', $.identifier),
    ),

    import_from_statement: $ => seq(
      'from',
      field('module_name', $.dotted_name),
      'import',
      choice(
        seq('(', $._import_list, ')'),
        $._import_list,
      ),
    ),

    _import_list: $ => prec.right(seq(
      commaSep1(field('name', choice(
        $.identifier,
        $.aliased_import_name,
      ))),
      optional(','),
    )),

    aliased_import_name: $ => seq(
      field('name', $.identifier),
      'as',
      field('alias', $.identifier),
    ),

    // `from __python__ import flag, no_flag` -- compiler scoped flags
    scoped_flag_statement: $ => seq(
      'from',
      '__python__',
      'import',
      choice(
        seq('(', $._flag_list, ')'),
        $._flag_list,
      ),
    ),

    _flag_list: $ => prec.right(seq(
      commaSep1(field('flag', $.identifier)),
      optional(','),
    )),

    dotted_name: $ => prec.left(1, sep1($.identifier, '.')),

    // ---- compound statements --------------------------------------------

    if_statement: $ => seq(
      'if',
      field('condition', $._expression),
      ':',
      field('consequence', $._suite),
      repeat(field('alternative', $.elif_clause)),
      optional(field('alternative', $.else_clause)),
    ),

    elif_clause: $ => seq(
      'elif',
      field('condition', $._expression),
      ':',
      field('consequence', $._suite),
    ),

    else_clause: $ => seq(
      'else',
      ':',
      field('body', $._suite),
    ),

    for_statement: $ => seq(
      'for',
      field('left', $._for_target),
      'in',
      field('right', choice($._expression, $.expression_list)),
      ':',
      field('body', $._suite),
      optional(field('alternative', $.else_clause)),
    ),

    _for_target: $ => choice(
      $.pattern,
      $.pattern_list,
    ),

    // native JavaScript for loop:  for v'i = 0; i < n; i++':
    for_js_statement: $ => seq(
      'for',
      field('condition', $.verbatim),
      ':',
      field('body', $._suite),
    ),

    while_statement: $ => seq(
      'while',
      field('condition', $._expression),
      ':',
      field('body', $._suite),
      optional(field('alternative', $.else_clause)),
    ),

    // do: ... .while cond
    do_statement: $ => seq(
      'do',
      ':',
      field('body', $._suite),
      '.',
      'while',
      field('condition', $._expression),
    ),

    try_statement: $ => seq(
      'try',
      ':',
      field('body', $._suite),
      choice(
        seq(
          repeat1($.except_clause),
          optional($.else_clause),
          optional($.finally_clause),
        ),
        $.finally_clause,
      ),
    ),

    except_clause: $ => seq(
      'except',
      optional(commaSep1($._expression)),
      optional(seq('as', field('alias', $.identifier))),
      ':',
      field('body', $._suite),
    ),

    finally_clause: $ => seq(
      'finally',
      ':',
      field('body', $._suite),
    ),

    with_statement: $ => seq(
      'with',
      commaSep1($.with_clause),
      ':',
      field('body', $._suite),
    ),

    with_clause: $ => seq(
      field('value', $._expression),
      optional(seq('as', field('alias', $._expression))),
    ),

    // ---- function & class definitions -----------------------------------

    function_definition: $ => seq(
      'def',
      field('name', $.identifier),
      field('parameters', $.parameters),
      optional(seq('->', field('return_type', $._expression))),
      ':',
      field('body', $._suite),
    ),

    async_function_definition: $ => seq(
      'async',
      'def',
      field('name', $.identifier),
      field('parameters', $.parameters),
      optional(seq('->', field('return_type', $._expression))),
      ':',
      field('body', $._suite),
    ),

    parameters: $ => seq(
      '(',
      optional($._parameters),
      ')',
    ),

    _parameters: $ => seq(
      commaSep1($._parameter),
      optional(','),
    ),

    _parameter: $ => choice(
      $.identifier,
      $.typed_parameter,
      $.default_parameter,
      $.typed_default_parameter,
      $.list_splat_parameter,
      $.dictionary_splat_parameter,
    ),

    typed_parameter: $ => seq(
      field('name', $.identifier),
      ':',
      field('type', $._expression),
    ),

    default_parameter: $ => seq(
      field('name', $.identifier),
      '=',
      field('value', $._expression),
    ),

    typed_default_parameter: $ => seq(
      field('name', $.identifier),
      ':',
      field('type', $._expression),
      '=',
      field('value', $._expression),
    ),

    list_splat_parameter: $ => seq(
      '*',
      field('name', $.identifier),
      optional(seq(':', field('type', $._expression))),
    ),
    dictionary_splat_parameter: $ => seq(
      '**',
      field('name', $.identifier),
      optional(seq(':', field('type', $._expression))),
    ),

    class_definition: $ => seq(
      'class',
      field('name', $.identifier),
      optional(field('superclasses', $.argument_list)),
      ':',
      field('body', $._suite),
    ),

    decorated_definition: $ => seq(
      repeat1($.decorator),
      field('definition', choice(
        $.function_definition,
        $.async_function_definition,
        $.class_definition,
      )),
    ),

    decorator: $ => seq(
      '@',
      $._expression,
      $._newline,
    ),

    // ---- suites / blocks -------------------------------------------------

    _suite: $ => choice(
      alias($._simple_statements, $.block),
      $.block,
    ),

    block: $ => seq(
      $._indent,
      repeat($._statement),
      $._dedent,
    ),

    // ---------------------------------------------------------------------
    // Expressions
    // ---------------------------------------------------------------------

    _expression: $ => choice(
      $._primary_expression,
      $.not_operator,
      $.boolean_operator,
      $.comparison_operator,
      $.binary_operator,
      $.unary_operator,
      $.conditional_expression,
      $.await,
      $.assignment,
      $.augmented_assignment,
    ),

    _primary_expression: $ => choice(
      $.identifier,
      $.this,
      $.true,
      $.false,
      $.none,
      $.number,
      $.string,
      $.f_string,
      $.concatenated_string,
      $.regex,
      $.verbatim,
      $.list,
      $.set,
      $.dictionary,
      $.tuple,
      $.parenthesized_expression,
      $.list_comprehension,
      $.set_comprehension,
      $.dictionary_comprehension,
      $.generator_expression,
      $.attribute,
      $.subscript,
      $.slice_call,
      $.call,
      $.new_expression,
      $.existential,
      $.anonymous_function,
    ),

    // ---- operators -------------------------------------------------------

    not_operator: $ => prec(PREC.not, seq(
      'not',
      field('argument', $._expression),
    )),

    boolean_operator: $ => choice(
      prec.left(PREC.and, seq(
        field('left', $._expression),
        field('operator', 'and'),
        field('right', $._expression),
      )),
      prec.left(PREC.or, seq(
        field('left', $._expression),
        field('operator', 'or'),
        field('right', $._expression),
      )),
    ),

    binary_operator: $ => {
      const table = [
        [prec.left, '+', PREC.plus],
        [prec.left, '-', PREC.plus],
        [prec.left, '*', PREC.times],
        [prec.left, '/', PREC.times],
        [prec.left, '//', PREC.times],
        [prec.left, '%', PREC.times],
        [prec.left, '@', PREC.times],
        [prec.right, '**', PREC.power],
        [prec.left, '|', PREC.bitwise_or],
        [prec.left, '^', PREC.bitwise_xor],
        [prec.left, '&', PREC.bitwise_and],
        [prec.left, '<<', PREC.shift],
        [prec.left, '>>', PREC.shift],
        [prec.left, '>>>', PREC.shift],
      ];

      return choice(...table.map(([fn, operator, precedence]) => fn(precedence, seq(
        field('left', $._expression),
        field('operator', operator),
        field('right', $._expression),
      ))));
    },

    unary_operator: $ => prec(PREC.unary, seq(
      field('operator', choice('+', '-', '~', 'typeof', 'void')),
      field('argument', $._expression),
    )),

    comparison_operator: $ => prec.left(PREC.compare, seq(
      $._expression,
      repeat1(seq(
        field('operator', choice(
          '<', '<=', '==', '===', '!=', '!==', '>=', '>',
          'in',
          seq('not', 'in'),
          'is',
          seq('is', 'not'),
          'instanceof',
        )),
        $._expression,
      )),
    )),

    // ternary conditional:  consequence if condition else alternative
    conditional_expression: $ => prec.right(PREC.conditional, seq(
      $._expression,
      'if',
      $._expression,
      'else',
      $._expression,
    )),

    // ---- postfix / primary chains ---------------------------------------

    attribute: $ => prec(PREC.member, seq(
      field('object', $._primary_expression),
      '.',
      field('attribute', $.identifier),
    )),

    subscript: $ => prec(PREC.member, seq(
      field('object', $._primary_expression),
      '[',
      field('subscript', choice($._expression, $.slice, $.expression_list)),
      ']',
    )),

    slice: $ => seq(
      optional($._expression),
      ':',
      optional($._expression),
      optional(seq(':', optional($._expression))),
    ),

    call: $ => prec(PREC.call, seq(
      field('function', $._primary_expression),
      field('arguments', $.argument_list),
    )),

    // A slice used as a call argument (delslice etc.) is just a subscript;
    // this alias keeps the primary-expression choice list explicit.
    slice_call: $ => prec(PREC.call, seq(
      field('function', $._primary_expression),
      '[',
      $.slice,
      ']',
    )),

    argument_list: $ => seq(
      '(',
      optional(choice(
        // a bare generator expression as the sole argument: f(x for x in y)
        seq(field('body', $._expression), $._comprehension_clauses),
        seq(commaSep1($._argument), optional(',')),
      )),
      ')',
    ),

    _argument: $ => choice(
      $._expression,
      $.keyword_argument,
      $.list_splat_argument,
      $.dictionary_splat_argument,
    ),

    // In a call, `name=value` is always a keyword argument (never an
    // assignment expression); the higher precedence enforces that.
    keyword_argument: $ => prec(1, seq(
      field('name', $.identifier),
      '=',
      field('value', $._expression),
    )),

    list_splat_argument: $ => seq('*', $._expression),
    dictionary_splat_argument: $ => seq('**', $._expression),

    new_expression: $ => prec.right(PREC.call, seq(
      'new',
      field('constructor', $._primary_expression),
    )),

    // The existential operator `?`. It has four forms:
    //   a?         -- existence check (null-like test)
    //   a?.b       -- safe attribute access
    //   a?[i]      -- safe subscript
    //   a?()       -- safe call
    //   a ? b      -- fallback / default operator (use b if a is null-like)
    existential: $ => prec.right(PREC.existential, seq(
      field('object', $._primary_expression),
      '?',
      optional(choice(
        seq('.', field('attribute', $.identifier)),
        seq('[', field('subscript', choice($._expression, $.slice)), ']'),
        field('arguments', $.argument_list),
        prec(-1, field('default', $._expression)),
      )),
    )),

    await: $ => prec(PREC.unary, seq('await', $._expression)),

    // ---- anonymous (lambda) functions -----------------------------------
    // The signature RapydScript feature: multi-line anonymous functions.

    // Anonymous function. RapydScript also allows an optional name on a
    // function *expression* (e.g. `x = def named(a): ...`).
    anonymous_function: $ => prec(PREC.lambda, seq(
      optional('async'),
      'def',
      optional(field('name', $.identifier)),
      field('parameters', $.parameters),
      optional(seq('->', field('return_type', $._expression))),
      ':',
      field('body', $._anon_suite),
    )),

    // The body of an anonymous function. Unlike a statement-level suite, the
    // inline form is NOT terminated by a newline: an inline `def(): a; b`
    // appearing inside a container ends at the enclosing `,`/`}`/`)` (or the
    // outer statement's newline). Semicolons chain statements into the body.
    _anon_suite: $ => choice(
      $.block,
      alias($._inline_body, $.block),
    ),

    _inline_body: $ => prec.right(seq(
      sep1($._inline_simple_statement, ';'),
      optional(';'),
    )),

    // Statements permitted in an inline anonymous-function body. This is a
    // curated subset: constructs like `import`, `with`, `global` never appear
    // inline in practice, and allowing them creates unresolvable ambiguities
    // with enclosing-container commas. They remain available in the multi-line
    // (block) form.
    _inline_simple_statement: $ => choice(
      $._expression_statement,
      $.return_statement,
      $.delete_statement,
      $.raise_statement,
      $.pass_statement,
      $.break_statement,
      $.continue_statement,
      $.assert_statement,
      $.yield_statement,
    ),

    // ---- containers ------------------------------------------------------

    list: $ => seq(
      '[',
      optional(seq(commaSep1($._collection_element), optional(','))),
      ']',
    ),

    _collection_element: $ => choice(
      $._expression,
      $.list_splat_argument,
    ),

    set: $ => seq(
      '{',
      commaSep1($._collection_element),
      optional(','),
      '}',
    ),

    // A tuple is `()`, `(a,)`, or `(a, b, ...)`. A single element with no
    // trailing comma, `(a)`, is a parenthesized_expression (grouping) instead.
    tuple: $ => seq(
      '(',
      optional(choice(
        seq($._collection_element, ','),
        seq(
          $._collection_element,
          repeat1(seq(',', $._collection_element)),
          optional(','),
        ),
      )),
      ')',
    ),

    parenthesized_expression: $ => prec(1, seq(
      '(',
      choice($._expression, $.yield),
      ')',
    )),

    dictionary: $ => seq(
      '{',
      optional(seq(
        commaSep1(choice($.pair, $.dictionary_splat_argument)),
        optional(','),
      )),
      '}',
    ),

    pair: $ => seq(
      field('key', $._expression),
      ':',
      field('value', $._expression),
    ),

    // ---- comprehensions --------------------------------------------------

    list_comprehension: $ => seq(
      '[',
      field('body', $._expression),
      $._comprehension_clauses,
      ']',
    ),

    set_comprehension: $ => seq(
      '{',
      field('body', $._expression),
      $._comprehension_clauses,
      '}',
    ),

    dictionary_comprehension: $ => seq(
      '{',
      field('body', $.pair),
      $._comprehension_clauses,
      '}',
    ),

    generator_expression: $ => seq(
      '(',
      field('body', $._expression),
      $._comprehension_clauses,
      ')',
    ),

    _comprehension_clauses: $ => seq(
      $.for_in_clause,
      repeat(choice($.for_in_clause, $.if_clause)),
    ),

    for_in_clause: $ => seq(
      'for',
      field('left', $._for_target),
      'in',
      field('right', choice($._expression, $.expression_list)),
    ),

    if_clause: $ => seq(
      'if',
      $._expression,
    ),

    // ---- atoms / literals ------------------------------------------------

    concatenated_string: $ => prec.left(seq(
      choice($.string, $.f_string),
      repeat1(choice($.string, $.f_string)),
    )),

    f_string: $ => seq(
      $.fstring_start,
      repeat(choice(
        $.fstring_content,
        $.interpolation,
      )),
      $.fstring_end,
    ),

    interpolation: $ => seq(
      '{',
      field('expression', $._expression),
      optional(field('type_conversion', /![rsa]/)),
      optional(seq(':', field('format_spec', $.fstring_content))),
      '}',
    ),

    this: _ => 'this',
    true: _ => 'True',
    false: _ => 'False',
    none: _ => 'None',

    // string with optional r/u/b modifiers (the `v` modifier denotes a
    // verbatim JavaScript literal, handled separately; the `f` modifier
    // produces an f_string with structured interpolation nodes).
    string: _ => token(seq(
      optional(/[rRuUbB]+/),
      choice(
        seq('"""', repeat(choice(/[^"\\]/, /\\(.|\n)/, /"[^"]/, /""[^"]/)), '"""'),
        seq("'''", repeat(choice(/[^'\\]/, /\\(.|\n)/, /'[^']/, /''[^']/)), "'''"),
        seq('"', repeat(choice(/[^"\\\n]/, /\\(.|\n)/)), '"'),
        seq("'", repeat(choice(/[^'\\\n]/, /\\(.|\n)/)), "'"),
      ),
    )),

    // verbatim JavaScript literal:  v'...'  v"..."  (optionally combined with
    // other string modifiers, e.g. rv'...'). At least one `v` is required.
    verbatim: _ => token(seq(
      /[rRuUfFbBvV]*[vV][rRuUfFbBvV]*/,
      choice(
        seq('"""', repeat(choice(/[^"\\]/, /\\(.|\n)/, /"[^"]/, /""[^"]/)), '"""'),
        seq("'''", repeat(choice(/[^'\\]/, /\\(.|\n)/, /'[^']/, /''[^']/)), "'''"),
        seq('"', repeat(choice(/[^"\\\n]/, /\\(.|\n)/)), '"'),
        seq("'", repeat(choice(/[^'\\\n]/, /\\(.|\n)/)), "'"),
      ),
    )),

    number: _ => {
      const hex = /0[xX][0-9a-fA-F]+/;
      const binary = /0[bB][01]+/;
      const octal = /0[oO][0-7]+/;
      const decimal = /(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/;
      return token(choice(hex, binary, octal, decimal));
    },

    identifier: _ => /[A-Za-z_$ª-￿][A-Za-z0-9_$ª-￿]*/,

    comment: _ => token(seq('#', /.*/)),
  },
});

/**
 * Creates a rule to match one or more of the rule separated by a comma
 * @param {RuleOrLiteral} rule
 * @return {SeqRule}
 */
function commaSep1(rule) {
  return sep1(rule, ',');
}

/**
 * Creates a rule to match one or more occurrences of `rule` separated by `sep`
 * @param {RuleOrLiteral} rule
 * @param {RuleOrLiteral} separator
 * @return {SeqRule}
 */
function sep1(rule, separator) {
  return seq(rule, repeat(seq(separator, rule)));
}
