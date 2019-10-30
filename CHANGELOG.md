version 0.7.20
========================

  * lint: Fix using a tuple for destructuring assignment not registering the defined symbols
  * Add head and body and base to elementmaker
  * Make the gettext tools available in the embedded compiler
  * re.pyj: Allow lookbehind assertions since they are supported in modern JS engines

version 0.7.19 
========================

  * Fix calling super-class methods in a method accepting `*args` not working
  * Fix list.pypop() removing the first instead of the last element
  * Fix exponentiation operator being used when js-version >= 6 rather than 7
  * Disallow assignments in while conditionals
  * Avoid unnecessary function annotations for functions that have empty signatures
  * Fix handing of "not in" operator when LHS is also a binary operator with higher precedence
  * Dont accept while statements without a trailing colon
  * msgfmt: fix parsing of escapes in msg strings
  * Fix missing enclosing brackets when translating an assert to an AssertionError
  * Fix comments at the bottom of the file not being output
  * Fix comments before first statement not being output for imported modules
  * Fix outputting top-level comments preventing output of baselib
  * Allow using NaN with the is operator
  * Fix anonymous function definitions inside class definitions hoisting their variables into the class prototype.
  * Fix gettext catalog generation when plurals are present
  * Fix int() not working correctly on floating point numbers which have exponential string representations.
  * Fix encoding of \u00ad
  * Fir repeated calls to random.seed() with the same seed not fully resetting the RNG.
  * Fix an error in handling chained binary operators involving comparison operators and an equality operator.
  * Ensure repr() of set is always correct

version 0.7.18
==================

  * Support the else: clause for try: statements
  * Use the JS ** operator instead of Math.pow() when --js-version > 5
  * Detect syntax errors of the form atomic token followed by atomic token
  * Fix ** operator not working with parenthesized unary expressions
  * Handle changed output from newer version of regenerator
  * Detect missing indentation for blocks as a syntax error
  * Linter: recognize pow() as a global function

version 0.7.17
==================

  * Fix attempts to access calss variables from inside instance methods not
    working
  * Fix stdlib random.random() method not working in the Edge browser

version 0.7.16
==================

  * Fix using function generators not working if installed version of uglify-js >= 3
  * Speedup the compiler slightly by making reading options more efficient

version 0.7.15
==================

  * Fix , flag for str.format thousands grouping not working
  * Fix iteration over TouchList not working in Safari
  * Fix }} escapes not being converted to } in f-strings

version 0.7.14
==================

  * Fix }} escapes not being processed correctly in format strings
  * Fix function definitions inside loops causing errors on ancient JS engines
  * Fix --js-version command line argument not working

version 0.7.13
==================

  * A uuid module for the standard library
  * Implement the full python interface for the min() and max() functions
  * Implement the full python interface for rangeobjects
  * Implement the divmod function from python

version 0.7.12
==================

  * Fix == failing when one of the arguments is None and the other is an object
  * Make the range() function return an object that behaves like the python range() object
  * Fix de-structuring assignment not working with iterators

version 0.7.11
==================

* Fix slice assignment not working
* Implement the global keyword
* Make list.pysort a stable sort on all JS engines
* Fix a typo that broke the REPL when XDG_CACHE_HOME is an absolute path

version 0.7.10
==================

* Fix passing of keyword args to the dict() function not working
* Improve the string representation of dicts and HTMLElements

version 0.7.9
==============

* BACWARDS INCOMPATIBLE: Make the `type()` function behave more like python's
  `type()` function. It now return the class of the passed in argument, instead
  of a string type name. For existing code that use `type()`, replace `type()` by
  `jstype()`

* Fix multiple newlines not being properly escaped in interpolated string literals

version 0.7.8
==============

* Fix --cache-dir option defaulting to current working directory instead of being disabled
* Fix display of option names containing more than a single hyphen
* Fix including backslashes and/or newlines in interpolated string literals
* Fix spurious error message from linter when using interpolated string literals

version 0.7.7
==============

* Implement literal string interpolation (PEP 498)
* Fix incorrect method binding when using the `bound_methods` scoped flag and calling the super-class `__init__()` method
* elementmaker: Ignore kwargs that have types other than bool, string or func
* gettext: Allow registering callbacks for notification when new translation data is installed
* Fix a rare crash in the linter

version 0.7.6
==============

* Fix nested imports beyond two levels not working
* Fix iteration over NodeList/HTMLCollection not working with ES 6 output in Edge and Chrome < 51
* Add WebSocket to the list of known global class names

version 0.7.5
==============

* Add an option to have the compiler generate all its cache files in a central
  directory. Use --cache-dir if you dislike having the `*.pyj-cached` files spread
  throughout your source code

