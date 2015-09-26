(function(){
    "use strict;";
    var _$rapyd$_iterator_symbol = (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") ? Symbol.iterator : "iterator-Symbol-5d0927e5554349048cf0e3762a228256";
    var _$rapyd$_kwargs_symbol = (typeof Symbol === "function") ? Symbol("kwargs-object") : "kwargs-object-Symbol-5d0927e5554349048cf0e3762a228256";
    var _$rapyd$_cond_temp;
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
                _$rapyd$_d[_$rapyd$_iterator_symbol] = function() {
                    return this;
                };
                _$rapyd$_d["_i"] = start - step;
                _$rapyd$_d["_idx"] = -1;
                _$rapyd$_d["next"] = function() {
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
                return _$rapyd$_d;
            })();
        };
    var len = (function _$rapyd$_len() {
            if (typeof Set === "function" && typeof Map === "function") {
                return function(obj) {
                    if (Array.isArray(obj) || typeof obj === "string") {
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
            }
            return function(obj) {
                if (Array.isArray(obj) || typeof obj === "string") {
                    return obj.length;
                }
                if (typeof obj.__len__ === "function") {
                    return obj.__len__();
                }
                return Object.keys(obj).length;
            };
        })();
    function _$rapyd$_Iterable(iterable) {
            var iterator, ans, result;
            if (Array.isArray(iterable) || typeof iterable === "string") {
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
            if (typeof HTMLCollection === "function" && (iterable instanceof HTMLCollection || iterable instanceof NodeList || iterable instanceof NamedNodeMap)) {
                return iterable;
            }
            return Object.keys(iterable);
        };
    function _$rapyd$_extends(child, parent) {
            child.prototype = Object.create(parent.prototype);
            child.prototype.constructor = child;
        };
    var _$rapyd$_in = (function _$rapyd$_in() {
            if (typeof Map === "function" && typeof Set === "function") {
                return function(val, arr) {
                    if (Array.isArray(arr) || typeof arr === "string") {
                        return arr.indexOf(val) !== -1;
                    }
                    if (typeof arr.__contains__ === "function") {
                        return arr.__contains__(val);
                    }
                    if ((arr instanceof Map || arr instanceof Set)) {
                        return arr.has(val);
                    }
                    return arr.hasOwnProperty(val);
                };
            }
            return function(val, arr) {
                if (Array.isArray(arr) || typeof arr === "string") {
                    return arr.indexOf(val) !== -1;
                }
                if (typeof arr.__contains__ === "function") {
                    return arr.__contains__(val);
                }
                return arr.hasOwnProperty(val);
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
                                "value": _$rapyd$_list_decorate([ this._i, iterable[this._i] ])
                            };
                        }
                        return {
                            "done": true
                        };
                    }
                };
                ans[_$rapyd$_iterator_symbol] = function() {
                    return this;
                };
                return ans;
            }
            if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
                iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
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
                            "value": _$rapyd$_list_decorate([ this._i, r.value ])
                        };
                    }
                };
                ans[_$rapyd$_iterator_symbol] = function() {
                    return this;
                };
                return ans;
            }
            return enumerate(Object.keys(iterable));
        };
    var Exception = Error;
function AttributeError() {
    AttributeError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(AttributeError, Error);
AttributeError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = new Error().stack;
};
AttributeError.prototype.name = "AttributeError";

function IndexError() {
    IndexError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(IndexError, Error);
IndexError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = new Error().stack;
};
IndexError.prototype.name = "IndexError";

function KeyError() {
    KeyError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(KeyError, Error);
KeyError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = new Error().stack;
};
KeyError.prototype.name = "KeyError";

