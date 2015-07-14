var _$rapyd$_iterator_symbol = (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") ? Symbol.iterator : "iterator-Symbol-5d0927e5554349048cf0e3762a228256";
var _$rapyd$_kwargs_symbol = (typeof Symbol === "function") ? Symbol("kwargs-object") : "kwargs-object-Symbol-5d0927e5554349048cf0e3762a228256";
var abs = (function abs() {
            return Math.abs;
        })();
var max = (function max() {
            return Math.max;
        })();
var min = (function min() {
            return Math.min;
        })();
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
function dir(item) {
            var arr;
            arr = [];
            for (var i in item) {
                arr.push(i);
            }
            return arr;
        }
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
                ans[_$rapyd$_iterator_symbol] = function() {
                    return this;
                };
                return ans;
            }
            if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
                iterator = typeof Map === "function" && iterable instanceof Map ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
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
                ans[_$rapyd$_iterator_symbol] = function() {
                    return this;
                };
                return ans;
            }
            return enumerate(Object.keys(iterable));
        }
function iter(iterable) {
            var ans;
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
            if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
                return typeof Map === "function" && iterable instanceof Map ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
            }
            return iter(Object.keys(iterable));
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
            return isString ? arr.join("") : arr;
        }
function list(iterable) {
            var iterator, ans, result;
            if (Array.isArray(iterable)) {
                return iterable.slice();
            }
            if (typeof iterable === "string") {
                return iterable.split("");
            }
            if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
                iterator = typeof Map === "function" && iterable instanceof Map ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
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
function _$rapyd$_extends(child, parent) {
            child.prototype = Object.create(parent.prototype);
            child.prototype.constructor = child;
        }
function _$rapyd$_flatten(arr) {
            var ans, value;
            ans = [];
            for (var i=0; i<arr.length; i++) {
                value = arr[i];
                if (Array.isArray(value)) {
                    ans = ans.concat(_$rapyd$_flatten(value));
                } else {
                    ans.push(value);
                }
            }
            return ans;
        }
var _$rapyd$_in = (function _$rapyd$_in() {
            if (typeof Map === "function" && typeof Set === "function") {
                return function(val, arr) {
                    if (Array.isArray(arr) || typeof arr === "string") {
                        return arr.indexOf(val) !== -1;
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
                return arr.hasOwnProperty(val);
            };
        })();
function _$rapyd$_Iterable(iterable) {
            var iterator, ans, result;
            if (Array.isArray(iterable) || typeof iterable === "string") {
                return iterable;
            }
            if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
                iterator = typeof Map === "function" && iterable instanceof Map ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
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
function _$rapyd$_mixin(target, source, overwrite) {
            for (var i in source) {
                if (source.hasOwnProperty(i) && overwrite || typeof target[i] === "undefined") {
                    target[i] = source[i];
                }
            }
        }
function _$rapyd$_print() {
            if (typeof console === "object") {
                console.log.apply(console, arguments);
            }
        }
function range(start, stop, step) {
            var length;
            if (arguments.length <= 1) {
                stop = start || 0;
                start = 0;
            }
            step = arguments[2] || 1;
            length = Math.max(Math.ceil((stop - start) / step), 0);
            return (function(){
                var d = {};
                d[_$rapyd$_iterator_symbol] = function() {
                    return this;
                };
                d["_i"] = start - step;
                d["_idx"] = -1;
                d["next"] = function() {
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
                return d;
            })();
        }
function reversed(iterable) {
            var ans;
            if (Array.isArray(iterable) || typeof iterable === "string") {
                ans = {
                    "_i": iterable.length,
                    "next": function() {
                        this._i -= 1;
                        if (this._i > -1) {
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
            throw TypeError("reversed() can only be called on arrays or strings");
        }
function sum(arr, start) {
            return arr.reduce(function(prev, cur) {
                return prev + cur;
            }, start || 0);
        }
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
        }
function setattr(obj, name, value) {
            obj[name] = value;
        }
function hasattr(obj, name) {
            return name in obj;
        }
var _$rapyd$_desugar_kwargs = (function _$rapyd$_desugar_kwargs() {
            if (typeof Object.assign === "function") {
                return function() {
                    var ans;
                    ans = {};
                    ans[_$rapyd$_kwargs_symbol] = true;
                    return Object.assign.apply(ans, arguments);
                };
            }
            return function() {
                var ans, keys;
                ans = {};
                ans[_$rapyd$_kwargs_symbol] = true;
                for (var i = 0; i < arguments.length; i++) {
                    keys = Object.keys(arguments[i]);
                    for (var j = 0; j < keys.length; j++) {
                        ans[keys[j]] = arguments[i][keys[j]];
                    }
                }
                return ans;
            };
        })();
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

var _$rapyd$_regenerator = {};
!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; 

  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {

      module.exports = runtime;
    }

    return;
  }

  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {

    var generator = Object.create((outerFn || Generator).prototype);

    generator._invoke = makeInvokeMethod(
      innerFn, self || null,
      new Context(tryLocsList || [])
    );

    return generator;
  }
  runtime.wrap = wrap;

  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  var ContinueSentinel = {};

  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||

        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {

    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {

            result.value = unwrapped;
            return result;
          });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      var enqueueResult =

        previousPromise ? previousPromise.then(function() {
          return invoke(method, arg);
        }) : new Promise(function(resolve) {
          resolve(invoke(method, arg));
        });

      previousPromise = enqueueResult["catch"](function(ignored){});

      return enqueueResult;
    }

    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter 

      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {

            context.delegate = null;

            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {

                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {

              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            method = "throw";
            arg = record.arg;
            continue;
          }

          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {

            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {

          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {

              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;

          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {

    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {

          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {

          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {

        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(_$rapyd$_regenerator);
