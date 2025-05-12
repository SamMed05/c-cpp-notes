---
sidebar_position: 21
id: function-pointers
title: Function pointers
hide_title: false
hide_table_of_contents: false
sidebar_label: Function pointers
description: Understanding function pointers in C and their practical applications
slug: /c/function-pointers
custom_edit_url: null
---

In C, pointers not only reference data but can also hold the address of executable code (i.e. functions). By treating functions as values, you gain the flexibility to pass behavior into other functions, select implementations at runtime, and implement callback patterns for cleaner, more modular code.

## What are Function Pointers?

A function pointer is a variable that stores the address of a function. Just as data pointers point to data in memory, function pointers point to executable code in memory.

Function pointers allow you to:

- Pass functions as arguments to other functions
- Store functions in arrays or other data structures
- Select functions to execute at runtime
- Implement callbacks and event-driven programming

## Declaring Function Pointers

The syntax for declaring a function pointer includes the return type, a pointer name in parentheses with an asterisk, and the parameter types:

```c
return_type (*pointer_name)(parameter_types);
```

For example, to declare a pointer to a function that takes a `double` and an `int` parameter and returns an `int`:

```c
int (*func_ptr)(double, int);
```

:::caution Parentheses Matter
The parentheses around `*func_ptr` are essential. Without them:

```c
int *func_ptr(double, int);
```

This would declare a function named `func_ptr` that returns a pointer to an `int`, not a pointer to a function.
:::

## Assigning Function Pointers

To assign a function's address to a function pointer, simply use the function's name (without parentheses):

```c
int add(double x, int y) {
    return (int)x + y;
}

int main() {
    int (*func_ptr)(double, int);
    func_ptr = add;  // Assign the address of add to func_ptr
    
    // Technically, using the address-of operator is more correct:
    func_ptr = &add;  // This also works and is more explicit
    
    return 0;
}
```

The function pointer's parameter types and return type must match exactly with the function it points to.

## Calling Functions through Pointers

There are two equivalent ways to call a function through a function pointer:

```c
// Method 1: Dereference the pointer
result = (*func_ptr)(10.5, 5);

// Method 2: Call directly (C allows this shorthand)
result = func_ptr(10.5, 5);
```

Both methods are valid in C. The second form is more common in modern code due to its simplicity.

### Example: Using Function Pointers

```c
#include <stdio.h>

// Define some functions with the same signature
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }
int divide(int a, int b) { return b != 0 ? a / b : 0; }

int main() {
    // Declare a function pointer
    int (*operation)(int, int);
    int result;
    int x = 10, y = 5;
    
    // Assign and call different functions
    operation = add;
    result = operation(x, y);
    printf("%d + %d = %d\n", x, y, result);
    
    operation = subtract;
    result = operation(x, y);
    printf("%d - %d = %d\n", x, y, result);
    
    operation = multiply;
    result = operation(x, y);
    printf("%d * %d = %d\n", x, y, result);
    
    operation = divide;
    result = operation(x, y);
    printf("%d / %d = %d\n", x, y, result);
    
    return 0;
}
```

<div class="output">
<code class="output">
10 + 5 = 15<br/>
10 - 5 = 5<br/>
10 * 5 = 50<br/>
10 / 5 = 2
</code>
</div>

## Arrays of Function Pointers

You can create arrays of function pointers to store multiple functions with the same signature. This is useful for implementing function tables and dispatch mechanisms.

```c
int (*operations[4])(int, int) = {add, subtract, multiply, divide};
```

This declares an array of 4 function pointers, each pointing to a function that takes two `int` parameters and returns an `int`.

You can access and call these functions using array indexing:

```c
// Call the function at index 2 (multiply)
result = operations[2](x, y);  // Same as: result = multiply(x, y);
```

### Example: Menu System with Function Pointers

```c
#include <stdio.h>

// Function prototypes
int add(int a, int b);
int subtract(int a, int b);
int multiply(int a, int b);
int divide(int a, int b);

// Function implementations
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }
int divide(int a, int b) { return b != 0 ? a / b : 0; }

int main() {
    int (*operations[4])(int, int) = {add, subtract, multiply, divide};
    char *op_names[4] = {"Addition", "Subtraction", "Multiplication", "Division"};
    int choice, a, b, result;
    
    printf("Enter two integers: ");
    scanf("%d %d", &a, &b);
    
    printf("\nSelect operation:\n");
    printf("0: Addition\n");
    printf("1: Subtraction\n");
    printf("2: Multiplication\n");
    printf("3: Division\n");
    printf("Choice: ");
    scanf("%d", &choice);
    
    if (choice >= 0 && choice < 4) {
        result = operations[choice](a, b);
        printf("\n%s result: %d\n", op_names[choice], result);
    } else {
        printf("Invalid choice\n");
    }
    
    return 0;
}
```

This example implements a simple calculator using an array of function pointers to select the appropriate operation based on user input, without using `if` or `switch` statements for the operation logic.

## Passing Function Pointers as Arguments

Functions can accept other functions as parameters via function pointers. This enables powerful patterns like callbacks, where a function can invoke user-defined behavior.

```c
void apply_operation(int a, int b, int (*operation)(int, int)) {
    int result = operation(a, b);
    printf("Result: %d\n", result);
}

// Usage
apply_operation(10, 5, add);      // Result: 15
apply_operation(10, 5, multiply); // Result: 50
```

### Example: Function to Sum Values from Another Function

Here's a function that calculates the sum of the first n values of any function that takes an integer and returns an integer:

