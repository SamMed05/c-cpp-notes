---
sidebar_position: 8
id: casting
title: Casting (type conversion)
hide_title: false
hide_table_of_contents: false
sidebar_label: Casting
description: How type conversion works in C++.
slug: /cpp/casting
custom_edit_url: null
---

C++ is a **statically-typed language**. This means that the programmer has to explicitly declare 
the data type when they create a piece of data (variables, parameters, return values…); in this 
way the type of some data is known at *compile-time* instead of at *run-time*. Usually, these 
types are also fixed: an `int` variable, for example, will keep that type for the lifetime of 
the program and it won't change its type once assigned.

Fortunately, C++ allows us to convert data of one type to that of another. This feature is really 
handy, especially when working with different data types at the same time.

Conversion can happen in two ways, one *implicit* and one *explicit*.


## Implicit type conversion

Implicit type conversion (also called *automatic type conversion* or *coercion*) is automatically 
performed by the compiler and we don't need to write anything in particular to make that happen. 
Implicit type conversion is often associated with **narrowing conversion**, a case where the 
destination data type is smaller (meaning that it is capable of storing less information) than 
the source data type and some data is lost in the process of value transfer. In other words, 
narrowing conversion happens when data of a larger type is converted to data of a smaller type[^1].

Let's see an example of implicit and narrowing type conversion:

```cpp title="implicit-narrowing-type-conversion.cpp" {8}
#include <iostream>
using namespace std;

int main() {
	float decimalVar = 2.99;

	// implicit and narrowing type conversion
	int integerVar = decimalVar;

	cout<<"decimalVar = "<<decimalVar<<endl;
	cout<<"integerVar = "<<integerVar<<endl;

	return 0;
}
```

#### Output:
<code class="output">
decimalVar = 2.99<br/>
integerVar = 2
</code>

In the above program we try to put the value of a `float` type variable with decimal digits in a 
variable of type `int`. This doesn't cause an error in the compilation and we are allowed to do 
it, but by doing so we are losing information. Also note that C++ doesn't round to 3 but removes 
completely all the decimal digits. 

We don't explicitly express to the compiler how to behave and the final result stored in 
`integerVar` will contain only a narrower amount of information, because it can't handle decimal 
digits. That's why this conversion is implicit and narrowing (information-losing).

:::note Advanced

Some type conversions are always safe to make (such as int to double), whereas others may result 
in the value being changed during conversion (such as double to int). Unsafe implicit conversions 
will typically either generate a compiler warning or (in the case of brace initialization) an 
error[^2].

To be sure not to make involuntary narrowing errors, we can use brace (or list) initialization. 
Using that:
- An integer cannot be converted to another integer that cannot hold its value. For example, 
`char` to `int` is allowed, but not `int` to `char`.
- A floating-point value cannot be converted to another floating-point type that cannot hold its 
value. For example, `float` to `double` is allowed, but not `double` to `float`.
- A floating-point value cannot be converted to an integer type.
- An integer value cannot be converted to a floating-point type.

See this [answer](https://stackoverflow.com/a/18222927/13122341) on Stack Overflow for more info.

:::

The rule to keep in mind to avoid this problem is that the destination data type cannot be 
smaller than the source data type. This conversion is called **widening conversion**.

```cpp
int main() {
	int integerVar = 4;
	float decimalVar;
	// int value 'integerVar' is implicitly converted to type float
	decimalVar = integerVar; // decimalVar = 4.0000000
	
	return 0;
}
```


## Casting (explicit type conversion)

Casting is the act of telling the compiler the type of the resulting conversion. It's the 
programmer's intervention to manually change data from one type to another explicitly.

To see casting in action, let's first try to take the average between three integer values `a`, 
`b` and `c` with the simple formula: **`average = sumOfValues / numberOfValues`**.

```cpp title="int-average.cpp" {14}
#include <iostream>
using namespace std;

int main() {
	int a, b, c;
	int sum;

	cout<<"Insert 3 values: "<<endl;
	cin>>a;
	cin>>b;
	cin>>c;

	sum = a+b+c;
	float average = sum/3;

	cout<<"The average is: "<<average<<endl;

	return 0;
}
```

#### Output:
<code class="output">
3
</code>

Supposing to insert 2, 4 and 5, the average we expect to see in the output should be somewhere 
around `3.6666`. However, the output we get is just **`3`**.

The reason for that unexpected behavior has to do with data types.
We are doing a division where the resulting quotient is a value with decimal digits (`3.6666`). 
We are storing that quotient in a `float` variable, so those digits should be preserved, *however* 
since the division happens between two `int` values, the returned value keeps that `int` type, 
truncating any decimal place (integral values can't hold fractions and only the non-fractional 
component is retained).In standard C++, no run-time type check is made to help ensure the safety 
of the conversion[^3], therefore if we try to divide two or more `int` variables or numbers we 
can't get a `float` value as a result.

The only way to obtain a different type as output is by doing casting.

### C-style type casting

There are many ways to do casting conversion, but the most common (and the one that we will use 
for our programs) is the **C-style type casting** (also known as cast notation).

That method consists in putting the data type we want in return by the conversion before the 
identifier of the original data or a calculation and surrounding that type by a pair of 
round brackets `(` `)`. Of course the resulting conversion has to be stored in another variable 
with the proper type or printed. It sounds complicated but it really isn't. Look at this example:

```cpp
// destinationDataType identifier = (targetDataType) variableOrExpression;
float average = (float) sum/3;
```

See that `(float)`? It's the **explicit casting**. It explicitly tells the compiler that we want the 
result of the expression to be of type `float`. Replace this line of code with line 14 in the 
previous program and run it again. 

:::success

We have now fixed the problem!

:::

In this example, when the compiler performs the division, *dividend* and *divisor* are both `int` 
but we have explicitly expressed that the quotient has to be of type `float`, so everything works 
fine.

:::note

In this case we could also write `float average = sum/3.0;` or `float average = (float)sum/(float)3;`

It's sufficient to use a cast on one of the operands, but it doesn't hurt if we cast both.

:::

### Function notation

A variation of C-style type casting is the function notation, where the syntax for the 
parenthesis is inverted: we put the data type before the expression and then the latter in 
parentheses `(` `)`, like so: `dataType(variable);`.

### `static_cast`

`static_cast` is one of the four *named casts* available in C++ and it's a type casting operator.
It forces one data type to be converted into another data type. The `static_cast` operator 
takes an expression as input and returns the evaluated value converted to the type specified 
inside the angled brackets[^4]. The syntax is: `static_cast<dataType>(variable);`.


[^1]: [Programiz.com - C++ Type Conversion](https://www.programiz.com/cpp-programming/type-conversion)
[^2]: [LearnCpp.com - Introduction to type conversion and static_cast](https://www.learncpp.com/cpp-tutorial/introduction-to-type-conversion-and-static_cast/)
[^3]: [docs.microsoft.com - static_cast Operator](https://docs.microsoft.com/en-us/cpp/cpp/static-cast-operator?view=msvc-170)
[^4]: [LearnCpp.com - Explicit type conversion (casting) and static_cast](https://www.learncpp.com/cpp-tutorial/explicit-type-conversion-casting-and-static-cast/)