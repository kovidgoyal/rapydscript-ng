# rapydscript.nvim

Neovim plugin that wires up the RapydScript LSP server (`rapydscript lsp`) as a
native Neovim LSP client for `.pyj` files.

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

- Neovim ≥ 0.12
- `rapydscript` on your `$PATH` (install with `npm install -g rapydscript-ng`), or the
  plugin directory must be inside a RapydScript repository checkout (the repo's own
  `bin/rapydscript` is used automatically as a fallback)
- **Syntax highlighting only**: a C compiler on your `$PATH` is required to compile the
  tree-sitter parser the first time the plugin loads.  On Linux/macOS any `cc`-compatible
  compiler works (gcc, clang, etc.).  On Windows, `cl` (MSVC) or `clang-cl` must be
  available — run Neovim from a Visual Studio Developer Command Prompt, or add the
  compiler to your `PATH` manually.  LSP features work regardless of whether compilation
  succeeds.

## Installation

Just add the following to your ``~/.config/nvim/init.lua``:

```lua

vim.pack.add({ { src = "https://github.com/kovidgoyal/rapydscript-ng", name = "rapydscript" } }, {
    load = function(plug_data)
        vim.cmd.packadd(plug_data.spec.name)
        for _, pack in ipairs(vim.pack.get({ plug_data.spec.name })) do
            vim.opt.rtp:append(pack.path .. "/editor-plugins/nvim/rapydscript")
            require('rapydscript').setup({ 
                line_length = 160,
                preferred_quote = "double",
            })
        end
    end
})
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

To add custom search locations alongside the defaults:

```lua
opts = {
    import_path_patterns = { ".", "src", "src/pyj", "vendor/pyj" },
}
```

To disable auto-detection entirely, pass an empty list:

```lua
opts = {
    import_path_patterns = {},
}
```

## Changing settings at runtime

The server accepts live setting updates via the LSP
`workspace/didChangeConfiguration` notification — no restart needed.  Call
`require("rapydscript").update_settings(opts)` with any subset of the two
settings keys:

```lua
require("rapydscript").update_settings({
    line_length    = 100,               -- new max line length for the formatter
    preferred_quote = "double",         -- "single" or "double"
    join_lines      = true,             -- join short multi-line statements onto one line
})
```

Only the keys you pass are updated; the rest keep their current values.

### Neovim user commands

A convenient way to expose this as editor commands — add to your config after
`setup()`:

```lua
-- :RapydLineLength 100
vim.api.nvim_create_user_command("RapydLineLength", function(args)
    require("rapydscript").update_settings({ line_length = tonumber(args.args) })
end, { nargs = 1, desc = "Set RapydScript LSP line length" })

-- :RapydQuote double
vim.api.nvim_create_user_command("RapydQuote", function(args)
    require("rapydscript").update_settings({ preferred_quote = args.args })
end, { nargs = 1, desc = "Set RapydScript LSP preferred quote style" })
```

### In lazy.nvim config

If you want the commands available automatically, put them in the `config`
function:

```lua
{
    dir = "/path/to/rapydscript/nvim-lsp-plugin",
    ft = "rapydscript",
    opts = { line_length = 100 },
    config = function(_, opts)
        require("rapydscript").setup(opts)

        vim.api.nvim_create_user_command("RapydLineLength", function(args)
            require("rapydscript").update_settings({ line_length = tonumber(args.args) })
        end, { nargs = 1 })

        vim.api.nvim_create_user_command("RapydQuote", function(args)
            require("rapydscript").update_settings({ preferred_quote = args.args })
        end, { nargs = 1 })
    end,
}
```

Changes to `line_length` and `preferred_quote` take effect on the next format operation.

## Keymaps

The plugin does not define any keymaps — it relies on the standard Neovim LSP
keymaps that are set up by `vim.lsp.buf.*`.  A minimal set to add to your LSP
`on_attach` or a `LspAttach` autocmd:

```lua
vim.api.nvim_create_autocmd("LspAttach", {
    callback = function(ev)
        local buf = ev.buf
        local map = function(mode, lhs, rhs)
            vim.keymap.set(mode, lhs, rhs, { buffer = buf })
        end
        map("n", "K",           vim.lsp.buf.hover)
        map("n", "gd",          vim.lsp.buf.definition)
        map("n", "gr",          vim.lsp.buf.references)
        map("n", "<leader>rn",  vim.lsp.buf.rename)
        map("n", "<leader>ca",  vim.lsp.buf.code_action)
        map("n", "<leader>f",   function() vim.lsp.buf.format({ async = true }) end)
    end,
})
```
