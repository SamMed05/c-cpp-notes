---
sidebar_position: 2
id: cpp-intro
title: Introduction to C++
hide_title: false
hide_table_of_contents: false
sidebar_label: Introduction to C++
description: Introduction to the basic principles in programming and problem solving.
slug: /cpp/cpp-intro
custom_edit_url: null
---


Instead of going straight to the coding part, it's better to make some context.
Let's start with a bit of history.


## Brief history

C++ is a programming language made by Bjarne Stroustrup at Bell Labs, starting in 1979.

It was not created from the ground up, but it was rather an **evolution** of the already 
existing C language (created by Dennis Ritchie), with the main goal of adding the new OOP 
(Object Oriented Programming) *programming paradigm* support, which was not present in C.

C++ was standardized in 1998, and since then several updates has been made. C++11 in 
particular added a huge number of new capabilities, and new upgrades to the language 
are expected every three or so years.

:::info Curiosity

Originally, the language was called "*C with classes*", but then C++ became the final name 
because `++` is an operator which increments the value of a variable and using the "+" 
sign is a common naming convention among software developers to indicate an enhanced 
computer program.

:::

If you are curious, there's a much more in-depth explanation [here](https://www.geeksforgeeks.org/history-of-c/), 
done by GeeksforGeeks.

![History of C++](https://media.geeksforgeeks.org/wp-content/uploads/20190716103831/History-of-C.jpg)
<figcaption>Fig.1. The storyline of C and C++. Image courtesy of GeekforGeeks (CC BY-SA license).
</figcaption>


## Characteristics of C++

C++ is an hybrid language, so it contains not only object-oriented language but also 
the functionality of the C programming language, so traditional procedural programming. 
This means that you have all the features that are available in C, like:
- universally usable modular programs
- efficient, close to the machine programming
- portable programs for various platforms.

Existing C source code can be used in C++ programs.

Various language elements were added to C++ other than OOP programming paradigm, such as references, templates, 
exception handling and many more things which are important for an efficient program 
implementation. 

You don't actually already have to know all those concepts, though, so don't worry.


## Why use it

Both C and C++ are very famous and largely used for a wide range of software types and 
platforms.

The advantages and features of  C++ language are many, but une of its strengths is 
that the compilation and execution time is **really fast**. That's probably the main 
reason why it's often choosed over other languages, but it's not the only one.

Another key aspect of C++ is it's [**high level nature**](https://en.wikipedia.org/wiki/High-level_programming_language), 
making it easier to learn, to read, to understand and, most importantly, to work with.

In addition to being an high performance language, it also give the programmer precise 
control over memory and other resources of the computer, makikng it a bit harder to 
learn but also more powerful and capable of doing more things.

There's a nice overview on the advantages of learning C++ in 
[this website](https://www.programiz.com/cpp-programming/guide) by Programiz.


## Where it's used

- Video games (especially for graphic engines and game develompment, e.g. in [Unreal Engine](https://www.unrealengine.com/))
- Operating systems (also in C language)
- Real-time systems (e.g. for transportation, manufacturing, etc…)
- High-performance financial applications (e.g. high frequency trading)
- Graphical applications and simulations
- Embedded software (also in C language)
- Audio and video processing
- Artificial intelligence, machine learning and neural networks
- Scientific research
- Web browsers (like [Chrome](https://en.wikipedia.org/wiki/Google_Chrome#:~:text=C%2C-,C%2B%2B,-%2C%20Assembly%2C%20HTML%2C%20Java) and [Firefox](https://en.wikipedia.org/wiki/Firefox#:~:text=Written%20in-,C%2B%2B,-%2C%20C%2C%20Rust%2C%5B5))
- GUI Based Applications
- Databases
- Compilers of various high-level programming languages, like C# and Java (also in C language)
- Productivity software (MS Office, Photoshop, Maya/3ds Max, SolidWorks, Inventor, AutoCAD…)


## Basic information

### Structure of a program

The structure of a program in C++ can vary, but in its basic form it looks like this:

```cpp
#include <...>
using namespace ...;

int main()
{
	...
	
	return 0;
}
```

We will see what those words means and what to put instead of the generic three dots 
`...`, but for what matters in this section, it's just important to remember that each 
program that you write contains a `main()` function, and in here you will write 
the instructions needed for the program to work properly.

Every single program must have that special function, called in that way (all lower case 
letters). When the program is run, the instructions, or statements inside of main are 
executed in sequential order.

We'll cover what a function is in a future chapter, but for now just know that it is a 
collection of instructions that can be reused and they have a name which identifies them 
followed by two parenthesis at the end like this: `function()` and eventually some 
"things" inside `(...)`, called parameters.


### Comments

A comment in computer programming is a programmer-readable explanation or annotation in 
the source code of a computer program[^1]. This text is inserted in the code by the 
programmer, and it's not processed by the compiler (or interpreter), meaning that it's 
completely ignored in the execution phase. 
Comments purpose is just making the source code easier for humans to understand.

A comment in C++ can be added in two ways, like below:

```cpp
// this is a single-line comment
I'm not a comment

/* 
This is a 
multi-line
comment that
spans multiple 
lines
*/
I'm not a comment, too
```

**Single line comments** are considered comments only if the text is typed in the same line 
of the two slashes `//`. In other words, `//` indicates that everything following it 
until the end of the line is a comment.

A **multi-line comment**, instead, is considered as a comment if the text is typed *between*
`/*` and `*/`.

:::warning

Do not use multi-line comments inside other multi-line comments.

:::


### Indentantion

Indentation is a term that express the action of putting whitespace for formatting purposes.

It means adding some empty space among the code in the right way so that it becomes more readable.

Some languages like Python use indentation as an important part of their syntax, and it 
influences how the code is interpreted by the interpreter.

This **does not** happens in C and C++, beacuse the compiler ignores whitespace. For this reason, 
we say that they are **whitespace-independent** languages. Instead we use braces to tell the 
compiler that a peace of code belongs (it's inside) a block of other code or not.

That means that indentation would be optional, but it's important anyway for keeping a 
good level of readability.

Usually, if you use an IDE with a text editor, when you press <kbd>ENTER/RETURN ⏎</kbd> on 
the keyboard it automatically adds a **tab-sized whitespace**. In the other cases, you can 
add it pressing the <kbd>TAB ⇆</kbd> key. It's fine using also four (or three) spaces instead, 
but I prefer not doing in that way.

Indentation is used like this:

```cpp
int main() {
	...
	...
> > codeBlock() {
		...
		...
> > > > nestedCodeblock() {
			...
			...
> > > > }
		...
		...
> > }
	...
	...
}
```

I intentionally used the `>` sign to indicate better the space on the left left blank, but 
you don't have to use it. It creates a three-like structure that is more beautiful and less 
difficult to read.

The type of indentation styling used above (and the one I personally prefer) is called 
**K&R style**, or "one true brace style". It's one of the most common together with the
*Allman style* and you can freely choose the one you prefer. To read the full list of indentation 
styles, visit the [Wikipedia page](https://en.wikipedia.org/wiki/Indentation_style) and see this 
nice [GitHub gist](https://gist.github.com/jesseschalken/0f47a2b5a738ced9c845) by Jesse Schalken to 
learn more about K&R style.

![How K&R indentation style works](https://camo.githubusercontent.com/5f8d4e9df81bc42386b42b5a3a286f724c1e001c441330483fa26b8e30f04d3a/68747470733a2f2f692e696d6775722e636f6d2f567758395876332e706e67)
<figcaption>Fig.2. A clear representation of how to read nested blocks when using the K&R indentation style (from Jesse Schalken's gist).
</figcaption>


## Development phases

A computer program is realized passing through different phases. I already discussed the 
phases of creation of a program in the previous section, but here we are talking more 
specifically about the programming phase. Let's see how it works.

![Program development phases](./assets/cpp-program-development-phases.svg)
<figcaption>Fig.2. A scheme describing the process behind the creation of an executable file from C++ code.</figcaption>

### What's an IDE

To run the programs that we'll make, we need a place to execute the code. The IDEs out 
there will help us.

IDE is an acronym which stands for **I**ntegrated **D**evelopment **E**nvironment, and 
it's an enviroment, or place, or software that help the programmer in the develompment
and debugging phases of a program.

It provides to the developer some facilities and tools, like a source code editor, build 
automation tools and a **debugger**.

We are mainly interested in the debugger, which is a computer program that basically runs 
the code and shows us the output with the command prompt, if requested.

There are many IDEs to choose from, both open source and paid. Personally, I use Dev-C++,
which compiles also C language. You can download it **[here](https://sourceforge.net/projects/orwelldevcpp/)** 
(it's open source).

:::note

This IDE has long since been abandoned and it's not used in professional fields, but Orwell 
(an indipendent programmer) has taken it up and updated it. At the moment of writing, it 
supports the C++11 standard, and although the modern standard is C++14, we don't care about 
that for our learning purposes.

:::

If you prefer to use another IDE, that's perfectly fine, but be sure that it has a compiler
integrated. Also, you can use [online compilers](https://arnemertz.github.io/online-compilers/) 
too, but some libraries will not be present, so programs that will use them won't work.


### Compilation (translation)

After having saved the source code into a source file (or several source files that are 
edited and translated separately in larger projects when doing modular programming) with 
the **`.cpp` extension**, that source file is put through a compiler for translation. 
The compiler checks the syntactic correctness of the code in accordance with the rules 
established by the programming language used. If errors are present, the compiler lists 
them. 

If everything works as planned, an *object file* made up of machine code is created. 
The object file is also referred to as a *module* and can be direcly executed by the 
processor (unlike source code).

### Linking

Finally, in case the construction of the final program requires the union of one or more 
modules and/or needs to integrate the code contained in the libraries (included at the top), 
the **linker** combines the object file with other modules to form an executable file `.exe`. 
These further modules contain functions from standard libraries or parts of the program 
that have been compiled previously.

### Debugging

Debugging is made by the debugger, which is a program that reads step by step every single 
line of code to check if there are any errors which cause malfunctions in the program itself.


[^1]: [Wikipedia - Comment (computer programming)](https://en.wikipedia.org/wiki/Comment_(computer_programming)#:~:text=a%20comment%20is%20a%20programmer-readable%20explanation%20or%20annotation%20in%20the%20source%20code%20of%20a%20computer%20program)