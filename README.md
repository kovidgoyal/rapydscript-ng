RapydScript
===========

[![Build Status](https://secure.travis-ci.org/kovidgoyal/rapydscript-ng.png)](http://travis-ci.org/kovidgoyal/rapydscript-ng)

This is a fork of the original RapydScript that adds many new (not always
backwards compatible) features. For a list of changes, [see the bottom of this file](#changes-in-this-fork-compared-to-atsepkovrapydscript)

[Try RapydScript-ng live via an in-browser REPL!](http://kovidgoyal.github.io/rapydscript/repl/)

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
- [Regular Expressions](#regular-expressions)
- [Creating DOM tree's efficiently](#creating-dom-trees-efficiently)
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
- [Advanced Usage Topics](#advanced-usage-topics)
    - [Browser Compatibility](#browser-compatibility)
    - [Tabs vs Spaces](#tabs-vs-spaces)
    - [Semi-Colons](#semi-colons)
    - [jQuery-wrapped Elements](#jquery-wrapped-elements)
    - [External Libraries and Classes](#external-libraries-and-classes)
    - [Embedding the RapydScript compiler in your webpage](#embedding-the-rapydscript-compiler-in-your-webpage)
- [Internationalization](#internationalization)
- [Gotchas](#gotchas)
- [Changes in this fork compared to atsepkov/RapydScript](#changes-in-this-fork-compared-to-atsepkovrapydscript)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


What is RapydScript?
--------------------
RapydScript (pronounced 'RapidScript') is a pre-compiler for JavaScript, similar to CoffeeScript, but with cleaner, more readable syntax. The syntax is very similar to Python, but allows JavaScript as well. This project was written as an alternative to Pyjamas for those wishing Python-like JavaScript without the extra overhead and complexity Pyjamas introduces.

RapydScript allows to write your front-end in Python without the overhead that other similar frameworks introduce (the performance is the same as with pure JavaScript). To those familiar with CoffeeScript, RapydScript is like CoffeeScript, but inspired by Python's readability rather than Ruby's cleverness. To those familiar with Pyjamas, RapydScript brings many of the same features and support for Python syntax without the same overhead. Don't worry if you've never used either of the above-mentioned compilers, if you've ever had to write your code in pure JavaScript you'll appreciate RapydScript. RapydScript combines the best features of Python as well as JavaScript, bringing you features most other Pythonic JavaScript replacements overlook. Here are a few features of RapydScript:

- classes that work and feel similar to Python
- modules that can be used for logic abstraction and allow more flexibility than Python's modules
- optional function arguments that work similar to Python
- inheritance system that's both, more powerful than Python and cleaner than JavaScript
- support for object literals with anonymous functions, like in JavaScript
- ability to invoke any JavaScript/DOM object/function/method as if it's part of the same framework, without the need for special syntax
- variable and object scoping that make sense (no need for repetitive 'var' or 'new' keywords)
- ability to use both, Python's methods/functions and JavaScript's alternatives
- similar to above, ability to use both, Python's and JavaScript's tutorials (as well as widgets)
- it's self-hosting, that means the compiler is itself written in RapydScript and compiles into JavaScript

Let's not waste any more time with the introductions, however. The best way to learn a new language/framework is to dive in.


Installation
------------

[Try RapydScript-ng live via an in-browser REPL!](http://kovidgoyal.github.io/rapydscript/repl/)

First make sure you have installed the latest version of [node.js](http://nodejs.org/) (You may need to restart your computer after this step). 

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

**NOTE:** To complement RapydScript, I have also written RapydML (<http://bitbucket.org/pyjeon/rapydml>), which is a pre-compiler for HTML (just like RapydScript is a pre-compiler for JavaScript). 

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

RapydScript also allows an alternative syntax for the same feature, for those preferring Python's traditional, hanging-indent look:

```js
def(one, two) and call(this, 1, 2):
	...
```

Which is equivalent to the following:

```js
def(one, two):
	...
.call(this, 1, 2)
```

Some of you might welcome this feature, some of you might not. RapydScript always aims to make its unique features unobtrusive to regular Python, which means that you don't have to use them if you disagree with them. Recently, we have enhanced this feature to handle `do/while` loops as well:

```js
a = 0
do:
	print(a)
	a += 1
.while a < 1
```

In my opinion, this is something even Python could benefit from. Like with functions, you could use the hanging-indent form as well:

```js
a = 0
do and while a < 1:
	print(a)
	a += 1
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

Another difference is that that, unlike Python, RapydScript will create a
separate object for an optional argument specified as an object literal
each time the function is called.  This makes it slightly less efficient, but
prevents the common bug in python caused by using a mutable object literal as
the default value for an optional argument.

The last difference is that you cannot use named arguments when calling a
function that has not been defined with named arguments. So, for example, the
following works in python but not in RapydScript:

```py
def f(a):
    return a

f(a=1)
```

Instead, in RapydScript you must do:

```py
def f(a=3):
    return a

f(a=1)
```

This is for performance of *normal* JavaScript function calls.

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

Note that as a convenience, RapydScript supports both the Python and JavaScript
forms for the conditional ternary operator. Namely, both the following work:

```js
a = (condition) ? 1 : 2
a = 1 if condition else 2
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

a = [1, 2]
s = {a}
a in s  # True
[1, 2] in s # False

This is because, as noted above, object equality is vai the ```is```
operator, not hashes.

### Dicts

dicts are the most different in RapydScript, from Python. This is because
RapydScript uses the JavaScript Object as a dict, for compatibility with 
external JavaScript libraries. This means there are several differences
between RapydScript dicts and Python dicts.

    - You can only use primitive types (strings/numbers) as keys in the dict
    - If you use numbers as keys, they are auto-converted to strings
    - You can access the keys of the dict as attributes of the dict object
    - Trying to access a non-existent key returns ``undefined`` instead of
      raising a KeyError
    - dict objects do not have the same methods as python dict objects:
      ``items(), keys(), values(), get(), pop(), etc.`` You can however use
      RapydScript dict objects in ```for..in``` loops.

Fortunately, there is a builtin ```dict``` type that behaves just like Python's
```dict``` with all the same methods. The only caveat is that you cannot use
the regular syntax for dict literals or getting and setting items, instead you
have to use a slightly modified, syntax, with the ```!``` operator, as show
below:

```py
a = {!1:1, 2:2}
a[!1]  # == 1
a[!3] = 3
```

The ```!``` operator is needed to let the compiler know that you want to use
python dicts not javascript objects. This is necessary to avoid a big
performance hit when using the standard ```[]``` notation on native JavaScript
arrays and objects.


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
RapydScript's loops work like Python, not JavaScript. You can't, for example use ```for(i=0;i<max;i++)``` syntax. You can, however, loop through arrays using 'for ... in' syntax without worrying about the extra irrelevant attributes regular JavaScript returns.

```py
animals = ['cat', 'dog', 'mouse', 'horse']
for animal in animals:
	print('I have a '+animal)
```
		
If you need to use the index in the loop as well, you can do so by using enumerate():

```
for index, animal in enumerate(animals):
	print("index:"+index, "animal:"+animal)
```

Like in Python, if you just want the index, you can use range:

```py
for index in range(len(animals)):			# or range(animals.length)
	print("animal "+index+" is a "+animals[index])
```

When possible, RapydScript will automatically optimize the loop for you into JavaScript's basic syntax, so you're not missing much by not being able to call it directly.


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

Note that set comprehensions currently create an ES6 Set object, so they will
only work if the javascript runtime you use supports ES 6 Sets. At some point
in the future, I might add a builtin set type to RapydScript that behaves like
the python set type.

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

Creating DOM tree's efficiently
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

A couple things to note here. We can invoke methods from the parent class the same way we would in Python, by using `Parent.method(self, ...)` syntax. This allows us to control when and how (assuming it requires additional arguments) the parent method gets executed. Also note the use of `\` operator to break up a line. This is something Python allows for keeping each line short and legible. Likewise, RapydScript, being indentation-based, allows the same.

An important distinction between Python and RapydScript is that RapydScript does not allow multiple inheritance. This might seem like a big deal at first, but in actuality it barely matters. When using multiple inheritance, we usually only care about a few methods from the alternative classes. Leveraging JavaScript prototypical inheritance, RapydScript allows us to reuse methods from another class without even inheriting from it:

```py
class Something(Parent):
	def method(self, var):
		Parent.method(self, var)
		SomethingElse.method(self, var)
		SomethingElse.anotherMethod(self)
```

Notice that `Something` class has no `__init__` method. Like in Python, this method is optional for classes. If you omit it, an empty constructor will automatically get created for you by RapydScript (or when inheriting, the parent's constructor will be used). Also notice that we never inherited from SomethingElse class, yet we can invoke its methods. This brings us to the next point, the only real advantage of inheriting from another class (which you can't gain by calling the other classes method as shown above) is that the omitted methods are automatically copied from the parent. Admittedly, we might also care about `isinstance()` method, to have it work with the non-main parent, which is equivalent to JavaScript's `instanceof` operator.

There is also a convenience function in RapydScript called `mixin` that lets you assign all methods of a given class to another, like Python's multiple inheritance:

```py
mixin(Snake, Animal, false)     # add Animal's methods to Snake, don't overwrite ones already declared in Snake
mixin(Snake, Animal, true)      # add Animal's methods to Snake, overwriting ones already declared in Snake
```

To summarize classes, assume they work the same way as in Python, plus a few bonus cases. The following, for example, are equivalent:

```py
class Aclass:
	def __init__(self):
		pass

	def method(self):
		doSomething(self)

class Aclass:
	def __init__(self):
		self.method = def():
			doSomething(self)
```

The variable `self` in the above example is not a keyword. Like in Python, it can be replaced with any other variable name. Also, like in Python, this variable will be tied to the class, unlike `this` keyword of JavaScript. RapydScript still treats `this` keyword the same way JavaScript does:

```py
class Main:
	def __init__(s):
		main = this
		method = def():
			main.doSomething()
		$('#element').click(method)
	
	def doSomething(s):
		...
```

Or, leveraging Pythonic binding to first argument, the same can be shortened to:

```
class Main:
	def __init__(s):
		method = def():
			s.doSomething()
		$('#element').click(method)
	
	def doSomething(s):
		...
```

Like Python, RapydScript allows static methods. Marking the method static with `@staticmethod` decorator will compile that method such that it's not bound to the object instance, and ensure all calls to this method compile into static method calls:

```py
class Test:
	def normalMethod(self):
		return 1

	@staticmethod
	def staticMethod(a):
		return a+1
```

Some methods in the native JavaScript classes, such as `String.fromCharCode()` have also been marked as static to make things easier for the developer.

Note that currently classes do not support class level variables, unlike
Python.


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
		print('My name is' + self.name)

tod = Boy('Tod')
tod.greet()                 # Hello, my name is Tod
getattr(tod, 'greet')()     # Hello, my name is undefined
```

In some cases, however, you may wish for the functions to remain bound to the object they were retrieved from. For those cases, RapydScript has `bind` function. Unlike regular JavaScript `Function.prototype.bind`, RapydScript's `bind` can rebind methods that have already been bound. The binding we wanted to see in the above example can be achieved as follows:

```py
bound = bind(getattr(tod, 'greet'), tod)
bound()                     # Hello, my name is Tod
```

To unbind a bound method, you can call pass `false` as a second argument instead of an object you wish to bind to. You can also auto-bind all methods of the class by calling `rebind_all`:

```py
class Boy:
	def __init__(self, name):
		self.name = name
		rebind_all(self)

	def greet(self):
		print('My name is' + self.name)

tod = Boy('Tod')
tod.greet()                 # Hello, my name is Tod
getattr(tod, 'greet')()     # Hello, my name is Tod
```

Likewise, ``rebind_all(self, false)`` will unbind all methods. It's not recommended to auto-bind classes that inherit from 3rd party libraries. For example, `casperjs` has `Casper` class, which RapydScript can easily inherit and extend:

```py
@external
class Casper:
	pass

class Scraper(Casper):
	def __init__(self):
		Casper.__init__(self)
		self.start()

s = Scraper()
s.thenOpen('http://casperjs.org',
	def(): this.echo(this.getTitle())
)
s.run()
```

Including `rebind_all` call in the constructor, however, will break `Casper`. It is for that reason that `rebind_all` isn't added to the constructor by default by RapydScript. You could, however use `--auto-bind` compile flag to have RapydScript rebind automatically for you. There is a bit more that this flag does behind the scenes, which ensures that class binding behaves identical to Python, at the expense of some performance and compatibility with libraries like `casperjs`.

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
Like Python and JavaScript, RapydScript has exception handling logic. The following, for example, will warn the user if variable `foo` is not defined:

```py
try:
	print(foo)
except:
	print("Foo wasn't declared yet")
```

It's a good practice, however, to only catch exceptions we expect. Imagine, for example, if `foo` was defined, but as a circular structure (with one of its attributes referencing itself):

```py
foo = {}
foo.bar = foo
```

We would still trigger an exception, but for a completely different reason. A better way to rewrite our `try/except` block would be:

```py
try:
	print(foo)
except ReferenceError:
	print("Foo wasn't declared yet")
```

We could also handle circular structure exception, if we needed to:

```py
try:
	JSON.stringify(foo)
except ReferenceError:
	print("Foo wasn't declared yet")
except TypeError:
	print("One of foo's attributes references foo")
```

Or we could just dump the error back to the user:

```py
try:
	print(foo)
except as err:
	print(err.name + ':' + err.message)
```

In this example, `err` is a JavaScript error object, it has `name` and `message` attributes, more information can be found at <https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error>. You can inherit from this object as if it was a class to create custom errors, just like you would in Python:		

```py
class MyError(Error):
	def __init__(self, message):
		self.name = Error
		self.message = message

raise MyError('This is a custom error!')
```

You can lump multiple errors in the same except block as well:

```py
try:
	print(foo)
except ReferenceError, TypeError as e:
	print(e.name + ':' + e.message)
```

Basically, `try/except/finally` in RapydScript works very similar to the way it does in Python 3, lacking only the `else` directive (it didn't seem useful enough to implement). Like in Python and JavaScript, you can nest multiple exceptions inside each other, and use `raise` to throw the error back at the user:

```py
try:
	print(foo)
except ReferenceError as e:
	if e.message == 'foo is not defined':
		print('undefined')
	else:
		raise e
finally:
	# reset foo
	foo = 'bar'
```

Like in Python (but unlike in regular JavaScript), you can use `raise` keyword by itself from within `except` block to reraise last-caught error.


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

Shadowing is preferred in most cases, since it can't accidently damage outside logic, and if you want to edit an external variable, you're usually better off assigning function's return value to it. There are cases, however, when using `nonlocal` makes the code cleaner. There is also `global`, but it is rarely a good solution, and use of `nonlocal` is preferred to it.


Available Libraries
-------------------
One of Python's main strengths is the number of libraries available to the developer. This is something very few other `Python-in-a-browser` frameworks understand. In the browser JavaScript is king, and no matter how many libraries the community for the given project will write, the readily-available JavaScript libraries will always outnumber them. This is why RapydScript was designed with JavaScript and DOM integration in mind from the beginning. Indeed, plugging `underscore.js` in place of RapydScript's `stdlib` will work just as well, and some developers may choose to do so, after all, `underscore.js` is very Pythonic and very complete. Likewise, `sprintf.js` (<https://npmjs.org/package/sprintf-js>) can be used with RapydScript to replicate Python's string interpolation.

It is for that reason that I try to keep RapydScript bells and whistles to a minimum. RapydScript's main strength is easy integration with JavaScript and DOM, which allows me to stay sane and not rewrite my own versions of the libraries that are already available. That doesn't mean, however, that pythonic libraries can't be written for RapydScript. To prove that, I have implemented lightweight clones of several popular Python libraries and bundled them into RapydScript, you can find them in `src` directory. The following libraries are included:

	stdlib/stdlib2		# see stdlib section
	math				# replicates almost all of the functionality from Python's math library
	re					# replicates almost all of the functionality from Python's re library
	unittest			# replicates almost all of the functionality from Python's unittest library
	random				# replicates most of the functionality from Python's random library
	yql					# lightweight library for performing Yahoo Query Language requests

For the most part, the logic implemented in these libraries functions identically to the Python versions. One notable exception is that unittest library requires that classes be bound to the `global` (nodejs) or `window` (browser) object to be picked up by `unittest.main()`. An example in `unitetest.pyj` shows this usage. I'd be happy to include more libraries, if other members of the community want to implement them (it's fun to do, `re.pyj` is a good example), but I want to reemphasize that unlike most other Python-to-JavaScript compilers, RapydScript doesn't need them to be complete since there are already tons of available JavaScript libraries that it can use natively.

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

Advanced Usage Topics
---------------------
This section contains various topics which might be of interest to the programmer writing large projects using RapydScript, but might not be relevant to a programmer who is just getting started with RapydScript. The topics in this section focus on coding conventions to keep your code clean, optimizations, and additional libraries that come with RapydScript, as well as suggestions for writing your own libraries.

#### Browser Compatibility
RapydScript compiles your code such that it will work on browsers that are
compatible with the ES 5 JavaScript standard. The compiler has a 
``--js-version`` option that can also be used to output ES 6 only code. This
code is smaller and faster than the ES 5 version, but is not as widely
compatible.

#### Tabs vs Spaces
This seems to be a very old debate. Python code conventions suggest 4-space indent. The old version of RapydScript relied on tabs, new one uses spaces since that seems to be more consistent in both Python and JavaScript communities. Use whichever one you prefer, as long as you stay consistent. If you intend to submit your code to RapydScript, it must use spaces to be consistent with the rest of the code int he repository.

#### Semi-Colons
Don't abuse semi-colons. They're meant as a way to group related logic together, not to fit your entire web-app on one line. The following is fine:

```py
X = 0; Y = 1
```

Anything that requires more than a couple semi-colons, however, or involves long mathematical computations, is better off on its own line. Use your discretion, if the logic requires more than one visual pass-through from the programmer to understand the flow, you probably shouldn't use semi-colons. A Fibonacci function, as shown below, would probably be the upper limit of the kind of logic you could sanely represent with semi-colons:

```js
fib = def(x): if x<=1: return 1; return fib(x-1)+fib(x-2)
```

Even for this example, however, I'd personally prefer to use multiple lines.

#### jQuery-wrapped Elements
If you use jQuery with your app, you will probably be storing these into variables a lot. If you've written a decently sized app, you've probably mistaken a bare element with wrapped element at least once. This is especially true of objects like `canvas`, where you need to access object's attributes and methods directly. My solution for these is simple, prepend jQuery-wrapped elements with `$`:

```js
$canvas = ('<canvas></canvas>')
canvas = $canvas.get(0)
ctx = canvas.getContext('2d')
$canvas.appendTo(document)
```

This is especially useful with function definitions, since you will immediately know what kind of object the function takes in just by skimming its signature.

#### External Libraries and Classes
RapydScript will pick up any classes you declare yourself as well as native JavaScript classes. It will not, however, pick up class-like objects created by outside frameworks. There are two approaches for dealing with those. One is via `@external` decorator, the other is via `new` operator when declaring such object. To keep code legible and consistent, I strongly prefer the use of `@external` decorator over the `new` operator for several reasons, even if it may be more verbose:

- `@external` decorator makes classes declared externally obvious to anyone looking at your code
- class declaration that uses `@external` decorator can be exported into a reusable module
- developers are much more likely to forget a single instance of `new` operator when declaring an object than to forget an import, the errors due to omitted `new` keyword are also likely to be more subtle and devious to debug

#### Embedding the RapydScript compiler in your webpage

You can embed the RapydScript compiler in your webpage so that you can have
your webapp directly compile user supplied RapydScript code into JavaScript.
To do so, simply include the [embeddable rapydscript compiler](https://kovidgoyal.github.io/rapydscript/repl/rapydscript.js) 
in your page, and use it to compile arbitrary RapydScript code. 

You create the compiler by calling: `RapydScript.create_compiler()` and compile
code with `compiler.compile(code)`. You can execute the resulting JavaScript
using the standard `eval()` function. See the sample
HTML below for an example.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Test embedded RapydScript</title>
        <script src="https://kovidgoyal.github.io/rapydscript/repl/rapydscript.js"></script>
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
  Internet Explorer. Technically, it is possible to have it work with older
  browsers, but that would increase the size of the embedded compiler by an
  order of magnitude (600 KB -> 6 MB)

* Importing of modules only works with the standard library modules. There is
  currently no way to make your own modules importable.

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
  the keywords of JavaScript. For example, ``default`` and ``delete`` are
  keywords in RapydScript. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords)
  for a list of JavaScript keywords.

- Method binding in RS is not automatic. So ``someobj.somemethod()`` will do the
  right thing, but ``x = someobj.somethod; x()`` will not. RS could work around
  it, but at significant performance cost. See the section above on method
  binding for details.

- The loop variables in list comprehensions do not leak into the surrounding
  scope, unlike Python. So if you do ```[x for x in [1]]``` x will not be
  defined outside the comprehension itself. This is arguably a mis-feature in
  Python, which RapydScript corrects :) Note that loop variables in ordinary
  for loops do leak into the surrounding scope, just as in Python.

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

- The {"a":b} syntax is used to create JavaScript objects. These do not behave
  like python dictionaries. To create python like dictionary objects, you
  should use the {!"a":b} syntax. This is done to ease interop with external
  javascript libraries, most of which use javascript objects as dictionaries.

Changes in this fork compared to atsepkov/RapydScript
----------------------------------------------------------

Some of these changes might have been merged back into the original repository.
This list below records all the work I have done on RapydScript so far.

1. There is now a REPL (Run ```rapydscript``` with no arguments to start it).
   You can also try the REPL [live in your browser](https://kovidgoyal.github.io/rapydscript/repl/)

1. There is now a ``linter`` that checks for various problems in your code. Most of
   the checks are for unused/undefined names, like ``pyflakes``. But, there are
   also many other checks for invalid or problematic code. To use it:
   ``rapydscript lint file.pyj``

1. The import/module system has been completely changed. It now works just like
   python, with modules being per file and packages being a directory with
   ```__init__.pyj```. The ```module:``` keyword has been removed.

1. There is support for internationalization, using the standard gettext file
   formats and API. See the section on Internationalization above.

1. RapydScript now supports the full python syntax for defining functions with
   optional arguments, variable numbers of arguments, variable optional
   arguments, etc. There is no longer any kwargs decorator, as it is not
   needed.

1. Added list, set and dict types that behave like python's corresponding types.

1. RapydScript now supports generators (yield keyword). 

1. Made dict literals behave like python, not javascript. In particular, you
   can now use arbitrary expressions as keys, not just constants. And if you
   use a name without quotes, it is not automatically treated as a string. This
   change is backwards incompatible, but the linter should help you easily find
   all places in your code that need to be changed.

1. Added support for dict, set and generator comprehensions, not just list comprehensions

1. Added support for iterators that work seamlessly with JavaScript code. And
   a builtin ``iter()`` function to easily create them from
   arrays/strings/objects.

1. Added support for arbitrary expressions as decorators

1. Added support for property getter/setters using the same syntax as python
   (@property decorator)

1. Added support for the `with` statement (context managers)

1. RapydScript now supports the Python integer (floor) division operator. 
   ``100 // 3 = 33``

1. RapydScript now supports the Python conditional operator syntax:
   ``a = 1 if b else 2``

1. RapydScript now supports class level variables. The original compiler used
   to simply throw away all non-method code in the class context. It doesn't do
   that any more :)

1. RapydScript now supports recursive de-structuring assignment, so you can do:
   ```py
   for a, (b, c) in enumerate([ [1,2], [3,4] ]):
      ...
   ```

1. Re-wrote the re.pyj module to more closely support the python regular
   expression semantics, including named groups, finditer(), regex flags,
   the python syntax for replacement strings, etc.

1. Created an elementmaker module to the stdlib to efficiently build DOM trees
   in pure RapydScript

1. Changed the syntax for embedded JavaScript to use verbatim string literals
   instead of a magic compile time function.

1. Add an ES 6 output mode ```--js-version 6``` that outputs ES 6 only code.
   This code is cleaner and faster by making use of some ES 6 facilities.
   Mainly for iterators and generators.

1. Add a builtin list type that functions like Python's list type, except that
   it create JavaScript Array object. You can pass any iterable to list and use
   it in isinstance() just as you would in python. Furthermore, all
   arrays/lists in RapydScript behave just like pythons lists, with all the
   same methods and properties. This applies both to list literals as well as
   the return value of the ``list()`` function.

1. Support set literals

1. Remove the to/til operators. They are not particularly useful and break
   compatibility with python code that might use to and til as variable names.

1. Implement automatic concatenation of neighboring string literals: `'12' == '1' '2'`

1. Support python style string literals, with full unicode escapes and the raw
   literal syntax.

1. The command line interface has been cleaned up with many new options and
   improved modularization/robustness. The test suite is now run automatically
   on Travis for continuous integration. I also took the opportunity to get rid
   of the dependencies on ```async``` and ```optimist```.

1. Countless other fixes and improvements, too numerous to list here --
   read the commit log.

Note: this is in no way a hostile fork, and I remain grateful to Alexander
Tspekov for his great work on the original RapydScript. The reason for the fork
is simply that the maintainers of the original project do not currently have
the free time to keep up with the pace of development in this fork. I hope that
someday most of the changes in this fork will be merged back into the original
project. All changes in this fork are licensed under the same license as the
original project, to make that possible.
