(function(){
    "use strict";
    var ρσ_iterator_symbol = (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") ? Symbol.iterator : "iterator-Symbol-5d0927e5554349048cf0e3762a228256";
    var ρσ_kwargs_symbol = (typeof Symbol === "function") ? Symbol("kwargs-object") : "kwargs-object-Symbol-5d0927e5554349048cf0e3762a228256";
    var ρσ_cond_temp, ρσ_expr_temp, ρσ_last_exception;
    var ρσ_object_counter = 0;
var ρσ_len;
function ρσ_bool(val) {
    return !!val;
};
Object.defineProperties(ρσ_bool, {
    __argnames__ : {value: ["val"]}
});

function ρσ_print() {
    var parts;
    if (typeof console === "object") {
        parts = [];
        for (var i = 0; i < arguments.length; i++) {
            parts.push(ρσ_str(arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i]));
        }
        console.log(parts.join(" "));
    }
};

function ρσ_int(val, base) {
    var ans;
    ans = parseInt(val, base || 10);
    if (isNaN(ans)) {
        throw new ValueError("Invalid literal for int with base " + (base || 10) + ": " + val);
    }
    return ans;
};
Object.defineProperties(ρσ_int, {
    __argnames__ : {value: ["val", "base"]}
});

function ρσ_float() {
    var ans;
    ans = parseFloat.apply(null, arguments);
    if (isNaN(ans)) {
        throw new ValueError("Could not convert string to float: " + arguments[0]);
    }
    return ans;
};

function ρσ_arraylike_creator() {
    var names;
    names = "Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" ");
    if (typeof HTMLCollection === "function") {
        names = names.concat("HTMLCollection NodeList NamedNodeMap".split(" "));
    }
    return (function() {
        var ρσ_anonfunc = function (x) {
            if (Array.isArray(x) || typeof x === "string" || names.indexOf(Object.prototype.toString.call(x).slice(8, -1)) > -1) {
                return true;
            }
            return false;
        };
        Object.defineProperties(ρσ_anonfunc, {
            __argnames__ : {value: ["x"]}
        });
        return ρσ_anonfunc;
    })();
};

function options_object(f) {
    return function () {
        if (typeof arguments[arguments.length - 1] === "object") {
            arguments[ρσ_bound_index(arguments.length - 1, arguments)][ρσ_kwargs_symbol] = true;
        }
        return f.apply(this, arguments);
    };
};
Object.defineProperties(options_object, {
    __argnames__ : {value: ["f"]}
});

function ρσ_id(x) {
    return x.ρσ_object_id;
};
Object.defineProperties(ρσ_id, {
    __argnames__ : {value: ["x"]}
});

function ρσ_dir(item) {
    var arr;
    arr = ρσ_list_decorate([]);
    for (var i in item) {
        arr.push(i);
    }
    return arr;
};
Object.defineProperties(ρσ_dir, {
    __argnames__ : {value: ["item"]}
});

function ρσ_ord(x) {
    var ans, second;
    ans = x.charCodeAt(0);
    if (55296 <= ans && ans <= 56319) {
        second = x.charCodeAt(1);
        if (56320 <= second && second <= 57343) {
            return (ans - 55296) * 1024 + second - 56320 + 65536;
        }
        throw new TypeError("string is missing the low surrogate char");
    }
    return ans;
};
Object.defineProperties(ρσ_ord, {
    __argnames__ : {value: ["x"]}
});

function ρσ_chr(code) {
    if (code <= 65535) {
        return String.fromCharCode(code);
    }
    code -= 65536;
    return String.fromCharCode(55296 + (code >> 10), 56320 + (code & 1023));
};
Object.defineProperties(ρσ_chr, {
    __argnames__ : {value: ["code"]}
});

function ρσ_callable(x) {
    return typeof x === "function";
};
Object.defineProperties(ρσ_callable, {
    __argnames__ : {value: ["x"]}
});

function ρσ_bin(x) {
    var ans;
    if (typeof x !== "number" || x % 1 !== 0) {
        throw new TypeError("integer required");
    }
    ans = x.toString(2);
    if (ans[0] === "-") {
        ans = "-" + "0b" + ans.slice(1);
    } else {
        ans = "0b" + ans;
    }
    return ans;
};
Object.defineProperties(ρσ_bin, {
    __argnames__ : {value: ["x"]}
});

function ρσ_hex(x) {
    var ans;
    if (typeof x !== "number" || x % 1 !== 0) {
        throw new TypeError("integer required");
    }
    ans = x.toString(16);
    if (ans[0] === "-") {
        ans = "-" + "0x" + ans.slice(1);
    } else {
        ans = "0x" + ans;
    }
    return ans;
};
Object.defineProperties(ρσ_hex, {
    __argnames__ : {value: ["x"]}
});

function ρσ_enumerate(iterable) {
    var ans, iterator;
    ans = {"_i":-1};
    ans[ρσ_iterator_symbol] = function () {
        return this;
    };
    if (ρσ_arraylike(iterable)) {
        ans["next"] = function () {
            this._i += 1;
            if (this._i < iterable.length) {
                return {'done':false, 'value':[this._i, iterable[this._i]]};
            }
            return {'done':true};
        };
        return ans;
    }
    if (typeof iterable[ρσ_iterator_symbol] === "function") {
        iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[ρσ_iterator_symbol]();
        ans["_iterator"] = iterator;
        ans["next"] = function () {
            var r;
            r = this._iterator.next();
            if (r.done) {
                return {'done':true};
            }
            this._i += 1;
            return {'done':false, 'value':[this._i, r.value]};
        };
        return ans;
    }
    return ρσ_enumerate(Object.keys(iterable));
};
Object.defineProperties(ρσ_enumerate, {
    __argnames__ : {value: ["iterable"]}
});

function ρσ_reversed(iterable) {
    var ans;
    if (ρσ_arraylike(iterable)) {
        ans = {"_i": iterable.length};
        ans["next"] = function () {
            this._i -= 1;
            if (this._i > -1) {
                return {'done':false, 'value':iterable[this._i]};
            }
            return {'done':true};
        };
        ans[ρσ_iterator_symbol] = function () {
            return this;
        };
        return ans;
    }
    throw new TypeError("reversed() can only be called on arrays or strings");
};
Object.defineProperties(ρσ_reversed, {
    __argnames__ : {value: ["iterable"]}
});

function ρσ_iter(iterable) {
    var ans;
    if (typeof iterable[ρσ_iterator_symbol] === "function") {
        return (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[ρσ_iterator_symbol]();
    }
    if (ρσ_arraylike(iterable)) {
        ans = {"_i":-1};
        ans[ρσ_iterator_symbol] = function () {
            return this;
        };
        ans["next"] = function () {
            this._i += 1;
            if (this._i < iterable.length) {
                return {'done':false, 'value':iterable[this._i]};
            }
            return {'done':true};
        };
        return ans;
    }
    return ρσ_iter(Object.keys(iterable));
};
Object.defineProperties(ρσ_iter, {
    __argnames__ : {value: ["iterable"]}
});

function ρσ_range(start, stop, step) {
    var length, ans;
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = arguments[2] || 1;
    length = Math.max(Math.ceil((stop - start) / step), 0);
    ans = {'_i': start - step, '_idx': -1};
    ans[ρσ_iterator_symbol] = function () {
        return this;
    };
    ans["next"] = function () {
        this._i += step;
        this._idx += 1;
        if (this._idx >= length) {
            return {'done':true};
        }
        return {'done':false, 'value':this._i};
    };
    return ans;
};
Object.defineProperties(ρσ_range, {
    __argnames__ : {value: ["start", "stop", "step"]}
});

function ρσ_getattr(obj, name, defval) {
    var ret;
    try {
        ret = obj[(typeof name === "number" && name < 0) ? obj.length + name : name];
    } catch (ρσ_Exception) {
        ρσ_last_exception = ρσ_Exception;
        if (ρσ_Exception instanceof TypeError) {
            if (defval === undefined) {
                throw new AttributeError("The attribute " + name + " is not present");
            }
            return defval;
        } else {
            throw ρσ_Exception;
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
Object.defineProperties(ρσ_getattr, {
    __argnames__ : {value: ["obj", "name", "defval"]}
});

function ρσ_setattr(obj, name, value) {
    obj[(typeof name === "number" && name < 0) ? obj.length + name : name] = value;
};
Object.defineProperties(ρσ_setattr, {
    __argnames__ : {value: ["obj", "name", "value"]}
});

function ρσ_hasattr(obj, name) {
    return name in obj;
};
Object.defineProperties(ρσ_hasattr, {
    __argnames__ : {value: ["obj", "name"]}
});

ρσ_len = function () {
    function len(obj) {
        if (ρσ_arraylike(obj)) {
            return obj.length;
        }
        if (typeof obj.__len__ === "function") {
            return obj.__len__();
        }
        if (obj instanceof Set || obj instanceof Map) {
            return obj.size;
        }
        return Object.keys(obj).length;
    };
    Object.defineProperties(len, {
        __argnames__ : {value: ["obj"]}
    });

    function len5(obj) {
        if (ρσ_arraylike(obj)) {
            return obj.length;
        }
        if (typeof obj.__len__ === "function") {
            return obj.__len__();
        }
        return Object.keys(obj).length;
    };
    Object.defineProperties(len5, {
        __argnames__ : {value: ["obj"]}
    });

    return (typeof Set === "function" && typeof Map === "function") ? len : len5;
}();
function ρσ_get_module(name) {
    return ρσ_modules[(typeof name === "number" && name < 0) ? ρσ_modules.length + name : name];
};
Object.defineProperties(ρσ_get_module, {
    __argnames__ : {value: ["name"]}
});

function ρσ_pow(x, y, z) {
    var ans;
    ans = Math.pow(x, y);
    if (z !== undefined) {
        ans %= z;
    }
    return ans;
};
Object.defineProperties(ρσ_pow, {
    __argnames__ : {value: ["x", "y", "z"]}
});

function ρσ_type(x) {
    return x.constructor;
};
Object.defineProperties(ρσ_type, {
    __argnames__ : {value: ["x"]}
});

var abs = Math.abs, max = Math.max, min = Math.min, bool = ρσ_bool, type = ρσ_type;
var float = ρσ_float, int = ρσ_int, arraylike = ρσ_arraylike_creator(), ρσ_arraylike = arraylike;
var print = ρσ_print, id = ρσ_id, get_module = ρσ_get_module, pow = ρσ_pow;
var dir = ρσ_dir, ord = ρσ_ord, chr = ρσ_chr, bin = ρσ_bin, hex = ρσ_hex, callable = ρσ_callable;
var enumerate = ρσ_enumerate, iter = ρσ_iter, reversed = ρσ_reversed, len = ρσ_len;
var range = ρσ_range, getattr = ρσ_getattr, setattr = ρσ_setattr, hasattr = ρσ_hasattr;function ρσ_equals(a, b) {
    var ρσ_unpack, akeys, bkeys, key;
    if (a === b) {
        return true;
    }
    if (a && typeof a.__eq__ === "function") {
        return a.__eq__(b);
    }
    if (b && typeof b.__eq__ === "function") {
        return b.__eq__(a);
    }
    if (ρσ_arraylike(a) && ρσ_arraylike(b)) {
        if ((a.length !== b.length && (typeof a.length !== "object" || ρσ_not_equals(a.length, b.length)))) {
            return false;
        }
        for (var i=0; i < a.length; i++) {
            if (!((a[(typeof i === "number" && i < 0) ? a.length + i : i] === b[(typeof i === "number" && i < 0) ? b.length + i : i] || typeof a[(typeof i === "number" && i < 0) ? a.length + i : i] === "object" && ρσ_equals(a[(typeof i === "number" && i < 0) ? a.length + i : i], b[(typeof i === "number" && i < 0) ? b.length + i : i])))) {
                return false;
            }
        }
        return true;
    }
    if (typeof a === "object" && typeof b === "object" && (a.constructor === Object && b.constructor === Object || Object.getPrototypeOf(a) === null && Object.getPrototypeOf(b) === null)) {
        ρσ_unpack = [Object.keys(a), Object.keys(b)];
        akeys = ρσ_unpack[0];
        bkeys = ρσ_unpack[1];
        if (akeys.length !== bkeys.length) {
            return false;
        }
        for (var j=0; j < akeys.length; j++) {
            key = akeys[(typeof j === "number" && j < 0) ? akeys.length + j : j];
            if (!((a[(typeof key === "number" && key < 0) ? a.length + key : key] === b[(typeof key === "number" && key < 0) ? b.length + key : key] || typeof a[(typeof key === "number" && key < 0) ? a.length + key : key] === "object" && ρσ_equals(a[(typeof key === "number" && key < 0) ? a.length + key : key], b[(typeof key === "number" && key < 0) ? b.length + key : key])))) {
                return false;
            }
        }
        return true;
    }
    return false;
};
Object.defineProperties(ρσ_equals, {
    __argnames__ : {value: ["a", "b"]}
});

function ρσ_not_equals(a, b) {
    if (a === b) {
        return false;
    }
    if (a && typeof a.__ne__ === "function") {
        return a.__ne__(b);
    }
    if (b && typeof b.__ne__ === "function") {
        return b.__ne__(a);
    }
    return !ρσ_equals(a, b);
};
Object.defineProperties(ρσ_not_equals, {
    __argnames__ : {value: ["a", "b"]}
});

var equals = ρσ_equals;
function ρσ_list_extend(iterable) {
    var start, iterator, result;
    if (Array.isArray(iterable) || typeof iterable === "string") {
        start = this.length;
        this.length += iterable.length;
        for (var i = 0; i < iterable.length; i++) {
            (ρσ_expr_temp = this)[ρσ_bound_index(start + i, ρσ_expr_temp)] = iterable[(typeof i === "number" && i < 0) ? iterable.length + i : i];
        }
    } else {
        iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[ρσ_iterator_symbol]();
        result = iterator.next();
        while (!result.done) {
            this.push(result.value);
            result = iterator.next();
        }
    }
};
Object.defineProperties(ρσ_list_extend, {
    __argnames__ : {value: ["iterable"]}
});

function ρσ_list_index(val, start, stop) {
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
        if (((ρσ_expr_temp = this)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i] === val || typeof (ρσ_expr_temp = this)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i] === "object" && ρσ_equals((ρσ_expr_temp = this)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i], val))) {
            return i;
        }
    }
    throw new ValueError(val + " is not in list");
};
Object.defineProperties(ρσ_list_index, {
    __argnames__ : {value: ["val", "start", "stop"]}
});

function ρσ_list_pop(index) {
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
Object.defineProperties(ρσ_list_pop, {
    __argnames__ : {value: ["index"]}
});

function ρσ_list_remove(value) {
    var idx;
    idx = this.indexOf(value);
    if (idx === -1) {
        throw new ValueError(value + " not in list");
    }
    this.splice(idx, 1);
};
Object.defineProperties(ρσ_list_remove, {
    __argnames__ : {value: ["value"]}
});

function ρσ_list_to_string() {
    return "[" + this.join(", ") + "]";
};

function ρσ_list_insert(index, val) {
    if (index < 0) {
        index += this.length;
    }
    index = min(this.length, max(index, 0));
    if (index === 0) {
        this.unshift(val);
        return;
    }
    for (var i = this.length; i > index; i--) {
        (ρσ_expr_temp = this)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i] = (ρσ_expr_temp = this)[ρσ_bound_index(i - 1, ρσ_expr_temp)];
    }
    (ρσ_expr_temp = this)[(typeof index === "number" && index < 0) ? ρσ_expr_temp.length + index : index] = val;
};
Object.defineProperties(ρσ_list_insert, {
    __argnames__ : {value: ["index", "val"]}
});

function ρσ_list_copy() {
    return ρσ_list_constructor(this);
};

function ρσ_list_clear() {
    this.length = 0;
};

function ρσ_list_as_array() {
    return Array.prototype.slice.call(this);
};

function ρσ_list_count(value) {
    return this.reduce((function() {
        var ρσ_anonfunc = function (n, val) {
            return n + (val === value);
        };
        Object.defineProperties(ρσ_anonfunc, {
            __argnames__ : {value: ["n", "val"]}
        });
        return ρσ_anonfunc;
    })(), 0);
};
Object.defineProperties(ρσ_list_count, {
    __argnames__ : {value: ["value"]}
});

function ρσ_list_sort_key(value) {
    var t;
    t = typeof value;
    if (t === "string" || t === "number") {
        return value;
    }
    return value.toString();
};
Object.defineProperties(ρσ_list_sort_key, {
    __argnames__ : {value: ["value"]}
});

function ρσ_list_sort_cmp(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};
Object.defineProperties(ρσ_list_sort_cmp, {
    __argnames__ : {value: ["a", "b"]}
});

function ρσ_list_sort(key, reverse) {
    var mult, keymap, k;
    key = key || ρσ_list_sort_key;
    mult = (reverse) ? -1 : 1;
    keymap = dict();
    for (var i=0; i < this.length; i++) {
        k = (ρσ_expr_temp = this)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i];
        keymap.set(k, key(k));
    }
    this.sort((function() {
        var ρσ_anonfunc = function (a, b) {
            return mult * ρσ_list_sort_cmp(keymap.get(a), keymap.get(b));
        };
        Object.defineProperties(ρσ_anonfunc, {
            __argnames__ : {value: ["a", "b"]}
        });
        return ρσ_anonfunc;
    })());
};
Object.defineProperties(ρσ_list_sort, {
    __argnames__ : {value: ["key", "reverse"]}
});

function ρσ_list_concat() {
    var ans;
    ans = Array.prototype.concat.apply(this, arguments);
    ρσ_list_decorate(ans);
    return ans;
};

function ρσ_list_slice() {
    var ans;
    ans = Array.prototype.slice.apply(this, arguments);
    ρσ_list_decorate(ans);
    return ans;
};

function ρσ_list_iterator(value) {
    var self;
    self = this;
    return (function(){
        var ρσ_d = {};
        ρσ_d["_i"] = -1;
        ρσ_d["_list"] = self;
        ρσ_d["next"] = function () {
            this._i += 1;
            if (this._i >= this._list.length) {
                return (function(){
                    var ρσ_d = {};
                    ρσ_d["done"] = true;
                    return ρσ_d;
                }).call(this);
            }
            return (function(){
                var ρσ_d = {};
                ρσ_d["done"] = false;
                ρσ_d["value"] = (ρσ_expr_temp = this._list)[ρσ_bound_index(this._i, ρσ_expr_temp)];
                return ρσ_d;
            }).call(this);
        };
        return ρσ_d;
    }).call(this);
};
Object.defineProperties(ρσ_list_iterator, {
    __argnames__ : {value: ["value"]}
});

function ρσ_list_len() {
    return this.length;
};

function ρσ_list_contains(val) {
    for (var i = 0; i < this.length; i++) {
        if (((ρσ_expr_temp = this)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i] === val || typeof (ρσ_expr_temp = this)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i] === "object" && ρσ_equals((ρσ_expr_temp = this)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i], val))) {
            return true;
        }
    }
    return false;
};
Object.defineProperties(ρσ_list_contains, {
    __argnames__ : {value: ["val"]}
});

function ρσ_list_eq(other) {
    if (!ρσ_arraylike(other)) {
        return false;
    }
    if ((this.length !== other.length && (typeof this.length !== "object" || ρσ_not_equals(this.length, other.length)))) {
        return false;
    }
    for (var i = 0; i < this.length; i++) {
        if (!(((ρσ_expr_temp = this)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i] === other[(typeof i === "number" && i < 0) ? other.length + i : i] || typeof (ρσ_expr_temp = this)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i] === "object" && ρσ_equals((ρσ_expr_temp = this)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i], other[(typeof i === "number" && i < 0) ? other.length + i : i])))) {
            return false;
        }
    }
    return true;
};
Object.defineProperties(ρσ_list_eq, {
    __argnames__ : {value: ["other"]}
});

function ρσ_list_decorate(ans) {
    ans.append = Array.prototype.push;
    ans.toString = ρσ_list_to_string;
    ans.inspect = ρσ_list_to_string;
    ans.extend = ρσ_list_extend;
    ans.index = ρσ_list_index;
    ans.pypop = ρσ_list_pop;
    ans.remove = ρσ_list_remove;
    ans.insert = ρσ_list_insert;
    ans.copy = ρσ_list_copy;
    ans.clear = ρσ_list_clear;
    ans.count = ρσ_list_count;
    ans.concat = ρσ_list_concat;
    ans.pysort = ρσ_list_sort;
    ans.slice = ρσ_list_slice;
    ans.as_array = ρσ_list_as_array;
    ans.__len__ = ρσ_list_len;
    ans.__contains__ = ρσ_list_contains;
    ans.__eq__ = ρσ_list_eq;
    ans.constructor = ρσ_list_constructor;
    if (typeof ans[ρσ_iterator_symbol] !== "function") {
        ans[ρσ_iterator_symbol] = ρσ_list_iterator;
    }
    return ans;
};
Object.defineProperties(ρσ_list_decorate, {
    __argnames__ : {value: ["ans"]}
});

function ρσ_list_constructor(iterable) {
    var ans, iterator, result;
    if (iterable === undefined) {
        ans = [];
    } else if (ρσ_arraylike(iterable)) {
        ans = new Array(iterable.length);
        for (var i = 0; i < iterable.length; i++) {
            ans[(typeof i === "number" && i < 0) ? ans.length + i : i] = iterable[(typeof i === "number" && i < 0) ? iterable.length + i : i];
        }
    } else if (typeof iterable[ρσ_iterator_symbol] === "function") {
        iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[ρσ_iterator_symbol]();
        ans = ρσ_list_decorate([]);
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
    return ρσ_list_decorate(ans);
};
Object.defineProperties(ρσ_list_constructor, {
    __argnames__ : {value: ["iterable"]}
});

ρσ_list_constructor.__name__ = "list";
var list = ρσ_list_constructor, list_wrap = ρσ_list_decorate;
function sorted() {
    var iterable = ( 0 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true) ? undefined : arguments[0];
    var key = (arguments[1] === undefined || ( 1 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true)) ? sorted.__defaults__.key : arguments[1];
    var reverse = (arguments[2] === undefined || ( 2 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true)) ? sorted.__defaults__.reverse : arguments[2];
    var ρσ_kwargs_obj = arguments[arguments.length-1];
    if (ρσ_kwargs_obj === null || typeof ρσ_kwargs_obj !== "object" || ρσ_kwargs_obj [ρσ_kwargs_symbol] !== true) ρσ_kwargs_obj = {};
    if (Object.prototype.hasOwnProperty.call(ρσ_kwargs_obj, "key")){
        key = ρσ_kwargs_obj.key;
    }
    if (Object.prototype.hasOwnProperty.call(ρσ_kwargs_obj, "reverse")){
        reverse = ρσ_kwargs_obj.reverse;
    }
    var ans;
    ans = ρσ_list_constructor(iterable);
    ans.pysort(key, reverse);
    return ans;
};
Object.defineProperties(sorted, {
    __defaults__ : {value: {key:null, reverse:false}},
    __handles_kwarg_interpolation__ : {value: true},
    __argnames__ : {value: ["iterable", "key", "reverse"]}
});

var ρσ_global_object_id = 0, ρσ_set_implementation;
function ρσ_set_keyfor(x) {
    var t, ans;
    t = typeof x;
    if (t === "string" || t === "number" || t === "boolean") {
        return "_" + t[0] + x;
    }
    if (x === null) {
        return "__!@#$0";
    }
    ans = x.ρσ_hash_key_prop;
    if (ans === undefined) {
        ans = "_!@#$" + (++ρσ_global_object_id);
        Object.defineProperty(x, "ρσ_hash_key_prop", (function(){
            var ρσ_d = {};
            ρσ_d["value"] = ans;
            return ρσ_d;
        }).call(this));
    }
    return ans;
};
Object.defineProperties(ρσ_set_keyfor, {
    __argnames__ : {value: ["x"]}
});

function ρσ_set_polyfill() {
    this._store = {};
    this.size = 0;
};

ρσ_set_polyfill.prototype.add = (function() {
    var ρσ_anonfunc = function (x) {
        var key;
        key = ρσ_set_keyfor(x);
        if (!Object.prototype.hasOwnProperty.call(this._store, key)) {
            this.size += 1;
            (ρσ_expr_temp = this._store)[(typeof key === "number" && key < 0) ? ρσ_expr_temp.length + key : key] = x;
        }
        return this;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_set_polyfill.prototype.clear = (function() {
    var ρσ_anonfunc = function (x) {
        this._store = {};
        this.size = 0;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_set_polyfill.prototype.delete = (function() {
    var ρσ_anonfunc = function (x) {
        var key;
        key = ρσ_set_keyfor(x);
        if (Object.prototype.hasOwnProperty.call(this._store, key)) {
            this.size -= 1;
            delete this._store[key];
            return true;
        }
        return false;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_set_polyfill.prototype.has = (function() {
    var ρσ_anonfunc = function (x) {
        return Object.prototype.hasOwnProperty.call(this._store, ρσ_set_keyfor(x));
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_set_polyfill.prototype.values = (function() {
    var ρσ_anonfunc = function (x) {
        var ans;
        ans = {'_keys': Object.keys(this._store), '_i':-1, '_s':this._store};
        ans[ρσ_iterator_symbol] = function () {
            return this;
        };
        ans["next"] = function () {
            this._i += 1;
            if (this._i >= this._keys.length) {
                return {'done': true};
            }
            return {'done':false, 'value':this._s[this._keys[this._i]]};
        };
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
if (typeof Set !== "function" || typeof Set.prototype.delete !== "function") {
    ρσ_set_implementation = ρσ_set_polyfill;
} else {
    ρσ_set_implementation = Set;
}
function ρσ_set(iterable) {
    var ans, s, iterator, result, keys;
    if (this instanceof ρσ_set) {
        this.jsset = new ρσ_set_implementation;
        ans = this;
        if (iterable === undefined) {
            return ans;
        }
        s = ans.jsset;
        if (ρσ_arraylike(iterable)) {
            for (var i = 0; i < iterable.length; i++) {
                s.add(iterable[(typeof i === "number" && i < 0) ? iterable.length + i : i]);
            }
        } else if (typeof iterable[ρσ_iterator_symbol] === "function") {
            iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[ρσ_iterator_symbol]();
            result = iterator.next();
            while (!result.done) {
                s.add(result.value);
                result = iterator.next();
            }
        } else {
            keys = Object.keys(iterable);
            for (var j=0; j < keys.length; j++) {
                s.add(keys[(typeof j === "number" && j < 0) ? keys.length + j : j]);
            }
        }
        return ans;
    } else {
        return new ρσ_set(iterable);
    }
};
Object.defineProperties(ρσ_set, {
    __argnames__ : {value: ["iterable"]}
});

ρσ_set.prototype.__name__ = "set";
Object.defineProperties(ρσ_set.prototype, (function(){
    var ρσ_d = {};
    ρσ_d["length"] = (function(){
        var ρσ_d = {};
        ρσ_d["get"] = function () {
            return this.jsset.size;
        };
        return ρσ_d;
    }).call(this);
    ρσ_d["size"] = (function(){
        var ρσ_d = {};
        ρσ_d["get"] = function () {
            return this.jsset.size;
        };
        return ρσ_d;
    }).call(this);
    return ρσ_d;
}).call(this));
ρσ_set.prototype.__len__ = function () {
    return this.jsset.size;
};
ρσ_set.prototype.has = ρσ_set.prototype.__contains__ = (function() {
    var ρσ_anonfunc = function (x) {
        return this.jsset.has(x);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_set.prototype.add = (function() {
    var ρσ_anonfunc = function (x) {
        this.jsset.add(x);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_set.prototype.clear = function () {
    this.jsset.clear();
};
ρσ_set.prototype.copy = function () {
    return ρσ_set(this);
};
ρσ_set.prototype.discard = (function() {
    var ρσ_anonfunc = function (x) {
        this.jsset.delete(x);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_set.prototype[ρσ_iterator_symbol] = function () {
    return this.jsset.values();
};
ρσ_set.prototype.difference = function () {
    var ans, s, iterator, r, x, has;
    ans = new ρσ_set;
    s = ans.jsset;
    iterator = this.jsset.values();
    r = iterator.next();
    while (!r.done) {
        x = r.value;
        has = false;
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i].has(x)) {
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
ρσ_set.prototype.difference_update = function () {
    var s, remove, iterator, r, x;
    s = this.jsset;
    remove = [];
    iterator = s.values();
    r = iterator.next();
    while (!r.done) {
        x = r.value;
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i].has(x)) {
                remove.push(x);
                break;
            }
        }
        r = iterator.next();
    }
    for (var j = 0; j < remove.length; j++) {
        s.delete(remove[(typeof j === "number" && j < 0) ? remove.length + j : j]);
    }
};
ρσ_set.prototype.intersection = function () {
    var ans, s, iterator, r, x, has;
    ans = new ρσ_set;
    s = ans.jsset;
    iterator = this.jsset.values();
    r = iterator.next();
    while (!r.done) {
        x = r.value;
        has = true;
        for (var i = 0; i < arguments.length; i++) {
            if (!arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i].has(x)) {
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
ρσ_set.prototype.intersection_update = function () {
    var s, remove, iterator, r, x;
    s = this.jsset;
    remove = [];
    iterator = s.values();
    r = iterator.next();
    while (!r.done) {
        x = r.value;
        for (var i = 0; i < arguments.length; i++) {
            if (!arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i].has(x)) {
                remove.push(x);
                break;
            }
        }
        r = iterator.next();
    }
    for (var j = 0; j < remove.length; j++) {
        s.delete(remove[(typeof j === "number" && j < 0) ? remove.length + j : j]);
    }
};
ρσ_set.prototype.isdisjoint = (function() {
    var ρσ_anonfunc = function (other) {
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
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["other"]}
    });
    return ρσ_anonfunc;
})();
ρσ_set.prototype.issubset = (function() {
    var ρσ_anonfunc = function (other) {
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
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["other"]}
    });
    return ρσ_anonfunc;
})();
ρσ_set.prototype.issuperset = (function() {
    var ρσ_anonfunc = function (other) {
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
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["other"]}
    });
    return ρσ_anonfunc;
})();
ρσ_set.prototype.pop = function () {
    var iterator, r;
    iterator = this.jsset.values();
    r = iterator.next();
    if (r.done) {
        throw new KeyError("pop from an empty set");
    }
    this.jsset.delete(r.value);
    return r.value;
};
ρσ_set.prototype.remove = (function() {
    var ρσ_anonfunc = function (x) {
        if (!this.jsset.delete(x)) {
            throw new KeyError(x.toString());
        }
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_set.prototype.symmetric_difference = (function() {
    var ρσ_anonfunc = function (other) {
        return this.union(other).difference(this.intersection(other));
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["other"]}
    });
    return ρσ_anonfunc;
})();
ρσ_set.prototype.symmetric_difference_update = (function() {
    var ρσ_anonfunc = function (other) {
        var common;
        common = this.intersection(other);
        this.update(other);
        this.difference_update(common);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["other"]}
    });
    return ρσ_anonfunc;
})();
ρσ_set.prototype.union = function () {
    var ans;
    ans = ρσ_set(this);
    ans.update.apply(ans, arguments);
    return ans;
};
ρσ_set.prototype.update = function () {
    var s, iterator, r;
    s = this.jsset;
    for (var i=0; i < arguments.length; i++) {
        iterator = arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i][ρσ_iterator_symbol]();
        r = iterator.next();
        while (!r.done) {
            s.add(r.value);
            r = iterator.next();
        }
    }
};
ρσ_set.prototype.toString = ρσ_set.prototype.inspect = function () {
    return "{" + list(this).join(", ") + "}";
};
ρσ_set.prototype.__eq__ = (function() {
    var ρσ_anonfunc = function (other) {
        var iterator, r;
        if (!other instanceof this.constructor) {
            return false;
        }
        if (other.size !== this.size) {
            return false;
        }
        if (other.size === 0) {
            return true;
        }
        iterator = other[ρσ_iterator_symbol]();
        r = iterator.next();
        while (!r.done) {
            if (!this.has(r.value)) {
                return false;
            }
            r = iterator.next();
        }
        return true;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["other"]}
    });
    return ρσ_anonfunc;
})();
function ρσ_set_wrap(x) {
    var ans;
    ans = new ρσ_set;
    ans.jsset = x;
    return ans;
};
Object.defineProperties(ρσ_set_wrap, {
    __argnames__ : {value: ["x"]}
});

var set = ρσ_set, set_wrap = ρσ_set_wrap;
var ρσ_dict_implementation;
function ρσ_dict_polyfill() {
    this._store = {};
    this.size = 0;
};

ρσ_dict_polyfill.prototype.set = (function() {
    var ρσ_anonfunc = function (x, value) {
        var key;
        key = ρσ_set_keyfor(x);
        if (!Object.prototype.hasOwnProperty.call(this._store, key)) {
            this.size += 1;
        }
        (ρσ_expr_temp = this._store)[(typeof key === "number" && key < 0) ? ρσ_expr_temp.length + key : key] = [x, value];
        return this;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x", "value"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict_polyfill.prototype.clear = (function() {
    var ρσ_anonfunc = function (x) {
        this._store = {};
        this.size = 0;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict_polyfill.prototype.delete = (function() {
    var ρσ_anonfunc = function (x) {
        var key;
        key = ρσ_set_keyfor(x);
        if (Object.prototype.hasOwnProperty.call(this._store, key)) {
            this.size -= 1;
            delete this._store[key];
            return true;
        }
        return false;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict_polyfill.prototype.has = (function() {
    var ρσ_anonfunc = function (x) {
        return Object.prototype.hasOwnProperty.call(this._store, ρσ_set_keyfor(x));
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict_polyfill.prototype.get = (function() {
    var ρσ_anonfunc = function (x) {
        try {
            return (ρσ_expr_temp = this._store)[ρσ_bound_index(ρσ_set_keyfor(x), ρσ_expr_temp)][1];
        } catch (ρσ_Exception) {
            ρσ_last_exception = ρσ_Exception;
            if (ρσ_Exception instanceof TypeError) {
                return undefined;
            } else {
                throw ρσ_Exception;
            }
        }
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict_polyfill.prototype.values = (function() {
    var ρσ_anonfunc = function (x) {
        var ans;
        ans = {'_keys': Object.keys(this._store), '_i':-1, '_s':this._store};
        ans[ρσ_iterator_symbol] = function () {
            return this;
        };
        ans["next"] = function () {
            this._i += 1;
            if (this._i >= this._keys.length) {
                return {'done': true};
            }
            return {'done':false, 'value':this._s[this._keys[this._i]][1]};
        };
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict_polyfill.prototype.keys = (function() {
    var ρσ_anonfunc = function (x) {
        var ans;
        ans = {'_keys': Object.keys(this._store), '_i':-1, '_s':this._store};
        ans[ρσ_iterator_symbol] = function () {
            return this;
        };
        ans["next"] = function () {
            this._i += 1;
            if (this._i >= this._keys.length) {
                return {'done': true};
            }
            return {'done':false, 'value':this._s[this._keys[this._i]][0]};
        };
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict_polyfill.prototype.entries = (function() {
    var ρσ_anonfunc = function (x) {
        var ans;
        ans = {'_keys': Object.keys(this._store), '_i':-1, '_s':this._store};
        ans[ρσ_iterator_symbol] = function () {
            return this;
        };
        ans["next"] = function () {
            this._i += 1;
            if (this._i >= this._keys.length) {
                return {'done': true};
            }
            return {'done':false, 'value':this._s[this._keys[this._i]]};
        };
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
if (typeof Map !== "function" || typeof Map.prototype.delete !== "function") {
    ρσ_dict_implementation = ρσ_dict_polyfill;
} else {
    ρσ_dict_implementation = Map;
}
function ρσ_dict(iterable) {
    if (this instanceof ρσ_dict) {
        this.jsmap = new ρσ_dict_implementation;
        if (iterable !== undefined) {
            this.update(iterable);
        }
        return this;
    } else {
        return new ρσ_dict(iterable);
    }
};
Object.defineProperties(ρσ_dict, {
    __argnames__ : {value: ["iterable"]}
});

ρσ_dict.prototype.__name__ = "dict";
Object.defineProperties(ρσ_dict.prototype, (function(){
    var ρσ_d = {};
    ρσ_d["length"] = (function(){
        var ρσ_d = {};
        ρσ_d["get"] = function () {
            return this.jsmap.size;
        };
        return ρσ_d;
    }).call(this);
    ρσ_d["size"] = (function(){
        var ρσ_d = {};
        ρσ_d["get"] = function () {
            return this.jsmap.size;
        };
        return ρσ_d;
    }).call(this);
    return ρσ_d;
}).call(this));
ρσ_dict.prototype.__len__ = function () {
    return this.jsmap.size;
};
ρσ_dict.prototype.has = ρσ_dict.prototype.__contains__ = (function() {
    var ρσ_anonfunc = function (x) {
        return this.jsmap.has(x);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["x"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict.prototype.set = ρσ_dict.prototype.__setitem__ = (function() {
    var ρσ_anonfunc = function (key, value) {
        this.jsmap.set(key, value);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["key", "value"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict.prototype.__delitem__ = (function() {
    var ρσ_anonfunc = function (key) {
        this.jsmap.delete(key);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["key"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict.prototype.clear = function () {
    this.jsmap.clear();
};
ρσ_dict.prototype.copy = function () {
    return ρσ_dict(this);
};
ρσ_dict.prototype.keys = function () {
    return this.jsmap.keys();
};
ρσ_dict.prototype.values = function () {
    return this.jsmap.values();
};
ρσ_dict.prototype.items = ρσ_dict.prototype.entries = function () {
    return this.jsmap.entries();
};
ρσ_dict.prototype[ρσ_iterator_symbol] = function () {
    return this.jsmap.keys();
};
ρσ_dict.prototype.__getitem__ = (function() {
    var ρσ_anonfunc = function (key) {
        var ans;
        ans = this.jsmap.get(key);
        if (ans === undefined && !this.jsmap.has(key)) {
            throw new KeyError(key + "");
        }
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["key"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict.prototype.get = (function() {
    var ρσ_anonfunc = function (key, defval) {
        var ans;
        ans = this.jsmap.get(key);
        if (ans === undefined && !this.jsmap.has(key)) {
            return (defval === undefined) ? null : defval;
        }
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["key", "defval"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict.prototype.set_default = (function() {
    var ρσ_anonfunc = function (key, defval) {
        var j;
        j = this.jsmap;
        if (!j.has(key)) {
            j.set(key, defval);
            return defval;
        }
        return j.get(key);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["key", "defval"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict.fromkeys = ρσ_dict.prototype.fromkeys = (function() {
    var ρσ_anonfunc = function () {
        var iterable = ( 0 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true) ? undefined : arguments[0];
        var value = (arguments[1] === undefined || ( 1 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true)) ? ρσ_anonfunc.__defaults__.value : arguments[1];
        var ρσ_kwargs_obj = arguments[arguments.length-1];
        if (ρσ_kwargs_obj === null || typeof ρσ_kwargs_obj !== "object" || ρσ_kwargs_obj [ρσ_kwargs_symbol] !== true) ρσ_kwargs_obj = {};
        if (Object.prototype.hasOwnProperty.call(ρσ_kwargs_obj, "value")){
            value = ρσ_kwargs_obj.value;
        }
        var ans, iterator, r;
        ans = ρσ_dict();
        iterator = iter(iterable);
        r = iterator.next();
        while (!r.done) {
            ans.set(r.value, value);
            r = iterator.next();
        }
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __defaults__ : {value: {value:null}},
        __handles_kwarg_interpolation__ : {value: true},
        __argnames__ : {value: ["iterable", "value"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict.prototype.pop = (function() {
    var ρσ_anonfunc = function (key, defval) {
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
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["key", "defval"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict.prototype.popitem = function () {
    var r;
    r = this.jsmap.entries().next();
    if (r.done) {
        throw new KeyError("dict is empty");
    }
    this.jsmap.delete(r.value[0]);
    return r.value;
};
ρσ_dict.prototype.update = function () {
    var m, iterable, iterator, result, keys;
    if (arguments.length === 0) {
        return;
    }
    m = this.jsmap;
    iterable = arguments[0];
    if (Array.isArray(iterable)) {
        for (var i = 0; i < iterable.length; i++) {
            m.set(iterable[(typeof i === "number" && i < 0) ? iterable.length + i : i][0], iterable[(typeof i === "number" && i < 0) ? iterable.length + i : i][1]);
        }
    } else if (iterable instanceof ρσ_dict) {
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
    } else if (typeof iterable[ρσ_iterator_symbol] === "function") {
        iterator = iterable[ρσ_iterator_symbol]();
        result = iterator.next();
        while (!result.done) {
            m.set(result.value[0], result.value[1]);
            result = iterator.next();
        }
    } else {
        keys = Object.keys(iterable);
        for (var j=0; j < keys.length; j++) {
            if (keys[(typeof j === "number" && j < 0) ? keys.length + j : j] !== ρσ_iterator_symbol) {
                m.set(keys[(typeof j === "number" && j < 0) ? keys.length + j : j], iterable[ρσ_bound_index(keys[(typeof j === "number" && j < 0) ? keys.length + j : j], iterable)]);
            }
        }
    }
    if (arguments.length > 1) {
        ρσ_dict.prototype.update.call(this, arguments[1]);
    }
};
ρσ_dict.prototype.toString = ρσ_dict.prototype.inspect = function () {
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
ρσ_dict.prototype.__eq__ = (function() {
    var ρσ_anonfunc = function (other) {
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
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["other"]}
    });
    return ρσ_anonfunc;
})();
ρσ_dict.prototype.as_object = (function() {
    var ρσ_anonfunc = function (other) {
        var ans, iterator, r;
        ans = {};
        iterator = this.jsmap.entries();
        r = iterator.next();
        while (!r.done) {
            ans[ρσ_bound_index(r.value[0], ans)] = r.value[1];
            r = iterator.next();
        }
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["other"]}
    });
    return ρσ_anonfunc;
})();
function ρσ_dict_wrap(x) {
    var ans;
    ans = new ρσ_dict;
    ans.jsmap = x;
    return ans;
};
Object.defineProperties(ρσ_dict_wrap, {
    __argnames__ : {value: ["x"]}
});

var dict = ρσ_dict, dict_wrap = ρσ_dict_wrap;var NameError;
NameError = ReferenceError;
function Exception() {
    if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
    Exception.prototype.__init__.apply(this, arguments);
}
ρσ_extends(Exception, Error);
Exception.prototype.__init__ = function __init__(message) {
    var self = this;
    self.message = message;
    self.stack = (new Error).stack;
    self.name = self.constructor.name;
};
Object.defineProperties(Exception.prototype.__init__, {
    __argnames__ : {value: ["message"]}
});
Exception.__argnames__ = Exception.prototype.__init__.__argnames__;
Exception.__handles_kwarg_interpolation__ = Exception.prototype.__init__.__handles_kwarg_interpolation__;
Exception.prototype.__repr__ = function __repr__() {
    var self = this;
    return self.name + ": " + self.message;
};
Object.defineProperties(Exception.prototype.__repr__, {
    __argnames__ : {value: []}
});
Exception.prototype.__str__ = function __str__ () {
    if(Error.prototype.__str__) return Error.prototype.__str__.call(this);
return this.__repr__();
};
Object.defineProperty(Exception.prototype, "__bases__", {value: [Error]});

function AttributeError() {
    if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
    AttributeError.prototype.__init__.apply(this, arguments);
}
ρσ_extends(AttributeError, Exception);
AttributeError.prototype.__init__ = function __init__ () {
    Exception.prototype.__init__ && Exception.prototype.__init__.apply(this, arguments);
};
AttributeError.prototype.__repr__ = function __repr__ () {
    if(Exception.prototype.__repr__) return Exception.prototype.__repr__.call(this);
    return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
};
AttributeError.prototype.__str__ = function __str__ () {
    if(Exception.prototype.__str__) return Exception.prototype.__str__.call(this);
return this.__repr__();
};
Object.defineProperty(AttributeError.prototype, "__bases__", {value: [Exception]});


function IndexError() {
    if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
    IndexError.prototype.__init__.apply(this, arguments);
}
ρσ_extends(IndexError, Exception);
IndexError.prototype.__init__ = function __init__ () {
    Exception.prototype.__init__ && Exception.prototype.__init__.apply(this, arguments);
};
IndexError.prototype.__repr__ = function __repr__ () {
    if(Exception.prototype.__repr__) return Exception.prototype.__repr__.call(this);
    return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
};
IndexError.prototype.__str__ = function __str__ () {
    if(Exception.prototype.__str__) return Exception.prototype.__str__.call(this);
return this.__repr__();
};
Object.defineProperty(IndexError.prototype, "__bases__", {value: [Exception]});


function KeyError() {
    if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
    KeyError.prototype.__init__.apply(this, arguments);
}
ρσ_extends(KeyError, Exception);
KeyError.prototype.__init__ = function __init__ () {
    Exception.prototype.__init__ && Exception.prototype.__init__.apply(this, arguments);
};
KeyError.prototype.__repr__ = function __repr__ () {
    if(Exception.prototype.__repr__) return Exception.prototype.__repr__.call(this);
    return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
};
KeyError.prototype.__str__ = function __str__ () {
    if(Exception.prototype.__str__) return Exception.prototype.__str__.call(this);
return this.__repr__();
};
Object.defineProperty(KeyError.prototype, "__bases__", {value: [Exception]});


function ValueError() {
    if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
    ValueError.prototype.__init__.apply(this, arguments);
}
ρσ_extends(ValueError, Exception);
ValueError.prototype.__init__ = function __init__ () {
    Exception.prototype.__init__ && Exception.prototype.__init__.apply(this, arguments);
};
ValueError.prototype.__repr__ = function __repr__ () {
    if(Exception.prototype.__repr__) return Exception.prototype.__repr__.call(this);
    return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
};
ValueError.prototype.__str__ = function __str__ () {
    if(Exception.prototype.__str__) return Exception.prototype.__str__.call(this);
return this.__repr__();
};
Object.defineProperty(ValueError.prototype, "__bases__", {value: [Exception]});


function UnicodeDecodeError() {
    if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
    UnicodeDecodeError.prototype.__init__.apply(this, arguments);
}
ρσ_extends(UnicodeDecodeError, Exception);
UnicodeDecodeError.prototype.__init__ = function __init__ () {
    Exception.prototype.__init__ && Exception.prototype.__init__.apply(this, arguments);
};
UnicodeDecodeError.prototype.__repr__ = function __repr__ () {
    if(Exception.prototype.__repr__) return Exception.prototype.__repr__.call(this);
    return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
};
UnicodeDecodeError.prototype.__str__ = function __str__ () {
    if(Exception.prototype.__str__) return Exception.prototype.__str__.call(this);
return this.__repr__();
};
Object.defineProperty(UnicodeDecodeError.prototype, "__bases__", {value: [Exception]});


function AssertionError() {
    if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
    AssertionError.prototype.__init__.apply(this, arguments);
}
ρσ_extends(AssertionError, Exception);
AssertionError.prototype.__init__ = function __init__ () {
    Exception.prototype.__init__ && Exception.prototype.__init__.apply(this, arguments);
};
AssertionError.prototype.__repr__ = function __repr__ () {
    if(Exception.prototype.__repr__) return Exception.prototype.__repr__.call(this);
    return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
};
AssertionError.prototype.__str__ = function __str__ () {
    if(Exception.prototype.__str__) return Exception.prototype.__str__.call(this);
return this.__repr__();
};
Object.defineProperty(AssertionError.prototype, "__bases__", {value: [Exception]});

var ρσ_in, ρσ_desugar_kwargs, ρσ_exists;
function ρσ_eslice(arr, step, start, end) {
    var is_string;
    if (typeof arr === "string" || arr instanceof String) {
        is_string = true;
        arr = arr.split("");
    }
    if (step < 0) {
        step = -step;
        arr = arr.slice().reverse();
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
        var ρσ_anonfunc = function (e, i) {
            return i % step === 0;
        };
        Object.defineProperties(ρσ_anonfunc, {
            __argnames__ : {value: ["e", "i"]}
        });
        return ρσ_anonfunc;
    })());
    if (is_string) {
        arr = arr.join("");
    }
    return arr;
};
Object.defineProperties(ρσ_eslice, {
    __argnames__ : {value: ["arr", "step", "start", "end"]}
});

function ρσ_delslice(arr, step, start, end) {
    var is_string, ρσ_unpack, indices;
    if (typeof arr === "string" || arr instanceof String) {
        is_string = true;
        arr = arr.split("");
    }
    if (step < 0) {
        if (typeof start === "undefined") {
            start = arr.length;
        }
        if (typeof end === "undefined") {
            end = 0;
        }
        ρσ_unpack = [end, start, -step];
        start = ρσ_unpack[0];
        end = ρσ_unpack[1];
        step = ρσ_unpack[2];
    }
    if (typeof start === "undefined") {
        start = 0;
    }
    if (typeof end === "undefined") {
        end = arr.length;
    }
    if (step === 1) {
        arr.splice(start, end - start);
    } else {
        if (end > start) {
            indices = [];
            for (var i = start; i < end; i += step) {
                indices.push(i);
            }
            for (var i = indices.length - 1; i >= 0; i--) {
                arr.splice(indices[(typeof i === "number" && i < 0) ? indices.length + i : i], 1);
            }
        }
    }
    if (is_string) {
        arr = arr.join("");
    }
    return arr;
};
Object.defineProperties(ρσ_delslice, {
    __argnames__ : {value: ["arr", "step", "start", "end"]}
});

function ρσ_flatten(arr) {
    var ans, value;
    ans = ρσ_list_decorate([]);
    for (var i=0; i < arr.length; i++) {
        value = arr[(typeof i === "number" && i < 0) ? arr.length + i : i];
        if (Array.isArray(value)) {
            ans = ans.concat(ρσ_flatten(value));
        } else {
            ans.push(value);
        }
    }
    return ans;
};
Object.defineProperties(ρσ_flatten, {
    __argnames__ : {value: ["arr"]}
});

function ρσ_extends(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
};
Object.defineProperties(ρσ_extends, {
    __argnames__ : {value: ["child", "parent"]}
});

ρσ_in = function () {
    if (typeof Map === "function" && typeof Set === "function") {
        return (function() {
            var ρσ_anonfunc = function (val, arr) {
                if (typeof arr === "string") {
                    return arr.indexOf(val) !== -1;
                }
                if (typeof arr.__contains__ === "function") {
                    return arr.__contains__(val);
                }
                if (arr instanceof Map || arr instanceof Set) {
                    return arr.has(val);
                }
                if (ρσ_arraylike(arr)) {
                    return ρσ_list_contains.call(arr, val);
                }
                return Object.prototype.hasOwnProperty.call(arr, val);
            };
            Object.defineProperties(ρσ_anonfunc, {
                __argnames__ : {value: ["val", "arr"]}
            });
            return ρσ_anonfunc;
        })();
    }
    return (function() {
        var ρσ_anonfunc = function (val, arr) {
            if (typeof arr === "string") {
                return arr.indexOf(val) !== -1;
            }
            if (typeof arr.__contains__ === "function") {
                return arr.__contains__(val);
            }
            if (ρσ_arraylike(arr)) {
                return ρσ_list_contains.call(arr, val);
            }
            return Object.prototype.hasOwnProperty.call(arr, val);
        };
        Object.defineProperties(ρσ_anonfunc, {
            __argnames__ : {value: ["val", "arr"]}
        });
        return ρσ_anonfunc;
    })();
}();
function ρσ_Iterable(iterable) {
    var iterator, ans, result;
    if (ρσ_arraylike(iterable)) {
        return iterable;
    }
    if (typeof iterable[ρσ_iterator_symbol] === "function") {
        iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[ρσ_iterator_symbol]();
        ans = ρσ_list_decorate([]);
        result = iterator.next();
        while (!result.done) {
            ans.push(result.value);
            result = iterator.next();
        }
        return ans;
    }
    return Object.keys(iterable);
};
Object.defineProperties(ρσ_Iterable, {
    __argnames__ : {value: ["iterable"]}
});

ρσ_desugar_kwargs = function () {
    if (typeof Object.assign === "function") {
        return function () {
            var ans;
            ans = Object.create(null);
            ans[ρσ_kwargs_symbol] = true;
            for (var i = 0; i < arguments.length; i++) {
                Object.assign(ans, arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i]);
            }
            return ans;
        };
    }
    return function () {
        var ans, keys;
        ans = Object.create(null);
        ans[ρσ_kwargs_symbol] = true;
        for (var i = 0; i < arguments.length; i++) {
            keys = Object.keys(arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i]);
            for (var j = 0; j < keys.length; j++) {
                ans[ρσ_bound_index(keys[(typeof j === "number" && j < 0) ? keys.length + j : j], ans)] = (ρσ_expr_temp = arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i])[ρσ_bound_index(keys[(typeof j === "number" && j < 0) ? keys.length + j : j], ρσ_expr_temp)];
            }
        }
        return ans;
    };
}();
function ρσ_interpolate_kwargs(f, supplied_args) {
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
                prop = (ρσ_expr_temp = f.__argnames__)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i];
                if (has_prop.call(kwobj, prop)) {
                    args[(typeof i === "number" && i < 0) ? args.length + i : i] = kwobj[(typeof prop === "number" && prop < 0) ? kwobj.length + prop : prop];
                    delete kwobj[prop];
                } else if (i < supplied_args.length) {
                    args[(typeof i === "number" && i < 0) ? args.length + i : i] = supplied_args[(typeof i === "number" && i < 0) ? supplied_args.length + i : i];
                }
            } else {
                args[(typeof i === "number" && i < 0) ? args.length + i : i] = supplied_args[(typeof i === "number" && i < 0) ? supplied_args.length + i : i];
            }
        }
        return f.apply(this, args);
    }
    for (var i = 0; i < f.__argnames__.length; i++) {
        prop = (ρσ_expr_temp = f.__argnames__)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i];
        if (has_prop.call(kwobj, prop)) {
            supplied_args[(typeof i === "number" && i < 0) ? supplied_args.length + i : i] = kwobj[(typeof prop === "number" && prop < 0) ? kwobj.length + prop : prop];
        }
    }
    return f.apply(this, supplied_args);
};
Object.defineProperties(ρσ_interpolate_kwargs, {
    __argnames__ : {value: ["f", "supplied_args"]}
});

function ρσ_interpolate_kwargs_constructor(apply, f, supplied_args) {
    if (apply) {
        f.apply(this, supplied_args);
    } else {
        ρσ_interpolate_kwargs.call(this, f, supplied_args);
    }
    return this;
};
Object.defineProperties(ρσ_interpolate_kwargs_constructor, {
    __argnames__ : {value: ["apply", "f", "supplied_args"]}
});

function ρσ_getitem(obj, key) {
    if (obj.__getitem__) {
        return obj.__getitem__(key);
    }
    if (typeof key === "number" && key < 0) {
        key += obj.length;
    }
    return obj[(typeof key === "number" && key < 0) ? obj.length + key : key];
};
Object.defineProperties(ρσ_getitem, {
    __argnames__ : {value: ["obj", "key"]}
});

function ρσ_setitem(obj, key, val) {
    if (obj.__setitem__) {
        obj.__setitem__(key, val);
    } else {
        if (typeof key === "number" && key < 0) {
            key += obj.length;
        }
        obj[(typeof key === "number" && key < 0) ? obj.length + key : key] = val;
    }
};
Object.defineProperties(ρσ_setitem, {
    __argnames__ : {value: ["obj", "key", "val"]}
});

function ρσ_delitem(obj, key) {
    if (obj.__delitem__) {
        obj.__delitem__(key);
    } else if (typeof obj.splice === "function") {
        obj.splice(key, 1);
    } else {
        if (typeof key === "number" && key < 0) {
            key += obj.length;
        }
        delete obj[key];
    }
};
Object.defineProperties(ρσ_delitem, {
    __argnames__ : {value: ["obj", "key"]}
});

function ρσ_bound_index(idx, arr) {
    if (typeof idx === "number" && idx < 0) {
        idx += arr.length;
    }
    return idx;
};
Object.defineProperties(ρσ_bound_index, {
    __argnames__ : {value: ["idx", "arr"]}
});

ρσ_exists = (function(){
    var ρσ_d = {};
    ρσ_d["n"] = (function() {
        var ρσ_anonfunc = function (expr) {
            return expr !== undefined && expr !== null;
        };
        Object.defineProperties(ρσ_anonfunc, {
            __argnames__ : {value: ["expr"]}
        });
        return ρσ_anonfunc;
    })();
    ρσ_d["d"] = (function() {
        var ρσ_anonfunc = function (expr) {
            if (expr === undefined || expr === null) {
                return Object.create(null);
            }
            return expr;
        };
        Object.defineProperties(ρσ_anonfunc, {
            __argnames__ : {value: ["expr"]}
        });
        return ρσ_anonfunc;
    })();
    ρσ_d["c"] = (function() {
        var ρσ_anonfunc = function (expr) {
            if (typeof expr === "function") {
                return expr;
            }
            return function () {
                return undefined;
            };
        };
        Object.defineProperties(ρσ_anonfunc, {
            __argnames__ : {value: ["expr"]}
        });
        return ρσ_anonfunc;
    })();
    ρσ_d["g"] = (function() {
        var ρσ_anonfunc = function (expr) {
            if (expr === undefined || expr === null || typeof expr.__getitem__ !== "function") {
                return (function(){
                    var ρσ_d = {};
                    ρσ_d["__getitem__"] = function () {
                        return undefined;
                    };
                    return ρσ_d;
                }).call(this);
            }
        };
        Object.defineProperties(ρσ_anonfunc, {
            __argnames__ : {value: ["expr"]}
        });
        return ρσ_anonfunc;
    })();
    ρσ_d["e"] = (function() {
        var ρσ_anonfunc = function (expr, alt) {
            return (expr === undefined || expr === null) ? alt : expr;
        };
        Object.defineProperties(ρσ_anonfunc, {
            __argnames__ : {value: ["expr", "alt"]}
        });
        return ρσ_anonfunc;
    })();
    return ρσ_d;
}).call(this);
function ρσ_mixin() {
    var seen, resolved_props, p, target, props, name;
    seen = Object.create(null);
    seen.__argnames__ = seen.__handles_kwarg_interpolation__ = seen.__init__ = seen.__annotations__ = seen.__doc__ = seen.__bind_methods__ = seen.__bases__ = seen.constructor = seen.__class__ = true;
    resolved_props = {};
    p = target = arguments[0].prototype;
    while (p && p !== Object.prototype) {
        props = Object.getOwnPropertyNames(p);
        for (var i = 0; i < props.length; i++) {
            seen[ρσ_bound_index(props[(typeof i === "number" && i < 0) ? props.length + i : i], seen)] = true;
        }
        p = Object.getPrototypeOf(p);
    }
    for (var c = 1; c < arguments.length; c++) {
        p = arguments[(typeof c === "number" && c < 0) ? arguments.length + c : c].prototype;
        while (p && p !== Object.prototype) {
            props = Object.getOwnPropertyNames(p);
            for (var i = 0; i < props.length; i++) {
                name = props[(typeof i === "number" && i < 0) ? props.length + i : i];
                if (seen[(typeof name === "number" && name < 0) ? seen.length + name : name]) {
                    continue;
                }
                seen[(typeof name === "number" && name < 0) ? seen.length + name : name] = true;
                resolved_props[(typeof name === "number" && name < 0) ? resolved_props.length + name : name] = Object.getOwnPropertyDescriptor(p, name);
            }
            p = Object.getPrototypeOf(p);
        }
    }
    Object.defineProperties(target, resolved_props);
};

function ρσ_instanceof() {
    var obj, bases, q, cls, p;
    obj = arguments[0];
    bases = "";
    if (obj && obj.constructor && obj.constructor.prototype) {
        bases = obj.constructor.prototype.__bases__ || "";
    }
    for (var i = 1; i < arguments.length; i++) {
        q = arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i];
        if (obj instanceof q) {
            return true;
        }
        if ((q === Array || q === ρσ_list_constructor) && Array.isArray(obj)) {
            return true;
        }
        if (q === ρσ_str && (typeof obj === "string" || obj instanceof String)) {
            return true;
        }
        if (bases.length > 1) {
            for (var c = 1; c < bases.length; c++) {
                cls = bases[(typeof c === "number" && c < 0) ? bases.length + c : c];
                while (cls) {
                    if (q === cls) {
                        return true;
                    }
                    p = Object.getPrototypeOf(cls.prototype);
                    if (!p) {
                        break;
                    }
                    cls = p.constructor;
                }
            }
        }
    }
    return false;
};
function sum(iterable, start) {
    var ans, iterator, r;
    if (Array.isArray(iterable)) {
        return iterable.reduce((function() {
            var ρσ_anonfunc = function (prev, cur) {
                return prev + cur;
            };
            Object.defineProperties(ρσ_anonfunc, {
                __argnames__ : {value: ["prev", "cur"]}
            });
            return ρσ_anonfunc;
        })(), start || 0);
    }
    ans = start || 0;
    iterator = iter(iterable);
    r = iterator.next();
    while (!r.done) {
        ans += r.value;
        r = iterator.next();
    }
    return ans;
};
Object.defineProperties(sum, {
    __argnames__ : {value: ["iterable", "start"]}
});

function map() {
    var iterators, func, args, ans;
    iterators = new Array(arguments.length - 1);
    func = arguments[0];
    args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++) {
        iterators[ρσ_bound_index(i - 1, iterators)] = iter(arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i]);
    }
    ans = {'_func':func, '_iterators':iterators, '_args':args};
    ans[ρσ_iterator_symbol] = function () {
        return this;
    };
    ans["next"] = function () {
        var r;
        for (var i = 0; i < this._iterators.length; i++) {
            r = (ρσ_expr_temp = this._iterators)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i].next();
            if (r.done) {
                return {'done':true};
            }
            (ρσ_expr_temp = this._args)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i] = r.value;
        }
        return {'done':false, 'value':this._func.apply(undefined, this._args)};
    };
    return ans;
};

function filter(func_or_none, iterable) {
    var func, ans;
    func = (func_or_none === null) ? ρσ_bool : func_or_none;
    ans = {'_func':func, '_iterator':ρσ_iter(iterable)};
    ans[ρσ_iterator_symbol] = function () {
        return this;
    };
    ans["next"] = function () {
        var r;
        r = this._iterator.next();
        while (!r.done) {
            if (this._func(r.value)) {
                return r;
            }
            r = this._iterator.next();
        }
        return {'done':true};
    };
    return ans;
};
Object.defineProperties(filter, {
    __argnames__ : {value: ["func_or_none", "iterable"]}
});

function zip() {
    var iterators, ans;
    iterators = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
        iterators[(typeof i === "number" && i < 0) ? iterators.length + i : i] = iter(arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i]);
    }
    ans = {'_iterators':iterators};
    ans[ρσ_iterator_symbol] = function () {
        return this;
    };
    ans["next"] = function () {
        var args, r;
        args = new Array(this._iterators.length);
        for (var i = 0; i < this._iterators.length; i++) {
            r = (ρσ_expr_temp = this._iterators)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i].next();
            if (r.done) {
                return {'done':true};
            }
            args[(typeof i === "number" && i < 0) ? args.length + i : i] = r.value;
        }
        return {'done':false, 'value':args};
    };
    return ans;
};

function any(iterable) {
    var i;
    var ρσ_Iter0 = ρσ_Iterable(iterable);
    for (var ρσ_Index0 = 0; ρσ_Index0 < ρσ_Iter0.length; ρσ_Index0++) {
        i = ρσ_Iter0[ρσ_Index0];
        if (i) {
            return true;
        }
    }
    return false;
};
Object.defineProperties(any, {
    __argnames__ : {value: ["iterable"]}
});

function all(iterable) {
    var i;
    var ρσ_Iter1 = ρσ_Iterable(iterable);
    for (var ρσ_Index1 = 0; ρσ_Index1 < ρσ_Iter1.length; ρσ_Index1++) {
        i = ρσ_Iter1[ρσ_Index1];
        if (!i) {
            return false;
        }
    }
    return true;
};
Object.defineProperties(all, {
    __argnames__ : {value: ["iterable"]}
});
var define_str_func, ρσ_unpack, ρσ_orig_split, ρσ_orig_replace;
function ρσ_repr_js_builtin(x, as_array) {
    var ans, b, keys, key;
    ans = [];
    b = "{}";
    if (as_array) {
        b = "[]";
        for (var i = 0; i < x.length; i++) {
            ans.push(ρσ_repr(x[(typeof i === "number" && i < 0) ? x.length + i : i]));
        }
    } else {
        keys = Object.keys(x);
        for (var k = 0; k < keys.length; k++) {
            key = keys[(typeof k === "number" && k < 0) ? keys.length + k : k];
            ans.push(JSON.stringify(key) + ":" + ρσ_repr(x[(typeof key === "number" && key < 0) ? x.length + key : key]));
        }
    }
    return b[0] + ans.join(", ") + b[1];
};
Object.defineProperties(ρσ_repr_js_builtin, {
    __argnames__ : {value: ["x", "as_array"]}
});

function ρσ_repr(x) {
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
        ans = ρσ_repr_js_builtin(x, true);
    } else if (typeof x === "function") {
        ans = x.toString();
    } else if (typeof x === "object" && !x.toString) {
        ans = ρσ_repr_js_builtin(x);
    } else {
        name = Object.prototype.toString.call(x).slice(8, -1);
        if (ρσ_not_equals("Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".indexOf(name), -1)) {
            return name + "([" + x.map((function() {
                var ρσ_anonfunc = function (i) {
                    return str.format("0x{:02x}", i);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["i"]}
                });
                return ρσ_anonfunc;
            })()).join(", ") + "])";
        }
        ans = (typeof x.toString === "function") ? x.toString() : x;
        if (ans === "[object Object]") {
            return ρσ_repr_js_builtin(x);
        }
        try {
            ans = JSON.stringify(x);
        } catch (ρσ_Exception) {
            ρσ_last_exception = ρσ_Exception;
            {
            } 
        }
    }
    return ans + "";
};
Object.defineProperties(ρσ_repr, {
    __argnames__ : {value: ["x"]}
});

function ρσ_str(x) {
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
        ans = ρσ_repr_js_builtin(x, true);
    } else if (typeof x.toString === "function") {
        name = Object.prototype.toString.call(x).slice(8, -1);
        if (ρσ_not_equals("Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".indexOf(name), -1)) {
            return name + "([" + x.map((function() {
                var ρσ_anonfunc = function (i) {
                    return str.format("0x{:02x}", i);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["i"]}
                });
                return ρσ_anonfunc;
            })()).join(", ") + "])";
        }
        ans = x.toString();
        if (ans === "[object Object]") {
            ans = ρσ_repr_js_builtin(x);
        }
    } else if (typeof x === "object" && !x.toString) {
        ans = ρσ_repr_js_builtin(x);
    }
    return ans + "";
};
Object.defineProperties(ρσ_str, {
    __argnames__ : {value: ["x"]}
});

define_str_func = (function() {
    var ρσ_anonfunc = function (name, func) {
        var f;
        (ρσ_expr_temp = ρσ_str.prototype)[(typeof name === "number" && name < 0) ? ρσ_expr_temp.length + name : name] = func;
        ρσ_str[(typeof name === "number" && name < 0) ? ρσ_str.length + name : name] = f = func.call.bind(func);
        if (func.__argnames__) {
            Object.defineProperty(f, "__argnames__", (function(){
                var ρσ_d = {};
                ρσ_d["value"] = ['string'].concat(func.__argnames__);
                return ρσ_d;
            }).call(this));
        }
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["name", "func"]}
    });
    return ρσ_anonfunc;
})();
ρσ_unpack = [String.prototype.split.call.bind(String.prototype.split), String.prototype.replace.call.bind(String.prototype.replace)];
ρσ_orig_split = ρσ_unpack[0];
ρσ_orig_replace = ρσ_unpack[1];
define_str_func("format", function () {
    var template, args, kwargs, explicit, implicit, idx, split, ans, pos, in_brace, markup, ch;
    template = this;
    if (template === undefined) {
        throw new TypeError("Template is required");
    }
    args = Array.prototype.slice.call(arguments);
    kwargs = {};
    if (args[args.length-1] && args[args.length-1][ρσ_kwargs_symbol] !== undefined) {
        kwargs = args[args.length-1];
        args = args.slice(0, -1);
    }
    explicit = implicit = false;
    idx = 0;
    split = ρσ_orig_split;
    if (ρσ_str.format._template_resolve_pat === undefined) {
        ρσ_str.format._template_resolve_pat = /[.\[]/;
    }
    function resolve(arg, object) {
        var ρσ_unpack, first, key, rest, ans;
        if (!arg) {
            return object;
        }
        ρσ_unpack = [arg[0], arg.slice(1)];
        first = ρσ_unpack[0];
        arg = ρσ_unpack[1];
        key = split(arg, ρσ_str.format._template_resolve_pat, 1)[0];
        rest = arg.slice(key.length);
        ans = (first === "[") ? object[ρσ_bound_index(key.slice(0, -1), object)] : getattr(object, key);
        if (ans === undefined) {
            throw new KeyError((first === "[") ? key.slice(0, -1) : key);
        }
        return resolve(rest, ans);
    };
    Object.defineProperties(resolve, {
        __argnames__ : {value: ["arg", "object"]}
    });

    function resolve_format_spec(format_spec) {
        if (ρσ_str.format._template_resolve_fs_pat === undefined) {
            ρσ_str.format._template_resolve_fs_pat = /[{]([a-zA-Z0-9_]+)[}]/g;
        }
        return format_spec.replace(ρσ_str.format._template_resolve_fs_pat, (function() {
            var ρσ_anonfunc = function (match, key) {
                if (!Object.prototype.hasOwnProperty.call(kwargs, key)) {
                    return "";
                }
                return "" + kwargs[(typeof key === "number" && key < 0) ? kwargs.length + key : key];
            };
            Object.defineProperties(ρσ_anonfunc, {
                __argnames__ : {value: ["match", "key"]}
            });
            return ρσ_anonfunc;
        })());
    };
    Object.defineProperties(resolve_format_spec, {
        __argnames__ : {value: ["format_spec"]}
    });

    function apply_formatting(value, format_spec) {
        var ρσ_unpack, fill, align, sign, fhash, zeropad, width, comma, precision, ftype, is_numeric, is_int, lftype, code, exp, nval, is_positive, left, right;
        if (format_spec.indexOf("{") !== -1) {
            format_spec = resolve_format_spec(format_spec);
        }
        if (ρσ_str.format._template_format_pat === undefined) {
            ρσ_str.format._template_format_pat = /([^{}](?=[<>=^]))?([<>=^])?([-+\x20])?(\#)?(0)?(\d+)?(,)?(?:\.(\d+))?([bcdeEfFgGnosxX%])?/;
        }
        try {
            ρσ_unpack = format_spec.match(ρσ_str.format._template_format_pat).slice(1);
            fill = ρσ_unpack[0];
            align = ρσ_unpack[1];
            sign = ρσ_unpack[2];
            fhash = ρσ_unpack[3];
            zeropad = ρσ_unpack[4];
            width = ρσ_unpack[5];
            comma = ρσ_unpack[6];
            precision = ρσ_unpack[7];
            ftype = ρσ_unpack[8];
        } catch (ρσ_Exception) {
            ρσ_last_exception = ρσ_Exception;
            if (ρσ_Exception instanceof TypeError) {
                return value;
            } else {
                throw ρσ_Exception;
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
                exp = parseInt(split(value.toExponential(precision - 1).toLowerCase(), "e")[1], 10);
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
        Object.defineProperties(repeat, {
            __argnames__ : {value: ["char", "num"]}
        });

        if (is_numeric && width && width[0] === "0") {
            width = width.slice(1);
            ρσ_unpack = ["0", "="];
            fill = ρσ_unpack[0];
            align = ρσ_unpack[1];
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
                if (ρσ_in(value[0], "+- ")) {
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
    Object.defineProperties(apply_formatting, {
        __argnames__ : {value: ["value", "format_spec"]}
    });

    function parse_markup(markup) {
        var key, transformer, format_spec, pos, state, ch;
        key = transformer = format_spec = "";
        pos = 0;
        state = 0;
        while (pos < markup.length) {
            ch = markup[(typeof pos === "number" && pos < 0) ? markup.length + pos : pos];
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
    Object.defineProperties(parse_markup, {
        __argnames__ : {value: ["markup"]}
    });

    function render_markup(markup) {
        var ρσ_unpack, key, transformer, format_spec, lkey, nvalue, object, ans;
        ρσ_unpack = parse_markup(markup);
        key = ρσ_unpack[0];
        transformer = ρσ_unpack[1];
        format_spec = ρσ_unpack[2];
        if (transformer && ['a', 'r', 's'].indexOf(transformer) === -1) {
            throw new ValueError("Unknown conversion specifier: " + transformer);
        }
        lkey = key.length && split(key, /[.\[]/, 1)[0];
        if (lkey) {
            explicit = true;
            if (implicit) {
                throw new ValueError("cannot switch from automatic field numbering to manual field specification");
            }
            nvalue = parseInt(lkey);
            object = (isNaN(nvalue)) ? kwargs[(typeof lkey === "number" && lkey < 0) ? kwargs.length + lkey : lkey] : args[(typeof nvalue === "number" && nvalue < 0) ? args.length + nvalue : nvalue];
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
            object = args[(typeof idx === "number" && idx < 0) ? args.length + idx : idx];
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
    Object.defineProperties(render_markup, {
        __argnames__ : {value: ["markup"]}
    });

    ans = "";
    pos = 0;
    in_brace = 0;
    markup = "";
    while (pos < template.length) {
        ch = template[(typeof pos === "number" && pos < 0) ? template.length + pos : pos];
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
                if (template[ρσ_bound_index(pos + 1, template)] === "{") {
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
});
define_str_func("capitalize", function () {
    var string;
    string = this;
    if (string) {
        string = string[0].toUpperCase() + string.slice(1).toLowerCase();
    }
    return string;
});
define_str_func("center", (function() {
    var ρσ_anonfunc = function (width, fill) {
        var left, right;
        left = Math.floor((width - this.length) / 2);
        right = width - left - this.length;
        fill = fill || " ";
        return new Array(left+1).join(fill) + this + new Array(right+1).join(fill);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["width", "fill"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("count", (function() {
    var ρσ_anonfunc = function (needle, start, end) {
        var string, ρσ_unpack, pos, step, ans;
        string = this;
        start = start || 0;
        end = end || string.length;
        if (start < 0 || end < 0) {
            string = string.slice(start, end);
            ρσ_unpack = [0, string.length];
            start = ρσ_unpack[0];
            end = ρσ_unpack[1];
        }
        pos = start;
        step = needle.length;
        if (!step) {
            return 0;
        }
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
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["needle", "start", "end"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("endswith", (function() {
    var ρσ_anonfunc = function (suffixes, start, end) {
        var string, q;
        string = this;
        start = start || 0;
        if (typeof suffixes === "string") {
            suffixes = [suffixes];
        }
        if (end !== undefined) {
            string = string.slice(0, end);
        }
        for (var i = 0; i < suffixes.length; i++) {
            q = suffixes[(typeof i === "number" && i < 0) ? suffixes.length + i : i];
            if (string.indexOf(q, Math.max(start, string.length - q.length)) !== -1) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["suffixes", "start", "end"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("startswith", (function() {
    var ρσ_anonfunc = function (prefixes, start, end) {
        var prefix;
        start = start || 0;
        if (typeof prefixes === "string") {
            prefixes = [prefixes];
        }
        for (var i = 0; i < prefixes.length; i++) {
            prefix = prefixes[(typeof i === "number" && i < 0) ? prefixes.length + i : i];
            end = (end === undefined) ? this.length : end;
            if (end - start >= prefix.length && prefix === this.slice(start, start + prefix.length)) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["prefixes", "start", "end"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("find", (function() {
    var ρσ_anonfunc = function (needle, start, end) {
        var ans;
        while (start < 0) {
            start += this.length;
        }
        ans = this.indexOf(needle, start);
        if (end !== undefined && ans !== -1) {
            while (end < 0) {
                end += this.length;
            }
            if (ans >= end - needle.length) {
                return -1;
            }
        }
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["needle", "start", "end"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("rfind", (function() {
    var ρσ_anonfunc = function (needle, start, end) {
        var ans;
        while (end < 0) {
            end += this.length;
        }
        ans = this.lastIndexOf(needle, end - 1);
        if (start !== undefined && ans !== -1) {
            while (start < 0) {
                start += this.length;
            }
            if (ans < start) {
                return -1;
            }
        }
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["needle", "start", "end"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("index", (function() {
    var ρσ_anonfunc = function (needle, start, end) {
        var ans;
        ans = ρσ_str.prototype.find.apply(this, arguments);
        if (ans === -1) {
            throw new ValueError("substring not found");
        }
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["needle", "start", "end"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("rindex", (function() {
    var ρσ_anonfunc = function (needle, start, end) {
        var ans;
        ans = ρσ_str.prototype.rfind.apply(this, arguments);
        if (ans === -1) {
            throw new ValueError("substring not found");
        }
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["needle", "start", "end"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("islower", function () {
    return this.length > 0 && this.toUpperCase() !== this;
});
define_str_func("isupper", function () {
    return this.length > 0 && this.toLowerCase() !== this;
});
define_str_func("isspace", function () {
    return this.length > 0 && /^\s+$/.test(this);
});
define_str_func("join", (function() {
    var ρσ_anonfunc = function (iterable) {
        var ans, r;
        if (Array.isArray(iterable)) {
            return iterable.join(this);
        }
        ans = "";
        r = iterable.next();
        while (!r.done) {
            if (ans) {
                ans += this;
            }
            ans += r.value;
            r = iterable.next();
        }
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["iterable"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("ljust", (function() {
    var ρσ_anonfunc = function (width, fill) {
        var string;
        string = this;
        if (width > string.length) {
            fill = fill || " ";
            string += new Array(width - string.length + 1).join(fill);
        }
        return string;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["width", "fill"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("rjust", (function() {
    var ρσ_anonfunc = function (width, fill) {
        var string;
        string = this;
        if (width > string.length) {
            fill = fill || " ";
            string = new Array(width - string.length + 1).join(fill) + string;
        }
        return string;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["width", "fill"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("lower", function () {
    return this.toLowerCase();
});
define_str_func("upper", function () {
    return this.toUpperCase();
});
define_str_func("lstrip", (function() {
    var ρσ_anonfunc = function (chars) {
        var string, pos;
        string = this;
        pos = 0;
        chars = chars || ρσ_str.whitespace;
        while (chars.indexOf(string[(typeof pos === "number" && pos < 0) ? string.length + pos : pos]) !== -1) {
            pos += 1;
        }
        if (pos) {
            string = string.slice(pos);
        }
        return string;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["chars"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("rstrip", (function() {
    var ρσ_anonfunc = function (chars) {
        var string, pos;
        string = this;
        pos = string.length - 1;
        chars = chars || ρσ_str.whitespace;
        while (chars.indexOf(string[(typeof pos === "number" && pos < 0) ? string.length + pos : pos]) !== -1) {
            pos -= 1;
        }
        if (pos < string.length - 1) {
            string = string.slice(0, pos + 1);
        }
        return string;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["chars"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("strip", (function() {
    var ρσ_anonfunc = function (chars) {
        return ρσ_str.prototype.lstrip.call(ρσ_str.prototype.rstrip.call(this, chars), chars);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["chars"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("partition", (function() {
    var ρσ_anonfunc = function (sep) {
        var idx;
        idx = this.indexOf(sep);
        if (idx === -1) {
            return [this, "", ""];
        }
        return [this.slice(0, idx), sep, this.slice(idx + sep.length)];
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["sep"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("rpartition", (function() {
    var ρσ_anonfunc = function (sep) {
        var idx;
        idx = this.lastIndexOf(sep);
        if (idx === -1) {
            return ["", "", this];
        }
        return [this.slice(0, idx), sep, this.slice(idx + sep.length)];
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["sep"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("replace", (function() {
    var ρσ_anonfunc = function (old, repl, count) {
        var string, pos, idx;
        string = this;
        if (count === 1) {
            return ρσ_orig_replace(string, old, repl);
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
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["old", "repl", "count"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("split", (function() {
    var ρσ_anonfunc = function (sep, maxsplit) {
        var split, ans, extra, parts;
        if (maxsplit === 0) {
            return ρσ_list_decorate([ this ]);
        }
        split = ρσ_orig_split;
        if (sep === undefined || sep === null) {
            if (maxsplit > 0) {
                ans = split(this, /(\s+)/);
                extra = "";
                parts = [];
                for (var i = 0; i < ans.length; i++) {
                    if (parts.length >= maxsplit + 1) {
                        extra += ans[(typeof i === "number" && i < 0) ? ans.length + i : i];
                    } else if (i % 2 === 0) {
                        parts.push(ans[(typeof i === "number" && i < 0) ? ans.length + i : i]);
                    }
                }
                parts[parts.length-1] += extra;
                ans = parts;
            } else {
                ans = split(this, /\s+/);
            }
        } else {
            if (sep === "") {
                throw new ValueError("empty separator");
            }
            ans = split(this, sep);
            if (maxsplit > 0 && ans.length > maxsplit) {
                extra = ans.slice(maxsplit).join(sep);
                ans = ans.slice(0, maxsplit);
                ans.push(extra);
            }
        }
        return ρσ_list_decorate(ans);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["sep", "maxsplit"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("rsplit", (function() {
    var ρσ_anonfunc = function (sep, maxsplit) {
        var split, ans, is_space, pos, current, spc, ch, end, idx;
        if (!maxsplit) {
            return ρσ_str.prototype.split.call(this, sep);
        }
        split = ρσ_orig_split;
        if (sep === undefined || sep === null) {
            if (maxsplit > 0) {
                ans = [];
                is_space = /\s/;
                pos = this.length - 1;
                current = "";
                while (pos > -1 && maxsplit > 0) {
                    spc = false;
                    ch = (ρσ_expr_temp = this)[(typeof pos === "number" && pos < 0) ? ρσ_expr_temp.length + pos : pos];
                    while (pos > -1 && is_space.test(ch)) {
                        spc = true;
                        ch = this[--pos];
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
                ans.push(this.slice(0, pos + 1) + current);
                ans.reverse();
            } else {
                ans = split(this, /\s+/);
            }
        } else {
            if (sep === "") {
                throw new ValueError("empty separator");
            }
            ans = [];
            pos = end = this.length;
            while (pos > -1 && maxsplit > 0) {
                maxsplit -= 1;
                idx = this.lastIndexOf(sep, pos);
                if (idx === -1) {
                    break;
                }
                ans.push(this.slice(idx + sep.length, end));
                pos = idx - 1;
                end = idx;
            }
            ans.push(this.slice(0, end));
            ans.reverse();
        }
        return ρσ_list_decorate(ans);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["sep", "maxsplit"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("splitlines", (function() {
    var ρσ_anonfunc = function (keepends) {
        var split, parts, ans;
        split = ρσ_orig_split;
        if (keepends) {
            parts = split(this, /((?:\r?\n)|\r)/);
            ans = [];
            for (var i = 0; i < parts.length; i++) {
                if (i % 2 === 0) {
                    ans.push(parts[(typeof i === "number" && i < 0) ? parts.length + i : i]);
                } else {
                    ans[ans.length-1] += parts[(typeof i === "number" && i < 0) ? parts.length + i : i];
                }
            }
        } else {
            ans = split(this, /(?:\r?\n)|\r/);
        }
        return ρσ_list_decorate(ans);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["keepends"]}
    });
    return ρσ_anonfunc;
})());
define_str_func("swapcase", function () {
    var ans, a, b;
    ans = new Array(this.length);
    for (var i = 0; i < ans.length; i++) {
        a = (ρσ_expr_temp = this)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i];
        b = a.toLowerCase();
        if (a === b) {
            b = a.toUpperCase();
        }
        ans[(typeof i === "number" && i < 0) ? ans.length + i : i] = b;
    }
    return ans.join("");
});
define_str_func("zfill", (function() {
    var ρσ_anonfunc = function (width) {
        var string;
        string = this;
        if (width > string.length) {
            string = new Array(width - string.length + 1).join("0") + string;
        }
        return string;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["width"]}
    });
    return ρσ_anonfunc;
})());
ρσ_str.uchrs = (function() {
    var ρσ_anonfunc = function (string, with_positions) {
        return (function(){
            var ρσ_d = {};
            ρσ_d["_string"] = string;
            ρσ_d["_pos"] = 0;
            ρσ_d[ρσ_iterator_symbol] = function () {
                return this;
            };
            ρσ_d["next"] = function () {
                var length, pos, value, ans, extra;
                length = this._string.length;
                if (this._pos >= length) {
                    return (function(){
                        var ρσ_d = {};
                        ρσ_d["done"] = true;
                        return ρσ_d;
                    }).call(this);
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
                    return (function(){
                        var ρσ_d = {};
                        ρσ_d["done"] = false;
                        ρσ_d["value"] = ρσ_list_decorate([ pos, ans ]);
                        return ρσ_d;
                    }).call(this);
                } else {
                    return (function(){
                        var ρσ_d = {};
                        ρσ_d["done"] = false;
                        ρσ_d["value"] = ans;
                        return ρσ_d;
                    }).call(this);
                }
            };
            return ρσ_d;
        }).call(this);
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["string", "with_positions"]}
    });
    return ρσ_anonfunc;
})();
ρσ_str.uslice = (function() {
    var ρσ_anonfunc = function (string, start, end) {
        var items, iterator, r;
        items = [];
        iterator = ρσ_str.uchrs(string);
        r = iterator.next();
        while (!r.done) {
            items.push(r.value);
            r = iterator.next();
        }
        return items.slice(start || 0, (end === undefined) ? items.length : end).join("");
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["string", "start", "end"]}
    });
    return ρσ_anonfunc;
})();
ρσ_str.ulen = (function() {
    var ρσ_anonfunc = function (string) {
        var iterator, r, ans;
        iterator = ρσ_str.uchrs(string);
        r = iterator.next();
        ans = 0;
        while (!r.done) {
            r = iterator.next();
            ans += 1;
        }
        return ans;
    };
    Object.defineProperties(ρσ_anonfunc, {
        __argnames__ : {value: ["string"]}
    });
    return ρσ_anonfunc;
})();
ρσ_str.ascii_lowercase = "abcdefghijklmnopqrstuvwxyz";
ρσ_str.ascii_uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
ρσ_str.ascii_letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
ρσ_str.digits = "0123456789";
ρσ_str.punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
ρσ_str.printable = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\u000b\f";
ρσ_str.whitespace = " \t\n\r\u000b\f";
define_str_func = undefined;
var str = ρσ_str, repr = ρσ_repr;;
    var ρσ_modules = {};
    ρσ_modules.utils = {};
    ρσ_modules.errors = {};
    ρσ_modules.unicode_aliases = {};
    ρσ_modules.ast = {};
    ρσ_modules.string_interpolation = {};
    ρσ_modules.tokenizer = {};
    ρσ_modules.parse = {};
    ρσ_modules.output = {};
    ρσ_modules["output.stream"] = {};
    ρσ_modules["output.statements"] = {};
    ρσ_modules["output.exceptions"] = {};
    ρσ_modules["output.utils"] = {};
    ρσ_modules["output.loops"] = {};
    ρσ_modules["output.operators"] = {};
    ρσ_modules["output.functions"] = {};
    ρσ_modules["output.classes"] = {};
    ρσ_modules["output.literals"] = {};
    ρσ_modules["output.modules"] = {};
    ρσ_modules["output.codegen"] = {};

    (function(){
        var __name__ = "utils";
        var has_prop, MAP;
        has_prop = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);
        function array_to_hash(a) {
            var ret, i;
            ret = Object.create(null);
            var ρσ_Iter0 = ρσ_Iterable(range(len(a)));
            for (var ρσ_Index0 = 0; ρσ_Index0 < ρσ_Iter0.length; ρσ_Index0++) {
                i = ρσ_Iter0[ρσ_Index0];
                ret[ρσ_bound_index(a[(typeof i === "number" && i < 0) ? a.length + i : i], ret)] = true;
            }
            return ret;
        };
        Object.defineProperties(array_to_hash, {
            __argnames__ : {value: ["a"]}
        });

        function slice(a, start) {
            return Array.prototype.slice.call(a, start || 0);
        };
        Object.defineProperties(slice, {
            __argnames__ : {value: ["a", "start"]}
        });

        function characters(str_) {
            return str_.split("");
        };
        Object.defineProperties(characters, {
            __argnames__ : {value: ["str_"]}
        });

        function member(name, array) {
            var i;
            for (var ρσ_Index1 = array.length - 1; ρσ_Index1 > -1; ρσ_Index1-=1) {
                i = ρσ_Index1;
                if (array[(typeof i === "number" && i < 0) ? array.length + i : i] === name) {
                    return true;
                }
            }
            return false;
        };
        Object.defineProperties(member, {
            __argnames__ : {value: ["name", "array"]}
        });

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
        Object.defineProperties(repeat_string, {
            __argnames__ : {value: ["str_", "i"]}
        });

        function DefaultsError() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            DefaultsError.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(DefaultsError, ValueError);
        DefaultsError.prototype.__init__ = function __init__(name, defs) {
            var self = this;
            ValueError.prototype.__init__.call(self, name + " is not a supported option. Supported options are: " + str(Object.keys(defs)));
        };
        Object.defineProperties(DefaultsError.prototype.__init__, {
            __argnames__ : {value: ["name", "defs"]}
        });
        DefaultsError.__argnames__ = DefaultsError.prototype.__init__.__argnames__;
        DefaultsError.__handles_kwarg_interpolation__ = DefaultsError.prototype.__init__.__handles_kwarg_interpolation__;
        DefaultsError.prototype.__repr__ = function __repr__ () {
            if(ValueError.prototype.__repr__) return ValueError.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        DefaultsError.prototype.__str__ = function __str__ () {
            if(ValueError.prototype.__str__) return ValueError.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(DefaultsError.prototype, "__bases__", {value: [ValueError]});

        function defaults(args, defs, croak) {
            var ret, i;
            if (args === true) {
                args = Object.create(null);
            }
            ret = args || Object.create(null);
            if (croak) {
                var ρσ_Iter2 = ρσ_Iterable(ret);
                for (var ρσ_Index2 = 0; ρσ_Index2 < ρσ_Iter2.length; ρσ_Index2++) {
                    i = ρσ_Iter2[ρσ_Index2];
                    if (!has_prop(defs, i)) {
                        throw new DefaultsError(i, defs);
                    }
                }
            }
            var ρσ_Iter3 = ρσ_Iterable(defs);
            for (var ρσ_Index3 = 0; ρσ_Index3 < ρσ_Iter3.length; ρσ_Index3++) {
                i = ρσ_Iter3[ρσ_Index3];
                ret[(typeof i === "number" && i < 0) ? ret.length + i : i] = (args && has_prop(args, i)) ? args[(typeof i === "number" && i < 0) ? args.length + i : i] : defs[(typeof i === "number" && i < 0) ? defs.length + i : i];
            }
            return ret;
        };
        Object.defineProperties(defaults, {
            __argnames__ : {value: ["args", "defs", "croak"]}
        });

        function merge(obj, ext) {
            var i;
            var ρσ_Iter4 = ρσ_Iterable(ext);
            for (var ρσ_Index4 = 0; ρσ_Index4 < ρσ_Iter4.length; ρσ_Index4++) {
                i = ρσ_Iter4[ρσ_Index4];
                obj[(typeof i === "number" && i < 0) ? obj.length + i : i] = ext[(typeof i === "number" && i < 0) ? ext.length + i : i];
            }
            return obj;
        };
        Object.defineProperties(merge, {
            __argnames__ : {value: ["obj", "ext"]}
        });

        function noop() {
        };

        MAP = function () {
            var skip;
            function MAP(a, f, backwards) {
                var ret, top, i;
                ret = ρσ_list_decorate([]);
                top = ρσ_list_decorate([]);
                function doit() {
                    var val, is_last;
                    val = f(a[(typeof i === "number" && i < 0) ? a.length + i : i], i);
                    is_last = ρσ_instanceof(val, Last);
                    if (is_last) {
                        val = val.v;
                    }
                    if (ρσ_instanceof(val, AtTop)) {
                        val = val.v;
                        if (ρσ_instanceof(val, Splice)) {
                            top.push.apply(top, (backwards) ? val.v.slice().reverse() : val.v);
                        } else {
                            top.push(val);
                        }
                    } else if (val !== skip) {
                        if (ρσ_instanceof(val, Splice)) {
                            ret.push.apply(ret, (backwards) ? val.v.slice().reverse() : val.v);
                        } else {
                            ret.push(val);
                        }
                    }
                    return is_last;
                };

                if (Array.isArray(a)) {
                    if (backwards) {
                        for (var ρσ_Index5 = a.length - 1; ρσ_Index5 > -1; ρσ_Index5-=1) {
                            i = ρσ_Index5;
                            if (doit()) {
                                break;
                            }
                        }
                        ret.reverse();
                        top.reverse();
                    } else {
                        var ρσ_Iter6 = ρσ_Iterable(range(len(a)));
                        for (var ρσ_Index6 = 0; ρσ_Index6 < ρσ_Iter6.length; ρσ_Index6++) {
                            i = ρσ_Iter6[ρσ_Index6];
                            if (doit()) {
                                break;
                            }
                        }
                    }
                } else {
                    var ρσ_Iter7 = ρσ_Iterable(a);
                    for (var ρσ_Index7 = 0; ρσ_Index7 < ρσ_Iter7.length; ρσ_Index7++) {
                        i = ρσ_Iter7[ρσ_Index7];
                        if (doit()) {
                            break;
                        }
                    }
                }
                return top.concat(ret);
            };
            Object.defineProperties(MAP, {
                __argnames__ : {value: ["a", "f", "backwards"]}
            });

            MAP.at_top = (function() {
                var ρσ_anonfunc = function (val) {
                    return new AtTop(val);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["val"]}
                });
                return ρσ_anonfunc;
            })();
            MAP.splice = (function() {
                var ρσ_anonfunc = function (val) {
                    return new Splice(val);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["val"]}
                });
                return ρσ_anonfunc;
            })();
            MAP.last = (function() {
                var ρσ_anonfunc = function (val) {
                    return new Last(val);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["val"]}
                });
                return ρσ_anonfunc;
            })();
            skip = MAP.skip = Object.create(null);
            function AtTop(val) {
                this.v = val;
            };
            Object.defineProperties(AtTop, {
                __argnames__ : {value: ["val"]}
            });

            function Splice(val) {
                this.v = val;
            };
            Object.defineProperties(Splice, {
                __argnames__ : {value: ["val"]}
            });

            function Last(val) {
                this.v = val;
            };
            Object.defineProperties(Last, {
                __argnames__ : {value: ["val"]}
            });

            return MAP;
        }.call(this);
        function push_uniq(array, el) {
            if (array.indexOf(el) < 0) {
                array.push(el);
            }
        };
        Object.defineProperties(push_uniq, {
            __argnames__ : {value: ["array", "el"]}
        });

        function string_template(text, props) {
            return text.replace(/\{(.+?)\}/g, (function() {
                var ρσ_anonfunc = function (str_, p) {
                    return props[(typeof p === "number" && p < 0) ? props.length + p : p];
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["str_", "p"]}
                });
                return ρσ_anonfunc;
            })());
        };
        Object.defineProperties(string_template, {
            __argnames__ : {value: ["text", "props"]}
        });

        function remove(array, el) {
            var i;
            for (var ρσ_Index8 = array.length - 1; ρσ_Index8 > -1; ρσ_Index8-=1) {
                i = ρσ_Index8;
                if (array[(typeof i === "number" && i < 0) ? array.length + i : i] === el) {
                    array.splice(i, 1);
                }
            }
        };
        Object.defineProperties(remove, {
            __argnames__ : {value: ["array", "el"]}
        });

        function mergeSort(array, cmp) {
            if (array.length < 2) {
                return array.slice();
            }
            function merge(a, b) {
                var r, ai, bi, i;
                r = ρσ_list_decorate([]);
                ai = 0;
                bi = 0;
                i = 0;
                while (ai < a.length && bi < b.length) {
                    if (cmp(a[(typeof ai === "number" && ai < 0) ? a.length + ai : ai], b[(typeof bi === "number" && bi < 0) ? b.length + bi : bi]) <= 0) {
                        r[(typeof i === "number" && i < 0) ? r.length + i : i] = a[(typeof ai === "number" && ai < 0) ? a.length + ai : ai];
                        ai += 1;
                    } else {
                        r[(typeof i === "number" && i < 0) ? r.length + i : i] = b[(typeof bi === "number" && bi < 0) ? b.length + bi : bi];
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
            Object.defineProperties(merge, {
                __argnames__ : {value: ["a", "b"]}
            });

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
            Object.defineProperties(_ms, {
                __argnames__ : {value: ["a"]}
            });

            return _ms(array);
        };
        Object.defineProperties(mergeSort, {
            __argnames__ : {value: ["array", "cmp"]}
        });

        function set_difference(a, b) {
            return a.filter((function() {
                var ρσ_anonfunc = function (el) {
                    return b.indexOf(el) < 0;
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["el"]}
                });
                return ρσ_anonfunc;
            })());
        };
        Object.defineProperties(set_difference, {
            __argnames__ : {value: ["a", "b"]}
        });

        function set_intersection(a, b) {
            return a.filter((function() {
                var ρσ_anonfunc = function (el) {
                    return b.indexOf(el) >= 0;
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["el"]}
                });
                return ρσ_anonfunc;
            })());
        };
        Object.defineProperties(set_intersection, {
            __argnames__ : {value: ["a", "b"]}
        });

        function make_predicate(words) {
            var a, k;
            if (typeof words === "string") {
                words = words.split(" ");
            }
            a = Object.create(null);
            var ρσ_Iter9 = ρσ_Iterable(words);
            for (var ρσ_Index9 = 0; ρσ_Index9 < ρσ_Iter9.length; ρσ_Index9++) {
                k = ρσ_Iter9[ρσ_Index9];
                a[(typeof k === "number" && k < 0) ? a.length + k : k] = true;
            }
            return a;
        };
        Object.defineProperties(make_predicate, {
            __argnames__ : {value: ["words"]}
        });

        function cache_file_name(src, cache_dir) {
            if (cache_dir) {
                src = str.replace(src, "\\", "/");
                return cache_dir + "/" + str.lstrip(str.replace(src, "/", "-") + ".json", "-");
            }
            return src + "-cached";
        };
        Object.defineProperties(cache_file_name, {
            __argnames__ : {value: ["src", "cache_dir"]}
        });

        ρσ_modules.utils.has_prop = has_prop;
        ρσ_modules.utils.MAP = MAP;
        ρσ_modules.utils.array_to_hash = array_to_hash;
        ρσ_modules.utils.slice = slice;
        ρσ_modules.utils.characters = characters;
        ρσ_modules.utils.member = member;
        ρσ_modules.utils.repeat_string = repeat_string;
        ρσ_modules.utils.DefaultsError = DefaultsError;
        ρσ_modules.utils.defaults = defaults;
        ρσ_modules.utils.merge = merge;
        ρσ_modules.utils.noop = noop;
        ρσ_modules.utils.push_uniq = push_uniq;
        ρσ_modules.utils.string_template = string_template;
        ρσ_modules.utils.remove = remove;
        ρσ_modules.utils.mergeSort = mergeSort;
        ρσ_modules.utils.set_difference = set_difference;
        ρσ_modules.utils.set_intersection = set_intersection;
        ρσ_modules.utils.make_predicate = make_predicate;
        ρσ_modules.utils.cache_file_name = cache_file_name;
    })();

    (function(){
        var __name__ = "errors";
        function SyntaxError() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            SyntaxError.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(SyntaxError, Error);
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
        Object.defineProperties(SyntaxError.prototype.__init__, {
            __argnames__ : {value: ["message", "filename", "line", "col", "pos", "is_eof"]}
        });
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
        Object.defineProperties(SyntaxError.prototype.toString, {
            __argnames__ : {value: []}
        });
        SyntaxError.prototype.__repr__ = function __repr__ () {
            if(Error.prototype.__repr__) return Error.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        SyntaxError.prototype.__str__ = function __str__ () {
            if(Error.prototype.__str__) return Error.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(SyntaxError.prototype, "__bases__", {value: [Error]});

        function ImportError() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            ImportError.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(ImportError, SyntaxError);
        ImportError.prototype.__init__ = function __init__ () {
            SyntaxError.prototype.__init__ && SyntaxError.prototype.__init__.apply(this, arguments);
        };
        ImportError.prototype.__repr__ = function __repr__ () {
            if(SyntaxError.prototype.__repr__) return SyntaxError.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        ImportError.prototype.__str__ = function __str__ () {
            if(SyntaxError.prototype.__str__) return SyntaxError.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(ImportError.prototype, "__bases__", {value: [SyntaxError]});
        

        ρσ_modules.errors.SyntaxError = SyntaxError;
        ρσ_modules.errors.ImportError = ImportError;
    })();

    (function(){
        var __name__ = "unicode_aliases";
        var DB, ALIAS_MAP;
        DB = "\n# NameAliases-8.0.0.txt\n# Date: 2014-11-19, 01:30:00 GMT [KW, LI]\n#\n# This file is a normative contributory data file in the\n# Unicode Character Database.\n#\n# Copyright (c) 2005-2014 Unicode, Inc.\n# For terms of use, see http://www.unicode.org/terms_of_use.html\n#\n# This file defines the formal name aliases for Unicode characters.\n#\n# For informative aliases, see NamesList.txt\n#\n# The formal name aliases are divided into five types, each with a distinct label.\n#\n# Type Labels:\n#\n# 1. correction\n#      Corrections for serious problems in the character names\n# 2. control\n#      ISO 6429 names for C0 and C1 control functions, and other\n#      commonly occurring names for control codes\n# 3. alternate\n#      A few widely used alternate names for format characters\n# 4. figment\n#      Several documented labels for C1 control code points which\n#      were never actually approved in any standard\n# 5. abbreviation\n#      Commonly occurring abbreviations (or acronyms) for control codes,\n#      format characters, spaces, and variation selectors\n#\n# The formal name aliases are part of the Unicode character namespace, which\n# includes the character names and the names of named character sequences.\n# The inclusion of ISO 6429 names and other commonly occurring names and\n# abbreviations for control codes and format characters as formal name aliases\n# is to help avoid name collisions between Unicode character names and the\n# labels which commonly appear in text and/or in implementations such as regex, for\n# control codes (which for historical reasons have no Unicode character name)\n# or for format characters.\n#\n# For documentation, see NamesList.html and http://www.unicode.org/reports/tr44/\n#\n# FORMAT\n#\n# Each line has three fields, as described here:\n#\n# First field:  Code point\n# Second field: Alias\n# Third field:  Type\n#\n# The type labels used are defined above. As for property values, comparisons\n# of type labels should ignore case.\n#\n# The type labels can be mapped to other strings for display, if desired.\n#\n# In case multiple aliases are assigned, additional aliases\n# are provided on separate lines. Parsers of this data file should\n# take note that the same code point can (and does) occur more than once.\n#\n# Note that currently the only instances of multiple aliases of the same\n# type for a single code point are either of type \"control\" or \"abbreviation\".\n# An alias of type \"abbreviation\" can, in principle, be added for any code\n# point, although currently aliases of type \"correction\" do not have\n# any additional aliases of type \"abbreviation\". Such relationships\n# are not enforced by stability policies.\n#\n#-----------------------------------------------------------------\n\n0000;NULL;control\n0000;NUL;abbreviation\n0001;START OF HEADING;control\n0001;SOH;abbreviation\n0002;START OF TEXT;control\n0002;STX;abbreviation\n0003;END OF TEXT;control\n0003;ETX;abbreviation\n0004;END OF TRANSMISSION;control\n0004;EOT;abbreviation\n0005;ENQUIRY;control\n0005;ENQ;abbreviation\n0006;ACKNOWLEDGE;control\n0006;ACK;abbreviation\n\n# Note that no formal name alias for the ISO 6429 \"BELL\" is\n# provided for U+0007, because of the existing name collision\n# with U+1F514 BELL.\n\n0007;ALERT;control\n0007;BEL;abbreviation\n\n0008;BACKSPACE;control\n0008;BS;abbreviation\n0009;CHARACTER TABULATION;control\n0009;HORIZONTAL TABULATION;control\n0009;HT;abbreviation\n0009;TAB;abbreviation\n000A;LINE FEED;control\n000A;NEW LINE;control\n000A;END OF LINE;control\n000A;LF;abbreviation\n000A;NL;abbreviation\n000A;EOL;abbreviation\n000B;LINE TABULATION;control\n000B;VERTICAL TABULATION;control\n000B;VT;abbreviation\n000C;FORM FEED;control\n000C;FF;abbreviation\n000D;CARRIAGE RETURN;control\n000D;CR;abbreviation\n000E;SHIFT OUT;control\n000E;LOCKING-SHIFT ONE;control\n000E;SO;abbreviation\n000F;SHIFT IN;control\n000F;LOCKING-SHIFT ZERO;control\n000F;SI;abbreviation\n0010;DATA LINK ESCAPE;control\n0010;DLE;abbreviation\n0011;DEVICE CONTROL ONE;control\n0011;DC1;abbreviation\n0012;DEVICE CONTROL TWO;control\n0012;DC2;abbreviation\n0013;DEVICE CONTROL THREE;control\n0013;DC3;abbreviation\n0014;DEVICE CONTROL FOUR;control\n0014;DC4;abbreviation\n0015;NEGATIVE ACKNOWLEDGE;control\n0015;NAK;abbreviation\n0016;SYNCHRONOUS IDLE;control\n0016;SYN;abbreviation\n0017;END OF TRANSMISSION BLOCK;control\n0017;ETB;abbreviation\n0018;CANCEL;control\n0018;CAN;abbreviation\n0019;END OF MEDIUM;control\n0019;EOM;abbreviation\n001A;SUBSTITUTE;control\n001A;SUB;abbreviation\n001B;ESCAPE;control\n001B;ESC;abbreviation\n001C;INFORMATION SEPARATOR FOUR;control\n001C;FILE SEPARATOR;control\n001C;FS;abbreviation\n001D;INFORMATION SEPARATOR THREE;control\n001D;GROUP SEPARATOR;control\n001D;GS;abbreviation\n001E;INFORMATION SEPARATOR TWO;control\n001E;RECORD SEPARATOR;control\n001E;RS;abbreviation\n001F;INFORMATION SEPARATOR ONE;control\n001F;UNIT SEPARATOR;control\n001F;US;abbreviation\n0020;SP;abbreviation\n007F;DELETE;control\n007F;DEL;abbreviation\n\n# PADDING CHARACTER and HIGH OCTET PRESET represent\n# architectural concepts initially proposed for early\n# drafts of ISO/IEC 10646-1. They were never actually\n# approved or standardized: hence their designation\n# here as the \"figment\" type. Formal name aliases\n# (and corresponding abbreviations) for these code\n# points are included here because these names leaked\n# out from the draft documents and were published in\n# at least one RFC whose names for code points was\n# implemented in Perl regex expressions.\n\n0080;PADDING CHARACTER;figment\n0080;PAD;abbreviation\n0081;HIGH OCTET PRESET;figment\n0081;HOP;abbreviation\n\n0082;BREAK PERMITTED HERE;control\n0082;BPH;abbreviation\n0083;NO BREAK HERE;control\n0083;NBH;abbreviation\n0084;INDEX;control\n0084;IND;abbreviation\n0085;NEXT LINE;control\n0085;NEL;abbreviation\n0086;START OF SELECTED AREA;control\n0086;SSA;abbreviation\n0087;END OF SELECTED AREA;control\n0087;ESA;abbreviation\n0088;CHARACTER TABULATION SET;control\n0088;HORIZONTAL TABULATION SET;control\n0088;HTS;abbreviation\n0089;CHARACTER TABULATION WITH JUSTIFICATION;control\n0089;HORIZONTAL TABULATION WITH JUSTIFICATION;control\n0089;HTJ;abbreviation\n008A;LINE TABULATION SET;control\n008A;VERTICAL TABULATION SET;control\n008A;VTS;abbreviation\n008B;PARTIAL LINE FORWARD;control\n008B;PARTIAL LINE DOWN;control\n008B;PLD;abbreviation\n008C;PARTIAL LINE BACKWARD;control\n008C;PARTIAL LINE UP;control\n008C;PLU;abbreviation\n008D;REVERSE LINE FEED;control\n008D;REVERSE INDEX;control\n008D;RI;abbreviation\n008E;SINGLE SHIFT TWO;control\n008E;SINGLE-SHIFT-2;control\n008E;SS2;abbreviation\n008F;SINGLE SHIFT THREE;control\n008F;SINGLE-SHIFT-3;control\n008F;SS3;abbreviation\n0090;DEVICE CONTROL STRING;control\n0090;DCS;abbreviation\n0091;PRIVATE USE ONE;control\n0091;PRIVATE USE-1;control\n0091;PU1;abbreviation\n0092;PRIVATE USE TWO;control\n0092;PRIVATE USE-2;control\n0092;PU2;abbreviation\n0093;SET TRANSMIT STATE;control\n0093;STS;abbreviation\n0094;CANCEL CHARACTER;control\n0094;CCH;abbreviation\n0095;MESSAGE WAITING;control\n0095;MW;abbreviation\n0096;START OF GUARDED AREA;control\n0096;START OF PROTECTED AREA;control\n0096;SPA;abbreviation\n0097;END OF GUARDED AREA;control\n0097;END OF PROTECTED AREA;control\n0097;EPA;abbreviation\n0098;START OF STRING;control\n0098;SOS;abbreviation\n\n# SINGLE GRAPHIC CHARACTER INTRODUCER is another\n# architectural concept from early drafts of ISO/IEC 10646-1\n# which was never approved and standardized.\n\n0099;SINGLE GRAPHIC CHARACTER INTRODUCER;figment\n0099;SGC;abbreviation\n\n009A;SINGLE CHARACTER INTRODUCER;control\n009A;SCI;abbreviation\n009B;CONTROL SEQUENCE INTRODUCER;control\n009B;CSI;abbreviation\n009C;STRING TERMINATOR;control\n009C;ST;abbreviation\n009D;OPERATING SYSTEM COMMAND;control\n009D;OSC;abbreviation\n009E;PRIVACY MESSAGE;control\n009E;PM;abbreviation\n009F;APPLICATION PROGRAM COMMAND;control\n009F;APC;abbreviation\n00A0;NBSP;abbreviation\n00AD;SHY;abbreviation\n01A2;LATIN CAPITAL LETTER GHA;correction\n01A3;LATIN SMALL LETTER GHA;correction\n034F;CGJ;abbreviation\n061C;ALM;abbreviation\n0709;SYRIAC SUBLINEAR COLON SKEWED LEFT;correction\n0CDE;KANNADA LETTER LLLA;correction\n0E9D;LAO LETTER FO FON;correction\n0E9F;LAO LETTER FO FAY;correction\n0EA3;LAO LETTER RO;correction\n0EA5;LAO LETTER LO;correction\n0FD0;TIBETAN MARK BKA- SHOG GI MGO RGYAN;correction\n180B;FVS1;abbreviation\n180C;FVS2;abbreviation\n180D;FVS3;abbreviation\n180E;MVS;abbreviation\n200B;ZWSP;abbreviation\n200C;ZWNJ;abbreviation\n200D;ZWJ;abbreviation\n200E;LRM;abbreviation\n200F;RLM;abbreviation\n202A;LRE;abbreviation\n202B;RLE;abbreviation\n202C;PDF;abbreviation\n202D;LRO;abbreviation\n202E;RLO;abbreviation\n202F;NNBSP;abbreviation\n205F;MMSP;abbreviation\n2060;WJ;abbreviation\n2066;LRI;abbreviation\n2067;RLI;abbreviation\n2068;FSI;abbreviation\n2069;PDI;abbreviation\n2118;WEIERSTRASS ELLIPTIC FUNCTION;correction\n2448;MICR ON US SYMBOL;correction\n2449;MICR DASH SYMBOL;correction\n2B7A;LEFTWARDS TRIANGLE-HEADED ARROW WITH DOUBLE VERTICAL STROKE;correction\n2B7C;RIGHTWARDS TRIANGLE-HEADED ARROW WITH DOUBLE VERTICAL STROKE;correction\nA015;YI SYLLABLE ITERATION MARK;correction\nFE18;PRESENTATION FORM FOR VERTICAL RIGHT WHITE LENTICULAR BRACKET;correction\nFE00;VS1;abbreviation\nFE01;VS2;abbreviation\nFE02;VS3;abbreviation\nFE03;VS4;abbreviation\nFE04;VS5;abbreviation\nFE05;VS6;abbreviation\nFE06;VS7;abbreviation\nFE07;VS8;abbreviation\nFE08;VS9;abbreviation\nFE09;VS10;abbreviation\nFE0A;VS11;abbreviation\nFE0B;VS12;abbreviation\nFE0C;VS13;abbreviation\nFE0D;VS14;abbreviation\nFE0E;VS15;abbreviation\nFE0F;VS16;abbreviation\nFEFF;BYTE ORDER MARK;alternate\nFEFF;BOM;abbreviation\nFEFF;ZWNBSP;abbreviation\n122D4;CUNEIFORM SIGN NU11 TENU;correction\n122D5;CUNEIFORM SIGN NU11 OVER NU11 BUR OVER BUR;correction\n1D0C5;BYZANTINE MUSICAL SYMBOL FTHORA SKLIRON CHROMA VASIS;correction\nE0100;VS17;abbreviation\nE0101;VS18;abbreviation\nE0102;VS19;abbreviation\nE0103;VS20;abbreviation\nE0104;VS21;abbreviation\nE0105;VS22;abbreviation\nE0106;VS23;abbreviation\nE0107;VS24;abbreviation\nE0108;VS25;abbreviation\nE0109;VS26;abbreviation\nE010A;VS27;abbreviation\nE010B;VS28;abbreviation\nE010C;VS29;abbreviation\nE010D;VS30;abbreviation\nE010E;VS31;abbreviation\nE010F;VS32;abbreviation\nE0110;VS33;abbreviation\nE0111;VS34;abbreviation\nE0112;VS35;abbreviation\nE0113;VS36;abbreviation\nE0114;VS37;abbreviation\nE0115;VS38;abbreviation\nE0116;VS39;abbreviation\nE0117;VS40;abbreviation\nE0118;VS41;abbreviation\nE0119;VS42;abbreviation\nE011A;VS43;abbreviation\nE011B;VS44;abbreviation\nE011C;VS45;abbreviation\nE011D;VS46;abbreviation\nE011E;VS47;abbreviation\nE011F;VS48;abbreviation\nE0120;VS49;abbreviation\nE0121;VS50;abbreviation\nE0122;VS51;abbreviation\nE0123;VS52;abbreviation\nE0124;VS53;abbreviation\nE0125;VS54;abbreviation\nE0126;VS55;abbreviation\nE0127;VS56;abbreviation\nE0128;VS57;abbreviation\nE0129;VS58;abbreviation\nE012A;VS59;abbreviation\nE012B;VS60;abbreviation\nE012C;VS61;abbreviation\nE012D;VS62;abbreviation\nE012E;VS63;abbreviation\nE012F;VS64;abbreviation\nE0130;VS65;abbreviation\nE0131;VS66;abbreviation\nE0132;VS67;abbreviation\nE0133;VS68;abbreviation\nE0134;VS69;abbreviation\nE0135;VS70;abbreviation\nE0136;VS71;abbreviation\nE0137;VS72;abbreviation\nE0138;VS73;abbreviation\nE0139;VS74;abbreviation\nE013A;VS75;abbreviation\nE013B;VS76;abbreviation\nE013C;VS77;abbreviation\nE013D;VS78;abbreviation\nE013E;VS79;abbreviation\nE013F;VS80;abbreviation\nE0140;VS81;abbreviation\nE0141;VS82;abbreviation\nE0142;VS83;abbreviation\nE0143;VS84;abbreviation\nE0144;VS85;abbreviation\nE0145;VS86;abbreviation\nE0146;VS87;abbreviation\nE0147;VS88;abbreviation\nE0148;VS89;abbreviation\nE0149;VS90;abbreviation\nE014A;VS91;abbreviation\nE014B;VS92;abbreviation\nE014C;VS93;abbreviation\nE014D;VS94;abbreviation\nE014E;VS95;abbreviation\nE014F;VS96;abbreviation\nE0150;VS97;abbreviation\nE0151;VS98;abbreviation\nE0152;VS99;abbreviation\nE0153;VS100;abbreviation\nE0154;VS101;abbreviation\nE0155;VS102;abbreviation\nE0156;VS103;abbreviation\nE0157;VS104;abbreviation\nE0158;VS105;abbreviation\nE0159;VS106;abbreviation\nE015A;VS107;abbreviation\nE015B;VS108;abbreviation\nE015C;VS109;abbreviation\nE015D;VS110;abbreviation\nE015E;VS111;abbreviation\nE015F;VS112;abbreviation\nE0160;VS113;abbreviation\nE0161;VS114;abbreviation\nE0162;VS115;abbreviation\nE0163;VS116;abbreviation\nE0164;VS117;abbreviation\nE0165;VS118;abbreviation\nE0166;VS119;abbreviation\nE0167;VS120;abbreviation\nE0168;VS121;abbreviation\nE0169;VS122;abbreviation\nE016A;VS123;abbreviation\nE016B;VS124;abbreviation\nE016C;VS125;abbreviation\nE016D;VS126;abbreviation\nE016E;VS127;abbreviation\nE016F;VS128;abbreviation\nE0170;VS129;abbreviation\nE0171;VS130;abbreviation\nE0172;VS131;abbreviation\nE0173;VS132;abbreviation\nE0174;VS133;abbreviation\nE0175;VS134;abbreviation\nE0176;VS135;abbreviation\nE0177;VS136;abbreviation\nE0178;VS137;abbreviation\nE0179;VS138;abbreviation\nE017A;VS139;abbreviation\nE017B;VS140;abbreviation\nE017C;VS141;abbreviation\nE017D;VS142;abbreviation\nE017E;VS143;abbreviation\nE017F;VS144;abbreviation\nE0180;VS145;abbreviation\nE0181;VS146;abbreviation\nE0182;VS147;abbreviation\nE0183;VS148;abbreviation\nE0184;VS149;abbreviation\nE0185;VS150;abbreviation\nE0186;VS151;abbreviation\nE0187;VS152;abbreviation\nE0188;VS153;abbreviation\nE0189;VS154;abbreviation\nE018A;VS155;abbreviation\nE018B;VS156;abbreviation\nE018C;VS157;abbreviation\nE018D;VS158;abbreviation\nE018E;VS159;abbreviation\nE018F;VS160;abbreviation\nE0190;VS161;abbreviation\nE0191;VS162;abbreviation\nE0192;VS163;abbreviation\nE0193;VS164;abbreviation\nE0194;VS165;abbreviation\nE0195;VS166;abbreviation\nE0196;VS167;abbreviation\nE0197;VS168;abbreviation\nE0198;VS169;abbreviation\nE0199;VS170;abbreviation\nE019A;VS171;abbreviation\nE019B;VS172;abbreviation\nE019C;VS173;abbreviation\nE019D;VS174;abbreviation\nE019E;VS175;abbreviation\nE019F;VS176;abbreviation\nE01A0;VS177;abbreviation\nE01A1;VS178;abbreviation\nE01A2;VS179;abbreviation\nE01A3;VS180;abbreviation\nE01A4;VS181;abbreviation\nE01A5;VS182;abbreviation\nE01A6;VS183;abbreviation\nE01A7;VS184;abbreviation\nE01A8;VS185;abbreviation\nE01A9;VS186;abbreviation\nE01AA;VS187;abbreviation\nE01AB;VS188;abbreviation\nE01AC;VS189;abbreviation\nE01AD;VS190;abbreviation\nE01AE;VS191;abbreviation\nE01AF;VS192;abbreviation\nE01B0;VS193;abbreviation\nE01B1;VS194;abbreviation\nE01B2;VS195;abbreviation\nE01B3;VS196;abbreviation\nE01B4;VS197;abbreviation\nE01B5;VS198;abbreviation\nE01B6;VS199;abbreviation\nE01B7;VS200;abbreviation\nE01B8;VS201;abbreviation\nE01B9;VS202;abbreviation\nE01BA;VS203;abbreviation\nE01BB;VS204;abbreviation\nE01BC;VS205;abbreviation\nE01BD;VS206;abbreviation\nE01BE;VS207;abbreviation\nE01BF;VS208;abbreviation\nE01C0;VS209;abbreviation\nE01C1;VS210;abbreviation\nE01C2;VS211;abbreviation\nE01C3;VS212;abbreviation\nE01C4;VS213;abbreviation\nE01C5;VS214;abbreviation\nE01C6;VS215;abbreviation\nE01C7;VS216;abbreviation\nE01C8;VS217;abbreviation\nE01C9;VS218;abbreviation\nE01CA;VS219;abbreviation\nE01CB;VS220;abbreviation\nE01CC;VS221;abbreviation\nE01CD;VS222;abbreviation\nE01CE;VS223;abbreviation\nE01CF;VS224;abbreviation\nE01D0;VS225;abbreviation\nE01D1;VS226;abbreviation\nE01D2;VS227;abbreviation\nE01D3;VS228;abbreviation\nE01D4;VS229;abbreviation\nE01D5;VS230;abbreviation\nE01D6;VS231;abbreviation\nE01D7;VS232;abbreviation\nE01D8;VS233;abbreviation\nE01D9;VS234;abbreviation\nE01DA;VS235;abbreviation\nE01DB;VS236;abbreviation\nE01DC;VS237;abbreviation\nE01DD;VS238;abbreviation\nE01DE;VS239;abbreviation\nE01DF;VS240;abbreviation\nE01E0;VS241;abbreviation\nE01E1;VS242;abbreviation\nE01E2;VS243;abbreviation\nE01E3;VS244;abbreviation\nE01E4;VS245;abbreviation\nE01E5;VS246;abbreviation\nE01E6;VS247;abbreviation\nE01E7;VS248;abbreviation\nE01E8;VS249;abbreviation\nE01E9;VS250;abbreviation\nE01EA;VS251;abbreviation\nE01EB;VS252;abbreviation\nE01EC;VS253;abbreviation\nE01ED;VS254;abbreviation\nE01EE;VS255;abbreviation\nE01EF;VS256;abbreviation\n\n# EOF\n";
        ALIAS_MAP = function () {
            var ans, line, parts, code_point;
            ans = {};
            var ρσ_Iter10 = ρσ_Iterable(DB.split("\n"));
            for (var ρσ_Index10 = 0; ρσ_Index10 < ρσ_Iter10.length; ρσ_Index10++) {
                line = ρσ_Iter10[ρσ_Index10];
                line = line.trim();
                if (!line || line[0] === "#") {
                    continue;
                }
                parts = line.split(";");
                if (parts.length >= 2) {
                    code_point = parseInt(parts[0], 16);
                    if (code_point !== undefined && parts[1]) {
                        ans[ρσ_bound_index(parts[1].toLowerCase(), ans)] = code_point;
                    }
                }
            }
            return ans;
        }();
        ρσ_modules.unicode_aliases.DB = DB;
        ρσ_modules.unicode_aliases.ALIAS_MAP = ALIAS_MAP;
    })();

    (function(){
        var __name__ = "ast";
        var noop = ρσ_modules.utils.noop;

        function is_node_type(node, typ) {
            return node instanceof typ;
        };
        Object.defineProperties(is_node_type, {
            __argnames__ : {value: ["node", "typ"]}
        });

        function AST() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST.prototype.__init__.apply(this, arguments);
        }
        AST.prototype.__init__ = function __init__(initializer) {
            var self = this;
            var obj;
            if (initializer) {
                obj = self;
                while (true) {
                    obj = Object.getPrototypeOf(obj);
                    if (obj === null) {
                        break;
                    }
                    for (var i in obj.properties) {
                        self[i] = initializer[i];
                    }
                }
            }
        };
        Object.defineProperties(AST.prototype.__init__, {
            __argnames__ : {value: ["initializer"]}
        });
        AST.__argnames__ = AST.prototype.__init__.__argnames__;
        AST.__handles_kwarg_interpolation__ = AST.prototype.__init__.__handles_kwarg_interpolation__;
        AST.prototype.clone = function clone() {
            var self = this;
            return new self.constructor(self);
        };
        Object.defineProperties(AST.prototype.clone, {
            __argnames__ : {value: []}
        });
        AST.prototype.__repr__ = function __repr__ () {
                        return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST.prototype.__str__ = function __str__ () {
            return this.__repr__();
        };
        Object.defineProperty(AST.prototype, "__bases__", {value: []});
        AST.prototype.properties = Object.create(null);

        function AST_Token() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Token.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Token, AST);
        AST_Token.prototype.__init__ = function __init__ () {
            AST.prototype.__init__ && AST.prototype.__init__.apply(this, arguments);
        };
        AST_Token.prototype.__repr__ = function __repr__ () {
            if(AST.prototype.__repr__) return AST.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Token.prototype.__str__ = function __str__ () {
            if(AST.prototype.__str__) return AST.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Token.prototype, "__bases__", {value: [AST]});
        AST_Token.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["type"] = "The type of the token";
            ρσ_d["value"] = "The value of the token";
            ρσ_d["line"] = "The line number at which the token occurs";
            ρσ_d["col"] = "The column number at which the token occurs";
            ρσ_d["pos"] = "";
            ρσ_d["endpos"] = "";
            ρσ_d["nlb"] = "True iff there was a newline before this token";
            ρσ_d["comments_before"] = "True iff there were comments before this token";
            ρσ_d["file"] = "The filename in which this token occurs";
            return ρσ_d;
        }).call(this);

        function AST_Node() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Node.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Node, AST);
        AST_Node.prototype.__init__ = function __init__ () {
            AST.prototype.__init__ && AST.prototype.__init__.apply(this, arguments);
        };
        AST_Node.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self);
        };
        Object.defineProperties(AST_Node.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Node.prototype.walk = function walk(visitor) {
            var self = this;
            return self._walk(visitor);
        };
        Object.defineProperties(AST_Node.prototype.walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Node.prototype._dump = function _dump() {
            var self = this;
            var depth = (arguments[0] === undefined || ( 0 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true)) ? _dump.__defaults__.depth : arguments[0];
            var omit = (arguments[1] === undefined || ( 1 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true)) ? _dump.__defaults__.omit : arguments[1];
            var offset = (arguments[2] === undefined || ( 2 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true)) ? _dump.__defaults__.offset : arguments[2];
            var include_name = (arguments[3] === undefined || ( 3 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true)) ? _dump.__defaults__.include_name : arguments[3];
            var ρσ_kwargs_obj = arguments[arguments.length-1];
            if (ρσ_kwargs_obj === null || typeof ρσ_kwargs_obj !== "object" || ρσ_kwargs_obj [ρσ_kwargs_symbol] !== true) ρσ_kwargs_obj = {};
            if (Object.prototype.hasOwnProperty.call(ρσ_kwargs_obj, "depth")){
                depth = ρσ_kwargs_obj.depth;
            }
            if (Object.prototype.hasOwnProperty.call(ρσ_kwargs_obj, "omit")){
                omit = ρσ_kwargs_obj.omit;
            }
            if (Object.prototype.hasOwnProperty.call(ρσ_kwargs_obj, "offset")){
                offset = ρσ_kwargs_obj.offset;
            }
            if (Object.prototype.hasOwnProperty.call(ρσ_kwargs_obj, "include_name")){
                include_name = ρσ_kwargs_obj.include_name;
            }
            var p, reset, yellow, blue, green, red, magenta, pad, element, tname, property, key;
            p = console.log;
            reset = "\u001b[0m";
            yellow = "\u001b[33m";
            blue = "\u001b[34m";
            green = "\u001b[32m";
            red = "\u001b[31m";
            magenta = "\u001b[35m";
            pad = new Array(offset + 1).join("  ");
            if (include_name) {
                p(pad + yellow + self.constructor.name.slice(4) + reset);
            }
            var ρσ_Iter11 = ρσ_Iterable(self);
            for (var ρσ_Index11 = 0; ρσ_Index11 < ρσ_Iter11.length; ρσ_Index11++) {
                key = ρσ_Iter11[ρσ_Index11];
                if (ρσ_in(key, omit)) {
                    continue;
                }
                if (Array.isArray(self[(typeof key === "number" && key < 0) ? self.length + key : key])) {
                    if (self[(typeof key === "number" && key < 0) ? self.length + key : key].length) {
                        p(pad + " " + blue + key + ": " + reset + "[");
                        if (depth > 1) {
                            var ρσ_Iter12 = ρσ_Iterable(self[(typeof key === "number" && key < 0) ? self.length + key : key]);
                            for (var ρσ_Index12 = 0; ρσ_Index12 < ρσ_Iter12.length; ρσ_Index12++) {
                                element = ρσ_Iter12[ρσ_Index12];
                                element._dump(depth - 1, omit, offset + 1, true);
                            }
                        } else {
                            var ρσ_Iter13 = ρσ_Iterable(self[(typeof key === "number" && key < 0) ? self.length + key : key]);
                            for (var ρσ_Index13 = 0; ρσ_Index13 < ρσ_Iter13.length; ρσ_Index13++) {
                                element = ρσ_Iter13[ρσ_Index13];
                                p(pad + "   " + yellow + element.constructor.name.slice(4) + reset);
                            }
                        }
                        p(pad + " ]");
                    } else {
                        p(pad + " " + blue + key + ": " + reset + "[]");
                    }
                } else if (self[(typeof key === "number" && key < 0) ? self.length + key : key]) {
                    if (is_node_type(self[(typeof key === "number" && key < 0) ? self.length + key : key], AST)) {
                        tname = self[(typeof key === "number" && key < 0) ? self.length + key : key].constructor.name.slice(4);
                        if (tname === "Token") {
                            p(pad + " " + blue + key + ": " + magenta + tname + reset);
                            var ρσ_Iter14 = ρσ_Iterable(self[(typeof key === "number" && key < 0) ? self.length + key : key]);
                            for (var ρσ_Index14 = 0; ρσ_Index14 < ρσ_Iter14.length; ρσ_Index14++) {
                                property = ρσ_Iter14[ρσ_Index14];
                                p(pad + "   " + blue + property + ": " + reset + (ρσ_expr_temp = self[(typeof key === "number" && key < 0) ? self.length + key : key])[(typeof property === "number" && property < 0) ? ρσ_expr_temp.length + property : property]);
                            }
                        } else {
                            p(pad + " " + blue + key + ": " + yellow + tname + reset);
                            if (depth > 1) {
                                self[(typeof key === "number" && key < 0) ? self.length + key : key]._dump(depth - 1, omit, offset + 1, false);
                            }
                        }
                    } else if (typeof self[(typeof key === "number" && key < 0) ? self.length + key : key] === "string") {
                        p(pad + " " + blue + key + ": " + green + "\"" + self[(typeof key === "number" && key < 0) ? self.length + key : key] + "\"" + reset);
                    } else if (typeof self[(typeof key === "number" && key < 0) ? self.length + key : key] === "number") {
                        p(pad + " " + blue + key + ": " + green + self[(typeof key === "number" && key < 0) ? self.length + key : key] + reset);
                    } else {
                        p(pad + " " + blue + key + ": " + red + self[(typeof key === "number" && key < 0) ? self.length + key : key] + reset);
                    }
                } else {
                    p(pad + " " + blue + key + ": " + reset + self[(typeof key === "number" && key < 0) ? self.length + key : key]);
                }
            }
        };
        Object.defineProperties(AST_Node.prototype._dump, {
            __defaults__ : {value: {depth:100, omit:(function(){
                var s = ρσ_set();
                s.jsset.add("start");
                s.jsset.add("end");
                return s;
            })(), offset:0, include_name:true}},
            __handles_kwarg_interpolation__ : {value: true},
            __argnames__ : {value: ["depth", "omit", "offset", "include_name"]}
        });
        AST_Node.prototype.dump = function dump() {
            var self = this;
            var depth = (arguments[0] === undefined || ( 0 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true)) ? dump.__defaults__.depth : arguments[0];
            var omit = (arguments[1] === undefined || ( 1 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true)) ? dump.__defaults__.omit : arguments[1];
            var ρσ_kwargs_obj = arguments[arguments.length-1];
            if (ρσ_kwargs_obj === null || typeof ρσ_kwargs_obj !== "object" || ρσ_kwargs_obj [ρσ_kwargs_symbol] !== true) ρσ_kwargs_obj = {};
            if (Object.prototype.hasOwnProperty.call(ρσ_kwargs_obj, "depth")){
                depth = ρσ_kwargs_obj.depth;
            }
            if (Object.prototype.hasOwnProperty.call(ρσ_kwargs_obj, "omit")){
                omit = ρσ_kwargs_obj.omit;
            }
            return self._dump(depth, omit, 0, true);
        };
        Object.defineProperties(AST_Node.prototype.dump, {
            __defaults__ : {value: {depth:2, omit:Object.create(null)}},
            __handles_kwarg_interpolation__ : {value: true},
            __argnames__ : {value: ["depth", "omit"]}
        });
        AST_Node.prototype.__repr__ = function __repr__ () {
            if(AST.prototype.__repr__) return AST.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Node.prototype.__str__ = function __str__ () {
            if(AST.prototype.__str__) return AST.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Node.prototype, "__bases__", {value: [AST]});
        AST_Node.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["start"] = "[AST_Token] The first token of this node";
            ρσ_d["end"] = "[AST_Token] The last token of this node";
            return ρσ_d;
        }).call(this);

        function AST_Statement() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Statement.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Statement, AST_Node);
        AST_Statement.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_Statement.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Statement.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Statement.prototype, "__bases__", {value: [AST_Node]});

        function AST_Debugger() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Debugger.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Debugger, AST_Statement);
        AST_Debugger.prototype.__init__ = function __init__ () {
            AST_Statement.prototype.__init__ && AST_Statement.prototype.__init__.apply(this, arguments);
        };
        AST_Debugger.prototype.__repr__ = function __repr__ () {
            if(AST_Statement.prototype.__repr__) return AST_Statement.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Debugger.prototype.__str__ = function __str__ () {
            if(AST_Statement.prototype.__str__) return AST_Statement.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Debugger.prototype, "__bases__", {value: [AST_Statement]});

        function AST_Directive() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Directive.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Directive, AST_Statement);
        AST_Directive.prototype.__init__ = function __init__ () {
            AST_Statement.prototype.__init__ && AST_Statement.prototype.__init__.apply(this, arguments);
        };
        AST_Directive.prototype.__repr__ = function __repr__ () {
            if(AST_Statement.prototype.__repr__) return AST_Statement.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Directive.prototype.__str__ = function __str__ () {
            if(AST_Statement.prototype.__str__) return AST_Statement.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Directive.prototype, "__bases__", {value: [AST_Statement]});
        AST_Directive.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["value"] = "[string] The value of this directive as a plain string (it's not an AST_String!)";
            ρσ_d["scope"] = "[AST_Scope/S] The scope that this directive affects";
            return ρσ_d;
        }).call(this);

        function AST_SimpleStatement() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_SimpleStatement.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_SimpleStatement, AST_Statement);
        AST_SimpleStatement.prototype.__init__ = function __init__ () {
            AST_Statement.prototype.__init__ && AST_Statement.prototype.__init__.apply(this, arguments);
        };
        AST_SimpleStatement.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.body._walk(visitor);
            });
        };
        Object.defineProperties(AST_SimpleStatement.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_SimpleStatement.prototype.__repr__ = function __repr__ () {
            if(AST_Statement.prototype.__repr__) return AST_Statement.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_SimpleStatement.prototype.__str__ = function __str__ () {
            if(AST_Statement.prototype.__str__) return AST_Statement.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_SimpleStatement.prototype, "__bases__", {value: [AST_Statement]});
        AST_SimpleStatement.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["body"] = "[AST_Node] an expression node (should not be instanceof AST_Statement)";
            return ρσ_d;
        }).call(this);

        function AST_Assert() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Assert.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Assert, AST_Statement);
        AST_Assert.prototype.__init__ = function __init__ () {
            AST_Statement.prototype.__init__ && AST_Statement.prototype.__init__.apply(this, arguments);
        };
        AST_Assert.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.condition._walk(visitor);
                if (self.message) {
                    self.message._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_Assert.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Assert.prototype.__repr__ = function __repr__ () {
            if(AST_Statement.prototype.__repr__) return AST_Statement.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Assert.prototype.__str__ = function __str__ () {
            if(AST_Statement.prototype.__str__) return AST_Statement.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Assert.prototype, "__bases__", {value: [AST_Statement]});
        AST_Assert.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["condition"] = "[AST_Node] the expression that should be tested";
            ρσ_d["message"] = "[AST_Node*] the expression that is the error message or None";
            return ρσ_d;
        }).call(this);

        function walk_body(node, visitor) {
            var stat;
            if (is_node_type(node.body, AST_Statement)) {
                node.body._walk(visitor);
            } else if (node.body) {
                var ρσ_Iter15 = ρσ_Iterable(node.body);
                for (var ρσ_Index15 = 0; ρσ_Index15 < ρσ_Iter15.length; ρσ_Index15++) {
                    stat = ρσ_Iter15[ρσ_Index15];
                    stat._walk(visitor);
                }
            }
        };
        Object.defineProperties(walk_body, {
            __argnames__ : {value: ["node", "visitor"]}
        });

        function AST_Block() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Block.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Block, AST_Statement);
        AST_Block.prototype.__init__ = function __init__ () {
            AST_Statement.prototype.__init__ && AST_Statement.prototype.__init__.apply(this, arguments);
        };
        AST_Block.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                walk_body(self, visitor);
            });
        };
        Object.defineProperties(AST_Block.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Block.prototype.__repr__ = function __repr__ () {
            if(AST_Statement.prototype.__repr__) return AST_Statement.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Block.prototype.__str__ = function __str__ () {
            if(AST_Statement.prototype.__str__) return AST_Statement.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Block.prototype, "__bases__", {value: [AST_Statement]});
        AST_Block.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["body"] = "[AST_Statement*] an array of statements";
            return ρσ_d;
        }).call(this);

        function AST_BlockStatement() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_BlockStatement.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_BlockStatement, AST_Block);
        AST_BlockStatement.prototype.__init__ = function __init__ () {
            AST_Block.prototype.__init__ && AST_Block.prototype.__init__.apply(this, arguments);
        };
        AST_BlockStatement.prototype.__repr__ = function __repr__ () {
            if(AST_Block.prototype.__repr__) return AST_Block.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_BlockStatement.prototype.__str__ = function __str__ () {
            if(AST_Block.prototype.__str__) return AST_Block.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_BlockStatement.prototype, "__bases__", {value: [AST_Block]});

        function AST_EmptyStatement() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_EmptyStatement.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_EmptyStatement, AST_Statement);
        AST_EmptyStatement.prototype.__init__ = function __init__ () {
            AST_Statement.prototype.__init__ && AST_Statement.prototype.__init__.apply(this, arguments);
        };
        AST_EmptyStatement.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self);
        };
        Object.defineProperties(AST_EmptyStatement.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_EmptyStatement.prototype.__repr__ = function __repr__ () {
            if(AST_Statement.prototype.__repr__) return AST_Statement.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_EmptyStatement.prototype.__str__ = function __str__ () {
            if(AST_Statement.prototype.__str__) return AST_Statement.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_EmptyStatement.prototype, "__bases__", {value: [AST_Statement]});
        AST_EmptyStatement.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["stype"] = "[string] the type of empty statement. Is ; for semicolons";
            return ρσ_d;
        }).call(this);

        function AST_StatementWithBody() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_StatementWithBody.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_StatementWithBody, AST_Statement);
        AST_StatementWithBody.prototype.__init__ = function __init__ () {
            AST_Statement.prototype.__init__ && AST_Statement.prototype.__init__.apply(this, arguments);
        };
        AST_StatementWithBody.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.body._walk(visitor);
            });
        };
        Object.defineProperties(AST_StatementWithBody.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_StatementWithBody.prototype.__repr__ = function __repr__ () {
            if(AST_Statement.prototype.__repr__) return AST_Statement.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_StatementWithBody.prototype.__str__ = function __str__ () {
            if(AST_Statement.prototype.__str__) return AST_Statement.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_StatementWithBody.prototype, "__bases__", {value: [AST_Statement]});
        AST_StatementWithBody.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["body"] = "[AST_Statement] the body; this should always be present, even if it's an AST_EmptyStatement";
            return ρσ_d;
        }).call(this);

        function AST_DWLoop() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_DWLoop.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_DWLoop, AST_StatementWithBody);
        AST_DWLoop.prototype.__init__ = function __init__ () {
            AST_StatementWithBody.prototype.__init__ && AST_StatementWithBody.prototype.__init__.apply(this, arguments);
        };
        AST_DWLoop.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.condition._walk(visitor);
                self.body._walk(visitor);
            });
        };
        Object.defineProperties(AST_DWLoop.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_DWLoop.prototype.__repr__ = function __repr__ () {
            if(AST_StatementWithBody.prototype.__repr__) return AST_StatementWithBody.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_DWLoop.prototype.__str__ = function __str__ () {
            if(AST_StatementWithBody.prototype.__str__) return AST_StatementWithBody.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_DWLoop.prototype, "__bases__", {value: [AST_StatementWithBody]});
        AST_DWLoop.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["condition"] = "[AST_Node] the loop condition.  Should not be instanceof AST_Statement";
            return ρσ_d;
        }).call(this);

        function AST_Do() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Do.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Do, AST_DWLoop);
        AST_Do.prototype.__init__ = function __init__ () {
            AST_DWLoop.prototype.__init__ && AST_DWLoop.prototype.__init__.apply(this, arguments);
        };
        AST_Do.prototype.__repr__ = function __repr__ () {
            if(AST_DWLoop.prototype.__repr__) return AST_DWLoop.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Do.prototype.__str__ = function __str__ () {
            if(AST_DWLoop.prototype.__str__) return AST_DWLoop.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Do.prototype, "__bases__", {value: [AST_DWLoop]});

        function AST_While() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_While.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_While, AST_DWLoop);
        AST_While.prototype.__init__ = function __init__ () {
            AST_DWLoop.prototype.__init__ && AST_DWLoop.prototype.__init__.apply(this, arguments);
        };
        AST_While.prototype.__repr__ = function __repr__ () {
            if(AST_DWLoop.prototype.__repr__) return AST_DWLoop.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_While.prototype.__str__ = function __str__ () {
            if(AST_DWLoop.prototype.__str__) return AST_DWLoop.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_While.prototype, "__bases__", {value: [AST_DWLoop]});

        function AST_ForIn() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_ForIn.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_ForIn, AST_StatementWithBody);
        AST_ForIn.prototype.__init__ = function __init__ () {
            AST_StatementWithBody.prototype.__init__ && AST_StatementWithBody.prototype.__init__.apply(this, arguments);
        };
        AST_ForIn.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.init._walk(visitor);
                if (self.name) self.name._walk(visitor);
                self.object._walk(visitor);
                if (self.body) {
                    self.body._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_ForIn.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_ForIn.prototype.__repr__ = function __repr__ () {
            if(AST_StatementWithBody.prototype.__repr__) return AST_StatementWithBody.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_ForIn.prototype.__str__ = function __str__ () {
            if(AST_StatementWithBody.prototype.__str__) return AST_StatementWithBody.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_ForIn.prototype, "__bases__", {value: [AST_StatementWithBody]});
        AST_ForIn.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["init"] = "[AST_Node] the `for/in` initialization code";
            ρσ_d["name"] = "[AST_SymbolRef?] the loop variable, only if `init` is AST_Var";
            ρσ_d["object"] = "[AST_Node] the object that we're looping through";
            return ρσ_d;
        }).call(this);

        function AST_ForJS() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_ForJS.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_ForJS, AST_StatementWithBody);
        AST_ForJS.prototype.__init__ = function __init__ () {
            AST_StatementWithBody.prototype.__init__ && AST_StatementWithBody.prototype.__init__.apply(this, arguments);
        };
        AST_ForJS.prototype.__repr__ = function __repr__ () {
            if(AST_StatementWithBody.prototype.__repr__) return AST_StatementWithBody.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_ForJS.prototype.__str__ = function __str__ () {
            if(AST_StatementWithBody.prototype.__str__) return AST_StatementWithBody.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_ForJS.prototype, "__bases__", {value: [AST_StatementWithBody]});
        AST_ForJS.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["condition"] = "[AST_Verbatim] raw JavaScript conditional";
            return ρσ_d;
        }).call(this);

        function AST_ListComprehension() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_ListComprehension.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_ListComprehension, AST_ForIn);
        AST_ListComprehension.prototype.__init__ = function __init__ () {
            AST_ForIn.prototype.__init__ && AST_ForIn.prototype.__init__.apply(this, arguments);
        };
        AST_ListComprehension.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.init._walk(visitor);
                self.object._walk(visitor);
                self.statement._walk(visitor);
                if (self.condition) self.condition._walk(visitor);
            });
        };
        Object.defineProperties(AST_ListComprehension.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_ListComprehension.prototype.__repr__ = function __repr__ () {
            if(AST_ForIn.prototype.__repr__) return AST_ForIn.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_ListComprehension.prototype.__str__ = function __str__ () {
            if(AST_ForIn.prototype.__str__) return AST_ForIn.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_ListComprehension.prototype, "__bases__", {value: [AST_ForIn]});
        AST_ListComprehension.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["condition"] = "[AST_Node] the `if` condition";
            ρσ_d["statement"] = "[AST_Node] statement to perform on each element before returning it";
            return ρσ_d;
        }).call(this);

        function AST_SetComprehension() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_SetComprehension.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_SetComprehension, AST_ListComprehension);
        AST_SetComprehension.prototype.__init__ = function __init__ () {
            AST_ListComprehension.prototype.__init__ && AST_ListComprehension.prototype.__init__.apply(this, arguments);
        };
        AST_SetComprehension.prototype.__repr__ = function __repr__ () {
            if(AST_ListComprehension.prototype.__repr__) return AST_ListComprehension.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_SetComprehension.prototype.__str__ = function __str__ () {
            if(AST_ListComprehension.prototype.__str__) return AST_ListComprehension.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_SetComprehension.prototype, "__bases__", {value: [AST_ListComprehension]});

        function AST_DictComprehension() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_DictComprehension.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_DictComprehension, AST_ListComprehension);
        AST_DictComprehension.prototype.__init__ = function __init__ () {
            AST_ListComprehension.prototype.__init__ && AST_ListComprehension.prototype.__init__.apply(this, arguments);
        };
        AST_DictComprehension.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.init._walk(visitor);
                self.object._walk(visitor);
                self.statement._walk(visitor);
                self.value_statement._walk(visitor);
                if (self.condition) self.condition._walk(visitor);
            });
        };
        Object.defineProperties(AST_DictComprehension.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_DictComprehension.prototype.__repr__ = function __repr__ () {
            if(AST_ListComprehension.prototype.__repr__) return AST_ListComprehension.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_DictComprehension.prototype.__str__ = function __str__ () {
            if(AST_ListComprehension.prototype.__str__) return AST_ListComprehension.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_DictComprehension.prototype, "__bases__", {value: [AST_ListComprehension]});
        AST_DictComprehension.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["value_statement"] = "[AST_Node] statement to perform on each value before returning it";
            ρσ_d["is_pydict"] = "[bool] True if this comprehension is for a python dict";
            ρσ_d["is_jshash"] = "[bool] True if this comprehension is for a js hash";
            return ρσ_d;
        }).call(this);

        function AST_GeneratorComprehension() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_GeneratorComprehension.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_GeneratorComprehension, AST_ListComprehension);
        AST_GeneratorComprehension.prototype.__init__ = function __init__ () {
            AST_ListComprehension.prototype.__init__ && AST_ListComprehension.prototype.__init__.apply(this, arguments);
        };
        AST_GeneratorComprehension.prototype.__repr__ = function __repr__ () {
            if(AST_ListComprehension.prototype.__repr__) return AST_ListComprehension.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_GeneratorComprehension.prototype.__str__ = function __str__ () {
            if(AST_ListComprehension.prototype.__str__) return AST_ListComprehension.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_GeneratorComprehension.prototype, "__bases__", {value: [AST_ListComprehension]});

        function AST_With() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_With.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_With, AST_StatementWithBody);
        AST_With.prototype.__init__ = function __init__ () {
            AST_StatementWithBody.prototype.__init__ && AST_StatementWithBody.prototype.__init__.apply(this, arguments);
        };
        AST_With.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                var exp;
                var ρσ_Iter16 = ρσ_Iterable(self.clauses);
                for (var ρσ_Index16 = 0; ρσ_Index16 < ρσ_Iter16.length; ρσ_Index16++) {
                    exp = ρσ_Iter16[ρσ_Index16];
                    exp._walk(visitor);
                }
                self.body._walk(visitor);
            });
        };
        Object.defineProperties(AST_With.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_With.prototype.__repr__ = function __repr__ () {
            if(AST_StatementWithBody.prototype.__repr__) return AST_StatementWithBody.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_With.prototype.__str__ = function __str__ () {
            if(AST_StatementWithBody.prototype.__str__) return AST_StatementWithBody.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_With.prototype, "__bases__", {value: [AST_StatementWithBody]});
        AST_With.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["clauses"] = "[AST_WithClause*] the `with` clauses (comma separated)";
            return ρσ_d;
        }).call(this);

        function AST_WithClause() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_WithClause.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_WithClause, AST_Node);
        AST_WithClause.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_WithClause.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.expression._walk(visitor);
                if (self.alias) {
                    self.alias._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_WithClause.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_WithClause.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_WithClause.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_WithClause.prototype, "__bases__", {value: [AST_Node]});
        AST_WithClause.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["expression"] = "[AST_Node] the expression";
            ρσ_d["alias"] = "[AST_SymbolAlias?] optional alias for this expression";
            return ρσ_d;
        }).call(this);

        function AST_Scope() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Scope.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Scope, AST_Block);
        AST_Scope.prototype.__init__ = function __init__ () {
            AST_Block.prototype.__init__ && AST_Block.prototype.__init__.apply(this, arguments);
        };
        AST_Scope.prototype.__repr__ = function __repr__ () {
            if(AST_Block.prototype.__repr__) return AST_Block.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Scope.prototype.__str__ = function __str__ () {
            if(AST_Block.prototype.__str__) return AST_Block.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Scope.prototype, "__bases__", {value: [AST_Block]});
        AST_Scope.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["localvars"] = "[SymbolDef*] list of variables local to this scope";
            ρσ_d["docstrings"] = "[AST_String*] list of docstrings for this scope";
            return ρσ_d;
        }).call(this);

        function AST_Toplevel() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Toplevel.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Toplevel, AST_Scope);
        AST_Toplevel.prototype.__init__ = function __init__ () {
            AST_Scope.prototype.__init__ && AST_Scope.prototype.__init__.apply(this, arguments);
        };
        AST_Toplevel.prototype.__repr__ = function __repr__ () {
            if(AST_Scope.prototype.__repr__) return AST_Scope.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Toplevel.prototype.__str__ = function __str__ () {
            if(AST_Scope.prototype.__str__) return AST_Scope.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Toplevel.prototype, "__bases__", {value: [AST_Scope]});
        AST_Toplevel.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["globals"] = "[Object/S] a map of name -> SymbolDef for all undeclared names";
            ρσ_d["baselib"] = "[Object/s] a collection of used parts of baselib";
            ρσ_d["imports"] = "[Object/S] a map of module_id->AST_Toplevel for all imported modules (this represents all imported modules across all source files)";
            ρσ_d["imported_module_ids"] = "[string*] a list of module ids that were imported by this module, specifically";
            ρσ_d["nonlocalvars"] = "[String*] a list of all non-local variable names (names that come from the global scope)";
            ρσ_d["shebang"] = "[string] If #! line is present, it will be stored here";
            ρσ_d["import_order"] = "[number] The global order in which this scope was imported";
            ρσ_d["module_id"] = "[string] The id of this module";
            ρσ_d["exports"] = "[SymbolDef*] list of names exported from this module";
            ρσ_d["classes"] = "[Object/S] a map of class names to AST_Class for classes defined in this module";
            ρσ_d["filename"] = "[string] The absolute path to the file from which this module was read";
            ρσ_d["srchash"] = "[string] SHA1 hash of source code, used for caching";
            return ρσ_d;
        }).call(this);

        function AST_Import() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Import.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Import, AST_Statement);
        AST_Import.prototype.__init__ = function __init__ () {
            AST_Statement.prototype.__init__ && AST_Statement.prototype.__init__.apply(this, arguments);
        };
        AST_Import.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                var arg;
                if (self.alias) {
                    self.alias._walk(visitor);
                }
                if (self.argnames) {
                    var ρσ_Iter17 = ρσ_Iterable(self.argnames);
                    for (var ρσ_Index17 = 0; ρσ_Index17 < ρσ_Iter17.length; ρσ_Index17++) {
                        arg = ρσ_Iter17[ρσ_Index17];
                        arg._walk(visitor);
                    }
                }
            });
        };
        Object.defineProperties(AST_Import.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Import.prototype.__repr__ = function __repr__ () {
            if(AST_Statement.prototype.__repr__) return AST_Statement.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Import.prototype.__str__ = function __str__ () {
            if(AST_Statement.prototype.__str__) return AST_Statement.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Import.prototype, "__bases__", {value: [AST_Statement]});
        AST_Import.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["module"] = "[AST_SymbolVar] name of the module we're importing";
            ρσ_d["key"] = "[string] The key by which this module is stored in the global modules mapping";
            ρσ_d["alias"] = "[AST_SymbolAlias] The name this module is imported as, can be None. For import x as y statements.";
            ρσ_d["argnames"] = "[AST_ImportedVar*] names of objects to be imported";
            ρσ_d["body"] = "[AST_TopLevel] parsed contents of the imported file";
            return ρσ_d;
        }).call(this);

        function AST_Imports() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Imports.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Imports, AST_Statement);
        AST_Imports.prototype.__init__ = function __init__ () {
            AST_Statement.prototype.__init__ && AST_Statement.prototype.__init__.apply(this, arguments);
        };
        AST_Imports.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                var imp;
                var ρσ_Iter18 = ρσ_Iterable(self.imports);
                for (var ρσ_Index18 = 0; ρσ_Index18 < ρσ_Iter18.length; ρσ_Index18++) {
                    imp = ρσ_Iter18[ρσ_Index18];
                    imp._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_Imports.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Imports.prototype.__repr__ = function __repr__ () {
            if(AST_Statement.prototype.__repr__) return AST_Statement.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Imports.prototype.__str__ = function __str__ () {
            if(AST_Statement.prototype.__str__) return AST_Statement.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Imports.prototype, "__bases__", {value: [AST_Statement]});
        AST_Imports.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["imports"] = "[AST_Import+] array of imports";
            return ρσ_d;
        }).call(this);

        function AST_Decorator() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Decorator.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Decorator, AST_Node);
        AST_Decorator.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_Decorator.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                if (self.expression) {
                    self.expression.walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_Decorator.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Decorator.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Decorator.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Decorator.prototype, "__bases__", {value: [AST_Node]});
        AST_Decorator.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["expression"] = "[AST_Node] the decorator expression";
            return ρσ_d;
        }).call(this);

        function AST_Lambda() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Lambda.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Lambda, AST_Scope);
        AST_Lambda.prototype.__init__ = function __init__ () {
            AST_Scope.prototype.__init__ && AST_Scope.prototype.__init__.apply(this, arguments);
        };
        AST_Lambda.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                var d, arg;
                if (self.decorators) {
                    var ρσ_Iter19 = ρσ_Iterable(self.decorators);
                    for (var ρσ_Index19 = 0; ρσ_Index19 < ρσ_Iter19.length; ρσ_Index19++) {
                        d = ρσ_Iter19[ρσ_Index19];
                        d.walk(visitor);
                    }
                }
                if (self.name) {
                    self.name._walk(visitor);
                }
                var ρσ_Iter20 = ρσ_Iterable(self.argnames);
                for (var ρσ_Index20 = 0; ρσ_Index20 < ρσ_Iter20.length; ρσ_Index20++) {
                    arg = ρσ_Iter20[ρσ_Index20];
                    arg._walk(visitor);
                }
                if (self.argnames.starargs) {
                    self.argnames.starargs._walk(visitor);
                }
                if (self.argnames.kwargs) {
                    self.argnames.kwargs._walk(visitor);
                }
                walk_body(self, visitor);
            });
        };
        Object.defineProperties(AST_Lambda.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Lambda.prototype.__repr__ = function __repr__ () {
            if(AST_Scope.prototype.__repr__) return AST_Scope.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Lambda.prototype.__str__ = function __str__ () {
            if(AST_Scope.prototype.__str__) return AST_Scope.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Lambda.prototype, "__bases__", {value: [AST_Scope]});
        AST_Lambda.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["name"] = "[AST_SymbolDeclaration?] the name of this function";
            ρσ_d["argnames"] = "[AST_SymbolFunarg*] array of function arguments";
            ρσ_d["decorators"] = "[AST_Decorator*] function decorators, if any";
            ρσ_d["is_generator"] = "[bool*] True iff this function is a generator";
            ρσ_d["is_expression"] = "[bool*] True iff this function is a function expression";
            ρσ_d["is_anonymous"] = "[bool*] True iff this function is an anonymous function";
            ρσ_d["return_annotation"] = "[AST_Node?] The return type annotation provided (if any)";
            return ρσ_d;
        }).call(this);

        function AST_Function() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Function.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Function, AST_Lambda);
        AST_Function.prototype.__init__ = function __init__ () {
            AST_Lambda.prototype.__init__ && AST_Lambda.prototype.__init__.apply(this, arguments);
        };
        AST_Function.prototype.__repr__ = function __repr__ () {
            if(AST_Lambda.prototype.__repr__) return AST_Lambda.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Function.prototype.__str__ = function __str__ () {
            if(AST_Lambda.prototype.__str__) return AST_Lambda.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Function.prototype, "__bases__", {value: [AST_Lambda]});

        function AST_Class() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Class.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Class, AST_Scope);
        AST_Class.prototype.__init__ = function __init__ () {
            AST_Scope.prototype.__init__ && AST_Scope.prototype.__init__.apply(this, arguments);
        };
        AST_Class.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                var d;
                if (self.decorators) {
                    var ρσ_Iter21 = ρσ_Iterable(self.decorators);
                    for (var ρσ_Index21 = 0; ρσ_Index21 < ρσ_Iter21.length; ρσ_Index21++) {
                        d = ρσ_Iter21[ρσ_Index21];
                        d.walk(visitor);
                    }
                }
                self.name._walk(visitor);
                walk_body(self, visitor);
                if (self.parent) self.parent._walk(visitor);
            });
        };
        Object.defineProperties(AST_Class.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Class.prototype.__repr__ = function __repr__ () {
            if(AST_Scope.prototype.__repr__) return AST_Scope.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Class.prototype.__str__ = function __str__ () {
            if(AST_Scope.prototype.__str__) return AST_Scope.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Class.prototype, "__bases__", {value: [AST_Scope]});
        AST_Class.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["name"] = "[AST_SymbolDeclaration?] the name of this class";
            ρσ_d["init"] = "[AST_Function] constructor for the class";
            ρσ_d["parent"] = "[AST_Symbol?] parent class this class inherits from";
            ρσ_d["bases"] = "[AST_Symbol*] list of base classes this class inherits from";
            ρσ_d["static"] = "[string*] list of static methods";
            ρσ_d["external"] = "[boolean] true if class is declared elsewhere, but will be within current scope at runtime";
            ρσ_d["bound"] = "[string*] list of methods that need to be bound to self";
            ρσ_d["decorators"] = "[AST_Decorator*] function decorators, if any";
            ρσ_d["module_id"] = "[string] The id of the module this class is defined in";
            ρσ_d["statements"] = "[AST_Node*] list of statements in the class scope (excluding method definitions)";
            ρσ_d["dynamic_properties"] = "[dict] map of dynamic property names to property descriptors of the form {getter:AST_Method, setter:AST_Method";
            ρσ_d["classvars"] = "[dict] map containing all class variables as keys, to be used to easily test for existence of a class variable";
            return ρσ_d;
        }).call(this);

        function AST_Method() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Method.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Method, AST_Lambda);
        AST_Method.prototype.__init__ = function __init__ () {
            AST_Lambda.prototype.__init__ && AST_Lambda.prototype.__init__.apply(this, arguments);
        };
        AST_Method.prototype.__repr__ = function __repr__ () {
            if(AST_Lambda.prototype.__repr__) return AST_Lambda.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Method.prototype.__str__ = function __str__ () {
            if(AST_Lambda.prototype.__str__) return AST_Lambda.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Method.prototype, "__bases__", {value: [AST_Lambda]});
        AST_Method.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["static"] = "[boolean] true if method is static";
            ρσ_d["is_getter"] = "[boolean] true if method is a property getter";
            ρσ_d["is_setter"] = "[boolean] true if method is a property setter";
            return ρσ_d;
        }).call(this);

        function AST_Jump() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Jump.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Jump, AST_Statement);
        AST_Jump.prototype.__init__ = function __init__ () {
            AST_Statement.prototype.__init__ && AST_Statement.prototype.__init__.apply(this, arguments);
        };
        AST_Jump.prototype.__repr__ = function __repr__ () {
            if(AST_Statement.prototype.__repr__) return AST_Statement.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Jump.prototype.__str__ = function __str__ () {
            if(AST_Statement.prototype.__str__) return AST_Statement.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Jump.prototype, "__bases__", {value: [AST_Statement]});

        function AST_Exit() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Exit.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Exit, AST_Jump);
        AST_Exit.prototype.__init__ = function __init__ () {
            AST_Jump.prototype.__init__ && AST_Jump.prototype.__init__.apply(this, arguments);
        };
        AST_Exit.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                if (self.value) {
                    self.value._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_Exit.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Exit.prototype.__repr__ = function __repr__ () {
            if(AST_Jump.prototype.__repr__) return AST_Jump.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Exit.prototype.__str__ = function __str__ () {
            if(AST_Jump.prototype.__str__) return AST_Jump.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Exit.prototype, "__bases__", {value: [AST_Jump]});
        AST_Exit.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["value"] = "[AST_Node?] the value returned or thrown by this statement; could be null for AST_Return";
            return ρσ_d;
        }).call(this);

        function AST_Return() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Return.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Return, AST_Exit);
        AST_Return.prototype.__init__ = function __init__ () {
            AST_Exit.prototype.__init__ && AST_Exit.prototype.__init__.apply(this, arguments);
        };
        AST_Return.prototype.__repr__ = function __repr__ () {
            if(AST_Exit.prototype.__repr__) return AST_Exit.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Return.prototype.__str__ = function __str__ () {
            if(AST_Exit.prototype.__str__) return AST_Exit.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Return.prototype, "__bases__", {value: [AST_Exit]});

        function AST_Yield() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Yield.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Yield, AST_Return);
        AST_Yield.prototype.__init__ = function __init__ () {
            AST_Return.prototype.__init__ && AST_Return.prototype.__init__.apply(this, arguments);
        };
        AST_Yield.prototype.__repr__ = function __repr__ () {
            if(AST_Return.prototype.__repr__) return AST_Return.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Yield.prototype.__str__ = function __str__ () {
            if(AST_Return.prototype.__str__) return AST_Return.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Yield.prototype, "__bases__", {value: [AST_Return]});
        AST_Yield.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["is_yield_from"] = "[bool] True iff this is a yield from, False otherwise";
            return ρσ_d;
        }).call(this);

        function AST_Throw() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Throw.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Throw, AST_Exit);
        AST_Throw.prototype.__init__ = function __init__ () {
            AST_Exit.prototype.__init__ && AST_Exit.prototype.__init__.apply(this, arguments);
        };
        AST_Throw.prototype.__repr__ = function __repr__ () {
            if(AST_Exit.prototype.__repr__) return AST_Exit.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Throw.prototype.__str__ = function __str__ () {
            if(AST_Exit.prototype.__str__) return AST_Exit.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Throw.prototype, "__bases__", {value: [AST_Exit]});

        function AST_LoopControl() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_LoopControl.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_LoopControl, AST_Jump);
        AST_LoopControl.prototype.__init__ = function __init__ () {
            AST_Jump.prototype.__init__ && AST_Jump.prototype.__init__.apply(this, arguments);
        };
        AST_LoopControl.prototype.__repr__ = function __repr__ () {
            if(AST_Jump.prototype.__repr__) return AST_Jump.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_LoopControl.prototype.__str__ = function __str__ () {
            if(AST_Jump.prototype.__str__) return AST_Jump.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_LoopControl.prototype, "__bases__", {value: [AST_Jump]});

        function AST_Break() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Break.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Break, AST_LoopControl);
        AST_Break.prototype.__init__ = function __init__ () {
            AST_LoopControl.prototype.__init__ && AST_LoopControl.prototype.__init__.apply(this, arguments);
        };
        AST_Break.prototype.__repr__ = function __repr__ () {
            if(AST_LoopControl.prototype.__repr__) return AST_LoopControl.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Break.prototype.__str__ = function __str__ () {
            if(AST_LoopControl.prototype.__str__) return AST_LoopControl.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Break.prototype, "__bases__", {value: [AST_LoopControl]});

        function AST_Continue() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Continue.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Continue, AST_LoopControl);
        AST_Continue.prototype.__init__ = function __init__ () {
            AST_LoopControl.prototype.__init__ && AST_LoopControl.prototype.__init__.apply(this, arguments);
        };
        AST_Continue.prototype.__repr__ = function __repr__ () {
            if(AST_LoopControl.prototype.__repr__) return AST_LoopControl.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Continue.prototype.__str__ = function __str__ () {
            if(AST_LoopControl.prototype.__str__) return AST_LoopControl.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Continue.prototype, "__bases__", {value: [AST_LoopControl]});

        function AST_If() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_If.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_If, AST_StatementWithBody);
        AST_If.prototype.__init__ = function __init__ () {
            AST_StatementWithBody.prototype.__init__ && AST_StatementWithBody.prototype.__init__.apply(this, arguments);
        };
        AST_If.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.condition._walk(visitor);
                self.body._walk(visitor);
                if (self.alternative) {
                    self.alternative._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_If.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_If.prototype.__repr__ = function __repr__ () {
            if(AST_StatementWithBody.prototype.__repr__) return AST_StatementWithBody.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_If.prototype.__str__ = function __str__ () {
            if(AST_StatementWithBody.prototype.__str__) return AST_StatementWithBody.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_If.prototype, "__bases__", {value: [AST_StatementWithBody]});
        AST_If.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["condition"] = "[AST_Node] the `if` condition";
            ρσ_d["alternative"] = "[AST_Statement?] the `else` part, or null if not present";
            return ρσ_d;
        }).call(this);

        function AST_Try() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Try.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Try, AST_Block);
        AST_Try.prototype.__init__ = function __init__ () {
            AST_Block.prototype.__init__ && AST_Block.prototype.__init__.apply(this, arguments);
        };
        AST_Try.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                walk_body(self, visitor);
                if (self.bcatch) {
                    self.bcatch._walk(visitor);
                }
                if (self.bfinally) {
                    self.bfinally._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_Try.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Try.prototype.__repr__ = function __repr__ () {
            if(AST_Block.prototype.__repr__) return AST_Block.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Try.prototype.__str__ = function __str__ () {
            if(AST_Block.prototype.__str__) return AST_Block.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Try.prototype, "__bases__", {value: [AST_Block]});
        AST_Try.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["bcatch"] = "[AST_Catch?] the catch block, or null if not present";
            ρσ_d["bfinally"] = "[AST_Finally?] the finally block, or null if not present";
            return ρσ_d;
        }).call(this);

        function AST_Catch() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Catch.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Catch, AST_Block);
        AST_Catch.prototype.__init__ = function __init__ () {
            AST_Block.prototype.__init__ && AST_Block.prototype.__init__.apply(this, arguments);
        };
        AST_Catch.prototype.__repr__ = function __repr__ () {
            if(AST_Block.prototype.__repr__) return AST_Block.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Catch.prototype.__str__ = function __str__ () {
            if(AST_Block.prototype.__str__) return AST_Block.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Catch.prototype, "__bases__", {value: [AST_Block]});

        function AST_Except() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Except.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Except, AST_Block);
        AST_Except.prototype.__init__ = function __init__ () {
            AST_Block.prototype.__init__ && AST_Block.prototype.__init__.apply(this, arguments);
        };
        AST_Except.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(this, function () {
                var e;
                if (self.argname) {
                    self.argname.walk(visitor);
                }
                if (self.errors) {
                    var ρσ_Iter22 = ρσ_Iterable(self.errors);
                    for (var ρσ_Index22 = 0; ρσ_Index22 < ρσ_Iter22.length; ρσ_Index22++) {
                        e = ρσ_Iter22[ρσ_Index22];
                        e.walk(visitor);
                    }
                }
                walk_body(self, visitor);
            });
        };
        Object.defineProperties(AST_Except.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Except.prototype.__repr__ = function __repr__ () {
            if(AST_Block.prototype.__repr__) return AST_Block.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Except.prototype.__str__ = function __str__ () {
            if(AST_Block.prototype.__str__) return AST_Block.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Except.prototype, "__bases__", {value: [AST_Block]});
        AST_Except.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["argname"] = "[AST_SymbolCatch] symbol for the exception";
            ρσ_d["errors"] = "[AST_SymbolVar*] error classes to catch in this block";
            return ρσ_d;
        }).call(this);

        function AST_Finally() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Finally.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Finally, AST_Block);
        AST_Finally.prototype.__init__ = function __init__ () {
            AST_Block.prototype.__init__ && AST_Block.prototype.__init__.apply(this, arguments);
        };
        AST_Finally.prototype.__repr__ = function __repr__ () {
            if(AST_Block.prototype.__repr__) return AST_Block.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Finally.prototype.__str__ = function __str__ () {
            if(AST_Block.prototype.__str__) return AST_Block.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Finally.prototype, "__bases__", {value: [AST_Block]});

        function AST_Definitions() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Definitions.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Definitions, AST_Statement);
        AST_Definitions.prototype.__init__ = function __init__ () {
            AST_Statement.prototype.__init__ && AST_Statement.prototype.__init__.apply(this, arguments);
        };
        AST_Definitions.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                var def_;
                var ρσ_Iter23 = ρσ_Iterable(self.definitions);
                for (var ρσ_Index23 = 0; ρσ_Index23 < ρσ_Iter23.length; ρσ_Index23++) {
                    def_ = ρσ_Iter23[ρσ_Index23];
                    def_._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_Definitions.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Definitions.prototype.__repr__ = function __repr__ () {
            if(AST_Statement.prototype.__repr__) return AST_Statement.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Definitions.prototype.__str__ = function __str__ () {
            if(AST_Statement.prototype.__str__) return AST_Statement.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Definitions.prototype, "__bases__", {value: [AST_Statement]});
        AST_Definitions.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["definitions"] = "[AST_VarDef*] array of variable definitions";
            return ρσ_d;
        }).call(this);

        function AST_Var() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Var.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Var, AST_Definitions);
        AST_Var.prototype.__init__ = function __init__ () {
            AST_Definitions.prototype.__init__ && AST_Definitions.prototype.__init__.apply(this, arguments);
        };
        AST_Var.prototype.__repr__ = function __repr__ () {
            if(AST_Definitions.prototype.__repr__) return AST_Definitions.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Var.prototype.__str__ = function __str__ () {
            if(AST_Definitions.prototype.__str__) return AST_Definitions.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Var.prototype, "__bases__", {value: [AST_Definitions]});

        function AST_VarDef() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_VarDef.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_VarDef, AST_Node);
        AST_VarDef.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_VarDef.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.name._walk(visitor);
                if (self.value) {
                    self.value._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_VarDef.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_VarDef.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_VarDef.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_VarDef.prototype, "__bases__", {value: [AST_Node]});
        AST_VarDef.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["name"] = "[AST_SymbolVar|AST_SymbolConst|AST_SymbolNonlocal] name of the variable";
            ρσ_d["value"] = "[AST_Node?] initializer, or null if there's no initializer";
            return ρσ_d;
        }).call(this);

        function AST_BaseCall() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_BaseCall.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_BaseCall, AST_Node);
        AST_BaseCall.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_BaseCall.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_BaseCall.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_BaseCall.prototype, "__bases__", {value: [AST_Node]});
        AST_BaseCall.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["args"] = "[AST_Node*] array of arguments";
            return ρσ_d;
        }).call(this);

        function AST_Call() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Call.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Call, AST_BaseCall);
        AST_Call.prototype.__init__ = function __init__ () {
            AST_BaseCall.prototype.__init__ && AST_BaseCall.prototype.__init__.apply(this, arguments);
        };
        AST_Call.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                var arg;
                self.expression._walk(visitor);
                var ρσ_Iter24 = ρσ_Iterable(self.args);
                for (var ρσ_Index24 = 0; ρσ_Index24 < ρσ_Iter24.length; ρσ_Index24++) {
                    arg = ρσ_Iter24[ρσ_Index24];
                    arg._walk(visitor);
                }
                if (self.args.kwargs) {
                    var ρσ_Iter25 = ρσ_Iterable(self.args.kwargs);
                    for (var ρσ_Index25 = 0; ρσ_Index25 < ρσ_Iter25.length; ρσ_Index25++) {
                        arg = ρσ_Iter25[ρσ_Index25];
                        arg[0]._walk(visitor);
                        arg[1]._walk(visitor);
                    }
                }
                if (self.args.kwarg_items) {
                    var ρσ_Iter26 = ρσ_Iterable(self.args.kwarg_items);
                    for (var ρσ_Index26 = 0; ρσ_Index26 < ρσ_Iter26.length; ρσ_Index26++) {
                        arg = ρσ_Iter26[ρσ_Index26];
                        arg._walk(visitor);
                    }
                }
            });
        };
        Object.defineProperties(AST_Call.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Call.prototype.__repr__ = function __repr__ () {
            if(AST_BaseCall.prototype.__repr__) return AST_BaseCall.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Call.prototype.__str__ = function __str__ () {
            if(AST_BaseCall.prototype.__str__) return AST_BaseCall.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Call.prototype, "__bases__", {value: [AST_BaseCall]});
        AST_Call.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["expression"] = "[AST_Node] expression to invoke as function";
            return ρσ_d;
        }).call(this);

        function AST_ClassCall() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_ClassCall.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_ClassCall, AST_BaseCall);
        AST_ClassCall.prototype.__init__ = function __init__ () {
            AST_BaseCall.prototype.__init__ && AST_BaseCall.prototype.__init__.apply(this, arguments);
        };
        AST_ClassCall.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                var arg;
                if (self.expression) self.expression._walk(visitor);
                var ρσ_Iter27 = ρσ_Iterable(self.args);
                for (var ρσ_Index27 = 0; ρσ_Index27 < ρσ_Iter27.length; ρσ_Index27++) {
                    arg = ρσ_Iter27[ρσ_Index27];
                    arg._walk(visitor);
                }
                var ρσ_Iter28 = ρσ_Iterable(self.args.kwargs);
                for (var ρσ_Index28 = 0; ρσ_Index28 < ρσ_Iter28.length; ρσ_Index28++) {
                    arg = ρσ_Iter28[ρσ_Index28];
                    arg[0]._walk(visitor);
                    arg[1]._walk(visitor);
                }
                var ρσ_Iter29 = ρσ_Iterable(self.args.kwarg_items);
                for (var ρσ_Index29 = 0; ρσ_Index29 < ρσ_Iter29.length; ρσ_Index29++) {
                    arg = ρσ_Iter29[ρσ_Index29];
                    arg._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_ClassCall.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_ClassCall.prototype.__repr__ = function __repr__ () {
            if(AST_BaseCall.prototype.__repr__) return AST_BaseCall.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_ClassCall.prototype.__str__ = function __str__ () {
            if(AST_BaseCall.prototype.__str__) return AST_BaseCall.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_ClassCall.prototype, "__bases__", {value: [AST_BaseCall]});
        AST_ClassCall.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["class"] = "[string] name of the class method belongs to";
            ρσ_d["method"] = "[string] class method being called";
            ρσ_d["static"] = "[boolean] defines whether the method is static";
            return ρσ_d;
        }).call(this);

        function AST_New() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_New.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_New, AST_Call);
        AST_New.prototype.__init__ = function __init__ () {
            AST_Call.prototype.__init__ && AST_Call.prototype.__init__.apply(this, arguments);
        };
        AST_New.prototype.__repr__ = function __repr__ () {
            if(AST_Call.prototype.__repr__) return AST_Call.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_New.prototype.__str__ = function __str__ () {
            if(AST_Call.prototype.__str__) return AST_Call.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_New.prototype, "__bases__", {value: [AST_Call]});

        function AST_Seq() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Seq.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Seq, AST_Node);
        AST_Seq.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_Seq.prototype.to_array = function to_array() {
            var self = this;
            var p, a;
            p = self;
            a = ρσ_list_decorate([]);
            while (p) {
                a.push(p.car);
                if (p.cdr && !is_node_type(p.cdr, AST_Seq)) {
                    a.push(p.cdr);
                    break;
                }
                p = p.cdr;
            }
            return a;
        };
        Object.defineProperties(AST_Seq.prototype.to_array, {
            __argnames__ : {value: []}
        });
        AST_Seq.prototype.add = function add(node) {
            var self = this;
            var p, cell;
            p = self;
            while (p) {
                if (!is_node_type(p.cdr, AST_Seq)) {
                    cell = AST_Seq.prototype.cons.call(p.cdr, node);
                    return p.cdr = cell;
                }
                p = p.cdr;
            }
        };
        Object.defineProperties(AST_Seq.prototype.add, {
            __argnames__ : {value: ["node"]}
        });
        AST_Seq.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.car._walk(visitor);
                if (self.cdr) {
                    self.cdr._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_Seq.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Seq.prototype.cons = function cons(x, y) {
            var self = this;
            var seq;
            seq = new AST_Seq(x);
            seq.car = x;
            seq.cdr = y;
            return seq;
        };
        Object.defineProperties(AST_Seq.prototype.cons, {
            __argnames__ : {value: ["x", "y"]}
        });
        AST_Seq.prototype.from_array = function from_array(array) {
            var self = this;
            var ans, i, p;
            if (array.length === 0) {
                return null;
            }
            if (array.length === 1) {
                return array[0].clone();
            }
            ans = null;
            for (var ρσ_Index30 = array.length - 1; ρσ_Index30 > -1; ρσ_Index30-=1) {
                i = ρσ_Index30;
                ans = AST_Seq.prototype.cons.call(array[(typeof i === "number" && i < 0) ? array.length + i : i], ans);
            }
            p = ans;
            while (p) {
                if (p.cdr && !p.cdr.cdr) {
                    p.cdr = p.cdr.car;
                    break;
                }
                p = p.cdr;
            }
            return ans;
        };
        Object.defineProperties(AST_Seq.prototype.from_array, {
            __argnames__ : {value: ["array"]}
        });
        AST_Seq.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Seq.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Seq.prototype, "__bases__", {value: [AST_Node]});
        AST_Seq.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["car"] = "[AST_Node] first element in sequence";
            ρσ_d["cdr"] = "[AST_Node] second element in sequence";
            return ρσ_d;
        }).call(this);

        function AST_PropAccess() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_PropAccess.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_PropAccess, AST_Node);
        AST_PropAccess.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_PropAccess.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_PropAccess.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_PropAccess.prototype, "__bases__", {value: [AST_Node]});
        AST_PropAccess.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["expression"] = "[AST_Node] the “container” expression";
            ρσ_d["property"] = "[AST_Node|string] the property to access.  For AST_Dot this is always a plain string, while for AST_Sub it's an arbitrary AST_Node";
            return ρσ_d;
        }).call(this);

        function AST_Dot() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Dot.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Dot, AST_PropAccess);
        AST_Dot.prototype.__init__ = function __init__ () {
            AST_PropAccess.prototype.__init__ && AST_PropAccess.prototype.__init__.apply(this, arguments);
        };
        AST_Dot.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.expression._walk(visitor);
            });
        };
        Object.defineProperties(AST_Dot.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Dot.prototype.__repr__ = function __repr__ () {
            if(AST_PropAccess.prototype.__repr__) return AST_PropAccess.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Dot.prototype.__str__ = function __str__ () {
            if(AST_PropAccess.prototype.__str__) return AST_PropAccess.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Dot.prototype, "__bases__", {value: [AST_PropAccess]});

        function AST_Sub() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Sub.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Sub, AST_PropAccess);
        AST_Sub.prototype.__init__ = function __init__ () {
            AST_PropAccess.prototype.__init__ && AST_PropAccess.prototype.__init__.apply(this, arguments);
        };
        AST_Sub.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.expression._walk(visitor);
                self.property._walk(visitor);
            });
        };
        Object.defineProperties(AST_Sub.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Sub.prototype.__repr__ = function __repr__ () {
            if(AST_PropAccess.prototype.__repr__) return AST_PropAccess.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Sub.prototype.__str__ = function __str__ () {
            if(AST_PropAccess.prototype.__str__) return AST_PropAccess.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Sub.prototype, "__bases__", {value: [AST_PropAccess]});

        function AST_ItemAccess() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_ItemAccess.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_ItemAccess, AST_PropAccess);
        AST_ItemAccess.prototype.__init__ = function __init__ () {
            AST_PropAccess.prototype.__init__ && AST_PropAccess.prototype.__init__.apply(this, arguments);
        };
        AST_ItemAccess.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.expression._walk(visitor);
                self.property._walk(visitor);
                if (self.assignment) {
                    self.assignment._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_ItemAccess.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_ItemAccess.prototype.__repr__ = function __repr__ () {
            if(AST_PropAccess.prototype.__repr__) return AST_PropAccess.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_ItemAccess.prototype.__str__ = function __str__ () {
            if(AST_PropAccess.prototype.__str__) return AST_PropAccess.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_ItemAccess.prototype, "__bases__", {value: [AST_PropAccess]});
        AST_ItemAccess.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["assignment"] = "[AST_Node or None] Not None if this is an assignment (a[x] = y) rather than a simple access";
            return ρσ_d;
        }).call(this);

        function AST_Splice() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Splice.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Splice, AST_PropAccess);
        AST_Splice.prototype.__init__ = function __init__ () {
            AST_PropAccess.prototype.__init__ && AST_PropAccess.prototype.__init__.apply(this, arguments);
        };
        AST_Splice.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.expression._walk(visitor);
                self.property._walk(visitor);
                self.property2._walk(visitor);
            });
        };
        Object.defineProperties(AST_Splice.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Splice.prototype.__repr__ = function __repr__ () {
            if(AST_PropAccess.prototype.__repr__) return AST_PropAccess.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Splice.prototype.__str__ = function __str__ () {
            if(AST_PropAccess.prototype.__str__) return AST_PropAccess.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Splice.prototype, "__bases__", {value: [AST_PropAccess]});
        AST_Splice.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["property2"] = "[AST_Node] the 2nd property to access - typically ending index for the array.";
            ρσ_d["assignment"] = "[AST_Node] The data being spliced in.";
            return ρσ_d;
        }).call(this);

        function AST_Unary() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Unary.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Unary, AST_Node);
        AST_Unary.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_Unary.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.expression._walk(visitor);
            });
        };
        Object.defineProperties(AST_Unary.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Unary.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Unary.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Unary.prototype, "__bases__", {value: [AST_Node]});
        AST_Unary.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["operator"] = "[string] the operator";
            ρσ_d["expression"] = "[AST_Node] expression that this unary operator applies to";
            return ρσ_d;
        }).call(this);

        function AST_UnaryPrefix() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_UnaryPrefix.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_UnaryPrefix, AST_Unary);
        AST_UnaryPrefix.prototype.__init__ = function __init__ () {
            AST_Unary.prototype.__init__ && AST_Unary.prototype.__init__.apply(this, arguments);
        };
        AST_UnaryPrefix.prototype.__repr__ = function __repr__ () {
            if(AST_Unary.prototype.__repr__) return AST_Unary.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_UnaryPrefix.prototype.__str__ = function __str__ () {
            if(AST_Unary.prototype.__str__) return AST_Unary.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_UnaryPrefix.prototype, "__bases__", {value: [AST_Unary]});

        function AST_Binary() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Binary.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Binary, AST_Node);
        AST_Binary.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_Binary.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.left._walk(visitor);
                self.right._walk(visitor);
            });
        };
        Object.defineProperties(AST_Binary.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Binary.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Binary.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Binary.prototype, "__bases__", {value: [AST_Node]});
        AST_Binary.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["left"] = "[AST_Node] left-hand side expression";
            ρσ_d["operator"] = "[string] the operator";
            ρσ_d["right"] = "[AST_Node] right-hand side expression";
            return ρσ_d;
        }).call(this);

        function AST_Existential() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Existential.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Existential, AST_Node);
        AST_Existential.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_Existential.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.expression._walk(visitor);
                if (self.after !== null && typeof self.after === "object") {
                    self.after._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_Existential.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Existential.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Existential.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Existential.prototype, "__bases__", {value: [AST_Node]});
        AST_Existential.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["expression"] = "[AST_Node] The expression whose existence we need to check";
            ρσ_d["after"] = "[None|string|AST_Node] is None when there is nothing following this operator, is a string when there is as AST_PropAccess following this operator, is an AST_Node if it is used a a shorthand for the conditional ternary, i.e. a ? b == a if a? else b";
            return ρσ_d;
        }).call(this);

        function AST_Conditional() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Conditional.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Conditional, AST_Node);
        AST_Conditional.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_Conditional.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.condition._walk(visitor);
                self.consequent._walk(visitor);
                self.alternative._walk(visitor);
            });
        };
        Object.defineProperties(AST_Conditional.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Conditional.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Conditional.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Conditional.prototype, "__bases__", {value: [AST_Node]});
        AST_Conditional.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["condition"] = "[AST_Node]";
            ρσ_d["consequent"] = "[AST_Node]";
            ρσ_d["alternative"] = "[AST_Node]";
            return ρσ_d;
        }).call(this);

        function AST_Assign() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Assign.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Assign, AST_Binary);
        AST_Assign.prototype.__init__ = function __init__ () {
            AST_Binary.prototype.__init__ && AST_Binary.prototype.__init__.apply(this, arguments);
        };
        AST_Assign.prototype.is_chained = function is_chained() {
            var self = this;
            return is_node_type(self.right, AST_Assign) || is_node_type(self.right, AST_Seq) && (is_node_type(self.right.car, AST_Assign) || is_node_type(self.right.cdr, AST_Assign));
        };
        Object.defineProperties(AST_Assign.prototype.is_chained, {
            __argnames__ : {value: []}
        });
        AST_Assign.prototype.traverse_chain = function traverse_chain() {
            var self = this;
            var right, left_hand_sides, next, assign;
            right = self.right;
            while (true) {
                if (is_node_type(right, AST_Assign)) {
                    right = right.right;
                    continue;
                }
                if (is_node_type(right, AST_Seq)) {
                    if (is_node_type(right.car, AST_Assign)) {
                        right = new AST_Seq((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["car"] = right.car.right;
                            ρσ_d["cdr"] = right.cdr;
                            return ρσ_d;
                        }).call(this));
                        continue;
                    }
                    if (is_node_type(right.cdr, AST_Assign)) {
                        right = right.cdr.right;
                        continue;
                    }
                }
                break;
            }
            left_hand_sides = [self.left];
            next = self.right;
            while (true) {
                if (is_node_type(next, AST_Assign)) {
                    left_hand_sides.push(next.left);
                    next = next.right;
                    continue;
                }
                if (is_node_type(next, AST_Seq)) {
                    if (is_node_type(next.cdr, AST_Assign)) {
                        assign = next.cdr;
                        left_hand_sides.push(new AST_Seq((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["car"] = next.car;
                            ρσ_d["cdr"] = assign.left;
                            return ρσ_d;
                        }).call(this)));
                        next = assign.right;
                        continue;
                    }
                }
                break;
            }
            return [left_hand_sides, right];
        };
        Object.defineProperties(AST_Assign.prototype.traverse_chain, {
            __argnames__ : {value: []}
        });
        AST_Assign.prototype.__repr__ = function __repr__ () {
            if(AST_Binary.prototype.__repr__) return AST_Binary.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Assign.prototype.__str__ = function __str__ () {
            if(AST_Binary.prototype.__str__) return AST_Binary.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Assign.prototype, "__bases__", {value: [AST_Binary]});

        function AST_Array() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Array.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Array, AST_Node);
        AST_Array.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_Array.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                var el;
                var ρσ_Iter31 = ρσ_Iterable(self.elements);
                for (var ρσ_Index31 = 0; ρσ_Index31 < ρσ_Iter31.length; ρσ_Index31++) {
                    el = ρσ_Iter31[ρσ_Index31];
                    el._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_Array.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Array.prototype.flatten = function flatten() {
            var self = this;
            function flatten(arr) {
                var ans, value;
                ans = ρσ_list_decorate([]);
                var ρσ_Iter32 = ρσ_Iterable(arr);
                for (var ρσ_Index32 = 0; ρσ_Index32 < ρσ_Iter32.length; ρσ_Index32++) {
                    value = ρσ_Iter32[ρσ_Index32];
                    if (is_node_type(value, AST_Seq)) {
                        value = value.to_array();
                    } else if (is_node_type(value, AST_Array)) {
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
            Object.defineProperties(flatten, {
                __argnames__ : {value: ["arr"]}
            });

            return flatten(self.elements);
        };
        Object.defineProperties(AST_Array.prototype.flatten, {
            __argnames__ : {value: []}
        });
        AST_Array.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Array.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Array.prototype, "__bases__", {value: [AST_Node]});
        AST_Array.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["elements"] = "[AST_Node*] array of elements";
            return ρσ_d;
        }).call(this);

        function AST_Object() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Object.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Object, AST_Node);
        AST_Object.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_Object.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                var prop;
                var ρσ_Iter33 = ρσ_Iterable(self.properties);
                for (var ρσ_Index33 = 0; ρσ_Index33 < ρσ_Iter33.length; ρσ_Index33++) {
                    prop = ρσ_Iter33[ρσ_Index33];
                    prop._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_Object.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Object.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Object.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Object.prototype, "__bases__", {value: [AST_Node]});
        AST_Object.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["properties"] = "[AST_ObjectProperty*] array of properties";
            ρσ_d["is_pydict"] = "[bool] True if this object is a python dict literal";
            ρσ_d["is_jshash"] = "[bool] True if this object is a js hash literal";
            return ρσ_d;
        }).call(this);

        function AST_ExpressiveObject() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_ExpressiveObject.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_ExpressiveObject, AST_Object);
        AST_ExpressiveObject.prototype.__init__ = function __init__ () {
            AST_Object.prototype.__init__ && AST_Object.prototype.__init__.apply(this, arguments);
        };
        AST_ExpressiveObject.prototype.__repr__ = function __repr__ () {
            if(AST_Object.prototype.__repr__) return AST_Object.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_ExpressiveObject.prototype.__str__ = function __str__ () {
            if(AST_Object.prototype.__str__) return AST_Object.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_ExpressiveObject.prototype, "__bases__", {value: [AST_Object]});

        function AST_ObjectProperty() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_ObjectProperty.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_ObjectProperty, AST_Node);
        AST_ObjectProperty.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_ObjectProperty.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.key._walk(visitor);
                self.value._walk(visitor);
            });
        };
        Object.defineProperties(AST_ObjectProperty.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_ObjectProperty.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_ObjectProperty.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_ObjectProperty.prototype, "__bases__", {value: [AST_Node]});
        AST_ObjectProperty.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["key"] = "[AST_Node] the property expression";
            ρσ_d["value"] = "[AST_Node] property value.  For setters and getters this is an AST_Function.";
            ρσ_d["quoted"] = "";
            return ρσ_d;
        }).call(this);

        function AST_ObjectKeyVal() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_ObjectKeyVal.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_ObjectKeyVal, AST_ObjectProperty);
        AST_ObjectKeyVal.prototype.__init__ = function __init__ () {
            AST_ObjectProperty.prototype.__init__ && AST_ObjectProperty.prototype.__init__.apply(this, arguments);
        };
        AST_ObjectKeyVal.prototype.__repr__ = function __repr__ () {
            if(AST_ObjectProperty.prototype.__repr__) return AST_ObjectProperty.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_ObjectKeyVal.prototype.__str__ = function __str__ () {
            if(AST_ObjectProperty.prototype.__str__) return AST_ObjectProperty.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_ObjectKeyVal.prototype, "__bases__", {value: [AST_ObjectProperty]});

        function AST_Set() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Set.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Set, AST_Node);
        AST_Set.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_Set.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                var prop;
                var ρσ_Iter34 = ρσ_Iterable(self.items);
                for (var ρσ_Index34 = 0; ρσ_Index34 < ρσ_Iter34.length; ρσ_Index34++) {
                    prop = ρσ_Iter34[ρσ_Index34];
                    prop._walk(visitor);
                }
            });
        };
        Object.defineProperties(AST_Set.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_Set.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Set.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Set.prototype, "__bases__", {value: [AST_Node]});
        AST_Set.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["items"] = "[AST_SetItem*] array of items";
            return ρσ_d;
        }).call(this);

        function AST_SetItem() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_SetItem.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_SetItem, AST_Node);
        AST_SetItem.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_SetItem.prototype._walk = function _walk(visitor) {
            var self = this;
            return visitor._visit(self, function () {
                self.value._walk(visitor);
            });
        };
        Object.defineProperties(AST_SetItem.prototype._walk, {
            __argnames__ : {value: ["visitor"]}
        });
        AST_SetItem.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_SetItem.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_SetItem.prototype, "__bases__", {value: [AST_Node]});
        AST_SetItem.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["value"] = "[AST_Node] The value of this item";
            return ρσ_d;
        }).call(this);

        function AST_Symbol() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Symbol.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Symbol, AST_Node);
        AST_Symbol.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_Symbol.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Symbol.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Symbol.prototype, "__bases__", {value: [AST_Node]});
        AST_Symbol.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["name"] = "[string] name of this symbol";
            ρσ_d["scope"] = "[AST_Scope/S] the current scope (not necessarily the definition scope)";
            ρσ_d["thedef"] = "[SymbolDef/S] the definition of this symbol";
            return ρσ_d;
        }).call(this);

        function AST_SymbolAlias() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_SymbolAlias.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_SymbolAlias, AST_Symbol);
        AST_SymbolAlias.prototype.__init__ = function __init__ () {
            AST_Symbol.prototype.__init__ && AST_Symbol.prototype.__init__.apply(this, arguments);
        };
        AST_SymbolAlias.prototype.__repr__ = function __repr__ () {
            if(AST_Symbol.prototype.__repr__) return AST_Symbol.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_SymbolAlias.prototype.__str__ = function __str__ () {
            if(AST_Symbol.prototype.__str__) return AST_Symbol.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_SymbolAlias.prototype, "__bases__", {value: [AST_Symbol]});

        function AST_SymbolDeclaration() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_SymbolDeclaration.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_SymbolDeclaration, AST_Symbol);
        AST_SymbolDeclaration.prototype.__init__ = function __init__ () {
            AST_Symbol.prototype.__init__ && AST_Symbol.prototype.__init__.apply(this, arguments);
        };
        AST_SymbolDeclaration.prototype.__repr__ = function __repr__ () {
            if(AST_Symbol.prototype.__repr__) return AST_Symbol.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_SymbolDeclaration.prototype.__str__ = function __str__ () {
            if(AST_Symbol.prototype.__str__) return AST_Symbol.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_SymbolDeclaration.prototype, "__bases__", {value: [AST_Symbol]});
        AST_SymbolDeclaration.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["init"] = "[AST_Node*/S] array of initializers for this declaration.";
            return ρσ_d;
        }).call(this);

        function AST_SymbolVar() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_SymbolVar.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_SymbolVar, AST_SymbolDeclaration);
        AST_SymbolVar.prototype.__init__ = function __init__ () {
            AST_SymbolDeclaration.prototype.__init__ && AST_SymbolDeclaration.prototype.__init__.apply(this, arguments);
        };
        AST_SymbolVar.prototype.__repr__ = function __repr__ () {
            if(AST_SymbolDeclaration.prototype.__repr__) return AST_SymbolDeclaration.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_SymbolVar.prototype.__str__ = function __str__ () {
            if(AST_SymbolDeclaration.prototype.__str__) return AST_SymbolDeclaration.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_SymbolVar.prototype, "__bases__", {value: [AST_SymbolDeclaration]});

        function AST_ImportedVar() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_ImportedVar.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_ImportedVar, AST_SymbolVar);
        AST_ImportedVar.prototype.__init__ = function __init__ () {
            AST_SymbolVar.prototype.__init__ && AST_SymbolVar.prototype.__init__.apply(this, arguments);
        };
        AST_ImportedVar.prototype.__repr__ = function __repr__ () {
            if(AST_SymbolVar.prototype.__repr__) return AST_SymbolVar.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_ImportedVar.prototype.__str__ = function __str__ () {
            if(AST_SymbolVar.prototype.__str__) return AST_SymbolVar.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_ImportedVar.prototype, "__bases__", {value: [AST_SymbolVar]});
        AST_ImportedVar.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["alias"] = "AST_SymbolAlias the alias for this imported symbol";
            return ρσ_d;
        }).call(this);

        function AST_SymbolConst() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_SymbolConst.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_SymbolConst, AST_SymbolDeclaration);
        AST_SymbolConst.prototype.__init__ = function __init__ () {
            AST_SymbolDeclaration.prototype.__init__ && AST_SymbolDeclaration.prototype.__init__.apply(this, arguments);
        };
        AST_SymbolConst.prototype.__repr__ = function __repr__ () {
            if(AST_SymbolDeclaration.prototype.__repr__) return AST_SymbolDeclaration.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_SymbolConst.prototype.__str__ = function __str__ () {
            if(AST_SymbolDeclaration.prototype.__str__) return AST_SymbolDeclaration.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_SymbolConst.prototype, "__bases__", {value: [AST_SymbolDeclaration]});

        function AST_SymbolNonlocal() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_SymbolNonlocal.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_SymbolNonlocal, AST_SymbolDeclaration);
        AST_SymbolNonlocal.prototype.__init__ = function __init__ () {
            AST_SymbolDeclaration.prototype.__init__ && AST_SymbolDeclaration.prototype.__init__.apply(this, arguments);
        };
        AST_SymbolNonlocal.prototype.__repr__ = function __repr__ () {
            if(AST_SymbolDeclaration.prototype.__repr__) return AST_SymbolDeclaration.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_SymbolNonlocal.prototype.__str__ = function __str__ () {
            if(AST_SymbolDeclaration.prototype.__str__) return AST_SymbolDeclaration.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_SymbolNonlocal.prototype, "__bases__", {value: [AST_SymbolDeclaration]});

        function AST_SymbolFunarg() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_SymbolFunarg.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_SymbolFunarg, AST_SymbolVar);
        AST_SymbolFunarg.prototype.__init__ = function __init__ () {
            AST_SymbolVar.prototype.__init__ && AST_SymbolVar.prototype.__init__.apply(this, arguments);
        };
        AST_SymbolFunarg.prototype.__repr__ = function __repr__ () {
            if(AST_SymbolVar.prototype.__repr__) return AST_SymbolVar.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_SymbolFunarg.prototype.__str__ = function __str__ () {
            if(AST_SymbolVar.prototype.__str__) return AST_SymbolVar.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_SymbolFunarg.prototype, "__bases__", {value: [AST_SymbolVar]});
        AST_SymbolFunarg.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["annotation"] = "[AST_Node?] The annotation provided for this argument (if any)";
            return ρσ_d;
        }).call(this);

        function AST_SymbolDefun() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_SymbolDefun.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_SymbolDefun, AST_SymbolDeclaration);
        AST_SymbolDefun.prototype.__init__ = function __init__ () {
            AST_SymbolDeclaration.prototype.__init__ && AST_SymbolDeclaration.prototype.__init__.apply(this, arguments);
        };
        AST_SymbolDefun.prototype.__repr__ = function __repr__ () {
            if(AST_SymbolDeclaration.prototype.__repr__) return AST_SymbolDeclaration.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_SymbolDefun.prototype.__str__ = function __str__ () {
            if(AST_SymbolDeclaration.prototype.__str__) return AST_SymbolDeclaration.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_SymbolDefun.prototype, "__bases__", {value: [AST_SymbolDeclaration]});

        function AST_SymbolLambda() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_SymbolLambda.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_SymbolLambda, AST_SymbolDeclaration);
        AST_SymbolLambda.prototype.__init__ = function __init__ () {
            AST_SymbolDeclaration.prototype.__init__ && AST_SymbolDeclaration.prototype.__init__.apply(this, arguments);
        };
        AST_SymbolLambda.prototype.__repr__ = function __repr__ () {
            if(AST_SymbolDeclaration.prototype.__repr__) return AST_SymbolDeclaration.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_SymbolLambda.prototype.__str__ = function __str__ () {
            if(AST_SymbolDeclaration.prototype.__str__) return AST_SymbolDeclaration.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_SymbolLambda.prototype, "__bases__", {value: [AST_SymbolDeclaration]});

        function AST_SymbolCatch() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_SymbolCatch.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_SymbolCatch, AST_SymbolDeclaration);
        AST_SymbolCatch.prototype.__init__ = function __init__ () {
            AST_SymbolDeclaration.prototype.__init__ && AST_SymbolDeclaration.prototype.__init__.apply(this, arguments);
        };
        AST_SymbolCatch.prototype.__repr__ = function __repr__ () {
            if(AST_SymbolDeclaration.prototype.__repr__) return AST_SymbolDeclaration.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_SymbolCatch.prototype.__str__ = function __str__ () {
            if(AST_SymbolDeclaration.prototype.__str__) return AST_SymbolDeclaration.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_SymbolCatch.prototype, "__bases__", {value: [AST_SymbolDeclaration]});

        function AST_SymbolRef() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_SymbolRef.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_SymbolRef, AST_Symbol);
        AST_SymbolRef.prototype.__init__ = function __init__ () {
            AST_Symbol.prototype.__init__ && AST_Symbol.prototype.__init__.apply(this, arguments);
        };
        AST_SymbolRef.prototype.__repr__ = function __repr__ () {
            if(AST_Symbol.prototype.__repr__) return AST_Symbol.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_SymbolRef.prototype.__str__ = function __str__ () {
            if(AST_Symbol.prototype.__str__) return AST_Symbol.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_SymbolRef.prototype, "__bases__", {value: [AST_Symbol]});
        AST_SymbolRef.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["parens"] = "[boolean/S] if true, this variable is wrapped in parentheses";
            return ρσ_d;
        }).call(this);

        function AST_This() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_This.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_This, AST_Symbol);
        AST_This.prototype.__init__ = function __init__ () {
            AST_Symbol.prototype.__init__ && AST_Symbol.prototype.__init__.apply(this, arguments);
        };
        AST_This.prototype.__repr__ = function __repr__ () {
            if(AST_Symbol.prototype.__repr__) return AST_Symbol.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_This.prototype.__str__ = function __str__ () {
            if(AST_Symbol.prototype.__str__) return AST_Symbol.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_This.prototype, "__bases__", {value: [AST_Symbol]});

        function AST_Constant() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Constant.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Constant, AST_Node);
        AST_Constant.prototype.__init__ = function __init__ () {
            AST_Node.prototype.__init__ && AST_Node.prototype.__init__.apply(this, arguments);
        };
        AST_Constant.prototype.__repr__ = function __repr__ () {
            if(AST_Node.prototype.__repr__) return AST_Node.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Constant.prototype.__str__ = function __str__ () {
            if(AST_Node.prototype.__str__) return AST_Node.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Constant.prototype, "__bases__", {value: [AST_Node]});

        function AST_String() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_String.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_String, AST_Constant);
        AST_String.prototype.__init__ = function __init__ () {
            AST_Constant.prototype.__init__ && AST_Constant.prototype.__init__.apply(this, arguments);
        };
        AST_String.prototype.__repr__ = function __repr__ () {
            if(AST_Constant.prototype.__repr__) return AST_Constant.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_String.prototype.__str__ = function __str__ () {
            if(AST_Constant.prototype.__str__) return AST_Constant.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_String.prototype, "__bases__", {value: [AST_Constant]});
        AST_String.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["value"] = "[string] the contents of this string";
            return ρσ_d;
        }).call(this);

        function AST_Verbatim() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Verbatim.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Verbatim, AST_Constant);
        AST_Verbatim.prototype.__init__ = function __init__ () {
            AST_Constant.prototype.__init__ && AST_Constant.prototype.__init__.apply(this, arguments);
        };
        AST_Verbatim.prototype.__repr__ = function __repr__ () {
            if(AST_Constant.prototype.__repr__) return AST_Constant.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Verbatim.prototype.__str__ = function __str__ () {
            if(AST_Constant.prototype.__str__) return AST_Constant.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Verbatim.prototype, "__bases__", {value: [AST_Constant]});
        AST_Verbatim.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["value"] = "[string] A string of raw JS code";
            return ρσ_d;
        }).call(this);

        function AST_Number() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Number.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Number, AST_Constant);
        AST_Number.prototype.__init__ = function __init__ () {
            AST_Constant.prototype.__init__ && AST_Constant.prototype.__init__.apply(this, arguments);
        };
        AST_Number.prototype.__repr__ = function __repr__ () {
            if(AST_Constant.prototype.__repr__) return AST_Constant.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Number.prototype.__str__ = function __str__ () {
            if(AST_Constant.prototype.__str__) return AST_Constant.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Number.prototype, "__bases__", {value: [AST_Constant]});
        AST_Number.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["value"] = "[number] the numeric value";
            return ρσ_d;
        }).call(this);

        function AST_RegExp() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_RegExp.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_RegExp, AST_Constant);
        AST_RegExp.prototype.__init__ = function __init__ () {
            AST_Constant.prototype.__init__ && AST_Constant.prototype.__init__.apply(this, arguments);
        };
        AST_RegExp.prototype.__repr__ = function __repr__ () {
            if(AST_Constant.prototype.__repr__) return AST_Constant.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_RegExp.prototype.__str__ = function __str__ () {
            if(AST_Constant.prototype.__str__) return AST_Constant.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_RegExp.prototype, "__bases__", {value: [AST_Constant]});
        AST_RegExp.prototype.properties = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["value"] = "[RegExp] the actual regexp";
            return ρσ_d;
        }).call(this);

        function AST_Atom() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Atom.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Atom, AST_Constant);
        AST_Atom.prototype.__init__ = function __init__(initializer) {
            var self = this;
            if (initializer) {
                self.start = initializer.start;
                self.end = initializer.end;
            }
        };
        Object.defineProperties(AST_Atom.prototype.__init__, {
            __argnames__ : {value: ["initializer"]}
        });
        AST_Atom.__argnames__ = AST_Atom.prototype.__init__.__argnames__;
        AST_Atom.__handles_kwarg_interpolation__ = AST_Atom.prototype.__init__.__handles_kwarg_interpolation__;
        AST_Atom.prototype.__repr__ = function __repr__ () {
            if(AST_Constant.prototype.__repr__) return AST_Constant.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Atom.prototype.__str__ = function __str__ () {
            if(AST_Constant.prototype.__str__) return AST_Constant.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Atom.prototype, "__bases__", {value: [AST_Constant]});

        function AST_Null() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Null.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Null, AST_Atom);
        AST_Null.prototype.__init__ = function __init__ () {
            AST_Atom.prototype.__init__ && AST_Atom.prototype.__init__.apply(this, arguments);
        };
        AST_Null.prototype.__repr__ = function __repr__ () {
            if(AST_Atom.prototype.__repr__) return AST_Atom.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Null.prototype.__str__ = function __str__ () {
            if(AST_Atom.prototype.__str__) return AST_Atom.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Null.prototype, "__bases__", {value: [AST_Atom]});
        AST_Null.prototype.value = null;

        function AST_NaN() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_NaN.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_NaN, AST_Atom);
        AST_NaN.prototype.__init__ = function __init__ () {
            AST_Atom.prototype.__init__ && AST_Atom.prototype.__init__.apply(this, arguments);
        };
        AST_NaN.prototype.__repr__ = function __repr__ () {
            if(AST_Atom.prototype.__repr__) return AST_Atom.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_NaN.prototype.__str__ = function __str__ () {
            if(AST_Atom.prototype.__str__) return AST_Atom.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_NaN.prototype, "__bases__", {value: [AST_Atom]});
        AST_NaN.prototype.value = NaN;

        function AST_Undefined() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Undefined.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Undefined, AST_Atom);
        AST_Undefined.prototype.__init__ = function __init__ () {
            AST_Atom.prototype.__init__ && AST_Atom.prototype.__init__.apply(this, arguments);
        };
        AST_Undefined.prototype.__repr__ = function __repr__ () {
            if(AST_Atom.prototype.__repr__) return AST_Atom.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Undefined.prototype.__str__ = function __str__ () {
            if(AST_Atom.prototype.__str__) return AST_Atom.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Undefined.prototype, "__bases__", {value: [AST_Atom]});
        AST_Undefined.prototype.value = undefined;

        function AST_Hole() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Hole.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Hole, AST_Atom);
        AST_Hole.prototype.__init__ = function __init__ () {
            AST_Atom.prototype.__init__ && AST_Atom.prototype.__init__.apply(this, arguments);
        };
        AST_Hole.prototype.__repr__ = function __repr__ () {
            if(AST_Atom.prototype.__repr__) return AST_Atom.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Hole.prototype.__str__ = function __str__ () {
            if(AST_Atom.prototype.__str__) return AST_Atom.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Hole.prototype, "__bases__", {value: [AST_Atom]});
        AST_Hole.prototype.value = undefined;

        function AST_Infinity() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Infinity.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Infinity, AST_Atom);
        AST_Infinity.prototype.__init__ = function __init__ () {
            AST_Atom.prototype.__init__ && AST_Atom.prototype.__init__.apply(this, arguments);
        };
        AST_Infinity.prototype.__repr__ = function __repr__ () {
            if(AST_Atom.prototype.__repr__) return AST_Atom.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Infinity.prototype.__str__ = function __str__ () {
            if(AST_Atom.prototype.__str__) return AST_Atom.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Infinity.prototype, "__bases__", {value: [AST_Atom]});
        AST_Infinity.prototype.value = Infinity;

        function AST_Boolean() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_Boolean.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_Boolean, AST_Atom);
        AST_Boolean.prototype.__init__ = function __init__ () {
            AST_Atom.prototype.__init__ && AST_Atom.prototype.__init__.apply(this, arguments);
        };
        AST_Boolean.prototype.__repr__ = function __repr__ () {
            if(AST_Atom.prototype.__repr__) return AST_Atom.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_Boolean.prototype.__str__ = function __str__ () {
            if(AST_Atom.prototype.__str__) return AST_Atom.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_Boolean.prototype, "__bases__", {value: [AST_Atom]});

        function AST_False() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_False.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_False, AST_Boolean);
        AST_False.prototype.__init__ = function __init__ () {
            AST_Boolean.prototype.__init__ && AST_Boolean.prototype.__init__.apply(this, arguments);
        };
        AST_False.prototype.__repr__ = function __repr__ () {
            if(AST_Boolean.prototype.__repr__) return AST_Boolean.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_False.prototype.__str__ = function __str__ () {
            if(AST_Boolean.prototype.__str__) return AST_Boolean.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_False.prototype, "__bases__", {value: [AST_Boolean]});
        AST_False.prototype.value = false;

        function AST_True() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            AST_True.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(AST_True, AST_Boolean);
        AST_True.prototype.__init__ = function __init__ () {
            AST_Boolean.prototype.__init__ && AST_Boolean.prototype.__init__.apply(this, arguments);
        };
        AST_True.prototype.__repr__ = function __repr__ () {
            if(AST_Boolean.prototype.__repr__) return AST_Boolean.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        AST_True.prototype.__str__ = function __str__ () {
            if(AST_Boolean.prototype.__str__) return AST_Boolean.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(AST_True.prototype, "__bases__", {value: [AST_Boolean]});
        AST_True.prototype.value = true;

        function TreeWalker() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            TreeWalker.prototype.__init__.apply(this, arguments);
        }
        TreeWalker.prototype.__init__ = function __init__(callback) {
            var self = this;
            self.visit = callback;
            self.stack = ρσ_list_decorate([]);
        };
        Object.defineProperties(TreeWalker.prototype.__init__, {
            __argnames__ : {value: ["callback"]}
        });
        TreeWalker.__argnames__ = TreeWalker.prototype.__init__.__argnames__;
        TreeWalker.__handles_kwarg_interpolation__ = TreeWalker.prototype.__init__.__handles_kwarg_interpolation__;
        TreeWalker.prototype._visit = function _visit(node, descend) {
            var self = this;
            var ret;
            self.stack.push(node);
            ret = self.visit(node, (descend) ? function () {
                descend.call(node);
            } : noop);
            if (!ret && descend) {
                descend.call(node);
            }
            self.stack.pop();
            return ret;
        };
        Object.defineProperties(TreeWalker.prototype._visit, {
            __argnames__ : {value: ["node", "descend"]}
        });
        TreeWalker.prototype.parent = function parent(n) {
            var self = this;
            return (ρσ_expr_temp = self.stack)[ρσ_bound_index(self.stack.length - 2 - (n || 0), ρσ_expr_temp)];
        };
        Object.defineProperties(TreeWalker.prototype.parent, {
            __argnames__ : {value: ["n"]}
        });
        TreeWalker.prototype.push = function push(node) {
            var self = this;
            self.stack.push(node);
        };
        Object.defineProperties(TreeWalker.prototype.push, {
            __argnames__ : {value: ["node"]}
        });
        TreeWalker.prototype.pop = function pop() {
            var self = this;
            return self.stack.pop();
        };
        Object.defineProperties(TreeWalker.prototype.pop, {
            __argnames__ : {value: []}
        });
        TreeWalker.prototype.self = function self() {
            var s = this;
            return (ρσ_expr_temp = s.stack)[ρσ_bound_index(s.stack.length - 1, ρσ_expr_temp)];
        };
        Object.defineProperties(TreeWalker.prototype.self, {
            __argnames__ : {value: []}
        });
        TreeWalker.prototype.find_parent = function find_parent(type) {
            var self = this;
            var stack, x, i;
            stack = self.stack;
            for (var ρσ_Index35 = stack.length - 1; ρσ_Index35 > -1; ρσ_Index35-=1) {
                i = ρσ_Index35;
                x = stack[(typeof i === "number" && i < 0) ? stack.length + i : i];
                if (is_node_type(x, type)) {
                    return x;
                }
            }
        };
        Object.defineProperties(TreeWalker.prototype.find_parent, {
            __argnames__ : {value: ["type"]}
        });
        TreeWalker.prototype.in_boolean_context = function in_boolean_context() {
            var self = this;
            var stack, i, p;
            stack = self.stack;
            i = stack.length;
            self = stack[ρσ_bound_index(i -= 1, stack)];
            while (i > 0) {
                p = stack[ρσ_bound_index(i -= 1, stack)];
                if (is_node_type(p, AST_If) && p.condition === self || is_node_type(p, AST_Conditional) && p.condition === self || is_node_type(p, AST_DWLoop) && p.condition === self || is_node_type(p, AST_UnaryPrefix) && p.operator === "!" && p.expression === self) {
                    return true;
                }
                if (!(is_node_type(p, AST_Binary) && (p.operator === "&&" || p.operator === "||"))) {
                    return false;
                }
                self = p;
            }
        };
        Object.defineProperties(TreeWalker.prototype.in_boolean_context, {
            __argnames__ : {value: []}
        });
        TreeWalker.prototype.__repr__ = function __repr__ () {
                        return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        TreeWalker.prototype.__str__ = function __str__ () {
            return this.__repr__();
        };
        Object.defineProperty(TreeWalker.prototype, "__bases__", {value: []});

        function Found() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            Found.prototype.__init__.apply(this, arguments);
        }
        ρσ_extends(Found, Exception);
        Found.prototype.__init__ = function __init__ () {
            Exception.prototype.__init__ && Exception.prototype.__init__.apply(this, arguments);
        };
        Found.prototype.__repr__ = function __repr__ () {
            if(Exception.prototype.__repr__) return Exception.prototype.__repr__.call(this);
            return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        Found.prototype.__str__ = function __str__ () {
            if(Exception.prototype.__str__) return Exception.prototype.__str__.call(this);
return this.__repr__();
        };
        Object.defineProperty(Found.prototype, "__bases__", {value: [Exception]});
        

        function has_calls(expression) {
            if (!expression) {
                return false;
            }
            try {
                expression.walk(new TreeWalker((function() {
                    var ρσ_anonfunc = function (node) {
                        if (is_node_type(node, AST_BaseCall) || is_node_type(node, AST_ItemAccess)) {
                            throw new Found;
                        }
                    };
                    Object.defineProperties(ρσ_anonfunc, {
                        __argnames__ : {value: ["node"]}
                    });
                    return ρσ_anonfunc;
                })()));
            } catch (ρσ_Exception) {
                ρσ_last_exception = ρσ_Exception;
                if (ρσ_Exception instanceof Found) {
                    return true;
                } else {
                    throw ρσ_Exception;
                }
            }
            return false;
        };
        Object.defineProperties(has_calls, {
            __argnames__ : {value: ["expression"]}
        });

        ρσ_modules.ast.is_node_type = is_node_type;
        ρσ_modules.ast.AST = AST;
        ρσ_modules.ast.AST_Token = AST_Token;
        ρσ_modules.ast.AST_Node = AST_Node;
        ρσ_modules.ast.AST_Statement = AST_Statement;
        ρσ_modules.ast.AST_Debugger = AST_Debugger;
        ρσ_modules.ast.AST_Directive = AST_Directive;
        ρσ_modules.ast.AST_SimpleStatement = AST_SimpleStatement;
        ρσ_modules.ast.AST_Assert = AST_Assert;
        ρσ_modules.ast.walk_body = walk_body;
        ρσ_modules.ast.AST_Block = AST_Block;
        ρσ_modules.ast.AST_BlockStatement = AST_BlockStatement;
        ρσ_modules.ast.AST_EmptyStatement = AST_EmptyStatement;
        ρσ_modules.ast.AST_StatementWithBody = AST_StatementWithBody;
        ρσ_modules.ast.AST_DWLoop = AST_DWLoop;
        ρσ_modules.ast.AST_Do = AST_Do;
        ρσ_modules.ast.AST_While = AST_While;
        ρσ_modules.ast.AST_ForIn = AST_ForIn;
        ρσ_modules.ast.AST_ForJS = AST_ForJS;
        ρσ_modules.ast.AST_ListComprehension = AST_ListComprehension;
        ρσ_modules.ast.AST_SetComprehension = AST_SetComprehension;
        ρσ_modules.ast.AST_DictComprehension = AST_DictComprehension;
        ρσ_modules.ast.AST_GeneratorComprehension = AST_GeneratorComprehension;
        ρσ_modules.ast.AST_With = AST_With;
        ρσ_modules.ast.AST_WithClause = AST_WithClause;
        ρσ_modules.ast.AST_Scope = AST_Scope;
        ρσ_modules.ast.AST_Toplevel = AST_Toplevel;
        ρσ_modules.ast.AST_Import = AST_Import;
        ρσ_modules.ast.AST_Imports = AST_Imports;
        ρσ_modules.ast.AST_Decorator = AST_Decorator;
        ρσ_modules.ast.AST_Lambda = AST_Lambda;
        ρσ_modules.ast.AST_Function = AST_Function;
        ρσ_modules.ast.AST_Class = AST_Class;
        ρσ_modules.ast.AST_Method = AST_Method;
        ρσ_modules.ast.AST_Jump = AST_Jump;
        ρσ_modules.ast.AST_Exit = AST_Exit;
        ρσ_modules.ast.AST_Return = AST_Return;
        ρσ_modules.ast.AST_Yield = AST_Yield;
        ρσ_modules.ast.AST_Throw = AST_Throw;
        ρσ_modules.ast.AST_LoopControl = AST_LoopControl;
        ρσ_modules.ast.AST_Break = AST_Break;
        ρσ_modules.ast.AST_Continue = AST_Continue;
        ρσ_modules.ast.AST_If = AST_If;
        ρσ_modules.ast.AST_Try = AST_Try;
        ρσ_modules.ast.AST_Catch = AST_Catch;
        ρσ_modules.ast.AST_Except = AST_Except;
        ρσ_modules.ast.AST_Finally = AST_Finally;
        ρσ_modules.ast.AST_Definitions = AST_Definitions;
        ρσ_modules.ast.AST_Var = AST_Var;
        ρσ_modules.ast.AST_VarDef = AST_VarDef;
        ρσ_modules.ast.AST_BaseCall = AST_BaseCall;
        ρσ_modules.ast.AST_Call = AST_Call;
        ρσ_modules.ast.AST_ClassCall = AST_ClassCall;
        ρσ_modules.ast.AST_New = AST_New;
        ρσ_modules.ast.AST_Seq = AST_Seq;
        ρσ_modules.ast.AST_PropAccess = AST_PropAccess;
        ρσ_modules.ast.AST_Dot = AST_Dot;
        ρσ_modules.ast.AST_Sub = AST_Sub;
        ρσ_modules.ast.AST_ItemAccess = AST_ItemAccess;
        ρσ_modules.ast.AST_Splice = AST_Splice;
        ρσ_modules.ast.AST_Unary = AST_Unary;
        ρσ_modules.ast.AST_UnaryPrefix = AST_UnaryPrefix;
        ρσ_modules.ast.AST_Binary = AST_Binary;
        ρσ_modules.ast.AST_Existential = AST_Existential;
        ρσ_modules.ast.AST_Conditional = AST_Conditional;
        ρσ_modules.ast.AST_Assign = AST_Assign;
        ρσ_modules.ast.AST_Array = AST_Array;
        ρσ_modules.ast.AST_Object = AST_Object;
        ρσ_modules.ast.AST_ExpressiveObject = AST_ExpressiveObject;
        ρσ_modules.ast.AST_ObjectProperty = AST_ObjectProperty;
        ρσ_modules.ast.AST_ObjectKeyVal = AST_ObjectKeyVal;
        ρσ_modules.ast.AST_Set = AST_Set;
        ρσ_modules.ast.AST_SetItem = AST_SetItem;
        ρσ_modules.ast.AST_Symbol = AST_Symbol;
        ρσ_modules.ast.AST_SymbolAlias = AST_SymbolAlias;
        ρσ_modules.ast.AST_SymbolDeclaration = AST_SymbolDeclaration;
        ρσ_modules.ast.AST_SymbolVar = AST_SymbolVar;
        ρσ_modules.ast.AST_ImportedVar = AST_ImportedVar;
        ρσ_modules.ast.AST_SymbolConst = AST_SymbolConst;
        ρσ_modules.ast.AST_SymbolNonlocal = AST_SymbolNonlocal;
        ρσ_modules.ast.AST_SymbolFunarg = AST_SymbolFunarg;
        ρσ_modules.ast.AST_SymbolDefun = AST_SymbolDefun;
        ρσ_modules.ast.AST_SymbolLambda = AST_SymbolLambda;
        ρσ_modules.ast.AST_SymbolCatch = AST_SymbolCatch;
        ρσ_modules.ast.AST_SymbolRef = AST_SymbolRef;
        ρσ_modules.ast.AST_This = AST_This;
        ρσ_modules.ast.AST_Constant = AST_Constant;
        ρσ_modules.ast.AST_String = AST_String;
        ρσ_modules.ast.AST_Verbatim = AST_Verbatim;
        ρσ_modules.ast.AST_Number = AST_Number;
        ρσ_modules.ast.AST_RegExp = AST_RegExp;
        ρσ_modules.ast.AST_Atom = AST_Atom;
        ρσ_modules.ast.AST_Null = AST_Null;
        ρσ_modules.ast.AST_NaN = AST_NaN;
        ρσ_modules.ast.AST_Undefined = AST_Undefined;
        ρσ_modules.ast.AST_Hole = AST_Hole;
        ρσ_modules.ast.AST_Infinity = AST_Infinity;
        ρσ_modules.ast.AST_Boolean = AST_Boolean;
        ρσ_modules.ast.AST_False = AST_False;
        ρσ_modules.ast.AST_True = AST_True;
        ρσ_modules.ast.TreeWalker = TreeWalker;
        ρσ_modules.ast.Found = Found;
        ρσ_modules.ast.has_calls = has_calls;
    })();

    (function(){
        var __name__ = "string_interpolation";
        function quoted_string(x) {
            return "\"" + x.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\n/g, "\\n") + "\"";
        };
        Object.defineProperties(quoted_string, {
            __argnames__ : {value: ["x"]}
        });

        function render_markup(markup) {
            var ρσ_unpack, pos, key, ch, fmtspec;
            ρσ_unpack = [0, ""];
            pos = ρσ_unpack[0];
            key = ρσ_unpack[1];
            while (pos < markup.length) {
                ch = markup[(typeof pos === "number" && pos < 0) ? markup.length + pos : pos];
                if (ch === "!" || ch === ":") {
                    break;
                }
                key += ch;
                pos += 1;
            }
            fmtspec = markup.slice(pos);
            return "ρσ_str.format(\"{" + fmtspec + "}\", " + key + ")";
        };
        Object.defineProperties(render_markup, {
            __argnames__ : {value: ["markup"]}
        });

        function interpolate(template, raise_error) {
            var pos, in_brace, markup, ans, ch;
            pos = in_brace = 0;
            markup = "";
            ans = [""];
            while (pos < template.length) {
                ch = template[(typeof pos === "number" && pos < 0) ? template.length + pos : pos];
                if (in_brace) {
                    if (ch === "{") {
                        in_brace += 1;
                        markup += "{";
                    } else if (ch === "}") {
                        in_brace -= 1;
                        if (in_brace > 0) {
                            markup += "}";
                        } else {
                            ans.push([markup]);
                            ans.push("");
                        }
                    } else {
                        markup += ch;
                    }
                } else {
                    if (ch === "{") {
                        if (template[ρσ_bound_index(pos + 1, template)] === "{") {
                            pos += 1;
                            ans[ans.length-1] += "{";
                        } else {
                            in_brace = 1;
                            markup = "";
                        }
                    } else {
                        ans[ans.length-1] += ch;
                    }
                }
                pos += 1;
            }
            if (in_brace) {
                raise_error("expected '}' before end of string");
            }
            if (ans[ans.length-1] === "+") {
                ans[ans.length-1] = "";
            }
            for (var i = 0; i < ans.length; i++) {
                if (typeof ans[(typeof i === "number" && i < 0) ? ans.length + i : i] === "string") {
                    ans[(typeof i === "number" && i < 0) ? ans.length + i : i] = quoted_string(ans[(typeof i === "number" && i < 0) ? ans.length + i : i]);
                } else {
                    ans[(typeof i === "number" && i < 0) ? ans.length + i : i] = "+" + render_markup.apply(this, ans[(typeof i === "number" && i < 0) ? ans.length + i : i]) + "+";
                }
            }
            return ans.join("");
        };
        Object.defineProperties(interpolate, {
            __argnames__ : {value: ["template", "raise_error"]}
        });

        ρσ_modules.string_interpolation.quoted_string = quoted_string;
        ρσ_modules.string_interpolation.render_markup = render_markup;
        ρσ_modules.string_interpolation.interpolate = interpolate;
    })();

    (function(){
        var __name__ = "tokenizer";
        var RE_HEX_NUMBER, RE_OCT_NUMBER, RE_DEC_NUMBER, OPERATOR_CHARS, ASCII_CONTROL_CHARS, HEX_PAT, NAME_PAT, OPERATORS, OP_MAP, WHITESPACE_CHARS, PUNC_BEFORE_EXPRESSION, PUNC_CHARS, KEYWORDS, KEYWORDS_ATOM, RESERVED_WORDS, KEYWORDS_BEFORE_EXPRESSION, ALL_KEYWORDS, IDENTIFIER_PAT, UNICODE, EX_EOF;
        var ALIAS_MAP = ρσ_modules.unicode_aliases.ALIAS_MAP;

        var make_predicate = ρσ_modules.utils.make_predicate;
        var characters = ρσ_modules.utils.characters;

        var AST_Token = ρσ_modules.ast.AST_Token;

        var SyntaxError = ρσ_modules.errors.SyntaxError;

        var interpolate = ρσ_modules.string_interpolation.interpolate;

        RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
        RE_OCT_NUMBER = /^0[0-7]+$/;
        RE_DEC_NUMBER = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i;
        OPERATOR_CHARS = make_predicate(characters("+-*&%=<>!?|~^@"));
        ASCII_CONTROL_CHARS = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["a"] = 7;
            ρσ_d["b"] = 8;
            ρσ_d["f"] = 12;
            ρσ_d["n"] = 10;
            ρσ_d["r"] = 13;
            ρσ_d["t"] = 9;
            ρσ_d["v"] = 11;
            return ρσ_d;
        }).call(this);
        HEX_PAT = /[a-fA-F0-9]/;
        NAME_PAT = /[a-zA-Z ]/;
        OPERATORS = make_predicate(ρσ_list_decorate([ "in", "instanceof", "typeof", "new", "void", "del", "+", "-", "not", "~", "&", "|", "^", "**", "*", "//", "/", "%", ">>", "<<", ">>>", "<", ">", "<=", ">=", "==", "is", "!=", "=", "+=", "-=", "//=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=", "and", "or", "@", "->" ]));
        OP_MAP = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["or"] = "||";
            ρσ_d["and"] = "&&";
            ρσ_d["not"] = "!";
            ρσ_d["del"] = "delete";
            ρσ_d["None"] = "null";
            ρσ_d["is"] = "===";
            return ρσ_d;
        }).call(this);
        WHITESPACE_CHARS = make_predicate(characters("  \n\r\t\f\u000b​᠎           \u202f 　"));
        PUNC_BEFORE_EXPRESSION = make_predicate(characters("[{(,.;:"));
        PUNC_CHARS = make_predicate(characters("[]{}(),;:?"));
        KEYWORDS = "as assert break class continue def del do elif else except finally for from if import in is new nonlocal pass raise return yield try while with or and not";
        KEYWORDS_ATOM = "False None True";
        RESERVED_WORDS = "break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof new return super switch this throw try typeof var void while with yield enum implements static private package let public protected interface await null true false";
        KEYWORDS_BEFORE_EXPRESSION = "return yield new del raise elif else if";
        ALL_KEYWORDS = KEYWORDS + " " + KEYWORDS_ATOM;
        KEYWORDS = make_predicate(KEYWORDS);
        RESERVED_WORDS = make_predicate(RESERVED_WORDS);
        KEYWORDS_BEFORE_EXPRESSION = make_predicate(KEYWORDS_BEFORE_EXPRESSION);
        KEYWORDS_ATOM = make_predicate(KEYWORDS_ATOM);
        IDENTIFIER_PAT = /^[a-z_$][_a-z0-9$]*$/i;
        function is_string_modifier(val) {
            var ch;
            var ρσ_Iter36 = ρσ_Iterable(val);
            for (var ρσ_Index36 = 0; ρσ_Index36 < ρσ_Iter36.length; ρσ_Index36++) {
                ch = ρσ_Iter36[ρσ_Index36];
                if ("vrufVRUF".indexOf(ch) === -1) {
                    return false;
                }
            }
            return true;
        };
        Object.defineProperties(is_string_modifier, {
            __argnames__ : {value: ["val"]}
        });

        function is_letter(code) {
            return code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 170 && UNICODE.letter.test(String.fromCharCode(code));
        };
        Object.defineProperties(is_letter, {
            __argnames__ : {value: ["code"]}
        });

        function is_digit(code) {
            return code >= 48 && code <= 57;
        };
        Object.defineProperties(is_digit, {
            __argnames__ : {value: ["code"]}
        });

        function is_alphanumeric_char(code) {
            return is_digit(code) || is_letter(code);
        };
        Object.defineProperties(is_alphanumeric_char, {
            __argnames__ : {value: ["code"]}
        });

        function is_unicode_combining_mark(ch) {
            return UNICODE.non_spacing_mark.test(ch) || UNICODE.space_combining_mark.test(ch);
        };
        Object.defineProperties(is_unicode_combining_mark, {
            __argnames__ : {value: ["ch"]}
        });

        function is_unicode_connector_punctuation(ch) {
            return UNICODE.connector_punctuation.test(ch);
        };
        Object.defineProperties(is_unicode_connector_punctuation, {
            __argnames__ : {value: ["ch"]}
        });

        function is_identifier(name) {
            return !RESERVED_WORDS[(typeof name === "number" && name < 0) ? RESERVED_WORDS.length + name : name] && !KEYWORDS[(typeof name === "number" && name < 0) ? KEYWORDS.length + name : name] && !KEYWORDS_ATOM[(typeof name === "number" && name < 0) ? KEYWORDS_ATOM.length + name : name] && IDENTIFIER_PAT.test(name);
        };
        Object.defineProperties(is_identifier, {
            __argnames__ : {value: ["name"]}
        });

        function is_identifier_start(code) {
            return code === 36 || code === 95 || is_letter(code);
        };
        Object.defineProperties(is_identifier_start, {
            __argnames__ : {value: ["code"]}
        });

        function is_identifier_char(ch) {
            var code;
            code = ch.charCodeAt(0);
            return is_identifier_start(code) || is_digit(code) || code === 8204 || code === 8205 || is_unicode_combining_mark(ch) || is_unicode_connector_punctuation(ch);
        };
        Object.defineProperties(is_identifier_char, {
            __argnames__ : {value: ["ch"]}
        });

        function parse_js_number(num) {
            if (RE_HEX_NUMBER.test(num)) {
                return parseInt(num.substr(2), 16);
            } else if (RE_OCT_NUMBER.test(num)) {
                return parseInt(num.substr(1), 8);
            } else if (RE_DEC_NUMBER.test(num)) {
                return parseFloat(num);
            }
        };
        Object.defineProperties(parse_js_number, {
            __argnames__ : {value: ["num"]}
        });

        UNICODE = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["letter"] = new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0523\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971\\u0972\\u097B-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D3D\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8B\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10D0-\\u10FA\\u10FC\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19A9\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u2094\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2C6F\\u2C71-\\u2C7D\\u2C80-\\u2CE4\\u2D00-\\u2D25\\u2D30-\\u2D65\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31B7\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FC3\\uA000-\\uA48C\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA65F\\uA662-\\uA66E\\uA67F-\\uA697\\uA717-\\uA71F\\uA722-\\uA788\\uA78B\\uA78C\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA90A-\\uA925\\uA930-\\uA946\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAC00\\uD7A3\\uF900-\\uFA2D\\uFA30-\\uFA6A\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]");
            ρσ_d["non_spacing_mark"] = new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]");
            ρσ_d["space_combining_mark"] = new RegExp("[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]");
            ρσ_d["connector_punctuation"] = new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]");
            return ρσ_d;
        }).call(this);
        function is_token(token, type, val) {
            return token.type === type && (val === null || val === undefined || token.value === val);
        };
        Object.defineProperties(is_token, {
            __argnames__ : {value: ["token", "type", "val"]}
        });

        EX_EOF = Object.create(null);
        function tokenizer(raw_text, filename) {
            var S, read_string, read_regexp;
            S = (function(){
                var ρσ_d = Object.create(null);
                ρσ_d["text"] = raw_text.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/\uFEFF/g, "");
                ρσ_d["filename"] = filename;
                ρσ_d["pos"] = 0;
                ρσ_d["tokpos"] = 0;
                ρσ_d["line"] = 1;
                ρσ_d["tokline"] = 0;
                ρσ_d["col"] = 0;
                ρσ_d["tokcol"] = 0;
                ρσ_d["newline_before"] = false;
                ρσ_d["regex_allowed"] = false;
                ρσ_d["comments_before"] = [];
                ρσ_d["whitespace_before"] = [];
                ρσ_d["newblock"] = false;
                ρσ_d["endblock"] = false;
                ρσ_d["indentation_matters"] = [ true ];
                ρσ_d["cached_whitespace"] = "";
                ρσ_d["prev"] = undefined;
                ρσ_d["index_or_slice"] = [ false ];
                ρσ_d["expecting_object_literal_key"] = false;
                return ρσ_d;
            }).call(this);
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
            Object.defineProperties(next, {
                __argnames__ : {value: ["signal_eof", "in_string"]}
            });

            function find(what, signal_eof) {
                var pos;
                pos = S.text.indexOf(what, S.pos);
                if (signal_eof && pos === -1) {
                    throw EX_EOF;
                }
                return pos;
            };
            Object.defineProperties(find, {
                __argnames__ : {value: ["what", "signal_eof"]}
            });

            function start_token() {
                S.tokline = S.line;
                S.tokcol = S.col;
                S.tokpos = S.pos;
            };

            function token(type, value, is_comment, keep_newline) {
                var ret, i;
                S.regex_allowed = type === "operator" || type === "keyword" && KEYWORDS_BEFORE_EXPRESSION[(typeof value === "number" && value < 0) ? KEYWORDS_BEFORE_EXPRESSION.length + value : value] || type === "punc" && PUNC_BEFORE_EXPRESSION[(typeof value === "number" && value < 0) ? PUNC_BEFORE_EXPRESSION.length + value : value];
                if (type === "operator" && value === "is" && S.text.substr(S.pos).trimLeft().substr(0, 4).trimRight() === "not") {
                    next_token();
                    value = "!==";
                }
                if (type === "operator" && OP_MAP[(typeof value === "number" && value < 0) ? OP_MAP.length + value : value]) {
                    value = OP_MAP[(typeof value === "number" && value < 0) ? OP_MAP.length + value : value];
                }
                ret = (function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["type"] = type;
                    ρσ_d["value"] = value;
                    ρσ_d["line"] = S.tokline;
                    ρσ_d["col"] = S.tokcol;
                    ρσ_d["pos"] = S.tokpos;
                    ρσ_d["endpos"] = S.pos;
                    ρσ_d["nlb"] = S.newline_before;
                    ρσ_d["file"] = filename;
                    return ρσ_d;
                }).call(this);
                if (!is_comment) {
                    ret.comments_before = S.comments_before;
                    S.comments_before = [];
                    for (var ρσ_Index37 = 0; ρσ_Index37 < ret.comments_before.length; ρσ_Index37++) {
                        i = ρσ_Index37;
                        ret.nlb = ret.nlb || (ρσ_expr_temp = ret.comments_before)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i].nlb;
                    }
                }
                if (!keep_newline) {
                    S.newline_before = false;
                }
                if (type === "punc") {
                    if (value === ":" && !(ρσ_expr_temp = S.index_or_slice)[ρσ_expr_temp.length-1] && !S.expecting_object_literal_key && (!S.text.substring(S.pos + 1, find("\n")).trim() || !S.text.substring(S.pos + 1, find("#")).trim())) {
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
            Object.defineProperties(token, {
                __argnames__ : {value: ["type", "value", "is_comment", "keep_newline"]}
            });

            function parse_whitespace() {
                var leading_whitespace, whitespace_exists, ch;
                leading_whitespace = "";
                whitespace_exists = false;
                while (WHITESPACE_CHARS[ρσ_bound_index(peek(), WHITESPACE_CHARS)]) {
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
                most_recent = (ρσ_expr_temp = S.whitespace_before)[ρσ_expr_temp.length-1] || "";
                S.endblock = false;
                if ((ρσ_expr_temp = S.indentation_matters)[ρσ_expr_temp.length-1] && leading_whitespace !== most_recent) {
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
            Object.defineProperties(test_indent_token, {
                __argnames__ : {value: ["leading_whitespace"]}
            });

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
            Object.defineProperties(read_while, {
                __argnames__ : {value: ["pred"]}
            });

            function parse_error(err, is_eof) {
                throw new SyntaxError(err, filename, S.tokline, S.tokcol, S.tokpos, is_eof);
            };
            Object.defineProperties(parse_error, {
                __argnames__ : {value: ["err", "is_eof"]}
            });

            function read_num(prefix) {
                var has_e, has_x, has_dot, num, valid, seen;
                has_e = false;
                has_x = false;
                has_dot = prefix === ".";
                if (!prefix && peek() === "0" && S.text.charAt(S.pos + 1) === "b") {
                    [next(), next()];
                    num = read_while((function() {
                        var ρσ_anonfunc = function (ch) {
                            return ch === "0" || ch === "1";
                        };
                        Object.defineProperties(ρσ_anonfunc, {
                            __argnames__ : {value: ["ch"]}
                        });
                        return ρσ_anonfunc;
                    })());
                    valid = parseInt(num, 2);
                    if (isNaN(valid)) {
                        parse_error("Invalid syntax for a binary number");
                    }
                    return token("num", valid);
                }
                seen = [];
                num = read_while((function() {
                    var ρσ_anonfunc = function (ch, i) {
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
                            if (has_e || (i === 0 || typeof i === "object" && ρσ_equals(i, 0))) {
                                return false;
                            }
                            has_e = true;
                            return true;
                        } else if (ch === "-") {
                            if (i === 0 && !prefix) {
                                return true;
                            }
                            if (has_e && seen[ρσ_bound_index(i - 1, seen)].toLowerCase() === "e") {
                                return true;
                            }
                            return false;
                        } else if (ch === "+") {
                            if (has_e && seen[ρσ_bound_index(i - 1, seen)].toLowerCase() === "e") {
                                return true;
                            }
                            return false;
                        } else if (ch === ".") {
                            return (!has_dot && !has_x && !has_e) ? has_dot = true : false;
                        }
                        return is_alphanumeric_char(ch.charCodeAt(0));
                    };
                    Object.defineProperties(ρσ_anonfunc, {
                        __argnames__ : {value: ["ch", "i"]}
                    });
                    return ρσ_anonfunc;
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
            Object.defineProperties(read_num, {
                __argnames__ : {value: ["prefix"]}
            });

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
            Object.defineProperties(read_hex_digits, {
                __argnames__ : {value: ["count"]}
            });

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
                if (ASCII_CONTROL_CHARS[(typeof q === "number" && q < 0) ? ASCII_CONTROL_CHARS.length + q : q]) {
                    return String.fromCharCode(ASCII_CONTROL_CHARS[(typeof q === "number" && q < 0) ? ASCII_CONTROL_CHARS.length + q : q]);
                }
                if ("0" <= q && q <= "7") {
                    octal = q;
                    if ("0" <= (ρσ_cond_temp = peek()) && ρσ_cond_temp <= "7") {
                        octal += next();
                    }
                    if ("0" <= (ρσ_cond_temp = peek()) && ρσ_cond_temp <= "7") {
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
                        var ρσ_anonfunc = function (ch) {
                            return NAME_PAT.test(ch);
                        };
                        Object.defineProperties(ρσ_anonfunc, {
                            __argnames__ : {value: ["ch"]}
                        });
                        return ρσ_anonfunc;
                    })());
                    if (peek() !== "}") {
                        return "\\N{" + name;
                    }
                    next();
                    key = (name || "").toLowerCase();
                    if (!name || !Object.prototype.hasOwnProperty.call(ALIAS_MAP, key)) {
                        return "\\N{" + name + "}";
                    }
                    code = ALIAS_MAP[(typeof key === "number" && key < 0) ? ALIAS_MAP.length + key : key];
                    if (code <= 65535) {
                        return String.fromCharCode(code);
                    }
                    code -= 65536;
                    return String.fromCharCode(55296 + (code >> 10), 56320 + (code & 1023));
                }
                return "\\" + q;
            };

            function with_eof_error(eof_error, cont) {
                return function () {
                    try {
                        return cont.apply(null, arguments);
                    } catch (ρσ_Exception) {
                        ρσ_last_exception = ρσ_Exception;
                        {
                            var ex = ρσ_Exception;
                            if (ex === EX_EOF) {
                                parse_error(eof_error, true);
                            } else {
                                throw ρσ_Exception;
                            }
                        } 
                    }
                };
            };
            Object.defineProperties(with_eof_error, {
                __argnames__ : {value: ["eof_error", "cont"]}
            });

            read_string = with_eof_error("Unterminated string constant", (function() {
                var ρσ_anonfunc = function (is_raw_literal, is_js_literal) {
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
                    while (ch = next(true, true)) {
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
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["is_raw_literal", "is_js_literal"]}
                });
                return ρσ_anonfunc;
            })());
            function handle_interpolated_string(string, start_tok) {
                function raise_error(err) {
                    throw new SyntaxError(err, filename, start_tok.line, start_tok.col, start_tok.pos, false);
                };
                Object.defineProperties(raise_error, {
                    __argnames__ : {value: ["err"]}
                });

                S.text = S.text.slice(0, S.pos) + "(" + interpolate(string, raise_error) + ")" + S.text.slice(S.pos);
                return token("punc", next());
            };
            Object.defineProperties(handle_interpolated_string, {
                __argnames__ : {value: ["string", "start_tok"]}
            });

            function read_line_comment(shebang) {
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
            Object.defineProperties(read_line_comment, {
                __argnames__ : {value: ["shebang"]}
            });

            function read_name() {
                var name, ch;
                name = ch = "";
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

            read_regexp = with_eof_error("Unterminated regular expression", function () {
                var prev_backslash, regexp, ch, in_class, verbose_regexp, in_comment, mods;
                prev_backslash = false;
                regexp = ch = "";
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
                    if (OPERATORS[(typeof bigger === "number" && bigger < 0) ? OPERATORS.length + bigger : bigger]) {
                        next();
                        return grow(bigger);
                    } else {
                        return op;
                    }
                };
                Object.defineProperties(grow, {
                    __argnames__ : {value: ["op"]}
                });

                op = grow(prefix || next());
                if (op === "->") {
                    return token("punc", op);
                }
                return token("operator", op);
            };
            Object.defineProperties(read_operator, {
                __argnames__ : {value: ["prefix"]}
            });

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
                return (KEYWORDS_ATOM[(typeof word === "number" && word < 0) ? KEYWORDS_ATOM.length + word : word]) ? token("atom", word) : (!KEYWORDS[(typeof word === "number" && word < 0) ? KEYWORDS.length + word : word]) ? token("name", word) : (OPERATORS[(typeof word === "number" && word < 0) ? OPERATORS.length + word : word] && prevChar() !== ".") ? token("operator", word) : token("keyword", word);
            };

            function next_token() {
                var indent, ch, code, tmp_, regex_allowed, tok, mods, start_pos_for_string, stok;
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
                if (PUNC_CHARS[(typeof ch === "number" && ch < 0) ? PUNC_CHARS.length + ch : ch]) {
                    return token("punc", next());
                }
                if (OPERATOR_CHARS[(typeof ch === "number" && ch < 0) ? OPERATOR_CHARS.length + ch : ch]) {
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
                        start_pos_for_string = S.tokpos;
                        stok = read_string(mods.indexOf("r") !== -1, mods.indexOf("v") !== -1);
                        tok.endpos = stok.endpos;
                        if (stok.type !== "js" && mods.indexOf("f") !== -1) {
                            tok.col += start_pos_for_string - tok.pos;
                            return handle_interpolated_string(stok.value, tok);
                        }
                        tok.value = stok.value;
                        tok.type = stok.type;
                    }
                    return tok;
                }
                parse_error("Unexpected character «" + ch + "»");
            };

            next_token.context = (function() {
                var ρσ_anonfunc = function (nc) {
                    if (nc) {
                        S = nc;
                    }
                    return S;
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["nc"]}
                });
                return ρσ_anonfunc;
            })();
            return next_token;
        };
        Object.defineProperties(tokenizer, {
            __argnames__ : {value: ["raw_text", "filename"]}
        });

        ρσ_modules.tokenizer.RE_HEX_NUMBER = RE_HEX_NUMBER;
        ρσ_modules.tokenizer.RE_OCT_NUMBER = RE_OCT_NUMBER;
        ρσ_modules.tokenizer.RE_DEC_NUMBER = RE_DEC_NUMBER;
        ρσ_modules.tokenizer.OPERATOR_CHARS = OPERATOR_CHARS;
        ρσ_modules.tokenizer.ASCII_CONTROL_CHARS = ASCII_CONTROL_CHARS;
        ρσ_modules.tokenizer.HEX_PAT = HEX_PAT;
        ρσ_modules.tokenizer.NAME_PAT = NAME_PAT;
        ρσ_modules.tokenizer.OPERATORS = OPERATORS;
        ρσ_modules.tokenizer.OP_MAP = OP_MAP;
        ρσ_modules.tokenizer.WHITESPACE_CHARS = WHITESPACE_CHARS;
        ρσ_modules.tokenizer.PUNC_BEFORE_EXPRESSION = PUNC_BEFORE_EXPRESSION;
        ρσ_modules.tokenizer.PUNC_CHARS = PUNC_CHARS;
        ρσ_modules.tokenizer.KEYWORDS = KEYWORDS;
        ρσ_modules.tokenizer.KEYWORDS_ATOM = KEYWORDS_ATOM;
        ρσ_modules.tokenizer.RESERVED_WORDS = RESERVED_WORDS;
        ρσ_modules.tokenizer.KEYWORDS_BEFORE_EXPRESSION = KEYWORDS_BEFORE_EXPRESSION;
        ρσ_modules.tokenizer.ALL_KEYWORDS = ALL_KEYWORDS;
        ρσ_modules.tokenizer.IDENTIFIER_PAT = IDENTIFIER_PAT;
        ρσ_modules.tokenizer.UNICODE = UNICODE;
        ρσ_modules.tokenizer.EX_EOF = EX_EOF;
        ρσ_modules.tokenizer.is_string_modifier = is_string_modifier;
        ρσ_modules.tokenizer.is_letter = is_letter;
        ρσ_modules.tokenizer.is_digit = is_digit;
        ρσ_modules.tokenizer.is_alphanumeric_char = is_alphanumeric_char;
        ρσ_modules.tokenizer.is_unicode_combining_mark = is_unicode_combining_mark;
        ρσ_modules.tokenizer.is_unicode_connector_punctuation = is_unicode_connector_punctuation;
        ρσ_modules.tokenizer.is_identifier = is_identifier;
        ρσ_modules.tokenizer.is_identifier_start = is_identifier_start;
        ρσ_modules.tokenizer.is_identifier_char = is_identifier_char;
        ρσ_modules.tokenizer.parse_js_number = parse_js_number;
        ρσ_modules.tokenizer.is_token = is_token;
        ρσ_modules.tokenizer.tokenizer = tokenizer;
    })();

    (function(){
        var __name__ = "parse";
        var COMPILER_VERSION, PYTHON_FLAGS, NATIVE_CLASSES, ERROR_CLASSES, COMMON_STATIC, FORBIDDEN_CLASS_VARS, UNARY_PREFIX, ASSIGNMENT, PRECEDENCE, STATEMENTS_WITH_LABELS, ATOMIC_START_TOKEN, compile_time_decorators;
        var make_predicate = ρσ_modules.utils.make_predicate;
        var array_to_hash = ρσ_modules.utils.array_to_hash;
        var defaults = ρσ_modules.utils.defaults;
        var has_prop = ρσ_modules.utils.has_prop;
        var cache_file_name = ρσ_modules.utils.cache_file_name;

        var SyntaxError = ρσ_modules.errors.SyntaxError;
        var ImportError = ρσ_modules.errors.ImportError;

        var AST_Array = ρσ_modules.ast.AST_Array;
        var AST_Assign = ρσ_modules.ast.AST_Assign;
        var AST_Binary = ρσ_modules.ast.AST_Binary;
        var AST_BlockStatement = ρσ_modules.ast.AST_BlockStatement;
        var AST_Break = ρσ_modules.ast.AST_Break;
        var AST_Call = ρσ_modules.ast.AST_Call;
        var AST_Catch = ρσ_modules.ast.AST_Catch;
        var AST_Class = ρσ_modules.ast.AST_Class;
        var AST_ClassCall = ρσ_modules.ast.AST_ClassCall;
        var AST_Conditional = ρσ_modules.ast.AST_Conditional;
        var AST_Constant = ρσ_modules.ast.AST_Constant;
        var AST_Continue = ρσ_modules.ast.AST_Continue;
        var AST_DWLoop = ρσ_modules.ast.AST_DWLoop;
        var AST_Debugger = ρσ_modules.ast.AST_Debugger;
        var AST_Decorator = ρσ_modules.ast.AST_Decorator;
        var AST_Definitions = ρσ_modules.ast.AST_Definitions;
        var AST_DictComprehension = ρσ_modules.ast.AST_DictComprehension;
        var AST_Directive = ρσ_modules.ast.AST_Directive;
        var AST_Do = ρσ_modules.ast.AST_Do;
        var AST_Dot = ρσ_modules.ast.AST_Dot;
        var AST_EmptyStatement = ρσ_modules.ast.AST_EmptyStatement;
        var AST_Except = ρσ_modules.ast.AST_Except;
        var AST_ExpressiveObject = ρσ_modules.ast.AST_ExpressiveObject;
        var AST_False = ρσ_modules.ast.AST_False;
        var AST_Finally = ρσ_modules.ast.AST_Finally;
        var AST_ForIn = ρσ_modules.ast.AST_ForIn;
        var AST_ForJS = ρσ_modules.ast.AST_ForJS;
        var AST_Function = ρσ_modules.ast.AST_Function;
        var AST_GeneratorComprehension = ρσ_modules.ast.AST_GeneratorComprehension;
        var AST_Hole = ρσ_modules.ast.AST_Hole;
        var AST_If = ρσ_modules.ast.AST_If;
        var AST_Import = ρσ_modules.ast.AST_Import;
        var AST_ImportedVar = ρσ_modules.ast.AST_ImportedVar;
        var AST_Imports = ρσ_modules.ast.AST_Imports;
        var AST_ListComprehension = ρσ_modules.ast.AST_ListComprehension;
        var AST_Method = ρσ_modules.ast.AST_Method;
        var AST_New = ρσ_modules.ast.AST_New;
        var AST_Null = ρσ_modules.ast.AST_Null;
        var AST_Number = ρσ_modules.ast.AST_Number;
        var AST_Object = ρσ_modules.ast.AST_Object;
        var AST_ObjectKeyVal = ρσ_modules.ast.AST_ObjectKeyVal;
        var AST_PropAccess = ρσ_modules.ast.AST_PropAccess;
        var AST_RegExp = ρσ_modules.ast.AST_RegExp;
        var AST_Return = ρσ_modules.ast.AST_Return;
        var AST_Scope = ρσ_modules.ast.AST_Scope;
        var AST_Set = ρσ_modules.ast.AST_Set;
        var AST_SetComprehension = ρσ_modules.ast.AST_SetComprehension;
        var AST_SetItem = ρσ_modules.ast.AST_SetItem;
        var AST_Seq = ρσ_modules.ast.AST_Seq;
        var AST_SimpleStatement = ρσ_modules.ast.AST_SimpleStatement;
        var AST_Splice = ρσ_modules.ast.AST_Splice;
        var AST_String = ρσ_modules.ast.AST_String;
        var AST_Sub = ρσ_modules.ast.AST_Sub;
        var AST_ItemAccess = ρσ_modules.ast.AST_ItemAccess;
        var AST_SymbolAlias = ρσ_modules.ast.AST_SymbolAlias;
        var AST_SymbolCatch = ρσ_modules.ast.AST_SymbolCatch;
        var AST_SymbolConst = ρσ_modules.ast.AST_SymbolConst;
        var AST_SymbolDefun = ρσ_modules.ast.AST_SymbolDefun;
        var AST_SymbolFunarg = ρσ_modules.ast.AST_SymbolFunarg;
        var AST_SymbolLambda = ρσ_modules.ast.AST_SymbolLambda;
        var AST_SymbolNonlocal = ρσ_modules.ast.AST_SymbolNonlocal;
        var AST_SymbolRef = ρσ_modules.ast.AST_SymbolRef;
        var AST_SymbolVar = ρσ_modules.ast.AST_SymbolVar;
        var AST_This = ρσ_modules.ast.AST_This;
        var AST_Throw = ρσ_modules.ast.AST_Throw;
        var AST_Toplevel = ρσ_modules.ast.AST_Toplevel;
        var AST_True = ρσ_modules.ast.AST_True;
        var AST_Try = ρσ_modules.ast.AST_Try;
        var AST_UnaryPrefix = ρσ_modules.ast.AST_UnaryPrefix;
        var AST_Undefined = ρσ_modules.ast.AST_Undefined;
        var AST_Var = ρσ_modules.ast.AST_Var;
        var AST_VarDef = ρσ_modules.ast.AST_VarDef;
        var AST_Verbatim = ρσ_modules.ast.AST_Verbatim;
        var AST_While = ρσ_modules.ast.AST_While;
        var AST_With = ρσ_modules.ast.AST_With;
        var AST_WithClause = ρσ_modules.ast.AST_WithClause;
        var AST_Yield = ρσ_modules.ast.AST_Yield;
        var AST_Assert = ρσ_modules.ast.AST_Assert;
        var AST_Existential = ρσ_modules.ast.AST_Existential;
        var is_node_type = ρσ_modules.ast.is_node_type;

        var tokenizer = ρσ_modules.tokenizer.tokenizer;
        var is_token = ρσ_modules.tokenizer.is_token;
        var RESERVED_WORDS = ρσ_modules.tokenizer.RESERVED_WORDS;

        COMPILER_VERSION = "f0297ab6606f1ba8db3203c361193a7b0d789837";
        PYTHON_FLAGS = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["dict_literals"] = true;
            ρσ_d["overload_getitem"] = true;
            ρσ_d["bound_methods"] = true;
            ρσ_d["hash_literals"] = true;
            return ρσ_d;
        }).call(this);
        NATIVE_CLASSES = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["Image"] = Object.create(null);
            ρσ_d["RegExp"] = Object.create(null);
            ρσ_d["Error"] = Object.create(null);
            ρσ_d["EvalError"] = Object.create(null);
            ρσ_d["InternalError"] = Object.create(null);
            ρσ_d["RangeError"] = Object.create(null);
            ρσ_d["ReferenceError"] = Object.create(null);
            ρσ_d["SyntaxError"] = Object.create(null);
            ρσ_d["TypeError"] = Object.create(null);
            ρσ_d["URIError"] = Object.create(null);
            ρσ_d["Object"] = (function(){
                var ρσ_d = Object.create(null);
                ρσ_d["static"] = ρσ_list_decorate([ "getOwnPropertyNames", "getOwnPropertyDescriptor", "getOwnPropertySymbols", "keys", "create", "defineProperty", "defineProperties", "getPrototypeOf", "setPrototypeOf", "assign" ]);
                return ρσ_d;
            }).call(this);
            ρσ_d["String"] = (function(){
                var ρσ_d = Object.create(null);
                ρσ_d["static"] = ρσ_list_decorate([ "fromCharCode" ]);
                return ρσ_d;
            }).call(this);
            ρσ_d["Array"] = (function(){
                var ρσ_d = Object.create(null);
                ρσ_d["static"] = ρσ_list_decorate([ "isArray", "from", "of" ]);
                return ρσ_d;
            }).call(this);
            ρσ_d["Function"] = Object.create(null);
            ρσ_d["Date"] = (function(){
                var ρσ_d = Object.create(null);
                ρσ_d["static"] = ρσ_list_decorate([ "UTC", "now", "parse" ]);
                return ρσ_d;
            }).call(this);
            ρσ_d["ArrayBuffer"] = Object.create(null);
            ρσ_d["DataView"] = Object.create(null);
            ρσ_d["Float32Array"] = Object.create(null);
            ρσ_d["Float64Array"] = Object.create(null);
            ρσ_d["Int16Array"] = Object.create(null);
            ρσ_d["Int32Array"] = Object.create(null);
            ρσ_d["Int8Array"] = Object.create(null);
            ρσ_d["Uint16Array"] = Object.create(null);
            ρσ_d["Uint32Array"] = Object.create(null);
            ρσ_d["Uint8Array"] = Object.create(null);
            ρσ_d["Uint8ClampedArray"] = Object.create(null);
            ρσ_d["Map"] = Object.create(null);
            ρσ_d["WeakMap"] = Object.create(null);
            ρσ_d["Set"] = Object.create(null);
            ρσ_d["WeakSet"] = Object.create(null);
            ρσ_d["WebSocket"] = Object.create(null);
            ρσ_d["XMLHttpRequest"] = Object.create(null);
            ρσ_d["TextEncoder"] = Object.create(null);
            ρσ_d["TextDecoder"] = Object.create(null);
            ρσ_d["MouseEvent"] = Object.create(null);
            ρσ_d["Event"] = Object.create(null);
            ρσ_d["CustomEvent"] = Object.create(null);
            ρσ_d["Blob"] = Object.create(null);
            return ρσ_d;
        }).call(this);
        ERROR_CLASSES = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["Exception"] = Object.create(null);
            ρσ_d["AttributeError"] = Object.create(null);
            ρσ_d["IndexError"] = Object.create(null);
            ρσ_d["KeyError"] = Object.create(null);
            ρσ_d["ValueError"] = Object.create(null);
            return ρσ_d;
        }).call(this);
        COMMON_STATIC = ρσ_list_decorate([ "call", "apply", "bind", "toString" ]);
        FORBIDDEN_CLASS_VARS = "prototype constructor".split(" ");
        UNARY_PREFIX = make_predicate("typeof void delete ~ - + ! @");
        ASSIGNMENT = make_predicate("= += -= /= //= *= %= >>= <<= >>>= |= ^= &=");
        PRECEDENCE = (function() {
            var ρσ_anonfunc = function (a, ret) {
                var b, j, i;
                for (var ρσ_Index38 = 0; ρσ_Index38 < a.length; ρσ_Index38++) {
                    i = ρσ_Index38;
                    b = a[(typeof i === "number" && i < 0) ? a.length + i : i];
                    for (var ρσ_Index39 = 0; ρσ_Index39 < b.length; ρσ_Index39++) {
                        j = ρσ_Index39;
                        ret[ρσ_bound_index(b[(typeof j === "number" && j < 0) ? b.length + j : j], ret)] = i + 1;
                    }
                }
                return ret;
            };
            Object.defineProperties(ρσ_anonfunc, {
                __argnames__ : {value: ["a", "ret"]}
            });
            return ρσ_anonfunc;
        })()(ρσ_list_decorate([ ρσ_list_decorate([ "||" ]), ρσ_list_decorate([ "&&" ]), ρσ_list_decorate([ "|" ]), ρσ_list_decorate([ "^" ]), ρσ_list_decorate([ "&" ]), ρσ_list_decorate([ "==", "===", "!=", "!==" ]), ρσ_list_decorate([ "<", ">", "<=", ">=", "in", "instanceof" ]), ρσ_list_decorate([ ">>", "<<", ">>>" ]), ρσ_list_decorate([ "+", "-" ]), ρσ_list_decorate([ "*", "/", "//", "%" ]), ρσ_list_decorate([ "**" ]) ]), Object.create(null));
        STATEMENTS_WITH_LABELS = array_to_hash(ρσ_list_decorate([ "for", "do", "while", "switch" ]));
        ATOMIC_START_TOKEN = array_to_hash(ρσ_list_decorate([ "atom", "num", "string", "regexp", "name", "js" ]));
        compile_time_decorators = ρσ_list_decorate([ "staticmethod", "external", "property" ]);
        function has_simple_decorator(decorators, name) {
            var remove, s;
            remove = [];
            for (var i = 0; i < decorators.length; i++) {
                s = decorators[(typeof i === "number" && i < 0) ? decorators.length + i : i];
                if (is_node_type(s, AST_SymbolRef) && !s.parens && s.name === name) {
                    remove.push(i);
                }
            }
            if (remove.length) {
                remove.reverse();
                for (var i = 0; i < remove.length; i++) {
                    decorators.splice(remove[(typeof i === "number" && i < 0) ? remove.length + i : i], 1);
                }
                return true;
            }
            return false;
        };
        Object.defineProperties(has_simple_decorator, {
            __argnames__ : {value: ["decorators", "name"]}
        });

        function has_setter_decorator(decorators, name) {
            var remove, s;
            remove = [];
            for (var i = 0; i < decorators.length; i++) {
                s = decorators[(typeof i === "number" && i < 0) ? decorators.length + i : i];
                if (is_node_type(s, AST_Dot) && is_node_type(s.expression, AST_SymbolRef) && s.expression.name === name && s.property === "setter") {
                    remove.push(i);
                }
            }
            if (remove.length) {
                remove.reverse();
                for (var i = 0; i < remove.length; i++) {
                    decorators.splice(remove[(typeof i === "number" && i < 0) ? remove.length + i : i], 1);
                }
                return true;
            }
            return false;
        };
        Object.defineProperties(has_setter_decorator, {
            __argnames__ : {value: ["decorators", "name"]}
        });

        function create_parser_ctx(S, import_dirs, module_id, baselib_items, imported_module_ids, imported_modules, importing_modules, options) {
            function next() {
                S.prev = S.token;
                if (S.peeked.length) {
                    S.token = S.peeked.shift();
                } else {
                    S.token = S.input();
                }
                return S.token;
            };

            function is_(type, value) {
                return is_token(S.token, type, value);
            };
            Object.defineProperties(is_, {
                __argnames__ : {value: ["type", "value"]}
            });

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
            Object.defineProperties(croak, {
                __argnames__ : {value: ["msg", "line", "col", "pos", "is_eof"]}
            });

            function token_error(token, msg) {
                var is_eof;
                is_eof = token.type === "eof";
                croak(msg, token.line, token.col, undefined, is_eof);
            };
            Object.defineProperties(token_error, {
                __argnames__ : {value: ["token", "msg"]}
            });

            function unexpected(token) {
                if (token === undefined) {
                    token = S.token;
                }
                token_error(token, "Unexpected token: " + token.type + " «" + token.value + "»");
            };
            Object.defineProperties(unexpected, {
                __argnames__ : {value: ["token"]}
            });

            function expect_token(type, val) {
                if (is_(type, val)) {
                    return next();
                }
                token_error(S.token, "Unexpected token " + S.token.type + " «" + S.token.value + "»" + ", expected " + type + " «" + val + "»");
            };
            Object.defineProperties(expect_token, {
                __argnames__ : {value: ["type", "val"]}
            });

            function expect(punc) {
                return expect_token("punc", punc);
            };
            Object.defineProperties(expect, {
                __argnames__ : {value: ["punc"]}
            });

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
            Object.defineProperties(embed_tokens, {
                __argnames__ : {value: ["parser"]}
            });

            function scan_for_top_level_callables(body) {
                var ans, opt, x, obj;
                ans = [];
                if (Array.isArray(body)) {
                    var ρσ_Iter40 = ρσ_Iterable(body);
                    for (var ρσ_Index40 = 0; ρσ_Index40 < ρσ_Iter40.length; ρσ_Index40++) {
                        obj = ρσ_Iter40[ρσ_Index40];
                        if (is_node_type(obj, AST_Function) || is_node_type(obj, AST_Class)) {
                            if (obj.name) {
                                ans.push(obj.name.name);
                            } else {
                                token_error(obj.start, "Top-level functions must have names");
                            }
                        } else {
                            if (is_node_type(obj, AST_Scope)) {
                                continue;
                            }
                            var ρσ_Iter41 = ρσ_Iterable(ρσ_list_decorate([ "body", "alternative" ]));
                            for (var ρσ_Index41 = 0; ρσ_Index41 < ρσ_Iter41.length; ρσ_Index41++) {
                                x = ρσ_Iter41[ρσ_Index41];
                                opt = obj[(typeof x === "number" && x < 0) ? obj.length + x : x];
                                if (opt) {
                                    ans = ans.concat(scan_for_top_level_callables(opt));
                                }
                                if (is_node_type(opt, AST_Assign) && !is_node_type(opt.right, AST_Scope)) {
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
            Object.defineProperties(scan_for_top_level_callables, {
                __argnames__ : {value: ["body"]}
            });

            function scan_for_classes(body) {
                var ans, obj;
                ans = Object.create(null);
                var ρσ_Iter42 = ρσ_Iterable(body);
                for (var ρσ_Index42 = 0; ρσ_Index42 < ρσ_Iter42.length; ρσ_Index42++) {
                    obj = ρσ_Iter42[ρσ_Index42];
                    if (is_node_type(obj, AST_Class)) {
                        ans[ρσ_bound_index(obj.name.name, ans)] = obj;
                    }
                }
                return ans;
            };
            Object.defineProperties(scan_for_classes, {
                __argnames__ : {value: ["body"]}
            });

            function scan_for_local_vars(body) {
                var localvars, seen, opt, option, clause, stmt, is_compound_assign, lhs;
                localvars = [];
                seen = Object.create(null);
                function push(x) {
                    if (has_prop(seen, x)) {
                        return;
                    }
                    seen[(typeof x === "number" && x < 0) ? seen.length + x : x] = true;
                    localvars.push(x);
                };
                Object.defineProperties(push, {
                    __argnames__ : {value: ["x"]}
                });

                function extend(arr) {
                    var x;
                    var ρσ_Iter43 = ρσ_Iterable(arr);
                    for (var ρσ_Index43 = 0; ρσ_Index43 < ρσ_Iter43.length; ρσ_Index43++) {
                        x = ρσ_Iter43[ρσ_Index43];
                        push(x);
                    }
                };
                Object.defineProperties(extend, {
                    __argnames__ : {value: ["arr"]}
                });

                function scan_in_array(arr) {
                    var x;
                    var ρσ_Iter44 = ρσ_Iterable(arr);
                    for (var ρσ_Index44 = 0; ρσ_Index44 < ρσ_Iter44.length; ρσ_Index44++) {
                        x = ρσ_Iter44[ρσ_Index44];
                        if (is_node_type(x, AST_Seq)) {
                            x = x.to_array();
                        } else if (is_node_type(x, AST_Array)) {
                            x = x.elements;
                        }
                        if (Array.isArray(x)) {
                            scan_in_array(x);
                        } else {
                            if (!is_node_type(x, AST_PropAccess)) {
                                push(x.name);
                            }
                        }
                    }
                };
                Object.defineProperties(scan_in_array, {
                    __argnames__ : {value: ["arr"]}
                });

                function add_assign_lhs(lhs) {
                    if (is_node_type(lhs, AST_Seq)) {
                        lhs = new AST_Array((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["elements"] = lhs.to_array();
                            return ρσ_d;
                        }).call(this));
                    }
                    if (is_node_type(lhs, AST_Array)) {
                        push("ρσ_unpack");
                        scan_in_array(lhs.elements);
                    } else if (lhs.name) {
                        push(lhs.name);
                    }
                };
                Object.defineProperties(add_assign_lhs, {
                    __argnames__ : {value: ["lhs"]}
                });

                function add_for_in(stmt) {
                    if (is_node_type(stmt.init, AST_Array)) {
                        push("ρσ_unpack");
                        scan_in_array(stmt.init.elements);
                    } else {
                        push(stmt.init.name);
                    }
                };
                Object.defineProperties(add_for_in, {
                    __argnames__ : {value: ["stmt"]}
                });

                if (Array.isArray(body)) {
                    var ρσ_Iter45 = ρσ_Iterable(body);
                    for (var ρσ_Index45 = 0; ρσ_Index45 < ρσ_Iter45.length; ρσ_Index45++) {
                        stmt = ρσ_Iter45[ρσ_Index45];
                        if (is_node_type(stmt, AST_Scope)) {
                            continue;
                        }
                        var ρσ_Iter46 = ρσ_Iterable(ρσ_list_decorate([ "body", "alternative", "bcatch" ]));
                        for (var ρσ_Index46 = 0; ρσ_Index46 < ρσ_Iter46.length; ρσ_Index46++) {
                            option = ρσ_Iter46[ρσ_Index46];
                            opt = stmt[(typeof option === "number" && option < 0) ? stmt.length + option : option];
                            if (opt) {
                                extend(scan_for_local_vars(opt));
                            }
                            if (is_node_type(opt, AST_Assign) && !is_node_type(opt.right, AST_Scope)) {
                                extend(scan_for_local_vars(opt.right));
                            }
                        }
                        if (is_node_type(stmt, AST_ForIn)) {
                            add_for_in(stmt);
                        } else if (is_node_type(stmt, AST_DWLoop)) {
                            extend(scan_for_local_vars(stmt));
                        } else if (is_node_type(stmt, AST_With)) {
                            [push("ρσ_with_exception"), push("ρσ_with_suppress")];
                            var ρσ_Iter47 = ρσ_Iterable(stmt.clauses);
                            for (var ρσ_Index47 = 0; ρσ_Index47 < ρσ_Iter47.length; ρσ_Index47++) {
                                clause = ρσ_Iter47[ρσ_Index47];
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
                } else if (is_node_type(body, AST_Assign)) {
                    if (body.is_chained()) {
                        is_compound_assign = false;
                        var ρσ_Iter48 = ρσ_Iterable(body.traverse_chain()[0]);
                        for (var ρσ_Index48 = 0; ρσ_Index48 < ρσ_Iter48.length; ρσ_Index48++) {
                            lhs = ρσ_Iter48[ρσ_Index48];
                            add_assign_lhs(lhs);
                            if (is_node_type(lhs, AST_Seq) || is_node_type(lhs, AST_Array)) {
                                is_compound_assign = true;
                                break;
                            }
                        }
                        if (is_compound_assign) {
                            push("ρσ_chain_assign_temp");
                        }
                    } else {
                        add_assign_lhs(body.left);
                    }
                    if (!is_node_type(body.right, AST_Scope)) {
                        extend(scan_for_local_vars(body.right));
                    }
                } else if (is_node_type(body, AST_ForIn)) {
                    add_for_in(body);
                }
                return localvars;
            };
            Object.defineProperties(scan_for_local_vars, {
                __argnames__ : {value: ["body"]}
            });

            function scan_for_nonlocal_defs(body) {
                var vardef, opt, option, stmt;
                vars = [];
                if (Array.isArray(body)) {
                    var ρσ_Iter49 = ρσ_Iterable(body);
                    for (var ρσ_Index49 = 0; ρσ_Index49 < ρσ_Iter49.length; ρσ_Index49++) {
                        stmt = ρσ_Iter49[ρσ_Index49];
                        if (is_node_type(stmt, AST_Scope)) {
                            continue;
                        }
                        if (is_node_type(stmt, AST_Definitions)) {
                            var ρσ_Iter50 = ρσ_Iterable(stmt.definitions);
                            for (var ρσ_Index50 = 0; ρσ_Index50 < ρσ_Iter50.length; ρσ_Index50++) {
                                vardef = ρσ_Iter50[ρσ_Index50];
                                vars.push(vardef.name.name);
                            }
                        }
                        var ρσ_Iter51 = ρσ_Iterable(ρσ_list_decorate([ "body", "alternative" ]));
                        for (var ρσ_Index51 = 0; ρσ_Index51 < ρσ_Iter51.length; ρσ_Index51++) {
                            option = ρσ_Iter51[ρσ_Index51];
                            var vars;
                            opt = stmt[(typeof option === "number" && option < 0) ? stmt.length + option : option];
                            if (opt) {
                                vars = vars.concat(scan_for_nonlocal_defs(opt));
                            }
                        }
                    }
                } else if (body.body) {
                    vars = vars.concat(scan_for_nonlocal_defs(body.body));
                    if (body.alternative) {
                        vars = vars.concat(scan_for_nonlocal_defs(body.alternative));
                    }
                }
                return vars;
            };
            Object.defineProperties(scan_for_nonlocal_defs, {
                __argnames__ : {value: ["body"]}
            });

            function return_() {
                var value, is_end_of_statement;
                if (is_("punc", ";")) {
                    semicolon();
                    value = null;
                } else {
                    is_end_of_statement = S.token.nlb || is_("eof") || is_("punc", "}");
                    if (is_end_of_statement) {
                        value = null;
                    } else {
                        value = expression(true);
                        semicolon();
                    }
                }
                return value;
            };

            
            var statement = embed_tokens(function statement() {
                var tmp_, start, func, chain, cond, msg, tmp;
                if (S.token.type === "operator" && S.token.value.substr(0, 1) === "/") {
                    token_error(S.token, "RapydScript does not support statements starting with regexp literals");
                }
                S.statement_starting_token = S.token;
                tmp_ = S.token.type;
                if (tmp_ === "string") {
                    return simple_statement();
                } else if (tmp_ === "shebang") {
                    tmp_ = S.token.value;
                    next();
                    return new AST_Directive((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["value"] = tmp_;
                        return ρσ_d;
                    }).call(this));
                } else if (tmp_ === "num" || tmp_ === "regexp" || tmp_ === "operator" || tmp_ === "atom" || tmp_ === "js") {
                    return simple_statement();
                } else if (tmp_ === "punc") {
                    tmp_ = S.token.value;
                    if (tmp_ === ":") {
                        return new AST_BlockStatement((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = S.token;
                            ρσ_d["body"] = block_();
                            ρσ_d["end"] = prev();
                            return ρσ_d;
                        }).call(this));
                    } else if (tmp_ === "{" || tmp_ === "[" || tmp_ === "(") {
                        return simple_statement();
                    } else if (tmp_ === ";") {
                        next();
                        return new AST_EmptyStatement((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["stype"] = ";";
                            ρσ_d["start"] = prev();
                            ρσ_d["end"] = prev();
                            return ρσ_d;
                        }).call(this));
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
                        return new AST_Do((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["body"] = in_loop(statement);
                            ρσ_d["condition"] = function () {
                                var tmp;
                                expect(".");
                                expect_token("keyword", "while");
                                tmp = expression(true);
                                semicolon();
                                return tmp;
                            }();
                            return ρσ_d;
                        }).call(this));
                    } else if (tmp_ === "while") {
                        return new AST_While((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["condition"] = expression(true);
                            ρσ_d["body"] = in_loop(statement);
                            return ρσ_d;
                        }).call(this));
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
                        return class_();
                    } else if (tmp_ === "def") {
                        start = prev();
                        func = function_((ρσ_expr_temp = S.in_class)[ρσ_expr_temp.length-1], false);
                        func.start = start;
                        func.end = prev();
                        chain = subscripts(func, true);
                        if (chain === func) {
                            return func;
                        } else {
                            return new AST_SimpleStatement((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["start"] = start;
                                ρσ_d["body"] = chain;
                                ρσ_d["end"] = prev();
                                return ρσ_d;
                            }).call(this));
                        }
                    } else if (tmp_ === "assert") {
                        start = prev();
                        cond = expression(false);
                        msg = null;
                        if (is_("punc", ",")) {
                            next();
                            msg = expression(false);
                        }
                        return new AST_Assert((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = start;
                            ρσ_d["condition"] = cond;
                            ρσ_d["message"] = msg;
                            ρσ_d["end"] = prev();
                            return ρσ_d;
                        }).call(this));
                    } else if (tmp_ === "if") {
                        return if_();
                    } else if (tmp_ === "pass") {
                        semicolon();
                        return new AST_EmptyStatement((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["stype"] = "pass";
                            ρσ_d["start"] = prev();
                            ρσ_d["end"] = prev();
                            return ρσ_d;
                        }).call(this));
                    } else if (tmp_ === "return") {
                        if (S.in_function === 0) {
                            croak("'return' outside of function");
                        }
                        if ((ρσ_expr_temp = S.functions)[ρσ_expr_temp.length-1].is_generator) {
                            croak("'return' not allowed in a function with yield");
                        }
                        (ρσ_expr_temp = S.functions)[ρσ_expr_temp.length-1].is_generator = false;
                        return new AST_Return((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["value"] = return_();
                            return ρσ_d;
                        }).call(this));
                    } else if (tmp_ === "yield") {
                        return yield_();
                    } else if (tmp_ === "raise") {
                        if (S.token.nlb) {
                            return new AST_Throw((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["value"] = new AST_SymbolCatch((function(){
                                    var ρσ_d = Object.create(null);
                                    ρσ_d["name"] = "ρσ_Exception";
                                    return ρσ_d;
                                }).call(this));
                                return ρσ_d;
                            }).call(this));
                        }
                        tmp = expression(true);
                        semicolon();
                        return new AST_Throw((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["value"] = tmp;
                            return ρσ_d;
                        }).call(this));
                    } else if (tmp_ === "try") {
                        return try_();
                    } else if (tmp_ === "nonlocal") {
                        tmp = nonlocal_();
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
                    clauses.push(new AST_WithClause((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["expression"] = expr;
                        ρσ_d["alias"] = alias;
                        return ρσ_d;
                    }).call(this)));
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
                return new AST_With((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["clauses"] = clauses;
                    ρσ_d["body"] = body;
                    return ρσ_d;
                }).call(this));
            };

            function simple_statement(tmp) {
                tmp = expression(true);
                semicolon();
                return new AST_SimpleStatement((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["body"] = tmp;
                    return ρσ_d;
                }).call(this));
            };
            Object.defineProperties(simple_statement, {
                __argnames__ : {value: ["tmp"]}
            });

            function break_cont(t) {
                if (S.in_loop === 0) {
                    croak(t.name.slice(4) + " not inside a loop or switch");
                }
                semicolon();
                return new t;
            };
            Object.defineProperties(break_cont, {
                __argnames__ : {value: ["t"]}
            });

            function yield_() {
                var is_yield_from;
                if (S.in_function === 0) {
                    croak("'yield' outside of function");
                }
                if ((ρσ_expr_temp = S.functions)[ρσ_expr_temp.length-1].is_generator === false) {
                    croak("'yield' not allowed in a function with return");
                }
                (ρσ_expr_temp = S.functions)[ρσ_expr_temp.length-1].is_generator = true;
                is_yield_from = is_("keyword", "from");
                if (is_yield_from) {
                    next();
                }
                return new AST_Yield((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["is_yield_from"] = is_yield_from;
                    ρσ_d["value"] = return_();
                    return ρσ_d;
                }).call(this));
            };

            function for_(list_comp) {
                var init, tmp;
                init = null;
                if (!is_("punc", ";")) {
                    init = expression(true, true);
                    if (is_node_type(init, AST_Seq)) {
                        if (is_node_type(init.car, AST_SymbolRef) && is_node_type(init.cdr, AST_SymbolRef)) {
                            tmp = init.to_array();
                        } else {
                            tmp = ρσ_list_decorate([ init ]);
                        }
                        init = new AST_Array((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = init.start;
                            ρσ_d["elements"] = tmp;
                            ρσ_d["end"] = init.end;
                            return ρσ_d;
                        }).call(this));
                    }
                    if (is_("operator", "in")) {
                        if (is_node_type(init, AST_Var) && init.definitions.length > 1) {
                            croak("Only one variable declaration allowed in for..in loop");
                        }
                        next();
                        return for_in(init, list_comp);
                    }
                }
                unexpected();
            };
            Object.defineProperties(for_, {
                __argnames__ : {value: ["list_comp"]}
            });

            function for_in(init, list_comp) {
                var lhs, obj;
                lhs = (is_node_type(init, AST_Var)) ? init.definitions[0].name : null;
                obj = expression(true);
                if (list_comp) {
                    return (function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["init"] = init;
                        ρσ_d["name"] = lhs;
                        ρσ_d["object"] = obj;
                        return ρσ_d;
                    }).call(this);
                }
                return new AST_ForIn((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["init"] = init;
                    ρσ_d["name"] = lhs;
                    ρσ_d["object"] = obj;
                    ρσ_d["body"] = in_loop(statement);
                    return ρσ_d;
                }).call(this));
            };
            Object.defineProperties(for_in, {
                __argnames__ : {value: ["init", "list_comp"]}
            });

            function for_js() {
                var condition;
                condition = as_atom_node();
                return new AST_ForJS((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["condition"] = condition;
                    ρσ_d["body"] = in_loop(statement);
                    return ρσ_d;
                }).call(this));
            };

            function get_class_in_scope(expr) {
                var s, referenced_path, class_name;
                if (is_node_type(expr, AST_SymbolRef)) {
                    if (has_prop(NATIVE_CLASSES, expr.name)) {
                        return NATIVE_CLASSES[ρσ_bound_index(expr.name, NATIVE_CLASSES)];
                    }
                    if (has_prop(ERROR_CLASSES, expr.name)) {
                        return ERROR_CLASSES[ρσ_bound_index(expr.name, ERROR_CLASSES)];
                    }
                    for (var ρσ_Index52 = S.classes.length - 1; ρσ_Index52 > -1; ρσ_Index52-=1) {
                        s = ρσ_Index52;
                        if (has_prop((ρσ_expr_temp = S.classes)[(typeof s === "number" && s < 0) ? ρσ_expr_temp.length + s : s], expr.name)) {
                            return (ρσ_expr_temp = (ρσ_expr_temp = S.classes)[(typeof s === "number" && s < 0) ? ρσ_expr_temp.length + s : s])[ρσ_bound_index(expr.name, ρσ_expr_temp)];
                        }
                    }
                } else if (is_node_type(expr, AST_Dot)) {
                    referenced_path = ρσ_list_decorate([]);
                    while (is_node_type(expr, AST_Dot)) {
                        referenced_path.unshift(expr.property);
                        expr = expr.expression;
                    }
                    if (is_node_type(expr, AST_SymbolRef)) {
                        referenced_path.unshift(expr.name);
                        if (len(referenced_path) > 1) {
                            class_name = referenced_path.join(".");
                            for (var ρσ_Index53 = S.classes.length - 1; ρσ_Index53 > -1; ρσ_Index53-=1) {
                                s = ρσ_Index53;
                                if (has_prop((ρσ_expr_temp = S.classes)[(typeof s === "number" && s < 0) ? ρσ_expr_temp.length + s : s], class_name)) {
                                    return (ρσ_expr_temp = (ρσ_expr_temp = S.classes)[(typeof s === "number" && s < 0) ? ρσ_expr_temp.length + s : s])[(typeof class_name === "number" && class_name < 0) ? ρσ_expr_temp.length + class_name : class_name];
                                }
                            }
                        }
                    }
                }
                return false;
            };
            Object.defineProperties(get_class_in_scope, {
                __argnames__ : {value: ["expr"]}
            });

            function import_error(message) {
                var ctx;
                ctx = S.input.context();
                throw new ImportError(message, ctx.filename, ctx.tokline, ctx.tokcol, ctx.tokpos);
            };
            Object.defineProperties(import_error, {
                __argnames__ : {value: ["message"]}
            });

            function do_import(key) {
                var package_module_id, src_code, filename, modpath, ρσ_unpack, data, location, cached, srchash, ikey, bitem;
                if (has_prop(imported_modules, key)) {
                    return;
                }
                if (has_prop(importing_modules, key) && importing_modules[(typeof key === "number" && key < 0) ? importing_modules.length + key : key]) {
                    import_error("Detected a recursive import of: " + key + " while importing: " + module_id);
                }
                package_module_id = key.split(".").slice(0, -1).join(".");
                if (len(package_module_id) > 0) {
                    do_import(package_module_id);
                }
                if (options.for_linting) {
                    imported_modules[(typeof key === "number" && key < 0) ? imported_modules.length + key : key] = (function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["is_cached"] = true;
                        ρσ_d["classes"] = Object.create(null);
                        ρσ_d["module_id"] = key;
                        ρσ_d["exports"] = ρσ_list_decorate([]);
                        ρσ_d["nonlocalvars"] = ρσ_list_decorate([]);
                        ρσ_d["baselib"] = Object.create(null);
                        ρσ_d["outputs"] = Object.create(null);
                        ρσ_d["discard_asserts"] = options.discard_asserts;
                        return ρσ_d;
                    }).call(this);
                    return;
                }
                function safe_read(base_path) {
                    var ρσ_unpack, i, path;
                    var ρσ_Iter54 = ρσ_Iterable(enumerate(ρσ_list_decorate([ base_path + ".pyj", base_path + "/__init__.pyj" ])));
                    for (var ρσ_Index54 = 0; ρσ_Index54 < ρσ_Iter54.length; ρσ_Index54++) {
                        ρσ_unpack = ρσ_Iter54[ρσ_Index54];
                        i = ρσ_unpack[0];
                        path = ρσ_unpack[1];
                        try {
                            return ρσ_list_decorate([ readfile(path, "utf-8"), path ]);
                        } catch (ρσ_Exception) {
                            ρσ_last_exception = ρσ_Exception;
                            {
                                var e = ρσ_Exception;
                                if (e.code === "ENOENT" || e.code === "EPERM" || e.code === "EACCESS") {
                                    if (i === 1) {
                                        return [null, null];
                                    }
                                }
                                if (i === 1) {
                                    throw ρσ_Exception;
                                }
                            } 
                        }
                    }
                };
                Object.defineProperties(safe_read, {
                    __argnames__ : {value: ["base_path"]}
                });

                src_code = filename = null;
                modpath = key.replace(/\./g, "/");
                var ρσ_Iter55 = ρσ_Iterable(import_dirs);
                for (var ρσ_Index55 = 0; ρσ_Index55 < ρσ_Iter55.length; ρσ_Index55++) {
                    location = ρσ_Iter55[ρσ_Index55];
                    if (location) {
                        ρσ_unpack = safe_read(location + "/" + modpath);
                        data = ρσ_unpack[0];
                        filename = ρσ_unpack[1];
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
                    cached = JSON.parse(readfile(cache_file_name(filename, options.module_cache_dir), "utf-8"));
                } catch (ρσ_Exception) {
                    ρσ_last_exception = ρσ_Exception;
                    {
                        cached = null;
                    } 
                }
                srchash = sha1sum(src_code);
                if (cached && cached.version === COMPILER_VERSION && cached.signature === srchash && cached.discard_asserts === options.discard_asserts) {
                    var ρσ_Iter56 = ρσ_Iterable(cached.imported_module_ids);
                    for (var ρσ_Index56 = 0; ρσ_Index56 < ρσ_Iter56.length; ρσ_Index56++) {
                        ikey = ρσ_Iter56[ρσ_Index56];
                        do_import(ikey);
                    }
                    imported_modules[(typeof key === "number" && key < 0) ? imported_modules.length + key : key] = (function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["is_cached"] = true;
                        ρσ_d["classes"] = cached.classes;
                        ρσ_d["outputs"] = cached.outputs;
                        ρσ_d["module_id"] = key;
                        ρσ_d["import_order"] = Object.keys(imported_modules).length;
                        ρσ_d["nonlocalvars"] = cached.nonlocalvars;
                        ρσ_d["baselib"] = cached.baselib;
                        ρσ_d["exports"] = cached.exports;
                        ρσ_d["discard_asserts"] = options.discard_asserts;
                        ρσ_d["imported_module_ids"] = cached.imported_module_ids;
                        return ρσ_d;
                    }).call(this);
                } else {
                    parse(src_code, (function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["filename"] = filename;
                        ρσ_d["toplevel"] = null;
                        ρσ_d["basedir"] = options.basedir;
                        ρσ_d["libdir"] = options.libdir;
                        ρσ_d["import_dirs"] = options.import_dirs;
                        ρσ_d["module_id"] = key;
                        ρσ_d["imported_modules"] = imported_modules;
                        ρσ_d["importing_modules"] = importing_modules;
                        ρσ_d["discard_asserts"] = options.discard_asserts;
                        ρσ_d["module_cache_dir"] = options.module_cache_dir;
                        return ρσ_d;
                    }).call(this));
                }
                imported_modules[(typeof key === "number" && key < 0) ? imported_modules.length + key : key].srchash = srchash;
                var ρσ_Iter57 = ρσ_Iterable(Object.keys(imported_modules[(typeof key === "number" && key < 0) ? imported_modules.length + key : key].baselib));
                for (var ρσ_Index57 = 0; ρσ_Index57 < ρσ_Iter57.length; ρσ_Index57++) {
                    bitem = ρσ_Iter57[ρσ_Index57];
                    baselib_items[(typeof bitem === "number" && bitem < 0) ? baselib_items.length + bitem : bitem] = true;
                }
            };
            Object.defineProperties(do_import, {
                __argnames__ : {value: ["key"]}
            });

            function read_python_flags() {
                var bracketed, name, val;
                expect_token("keyword", "import");
                bracketed = is_("punc", "(");
                if (bracketed) {
                    next();
                }
                while (true) {
                    if (!is_("name")) {
                        croak("Name expected");
                    }
                    name = S.token.value;
                    val = (name.startsWith("no_")) ? false : true;
                    if (!val) {
                        name = name.slice(3);
                    }
                    if (!PYTHON_FLAGS) {
                        croak("Unknown __python__ flag: " + name);
                    }
                    S.scoped_flags.set(name, val);
                    next();
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
                return new AST_EmptyStatement((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["stype"] = "scoped_flags";
                    ρσ_d["start"] = prev();
                    ρσ_d["end"] = prev();
                    return ρσ_d;
                }).call(this));
            };

            function import_(from_import) {
                var ans, tok, tmp, name, last_tok, key, alias, aimp, ρσ_unpack, classes, argnames, bracketed, exports, symdef, aname, obj, argvar, cname, imp;
                ans = new AST_Imports((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["imports"] = ρσ_list_decorate([]);
                    return ρσ_d;
                }).call(this));
                while (true) {
                    tok = tmp = name = last_tok = expression(false);
                    key = "";
                    while (is_node_type(tmp, AST_Dot)) {
                        key = "." + tmp.property + key;
                        tmp = last_tok = tmp.expression;
                    }
                    key = tmp.name + key;
                    if (from_import && key === "__python__") {
                        return read_python_flags();
                    }
                    alias = null;
                    if (!from_import && is_("keyword", "as")) {
                        next();
                        alias = as_symbol(AST_SymbolAlias);
                    }
                    aimp = new AST_Import((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["module"] = name;
                        ρσ_d["key"] = key;
                        ρσ_d["alias"] = alias;
                        ρσ_d["argnames"] = null;
                        ρσ_d["body"] = function () {
                            return imported_modules[(typeof key === "number" && key < 0) ? imported_modules.length + key : key];
                        };
                        return ρσ_d;
                    }).call(this));
                    ρσ_unpack = [tok.start, last_tok.end];
                    aimp.start = ρσ_unpack[0];
                    aimp.end = ρσ_unpack[1];
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
                var ρσ_Iter58 = ρσ_Iterable(ans["imports"]);
                for (var ρσ_Index58 = 0; ρσ_Index58 < ρσ_Iter58.length; ρσ_Index58++) {
                    imp = ρσ_Iter58[ρσ_Index58];
                    do_import(imp.key);
                    if (imported_module_ids.indexOf(imp.key) === -1) {
                        imported_module_ids.push(imp.key);
                    }
                    classes = imported_modules[(typeof key === "number" && key < 0) ? imported_modules.length + key : key].classes;
                    if (from_import) {
                        expect_token("keyword", "import");
                        imp.argnames = argnames = ρσ_list_decorate([]);
                        bracketed = is_("punc", "(");
                        if (bracketed) {
                            next();
                        }
                        exports = Object.create(null);
                        var ρσ_Iter59 = ρσ_Iterable(imported_modules[(typeof key === "number" && key < 0) ? imported_modules.length + key : key].exports);
                        for (var ρσ_Index59 = 0; ρσ_Index59 < ρσ_Iter59.length; ρσ_Index59++) {
                            symdef = ρσ_Iter59[ρσ_Index59];
                            exports[ρσ_bound_index(symdef.name, exports)] = true;
                        }
                        while (true) {
                            aname = as_symbol(AST_ImportedVar);
                            if (!options.for_linting && !has_prop(exports, aname.name)) {
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
                        var ρσ_Iter60 = ρσ_Iterable(argnames);
                        for (var ρσ_Index60 = 0; ρσ_Index60 < ρσ_Iter60.length; ρσ_Index60++) {
                            argvar = ρσ_Iter60[ρσ_Index60];
                            obj = classes[ρσ_bound_index(argvar.name, classes)];
                            if (obj) {
                                key = (argvar.alias) ? argvar.alias.name : argvar.name;
                                (ρσ_expr_temp = (ρσ_expr_temp = S.classes)[ρσ_expr_temp.length-1])[(typeof key === "number" && key < 0) ? ρσ_expr_temp.length + key : key] = (function(){
                                    var ρσ_d = Object.create(null);
                                    ρσ_d["static"] = obj.static;
                                    ρσ_d["bound"] = obj.bound;
                                    ρσ_d["classvars"] = obj.classvars;
                                    return ρσ_d;
                                }).call(this);
                            }
                        }
                    } else {
                        var ρσ_Iter61 = ρσ_Iterable(Object.keys(classes));
                        for (var ρσ_Index61 = 0; ρσ_Index61 < ρσ_Iter61.length; ρσ_Index61++) {
                            cname = ρσ_Iter61[ρσ_Index61];
                            obj = classes[(typeof cname === "number" && cname < 0) ? classes.length + cname : cname];
                            key = (imp.alias) ? imp.alias.name : imp.key;
                            (ρσ_expr_temp = (ρσ_expr_temp = S.classes)[ρσ_expr_temp.length-1])[ρσ_bound_index(key + "." + obj.name.name, ρσ_expr_temp)] = (function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["static"] = obj.static;
                                ρσ_d["bound"] = obj.bound;
                                ρσ_d["classvars"] = obj.classvars;
                                return ρσ_d;
                            }).call(this);
                        }
                    }
                }
                return ans;
            };
            Object.defineProperties(import_, {
                __argnames__ : {value: ["from_import"]}
            });

            function class_() {
                var name, externaldecorator, class_details, bases, class_parent, a, docstrings, definition, descriptor, stmt, class_var_names, visitor;
                name = as_symbol(AST_SymbolDefun);
                if (!name) {
                    unexpected();
                }
                externaldecorator = has_simple_decorator(S.decorators, "external");
                class_details = (function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["static"] = ρσ_list_decorate([]);
                    ρσ_d["bound"] = [];
                    ρσ_d["classvars"] = Object.create(null);
                    return ρσ_d;
                }).call(this);
                bases = [];
                class_parent = null;
                if (is_("punc", "(")) {
                    S.in_parenthesized_expr = true;
                    next();
                    while (true) {
                        if (is_("punc", ")")) {
                            S.in_parenthesized_expr = false;
                            next();
                            break;
                        }
                        a = expr_atom(false);
                        if (class_parent === null) {
                            class_parent = a;
                        }
                        bases.push(a);
                        if (is_("punc", ",")) {
                            next();
                            continue;
                        }
                    }
                }
                docstrings = [];
                definition = new AST_Class((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["name"] = name;
                    ρσ_d["docstrings"] = docstrings;
                    ρσ_d["module_id"] = module_id;
                    ρσ_d["dynamic_properties"] = Object.create(null);
                    ρσ_d["parent"] = class_parent;
                    ρσ_d["bases"] = bases;
                    ρσ_d["localvars"] = ρσ_list_decorate([]);
                    ρσ_d["classvars"] = class_details.classvars;
                    ρσ_d["static"] = class_details.static;
                    ρσ_d["external"] = externaldecorator;
                    ρσ_d["bound"] = class_details.bound;
                    ρσ_d["statements"] = ρσ_list_decorate([]);
                    ρσ_d["decorators"] = function () {
                        var d, decorator;
                        d = ρσ_list_decorate([]);
                        var ρσ_Iter62 = ρσ_Iterable(S.decorators);
                        for (var ρσ_Index62 = 0; ρσ_Index62 < ρσ_Iter62.length; ρσ_Index62++) {
                            decorator = ρσ_Iter62[ρσ_Index62];
                            d.push(new AST_Decorator((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["expression"] = decorator;
                                return ρσ_d;
                            }).call(this)));
                        }
                        S.decorators = [];
                        return d;
                    }();
                    ρσ_d["body"] = (function() {
                        var ρσ_anonfunc = function (loop, labels) {
                            var a;
                            S.in_class.push(name.name);
                            (ρσ_expr_temp = (ρσ_expr_temp = S.classes)[ρσ_bound_index(S.classes.length - 1, ρσ_expr_temp)])[ρσ_bound_index(name.name, ρσ_expr_temp)] = class_details;
                            S.classes.push(Object.create(null));
                            S.scoped_flags.push();
                            S.in_function += 1;
                            S.in_loop = 0;
                            S.labels = ρσ_list_decorate([]);
                            a = block_(docstrings);
                            S.in_function -= 1;
                            S.scoped_flags.pop();
                            S.classes.pop();
                            S.in_class.pop();
                            S.in_loop = loop;
                            S.labels = labels;
                            return a;
                        };
                        Object.defineProperties(ρσ_anonfunc, {
                            __argnames__ : {value: ["loop", "labels"]}
                        });
                        return ρσ_anonfunc;
                    })()(S.in_loop, S.labels);
                    return ρσ_d;
                }).call(this));
                var ρσ_Iter63 = ρσ_Iterable(definition.body);
                for (var ρσ_Index63 = 0; ρσ_Index63 < ρσ_Iter63.length; ρσ_Index63++) {
                    stmt = ρσ_Iter63[ρσ_Index63];
                    if (is_node_type(stmt, AST_Method)) {
                        if (stmt.is_getter || stmt.is_setter) {
                            descriptor = (ρσ_expr_temp = definition.dynamic_properties)[ρσ_bound_index(stmt.name.name, ρσ_expr_temp)];
                            if (!descriptor) {
                                descriptor = (ρσ_expr_temp = definition.dynamic_properties)[ρσ_bound_index(stmt.name.name, ρσ_expr_temp)] = Object.create(null);
                            }
                            descriptor[ρσ_bound_index((stmt.is_getter) ? "getter" : "setter", descriptor)] = stmt;
                        } else if (stmt.name.name === "__init__") {
                            definition.init = stmt;
                        }
                    }
                }
                class_var_names = Object.create(null);
                function walker() {
                    function visit_node(node, descend) {
                        var varname;
                        if (is_node_type(node, AST_Method)) {
                            class_var_names[ρσ_bound_index(node.name.name, class_var_names)] = true;
                            return;
                        } else if (is_node_type(node, AST_Assign) && is_node_type(node.left, AST_SymbolRef)) {
                            varname = node.left.name;
                            if (FORBIDDEN_CLASS_VARS.indexOf(varname) !== -1) {
                                token_error(node.left.start, varname + " is not allowed as a class variable name");
                            }
                            class_var_names[(typeof varname === "number" && varname < 0) ? class_var_names.length + varname : varname] = true;
                            (ρσ_expr_temp = definition.classvars)[(typeof varname === "number" && varname < 0) ? ρσ_expr_temp.length + varname : varname] = true;
                        } else if (is_node_type(node, AST_SymbolRef) && has_prop(class_var_names, node.name)) {
                            node.thedef = new AST_SymbolDefun((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["name"] = name.name + ".prototype." + node.name;
                                return ρσ_d;
                            }).call(this));
                        }
                        if (descend) {
                            descend.call(node);
                        }
                    };
                    Object.defineProperties(visit_node, {
                        __argnames__ : {value: ["node", "descend"]}
                    });

                    this._visit = visit_node;
                };

                visitor = new walker;
                var ρσ_Iter64 = ρσ_Iterable(definition.body);
                for (var ρσ_Index64 = 0; ρσ_Index64 < ρσ_Iter64.length; ρσ_Index64++) {
                    stmt = ρσ_Iter64[ρσ_Index64];
                    if (!is_node_type(stmt, AST_Class)) {
                        stmt.walk(visitor);
                        definition.statements.push(stmt);
                    }
                }
                return definition;
            };

            function function_(in_class, is_expression) {
                var name, is_anonymous, staticmethod, property_getter, property_setter, staticloc, ctor, return_annotation, is_generator, docstrings, definition, assignments, j, i, nonlocals;
                name = (is_("name")) ? as_symbol((in_class) ? AST_SymbolDefun : AST_SymbolLambda) : null;
                if (in_class && !name) {
                    croak("Cannot use anonymous function as class methods");
                }
                is_anonymous = !name;
                staticmethod = property_getter = property_setter = false;
                if (in_class) {
                    staticloc = has_simple_decorator(S.decorators, "staticmethod");
                    property_getter = has_simple_decorator(S.decorators, "property");
                    property_setter = has_setter_decorator(S.decorators, name.name);
                    if (staticloc) {
                        if (property_getter || property_setter) {
                            croak("A method cannot be both static and a property getter/setter");
                        }
                        (ρσ_expr_temp = (ρσ_expr_temp = S.classes)[ρσ_bound_index(S.classes.length - 2, ρσ_expr_temp)])[(typeof in_class === "number" && in_class < 0) ? ρσ_expr_temp.length + in_class : in_class].static.push(name.name);
                        staticmethod = true;
                    } else if (name.name !== "__init__" && S.scoped_flags.get("bound_methods")) {
                        (ρσ_expr_temp = (ρσ_expr_temp = S.classes)[ρσ_bound_index(S.classes.length - 2, ρσ_expr_temp)])[(typeof in_class === "number" && in_class < 0) ? ρσ_expr_temp.length + in_class : in_class].bound.push(name.name);
                    }
                }
                expect("(");
                S.in_parenthesized_expr = true;
                ctor = (in_class) ? AST_Method : AST_Function;
                return_annotation = null;
                is_generator = [];
                docstrings = [];
                definition = new ctor((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["name"] = name;
                    ρσ_d["is_expression"] = is_expression;
                    ρσ_d["is_anonymous"] = is_anonymous;
                    ρσ_d["argnames"] = (function() {
                        var ρσ_anonfunc = function (a) {
                            var defaults, first, seen_names, def_line, current_arg_name, name_token;
                            defaults = Object.create(null);
                            first = true;
                            seen_names = Object.create(null);
                            def_line = S.input.context().tokline;
                            current_arg_name = null;
                            name_token = null;
                            function get_arg() {
                                var name_ctx, ntok, annotation, sym;
                                current_arg_name = S.token.value;
                                if (has_prop(seen_names, current_arg_name)) {
                                    token_error(prev(), "Can't repeat parameter names");
                                }
                                if (current_arg_name === "arguments") {
                                    token_error(prev(), "Can't use the name arguments as a parameter name, it is reserved by JavaScript");
                                }
                                seen_names[(typeof current_arg_name === "number" && current_arg_name < 0) ? seen_names.length + current_arg_name : current_arg_name] = true;
                                name_token = S.token;
                                name_ctx = S.input.context();
                                ntok = peek();
                                if (ntok.type === "punc" && ntok.value === ":") {
                                    next();
                                    expect(":");
                                    annotation = maybe_conditional();
                                    if (!is_token(name_token, "name")) {
                                        croak("Name expected", name_ctx.tokline);
                                        return null;
                                    }
                                    sym = new AST_SymbolFunarg((function(){
                                        var ρσ_d = Object.create(null);
                                        ρσ_d["name"] = name_token.value;
                                        ρσ_d["start"] = S.token;
                                        ρσ_d["end"] = S.token;
                                        ρσ_d["annotation"] = annotation;
                                        return ρσ_d;
                                    }).call(this));
                                    return sym;
                                } else {
                                    if (!is_("name")) {
                                        if (S.input.context().tokline !== def_line) {
                                            croak("Name expected", def_line);
                                        } else {
                                            croak("Name expected");
                                        }
                                        return null;
                                    }
                                    sym = new AST_SymbolFunarg((function(){
                                        var ρσ_d = Object.create(null);
                                        ρσ_d["name"] = current_arg_name;
                                        ρσ_d["start"] = S.token;
                                        ρσ_d["end"] = S.token;
                                        ρσ_d["annotation"] = null;
                                        return ρσ_d;
                                    }).call(this));
                                    next();
                                    return sym;
                                }
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
                                        token_error(name_token, "Can't define multiple **kwargs in function definition");
                                    }
                                    a.kwargs = get_arg();
                                } else if (is_("operator", "*")) {
                                    next();
                                    if (a.starargs) {
                                        token_error(name_token, "Can't define multiple *args in function definition");
                                    }
                                    if (a.kwargs) {
                                        token_error(name_token, "Can't define *args after **kwargs in function definition");
                                    }
                                    a.starargs = get_arg();
                                } else {
                                    if (a.starargs || a.kwargs) {
                                        token_error(name_token, "Can't define a formal parameter after *args or **kwargs");
                                    }
                                    a.push(get_arg());
                                    if (is_("operator", "=")) {
                                        if (a.kwargs) {
                                            token_error(name_token, "Can't define an optional formal parameter after **kwargs");
                                        }
                                        next();
                                        defaults[(typeof current_arg_name === "number" && current_arg_name < 0) ? defaults.length + current_arg_name : current_arg_name] = expression(false);
                                        a.has_defaults = true;
                                    } else {
                                        if (a.has_defaults) {
                                            token_error(name_token, "Can't define required formal parameters after optional formal parameters");
                                        }
                                    }
                                }
                            }
                            next();
                            if (is_("punc", "->")) {
                                next();
                                return_annotation = maybe_conditional();
                            }
                            S.in_parenthesized_expr = false;
                            a.defaults = defaults;
                            a.is_simple_func = !a.starargs && !a.kwargs && !a.has_defaults;
                            return a;
                        };
                        Object.defineProperties(ρσ_anonfunc, {
                            __argnames__ : {value: ["a"]}
                        });
                        return ρσ_anonfunc;
                    })()([]);
                    ρσ_d["localvars"] = ρσ_list_decorate([]);
                    ρσ_d["decorators"] = function () {
                        var d, decorator;
                        d = [];
                        var ρσ_Iter65 = ρσ_Iterable(S.decorators);
                        for (var ρσ_Index65 = 0; ρσ_Index65 < ρσ_Iter65.length; ρσ_Index65++) {
                            decorator = ρσ_Iter65[ρσ_Index65];
                            d.push(new AST_Decorator((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["expression"] = decorator;
                                return ρσ_d;
                            }).call(this)));
                        }
                        S.decorators = [];
                        return d;
                    }();
                    ρσ_d["docstrings"] = docstrings;
                    ρσ_d["body"] = (function() {
                        var ρσ_anonfunc = function (loop, labels) {
                            var a;
                            S.in_class.push(false);
                            S.classes.push(Object.create(null));
                            S.scoped_flags.push();
                            S.in_function += 1;
                            S.functions.push(Object.create(null));
                            S.in_loop = 0;
                            S.labels = ρσ_list_decorate([]);
                            a = block_(docstrings);
                            S.in_function -= 1;
                            S.scoped_flags.pop();
                            is_generator.push(bool(S.functions.pop().is_generator));
                            S.classes.pop();
                            S.in_class.pop();
                            S.in_loop = loop;
                            S.labels = labels;
                            return a;
                        };
                        Object.defineProperties(ρσ_anonfunc, {
                            __argnames__ : {value: ["loop", "labels"]}
                        });
                        return ρσ_anonfunc;
                    })()(S.in_loop, S.labels);
                    return ρσ_d;
                }).call(this));
                definition.return_annotation = return_annotation;
                definition.is_generator = is_generator[0];
                if (is_node_type(definition, AST_Method)) {
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
                for (var ρσ_Index66 = 0; ρσ_Index66 < assignments.length; ρσ_Index66++) {
                    i = ρσ_Index66;
                    for (var ρσ_Index67 = 0; ρσ_Index67 < definition.argnames.length + 1; ρσ_Index67++) {
                        j = ρσ_Index67;
                        if (j === definition.argnames.length) {
                            definition.localvars.push(new_symbol(AST_SymbolVar, assignments[(typeof i === "number" && i < 0) ? assignments.length + i : i]));
                        } else if (j < definition.argnames.length && assignments[(typeof i === "number" && i < 0) ? assignments.length + i : i] === (ρσ_expr_temp = definition.argnames)[(typeof j === "number" && j < 0) ? ρσ_expr_temp.length + j : j].name) {
                            break;
                        }
                    }
                }
                nonlocals = scan_for_nonlocal_defs(definition.body);
                nonlocals = (function() {
                    var ρσ_Iter = ρσ_Iterable(nonlocals), ρσ_Result = ρσ_set(), name;
                    for (var ρσ_Index = 0; ρσ_Index < ρσ_Iter.length; ρσ_Index++) {
                        name = ρσ_Iter[ρσ_Index];
                        ρσ_Result.add(name);
                    }
                    return ρσ_Result;
                })();
                definition.localvars = definition.localvars.filter((function() {
                    var ρσ_anonfunc = function (v) {
                        return !nonlocals.has(v.name);
                    };
                    Object.defineProperties(ρσ_anonfunc, {
                        __argnames__ : {value: ["v"]}
                    });
                    return ρσ_anonfunc;
                })());
                return definition;
            };
            Object.defineProperties(function_, {
                __argnames__ : {value: ["in_class", "is_expression"]}
            });

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
                return new AST_If((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["condition"] = cond;
                    ρσ_d["body"] = body;
                    ρσ_d["alternative"] = belse;
                    return ρσ_d;
                }).call(this));
            };

            function is_docstring(stmt) {
                if (is_node_type(stmt, AST_SimpleStatement)) {
                    if (is_node_type(stmt.body, AST_String)) {
                        return stmt.body;
                    }
                }
                return false;
            };
            Object.defineProperties(is_docstring, {
                __argnames__ : {value: ["stmt"]}
            });

            function block_(docstrings) {
                var a, stmt, ds;
                expect(":");
                a = [];
                if (!S.token.nlb) {
                    while (!S.token.nlb) {
                        if (is_("eof")) {
                            unexpected();
                        }
                        stmt = statement();
                        if (docstrings) {
                            ds = is_docstring(stmt);
                            if (ds) {
                                docstrings.push(ds);
                                continue;
                            }
                        }
                        a.push(stmt);
                    }
                } else {
                    while (!is_("punc", "}")) {
                        if (is_("eof")) {
                            return a;
                        }
                        stmt = statement();
                        if (docstrings) {
                            ds = is_docstring(stmt);
                            if (ds) {
                                docstrings.push(ds);
                                continue;
                            }
                        }
                        a.push(stmt);
                    }
                    next();
                }
                return a;
            };
            Object.defineProperties(block_, {
                __argnames__ : {value: ["docstrings"]}
            });

            function try_() {
                var body, bcatch, bfinally, start, exceptions, name;
                body = block_();
                bcatch = [];
                bfinally = null;
                while (is_("keyword", "except")) {
                    start = S.token;
                    next();
                    exceptions = ρσ_list_decorate([]);
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
                    bcatch.push(new AST_Except((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = start;
                        ρσ_d["argname"] = name;
                        ρσ_d["errors"] = exceptions;
                        ρσ_d["body"] = block_();
                        ρσ_d["end"] = prev();
                        return ρσ_d;
                    }).call(this)));
                }
                if (is_("keyword", "finally")) {
                    start = S.token;
                    next();
                    bfinally = new AST_Finally((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = start;
                        ρσ_d["body"] = block_();
                        ρσ_d["end"] = prev();
                        return ρσ_d;
                    }).call(this));
                }
                if (!bcatch.length && !bfinally) {
                    croak("Missing except/finally blocks");
                }
                return new AST_Try((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["body"] = body;
                    ρσ_d["bcatch"] = (bcatch.length) ? new AST_Catch((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["body"] = bcatch;
                        return ρσ_d;
                    }).call(this)) : null;
                    ρσ_d["bfinally"] = bfinally;
                    return ρσ_d;
                }).call(this));
            };

            function vardefs(no_in, in_const, in_nonlocal) {
                var a;
                a = ρσ_list_decorate([]);
                while (true) {
                    a.push(new AST_VarDef((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = S.token;
                        ρσ_d["name"] = as_symbol((in_const) ? AST_SymbolConst : (in_nonlocal) ? AST_SymbolNonlocal : AST_SymbolVar);
                        ρσ_d["value"] = (is_("operator", "=")) ? (next(), expression(false, no_in)) : null;
                        ρσ_d["end"] = prev();
                        return ρσ_d;
                    }).call(this)));
                    if (!is_("punc", ",")) {
                        break;
                    }
                    next();
                }
                return a;
            };
            Object.defineProperties(vardefs, {
                __argnames__ : {value: ["no_in", "in_const", "in_nonlocal"]}
            });

            function nonlocal_(no_in) {
                return new AST_Var((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["start"] = prev();
                    ρσ_d["definitions"] = vardefs(no_in, false, true);
                    ρσ_d["end"] = prev();
                    return ρσ_d;
                }).call(this));
            };
            Object.defineProperties(nonlocal_, {
                __argnames__ : {value: ["no_in"]}
            });

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
                return subscripts(new AST_New((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["start"] = start;
                    ρσ_d["expression"] = newexp;
                    ρσ_d["args"] = args;
                    ρσ_d["end"] = prev();
                    return ρσ_d;
                }).call(this)), true);
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
                return new AST_String((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["start"] = start;
                    ρσ_d["end"] = S.token;
                    ρσ_d["value"] = strings.join("");
                    return ρσ_d;
                }).call(this));
            };

            function token_as_atom_node() {
                var tok, tmp_, tmp__;
                tok = S.token;
                tmp_ = tok.type;
                if (tmp_ === "name") {
                    return token_as_symbol(tok, AST_SymbolRef);
                } else if (tmp_ === "num") {
                    return new AST_Number((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = tok;
                        ρσ_d["end"] = tok;
                        ρσ_d["value"] = tok.value;
                        return ρσ_d;
                    }).call(this));
                } else if (tmp_ === "string") {
                    return string_();
                } else if (tmp_ === "regexp") {
                    return new AST_RegExp((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = tok;
                        ρσ_d["end"] = tok;
                        ρσ_d["value"] = tok.value;
                        return ρσ_d;
                    }).call(this));
                } else if (tmp_ === "atom") {
                    tmp__ = tok.value;
                    if (tmp__ === "False") {
                        return new AST_False((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = tok;
                            ρσ_d["end"] = tok;
                            return ρσ_d;
                        }).call(this));
                    } else if (tmp__ === "True") {
                        return new AST_True((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = tok;
                            ρσ_d["end"] = tok;
                            return ρσ_d;
                        }).call(this));
                    } else if (tmp__ === "None") {
                        return new AST_Null((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = tok;
                            ρσ_d["end"] = tok;
                            return ρσ_d;
                        }).call(this));
                    }
                } else if (tmp_ === "js") {
                    return new AST_Verbatim((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = tok;
                        ρσ_d["end"] = tok;
                        ρσ_d["value"] = tok.value;
                        return ρσ_d;
                    }).call(this));
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
                            return new AST_Array((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["elements"] = ρσ_list_decorate([]);
                                return ρσ_d;
                            }).call(this));
                        }
                        ex = expression(true);
                        if (is_("keyword", "for")) {
                            ret = read_comprehension(new AST_GeneratorComprehension((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["statement"] = ex;
                                return ρσ_d;
                            }).call(this)), ")");
                            S.in_parenthesized_expr = false;
                            return ret;
                        }
                        ex.start = start;
                        ex.end = S.token;
                        if (is_node_type(ex, AST_SymbolRef)) {
                            ex.parens = true;
                        }
                        if (!is_node_type(ex, AST_GeneratorComprehension)) {
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
                if (ATOMIC_START_TOKEN[ρσ_bound_index(S.token.type, ATOMIC_START_TOKEN)]) {
                    return subscripts(as_atom_node(), allow_calls);
                }
                unexpected();
            };
            Object.defineProperties(expr_atom, {
                __argnames__ : {value: ["allow_calls"]}
            });

            function expr_list(closing, allow_trailing_comma, allow_empty, func_call) {
                var first, a, saw_starargs, tmp, arg;
                first = true;
                a = ρσ_list_decorate([]);
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
                        a.push(new AST_Hole((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = S.token;
                            ρσ_d["end"] = S.token;
                            return ρσ_d;
                        }).call(this)));
                    } else {
                        a.push(expression(false));
                    }
                }
                if (func_call) {
                    tmp = ρσ_list_decorate([]);
                    tmp.kwargs = ρσ_list_decorate([]);
                    var ρσ_Iter68 = ρσ_Iterable(a);
                    for (var ρσ_Index68 = 0; ρσ_Index68 < ρσ_Iter68.length; ρσ_Index68++) {
                        arg = ρσ_Iter68[ρσ_Index68];
                        if (is_node_type(arg, AST_Assign)) {
                            tmp.kwargs.push(ρσ_list_decorate([ arg.left, arg.right ]));
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
            Object.defineProperties(expr_list, {
                __argnames__ : {value: ["closing", "allow_trailing_comma", "allow_empty", "func_call"]}
            });

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
                        if (is_node_type(arg, AST_Assign)) {
                            a.kwargs.push(ρσ_list_decorate([ arg.left, arg.right ]));
                        } else {
                            if (is_("keyword", "for")) {
                                if (!first) {
                                    croak("Generator expression must be parenthesized if not sole argument");
                                }
                                a.push(read_comprehension(new AST_GeneratorComprehension((function(){
                                    var ρσ_d = Object.create(null);
                                    ρσ_d["statement"] = arg;
                                    return ρσ_d;
                                }).call(this)), ")"));
                                single_comprehension = true;
                                break;
                            }
                            a.push(arg);
                        }
                    }
                    first = false;
                }
                if (!single_comprehension) {
                    next();
                }
                return a;
            };
            Object.defineProperties(func_call_list, {
                __argnames__ : {value: ["empty"]}
            });

            
            var array_ = embed_tokens(function array_() {
                var expr;
                expect("[");
                expr = ρσ_list_decorate([]);
                if (!is_("punc", "]")) {
                    expr.push(expression(false));
                    if (is_("keyword", "for")) {
                        return read_comprehension(new AST_ListComprehension((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["statement"] = expr[0];
                            return ρσ_d;
                        }).call(this)), "]");
                    }
                    if (!is_("punc", "]")) {
                        expect(",");
                    }
                }
                return new AST_Array((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["elements"] = expr.concat(expr_list("]", true, true));
                    return ρσ_d;
                }).call(this));
            });

            
            var object_ = embed_tokens(function object_() {
                var first, has_non_const_keys, is_pydict, is_jshash, a, start, ctx, orig, left, end;
                expect("{");
                first = true;
                has_non_const_keys = false;
                is_pydict = S.scoped_flags.get("dict_literals", false);
                is_jshash = S.scoped_flags.get("hash_literals", false);
                a = ρσ_list_decorate([]);
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
                        return read_comprehension(new AST_SetComprehension((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["statement"] = left;
                            return ρσ_d;
                        }).call(this)), "}");
                    }
                    if (a.length === 0 && (is_("punc", ",") || is_("punc", "}"))) {
                        end = prev();
                        return set_(start, end, left);
                    }
                    if (!is_node_type(left, AST_Constant)) {
                        has_non_const_keys = true;
                    }
                    expect(":");
                    a.push(new AST_ObjectKeyVal((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = start;
                        ρσ_d["key"] = left;
                        ρσ_d["value"] = expression(false);
                        ρσ_d["end"] = prev();
                        return ρσ_d;
                    }).call(this)));
                    if (a.length === 1 && is_("keyword", "for")) {
                        return dict_comprehension(a, is_pydict, is_jshash);
                    }
                }
                next();
                return new ((has_non_const_keys) ? AST_ExpressiveObject : AST_Object)((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["properties"] = a;
                    ρσ_d["is_pydict"] = is_pydict;
                    ρσ_d["is_jshash"] = is_jshash;
                    return ρσ_d;
                }).call(this));
            });

            function set_(start, end, expr) {
                var ostart, a;
                ostart = start;
                a = ρσ_list_decorate([ new AST_SetItem((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["start"] = start;
                    ρσ_d["end"] = end;
                    ρσ_d["value"] = expr;
                    return ρσ_d;
                }).call(this)) ]);
                while (!is_("punc", "}")) {
                    expect(",");
                    start = S.token;
                    if (is_("punc", "}")) {
                        break;
                    }
                    a.push(new AST_SetItem((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = start;
                        ρσ_d["value"] = expression(false);
                        ρσ_d["end"] = prev();
                        return ρσ_d;
                    }).call(this)));
                }
                next();
                return new AST_Set((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["items"] = a;
                    ρσ_d["start"] = ostart;
                    ρσ_d["end"] = prev();
                    return ρσ_d;
                }).call(this));
            };
            Object.defineProperties(set_, {
                __argnames__ : {value: ["start", "end", "expr"]}
            });

            function read_comprehension(obj, terminator) {
                var forloop;
                if (is_node_type(obj, AST_GeneratorComprehension)) {
                    baselib_items["yield"] = true;
                }
                S.in_comprehension = true;
                S.in_parenthesized_expr = false;
                expect_token("keyword", "for");
                forloop = for_(true);
                obj.init = forloop.init;
                obj.name = forloop.name;
                obj.object = forloop.object;
                obj.condition = (is_("punc", terminator)) ? null : (expect_token("keyword", "if"), 
                expression(true));
                expect(terminator);
                S.in_comprehension = false;
                return obj;
            };
            Object.defineProperties(read_comprehension, {
                __argnames__ : {value: ["obj", "terminator"]}
            });

            function dict_comprehension(a, is_pydict, is_jshash) {
                var ρσ_unpack, left, right;
                if (a.length) {
                    ρσ_unpack = [a[0].key, a[0].value];
                    left = ρσ_unpack[0];
                    right = ρσ_unpack[1];
                } else {
                    left = expression(false);
                    if (!is_("punc", ":")) {
                        return read_comprehension(new AST_SetComprehension((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["statement"] = left;
                            return ρσ_d;
                        }).call(this)), "}");
                    }
                    expect(":");
                    right = expression(false);
                }
                return read_comprehension(new AST_DictComprehension((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["statement"] = left;
                    ρσ_d["value_statement"] = right;
                    ρσ_d["is_pydict"] = is_pydict;
                    ρσ_d["is_jshash"] = is_jshash;
                    return ρσ_d;
                }).call(this)), "}");
            };
            Object.defineProperties(dict_comprehension, {
                __argnames__ : {value: ["a", "is_pydict", "is_jshash"]}
            });

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
                if (RESERVED_WORDS[(typeof name === "number" && name < 0) ? RESERVED_WORDS.length + name : name] && name !== "this") {
                    croak(name + " is a reserved word");
                }
                return new ((name === "this") ? AST_This : ttype)((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["name"] = String(tok.value);
                    ρσ_d["start"] = tok;
                    ρσ_d["end"] = tok;
                    return ρσ_d;
                }).call(this));
            };
            Object.defineProperties(token_as_symbol, {
                __argnames__ : {value: ["tok", "ttype"]}
            });

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
            Object.defineProperties(as_symbol, {
                __argnames__ : {value: ["ttype", "noerror"]}
            });

            function new_symbol(type, name) {
                var sym;
                sym = new ((name === "this") ? AST_This : type)((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["name"] = String(name);
                    ρσ_d["start"] = null;
                    ρσ_d["end"] = null;
                    return ρσ_d;
                }).call(this));
                return sym;
            };
            Object.defineProperties(new_symbol, {
                __argnames__ : {value: ["type", "name"]}
            });

            function is_static_method(cls, method) {
                if (COMMON_STATIC.indexOf(method) !== -1 || cls.static && cls.static.indexOf(method) !== -1) {
                    return true;
                } else {
                    return false;
                }
            };
            Object.defineProperties(is_static_method, {
                __argnames__ : {value: ["cls", "method"]}
            });

            function getitem(expr, allow_calls) {
                var start, is_py_sub, slice_bounds, is_slice, i, assignment;
                start = expr.start;
                next();
                is_py_sub = S.scoped_flags.get("overload_getitem", false);
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
                    next();
                    if (is_("punc", "]")) {
                        unexpected();
                    } else {
                        slice_bounds.push(expression(false));
                    }
                }
                expect("]");
                if (is_slice) {
                    if (is_("operator", "=")) {
                        next();
                        return subscripts(new AST_Splice((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = start;
                            ρσ_d["expression"] = expr;
                            ρσ_d["property"] = slice_bounds[0] || new AST_Number((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["value"] = 0;
                                return ρσ_d;
                            }).call(this));
                            ρσ_d["property2"] = slice_bounds[1];
                            ρσ_d["assignment"] = expression(true);
                            ρσ_d["end"] = prev();
                            return ρσ_d;
                        }).call(this)), allow_calls);
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
                        return subscripts(new AST_Call((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = start;
                            ρσ_d["expression"] = new AST_SymbolRef((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["name"] = (S.in_delete) ? "ρσ_delslice" : "ρσ_eslice";
                                return ρσ_d;
                            }).call(this));
                            ρσ_d["args"] = ρσ_list_decorate([ expr ]).concat(slice_bounds);
                            ρσ_d["end"] = prev();
                            return ρσ_d;
                        }).call(this)), allow_calls);
                    } else {
                        slice_bounds = (function() {
                            var ρσ_Iter = ρσ_Iterable(slice_bounds), ρσ_Result = [], i;
                            for (var ρσ_Index = 0; ρσ_Index < ρσ_Iter.length; ρσ_Index++) {
                                i = ρσ_Iter[ρσ_Index];
                                ρσ_Result.push((i === null) ? new AST_Number((function(){
                                    var ρσ_d = Object.create(null);
                                    ρσ_d["value"] = 0;
                                    return ρσ_d;
                                }).call(this)) : i);
                            }
                            ρσ_Result = ρσ_list_constructor(ρσ_Result);
                            return ρσ_Result;
                        })();
                        if (S.in_delete) {
                            return subscripts(new AST_Call((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["start"] = start;
                                ρσ_d["expression"] = new AST_SymbolRef((function(){
                                    var ρσ_d = Object.create(null);
                                    ρσ_d["name"] = "ρσ_delslice";
                                    return ρσ_d;
                                }).call(this));
                                ρσ_d["args"] = ρσ_list_decorate([ expr, new AST_Number((function(){
                                    var ρσ_d = Object.create(null);
                                    ρσ_d["value"] = 1;
                                    return ρσ_d;
                                }).call(this)) ]).concat(slice_bounds);
                                ρσ_d["end"] = prev();
                                return ρσ_d;
                            }).call(this)), allow_calls);
                        }
                        return subscripts(new AST_Call((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = start;
                            ρσ_d["expression"] = new AST_Dot((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["start"] = start;
                                ρσ_d["expression"] = expr;
                                ρσ_d["property"] = "slice";
                                ρσ_d["end"] = prev();
                                return ρσ_d;
                            }).call(this));
                            ρσ_d["args"] = slice_bounds;
                            ρσ_d["end"] = prev();
                            return ρσ_d;
                        }).call(this)), allow_calls);
                    }
                } else {
                    if (is_py_sub) {
                        assignment = null;
                        if (is_("operator") && S.token.value === "=") {
                            next();
                            assignment = expression(true);
                        }
                        return subscripts(new AST_ItemAccess((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = start;
                            ρσ_d["expression"] = expr;
                            ρσ_d["property"] = slice_bounds[0] || new AST_Number((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["value"] = 0;
                                return ρσ_d;
                            }).call(this));
                            ρσ_d["assignment"] = assignment;
                            ρσ_d["end"] = prev();
                            return ρσ_d;
                        }).call(this)), allow_calls);
                    }
                    return subscripts(new AST_Sub((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = start;
                        ρσ_d["expression"] = expr;
                        ρσ_d["property"] = slice_bounds[0] || new AST_Number((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["value"] = 0;
                            return ρσ_d;
                        }).call(this));
                        ρσ_d["end"] = prev();
                        return ρσ_d;
                    }).call(this)), allow_calls);
                }
            };
            Object.defineProperties(getitem, {
                __argnames__ : {value: ["expr", "allow_calls"]}
            });

            function call_(expr) {
                var start, ret, c, funcname, tmp_, args;
                start = expr.start;
                S.in_parenthesized_expr = true;
                next();
                if (!expr.parens && get_class_in_scope(expr)) {
                    ret = subscripts(new AST_New((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = start;
                        ρσ_d["expression"] = expr;
                        ρσ_d["args"] = func_call_list();
                        ρσ_d["end"] = prev();
                        return ρσ_d;
                    }).call(this)), true);
                    S.in_parenthesized_expr = false;
                    return ret;
                } else {
                    if (is_node_type(expr, AST_Dot)) {
                        c = get_class_in_scope(expr.expression);
                    }
                    if (c) {
                        funcname = expr;
                        ret = subscripts(new AST_ClassCall((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = start;
                            ρσ_d["class"] = expr.expression;
                            ρσ_d["method"] = funcname.property;
                            ρσ_d["static"] = is_static_method(c, funcname.property);
                            ρσ_d["args"] = func_call_list();
                            ρσ_d["end"] = prev();
                            return ρσ_d;
                        }).call(this)), true);
                        S.in_parenthesized_expr = false;
                        return ret;
                    } else if (is_node_type(expr, AST_SymbolRef)) {
                        tmp_ = expr.name;
                        if (tmp_ === "jstype") {
                            ret = new AST_UnaryPrefix((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["start"] = start;
                                ρσ_d["operator"] = "typeof";
                                ρσ_d["expression"] = func_call_list()[0];
                                ρσ_d["end"] = prev();
                                return ρσ_d;
                            }).call(this));
                            S.in_parenthesized_expr = false;
                            return ret;
                        } else if (tmp_ === "isinstance") {
                            args = func_call_list();
                            if (args.length !== 2) {
                                croak("isinstance() must be called with exactly two arguments");
                            }
                            ret = new AST_Binary((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["start"] = start;
                                ρσ_d["left"] = args[0];
                                ρσ_d["operator"] = "instanceof";
                                ρσ_d["right"] = args[1];
                                ρσ_d["end"] = prev();
                                return ρσ_d;
                            }).call(this));
                            S.in_parenthesized_expr = false;
                            return ret;
                        }
                    }
                    ret = subscripts(new AST_Call((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = start;
                        ρσ_d["expression"] = expr;
                        ρσ_d["args"] = func_call_list();
                        ρσ_d["end"] = prev();
                        return ρσ_d;
                    }).call(this)), true);
                    S.in_parenthesized_expr = false;
                    return ret;
                }
            };
            Object.defineProperties(call_, {
                __argnames__ : {value: ["expr"]}
            });

            function get_attr(expr, allow_calls) {
                var prop, c;
                next();
                prop = as_name();
                c = get_class_in_scope(expr);
                if (c && c.classvars && c.classvars[prop]) {
                    prop = "prototype." + prop;
                }
                return subscripts(new AST_Dot((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["start"] = expr.start;
                    ρσ_d["expression"] = expr;
                    ρσ_d["property"] = prop;
                    ρσ_d["end"] = prev();
                    return ρσ_d;
                }).call(this)), allow_calls);
            };
            Object.defineProperties(get_attr, {
                __argnames__ : {value: ["expr", "allow_calls"]}
            });

            function existential(expr, allow_calls) {
                var ans, ttype, val, is_py_sub;
                ans = new AST_Existential((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["start"] = expr.start;
                    ρσ_d["end"] = S.token;
                    ρσ_d["expression"] = expr;
                    return ρσ_d;
                }).call(this));
                next();
                ttype = S.token.type;
                val = S.token.value;
                if (S.token.nlb || ttype === "keyword" || ttype === "operator" || ttype === "eof") {
                    ans.after = null;
                    return ans;
                }
                if (ttype === "punc") {
                    if (val === ".") {
                        ans.after = ".";
                    } else if (val === "[") {
                        is_py_sub = S.scoped_flags.get("overload_getitem", false);
                        ans.after = (is_py_sub) ? "g" : "[";
                    } else if (val === "(") {
                        if (!allow_calls) {
                            unexpected();
                        }
                        ans.after = "(";
                    } else {
                        ans.after = null;
                        return ans;
                    }
                    return subscripts(ans, allow_calls);
                }
                ans.after = expression();
                return ans;
            };
            Object.defineProperties(existential, {
                __argnames__ : {value: ["expr", "allow_calls"]}
            });

            function subscripts(expr, allow_calls) {
                if (is_("punc", ".")) {
                    return get_attr(expr, allow_calls);
                }
                if (is_("punc", "[") && !S.token.nlb) {
                    return getitem(expr, allow_calls);
                }
                if (allow_calls && is_("punc", "(") && !S.token.nlb) {
                    return call_(expr);
                }
                if (is_("punc", "?")) {
                    return existential(expr, allow_calls);
                }
                return expr;
            };
            Object.defineProperties(subscripts, {
                __argnames__ : {value: ["expr", "allow_calls"]}
            });

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
                    return new AST_EmptyStatement((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["stype"] = "@";
                        ρσ_d["start"] = prev();
                        ρσ_d["end"] = prev();
                        return ρσ_d;
                    }).call(this));
                }
                if (is_("operator") && UNARY_PREFIX[ρσ_bound_index(start.value, UNARY_PREFIX)]) {
                    next();
                    S.in_delete = start.value === "delete";
                    expr = maybe_unary(allow_calls);
                    S.in_delete = false;
                    ex = make_unary(AST_UnaryPrefix, start.value, expr);
                    ex.start = start;
                    ex.end = prev();
                    return ex;
                }
                val = expr_atom(allow_calls);
                return val;
            };
            Object.defineProperties(maybe_unary, {
                __argnames__ : {value: ["allow_calls"]}
            });

            function make_unary(ctor, op, expr) {
                return new ctor((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["operator"] = op;
                    ρσ_d["expression"] = expr;
                    return ρσ_d;
                }).call(this));
            };
            Object.defineProperties(make_unary, {
                __argnames__ : {value: ["ctor", "op", "expr"]}
            });

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
                    }
                }
                prec = (op !== null) ? PRECEDENCE[(typeof op === "number" && op < 0) ? PRECEDENCE.length + op : op] : null;
                if (prec !== null && prec > min_prec) {
                    next();
                    right = expr_op(maybe_unary(true), prec, no_in);
                    ret = new AST_Binary((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = left.start;
                        ρσ_d["left"] = left;
                        ρσ_d["operator"] = op;
                        ρσ_d["right"] = right;
                        ρσ_d["end"] = right.end;
                        return ρσ_d;
                    }).call(this));
                    if (not_in) {
                        ret = new AST_UnaryPrefix((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = left.start;
                            ρσ_d["operator"] = "!";
                            ρσ_d["expression"] = ret;
                            ρσ_d["end"] = right.end;
                            return ρσ_d;
                        }).call(this));
                    }
                    return expr_op(ret, min_prec, no_in);
                }
                return left;
            };
            Object.defineProperties(expr_op, {
                __argnames__ : {value: ["left", "min_prec", "no_in"]}
            });

            function expr_ops(no_in) {
                return expr_op(maybe_unary(true), 0, no_in);
            };
            Object.defineProperties(expr_ops, {
                __argnames__ : {value: ["no_in"]}
            });

            function maybe_conditional(no_in) {
                var start, expr, ne, conditional;
                start = S.token;
                expr = expr_ops(no_in);
                if (is_("keyword", "if") && (S.in_parenthesized_expr || S.statement_starting_token !== S.token && !S.in_comprehension && !S.token.nlb)) {
                    next();
                    ne = expression(false);
                    expect_token("keyword", "else");
                    conditional = new AST_Conditional((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = start;
                        ρσ_d["condition"] = ne;
                        ρσ_d["consequent"] = expr;
                        ρσ_d["alternative"] = expression(false, no_in);
                        ρσ_d["end"] = peek();
                        return ρσ_d;
                    }).call(this));
                    return conditional;
                }
                return expr;
            };
            Object.defineProperties(maybe_conditional, {
                __argnames__ : {value: ["no_in"]}
            });

            function create_assign(data) {
                if (data.right && is_node_type(data.right, AST_Seq) && (is_node_type(data.right.car, AST_Assign) || is_node_type(data.right.cdr, AST_Assign)) && data.operator !== "=") {
                    token_error(data.start, "Invalid assignment operator for chained assignment: " + data.operator);
                }
                return new AST_Assign(data);
            };
            Object.defineProperties(create_assign, {
                __argnames__ : {value: ["data"]}
            });

            function maybe_assign(no_in, only_plain_assignment) {
                var start, left, val;
                start = S.token;
                left = maybe_conditional(no_in);
                val = S.token.value;
                if (is_("operator") && ASSIGNMENT[(typeof val === "number" && val < 0) ? ASSIGNMENT.length + val : val]) {
                    if (only_plain_assignment && val !== "=") {
                        croak("Invalid assignment operator for chained assignment: " + val);
                    }
                    next();
                    return create_assign((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = start;
                        ρσ_d["left"] = left;
                        ρσ_d["operator"] = val;
                        ρσ_d["right"] = maybe_assign(no_in, true);
                        ρσ_d["end"] = prev();
                        return ρσ_d;
                    }).call(this));
                }
                return left;
            };
            Object.defineProperties(maybe_assign, {
                __argnames__ : {value: ["no_in", "only_plain_assignment"]}
            });

            function expression(commas, no_in) {
                var start, expr, left;
                start = S.token;
                expr = maybe_assign(no_in);
                function build_seq(a) {
                    if (a.length === 1) {
                        return a[0];
                    }
                    return new AST_Seq((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = start;
                        ρσ_d["car"] = a.shift();
                        ρσ_d["cdr"] = build_seq(a);
                        ρσ_d["end"] = peek();
                        return ρσ_d;
                    }).call(this));
                };
                Object.defineProperties(build_seq, {
                    __argnames__ : {value: ["a"]}
                });

                if (commas) {
                    left = [ expr ];
                    while (is_("punc", ",") && !peek().nlb) {
                        next();
                        if (is_node_type(expr, AST_Assign)) {
                            left[left.length-1] = left[left.length-1].left;
                            return create_assign((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["start"] = start;
                                ρσ_d["left"] = (left.length === 1) ? left[0] : new AST_Array((function(){
                                    var ρσ_d = Object.create(null);
                                    ρσ_d["elements"] = left;
                                    return ρσ_d;
                                }).call(this));
                                ρσ_d["operator"] = expr.operator;
                                ρσ_d["right"] = new AST_Seq((function(){
                                    var ρσ_d = Object.create(null);
                                    ρσ_d["car"] = expr.right;
                                    ρσ_d["cdr"] = expression(true, no_in);
                                    return ρσ_d;
                                }).call(this));
                                ρσ_d["end"] = peek();
                                return ρσ_d;
                            }).call(this));
                        }
                        expr = maybe_assign(no_in);
                        left.push(expr);
                    }
                    if (left.length > 1 && is_node_type(left[left.length-1], AST_Assign)) {
                        left[left.length-1] = left[left.length-1].left;
                        return create_assign((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["start"] = start;
                            ρσ_d["left"] = new AST_Array((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["elements"] = left;
                                return ρσ_d;
                            }).call(this));
                            ρσ_d["operator"] = expr.operator;
                            ρσ_d["right"] = expr.right;
                            ρσ_d["end"] = peek();
                            return ρσ_d;
                        }).call(this));
                    }
                    return build_seq(left);
                }
                return expr;
            };
            Object.defineProperties(expression, {
                __argnames__ : {value: ["commas", "no_in"]}
            });

            function in_loop(cont) {
                var ret;
                S.in_loop += 1;
                ret = cont();
                S.in_loop -= 1;
                return ret;
            };
            Object.defineProperties(in_loop, {
                __argnames__ : {value: ["cont"]}
            });

            function run_parser() {
                var start, body, docstrings, first_token, toplevel, element, shebang, ds, end, seen_exports, item;
                start = S.token = next();
                body = [];
                docstrings = [];
                first_token = true;
                toplevel = options.toplevel;
                while (!is_("eof")) {
                    element = statement();
                    if (first_token && is_node_type(element, AST_Directive) && element.value.indexOf("#!") === 0) {
                        shebang = element.value;
                    } else {
                        ds = !toplevel && is_docstring(element);
                        if (ds) {
                            docstrings.push(ds);
                        } else {
                            body.push(element);
                        }
                    }
                    first_token = false;
                }
                end = prev();
                if (toplevel) {
                    toplevel.body = toplevel.body.concat(body);
                    toplevel.end = end;
                    toplevel.docstrings;
                } else {
                    toplevel = new AST_Toplevel((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["start"] = start;
                        ρσ_d["body"] = body;
                        ρσ_d["shebang"] = shebang;
                        ρσ_d["end"] = end;
                        ρσ_d["docstrings"] = docstrings;
                        return ρσ_d;
                    }).call(this));
                }
                toplevel.nonlocalvars = scan_for_nonlocal_defs(toplevel.body);
                toplevel.localvars = ρσ_list_decorate([]);
                toplevel.exports = ρσ_list_decorate([]);
                seen_exports = Object.create(null);
                function add_item(item, isvar) {
                    var symbol;
                    if (toplevel.nonlocalvars.indexOf(item) < 0) {
                        symbol = new_symbol(AST_SymbolVar, item);
                        if (isvar) {
                            toplevel.localvars.push(symbol);
                        }
                        if (!has_prop(seen_exports, item)) {
                            toplevel.exports.push(symbol);
                            seen_exports[(typeof item === "number" && item < 0) ? seen_exports.length + item : item] = true;
                        }
                    }
                };
                Object.defineProperties(add_item, {
                    __argnames__ : {value: ["item", "isvar"]}
                });

                var ρσ_Iter69 = ρσ_Iterable(scan_for_local_vars(toplevel.body));
                for (var ρσ_Index69 = 0; ρσ_Index69 < ρσ_Iter69.length; ρσ_Index69++) {
                    item = ρσ_Iter69[ρσ_Index69];
                    add_item(item, true);
                }
                var ρσ_Iter70 = ρσ_Iterable(scan_for_top_level_callables(toplevel.body));
                for (var ρσ_Index70 = 0; ρσ_Index70 < ρσ_Iter70.length; ρσ_Index70++) {
                    item = ρσ_Iter70[ρσ_Index70];
                    add_item(item, false);
                }
                toplevel.filename = options.filename;
                toplevel.imported_module_ids = imported_module_ids;
                toplevel.classes = scan_for_classes(toplevel.body);
                toplevel.import_order = Object.keys(imported_modules).length;
                toplevel.module_id = module_id;
                imported_modules[(typeof module_id === "number" && module_id < 0) ? imported_modules.length + module_id : module_id] = toplevel;
                toplevel.imports = imported_modules;
                toplevel.baselib = baselib_items;
                toplevel.scoped_flags = S.scoped_flags.stack[0];
                importing_modules[(typeof module_id === "number" && module_id < 0) ? importing_modules.length + module_id : module_id] = false;
                return toplevel;
            };

            return run_parser;
        };
        Object.defineProperties(create_parser_ctx, {
            __argnames__ : {value: ["S", "import_dirs", "module_id", "baselib_items", "imported_module_ids", "imported_modules", "importing_modules", "options"]}
        });

        function parse(text, options) {
            var import_dirs, x, location, module_id, baselib_items, imported_module_ids, imported_modules, importing_modules, S, obj, cname;
            options = defaults(options, (function(){
                var ρσ_d = Object.create(null);
                ρσ_d["filename"] = null;
                ρσ_d["module_id"] = "__main__";
                ρσ_d["toplevel"] = null;
                ρσ_d["for_linting"] = false;
                ρσ_d["import_dirs"] = [];
                ρσ_d["classes"] = undefined;
                ρσ_d["scoped_flags"] = Object.create(null);
                ρσ_d["discard_asserts"] = false;
                ρσ_d["module_cache_dir"] = "";
                return ρσ_d;
            }).call(this));
            import_dirs = (function() {
                var ρσ_Iter = ρσ_Iterable(options.import_dirs), ρσ_Result = [], x;
                for (var ρσ_Index = 0; ρσ_Index < ρσ_Iter.length; ρσ_Index++) {
                    x = ρσ_Iter[ρσ_Index];
                    ρσ_Result.push(x);
                }
                ρσ_Result = ρσ_list_constructor(ρσ_Result);
                return ρσ_Result;
            })();
            var ρσ_Iter71 = ρσ_Iterable([options.libdir, options.basedir]);
            for (var ρσ_Index71 = 0; ρσ_Index71 < ρσ_Iter71.length; ρσ_Index71++) {
                location = ρσ_Iter71[ρσ_Index71];
                if (location) {
                    import_dirs.push(location);
                }
            }
            module_id = options.module_id;
            baselib_items = Object.create(null);
            imported_module_ids = ρσ_list_decorate([]);
            imported_modules = options.imported_modules || Object.create(null);
            importing_modules = options.importing_modules || Object.create(null);
            importing_modules[(typeof module_id === "number" && module_id < 0) ? importing_modules.length + module_id : module_id] = true;
            S = (function(){
                var ρσ_d = Object.create(null);
                ρσ_d["input"] = (typeof text === "string") ? tokenizer(text, options.filename) : text;
                ρσ_d["token"] = null;
                ρσ_d["prev"] = null;
                ρσ_d["peeked"] = ρσ_list_decorate([]);
                ρσ_d["in_function"] = 0;
                ρσ_d["statement_starting_token"] = null;
                ρσ_d["in_comprehension"] = false;
                ρσ_d["in_parenthesized_expr"] = false;
                ρσ_d["in_delete"] = false;
                ρσ_d["in_loop"] = 0;
                ρσ_d["in_class"] = ρσ_list_decorate([ false ]);
                ρσ_d["classes"] = ρσ_list_decorate([ Object.create(null) ]);
                ρσ_d["functions"] = ρσ_list_decorate([ Object.create(null) ]);
                ρσ_d["labels"] = ρσ_list_decorate([]);
                ρσ_d["decorators"] = [];
                ρσ_d["parsing_decorator"] = false;
                ρσ_d["scoped_flags"] = (function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["stack"] = [options.scoped_flags || Object.create(null)];
                    ρσ_d["push"] = function () {
                        this.stack.push(Object.create(null));
                    };
                    ρσ_d["pop"] = function () {
                        this.stack.pop();
                    };
                    ρσ_d["get"] = (function() {
                        var ρσ_anonfunc = function (name, defval) {
                            var d, q;
                            for (var i = this.stack.length - 1; i >= 0; i--) {
                                d = (ρσ_expr_temp = this.stack)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i];
                                q = d[(typeof name === "number" && name < 0) ? d.length + name : name];
                                if (q) {
                                    return q;
                                }
                            }
                            return defval;
                        };
                        Object.defineProperties(ρσ_anonfunc, {
                            __argnames__ : {value: ["name", "defval"]}
                        });
                        return ρσ_anonfunc;
                    })();
                    ρσ_d["set"] = (function() {
                        var ρσ_anonfunc = function (name, val) {
                            (ρσ_expr_temp = (ρσ_expr_temp = this.stack)[ρσ_expr_temp.length-1])[(typeof name === "number" && name < 0) ? ρσ_expr_temp.length + name : name] = val;
                        };
                        Object.defineProperties(ρσ_anonfunc, {
                            __argnames__ : {value: ["name", "val"]}
                        });
                        return ρσ_anonfunc;
                    })();
                    return ρσ_d;
                }).call(this);
                return ρσ_d;
            }).call(this);
            if (options.classes) {
                var ρσ_Iter72 = ρσ_Iterable(options.classes);
                for (var ρσ_Index72 = 0; ρσ_Index72 < ρσ_Iter72.length; ρσ_Index72++) {
                    cname = ρσ_Iter72[ρσ_Index72];
                    obj = (ρσ_expr_temp = options.classes)[(typeof cname === "number" && cname < 0) ? ρσ_expr_temp.length + cname : cname];
                    (ρσ_expr_temp = S.classes[0])[(typeof cname === "number" && cname < 0) ? ρσ_expr_temp.length + cname : cname] = (function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["static"] = obj.static;
                        ρσ_d["bound"] = obj.bound;
                        ρσ_d["classvars"] = obj.classvars;
                        return ρσ_d;
                    }).call(this);
                }
            }
            return create_parser_ctx(S, import_dirs, module_id, baselib_items, imported_module_ids, imported_modules, importing_modules, options)();
        };
        Object.defineProperties(parse, {
            __argnames__ : {value: ["text", "options"]}
        });

        ρσ_modules.parse.COMPILER_VERSION = COMPILER_VERSION;
        ρσ_modules.parse.PYTHON_FLAGS = PYTHON_FLAGS;
        ρσ_modules.parse.NATIVE_CLASSES = NATIVE_CLASSES;
        ρσ_modules.parse.ERROR_CLASSES = ERROR_CLASSES;
        ρσ_modules.parse.COMMON_STATIC = COMMON_STATIC;
        ρσ_modules.parse.FORBIDDEN_CLASS_VARS = FORBIDDEN_CLASS_VARS;
        ρσ_modules.parse.UNARY_PREFIX = UNARY_PREFIX;
        ρσ_modules.parse.ASSIGNMENT = ASSIGNMENT;
        ρσ_modules.parse.PRECEDENCE = PRECEDENCE;
        ρσ_modules.parse.STATEMENTS_WITH_LABELS = STATEMENTS_WITH_LABELS;
        ρσ_modules.parse.ATOMIC_START_TOKEN = ATOMIC_START_TOKEN;
        ρσ_modules.parse.compile_time_decorators = compile_time_decorators;
        ρσ_modules.parse.has_simple_decorator = has_simple_decorator;
        ρσ_modules.parse.has_setter_decorator = has_setter_decorator;
        ρσ_modules.parse.create_parser_ctx = create_parser_ctx;
        ρσ_modules.parse.parse = parse;
    })();

    (function(){
        var __name__ = "output";

    })();

    (function(){
        var __name__ = "output.stream";
        var DANGEROUS, require_semi_colon_chars;
        var make_predicate = ρσ_modules.utils.make_predicate;
        var defaults = ρσ_modules.utils.defaults;
        var repeat_string = ρσ_modules.utils.repeat_string;

        var is_identifier_char = ρσ_modules.tokenizer.is_identifier_char;

        DANGEROUS = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        function to_ascii(str_, identifier) {
            return str_.replace(/[\u0080-\uffff]/g, (function() {
                var ρσ_anonfunc = function (ch) {
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
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["ch"]}
                });
                return ρσ_anonfunc;
            })());
        };
        Object.defineProperties(to_ascii, {
            __argnames__ : {value: ["str_", "identifier"]}
        });

        function encode_string(str_) {
            return JSON.stringify(str_).replace(DANGEROUS, (function() {
                var ρσ_anonfunc = function (a) {
                    return "\\u" + a.charCodeAt(0).toString(16);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["a"]}
                });
                return ρσ_anonfunc;
            })());
        };
        Object.defineProperties(encode_string, {
            __argnames__ : {value: ["str_"]}
        });

        require_semi_colon_chars = make_predicate("( [ + * / - , .");
        function OutputStream() {
            if (this.ρσ_object_id === undefined) Object.defineProperty(this, "ρσ_object_id", {"value":++ρσ_object_counter});
            OutputStream.prototype.__init__.apply(this, arguments);
        }
        OutputStream.prototype.__init__ = function __init__(options) {
            var self = this;
            self.options = defaults(options, (function(){
                var ρσ_d = Object.create(null);
                ρσ_d["indent_start"] = 0;
                ρσ_d["indent_level"] = 4;
                ρσ_d["quote_keys"] = false;
                ρσ_d["space_colon"] = true;
                ρσ_d["ascii_only"] = false;
                ρσ_d["width"] = 80;
                ρσ_d["max_line_len"] = 32e3;
                ρσ_d["ie_proof"] = true;
                ρσ_d["beautify"] = false;
                ρσ_d["source_map"] = null;
                ρσ_d["bracketize"] = false;
                ρσ_d["semicolons"] = true;
                ρσ_d["comments"] = false;
                ρσ_d["preserve_line"] = false;
                ρσ_d["omit_baselib"] = false;
                ρσ_d["baselib_plain"] = null;
                ρσ_d["private_scope"] = true;
                ρσ_d["keep_docstrings"] = false;
                ρσ_d["discard_asserts"] = false;
                ρσ_d["module_cache_dir"] = "";
                ρσ_d["js_version"] = 5;
                ρσ_d["write_name"] = true;
                return ρσ_d;
            }).call(this), true);
            self._indentation = 0;
            self.current_col = 0;
            self.current_line = 1;
            self.current_pos = 0;
            self.OUTPUT = "";
            self.IMPORTED = Object.create(null);
            self.might_need_space = false;
            self.might_need_semicolon = false;
            self._last = null;
            self._stack = ρσ_list_decorate([]);
            self.index_counter = 0;
            self.with_counter = 0;
        };
        Object.defineProperties(OutputStream.prototype.__init__, {
            __argnames__ : {value: ["options"]}
        });
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
        Object.defineProperties(OutputStream.prototype.make_name, {
            __argnames__ : {value: ["name"]}
        });
        OutputStream.prototype.print_name = function print_name(name) {
            var self = this;
            self.print(self.make_name(name));
        };
        Object.defineProperties(OutputStream.prototype.print_name, {
            __argnames__ : {value: ["name"]}
        });
        OutputStream.prototype.make_indent = function make_indent(back) {
            var self = this;
            return repeat_string(" ", self.options.indent_start + self._indentation - back * self.options.indent_level);
        };
        Object.defineProperties(OutputStream.prototype.make_indent, {
            __argnames__ : {value: ["back"]}
        });
        OutputStream.prototype.last_char = function last_char() {
            var self = this;
            return self._last.charAt(self._last.length - 1);
        };
        Object.defineProperties(OutputStream.prototype.last_char, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.maybe_newline = function maybe_newline() {
            var self = this;
            if (self.options.max_line_len && self.current_col > self.options.max_line_len) {
                self.print("\n");
            }
        };
        Object.defineProperties(OutputStream.prototype.maybe_newline, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.print = function print(str_) {
            var self = this;
            var ch, target_line, prev, a, n;
            str_ = String(str_);
            ch = str_.charAt(0);
            if (self.might_need_semicolon) {
                if ((!ch || ";}".indexOf(ch) < 0) && !/[;]$/.test(self._last)) {
                    if (self.options.semicolons || require_semi_colon_chars[(typeof ch === "number" && ch < 0) ? require_semi_colon_chars.length + ch : ch]) {
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
            if (!self.options.beautify && self.options.preserve_line && (ρσ_expr_temp = self._stack)[ρσ_bound_index(self._stack.length - 1, ρσ_expr_temp)]) {
                target_line = (ρσ_expr_temp = self._stack)[ρσ_bound_index(self._stack.length - 1, ρσ_expr_temp)].start.line;
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
                self.current_col += a[(typeof n === "number" && n < 0) ? a.length + n : n].length;
            } else {
                self.current_col = a[(typeof n === "number" && n < 0) ? a.length + n : n].length;
            }
            self.current_pos += str_.length;
            self._last = str_;
            self.OUTPUT += str_;
        };
        Object.defineProperties(OutputStream.prototype.print, {
            __argnames__ : {value: ["str_"]}
        });
        OutputStream.prototype.space = function space() {
            var self = this;
            if (self.options.beautify) {
                self.print(" ");
            } else {
                self.might_need_space = true;
            }
        };
        Object.defineProperties(OutputStream.prototype.space, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.indent = function indent(half) {
            var self = this;
            if (self.options.beautify) {
                self.print(self.make_indent((half) ? .5 : 0));
            }
        };
        Object.defineProperties(OutputStream.prototype.indent, {
            __argnames__ : {value: ["half"]}
        });
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
        Object.defineProperties(OutputStream.prototype.with_indent, {
            __argnames__ : {value: ["col", "proceed"]}
        });
        OutputStream.prototype.indentation = function indentation() {
            var self = this;
            return self._indentation;
        };
        Object.defineProperties(OutputStream.prototype.indentation, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.set_indentation = function set_indentation(val) {
            var self = this;
            if (self.options.beautify) {
                self._indentation = val;
            }
        };
        Object.defineProperties(OutputStream.prototype.set_indentation, {
            __argnames__ : {value: ["val"]}
        });
        OutputStream.prototype.newline = function newline() {
            var self = this;
            if (self.options.beautify) {
                self.print("\n");
            }
        };
        Object.defineProperties(OutputStream.prototype.newline, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.semicolon = function semicolon() {
            var self = this;
            if (self.options.beautify) {
                self.print(";");
            } else {
                self.might_need_semicolon = true;
            }
        };
        Object.defineProperties(OutputStream.prototype.semicolon, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.force_semicolon = function force_semicolon() {
            var self = this;
            self.might_need_semicolon = false;
            self.print(";");
        };
        Object.defineProperties(OutputStream.prototype.force_semicolon, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.next_indent = function next_indent() {
            var self = this;
            return self._indentation + self.options.indent_level;
        };
        Object.defineProperties(OutputStream.prototype.next_indent, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.spaced = function spaced() {
            var self = this;
            for (var i=0; i < arguments.length; i++) {
                if (i > 0) {
                    self.space();
                }
                if (typeof arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i].print === "function") {
                    arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i].print(self);
                } else {
                    self.print(arguments[(typeof i === "number" && i < 0) ? arguments.length + i : i]);
                }
            }
        };
        Object.defineProperties(OutputStream.prototype.spaced, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.end_statement = function end_statement() {
            var self = this;
            self.semicolon();
            self.newline();
        };
        Object.defineProperties(OutputStream.prototype.end_statement, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.with_block = function with_block(cont) {
            var self = this;
            var ret;
            ret = null;
            self.print("{");
            self.newline();
            self.with_indent(self.next_indent(), function () {
                ret = cont();
            });
            self.indent();
            self.print("}");
            return ret;
        };
        Object.defineProperties(OutputStream.prototype.with_block, {
            __argnames__ : {value: ["cont"]}
        });
        OutputStream.prototype.with_parens = function with_parens(cont) {
            var self = this;
            var ret;
            self.print("(");
            ret = cont();
            self.print(")");
            return ret;
        };
        Object.defineProperties(OutputStream.prototype.with_parens, {
            __argnames__ : {value: ["cont"]}
        });
        OutputStream.prototype.with_square = function with_square(cont) {
            var self = this;
            var ret;
            self.print("[");
            ret = cont();
            self.print("]");
            return ret;
        };
        Object.defineProperties(OutputStream.prototype.with_square, {
            __argnames__ : {value: ["cont"]}
        });
        OutputStream.prototype.comma = function comma() {
            var self = this;
            self.print(",");
            self.space();
        };
        Object.defineProperties(OutputStream.prototype.comma, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.colon = function colon() {
            var self = this;
            self.print(":");
            if (self.options.space_colon) {
                self.space();
            }
        };
        Object.defineProperties(OutputStream.prototype.colon, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.dump_yield = function dump_yield() {
            var self = this;
            var code, ci;
            self.indent();
            self.spaced("var", "ρσ_regenerator", "=", "{}");
            self.end_statement();
            code = regenerate(false, self.options.beautify);
            if (self.options.beautify) {
                code = code.replace(/\/\/.*$/gm, "\n").replace(/^\s*$/gm, "");
                ci = self.make_indent(0);
                code = (function() {
                    var ρσ_Iter = ρσ_Iterable(code.split("\n")), ρσ_Result = [], x;
                    for (var ρσ_Index = 0; ρσ_Index < ρσ_Iter.length; ρσ_Index++) {
                        x = ρσ_Iter[ρσ_Index];
                        ρσ_Result.push(ci + x);
                    }
                    ρσ_Result = ρσ_list_constructor(ρσ_Result);
                    return ρσ_Result;
                })().join("\n");
            }
            self.print(code + "(ρσ_regenerator)");
            self.end_statement();
        };
        Object.defineProperties(OutputStream.prototype.dump_yield, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.get = function get() {
            var self = this;
            return self.OUTPUT;
        };
        Object.defineProperties(OutputStream.prototype.get, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.toString = function toString() {
            var self = this;
            return self.OUTPUT;
        };
        Object.defineProperties(OutputStream.prototype.toString, {
            __argnames__ : {value: []}
        });
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
        Object.defineProperties(OutputStream.prototype.assign, {
            __argnames__ : {value: ["name"]}
        });
        OutputStream.prototype.current_width = function current_width() {
            var self = this;
            return self.current_col - self._indentation;
        };
        Object.defineProperties(OutputStream.prototype.current_width, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.should_break = function should_break() {
            var self = this;
            return self.options.width && self.current_width() >= self.options.width;
        };
        Object.defineProperties(OutputStream.prototype.should_break, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.last = function last() {
            var self = this;
            return self._last;
        };
        Object.defineProperties(OutputStream.prototype.last, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.print_string = function print_string(str_) {
            var self = this;
            self.print(encode_string(str_));
        };
        Object.defineProperties(OutputStream.prototype.print_string, {
            __argnames__ : {value: ["str_"]}
        });
        OutputStream.prototype.import_ = function import_(module) {
            var self = this;
            if (!Object.prototype.hasOwnProperty.call(self.IMPORTED, module.key)) {
                (ρσ_expr_temp = self.IMPORTED)[ρσ_bound_index(module.key, ρσ_expr_temp)] = module;
            }
        };
        Object.defineProperties(OutputStream.prototype.import_, {
            __argnames__ : {value: ["module"]}
        });
        OutputStream.prototype.is_main = function is_main() {
            var self = this;
            return self.OUTPUT.length === 0;
        };
        Object.defineProperties(OutputStream.prototype.is_main, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.option = function option(opt) {
            var self = this;
            return (ρσ_expr_temp = self.options)[(typeof opt === "number" && opt < 0) ? ρσ_expr_temp.length + opt : opt];
        };
        Object.defineProperties(OutputStream.prototype.option, {
            __argnames__ : {value: ["opt"]}
        });
        OutputStream.prototype.line = function line() {
            var self = this;
            return self.current_line;
        };
        Object.defineProperties(OutputStream.prototype.line, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.col = function col() {
            var self = this;
            return self.current_col;
        };
        Object.defineProperties(OutputStream.prototype.col, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.pos = function pos() {
            var self = this;
            return self.current_pos;
        };
        Object.defineProperties(OutputStream.prototype.pos, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.push_node = function push_node(node) {
            var self = this;
            self._stack.push(node);
        };
        Object.defineProperties(OutputStream.prototype.push_node, {
            __argnames__ : {value: ["node"]}
        });
        OutputStream.prototype.pop_node = function pop_node() {
            var self = this;
            return self._stack.pop();
        };
        Object.defineProperties(OutputStream.prototype.pop_node, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.stack = function stack() {
            var self = this;
            return self._stack;
        };
        Object.defineProperties(OutputStream.prototype.stack, {
            __argnames__ : {value: []}
        });
        OutputStream.prototype.parent = function parent(n) {
            var self = this;
            return (ρσ_expr_temp = self._stack)[ρσ_bound_index(self._stack.length - 2 - (n || 0), ρσ_expr_temp)];
        };
        Object.defineProperties(OutputStream.prototype.parent, {
            __argnames__ : {value: ["n"]}
        });
        OutputStream.prototype.__repr__ = function __repr__ () {
                        return "<" + __name__ + "." + this.constructor.name + " #" + this.ρσ_object_id + ">";
        };
        OutputStream.prototype.__str__ = function __str__ () {
            return this.__repr__();
        };
        Object.defineProperty(OutputStream.prototype, "__bases__", {value: []});

        ρσ_modules["output.stream"].DANGEROUS = DANGEROUS;
        ρσ_modules["output.stream"].require_semi_colon_chars = require_semi_colon_chars;
        ρσ_modules["output.stream"].to_ascii = to_ascii;
        ρσ_modules["output.stream"].encode_string = encode_string;
        ρσ_modules["output.stream"].OutputStream = OutputStream;
    })();

    (function(){
        var __name__ = "output.statements";
        var AST_Definitions = ρσ_modules.ast.AST_Definitions;
        var AST_Scope = ρσ_modules.ast.AST_Scope;
        var AST_Method = ρσ_modules.ast.AST_Method;
        var AST_Except = ρσ_modules.ast.AST_Except;
        var AST_EmptyStatement = ρσ_modules.ast.AST_EmptyStatement;
        var AST_Statement = ρσ_modules.ast.AST_Statement;
        var AST_Seq = ρσ_modules.ast.AST_Seq;
        var AST_BaseCall = ρσ_modules.ast.AST_BaseCall;
        var AST_Dot = ρσ_modules.ast.AST_Dot;
        var AST_Sub = ρσ_modules.ast.AST_Sub;
        var AST_ItemAccess = ρσ_modules.ast.AST_ItemAccess;
        var AST_Conditional = ρσ_modules.ast.AST_Conditional;
        var AST_Binary = ρσ_modules.ast.AST_Binary;
        var AST_BlockStatement = ρσ_modules.ast.AST_BlockStatement;
        var is_node_type = ρσ_modules.ast.is_node_type;

        function force_statement(stat, output) {
            if (output.option("bracketize")) {
                if (!stat || is_node_type(stat, AST_EmptyStatement)) {
                    output.print("{}");
                } else if (is_node_type(stat, AST_BlockStatement)) {
                    stat.print(output);
                } else {
                    output.with_block(function () {
                        output.indent();
                        stat.print(output);
                        output.newline();
                    });
                }
            } else {
                if (!stat || is_node_type(stat, AST_EmptyStatement)) {
                    output.force_semicolon();
                } else {
                    stat.print(output);
                }
            }
        };
        Object.defineProperties(force_statement, {
            __argnames__ : {value: ["stat", "output"]}
        });

        function first_in_statement(output) {
            var a, i, node, p;
            a = output.stack();
            i = a.length;
            node = a[ρσ_bound_index(i -= 1, a)];
            p = a[ρσ_bound_index(i -= 1, a)];
            while (i > 0) {
                if (is_node_type(p, AST_Statement) && p.body === node) {
                    return true;
                }
                if (is_node_type(p, AST_Seq) && p.car === node || is_node_type(p, AST_BaseCall) && p.expression === node || is_node_type(p, AST_Dot) && p.expression === node || is_node_type(p, AST_Sub) && p.expression === node || is_node_type(p, AST_ItemAccess) && p.expression === node || is_node_type(p, AST_Conditional) && p.condition === node || is_node_type(p, AST_Binary) && p.left === node) {
                    node = p;
                    p = a[ρσ_bound_index(i -= 1, a)];
                } else {
                    return false;
                }
            }
        };
        Object.defineProperties(first_in_statement, {
            __argnames__ : {value: ["output"]}
        });

        function declare_vars(vars, output) {
            var ρσ_unpack, i, arg;
            if (vars.length) {
                output.indent();
                output.print("var");
                output.space();
                var ρσ_Iter73 = ρσ_Iterable(enumerate(vars));
                for (var ρσ_Index73 = 0; ρσ_Index73 < ρσ_Iter73.length; ρσ_Index73++) {
                    ρσ_unpack = ρσ_Iter73[ρσ_Index73];
                    i = ρσ_unpack[0];
                    arg = ρσ_unpack[1];
                    if (i) {
                        output.comma();
                    }
                    arg.print(output);
                }
                output.semicolon();
                output.newline();
            }
        };
        Object.defineProperties(declare_vars, {
            __argnames__ : {value: ["vars", "output"]}
        });

        function display_body(body, is_toplevel, output) {
            var last, ρσ_unpack, i, stmt;
            last = body.length - 1;
            var ρσ_Iter74 = ρσ_Iterable(enumerate(body));
            for (var ρσ_Index74 = 0; ρσ_Index74 < ρσ_Iter74.length; ρσ_Index74++) {
                ρσ_unpack = ρσ_Iter74[ρσ_Index74];
                i = ρσ_unpack[0];
                stmt = ρσ_unpack[1];
                if (!is_node_type(stmt, AST_EmptyStatement) && !is_node_type(stmt, AST_Definitions)) {
                    output.indent();
                    stmt.print(output);
                    if (!(i === last && is_toplevel)) {
                        output.newline();
                    }
                }
            }
        };
        Object.defineProperties(display_body, {
            __argnames__ : {value: ["body", "is_toplevel", "output"]}
        });

        function display_complex_body(node, is_toplevel, output, function_preamble) {
            var offset;
            offset = 0;
            if (is_node_type(node, AST_Method) && !node.static) {
                output.indent();
                output.print("var");
                output.space();
                output.assign(node.argnames[0]);
                output.print("this");
                output.semicolon();
                output.newline();
                offset += 1;
            }
            if (is_node_type(node, AST_Scope)) {
                function_preamble(node, output, offset);
                declare_vars(node.localvars, output);
            } else if (is_node_type(node, AST_Except)) {
                if (node.argname) {
                    output.indent();
                    output.print("var");
                    output.space();
                    output.assign(node.argname);
                    output.print("ρσ_Exception");
                    output.semicolon();
                    output.newline();
                }
            }
            display_body(node.body, is_toplevel, output);
        };
        Object.defineProperties(display_complex_body, {
            __argnames__ : {value: ["node", "is_toplevel", "output", "function_preamble"]}
        });

        function print_bracketed(node, output, complex, function_preamble) {
            if (node.body.length > 0) {
                output.with_block(function () {
                    if (complex) {
                        display_complex_body(node, false, output, function_preamble);
                    } else {
                        display_body(node.body, false, output, function_preamble);
                    }
                });
            } else {
                output.print("{}");
            }
        };
        Object.defineProperties(print_bracketed, {
            __argnames__ : {value: ["node", "output", "complex", "function_preamble"]}
        });

        function print_with(self, output) {
            var exits, clause_name, clause;
            exits = [];
            [output.assign("ρσ_with_exception"), output.print("undefined"), output.end_statement()];
            var ρσ_Iter75 = ρσ_Iterable(self.clauses);
            for (var ρσ_Index75 = 0; ρσ_Index75 < ρσ_Iter75.length; ρσ_Index75++) {
                clause = ρσ_Iter75[ρσ_Index75];
                output.with_counter += 1;
                clause_name = "ρσ_with_clause_" + output.with_counter;
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
            output.with_block(function () {
                output.indent();
                self._do_print_body(output);
                output.newline();
            });
            [output.space(), output.print("catch(e)")];
            output.with_block(function () {
                [output.indent(), output.assign("ρσ_with_exception"), output.print("e"), output.end_statement()];
            });
            [output.newline(), output.indent(), output.spaced("if", "(ρσ_with_exception", "===", "undefined)")];
            output.with_block(function () {
                var clause;
                var ρσ_Iter76 = ρσ_Iterable(exits);
                for (var ρσ_Index76 = 0; ρσ_Index76 < ρσ_Iter76.length; ρσ_Index76++) {
                    clause = ρσ_Iter76[ρσ_Index76];
                    [output.indent(), output.print(clause + ".__exit__()"), output.end_statement()];
                }
            });
            [output.space(), output.print("else"), output.space()];
            output.with_block(function () {
                var clause;
                [output.indent(), output.assign("ρσ_with_suppress"), output.print("false"), output.end_statement()];
                var ρσ_Iter77 = ρσ_Iterable(exits);
                for (var ρσ_Index77 = 0; ρσ_Index77 < ρσ_Iter77.length; ρσ_Index77++) {
                    clause = ρσ_Iter77[ρσ_Index77];
                    output.indent();
                    output.spaced("ρσ_with_suppress", "|=", "ρσ_bool(" + clause + ".__exit__(ρσ_with_exception.constructor,", "ρσ_with_exception,", "ρσ_with_exception.stack))");
                    output.end_statement();
                }
                [output.indent(), output.spaced("if", "(!ρσ_with_suppress)", "throw ρσ_with_exception"), 
                output.end_statement()];
            });
        };
        Object.defineProperties(print_with, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_assert(self, output) {
            if (output.options.discard_asserts) {
                return;
            }
            [output.spaced("if", "(!"), self.condition.print(output), output.spaced(")", "throw new AssertionError")];
            if (self.message) {
                output.print("(");
                self.message.print(output);
                output.print(")");
            }
            output.end_statement();
        };
        Object.defineProperties(print_assert, {
            __argnames__ : {value: ["self", "output"]}
        });

        ρσ_modules["output.statements"].force_statement = force_statement;
        ρσ_modules["output.statements"].first_in_statement = first_in_statement;
        ρσ_modules["output.statements"].declare_vars = declare_vars;
        ρσ_modules["output.statements"].display_body = display_body;
        ρσ_modules["output.statements"].display_complex_body = display_complex_body;
        ρσ_modules["output.statements"].print_bracketed = print_bracketed;
        ρσ_modules["output.statements"].print_with = print_with;
        ρσ_modules["output.statements"].print_assert = print_assert;
    })();

    (function(){
        var __name__ = "output.exceptions";
        var print_bracketed = ρσ_modules["output.statements"].print_bracketed;

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
        Object.defineProperties(print_try, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_catch(self, output) {
            output.print("catch");
            output.space();
            output.with_parens(function () {
                output.print("ρσ_Exception");
            });
            output.space();
            output.with_block(function () {
                var no_default, ρσ_unpack, i, exception;
                output.indent();
                [output.spaced("ρσ_last_exception", "=", "ρσ_Exception"), output.end_statement()];
                output.indent();
                no_default = true;
                var ρσ_Iter78 = ρσ_Iterable(enumerate(self.body));
                for (var ρσ_Index78 = 0; ρσ_Index78 < ρσ_Iter78.length; ρσ_Index78++) {
                    ρσ_unpack = ρσ_Iter78[ρσ_Index78];
                    i = ρσ_unpack[0];
                    exception = ρσ_unpack[1];
                    if (i) {
                        output.print("else ");
                    }
                    if (exception.errors.length) {
                        output.print("if");
                        output.space();
                        output.with_parens(function () {
                            var ρσ_unpack, i, err;
                            var ρσ_Iter79 = ρσ_Iterable(enumerate(exception.errors));
                            for (var ρσ_Index79 = 0; ρσ_Index79 < ρσ_Iter79.length; ρσ_Index79++) {
                                ρσ_unpack = ρσ_Iter79[ρσ_Index79];
                                i = ρσ_unpack[0];
                                err = ρσ_unpack[1];
                                if (i) {
                                    output.newline();
                                    output.indent();
                                    output.print("||");
                                    output.space();
                                }
                                output.print("ρσ_Exception");
                                output.space();
                                output.print("instanceof");
                                output.space();
                                if (err.name === "Exception") {
                                    output.print("Error");
                                } else {
                                    err.print(output);
                                }
                            }
                        });
                        output.space();
                    } else {
                        no_default = false;
                    }
                    print_bracketed(exception, output, true);
                    output.space();
                }
                if (no_default) {
                    output.print("else");
                    output.space();
                    output.with_block(function () {
                        output.indent();
                        output.print("throw");
                        output.space();
                        output.print("ρσ_Exception");
                        output.semicolon();
                        output.newline();
                    });
                }
                output.newline();
            });
        };
        Object.defineProperties(print_catch, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_finally(self, output) {
            output.print("finally");
            output.space();
            print_bracketed(self, output);
        };
        Object.defineProperties(print_finally, {
            __argnames__ : {value: ["self", "output"]}
        });

        ρσ_modules["output.exceptions"].print_try = print_try;
        ρσ_modules["output.exceptions"].print_catch = print_catch;
        ρσ_modules["output.exceptions"].print_finally = print_finally;
    })();

    (function(){
        var __name__ = "output.utils";
        var AST_BlockStatement = ρσ_modules.ast.AST_BlockStatement;
        var is_node_type = ρσ_modules.ast.is_node_type;

        function best_of(a) {
            var best, len_, i;
            best = a[0];
            len_ = best.length;
            for (var ρσ_Index80 = 1; ρσ_Index80 < a.length; ρσ_Index80++) {
                i = ρσ_Index80;
                if (a[(typeof i === "number" && i < 0) ? a.length + i : i].length < len_) {
                    best = a[(typeof i === "number" && i < 0) ? a.length + i : i];
                    len_ = best.length;
                }
            }
            return best;
        };
        Object.defineProperties(best_of, {
            __argnames__ : {value: ["a"]}
        });

        function make_num(num) {
            var str_, a, m;
            str_ = num.toString(10);
            a = ρσ_list_decorate([ str_.replace(/^0\./, ".").replace("e+", "e") ]);
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
        Object.defineProperties(make_num, {
            __argnames__ : {value: ["num"]}
        });

        function make_block(stmt, output) {
            if (is_node_type(stmt, AST_BlockStatement)) {
                stmt.print(output);
                return;
            }
            output.with_block(function () {
                output.indent();
                stmt.print(output);
                output.newline();
            });
        };
        Object.defineProperties(make_block, {
            __argnames__ : {value: ["stmt", "output"]}
        });

        function create_doctring(docstrings) {
            var ans, ds, lines, min_leading_whitespace, r, leading_whitespace, line, lw, ρσ_unpack, l;
            ans = [];
            var ρσ_Iter81 = ρσ_Iterable(docstrings);
            for (var ρσ_Index81 = 0; ρσ_Index81 < ρσ_Iter81.length; ρσ_Index81++) {
                ds = ρσ_Iter81[ρσ_Index81];
                ds = str.rstrip(ds.value);
                lines = [];
                min_leading_whitespace = "";
                var ρσ_Iter82 = ρσ_Iterable(ds.split(/$/gm));
                for (var ρσ_Index82 = 0; ρσ_Index82 < ρσ_Iter82.length; ρσ_Index82++) {
                    line = ρσ_Iter82[ρσ_Index82];
                    r = /^\s+/.exec(line);
                    leading_whitespace = "";
                    if (r) {
                        leading_whitespace = (r) ? r[0].replace(/[\n\r]/g, "") : "";
                        line = line.slice(r[0].length);
                    }
                    if (!str.strip(line)) {
                        lines.push(["", ""]);
                    } else {
                        leading_whitespace = leading_whitespace.replace(/\t/g, "    ");
                        if (leading_whitespace && (!min_leading_whitespace || leading_whitespace.length < min_leading_whitespace.length)) {
                            min_leading_whitespace = leading_whitespace;
                        }
                        lines.push([leading_whitespace, line]);
                    }
                }
                var ρσ_Iter83 = ρσ_Iterable(lines);
                for (var ρσ_Index83 = 0; ρσ_Index83 < ρσ_Iter83.length; ρσ_Index83++) {
                    ρσ_unpack = ρσ_Iter83[ρσ_Index83];
                    lw = ρσ_unpack[0];
                    l = ρσ_unpack[1];
                    if (min_leading_whitespace) {
                        lw = lw.slice(min_leading_whitespace.length);
                    }
                    ans.push(lw + l);
                }
                ans.push("");
            }
            return str.rstrip(ans.join("\n"));
        };
        Object.defineProperties(create_doctring, {
            __argnames__ : {value: ["docstrings"]}
        });

        ρσ_modules["output.utils"].best_of = best_of;
        ρσ_modules["output.utils"].make_num = make_num;
        ρσ_modules["output.utils"].make_block = make_block;
        ρσ_modules["output.utils"].create_doctring = create_doctring;
    })();

    (function(){
        var __name__ = "output.loops";
        var AST_BaseCall = ρσ_modules.ast.AST_BaseCall;
        var AST_SymbolRef = ρσ_modules.ast.AST_SymbolRef;
        var AST_Array = ρσ_modules.ast.AST_Array;
        var AST_Unary = ρσ_modules.ast.AST_Unary;
        var AST_Number = ρσ_modules.ast.AST_Number;
        var has_calls = ρσ_modules.ast.has_calls;
        var AST_Seq = ρσ_modules.ast.AST_Seq;
        var AST_ListComprehension = ρσ_modules.ast.AST_ListComprehension;
        var is_node_type = ρσ_modules.ast.is_node_type;

        var OutputStream = ρσ_modules["output.stream"].OutputStream;

        function unpack_tuple(elems, output, in_statement) {
            var ρσ_unpack, i, elem;
            var ρσ_Iter84 = ρσ_Iterable(enumerate(elems));
            for (var ρσ_Index84 = 0; ρσ_Index84 < ρσ_Iter84.length; ρσ_Index84++) {
                ρσ_unpack = ρσ_Iter84[ρσ_Index84];
                i = ρσ_unpack[0];
                elem = ρσ_unpack[1];
                output.indent();
                output.assign(elem);
                output.print("ρσ_unpack");
                output.with_square(function () {
                    output.print(i);
                });
                if (!in_statement || i < elems.length - 1) {
                    output.semicolon();
                    output.newline();
                }
            }
        };
        Object.defineProperties(unpack_tuple, {
            __argnames__ : {value: ["elems", "output", "in_statement"]}
        });

        function print_do_loop(self, output) {
            output.print("do");
            output.space();
            self._do_print_body(output);
            output.space();
            output.print("while");
            output.space();
            output.with_parens(function () {
                self.condition.print(output);
            });
            output.semicolon();
        };
        Object.defineProperties(print_do_loop, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_while_loop(self, output) {
            output.print("while");
            output.space();
            output.with_parens(function () {
                self.condition.print(output);
            });
            output.space();
            self._do_print_body(output);
        };
        Object.defineProperties(print_while_loop, {
            __argnames__ : {value: ["self", "output"]}
        });

        function is_simple_for_in(self) {
            if (is_node_type(self.object, AST_BaseCall) && is_node_type(self.object.expression, AST_SymbolRef) && self.object.expression.name === "dir" && self.object.args.length === 1) {
                return true;
            }
            return false;
        };
        Object.defineProperties(is_simple_for_in, {
            __argnames__ : {value: ["self"]}
        });

        function is_simple_for(self) {
            var a, l;
            if (is_node_type(self.object, AST_BaseCall) && is_node_type(self.object.expression, AST_SymbolRef) && self.object.expression.name === "range" && !is_node_type(self.init, AST_Array)) {
                a = self.object.args;
                l = a.length;
                if (l < 3 || is_node_type(a[2], AST_Number) || is_node_type(a[2], AST_Unary) && a[2].operator === "-" && is_node_type(a[2].expression, AST_Number)) {
                    if (l === 1 && !has_calls(a[0]) || l > 1 && !has_calls(a[1])) {
                        return true;
                    }
                }
            }
            return false;
        };
        Object.defineProperties(is_simple_for, {
            __argnames__ : {value: ["self"]}
        });

        function print_for_loop_body(output) {
            var self;
            self = this;
            output.with_block(function () {
                var itervar, flat, stmt;
                if (!(self.simple_for_index || is_simple_for_in(self))) {
                    output.indent();
                    if (output.option("js_version") === 5) {
                        itervar = "ρσ_Iter" + output.index_counter + "[ρσ_Index" + output.index_counter + "]";
                    } else {
                        itervar = "ρσ_Index" + output.index_counter;
                    }
                    if (is_node_type(self.init, AST_Array)) {
                        flat = self.init.flatten();
                        output.assign("ρσ_unpack");
                        if (flat.length > self.init.elements.length) {
                            output.print("ρσ_flatten(" + itervar + ")");
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
                var ρσ_Iter85 = ρσ_Iterable(self.body.body);
                for (var ρσ_Index85 = 0; ρσ_Index85 < ρσ_Iter85.length; ρσ_Index85++) {
                    stmt = ρσ_Iter85[ρσ_Index85];
                    output.indent();
                    stmt.print(output);
                    output.newline();
                }
            });
        };
        Object.defineProperties(print_for_loop_body, {
            __argnames__ : {value: ["output"]}
        });

        function init_es6_itervar(output, itervar) {
            output.indent();
            output.spaced(itervar, "=", "((typeof", itervar + "[Symbol.iterator]", "===", "\"function\")", "?", "(" + itervar, "instanceof", "Map", "?", itervar + ".keys()", ":", itervar + ")", ":", "Object.keys(" + itervar + "))");
            output.end_statement();
        };
        Object.defineProperties(init_es6_itervar, {
            __argnames__ : {value: ["output", "itervar"]}
        });

        function print_for_in(self, output) {
            var increment, args, tmp_, start, end, idx, itervar;
            function write_object() {
                if (self.object.constructor === AST_Seq) {
                    new AST_Array((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["elements"] = self.object.to_array();
                        return ρσ_d;
                    }).call(this)).print(output);
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
                self.simple_for_index = idx = "ρσ_Index" + output.index_counter;
                output.index_counter += 1;
                output.print("for");
                output.space();
                output.with_parens(function () {
                    [output.spaced("var", idx, "="), output.space()];
                    (start.print) ? start.print(output) : output.print(start);
                    output.semicolon();
                    output.space();
                    output.print(idx);
                    output.space();
                    (is_node_type(increment, AST_Unary)) ? output.print(">") : output.print("<");
                    output.space();
                    end.print(output);
                    output.semicolon();
                    output.space();
                    output.print(idx);
                    if (increment && (!is_node_type(increment, AST_Unary) || increment.expression.value !== "1")) {
                        if (is_node_type(increment, AST_Unary)) {
                            output.print("-=");
                            increment.expression.print(output);
                        } else {
                            output.print("+=");
                            increment.print(output);
                        }
                    } else {
                        if (is_node_type(increment, AST_Unary)) {
                            output.print("--");
                        } else {
                            output.print("++");
                        }
                    }
                });
            } else if (is_simple_for_in(self)) {
                output.print("for");
                output.space();
                output.with_parens(function () {
                    self.init.print(output);
                    output.space();
                    output.print("in");
                    output.space();
                    self.object.args[0].print(output);
                });
            } else {
                if (output.options.js_version === 5) {
                    output.assign("var ρσ_Iter" + output.index_counter);
                    output.print("ρσ_Iterable");
                    output.with_parens(write_object);
                    output.semicolon();
                    output.newline();
                    output.indent();
                    output.print("for");
                    output.space();
                    output.with_parens(function () {
                        output.print("var");
                        output.space();
                        output.assign("ρσ_Index" + output.index_counter);
                        output.print("0");
                        output.semicolon();
                        output.space();
                        output.print("ρσ_Index" + output.index_counter);
                        output.space();
                        output.print("<");
                        output.space();
                        output.print("ρσ_Iter" + output.index_counter + ".length");
                        output.semicolon();
                        output.space();
                        output.print("ρσ_Index" + output.index_counter + "++");
                    });
                } else {
                    itervar = "ρσ_Iter" + output.index_counter;
                    output.assign("var " + itervar);
                    write_object();
                    output.end_statement();
                    init_es6_itervar(output, itervar);
                    output.indent();
                    output.spaced("for", "(var", "ρσ_Index" + output.index_counter, "of", itervar + ")");
                }
            }
            output.space();
            self._do_print_body(output);
        };
        Object.defineProperties(print_for_in, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_list_comprehension(self, output) {
            var tname, result_obj, is_generator, es5, add_to_result, push_func;
            tname = self.constructor.name.slice(4);
            result_obj = (ρσ_expr_temp = (function(){
                var ρσ_d = Object.create(null);
                ρσ_d["ListComprehension"] = "[]";
                ρσ_d["DictComprehension"] = (self.is_jshash) ? "Object.create(null)" : "{}";
                ρσ_d["SetComprehension"] = "ρσ_set()";
                return ρσ_d;
            }).call(this))[(typeof tname === "number" && tname < 0) ? ρσ_expr_temp.length + tname : tname];
            is_generator = tname === "GeneratorComprehension";
            es5 = output.option("js_version") === 5;
            if (tname === "DictComprehension") {
                if (self.is_pydict) {
                    result_obj = "ρσ_dict()";
                    add_to_result = (function() {
                        var ρσ_anonfunc = function (output) {
                            output.indent();
                            output.print("ρσ_Result.set");
                            output.with_parens(function () {
                                self.statement.print(output);
                                [output.space(), output.print(","), output.space()];
                                output.with_parens(function () {
                                    if (self.value_statement.constructor === AST_Seq) {
                                        output.with_square(function () {
                                            self.value_statement.print(output);
                                        });
                                    } else {
                                        self.value_statement.print(output);
                                    }
                                });
                            });
                            output.end_statement();
                        };
                        Object.defineProperties(ρσ_anonfunc, {
                            __argnames__ : {value: ["output"]}
                        });
                        return ρσ_anonfunc;
                    })();
                } else {
                    add_to_result = (function() {
                        var ρσ_anonfunc = function (output) {
                            output.indent();
                            output.print("ρσ_Result");
                            output.with_square(function () {
                                self.statement.print(output);
                            });
                            [output.space(), output.print("="), output.space()];
                            output.with_parens(function () {
                                if (self.value_statement.constructor === AST_Seq) {
                                    output.with_square(function () {
                                        self.value_statement.print(output);
                                    });
                                } else {
                                    self.value_statement.print(output);
                                }
                            });
                            output.end_statement();
                        };
                        Object.defineProperties(ρσ_anonfunc, {
                            __argnames__ : {value: ["output"]}
                        });
                        return ρσ_anonfunc;
                    })();
                }
            } else {
                push_func = "ρσ_Result." + ((self.constructor === AST_ListComprehension) ? "push" : "add");
                if (is_generator) {
                    push_func = "yield ";
                }
                add_to_result = (function() {
                    var ρσ_anonfunc = function (output) {
                        output.indent();
                        output.print(push_func);
                        output.with_parens(function () {
                            if (self.statement.constructor === AST_Seq) {
                                output.with_square(function () {
                                    self.statement.print(output);
                                });
                            } else {
                                self.statement.print(output);
                            }
                        });
                        output.end_statement();
                    };
                    Object.defineProperties(ρσ_anonfunc, {
                        __argnames__ : {value: ["output"]}
                    });
                    return ρσ_anonfunc;
                })();
            }
            output.with_parens(function () {
                output.print("function");
                output.print("()");
                output.space();
                output.with_block(function () {
                    var body_out, previous_indentation, i, transpiled, ci;
                    body_out = output;
                    if (is_generator) {
                        if (es5) {
                            body_out = new OutputStream((function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["beautify"] = true;
                                return ρσ_d;
                            }).call(this));
                        }
                        body_out.indent();
                        [body_out.print("function* js_generator()"), body_out.space(), body_out.print("{")];
                        body_out.newline();
                        previous_indentation = output.indentation();
                        output.set_indentation(output.next_indent());
                    }
                    body_out.indent();
                    body_out.assign("var ρσ_Iter");
                    if (es5) {
                        body_out.print("ρσ_Iterable");
                        body_out.with_parens(function () {
                            self.object.print(body_out);
                        });
                    } else {
                        self.object.print(body_out);
                    }
                    if (result_obj) {
                        body_out.comma();
                        body_out.assign("ρσ_Result");
                        body_out.print(result_obj);
                    }
                    if (is_node_type(self.init, AST_Array)) {
                        var ρσ_Iter86 = ρσ_Iterable(self.init.elements);
                        for (var ρσ_Index86 = 0; ρσ_Index86 < ρσ_Iter86.length; ρσ_Index86++) {
                            i = ρσ_Iter86[ρσ_Index86];
                            body_out.comma();
                            i.print(body_out);
                        }
                    } else {
                        body_out.comma();
                        self.init.print(body_out);
                    }
                    body_out.end_statement();
                    if (!es5) {
                        init_es6_itervar(body_out, "ρσ_Iter");
                    }
                    body_out.indent();
                    body_out.print("for");
                    body_out.space();
                    body_out.with_parens(function () {
                        if (es5) {
                            body_out.print("var");
                            body_out.space();
                            body_out.assign("ρσ_Index");
                            body_out.print("0");
                            body_out.semicolon();
                            body_out.space();
                            body_out.print("ρσ_Index");
                            body_out.space();
                            body_out.print("<");
                            body_out.space();
                            body_out.print("ρσ_Iter.length");
                            body_out.semicolon();
                            body_out.space();
                            body_out.print("ρσ_Index++");
                        } else {
                            body_out.spaced("var", "ρσ_Index", "of", "ρσ_Iter");
                        }
                    });
                    body_out.space();
                    body_out.with_block(function () {
                        var itervar, flat;
                        body_out.indent();
                        itervar = (es5) ? "ρσ_Iter[ρσ_Index]" : "ρσ_Index";
                        if (is_node_type(self.init, AST_Array)) {
                            flat = self.init.flatten();
                            body_out.assign("ρσ_unpack");
                            if (flat.length > self.init.elements.length) {
                                body_out.print("ρσ_flatten(" + itervar + ")");
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
                            body_out.with_parens(function () {
                                self.condition.print(body_out);
                            });
                            body_out.space();
                            body_out.with_block(function () {
                                add_to_result(body_out);
                            });
                            body_out.newline();
                        } else {
                            add_to_result(body_out);
                        }
                    });
                    body_out.newline();
                    if (self.constructor === AST_ListComprehension) {
                        body_out.indent();
                        body_out.spaced("ρσ_Result", "=", "ρσ_list_constructor(ρσ_Result)");
                        body_out.end_statement();
                    }
                    if (!is_generator) {
                        body_out.indent();
                        body_out.print("return ρσ_Result");
                        body_out.end_statement();
                    }
                    if (is_generator) {
                        output.set_indentation(previous_indentation);
                        [body_out.newline(), body_out.indent(), body_out.print("}")];
                        if (es5) {
                            transpiled = regenerate(body_out.get(), output.options.beautify).replace(/regeneratorRuntime.(wrap|mark)/g, "ρσ_regenerator.regeneratorRuntime.$1");
                            if (output.options.beautify) {
                                ci = output.make_indent(0);
                                transpiled = (function() {
                                    var ρσ_Iter = ρσ_Iterable(transpiled.split("\n")), ρσ_Result = [], x;
                                    for (var ρσ_Index = 0; ρσ_Index < ρσ_Iter.length; ρσ_Index++) {
                                        x = ρσ_Iter[ρσ_Index];
                                        ρσ_Result.push(ci + x);
                                    }
                                    ρσ_Result = ρσ_list_constructor(ρσ_Result);
                                    return ρσ_Result;
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
        };
        Object.defineProperties(print_list_comprehension, {
            __argnames__ : {value: ["self", "output"]}
        });

        ρσ_modules["output.loops"].unpack_tuple = unpack_tuple;
        ρσ_modules["output.loops"].print_do_loop = print_do_loop;
        ρσ_modules["output.loops"].print_while_loop = print_while_loop;
        ρσ_modules["output.loops"].is_simple_for_in = is_simple_for_in;
        ρσ_modules["output.loops"].is_simple_for = is_simple_for;
        ρσ_modules["output.loops"].print_for_loop_body = print_for_loop_body;
        ρσ_modules["output.loops"].init_es6_itervar = init_es6_itervar;
        ρσ_modules["output.loops"].print_for_in = print_for_in;
        ρσ_modules["output.loops"].print_list_comprehension = print_list_comprehension;
    })();

    (function(){
        var __name__ = "output.operators";
        var after_map;
        var AST_Number = ρσ_modules.ast.AST_Number;
        var AST_Unary = ρσ_modules.ast.AST_Unary;
        var AST_Seq = ρσ_modules.ast.AST_Seq;
        var AST_Array = ρσ_modules.ast.AST_Array;
        var AST_Binary = ρσ_modules.ast.AST_Binary;
        var AST_Set = ρσ_modules.ast.AST_Set;
        var AST_Object = ρσ_modules.ast.AST_Object;
        var AST_Statement = ρσ_modules.ast.AST_Statement;
        var AST_Conditional = ρσ_modules.ast.AST_Conditional;
        var AST_BaseCall = ρσ_modules.ast.AST_BaseCall;
        var AST_Symbol = ρσ_modules.ast.AST_Symbol;
        var AST_SymbolRef = ρσ_modules.ast.AST_SymbolRef;
        var AST_Assign = ρσ_modules.ast.AST_Assign;
        var AST_Return = ρσ_modules.ast.AST_Return;
        var AST_SimpleStatement = ρσ_modules.ast.AST_SimpleStatement;
        var AST_String = ρσ_modules.ast.AST_String;
        var AST_Sub = ρσ_modules.ast.AST_Sub;
        var AST_ItemAccess = ρσ_modules.ast.AST_ItemAccess;
        var is_node_type = ρσ_modules.ast.is_node_type;

        var unpack_tuple = ρσ_modules["output.loops"].unpack_tuple;

        function print_getattr(self, output, skip_expression) {
            var expr;
            if (!skip_expression) {
                expr = self.expression;
                expr.print(output);
            }
            if (is_node_type(expr, AST_Number) && expr.value >= 0) {
                if (!/[xa-f.]/i.test(output.last())) {
                    output.print(".");
                }
            }
            output.print(".");
            output.print_name(self.property);
        };
        Object.defineProperties(print_getattr, {
            __argnames__ : {value: ["self", "output", "skip_expression"]}
        });

        function print_getitem(self, output) {
            var expr, prop, is_negative_number, is_repeatable;
            expr = self.expression;
            prop = self.property;
            if (is_node_type(prop, AST_Number) || is_node_type(prop, AST_String) || is_node_type(prop, AST_SymbolRef) && prop.name && prop.name.startsWith("ρσ_")) {
                expr.print(output);
                [output.print("["), prop.print(output), output.print("]")];
                return;
            }
            is_negative_number = is_node_type(prop, AST_Unary) && prop.operator === "-" && is_node_type(prop.expression, AST_Number);
            is_repeatable = is_node_type(expr, AST_SymbolRef);
            if (is_repeatable) {
                expr.print(output);
            } else {
                [output.spaced("(ρσ_expr_temp", "=", expr), output.print(")")];
                expr = (function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["print"] = function () {
                        output.print("ρσ_expr_temp");
                    };
                    return ρσ_d;
                }).call(this);
            }
            if (is_negative_number) {
                [output.print("["), expr.print(output), output.print(".length"), prop.print(output), 
                output.print("]")];
                return;
            }
            is_repeatable = is_node_type(prop, AST_SymbolRef);
            if (is_repeatable) {
                output.spaced("[(typeof", prop, "===", "\"number\"", "&&", prop);
                [output.spaced("", "<", "0)", "?", expr), output.spaced(".length", "+", prop, ":", prop)];
                output.print("]");
            } else {
                [output.print("[ρσ_bound_index("), prop.print(output), output.comma(), expr.print(output), 
                output.print(")]")];
            }
        };
        Object.defineProperties(print_getitem, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_rich_getitem(self, output) {
            var func;
            func = "ρσ_" + ((self.assignment) ? "setitem" : "getitem");
            output.print(func + "(");
            [self.expression.print(output), output.comma(), self.property.print(output)];
            if (self.assignment) {
                [output.comma(), self.assignment.print(output)];
            }
            output.print(")");
        };
        Object.defineProperties(print_rich_getitem, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_splice_assignment(self, output) {
            output.print("Array.splice.apply");
            output.with_parens(function () {
                self.expression.print(output);
                output.comma();
                output.with_square(function () {
                    self.property.print(output);
                    output.comma();
                    self.property2.print(output);
                    output.print("-");
                    self.property.print(output);
                });
                output.print(".concat");
                output.with_parens(function () {
                    self.assignment.print(output);
                });
            });
        };
        Object.defineProperties(print_splice_assignment, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_delete(self, output) {
            if (is_node_type(self, AST_Symbol)) {
                [output.assign(self), output.print("undefined")];
            } else if (is_node_type(self, AST_Sub) || is_node_type(self, AST_ItemAccess)) {
                [output.print("ρσ_delitem("), self.expression.print(output), output.comma(), self.property.print(output), 
                output.print(")")];
            } else {
                output.spaced("delete", self);
            }
        };
        Object.defineProperties(print_delete, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_unary_prefix(self, output) {
            var op;
            op = self.operator;
            if (op === "delete") {
                return print_delete(self.expression, output);
            }
            output.print(op);
            if (/^[a-z]/i.test(op)) {
                output.space();
            }
            self.expression.print(output);
        };
        Object.defineProperties(print_unary_prefix, {
            __argnames__ : {value: ["self", "output"]}
        });

        function write_instanceof(left, right, output) {
            function do_many(vals) {
                [output.print("ρσ_instanceof.apply(null,"), output.space()];
                [output.print("["), left.print(output), output.comma()];
                for (var i = 0; i < vals.length; i++) {
                    vals[(typeof i === "number" && i < 0) ? vals.length + i : i].print(output);
                    if (i !== vals.length - 1) {
                        output.comma();
                    }
                }
                output.print("])");
            };
            Object.defineProperties(do_many, {
                __argnames__ : {value: ["vals"]}
            });

            if (is_node_type(right, AST_Seq)) {
                do_many(right.to_array());
            } else if (is_node_type(right, AST_Array)) {
                do_many(right.elements);
            } else {
                output.print("ρσ_instanceof(");
                [left.print(output), output.comma(), right.print(output), output.print(")")];
            }
        };
        Object.defineProperties(write_instanceof, {
            __argnames__ : {value: ["left", "right", "output"]}
        });

        function write_smart_equality(self, output) {
            function is_ok(x) {
                return !(is_node_type(x, AST_Array) || is_node_type(x, AST_Set) || is_node_type(x, AST_Object) || is_node_type(x, AST_Statement) || is_node_type(x, AST_Binary) || is_node_type(x, AST_Conditional) || is_node_type(x, AST_BaseCall));
            };
            Object.defineProperties(is_ok, {
                __argnames__ : {value: ["x"]}
            });

            if (is_ok(self.left) && is_ok(self.right)) {
                if (self.operator === "==") {
                    output.print("(");
                    output.spaced(self.left, "===", self.right, "||", "typeof", self.left, "===", "\"object\"", "&&", "ρσ_equals(");
                    [self.left.print(output), output.print(","), output.space(), self.right.print(output), 
                    output.print("))")];
                } else {
                    output.print("(");
                    output.spaced(self.left, "!==", self.right, "&&", "(typeof", self.left, "!==", "\"object\"", "||", "ρσ_not_equals(");
                    [self.left.print(output), output.print(","), output.space(), self.right.print(output), 
                    output.print(")))")];
                }
            } else {
                output.print("ρσ_" + ((self.operator === "==") ? "equals(" : "not_equals("));
                [self.left.print(output), output.print(","), output.space(), self.right.print(output), 
                output.print(")")];
            }
        };
        Object.defineProperties(write_smart_equality, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_binary_op(self, output) {
            var comparators, function_ops, leftvar;
            comparators = (function(){
                var ρσ_d = Object.create(null);
                ρσ_d["<"] = true;
                ρσ_d[">"] = true;
                ρσ_d["<="] = true;
                ρσ_d[">="] = true;
                ρσ_d["=="] = true;
                ρσ_d["!="] = true;
                return ρσ_d;
            }).call(this);
            function_ops = (function(){
                var ρσ_d = Object.create(null);
                ρσ_d["in"] = "ρσ_in";
                return ρσ_d;
            }).call(this);
            if (function_ops[ρσ_bound_index(self.operator, function_ops)]) {
                output.print(function_ops[ρσ_bound_index(self.operator, function_ops)]);
                output.with_parens(function () {
                    self.left.print(output);
                    output.comma();
                    self.right.print(output);
                });
            } else if (comparators[ρσ_bound_index(self.operator, comparators)] && is_node_type(self.left, AST_Binary) && comparators[ρσ_bound_index(self.left.operator, comparators)]) {
                if (is_node_type(self.left.right, AST_Symbol)) {
                    self.left.print(output);
                    leftvar = self.left.right.name;
                } else {
                    self.left.left.print(output);
                    output.space();
                    output.print(self.left.operator);
                    output.space();
                    output.with_parens(function () {
                        output.assign("ρσ_cond_temp");
                        self.left.right.print(output);
                        leftvar = "ρσ_cond_temp";
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
                output.with_parens(function () {
                    self.left.print(output);
                    output.space();
                    output.print("/");
                    output.space();
                    self.right.print(output);
                });
            } else if (self.operator === "**") {
                if (is_node_type(self.left, AST_Unary)) {
                    output.print(self.left.operator + "Math.pow(");
                    [self.left.expression.print(output), output.comma()];
                    [self.right.print(output), output.print(")")];
                } else {
                    [output.print("Math.pow("), self.left.print(output), output.comma(), self.right.print(output), 
                    output.print(")")];
                }
            } else if (self.operator === "==" || self.operator === "!=") {
                write_smart_equality(self, output);
            } else if (self.operator === "instanceof") {
                write_instanceof(self.left, self.right, output);
            } else if (self.operator === "*" && is_node_type(self.left, AST_String)) {
                [self.left.print(output), output.print(".repeat("), self.right.print(output), output.print(")")];
            } else {
                output.spaced(self.left, self.operator, self.right);
            }
        };
        Object.defineProperties(print_binary_op, {
            __argnames__ : {value: ["self", "output"]}
        });

        after_map = (function(){
            var ρσ_d = Object.create(null);
            ρσ_d["."] = "d";
            ρσ_d["("] = "c";
            ρσ_d["["] = "d";
            ρσ_d["g"] = "g";
            ρσ_d["null"] = "n";
            return ρσ_d;
        }).call(this);
        function print_existential(self, output) {
            var key, after;
            key = (self.after === null || typeof self.after === "string") ? after_map[ρσ_bound_index(self.after, after_map)] : "e";
            if (is_node_type(self.expression, AST_SymbolRef)) {
                if (key === "n") {
                    output.spaced("(typeof", self.expression, "!==", "\"undefined\"", "&&", self.expression, "!==", "null)");
                    return;
                }
                if (key === "c") {
                    output.spaced("(typeof", self.expression, "===", "\"function\"", "?", self.expression, ":", "(function(){return undefined;}))");
                    return;
                }
                after = self.after;
                if (key === "d") {
                    after = "Object.create(null)";
                } else if (key === "g") {
                    after = "{__getitem__:function(){return undefined;}}";
                }
                output.spaced("(typeof", self.expression, "!==", "\"undefined\"", "&&", self.expression, "!==", "null", "?", self.expression, ":", after);
                output.print(")");
                return;
            }
            output.print("ρσ_exists." + key + "(");
            self.expression.print(output);
            if (key === "e") {
                [output.comma(), self.after.print(output)];
            }
            output.print(")");
        };
        Object.defineProperties(print_existential, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_assignment(self, output) {
            var flattened, left, flat;
            flattened = false;
            left = self.left;
            if (is_node_type(left, AST_Seq)) {
                left = new AST_Array((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["elements"] = [left.car, left.cdr];
                    return ρσ_d;
                }).call(this));
            }
            if (is_node_type(left, AST_Array)) {
                flat = left.flatten();
                flattened = flat.length > left.elements.length;
                output.print("ρσ_unpack");
            } else {
                left.print(output);
            }
            output.space();
            output.print(self.operator);
            output.space();
            if (flattened) {
                output.print("ρσ_flatten");
                output.with_parens(function () {
                    self.right.print(output);
                });
            } else {
                self.right.print(output);
            }
            if (is_node_type(left, AST_Array)) {
                output.semicolon();
                output.newline();
                unpack_tuple(flat, output, true);
            }
        };
        Object.defineProperties(print_assignment, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_assign(self, output) {
            var ρσ_unpack, left_hand_sides, rhs, is_compound_assign, lhs, temp_rhs;
            if (self.operator === "//=") {
                output.assign(self.left);
                output.print("Math.floor");
                output.with_parens(function () {
                    self.left.print(output);
                    output.space();
                    output.print("/");
                    output.space();
                    self.right.print(output);
                });
                return;
            }
            if (self.operator === "=" && self.is_chained()) {
                ρσ_unpack = self.traverse_chain();
                left_hand_sides = ρσ_unpack[0];
                rhs = ρσ_unpack[1];
                is_compound_assign = false;
                var ρσ_Iter87 = ρσ_Iterable(left_hand_sides);
                for (var ρσ_Index87 = 0; ρσ_Index87 < ρσ_Iter87.length; ρσ_Index87++) {
                    lhs = ρσ_Iter87[ρσ_Index87];
                    if (is_node_type(lhs, AST_Seq) || is_node_type(lhs, AST_Array)) {
                        is_compound_assign = true;
                        break;
                    }
                }
                if (is_compound_assign) {
                    temp_rhs = new AST_SymbolRef((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["name"] = "ρσ_chain_assign_temp";
                        return ρσ_d;
                    }).call(this));
                    print_assignment(new AST_Assign((function(){
                        var ρσ_d = Object.create(null);
                        ρσ_d["left"] = temp_rhs;
                        ρσ_d["operator"] = "=";
                        ρσ_d["right"] = rhs;
                        return ρσ_d;
                    }).call(this)), output);
                    var ρσ_Iter88 = ρσ_Iterable(left_hand_sides);
                    for (var ρσ_Index88 = 0; ρσ_Index88 < ρσ_Iter88.length; ρσ_Index88++) {
                        lhs = ρσ_Iter88[ρσ_Index88];
                        [output.end_statement(), output.indent()];
                        print_assignment(new AST_Assign((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["left"] = lhs;
                            ρσ_d["right"] = temp_rhs;
                            ρσ_d["operator"] = self.operator;
                            return ρσ_d;
                        }).call(this)), output);
                    }
                } else {
                    var ρσ_Iter89 = ρσ_Iterable(left_hand_sides);
                    for (var ρσ_Index89 = 0; ρσ_Index89 < ρσ_Iter89.length; ρσ_Index89++) {
                        lhs = ρσ_Iter89[ρσ_Index89];
                        output.spaced(lhs, "=", "");
                    }
                    rhs.print(output);
                }
            } else {
                print_assignment(self, output);
            }
        };
        Object.defineProperties(print_assign, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_conditional(self, output, condition, consequent, alternative) {
            var ρσ_unpack;
            ρσ_unpack = [self.condition, self.consequent, self.alternative];
            condition = ρσ_unpack[0];
            consequent = ρσ_unpack[1];
            alternative = ρσ_unpack[2];
            output.with_parens(function () {
                condition.print(output);
            });
            output.space();
            output.print("?");
            output.space();
            consequent.print(output);
            output.space();
            output.colon();
            alternative.print(output);
        };
        Object.defineProperties(print_conditional, {
            __argnames__ : {value: ["self", "output", "condition", "consequent", "alternative"]}
        });

        function print_seq(output) {
            var self, p, print_seq;
            self = this;
            p = output.parent();
            print_seq = function () {
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
            if (is_node_type(p, AST_Binary) || is_node_type(p, AST_Return) || is_node_type(p, AST_Array) || is_node_type(p, AST_BaseCall) || is_node_type(p, AST_SimpleStatement)) {
                output.with_square(print_seq);
            } else {
                print_seq();
            }
        };
        Object.defineProperties(print_seq, {
            __argnames__ : {value: ["output"]}
        });

        ρσ_modules["output.operators"].after_map = after_map;
        ρσ_modules["output.operators"].print_getattr = print_getattr;
        ρσ_modules["output.operators"].print_getitem = print_getitem;
        ρσ_modules["output.operators"].print_rich_getitem = print_rich_getitem;
        ρσ_modules["output.operators"].print_splice_assignment = print_splice_assignment;
        ρσ_modules["output.operators"].print_delete = print_delete;
        ρσ_modules["output.operators"].print_unary_prefix = print_unary_prefix;
        ρσ_modules["output.operators"].write_instanceof = write_instanceof;
        ρσ_modules["output.operators"].write_smart_equality = write_smart_equality;
        ρσ_modules["output.operators"].print_binary_op = print_binary_op;
        ρσ_modules["output.operators"].print_existential = print_existential;
        ρσ_modules["output.operators"].print_assignment = print_assignment;
        ρσ_modules["output.operators"].print_assign = print_assign;
        ρσ_modules["output.operators"].print_conditional = print_conditional;
        ρσ_modules["output.operators"].print_seq = print_seq;
    })();

    (function(){
        var __name__ = "output.functions";
        var anonfunc;
        var AST_ClassCall = ρσ_modules.ast.AST_ClassCall;
        var AST_New = ρσ_modules.ast.AST_New;
        var has_calls = ρσ_modules.ast.has_calls;
        var AST_Dot = ρσ_modules.ast.AST_Dot;
        var AST_SymbolRef = ρσ_modules.ast.AST_SymbolRef;
        var is_node_type = ρσ_modules.ast.is_node_type;

        var OutputStream = ρσ_modules["output.stream"].OutputStream;

        var print_bracketed = ρσ_modules["output.statements"].print_bracketed;

        var create_doctring = ρσ_modules["output.utils"].create_doctring;

        var print_getattr = ρσ_modules["output.operators"].print_getattr;

        anonfunc = "ρσ_anonfunc";
        function decorate(decorators, output, func) {
            var pos;
            pos = 0;
            function wrap() {
                if (pos < decorators.length) {
                    decorators[(typeof pos === "number" && pos < 0) ? decorators.length + pos : pos].expression.print(output);
                    pos += 1;
                    output.with_parens(function () {
                        wrap();
                    });
                } else {
                    func();
                }
            };

            wrap();
        };
        Object.defineProperties(decorate, {
            __argnames__ : {value: ["decorators", "output", "func"]}
        });

        function function_args(argnames, output, strip_first) {
            output.with_parens(function () {
                var ρσ_unpack, i, arg;
                if (argnames && argnames.length && (argnames.is_simple_func === true || argnames.is_simple_func === undefined)) {
                    var ρσ_Iter90 = ρσ_Iterable(enumerate((strip_first) ? argnames.slice(1) : argnames));
                    for (var ρσ_Index90 = 0; ρσ_Index90 < ρσ_Iter90.length; ρσ_Index90++) {
                        ρσ_unpack = ρσ_Iter90[ρσ_Index90];
                        i = ρσ_unpack[0];
                        arg = ρσ_unpack[1];
                        if (i) {
                            output.comma();
                        }
                        arg.print(output);
                    }
                }
            });
            output.space();
        };
        Object.defineProperties(function_args, {
            __argnames__ : {value: ["argnames", "output", "strip_first"]}
        });

        function function_preamble(node, output, offset) {
            var a, fname, kw, i, ρσ_unpack, c, arg, dname, nargs;
            a = node.argnames;
            if (!a || a.is_simple_func) {
                return;
            }
            fname = (node.name) ? node.name.name : anonfunc;
            kw = "arguments[arguments.length-1]";
            var ρσ_Iter91 = ρσ_Iterable(enumerate(a));
            for (var ρσ_Index91 = 0; ρσ_Index91 < ρσ_Iter91.length; ρσ_Index91++) {
                ρσ_unpack = ρσ_Iter91[ρσ_Index91];
                c = ρσ_unpack[0];
                arg = ρσ_unpack[1];
                i = c - offset;
                if (i >= 0) {
                    output.indent();
                    output.print("var");
                    output.space();
                    output.assign(arg);
                    if (Object.prototype.hasOwnProperty.call(a.defaults, arg.name)) {
                        output.spaced("(arguments[" + i + "]", "===", "undefined", "||", "(", i, "===", "arguments.length-1", "&&", kw, "!==", "null", "&&", "typeof", kw, "===", "\"object\"", "&&", kw, "[ρσ_kwargs_symbol]", "===", "true))", "?", "");
                        [output.print(fname + ".__defaults__."), arg.print(output)];
                        [output.space(), output.print(":"), output.space()];
                    } else {
                        output.spaced("(", i, "===", "arguments.length-1", "&&", kw, "!==", "null", "&&", "typeof", kw, "===", "\"object\"", "&&", kw, "[ρσ_kwargs_symbol]", "===", "true)", "?", "undefined", ":", "");
                    }
                    output.print("arguments[" + i + "]");
                    output.end_statement();
                }
            }
            if (a.kwargs || a.has_defaults) {
                kw = (a.kwargs) ? a.kwargs.name : "ρσ_kwargs_obj";
                output.indent();
                output.spaced("var", kw, "=", "arguments[arguments.length-1]");
                output.end_statement();
                output.indent();
                output.spaced("if", "(" + kw, "===", "null", "||", "typeof", kw, "!==", "\"object\"", "||", kw, "[ρσ_kwargs_symbol]", "!==", "true)", kw, "=", "{}");
                output.end_statement();
                if (a.has_defaults) {
                    var ρσ_Iter92 = ρσ_Iterable(Object.keys(a.defaults));
                    for (var ρσ_Index92 = 0; ρσ_Index92 < ρσ_Iter92.length; ρσ_Index92++) {
                        dname = ρσ_Iter92[ρσ_Index92];
                        output.indent();
                        output.spaced("if", "(Object.prototype.hasOwnProperty.call(" + kw + ",", "\"" + dname + "\"))");
                        output.with_block(function () {
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
                output.spaced("var", a.starargs.name, "=", "Array.prototype.slice.call(arguments,", nargs + ")");
                output.end_statement();
                output.indent();
                output.spaced("if", "(" + kw, "!==", "null", "&&", "typeof", kw, "===", "\"object\"", "&&", kw, "[ρσ_kwargs_symbol]", "===", "true)", a.starargs.name);
                output.print(".pop()");
                output.end_statement();
            }
        };
        Object.defineProperties(function_preamble, {
            __argnames__ : {value: ["node", "output", "offset"]}
        });

        function has_annotations(self) {
            var arg;
            if (self.return_annotation) {
                return true;
            }
            var ρσ_Iter93 = ρσ_Iterable(self.argnames);
            for (var ρσ_Index93 = 0; ρσ_Index93 < ρσ_Iter93.length; ρσ_Index93++) {
                arg = ρσ_Iter93[ρσ_Index93];
                if (arg.annotation) {
                    return true;
                }
            }
            return false;
        };
        Object.defineProperties(has_annotations, {
            __argnames__ : {value: ["self"]}
        });

        function function_annotation(self, output, strip_first, name) {
            var fname, props, defaults, dkeys, names;
            fname = name || ((self.name) ? self.name.name : anonfunc);
            props = Object.create(null);
            if (has_annotations(self)) {
                props.__annotations__ = function () {
                    var ρσ_unpack, i, arg;
                    output.print("{");
                    if (self.argnames && self.argnames.length) {
                        var ρσ_Iter94 = ρσ_Iterable(enumerate(self.argnames));
                        for (var ρσ_Index94 = 0; ρσ_Index94 < ρσ_Iter94.length; ρσ_Index94++) {
                            ρσ_unpack = ρσ_Iter94[ρσ_Index94];
                            i = ρσ_unpack[0];
                            arg = ρσ_unpack[1];
                            if (arg.annotation) {
                                arg.print(output);
                                [output.print(":"), output.space()];
                                arg.annotation.print(output);
                                if (i < self.argnames.length - 1 || self.return_annotation) {
                                    output.comma();
                                }
                            }
                        }
                    }
                    if (self.return_annotation) {
                        [output.print("return:"), output.space()];
                        self.return_annotation.print(output);
                    }
                    output.print("}");
                };
            }
            defaults = self.argnames.defaults;
            dkeys = Object.keys(self.argnames.defaults);
            if (dkeys.length) {
                props.__defaults__ = function () {
                    var ρσ_unpack, i, k;
                    output.print("{");
                    var ρσ_Iter95 = ρσ_Iterable(enumerate(dkeys));
                    for (var ρσ_Index95 = 0; ρσ_Index95 < ρσ_Iter95.length; ρσ_Index95++) {
                        ρσ_unpack = ρσ_Iter95[ρσ_Index95];
                        i = ρσ_unpack[0];
                        k = ρσ_unpack[1];
                        [output.print(k + ":"), defaults[(typeof k === "number" && k < 0) ? defaults.length + k : k].print(output)];
                        if (i !== dkeys.length - 1) {
                            output.comma();
                        }
                    }
                    output.print("}");
                };
            }
            if (!self.argnames.is_simple_func) {
                props.__handles_kwarg_interpolation__ = function () {
                    output.print("true");
                };
            }
            if (self.argnames.length) {
                props.__argnames__ = function () {
                    var ρσ_unpack, i, arg;
                    output.print("[");
                    var ρσ_Iter96 = ρσ_Iterable(enumerate(self.argnames));
                    for (var ρσ_Index96 = 0; ρσ_Index96 < ρσ_Iter96.length; ρσ_Index96++) {
                        ρσ_unpack = ρσ_Iter96[ρσ_Index96];
                        i = ρσ_unpack[0];
                        arg = ρσ_unpack[1];
                        if (strip_first && i === 0) {
                            continue;
                        }
                        output.print(JSON.stringify(arg.name));
                        if (i !== self.argnames.length - 1) {
                            output.comma();
                        }
                    }
                    output.print("]");
                };
            }
            if (output.options.keep_docstrings && self.docstrings && self.docstrings.length) {
                props.__doc__ = function () {
                    output.print(JSON.stringify(create_doctring(self.docstrings)));
                };
            }
            names = Object.keys(props);
            if (names.length) {
                [output.indent(), output.print("Object.defineProperties(" + fname), output.comma()];
                output.with_block(function () {
                    var name;
                    for (var i = 0; i < names.length; i++) {
                        name = names[(typeof i === "number" && i < 0) ? names.length + i : i];
                        [output.indent(), output.spaced(name, ":", "{value:", ""), props[(typeof name === "number" && name < 0) ? props.length + name : name](), 
                        output.print("}")];
                        if (i < names.length - 1) {
                            output.print(",");
                        }
                        output.newline();
                    }
                });
                [output.print(")"), output.end_statement()];
            }
        };
        Object.defineProperties(function_annotation, {
            __argnames__ : {value: ["self", "output", "strip_first", "name"]}
        });

        function function_definition(self, output, strip_first, as_expression) {
            var orig_indent;
            as_expression = as_expression || self.is_expression || self.is_anonymous;
            if (!self.argnames.length && !self.return_annotation && (!output.options.keep_docstrings || !self.docstrings || !self.docstrings.length)) {
                as_expression = false;
            }
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
                output.with_block(function () {
                    var temp, transpiled, ci;
                    if (output.options.js_version >= 6) {
                        output.indent();
                        output.print("function* js_generator");
                        function_args(self.argnames, output, strip_first);
                        print_bracketed(self, output, true, function_preamble);
                    } else {
                        temp = new OutputStream((function(){
                            var ρσ_d = Object.create(null);
                            ρσ_d["beautify"] = true;
                            return ρσ_d;
                        }).call(this));
                        temp.print("function* js_generator");
                        function_args(self.argnames, temp, strip_first);
                        print_bracketed(self, temp, true, function_preamble);
                        transpiled = regenerate(temp.get(), output.options.beautify).replace(/regeneratorRuntime.(wrap|mark)/g, "ρσ_regenerator.regeneratorRuntime.$1");
                        if (output.options.beautify) {
                            ci = output.make_indent(0);
                            transpiled = (function() {
                                var ρσ_Iter = ρσ_Iterable(transpiled.split("\n")), ρσ_Result = [], x;
                                for (var ρσ_Index = 0; ρσ_Index < ρσ_Iter.length; ρσ_Index++) {
                                    x = ρσ_Iter[ρσ_Index];
                                    ρσ_Result.push(ci + x);
                                }
                                ρσ_Result = ρσ_list_constructor(ρσ_Result);
                                return ρσ_Result;
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
        Object.defineProperties(function_definition, {
            __argnames__ : {value: ["self", "output", "strip_first", "as_expression"]}
        });

        function print_function(output) {
            var self;
            self = this;
            if (self.decorators && self.decorators.length) {
                output.print("var");
                output.space();
                output.assign(self.name.name);
                decorate(self.decorators, output, function () {
                    function_definition(self, output, false, true);
                });
                output.end_statement();
            } else {
                function_definition(self, output, false);
                if (!self.is_expression && !self.is_anonymous) {
                    output.end_statement();
                    function_annotation(self, output, false);
                }
            }
        };
        Object.defineProperties(print_function, {
            __argnames__ : {value: ["output"]}
        });

        function find_this(expression) {
            if (is_node_type(expression, AST_Dot)) {
                return expression.expression;
            }
            if (!is_node_type(expression, AST_SymbolRef)) {
                return expression;
            }
        };
        Object.defineProperties(find_this, {
            __argnames__ : {value: ["expression"]}
        });

        function print_this(expression, output) {
            var obj;
            obj = find_this(expression);
            if (obj) {
                obj.print(output);
            } else {
                output.print("this");
            }
        };
        Object.defineProperties(print_this, {
            __argnames__ : {value: ["expression", "output"]}
        });

        function print_function_call(self, output) {
            var has_kwarg_items, has_kwarg_formals, has_kwargs, is_new, is_repeatable;
            function print_function_name(no_call) {
                if (is_node_type(self, AST_ClassCall)) {
                    if (self.static) {
                        self.class.print(output);
                        output.print(".");
                        output.print(self.method);
                    } else {
                        self.class.print(output);
                        output.print(".prototype.");
                        output.print(self.method);
                        if (!no_call) {
                            output.print(".call");
                        }
                    }
                } else {
                    if (!is_repeatable) {
                        output.print("ρσ_expr_temp");
                        if (is_node_type(self.expression, AST_Dot)) {
                            print_getattr(self.expression, output, true);
                        }
                    } else {
                        self.expression.print(output);
                    }
                }
            };
            Object.defineProperties(print_function_name, {
                __argnames__ : {value: ["no_call"]}
            });

            function print_kwargs() {
                var ρσ_unpack, i, kwname, pair;
                output.print("ρσ_desugar_kwargs(");
                if (has_kwarg_items) {
                    var ρσ_Iter97 = ρσ_Iterable(enumerate(self.args.kwarg_items));
                    for (var ρσ_Index97 = 0; ρσ_Index97 < ρσ_Iter97.length; ρσ_Index97++) {
                        ρσ_unpack = ρσ_Iter97[ρσ_Index97];
                        i = ρσ_unpack[0];
                        kwname = ρσ_unpack[1];
                        if (i > 0) {
                            output.print(",");
                            output.space();
                        }
                        kwname.print(output);
                    }
                    if (has_kwarg_formals) {
                        output.print(",");
                        output.space();
                    }
                }
                if (has_kwarg_formals) {
                    output.print("{");
                    var ρσ_Iter98 = ρσ_Iterable(enumerate(self.args.kwargs));
                    for (var ρσ_Index98 = 0; ρσ_Index98 < ρσ_Iter98.length; ρσ_Index98++) {
                        ρσ_unpack = ρσ_Iter98[ρσ_Index98];
                        i = ρσ_unpack[0];
                        pair = ρσ_unpack[1];
                        if (i) {
                            output.comma();
                        }
                        pair[0].print(output);
                        output.print(":");
                        output.space();
                        pair[1].print(output);
                    }
                    output.print("}");
                }
                output.print(")");
            };

            function print_new(apply) {
                output.print("ρσ_interpolate_kwargs_constructor.call(");
                [output.print("Object.create("), self.expression.print(output), output.print(".prototype)")];
                output.comma();
                output.print((apply) ? "true" : "false");
                output.comma();
            };
            Object.defineProperties(print_new, {
                __argnames__ : {value: ["apply"]}
            });

            function do_print_this() {
                if (!is_repeatable) {
                    output.print("ρσ_expr_temp");
                } else {
                    print_this(self.expression, output);
                }
                output.comma();
            };

            function print_positional_args() {
                var i, expr, is_first;
                i = 0;
                while (i < self.args.length) {
                    expr = (ρσ_expr_temp = self.args)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i];
                    is_first = i === 0;
                    if (!is_first) {
                        output.print(".concat(");
                    }
                    if (expr.is_array) {
                        expr.print(output);
                        i += 1;
                    } else {
                        output.print("[");
                        while (i < self.args.length && !(ρσ_expr_temp = self.args)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i].is_array) {
                            (ρσ_expr_temp = self.args)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i].print(output);
                            if (i + 1 < self.args.length && !(ρσ_expr_temp = self.args)[ρσ_bound_index(i + 1, ρσ_expr_temp)].is_array) {
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
            is_new = is_node_type(self, AST_New);
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
                output.with_parens(function () {
                    var ρσ_unpack, i, a;
                    var ρσ_Iter99 = ρσ_Iterable(enumerate(self.args));
                    for (var ρσ_Index99 = 0; ρσ_Index99 < ρσ_Iter99.length; ρσ_Index99++) {
                        ρσ_unpack = ρσ_Iter99[ρσ_Index99];
                        i = ρσ_unpack[0];
                        a = ρσ_unpack[1];
                        if (i) {
                            output.comma();
                        }
                        a.print(output);
                    }
                });
                return;
            }
            is_repeatable = is_new || !has_calls(self.expression);
            if (!is_repeatable) {
                [output.assign("(ρσ_expr_temp"), print_this(self.expression, output), output.comma()];
            }
            if (has_kwargs) {
                if (is_new) {
                    print_new(false);
                } else {
                    output.print("ρσ_interpolate_kwargs.call(");
                    do_print_this();
                }
                print_function_name(true);
                output.comma();
            } else {
                if (is_new) {
                    print_new(true);
                    print_function_name(true);
                    output.comma();
                } else {
                    print_function_name(true);
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
        Object.defineProperties(print_function_call, {
            __argnames__ : {value: ["self", "output"]}
        });

        ρσ_modules["output.functions"].anonfunc = anonfunc;
        ρσ_modules["output.functions"].decorate = decorate;
        ρσ_modules["output.functions"].function_args = function_args;
        ρσ_modules["output.functions"].function_preamble = function_preamble;
        ρσ_modules["output.functions"].has_annotations = has_annotations;
        ρσ_modules["output.functions"].function_annotation = function_annotation;
        ρσ_modules["output.functions"].function_definition = function_definition;
        ρσ_modules["output.functions"].print_function = print_function;
        ρσ_modules["output.functions"].find_this = find_this;
        ρσ_modules["output.functions"].print_this = print_this;
        ρσ_modules["output.functions"].print_function_call = print_function_call;
    })();

    (function(){
        var __name__ = "output.classes";
        var AST_Class = ρσ_modules.ast.AST_Class;
        var AST_Method = ρσ_modules.ast.AST_Method;
        var is_node_type = ρσ_modules.ast.is_node_type;

        var decorate = ρσ_modules["output.functions"].decorate;
        var function_definition = ρσ_modules["output.functions"].function_definition;
        var function_annotation = ρσ_modules["output.functions"].function_annotation;

        var create_doctring = ρσ_modules["output.utils"].create_doctring;

        function print_class(output) {
            var self, seen_methods, property_names, defined_methods, sname, attr, stmt;
            self = this;
            if (self.external) {
                return;
            }
            function class_def(method, is_var) {
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
            Object.defineProperties(class_def, {
                __argnames__ : {value: ["method", "is_var"]}
            });

            function define_method(stmt, is_property) {
                var name, is_static, strip_first, fname;
                name = stmt.name.name;
                if (!is_property) {
                    class_def(name);
                }
                is_static = self.static.indexOf(name) !== -1;
                strip_first = !is_static;
                if (stmt.decorators && stmt.decorators.length) {
                    decorate(stmt.decorators, output, function () {
                        function_definition(stmt, output, strip_first, true);
                    });
                    output.end_statement();
                } else {
                    function_definition(stmt, output, strip_first);
                    if (!is_property) {
                        output.end_statement();
                        fname = self.name.name + ((is_static) ? "." : ".prototype.") + name;
                        function_annotation(stmt, output, strip_first, fname);
                    }
                }
            };
            Object.defineProperties(define_method, {
                __argnames__ : {value: ["stmt", "is_property"]}
            });

            function define_default_method(name, body) {
                class_def(name);
                output.spaced("function", name, "()", "");
                output.with_block(function () {
                    [output.indent(), body()];
                });
                output.end_statement();
            };
            Object.defineProperties(define_default_method, {
                __argnames__ : {value: ["name", "body"]}
            });

            function add_hidden_property(name, proceed) {
                [output.indent(), output.print("Object.defineProperty(")];
                [self.name.print(output), output.print(".prototype"), output.comma(), output.print(JSON.stringify(name)), 
                output.comma()];
                [output.spaced("{value:", ""), proceed(), output.print("})"), output.end_statement()];
            };
            Object.defineProperties(add_hidden_property, {
                __argnames__ : {value: ["name", "proceed"]}
            });

            function write_constructor() {
                output.print("function");
                output.space();
                self.name.print(output);
                output.print("()");
                output.space();
                output.with_block(function () {
                    output.indent();
                    output.spaced("if", "(this.ρσ_object_id", "===", "undefined)", "Object.defineProperty(this,", "\"ρσ_object_id\",", "{\"value\":++ρσ_object_counter})");
                    output.end_statement();
                    if (self.bound.length) {
                        output.indent();
                        [self.name.print(output), output.print(".prototype.__bind_methods__.call(this)")];
                        output.end_statement();
                    }
                    output.indent();
                    self.name.print(output);
                    [output.print(".prototype.__init__.apply(this"), output.comma(), output.print("arguments)")];
                    output.end_statement();
                });
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
                output.print("ρσ_extends");
                output.with_parens(function () {
                    self.name.print(output);
                    output.comma();
                    self.parent.print(output);
                });
                output.end_statement();
            }
            if (self.bound.length) {
                seen_methods = Object.create(null);
                add_hidden_property("__bind_methods__", function () {
                    output.spaced("function", "()", "");
                    output.with_block(function () {
                        var base, bname;
                        if (self.bases.length) {
                            for (var i = self.bases.length - 1; i >= 0; i--) {
                                base = (ρσ_expr_temp = self.bases)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i];
                                [output.indent(), base.print(output), output.spaced(".prototype.__bind_methods__", "&&", "")];
                                [base.print(output), output.print(".prototype.__bind_methods__.call(this)")];
                                output.end_statement();
                            }
                        }
                        var ρσ_Iter100 = ρσ_Iterable(self.bound);
                        for (var ρσ_Index100 = 0; ρσ_Index100 < ρσ_Iter100.length; ρσ_Index100++) {
                            bname = ρσ_Iter100[ρσ_Index100];
                            if (seen_methods[(typeof bname === "number" && bname < 0) ? seen_methods.length + bname : bname] || (ρσ_expr_temp = self.dynamic_properties)[(typeof bname === "number" && bname < 0) ? ρσ_expr_temp.length + bname : bname]) {
                                continue;
                            }
                            seen_methods[(typeof bname === "number" && bname < 0) ? seen_methods.length + bname : bname] = true;
                            [output.indent(), output.assign("this." + bname)];
                            [self.name.print(output), output.print(".prototype." + bname + ".bind(this)")];
                            output.end_statement();
                        }
                    });
                });
            }
            property_names = Object.keys(self.dynamic_properties);
            if (property_names.length) {
                output.indent();
                output.print("Object.defineProperties");
                output.with_parens(function () {
                    [self.name.print(output), output.print(".prototype"), output.comma(), output.space(), 
                    output.with_block(function () {
                        var prop, name;
                        var ρσ_Iter101 = ρσ_Iterable(property_names);
                        for (var ρσ_Index101 = 0; ρσ_Index101 < ρσ_Iter101.length; ρσ_Index101++) {
                            name = ρσ_Iter101[ρσ_Index101];
                            prop = (ρσ_expr_temp = self.dynamic_properties)[(typeof name === "number" && name < 0) ? ρσ_expr_temp.length + name : name];
                            [output.indent(), output.print(JSON.stringify(name) + ":"), output.space()];
                            output.with_block(function () {
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
            if (!self.init) {
                define_default_method("__init__", function () {
                    if (self.parent) {
                        self.parent.print(output);
                        output.spaced(".prototype.__init__", "&&");
                        [output.space(), self.parent.print(output)];
                        output.print(".prototype.__init__.apply");
                        output.with_parens(function () {
                            output.print("this");
                            output.comma();
                            output.print("arguments");
                        });
                        output.end_statement();
                    }
                });
            }
            defined_methods = Object.create(null);
            var ρσ_Iter102 = ρσ_Iterable(self.body);
            for (var ρσ_Index102 = 0; ρσ_Index102 < ρσ_Iter102.length; ρσ_Index102++) {
                stmt = ρσ_Iter102[ρσ_Index102];
                if (is_node_type(stmt, AST_Method)) {
                    if (stmt.is_getter || stmt.is_setter) {
                        continue;
                    }
                    define_method(stmt);
                    defined_methods[ρσ_bound_index(stmt.name.name, defined_methods)] = true;
                    sname = stmt.name.name;
                    if (sname === "__init__") {
                        var ρσ_Iter103 = ρσ_Iterable(ρσ_list_decorate([ ".__argnames__", ".__handles_kwarg_interpolation__" ]));
                        for (var ρσ_Index103 = 0; ρσ_Index103 < ρσ_Iter103.length; ρσ_Index103++) {
                            attr = ρσ_Iter103[ρσ_Index103];
                            [output.indent(), self.name.print(output), output.assign(attr)];
                            [self.name.print(output), output.print(".prototype.__init__" + attr), output.end_statement()];
                        }
                    }
                    if (sname === "__iter__") {
                        class_def("ρσ_iterator_symbol", true);
                        self.name.print(output);
                        output.print(".prototype." + stmt.name.name);
                        output.end_statement();
                    }
                } else if (is_node_type(stmt, AST_Class)) {
                    console.error("Nested classes aren't supported yet");
                }
            }
            if (!defined_methods["__repr__"]) {
                define_default_method("__repr__", function () {
                    if (self.parent) {
                        [output.print("if("), self.parent.print(output), output.spaced(".prototype.__repr__)", "return", self.parent)];
                        [output.print(".prototype.__repr__.call(this)"), output.end_statement()];
                    }
                    [output.indent(), output.spaced("return", "\"<\"", "+", "__name__", "+", "\".\"", "+", "this.constructor.name", "")];
                    output.spaced("+", "\" #\"", "+", "this.ρσ_object_id", "+", "\">\"");
                    output.end_statement();
                });
            }
            if (!defined_methods["__str__"]) {
                define_default_method("__str__", function () {
                    if (self.parent) {
                        [output.print("if("), self.parent.print(output), output.spaced(".prototype.__str__)", "return", self.parent)];
                        [output.print(".prototype.__str__.call(this)"), output.end_statement()];
                    }
                    output.spaced("return", "this.__repr__()");
                    output.end_statement();
                });
            }
            add_hidden_property("__bases__", function () {
                output.print("[");
                for (var i = 0; i < self.bases.length; i++) {
                    (ρσ_expr_temp = self.bases)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i].print(output);
                    if (i < self.bases.length - 1) {
                        output.comma();
                    }
                }
                output.print("]");
            });
            if (self.bases.length > 1) {
                output.indent();
                output.print("ρσ_mixin(");
                self.name.print(output);
                for (var i = 1; i < self.bases.length; i++) {
                    output.comma();
                    (ρσ_expr_temp = self.bases)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i].print(output);
                }
                [output.print(")"), output.end_statement()];
            }
            if (self.docstrings && self.docstrings.length && output.options.keep_docstrings) {
                add_hidden_property("__doc__", function () {
                    output.print(JSON.stringify(create_doctring(self.docstrings)));
                });
            }
            var ρσ_Iter104 = ρσ_Iterable(self.statements);
            for (var ρσ_Index104 = 0; ρσ_Index104 < ρσ_Iter104.length; ρσ_Index104++) {
                stmt = ρσ_Iter104[ρσ_Index104];
                if (!is_node_type(stmt, AST_Method)) {
                    output.indent();
                    stmt.print(output);
                    output.newline();
                }
            }
        };
        Object.defineProperties(print_class, {
            __argnames__ : {value: ["output"]}
        });

        ρσ_modules["output.classes"].print_class = print_class;
    })();

    (function(){
        var __name__ = "output.literals";
        var AST_Binary = ρσ_modules.ast.AST_Binary;
        var is_node_type = ρσ_modules.ast.is_node_type;

        function print_array(self, output) {
            output.print("ρσ_list_decorate");
            output.with_parens(function () {
                output.with_square(function () {
                    var a, len_, ρσ_unpack, i, exp;
                    a = self.elements;
                    len_ = a.length;
                    if (len_ > 0) {
                        output.space();
                    }
                    var ρσ_Iter105 = ρσ_Iterable(enumerate(a));
                    for (var ρσ_Index105 = 0; ρσ_Index105 < ρσ_Iter105.length; ρσ_Index105++) {
                        ρσ_unpack = ρσ_Iter105[ρσ_Index105];
                        i = ρσ_unpack[0];
                        exp = ρσ_unpack[1];
                        if (i) {
                            output.comma();
                        }
                        exp.print(output);
                    }
                    if (len_ > 0) {
                        output.space();
                    }
                });
            });
        };
        Object.defineProperties(print_array, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_obj_literal(self, output) {
            output.with_parens(function () {
                output.print("function()");
                output.with_block(function () {
                    var ρσ_unpack, i, prop;
                    output.indent();
                    if (self.is_pydict) {
                        output.spaced.apply(output, "var ρσ_d = ρσ_dict()".split(" "));
                    } else {
                        output.spaced("var", "ρσ_d", "=", (self.is_jshash) ? "Object.create(null)" : "{}");
                    }
                    output.end_statement();
                    var ρσ_Iter106 = ρσ_Iterable(enumerate(self.properties));
                    for (var ρσ_Index106 = 0; ρσ_Index106 < ρσ_Iter106.length; ρσ_Index106++) {
                        ρσ_unpack = ρσ_Iter106[ρσ_Index106];
                        i = ρσ_unpack[0];
                        prop = ρσ_unpack[1];
                        output.indent();
                        if (self.is_pydict) {
                            output.print("ρσ_d.set");
                            output.with_parens(function () {
                                prop.key.print(output);
                                [output.print(","), output.space()];
                                prop.value.print(output);
                            });
                        } else {
                            output.print("ρσ_d");
                            output.with_square(function () {
                                prop.key.print(output);
                            });
                            [output.space(), output.print("="), output.space()];
                            prop.value.print(output);
                        }
                        output.end_statement();
                    }
                    output.indent();
                    output.spaced("return", "ρσ_d");
                    output.end_statement();
                });
            });
            output.print(".call(this)");
        };
        Object.defineProperties(print_obj_literal, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_object(self, output) {
            if (self.is_pydict) {
                if (self.properties.length > 0) {
                    print_obj_literal(self, output);
                } else {
                    output.print("ρσ_dict()");
                }
            } else {
                if (self.properties.length > 0) {
                    print_obj_literal(self, output);
                } else {
                    output.print((self.is_jshash) ? "Object.create(null)" : "{}");
                }
            }
        };
        Object.defineProperties(print_object, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_set(self, output) {
            if (self.items.length === 0) {
                output.print("ρσ_set()");
                return;
            }
            output.with_parens(function () {
                output.print("function()");
                output.with_block(function () {
                    var item;
                    output.indent();
                    output.spaced.apply(output, "var s = ρσ_set()".split(" "));
                    output.end_statement();
                    var ρσ_Iter107 = ρσ_Iterable(self.items);
                    for (var ρσ_Index107 = 0; ρσ_Index107 < ρσ_Iter107.length; ρσ_Index107++) {
                        item = ρσ_Iter107[ρσ_Index107];
                        output.indent();
                        output.print("s.jsset.add");
                        output.with_parens(function () {
                            item.value.print(output);
                        });
                        output.end_statement();
                    }
                    output.indent();
                    output.spaced("return", "s");
                    output.end_statement();
                });
            });
            output.print("()");
        };
        Object.defineProperties(print_set, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_regexp(self, output) {
            var str_, p;
            str_ = self.value.toString();
            if (output.option("ascii_only")) {
                str_ = output.to_ascii(str_);
            }
            output.print(str_);
            p = output.parent();
            if (is_node_type(p, AST_Binary) && /^in/.test(p.operator) && p.left === self) {
                output.print(" ");
            }
        };
        Object.defineProperties(print_regexp, {
            __argnames__ : {value: ["self", "output"]}
        });

        ρσ_modules["output.literals"].print_array = print_array;
        ρσ_modules["output.literals"].print_obj_literal = print_obj_literal;
        ρσ_modules["output.literals"].print_object = print_object;
        ρσ_modules["output.literals"].print_set = print_set;
        ρσ_modules["output.literals"].print_regexp = print_regexp;
    })();

    (function(){
        var __name__ = "output.modules";
        var COMPILER_VERSION = ρσ_modules.parse.COMPILER_VERSION;

        var cache_file_name = ρσ_modules.utils.cache_file_name;

        var declare_vars = ρσ_modules["output.statements"].declare_vars;
        var display_body = ρσ_modules["output.statements"].display_body;

        var OutputStream = ρσ_modules["output.stream"].OutputStream;

        var create_doctring = ρσ_modules["output.utils"].create_doctring;

        function write_imports(module, output) {
            var imports, import_id, nonlocalvars, name, module_, module_id;
            imports = ρσ_list_decorate([]);
            var ρσ_Iter108 = ρσ_Iterable(Object.keys(module.imports));
            for (var ρσ_Index108 = 0; ρσ_Index108 < ρσ_Iter108.length; ρσ_Index108++) {
                import_id = ρσ_Iter108[ρσ_Index108];
                imports.push((ρσ_expr_temp = module.imports)[(typeof import_id === "number" && import_id < 0) ? ρσ_expr_temp.length + import_id : import_id]);
            }
            imports.sort((function() {
                var ρσ_anonfunc = function (a, b) {
                    var ρσ_unpack;
                    ρσ_unpack = [a.import_order, b.import_order];
                    a = ρσ_unpack[0];
                    b = ρσ_unpack[1];
                    return (a < b) ? -1 : (a > b) ? 1 : 0;
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["a", "b"]}
                });
                return ρσ_anonfunc;
            })());
            if (imports.length > 1) {
                output.indent();
                output.print("var ρσ_modules = {};");
                output.newline();
            }
            nonlocalvars = Object.create(null);
            var ρσ_Iter109 = ρσ_Iterable(imports);
            for (var ρσ_Index109 = 0; ρσ_Index109 < ρσ_Iter109.length; ρσ_Index109++) {
                module_ = ρσ_Iter109[ρσ_Index109];
                var ρσ_Iter110 = ρσ_Iterable(module_.nonlocalvars);
                for (var ρσ_Index110 = 0; ρσ_Index110 < ρσ_Iter110.length; ρσ_Index110++) {
                    name = ρσ_Iter110[ρσ_Index110];
                    nonlocalvars[(typeof name === "number" && name < 0) ? nonlocalvars.length + name : name] = true;
                }
            }
            nonlocalvars = Object.getOwnPropertyNames(nonlocalvars).join(", ");
            if (nonlocalvars.length) {
                output.indent();
                output.print("var " + nonlocalvars);
                output.semicolon();
                output.newline();
            }
            var ρσ_Iter111 = ρσ_Iterable(imports);
            for (var ρσ_Index111 = 0; ρσ_Index111 < ρσ_Iter111.length; ρσ_Index111++) {
                module_ = ρσ_Iter111[ρσ_Index111];
                module_id = module_.module_id;
                if (module_id !== "__main__") {
                    output.indent();
                    if (module_id.indexOf(".") === -1) {
                        output.print("ρσ_modules." + module_id);
                    } else {
                        output.print("ρσ_modules[\"" + module_id + "\"]");
                    }
                    [output.space(), output.print("="), output.space(), output.print("{}")];
                    output.end_statement();
                }
            }
            var ρσ_Iter112 = ρσ_Iterable(imports);
            for (var ρσ_Index112 = 0; ρσ_Index112 < ρσ_Iter112.length; ρσ_Index112++) {
                module_ = ρσ_Iter112[ρσ_Index112];
                if (module_.module_id !== "__main__") {
                    print_module(module_, output);
                }
            }
        };
        Object.defineProperties(write_imports, {
            __argnames__ : {value: ["module", "output"]}
        });

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
        Object.defineProperties(write_main_name, {
            __argnames__ : {value: ["output"]}
        });

        function const_decl(js_version) {
            return "var";
        };
        Object.defineProperties(const_decl, {
            __argnames__ : {value: ["js_version"]}
        });

        function declare_exports(module_id, exports, output, docstrings) {
            var seen, v, symbol;
            seen = Object.create(null);
            if (output.option("keep_docstrings") && docstrings && docstrings.length) {
                exports.push((function(){
                    var ρσ_d = Object.create(null);
                    ρσ_d["name"] = "__doc__";
                    ρσ_d["refname"] = "ρσ_module_doc__";
                    return ρσ_d;
                }).call(this));
                [output.newline(), output.indent()];
                v = const_decl(output.js_version);
                [output.assign(v + " ρσ_module_doc__"), output.print(JSON.stringify(create_doctring(docstrings)))];
                output.end_statement();
            }
            output.newline();
            var ρσ_Iter113 = ρσ_Iterable(exports);
            for (var ρσ_Index113 = 0; ρσ_Index113 < ρσ_Iter113.length; ρσ_Index113++) {
                symbol = ρσ_Iter113[ρσ_Index113];
                if (!Object.prototype.hasOwnProperty.call(seen, symbol.name)) {
                    output.indent();
                    if (module_id.indexOf(".") === -1) {
                        output.print("ρσ_modules." + module_id + "." + symbol.name);
                    } else {
                        output.print("ρσ_modules[\"" + module_id + "\"]." + symbol.name);
                    }
                    [output.space(), output.print("="), output.space(), output.print(symbol.refname || symbol.name)];
                    seen[ρσ_bound_index(symbol.name, seen)] = true;
                    output.end_statement();
                }
            }
        };
        Object.defineProperties(declare_exports, {
            __argnames__ : {value: ["module_id", "exports", "output", "docstrings"]}
        });

        function prologue(module, output) {
            var v, needs_yield;
            if (output.options.omit_baselib) {
                return;
            }
            output.indent();
            v = const_decl(output.js_version);
            [output.print(v), output.space()];
            output.spaced.apply(output, "ρσ_iterator_symbol = (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") ? Symbol.iterator : \"iterator-Symbol-5d0927e5554349048cf0e3762a228256\"".split(" "));
            output.end_statement();
            [output.indent(), output.print(v), output.space()];
            output.spaced.apply(output, "ρσ_kwargs_symbol = (typeof Symbol === \"function\") ? Symbol(\"kwargs-object\") : \"kwargs-object-Symbol-5d0927e5554349048cf0e3762a228256\"".split(" "));
            output.end_statement();
            [output.indent(), output.spaced("var", "ρσ_cond_temp,", "ρσ_expr_temp,", "ρσ_last_exception"), 
            output.end_statement()];
            [output.indent(), output.spaced("var", "ρσ_object_counter", "=", "0"), output.end_statement()];
            if (output.options.js_version > 5) {
                [output.indent(), output.spaced("if(", "typeof", "HTMLCollection", "!==", "\"undefined\")", "NodeList.prototype[Symbol.iterator]", "=", "HTMLCollection.prototype[Symbol.iterator]", "=", "NamedNodeMap.prototype[Symbol.iterator]", "=", "Array.prototype[Symbol.iterator]")];
                output.end_statement();
            }
            needs_yield = output.options.js_version < 6 && module.baselib["yield"];
            if (needs_yield) {
                output.dump_yield();
            }
            if (!output.options.baselib_plain) {
                throw new ValueError("The baselib is missing! Remember to set the baselib_plain field on the options for OutputStream");
            }
            output.print(output.options.baselib_plain);
            output.end_statement();
        };
        Object.defineProperties(prologue, {
            __argnames__ : {value: ["module", "output"]}
        });

        function print_top_level(self, output) {
            var is_main;
            is_main = output.is_main();
            function write_docstrings() {
                var v;
                if (is_main && output.option("keep_docstrings") && self.docstrings && self.docstrings.length) {
                    [output.newline(), output.indent()];
                    v = const_decl(output.js_version);
                    [output.assign(v + " ρσ_module_doc__"), output.print(JSON.stringify(create_doctring(self.docstrings)))];
                    output.end_statement();
                }
            };

            if (output.option("private_scope") && is_main) {
                output.with_parens(function () {
                    output.print("function()");
                    output.with_block(function () {
                        output.indent();
                        output.print("\"use strict\"");
                        output.end_statement();
                        prologue(self, output);
                        write_imports(self, output);
                        output.newline();
                        output.indent();
                        output.with_parens(function () {
                            output.print("function()");
                            output.with_block(function () {
                                write_main_name(output);
                                output.newline();
                                declare_vars(self.localvars, output);
                                display_body(self.body, true, output);
                                output.newline();
                                write_docstrings();
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
                    prologue(self, output);
                    write_imports(self, output);
                    write_main_name(output);
                }
                declare_vars(self.localvars, output);
                display_body(self.body, true, output);
            }
        };
        Object.defineProperties(print_top_level, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_module(self, output) {
            function output_module(output) {
                declare_vars(self.localvars, output);
                display_body(self.body, true, output);
                declare_exports(self.module_id, self.exports, output, self.docstrings);
            };
            Object.defineProperties(output_module, {
                __argnames__ : {value: ["output"]}
            });

            output.newline();
            output.indent();
            output.with_parens(function () {
                output.print("function()");
                output.with_block(function () {
                    var okey, cached, cobj, cname, symdef, co, raw, js_version, keep_docstrings, beautify;
                    if (output.option("write_name")) {
                        output.indent();
                        output.print("var ");
                        output.assign("__name__");
                        output.print("\"" + self.module_id + "\"");
                        output.semicolon();
                        output.newline();
                    }
                    function output_key(beautify, keep_docstrings, js_version) {
                        return "beautify:" + beautify + " keep_docstrings:" + keep_docstrings + " js_version:" + js_version;
                    };
                    Object.defineProperties(output_key, {
                        __argnames__ : {value: ["beautify", "keep_docstrings", "js_version"]}
                    });

                    okey = output_key(output.option("beautify"), output.option("keep_docstrings"), output.option("js_version"));
                    if (self.is_cached && ρσ_in(okey, self.outputs)) {
                        output.print((ρσ_expr_temp = self.outputs)[(typeof okey === "number" && okey < 0) ? ρσ_expr_temp.length + okey : okey]);
                    } else {
                        output_module(output);
                        if (self.srchash && self.filename) {
                            cached = (function(){
                                var ρσ_d = Object.create(null);
                                ρσ_d["version"] = COMPILER_VERSION;
                                ρσ_d["signature"] = self.srchash;
                                ρσ_d["classes"] = Object.create(null);
                                ρσ_d["baselib"] = self.baselib;
                                ρσ_d["nonlocalvars"] = self.nonlocalvars;
                                ρσ_d["imported_module_ids"] = self.imported_module_ids;
                                ρσ_d["exports"] = ρσ_list_decorate([]);
                                ρσ_d["outputs"] = Object.create(null);
                                ρσ_d["discard_asserts"] = output.options.discard_asserts;
                                return ρσ_d;
                            }).call(this);
                            var ρσ_Iter114 = ρσ_Iterable(Object.keys(self.classes));
                            for (var ρσ_Index114 = 0; ρσ_Index114 < ρσ_Iter114.length; ρσ_Index114++) {
                                cname = ρσ_Iter114[ρσ_Index114];
                                cobj = (ρσ_expr_temp = self.classes)[(typeof cname === "number" && cname < 0) ? ρσ_expr_temp.length + cname : cname];
                                (ρσ_expr_temp = cached.classes)[(typeof cname === "number" && cname < 0) ? ρσ_expr_temp.length + cname : cname] = (function(){
                                    var ρσ_d = Object.create(null);
                                    ρσ_d["name"] = (function(){
                                        var ρσ_d = Object.create(null);
                                        ρσ_d["name"] = cobj.name.name;
                                        return ρσ_d;
                                    }).call(this);
                                    ρσ_d["static"] = cobj.static;
                                    ρσ_d["bound"] = cobj.bound;
                                    ρσ_d["classvars"] = cobj.classvars;
                                    return ρσ_d;
                                }).call(this);
                            }
                            var ρσ_Iter115 = ρσ_Iterable(self.exports);
                            for (var ρσ_Index115 = 0; ρσ_Index115 < ρσ_Iter115.length; ρσ_Index115++) {
                                symdef = ρσ_Iter115[ρσ_Index115];
                                cached.exports.push((function(){
                                    var ρσ_d = Object.create(null);
                                    ρσ_d["name"] = symdef.name;
                                    return ρσ_d;
                                }).call(this));
                            }
                            var ρσ_Iter116 = ρσ_Iterable(ρσ_list_decorate([ true, false ]));
                            for (var ρσ_Index116 = 0; ρσ_Index116 < ρσ_Iter116.length; ρσ_Index116++) {
                                beautify = ρσ_Iter116[ρσ_Index116];
                                var ρσ_Iter117 = ρσ_Iterable(ρσ_list_decorate([ true, false ]));
                                for (var ρσ_Index117 = 0; ρσ_Index117 < ρσ_Iter117.length; ρσ_Index117++) {
                                    keep_docstrings = ρσ_Iter117[ρσ_Index117];
                                    var ρσ_Iter118 = ρσ_Iterable(ρσ_list_decorate([ 5, 6 ]));
                                    for (var ρσ_Index118 = 0; ρσ_Index118 < ρσ_Iter118.length; ρσ_Index118++) {
                                        js_version = ρσ_Iter118[ρσ_Index118];
                                        co = new OutputStream((function(){
                                            var ρσ_d = Object.create(null);
                                            ρσ_d["beautify"] = beautify;
                                            ρσ_d["keep_docstrings"] = keep_docstrings;
                                            ρσ_d["js_version"] = js_version;
                                            ρσ_d["private_scope"] = false;
                                            ρσ_d["write_name"] = false;
                                            ρσ_d["discard_asserts"] = output.options.discard_asserts;
                                            return ρσ_d;
                                        }).call(this));
                                        co.with_indent(output.indentation(), function () {
                                            output_module(co);
                                        });
                                        raw = co.get();
                                        (ρσ_expr_temp = cached.outputs)[ρσ_bound_index(output_key(beautify, keep_docstrings, js_version), ρσ_expr_temp)] = raw;
                                    }
                                }
                            }
                            try {
                                writefile(cache_file_name(self.filename, output.options.module_cache_dir), JSON.stringify(cached, null, "\t"));
                            } catch (ρσ_Exception) {
                                ρσ_last_exception = ρσ_Exception;
                                if (ρσ_Exception instanceof Error) {
                                    var e = ρσ_Exception;
                                    console.error("Failed to write output cache file:", self.filename + "-cached", "with error:", e);
                                } else {
                                    throw ρσ_Exception;
                                }
                            }
                        }
                    }
                });
            });
            output.print("()");
            output.semicolon();
            output.newline();
        };
        Object.defineProperties(print_module, {
            __argnames__ : {value: ["self", "output"]}
        });

        function print_imports(container, output) {
            var is_first_aname, akey, argname, parts, q, ρσ_unpack, i, part, self;
            is_first_aname = true;
            function add_aname(aname, key, from_import) {
                if (is_first_aname) {
                    is_first_aname = false;
                } else {
                    output.indent();
                }
                output.print("var ");
                output.assign(aname);
                if (key.indexOf(".") === -1) {
                    [output.print("ρσ_modules."), output.print(key)];
                } else {
                    [output.print("ρσ_modules[\""), output.print(key), output.print("\"]")];
                }
                if (from_import) {
                    output.print(".");
                    output.print(from_import);
                }
                output.end_statement();
            };
            Object.defineProperties(add_aname, {
                __argnames__ : {value: ["aname", "key", "from_import"]}
            });

            var ρσ_Iter119 = ρσ_Iterable(container.imports);
            for (var ρσ_Index119 = 0; ρσ_Index119 < ρσ_Iter119.length; ρσ_Index119++) {
                self = ρσ_Iter119[ρσ_Index119];
                output.import_(self.module);
                if (self.argnames) {
                    var ρσ_Iter120 = ρσ_Iterable(self.argnames);
                    for (var ρσ_Index120 = 0; ρσ_Index120 < ρσ_Iter120.length; ρσ_Index120++) {
                        argname = ρσ_Iter120[ρσ_Index120];
                        akey = (argname.alias) ? argname.alias.name : argname.name;
                        add_aname(akey, self.key, argname.name);
                    }
                } else {
                    if (self.alias) {
                        add_aname(self.alias.name, self.key, false);
                    } else {
                        parts = self.key.split(".");
                        var ρσ_Iter121 = ρσ_Iterable(enumerate(parts));
                        for (var ρσ_Index121 = 0; ρσ_Index121 < ρσ_Iter121.length; ρσ_Index121++) {
                            ρσ_unpack = ρσ_Iter121[ρσ_Index121];
                            i = ρσ_unpack[0];
                            part = ρσ_unpack[1];
                            if (i === 0) {
                                add_aname(part, part, false);
                            } else {
                                q = parts.slice(0, i + 1).join(".");
                                output.indent();
                                output.spaced(q, "=", "ρσ_modules[\"" + q + "\"]");
                                output.end_statement();
                            }
                        }
                    }
                }
            }
        };
        Object.defineProperties(print_imports, {
            __argnames__ : {value: ["container", "output"]}
        });

        ρσ_modules["output.modules"].write_imports = write_imports;
        ρσ_modules["output.modules"].write_main_name = write_main_name;
        ρσ_modules["output.modules"].const_decl = const_decl;
        ρσ_modules["output.modules"].declare_exports = declare_exports;
        ρσ_modules["output.modules"].prologue = prologue;
        ρσ_modules["output.modules"].print_top_level = print_top_level;
        ρσ_modules["output.modules"].print_module = print_module;
        ρσ_modules["output.modules"].print_imports = print_imports;
    })();

    (function(){
        var __name__ = "output.codegen";
        var noop = ρσ_modules.utils.noop;

        var PRECEDENCE = ρσ_modules.parse.PRECEDENCE;

        var AST_Array = ρσ_modules.ast.AST_Array;
        var AST_Assign = ρσ_modules.ast.AST_Assign;
        var AST_BaseCall = ρσ_modules.ast.AST_BaseCall;
        var AST_Binary = ρσ_modules.ast.AST_Binary;
        var AST_BlockStatement = ρσ_modules.ast.AST_BlockStatement;
        var AST_Break = ρσ_modules.ast.AST_Break;
        var AST_Catch = ρσ_modules.ast.AST_Catch;
        var AST_Class = ρσ_modules.ast.AST_Class;
        var AST_Conditional = ρσ_modules.ast.AST_Conditional;
        var AST_Constant = ρσ_modules.ast.AST_Constant;
        var AST_Continue = ρσ_modules.ast.AST_Continue;
        var AST_Debugger = ρσ_modules.ast.AST_Debugger;
        var AST_Definitions = ρσ_modules.ast.AST_Definitions;
        var AST_Directive = ρσ_modules.ast.AST_Directive;
        var AST_Do = ρσ_modules.ast.AST_Do;
        var AST_Dot = ρσ_modules.ast.AST_Dot;
        var is_node_type = ρσ_modules.ast.is_node_type;
        var AST_EmptyStatement = ρσ_modules.ast.AST_EmptyStatement;
        var AST_Exit = ρσ_modules.ast.AST_Exit;
        var AST_ExpressiveObject = ρσ_modules.ast.AST_ExpressiveObject;
        var AST_Finally = ρσ_modules.ast.AST_Finally;
        var AST_ForIn = ρσ_modules.ast.AST_ForIn;
        var AST_ForJS = ρσ_modules.ast.AST_ForJS;
        var AST_Function = ρσ_modules.ast.AST_Function;
        var AST_Hole = ρσ_modules.ast.AST_Hole;
        var AST_If = ρσ_modules.ast.AST_If;
        var AST_Imports = ρσ_modules.ast.AST_Imports;
        var AST_Infinity = ρσ_modules.ast.AST_Infinity;
        var AST_Lambda = ρσ_modules.ast.AST_Lambda;
        var AST_ListComprehension = ρσ_modules.ast.AST_ListComprehension;
        var AST_LoopControl = ρσ_modules.ast.AST_LoopControl;
        var AST_NaN = ρσ_modules.ast.AST_NaN;
        var AST_New = ρσ_modules.ast.AST_New;
        var AST_Node = ρσ_modules.ast.AST_Node;
        var AST_Number = ρσ_modules.ast.AST_Number;
        var AST_Object = ρσ_modules.ast.AST_Object;
        var AST_ObjectKeyVal = ρσ_modules.ast.AST_ObjectKeyVal;
        var AST_ObjectProperty = ρσ_modules.ast.AST_ObjectProperty;
        var AST_PropAccess = ρσ_modules.ast.AST_PropAccess;
        var AST_RegExp = ρσ_modules.ast.AST_RegExp;
        var AST_Return = ρσ_modules.ast.AST_Return;
        var AST_Set = ρσ_modules.ast.AST_Set;
        var AST_Seq = ρσ_modules.ast.AST_Seq;
        var AST_SimpleStatement = ρσ_modules.ast.AST_SimpleStatement;
        var AST_Splice = ρσ_modules.ast.AST_Splice;
        var AST_Statement = ρσ_modules.ast.AST_Statement;
        var AST_StatementWithBody = ρσ_modules.ast.AST_StatementWithBody;
        var AST_String = ρσ_modules.ast.AST_String;
        var AST_Sub = ρσ_modules.ast.AST_Sub;
        var AST_ItemAccess = ρσ_modules.ast.AST_ItemAccess;
        var AST_Symbol = ρσ_modules.ast.AST_Symbol;
        var AST_This = ρσ_modules.ast.AST_This;
        var AST_Throw = ρσ_modules.ast.AST_Throw;
        var AST_Toplevel = ρσ_modules.ast.AST_Toplevel;
        var AST_Try = ρσ_modules.ast.AST_Try;
        var AST_Unary = ρσ_modules.ast.AST_Unary;
        var AST_UnaryPrefix = ρσ_modules.ast.AST_UnaryPrefix;
        var AST_Undefined = ρσ_modules.ast.AST_Undefined;
        var AST_Var = ρσ_modules.ast.AST_Var;
        var AST_VarDef = ρσ_modules.ast.AST_VarDef;
        var AST_Assert = ρσ_modules.ast.AST_Assert;
        var AST_Verbatim = ρσ_modules.ast.AST_Verbatim;
        var AST_While = ρσ_modules.ast.AST_While;
        var AST_With = ρσ_modules.ast.AST_With;
        var AST_Yield = ρσ_modules.ast.AST_Yield;
        var TreeWalker = ρσ_modules.ast.TreeWalker;
        var AST_Existential = ρσ_modules.ast.AST_Existential;

        var print_try = ρσ_modules["output.exceptions"].print_try;
        var print_catch = ρσ_modules["output.exceptions"].print_catch;
        var print_finally = ρσ_modules["output.exceptions"].print_finally;

        var print_class = ρσ_modules["output.classes"].print_class;

        var print_array = ρσ_modules["output.literals"].print_array;
        var print_obj_literal = ρσ_modules["output.literals"].print_obj_literal;
        var print_object = ρσ_modules["output.literals"].print_object;
        var print_set = ρσ_modules["output.literals"].print_set;
        var print_regexp = ρσ_modules["output.literals"].print_regexp;

        var print_do_loop = ρσ_modules["output.loops"].print_do_loop;
        var print_while_loop = ρσ_modules["output.loops"].print_while_loop;
        var print_for_loop_body = ρσ_modules["output.loops"].print_for_loop_body;
        var print_for_in = ρσ_modules["output.loops"].print_for_in;
        var print_list_comprehension = ρσ_modules["output.loops"].print_list_comprehension;

        var print_top_level = ρσ_modules["output.modules"].print_top_level;
        var print_imports = ρσ_modules["output.modules"].print_imports;

        var print_getattr = ρσ_modules["output.operators"].print_getattr;
        var print_getitem = ρσ_modules["output.operators"].print_getitem;
        var print_rich_getitem = ρσ_modules["output.operators"].print_rich_getitem;
        var print_splice_assignment = ρσ_modules["output.operators"].print_splice_assignment;
        var print_unary_prefix = ρσ_modules["output.operators"].print_unary_prefix;
        var print_binary_op = ρσ_modules["output.operators"].print_binary_op;
        var print_assign = ρσ_modules["output.operators"].print_assign;
        var print_conditional = ρσ_modules["output.operators"].print_conditional;
        var print_seq = ρσ_modules["output.operators"].print_seq;
        var print_existential = ρσ_modules["output.operators"].print_existential;

        var print_function = ρσ_modules["output.functions"].print_function;
        var print_function_call = ρσ_modules["output.functions"].print_function_call;

        var print_bracketed = ρσ_modules["output.statements"].print_bracketed;
        var first_in_statement = ρσ_modules["output.statements"].first_in_statement;
        var force_statement = ρσ_modules["output.statements"].force_statement;
        var print_with = ρσ_modules["output.statements"].print_with;
        var print_assert = ρσ_modules["output.statements"].print_assert;

        var make_block = ρσ_modules["output.utils"].make_block;
        var make_num = ρσ_modules["output.utils"].make_num;

        function generate_code() {
            function DEFPRINT(nodetype, generator) {
                nodetype.prototype._codegen = generator;
            };
            Object.defineProperties(DEFPRINT, {
                __argnames__ : {value: ["nodetype", "generator"]}
            });

            AST_Node.prototype.print = (function() {
                var ρσ_anonfunc = function (stream, force_parens) {
                    var self, generator;
                    self = this;
                    generator = self._codegen;
                    stream.push_node(self);
                    if (force_parens || self.needs_parens(stream)) {
                        stream.with_parens(function () {
                            self.add_comments(stream);
                            generator(self, stream);
                        });
                    } else {
                        self.add_comments(stream);
                        generator(self, stream);
                    }
                    stream.pop_node();
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["stream", "force_parens"]}
                });
                return ρσ_anonfunc;
            })();
            AST_Node.prototype.add_comments = (function() {
                var ρσ_anonfunc = function (output) {
                    var c, self, start, comments, comm;
                    c = output.option("comments");
                    self = this;
                    if (c) {
                        start = self.start;
                        if (start && !start._comments_dumped) {
                            start._comments_dumped = true;
                            comments = start.comments_before;
                            if (is_node_type(self, AST_Exit) && self.value && self.value.start.comments_before.length > 0) {
                                comments = (comments || ρσ_list_decorate([])).concat(self.value.start.comments_before);
                                self.value.start.comments_before = ρσ_list_decorate([]);
                            }
                            if (c.test) {
                                comments = comments.filter((function() {
                                    var ρσ_anonfunc = function (comment) {
                                        return c.test(comment.value);
                                    };
                                    Object.defineProperties(ρσ_anonfunc, {
                                        __argnames__ : {value: ["comment"]}
                                    });
                                    return ρσ_anonfunc;
                                })());
                            } else if (typeof c === "function") {
                                comments = comments.filter((function() {
                                    var ρσ_anonfunc = function (comment) {
                                        return c(self, comment);
                                    };
                                    Object.defineProperties(ρσ_anonfunc, {
                                        __argnames__ : {value: ["comment"]}
                                    });
                                    return ρσ_anonfunc;
                                })());
                            }
                            var ρσ_Iter122 = ρσ_Iterable(comments);
                            for (var ρσ_Index122 = 0; ρσ_Index122 < ρσ_Iter122.length; ρσ_Index122++) {
                                comm = ρσ_Iter122[ρσ_Index122];
                                if (comm.type === "comment1") {
                                    output.print("//" + comm.value + "\n");
                                    output.indent();
                                } else if (comm.type === "comment2") {
                                    output.print("/*" + comm.value + "*/");
                                    if (start.nlb) {
                                        output.print("\n");
                                        output.indent();
                                    } else {
                                        output.space();
                                    }
                                }
                            }
                        }
                    }
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output"]}
                });
                return ρσ_anonfunc;
            })();
            function PARENS(nodetype, func) {
                nodetype.prototype.needs_parens = func;
            };
            Object.defineProperties(PARENS, {
                __argnames__ : {value: ["nodetype", "func"]}
            });

            PARENS(AST_Node, function () {
                return false;
            });
            PARENS(AST_Function, (function() {
                var ρσ_anonfunc = function (output) {
                    return first_in_statement(output);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output"]}
                });
                return ρσ_anonfunc;
            })());
            PARENS(AST_Object, (function() {
                var ρσ_anonfunc = function (output) {
                    return first_in_statement(output);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output"]}
                });
                return ρσ_anonfunc;
            })());
            PARENS(AST_Unary, (function() {
                var ρσ_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    return is_node_type(p, AST_PropAccess) && p.expression === this;
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output"]}
                });
                return ρσ_anonfunc;
            })());
            PARENS(AST_Seq, (function() {
                var ρσ_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    return is_node_type(p, AST_Unary) || is_node_type(p, AST_VarDef) || is_node_type(p, AST_Dot) || is_node_type(p, AST_ObjectProperty) || is_node_type(p, AST_Conditional);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output"]}
                });
                return ρσ_anonfunc;
            })());
            PARENS(AST_Binary, (function() {
                var ρσ_anonfunc = function (output) {
                    var p, po, pp, so, sp;
                    p = output.parent();
                    if (is_node_type(p, AST_BaseCall) && p.expression === this) {
                        return true;
                    }
                    if (is_node_type(p, AST_Unary)) {
                        return true;
                    }
                    if (is_node_type(p, AST_PropAccess) && p.expression === this) {
                        return true;
                    }
                    if (is_node_type(p, AST_Binary)) {
                        po = p.operator;
                        pp = PRECEDENCE[(typeof po === "number" && po < 0) ? PRECEDENCE.length + po : po];
                        so = this.operator;
                        sp = PRECEDENCE[(typeof so === "number" && so < 0) ? PRECEDENCE.length + so : so];
                        if (pp > sp || pp === sp && this === p.right && !(so === po && (so === "*" || so === "&&" || so === "||"))) {
                            return true;
                        }
                    }
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output"]}
                });
                return ρσ_anonfunc;
            })());
            PARENS(AST_PropAccess, (function() {
                var ρσ_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    if (is_node_type(p, AST_New) && p.expression === this) {
                        try {
                            this.walk(new TreeWalker((function() {
                                var ρσ_anonfunc = function (node) {
                                    if (is_node_type(node, AST_BaseCall)) {
                                        throw p;
                                    }
                                };
                                Object.defineProperties(ρσ_anonfunc, {
                                    __argnames__ : {value: ["node"]}
                                });
                                return ρσ_anonfunc;
                            })()));
                        } catch (ρσ_Exception) {
                            ρσ_last_exception = ρσ_Exception;
                            {
                                var ex = ρσ_Exception;
                                if (ex !== p) {
                                    throw ex;
                                }
                                return true;
                            } 
                        }
                    }
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output"]}
                });
                return ρσ_anonfunc;
            })());
            PARENS(AST_BaseCall, (function() {
                var ρσ_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    return is_node_type(p, AST_New) && p.expression === this;
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output"]}
                });
                return ρσ_anonfunc;
            })());
            PARENS(AST_New, (function() {
                var ρσ_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    if (this.args.length === 0 && (is_node_type(p, AST_PropAccess) || is_node_type(p, AST_BaseCall) && p.expression === this)) {
                        return true;
                    }
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output"]}
                });
                return ρσ_anonfunc;
            })());
            PARENS(AST_Number, (function() {
                var ρσ_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    if (this.value < 0 && is_node_type(p, AST_PropAccess) && p.expression === this) {
                        return true;
                    }
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output"]}
                });
                return ρσ_anonfunc;
            })());
            PARENS(AST_NaN, (function() {
                var ρσ_anonfunc = function (output) {
                    var p;
                    p = output.parent();
                    if (is_node_type(p, AST_PropAccess) && p.expression === this) {
                        return true;
                    }
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output"]}
                });
                return ρσ_anonfunc;
            })());
            function assign_and_conditional_paren_rules(output) {
                var p;
                p = output.parent();
                if (is_node_type(p, AST_Unary)) {
                    return true;
                }
                if (is_node_type(p, AST_Binary) && !is_node_type(p, AST_Assign)) {
                    return true;
                }
                if (is_node_type(p, AST_BaseCall) && p.expression === this) {
                    return true;
                }
                if (is_node_type(p, AST_Conditional) && p.condition === this) {
                    return true;
                }
                if (is_node_type(p, AST_PropAccess) && p.expression === this) {
                    return true;
                }
            };
            Object.defineProperties(assign_and_conditional_paren_rules, {
                __argnames__ : {value: ["output"]}
            });

            PARENS(AST_Assign, assign_and_conditional_paren_rules);
            PARENS(AST_Conditional, assign_and_conditional_paren_rules);
            DEFPRINT(AST_Directive, (function() {
                var ρσ_anonfunc = function (self, output) {
                    output.print_string(self.value);
                    output.semicolon();
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Debugger, (function() {
                var ρσ_anonfunc = function (self, output) {
                    output.print("debugger");
                    output.semicolon();
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            AST_StatementWithBody.prototype._do_print_body = (function() {
                var ρσ_anonfunc = function (output) {
                    force_statement(this.body, output);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output"]}
                });
                return ρσ_anonfunc;
            })();
            DEFPRINT(AST_Statement, (function() {
                var ρσ_anonfunc = function (self, output) {
                    self.body.print(output);
                    output.semicolon();
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Toplevel, print_top_level);
            DEFPRINT(AST_Imports, print_imports);
            DEFPRINT(AST_SimpleStatement, (function() {
                var ρσ_anonfunc = function (self, output) {
                    if (!is_node_type(self.body, AST_EmptyStatement)) {
                        self.body.print(output);
                        output.semicolon();
                    }
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_BlockStatement, (function() {
                var ρσ_anonfunc = function (self, output) {
                    print_bracketed(self, output);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_EmptyStatement, (function() {
                var ρσ_anonfunc = function (self, output) {
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Do, print_do_loop);
            DEFPRINT(AST_While, print_while_loop);
            AST_ForIn.prototype._do_print_body = print_for_loop_body;
            DEFPRINT(AST_ForIn, print_for_in);
            AST_ForJS.prototype._do_print_body = (function() {
                var ρσ_anonfunc = function (output) {
                    var self;
                    self = this;
                    output.with_block(function () {
                        var stmt;
                        var ρσ_Iter123 = ρσ_Iterable(self.body.body);
                        for (var ρσ_Index123 = 0; ρσ_Index123 < ρσ_Iter123.length; ρσ_Index123++) {
                            stmt = ρσ_Iter123[ρσ_Index123];
                            output.indent();
                            stmt.print(output);
                            output.newline();
                        }
                    });
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output"]}
                });
                return ρσ_anonfunc;
            })();
            DEFPRINT(AST_ForJS, (function() {
                var ρσ_anonfunc = function (self, output) {
                    output.print("for");
                    output.space();
                    output.with_parens(function () {
                        self.condition.print(output);
                    });
                    output.space();
                    self._do_print_body(output);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_ListComprehension, print_list_comprehension);
            DEFPRINT(AST_With, print_with);
            DEFPRINT(AST_Assert, print_assert);
            AST_Lambda.prototype._do_print = print_function;
            DEFPRINT(AST_Lambda, (function() {
                var ρσ_anonfunc = function (self, output) {
                    self._do_print(output);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            AST_Class.prototype._do_print = print_class;
            DEFPRINT(AST_Class, (function() {
                var ρσ_anonfunc = function (self, output) {
                    self._do_print(output);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            AST_Exit.prototype._do_print = (function() {
                var ρσ_anonfunc = function (output, kind) {
                    var self;
                    self = this;
                    output.print(kind);
                    if (self.value) {
                        output.space();
                        self.value.print(output);
                    }
                    output.semicolon();
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output", "kind"]}
                });
                return ρσ_anonfunc;
            })();
            DEFPRINT(AST_Yield, (function() {
                var ρσ_anonfunc = function (self, output) {
                    self._do_print(output, "yield" + ((self.is_yield_from) ? "*" : ""));
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Return, (function() {
                var ρσ_anonfunc = function (self, output) {
                    self._do_print(output, "return");
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Throw, (function() {
                var ρσ_anonfunc = function (self, output) {
                    self._do_print(output, "throw");
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            AST_LoopControl.prototype._do_print = (function() {
                var ρσ_anonfunc = function (output, kind) {
                    output.print(kind);
                    if (this.label) {
                        output.space();
                        this.label.print(output);
                    }
                    output.semicolon();
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output", "kind"]}
                });
                return ρσ_anonfunc;
            })();
            DEFPRINT(AST_Break, (function() {
                var ρσ_anonfunc = function (self, output) {
                    self._do_print(output, "break");
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Continue, (function() {
                var ρσ_anonfunc = function (self, output) {
                    self._do_print(output, "continue");
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
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
                if (is_node_type(self.body, AST_Do) && output.option("ie_proof")) {
                    make_block(self.body, output);
                    return;
                }
                b = self.body;
                while (true) {
                    if (is_node_type(b, AST_If)) {
                        if (!b.alternative) {
                            make_block(self.body, output);
                            return;
                        }
                        b = b.alternative;
                    } else if (is_node_type(b, AST_StatementWithBody)) {
                        b = b.body;
                    } else {
                        break;
                    }
                }
                force_statement(self.body, output);
            };
            Object.defineProperties(make_then, {
                __argnames__ : {value: ["self", "output"]}
            });

            DEFPRINT(AST_If, (function() {
                var ρσ_anonfunc = function (self, output) {
                    output.print("if");
                    output.space();
                    output.with_parens(function () {
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
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Try, print_try);
            DEFPRINT(AST_Catch, print_catch);
            DEFPRINT(AST_Finally, print_finally);
            AST_Definitions.prototype._do_print = (function() {
                var ρσ_anonfunc = function (output, kind) {
                    var ρσ_unpack, i, def_, p, in_for, avoid_semicolon;
                    output.print(kind);
                    output.space();
                    var ρσ_Iter124 = ρσ_Iterable(enumerate(this.definitions));
                    for (var ρσ_Index124 = 0; ρσ_Index124 < ρσ_Iter124.length; ρσ_Index124++) {
                        ρσ_unpack = ρσ_Iter124[ρσ_Index124];
                        i = ρσ_unpack[0];
                        def_ = ρσ_unpack[1];
                        if (i) {
                            output.comma();
                        }
                        def_.print(output);
                    }
                    p = output.parent();
                    in_for = is_node_type(p, AST_ForIn);
                    avoid_semicolon = in_for && p.init === this;
                    if (!avoid_semicolon) {
                        output.semicolon();
                    }
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["output", "kind"]}
                });
                return ρσ_anonfunc;
            })();
            DEFPRINT(AST_Var, (function() {
                var ρσ_anonfunc = function (self, output) {
                    self._do_print(output, "var");
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            function parenthesize_for_noin(node, output, noin) {
                if (!noin) {
                    node.print(output);
                } else {
                    try {
                        node.walk(new TreeWalker((function() {
                            var ρσ_anonfunc = function (node) {
                                if (is_node_type(node, AST_Binary) && node.operator === "in") {
                                    throw output;
                                }
                            };
                            Object.defineProperties(ρσ_anonfunc, {
                                __argnames__ : {value: ["node"]}
                            });
                            return ρσ_anonfunc;
                        })()));
                        node.print(output);
                    } catch (ρσ_Exception) {
                        ρσ_last_exception = ρσ_Exception;
                        {
                            var ex = ρσ_Exception;
                            if (ex !== output) {
                                throw ex;
                            }
                            node.print(output, true);
                        } 
                    }
                }
            };
            Object.defineProperties(parenthesize_for_noin, {
                __argnames__ : {value: ["node", "output", "noin"]}
            });

            DEFPRINT(AST_VarDef, (function() {
                var ρσ_anonfunc = function (self, output) {
                    var p, noin;
                    self.name.print(output);
                    if (self.value) {
                        output.assign("");
                        p = output.parent(1);
                        noin = is_node_type(p, AST_ForIn);
                        parenthesize_for_noin(self.value, output, noin);
                    }
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_BaseCall, print_function_call);
            AST_Seq.prototype._do_print = print_seq;
            DEFPRINT(AST_Seq, (function() {
                var ρσ_anonfunc = function (self, output) {
                    self._do_print(output);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Dot, print_getattr);
            DEFPRINT(AST_Sub, print_getitem);
            DEFPRINT(AST_ItemAccess, print_rich_getitem);
            DEFPRINT(AST_Splice, print_splice_assignment);
            DEFPRINT(AST_UnaryPrefix, print_unary_prefix);
            DEFPRINT(AST_Binary, print_binary_op);
            DEFPRINT(AST_Existential, print_existential);
            DEFPRINT(AST_Assign, print_assign);
            DEFPRINT(AST_Conditional, print_conditional);
            DEFPRINT(AST_Array, print_array);
            DEFPRINT(AST_ExpressiveObject, print_obj_literal);
            DEFPRINT(AST_Object, print_object);
            DEFPRINT(AST_ObjectKeyVal, (function() {
                var ρσ_anonfunc = function (self, output) {
                    self.key.print(output);
                    output.colon();
                    self.value.print(output);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Set, print_set);
            AST_Symbol.prototype.definition = function () {
                return this.thedef;
            };
            DEFPRINT(AST_Symbol, (function() {
                var ρσ_anonfunc = function (self, output) {
                    var def_;
                    def_ = self.definition();
                    output.print_name((def_) ? def_.mangled_name || def_.name : self.name);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Undefined, (function() {
                var ρσ_anonfunc = function (self, output) {
                    output.print("void 0");
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Hole, noop);
            DEFPRINT(AST_Infinity, (function() {
                var ρσ_anonfunc = function (self, output) {
                    output.print("1/0");
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_NaN, (function() {
                var ρσ_anonfunc = function (self, output) {
                    output.print("0/0");
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_This, (function() {
                var ρσ_anonfunc = function (self, output) {
                    output.print("this");
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Constant, (function() {
                var ρσ_anonfunc = function (self, output) {
                    output.print(self.value);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_String, (function() {
                var ρσ_anonfunc = function (self, output) {
                    output.print_string(self.value);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Verbatim, (function() {
                var ρσ_anonfunc = function (self, output) {
                    output.print(self.value);
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_Number, (function() {
                var ρσ_anonfunc = function (self, output) {
                    output.print(make_num(self.value));
                };
                Object.defineProperties(ρσ_anonfunc, {
                    __argnames__ : {value: ["self", "output"]}
                });
                return ρσ_anonfunc;
            })());
            DEFPRINT(AST_RegExp, print_regexp);
        };

        ρσ_modules["output.codegen"].generate_code = generate_code;
    })();

    (function(){

        var __name__ = "__main__";


        var ast, ast_node;
        var DefaultsError = ρσ_modules.utils.DefaultsError;
        var string_template = ρσ_modules.utils.string_template;

        var ImportError = ρσ_modules.errors.ImportError;
        var SyntaxError = ρσ_modules.errors.SyntaxError;

        var ALL_KEYWORDS = ρσ_modules.tokenizer.ALL_KEYWORDS;
        var IDENTIFIER_PAT = ρσ_modules.tokenizer.IDENTIFIER_PAT;
        var tokenizer = ρσ_modules.tokenizer.tokenizer;

        var parse = ρσ_modules.parse.parse;
        var NATIVE_CLASSES = ρσ_modules.parse.NATIVE_CLASSES;
        var compile_time_decorators = ρσ_modules.parse.compile_time_decorators;

        var OutputStream = ρσ_modules["output.stream"].OutputStream;

        var generate_code = ρσ_modules["output.codegen"].generate_code;

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
            ast = ρσ_modules["ast"];
            var ρσ_Iter125 = ρσ_Iterable(ast);
            for (var ρσ_Index125 = 0; ρσ_Index125 < ρσ_Iter125.length; ρσ_Index125++) {
                ast_node = ρσ_Iter125[ρσ_Index125];
                if (ast_node.substr(0, 4) === "AST_") {
                    exports[(typeof ast_node === "number" && ast_node < 0) ? exports.length + ast_node : ast_node] = ast[(typeof ast_node === "number" && ast_node < 0) ? ast.length + ast_node : ast_node];
                }
            }
        }
    })();
})();