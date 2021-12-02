---
sidebar_position: 51
id: passage-of-values
title: Passage of values
hide_title: false
hide_table_of_contents: false
sidebar_label: Passage of values
description: What are functions and how to use them.
slug: /cpp/passage-of-values
custom_edit_url: null
---


In C and C++ there are two ways to pass some data to a function: *by value* and *by 
reference*.

They are strictly related to *actual parameter* (or argument) and *formal parameters*, though, 
so it's better to understand and distinguish them before going forward.

## Parameter types

In support of the following explanation I'm going to use an example of a program that prompts 
the user to enter the base and height of a rectangle and with a function calculates the area 
of the quadrilateral (according to the formula **a = b*h**), storing that value in the 
variable `a`:

```cpp {5-8,18}
#include <iostream>
#include <math.h>
using namespace std;

float area(float b, float h) {
	float area = b*h;
	return area;
}

int main() {
	float base, height;
	
	cout<<"enter the base: "<<endl;
	cin>>base;
	cout<<"enter the height: "<<endl;
	cin>>height;
	
	float a = area(base, height);
	cout<<"the area is: "<<a<<endl;
	
	system("PAUSE");
	
	return 0;
}
```

This code works directly, so I highly encourage you to try it. Feel free to run this program 
yourself and experiment with it.

:::caution

🚧 This section is still under construction. 🚧

:::

### Actual parameter (argument)

:::caution

🚧 This section is still under construction. 🚧

:::

### Formal parameter

:::caution

🚧 This section is still under construction. 🚧

:::
