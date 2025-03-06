---
sidebar_position: 5
id: expressions-and-operators
title: Expressions and operators
hide_title: false
hide_table_of_contents: false
sidebar_label: Expressions and operators
description: What expressions are and what operators you can use in C.
slug: /c/expressions-and-operators
custom_edit_url: null
---

This chapter covers expressions and operators in the C programming language, which are fundamental to performing calculations and manipulating data.

## Expressions

An expression is a ***notation*** that ***denotes*** a value through a process called ***evaluation***.

* **Notation**: text with a formal syntax
* **Evaluation**: the process of calculating the expression
* **Denote**: producing a usable result

Intuitively, expressions in C are similar to expressions in mathematics: they allow you to perform calculations (obtaining a result) using various operators and values.

### Simple expressions

There are two categories of expressions in C:

1. **Simple (elementary) expressions**
2. **Compound expressions** (combinations of other expressions)

Simple expressions include:

* **Constants (literals)**, such as `10`, `'a'`, `-0.1`
* **Variables**, which we covered in the [previous chapter](/docs/c/variables-and-types)

### Function calls

One way to create compound expressions is through function calls, which have the following syntax:

```c
function_name(arguments)
```

Where arguments can be zero or more expressions separated by commas. The function call is itself an expression that denotes the return value of the function.

Examples:

```c
sin(0.5)
pow(2, 4)
sqrt(9)
```

Functions can be nested:

```c
pow(sin(0.5), 2)
sqrt(pow(3, 3))
```

## Operators

Operators are functions with specialized syntax used for common operations. They take operands (which are expressions) and produce a result.

### Classification of operators

Operators can be classified by:

**1. Type of operands/result:**

* Arithmetic
* Relational (comparison)
* Logical
* Conditional
* And others

**2. Number of operands:**

* Unary (one operand)
* Binary (two operands)
* Ternary (three operands)

### Arithmetic operators

Arithmetic operators take numeric operands and produce numeric results.

| Operator | Operation | Type | Example | Result |
|:--------:|:----------|:-----|:--------|:-------|
| `-` | Negation | Unary | `-5` | -5 |
| `+` | Addition | Binary | `2 + 3` | 5 |
| `-` | Subtraction | Binary | `5 - 2` | 3 |
| `*` | Multiplication | Binary | `3 * 4` | 12 |
| `/` | Division | Binary | `10 / 2` | 5 |
| `%` | Modulo (remainder) | Binary | `10 % 3` | 1 |

:::tip Operator Overloading
The same operator symbol can be associated with different operations depending on context. For instance:

* **Unary vs. Binary:** the minus operator (`-`) acts as a unary negation when applied to a single operand (e.g., `-5`) and as binary subtraction when used between two operands (e.g., `10 - 7`).
* **Integer vs. Floating-point division:** the division operator (`/`) performs integer division when both operands are integers (e.g., `10 / 4` results in `2`), but it performs floating-point division when at least one operand is a floating-point value (e.g., `10.0 / 4.0` results in `2.5`).
:::

#### Integer division and modulo

Division between integers (`/`) performs integer division (discards the fractional part):

```c
7 / 3    // Results in 2, not 2.33...
```

The modulo operator (`%`) gives the remainder of integer division:

```c
7 % 3    // Results in 1
```

:::note Math library operations
For more complex mathematical operations like powers and roots, C provides functions in the `math.h` library:

```c
#include <stdio.h>
#include <math.h>

int main() {
    float result = powf(5, 2);  // 5^2
    printf("5 squared = %f\n", result);
    return 0;
}
```

Remember to link the math library when compiling: `gcc -o program program.c -lm`.
:::

### Type conversions in expressions

When operators are applied to operands of different types, C performs implicit type conversions (automatically) according to specific rules.

An expression is:

* **Homogeneous** if all operands are of the same type
* **Heterogeneous** if operands are of different types

In heterogeneous expressions, C promotes/converts primitive data types *implicitly* following this hierarchy:

![C implicit type conversion hierarchy](../c/assets/c-implicit-casting.svg)

#### Examples of automatic type promotion

```c
(3 * 2.0) / 5
```

* `3` is converted to `double` to match `2.0`
* Multiplication yields `6.0` (double)
* `5` is converted to `double`
* Division yields `1.2` (double)

```c
(3 / 2) * 5.0
```

* Integer division `3 / 2` yields `1` (integer)
* `1` is promoted to `1.0` (double) to match `5.0`
* Multiplication yields `5.0` (double)

