RapydScript
===========

[![Build Status](https://api.travis-ci.org/kovidgoyal/rapydscript-ng.svg)](https://travis-ci.org/kovidgoyal/rapydscript-ng)
[![Build Status](https://ci.appveyor.com/api/projects/status/github/kovidgoyal/rapydscript-ng?svg=true)](https://ci.appveyor.com/project/kovidgoyal/rapydscript-ng)
[![Downloads](https://img.shields.io/npm/dm/rapydscript-ng.svg)](https://www.npmjs.com/package/rapydscript-ng)
[![Current Release](https://img.shields.io/npm/v/rapydscript-ng.svg)](https://www.npmjs.com/package/rapydscript-ng)
[![Known Vulnerabilities](https://snyk.io/test/github/kovidgoyal/rapydscript-ng/badge.svg)](https://snyk.io/test/github/kovidgoyal/rapydscript-ng)

This is a fork of the original RapydScript that adds many new (not always
backwards compatible) features. For more on the forking, [see the bottom of this file](#reasons-for-the-fork)

[Try RapydScript-ng live via an in-browser REPL!](https://kovidgoyal.github.io/rapydscript/repl/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Contents**

- [What is RapydScript?](#what-is-rapydscript)
- [Installation](#installation)
- [Compilation](#compilation)
- [Getting Started](#getting-started)
- [Leveraging other APIs](#leveraging-other-apis)
- [Anonymous Functions](#anonymous-functions)
- [Decorators](#decorators)
- [Self-Executing Functions](#self-executing-functions)
- [Chaining Blocks](#chaining-blocks)
- [Function calling with optional arguments](#function-calling-with-optional-arguments)
- [Inferred Tuple Packing/Unpacking](#inferred-tuple-packingunpacking)
- [Operators and keywords](#operators-and-keywords)
- [Literal JavaScript](#literal-javascript)
- [Containers (lists/sets/dicts)](#containers-listssetsdicts)
  - [Container comparisons](#container-comparisons)
- [Loops](#loops)
- [List/Set/Dict Comprehensions](#listsetdict-comprehensions)
- [Strings](#strings)
- [The Existential Operator](#the-existential-operator)
- [Regular Expressions](#regular-expressions)
- [Creating DOM trees easily](#creating-dom-trees-easily)
- [Classes](#classes)
  - [External Classes](#external-classes)
  - [Method Binding](#method-binding)
- [Iterators](#iterators)
- [Generators](#generators)
- [Modules](#modules)
- [Exception Handling](#exception-handling)
- [Scope Control](#scope-control)
- [Available Libraries](#available-libraries)
- [Linter](#linter)
- [Making RapydScript even more pythonic](#making-rapydscript-even-more-pythonic)
- [Advanced Usage Topics](#advanced-usage-topics)
    - [Browser Compatibility](#browser-compatibility)
    - [Tabs vs Spaces](#tabs-vs-spaces)
    - [External Libraries and Classes](#external-libraries-and-classes)
    - [Embedding the RapydScript compiler in your webpage](#embedding-the-rapydscript-compiler-in-your-webpage)
- [Internationalization](#internationalization)
- [Gotchas](#gotchas)
- [Reasons for the fork](#reasons-for-the-fork)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


What is RapydScript?
--------------------

RapydScript (pronounced 'RapidScript') is a pre-compiler for JavaScript,
similar to CoffeeScript, but with cleaner, more readable syntax. The syntax is
almost identical to Python, but RapydScript has a focus on performance and
interoperability with external JavaScript libraries. This means that the
JavaScript that RapydScript generates is performant and quite close to hand
written JavaScript.

RapydScript allows to write your front-end in Python without the overhead that
other similar frameworks introduce (the performance is the same as with pure
JavaScript). To those familiar with CoffeeScript, RapydScript is like
CoffeeScript, but inspired by Python's readability rather than Ruby's
cleverness. To those familiar with Pyjamas, RapydScript brings many of the same
features and support for Python syntax without the same overhead. Don't worry
if you've never used either of the above-mentioned compilers, if you've ever
had to write your code in pure JavaScript you'll appreciate RapydScript.
RapydScript combines the best features of Python as well as JavaScript,
bringing you features most other Pythonic JavaScript replacements overlook.
Here are a few features of RapydScript:

- classes that work and feel similar to Python
- an import system for modules/packages that works just like Python's
- optional function arguments that work similar to Python
- inheritance system that's both, more powerful than Python and cleaner than JavaScript
- support for object literals with anonymous functions, like in JavaScript
- ability to invoke any JavaScript/DOM object/function/method as if it's part of the same framework, without the need for special syntax
- variable and object scoping that make sense (no need for repetitive 'var' or 'new' keywords)
- ability to use both, Python's methods/functions and JavaScript's alternatives
- similar to above, ability to use both, Python's and JavaScript's tutorials (as well as widgets)
- it's self-hosting, that means the compiler is itself written in RapydScript and compiles into JavaScript

Let's not waste any more time with the introductions, however. The best way to
learn a new language/framework is to dive in.


Installation
------------

[Try RapydScript-ng live via an in-browser REPL!](https://kovidgoyal.github.io/rapydscript/repl/)

First make sure you have installed the latest version of [node.js](https://nodejs.org/) (You may need to restart your computer after this step). 

From NPM for use as a command line app:

	npm install rapydscript-ng -g

From NPM for use in your own node project:

	npm install rapydscript-ng

From Git:

	git clone git://github.com/kovidgoyal/rapydscript-ng.git
	cd rapydscript-ng
	sudo npm link .
	npm install  # This will automatically install the dependencies for RapydScript

If you're using OSX, you can probably use the same commands (let me know if
that's not the case). If you're using Windows, you should be able to follow
similar commands after installing node.js, npm and git on your system.


Compilation
-----------
Once you have installed RapydScript, compiling your application is as simple as
running the following command:

	rapydscript [options] <location of main file>

By default this will dump the output to STDOUT, but you can specify the output
file using `--output` option. The generated file can then be referenced in your
html page the same way as you would with a typical JavaScript file. If you're
only using RapydScript for classes and functions, then you're all set. For more
help, use ```rapydscript -h```.

Getting Started
---------------

RapydScript comes with its own Read-Eval-Print-Loop (REPL). Just run
``rapydscript`` without any arguments to get started trying out the code
snippets below.

Like JavaScript, RapydScript can be used to create anything from a quick
function to a complex web-app. RapydScript can access anything regular
JavaScript can, in the same manner. Let's say we want to write a function that
greets us with a "Hello World" pop-up. The following code will do it:

```python
def greet():
	alert("Hello World!")
```

Once compiled, the above code will turn into the following JavaScript:

```javascript
function greet() {
	alert("Hello World!");
}
```

Now you can reference this function from other JavaScript or the page itself
(using "onclick", for example). For our next example, let's say you want a
function that computes factorial of a number:

```python
def factorial(n):
	if n == 0:
		return 1
	return n * factorial(n-1)
```

Now all we need is to tie it into our page so that it's interactive. Let's add an input field to the page body and a cell for displaying the factorial of the number in the input once the input loses focus.

```html
	<input id="user-input" onblur="computeFactorial()"></input>
	<div id="result"></div>
```

**NOTE:** To complement RapydScript, I have also written RapydML (<https://bitbucket.org/pyjeon/rapydml>), which is a pre-compiler for HTML (just like RapydScript is a pre-compiler for JavaScript). 

Now let's implement computeFactorial() function in RapydScript:

```python
def computeFactorial():
	n = document.getElementById("user-input").value
	document.getElementById("result").innerHTML = factorial(n)
```

Again, notice that we have access to everything JavaScript has access to, including direct DOM manipulation. Once compiled, this function will look like this:

```javascript
function computeFactorial() {
	var n;
	n = document.getElementById("user-input").value;
	document.getElementById("result").innerHTML = factorial(n);
}
```

Notice that RapydScript automatically declares variables in local scope when
you try to assign to them. This not only makes your code shorter, but saves you
from making common JavaScript mistake of overwriting a global. For more
information on controlling variable scope, see `Scope Control` section.


Leveraging other APIs
---------------------

Aside from Python-like stdlib, RapydScript does not have any of its own APIs.
Nor does it need to, there are already good options available that we can
leverage instead. If we wanted, for example, to rewrite the above factorial
logic using jQuery, we could easily do so:

```python
def computeFactorial():
	n = $("#user-input").val()
	$("#result").text(factorial(n))
```

Many of these external APIs, however, take object literals as input. Like with
JavaScript, you can easily create those with RapydScript, the same way you
would create a dictionary in Python:

```javascript
styles = {
	'background-color':	'#ffe',
	'border-left':		'5px solid #ccc',
	'width':			50,
}
```

Now you can pass it to jQuery:

```python
$('#element').css(styles)
```

Another feature of RapydScript is ability to have functions as part of your
object literal. JavaScript APIs often take callback/handler functions as part
of their input parameters, and RapydScript lets you create such object literal
without any quirks/hacks:

```js
params = {
	'width':	50,
	'height':	30,
	'onclick':	def(event):
		alert("you clicked me"),
	'onmouseover':	def(event):
		$(this).css('background', 'red')
	,
	'onmouseout':	def(event):
		# reset the background
		$(this).css('background', '')
}
```

Note the comma on a new line following a function declaration, it needs to be
there to let the compiler know there are more attributes in this object
literal, yet it can't go on the same line as the function since it would get
parsed as part of the function block. Like Python, however, RapydScript
supports new-line shorthand using a `;`, which you could use to place the comma
on the same line:

```js
hash = {
	'foo':	def():
		print('foo');,
	'bar':	def():
		print('bar')
}
```

It is because of easy integration with JavaScript's native libraries that RapydScript keeps its own libraries to a minimum. 

Anonymous Functions
-------------------

Like JavaScript, RapydScript allows the use of anonymous functions. In fact,
you've already seen the use of anonymous functions in previous section when
creating an object literal ('onmouseover' and 'onmouseout' assignments). This
is similar to Python's lambda function, except that the syntax isn't awkward
like lambda, and the function isn't limited to one line. The following two
function declarations are equivalent:

```js
def factorial(n):
	if n == 0:
		return 1
	return n * factorial(n-1)

factorial = def(n):
	if n == 0:
		return 1
	return n * factorial(n-1)
```

This might not seem like much at first, but if you're familiar with JavaScript,
you know that this can be extremely useful to the programmer, especially when
dealing with nested functions, which are a bit syntactically awkward in Python
(it's not immediately obvious that those can be copied and assigned to other
objects). To illustrate the usefulness, let's create a method that creates and
returns an element that changes color while the user keeps the mouse pressed on
it.

```js
def makeDivThatTurnsGreen():
	div = $('<div></div>')
	turnGreen = def(event):
		div.css('background', 'green')
	div.mousedown(turnGreen)
	resetColor = def(event):
		div.css('background', '')
	div.mouseup(resetColor)
	return div
```

At first glance, anonymous functions might not seem that useful. We could have
easily created nested functions and assigned them instead. By using anonymous
functions, however, we can quickly identify that these functions will be bound
to a different object. They belong to the div, not the main function that
created them, nor the logic that invoked it. The best use case for these is
creating an element inside another function/object without getting confused
which object the function belongs to.

Additionally, as you already noticed in the previous section, anonymous
functions can be used to avoid creating excessive temporary variables and make
your code cleaner:

```js
math_ops = {
	'add':	def(a, b): return a+b;,
	'sub':	def(a, b): return a-b;,
	'mul':	def(a, b): return a*b;,
	'div':	def(a, b): return a/b;,
	'roots':	def(a, b, c):
		r = Math.sqrt(b*b - 4*a*c)
		d = 2*a
		return (-b + r)/d, (-b - r)/d
}
```

I'm sure you will agree that the above code is cleaner than declaring 5
temporary variables first and assigning them to the object literal keys after.
Note that the example puts the function header (def()) and content on the same
line. I'll refer to it as function inlining. This is meant as a feature of
RapydScript to make the code cleaner in cases like the example above. While you
can use it in longer functions by chaining statements together using `;`, a
good rule of thumb (to keep your code clean) is if your function needs
semi-colons ask yourself whether you should be inlining, and if it needs more
than 2 semi-colons, the answer is probably no (note that you can also use
semi-colons as newline separators within functions that aren't inlined, as in
the example in the previous section).


Decorators
----------
Like Python, RapydScript supports function decorators. 

```py
def makebold(fn):
	def wrapped():
		return "<b>" + fn() + "</b>"
	return wrapped

def makeitalic(fn):
	def wrapped():
		return "<i>" + fn() + "</i>"
	return wrapped

@makebold
@makeitalic
def hello():
	return "hello world"

hello() # returns "<b><i>hello world</i></b>"
```


Self-Executing Functions
------------------------
RapydScript wouldn't be useful if it required work-arounds for things that
JavaScript handled easily. If you've worked with JavaScript or jQuery before,
you've probably seen the following syntax:

```js
(function(args){
	// some logic here
})(args)
```

This code calls the function immediately after declaring it instead of
assigning it to a variable. Python doesn't have any way of doing this. The
closest work-around is this:

```py
def tmp(args):
	# some logic here
tmp.__call__(args)
```

While it's not horrible, it did litter our namespace with a temporary variable.
If we have to do this repeatedly, this pattern does get annoying. This is where
RapydScript decided to be a little unorthodox and implement the JavaScript-like
solution:

```js
(def(args):
	# some logic here
)()
```

A close cousin of the above is the following code (passing current scope to the function being called):

```js
function(){
	// some logic here
}.call(this);
```

With RapydScript equivalent of:

```js
def():
	# some logic here
.call(this)
```

There is also a third alternative, that will pass the arguments as an array:

```js
def(a, b):
	# some logic here
.apply(this, [a, b])
```


Chaining Blocks
---------------
As seen in previous section, RapydScript will bind any lines beginning with `.` to the outside of the block with the matching indentation. This logic isn't limited to the `.call()` method, you can use it with `.apply()` or any other method/property the function has assigned to it. This can be used for jQuery as well:

```js
$(element)
.css('background-color', 'red')
.show()
```

The only limitation is that the indentation has to match, if you prefer to indent your chained calls, you can still do so by using the `\` delimiter:

```js
$(element)\
	.css('background-color', 'red')\
	.show()
```

Some of you might welcome this feature, some of you might not. RapydScript always aims to make its unique features unobtrusive to regular Python, which means that you don't have to use them if you disagree with them. Recently, we have enhanced this feature to handle `do/while` loops as well:

```js
a = 0
do:
	print(a)
	a += 1
.while a < 1
```

Function calling with optional arguments
-------------------------------------------

RapydScript supports the same function calling format as Python. You can have
named optional arguments, create functions with variable numbers of arguments
and variable numbers of named arguments. Some examples will illustrate this
best:

```py
	def f1(a, b=2):
	   return [a, b]

	f1(1, 3) == f1(1, b=3) == [1, 3]

	def f2(a, *args):
		return [a, args]

	f2(1, 2, 3) == [1, [2, 3]]

	def f3(a, b=2, **kwargs):
	    return [a, b, kwargs]

	f3(1, b=3, c=4) == [1, 3, {c:4}]

	def f4(*args, **kwargs):
		return [args, kwargs]

	f4(1, 2, 3, a=1, b=2):
		return [[1, 2, 3], {a:1, b:2}]
```

One difference between RapydScript and Python is that RapydScript is not as
strict as Python when it comes to validating function arguments. This is both
for performance and to make it easier to interoperate with other JavaScript
libraries. So if you do not pass enough arguments when calling a function, the
extra arguments will be set to undefined instead of raising a TypeError, as in
Python. Similarly, when mixing ``*args`` and optional arguments, RapydScript
will not complain if an optional argument is specified twice.

When creating callbacks to pass to other JavaScript libraries, it is often the
case that the external library expects a function that receives an *options
object* as its last argument. There is a convenient decorator in the standard
library that makes this easy:

```py
@options_object
def callback(a, b, opt1=default1, opt2=default2):
	console.log(opt1, opt2)

callback(1, 2, {'opt1':'x', 'opt2':'y'})  # will print x, y
```

Now when you pass callback into the external library and it is called with an
object containing options, they will be automatically converted by RapydScript
into the names optional parameters you specified in the function definition.


Inferred Tuple Packing/Unpacking
--------------------------------
Like Python, RapydScript allows inferred tuple packing/unpacking and assignment. While inferred/implicit logic is usually bad, it can sometimes make the code cleaner, and based on the order of statements in the Zen of Python, 'beautiful' takes priority over 'explicit'. For example, if you wanted to swap two variables, the following looks cleaner than explicitly declaring a temporary variable:

```py
a, b = b, a
```

Likewise, if a function returns multiple variables, it's cleaner to say:

```py
a, b, c = fun()
```

rather than:

```py
tmp = fun()
a = tmp[0]
b = tmp[1]
c = tmp[2]
```

Since JavaScript doesn't have tuples, RapydScript uses arrays for tuple packing/unpacking behind the scenes, but the functionality stays the same. Note that unpacking only occurs when you're assigning to multiple arguments:

```py
a, b, c = fun()		# gets unpacked
tmp = fun()			# no unpacking, tmp will store an array of length 3
```

Unpacking can also be done in `for` loops (which you can read about in later section):

```py
for index, value in enumerate(items):
	print(index+': '+value)
```

Tuple packing is the reverse operation, and is done to the variables being assigned, rather than the ones being assigned to. This can occur during assignment or function return:

```py
def fun():
	return 1, 2, 3
```

To summarize packing and unpacking, it's basically just syntax sugar to remove obvious assignment logic that would just litter the code. For example, the swap operation shown in the beginning of this section is equivalent to the following code:

```py
tmp = [b, a]
a = tmp[0]
b = tmp[1]
```


Operators and keywords
------------------------

RapydScript uses the python form for operators and keywords. Below is the
mapping from RapydScript to JavaScript.

Keywords:

	RapydScript		JavaScript
	
	None			null
	False			false
	True			true
	undefined		undefined
	this			this

Operators:

	RapydScript		JavaScript
	
	and				&&
	or				||
	not				!
	is				===
	is not			!==
	+=1				++
	-=1				--
	**				Math.pow()
	
Admittedly, `is` is not exactly the same thing in Python as `===` in JavaScript, but JavaScript is quirky when it comes to comparing objects anyway.


Literal JavaScript
-----------------------

In rare cases RapydScript might not allow you to do what you need to, and you
need access to pure JavaScript, this is particularly useful for performance
optimizations in inner loops. When that's the case, you can use a *verbatim
string literal*.  That is simply a normal RapydScript string prefixed with the
```v``` character. Code inside a verbatim string literal is not a sandbox, you
can still interact with it from normal RapydScript:

```py
v'a = {foo: "bar", baz: 1};'
print(a.foo)	# prints "bar"

for v'i = 0; i < arr.length; i++':
   print (arr[i])
```

Containers (lists/sets/dicts)
------------------------------

### Lists

Lists in RapydScript are almost identical to lists in Python, but are also
native JavaScript arrays. The only small caveats are that the ``sort()`` and
``pop()`` methods are renamed to ``pysort()`` and ``pypop()``. This is so that
you can pass RapydScript lists to external JavaScript libraries without any
conflicts. Note that even list literals in RapydScript create python like list
objects, and you can also use the builtin ``list()`` function to create lists
from other iterable objects, just as you would in python.  You can create a
RapydScript list from a plain native JavaScript array by using the ``list_wrap()``
function, like this:

```py
a = v'[1, 2]'
pya = list_wrap(a)
 # Now pya is a python like list object that satisfies pya === a
```

### Sets

Sets in RapydScript are identical to those in python. You can create them using
set literals or comprehensions and all set operations are supported. You can
store any object in a set, the only caveat is that RapydScript does not support
the ``__hash__()`` method, so if you store an arbitrary object as opposed to a
primitive type, object equality will be via the ``is`` operator.

Note that sets are not a subclass of the ES 6 JavaScript Set object, however,
they do use this object as a backend, when available. You can create a set from
any enumerable container, like you would in python

```py
s = set(list or other set or string)
```

You can also wrap an existing JavaScript Set object efficiently, without
creating a copy with:

```py
js_set = Set()
py_set = set_wrap(js_set)
```

Note that using non-primitive objects as set members does not behave the
same way as in Python. For example:

```py
a = [1, 2]
s = {a}
a in s  # True
[1, 2] in s # False
```

This is because, as noted above, object equality is via the ```is```
operator, not hashes.

### Dicts

dicts are the most different in RapydScript, from Python. This is because
RapydScript uses the JavaScript Object as a dict, for compatibility with
external JavaScript libraries and performance. This means there are several
differences between RapydScript dicts and Python dicts.

    - You can only use primitive types (strings/numbers) as keys in the dict
    - If you use numbers as keys, they are auto-converted to strings
    - You can access the keys of the dict as attributes of the dict object
    - Trying to access a non-existent key returns ``undefined`` instead of
      raising a KeyError
    - dict objects do not have the same methods as python dict objects:
      ``items(), keys(), values(), get(), pop(), etc.`` You can however use
      RapydScript dict objects in ```for..in``` loops.

Fortunately, there is a builtin ```dict``` type that behaves just like Python's
```dict``` with all the same methods. The only caveat is that you have to add
a special line to your RapydScript code to use these dicts, as shown below:

```py
from __python__ import dict_literals, overload_getitem
a = {1:1, 2:2}
a[1]  # == 1
a[3] = 3
list(a.keys()) == [1, 2, 3]
a['3'] # raises a KeyError as this is a proper python dict, not a JavaScript object
```

The special line, called a *scoped flag* tells the compiler that from
that point on, you want it to treat dict literals and the getitem operator `[]`
as they are treated in python, not JavaScript. 

The scoped flags are local to each scope, that means that if you use it in a
module, it will only affect code in that module, it you use it in a function,
it will only affect code in that function. In fact, you can even use it to
surround a few lines of code, like this:

```py
from __python__ import dict_literals, overload_getitem
a = {1:1, 2:2}
isinstance(a, dict) == True
from __python__ import no_dict_literals, no_overload_getitem
a = {1:1, 2:2}
isinstance(a, dict) == False # a is a normal JavaScript object
```


### Container comparisons

Container equality (the `==` and `!=` operators) work for lists and sets and
RapydScript dicts (but not arbitrary javascript objects). You can also define
the ``__eq__(self, other)`` method in your classes to have these operators work
for your own types.

RapydScript does not overload the ordering operators ```(>, <, >=,
<=)``` as doing so would be a big performance impact (function calls in
JavaScript are very slow). So using them on containers is useless. 

Loops
-----
RapydScript's loops work like Python, not JavaScript. You can't, for example
use ```for(i=0;i<max;i++)``` syntax. You can, however, loop through arrays
using 'for ... in' syntax without worrying about the extra irrelevant
attributes regular JavaScript returns.

```py
animals = ['cat', 'dog', 'mouse', 'horse']
for animal in animals:
	print('I have a '+animal)
```
		
If you need to use the index in the loop as well, you can do so by using enumerate():

```py
for index, animal in enumerate(animals):
	print("index:"+index, "animal:"+animal)
```

Like in Python, if you just want the index, you can use range:

```py
for index in range(len(animals)):			# or range(animals.length)
	print("animal "+index+" is a "+animals[index])
```

When possible, RapydScript will automatically optimize the loop for you into
JavaScript's basic syntax, so you're not missing much by not being able to call
it directly.


List/Set/Dict Comprehensions
-------------------------------

RapydScript also supports comprehensions, using Python syntax. Instead of the following, for example:

```py
myArray = []
for index in range(1,20):
	if index*index % 3 == 0:
		myArray.append(index*index)
```

You could write this:

```py
myArray = [i*i for i in range(1,20) if i*i%3 == 0]
```

Similarly for set and dict comprehensions:

```py
myDict = {x:x+1 for x in range(20) if x > 2}
mySet = {i*i for i in range(1,20) if i*i%3 == 0}
```

Strings
---------

For reasons of compatibility with external JavaScript and performance,
RapydScript does not make any changes to the native JavaScript string type.
However, all the useful Python string methods are available on the builtin
``str`` object. This is analogous to how the functions are available in the
``string`` module in Python 2.x.  For example,

```py
str.strip(' a ') == 'a'
str.split('a b') == ['a', 'b']
str.format('{0:02d} {n}', 1, n=2) == '01 2'
...
```

However, if you want to make the python string methods available on string
objects, there is a convenience method in the standard library to do so. Use
the following code:

```py
from pythonize import strings
strings()
```

After you call the `strings()` function, all python string methods will be
available on string objects, just as in python. The only caveat is that two
methods: `split()` and `replace()` are left as the native JavaScript versions,
as their behavior is not compatible with that of the python versions. You can
control which methods are not copied to the JavaScript String object by passing
their names to the `strings()` function, like this:

```py
strings('split', 'replace', 'find', ...)
# or
strings(None)  # no methods are excluded
```

One thing to keep in mind is that in JavaScript string are UTF-16, so they
behave like strings in narrow builds of Python 2.x. This means that non-BMP
unicode characters are represented as surrogate pairs. RapydScript includes
some functions to make dealing with non-BMP unicode characters easier:

  - ``str.uchrs(string, [with_positions])`` -- iterate over unicode characters in string, so, for example:

	```py
	list(str.uchrs('s🐱a')) == ['s', "🐱", 'a']
	```

	You can also get positions of individual characters:

	```py
	list(str.uchrs('s🐱a', True)) == [[0, 's'], [1, "🐱"], [3, 'a']]
	```
	Note that any broken surrogate pairs in the underlying string are returned
	as the unicode replacement character U+FFFD

  - ``str.uslice(string, [start, [stop]])`` -- get a slice based on unicode character positions, for example:

	```py
	str.uslice('s🐱a', 2') == 'a'  # even though a is at index 3 in the native string object
	```

  - ``str.ulen(string)`` -- return the number of unicode characters in the string

The Existential Operator
---------------------------

One of the annoying warts of JavaScript is that there are two "null-like"
values: `undefined` and `null`. So if you want to test if a variable is not
null you often have to write a lengthy expression that looks like

```py
(var !== undefined and var !== None)
```

Simply doing `bool(var)` will not work because zero and empty strings are also
False.

Similarly, if you need to access a chain of properties/keys and dont want a
`TypeError` to be raised, if one of them is undefined/null then you have
to do something like:

```py
if a and a.b and a.b.c:
	ans = a.b.c()
else:
	ans = undefined
```

To ease these irritations, RapydScript borrows the *Existential operator* from
CoffeeScript. This can be used to test if a variable is null-like, with a
single character, like this:

```py
yes = True if no? else False
# Which, without the ? operator becomes
yes = True if no is not undefined and no is not None else False
```

When it comes to long chains, the `?` operator will return the expected value
if all parts of the chain are ok, but cause the entire chaning to result in
`undefined` if any of its links are null-like. For example:

```py
ans = a?.b?[1]?()
# Which, without the ? operator becomes
ans = undefined
if a is not undefined and a is not None and a.b is not undefined and a.b is not None and jstype(a.b[1]) is 'function':
	ans = a.b[1]()
```

Finally, you can also use the existential operator as shorthand for the
conditional ternary operator, like this:

```py
a = b ? c
# is the same as
a = c if (b is undefined or b is None) else b
```

Regular Expressions
----------------------

RapydScript includes a ```re``` module that mimics the interface of the Python
re module. However, it uses the JavaScript regular expression functionality
under the hood, which has several differences from the Python regular
expression engine. Most importantly:

  - it does not support lookbehind and group existence assertions
  - it does not support unicode (on ES 6 runtimes, unicode is supported, but
	with a different syntax). You can test for the presence of unicode support with
	```re.supports_unicode```. 
  - The ``MatchObject``'s ``start()`` and ``end()`` method cannot return correct values
    for subgroups for some kinds of regular expressions, for example, those
	with nested captures. This is because the JavaScript regex API does not expose
	this information, so it has to be guessed via a heuristic.

You can use the JavaScript regex literal syntax, including verbose regex
literals, as shown below. In verbose mode, whitespace is ignored and # comments
are allowed (except inside character classes -- verbose mode works in the same
way as in python, except you use the JavaScript Regex literal syntax).

```py
import re
re.match(/a(b)/, 'ab') == re.match('a(b)', 'ab')

re.match(///
  a  # a comment
  b  # Another comment
  ///, 'ab')
```

Creating DOM trees easily
---------------------------------

RapydScript includes a small module in its standard library to create DOM tress
efficiently. It leverages the powerful support for python style function
calling. Best illustrated with an example:

```py
from elementmaker import E

E.div(id="container", class_="xxx",
	E.div('The Heading', data_heading="1"),
	E.p('Some text ',
		E.i('with italics'),
		E('custom', ' and a csutom tag'),
	)
)
```

This is equivalent to:

```html
<div id="container" class="xxx">
	<div data-heading="1">The Heading</div>
	<p>Some text <i>with italics</i><custom> and a custom tag</custom></p>
</div>
```

Basically, you create text nodes and children as positional arguments and
attributes as keyword arguments. Note that if an attribute name is a reserved
keyword in RapydScript, you can postfix it with an underscore. So ```class_```
becomes ```class```. Also, underscores are automatically replaced by hyphens,
so ```data-*``` attributes can be created. Finally, if you need a non-standard
tag, you simply use the ```E()``` function by itself with the first argument
being the tag name.

Another great feature is that you can pass functions as event handlers
directly, so for example:

```py
E.a(onclick=def():
	pass  # do something on the click event
)
```

Classes
-------
This is where RapydScript really starts to shine. JavaScript is known for having really crappy class implementation (it's basically a hack on top of a normal function, most experienced users suggest using external libraries for creating those instead of creating them in pure JavaScript). Luckily RapydScript fixes that. Let's imagine we want a special text field that takes in a user color string and changes color based on it. Let's create such field via a class.

```js
class ColorfulTextField:
	def __init__(self):
		field = $('<input></input>')
		changeColor = def(event):
			field.css('backround', field.val())
		field.keydown(changeColor)
		self.widget = field
```

This class abuses DOM's tolerant behavior, where it will default to the original setting when the passed-in color is invalid (saving us the extra error-checking logic). To append this field to our page we can run the following code:

```py
textfield = ColorfulTextField()
$('body').append(textfield.widget)
```

If you're used to JavaScript, the code above probably set off a few red flags in your head. In pure JavaScript, you can't create an object without using a 'new' operator. Don't worry, the above code will compile to the following:

```js
var textfield;
textfield = new ColorfulTextField()
$('body').append(textfield.widget);
```

RapydScript will automatically handle appending the 'new' keyword for you, assuming you used 'class' to create the class for your object. This also holds when creating an object inside a list or returning it as well. You could easily do the following, for example:

```
fields = [ColorfulTextField(), ColorfulTextField(), ColorfulTextField()]
```

This is very useful for avoiding a common JavaScript error of creating 'undefined' objects by forgetting this keyword. One other point to note here is that regular DOM/JavaScript objects are also covered by this. So if you want to create a DOM image element, you should not use the 'new' keyword either:

```py
myImage = Image()
```

But RapydScript's capability doesn't end here. Like Python, RapydScript allows inheritance. Let's say, for example, we want a new field, which works similar to the one above. But in addition to changing color of the field, it allows us to change the color of a different item, with ID of 'target' after we press the 'apply' button, located right next to it. Not a problem, let's implement this guy:

```js

class TextFieldAffectingOthers(ColorfulTextField):
	def __init__(self):
		ColorfulTextField.__init__(self)
		field = self.widget
		submit = $('<button type="button">apply</button>')
		applyColor = def(event):
			$('#target').css('background', field.val())
		submit.click(applyColor)
		self.widget = $('<div></div>')\
			.append(field)\
			.append(submit)
```

A couple of things to note here. We can invoke methods from the parent class
the same way we would in Python, by using `Parent.method(self, ...)` syntax.
This allows us to control when and how (assuming it requires additional
arguments) the parent method gets executed. Also note the use of `\` operator
to break up a line. This is something Python allows for keeping each line short
and legible. Likewise, RapydScript, being indentation-based, allows the same.

Like Python, RapydScript allows multiple inheritance. The only caveat is that 
the internal semantics of how it works are pretty different from python, since
it is built on JavaScript's prototypical inheritance. For the most part you
wont notice any differences from python, except, if you have a very complex
inheritance hierarchy, especially, one with cycles. In this (rare) case you may
find that the method-resolution-order in RapydScript is different from Python.

Like Python, RapydScript allows static methods. Marking the method static with
`@staticmethod` decorator will compile that method such that it's not bound to
the object instance, and ensure all calls to this method compile into static
method calls:

```py
class Test:
	def normalMethod(self):
		return 1

	@staticmethod
	def staticMethod(a):
		return a+1
```

### External Classes

RapydScript will automatically detect classes declared within the same scope (as long as the declaration occurs before use), as well as classes properly imported into the module (each module making use of a certain class should explicitly import the module containing that class). RapydScript will also properly detect native JavaScript classes (String, Array, Date, etc.). Unfortunately, RapydScript has no way of detecting classes from third-party libraries. In those cases, you could use the `new` keyword every time you create an object from such class. Alternatively, you could mark the class as external.

Marking a class as external is done via `external` decorator. You do not need to fill in the contents of the class, a simple `pass` statement will do:

```py
@external
class Alpha:
	pass
```

RapydScript will now treat `Alpha` as if it was declared within the same scope, auto-prepending the `new` keyword when needed and using `prototype` to access its methods (see `casperjs` example in next section to see how this can be used in practice). You don't need to pre-declare the methods of this class (unless you decide to for personal reference, the compiler will simply ignore them) unless you want to mark certain methods as static:

```py
@external
class Alpha:
	@staticmethod
	def one():
		pass
```

`Alpha.one` is now a static method, every other method invoked on `Alpha` will still be treated as a regular class method. While not mandatory, you could pre-declare other methods you plan to use from `Alpha` class as well, to make your code easier to read for other developers, in which case this `external` declaration would also serve as a table of contents for `Alpha`:

```py
@external
class Alpha:
	def two(): pass
	def three(): pass

	@staticmethod
	def one(): pass
```

As mentioned earlier, this is simply for making your code easier to read. The compiler itself will ignore all method declarations except ones marked with `staticmethod` decorator.

You could also use `external` decorator to bypass improperly imported RapydScript modules. However, if you actually have control of these modules, the better solution would be to fix those imports.


### Method Binding

By default, RapydScript does not bind methods to the classes they're declared under. This behavior is unlike Python, but very much like the rest of JavaScript. For example, consider this code:

```py
class Boy:
	def __init__(self, name):
		self.name = name

	def greet(self):
		if self:
			print('My name is' + self.name)

tod = Boy('Tod')
tod.greet()                 # Hello, my name is Tod
getattr(tod, 'greet')()     # prints nothing
```

In some cases, however, you may wish for the functions in the class to be
automatically bound when the objects of that class are instantiated. In order
to do that, use a *scoped flag*, which is a simple instruction to the compiler
telling it to auto-bind methods, as shown below:

```py

class AutoBound:
	from __python__ import bound_methods

	def __init__(self):
		self.a = 3

	def val(self):
		return self.a

getattr(AutoBound(), 'val')() == 3
```

If you want all classes in a module to be auto-bound simply put the scoped flag
at the top of the module. You can even choose to have only a few methods of the
class auto-bound, like this:

```py
class C:

	def unbound1(self):
		pass # this method will not be auto-bound

	from __python__ import bound_methods
	# Methods below this line will be auto-bound

	def bound(self):
	   pass # This method will be auto-bound

	from __python__ import no_bound_methods
	# Methods below this line will not be auto-bound

	def unbound2(self):
		pass  # this method will be unbound
```

Scoped flags apply only to the scope they are defined in, so if you define them
inside a class declaration, they only apply to that class. If you define it at
the module level, it will only apply to all classes in the module that occur
below that line, and so on.

Iterators
----------

RapydScript supports iterators, just like python, with a few differences to
make interoperating with other JavaScript code nicer. You can make an iterator
from an array or object by simply calling the builtin ``iter()`` function, just
as you would in python. The result of the function is a javascript iterator
object, that works both in RapydScript's for..in loops and ES6 JavaScript
for..of loops. Indeed they will work with any vanilla JavaScript code that
expects an iterable object. You can make your own classes iterable by defining
an ``__iter__`` method, just as you would in python. For example:

```python
	class A:

		def __init__(self):
			self.items = [1, 2, 3]

		def __iter__(self):
			return iter(self.items)

	for x in A():
	   print (x)  # Will print 1, 2, 3
```

Note that unlike python, an iterators ``next()`` method does not return
the next value, but instead an object with two properties: ``done and value``.
``value`` is the next value and done will be ``True`` when the iterator is
exhausted. No ``StopIteration`` exception is raised. These choices were
made so that the iterator works with other JavaScript code.

Generators
------------

RapydScript supports generators (the python yield keyword). For example:

```py
def f():
	for i in range(3):
		yield i

[x for x in f()] == [1, 2, 3]
```

There is full support for generators including the Python 3, ```yield from```
syntax. 

Generators create JavaScript iterator objects. For differences between python
and JavaScript iterators, see the section on iterators above. 

Currently, generators are down-converted to ES 5 switch statements. In the
future, when ES 6 support is widespread, they will be converted to native
JavaScript ES 6 generators.

Modules
-------

RapydScript's module system works almost exactly like Python's. Modules are
files ending with the suffix ```.pyj``` and packages are directories containing
an ```__init__.pyj``` file. The only caveat is that star imports are not
currently supported (this is by design, star imports are easily abused).
You can import things from modules, just like you would in python:

```py
from mypackage.mymodule import something, something_else
```

When you import modules, the RapydScript compiler automatically generates a
single large JavaScript file containing all the imported packages/modules and
their dependencies, recursively. This makes it very easy to integrate the
output of RapydScript into your website.

Modules are searched for by default in the rapydscript builtin modules
directory and the directory of the rapydscript file that you are
compiling. You can add additional directories to the searched locations via
the RAPYDSCRIPT_IMPORT_PATH environment variable or the --import-path option 
to the RapydScript compiler. See the documentation of the option for details.

Exception Handling
------------------

Exception handling in RapydScript works just like it does in python. 

An example:

```py
try:
	somefunc()
except Exception as e:
	import traceback
	traceback.print_exc()
else:
    print('no exception occurred')
finally:
    cleanup()
```

You can create your own Exception classes by inheriting from `Exception`, which
is the JavaScript Error class, for more details on this, see (the MDN documentation)[https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error]. 

```py
class MyError(Exception):
	def __init__(self, message):
		self.name = 'MyError'
		self.message = message

raise MyError('This is a custom error!')
```

You can lump multiple errors in the same except block as well:

```py
try:
	print(foo)
except ReferenceError, TypeError as e:
	print(e.name + ':' + e.message)
	raise # re-raise the exception
```

Basically, `try/except/finally` in RapydScript works very similar to the way it does in Python 3. 

Scope Control
-------------

Scope refers to the context of a variable. For example, a variable declared inside a function is not seen by the code outside the function. This variable's scope is local to the function. JavaScript controls scope via `var` keyword. Any variable that you start using without declaring with a `var` first will try to reference inner-most variable with the same name, if one doesn't exist, it will create a global variable with that name. For example, the following JavaScript code will not only return `a` incremented by 1, but also overwrite the global variable `a` with `a+1`:

```py
a = 1;
a_plus_1 = function() {
	return ++a;
};
```

Basically, JavaScript defaults to outer or global scope if you omit `var`. This behavior can introduce some very frustrating bugs in large applications. To avoid this problem, RapydScript's scope preference works in reverse (same as Python's). RapydScript will prefer local-most scope, always creating a local variable if you perform any sort of assignment on it in a function (this is called variable shadowing). Shadowing can create another annoyance, however, of function's variable changes getting discarded. For example, at first, it looks like the following code will set `a` to 2:

```py
a = 1
b = 1
increment = def():
	a += b
increment()
```

When executed, however, increment() function will discard any changes to `a`. This is because, like Python, RapydScript will not allow you to edit variables declared in outer scope. As soon as you use any sort of assignment with `a` in the inner scope, RapydScript will declare it as an internal variable, shadowing `a` in the outer scope. One way around this is to use the `global` keyword, declaring `a` as a global variable. This, however, must be done in every function that edits `a`. It also litters global scope, which it frowned upon because it can accidentally overwrite an unrelated variable with the same name (declared by someone else or another library). RapydScript solves this by introducing `nonlocal` keyword (just like Python 3):

```py
a = 1
b = 1
increment = def():
	nonlocal a
	a += b
increment()
```

Note that `b` is not affected by shadowing. It's the assignment operator that triggers shadowing, you can read outer-scope variables without having to use `nonlocal`. You can combine multiple non-local arguments by separating them with a comma: `nonlocal a, b, c`. You can also chain `nonlocal` declarations to escape multiple scopes:

```py
def fun1():
	a = 5
	b = fun2():
		nonlocal a
		a *= 2
		c = fun3():
			nonlocal a
			a += 1
```

Shadowing is preferred in most cases, since it can't accidentally damage outside logic, and if you want to edit an external variable, you're usually better off assigning function's return value to it. There are cases, however, when using `nonlocal` makes the code cleaner. For compatibility with Python code, RapydScript also supports the `global` keyword, with the exception that if a variable is present both in the outer scope and the global scope, the variable from the outer scope will be used, rather than the variable from the global scope. This situation is rare in practice, and implementing it in RapydScript would require significant work, so RapydScript `global` remains a little incompatible with Python `global`.


Available Libraries
-------------------

One of Python's main strengths is the number of libraries available to the developer. This is something very few other `Python-in-a-browser` frameworks understand. In the browser JavaScript is king, and no matter how many libraries the community for the given project will write, the readily-available JavaScript libraries will always outnumber them. This is why RapydScript was designed with JavaScript and DOM integration in mind from the beginning. Indeed, plugging `underscore.js` in place of RapydScript's `stdlib` will work just as well, and some developers may choose to do so, after all, `underscore.js` is very Pythonic and very complete. 

It is for that reason that I try to keep RapydScript bells and whistles to a minimum. RapydScript's main strength is easy integration with JavaScript and DOM, which allows me to stay sane and not rewrite my own versions of the libraries that are already available. That doesn't mean, however, that pythonic libraries can't be written for RapydScript. To prove that, I have implemented lightweight clones of several popular Python libraries and bundled them into RapydScript, you can find them in `src` directory. The following libraries are included:

	math                # replicates almost all of the functionality from Python's math library
	re                  # replicates almost all of the functionality from Python's re library
	random              # replicates most of the functionality from Python's random library
	elementmaker        # easily construct DOM trees
	aes                 # Implement AES symmetric encryption
	encodings           # Convert to/from UTF-8 bytearrays, base64 strings and native strings
	gettext             # Support for internationalization of your RapydScript app
	operator            # a subset of python;s operator module

For the most part, the logic implemented in these libraries functions identically to the Python versions.  I'd be happy to include more libraries, if other members of the community want to implement them (it's fun to do, `re.pyj` is a good example), but I want to reemphasize that unlike most other Python-to-JavaScript compilers, RapydScript doesn't need them to be complete since there are already tons of available JavaScript libraries that it can use natively.

Linter
---------

The RapydScript compiler includes its own, built in linter. The linter is
modeled on pyflakes, it catches instances of unused/undefined variables,
functions, symbols, etc. While this sounds simple, it is surprisingly effective
in practice. To run the linter:

	rapydscript lint file.pyj

It will catch many errors, for example,

```py
def f():
	somevar = 1
	return someva
```

The linter will catch the typo above, saving you from having to discover it at
runtime. Another example:

```py
def f(somevar1):
	somevar2 = somevar1 * 2
	return somevar1
```

Here, you probably meant to return ``somevar2`` not ``somevar1``. The linter
will detect that somevar2 is defined but not used and warn you about it.

The linter is highly configurable, you can add to the list of built-in names
that the linter will not raise undefined errors for. You can turn off
individual checks that you do not find useful. See ``rapydscript lint -h`` for
details.

Making RapydScript even more pythonic
---------------------------------------

RapydScript has three main goals: To be as fast as possible, to be as close to
python as possible, to interoperate with external javascript libraries.
Sometimes these goals conflict and RapydScript chooses to be less pythonic in
service to the other two goals. Fortunately, there are many optional flags you
can use to reverse these compromises. The most important of these are called
*scoped flags*. 

The scoped flags are local to each scope, that means that if you use it in a
module, it will only affect code in that module, it you use it in a function,
it will only affect code in that function. In fact, you can even use it to
surround a few lines of code. There are many scoped flags, described else where
in this document, see the sections on Method Auto-binding and the section on Dicts
in this document.

Another common complaint is that in RapydScript strings dont have all the
string methods that python strings do. Fortunately, there is solution for that
as well, described in the section on strings in this document.


Advanced Usage Topics
---------------------

#### Browser Compatibility

RapydScript compiles your code such that it will work on browsers that are
compatible with the ES 5 JavaScript standard. The compiler has a 
``--js-version`` option that can also be used to output ES 6 only code. This
code is smaller and faster than the ES 5 version, but is not as widely
compatible.

#### Tabs vs Spaces

This seems to be a very old debate. Python code conventions suggest 4-space
indent. The old version of RapydScript relied on tabs, new one uses spaces
since that seems to be more consistent in both Python and JavaScript
communities. Use whichever one you prefer, as long as you stay consistent. If
you intend to submit your code to RapydScript, it must use spaces to be
consistent with the rest of the code in the repository.

#### External Libraries and Classes

RapydScript will pick up any classes you declare yourself as well as native
JavaScript classes. It will not, however, pick up class-like objects created by
outside frameworks. There are two approaches for dealing with those. One is via
`@external` decorator, the other is via `new` operator when declaring such
object. To keep code legible and consistent, I strongly prefer the use of
`@external` decorator over the `new` operator for several reasons, even if it
may be more verbose:

- `@external` decorator makes classes declared externally obvious to anyone looking at your code
- class declaration that uses `@external` decorator can be exported into a reusable module
- developers are much more likely to forget a single instance of `new` operator when declaring an object than to forget an import, the errors due to omitted `new` keyword are also likely to be more subtle and devious to debug

#### Embedding the RapydScript compiler in your webpage

You can embed the RapydScript compiler in your webpage so that you can have
your webapp directly compile user supplied RapydScript code into JavaScript.
To do so, simply include the [embeddable rapydscript compiler](https://kovidgoyal.github.io/rapydscript/repl/rapydscript.js) 
in your page, and use it to compile arbitrary RapydScript code. 

You create the compiler by calling: `RapydScript.create_embedded_compiler()` and compile
code with `compiler.compile(code)`. You can execute the resulting JavaScript
using the standard `eval()` function. See the sample
HTML below for an example.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Test embedded RapydScript</title>
        <script charset="UTF-8" src="https://kovidgoyal.github.io/rapydscript/repl/rapydscript.js"></script>
        <script>
var compiler = RapydScript.create_embedded_compiler();
var js = compiler.compile("def hello_world():\n a='RapydScript is cool!'\n print(a)\n alert(a)");
window.onload = function() {
    document.body.textContent = js;
    eval(js);
    eval('hello_world()');
};
        </script>
    </head>
    <body style="white-space:pre-wrap"></body>
</html>
```

There are a couple of caveats when using the embedded compiler:

* It only works when run in a modern browser (one that supports ES6) so no
  Internet Explorer. You can have it work in an ES 5 runtime by passing
  an option to the compile() method, like this:
  ```
  compiler.compile(code, {js_version:5})
  ```
  Note that doing this means that you cannot use generators and the
  yield keyword in your RapydScript code.

* Importing of modules only works with the standard library modules. There is
  currently no way to make your own modules importable.

* To generate the embedded compiler yourself (rapydscript.js) from a source
  checkout of rapydscript, follow the instructions above for installing from
  source, then run `bin/web-repl-export /path/to/export/directory`

Internationalization
-------------------------

RapydScript includes support for internationalization -- i.e. the translation
of user interface strings defined in the RapydScript source code. The interface
for this is very similar to Python's gettext module.  Suppose you have some
code that needs internalization support, the first step is to mark all
user-viewable strings as translatable:

```py
from gettext import gettext as _
create_button(_('My Button'))
create_button(_('Another Button'))
```

Now we need to extract these string from the source code into a .pot file which
can be used to create translations. To do that, run:

```
rapydscript gettext file.pyj > messages.pot
```

Now send the `messages.pot` file to your translators. Suppose you get back a
`de.po` file from the translators with German translations. You now need to
compile this into a format that can be used by RapydScript (RapydScript uses a
JSON based format for easy operation over HTTP). Simply run:

```
rapydscript msgfmt < messages.pot > messages.json
```

Now, suppose you load up the translation data in your application. Exactly how
you do that is upto you. You can load it via Ajax or using a `<script>` tag. To
activate the loaded data, simply run:

```py
from gettext import install

install(translation_data)
```

Now everywhere in your program that you have calls to the `_()` function, you
will get translated output. So make sure you install the translation data
before building the rest of your user-interface.

Just as in python, you also have a `ngettext()` function for translating
strings that depend on a count.


Gotchas
---------

RapydScript has a couple of mutually conflicting goals: Be as close to python
as possible, while also generating clean, performant JavaScript and making
interop with external JavaScript libraries easy.

As a result, there are some things in RapydScript that might come as surprises
to an experienced Python developer. The most important such gotchas are listed
below:

- Truthiness in JavaScript is very different from Python. Empty lists and dicts
  are ``False`` in Python but ``True`` in JavaScript. The compiler could work
  around that, but not without a significant performance cost, so it is best to
  just get used to checking the length instead of the object directly.

- Operators in JavaScript are very different from Python. ``1 + '1'`` would be
  an error in Python, but results in ``'11'`` in JavaScript. Similarly, ``[1] +
  [1]`` is a new list in Python, but a string in JavaScript. Keep that in mind
  as you write code. RapydScript does not implement operator overloading, as
  method calls in JavaScript are very slow compared to raw operators.

- There are many more keywords than in Python. Because RapydScript compiles
  down to JavaScript, the set of keywords is all the keywords of Python + all
  the keywords of JavaScript. For example, ``default`` and ``switch`` are
  keywords in RapydScript. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords)
  for a list of JavaScript keywords.

- Method binding in RS is not automatic. So ``someobj.somemethod()`` will do the
  right thing, but ``x = someobj.somethod; x()`` will not. You can turn method binding on
  via a scoped flag. See the section above on method binding for details.

- Nested comprehensions are not supported. So you cannot do this:
	[a for a in b for b in c]

- RapydScript automatically appends 'new' keyword when using classes generated
  by it, native JavaScript objects like `Image` and `RegExp` and classes from
  other libraries marked as external. However, automatic new insertion depends
  on the compiler being able to detect that a symbol resolves to a class.
  Because of the dynamic nature of JavaScript this is not possible to do with
  100% accuracy. So it is best to get in the habit of using the `new` keyword
  yourself. Similarly, the compiler will try to convert SomeClass.method() into
  SomeClass.prototype.method() for you, but again, this is not 100% reliable.

- The {"a":b} syntax is used to create JavaScript hashes. These do not behave
  like python dictionaries. To create python like dictionary objects, you
  should use a scoped flag. See the section on dictionaries above for details.


Reasons for the fork
----------------------

The fork was initially created because the original developer of RapydScript
did not have the time to keep up with the pace of development. Since then, 
development on the original RapydScript seems to have stalled completely.
Also, there are certain disagreements on the future direction of RapydScript.

Regardless, this fork is not a hostile fork, if development on the original
ever resumes, they are welcome to use the code from this fork. I have kept all
new code under the same license, to make that possible.

See the [Changelog](https://github.com/kovidgoyal/rapydscript-ng/blob/master/CHANGELOG.md)
for a list of changes to rapydscript-ng since the fork.

For some discussion surrounding the fork, see 
[this bug report](https://github.com/kovidgoyal/rapydscript-ng/issues/15)
