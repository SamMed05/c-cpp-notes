---
sidebar_position: 24
id: compilation
title: Compilation
hide_title: false
hide_table_of_contents: false
sidebar_label: Compilation
description: Understanding the C compilation process
slug: /c/compilation
custom_edit_url: null
---

In C, transforming source code into an executable program involves several distinct stages. Understanding this process helps you manage larger projects, debug effectively, and create more maintainable code.

## Overview of the Compilation Process

When you compile a C program, it goes through three main phases:

1. **Preprocessing**: Handles directives like `#include`, `#define`, and conditional compilation
2. **Translation/Compilation**: Converts preprocessed code into object files
3. **Linking**: Combines object files and libraries into an executable

| Stage             | Input                          | Output                  |
|-------------------|--------------------------------|-------------------------|
| Source file       | `file.c`                       | —                       |
| Preprocessing     | Source + `#include`/macros     | Translation unit (TU)   |
| Compilation       | Translation unit               | Object file (`.o`)      |
| <span style={{ color: "#888" }}>Archiving (opt.)</span>  | <span style={{ color: "#888" }}>One or more object files</span>       | <span style={{ color: "#888" }}>Library (`.a`, `.so`)</span>   |
| Linking           | Object files + libraries       | Executable              |

## The Preprocessor

The preprocessor is the first phase in the compilation process. It handles directives that begin with `#` and manipulates the source code before actual compilation begins.

### #include Directive

The `#include` directive tells the preprocessor to insert the contents of another file into the current file:

```c
#include <stdio.h>    // Search in standard system directories
#include "myfile.h"   // Search first in current directory, then system directories
```

This mechanism allows you to reuse code across multiple files, making programs more maintainable.

### Macro Definitions with #define

The `#define` directive creates macros, which are text substitutions performed before compilation:

```c
// Simple constant macros
#define PI 3.14159
#define MAX_SIZE 100

// Parameterized macros (use with caution)
#define SQUARE(x) ((x) * (x))
```

:::caution Parameterized Macro Pitfalls
When using parameterized macros, always wrap parameters in parentheses to avoid unexpected behavior:

```c
// Bad: without parentheses
#define BAD_SQUARE(x) x * x

// Problem example:
int a = BAD_SQUARE(3 + 1);  // Expands to 3 + 1 * 3 + 1, which equals 7, not 16!

// Good: with parentheses
#define GOOD_SQUARE(x) ((x) * (x))

// Works as expected:
int b = GOOD_SQUARE(3 + 1);  // Expands to ((3 + 1) * (3 + 1)), which equals 16
```

Even with proper parentheses, macros can still cause issues with side effects:

```c
int x = 5;
int y = GOOD_SQUARE(++x);  // x is incremented twice!
```

For these reasons, inline functions are often preferable to parameterized macros in modern C code.
:::

### Conditional Compilation

The preprocessor allows you to include or exclude blocks of code based on conditions:

```c
#if defined _WIN32
    #include <windows.h>
    // Windows-specific code
#elif defined __APPLE__
    #include <MacOS.h>
    // macOS-specific code
#elif defined __linux__
    #include <linux/module.h>
    // Linux-specific code
#else
    #error "Unsupported platform"
#endif
```

Common directives for conditional compilation include:

- `#if`, `#elif`, `#else`, `#endif`: General conditional blocks
- `#ifdef` / `#ifndef`: Shortcuts for `#if defined` / `#if !defined`
- `#error`: Generates a compiler error with a message
- `#pragma once`: Non-standard but widely supported directive for include guards

### Include Guards

Include guards prevent a header file from being included multiple times in a translation unit, which can cause redefinition errors:

```c
/* file: myheader.h */
#ifndef MYHEADER_H
#define MYHEADER_H

// Header content goes here
struct Point {
    double x;
    double y;
};

// Function declarations
extern double distance(struct Point a, struct Point b);

#endif /* MYHEADER_H */
```

:::tip
Always use include guards in header files. The naming convention is typically the filename in uppercase with dots replaced by underscores.
:::

## Separate Compilation

Separate compilation allows you to split a program into multiple source files that can be compiled independently and then linked together.

### Declarations vs. Definitions

