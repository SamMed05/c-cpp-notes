---
sidebar_position: 12
id: strings
title: Strings
hide_title: false
hide_table_of_contents: false
sidebar_label: Strings
description: Understanding strings in C
slug: /c/strings
custom_edit_url: null
---

Strings are one of the most commonly used data types in programming. In C, strings have unique characteristics that differ from many other programming languages.

## What are strings in C?

In C, a string is **a sequence of characters stored as an array of `char` values terminated with a null character** (`'\0'`). 

This null character (which has the ASCII value of 0) serves as the string terminator, indicating where the string ends.

```c
char greeting[] = "Hello";
```

What's actually stored in memory is:
```
'H' 'e' 'l' 'l' 'o' '\0'
```

The null terminator is automatically added by the compiler when you define a string using double quotes.

## String declaration and initialization

There are several ways to declare and initialize strings in C:

```c
// Method 1: String literal with automatic size calculation
char greeting[] = "Hello, World!";

// Method 2: Character array with manual initialization
char message[] = {'H', 'e', 'l', 'l', 'o', '\0'};

// Method 3: Declaring with explicit size (must include space for '\0')
char name[10] = "John";

// Method 4: Uninitialized string
char buffer[100];  // Space for 99 characters + null terminator
```

:::warning

When declaring a string with a specific size, always account for the null terminator! A string with 10 characters needs at least 11 bytes of storage.

If you don't allocate enough space for the null terminator, you risk writing beyond the allocated memory. This can result in buffer overflows, leading to undefined behavior such as data corruption, crashes, or security vulnerabilities.

:::

## Strings as pointers

Since strings are arrays in C, they're closely linked to pointers. A string variable name is essentially a pointer to the first character of the string:

```c
char *str = "Hello";  // str points to the first character 'H'
```

This relationship allows you to:
- Pass strings to functions efficiently (without copying the entire contents)
- Navigate through the characters of a string using pointer arithmetic

:::caution String literals vs Arrays
There's an important distinction between these two declarations:

```c
char *str1 = "Hello";  // Points to a string literal (read-only)
char str2[] = "Hello";  // Creates a modifiable character array
```

With `str1`, attempting to modify the contents (like `str1[0] = 'J'`) can cause undefined behavior because string literals are typically stored in read-only memory.

With `str2`, modifications are perfectly valid as the string is stored in a writable array.
:::

## Common string operations

### String length

To find the length of a string, use the `strlen()` function from `<string.h>`:

```c
#include <string.h>
#include <stdio.h>

int main() {
    char message[] = "Hello, World!";
    int length = strlen(message);  // Returns 13 (doesn't count '\0')
    printf("Length: %d\n", length);
    return 0;
}
```

:::note Array Length vs String Length
In C, you can calculate the number of elements in an array by dividing the total size of the array by the size of a single element. For example, a character in C is typically 1 byte, whereas an integer is often 4 bytes.

```c
char message[] = "Hello, World!";
int array_size = sizeof(message) / sizeof(message[0]);  // Returns 14 (includes the '\0' terminator)

int numbers[] = {1, 2, 3, 4, 5};
int num_count = sizeof(numbers) / sizeof(numbers[0]);  // Returns 5 on most systems where sizeof(int) is 4 bytes
```

This method works by dividing the total number of bytes occupied by the array by the number of bytes of a single element. Note that for character arrays, this will include the null terminator, which is why `sizeof(message)/sizeof(message[0])` returns 14 while `strlen(message)` returns 13.

Keep in mind that this approach only works for arrays whose size is determined at compile time. When you pass an array to a function, it decays to a pointer, and you lose information about the total size of the array.

:::

### String copying

To copy one string to another, use `strcpy()` or the safer `strncpy()`:

```c
#include <string.h>

int main() {
    char source[] = "Hello";
    char destination[20];
    
    strcpy(destination, source);  // Copies "Hello" to destination
    
    // Safer version with size limit
    char limited[3];
    strncpy(limited, source, 2);  // Copies only "He"
    limited[2] = '\0';  // Always null-terminate after strncpy!
    
    return 0;
}
```

:::warning
Always ensure the destination array is large enough to hold the source string plus the null terminator! Using `strcpy()` on a destination that's too small will cause a buffer overflow.
:::

### String concatenation

To join two strings, use the `strcat()` or safer `strncat()` functions:

```c
#include <string.h>
#include <stdio.h>

int main() {
    char result[20] = "Hello, ";
    char name[] = "John";
    
    strcat(result, name);  // result becomes "Hello, John"
    printf("%s\n", result);
    
    return 0;
}
```

### String comparison

To compare strings, use `strcmp()` (not the `==` operator):

```c
#include <string.h>
#include <stdio.h>

int main() {
    char str1[] = "apple";
    char str2[] = "banana";
    
    if (strcmp(str1, str2) == 0) {
        printf("Strings are equal\n");
    } else if (strcmp(str1, str2) < 0) {
        printf("str1 comes before str2\n");  // This will print
    } else {
        printf("str1 comes after str2\n");
    }
    
    return 0;
}
```

