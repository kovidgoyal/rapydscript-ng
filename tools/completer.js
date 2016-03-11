/* vim:fileencoding=utf-8
 * 
 * Copyright (C) 2016 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the GPLv3 license
 */


module.exports = function(compiler, options) {
    "use strict";
    var all_keywords = compiler.ALL_KEYWORDS.split(' ');
    var vm = require('vm');
    options = options || {};
    if (!options.enum_global) options.enum_global = "var global = Function('return this')(); Object.getOwnPropertyNames(global);";

    function global_names(ctx) {
        try {
            var ans = vm.runInContext(options.enum_global, ctx);
            ans = ans.concat(all_keywords);
            ans.sort();
            var seen = {};
            ans.filter(function (item) { 
                if (Object.prototype.hasOwnProperty.call(seen, item)) return false;
                seen[item] = true;
                return true;
            });
            return ans;
        } catch(e) {
            console.log(e.stack || e.toString());
        }
        return [];
    }

    function object_names(obj, prefix) {
        if (obj === null || obj === undefined) return [];
        var groups = [], prefix_len = prefix.length, p;

        function prefix_filter(name) { return (prefix_len) ? (name.substr(0, prefix_len) === prefix) : true; }

        function add(o) {
            var items = Object.getOwnPropertyNames(o).filter(prefix_filter);
            if (items.length) groups.push(items);
        }

        if (typeof obj === 'object' || typeof obj === 'function') {
            add(obj);
            p = Object.getPrototypeOf(obj);
        } else p = obj.constructor ? obj.constructor.prototype : null; 

        // Walk the prototype chain
        try {
            var sentinel = 5;
            while (p !== null && sentinel > 0) {
                add(p);
                p = Object.getPrototypeOf(p);
                // Circular refs possible? Let's guard against that.
                sentinel--;
            }
        } catch (e) {
            // console.error("completion error walking prototype chain:" + e);
        }
        if (!groups.length) return [];
        var seen = {}, ans = [];
        function uniq(name) {
            if (Object.prototype.hasOwnProperty.call(seen, name)) return false;
            seen[name] = true;
            return true;
        }
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            group.sort();
            ans = ans.concat(group.filter(uniq));
            ans.push('');  // group separator

        }
        while (ans.length && ans[ans.length - 1] === '') ans.pop();
        return ans;
    }

    function prefix_matches(prefix, items) {
        var len = prefix.length;
        var ans = items.filter(function(item) { return item.substr(0, len) === prefix; });
        ans.sort();
        return ans;
    }

    function find_completions(line, ctx) {
        var t;
        try {
            t = compiler.tokenizer(line, '<repl>');
        } catch(e) { return []; }
        var tokens = [], token;
        while (true) {
            try {
                token = t();
            } catch (e) { return []; }
            if (token.type === 'eof') break;
            if (token.type === 'punc' && '(){},;:'.indexOf(token.value) > -1)
                tokens = [];
            tokens.push(token);
        }
        if (!tokens.length) {
            // New line or trailing space
            return [global_names(ctx), ''];
        }
        var last_tok = tokens[tokens.length - 1];
        if (last_tok.value === '.' || (last_tok.type === 'name' && compiler.IDENTIFIER_PAT.test(last_tok.value))) {
            last_tok = last_tok.value;
            if (last_tok === '.') {
                tokens.push({'value':''});
                last_tok = '';
            }
            if (tokens.length > 1 && tokens[tokens.length - 2].value === '.') {
                // A compound expression
                var prefix = '', result;
                tokens.slice(0, tokens.length - 2).forEach(function (tok) { prefix += tok.value; });
                if (prefix) {
                    try {
                        result = vm.runInContext(prefix, ctx, {'displayErrors':false});
                    } catch(e) { return []; }
                    return [object_names(result, last_tok), last_tok];
                }
            } else {
                return [prefix_matches(last_tok, global_names(ctx)), last_tok];
            }
        }
        return [];
    }

    return find_completions;
};