version 0.7.4
==============

* Fix piping data into rapydscript for compilation not working

version 0.7.3
==============

* Fix extra-semicolon after chain assignment, and also avoid using a temp
  variable for non-destructuring chain assignments

* Fix a bug in the compiler cache system that could cause the compiler to
  output incorrect code when re-compiling a previously cached module that was
  imported from more than one other module.

* Add the builtin `pow()` function from python

* Workaround for a bug in the latest release of Chrome that broke the web REPL
  and embedded compiler.

version 0.7.2
==============

* Fix multiline string literals not working in some contexts, such as after
  return or yield keywords

* Add a scoped flag `hash_literals` to control whether `{}` literals generate
  JavaScript arrays or JavaScript hashes. Note that the `dict_literals` scoped
  flag takes precedence over this flag.

* Add a builtin function `get_module()` to get a reference to the module dicts
  for a previously imported module.

* Nicer error messages when web-repl-export is not called correctly

version 0.7.1
==============

* Make importing of non-aliased submodules `import module.submodule` work just
  like in python (the submodule name is bound into the parent namespace at
  the import statement rather than at import time)

* Fix referring to class variables not working. Now there is no need to use 
  `A.prototype.x` one can just do `A.x` and the compiler will handle it automatically,
  provided it knows that A is a class.

* Fix a regression in 0.6.0 that broke using @staticmethod for methods that accept arguments

version 0.7.0
==============

New features
-------------

 * Implement the existential operator, see the README for details.
 * Add the any() and all() builtin functions from python
 * Drop support for the JavaScript form of the conditional ternary operator
   (backwards incompatible). This was done mainly to free up the `?` operator for use
   as the existential operator.
 * Add a traceback module to the standard library that works like the python
   one 
 * Full support for negative indices on lists: `a=-1; b[a] is b[-1]`

Bug fixes
------------
 * Fix local variables in except: blocks not being declared
 * Make defining custom exception classes work just as in python (just subclass
   Exception and you are done)
 * Make the default `__repr__()` method use the base class implementation when available
 * Fix the del operator: Now your can use it to delete slices of arrays,
   variable names, etc.
 * Make the use of javascript reserved words as identifiers a compile time error, instead of a runtime error
 * Fix optimization of range() causing incorrect behavior when the stop expression is dynamic

version 0.6.4
==============

 * Support for docstrings in modules, classes and functions, just like python.
   By default the docstrings are discarded (except in the REPL). There is a
   compiler option to keep the docstrings as the `__doc__` attribute in the
   output JavaScript.

 * Add hexlify()/unhexlify() to the encodings stdlib module

 * Object literals now produce JavaScript objects that have no prototype. This
   makes them more like python dicts, in that there is no need to use
   Object.keys() and Object.hasOwnProperty() to iterate/test their keys.

version 0.6.3
==============

 * Add a module to the standard library to easily add python string methods to the JavaScript String object, if needed.
 * Fix isinstance('a', str) not working
 * Prevent an infinite loop in str.count() when needle is an empty string
 * Fix default values for function args not working when combined with annotations
 * Change the prefix used internally for RapydScript private symbols from `_$rapyd$_` to `ρσ_` as it makes the output JavaScript easier to read

version 0.6.2
==============

 * Support multiple inheritance, just as in python
 * Support method auto-binding for classes, just as in python, via an optional scoped flag. See the Method binding section in the README for details

version 0.6.1
==============

Bug fix release, fixing a couple of regressions in 0.6.0

 * Fix a regression caused by the new kwargs code that caused incorrect construction of classes when called with kwargs
 * Fix a regression when calling super class methods with kwargs

version 0.6.0
==============

New features
--------------------

 * Support for function type annotations, just like in Python 3. You can now
   create optional type annotation in RapydScript, exactly as you would in
   Python 3.

 * Support for *scoped flags* -- a mechanism to change the behavior of the
   compiler in sections of code using simple statements in the code. These work
   like compiler pragmas in C/C++ but have the additional feature that they are
   local to a scope -- i.e. they are automatically reset when leaving the scope
   they are defined in, which could be a function or a module or even a class.

 * Support for python style dicts using the exact same syntax as in python. The
   default syntax still creates JavaScript objects, but you can switch to
   python dicts using a scoped flag:
   ```py
   from __python__ import dict_literals, overload_getitem
   ```
   This will cause the default syntax to generate python dicts.

 * Add an **encodings.pyj** module to the stdlib which is very useful to convert
   between utf-8 bytearrays, base64 encoded strings, and native strings.

 * Implement repeating of string literals with the * operator
   `'a' * 3 == 'aaa'`


