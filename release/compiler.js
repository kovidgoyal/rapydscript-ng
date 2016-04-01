(function(){
    "use strict";
    var _$rapyd$_iterator_symbol = (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") ? Symbol.iterator : "iterator-Symbol-5d0927e5554349048cf0e3762a228256";
    var _$rapyd$_kwargs_symbol = (typeof Symbol === "function") ? Symbol("kwargs-object") : "kwargs-object-Symbol-5d0927e5554349048cf0e3762a228256";
    var _$rapyd$_cond_temp, _$rapyd$_expr_temp;
    var _$rapyd$_object_counter = 0;
    function _$rapyd$_interpolate_kwargs(f, supplied_args) {
            var has_prop, kwobj, args, prop;
            if (!f.__argnames__) {
                return f.apply(this, supplied_args);
            }
            has_prop = Object.prototype.hasOwnProperty;
            kwobj = supplied_args.pop();
            if (f.__handles_kwarg_interpolation__) {
                args = new Array(Math.max(supplied_args.length, f.__argnames__.length) + 1);
                args[args.length-1] = kwobj;
                for (var i = 0; i < args.length - 1; i++) {
                    if (i < f.__argnames__.length) {
                        prop = f.__argnames__[i];
                        if (has_prop.call(kwobj, prop)) {
                            args[i] = kwobj[prop];
                            delete kwobj[prop];
                        } else if (i < supplied_args.length) {
                            args[i] = supplied_args[i];
                        }
                    } else {
                        args[i] = supplied_args[i];
                    }
                }
                return f.apply(this, args);
            }
            for (var i = 0; i < f.__argnames__.length; i++) {
                prop = f.__argnames__[i];
                if (has_prop.call(kwobj, prop)) {
                    supplied_args[i] = kwobj[prop];
                }
            }
            return f.apply(this, supplied_args);
        };
    function range(start, stop, step) {
            var length;
            if (arguments.length <= 1) {
                stop = start || 0;
                start = 0;
            }
            step = arguments[2] || 1;
            length = Math.max(Math.ceil((stop - start) / step), 0);
            return (function(){
                var _$rapyd$_d = {};
                _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
                    var _$rapyd$_anonfunc = function () {
                        return this;
                    };
                    return _$rapyd$_anonfunc;
                })();
                _$rapyd$_d["_i"] = start - step;
                _$rapyd$_d["_idx"] = -1;
                _$rapyd$_d["next"] = (function() {
                    var _$rapyd$_anonfunc = function () {
                        this._i += step;
                        this._idx += 1;
                        if (this._idx >= length) {
                            return {
                                "done": true
                            };
                        }
                        return {
                            "done": false,
                            "value": this._i
                        };
                    };
                    return _$rapyd$_anonfunc;
                })();
                return _$rapyd$_d;
            })();
        };
    var len = (function _$rapyd$_len() {
            if (typeof Set === "function" && typeof Map === "function") {
                return (function() {
                    var _$rapyd$_anonfunc = function (obj) {
                        if (_$rapyd$_arraylike(obj)) {
                            return obj.length;
                        }
                        if (obj instanceof Set || obj instanceof Map) {
                            return obj.size;
                        }
                        if (typeof obj.__len__ === "function") {
                            return obj.__len__();
                        }
                        return Object.keys(obj).length;
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["obj"];
                    return _$rapyd$_anonfunc;
                })();
            }
            return (function() {
                var _$rapyd$_anonfunc = function (obj) {
                    if (_$rapyd$_arraylike(obj)) {
                        return obj.length;
                    }
                    if (typeof obj.__len__ === "function") {
                        return obj.__len__();
                    }
                    return Object.keys(obj).length;
                };

                _$rapyd$_anonfunc.__argnames__ = ["obj"];
                return _$rapyd$_anonfunc;
            })();
        })();
    function _$rapyd$_Iterable(iterable) {
            var iterator, ans, result;
            if (_$rapyd$_arraylike(iterable)) {
                return iterable;
            }
            if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
                iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
                ans = _$rapyd$_list_decorate([]);
                result = iterator.next();
                while (!result.done) {
                    ans.push(result.value);
                    result = iterator.next();
                }
                return ans;
            }
            return Object.keys(iterable);
        };
    function _$rapyd$_interpolate_kwargs_constructor(apply, f, supplied_args) {
            if (apply) {
                f.apply(this, supplied_args);
            } else {
                _$rapyd$_interpolate_kwargs.call(this, f, supplied_args);
            }
            return this;
        };
    function _$rapyd$_extends(child, parent) {
            child.prototype = Object.create(parent.prototype);
            child.prototype.constructor = child;
        };
    var _$rapyd$_in = (function _$rapyd$_in() {
            if (typeof Map === "function" && typeof Set === "function") {
                return (function() {
                    var _$rapyd$_anonfunc = function (val, arr) {
                        if (typeof arr === "string") {
                            return arr.indexOf(val) !== -1;
                        }
                        if (typeof arr.__contains__ === "function") {
                            return arr.__contains__(val);
                        }
                        if ((arr instanceof Map || arr instanceof Set)) {
                            return arr.has(val);
                        }
                        if (_$rapyd$_arraylike(arr)) {
                            return _$rapyd$_list_contains.call(arr, val);
                        }
                        return Object.prototype.hasOwnProperty.call(arr, val);
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["val", "arr"];
                    return _$rapyd$_anonfunc;
                })();
            }
            return (function() {
                var _$rapyd$_anonfunc = function (val, arr) {
                    if (typeof arr === "string") {
                        return arr.indexOf(val) !== -1;
                    }
                    if (typeof arr.__contains__ === "function") {
                        return arr.__contains__(val);
                    }
                    if (_$rapyd$_arraylike(arr)) {
                        return _$rapyd$_list_contains.call(arr, val);
                    }
                    return Object.prototype.hasOwnProperty.call(arr, val);
                };

                _$rapyd$_anonfunc.__argnames__ = ["val", "arr"];
                return _$rapyd$_anonfunc;
            })();
        })();
    function enumerate(iterable) {
            var ans, iterator;
            if (_$rapyd$_arraylike(iterable)) {
                ans = {
                    "_i": -1,
                    "next": (function() {
                        var _$rapyd$_anonfunc = function () {
                            this._i += 1;
                            if (this._i < iterable.length) {
                                return {
                                    "done": false,
                                    "value": _$rapyd$_list_decorate([ this._i, iterable[this._i] ])
                                };
                            }
                            return {
                                "done": true
                            };
                        };
                        return _$rapyd$_anonfunc;
                    })()
                };
                ans[_$rapyd$_iterator_symbol] = (function() {
                    var _$rapyd$_anonfunc = function () {
                        return this;
                    };
                    return _$rapyd$_anonfunc;
                })();
                return ans;
            }
            if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
                iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
                ans = {
                    "_iterator": iterator,
                    "_i": -1,
                    "next": (function() {
                        var _$rapyd$_anonfunc = function () {
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
                                "value": _$rapyd$_list_decorate([ this._i, r.value ])
                            };
                        };
                        return _$rapyd$_anonfunc;
                    })()
                };
                ans[_$rapyd$_iterator_symbol] = (function() {
                    var _$rapyd$_anonfunc = function () {
                        return this;
                    };
                    return _$rapyd$_anonfunc;
                })();
                return ans;
            }
            return enumerate(Object.keys(iterable));
        };
    var Exception = Error;
function AttributeError() {
    if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
    AttributeError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(AttributeError, Error);
AttributeError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = (new Error).stack;
};

AttributeError.prototype.__init__.__argnames__ = ["msg"];
AttributeError.__argnames__ = AttributeError.prototype.__init__.__argnames__;
AttributeError.__handles_kwarg_interpolation__ = AttributeError.prototype.__init__.__handles_kwarg_interpolation__;
AttributeError.prototype.__repr__ = function __repr__ () {
    return "<" + __name__ + "." + "AttributeError" + " #" + this._$rapyd$_object_id + ">";
};
AttributeError.prototype.__str__ = function __str__ () {
    return this.__repr__();
};
AttributeError.prototype.name = "AttributeError";

function IndexError() {
    if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
    IndexError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(IndexError, Error);
IndexError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = (new Error).stack;
};

IndexError.prototype.__init__.__argnames__ = ["msg"];
IndexError.__argnames__ = IndexError.prototype.__init__.__argnames__;
IndexError.__handles_kwarg_interpolation__ = IndexError.prototype.__init__.__handles_kwarg_interpolation__;
IndexError.prototype.__repr__ = function __repr__ () {
    return "<" + __name__ + "." + "IndexError" + " #" + this._$rapyd$_object_id + ">";
};
IndexError.prototype.__str__ = function __str__ () {
    return this.__repr__();
};
IndexError.prototype.name = "IndexError";

function KeyError() {
    if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
    KeyError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(KeyError, Error);
KeyError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = (new Error).stack;
};

KeyError.prototype.__init__.__argnames__ = ["msg"];
KeyError.__argnames__ = KeyError.prototype.__init__.__argnames__;
KeyError.__handles_kwarg_interpolation__ = KeyError.prototype.__init__.__handles_kwarg_interpolation__;
KeyError.prototype.__repr__ = function __repr__ () {
    return "<" + __name__ + "." + "KeyError" + " #" + this._$rapyd$_object_id + ">";
};
KeyError.prototype.__str__ = function __str__ () {
    return this.__repr__();
};
KeyError.prototype.name = "KeyError";

function ValueError() {
    if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
    ValueError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(ValueError, Error);
ValueError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = (new Error).stack;
};

ValueError.prototype.__init__.__argnames__ = ["msg"];
ValueError.__argnames__ = ValueError.prototype.__init__.__argnames__;
ValueError.__handles_kwarg_interpolation__ = ValueError.prototype.__init__.__handles_kwarg_interpolation__;
ValueError.prototype.__repr__ = function __repr__ () {
    return "<" + __name__ + "." + "ValueError" + " #" + this._$rapyd$_object_id + ">";
};
ValueError.prototype.__str__ = function __str__ () {
    return this.__repr__();
};
ValueError.prototype.name = "ValueError";

function UnicodeDecodeError() {
    if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
    UnicodeDecodeError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(UnicodeDecodeError, ValueError);
UnicodeDecodeError.prototype.__init__ = function __init__ () {
    ValueError.prototype.__init__ && ValueError.prototype.__init__.apply(this, arguments);
};
UnicodeDecodeError.prototype.__repr__ = function __repr__ () {
    return "<" + __name__ + "." + "UnicodeDecodeError" + " #" + this._$rapyd$_object_id + ">";
};
UnicodeDecodeError.prototype.__str__ = function __str__ () {
    return this.__repr__();
};
UnicodeDecodeError.prototype.name = "UnicodeDecodeError";
;
    var _$rapyd$_chain_assign_temp;
function _$rapyd$_equals(a, b) {
    var _$rapyd$_unpack, akeys, bkeys, key;
    if (a === b) {
        return true;
    }
    if (a && typeof a.__eq__ === "function") {
        return a.__eq__(b);
    }
    if (b && typeof b.__eq__ === "function") {
        return b.__eq__(a);
    }
    if (_$rapyd$_arraylike(a) && _$rapyd$_arraylike(b)) {
        if ((a.length !== b.length && (typeof a.length !== "object" || _$rapyd$_not_equals(a.length, b.length)))) {
            return false;
        }
        for (var i=0; i < a.length; i++) {
            if (!((a[i] === b[i] || typeof a[i] === "object" && _$rapyd$_equals(a[i], b[i])))) {
                return false;
            }
        }
        return true;
    }
    if (a && b && a.constructor === b.constructor && a.constructor === Object) {
        _$rapyd$_unpack = [Object.keys(a), Object.keys(b)];
        akeys = _$rapyd$_unpack[0];
        bkeys = _$rapyd$_unpack[1];
        if (akeys.length !== bkeys.length) {
            return false;
        }
        for (var j=0; j < akeys.length; j++) {
            key = akeys[j];
            if (!((a[key] === b[key] || typeof a[key] === "object" && _$rapyd$_equals(a[key], b[key])))) {
                return false;
            }
        }
        return true;
    }
    return false;
};

_$rapyd$_equals.__argnames__ = ["a", "b"];

function _$rapyd$_not_equals(a, b) {
    if (a === b) {
        return false;
    }
    if (a && typeof a.__ne__ === "function") {
        return a.__ne__(b);
    }
    if (b && typeof b.__ne__ === "function") {
        return b.__ne__(a);
    }
    return !_$rapyd$_equals(a, b);
};

_$rapyd$_not_equals.__argnames__ = ["a", "b"];

var equals = _$rapyd$_equals;
function _$rapyd$_list_extend(iterable) {
    var start, iterator, result;
    if (Array.isArray(iterable) || typeof iterable === "string") {
        start = this.length;
        this.length += iterable.length;
        for (var i = 0; i < iterable.length; i++) {
            this[start + i] = iterable[i];
        }
    } else {
        iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
        result = iterator.next();
        while (!result.done) {
            this.push(result.value);
            result = iterator.next();
        }
    }
};

_$rapyd$_list_extend.__argnames__ = ["iterable"];

function _$rapyd$_list_index(val, start, stop) {
    var idx;
    start = start || 0;
    if (start < 0) {
        start = this.length + start;
    }
    if (start < 0) {
        throw new ValueError(val + " is not in list");
    }
    if (stop === undefined) {
        idx = this.indexOf(val, start);
        if (idx === -1) {
            throw new ValueError(val + " is not in list");
        }
        return idx;
    }
    if (stop < 0) {
        stop = this.length + stop;
    }
    for (var i = start; i < stop; i++) {
        if ((this[i] === val || typeof this[i] === "object" && _$rapyd$_equals(this[i], val))) {
            return i;
        }
    }
    throw new ValueError(val + " is not in list");
};

_$rapyd$_list_index.__argnames__ = ["val", "start", "stop"];

function _$rapyd$_list_pop(index) {
    var ans;
    if (this.length === 0) {
        throw new IndexError("list is empty");
    }
    ans = this.splice(index, 1);
    if (!ans.length) {
        throw new IndexError("pop index out of range");
    }
    return ans[0];
};

_$rapyd$_list_pop.__argnames__ = ["index"];

function _$rapyd$_list_remove(value) {
    var idx;
    idx = this.indexOf(value);
    if (idx === -1) {
        throw new ValueError(value + " not in list");
    }
    this.splice(idx, 1);
};

_$rapyd$_list_remove.__argnames__ = ["value"];

function _$rapyd$_list_to_string() {
    return "[" + this.join(", ") + "]";
};

function _$rapyd$_list_insert(index, val) {
    if (index < 0) {
        index += this.length;
    }
    index = min(this.length, max(index, 0));
    if (index === 0) {
        this.unshift(val);
        return;
    }
    for (var i = this.length; i > index; i--) {
        this[i] = this[i - 1];
    }
    this[index] = val;
};

_$rapyd$_list_insert.__argnames__ = ["index", "val"];

function _$rapyd$_list_copy() {
    return _$rapyd$_list_constructor(this);
};

function _$rapyd$_list_clear() {
    this.length = 0;
};

function _$rapyd$_list_as_array() {
    return Array.prototype.slice.call(this);
};

function _$rapyd$_list_count(value) {
    return this.reduce((function() {
        var _$rapyd$_anonfunc = function (n, val) {
            return n + (val === value);
        };

        _$rapyd$_anonfunc.__argnames__ = ["n", "val"];
        return _$rapyd$_anonfunc;
    })(), 0);
};

_$rapyd$_list_count.__argnames__ = ["value"];

function _$rapyd$_list_sort_key(value) {
    var t;
    t = typeof value;
    if (t === "string" || t === "number") {
        return value;
    }
    return value.toString();
};

_$rapyd$_list_sort_key.__argnames__ = ["value"];

function _$rapyd$_list_sort_cmp(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};

_$rapyd$_list_sort_cmp.__argnames__ = ["a", "b"];

function _$rapyd$_list_sort(key, reverse) {
    var mult, keymap, k;
    key = key || _$rapyd$_list_sort_key;
    mult = (reverse) ? -1 : 1;
    keymap = dict();
    for (var i=0; i < this.length; i++) {
        k = this[i];
        keymap.set(k, key(k));
    }
    this.sort((function() {
        var _$rapyd$_anonfunc = function (a, b) {
            return mult * _$rapyd$_list_sort_cmp(keymap.get(a), keymap.get(b));
        };

        _$rapyd$_anonfunc.__argnames__ = ["a", "b"];
        return _$rapyd$_anonfunc;
    })());
};

_$rapyd$_list_sort.__argnames__ = ["key", "reverse"];

function _$rapyd$_list_concat() {
    var ans;
    ans = Array.prototype.concat.apply(this, arguments);
    _$rapyd$_list_decorate(ans);
    return ans;
};

function _$rapyd$_list_slice() {
    var ans;
    ans = Array.prototype.slice.apply(this, arguments);
    _$rapyd$_list_decorate(ans);
    return ans;
};

function _$rapyd$_list_iterator(value) {
    var self;
    self = this;
    return {
        "_i": -1,
        "_list": self,
        "next": (function() {
            var _$rapyd$_anonfunc = function () {
                this._i += 1;
                if (this._i >= this._list.length) {
                    return {
                        "done": true
                    };
                }
                return {
                    "done": false,
                    "value": this._list[this._i]
                };
            };
            return _$rapyd$_anonfunc;
        })()
    };
};

_$rapyd$_list_iterator.__argnames__ = ["value"];

function _$rapyd$_list_len() {
    return this.length;
};

function _$rapyd$_list_contains(val) {
    for (var i = 0; i < this.length; i++) {
        if ((this[i] === val || typeof this[i] === "object" && _$rapyd$_equals(this[i], val))) {
            return true;
        }
    }
    return false;
};

_$rapyd$_list_contains.__argnames__ = ["val"];

function _$rapyd$_list_eq(other) {
    if (!_$rapyd$_arraylike(other)) {
        return false;
    }
    if ((this.length !== other.length && (typeof this.length !== "object" || _$rapyd$_not_equals(this.length, other.length)))) {
        return false;
    }
    for (var i = 0; i < this.length; i++) {
        if (!((this[i] === other[i] || typeof this[i] === "object" && _$rapyd$_equals(this[i], other[i])))) {
            return false;
        }
    }
    return true;
};

_$rapyd$_list_eq.__argnames__ = ["other"];

function _$rapyd$_list_decorate(ans) {
    ans.append = Array.prototype.push;
    ans.toString = _$rapyd$_list_to_string;
    ans.inspect = _$rapyd$_list_to_string;
    ans.extend = _$rapyd$_list_extend;
    ans.index = _$rapyd$_list_index;
    ans.pypop = _$rapyd$_list_pop;
    ans.remove = _$rapyd$_list_remove;
    ans.insert = _$rapyd$_list_insert;
    ans.copy = _$rapyd$_list_copy;
    ans.clear = _$rapyd$_list_clear;
    ans.count = _$rapyd$_list_count;
    ans.concat = _$rapyd$_list_concat;
    ans.pysort = _$rapyd$_list_sort;
    ans.slice = _$rapyd$_list_slice;
    ans.as_array = _$rapyd$_list_as_array;
    ans.__len__ = _$rapyd$_list_len;
    ans.__contains__ = _$rapyd$_list_contains;
    ans.__eq__ = _$rapyd$_list_eq;
    ans.constructor = _$rapyd$_list_constructor;
    if (typeof ans[_$rapyd$_iterator_symbol] !== "function") {
        ans[_$rapyd$_iterator_symbol] = _$rapyd$_list_iterator;
    }
    return ans;
};

_$rapyd$_list_decorate.__argnames__ = ["ans"];

function _$rapyd$_list_constructor(iterable) {
    var ans, iterator, result;
    if (iterable === undefined) {
        ans = [];
    } else if (_$rapyd$_arraylike(iterable)) {
        ans = new Array(iterable.length);
        for (var i = 0; i < iterable.length; i++) {
            ans[i] = iterable[i];
        }
    } else if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
        iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
        ans = _$rapyd$_list_decorate([]);
        result = iterator.next();
        while (!result.done) {
            ans.push(result.value);
            result = iterator.next();
        }
    } else if (typeof iterable === "number") {
        ans = new Array(iterable);
    } else {
        ans = Object.keys(iterable);
    }
    return _$rapyd$_list_decorate(ans);
};

_$rapyd$_list_constructor.__argnames__ = ["iterable"];

_$rapyd$_list_constructor.__name__ = "list";
var list = _$rapyd$_list_constructor, list_wrap = _$rapyd$_list_decorate;
function sorted() {
    var iterable = ( 0 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true) ? undefined : arguments[0];
    var key = (arguments[1] === undefined || ( 1 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? sorted.__defaults__.key : arguments[1];
    var reverse = (arguments[2] === undefined || ( 2 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? sorted.__defaults__.reverse : arguments[2];
    var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
    if (_$rapyd$_kwargs_obj === null || typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [_$rapyd$_kwargs_symbol] !== true) _$rapyd$_kwargs_obj = {};
    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "key")){
        key = _$rapyd$_kwargs_obj.key;
    }
    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "reverse")){
        reverse = _$rapyd$_kwargs_obj.reverse;
    }
    var ans;
    ans = _$rapyd$_list_constructor(iterable);
    ans.pysort(key, reverse);
    return ans;
};

sorted.__defaults__ = {
    key:null, 
    reverse:false
};

sorted.__handles_kwarg_interpolation__ = true;

sorted.__argnames__ = ["iterable", "key", "reverse"];

var _$rapyd$_global_object_id = 0, _$rapyd$_set_implementation;
function _$rapyd$_set_keyfor(x) {
    var t, ans;
    t = typeof x;
    if (t === "string" || t === "number" || t === "boolean") {
        return "_" + t[0] + x;
    }
    if (x === null) {
        return "__!@#$0";
    }
    ans = x._$rapyd$_hash_key_prop;
    if (ans === undefined) {
        ans = "_!@#$" + (++_$rapyd$_global_object_id);
        Object.defineProperty(x, "_$rapyd$_hash_key_prop", {
            "value": ans
        });
    }
    return ans;
};

_$rapyd$_set_keyfor.__argnames__ = ["x"];

function _$rapyd$_set_polyfill() {
    this._store = {};
    this.size = 0;
};

_$rapyd$_set_polyfill.prototype.add = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var key;
        key = _$rapyd$_set_keyfor(x);
        if (!Object.hasOwnProperty.call(this._store, key)) {
            this.size += 1;
            this._store[key] = x;
        }
        return this;
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set_polyfill.prototype.clear = (function() {
    var _$rapyd$_anonfunc = function (x) {
        this._store = {};
        this.size = 0;
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set_polyfill.prototype.delete = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var key;
        key = _$rapyd$_set_keyfor(x);
        if (Object.hasOwnProperty.call(this._store, key)) {
            this.size -= 1;
            delete this._store[key];
            return true;
        }
        return false;
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set_polyfill.prototype.has = (function() {
    var _$rapyd$_anonfunc = function (x) {
        return Object.hasOwnProperty.call(this._store, _$rapyd$_set_keyfor(x));
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set_polyfill.prototype.values = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var keys, s;
        keys = Object.keys(this._store);
        s = this._store;
        return (function(){
            var _$rapyd$_d = {};
            _$rapyd$_d["_keys"] = keys;
            _$rapyd$_d["_i"] = -1;
            _$rapyd$_d["_s"] = s;
            _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
                var _$rapyd$_anonfunc = function () {
                    return this;
                };
                return _$rapyd$_anonfunc;
            })();
            _$rapyd$_d["next"] = (function() {
                var _$rapyd$_anonfunc = function () {
                    this._i += 1;
                    if (this._i >= this._keys.length) {
                        return {
                            "done": true
                        };
                    }
                    return {
                        "done": false,
                        "value": s[this._keys[this._i]]
                    };
                };
                return _$rapyd$_anonfunc;
            })();
            return _$rapyd$_d;
        })();
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
if (typeof Set !== "function" || typeof Set.prototype.delete !== "function") {
    _$rapyd$_set_implementation = _$rapyd$_set_polyfill;
} else {
    _$rapyd$_set_implementation = Set;
}
function _$rapyd$_set(iterable) {
    var ans, s, iterator, result, keys;
    if (this instanceof _$rapyd$_set) {
        this.jsset = new _$rapyd$_set_implementation;
        ans = this;
        if (iterable === undefined) {
            return ans;
        }
        s = ans.jsset;
        if (_$rapyd$_arraylike(iterable)) {
            for (var i = 0; i < iterable.length; i++) {
                s.add(iterable[i]);
            }
        } else if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
            iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
            result = iterator.next();
            while (!result.done) {
                s.add(result.value);
                result = iterator.next();
            }
        } else {
            keys = Object.keys(iterable);
            for (var j=0; j < keys.length; j++) {
                s.add(keys[j]);
            }
        }
        return ans;
    } else {
        return new _$rapyd$_set(iterable);
    }
};

_$rapyd$_set.__argnames__ = ["iterable"];

_$rapyd$_set.prototype.__name__ = "set";
Object.defineProperties(_$rapyd$_set.prototype, {
    "length": {
        "get": (function() {
            var _$rapyd$_anonfunc = function () {
                return this.jsset.size;
            };
            return _$rapyd$_anonfunc;
        })()
    },
    "size": {
        "get": (function() {
            var _$rapyd$_anonfunc = function () {
                return this.jsset.size;
            };
            return _$rapyd$_anonfunc;
        })()
    }
});
_$rapyd$_set.prototype.__len__ = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsset.size;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function (x) {
        return this.jsset.has(x);
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.has = _$rapyd$_chain_assign_temp;
_$rapyd$_set.prototype.__contains__ = _$rapyd$_chain_assign_temp;
;
_$rapyd$_set.prototype.add = (function() {
    var _$rapyd$_anonfunc = function (x) {
        this.jsset.add(x);
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.clear = (function() {
    var _$rapyd$_anonfunc = function () {
        this.jsset.clear();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.copy = (function() {
    var _$rapyd$_anonfunc = function () {
        return _$rapyd$_set(this);
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.discard = (function() {
    var _$rapyd$_anonfunc = function (x) {
        this.jsset.delete(x);
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype[_$rapyd$_iterator_symbol] = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsset.values();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.difference = (function() {
    var _$rapyd$_anonfunc = function () {
        var ans, s, iterator, r, x, has;
        ans = new _$rapyd$_set;
        s = ans.jsset;
        iterator = this.jsset.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            has = false;
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i].has(x)) {
                    has = true;
                    break;
                }
            }
            if (!has) {
                s.add(x);
            }
            r = iterator.next();
        }
        return ans;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.difference_update = (function() {
    var _$rapyd$_anonfunc = function () {
        var s, remove, iterator, r, x;
        s = this.jsset;
        remove = [];
        iterator = s.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i].has(x)) {
                    remove.push(x);
                    break;
                }
            }
            r = iterator.next();
        }
        for (var j = 0; j < remove.length; j++) {
            s.delete(remove[j]);
        }
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.intersection = (function() {
    var _$rapyd$_anonfunc = function () {
        var ans, s, iterator, r, x, has;
        ans = new _$rapyd$_set;
        s = ans.jsset;
        iterator = this.jsset.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            has = true;
            for (var i = 0; i < arguments.length; i++) {
                if (!arguments[i].has(x)) {
                    has = false;
                    break;
                }
            }
            if (has) {
                s.add(x);
            }
            r = iterator.next();
        }
        return ans;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.intersection_update = (function() {
    var _$rapyd$_anonfunc = function () {
        var s, remove, iterator, r, x;
        s = this.jsset;
        remove = [];
        iterator = s.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            for (var i = 0; i < arguments.length; i++) {
                if (!arguments[i].has(x)) {
                    remove.push(x);
                    break;
                }
            }
            r = iterator.next();
        }
        for (var j = 0; j < remove.length; j++) {
            s.delete(remove[j]);
        }
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.isdisjoint = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var iterator, r, x;
        iterator = this.jsset.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            if (other.has(x)) {
                return false;
            }
            r = iterator.next();
        }
        return true;
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.issubset = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var iterator, r, x;
        iterator = this.jsset.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            if (!other.has(x)) {
                return false;
            }
            r = iterator.next();
        }
        return true;
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.issuperset = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var s, iterator, r, x;
        s = this.jsset;
        iterator = other.jsset.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            if (!s.has(x)) {
                return false;
            }
            r = iterator.next();
        }
        return true;
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.pop = (function() {
    var _$rapyd$_anonfunc = function () {
        var iterator, r;
        iterator = this.jsset.values();
        r = iterator.next();
        if (r.done) {
            throw new KeyError("pop from an empty set");
        }
        this.jsset.delete(r.value);
        return r.value;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.remove = (function() {
    var _$rapyd$_anonfunc = function (x) {
        if (!this.jsset.delete(x)) {
            throw new KeyError(x.toString());
        }
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.symmetric_difference = (function() {
    var _$rapyd$_anonfunc = function (other) {
        return this.union(other).difference(this.intersection(other));
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.symmetric_difference_update = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var common;
        common = this.intersection(other);
        this.update(other);
        this.difference_update(common);
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.union = (function() {
    var _$rapyd$_anonfunc = function () {
        var ans;
        ans = _$rapyd$_set(this);
        ans.update.apply(ans, arguments);
        return ans;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.update = (function() {
    var _$rapyd$_anonfunc = function () {
        var s, iterator, r;
        s = this.jsset;
        for (var i=0; i < arguments.length; i++) {
            iterator = arguments[i][_$rapyd$_iterator_symbol]();
            r = iterator.next();
            while (!r.done) {
                s.add(r.value);
                r = iterator.next();
            }
        }
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function () {
        return "{" + list(this).join(", ") + "}";
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.toString = _$rapyd$_chain_assign_temp;
_$rapyd$_set.prototype.inspect = _$rapyd$_chain_assign_temp;
;
_$rapyd$_set.prototype.__eq__ = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var iterator, r;
        if (!(other instanceof this.constructor)) {
            return false;
        }
        if (other.size !== this.size) {
            return false;
        }
        if (other.size === 0) {
            return true;
        }
        iterator = other[_$rapyd$_iterator_symbol]();
        r = iterator.next();
        while (!r.done) {
            if (!this.has(r.value)) {
                return false;
            }
            r = iterator.next();
        }
        return true;
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
function _$rapyd$_set_wrap(x) {
    var ans;
    ans = new _$rapyd$_set;
    ans.jsset = x;
    return ans;
};

_$rapyd$_set_wrap.__argnames__ = ["x"];

var set = _$rapyd$_set, set_wrap = _$rapyd$_set_wrap;
var _$rapyd$_dict_implementation;
function _$rapyd$_dict_polyfill() {
    this._store = {};
    this.size = 0;
};

_$rapyd$_dict_polyfill.prototype.set = (function() {
    var _$rapyd$_anonfunc = function (x, value) {
        var key;
        key = _$rapyd$_set_keyfor(x);
        if (!Object.hasOwnProperty.call(this._store, key)) {
            this.size += 1;
        }
        this._store[key] = [x, value];
        return this;
    };

    _$rapyd$_anonfunc.__argnames__ = ["x", "value"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.clear = (function() {
    var _$rapyd$_anonfunc = function (x) {
        this._store = {};
        this.size = 0;
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.delete = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var key;
        key = _$rapyd$_set_keyfor(x);
        if (Object.hasOwnProperty.call(this._store, key)) {
            this.size -= 1;
            delete this._store[key];
            return true;
        }
        return false;
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.has = (function() {
    var _$rapyd$_anonfunc = function (x) {
        return Object.hasOwnProperty.call(this._store, _$rapyd$_set_keyfor(x));
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.get = (function() {
    var _$rapyd$_anonfunc = function (x) {
        try {
            return this._store[_$rapyd$_set_keyfor(x)][1];
        } catch (_$rapyd$_Exception) {
            if (_$rapyd$_Exception instanceof TypeError) {
                return undefined;
            } else {
                throw _$rapyd$_Exception;
            }
        }
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.values = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var keys, s;
        keys = Object.keys(this._store);
        s = this._store;
        return (function(){
            var _$rapyd$_d = {};
            _$rapyd$_d["_keys"] = keys;
            _$rapyd$_d["_i"] = -1;
            _$rapyd$_d["_s"] = s;
            _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
                var _$rapyd$_anonfunc = function () {
                    return this;
                };
                return _$rapyd$_anonfunc;
            })();
            _$rapyd$_d["next"] = (function() {
                var _$rapyd$_anonfunc = function () {
                    this._i += 1;
                    if (this._i >= this._keys.length) {
                        return {
                            "done": true
                        };
                    }
                    return {
                        "done": false,
                        "value": s[this._keys[this._i]][1]
                    };
                };
                return _$rapyd$_anonfunc;
            })();
            return _$rapyd$_d;
        })();
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.keys = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var keys, s;
        keys = Object.keys(this._store);
        s = this._store;
        return (function(){
            var _$rapyd$_d = {};
            _$rapyd$_d["_keys"] = keys;
            _$rapyd$_d["_i"] = -1;
            _$rapyd$_d["_s"] = s;
            _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
                var _$rapyd$_anonfunc = function () {
                    return this;
                };
                return _$rapyd$_anonfunc;
            })();
            _$rapyd$_d["next"] = (function() {
                var _$rapyd$_anonfunc = function () {
                    this._i += 1;
                    if (this._i >= this._keys.length) {
                        return {
                            "done": true
                        };
                    }
                    return {
                        "done": false,
                        "value": s[this._keys[this._i]][0]
                    };
                };
                return _$rapyd$_anonfunc;
            })();
            return _$rapyd$_d;
        })();
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.entries = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var keys, s;
        keys = Object.keys(this._store);
        s = this._store;
        return (function(){
            var _$rapyd$_d = {};
            _$rapyd$_d["_keys"] = keys;
            _$rapyd$_d["_i"] = -1;
            _$rapyd$_d["_s"] = s;
            _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
                var _$rapyd$_anonfunc = function () {
                    return this;
                };
                return _$rapyd$_anonfunc;
            })();
            _$rapyd$_d["next"] = (function() {
                var _$rapyd$_anonfunc = function () {
                    this._i += 1;
                    if (this._i >= this._keys.length) {
                        return {
                            "done": true
                        };
                    }
                    return {
                        "done": false,
                        "value": s[this._keys[this._i]]
                    };
                };
                return _$rapyd$_anonfunc;
            })();
            return _$rapyd$_d;
        })();
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
if (typeof Map !== "function" || typeof Map.prototype.delete !== "function") {
    _$rapyd$_dict_implementation = _$rapyd$_dict_polyfill;
} else {
    _$rapyd$_dict_implementation = Map;
}
function _$rapyd$_dict(iterable) {
    if (this instanceof _$rapyd$_dict) {
        this.jsmap = new _$rapyd$_dict_implementation;
        if (iterable !== undefined) {
            this.update(iterable);
        }
        return this;
    } else {
        return new _$rapyd$_dict(iterable);
    }
};

_$rapyd$_dict.__argnames__ = ["iterable"];

_$rapyd$_dict.prototype.__name__ = "dict";
Object.defineProperties(_$rapyd$_dict.prototype, {
    "length": {
        "get": (function() {
            var _$rapyd$_anonfunc = function () {
                return this.jsmap.size;
            };
            return _$rapyd$_anonfunc;
        })()
    },
    "size": {
        "get": (function() {
            var _$rapyd$_anonfunc = function () {
                return this.jsmap.size;
            };
            return _$rapyd$_anonfunc;
        })()
    }
});
_$rapyd$_dict.prototype.__len__ = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsmap.size;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function (x) {
        return this.jsmap.has(x);
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.has = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.__contains__ = _$rapyd$_chain_assign_temp;
;
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function (key, value) {
        this.jsmap.set(key, value);
    };

    _$rapyd$_anonfunc.__argnames__ = ["key", "value"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.set = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.__setitem__ = _$rapyd$_chain_assign_temp;
;
_$rapyd$_dict.prototype.clear = (function() {
    var _$rapyd$_anonfunc = function () {
        this.jsmap.clear();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.copy = (function() {
    var _$rapyd$_anonfunc = function () {
        return _$rapyd$_dict(this);
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.keys = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsmap.keys();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.values = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsmap.values();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsmap.entries();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.items = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.entries = _$rapyd$_chain_assign_temp;
;
_$rapyd$_dict.prototype[_$rapyd$_iterator_symbol] = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsmap.keys();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.__getitem__ = (function() {
    var _$rapyd$_anonfunc = function (key) {
        var ans;
        ans = this.jsmap.get(key);
        if (ans === undefined && !this.jsmap.has(key)) {
            throw new KeyError(key + "");
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["key"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.get = (function() {
    var _$rapyd$_anonfunc = function (key, defval) {
        var ans;
        ans = this.jsmap.get(key);
        if (ans === undefined && !this.jsmap.has(key)) {
            return (defval === undefined) ? null : defval;
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["key", "defval"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.set_default = (function() {
    var _$rapyd$_anonfunc = function (key, defval) {
        var j;
        j = this.jsmap;
        if (!j.has(key)) {
            j.set(key, defval);
            return defval;
        }
        return j.get(key);
    };

    _$rapyd$_anonfunc.__argnames__ = ["key", "defval"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function () {
        var iterable = ( 0 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true) ? undefined : arguments[0];
        var value = (arguments[1] === undefined || ( 1 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? _$rapyd$_anonfunc.__defaults__.value : arguments[1];
        var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
        if (_$rapyd$_kwargs_obj === null || typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [_$rapyd$_kwargs_symbol] !== true) _$rapyd$_kwargs_obj = {};
        if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "value")){
            value = _$rapyd$_kwargs_obj.value;
        }
        var ans, iterator, r;
        ans = _$rapyd$_dict();
        iterator = iter(iterable);
        r = iterator.next();
        while (!r.done) {
            ans.set(r.value, value);
            r = iterator.next();
        }
        return ans;
    };

    _$rapyd$_anonfunc.__defaults__ = {
        value:null
    };

    _$rapyd$_anonfunc.__handles_kwarg_interpolation__ = true;

    _$rapyd$_anonfunc.__argnames__ = ["iterable", "value"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.fromkeys = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.fromkeys = _$rapyd$_chain_assign_temp;
;
_$rapyd$_dict.prototype.pop = (function() {
    var _$rapyd$_anonfunc = function (key, defval) {
        var ans;
        ans = this.jsmap.get(key);
        if (ans === undefined && !this.jsmap.has(key)) {
            if (defval === undefined) {
                throw new KeyError(key);
            }
            return defval;
        }
        this.jsmap.delete(key);
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["key", "defval"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.popitem = (function() {
    var _$rapyd$_anonfunc = function () {
        var r;
        r = this.jsmap.entries().next();
        if (r.done) {
            throw new KeyError("dict is empty");
        }
        this.jsmap.delete(r.value[0]);
        return r.value;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.update = (function() {
    var _$rapyd$_anonfunc = function () {
        var m, iterable, iterator, result, keys;
        if (arguments.length === 0) {
            return;
        }
        m = this.jsmap;
        iterable = arguments[0];
        if (Array.isArray(iterable)) {
            for (var i = 0; i < iterable.length; i++) {
                m.set(iterable[i][0], iterable[i][1]);
            }
        } else if (iterable instanceof _$rapyd$_dict) {
            iterator = iterable.items();
            result = iterator.next();
            while (!result.done) {
                m.set(result.value[0], result.value[1]);
                result = iterator.next();
            }
        } else if (typeof Map === "function" && iterable instanceof Map) {
            iterator = iterable.entries();
            result = iterator.next();
            while (!result.done) {
                m.set(result.value[0], result.value[1]);
                result = iterator.next();
            }
        } else if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
            iterator = iterable[_$rapyd$_iterator_symbol]();
            result = iterator.next();
            while (!result.done) {
                m.set(result.value[0], result.value[1]);
                result = iterator.next();
            }
        } else {
            keys = Object.keys(iterable);
            for (var j=0; j < keys.length; j++) {
                if (keys[j] !== _$rapyd$_iterator_symbol) {
                    m.set(keys[j], iterable[keys[j]]);
                }
            }
        }
        if (arguments.length > 1) {
            _$rapyd$_dict.prototype.update.call(this, arguments[1]);
        }
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function () {
        var entries, iterator, r;
        entries = [];
        iterator = this.jsmap.entries();
        r = iterator.next();
        while (!r.done) {
            entries.push(r.value[0] + ": " + r.value[1]);
            r = iterator.next();
        }
        return "{" + entries.join(", ") + "}";
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.toString = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.inspect = _$rapyd$_chain_assign_temp;
;
_$rapyd$_dict.prototype.__eq__ = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var iterator, r, x;
        if (!(other instanceof this.constructor)) {
            return false;
        }
        if (other.size !== this.size) {
            return false;
        }
        if (other.size === 0) {
            return true;
        }
        iterator = other.items();
        r = iterator.next();
        while (!r.done) {
            x = this.jsmap.get(r.value[0]);
            if (x === undefined && !this.jsmap.has(r.value[0]) || x !== r.value[1]) {
                return false;
            }
            r = iterator.next();
        }
        return true;
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.as_object = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var ans, iterator, r;
        ans = {};
        iterator = this.jsmap.entries();
        r = iterator.next();
        while (!r.done) {
            ans[r.value[0]] = r.value[1];
            r = iterator.next();
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
function _$rapyd$_dict_wrap(x) {
    var ans;
    ans = new _$rapyd$_dict;
    ans.jsmap = x;
    return ans;
};

_$rapyd$_dict_wrap.__argnames__ = ["x"];

var dict = _$rapyd$_dict, dict_wrap = _$rapyd$_dict_wrap;;
    function _$rapyd$_bool(val) {
    return !!val;
};

_$rapyd$_bool.__argnames__ = ["val"];

function _$rapyd$_bind(fn, thisArg) {
    var ret;
    if (fn.orig) {
        fn = fn.orig;
    }
    if (thisArg === false) {
        return fn;
    }
    ret = (function() {
        var _$rapyd$_anonfunc = function () {
            return fn.apply(thisArg, arguments);
        };
        return _$rapyd$_anonfunc;
    })();
    ret.orig = fn;
    return ret;
};

_$rapyd$_bind.__argnames__ = ["fn", "thisArg"];

function _$rapyd$_rebind_all(thisArg, rebind) {
    if (typeof rebind === "undefined") {
        rebind = true;
    }
    for (var p in thisArg) {
        if (thisArg[p] && thisArg[p].orig) {
            if (rebind) {
                thisArg[p] = _$rapyd$_bind(thisArg[p], thisArg);
            } else {
                thisArg[p] = thisArg[p].orig;
            }
        }
    }
};

_$rapyd$_rebind_all.__argnames__ = ["thisArg", "rebind"];

function _$rapyd$_eslice(arr, step, start, end) {
    var isString;
    arr = arr.slice(0);
    if (typeof arr === "string" || arr instanceof String) {
        isString = true;
        arr = arr.split("");
    }
    if (step < 0) {
        step = -step;
        arr.reverse();
        if (typeof start !== "undefined") {
            start = arr.length - start - 1;
        }
        if (typeof end !== "undefined") {
            end = arr.length - end - 1;
        }
    }
    if (typeof start === "undefined") {
        start = 0;
    }
    if (typeof end === "undefined") {
        end = arr.length;
    }
    arr = arr.slice(start, end).filter((function() {
        var _$rapyd$_anonfunc = function (e, i) {
            return i % step === 0;
        };

        _$rapyd$_anonfunc.__argnames__ = ["e", "i"];
        return _$rapyd$_anonfunc;
    })());
    return (isString) ? arr.join("") : arr;
};

_$rapyd$_eslice.__argnames__ = ["arr", "step", "start", "end"];

function _$rapyd$_mixin(target, source, overwrite) {
    for (var i in source) {
        if (source.hasOwnProperty(i) && overwrite || typeof target[i] === "undefined") {
            target[i] = source[i];
        }
    }
};

_$rapyd$_mixin.__argnames__ = ["target", "source", "overwrite"];

function _$rapyd$_print() {
    var parts;
    if (typeof console === "object") {
        parts = [];
        for (var i = 0; i < arguments.length; i++) {
            parts.push(_$rapyd$_str(arguments[i]));
        }
        console.log(parts.join(" "));
    }
};

function _$rapyd$_int(val, base) {
    var ans;
    ans = parseInt(val, base || 10);
    if (isNaN(ans)) {
        throw new ValueError("Invalid literal for int with base " + (base || 10) + ": " + val);
    }
    return ans;
};

_$rapyd$_int.__argnames__ = ["val", "base"];

function _$rapyd$_float() {
    var ans;
    ans = parseFloat.apply(null, arguments);
    if (isNaN(ans)) {
        throw new ValueError("Could not convert string to float: " + arguments[0]);
    }
    return ans;
};

function _$rapyd$_arraylike_creator() {
    var names;
    names = "Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" ");
    if (typeof HTMLCollection === "function") {
        names = names.concat("HTMLCollection NodeList NamedNodeMap".split(" "));
    }
    return (function() {
        var _$rapyd$_anonfunc = function (x) {
            if (Array.isArray(x) || typeof x === "string" || names.indexOf(Object.prototype.toString.call(x).slice(8, -1)) > -1) {
                return true;
            }
            return false;
        };

        _$rapyd$_anonfunc.__argnames__ = ["x"];
        return _$rapyd$_anonfunc;
    })();
};

function options_object(f) {
    return (function() {
        var _$rapyd$_anonfunc = function () {
            if (typeof arguments[arguments.length - 1] === "object") {
                arguments[arguments.length - 1][_$rapyd$_kwargs_symbol] = true;
            }
            return f.apply(this, arguments);
        };
        return _$rapyd$_anonfunc;
    })();
};

options_object.__argnames__ = ["f"];

function _$rapyd$_id(x) {
    return x._$rapyd$_object_id;
};

_$rapyd$_id.__argnames__ = ["x"];

var bool = _$rapyd$_bool, bind = _$rapyd$_bind, rebind_all = _$rapyd$_rebind_all;
var float = _$rapyd$_float, int = _$rapyd$_int, arraylike = _$rapyd$_arraylike_creator(), _$rapyd$_arraylike = arraylike;
var mixin = _$rapyd$_mixin, print = _$rapyd$_print, eslice = _$rapyd$_eslice, id = _$rapyd$_id;;
    function _$rapyd$_repr_js_builtin(x, as_array) {
    var ans, b, keys, key;
    ans = [];
    b = "{}";
    if (as_array) {
        b = "[]";
        for (var i = 0; i < x.length; i++) {
            ans.push(_$rapyd$_repr(x[i]));
        }
    } else {
        keys = Object.keys(x);
        for (var k = 0; k < keys.length; k++) {
            key = keys[k];
            ans.push(JSON.stringify(key) + ":" + _$rapyd$_repr(x[key]));
        }
    }
    return b[0] + ans.join(", ") + b[1];
};

_$rapyd$_repr_js_builtin.__argnames__ = ["x", "as_array"];

function _$rapyd$_repr(x) {
    var ans, name;
    if (x === null) {
        return "None";
    }
    if (x === undefined) {
        return "undefined";
    }
    ans = x;
    if (typeof x.__repr__ === "function") {
        ans = x.__repr__();
    } else if (x === true || x === false) {
        ans = (x) ? "True" : "False";
    } else if (Array.isArray(x)) {
        ans = _$rapyd$_repr_js_builtin(x, true);
    } else if (typeof x === "function") {
        ans = x.toString();
    } else {
        name = Object.prototype.toString.call(x).slice(8, -1);
        if (_$rapyd$_not_equals("Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".indexOf(name), -1)) {
            return name + "([" + x.map((function() {
                var _$rapyd$_anonfunc = function (i) {
                    return str.format("0x{:02x}", i);
                };

                _$rapyd$_anonfunc.__argnames__ = ["i"];
                return _$rapyd$_anonfunc;
            })()).join(", ") + "])";
        }
        ans = (typeof x.toString === "function") ? x.toString() : x;
        if (ans === "[object Object]") {
            return _$rapyd$_repr_js_builtin(x);
        }
        try {
            ans = JSON.stringify(x);
        } catch (_$rapyd$_Exception) {
        }
    }
    return ans + "";
};

_$rapyd$_repr.__argnames__ = ["x"];

function _$rapyd$_str(x) {
    var ans, name;
    if (x === null) {
        return "None";
    }
    if (x === undefined) {
        return "undefined";
    }
    ans = x;
    if (typeof x.__str__ === "function") {
        ans = x.__str__();
    } else if (typeof x.__repr__ === "function") {
        ans = x.__repr__();
    } else if (x === true || x === false) {
        ans = (x) ? "True" : "False";
    } else if (Array.isArray(x)) {
        ans = _$rapyd$_repr_js_builtin(x, true);
    } else if (typeof x.toString === "function") {
        name = Object.prototype.toString.call(x).slice(8, -1);
        if (_$rapyd$_not_equals("Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".indexOf(name), -1)) {
            return name + "([" + x.map((function() {
                var _$rapyd$_anonfunc = function (i) {
                    return str.format("0x{:02x}", i);
                };

                _$rapyd$_anonfunc.__argnames__ = ["i"];
                return _$rapyd$_anonfunc;
            })()).join(", ") + "])";
        }
        ans = x.toString();
        if (ans === "[object Object]") {
            ans = _$rapyd$_repr_js_builtin(x);
        }
    }
    return ans + "";
};

_$rapyd$_str.__argnames__ = ["x"];

_$rapyd$_str.format = (function() {
    var _$rapyd$_anonfunc = function () {
        var template, args, kwargs, explicit, implicit, _$rapyd$_chain_assign_temp, idx, ans, pos, in_brace, markup, ch;
        template = arguments[0];
        if (template === undefined) {
            throw new TypeError("Template is required");
        }
        args = Array.prototype.slice.call(arguments, 1);
        kwargs = {};
        if (args.length && args[args.length-1][_$rapyd$_kwargs_symbol] !== undefined) {
            kwargs = args[args.length-1];
            args = args.slice(0, -1);
        }
        _$rapyd$_chain_assign_temp = false;
        explicit = _$rapyd$_chain_assign_temp;
        implicit = _$rapyd$_chain_assign_temp;
;
        idx = 0;
        if (_$rapyd$_str.format._template_resolve_pat === undefined) {
            _$rapyd$_str.format._template_resolve_pat = /[.\[]/;
        }
        function resolve(arg, object) {
            var _$rapyd$_unpack, first, key, rest, ans;
            if (!arg) {
                return object;
            }
            _$rapyd$_unpack = [arg[0], arg.slice(1)];
            first = _$rapyd$_unpack[0];
            arg = _$rapyd$_unpack[1];
            key = arg.split(_$rapyd$_str.format._template_resolve_pat, 1)[0];
            rest = arg.slice(key.length);
            ans = (first === "[") ? object[key.slice(0, -1)] : getattr(object, key);
            if (ans === undefined) {
                throw new KeyError((first === "[") ? key.slice(0, -1) : key);
            }
            return resolve(rest, ans);
        };

        resolve.__argnames__ = ["arg", "object"];

        function resolve_format_spec(format_spec) {
            if (_$rapyd$_str.format._template_resolve_fs_pat === undefined) {
                _$rapyd$_str.format._template_resolve_fs_pat = /[{]([a-zA-Z0-9_]+)[}]/g;
            }
            return format_spec.replace(_$rapyd$_str.format._template_resolve_fs_pat, (function() {
                var _$rapyd$_anonfunc = function (match, key) {
                    if (!Object.prototype.hasOwnProperty.call(kwargs, key)) {
                        return "";
                    }
                    return "" + kwargs[key];
                };

                _$rapyd$_anonfunc.__argnames__ = ["match", "key"];
                return _$rapyd$_anonfunc;
            })());
        };

        resolve_format_spec.__argnames__ = ["format_spec"];

        function apply_formatting(value, format_spec) {
            var _$rapyd$_unpack, fill, align, sign, fhash, zeropad, width, comma, precision, ftype, is_numeric, is_int, lftype, code, exp, nval, is_positive, left, right;
            if (format_spec.indexOf("{") !== -1) {
                format_spec = resolve_format_spec(format_spec);
            }
            if (_$rapyd$_str.format._template_format_pat === undefined) {
                _$rapyd$_str.format._template_format_pat = /([^{}](?=[<>=^]))?([<>=^])?([-+\x20])?(\#)?(0)?(\d+)?(,)?(?:\.(\d+))?([bcdeEfFgGnosxX%])?/;
            }
            try {
                _$rapyd$_unpack = format_spec.match(_$rapyd$_str.format._template_format_pat).slice(1);
                fill = _$rapyd$_unpack[0];
                align = _$rapyd$_unpack[1];
                sign = _$rapyd$_unpack[2];
                fhash = _$rapyd$_unpack[3];
                zeropad = _$rapyd$_unpack[4];
                width = _$rapyd$_unpack[5];
                comma = _$rapyd$_unpack[6];
                precision = _$rapyd$_unpack[7];
                ftype = _$rapyd$_unpack[8];
            } catch (_$rapyd$_Exception) {
                if (_$rapyd$_Exception instanceof TypeError) {
                    return value;
                } else {
                    throw _$rapyd$_Exception;
                }
            }
            if (zeropad) {
                fill = fill || "0";
                align = align || "=";
            } else {
                fill = fill || " ";
                align = align || ">";
            }
            is_numeric = Number(value) === value;
            is_int = is_numeric && value % 1 === 0;
            precision = parseInt(precision, 10);
            lftype = (ftype || "").toLowerCase();
            if (ftype === "n") {
                is_numeric = true;
                if (is_int) {
                    if (comma) {
                        throw new ValueError("Cannot specify ',' with 'n'");
                    }
                    value = parseInt(value, 10).toLocaleString();
                } else {
                    value = parseFloat(value).toLocaleString();
                }
            } else if (['b', 'c', 'd', 'o', 'x'].indexOf(lftype) !== -1) {
                value = parseInt(value, 10);
                is_numeric = true;
                if (!isNaN(value)) {
                    if (ftype === "b") {
                        value = (value >>> 0).toString(2);
                        if (fhash) {
                            value = "0b" + value;
                        }
                    } else if (ftype === "c") {
                        if (value > 65535) {
                            code = value - 65536;
                            value = String.fromCharCode(55296 + (code >> 10), 56320 + (code & 1023));
                        } else {
                            value = String.fromCharCode(value);
                        }
                    } else if (ftype === "d") {
                        if (comma) {
                            value = value.toLocaleString("en-US");
                        } else {
                            value = value.toString(10);
                        }
                    } else if (ftype === "o") {
                        value = value.toString(8);
                        if (fhash) {
                            value = "0o" + value;
                        }
                    } else if (lftype === "x") {
                        value = value.toString(16);
                        value = (ftype === "x") ? value.toLowerCase() : value.toUpperCase();
                        if (fhash) {
                            value = "0x" + value;
                        }
                    }
                }
            } else if (['e','f','g','%'].indexOf(lftype) !== -1) {
                is_numeric = true;
                value = parseFloat(value);
                if (lftype === "e") {
                    value = value.toExponential((isNaN(precision)) ? 6 : precision);
                    value = (ftype === "E") ? value.toUpperCase() : value.toLowerCase();
                } else if (lftype === "f") {
                    value = value.toFixed((isNaN(precision)) ? 6 : precision);
                    value = (ftype === "F") ? value.toUpperCase() : value.toLowerCase();
                } else if (ftype === "%") {
                    value *= 100;
                    value = value.toFixed((isNaN(precision)) ? 6 : precision) + "%";
                } else if (lftype === "g") {
                    if (isNaN(precision)) {
                        precision = 6;
                    }
                    precision = max(1, precision);
                    exp = parseInt(value.toExponential(precision - 1).toLowerCase().split("e")[1], 10);
                    if (-4 <= exp && exp < precision) {
                        value = value.toFixed(precision - 1 - exp);
                    } else {
                        value = value.toExponential(precision - 1);
                    }
                    value = value.replace(/0+$/g, "");
                    if (value[value.length-1] === ".") {
                        value = value.slice(0, -1);
                    }
                    if (ftype === "G") {
                        value = value.toUpperCase();
                    }
                }
            } else {
                value += "";
                if (!isNaN(precision)) {
                    value = value.slice(0, precision);
                }
            }
            value += "";
            if (is_numeric && sign) {
                nval = Number(value);
                is_positive = !isNaN(nval) && nval >= 0;
                if (is_positive && (sign === " " || sign === "+")) {
                    value = sign + value;
                }
            }
            function repeat(char, num) {
                return (new Array(num+1)).join(char);
            };

            repeat.__argnames__ = ["char", "num"];

            if (is_numeric && width && width[0] === "0") {
                width = width.slice(1);
                _$rapyd$_unpack = ["0", "="];
                fill = _$rapyd$_unpack[0];
                align = _$rapyd$_unpack[1];
            }
            width = parseInt(width || "-1", 10);
            if (isNaN(width)) {
                throw new ValueError("Invalid width specification: " + width);
            }
            if (fill && value.length < width) {
                if (align === "<") {
                    value = value + repeat(fill, width - value.length);
                } else if (align === ">") {
                    value = repeat(fill, width - value.length) + value;
                } else if (align === "^") {
                    left = Math.floor((width - value.length) / 2);
                    right = width - left - value.length;
                    value = repeat(fill, left) + value + repeat(fill, right);
                } else if (align === "=") {
                    if (_$rapyd$_in(value[0], "+- ")) {
                        value = value[0] + repeat(fill, width - value.length) + value.slice(1);
                    } else {
                        value = repeat(fill, width - value.length) + value;
                    }
                } else {
                    throw new ValueError("Unrecognized alignment: " + align);
                }
            }
            return value;
        };

        apply_formatting.__argnames__ = ["value", "format_spec"];

        function parse_markup(markup) {
            var key, transformer, format_spec, _$rapyd$_chain_assign_temp, pos, state, ch;
            _$rapyd$_chain_assign_temp = "";
            key = _$rapyd$_chain_assign_temp;
            transformer = _$rapyd$_chain_assign_temp;
            format_spec = _$rapyd$_chain_assign_temp;
;
            pos = 0;
            state = 0;
            while (pos < markup.length) {
                ch = markup[pos];
                if (state === 0) {
                    if (ch === "!") {
                        state = 1;
                    } else if (ch === ":") {
                        state = 2;
                    } else {
                        key += ch;
                    }
                } else if (state === 1) {
                    if (ch === ":") {
                        state = 2;
                    } else {
                        transformer += ch;
                    }
                } else {
                    format_spec += ch;
                }
                pos += 1;
            }
            return [key, transformer, format_spec];
        };

        parse_markup.__argnames__ = ["markup"];

        function render_markup(markup) {
            var _$rapyd$_unpack, key, transformer, format_spec, lkey, nvalue, object, ans;
            _$rapyd$_unpack = parse_markup(markup);
            key = _$rapyd$_unpack[0];
            transformer = _$rapyd$_unpack[1];
            format_spec = _$rapyd$_unpack[2];
            if (transformer && ['a', 'r', 's'].indexOf(transformer) === -1) {
                throw new ValueError("Unknown conversion specifier: " + transformer);
            }
            lkey = key.length && key.split(/[.\[]/, 1)[0];
            if (lkey) {
                explicit = true;
                if (implicit) {
                    throw new ValueError("cannot switch from automatic field numbering to manual field specification");
                }
                nvalue = parseInt(lkey);
                object = (isNaN(nvalue)) ? kwargs[lkey] : args[nvalue];
                if (object === undefined) {
                    if (isNaN(nvalue)) {
                        throw new KeyError(lkey);
                    }
                    throw new IndexError(lkey);
                }
                object = resolve(key.slice(lkey.length), object);
            } else {
                implicit = true;
                if (explicit) {
                    throw new ValueError("cannot switch from manual field specification to automatic field numbering");
                }
                if (idx >= args.length) {
                    throw new IndexError("Not enough arguments to match template: " + template);
                }
                object = args[idx];
                idx += 1;
            }
            if (typeof object === "function") {
                object = object();
            }
            ans = "" + object;
            if (format_spec) {
                ans = apply_formatting(ans, format_spec);
            }
            return ans;
        };

        render_markup.__argnames__ = ["markup"];

        ans = "";
        pos = 0;
        in_brace = 0;
        markup = "";
        while (pos < template.length) {
            ch = template[pos];
            if (in_brace) {
                if (ch === "{") {
                    in_brace += 1;
                    markup += "{";
                } else if (ch === "}") {
                    in_brace -= 1;
                    if (in_brace > 0) {
                        markup += "}";
                    } else {
                        ans += render_markup(markup);
                    }
                } else {
                    markup += ch;
                }
            } else {
                if (ch === "{") {
                    if (template[pos + 1] === "{") {
                        pos += 1;
                        ans += "{";
                    } else {
                        in_brace = 1;
                        markup = "";
                    }
                } else {
                    ans += ch;
                }
            }
            pos += 1;
        }
        if (in_brace) {
            throw new ValueError("expected '}' before end of string");
        }
        return ans;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.capitalize = (function() {
    var _$rapyd$_anonfunc = function (string) {
        if (string) {
            string = string[0].toUpperCase() + string.slice(1).toLowerCase();
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.center = (function() {
    var _$rapyd$_anonfunc = function (string, width, fill) {
        var left, right;
        left = Math.floor((width - string.length) / 2);
        right = width - left - string.length;
        fill = fill || " ";
        return new Array(left+1).join(fill) + string + new Array(right+1).join(fill);
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "width", "fill"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.count = (function() {
    var _$rapyd$_anonfunc = function (string, needle, start, end) {
        var _$rapyd$_unpack, pos, step, ans;
        start = start || 0;
        end = end || string.length;
        if (start < 0 || end < 0) {
            string = string.slice(start, end);
            _$rapyd$_unpack = [0, string.length];
            start = _$rapyd$_unpack[0];
            end = _$rapyd$_unpack[1];
        }
        pos = start;
        step = needle.length;
        ans = 0;
        while (pos !== -1) {
            pos = string.indexOf(needle, pos);
            if (pos !== -1) {
                ans += 1;
                pos += step;
            }
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "needle", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.endswith = (function() {
    var _$rapyd$_anonfunc = function (string, suffixes, start, end) {
        var q;
        start = start || 0;
        if (typeof suffixes === "string") {
            suffixes = [suffixes];
        }
        if (end !== undefined) {
            string = string.slice(0, end);
        }
        for (var i = 0; i < suffixes.length; i++) {
            q = suffixes[i];
            if (string.indexOf(q, Math.max(start, string.length - q.length)) !== -1) {
                return true;
            }
        }
        return false;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "suffixes", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.startswith = (function() {
    var _$rapyd$_anonfunc = function (string, prefixes, start, end) {
        var prefix;
        start = start || 0;
        if (typeof prefixes === "string") {
            prefixes = [prefixes];
        }
        for (var i = 0; i < prefixes.length; i++) {
            prefix = prefixes[i];
            end = (end === undefined) ? string.length : end;
            if (end - start >= prefix.length && prefix === string.slice(start, start + prefix.length)) {
                return true;
            }
        }
        return false;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "prefixes", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.find = (function() {
    var _$rapyd$_anonfunc = function (string, needle, start, end) {
        var ans;
        while (start < 0) {
            start += string.length;
        }
        ans = string.indexOf(needle, start);
        if (end !== undefined && ans !== -1) {
            while (end < 0) {
                end += string.length;
            }
            if (ans >= end - needle.length) {
                return -1;
            }
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "needle", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.rfind = (function() {
    var _$rapyd$_anonfunc = function (string, needle, start, end) {
        var ans;
        while (end < 0) {
            end += string.length;
        }
        ans = string.lastIndexOf(needle, end - 1);
        if (start !== undefined && ans !== -1) {
            while (start < 0) {
                start += string.length;
            }
            if (ans < start) {
                return -1;
            }
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "needle", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.index = (function() {
    var _$rapyd$_anonfunc = function (string, needle, start, end) {
        var ans;
        ans = _$rapyd$_str.find.apply(null, arguments);
        if (ans === -1) {
            throw new ValueError("substring not found");
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "needle", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.rindex = (function() {
    var _$rapyd$_anonfunc = function (string, needle, start, end) {
        var ans;
        ans = _$rapyd$_str.rfind.apply(null, arguments);
        if (ans === -1) {
            throw new ValueError("substring not found");
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "needle", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.islower = (function() {
    var _$rapyd$_anonfunc = function (string) {
        return string.length > 0 && string.toUpperCase() !== string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.isupper = (function() {
    var _$rapyd$_anonfunc = function (string) {
        return string.length > 0 && string.toLowerCase() !== string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.isspace = (function() {
    var _$rapyd$_anonfunc = function (string) {
        return string.length > 0 && /^\s+$/.test(string);
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.join = (function() {
    var _$rapyd$_anonfunc = function (string, iterable) {
        var ans, r;
        if (Array.isArray(iterable)) {
            return iterable.join(string);
        }
        ans = "";
        r = iterable.next();
        while (!r.done) {
            if (ans) {
                ans += string;
            }
            ans += r.value;
            r = iterable.next();
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "iterable"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.ljust = (function() {
    var _$rapyd$_anonfunc = function (string, width, fill) {
        if (width > string.length) {
            fill = fill || " ";
            string += new Array(width - string.length + 1).join(fill);
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "width", "fill"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.rjust = (function() {
    var _$rapyd$_anonfunc = function (string, width, fill) {
        if (width > string.length) {
            fill = fill || " ";
            string = new Array(width - string.length + 1).join(fill) + string;
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "width", "fill"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.lower = (function() {
    var _$rapyd$_anonfunc = function (string) {
        return string.toLowerCase();
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.upper = (function() {
    var _$rapyd$_anonfunc = function (string) {
        return string.toUpperCase();
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.lstrip = (function() {
    var _$rapyd$_anonfunc = function (string, chars) {
        var pos;
        pos = 0;
        chars = chars || _$rapyd$_str.whitespace;
        while (chars.indexOf(string[pos]) !== -1) {
            pos += 1;
        }
        if (pos) {
            string = string.slice(pos);
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "chars"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.rstrip = (function() {
    var _$rapyd$_anonfunc = function (string, chars) {
        var pos;
        pos = string.length - 1;
        chars = chars || _$rapyd$_str.whitespace;
        while (chars.indexOf(string[pos]) !== -1) {
            pos -= 1;
        }
        if (pos < string.length - 1) {
            string = string.slice(0, pos + 1);
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "chars"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.strip = (function() {
    var _$rapyd$_anonfunc = function (string, chars) {
        return _$rapyd$_str.lstrip(_$rapyd$_str.rstrip(string, chars), chars);
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "chars"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.partition = (function() {
    var _$rapyd$_anonfunc = function (string, sep) {
        var idx;
        idx = string.indexOf(sep);
        if (idx === -1) {
            return [string, "", ""];
        }
        return [string.slice(0, idx), sep, string.slice(idx + sep.length)];
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "sep"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.rpartition = (function() {
    var _$rapyd$_anonfunc = function (string, sep) {
        var idx;
        idx = string.lastIndexOf(sep);
        if (idx === -1) {
            return ["", "", string];
        }
        return [string.slice(0, idx), sep, string.slice(idx + sep.length)];
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "sep"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.replace = (function() {
    var _$rapyd$_anonfunc = function (string, old, repl, count) {
        var pos, idx;
        if (count === 1) {
            return string.replace(old, repl);
        }
        if (count < 1) {
            return string;
        }
        count = count || Number.MAX_VALUE;
        pos = 0;
        while (count > 0) {
            count -= 1;
            idx = string.indexOf(old, pos);
            if (idx === -1) {
                break;
            }
            pos = idx + repl.length;
            string = string.slice(0, idx) + repl + string.slice(idx + old.length);
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "old", "repl", "count"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.split = (function() {
    var _$rapyd$_anonfunc = function (string, sep, maxsplit) {
        var ans, extra, parts;
        if (maxsplit === 0) {
            return _$rapyd$_list_decorate([ string ]);
        }
        if (sep === undefined || sep === null) {
            if (maxsplit > 0) {
                ans = string.split(/(\s+)/);
                extra = "";
                parts = [];
                for (var i = 0; i < ans.length; i++) {
                    if (parts.length >= maxsplit + 1) {
                        extra += ans[i];
                    } else if (i % 2 === 0) {
                        parts.push(ans[i]);
                    }
                }
                parts[parts.length-1] += extra;
                ans = parts;
            } else {
                ans = string.split(/\s+/);
            }
        } else {
            if (sep === "") {
                throw new ValueError("empty separator");
            }
            ans = string.split(sep);
            if (maxsplit > 0 && ans.length > maxsplit) {
                extra = ans.slice(maxsplit).join(sep);
                ans = ans.slice(0, maxsplit);
                ans.push(extra);
            }
        }
        return _$rapyd$_list_decorate(ans);
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "sep", "maxsplit"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.rsplit = (function() {
    var _$rapyd$_anonfunc = function (string, sep, maxsplit) {
        var ans, is_space, pos, current, spc, ch, end, _$rapyd$_chain_assign_temp, idx;
        if (!maxsplit) {
            return _$rapyd$_str.split.call(null, string, sep, maxsplit);
        }
        if (sep === undefined || sep === null) {
            if (maxsplit > 0) {
                ans = [];
                is_space = /\s/;
                pos = string.length - 1;
                current = "";
                while (pos > -1 && maxsplit > 0) {
                    spc = false;
                    ch = string[pos];
                    while (pos > -1 && is_space.test(ch)) {
                        spc = true;
                        ch = string[--pos];
                    }
                    if (spc) {
                        if (current) {
                            ans.push(current);
                            maxsplit -= 1;
                        }
                        current = ch;
                    } else {
                        current += ch;
                    }
                    pos -= 1;
                }
                ans.push(string.slice(0, pos + 1) + current);
                ans.reverse();
            } else {
                ans = string.split(/\s+/);
            }
        } else {
            if (sep === "") {
                throw new ValueError("empty separator");
            }
            ans = [];
            _$rapyd$_chain_assign_temp = string.length;
            pos = _$rapyd$_chain_assign_temp;
            end = _$rapyd$_chain_assign_temp;
;
            while (pos > -1 && maxsplit > 0) {
                maxsplit -= 1;
                idx = string.lastIndexOf(sep, pos);
                if (idx === -1) {
                    break;
                }
                ans.push(string.slice(idx + sep.length, end));
                pos = idx - 1;
                end = idx;
            }
            ans.push(string.slice(0, end));
            ans.reverse();
        }
        return _$rapyd$_list_decorate(ans);
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "sep", "maxsplit"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.splitlines = (function() {
    var _$rapyd$_anonfunc = function (string, keepends) {
        var parts, ans;
        if (keepends) {
            parts = string.split(/((?:\r?\n)|\r)/);
            ans = [];
            for (var i = 0; i < parts.length; i++) {
                if (i % 2 === 0) {
                    ans.push(parts[i]);
                } else {
                    ans[ans.length-1] += parts[i];
                }
            }
        } else {
            ans = string.split(/(?:\r?\n)|\r/);
        }
        return _$rapyd$_list_decorate(ans);
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "keepends"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.swapcase = (function() {
    var _$rapyd$_anonfunc = function (string) {
        var ans, a, b;
        ans = new Array(string.length);
        for (var i = 0; i < ans.length; i++) {
            a = string[i];
            b = a.toLowerCase();
            if (a === b) {
                b = a.toUpperCase();
            }
            ans[i] = b;
        }
        return ans.join("");
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.zfill = (function() {
    var _$rapyd$_anonfunc = function (string, width) {
        if (width > string.length) {
            string = new Array(width - string.length + 1).join("0") + string;
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "width"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.uchrs = (function() {
    var _$rapyd$_anonfunc = function (string, with_positions) {
        return (function(){
            var _$rapyd$_d = {};
            _$rapyd$_d["_string"] = string;
            _$rapyd$_d["_pos"] = 0;
            _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
                var _$rapyd$_anonfunc = function () {
                    return this;
                };
                return _$rapyd$_anonfunc;
            })();
            _$rapyd$_d["next"] = (function() {
                var _$rapyd$_anonfunc = function () {
                    var length, pos, value, ans, extra;
                    length = this._string.length;
                    if (this._pos >= length) {
                        return {
                            "done": true
                        };
                    }
                    pos = this._pos;
                    value = this._string.charCodeAt(this._pos++);
                    ans = "\ufffd";
                    if (55296 <= value && value <= 56319) {
                        if (this._pos < length) {
                            extra = this._string.charCodeAt(this._pos++);
                            if ((extra & 56320) === 56320) {
                                ans = String.fromCharCode(value, extra);
                            }
                        }
                    } else if ((value & 56320) !== 56320) {
                        ans = String.fromCharCode(value);
                    }
                    if (with_positions) {
                        return {
                            "done": false,
                            "value": _$rapyd$_list_decorate([ pos, ans ])
                        };
                    } else {
                        return {
                            "done": false,
                            "value": ans
                        };
                    }
                };
                return _$rapyd$_anonfunc;
            })();
            return _$rapyd$_d;
        })();
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "with_positions"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.uslice = (function() {
    var _$rapyd$_anonfunc = function (string, start, end) {
        var items, iterator, r;
        items = [];
        iterator = _$rapyd$_str.uchrs(string);
        r = iterator.next();
        while (!r.done) {
            items.push(r.value);
            r = iterator.next();
        }
        return items.slice(start || 0, (end === undefined) ? items.length : end).join("");
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.ulen = (function() {
    var _$rapyd$_anonfunc = function (string) {
        var iterator, r, ans;
        iterator = _$rapyd$_str.uchrs(string);
        r = iterator.next();
        ans = 0;
        while (!r.done) {
            r = iterator.next();
            ans += 1;
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.ascii_lowercase = "abcdefghijklmnopqrstuvwxyz";
_$rapyd$_str.ascii_uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
_$rapyd$_str.ascii_letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
_$rapyd$_str.digits = "0123456789";
_$rapyd$_str.punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
_$rapyd$_str.printable = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\u000b\f";
_$rapyd$_str.whitespace = " \t\n\r\u000b\f";
var str = _$rapyd$_str, repr = _$rapyd$_repr;;
    var min = (function min() {
            return Math.min;
        })();
    var max = (function max() {
            return Math.max;
        })();
    function iter(iterable) {
            var ans;
            if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
                return (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
            }
            if (_$rapyd$_arraylike(iterable)) {
                ans = {
                    "_i": -1,
                    "next": (function() {
                        var _$rapyd$_anonfunc = function () {
                            this._i += 1;
                            if (this._i < iterable.length) {
                                return {
                                    "done": false,
                                    "value": iterable[this._i]
                                };
                            }
                            return {
                                "done": true
                            };
                        };
                        return _$rapyd$_anonfunc;
                    })()
                };
                ans[_$rapyd$_iterator_symbol] = (function() {
                    var _$rapyd$_anonfunc = function () {
                        return this;
                    };
                    return _$rapyd$_anonfunc;
                })();
                return ans;
            }
            return iter(Object.keys(iterable));
        };
    function getattr(obj, name, defval) {
            var ret;
            try {
                ret = obj[name];
            } catch (_$rapyd$_Exception) {
                if (_$rapyd$_Exception instanceof TypeError) {
                    if (defval === undefined) {
                        throw new AttributeError("The attribute " + name + " is not present");
                    }
                    return defval;
                } else {
                    throw _$rapyd$_Exception;
                }
            }
            if (ret === undefined && !(name in obj)) {
                if (defval === undefined) {
                    throw new AttributeError("The attribute " + name + " is not present");
                }
                ret = defval;
            }
            return ret;
        };
    var _$rapyd$_modules = {};
    _$rapyd$_modules.utils = {};
    _$rapyd$_modules.errors = {};
    _$rapyd$_modules.unicode_aliases = {};
    _$rapyd$_modules.ast = {};
    _$rapyd$_modules.tokenizer = {};
    _$rapyd$_modules.parse = {};
    _$rapyd$_modules.output = {};
    _$rapyd$_modules["output.stream"] = {};
    _$rapyd$_modules["output.statements"] = {};
    _$rapyd$_modules["output.exceptions"] = {};
    _$rapyd$_modules["output.functions"] = {};
    _$rapyd$_modules["output.classes"] = {};
    _$rapyd$_modules["output.literals"] = {};
    _$rapyd$_modules["output.loops"] = {};
    _$rapyd$_modules["output.modules"] = {};
    _$rapyd$_modules["output.operators"] = {};
    _$rapyd$_modules["output.utils"] = {};
    _$rapyd$_modules["output.codegen"] = {};

    (function(){
        var __name__ = "utils";
        var MAP;
        function array_to_hash(a) {
            var ret, i;
            ret = Object.create(null);
            for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < len(a); _$rapyd$_Index0++) {
                i = _$rapyd$_Index0;
                ret[a[i]] = true;
            }
            return ret;
        };

        array_to_hash.__argnames__ = ["a"];

        function slice(a, start) {
            return Array.prototype.slice.call(a, start || 0);
        };

        slice.__argnames__ = ["a", "start"];

        function characters(str_) {
            return str_.split("");
        };

        characters.__argnames__ = ["str_"];

        function member(name, array) {
            var i;
            for (var _$rapyd$_Index1 = array.length - 1; _$rapyd$_Index1 > -1; _$rapyd$_Index1-=1) {
                i = _$rapyd$_Index1;
                if (array[i] === name) {
                    return true;
                }
            }
            return false;
        };

        member.__argnames__ = ["name", "array"];

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
        };

        repeat_string.__argnames__ = ["str_", "i"];

        function DefaultsError(msg, defs) {
            this.msg = msg;
            this.defs = defs;
        };

        DefaultsError.__argnames__ = ["msg", "defs"];

        function defaults(args, defs, croak) {
            var ret, i;
            if (args === true) {
                args = {};
            }
            ret = args || {};
            if (croak) {
                var _$rapyd$_Iter2 = _$rapyd$_Iterable(ret);
                for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
                    i = _$rapyd$_Iter2[_$rapyd$_Index2];
                    if (!defs.hasOwnProperty(i)) {
                        throw new DefaultsError("`" + i + "` is not a supported option", defs);
                    }
                }
            }
            var _$rapyd$_Iter3 = _$rapyd$_Iterable(defs);
            for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
                i = _$rapyd$_Iter3[_$rapyd$_Index3];
                ret[i] = (args && args.hasOwnProperty(i)) ? args[i] : defs[i];
            }
            return ret;
        };

        defaults.__argnames__ = ["args", "defs", "croak"];

        function merge(obj, ext) {
            var i;
            var _$rapyd$_Iter4 = _$rapyd$_Iterable(ext);
            for (var _$rapyd$_Index4 = 0; _$rapyd$_Index4 < _$rapyd$_Iter4.length; _$rapyd$_Index4++) {
                i = _$rapyd$_Iter4[_$rapyd$_Index4];
                obj[i] = ext[i];
            }
            return obj;
        };

        merge.__argnames__ = ["obj", "ext"];

        function noop() {
        };

        MAP = (function() {
            var _$rapyd$_anonfunc = function () {
                var skip, _$rapyd$_chain_assign_temp;
                function MAP(a, f, backwards) {
                    var ret, top, i;
                    ret = _$rapyd$_list_decorate([]);
                    top = _$rapyd$_list_decorate([]);
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
                                top.push.apply(top, (backwards) ? val.v.slice().reverse() : val.v);
                            } else {
                                top.push(val);
                            }
                        } else if (val !== skip) {
                            if (val instanceof Splice) {
                                ret.push.apply(ret, (backwards) ? val.v.slice().reverse() : val.v);
                            } else {
                                ret.push(val);
                            }
                        }
                        return is_last;
                    };

                    if (Array.isArray(a)) {
                        if (backwards) {
                            for (var _$rapyd$_Index5 = a.length - 1; _$rapyd$_Index5 > -1; _$rapyd$_Index5-=1) {
                                i = _$rapyd$_Index5;
                                if (doit()) {
                                    break;
                                }
                            }
                            ret.reverse();
                            top.reverse();
                        } else {
                            for (var _$rapyd$_Index6 = 0; _$rapyd$_Index6 < len(a); _$rapyd$_Index6++) {
                                i = _$rapyd$_Index6;
                                if (doit()) {
                                    break;
                                }
                            }
                        }
                    } else {
                        var _$rapyd$_Iter7 = _$rapyd$_Iterable(a);
                        for (var _$rapyd$_Index7 = 0; _$rapyd$_Index7 < _$rapyd$_Iter7.length; _$rapyd$_Index7++) {
                            i = _$rapyd$_Iter7[_$rapyd$_Index7];
                            if (doit()) {
                                break;
                            }
                        }
                    }
                    return top.concat(ret);
                };

                MAP.__argnames__ = ["a", "f", "backwards"];

                MAP.at_top = (function() {
                    var _$rapyd$_anonfunc = function (val) {
                        return new AtTop(val);
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["val"];
                    return _$rapyd$_anonfunc;
                })();
                MAP.splice = (function() {
                    var _$rapyd$_anonfunc = function (val) {
                        return new Splice(val);
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["val"];
                    return _$rapyd$_anonfunc;
                })();
                MAP.last = (function() {
                    var _$rapyd$_anonfunc = function (val) {
                        return new Last(val);
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["val"];
                    return _$rapyd$_anonfunc;
                })();
                _$rapyd$_chain_assign_temp = {};
                skip = _$rapyd$_chain_assign_temp;
                MAP.skip = _$rapyd$_chain_assign_temp;
;
                function AtTop(val) {
                    this.v = val;
                };

                AtTop.__argnames__ = ["val"];

                function Splice(val) {
                    this.v = val;
                };

                Splice.__argnames__ = ["val"];

                function Last(val) {
                    this.v = val;
                };

                Last.__argnames__ = ["val"];

                return MAP;
            };
            return _$rapyd$_anonfunc;
        })().call(this);
        function push_uniq(array, el) {
            if (array.indexOf(el) < 0) {
                array.push(el);
            }
        };

        push_uniq.__argnames__ = ["array", "el"];

        function string_template(text, props) {
            return text.replace(/\{(.+?)\}/g, (function() {
                var _$rapyd$_anonfunc = function (str_, p) {
                    return props[p];
                };

                _$rapyd$_anonfunc.__argnames__ = ["str_", "p"];
                return _$rapyd$_anonfunc;
            })());
        };

        string_template.__argnames__ = ["text", "props"];

        function remove(array, el) {
            var i;
            for (var _$rapyd$_Index8 = array.length - 1; _$rapyd$_Index8 > -1; _$rapyd$_Index8-=1) {
                i = _$rapyd$_Index8;
                if (array[i] === el) {
                    array.splice(i, 1);
                }
            }
        };

        remove.__argnames__ = ["array", "el"];

        function mergeSort(array, cmp) {
            if (array.length < 2) {
                return array.slice();
            }
            function merge(a, b) {
                var r, ai, bi, i;
                r = _$rapyd$_list_decorate([]);
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
            };

            merge.__argnames__ = ["a", "b"];

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
            };

            _ms.__argnames__ = ["a"];

            return _ms(array);
        };

        mergeSort.__argnames__ = ["array", "cmp"];

        function set_difference(a, b) {
            return a.filter((function() {
                var _$rapyd$_anonfunc = function (el) {
                    return b.indexOf(el) < 0;
                };

                _$rapyd$_anonfunc.__argnames__ = ["el"];
                return _$rapyd$_anonfunc;
            })());
        };

        set_difference.__argnames__ = ["a", "b"];

        function set_intersection(a, b) {
            return a.filter((function() {
                var _$rapyd$_anonfunc = function (el) {
                    return b.indexOf(el) >= 0;
                };

                _$rapyd$_anonfunc.__argnames__ = ["el"];
                return _$rapyd$_anonfunc;
            })());
        };

        set_intersection.__argnames__ = ["a", "b"];

        function make_predicate(words) {
            var a, k;
            if (!Array.isArray(words)) {
                words = words.split(" ");
            }
            if (typeof Set === "function") {
                a = new Set(words);
                return (function() {
                    var _$rapyd$_anonfunc = function (x) {
                        return a.has(x);
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["x"];
                    return _$rapyd$_anonfunc;
                })();
            } else {
                a = {};
                var _$rapyd$_Iter9 = _$rapyd$_Iterable(words);
                for (var _$rapyd$_Index9 = 0; _$rapyd$_Index9 < _$rapyd$_Iter9.length; _$rapyd$_Index9++) {
                    k = _$rapyd$_Iter9[_$rapyd$_Index9];
                    a[k] = true;
                }
                return (function() {
                    var _$rapyd$_anonfunc = function (x) {
                        return a.hasOwnProperty(x);
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["x"];
                    return _$rapyd$_anonfunc;
                })();
            }
        };

        make_predicate.__argnames__ = ["words"];

        _$rapyd$_modules.utils.MAP = MAP;
        _$rapyd$_modules.utils.array_to_hash = array_to_hash;
        _$rapyd$_modules.utils.slice = slice;
        _$rapyd$_modules.utils.characters = characters;
        _$rapyd$_modules.utils.member = member;
        _$rapyd$_modules.utils.repeat_string = repeat_string;
        _$rapyd$_modules.utils.DefaultsError = DefaultsError;
        _$rapyd$_modules.utils.defaults = defaults;
        _$rapyd$_modules.utils.merge = merge;
        _$rapyd$_modules.utils.noop = noop;
        _$rapyd$_modules.utils.push_uniq = push_uniq;
        _$rapyd$_modules.utils.string_template = string_template;
        _$rapyd$_modules.utils.remove = remove;
        _$rapyd$_modules.utils.mergeSort = mergeSort;
        _$rapyd$_modules.utils.set_difference = set_difference;
        _$rapyd$_modules.utils.set_intersection = set_intersection;
        _$rapyd$_modules.utils.make_predicate = make_predicate;
    })();

    (function(){
        var __name__ = "errors";
        function SyntaxError() {
            if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
            SyntaxError.prototype.__init__.apply(this, arguments);
        }
        _$rapyd$_extends(SyntaxError, Error);
        SyntaxError.prototype.__init__ = function __init__(message, filename, line, col, pos, is_eof) {
            var self = this;
            self.stack = (new Error).stack;
            self.message = message;
            self.line = line;
            self.col = col;
            self.pos = pos;
            self.is_eof = is_eof;
            self.filename = filename;
            self.lineNumber = line;
            self.fileName = filename;
        };

        SyntaxError.prototype.__init__.__argnames__ = ["message", "filename", "line", "col", "pos", "is_eof"];
        SyntaxError.__argnames__ = SyntaxError.prototype.__init__.__argnames__;
        SyntaxError.__handles_kwarg_interpolation__ = SyntaxError.prototype.__init__.__handles_kwarg_interpolation__;
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

        SyntaxError.prototype.toString.__argnames__ = [];
        SyntaxError.prototype.__repr__ = function __repr__ () {
            return "<" + __name__ + "." + "SyntaxError" + " #" + this._$rapyd$_object_id + ">";
        };
        SyntaxError.prototype.__str__ = function __str__ () {
            return this.__repr__();
        };

        function ImportError() {
            if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
            ImportError.prototype.__init__.apply(this, arguments);
        }
        _$rapyd$_extends(ImportError, SyntaxError);
        ImportError.prototype.__init__ = function __init__ () {
            SyntaxError.prototype.__init__ && SyntaxError.prototype.__init__.apply(this, arguments);
        };
        ImportError.prototype.__repr__ = function __repr__ () {
            return "<" + __name__ + "." + "ImportError" + " #" + this._$rapyd$_object_id + ">";
        };
        ImportError.prototype.__str__ = function __str__ () {
            return this.__repr__();
        };
        

        _$rapyd$_modules.errors.SyntaxError = SyntaxError;
        _$rapyd$_modules.errors.ImportError = ImportError;
    })();

    (function(){
        var __name__ = "unicode_aliases";
        var DB, ALIAS_MAP;
        DB = "\n# NameAliases-8.0.0.txt\n# Date: 2014-11-19, 01:30:00 GMT [KW, LI]\n#\n# This file is a normative contributory data file in the\n# Unicode Character Database.\n#\n# Copyright (c) 2005-2014 Unicode, Inc.\n# For terms of use, see http://www.unicode.org/terms_of_use.html\n#\n# This file defines the formal name aliases for Unicode characters.\n#\n# For informative aliases, see NamesList.txt\n#\n# The formal name aliases are divided into five types, each with a distinct label.\n#\n# Type Labels:\n#\n# 1. correction\n#      Corrections for serious problems in the character names\n# 2. control\n#      ISO 6429 names for C0 and C1 control functions, and other\n#      commonly occurring names for control codes\n# 3. alternate\n#      A few widely used alternate names for format characters\n# 4. figment\n#      Several documented labels for C1 control code points which\n#      were never actually approved in any standard\n# 5. abbreviation\n#      Commonly occurring abbreviations (or acronyms) for control codes,\n#      format characters, spaces, and variation selectors\n#\n# The formal name aliases are part of the Unicode character namespace, which\n# includes the character names and the names of named character sequences.\n# The inclusion of ISO 6429 names and other commonly occurring names and\n# abbreviations for control codes and format characters as formal name aliases\n# is to help avoid name collisions between Unicode character names and the\n# labels which commonly appear in text and/or in implementations such as regex, for\n# control codes (which for historical reasons have no Unicode character name)\n# or for format characters.\n#\n# For documentation, see NamesList.html and http://www.unicode.org/reports/tr44/\n#\n# FORMAT\n#\n# Each line has three fields, as described here:\n#\n# First field:  Code point\n# Second field: Alias\n# Third field:  Type\n#\n# The type labels used are defined above. As for property values, comparisons\n# of type labels should ignore case.\n#\n# The type labels can be mapped to other strings for display, if desired.\n#\n# In case multiple aliases are assigned, additional aliases\n# are provided on separate lines. Parsers of this data file should\n# take note that the same code point can (and does) occur more than once.\n#\n# Note that currently the only instances of multiple aliases of the same\n# type for a single code point are either of type \"control\" or \"abbreviation\".\n# An alias of type \"abbreviation\" can, in principle, be added for any code\n# point, although currently aliases of type \"correction\" do not have\n# any additional aliases of type \"abbreviation\". Such relationships\n# are not enforced by stability policies.\n#\n#-----------------------------------------------------------------\n\n0000;NULL;control\n0000;NUL;abbreviation\n0001;START OF HEADING;control\n0001;SOH;abbreviation\n0002;START OF TEXT;control\n0002;STX;abbreviation\n0003;END OF TEXT;control\n0003;ETX;abbreviation\n0004;END OF TRANSMISSION;control\n0004;EOT;abbreviation\n0005;ENQUIRY;control\n0005;ENQ;abbreviation\n0006;ACKNOWLEDGE;control\n0006;ACK;abbreviation\n\n# Note that no formal name alias for the ISO 6429 \"BELL\" is\n# provided for U+0007, because of the existing name collision\n# with U+1F514 BELL.\n\n0007;ALERT;control\n0007;BEL;abbreviation\n\n0008;BACKSPACE;control\n0008;BS;abbreviation\n0009;CHARACTER TABULATION;control\n0009;HORIZONTAL TABULATION;control\n0009;HT;abbreviation\n0009;TAB;abbreviation\n000A;LINE FEED;control\n000A;NEW LINE;control\n000A;END OF LINE;control\n000A;LF;abbreviation\n000A;NL;abbreviation\n000A;EOL;abbreviation\n000B;LINE TABULATION;control\n000B;VERTICAL TABULATION;control\n000B;VT;abbreviation\n000C;FORM FEED;control\n000C;FF;abbreviation\n000D;CARRIAGE RETURN;control\n000D;CR;abbreviation\n000E;SHIFT OUT;control\n000E;LOCKING-SHIFT ONE;control\n000E;SO;abbreviation\n000F;SHIFT IN;control\n000F;LOCKING-SHIFT ZERO;control\n000F;SI;abbreviation\n0010;DATA LINK ESCAPE;control\n0010;DLE;abbreviation\n0011;DEVICE CONTROL ONE;control\n0011;DC1;abbreviation\n0012;DEVICE CONTROL TWO;control\n0012;DC2;abbreviation\n0013;DEVICE CONTROL THREE;control\n0013;DC3;abbreviation\n0014;DEVICE CONTROL FOUR;control\n0014;DC4;abbreviation\n0015;NEGATIVE ACKNOWLEDGE;control\n0015;NAK;abbreviation\n0016;SYNCHRONOUS IDLE;control\n0016;SYN;abbreviation\n0017;END OF TRANSMISSION BLOCK;control\n0017;ETB;abbreviation\n0018;CANCEL;control\n0018;CAN;abbreviation\n0019;END OF MEDIUM;control\n0019;EOM;abbreviation\n001A;SUBSTITUTE;control\n001A;SUB;abbreviation\n001B;ESCAPE;control\n001B;ESC;abbreviation\n001C;INFORMATION SEPARATOR FOUR;control\n001C;FILE SEPARATOR;control\n001C;FS;abbreviation\n001D;INFORMATION SEPARATOR THREE;control\n001D;GROUP SEPARATOR;control\n001D;GS;abbreviation\n001E;INFORMATION SEPARATOR TWO;control\n001E;RECORD SEPARATOR;control\n001E;RS;abbreviation\n001F;INFORMATION SEPARATOR ONE;control\n001F;UNIT SEPARATOR;control\n001F;US;abbreviation\n0020;SP;abbreviation\n007F;DELETE;control\n007F;DEL;abbreviation\n\n# PADDING CHARACTER and HIGH OCTET PRESET represent\n# architectural concepts initially proposed for early\n# drafts of ISO/IEC 10646-1. They were never actually\n# approved or standardized: hence their designation\n# here as the \"figment\" type. Formal name aliases\n# (and corresponding abbreviations) for these code\n# points are included here because these names leaked\n# out from the draft documents and were published in\n# at least one RFC whose names for code points was\n# implemented in Perl regex expressions.\n\n0080;PADDING CHARACTER;figment\n0080;PAD;abbreviation\n0081;HIGH OCTET PRESET;figment\n0081;HOP;abbreviation\n\n0082;BREAK PERMITTED HERE;control\n0082;BPH;abbreviation\n0083;NO BREAK HERE;control\n0083;NBH;abbreviation\n0084;INDEX;control\n0084;IND;abbreviation\n0085;NEXT LINE;control\n0085;NEL;abbreviation\n0086;START OF SELECTED AREA;control\n0086;SSA;abbreviation\n0087;END OF SELECTED AREA;control\n0087;ESA;abbreviation\n0088;CHARACTER TABULATION SET;control\n0088;HORIZONTAL TABULATION SET;control\n0088;HTS;abbreviation\n0089;CHARACTER TABULATION WITH JUSTIFICATION;control\n0089;HORIZONTAL TABULATION WITH JUSTIFICATION;control\n0089;HTJ;abbreviation\n008A;LINE TABULATION SET;control\n008A;VERTICAL TABULATION SET;control\n008A;VTS;abbreviation\n008B;PARTIAL LINE FORWARD;control\n008B;PARTIAL LINE DOWN;control\n008B;PLD;abbreviation\n008C;PARTIAL LINE BACKWARD;control\n008C;PARTIAL LINE UP;control\n008C;PLU;abbreviation\n008D;REVERSE LINE FEED;control\n008D;REVERSE INDEX;control\n008D;RI;abbreviation\n008E;SINGLE SHIFT TWO;control\n008E;SINGLE-SHIFT-2;control\n008E;SS2;abbreviation\n008F;SINGLE SHIFT THREE;control\n008F;SINGLE-SHIFT-3;control\n008F;SS3;abbreviation\n0090;DEVICE CONTROL STRING;control\n0090;DCS;abbreviation\n0091;PRIVATE USE ONE;control\n0091;PRIVATE USE-1;control\n0091;PU1;abbreviation\n0092;PRIVATE USE TWO;control\n0092;PRIVATE USE-2;control\n0092;PU2;abbreviation\n0093;SET TRANSMIT STATE;control\n0093;STS;abbreviation\n0094;CANCEL CHARACTER;control\n0094;CCH;abbreviation\n0095;MESSAGE WAITING;control\n0095;MW;abbreviation\n0096;START OF GUARDED AREA;control\n0096;START OF PROTECTED AREA;control\n0096;SPA;abbreviation\n0097;END OF GUARDED AREA;control\n0097;END OF PROTECTED AREA;control\n0097;EPA;abbreviation\n0098;START OF STRING;control\n0098;SOS;abbreviation\n\n# SINGLE GRAPHIC CHARACTER INTRODUCER is another\n# architectural concept from early drafts of ISO/IEC 10646-1\n# which was never approved and standardized.\n\n0099;SINGLE GRAPHIC CHARACTER INTRODUCER;figment\n0099;SGC;abbreviation\n\n009A;SINGLE CHARACTER INTRODUCER;control\n009A;SCI;abbreviation\n009B;CONTROL SEQUENCE INTRODUCER;control\n009B;CSI;abbreviation\n009C;STRING TERMINATOR;control\n009C;ST;abbreviation\n009D;OPERATING SYSTEM COMMAND;control\n009D;OSC;abbreviation\n009E;PRIVACY MESSAGE;control\n009E;PM;abbreviation\n009F;APPLICATION PROGRAM COMMAND;control\n009F;APC;abbreviation\n00A0;NBSP;abbreviation\n00AD;SHY;abbreviation\n01A2;LATIN CAPITAL LETTER GHA;correction\n01A3;LATIN SMALL LETTER GHA;correction\n034F;CGJ;abbreviation\n061C;ALM;abbreviation\n0709;SYRIAC SUBLINEAR COLON SKEWED LEFT;correction\n0CDE;KANNADA LETTER LLLA;correction\n0E9D;LAO LETTER FO FON;correction\n0E9F;LAO LETTER FO FAY;correction\n0EA3;LAO LETTER RO;correction\n0EA5;LAO LETTER LO;correction\n0FD0;TIBETAN MARK BKA- SHOG GI MGO RGYAN;correction\n180B;FVS1;abbreviation\n180C;FVS2;abbreviation\n180D;FVS3;abbreviation\n180E;MVS;abbreviation\n200B;ZWSP;abbreviation\n200C;ZWNJ;abbreviation\n200D;ZWJ;abbreviation\n200E;LRM;abbreviation\n200F;RLM;abbreviation\n202A;LRE;abbreviation\n202B;RLE;abbreviation\n202C;PDF;abbreviation\n202D;LRO;abbreviation\n202E;RLO;abbreviation\n202F;NNBSP;abbreviation\n205F;MMSP;abbreviation\n2060;WJ;abbreviation\n2066;LRI;abbreviation\n2067;RLI;abbreviation\n2068;FSI;abbreviation\n2069;PDI;abbreviation\n2118;WEIERSTRASS ELLIPTIC FUNCTION;correction\n2448;MICR ON US SYMBOL;correction\n2449;MICR DASH SYMBOL;correction\n2B7A;LEFTWARDS TRIANGLE-HEADED ARROW WITH DOUBLE VERTICAL STROKE;correction\n2B7C;RIGHTWARDS TRIANGLE-HEADED ARROW WITH DOUBLE VERTICAL STROKE;correction\nA015;YI SYLLABLE ITERATION MARK;correction\nFE18;PRESENTATION FORM FOR VERTICAL RIGHT WHITE LENTICULAR BRACKET;correction\nFE00;VS1;abbreviation\nFE01;VS2;abbreviation\nFE02;VS3;abbreviation\nFE03;VS4;abbreviation\nFE04;VS5;abbreviation\nFE05;VS6;abbreviation\nFE06;VS7;abbreviation\nFE07;VS8;abbreviation\nFE08;VS9;abbreviation\nFE09;VS10;abbreviation\nFE0A;VS11;abbreviation\nFE0B;VS12;abbreviation\nFE0C;VS13;abbreviation\nFE0D;VS14;abbreviation\nFE0E;VS15;abbreviation\nFE0F;VS16;abbreviation\nFEFF;BYTE ORDER MARK;alternate\nFEFF;BOM;abbreviation\nFEFF;ZWNBSP;abbreviation\n122D4;CUNEIFORM SIGN NU11 TENU;correction\n122D5;CUNEIFORM SIGN NU11 OVER NU11 BUR OVER BUR;correction\n1D0C5;BYZANTINE MUSICAL SYMBOL FTHORA SKLIRON CHROMA VASIS;correction\nE0100;VS17;abbreviation\nE0101;VS18;abbreviation\nE0102;VS19;abbreviation\nE0103;VS20;abbreviation\nE0104;VS21;abbreviation\nE0105;VS22;abbreviation\nE0106;VS23;abbreviation\nE0107;VS24;abbreviation\nE0108;VS25;abbreviation\nE0109;VS26;abbreviation\nE010A;VS27;abbreviation\nE010B;VS28;abbreviation\nE010C;VS29;abbreviation\nE010D;VS30;abbreviation\nE010E;VS31;abbreviation\nE010F;VS32;abbreviation\nE0110;VS33;abbreviation\nE0111;VS34;abbreviation\nE0112;VS35;abbreviation\nE0113;VS36;abbreviation\nE0114;VS37;abbreviation\nE0115;VS38;abbreviation\nE0116;VS39;abbreviation\nE0117;VS40;abbreviation\nE0118;VS41;abbreviation\nE0119;VS42;abbreviation\nE011A;VS43;abbreviation\nE011B;VS44;abbreviation\nE011C;VS45;abbreviation\nE011D;VS46;abbreviation\nE011E;VS47;abbreviation\nE011F;VS48;abbreviation\nE0120;VS49;abbreviation\nE0121;VS50;abbreviation\nE0122;VS51;abbreviation\nE0123;VS52;abbreviation\nE0124;VS53;abbreviation\nE0125;VS54;abbreviation\nE0126;VS55;abbreviation\nE0127;VS56;abbreviation\nE0128;VS57;abbreviation\nE0129;VS58;abbreviation\nE012A;VS59;abbreviation\nE012B;VS60;abbreviation\nE012C;VS61;abbreviation\nE012D;VS62;abbreviation\nE012E;VS63;abbreviation\nE012F;VS64;abbreviation\nE0130;VS65;abbreviation\nE0131;VS66;abbreviation\nE0132;VS67;abbreviation\nE0133;VS68;abbreviation\nE0134;VS69;abbreviation\nE0135;VS70;abbreviation\nE0136;VS71;abbreviation\nE0137;VS72;abbreviation\nE0138;VS73;abbreviation\nE0139;VS74;abbreviation\nE013A;VS75;abbreviation\nE013B;VS76;abbreviation\nE013C;VS77;abbreviation\nE013D;VS78;abbreviation\nE013E;VS79;abbreviation\nE013F;VS80;abbreviation\nE0140;VS81;abbreviation\nE0141;VS82;abbreviation\nE0142;VS83;abbreviation\nE0143;VS84;abbreviation\nE0144;VS85;abbreviation\nE0145;VS86;abbreviation\nE0146;VS87;abbreviation\nE0147;VS88;abbreviation\nE0148;VS89;abbreviation\nE0149;VS90;abbreviation\nE014A;VS91;abbreviation\nE014B;VS92;abbreviation\nE014C;VS93;abbreviation\nE014D;VS94;abbreviation\nE014E;VS95;abbreviation\nE014F;VS96;abbreviation\nE0150;VS97;abbreviation\nE0151;VS98;abbreviation\nE0152;VS99;abbreviation\nE0153;VS100;abbreviation\nE0154;VS101;abbreviation\nE0155;VS102;abbreviation\nE0156;VS103;abbreviation\nE0157;VS104;abbreviation\nE0158;VS105;abbreviation\nE0159;VS106;abbreviation\nE015A;VS107;abbreviation\nE015B;VS108;abbreviation\nE015C;VS109;abbreviation\nE015D;VS110;abbreviation\nE015E;VS111;abbreviation\nE015F;VS112;abbreviation\nE0160;VS113;abbreviation\nE0161;VS114;abbreviation\nE0162;VS115;abbreviation\nE0163;VS116;abbreviation\nE0164;VS117;abbreviation\nE0165;VS118;abbreviation\nE0166;VS119;abbreviation\nE0167;VS120;abbreviation\nE0168;VS121;abbreviation\nE0169;VS122;abbreviation\nE016A;VS123;abbreviation\nE016B;VS124;abbreviation\nE016C;VS125;abbreviation\nE016D;VS126;abbreviation\nE016E;VS127;abbreviation\nE016F;VS128;abbreviation\nE0170;VS129;abbreviation\nE0171;VS130;abbreviation\nE0172;VS131;abbreviation\nE0173;VS132;abbreviation\nE0174;VS133;abbreviation\nE0175;VS134;abbreviation\nE0176;VS135;abbreviation\nE0177;VS136;abbreviation\nE0178;VS137;abbreviation\nE0179;VS138;abbreviation\nE017A;VS139;abbreviation\nE017B;VS140;abbreviation\nE017C;VS141;abbreviation\nE017D;VS142;abbreviation\nE017E;VS143;abbreviation\nE017F;VS144;abbreviation\nE0180;VS145;abbreviation\nE0181;VS146;abbreviation\nE0182;VS147;abbreviation\nE0183;VS148;abbreviation\nE0184;VS149;abbreviation\nE0185;VS150;abbreviation\nE0186;VS151;abbreviation\nE0187;VS152;abbreviation\nE0188;VS153;abbreviation\nE0189;VS154;abbreviation\nE018A;VS155;abbreviation\nE018B;VS156;abbreviation\nE018C;VS157;abbreviation\nE018D;VS158;abbreviation\nE018E;VS159;abbreviation\nE018F;VS160;abbreviation\nE0190;VS161;abbreviation\nE0191;VS162;abbreviation\nE0192;VS163;abbreviation\nE0193;VS164;abbreviation\nE0194;VS165;abbreviation\nE0195;VS166;abbreviation\nE0196;VS167;abbreviation\nE0197;VS168;abbreviation\nE0198;VS169;abbreviation\nE0199;VS170;abbreviation\nE019A;VS171;abbreviation\nE019B;VS172;abbreviation\nE019C;VS173;abbreviation\nE019D;VS174;abbreviation\nE019E;VS175;abbreviation\nE019F;VS176;abbreviation\nE01A0;VS177;abbreviation\nE01A1;VS178;abbreviation\nE01A2;VS179;abbreviation\nE01A3;VS180;abbreviation\nE01A4;VS181;abbreviation\nE01A5;VS182;abbreviation\nE01A6;VS183;abbreviation\nE01A7;VS184;abbreviation\nE01A8;VS185;abbreviation\nE01A9;VS186;abbreviation\nE01AA;VS187;abbreviation\nE01AB;VS188;abbreviation\nE01AC;VS189;abbreviation\nE01AD;VS190;abbreviation\nE01AE;VS191;abbreviation\nE01AF;VS192;abbreviation\nE01B0;VS193;abbreviation\nE01B1;VS194;abbreviation\nE01B2;VS195;abbreviation\nE01B3;VS196;abbreviation\nE01B4;VS197;abbreviation\nE01B5;VS198;abbreviation\nE01B6;VS199;abbreviation\nE01B7;VS200;abbreviation\nE01B8;VS201;abbreviation\nE01B9;VS202;abbreviation\nE01BA;VS203;abbreviation\nE01BB;VS204;abbreviation\nE01BC;VS205;abbreviation\nE01BD;VS206;abbreviation\nE01BE;VS207;abbreviation\nE01BF;VS208;abbreviation\nE01C0;VS209;abbreviation\nE01C1;VS210;abbreviation\nE01C2;VS211;abbreviation\nE01C3;VS212;abbreviation\nE01C4;VS213;abbreviation\nE01C5;VS214;abbreviation\nE01C6;VS215;abbreviation\nE01C7;VS216;abbreviation\nE01C8;VS217;abbreviation\nE01C9;VS218;abbreviation\nE01CA;VS219;abbreviation\nE01CB;VS220;abbreviation\nE01CC;VS221;abbreviation\nE01CD;VS222;abbreviation\nE01CE;VS223;abbreviation\nE01CF;VS224;abbreviation\nE01D0;VS225;abbreviation\nE01D1;VS226;abbreviation\nE01D2;VS227;abbreviation\nE01D3;VS228;abbreviation\nE01D4;VS229;abbreviation\nE01D5;VS230;abbreviation\nE01D6;VS231;abbreviation\nE01D7;VS232;abbreviation\nE01D8;VS233;abbreviation\nE01D9;VS234;abbreviation\nE01DA;VS235;abbreviation\nE01DB;VS236;abbreviation\nE01DC;VS237;abbreviation\nE01DD;VS238;abbreviation\nE01DE;VS239;abbreviation\nE01DF;VS240;abbreviation\nE01E0;VS241;abbreviation\nE01E1;VS242;abbreviation\nE01E2;VS243;abbreviation\nE01E3;VS244;abbreviation\nE01E4;VS245;abbreviation\nE01E5;VS246;abbreviation\nE01E6;VS247;abbreviation\nE01E7;VS248;abbreviation\nE01E8;VS249;abbreviation\nE01E9;VS250;abbreviation\nE01EA;VS251;abbreviation\nE01EB;VS252;abbreviation\nE01EC;VS253;abbreviation\nE01ED;VS254;abbreviation\nE01EE;VS255;abbreviation\nE01EF;VS256;abbreviation\n\n# EOF\n";
        ALIAS_MAP = (function() {
            var _$rapyd$_anonfunc = function () {
                var ans, line, parts, code_point;
                ans = {};
                var _$rapyd$_Iter10 = _$rapyd$_Iterable(DB.split("\n"));
                for (var _$rapyd$_Index10 = 0; _$rapyd$_Index10 < _$rapyd$_Iter10.length; _$rapyd$_Index10++) {
                    line = _$rapyd$_Iter10[_$rapyd$_Index10];
                    line = line.trim();
                    if (!line || line[0] === "#") {
                        continue;
                    }
                    parts = line.split(";");
                    if (parts.length >= 2) {
                        code_point = parseInt(parts[0], 16);
                        if (code_point !== undefined && parts[1]) {
                            ans[parts[1].toLowerCase()] = code_point;
                        }
                    }
                }
                return ans;
            };
            return _$rapyd$_anonfunc;
        })()();
        _$rapyd$_modules.unicode_aliases.DB = DB;
        _$rapyd$_modules.unicode_aliases.ALIAS_MAP = ALIAS_MAP;
    })();

    (function(){
        var __name__ = "ast";
        var AST_Token, AST_Node, AST_Statement, AST_Debugger, AST_Directive, AST_SimpleStatement, AST_Block, AST_BlockStatement, AST_EmptyStatement, AST_StatementWithBody, AST_DWLoop, AST_Do, AST_While, AST_ForIn, AST_ForJS, AST_ListComprehension, AST_SetComprehension, AST_DictComprehension, AST_GeneratorComprehension, AST_With, AST_WithClause, AST_Scope, AST_Toplevel, AST_Import, AST_Imports, AST_Decorator, AST_Lambda, AST_Function, AST_Class, AST_Method, AST_Jump, AST_Exit, AST_Return, AST_Yield, AST_Throw, AST_LoopControl, AST_Break, AST_Continue, AST_If, AST_Try, AST_Catch, AST_Except, AST_Finally, AST_Definitions, AST_Var, AST_Const, AST_VarDef, AST_BaseCall, AST_Call, AST_ClassCall, AST_New, AST_Seq, AST_PropAccess, AST_Dot, AST_Sub, AST_ItemAccess, AST_Splice, AST_Unary, AST_UnaryPrefix, AST_UnaryPostfix, AST_Binary, AST_Conditional, AST_Assign, AST_Array, AST_Object, AST_ExpressiveObject, AST_ObjectProperty, AST_ObjectKeyVal, AST_Set, AST_SetItem, AST_Symbol, AST_SymbolAlias, AST_SymbolDeclaration, AST_SymbolVar, AST_ImportedVar, AST_SymbolConst, AST_SymbolNonlocal, AST_SymbolFunarg, AST_SymbolDefun, AST_SymbolLambda, AST_SymbolCatch, AST_SymbolRef, AST_This, AST_Constant, AST_String, AST_Verbatim, AST_Number, AST_RegExp, AST_Atom, AST_Null, AST_NaN, AST_Undefined, AST_Hole, AST_Infinity, AST_Boolean, AST_False, AST_True;
        var noop = _$rapyd$_modules.utils.noop;
        var string_template = _$rapyd$_modules.utils.string_template;
        
        function DEFNODE(type, props, methods, base) {
            var self_props, code, i, proto, ctor, _$rapyd$_chain_assign_temp;
            if (arguments.length < 4) {
                base = AST_Node;
            }
            if (!props) {
                props = _$rapyd$_list_decorate([]);
            } else {
                props = props.split(/\s+/);
            }
            self_props = props;
            if (base && base.PROPS) {
                props = props.concat(base.PROPS);
            }
            code = "return function AST_" + type + "(props){ if (props) { ";
            for (var _$rapyd$_Index11 = props.length - 1; _$rapyd$_Index11 > -1; _$rapyd$_Index11-=1) {
                i = _$rapyd$_Index11;
                code += "this." + props[i] + " = props." + props[i] + ";";
            }
            proto = base && new base;
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
            ctor.SUBCLASSES = _$rapyd$_list_decorate([]);
            if (type) {
                _$rapyd$_chain_assign_temp = type;
                ctor.prototype.TYPE = _$rapyd$_chain_assign_temp;
                ctor.TYPE = _$rapyd$_chain_assign_temp;
;
            }
            if (methods) {
                var _$rapyd$_Iter12 = _$rapyd$_Iterable(methods);
                for (var _$rapyd$_Index12 = 0; _$rapyd$_Index12 < _$rapyd$_Iter12.length; _$rapyd$_Index12++) {
                    i = _$rapyd$_Iter12[_$rapyd$_Index12];
                    if (/^\$/.test(i)) {
                        ctor[i.substr(1)] = methods[i];
                    } else {
                        ctor.prototype[i] = methods[i];
                    }
                }
            }
            ctor.DEFMETHOD = (function() {
                var _$rapyd$_anonfunc = function (name, method) {
                    this.prototype[name] = method;
                };

                _$rapyd$_anonfunc.__argnames__ = ["name", "method"];
                return _$rapyd$_anonfunc;
            })();
            return ctor;
        };

        DEFNODE.__argnames__ = ["type", "props", "methods", "base"];

        AST_Token = DEFNODE("Token", "type value line col pos endpos nlb comments_before file", {}, null);
        AST_Node = DEFNODE("Node", "start end", {
            "clone": (function() {
                var _$rapyd$_anonfunc = function () {
                    return new this.CTOR(this);
                };
                return _$rapyd$_anonfunc;
            })(),
            "$documentation": "Base class of all AST nodes",
            "$propdoc": {
                "start": "[AST_Token] The first token of this node",
                "end": "[AST_Token] The last token of this node"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    return visitor._visit(this);
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })(),
            "walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    return this._walk(visitor);
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })(),
            "_dump": (function() {
                var _$rapyd$_anonfunc = function () {
                    var depth = (arguments[0] === undefined || ( 0 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? _$rapyd$_anonfunc.__defaults__.depth : arguments[0];
                    var omit = (arguments[1] === undefined || ( 1 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? _$rapyd$_anonfunc.__defaults__.omit : arguments[1];
                    var offset = (arguments[2] === undefined || ( 2 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? _$rapyd$_anonfunc.__defaults__.offset : arguments[2];
                    var include_name = (arguments[3] === undefined || ( 3 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? _$rapyd$_anonfunc.__defaults__.include_name : arguments[3];
                    var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
                    if (_$rapyd$_kwargs_obj === null || typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [_$rapyd$_kwargs_symbol] !== true) _$rapyd$_kwargs_obj = {};
                    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "depth")){
                        depth = _$rapyd$_kwargs_obj.depth;
                    }
                    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "omit")){
                        omit = _$rapyd$_kwargs_obj.omit;
                    }
                    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "offset")){
                        offset = _$rapyd$_kwargs_obj.offset;
                    }
                    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "include_name")){
                        include_name = _$rapyd$_kwargs_obj.include_name;
                    }
                    var p, reset, yellow, blue, green, red, magenta, pad, element, property, key;
                    p = console.log;
                    reset = "\u001b[0m";
                    yellow = "\u001b[33m";
                    blue = "\u001b[34m";
                    green = "\u001b[32m";
                    red = "\u001b[31m";
                    magenta = "\u001b[35m";
                    pad = new Array(offset + 1).join("  ");
                    if (include_name) {
                        p(pad + yellow + this.TYPE + reset);
                    }
                    var _$rapyd$_Iter13 = _$rapyd$_Iterable(this);
                    for (var _$rapyd$_Index13 = 0; _$rapyd$_Index13 < _$rapyd$_Iter13.length; _$rapyd$_Index13++) {
                        key = _$rapyd$_Iter13[_$rapyd$_Index13];
                        if (_$rapyd$_in(key, omit)) {
                            continue;
                        }
                        if (Array.isArray(this[key])) {
                            if (this[key].length) {
                                p(pad + " " + blue + key + ": " + reset + "[");
                                if (depth > 1) {
                                    var _$rapyd$_Iter14 = _$rapyd$_Iterable(this[key]);
                                    for (var _$rapyd$_Index14 = 0; _$rapyd$_Index14 < _$rapyd$_Iter14.length; _$rapyd$_Index14++) {
                                        element = _$rapyd$_Iter14[_$rapyd$_Index14];
                                        element._dump(depth - 1, omit, offset + 1, true);
                                    }
                                } else {
                                    var _$rapyd$_Iter15 = _$rapyd$_Iterable(this[key]);
                                    for (var _$rapyd$_Index15 = 0; _$rapyd$_Index15 < _$rapyd$_Iter15.length; _$rapyd$_Index15++) {
                                        element = _$rapyd$_Iter15[_$rapyd$_Index15];
                                        p(pad + "   " + yellow + element.TYPE + reset);
                                    }
                                }
                                p(pad + " ]");
                            } else {
                                p(pad + " " + blue + key + ": " + reset + "[]");
                            }
                        } else if (this[key]) {
                            if (this[key].TYPE) {
                                if (this[key].TYPE === "Token") {
                                    p(pad + " " + blue + key + ": " + magenta + this[key].TYPE + reset);
                                    var _$rapyd$_Iter16 = _$rapyd$_Iterable(this[key]);
                                    for (var _$rapyd$_Index16 = 0; _$rapyd$_Index16 < _$rapyd$_Iter16.length; _$rapyd$_Index16++) {
                                        property = _$rapyd$_Iter16[_$rapyd$_Index16];
                                        p(pad + "   " + blue + property + ": " + reset + this[key][property]);
                                    }
                                } else {
                                    p(pad + " " + blue + key + ": " + yellow + this[key].TYPE + reset);
                                    if (depth > 1) {
                                        this[key]._dump(depth - 1, omit, offset + 1, false);
                                    }
                                }
                            } else if (typeof this[key] === "string") {
                                p(pad + " " + blue + key + ": " + green + "\"" + this[key] + "\"" + reset);
                            } else if (typeof this[key] === "number") {
                                p(pad + " " + blue + key + ": " + green + this[key] + reset);
                            } else {
                                p(pad + " " + blue + key + ": " + red + this[key] + reset);
                            }
                        } else {
                            p(pad + " " + blue + key + ": " + reset + this[key]);
                        }
                    }
                };

                _$rapyd$_anonfunc.__defaults__ = {
                    depth:100, 
                    omit:(function(){
                        var s = _$rapyd$_set();
                        s.jsset.add("start");
                        s.jsset.add("end");
                        return s;
                    })(), 
                    offset:0, 
                    include_name:true
                };

                _$rapyd$_anonfunc.__handles_kwarg_interpolation__ = true;

                _$rapyd$_anonfunc.__argnames__ = ["depth", "omit", "offset", "include_name"];
                return _$rapyd$_anonfunc;
            })(),
            "dump": (function() {
                var _$rapyd$_anonfunc = function () {
                    var depth = (arguments[0] === undefined || ( 0 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? _$rapyd$_anonfunc.__defaults__.depth : arguments[0];
                    var omit = (arguments[1] === undefined || ( 1 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? _$rapyd$_anonfunc.__defaults__.omit : arguments[1];
                    var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
                    if (_$rapyd$_kwargs_obj === null || typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [_$rapyd$_kwargs_symbol] !== true) _$rapyd$_kwargs_obj = {};
                    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "depth")){
                        depth = _$rapyd$_kwargs_obj.depth;
                    }
                    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "omit")){
                        omit = _$rapyd$_kwargs_obj.omit;
                    }
                    return this._dump(depth, omit, 0, true);
                };

                _$rapyd$_anonfunc.__defaults__ = {
                    depth:2, 
                    omit:_$rapyd$_list_decorate([])
                };

                _$rapyd$_anonfunc.__handles_kwarg_interpolation__ = true;

                _$rapyd$_anonfunc.__argnames__ = ["depth", "omit"];
                return _$rapyd$_anonfunc;
            })()
        }, null);
        AST_Node.warn_function = null;
        AST_Node.warn = (function() {
            var _$rapyd$_anonfunc = function (txt, props) {
                if (AST_Node.warn_function) {
                    AST_Node.warn_function(string_template(txt, props));
                }
            };

            _$rapyd$_anonfunc.__argnames__ = ["txt", "props"];
            return _$rapyd$_anonfunc;
        })();
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
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.body._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_Statement);
        function walk_body(node, visitor) {
            if (node.body instanceof AST_Statement) {
                node.body._walk(visitor);
            } else if (node.body) {
                node.body.forEach((function() {
                    var _$rapyd$_anonfunc = function (stat) {
                        stat._walk(visitor);
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["stat"];
                    return _$rapyd$_anonfunc;
                })());
            }
        };

        walk_body.__argnames__ = ["node", "visitor"];

        AST_Block = DEFNODE("Block", "body", {
            "$documentation": "A body of statements (usually bracketed)",
            "$propdoc": {
                "body": "[AST_Statement*] an array of statements"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(this, (function() {
                        var _$rapyd$_anonfunc = function () {
                            walk_body(node, visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_Statement);
        AST_BlockStatement = DEFNODE("BlockStatement", null, {
            "$documentation": "A block statement"
        }, AST_Block);
        AST_EmptyStatement = DEFNODE("EmptyStatement", "stype", {
            "$documentation": "The empty statement (empty block or simply a semicolon)",
            "$propdoc": {
                "stype": "[string] the type of empty statement. Is ; for semicolons"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    return visitor._visit(this);
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_Statement);
        AST_StatementWithBody = DEFNODE("StatementWithBody", "body", {
            "$documentation": "Base class for all statements that contain one nested body: `For`, `ForIn`, `Do`, `While`, `With`",
            "$propdoc": {
                "body": "[AST_Statement] the body; this should always be present, even if it's an AST_EmptyStatement"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.body._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_Statement);
        AST_DWLoop = DEFNODE("DWLoop", "condition", {
            "$documentation": "Base class for do/while statements",
            "$propdoc": {
                "condition": "[AST_Node] the loop condition.  Should not be instanceof AST_Statement"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.condition._walk(visitor);
                            node.body._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
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
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.init._walk(visitor);
                            if (node.name) node.name._walk(visitor);
                            node.object._walk(visitor);
                            if (node.body) {
                                node.body._walk(visitor);
                            }
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
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
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.init._walk(visitor);
                            node.object._walk(visitor);
                            node.statement._walk(visitor);
                            if (node.condition) node.condition._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_ForIn);
        AST_SetComprehension = DEFNODE("SetComprehension", null, {
            "$documentation": "A set comprehension"
        }, AST_ListComprehension);
        AST_DictComprehension = DEFNODE("DictComprehension", "value_statement is_pydict", {
            "$documentation": "A set comprehension",
            "$propdoc": {
                "value_statement": "[AST_Node] statement to perform on each value before returning it",
                "is_pydict": "[bool] True if this comprehension is for a python dict"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.init._walk(visitor);
                            node.object._walk(visitor);
                            node.statement._walk(visitor);
                            node.value_statement._walk(visitor);
                            if (node.condition) node.condition._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_ListComprehension);
        AST_GeneratorComprehension = DEFNODE("GeneratorComprehension", null, {
            "$documentation": "A generator comprehension"
        }, AST_ListComprehension);
        AST_With = DEFNODE("With", "clauses", {
            "$documentation": "A `with` statement",
            "$propdoc": {
                "clauses": "[AST_WithClause*] the `with` clauses (comma separated)"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.clauses.forEach((function() {
                                var _$rapyd$_anonfunc = function (exp) {
                                    exp._walk(visitor);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["exp"];
                                return _$rapyd$_anonfunc;
                            })());
                            node.body._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_StatementWithBody);
        AST_WithClause = DEFNODE("WithClause", "expression alias", {
            "$documentation": "A clause in a with statement",
            "$propdoc": {
                "expression": "[AST_Node] the expression",
                "alias": "[AST_SymbolAlias?] optional alias for this expression"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.expression._walk(visitor);
                            if (node.alias) {
                                node.alias._walk(visitor);
                            }
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_Node);
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
        AST_Toplevel = DEFNODE("Toplevel", "globals baselib imports imported_module_ids shebang import_order module_id exports submodules classes filename srchash", {
            "$documentation": "The toplevel scope",
            "$propdoc": {
                "globals": "[Object/S] a map of name -> SymbolDef for all undeclared names",
                "baselib": "[Object/s] a collection of used parts of baselib",
                "imports": "[Object/S] a map of module_id->AST_Toplevel for all imported modules (this represents all imported modules across all source files)",
                "imported_module_ids": "[string*] a list of module ids that were imported by this module, specifically",
                "nonlocalvars": "[String*] a list of all non-local variable names (names that come from the global scope)",
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
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            if (node.alias) {
                                node.alias._walk(visitor);
                            }
                            if (node.argnames) {
                                node.argnames.forEach((function() {
                                    var _$rapyd$_anonfunc = function (arg) {
                                        arg._walk(visitor);
                                    };

                                    _$rapyd$_anonfunc.__argnames__ = ["arg"];
                                    return _$rapyd$_anonfunc;
                                })());
                            }
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_Statement);
        AST_Imports = DEFNODE("Imports", "imports", {
            "$documentation": "Container for a single import",
            "$propdoc": {
                "imports": "[AST_Import+] array of imports"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.imports.forEach((function() {
                                var _$rapyd$_anonfunc = function (imp) {
                                    imp._walk(visitor);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["imp"];
                                return _$rapyd$_anonfunc;
                            })());
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_Statement);
        AST_Decorator = DEFNODE("Decorator", "expression", {
            "$documentation": "Class for function decorators",
            "$propdoc": {
                "expression": "[AST_Node] the decorator expression"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            if (node.expression) {
                                node.expression.walk(visitor);
                            }
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        });
        AST_Lambda = DEFNODE("Lambda", "name argnames decorators is_generator is_expression is_anonymous", {
            "$documentation": "Base class for functions",
            "$propdoc": {
                "name": "[AST_SymbolDeclaration?] the name of this function",
                "argnames": "[AST_SymbolFunarg*] array of function arguments",
                "decorators": "[AST_Decorator*] function decorators, if any",
                "is_generator": "[bool*] True iff this function is a generator",
                "is_expression": "[bool*] True iff this function is a function expression",
                "is_anonymous": "[bool*] True iff this function is an anonymous function"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            var d;
                            if (node.decorators) {
                                var _$rapyd$_Iter17 = _$rapyd$_Iterable(node.decorators);
                                for (var _$rapyd$_Index17 = 0; _$rapyd$_Index17 < _$rapyd$_Iter17.length; _$rapyd$_Index17++) {
                                    d = _$rapyd$_Iter17[_$rapyd$_Index17];
                                    d.walk(visitor);
                                }
                            }
                            if (node.name) {
                                node.name._walk(visitor);
                            }
                            node.argnames.forEach((function() {
                                var _$rapyd$_anonfunc = function (arg) {
                                    arg._walk(visitor);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["arg"];
                                return _$rapyd$_anonfunc;
                            })());
                            if (node.argnames.starargs) {
                                node.argnames.starargs._walk(visitor);
                            }
                            if (node.argnames.kwargs) {
                                node.argnames.kwargs._walk(visitor);
                            }
                            walk_body(node, visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_Scope);
        AST_Function = DEFNODE("Function", null, {
            "$documentation": "A function expression"
        }, AST_Lambda);
        AST_Class = DEFNODE("Class", "init name parent static external bound decorators module_id statements dynamic_properties", {
            "$documentation": "A class declaration",
            "$propdoc": {
                "name": "[AST_SymbolDeclaration?] the name of this class",
                "init": "[AST_Function] constructor for the class",
                "parent": "[AST_Symbol?] parent class this class inherits from",
                "static": "[string*] list of static methods",
                "external": "[boolean] true if class is declared elsewhere, but will be within current scope at runtime",
                "bound": "[string*] list of methods that need to be bound to behave correctly (function pointers)",
                "decorators": "[AST_Decorator*] function decorators, if any",
                "module_id": "[string] The id of the module this class is defined in",
                "statements": "[AST_Node*] list of statements in the class scope (excluding method definitions)",
                "dynamic_properties": "[dict] map of dynamic property names to property descriptors of the form {getter:AST_Method, setter:AST_Method"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            var d;
                            if (node.decorators) {
                                var _$rapyd$_Iter18 = _$rapyd$_Iterable(node.decorators);
                                for (var _$rapyd$_Index18 = 0; _$rapyd$_Index18 < _$rapyd$_Iter18.length; _$rapyd$_Index18++) {
                                    d = _$rapyd$_Iter18[_$rapyd$_Index18];
                                    d.walk(visitor);
                                }
                            }
                            node.name._walk(visitor);
                            walk_body(node, visitor);
                            if (node.parent) node.parent._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_Scope);
        AST_Method = DEFNODE("Method", "static is_getter is_setter", {
            "$documentation": "A class method definition",
            "$propdoc": {
                "static": "[boolean] true if method is static",
                "is_getter": "[boolean] true if method is a property getter",
                "is_setter": "[boolean] true if method is a property setter"
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
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            if (node.value) {
                                node.value._walk(visitor);
                            }
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
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
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.condition._walk(visitor);
                            node.body._walk(visitor);
                            if (node.alternative) {
                                node.alternative._walk(visitor);
                            }
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_StatementWithBody);
        AST_Try = DEFNODE("Try", "bcatch bfinally", {
            "$documentation": "A `try` statement",
            "$propdoc": {
                "bcatch": "[AST_Catch?] the catch block, or null if not present",
                "bfinally": "[AST_Finally?] the finally block, or null if not present"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            walk_body(node, visitor);
                            if (node.bcatch) {
                                node.bcatch._walk(visitor);
                            }
                            if (node.bfinally) {
                                node.bfinally._walk(visitor);
                            }
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
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
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(this, (function() {
                        var _$rapyd$_anonfunc = function () {
                            var e;
                            if (node.argname) {
                                node.argname.walk(visitor);
                            }
                            if (node.errors) {
                                var _$rapyd$_Iter19 = _$rapyd$_Iterable(node.errors);
                                for (var _$rapyd$_Index19 = 0; _$rapyd$_Index19 < _$rapyd$_Iter19.length; _$rapyd$_Index19++) {
                                    e = _$rapyd$_Iter19[_$rapyd$_Index19];
                                    e.walk(visitor);
                                }
                            }
                            walk_body(node, visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_Block);
        AST_Finally = DEFNODE("Finally", null, {
            "$documentation": "A `finally` node; only makes sense as part of a `try` statement"
        }, AST_Block);
        AST_Definitions = DEFNODE("Definitions", "definitions", {
            "$documentation": "Base class for `var` or `const` nodes (variable declarations/initializations)",
            "$propdoc": {
                "definitions": "[AST_VarDef*] array of variable definitions"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.definitions.forEach((function() {
                                var _$rapyd$_anonfunc = function (def_) {
                                    def_._walk(visitor);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["def_"];
                                return _$rapyd$_anonfunc;
                            })());
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
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
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.name._walk(visitor);
                            if (node.value) {
                                node.value._walk(visitor);
                            }
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
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
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.expression._walk(visitor);
                            node.args.forEach((function() {
                                var _$rapyd$_anonfunc = function (arg) {
                                    arg._walk(visitor);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["arg"];
                                return _$rapyd$_anonfunc;
                            })());
                            if (node.args.kwargs) node.args.kwargs.forEach((function() {
                                var _$rapyd$_anonfunc = function (arg) {
                                    arg[0]._walk(visitor);
                                    arg[1]._walk(visitor);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["arg"];
                                return _$rapyd$_anonfunc;
                            })());
                            if (node.args.kwarg_items) node.args.kwarg_items.forEach((function() {
                                var _$rapyd$_anonfunc = function (arg) {
                                    arg._walk(visitor);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["arg"];
                                return _$rapyd$_anonfunc;
                            })());
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_BaseCall);
        AST_ClassCall = DEFNODE("ClassCall", "class method static", {
            "$documentation": "A function call expression",
            "$propdoc": {
                "class": "[string] name of the class method belongs to",
                "method": "[string] class method being called",
                "static": "[boolean] defines whether the method is static"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            if (node.expression) node.expression._walk(visitor);
                            node.args.forEach((function() {
                                var _$rapyd$_anonfunc = function (arg) {
                                    arg._walk(visitor);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["arg"];
                                return _$rapyd$_anonfunc;
                            })());
                            node.args.kwargs.forEach((function() {
                                var _$rapyd$_anonfunc = function (arg) {
                                    arg[0]._walk(visitor);
                                    arg[1]._walk(visitor);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["arg"];
                                return _$rapyd$_anonfunc;
                            })());
                            node.args.kwarg_items.forEach((function() {
                                var _$rapyd$_anonfunc = function (arg) {
                                    arg._walk(visitor);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["arg"];
                                return _$rapyd$_anonfunc;
                            })());
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
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
            "$cons": (function() {
                var _$rapyd$_anonfunc = function (x, y) {
                    var seq;
                    seq = new AST_Seq(x);
                    seq.car = x;
                    seq.cdr = y;
                    return seq;
                };

                _$rapyd$_anonfunc.__argnames__ = ["x", "y"];
                return _$rapyd$_anonfunc;
            })(),
            "$from_array": (function() {
                var _$rapyd$_anonfunc = function (array) {
                    var list, i, p;
                    if (array.length === 0) {
                        return null;
                    }
                    if (array.length === 1) {
                        return array[0].clone();
                    }
                    list = null;
                    for (var _$rapyd$_Index20 = array.length - 1; _$rapyd$_Index20 > -1; _$rapyd$_Index20-=1) {
                        i = _$rapyd$_Index20;
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
                };

                _$rapyd$_anonfunc.__argnames__ = ["array"];
                return _$rapyd$_anonfunc;
            })(),
            "to_array": (function() {
                var _$rapyd$_anonfunc = function () {
                    var p, a;
                    p = this;
                    a = _$rapyd$_list_decorate([]);
                    while (p) {
                        a.push(p.car);
                        if (p.cdr && !(p.cdr instanceof AST_Seq)) {
                            a.push(p.cdr);
                            break;
                        }
                        p = p.cdr;
                    }
                    return a;
                };
                return _$rapyd$_anonfunc;
            })(),
            "add": (function() {
                var _$rapyd$_anonfunc = function (node) {
                    var p, cell;
                    p = this;
                    while (p) {
                        if (!(p.cdr instanceof AST_Seq)) {
                            cell = AST_Seq.cons(p.cdr, node);
                            return p.cdr = cell;
                        }
                        p = p.cdr;
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["node"];
                return _$rapyd$_anonfunc;
            })(),
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.car._walk(visitor);
                            if (node.cdr) {
                                node.cdr._walk(visitor);
                            }
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
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
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.expression._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_PropAccess);
        AST_Sub = DEFNODE("Sub", null, {
            "$documentation": "Index-style property access, i.e. `a[\"foo\"]`",
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.expression._walk(visitor);
                            node.property._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_PropAccess);
        AST_ItemAccess = DEFNODE("ItemAccess", "assignment", {
            "$documentation": "Python index-style property access, i.e. `a.__getitem__(\"foo\")`",
            "$propdoc": {
                "assignment": "[AST_Node or None] Not None if this is an assignment (a[x] = y) rather than a simple access"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.expression._walk(visitor);
                            node.property._walk(visitor);
                            if (node.assignment) {
                                node.assignment._walk(visitor);
                            }
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_PropAccess);
        AST_Splice = DEFNODE("Slice", "property2 assignment", {
            "$documentation": "Index-style property access, i.e. `a[3:5]`",
            "$propdoc": {
                "property2": "[AST_Node] the 2nd property to access - typically ending index for the array.",
                "assignment": "[AST_Node] The data being spliced in."
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.expression._walk(visitor);
                            node.property._walk(visitor);
                            node.property2._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        }, AST_PropAccess);
        AST_Unary = DEFNODE("Unary", "operator expression", {
            "$documentation": "Base class for unary expressions",
            "$propdoc": {
                "operator": "[string] the operator",
                "expression": "[AST_Node] expression that this unary operator applies to"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.expression._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
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
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.left._walk(visitor);
                            node.right._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        });
        AST_Conditional = DEFNODE("Conditional", "condition consequent alternative", {
            "$documentation": "Conditional expression using the ternary operator, i.e. `a ? b : c`",
            "$propdoc": {
                "condition": "[AST_Node]",
                "consequent": "[AST_Node]",
                "alternative": "[AST_Node]"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.condition._walk(visitor);
                            node.consequent._walk(visitor);
                            node.alternative._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        });
        AST_Assign = DEFNODE("Assign", null, {
            "$documentation": "An assignment expression — `a = b + 5`",
            "is_chained": (function() {
                var _$rapyd$_anonfunc = function () {
                    return this.right instanceof AST_Assign || this.right instanceof AST_Seq && (this.right.car instanceof AST_Assign || this.right.cdr instanceof AST_Assign);
                };
                return _$rapyd$_anonfunc;
            })(),
            "traverse_chain": (function() {
                var _$rapyd$_anonfunc = function () {
                    var right, left_hand_sides, next, assign;
                    right = this.right;
                    while (true) {
                        if (right instanceof AST_Assign) {
                            right = right.right;
                            continue;
                        }
                        if (right instanceof AST_Seq) {
                            if (right.car instanceof AST_Assign) {
                                right = new AST_Seq({
                                    "car": right.car.right,
                                    "cdr": right.cdr
                                });
                                continue;
                            }
                            if (right.cdr instanceof AST_Assign) {
                                right = right.cdr.right;
                                continue;
                            }
                        }
                        break;
                    }
                    left_hand_sides = [this.left];
                    next = this.right;
                    while (true) {
                        if (next instanceof AST_Assign) {
                            left_hand_sides.push(next.left);
                            next = next.right;
                            continue;
                        }
                        if (next instanceof AST_Seq) {
                            if (next.cdr instanceof AST_Assign) {
                                assign = next.cdr;
                                left_hand_sides.push(new AST_Seq({
                                    "car": next.car,
                                    "cdr": assign.left
                                }));
                                next = assign.right;
                                continue;
                            }
                        }
                        break;
                    }
                    return [left_hand_sides, right];
                };
                return _$rapyd$_anonfunc;
            })()
        }, AST_Binary);
        AST_Array = DEFNODE("Array", "elements", {
            "$documentation": "An array literal",
            "$propdoc": {
                "elements": "[AST_Node*] array of elements"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.elements.forEach((function() {
                                var _$rapyd$_anonfunc = function (el) {
                                    el._walk(visitor);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["el"];
                                return _$rapyd$_anonfunc;
                            })());
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })(),
            "flatten": (function() {
                var _$rapyd$_anonfunc = function () {
                    function flatten(arr) {
                        var ans, value;
                        ans = _$rapyd$_list_decorate([]);
                        var _$rapyd$_Iter21 = _$rapyd$_Iterable(arr);
                        for (var _$rapyd$_Index21 = 0; _$rapyd$_Index21 < _$rapyd$_Iter21.length; _$rapyd$_Index21++) {
                            value = _$rapyd$_Iter21[_$rapyd$_Index21];
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
                    };

                    flatten.__argnames__ = ["arr"];

                    return flatten(this.elements);
                };
                return _$rapyd$_anonfunc;
            })()
        });
        AST_Object = DEFNODE("Object", "properties is_pydict", {
            "$documentation": "An object literal",
            "$propdoc": {
                "properties": "[AST_ObjectProperty*] array of properties",
                "is_pydict": "[bool] True if this object is a python dict literal"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.properties.forEach((function() {
                                var _$rapyd$_anonfunc = function (prop) {
                                    prop._walk(visitor);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["prop"];
                                return _$rapyd$_anonfunc;
                            })());
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
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
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.key._walk(visitor);
                            node.value._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        });
        AST_ObjectKeyVal = DEFNODE("ObjectKeyVal", null, {
            "$documentation": "A key: value object property"
        }, AST_ObjectProperty);
        AST_Set = DEFNODE("Set", "items", {
            "$documentation": "A set literal",
            "$propdoc": {
                "items": "[AST_SetItem*] array of items"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.items.forEach((function() {
                                var _$rapyd$_anonfunc = function (prop) {
                                    prop._walk(visitor);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["prop"];
                                return _$rapyd$_anonfunc;
                            })());
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        });
        AST_SetItem = DEFNODE("SetItem", "value", {
            "$documentation": "An item in a set literal",
            "$propdoc": {
                "value": "[AST_Node] The value of this item"
            },
            "_walk": (function() {
                var _$rapyd$_anonfunc = function (visitor) {
                    var node;
                    node = this;
                    return visitor._visit(node, (function() {
                        var _$rapyd$_anonfunc = function () {
                            node.value._walk(visitor);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["visitor"];
                return _$rapyd$_anonfunc;
            })()
        });
        AST_Symbol = DEFNODE("Symbol", "scope name thedef", {
            "$propdoc": {
                "name": "[string] name of this symbol",
                "scope": "[AST_Scope/S] the current scope (not necessarily the definition scope)",
                "thedef": "[SymbolDef/S] the definition of this symbol"
            },
            "$documentation": "Base class for all symbols"
        });
        AST_SymbolAlias = DEFNODE("SymbolAlias", null, {
            "$documentation": "An alias used in an import statement or with statement"
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
            "getValue": (function() {
                var _$rapyd$_anonfunc = function () {
                    return this.value;
                };
                return _$rapyd$_anonfunc;
            })()
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
            "value": (function() {
                var _$rapyd$_anonfunc = function () {
                };
                return _$rapyd$_anonfunc;
            })().call(this)
        }, AST_Atom);
        AST_Hole = DEFNODE("Hole", null, {
            "$documentation": "A hole in an array",
            "value": (function() {
                var _$rapyd$_anonfunc = function () {
                };
                return _$rapyd$_anonfunc;
            })().call(this)
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
            this.stack = _$rapyd$_list_decorate([]);
        };

        TreeWalker.__argnames__ = ["callback"];

        TreeWalker.prototype = {
            "_visit": (function() {
                var _$rapyd$_anonfunc = function (node, descend) {
                    var ret;
                    this.stack.push(node);
                    ret = this.visit(node, (descend) ? (function() {
                        var _$rapyd$_anonfunc = function () {
                            descend.call(node);
                        };
                        return _$rapyd$_anonfunc;
                    })() : noop);
                    if (!ret && descend) {
                        descend.call(node);
                    }
                    this.stack.pop();
                    return ret;
                };

                _$rapyd$_anonfunc.__argnames__ = ["node", "descend"];
                return _$rapyd$_anonfunc;
            })(),
            "parent": (function() {
                var _$rapyd$_anonfunc = function (n) {
                    return this.stack[this.stack.length - 2 - (n || 0)];
                };

                _$rapyd$_anonfunc.__argnames__ = ["n"];
                return _$rapyd$_anonfunc;
            })(),
            "push": (function() {
                var _$rapyd$_anonfunc = function (node) {
                    this.stack.push(node);
                };

                _$rapyd$_anonfunc.__argnames__ = ["node"];
                return _$rapyd$_anonfunc;
            })(),
            "pop": (function() {
                var _$rapyd$_anonfunc = function () {
                    return this.stack.pop();
                };
                return _$rapyd$_anonfunc;
            })(),
            "self": (function() {
                var _$rapyd$_anonfunc = function () {
                    return this.stack[this.stack.length - 1];
                };
                return _$rapyd$_anonfunc;
            })(),
            "find_parent": (function() {
                var _$rapyd$_anonfunc = function (type) {
                    var stack, x, i;
                    stack = this.stack;
                    for (var _$rapyd$_Index22 = stack.length - 1; _$rapyd$_Index22 > -1; _$rapyd$_Index22-=1) {
                        i = _$rapyd$_Index22;
                        x = stack[i];
                        if (x instanceof type) {
                            return x;
                        }
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["type"];
                return _$rapyd$_anonfunc;
            })(),
            "in_boolean_context": (function() {
                var _$rapyd$_anonfunc = function () {
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
                };
                return _$rapyd$_anonfunc;
            })()
        };
        function Found() {
            if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
            Found.prototype.__init__.apply(this, arguments);
        }
        _$rapyd$_extends(Found, Exception);
        Found.prototype.__init__ = function __init__ () {
            Exception.prototype.__init__ && Exception.prototype.__init__.apply(this, arguments);
        };
        Found.prototype.__repr__ = function __repr__ () {
            return "<" + __name__ + "." + "Found" + " #" + this._$rapyd$_object_id + ">";
        };
        Found.prototype.__str__ = function __str__ () {
            return this.__repr__();
        };
        

        function has_calls(expression) {
            if (!expression) {
                return false;
            }
            try {
                expression.walk(new TreeWalker((function() {
                    var _$rapyd$_anonfunc = function (node) {
                        if ((node instanceof AST_BaseCall || node instanceof AST_ItemAccess)) {
                            throw new Found;
                        }
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["node"];
                    return _$rapyd$_anonfunc;
                })()));
            } catch (_$rapyd$_Exception) {
                if (_$rapyd$_Exception instanceof Found) {
                    return true;
                } else {
                    throw _$rapyd$_Exception;
                }
            }
            return false;
        };

        has_calls.__argnames__ = ["expression"];

        _$rapyd$_modules.ast.AST_Token = AST_Token;
        _$rapyd$_modules.ast.AST_Node = AST_Node;
        _$rapyd$_modules.ast.AST_Statement = AST_Statement;
        _$rapyd$_modules.ast.AST_Debugger = AST_Debugger;
        _$rapyd$_modules.ast.AST_Directive = AST_Directive;
        _$rapyd$_modules.ast.AST_SimpleStatement = AST_SimpleStatement;
        _$rapyd$_modules.ast.AST_Block = AST_Block;
        _$rapyd$_modules.ast.AST_BlockStatement = AST_BlockStatement;
        _$rapyd$_modules.ast.AST_EmptyStatement = AST_EmptyStatement;
        _$rapyd$_modules.ast.AST_StatementWithBody = AST_StatementWithBody;
        _$rapyd$_modules.ast.AST_DWLoop = AST_DWLoop;
        _$rapyd$_modules.ast.AST_Do = AST_Do;
        _$rapyd$_modules.ast.AST_While = AST_While;
        _$rapyd$_modules.ast.AST_ForIn = AST_ForIn;
        _$rapyd$_modules.ast.AST_ForJS = AST_ForJS;
        _$rapyd$_modules.ast.AST_ListComprehension = AST_ListComprehension;
        _$rapyd$_modules.ast.AST_SetComprehension = AST_SetComprehension;
        _$rapyd$_modules.ast.AST_DictComprehension = AST_DictComprehension;
        _$rapyd$_modules.ast.AST_GeneratorComprehension = AST_GeneratorComprehension;
        _$rapyd$_modules.ast.AST_With = AST_With;
        _$rapyd$_modules.ast.AST_WithClause = AST_WithClause;
        _$rapyd$_modules.ast.AST_Scope = AST_Scope;
        _$rapyd$_modules.ast.AST_Toplevel = AST_Toplevel;
        _$rapyd$_modules.ast.AST_Import = AST_Import;
        _$rapyd$_modules.ast.AST_Imports = AST_Imports;
        _$rapyd$_modules.ast.AST_Decorator = AST_Decorator;
        _$rapyd$_modules.ast.AST_Lambda = AST_Lambda;
        _$rapyd$_modules.ast.AST_Function = AST_Function;
        _$rapyd$_modules.ast.AST_Class = AST_Class;
        _$rapyd$_modules.ast.AST_Method = AST_Method;
        _$rapyd$_modules.ast.AST_Jump = AST_Jump;
        _$rapyd$_modules.ast.AST_Exit = AST_Exit;
        _$rapyd$_modules.ast.AST_Return = AST_Return;
        _$rapyd$_modules.ast.AST_Yield = AST_Yield;
        _$rapyd$_modules.ast.AST_Throw = AST_Throw;
        _$rapyd$_modules.ast.AST_LoopControl = AST_LoopControl;
        _$rapyd$_modules.ast.AST_Break = AST_Break;
        _$rapyd$_modules.ast.AST_Continue = AST_Continue;
        _$rapyd$_modules.ast.AST_If = AST_If;
        _$rapyd$_modules.ast.AST_Try = AST_Try;
        _$rapyd$_modules.ast.AST_Catch = AST_Catch;
        _$rapyd$_modules.ast.AST_Except = AST_Except;
        _$rapyd$_modules.ast.AST_Finally = AST_Finally;
        _$rapyd$_modules.ast.AST_Definitions = AST_Definitions;
        _$rapyd$_modules.ast.AST_Var = AST_Var;
        _$rapyd$_modules.ast.AST_Const = AST_Const;
        _$rapyd$_modules.ast.AST_VarDef = AST_VarDef;
        _$rapyd$_modules.ast.AST_BaseCall = AST_BaseCall;
        _$rapyd$_modules.ast.AST_Call = AST_Call;
        _$rapyd$_modules.ast.AST_ClassCall = AST_ClassCall;
        _$rapyd$_modules.ast.AST_New = AST_New;
        _$rapyd$_modules.ast.AST_Seq = AST_Seq;
        _$rapyd$_modules.ast.AST_PropAccess = AST_PropAccess;
        _$rapyd$_modules.ast.AST_Dot = AST_Dot;
        _$rapyd$_modules.ast.AST_Sub = AST_Sub;
        _$rapyd$_modules.ast.AST_ItemAccess = AST_ItemAccess;
        _$rapyd$_modules.ast.AST_Splice = AST_Splice;
        _$rapyd$_modules.ast.AST_Unary = AST_Unary;
        _$rapyd$_modules.ast.AST_UnaryPrefix = AST_UnaryPrefix;
        _$rapyd$_modules.ast.AST_UnaryPostfix = AST_UnaryPostfix;
        _$rapyd$_modules.ast.AST_Binary = AST_Binary;
        _$rapyd$_modules.ast.AST_Conditional = AST_Conditional;
        _$rapyd$_modules.ast.AST_Assign = AST_Assign;
        _$rapyd$_modules.ast.AST_Array = AST_Array;
        _$rapyd$_modules.ast.AST_Object = AST_Object;
        _$rapyd$_modules.ast.AST_ExpressiveObject = AST_ExpressiveObject;
        _$rapyd$_modules.ast.AST_ObjectProperty = AST_ObjectProperty;
        _$rapyd$_modules.ast.AST_ObjectKeyVal = AST_ObjectKeyVal;
        _$rapyd$_modules.ast.AST_Set = AST_Set;
        _$rapyd$_modules.ast.AST_SetItem = AST_SetItem;
        _$rapyd$_modules.ast.AST_Symbol = AST_Symbol;
        _$rapyd$_modules.ast.AST_SymbolAlias = AST_SymbolAlias;
        _$rapyd$_modules.ast.AST_SymbolDeclaration = AST_SymbolDeclaration;
        _$rapyd$_modules.ast.AST_SymbolVar = AST_SymbolVar;
        _$rapyd$_modules.ast.AST_ImportedVar = AST_ImportedVar;
        _$rapyd$_modules.ast.AST_SymbolConst = AST_SymbolConst;
        _$rapyd$_modules.ast.AST_SymbolNonlocal = AST_SymbolNonlocal;
        _$rapyd$_modules.ast.AST_SymbolFunarg = AST_SymbolFunarg;
        _$rapyd$_modules.ast.AST_SymbolDefun = AST_SymbolDefun;
        _$rapyd$_modules.ast.AST_SymbolLambda = AST_SymbolLambda;
        _$rapyd$_modules.ast.AST_SymbolCatch = AST_SymbolCatch;
        _$rapyd$_modules.ast.AST_SymbolRef = AST_SymbolRef;
        _$rapyd$_modules.ast.AST_This = AST_This;
        _$rapyd$_modules.ast.AST_Constant = AST_Constant;
        _$rapyd$_modules.ast.AST_String = AST_String;
        _$rapyd$_modules.ast.AST_Verbatim = AST_Verbatim;
        _$rapyd$_modules.ast.AST_Number = AST_Number;
        _$rapyd$_modules.ast.AST_RegExp = AST_RegExp;
        _$rapyd$_modules.ast.AST_Atom = AST_Atom;
        _$rapyd$_modules.ast.AST_Null = AST_Null;
        _$rapyd$_modules.ast.AST_NaN = AST_NaN;
        _$rapyd$_modules.ast.AST_Undefined = AST_Undefined;
        _$rapyd$_modules.ast.AST_Hole = AST_Hole;
        _$rapyd$_modules.ast.AST_Infinity = AST_Infinity;
        _$rapyd$_modules.ast.AST_Boolean = AST_Boolean;
        _$rapyd$_modules.ast.AST_False = AST_False;
        _$rapyd$_modules.ast.AST_True = AST_True;
        _$rapyd$_modules.ast.DEFNODE = DEFNODE;
        _$rapyd$_modules.ast.walk_body = walk_body;
        _$rapyd$_modules.ast.TreeWalker = TreeWalker;
        _$rapyd$_modules.ast.Found = Found;
        _$rapyd$_modules.ast.has_calls = has_calls;
    })();

    (function(){
        var __name__ = "tokenizer";
        var RE_HEX_NUMBER, RE_OCT_NUMBER, RE_DEC_NUMBER, UNARY_POSTFIX, OPERATOR_CHARS, INVALID_OPERATORS, ASCII_CONTROL_CHARS, HEX_PAT, NAME_PAT, OPERATORS, OP_MAP, WHITESPACE_CHARS, PUNC_BEFORE_EXPRESSION, PUNC_CHARS, REGEXP_MODIFIERS, KEYWORDS, KEYWORDS_ATOM, RESERVED_WORDS, KEYWORDS_BEFORE_EXPRESSION, ALL_KEYWORDS, IDENTIFIER_PAT, UNICODE, EX_EOF;
        var ALIAS_MAP = _$rapyd$_modules.unicode_aliases.ALIAS_MAP;
        
        var make_predicate = _$rapyd$_modules.utils.make_predicate;
        var characters = _$rapyd$_modules.utils.characters;
        
        var AST_Token = _$rapyd$_modules.ast.AST_Token;
        
        var SyntaxError = _$rapyd$_modules.errors.SyntaxError;
        
        RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
        RE_OCT_NUMBER = /^0[0-7]+$/;
        RE_DEC_NUMBER = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i;
        UNARY_POSTFIX = make_predicate(_$rapyd$_list_decorate([ "--", "++" ]));
        OPERATOR_CHARS = make_predicate(characters("+-*&%=<>!?|~^@"));
        INVALID_OPERATORS = (function(){
            var s = _$rapyd$_set();
            s.jsset.add("++");
            s.jsset.add("--");
            s.jsset.add("===");
            s.jsset.add("!==");
            return s;
        })();
        ASCII_CONTROL_CHARS = {
            "a": 7,
            "b": 8,
            "f": 12,
            "n": 10,
            "r": 13,
            "t": 9,
            "v": 11
        };
        HEX_PAT = /[a-fA-F0-9]/;
        NAME_PAT = /[a-zA-Z ]/;
        OPERATORS = make_predicate(_$rapyd$_list_decorate([ "in", "instanceof", "typeof", "new", "void", "del", "++", "--", "+", "-", "not", "~", "&", "|", "^", "**", "*", "//", "/", "%", ">>", "<<", ">>>", "<", ">", "<=", ">=", "==", "===", "is", "!=", "!==", "?", "=", "+=", "-=", "//=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=", "and", "or", "@" ]));
        OP_MAP = {
            "or": "||",
            "and": "&&",
            "not": "!",
            "del": "delete",
            "None": "null",
            "is": "==="
        };
        WHITESPACE_CHARS = make_predicate(characters("  \n\r\t\f\u000b​᠎           \u202f 　"));
        PUNC_BEFORE_EXPRESSION = make_predicate(characters("[{(,.;:"));
        PUNC_CHARS = make_predicate(characters("[]{}(),;:"));
        REGEXP_MODIFIERS = make_predicate(characters("gmsiy"));
        KEYWORDS = "as break case class const continue debugger def del do elif else except finally for from if import in instanceof is new nonlocal pass raise return yield switch try typeof var void while with or and not delete default";
        KEYWORDS_ATOM = "False None True";
        RESERVED_WORDS = "abstract await boolean byte char delete default double enum export extends final float goto implements int interface long native package private protected public short static super synchronized this throws transient volatile" + " " + KEYWORDS_ATOM + " " + KEYWORDS;
        KEYWORDS_BEFORE_EXPRESSION = "return yield new del raise elif else if";
        ALL_KEYWORDS = RESERVED_WORDS + " " + KEYWORDS_BEFORE_EXPRESSION;
        KEYWORDS = make_predicate(KEYWORDS);
        RESERVED_WORDS = make_predicate(RESERVED_WORDS);
        KEYWORDS_BEFORE_EXPRESSION = make_predicate(KEYWORDS_BEFORE_EXPRESSION);
        KEYWORDS_ATOM = make_predicate(KEYWORDS_ATOM);
        IDENTIFIER_PAT = /^[a-z_$][_a-z0-9$]*$/i;
        function is_string_modifier(val) {
            var ch;
            var _$rapyd$_Iter23 = _$rapyd$_Iterable(val);
            for (var _$rapyd$_Index23 = 0; _$rapyd$_Index23 < _$rapyd$_Iter23.length; _$rapyd$_Index23++) {
                ch = _$rapyd$_Iter23[_$rapyd$_Index23];
                if ("vruVRU".indexOf(ch) === -1) {
                    return false;
                }
            }
            return true;
        };

        is_string_modifier.__argnames__ = ["val"];

        function is_letter(code) {
            return code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 170 && UNICODE.letter.test(String.fromCharCode(code));
        };

        is_letter.__argnames__ = ["code"];

        function is_digit(code) {
            return code >= 48 && code <= 57;
        };

        is_digit.__argnames__ = ["code"];

        function is_alphanumeric_char(code) {
            return is_digit(code) || is_letter(code);
        };

        is_alphanumeric_char.__argnames__ = ["code"];

        function is_unicode_combining_mark(ch) {
            return UNICODE.non_spacing_mark.test(ch) || UNICODE.space_combining_mark.test(ch);
        };

        is_unicode_combining_mark.__argnames__ = ["ch"];

        function is_unicode_connector_punctuation(ch) {
            return UNICODE.connector_punctuation.test(ch);
        };

        is_unicode_connector_punctuation.__argnames__ = ["ch"];

        function is_identifier(name) {
            return !RESERVED_WORDS(name) && IDENTIFIER_PAT.test(name);
        };

        is_identifier.__argnames__ = ["name"];

        function is_identifier_start(code) {
            return code === 36 || code === 95 || is_letter(code);
        };

        is_identifier_start.__argnames__ = ["code"];

        function is_identifier_char(ch) {
            var code;
            code = ch.charCodeAt(0);
            return is_identifier_start(code) || is_digit(code) || code === 8204 || code === 8205 || is_unicode_combining_mark(ch) || is_unicode_connector_punctuation(ch);
        };

        is_identifier_char.__argnames__ = ["ch"];

        function parse_js_number(num) {
            if (RE_HEX_NUMBER.test(num)) {
                return parseInt(num.substr(2), 16);
            } else if (RE_OCT_NUMBER.test(num)) {
                return parseInt(num.substr(1), 8);
            } else if (RE_DEC_NUMBER.test(num)) {
                return parseFloat(num);
            }
        };

        parse_js_number.__argnames__ = ["num"];

        UNICODE = {
            "letter": new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0523\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971\\u0972\\u097B-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D3D\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8B\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10D0-\\u10FA\\u10FC\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19A9\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u2094\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2C6F\\u2C71-\\u2C7D\\u2C80-\\u2CE4\\u2D00-\\u2D25\\u2D30-\\u2D65\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31B7\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FC3\\uA000-\\uA48C\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA65F\\uA662-\\uA66E\\uA67F-\\uA697\\uA717-\\uA71F\\uA722-\\uA788\\uA78B\\uA78C\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA90A-\\uA925\\uA930-\\uA946\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAC00\\uD7A3\\uF900-\\uFA2D\\uFA30-\\uFA6A\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),
            "non_spacing_mark": new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"),
            "space_combining_mark": new RegExp("[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]"),
            "connector_punctuation": new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]")
        };
        function is_token(token, type, val) {
            return token.type === type && (val === null || val === undefined || token.value === val);
        };

        is_token.__argnames__ = ["token", "type", "val"];

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
                "index_or_slice": [ false ],
                "expecting_object_literal_key": false
            };
            function peek() {
                return S.text.charAt(S.pos);
            };

            function prevChar() {
                return S.text.charAt(S.tokpos - 1);
            };

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
            };

            next.__argnames__ = ["signal_eof", "in_string"];

            function find(what, signal_eof) {
                var pos;
                pos = S.text.indexOf(what, S.pos);
                if (signal_eof && pos === -1) {
                    throw EX_EOF;
                }
                return pos;
            };

            find.__argnames__ = ["what", "signal_eof"];

            function start_token() {
                S.tokline = S.line;
                S.tokcol = S.col;
                S.tokpos = S.pos;
            };

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
                    for (var _$rapyd$_Index24 = 0; _$rapyd$_Index24 < ret.comments_before.length; _$rapyd$_Index24++) {
                        i = _$rapyd$_Index24;
                        ret.nlb = ret.nlb || ret.comments_before[i].nlb;
                    }
                }
                if (!keep_newline) {
                    S.newline_before = false;
                }
                if (type === "punc") {
                    if (value === ":" && !S.index_or_slice[S.index_or_slice.length-1] && !S.expecting_object_literal_key && (!S.text.substring(S.pos + 1, find("\n")).trim() || !S.text.substring(S.pos + 1, find("#")).trim())) {
                        S.newblock = true;
                        S.indentation_matters.push(true);
                    }
                    if (value === "[") {
                        if (S.prev && (S.prev.type === "name" || S.prev.type === "punc" && ")]".indexOf(S.prev.value) !== -1)) {
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
            };

            token.__argnames__ = ["type", "value", "is_comment", "keep_newline"];

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
            };

            function test_indent_token(leading_whitespace) {
                var most_recent;
                most_recent = S.whitespace_before[S.whitespace_before.length-1] || "";
                S.endblock = false;
                if (S.indentation_matters[S.indentation_matters.length-1] && leading_whitespace !== most_recent) {
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
            };

            test_indent_token.__argnames__ = ["leading_whitespace"];

            function read_while(pred) {
                var ret, i, ch;
                ret = "";
                i = 0;
                ch = "";
                while ((ch = peek()) && pred(ch, i)) {
                    i += 1;
                    ret += next();
                }
                return ret;
            };

            read_while.__argnames__ = ["pred"];

            function parse_error(err, is_eof) {
                throw new SyntaxError(err, filename, S.tokline, S.tokcol, S.tokpos, is_eof);
            };

            parse_error.__argnames__ = ["err", "is_eof"];

            function read_num(prefix) {
                var has_e, has_x, has_dot, num, valid, seen;
                has_e = false;
                has_x = false;
                has_dot = prefix === ".";
                if (!prefix && peek() === "0" && S.text.charAt(S.pos + 1) === "b") {
                    [next(), next()];
                    num = read_while((function() {
                        var _$rapyd$_anonfunc = function (ch) {
                            return ch === "0" || ch === "1";
                        };

                        _$rapyd$_anonfunc.__argnames__ = ["ch"];
                        return _$rapyd$_anonfunc;
                    })());
                    valid = parseInt(num, 2);
                    if (isNaN(valid)) {
                        parse_error("Invalid syntax for a binary number");
                    }
                    return token("num", valid);
                }
                seen = [];
                num = read_while((function() {
                    var _$rapyd$_anonfunc = function (ch, i) {
                        seen.push(ch);
                        if (ch === "x" || ch === "X") {
                            if (has_x || seen.length !== 2 || seen[0] !== "0") {
                                return false;
                            }
                            has_x = true;
                            return true;
                        } else if (ch === "e" || ch === "E") {
                            if (has_x) {
                                return true;
                            }
                            if (has_e || (i === 0 || typeof i === "object" && _$rapyd$_equals(i, 0))) {
                                return false;
                            }
                            has_e = true;
                            return true;
                        } else if (ch === "-") {
                            if (i === 0 && !prefix) {
                                return true;
                            }
                            if (has_e && seen[i - 1].toLowerCase() === "e") {
                                return true;
                            }
                            return false;
                        } else if (ch === "+") {
                            if (has_e && seen[i - 1].toLowerCase() === "e") {
                                return true;
                            }
                            return false;
                        } else if (ch === ".") {
                            return (!has_dot && !has_x && !has_e) ? has_dot = true : false;
                        }
                        return is_alphanumeric_char(ch.charCodeAt(0));
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["ch", "i"];
                    return _$rapyd$_anonfunc;
                })());
                if (prefix) {
                    num = prefix + num;
                }
                valid = parse_js_number(num);
                if (!isNaN(valid)) {
                    return token("num", valid);
                } else {
                    parse_error("Invalid syntax: " + num);
                }
            };

            read_num.__argnames__ = ["prefix"];

            function read_hex_digits(count) {
                var ans, nval;
                ans = "";
                while (count > 0) {
                    count -= 1;
                    if (!HEX_PAT.test(peek())) {
                        return ans;
                    }
                    ans += next();
                }
                nval = parseInt(ans, 16);
                if (nval > 1114111) {
                    return ans;
                }
                return nval;
            };

            read_hex_digits.__argnames__ = ["count"];

            function read_escape_sequence() {
                var q, octal, code, name, key;
                q = next(true);
                if (q === "\n") {
                    return "";
                }
                if (q === "\\") {
                    return q;
                }
                if ("\"'".indexOf(q) !== -1) {
                    return q;
                }
                if (ASCII_CONTROL_CHARS.hasOwnProperty(q)) {
                    return String.fromCharCode(ASCII_CONTROL_CHARS[q]);
                }
                if ("0" <= q && q <= "7") {
                    octal = q;
                    if ("0" <= (_$rapyd$_cond_temp = peek()) && _$rapyd$_cond_temp <= "7") {
                        octal += next();
                    }
                    if ("0" <= (_$rapyd$_cond_temp = peek()) && _$rapyd$_cond_temp <= "7") {
                        octal += next();
                    }
                    code = parseInt(octal, 8);
                    if (isNaN(code)) {
                        return "\\" + octal;
                    }
                    return String.fromCharCode(code);
                }
                if (q === "x") {
                    code = read_hex_digits(2);
                    if (typeof code === "number") {
                        return String.fromCharCode(code);
                    }
                    return "\\x" + code;
                }
                if (q === "u") {
                    code = read_hex_digits(4);
                    if (typeof code === "number") {
                        return String.fromCharCode(code);
                    }
                    return "\\u" + code;
                }
                if (q === "U") {
                    code = read_hex_digits(8);
                    if (typeof code === "number") {
                        if (code <= 65535) {
                            return String.fromCharCode(code);
                        }
                        code -= 65536;
                        return String.fromCharCode(55296 + (code >> 10), 56320 + (code & 1023));
                    }
                    return "\\U" + code;
                }
                if (q === "N" && peek() === "{") {
                    next();
                    name = read_while((function() {
                        var _$rapyd$_anonfunc = function (ch) {
                            return NAME_PAT.test(ch);
                        };

                        _$rapyd$_anonfunc.__argnames__ = ["ch"];
                        return _$rapyd$_anonfunc;
                    })());
                    if (peek() !== "}") {
                        return "\\N{" + name;
                    }
                    next();
                    key = (name || "").toLowerCase();
                    if (!name || !Object.prototype.hasOwnProperty.call(ALIAS_MAP, key)) {
                        return "\\N{" + name + "}";
                    }
                    code = ALIAS_MAP[key];
                    if (code <= 65535) {
                        return String.fromCharCode(code);
                    }
                    code -= 65536;
                    return String.fromCharCode(55296 + (code >> 10), 56320 + (code & 1023));
                }
                return "\\" + q;
            };

            function with_eof_error(eof_error, cont) {
                return (function() {
                    var _$rapyd$_anonfunc = function () {
                        try {
                            return cont.apply(null, arguments);
                        } catch (_$rapyd$_Exception) {
                            var ex = _$rapyd$_Exception;
                            if (ex === EX_EOF) {
                                parse_error(eof_error, true);
                            } else {
                                throw _$rapyd$_Exception;
                            }
                        }
                    };
                    return _$rapyd$_anonfunc;
                })();
            };

            with_eof_error.__argnames__ = ["eof_error", "cont"];

            read_string = with_eof_error("Unterminated string constant", (function() {
                var _$rapyd$_anonfunc = function (is_raw_literal, is_js_literal) {
                    var quote, tok_type, ret, is_multiline, ch;
                    quote = next();
                    tok_type = (is_js_literal) ? "js" : "string";
                    ret = "";
                    is_multiline = false;
                    if (peek() === quote) {
                        next(true);
                        if (peek() === quote) {
                            next(true);
                            is_multiline = true;
                        } else {
                            return token(tok_type, "");
                        }
                    }
                    while (ch = next(true)) {
                        if (ch === "\n" && !is_multiline) {
                            parse_error("End of line while scanning string literal");
                        }
                        if (ch === "\\") {
                            ret += (is_raw_literal) ? "\\" + next(true) : read_escape_sequence();
                            continue;
                        }
                        if (ch === quote) {
                            if (!is_multiline) {
                                break;
                            }
                            if (peek() === quote) {
                                next();
                                if (peek() === quote) {
                                    next();
                                    break;
                                } else {
                                    ch += quote;
                                }
                            }
                        }
                        ret += ch;
                    }
                    return token(tok_type, ret);
                };

                _$rapyd$_anonfunc.__argnames__ = ["is_raw_literal", "is_js_literal"];
                return _$rapyd$_anonfunc;
            })());
            function read_line_comment() {
                var shebang = (arguments[0] === undefined || ( 0 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? read_line_comment.__defaults__.shebang : arguments[0];
                var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
                if (_$rapyd$_kwargs_obj === null || typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [_$rapyd$_kwargs_symbol] !== true) _$rapyd$_kwargs_obj = {};
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
                return token((shebang) ? "shebang" : "comment1", ret, true);
            };

            read_line_comment.__defaults__ = {
                shebang:false
            };

            read_line_comment.__handles_kwarg_interpolation__ = true;

            read_line_comment.__argnames__ = ["shebang"];

            function read_name() {
                var name, ch, _$rapyd$_chain_assign_temp;
                _$rapyd$_chain_assign_temp = "";
                name = _$rapyd$_chain_assign_temp;
                ch = _$rapyd$_chain_assign_temp;
;
                while ((ch = peek()) !== null) {
                    if (ch === "\\") {
                        if (S.text.charAt(S.pos + 1) === "\n") {
                            S.pos += 2;
                            continue;
                        }
                        break;
                    } else if (is_identifier_char(ch)) {
                        name += next();
                    } else {
                        break;
                    }
                }
                return name;
            };

            read_regexp = with_eof_error("Unterminated regular expression", (function() {
                var _$rapyd$_anonfunc = function () {
                    var prev_backslash, regexp, ch, _$rapyd$_chain_assign_temp, in_class, verbose_regexp, in_comment, mods;
                    prev_backslash = false;
                    _$rapyd$_chain_assign_temp = "";
                    regexp = _$rapyd$_chain_assign_temp;
                    ch = _$rapyd$_chain_assign_temp;
;
                    in_class = false;
                    verbose_regexp = false;
                    in_comment = false;
                    if (peek() === "/") {
                        next(true);
                        if (peek() === "/") {
                            verbose_regexp = true;
                            next(true);
                        } else {
                            mods = read_name();
                            return token("regexp", new RegExp(regexp, mods));
                        }
                    }
                    while (ch = next(true)) {
                        if (in_comment) {
                            if (ch === "\n") {
                                in_comment = false;
                            }
                            continue;
                        }
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
                            if (verbose_regexp) {
                                if (peek() !== "/") {
                                    regexp += "\\/";
                                    continue;
                                }
                                next(true);
                                if (peek() !== "/") {
                                    regexp += "\\/\\/";
                                    continue;
                                }
                                next(true);
                            }
                            break;
                        } else if (ch === "\\") {
                            prev_backslash = true;
                        } else if (verbose_regexp && !in_class && " \n\r\t".indexOf(ch) !== -1) {
                        } else if (verbose_regexp && !in_class && ch === "#") {
                            in_comment = true;
                        } else {
                            regexp += ch;
                        }
                    }
                    mods = read_name();
                    return token("regexp", new RegExp(regexp, mods));
                };
                return _$rapyd$_anonfunc;
            })());
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
                };

                grow.__argnames__ = ["op"];

                op = grow(prefix || next());
                if (INVALID_OPERATORS.has(op)) {
                    parse_error("Invalid operator «" + op + "»");
                }
                if (op === "!") {
                    return token("punc", op);
                }
                return token("operator", op);
            };

            read_operator.__argnames__ = ["prefix"];

            function handle_slash() {
                next();
                return (S.regex_allowed) ? read_regexp("") : read_operator("/");
            };

            function handle_dot() {
                next();
                return (is_digit(peek().charCodeAt(0))) ? read_num(".") : token("punc", ".");
            };

            function read_word() {
                var word;
                word = read_name();
                return (KEYWORDS_ATOM(word)) ? token("atom", word) : (!KEYWORDS(word)) ? token("name", word) : (OPERATORS(word) && prevChar() !== ".") ? token("operator", word) : token("keyword", word);
            };

            function next_token() {
                var indent, ch, code, tmp_, regex_allowed, tok, mods, stok;
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
                    return read_string(false);
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
                if (is_identifier_start(code)) {
                    tok = read_word();
                    if ("'\"".indexOf(peek()) !== -1 && is_string_modifier(tok.value)) {
                        mods = tok.value.toLowerCase();
                        stok = read_string(mods.indexOf("r") !== -1, mods.indexOf("v") !== -1);
                        tok.endpos = stok.endpos;
                        tok.value = stok.value;
                        tok.type = stok.type;
                    }
                    return tok;
                }
                parse_error("Unexpected character «" + ch + "»");
            };

            next_token.context = (function() {
                var _$rapyd$_anonfunc = function (nc) {
                    if (nc) {
                        S = nc;
                    }
                    return S;
                };

                _$rapyd$_anonfunc.__argnames__ = ["nc"];
                return _$rapyd$_anonfunc;
            })();
            return next_token;
        };

        tokenizer.__argnames__ = ["$TEXT", "filename"];

        _$rapyd$_modules.tokenizer.RE_HEX_NUMBER = RE_HEX_NUMBER;
        _$rapyd$_modules.tokenizer.RE_OCT_NUMBER = RE_OCT_NUMBER;
        _$rapyd$_modules.tokenizer.RE_DEC_NUMBER = RE_DEC_NUMBER;
        _$rapyd$_modules.tokenizer.UNARY_POSTFIX = UNARY_POSTFIX;
        _$rapyd$_modules.tokenizer.OPERATOR_CHARS = OPERATOR_CHARS;
        _$rapyd$_modules.tokenizer.INVALID_OPERATORS = INVALID_OPERATORS;
        _$rapyd$_modules.tokenizer.ASCII_CONTROL_CHARS = ASCII_CONTROL_CHARS;
        _$rapyd$_modules.tokenizer.HEX_PAT = HEX_PAT;
        _$rapyd$_modules.tokenizer.NAME_PAT = NAME_PAT;
        _$rapyd$_modules.tokenizer.OPERATORS = OPERATORS;
        _$rapyd$_modules.tokenizer.OP_MAP = OP_MAP;
        _$rapyd$_modules.tokenizer.WHITESPACE_CHARS = WHITESPACE_CHARS;
        _$rapyd$_modules.tokenizer.PUNC_BEFORE_EXPRESSION = PUNC_BEFORE_EXPRESSION;
        _$rapyd$_modules.tokenizer.PUNC_CHARS = PUNC_CHARS;
        _$rapyd$_modules.tokenizer.REGEXP_MODIFIERS = REGEXP_MODIFIERS;
        _$rapyd$_modules.tokenizer.KEYWORDS = KEYWORDS;
        _$rapyd$_modules.tokenizer.KEYWORDS_ATOM = KEYWORDS_ATOM;
        _$rapyd$_modules.tokenizer.RESERVED_WORDS = RESERVED_WORDS;
        _$rapyd$_modules.tokenizer.KEYWORDS_BEFORE_EXPRESSION = KEYWORDS_BEFORE_EXPRESSION;
        _$rapyd$_modules.tokenizer.ALL_KEYWORDS = ALL_KEYWORDS;
        _$rapyd$_modules.tokenizer.IDENTIFIER_PAT = IDENTIFIER_PAT;
        _$rapyd$_modules.tokenizer.UNICODE = UNICODE;
        _$rapyd$_modules.tokenizer.EX_EOF = EX_EOF;
        _$rapyd$_modules.tokenizer.is_string_modifier = is_string_modifier;
        _$rapyd$_modules.tokenizer.is_letter = is_letter;
        _$rapyd$_modules.tokenizer.is_digit = is_digit;
        _$rapyd$_modules.tokenizer.is_alphanumeric_char = is_alphanumeric_char;
        _$rapyd$_modules.tokenizer.is_unicode_combining_mark = is_unicode_combining_mark;
        _$rapyd$_modules.tokenizer.is_unicode_connector_punctuation = is_unicode_connector_punctuation;
        _$rapyd$_modules.tokenizer.is_identifier = is_identifier;
        _$rapyd$_modules.tokenizer.is_identifier_start = is_identifier_start;
        _$rapyd$_modules.tokenizer.is_identifier_char = is_identifier_char;
        _$rapyd$_modules.tokenizer.parse_js_number = parse_js_number;
        _$rapyd$_modules.tokenizer.is_token = is_token;
        _$rapyd$_modules.tokenizer.tokenizer = tokenizer;
    })();

    (function(){
        var __name__ = "parse";
        var COMPILER_VERSION, BASELIB_ITEMS, BASELIB_FUNCS, BASELIB_ITERTOOLS, NATIVE_CLASSES, ERROR_CLASSES, COMMON_STATIC, UNARY_PREFIX, ASSIGNMENT, PRECEDENCE, STATEMENTS_WITH_LABELS, ATOMIC_START_TOKEN, compile_time_decorators;
        var make_predicate = _$rapyd$_modules.utils.make_predicate;
        var array_to_hash = _$rapyd$_modules.utils.array_to_hash;
        var defaults = _$rapyd$_modules.utils.defaults;
        
        var SyntaxError = _$rapyd$_modules.errors.SyntaxError;
        var ImportError = _$rapyd$_modules.errors.ImportError;
        
        var AST_Array = _$rapyd$_modules.ast.AST_Array;
        var AST_Assign = _$rapyd$_modules.ast.AST_Assign;
        var AST_Binary = _$rapyd$_modules.ast.AST_Binary;
        var AST_BlockStatement = _$rapyd$_modules.ast.AST_BlockStatement;
        var AST_Break = _$rapyd$_modules.ast.AST_Break;
        var AST_Call = _$rapyd$_modules.ast.AST_Call;
        var AST_Catch = _$rapyd$_modules.ast.AST_Catch;
        var AST_Class = _$rapyd$_modules.ast.AST_Class;
        var AST_ClassCall = _$rapyd$_modules.ast.AST_ClassCall;
        var AST_Conditional = _$rapyd$_modules.ast.AST_Conditional;
        var AST_Const = _$rapyd$_modules.ast.AST_Const;
        var AST_Constant = _$rapyd$_modules.ast.AST_Constant;
        var AST_Continue = _$rapyd$_modules.ast.AST_Continue;
        var AST_DWLoop = _$rapyd$_modules.ast.AST_DWLoop;
        var AST_Debugger = _$rapyd$_modules.ast.AST_Debugger;
        var AST_Decorator = _$rapyd$_modules.ast.AST_Decorator;
        var AST_Definitions = _$rapyd$_modules.ast.AST_Definitions;
        var AST_DictComprehension = _$rapyd$_modules.ast.AST_DictComprehension;
        var AST_Directive = _$rapyd$_modules.ast.AST_Directive;
        var AST_Do = _$rapyd$_modules.ast.AST_Do;
        var AST_Dot = _$rapyd$_modules.ast.AST_Dot;
        var AST_EmptyStatement = _$rapyd$_modules.ast.AST_EmptyStatement;
        var AST_Except = _$rapyd$_modules.ast.AST_Except;
        var AST_ExpressiveObject = _$rapyd$_modules.ast.AST_ExpressiveObject;
        var AST_False = _$rapyd$_modules.ast.AST_False;
        var AST_Finally = _$rapyd$_modules.ast.AST_Finally;
        var AST_ForIn = _$rapyd$_modules.ast.AST_ForIn;
        var AST_ForJS = _$rapyd$_modules.ast.AST_ForJS;
        var AST_Function = _$rapyd$_modules.ast.AST_Function;
        var AST_GeneratorComprehension = _$rapyd$_modules.ast.AST_GeneratorComprehension;
        var AST_Hole = _$rapyd$_modules.ast.AST_Hole;
        var AST_If = _$rapyd$_modules.ast.AST_If;
        var AST_Import = _$rapyd$_modules.ast.AST_Import;
        var AST_ImportedVar = _$rapyd$_modules.ast.AST_ImportedVar;
        var AST_Imports = _$rapyd$_modules.ast.AST_Imports;
        var AST_ListComprehension = _$rapyd$_modules.ast.AST_ListComprehension;
        var AST_Method = _$rapyd$_modules.ast.AST_Method;
        var AST_New = _$rapyd$_modules.ast.AST_New;
        var AST_Null = _$rapyd$_modules.ast.AST_Null;
        var AST_Number = _$rapyd$_modules.ast.AST_Number;
        var AST_Object = _$rapyd$_modules.ast.AST_Object;
        var AST_ObjectKeyVal = _$rapyd$_modules.ast.AST_ObjectKeyVal;
        var AST_PropAccess = _$rapyd$_modules.ast.AST_PropAccess;
        var AST_RegExp = _$rapyd$_modules.ast.AST_RegExp;
        var AST_Return = _$rapyd$_modules.ast.AST_Return;
        var AST_Scope = _$rapyd$_modules.ast.AST_Scope;
        var AST_Set = _$rapyd$_modules.ast.AST_Set;
        var AST_SetComprehension = _$rapyd$_modules.ast.AST_SetComprehension;
        var AST_SetItem = _$rapyd$_modules.ast.AST_SetItem;
        var AST_Seq = _$rapyd$_modules.ast.AST_Seq;
        var AST_SimpleStatement = _$rapyd$_modules.ast.AST_SimpleStatement;
        var AST_Splice = _$rapyd$_modules.ast.AST_Splice;
        var AST_String = _$rapyd$_modules.ast.AST_String;
        var AST_Sub = _$rapyd$_modules.ast.AST_Sub;
        var AST_ItemAccess = _$rapyd$_modules.ast.AST_ItemAccess;
        var AST_SymbolAlias = _$rapyd$_modules.ast.AST_SymbolAlias;
        var AST_SymbolCatch = _$rapyd$_modules.ast.AST_SymbolCatch;
        var AST_SymbolConst = _$rapyd$_modules.ast.AST_SymbolConst;
        var AST_SymbolDefun = _$rapyd$_modules.ast.AST_SymbolDefun;
        var AST_SymbolFunarg = _$rapyd$_modules.ast.AST_SymbolFunarg;
        var AST_SymbolLambda = _$rapyd$_modules.ast.AST_SymbolLambda;
        var AST_SymbolNonlocal = _$rapyd$_modules.ast.AST_SymbolNonlocal;
        var AST_SymbolRef = _$rapyd$_modules.ast.AST_SymbolRef;
        var AST_SymbolVar = _$rapyd$_modules.ast.AST_SymbolVar;
        var AST_This = _$rapyd$_modules.ast.AST_This;
        var AST_Throw = _$rapyd$_modules.ast.AST_Throw;
        var AST_Toplevel = _$rapyd$_modules.ast.AST_Toplevel;
        var AST_True = _$rapyd$_modules.ast.AST_True;
        var AST_Try = _$rapyd$_modules.ast.AST_Try;
        var AST_UnaryPostfix = _$rapyd$_modules.ast.AST_UnaryPostfix;
        var AST_UnaryPrefix = _$rapyd$_modules.ast.AST_UnaryPrefix;
        var AST_Undefined = _$rapyd$_modules.ast.AST_Undefined;
        var AST_Var = _$rapyd$_modules.ast.AST_Var;
        var AST_VarDef = _$rapyd$_modules.ast.AST_VarDef;
        var AST_Verbatim = _$rapyd$_modules.ast.AST_Verbatim;
        var AST_While = _$rapyd$_modules.ast.AST_While;
        var AST_With = _$rapyd$_modules.ast.AST_With;
        var AST_WithClause = _$rapyd$_modules.ast.AST_WithClause;
        var AST_Yield = _$rapyd$_modules.ast.AST_Yield;
        
        var tokenizer = _$rapyd$_modules.tokenizer.tokenizer;
        var is_token = _$rapyd$_modules.tokenizer.is_token;
        var UNARY_POSTFIX = _$rapyd$_modules.tokenizer.UNARY_POSTFIX;
        
        COMPILER_VERSION = "4ad4c7ca8b2bf36ec8e4ce39382508842db611f7";
        BASELIB_ITEMS = (function(){
            var s = _$rapyd$_set();
            s.jsset.add("dir");
            s.jsset.add("enumerate");
            s.jsset.add("range");
            s.jsset.add("reversed");
            s.jsset.add("getattr");
            s.jsset.add("setattr");
            s.jsset.add("hasattr");
            s.jsset.add("iter");
            s.jsset.add("len");
            s.jsset.add("abs");
            s.jsset.add("max");
            s.jsset.add("min");
            s.jsset.add("sum");
            s.jsset.add("map");
            s.jsset.add("zip");
            s.jsset.add("filter");
            s.jsset.add("ord");
            s.jsset.add("chr");
            s.jsset.add("callable");
            s.jsset.add("bin");
            s.jsset.add("hex");
            return s;
        })();
        BASELIB_FUNCS = (function(){
            var s = _$rapyd$_set();
            s.jsset.add("len");
            s.jsset.add("abs");
            s.jsset.add("max");
            s.jsset.add("min");
            return s;
        })();
        BASELIB_ITERTOOLS = (function(){
            var s = _$rapyd$_set();
            s.jsset.add("sum");
            s.jsset.add("map");
            s.jsset.add("zip");
            s.jsset.add("filter");
            return s;
        })();
        NATIVE_CLASSES = {
            "Image": {},
            "RegExp": {},
            "Error": {},
            "EvalError": {},
            "InternalError": {},
            "RangeError": {},
            "ReferenceError": {},
            "SyntaxError": {},
            "TypeError": {},
            "URIError": {},
            "Object": {
                "static": _$rapyd$_list_decorate([ "getOwnPropertyNames", "keys", "create", "defineProperty", "defineProperties", "getPrototypeOf", "setPrototypeOf", "assign" ])
            },
            "String": {
                "static": _$rapyd$_list_decorate([ "fromCharCode" ])
            },
            "Array": {
                "static": _$rapyd$_list_decorate([ "isArray", "from", "of" ])
            },
            "Function": {},
            "Date": {
                "static": _$rapyd$_list_decorate([ "UTC", "now", "parse" ])
            },
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
            "XMLHttpRequest": {},
            "TextEncoder": {},
            "TextDecoder": {},
            "MouseEvent": {},
            "Event": {},
            "CustomEvent": {},
            "Blob": {}
        };
        ERROR_CLASSES = {
            "Exception": {},
            "AttributeError": {},
            "IndexError": {},
            "KeyError": {},
            "ValueError": {}
        };
        COMMON_STATIC = _$rapyd$_list_decorate([ "call", "apply", "bind", "toString" ]);
        UNARY_PREFIX = make_predicate(_$rapyd$_list_decorate([ "typeof", "void", "delete", "--", "++", "!", "~", "-", "+", "@" ]));
        ASSIGNMENT = make_predicate(_$rapyd$_list_decorate([ "=", "+=", "-=", "/=", "//=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=" ]));
        PRECEDENCE = (function() {
            var _$rapyd$_anonfunc = function (a, ret) {
                var b, j, i;
                for (var _$rapyd$_Index25 = 0; _$rapyd$_Index25 < a.length; _$rapyd$_Index25++) {
                    i = _$rapyd$_Index25;
                    b = a[i];
                    for (var _$rapyd$_Index26 = 0; _$rapyd$_Index26 < b.length; _$rapyd$_Index26++) {
                        j = _$rapyd$_Index26;
                        ret[b[j]] = i + 1;
                    }
                }
                return ret;
            };

            _$rapyd$_anonfunc.__argnames__ = ["a", "ret"];
            return _$rapyd$_anonfunc;
        })()(_$rapyd$_list_decorate([ _$rapyd$_list_decorate([ "||" ]), _$rapyd$_list_decorate([ "&&" ]), _$rapyd$_list_decorate([ "|" ]), _$rapyd$_list_decorate([ "^" ]), _$rapyd$_list_decorate([ "&" ]), _$rapyd$_list_decorate([ "==", "===", "!=", "!==" ]), _$rapyd$_list_decorate([ "<", ">", "<=", ">=", "in", "instanceof" ]), _$rapyd$_list_decorate([ ">>", "<<", ">>>" ]), _$rapyd$_list_decorate([ "+", "-" ]), _$rapyd$_list_decorate([ "*", "/", "//", "%" ]), _$rapyd$_list_decorate([ "**" ]) ]), {});
        STATEMENTS_WITH_LABELS = array_to_hash(_$rapyd$_list_decorate([ "for", "do", "while", "switch" ]));
        ATOMIC_START_TOKEN = array_to_hash(_$rapyd$_list_decorate([ "atom", "num", "string", "regexp", "name", "js" ]));
        compile_time_decorators = _$rapyd$_list_decorate([ "staticmethod", "external", "property" ]);
        function has_simple_decorator(decorators, name) {
            var remove, s;
            remove = [];
            for (var i = 0; i < decorators.length; i++) {
                s = decorators[i];
                if (s instanceof AST_SymbolRef && !s.parens && s.name === name) {
                    remove.push(i);
                }
            }
            if (remove.length) {
                remove.reverse();
                for (var i = 0; i < remove.length; i++) {
                    decorators.splice(remove[i], 1);
                }
                return true;
            }
            return false;
        };

        has_simple_decorator.__argnames__ = ["decorators", "name"];

        function has_setter_decorator(decorators, name) {
            var remove, s;
            remove = [];
            for (var i = 0; i < decorators.length; i++) {
                s = decorators[i];
                if (s instanceof AST_Dot && s.expression instanceof AST_SymbolRef && s.expression.name === name && s.property === "setter") {
                    remove.push(i);
                }
            }
            if (remove.length) {
                remove.reverse();
                for (var i = 0; i < remove.length; i++) {
                    decorators.splice(remove[i], 1);
                }
                return true;
            }
            return false;
        };

        has_setter_decorator.__argnames__ = ["decorators", "name"];

        function create_parser_ctx(S, import_dirs, module_id, baselib_items, imported_module_ids, imported_modules, importing_modules, options) {
            function next() {
                S.prev = S.token;
                if (S.peeked.length) {
                    S.token = S.peeked.shift();
                } else {
                    S.token = S.input();
                }
                S.in_directives = S.in_directives && (S.token.type === "string" || is_("punc", ";"));
                return S.token;
            };

            function is_(type, value) {
                return is_token(S.token, type, value);
            };

            is_.__argnames__ = ["type", "value"];

            function peek() {
                if (!S.peeked.length) {
                    S.peeked.push(S.input());
                }
                return S.peeked[0];
            };

            function prev() {
                return S.prev;
            };

            function croak(msg, line, col, pos, is_eof) {
                var ctx;
                ctx = S.input.context();
                throw new SyntaxError(msg, ctx.filename, (line !== undefined) ? line : ctx.tokline, (col !== undefined) ? col : ctx.tokcol, (pos !== undefined) ? pos : ctx.tokpos, is_eof);
            };

            croak.__argnames__ = ["msg", "line", "col", "pos", "is_eof"];

            function token_error(token, msg) {
                var is_eof;
                is_eof = (token.type === "eof") ? true : false;
                croak(msg, token.line, token.col, undefined, is_eof);
            };

            token_error.__argnames__ = ["token", "msg"];

            function unexpected(token) {
                if (token === undefined) {
                    token = S.token;
                }
                token_error(token, "Unexpected token: " + token.type + " «" + token.value + "»");
            };

            unexpected.__argnames__ = ["token"];

            function expect_token(type, val) {
                if (is_(type, val)) {
                    return next();
                }
                token_error(S.token, "Unexpected token " + S.token.type + " «" + S.token.value + "»" + ", expected " + type + " «" + val + "»");
            };

            expect_token.__argnames__ = ["type", "val"];

            function expect(punc) {
                return expect_token("punc", punc);
            };

            expect.__argnames__ = ["punc"];

            function can_insert_semicolon() {
                return S.token.nlb || is_("eof") || is_("punc", "}");
            };

            function semicolon() {
                if (is_("punc", ";")) {
                    next();
                    S.token.nlb = true;
                }
            };

            function embed_tokens(parser) {
                function with_embedded_tokens() {
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

                return with_embedded_tokens;
            };

            embed_tokens.__argnames__ = ["parser"];

            function scan_for_top_level_callables(body) {
                var ans, opt, x, obj;
                ans = [];
                if (Array.isArray(body)) {
                    var _$rapyd$_Iter27 = _$rapyd$_Iterable(body);
                    for (var _$rapyd$_Index27 = 0; _$rapyd$_Index27 < _$rapyd$_Iter27.length; _$rapyd$_Index27++) {
                        obj = _$rapyd$_Iter27[_$rapyd$_Index27];
                        if (obj instanceof AST_Function || obj instanceof AST_Class) {
                            if (obj.name) {
                                ans.push(obj.name.name);
                            } else {
                                token_error(obj.start, "Top-level functions must have names");
                            }
                        } else {
                            if (obj instanceof AST_Scope) {
                                continue;
                            }
                            var _$rapyd$_Iter28 = _$rapyd$_Iterable(_$rapyd$_list_decorate([ "body", "alternative" ]));
                            for (var _$rapyd$_Index28 = 0; _$rapyd$_Index28 < _$rapyd$_Iter28.length; _$rapyd$_Index28++) {
                                x = _$rapyd$_Iter28[_$rapyd$_Index28];
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
            };

            scan_for_top_level_callables.__argnames__ = ["body"];

            function scan_for_classes(body) {
                var ans, obj;
                ans = {};
                var _$rapyd$_Iter29 = _$rapyd$_Iterable(body);
                for (var _$rapyd$_Index29 = 0; _$rapyd$_Index29 < _$rapyd$_Iter29.length; _$rapyd$_Index29++) {
                    obj = _$rapyd$_Iter29[_$rapyd$_Index29];
                    if (obj instanceof AST_Class) {
                        ans[obj.name.name] = obj;
                    }
                }
                return ans;
            };

            scan_for_classes.__argnames__ = ["body"];

            function scan_for_local_vars(body) {
                var localvars, seen, clause, stmt, lhs;
                "\n        Pick out all variables being assigned to from within this scope, we'll mark them as local\n\n        body        body to be scanned\n        ";
                localvars = [];
                seen = {};
                function push(x) {
                    if (Object.prototype.hasOwnProperty.call(seen, x)) {
                        return;
                    }
                    seen[x] = true;
                    localvars.push(x);
                };

                push.__argnames__ = ["x"];

                function extend(arr) {
                    var x;
                    var _$rapyd$_Iter30 = _$rapyd$_Iterable(arr);
                    for (var _$rapyd$_Index30 = 0; _$rapyd$_Index30 < _$rapyd$_Iter30.length; _$rapyd$_Index30++) {
                        x = _$rapyd$_Iter30[_$rapyd$_Index30];
                        push(x);
                    }
                };

                extend.__argnames__ = ["arr"];

                function scan_in_array(arr) {
                    var x;
                    var _$rapyd$_Iter31 = _$rapyd$_Iterable(arr);
                    for (var _$rapyd$_Index31 = 0; _$rapyd$_Index31 < _$rapyd$_Iter31.length; _$rapyd$_Index31++) {
                        x = _$rapyd$_Iter31[_$rapyd$_Index31];
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
                };

                scan_in_array.__argnames__ = ["arr"];

                function add_assign_lhs(lhs) {
                    if (lhs instanceof AST_Seq) {
                        lhs = new AST_Array({
                            "elements": lhs.to_array()
                        });
                    }
                    if (lhs instanceof AST_Array) {
                        push("_$rapyd$_unpack");
                        scan_in_array(lhs.elements);
                    } else if (lhs.name) {
                        push(lhs.name);
                    }
                };

                add_assign_lhs.__argnames__ = ["lhs"];

                function add_for_in(stmt) {
                    if (stmt.init instanceof AST_Array) {
                        push("_$rapyd$_unpack");
                        scan_in_array(stmt.init.elements);
                    } else {
                        push(stmt.init.name);
                    }
                };

                add_for_in.__argnames__ = ["stmt"];

                if (Array.isArray(body)) {
                    var _$rapyd$_Iter32 = _$rapyd$_Iterable(body);
                    for (var _$rapyd$_Index32 = 0; _$rapyd$_Index32 < _$rapyd$_Iter32.length; _$rapyd$_Index32++) {
                        stmt = _$rapyd$_Iter32[_$rapyd$_Index32];
                        if (stmt instanceof AST_Scope) {
                            continue;
                        }
                        [ "body", "alternative" ].forEach((function() {
                            var _$rapyd$_anonfunc = function (option) {
                                var opt;
                                opt = stmt[option];
                                if (opt) {
                                    extend(scan_for_local_vars(opt));
                                }
                                if (opt instanceof AST_Assign && !(opt.right instanceof AST_Scope)) {
                                    extend(scan_for_local_vars(opt.right));
                                }
                            };

                            _$rapyd$_anonfunc.__argnames__ = ["option"];
                            return _$rapyd$_anonfunc;
                        })());
                        if (stmt instanceof AST_ForIn) {
                            add_for_in(stmt);
                        } else if (stmt instanceof AST_DWLoop) {
                            extend(scan_for_local_vars(stmt));
                        } else if (stmt instanceof AST_With) {
                            [push("_$rapyd$_with_exception"), push("_$rapyd$_with_suppress")];
                            var _$rapyd$_Iter33 = _$rapyd$_Iterable(stmt.clauses);
                            for (var _$rapyd$_Index33 = 0; _$rapyd$_Index33 < _$rapyd$_Iter33.length; _$rapyd$_Index33++) {
                                clause = _$rapyd$_Iter33[_$rapyd$_Index33];
                                if (clause.alias) {
                                    push(clause.alias.name);
                                }
                            }
                        }
                    }
                } else if (body.body) {
                    extend(scan_for_local_vars(body.body));
                    if (body.alternative) {
                        extend(scan_for_local_vars(body.alternative));
                    }
                } else if (body instanceof AST_Assign) {
                    if (body.is_chained()) {
                        var _$rapyd$_Iter34 = _$rapyd$_Iterable(body.traverse_chain()[0]);
                        for (var _$rapyd$_Index34 = 0; _$rapyd$_Index34 < _$rapyd$_Iter34.length; _$rapyd$_Index34++) {
                            lhs = _$rapyd$_Iter34[_$rapyd$_Index34];
                            add_assign_lhs(lhs);
                        }
                        push("_$rapyd$_chain_assign_temp");
                    } else {
                        add_assign_lhs(body.left);
                    }
                    if (!(body.right instanceof AST_Scope)) {
                        extend(scan_for_local_vars(body.right));
                    }
                } else if (body instanceof AST_ForIn) {
                    add_for_in(body);
                }
                return localvars;
            };

            scan_for_local_vars.__argnames__ = ["body"];

            function scan_for_nonlocal_defs(body) {
                var vars, stmt;
                vars = [];
                if (Array.isArray(body)) {
                    var _$rapyd$_Iter35 = _$rapyd$_Iterable(body);
                    for (var _$rapyd$_Index35 = 0; _$rapyd$_Index35 < _$rapyd$_Iter35.length; _$rapyd$_Index35++) {
                        stmt = _$rapyd$_Iter35[_$rapyd$_Index35];
                        if (stmt instanceof AST_Scope) {
                            continue;
                        }
                        if (stmt instanceof AST_Definitions) {
                            stmt.definitions.forEach((function() {
                                var _$rapyd$_anonfunc = function (vardef) {
                                    vars.push(vardef.name.name);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["vardef"];
                                return _$rapyd$_anonfunc;
                            })());
                        }
                        [ "body", "alternative" ].forEach((function() {
                            var _$rapyd$_anonfunc = function (option) {
                                var opt;
                                opt = stmt[option];
                                if (opt) {
                                    vars = vars.concat(scan_for_nonlocal_defs(opt));
                                }
                            };

                            _$rapyd$_anonfunc.__argnames__ = ["option"];
                            return _$rapyd$_anonfunc;
                        })());
                    }
                } else if (body.body) {
                    vars = vars.concat(scan_for_nonlocal_defs(body.body));
                    if (body.alternative) {
                        vars = vars.concat(scan_for_nonlocal_defs(body.alternative));
                    }
                }
                return vars;
            };

            scan_for_nonlocal_defs.__argnames__ = ["body"];

            
            var statement = embed_tokens((function() {
                var _$rapyd$_anonfunc = function statement() {
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
                    } else if (tmp_ === "num" || tmp_ === "regexp" || tmp_ === "operator" || tmp_ === "atom" || tmp_ === "js") {
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
                            return new AST_Debugger;
                        } else if (tmp_ === "do") {
                            return new AST_Do({
                                "body": in_loop(statement),
                                "condition": (function() {
                                    var _$rapyd$_anonfunc = function () {
                                        var tmp;
                                        expect(".");
                                        expect_token("keyword", "while");
                                        tmp = expression(true);
                                        semicolon();
                                        return tmp;
                                    };
                                    return _$rapyd$_anonfunc;
                                })()()
                            });
                        } else if (tmp_ === "while") {
                            return new AST_While({
                                "condition": expression(true),
                                "body": in_loop(statement)
                            });
                        } else if (tmp_ === "for") {
                            if (is_("js")) {
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
                            func = function_(S.in_class[S.in_class.length-1], false);
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
                                croak("'return' not allowed in a function with yield");
                            }
                            S.functions[S.functions.length-1].is_generator = false;
                            return new AST_Return({
                                "value": (is_("punc", ";")) ? (function() {
                                    var _$rapyd$_anonfunc = function () {
                                        semicolon();
                                        return null;
                                    };
                                    return _$rapyd$_anonfunc;
                                })()() : (can_insert_semicolon()) ? null : (function() {
                                    var _$rapyd$_anonfunc = function () {
                                        var tmp;
                                        tmp = expression(true);
                                        semicolon();
                                        return tmp;
                                    };
                                    return _$rapyd$_anonfunc;
                                })()()
                            });
                        } else if (tmp_ === "yield") {
                            return yield_();
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
                            return with_();
                        } else {
                            unexpected();
                        }
                    }
                };
                return _$rapyd$_anonfunc;
            })());

            function with_() {
                var clauses, start, expr, alias, body;
                clauses = [];
                start = S.token;
                while (true) {
                    if (is_("eof")) {
                        unexpected();
                    }
                    expr = expression();
                    alias = null;
                    if (is_("keyword", "as")) {
                        next();
                        alias = as_symbol(AST_SymbolAlias);
                    }
                    clauses.push(new AST_WithClause({
                        "expression": expr,
                        "alias": alias
                    }));
                    if (is_("punc", ",")) {
                        next();
                        continue;
                    }
                    if (!is_("punc", ":")) {
                        unexpected();
                    }
                    break;
                }
                if (!clauses.length) {
                    token_error(start, "with statement must have at least one clause");
                }
                body = statement();
                return new AST_With({
                    "clauses": clauses,
                    "body": body
                });
            };

            function simple_statement(tmp) {
                tmp = expression(true);
                semicolon();
                return new AST_SimpleStatement({
                    "body": tmp
                });
            };

            simple_statement.__argnames__ = ["tmp"];

            function break_cont(type) {
                if (S.in_loop === 0) {
                    croak(type.TYPE + " not inside a loop or switch");
                }
                semicolon();
                return new type;
            };

            break_cont.__argnames__ = ["type"];

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
                    "value": (is_("punc", ";")) ? (function() {
                        var _$rapyd$_anonfunc = function () {
                            semicolon();
                            return null;
                        };
                        return _$rapyd$_anonfunc;
                    })()() : (can_insert_semicolon()) ? null : (function() {
                        var _$rapyd$_anonfunc = function () {
                            var tmp;
                            tmp = expression(true);
                            semicolon();
                            return tmp;
                        };
                        return _$rapyd$_anonfunc;
                    })()()
                });
            };

            function for_(list_comp) {
                var init, tmp;
                init = null;
                if (!is_("punc", ";")) {
                    init = expression(true, true);
                    if (init instanceof AST_Seq) {
                        if (init.car instanceof AST_SymbolRef && init.cdr instanceof AST_SymbolRef) {
                            tmp = init.to_array();
                        } else {
                            tmp = _$rapyd$_list_decorate([ init ]);
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
            };

            for_.__argnames__ = ["list_comp"];

            function for_in(init, list_comp) {
                var lhs, obj;
                lhs = (init instanceof AST_Var) ? init.definitions[0].name : null;
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
            };

            for_in.__argnames__ = ["init", "list_comp"];

            function for_js() {
                var condition;
                condition = as_atom_node();
                return new AST_ForJS({
                    "condition": condition,
                    "body": in_loop(statement)
                });
            };

            function get_class_in_scope(expr) {
                var s, referenced_path, class_name;
                if (expr instanceof AST_SymbolRef) {
                    if (NATIVE_CLASSES.hasOwnProperty(expr.name)) {
                        return NATIVE_CLASSES[expr.name];
                    }
                    if (ERROR_CLASSES.hasOwnProperty(expr.name)) {
                        return ERROR_CLASSES[expr.name];
                    }
                    for (var _$rapyd$_Index36 = S.classes.length - 1; _$rapyd$_Index36 > -1; _$rapyd$_Index36-=1) {
                        s = _$rapyd$_Index36;
                        if (S.classes[s].hasOwnProperty(expr.name)) {
                            return S.classes[s][expr.name];
                        }
                    }
                } else if (expr instanceof AST_Dot) {
                    referenced_path = _$rapyd$_list_decorate([]);
                    while (expr instanceof AST_Dot) {
                        referenced_path.unshift(expr.property);
                        expr = expr.expression;
                    }
                    if (expr instanceof AST_SymbolRef) {
                        referenced_path.unshift(expr.name);
                        if (len(referenced_path) > 1) {
                            class_name = referenced_path.join(".");
                            for (var _$rapyd$_Index37 = S.classes.length - 1; _$rapyd$_Index37 > -1; _$rapyd$_Index37-=1) {
                                s = _$rapyd$_Index37;
                                if (S.classes[s].hasOwnProperty(class_name)) {
                                    return S.classes[s][class_name];
                                }
                            }
                        }
                    }
                }
                return false;
            };

            get_class_in_scope.__argnames__ = ["expr"];

            function import_error(message) {
                var ctx;
                ctx = S.input.context();
                throw new ImportError(message, ctx.filename, ctx.tokline, ctx.tokcol, ctx.tokpos);
            };

            import_error.__argnames__ = ["message"];

            function do_import(key) {
                var package_module_id, src_code, filename, _$rapyd$_chain_assign_temp, modpath, _$rapyd$_unpack, data, location, cached, srchash, ikey, bitem;
                if (imported_modules.hasOwnProperty(key)) {
                    return;
                }
                if (importing_modules.hasOwnProperty(key) && importing_modules[key]) {
                    import_error("Detected a recursive import of: " + key + " while importing: " + module_id);
                }
                package_module_id = key.split(".").slice(0, -1).join(".");
                if (len(package_module_id) > 0) {
                    do_import(package_module_id);
                }
                if (options.for_linting) {
                    imported_modules[key] = {
                        "is_cached": true,
                        "classes": {},
                        "module_id": key,
                        "exports": _$rapyd$_list_decorate([]),
                        "submodules": _$rapyd$_list_decorate([]),
                        "nonlocalvars": _$rapyd$_list_decorate([]),
                        "baselib": {},
                        "outputs": {}
                    };
                    if (len(package_module_id) > 0) {
                        imported_modules[package_module_id].submodules.push(key);
                    }
                    return;
                }
                function safe_read(base_path) {
                    var _$rapyd$_unpack, i, path;
                    var _$rapyd$_Iter38 = _$rapyd$_Iterable(enumerate(_$rapyd$_list_decorate([ base_path + ".pyj", base_path + "/__init__.pyj" ])));
                    for (var _$rapyd$_Index38 = 0; _$rapyd$_Index38 < _$rapyd$_Iter38.length; _$rapyd$_Index38++) {
                        _$rapyd$_unpack = _$rapyd$_Iter38[_$rapyd$_Index38];
                        i = _$rapyd$_unpack[0];
                        path = _$rapyd$_unpack[1];
                        try {
                            return _$rapyd$_list_decorate([ readfile(path, "utf-8"), path ]);
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
                };

                safe_read.__argnames__ = ["base_path"];

                _$rapyd$_chain_assign_temp = null;
                src_code = _$rapyd$_chain_assign_temp;
                filename = _$rapyd$_chain_assign_temp;
;
                modpath = key.replace(".", "/");
                var _$rapyd$_Iter39 = _$rapyd$_Iterable(import_dirs);
                for (var _$rapyd$_Index39 = 0; _$rapyd$_Index39 < _$rapyd$_Iter39.length; _$rapyd$_Index39++) {
                    location = _$rapyd$_Iter39[_$rapyd$_Index39];
                    if (location) {
                        _$rapyd$_unpack = safe_read(location + "/" + modpath);
                        data = _$rapyd$_unpack[0];
                        filename = _$rapyd$_unpack[1];
                        if (data !== null) {
                            src_code = data;
                            break;
                        }
                    }
                }
                if (src_code === null) {
                    import_error("Failed Import: '" + key + "' module doesn't exist in any of the import directories: " + import_dirs.join(":"));
                }
                try {
                    cached = JSON.parse(readfile(filename + "-cached", "utf-8"));
                } catch (_$rapyd$_Exception) {
                    cached = null;
                }
                srchash = sha1sum(src_code);
                if (cached && cached["version"] === COMPILER_VERSION && cached["signature"] === srchash) {
                    var _$rapyd$_Iter40 = _$rapyd$_Iterable(cached.imported_module_ids);
                    for (var _$rapyd$_Index40 = 0; _$rapyd$_Index40 < _$rapyd$_Iter40.length; _$rapyd$_Index40++) {
                        ikey = _$rapyd$_Iter40[_$rapyd$_Index40];
                        do_import(ikey);
                    }
                    imported_modules[key] = {
                        "is_cached": true,
                        "classes": cached["classes"],
                        "outputs": cached["outputs"],
                        "module_id": key,
                        "import_order": Object.keys(imported_modules).length,
                        "submodules": _$rapyd$_list_decorate([]),
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
                        "imported_modules": imported_modules,
                        "importing_modules": importing_modules
                    });
                }
                imported_modules[key].srchash = srchash;
                if (len(package_module_id) > 0) {
                    imported_modules[package_module_id].submodules.push(key);
                }
                var _$rapyd$_Iter41 = _$rapyd$_Iterable(Object.keys(imported_modules[key].baselib));
                for (var _$rapyd$_Index41 = 0; _$rapyd$_Index41 < _$rapyd$_Iter41.length; _$rapyd$_Index41++) {
                    bitem = _$rapyd$_Iter41[_$rapyd$_Index41];
                    baselib_items[bitem] = true;
                }
                imported_module_ids.push(key);
            };

            do_import.__argnames__ = ["key"];

            function import_(from_import) {
                var ans, tok, tmp, name, last_tok, _$rapyd$_chain_assign_temp, key, alias, aimp, _$rapyd$_unpack, classes, argnames, bracketed, exports, symdef, aname, obj, argvar, cname, imp;
                ans = new AST_Imports({
                    "imports": _$rapyd$_list_decorate([])
                });
                while (true) {
                    _$rapyd$_chain_assign_temp = expression(false);
                    tok = _$rapyd$_chain_assign_temp;
                    tmp = _$rapyd$_chain_assign_temp;
                    name = _$rapyd$_chain_assign_temp;
                    last_tok = _$rapyd$_chain_assign_temp;
;
                    key = "";
                    while (tmp instanceof AST_Dot) {
                        key = "." + tmp.property + key;
                        _$rapyd$_chain_assign_temp = tmp.expression;
                        tmp = _$rapyd$_chain_assign_temp;
                        last_tok = _$rapyd$_chain_assign_temp;
;
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
                        "body": (function() {
                            var _$rapyd$_anonfunc = function () {
                                return imported_modules[key];
                            };
                            return _$rapyd$_anonfunc;
                        })()
                    });
                    _$rapyd$_unpack = [tok.start, last_tok.end];
                    aimp.start = _$rapyd$_unpack[0];
                    aimp.end = _$rapyd$_unpack[1];
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
                var _$rapyd$_Iter42 = _$rapyd$_Iterable(ans["imports"]);
                for (var _$rapyd$_Index42 = 0; _$rapyd$_Index42 < _$rapyd$_Iter42.length; _$rapyd$_Index42++) {
                    imp = _$rapyd$_Iter42[_$rapyd$_Index42];
                    do_import(imp.key);
                    classes = imported_modules[key].classes;
                    if (from_import) {
                        expect_token("keyword", "import");
                        _$rapyd$_chain_assign_temp = _$rapyd$_list_decorate([]);
                        imp.argnames = _$rapyd$_chain_assign_temp;
                        argnames = _$rapyd$_chain_assign_temp;
;
                        bracketed = is_("punc", "(");
                        if (bracketed) {
                            next();
                        }
                        exports = {};
                        var _$rapyd$_Iter43 = _$rapyd$_Iterable(imported_modules[key].exports);
                        for (var _$rapyd$_Index43 = 0; _$rapyd$_Index43 < _$rapyd$_Iter43.length; _$rapyd$_Index43++) {
                            symdef = _$rapyd$_Iter43[_$rapyd$_Index43];
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
                        var _$rapyd$_Iter44 = _$rapyd$_Iterable(argnames);
                        for (var _$rapyd$_Index44 = 0; _$rapyd$_Index44 < _$rapyd$_Iter44.length; _$rapyd$_Index44++) {
                            argvar = _$rapyd$_Iter44[_$rapyd$_Index44];
                            obj = classes[argvar.name];
                            if (obj) {
                                key = (argvar.alias) ? argvar.alias.name : argvar.name;
                                S.classes[S.classes.length-1][key] = {
                                    "static": obj.static,
                                    "bound": obj.bound
                                };
                            }
                        }
                    } else {
                        var _$rapyd$_Iter45 = _$rapyd$_Iterable(Object.keys(classes));
                        for (var _$rapyd$_Index45 = 0; _$rapyd$_Index45 < _$rapyd$_Iter45.length; _$rapyd$_Index45++) {
                            cname = _$rapyd$_Iter45[_$rapyd$_Index45];
                            obj = classes[cname];
                            key = (imp.alias) ? imp.alias.name : imp.key;
                            S.classes[S.classes.length-1][key + "." + obj.name.name] = {
                                "static": obj.static,
                                "bound": obj.bound
                            };
                        }
                    }
                }
                return ans;
            };

            import_.__argnames__ = ["from_import"];

            function class_() {
                var name, externaldecorator, class_details, definition, descriptor, _$rapyd$_chain_assign_temp, stmt, class_var_names, visitor;
                name = as_symbol(AST_SymbolDefun);
                if (!name) {
                    unexpected();
                }
                externaldecorator = has_simple_decorator(S.decorators, "external");
                class_details = {
                    "static": _$rapyd$_list_decorate([]),
                    "bound": {}
                };
                definition = new AST_Class({
                    "name": name,
                    "module_id": module_id,
                    "dynamic_properties": {},
                    "parent": (function() {
                        var _$rapyd$_anonfunc = function () {
                            var a;
                            if (is_("punc", "(")) {
                                S.in_parenthesized_expr = true;
                                next();
                                if (is_("punc", ")")) {
                                    S.in_parenthesized_expr = false;
                                    next();
                                    return null;
                                }
                                a = expr_atom(false);
                                expect(")");
                                S.in_parenthesized_expr = false;
                                return a;
                            } else {
                                return null;
                            }
                        };
                        return _$rapyd$_anonfunc;
                    })()(),
                    "localvars": _$rapyd$_list_decorate([]),
                    "static": class_details.static,
                    "external": externaldecorator,
                    "bound": class_details.bound,
                    "statements": _$rapyd$_list_decorate([]),
                    "decorators": (function() {
                        var _$rapyd$_anonfunc = function () {
                            var d;
                            d = _$rapyd$_list_decorate([]);
                            S.decorators.forEach((function() {
                                var _$rapyd$_anonfunc = function (decorator) {
                                    d.push(new AST_Decorator({
                                        "expression": decorator
                                    }));
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["decorator"];
                                return _$rapyd$_anonfunc;
                            })());
                            S.decorators = [];
                            return d;
                        };
                        return _$rapyd$_anonfunc;
                    })()(),
                    "body": (function() {
                        var _$rapyd$_anonfunc = function (loop, labels) {
                            var a;
                            S.in_class.push(name.name);
                            S.classes[S.classes.length - 1][name.name] = class_details;
                            S.classes.push({});
                            S.in_function += 1;
                            S.in_directives = true;
                            S.in_loop = 0;
                            S.labels = _$rapyd$_list_decorate([]);
                            a = block_();
                            S.in_function -= 1;
                            S.classes.pop();
                            S.in_class.pop();
                            S.in_loop = loop;
                            S.labels = labels;
                            return a;
                        };

                        _$rapyd$_anonfunc.__argnames__ = ["loop", "labels"];
                        return _$rapyd$_anonfunc;
                    })()(S.in_loop, S.labels)
                });
                var _$rapyd$_Iter46 = _$rapyd$_Iterable(definition.body);
                for (var _$rapyd$_Index46 = 0; _$rapyd$_Index46 < _$rapyd$_Iter46.length; _$rapyd$_Index46++) {
                    stmt = _$rapyd$_Iter46[_$rapyd$_Index46];
                    if (stmt instanceof AST_Method) {
                        if (stmt.is_getter || stmt.is_setter) {
                            descriptor = definition.dynamic_properties[stmt.name.name];
                            if (!descriptor) {
                                _$rapyd$_chain_assign_temp = {};
                                descriptor = _$rapyd$_chain_assign_temp;
                                definition.dynamic_properties[stmt.name.name] = _$rapyd$_chain_assign_temp;
;
                            }
                            descriptor[(stmt.is_getter) ? "getter" : "setter"] = stmt;
                        } else if (stmt.name.name === "__init__") {
                            definition.init = stmt;
                        }
                    }
                }
                class_var_names = {};
                function walker() {
                    function visit_node(node, descend) {
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

                    visit_node.__argnames__ = ["node", "descend"];

                    this._visit = visit_node;
                };

                visitor = new walker;
                var _$rapyd$_Iter47 = _$rapyd$_Iterable(definition.body);
                for (var _$rapyd$_Index47 = 0; _$rapyd$_Index47 < _$rapyd$_Iter47.length; _$rapyd$_Index47++) {
                    stmt = _$rapyd$_Iter47[_$rapyd$_Index47];
                    if (!(stmt instanceof AST_Class)) {
                        stmt.walk(visitor);
                        definition.statements.push(stmt);
                    }
                }
                return definition;
            };

            function function_(in_class, is_expression) {
                var name, is_anonymous, staticmethod, property_getter, property_setter, _$rapyd$_chain_assign_temp, staticloc, ctor, is_generator, definition, assignments, j, i, nonlocals;
                name = (is_("name")) ? as_symbol((in_class) ? AST_SymbolDefun : AST_SymbolLambda) : null;
                if (in_class && !name) {
                    croak("Cannot use anonymous function as class methods");
                }
                is_anonymous = !name;
                _$rapyd$_chain_assign_temp = false;
                staticmethod = _$rapyd$_chain_assign_temp;
                property_getter = _$rapyd$_chain_assign_temp;
                property_setter = _$rapyd$_chain_assign_temp;
;
                if (in_class) {
                    staticloc = has_simple_decorator(S.decorators, "staticmethod");
                    property_getter = has_simple_decorator(S.decorators, "property");
                    property_setter = has_setter_decorator(S.decorators, name.name);
                    if (staticloc) {
                        if (property_getter || property_setter) {
                            croak("A method cannot be both static and a property getter/setter");
                        }
                        S.classes[S.classes.length - 2][in_class].static.push(name.name);
                        staticmethod = true;
                    } else if (name.name !== "__init__" && options.auto_bind) {
                        baselib_items["bind"] = true;
                        S.classes[S.classes.length - 2][in_class].bound[name.name] = true;
                    }
                }
                expect("(");
                S.in_parenthesized_expr = true;
                ctor = (in_class) ? AST_Method : AST_Function;
                is_generator = [];
                definition = new ctor({
                    "name": name,
                    "is_expression": is_expression,
                    "is_anonymous": is_anonymous,
                    "argnames": (function() {
                        var _$rapyd$_anonfunc = function (a) {
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
                            };

                            while (!is_("punc", ")")) {
                                if (first) {
                                    first = false;
                                } else {
                                    expect(",");
                                    if (is_("punc", ")")) {
                                        break;
                                    }
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
                            return a;
                        };

                        _$rapyd$_anonfunc.__argnames__ = ["a"];
                        return _$rapyd$_anonfunc;
                    })()([]),
                    "localvars": _$rapyd$_list_decorate([]),
                    "decorators": (function() {
                        var _$rapyd$_anonfunc = function () {
                            var d;
                            d = [];
                            S.decorators.forEach((function() {
                                var _$rapyd$_anonfunc = function (decorator) {
                                    d.push(new AST_Decorator({
                                        "expression": decorator
                                    }));
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["decorator"];
                                return _$rapyd$_anonfunc;
                            })());
                            S.decorators = [];
                            return d;
                        };
                        return _$rapyd$_anonfunc;
                    })()(),
                    "body": (function() {
                        var _$rapyd$_anonfunc = function (loop, labels) {
                            var a;
                            S.in_class.push(false);
                            S.classes.push({});
                            S.in_function += 1;
                            S.functions.push({});
                            S.in_directives = true;
                            S.in_loop = 0;
                            S.labels = _$rapyd$_list_decorate([]);
                            a = block_();
                            S.in_function -= 1;
                            is_generator.push(bool(S.functions.pop().is_generator));
                            S.classes.pop();
                            S.in_class.pop();
                            S.in_loop = loop;
                            S.labels = labels;
                            return a;
                        };

                        _$rapyd$_anonfunc.__argnames__ = ["loop", "labels"];
                        return _$rapyd$_anonfunc;
                    })()(S.in_loop, S.labels)
                });
                definition.is_generator = is_generator[0];
                if (definition instanceof AST_Method) {
                    definition.static = staticmethod;
                    definition.is_getter = property_getter;
                    definition.is_setter = property_setter;
                    if (definition.argnames.length < 1 && !definition.static) {
                        croak("Methods of a class must have at least one argument, traditionally named self");
                    }
                    if (definition.name && definition.name.name === "__init__") {
                        if (definition.is_generator) {
                            croak("The __init__ method of a class cannot be a generator (yield not allowed)");
                        }
                        if (property_getter || property_setter) {
                            croak("The __init__ method of a class cannot be a property getter/setter");
                        }
                    }
                }
                if (definition.is_generator) {
                    baselib_items["yield"] = true;
                }
                assignments = scan_for_local_vars(definition.body);
                for (var _$rapyd$_Index48 = 0; _$rapyd$_Index48 < assignments.length; _$rapyd$_Index48++) {
                    i = _$rapyd$_Index48;
                    for (var _$rapyd$_Index49 = 0; _$rapyd$_Index49 < definition.argnames.length + 1; _$rapyd$_Index49++) {
                        j = _$rapyd$_Index49;
                        if (j === definition.argnames.length) {
                            definition.localvars.push(new_symbol(AST_SymbolVar, assignments[i]));
                        } else if (j < definition.argnames.length && assignments[i] === definition.argnames[j].name) {
                            break;
                        }
                    }
                }
                nonlocals = scan_for_nonlocal_defs(definition.body);
                nonlocals = (function() {
                    var _$rapyd$_Iter = _$rapyd$_Iterable(nonlocals), _$rapyd$_Result = _$rapyd$_set(), name;
                    for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                        name = _$rapyd$_Iter[_$rapyd$_Index];
                        _$rapyd$_Result.add(name);
                    }
                    return _$rapyd$_Result;
                })();
                definition.localvars = definition.localvars.filter((function() {
                    var _$rapyd$_anonfunc = function (v) {
                        return !nonlocals.has(v.name);
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["v"];
                    return _$rapyd$_anonfunc;
                })());
                return definition;
            };

            function_.__argnames__ = ["in_class", "is_expression"];

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
            };

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
            };

            function try_() {
                var body, bcatch, bfinally, start, exceptions, name;
                body = block_();
                bcatch = _$rapyd$_list_decorate([]);
                bfinally = null;
                while (is_("keyword", "except")) {
                    start = S.token;
                    next();
                    exceptions = _$rapyd$_list_decorate([]);
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
                    "bcatch": (bcatch.length) ? new AST_Catch({
                        "body": bcatch
                    }) : null,
                    "bfinally": bfinally
                });
            };

            function vardefs(no_in, in_const, in_nonlocal) {
                var a;
                a = _$rapyd$_list_decorate([]);
                while (true) {
                    a.push(new AST_VarDef({
                        "start": S.token,
                        "name": as_symbol((in_const) ? AST_SymbolConst : (in_nonlocal) ? AST_SymbolNonlocal : AST_SymbolVar),
                        "value": (is_("operator", "=")) ? (next(), expression(false, no_in)) : null,
                        "end": prev()
                    }));
                    if (!is_("punc", ",")) {
                        break;
                    }
                    next();
                }
                return a;
            };

            vardefs.__argnames__ = ["no_in", "in_const", "in_nonlocal"];

            function nonlocal_(no_in) {
                return new AST_Var({
                    "start": prev(),
                    "definitions": vardefs(no_in, false, true),
                    "end": prev()
                });
            };

            nonlocal_.__argnames__ = ["no_in"];

            function const_() {
                return new AST_Const({
                    "start": prev(),
                    "definitions": vardefs(false, true),
                    "end": prev()
                });
            };

            function new_() {
                var start, newexp, args;
                start = S.token;
                expect_token("operator", "new");
                newexp = expr_atom(false);
                if (is_("punc", "(")) {
                    S.in_parenthesized_expr = true;
                    next();
                    args = func_call_list();
                    S.in_parenthesized_expr = false;
                } else {
                    args = func_call_list(true);
                }
                baselib_items["_$rapyd$_interpolate_kwargs_constructor"] = true;
                return subscripts(new AST_New({
                    "start": start,
                    "expression": newexp,
                    "args": args,
                    "end": prev()
                }), true);
            };

            function string_() {
                var strings, start;
                strings = [];
                start = S.token;
                while (true) {
                    strings.push(S.token.value);
                    if (peek().type !== "string") {
                        break;
                    }
                    next();
                }
                return new AST_String({
                    "start": start,
                    "end": S.token,
                    "value": strings.join("")
                });
            };

            function token_as_atom_node() {
                var tok, tmp_, tmp__;
                tok = S.token;
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
                    return string_();
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
                } else if (tmp_ === "js") {
                    return new AST_Verbatim({
                        "start": tok,
                        "end": tok,
                        "value": tok.value
                    });
                }
                token_error(tok, "Expecting an atomic token (number/string/bool/regexp/js/None)");
            };

            function as_atom_node() {
                var ret;
                ret = token_as_atom_node();
                next();
                return ret;
            };

            function expr_atom(allow_calls) {
                var start, tmp_, ex, ret, cls, func;
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
                                "elements": _$rapyd$_list_decorate([])
                            });
                        }
                        ex = expression(true);
                        if (is_("keyword", "for")) {
                            ret = read_comprehension(new AST_GeneratorComprehension({
                                "statement": ex
                            }), ")");
                            S.in_parenthesized_expr = false;
                            return ret;
                        }
                        ex.start = start;
                        ex.end = S.token;
                        if (ex instanceof AST_SymbolRef) {
                            ex.parens = true;
                        }
                        if (!(ex instanceof AST_GeneratorComprehension)) {
                            expect(")");
                        }
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
                    func = function_(false, true);
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

            expr_atom.__argnames__ = ["allow_calls"];

            function expr_list(closing, allow_trailing_comma, allow_empty, func_call) {
                var first, a, saw_starargs, tmp, arg;
                first = true;
                a = _$rapyd$_list_decorate([]);
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
                    tmp = _$rapyd$_list_decorate([]);
                    tmp.kwargs = _$rapyd$_list_decorate([]);
                    var _$rapyd$_Iter50 = _$rapyd$_Iterable(a);
                    for (var _$rapyd$_Index50 = 0; _$rapyd$_Index50 < _$rapyd$_Iter50.length; _$rapyd$_Index50++) {
                        arg = _$rapyd$_Iter50[_$rapyd$_Index50];
                        if (arg instanceof AST_Assign) {
                            tmp.kwargs.push(_$rapyd$_list_decorate([ arg.left, arg.right ]));
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
            };

            expr_list.__argnames__ = ["closing", "allow_trailing_comma", "allow_empty", "func_call"];

            function func_call_list(empty) {
                var a, first, single_comprehension, arg;
                a = [];
                first = true;
                a.kwargs = [];
                a.kwarg_items = [];
                a.starargs = false;
                if (empty) {
                    return a;
                }
                single_comprehension = false;
                baselib_items["_$rapyd$_interpolate_kwargs"] = true;
                while (!is_("punc", ")") && !is_("eof")) {
                    if (!first) {
                        expect(",");
                        if (is_("punc", ")")) {
                            break;
                        }
                    }
                    if (is_("operator", "*")) {
                        next();
                        arg = expression(false);
                        arg.is_array = true;
                        a.push(arg);
                        a.starargs = true;
                    } else if (is_("operator", "**")) {
                        next();
                        a.kwarg_items.push(as_symbol(AST_SymbolRef, false));
                        a.starargs = true;
                    } else {
                        arg = expression(false);
                        if (arg instanceof AST_Assign) {
                            a.kwargs.push(_$rapyd$_list_decorate([ arg.left, arg.right ]));
                        } else {
                            if (is_("keyword", "for")) {
                                if (!first) {
                                    croak("Generator expression must be parenthesized if not sole argument");
                                }
                                a.push(read_comprehension(new AST_GeneratorComprehension({
                                    "statement": arg
                                }), ")"));
                                single_comprehension = true;
                                break;
                            }
                            a.push(arg);
                        }
                    }
                    first = false;
                }
                if (a.kwargs.length) {
                    baselib_items["_$rapyd$_desugar_kwargs()"] = true;
                }
                if (!single_comprehension) {
                    next();
                }
                return a;
            };

            func_call_list.__argnames__ = ["empty"];

            
            var array_ = embed_tokens((function() {
                var _$rapyd$_anonfunc = function array_() {
                    var expr;
                    expect("[");
                    expr = _$rapyd$_list_decorate([]);
                    if (!is_("punc", "]")) {
                        expr.push(expression(false));
                        if (is_("keyword", "for")) {
                            return read_comprehension(new AST_ListComprehension({
                                "statement": expr[0]
                            }), "]");
                        }
                        if (!is_("punc", "]")) {
                            expect(",");
                        }
                    }
                    return new AST_Array({
                        "elements": expr.concat(expr_list("]", true, true))
                    });
                };
                return _$rapyd$_anonfunc;
            })());

            
            var object_ = embed_tokens((function() {
                var _$rapyd$_anonfunc = function object_() {
                    var first, has_non_const_keys, is_pydict, a, start, ctx, orig, left, end;
                    expect("{");
                    first = true;
                    has_non_const_keys = false;
                    is_pydict = false;
                    a = _$rapyd$_list_decorate([]);
                    if (is_("punc", "!")) {
                        next();
                        is_pydict = true;
                    }
                    while (!is_("punc", "}")) {
                        if (!first) {
                            expect(",");
                        }
                        if (is_("punc", "}")) {
                            break;
                        }
                        first = false;
                        start = S.token;
                        ctx = S.input.context();
                        orig = ctx.expecting_object_literal_key;
                        ctx.expecting_object_literal_key = true;
                        try {
                            left = expression(false);
                        } finally {
                            ctx.expecting_object_literal_key = orig;
                        }
                        if (is_("keyword", "for")) {
                            return read_comprehension(new AST_SetComprehension({
                                "statement": left
                            }), "}");
                        }
                        if (a.length === 0 && (is_("punc", ",") || is_("punc", "}"))) {
                            end = prev();
                            return set_(start, end, left);
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
                            return dict_comprehension(a, is_pydict);
                        }
                    }
                    next();
                    return new ((has_non_const_keys) ? AST_ExpressiveObject : AST_Object)({
                        "properties": a,
                        "is_pydict": is_pydict
                    });
                };
                return _$rapyd$_anonfunc;
            })());

            function set_(start, end, expr) {
                var ostart, a;
                ostart = start;
                a = _$rapyd$_list_decorate([ new AST_SetItem({
                    "start": start,
                    "end": end,
                    "value": expr
                }) ]);
                while (!is_("punc", "}")) {
                    expect(",");
                    start = S.token;
                    if (is_("punc", "}")) {
                        break;
                    }
                    a.push(new AST_SetItem({
                        "start": start,
                        "value": expression(false),
                        "end": prev()
                    }));
                }
                next();
                return new AST_Set({
                    "items": a,
                    "start": ostart,
                    "end": prev()
                });
            };

            set_.__argnames__ = ["start", "end", "expr"];

            function read_comprehension(obj, terminator) {
                var forloop;
                if (obj instanceof AST_GeneratorComprehension) {
                    baselib_items["yield"] = true;
                }
                S.in_comprehension = true;
                S.in_parenthesized_expr = false;
                expect_token("keyword", "for");
                forloop = for_(true);
                baselib_items["iterable"] = true;
                obj.init = forloop.init;
                obj.name = forloop.name;
                obj.object = forloop.object;
                obj.condition = (is_("punc", terminator)) ? null : (expect_token("keyword", "if"), 
                expression(true));
                expect(terminator);
                S.in_comprehension = false;
                return obj;
            };

            read_comprehension.__argnames__ = ["obj", "terminator"];

            function dict_comprehension(a, is_pydict) {
                var _$rapyd$_unpack, left, right;
                if (a.length) {
                    _$rapyd$_unpack = [a[0].key, a[0].value];
                    left = _$rapyd$_unpack[0];
                    right = _$rapyd$_unpack[1];
                } else {
                    left = expression(false);
                    if (!is_("punc", ":")) {
                        return read_comprehension(new AST_SetComprehension({
                            "statement": left
                        }), "}");
                    }
                    expect(":");
                    right = expression(false);
                }
                return read_comprehension(new AST_DictComprehension({
                    "statement": left,
                    "value_statement": right,
                    "is_pydict": is_pydict
                }), "}");
            };

            dict_comprehension.__argnames__ = ["a", "is_pydict"];

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
            };

            function token_as_symbol(tok, ttype) {
                var name;
                name = tok.value;
                return new ((name === "this") ? AST_This : ttype)({
                    "name": String(tok.value),
                    "start": tok,
                    "end": tok
                });
            };

            token_as_symbol.__argnames__ = ["tok", "ttype"];

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
            };

            as_symbol.__argnames__ = ["ttype", "noerror"];

            function new_symbol(type, name) {
                var sym;
                sym = new ((name === "this") ? AST_This : type)({
                    "name": String(name),
                    "start": null,
                    "end": null
                });
                return sym;
            };

            new_symbol.__argnames__ = ["type", "name"];

            function is_static_method(cls, method) {
                if (COMMON_STATIC.indexOf(method) !== -1 || cls.static && cls.static.indexOf(method) !== -1) {
                    return true;
                } else {
                    return false;
                }
            };

            is_static_method.__argnames__ = ["cls", "method"];

            function subscripts(expr, allow_calls) {
                var start, is_py_sub, slice_bounds, is_slice, i, assignment, ret, c, funcname, tmp_, args;
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
                    is_py_sub = false;
                    if (is_("punc", "!")) {
                        next();
                        is_py_sub = true;
                    }
                    slice_bounds = _$rapyd$_list_decorate([]);
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
                                slice_bounds[slice_bounds.length-2] = new AST_Undefined;
                            }
                            return subscripts(new AST_Call({
                                "start": start,
                                "expression": new AST_SymbolRef({
                                    "name": "_$rapyd$_eslice"
                                }),
                                "args": _$rapyd$_list_decorate([ expr ]).concat(slice_bounds),
                                "end": prev()
                            }), allow_calls);
                        } else {
                            slice_bounds = (function() {
                                var _$rapyd$_Iter = _$rapyd$_Iterable(slice_bounds), _$rapyd$_Result = [], i;
                                for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                                    i = _$rapyd$_Iter[_$rapyd$_Index];
                                    _$rapyd$_Result.push((i === null) ? new AST_Number({
                                        "value": 0
                                    }) : i);
                                }
                                _$rapyd$_Result = _$rapyd$_list_constructor(_$rapyd$_Result);
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
                        if (is_py_sub) {
                            assignment = null;
                            if (is_("operator") && S.token.value === "=") {
                                next();
                                assignment = expression(true);
                            }
                            return subscripts(new AST_ItemAccess({
                                "start": start,
                                "expression": expr,
                                "property": slice_bounds[0] || new AST_Number({
                                    "value": 0
                                }),
                                "assignment": assignment,
                                "end": prev()
                            }), allow_calls);
                        }
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
                    if (!expr.parens && get_class_in_scope(expr)) {
                        baselib_items["_$rapyd$_interpolate_kwargs_constructor"] = true;
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
                            if (BASELIB_ITEMS.has(tmp_)) {
                                if (BASELIB_FUNCS.has(tmp_)) {
                                    baselib_items[tmp_ + "()"] = true;
                                } else if (BASELIB_ITERTOOLS.has(tmp_)) {
                                    baselib_items["itertools"] = true;
                                } else {
                                    baselib_items[tmp_] = true;
                                }
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

            subscripts.__argnames__ = ["expr", "allow_calls"];

            function maybe_unary(allow_calls) {
                var start, expr, ex, val;
                start = S.token;
                if (is_("operator", "@")) {
                    if (S.parsing_decorator) {
                        croak("Nested decorators are not allowed");
                    }
                    next();
                    S.parsing_decorator = true;
                    expr = expression();
                    S.parsing_decorator = false;
                    S.decorators.push(expr);
                    return new AST_EmptyStatement({
                        "stype": "@",
                        "start": prev(),
                        "end": prev()
                    });
                }
                if (is_("operator") && UNARY_PREFIX(start.value)) {
                    next();
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

            maybe_unary.__argnames__ = ["allow_calls"];

            function make_unary(ctor, op, expr) {
                return new ctor({
                    "operator": op,
                    "expression": expr
                });
            };

            make_unary.__argnames__ = ["ctor", "op", "expr"];

            function expr_op(left, min_prec, no_in) {
                var op, not_in, prec, right, ret;
                op = (is_("operator")) ? S.token.value : null;
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
                        baselib_items["_$rapyd$_in()"] = true;
                    }
                }
                prec = (op !== null) ? PRECEDENCE[op] : null;
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

            expr_op.__argnames__ = ["left", "min_prec", "no_in"];

            function expr_ops(no_in) {
                return expr_op(maybe_unary(true), 0, no_in);
            };

            expr_ops.__argnames__ = ["no_in"];

            function maybe_conditional(no_in) {
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

            maybe_conditional.__argnames__ = ["no_in"];

            function create_assign(data) {
                if (data.right && data.right instanceof AST_Seq && (data.right.car instanceof AST_Assign || data.right.cdr instanceof AST_Assign) && data.operator !== "=") {
                    token_error(data.start, "Invalid assignment operator for chained assignment: " + data.operator);
                }
                return new AST_Assign(data);
            };

            create_assign.__argnames__ = ["data"];

            function maybe_assign(no_in, only_plain_assignment) {
                var start, left, val;
                start = S.token;
                left = maybe_conditional(no_in);
                val = S.token.value;
                if (is_("operator") && ASSIGNMENT(val)) {
                    if (only_plain_assignment && val !== "=") {
                        croak("Invalid assignment operator for chained assignment: " + val);
                    }
                    next();
                    return create_assign({
                        "start": start,
                        "left": left,
                        "operator": val,
                        "right": maybe_assign(no_in, true),
                        "end": prev()
                    });
                }
                return left;
            };

            maybe_assign.__argnames__ = ["no_in", "only_plain_assignment"];

            function expression(commas, no_in) {
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
                };

                build_seq.__argnames__ = ["a"];

                if (commas) {
                    left = [ expr ];
                    while (is_("punc", ",") && !peek().nlb) {
                        next();
                        if (expr instanceof AST_Assign) {
                            left[left.length-1] = left[left.length-1].left;
                            return create_assign({
                                "start": start,
                                "left": (left.length === 1) ? left[0] : new AST_Array({
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
                    if (left.length > 1 && left[left.length-1] instanceof AST_Assign) {
                        left[left.length-1] = left[left.length-1].left;
                        return create_assign({
                            "start": start,
                            "left": new AST_Array({
                                "elements": left
                            }),
                            "operator": expr.operator,
                            "right": expr.right,
                            "end": peek()
                        });
                    }
                    return build_seq(left);
                }
                return expr;
            };

            expression.__argnames__ = ["commas", "no_in"];

            function in_loop(cont) {
                var ret;
                S.in_loop += 1;
                ret = cont();
                S.in_loop -= 1;
                return ret;
            };

            in_loop.__argnames__ = ["cont"];

            function run_parser() {
                var start, _$rapyd$_chain_assign_temp, body, first_token, element, shebang, end, toplevel, seen_exports;
                _$rapyd$_chain_assign_temp = next();
                start = _$rapyd$_chain_assign_temp;
                S.token = _$rapyd$_chain_assign_temp;
;
                body = _$rapyd$_list_decorate([]);
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
                        "shebang": shebang,
                        "end": end
                    });
                }
                toplevel.nonlocalvars = scan_for_nonlocal_defs(toplevel.body);
                toplevel.localvars = _$rapyd$_list_decorate([]);
                toplevel.exports = _$rapyd$_list_decorate([]);
                seen_exports = {};
                function add_item(item, isvar) {
                    var symbol;
                    if (toplevel.nonlocalvars.indexOf(item) < 0) {
                        symbol = new_symbol(AST_SymbolVar, item);
                        if (isvar) {
                            toplevel.localvars.push(symbol);
                        }
                        if (!Object.prototype.hasOwnProperty.call(seen_exports, item)) {
                            toplevel.exports.push(symbol);
                            seen_exports[item] = true;
                        }
                    }
                };

                add_item.__argnames__ = ["item", "isvar"];

                scan_for_local_vars(toplevel.body).forEach((function() {
                    var _$rapyd$_anonfunc = function (item) {
                        add_item(item, true);
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["item"];
                    return _$rapyd$_anonfunc;
                })());
                scan_for_top_level_callables(toplevel.body).forEach((function() {
                    var _$rapyd$_anonfunc = function (item) {
                        add_item(item, false);
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["item"];
                    return _$rapyd$_anonfunc;
                })());
                toplevel.filename = options.filename;
                toplevel.submodules = _$rapyd$_list_decorate([]);
                toplevel.imported_module_ids = imported_module_ids;
                toplevel.classes = scan_for_classes(toplevel.body);
                toplevel.import_order = Object.keys(imported_modules).length;
                toplevel.module_id = module_id;
                imported_modules[module_id] = toplevel;
                toplevel.imports = imported_modules;
                toplevel.baselib = baselib_items;
                importing_modules[module_id] = false;
                return toplevel;
            };

            return run_parser;
        };

        create_parser_ctx.__argnames__ = ["S", "import_dirs", "module_id", "baselib_items", "imported_module_ids", "imported_modules", "importing_modules", "options"];

        function parse(text, options) {
            var import_dirs, x, location, module_id, baselib_items, imported_module_ids, imported_modules, importing_modules, S, obj, cname;
            options = defaults(options, {
                "filename": null,
                "auto_bind": false,
                "module_id": "__main__",
                "toplevel": null,
                "for_linting": false,
                "import_dirs": [],
                "classes": undefined
            });
            import_dirs = (function() {
                var _$rapyd$_Iter = _$rapyd$_Iterable(options.import_dirs), _$rapyd$_Result = [], x;
                for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                    x = _$rapyd$_Iter[_$rapyd$_Index];
                    _$rapyd$_Result.push(x);
                }
                _$rapyd$_Result = _$rapyd$_list_constructor(_$rapyd$_Result);
                return _$rapyd$_Result;
            })();
            var _$rapyd$_Iter51 = _$rapyd$_Iterable([options.libdir, options.basedir]);
            for (var _$rapyd$_Index51 = 0; _$rapyd$_Index51 < _$rapyd$_Iter51.length; _$rapyd$_Index51++) {
                location = _$rapyd$_Iter51[_$rapyd$_Index51];
                if (location) {
                    import_dirs.push(location);
                }
            }
            module_id = options.module_id;
            baselib_items = {};
            imported_module_ids = _$rapyd$_list_decorate([]);
            imported_modules = options.imported_modules || {};
            importing_modules = options.importing_modules || {};
            importing_modules[module_id] = true;
            S = {
                "input": (typeof text === "string") ? tokenizer(text, options.filename) : text,
                "token": null,
                "prev": null,
                "peeked": _$rapyd$_list_decorate([]),
                "in_function": 0,
                "in_directives": true,
                "statement_starting_token": null,
                "in_comprehension": false,
                "in_parenthesized_expr": false,
                "in_loop": 0,
                "in_class": _$rapyd$_list_decorate([ false ]),
                "classes": _$rapyd$_list_decorate([ {} ]),
                "functions": _$rapyd$_list_decorate([ {} ]),
                "labels": _$rapyd$_list_decorate([]),
                "decorators": [],
                "parsing_decorator": false
            };
            if (options.classes) {
                var _$rapyd$_Iter52 = _$rapyd$_Iterable(options.classes);
                for (var _$rapyd$_Index52 = 0; _$rapyd$_Index52 < _$rapyd$_Iter52.length; _$rapyd$_Index52++) {
                    cname = _$rapyd$_Iter52[_$rapyd$_Index52];
                    obj = options.classes[cname];
                    S.classes[0][cname] = {
                        "static": obj.static,
                        "bound": obj.bound
                    };
                }
            }
            return create_parser_ctx(S, import_dirs, module_id, baselib_items, imported_module_ids, imported_modules, importing_modules, options)();
        };

        parse.__argnames__ = ["text", "options"];

        _$rapyd$_modules.parse.COMPILER_VERSION = COMPILER_VERSION;
        _$rapyd$_modules.parse.BASELIB_ITEMS = BASELIB_ITEMS;
        _$rapyd$_modules.parse.BASELIB_FUNCS = BASELIB_FUNCS;
        _$rapyd$_modules.parse.BASELIB_ITERTOOLS = BASELIB_ITERTOOLS;
        _$rapyd$_modules.parse.NATIVE_CLASSES = NATIVE_CLASSES;
        _$rapyd$_modules.parse.ERROR_CLASSES = ERROR_CLASSES;
        _$rapyd$_modules.parse.COMMON_STATIC = COMMON_STATIC;
        _$rapyd$_modules.parse.UNARY_PREFIX = UNARY_PREFIX;
        _$rapyd$_modules.parse.ASSIGNMENT = ASSIGNMENT;
        _$rapyd$_modules.parse.PRECEDENCE = PRECEDENCE;
        _$rapyd$_modules.parse.STATEMENTS_WITH_LABELS = STATEMENTS_WITH_LABELS;
        _$rapyd$_modules.parse.ATOMIC_START_TOKEN = ATOMIC_START_TOKEN;
        _$rapyd$_modules.parse.compile_time_decorators = compile_time_decorators;
        _$rapyd$_modules.parse.has_simple_decorator = has_simple_decorator;
        _$rapyd$_modules.parse.has_setter_decorator = has_setter_decorator;
        _$rapyd$_modules.parse.create_parser_ctx = create_parser_ctx;
        _$rapyd$_modules.parse.parse = parse;
    })();

    (function(){
        var __name__ = "output";

        _$rapyd$_modules["output"]["stream"] = _$rapyd$_modules["output.stream"];
        _$rapyd$_modules["output"]["statements"] = _$rapyd$_modules["output.statements"];
        _$rapyd$_modules["output"]["exceptions"] = _$rapyd$_modules["output.exceptions"];
        _$rapyd$_modules["output"]["functions"] = _$rapyd$_modules["output.functions"];
        _$rapyd$_modules["output"]["classes"] = _$rapyd$_modules["output.classes"];
        _$rapyd$_modules["output"]["literals"] = _$rapyd$_modules["output.literals"];
        _$rapyd$_modules["output"]["loops"] = _$rapyd$_modules["output.loops"];
        _$rapyd$_modules["output"]["modules"] = _$rapyd$_modules["output.modules"];
        _$rapyd$_modules["output"]["operators"] = _$rapyd$_modules["output.operators"];
        _$rapyd$_modules["output"]["utils"] = _$rapyd$_modules["output.utils"];
        _$rapyd$_modules["output"]["codegen"] = _$rapyd$_modules["output.codegen"];
    })();

    (function(){
        var __name__ = "output.stream";
        var DANGEROUS, require_semi_colon_chars;
        var make_predicate = _$rapyd$_modules.utils.make_predicate;
        var defaults = _$rapyd$_modules.utils.defaults;
        var repeat_string = _$rapyd$_modules.utils.repeat_string;
        
        var is_identifier_char = _$rapyd$_modules.tokenizer.is_identifier_char;
        
        DANGEROUS = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        function to_ascii(str_, identifier) {
            return str_.replace(/[\u0080-\uffff]/g, (function() {
                var _$rapyd$_anonfunc = function (ch) {
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
                };

                _$rapyd$_anonfunc.__argnames__ = ["ch"];
                return _$rapyd$_anonfunc;
            })());
        };

        to_ascii.__argnames__ = ["str_", "identifier"];

        function encode_string(str_) {
            return JSON.stringify(str_).replace(DANGEROUS, (function() {
                var _$rapyd$_anonfunc = function (a) {
                    return "\\u" + a.charCodeAt(0).toString(16);
                };

                _$rapyd$_anonfunc.__argnames__ = ["a"];
                return _$rapyd$_anonfunc;
            })());
        };

        encode_string.__argnames__ = ["str_"];

        require_semi_colon_chars = make_predicate("( [ + * / - , .");
        function OutputStream() {
            if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
            OutputStream.prototype.__init__.apply(this, arguments);
        }
        OutputStream.prototype.__init__ = function __init__(options) {
            var self = this;
            self.options = defaults(options, {
                "indent_start": 0,
                "indent_level": 4,
                "quote_keys": false,
                "space_colon": true,
                "ascii_only": false,
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
            self._indentation = 0;
            self.current_col = 0;
            self.current_line = 1;
            self.current_pos = 0;
            self.OUTPUT = "";
            self.IMPORTED = {};
            self.might_need_space = false;
            self.might_need_semicolon = false;
            self._last = null;
            self._stack = _$rapyd$_list_decorate([]);
            self.index_counter = 0;
            self.with_counter = 0;
        };

        OutputStream.prototype.__init__.__argnames__ = ["options"];
        OutputStream.__argnames__ = OutputStream.prototype.__init__.__argnames__;
        OutputStream.__handles_kwarg_interpolation__ = OutputStream.prototype.__init__.__handles_kwarg_interpolation__;
        OutputStream.prototype.make_name = function make_name(name) {
            var self = this;
            name = name.toString();
            if (self.options.ascii_only) {
                name = to_ascii(name, true);
            }
            return name;
        };

        OutputStream.prototype.make_name.__argnames__ = ["name"];
        OutputStream.prototype.print_name = function print_name(name) {
            var self = this;
            self.print(self.make_name(name));
        };

        OutputStream.prototype.print_name.__argnames__ = ["name"];
        OutputStream.prototype.make_indent = function make_indent(back) {
            var self = this;
            return repeat_string(" ", self.options.indent_start + self._indentation - back * self.options.indent_level);
        };

        OutputStream.prototype.make_indent.__argnames__ = ["back"];
        OutputStream.prototype.last_char = function last_char() {
            var self = this;
            return self._last.charAt(self._last.length - 1);
        };

        OutputStream.prototype.last_char.__argnames__ = [];
        OutputStream.prototype.maybe_newline = function maybe_newline() {
            var self = this;
            if (self.options.max_line_len && self.current_col > self.options.max_line_len) {
                self.print("\n");
            }
        };

        OutputStream.prototype.maybe_newline.__argnames__ = [];
        OutputStream.prototype.print = function print(str_) {
            var self = this;
            var ch, target_line, prev, a, n;
            str_ = String(str_);
            ch = str_.charAt(0);
            if (self.might_need_semicolon) {
                if ((!ch || ";}".indexOf(ch) < 0) && !/[;]$/.test(self._last)) {
                    if (self.options.semicolons || require_semi_colon_chars(ch)) {
                        self.OUTPUT += ";";
                        self.current_col += 1;
                        self.current_pos += 1;
                    } else {
                        self.OUTPUT += "\n";
                        self.current_pos += 1;
                        self.current_line += 1;
                        self.current_col = 0;
                    }
                    if (!self.options.beautify) {
                        self.might_need_space = false;
                    }
                }
                self.might_need_semicolon = false;
                self.maybe_newline();
            }
            if (!self.options.beautify && self.options.preserve_line && self._stack[self._stack.length - 1]) {
                target_line = self._stack[self._stack.length - 1].start.line;
                while (self.current_line < target_line) {
                    self.OUTPUT += "\n";
                    self.current_pos += 1;
                    self.current_line += 1;
                    self.current_col = 0;
                    self.might_need_space = false;
                }
            }
            if (self.might_need_space) {
                prev = self.last_char();
                if (is_identifier_char(prev) && (is_identifier_char(ch) || ch === "\\") || /^[\+\-\/]$/.test(ch) && ch === prev) {
                    self.OUTPUT += " ";
                    self.current_col += 1;
                    self.current_pos += 1;
                }
                self.might_need_space = false;
            }
            a = str_.split(/\r?\n/);
            n = a.length - 1;
            self.current_line += n;
            if (n === 0) {
                self.current_col += a[n].length;
            } else {
                self.current_col = a[n].length;
            }
            self.current_pos += str_.length;
            self._last = str_;
            self.OUTPUT += str_;
        };

        OutputStream.prototype.print.__argnames__ = ["str_"];
        OutputStream.prototype.space = function space() {
            var self = this;
            if (self.options.beautify) {
                self.print(" ");
            } else {
                self.might_need_space = true;
            }
        };

        OutputStream.prototype.space.__argnames__ = [];
        OutputStream.prototype.indent = function indent(half) {
            var self = this;
            if (self.options.beautify) {
                self.print(self.make_indent((half) ? .5 : 0));
            }
        };

        OutputStream.prototype.indent.__argnames__ = ["half"];
        OutputStream.prototype.with_indent = function with_indent(col, proceed) {
            var self = this;
            var save_indentation, ret;
            if (self.options.beautify) {
                if (col === true) {
                    col = self.next_indent();
                }
                save_indentation = self._indentation;
                self._indentation = col;
                ret = proceed();
                self._indentation = save_indentation;
                return ret;
            } else {
                return proceed();
            }
        };

        OutputStream.prototype.with_indent.__argnames__ = ["col", "proceed"];
        OutputStream.prototype.indentation = function indentation() {
            var self = this;
            return self._indentation;
        };

        OutputStream.prototype.indentation.__argnames__ = [];
        OutputStream.prototype.set_indentation = function set_indentation(val) {
            var self = this;
            if (self.options.beautify) {
                self._indentation = val;
            }
        };

        OutputStream.prototype.set_indentation.__argnames__ = ["val"];
        OutputStream.prototype.newline = function newline() {
            var self = this;
            if (self.options.beautify) {
                self.print("\n");
            }
        };

        OutputStream.prototype.newline.__argnames__ = [];
        OutputStream.prototype.semicolon = function semicolon() {
            var self = this;
            if (self.options.beautify) {
                self.print(";");
            } else {
                self.might_need_semicolon = true;
            }
        };

        OutputStream.prototype.semicolon.__argnames__ = [];
        OutputStream.prototype.force_semicolon = function force_semicolon() {
            var self = this;
            self.might_need_semicolon = false;
            self.print(";");
        };

        OutputStream.prototype.force_semicolon.__argnames__ = [];
        OutputStream.prototype.next_indent = function next_indent() {
            var self = this;
            return self._indentation + self.options.indent_level;
        };

        OutputStream.prototype.next_indent.__argnames__ = [];
        OutputStream.prototype.spaced = function spaced() {
            var self = this;
            for (var i=0; i < arguments.length; i++) {
                if (i > 0) {
                    self.space();
                }
                if (typeof arguments[i].print === "function") {
                    arguments[i].print(self);
                } else {
                    self.print(arguments[i]);
                }
            }
        };

        OutputStream.prototype.spaced.__argnames__ = [];
        OutputStream.prototype.end_statement = function end_statement() {
            var self = this;
            self.semicolon();
            self.newline();
        };

        OutputStream.prototype.end_statement.__argnames__ = [];
        OutputStream.prototype.with_block = function with_block(cont) {
            var self = this;
            var ret;
            ret = null;
            self.print("{");
            self.newline();
            self.with_indent(self.next_indent(), (function() {
                var _$rapyd$_anonfunc = function () {
                    ret = cont();
                };
                return _$rapyd$_anonfunc;
            })());
            self.indent();
            self.print("}");
            return ret;
        };

        OutputStream.prototype.with_block.__argnames__ = ["cont"];
        OutputStream.prototype.with_parens = function with_parens(cont) {
            var self = this;
            var ret;
            self.print("(");
            ret = cont();
            self.print(")");
            return ret;
        };

        OutputStream.prototype.with_parens.__argnames__ = ["cont"];
        OutputStream.prototype.with_square = function with_square(cont) {
            var self = this;
            var ret;
            self.print("[");
            ret = cont();
            self.print("]");
            return ret;
        };

        OutputStream.prototype.with_square.__argnames__ = ["cont"];
        OutputStream.prototype.comma = function comma() {
            var self = this;
            self.print(",");
            self.space();
        };

        OutputStream.prototype.comma.__argnames__ = [];
        OutputStream.prototype.colon = function colon() {
            var self = this;
            self.print(":");
            if (self.options.space_colon) {
                self.space();
            }
        };

        OutputStream.prototype.colon.__argnames__ = [];
        OutputStream.prototype.dump_baselib = function dump_baselib(key) {
            var self = this;
            var is_func, v, ckey;
            self.indent();
            is_func = key.substr(key.length - 2) === "()";
            v = (self.options.js_version > 5) ? "const" : "var";
            if (is_func) {
                ckey = key.substr(0, key.length - 2);
                self.spaced(v, ckey, "=", "(");
            }
            self.print(self.options.baselib[key]);
            if (is_func) {
                self.print(")()");
            }
            self.end_statement();
        };

        OutputStream.prototype.dump_baselib.__argnames__ = ["key"];
        OutputStream.prototype.dump_yield = function dump_yield() {
            var self = this;
            var code, ci;
            self.indent();
            self.spaced("var", "_$rapyd$_regenerator", "=", "{}");
            self.end_statement();
            code = regenerate(false, self.options.beautify);
            if (self.options.beautify) {
                code = code.replace(/\/\/.*$/gm, "\n").replace(/^\s*$/gm, "");
                ci = self.make_indent(0);
                code = (function() {
                    var _$rapyd$_Iter = _$rapyd$_Iterable(code.split("\n")), _$rapyd$_Result = [], x;
                    for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                        x = _$rapyd$_Iter[_$rapyd$_Index];
                        _$rapyd$_Result.push(ci + x);
                    }
                    _$rapyd$_Result = _$rapyd$_list_constructor(_$rapyd$_Result);
                    return _$rapyd$_Result;
                })().join("\n");
            }
            self.print(code + "(_$rapyd$_regenerator)");
            self.end_statement();
        };

        OutputStream.prototype.dump_yield.__argnames__ = [];
        OutputStream.prototype.get = function get() {
            var self = this;
            return self.OUTPUT;
        };

        OutputStream.prototype.get.__argnames__ = [];
        OutputStream.prototype.toString = function toString() {
            var self = this;
            return self.OUTPUT;
        };

        OutputStream.prototype.toString.__argnames__ = [];
        OutputStream.prototype.assign = function assign(name) {
            var self = this;
            if (typeof name === "string") {
                self.print(name);
            } else {
                name.print(self);
            }
            self.space();
            self.print("=");
            self.space();
        };

        OutputStream.prototype.assign.__argnames__ = ["name"];
        OutputStream.prototype.current_width = function current_width() {
            var self = this;
            return self.current_col - self._indentation;
        };

        OutputStream.prototype.current_width.__argnames__ = [];
        OutputStream.prototype.should_break = function should_break() {
            var self = this;
            return self.options.width && self.current_width() >= self.options.width;
        };

        OutputStream.prototype.should_break.__argnames__ = [];
        OutputStream.prototype.last = function last() {
            var self = this;
            return self._last;
        };

        OutputStream.prototype.last.__argnames__ = [];
        OutputStream.prototype.print_string = function print_string(str_) {
            var self = this;
            self.print(encode_string(str_));
        };

        OutputStream.prototype.print_string.__argnames__ = ["str_"];
        OutputStream.prototype.import_ = function import_(module) {
            var self = this;
            if (!Object.prototype.hasOwnProperty.call(self.IMPORTED, module.key)) {
                self.IMPORTED[module.key] = module;
            }
        };

        OutputStream.prototype.import_.__argnames__ = ["module"];
        OutputStream.prototype.is_main = function is_main() {
            var self = this;
            return self.OUTPUT.length === 0;
        };

        OutputStream.prototype.is_main.__argnames__ = [];
        OutputStream.prototype.option = function option(opt) {
            var self = this;
            return self.options[opt];
        };

        OutputStream.prototype.option.__argnames__ = ["opt"];
        OutputStream.prototype.line = function line() {
            var self = this;
            return self.current_line;
        };

        OutputStream.prototype.line.__argnames__ = [];
        OutputStream.prototype.col = function col() {
            var self = this;
            return self.current_col;
        };

        OutputStream.prototype.col.__argnames__ = [];
        OutputStream.prototype.pos = function pos() {
            var self = this;
            return self.current_pos;
        };

        OutputStream.prototype.pos.__argnames__ = [];
        OutputStream.prototype.push_node = function push_node(node) {
            var self = this;
            self._stack.push(node);
        };

        OutputStream.prototype.push_node.__argnames__ = ["node"];
        OutputStream.prototype.pop_node = function pop_node() {
            var self = this;
            return self._stack.pop();
        };

        OutputStream.prototype.pop_node.__argnames__ = [];
        OutputStream.prototype.stack = function stack() {
            var self = this;
            return self._stack;
        };

        OutputStream.prototype.stack.__argnames__ = [];
        OutputStream.prototype.parent = function parent(n) {
            var self = this;
            return self._stack[self._stack.length - 2 - (n || 0)];
        };

        OutputStream.prototype.parent.__argnames__ = ["n"];
        OutputStream.prototype.__repr__ = function __repr__ () {
            return "<" + __name__ + "." + "OutputStream" + " #" + this._$rapyd$_object_id + ">";
        };
        OutputStream.prototype.__str__ = function __str__ () {
            return this.__repr__();
        };

        _$rapyd$_modules["output.stream"].DANGEROUS = DANGEROUS;
        _$rapyd$_modules["output.stream"].require_semi_colon_chars = require_semi_colon_chars;
        _$rapyd$_modules["output.stream"].to_ascii = to_ascii;
        _$rapyd$_modules["output.stream"].encode_string = encode_string;
        _$rapyd$_modules["output.stream"].OutputStream = OutputStream;
    })();

    (function(){
        var __name__ = "output.statements";
        var AST_Definitions = _$rapyd$_modules.ast.AST_Definitions;
        var AST_Scope = _$rapyd$_modules.ast.AST_Scope;
        var AST_Method = _$rapyd$_modules.ast.AST_Method;
        var AST_Except = _$rapyd$_modules.ast.AST_Except;
        var AST_EmptyStatement = _$rapyd$_modules.ast.AST_EmptyStatement;
        var AST_Statement = _$rapyd$_modules.ast.AST_Statement;
        var AST_Seq = _$rapyd$_modules.ast.AST_Seq;
        var AST_BaseCall = _$rapyd$_modules.ast.AST_BaseCall;
        var AST_Dot = _$rapyd$_modules.ast.AST_Dot;
        var AST_Sub = _$rapyd$_modules.ast.AST_Sub;
        var AST_ItemAccess = _$rapyd$_modules.ast.AST_ItemAccess;
        var AST_Conditional = _$rapyd$_modules.ast.AST_Conditional;
        var AST_Binary = _$rapyd$_modules.ast.AST_Binary;
        var AST_UnaryPostfix = _$rapyd$_modules.ast.AST_UnaryPostfix;
        var AST_BlockStatement = _$rapyd$_modules.ast.AST_BlockStatement;
        
        function force_statement(stat, output) {
            if (output.option("bracketize")) {
                if (!stat || stat instanceof AST_EmptyStatement) {
                    output.print("{}");
                } else if (stat instanceof AST_BlockStatement) {
                    stat.print(output);
                } else {
                    output.with_block((function() {
                        var _$rapyd$_anonfunc = function () {
                            output.indent();
                            stat.print(output);
                            output.newline();
                        };
                        return _$rapyd$_anonfunc;
                    })());
                }
            } else {
                if (!stat || stat instanceof AST_EmptyStatement) {
                    output.force_semicolon();
                } else {
                    stat.print(output);
                }
            }
        };

        force_statement.__argnames__ = ["stat", "output"];

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
                if (p instanceof AST_Seq && p.car === node || p instanceof AST_BaseCall && p.expression === node || p instanceof AST_Dot && p.expression === node || p instanceof AST_Sub && p.expression === node || p instanceof AST_ItemAccess && p.expression === node || p instanceof AST_Conditional && p.condition === node || p instanceof AST_Binary && p.left === node || p instanceof AST_UnaryPostfix && p.expression === node) {
                    node = p;
                    p = a[i -= 1];
                } else {
                    return false;
                }
            }
        };

        first_in_statement.__argnames__ = ["output"];

        function bind_methods(methods, output) {
            var arg;
            if (methods) {
                var _$rapyd$_Iter53 = _$rapyd$_Iterable(methods);
                for (var _$rapyd$_Index53 = 0; _$rapyd$_Index53 < _$rapyd$_Iter53.length; _$rapyd$_Index53++) {
                    arg = _$rapyd$_Iter53[_$rapyd$_Index53];
                    output.indent();
                    output.print("this.");
                    output.assign(arg);
                    output.print("_$rapyd$_bind");
                    output.with_parens((function() {
                        var _$rapyd$_anonfunc = function () {
                            output.print("this.");
                            output.print(arg);
                            output.comma();
                            output.print("this");
                        };
                        return _$rapyd$_anonfunc;
                    })());
                    output.semicolon();
                    output.newline();
                }
            }
        };

        bind_methods.__argnames__ = ["methods", "output"];

        function declare_vars(vars, output) {
            if (vars.length) {
                output.indent();
                output.print("var");
                output.space();
                vars.forEach((function() {
                    var _$rapyd$_anonfunc = function (arg, i) {
                        if (i) {
                            output.comma();
                        }
                        arg.print(output);
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["arg", "i"];
                    return _$rapyd$_anonfunc;
                })());
                output.semicolon();
                output.newline();
            }
        };

        declare_vars.__argnames__ = ["vars", "output"];

        function display_body(body, is_toplevel, output) {
            var last;
            last = body.length - 1;
            body.forEach((function() {
                var _$rapyd$_anonfunc = function (stmt, i) {
                    if (!(stmt instanceof AST_EmptyStatement) && !(stmt instanceof AST_Definitions)) {
                        output.indent();
                        stmt.print(output);
                        if (!(i === last && is_toplevel)) {
                            output.newline();
                        }
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["stmt", "i"];
                return _$rapyd$_anonfunc;
            })());
        };

        display_body.__argnames__ = ["body", "is_toplevel", "output"];

        function display_complex_body(node, is_toplevel, output, function_preamble) {
            var offset;
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
                function_preamble(node, output, offset);
                if (output.option("auto_bind") && node instanceof AST_Method && node.name && node.name.name === "__init__") {
                    output.indent();
                    output.print("_$rapyd$_rebind_all");
                    output.with_parens((function() {
                        var _$rapyd$_anonfunc = function () {
                            output.print("this");
                            output.comma();
                            output.print("true");
                        };
                        return _$rapyd$_anonfunc;
                    })());
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
        };

        display_complex_body.__argnames__ = ["node", "is_toplevel", "output", "function_preamble"];

        function print_bracketed(node, output, complex, function_preamble) {
            if (node.body.length > 0) {
                output.with_block((function() {
                    var _$rapyd$_anonfunc = function () {
                        if (complex) {
                            display_complex_body(node, false, output, function_preamble);
                        } else {
                            display_body(node.body, false, output, function_preamble);
                        }
                    };
                    return _$rapyd$_anonfunc;
                })());
            } else {
                output.print("{}");
            }
        };

        print_bracketed.__argnames__ = ["node", "output", "complex", "function_preamble"];

        function print_with(self, output) {
            var exits, clause_name, clause;
            exits = [];
            [output.assign("_$rapyd$_with_exception"), output.print("undefined"), output.end_statement()];
            var _$rapyd$_Iter54 = _$rapyd$_Iterable(self.clauses);
            for (var _$rapyd$_Index54 = 0; _$rapyd$_Index54 < _$rapyd$_Iter54.length; _$rapyd$_Index54++) {
                clause = _$rapyd$_Iter54[_$rapyd$_Index54];
                output.with_counter += 1;
                clause_name = "_$rapyd$_with_clause_" + output.with_counter;
                exits.push(clause_name);
                [output.indent(), output.print("var "), output.assign(clause_name)];
                clause.expression.print(output);
                output.end_statement();
                output.indent();
                if (clause.alias) {
                    output.assign(clause.alias.name);
                }
                output.print(clause_name + ".__enter__()");
                output.end_statement();
            }
            [output.indent(), output.print("try"), output.space()];
            output.with_block((function() {
                var _$rapyd$_anonfunc = function () {
                    output.indent();
                    self._do_print_body(output);
                    output.newline();
                };
                return _$rapyd$_anonfunc;
            })());
            [output.space(), output.print("catch(e)")];
            output.with_block((function() {
                var _$rapyd$_anonfunc = function () {
                    [output.indent(), output.assign("_$rapyd$_with_exception"), output.print("e"), output.end_statement()];
                };
                return _$rapyd$_anonfunc;
            })());
            [output.newline(), output.indent(), output.spaced("if", "(_$rapyd$_with_exception", "===", "undefined)")];
            output.with_block((function() {
                var _$rapyd$_anonfunc = function () {
                    var clause;
                    var _$rapyd$_Iter55 = _$rapyd$_Iterable(exits);
                    for (var _$rapyd$_Index55 = 0; _$rapyd$_Index55 < _$rapyd$_Iter55.length; _$rapyd$_Index55++) {
                        clause = _$rapyd$_Iter55[_$rapyd$_Index55];
                        [output.indent(), output.print(clause + ".__exit__()"), output.end_statement()];
                    }
                };
                return _$rapyd$_anonfunc;
            })());
            [output.space(), output.print("else"), output.space()];
            output.with_block((function() {
                var _$rapyd$_anonfunc = function () {
                    var clause;
                    [output.indent(), output.assign("_$rapyd$_with_suppress"), output.print("false"), 
                    output.end_statement()];
                    var _$rapyd$_Iter56 = _$rapyd$_Iterable(exits);
                    for (var _$rapyd$_Index56 = 0; _$rapyd$_Index56 < _$rapyd$_Iter56.length; _$rapyd$_Index56++) {
                        clause = _$rapyd$_Iter56[_$rapyd$_Index56];
                        output.indent();
                        output.spaced("_$rapyd$_with_suppress", "|=", "_$rapyd$_bool(" + clause + ".__exit__(_$rapyd$_with_exception.constructor,", "_$rapyd$_with_exception,", "_$rapyd$_with_exception.stack))");
                        output.end_statement();
                    }
                    [output.indent(), output.spaced("if", "(!_$rapyd$_with_suppress)", "throw _$rapyd$_with_exception"), 
                    output.end_statement()];
                };
                return _$rapyd$_anonfunc;
            })());
        };

        print_with.__argnames__ = ["self", "output"];

        _$rapyd$_modules["output.statements"].force_statement = force_statement;
        _$rapyd$_modules["output.statements"].first_in_statement = first_in_statement;
        _$rapyd$_modules["output.statements"].bind_methods = bind_methods;
        _$rapyd$_modules["output.statements"].declare_vars = declare_vars;
        _$rapyd$_modules["output.statements"].display_body = display_body;
        _$rapyd$_modules["output.statements"].display_complex_body = display_complex_body;
        _$rapyd$_modules["output.statements"].print_bracketed = print_bracketed;
        _$rapyd$_modules["output.statements"].print_with = print_with;
    })();

    (function(){
        var __name__ = "output.exceptions";
        var print_bracketed = _$rapyd$_modules["output.statements"].print_bracketed;
        
        function print_try(self, output) {
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
        };

        print_try.__argnames__ = ["self", "output"];

        function print_catch(self, output) {
            output.print("catch");
            output.space();
            output.with_parens((function() {
                var _$rapyd$_anonfunc = function () {
                    output.print("_$rapyd$_Exception");
                };
                return _$rapyd$_anonfunc;
            })());
            output.space();
            if (self.body.length > 1 || self.body[0].errors.length) {
                output.with_block((function() {
                    var _$rapyd$_anonfunc = function () {
                        var no_default;
                        output.indent();
                        no_default = true;
                        self.body.forEach((function() {
                            var _$rapyd$_anonfunc = function (exception, i) {
                                if (i) {
                                    output.print("else ");
                                }
                                if (exception.errors.length) {
                                    output.print("if");
                                    output.space();
                                    output.with_parens((function() {
                                        var _$rapyd$_anonfunc = function () {
                                            exception.errors.forEach((function() {
                                                var _$rapyd$_anonfunc = function (err, i) {
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
                                                };

                                                _$rapyd$_anonfunc.__argnames__ = ["err", "i"];
                                                return _$rapyd$_anonfunc;
                                            })());
                                        };
                                        return _$rapyd$_anonfunc;
                                    })());
                                    output.space();
                                } else {
                                    no_default = false;
                                }
                                print_bracketed(exception, output, true);
                                output.space();
                            };

                            _$rapyd$_anonfunc.__argnames__ = ["exception", "i"];
                            return _$rapyd$_anonfunc;
                        })());
                        if (no_default) {
                            output.print("else");
                            output.space();
                            output.with_block((function() {
                                var _$rapyd$_anonfunc = function () {
                                    output.indent();
                                    output.print("throw");
                                    output.space();
                                    output.print("_$rapyd$_Exception");
                                    output.semicolon();
                                    output.newline();
                                };
                                return _$rapyd$_anonfunc;
                            })());
                        }
                        output.newline();
                    };
                    return _$rapyd$_anonfunc;
                })());
            } else {
                print_bracketed(self.body[0], output, true);
            }
        };

        print_catch.__argnames__ = ["self", "output"];

        function print_finally(self, output) {
            output.print("finally");
            output.space();
            print_bracketed(self, output);
        };

        print_finally.__argnames__ = ["self", "output"];

        _$rapyd$_modules["output.exceptions"].print_try = print_try;
        _$rapyd$_modules["output.exceptions"].print_catch = print_catch;
        _$rapyd$_modules["output.exceptions"].print_finally = print_finally;
    })();

    (function(){
        var __name__ = "output.functions";
        var anonfunc;
        var AST_ClassCall = _$rapyd$_modules.ast.AST_ClassCall;
        var AST_New = _$rapyd$_modules.ast.AST_New;
        var has_calls = _$rapyd$_modules.ast.has_calls;
        var AST_Dot = _$rapyd$_modules.ast.AST_Dot;
        var AST_SymbolRef = _$rapyd$_modules.ast.AST_SymbolRef;
        
        var OutputStream = _$rapyd$_modules["output.stream"].OutputStream;
        
        var print_bracketed = _$rapyd$_modules["output.statements"].print_bracketed;
        
        anonfunc = "_$rapyd$_anonfunc";
        function decorate(decorators, output, func) {
            var pos;
            pos = 0;
            function wrap() {
                if (pos < decorators.length) {
                    decorators[pos].expression.print(output);
                    pos += 1;
                    output.with_parens((function() {
                        var _$rapyd$_anonfunc = function () {
                            wrap();
                        };
                        return _$rapyd$_anonfunc;
                    })());
                } else {
                    func();
                }
            };

            wrap();
        };

        decorate.__argnames__ = ["decorators", "output", "func"];

        function function_args(argnames, output, strip_first) {
            output.with_parens((function() {
                var _$rapyd$_anonfunc = function () {
                    if (argnames && argnames.length && (argnames.is_simple_func === true || argnames.is_simple_func === undefined)) {
                        ((strip_first) ? argnames.slice(1) : argnames).forEach((function() {
                            var _$rapyd$_anonfunc = function (arg, i) {
                                if (i) {
                                    output.comma();
                                }
                                arg.print(output);
                            };

                            _$rapyd$_anonfunc.__argnames__ = ["arg", "i"];
                            return _$rapyd$_anonfunc;
                        })());
                    }
                };
                return _$rapyd$_anonfunc;
            })());
            output.space();
        };

        function_args.__argnames__ = ["argnames", "output", "strip_first"];

        function function_preamble(node, output, offset) {
            var a, fname, kw, i, _$rapyd$_unpack, c, arg, dname, nargs;
            a = node.argnames;
            if (!a || a.is_simple_func) {
                return;
            }
            fname = (node.name) ? node.name.name : anonfunc;
            kw = "arguments[arguments.length-1]";
            var _$rapyd$_Iter57 = _$rapyd$_Iterable(enumerate(a));
            for (var _$rapyd$_Index57 = 0; _$rapyd$_Index57 < _$rapyd$_Iter57.length; _$rapyd$_Index57++) {
                _$rapyd$_unpack = _$rapyd$_Iter57[_$rapyd$_Index57];
                c = _$rapyd$_unpack[0];
                arg = _$rapyd$_unpack[1];
                i = c - offset;
                if (i >= 0) {
                    output.indent();
                    output.print("var");
                    output.space();
                    output.assign(arg);
                    if (Object.prototype.hasOwnProperty.call(a.defaults, arg.name)) {
                        output.spaced("(arguments[" + i + "]", "===", "undefined", "||", "(", i, "===", "arguments.length-1", "&&", kw, "!==", "null", "&&", "typeof", kw, "===", "\"object\"", "&&", kw, "[_$rapyd$_kwargs_symbol]", "===", "true))", "?", "");
                        [output.print(fname + ".__defaults__."), arg.print(output)];
                        [output.space(), output.print(":"), output.space()];
                    } else {
                        output.spaced("(", i, "===", "arguments.length-1", "&&", kw, "!==", "null", "&&", "typeof", kw, "===", "\"object\"", "&&", kw, "[_$rapyd$_kwargs_symbol]", "===", "true)", "?", "undefined", ":", "");
                    }
                    output.print("arguments[" + i + "]");
                    output.end_statement();
                }
            }
            if (a.kwargs || a.has_defaults) {
                kw = (a.kwargs) ? a.kwargs.name : "_$rapyd$_kwargs_obj";
                output.indent();
                output.spaced("var", kw, "=", "arguments[arguments.length-1]");
                output.end_statement();
                output.indent();
                output.spaced("if", "(" + kw, "===", "null", "||", "typeof", kw, "!==", "\"object\"", "||", kw, "[_$rapyd$_kwargs_symbol]", "!==", "true)", kw, "=", "{}");
                output.end_statement();
                if (a.has_defaults) {
                    var _$rapyd$_Iter58 = _$rapyd$_Iterable(Object.keys(a.defaults));
                    for (var _$rapyd$_Index58 = 0; _$rapyd$_Index58 < _$rapyd$_Iter58.length; _$rapyd$_Index58++) {
                        dname = _$rapyd$_Iter58[_$rapyd$_Index58];
                        output.indent();
                        output.spaced("if", "(Object.prototype.hasOwnProperty.call(" + kw + ",", "\"" + dname + "\"))");
                        output.with_block((function() {
                            var _$rapyd$_anonfunc = function () {
                                output.indent();
                                output.spaced(dname, "=", kw + "." + dname);
                                output.end_statement();
                                if (a.kwargs) {
                                    output.indent();
                                    output.spaced("delete", kw + "." + dname);
                                    output.end_statement();
                                }
                            };
                            return _$rapyd$_anonfunc;
                        })());
                        output.newline();
                    }
                }
            }
            if (a.starargs !== undefined) {
                nargs = a.length - offset;
                output.indent();
                output.spaced("var", a.starargs.name, "=", "Array.prototype.slice.call(arguments,", nargs + ")");
                output.end_statement();
                output.indent();
                output.spaced("if", "(" + kw, "!==", "null", "&&", "typeof", kw, "===", "\"object\"", "&&", kw, "[_$rapyd$_kwargs_symbol]", "===", "true)", a.starargs.name);
                output.print(".pop()");
                output.end_statement();
            }
        };

        function_preamble.__argnames__ = ["node", "output", "offset"];

        function function_annotation(self, output, strip_first, name) {
            var fname, defaults, dkeys;
            fname = name || ((self.name) ? self.name.name : anonfunc);
            defaults = self.argnames.defaults;
            dkeys = Object.keys(self.argnames.defaults);
            if (dkeys.length) {
                [output.newline(), output.indent()];
                output.assign(fname + ".__defaults__");
                output.with_block((function() {
                    var _$rapyd$_anonfunc = function () {
                        dkeys.forEach((function() {
                            var _$rapyd$_anonfunc = function (k, i) {
                                output.indent();
                                [output.print(k + ":"), defaults[k].print(output)];
                                if (i !== dkeys.length - 1) {
                                    [output.print(","), output.space()];
                                }
                                output.newline();
                            };

                            _$rapyd$_anonfunc.__argnames__ = ["k", "i"];
                            return _$rapyd$_anonfunc;
                        })());
                    };
                    return _$rapyd$_anonfunc;
                })());
                output.end_statement();
            }
            if (!self.argnames.is_simple_func) {
                [output.newline(), output.indent()];
                output.assign(fname + ".__handles_kwarg_interpolation__");
                output.print("true");
                output.end_statement();
            }
            if (self.argnames.length) {
                [output.newline(), output.indent()];
                output.assign(fname + ".__argnames__");
                [output.print("["), self.argnames.forEach((function() {
                    var _$rapyd$_anonfunc = function (arg, i) {
                        if (strip_first && i === 0) {
                            return;
                        }
                        output.print(JSON.stringify(arg.name));
                        if (i !== self.argnames.length - 1) {
                            [output.print(","), output.space()];
                        }
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["arg", "i"];
                    return _$rapyd$_anonfunc;
                })())];
                output.print("]");
                output.end_statement();
            }
        };

        function_annotation.__argnames__ = ["self", "output", "strip_first", "name"];

        function function_definition(self, output, strip_first, as_expression) {
            var orig_indent;
            as_expression = as_expression || self.is_expression || self.is_anonymous;
            if (as_expression) {
                orig_indent = output.indentation();
                output.set_indentation(output.next_indent());
                [output.spaced("(function()", "{"), output.newline()];
                [output.indent(), output.spaced("var", anonfunc, "="), output.space()];
            }
            [output.print("function"), output.space()];
            if (self.name) {
                self.name.print(output);
            }
            if (self.is_generator) {
                [output.print("()"), output.space()];
                output.with_block((function() {
                    var _$rapyd$_anonfunc = function () {
                        var temp, transpiled, ci;
                        if (output.options.js_version >= 6) {
                            output.indent();
                            output.print("function* js_generator");
                            function_args(self.argnames, output, strip_first);
                            print_bracketed(self, output, true, function_preamble);
                        } else {
                            temp = new OutputStream({
                                "beautify": true
                            });
                            temp.print("function* js_generator");
                            function_args(self.argnames, temp, strip_first);
                            print_bracketed(self, temp, true, function_preamble);
                            transpiled = regenerate(temp.get(), output.options.beautify).replace(/regeneratorRuntime.(wrap|mark)/g, "_$rapyd$_regenerator.regeneratorRuntime.$1");
                            if (output.options.beautify) {
                                ci = output.make_indent(0);
                                transpiled = (function() {
                                    var _$rapyd$_Iter = _$rapyd$_Iterable(transpiled.split("\n")), _$rapyd$_Result = [], x;
                                    for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                                        x = _$rapyd$_Iter[_$rapyd$_Index];
                                        _$rapyd$_Result.push(ci + x);
                                    }
                                    _$rapyd$_Result = _$rapyd$_list_constructor(_$rapyd$_Result);
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
                    };
                    return _$rapyd$_anonfunc;
                })());
            } else {
                function_args(self.argnames, output, strip_first);
                print_bracketed(self, output, true, function_preamble);
            }
            if (as_expression) {
                output.end_statement();
                function_annotation(self, output, strip_first, anonfunc);
                [output.indent(), output.spaced("return", anonfunc), output.end_statement()];
                output.set_indentation(orig_indent);
                [output.indent(), output.print("})()")];
            }
        };

        function_definition.__argnames__ = ["self", "output", "strip_first", "as_expression"];

        function print_function(output) {
            var self;
            self = this;
            if (self.decorators && self.decorators.length) {
                output.print("var");
                output.space();
                output.assign(self.name.name);
                decorate(self.decorators, output, (function() {
                    var _$rapyd$_anonfunc = function () {
                        function_definition(self, output, false, true);
                    };
                    return _$rapyd$_anonfunc;
                })());
                output.end_statement();
            } else {
                function_definition(self, output, false);
                if (!self.is_expression && !self.is_anonymous) {
                    output.end_statement();
                    function_annotation(self, output, false);
                }
            }
        };

        print_function.__argnames__ = ["output"];

        function find_this(expression) {
            if (expression instanceof AST_Dot) {
                return expression.expression;
            }
            if (!(expression instanceof AST_SymbolRef)) {
                return expression;
            }
        };

        find_this.__argnames__ = ["expression"];

        function print_this(expression, output) {
            var obj;
            obj = find_this(expression);
            if (obj) {
                obj.print(output);
            } else {
                output.print("this");
            }
        };

        print_this.__argnames__ = ["expression", "output"];

        function print_function_call(self, output) {
            var has_kwarg_items, has_kwarg_formals, has_kwargs, is_new, is_repeatable;
            function print_function_name() {
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
                    if (!is_repeatable) {
                        output.print("_$rapyd$_expr_temp");
                        if (self.expression instanceof AST_Dot) {
                            self.expression._codegen(self.expression, output, true);
                        }
                    } else {
                        self.expression.print(output);
                    }
                }
            };

            function print_kwargs() {
                output.print("_$rapyd$_desugar_kwargs(");
                if (has_kwarg_items) {
                    self.args.kwarg_items.forEach((function() {
                        var _$rapyd$_anonfunc = function (kwname, i) {
                            if (i > 0) {
                                output.print(",");
                                output.space();
                            }
                            kwname.print(output);
                        };

                        _$rapyd$_anonfunc.__argnames__ = ["kwname", "i"];
                        return _$rapyd$_anonfunc;
                    })());
                    if (has_kwarg_formals) {
                        output.print(",");
                        output.space();
                    }
                }
                if (has_kwarg_formals) {
                    output.print("{");
                    self.args.kwargs.forEach((function() {
                        var _$rapyd$_anonfunc = function (pair, i) {
                            if (i) {
                                output.comma();
                            }
                            pair[0].print(output);
                            output.print(":");
                            output.space();
                            pair[1].print(output);
                        };

                        _$rapyd$_anonfunc.__argnames__ = ["pair", "i"];
                        return _$rapyd$_anonfunc;
                    })());
                    output.print("}");
                }
                output.print(")");
            };

            function print_new(apply) {
                output.print("_$rapyd$_interpolate_kwargs_constructor.call(");
                [output.print("Object.create("), self.expression.print(output), output.print(")")];
                output.comma();
                output.print((apply) ? "true" : "false");
                output.comma();
            };

            print_new.__argnames__ = ["apply"];

            function do_print_this() {
                if (!is_repeatable) {
                    output.print("_$rapyd$_expr_temp");
                } else {
                    print_this(self.expression, output);
                }
                output.comma();
            };

            function print_positional_args() {
                var i, expr, is_first;
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
            };

            has_kwarg_items = self.args.kwarg_items && self.args.kwarg_items.length;
            has_kwarg_formals = self.args.kwargs && self.args.kwargs.length;
            has_kwargs = has_kwarg_items || has_kwarg_formals;
            is_new = self instanceof AST_New;
            is_repeatable = true;
            if (is_new && !self.args.length && !has_kwargs && !self.args.starargs) {
                [output.print("new"), output.space()];
                print_function_name();
                return;
            }
            if (!has_kwargs && !self.args.starargs) {
                if (is_new) {
                    [output.print("new"), output.space()];
                }
                print_function_name();
                output.with_parens((function() {
                    var _$rapyd$_anonfunc = function () {
                        self.args.forEach((function() {
                            var _$rapyd$_anonfunc = function (a, i) {
                                if (i) {
                                    output.comma();
                                }
                                a.print(output);
                            };

                            _$rapyd$_anonfunc.__argnames__ = ["a", "i"];
                            return _$rapyd$_anonfunc;
                        })());
                    };
                    return _$rapyd$_anonfunc;
                })());
                return;
            }
            is_repeatable = is_new || !has_calls(self.expression);
            if (!is_repeatable) {
                [output.assign("(_$rapyd$_expr_temp"), print_this(self.expression, output), output.comma()];
            }
            if (has_kwargs) {
                if (is_new) {
                    print_new(false);
                } else {
                    output.print("_$rapyd$_interpolate_kwargs.call(");
                    do_print_this();
                }
                print_function_name();
                output.comma();
            } else {
                if (is_new) {
                    print_new(true);
                    print_function_name();
                    output.comma();
                } else {
                    print_function_name();
                    output.print(".apply(");
                    do_print_this();
                }
            }
            print_positional_args();
            if (has_kwargs) {
                if (self.args.length) {
                    output.print(".concat(");
                }
                output.print("[");
                print_kwargs();
                output.print("]");
                if (self.args.length) {
                    output.print(")");
                }
            }
            output.print(")");
            if (!is_repeatable) {
                output.print(")");
            }
        };

        print_function_call.__argnames__ = ["self", "output"];

        _$rapyd$_modules["output.functions"].anonfunc = anonfunc;
        _$rapyd$_modules["output.functions"].decorate = decorate;
        _$rapyd$_modules["output.functions"].function_args = function_args;
        _$rapyd$_modules["output.functions"].function_preamble = function_preamble;
        _$rapyd$_modules["output.functions"].function_annotation = function_annotation;
        _$rapyd$_modules["output.functions"].function_definition = function_definition;
        _$rapyd$_modules["output.functions"].print_function = print_function;
        _$rapyd$_modules["output.functions"].find_this = find_this;
        _$rapyd$_modules["output.functions"].print_this = print_this;
        _$rapyd$_modules["output.functions"].print_function_call = print_function_call;
    })();

    (function(){
        var __name__ = "output.classes";
        var AST_Class = _$rapyd$_modules.ast.AST_Class;
        var AST_Method = _$rapyd$_modules.ast.AST_Method;
        
        var decorate = _$rapyd$_modules["output.functions"].decorate;
        var function_definition = _$rapyd$_modules["output.functions"].function_definition;
        var function_annotation = _$rapyd$_modules["output.functions"].function_annotation;
        
        var bind_methods = _$rapyd$_modules["output.statements"].bind_methods;
        
        function print_class(output) {
            var self, class_def, define_method, property_names, defined_methods;
            self = this;
            if (self.external) {
                return;
            }
            class_def = (function() {
                var _$rapyd$_anonfunc = function (method, is_var) {
                    output.indent();
                    self.name.print(output);
                    if (!is_var && method && self.static.indexOf(method) !== -1) {
                        output.assign("." + method);
                    } else {
                        if (is_var) {
                            output.assign(".prototype[" + method + "]");
                        } else {
                            output.assign(".prototype" + ((method) ? "." + method : ""));
                        }
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["method", "is_var"];
                return _$rapyd$_anonfunc;
            })();
            define_method = (function() {
                var _$rapyd$_anonfunc = function (stmt, is_property) {
                    var name, strip_first;
                    name = stmt.name.name;
                    if (!is_property) {
                        class_def(name);
                    }
                    strip_first = self.static.indexOf(name) === -1;
                    if (stmt.decorators && stmt.decorators.length) {
                        decorate(stmt.decorators, output, (function() {
                            var _$rapyd$_anonfunc = function () {
                                function_definition(stmt, output, strip_first, true);
                            };
                            return _$rapyd$_anonfunc;
                        })());
                        output.end_statement();
                    } else {
                        function_definition(stmt, output, strip_first);
                        if (!is_property) {
                            output.end_statement();
                            function_annotation(stmt, output, strip_first, self.name.name + ".prototype." + name);
                        }
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["stmt", "is_property"];
                return _$rapyd$_anonfunc;
            })();
            function define_default_method(name, body) {
                class_def(name);
                output.spaced("function", name, "()", "");
                output.with_block((function() {
                    var _$rapyd$_anonfunc = function () {
                        [output.indent(), body()];
                    };
                    return _$rapyd$_anonfunc;
                })());
                output.end_statement();
            };

            define_default_method.__argnames__ = ["name", "body"];

            function write_constructor() {
                output.print("function");
                output.space();
                self.name.print(output);
                output.print("()");
                output.space();
                output.with_block((function() {
                    var _$rapyd$_anonfunc = function () {
                        bind_methods(self.bound, output);
                        output.indent();
                        output.spaced("if", "(this._$rapyd$_object_id", "===", "undefined)", "Object.defineProperty(this,", "\"_$rapyd$_object_id\",", "{\"value\":++_$rapyd$_object_counter})");
                        output.end_statement();
                        output.indent();
                        self.name.print(output);
                        output.print(".prototype.__init__.apply");
                        output.with_parens((function() {
                            var _$rapyd$_anonfunc = function () {
                                output.print("this");
                                output.comma();
                                output.print("arguments");
                            };
                            return _$rapyd$_anonfunc;
                        })());
                        output.end_statement();
                    };
                    return _$rapyd$_anonfunc;
                })());
            };

            if (self.decorators && self.decorators.length) {
                output.print("var ");
                output.assign(self.name);
                decorate(self.decorators, output, write_constructor);
                output.semicolon();
            } else {
                write_constructor();
            }
            output.newline();
            if (self.parent) {
                output.indent();
                output.print("_$rapyd$_extends");
                output.with_parens((function() {
                    var _$rapyd$_anonfunc = function () {
                        self.name.print(output);
                        output.comma();
                        self.parent.print(output);
                    };
                    return _$rapyd$_anonfunc;
                })());
                output.semicolon();
                output.newline();
            }
            property_names = Object.keys(self.dynamic_properties);
            if (property_names.length) {
                output.indent();
                output.print("Object.defineProperties");
                output.with_parens((function() {
                    var _$rapyd$_anonfunc = function () {
                        [self.name.print(output), output.print(".prototype"), output.comma(), output.space(), 
                        output.with_block((function() {
                            var _$rapyd$_anonfunc = function () {
                                var prop, name;
                                var _$rapyd$_Iter59 = _$rapyd$_Iterable(property_names);
                                for (var _$rapyd$_Index59 = 0; _$rapyd$_Index59 < _$rapyd$_Iter59.length; _$rapyd$_Index59++) {
                                    name = _$rapyd$_Iter59[_$rapyd$_Index59];
                                    prop = self.dynamic_properties[name];
                                    [output.indent(), output.print(JSON.stringify(name) + ":"), output.space()];
                                    output.with_block((function() {
                                        var _$rapyd$_anonfunc = function () {
                                            [output.indent(), output.print("\"enumerable\":"), output.space(), output.print("true"), 
                                            output.comma(), output.newline()];
                                            if (prop.getter) {
                                                [output.indent(), output.print("\"get\":"), output.space()];
                                                [define_method(prop.getter, true), output.comma(), output.newline()];
                                            }
                                            [output.indent(), output.print("\"set\":"), output.space()];
                                            if (prop.setter) {
                                                [define_method(prop.setter, true), output.newline()];
                                            } else {
                                                [output.spaced("function", "()", "{", "throw new AttributeError(\"can't set attribute\")", "}"), 
                                                output.newline()];
                                            }
                                        };
                                        return _$rapyd$_anonfunc;
                                    })());
                                    [output.comma(), output.newline()];
                                }
                            };
                            return _$rapyd$_anonfunc;
                        })())];
                    };
                    return _$rapyd$_anonfunc;
                })());
                output.end_statement();
            }
            if (!self.init) {
                define_default_method("__init__", (function() {
                    var _$rapyd$_anonfunc = function () {
                        if (self.parent) {
                            self.parent.print(output);
                            output.spaced(".prototype.__init__", "&&");
                            [output.space(), self.parent.print(output)];
                            output.print(".prototype.__init__.apply");
                            output.with_parens((function() {
                                var _$rapyd$_anonfunc = function () {
                                    output.print("this");
                                    output.comma();
                                    output.print("arguments");
                                };
                                return _$rapyd$_anonfunc;
                            })());
                            output.end_statement();
                        }
                    };
                    return _$rapyd$_anonfunc;
                })());
            }
            defined_methods = {};
            self.body.forEach((function() {
                var _$rapyd$_anonfunc = function (stmt, i) {
                    var sname, attr;
                    if (stmt instanceof AST_Method) {
                        if (stmt.is_getter || stmt.is_setter) {
                            return;
                        }
                        define_method(stmt);
                        defined_methods[stmt.name.name] = true;
                        sname = stmt.name.name;
                        if (sname === "__init__") {
                            var _$rapyd$_Iter60 = _$rapyd$_Iterable(_$rapyd$_list_decorate([ ".__argnames__", ".__handles_kwarg_interpolation__" ]));
                            for (var _$rapyd$_Index60 = 0; _$rapyd$_Index60 < _$rapyd$_Iter60.length; _$rapyd$_Index60++) {
                                attr = _$rapyd$_Iter60[_$rapyd$_Index60];
                                [output.indent(), self.name.print(output), output.assign(attr)];
                                [self.name.print(output), output.print(".prototype.__init__" + attr), output.end_statement()];
                            }
                        }
                        if (sname === "__iter__") {
                            class_def("_$rapyd$_iterator_symbol", true);
                            self.name.print(output);
                            output.print(".prototype." + stmt.name.name);
                            output.end_statement();
                        }
                    } else if (stmt instanceof AST_Class) {
                        console.error("Nested classes aren't supported yet");
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["stmt", "i"];
                return _$rapyd$_anonfunc;
            })());
            if (!defined_methods["__repr__"]) {
                define_default_method("__repr__", (function() {
                    var _$rapyd$_anonfunc = function () {
                        output.spaced("return", "\"<\"", "+", "__name__", "+", "\".\"", "+", "\"");
                        self.name.print(output);
                        output.spaced("\"", "+", "\" #\"", "+", "this._$rapyd$_object_id", "+", "\">\"");
                        output.end_statement();
                    };
                    return _$rapyd$_anonfunc;
                })());
            }
            if (!defined_methods["__str__"]) {
                define_default_method("__str__", (function() {
                    var _$rapyd$_anonfunc = function () {
                        output.spaced("return", "this.__repr__()");
                        output.end_statement();
                    };
                    return _$rapyd$_anonfunc;
                })());
            }
            self.statements.forEach((function() {
                var _$rapyd$_anonfunc = function (stmt) {
                    if (!(stmt instanceof AST_Method)) {
                        output.indent();
                        stmt.print(output);
                        output.newline();
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["stmt"];
                return _$rapyd$_anonfunc;
            })());
        };

        print_class.__argnames__ = ["output"];

        _$rapyd$_modules["output.classes"].print_class = print_class;
    })();

    (function(){
        var __name__ = "output.literals";
        var AST_Binary = _$rapyd$_modules.ast.AST_Binary;
        
        function print_array(self, output) {
            output.print("_$rapyd$_list_decorate");
            output.with_parens((function() {
                var _$rapyd$_anonfunc = function () {
                    output.with_square((function() {
                        var _$rapyd$_anonfunc = function () {
                            var a, len_;
                            a = self.elements;
                            len_ = a.length;
                            if (len_ > 0) {
                                output.space();
                            }
                            a.forEach((function() {
                                var _$rapyd$_anonfunc = function (exp, i) {
                                    if (i) {
                                        output.comma();
                                    }
                                    exp.print(output);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["exp", "i"];
                                return _$rapyd$_anonfunc;
                            })());
                            if (len_ > 0) {
                                output.space();
                            }
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };
                return _$rapyd$_anonfunc;
            })());
        };

        print_array.__argnames__ = ["self", "output"];

        function print_obj_literal(self, output) {
            output.with_parens((function() {
                var _$rapyd$_anonfunc = function () {
                    output.print("function()");
                    output.with_block((function() {
                        var _$rapyd$_anonfunc = function () {
                            output.indent();
                            if (self.is_pydict) {
                                output.spaced.apply(output, "var _$rapyd$_d = _$rapyd$_dict()".split(" "));
                            } else {
                                output.spaced.apply(output, "var _$rapyd$_d = {}".split(" "));
                            }
                            output.end_statement();
                            self.properties.forEach((function() {
                                var _$rapyd$_anonfunc = function (prop, i) {
                                    output.indent();
                                    if (self.is_pydict) {
                                        output.print("_$rapyd$_d.set");
                                        output.with_parens((function() {
                                            var _$rapyd$_anonfunc = function () {
                                                prop.key.print(output);
                                                [output.print(","), output.space()];
                                                prop.value.print(output);
                                            };
                                            return _$rapyd$_anonfunc;
                                        })());
                                    } else {
                                        output.print("_$rapyd$_d");
                                        output.with_square((function() {
                                            var _$rapyd$_anonfunc = function () {
                                                prop.key.print(output);
                                            };
                                            return _$rapyd$_anonfunc;
                                        })());
                                        [output.space(), output.print("="), output.space()];
                                        prop.value.print(output);
                                    }
                                    output.end_statement();
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["prop", "i"];
                                return _$rapyd$_anonfunc;
                            })());
                            output.indent();
                            output.spaced("return", "_$rapyd$_d");
                            output.end_statement();
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };
                return _$rapyd$_anonfunc;
            })());
            output.print("()");
        };

        print_obj_literal.__argnames__ = ["self", "output"];

        function print_object(self, output) {
            if (self.is_pydict) {
                if (self.properties.length > 0) {
                    print_obj_literal(self, output);
                } else {
                    output.print("_$rapyd$_dict()");
                }
            } else {
                if (self.properties.length > 0) {
                    output.with_block((function() {
                        var _$rapyd$_anonfunc = function () {
                            self.properties.forEach((function() {
                                var _$rapyd$_anonfunc = function (prop, i) {
                                    if (i) {
                                        output.print(",");
                                        output.newline();
                                    }
                                    output.indent();
                                    prop.print(output);
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["prop", "i"];
                                return _$rapyd$_anonfunc;
                            })());
                            output.newline();
                        };
                        return _$rapyd$_anonfunc;
                    })());
                } else {
                    output.print("{}");
                }
            }
        };

        print_object.__argnames__ = ["self", "output"];

        function print_set(self, output) {
            if (self.items.length === 0) {
                output.print("_$rapyd$_set()");
                return;
            }
            output.with_parens((function() {
                var _$rapyd$_anonfunc = function () {
                    output.print("function()");
                    output.with_block((function() {
                        var _$rapyd$_anonfunc = function () {
                            output.indent();
                            output.spaced.apply(output, "var s = _$rapyd$_set()".split(" "));
                            output.end_statement();
                            self.items.forEach((function() {
                                var _$rapyd$_anonfunc = function (item, i) {
                                    output.indent();
                                    output.print("s.jsset.add");
                                    output.with_parens((function() {
                                        var _$rapyd$_anonfunc = function () {
                                            item.value.print(output);
                                        };
                                        return _$rapyd$_anonfunc;
                                    })());
                                    output.end_statement();
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["item", "i"];
                                return _$rapyd$_anonfunc;
                            })());
                            output.indent();
                            output.spaced("return", "s");
                            output.end_statement();
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };
                return _$rapyd$_anonfunc;
            })());
            output.print("()");
        };

        print_set.__argnames__ = ["self", "output"];

        function print_regexp(self, output) {
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
        };

        print_regexp.__argnames__ = ["self", "output"];

        _$rapyd$_modules["output.literals"].print_array = print_array;
        _$rapyd$_modules["output.literals"].print_obj_literal = print_obj_literal;
        _$rapyd$_modules["output.literals"].print_object = print_object;
        _$rapyd$_modules["output.literals"].print_set = print_set;
        _$rapyd$_modules["output.literals"].print_regexp = print_regexp;
    })();

    (function(){
        var __name__ = "output.loops";
        var AST_BaseCall = _$rapyd$_modules.ast.AST_BaseCall;
        var AST_SymbolRef = _$rapyd$_modules.ast.AST_SymbolRef;
        var AST_Array = _$rapyd$_modules.ast.AST_Array;
        var AST_Unary = _$rapyd$_modules.ast.AST_Unary;
        var AST_Number = _$rapyd$_modules.ast.AST_Number;
        
        var OutputStream = _$rapyd$_modules["output.stream"].OutputStream;
        
        function unpack_tuple(elems, output, in_statement) {
            elems.forEach((function() {
                var _$rapyd$_anonfunc = function (elem, i) {
                    output.indent();
                    output.assign(elem);
                    output.print("_$rapyd$_unpack");
                    output.with_square((function() {
                        var _$rapyd$_anonfunc = function () {
                            output.print(i);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                    if (!in_statement || i < elems.length - 1) {
                        output.semicolon();
                        output.newline();
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["elem", "i"];
                return _$rapyd$_anonfunc;
            })());
        };

        unpack_tuple.__argnames__ = ["elems", "output", "in_statement"];

        function print_do_loop(self, output) {
            output.print("do");
            output.space();
            self._do_print_body(output);
            output.space();
            output.print("while");
            output.space();
            output.with_parens((function() {
                var _$rapyd$_anonfunc = function () {
                    self.condition.print(output);
                };
                return _$rapyd$_anonfunc;
            })());
            output.semicolon();
        };

        print_do_loop.__argnames__ = ["self", "output"];

        function print_while_loop(self, output) {
            output.print("while");
            output.space();
            output.with_parens((function() {
                var _$rapyd$_anonfunc = function () {
                    self.condition.print(output);
                };
                return _$rapyd$_anonfunc;
            })());
            output.space();
            self._do_print_body(output);
        };

        print_while_loop.__argnames__ = ["self", "output"];

        function is_simple_for_in(self) {
            if (self.object instanceof AST_BaseCall && self.object.expression instanceof AST_SymbolRef && self.object.expression.name === "dir" && self.object.args.length === 1) {
                return true;
            }
            return false;
        };

        is_simple_for_in.__argnames__ = ["self"];

        function is_simple_for(self) {
            if (self.object instanceof AST_BaseCall && self.object.expression instanceof AST_SymbolRef && self.object.expression.name === "range" && !(self.init instanceof AST_Array) && (self.object.args.length < 3 || self.object.args.slice(-1)[0] instanceof AST_Number || self.object.args.slice(-1)[0] instanceof AST_Unary && self.object.args.slice(-1)[0].operator === "-" && self.object.args.slice(-1)[0].expression instanceof AST_Number)) {
                return true;
            }
            return false;
        };

        is_simple_for.__argnames__ = ["self"];

        function print_for_loop_body(output) {
            var self;
            self = this;
            output.with_block((function() {
                var _$rapyd$_anonfunc = function () {
                    var itervar, flat;
                    if (!(self.simple_for_index || is_simple_for_in(self))) {
                        output.indent();
                        if (output.option("js_version") === 5) {
                            itervar = "_$rapyd$_Iter" + output.index_counter + "[_$rapyd$_Index" + output.index_counter + "]";
                        } else {
                            itervar = "_$rapyd$_Index" + output.index_counter;
                        }
                        if (self.init instanceof AST_Array) {
                            flat = self.init.flatten();
                            output.assign("_$rapyd$_unpack");
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
                    if (self.simple_for_index) {
                        output.indent();
                        output.assign(self.init);
                        output.print(self.simple_for_index);
                        output.end_statement();
                    }
                    self.body.body.forEach((function() {
                        var _$rapyd$_anonfunc = function (stmt, i) {
                            output.indent();
                            stmt.print(output);
                            output.newline();
                        };

                        _$rapyd$_anonfunc.__argnames__ = ["stmt", "i"];
                        return _$rapyd$_anonfunc;
                    })());
                };
                return _$rapyd$_anonfunc;
            })());
        };

        print_for_loop_body.__argnames__ = ["output"];

        function init_es6_itervar(output, itervar) {
            output.indent();
            output.spaced(itervar, "=", "((typeof", itervar + "[Symbol.iterator]", "===", "\"function\")", "?", "(" + itervar, "instanceof", "Map", "?", itervar + ".keys()", ":", itervar + ")", ":", "Object.keys(" + itervar + "))");
            output.end_statement();
        };

        init_es6_itervar.__argnames__ = ["output", "itervar"];

        function print_for_in(self, output) {
            var increment, args, tmp_, start, end, idx, _$rapyd$_chain_assign_temp, itervar;
            function write_object() {
                if (self.object.TYPE === "Seq") {
                    new AST_Array({
                        "elements": self.object.to_array()
                    }).print(output);
                } else {
                    self.object.print(output);
                }
            };

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
                _$rapyd$_chain_assign_temp = "_$rapyd$_Index" + output.index_counter;
                self.simple_for_index = _$rapyd$_chain_assign_temp;
                idx = _$rapyd$_chain_assign_temp;
;
                output.index_counter += 1;
                output.print("for");
                output.space();
                output.with_parens((function() {
                    var _$rapyd$_anonfunc = function () {
                        [output.spaced("var", idx, "="), output.space()];
                        (start.print) ? start.print(output) : output.print(start);
                        output.semicolon();
                        output.space();
                        output.print(idx);
                        output.space();
                        (increment instanceof AST_Unary) ? output.print(">") : output.print("<");
                        output.space();
                        end.print(output);
                        output.semicolon();
                        output.space();
                        output.print(idx);
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
                    };
                    return _$rapyd$_anonfunc;
                })());
            } else if (is_simple_for_in(self)) {
                output.print("for");
                output.space();
                output.with_parens((function() {
                    var _$rapyd$_anonfunc = function () {
                        self.init.print(output);
                        output.space();
                        output.print("in");
                        output.space();
                        self.object.args[0].print(output);
                    };
                    return _$rapyd$_anonfunc;
                })());
            } else {
                if (output.options.js_version === 5) {
                    output.assign("var _$rapyd$_Iter" + output.index_counter);
                    output.print("_$rapyd$_Iterable");
                    output.with_parens(write_object);
                    output.semicolon();
                    output.newline();
                    output.indent();
                    output.print("for");
                    output.space();
                    output.with_parens((function() {
                        var _$rapyd$_anonfunc = function () {
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
                        };
                        return _$rapyd$_anonfunc;
                    })());
                } else {
                    itervar = "_$rapyd$_Iter" + output.index_counter;
                    output.assign("var " + itervar);
                    write_object();
                    output.end_statement();
                    init_es6_itervar(output, itervar);
                    output.indent();
                    output.spaced("for", "(var", "_$rapyd$_Index" + output.index_counter, "of", itervar + ")");
                }
            }
            output.space();
            self._do_print_body(output);
        };

        print_for_in.__argnames__ = ["self", "output"];

        function print_list_comprehension(self, output) {
            var result_obj, is_generator, es5, add_to_result, push_func;
            result_obj = {
                "ListComprehension": "[]",
                "DictComprehension": "{}",
                "SetComprehension": "_$rapyd$_set()"
            }[self.TYPE];
            is_generator = self.TYPE === "GeneratorComprehension";
            es5 = output.option("js_version") === 5;
            if (self.TYPE === "DictComprehension") {
                if (self.is_pydict) {
                    result_obj = "_$rapyd$_dict()";
                    add_to_result = (function() {
                        var _$rapyd$_anonfunc = function (output) {
                            output.indent();
                            output.print("_$rapyd$_Result.set");
                            output.with_parens((function() {
                                var _$rapyd$_anonfunc = function () {
                                    self.statement.print(output);
                                    [output.space(), output.print(","), output.space()];
                                    output.with_parens((function() {
                                        var _$rapyd$_anonfunc = function () {
                                            if (self.value_statement.TYPE === "Seq") {
                                                output.with_square((function() {
                                                    var _$rapyd$_anonfunc = function () {
                                                        self.value_statement.print(output);
                                                    };
                                                    return _$rapyd$_anonfunc;
                                                })());
                                            } else {
                                                self.value_statement.print(output);
                                            }
                                        };
                                        return _$rapyd$_anonfunc;
                                    })());
                                };
                                return _$rapyd$_anonfunc;
                            })());
                            output.end_statement();
                        };

                        _$rapyd$_anonfunc.__argnames__ = ["output"];
                        return _$rapyd$_anonfunc;
                    })();
                } else {
                    add_to_result = (function() {
                        var _$rapyd$_anonfunc = function (output) {
                            output.indent();
                            output.print("_$rapyd$_Result");
                            output.with_square((function() {
                                var _$rapyd$_anonfunc = function () {
                                    self.statement.print(output);
                                };
                                return _$rapyd$_anonfunc;
                            })());
                            [output.space(), output.print("="), output.space()];
                            output.with_parens((function() {
                                var _$rapyd$_anonfunc = function () {
                                    if (self.value_statement.TYPE === "Seq") {
                                        output.with_square((function() {
                                            var _$rapyd$_anonfunc = function () {
                                                self.value_statement.print(output);
                                            };
                                            return _$rapyd$_anonfunc;
                                        })());
                                    } else {
                                        self.value_statement.print(output);
                                    }
                                };
                                return _$rapyd$_anonfunc;
                            })());
                            output.end_statement();
                        };

                        _$rapyd$_anonfunc.__argnames__ = ["output"];
                        return _$rapyd$_anonfunc;
                    })();
                }
            } else {
                push_func = "_$rapyd$_Result." + ((self.TYPE === "ListComprehension") ? "push" : "add");
                if (is_generator) {
                    push_func = "yield ";
                }
                add_to_result = (function() {
                    var _$rapyd$_anonfunc = function (output) {
                        output.indent();
                        output.print(push_func);
                        output.with_parens((function() {
                            var _$rapyd$_anonfunc = function () {
                                if (self.statement.TYPE === "Seq") {
                                    output.with_square((function() {
                                        var _$rapyd$_anonfunc = function () {
                                            self.statement.print(output);
                                        };
                                        return _$rapyd$_anonfunc;
                                    })());
                                } else {
                                    self.statement.print(output);
                                }
                            };
                            return _$rapyd$_anonfunc;
                        })());
                        output.end_statement();
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["output"];
                    return _$rapyd$_anonfunc;
                })();
            }
            output.with_parens((function() {
                var _$rapyd$_anonfunc = function () {
                    output.print("function");
                    output.print("()");
                    output.space();
                    output.with_block((function() {
                        var _$rapyd$_anonfunc = function () {
                            var body_out, previous_indentation, transpiled, ci;
                            body_out = output;
                            if (is_generator) {
                                if (es5) {
                                    body_out = new OutputStream({
                                        "beautify": true
                                    });
                                }
                                body_out.indent();
                                [body_out.print("function* js_generator()"), body_out.space(), body_out.print("{")];
                                body_out.newline();
                                previous_indentation = output.indentation();
                                output.set_indentation(output.next_indent());
                            }
                            body_out.indent();
                            body_out.assign("var _$rapyd$_Iter");
                            if (es5) {
                                body_out.print("_$rapyd$_Iterable");
                                body_out.with_parens((function() {
                                    var _$rapyd$_anonfunc = function () {
                                        self.object.print(body_out);
                                    };
                                    return _$rapyd$_anonfunc;
                                })());
                            } else {
                                self.object.print(body_out);
                            }
                            if (result_obj) {
                                body_out.comma();
                                body_out.assign("_$rapyd$_Result");
                                body_out.print(result_obj);
                            }
                            if (self.init instanceof AST_Array) {
                                self.init.elements.forEach((function() {
                                    var _$rapyd$_anonfunc = function (i) {
                                        body_out.comma();
                                        i.print(body_out);
                                    };

                                    _$rapyd$_anonfunc.__argnames__ = ["i"];
                                    return _$rapyd$_anonfunc;
                                })());
                            } else {
                                body_out.comma();
                                self.init.print(body_out);
                            }
                            body_out.end_statement();
                            if (!es5) {
                                init_es6_itervar(body_out, "_$rapyd$_Iter");
                            }
                            body_out.indent();
                            body_out.print("for");
                            body_out.space();
                            body_out.with_parens((function() {
                                var _$rapyd$_anonfunc = function () {
                                    if (es5) {
                                        body_out.print("var");
                                        body_out.space();
                                        body_out.assign("_$rapyd$_Index");
                                        body_out.print("0");
                                        body_out.semicolon();
                                        body_out.space();
                                        body_out.print("_$rapyd$_Index");
                                        body_out.space();
                                        body_out.print("<");
                                        body_out.space();
                                        body_out.print("_$rapyd$_Iter.length");
                                        body_out.semicolon();
                                        body_out.space();
                                        body_out.print("_$rapyd$_Index++");
                                    } else {
                                        body_out.spaced("var", "_$rapyd$_Index", "of", "_$rapyd$_Iter");
                                    }
                                };
                                return _$rapyd$_anonfunc;
                            })());
                            body_out.space();
                            body_out.with_block((function() {
                                var _$rapyd$_anonfunc = function () {
                                    var itervar, flat;
                                    body_out.indent();
                                    itervar = (es5) ? "_$rapyd$_Iter[_$rapyd$_Index]" : "_$rapyd$_Index";
                                    if (self.init instanceof AST_Array) {
                                        flat = self.init.flatten();
                                        body_out.assign("_$rapyd$_unpack");
                                        if (flat.length > self.init.elements.length) {
                                            body_out.print("_$rapyd$_flatten(" + itervar + ")");
                                        } else {
                                            body_out.print(itervar);
                                        }
                                        body_out.end_statement();
                                        unpack_tuple(flat, body_out);
                                    } else {
                                        body_out.assign(self.init);
                                        body_out.print(itervar);
                                        body_out.end_statement();
                                    }
                                    if (self.condition) {
                                        body_out.indent();
                                        body_out.print("if");
                                        body_out.space();
                                        body_out.with_parens((function() {
                                            var _$rapyd$_anonfunc = function () {
                                                self.condition.print(body_out);
                                            };
                                            return _$rapyd$_anonfunc;
                                        })());
                                        body_out.space();
                                        body_out.with_block((function() {
                                            var _$rapyd$_anonfunc = function () {
                                                add_to_result(body_out);
                                            };
                                            return _$rapyd$_anonfunc;
                                        })());
                                        body_out.newline();
                                    } else {
                                        add_to_result(body_out);
                                    }
                                };
                                return _$rapyd$_anonfunc;
                            })());
                            body_out.newline();
                            if (self.TYPE === "ListComprehension") {
                                body_out.indent();
                                body_out.spaced("_$rapyd$_Result", "=", "_$rapyd$_list_constructor(_$rapyd$_Result)");
                                body_out.end_statement();
                            }
                            if (!is_generator) {
                                body_out.indent();
                                body_out.print("return _$rapyd$_Result");
                                body_out.end_statement();
                            }
                            if (is_generator) {
                                output.set_indentation(previous_indentation);
                                [body_out.newline(), body_out.indent(), body_out.print("}")];
                                if (es5) {
                                    transpiled = regenerate(body_out.get(), output.options.beautify).replace(/regeneratorRuntime.(wrap|mark)/g, "_$rapyd$_regenerator.regeneratorRuntime.$1");
                                    if (output.options.beautify) {
                                        ci = output.make_indent(0);
                                        transpiled = (function() {
                                            var _$rapyd$_Iter = _$rapyd$_Iterable(transpiled.split("\n")), _$rapyd$_Result = [], x;
                                            for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                                                x = _$rapyd$_Iter[_$rapyd$_Index];
                                                _$rapyd$_Result.push(ci + x);
                                            }
                                            _$rapyd$_Result = _$rapyd$_list_constructor(_$rapyd$_Result);
                                            return _$rapyd$_Result;
                                        })().join("\n");
                                    }
                                    output.print(transpiled);
                                }
                                [output.newline(), output.indent()];
                                output.spaced("var", "result", "=", "js_generator.call(this)");
                                output.end_statement();
                                output.indent();
                                output.spaced("result.send", "=", "result.next");
                                output.end_statement();
                                output.indent();
                                output.spaced("return", "result");
                                output.end_statement();
                            }
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };
                return _$rapyd$_anonfunc;
            })());
            output.print("()");
        };

        print_list_comprehension.__argnames__ = ["self", "output"];

        _$rapyd$_modules["output.loops"].unpack_tuple = unpack_tuple;
        _$rapyd$_modules["output.loops"].print_do_loop = print_do_loop;
        _$rapyd$_modules["output.loops"].print_while_loop = print_while_loop;
        _$rapyd$_modules["output.loops"].is_simple_for_in = is_simple_for_in;
        _$rapyd$_modules["output.loops"].is_simple_for = is_simple_for;
        _$rapyd$_modules["output.loops"].print_for_loop_body = print_for_loop_body;
        _$rapyd$_modules["output.loops"].init_es6_itervar = init_es6_itervar;
        _$rapyd$_modules["output.loops"].print_for_in = print_for_in;
        _$rapyd$_modules["output.loops"].print_list_comprehension = print_list_comprehension;
    })();

    (function(){
        var __name__ = "output.modules";
        var COMPILER_VERSION = _$rapyd$_modules.parse.COMPILER_VERSION;
        
        var declare_vars = _$rapyd$_modules["output.statements"].declare_vars;
        var display_body = _$rapyd$_modules["output.statements"].display_body;
        
        var OutputStream = _$rapyd$_modules["output.stream"].OutputStream;
        
        function write_imports(module, output) {
            var imports, import_id, nonlocalvars, name, module_, module_id;
            imports = _$rapyd$_list_decorate([]);
            var _$rapyd$_Iter61 = _$rapyd$_Iterable(Object.keys(module.imports));
            for (var _$rapyd$_Index61 = 0; _$rapyd$_Index61 < _$rapyd$_Iter61.length; _$rapyd$_Index61++) {
                import_id = _$rapyd$_Iter61[_$rapyd$_Index61];
                imports.push(module.imports[import_id]);
            }
            imports.sort((function() {
                var _$rapyd$_anonfunc = function (a, b) {
                    var _$rapyd$_unpack;
                    _$rapyd$_unpack = [a.import_order, b.import_order];
                    a = _$rapyd$_unpack[0];
                    b = _$rapyd$_unpack[1];
                    return (a < b) ? -1 : (a > b) ? 1 : 0;
                };

                _$rapyd$_anonfunc.__argnames__ = ["a", "b"];
                return _$rapyd$_anonfunc;
            })());
            if (imports.length > 1) {
                output.indent();
                output.print("var _$rapyd$_modules = {};");
                output.newline();
            }
            nonlocalvars = {};
            var _$rapyd$_Iter62 = _$rapyd$_Iterable(imports);
            for (var _$rapyd$_Index62 = 0; _$rapyd$_Index62 < _$rapyd$_Iter62.length; _$rapyd$_Index62++) {
                module_ = _$rapyd$_Iter62[_$rapyd$_Index62];
                var _$rapyd$_Iter63 = _$rapyd$_Iterable(module_.nonlocalvars);
                for (var _$rapyd$_Index63 = 0; _$rapyd$_Index63 < _$rapyd$_Iter63.length; _$rapyd$_Index63++) {
                    name = _$rapyd$_Iter63[_$rapyd$_Index63];
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
            var _$rapyd$_Iter64 = _$rapyd$_Iterable(imports);
            for (var _$rapyd$_Index64 = 0; _$rapyd$_Index64 < _$rapyd$_Iter64.length; _$rapyd$_Index64++) {
                module_ = _$rapyd$_Iter64[_$rapyd$_Index64];
                module_id = module_.module_id;
                if (module_id !== "__main__") {
                    output.indent();
                    if (module_id.indexOf(".") === -1) {
                        output.print("_$rapyd$_modules." + module_id);
                    } else {
                        output.print("_$rapyd$_modules[\"" + module_id + "\"]");
                    }
                    [output.space(), output.print("="), output.space(), output.print("{}")];
                    output.end_statement();
                }
            }
            var _$rapyd$_Iter65 = _$rapyd$_Iterable(imports);
            for (var _$rapyd$_Index65 = 0; _$rapyd$_Index65 < _$rapyd$_Iter65.length; _$rapyd$_Index65++) {
                module_ = _$rapyd$_Iter65[_$rapyd$_Index65];
                if (module_.module_id !== "__main__") {
                    print_module(module_, output);
                }
            }
        };

        write_imports.__argnames__ = ["module", "output"];

        function write_main_name(output) {
            if (output.option("write_name")) {
                output.newline();
                output.indent();
                output.print("var __name__ = \"__main__\"");
                output.semicolon();
                output.newline();
                output.newline();
            }
        };

        write_main_name.__argnames__ = ["output"];

        function declare_exports(module_id, exports, submodules, output) {
            var seen, symbol;
            seen = {};
            output.newline();
            var _$rapyd$_Iter66 = _$rapyd$_Iterable(exports);
            for (var _$rapyd$_Index66 = 0; _$rapyd$_Index66 < _$rapyd$_Iter66.length; _$rapyd$_Index66++) {
                symbol = _$rapyd$_Iter66[_$rapyd$_Index66];
                if (!Object.prototype.hasOwnProperty.call(seen, symbol.name)) {
                    output.indent();
                    if (module_id.indexOf(".") === -1) {
                        output.print("_$rapyd$_modules." + module_id + "." + symbol.name);
                    } else {
                        output.print("_$rapyd$_modules[\"" + module_id + "\"]." + symbol.name);
                    }
                    [output.space(), output.print("="), output.space(), output.print(symbol.name)];
                    seen[symbol.name] = true;
                    output.end_statement();
                }
            }
        };

        declare_exports.__argnames__ = ["module_id", "exports", "submodules", "output"];

        function declare_submodules(module_id, submodules, output) {
            var seen, key, sub_module_id;
            seen = {};
            var _$rapyd$_Iter67 = _$rapyd$_Iterable(submodules);
            for (var _$rapyd$_Index67 = 0; _$rapyd$_Index67 < _$rapyd$_Iter67.length; _$rapyd$_Index67++) {
                sub_module_id = _$rapyd$_Iter67[_$rapyd$_Index67];
                if (!Object.prototype.hasOwnProperty.call(seen, sub_module_id)) {
                    seen[sub_module_id] = true;
                    key = (_$rapyd$_expr_temp = sub_module_id.split("."), _$rapyd$_expr_temp[_$rapyd$_expr_temp.length-1]);
                    output.indent();
                    output.spaced("_$rapyd$_modules[\"" + module_id + "\"][\"" + key + "\"]", "=", "_$rapyd$_modules[\"" + sub_module_id + "\"]");
                    output.end_statement();
                }
            }
        };

        declare_submodules.__argnames__ = ["module_id", "submodules", "output"];

        function prologue(module, output) {
            var v, baselib_items, k, deps, lib;
            if (output.options.omit_baselib) {
                return;
            }
            output.indent();
            v = (output.options.js_version > 5) ? "const" : "var";
            [output.print(v), output.space()];
            output.spaced.apply(output, "_$rapyd$_iterator_symbol = (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") ? Symbol.iterator : \"iterator-Symbol-5d0927e5554349048cf0e3762a228256\"".split(" "));
            output.end_statement();
            [output.indent(), output.print(v), output.space()];
            output.spaced.apply(output, "_$rapyd$_kwargs_symbol = (typeof Symbol === \"function\") ? Symbol(\"kwargs-object\") : \"kwargs-object-Symbol-5d0927e5554349048cf0e3762a228256\"".split(" "));
            output.end_statement();
            [output.indent(), output.spaced("var", "_$rapyd$_cond_temp,", "_$rapyd$_expr_temp"), 
            output.end_statement()];
            [output.indent(), output.spaced("var", "_$rapyd$_object_counter", "=", "0"), output.end_statement()];
            baselib_items = (function() {
                var _$rapyd$_Iter = _$rapyd$_Iterable(module.baselib), _$rapyd$_Result = {}, k;
                for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                    k = _$rapyd$_Iter[_$rapyd$_Index];
                    _$rapyd$_Result[k] = (true);
                }
                return _$rapyd$_Result;
            })();
            baselib_items["errors"] = true;
            baselib_items["containers"] = true;
            baselib_items["builtins"] = true;
            baselib_items["str"] = true;
            deps = output.options.baselib["#dependencies#"];
            var _$rapyd$_Iter68 = _$rapyd$_Iterable(baselib_items);
            for (var _$rapyd$_Index68 = 0; _$rapyd$_Index68 < _$rapyd$_Iter68.length; _$rapyd$_Index68++) {
                lib = _$rapyd$_Iter68[_$rapyd$_Index68];
                if (Object.prototype.hasOwnProperty.call(deps, lib)) {
                    Object.keys(deps[lib]).forEach((function() {
                        var _$rapyd$_anonfunc = function (k) {
                            baselib_items[k] = true;
                        };

                        _$rapyd$_anonfunc.__argnames__ = ["k"];
                        return _$rapyd$_anonfunc;
                    })());
                }
            }
            var _$rapyd$_Iter69 = _$rapyd$_Iterable(baselib_items);
            for (var _$rapyd$_Index69 = 0; _$rapyd$_Index69 < _$rapyd$_Iter69.length; _$rapyd$_Index69++) {
                lib = _$rapyd$_Iter69[_$rapyd$_Index69];
                if (output.options.js_version >= 6 && (lib === "iterable" || lib === "yield")) {
                    continue;
                }
                if (lib === "yield") {
                    output.dump_yield();
                } else {
                    output.dump_baselib(lib);
                }
            }
        };

        prologue.__argnames__ = ["module", "output"];

        function print_top_level(self, output) {
            var is_main;
            is_main = output.is_main();
            if (output.option("private_scope") && is_main) {
                output.with_parens((function() {
                    var _$rapyd$_anonfunc = function () {
                        output.print("function()");
                        output.with_block((function() {
                            var _$rapyd$_anonfunc = function () {
                                output.indent();
                                output.print("\"use strict\"");
                                output.end_statement();
                                prologue(self, output);
                                write_imports(self, output);
                                output.newline();
                                output.indent();
                                output.with_parens((function() {
                                    var _$rapyd$_anonfunc = function () {
                                        output.print("function()");
                                        output.with_block((function() {
                                            var _$rapyd$_anonfunc = function () {
                                                write_main_name(output);
                                                output.newline();
                                                declare_vars(self.localvars, output);
                                                display_body(self.body, true, output);
                                                output.newline();
                                            };
                                            return _$rapyd$_anonfunc;
                                        })());
                                    };
                                    return _$rapyd$_anonfunc;
                                })());
                                output.print("();");
                                output.newline();
                            };
                            return _$rapyd$_anonfunc;
                        })());
                    };
                    return _$rapyd$_anonfunc;
                })());
                output.print("();");
                output.print("");
            } else {
                if (is_main) {
                    prologue(self, output);
                    write_imports(self, output);
                    write_main_name(output);
                }
                declare_vars(self.localvars, output);
                display_body(self.body, true, output);
            }
        };

        print_top_level.__argnames__ = ["self", "output"];

        function print_module(self, output) {
            function output_module(output) {
                declare_vars(self.localvars, output);
                display_body(self.body, true, output);
                declare_exports(self.module_id, self.exports, self.submodules, output);
            };

            output_module.__argnames__ = ["output"];

            output.newline();
            output.indent();
            output.with_parens((function() {
                var _$rapyd$_anonfunc = function () {
                    output.print("function()");
                    output.with_block((function() {
                        var _$rapyd$_anonfunc = function () {
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
                            };

                            output_key.__argnames__ = ["beautify", "auto_bind", "js_version"];

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
                                        "exports": _$rapyd$_list_decorate([]),
                                        "outputs": {}
                                    };
                                    var _$rapyd$_Iter70 = _$rapyd$_Iterable(Object.keys(self.classes));
                                    for (var _$rapyd$_Index70 = 0; _$rapyd$_Index70 < _$rapyd$_Iter70.length; _$rapyd$_Index70++) {
                                        cname = _$rapyd$_Iter70[_$rapyd$_Index70];
                                        cobj = self.classes[cname];
                                        cached.classes[cname] = {
                                            "name": {
                                                "name": cobj.name.name
                                            },
                                            "static": cobj.static,
                                            "bound": cobj.bound
                                        };
                                    }
                                    var _$rapyd$_Iter71 = _$rapyd$_Iterable(self.exports);
                                    for (var _$rapyd$_Index71 = 0; _$rapyd$_Index71 < _$rapyd$_Iter71.length; _$rapyd$_Index71++) {
                                        symdef = _$rapyd$_Iter71[_$rapyd$_Index71];
                                        cached.exports.push({
                                            "name": symdef.name
                                        });
                                    }
                                    var _$rapyd$_Iter72 = _$rapyd$_Iterable(_$rapyd$_list_decorate([ true, false ]));
                                    for (var _$rapyd$_Index72 = 0; _$rapyd$_Index72 < _$rapyd$_Iter72.length; _$rapyd$_Index72++) {
                                        beautify = _$rapyd$_Iter72[_$rapyd$_Index72];
                                        var _$rapyd$_Iter73 = _$rapyd$_Iterable(_$rapyd$_list_decorate([ true, false ]));
                                        for (var _$rapyd$_Index73 = 0; _$rapyd$_Index73 < _$rapyd$_Iter73.length; _$rapyd$_Index73++) {
                                            auto_bind = _$rapyd$_Iter73[_$rapyd$_Index73];
                                            var _$rapyd$_Iter74 = _$rapyd$_Iterable(_$rapyd$_list_decorate([ 5, 6 ]));
                                            for (var _$rapyd$_Index74 = 0; _$rapyd$_Index74 < _$rapyd$_Iter74.length; _$rapyd$_Index74++) {
                                                js_version = _$rapyd$_Iter74[_$rapyd$_Index74];
                                                co = new OutputStream({
                                                    "beautify": beautify,
                                                    "auto_bind": auto_bind,
                                                    "js_version": js_version,
                                                    "private_scope": false,
                                                    "write_name": false
                                                });
                                                co.with_indent(output.indentation(), (function() {
                                                    var _$rapyd$_anonfunc = function () {
                                                        output_module(co);
                                                    };
                                                    return _$rapyd$_anonfunc;
                                                })());
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
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };
                return _$rapyd$_anonfunc;
            })());
            output.print("()");
            output.semicolon();
            output.newline();
        };

        print_module.__argnames__ = ["self", "output"];

        function print_imports(container, output) {
            var akey, argname, bound_name, self;
            function add_aname(aname, key, from_import) {
                output.print("var ");
                output.assign(aname);
                if (key.indexOf(".") === -1) {
                    [output.print("_$rapyd$_modules."), output.print(key)];
                } else {
                    [output.print("_$rapyd$_modules[\""), output.print(key), output.print("\"]")];
                }
                if (from_import) {
                    output.print(".");
                    output.print(from_import);
                }
                output.semicolon();
                output.newline();
                output.indent();
            };

            add_aname.__argnames__ = ["aname", "key", "from_import"];

            var _$rapyd$_Iter75 = _$rapyd$_Iterable(container.imports);
            for (var _$rapyd$_Index75 = 0; _$rapyd$_Index75 < _$rapyd$_Iter75.length; _$rapyd$_Index75++) {
                self = _$rapyd$_Iter75[_$rapyd$_Index75];
                output.import_(self.module);
                if (self.argnames) {
                    var _$rapyd$_Iter76 = _$rapyd$_Iterable(self.argnames);
                    for (var _$rapyd$_Index76 = 0; _$rapyd$_Index76 < _$rapyd$_Iter76.length; _$rapyd$_Index76++) {
                        argname = _$rapyd$_Iter76[_$rapyd$_Index76];
                        akey = (argname.alias) ? argname.alias.name : argname.name;
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
        };

        print_imports.__argnames__ = ["container", "output"];

        _$rapyd$_modules["output.modules"].write_imports = write_imports;
        _$rapyd$_modules["output.modules"].write_main_name = write_main_name;
        _$rapyd$_modules["output.modules"].declare_exports = declare_exports;
        _$rapyd$_modules["output.modules"].declare_submodules = declare_submodules;
        _$rapyd$_modules["output.modules"].prologue = prologue;
        _$rapyd$_modules["output.modules"].print_top_level = print_top_level;
        _$rapyd$_modules["output.modules"].print_module = print_module;
        _$rapyd$_modules["output.modules"].print_imports = print_imports;
    })();

    (function(){
        var __name__ = "output.operators";
        var AST_Number = _$rapyd$_modules.ast.AST_Number;
        var AST_Unary = _$rapyd$_modules.ast.AST_Unary;
        var AST_Seq = _$rapyd$_modules.ast.AST_Seq;
        var AST_Array = _$rapyd$_modules.ast.AST_Array;
        var AST_Binary = _$rapyd$_modules.ast.AST_Binary;
        var AST_Set = _$rapyd$_modules.ast.AST_Set;
        var AST_Object = _$rapyd$_modules.ast.AST_Object;
        var AST_Statement = _$rapyd$_modules.ast.AST_Statement;
        var AST_Conditional = _$rapyd$_modules.ast.AST_Conditional;
        var AST_BaseCall = _$rapyd$_modules.ast.AST_BaseCall;
        var AST_Symbol = _$rapyd$_modules.ast.AST_Symbol;
        var AST_SymbolRef = _$rapyd$_modules.ast.AST_SymbolRef;
        var AST_Assign = _$rapyd$_modules.ast.AST_Assign;
        var AST_Return = _$rapyd$_modules.ast.AST_Return;
        var AST_SimpleStatement = _$rapyd$_modules.ast.AST_SimpleStatement;
        var has_calls = _$rapyd$_modules.ast.has_calls;
        
        var unpack_tuple = _$rapyd$_modules["output.loops"].unpack_tuple;
        
        function print_getattr(self, output, skip_expression) {
            var expr;
            if (!skip_expression) {
                expr = self.expression;
                expr.print(output);
            }
            if (expr instanceof AST_Number && expr.getValue() >= 0) {
                if (!/[xa-f.]/i.test(output.last())) {
                    output.print(".");
                }
            }
            output.print(".");
            output.print_name(self.property);
        };

        print_getattr.__argnames__ = ["self", "output", "skip_expression"];

        function print_getitem(self, output, skip_expression) {
            var is_repeatable, from_end, enclose;
            is_repeatable = !has_calls(self.expression);
            from_end = self.property instanceof AST_Unary && self.property.operator === "-" && self.property.expression instanceof AST_Number;
            enclose = from_end && !is_repeatable && !skip_expression;
            if (enclose) {
                output.assign("(_$rapyd$_expr_temp");
            }
            if (!skip_expression) {
                self.expression.print(output);
            }
            if (enclose) {
                [output.comma(), output.print("_$rapyd$_expr_temp")];
            }
            output.print("[");
            if (from_end) {
                if (enclose) {
                    output.print("_$rapyd$_expr_temp");
                } else {
                    self.expression.print(output);
                }
                output.print(".length");
            }
            self.property.print(output);
            output.print("]");
            if (enclose) {
                output.print(")");
            }
        };

        print_getitem.__argnames__ = ["self", "output", "skip_expression"];

        function print_rich_getitem(self, output, skip_expression) {
            if (!skip_expression) {
                self.expression.print(output);
            }
            output.print(".__" + ((self.assignment) ? "setitem" : "getitem") + "__");
            output.with_parens((function() {
                var _$rapyd$_anonfunc = function () {
                    self.property.print(output);
                    if (self.assignment) {
                        output.comma();
                        self.assignment.print(output);
                    }
                };
                return _$rapyd$_anonfunc;
            })());
        };

        print_rich_getitem.__argnames__ = ["self", "output", "skip_expression"];

        function print_splice_assignment(self, output) {
            output.print("[].splice.apply");
            output.with_parens((function() {
                var _$rapyd$_anonfunc = function () {
                    self.expression.print(output);
                    output.comma();
                    output.with_square((function() {
                        var _$rapyd$_anonfunc = function () {
                            self.property.print(output);
                            output.comma();
                            self.property2.print(output);
                            output.print("-");
                            self.property.print(output);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                    output.print(".concat");
                    output.with_parens((function() {
                        var _$rapyd$_anonfunc = function () {
                            self.assignment.print(output);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };
                return _$rapyd$_anonfunc;
            })());
        };

        print_splice_assignment.__argnames__ = ["self", "output"];

        function print_unary_prefix(self, output) {
            var op;
            op = self.operator;
            output.print(op);
            if (/^[a-z]/i.test(op)) {
                output.space();
            }
            self.expression.print(output);
        };

        print_unary_prefix.__argnames__ = ["self", "output"];

        function print_unary_postfix(self, output) {
            self.expression.print(output);
            output.print(self.operator);
        };

        print_unary_postfix.__argnames__ = ["self", "output"];

        function write_instanceof(left, right, output) {
            function single(left, right) {
                if (right.name === "Array" || right.name === "list") {
                    output.print("Array.isArray");
                    output.with_parens((function() {
                        var _$rapyd$_anonfunc = function () {
                            left.print(output);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                } else {
                    output.spaced(left, "instanceof", right);
                }
            };

            single.__argnames__ = ["left", "right"];

            if (right instanceof AST_Seq) {
                right = new AST_Array({
                    "elements": right.to_array()
                });
            }
            if (right instanceof AST_Array) {
                output.with_parens((function() {
                    var _$rapyd$_anonfunc = function () {
                        right.elements.forEach((function() {
                            var _$rapyd$_anonfunc = function (right, i, arr) {
                                single(left, right);
                                if (arr.length > 1 && i < arr.length - 1) {
                                    [output.space(), output.print("||"), output.space()];
                                }
                            };

                            _$rapyd$_anonfunc.__argnames__ = ["right", "i", "arr"];
                            return _$rapyd$_anonfunc;
                        })());
                    };
                    return _$rapyd$_anonfunc;
                })());
            } else {
                single(left, right);
            }
        };

        write_instanceof.__argnames__ = ["left", "right", "output"];

        function write_smart_equality(self, output) {
            function is_ok(x) {
                return !((x instanceof AST_Array || x instanceof AST_Set || x instanceof AST_Object || x instanceof AST_Statement || x instanceof AST_Binary || x instanceof AST_Conditional || x instanceof AST_BaseCall));
            };

            is_ok.__argnames__ = ["x"];

            if (is_ok(self.left) && is_ok(self.right)) {
                if (self.operator === "==") {
                    output.print("(");
                    output.spaced(self.left, "===", self.right, "||", "typeof", self.left, "===", "\"object\"", "&&", "_$rapyd$_equals(");
                    [self.left.print(output), output.print(","), output.space(), self.right.print(output), 
                    output.print("))")];
                } else {
                    output.print("(");
                    output.spaced(self.left, "!==", self.right, "&&", "(typeof", self.left, "!==", "\"object\"", "||", "_$rapyd$_not_equals(");
                    [self.left.print(output), output.print(","), output.space(), self.right.print(output), 
                    output.print(")))")];
                }
            } else {
                output.print("_$rapyd$_" + ((self.operator === "==") ? "equals(" : "not_equals("));
                [self.left.print(output), output.print(","), output.space(), self.right.print(output), 
                output.print(")")];
            }
        };

        write_smart_equality.__argnames__ = ["self", "output"];

        function print_binary_op(self, output) {
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
                output.with_parens((function() {
                    var _$rapyd$_anonfunc = function () {
                        self.left.print(output);
                        output.comma();
                        self.right.print(output);
                    };
                    return _$rapyd$_anonfunc;
                })());
            } else if (comparators[self.operator] && self.left instanceof AST_Binary && comparators[self.left.operator]) {
                if (self.left.right instanceof AST_Symbol) {
                    self.left.print(output);
                    leftvar = self.left.right.name;
                } else {
                    self.left.left.print(output);
                    output.space();
                    output.print(self.left.operator);
                    output.space();
                    output.with_parens((function() {
                        var _$rapyd$_anonfunc = function () {
                            output.assign("_$rapyd$_cond_temp");
                            self.left.right.print(output);
                            leftvar = "_$rapyd$_cond_temp";
                        };
                        return _$rapyd$_anonfunc;
                    })());
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
                output.with_parens((function() {
                    var _$rapyd$_anonfunc = function () {
                        self.left.print(output);
                        output.space();
                        output.print("/");
                        output.space();
                        self.right.print(output);
                    };
                    return _$rapyd$_anonfunc;
                })());
            } else if (self.operator === "==" || self.operator === "!=") {
                write_smart_equality(self, output);
            } else if (self.operator === "instanceof") {
                write_instanceof(self.left, self.right, output);
            } else {
                output.spaced(self.left, self.operator, self.right);
            }
        };

        print_binary_op.__argnames__ = ["self", "output"];

        function print_assignment(self, output) {
            var flattened, left, flat;
            flattened = false;
            left = self.left;
            if (left instanceof AST_Seq) {
                left = new AST_Array({
                    "elements": [left.car, left.cdr]
                });
            }
            if (left instanceof AST_Array) {
                flat = left.flatten();
                flattened = flat.length > left.elements.length;
                output.print("_$rapyd$_unpack");
            } else {
                left.print(output);
            }
            output.space();
            output.print(self.operator);
            output.space();
            if (flattened) {
                output.print("_$rapyd$_flatten");
                output.with_parens((function() {
                    var _$rapyd$_anonfunc = function () {
                        self.right.print(output);
                    };
                    return _$rapyd$_anonfunc;
                })());
            } else {
                self.right.print(output);
            }
            if (left instanceof AST_Array) {
                output.semicolon();
                output.newline();
                unpack_tuple(flat, output, true);
            }
        };

        print_assignment.__argnames__ = ["self", "output"];

        function print_assign(self, output) {
            var _$rapyd$_unpack, left_hand_sides, rhs, temp_rhs, lhs;
            if (self.operator === "//=") {
                output.assign(self.left);
                output.print("Math.floor");
                output.with_parens((function() {
                    var _$rapyd$_anonfunc = function () {
                        self.left.print(output);
                        output.space();
                        output.print("/");
                        output.space();
                        self.right.print(output);
                    };
                    return _$rapyd$_anonfunc;
                })());
                return;
            }
            if (self.operator === "=" && self.is_chained()) {
                _$rapyd$_unpack = self.traverse_chain();
                left_hand_sides = _$rapyd$_unpack[0];
                rhs = _$rapyd$_unpack[1];
                temp_rhs = new AST_SymbolRef({
                    "name": "_$rapyd$_chain_assign_temp"
                });
                print_assignment(new AST_Assign({
                    "left": temp_rhs,
                    "operator": "=",
                    "right": rhs
                }), output);
                [output.end_statement(), output.indent()];
                var _$rapyd$_Iter77 = _$rapyd$_Iterable(left_hand_sides);
                for (var _$rapyd$_Index77 = 0; _$rapyd$_Index77 < _$rapyd$_Iter77.length; _$rapyd$_Index77++) {
                    lhs = _$rapyd$_Iter77[_$rapyd$_Index77];
                    print_assignment(new AST_Assign({
                        "left": lhs,
                        "right": temp_rhs,
                        "operator": self.operator
                    }), output);
                    output.end_statement();
                    if (lhs !== left_hand_sides[left_hand_sides.length-1]) {
                        output.indent();
                    }
                }
            } else {
                print_assignment(self, output);
            }
        };

        print_assign.__argnames__ = ["self", "output"];

        function print_conditional(self, output, condition, consequent, alternative) {
            var _$rapyd$_unpack;
            _$rapyd$_unpack = [self.condition, self.consequent, self.alternative];
            condition = _$rapyd$_unpack[0];
            consequent = _$rapyd$_unpack[1];
            alternative = _$rapyd$_unpack[2];
            output.with_parens((function() {
                var _$rapyd$_anonfunc = function () {
                    condition.print(output);
                };
                return _$rapyd$_anonfunc;
            })());
            output.space();
            output.print("?");
            output.space();
            consequent.print(output);
            output.space();
            output.colon();
            alternative.print(output);
        };

        print_conditional.__argnames__ = ["self", "output", "condition", "consequent", "alternative"];

        function print_seq(output) {
            var self, p, print_seq;
            self = this;
            p = output.parent();
            print_seq = (function() {
                var _$rapyd$_anonfunc = function () {
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
                return _$rapyd$_anonfunc;
            })();
            if (p instanceof AST_Binary || p instanceof AST_Return || p instanceof AST_Array || p instanceof AST_BaseCall || p instanceof AST_SimpleStatement) {
                output.with_square(print_seq);
            } else {
                print_seq();
            }
        };

        print_seq.__argnames__ = ["output"];

        _$rapyd$_modules["output.operators"].print_getattr = print_getattr;
        _$rapyd$_modules["output.operators"].print_getitem = print_getitem;
        _$rapyd$_modules["output.operators"].print_rich_getitem = print_rich_getitem;
        _$rapyd$_modules["output.operators"].print_splice_assignment = print_splice_assignment;
        _$rapyd$_modules["output.operators"].print_unary_prefix = print_unary_prefix;
        _$rapyd$_modules["output.operators"].print_unary_postfix = print_unary_postfix;
        _$rapyd$_modules["output.operators"].write_instanceof = write_instanceof;
        _$rapyd$_modules["output.operators"].write_smart_equality = write_smart_equality;
        _$rapyd$_modules["output.operators"].print_binary_op = print_binary_op;
        _$rapyd$_modules["output.operators"].print_assignment = print_assignment;
        _$rapyd$_modules["output.operators"].print_assign = print_assign;
        _$rapyd$_modules["output.operators"].print_conditional = print_conditional;
        _$rapyd$_modules["output.operators"].print_seq = print_seq;
    })();

    (function(){
        var __name__ = "output.utils";
        var AST_BlockStatement = _$rapyd$_modules.ast.AST_BlockStatement;
        
        function best_of(a) {
            var best, len_, i;
            best = a[0];
            len_ = best.length;
            for (var _$rapyd$_Index78 = 1; _$rapyd$_Index78 < a.length; _$rapyd$_Index78++) {
                i = _$rapyd$_Index78;
                if (a[i].length < len_) {
                    best = a[i];
                    len_ = best.length;
                }
            }
            return best;
        };

        best_of.__argnames__ = ["a"];

        function make_num(num) {
            var str_, a, m;
            str_ = num.toString(10);
            a = _$rapyd$_list_decorate([ str_.replace(/^0\./, ".").replace("e+", "e") ]);
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
        };

        make_num.__argnames__ = ["num"];

        function make_block(stmt, output) {
            if (stmt instanceof AST_BlockStatement) {
                stmt.print(output);
                return;
            }
            output.with_block((function() {
                var _$rapyd$_anonfunc = function () {
                    output.indent();
                    stmt.print(output);
                    output.newline();
                };
                return _$rapyd$_anonfunc;
            })());
        };

        make_block.__argnames__ = ["stmt", "output"];

        _$rapyd$_modules["output.utils"].best_of = best_of;
        _$rapyd$_modules["output.utils"].make_num = make_num;
        _$rapyd$_modules["output.utils"].make_block = make_block;
    })();

    (function(){
        var __name__ = "output.codegen";
        var noop = _$rapyd$_modules.utils.noop;
        
        var PRECEDENCE = _$rapyd$_modules.parse.PRECEDENCE;
        
        var AST_Array = _$rapyd$_modules.ast.AST_Array;
        var AST_Assign = _$rapyd$_modules.ast.AST_Assign;
        var AST_BaseCall = _$rapyd$_modules.ast.AST_BaseCall;
        var AST_Binary = _$rapyd$_modules.ast.AST_Binary;
        var AST_BlockStatement = _$rapyd$_modules.ast.AST_BlockStatement;
        var AST_Break = _$rapyd$_modules.ast.AST_Break;
        var AST_Catch = _$rapyd$_modules.ast.AST_Catch;
        var AST_Class = _$rapyd$_modules.ast.AST_Class;
        var AST_Conditional = _$rapyd$_modules.ast.AST_Conditional;
        var AST_Const = _$rapyd$_modules.ast.AST_Const;
        var AST_Constant = _$rapyd$_modules.ast.AST_Constant;
        var AST_Continue = _$rapyd$_modules.ast.AST_Continue;
        var AST_Debugger = _$rapyd$_modules.ast.AST_Debugger;
        var AST_Definitions = _$rapyd$_modules.ast.AST_Definitions;
        var AST_Directive = _$rapyd$_modules.ast.AST_Directive;
        var AST_Do = _$rapyd$_modules.ast.AST_Do;
        var AST_Dot = _$rapyd$_modules.ast.AST_Dot;
        var AST_EmptyStatement = _$rapyd$_modules.ast.AST_EmptyStatement;
        var AST_Exit = _$rapyd$_modules.ast.AST_Exit;
        var AST_ExpressiveObject = _$rapyd$_modules.ast.AST_ExpressiveObject;
        var AST_Finally = _$rapyd$_modules.ast.AST_Finally;
        var AST_ForIn = _$rapyd$_modules.ast.AST_ForIn;
        var AST_ForJS = _$rapyd$_modules.ast.AST_ForJS;
        var AST_Function = _$rapyd$_modules.ast.AST_Function;
        var AST_Hole = _$rapyd$_modules.ast.AST_Hole;
        var AST_If = _$rapyd$_modules.ast.AST_If;
        var AST_Imports = _$rapyd$_modules.ast.AST_Imports;
        var AST_Infinity = _$rapyd$_modules.ast.AST_Infinity;
        var AST_Lambda = _$rapyd$_modules.ast.AST_Lambda;
        var AST_ListComprehension = _$rapyd$_modules.ast.AST_ListComprehension;
        var AST_LoopControl = _$rapyd$_modules.ast.AST_LoopControl;
        var AST_NaN = _$rapyd$_modules.ast.AST_NaN;
        var AST_New = _$rapyd$_modules.ast.AST_New;
        var AST_Node = _$rapyd$_modules.ast.AST_Node;
        var AST_Number = _$rapyd$_modules.ast.AST_Number;
        var AST_Object = _$rapyd$_modules.ast.AST_Object;
        var AST_ObjectKeyVal = _$rapyd$_modules.ast.AST_ObjectKeyVal;
        var AST_ObjectProperty = _$rapyd$_modules.ast.AST_ObjectProperty;
        var AST_PropAccess = _$rapyd$_modules.ast.AST_PropAccess;
        var AST_RegExp = _$rapyd$_modules.ast.AST_RegExp;
        var AST_Return = _$rapyd$_modules.ast.AST_Return;
        var AST_Set = _$rapyd$_modules.ast.AST_Set;
        var AST_Seq = _$rapyd$_modules.ast.AST_Seq;
        var AST_SimpleStatement = _$rapyd$_modules.ast.AST_SimpleStatement;
        var AST_Splice = _$rapyd$_modules.ast.AST_Splice;
        var AST_Statement = _$rapyd$_modules.ast.AST_Statement;
        var AST_StatementWithBody = _$rapyd$_modules.ast.AST_StatementWithBody;
        var AST_String = _$rapyd$_modules.ast.AST_String;
        var AST_Sub = _$rapyd$_modules.ast.AST_Sub;
        var AST_ItemAccess = _$rapyd$_modules.ast.AST_ItemAccess;
        var AST_Symbol = _$rapyd$_modules.ast.AST_Symbol;
        var AST_This = _$rapyd$_modules.ast.AST_This;
        var AST_Throw = _$rapyd$_modules.ast.AST_Throw;
        var AST_Toplevel = _$rapyd$_modules.ast.AST_Toplevel;
        var AST_Try = _$rapyd$_modules.ast.AST_Try;
        var AST_Unary = _$rapyd$_modules.ast.AST_Unary;
        var AST_UnaryPostfix = _$rapyd$_modules.ast.AST_UnaryPostfix;
        var AST_UnaryPrefix = _$rapyd$_modules.ast.AST_UnaryPrefix;
        var AST_Undefined = _$rapyd$_modules.ast.AST_Undefined;
        var AST_Var = _$rapyd$_modules.ast.AST_Var;
        var AST_VarDef = _$rapyd$_modules.ast.AST_VarDef;
        var AST_Verbatim = _$rapyd$_modules.ast.AST_Verbatim;
        var AST_While = _$rapyd$_modules.ast.AST_While;
        var AST_With = _$rapyd$_modules.ast.AST_With;
        var AST_Yield = _$rapyd$_modules.ast.AST_Yield;
        var TreeWalker = _$rapyd$_modules.ast.TreeWalker;
        
        var print_try = _$rapyd$_modules["output.exceptions"].print_try;
        var print_catch = _$rapyd$_modules["output.exceptions"].print_catch;
        var print_finally = _$rapyd$_modules["output.exceptions"].print_finally;
        
        var OutputStream = _$rapyd$_modules["output.stream"].OutputStream;
        
        var print_class = _$rapyd$_modules["output.classes"].print_class;
        
        var print_array = _$rapyd$_modules["output.literals"].print_array;
        var print_obj_literal = _$rapyd$_modules["output.literals"].print_obj_literal;
        var print_object = _$rapyd$_modules["output.literals"].print_object;
        var print_set = _$rapyd$_modules["output.literals"].print_set;
        var print_regexp = _$rapyd$_modules["output.literals"].print_regexp;
        
        var print_do_loop = _$rapyd$_modules["output.loops"].print_do_loop;
        var print_while_loop = _$rapyd$_modules["output.loops"].print_while_loop;
        var print_for_loop_body = _$rapyd$_modules["output.loops"].print_for_loop_body;
        var print_for_in = _$rapyd$_modules["output.loops"].print_for_in;
        var print_list_comprehension = _$rapyd$_modules["output.loops"].print_list_comprehension;
        
        var print_top_level = _$rapyd$_modules["output.modules"].print_top_level;
        var print_imports = _$rapyd$_modules["output.modules"].print_imports;
        
        var print_getattr = _$rapyd$_modules["output.operators"].print_getattr;
        var print_getitem = _$rapyd$_modules["output.operators"].print_getitem;
        var print_rich_getitem = _$rapyd$_modules["output.operators"].print_rich_getitem;
        var print_splice_assignment = _$rapyd$_modules["output.operators"].print_splice_assignment;
        var print_unary_prefix = _$rapyd$_modules["output.operators"].print_unary_prefix;
        var print_unary_postfix = _$rapyd$_modules["output.operators"].print_unary_postfix;
        var print_binary_op = _$rapyd$_modules["output.operators"].print_binary_op;
        var print_assign = _$rapyd$_modules["output.operators"].print_assign;
        var print_conditional = _$rapyd$_modules["output.operators"].print_conditional;
        var print_seq = _$rapyd$_modules["output.operators"].print_seq;
        
        var print_function = _$rapyd$_modules["output.functions"].print_function;
        var print_function_call = _$rapyd$_modules["output.functions"].print_function_call;
        
        var print_bracketed = _$rapyd$_modules["output.statements"].print_bracketed;
        var first_in_statement = _$rapyd$_modules["output.statements"].first_in_statement;
        var force_statement = _$rapyd$_modules["output.statements"].force_statement;
        var print_with = _$rapyd$_modules["output.statements"].print_with;
        
        var make_block = _$rapyd$_modules["output.utils"].make_block;
        var make_num = _$rapyd$_modules["output.utils"].make_num;
        
        function generate_code() {
            function DEFPRINT(nodetype, generator) {
                nodetype.DEFMETHOD("_codegen", generator);
            };

            DEFPRINT.__argnames__ = ["nodetype", "generator"];

            AST_Node.DEFMETHOD("print", (function() {
                var _$rapyd$_anonfunc = function (stream, force_parens) {
                    var self, generator;
                    self = this;
                    generator = self._codegen;
                    stream.push_node(self);
                    if (force_parens || self.needs_parens(stream)) {
                        stream.with_parens((function() {
                            var _$rapyd$_anonfunc = function () {
                                self.add_comments(stream);
                                generator(self, stream);
                            };
                            return _$rapyd$_anonfunc;
                        })());
                    } else {
                        self.add_comments(stream);
                        generator(self, stream);
                    }
                    stream.pop_node();
                };

                _$rapyd$_anonfunc.__argnames__ = ["stream", "force_parens"];
                return _$rapyd$_anonfunc;
            })());
            AST_Node.DEFMETHOD("print_to_string", (function() {
                var _$rapyd$_anonfunc = function (options) {
                    var s;
                    s = new OutputStream(options);
                    this.print(s);
                    return s.get();
                };

                _$rapyd$_anonfunc.__argnames__ = ["options"];
                return _$rapyd$_anonfunc;
            })());
            AST_Node.DEFMETHOD("add_comments", (function() {
                var _$rapyd$_anonfunc = function (output) {
                    var c, self, start, comments;
                    c = output.option("comments");
                    self = this;
                    if (c) {
                        start = self.start;
                        if (start && !start._comments_dumped) {
                            start._comments_dumped = true;
                            comments = start.comments_before;
                            if (self instanceof AST_Exit && self.value && self.value.start.comments_before.length > 0) {
                                comments = (comments || _$rapyd$_list_decorate([])).concat(self.value.start.comments_before);
                                self.value.start.comments_before = _$rapyd$_list_decorate([]);
                            }
                            if (c.test) {
                                comments = comments.filter((function() {
                                    var _$rapyd$_anonfunc = function (comment) {
                                        return c.test(comment.value);
                                    };

                                    _$rapyd$_anonfunc.__argnames__ = ["comment"];
                                    return _$rapyd$_anonfunc;
                                })());
                            } else if (typeof c === "function") {
                                comments = comments.filter((function() {
                                    var _$rapyd$_anonfunc = function (comment) {
                                        return c(self, comment);
                                    };

                                    _$rapyd$_anonfunc.__argnames__ = ["comment"];
                                    return _$rapyd$_anonfunc;
                                })());
                            }
                            comments.forEach((function() {
                                var _$rapyd$_anonfunc = function (c) {
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
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["c"];
                                return _$rapyd$_anonfunc;
                            })());
                        }
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["output"];
                return _$rapyd$_anonfunc;
            })());
            function PARENS(nodetype, func) {
                nodetype.DEFMETHOD("needs_parens", func);
            };

            PARENS.__argnames__ = ["nodetype", "func"];

            PARENS(AST_Node, (function() {
                var _$rapyd$_anonfunc = function () {
                    return false;
                };
                return _$rapyd$_anonfunc;
            })());
            PARENS(AST_Function, (function() {
                var _$rapyd$_anonfunc = function (output) {
                    return first_in_statement(output);
                };

                _$rapyd$_anonfunc.__argnames__ = ["output"];
                return _$rapyd$_anonfunc;
            })());
            PARENS(AST_Object, (function() {
                var _$rapyd$_anonfunc = function (output) {
                    return first_in_statement(output);
                };

                _$rapyd$_anonfunc.__argnames__ = ["output"];
                return _$rapyd$_anonfunc;
            })());
            PARENS(AST_Unary, (function() {
                var _$rapyd$_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    return p instanceof AST_PropAccess && p.expression === this;
                };

                _$rapyd$_anonfunc.__argnames__ = ["output"];
                return _$rapyd$_anonfunc;
            })());
            PARENS(AST_Seq, (function() {
                var _$rapyd$_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    return p instanceof AST_Unary || p instanceof AST_VarDef || p instanceof AST_Dot || p instanceof AST_ObjectProperty || p instanceof AST_Conditional;
                };

                _$rapyd$_anonfunc.__argnames__ = ["output"];
                return _$rapyd$_anonfunc;
            })());
            PARENS(AST_Binary, (function() {
                var _$rapyd$_anonfunc = function (output) {
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
                };

                _$rapyd$_anonfunc.__argnames__ = ["output"];
                return _$rapyd$_anonfunc;
            })());
            PARENS(AST_PropAccess, (function() {
                var _$rapyd$_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    if (p instanceof AST_New && p.expression === this) {
                        try {
                            this.walk(new TreeWalker((function() {
                                var _$rapyd$_anonfunc = function (node) {
                                    if (node instanceof AST_BaseCall) {
                                        throw p;
                                    }
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["node"];
                                return _$rapyd$_anonfunc;
                            })()));
                        } catch (_$rapyd$_Exception) {
                            var ex = _$rapyd$_Exception;
                            if (ex !== p) {
                                throw ex;
                            }
                            return true;
                        }
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["output"];
                return _$rapyd$_anonfunc;
            })());
            PARENS(AST_BaseCall, (function() {
                var _$rapyd$_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    return p instanceof AST_New && p.expression === this;
                };

                _$rapyd$_anonfunc.__argnames__ = ["output"];
                return _$rapyd$_anonfunc;
            })());
            PARENS(AST_New, (function() {
                var _$rapyd$_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    if (this.args.length === 0 && (p instanceof AST_PropAccess || p instanceof AST_BaseCall && p.expression === this)) {
                        return true;
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["output"];
                return _$rapyd$_anonfunc;
            })());
            PARENS(AST_Number, (function() {
                var _$rapyd$_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    if (this.getValue() < 0 && p instanceof AST_PropAccess && p.expression === this) {
                        return true;
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["output"];
                return _$rapyd$_anonfunc;
            })());
            PARENS(AST_NaN, (function() {
                var _$rapyd$_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    if (p instanceof AST_PropAccess && p.expression === this) {
                        return true;
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["output"];
                return _$rapyd$_anonfunc;
            })());
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
            };

            assign_and_conditional_paren_rules.__argnames__ = ["output"];

            PARENS(AST_Assign, assign_and_conditional_paren_rules);
            PARENS(AST_Conditional, assign_and_conditional_paren_rules);
            DEFPRINT(AST_Directive, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    output.print_string(self.value);
                    output.semicolon();
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Debugger, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    output.print("debugger");
                    output.semicolon();
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            AST_StatementWithBody.DEFMETHOD("_do_print_body", (function() {
                var _$rapyd$_anonfunc = function (output) {
                    force_statement(this.body, output);
                };

                _$rapyd$_anonfunc.__argnames__ = ["output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Statement, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    self.body.print(output);
                    output.semicolon();
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Toplevel, print_top_level);
            DEFPRINT(AST_Imports, print_imports);
            DEFPRINT(AST_SimpleStatement, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    if (!(self.body instanceof AST_EmptyStatement)) {
                        self.body.print(output);
                        output.semicolon();
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_BlockStatement, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    print_bracketed(self, output);
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_EmptyStatement, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Do, print_do_loop);
            DEFPRINT(AST_While, print_while_loop);
            AST_ForIn.DEFMETHOD("_do_print_body", print_for_loop_body);
            DEFPRINT(AST_ForIn, print_for_in);
            AST_ForJS.DEFMETHOD("_do_print_body", (function() {
                var _$rapyd$_anonfunc = function (output) {
                    var self;
                    self = this;
                    output.with_block((function() {
                        var _$rapyd$_anonfunc = function () {
                            self.body.body.forEach((function() {
                                var _$rapyd$_anonfunc = function (stmt, i) {
                                    output.indent();
                                    stmt.print(output);
                                    output.newline();
                                };

                                _$rapyd$_anonfunc.__argnames__ = ["stmt", "i"];
                                return _$rapyd$_anonfunc;
                            })());
                        };
                        return _$rapyd$_anonfunc;
                    })());
                };

                _$rapyd$_anonfunc.__argnames__ = ["output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_ForJS, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    output.print("for");
                    output.space();
                    output.with_parens((function() {
                        var _$rapyd$_anonfunc = function () {
                            self.condition.print(output);
                        };
                        return _$rapyd$_anonfunc;
                    })());
                    output.space();
                    self._do_print_body(output);
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_ListComprehension, print_list_comprehension);
            DEFPRINT(AST_With, print_with);
            AST_Lambda.DEFMETHOD("_do_print", print_function);
            DEFPRINT(AST_Lambda, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    self._do_print(output);
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            AST_Class.DEFMETHOD("_do_print", print_class);
            DEFPRINT(AST_Class, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    self._do_print(output);
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            AST_Exit.DEFMETHOD("_do_print", (function() {
                var _$rapyd$_anonfunc = function (output, kind) {
                    var self;
                    self = this;
                    output.print(kind);
                    if (self.value) {
                        output.space();
                        self.value.print(output);
                    }
                    output.semicolon();
                };

                _$rapyd$_anonfunc.__argnames__ = ["output", "kind"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Yield, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    self._do_print(output, "yield" + ((self.is_yield_from) ? "*" : ""));
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Return, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    self._do_print(output, "return");
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Throw, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    self._do_print(output, "throw");
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            AST_LoopControl.DEFMETHOD("_do_print", (function() {
                var _$rapyd$_anonfunc = function (output, kind) {
                    output.print(kind);
                    if (this.label) {
                        output.space();
                        this.label.print(output);
                    }
                    output.semicolon();
                };

                _$rapyd$_anonfunc.__argnames__ = ["output", "kind"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Break, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    self._do_print(output, "break");
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Continue, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    self._do_print(output, "continue");
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
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
            };

            make_then.__argnames__ = ["self", "output"];

            DEFPRINT(AST_If, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    output.print("if");
                    output.space();
                    output.with_parens((function() {
                        var _$rapyd$_anonfunc = function () {
                            self.condition.print(output);
                        };
                        return _$rapyd$_anonfunc;
                    })());
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
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Try, print_try);
            DEFPRINT(AST_Catch, print_catch);
            DEFPRINT(AST_Finally, print_finally);
            AST_Definitions.DEFMETHOD("_do_print", (function() {
                var _$rapyd$_anonfunc = function (output, kind) {
                    var p, in_for, avoid_semicolon;
                    output.print(kind);
                    output.space();
                    this.definitions.forEach((function() {
                        var _$rapyd$_anonfunc = function (def_, i) {
                            if (i) {
                                output.comma();
                            }
                            def_.print(output);
                        };

                        _$rapyd$_anonfunc.__argnames__ = ["def_", "i"];
                        return _$rapyd$_anonfunc;
                    })());
                    p = output.parent();
                    in_for = p instanceof AST_ForIn;
                    avoid_semicolon = in_for && p.init === this;
                    if (!avoid_semicolon) {
                        output.semicolon();
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["output", "kind"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Var, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    self._do_print(output, "var");
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Const, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    self._do_print(output, "const");
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            function parenthesize_for_noin(node, output, noin) {
                if (!noin) {
                    node.print(output);
                } else {
                    try {
                        node.walk(new TreeWalker((function() {
                            var _$rapyd$_anonfunc = function (node) {
                                if (node instanceof AST_Binary && node.operator === "in") {
                                    throw output;
                                }
                            };

                            _$rapyd$_anonfunc.__argnames__ = ["node"];
                            return _$rapyd$_anonfunc;
                        })()));
                        node.print(output);
                    } catch (_$rapyd$_Exception) {
                        var ex = _$rapyd$_Exception;
                        if (ex !== output) {
                            throw ex;
                        }
                        node.print(output, true);
                    }
                }
            };

            parenthesize_for_noin.__argnames__ = ["node", "output", "noin"];

            DEFPRINT(AST_VarDef, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    var p, noin;
                    self.name.print(output);
                    if (self.value) {
                        output.assign("");
                        p = output.parent(1);
                        noin = p instanceof AST_ForIn;
                        parenthesize_for_noin(self.value, output, noin);
                    }
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_BaseCall, print_function_call);
            AST_Seq.DEFMETHOD("_do_print", print_seq);
            DEFPRINT(AST_Seq, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    self._do_print(output);
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Dot, print_getattr);
            DEFPRINT(AST_Sub, print_getitem);
            DEFPRINT(AST_ItemAccess, print_rich_getitem);
            DEFPRINT(AST_Splice, print_splice_assignment);
            DEFPRINT(AST_UnaryPrefix, print_unary_prefix);
            DEFPRINT(AST_UnaryPostfix, print_unary_postfix);
            DEFPRINT(AST_Binary, print_binary_op);
            DEFPRINT(AST_Assign, print_assign);
            DEFPRINT(AST_Conditional, print_conditional);
            DEFPRINT(AST_Array, print_array);
            DEFPRINT(AST_ExpressiveObject, print_obj_literal);
            DEFPRINT(AST_Object, print_object);
            DEFPRINT(AST_ObjectKeyVal, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    self.key.print(output);
                    output.colon();
                    self.value.print(output);
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Set, print_set);
            AST_Symbol.DEFMETHOD("definition", (function() {
                var _$rapyd$_anonfunc = function () {
                    return this.thedef;
                };
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Symbol, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    var def_;
                    def_ = self.definition();
                    output.print_name((def_) ? def_.mangled_name || def_.name : self.name);
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Undefined, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    output.print("void 0");
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Hole, noop);
            DEFPRINT(AST_Infinity, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    output.print("1/0");
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_NaN, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    output.print("0/0");
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_This, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    output.print("this");
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Constant, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    output.print(self.getValue());
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_String, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    output.print_string(self.getValue());
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Verbatim, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    output.print(self.getValue());
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_Number, (function() {
                var _$rapyd$_anonfunc = function (self, output) {
                    output.print(make_num(self.getValue()));
                };

                _$rapyd$_anonfunc.__argnames__ = ["self", "output"];
                return _$rapyd$_anonfunc;
            })());
            DEFPRINT(AST_RegExp, print_regexp);
        };

        _$rapyd$_modules["output.codegen"].generate_code = generate_code;
    })();

    (function(){

        var __name__ = "__main__";


        var ast, ast_node;
        var DefaultsError = _$rapyd$_modules.utils.DefaultsError;
        var string_template = _$rapyd$_modules.utils.string_template;
        
        var ImportError = _$rapyd$_modules.errors.ImportError;
        var SyntaxError = _$rapyd$_modules.errors.SyntaxError;
        
        var ALL_KEYWORDS = _$rapyd$_modules.tokenizer.ALL_KEYWORDS;
        var IDENTIFIER_PAT = _$rapyd$_modules.tokenizer.IDENTIFIER_PAT;
        var tokenizer = _$rapyd$_modules.tokenizer.tokenizer;
        
        var parse = _$rapyd$_modules.parse.parse;
        var NATIVE_CLASSES = _$rapyd$_modules.parse.NATIVE_CLASSES;
        var compile_time_decorators = _$rapyd$_modules.parse.compile_time_decorators;
        
        var OutputStream = _$rapyd$_modules["output.stream"].OutputStream;
        
        var generate_code = _$rapyd$_modules["output.codegen"].generate_code;
        
        generate_code();
        if (typeof exports === "object") {
            exports.DefaultsError = DefaultsError;
            exports.parse = parse;
            exports.compile_time_decorators = compile_time_decorators;
            exports.OutputStream = OutputStream;
            exports.string_template = string_template;
            exports.ALL_KEYWORDS = ALL_KEYWORDS;
            exports.IDENTIFIER_PAT = IDENTIFIER_PAT;
            exports.NATIVE_CLASSES = NATIVE_CLASSES;
            exports.ImportError = ImportError;
            exports.SyntaxError = SyntaxError;
            exports.tokenizer = tokenizer;
            ast = _$rapyd$_modules["ast"];
            var _$rapyd$_Iter79 = _$rapyd$_Iterable(ast);
            for (var _$rapyd$_Index79 = 0; _$rapyd$_Index79 < _$rapyd$_Iter79.length; _$rapyd$_Index79++) {
                ast_node = _$rapyd$_Iter79[_$rapyd$_Index79];
                if (ast_node.substr(0, 4) === "AST_") {
                    exports[ast_node] = ast[ast_node];
                }
            }
        }
    })();
})();