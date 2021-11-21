---
sidebar_position: 4
id: variables
title: Variables
hide_title: false
hide_table_of_contents: false
sidebar_label: Variables
description: What is a variable and how to use it.
slug: /cpp/variables
custom_edit_url: null
---


Variables in programming are kind of a container with a label that hold information. 
We use them for storing data values and to refer to them later using their name.

Tecnically a variable is a named location in memory. It is the basic unit of storage in a program.

### Advantages

The advantages that come when using variables (instead of raw numbers or text) are various:
- the value stored can be changed during program execution
- they provide a way of labeling data with a descriptive name, giving it a meaning
- all the operations done on the variable effects that memory location
- the value can change but the name not, so we know that we can always reference to it without 
worrying about its value.

Imagine that you want to write a program that sum two numbers.

Those numbers can be 3 and 2, so you write:
```cpp
cout<<3+2; // Output: 5
```
or 13 and 56:
```cpp
cout<<13+57; // Output: 70
```

But if we want to cover all possible cases of numbers, we can't do in that way. We use variables 
instead:
```cpp
// ... linking section and main()

int a;
int b;

cin>>a;
cin>>b;

cout<<a+b;
```

Then we can insert every number we want and the program will change result according to the input.

The power of variables is that they are generic and don't represent just one number, so they can 
be used in various cases with different values/data each time.

So when used in a program, that program acquires the possibility to cover multiple cases 
instead of just one.

Variables are usually declared at the top of the body of the `main()` function. You can't work 
with a variable if the declaration is after you use it

## Variable declaration

To declare (or create) a variable we need to specify the type and assign it a value.

### Data types

In C and C++ there are keywords that assign to some data a certain *primitive* data type. 

They are:

| TYPE         | DESCRIPTION                                                                                    |
|--------------|------------------------------------------------------------------------------------------------|
| **`int`**    | stores integers (whole numbers), without decimals, such as 5 or -5                             |
| **`char`**   | stores single characters, such as 'a' or 'B'. Char values are surrounded by single quotes      |
| **`string`** | stores text, such as "text". String values are surrounded by double quotes                     |
| **`bool`**   | true/false or 1/0. It can assume only this two values                                          |
| **`float`**  | stores a single-precision floating point value, or decimal value                               |
| **`double`** | stores a double-precision floating point value, or decimal value. It's more precise than float |

I excluded two primitive types because for now they are not important. Also keep in mind that 
these numbers have a certain range and they doesn't go to infinity. For example int type can 
go from -2147483648 to 2147483647.

### Syntax

To create a variable this syntax is used:

```cpp
type variableName = value;
```
so for example:
```cpp
int num = 5;
```

The name that we give to a variable is called the "***identifier***". In the above examples is 
`variableName` and `num` respectively.

#### Assignment

The equal sign `=` is used to assign values to the variable **FROM RIGHT TO LEFT**.
Remember that is not the variable `num` that give it's value to 5, but it's 5 that is being 
stored inside `num`!

Multiple variables can also be declared in a single line, separing each one with a colon:

```cpp
int x = 5, y = 0, z = -31;

float a = 0.5, b = 47.999;
```

:::warning

You **can't** declare different variable types in that way: 

```cpp
int x = 5, float a = 0.5;
```
:::

### Inizialization 

#### Declare 🆚 Define 🆚 Inizialize

When we first *declare* a variable, we introduce it before its first use.
That process is called *inizialization*, and if we assign a memory location and a value to 
the variable we have *defined* it.

#### Unexpected behaviors

Usually it's better to inizialize the varible at a certain value, to avoid unexpected 
behaviors.

```cpp
int x; // you don't know what value x has
int x = 0; // preferred way
```

> Unlike some programming languages, C/C++ does not initialize most variables to a given 
value (such as zero) automatically. Thus when a variable is assigned a memory location by the 
compiler, the default value of that variable is whatever (garbage) value happens to already 
be in that memory location. A variable that has not been given a known value (usually through 
initialization or assignment) is called an uninitialized variable.[^1]

Let's say for example that you want to create a counter called `x` that starts at 0. It you 
declare that variable without specifing it's value it will get a random number and not 0.

To correct that error we can write `x = 0;`, to "*zero-initialize*" that variable.

:::note Note (ADVANCED)

Since C++11 there is also another method to avoid that problem and create an empty variable: 

`int x{};`

`int x{};` is a kind of default-initialization, called value inizialization (you can read 
more about this [here](https://en.cppreference.com/w/cpp/language/initialization), but
`int x{};` (copy inizialization) is only supported from C++11, while `int x = 0;` has 
not such restriction. That said, the latter solution is probably  clearer and it has the 
benefit that it works with older C++ standards.

:::

[^1]: [LearnCpp.com - Uninitialized variables and undefined behavior](https://www.learncpp.com/cpp-tutorial/uninitialized-variables-and-undefined-behavior/)