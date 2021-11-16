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

C++ is a programming language made by Bjarne Stroustrup at Bell Labs in 1983.

It was not created from the ground up, but it was rather an **evolution** of the already 
existing C language (created by Dennis Ritchie), with the main goal of adding OOP support, 
which was not present in C.

:::info Curiosity

Originally, the language was called "*C with classes*", but then C++ became the final name 
because `++` is an operator which increments the value of a variable and using the "+" 
sign is a common naming convention among software developers to indicate an enhanced 
computer program.

:::

If you are curious, there's a much more in-depth explanation [here](https://www.geeksforgeeks.org/history-of-c/), 
done by GeeksforGeeks.

![Problem solving process diagram](https://media.geeksforgeeks.org/wp-content/uploads/20190716103831/History-of-C.jpg)


## Why use it

Both C and C++ are very famous and largely used fot a wide range of software types and 
platforms.

The advantages and features of  C++ language are many, but une of its strengths is 
that the compilation and execution time is **really fast**. That's probably the main 
reason why it's often choosed over other languages, but it's not the only one.

Another key aspect of C++ is it's [**high level nature**](https://en.wikipedia.org/wiki/High-level_programming_language), 
making it easier to learn, to read, to understand and, most importantly, to work with.


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
comment
*/
I'm not a comment, too
```

**Single line comments** are considered comments only if the text is typed in the same line 
of the two slashes `//`. In other words, `//` indicates that everything following it 
until the end of the line is a comment.

A **multi-line comment**, instead, is considered as a comment if the text is typed *between*
`/*` and `*/`.


## Execution (IDE)

To run the programs that we'll make, we need a place to execute the code.

The IDEs out there will help us.

### What's an IDE

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



[^1]: [Wikipedia - Comment (computer programming)](https://en.wikipedia.org/wiki/Comment_(computer_programming)#:~:text=a%20comment%20is%20a%20programmer-readable%20explanation%20or%20annotation%20in%20the%20source%20code%20of%20a%20computer%20program)