Bugfixes
----------

 * Enable use of keyword arguments/values when calling all functions, even if
   they have not been defined with keyword arguments.

 * Fix use of `*args/**kw` when calling functions that are the result of a
   complex expression, causing the expression to be evaluated twice.
 
 * Fix negative const index on expression containing a function call causing
   the function call to be executed twice

 * Fix --import-dirs not being used when recursively processing imports

version 0.5.2
==============

 * New module in stdlib: **aes.pyj** that implements the symmetric encryption
   ciphers: AES-GCM, AES-CBC, AES-CTR

 * Improved support for TypedArrays -- you can now iterate over them just like
   normal arrays and also repr() wors for them.

 * elementmaker.pyj: Allow setting HTML 5 boolean attributes using True/False.
   Fix E.iframe() not working.

 * Make the equality operators also work with javascript dicts (when
   javascript objects are used as dicts)


version 0.5.1
==============

Fix a bug that caused the equality operators to not work for lists. Also,
fix the new equality operators causing their arguments to be evaluated twice
when the arguments are expressions, such as function calls, generators, object
literals, etc.

version 0.5.0
==============

Below are listed all the major new features and backwards incompatible changes
since the creation of the rapydscript-ng fork, up to version 0.5.0

Backwards incompatible changes:
--------------------------------------------------------------

* A new module/import system that works just like python's, with modules in
  ``.pyj`` files and packages in directories with an ``__init__.pyj`` file.

* The equality operators now work with all container types (list/set/dict) as
  well as user defined classes that implement the `__eq__()` method, just as in
  python. 

* Remove the `to` and `til` operators

* Change syntax for embedded JavaScript literals. Now one uses a normal string
  literal, with the **v** prefix, for example:
  ```py
  for v'i = 0; i < 10; i++':
    pass
  ```
  The old compile time magic function `JS()` used for JavaScript literals has been removed.

* String literals now behave exactly like python. You can use raw string
  literal, escapes for unicode such as `\u2122` or `\N{...}` etc.

* Dict literals now do not treat identifiers as strings, so you can use arbitrary expressions as keys.

* Remove the ``@kwargs`` decorator. Keyword arguments now work seamlessly, just
  as in python.

Major new features:
--------------------

* There is now an in browser REPL (Read-Eval-Print-Loop) for RapydScript,
  available at: https://sw.kovidgoyal.net/rapydscript/repl/

* There is now a linter that performs pyflakes style of undefined/unused
  checks.

* Instructions for easily embedding the RapydScript compiler in a webapp are
  now in the README.

* A new stdlib module: **elementmaker.pyj** that allows for easy creation of
  DOM trees within RapydScript code. For example:
  ```py
  from elementmaker import E
  E.div(class_='mydiv', title='A tooltip', data_special='xxx',
	E.a(href='javascript: void(0)', onclick=def():
		# handle the click event
	),
	'Some text'
  )
  ```

* All the python string functions are now available, including `format()`. However, for reasons of
  compatibility with external javascript code, they are not implemented as
  methods on string objects, instead, use the global ```str``` object, for
  example:
  ```py
  str.format('{:02d} {}', 1, "wow") == '01 wow'
  ```
  There is a convenience module in the stdlib to add these functions to the
  JavaScript String object, if needed.

* Support dict and set comprehensions

* Support the python conditional operator syntax: ```a if b else c```

New features
-------------------------

* Implement `str()` and `repr()` functions that work well for JavaScript arrays and
  Objects as well as your own custom classes that define the `__repr__()` and
  `__str__()` methods

* A builtin `sorted()` function that behaves like python's

* A builtin `id()` function that behaves like python's (only for objects
  defined in RapydScript)

* Support for dynamic properties just as in python with the `@property` decorator

* Allow trailing commas in function calls and function definitions

* Allow specifying multiple locations to search for modules to import

* Allow iteration `(for x in ...)` to work for DOM based array like containers
  such as `NodeList` and `NamedNodeMap` even when they come from a different frame.

* Support for internationalization, works just like in python (see README for
  details).

* Linter: Allow suppressing errors at file level as well

* Automatic concantenation of neighboring string literals: '1' '2' == '12'

* Support for arbitrary expressions as decorators

* Support for generator comprehensions

* The stdlib's `re.pyj` module has been greatly enhanced. It's functionality is
  now much closer to python's re module.

* Added support for the with statement (context managers)

* Support for binary number literals

* A builtin set type and set literals

* Support recursive destructuring in assignments and for loop expressions.

* Add a new ES 6 output mode that emits faster code for ES 6 compatible
  runtimes


In addition there have been hundreds of bug fixes.
