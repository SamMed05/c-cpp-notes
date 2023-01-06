---
sidebar_position: 2
id: ternary-operator
title: Ternary operator
hide_title: false
hide_table_of_contents: false
sidebar_label: Ternary operator
description: How the ternary operator works and comparison with if-else constructs.
slug: /cpp/ternary-operator
custom_edit_url: null
---

If-else constructs are generally pretty readable (they are english words, therefore self explanatory) but they come with the downside of being a bit too long to write (they also take a lot of vertical space in the code). This is the main reason why both C and C++ have a short-hand notation for writing if-else statements a lot quicker, called ternary operator.

### Syntax

The general syntax of the ternary operator is as follows (it eventually returns a value so there's a variable `result` where to store it):

```cpp
result = condition ? expressionIfTrue : expressionIfFalse;
```

where: 
- `condition` is any boolean expression;
- `expressionIfTrue` is the code executed when the condition is satisfied;
- `expressionIfFalse` is similar to what would be executed inside the *else* block when using a regular if-else construct.

The term "ternary" comes from the fact that this operator takes 3 operands, in this example `condition`, `expressionIfTrue` and `expressionIfFalse`.

Example:
```cpp {12-13} title="ternary-operator.cpp"
#include <iostream>
using namespace std;

int main() {
	int x, y;

	cout << "Insert x:" << endl;
	cin >> x;
	cout << "Insert y:" << endl;
	cin >> y;

	int result = (x > y) ? x : y; // store in result the largest number
	cout << "The largest number is: " << result << endl;

	return 0;
}
```

The code above is completely equivalent to the following using **if-else**:
```cpp {3-8}
int main() {
	// ...
	if (x > y) {
		result = x;
	} else {
		result = y;
	}
	cout << "The largest number is: " << result << endl;
	// ...
}
```

The result variable can be avoided by making two separate `cout`s:

```cpp
#include <iostream>
using namespace std;

int main() {
	int x, y;

	cout << "Insert x:" << endl;
	cin >> x;
	cout << "Insert y:" << endl;
	cin >> y;

	(x > y) ? cout << "x is the largest number" 
			: cout << "y is the largest number";

	return 0;
}
```