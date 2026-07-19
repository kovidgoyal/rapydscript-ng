local M = {}

M.defaults = {
    cmd = { "rapydscript", "lsp" },
    import_path = nil,
    line_length = nil,
    preferred_quote = nil,
    filetypes = { "rapydscript" },
    root_markers = { ".git", "package.json", "rapydscript.json" },
}

-- Current runtime settings, kept in sync whenever update_settings() is called.
M._settings = {}

local function build_cmd(opts)
    local cmd = vim.deepcopy(opts.cmd)
    if opts.import_path then
        vim.list_extend(cmd, { "--import-path", opts.import_path })
    end
    if opts.line_length then
        vim.list_extend(cmd, { "--line-length", tostring(opts.line_length) })
    end
    if opts.preferred_quote then
        vim.list_extend(cmd, { "--preferred-quote", opts.preferred_quote })
    end
    return cmd
end

local function make_capabilities()
    local caps = vim.lsp.protocol.make_client_capabilities()
    -- Tell the server we support dynamic registration for workspace/didChangeConfiguration
    -- so it will register that notification and accept live setting updates.
    caps.workspace = caps.workspace or {}
    caps.workspace.didChangeConfiguration = { dynamicRegistration = true }
    return caps
end

-- Send workspace/didChangeConfiguration to every active rapydscript client.
-- `new_settings` is a table with any subset of:
--   import_path     (string)  -- colon-separated list of directories
--   line_length     (number)
--   preferred_quote (string)  -- "single" | "double"
function M.update_settings(new_settings)
    new_settings = new_settings or {}

    -- Merge into the module-level settings table.
    if new_settings.import_path ~= nil then
        M._settings.importPath = new_settings.import_path
    end
    if new_settings.line_length ~= nil then
        M._settings.lineLength = new_settings.line_length
    end
    if new_settings.preferred_quote ~= nil then
        M._settings.preferredQuote = new_settings.preferred_quote
    end

    local clients = vim.lsp.get_clients({ name = "rapydscript" })
    if #clients == 0 then
        vim.notify("rapydscript: no active LSP client found", vim.log.levels.WARN)
        return
    end
    for _, client in ipairs(clients) do
        client.notify("workspace/didChangeConfiguration", {
            settings = { rapydscript = M._settings },
        })
    end
end

function M.setup(opts)
    opts = vim.tbl_deep_extend("force", M.defaults, opts or {})
    M._active_opts = opts

    -- Seed the runtime settings table from the initial opts so that partial
    -- update_settings() calls later always send the full current state.
    M._settings = {
        importPath    = opts.import_path,
        lineLength    = opts.line_length,
        preferredQuote = opts.preferred_quote,
    }

    vim.filetype.add({ extension = { pyj = "rapydscript" } })

    vim.api.nvim_create_autocmd("FileType", {
        pattern = opts.filetypes,
        callback = function(ev)
            local root = vim.fs.root(ev.buf, opts.root_markers) or vim.fn.getcwd()
            vim.lsp.start({
                name = "rapydscript",
                cmd = build_cmd(opts),
                root_dir = root,
                capabilities = make_capabilities(),
                settings = {
                    rapydscript = M._settings,
                },
            })
        end,
    })
end

return M
