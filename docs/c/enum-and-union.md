---
sidebar_position: 14
id: enum-and-union
title: Enumerations and Unions
hide_title: false
hide_table_of_contents: false
sidebar_label: Enum and Union (extra)
description: Overview of enumerations and unions in C, with syntax, examples, and use cases.
slug: /c/enum-and-union
custom_edit_url: null
---


## Enumerations (`enum`)

An enumeration is a user-defined data type that consists of a set of named integer constants. Enumerations make code more readable by replacing numeric constants with descriptive names.

### Syntax

```c
enum [tag_name] {
    name1 [= value1],
    name2 [= value2],
    ...
    nameN [= valueN]
} [variable_names];
```

Where:

- `tag_name` is an optional name for the enumeration
- `name1`, `name2`, etc. are the enumeration constants
- `value1`, `value2`, etc. are optional integer values
- `variable_names` is an optional list of variables of this enumeration type

### Value assignment

By default, enumeration constants are assigned values starting with 0 and incrementing by 1. However, you can explicitly assign values:

```c
enum Days {
    Sunday = 0,   // Explicitly set to 0
    Monday,       // Automatically 1
    Tuesday,      // Automatically 2
    Wednesday,    // Automatically 3
    Thursday,     // Automatically 4
    Friday,       // Automatically 5
    Saturday      // Automatically 6
} workday;
```

### Auto-incrementing behavior

The auto-incrementing behavior continues even after explicitly assigned values:

```c
enum Colors {
    Red,          // 0 (default start)
    Blue = 18,    // 18 (explicitly assigned)
    Green,        // 19 (auto-incremented from 18)
    White = 32,   // 32 (explicitly assigned)
    Black         // 33 (auto-incremented from 32)
};
```

You can also manually assign every value if needed:

```c
enum Priorities {
    Low = 1,
    Medium = 5,
    High = 10,
    Critical = 15
};
```

It's also possible for multiple constants to have the same value:

```c
enum StatusCodes {
    Success = 0,
    OK = 0,        // Same as Success
    Error = 1,
    Failure = 1    // Same as Error
};
```

### 📍 Example

```c
#include <stdio.h>

enum Color {
    RED,    // 0
    GREEN,  // 1
    BLUE    // 2
};

int main() {
    // Declare an enum variable
    enum Color favorite_color = BLUE;
    
    // Use in a switch statement
    switch(favorite_color) {
        case RED:
            printf("Your favorite color is red\n");
            break;
        case GREEN:
            printf("Your favorite color is green\n");
            break;
        case BLUE:
            printf("Your favorite color is blue\n");
            break;
    }
    
    // Enums are integers
    printf("Enum value: %d\n", favorite_color);
    
    return 0;
}
```

<div class="output">
<code class="output">
Your favorite color is blue<br/>
Enum value: 2
</code>
</div>

### Enums as parameter types

Enums can be used as parameter types for functions, providing better type safety and code readability:

```c
enum Operation { ADD, SUBTRACT, MULTIPLY, DIVIDE };

double calculate(enum Operation op, double a, double b) {
    switch(op) {
        case ADD:      return a + b;
        case SUBTRACT: return a - b; 
        case MULTIPLY: return a * b;
        case DIVIDE:   return a / b;
        default:       return 0;
    }
}

int main() {
    double result = calculate(MULTIPLY, 5.0, 3.0);
    printf("Result: %.1f\n", result);  // Output: Result: 15.0
    return 0;
}
```

### Benefits of enumerations

1. **Improved readability**: Using named constants instead of "magic numbers"
2. **Type safety**: Better than using `#define` macros as enums have a specific type
3. **Debuggability**: Enum values are visible in debuggers, unlike macros
4. **Documentation**: Enum names serve as self-documentation
5. **Organization**: Helps group related constants together

---

## Unions (`union`)

A union is a special data type that allows storing different data types in the same memory location. Unlike structures where each member has its own memory location, unions allocate enough memory for the largest member, and all members share that same memory space.

### Syntax

```c
union [tag_name] {
    data_type member1;
    data_type member2;
    ...
    data_type memberN;
} [variable_names];
```

### Union initialization

Unions can be initialized similar to structs:

```c
// Initialize the first member
union example_u u1 = { 0xFF };

// Named member initialization 
union example_u u2 = { .i = 0xFFFFFFFF };

// Multiple initializers (only the last one has effect)
union example_u u3 = { .c = 0x0A, .s = 0x0C0D, .i = 0xFFFF };
// Only u3.i will be set, overwriting previous initializations
```

### Memory allocation

The key difference between structs and unions:

- A **struct** allocates enough memory for all members (sum of their sizes)
- A **union** allocates only enough memory for the largest member

This means that at any given time, you can only reliably use one member of a union.

#### Memory layout comparison

To illustrate the difference, let's compare a struct and union with identical members:

```c
struct example_s {
    char c;    // 1 byte
    short s;   // 2 bytes
    int i;     // 4 bytes
};  // Total: at least 7 bytes (typically 8 with alignment)

union example_u {
    char c;    // 1 byte
    short s;   // 2 bytes
    int i;     // 4 bytes
};  // Total: 4 bytes (size of largest member)
```

The size of `struct example_s` would typically be 8 bytes (potentially with padding), while the size of `union example_u` would be exactly 4 bytes (the size of an int, which is the largest member).

#### Memory overlap example

When you access members of a union, you're **accessing the same memory location** but interpreting it as different types:

```c
#include <stdio.h>

int main() {
    union example_u {
        char c;
        short s;
        int i;
    } u;
    
    // Store an integer value (assuming little-endian architecture)
    u.i = 0x0A0B0C0D;  // In memory: [0D 0C 0B 0A]
    
    // Access as different types
    printf("u.i = 0x%X\n", u.i);       // 0x0A0B0C0D (all 4 bytes)
    printf("u.s = 0x%X\n", u.s);       // 0x0C0D (first 2 bytes)
    printf("u.c = 0x%X\n", u.c);       // 0x0D (first byte only)
    
    return 0;
}
```

### 📍 Example

```c
#include <stdio.h>

union Value {
    int i;
    float f;
    char str[20];
};

int main() {
    union Value val;
    
    val.i = 10;
    printf("Integer value: %d\n", val.i);
    
    val.f = 3.14;
    printf("Float value: %f\n", val.f);
    printf("Integer value (now corrupted): %d\n", val.i);
    
    return 0;
}
```

<div class="output">
<code class="output">
Integer value: 10<br/>
Float value: 3.140000<br/>
Integer value (now corrupted): 1078523331
</code>
</div>

Note how setting the float value corrupts the integer value, as they share the same memory location.

### Use cases for unions

1. **Type conversion**: Accessing the same data in different ways
2. **Memory conservation**: When memory is limited and you need to store different types but never simultaneously
3. **Variant types**: Implementing variables that can hold different types (like in the example above)
4. **Bit manipulation**: Accessing individual bits of a larger data type

:::caution
Using unions can lead to unexpected behavior if you're not careful. Since all members share the same memory, setting one member will overwrite any previous value. Always keep track of which member of the union currently contains valid data.
:::
