---
sidebar_position: 4
id: variables-and-types
title: Variables and types
hide_title: false
hide_table_of_contents: false
sidebar_label: Variables and types
description: What variables are and what types you can use in C.
slug: /c/variables-and-types
custom_edit_url: null
---

This chapter covers the fundamental concepts of variables and data types in the C programming language. I've already briefly covered [variables and types in C++](/docs/cpp/variables-and-types), if you are interested, but here you'll find a more in-depth explanation focusing on C specifically. Still, most concepts hold to both languages.

## Variable declaration and definition

We can think of variables as containers of data with a label (called *identifier*) to refer to them. In the computer, variables are stored in memory locations, each identified by a unique address, allowing the program to access and manipulate the data we tell it to.

In C, you must ***declare*** a variable before you can use it. A variable declaration tells the compiler the variable's *name* (identifier) and the *type* of data it will hold (or return, in the case of functions as we'll see in the future), while a ***definition*** also allocates memory and initializes a variable with a value (or provides a function’s implementation).

Declaration (name and type) can occur **multiple times** in a file, while definition (allocation in memory) can only occur **once** for a variable or function.

It might seem like a subtle difference, but it's not, and it's important to distinguish the two cases. Let's repeat the differences more clearly:

* A ***declaration*** tells the compiler that a variable or function exists somewhere, specifying its **name** and **type** but **not allocating memory**.
  * A declaration can appear multiple times, because you're simply telling the compiler that the variable/function exists. The compiler uses the declaration to check syntax as well as whether the type and name must be correct or not.