:::caution
Never compare strings using the `==` operator in C:

```c
// This will error
if (str1 == str2)  // ❌ WRONG! Compares addresses, not contents
```

Instead, use the `strcmp()` function from `<string.h>` to compare the contents of the strings:

```c
#include <string.h>
// ...
// This is correct
if (strcmp(str1, str2) == 0) {
    // Strings are equal
} else {
    // Strings are different
}
```

:::

## Reading and writing strings

C provides several functions for reading and writing strings:

### Reading strings

```c
#include <stdio.h>

int main() {
    char name[50];
    
    printf("Enter your name: ");
    
    // Method 1: scanf (stops at whitespace)
    scanf("%s", name);
    
    // Method 2: fgets (reads entire line including spaces)
    fgets(name, 50, stdin);
    
    return 0;
}
```

:::tip Removing newline from fgets
`fgets` includes the newline character in the string. To remove it:

```c
#include <string.h>

size_t len = strlen(name);
if (len > 0 && name[len-1] == '\n') {
    name[len-1] = '\0';  // Replace newline with null terminator
}
```
:::

### Writing strings

```c
#include <stdio.h>

int main() {
    char message[] = "Hello, World!";
    
    // Method 1: printf
    printf("%s\n", message);
    
    // Method 2: puts (automatically adds newline)
    puts(message);
    
    return 0;
}
```

## String manipulation with pointers

Pointers provide powerful ways to work with strings:

```c
#include <stdio.h>

int main() {
    char str[] = "Hello";
    char *ptr = str;
    
    // Printing characters one by one
    while (*ptr != '\0') {
        printf("%c", *ptr);
        ptr++;
    }
    
    // Finding string length manually
    int length = 0;
    ptr = str;  // Reset pointer to start of string
    while (*ptr != '\0') {
        length++;
        ptr++;
    }
    printf("\nLength: %d\n", length);
    
    return 0;
}
```

## Multi-dimensional arrays for multiple strings

To store multiple strings, you can use a 2D array:

```c
char fruits[3][10] = {
    "apple",
    "banana",
    "orange"
};

// Access individual strings
printf("%s\n", fruits[1]);  // Prints "banana"
```

Alternatively, you can use an array of pointers:

```c
char *fruits[] = {
    "apple",
    "banana", 
    "orange"
};

printf("%s\n", fruits[2]);  // Prints "orange"
```

## Common string functions in `<string.h>`

| Function | Description |
|----------|-------------|
| `strlen(str)` | Returns the length of the string |
| `strcpy(dest, src)` | Copies src string to dest |
| `strncpy(dest, src, n)` | Copies up to n characters of src to dest |
| `strcat(dest, src)` | Appends src to the end of dest |
| `strncat(dest, src, n)` | Appends up to n characters of src to dest |
| `strcmp(s1, s2)` | Compares strings (returns 0 if equal) |
| `strncmp(s1, s2, n)` | Compares up to n characters |
| `strchr(str, ch)` | Returns pointer to first occurrence of ch in str |
| `strstr(haystack, needle)` | Returns pointer to first occurrence of needle string in haystack |

## Character classification functions

The `<ctype.h>` header provides several functions for classifying and manipulating individual characters:

| Function | Description |
|----------|-------------|
| `isalpha(c)` | Returns non-zero if c is a letter (a-z, A-Z) |
| `isdigit(c)` | Returns non-zero if c is a digit (0-9) |
| `isalnum(c)` | Returns non-zero if c is alphanumeric (letter or digit) |
| `islower(c)` | Returns non-zero if c is a lowercase letter (a-z) |
| `isupper(c)` | Returns non-zero if c is an uppercase letter (A-Z) |
| `isspace(c)` | Returns non-zero if c is a whitespace character (space, tab, newline, etc.) |
| `ispunct(c)` | Returns non-zero if c is a punctuation character |
| `isprint(c)` | Returns non-zero if c is a printable character (including space) |
| `iscntrl(c)` | Returns non-zero if c is a control character |
| `tolower(c)` | Converts c to lowercase if it's uppercase, otherwise returns c unchanged |
| `toupper(c)` | Converts c to uppercase if it's lowercase, otherwise returns c unchanged |

These functions are especially useful when processing text input or validating strings:

```c
#include <stdio.h>
#include <ctype.h>

int main() {
    char str[] = "Hello123!";
    int i = 0;
    char ch;

    while ((ch = str[i]) != '\0') {
        if (isalpha(ch)) {
            printf("'%c' is an alphabet character.\n", ch);
        } else if (isdigit(ch)) {
            printf("'%c' is a digit.\n", ch);
        } else if (isprint(ch)) {
            printf("'%c' is a printable character (but not alpha/digit).\n", ch);
        }
        // Example of case conversion
        if (islower(ch)) {
            printf("Lowercase '%c' to uppercase: '%c'\n", ch, toupper(ch));
        } else if (isupper(ch)) {
            printf("Uppercase '%c' to lowercase: '%c'\n", ch, tolower(ch));
        }
        i++;
    }
    return 0;
}
```

