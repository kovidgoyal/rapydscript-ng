local M = {}

local function ver_str(v)
    return v and table.concat(v, ".") or "unknown"
end

function M.check()
    local h = vim.health
    local rs_ok, rs = pcall(require, "rapydscript")
    if not rs_ok then
        h.start("rapydscript")
        h.error("Failed to load plugin: " .. tostring(rs))
        return
    end

    -- Binary -------------------------------------------------------------------
    h.start("rapydscript binary")
    local info = rs._binary_info
    local sys  = info.system
    local repo = info.repo

    if sys then
        if sys.rejected then
            h.error(string.format(
                "System binary rejected: %s  (v%s < minimum 0.8.0)",
                sys.path, ver_str(sys.version)
            ))
        elseif sys.version then
            h.ok(string.format("System binary: %s  (v%s)", sys.path, ver_str(sys.version)))
        else
            h.warn(string.format("System binary: %s  (version unknown)", sys.path))
        end
    else
        h.warn("rapydscript not found on PATH")
    end

    if repo then
        h.ok(string.format("Repo binary:   %s  (v%s)", repo.path, ver_str(repo.version)))
    else
        h.info("No repo binary present")
    end

    if not sys and not repo then
        h.error("No rapydscript binary found — LSP will not start")
    end

    -- Tree-sitter --------------------------------------------------------------
    h.start("rapydscript tree-sitter")
    if rs._ts_so then
        h.ok("Parser compiled: " .. rs._ts_so)
    else
        h.warn("Tree-sitter parser not compiled (syntax highlighting unavailable)")
    end

    -- LSP clients --------------------------------------------------------------
    h.start("rapydscript LSP")
    local clients = vim.lsp.get_clients({ name = "rapydscript" })
    if #clients == 0 then
        h.warn("No active rapydscript LSP client")
    else
        for _, client in ipairs(clients) do
            local cmd_str = type(client.config.cmd) == "table"
                and table.concat(client.config.cmd, " ")
                or tostring(client.config.cmd)
            h.ok(string.format("Client #%d  root: %s", client.id, client.config.root_dir or "?"))
            h.info("cmd: " .. cmd_str)
        end
    end

    -- Settings -----------------------------------------------------------------
    h.start("rapydscript settings")
    local opts = rs._active_opts
    if not opts then
        h.warn("setup() has not been called — showing defaults")
        opts = rs.defaults
    else
        h.ok("setup() called")
    end

    h.info("cmd:                    " .. table.concat(opts.cmd, " "))
    h.info("line_length:            " .. tostring(opts.line_length))
    h.info("preferred_quote:        " .. tostring(opts.preferred_quote))
    h.info("filetypes:              " .. table.concat(opts.filetypes, ", "))
    h.info("root_markers:           " .. table.concat(opts.root_markers, ", "))
    h.info("import_path_patterns:   " .. table.concat(opts.import_path_patterns, ", "))
end

return M
