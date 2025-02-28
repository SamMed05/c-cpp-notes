---
sidebar_position: 2
id: c-intro
title: Introduction to C
hide_title: false
hide_table_of_contents: false
sidebar_label: Introduction to C
description: Introduction to the fundamental concepts of C, a brief history of the language and why use it.
slug: /c/c-intro
custom_edit_url: null
---

:::note

These C notes are from the Computer Science programming course I attended at university, so they will cover more advanced topics.

Instead, I wrote the C++ mini-guide when I was in high school, so they are probably more beginner friendly and I'd suggest to start from those first.

:::

This chapter introduces the fundamental concepts of the C programming language.

## Characteristics of C

Some of the main characteristics of C are:

* **Procedural**: programs are structured as a set of "procedures" or functions that operate on data.
* **Compiled**: the source code is transformed by a program called a *compiler* into machine language, specific to a particular machine, creating an *executable program*.
* **Declarative and typed**: every *variable* (a container for data) has an associated *type* (for example, integer, floating-point number, character). The developer must *declare* the type of each variable before using it.

Even though there's no clear line between abstraction levels in programming languages, C can be considered a ***mid-level language***. It sits between *high-level languages* like Python or Java, which hide many hardware details, and *low-level languages* like assembly, which works directly with the processor's instructions and are highly machine dependent. This gives C a good balance between hardware control and ease of use.

## Brief history

C was created by **Dennis Ritchie** at Bell Labs in the early 1970s. It is closely tied to the **Unix** operating system, for which it was originally developed. It was designed for practical system programming, balancing low-level hardware access with portability.

Brian Kernighan's handwritten "Hello, World!" program from 1978 became an iconic symbol of C:

![Hello World Brian Kernighan 1978.jpg](https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Hello_World_Brian_Kernighan_1978.jpg/800px-Hello_World_Brian_Kernighan_1978.jpg)

<figcaption>By Brian Kernighan - <a rel="nofollow" class="external free" href="https://www.artsy.net/artwork/brian-kernighan-hello-world">https://www.artsy.net/artwork/brian-kernighan-hello-world</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=56193395">Link</a></figcaption>

Over the years, C has been standardized several times:

* **C89/C90** (1989-1990): the first widely adopted standard;
* **C99** (1999): added features like variable-length arrays;
* **C11** (2011): introduced multi-threading support and more;
* **C17** (2018): technical corrections and clarifications to defects in C11.

This guide focuses on **C99** for its broad compatibility, possibly touching upon C11 and C18. Not all compilers fully support the latest standards, so chose the right one based on your necessities.

## Why use C?

C is used in a wide range of applications:

* **Operating Systems** like Linux are written primarily in C.
* **Embedded Systems** such as microcontrollers, due to its efficiency and direct hardware control.
* **Drivers** that allows the operating system to communicate with hardware are often written in C.
* **High-Performance Libraries** used by other languages (for example, numerical libraries for Python) are written in C.
* **WebAssembly**: C can be compiled into WebAssembly, a format that allows high-performance code to run in web browsers.

## With great power comes great responsibility

C offers great control over computer resources, but this freedom also makes it easy to introduce errors (**bugs**) that can cause unexpected behavior or program crashes.

Making mistakes is easy and subtle – the language does not allow the compiler to catch all the "oversights" you might have made. Errors can cause much more serious damage – you don't have an interpreter (like Python) or a virtual environment (like Java) to help you.

Some key principles (you will understand them as you learn the language):

* Always verify that input data is valid and that functions return the expected values;
* Use "safe" functions;
* Engineer your code well;
* Do not underestimate warnings, treat them as errors and fix them.

## Development Tools

To write, compile, and run C programs, we'll need:

* **Text Editor**: you can use a simple text editor (like Notepad on Windows or TextEdit on macOS), but a more advanced editor with features like syntax highlighting and autocompletion is recommended (like VS Code, Sublime Text, Vim, Emacs).
* **Compiler**: the most popular compiler is **GCC** (GNU Compiler Collection), available on Linux, macOS (through tools like Xcode or Homebrew), and Windows (through MinGW or Cygwin).
* **Debugger**: it allows you to run the program step-by-step, inspect the contents of variables, and identify errors. GCC includes **GDB**, a command-line debugger. Many IDEs (integrated development environments) offer debuggers with a graphical interface.
* **Makefile**: a tool for managing the compilation of C projects.

The easiest way to start is probably with **Visual Studio Code**, which is the IDE I'll be using for these notes.

After installing its C/C++ extension (which doesn't include a compiler or debugger), follow this [guide](https://code.visualstudio.com/docs/cpp/config-mingw#_installing-the-mingww64-toolchain) to install the C and C++ compiler on your computer.
