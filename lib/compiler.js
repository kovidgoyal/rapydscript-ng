(function(){
    "use strict";
    var _$rapyd$_Temp;
    var iterator_symbol = (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") ? Symbol.iterator : "iterator-Symbol-5d0927e5554349048cf0e3762a228256";
    function range(start, stop, step) {
            var length, idx, r;
            if (arguments.length <= 1) {
                stop = start || 0;
                start = 0;
            }
            step = arguments[2] || 1;
            length = Math.max(Math.ceil((stop - start) / step), 0);
            idx = 0;
            r = new Array(length);
            while (idx < length) {
                r[idx++] = start;
                start += step;
            }
            return r;
        }
    var len = (function _$rapyd$_len() {
            if (typeof Set === "function" && typeof Map === "function") {
                return function(obj) {
                    if (Array.isArray(obj) || typeof obj === "string") {
                        return obj.length;
                    }
                    if (obj instanceof Set || obj instanceof Map) {
                        return obj.size;
                    }
                    return Object.keys(obj).length;
                };
            }
            return function(obj) {
                if (Array.isArray(obj) || typeof obj === "string") {
                    return obj.length;
                }
                return Object.keys(obj).length;
            };
        })();
    function _$rapyd$_Iterable(iterable) {
            var iterator, ans, result;
            if (Array.isArray(iterable) || typeof iterable === "string") {
                return iterable;
            }
            if (typeof iterable[iterator_symbol] === "function") {
                iterator = typeof Map === "function" && iterable instanceof Map ? iterable.keys() : iterable[iterator_symbol]();
                ans = [];
                result = iterator.next();
                while (!result.done) {
                    ans.push(result.value);
                    result = iterator.next();
                }
                return ans;
            }
            return Object.keys(iterable);
        }
    function dir(item) {
            var arr;
            arr = [];
            for (var i in item) {
                arr.push(i);
            }
            return arr;
        }
    function _$rapyd$_in(val, arr) {
            if (Array.isArray(arr) || typeof arr === "string") {
                return arr.indexOf(val) !== -1;
            } else {
                if (arr.hasOwnProperty(val)) {
                    return true;
                }
                return false;
            }
        }
    function _$rapyd$_extends(child, parent) {
            child.prototype = Object.create(parent.prototype);
            child.prototype.constructor = child;
        }
    var symbolfor = (function _$rapyd$_symbolfor_polyfill() {
            if (typeof Symbol === "function" && typeof Symbol.for === "function") {
                return Symbol.for;
            }
            return function(name) {
                return name + "-Symbol-" + "5d0927e5554349048cf0e3762a228256";
            };
        })();
    function enumerate(iterable) {
            var ans, iterator;
            if (Array.isArray(iterable) || typeof iterable === "string") {
                ans = {
                    "_i": -1,
                    "next": function() {
                        this._i += 1;
                        if (this._i < iterable.length) {
                            return {
                                "done": false,
                                "value": [ this._i, iterable[this._i] ]
                            };
                        }
                        return {
                            "done": true
                        };
                    }
                };
                ans[iterator_symbol] = function() {
                    return this;
                };
                return ans;
            }
            if (typeof iterable[iterator_symbol] === "function") {
                iterator = typeof Map === "function" && iterable instanceof Map ? iterable.keys() : iterable[iterator_symbol]();
                ans = {
                    "_iterator": iterator,
                    "_i": -1,
                    "next": function() {
                        var r;
                        r = this._iterator.next();
                        if (r.done) {
                            return {
                                "done": true
                            };
                        }
                        this._i += 1;
                        return {
                            "done": false,
                            "value": [ this._i, r.value ]
                        };
                    }
                };
                ans[iterator_symbol] = function() {
                    return this;
                };
                return ans;
            }
            return enumerate(Object.keys(iterable));
        }
    var _$rapyd$_modules = {};
    _$rapyd$_modules["utils"] = {};
    _$rapyd$_modules["errors"] = {};
    _$rapyd$_modules["ast"] = {};
    _$rapyd$_modules["tokenizer"] = {};
    _$rapyd$_modules["parse"] = {};
    _$rapyd$_modules["output"] = {};

    (function(){
        var __name__ = "utils";
        var MAP;
        "use strict";
        function array_to_hash(a) {
            var ret, i;
            ret = Object.create(null);
            for (i = 0; i < len(a); i++) {
                ret[a[i]] = true;
            }
            return ret;
        }
        function slice(a, start) {
            return Array.prototype.slice.call(a, start || 0);
        }
        function characters(str_) {
            return str_.split("");
        }
        function member(name, array) {
            var i;
            for (i = array.length - 1; i > -1; i-=1) {
                if (array[i] === name) {
                    return true;
                }
            }
            return false;
        }
        function repeat_string(str_, i) {
            var d;
            if (i <= 0) {
                return "";
            }
            if (i === 1) {
                return str_;
            }
            d = repeat_string(str_, i >> 1);
            d += d;
            if (i & 1) {
                d += str_;
            }
            return d;
        }
        function DefaultsError(msg, defs) {
            this.msg = msg;
            this.defs = defs;
        }
        function defaults(args, defs, croak) {
            var ret, i;
            if (args === true) {
                args = {};
            }
            ret = args || {};
            if (croak) {
                for (i in ret) {
                    if (ret.hasOwnProperty(i) && !defs.hasOwnProperty(i)) {
                        throw new DefaultsError("`" + i + "` is not a supported option", defs);
                    }
                }
            }
            for (i in defs) {
                if (defs.hasOwnProperty(i)) {
                    ret[i] = args && args.hasOwnProperty(i) ? args[i] : defs[i];
                }
            }
            return ret;
        }
        function merge(obj, ext) {
            var i;
            for (i in ext) {
                if (ext.hasOwnProperty(i)) {
                    obj[i] = ext[i];
                }
            }
            return obj;
        }
        function noop() {
        }
        MAP = function() {
            var skip;
            function MAP(a, f, backwards) {
                var ret, top, i;
                ret = [];
                top = [];
                function doit() {
                    var val, is_last;
                    val = f(a[i], i);
                    is_last = val instanceof Last;
                    if (is_last) {
                        val = val.v;
                    }
                    if (val instanceof AtTop) {
                        val = val.v;
                        if (val instanceof Splice) {
                            top.push.apply(top, backwards ? val.v.slice().reverse() : val.v);
                        } else {
                            top.push(val);
                        }
                    } else if (val !== skip) {
                        if (val instanceof Splice) {
                            ret.push.apply(ret, backwards ? val.v.slice().reverse() : val.v);
                        } else {
                            ret.push(val);
                        }
                    }
                    return is_last;
                }
                if (Array.isArray(a)) {
                    if (backwards) {
                        for (i = a.length - 1; i > -1; i-=1) {
                            if (doit()) {
                                break;
                            }
                        }
                        ret.reverse();
                        top.reverse();
                    } else {
                        for (i = 0; i < len(a); i++) {
                            if (doit()) {
                                break;
                            }
                        }
                    }
                } else {
                    for (i in a) {
                        if (a.hasOwnProperty(i)) {
                            if (doit()) {
                                break;
                            }
                        }
                    }
                }
                return top.concat(ret);
            }
            MAP.at_top = function(val) {
                return new AtTop(val);
            };
            MAP.splice = function(val) {
                return new Splice(val);
            };
            MAP.last = function(val) {
                return new Last(val);
            };
            skip = MAP.skip = {};
            function AtTop(val) {
                this.v = val;
            }
            function Splice(val) {
                this.v = val;
            }
            function Last(val) {
                this.v = val;
            }
            return MAP;
        }.call(this);
        function push_uniq(array, el) {
            if (array.indexOf(el) < 0) {
                array.push(el);
            }
        }
        function string_template(text, props) {
            return text.replace(/\{(.+?)\}/g, function(str_, p) {
                return props[p];
            });
        }
        function remove(array, el) {
            var i;
            for (i = array.length - 1; i > -1; i-=1) {
                if (array[i] === el) {
                    array.splice(i, 1);
                }
            }
        }
        function mergeSort(array, cmp) {
            if (array.length < 2) {
                return array.slice();
            }
            function merge(a, b) {
                var r, ai, bi, i;
                r = [];
                ai = 0;
                bi = 0;
                i = 0;
                while (ai < a.length && bi < b.length) {
                    if (cmp(a[ai], b[bi]) <= 0) {
                        r[i] = a[ai];
                        ai += 1;
                    } else {
                        r[i] = b[bi];
                        bi += 1;
                    }
                    i += 1;
                }
                if (ai < a.length) {
                    r.push.apply(r, a.slice(ai));
                }
                if (bi < b.length) {
                    r.push.apply(r, b.slice(bi));
                }
                return r;
            }
            function _ms(a) {
                var m, left, right;
                if (a.length <= 1) {
                    return a;
                }
                m = Math.floor(a.length / 2);
                left = a.slice(0, m);
                right = a.slice(m);
                left = _ms(left);
                right = _ms(right);
                return merge(left, right);
            }
            return _ms(array);
        }
        function set_difference(a, b) {
            return a.filter(function(el) {
                return b.indexOf(el) < 0;
            });
        }
        function set_intersection(a, b) {
            return a.filter(function(el) {
                return b.indexOf(el) >= 0;
            });
        }
        function make_predicate(words) {
            var a, k;
            if (!Array.isArray(words)) {
                words = words.split(" ");
            }
            if (typeof Set === "function") {
                a = new Set(words);
                return function(x) {
                    return a.has(x);
                };
            } else {
                a = {};
                var _$rapyd$_Iter0 = _$rapyd$_Iterable(words);
                for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
                    k = _$rapyd$_Iter0[_$rapyd$_Index0];
                    a[k] = true;
                }
                return function(x) {
                    return a.hasOwnProperty(x);
                };
            }
        }
        function Dictionary() {
            this._values = Object.create(null);
            this._size = 0;
        }
        Dictionary.prototype = {
            "set": function(key, val) {
                if (!this.has(key)) {
                    this._size += 1;
                }
                this._values["$" + key] = val;
                return this;
            },
            "add": function(key, val) {
                if (this.has(key)) {
                    this.get(key).push(val);
                } else {
                    this.set(key, [ val ]);
                }
                return this;
            },
            "get": function(key) {
                return this._values["$" + key];
            },
            "del_": function(key) {
                if (this.has(key)) {
                    this._size -= 1;
                    delete this._values["$" + key];
                }
                return this;
            },
            "has": function(key) {
                return _$rapyd$_in("$" + key, this._values);
            },
            "each": function(f) {
                var i;
                for (i in this._values) {
                    f(this._values[i], i.substr(1));
                }
            },
            "size": function() {
                return this._size;
            },
            "map": function(f) {
                var ret, i;
                ret = [];
                for (i in this._values) {
                    ret.push(f(this._values[i], i.substr(1)));
                }
                return ret;
            }
        };
        _$rapyd$_modules["utils"]["MAP"] = MAP;

        _$rapyd$_modules["utils"]["array_to_hash"] = array_to_hash;

        _$rapyd$_modules["utils"]["slice"] = slice;

        _$rapyd$_modules["utils"]["characters"] = characters;

        _$rapyd$_modules["utils"]["member"] = member;

        _$rapyd$_modules["utils"]["repeat_string"] = repeat_string;

        _$rapyd$_modules["utils"]["DefaultsError"] = DefaultsError;

        _$rapyd$_modules["utils"]["defaults"] = defaults;

        _$rapyd$_modules["utils"]["merge"] = merge;

        _$rapyd$_modules["utils"]["noop"] = noop;

        _$rapyd$_modules["utils"]["push_uniq"] = push_uniq;

        _$rapyd$_modules["utils"]["string_template"] = string_template;

        _$rapyd$_modules["utils"]["remove"] = remove;

        _$rapyd$_modules["utils"]["mergeSort"] = mergeSort;

        _$rapyd$_modules["utils"]["set_difference"] = set_difference;

        _$rapyd$_modules["utils"]["set_intersection"] = set_intersection;

        _$rapyd$_modules["utils"]["make_predicate"] = make_predicate;

        _$rapyd$_modules["utils"]["Dictionary"] = Dictionary;
    })();

    (function(){
        var __name__ = "errors";
        function SyntaxError() {
            SyntaxError.prototype.__init__.apply(this, arguments);
        }
        _$rapyd$_extends(SyntaxError, Error);
        SyntaxError.prototype.__init__ = function __init__(message, filename, line, col, pos, is_eof) {
            var self = this;
            self.stack = new Error().stack;
            self.message = message;
            self.line = line;
            self.col = col;
            self.pos = pos;
            self.is_eof = is_eof;
            self.filename = filename;
            self.lineNumber = line;
            self.fileName = filename;
        };
        SyntaxError.prototype.toString = function toString() {
            var self = this;
            var ans;
            ans = self.message + " (line: " + self.line + ", col: " + self.col + ", pos: " + self.pos + ")";
            if (self.filename) {
                ans = self.filename + ":" + ans;
            }
            if (self.stack) {
                ans += "\n\n" + self.stack;
            }
            return ans;
        };

        function ImportError() {
            ImportError.prototype.__init__.apply(this, arguments);
        }
        _$rapyd$_extends(ImportError, SyntaxError);
        

        _$rapyd$_modules["errors"]["SyntaxError"] = SyntaxError;

        _$rapyd$_modules["errors"]["ImportError"] = ImportError;
    })();

    (function(){
        var __name__ = "ast";
        var AST_Token, AST_Node, AST_Statement, AST_Debugger, AST_Directive, AST_SimpleStatement, AST_Block, AST_BlockStatement, AST_EmptyStatement, AST_StatementWithBody, AST_DWLoop, AST_Do, AST_While, AST_ForIn, AST_ForJS, AST_ListComprehension, AST_SetComprehension, AST_DictComprehension, AST_With, AST_Scope, AST_Toplevel, AST_Import, AST_Imports, AST_Decorator, AST_Lambda, AST_Accessor, AST_Function, AST_Class, AST_Method, AST_Jump, AST_Exit, AST_Return, AST_Yield, AST_Throw, AST_LoopControl, AST_Break, AST_Continue, AST_If, AST_Switch, AST_SwitchBranch, AST_Default, AST_Case, AST_Try, AST_Catch, AST_Except, AST_Finally, AST_Definitions, AST_Var, AST_Const, AST_VarDef, AST_BaseCall, AST_Call, AST_ClassCall, AST_New, AST_Seq, AST_PropAccess, AST_Dot, AST_Sub, AST_Splice, AST_Unary, AST_UnaryPrefix, AST_UnaryPostfix, AST_Binary, AST_Conditional, AST_Assign, AST_Array, AST_Object, AST_ExpressiveObject, AST_ObjectProperty, AST_ObjectKeyVal, AST_Symbol, AST_SymbolAlias, AST_SymbolAccessor, AST_SymbolDeclaration, AST_SymbolVar, AST_ImportedVar, AST_SymbolConst, AST_SymbolNonlocal, AST_SymbolFunarg, AST_SymbolDefun, AST_SymbolLambda, AST_SymbolCatch, AST_SymbolRef, AST_This, AST_Constant, AST_String, AST_Verbatim, AST_Number, AST_RegExp, AST_Atom, AST_Null, AST_NaN, AST_Undefined, AST_Hole, AST_Infinity, AST_Boolean, AST_False, AST_True;
        "use strict";
        var noop = _$rapyd$_modules["utils"].noop;
        var string_template = _$rapyd$_modules["utils"].string_template;
        
        function DEFNODE(type, props, methods, base) {
            var self_props, code, i, proto, ctor;
            if (arguments.length < 4) {
                base = AST_Node;
            }
            if (!props) {
                props = [];
            } else {
                props = props.split(/\s+/);
            }
            self_props = props;
            if (base && base.PROPS) {
                props = props.concat(base.PROPS);
            }
            code = "return function AST_" + type + "(props){ if (props) { ";
            for (i = props.length - 1; i > -1; i-=1) {
                code += "this." + props[i] + " = props." + props[i] + ";";
            }
            proto = base && new base();
            if (proto && proto.initialize || methods && methods.initialize) {
                code += "this.initialize();";
            }
            code += "}}";
            ctor = new Function(code)();
            if (proto) {
                ctor.prototype = proto;
                ctor.BASE = base;
            }
            if (base) {
                base.SUBCLASSES.push(ctor);
            }
            ctor.prototype.CTOR = ctor;
            ctor.PROPS = props || null;
            ctor.SELF_PROPS = self_props;
            ctor.SUBCLASSES = [];
            if (type) {
                ctor.prototype.TYPE = ctor.TYPE = type;
            }
            if (methods) {
                for (i in methods) {
                    if (methods.hasOwnProperty(i)) {
                        if (/^\$/.test(i)) {
                            ctor[i.substr(1)] = methods[i];
                        } else {
                            ctor.prototype[i] = methods[i];
                        }
                    }
                }
            }
            ctor.DEFMETHOD = function(name, method) {
                this.prototype[name] = method;
            };
            return ctor;
        }
        AST_Token = DEFNODE("Token", "type value line col pos endpos nlb comments_before file", {}, null);
        AST_Node = DEFNODE("Node", "start end", {
            "clone": function() {
                return new this.CTOR(this);
            },
            "$documentation": "Base class of all AST nodes",
            "$propdoc": {
                "start": "[AST_Token] The first token of this node",
                "end": "[AST_Token] The last token of this node"
            },
            "_walk": function(visitor) {
                return visitor._visit(this);
            },
            "walk": function(visitor) {
                return this._walk(visitor);
            }
        }, null);
        AST_Node.warn_function = null;
        AST_Node.warn = function(txt, props) {
            if (AST_Node.warn_function) {
                AST_Node.warn_function(string_template(txt, props));
            }
        };
        AST_Statement = DEFNODE("Statement", null, {
            "$documentation": "Base class of all statements"
        });
        AST_Debugger = DEFNODE("Debugger", null, {
            "$documentation": "Represents a debugger statement"
        }, AST_Statement);
        AST_Directive = DEFNODE("Directive", "value scope", {
            "$documentation": "Represents a directive, like \"use strict\";",
            "$propdoc": {
                "value": "[string] The value of this directive as a plain string (it's not an AST_String!)",
                "scope": "[AST_Scope/S] The scope that this directive affects"
            }
        }, AST_Statement);
        AST_SimpleStatement = DEFNODE("SimpleStatement", "body", {
            "$documentation": "A statement consisting of an expression, i.e. a = 1 + 2",
            "$propdoc": {
                "body": "[AST_Node] an expression node (should not be instanceof AST_Statement)"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.body._walk(visitor);
                });
            }
        }, AST_Statement);
        function walk_body(node, visitor) {
            if (node.body instanceof AST_Statement) {
                node.body._walk(visitor);
            } else if (node.body) {
                node.body.forEach(function(stat) {
                    stat._walk(visitor);
                });
            }
        }
        AST_Block = DEFNODE("Block", "body", {
            "$documentation": "A body of statements (usually bracketed)",
            "$propdoc": {
                "body": "[AST_Statement*] an array of statements"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(this, function() {
                    walk_body(node, visitor);
                });
            }
        }, AST_Statement);
        AST_BlockStatement = DEFNODE("BlockStatement", null, {
            "$documentation": "A block statement"
        }, AST_Block);
        AST_EmptyStatement = DEFNODE("EmptyStatement", "stype", {
            "$documentation": "The empty statement (empty block or simply a semicolon)",
            "$propdoc": {
                "stype": "[string] the type of empty statement. Is ; for semicolons"
            },
            "_walk": function(visitor) {
                return visitor._visit(this);
            }
        }, AST_Statement);
        AST_StatementWithBody = DEFNODE("StatementWithBody", "body", {
            "$documentation": "Base class for all statements that contain one nested body: `For`, `ForIn`, `Do`, `While`, `With`",
            "$propdoc": {
                "body": "[AST_Statement] the body; this should always be present, even if it's an AST_EmptyStatement"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.body._walk(visitor);
                });
            }
        }, AST_Statement);
        AST_DWLoop = DEFNODE("DWLoop", "condition", {
            "$documentation": "Base class for do/while statements",
            "$propdoc": {
                "condition": "[AST_Node] the loop condition.  Should not be instanceof AST_Statement"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.condition._walk(visitor);
                    node.body._walk(visitor);
                });
            }
        }, AST_StatementWithBody);
        AST_Do = DEFNODE("Do", null, {
            "$documentation": "A `do` statement"
        }, AST_DWLoop);
        AST_While = DEFNODE("While", null, {
            "$documentation": "A `while` statement"
        }, AST_DWLoop);
        AST_ForIn = DEFNODE("ForIn", "init name object", {
            "$documentation": "A `for ... in` statement",
            "$propdoc": {
                "init": "[AST_Node] the `for/in` initialization code",
                "name": "[AST_SymbolRef?] the loop variable, only if `init` is AST_Var",
                "object": "[AST_Node] the object that we're looping through"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.init._walk(visitor);
                    if (node.name) node.name._walk(visitor);
                    node.object._walk(visitor);
                    if (node.body) {
                        node.body._walk(visitor);
                    }
                });
            }
        }, AST_StatementWithBody);
        AST_ForJS = DEFNODE("ForJS", "condition", {
            "$documentation": "A `for ... in` statement",
            "$propdoc": {
                "condition": "[AST_Verbatim] raw JavaScript conditional"
            }
        }, AST_StatementWithBody);
        AST_ListComprehension = DEFNODE("ListComprehension", "condition statement", {
            "$documentation": "A list comprehension expression",
            "$propdoc": {
                "condition": "[AST_Node] the `if` condition",
                "statement": "[AST_Node] statement to perform on each element before returning it"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.init._walk(visitor);
                    node.statement._walk(visitor);
                    if (node.condition) node.condition._walk(visitor);
                });
            }
        }, AST_ForIn);
        AST_SetComprehension = DEFNODE("SetComprehension", null, {
            "$documentation": "A set comprehension"
        }, AST_ListComprehension);
        AST_DictComprehension = DEFNODE("DictComprehension", "value_statement", {
            "$documentation": "A set comprehension",
            "$propdoc": {
                "value_statement": "[AST_Node] statement to perform on each value before returning it"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.init._walk(visitor);
                    node.statement._walk(visitor);
                    node.value_statement._walk(visitor);
                    if (node.condition) node.condition._walk(visitor);
                });
            }
        }, AST_ListComprehension);
        AST_With = DEFNODE("With", "expression", {
            "$documentation": "A `with` statement",
            "$propdoc": {
                "expression": "[AST_Node] the `with` expression"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.expression._walk(visitor);
                    node.body._walk(visitor);
                });
            }
        }, AST_StatementWithBody);
        AST_Scope = DEFNODE("Scope", "directives variables localvars functions uses_with uses_eval parent_scope enclosed cname", {
            "$documentation": "Base class for all statements introducing a lexical scope",
            "$propdoc": {
                "directives": "[string*/S] an array of directives declared in this scope",
                "variables": "[Object/S] a map of name -> SymbolDef for all variables/functions defined in this scope",
                "localvars": "[SymbolDef*] list of variables local to this scope",
                "functions": "[Object/S] like `variables`, but only lists function declarations",
                "uses_with": "[boolean/S] tells whether this scope uses the `with` statement",
                "uses_eval": "[boolean/S] tells whether this scope contains a direct call to the global `eval`",
                "parent_scope": "[AST_Scope?/S] link to the parent scope",
                "enclosed": "[SymbolDef*/S] a list of all symbol definitions that are accessed from this scope or any subscopes",
                "cname": "[integer/S] current index for mangling variables (used internally by the mangler)"
            }
        }, AST_Block);
        AST_Toplevel = DEFNODE("Toplevel", "globals baselib imports imported_module_ids strict shebang import_order module_id exports submodules classes filename srchash", {
            "$documentation": "The toplevel scope",
            "$propdoc": {
                "globals": "[Object/S] a map of name -> SymbolDef for all undeclared names",
                "baselib": "[Object/s] a collection of used parts of baselib",
                "imports": "[Object/S] a map of module_id->AST_Toplevel for all imported modules (this represents all imported modules across all source files)",
                "imported_module_ids": "[string*] a list of module ids that were imported by this module, specifically",
                "nonlocalvars": "[String*] a list of all non-local variable names (names that come from the global scope)",
                "strict": "[boolean/S] true if strict directive is in scope",
                "shebang": "[string] If #! line is present, it will be stored here",
                "import_order": "[number] The global order in which this scope was imported",
                "module_id": "[string] The id of this module",
                "exports": "[SymbolDef*] list of names exported from this module",
                "submodules": "[string*] list of names exported from this module",
                "classes": "[Object/S] a map of class names to AST_Class for classes defined in this module",
                "filename": "[string] The absolute path to the file from which this module was read",
                "srchash": "[string] SHA1 hash of source code, used for caching"
            }
        }, AST_Scope);
        AST_Import = DEFNODE("Import", "module key alias argnames body", {
            "$documentation": "Container for a single import",
            "$propdoc": {
                "module": "[AST_SymbolVar] name of the module we're importing",
                "key": "[string] The key by which this module is stored in the global modules mapping",
                "alias": "[AST_SymbolAlias] The name this module is imported as, can be None. For import x as y statements.",
                "argnames": "[AST_ImportedVar*] names of objects to be imported",
                "body": "[AST_TopLevel] parsed contents of the imported file"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    if (node.alias) {
                        node.alias._walk(visitor);
                    }
                    if (node.argnames) {
                        node.argnames.forEach(function(arg) {
                            arg._walk(visitor);
                        });
                    }
                });
            }
        }, AST_Statement);
        AST_Imports = DEFNODE("Imports", "imports", {
            "$documentation": "Container for a single import",
            "$propdoc": {
                "imports": "[AST_Import+] array of imports"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.imports.forEach(function(imp) {
                        imp._walk(visitor);
                    });
                });
            }
        }, AST_Statement);
        AST_Decorator = DEFNODE("Decorator", "name", {
            "$documentation": "Class for function decorators",
            "$propdoc": {
                "name": "[string] decorator name"
            }
        });
        AST_Lambda = DEFNODE("Lambda", "name argnames uses_arguments decorators is_generator", {
            "$documentation": "Base class for functions",
            "$propdoc": {
                "name": "[AST_SymbolDeclaration?] the name of this function",
                "argnames": "[AST_SymbolFunarg*] array of function arguments",
                "uses_arguments": "[boolean/S] tells whether this function accesses the arguments array",
                "decorators": "[AST_Decorator*] function decorators, if any",
                "is_generator": "[bool*] True iff this function is a generator"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    var d;
                    if (node.decorators) {
                        var _$rapyd$_Iter1 = _$rapyd$_Iterable(node.decorators);
                        for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
                            d = _$rapyd$_Iter1[_$rapyd$_Index1];
                            d.walk(visitor);
                        }
                    }
                    if (node.name) {
                        node.name._walk(visitor);
                    }
                    node.argnames.forEach(function(arg) {
                        arg._walk(visitor);
                    });
                    if (node.argnames.starargs) {
                        node.argnames.starargs._walk(visitor);
                    }
                    if (node.argnames.kwargs) {
                        node.argnames.kwargs._walk(visitor);
                    }
                    walk_body(node, visitor);
                });
            }
        }, AST_Scope);
        AST_Accessor = DEFNODE("Accessor", null, {
            "$documentation": "A setter/getter function"
        }, AST_Lambda);
        AST_Function = DEFNODE("Function", null, {
            "$documentation": "A function expression"
        }, AST_Lambda);
        AST_Class = DEFNODE("Class", "init name parent static external bound decorators module_id statements", {
            "$documentation": "A class declaration",
            "$propdoc": {
                "name": "[AST_SymbolDeclaration?] the name of this class",
                "init": "[AST_Function] constructor for the class",
                "parent": "[AST_Class?] parent class this class inherits from",
                "static": "[string*] list of static methods",
                "external": "[boolean] true if class is declared elsewhere, but will be within current scope at runtime",
                "bound": "[string*] list of methods that need to be bound to behave correctly (function pointers)",
                "decorators": "[AST_Decorator*] function decorators, if any",
                "module_id": "[string] The id of the module this class is defined in",
                "statements": "[AST_Node*] list of statements in the class scope (excluding method definitions)"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    var d;
                    if (node.decorators) {
                        var _$rapyd$_Iter2 = _$rapyd$_Iterable(node.decorators);
                        for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
                            d = _$rapyd$_Iter2[_$rapyd$_Index2];
                            d.walk(visitor);
                        }
                    }
                    node.name._walk(visitor);
                    walk_body(node, visitor);
                    if (node.parent) node.parent._walk(visitor);
                });
            }
        }, AST_Scope);
        AST_Method = DEFNODE("Method", "static", {
            "$documentation": "A class method definition",
            "$propdoc": {
                "static": "[boolean] true if method is static"
            }
        }, AST_Lambda);
        AST_Jump = DEFNODE("Jump", null, {
            "$documentation": "Base class for “jumps” (for now that's `return`, `throw`, `break` and `continue`)"
        }, AST_Statement);
        AST_Exit = DEFNODE("Exit", "value", {
            "$documentation": "Base class for “exits” (`return` and `throw`)",
            "$propdoc": {
                "value": "[AST_Node?] the value returned or thrown by this statement; could be null for AST_Return"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    if (node.value) {
                        node.value._walk(visitor);
                    }
                });
            }
        }, AST_Jump);
        AST_Return = DEFNODE("Return", null, {
            "$documentation": "A `return` statement"
        }, AST_Exit);
        AST_Yield = DEFNODE("Yield", "is_yield_from", {
            "$documentation": "A `yield` statement",
            "$propdoc": {
                "is_yield_from": "[bool] True iff this is a yield from, False otherwise"
            }
        }, AST_Return);
        AST_Throw = DEFNODE("Throw", null, {
            "$documentation": "A `throw` statement"
        }, AST_Exit);
        AST_LoopControl = DEFNODE("LoopControl", null, {
            "$documentation": "Base class for loop control statements (`break` and `continue`)"
        }, AST_Jump);
        AST_Break = DEFNODE("Break", null, {
            "$documentation": "A `break` statement"
        }, AST_LoopControl);
        AST_Continue = DEFNODE("Continue", null, {
            "$documentation": "A `continue` statement"
        }, AST_LoopControl);
        AST_If = DEFNODE("If", "condition alternative", {
            "$documentation": "A `if` statement",
            "$propdoc": {
                "condition": "[AST_Node] the `if` condition",
                "alternative": "[AST_Statement?] the `else` part, or null if not present"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.condition._walk(visitor);
                    node.body._walk(visitor);
                    if (node.alternative) {
                        node.alternative._walk(visitor);
                    }
                });
            }
        }, AST_StatementWithBody);
        AST_Switch = DEFNODE("Switch", "expression", {
            "$documentation": "A `switch` statement",
            "$propdoc": {
                "expression": "[AST_Node] the `switch` “discriminant”"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.expression._walk(visitor);
                    walk_body(node, visitor);
                });
            }
        }, AST_Block);
        AST_SwitchBranch = DEFNODE("SwitchBranch", null, {
            "$documentation": "Base class for `switch` branches"
        }, AST_Block);
        AST_Default = DEFNODE("Default", null, {
            "$documentation": "A `default` switch branch"
        }, AST_SwitchBranch);
        AST_Case = DEFNODE("Case", "expression", {
            "$documentation": "A `case` switch branch",
            "$propdoc": {
                "expression": "[AST_Node] the `case` expression"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.expression._walk(visitor);
                    walk_body(node, visitor);
                });
            }
        }, AST_SwitchBranch);
        AST_Try = DEFNODE("Try", "bcatch bfinally", {
            "$documentation": "A `try` statement",
            "$propdoc": {
                "bcatch": "[AST_Catch?] the catch block, or null if not present",
                "bfinally": "[AST_Finally?] the finally block, or null if not present"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    walk_body(node, visitor);
                    if (node.bcatch) {
                        node.bcatch._walk(visitor);
                    }
                    if (node.bfinally) {
                        node.bfinally._walk(visitor);
                    }
                });
            }
        }, AST_Block);
        AST_Catch = DEFNODE("Catch", null, {
            "$documentation": "A `catch` node; only makes sense as part of a `try` statement",
            "$propdoc": {}
        }, AST_Block);
        AST_Except = DEFNODE("Except", "argname errors", {
            "$documentation": "An `except` node for RapydScript, which resides inside the catch block",
            "$propdoc": {
                "argname": "[AST_SymbolCatch] symbol for the exception",
                "errors": "[AST_SymbolVar*] error classes to catch in this block"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(this, function() {
                    var e;
                    if (node.argname) {
                        node.argname.walk(visitor);
                    }
                    if (node.errors) {
                        var _$rapyd$_Iter3 = _$rapyd$_Iterable(node.errors);
                        for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
                            e = _$rapyd$_Iter3[_$rapyd$_Index3];
                            e.walk(visitor);
                        }
                    }
                    walk_body(node, visitor);
                });
            }
        }, AST_Block);
        AST_Finally = DEFNODE("Finally", null, {
            "$documentation": "A `finally` node; only makes sense as part of a `try` statement"
        }, AST_Block);
        AST_Definitions = DEFNODE("Definitions", "definitions", {
            "$documentation": "Base class for `var` or `const` nodes (variable declarations/initializations)",
            "$propdoc": {
                "definitions": "[AST_VarDef*] array of variable definitions"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.definitions.forEach(function(def_) {
                        def_._walk(visitor);
                    });
                });
            }
        }, AST_Statement);
        AST_Var = DEFNODE("Var", null, {
            "$documentation": "A `var` statement"
        }, AST_Definitions);
        AST_Const = DEFNODE("Const", null, {
            "$documentation": "A `const` statement"
        }, AST_Definitions);
        AST_VarDef = DEFNODE("VarDef", "name value", {
            "$documentation": "A variable declaration; only appears in a AST_Definitions node",
            "$propdoc": {
                "name": "[AST_SymbolVar|AST_SymbolConst|AST_SymbolNonlocal] name of the variable",
                "value": "[AST_Node?] initializer, or null if there's no initializer"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.name._walk(visitor);
                    if (node.value) {
                        node.value._walk(visitor);
                    }
                });
            }
        });
        AST_BaseCall = DEFNODE("BaseCall", "args", {
            "$documentation": "A base class for function calls",
            "$propdoc": {
                "args": "[AST_Node*] array of arguments"
            }
        });
        AST_Call = DEFNODE("Call", "expression", {
            "$documentation": "A function call expression",
            "$propdoc": {
                "expression": "[AST_Node] expression to invoke as function"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.expression._walk(visitor);
                    node.args.forEach(function(arg) {
                        arg._walk(visitor);
                    });
                });
            }
        }, AST_BaseCall);
        AST_ClassCall = DEFNODE("ClassCall", "class method static", {
            "$documentation": "A function call expression",
            "$propdoc": {
                "class": "[string] name of the class method belongs to",
                "method": "[string] class method being called",
                "static": "[boolean] defines whether the method is static"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    if (node.expression) node.expression._walk(visitor);
                    node.args.forEach(function(arg) {
                        arg._walk(visitor);
                    });
                });
            }
        }, AST_BaseCall);
        AST_New = DEFNODE("New", null, {
            "$documentation": "An object instantiation. Derives from a function call since it has exactly the same properties"
        }, AST_Call);
        AST_Seq = DEFNODE("Seq", "car cdr", {
            "$documentation": "A sequence expression (two comma-separated expressions)",
            "$propdoc": {
                "car": "[AST_Node] first element in sequence",
                "cdr": "[AST_Node] second element in sequence"
            },
            "$cons": function(x, y) {
                var seq;
                seq = new AST_Seq(x);
                seq.car = x;
                seq.cdr = y;
                return seq;
            },
            "$from_array": function(array) {
                var list, i, p;
                if (array.length === 0) {
                    return null;
                }
                if (array.length === 1) {
                    return array[0].clone();
                }
                list = null;
                for (i = array.length - 1; i > -1; i-=1) {
                    list = AST_Seq.cons(array[i], list);
                }
                p = list;
                while (p) {
                    if (p.cdr && !p.cdr.cdr) {
                        p.cdr = p.cdr.car;
                        break;
                    }
                    p = p.cdr;
                }
                return list;
            },
            "to_array": function() {
                var p, a;
                p = this;
                a = [];
                while (p) {
                    a.push(p.car);
                    if (p.cdr && !(p.cdr instanceof AST_Seq)) {
                        a.push(p.cdr);
                        break;
                    }
                    p = p.cdr;
                }
                return a;
            },
            "add": function(node) {
                var p, cell;
                p = this;
                while (p) {
                    if (!(p.cdr instanceof AST_Seq)) {
                        cell = AST_Seq.cons(p.cdr, node);
                        return p.cdr = cell;
                    }
                    p = p.cdr;
                }
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.car._walk(visitor);
                    if (node.cdr) {
                        node.cdr._walk(visitor);
                    }
                });
            }
        });
        AST_PropAccess = DEFNODE("PropAccess", "expression property", {
            "$documentation": "Base class for property access expressions, i.e. `a.foo` or `a[\"foo\"]`",
            "$propdoc": {
                "expression": "[AST_Node] the “container” expression",
                "property": "[AST_Node|string] the property to access.  For AST_Dot this is always a plain string, while for AST_Sub it's an arbitrary AST_Node"
            }
        });
        AST_Dot = DEFNODE("Dot", null, {
            "$documentation": "A dotted property access expression",
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.expression._walk(visitor);
                });
            }
        }, AST_PropAccess);
        AST_Sub = DEFNODE("Sub", null, {
            "$documentation": "Index-style property access, i.e. `a[\"foo\"]`",
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.expression._walk(visitor);
                    node.property._walk(visitor);
                });
            }
        }, AST_PropAccess);
        AST_Splice = DEFNODE("Slice", "property2 assignment", {
            "$documentation": "Index-style property access, i.e. `a[3:5]`",
            "$propdoc": {
                "property2": "[AST_Node] the 2nd property to access - typically ending index for the array.",
                "assignment": "[AST_Node] The data being spliced in."
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.expression._walk(visitor);
                    node.property._walk(visitor);
                    node.property2._walk(visitor);
                });
            }
        }, AST_PropAccess);
        AST_Unary = DEFNODE("Unary", "operator expression", {
            "$documentation": "Base class for unary expressions",
            "$propdoc": {
                "operator": "[string] the operator",
                "expression": "[AST_Node] expression that this unary operator applies to"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.expression._walk(visitor);
                });
            }
        });
        AST_UnaryPrefix = DEFNODE("UnaryPrefix", null, {
            "$documentation": "Unary prefix expression, i.e. `typeof i` or `++i`"
        }, AST_Unary);
        AST_UnaryPostfix = DEFNODE("UnaryPostfix", null, {
            "$documentation": "Unary postfix expression, i.e. `i++`"
        }, AST_Unary);
        AST_Binary = DEFNODE("Binary", "left operator right", {
            "$documentation": "Binary expression, i.e. `a + b`",
            "$propdoc": {
                "left": "[AST_Node] left-hand side expression",
                "operator": "[string] the operator",
                "right": "[AST_Node] right-hand side expression"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.left._walk(visitor);
                    node.right._walk(visitor);
                });
            }
        });
        AST_Conditional = DEFNODE("Conditional", "condition consequent alternative", {
            "$documentation": "Conditional expression using the ternary operator, i.e. `a ? b : c`",
            "$propdoc": {
                "condition": "[AST_Node]",
                "consequent": "[AST_Node]",
                "alternative": "[AST_Node]"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.condition._walk(visitor);
                    node.consequent._walk(visitor);
                    node.alternative._walk(visitor);
                });
            }
        });
        AST_Assign = DEFNODE("Assign", null, {
            "$documentation": "An assignment expression — `a = b + 5`"
        }, AST_Binary);
        AST_Array = DEFNODE("Array", "elements", {
            "$documentation": "An array literal",
            "$propdoc": {
                "elements": "[AST_Node*] array of elements"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.elements.forEach(function(el) {
                        el._walk(visitor);
                    });
                });
            },
            "flatten": function() {
                function flatten(arr) {
                    var ans, value;
                    ans = [];
                    var _$rapyd$_Iter4 = _$rapyd$_Iterable(arr);
                    for (var _$rapyd$_Index4 = 0; _$rapyd$_Index4 < _$rapyd$_Iter4.length; _$rapyd$_Index4++) {
                        value = _$rapyd$_Iter4[_$rapyd$_Index4];
                        if (value instanceof AST_Seq) {
                            value = value.to_array();
                        } else if (value instanceof AST_Array) {
                            value = value.elements;
                        }
                        if (Array.isArray(value)) {
                            ans = ans.concat(flatten(value));
                        } else {
                            ans.push(value);
                        }
                    }
                    return ans;
                }
                return flatten(this.elements);
            }
        });
        AST_Object = DEFNODE("Object", "properties", {
            "$documentation": "An object literal",
            "$propdoc": {
                "properties": "[AST_ObjectProperty*] array of properties"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.properties.forEach(function(prop) {
                        prop._walk(visitor);
                    });
                });
            }
        });
        AST_ExpressiveObject = DEFNODE("ExpressiveObject", null, {
            "$documentation": "An object literal with expressions for some keys"
        }, AST_Object);
        AST_ObjectProperty = DEFNODE("ObjectProperty", "key value quoted", {
            "$documentation": "Base class for literal object properties",
            "$propdoc": {
                "key": "[AST_Node] the property expression",
                "value": "[AST_Node] property value.  For setters and getters this is an AST_Function."
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.key._walk(visitor);
                    node.value._walk(visitor);
                });
            }
        });
        AST_ObjectKeyVal = DEFNODE("ObjectKeyVal", null, {
            "$documentation": "A key: value object property"
        }, AST_ObjectProperty);
        AST_Symbol = DEFNODE("Symbol", "scope name thedef", {
            "$propdoc": {
                "name": "[string] name of this symbol",
                "scope": "[AST_Scope/S] the current scope (not necessarily the definition scope)",
                "thedef": "[SymbolDef/S] the definition of this symbol"
            },
            "$documentation": "Base class for all symbols"
        });
        AST_SymbolAlias = DEFNODE("SymbolAlias", null, {
            "$documentation": "An alias used in an import statement"
        }, AST_Symbol);
        AST_SymbolAccessor = DEFNODE("SymbolAccessor", null, {
            "$documentation": "The name of a property accessor (setter/getter function)"
        }, AST_Symbol);
        AST_SymbolDeclaration = DEFNODE("SymbolDeclaration", "init", {
            "$documentation": "A declaration symbol (symbol in var/const, function name or argument, symbol in catch)",
            "$propdoc": {
                "init": "[AST_Node*/S] array of initializers for this declaration."
            }
        }, AST_Symbol);
        AST_SymbolVar = DEFNODE("SymbolVar", null, {
            "$documentation": "Symbol defining a variable"
        }, AST_SymbolDeclaration);
        AST_ImportedVar = DEFNODE("ImportedVar", "alias", {
            "$documentation": "Symbol defining an imported symbol",
            "$propdoc": {
                "alias": "AST_SymbolAlias the alias for this imported symbol"
            }
        }, AST_SymbolVar);
        AST_SymbolConst = DEFNODE("SymbolConst", null, {
            "$documentation": "A constant declaration"
        }, AST_SymbolDeclaration);
        AST_SymbolNonlocal = DEFNODE("SymbolNonlocal", null, {
            "$documentation": "A nonlocal declaration"
        }, AST_SymbolDeclaration);
        AST_SymbolFunarg = DEFNODE("SymbolFunarg", null, {
            "$documentation": "Symbol naming a function argument"
        }, AST_SymbolVar);
        AST_SymbolDefun = DEFNODE("SymbolDefun", null, {
            "$documentation": "Symbol defining a function"
        }, AST_SymbolDeclaration);
        AST_SymbolLambda = DEFNODE("SymbolLambda", null, {
            "$documentation": "Symbol naming a function expression"
        }, AST_SymbolDeclaration);
        AST_SymbolCatch = DEFNODE("SymbolCatch", null, {
            "$documentation": "Symbol naming the exception in catch"
        }, AST_SymbolDeclaration);
        AST_SymbolRef = DEFNODE("SymbolRef", "parens", {
            "$documentation": "Reference to some symbol (not definition/declaration)",
            "$propdoc": {
                "parens": "[boolean/S] if true, this variable is wrapped in parentheses"
            }
        }, AST_Symbol);
        AST_This = DEFNODE("This", null, {
            "$documentation": "The `this` symbol"
        }, AST_Symbol);
        AST_Constant = DEFNODE("Constant", null, {
            "$documentation": "Base class for all constants",
            "getValue": function() {
                return this.value;
            }
        });
        AST_String = DEFNODE("String", "value", {
            "$documentation": "A string literal",
            "$propdoc": {
                "value": "[string] the contents of this string"
            }
        }, AST_Constant);
        AST_Verbatim = DEFNODE("Verbatim", "value", {
            "$documentation": "Raw JavaScript code",
            "$propdoc": {
                "value": "[string] A string of raw JS code"
            }
        }, AST_Constant);
        AST_Number = DEFNODE("Number", "value", {
            "$documentation": "A number literal",
            "$propdoc": {
                "value": "[number] the numeric value"
            }
        }, AST_Constant);
        AST_RegExp = DEFNODE("RegExp", "value", {
            "$documentation": "A regexp literal",
            "$propdoc": {
                "value": "[RegExp] the actual regexp"
            }
        }, AST_Constant);
        AST_Atom = DEFNODE("Atom", null, {
            "$documentation": "Base class for atoms"
        }, AST_Constant);
        AST_Null = DEFNODE("Null", null, {
            "$documentation": "The `null` atom",
            "value": null
        }, AST_Atom);
        AST_NaN = DEFNODE("NaN", null, {
            "$documentation": "The impossible value",
            "value": 0 / 0
        }, AST_Atom);
        AST_Undefined = DEFNODE("Undefined", null, {
            "$documentation": "The `undefined` value",
            "value": function() {
            }.call(this)
        }, AST_Atom);
        AST_Hole = DEFNODE("Hole", null, {
            "$documentation": "A hole in an array",
            "value": function() {
            }.call(this)
        }, AST_Atom);
        AST_Infinity = DEFNODE("Infinity", null, {
            "$documentation": "The `Infinity` value",
            "value": 1 / 0
        }, AST_Atom);
        AST_Boolean = DEFNODE("Boolean", null, {
            "$documentation": "Base class for booleans"
        }, AST_Atom);
        AST_False = DEFNODE("False", null, {
            "$documentation": "The `false` atom",
            "value": false
        }, AST_Boolean);
        AST_True = DEFNODE("True", null, {
            "$documentation": "The `true` atom",
            "value": true
        }, AST_Boolean);
        function TreeWalker(callback) {
            this.visit = callback;
            this.stack = [];
        }
        TreeWalker.prototype = {
            "_visit": function(node, descend) {
                var ret;
                this.stack.push(node);
                ret = this.visit(node, descend ? function() {
                    descend.call(node);
                } : noop);
                if (!ret && descend) {
                    descend.call(node);
                }
                this.stack.pop();
                return ret;
            },
            "parent": function(n) {
                return this.stack[this.stack.length - 2 - (n || 0)];
            },
            "push": function(node) {
                this.stack.push(node);
            },
            "pop": function() {
                return this.stack.pop();
            },
            "self": function() {
                return this.stack[this.stack.length - 1];
            },
            "find_parent": function(type) {
                var stack, x, i;
                stack = this.stack;
                for (i = stack.length - 1; i > -1; i-=1) {
                    x = stack[i];
                    if (x instanceof type) {
                        return x;
                    }
                }
            },
            "in_boolean_context": function() {
                var stack, i, self, p;
                stack = this.stack;
                i = stack.length;
                self = stack[i -= 1];
                while (i > 0) {
                    p = stack[i -= 1];
                    if (p instanceof AST_If && p.condition === self || p instanceof AST_Conditional && p.condition === self || p instanceof AST_DWLoop && p.condition === self || p instanceof AST_UnaryPrefix && p.operator === "!" && p.expression === self) {
                        return true;
                    }
                    if (!(p instanceof AST_Binary && (p.operator === "&&" || p.operator === "||"))) {
                        return false;
                    }
                    self = p;
                }
            }
        };
        _$rapyd$_modules["ast"]["AST_Token"] = AST_Token;

        _$rapyd$_modules["ast"]["AST_Node"] = AST_Node;

        _$rapyd$_modules["ast"]["AST_Statement"] = AST_Statement;

        _$rapyd$_modules["ast"]["AST_Debugger"] = AST_Debugger;

        _$rapyd$_modules["ast"]["AST_Directive"] = AST_Directive;

        _$rapyd$_modules["ast"]["AST_SimpleStatement"] = AST_SimpleStatement;

        _$rapyd$_modules["ast"]["AST_Block"] = AST_Block;

        _$rapyd$_modules["ast"]["AST_BlockStatement"] = AST_BlockStatement;

        _$rapyd$_modules["ast"]["AST_EmptyStatement"] = AST_EmptyStatement;

        _$rapyd$_modules["ast"]["AST_StatementWithBody"] = AST_StatementWithBody;

        _$rapyd$_modules["ast"]["AST_DWLoop"] = AST_DWLoop;

        _$rapyd$_modules["ast"]["AST_Do"] = AST_Do;

        _$rapyd$_modules["ast"]["AST_While"] = AST_While;

        _$rapyd$_modules["ast"]["AST_ForIn"] = AST_ForIn;

        _$rapyd$_modules["ast"]["AST_ForJS"] = AST_ForJS;

        _$rapyd$_modules["ast"]["AST_ListComprehension"] = AST_ListComprehension;

        _$rapyd$_modules["ast"]["AST_SetComprehension"] = AST_SetComprehension;

        _$rapyd$_modules["ast"]["AST_DictComprehension"] = AST_DictComprehension;

        _$rapyd$_modules["ast"]["AST_With"] = AST_With;

        _$rapyd$_modules["ast"]["AST_Scope"] = AST_Scope;

        _$rapyd$_modules["ast"]["AST_Toplevel"] = AST_Toplevel;

        _$rapyd$_modules["ast"]["AST_Import"] = AST_Import;

        _$rapyd$_modules["ast"]["AST_Imports"] = AST_Imports;

        _$rapyd$_modules["ast"]["AST_Decorator"] = AST_Decorator;

        _$rapyd$_modules["ast"]["AST_Lambda"] = AST_Lambda;

        _$rapyd$_modules["ast"]["AST_Accessor"] = AST_Accessor;

        _$rapyd$_modules["ast"]["AST_Function"] = AST_Function;

        _$rapyd$_modules["ast"]["AST_Class"] = AST_Class;

        _$rapyd$_modules["ast"]["AST_Method"] = AST_Method;

        _$rapyd$_modules["ast"]["AST_Jump"] = AST_Jump;

        _$rapyd$_modules["ast"]["AST_Exit"] = AST_Exit;

        _$rapyd$_modules["ast"]["AST_Return"] = AST_Return;

        _$rapyd$_modules["ast"]["AST_Yield"] = AST_Yield;

        _$rapyd$_modules["ast"]["AST_Throw"] = AST_Throw;

        _$rapyd$_modules["ast"]["AST_LoopControl"] = AST_LoopControl;

        _$rapyd$_modules["ast"]["AST_Break"] = AST_Break;

        _$rapyd$_modules["ast"]["AST_Continue"] = AST_Continue;

        _$rapyd$_modules["ast"]["AST_If"] = AST_If;

        _$rapyd$_modules["ast"]["AST_Switch"] = AST_Switch;

        _$rapyd$_modules["ast"]["AST_SwitchBranch"] = AST_SwitchBranch;

        _$rapyd$_modules["ast"]["AST_Default"] = AST_Default;

        _$rapyd$_modules["ast"]["AST_Case"] = AST_Case;

        _$rapyd$_modules["ast"]["AST_Try"] = AST_Try;

        _$rapyd$_modules["ast"]["AST_Catch"] = AST_Catch;

        _$rapyd$_modules["ast"]["AST_Except"] = AST_Except;

        _$rapyd$_modules["ast"]["AST_Finally"] = AST_Finally;

        _$rapyd$_modules["ast"]["AST_Definitions"] = AST_Definitions;

        _$rapyd$_modules["ast"]["AST_Var"] = AST_Var;

        _$rapyd$_modules["ast"]["AST_Const"] = AST_Const;

        _$rapyd$_modules["ast"]["AST_VarDef"] = AST_VarDef;

        _$rapyd$_modules["ast"]["AST_BaseCall"] = AST_BaseCall;

        _$rapyd$_modules["ast"]["AST_Call"] = AST_Call;

        _$rapyd$_modules["ast"]["AST_ClassCall"] = AST_ClassCall;

        _$rapyd$_modules["ast"]["AST_New"] = AST_New;

        _$rapyd$_modules["ast"]["AST_Seq"] = AST_Seq;

        _$rapyd$_modules["ast"]["AST_PropAccess"] = AST_PropAccess;

        _$rapyd$_modules["ast"]["AST_Dot"] = AST_Dot;

        _$rapyd$_modules["ast"]["AST_Sub"] = AST_Sub;

        _$rapyd$_modules["ast"]["AST_Splice"] = AST_Splice;

        _$rapyd$_modules["ast"]["AST_Unary"] = AST_Unary;

        _$rapyd$_modules["ast"]["AST_UnaryPrefix"] = AST_UnaryPrefix;

        _$rapyd$_modules["ast"]["AST_UnaryPostfix"] = AST_UnaryPostfix;

        _$rapyd$_modules["ast"]["AST_Binary"] = AST_Binary;

        _$rapyd$_modules["ast"]["AST_Conditional"] = AST_Conditional;

        _$rapyd$_modules["ast"]["AST_Assign"] = AST_Assign;

        _$rapyd$_modules["ast"]["AST_Array"] = AST_Array;

        _$rapyd$_modules["ast"]["AST_Object"] = AST_Object;

        _$rapyd$_modules["ast"]["AST_ExpressiveObject"] = AST_ExpressiveObject;

        _$rapyd$_modules["ast"]["AST_ObjectProperty"] = AST_ObjectProperty;

        _$rapyd$_modules["ast"]["AST_ObjectKeyVal"] = AST_ObjectKeyVal;

        _$rapyd$_modules["ast"]["AST_Symbol"] = AST_Symbol;

        _$rapyd$_modules["ast"]["AST_SymbolAlias"] = AST_SymbolAlias;

        _$rapyd$_modules["ast"]["AST_SymbolAccessor"] = AST_SymbolAccessor;

        _$rapyd$_modules["ast"]["AST_SymbolDeclaration"] = AST_SymbolDeclaration;

        _$rapyd$_modules["ast"]["AST_SymbolVar"] = AST_SymbolVar;

        _$rapyd$_modules["ast"]["AST_ImportedVar"] = AST_ImportedVar;

        _$rapyd$_modules["ast"]["AST_SymbolConst"] = AST_SymbolConst;

        _$rapyd$_modules["ast"]["AST_SymbolNonlocal"] = AST_SymbolNonlocal;

        _$rapyd$_modules["ast"]["AST_SymbolFunarg"] = AST_SymbolFunarg;

        _$rapyd$_modules["ast"]["AST_SymbolDefun"] = AST_SymbolDefun;

        _$rapyd$_modules["ast"]["AST_SymbolLambda"] = AST_SymbolLambda;

        _$rapyd$_modules["ast"]["AST_SymbolCatch"] = AST_SymbolCatch;

        _$rapyd$_modules["ast"]["AST_SymbolRef"] = AST_SymbolRef;

        _$rapyd$_modules["ast"]["AST_This"] = AST_This;

        _$rapyd$_modules["ast"]["AST_Constant"] = AST_Constant;

        _$rapyd$_modules["ast"]["AST_String"] = AST_String;

        _$rapyd$_modules["ast"]["AST_Verbatim"] = AST_Verbatim;

        _$rapyd$_modules["ast"]["AST_Number"] = AST_Number;

        _$rapyd$_modules["ast"]["AST_RegExp"] = AST_RegExp;

        _$rapyd$_modules["ast"]["AST_Atom"] = AST_Atom;

        _$rapyd$_modules["ast"]["AST_Null"] = AST_Null;

        _$rapyd$_modules["ast"]["AST_NaN"] = AST_NaN;

        _$rapyd$_modules["ast"]["AST_Undefined"] = AST_Undefined;

        _$rapyd$_modules["ast"]["AST_Hole"] = AST_Hole;

        _$rapyd$_modules["ast"]["AST_Infinity"] = AST_Infinity;

        _$rapyd$_modules["ast"]["AST_Boolean"] = AST_Boolean;

        _$rapyd$_modules["ast"]["AST_False"] = AST_False;

        _$rapyd$_modules["ast"]["AST_True"] = AST_True;

        _$rapyd$_modules["ast"]["DEFNODE"] = DEFNODE;

        _$rapyd$_modules["ast"]["walk_body"] = walk_body;

        _$rapyd$_modules["ast"]["TreeWalker"] = TreeWalker;
    })();

    (function(){
        var __name__ = "tokenizer";
        var RE_HEX_NUMBER, RE_OCT_NUMBER, RE_DEC_NUMBER, UNARY_POSTFIX, OPERATOR_CHARS, OPERATORS, OP_MAP, WHITESPACE_CHARS, PUNC_BEFORE_EXPRESSION, PUNC_CHARS, REGEXP_MODIFIERS, KEYWORDS, KEYWORDS_ATOM, RESERVED_WORDS, KEYWORDS_BEFORE_EXPRESSION, ALL_KEYWORDS, IDENTIFIER_PAT, UNICODE, EX_EOF;
        var make_predicate = _$rapyd$_modules["utils"].make_predicate;
        var characters = _$rapyd$_modules["utils"].characters;
        
        var AST_Token = _$rapyd$_modules["ast"].AST_Token;
        
        var SyntaxError = _$rapyd$_modules["errors"].SyntaxError;
        
        RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
        RE_OCT_NUMBER = /^0[0-7]+$/;
        RE_DEC_NUMBER = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i;
        UNARY_POSTFIX = make_predicate([ "--", "++" ]);
        OPERATOR_CHARS = make_predicate(characters("+-*&%=<>!?|~^@"));
        OPERATORS = make_predicate([ "in", "instanceof", "typeof", "new", "void", "del", "++", "--", "+", "-", "not", "~", "&", "|", "^", "**", "*", "//", "/", "%", ">>", "<<", ">>>", "<", ">", "<=", ">=", "==", "===", "is", "!=", "!==", "?", "=", "+=", "-=", "//=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=", "and", "or", "til", "to", "@" ]);
        OP_MAP = {
            "or": "||",
            "and": "&&",
            "not": "!",
            "del": "delete",
            "None": "null",
            "is": "===",
            "==": "===",
            "!=": "!=="
        };
        WHITESPACE_CHARS = make_predicate(characters("  \n\r\t\f​᠎             　"));
        PUNC_BEFORE_EXPRESSION = make_predicate(characters("[{(,.;:"));
        PUNC_CHARS = make_predicate(characters("[]{}(),;:"));
        REGEXP_MODIFIERS = make_predicate(characters("gmsiy"));
        KEYWORDS = "as break case class const continue debugger default def del do elif else except finally for from if import in instanceof is new nonlocal pass raise return yield switch til to try typeof var void while with or and not";
        KEYWORDS_ATOM = "False None True";
        RESERVED_WORDS = "abstract boolean byte char double enum export extends final float goto implements int interface long native package private protected public short static super synchronized this throws transient volatile" + " " + KEYWORDS_ATOM + " " + KEYWORDS;
        KEYWORDS_BEFORE_EXPRESSION = "return yield new del raise elif else if";
        ALL_KEYWORDS = RESERVED_WORDS + " " + KEYWORDS_BEFORE_EXPRESSION;
        KEYWORDS = make_predicate(KEYWORDS);
        RESERVED_WORDS = make_predicate(RESERVED_WORDS);
        KEYWORDS_BEFORE_EXPRESSION = make_predicate(KEYWORDS_BEFORE_EXPRESSION);
        KEYWORDS_ATOM = make_predicate(KEYWORDS_ATOM);
        IDENTIFIER_PAT = /^[a-z_$][_a-z0-9$]*$/i;
        function is_letter(code) {
            return code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 170 && UNICODE.letter.test(String.fromCharCode(code));
        }
        function is_digit(code) {
            return code >= 48 && code <= 57;
        }
        function is_alphanumeric_char(code) {
            return is_digit(code) || is_letter(code);
        }
        function is_unicode_combining_mark(ch) {
            return UNICODE.non_spacing_mark.test(ch) || UNICODE.space_combining_mark.test(ch);
        }
        function is_unicode_connector_punctuation(ch) {
            return UNICODE.connector_punctuation.test(ch);
        }
        function is_identifier(name) {
            return !RESERVED_WORDS(name) && IDENTIFIER_PAT.test(name);
        }
        function is_identifier_start(code) {
            return code === 36 || code === 95 || is_letter(code);
        }
        function is_identifier_char(ch) {
            var code;
            code = ch.charCodeAt(0);
            return is_identifier_start(code) || is_digit(code) || code === 8204 || code === 8205 || is_unicode_combining_mark(ch) || is_unicode_connector_punctuation(ch);
        }
        function parse_js_number(num) {
            if (RE_HEX_NUMBER.test(num)) {
                return parseInt(num.substr(2), 16);
            } else if (RE_OCT_NUMBER.test(num)) {
                return parseInt(num.substr(1), 8);
            } else if (RE_DEC_NUMBER.test(num)) {
                return parseFloat(num);
            }
        }
        UNICODE = {
            "letter": new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0523\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971\\u0972\\u097B-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D3D\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8B\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10D0-\\u10FA\\u10FC\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19A9\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u2094\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2C6F\\u2C71-\\u2C7D\\u2C80-\\u2CE4\\u2D00-\\u2D25\\u2D30-\\u2D65\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31B7\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FC3\\uA000-\\uA48C\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA65F\\uA662-\\uA66E\\uA67F-\\uA697\\uA717-\\uA71F\\uA722-\\uA788\\uA78B\\uA78C\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA90A-\\uA925\\uA930-\\uA946\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAC00\\uD7A3\\uF900-\\uFA2D\\uFA30-\\uFA6A\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),
            "non_spacing_mark": new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"),
            "space_combining_mark": new RegExp("[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]"),
            "connector_punctuation": new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]")
        };
        function is_token(token, type, val) {
            return token.type === type && (val === null || val === undefined || token.value === val);
        }
        EX_EOF = {};
        function tokenizer($TEXT, filename) {
            var S, read_string, read_regexp;
            S = {
                "text": $TEXT.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/\uFEFF/g, ""),
                "filename": filename,
                "pos": 0,
                "tokpos": 0,
                "line": 1,
                "tokline": 0,
                "col": 0,
                "tokcol": 0,
                "newline_before": false,
                "regex_allowed": false,
                "comments_before": [],
                "whitespace_before": [],
                "newblock": false,
                "endblock": false,
                "indentation_matters": [ true ],
                "cached_whitespace": "",
                "prev": undefined,
                "index_or_slice": [ false ]
            };
            function peek() {
                return S.text.charAt(S.pos);
            }
            function prevChar() {
                return S.text.charAt(S.tokpos - 1);
            }
            function next(signal_eof, in_string) {
                var ch;
                ch = S.text.charAt(S.pos);
                S.pos += 1;
                if (signal_eof && !ch) {
                    throw EX_EOF;
                }
                if (ch === "\n") {
                    S.newline_before = S.newline_before || !in_string;
                    S.line += 1;
                    S.col = 0;
                } else {
                    S.col += 1;
                }
                return ch;
            }
            function find(what, signal_eof) {
                var pos;
                pos = S.text.indexOf(what, S.pos);
                if (signal_eof && pos === -1) {
                    throw EX_EOF;
                }
                return pos;
            }
            function start_token() {
                S.tokline = S.line;
                S.tokcol = S.col;
                S.tokpos = S.pos;
            }
            function token(type, value, is_comment, keep_newline) {
                var ret, i;
                S.regex_allowed = type === "operator" && !UNARY_POSTFIX[value] || type === "keyword" && KEYWORDS_BEFORE_EXPRESSION(value) || type === "punc" && PUNC_BEFORE_EXPRESSION(value);
                if (type === "operator" && value === "is" && S.text.substr(S.pos).trimLeft().substr(0, 4).trimRight() === "not") {
                    next_token();
                    value = "!==";
                }
                if (type === "operator" && OP_MAP[value]) {
                    value = OP_MAP[value];
                }
                ret = {
                    "type": type,
                    "value": value,
                    "line": S.tokline,
                    "col": S.tokcol,
                    "pos": S.tokpos,
                    "endpos": S.pos,
                    "nlb": S.newline_before,
                    "file": filename
                };
                if (!is_comment) {
                    ret.comments_before = S.comments_before;
                    S.comments_before = [];
                    for (i = 0; i < len(ret.comments_before); i++) {
                        ret.nlb = ret.nlb || ret.comments_before[i].nlb;
                    }
                }
                if (!keep_newline) {
                    S.newline_before = false;
                }
                if (type === "punc") {
                    if (value === ":" && !S.index_or_slice.slice(-1)[0] && (!S.text.substring(S.pos + 1, find("\n")).trim() || !S.text.substring(S.pos + 1, find("#")).trim())) {
                        S.newblock = true;
                        S.indentation_matters.push(true);
                    }
                    if (value === "[") {
                        if (S.prev && S.prev.type === "name") {
                            S.index_or_slice.push(true);
                        } else {
                            S.index_or_slice.push(false);
                        }
                        S.indentation_matters.push(false);
                    } else if (value === "{" || value === "(") {
                        S.indentation_matters.push(false);
                    } else if (value === "]") {
                        S.index_or_slice.pop();
                        S.indentation_matters.pop();
                    } else if (value === "}" || value === ")") {
                        S.indentation_matters.pop();
                    }
                }
                S.prev = new AST_Token(ret);
                return S.prev;
            }
            function parse_whitespace() {
                var leading_whitespace, whitespace_exists, ch;
                leading_whitespace = "";
                whitespace_exists = false;
                while (WHITESPACE_CHARS(peek())) {
                    whitespace_exists = true;
                    ch = next();
                    if (ch === "\n") {
                        leading_whitespace = "";
                    } else {
                        leading_whitespace += ch;
                    }
                }
                if (peek() !== "#") {
                    if (!whitespace_exists) {
                        leading_whitespace = S.cached_whitespace;
                    } else {
                        S.cached_whitespace = leading_whitespace;
                    }
                    if (S.newline_before || S.endblock) {
                        return test_indent_token(leading_whitespace);
                    }
                }
            }
            function test_indent_token(leading_whitespace) {
                var most_recent;
                most_recent = S.whitespace_before[S.whitespace_before.length - 1] || "";
                S.endblock = false;
                if (S.indentation_matters.slice(-1)[0] && leading_whitespace !== most_recent) {
                    if (S.newblock && leading_whitespace && leading_whitespace.indexOf(most_recent) === 0) {
                        S.newblock = false;
                        S.whitespace_before.push(leading_whitespace);
                        return 1;
                    } else if (most_recent && most_recent.indexOf(leading_whitespace) === 0) {
                        S.endblock = true;
                        S.whitespace_before.pop();
                        return -1;
                    } else {
                        parse_error("Inconsistent indentation");
                    }
                } else {
                    return 0;
                }
            }
            function read_while(pred) {
                var ret, i;
                ret = "";
                i = 0;
                while ((ch = peek()) && pred(ch, i)) {
                    i += 1;
                    ret += next();
                }
                return ret;
            }
            function parse_error(err, is_eof) {
                throw new SyntaxError(err, filename, S.tokline, S.tokcol, S.tokpos, is_eof);
            }
            function read_num(prefix) {
                var has_e, after_e, has_x, has_dot, num, valid;
                has_e = false;
                after_e = false;
                has_x = false;
                has_dot = prefix === ".";
                num = read_while(function(ch, i) {
                    var code, tmp_;
                    code = ch.charCodeAt(0);
                    tmp_ = code;
                    if (tmp_ === 120 || tmp_ === 88) {
                        return has_x ? false : has_x = true;
                    } else if (tmp_ === 101 || tmp_ === 69) {
                        return has_x ? true : has_e ? false : has_e = after_e = true;
                    } else if (tmp_ === 45) {
                        return after_e || i === 0 && !prefix;
                    } else if (tmp_ === 43) {
                        return after_e;
                    } else if (tmp_ === 46) {
                        after_e = false;
                        return !has_dot && !has_x && !has_e ? has_dot = true : false;
                    }
                    return is_alphanumeric_char(code);
                });
                if (prefix) {
                    num = prefix + num;
                }
                valid = parse_js_number(num);
                if (!isNaN(valid)) {
                    return token("num", valid);
                } else {
                    parse_error("Invalid syntax: " + num);
                }
            }
            function read_escaped_char(in_string, digester) {
                var ch, tmp_;
                digester = digester || function(in_str) {
                    return next(true, in_str);
                };
                ch = digester(in_string);
                tmp_ = ch.charCodeAt(0);
                if (tmp_ === 110) {
                    return "\n";
                } else if (tmp_ === 114) {
                    return "\r";
                } else if (tmp_ === 116) {
                    return "\t";
                } else if (tmp_ === 98) {
                    return "\b";
                } else if (tmp_ === 118) {
                    return "";
                } else if (tmp_ === 102) {
                    return "\f";
                } else if (tmp_ === 48) {
                    return "\0";
                } else if (tmp_ === 120) {
                    return String.fromCharCode(hex_bytes(2, digester));
                } else if (tmp_ === 117) {
                    return String.fromCharCode(hex_bytes(4, digester));
                } else if (tmp_ === 10) {
                    return "";
                } else {
                    return ch;
                }
            }
            function hex_bytes(n, digester) {
                var num, digit, i;
                num = 0;
                for (i = 0; i < n; i++) {
                    digit = parseInt(digester(), 16);
                    if (isNaN(digit)) {
                        parse_error("Invalid hex-character pattern in string");
                    }
                    num = num << 4 | digit;
                }
                return num;
            }
            function with_eof_error(eof_error, cont) {
                return function(x) {
                    try {
                        return cont(x);
                    } catch (_$rapyd$_Exception) {
                        var ex = _$rapyd$_Exception;
                        if (ex === EX_EOF) {
                            parse_error(eof_error, true);
                        } else {
                            throw _$rapyd$_Exception;
                        }
                    }
                };
            }
            read_string = with_eof_error("Unterminated string constant", function() {
                var quote, ret, i, tmp, find_newlines, ch, octal_len, first;
                quote = next();
                ret = "";
                if (peek() === quote) {
                    next(true);
                    if (peek() === quote) {
                        next(true);
                        i = find(quote + quote + quote, true);
                        if (i !== -1) {
                            tmp = S.text.substring(S.pos, i);
                            S.pos = i + 3;
                            while (tmp.length) {
                                if (tmp[0] === "\\") {
                                    tmp = tmp.substr(1);
                                    ret += read_escaped_char(true, function() {
                                        var ch;
                                        ch = tmp[0];
                                        tmp = tmp.substr(1);
                                        return ch;
                                    });
                                } else {
                                    ret += tmp[0];
                                    tmp = tmp.substr(1);
                                }
                            }
                            find_newlines = ret.match(/\n/g);
                            if (find_newlines) {
                                S.line += find_newlines.length;
                            }
                            return token("string", ret);
                        }
                    } else {
                        return token("string", "");
                    }
                }
                while (true) {
                    ch = next(true);
                    if (ch === "\n") {
                        parse_error("End of line while scanning string literal.");
                    }
                    if (ch === "\\") {
                        octal_len = 0;
                        first = null;
                        ch = read_while(function(ch) {
                            if (ch >= "0" && ch <= "7") {
                                if (!first) {
                                    first = ch;
                                    return octal_len += 1;
                                } else if (first <= "3" && octal_len <= 2) {
                                    return octal_len += 1;
                                } else if (first >= "4" && octal_len <= 1) {
                                    return octal_len += 1;
                                }
                            }
                            return false;
                        });
                        if (octal_len > 0) {
                            ch = String.fromCharCode(parseInt(ch, 8));
                        } else if (peek() === "\n") {
                            next(true);
                            continue;
                        } else {
                            ch = read_escaped_char(true);
                        }
                    } else if (ch === quote) {
                        break;
                    }
                    ret += ch;
                }
                return token("string", ret);
            });
            function read_line_comment() {
                var shebang = (arguments[0] === undefined || ( 0 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [symbolfor("_$rapyd$_kwargs_obj")] === true)) ? (false) : arguments[0];
                var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
                if (typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [symbolfor("_$rapyd$_kwargs_obj")] !== true) _$rapyd$_kwargs_obj = {};
                if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "shebang")){
                    shebang = _$rapyd$_kwargs_obj.shebang;
                }
                var i, ret;
                if (!shebang) {
                    next();
                }
                i = find("\n");
                if (i === -1) {
                    ret = S.text.substr(S.pos);
                    S.pos = S.text.length;
                } else {
                    ret = S.text.substring(S.pos, i);
                    S.pos = i;
                }
                return token(shebang ? "shebang" : "comment1", ret, true);
            }
            function read_name() {
                var backslash, name, escaped, ch, hex;
                backslash = false;
                name = "";
                escaped = false;
                while ((ch = peek()) !== null) {
                    if (!backslash) {
                        if (ch === "\\") {
                            if (S.text.charAt(S.pos + 1) === "\n") {
                                S.pos += 2;
                                continue;
                            } else {
                                escaped = [backslash = true, next()];
                            }
                        } else if (is_identifier_char(ch)) {
                            name += next();
                        } else {
                            break;
                        }
                    } else {
                        if (ch !== "u") {
                            parse_error("Expecting UnicodeEscapeSequence -- uXXXX");
                        }
                        ch = read_escaped_char();
                        if (!is_identifier_char(ch)) {
                            parse_error("Unicode char: " + ch.charCodeAt(0) + " is not valid in identifier");
                        }
                        name += ch;
                        backslash = false;
                    }
                }
                if (KEYWORDS(name) && escaped) {
                    hex = name.charCodeAt(0).toString(16).toUpperCase();
                    name = "\\u" + "0000".substr(hex.length) + hex + name.slice(1);
                }
                return name;
            }
            read_regexp = with_eof_error("Unterminated regular expression", function() {
                var prev_backslash, regexp, in_class, mods;
                prev_backslash = false;
                regexp = "";
                in_class = false;
                while (ch = next(true)) {
                    if (prev_backslash) {
                        regexp += "\\" + ch;
                        prev_backslash = false;
                    } else if (ch === "[") {
                        in_class = true;
                        regexp += ch;
                    } else if (ch === "]" && in_class) {
                        in_class = false;
                        regexp += ch;
                    } else if (ch === "/" && !in_class) {
                        break;
                    } else if (ch === "\\") {
                        prev_backslash = true;
                    } else {
                        regexp += ch;
                    }
                }
                mods = read_name();
                return token("regexp", new RegExp(regexp, mods));
            });
            function read_operator(prefix) {
                var op;
                function grow(op) {
                    var bigger;
                    if (!peek()) {
                        return op;
                    }
                    bigger = op + peek();
                    if (OPERATORS(bigger)) {
                        next();
                        return grow(bigger);
                    } else {
                        return op;
                    }
                }
                op = grow(prefix || next());
                if (_$rapyd$_in(op, [ "++", "--", "===", "!==" ])) {
                    parse_error("Invalid operator «" + op + "»");
                }
                return token("operator", op);
            }
            function handle_slash() {
                next();
                return S.regex_allowed ? read_regexp("") : read_operator("/");
            }
            function handle_dot() {
                next();
                return is_digit(peek().charCodeAt(0)) ? read_num(".") : token("punc", ".");
            }
            function read_word() {
                var word;
                word = read_name();
                return KEYWORDS_ATOM(word) ? token("atom", word) : !KEYWORDS(word) ? token("name", word) : OPERATORS(word) && prevChar() !== "." ? token("operator", word) : token("keyword", word);
            }
            function next_token() {
                var indent, ch, code, tmp_, regex_allowed;
                indent = parse_whitespace();
                if (indent === -1) {
                    return token("punc", "}", false, true);
                }
                start_token();
                ch = peek();
                if (!ch) {
                    return token("eof");
                }
                code = ch.charCodeAt(0);
                tmp_ = code;
                if (tmp_ === 34 || tmp_ === 39) {
                    return read_string();
                } else if (tmp_ === 35) {
                    if (S.pos === 0 && S.text.charAt(1) === "!") {
                        return read_line_comment(true);
                    }
                    regex_allowed = S.regex_allowed;
                    S.comments_before.push(read_line_comment());
                    S.regex_allowed = regex_allowed;
                    return next_token();
                } else if (tmp_ === 46) {
                    return handle_dot();
                } else if (tmp_ === 47) {
                    return handle_slash();
                }
                if (is_digit(code)) {
                    return read_num();
                }
                if (PUNC_CHARS(ch)) {
                    return token("punc", next());
                }
                if (OPERATOR_CHARS(ch)) {
                    return read_operator();
                }
                if (code === 92 && S.text.charAt(S.pos + 1) === "\n") {
                    next();
                    next();
                    S.newline_before = false;
                    return next_token();
                }
                if (code === 92 || is_identifier_start(code)) {
                    return read_word();
                }
                parse_error("Unexpected character «" + ch + "»");
            }
            next_token.context = function(nc) {
                if (nc) {
                    S = nc;
                }
                return S;
            };
            return next_token;
        }
        _$rapyd$_modules["tokenizer"]["RE_HEX_NUMBER"] = RE_HEX_NUMBER;

        _$rapyd$_modules["tokenizer"]["RE_OCT_NUMBER"] = RE_OCT_NUMBER;

        _$rapyd$_modules["tokenizer"]["RE_DEC_NUMBER"] = RE_DEC_NUMBER;

        _$rapyd$_modules["tokenizer"]["UNARY_POSTFIX"] = UNARY_POSTFIX;

        _$rapyd$_modules["tokenizer"]["OPERATOR_CHARS"] = OPERATOR_CHARS;

        _$rapyd$_modules["tokenizer"]["OPERATORS"] = OPERATORS;

        _$rapyd$_modules["tokenizer"]["OP_MAP"] = OP_MAP;

        _$rapyd$_modules["tokenizer"]["WHITESPACE_CHARS"] = WHITESPACE_CHARS;

        _$rapyd$_modules["tokenizer"]["PUNC_BEFORE_EXPRESSION"] = PUNC_BEFORE_EXPRESSION;

        _$rapyd$_modules["tokenizer"]["PUNC_CHARS"] = PUNC_CHARS;

        _$rapyd$_modules["tokenizer"]["REGEXP_MODIFIERS"] = REGEXP_MODIFIERS;

        _$rapyd$_modules["tokenizer"]["KEYWORDS"] = KEYWORDS;

        _$rapyd$_modules["tokenizer"]["KEYWORDS_ATOM"] = KEYWORDS_ATOM;

        _$rapyd$_modules["tokenizer"]["RESERVED_WORDS"] = RESERVED_WORDS;

        _$rapyd$_modules["tokenizer"]["KEYWORDS_BEFORE_EXPRESSION"] = KEYWORDS_BEFORE_EXPRESSION;

        _$rapyd$_modules["tokenizer"]["ALL_KEYWORDS"] = ALL_KEYWORDS;

        _$rapyd$_modules["tokenizer"]["IDENTIFIER_PAT"] = IDENTIFIER_PAT;

        _$rapyd$_modules["tokenizer"]["UNICODE"] = UNICODE;

        _$rapyd$_modules["tokenizer"]["EX_EOF"] = EX_EOF;

        _$rapyd$_modules["tokenizer"]["is_letter"] = is_letter;

        _$rapyd$_modules["tokenizer"]["is_digit"] = is_digit;

        _$rapyd$_modules["tokenizer"]["is_alphanumeric_char"] = is_alphanumeric_char;

        _$rapyd$_modules["tokenizer"]["is_unicode_combining_mark"] = is_unicode_combining_mark;

        _$rapyd$_modules["tokenizer"]["is_unicode_connector_punctuation"] = is_unicode_connector_punctuation;

        _$rapyd$_modules["tokenizer"]["is_identifier"] = is_identifier;

        _$rapyd$_modules["tokenizer"]["is_identifier_start"] = is_identifier_start;

        _$rapyd$_modules["tokenizer"]["is_identifier_char"] = is_identifier_char;

        _$rapyd$_modules["tokenizer"]["parse_js_number"] = parse_js_number;

        _$rapyd$_modules["tokenizer"]["is_token"] = is_token;

        _$rapyd$_modules["tokenizer"]["tokenizer"] = tokenizer;
    })();

    (function(){
        var __name__ = "parse";
        var COMPILER_VERSION, NATIVE_CLASSES, COMMON_STATIC, UNARY_PREFIX, ASSIGNMENT, PRECEDENCE, STATEMENTS_WITH_LABELS, ATOMIC_START_TOKEN;
        "use strict";
        var make_predicate = _$rapyd$_modules["utils"].make_predicate;
        var array_to_hash = _$rapyd$_modules["utils"].array_to_hash;
        var defaults = _$rapyd$_modules["utils"].defaults;
        
        var SyntaxError = _$rapyd$_modules["errors"].SyntaxError;
        var ImportError = _$rapyd$_modules["errors"].ImportError;
        
        var AST_Accessor = _$rapyd$_modules["ast"].AST_Accessor;
        var AST_Array = _$rapyd$_modules["ast"].AST_Array;
        var AST_Assign = _$rapyd$_modules["ast"].AST_Assign;
        var AST_Binary = _$rapyd$_modules["ast"].AST_Binary;
        var AST_BlockStatement = _$rapyd$_modules["ast"].AST_BlockStatement;
        var AST_Break = _$rapyd$_modules["ast"].AST_Break;
        var AST_Call = _$rapyd$_modules["ast"].AST_Call;
        var AST_Case = _$rapyd$_modules["ast"].AST_Case;
        var AST_Catch = _$rapyd$_modules["ast"].AST_Catch;
        var AST_Class = _$rapyd$_modules["ast"].AST_Class;
        var AST_ClassCall = _$rapyd$_modules["ast"].AST_ClassCall;
        var AST_Conditional = _$rapyd$_modules["ast"].AST_Conditional;
        var AST_Const = _$rapyd$_modules["ast"].AST_Const;
        var AST_Constant = _$rapyd$_modules["ast"].AST_Constant;
        var AST_Continue = _$rapyd$_modules["ast"].AST_Continue;
        var AST_DWLoop = _$rapyd$_modules["ast"].AST_DWLoop;
        var AST_Debugger = _$rapyd$_modules["ast"].AST_Debugger;
        var AST_Decorator = _$rapyd$_modules["ast"].AST_Decorator;
        var AST_Default = _$rapyd$_modules["ast"].AST_Default;
        var AST_Definitions = _$rapyd$_modules["ast"].AST_Definitions;
        var AST_DictComprehension = _$rapyd$_modules["ast"].AST_DictComprehension;
        var AST_Directive = _$rapyd$_modules["ast"].AST_Directive;
        var AST_Do = _$rapyd$_modules["ast"].AST_Do;
        var AST_Dot = _$rapyd$_modules["ast"].AST_Dot;
        var AST_EmptyStatement = _$rapyd$_modules["ast"].AST_EmptyStatement;
        var AST_Except = _$rapyd$_modules["ast"].AST_Except;
        var AST_Exit = _$rapyd$_modules["ast"].AST_Exit;
        var AST_ExpressiveObject = _$rapyd$_modules["ast"].AST_ExpressiveObject;
        var AST_False = _$rapyd$_modules["ast"].AST_False;
        var AST_Finally = _$rapyd$_modules["ast"].AST_Finally;
        var AST_ForIn = _$rapyd$_modules["ast"].AST_ForIn;
        var AST_ForJS = _$rapyd$_modules["ast"].AST_ForJS;
        var AST_Function = _$rapyd$_modules["ast"].AST_Function;
        var AST_Hole = _$rapyd$_modules["ast"].AST_Hole;
        var AST_If = _$rapyd$_modules["ast"].AST_If;
        var AST_Import = _$rapyd$_modules["ast"].AST_Import;
        var AST_ImportedVar = _$rapyd$_modules["ast"].AST_ImportedVar;
        var AST_Imports = _$rapyd$_modules["ast"].AST_Imports;
        var AST_ListComprehension = _$rapyd$_modules["ast"].AST_ListComprehension;
        var AST_Method = _$rapyd$_modules["ast"].AST_Method;
        var AST_New = _$rapyd$_modules["ast"].AST_New;
        var AST_Null = _$rapyd$_modules["ast"].AST_Null;
        var AST_Number = _$rapyd$_modules["ast"].AST_Number;
        var AST_Object = _$rapyd$_modules["ast"].AST_Object;
        var AST_ObjectKeyVal = _$rapyd$_modules["ast"].AST_ObjectKeyVal;
        var AST_PropAccess = _$rapyd$_modules["ast"].AST_PropAccess;
        var AST_RegExp = _$rapyd$_modules["ast"].AST_RegExp;
        var AST_Return = _$rapyd$_modules["ast"].AST_Return;
        var AST_Scope = _$rapyd$_modules["ast"].AST_Scope;
        var AST_SetComprehension = _$rapyd$_modules["ast"].AST_SetComprehension;
        var AST_Seq = _$rapyd$_modules["ast"].AST_Seq;
        var AST_SimpleStatement = _$rapyd$_modules["ast"].AST_SimpleStatement;
        var AST_Splice = _$rapyd$_modules["ast"].AST_Splice;
        var AST_String = _$rapyd$_modules["ast"].AST_String;
        var AST_Sub = _$rapyd$_modules["ast"].AST_Sub;
        var AST_Switch = _$rapyd$_modules["ast"].AST_Switch;
        var AST_SymbolAccessor = _$rapyd$_modules["ast"].AST_SymbolAccessor;
        var AST_SymbolAlias = _$rapyd$_modules["ast"].AST_SymbolAlias;
        var AST_SymbolCatch = _$rapyd$_modules["ast"].AST_SymbolCatch;
        var AST_SymbolConst = _$rapyd$_modules["ast"].AST_SymbolConst;
        var AST_SymbolDefun = _$rapyd$_modules["ast"].AST_SymbolDefun;
        var AST_SymbolFunarg = _$rapyd$_modules["ast"].AST_SymbolFunarg;
        var AST_SymbolLambda = _$rapyd$_modules["ast"].AST_SymbolLambda;
        var AST_SymbolNonlocal = _$rapyd$_modules["ast"].AST_SymbolNonlocal;
        var AST_SymbolRef = _$rapyd$_modules["ast"].AST_SymbolRef;
        var AST_SymbolVar = _$rapyd$_modules["ast"].AST_SymbolVar;
        var AST_This = _$rapyd$_modules["ast"].AST_This;
        var AST_Throw = _$rapyd$_modules["ast"].AST_Throw;
        var AST_Toplevel = _$rapyd$_modules["ast"].AST_Toplevel;
        var AST_True = _$rapyd$_modules["ast"].AST_True;
        var AST_Try = _$rapyd$_modules["ast"].AST_Try;
        var AST_UnaryPostfix = _$rapyd$_modules["ast"].AST_UnaryPostfix;
        var AST_UnaryPrefix = _$rapyd$_modules["ast"].AST_UnaryPrefix;
        var AST_Undefined = _$rapyd$_modules["ast"].AST_Undefined;
        var AST_Var = _$rapyd$_modules["ast"].AST_Var;
        var AST_VarDef = _$rapyd$_modules["ast"].AST_VarDef;
        var AST_Verbatim = _$rapyd$_modules["ast"].AST_Verbatim;
        var AST_While = _$rapyd$_modules["ast"].AST_While;
        var AST_With = _$rapyd$_modules["ast"].AST_With;
        var AST_Yield = _$rapyd$_modules["ast"].AST_Yield;
        
        var tokenizer = _$rapyd$_modules["tokenizer"].tokenizer;
        var is_token = _$rapyd$_modules["tokenizer"].is_token;
        var UNARY_POSTFIX = _$rapyd$_modules["tokenizer"].UNARY_POSTFIX;
        
        COMPILER_VERSION = "70c1e751d494985e1a09a52b34a18b615e5e7b3b";
        NATIVE_CLASSES = {
            "Image": {},
            "RegExp": {},
            "Error": {},
            "Object": {
                "static": [ "getOwnPropertyNames", "keys", "create" ]
            },
            "String": {
                "static": [ "fromCharCode" ]
            },
            "Array": {
                "static": [ "isArray", "from", "of" ]
            },
            "Number": {
                "static": [ "isFinite", "isNaN" ]
            },
            "Function": {},
            "Date": {
                "static": [ "UTC", "now", "parse" ]
            },
            "Boolean": {},
            "ArrayBuffer": {},
            "DataView": {},
            "Float32Array": {},
            "Float64Array": {},
            "Int16Array": {},
            "Int32Array": {},
            "Int8Array": {},
            "Uint16Array": {},
            "Uint32Array": {},
            "Uint8Array": {},
            "Uint8ClampedArray": {},
            "Map": {},
            "WeakMap": {},
            "Set": {},
            "WeakSet": {},
            "Symbol": {}
        };
        COMMON_STATIC = [ "call", "apply", "bind", "toString" ];
        UNARY_PREFIX = make_predicate([ "typeof", "void", "delete", "--", "++", "!", "~", "-", "+", "@" ]);
        ASSIGNMENT = make_predicate([ "=", "+=", "-=", "/=", "//=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=" ]);
        PRECEDENCE = function(a, ret) {
            var b, j, i;
            for (i = 0; i < a.length; i++) {
                b = a[i];
                for (j = 0; j < b.length; j++) {
                    ret[b[j]] = i + 1;
                }
            }
            return ret;
        }.call(this, [ [ "||" ], [ "&&" ], [ "|" ], [ "^" ], [ "&" ], [ "==", "===", "!=", "!==" ], [ "<", ">", "<=", ">=", "in", "instanceof" ], [ ">>", "<<", ">>>" ], [ "+", "-" ], [ "*", "/", "//", "%" ], [ "**" ] ], {});
        STATEMENTS_WITH_LABELS = array_to_hash([ "for", "do", "while", "switch" ]);
        ATOMIC_START_TOKEN = array_to_hash([ "atom", "num", "string", "regexp", "name" ]);
        function parse($TEXT, options) {
            var module_id, baselib_items, imported_module_ids, IMPORTED, IMPORTING, S, obj, cname, statement, import_, class_, function_, nonlocal_, const_, new_, expr_atom, array_, object_, subscripts, maybe_unary, expr_op, maybe_conditional, maybe_assign, expression;
            options = defaults(options, {
                "strict": false,
                "filename": null,
                "auto_bind": false,
                "module_id": "__main__",
                "toplevel": null,
                "for_linting": false,
                "classes": undefined
            });
            module_id = options.module_id;
            baselib_items = {};
            imported_module_ids = [];
            IMPORTED = options.IMPORTED || {};
            IMPORTING = options.IMPORTING || {};
            IMPORTING[module_id] = true;
            S = {
                "input": typeof $TEXT === "string" ? tokenizer($TEXT, options.filename) : $TEXT,
                "token": null,
                "prev": null,
                "peeked": [],
                "in_function": 0,
                "in_directives": true,
                "statement_starting_token": null,
                "in_comprehension": false,
                "in_parenthesized_expr": false,
                "in_loop": 0,
                "in_class": [ false ],
                "classes": [ {} ],
                "functions": [ {} ],
                "labels": [],
                "decorators": []
            };
            if (options.classes) {
                var _$rapyd$_Iter5 = _$rapyd$_Iterable(options.classes);
                for (var _$rapyd$_Index5 = 0; _$rapyd$_Index5 < _$rapyd$_Iter5.length; _$rapyd$_Index5++) {
                    cname = _$rapyd$_Iter5[_$rapyd$_Index5];
                    obj = options.classes[cname];
                    S.classes[0][cname] = {
                        "static": obj.static,
                        "bound": obj.bound
                    };
                }
            }
            function next() {
                S.prev = S.token;
                if (S.peeked.length) {
                    S.token = S.peeked.shift();
                } else {
                    S.token = S.input();
                }
                S.in_directives = S.in_directives && (S.token.type === "string" || is_("punc", ";"));
                return S.token;
            }
            S.token = next();
            function is_(type, value) {
                return is_token(S.token, type, value);
            }
            function peek() {
                if (!S.peeked.length) {
                    S.peeked.push(S.input());
                }
                return S.peeked[0];
            }
            function prev() {
                return S.prev;
            }
            function croak(msg, line, col, pos, is_eof) {
                var ctx;
                ctx = S.input.context();
                throw new SyntaxError(msg, ctx.filename, line !== undefined ? line : ctx.tokline, col !== undefined ? col : ctx.tokcol, pos !== undefined ? pos : ctx.tokpos, is_eof);
            }
            function token_error(token, msg) {
                var is_eof;
                is_eof = token.type === "eof" ? true : false;
                croak(msg, token.line, token.col, undefined, is_eof);
            }
            function unexpected(token) {
                if (token === undefined) {
                    token = S.token;
                }
                token_error(token, "Unexpected token: " + token.type + " «" + token.value + "»");
            }
            function expect_token(type, val) {
                if (is_(type, val)) {
                    return next();
                }
                token_error(S.token, "Unexpected token " + S.token.type + " «" + S.token.value + "»" + ", expected " + type + " «" + val + "»");
            }
            function expect(punc) {
                return expect_token("punc", punc);
            }
            function can_insert_semicolon() {
                return !options.strict && (S.token.nlb || is_("eof") || is_("punc", "}"));
            }
            function semicolon() {
                if (is_("punc", ";")) {
                    next();
                    S.token.nlb = true;
                }
            }
            function parenthesised() {
                var exp;
                expect("(");
                exp = expression(true);
                expect(")");
                return exp;
            }
            function embed_tokens(parser) {
                return function() {
                    var start, expr, end;
                    start = S.token;
                    expr = parser();
                    if (expr === undefined) {
                        unexpected();
                    }
                    end = prev();
                    expr.start = start;
                    expr.end = end;
                    return expr;
                };
            }
            function is_nested_comparison(stmt) {
                var comparators;
                "\n        Check if the statement is a nested comparison\n        ";
                comparators = {
                    "<": true,
                    ">": true,
                    "<=": true,
                    ">=": true,
                    "==": true,
                    "!=": true,
                    "===": true,
                    "!==": true
                };
                if (stmt instanceof AST_Binary && _$rapyd$_in(stmt.operator, comparators) && stmt.left instanceof AST_Binary && _$rapyd$_in(stmt.left.operator, comparators)) {
                    return true;
                } else {
                    return false;
                }
            }
            function scan_for_top_level_callables(body) {
                var ans, obj, opt, x, name;
                ans = [];
                if (Array.isArray(body)) {
                    for (name in body) {
                        obj = body[name];
                        if (obj instanceof AST_Function || obj instanceof AST_Class) {
                            ans.push(obj.name);
                        } else {
                            if (obj instanceof AST_Scope) {
                                continue;
                            }
                            var _$rapyd$_Iter6 = _$rapyd$_Iterable([ "body", "alternative" ]);
                            for (var _$rapyd$_Index6 = 0; _$rapyd$_Index6 < _$rapyd$_Iter6.length; _$rapyd$_Index6++) {
                                x = _$rapyd$_Iter6[_$rapyd$_Index6];
                                opt = obj[x];
                                if (opt) {
                                    ans = ans.concat(scan_for_top_level_callables(opt));
                                }
                                if (opt instanceof AST_Assign && !(opt.right instanceof AST_Scope)) {
                                    ans = ans.concat(scan_for_top_level_callables(opt.right));
                                }
                            }
                        }
                    }
                } else if (body.body) {
                    ans = ans.concat(scan_for_top_level_callables(body.body));
                    if (body.alternative) {
                        ans = ans.concat(scan_for_top_level_callables(body.alternative));
                    }
                }
                return ans;
            }
            function scan_for_classes(body) {
                var ans, obj, name;
                ans = {};
                for (name in body) {
                    obj = body[name];
                    if (obj instanceof AST_Class) {
                        ans[obj.name.name] = obj;
                    }
                }
                return ans;
            }
            function scan_for_local_vars(body) {
                var localvars, seen, stmt;
                "\n        Pick out all variables being assigned to from within this scope, we'll mark them as local\n\n        body        body to be scanned\n        ";
                localvars = [];
                seen = {};
                function push(x) {
                    if (Object.prototype.hasOwnProperty.call(seen, x)) {
                        return;
                    }
                    seen[x] = true;
                    localvars.push(x);
                }
                function extend(arr) {
                    var x;
                    var _$rapyd$_Iter7 = _$rapyd$_Iterable(arr);
                    for (var _$rapyd$_Index7 = 0; _$rapyd$_Index7 < _$rapyd$_Iter7.length; _$rapyd$_Index7++) {
                        x = _$rapyd$_Iter7[_$rapyd$_Index7];
                        push(x);
                    }
                }
                function scan_in_array(arr) {
                    var x;
                    var _$rapyd$_Iter8 = _$rapyd$_Iterable(arr);
                    for (var _$rapyd$_Index8 = 0; _$rapyd$_Index8 < _$rapyd$_Iter8.length; _$rapyd$_Index8++) {
                        x = _$rapyd$_Iter8[_$rapyd$_Index8];
                        if (x instanceof AST_Seq) {
                            x = x.to_array();
                            baselib_items["_$rapyd$_flatten"] = true;
                        } else if (x instanceof AST_Array) {
                            x = x.elements;
                            baselib_items["_$rapyd$_flatten"] = true;
                        }
                        if (Array.isArray(x)) {
                            scan_in_array(x);
                        } else {
                            if (!(x instanceof AST_PropAccess)) {
                                push(x.name);
                            }
                        }
                    }
                }
                if (Array.isArray(body)) {
                    for (stmt in body) {
                        if (body[stmt] instanceof AST_Scope) {
                            continue;
                        }
                        [ "body", "alternative" ].forEach(function(option) {
                            var opt;
                            opt = body[stmt][option];
                            if (opt) {
                                extend(scan_for_local_vars(opt));
                            }
                            if (opt instanceof AST_Assign && !(opt.right instanceof AST_Scope)) {
                                extend(scan_for_local_vars(opt.right));
                            }
                        });
                        if (body[stmt] instanceof AST_ForIn) {
                            if (body[stmt].init instanceof AST_Array) {
                                push("_$rapyd$_Unpack");
                                scan_in_array(body[stmt].init.elements);
                            } else {
                                push(body[stmt].init.name);
                            }
                        } else if (body[stmt] instanceof AST_DWLoop) {
                            extend(scan_for_local_vars(body[stmt]));
                        } else if (body[stmt] instanceof AST_If && is_nested_comparison(body[stmt].condition)) {
                            push("_$rapyd$_Temp");
                        } else if (body[stmt] instanceof AST_Exit && is_nested_comparison(body[stmt].value)) {
                            push("_$rapyd$_Temp");
                        }
                    }
                } else if (body.body) {
                    extend(scan_for_local_vars(body.body));
                    if (body.alternative) {
                        extend(scan_for_local_vars(body.alternative));
                    }
                } else if (body instanceof AST_Assign) {
                    if (body.left instanceof AST_Array) {
                        push("_$rapyd$_Unpack");
                        scan_in_array(body.left.elements);
                    } else if (body.left.name) {
                        push(body.left.name);
                    }
                    if (is_nested_comparison(body.right)) {
                        push("_$rapyd$_Temp");
                    } else if (body.right instanceof AST_Conditional && is_nested_comparison(body.right.condition)) {
                        push("_$rapyd$_Temp");
                    }
                } else if (body instanceof AST_Conditional && is_nested_comparison(body.condition)) {
                    push("_$rapyd$_Temp");
                } else if (is_nested_comparison(body)) {
                    push("_$rapyd$_Temp");
                }
                return localvars;
            }
            function scan_for_nonlocal_defs(body) {
                var vars, stmt;
                vars = [];
                if (Array.isArray(body)) {
                    for (stmt in body) {
                        if (body[stmt] instanceof AST_Scope) {
                            continue;
                        }
                        if (body[stmt] instanceof AST_Definitions) {
                            body[stmt].definitions.forEach(function(vardef) {
                                vars.push(vardef.name.name);
                            });
                        }
                        [ "body", "alternative" ].forEach(function(option) {
                            var opt;
                            opt = body[stmt][option];
                            if (opt) {
                                vars = vars.concat(scan_for_nonlocal_defs(opt));
                            }
                        });
                    }
                } else if (body.body) {
                    vars = vars.concat(scan_for_nonlocal_defs(body.body));
                    if (body.alternative) {
                        vars = vars.concat(scan_for_nonlocal_defs(body.alternative));
                    }
                }
                return vars;
            }
            statement = embed_tokens(function() {
                var tmp_, dir, stat, start, func, chain, tmp;
                if (S.token.type === "operator" && S.token.value.substr(0, 1) === "/") {
                    token_error(S.token, "RapydScript does not support statements starting with regexp literals");
                }
                S.statement_starting_token = S.token;
                tmp_ = S.token.type;
                if (tmp_ === "string") {
                    dir = S.in_directives;
                    stat = simple_statement();
                    if (dir && stat.body instanceof AST_String && !is_("punc", ",")) {
                        return new AST_Directive({
                            "value": stat.body.value
                        });
                    }
                    return stat;
                } else if (tmp_ === "shebang") {
                    tmp_ = S.token.value;
                    next();
                    return new AST_Directive({
                        "value": tmp_
                    });
                } else if (tmp_ === "num" || tmp_ === "regexp" || tmp_ === "operator" || tmp_ === "atom") {
                    return simple_statement();
                } else if (tmp_ === "punc") {
                    tmp_ = S.token.value;
                    if (tmp_ === ":") {
                        return new AST_BlockStatement({
                            "start": S.token,
                            "body": block_(),
                            "end": prev()
                        });
                    } else if (tmp_ === "{" || tmp_ === "[" || tmp_ === "(") {
                        return simple_statement();
                    } else if (tmp_ === ";") {
                        next();
                        return new AST_EmptyStatement({
                            "stype": ";",
                            "start": prev(),
                            "end": prev()
                        });
                    } else {
                        unexpected();
                    }
                } else if (tmp_ === "name") {
                    if (is_token(peek(), "punc", ":")) token_error(peek(), "invalid syntax, colon not allowed here");
                    return simple_statement();
                } else if (tmp_ === "keyword") {
                    tmp_ = S.token.value;
                    next();
                    if (tmp_ === "break") {
                        return break_cont(AST_Break);
                    } else if (tmp_ === "continue") {
                        return break_cont(AST_Continue);
                    } else if (tmp_ === "debugger") {
                        semicolon();
                        return new AST_Debugger();
                    } else if (tmp_ === "do") {
                        return new AST_Do({
                            "body": in_loop(statement),
                            "condition": function() {
                                var tmp;
                                expect(".");
                                expect_token("keyword", "while");
                                tmp = expression(true);
                                semicolon();
                                return tmp;
                            }.call(this)
                        });
                    } else if (tmp_ === "while") {
                        return new AST_While({
                            "condition": expression(true),
                            "body": in_loop(statement)
                        });
                    } else if (tmp_ === "for") {
                        if (is_("name", "JS")) {
                            return for_js();
                        }
                        return for_();
                    } else if (tmp_ === "from") {
                        return import_(true);
                    } else if (tmp_ === "import") {
                        return import_(false);
                    } else if (tmp_ === "class") {
                        baselib_items["extends"] = true;
                        if (options.auto_bind) {
                            baselib_items["rebind_all"] = true;
                        }
                        return class_();
                    } else if (tmp_ === "def") {
                        start = prev();
                        func = function_(S.in_class.slice(-1)[0]);
                        func.start = start;
                        func.end = prev();
                        chain = subscripts(func, true);
                        if (chain === func) {
                            return func;
                        } else {
                            return new AST_SimpleStatement({
                                "start": start,
                                "body": chain,
                                "end": prev()
                            });
                        }
                    } else if (tmp_ === "if") {
                        return if_();
                    } else if (tmp_ === "pass") {
                        semicolon();
                        return new AST_EmptyStatement({
                            "stype": "pass",
                            "start": prev(),
                            "end": prev()
                        });
                    } else if (tmp_ === "return") {
                        if (S.in_function === 0) {
                            croak("'return' outside of function");
                        }
                        if (S.functions[S.functions.length-1].is_generator) {
                            croak("'return' not allowed in a a function with yield");
                        }
                        S.functions[S.functions.length-1].is_generator = false;
                        return new AST_Return({
                            "value": is_("punc", ";") ? function() {
                                semicolon();
                                return null;
                            }.call(this) : can_insert_semicolon() ? null : function() {
                                var tmp;
                                tmp = expression(true);
                                semicolon();
                                return tmp;
                            }.call(this)
                        });
                    } else if (tmp_ === "yield") {
                        return yield_();
                    } else if (tmp_ === "switch") {
                        return new AST_Switch({
                            "expression": parenthesised(),
                            "body": in_loop(switch_body_)
                        });
                    } else if (tmp_ === "raise") {
                        if (S.token.nlb) {
                            return new AST_Throw({
                                "value": new AST_SymbolCatch({
                                    "name": "_$rapyd$_Exception"
                                })
                            });
                        }
                        tmp = expression(true);
                        semicolon();
                        return new AST_Throw({
                            "value": tmp
                        });
                    } else if (tmp_ === "try") {
                        return try_();
                    } else if (tmp_ === "nonlocal") {
                        tmp = nonlocal_();
                        semicolon();
                        return tmp;
                    } else if (tmp_ === "const") {
                        tmp = const_();
                        semicolon();
                        return tmp;
                    } else if (tmp_ === "with") {
                        return new AST_With({
                            "expression": parenthesised(),
                            "body": statement()
                        });
                    } else {
                        unexpected();
                    }
                }
            });
            function simple_statement(tmp) {
                tmp = expression(true);
                semicolon();
                return new AST_SimpleStatement({
                    "body": tmp
                });
            }
            function break_cont(type) {
                if (S.in_loop === 0) {
                    croak(type.TYPE + " not inside a loop or switch");
                }
                semicolon();
                return new type();
            }
            function yield_() {
                var is_yield_from;
                if (S.in_function === 0) {
                    croak("'yield' outside of function");
                }
                if (S.functions[S.functions.length-1].is_generator === false) {
                    croak("'yield' not allowed in a function with return");
                }
                S.functions[S.functions.length-1].is_generator = true;
                is_yield_from = is_("keyword", "from");
                if (is_yield_from) {
                    next();
                }
                return new AST_Yield({
                    "is_yield_from": is_yield_from,
                    "value": is_("punc", ";") ? function() {
                        semicolon();
                        return null;
                    }.call(this) : can_insert_semicolon() ? null : function() {
                        var tmp;
                        tmp = expression(true);
                        semicolon();
                        return tmp;
                    }.call(this)
                });
            }
            function for_(list_comp) {
                var init, tmp;
                init = null;
                if (!is_("punc", ";")) {
                    init = expression(true, true);
                    if (init instanceof AST_Seq) {
                        if (init.car instanceof AST_SymbolRef && init.cdr instanceof AST_SymbolRef) {
                            tmp = init.to_array();
                        } else {
                            tmp = [ init ];
                        }
                        init = new AST_Array({
                            "start": init.start,
                            "elements": tmp,
                            "end": init.end
                        });
                    }
                    if (is_("operator", "in")) {
                        if (init instanceof AST_Var && init.definitions.length > 1) {
                            croak("Only one variable declaration allowed in for..in loop");
                        }
                        next();
                        return for_in(init, list_comp);
                    }
                }
                unexpected();
            }
            function for_in(init, list_comp) {
                var lhs, obj;
                lhs = init instanceof AST_Var ? init.definitions[0].name : null;
                obj = expression(true);
                baselib_items["iterable"] = true;
                if (list_comp) {
                    return {
                        "init": init,
                        "name": lhs,
                        "object": obj
                    };
                }
                return new AST_ForIn({
                    "init": init,
                    "name": lhs,
                    "object": obj,
                    "body": in_loop(statement)
                });
            }
            function for_js() {
                var condition;
                condition = expression(true, true);
                return new AST_ForJS({
                    "condition": condition,
                    "body": in_loop(statement)
                });
            }
            function get_class_in_scope(expr) {
                var s, referenced_path, class_name;
                if (expr instanceof AST_SymbolRef) {
                    if (NATIVE_CLASSES.hasOwnProperty(expr.name)) {
                        return NATIVE_CLASSES[expr.name];
                    }
                    for (s = S.classes.length - 1; s > -1; s-=1) {
                        if (S.classes[s].hasOwnProperty(expr.name)) {
                            return S.classes[s][expr.name];
                        }
                    }
                } else if (expr instanceof AST_Dot) {
                    referenced_path = [];
                    while (expr instanceof AST_Dot) {
                        referenced_path.unshift(expr.property);
                        expr = expr.expression;
                    }
                    if (expr instanceof AST_SymbolRef) {
                        referenced_path.unshift(expr.name);
                        if (len(referenced_path) > 1) {
                            class_name = referenced_path.join(".");
                            for (s = S.classes.length - 1; s > -1; s-=1) {
                                if (S.classes[s].hasOwnProperty(class_name)) {
                                    return S.classes[s][class_name];
                                }
                            }
                        }
                    }
                }
                return false;
            }
            function import_error(message) {
                var ctx;
                ctx = S.input.context();
                throw new ImportError(message, ctx.filename, ctx.tokline, ctx.tokcol, ctx.tokpos);
            }
            function do_import(key) {
                var package_module_id, src_code, filename, modpath, _$rapyd$_Unpack, data, location, cached, srchash, ikey, bitem;
                if (IMPORTED.hasOwnProperty(key)) {
                    return;
                }
                if (IMPORTING.hasOwnProperty(key) && IMPORTING[key]) {
                    import_error("Detected a recursive import of: " + key + " while importing: " + module_id);
                }
                package_module_id = key.split(".").slice(0, -1).join(".");
                if (len(package_module_id) > 0) {
                    do_import(package_module_id);
                }
                if (options.for_linting) {
                    IMPORTED[key] = {
                        "is_cached": true,
                        "classes": {},
                        "module_id": key,
                        "exports": [],
                        "submodules": [],
                        "nonlocalvars": [],
                        "baselib": {},
                        "outputs": {}
                    };
                    if (len(package_module_id) > 0) {
                        IMPORTED[package_module_id].submodules.push(key);
                    }
                    return;
                }
                function safe_read(base_path) {
                    var _$rapyd$_Unpack, i, path;
                    var _$rapyd$_Iter9 = _$rapyd$_Iterable(enumerate([ base_path + ".pyj", base_path + "/__init__.pyj" ]));
                    for (var _$rapyd$_Index9 = 0; _$rapyd$_Index9 < _$rapyd$_Iter9.length; _$rapyd$_Index9++) {
                        _$rapyd$_Unpack = _$rapyd$_Iter9[_$rapyd$_Index9];
                        i = _$rapyd$_Unpack[0];
                        path = _$rapyd$_Unpack[1];
                        try {
                            return [ readfile(path, "utf-8"), path ];
                        } catch (_$rapyd$_Exception) {
                            var e = _$rapyd$_Exception;
                            if (e.code === "ENOENT" || e.code === "EPERM" || e.code === "EACCESS") {
                                if (i === 1) {
                                    return [null, null];
                                }
                            }
                            if (i === 1) {
                                throw _$rapyd$_Exception;
                            }
                        }
                    }
                }
                src_code = filename = null;
                modpath = key.replace(".", "/");
                var _$rapyd$_Iter10 = _$rapyd$_Iterable([ options.basedir, options.libdir ]);
                for (var _$rapyd$_Index10 = 0; _$rapyd$_Index10 < _$rapyd$_Iter10.length; _$rapyd$_Index10++) {
                    location = _$rapyd$_Iter10[_$rapyd$_Index10];
                    if (location) {
                        _$rapyd$_Unpack = safe_read(location + "/" + modpath);
                        data = _$rapyd$_Unpack[0];
                        filename = _$rapyd$_Unpack[1];
                        if (data !== null) {
                            src_code = data;
                            break;
                        }
                    }
                }
                if (src_code === null) {
                    import_error("Failed Import: '" + key + "' module doesn't exist in either '" + options.basedir + "' or '" + options.libdir + "'");
                }
                try {
                    cached = JSON.parse(readfile(filename + "-cached", "utf-8"));
                } catch (_$rapyd$_Exception) {
                    cached = null;
                }
                srchash = sha1sum(src_code);
                if (cached && cached["version"] === COMPILER_VERSION && cached["signature"] === srchash) {
                    var _$rapyd$_Iter11 = _$rapyd$_Iterable(cached.imported_module_ids);
                    for (var _$rapyd$_Index11 = 0; _$rapyd$_Index11 < _$rapyd$_Iter11.length; _$rapyd$_Index11++) {
                        ikey = _$rapyd$_Iter11[_$rapyd$_Index11];
                        do_import(ikey);
                    }
                    IMPORTED[key] = {
                        "is_cached": true,
                        "classes": cached["classes"],
                        "outputs": cached["outputs"],
                        "module_id": key,
                        "submodules": [],
                        "nonlocalvars": cached["nonlocalvars"],
                        "baselib": cached["baselib"],
                        "exports": cached.exports
                    };
                } else {
                    parse(src_code, {
                        "filename": filename,
                        "toplevel": null,
                        "basedir": options.basedir,
                        "libdir": options.libdir,
                        "module_id": key,
                        "IMPORTED": IMPORTED,
                        "IMPORTING": IMPORTING
                    });
                }
                IMPORTED[key].srchash = srchash;
                if (len(package_module_id) > 0) {
                    IMPORTED[package_module_id].submodules.push(key);
                }
                var _$rapyd$_Iter12 = _$rapyd$_Iterable(Object.keys(IMPORTED[key].baselib));
                for (var _$rapyd$_Index12 = 0; _$rapyd$_Index12 < _$rapyd$_Iter12.length; _$rapyd$_Index12++) {
                    bitem = _$rapyd$_Iter12[_$rapyd$_Index12];
                    baselib_items[bitem] = true;
                }
                imported_module_ids.push(key);
            }
            import_ = function(from_import) {
                var ans, tok, tmp, key, last_tok, alias, aimp, _$rapyd$_Unpack, classes, argnames, bracketed, exports, symdef, aname, obj, argvar, cname, imp;
                ans = new AST_Imports({
                    "imports": []
                });
                while (true) {
                    tok = tmp = name = last_tok = expression(false);
                    key = "";
                    while (tmp instanceof AST_Dot) {
                        key = "." + tmp.property + key;
                        tmp = last_tok = tmp.expression;
                    }
                    key = tmp.name + key;
                    alias = null;
                    if (!from_import && is_("keyword", "as")) {
                        next();
                        alias = as_symbol(AST_SymbolAlias);
                    }
                    aimp = new AST_Import({
                        "module": name,
                        "key": key,
                        "alias": alias,
                        "argnames": null,
                        "body": function() {
                            return IMPORTED[key];
                        }
                    });
                    _$rapyd$_Unpack = [tok.start, last_tok.end];
                    aimp.start = _$rapyd$_Unpack[0];
                    aimp.end = _$rapyd$_Unpack[1];
                    ans.imports.push(aimp);
                    if (from_import) {
                        break;
                    }
                    if (is_("punc", ",")) {
                        next();
                    } else {
                        break;
                    }
                }
                var _$rapyd$_Iter13 = _$rapyd$_Iterable(ans["imports"]);
                for (var _$rapyd$_Index13 = 0; _$rapyd$_Index13 < _$rapyd$_Iter13.length; _$rapyd$_Index13++) {
                    imp = _$rapyd$_Iter13[_$rapyd$_Index13];
                    do_import(imp.key);
                    classes = IMPORTED[key].classes;
                    if (from_import) {
                        expect_token("keyword", "import");
                        imp.argnames = argnames = [];
                        bracketed = is_("punc", "(");
                        if (bracketed) {
                            next();
                        }
                        exports = {};
                        var _$rapyd$_Iter14 = _$rapyd$_Iterable(IMPORTED[key].exports);
                        for (var _$rapyd$_Index14 = 0; _$rapyd$_Index14 < _$rapyd$_Iter14.length; _$rapyd$_Index14++) {
                            symdef = _$rapyd$_Iter14[_$rapyd$_Index14];
                            exports[symdef.name] = true;
                        }
                        while (true) {
                            aname = as_symbol(AST_ImportedVar);
                            if (!options.for_linting && !exports.hasOwnProperty(aname.name)) {
                                import_error("The symbol \"" + aname.name + "\" is not exported from the module: " + key);
                            }
                            if (is_("keyword", "as")) {
                                next();
                                aname.alias = as_symbol(AST_SymbolAlias);
                            }
                            argnames.push(aname);
                            if (is_("punc", ",")) {
                                next();
                            } else {
                                if (bracketed) {
                                    if (is_("punc", ")")) {
                                        next();
                                    } else {
                                        continue;
                                    }
                                }
                                break;
                            }
                        }
                        var _$rapyd$_Iter15 = _$rapyd$_Iterable(argnames);
                        for (var _$rapyd$_Index15 = 0; _$rapyd$_Index15 < _$rapyd$_Iter15.length; _$rapyd$_Index15++) {
                            argvar = _$rapyd$_Iter15[_$rapyd$_Index15];
                            obj = classes[argvar.name];
                            if (obj) {
                                key = argvar.alias ? argvar.alias.name : argvar.name;
                                S.classes[S.classes.length-1][key] = {
                                    "static": obj.static,
                                    "bound": obj.bound
                                };
                            }
                        }
                    } else {
                        var _$rapyd$_Iter16 = _$rapyd$_Iterable(Object.keys(classes));
                        for (var _$rapyd$_Index16 = 0; _$rapyd$_Index16 < _$rapyd$_Iter16.length; _$rapyd$_Index16++) {
                            cname = _$rapyd$_Iter16[_$rapyd$_Index16];
                            obj = classes[cname];
                            key = imp.alias ? imp.alias.name : imp.key;
                            S.classes[S.classes.length-1][key + "." + obj.name.name] = {
                                "static": obj.static,
                                "bound": obj.bound
                            };
                        }
                    }
                }
                return ans;
            };
            class_ = function() {
                var name, externaldecorator, class_details, definition, stmt, i, class_var_names, visitor;
                name = as_symbol(AST_SymbolDefun);
                if (!name) {
                    unexpected();
                }
                externaldecorator = S.decorators.indexOf("external");
                if (externaldecorator !== -1) {
                    S.decorators.splice(externaldecorator, 1);
                }
                class_details = {
                    "static": [],
                    "bound": {}
                };
                definition = new AST_Class({
                    "name": name,
                    "module_id": module_id,
                    "parent": function() {
                        var a;
                        if (is_("punc", "(")) {
                            S.in_parenthesized_expr = true;
                            next();
                            a = expr_atom(false);
                            expect(")");
                            S.in_parenthesized_expr = false;
                            return a;
                        } else {
                            return null;
                        }
                    }.call(this),
                    "localvars": [],
                    "static": class_details.static,
                    "external": externaldecorator !== -1,
                    "bound": class_details.bound,
                    "statements": [],
                    "decorators": function() {
                        var d;
                        d = [];
                        S.decorators.forEach(function(decorator) {
                            d.push(new AST_Decorator({
                                "name": decorator
                            }));
                        });
                        S.decorators = [];
                        return d;
                    }.call(this),
                    "body": function(loop, labels) {
                        var a;
                        S.in_class.push(name.name);
                        S.classes[S.classes.length - 1][name.name] = class_details;
                        S.classes.push({});
                        S.in_function += 1;
                        S.in_directives = true;
                        S.in_loop = 0;
                        S.labels = [];
                        a = block_();
                        S.in_function -= 1;
                        S.classes.pop();
                        S.in_class.pop();
                        S.in_loop = loop;
                        S.labels = labels;
                        return a;
                    }.call(this, S.in_loop, S.labels)
                });
                for (i in definition.body) {
                    stmt = definition.body[i];
                    if (stmt instanceof AST_Method && stmt.name.name === "__init__") {
                        definition.init = stmt;
                        break;
                    }
                }
                class_var_names = {};
                function walker() {
                    this._visit = function(node, descend) {
                        if (node instanceof AST_Method) {
                            class_var_names[node.name.name] = true;
                            return;
                        } else if (node instanceof AST_Assign && node.left instanceof AST_SymbolRef) {
                            class_var_names[node.left.name] = true;
                        } else if (node instanceof AST_SymbolRef && Object.prototype.hasOwnProperty.call(class_var_names, node.name)) {
                            node.thedef = new AST_SymbolDefun({
                                "name": name.name + ".prototype." + node.name
                            });
                        }
                        if (descend) {
                            descend.call(node);
                        }
                    };
                }
                visitor = new walker();
                for (i in definition.body) {
                    stmt = definition.body[i];
                    if (!(stmt instanceof AST_Class)) {
                        stmt.walk(visitor);
                        definition.statements.push(stmt);
                    }
                }
                return definition;
            };
            function_ = function(in_class, ctor) {
                var is_accessor, name, staticmethod, staticloc, is_generator, definition, assignments, j, i, nonlocals;
                is_accessor = ctor === AST_Accessor;
                name = is_("name") ? as_symbol(in_class ? AST_SymbolDefun : is_accessor ? AST_SymbolAccessor : AST_SymbolLambda) : is_accessor && (is_("string") || is_("num")) ? as_atom_node() : null;
                if (in_class && !name) {
                    unexpected();
                }
                staticmethod = false;
                if (in_class) {
                    staticloc = S.decorators.indexOf("staticmethod");
                    if (staticloc !== -1) {
                        S.decorators.splice(staticloc, 1);
                        S.classes[S.classes.length - 2][in_class].static.push(name.name);
                        staticmethod = true;
                    } else if (name.name !== "__init__" && options.auto_bind) {
                        baselib_items["bind"] = true;
                        S.classes[S.classes.length - 2][in_class].bound[name.name] = true;
                    }
                }
                expect("(");
                S.in_parenthesized_expr = true;
                if (!ctor) {
                    ctor = in_class ? AST_Method : AST_Function;
                }
                is_generator = [];
                definition = new ctor({
                    "name": name,
                    "argnames": function(a) {
                        var defaults, first, seen_names, val;
                        defaults = {};
                        first = true;
                        seen_names = {};
                        function get_arg() {
                            if (Object.prototype.hasOwnProperty.call(seen_names, S.token.value)) {
                                token_error(prev(), "Can't repeat parameter names");
                            }
                            if (S.token.value === "arguments") {
                                token_error(prev(), "Can't use the name arguments as a parameter name, it is reserved by JavaScript");
                            }
                            seen_names[S.token.value] = true;
                            return as_symbol(AST_SymbolFunarg);
                        }
                        while (!is_("punc", ")")) {
                            if (first) {
                                first = false;
                            } else {
                                expect(",");
                            }
                            if (is_("operator", "**")) {
                                next();
                                if (a.kwargs) {
                                    token_error(prev(), "Can't define multiple **kwargs in function definition");
                                }
                                a.kwargs = get_arg();
                            } else if (is_("operator", "*")) {
                                next();
                                if (a.starargs) {
                                    token_error(prev(), "Can't define multiple *args in function definition");
                                }
                                if (a.kwargs) {
                                    token_error(prev(), "Can't define *args after **kwargs in function definition");
                                }
                                a.starargs = get_arg();
                            } else {
                                if (a.starargs || a.kwargs) {
                                    token_error(prev(), "Can't define a formal parameter after *args or **kwargs");
                                }
                                a.push(get_arg());
                                if (is_("operator", "=")) {
                                    if (a.kwargs) {
                                        token_error(prev(), "Can't define an optional formal parameter after **kwargs");
                                    }
                                    val = prev().value;
                                    next();
                                    defaults[val] = expression(false);
                                    a.has_defaults = true;
                                } else {
                                    if (a.has_defaults) {
                                        token_error(prev(), "Can't define required formal parameters after optional formal parameters");
                                    }
                                }
                            }
                        }
                        next();
                        S.in_parenthesized_expr = false;
                        a.defaults = defaults;
                        a.is_simple_func = !a.starargs && !a.kwargs && !a.has_defaults;
                        if (!a.is_simple_func) {
                            baselib_items["symbolfor()"] = true;
                        }
                        return a;
                    }.call(this, []),
                    "localvars": [],
                    "decorators": function() {
                        var d;
                        d = [];
                        S.decorators.forEach(function(decorator) {
                            d.push(new AST_Decorator({
                                "name": decorator
                            }));
                        });
                        S.decorators = [];
                        return d;
                    }.call(this),
                    "body": function(loop, labels) {
                        var a;
                        S.in_class.push(false);
                        S.classes.push({});
                        S.in_function += 1;
                        S.functions.push({});
                        S.in_directives = true;
                        S.in_loop = 0;
                        S.labels = [];
                        a = block_();
                        S.in_function -= 1;
                        is_generator.push(!!(S.functions.pop().is_generator));
                        S.classes.pop();
                        S.in_class.pop();
                        S.in_loop = loop;
                        S.labels = labels;
                        return a;
                    }.call(this, S.in_loop, S.labels)
                });
                definition.is_generator = is_generator[0];
                if (definition instanceof AST_Method) {
                    definition.static = staticmethod;
                    if (definition.is_generator && definition.name && definition.name.name === "__init__") {
                        croak("The __init__ method of a class cannot be a generator (yield not allowed)");
                    }
                }
                if (definition.is_generator) {
                    baselib_items["yield"] = true;
                }
                assignments = scan_for_local_vars(definition.body);
                for (i = 0; i < assignments.length; i++) {
                    for (j = 0; j < definition.argnames.length + 1; j++) {
                        if (j === definition.argnames.length) {
                            definition.localvars.push(new_symbol(AST_SymbolVar, assignments[i]));
                        } else if (j < definition.argnames.length && assignments[i] === definition.argnames[j].name) {
                            break;
                        }
                    }
                }
                nonlocals = scan_for_nonlocal_defs(definition.body);
                nonlocals.forEach(function(variable) {
                    var i;
                    var _$rapyd$_Iter17 = _$rapyd$_Iterable(dir(definition.localvars).reverse());
                    for (var _$rapyd$_Index17 = 0; _$rapyd$_Index17 < _$rapyd$_Iter17.length; _$rapyd$_Index17++) {
                        i = _$rapyd$_Iter17[_$rapyd$_Index17];
                        if (definition.localvars[i].name === variable) {
                            definition.localvars.splice(i, 1);
                        }
                    }
                });
                return definition;
            };
            function if_() {
                var cond, body, belse;
                cond = expression(true);
                body = statement();
                belse = null;
                if (is_("keyword", "elif") || is_("keyword", "else")) {
                    if (is_("keyword", "else")) {
                        next();
                    } else {
                        S.token.value = "if";
                    }
                    belse = statement();
                }
                return new AST_If({
                    "condition": cond,
                    "body": body,
                    "alternative": belse
                });
            }
            function block_() {
                var a;
                expect(":");
                a = [];
                if (!S.token.nlb) {
                    while (!S.token.nlb) {
                        if (is_("eof")) {
                            unexpected();
                        }
                        a.push(statement());
                    }
                } else {
                    while (!is_("punc", "}")) {
                        if (is_("eof")) {
                            return a;
                        }
                        a.push(statement());
                    }
                    next();
                }
                return a;
            }
            function switch_body_() {
                var a, cur, branch;
                expect("{");
                a = [];
                cur = null;
                branch = null;
                while (!is_("punc", "}")) {
                    if (is_("eof")) {
                        unexpected();
                    }
                    if (is_("keyword", "case")) {
                        if (branch) {
                            branch.end = prev();
                        }
                        cur = [];
                        branch = new AST_Case({
                            "start": tmp = [S.token, next(), tmp],
                            "expression": expression(true),
                            "body": cur
                        });
                        a.push(branch);
                        expect(":");
                    } else if (is_("keyword", "default")) {
                        if (branch) {
                            branch.end = prev();
                        }
                        cur = [];
                        branch = new AST_Default({
                            "start": tmp = [S.token, next(), expect(":"), tmp],
                            "body": cur
                        });
                        a.push(branch);
                    } else {
                        if (!cur) {
                            unexpected();
                        }
                        cur.push(statement());
                    }
                }
                if (branch) {
                    branch.end = prev();
                }
                next();
                return a;
            }
            function try_() {
                var body, bcatch, bfinally, start, exceptions, name;
                body = block_();
                bcatch = [];
                bfinally = null;
                while (is_("keyword", "except")) {
                    start = S.token;
                    next();
                    exceptions = [];
                    if (!is_("punc", ":") && !is_("keyword", "as")) {
                        exceptions.push(as_symbol(AST_SymbolVar));
                        while (is_("punc", ",")) {
                            next();
                            exceptions.push(as_symbol(AST_SymbolVar));
                        }
                    }
                    name = null;
                    if (is_("keyword", "as")) {
                        next();
                        name = as_symbol(AST_SymbolCatch);
                    }
                    bcatch.push(new AST_Except({
                        "start": start,
                        "argname": name,
                        "errors": exceptions,
                        "body": block_(),
                        "end": prev()
                    }));
                }
                if (is_("keyword", "finally")) {
                    start = S.token;
                    next();
                    bfinally = new AST_Finally({
                        "start": start,
                        "body": block_(),
                        "end": prev()
                    });
                }
                if (!bcatch.length && !bfinally) {
                    croak("Missing except/finally blocks");
                }
                return new AST_Try({
                    "body": body,
                    "bcatch": bcatch.length ? new AST_Catch({
                        "body": bcatch
                    }) : null,
                    "bfinally": bfinally
                });
            }
            function vardefs(no_in, in_const, in_nonlocal) {
                var a;
                a = [];
                while (true) {
                    a.push(new AST_VarDef({
                        "start": S.token,
                        "name": as_symbol(in_const ? AST_SymbolConst : in_nonlocal ? AST_SymbolNonlocal : AST_SymbolVar),
                        "value": is_("operator", "=") ? (next(), expression(false, no_in)) : null,
                        "end": prev()
                    }));
                    if (!is_("punc", ",")) {
                        break;
                    }
                    next();
                }
                return a;
            }
            nonlocal_ = function(no_in) {
                return new AST_Var({
                    "start": prev(),
                    "definitions": vardefs(no_in, false, true),
                    "end": prev()
                });
            };
            const_ = function() {
                return new AST_Const({
                    "start": prev(),
                    "definitions": vardefs(false, true),
                    "end": prev()
                });
            };
            new_ = function() {
                var start, newexp, args;
                start = S.token;
                expect_token("operator", "new");
                newexp = expr_atom(false);
                if (is_("punc", "(")) {
                    S.in_parenthesized_expr = true;
                    next();
                    args = expr_list(")");
                    S.in_parenthesized_expr = false;
                } else {
                    args = [];
                }
                return subscripts(new AST_New({
                    "start": start,
                    "expression": newexp,
                    "args": args,
                    "end": prev()
                }), true);
            };
            function token_as_atom_node(tok) {
                var tmp_, tmp__;
                tmp_ = tok.type;
                if (tmp_ === "name") {
                    return token_as_symbol(tok, AST_SymbolRef);
                } else if (tmp_ === "num") {
                    return new AST_Number({
                        "start": tok,
                        "end": tok,
                        "value": tok.value
                    });
                } else if (tmp_ === "string") {
                    return new AST_String({
                        "start": tok,
                        "end": tok,
                        "value": tok.value
                    });
                } else if (tmp_ === "regexp") {
                    return new AST_RegExp({
                        "start": tok,
                        "end": tok,
                        "value": tok.value
                    });
                } else if (tmp_ === "atom") {
                    tmp__ = tok.value;
                    if (tmp__ === "False") {
                        return new AST_False({
                            "start": tok,
                            "end": tok
                        });
                    } else if (tmp__ === "True") {
                        return new AST_True({
                            "start": tok,
                            "end": tok
                        });
                    } else if (tmp__ === "None") {
                        return new AST_Null({
                            "start": tok,
                            "end": tok
                        });
                    }
                }
                token_error(tok, "Expecting an atomic token (number/string/bool/regexp/None)");
            }
            function as_atom_node() {
                var ret;
                ret = token_as_atom_node(S.token);
                next();
                return ret;
            }
            expr_atom = function(allow_calls) {
                var start, tmp_, ex, cls, func;
                if (is_("operator", "new")) {
                    return new_();
                }
                start = S.token;
                if (is_("punc")) {
                    tmp_ = start.value;
                    if (tmp_ === "(") {
                        S.in_parenthesized_expr = true;
                        next();
                        if (is_("punc", ")")) {
                            next();
                            return new AST_Array({
                                "elements": []
                            });
                        }
                        ex = expression(true);
                        ex.start = start;
                        ex.end = S.token;
                        if (ex instanceof AST_SymbolRef) {
                            ex.parens = true;
                        }
                        expect(")");
                        S.in_parenthesized_expr = false;
                        return subscripts(ex, allow_calls);
                    } else if (tmp_ === "[") {
                        return subscripts(array_(), allow_calls);
                    } else if (tmp_ === "{") {
                        return subscripts(object_(), allow_calls);
                    }
                    unexpected();
                }
                if (is_("keyword", "class")) {
                    next();
                    cls = class_();
                    cls.start = start;
                    cls.end = prev();
                    return subscripts(cls, allow_calls);
                }
                if (is_("keyword", "def")) {
                    next();
                    func = function_(false);
                    func.start = start;
                    func.end = prev();
                    return subscripts(func, allow_calls);
                }
                if (is_("keyword", "yield")) {
                    next();
                    return yield_();
                }
                if (ATOMIC_START_TOKEN[S.token.type]) {
                    return subscripts(as_atom_node(), allow_calls);
                }
                unexpected();
            };
            function expr_list(closing, allow_trailing_comma, allow_empty, func_call) {
                var first, a, saw_starargs, tmp, arg;
                first = true;
                a = [];
                saw_starargs = false;
                while (!is_("punc", closing)) {
                    if (saw_starargs) {
                        token_error(prev(), "*args must be the last argument in a function call");
                    }
                    if (first) {
                        first = false;
                    } else {
                        expect(",");
                    }
                    if (allow_trailing_comma && is_("punc", closing)) {
                        break;
                    }
                    if (is_("operator", "*") && func_call) {
                        saw_starargs = true;
                        next();
                    }
                    if (is_("punc", ",") && allow_empty) {
                        a.push(new AST_Hole({
                            "start": S.token,
                            "end": S.token
                        }));
                    } else {
                        a.push(expression(false));
                    }
                }
                if (func_call) {
                    tmp = [];
                    tmp.kwargs = [];
                    var _$rapyd$_Iter18 = _$rapyd$_Iterable(a);
                    for (var _$rapyd$_Index18 = 0; _$rapyd$_Index18 < _$rapyd$_Iter18.length; _$rapyd$_Index18++) {
                        arg = _$rapyd$_Iter18[_$rapyd$_Index18];
                        if (arg instanceof AST_Assign) {
                            tmp.kwargs.push([ arg.left, arg.right ]);
                        } else {
                            tmp.push(arg);
                        }
                    }
                    a = tmp;
                }
                next();
                if (saw_starargs) {
                    a.starargs = true;
                }
                return a;
            }
            function func_call_list() {
                var a, first, kwargs, arg;
                a = [];
                first = true;
                a.kwargs = [];
                a.kwarg_items = kwargs = [];
                a.starargs = false;
                while (!is_("punc", ")")) {
                    if (first) {
                        first = false;
                    } else {
                        expect(",");
                    }
                    if (is_("operator", "*")) {
                        next();
                        arg = expression(false);
                        arg.is_array = true;
                        a.push(arg);
                        a.starargs = true;
                    } else if (is_("operator", "**")) {
                        next();
                        kwargs.push(as_symbol(AST_SymbolVar, false));
                        a.starargs = true;
                    } else {
                        arg = expression(false);
                        if (arg instanceof AST_Assign) {
                            a.kwargs.push([ arg.left, arg.right ]);
                        } else {
                            a.push(arg);
                        }
                    }
                }
                if (a.kwargs.length) {
                    baselib_items["symbolfor()"] = true;
                    baselib_items["desugar_kwargs()"] = true;
                }
                next();
                return a;
            }
            array_ = embed_tokens(function() {
                var expr, ret;
                expect("[");
                expr = [];
                if (!is_("punc", "]")) {
                    expr.push(expression(false));
                    if (is_("keyword", "for")) {
                        return read_comprehension(new AST_ListComprehension({
                            "statement": expr[0]
                        }));
                    }
                    if (is_("operator", "til")) {
                        baselib_items["range"] = true;
                        next();
                        expr.push(expression(false));
                        ret = subscripts(new AST_Call({
                            "start": S.token,
                            "expression": new AST_SymbolRef({
                                "name": "range"
                            }),
                            "args": expr,
                            "end": prev()
                        }), true);
                        expect("]");
                        return ret;
                    } else if (is_("operator", "to")) {
                        baselib_items["range"] = true;
                        next();
                        expr.push(new AST_Binary({
                            "left": expression(false),
                            "operator": "+",
                            "right": new AST_Number({
                                "value": 1e-6
                            })
                        }));
                        ret = subscripts(new AST_Call({
                            "start": S.token,
                            "expression": new AST_SymbolRef({
                                "name": "range"
                            }),
                            "args": expr,
                            "end": prev()
                        }), true);
                        expect("]");
                        return ret;
                    } else if (!is_("punc", "]")) {
                        expect(",");
                    }
                }
                return new AST_Array({
                    "elements": expr.concat(expr_list("]", !options.strict, true))
                });
            });
            object_ = embed_tokens(function() {
                var first, has_non_const_keys, a, start, left;
                expect("{");
                first = true;
                has_non_const_keys = false;
                a = [];
                while (!is_("punc", "}")) {
                    if (!first) {
                        expect(",");
                    }
                    if (!options.strict && is_("punc", "}")) {
                        break;
                    }
                    first = false;
                    start = S.token;
                    left = expression(false);
                    if (is_("keyword", "for")) {
                        return read_comprehension(new AST_SetComprehension({
                            "statement": left
                        }));
                    }
                    if (!(left instanceof AST_Constant)) {
                        has_non_const_keys = true;
                    }
                    expect(":");
                    a.push(new AST_ObjectKeyVal({
                        "start": start,
                        "key": left,
                        "value": expression(false),
                        "end": prev()
                    }));
                    if (a.length === 1 && is_("keyword", "for")) {
                        return dict_comprehension(a);
                    }
                }
                next();
                return new (has_non_const_keys ? AST_ExpressiveObject : AST_Object)({
                    "properties": a
                });
            });
            function read_comprehension(obj, terminator) {
                var forloop;
                S.in_comprehension = true;
                S.in_parenthesized_expr = false;
                expect_token("keyword", "for");
                forloop = for_(true);
                baselib_items["iterable"] = true;
                obj.init = forloop.init;
                obj.name = forloop.name;
                obj.object = forloop.object;
                obj.condition = is_("punc", terminator) ? null : (expect_token("keyword", "if"), 
                expression(true));
                expect(terminator);
                S.in_comprehension = false;
                return obj;
            }
            function dict_comprehension(a) {
                var _$rapyd$_Unpack, left, right;
                if (a.length) {
                    _$rapyd$_Unpack = [a[0].key, a[0].value];
                    left = _$rapyd$_Unpack[0];
                    right = _$rapyd$_Unpack[1];
                } else {
                    left = expression(false);
                    if (!is_("punc", ":")) {
                        return read_comprehension(new AST_SetComprehension({
                            "statement": left
                        }));
                    }
                    expect(":");
                    right = expression(false);
                }
                return read_comprehension(new AST_DictComprehension({
                    "statement": left,
                    "value_statement": right
                }));
            }
            function as_name() {
                var tmp, tmp_;
                tmp = S.token;
                next();
                tmp_ = tmp.type;
                if (tmp_ === "name" || tmp_ === "operator" || tmp_ === "keyword" || tmp_ === "atom") {
                    return tmp.value;
                } else {
                    unexpected();
                }
            }
            function token_as_symbol(tok, ttype) {
                var name;
                name = tok.value;
                return new (name === "this" ? AST_This : ttype)({
                    "name": String(tok.value),
                    "start": tok,
                    "end": tok
                });
            }
            function as_symbol(ttype, noerror) {
                var sym;
                if (!is_("name")) {
                    if (!noerror) {
                        croak("Name expected");
                    }
                    return null;
                }
                sym = token_as_symbol(S.token, ttype);
                next();
                return sym;
            }
            function new_symbol(type, name) {
                var sym;
                sym = new (name === "this" ? AST_This : type)({
                    "name": String(name),
                    "start": null,
                    "end": null
                });
                return sym;
            }
            function is_static_method(cls, method) {
                if (COMMON_STATIC.indexOf(method) !== -1 || cls.static && cls.static.indexOf(method) !== -1) {
                    return true;
                } else {
                    return false;
                }
            }
            subscripts = function(expr, allow_calls) {
                var start, slice_bounds, is_slice, str_, ret, c, funcname, tmp_, args;
                start = expr.start;
                if (is_("punc", ".")) {
                    next();
                    return subscripts(new AST_Dot({
                        "start": start,
                        "expression": expr,
                        "property": as_name(),
                        "end": prev()
                    }), allow_calls);
                }
                if (is_("punc", "[") && !S.token.nlb) {
                    next();
                    slice_bounds = [];
                    is_slice = false;
                    if (is_("punc", ":")) {
                        slice_bounds.push(null);
                    } else {
                        slice_bounds.push(expression(false));
                    }
                    if (is_("punc", ":")) {
                        is_slice = true;
                        next();
                        if (is_("punc", ":")) {
                            slice_bounds.push(null);
                        } else if (!is_("punc", "]")) {
                            slice_bounds.push(expression(false));
                        }
                    }
                    if (is_("punc", ":")) {
                        baselib_items["eslice"] = true;
                        next();
                        if (is_("punc", "]")) {
                            unexpected();
                        } else {
                            slice_bounds.push(expression(false));
                        }
                    }
                    expect("]");
                    if (is_slice) {
                        if (is_("operator") && S.token.value === "=") {
                            next();
                            return subscripts(new AST_Splice({
                                "start": start,
                                "expression": expr,
                                "property": slice_bounds[0] || new AST_Number({
                                    "value": 0
                                }),
                                "property2": slice_bounds[1],
                                "assignment": expression(true),
                                "end": prev()
                            }), allow_calls);
                        } else if (slice_bounds.length === 3) {
                            slice_bounds.unshift(slice_bounds.pop());
                            if (!slice_bounds[slice_bounds.length-1]) {
                                slice_bounds.pop();
                                if (!slice_bounds[slice_bounds.length-1]) {
                                    slice_bounds.pop();
                                }
                            } else if (!slice_bounds[slice_bounds.length-2]) {
                                slice_bounds[slice_bounds.length-2] = new AST_Undefined();
                            }
                            return subscripts(new AST_Call({
                                "start": start,
                                "expression": new AST_SymbolRef({
                                    "name": "eslice"
                                }),
                                "args": [ expr ].concat(slice_bounds),
                                "end": prev()
                            }), allow_calls);
                        } else {
                            slice_bounds = (function() {
                                var _$rapyd$_Iter = _$rapyd$_Iterable(slice_bounds), _$rapyd$_Result = [], i;
                                for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                                    i = _$rapyd$_Iter[_$rapyd$_Index]
                                    _$rapyd$_Result.push(i === null ? new AST_Number({
                                        "value": 0
                                    }) : i);
                                }
                                return _$rapyd$_Result;
                            })();
                            return subscripts(new AST_Call({
                                "start": start,
                                "expression": new AST_Dot({
                                    "start": start,
                                    "expression": expr,
                                    "property": "slice",
                                    "end": prev()
                                }),
                                "args": slice_bounds,
                                "end": prev()
                            }), allow_calls);
                        }
                    } else {
                        return subscripts(new AST_Sub({
                            "start": start,
                            "expression": expr,
                            "property": slice_bounds[0] || new AST_Number({
                                "value": 0
                            }),
                            "end": prev()
                        }), allow_calls);
                    }
                }
                if (allow_calls && is_("punc", "(") && !S.token.nlb) {
                    S.in_parenthesized_expr = true;
                    next();
                    if (expr instanceof AST_SymbolRef && expr.name === "JS") {
                        str_ = expression(false);
                        if (!(str_ instanceof AST_String)) {
                            token_error(prev(), "Compile-time function JS() can't process variables or expressions");
                        }
                        ret = new AST_Verbatim({
                            "start": start,
                            "value": str_.value,
                            "end": prev()
                        });
                        expect(")");
                        S.in_parenthesized_expr = false;
                        return subscripts(ret, true);
                    } else if (!expr.parens && get_class_in_scope(expr)) {
                        ret = subscripts(new AST_New({
                            "start": start,
                            "expression": expr,
                            "args": func_call_list(),
                            "end": prev()
                        }), true);
                        S.in_parenthesized_expr = false;
                        return ret;
                    } else {
                        if (expr instanceof AST_Dot) {
                            c = get_class_in_scope(expr.expression);
                        }
                        if (c) {
                            funcname = expr;
                            if (funcname.property === "__init__") {
                                funcname.property = "constructor";
                            }
                            ret = subscripts(new AST_ClassCall({
                                "start": start,
                                "class": expr.expression,
                                "method": funcname.property,
                                "static": is_static_method(c, funcname.property),
                                "args": func_call_list(),
                                "end": prev()
                            }), true);
                            S.in_parenthesized_expr = false;
                            return ret;
                        } else if (expr instanceof AST_SymbolRef) {
                            tmp_ = expr.name;
                            if (tmp_ === "bind" || tmp_ === "rebind_all" || tmp_ === "dir" || tmp_ === "enumerate" || tmp_ === "mixin" || tmp_ === "print" || tmp_ === "range" || tmp_ === "reversed" || tmp_ === "sum" || tmp_ === "getattr" || tmp_ === "setattr" || tmp_ === "hasattr" || tmp_ === "iter" || tmp_ === "list") {
                                baselib_items[tmp_] = true;
                            } else if (tmp_ === "type") {
                                ret = new AST_UnaryPrefix({
                                    "start": start,
                                    "operator": "typeof",
                                    "expression": func_call_list()[0],
                                    "end": prev()
                                });
                                S.in_parenthesized_expr = false;
                                return ret;
                            } else if (tmp_ === "isinstance") {
                                args = func_call_list();
                                if (args.length !== 2) {
                                    croak("isinstance() must be called with exactly two arguments");
                                }
                                ret = new AST_Binary({
                                    "start": start,
                                    "left": args[0],
                                    "operator": "instanceof",
                                    "right": args[1],
                                    "end": prev()
                                });
                                S.in_parenthesized_expr = false;
                                return ret;
                            } else if (tmp_ === "symbolfor" || tmp_ === "len" || tmp_ === "abs" || tmp_ === "max" || tmp_ === "min") {
                                baselib_items[tmp_ + "()"] = true;
                            }
                        }
                        ret = subscripts(new AST_Call({
                            "start": start,
                            "expression": expr,
                            "args": func_call_list(),
                            "end": prev()
                        }), true);
                        S.in_parenthesized_expr = false;
                        return ret;
                    }
                }
                return expr;
            };
            maybe_unary = function(allow_calls) {
                var start, ex, val;
                start = S.token;
                if (is_("operator") && UNARY_PREFIX(start.value)) {
                    next();
                    if (start.value === "@") {
                        if (is_("name") && (peek().value === "@" || peek().value === "def" || peek().value === "class")) {
                            S.decorators.push(S.token.value);
                            next();
                            return new AST_EmptyStatement({
                                "stype": "@",
                                "start": prev(),
                                "end": prev()
                            });
                        } else {
                            unexpected();
                        }
                    }
                    ex = make_unary(AST_UnaryPrefix, start.value, maybe_unary(allow_calls));
                    ex.start = start;
                    ex.end = prev();
                    return ex;
                }
                val = expr_atom(allow_calls);
                while (is_("operator") && UNARY_POSTFIX(S.token.value) && !S.token.nlb) {
                    val = make_unary(AST_UnaryPostfix, S.token.value, val);
                    val.start = start;
                    val.end = S.token;
                    next();
                }
                return val;
            };
            function make_unary(ctor, op, expr) {
                return new ctor({
                    "operator": op,
                    "expression": expr
                });
            }
            expr_op = function(left, min_prec, no_in) {
                var op, not_in, prec, right, ret;
                op = is_("operator") ? S.token.value : null;
                not_in = false;
                if (op === "!" && peek().type === "operator" && peek().value === "in") {
                    next();
                    op = "in";
                    not_in = true;
                }
                if (op === "in") {
                    if (no_in) {
                        op = null;
                    } else {
                        baselib_items[op] = true;
                    }
                }
                prec = op !== null ? PRECEDENCE[op] : null;
                if (prec !== null && prec > min_prec) {
                    next();
                    right = expr_op(maybe_unary(true), prec, no_in);
                    ret = new AST_Binary({
                        "start": left.start,
                        "left": left,
                        "operator": op,
                        "right": right,
                        "end": right.end
                    });
                    if (not_in) {
                        ret = new AST_UnaryPrefix({
                            "start": left.start,
                            "operator": "!",
                            "expression": ret,
                            "end": right.end
                        });
                    }
                    return expr_op(ret, min_prec, no_in);
                }
                return left;
            };
            function expr_ops(no_in) {
                return expr_op(maybe_unary(true), 0, no_in);
            }
            maybe_conditional = function(no_in) {
                var start, expr, pystyle, ne, conditional, yes;
                start = S.token;
                expr = expr_ops(no_in);
                if (is_("operator", "?") || is_("keyword", "if") && (S.in_parenthesized_expr || S.statement_starting_token !== S.token && !S.in_comprehension && !S.token.nlb)) {
                    pystyle = is_("keyword", "if");
                    next();
                    ne = expression(false);
                    if (pystyle) {
                        expect_token("keyword", "else");
                        conditional = new AST_Conditional({
                            "start": start,
                            "condition": ne,
                            "consequent": expr,
                            "alternative": expression(false, no_in),
                            "end": peek()
                        });
                    } else {
                        yes = ne;
                        expect(":");
                        conditional = new AST_Conditional({
                            "start": start,
                            "condition": expr,
                            "consequent": yes,
                            "alternative": expression(false, no_in),
                            "end": peek()
                        });
                    }
                    return conditional;
                }
                return expr;
            };
            function is_assignable(expr) {
                var tmp_;
                if (!options.strict) {
                    return true;
                }
                tmp_ = expr[0] + "";
                if (tmp_ === "dot" || tmp_ === "sub" || tmp_ === "new" || tmp_ === "call") {
                    return true;
                } else if (tmp_ === "name") {
                    return expr[1] !== "this";
                }
            }
            maybe_assign = function(no_in) {
                var start, left, val;
                start = S.token;
                left = maybe_conditional(no_in);
                val = S.token.value;
                if (is_("operator") && ASSIGNMENT(val)) {
                    if (is_assignable(left)) {
                        next();
                        return new AST_Assign({
                            "start": start,
                            "left": left,
                            "operator": val,
                            "right": maybe_assign(no_in),
                            "end": prev()
                        });
                    }
                    croak("Invalid assignment");
                }
                return left;
            };
            expression = function(commas, no_in) {
                var start, expr, left;
                start = S.token;
                expr = maybe_assign(no_in);
                function build_seq(a) {
                    if (a.length === 1) {
                        return a[0];
                    }
                    return new AST_Seq({
                        "start": start,
                        "car": a.shift(),
                        "cdr": build_seq(a),
                        "end": peek()
                    });
                }
                if (commas) {
                    left = [ expr ];
                    while (is_("punc", ",") && !peek().nlb) {
                        next();
                        if (expr instanceof AST_Assign) {
                            left[left.length - 1] = left.slice(-1)[0].left;
                            return new AST_Assign({
                                "start": start,
                                "left": left.length === 1 ? left[0] : new AST_Array({
                                    "elements": left
                                }),
                                "operator": expr.operator,
                                "right": new AST_Seq({
                                    "car": expr.right,
                                    "cdr": expression(true, no_in)
                                }),
                                "end": peek()
                            });
                        }
                        expr = maybe_assign(no_in);
                        left.push(expr);
                    }
                    if (left.length > 1 && left.slice(-1)[0] instanceof AST_Assign) {
                        left[left.length - 1] = left.slice(-1)[0].left;
                        return new AST_Assign({
                            "start": start,
                            "left": new AST_Array({
                                "elements": left
                            }),
                            "operator": expr.operator,
                            "right": expr.right,
                            "end": peek()
                        });
                    }
                    return build_seq.call(this, left);
                }
                return expr;
            };
            function in_loop(cont) {
                var ret;
                S.in_loop += 1;
                ret = cont();
                S.in_loop -= 1;
                return ret;
            }
            return function() {
                var start, body, first_token, element, shebang, end, toplevel, assignments, callables;
                start = S.token;
                body = [];
                first_token = true;
                while (!is_("eof")) {
                    element = statement();
                    if (first_token && element instanceof AST_Directive && element.value.indexOf("#!") === 0) {
                        shebang = element.value;
                    } else {
                        body.push(element);
                    }
                    first_token = false;
                }
                end = prev();
                toplevel = options.toplevel;
                if (toplevel) {
                    toplevel.body = toplevel.body.concat(body);
                    toplevel.end = end;
                } else {
                    toplevel = new AST_Toplevel({
                        "start": start,
                        "body": body,
                        "strict": function() {
                            var stmt;
                            var _$rapyd$_Iter19 = _$rapyd$_Iterable(body);
                            for (var _$rapyd$_Index19 = 0; _$rapyd$_Index19 < _$rapyd$_Iter19.length; _$rapyd$_Index19++) {
                                stmt = _$rapyd$_Iter19[_$rapyd$_Index19];
                                if (stmt instanceof AST_Directive && stmt.value === "use strict") {
                                    return true;
                                }
                            }
                            return false;
                        }.call(this),
                        "shebang": shebang,
                        "end": end
                    });
                }
                function uniq(element, index, arr) {
                    return arr.lastIndexOf(element) === index;
                }
                toplevel.nonlocalvars = scan_for_nonlocal_defs(toplevel.body);
                assignments = scan_for_local_vars(toplevel.body);
                callables = scan_for_top_level_callables(toplevel.body).filter(uniq);
                toplevel.localvars = [];
                assignments.forEach(function(item) {
                    if (toplevel.nonlocalvars.indexOf(item) < 0) {
                        toplevel.localvars.push(new_symbol(AST_SymbolVar, item));
                    }
                });
                toplevel.exports = toplevel.localvars.concat(callables).filter(uniq);
                toplevel.filename = options.filename;
                toplevel.submodules = [];
                toplevel.imported_module_ids = imported_module_ids;
                toplevel.classes = scan_for_classes(toplevel.body);
                toplevel.import_order = Object.keys(IMPORTED).length;
                toplevel.module_id = module_id;
                IMPORTED[module_id] = toplevel;
                toplevel.imports = IMPORTED;
                toplevel.baselib = baselib_items;
                IMPORTING[module_id] = false;
                return toplevel;
            }.call(this);
        }
        _$rapyd$_modules["parse"]["COMPILER_VERSION"] = COMPILER_VERSION;

        _$rapyd$_modules["parse"]["NATIVE_CLASSES"] = NATIVE_CLASSES;

        _$rapyd$_modules["parse"]["COMMON_STATIC"] = COMMON_STATIC;

        _$rapyd$_modules["parse"]["UNARY_PREFIX"] = UNARY_PREFIX;

        _$rapyd$_modules["parse"]["ASSIGNMENT"] = ASSIGNMENT;

        _$rapyd$_modules["parse"]["PRECEDENCE"] = PRECEDENCE;

        _$rapyd$_modules["parse"]["STATEMENTS_WITH_LABELS"] = STATEMENTS_WITH_LABELS;

        _$rapyd$_modules["parse"]["ATOMIC_START_TOKEN"] = ATOMIC_START_TOKEN;

        _$rapyd$_modules["parse"]["parse"] = parse;
    })();

    (function(){
        var __name__ = "output";
        "use strict";
        var make_predicate = _$rapyd$_modules["utils"].make_predicate;
        var defaults = _$rapyd$_modules["utils"].defaults;
        var repeat_string = _$rapyd$_modules["utils"].repeat_string;
        var noop = _$rapyd$_modules["utils"].noop;
        
        var is_identifier_char = _$rapyd$_modules["tokenizer"].is_identifier_char;
        
        var COMPILER_VERSION = _$rapyd$_modules["parse"].COMPILER_VERSION;
        var PRECEDENCE = _$rapyd$_modules["parse"].PRECEDENCE;
        
        var AST_Array = _$rapyd$_modules["ast"].AST_Array;
        var AST_Assign = _$rapyd$_modules["ast"].AST_Assign;
        var AST_BaseCall = _$rapyd$_modules["ast"].AST_BaseCall;
        var AST_Binary = _$rapyd$_modules["ast"].AST_Binary;
        var AST_BlockStatement = _$rapyd$_modules["ast"].AST_BlockStatement;
        var AST_Break = _$rapyd$_modules["ast"].AST_Break;
        var AST_Case = _$rapyd$_modules["ast"].AST_Case;
        var AST_Catch = _$rapyd$_modules["ast"].AST_Catch;
        var AST_Class = _$rapyd$_modules["ast"].AST_Class;
        var AST_ClassCall = _$rapyd$_modules["ast"].AST_ClassCall;
        var AST_Conditional = _$rapyd$_modules["ast"].AST_Conditional;
        var AST_Const = _$rapyd$_modules["ast"].AST_Const;
        var AST_Constant = _$rapyd$_modules["ast"].AST_Constant;
        var AST_Continue = _$rapyd$_modules["ast"].AST_Continue;
        var AST_Debugger = _$rapyd$_modules["ast"].AST_Debugger;
        var AST_Default = _$rapyd$_modules["ast"].AST_Default;
        var AST_Definitions = _$rapyd$_modules["ast"].AST_Definitions;
        var AST_Directive = _$rapyd$_modules["ast"].AST_Directive;
        var AST_Do = _$rapyd$_modules["ast"].AST_Do;
        var AST_Dot = _$rapyd$_modules["ast"].AST_Dot;
        var AST_EmptyStatement = _$rapyd$_modules["ast"].AST_EmptyStatement;
        var AST_Except = _$rapyd$_modules["ast"].AST_Except;
        var AST_Exit = _$rapyd$_modules["ast"].AST_Exit;
        var AST_ExpressiveObject = _$rapyd$_modules["ast"].AST_ExpressiveObject;
        var AST_Finally = _$rapyd$_modules["ast"].AST_Finally;
        var AST_ForIn = _$rapyd$_modules["ast"].AST_ForIn;
        var AST_ForJS = _$rapyd$_modules["ast"].AST_ForJS;
        var AST_Function = _$rapyd$_modules["ast"].AST_Function;
        var AST_Hole = _$rapyd$_modules["ast"].AST_Hole;
        var AST_If = _$rapyd$_modules["ast"].AST_If;
        var AST_Imports = _$rapyd$_modules["ast"].AST_Imports;
        var AST_Infinity = _$rapyd$_modules["ast"].AST_Infinity;
        var AST_Jump = _$rapyd$_modules["ast"].AST_Jump;
        var AST_Lambda = _$rapyd$_modules["ast"].AST_Lambda;
        var AST_ListComprehension = _$rapyd$_modules["ast"].AST_ListComprehension;
        var AST_LoopControl = _$rapyd$_modules["ast"].AST_LoopControl;
        var AST_Method = _$rapyd$_modules["ast"].AST_Method;
        var AST_NaN = _$rapyd$_modules["ast"].AST_NaN;
        var AST_New = _$rapyd$_modules["ast"].AST_New;
        var AST_Node = _$rapyd$_modules["ast"].AST_Node;
        var AST_Number = _$rapyd$_modules["ast"].AST_Number;
        var AST_Object = _$rapyd$_modules["ast"].AST_Object;
        var AST_ObjectKeyVal = _$rapyd$_modules["ast"].AST_ObjectKeyVal;
        var AST_ObjectProperty = _$rapyd$_modules["ast"].AST_ObjectProperty;
        var AST_PropAccess = _$rapyd$_modules["ast"].AST_PropAccess;
        var AST_RegExp = _$rapyd$_modules["ast"].AST_RegExp;
        var AST_Return = _$rapyd$_modules["ast"].AST_Return;
        var AST_Scope = _$rapyd$_modules["ast"].AST_Scope;
        var AST_Seq = _$rapyd$_modules["ast"].AST_Seq;
        var AST_SimpleStatement = _$rapyd$_modules["ast"].AST_SimpleStatement;
        var AST_Splice = _$rapyd$_modules["ast"].AST_Splice;
        var AST_Statement = _$rapyd$_modules["ast"].AST_Statement;
        var AST_StatementWithBody = _$rapyd$_modules["ast"].AST_StatementWithBody;
        var AST_String = _$rapyd$_modules["ast"].AST_String;
        var AST_Sub = _$rapyd$_modules["ast"].AST_Sub;
        var AST_Switch = _$rapyd$_modules["ast"].AST_Switch;
        var AST_SwitchBranch = _$rapyd$_modules["ast"].AST_SwitchBranch;
        var AST_Symbol = _$rapyd$_modules["ast"].AST_Symbol;
        var AST_SymbolRef = _$rapyd$_modules["ast"].AST_SymbolRef;
        var AST_This = _$rapyd$_modules["ast"].AST_This;
        var AST_Throw = _$rapyd$_modules["ast"].AST_Throw;
        var AST_Toplevel = _$rapyd$_modules["ast"].AST_Toplevel;
        var AST_Try = _$rapyd$_modules["ast"].AST_Try;
        var AST_Unary = _$rapyd$_modules["ast"].AST_Unary;
        var AST_UnaryPostfix = _$rapyd$_modules["ast"].AST_UnaryPostfix;
        var AST_UnaryPrefix = _$rapyd$_modules["ast"].AST_UnaryPrefix;
        var AST_Undefined = _$rapyd$_modules["ast"].AST_Undefined;
        var AST_Var = _$rapyd$_modules["ast"].AST_Var;
        var AST_VarDef = _$rapyd$_modules["ast"].AST_VarDef;
        var AST_Verbatim = _$rapyd$_modules["ast"].AST_Verbatim;
        var AST_While = _$rapyd$_modules["ast"].AST_While;
        var AST_With = _$rapyd$_modules["ast"].AST_With;
        var AST_Yield = _$rapyd$_modules["ast"].AST_Yield;
        var TreeWalker = _$rapyd$_modules["ast"].TreeWalker;
        
        function OutputStream(options) {
            var indentation, current_col, current_line, current_pos, OUTPUT, IMPORTED, might_need_space, might_need_semicolon, last, requireSemicolonChars, space, indent, with_indent, newline, semicolon, add_mapping, stack;
            options = defaults(options, {
                "indent_start": 0,
                "indent_level": 4,
                "quote_keys": false,
                "space_colon": true,
                "ascii_only": false,
                "inline_script": false,
                "width": 80,
                "max_line_len": 32e3,
                "ie_proof": true,
                "beautify": false,
                "source_map": null,
                "bracketize": false,
                "semicolons": true,
                "comments": false,
                "preserve_line": false,
                "omit_baselib": false,
                "baselib": null,
                "private_scope": true,
                "auto_bind": false,
                "js_version": 5,
                "write_name": true
            }, true);
            indentation = 0;
            current_col = 0;
            current_line = 1;
            current_pos = 0;
            OUTPUT = "";
            IMPORTED = {};
            function to_ascii(str_, identifier) {
                return str_.replace(/[\u0080-\uffff]/g, function(ch) {
                    var code;
                    code = ch.charCodeAt(0).toString(16);
                    if (code.length <= 2 && !identifier) {
                        while (code.length < 2) {
                            code = "0" + code;
                        }
                        return "\\x" + code;
                    } else {
                        while (code.length < 4) {
                            code = "0" + code;
                        }
                        return "\\u" + code;
                    }
                });
            }
            function make_string(str_) {
                var dq, sq;
                dq = 0;
                sq = 0;
                str_ = str_.replace(/[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g, function(s) {
                    var tmp_, dq, sq;
                    tmp_ = s;
                    if (tmp_ === "\\") {
                        return "\\\\";
                    } else if (tmp_ === "\b") {
                        return "\\b";
                    } else if (tmp_ === "\f") {
                        return "\\f";
                    } else if (tmp_ === "\n") {
                        return "\\n";
                    } else if (tmp_ === "\t") {
                        return "\\t";
                    } else if (tmp_ === "\r") {
                        return "\\r";
                    } else if (tmp_ === "\u2028") {
                        return "\\u2028";
                    } else if (tmp_ === "\u2029") {
                        return "\\u2029";
                    } else if (tmp_ === "\"") {
                        dq += 1;
                        return "\"";
                    } else if (tmp_ === "'") {
                        sq += 1;
                        return "'";
                    } else if (tmp_ === "\0") {
                        return "\\0";
                    }
                    return s;
                });
                if (options.ascii_only) {
                    str_ = to_ascii(str_);
                }
                if (dq > sq) {
                    return "'" + str_.replace(/\x27/g, "\\'") + "'";
                } else {
                    return "\"" + str_.replace(/\x22/g, "\\\"") + "\"";
                }
            }
            function encode_string(str_) {
                var ret;
                ret = make_string(str_);
                if (options.inline_script) {
                    ret = ret.replace(/<\x2fscript([>\/\t\n\f\r ])/gi, "<\\/script$1");
                }
                return ret;
            }
            function make_name(name) {
                name = name.toString();
                if (options.ascii_only) {
                    name = to_ascii(name, true);
                }
                return name;
            }
            function make_indent(back) {
                return repeat_string(" ", options.indent_start + indentation - back * options.indent_level);
            }
            might_need_space = false;
            might_need_semicolon = false;
            last = null;
            function last_char() {
                return last.charAt(last.length - 1);
            }
            function maybe_newline() {
                if (options.max_line_len && current_col > options.max_line_len) {
                    print_("\n");
                }
            }
            requireSemicolonChars = make_predicate("( [ + * / - , .");
            function print_(str_) {
                var ch, target_line, prev, a, n;
                str_ = String(str_);
                ch = str_.charAt(0);
                if (might_need_semicolon) {
                    if ((!ch || ";}".indexOf(ch) < 0) && !/[;]$/.test(last)) {
                        if (options.semicolons || requireSemicolonChars(ch)) {
                            OUTPUT += ";";
                            current_col += 1;
                            current_pos += 1;
                        } else {
                            OUTPUT += "\n";
                            current_pos += 1;
                            current_line += 1;
                            current_col = 0;
                        }
                        if (!options.beautify) {
                            might_need_space = false;
                        }
                    }
                    might_need_semicolon = false;
                    maybe_newline();
                }
                if (!options.beautify && options.preserve_line && stack[stack.length - 1]) {
                    target_line = stack[stack.length - 1].start.line;
                    while (current_line < target_line) {
                        OUTPUT += "\n";
                        current_pos += 1;
                        current_line += 1;
                        current_col = 0;
                        might_need_space = false;
                    }
                }
                if (might_need_space) {
                    prev = last_char();
                    if (is_identifier_char(prev) && (is_identifier_char(ch) || ch === "\\") || /^[\+\-\/]$/.test(ch) && ch === prev) {
                        OUTPUT += " ";
                        current_col += 1;
                        current_pos += 1;
                    }
                    might_need_space = false;
                }
                a = str_.split(/\r?\n/);
                n = a.length - 1;
                current_line += n;
                if (n === 0) {
                    current_col += a[n].length;
                } else {
                    current_col = a[n].length;
                }
                current_pos += str_.length;
                last = str_;
                OUTPUT += str_;
            }
            space = options.beautify ? function() {
                print_(" ");
            } : function() {
                might_need_space = true;
            };
            indent = options.beautify ? function(half) {
                if (options.beautify) {
                    print_(make_indent(half ? .5 : 0));
                }
            } : noop;
            with_indent = options.beautify ? function(col, cont) {
                var save_indentation, ret;
                if (col === true) {
                    col = next_indent();
                }
                save_indentation = indentation;
                indentation = col;
                ret = cont();
                indentation = save_indentation;
                return ret;
            } : function(col, cont) {
                return cont();
            };
            newline = options.beautify ? function() {
                print_("\n");
            } : noop;
            semicolon = options.beautify ? function() {
                print_(";");
            } : function() {
                might_need_semicolon = true;
            };
            function force_semicolon() {
                might_need_semicolon = false;
                print_(";");
            }
            function next_indent() {
                return indentation + options.indent_level;
            }
            function spaced() {
                for (var i=0; i < arguments.length; i++) {
                    if (i > 0) {
                        space();
                    }
                    if (typeof arguments[i].print === "function") {
                        arguments[i].print(this);
                    } else {
                        print_(arguments[i]);
                    }
                }
            }
            function end_statement() {
                semicolon();
                newline();
            }
            function with_block(cont) {
                var ret;
                ret = null;
                print_("{");
                newline();
                with_indent(next_indent(), function() {
                    ret = cont();
                });
                indent();
                print_("}");
                return ret;
            }
            function with_parens(cont) {
                var ret;
                print_("(");
                ret = cont();
                print_(")");
                return ret;
            }
            function with_square(cont) {
                var ret;
                print_("[");
                ret = cont();
                print_("]");
                return ret;
            }
            function comma() {
                print_(",");
                space();
            }
            function colon() {
                print_(":");
                if (options.space_colon) {
                    space();
                }
            }
            add_mapping = options.source_map ? function(token, name) {
                try {
                    if (token) {
                        options.source_map.add(token.file || "?", current_line, current_col, token.line, token.col, !name && token.type === "name" ? token.value : name);
                    }
                } catch (_$rapyd$_Exception) {
                    AST_Node.warn("Couldn't figure out mapping for {file}:{line},{col} → {cline},{ccol} [{name}]", {
                        "file": token.file,
                        "line": token.line,
                        "col": token.col,
                        "cline": current_line,
                        "ccol": current_col,
                        "name": name || ""
                    });
                }
            } : noop;
            function dump_baselib(key) {
                var is_func, ckey;
                indent();
                is_func = key.substr(key.length - 2) === "()";
                if (is_func) {
                    ckey = key.substr(0, key.length - 2);
                    print_("var " + ckey + " = (");
                }
                print_(options.baselib[key]);
                if (is_func) {
                    print_(")()");
                    semicolon();
                }
                newline();
            }
            function dump_yield() {
                var code, ci;
                if (options.js_version >= 6) {
                    return;
                }
                indent();
                spaced("var", "_$rapyd$_regenerator", "=", "{}");
                end_statement();
                code = regenerate(false, options.beautify);
                if (options.beautify) {
                    code = code.replace(/\/\/.*$/gm, "\n").replace(/^\s*$/gm, "");
                    ci = make_indent(0);
                    code = (function() {
                        var _$rapyd$_Iter = _$rapyd$_Iterable(code.split("\n")), _$rapyd$_Result = [], x;
                        for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                            x = _$rapyd$_Iter[_$rapyd$_Index]
                            _$rapyd$_Result.push(ci + x);
                        }
                        return _$rapyd$_Result;
                    })().join("\n");
                }
                print_(code + "(_$rapyd$_regenerator)");
                end_statement();
            }
            function prologue(module_) {
                var lib;
                if (!options.omit_baselib) {
                    indent();
                    spaced.apply(null, "var iterator_symbol = (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") ? Symbol.iterator : \"iterator-Symbol-5d0927e5554349048cf0e3762a228256\"".split(" "));
                    end_statement();
                    var _$rapyd$_Iter20 = _$rapyd$_Iterable(module_.baselib);
                    for (var _$rapyd$_Index20 = 0; _$rapyd$_Index20 < _$rapyd$_Iter20.length; _$rapyd$_Index20++) {
                        lib = _$rapyd$_Iter20[_$rapyd$_Index20];
                        if (options.js_version === 6 && lib === "iterable") {
                            continue;
                        }
                        if (lib === "yield") {
                            dump_yield();
                        } else {
                            dump_baselib(lib);
                        }
                    }
                }
            }
            function get() {
                return OUTPUT;
            }
            function assign_var(name) {
                if (typeof name === "string") {
                    print_(name);
                } else {
                    name.print(this);
                }
                space();
                print_("=");
                space();
            }
            stack = [];
            return {
                "index_counter": 0,
                "options": options,
                "get": get,
                "toString": get,
                "indent": indent,
                "indentation": function() {
                    return indentation;
                },
                "make_indent": make_indent,
                "current_width": function() {
                    return current_col - indentation;
                },
                "should_break": function() {
                    return options.width && this.current_width() >= options.width;
                },
                "newline": newline,
                "print": print_,
                "space": space,
                "comma": comma,
                "colon": colon,
                "last": function() {
                    return last;
                },
                "semicolon": semicolon,
                "force_semicolon": force_semicolon,
                "to_ascii": to_ascii,
                "print_name": function(name) {
                    print_(make_name(name));
                },
                "print_string": function(str_) {
                    print_(encode_string(str_));
                },
                "next_indent": next_indent,
                "with_indent": with_indent,
                "with_block": with_block,
                "with_parens": with_parens,
                "spaced": spaced,
                "end_statement": end_statement,
                "with_square": with_square,
                "add_mapping": add_mapping,
                "assign": assign_var,
                "prologue": prologue,
                "import": function(module_) {
                    if (!IMPORTED.hasOwnProperty(module_.key)) {
                        IMPORTED[module_.key] = module_;
                    }
                },
                "is_main": function() {
                    return OUTPUT.length === 0;
                },
                "option": function(opt) {
                    return options[opt];
                },
                "line": function() {
                    return current_line;
                },
                "col": function() {
                    return current_col;
                },
                "pos": function() {
                    return current_pos;
                },
                "push_node": function(node) {
                    stack.push(node);
                },
                "pop_node": function() {
                    return stack.pop();
                },
                "stack": function() {
                    return stack;
                },
                "parent": function(n) {
                    return stack[stack.length - 2 - (n || 0)];
                }
            };
        }
        function codegen() {
            var SPECIAL_METHODS;
            SPECIAL_METHODS = {
                "bind": "_$rapyd$_bind",
                "rebind_all": "_$rapyd$_rebind_all",
                "bool": "!!",
                "float": "parseFloat",
                "int": "parseInt",
                "mixin": "_$rapyd$_mixin",
                "print": "_$rapyd$_print",
                "eslice": "_$rapyd$_eslice"
            };
            function DEFPRINT(nodetype, generator) {
                nodetype.DEFMETHOD("_codegen", generator);
            }
            AST_Node.DEFMETHOD("print", function(stream, force_parens) {
                var self, generator;
                self = this;
                generator = self._codegen;
                stream.push_node(self);
                if (force_parens || self.needs_parens(stream)) {
                    stream.with_parens(function() {
                        self.add_comments(stream);
                        self.add_source_map(stream);
                        generator(self, stream);
                    });
                } else {
                    self.add_comments(stream);
                    self.add_source_map(stream);
                    generator(self, stream);
                }
                stream.pop_node();
            });
            AST_Node.DEFMETHOD("print_to_string", function(options) {
                var s;
                s = OutputStream(options);
                this.print(s);
                return s.get();
            });
            AST_Node.DEFMETHOD("add_comments", function(output) {
                var c, self, start, comments;
                c = output.option("comments");
                self = this;
                if (c) {
                    start = self.start;
                    if (start && !start._comments_dumped) {
                        start._comments_dumped = true;
                        comments = start.comments_before;
                        if (self instanceof AST_Exit && self.value && self.value.start.comments_before.length > 0) {
                            comments = (comments || []).concat(self.value.start.comments_before);
                            self.value.start.comments_before = [];
                        }
                        if (c.test) {
                            comments = comments.filter(function(comment) {
                                return c.test(comment.value);
                            });
                        } else if (typeof c === "function") {
                            comments = comments.filter(function(comment) {
                                return c(self, comment);
                            });
                        }
                        comments.forEach(function(c) {
                            if (c.type === "comment1") {
                                output.print("//" + c.value + "\n");
                                output.indent();
                            } else if (c.type === "comment2") {
                                output.print("/*" + c.value + "*/");
                                if (start.nlb) {
                                    output.print("\n");
                                    output.indent();
                                } else {
                                    output.space();
                                }
                            }
                        });
                    }
                }
            });
            function PARENS(nodetype, func) {
                nodetype.DEFMETHOD("needs_parens", func);
            }
            PARENS(AST_Node, function() {
                return false;
            });
            PARENS(AST_Function, function(output) {
                return first_in_statement(output);
            });
            PARENS(AST_Object, function(output) {
                return first_in_statement(output);
            });
            PARENS(AST_Unary, function(output) {
                var p;
                p = output.parent();
                return p instanceof AST_PropAccess && p.expression === this;
            });
            PARENS(AST_Seq, function(output) {
                var p;
                p = output.parent();
                return p instanceof AST_Unary || p instanceof AST_VarDef || p instanceof AST_Dot || p instanceof AST_ObjectProperty || p instanceof AST_Conditional;
            });
            PARENS(AST_Binary, function(output) {
                var p, po, pp, so, sp;
                p = output.parent();
                if (p instanceof AST_BaseCall && p.expression === this) {
                    return true;
                }
                if (p instanceof AST_Unary) {
                    return true;
                }
                if (p instanceof AST_PropAccess && p.expression === this) {
                    return true;
                }
                if (p instanceof AST_Binary) {
                    po = p.operator;
                    pp = PRECEDENCE[po];
                    so = this.operator;
                    sp = PRECEDENCE[so];
                    if (pp > sp || pp === sp && this === p.right && !(so === po && (so === "*" || so === "&&" || so === "||"))) {
                        return true;
                    }
                }
            });
            PARENS(AST_PropAccess, function(output) {
                var p;
                p = output.parent();
                if (p instanceof AST_New && p.expression === this) {
                    try {
                        this.walk(new TreeWalker(function(node) {
                            if (node instanceof AST_BaseCall) {
                                throw p;
                            }
                        }));
                    } catch (_$rapyd$_Exception) {
                        var ex = _$rapyd$_Exception;
                        if (ex !== p) {
                            throw ex;
                        }
                        return true;
                    }
                }
            });
            PARENS(AST_BaseCall, function(output) {
                var p;
                p = output.parent();
                return p instanceof AST_New && p.expression === this;
            });
            PARENS(AST_New, function(output) {
                var p;
                p = output.parent();
                if (no_constructor_parens(this, output) && (p instanceof AST_PropAccess || p instanceof AST_BaseCall && p.expression === this)) {
                    return true;
                }
            });
            PARENS(AST_Number, function(output) {
                var p;
                p = output.parent();
                if (this.getValue() < 0 && p instanceof AST_PropAccess && p.expression === this) {
                    return true;
                }
            });
            PARENS(AST_NaN, function(output) {
                var p;
                p = output.parent();
                if (p instanceof AST_PropAccess && p.expression === this) {
                    return true;
                }
            });
            function assign_and_conditional_paren_rules(output) {
                var p;
                p = output.parent();
                if (p instanceof AST_Unary) {
                    return true;
                }
                if (p instanceof AST_Binary && !(p instanceof AST_Assign)) {
                    return true;
                }
                if (p instanceof AST_BaseCall && p.expression === this) {
                    return true;
                }
                if (p instanceof AST_Conditional && p.condition === this) {
                    return true;
                }
                if (p instanceof AST_PropAccess && p.expression === this) {
                    return true;
                }
            }
            PARENS(AST_Assign, assign_and_conditional_paren_rules);
            PARENS(AST_Conditional, assign_and_conditional_paren_rules);
            DEFPRINT(AST_Directive, function(self, output) {
                output.print_string(self.value);
                output.semicolon();
            });
            DEFPRINT(AST_Debugger, function(self, output) {
                output.print("debugger");
                output.semicolon();
            });
            function display_body(body, is_toplevel, output) {
                var last;
                last = body.length - 1;
                body.forEach(function(stmt, i) {
                    if (!(stmt instanceof AST_EmptyStatement) && !(stmt instanceof AST_Definitions)) {
                        output.indent();
                        stmt.print(output);
                        if (!(i === last && is_toplevel)) {
                            output.newline();
                        }
                    }
                });
            }
            function bind_methods(methods, output) {
                var arg;
                for (arg in methods) {
                    output.indent();
                    output.print("this.");
                    output.assign(arg);
                    output.print("_$rapyd$_bind");
                    output.with_parens(function() {
                        output.print("this.");
                        output.print(arg);
                        output.comma();
                        output.print("this");
                    });
                    output.semicolon();
                    output.newline();
                }
            }
            function write_imports(module, output) {
                var imports, import_id, nonlocalvars, name, module_;
                imports = [];
                var _$rapyd$_Iter21 = _$rapyd$_Iterable(Object.keys(module.imports));
                for (var _$rapyd$_Index21 = 0; _$rapyd$_Index21 < _$rapyd$_Iter21.length; _$rapyd$_Index21++) {
                    import_id = _$rapyd$_Iter21[_$rapyd$_Index21];
                    imports.push(module.imports[import_id]);
                }
                imports.sort(function(a, b) {
                    var _$rapyd$_Unpack;
                    _$rapyd$_Unpack = [a.import_order, b.import_order];
                    a = _$rapyd$_Unpack[0];
                    b = _$rapyd$_Unpack[1];
                    return a < b ? -1 : a > b ? 1 : 0;
                });
                if (imports.length > 1) {
                    output.indent();
                    output.print("var _$rapyd$_modules = {};");
                    output.newline();
                }
                nonlocalvars = {};
                var _$rapyd$_Iter22 = _$rapyd$_Iterable(imports);
                for (var _$rapyd$_Index22 = 0; _$rapyd$_Index22 < _$rapyd$_Iter22.length; _$rapyd$_Index22++) {
                    module_ = _$rapyd$_Iter22[_$rapyd$_Index22];
                    var _$rapyd$_Iter23 = _$rapyd$_Iterable(module_.nonlocalvars);
                    for (var _$rapyd$_Index23 = 0; _$rapyd$_Index23 < _$rapyd$_Iter23.length; _$rapyd$_Index23++) {
                        name = _$rapyd$_Iter23[_$rapyd$_Index23];
                        nonlocalvars[name] = true;
                    }
                }
                nonlocalvars = Object.getOwnPropertyNames(nonlocalvars).join(", ");
                if (nonlocalvars.length) {
                    output.indent();
                    output.print("var " + nonlocalvars);
                    output.semicolon();
                    output.newline();
                }
                var _$rapyd$_Iter24 = _$rapyd$_Iterable(imports);
                for (var _$rapyd$_Index24 = 0; _$rapyd$_Index24 < _$rapyd$_Iter24.length; _$rapyd$_Index24++) {
                    module_ = _$rapyd$_Iter24[_$rapyd$_Index24];
                    if (module_.module_id !== "__main__") {
                        output.indent();
                        output.print("_$rapyd$_modules[\"");
                        output.print(module_.module_id);
                        output.print("\"] = {}");
                        output.semicolon();
                        output.newline();
                    }
                }
                var _$rapyd$_Iter25 = _$rapyd$_Iterable(imports);
                for (var _$rapyd$_Index25 = 0; _$rapyd$_Index25 < _$rapyd$_Iter25.length; _$rapyd$_Index25++) {
                    module_ = _$rapyd$_Iter25[_$rapyd$_Index25];
                    if (module_.module_id !== "__main__") {
                        print_module(module_, output);
                    }
                }
            }
            function write_main_name(output) {
                if (output.option("write_name")) {
                    output.newline();
                    output.indent();
                    output.print("var __name__ = \"__main__\"");
                    output.semicolon();
                    output.newline();
                    output.newline();
                }
            }
            function display_complex_body(node, is_toplevel, output) {
                var offset, a, kw, i, _$rapyd$_Unpack, c, arg, dname, nargs;
                offset = 0;
                if (node instanceof AST_Method && !node.static) {
                    output.indent();
                    output.print("var");
                    output.space();
                    output.assign(node.argnames[0]);
                    output.print("this");
                    output.semicolon();
                    output.newline();
                    offset += 1;
                }
                if (node instanceof AST_Scope) {
                    if (node.argnames) {
                        if (node.argnames.is_simple_func !== true) {
                            a = node.argnames;
                            kw = "arguments[arguments.length-1]";
                            var _$rapyd$_Iter26 = _$rapyd$_Iterable(enumerate(a));
                            for (var _$rapyd$_Index26 = 0; _$rapyd$_Index26 < _$rapyd$_Iter26.length; _$rapyd$_Index26++) {
                                _$rapyd$_Unpack = _$rapyd$_Iter26[_$rapyd$_Index26];
                                c = _$rapyd$_Unpack[0];
                                arg = _$rapyd$_Unpack[1];
                                i = c - offset;
                                if (i >= 0) {
                                    output.indent();
                                    output.print("var");
                                    output.space();
                                    output.assign(arg);
                                    if (Object.prototype.hasOwnProperty.call(a.defaults, arg.name)) {
                                        output.spaced("(arguments[" + i + "]", "===", "undefined", "||", "(", i, "===", "arguments.length-1", "&&", "typeof", kw, "===", "\"object\"", "&&", kw, "[symbolfor(\"_$rapyd$_kwargs_obj\")]", "===", "true))", "?", "");
                                        output.with_parens(function() {
                                            a.defaults[arg.name].print(output);
                                        });
                                        output.space();
                                        output.print(":");
                                        output.space();
                                    } else {
                                        output.spaced("(", i, "===", "arguments.length-1", "&&", "typeof", kw, "===", "\"object\"", "&&", kw, "[symbolfor(\"_$rapyd$_kwargs_obj\")]", "===", "true)", "?", "undefined", ":", "");
                                    }
                                    output.print("arguments[" + i + "]");
                                    output.end_statement();
                                }
                            }
                            if (a.kwargs || a.has_defaults) {
                                kw = a.kwargs ? a.kwargs.name : "_$rapyd$_kwargs_obj";
                                output.indent();
                                output.spaced("var", kw, "=", "arguments[arguments.length-1]");
                                output.end_statement();
                                output.indent();
                                output.spaced("if", "(typeof", kw, "!==", "\"object\"", "||", kw, "[symbolfor(\"_$rapyd$_kwargs_obj\")]", "!==", "true)", kw, "=", "{}");
                                output.end_statement();
                                if (a.has_defaults) {
                                    var _$rapyd$_Iter27 = _$rapyd$_Iterable(Object.keys(a.defaults));
                                    for (var _$rapyd$_Index27 = 0; _$rapyd$_Index27 < _$rapyd$_Iter27.length; _$rapyd$_Index27++) {
                                        dname = _$rapyd$_Iter27[_$rapyd$_Index27];
                                        output.indent();
                                        output.spaced("if", "(Object.prototype.hasOwnProperty.call(" + kw + ",", "\"" + dname + "\"))");
                                        output.with_block(function() {
                                            output.indent();
                                            output.spaced(dname, "=", kw + "." + dname);
                                            output.end_statement();
                                            if (a.kwargs) {
                                                output.indent();
                                                output.spaced("delete", kw + "." + dname);
                                                output.end_statement();
                                            }
                                        });
                                        output.newline();
                                    }
                                }
                            }
                            if (a.starargs) {
                                nargs = a.length - offset;
                                output.indent();
                                output.spaced("var", a.starargs.name, "=", "Array.prototype.slice.call(arguments,", nargs, ")");
                                output.end_statement();
                                output.indent();
                                output.spaced("if", "(typeof", kw, "===", "\"object\"", "&&", kw, "[symbolfor(\"_$rapyd$_kwargs_obj\")]", "===", "true)", a.starargs.name, ".pop()");
                                output.end_statement();
                            }
                        }
                    }
                    if (output.option("auto_bind") && node.name && node.name.name === "__init__") {
                        output.indent();
                        output.print("_$rapyd$_rebind_all");
                        output.with_parens(function() {
                            output.print("this");
                            output.comma();
                            output.print("true");
                        });
                        output.semicolon();
                        output.newline();
                        bind_methods(node.bound, output);
                    }
                    declare_vars(node.localvars, output);
                } else if (node instanceof AST_Except) {
                    if (node.argname) {
                        output.indent();
                        output.print("var");
                        output.space();
                        output.assign(node.argname);
                        output.print("_$rapyd$_Exception");
                        output.semicolon();
                        output.newline();
                    }
                }
                display_body(node.body, is_toplevel, output);
            }
            function declare_vars(vars, output) {
                if (vars.length) {
                    output.indent();
                    output.print("var");
                    output.space();
                    vars.forEach(function(arg, i) {
                        if (i) {
                            output.comma();
                        }
                        arg.print(output);
                    });
                    output.semicolon();
                    output.newline();
                }
            }
            function declare_exports(module_id, exports, submodules, output) {
                var seen, symbol;
                seen = {};
                var _$rapyd$_Iter28 = _$rapyd$_Iterable(exports);
                for (var _$rapyd$_Index28 = 0; _$rapyd$_Index28 < _$rapyd$_Iter28.length; _$rapyd$_Index28++) {
                    symbol = _$rapyd$_Iter28[_$rapyd$_Index28];
                    if (!seen.hasOwnProperty(module_id)) {
                        output.newline();
                        output.indent();
                        output.print("_$rapyd$_modules[\"" + module_id + "\"][\"" + symbol.name + "\"] = " + symbol.name);
                        seen[symbol.name] = true;
                        output.semicolon();
                        output.newline();
                    }
                }
            }
            function declare_submodules(module_id, submodules, output) {
                var seen, key, sub_module_id;
                seen = {};
                var _$rapyd$_Iter29 = _$rapyd$_Iterable(submodules);
                for (var _$rapyd$_Index29 = 0; _$rapyd$_Index29 < _$rapyd$_Iter29.length; _$rapyd$_Index29++) {
                    sub_module_id = _$rapyd$_Iter29[_$rapyd$_Index29];
                    if (!seen.hasOwnProperty(sub_module_id)) {
                        seen[sub_module_id] = true;
                        key = sub_module_id.split(".")[sub_module_id.split(".").length-1];
                        output.indent();
                        output.spaced("_$rapyd$_modules[\"" + module_id + "\"][\"" + key + "\"]", "=", "_$rapyd$_modules[\"" + sub_module_id + "\"]");
                        output.end_statement();
                    }
                }
            }
            function unpack_tuple(elems, output, in_statement) {
                elems.forEach(function(elem, i) {
                    output.indent();
                    output.assign(elem);
                    output.print("_$rapyd$_Unpack");
                    output.with_square(function() {
                        output.print(i);
                    });
                    if (!in_statement || i < elems.length - 1) {
                        output.semicolon();
                        output.newline();
                    }
                });
            }
            AST_StatementWithBody.DEFMETHOD("_do_print_body", function(output) {
                force_statement(this.body, output);
            });
            DEFPRINT(AST_Statement, function(self, output) {
                self.body.print(output);
                output.semicolon();
            });
            DEFPRINT(AST_Toplevel, function(self, output) {
                var is_main;
                is_main = output.is_main();
                if (is_main && self.shebang) {
                    output.print(self.shebang);
                    output.newline();
                }
                if (output.option("private_scope") && is_main) {
                    output.with_parens(function() {
                        output.print("function()");
                        output.with_block(function() {
                            output.indent();
                            output.print("\"use strict\"");
                            output.semicolon();
                            output.newline();
                            output.indent();
                            output.print("var _$rapyd$_Temp");
                            output.semicolon();
                            output.newline();
                            output.prologue(self);
                            write_imports(self, output);
                            output.newline();
                            output.indent();
                            output.with_parens(function() {
                                output.print("function()");
                                output.with_block(function() {
                                    write_main_name(output);
                                    output.newline();
                                    display_complex_body(self, true, output);
                                    output.newline();
                                });
                            });
                            output.print("();");
                            output.newline();
                        });
                    });
                    output.print("();");
                    output.print("");
                } else {
                    if (is_main) {
                        output.prologue(self);
                        write_imports(self, output);
                        write_main_name(output);
                    }
                    if (self.strict) {
                        declare_vars(self.localvars, output);
                    }
                    display_body(self.body, true, output);
                }
            });
            function print_module(self, output) {
                function output_module(output) {
                    declare_vars(self.localvars, output);
                    display_body(self.body, true, output);
                    declare_exports(self.module_id, self.exports, self.submodules, output);
                }
                output.newline();
                output.indent();
                output.with_parens(function() {
                    output.print("function()");
                    output.with_block(function() {
                        var okey, cached, cobj, cname, symdef, co, raw, js_version, auto_bind, beautify;
                        if (output.option("write_name")) {
                            output.indent();
                            output.print("var ");
                            output.assign("__name__");
                            output.print("\"" + self.module_id + "\"");
                            output.semicolon();
                            output.newline();
                        }
                        function output_key(beautify, auto_bind, js_version) {
                            return "beautify:" + beautify + " auto_bind:" + auto_bind + " js_version:" + js_version;
                        }
                        okey = output_key(output.option("beautify"), output.option("auto_bind"), output.option("js_version"));
                        if (self.is_cached && _$rapyd$_in(okey, self.outputs)) {
                            output.print(self.outputs[okey]);
                            declare_submodules(self.module_id, self.submodules, output);
                        } else {
                            output_module(output);
                            declare_submodules(self.module_id, self.submodules, output);
                            if (self.srchash && self.filename) {
                                cached = {
                                    "version": COMPILER_VERSION,
                                    "signature": self.srchash,
                                    "classes": {},
                                    "baselib": self.baselib,
                                    "nonlocalvars": self.nonlocalvars,
                                    "imported_module_ids": self.imported_module_ids,
                                    "exports": [],
                                    "outputs": {}
                                };
                                var _$rapyd$_Iter30 = _$rapyd$_Iterable(Object.keys(self.classes));
                                for (var _$rapyd$_Index30 = 0; _$rapyd$_Index30 < _$rapyd$_Iter30.length; _$rapyd$_Index30++) {
                                    cname = _$rapyd$_Iter30[_$rapyd$_Index30];
                                    cobj = self.classes[cname];
                                    cached.classes[cname] = {
                                        "name": {
                                            "name": cobj.name.name
                                        },
                                        "static": cobj.static,
                                        "bound": cobj.bound
                                    };
                                }
                                var _$rapyd$_Iter31 = _$rapyd$_Iterable(self.exports);
                                for (var _$rapyd$_Index31 = 0; _$rapyd$_Index31 < _$rapyd$_Iter31.length; _$rapyd$_Index31++) {
                                    symdef = _$rapyd$_Iter31[_$rapyd$_Index31];
                                    cached.exports.push({
                                        "name": symdef.name
                                    });
                                }
                                var _$rapyd$_Iter32 = _$rapyd$_Iterable([ true, false ]);
                                for (var _$rapyd$_Index32 = 0; _$rapyd$_Index32 < _$rapyd$_Iter32.length; _$rapyd$_Index32++) {
                                    beautify = _$rapyd$_Iter32[_$rapyd$_Index32];
                                    var _$rapyd$_Iter33 = _$rapyd$_Iterable([ true, false ]);
                                    for (var _$rapyd$_Index33 = 0; _$rapyd$_Index33 < _$rapyd$_Iter33.length; _$rapyd$_Index33++) {
                                        auto_bind = _$rapyd$_Iter33[_$rapyd$_Index33];
                                        var _$rapyd$_Iter34 = _$rapyd$_Iterable([ 5, 6 ]);
                                        for (var _$rapyd$_Index34 = 0; _$rapyd$_Index34 < _$rapyd$_Iter34.length; _$rapyd$_Index34++) {
                                            js_version = _$rapyd$_Iter34[_$rapyd$_Index34];
                                            co = OutputStream({
                                                "beautify": beautify,
                                                "auto_bind": auto_bind,
                                                "js_version": js_version,
                                                "private_scope": false,
                                                "write_name": false
                                            });
                                            co.with_indent(output.indentation(), function() {
                                                output_module(co);
                                            });
                                            raw = co.toString();
                                            cached.outputs[output_key(beautify, auto_bind, js_version)] = raw;
                                        }
                                    }
                                }
                                try {
                                    writefile(self.filename + "-cached", JSON.stringify(cached, null, "\t"));
                                } catch (_$rapyd$_Exception) {
                                    if (_$rapyd$_Exception instanceof Error) {
                                        var e = _$rapyd$_Exception;
                                        console.error("Failed to write output cache file:", self.filename + "-cached", "with error:", e);
                                    } else {
                                        throw _$rapyd$_Exception;
                                    }
                                }
                            }
                        }
                    });
                });
                output.print("()");
                output.semicolon();
                output.newline();
            }
            DEFPRINT(AST_Imports, function(container, output) {
                var akey, argname, bound_name, self;
                function add_aname(aname, key, from_import) {
                    output.print("var ");
                    output.assign(aname);
                    output.print("_$rapyd$_modules[\"");
                    output.print(key);
                    output.print("\"]");
                    if (from_import) {
                        output.print(".");
                        output.print(from_import);
                    }
                    output.semicolon();
                    output.newline();
                    output.indent();
                }
                var _$rapyd$_Iter35 = _$rapyd$_Iterable(container.imports);
                for (var _$rapyd$_Index35 = 0; _$rapyd$_Index35 < _$rapyd$_Iter35.length; _$rapyd$_Index35++) {
                    self = _$rapyd$_Iter35[_$rapyd$_Index35];
                    output.import(self.module);
                    if (self.argnames) {
                        var _$rapyd$_Iter36 = _$rapyd$_Iterable(self.argnames);
                        for (var _$rapyd$_Index36 = 0; _$rapyd$_Index36 < _$rapyd$_Iter36.length; _$rapyd$_Index36++) {
                            argname = _$rapyd$_Iter36[_$rapyd$_Index36];
                            akey = argname.alias ? argname.alias.name : argname.name;
                            add_aname(akey, self.key, argname.name);
                        }
                    } else {
                        if (self.alias) {
                            add_aname(self.alias.name, self.key, false);
                        } else {
                            bound_name = self.key.split(".", 1)[0];
                            add_aname(bound_name, bound_name, false);
                        }
                    }
                }
            });
            DEFPRINT(AST_SimpleStatement, function(self, output) {
                if (!(self.body instanceof AST_EmptyStatement)) {
                    self.body.print(output);
                    output.semicolon();
                }
            });
            function print_bracketed(node, output, complex) {
                if (node.body.length > 0) {
                    output.with_block(function() {
                        if (complex) {
                            display_complex_body(node, false, output);
                        } else {
                            display_body(node.body, false, output);
                        }
                    });
                } else {
                    output.print("{}");
                }
            }
            DEFPRINT(AST_BlockStatement, function(self, output) {
                print_bracketed(self, output);
            });
            DEFPRINT(AST_EmptyStatement, function(self, output) {
            });
            DEFPRINT(AST_Do, function(self, output) {
                output.print("do");
                output.space();
                self._do_print_body(output);
                output.space();
                output.print("while");
                output.space();
                output.with_parens(function() {
                    self.condition.print(output);
                });
                output.semicolon();
            });
            DEFPRINT(AST_While, function(self, output) {
                output.print("while");
                output.space();
                output.with_parens(function() {
                    self.condition.print(output);
                });
                output.space();
                self._do_print_body(output);
            });
            function is_simple_for_in(self) {
                if (self.object instanceof AST_BaseCall && self.object.expression instanceof AST_SymbolRef && self.object.expression.name === "dir" && self.object.args.length === 1) {
                    return true;
                }
                return false;
            }
            function is_simple_for(self) {
                if (self.object instanceof AST_BaseCall && self.object.expression instanceof AST_SymbolRef && self.object.expression.name === "range" && !(self.init instanceof AST_Array) && (self.object.args.length < 3 || self.object.args.slice(-1)[0] instanceof AST_Number || self.object.args.slice(-1)[0] instanceof AST_Unary && self.object.args.slice(-1)[0].operator === "-" && self.object.args.slice(-1)[0].expression instanceof AST_Number)) {
                    return true;
                }
                return false;
            }
            AST_ForIn.DEFMETHOD("_do_print_body", function(output) {
                var self;
                self = this;
                output.with_block(function() {
                    var itervar, flat;
                    if (!(is_simple_for(self) || is_simple_for_in(self))) {
                        output.indent();
                        if (output.option("js_version") === 5) {
                            itervar = "_$rapyd$_Iter" + output.index_counter + "[_$rapyd$_Index" + output.index_counter + "]";
                        } else {
                            itervar = "_$rapyd$_Index" + output.index_counter;
                        }
                        if (self.init instanceof AST_Array) {
                            flat = self.init.flatten();
                            output.assign("_$rapyd$_Unpack");
                            if (flat.length > self.init.elements.length) {
                                output.print("_$rapyd$_flatten(" + itervar + ")");
                            } else {
                                output.print(itervar);
                            }
                            output.end_statement();
                            unpack_tuple(flat, output);
                        } else {
                            output.assign(self.init);
                            output.print(itervar);
                            output.end_statement();
                        }
                        output.index_counter += 1;
                    }
                    self.body.body.forEach(function(stmt, i) {
                        output.indent();
                        stmt.print(output);
                        output.newline();
                    });
                });
            });
            function init_es6_itervar(output, itervar) {
                output.indent();
                output.spaced(itervar, "=", "((typeof", itervar + "[Symbol.iterator]", "===", "\"function\")", "?", "(" + itervar, "instanceof", "Map", "?", itervar + ".keys()", ":", itervar + ")", ":", "Object.keys(" + itervar + "))");
                output.end_statement();
            }
            DEFPRINT(AST_ForIn, function(self, output) {
                var increment, args, tmp_, start, end, itervar;
                if (is_simple_for(self)) {
                    increment = null;
                    args = self.object.args;
                    tmp_ = args.length;
                    if (tmp_ === 1) {
                        start = 0;
                        end = args[0];
                    } else if (tmp_ === 2) {
                        start = args[0];
                        end = args[1];
                    } else if (tmp_ === 3) {
                        start = args[0];
                        end = args[1];
                        increment = args[2];
                    }
                    output.print("for");
                    output.space();
                    output.with_parens(function() {
                        output.assign(self.init);
                        start.print ? start.print(output) : output.print(start);
                        output.semicolon();
                        output.space();
                        self.init.print(output);
                        output.space();
                        increment instanceof AST_Unary ? output.print(">") : output.print("<");
                        output.space();
                        end.print(output);
                        output.semicolon();
                        output.space();
                        self.init.print(output);
                        if (increment && (!(increment instanceof AST_Unary) || increment.expression.value !== "1")) {
                            if (increment instanceof AST_Unary) {
                                output.print("-=");
                                increment.expression.print(output);
                            } else {
                                output.print("+=");
                                increment.print(output);
                            }
                        } else {
                            if (increment instanceof AST_Unary) {
                                output.print("--");
                            } else {
                                output.print("++");
                            }
                        }
                    });
                } else if (is_simple_for_in(self)) {
                    output.print("for");
                    output.space();
                    output.with_parens(function() {
                        self.init.print(output);
                        output.space();
                        output.print("in");
                        output.space();
                        self.object.args[0].print(output);
                    });
                } else {
                    if (output.options.js_version === 5) {
                        output.assign("var _$rapyd$_Iter" + output.index_counter);
                        output.print("_$rapyd$_Iterable");
                        output.with_parens(function() {
                            self.object.print(output);
                        });
                        output.semicolon();
                        output.newline();
                        output.indent();
                        output.print("for");
                        output.space();
                        output.with_parens(function() {
                            output.print("var");
                            output.space();
                            output.assign("_$rapyd$_Index" + output.index_counter);
                            output.print("0");
                            output.semicolon();
                            output.space();
                            output.print("_$rapyd$_Index" + output.index_counter);
                            output.space();
                            output.print("<");
                            output.space();
                            output.print("_$rapyd$_Iter" + output.index_counter + ".length");
                            output.semicolon();
                            output.space();
                            output.print("_$rapyd$_Index" + output.index_counter + "++");
                        });
                    } else {
                        itervar = "_$rapyd$_Iter" + output.index_counter;
                        output.assign("var " + itervar);
                        self.object.print(output);
                        output.end_statement();
                        init_es6_itervar(output, itervar);
                        output.indent();
                        output.spaced("for", "(var", "_$rapyd$_Index" + output.index_counter, "of", itervar + ")");
                    }
                }
                output.space();
                self._do_print_body(output);
            });
            AST_ForJS.DEFMETHOD("_do_print_body", function(output) {
                var self;
                self = this;
                output.with_block(function() {
                    self.body.body.forEach(function(stmt, i) {
                        output.indent();
                        stmt.print(output);
                        output.newline();
                    });
                });
            });
            DEFPRINT(AST_ForJS, function(self, output) {
                output.print("for");
                output.space();
                output.with_parens(function() {
                    self.condition.print(output);
                });
                output.space();
                self._do_print_body(output);
            });
            DEFPRINT(AST_ListComprehension, function(self, output) {
                var result_obj, push_func, add_to_result;
                result_obj = {
                    "ListComprehension": "[]",
                    "DictComprehension": "{}",
                    "SetComprehension": "new Set()"
                }[self.TYPE];
                push_func = "_$rapyd$_Result." + (self.TYPE === "ListComprehension" ? "push" : "add");
                if (self.TYPE === "DictComprehension") {
                    add_to_result = function() {
                        output.indent();
                        output.print("_$rapyd$_Result");
                        output.with_square(function() {
                            self.statement.print(output);
                        });
                        [output.space(), output.print("="), output.space()];
                        output.with_parens(function() {
                            if (self.value_statement.TYPE === "Seq") {
                                output.with_square(function() {
                                    self.value_statement.print(output);
                                });
                            } else {
                                self.value_statement.print(output);
                            }
                        });
                        output.end_statement();
                    };
                } else {
                    add_to_result = function() {
                        output.indent();
                        output.print(push_func);
                        output.with_parens(function() {
                            if (self.statement.TYPE === "Seq") {
                                output.with_square(function() {
                                    self.statement.print(output);
                                });
                            } else {
                                self.statement.print(output);
                            }
                        });
                        output.end_statement();
                    };
                }
                output.with_parens(function() {
                    output.print("function");
                    output.print("()");
                    output.space();
                    output.with_block(function() {
                        output.indent();
                        output.assign("var _$rapyd$_Iter");
                        if (output.option("js_version") === 5) {
                            output.print("_$rapyd$_Iterable");
                            output.with_parens(function() {
                                self.object.print(output);
                            });
                        } else {
                            self.object.print(output);
                        }
                        output.comma();
                        output.assign("_$rapyd$_Result");
                        output.print(result_obj);
                        if (self.init instanceof AST_Array) {
                            self.init.elements.forEach(function(i) {
                                output.comma();
                                i.print(output);
                            });
                        } else {
                            output.comma();
                            self.init.print(output);
                        }
                        output.end_statement();
                        if (output.option("js_version") !== 5) {
                            init_es6_itervar(output, "_$rapyd$_Iter");
                        }
                        output.indent();
                        output.print("for");
                        output.space();
                        output.with_parens(function() {
                            if (output.option("js_version") === 5) {
                                output.print("var");
                                output.space();
                                output.assign("_$rapyd$_Index");
                                output.print("0");
                                output.semicolon();
                                output.space();
                                output.print("_$rapyd$_Index");
                                output.space();
                                output.print("<");
                                output.space();
                                output.print("_$rapyd$_Iter.length");
                                output.semicolon();
                                output.space();
                                output.print("_$rapyd$_Index++");
                            } else {
                                output.spaced("var", "_$rapyd$_Index", "of", "_$rapyd$_Iter");
                            }
                        });
                        output.space();
                        output.with_block(function() {
                            var itervar, flat;
                            output.indent();
                            itervar = output.option("js_version") === 5 ? "_$rapyd$_Iter[_$rapyd$_Index]" : "_$rapyd$_Index";
                            if (self.init instanceof AST_Array) {
                                flat = self.init.flatten();
                                output.assign("_$rapyd$_Unpack");
                                if (flat.length > self.init.elements.length) {
                                    output.print("_$rapyd$_flatten(" + itervar + ")");
                                } else {
                                    output.print(itervar);
                                }
                                output.newline();
                                unpack_tuple(flat, output);
                            } else {
                                output.assign(self.init);
                                output.print(itervar);
                                output.newline();
                            }
                            if (self.condition) {
                                output.indent();
                                output.print("if");
                                output.space();
                                output.with_parens(function() {
                                    self.condition.print(output);
                                });
                                output.space();
                                output.with_block(function() {
                                    add_to_result();
                                });
                                output.newline();
                            } else {
                                add_to_result();
                            }
                        });
                        output.newline();
                        output.indent();
                        output.print("return _$rapyd$_Result");
                        output.semicolon();
                        output.newline();
                    });
                });
                output.print("()");
            });
            DEFPRINT(AST_With, function(self, output) {
                output.print("with");
                output.space();
                output.with_parens(function() {
                    self.expression.print(output);
                });
                output.space();
                self._do_print_body(output);
            });
            function decorate(decorators, output, func) {
                var wrap;
                wrap = function(d) {
                    if (d.length) {
                        output.print(d[0].name);
                        output.with_parens(function() {
                            wrap(d.slice(1));
                        });
                    } else {
                        func();
                    }
                };
                wrap(decorators);
            }
            function function_args(argnames, output, strip_first) {
                output.with_parens(function() {
                    if (argnames && argnames.length && (argnames.is_simple_func === true || argnames.is_simple_func === undefined)) {
                        (strip_first ? argnames.slice(1) : argnames).forEach(function(arg, i) {
                            if (i) {
                                output.comma();
                            }
                            arg.print(output);
                        });
                    }
                });
                output.space();
            }
            function function_definition(self, output, nokeyword, strip_first) {
                if (!nokeyword) {
                    output.print("function");
                }
                if (self.name) {
                    output.space();
                    self.name.print(output);
                }
                if (self.is_generator) {
                    [output.print("()"), output.space()];
                    output.with_block(function() {
                        var temp, transpiled, ci;
                        if (output.options.js_version >= 6) {
                            output.print("function* js_generator");
                            function_args(self.argnames, output, strip_first);
                            print_bracketed(self, output, true);
                        } else {
                            temp = OutputStream({
                                "beautify": true
                            });
                            temp.print("function* js_generator");
                            function_args(self.argnames, temp, strip_first);
                            print_bracketed(self, temp, true);
                            transpiled = regenerate(temp.get(), output.options.beautify).replace(/regeneratorRuntime.(wrap|mark)/g, "_$rapyd$_regenerator.regeneratorRuntime.$1");
                            if (output.options.beautify) {
                                ci = output.make_indent(0);
                                transpiled = (function() {
                                    var _$rapyd$_Iter = _$rapyd$_Iterable(transpiled.split("\n")), _$rapyd$_Result = [], x;
                                    for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                                        x = _$rapyd$_Iter[_$rapyd$_Index]
                                        _$rapyd$_Result.push(ci + x);
                                    }
                                    return _$rapyd$_Result;
                                })().join("\n");
                            }
                            output.print(transpiled);
                        }
                        output.newline();
                        output.indent();
                        output.spaced("var", "result", "=", "js_generator.apply(this,", "arguments)");
                        output.end_statement();
                        output.indent();
                        output.spaced("result.send", "=", "result.next");
                        output.end_statement();
                        output.indent();
                        output.spaced("return", "result");
                        output.end_statement();
                    });
                } else {
                    function_args(self.argnames, output, strip_first);
                    print_bracketed(self, output, true);
                }
            }
            AST_Lambda.DEFMETHOD("_do_print", function(output, nokeyword) {
                var self;
                self = this;
                if (self.decorators && self.decorators.length) {
                    output.print("var");
                    output.space();
                    output.assign(self.name.name);
                    decorate(self.decorators, output, function() {
                        function_definition(self, output, nokeyword, false);
                    });
                    output.semicolon();
                } else {
                    function_definition(self, output, nokeyword, false);
                }
            });
            DEFPRINT(AST_Lambda, function(self, output) {
                self._do_print(output);
            });
            AST_Class.DEFMETHOD("_do_print", function(output) {
                var self, class_def, define_method;
                self = this;
                if (self.external) {
                    return;
                }
                class_def = function(method, is_var) {
                    output.indent();
                    self.name.print(output);
                    if (!is_var && method && self.static.indexOf(method) !== -1) {
                        output.assign("." + method);
                    } else {
                        if (is_var) {
                            output.assign(".prototype[" + method + "]");
                        } else {
                            output.assign(".prototype" + (method ? "." + method : ""));
                        }
                    }
                };
                define_method = function(stmt) {
                    var name, strip_first;
                    name = stmt.name.name;
                    class_def(name);
                    strip_first = self.static.indexOf(name) === -1;
                    if (stmt.decorators && stmt.decorators.length) {
                        decorate(stmt.decorators, output, function() {
                            function_definition(stmt, output, false, strip_first);
                        });
                    } else {
                        function_definition(stmt, output, false, strip_first);
                    }
                    output.semicolon();
                    output.newline();
                };
                function internalsub() {
                    if (self.init || self.parent) {
                        output.print("function");
                        output.space();
                        self.name.print(output);
                        output.print("()");
                        output.space();
                        output.with_block(function() {
                            var cname;
                            bind_methods(self.bound, output);
                            output.indent();
                            cname = self.name ? self.name : self.parent;
                            cname.print(output);
                            output.print(".prototype.__init__.apply");
                            output.with_parens(function() {
                                output.print("this");
                                output.comma();
                                output.print("arguments");
                            });
                            output.semicolon();
                            output.newline();
                        });
                    } else {
                        output.print("function");
                        output.space();
                        self.name.print(output);
                        output.print("()");
                        output.space();
                        output.with_block(function() {
                            bind_methods(self.bound, output);
                        });
                    }
                }
                if (self.decorators && self.decorators.length) {
                    output.print("var ");
                    output.assign(self.name);
                    decorate(self.decorators, output, internalsub);
                    output.semicolon();
                } else {
                    internalsub();
                }
                output.newline();
                if (self.parent) {
                    output.indent();
                    output.print("_$rapyd$_extends");
                    output.with_parens(function() {
                        self.name.print(output);
                        output.comma();
                        self.parent.print(output);
                    });
                    output.semicolon();
                    output.newline();
                }
                self.body.forEach(function(stmt, i) {
                    if (stmt instanceof AST_Method) {
                        define_method(stmt);
                        if (stmt.name.name === "__iter__") {
                            class_def("iterator_symbol", true);
                            self.name.print(output);
                            output.print(".prototype." + stmt.name.name);
                            output.end_statement();
                        }
                    } else if (stmt instanceof AST_Class) {
                        console.error("Nested classes aren't supported yet");
                    }
                });
                self.statements.forEach(function(stmt) {
                    if (!(stmt instanceof AST_Method)) {
                        output.indent();
                        stmt.print(output);
                        output.newline();
                    }
                });
            });
            DEFPRINT(AST_Class, function(self, output) {
                self._do_print(output);
            });
            AST_Exit.DEFMETHOD("_do_print", function(output, kind) {
                var self;
                self = this;
                output.print(kind);
                if (self.value) {
                    output.space();
                    self.value.print(output);
                }
                output.semicolon();
            });
            DEFPRINT(AST_Yield, function(self, output) {
                self._do_print(output, "yield" + (self.is_yield_from ? "*" : ""));
            });
            DEFPRINT(AST_Return, function(self, output) {
                self._do_print(output, "return");
            });
            DEFPRINT(AST_Throw, function(self, output) {
                self._do_print(output, "throw");
            });
            AST_LoopControl.DEFMETHOD("_do_print", function(output, kind) {
                output.print(kind);
                if (this.label) {
                    output.space();
                    this.label.print(output);
                }
                output.semicolon();
            });
            DEFPRINT(AST_Break, function(self, output) {
                self._do_print(output, "break");
            });
            DEFPRINT(AST_Continue, function(self, output) {
                self._do_print(output, "continue");
            });
            function make_then(self, output) {
                var b;
                if (output.option("bracketize")) {
                    make_block(self.body, output);
                    return;
                }
                if (!self.body) {
                    return output.force_semicolon();
                }
                if (self.body instanceof AST_Do && output.option("ie_proof")) {
                    make_block(self.body, output);
                    return;
                }
                b = self.body;
                while (true) {
                    if (b instanceof AST_If) {
                        if (!b.alternative) {
                            make_block(self.body, output);
                            return;
                        }
                        b = b.alternative;
                    } else if (b instanceof AST_StatementWithBody) {
                        b = b.body;
                    } else {
                        break;
                    }
                }
                force_statement(self.body, output);
            }
            DEFPRINT(AST_If, function(self, output) {
                output.print("if");
                output.space();
                output.with_parens(function() {
                    self.condition.print(output);
                });
                output.space();
                if (self.alternative) {
                    make_then(self, output);
                    output.space();
                    output.print("else");
                    output.space();
                    force_statement(self.alternative, output);
                } else {
                    self._do_print_body(output);
                }
            });
            DEFPRINT(AST_Switch, function(self, output) {
                output.print("switch");
                output.space();
                output.with_parens(function() {
                    self.expression.print(output);
                });
                output.space();
                if (self.body.length > 0) {
                    output.with_block(function() {
                        self.body.forEach(function(stmt, i) {
                            if (i) {
                                output.newline();
                            }
                            output.indent(true);
                            stmt.print(output);
                        });
                    });
                } else {
                    output.print("{}");
                }
            });
            AST_SwitchBranch.DEFMETHOD("_do_print_body", function(output) {
                if (this.body.length > 0) {
                    output.newline();
                    this.body.forEach(function(stmt) {
                        output.indent();
                        stmt.print(output);
                        output.newline();
                    });
                }
            });
            DEFPRINT(AST_Default, function(self, output) {
                output.print("default:");
                self._do_print_body(output);
            });
            DEFPRINT(AST_Case, function(self, output) {
                output.print("case");
                output.space();
                self.expression.print(output);
                output.print(":");
                self._do_print_body(output);
            });
            DEFPRINT(AST_Try, function(self, output) {
                output.print("try");
                output.space();
                print_bracketed(self, output);
                if (self.bcatch) {
                    output.space();
                    self.bcatch.print(output);
                }
                if (self.bfinally) {
                    output.space();
                    self.bfinally.print(output);
                }
            });
            DEFPRINT(AST_Catch, function(self, output) {
                output.print("catch");
                output.space();
                output.with_parens(function() {
                    output.print("_$rapyd$_Exception");
                });
                output.space();
                if (self.body.length > 1 || self.body[0].errors.length) {
                    output.with_block(function() {
                        var no_default;
                        output.indent();
                        no_default = true;
                        self.body.forEach(function(exception, i) {
                            if (i) {
                                output.print("else ");
                            }
                            if (exception.errors.length) {
                                output.print("if");
                                output.space();
                                output.with_parens(function() {
                                    exception.errors.forEach(function(err, i) {
                                        if (i) {
                                            output.newline();
                                            output.indent();
                                            output.print("||");
                                            output.space();
                                        }
                                        output.print("_$rapyd$_Exception");
                                        output.space();
                                        output.print("instanceof");
                                        output.space();
                                        err.print(output);
                                    });
                                });
                                output.space();
                            } else {
                                no_default = false;
                            }
                            print_bracketed(exception, output, true);
                            output.space();
                        });
                        if (no_default) {
                            output.print("else");
                            output.space();
                            output.with_block(function() {
                                output.indent();
                                output.print("throw");
                                output.space();
                                output.print("_$rapyd$_Exception");
                                output.semicolon();
                                output.newline();
                            });
                        }
                        output.newline();
                    });
                } else {
                    print_bracketed(self.body[0], output, true);
                }
            });
            DEFPRINT(AST_Finally, function(self, output) {
                output.print("finally");
                output.space();
                print_bracketed(self, output);
            });
            AST_Definitions.DEFMETHOD("_do_print", function(output, kind) {
                var p, in_for, avoid_semicolon;
                output.print(kind);
                output.space();
                this.definitions.forEach(function(def_, i) {
                    if (i) {
                        output.comma();
                    }
                    def_.print(output);
                });
                p = output.parent();
                in_for = p instanceof AST_ForIn;
                avoid_semicolon = in_for && p.init === this;
                if (!avoid_semicolon) {
                    output.semicolon();
                }
            });
            DEFPRINT(AST_Var, function(self, output) {
                self._do_print(output, "var");
            });
            DEFPRINT(AST_Const, function(self, output) {
                self._do_print(output, "const");
            });
            function parenthesize_for_noin(node, output, noin) {
                if (!noin) {
                    node.print(output);
                } else {
                    try {
                        node.walk(new TreeWalker(function(node) {
                            if (node instanceof AST_Binary && node.operator === "in") {
                                throw output;
                            }
                        }));
                        node.print(output);
                    } catch (_$rapyd$_Exception) {
                        var ex = _$rapyd$_Exception;
                        if (ex !== output) {
                            throw ex;
                        }
                        node.print(output, true);
                    }
                }
            }
            DEFPRINT(AST_VarDef, function(self, output) {
                var p, noin;
                self.name.print(output);
                if (self.value) {
                    output.assign("");
                    p = output.parent(1);
                    noin = p instanceof AST_ForIn;
                    parenthesize_for_noin(self.value, output, noin);
                }
            });
            DEFPRINT(AST_BaseCall, function(self, output) {
                var rename, has_kwarg_items, has_kwarg_formals, has_kwargs, output_kwargs, obj;
                if (self instanceof AST_ClassCall) {
                    if (self.static) {
                        self.class.print(output);
                        output.print(".");
                        output.print(self.method);
                    } else {
                        self.class.print(output);
                        output.print(".prototype.");
                        output.print(self.method);
                        output.print(".call");
                    }
                } else {
                    rename = SPECIAL_METHODS.hasOwnProperty(self.expression.name) ? SPECIAL_METHODS[self.expression.name] : undefined;
                    if (rename) {
                        output.print(rename);
                    } else {
                        self.expression.print(output);
                    }
                }
                if (self instanceof AST_New && no_constructor_parens(self, output)) {
                    return;
                }
                has_kwarg_items = self.args.kwarg_items && self.args.kwarg_items.length;
                has_kwarg_formals = self.args.kwargs && self.args.kwargs.length;
                has_kwargs = has_kwarg_items || has_kwarg_formals;
                output_kwargs = function() {
                    output.print("desugar_kwargs(");
                    if (has_kwarg_items) {
                        self.args.kwarg_items.forEach(function(kwname, i) {
                            if (i > 0) {
                                output.print(",");
                                output.space();
                            }
                            kwname.print(output);
                        });
                        if (has_kwarg_formals) {
                            output.print(",");
                            output.space();
                        }
                    }
                    if (has_kwarg_formals) {
                        output.print("{");
                        self.args.kwargs.forEach(function(pair, i) {
                            if (i) {
                                output.comma();
                            }
                            pair[0].print(output);
                            output.print(":");
                            output.space();
                            pair[1].print(output);
                        });
                        output.print("}");
                    }
                    output.print(")");
                };
                if (self.args.starargs) {
                    obj = self.expression.expression ? self.expression.expression.name : "this";
                    output.print(".apply");
                    output.with_parens(function() {
                        var i, expr, is_first;
                        output.print(obj);
                        output.comma();
                        i = 0;
                        while (i < self.args.length) {
                            expr = self.args[i];
                            is_first = i === 0;
                            if (!is_first) {
                                output.print(".concat(");
                            }
                            if (expr.is_array) {
                                expr.print(output);
                                i += 1;
                            } else {
                                output.print("[");
                                while (i < self.args.length && !self.args[i].is_array) {
                                    self.args[i].print(output);
                                    if (i + 1 < self.args.length && !self.args[i + 1].is_array) {
                                        output.print(",");
                                        output.space();
                                    }
                                    i += 1;
                                }
                                output.print("]");
                            }
                            if (!is_first) {
                                output.print(")");
                            }
                        }
                        if (has_kwargs) {
                            if (self.args.length) {
                                output.print(".concat(");
                            }
                            output.print("[");
                            output_kwargs();
                            output.print("]");
                            if (self.args.length) {
                                output.print(")");
                            }
                        }
                    });
                } else {
                    output.with_parens(function() {
                        self.args.forEach(function(expr, i) {
                            if (i) {
                                output.comma();
                            }
                            expr.print(output);
                        });
                        if (has_kwargs) {
                            if (self.args.length) {
                                output.print(",");
                                output.space();
                            }
                            output_kwargs();
                        }
                    });
                }
            });
            DEFPRINT(AST_New, function(self, output) {
                output.print("new");
                output.space();
                AST_BaseCall.prototype._codegen(self, output);
            });
            AST_Seq.DEFMETHOD("_do_print", function(output) {
                var self, p, print_seq;
                self = this;
                p = output.parent();
                print_seq = function() {
                    self.car.print(output);
                    if (self.cdr) {
                        output.comma();
                        if (output.should_break()) {
                            output.newline();
                            output.indent();
                        }
                        self.cdr.print(output);
                    }
                };
                if (p instanceof AST_Binary || p instanceof AST_Return || p instanceof AST_Array || p instanceof AST_BaseCall || p instanceof AST_SimpleStatement) {
                    output.with_square(print_seq);
                } else {
                    print_seq();
                }
            });
            DEFPRINT(AST_Seq, function(self, output) {
                self._do_print(output);
            });
            DEFPRINT(AST_Dot, function(self, output) {
                var expr;
                expr = self.expression;
                expr.print(output);
                if (expr instanceof AST_Number && expr.getValue() >= 0) {
                    if (!/[xa-f.]/i.test(output.last())) {
                        output.print(".");
                    }
                }
                output.print(".");
                output.add_mapping(self.end);
                output.print_name(self.property);
            });
            DEFPRINT(AST_Sub, function(self, output) {
                self.expression.print(output);
                output.print("[");
                if (self.property instanceof AST_Unary && self.property.operator === "-" && self.property.expression instanceof AST_Number) {
                    self.expression.print(output);
                    output.print(".length");
                }
                self.property.print(output);
                output.print("]");
            });
            DEFPRINT(AST_Splice, function(self, output) {
                output.print("[].splice.apply");
                output.with_parens(function() {
                    self.expression.print(output);
                    output.comma();
                    output.with_square(function() {
                        self.property.print(output);
                        output.comma();
                        self.property2.print(output);
                        output.print("-");
                        self.property.print(output);
                    });
                    output.print(".concat");
                    output.with_parens(function() {
                        self.assignment.print(output);
                    });
                });
            });
            DEFPRINT(AST_UnaryPrefix, function(self, output) {
                var op;
                op = self.operator;
                output.print(op);
                if (/^[a-z]/i.test(op)) {
                    output.space();
                }
                self.expression.print(output);
            });
            DEFPRINT(AST_UnaryPostfix, function(self, output) {
                self.expression.print(output);
                output.print(self.operator);
            });
            DEFPRINT(AST_Binary, function(self, output) {
                var comparators, function_ops, leftvar;
                comparators = {
                    "<": true,
                    ">": true,
                    "<=": true,
                    ">=": true,
                    "==": true,
                    "!=": true
                };
                function_ops = {
                    "in": "_$rapyd$_in",
                    "**": "Math.pow"
                };
                if (_$rapyd$_in(self.operator, function_ops)) {
                    output.print(function_ops[self.operator]);
                    output.with_parens(function() {
                        self.left.print(output);
                        output.comma();
                        self.right.print(output);
                    });
                } else if (comparators[self.operator] && self.left instanceof AST_Binary && comparators[self.left.operator]) {
                    if (self.left.right instanceof AST_Symbol) {
                        self.left.print(output);
                        leftvar = self.left.right.name;
                    } else {
                        self.left.left.print(output);
                        output.space();
                        output.print(self.left.operator);
                        output.space();
                        output.with_parens(function() {
                            output.assign("_$rapyd$_Temp");
                            self.left.right.print(output);
                            leftvar = "_$rapyd$_Temp";
                        });
                    }
                    output.space();
                    output.print("&&");
                    output.space();
                    output.print(leftvar);
                    output.space();
                    output.print(self.operator);
                    output.space();
                    self.right.print(output);
                } else if (self.operator === "//") {
                    output.print("Math.floor");
                    output.with_parens(function() {
                        self.left.print(output);
                        output.space();
                        output.print("/");
                        output.space();
                        self.right.print(output);
                    });
                } else if (self.operator === "instanceof") {
                    if (self.right.name === "Array" || self.right.name === "list") {
                        output.print("Array.isArray");
                        output.with_parens(function() {
                            self.left.print(output);
                        });
                    } else {
                        output.spaced(self.left, "instanceof", self.right);
                    }
                } else {
                    output.spaced(self.left, self.operator, self.right);
                }
            });
            DEFPRINT(AST_Assign, function(self, output) {
                var flattened, flat;
                if (self.operator === "//=") {
                    output.assign(self.left);
                    output.print("Math.floor");
                    output.with_parens(function() {
                        self.left.print(output);
                        output.space();
                        output.print("/");
                        output.space();
                        self.right.print(output);
                    });
                    return;
                }
                flattened = false;
                if (self.left instanceof AST_Array) {
                    flat = self.left.flatten();
                    flattened = flat.length > self.left.elements.length;
                    output.print("_$rapyd$_Unpack");
                } else {
                    self.left.print(output);
                }
                output.space();
                output.print(self.operator);
                output.space();
                if (flattened) {
                    output.print("_$rapyd$_flatten");
                    output.with_parens(function() {
                        self.right.print(output);
                    });
                } else {
                    self.right.print(output);
                }
                if (self.left instanceof AST_Array) {
                    output.semicolon();
                    output.newline();
                    unpack_tuple(flat, output, true);
                }
            });
            DEFPRINT(AST_Conditional, function(self, output) {
                self.condition.print(output);
                output.space();
                output.print("?");
                output.space();
                self.consequent.print(output);
                output.space();
                output.colon();
                self.alternative.print(output);
            });
            DEFPRINT(AST_Array, function(self, output) {
                output.with_square(function() {
                    var a, len_;
                    a = self.elements;
                    len_ = a.length;
                    if (len_ > 0) {
                        output.space();
                    }
                    a.forEach(function(exp, i) {
                        if (i) {
                            output.comma();
                        }
                        exp.print(output);
                    });
                    if (len_ > 0) {
                        output.space();
                    }
                });
            });
            DEFPRINT(AST_ExpressiveObject, function(self, output) {
                output.with_parens(function() {
                    output.print("function()");
                    output.with_block(function() {
                        output.indent();
                        output.spaced.apply(output, "var d = {}".split(" "));
                        output.end_statement();
                        self.properties.forEach(function(prop, i) {
                            output.indent();
                            output.print("d");
                            output.with_square(function() {
                                prop.key.print(output);
                            });
                            [output.space(), output.print("="), output.space()];
                            prop.value.print(output);
                            output.end_statement();
                        });
                        output.indent();
                        output.spaced("return", "d");
                        output.end_statement();
                    });
                });
                output.print("()");
            });
            DEFPRINT(AST_Object, function(self, output) {
                if (self.properties.length > 0) {
                    output.with_block(function() {
                        self.properties.forEach(function(prop, i) {
                            if (i) {
                                output.print(",");
                                output.newline();
                            }
                            output.indent();
                            prop.print(output);
                        });
                        output.newline();
                    });
                } else {
                    output.print("{}");
                }
            });
            DEFPRINT(AST_ObjectKeyVal, function(self, output) {
                self.key.print(output);
                output.colon();
                self.value.print(output);
            });
            AST_Symbol.DEFMETHOD("definition", function() {
                return this.thedef;
            });
            DEFPRINT(AST_Symbol, function(self, output) {
                var def_;
                def_ = self.definition();
                output.print_name(def_ ? def_.mangled_name || def_.name : self.name);
            });
            DEFPRINT(AST_Undefined, function(self, output) {
                output.print("void 0");
            });
            DEFPRINT(AST_Hole, noop);
            DEFPRINT(AST_Infinity, function(self, output) {
                output.print("1/0");
            });
            DEFPRINT(AST_NaN, function(self, output) {
                output.print("0/0");
            });
            DEFPRINT(AST_This, function(self, output) {
                output.print("this");
            });
            DEFPRINT(AST_Constant, function(self, output) {
                output.print(self.getValue());
            });
            DEFPRINT(AST_String, function(self, output) {
                output.print_string(self.getValue());
            });
            DEFPRINT(AST_Verbatim, function(self, output) {
                output.print(self.getValue());
            });
            DEFPRINT(AST_Number, function(self, output) {
                output.print(make_num(self.getValue()));
            });
            DEFPRINT(AST_RegExp, function(self, output) {
                var str_, p;
                str_ = self.getValue().toString();
                if (output.option("ascii_only")) {
                    str_ = output.to_ascii(str_);
                }
                output.print(str_);
                p = output.parent();
                if (p instanceof AST_Binary && /^in/.test(p.operator) && p.left === self) {
                    output.print(" ");
                }
            });
            function force_statement(stat, output) {
                if (output.option("bracketize")) {
                    if (!stat || stat instanceof AST_EmptyStatement) {
                        output.print("{}");
                    } else if (stat instanceof AST_BlockStatement) {
                        stat.print(output);
                    } else {
                        output.with_block(function() {
                            output.indent();
                            stat.print(output);
                            output.newline();
                        });
                    }
                } else {
                    if (!stat || stat instanceof AST_EmptyStatement) {
                        output.force_semicolon();
                    } else {
                        stat.print(output);
                    }
                }
            }
            function first_in_statement(output) {
                var a, i, node, p;
                a = output.stack();
                i = a.length;
                node = a[i -= 1];
                p = a[i -= 1];
                while (i > 0) {
                    if (p instanceof AST_Statement && p.body === node) {
                        return true;
                    }
                    if (p instanceof AST_Seq && p.car === node || p instanceof AST_BaseCall && p.expression === node || p instanceof AST_Dot && p.expression === node || p instanceof AST_Sub && p.expression === node || p instanceof AST_Conditional && p.condition === node || p instanceof AST_Binary && p.left === node || p instanceof AST_UnaryPostfix && p.expression === node) {
                        node = p;
                        p = a[i -= 1];
                    } else {
                        return false;
                    }
                }
            }
            function no_constructor_parens(self, output) {
                return self.args.length === 0 && !output.option("beautify");
            }
            function best_of(a) {
                var best, len_, i;
                best = a[0];
                len_ = best.length;
                for (i = 1; i < a.length; i++) {
                    if (a[i].length < len_) {
                        best = a[i];
                        len_ = best.length;
                    }
                }
                return best;
            }
            function make_num(num) {
                var str_, a, m;
                str_ = num.toString(10);
                a = [ str_.replace(/^0\./, ".").replace("e+", "e") ];
                m = null;
                if (Math.floor(num) === num) {
                    if (num >= 0) {
                        a.push("0x" + num.toString(16).toLowerCase(), "0" + num.toString(8));
                    } else {
                        a.push("-0x" + (-num).toString(16).toLowerCase(), "-0" + (-num).toString(8));
                    }
                    if (m = /^(.*?)(0+)$/.exec(num)) {
                        a.push(m[1] + "e" + m[2].length);
                    }
                } else if (m = /^0?\.(0+)(.*)$/.exec(num)) {
                    a.push(m[2] + "e-" + (m[1].length + m[2].length), str_.substr(str_.indexOf(".")));
                }
                return best_of(a);
            }
            function make_block(stmt, output) {
                if (stmt instanceof AST_BlockStatement) {
                    stmt.print(output);
                    return;
                }
                output.with_block(function() {
                    output.indent();
                    stmt.print(output);
                    output.newline();
                });
            }
            function DEFMAP(nodetype, generator) {
                nodetype.DEFMETHOD("add_source_map", function(stream) {
                    generator(this, stream);
                });
            }
            DEFMAP(AST_Node, noop);
            function basic_sourcemap_gen(self, output) {
                output.add_mapping(self.start);
            }
            DEFMAP(AST_Directive, basic_sourcemap_gen);
            DEFMAP(AST_Debugger, basic_sourcemap_gen);
            DEFMAP(AST_Symbol, basic_sourcemap_gen);
            DEFMAP(AST_Jump, basic_sourcemap_gen);
            DEFMAP(AST_StatementWithBody, basic_sourcemap_gen);
            DEFMAP(AST_Lambda, basic_sourcemap_gen);
            DEFMAP(AST_Switch, basic_sourcemap_gen);
            DEFMAP(AST_SwitchBranch, basic_sourcemap_gen);
            DEFMAP(AST_BlockStatement, basic_sourcemap_gen);
            DEFMAP(AST_Toplevel, noop);
            DEFMAP(AST_New, basic_sourcemap_gen);
            DEFMAP(AST_Try, basic_sourcemap_gen);
            DEFMAP(AST_Catch, basic_sourcemap_gen);
            DEFMAP(AST_Finally, basic_sourcemap_gen);
            DEFMAP(AST_Definitions, basic_sourcemap_gen);
            DEFMAP(AST_Constant, basic_sourcemap_gen);
            DEFMAP(AST_ObjectProperty, function(self, output) {
                output.add_mapping(self.start, self.key);
            });
        }
        codegen();
        _$rapyd$_modules["output"]["OutputStream"] = OutputStream;

        _$rapyd$_modules["output"]["codegen"] = codegen;
    })();

    (function(){

        var __name__ = "__main__";


        var ast, ast_node;
        var DefaultsError = _$rapyd$_modules["utils"].DefaultsError;
        var string_template = _$rapyd$_modules["utils"].string_template;
        
        var ImportError = _$rapyd$_modules["errors"].ImportError;
        var SyntaxError = _$rapyd$_modules["errors"].SyntaxError;
        
        var ALL_KEYWORDS = _$rapyd$_modules["tokenizer"].ALL_KEYWORDS;
        var IDENTIFIER_PAT = _$rapyd$_modules["tokenizer"].IDENTIFIER_PAT;
        var tokenizer = _$rapyd$_modules["tokenizer"].tokenizer;
        
        var parse = _$rapyd$_modules["parse"].parse;
        var NATIVE_CLASSES = _$rapyd$_modules["parse"].NATIVE_CLASSES;
        
        var OutputStream = _$rapyd$_modules["output"].OutputStream;
        
        if (typeof exports === "object") {
            exports.DefaultsError = DefaultsError;
            exports.parse = parse;
            exports.OutputStream = OutputStream;
            exports.string_template = string_template;
            exports.ALL_KEYWORDS = ALL_KEYWORDS;
            exports.IDENTIFIER_PAT = IDENTIFIER_PAT;
            exports.NATIVE_CLASSES = NATIVE_CLASSES;
            exports.ImportError = ImportError;
            exports.SyntaxError = SyntaxError;
            exports.tokenizer = tokenizer;
            ast = _$rapyd$_modules["ast"];
            var _$rapyd$_Iter37 = _$rapyd$_Iterable(ast);
            for (var _$rapyd$_Index37 = 0; _$rapyd$_Index37 < _$rapyd$_Iter37.length; _$rapyd$_Index37++) {
                ast_node = _$rapyd$_Iter37[_$rapyd$_Index37];
                if (ast_node.substr(0, 4) === "AST_") {
                    exports[ast_node] = ast[ast_node];
                }
            }
        }
    })();
})();