local M = {}

-- init.lua lives at <plugin>/lua/rapydscript/init.lua; 3 :h steps reach <plugin>/.
local _plugin_root = vim.fn.fnamemodify(
    debug.getinfo(1, "S").source:sub(2), ":p:h:h:h"
)
-- <plugin> is at <repo>/editor-plugins/nvim/rapydscript; 3 more :h steps reach <repo>/.
local _repo_root = vim.fn.fnamemodify(_plugin_root, ":h:h:h")

-- Compile the tree-sitter parser once per nvim instance at require() time.
-- Stores the .so path on success, nil if sources are absent or compilation fails.
local _ts_so = (function()
    local ts_src = _repo_root .. "/tree-sitter/src"
    local parser_c = ts_src .. "/parser.c"
    local scanner_c = ts_src .. "/scanner.c"
    if vim.fn.filereadable(parser_c) == 0 then return nil end

    local bin_dir = _plugin_root .. "/bin"
    vim.fn.mkdir(bin_dir, "p")
    local so = bin_dir .. "/rapydscript.so"

    local so_mtime = vim.fn.getftime(so)
    local needs = so_mtime < 0
        or vim.fn.getftime(parser_c) > so_mtime
        or vim.fn.getftime(scanner_c) > so_mtime

    if needs then
        local uname = vim.fn.system("uname -s"):gsub("%s+", "")
        local shared = uname == "Darwin" and "-dynamiclib" or "-shared"
        local cmd = table.concat({
            "cc", shared, "-fPIC", "-Os",
            "-I", vim.fn.shellescape(ts_src),
            "-o", vim.fn.shellescape(so),
            vim.fn.shellescape(parser_c),
            vim.fn.shellescape(scanner_c),
        }, " ")
        vim.notify("rapydscript: compiling tree-sitter parser…", vim.log.levels.INFO)
        local out = vim.fn.system(cmd)
        if vim.v.shell_error ~= 0 then
            vim.notify("rapydscript: tree-sitter compile failed:\n" .. out, vim.log.levels.ERROR)
            return nil
        end
    end

    return so
end)()

local function _start_treesitter(bufnr)
    if not _ts_so then return end

    -- Add tree-sitter dir to rtp so nvim resolves queries/rapydscript/*.scm.
    local ts_root = _repo_root .. "/tree-sitter"
    local rtp = vim.opt.rtp:get()
    if not vim.tbl_contains(rtp, ts_root) then
        vim.opt.rtp:append(ts_root)
    end

    local ok, err = pcall(vim.treesitter.language.add, "rapydscript", { path = _ts_so })
    if not ok then
        vim.notify("rapydscript: failed to load tree-sitter parser: " .. tostring(err), vim.log.levels.ERROR)
        return
    end

    local ts_ok, ts_err = pcall(vim.treesitter.start, bufnr, "rapydscript")
    if not ts_ok then
        vim.notify("rapydscript: tree-sitter start failed: " .. tostring(ts_err), vim.log.levels.ERROR)
    end
end

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

    vim.api.nvim_create_autocmd("FileType", {
        pattern = opts.filetypes,
        callback = function(ev)
            _start_treesitter(ev.buf)
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
