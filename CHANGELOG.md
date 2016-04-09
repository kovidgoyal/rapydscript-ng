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
  available at: https://kovidgoyal.github.io/rapydscript/repl/

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
