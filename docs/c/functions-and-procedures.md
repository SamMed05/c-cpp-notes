---
sidebar_position: 8
id: functions-and-procedures
title: Functions and Procedures
hide_title: false
hide_table_of_contents: false
sidebar_label: Functions and Procedures
description: Functions and procedures in C
slug: /c/functions-and-procedures
custom_edit_url: null
---

Functions are one of the most critical concepts in programming (not only for C), allowing developers to organize your code into reusable, structured blocks.

## Introduction to Functions

A function is a **self-contained block of code that performs a specific task**.

Functions help divide a program into smaller, manageable pieces, promoting code reuse and organization.

In programming, just as in mathematics, functions:

- Take input values (parameters)
- Process them using an algorithm
- Return results

We've already used functions like `printf()`, `sqrt()`, and `pow()`, so it's not a completely new concept.

Let's see how to make our own!

## Function definition

The syntax for defining a function in C is:

```c
return_type function_name(parameter_list) {
    // function body statements
    return value; // optional depending on return_type
}
```

- `return_type` specifies the data type of the value returned by the function
- `function_name` is the identifier used to call the function
- `parameter_list` specifies the type and name of each parameter (can be empty)
- The function body contains the statements to be executed when the function is called

### Example of a function definition

```c
int max(int a, int b) {
    if (a >= b) return a;
    else return b;
}
```

In this basic example:

- The function name is `max`
- It takes two integer parameters (`a` and `b`)
- It returns an integer
- It compares two values and returns the larger one

## Function declaration (Prototype)

Before using a function, you must declare it. A function declaration (or prototype) informs the compiler about:

- The function name
- The return type
- The number and types of parameters

Syntax:

```c
return_type function_name(parameter_type_list);
```

Examples:

```c
int factorial(int);  // Or int factorial(int n);
double convert_currency(double amount, double rate);
```

## Function calls

Once defined, you can call a function using its name followed by a list of arguments in parentheses:

```c
int x = 3, y = 5, z;
z = max(x, y);  // Function call
```

Function calls involve these steps:

1. Evaluating the arguments
2. Setting up memory for the function parameters
3. Copying the arguments to the parameters
4. Transferring control to the function
5. Executing the function code
6. Evaluating the return value
7. Transferring control and result back to the caller

## Parameters and Arguments

When working with functions, we use two terms:

- **Formal parameters**: The variables declared in the function definition
- **Actual arguments**: The values provided when calling the function

Parameter passing in C is positional - the first argument is assigned to the first parameter, and so on.

### Function call dynamics

Consider this example:

```c
int main() {
    int a = 3, b = 5;
    int result = max(2*a, b);
    return 0;
}

int max(int a, int b) {
    if (a >= b) return a;
    else return b;
}
```

When `max(2*a, b)` is called:

1. The expressions `2*a` (which is 6) and `b` (which is 5) are evaluated
2. Memory is allocated for the function's local variables
3. The values 6 and 5 are copied to the formal parameters `a` and `b` in the function
4. The function executes and determines that 6 is greater than 5
5. The value 6 is returned to the calling function
6. Control returns to `main()` and 6 is assigned to `result`

## Special cases

#### Functions without parameters

A function may have no parameters:

```c
float pi() {
    return 3.14159;
}
```

#### Functions without return values

In some cases, you might want a function that performs actions but doesn't need to return a value. Use the `void` return type:

```c
void display_greeting(void) {
    printf("Hello, World!\n");
}
```

The `void` keyword indicates:

- As a return type: the function doesn't return a value
- As a parameter list: the function doesn't accept any parameters

## Local variables and scope

Variables defined inside a function are called local variables:

- They exist only during the function's execution
- They are only accessible from within the function
- They're destroyed when the function completes

```c
int calculate_sum(int a, int b) {
    int result = a + b;  // 'result' is a local variable
    return result;
}  // 'result' is destroyed here
```

### Activation records

When a function is called, memory is allocated for all its local variables. This memory area is called the activation record or stack frame. When the function completes, this memory is deallocated.

Therefore, the lifetime of variables defined inside a function is the same as the activation record (i.e. the call).

## Procedures (void functions)

Functions that don't return a value are often called procedures in programming terminology. In C, they're implemented as functions with a `void` return type:

```c
void print_square(int x) {
    printf("%d", x*x);
    // No return statement needed, but you can still write:
    return;
}
```

For procedures:

- The return type is specified as `void`
- The `return` statement isn't required (though you can use `return;` to exit early)
- They're used for their effects (like displaying output) rather than computing a value

## Global variables

