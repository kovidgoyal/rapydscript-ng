#!/usr/bin/env lua
--
-- nvim.lua
-- Copyright (C) 2026 Kovid Goyal <kovid at kovidgoyal.net>
--
-- Distributed under terms of the MIT license.
--

local M = {}

local _plugin_root = vim.fn.fnamemodify(
    debug.getinfo(1, "S").source:sub(2), ":p:h"
)
local _repo_root = vim.fn.fnamemodify(_plugin_root, ":h")
local ts_root = _repo_root .. '/tree-sitter'

-- _ts_so holds the .so/.dll path once the background build succeeds, nil otherwise.
local _ts_so = nil

-- Tracks the async build lifecycle.
local _build_state = {
    started = false, -- set when _build_async() is called
    done    = false, -- set when the job exits (success or failure)
    waiters = {},    -- callbacks queued while the job is running
    error   = nil,   -- stderr from a failed build, or a plain error string
}

-- Mark the build finished, optionally record the .so path, and fire any waiters.
local function _build_finish(success, so, err)
    if success then _ts_so = so end
    _build_state.done    = true
    _build_state.error   = err or nil
    local ws             = _build_state.waiters
    _build_state.waiters = {}
    for _, cb in ipairs(ws) do
        vim.schedule(cb)
    end
end

-- Run cb immediately if the build is already done; otherwise enqueue it.
local function _when_built(cb)
    if _build_state.done then
        cb()
    else
        table.insert(_build_state.waiters, cb)
    end
end

-- Register the compiled shared library with neovim's tree-sitter runtime.
-- Returns true on success.
local function _register_queries()
    local queries_dir = ts_root .. '/queries/'
    vim.treesitter.query.set(
        'rapydscript', 'highlights', table.concat(vim.fn.readfile(queries_dir .. 'highlights.scm'), "\n"))
    vim.treesitter.query.set(
        'rapydscript', 'indents', table.concat(vim.fn.readfile(queries_dir .. 'indents.scm'), "\n"))
    vim.treesitter.query.set(
        'rapydscript', 'injections', table.concat(vim.fn.readfile(queries_dir .. 'injections.scm'), "\n"))
    vim.treesitter.query.set(
        'rapydscript', 'locals', table.concat(vim.fn.readfile(queries_dir .. 'locals.scm'), "\n"))
end


local function _load_parser(so)
    vim.treesitter.language.register("rapydscript", "rapydscript")
    local ok, err = pcall(vim.treesitter.language.add, "rapydscript", { path = so })
    if not ok then
        vim.notify("rapydscript: failed to load tree-sitter parser: " .. tostring(err), vim.log.levels.ERROR)
        return false
    end
    _register_queries()
    return true
end

-- Compile the tree-sitter parser in a background job.
local function _build_async()
    _build_state.started = true

    local ts_src = ts_root .. "/src"
    local parser_c = ts_src .. "/parser.c"
    local scanner_c = ts_src .. "/scanner.c"
    if vim.fn.filereadable(parser_c) == 0 then
        local msg = "parser.c not found: " .. parser_c
        vim.notify("rapydscript: " .. msg, vim.log.levels.ERROR)
        _build_finish(false, nil, msg)
        return
    end

    local bin_dir = _plugin_root .. "/bin"
    vim.fn.mkdir(bin_dir, "p")

    local is_win = vim.fn.has("win32") == 1
    local lib_ext = is_win and ".dll" or ".so"
    local so = bin_dir .. "/rapydscript" .. lib_ext

    local so_mtime = vim.fn.getftime(so)
    local needs = so_mtime < 0
        or vim.fn.getftime(parser_c) > so_mtime
        or vim.fn.getftime(scanner_c) > so_mtime

    if not needs then
        -- Already up-to-date; load the existing .so and mark done without spawning a job.
        _build_finish(_load_parser(so), so)
        return
    end

    local cmd
    if is_win then
        local compiler
        if vim.fn.exepath("cl") ~= "" then
            compiler = "cl"
        elseif vim.fn.exepath("clang-cl") ~= "" then
            compiler = "clang-cl"
        else
            local msg = "tree-sitter syntax highlighting requires cl or clang-cl on PATH"
            vim.notify("rapydscript: " .. msg, vim.log.levels.ERROR)
            _build_finish(false, nil, msg)
            return
        end
        -- /LD = build DLL, /nologo = suppress banner, /O2 = optimize,
        -- /I = include path, /Fe: = output DLL path
        cmd = string.format(
            '"%s" /LD /nologo /O2 /I"%s" /Fe:"%s" "%s" "%s"',
            compiler, ts_src, so, parser_c, scanner_c
        )
    else
        local shared = vim.loop.os_uname().sysname == "Darwin" and "-dynamiclib" or "-shared"
        cmd = { "cc", shared, "-fPIC", "-Os", "-I", ts_src, "-o", so, parser_c, scanner_c }
    end

    vim.notify("rapydscript: compiling tree-sitter parser…", vim.log.levels.INFO)

    local stderr_lines = {}
    vim.fn.jobstart(cmd, {
        on_stdout = function(_, _data) end,
        on_stderr = function(_, data)
            if data then vim.list_extend(stderr_lines, data) end
        end,
        on_exit = function(_, code)
            vim.schedule(function()
                if code ~= 0 then
                    local stderr = table.concat(stderr_lines, "\n")
                    vim.notify(
                        "rapydscript: tree-sitter compile failed:\n" .. stderr,
                        vim.log.levels.ERROR
                    )
                    _build_finish(false, nil, stderr)
                    return
                end
                _build_finish(_load_parser(so), so, nil)
            end)
        end,
    })