function ValueError() {
    ValueError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(ValueError, Error);
ValueError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = new Error().stack;
};
ValueError.prototype.name = "ValueError";
;
    function _$rapyd$_equals(a, b) {
    try {
        return a.__eq__(b);
    } catch (_$rapyd$_Exception) {
        if (_$rapyd$_Exception instanceof TypeError) {
            return a === b;
        } else {
            throw _$rapyd$_Exception;
        }
    }
}
"var equals = _$rapyd$_equals";
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
}
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
        if (this[i] === val) {
            return i;
        }
    }
    throw new ValueError(val + " is not in list");
}
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
}
function _$rapyd$_list_remove(value) {
    var idx;
    idx = this.indexOf(value);
    if (idx === -1) {
        throw new ValueError(value + " not in list");
    }
    this.splice(idx, 1);
}
function _$rapyd$_list_to_string() {
    return "[" + this.join(", ") + "]";
}
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
}
function _$rapyd$_list_copy() {
    return _$rapyd$_list_constructor(this);
}
function _$rapyd$_list_clear() {
    this.length = 0;
}
function _$rapyd$_list_as_array() {
    return Array.prototype.slice.call(this);
}
function _$rapyd$_list_count(value) {
    return this.reduce(function(n, val) {
        return n + (val === value);
    }, 0);
}
function _$rapyd$_list_sort_key(value) {
    var t;
    t = typeof value;
    if (t === "string" || t === "number") {
        return value;
    }
    return value.toString();
}
function _$rapyd$_list_sort_cmp(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}
function _$rapyd$_list_sort() {
    var key = (arguments[0] === undefined || ( 0 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? (null) : arguments[0];
    var reverse = (arguments[1] === undefined || ( 1 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? (false) : arguments[1];
    var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
    if (typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [_$rapyd$_kwargs_symbol] !== true) _$rapyd$_kwargs_obj = {};
    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "key")){
        key = _$rapyd$_kwargs_obj.key;
    }
    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "reverse")){
        reverse = _$rapyd$_kwargs_obj.reverse;
    }
    var mult, keymap, k;
    key = key || _$rapyd$_list_sort_key;
    mult = (reverse) ? -1 : 1;
    keymap = dict();
    for (var i=0; i < this.length; i++) {
        k = this[i];
        keymap.set(k, key(k));
    }
    this.sort(function(a, b) {
        return mult * _$rapyd$_list_sort_cmp(keymap.get(a), keymap.get(b));
    });
}
function _$rapyd$_list_concat() {
    var ans;
    ans = Array.prototype.concat.apply(this, arguments);
    _$rapyd$_list_decorate(ans);
    return ans;
}
function _$rapyd$_list_slice() {
    var ans;
    ans = Array.prototype.slice.apply(this, arguments);
    _$rapyd$_list_decorate(ans);
    return ans;
}
function _$rapyd$_list_iterator(value) {
    var self;
    self = this;
    return {
        "_i": -1,
        "_list": self,
        "next": function() {
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
        }
    };
}
function _$rapyd$_list_len() {
    return this.length;
}
function _$rapyd$_list_contains(val) {
    return this.indexOf(val) !== -1;
}
function _$rapyd$_list_eq(other) {
    if (!Array.isArray(other)) {
        return false;
    }
    if (other.length !== this.length) {
        return false;
    }
    if (other.length === 0) {
        return true;
    }
    for (var i = 0; i < other.length; i++) {
        if (!_$rapyd$_equals(this[i], other[i])) {
            return false;
        }
    }
    return true;
}
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
}
function _$rapyd$_list_constructor(iterable) {
    var ans, iterator, result;
    if (iterable === undefined) {
        ans = [];
    } else if (Array.isArray(iterable) || typeof iterable === "string") {
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
}
_$rapyd$_list_constructor.__name__ = "list";
var list = _$rapyd$_list_constructor, list_wrap = _$rapyd$_list_decorate;
var _$rapyd$_global_object_id = 0, _$rapyd$_set_implementation;
function _$rapyd$_set_keyfor(x) {
    var t, ans;
    t = typeof x;
    if (t === "string" || t === "number" || t === "boolean") {
        return "_" + t[0] + x;
    }
    if (x == null) {
        return "__!@#$0";
    }
    ans = x._$rapyd$_hash_key_prop;
    if (ans === undefined) {
        ans = "_!@#$" + ++_$rapyd$_global_object_id;
        Object.defineProperty(x, "_$rapyd$_hash_key_prop", {
            "value": ans
        });
    }
    return ans;
}
function _$rapyd$_set_polyfill() {
    this._store = {};
    this.size = 0;
}
_$rapyd$_set_polyfill.prototype.add = function(x) {
    var key;
    key = _$rapyd$_set_keyfor(x);
    if (!Object.hasOwnProperty.call(this._store, key)) {
        this.size += 1;
        this._store[key] = x;
    }
    return this;
};
_$rapyd$_set_polyfill.prototype.clear = function(x) {
    this._store = {};
    this.size = 0;
};
_$rapyd$_set_polyfill.prototype.delete = function(x) {
    var key;
    key = _$rapyd$_set_keyfor(x);
    if (Object.hasOwnProperty.call(this._store, key)) {
        this.size -= 1;
        delete this._store[key];
        return true;
    }
    return false;
};
_$rapyd$_set_polyfill.prototype.has = function(x) {
    return Object.hasOwnProperty.call(this._store, _$rapyd$_set_keyfor(x));
};
_$rapyd$_set_polyfill.prototype.values = function(x) {
    var keys, s;
    keys = Object.keys(this._store);
    s = this._store;
    return (function(){
        var _$rapyd$_d = {};
        _$rapyd$_d["_keys"] = keys;
        _$rapyd$_d["_i"] = -1;
        _$rapyd$_d["_s"] = s;
        _$rapyd$_d[_$rapyd$_iterator_symbol] = function() {
            return this;
        };
        _$rapyd$_d["next"] = function() {
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
        return _$rapyd$_d;
    })();
};
if (typeof Set !== "function" || typeof Set.prototype.delete !== "function") {
    _$rapyd$_set_implementation = _$rapyd$_set_polyfill;
} else {
    _$rapyd$_set_implementation = Set;
}
function _$rapyd$_set(iterable) {
    var ans, s, iterator, result, keys;
    if (this instanceof _$rapyd$_set) {
        this.jsset = new _$rapyd$_set_implementation();
        ans = this;
        if (iterable === undefined) {
            return ans;
        }
        s = ans.jsset;
        if (Array.isArray(iterable) || typeof iterable === "string") {
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
            for (var i=0; i < keys.length; i++) {
                s.add(keys[i]);
            }
        }
        return ans;
    } else {
        return new _$rapyd$_set(iterable);
    }
}
_$rapyd$_set.prototype.__name__ = "set";
Object.defineProperties(_$rapyd$_set.prototype, {
    "length": {
        "get": function() {
            return this.jsset.size;
        }
    },
    "size": {
        "get": function() {
            return this.jsset.size;
        }
    }
});
_$rapyd$_set.prototype.__len__ = function() {
    return this.jsset.size;
};
_$rapyd$_chain_assign_temp = function(x) {
    return this.jsset.has(x);
};
_$rapyd$_set.prototype.has = _$rapyd$_chain_assign_temp;
_$rapyd$_set.prototype.__contains__ = _$rapyd$_chain_assign_temp;
;
_$rapyd$_set.prototype.add = function(x) {
    this.jsset.add(x);
};
_$rapyd$_set.prototype.clear = function() {
    this.jsset.clear();
};
_$rapyd$_set.prototype.copy = function() {
    return _$rapyd$_set(this);
};
_$rapyd$_set.prototype.discard = function(x) {
    this.jsset.delete(x);
};
_$rapyd$_set.prototype[_$rapyd$_iterator_symbol] = function() {
    return this.jsset.values();
};
_$rapyd$_set.prototype.difference = function() {
    var ans, s, iterator, r, x, has;
    ans = new _$rapyd$_set();
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
_$rapyd$_set.prototype.difference_update = function() {
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
    for (var i = 0; i < remove.length; i++) {
        s.delete(remove[i]);
    }
};
_$rapyd$_set.prototype.intersection = function() {
    var ans, s, iterator, r, x, has;
    ans = new _$rapyd$_set();
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
_$rapyd$_set.prototype.intersection_update = function() {
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
    for (var i = 0; i < remove.length; i++) {
        s.delete(remove[i]);
    }
};
_$rapyd$_set.prototype.isdisjoint = function(other) {
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
_$rapyd$_set.prototype.issubset = function(other) {
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
_$rapyd$_set.prototype.issuperset = function(other) {
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
_$rapyd$_set.prototype.pop = function() {
    var iterator, r;
    iterator = this.jsset.values();
    r = iterator.next();
    if (r.done) {
        throw new KeyError("pop from an empty set");
    }
    this.jsset.delete(r.value);
    return r.value;
};
_$rapyd$_set.prototype.remove = function(x) {
    if (!this.jsset.delete(x)) {
        throw new KeyError(x.toString());
    }
};
_$rapyd$_set.prototype.symmetric_difference = function(other) {
    return this.union(other).difference(this.intersection(other));
};
_$rapyd$_set.prototype.symmetric_difference_update = function(other) {
    var common;
    common = this.intersection(other);
    this.update(other);
    this.difference_update(common);
};
_$rapyd$_set.prototype.union = function() {
    var ans;
    ans = _$rapyd$_set(this);
    ans.update.apply(ans, arguments);
    return ans;
};
_$rapyd$_set.prototype.update = function() {
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
_$rapyd$_chain_assign_temp = function() {
    return "{" + list(this).join(", ") + "}";
};
_$rapyd$_set.prototype.toString = _$rapyd$_chain_assign_temp;
_$rapyd$_set.prototype.inspect = _$rapyd$_chain_assign_temp;
;
_$rapyd$_set.prototype.__eq__ = function(other) {
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
function _$rapyd$_set_wrap(x) {
    var ans;
    ans = new _$rapyd$_set();
    ans.jsset = x;
    return ans;
}
var set = _$rapyd$_set, set_wrap = _$rapyd$_set_wrap;
var _$rapyd$_dict_implementation;
function _$rapyd$_dict_polyfill() {
    this._store = {};
    this.size = 0;
}
_$rapyd$_dict_polyfill.prototype.set = function(x, value) {
    var key;
    key = _$rapyd$_set_keyfor(x);
    if (!Object.hasOwnProperty.call(this._store, key)) {
        this.size += 1;
    }
    this._store[key] = [x, value];
    return this;
};
_$rapyd$_dict_polyfill.prototype.clear = function(x) {
    this._store = {};
    this.size = 0;
};
_$rapyd$_dict_polyfill.prototype.delete = function(x) {
    var key;
    key = _$rapyd$_set_keyfor(x);
    if (Object.hasOwnProperty.call(this._store, key)) {
        this.size -= 1;
        delete this._store[key];
        return true;
    }
    return false;
};
_$rapyd$_dict_polyfill.prototype.has = function(x) {
    return Object.hasOwnProperty.call(this._store, _$rapyd$_set_keyfor(x));
};
_$rapyd$_dict_polyfill.prototype.get = function(x) {
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
_$rapyd$_dict_polyfill.prototype.values = function(x) {
    var keys, s;
    keys = Object.keys(this._store);
    s = this._store;
    return (function(){
        var _$rapyd$_d = {};
        _$rapyd$_d["_keys"] = keys;
        _$rapyd$_d["_i"] = -1;
        _$rapyd$_d["_s"] = s;
        _$rapyd$_d[_$rapyd$_iterator_symbol] = function() {
            return this;
        };
        _$rapyd$_d["next"] = function() {
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
        return _$rapyd$_d;
    })();
};
_$rapyd$_dict_polyfill.prototype.keys = function(x) {
    var keys, s;
    keys = Object.keys(this._store);
    s = this._store;
    return (function(){
        var _$rapyd$_d = {};
        _$rapyd$_d["_keys"] = keys;
        _$rapyd$_d["_i"] = -1;
        _$rapyd$_d["_s"] = s;
        _$rapyd$_d[_$rapyd$_iterator_symbol] = function() {
            return this;
        };
        _$rapyd$_d["next"] = function() {
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
        return _$rapyd$_d;
    })();
};
_$rapyd$_dict_polyfill.prototype.entries = function(x) {
    var keys, s;
    keys = Object.keys(this._store);
    s = this._store;
    return (function(){
        var _$rapyd$_d = {};
        _$rapyd$_d["_keys"] = keys;
        _$rapyd$_d["_i"] = -1;
        _$rapyd$_d["_s"] = s;
        _$rapyd$_d[_$rapyd$_iterator_symbol] = function() {
            return this;
        };
        _$rapyd$_d["next"] = function() {
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
        return _$rapyd$_d;
    })();
};
if (typeof Map !== "function" || typeof Map.prototype.delete !== "function") {
    _$rapyd$_dict_implementation = _$rapyd$_dict_polyfill;
} else {
    _$rapyd$_dict_implementation = Map;
}
function _$rapyd$_dict(iterable) {
    if (this instanceof _$rapyd$_dict) {
        this.jsmap = new _$rapyd$_dict_implementation();
        if (iterable !== undefined) {
            this.update(iterable);
        }
        return this;
    } else {
        return new _$rapyd$_dict(iterable);
    }
}
_$rapyd$_dict.prototype.__name__ = "dict";
Object.defineProperties(_$rapyd$_dict.prototype, {
    "length": {
        "get": function() {
            return this.jsmap.size;
        }
    },
    "size": {
        "get": function() {
            return this.jsmap.size;
        }
    }
});
_$rapyd$_dict.prototype.__len__ = function() {
    return this.jsmap.size;
};
_$rapyd$_chain_assign_temp = function(x) {
    return this.jsmap.has(x);
};
_$rapyd$_dict.prototype.has = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.__contains__ = _$rapyd$_chain_assign_temp;
;
_$rapyd$_chain_assign_temp = function(key, value) {
    this.jsmap.set(key, value);
};
_$rapyd$_dict.prototype.set = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.__setitem__ = _$rapyd$_chain_assign_temp;
;
_$rapyd$_dict.prototype.clear = function() {
    this.jsmap.clear();
};
_$rapyd$_dict.prototype.copy = function() {
    return _$rapyd$_dict(this);
};
_$rapyd$_dict.prototype.keys = function() {
    return this.jsmap.keys();
};
_$rapyd$_dict.prototype.values = function() {
    return this.jsmap.values();
};
_$rapyd$_chain_assign_temp = function() {
    return this.jsmap.entries();
};
_$rapyd$_dict.prototype.items = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.entries = _$rapyd$_chain_assign_temp;
;
_$rapyd$_dict.prototype[_$rapyd$_iterator_symbol] = function() {
    return this.jsmap.keys();
};
_$rapyd$_dict.prototype.__getitem__ = function(key) {
    var ans;
    ans = this.jsmap.get(key);
    if (ans === undefined && !this.jsmap.has(key)) {
        throw new KeyError(key + "");
    }
    return ans;
};
_$rapyd$_dict.prototype.get = function(key, defval) {
    var ans;
    ans = this.jsmap.get(key);
    if (ans === undefined && !this.jsmap.has(key)) {
        return (defval === undefined) ? null : defval;
    }
    return ans;
};
_$rapyd$_dict.prototype.set_default = function(key, defval) {
    var j;
    j = this.jsmap;
    if (!j.has(key)) {
        j.set(key, defval);
        return defval;
    }
    return j.get(key);
};
_$rapyd$_chain_assign_temp = function() {
    var iterable = ( 0 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true) ? undefined : arguments[0];
    var value = (arguments[1] === undefined || ( 1 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? (null) : arguments[1];
    var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
    if (typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [_$rapyd$_kwargs_symbol] !== true) _$rapyd$_kwargs_obj = {};
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
_$rapyd$_dict.fromkeys = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.fromkeys = _$rapyd$_chain_assign_temp;
;
_$rapyd$_dict.prototype.pop = function(key, defval) {
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
_$rapyd$_dict.prototype.popitem = function() {
    var r;
    r = this.jsmap.entries().next();
    if (r.done) {
        throw new KeyError("dict is empty");
    }
    this.jsmap.delete(r.value[0]);
    return r.value;
};
_$rapyd$_dict.prototype.update = function() {
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
        for (var i=0; i < keys.length; i++) {
            if (keys[i] !== _$rapyd$_iterator_symbol) {
                m.set(keys[i], iterable[keys[i]]);
            }
        }
    }
    if (arguments.length > 1) {
        _$rapyd$_dict.prototype.update.call(this, arguments[1]);
    }
};
_$rapyd$_chain_assign_temp = function() {
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
_$rapyd$_dict.prototype.toString = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.inspect = _$rapyd$_chain_assign_temp;
;
_$rapyd$_dict.prototype.__eq__ = function(other) {
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
_$rapyd$_dict.prototype.as_object = function(other) {
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
function _$rapyd$_dict_wrap(x) {
    var ans;
    ans = new _$rapyd$_dict();
    ans.jsmap = x;
    return ans;
}
var dict = _$rapyd$_dict, dict_wrap = _$rapyd$_dict_wrap;;
    function _$rapyd$_bool(val) {
    return !!val;
}
function _$rapyd$_bind(fn, thisArg) {
    var ret;
    if (fn.orig) {
        fn = fn.orig;
    }
    if (thisArg === false) {
        return fn;
    }
    ret = function() {
        return fn.apply(thisArg, arguments);
    };
    ret.orig = fn;
    return ret;
}
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
}
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
    arr = arr.slice(start, end).filter(function(e, i) {
        return i % step === 0;
    });
    return (isString) ? arr.join("") : arr;
}
function _$rapyd$_mixin(target, source, overwrite) {
    for (var i in source) {
        if (source.hasOwnProperty(i) && overwrite || typeof target[i] === "undefined") {
            target[i] = source[i];
        }
    }
}
function _$rapyd$_print() {
    var parts, part;
    if (typeof console === "object") {
        parts = [];
        for (i = 0; i < arguments.length; i++) {
            part = arguments[i];
            if (typeof part === "string") {
                parts.push(part);
            } else if (part === null) {
                parts.push("None");
            } else if (typeof part === "boolean") {
                parts.push((part) ? "True" : "False");
            } else {
                try {
                    parts.push(JSON.stringify(part));
                } catch (_$rapyd$_Exception) {
                    parts.push(part.toString());
                }
            }
        }
        console.log(parts.join(" "));
    }
}
function _$rapyd$_int(val, base) {
    var ans;
    ans = parseInt(val, base || 10);
    if (isNaN(ans)) {
        throw new ValueError("Invalid literal for int with base " + (base || 10) + ": " + val);
    }
    return ans;
}
function _$rapyd$_float() {
    var ans;
    ans = parseFloat.apply(null, arguments);
    if (isNaN(ans)) {
        throw new ValueError("Could not convert string to float: " + arguments[0]);
    }
    return ans;
}
function options_object(f) {
    return function() {
        if (typeof arguments[arguments.length - 1] === "object") {
            arguments[arguments.length - 1][_$rapyd$_kwargs_symbol] = true;
        }
        return f.apply(this, arguments);
    };
}
var bool = _$rapyd$_bool, bind = _$rapyd$_bind, rebind_all = _$rapyd$_rebind_all;
var float = _$rapyd$_float, int = _$rapyd$_int, rebind_all = _$rapyd$_rebind_all;
var mixin = _$rapyd$_mixin, print = _$rapyd$_print, eslice = _$rapyd$_eslice;;
    function _$rapyd$_str() {
    return arguments[0] + "";
}
_$rapyd$_str.format = function() {
    var template, args, kwargs, explicit, implicit, _$rapyd$_chain_assign_temp, idx, ans, pos, in_brace, markup, ch;
    template = arguments[0];
    if (template === undefined) {
        throw TypeError("Template is required");
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
    }
    function resolve_format_spec(format_spec) {
        if (_$rapyd$_str.format._template_resolve_fs_pat === undefined) {
            _$rapyd$_str.format._template_resolve_fs_pat = /[{]([a-zA-Z0-9_]+)[}]/g;
        }
        return format_spec.replace(_$rapyd$_str.format._template_resolve_fs_pat, function(match, key) {
            if (!Object.prototype.hasOwnProperty.call(kwargs, key)) {
                return "";
            }
            return "" + kwargs[key];
        });
    }
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
            nval = new Number(value);
            is_positive = !isNaN(nval) && nval >= 0;
            if (is_positive && (sign === " " || sign === "+")) {
                value = sign + value;
            }
        }
        function repeat(char, num) {
            return Array(num+1).join(char);
        }
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
    }
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
    }
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
    }
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
_$rapyd$_str.capitalize = function(string) {
    if (string) {
        string = string[0].toUpperCase() + string.slice(1).toLowerCase();
    }
    return string;
};
_$rapyd$_str.center = function(string, width, fill) {
    var left, right;
    left = Math.floor((width - string.length) / 2);
    right = width - left - string.length;
    fill = fill || " ";
    return Array(left+1).join(fill) + string + Array(right+1).join(fill);
};
_$rapyd$_str.count = function(string, needle, start, end) {
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
_$rapyd$_str.endswith = function(string, suffixes, start, end) {
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
_$rapyd$_str.startswith = function(string, prefixes, start, end) {
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
_$rapyd$_str.find = function(string, needle, start, end) {
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
_$rapyd$_str.rfind = function(string, needle, start, end) {
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
_$rapyd$_str.index = function(string, needle, start, end) {
    var ans;
    ans = _$rapyd$_str.find.apply(null, arguments);
    if (ans === -1) {
        throw new ValueError("substring not found");
    }
    return ans;
};
_$rapyd$_str.rindex = function(string, needle, start, end) {
    var ans;
    ans = _$rapyd$_str.rfind.apply(null, arguments);
    if (ans === -1) {
        throw new ValueError("substring not found");
    }
    return ans;
};
_$rapyd$_str.islower = function(string) {
    return string.length > 0 && string.toUpperCase() !== string;
};
_$rapyd$_str.isupper = function(string) {
    return string.length > 0 && string.toLowerCase() !== string;
};
_$rapyd$_str.isspace = function(string) {
    return string.length > 0 && /^\s+$/.test(string);
};
_$rapyd$_str.join = function(string, iterable) {
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
_$rapyd$_str.ljust = function(string, width, fill) {
    if (width > string.length) {
        fill = fill || " ";
        string += Array(width - string.length + 1).join(fill);
    }
    return string;
};
_$rapyd$_str.rjust = function(string, width, fill) {
    if (width > string.length) {
        fill = fill || " ";
        string = Array(width - string.length + 1).join(fill) + string;
    }
    return string;
};
_$rapyd$_str.lower = function(string) {
    return string.toLowerCase();
};
_$rapyd$_str.upper = function(string) {
    return string.toUpperCase();
};
_$rapyd$_str.lstrip = function(string, chars) {
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
_$rapyd$_str.rstrip = function(string, chars) {
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
_$rapyd$_str.strip = function(string, chars) {
    return _$rapyd$_str.lstrip(_$rapyd$_str.rstrip(string, chars), chars);
};
_$rapyd$_str.partition = function(string, sep) {
    var idx;
    idx = string.indexOf(sep);
    if (idx === -1) {
        return [string, "", ""];
    }
    return [string.slice(0, idx), sep, string.slice(idx + sep.length)];
};
_$rapyd$_str.rpartition = function(string, sep) {
    var idx;
    idx = string.lastIndexOf(sep);
    if (idx === -1) {
        return ["", "", string];
    }
    return [string.slice(0, idx), sep, string.slice(idx + sep.length)];
};
_$rapyd$_str.replace = function(string, old, repl, count) {
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
_$rapyd$_str.split = function(string, sep, maxsplit) {
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
_$rapyd$_str.rsplit = function(string, sep, maxsplit) {
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
_$rapyd$_str.splitlines = function(string, keepends) {
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
_$rapyd$_str.swapcase = function(string) {
    var ans, a, b;
    ans = Array(string.length);
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
_$rapyd$_str.zfill = function(string, width) {
    if (width > string.length) {
        string = Array(width - string.length + 1).join("0") + string;
    }
    return string;
};
_$rapyd$_str.uchrs = function(string, with_positions) {
    return (function(){
        var _$rapyd$_d = {};
        _$rapyd$_d["_string"] = string;
        _$rapyd$_d["_pos"] = 0;
        _$rapyd$_d[_$rapyd$_iterator_symbol] = function() {
            return this;
        };
        _$rapyd$_d["next"] = function() {
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
        return _$rapyd$_d;
    })();
};
_$rapyd$_str.uslice = function(string, start, end) {
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
_$rapyd$_str.ulen = function(string) {
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
_$rapyd$_str.ascii_lowercase = "abcdefghijklmnopqrstuvwxyz";
_$rapyd$_str.ascii_uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
_$rapyd$_str.ascii_letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
_$rapyd$_str.digits = "0123456789";
_$rapyd$_str.punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
_$rapyd$_str.printable = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\u000b\f";
_$rapyd$_str.whitespace = " \t\n\r\u000b\f";
var str = _$rapyd$_str;;
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
            if (Array.isArray(iterable) || typeof iterable === "string") {
                ans = {
                    "_i": -1,
                    "next": function() {
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
                    }
                };
                ans[_$rapyd$_iterator_symbol] = function() {
                    return this;
                };
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
    _$rapyd$_modules["utils"] = {};
    _$rapyd$_modules["errors"] = {};
    _$rapyd$_modules["unicode_aliases"] = {};
    _$rapyd$_modules["ast"] = {};
    _$rapyd$_modules["tokenizer"] = {};
    _$rapyd$_modules["parse"] = {};
    _$rapyd$_modules["output"] = {};

    (function(){
        var __name__ = "utils";
        var MAP, slice, characters, member, repeat_string, DefaultsError, defaults, merge, noop, push_uniq, string_template, remove, mergeSort, set_difference, set_intersection, make_predicate;
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
                var _$rapyd$_Iter0 = _$rapyd$_Iterable(ret);
                for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
                    i = _$rapyd$_Iter0[_$rapyd$_Index0];
                    if (!defs.hasOwnProperty(i)) {
                        throw new DefaultsError("`" + i + "` is not a supported option", defs);
                    }
                }
            }
            var _$rapyd$_Iter1 = _$rapyd$_Iterable(defs);
            for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
                i = _$rapyd$_Iter1[_$rapyd$_Index1];
                ret[i] = (args && args.hasOwnProperty(i)) ? args[i] : defs[i];
            }
            return ret;
        }
        function merge(obj, ext) {
            var i;
            var _$rapyd$_Iter2 = _$rapyd$_Iterable(ext);
            for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
                i = _$rapyd$_Iter2[_$rapyd$_Index2];
                obj[i] = ext[i];
            }
            return obj;
        }
        function noop() {
        }
        MAP = function() {
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
                    var _$rapyd$_Iter3 = _$rapyd$_Iterable(a);
                    for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
                        i = _$rapyd$_Iter3[_$rapyd$_Index3];
                        if (doit()) {
                            break;
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
            _$rapyd$_chain_assign_temp = {};
            skip = _$rapyd$_chain_assign_temp;
            MAP.skip = _$rapyd$_chain_assign_temp;
;
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
                var _$rapyd$_Iter4 = _$rapyd$_Iterable(words);
                for (var _$rapyd$_Index4 = 0; _$rapyd$_Index4 < _$rapyd$_Iter4.length; _$rapyd$_Index4++) {
                    k = _$rapyd$_Iter4[_$rapyd$_Index4];
                    a[k] = true;
                }
                return function(x) {
                    return a.hasOwnProperty(x);
                };
            }
        }
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
    })();

    (function(){
        var __name__ = "errors";
        var ImportError;
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
        var __name__ = "unicode_aliases";
        var DB, ALIAS_MAP;
        DB = "\n# NameAliases-8.0.0.txt\n# Date: 2014-11-19, 01:30:00 GMT [KW, LI]\n#\n# This file is a normative contributory data file in the\n# Unicode Character Database.\n#\n# Copyright (c) 2005-2014 Unicode, Inc.\n# For terms of use, see http://www.unicode.org/terms_of_use.html\n#\n# This file defines the formal name aliases for Unicode characters.\n#\n# For informative aliases, see NamesList.txt\n#\n# The formal name aliases are divided into five types, each with a distinct label.\n#\n# Type Labels:\n#\n# 1. correction\n#      Corrections for serious problems in the character names\n# 2. control\n#      ISO 6429 names for C0 and C1 control functions, and other\n#      commonly occurring names for control codes\n# 3. alternate\n#      A few widely used alternate names for format characters\n# 4. figment\n#      Several documented labels for C1 control code points which\n#      were never actually approved in any standard\n# 5. abbreviation\n#      Commonly occurring abbreviations (or acronyms) for control codes,\n#      format characters, spaces, and variation selectors\n#\n# The formal name aliases are part of the Unicode character namespace, which\n# includes the character names and the names of named character sequences.\n# The inclusion of ISO 6429 names and other commonly occurring names and\n# abbreviations for control codes and format characters as formal name aliases\n# is to help avoid name collisions between Unicode character names and the\n# labels which commonly appear in text and/or in implementations such as regex, for\n# control codes (which for historical reasons have no Unicode character name)\n# or for format characters.\n#\n# For documentation, see NamesList.html and http://www.unicode.org/reports/tr44/\n#\n# FORMAT\n#\n# Each line has three fields, as described here:\n#\n# First field:  Code point\n# Second field: Alias\n# Third field:  Type\n#\n# The type labels used are defined above. As for property values, comparisons\n# of type labels should ignore case.\n#\n# The type labels can be mapped to other strings for display, if desired.\n#\n# In case multiple aliases are assigned, additional aliases\n# are provided on separate lines. Parsers of this data file should\n# take note that the same code point can (and does) occur more than once.\n#\n# Note that currently the only instances of multiple aliases of the same\n# type for a single code point are either of type \"control\" or \"abbreviation\".\n# An alias of type \"abbreviation\" can, in principle, be added for any code\n# point, although currently aliases of type \"correction\" do not have\n# any additional aliases of type \"abbreviation\". Such relationships\n# are not enforced by stability policies.\n#\n#-----------------------------------------------------------------\n\n0000;NULL;control\n0000;NUL;abbreviation\n0001;START OF HEADING;control\n0001;SOH;abbreviation\n0002;START OF TEXT;control\n0002;STX;abbreviation\n0003;END OF TEXT;control\n0003;ETX;abbreviation\n0004;END OF TRANSMISSION;control\n0004;EOT;abbreviation\n0005;ENQUIRY;control\n0005;ENQ;abbreviation\n0006;ACKNOWLEDGE;control\n0006;ACK;abbreviation\n\n# Note that no formal name alias for the ISO 6429 \"BELL\" is\n# provided for U+0007, because of the existing name collision\n# with U+1F514 BELL.\n\n0007;ALERT;control\n0007;BEL;abbreviation\n\n0008;BACKSPACE;control\n0008;BS;abbreviation\n0009;CHARACTER TABULATION;control\n0009;HORIZONTAL TABULATION;control\n0009;HT;abbreviation\n0009;TAB;abbreviation\n000A;LINE FEED;control\n000A;NEW LINE;control\n000A;END OF LINE;control\n000A;LF;abbreviation\n000A;NL;abbreviation\n000A;EOL;abbreviation\n000B;LINE TABULATION;control\n000B;VERTICAL TABULATION;control\n000B;VT;abbreviation\n000C;FORM FEED;control\n000C;FF;abbreviation\n000D;CARRIAGE RETURN;control\n000D;CR;abbreviation\n000E;SHIFT OUT;control\n000E;LOCKING-SHIFT ONE;control\n000E;SO;abbreviation\n000F;SHIFT IN;control\n000F;LOCKING-SHIFT ZERO;control\n000F;SI;abbreviation\n0010;DATA LINK ESCAPE;control\n0010;DLE;abbreviation\n0011;DEVICE CONTROL ONE;control\n0011;DC1;abbreviation\n0012;DEVICE CONTROL TWO;control\n0012;DC2;abbreviation\n0013;DEVICE CONTROL THREE;control\n0013;DC3;abbreviation\n0014;DEVICE CONTROL FOUR;control\n0014;DC4;abbreviation\n0015;NEGATIVE ACKNOWLEDGE;control\n0015;NAK;abbreviation\n0016;SYNCHRONOUS IDLE;control\n0016;SYN;abbreviation\n0017;END OF TRANSMISSION BLOCK;control\n0017;ETB;abbreviation\n0018;CANCEL;control\n0018;CAN;abbreviation\n0019;END OF MEDIUM;control\n0019;EOM;abbreviation\n001A;SUBSTITUTE;control\n001A;SUB;abbreviation\n001B;ESCAPE;control\n001B;ESC;abbreviation\n001C;INFORMATION SEPARATOR FOUR;control\n001C;FILE SEPARATOR;control\n001C;FS;abbreviation\n001D;INFORMATION SEPARATOR THREE;control\n001D;GROUP SEPARATOR;control\n001D;GS;abbreviation\n001E;INFORMATION SEPARATOR TWO;control\n001E;RECORD SEPARATOR;control\n001E;RS;abbreviation\n001F;INFORMATION SEPARATOR ONE;control\n001F;UNIT SEPARATOR;control\n001F;US;abbreviation\n0020;SP;abbreviation\n007F;DELETE;control\n007F;DEL;abbreviation\n\n# PADDING CHARACTER and HIGH OCTET PRESET represent\n# architectural concepts initially proposed for early\n# drafts of ISO/IEC 10646-1. They were never actually\n# approved or standardized: hence their designation\n# here as the \"figment\" type. Formal name aliases\n# (and corresponding abbreviations) for these code\n# points are included here because these names leaked\n# out from the draft documents and were published in\n# at least one RFC whose names for code points was\n# implemented in Perl regex expressions.\n\n0080;PADDING CHARACTER;figment\n0080;PAD;abbreviation\n0081;HIGH OCTET PRESET;figment\n0081;HOP;abbreviation\n\n0082;BREAK PERMITTED HERE;control\n0082;BPH;abbreviation\n0083;NO BREAK HERE;control\n0083;NBH;abbreviation\n0084;INDEX;control\n0084;IND;abbreviation\n0085;NEXT LINE;control\n0085;NEL;abbreviation\n0086;START OF SELECTED AREA;control\n0086;SSA;abbreviation\n0087;END OF SELECTED AREA;control\n0087;ESA;abbreviation\n0088;CHARACTER TABULATION SET;control\n0088;HORIZONTAL TABULATION SET;control\n0088;HTS;abbreviation\n0089;CHARACTER TABULATION WITH JUSTIFICATION;control\n0089;HORIZONTAL TABULATION WITH JUSTIFICATION;control\n0089;HTJ;abbreviation\n008A;LINE TABULATION SET;control\n008A;VERTICAL TABULATION SET;control\n008A;VTS;abbreviation\n008B;PARTIAL LINE FORWARD;control\n008B;PARTIAL LINE DOWN;control\n008B;PLD;abbreviation\n008C;PARTIAL LINE BACKWARD;control\n008C;PARTIAL LINE UP;control\n008C;PLU;abbreviation\n008D;REVERSE LINE FEED;control\n008D;REVERSE INDEX;control\n008D;RI;abbreviation\n008E;SINGLE SHIFT TWO;control\n008E;SINGLE-SHIFT-2;control\n008E;SS2;abbreviation\n008F;SINGLE SHIFT THREE;control\n008F;SINGLE-SHIFT-3;control\n008F;SS3;abbreviation\n0090;DEVICE CONTROL STRING;control\n0090;DCS;abbreviation\n0091;PRIVATE USE ONE;control\n0091;PRIVATE USE-1;control\n0091;PU1;abbreviation\n0092;PRIVATE USE TWO;control\n0092;PRIVATE USE-2;control\n0092;PU2;abbreviation\n0093;SET TRANSMIT STATE;control\n0093;STS;abbreviation\n0094;CANCEL CHARACTER;control\n0094;CCH;abbreviation\n0095;MESSAGE WAITING;control\n0095;MW;abbreviation\n0096;START OF GUARDED AREA;control\n0096;START OF PROTECTED AREA;control\n0096;SPA;abbreviation\n0097;END OF GUARDED AREA;control\n0097;END OF PROTECTED AREA;control\n0097;EPA;abbreviation\n0098;START OF STRING;control\n0098;SOS;abbreviation\n\n# SINGLE GRAPHIC CHARACTER INTRODUCER is another\n# architectural concept from early drafts of ISO/IEC 10646-1\n# which was never approved and standardized.\n\n0099;SINGLE GRAPHIC CHARACTER INTRODUCER;figment\n0099;SGC;abbreviation\n\n009A;SINGLE CHARACTER INTRODUCER;control\n009A;SCI;abbreviation\n009B;CONTROL SEQUENCE INTRODUCER;control\n009B;CSI;abbreviation\n009C;STRING TERMINATOR;control\n009C;ST;abbreviation\n009D;OPERATING SYSTEM COMMAND;control\n009D;OSC;abbreviation\n009E;PRIVACY MESSAGE;control\n009E;PM;abbreviation\n009F;APPLICATION PROGRAM COMMAND;control\n009F;APC;abbreviation\n00A0;NBSP;abbreviation\n00AD;SHY;abbreviation\n01A2;LATIN CAPITAL LETTER GHA;correction\n01A3;LATIN SMALL LETTER GHA;correction\n034F;CGJ;abbreviation\n061C;ALM;abbreviation\n0709;SYRIAC SUBLINEAR COLON SKEWED LEFT;correction\n0CDE;KANNADA LETTER LLLA;correction\n0E9D;LAO LETTER FO FON;correction\n0E9F;LAO LETTER FO FAY;correction\n0EA3;LAO LETTER RO;correction\n0EA5;LAO LETTER LO;correction\n0FD0;TIBETAN MARK BKA- SHOG GI MGO RGYAN;correction\n180B;FVS1;abbreviation\n180C;FVS2;abbreviation\n180D;FVS3;abbreviation\n180E;MVS;abbreviation\n200B;ZWSP;abbreviation\n200C;ZWNJ;abbreviation\n200D;ZWJ;abbreviation\n200E;LRM;abbreviation\n200F;RLM;abbreviation\n202A;LRE;abbreviation\n202B;RLE;abbreviation\n202C;PDF;abbreviation\n202D;LRO;abbreviation\n202E;RLO;abbreviation\n202F;NNBSP;abbreviation\n205F;MMSP;abbreviation\n2060;WJ;abbreviation\n2066;LRI;abbreviation\n2067;RLI;abbreviation\n2068;FSI;abbreviation\n2069;PDI;abbreviation\n2118;WEIERSTRASS ELLIPTIC FUNCTION;correction\n2448;MICR ON US SYMBOL;correction\n2449;MICR DASH SYMBOL;correction\n2B7A;LEFTWARDS TRIANGLE-HEADED ARROW WITH DOUBLE VERTICAL STROKE;correction\n2B7C;RIGHTWARDS TRIANGLE-HEADED ARROW WITH DOUBLE VERTICAL STROKE;correction\nA015;YI SYLLABLE ITERATION MARK;correction\nFE18;PRESENTATION FORM FOR VERTICAL RIGHT WHITE LENTICULAR BRACKET;correction\nFE00;VS1;abbreviation\nFE01;VS2;abbreviation\nFE02;VS3;abbreviation\nFE03;VS4;abbreviation\nFE04;VS5;abbreviation\nFE05;VS6;abbreviation\nFE06;VS7;abbreviation\nFE07;VS8;abbreviation\nFE08;VS9;abbreviation\nFE09;VS10;abbreviation\nFE0A;VS11;abbreviation\nFE0B;VS12;abbreviation\nFE0C;VS13;abbreviation\nFE0D;VS14;abbreviation\nFE0E;VS15;abbreviation\nFE0F;VS16;abbreviation\nFEFF;BYTE ORDER MARK;alternate\nFEFF;BOM;abbreviation\nFEFF;ZWNBSP;abbreviation\n122D4;CUNEIFORM SIGN NU11 TENU;correction\n122D5;CUNEIFORM SIGN NU11 OVER NU11 BUR OVER BUR;correction\n1D0C5;BYZANTINE MUSICAL SYMBOL FTHORA SKLIRON CHROMA VASIS;correction\nE0100;VS17;abbreviation\nE0101;VS18;abbreviation\nE0102;VS19;abbreviation\nE0103;VS20;abbreviation\nE0104;VS21;abbreviation\nE0105;VS22;abbreviation\nE0106;VS23;abbreviation\nE0107;VS24;abbreviation\nE0108;VS25;abbreviation\nE0109;VS26;abbreviation\nE010A;VS27;abbreviation\nE010B;VS28;abbreviation\nE010C;VS29;abbreviation\nE010D;VS30;abbreviation\nE010E;VS31;abbreviation\nE010F;VS32;abbreviation\nE0110;VS33;abbreviation\nE0111;VS34;abbreviation\nE0112;VS35;abbreviation\nE0113;VS36;abbreviation\nE0114;VS37;abbreviation\nE0115;VS38;abbreviation\nE0116;VS39;abbreviation\nE0117;VS40;abbreviation\nE0118;VS41;abbreviation\nE0119;VS42;abbreviation\nE011A;VS43;abbreviation\nE011B;VS44;abbreviation\nE011C;VS45;abbreviation\nE011D;VS46;abbreviation\nE011E;VS47;abbreviation\nE011F;VS48;abbreviation\nE0120;VS49;abbreviation\nE0121;VS50;abbreviation\nE0122;VS51;abbreviation\nE0123;VS52;abbreviation\nE0124;VS53;abbreviation\nE0125;VS54;abbreviation\nE0126;VS55;abbreviation\nE0127;VS56;abbreviation\nE0128;VS57;abbreviation\nE0129;VS58;abbreviation\nE012A;VS59;abbreviation\nE012B;VS60;abbreviation\nE012C;VS61;abbreviation\nE012D;VS62;abbreviation\nE012E;VS63;abbreviation\nE012F;VS64;abbreviation\nE0130;VS65;abbreviation\nE0131;VS66;abbreviation\nE0132;VS67;abbreviation\nE0133;VS68;abbreviation\nE0134;VS69;abbreviation\nE0135;VS70;abbreviation\nE0136;VS71;abbreviation\nE0137;VS72;abbreviation\nE0138;VS73;abbreviation\nE0139;VS74;abbreviation\nE013A;VS75;abbreviation\nE013B;VS76;abbreviation\nE013C;VS77;abbreviation\nE013D;VS78;abbreviation\nE013E;VS79;abbreviation\nE013F;VS80;abbreviation\nE0140;VS81;abbreviation\nE0141;VS82;abbreviation\nE0142;VS83;abbreviation\nE0143;VS84;abbreviation\nE0144;VS85;abbreviation\nE0145;VS86;abbreviation\nE0146;VS87;abbreviation\nE0147;VS88;abbreviation\nE0148;VS89;abbreviation\nE0149;VS90;abbreviation\nE014A;VS91;abbreviation\nE014B;VS92;abbreviation\nE014C;VS93;abbreviation\nE014D;VS94;abbreviation\nE014E;VS95;abbreviation\nE014F;VS96;abbreviation\nE0150;VS97;abbreviation\nE0151;VS98;abbreviation\nE0152;VS99;abbreviation\nE0153;VS100;abbreviation\nE0154;VS101;abbreviation\nE0155;VS102;abbreviation\nE0156;VS103;abbreviation\nE0157;VS104;abbreviation\nE0158;VS105;abbreviation\nE0159;VS106;abbreviation\nE015A;VS107;abbreviation\nE015B;VS108;abbreviation\nE015C;VS109;abbreviation\nE015D;VS110;abbreviation\nE015E;VS111;abbreviation\nE015F;VS112;abbreviation\nE0160;VS113;abbreviation\nE0161;VS114;abbreviation\nE0162;VS115;abbreviation\nE0163;VS116;abbreviation\nE0164;VS117;abbreviation\nE0165;VS118;abbreviation\nE0166;VS119;abbreviation\nE0167;VS120;abbreviation\nE0168;VS121;abbreviation\nE0169;VS122;abbreviation\nE016A;VS123;abbreviation\nE016B;VS124;abbreviation\nE016C;VS125;abbreviation\nE016D;VS126;abbreviation\nE016E;VS127;abbreviation\nE016F;VS128;abbreviation\nE0170;VS129;abbreviation\nE0171;VS130;abbreviation\nE0172;VS131;abbreviation\nE0173;VS132;abbreviation\nE0174;VS133;abbreviation\nE0175;VS134;abbreviation\nE0176;VS135;abbreviation\nE0177;VS136;abbreviation\nE0178;VS137;abbreviation\nE0179;VS138;abbreviation\nE017A;VS139;abbreviation\nE017B;VS140;abbreviation\nE017C;VS141;abbreviation\nE017D;VS142;abbreviation\nE017E;VS143;abbreviation\nE017F;VS144;abbreviation\nE0180;VS145;abbreviation\nE0181;VS146;abbreviation\nE0182;VS147;abbreviation\nE0183;VS148;abbreviation\nE0184;VS149;abbreviation\nE0185;VS150;abbreviation\nE0186;VS151;abbreviation\nE0187;VS152;abbreviation\nE0188;VS153;abbreviation\nE0189;VS154;abbreviation\nE018A;VS155;abbreviation\nE018B;VS156;abbreviation\nE018C;VS157;abbreviation\nE018D;VS158;abbreviation\nE018E;VS159;abbreviation\nE018F;VS160;abbreviation\nE0190;VS161;abbreviation\nE0191;VS162;abbreviation\nE0192;VS163;abbreviation\nE0193;VS164;abbreviation\nE0194;VS165;abbreviation\nE0195;VS166;abbreviation\nE0196;VS167;abbreviation\nE0197;VS168;abbreviation\nE0198;VS169;abbreviation\nE0199;VS170;abbreviation\nE019A;VS171;abbreviation\nE019B;VS172;abbreviation\nE019C;VS173;abbreviation\nE019D;VS174;abbreviation\nE019E;VS175;abbreviation\nE019F;VS176;abbreviation\nE01A0;VS177;abbreviation\nE01A1;VS178;abbreviation\nE01A2;VS179;abbreviation\nE01A3;VS180;abbreviation\nE01A4;VS181;abbreviation\nE01A5;VS182;abbreviation\nE01A6;VS183;abbreviation\nE01A7;VS184;abbreviation\nE01A8;VS185;abbreviation\nE01A9;VS186;abbreviation\nE01AA;VS187;abbreviation\nE01AB;VS188;abbreviation\nE01AC;VS189;abbreviation\nE01AD;VS190;abbreviation\nE01AE;VS191;abbreviation\nE01AF;VS192;abbreviation\nE01B0;VS193;abbreviation\nE01B1;VS194;abbreviation\nE01B2;VS195;abbreviation\nE01B3;VS196;abbreviation\nE01B4;VS197;abbreviation\nE01B5;VS198;abbreviation\nE01B6;VS199;abbreviation\nE01B7;VS200;abbreviation\nE01B8;VS201;abbreviation\nE01B9;VS202;abbreviation\nE01BA;VS203;abbreviation\nE01BB;VS204;abbreviation\nE01BC;VS205;abbreviation\nE01BD;VS206;abbreviation\nE01BE;VS207;abbreviation\nE01BF;VS208;abbreviation\nE01C0;VS209;abbreviation\nE01C1;VS210;abbreviation\nE01C2;VS211;abbreviation\nE01C3;VS212;abbreviation\nE01C4;VS213;abbreviation\nE01C5;VS214;abbreviation\nE01C6;VS215;abbreviation\nE01C7;VS216;abbreviation\nE01C8;VS217;abbreviation\nE01C9;VS218;abbreviation\nE01CA;VS219;abbreviation\nE01CB;VS220;abbreviation\nE01CC;VS221;abbreviation\nE01CD;VS222;abbreviation\nE01CE;VS223;abbreviation\nE01CF;VS224;abbreviation\nE01D0;VS225;abbreviation\nE01D1;VS226;abbreviation\nE01D2;VS227;abbreviation\nE01D3;VS228;abbreviation\nE01D4;VS229;abbreviation\nE01D5;VS230;abbreviation\nE01D6;VS231;abbreviation\nE01D7;VS232;abbreviation\nE01D8;VS233;abbreviation\nE01D9;VS234;abbreviation\nE01DA;VS235;abbreviation\nE01DB;VS236;abbreviation\nE01DC;VS237;abbreviation\nE01DD;VS238;abbreviation\nE01DE;VS239;abbreviation\nE01DF;VS240;abbreviation\nE01E0;VS241;abbreviation\nE01E1;VS242;abbreviation\nE01E2;VS243;abbreviation\nE01E3;VS244;abbreviation\nE01E4;VS245;abbreviation\nE01E5;VS246;abbreviation\nE01E6;VS247;abbreviation\nE01E7;VS248;abbreviation\nE01E8;VS249;abbreviation\nE01E9;VS250;abbreviation\nE01EA;VS251;abbreviation\nE01EB;VS252;abbreviation\nE01EC;VS253;abbreviation\nE01ED;VS254;abbreviation\nE01EE;VS255;abbreviation\nE01EF;VS256;abbreviation\n\n# EOF\n";
        ALIAS_MAP = function() {
            var ans, line, parts, code_point;
            ans = {};
            var _$rapyd$_Iter5 = _$rapyd$_Iterable(DB.split("\n"));
            for (var _$rapyd$_Index5 = 0; _$rapyd$_Index5 < _$rapyd$_Iter5.length; _$rapyd$_Index5++) {
                line = _$rapyd$_Iter5[_$rapyd$_Index5];
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
        }();
        _$rapyd$_modules["unicode_aliases"]["DB"] = DB;

        _$rapyd$_modules["unicode_aliases"]["ALIAS_MAP"] = ALIAS_MAP;
    })();

    (function(){
        var __name__ = "ast";
        var AST_Token, AST_Node, AST_Statement, AST_Debugger, AST_Directive, AST_SimpleStatement, AST_Block, AST_BlockStatement, AST_EmptyStatement, AST_StatementWithBody, AST_DWLoop, AST_Do, AST_While, AST_ForIn, AST_ForJS, AST_ListComprehension, AST_SetComprehension, AST_DictComprehension, AST_GeneratorComprehension, AST_With, AST_WithClause, AST_Scope, AST_Toplevel, AST_Import, AST_Imports, AST_Decorator, AST_Lambda, AST_Accessor, AST_Function, AST_Class, AST_Method, AST_Jump, AST_Exit, AST_Return, AST_Yield, AST_Throw, AST_LoopControl, AST_Break, AST_Continue, AST_If, AST_Try, AST_Catch, AST_Except, AST_Finally, AST_Definitions, AST_Var, AST_Const, AST_VarDef, AST_BaseCall, AST_Call, AST_ClassCall, AST_New, AST_Seq, AST_PropAccess, AST_Dot, AST_Sub, AST_ItemAccess, AST_Splice, AST_Unary, AST_UnaryPrefix, AST_UnaryPostfix, AST_Binary, AST_Conditional, AST_Assign, AST_Array, AST_Object, AST_ExpressiveObject, AST_ObjectProperty, AST_ObjectKeyVal, AST_Set, AST_SetItem, AST_Symbol, AST_SymbolAlias, AST_SymbolAccessor, AST_SymbolDeclaration, AST_SymbolVar, AST_ImportedVar, AST_SymbolConst, AST_SymbolNonlocal, AST_SymbolFunarg, AST_SymbolDefun, AST_SymbolLambda, AST_SymbolCatch, AST_SymbolRef, AST_This, AST_Constant, AST_String, AST_Verbatim, AST_Number, AST_RegExp, AST_Atom, AST_Null, AST_NaN, AST_Undefined, AST_Hole, AST_Infinity, AST_Boolean, AST_False, AST_True, walk_body, TreeWalker;
        var noop = _$rapyd$_modules["utils"].noop;
        var string_template = _$rapyd$_modules["utils"].string_template;
        
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
            ctor.SUBCLASSES = _$rapyd$_list_decorate([]);
            if (type) {
                _$rapyd$_chain_assign_temp = type;
                ctor.prototype.TYPE = _$rapyd$_chain_assign_temp;
                ctor.TYPE = _$rapyd$_chain_assign_temp;
;
            }
            if (methods) {
                var _$rapyd$_Iter6 = _$rapyd$_Iterable(methods);
                for (var _$rapyd$_Index6 = 0; _$rapyd$_Index6 < _$rapyd$_Iter6.length; _$rapyd$_Index6++) {
                    i = _$rapyd$_Iter6[_$rapyd$_Index6];
                    if (/^\$/.test(i)) {
                        ctor[i.substr(1)] = methods[i];
                    } else {
                        ctor.prototype[i] = methods[i];
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
            },
            "_dump": function() {
                var depth = (arguments[0] === undefined || ( 0 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? (100) : arguments[0];
                var omit = (arguments[1] === undefined || ( 1 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? ((function(){
                    var s = _$rapyd$_set();
                    s.jsset.add("start");
                    s.jsset.add("end");
                    return s;
                })()) : arguments[1];
                var offset = (arguments[2] === undefined || ( 2 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? (0) : arguments[2];
                var include_name = (arguments[3] === undefined || ( 3 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? (true) : arguments[3];
                var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
                if (typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [_$rapyd$_kwargs_symbol] !== true) _$rapyd$_kwargs_obj = {};
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
                var _$rapyd$_Iter7 = _$rapyd$_Iterable(this);
                for (var _$rapyd$_Index7 = 0; _$rapyd$_Index7 < _$rapyd$_Iter7.length; _$rapyd$_Index7++) {
                    key = _$rapyd$_Iter7[_$rapyd$_Index7];
                    if (_$rapyd$_in(key, omit)) {
                        continue;
                    }
                    if (Array.isArray(this[key])) {
                        if (this[key].length) {
                            p(pad + " " + blue + key + ": " + reset + "[");
                            if (depth > 1) {
                                var _$rapyd$_Iter8 = _$rapyd$_Iterable(this[key]);
                                for (var _$rapyd$_Index8 = 0; _$rapyd$_Index8 < _$rapyd$_Iter8.length; _$rapyd$_Index8++) {
                                    element = _$rapyd$_Iter8[_$rapyd$_Index8];
                                    element._dump(depth - 1, omit, offset + 1, true);
                                }
                            } else {
                                var _$rapyd$_Iter9 = _$rapyd$_Iterable(this[key]);
                                for (var _$rapyd$_Index9 = 0; _$rapyd$_Index9 < _$rapyd$_Iter9.length; _$rapyd$_Index9++) {
                                    element = _$rapyd$_Iter9[_$rapyd$_Index9];
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
                                var _$rapyd$_Iter10 = _$rapyd$_Iterable(this[key]);
                                for (var _$rapyd$_Index10 = 0; _$rapyd$_Index10 < _$rapyd$_Iter10.length; _$rapyd$_Index10++) {
                                    property = _$rapyd$_Iter10[_$rapyd$_Index10];
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
            },
            "dump": function() {
                var depth = (arguments[0] === undefined || ( 0 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? (2) : arguments[0];
                var omit = (arguments[1] === undefined || ( 1 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? (_$rapyd$_list_decorate([])) : arguments[1];
                var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
                if (typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [_$rapyd$_kwargs_symbol] !== true) _$rapyd$_kwargs_obj = {};
                if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "depth")){
                    depth = _$rapyd$_kwargs_obj.depth;
                }
                if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "omit")){
                    omit = _$rapyd$_kwargs_obj.omit;
                }
                return this._dump(depth, omit, 0, true);
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
                    node.object._walk(visitor);
                    node.statement._walk(visitor);
                    if (node.condition) node.condition._walk(visitor);
                });
            }
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
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.init._walk(visitor);
                    node.object._walk(visitor);
                    node.statement._walk(visitor);
                    node.value_statement._walk(visitor);
                    if (node.condition) node.condition._walk(visitor);
                });
            }
        }, AST_ListComprehension);
        AST_GeneratorComprehension = DEFNODE("GeneratorComprehension", null, {
            "$documentation": "A generator comprehension"
        }, AST_ListComprehension);
        AST_With = DEFNODE("With", "clauses", {
            "$documentation": "A `with` statement",
            "$propdoc": {
                "clauses": "[AST_WithClause*] the `with` clauses (comma separated)"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.clauses.forEach(function(exp) {
                        exp._walk(visitor);
                    });
                    node.body._walk(visitor);
                });
            }
        }, AST_StatementWithBody);
        AST_WithClause = DEFNODE("WithClause", "expression alias", {
            "$documentation": "A clause in a with statement",
            "$propdoc": {
                "expression": "[AST_Node] the expression",
                "alias": "[AST_SymbolAlias?] optional alias for this expression"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.expression._walk(visitor);
                    if (node.alias) {
                        node.alias._walk(visitor);
                    }
                });
            }
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
        AST_Decorator = DEFNODE("Decorator", "expression", {
            "$documentation": "Class for function decorators",
            "$propdoc": {
                "expression": "[AST_Node] the decorator expression"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    if (node.expression) {
                        node.expression.walk(visitor);
                    }
                });
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
                        var _$rapyd$_Iter11 = _$rapyd$_Iterable(node.decorators);
                        for (var _$rapyd$_Index11 = 0; _$rapyd$_Index11 < _$rapyd$_Iter11.length; _$rapyd$_Index11++) {
                            d = _$rapyd$_Iter11[_$rapyd$_Index11];
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
                        var _$rapyd$_Iter12 = _$rapyd$_Iterable(node.decorators);
                        for (var _$rapyd$_Index12 = 0; _$rapyd$_Index12 < _$rapyd$_Iter12.length; _$rapyd$_Index12++) {
                            d = _$rapyd$_Iter12[_$rapyd$_Index12];
                            d.walk(visitor);
                        }
                    }
                    node.name._walk(visitor);
                    walk_body(node, visitor);
                    if (node.parent) node.parent._walk(visitor);
                });
            }
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
                        var _$rapyd$_Iter13 = _$rapyd$_Iterable(node.errors);
                        for (var _$rapyd$_Index13 = 0; _$rapyd$_Index13 < _$rapyd$_Iter13.length; _$rapyd$_Index13++) {
                            e = _$rapyd$_Iter13[_$rapyd$_Index13];
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
                    if (node.args.kwargs) node.args.kwargs.forEach(function(arg) {
                        arg[0]._walk(visitor);
                        arg[1]._walk(visitor);
                    });
                    if (node.args.kwarg_items) node.args.kwarg_items.forEach(function(arg) {
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
                    node.args.kwargs.forEach(function(arg) {
                        arg[0]._walk(visitor);
                        arg[1]._walk(visitor);
                    });
                    node.args.kwarg_items.forEach(function(arg) {
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
        AST_ItemAccess = DEFNODE("ItemAccess", "assignment", {
            "$documentation": "Python index-style property access, i.e. `a.__getitem__(\"foo\")`",
            "$propdoc": {
                "assignment": "[AST_Node or None] Not None if this is an assignment (a[x] = y) rather than a simple access"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.expression._walk(visitor);
                    node.property._walk(visitor);
                    if (node.assignment) {
                        node.assignment._walk(visitor);
                    }
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
            "$documentation": "An assignment expression — `a = b + 5`",
            "is_chained": function() {
                return this.right instanceof AST_Assign || this.right instanceof AST_Seq && (this.right.car instanceof AST_Assign || this.right.cdr instanceof AST_Assign);
            },
            "traverse_chain": function() {
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
            }
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
                    ans = _$rapyd$_list_decorate([]);
                    var _$rapyd$_Iter14 = _$rapyd$_Iterable(arr);
                    for (var _$rapyd$_Index14 = 0; _$rapyd$_Index14 < _$rapyd$_Iter14.length; _$rapyd$_Index14++) {
                        value = _$rapyd$_Iter14[_$rapyd$_Index14];
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
        AST_Object = DEFNODE("Object", "properties is_pydict", {
            "$documentation": "An object literal",
            "$propdoc": {
                "properties": "[AST_ObjectProperty*] array of properties",
                "is_pydict": "[bool] True if this object is a python dict literal"
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
        AST_Set = DEFNODE("Set", "items", {
            "$documentation": "A set literal",
            "$propdoc": {
                "items": "[AST_SetItem*] array of items"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.items.forEach(function(prop) {
                        prop._walk(visitor);
                    });
                });
            }
        });
        AST_SetItem = DEFNODE("SetItem", "value", {
            "$documentation": "An item in a set literal",
            "$propdoc": {
                "value": "[AST_Node] The value of this item"
            },
            "_walk": function(visitor) {
                var node;
                node = this;
                return visitor._visit(node, function() {
                    node.value._walk(visitor);
                });
            }
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
            this.stack = _$rapyd$_list_decorate([]);
        }
        TreeWalker.prototype = {
            "_visit": function(node, descend) {
                var ret;
                this.stack.push(node);
                ret = this.visit(node, (descend) ? function() {
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

        _$rapyd$_modules["ast"]["AST_GeneratorComprehension"] = AST_GeneratorComprehension;

        _$rapyd$_modules["ast"]["AST_With"] = AST_With;

        _$rapyd$_modules["ast"]["AST_WithClause"] = AST_WithClause;

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

        _$rapyd$_modules["ast"]["AST_ItemAccess"] = AST_ItemAccess;

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

        _$rapyd$_modules["ast"]["AST_Set"] = AST_Set;

        _$rapyd$_modules["ast"]["AST_SetItem"] = AST_SetItem;

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
        var RE_HEX_NUMBER, RE_OCT_NUMBER, RE_DEC_NUMBER, UNARY_POSTFIX, OPERATOR_CHARS, INVALID_OPERATORS, ASCII_CONTROL_CHARS, HEX_PAT, NAME_PAT, OPERATORS, OP_MAP, WHITESPACE_CHARS, PUNC_BEFORE_EXPRESSION, PUNC_CHARS, REGEXP_MODIFIERS, KEYWORDS, KEYWORDS_ATOM, RESERVED_WORDS, KEYWORDS_BEFORE_EXPRESSION, ALL_KEYWORDS, IDENTIFIER_PAT, UNICODE, EX_EOF, is_letter, is_digit, is_alphanumeric_char, is_unicode_combining_mark, is_unicode_connector_punctuation, is_identifier, is_identifier_start, is_identifier_char, parse_js_number, is_token, tokenizer;
        var ALIAS_MAP = _$rapyd$_modules["unicode_aliases"].ALIAS_MAP;
        
        var make_predicate = _$rapyd$_modules["utils"].make_predicate;
        var characters = _$rapyd$_modules["utils"].characters;
        
        var AST_Token = _$rapyd$_modules["ast"].AST_Token;
        
        var SyntaxError = _$rapyd$_modules["errors"].SyntaxError;
        
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
            "is": "===",
            "==": "===",
            "!=": "!=="
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
            var _$rapyd$_Iter15 = _$rapyd$_Iterable(val);
            for (var _$rapyd$_Index15 = 0; _$rapyd$_Index15 < _$rapyd$_Iter15.length; _$rapyd$_Index15++) {
                ch = _$rapyd$_Iter15[_$rapyd$_Index15];
                if ("vruVRU".indexOf(ch) === -1) {
                    return false;
                }
            }
            return true;
        }
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
                "index_or_slice": [ false ],
                "expecting_object_literal_key": false
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
                    for (i = 0; i < ret.comments_before.length; i++) {
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
                if (!prefix && peek() === "0" && S.text.charAt(S.pos + 1) === "b") {
                    [next(), next()];
                    num = read_while(function(ch) {
                        return ch === "0" || ch === "1";
                    });
                    valid = parseInt(num, 2);
                    if (isNaN(valid)) {
                        parse_error("Invalid syntax for a binary number");
                    }
                    return token("num", valid);
                }
                num = read_while(function(ch, i) {
                    var code, tmp_;
                    code = ch.charCodeAt(0);
                    tmp_ = code;
                    if (tmp_ === 120 || tmp_ === 88) {
                        return (has_x) ? false : has_x = true;
                    } else if (tmp_ === 101 || tmp_ === 69) {
                        return (has_x) ? true : (has_e) ? false : _$rapyd$_chain_assign_temp = true;
                        has_e = _$rapyd$_chain_assign_temp;
                        after_e = _$rapyd$_chain_assign_temp;
;
                    } else if (tmp_ === 45) {
                        return after_e || i === 0 && !prefix;
                    } else if (tmp_ === 43) {
                        return after_e;
                    } else if (tmp_ === 46) {
                        after_e = false;
                        return (!has_dot && !has_x && !has_e) ? has_dot = true : false;
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
            }
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
                    name = read_while(function(ch) {
                        return NAME_PAT.test(ch);
                    });
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
            }
            function with_eof_error(eof_error, cont) {
                return function() {
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
            }
            read_string = with_eof_error("Unterminated string constant", function(is_raw_literal, is_js_literal) {
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
            });
            function read_line_comment() {
                var shebang = (arguments[0] === undefined || ( 0 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? (false) : arguments[0];
                var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
                if (typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [_$rapyd$_kwargs_symbol] !== true) _$rapyd$_kwargs_obj = {};
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
            }
            function read_name() {
                var name;
                name = "";
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
            }
            read_regexp = with_eof_error("Unterminated regular expression", function() {
                var prev_backslash, regexp, in_class, verbose_regexp, in_comment, mods;
                prev_backslash = false;
                regexp = "";
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
                if (INVALID_OPERATORS.has(op)) {
                    parse_error("Invalid operator «" + op + "»");
                }
                if (op === "!") {
                    return token("punc", op);
                }
                return token("operator", op);
            }
            function handle_slash() {
                next();
                return (S.regex_allowed) ? read_regexp("") : read_operator("/");
            }
            function handle_dot() {
                next();
                return (is_digit(peek().charCodeAt(0))) ? read_num(".") : token("punc", ".");
            }
            function read_word() {
                var word;
                word = read_name();
                return (KEYWORDS_ATOM(word)) ? token("atom", word) : (!KEYWORDS(word)) ? token("name", word) : (OPERATORS(word) && prevChar() !== ".") ? token("operator", word) : token("keyword", word);
            }
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

        _$rapyd$_modules["tokenizer"]["INVALID_OPERATORS"] = INVALID_OPERATORS;

        _$rapyd$_modules["tokenizer"]["ASCII_CONTROL_CHARS"] = ASCII_CONTROL_CHARS;

        _$rapyd$_modules["tokenizer"]["HEX_PAT"] = HEX_PAT;

        _$rapyd$_modules["tokenizer"]["NAME_PAT"] = NAME_PAT;

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

        _$rapyd$_modules["tokenizer"]["is_string_modifier"] = is_string_modifier;

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
        var COMPILER_VERSION, BASELIB_ITEMS, BASELIB_FUNCS, BASELIB_ITERTOOLS, NATIVE_CLASSES, ERROR_CLASSES, COMMON_STATIC, UNARY_PREFIX, ASSIGNMENT, PRECEDENCE, STATEMENTS_WITH_LABELS, ATOMIC_START_TOKEN, compile_time_decorators, has_setter_decorator, parse;
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
        var AST_Definitions = _$rapyd$_modules["ast"].AST_Definitions;
        var AST_DictComprehension = _$rapyd$_modules["ast"].AST_DictComprehension;
        var AST_Directive = _$rapyd$_modules["ast"].AST_Directive;
        var AST_Do = _$rapyd$_modules["ast"].AST_Do;
        var AST_Dot = _$rapyd$_modules["ast"].AST_Dot;
        var AST_EmptyStatement = _$rapyd$_modules["ast"].AST_EmptyStatement;
        var AST_Except = _$rapyd$_modules["ast"].AST_Except;
        var AST_ExpressiveObject = _$rapyd$_modules["ast"].AST_ExpressiveObject;
        var AST_False = _$rapyd$_modules["ast"].AST_False;
        var AST_Finally = _$rapyd$_modules["ast"].AST_Finally;
        var AST_ForIn = _$rapyd$_modules["ast"].AST_ForIn;
        var AST_ForJS = _$rapyd$_modules["ast"].AST_ForJS;
        var AST_Function = _$rapyd$_modules["ast"].AST_Function;
        var AST_GeneratorComprehension = _$rapyd$_modules["ast"].AST_GeneratorComprehension;
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
        var AST_Set = _$rapyd$_modules["ast"].AST_Set;
        var AST_SetComprehension = _$rapyd$_modules["ast"].AST_SetComprehension;
        var AST_SetItem = _$rapyd$_modules["ast"].AST_SetItem;
        var AST_Seq = _$rapyd$_modules["ast"].AST_Seq;
        var AST_SimpleStatement = _$rapyd$_modules["ast"].AST_SimpleStatement;
        var AST_Splice = _$rapyd$_modules["ast"].AST_Splice;
        var AST_String = _$rapyd$_modules["ast"].AST_String;
        var AST_Sub = _$rapyd$_modules["ast"].AST_Sub;
        var AST_ItemAccess = _$rapyd$_modules["ast"].AST_ItemAccess;
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
        var AST_WithClause = _$rapyd$_modules["ast"].AST_WithClause;
        var AST_Yield = _$rapyd$_modules["ast"].AST_Yield;
        
        var tokenizer = _$rapyd$_modules["tokenizer"].tokenizer;
        var is_token = _$rapyd$_modules["tokenizer"].is_token;
        var UNARY_POSTFIX = _$rapyd$_modules["tokenizer"].UNARY_POSTFIX;
        
        COMPILER_VERSION = "53deff9f4572abd267e30bf4915739260b3debc6";
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
            "Object": {
                "static": _$rapyd$_list_decorate([ "getOwnPropertyNames", "keys", "create", "defineProperty", "defineProperties", "getPrototypeOf", "setPrototypeOf", "assign" ])
            },
            "String": {
                "static": _$rapyd$_list_decorate([ "fromCharCode" ])
            },
            "Array": {
                "static": _$rapyd$_list_decorate([ "isArray", "from", "of" ])
            },
            "Number": {
                "static": _$rapyd$_list_decorate([ "isFinite", "isNaN" ])
            },
            "Function": {},
            "Date": {
                "static": _$rapyd$_list_decorate([ "UTC", "now", "parse" ])
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
            "WeakSet": {}
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
        PRECEDENCE = function(a, ret) {
            var b, j, i;
            for (i = 0; i < a.length; i++) {
                b = a[i];
                for (j = 0; j < b.length; j++) {
                    ret[b[j]] = i + 1;
                }
            }
            return ret;
        }.call(this, _$rapyd$_list_decorate([ _$rapyd$_list_decorate([ "||" ]), _$rapyd$_list_decorate([ "&&" ]), _$rapyd$_list_decorate([ "|" ]), _$rapyd$_list_decorate([ "^" ]), _$rapyd$_list_decorate([ "&" ]), _$rapyd$_list_decorate([ "==", "===", "!=", "!==" ]), _$rapyd$_list_decorate([ "<", ">", "<=", ">=", "in", "instanceof" ]), _$rapyd$_list_decorate([ ">>", "<<", ">>>" ]), _$rapyd$_list_decorate([ "+", "-" ]), _$rapyd$_list_decorate([ "*", "/", "//", "%" ]), _$rapyd$_list_decorate([ "**" ]) ]), {});
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
        }
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
        }
        function parse($TEXT, options) {
            var module_id, baselib_items, imported_module_ids, IMPORTED, IMPORTING, S, obj, cname, statement, import_, class_, function_, nonlocal_, const_, new_, expr_atom, array_, object_, subscripts, maybe_unary, expr_op, maybe_conditional, maybe_assign, expression;
            options = defaults(options, {
                "filename": null,
                "auto_bind": false,
                "module_id": "__main__",
                "toplevel": null,
                "for_linting": false,
                "classes": undefined
            });
            module_id = options.module_id;
            baselib_items = {};
            imported_module_ids = _$rapyd$_list_decorate([]);
            IMPORTED = options.IMPORTED || {};
            IMPORTING = options.IMPORTING || {};
            IMPORTING[module_id] = true;
            S = {
                "input": (typeof $TEXT === "string") ? tokenizer($TEXT, options.filename) : $TEXT,
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
                var _$rapyd$_Iter16 = _$rapyd$_Iterable(options.classes);
                for (var _$rapyd$_Index16 = 0; _$rapyd$_Index16 < _$rapyd$_Iter16.length; _$rapyd$_Index16++) {
                    cname = _$rapyd$_Iter16[_$rapyd$_Index16];
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
                throw new SyntaxError(msg, ctx.filename, (line !== undefined) ? line : ctx.tokline, (col !== undefined) ? col : ctx.tokcol, (pos !== undefined) ? pos : ctx.tokpos, is_eof);
            }
            function token_error(token, msg) {
                var is_eof;
                is_eof = (token.type === "eof") ? true : false;
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
                return S.token.nlb || is_("eof") || is_("punc", "}");
            }
            function semicolon() {
                if (is_("punc", ";")) {
                    next();
                    S.token.nlb = true;
                }
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
            function scan_for_top_level_callables(body) {
                var ans, opt, x, obj;
                ans = [];
                if (Array.isArray(body)) {
                    var _$rapyd$_Iter17 = _$rapyd$_Iterable(body);
                    for (var _$rapyd$_Index17 = 0; _$rapyd$_Index17 < _$rapyd$_Iter17.length; _$rapyd$_Index17++) {
                        obj = _$rapyd$_Iter17[_$rapyd$_Index17];
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
                            var _$rapyd$_Iter18 = _$rapyd$_Iterable(_$rapyd$_list_decorate([ "body", "alternative" ]));
                            for (var _$rapyd$_Index18 = 0; _$rapyd$_Index18 < _$rapyd$_Iter18.length; _$rapyd$_Index18++) {
                                x = _$rapyd$_Iter18[_$rapyd$_Index18];
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
                var ans, obj;
                ans = {};
                var _$rapyd$_Iter19 = _$rapyd$_Iterable(body);
                for (var _$rapyd$_Index19 = 0; _$rapyd$_Index19 < _$rapyd$_Iter19.length; _$rapyd$_Index19++) {
                    obj = _$rapyd$_Iter19[_$rapyd$_Index19];
                    if (obj instanceof AST_Class) {
                        ans[obj.name.name] = obj;
                    }
                }
                return ans;
            }
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
                }
                function extend(arr) {
                    var x;
                    var _$rapyd$_Iter20 = _$rapyd$_Iterable(arr);
                    for (var _$rapyd$_Index20 = 0; _$rapyd$_Index20 < _$rapyd$_Iter20.length; _$rapyd$_Index20++) {
                        x = _$rapyd$_Iter20[_$rapyd$_Index20];
                        push(x);
                    }
                }
                function scan_in_array(arr) {
                    var x;
                    var _$rapyd$_Iter21 = _$rapyd$_Iterable(arr);
                    for (var _$rapyd$_Index21 = 0; _$rapyd$_Index21 < _$rapyd$_Iter21.length; _$rapyd$_Index21++) {
                        x = _$rapyd$_Iter21[_$rapyd$_Index21];
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
                }
                if (Array.isArray(body)) {
                    var _$rapyd$_Iter22 = _$rapyd$_Iterable(body);
                    for (var _$rapyd$_Index22 = 0; _$rapyd$_Index22 < _$rapyd$_Iter22.length; _$rapyd$_Index22++) {
                        stmt = _$rapyd$_Iter22[_$rapyd$_Index22];
                        if (stmt instanceof AST_Scope) {
                            continue;
                        }
                        [ "body", "alternative" ].forEach(function(option) {
                            var opt;
                            opt = stmt[option];
                            if (opt) {
                                extend(scan_for_local_vars(opt));
                            }
                            if (opt instanceof AST_Assign && !(opt.right instanceof AST_Scope)) {
                                extend(scan_for_local_vars(opt.right));
                            }
                        });
                        if (stmt instanceof AST_ForIn) {
                            if (stmt.init instanceof AST_Array) {
                                push("_$rapyd$_unpack");
                                scan_in_array(stmt.init.elements);
                            } else {
                                push(stmt.init.name);
                            }
                        } else if (stmt instanceof AST_DWLoop) {
                            extend(scan_for_local_vars(stmt));
                        } else if (stmt instanceof AST_With) {
                            [push("_$rapyd$_with_exception"), push("_$rapyd$_with_suppress")];
                            var _$rapyd$_Iter23 = _$rapyd$_Iterable(stmt.clauses);
                            for (var _$rapyd$_Index23 = 0; _$rapyd$_Index23 < _$rapyd$_Iter23.length; _$rapyd$_Index23++) {
                                clause = _$rapyd$_Iter23[_$rapyd$_Index23];
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
                        var _$rapyd$_Iter24 = _$rapyd$_Iterable(body.traverse_chain()[0]);
                        for (var _$rapyd$_Index24 = 0; _$rapyd$_Index24 < _$rapyd$_Iter24.length; _$rapyd$_Index24++) {
                            lhs = _$rapyd$_Iter24[_$rapyd$_Index24];
                            add_assign_lhs(lhs);
                        }
                        push("_$rapyd$_chain_assign_temp");
                    } else {
                        add_assign_lhs(body.left);
                    }
                }
                return localvars;
            }
            function scan_for_nonlocal_defs(body) {
                var vars, stmt;
                vars = [];
                if (Array.isArray(body)) {
                    var _$rapyd$_Iter25 = _$rapyd$_Iterable(body);
                    for (var _$rapyd$_Index25 = 0; _$rapyd$_Index25 < _$rapyd$_Iter25.length; _$rapyd$_Index25++) {
                        stmt = _$rapyd$_Iter25[_$rapyd$_Index25];
                        if (stmt instanceof AST_Scope) {
                            continue;
                        }
                        if (stmt instanceof AST_Definitions) {
                            stmt.definitions.forEach(function(vardef) {
                                vars.push(vardef.name.name);
                            });
                        }
                        [ "body", "alternative" ].forEach(function(option) {
                            var opt;
                            opt = stmt[option];
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
                        func = function_(S.in_class[S.in_class.length-1]);
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
                            "value": (is_("punc", ";")) ? function() {
                                semicolon();
                                return null;
                            }.call(this) : (can_insert_semicolon()) ? null : function() {
                                var tmp;
                                tmp = expression(true);
                                semicolon();
                                return tmp;
                            }.call(this)
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
            });
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
            }
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
                    "value": (is_("punc", ";")) ? function() {
                        semicolon();
                        return null;
                    }.call(this) : (can_insert_semicolon()) ? null : function() {
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
            }
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
            }
            function for_js() {
                var condition;
                condition = as_atom_node();
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
                    if (ERROR_CLASSES.hasOwnProperty(expr.name)) {
                        return ERROR_CLASSES[expr.name];
                    }
                    for (s = S.classes.length - 1; s > -1; s-=1) {
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
                var package_module_id, src_code, filename, _$rapyd$_chain_assign_temp, modpath, _$rapyd$_unpack, data, location, cached, srchash, ikey, bitem;
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
                        "exports": _$rapyd$_list_decorate([]),
                        "submodules": _$rapyd$_list_decorate([]),
                        "nonlocalvars": _$rapyd$_list_decorate([]),
                        "baselib": {},
                        "outputs": {}
                    };
                    if (len(package_module_id) > 0) {
                        IMPORTED[package_module_id].submodules.push(key);
                    }
                    return;
                }
                function safe_read(base_path) {
                    var _$rapyd$_unpack, i, path;
                    var _$rapyd$_Iter26 = _$rapyd$_Iterable(enumerate(_$rapyd$_list_decorate([ base_path + ".pyj", base_path + "/__init__.pyj" ])));
                    for (var _$rapyd$_Index26 = 0; _$rapyd$_Index26 < _$rapyd$_Iter26.length; _$rapyd$_Index26++) {
                        _$rapyd$_unpack = _$rapyd$_Iter26[_$rapyd$_Index26];
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
                }
                _$rapyd$_chain_assign_temp = null;
                src_code = _$rapyd$_chain_assign_temp;
                filename = _$rapyd$_chain_assign_temp;
;
                modpath = key.replace(".", "/");
                var _$rapyd$_Iter27 = _$rapyd$_Iterable(_$rapyd$_list_decorate([ options.basedir, options.libdir ]));
                for (var _$rapyd$_Index27 = 0; _$rapyd$_Index27 < _$rapyd$_Iter27.length; _$rapyd$_Index27++) {
                    location = _$rapyd$_Iter27[_$rapyd$_Index27];
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
                    import_error("Failed Import: '" + key + "' module doesn't exist in either '" + options.basedir + "' or '" + options.libdir + "'");
                }
                try {
                    cached = JSON.parse(readfile(filename + "-cached", "utf-8"));
                } catch (_$rapyd$_Exception) {
                    cached = null;
                }
                srchash = sha1sum(src_code);
                if (cached && cached["version"] === COMPILER_VERSION && cached["signature"] === srchash) {
                    var _$rapyd$_Iter28 = _$rapyd$_Iterable(cached.imported_module_ids);
                    for (var _$rapyd$_Index28 = 0; _$rapyd$_Index28 < _$rapyd$_Iter28.length; _$rapyd$_Index28++) {
                        ikey = _$rapyd$_Iter28[_$rapyd$_Index28];
                        do_import(ikey);
                    }
                    IMPORTED[key] = {
                        "is_cached": true,
                        "classes": cached["classes"],
                        "outputs": cached["outputs"],
                        "module_id": key,
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
                        "IMPORTED": IMPORTED,
                        "IMPORTING": IMPORTING
                    });
                }
                IMPORTED[key].srchash = srchash;
                if (len(package_module_id) > 0) {
                    IMPORTED[package_module_id].submodules.push(key);
                }
                var _$rapyd$_Iter29 = _$rapyd$_Iterable(Object.keys(IMPORTED[key].baselib));
                for (var _$rapyd$_Index29 = 0; _$rapyd$_Index29 < _$rapyd$_Iter29.length; _$rapyd$_Index29++) {
                    bitem = _$rapyd$_Iter29[_$rapyd$_Index29];
                    baselib_items[bitem] = true;
                }
                imported_module_ids.push(key);
            }
            import_ = function(from_import) {
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
                        "body": function() {
                            return IMPORTED[key];
                        }
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
                var _$rapyd$_Iter30 = _$rapyd$_Iterable(ans["imports"]);
                for (var _$rapyd$_Index30 = 0; _$rapyd$_Index30 < _$rapyd$_Iter30.length; _$rapyd$_Index30++) {
                    imp = _$rapyd$_Iter30[_$rapyd$_Index30];
                    do_import(imp.key);
                    classes = IMPORTED[key].classes;
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
                        var _$rapyd$_Iter31 = _$rapyd$_Iterable(IMPORTED[key].exports);
                        for (var _$rapyd$_Index31 = 0; _$rapyd$_Index31 < _$rapyd$_Iter31.length; _$rapyd$_Index31++) {
                            symdef = _$rapyd$_Iter31[_$rapyd$_Index31];
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
                        var _$rapyd$_Iter32 = _$rapyd$_Iterable(argnames);
                        for (var _$rapyd$_Index32 = 0; _$rapyd$_Index32 < _$rapyd$_Iter32.length; _$rapyd$_Index32++) {
                            argvar = _$rapyd$_Iter32[_$rapyd$_Index32];
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
                        var _$rapyd$_Iter33 = _$rapyd$_Iterable(Object.keys(classes));
                        for (var _$rapyd$_Index33 = 0; _$rapyd$_Index33 < _$rapyd$_Iter33.length; _$rapyd$_Index33++) {
                            cname = _$rapyd$_Iter33[_$rapyd$_Index33];
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
            class_ = function() {
                var name, externaldecorator, class_details, definition, stmt, class_var_names, visitor;
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
                    "parent": function() {
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
                    }.call(this),
                    "localvars": _$rapyd$_list_decorate([]),
                    "static": class_details.static,
                    "external": externaldecorator,
                    "bound": class_details.bound,
                    "statements": _$rapyd$_list_decorate([]),
                    "decorators": function() {
                        var d;
                        d = _$rapyd$_list_decorate([]);
                        S.decorators.forEach(function(decorator) {
                            d.push(new AST_Decorator({
                                "expression": decorator
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
                        S.labels = _$rapyd$_list_decorate([]);
                        a = block_();
                        S.in_function -= 1;
                        S.classes.pop();
                        S.in_class.pop();
                        S.in_loop = loop;
                        S.labels = labels;
                        return a;
                    }.call(this, S.in_loop, S.labels)
                });
                var _$rapyd$_Iter34 = _$rapyd$_Iterable(definition.body);
                for (var _$rapyd$_Index34 = 0; _$rapyd$_Index34 < _$rapyd$_Iter34.length; _$rapyd$_Index34++) {
                    stmt = _$rapyd$_Iter34[_$rapyd$_Index34];
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
                var _$rapyd$_Iter35 = _$rapyd$_Iterable(definition.body);
                for (var _$rapyd$_Index35 = 0; _$rapyd$_Index35 < _$rapyd$_Iter35.length; _$rapyd$_Index35++) {
                    stmt = _$rapyd$_Iter35[_$rapyd$_Index35];
                    if (!(stmt instanceof AST_Class)) {
                        stmt.walk(visitor);
                        definition.statements.push(stmt);
                    }
                }
                return definition;
            };
            function_ = function(in_class, ctor) {
                var is_accessor, name, staticmethod, property_getter, property_setter, _$rapyd$_chain_assign_temp, staticloc, is_generator, definition, assignments, j, i, nonlocals;
                is_accessor = ctor === AST_Accessor;
                name = (is_("name")) ? as_symbol((in_class) ? AST_SymbolDefun : (is_accessor) ? AST_SymbolAccessor : AST_SymbolLambda) : (is_accessor && (is_("string") || is_("num"))) ? as_atom_node() : null;
                if (in_class && !name) {
                    unexpected();
                }
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
                if (!ctor) {
                    ctor = (in_class) ? AST_Method : AST_Function;
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
                        return a;
                    }.call(this, []),
                    "localvars": _$rapyd$_list_decorate([]),
                    "decorators": function() {
                        var d;
                        d = [];
                        S.decorators.forEach(function(decorator) {
                            d.push(new AST_Decorator({
                                "expression": decorator
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
                        S.labels = _$rapyd$_list_decorate([]);
                        a = block_();
                        S.in_function -= 1;
                        is_generator.push(bool(S.functions.pop().is_generator));
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
                    definition.is_getter = property_getter;
                    definition.is_setter = property_setter;
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
                nonlocals = (function() {
                    var _$rapyd$_Iter = _$rapyd$_Iterable(nonlocals), _$rapyd$_Result = _$rapyd$_set(), name;
                    for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                        name = _$rapyd$_Iter[_$rapyd$_Index];
                        _$rapyd$_Result.add(name);
                    }
                    return _$rapyd$_Result;
                })();
                definition.localvars = definition.localvars.filter(function(v) {
                    return !nonlocals.has(v.name);
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
            }
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
                    args = func_call_list();
                    S.in_parenthesized_expr = false;
                } else {
                    args = func_call_list(true);
                }
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
            }
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
            }
            function as_atom_node() {
                var ret;
                ret = token_as_atom_node();
                next();
                return ret;
            }
            expr_atom = function(allow_calls) {
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
                    var _$rapyd$_Iter36 = _$rapyd$_Iterable(a);
                    for (var _$rapyd$_Index36 = 0; _$rapyd$_Index36 < _$rapyd$_Iter36.length; _$rapyd$_Index36++) {
                        arg = _$rapyd$_Iter36[_$rapyd$_Index36];
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
            }
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
                while (!is_("punc", ")") && !is_("eof")) {
                    if (!first) {
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
            }
            array_ = embed_tokens(function() {
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
            });
            object_ = embed_tokens(function() {
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
                    if (is_("punc", ",") || is_("punc", "}")) {
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
            });
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
            }
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
            }
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
                return new ((name === "this") ? AST_This : ttype)({
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
                sym = new ((name === "this") ? AST_This : type)({
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
                var start, is_py_sub, slice_bounds, is_slice, assignment, ret, c, funcname, tmp_, args;
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
                                slice_bounds[slice_bounds.length-2] = new AST_Undefined();
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
            maybe_unary = function(allow_calls) {
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
            function make_unary(ctor, op, expr) {
                return new ctor({
                    "operator": op,
                    "expression": expr
                });
            }
            expr_op = function(left, min_prec, no_in) {
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
            function create_assign(data) {
                if (data.right && data.right instanceof AST_Seq && (data.right.car instanceof AST_Assign || data.right.cdr instanceof AST_Assign) && data.operator !== "=") {
                    token_error(data.start, "Invalid assignment operator for chained assignment: " + data.operator);
                }
                return new AST_Assign(data);
            }
            maybe_assign = function(no_in, only_plain_assignment) {
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
                var start, body, first_token, element, shebang, end, toplevel, seen_exports;
                start = S.token;
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
                }
                scan_for_local_vars(toplevel.body).forEach(function(item) {
                    add_item(item, true);
                });
                scan_for_top_level_callables(toplevel.body).forEach(add_item);
                toplevel.filename = options.filename;
                toplevel.submodules = _$rapyd$_list_decorate([]);
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

        _$rapyd$_modules["parse"]["BASELIB_ITEMS"] = BASELIB_ITEMS;

        _$rapyd$_modules["parse"]["BASELIB_FUNCS"] = BASELIB_FUNCS;

        _$rapyd$_modules["parse"]["BASELIB_ITERTOOLS"] = BASELIB_ITERTOOLS;

        _$rapyd$_modules["parse"]["NATIVE_CLASSES"] = NATIVE_CLASSES;

        _$rapyd$_modules["parse"]["ERROR_CLASSES"] = ERROR_CLASSES;

        _$rapyd$_modules["parse"]["COMMON_STATIC"] = COMMON_STATIC;

        _$rapyd$_modules["parse"]["UNARY_PREFIX"] = UNARY_PREFIX;

        _$rapyd$_modules["parse"]["ASSIGNMENT"] = ASSIGNMENT;

        _$rapyd$_modules["parse"]["PRECEDENCE"] = PRECEDENCE;

        _$rapyd$_modules["parse"]["STATEMENTS_WITH_LABELS"] = STATEMENTS_WITH_LABELS;

        _$rapyd$_modules["parse"]["ATOMIC_START_TOKEN"] = ATOMIC_START_TOKEN;

        _$rapyd$_modules["parse"]["compile_time_decorators"] = compile_time_decorators;

        _$rapyd$_modules["parse"]["has_simple_decorator"] = has_simple_decorator;

        _$rapyd$_modules["parse"]["has_setter_decorator"] = has_setter_decorator;

        _$rapyd$_modules["parse"]["parse"] = parse;
    })();

    (function(){
        var __name__ = "output";
        var DANGEROUS, codegen;
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
        var AST_Catch = _$rapyd$_modules["ast"].AST_Catch;
        var AST_Class = _$rapyd$_modules["ast"].AST_Class;
        var AST_ClassCall = _$rapyd$_modules["ast"].AST_ClassCall;
        var AST_Conditional = _$rapyd$_modules["ast"].AST_Conditional;
        var AST_Const = _$rapyd$_modules["ast"].AST_Const;
        var AST_Constant = _$rapyd$_modules["ast"].AST_Constant;
        var AST_Continue = _$rapyd$_modules["ast"].AST_Continue;
        var AST_Debugger = _$rapyd$_modules["ast"].AST_Debugger;
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
        var AST_GeneratorComprehension = _$rapyd$_modules["ast"].AST_GeneratorComprehension;
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
        var AST_Set = _$rapyd$_modules["ast"].AST_Set;
        var AST_Seq = _$rapyd$_modules["ast"].AST_Seq;
        var AST_SimpleStatement = _$rapyd$_modules["ast"].AST_SimpleStatement;
        var AST_Splice = _$rapyd$_modules["ast"].AST_Splice;
        var AST_Statement = _$rapyd$_modules["ast"].AST_Statement;
        var AST_StatementWithBody = _$rapyd$_modules["ast"].AST_StatementWithBody;
        var AST_String = _$rapyd$_modules["ast"].AST_String;
        var AST_Sub = _$rapyd$_modules["ast"].AST_Sub;
        var AST_ItemAccess = _$rapyd$_modules["ast"].AST_ItemAccess;
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
        
        DANGEROUS = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        function OutputStream(options) {
            var indentation, current_col, current_line, current_pos, OUTPUT, IMPORTED, might_need_space, might_need_semicolon, last, requireSemicolonChars, space, indent, with_indent, newline, semicolon, add_mapping, stack;
            options = defaults(options, {
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
            function encode_string(str_) {
                return JSON.stringify(str_).replace(DANGEROUS, function(a) {
                    return "\\u" + a.charCodeAt(0).toString(16);
                });
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
            space = (options.beautify) ? function() {
                print_(" ");
            } : function() {
                might_need_space = true;
            };
            indent = (options.beautify) ? function(half) {
                if (options.beautify) {
                    print_(make_indent((half) ? .5 : 0));
                }
            } : noop;
            with_indent = (options.beautify) ? function(col, cont) {
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
            function set_indentation(val) {
                if (options.beautify) {
                    indentation = val;
                }
            }
            newline = (options.beautify) ? function() {
                print_("\n");
            } : noop;
            semicolon = (options.beautify) ? function() {
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
            add_mapping = (options.source_map) ? function(token, name) {
                try {
                    if (token) {
                        options.source_map.add(token.file || "?", current_line, current_col, token.line, token.col, (!name && token.type === "name") ? token.value : name);
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
                var is_func, v, ckey;
                indent();
                is_func = key.substr(key.length - 2) === "()";
                v = (options.js_version > 5) ? "const" : "var";
                if (is_func) {
                    ckey = key.substr(0, key.length - 2);
                    spaced(v, ckey, "=", "(");
                }
                print_(options.baselib[key]);
                if (is_func) {
                    print_(")()");
                }
                semicolon();
                newline();
            }
            function dump_yield() {
                var code, ci;
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
                            x = _$rapyd$_Iter[_$rapyd$_Index];
                            _$rapyd$_Result.push(ci + x);
                        }
                        _$rapyd$_Result = _$rapyd$_list_constructor(_$rapyd$_Result);
                        return _$rapyd$_Result;
                    })().join("\n");
                }
                print_(code + "(_$rapyd$_regenerator)");
                end_statement();
            }
            function prologue(module_) {
                var v, baselib_items, deps, lib;
                if (options.omit_baselib) {
                    return;
                }
                indent();
                v = (options.js_version > 5) ? "const" : "var";
                [print_(v), space()];
                spaced.apply(null, "_$rapyd$_iterator_symbol = (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") ? Symbol.iterator : \"iterator-Symbol-5d0927e5554349048cf0e3762a228256\"".split(" "));
                end_statement();
                [indent(), print_(v), space()];
                spaced.apply(null, "_$rapyd$_kwargs_symbol = (typeof Symbol === \"function\") ? Symbol(\"kwargs-object\") : \"kwargs-object-Symbol-5d0927e5554349048cf0e3762a228256\"".split(" "));
                end_statement();
                [indent(), spaced("var", "_$rapyd$_cond_temp"), end_statement()];
                baselib_items = (function() {
                    var _$rapyd$_Iter = _$rapyd$_Iterable(module_.baselib), _$rapyd$_Result = {}, k;
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
                deps = options.baselib["#dependencies#"];
                var _$rapyd$_Iter37 = _$rapyd$_Iterable(baselib_items);
                for (var _$rapyd$_Index37 = 0; _$rapyd$_Index37 < _$rapyd$_Iter37.length; _$rapyd$_Index37++) {
                    lib = _$rapyd$_Iter37[_$rapyd$_Index37];
                    if (deps.hasOwnProperty(lib)) {
                        Object.keys(deps[lib]).forEach(function(k) {
                            baselib_items[k] = true;
                        });
                    }
                }
                var _$rapyd$_Iter38 = _$rapyd$_Iterable(baselib_items);
                for (var _$rapyd$_Index38 = 0; _$rapyd$_Index38 < _$rapyd$_Iter38.length; _$rapyd$_Index38++) {
                    lib = _$rapyd$_Iter38[_$rapyd$_Index38];
                    if (options.js_version >= 6 && (lib === "iterable" || lib === "yield")) {
                        continue;
                    }
                    if (lib === "yield") {
                        dump_yield();
                    } else {
                        dump_baselib(lib);
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
            stack = _$rapyd$_list_decorate([]);
            return {
                "index_counter": 0,
                "with_counter": 0,
                "options": options,
                "get": get,
                "toString": get,
                "indent": indent,
                "indentation": function() {
                    return indentation;
                },
                "set_indentation": set_indentation,
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
                            comments = (comments || _$rapyd$_list_decorate([])).concat(self.value.start.comments_before);
                            self.value.start.comments_before = _$rapyd$_list_decorate([]);
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
                if (methods) {
                    var _$rapyd$_Iter39 = _$rapyd$_Iterable(methods);
                    for (var _$rapyd$_Index39 = 0; _$rapyd$_Index39 < _$rapyd$_Iter39.length; _$rapyd$_Index39++) {
                        arg = _$rapyd$_Iter39[_$rapyd$_Index39];
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
            }
            function write_imports(module, output) {
                var imports, import_id, nonlocalvars, name, module_;
                imports = _$rapyd$_list_decorate([]);
                var _$rapyd$_Iter40 = _$rapyd$_Iterable(Object.keys(module.imports));
                for (var _$rapyd$_Index40 = 0; _$rapyd$_Index40 < _$rapyd$_Iter40.length; _$rapyd$_Index40++) {
                    import_id = _$rapyd$_Iter40[_$rapyd$_Index40];
                    imports.push(module.imports[import_id]);
                }
                imports.sort(function(a, b) {
                    var _$rapyd$_unpack;
                    _$rapyd$_unpack = [a.import_order, b.import_order];
                    a = _$rapyd$_unpack[0];
                    b = _$rapyd$_unpack[1];
                    return (a < b) ? -1 : (a > b) ? 1 : 0;
                });
                if (imports.length > 1) {
                    output.indent();
                    output.print("var _$rapyd$_modules = {};");
                    output.newline();
                }
                nonlocalvars = {};
                var _$rapyd$_Iter41 = _$rapyd$_Iterable(imports);
                for (var _$rapyd$_Index41 = 0; _$rapyd$_Index41 < _$rapyd$_Iter41.length; _$rapyd$_Index41++) {
                    module_ = _$rapyd$_Iter41[_$rapyd$_Index41];
                    var _$rapyd$_Iter42 = _$rapyd$_Iterable(module_.nonlocalvars);
                    for (var _$rapyd$_Index42 = 0; _$rapyd$_Index42 < _$rapyd$_Iter42.length; _$rapyd$_Index42++) {
                        name = _$rapyd$_Iter42[_$rapyd$_Index42];
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
                var _$rapyd$_Iter43 = _$rapyd$_Iterable(imports);
                for (var _$rapyd$_Index43 = 0; _$rapyd$_Index43 < _$rapyd$_Iter43.length; _$rapyd$_Index43++) {
                    module_ = _$rapyd$_Iter43[_$rapyd$_Index43];
                    if (module_.module_id !== "__main__") {
                        output.indent();
                        output.print("_$rapyd$_modules[\"");
                        output.print(module_.module_id);
                        output.print("\"] = {}");
                        output.semicolon();
                        output.newline();
                    }
                }
                var _$rapyd$_Iter44 = _$rapyd$_Iterable(imports);
                for (var _$rapyd$_Index44 = 0; _$rapyd$_Index44 < _$rapyd$_Iter44.length; _$rapyd$_Index44++) {
                    module_ = _$rapyd$_Iter44[_$rapyd$_Index44];
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
                var offset, a, kw, i, _$rapyd$_unpack, c, arg, dname, nargs;
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
                            var _$rapyd$_Iter45 = _$rapyd$_Iterable(enumerate(a));
                            for (var _$rapyd$_Index45 = 0; _$rapyd$_Index45 < _$rapyd$_Iter45.length; _$rapyd$_Index45++) {
                                _$rapyd$_unpack = _$rapyd$_Iter45[_$rapyd$_Index45];
                                c = _$rapyd$_unpack[0];
                                arg = _$rapyd$_unpack[1];
                                i = c - offset;
                                if (i >= 0) {
                                    output.indent();
                                    output.print("var");
                                    output.space();
                                    output.assign(arg);
                                    if (Object.prototype.hasOwnProperty.call(a.defaults, arg.name)) {
                                        output.spaced("(arguments[" + i + "]", "===", "undefined", "||", "(", i, "===", "arguments.length-1", "&&", "typeof", kw, "===", "\"object\"", "&&", kw, "[_$rapyd$_kwargs_symbol]", "===", "true))", "?", "");
                                        output.with_parens(function() {
                                            a.defaults[arg.name].print(output);
                                        });
                                        output.space();
                                        output.print(":");
                                        output.space();
                                    } else {
                                        output.spaced("(", i, "===", "arguments.length-1", "&&", "typeof", kw, "===", "\"object\"", "&&", kw, "[_$rapyd$_kwargs_symbol]", "===", "true)", "?", "undefined", ":", "");
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
                                output.spaced("if", "(typeof", kw, "!==", "\"object\"", "||", kw, "[_$rapyd$_kwargs_symbol]", "!==", "true)", kw, "=", "{}");
                                output.end_statement();
                                if (a.has_defaults) {
                                    var _$rapyd$_Iter46 = _$rapyd$_Iterable(Object.keys(a.defaults));
                                    for (var _$rapyd$_Index46 = 0; _$rapyd$_Index46 < _$rapyd$_Iter46.length; _$rapyd$_Index46++) {
                                        dname = _$rapyd$_Iter46[_$rapyd$_Index46];
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
                            if (a.starargs !== undefined) {
                                nargs = a.length - offset;
                                output.indent();
                                output.spaced("var", a.starargs.name, "=", "Array.prototype.slice.call(arguments,", nargs, ")");
                                output.end_statement();
                                output.indent();
                                output.spaced("if", "(typeof", kw, "===", "\"object\"", "&&", kw, "[_$rapyd$_kwargs_symbol]", "===", "true)", a.starargs.name, ".pop()");
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
                var _$rapyd$_Iter47 = _$rapyd$_Iterable(exports);
                for (var _$rapyd$_Index47 = 0; _$rapyd$_Index47 < _$rapyd$_Iter47.length; _$rapyd$_Index47++) {
                    symbol = _$rapyd$_Iter47[_$rapyd$_Index47];
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
                var _$rapyd$_Iter48 = _$rapyd$_Iterable(submodules);
                for (var _$rapyd$_Index48 = 0; _$rapyd$_Index48 < _$rapyd$_Iter48.length; _$rapyd$_Index48++) {
                    sub_module_id = _$rapyd$_Iter48[_$rapyd$_Index48];
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
                    output.print("_$rapyd$_unpack");
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
                if (output.option("private_scope") && is_main) {
                    output.with_parens(function() {
                        output.print("function()");
                        output.with_block(function() {
                            output.indent();
                            output.print("\"use strict;\"");
                            output.end_statement();
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
                                    "exports": _$rapyd$_list_decorate([]),
                                    "outputs": {}
                                };
                                var _$rapyd$_Iter49 = _$rapyd$_Iterable(Object.keys(self.classes));
                                for (var _$rapyd$_Index49 = 0; _$rapyd$_Index49 < _$rapyd$_Iter49.length; _$rapyd$_Index49++) {
                                    cname = _$rapyd$_Iter49[_$rapyd$_Index49];
                                    cobj = self.classes[cname];
                                    cached.classes[cname] = {
                                        "name": {
                                            "name": cobj.name.name
                                        },
                                        "static": cobj.static,
                                        "bound": cobj.bound
                                    };
                                }
                                var _$rapyd$_Iter50 = _$rapyd$_Iterable(self.exports);
                                for (var _$rapyd$_Index50 = 0; _$rapyd$_Index50 < _$rapyd$_Iter50.length; _$rapyd$_Index50++) {
                                    symdef = _$rapyd$_Iter50[_$rapyd$_Index50];
                                    cached.exports.push({
                                        "name": symdef.name
                                    });
                                }
                                var _$rapyd$_Iter51 = _$rapyd$_Iterable(_$rapyd$_list_decorate([ true, false ]));
                                for (var _$rapyd$_Index51 = 0; _$rapyd$_Index51 < _$rapyd$_Iter51.length; _$rapyd$_Index51++) {
                                    beautify = _$rapyd$_Iter51[_$rapyd$_Index51];
                                    var _$rapyd$_Iter52 = _$rapyd$_Iterable(_$rapyd$_list_decorate([ true, false ]));
                                    for (var _$rapyd$_Index52 = 0; _$rapyd$_Index52 < _$rapyd$_Iter52.length; _$rapyd$_Index52++) {
                                        auto_bind = _$rapyd$_Iter52[_$rapyd$_Index52];
                                        var _$rapyd$_Iter53 = _$rapyd$_Iterable(_$rapyd$_list_decorate([ 5, 6 ]));
                                        for (var _$rapyd$_Index53 = 0; _$rapyd$_Index53 < _$rapyd$_Iter53.length; _$rapyd$_Index53++) {
                                            js_version = _$rapyd$_Iter53[_$rapyd$_Index53];
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
                var _$rapyd$_Iter54 = _$rapyd$_Iterable(container.imports);
                for (var _$rapyd$_Index54 = 0; _$rapyd$_Index54 < _$rapyd$_Iter54.length; _$rapyd$_Index54++) {
                    self = _$rapyd$_Iter54[_$rapyd$_Index54];
                    output.import(self.module);
                    if (self.argnames) {
                        var _$rapyd$_Iter55 = _$rapyd$_Iterable(self.argnames);
                        for (var _$rapyd$_Index55 = 0; _$rapyd$_Index55 < _$rapyd$_Iter55.length; _$rapyd$_Index55++) {
                            argname = _$rapyd$_Iter55[_$rapyd$_Index55];
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
                        (start.print) ? start.print(output) : output.print(start);
                        output.semicolon();
                        output.space();
                        self.init.print(output);
                        output.space();
                        (increment instanceof AST_Unary) ? output.print(">") : output.print("<");
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
                        add_to_result = function(output) {
                            output.indent();
                            output.print("_$rapyd$_Result.set");
                            output.with_parens(function() {
                                self.statement.print(output);
                                [output.space(), output.print(","), output.space()];
                                output.with_parens(function() {
                                    if (self.value_statement.TYPE === "Seq") {
                                        output.with_square(function() {
                                            self.value_statement.print(output);
                                        });
                                    } else {
                                        self.value_statement.print(output);
                                    }
                                });
                            });
                            output.end_statement();
                        };
                    } else {
                        add_to_result = function(output) {
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
                    }
                } else {
                    push_func = "_$rapyd$_Result." + ((self.TYPE === "ListComprehension") ? "push" : "add");
                    if (is_generator) {
                        push_func = "yield ";
                    }
                    add_to_result = function(output) {
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
                        var body_out, previous_indentation, transpiled, ci;
                        body_out = output;
                        if (is_generator) {
                            if (es5) {
                                body_out = OutputStream({
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
                            body_out.with_parens(function() {
                                self.object.print(body_out);
                            });
                        } else {
                            self.object.print(body_out);
                        }
                        if (result_obj) {
                            body_out.comma();
                            body_out.assign("_$rapyd$_Result");
                            body_out.print(result_obj);
                        }
                        if (self.init instanceof AST_Array) {
                            self.init.elements.forEach(function(i) {
                                body_out.comma();
                                i.print(body_out);
                            });
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
                        body_out.with_parens(function() {
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
                        });
                        body_out.space();
                        body_out.with_block(function() {
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
                                body_out.with_parens(function() {
                                    self.condition.print(body_out);
                                });
                                body_out.space();
                                body_out.with_block(function() {
                                    add_to_result(body_out);
                                });
                                body_out.newline();
                            } else {
                                add_to_result(body_out);
                            }
                        });
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
                    });
                });
                output.print("()");
            });
            DEFPRINT(AST_With, function(self, output) {
                var exits, clause_name, clause;
                exits = [];
                [output.assign("_$rapyd$_with_exception"), output.print("undefined"), output.end_statement()];
                var _$rapyd$_Iter56 = _$rapyd$_Iterable(self.clauses);
                for (var _$rapyd$_Index56 = 0; _$rapyd$_Index56 < _$rapyd$_Iter56.length; _$rapyd$_Index56++) {
                    clause = _$rapyd$_Iter56[_$rapyd$_Index56];
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
                output.with_block(function() {
                    output.indent();
                    self._do_print_body(output);
                    output.newline();
                });
                [output.space(), output.print("catch(e)")];
                output.with_block(function() {
                    [output.indent(), output.assign("_$rapyd$_with_exception"), output.print("e"), output.end_statement()];
                });
                [output.newline(), output.indent(), output.spaced("if", "(_$rapyd$_with_exception", "===", "undefined)")];
                output.with_block(function() {
                    var clause;
                    var _$rapyd$_Iter57 = _$rapyd$_Iterable(exits);
                    for (var _$rapyd$_Index57 = 0; _$rapyd$_Index57 < _$rapyd$_Iter57.length; _$rapyd$_Index57++) {
                        clause = _$rapyd$_Iter57[_$rapyd$_Index57];
                        [output.indent(), output.print(clause + ".__exit__()"), output.end_statement()];
                    }
                });
                [output.space(), output.print("else"), output.space()];
                output.with_block(function() {
                    var clause;
                    [output.indent(), output.assign("_$rapyd$_with_suppress"), output.print("false"), 
                    output.end_statement()];
                    var _$rapyd$_Iter58 = _$rapyd$_Iterable(exits);
                    for (var _$rapyd$_Index58 = 0; _$rapyd$_Index58 < _$rapyd$_Iter58.length; _$rapyd$_Index58++) {
                        clause = _$rapyd$_Iter58[_$rapyd$_Index58];
                        output.indent();
                        output.spaced("_$rapyd$_with_suppress", "|=", "_$rapyd$_bool(" + clause + ".__exit__(_$rapyd$_with_exception.constructor,", "_$rapyd$_with_exception,", "_$rapyd$_with_exception.stack))");
                        output.end_statement();
                    }
                    [output.indent(), output.spaced("if", "(!_$rapyd$_with_suppress)", "throw _$rapyd$_with_exception"), 
                    output.end_statement()];
                });
            });
            function decorate(decorators, output, func) {
                var pos, wrap;
                pos = 0;
                wrap = function() {
                    if (pos < decorators.length) {
                        decorators[pos].expression.print(output);
                        pos += 1;
                        output.with_parens(function() {
                            wrap();
                        });
                    } else {
                        func();
                    }
                };
                wrap();
            }
            function function_args(argnames, output, strip_first) {
                output.with_parens(function() {
                    if (argnames && argnames.length && (argnames.is_simple_func === true || argnames.is_simple_func === undefined)) {
                        ((strip_first) ? argnames.slice(1) : argnames).forEach(function(arg, i) {
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
                            output.indent();
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
                var self, class_def, define_method, properties, name, m;
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
                            output.assign(".prototype" + ((method) ? "." + method : ""));
                        }
                    }
                };
                define_method = function(stmt, is_property) {
                    var name, strip_first;
                    name = stmt.name.name;
                    if (!is_property) {
                        class_def(name);
                    }
                    strip_first = self.static.indexOf(name) === -1;
                    if (stmt.decorators && stmt.decorators.length) {
                        decorate(stmt.decorators, output, function() {
                            function_definition(stmt, output, false, strip_first);
                        });
                    } else {
                        function_definition(stmt, output, false, strip_first);
                    }
                    if (!is_property) {
                        output.semicolon();
                        output.newline();
                    }
                };
                properties = {};
                var _$rapyd$_Iter59 = _$rapyd$_Iterable(self.body);
                for (var _$rapyd$_Index59 = 0; _$rapyd$_Index59 < _$rapyd$_Iter59.length; _$rapyd$_Index59++) {
                    m = _$rapyd$_Iter59[_$rapyd$_Index59];
                    if (m instanceof AST_Method) {
                        if (m.is_getter || m.is_setter) {
                            name = m.name.name;
                            if (!Object.prototype.hasOwnProperty.call(properties, name)) {
                                properties[name] = {};
                            }
                            if (m.is_getter) {
                                properties[name].getter = m;
                            } else {
                                properties[name].setter = m;
                            }
                        }
                    }
                }
                function internalsub() {
                    output.print("function");
                    output.space();
                    self.name.print(output);
                    output.print("()");
                    output.space();
                    output.with_block(function() {
                        var cname;
                        if (self.init || self.parent) {
                            bind_methods(self.bound, output);
                            output.indent();
                            cname = (self.name) ? self.name : self.parent;
                            cname.print(output);
                            output.print(".prototype.__init__.apply");
                            output.with_parens(function() {
                                output.print("this");
                                output.comma();
                                output.print("arguments");
                            });
                            output.semicolon();
                            output.newline();
                        } else {
                            bind_methods(self.bound, output);
                        }
                        if (len(properties)) {
                            [output.indent(), output.print("Object.defineProperties")];
                            output.with_parens(function() {
                                [output.print("this"), output.comma(), output.space(), output.with_block(function() {
                                    var prop, name;
                                    var _$rapyd$_Iter60 = _$rapyd$_Iterable(properties);
                                    for (var _$rapyd$_Index60 = 0; _$rapyd$_Index60 < _$rapyd$_Iter60.length; _$rapyd$_Index60++) {
                                        name = _$rapyd$_Iter60[_$rapyd$_Index60];
                                        prop = properties[name];
                                        [output.indent(), output.print(JSON.stringify(name) + ":"), output.space()];
                                        output.with_block(function() {
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
                                        });
                                        [output.comma(), output.newline()];
                                    }
                                })];
                            });
                            output.end_statement();
                        }
                    });
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
                        if (stmt.is_getter || stmt.is_setter) {
                            return;
                        }
                        define_method(stmt);
                        if (stmt.name.name === "__iter__") {
                            class_def("_$rapyd$_iterator_symbol", true);
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
                self._do_print(output, "yield" + ((self.is_yield_from) ? "*" : ""));
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
                var has_kwarg_items, has_kwarg_formals, has_kwargs, output_kwargs, obj;
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
                    self.expression.print(output);
                }
                if (self instanceof AST_New && no_constructor_parens(self, output)) {
                    return;
                }
                has_kwarg_items = self.args.kwarg_items && self.args.kwarg_items.length;
                has_kwarg_formals = self.args.kwargs && self.args.kwargs.length;
                has_kwargs = has_kwarg_items || has_kwarg_formals;
                output_kwargs = function() {
                    output.print("_$rapyd$_desugar_kwargs(");
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
                    if (self instanceof AST_New) {
                        obj = "_$rapyd$_new_temp";
                    } else {
                        obj = (self.expression.expression) ? self.expression.expression.name : "this";
                    }
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
                if (self.args.starargs) {
                    output.with_parens(function() {
                        output.print("function()");
                        output.with_block(function() {
                            output.indent();
                            output.print("var _$rapyd$_new_temp = Object.create(");
                            self.expression.print(output);
                            output.print(")");
                            [output.end_statement(), output.indent()];
                            AST_BaseCall.prototype._codegen(self, output);
                            [output.end_statement(), output.indent()];
                            output.print("return _$rapyd$_new_temp");
                            output.end_statement();
                        });
                    });
                    output.print("()");
                } else {
                    output.print("new");
                    output.space();
                    AST_BaseCall.prototype._codegen(self, output);
                }
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
            DEFPRINT(AST_ItemAccess, function(self, output) {
                self.expression.print(output);
                output.print(".__" + ((self.assignment) ? "setitem" : "getitem") + "__");
                output.with_parens(function() {
                    self.property.print(output);
                    if (self.assignment) {
                        output.comma();
                        self.assignment.print(output);
                    }
                });
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
            function write_instanceof(left, right, output) {
                function single(left, right) {
                    if (right.name === "Array" || right.name === "list") {
                        output.print("Array.isArray");
                        output.with_parens(function() {
                            left.print(output);
                        });
                    } else {
                        output.spaced(left, "instanceof", right);
                    }
                }
                if (right instanceof AST_Seq) {
                    right = new AST_Array({
                        "elements": right.to_array()
                    });
                }
                if (right instanceof AST_Array) {
                    output.with_parens(function() {
                        right.elements.forEach(function(right, i, arr) {
                            single(left, right);
                            if (arr.length > 1 && i < arr.length - 1) {
                                [output.space(), output.print("||"), output.space()];
                            }
                        });
                    });
                } else {
                    single(left, right);
                }
            }
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
                            output.assign("_$rapyd$_cond_temp");
                            self.left.right.print(output);
                            leftvar = "_$rapyd$_cond_temp";
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
                    write_instanceof(self.left, self.right, output);
                } else {
                    output.spaced(self.left, self.operator, self.right);
                }
            });
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
                    output.with_parens(function() {
                        self.right.print(output);
                    });
                } else {
                    self.right.print(output);
                }
                if (left instanceof AST_Array) {
                    output.semicolon();
                    output.newline();
                    unpack_tuple(flat, output, true);
                }
            }
            DEFPRINT(AST_Assign, function(self, output) {
                var _$rapyd$_unpack, left_hand_sides, rhs, temp_rhs, lhs;
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
                    var _$rapyd$_Iter61 = _$rapyd$_Iterable(left_hand_sides);
                    for (var _$rapyd$_Index61 = 0; _$rapyd$_Index61 < _$rapyd$_Iter61.length; _$rapyd$_Index61++) {
                        lhs = _$rapyd$_Iter61[_$rapyd$_Index61];
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
            });
            function write_conditional(output, condition, consequent, alternative) {
                output.with_parens(function() {
                    condition.print(output);
                });
                output.space();
                output.print("?");
                output.space();
                consequent.print(output);
                output.space();
                output.colon();
                alternative.print(output);
            }
            DEFPRINT(AST_Conditional, function(self, output) {
                write_conditional(output, self.condition, self.consequent, self.alternative);
            });
            DEFPRINT(AST_Array, function(self, output) {
                output.print("_$rapyd$_list_decorate");
                output.with_parens(function() {
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
            });
            function write_obj_literal(self, output) {
                output.with_parens(function() {
                    output.print("function()");
                    output.with_block(function() {
                        output.indent();
                        if (self.is_pydict) {
                            output.spaced.apply(output, "var _$rapyd$_d = _$rapyd$_dict()".split(" "));
                        } else {
                            output.spaced.apply(output, "var _$rapyd$_d = {}".split(" "));
                        }
                        output.end_statement();
                        self.properties.forEach(function(prop, i) {
                            output.indent();
                            if (self.is_pydict) {
                                output.print("_$rapyd$_d.set");
                                output.with_parens(function() {
                                    prop.key.print(output);
                                    [output.print(","), output.space()];
                                    prop.value.print(output);
                                });
                            } else {
                                output.print("_$rapyd$_d");
                                output.with_square(function() {
                                    prop.key.print(output);
                                });
                                [output.space(), output.print("="), output.space()];
                                prop.value.print(output);
                            }
                            output.end_statement();
                        });
                        output.indent();
                        output.spaced("return", "_$rapyd$_d");
                        output.end_statement();
                    });
                });
                output.print("()");
            }
            DEFPRINT(AST_ExpressiveObject, write_obj_literal);
            DEFPRINT(AST_Object, function(self, output) {
                if (self.is_pydict) {
                    if (self.properties.length > 0) {
                        write_obj_literal(self, output);
                    } else {
                        output.print("_$rapyd$_dict()");
                    }
                } else {
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
                }
            });
            DEFPRINT(AST_ObjectKeyVal, function(self, output) {
                self.key.print(output);
                output.colon();
                self.value.print(output);
            });
            DEFPRINT(AST_Set, function(self, output) {
                if (self.items.length === 0) {
                    output.print("_$rapyd$_set()");
                    return;
                }
                output.with_parens(function() {
                    output.print("function()");
                    output.with_block(function() {
                        output.indent();
                        output.spaced.apply(output, "var s = _$rapyd$_set()".split(" "));
                        output.end_statement();
                        self.items.forEach(function(item, i) {
                            output.indent();
                            output.print("s.jsset.add");
                            output.with_parens(function() {
                                item.value.print(output);
                            });
                            output.end_statement();
                        });
                        output.indent();
                        output.spaced("return", "s");
                        output.end_statement();
                    });
                });
                output.print("()");
            });
            AST_Symbol.DEFMETHOD("definition", function() {
                return this.thedef;
            });
            DEFPRINT(AST_Symbol, function(self, output) {
                var def_;
                def_ = self.definition();
                output.print_name((def_) ? def_.mangled_name || def_.name : self.name);
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
                    if (p instanceof AST_Seq && p.car === node || p instanceof AST_BaseCall && p.expression === node || p instanceof AST_Dot && p.expression === node || p instanceof AST_Sub && p.expression === node || p instanceof AST_ItemAccess && p.expression === node || p instanceof AST_Conditional && p.condition === node || p instanceof AST_Binary && p.left === node || p instanceof AST_UnaryPostfix && p.expression === node) {
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
        _$rapyd$_modules["output"]["DANGEROUS"] = DANGEROUS;

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
        var compile_time_decorators = _$rapyd$_modules["parse"].compile_time_decorators;
        
        var OutputStream = _$rapyd$_modules["output"].OutputStream;
        
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
            var _$rapyd$_Iter62 = _$rapyd$_Iterable(ast);
            for (var _$rapyd$_Index62 = 0; _$rapyd$_Index62 < _$rapyd$_Iter62.length; _$rapyd$_Index62++) {
                ast_node = _$rapyd$_Iter62[_$rapyd$_Index62];
                if (ast_node.substr(0, 4) === "AST_") {
                    exports[ast_node] = ast[ast_node];
                }
            }
        }
    })();
})();