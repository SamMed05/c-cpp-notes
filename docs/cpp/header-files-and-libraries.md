---
sidebar_position: 9
id: header-files-and-libraries
title: Header files and libraries
hide_title: false
hide_table_of_contents: false
sidebar_label: Header files and libraries
description: How type conversion works in C++.
slug: /cpp/header-files-and-libraries
custom_edit_url: null
---

A header file is a file usually ending (always in C but not necessarily in C++) with the “`.h`” 
extension that can be included in the source code of a program with the preprocessor directive 
`include` followed by the name of the file between angular brackets or quotation marks:

```cpp
#include <filename>
#include <filename.h>
// or
#include "filename"
#include "filename.h"
```

There are two types of header file:
1. Pre-existing header files
2. User-defined header files

An example of header file is the built-in `iostream` standard library header 
([full list](https://en.cppreference.com/w/cpp/header)), which contains the declarations related 
to objects like `cin` and `cout` used for manipulating I/O streams, as we saw in the 
[Cout/Cin lesson](https://c-cpp-notes.vercel.app/docs/cpp/cout-and-cin).

### Content and differences

:::caution

The following part is about an advanced topic. If you don't already know functions and classes 
feel free to skip this part.

:::

Following the standard, a header file contains predefined *function declarations* (also called 
*function prototypes*), macros definitions and classes (but also data types and constants used 
with the libraries) to be shared between several source files but cannot contain *function 
definitions*, which are instead contained in the libraries (or multiple `.c`/`.cpp` source files 
which are compiled in object code `.o` and then packed into a library `.lib`, eventually 
composed by multiple `.o` files).

Libraries are a compiled set of function definitions (the actual implementations of 
instructions) of the declarations in the header files consisting in many 0 and 1, not source code 
like header files do. The library is included in your `.exe` file at link time.

The reasons why function definitions should not be written inside header files is explained 
[here](https://softwareengineering.stackexchange.com/a/56230), 
[here](https://docs.microsoft.com/en-us/cpp/cpp/header-files-cpp?view=msvc-170#what-to-put-in-a-header-file) 
and [here](https://www.quora.com/What-do-headers-in-C-programming-actually-do/answer/Abhay-Bhave). 
If you are confusing header files with libraries, see this GeeksforGeeks 
[comparison article](https://www.geeksforgeeks.org/difference-header-file-library/).