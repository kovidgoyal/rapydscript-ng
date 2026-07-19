; Smart indentation for RapydScript (nvim-treesitter indent queries).
;
; @indent.begin  — node whose body should be indented one level
; @indent.end    — node that closes an indent region (closing brackets)
; @indent.branch — keyword that sits at the same level as its opener
;                  (elif/else/except/finally)
; @indent.align  — opening bracket for alignment-based indent

; ---------------------------------------------------------------------------
; Compound statements that introduce an indented block
; ---------------------------------------------------------------------------

[
  (function_definition)
  (async_function_definition)
  (class_definition)
  (if_statement)
  (while_statement)
  (for_statement)
  (for_js_statement)
  (do_statement)
  (try_statement)
  (with_statement)
  (decorated_definition)
  (anonymous_function)
  (block_tailed_statement)
  (block)
] @indent.begin

; ---------------------------------------------------------------------------
; Continuation clauses — dedent back to the level of the opening keyword
; ---------------------------------------------------------------------------

(elif_clause) @indent.branch
(else_clause) @indent.branch
(except_clause) @indent.branch
(finally_clause) @indent.branch

; do { ... } .while — the trailing ".while" is at statement level
(do_statement "." @indent.branch)

; ---------------------------------------------------------------------------
; Bracket-delimited containers — alignment / one-level indent inside
; ---------------------------------------------------------------------------

[
  (argument_list)
  (parameters)
  (list)
  (tuple)
  (set)
  (dictionary)
  (list_comprehension)
  (set_comprehension)
  (dictionary_comprehension)
  (generator_expression)
  (parenthesized_expression)
] @indent.begin

[
  ")"
  "]"
  "}"
] @indent.end