:::warning
The `<ctype.h>` functions expect an `int` parameter that represents an `unsigned char` value, or `EOF`. Passing a `signed char` value with its high bit set (which might be negative if `char` is signed and has a negative value) can lead to undefined behavior. It's safer to cast the argument to `unsigned char`: `isdigit((unsigned char)ch)`.
:::

## Character encoding in C

Character encoding is the system that maps characters to numeric codes that computers can understand and process.

### ASCII encoding

C traditionally uses ASCII (American Standard Code for Information Interchange) encoding, where each character is represented by a 7-bit number (0-127):

- 0-31: Control characters (non-printable)
- 32-126: Printable characters (letters, digits, punctuation, etc.)
- 127: Delete character

Example ASCII values:
- 'A' is 65
- 'a' is 97
- '0' is 48
- Space is 32

You can print the ASCII value of a character using the `%d` format specifier:

```c
char ch = 'A';
printf("ASCII value of %c is %d\n", ch, ch);
// Output: ASCII value of A is 65
```

### Extended ASCII and multi-byte character sets

Many C implementations support extended ASCII (8-bit, values 128-255) for additional characters like accented letters and symbols. However, extended ASCII is not standardized and varies between systems (different "code pages" can exist for different languages).

For broader international character support, more complex encodings are used:
- **Multi-byte encodings**: Characters can be represented by one or more bytes. UTF-8 is a prominent example.

### Working with Unicode in C

Standard C (up to C99/C11) has limited built-in support for Unicode directly within the `char` type, which is typically 8 bits. However, there are several ways to work with Unicode:

1.  **UTF-8 encoding**:
    *   UTF-8 is a variable-width encoding that represents Unicode characters using one to four bytes.
    *   It's backward compatible with ASCII (characters 0-127 are represented by a single byte, identical to their ASCII codes).
    *   UTF-8 strings can be stored in `char` arrays. However, standard C string functions (like `strlen()`, `strcpy()`) treat each byte as a separate character. Processing multi-byte characters requires careful, custom logic or specialized libraries. For example, `strlen()` on a UTF-8 string will return the number of bytes, not the number of Unicode characters.

2.  **Wide character support**:
    *   C provides the `wchar_t` type (defined in `<stddef.h>`) and functions in `<wchar.h>` for handling wide characters. `wchar_t` is an integer type whose size is implementation-defined and large enough to represent any character in the supported locales.
    *   Wide string literals are prefixed with `L`: `L"Hello, 世界"`.
    *   Functions like `wprintf()`, `wcslen()`, `wcscpy()` operate on wide character strings.
    ```c
    #include <wchar.h>
    #include <stdio.h> // For wprintf, though often included by wchar.h
    #include <locale.h> // For setlocale

    int main() {
        // Set locale to support wide character printing
        setlocale(LC_ALL, ""); 

        wchar_t wide_str[] = L"Hello, 世界";
        wprintf(L"Wide string: %ls\n", wide_str);
        wprintf(L"Length of wide string: %zu characters\n", wcslen(wide_str));
        return 0;
    }
    ```

3.  **External libraries**: Libraries like ICU (International Components for Unicode) provide comprehensive Unicode support, including complex text layout, collation, and conversion.

:::info
UTF-8 has become the most common encoding for international text because:
- It's compatible with ASCII
- It can represent any Unicode character
- It's space-efficient
- It's the default encoding for HTML5 and most modern web services

However, processing UTF-8 strings in C requires careful handling since a single character may span multiple bytes.
:::

## String Literals

String literals (e.g., `"hello"`) are sequences of characters enclosed in double quotes. They have specific properties in C:

1.  **Type**: A string literal like `"hello"` is of type `char[6]` (5 characters + 1 for the null terminator `\0`). In general, a string literal of `N` visible characters has type `char[N+1]`. An empty string `""` has type `char[1]` (it contains only the null terminator).

2.  **Storage**: String literals are typically stored in a read-only section of memory. This means attempting to modify a string literal results in undefined behavior (often a program crash).

    ```c
    char *s = "hello";
    // s[0] = 'H'; // Undefined behavior! Do not do this.
    ```
    To have a modifiable string, initialize a `char` array with the literal:
    ```c
    char s[] = "hello";
    s[0] = 'H'; // OK, s is now "Hello"
    ```
    It's good practice to use `const char *` when a pointer is intended to point to a string literal, as this allows the compiler to warn against accidental modification attempts:
    ```c
    const char *s = "hello"; // Preferred for literals
    ```

3.  **Concatenation**: Adjacent string literals are automatically concatenated by the compiler at compile time.
    ```c
    const char *message = "Hello, " "world" "!";
    // This is equivalent to:
    // const char *message = "Hello, world!";

    // This also works across multiple lines:
    const char *long_message = "This is a very long message "
                               "that spans multiple lines "
                               "for readability.";
    ```
    Note: This concatenation happens at compile time. It's not a runtime string operation.

4.  **Null Termination**: All string literals are automatically null-terminated by the compiler. You don't need to add `\0` explicitly.
