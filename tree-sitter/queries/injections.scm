; Language injections for RapydScript
; These let Neovim highlight embedded languages inside RapydScript source.

; Verbatim JavaScript literals ( v'...' ) contain raw JavaScript.
((verbatim) @injection.content
  (#set! injection.language "javascript"))

; Regular expression literals.
((regex) @injection.content
  (#set! injection.language "regex"))

; Comments (for TODO/FIXME highlighting via the `comment` parser, if installed).
((comment) @injection.content
  (#set! injection.language "comment"))
