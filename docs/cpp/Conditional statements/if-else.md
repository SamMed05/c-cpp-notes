---
sidebar_position: 1
id: if-else
title: If/else
hide_title: false
hide_table_of_contents: false
sidebar_label: If/else
description: How if and else conditionals work.
slug: /cpp/if-else
custom_edit_url: null
---

So far, everything that is written in the `main()` function is executed directly and nothing is skipped in our programs.

Oftentimes, though, programmers want to modify the [control flow](https://en.wikipedia.org/wiki/Control_flow) of the program, for example to **execute some code** ***only*** **when a certain condition is met**. 

C and C++ (as it is in almost all the other programming languages) provide us with some syntactic constructs for making conditionals[^1], the most basic and fundamental of which is the "`if` statement".

The syntax is as follows:
```cpp
if (condition) {
	// code that is executed only
	// if the above condition is met
}
```

Let's see a simple example.

### If

We'll make a program that prints on the console if a number inserted by the user is positive (just positive), otherwise we'll do nothing:

```cpp {12-14} title="conditional-statements.cpp"
#include <iostream>
using namespace std;

int main() {
	int num;

	// get the number from the user
	cout << "Insert a number:" << endl;
	cin >> num;

	// if statement and condition
	if (num > 0) {
		cout << "The number is positive" << endl;
	}

	return 0;
}
```

The condition `num > 0` (always inside the round parentheses) is expressed with the `>` ("greater than") symbol, which as we've seen in a previous chapter, is one of the [comparison operators](https://c-cpp-notes.vercel.app/docs/cpp/operators#comparisonrelational-operators) which indicates whether the value of the left operand (`num`) is greater than the value of the right operand (`0`).

`num > 0` is a **boolean expression**, meaning that it evaluates to a value that is either `true` or `false`. Only if the condition is **true** the block of code inside the if statement is executed by the compiler. If not, it is completely skipped.

### Else

What if we want to print in our program "The number is negative or null" if the the number inserted is not greater than 0?

What we actually want to do is to execute code when the condition we've written in the if statement returns **false**. For that, we need the `else` keyword.

```cpp {14-16} title="conditional-statements.cpp"
#include <iostream>
using namespace std;

int main() {
	int num;

	// get the number from the user
	cout << "Insert a number:" << endl;
	cin >> num;

	// if statement and condition
	if (num > 0) {
		cout << "The number is positive" << endl;
	} else { // otherwise
		cout << "The number is negative or null" << endl;
	}

	return 0;
}
```

### Else if and nested if

A more complex version of `else` is the `else if` statement, where we specify and additional condition if the first condition is false. In our program, let's specify the condition where the number is **equal to 0**:

```cpp {14-16} title="conditional-statements.cpp"
#include <iostream>
using namespace std;

int main() {
	int num;

	// get the number from the user
	cout << "Insert a number:" << endl;
	cin >> num;

	// if statement and condition
	if (num > 0) {
		cout << "The number is positive" << endl;
	} else if (num == 0) {
		cout << "The number is 0" << endl;
	} else { // if not greater or equal to 0 ...
		cout << "The number is negative" << endl;
	}

	return 0;
}
```

Here, the `==` operator is used in the conditional expression to check if the value of `num` is 0.

:::info Note

There can be more multiple else if statements, but only one if and else statements.

:::

Alternatively, it's possible to replicate the same logic by nesting multiple if statements one inside the other, without using the `else if` statement. This is sometimes useful for readability, but it's important not to exaggerate with conditions and nesting as it can become almost impossible to understand the  code.


```cpp {12-20} title="conditional-statements.cpp"
#include <iostream>
using namespace std;

int main() {
	int num;

	// get the number from the user
	cout << "Insert a number:" << endl;
	cin >> num;

	// if statement and condition
	if (num >= 0) {
		if (num == 0) {
			cout << "The number is 0" << endl;
		} else {
			cout << "The number is positive" << endl;
		}
	} else {
		cout << "The number is negative" << endl;
	}

	return 0;
}
```

:::info Note

When the block inside the statements is only one code expression (the line of code that ends with `;`) like in all the cases above except for the `main()` function, curly brackets are optional. However, I recommend using them always because they make the block less error-prone to future modifications by you but especially by other programmers. Block of more than one line of code, in fact, always require the use of curly brackets. There's also a problem of ambiguity  in nested if-else statements called "[dandling else](https://en.wikipedia.org/wiki/Dangling_else)" and by using braces you'll most likely never encounter it.

:::

### Multiple conditions

Inside the round parentheses if the if and else if statements, multiple conditions can also be specified. Each individual condition is connected and put in relationship with the others using the [logical operators](https://c-cpp-notes.vercel.app/docs/cpp/operators#logical-operators) that we have previously learned.

A useful application of multiple conditions is for intervals/ranges. If we want to check if the value of a variable `val` is between a certain range we write: 
```cpp
if (n1 < val && val < n2) {
	// code that executes if val is between n1 and (&&) n2
}
```

On the other hand, if we want to check if the variable `val` is outside the interval we use the `||` (or) operator in this way:
```cpp
if (val < n1 || val > n2) {
	// code that executes if val is outside the interval n1-n2
}
```


[^1]: [Wikipedia - Conditional (computer programming)](https://en.wikipedia.org/wiki/Conditional_(computer_programming))