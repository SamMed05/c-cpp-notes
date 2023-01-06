---
sidebar_position: 3
id: switch-statement
title: Switch statement
hide_title: false
hide_table_of_contents: false
sidebar_label: Switch statement
description: How the switch statement works.
slug: /cpp/switch-statement
custom_edit_url: null
---

Switch statements function somewhat similarly to the if statement we used before, as it allows us to execute one code block among many alternatives. In some cases, using a switch statement has the advantage of being much easier to read and write compared to a long if-else ladder.

The switch statement is based on a variable that is tested for equality against a list of values, each one called a "case" of that variable.

It's more complicated to explain than to see, so here's the generic syntax:
```cpp
switch (variable) {
	case value1:
		// code block
		break;
	case value2:
		// code block
		break;
	case value3:
		// code block
		break;
	// more cases...

	// optional
	default:
		// code block
}
```

The value of `variable` is compared with every possible value of each case and there's a match the associated block of code is executed. `break` is used to interrupt the execution and if no match is found `break` is never executed, therefore the `default` case (optional) will compile instead. In the `default` case `break` isn't needed.

A practical example:
```cpp title="switch-case-week.cpp"
#include <iostream>
using namespace std;

int main() {
	int day;

	cout << "Insert a day of the week (from 1 to 7):" << endl;
	cin >> day;

	// switch statement
	switch (day) {
		case 1:
			cout << "Monday" << endl;
			break;
		case 2:
			cout << "Tuesday" << endl;
			break;
		case 3:
			cout << "Wednesday" << endl;
			break;
		case 4:
			cout << "Thursday" << endl;
			break;
		case 5:
			cout << "Friday" << endl;
			break;
		case 6:
			cout << "Saturday" << endl;
			break;
		case 7:
			cout << "Sunday" << endl;
			break;

		default:
			cout << "Input not valid" << endl;
	}

	return 0;
}
```