* A ***definition*** is a **declaration plus memory allocation**. It's the actual instantiation/implementation of the identifier.
  * A definition can only happen once and *exactly* once, because memory for that variable (or function) definition is allocated once. If you define something more than once, then the [linker](https://stackoverflow.com/a/3323000/13122341) doesn't know which of the definitions to link references to and complains about duplicated identifiers, while if you forget to define something that's been declared and referenced somewhere, then the linker doesn't know what to link references to (even though the name exists in the declaration, there's no corresponding definition to link to) and raises an error about a missing identifier.

The confusing part is that in C language, variable definition and declaration takes place at the same time, i.e. there is no difference between declaration and definition:

```c
int x;  // declaration AND definition
float y = 9.99;   // still, declaration AND definition
```

The code above allocates memory for both `x` and `y` variables. However, `x` has an indeterminate (uninitialized) value.

:::note About `extern`

The only way to make a variable declaration without defining it it with the `extern` keyword, which is used to declare a variable or a function whose definition is present in some other file:

```c
// declaration (no memory allocated, "there's an int x somewhere")
extern int x;
// This is correct
extern int x;  // ✔️ Legal

// definition (memory allocated)
int y = 10;
// This will error
int y = 10;  // ❌ Error
```

You can have multiple `extern int x;` in different files, but only one `int y = 10;`.

:::

:::info (spoiler) Function Declaration 🆚 Definition

```c
// declaration (just a prototype, no body)
int add(int, int);

// definition (implements and allocates memory for the function)
int add(int a, int b) {
    return a + b;
}
```

In the case of function declarations, using `extern` is optional and they can appear multiple times:

```c
float func(int, float);
float func(int, float); // same declaration
extern float func(int, float); // same as above
extern float func(int, float); // same as above
```

:::

### Declaration syntax

The general syntax for declaring a variable is:

```c
type identifier;
// or (multiple variables on the same line)
type identifier_1, identifier_2, ...;
```

#### Valid identifiers

A valid identifer must follow some rules:

* It can contain letters (a-z, A-Z), digits (0-9), and underscores (_).
* It must *start* with a letter or an underscore.
* It is case-sensitive (`myVariable` and `myvariable` are different).
* Keywords (like `int`, `float`, `if`, `while`, etc.) cannot be used as variable names. These are *reserved words*.

Examples of valid and invalid variable names:

```c
int age;
char my_char;
float _internal_value;

// This will error
int 2ndValue;     // Starts with a digit
// This will error
float my-value;   // Contains a hyphen
// This will error
char for;         // 'for' is a keyword
```

Go [here](/docs/cpp/variables-and-types#syntax) to see the the full list of reserved keywords.

### Variable initialization

![Variable declaration](../c/assets/variable-declaration.svg)
<figcaption>Fig.1. The names of the parts of a variable declaration and initialization.</figcaption>

You can initialize a variable (assign it an initial value) at the time of declaration:

```c
int count = 0;
float pi = 3.14159;
char grade = 'A';
int a = 5, b = 10;
```

Or you can assign the value later:

```c
int a, b;
a = 3;
b = 2;
```

It's good practice to initialize variables when you declare them, unless you have a specific reason not to. Uninitialized variables contain *garbage values* (whatever was previously stored in that memory location), which can lead to unpredictable program behavior.

:::info (spoiler) Memory Allocation for Variables

When you define a variable, the compiler allocates a specific amount of memory to store its value. The amount of memory allocated depends on the variable's data type. Local variables (those declared inside a function) are typically allocated on the *stack*.

```c
int main() {
    int a, b; // Memory allocated for 'a' and 'b' on the stack.
    // ...
    return 0;
}
```

The compiler decides where the variables are in memory, and each one occupies a contiguous set of addresses. However, we do not have guarantees of contiguity between the memory addresses where two different variables are stored (they may not be "close together"). Anyway, we'll dive deeper into memory in future chapters.

:::

## L-values and R-values

* An **l-value** ("left value") is an expression that refers to a memory location where a value can be stored. Think of it as a "container" that can hold data. Variables are the most common example of l-values. You can use an l-value on the left side of an assignment operator (`=`).

* An **r-value** ("right value") is an expression that represents a value, and you can't assign a value to it. This value can be a literal constant (like `5`, `3.14`, or `'A'`), the result of a calculation (like `x + y`), or the value stored in a variable. R-values appear on the right side of an assignment operator, they can't be on the left.

Example:

```c
int x = 10;  // x is an l-value, 10 is an r-value
int y = x + 5; // y is an l-value, x + 5 is an r-value
// This will error
2 + 3 = x;  // ❌ Error: 2 + 3 is an r-value, not an l-value
```

For a very clear and well made explanation of this, I recommend this video by The Cherno:

<div style={{ position: 'relative', paddingBottom: '56.25%', height: '0', overflow: 'hidden', maxWidth: '100%', height: 'auto' }}>
    <iframe src="https://www.youtube-nocookie.com/embed/fbYknr-HPYE?start=258" title="lvalues and rvalues in C++" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}></iframe>
</div>

---

## Data types

C provides several built-in (primitive) data types. These types determine the size and layout of the variable's memory, the range of values it can store, and the operations that can be performed on it.

### Integer types

Integer types store whole numbers (without fractional parts).

| Type                | Typical Size (Bytes) [x86_64]   | Signed/Unsigned | Description                                           |
| :------------------ | :---------------------------: | :-------------- | :---------------------------------------------------- |
| `char`              |              1                | Both            | Smallest addressable unit; can hold a single character|
| `short`             |              2                | Both            | Short integer                                         |
| `int`               |              4                | Both            | Integer                                               |
| `long`              |              8                | Both            | Long integer                                          |
| `long long`         |              8                | Both            | Very long integer                                     |
| `unsigned char`     |              1                | Unsigned        | Unsigned smallest addressable unit                    |
| `unsigned short`    |              2                | Unsigned        | Unsigned short integer                                |
| `unsigned int`      |              4                | Unsigned        | Unsigned integer                                      |
| `unsigned long`     |              8                | Unsigned        | Unsigned long integer                                 |
| `unsigned long long`|              8                | Unsigned        | Very long unsigned integer                            |

*   **`signed`**:  Can represent both positive and negative numbers.
*   **`unsigned`**:  Can represent only non-negative numbers (zero and positive).

The `signed` keyword is implicit.

:::caution Warning

The size of integer types can vary *depending on the compiler and the underlying architecture* (e.g., 32-bit vs. 64-bit systems). The table above shows typical sizes on a **64-bit system**.

:::

The range of values for signed integers (of `b` bits) is typically: -2<sup>b-1</sup> to 2<sup>b-1</sup> - 1.
The range of values for unsigned integers (of `b` bits) is typically: 0 to 2<sup>b</sup> - 1.

:::note Boolean type (_Bool) (C99)

C99 introduced the `_Bool` type, which can store either `0` (false) or `1` (true). The `<stdbool.h>` header file provides the `bool`, `true`, and `false` macros for convenience.

```c
#include <stdbool.h>
#include <stdio.h>

int main() {
    bool is_valid = true;
    if (is_valid) {
        printf("Valid\n");
    }
    return 0;
}
```

<div class="output">
    <code class="output">
    Valid<br/>
    </code>
</div>

Prior to C99, programmers often used `int` to represent Boolean values, with `0` representing false and any non-zero value representing true.

:::

#### `sizeof` operator

You can determine the size (in bytes) of a data type or variable using the `sizeof` operator:

```c
#include <stdio.h>

int main() {
    printf("Size of char: %lu bytes\n", sizeof(char));
    printf("Size of int: %lu bytes\n", sizeof(int));
    printf("Size of long: %lu bytes\n", sizeof(long));
    printf("Size of long long: %lu bytes\n", sizeof(long long));
    return 0;
}
```

**Output**:
<div class="output">
    <code class="output">
    Size of char: 1 bytes<br/>
    Size of int: 4 bytes<br/>
    Size of long: 8 bytes<br/>
    Size of long long: 8 bytes
    </code>
</div>

#### Integer literals (bases)

Integer literals are simply constant integer values. You can specify them in **different bases**:

*   **Decimal**:  `10`, `25`, `-5` (base 10 - default)
*   **Octal**:  `012`, `031`, `077` (base 8 - start with `0`)
*   **Hexadecimal**:  `0xA`, `0x1F`, `0xFF` (base 16 - start with `0x` or `0X`)
*   **Binary**:  `0b1010`, `0b11111` (base 2 - start with `0b` or `0B`) (not standard C, but often supported by compilers, like [gcc](https://gcc.gnu.org/onlinedocs/gcc/Binary-constants.html)).

:::note Advanced

You can also add suffixes to specify the type of an integer literal:

*   `U`: unsigned (e.g., `10U`)
*   `L`: long (e.g., `10L`)
*   `UL`: unsigned long (e.g., `10UL`)
*   `LL`: long long (e.g., `10LL`)
*  `ULL`: unsigned long long (e.g., `10ULL`)

:::

### Floating-point types

Floating-point types store real numbers (with fractional parts).

| Type      | Typical Size (Bytes) | Description                                                                                               |
| :-------- | :-------------------: | :-------------------------------------------------------------------------------------------------------- |
| `float`   |          4            | Single-precision floating-point. Less precise, but uses less memory.                                     |
| `double`  |          8            | Double-precision floating-point. More precise, but uses more memory. Generally preferred for most cases. |
| `long double` |         16           | Extended precision floating-point. Offers the highest precision, but not all platforms support it.   |

#### Floating-Point literals

Floating-point literals can be written in decimal notation (e.g., `3.14`, `-0.5`, `2.0`) or scientific notation (e.g., `1.23e4` which is 1.23 * 10<sup>4</sup>, `2.0e-3` which is 2.0 * 10<sup>-3</sup>).

By default, floating-point literals are of type `double`. You can use suffixes to specify other types:

```c
float a = 42.0F;  // 'F': float literal
long double b = 42.0L;  // 'L': long double literal
```

### Character type

The `char` type is used to store single characters. 

Although it's technically an integer type (it stores the *numeric code* of the character), it's often treated differently. Characters are usually represented using the ASCII encoding.
Remember that `char` are integer types, and so we can treat them as numbers.

```c
#include <stdio.h>

int main() {
    char ch = 'A'; // Assigns the ASCII code for 'A' (which is 65) to ch.
    char another_char = '\x41'; // Same as before, in hexadecimal.
    char another_one = 65; // Same as before

    printf("%c\n", ch);  // Output: A (using %c)
    printf("%d\n", ch);  // Output: 65 (using %d)

    return 0;
}
```

**Output**:
<div class="output">
    <code class="output">
    A<br/>
    65<br/>
    </code>
</div>

:::info About format specifiers

What are those `%c` and `%d` inside `printf()`? Go to [Printing variables with `printf`](/docs/c/variables-and-types#printing-variables-with-printf) for details.

:::

Character literals are enclosed in *single quotes* (e.g., `'a'`, `'7'`, `'$'`). Special characters are represented using ***escape sequences***:

* `\n`: Newline
* `\t`: Tab
* `\\`: Backslash
* `\'`: Single quote
* `\"`: Double quote
* `\xHH`: Character with hexadecimal code HH (e.g., `\x41` is 'A')

### `limits.h` and `float.h`

The `<limits.h>` header file defines macros that specify the minimum and maximum values for various integer types (e.g., `INT_MIN`, `INT_MAX`, `CHAR_MIN`, `CHAR_MAX`).

The `<float.h>` header file defines macros that specify characteristics of floating-point types (e.g., `FLT_MIN`, `FLT_MAX`, `DBL_MIN`, `DBL_MAX`, `FLT_EPSILON`). `FLT_EPSILON` is the smallest positive number such that `1.0 + FLT_EPSILON != 1.0`.

:::note What is a macro?

It's a piece of code with a name assigned to it, and whenever the name is used, it is replaced by the contents of the macro. In a way, it's like doing "*Find & Replace*". Macro is defined by `#define` preprocessor directive.

:::

```c
#include <stdio.h>
#include <limits.h>
#include <float.h>

int main() {
    printf("INT_MIN: %d\n", INT_MIN);
    printf("INT_MAX: %d\n", INT_MAX);
    printf("FLT_MIN: %e\n", FLT_MIN);
    printf("FLT_MAX: %e\n", FLT_MAX);
    printf("DBL_EPSILON: %e\n", DBL_EPSILON);
    return 0;
}
```

**Output**:
<div class="output">
    <code class="output">
    INT_MIN: -2147483648<br/>
    INT_MAX: 2147483647<br/>
    FLT_MIN: 1.175494e-38<br/>
    FLT_MAX: 3.402823e+38<br/>
    DBL_EPSILON: 2.220446e-16<br/>
    </code>
</div>

## Printing variables with `printf`

The `printf` function is used to display formatted output to the console. It uses *format specifiers* to indicate how to interpret and display the values of variables.

### Format specifiers

| Specifier | Data Type             | Description                                                       |
| :-------- | :-------------------- | :---------------------------------------------------------------- |
| `%d` / `%i` | `int`              | Signed decimal integer.                                           |
| `%u`      | `unsigned int`        | Unsigned decimal integer.                                         |
| `%o`      | `unsigned int`        | Unsigned octal integer.                                           |
| `%x`, `%X` | `unsigned int`       | Unsigned hexadecimal integer (`%x` for lowercase, `%X` for uppercase). |
| `%f`      | `float`, `double`     | Floating-point number (decimal notation).                         |
| `%e`, `%E` | `float`, `double`    | Floating-point number (scientific notation).                      |
| `%g`, `%G` | `float`, `double`    | Uses `%f` or `%e/%E` depending on the value.                      |
| `%c`      | `char`                | Single character.                                                 |
| `%s`      | `char*`               | String (covered later).                                           |
| `%p`      | `void*`               | Pointer address (covered later).                                  |
| `%lu`     | `unsigned long`       | Unsigned long integer.                                            |
| `%ld`     | `long`                | Long integer.                                                     |
| `%llu`    | `unsigned long long`  | Unsigned long long integer.                                       |
| `%lld`    | `long long`           | Long long integer.                                                |

### Format specifier modifiers

You can add modifiers to the format specifiers to control the output format:

* **Field Width**:  Specifies the minimum number of characters to be printed. If the value is shorter, it will be padded with spaces (by default, right-aligned).

    ```c
    printf("%10d\n", 123);  // Output: "       123"
    ```

* **Precision**: For floating-point numbers, specifies the number of digits to print after the decimal point. For integers, it specifies the minimum number of digits to print (padding with leading zeros if necessary).

    ```c
    printf("%.2f\n", 3.14159);  // Output: "3.14"
    printf("%.5d\n", 12);       // Output: "00012"
    ```

* **Flags**:
  * `-`: Left-align the output within the field width.
  * `+`: Always display the sign (+ or -) for signed numbers.
  * `0`: Pad with leading zeros instead of spaces.
  * ` `: (space) Add a space before positive numbers
    ```c
    printf("%+d\n", 10);     // Output: "+10"
    printf("%-10d\n", 123);  // Output: "123       "
    printf("%05d\n", 12);    // Output: "00012"
    ```

## `const` variables

The `const` keyword is used to declare a *constant variable*, meaning its value cannot be changed after initialization.

```c
const int MAX_VALUE = 100;
// This will error
MAX_VALUE = 200;  // ❌ Error: Cannot modify a const variable.
```

You *must* initialize a `const` variable when you declare it. Attempting to modify const variables will result in compile-time errors.

## Integer overflow

When the result of an arithmetic operation exceeds the maximum value that can be stored by the integer type, an integer overflow occurs. This can lead to unexpected behavior, including wrapping around to the minimum value as seen in this example:

```c
#include <stdio.h>
#include <limits.h>

int main() {
    int x = INT_MAX;
    printf("x: %d\n", x);      // x: 2147483647
    x = x + 1;
    printf("x: %d\n", x);      // x: -2147483648 (overflow!)

    unsigned int y = UINT_MAX;
    printf("y: %u\n", y);      // y: 4294967295
    y = y + 1;
    printf("y: %u\n", y);      // y: 0 (overflow!)

    return 0;
}
```

**Output**:
<div class="output">
    <code class="output">
    x: 2147483647<br/>
    x: -2147483648<br/>
    y: 4294967295<br/>
    y: 0<br/>
    </code>
</div>

It's better to always consider the possibility of overflow, especially when working with user input or data from external sources.

Also, unsigned numbers are generally more indicated for bitwise operations (we haven't covered them yet).