```c
#include <stdio.h>

// Functions to be summed
int square(int x) { return x * x; }
int cube(int x) { return x * x * x; }

// Function that sums the results of another function
int sum_function_values(int n, int (*f)(int)) {
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += f(i);
    }
    return sum;
}

int main() {
    int n = 5;
    
    // Sum of squares: 1² + 2² + 3² + 4² + 5² = 55
    int sum_squares = sum_function_values(n, square);
    printf("Sum of squares from 1 to %d: %d\n", n, sum_squares);
    
    // Sum of cubes: 1³ + 2³ + 3³ + 4³ + 5³ = 225
    int sum_cubes = sum_function_values(n, cube);
    printf("Sum of cubes from 1 to %d: %d\n", n, sum_cubes);
    
    return 0;
}
```

<div class="output">
<code class="output">
Sum of squares from 1 to 5: 55<br/>
Sum of cubes from 1 to 5: 225
</code>
</div>

## Simplifying Function Pointer Declarations with `typedef`

Function pointer declarations can become complex. Using `typedef` can make your code more readable:

```c
typedef int (*Operation)(int, int);

// Now you can use Operation as a type
Operation op = add;
Operation math_ops[4] = {add, subtract, multiply, divide};

void perform_math(int x, int y, Operation op) {
    printf("Result: %d\n", op(x, y));
}
```

## Practical Applications of Function Pointers

Function pointers are widely used in C for many important programming patterns:

1. **Callback mechanisms**: Register functions to be called when certain events occur (common in GUI programming and event handlers).

2. **Plugin architectures**: Load and execute code dynamically based on runtime conditions.

3. **Algorithm customization**: Create generic algorithms that can be customized with different function implementations.

4. **State machines**: Implement complex state transitions by associating functions with states.

5. **Function dispatching**: Create fast lookup tables for operations instead of using lengthy if/else or switch statements.

## Comparing Function Pointers

Function pointers can be compared using standard comparison operators:

```c
if (func_ptr == add) {
    printf("Function pointer points to add function\n");
}

if (func_ptr != NULL) {
    // Safe to call the function
    result = func_ptr(10, 5);
}
```

## 📝 Exercises

### Exercise 1: Create a Simple Calculator

Implement a calculator program that uses function pointers to perform basic arithmetic operations (addition, subtraction, multiplication, division) based on user input. Use an array of function pointers to select the appropriate operation without using `if` or `switch` statements.

<details>
<summary>Show Solution</summary>

```c
#include <stdio.h>

// Function declarations
float add(float a, float b) { return a + b; }
float subtract(float a, float b) { return a - b; }
float multiply(float a, float b) { return a * b; }
float divide(float a, float b) { return b != 0 ? a / b : 0; }

int main() {
    // Array of function pointers
    float (*operations[4])(float, float) = {add, subtract, multiply, divide};
    char operators[4] = {'+', '-', '*', '/'};
    
    float a, b;
    int choice;
    
    printf("Enter two numbers: ");
    scanf("%f %f", &a, &b);
    
    printf("\nChoose operation:\n");
    printf("0: Addition (+)\n");
    printf("1: Subtraction (-)\n");
    printf("2: Multiplication (*)\n");
    printf("3: Division (/)\n");
    printf("Enter choice (0-3): ");
    scanf("%d", &choice);
    
    if (choice >= 0 && choice < 4) {
        float result = operations[choice](a, b);
        printf("%.2f %c %.2f = %.2f\n", a, operators[choice], b, result);
    } else {
        printf("Invalid choice\n");
    }
    
    return 0;
}
```

</details>

### Exercise 2: Function Application

Write a function called `apply_to_array` that takes an array of integers, its size, and a function pointer. The function should apply the given function to each element of the array and store the result back in the array.

Create test functions like `double_value`, `square_value`, and `absolute_value` to test your implementation.

<details>
<summary>Show Solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>

// Test functions
int double_value(int x) { return x * 2; }
int square_value(int x) { return x * x; }
int absolute_value(int x) { return x < 0 ? -x : x; }

// Function that applies a given function to each element of an array
void apply_to_array(int arr[], int size, int (*func)(int)) {
    for (int i = 0; i < size; i++) {
        arr[i] = func(arr[i]);
    }
}

void print_array(int arr[], int size) {
    printf("[ ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("]\n");
}

int main() {
    int arr[] = {1, -2, 3, -4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    print_array(arr, size);
    
    // Apply doubling function
    apply_to_array(arr, size, double_value);
    printf("After doubling: ");
    print_array(arr, size);
    
    // Reset array
    arr[0] = 1; arr[1] = -2; arr[2] = 3; arr[3] = -4; arr[4] = 5;
    
    // Apply squaring function
    apply_to_array(arr, size, square_value);
    printf("After squaring: ");
    print_array(arr, size);
    
    // Reset array
    arr[0] = 1; arr[1] = -2; arr[2] = 3; arr[3] = -4; arr[4] = 5;
    
    // Apply absolute value function
    apply_to_array(arr, size, absolute_value);
    printf("After abs value: ");
    print_array(arr, size);
    
    return 0;
}
```

<div class="output">
<code class="output">
Original array: [ 1 -2 3 -4 5 ]<br/>
After doubling: [ 2 -4 6 -8 10 ]<br/>
After squaring: [ 1 4 9 16 25 ]<br/>
After abs value: [ 1 2 3 4 5 ]
</code>
</div>

</details>
