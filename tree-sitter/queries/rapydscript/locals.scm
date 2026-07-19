; Scope and definition tracking for RapydScript (nvim-treesitter locals queries).
;
; @local.scope       — node that introduces a new name scope
; @local.definition  — an identifier being declared/bound in the current scope
; @local.reference   — an identifier being looked up (read)

; ---------------------------------------------------------------------------
; Scopes
; ---------------------------------------------------------------------------

(module) @local.scope

(function_definition) @local.scope
(async_function_definition) @local.scope

; Anonymous functions create their own closure scope (the key RapydScript feature)
(anonymous_function) @local.scope
(block_tailed_statement) @local.scope

(class_definition) @local.scope

; ---------------------------------------------------------------------------
; Definitions
; ---------------------------------------------------------------------------

; Named function and class declarations
(function_definition
  name: (identifier) @local.definition)

(async_function_definition
  name: (identifier) @local.definition)

(class_definition
  name: (identifier) @local.definition)

; Named anonymous function expression:  factorial = def named(n): ...
(anonymous_function
  name: (identifier) @local.definition)

; Function parameters
(parameters (identifier) @local.definition)
(typed_parameter
  name: (identifier) @local.definition)
(default_parameter
  name: (identifier) @local.definition)
(typed_default_parameter
  name: (identifier) @local.definition)
(list_splat_parameter
  name: (identifier) @local.definition)
(dictionary_splat_parameter
  name: (identifier) @local.definition)

; Assignment targets
(assignment
  left: (identifier) @local.definition)
(assignment
  left: (pattern_list (pattern (identifier) @local.definition)))
(assignment
  left: (pattern (tuple_pattern (pattern (identifier) @local.definition))))
(assignment
  left: (pattern (list_pattern (pattern (identifier) @local.definition))))

; Augmented assignment also binds the target
(augmented_assignment
  left: (identifier) @local.definition)

; For-loop variables
(for_statement
  left: (identifier) @local.definition)
(for_statement
  left: (pattern_list (pattern (identifier) @local.definition)))
(for_in_clause
  left: (identifier) @local.definition)
(for_in_clause
  left: (pattern_list (pattern (identifier) @local.definition)))

; Import statements
(import_statement
  name: (dotted_name (identifier) @local.definition))

(import_from_statement
  name: (identifier) @local.definition)

; `import foo as bar` — bar is the local name
(aliased_import
  alias: (identifier) @local.definition)

; `from foo import baz as qux` — qux is the local name
(aliased_import_name
  alias: (identifier) @local.definition)

; `with expr as alias:`
(with_clause
  alias: (identifier) @local.definition)

; `except ExcType as e:`
(except_clause
  alias: (identifier) @local.definition)

; global / nonlocal declarations — the identifier becomes visible in the scope
(global_statement (identifier) @local.definition)
(nonlocal_statement (identifier) @local.definition)

; ---------------------------------------------------------------------------
; References
; ---------------------------------------------------------------------------

(identifier) @local.reference
