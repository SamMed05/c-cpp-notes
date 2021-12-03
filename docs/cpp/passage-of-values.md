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

They are strictly related to *actual parameter* (or arguments) and *formal parameters*, though, 
so it's better to understand and distinguish them before going forward.


## Parameter types

In support of the following explanation I'm going to use an example of a program that prompts 
the user to enter the base and height of a rectangle and with a function calculates the area 
of the quadrilateral (according to the formula **a = b*h**), storing that value in the 
variable `a`:

```cpp {4-7,17}
#include <iostream>
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
	
	return 0;
}
```

:::note

This code works directly, so I highly encourage you to try it. As always, feel free to run 
this program yourself and experiment with it as much as you want.

:::

Before the main function, at line **4**, the function area is defined. Here we multiply the 
formal parameters `b` and `h` and store the result in a new variable called `area`. Then we 
return it. 

In the main function we create two new variables, `base` and `height`, and we ask to the user 
to insert the values that we'll then assign to each variable.

At line **17** we create another variable, `a`, and here we call the function previously 
created passing as arguments `base` and `height` (not `b` and `h`!), without specifying any 
type. When the compiler compiles the function that has just been called, it calculates a value 
`area` and then returns it. We store that value in `a`.

The `float` type has being used with the variables and the function to cover also cases of 
inputs with decimal numbers, but also `int` and `double` are perfectly fine.

### Actual parameter (argument)

The actual parameters, or arguments, are the actual values (or values of variables) that gets 
**passed** to a function. In our example, we invoke the function `area()` that has two 
parameters, `b` and `h`, and we pass those arguments as `base` and `height`. We could have 
passed also some values directly, like 3 and 4, as arguments. Try yourself with our example 
program.

This scheme will brobably convey better how these two different type of parameters are used:

![Passing values scheme](./assets/function-passing-values.svg)
<figcaption>Fig.1. How arguments are passed to a function (example).</figcaption>

### Formal parameter

The formal parameters are the local variables of the function that **receive** the arguments.
In our example, they are `b` and `h` and they receive the value specified during the 
invocation, which are `base` and `height`.


In general:

![Passing values scheme general](./assets/function-passing-values-general.svg)
<figcaption>Fig.2. How arguments are passed to a function (general).</figcaption>

## Passing by value 🆚 by reference

Let's now take another program. Imagine you want to write a function of type `void` that 
swaps two variables (the algorithm for swapping is explained in a previous lesson) `a` and 
`b`:

```cpp {4-8,16}
#include <iostream>
using namespace std;

void swap(int x, int y) {
	int temp = x;
	x = y;
	y = temp;
}

int main() {
	int a=2, b=5;
	
	cout<<a<<endl;
	cout<<b<<endl;
	
	swap(a, b);
	
	cout<<a<<endl;
	cout<<b<<endl;
	
	return 0;
}
```

Now try run this program. What will be the output?

<details>
  <summary>Answer</summary>
	<code class="output">
		2<br/>
		5<br/>
		2<br/>
		5<br/>
	</code>
</details>

:::caution

🚧 This section is still under construction. 🚧

:::