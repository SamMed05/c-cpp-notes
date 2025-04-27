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

### Usage example

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

### Benefits of enumerations

1. **Improved readability**: Using named constants instead of "magic numbers"
2. **Type safety**: Better than using `#define` macros as enums have a specific type
3. **Debuggability**: Enum values are visible in debuggers, unlike macros
4. **Documentation**: Enum names serve as self-documentation

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

### Memory allocation

The key difference between structs and unions:

- A **struct** allocates enough memory for all members (sum of their sizes)
- A **union** allocates only enough memory for the largest member

This means that at any given time, you can only reliably use one member of a union.

### Example

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

### Practical use with type tag

Unions are often used with a type tag to know which member is currently valid:

```c
#include <stdio.h>

// Define an enumeration for type identification
enum ValueType {
    INTEGER,
    FLOAT,
    STRING
};

// Define a union that can hold different types
union Data {
    int i;
    float f;
    char str[20];
};

// Define a struct that combines the union with a type tag
struct TypedValue {
    enum ValueType type;
    union Data value;
};

// Function to print the value according to its type
void print_value(struct TypedValue tv) {
    switch(tv.type) {
        case INTEGER:
            printf("Integer value: %d\n", tv.value.i);
            break;
        case FLOAT:
            printf("Float value: %f\n", tv.value.f);
            break;
        case STRING:
            printf("String value: %s\n", tv.value.str);
            break;
    }
}

int main() {
    struct TypedValue tv;
    
    // Store an integer
    tv.type = INTEGER;
    tv.value.i = 42;
    print_value(tv);
    
    // Store a float
    tv.type = FLOAT;
    tv.value.f = 3.14;
    print_value(tv);
    
    // Store a string
    tv.type = STRING;
    sprintf(tv.value.str, "Hello");
    print_value(tv);
    
    return 0;
}
```

<div class="output">
<code class="output">
Integer value: 42<br/>
Float value: 3.140000<br/>
String value: Hello
</code>
</div>

### Use cases for unions

1. **Type conversion**: Accessing the same data in different ways
2. **Memory conservation**: When memory is limited and you need to store different types but never simultaneously
3. **Variant types**: Implementing variables that can hold different types (like in the example above)
4. **Bit manipulation**: Accessing individual bits of a larger data type

:::caution
Using unions can lead to unexpected behavior if you're not careful. Since all members share the same memory, setting one member will overwrite any previous value. Always keep track of which member of the union currently contains valid data.
:::