end

local function _start_treesitter(bufnr)
    _when_built(function()
        if not _ts_so then return end
        local ts_ok, ts_err = pcall(vim.treesitter.start, bufnr, "rapydscript")
        if not ts_ok then
            vim.notify("rapydscript: tree-sitter start failed: " .. tostring(ts_err), vim.log.levels.ERROR)
        end
    end)
end

-- Populates M._binary_info as a side-effect.
local function _default_lsp_cmd()
    local repo_bin = _repo_root .. "/bin/rapydscript"
    M._binary_info.repo = { path = repo_bin }
    if vim.fn.has("win32") == 1 then
        -- On Windows the shebang is not honoured; invoke via node explicitly.
        return { "node", repo_bin, "lsp" }
    end
    return { repo_bin, "lsp" }
end

-- Expose tree-sitter compilation result for checkhealth.
-- Blocks up to 30 s if the background build is still running.
M._tree_sitter_path = function()
    if _build_state.started and not _build_state.done then
        vim.wait(30000, function() return _build_state.done end, 50)
    end
    return _ts_so
end

-- Expose the build error (if any) for checkhealth.
-- Must be called after _tree_sitter_path() so the build is already settled.
M._tree_sitter_error = function()
    return _build_state.error
end

-- Populated by _default_lsp_cmd() below; read by lua/rapydscript/health.lua.
M._binary_info = { system = nil, repo = nil }

-- Expand glob patterns relative to root, keep only dirs that contain .pyj files,
-- and return them colon-separated.  Returns nil when nothing matches.
local function _resolve_import_paths(root, patterns)
    local seen = {}
    local dirs = {}
    for _, pat in ipairs(patterns) do
        local matches = vim.fn.glob(root .. "/" .. pat, false, true)
        for _, path in ipairs(matches) do
            local norm = vim.fn.fnamemodify(path, ":p"):gsub("/$", "")
            if not seen[norm] and vim.fn.isdirectory(norm) == 1 then
                if #vim.fn.glob(norm .. "/*.pyj", false, true) > 0 then
                    seen[norm] = true
                    dirs[#dirs + 1] = norm
                end
            end
        end
    end
    return #dirs > 0 and table.concat(dirs, ":") or nil
end

M.defaults = {
    cmd = _default_lsp_cmd(),
    -- Glob patterns relative to the project root; matching dirs that contain
    -- .pyj files are passed automatically as --import-path to the LSP server.
    import_path_patterns = { ".", "src", "src/pyj" },
    line_length = nil,
    preferred_quote = nil,
    filetypes = { "rapydscript" },
    root_markers = { ".git", "package.json", "rapydscript.json" },
}

-- Current runtime settings, kept in sync whenever update_settings() is called.
M._settings = {}

local function build_cmd(opts, import_path)
    local cmd = vim.deepcopy(opts.cmd)
    if import_path then
        vim.list_extend(cmd, { "--import-path", import_path })
    end
    if opts.line_length then
        vim.list_extend(cmd, { "--line-length", tostring(opts.line_length) })
    end
    if opts.preferred_quote then
        vim.list_extend(cmd, { "--preferred-quote", opts.preferred_quote })
    end
    if opts.join_lines then
        vim.list_extend(cmd, { "--join-lines" })
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
--   line_length     (number)
--   preferred_quote (string)  -- "single" | "double"
function M.update_settings(new_settings)
    new_settings = new_settings or {}

    -- Merge into the module-level settings table.
    if new_settings.line_length ~= nil then
        M._settings.lineLength = new_settings.line_length
    end
    if new_settings.preferred_quote ~= nil then
        M._settings.preferredQuote = new_settings.preferred_quote
    end
    if new_settings.join_lines ~= nil then
        M._settings.joinLines = new_settings.join_lines
    end

    local clients = vim.lsp.get_clients({ name = "rapydscript" })
    if #clients == 0 then
        vim.notify("rapydscript: no active LSP client found", vim.log.levels.WARN)
        return
    end
    for _, client in ipairs(clients) do
        client:notify("workspace/didChangeConfiguration", {
            settings = { rapydscript = M._settings },
        })
    end
end

function M.setup(opts)
    vim.filetype.add({ extension = { pyj = 'rapydscript' } })
    opts = vim.tbl_deep_extend("force", M.defaults, opts or {})
    M._active_opts = opts

    -- Seed the runtime settings table from the initial opts so that partial
    -- update_settings() calls later always send the full current state.
    M._settings = {
        lineLength     = opts.line_length,
        preferredQuote = opts.preferred_quote,
        joinLines      = opts.join_lines,
    }
    _build_async()

    vim.api.nvim_create_autocmd("FileType", {
        pattern = opts.filetypes,
        callback = function(ev)
            vim.bo[ev.buf].syntax = "off" -- use treesitter for syntax highlighting
            _start_treesitter(ev.buf)
            local root = vim.fs.root(ev.buf, opts.root_markers)
            local import_path = root
                and _resolve_import_paths(root, opts.import_path_patterns)
                or nil
            vim.lsp.start({
                name = "rapydscript",
                cmd = build_cmd(opts, import_path),
                root_dir = root or vim.fn.getcwd(),
                capabilities = make_capabilities(),
                settings = {
                    rapydscript = M._settings,
                },
            })
        end,
    })
end

return M