### Casting (explicit type convertion)

It is possible to force a type conversion using the cast operator, which has the following syntax:

```c
(<type>) <expression>
```

For example:

```c
7 / 3             // Results in 2
(float)7 / 3      // Results in 2.33...
```

:::info
It's best to explicitly indicate type casting to avoid unexpected behavior and make code more readable. Implicit conversions can lead to subtle bugs, especially when mixing signed and unsigned types.

```c
int a = 5;
float b;
b = (float)a;  // Explicit is better than implicit
```

:::
:::warning Type conversions between signed and unsigned
When mixing signed and unsigned types in operations, unexpected behavior such as underflow can occur.

Example:

```c
unsigned a = 2, b = 1;
int result = a - b;  // This is fine, result is 1

unsigned c = 1, d = 2;
int result2 = c - d;  // Unexpected behavior! Underflow occurs
```

To mitigate the risk of exceeding the range of allowed values, you should promote variables to a larger type when necessary:

```c
unsigned a = 1, b = 2;
long result = (long)b - a;  // Safe conversion
```

:::

### Relational operators (comparison)

Relational operators compare two values and produce a logical result. In C, logical results are represented as integers: `0` for false, and a non-zero value (typically `1`) for true.

| Operator | Meaning | Example | Result |
|:--------:|:--------|:--------|:-------|
| `==` | Equal to | `5 == 5` | true (1) |
| `!=` | Not equal to | `5 != 3` | true (1) |
| `>` | Greater than | `5 > 3` | true (1) |
| `<` | Less than | `5 < 3` | false (0) |
| `>=` | Greater than or equal to | `5 >= 5` | true (1) |
| `<=` | Less than or equal to | `3 <= 5` | true (1) |

Example:

```c
#include <stdio.h>

int main() {
    printf("5 == 5: %d\n", 5 == 5);  // Outputs: 1
    printf("5 != 5: %d\n", 5 != 5);  // Outputs: 0
    printf("5 > 3: %d\n", 5 > 3);    // Outputs: 1
    return 0;
}
```

<div class="output">
    <code class="output">
    5 == 5: 1<br/>
    5 != 5: 0<br/>
    5 > 3: 1<br/>
    </code>
</div>

### Logical operators

Logical operators combine logical values (treated as integers in C) and produce logical results.

| Operator | Meaning | Description |
|:--------:|:--------|:------------|
| `!` | Logical NOT | Unary operator that negates its operand |
| `&&` | Logical AND | True only if both operands are true |
| <code>&#124;&#124;</code> | Logical OR | True if at least one operand is true |

Examples:

```c
!0                  // true (1) - negation of false
!5                  // false (0) - negation of true (non-zero)
(5 > 3) && (2 < 4)  // true (1) - both conditions are true
(5 < 3) || (2 < 4)  // true (1) - at least one condition is true
```

:::caution Common pitfalls with operators
Be careful with these common mistakes:

* Using `=` (assignment) instead of `==` (equality comparison)
* Confusing `&&` and `||` (logical operators) with `&` and `|` (bitwise operators)
* Assuming `^` is exponentiation - it's actually the bitwise XOR operator
  * Also, `**` in C indicates a pointer to a pointer, NOT an exponentiation (unlike Python and other languages).

For exponentiation, there's no specific operator, you have to use the `pow()` function from the `math.h` library.
:::

## Operator precedence and associativity

When an expression contains multiple operators, the order of evaluation is determined by:

1. **Precedence**: operators with higher precedence are evaluated first
2. **Associativity**: for operators with equal precedence, the associativity (left-to-right or right-to-left) determines the evaluation order

For example:

```c
3 + 4 * 2    // Evaluated as 3 + (4 * 2) = 11, not (3 + 4) * 2 = 14
```

You can use parentheses to override the default precedence:

```c
(3 + 4) * 2  // Explicitly evaluated as (3 + 4) * 2 = 14
```

### Precedence and associativity table

Here's the full table of operator precedence (with names) in C, from highest to lowest:

