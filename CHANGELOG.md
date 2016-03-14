version 0.5.1
==============

Fix a bug that caused the equality operators to not work for lists. Also,
fix the new equality operators causing their arguments to be evaluated twice
when the arguments are expressions, such as fucntion calls, generators, object
literals, etc.

version 0.5.0
===============

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
  ```
  for v'i = 0; i < 10; i++':
  ```
  The old compile time magic function `JS()` used for JavaScript literals has been removed.

* String literals now behave exactly like python. You can use raw string
  literal, escapes for unicode such as `\u2122` or `\N{...}` etc.

* Dict literals now do not treat identifiers as strings, so you can use arbitrary expressions as keys.

* Remove the ``@kwargs`` decorator. Keyword arguments now work seamlessly.

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