In C, understanding the difference between declarations and definitions is crucial for separate compilation:

- **Declaration**: Introduces an identifier and its type without creating it or allocating storage
- **Definition**: Creates the entity and may allocate storage for it

```c
// Declaration (no storage allocated)
extern int counter;
int calculate(int a, int b);

// Definition (storage allocated)
int counter = 0;
int calculate(int a, int b) {
    return a + b;
}
```

### Header and Source Files

A common organization pattern in C projects:

- **Header files (.h)**: Contain declarations, include guards, and possibly inline functions
- **Source files (.c)**: Contain definitions and implement the functionality declared in headers

```c
/* math_utils.h */
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

extern double square_root(double x);
extern double power(double base, int exponent);

#endif /* MATH_UTILS_H */

/* math_utils.c */
#include "math_utils.h"

double square_root(double x) {
    // Implementation
}

double power(double base, int exponent) {
    // Implementation
}
```

### Proper Header File Organization

When creating and using header files:

1. Always include the corresponding header at the top of its `.c` file
2. Use include guards in all header files
3. Include only what is necessary
4. Declare functions and variables in header files, define them in source files

```c
/* Example of good header file organization */

/* geometry.h */
#ifndef GEOMETRY_H
#define GEOMETRY_H

// Include required headers
#include <stddef.h>  // For size_t

// Constants
#define PI 3.14159265358979323846

// Type definitions
typedef struct {
    double x;
    double y;
} Point;

// Function declarations
extern double distance(Point a, Point b);
extern double area_of_circle(double radius);

#endif /* GEOMETRY_H */
```

## Object Files and Linking

### Object Files

An object file (`.o` or `.obj`) is the output of the compilation phase before linking. It contains:

1. Machine code for the compiled source file
2. A symbol table with information about functions and variables
3. Relocation information for linking with other object files

Object files cannot be executed directly because they may have unresolved references to symbols defined in other files.

### The Linking Process

The linker combines multiple object files into an executable by:

1. Resolving external references between object files
2. Combining sections (code, data, etc.)
3. Assigning final addresses to all symbols
4. Generating the executable file format

```
main.o:
- Defined: main
- Referenced: calculate

math.o:
- Defined: calculate
- Referenced: (none)

→ Linker → executable
```

### Static vs. Dynamic Linking

#### Static Linking

In static linking, all library code is copied into the final executable:

```
[App Object Files] + [Library Object Files] → [Complete Executable]
```

**Advantages**:

- Executable runs without dependencies on library versions
- Potentially faster startup time

**Disadvantages**:

- Larger executable size
- Updates require recompilation

#### Dynamic Linking

With dynamic linking, the executable contains references to shared libraries that are loaded at runtime:

```
[App Object Files] → [Executable with References] + [Shared Libraries]
```

**Advantages**:

- Smaller executable size
- Libraries can be updated independently
- Libraries can be shared between applications

**Disadvantages**:

- Dependencies on correct library versions being available
- Slightly slower startup time

:::note
On Linux, shared libraries typically have the `.so` (shared object) extension. On Windows, they use `.dll` (dynamic-link library), and on macOS, they often use `.dylib` (dynamic library).
:::

## Build Automation with Make

> We've already covered Makefile [here](/docs/c/makefile), but let's review the basics and add a few more things that will be useful later.

For larger projects with multiple source files, manually compiling each file becomes tedious. The `make` utility automates this process.

A `Makefile` contains rules that specify how to derive target files from source files, and is structured like this:

```makefile
target: prerequisites
    command
    command
    ...
```

- The `target` is the file to be created
- `prerequisites` are the files that the target depends on
- `commands` are the actions needed to create the target (must be indented with a tab)

### Example Makefile

```makefile
# Compiler and flags
CC = gcc
CFLAGS = -Wall -g

# Target executable
TARGET = myprogram

# Object files
OBJS = main.o utils.o math_funcs.o

# Default target
all: $(TARGET)

# Linking rule
$(TARGET): $(OBJS)
    $(CC) $(CFLAGS) -o $(TARGET) $(OBJS)

# Compilation rules
main.o: main.c utils.h math_funcs.h
    $(CC) $(CFLAGS) -c main.c

utils.o: utils.c utils.h
    $(CC) $(CFLAGS) -c utils.c

math_funcs.o: math_funcs.c math_funcs.h
    $(CC) $(CFLAGS) -c math_funcs.c

# Clean target (phony)
.PHONY: clean
clean:
    rm -f $(OBJS) $(TARGET)
```

