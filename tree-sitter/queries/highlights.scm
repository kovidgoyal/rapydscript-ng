; Syntax highlighting for RapydScript
; Capture names follow the nvim-treesitter conventions so this file works
; out-of-the-box in Neovim. More specific patterns come later so that they
; override the more general ones.

; ----------------------------------------------------------------------------
; Identifiers
; ----------------------------------------------------------------------------

(identifier) @variable

; ----------------------------------------------------------------------------
; Literals
; ----------------------------------------------------------------------------

(comment) @comment @spell

(string) @string
(verbatim) @string.special
(concatenated_string) @string
(regex) @string.regexp
(number) @number

(true) @boolean
(false) @boolean
(none) @constant.builtin
(this) @variable.builtin

; ----------------------------------------------------------------------------
; Function & class definitions
; ----------------------------------------------------------------------------

(function_definition
  name: (identifier) @function)

(async_function_definition
  name: (identifier) @function)

(class_definition
  name: (identifier) @type)

(anonymous_function) @function

; parameters
(parameters (identifier) @variable.parameter)
(typed_parameter name: (identifier) @variable.parameter)
(default_parameter name: (identifier) @variable.parameter)
(typed_default_parameter name: (identifier) @variable.parameter)
(list_splat_parameter name: (identifier) @variable.parameter)
(dictionary_splat_parameter name: (identifier) @variable.parameter)

(typed_parameter type: (identifier) @type)
(typed_default_parameter type: (identifier) @type)

; ----------------------------------------------------------------------------
; Calls
; ----------------------------------------------------------------------------

(call
  function: (identifier) @function.call)

(call
  function: (attribute
    attribute: (identifier) @function.method.call))

(new_expression
  constructor: (identifier) @type)

(decorator) @attribute
(decorator "@" @attribute)

; keyword arguments
(keyword_argument
  name: (identifier) @variable.parameter)

; attribute access
(attribute
  attribute: (identifier) @property)

; ----------------------------------------------------------------------------
; Keywords
; ----------------------------------------------------------------------------

[
  "def"
  "class"
  "async"
] @keyword.function

[
  "return"
  "yield"
  "raise"
  "del"
  "assert"
  "global"
  "nonlocal"
] @keyword

; single-token statements (their keyword is not separately queryable)
[
  (pass_statement)
  (break_statement)
  (continue_statement)
  (debugger_statement)
] @keyword

[
  "if"
  "elif"
  "else"
] @keyword.conditional

(conditional_expression ["if" "else"] @keyword.conditional.ternary)

[
  "for"
  "while"
  "do"
] @keyword.repeat

[
  "try"
  "except"
  "finally"
] @keyword.exception

[
  "import"
  "from"
  "as"
  "with"
] @keyword.import

"await" @keyword.coroutine
(yield "from" @keyword)

[
  "and"
  "or"
  "not"
  "in"
  "is"
  "new"
  "typeof"
  "void"
  "instanceof"
] @keyword.operator

; ----------------------------------------------------------------------------
; Operators & punctuation
; ----------------------------------------------------------------------------

[
  "+"
  "-"
  "*"
  "/"
  "//"
  "%"
  "**"
  "="
  "+="
  "-="
  "*="
  "/="
  "//="
  "%="
  "**="
  "&="
  "^="
  "|="
  ">>="
  "<<="
  ">>>="
  "=="
  "==="
  "!="
  "!=="
  "<"
  ">"
  "<="
  ">="
  "&"
  "|"
  "^"
  "~"
  "<<"
  ">>"
  ">>>"
  "->"
  "?"
  "@"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

[
  ","
  ":"
  "."
  ";"
] @punctuation.delimiter

; ----------------------------------------------------------------------------
; Builtins (common RapydScript / JavaScript globals)
; ----------------------------------------------------------------------------

((identifier) @constant.builtin
  (#any-of? @constant.builtin "undefined" "NaN" "Infinity"))

((identifier) @variable.builtin
  (#any-of? @variable.builtin "self" "arguments" "window" "document" "console"))

((identifier) @function.builtin
  (#any-of? @function.builtin
    "print" "len" "range" "enumerate" "list" "dict" "set" "str" "int" "float"
    "bool" "isinstance" "getattr" "setattr" "hasattr" "iter" "type" "abs"
    "min" "max" "sum" "sorted" "map" "filter" "zip" "repr" "jstype"))

((identifier) @type.builtin
  (#any-of? @type.builtin
    "Object" "Array" "String" "Number" "Boolean" "RegExp" "Date" "Error"
    "Exception" "TypeError" "ValueError" "KeyError" "IndexError" "Promise"
    "Map" "Set" "WeakMap" "WeakSet" "Image" "Symbol"))
