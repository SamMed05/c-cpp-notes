---
sidebar_position: 4
id: variables-and-types
title: Variables and types
hide_title: false
hide_table_of_contents: false
sidebar_label: Variables and types
description: What is a variable and how to use it.
slug: /cpp/variables-and-types
custom_edit_url: null
---


## Definition

Variables in programming are kind of a container with a label that hold information. 
We use them for storing data values and to refer to them later using their name.

Tecnically a variable is a named location in memory. It is the basic unit of storage in a program.

## Advantages

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

The power of variables is that they are generic and don't represent just one 
[magic number](https://en.wikipedia.org/wiki/Magic_number_(programming)), so they can be used 
in various cases with different values/data each time.

So when used in a program, that program acquires the possibility to cover multiple cases 
instead of just one.

Variables are usually declared at the top of the body of the `main()` function. You can't work 
with a variable if the declaration is after you use it

## Variable declaration

To declare (or create) a variable we need to specify the type and assign it a value.

### Data types

In C and C++ there are **keywords** that assign to some data a certain ***primitive built-in data type***. 

They are:

| TYPE         | DESCRIPTION                                                                                    |
|--------------|------------------------------------------------------------------------------------------------|
| **`int`**    | stores integers (whole numbers), without decimals, such as 5 or -5                             |
| **`bool`**   | true/false or 1/0. It can assume only this two values                                          |
| **`float`**  | stores a single-precision floating point value, or decimal value                               |
| **`double`** | stores a double-precision floating point value, or decimal value. It's more precise than float |
| **`char`**   | stores single characters, such as 'a' or 'B'. Char values are surrounded by single quotes      |
| **`string`** | stores text, such as "text". String values are surrounded by double quotes                     |
| **`wchar_t`**| stores a wide character. It's like char type but greater in size. Also known as UTF or Unicode |
| **`void`**   | represents a valueless entity. It means "nothing" or "no type"                                 |

Don't pay too much attention to the last two primitive types (`wchar_t` and `void`) because for 
now they are not important. Also keep in mind that these numbers have a certain range/size and they 
don't go to infinity. For example `int` type can go from -2147483648 to 2147483647. 

These limits are defined into the [`<limits>` header](https://docs.microsoft.com/en-us/cpp/c-language/cpp-integer-limits?view=msvc-170) 
of the [C++ Standard Library](https://docs.oracle.com/cd/E19957-01/806-3569/Standard.html), 
included by default in every C++ program. We will learn more about `INT_MIN` and `INT_MAX` in 
a future explanation.


:::info Why?

Why an `int` type can go *exactly* from -2147483648 to 2147483647? Well, the reason lies 
into the size of an integer value, which is 4 bytes, or **32** bits. The first bit is used 
for the sign, so the maximum number that can be represented in that size (separating positive 
and negative values) can be matematically calculated with the following range formula:

2<sup>31</sup> = 2,147,483,648

If we consider also the 0, we can then conclude that numbers can go from **-2147483648** to 
**2147483648 - 1**.

If we need greater numbers and we don't use negative values we can also use the keyword 
`unsigned` befor `int` to expand the range up to 2<sup>32</sup> (4,294,967,296) without using 
the first bit for the sign. Although using unsigned numbers is generally 
[not recommended](https://www.learncpp.com/cpp-tutorial/unsigned-integers-and-why-to-avoid-them/).

:::

:::note

Attempting to calculate a number that is beyond the range of a variable’s type is known as 
an *overflow*. The C++ standard generally leaves the results of an overflow undefined. 

A floating-point overflow generates an exception that, if not handled, will cause your 
program to crash. 

An integer overflow is even worse, because C++ generates an incorrect result without 
complaint.

:::

#### Auto and Decltype
With the C++11 standard or later, you can also use the **`auto`** type. This keyword allows 
the programmer to leave the type deduction to the compiler itself. All variables declared as 
`auto` must be inizialized with some value.

Together with `auto`, we can use the **`decltype`** specifier, which is a keyword that is also 
used to specify a type, but works differently: you give it a variable inside the round brackets 
and an expression following that. You can read more [here](https://stackoverflow.com/a/18815367/13122341).

See this program:

```cpp {8,9}
#include <iostream>
using namespace std;

int main() {
	int x=100;
	float y=199.00;
	
	decltype(x) z = y/x; // x is an integer
	cout<<z<<endl;
	
	return 0;
}

```

What `decltype` does is it recognize the type of a variable inserted and assume that type. In 
the above case `x` is the name of the variable passed and it's type is `int`, so the whole 
expression `decltype(x)` becomes the equivalent of `int` and the output is:
<code class="output">
1
</code>

But if we write `decltype(y)`, the output we get is:
<code class="output">
1.99
</code>

because now the type that `decltype` assumes is the the same as `y`, which is `float`.

:::caution

The first thing to say is that `decltype` isn't used a lot, and we'll never do in our 
programs. Second, this functionality has been added to C++11 and if you want to use it in 
DevC++ or other old compilers it won't work. However, there's a way to 
[fix this](https://stackoverflow.com/a/50221058/13122341) in DevC++ since it supports C++11 
standard, but not by default.

:::


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

:::danger

A valid identifier is a sequence of one or more letters, digits and underscore characters 
`_` (but not used at the start of the identifier). 
Neither spaces nor punctuation marks or symbols can be part of an identifier. Only letters, 
digits and single underscore characters are valid. In addition, variable identifiers always 
have to begin with a letter.[^2]

Also, they cannot match any standard reserved keyword of the C++ language:

```
asm, auto, bool, break, case, catch, char, class, const, const_cast, 
continue, default, delete, do, double, dynamic_cast, else, enum, 
explicit, export, extern, false, float, for, friend, goto, if, 
inline, int, long, mutable, namespace, new, operator, private, 
protected, public, register, reinterpret_cast, return, short, signed, 
sizeof, static, static_cast, struct, switch, template, this, throw, 
true, try, typedef, typeid, typename, union, unsigned, using, 
virtual, void, volatile, wchar_t, while
```

:::


:::caution

C++ and C languages are "**case sensitive**". That means that an identifier written 
in capital letters is completely different from another one with the same name but 
written in small letters. 

So, for example, the `num` variable is not the same as the `NUM` 
variable or the `Num` variable. These are three different identifiers identifiying three 
different variables.

:::

:::note

To give to a variable (or to an identifier in general) a name that is made of multiple 
words, programmers usually use the **lowerCamelCase** naming technique, where every new 
word after the first one starts with capital letter. It's just a convention, so you can 
also not do that, but it helps separating the words when it's not possible to use spaces. 

In contrapposition to that convention, there is also the *UpperCamelCase*, also known as 
*Pascal Case*. Also *Snakecase* exists, which uses the underscore `_` to delimitate words 
and that seems like a snake.

But why camels? The name derives from the "jumps" within a word, which bring to mind the 
camel's humps.

:::

![Variable declaration](./assets/variable-declaration.svg)
<figcaption>Fig.1. The names of the parts of a variable declaration.</figcaption>


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

You **can't** declare different variable types like in the previous way: 

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
[^2]: [cplusplus.com - Variables and types](https://www.cplusplus.com/doc/tutorial/variables/)