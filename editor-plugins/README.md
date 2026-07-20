# Plugins to integrate with editors

Wires up the RapydScript LSP server (`rapydscript lsp`) as a
LSP client for various editors (currently only Neovim).
It also enables treesitter based syntax highlighting.

## Features

Provided by the LSP server — no extra plugins required:

- **Completions** — in-scope symbols, builtins, keywords, and member completion (`mod.<TAB>`)
- **Diagnostics** — lint checks and unresolved import warnings, updated as you type
- **Hover** (`K`) — kind, origin, and docstring of the symbol under the cursor
- **Go to definition** (`gd`) — including jumping into imported modules
- **Find references** (`gr`) — resolved across files through the import graph
- **Rename** (`<leader>rn`) — renames everywhere across the workspace
- **Code actions** (`<leader>ca`) — remove unused import/local, add `# noqa`, format document
- **Document formatting** (`<leader>f`) — same as `rapydscript fmt`
- **Document symbols** — outline view via any symbols picker

## Requirements

- `rapydscript` on your `$PATH` (install with `npm install -g rapydscript-ng`), or the
  plugin directory must be inside a RapydScript repository checkout (the repo's own
  `bin/rapydscript` is used automatically as a fallback)
- **Syntax highlighting only**: a C compiler on your `$PATH` is required to compile the
  tree-sitter parser the first time the plugin loads.  On Linux/macOS any `cc`-compatible
  compiler works (gcc, clang, etc.).  On Windows, `cl` (MSVC) or `clang-cl` must be
  available. LSP features work regardless of whether compilation
  succeeds.

## Neovim Installation

Needs Neovim >= 0.12. Just add the following to your ``~/.config/nvim/init.lua``, changing the
options to suit yourself:

```lua
vim.pack.add({ { src = "https://github.com/kovidgoyal/rapydscript-ng", name = "rapydscript" } }, {
    load = function(plug_data)
        vim.cmd.packadd(plug_data.spec.name)
        for _, pack in ipairs(vim.pack.get({ plug_data.spec.name })) do
            vim.opt.rtp:append(pack.path .. "/editor-plugins/nvim/rapydscript")
            dofile(pack.path .. '/editor-plugins/nvim.lua').setup({
                -- options you should customize
                line_length = 80,
                preferred_quote = "single",
            })
        end
    end
})
```

Or if you want to load it manually for older versions of Neovim:

```lua
dofile("/path/to/rapydscript/editor-plugins/nvim.lua").setup()
```

## Configuration reference

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `cmd` | `string[]` | `{"rapydscript","lsp"}` | Command used to start the server |
| `import_path_patterns` | `string[]` | `{".", "src", "src/pyj"}` | Glob patterns relative to the project root; matching directories that contain `.pyj` files are passed automatically as `--import-path` |
| `line_length` | `number\|nil` | `nil` | Max line length for the formatter, passed as `--line-length` |
| `preferred_quote` | `string\|nil` | `nil` | `"single"` or `"double"`, passed as `--preferred-quote` |
| `join_lines` | `boolean\|nil` | `nil` | When `true`, multi-line statements that fit within `line_length` are joined onto one line, passed as `--join-lines`. Disabled by default. |
| `filetypes` | `string[]` | `{"rapydscript"}` | Filetypes that trigger server attachment |
| `root_markers` | `string[]` | `{".git","package.json","rapydscript.json"}` | Files/dirs used to detect the project root |

### Automatic import path detection

When a project root is found (via `root_markers`), the plugin expands each pattern in
`import_path_patterns` as a glob relative to that root.  Any matching directory that
contains at least one `.pyj` file is added to the server's import search path
automatically — no manual configuration needed for standard project layouts.

If no project root is detected the setting has no effect.

To add custom search locations alongside the defaults, use
``import_path_patterns``.