:::tip Remember (Linking vs Compilation Commands)

- Compile only (source to object):
    `gcc -c file.c`: generates `file.o` without linking.
- Link only (object to executable):  
    `gcc -o program file.o`: links `file.o` into the `program` executable.
- Compile & link in one step:  
    `gcc file.c -o program`: compiles `file.c` and immediately links into `program`.
    
:::

### Implicit rules and Pattern rules

Make has built-in implicit rules. For example, it knows how to create `.o` files from `.c` files:

```makefile
CC = gcc
CFLAGS = -Wall -g
TARGET = myprogram
OBJS = main.o utils.o math_funcs.o

all: $(TARGET)

$(TARGET): $(OBJS)
    $(CC) $(CFLAGS) -o $@ $^

# No explicit compilation rules needed due to implicit rules

.PHONY: clean
clean:
    rm -f $(OBJS) $(TARGET)
```

### Makefile Variables and Automatic Variables

- `$@`: Represents the target filename
- `$<`: Represents the first prerequisite filename
- `$^`: Represents all prerequisites

```makefile
output: input1.c input2.c
    gcc -o $@ $^
    # Equivalent to: gcc -o output input1.c input2.c
```

:::caution
Make doesn’t know anything about the internals of C compilation, it only compares file modification times. A rule is re‐run if its target is older than any listed prerequisite. If you forget to list a header or source file, changes to it won’t trigger rebuilding. Always declare every dependency in your Makefile to keep builds correct.
:::

## Best Practices for Project Organization

### Recommended Directory Structure

For medium to large projects, a good structure is:

```
myproject/
├── Makefile
├── include/           # Public header files
│   ├── module1.h
│   └── module2.h
├── src/               # Source files
│   ├── module1.c
│   └── module2.c
├── test/              # Test files
│   ├── test_module1.c
│   └── test_module2.c
└── build/             # Build artifacts (generated)
    ├── obj/
    └── bin/
```

### Header File Best Practices

1. Include only necessary headers
2. Use forward declarations when possible
3. Use include guards consistently
4. Keep headers lightweight and focused

### Compilation Best Practices

1. Use `-Wall` to enable important warnings
2. Consider using `-Werror` to treat warnings as errors
3. Use separate compilation for faster builds when making changes
4. Use header dependencies in your Makefile

## 📝 Exercise: Multi-file project

Create a simple multi-file project with:

1. A header file `math_utils.h` with declarations for `add`, `subtract`, and `multiply` functions
2. An implementation file `math_utils.c` with definitions for those functions
3. A main program `calculator.c` that uses those functions
4. A Makefile to build the project

<details>
<summary>Show solution</summary>

**math_utils.h**:
```c
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

extern int add(int a, int b);
extern int subtract(int a, int b);
extern int multiply(int a, int b);

#endif /* MATH_UTILS_H */
```

**math_utils.c**:
```c
#include "math_utils.h"

int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

int multiply(int a, int b) {
    return a * b;
}
```

**calculator.c**:
```c
#include <stdio.h>
#include "math_utils.h"

int main(void) {
    int x = 10;
    int y = 5;
    
    printf("%d + %d = %d\n", x, y, add(x, y));
    printf("%d - %d = %d\n", x, y, subtract(x, y));
    printf("%d * %d = %d\n", x, y, multiply(x, y));
    
    return 0;
}
```

**Makefile**:
```makefile
CC = gcc
CFLAGS = -Wall -g

TARGET = calculator
OBJS = calculator.o math_utils.o

all: $(TARGET)

$(TARGET): $(OBJS)
    $(CC) $(CFLAGS) -o $@ $^

calculator.o: calculator.c math_utils.h
    $(CC) $(CFLAGS) -c $<

math_utils.o: math_utils.c math_utils.h
    $(CC) $(CFLAGS) -c $<

.PHONY: clean
clean:
    rm -f $(OBJS) $(TARGET)
```

</details>
