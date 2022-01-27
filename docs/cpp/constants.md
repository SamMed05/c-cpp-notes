---
sidebar_position: 6
id: constants
title: Constants
hide_title: false
hide_table_of_contents: false
sidebar_label: Constants
description: What are constants, how and when to use them.
slug: /cpp/constants
custom_edit_url: null
---


## Definition

Sometimes is useful to define variables with values that can not be changed, like the value of π 
(3.14159265 and so on) or the gravity of Earth (9.8 m/s<sup>2</sup>). Knowing that it won't 
change, defining these value as a constants helps ensure that their value will always remain the 
same.

A constant, as the name suggests, is a value that doesn't change. You use constants in programming 
when you do not want someone (you included) to accidentally change their value later and override 
existing values. A constant is **fixed**, **unchangeable** and **read-only**. Constant variables 
are sometimes called **symbolic constants**, as opposed to literal constants (usually just called 
literals), which are just values that have no name inserted directly into the code[^1].

Constants can be of any of the basic data types like integer, float, octal, hexadecimal, character 
constants, etc.

Constants are treated just like regular variables except that their values cannot be modified 
after their definition, otherwise the compiler will throw an error.

A convention of programmers is to use CAPITALS for constants names and underscores to represent 
spaces, but you don't necessarily have to do it.

To create a constant we have two ways: 
1. with the `#define` preprocessor
2. using the `const` keyword

## `#define` preprocessor

We can use the preprocessor directive `#define` followed by the identifier and the value without 
any symbol like `=` (unlike we do with variables) to create a constant, like in these examples:

```cpp
/*
#define identifierName value
*/
#define thisIsAConstant 5
#define PI 3.14
#define NEWLINE '\n'
```

We usually put these line at the top of the source code after the linking section, and they assume 
the **global scope**.

Since this is a preprocessor directive, the preprocessor will **replace** every instance of the 
constant with its value in the code before anything is even compiled. Since it is a kind of 
**text replacement** (not an actual variable!), you can't use pointers on constants when we use 
`#define` (the code replaced is called *macro*, by the way, and using macros is usually a bad 
practice in C++). I'll explain what pointers are in a future chapter, but for now we don't need 
them.

For the same reasons, as you can see from the code above, we don't need to specify any type for the 
value we associate to the identifier, so we have to be careful about the types of data we use when 
working in our program with these constants.

## `const` keyword

The other way of declaring a constant is using the `const` prefix, like so:

```cpp
/*
const type identifierName = value;
*/
const int thisIsAConstant = 5;
const float PI = 3.14;
const char NEWLINE = '\n';
```

The syntax is very strict and you can't omit any of the parts of the constant declaration:

```cpp
const int x; // ❌

const int x; x = 5; // ❌

const int x = 5; // ✔

int num = 2;
const int x = num; // ✔
```

As you can see the constants must be initialized with a value (it's fine also to initialize with 
other variables). `const` can also be used with 
[function parameters](https://c-cpp-notes.vercel.app/docs/cpp/passage-of-values) ensuring that 
the parameter’s value is not changed inside the function, but when arguments are passed by value 
this is unnecessary. Again, don't worry if you don't understand this part: we will see that in a 
future section.

:::note

Actually, C++ will accept `const` either before or after the type, but it's recommended to follow 
the standard where the type comes before the identifier[^1].

```cpp
int const x = 5; // ✔, but not preferred
```

:::

## Uses

A good way to use constants is when dealing with **magic numbers**. Magic numbers are values 
that either have an unclear meaning or are used multiple times. They are difficult to update 
and apparently they have no meaning, but if we give a name to these fixed values using a constant 
we can disambiguate them and update the value becomes easier.

[^1]: [LearnCpp.com - Symbolic constants: const and constexpr variables](https://www.learncpp.com/cpp-tutorial/const-constexpr-and-symbolic-constants/)