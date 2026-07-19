# tree-sitter-rapydscript

A [tree-sitter](https://tree-sitter.github.io/tree-sitter/) grammar for
[RapydScript](../README.md) (`.pyj` files).

RapydScript is a Python-like language that compiles to JavaScript. This grammar
covers the language as implemented by `rapydscript-ng`, including the features
that distinguish it from Python:

- **multi-line anonymous functions** declared with `def(...)` / `async def(...)`
  (RapydScript's answer to Python's single-expression `lambda`), both inline
  (`f = def(a, b): return a + b`) and with an indented block body;
- the **existential operator** `?` in all its forms — `a?` (existence check),
  `a?.b` / `a?[i]` / `a?()` (safe access), and `a ? b` (default operator);
- **verbatim JavaScript** literals via the `v` string modifier (`v'...'`) and
  the native `for v'i=0; i<n; i++':` loop;
- JavaScript **regular-expression literals**, including the verbose
  `/// ... ///` form;
- `do: ... .while cond` loops;
- **scoped compiler flags** (`from __python__ import dict_literals, ...`).

It deliberately does **not** accept constructs that RapydScript itself rejects,
such as the walrus operator `:=`, `match`/`case`, or `*`-unpacking in assignment
targets.

It **does** handle the trickier corners of the language, including assignment as
an expression (`if m = re.exec(x):`, `a[i -= 1]`), keyword-vs-assignment
disambiguation in calls, named function *expressions* (`x = def named(a): ...`),
typed `*args`/`**kwargs`, bare generator arguments (`sum(x for x in xs)`),
multi-line anonymous-function arguments with the comma-on-the-next-line idiom,
and comma-first dict literals whose values are multi-line functions.

### Known limitations

A few rarely-used constructs — found only in the RapydScript compiler's own
source and standard library, not in ordinary programs — are not parsed. Every
file under `test/` (representative user code) and every example in the language
[README](../README.md) parses cleanly; the exceptions are:

- the colon-less one-line `if`: `if (cond) do_something()`;
- chained assignment whose value is a multi-line-block anonymous function:
  `a = b = def(): <block>`;
- a ternary used as the return value of an *inline* anonymous function that is
  itself a call argument, with a trailing `;`.

In these cases tree-sitter's error recovery still highlights the surrounding
code.

## Layout

```
tree-sitter/
├── grammar.js              # the grammar
├── tree-sitter.json        # grammar metadata (CLI)
├── package.json            # npm package metadata
├── src/
│   ├── parser.c            # generated parser (checked in)
│   ├── scanner.c           # external scanner: indentation + regex literals
│   ├── grammar.json        # generated
│   └── node-types.json     # generated
├── queries/
│   ├── highlights.scm      # syntax highlighting
│   └── injections.scm      # embedded-language injections
└── test/corpus/            # tree-sitter test suite
```

## Building & testing

From this directory:

```sh
tree-sitter generate     # regenerate src/parser.c from grammar.js
tree-sitter test         # run the corpus tests in test/corpus/
tree-sitter parse FILE   # parse a .pyj file and print its syntax tree
tree-sitter build        # compile the parser (+ scanner) into a shared object
```

## Using it in Neovim

With [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter),
register the parser and map the `.pyj` extension to it:

```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
parser_config.rapydscript = {
  install_info = {
    url = "/path/to/rapydscript-ng/tree-sitter", -- or a git URL
    files = { "src/parser.c", "src/scanner.c" },
    branch = "master",
  },
  filetype = "pyj",
}

vim.filetype.add({ extension = { pyj = "rapydscript" } })
```

Then `:TSInstall rapydscript`, and copy (or symlink) the `queries/` directory to
`queries/rapydscript/` inside your nvim-treesitter runtime path so the
`highlights.scm` and `injections.scm` queries are picked up.