| Precedence | Operators | Associativity |
|:----------:|:----------|:------------:|
| 1 | `()` (function call), `[]` (array subscript), `.` (structure member access), `->` (pointer member access) | Left to right |
| 2 | `!` (logical NOT), `~` (bitwise NOT), `++` (pre-increment), `--` (pre-decrement), `+` (unary plus), `-` (unary minus), `*` (dereference), `&` (address-of), `sizeof` (size-of) | **Right to left** |
| 3 | `*` (multiplication), `/` (division), `%` (modulo) | Left to right |
| 4 | `+` (addition), `-` (subtraction) | Left to right |
| 5 | `<<` (left shift), `>>` (right shift) | Left to right |
| 6 | `<` (less than), `<=` (less than or equal to), `>` (greater than), `>=` (greater than or equal to) | Left to right |
| 7 | `==` (equal to), `!=` (not equal to) | Left to right |
| 8 | `&` (bitwise AND) | Left to right |
| 9 | `^` (bitwise XOR) | Left to right |
| 10 | <code>&#124;</code> (bitwise OR) | Left to right |
| 11 | `&&` (logical AND) | Left to right |
| 12 | <code>&#124;&#124;</code> (logical OR) | Left to right |
| 13 | `? :` (ternary conditional) | **Right to left** |
| 14 | `=` (assignment), `+=` (add and assign), `-=` (subtract and assign), `*=` (multiply and assign), `/=` (divide and assign) etc. (compound assignment) | **Right to left** |
| 15 | `,` (comma) | Left to right |

:::info
If you're unsure about operator precedence, use parentheses to make your intentions clear. This improves code readability and prevents errors.
:::

## Assignment operator

The assignment operator (`=`) is used to store a value in a variable:

```c
<variable> = <expression>
```

When executed, it:

1. Evaluates the expression on the right side
2. Stores the resulting value in the variable on the left side
3. The entire assignment itself is an expression that yields the assigned value

Examples:

```c
a = 10;      // Assigns 10 to variable a
a = b = 5;   // Assigns 5 to b, then assigns 5 to a
```

:::caution
Don't confuse the assignment operator (`=`) with the equality comparison operator (`==`). This is a common source of bugs:

```c
// This will error
if (x = 5) {  // ❌ WRONG: assigns 5 to x, then evaluates to true
    // ...
}

// This is correct
if (x == 5) { // ✔️ CORRECT: compares x with 5
    // ...
}
```

:::

### Compound assignment operators

C provides shorthand for combining arithmetic operations with assignment:

| Operator | Equivalent to |
|:--------:|:-------------:|
| `+=` | `x = x + y` |
| `-=` | `x = x - y` |
| `*=` | `x = x * y` |
| `/=` | `x = x / y` |
| `%=` | `x = x % y` |

Example:

```c
x += 5;      // Equivalent to: x = x + 5
y *= 2 + 3;  // Equivalent to: y = y * (2 + 3)
```

## Increment and decrement operators

C provides special operators for incrementing (adding 1) or decrementing (subtracting 1) variables:

| Operator | Name | Effect |
|:--------:|:-----|:-------|
| `++x` | Pre-increment | Increments x, then yields the new value |
| `x++` | Post-increment | Yields the current value of x, then increments it |
| `--x` | Pre-decrement | Decrements x, then yields the new value |
| `x--` | Post-decrement | Yields the current value of x, then decrements it |

Examples:

```c
int a = 5, b;
b = ++a;    // a becomes 6, b becomes 6
```

```c
int a = 5, b;
b = a++;    // a becomes 6, b becomes 5
```

```c
int a = 5, b;
b = a++ + ++a;  // Avoid this, please! Result is compiler-dependent
```

:::caution
Avoid using multiple increment or decrement operators in the same expression, or combining them with other operations on the same variable. This can lead to undefined behavior or code that's difficult to understand.
:::

### 🎲 Increments Alignment Chart

<table>
    <tbody>
        <tr>
            <td><strong>Legal Good 😇</strong><br /><code>i = i + 1</code></td>
            <td><strong>Neutral Good 🙂</strong><br /><code>i++</code></td>
            <td><strong>Chaotic Good 😜</strong><br /><code>++i</code></td>
        </tr>
        <tr>
            <td><strong>Legal Neutral 🤔</strong><br /><code>i = ((i)+(1))</code></td>
            <td><strong>True Neutral 😌</strong><br /><code>i += 1</code></td>
            <td><strong>Chaotic Neutral 😵</strong><br /><code>i -= -1</code></td>
        </tr>
        <tr>
            <td><strong>Legal Evil 😈</strong><br /><code>i = i + i/i</code></td>
            <td><strong>Neutral Evil 😡</strong><br /><code>i += 73*139%2</code></td>
            <td><strong>Chaotic Evil 🔥</strong><br /><code>i += ++i/i--</code></td>
        </tr>
    </tbody>
</table>