Variables can also be defined outside of any function. These are called **global variables** and have different scope and lifetime characteristics:

- They're accessible from any function in the same file (after their declaration)
- They exist for the entire duration of the program
- They're automatically initialized to zero if not explicitly initialized

```c
#include <stdio.h>

int global_counter = 0;  // Global variable

void increment_counter() {
    global_counter++;  // Modifies the global variable
}

int main() {
    printf("Counter: %d\n", global_counter);  // 0
    
    increment_counter();
    printf("Counter: %d\n", global_counter);  // 1
    
    increment_counter();
    printf("Counter: %d\n", global_counter);  // 2
    
    return 0;
}
```

:::caution
While global variables can be convenient, they're generally considered bad practice for several reasons:
- They make it difficult to track which functions modify them
- They create hidden dependencies between functions
- They can lead to unexpected side effects
- They make code harder to test and debug

Use global variables sparingly and only when truly necessary, such as for configuration values or truly global state that many functions need to access.
:::

## Static local variables

C allows you to create **static local variables** using the `static` keyword. These variables:

- Are only accessible within their defining function (like regular local variables)
- Retain their value between function calls (unlike regular local variables)
- Are initialized only once when program execution first reaches their definition
- Are automatically initialized to zero if not explicitly initialized

```c
#include <stdio.h>

void count_calls() {
    static int counter = 0;  // Static local variable
    counter++;
    printf("This function has been called %d time(s)\n", counter);
}

int main() {
    count_calls();  // "This function has been called 1 time(s)"
    count_calls();  // "This function has been called 2 time(s)"
    count_calls();  // "This function has been called 3 time(s)"
    return 0;
}
```

Static local variables are useful when a function needs to maintain state between calls without exposing that state to other functions.

:::warning
Static local variables should be used with caution in multithreaded programs, as they can cause [race conditions](https://en.wikipedia.org/wiki/Race_condition#In_software) when multiple threads call the same function simultaneously.
:::

---

## Examples and important considerations

### Functions calling other functions

Functions can call other functions, creating a hierarchy of function calls:

```c
#include <math.h>

float distance(float x1, float y1, float x2, float y2) {
    float dx = x2 - x1;
    float dy = y2 - y1;
    return sqrt(dx*dx + dy*dy);  // Calls the sqrt function
}

int main() {
    float result = distance(1.0, 2.0, 4.0, 6.0);  // Calls the distance function
    printf("Distance: %f\n", result);
    return 0;
}
```

In this example, `main` calls `distance`, which calls `sqrt`. This demonstrates how **functions can be nested within each other's calls**.

:::info Function Call Stack
When a function calls another function, the calling function's execution is paused until the called function completes. The system keeps track of these paused functions in a structure called the "call stack." When the innermost function finishes, control returns to the function that called it, and so on.
:::

### Function declaration order

Generally, a function must be declared before it can be called:

```c
int main() {
    int result = add(5, 3);  // Error if add is not declared yet
    printf("Result: %d\n", result);
    return 0;
}

int add(int a, int b) {  // This definition comes too late
    return a + b;
}
```

:::tip Forward Declarations
You can use function prototypes to declare a function before its full definition:

```c
// Forward declaration (prototype)
int add(int a, int b);

int main() {
    int result = add(5, 3);  // Now this works!
    printf("Result: %d\n", result);
    return 0;
}

int add(int a, int b) {  // Full definition can come later
    return a + b;
}
```

This is particularly useful in larger programs where functions might be defined in different files or when functions call each other.
:::

### The special case of main()

The `main` function is special in C programs:

1. It serves as the entry point - execution always begins here
2. It's automatically called when the program starts
3. Its return value is passed to the operating system as an exit code
   - Return `0` indicates successful execution
   - Non-zero values typically indicate errors

```c
int main() {
    printf("Hello, World!\n");
    // No explicit return statement
}
```

:::caution Implicit return
In general, the return statement is never mandatory at the end of a function, even if the function return type is not void. No diagnostic is required and it is not undefined behavior. However, **reading** the return value of those function with missing return statement an **undefined behavior**.

The `main` function is the only function where a `return 0;` is implied if you reach the end without a return statement. This is a [special exception made by the C standard](https://www.open-std.org/jtc1/sc22/WG14/www/docs/n1256.pdf#25), and it probably exists because:

- Most programs should return 0 on success
- It reduces boilerplate code in simple programs
- It ensures programs always provide a valid exit code to the operating system

However, for clarity and to follow good programming practices, it's still recommended to explicitly include `return 0;` in your `main` function.
:::
