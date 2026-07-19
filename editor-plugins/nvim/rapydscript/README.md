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

- Neovim ≥ 0.10
- `rapydscript` on your `$PATH` (install with `npm install -g rapydscript-ng`)

## Installation

### lazy.nvim

```lua
{
    dir = '/path/to/editor-plugins/nvim/rapydscript',
    ft = 'rapydscript',
    opts = {},
}
```

**Example with options:**

```lua
{
    dir = "/path/to/editor-plugins/nvim/rapydscript",
    ft = "rapydscript",
    opts = {
        import_path   = "src:vendor",
        line_length   = 100,
        preferred_quote = "double",
    },
}
```

### Manual (no plugin manager)

Add the plugin directory to your runtime path and call `setup()`:

```lua
-- in ~/.config/nvim/init.lua
vim.opt.rtp:prepend("/path/to/rapydscript/nvim-lsp-plugin")
require("rapydscript").setup({
    import_path = "src:vendor",  -- optional
})
```

## Configuration reference

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `cmd` | `string[]` | `{"rapydscript","lsp"}` | Command used to start the server |
| `import_path` | `string\|nil` | `nil` | Colon-separated import directories, passed as `--import-path` |
| `line_length` | `number\|nil` | `nil` | Max line length for the formatter, passed as `--line-length` |
| `preferred_quote` | `string\|nil` | `nil` | `"single"` or `"double"`, passed as `--preferred-quote` |
| `filetypes` | `string[]` | `{"rapydscript"}` | Filetypes that trigger server attachment |
| `root_markers` | `string[]` | `{".git","package.json","rapydscript.json"}` | Files/dirs used to detect the project root |

## Changing settings at runtime

The server accepts live setting updates via the LSP
`workspace/didChangeConfiguration` notification — no restart needed.  Call
`require("rapydscript").update_settings(opts)` with any subset of the three
settings keys:

```lua
require("rapydscript").update_settings({
    import_path    = "src:vendor:lib",  -- new colon-separated search path
    line_length    = 100,               -- new max line length for the formatter
    preferred_quote = "double",         -- "single" or "double"
})
```

Only the keys you pass are updated; the rest keep their current values.

### Neovim user commands

A convenient way to expose this as editor commands — add to your config after
`setup()`:

```lua
-- :RapydImportPath src:vendor
vim.api.nvim_create_user_command("RapydImportPath", function(args)
    require("rapydscript").update_settings({ import_path = args.args })
end, { nargs = 1, desc = "Set RapydScript LSP import path" })

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
    opts = { import_path = "src:vendor" },
    config = function(_, opts)
        require("rapydscript").setup(opts)

        vim.api.nvim_create_user_command("RapydImportPath", function(args)
            require("rapydscript").update_settings({ import_path = args.args })
        end, { nargs = 1 })

        vim.api.nvim_create_user_command("RapydLineLength", function(args)
            require("rapydscript").update_settings({ line_length = tonumber(args.args) })
        end, { nargs = 1 })

        vim.api.nvim_create_user_command("RapydQuote", function(args)
            require("rapydscript").update_settings({ preferred_quote = args.args })
        end, { nargs = 1 })
    end,
}
```

When `import_path` changes the server immediately re-runs diagnostics on all
open files using the new search directories.  Changes to `line_length` and
`preferred_quote` take effect on the next format operation.

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
