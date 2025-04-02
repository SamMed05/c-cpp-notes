---
sidebar_position: 17
id: exercises_3
title: Exercises (Part 3)
hide_title: false
hide_table_of_contents: false
sidebar_label: EXERCISES
description: Exercises on pointers and memory allocation.
slug: /c/exercises_3
custom_edit_url: null
---

import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Spoiler from '@site/src/components/Spoiler';

:::info

For exercises on topics before pointers, refer to C++ exercises [Part 1](/docs/cpp/exercises_1) and [Part 2](/docs/cpp/exercises_2) (the solutions will be pretty similar to the relative C implementation).

:::

Now that you know about pointers and memory allocation, let's practice with some exercises!

In this section, you'll find exercises ranging from basic pointer usage to more complex memory allocation scenarios. For each exercise, one or multiple solutions are provided, but try to solve them yourself first.

A difficulty is assigned to each exercise using a 3-star rating. Keep in mind that this is a subjective rating and might not accurately reflect your personal experience.

## Basic Pointer Exercises

### Finding the maximum value (★☆☆)

Implement a function to find the maximum value in an integer array using the following prototype:

```c
void find_max(int *rmax, int *values, unsigned size);
```

Where:

- `values` is a pointer to the array
- `size` is the size of the array
- `rmax` is a pointer to the element in the array that represents the maximum value

You can assume that the array pointer is valid, the size is greater than 0, and is consistent with the actual values in the array.

<Spoiler>
Remember that `rmax` is a pointer - you need to store the actual maximum value at the memory location it points to using the dereference operator (*).
</Spoiler>

<details>
<summary>Show solution</summary>

<Tabs>
<TabItem value="solution1" label="Solution 1">

```c
#include <stdio.h>
#include <stdlib.h>
#define SIZE 100  // Array test size

void find_max(int *rmax, int *values, unsigned size) {
    for (unsigned int i = 0; i < size; i++) {
        if (*rmax < *(values + i)) {
            *rmax = *(values + i);
        }
    }
}

int main() {
    int a[SIZE];
    for (int i = 0; i < SIZE; i++) {
        a[i] = i;
    }
    int max_a = a[0];  // max_a contains the value of the 1st element

    find_max(&max_a, a, SIZE);  // Pass address, array and size
    printf("Max: %d\nAddress: %p\n", max_a, &max_a);

    return 0;
}
```

This solution uses pointer arithmetic and assumes `*rmax` is pre-initialized and uses pointer arithmetic (`*(values + i)`).

</TabItem>

<TabItem value="solution2" label="Solution 2">

```c
#include <stdio.h>
#include <stdlib.h>
#define SIZE 100  // Array test size

void find_max(int *rmax, int *values, unsigned size) {
    *rmax = values[0];  // Initialize rmax to point to the first element
    
    // Iterate through the array to find the maximum
    for (unsigned i = 1; i < size; i++) {
        if (values[i] > *rmax) {
            *rmax = values[i];
        }
    }
}

int main() {
    int a[SIZE];
    for (int i = 0; i < SIZE; i++) {
        a[i] = i;
    }
    int max_a;  // No initialization

    find_max(&max_a, a, SIZE);  // Pass address, array and size
    printf("Max: %d\nAddress: %p\n", max_a, &max_a);

    return 0;
}
```

In this solution, we initialize `*rmax` (`rmax` pointer dereference, meaning it accesses the memory location that `rmax` points to) with the first element's value (`values[0]`).

The line `*rmax = values[0];` assigns the value of `values[0]` to the memory location pointed to by `rmax`.

This solution explicitly initializes `*rmax` with the first element and uses array indexing (`values[i]`) without relying on an external initialization.

</TabItem>
</Tabs>

:::note Note
##### Why use a constant size with `SIZE`?

We use a constant size defined by the macro `SIZE` because array declarations in C require a compile-time constant size. Without this, the compiler would throw an error like "*expression must have a constant value*".

##### Why pass `&max_a` and `a` to `find_max()`?

In the `find_max()` function:

- We pass `&max_a` (address of `max_a`) because we want the function to modify the original variable in the calling function.
- For the array `a`, we pass it directly because arrays in C automatically decay to **pointers to their first element when passed to functions**, so `a` is equivalent to `&a[0]`.

###### What happens if you pass `&a` instead of the array `a`?  

If you pass `&a` instead of `a`, the function would receive a pointer to the entire array (`int (*)[SIZE]`), not a pointer to its first element (`int *`). This wouldn't match the function's parameter type, as the function expects a pointer to an `int`, not a pointer to an array.

##### Why populate the array with index values?

We populate the array with index values for simplicity. This approach ensures the array is predictable and easy to test, but the solutions will work with any array values.
:::

</details>

### Finding minimum and maximum values (★☆☆)

Implement a function similar to the previous one, but finding both the minimum and maximum values. The function should follow this prototype:

```c
void find_minmax(int *rmin, int *rmax, int *values, unsigned size);
```

Where:

- `values` is a pointer to the array
- `size` is the size of the array
- `rmin` is a pointer to the element representing the minimum value
- `rmax` is a pointer to the element representing the maximum value

<details>
<summary>Show solution</summary>

```c
void find_minmax(int *rmin, int *rmax, int *values, unsigned size) {
    // Initialize rmin and rmax to the first element
    *rmin = values[0];  // With array indexing OR
    *rmax = *values;    // With pointer arithmetic
    
    // Iterate through the array to find min and max
    for (unsigned i = 1; i < size; i++) {
        if (values[i] < *rmin) {
            *rmin = values[i];     // With array indexing OR
        }
        if (*(values + i) > *rmax) {
            *rmax = *(values + i); // With pointer arithmetic
        }
    }
}
```

Array indexing (`values[i]`) and pointer arithmetic (`*(values + i)`) are interchangeable in C, as both access the same memory location (the first element plus an offset).

</details>

### Computing mean and variance (★☆☆)

Implement a function to calculate the arithmetic mean and variance of a set of values, using the following prototype:

```c
void compute_mean_variance(float *rmean, float *rvariance, float *values, unsigned size);
```

Where:

- `values` is a pointer to the array
- `size` is the size of the array
- `rmean` is a pointer to store the mean value
- `rvariance` is a pointer to store the variance value

Remember that the variance is calculated as:  

$$
\sigma^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \mu)^2
$$
  
where $\mu$ is the mean and $n$ is the number of values.

<Spoiler>
For computing variance efficiently, you should first calculate the mean, then in a second pass calculate the sum of squared differences from that mean.
</Spoiler>

<details>
<summary>Show solution</summary>

<Tabs>
<TabItem value="solution1" label="Solution 1">

```c
#include <math.h>
#include <stdio.h>
#include <stdlib.h>

void compute_mean_variance(float *rmean, float *rvariance, float *values, unsigned size) {
    // Calculate mean (make sure it's already initialized at 0)
    for (int i = 0; i < size; i++) {
        *rmean += values[i];
    }
    *rmean /= (float)size;

    // Calculate variance
    for (int i = 1; i <= size; i++) { // Or start at 0 and < size
        *rvariance += pow(values[i - 1] - *rmean, 2);
    }
    *rvariance /= (float)size;
}

int main() {
    float a[100];
    for (unsigned i = 0; i < 100; i++) {
        a[i] = i;
    }
    float mean = .0f, variance = .0f;

    // Pass 'a' directly (equivalent to &a[0]) because arrays decay to pointers when used in an expression
    compute_mean_variance(&mean, &variance, a, 100);
    printf("Mean: %f\nVariance: %f", mean, variance);

    return 0;
}
```

</TabItem>

<TabItem value="solution2" label="Solution 2">

```c
#include <stdio.h>
#include <stdlib.h>

void compute_mean_variance(float *rmean, float *rvariance, float *values, unsigned size) {
    // Calculate mean
    for (unsigned i = 0; i < size; i++) {
        *rmean += values[i];
    }
    *rmean /= size;

    // Calculate variance
    for (unsigned i = 0; i < size; i++) {
        *rvariance += (values[i] - *rmean) * (values[i] - *rmean); // No need to use math.h library
    }
    *rvariance /= size;
}

int main() {
    float a[100];
    for (unsigned i = 0; i < 100; i++) {
        a[i] = i;
    }
    float mean = 0.0f, variance = 0.0f;

    compute_mean_variance(&mean, &variance, a, 100);
    printf("Mean: %f\nVariance: %f\n", mean, variance);

    return 0;
}
```

</TabItem>
</Tabs>

In `.0f`, using 'f' explicitly tells the compiler the numerical literal should be taken as a float number, instead of as a double (which is what C default to when dealing with decimal numbers).

If we don't initialize mean and variance at 0 before passing them, we must do it inside `compute_mean_variance`, since we are summing values to them.

In the second loop for calculating variance, the first solution starts at 1 and ends at n (including extremes) to reflect the mathematical formula, but it can also start one step ahead and adjust the index accordingly (remembering that indexes represent offsets, therefore they start from 0, not 1).

</details>

### Swapping values (★☆☆)

Implement a function to swap the values of two integers using pointers. The function should have the following prototype:

```c
void swap(int *a, int *b);
```

<details>
<summary>Show solution</summary>

```c
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
```

</details>

### Pointer arithmetic with arrays (★☆☆)

Write a function that takes an integer array and its size as parameters, then prints all elements using only pointer arithmetic (without using array indexing notation `[]`). The function should have the following prototype:

```c
void print_array(int *arr, unsigned size);
```

<details>
<summary>Show solution</summary>

```c
void print_array(int *arr, unsigned size) {
    int *end = arr + size; // Points just past the last element
    
    for (int *p = arr; p < end; p++) {
        printf("%d ", *p);
    }
    printf("\n");
}
```

</details>

### Reverse an array (★★☆)

Write a function that reverses the elements of an array in place (without using a second array), using only pointers. The function should have the following prototype:

```c
void reverse_array(int *arr, unsigned size);
```

<Spoiler>
Consider using two pointers - one starting from the beginning and one from the end of the array. Swap their values and move them toward each other until they meet in the middle.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
void reverse_array(int *arr, unsigned size) {
    int *start = arr;
    int *end = arr + size - 1;
    
    while (start < end) {
        // Swap values at start and end pointers
        int temp = *start;
        *start = *end;
        *end = temp;
        
        // Move pointers toward the middle
        start++;
        end--;
    }
}
```

</details>

### Reversing an array to a new location (★☆☆)

Write a function that reverses an array of integers into another array (without modifying the original array), using the following prototype:

```c
void reversei(int *r, const int *values, unsigned size);
```

Where:

- `r` is a pointer to the destination array where the reversed values will be stored
- `values` is a pointer to the source array
- `size` is the size of both arrays

<details>
<summary>Show solution</summary>

```c
void reversei(int *r, const int *values, unsigned size) {
    for (unsigned i = 0; i < size; i++) {
        r[i] = values[size - 1 - i];
    }
}

// Example usage:
int main() {
    int original[] = {1, 2, 3, 4, 5};
    int reversed[5];
    unsigned size = 5;
    
    reversei(reversed, original, size);
    
    printf("Original array: ");
    for (unsigned i = 0; i < size; i++) {
        printf("%d ", original[i]);
    }
    
    printf("\nReversed array: ");
    for (unsigned i = 0; i < size; i++) {
        printf("%d ", reversed[i]);
    }
    
    return 0;
}
```

</details>

### Reversing a string (★☆☆)

Write a function that reverses a C string into another string, using the following prototype:

```c
void reverses(char *r, const char *s);
```

Where:

- `r` is a pointer to the destination string where the reversed string will be stored
- `s` is a pointer to the source string

Try both with and without using the `string.h` library.

<Spoiler>
Remember that strings in C are null-terminated, so you need to find the length of the string first, then copy the characters in reverse order, and finally add the null terminator.
</Spoiler>

<details>
<summary>Show solution</summary>

<Tabs>
<TabItem value="solution1" label="Solution 1">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void reverses(char *r, const char *s) {
    // This will error
    // int length = sizeof(s) / sizeof(s[0]); // ❌ Do not do this here
    int length = strlen(s); // Calculate the length of the string

    // Reverse the string
    for (int i = length; i > 0; i--) {
        r[length - i] = s[i - 1];
    }
    // ↕️ or
    // for (int i = 0; i < length; i++) {
    //     r[i] = s[length - 1 - i];
    // }

    r[length] = '\0'; // Null-terminate the reversed string
}

int main() {
    char s[] = "Hello, World!";
    int length = strlen(s); // Calculate the length of the string

    printf("Original: %s\n", s);

    // Allocate memory for the reversed string
    char *r = (char *)malloc((length + 1) * sizeof(char)); // Include space for null terminator
    if (r == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        return 1;
    }
    
    reverses(r, s);
    printf("Reversed: %s\n", r); // Print the reversed string

    free(r); // Free allocated memory
    
    return 0;
}
```

Using `string.h` library.

:::info Note
When an array is passed to a function in C, it "decays" into a pointer to its first element. This means operations like `sizeof(array)` inside the function will only return the size of the pointer itself (typically 4 or 8 bytes), not the size of the entire array.

This is why we can't calculate the array length inside the function using the `sizeof(array)/sizeof(array[0])` approach that works in the calling context. Instead, we need to pass the array length as a separate parameter to the function or use `strlen` for strings.

#### Why does this happen?

The issue lies in how the two methods calculate the length of the array or string, and it depends on the type of `s`.

##### 1. **Using `sizeof(s) / sizeof(s[0])`**

This method works only if `s` is a **statically allocated array** (e.g., `char s[100]`). The `sizeof` operator calculates the total size of the array in bytes (`sizeof(s)`) and divides it by the size of one element (`sizeof(s[0])`). This gives the number of elements in the array.

However, if `s` is a **pointer** (e.g., `char *s`), `sizeof(s)` will return the size of the pointer itself, not the size of the memory it points to. This makes the calculation incorrect.

##### 2. **Using `strlen(s)`**

The `strlen` function works for **null-terminated strings**. It calculates the length of the string by iterating through the characters in `s` until it finds the null terminator (`'\0'`). This works regardless of whether `s` is a statically allocated array or a dynamically allocated pointer, as long as it points to a valid null-terminated string.

See this example:

```c
#include <stdio.h>
#include <string.h>

int main() {
    char s1[] = "Hello";  // Statically allocated array
    char *s2 = "World";   // Pointer to a string literal

    printf("Using sizeof on s1: %zu\n", sizeof(s1)); // Works, gives 6 (5 chars + '\0')
    printf("Using sizeof on s2: %zu\n", sizeof(s2)); // Gives size of pointer, not the string

    printf("Using strlen on s1: %zu\n", strlen(s1)); // Works, gives 5
    printf("Using strlen on s2: %zu\n", strlen(s2)); // Works, gives 5

    return 0;
}
```

:::

</TabItem>

<TabItem value="solution2" label="Solution 2">

```c
void reverses(char *r, const char *s) {
    // Find the length of the string
    unsigned len = 0;
    while (s[len] != '\0') {
        len++;
    }
    
    // Reverse the string
    for (unsigned i = 0; i < len; i++) {
        r[i] = s[len - 1 - i];
    }
    
    // Add null terminator
    r[len] = '\0';
}

// Example usage:
int main() {
    const char *original = "Hello, World!";
    char reversed[20];  // Make sure it's big enough
    
    reverses(reversed, original);
    printf("Original: %s\nReversed: %s\n", original, reversed);
    
    return 0;
}
```

</TabItem>
</Tabs>

</details>

### ROT13 cipher (★★☆)

Write a function that implements the ROT13 cipher, which shifts each letter in a string by 13 positions in the alphabet (wrapping around if necessary). Non-alphabetic characters should remain unchanged. Use the following prototype:

```c
void rot13(char *r, const char *s);
```

Where:

- `r` is a pointer to the destination string where the encrypted string will be stored
- `s` is a pointer to the source string

It can be helpful to refer to the ASCII table for `char` operations:

![pointer operators](../c/assets/ASCII-Table-wide.svg)
<figcaption>Table of ASCII values - By <a href="//commons.wikimedia.org/wiki/File:ASCII-Table.svg" title="File:ASCII-Table.svg">ASCII-Table.svg</a>: ZZT32derivative work: Usha - <a href="//commons.wikimedia.org/wiki/File:ASCII-Table.svg" title="File:ASCII-Table.svg">ASCII-Table.svg</a>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=10388973">Link</a></figcaption>

<Spoiler>
The ROT13 cipher is its own inverse - applying it twice returns the original text. You'll need to handle both uppercase and lowercase letters separately.
</Spoiler>

<details>
<summary>Show solution</summary>

<Tabs>
<TabItem value="solution1" label="Solution 1">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

void rot13(char *r, const char *s) {
    for (int i = 0; s[i] != '\0'; i++) {
        if (isalpha(s[i])) {
            // Handle both uppercase and lowercase letters
            if (islower(s[i])) {
                // For lowercase: subtract 'a', add 13, take modulo 26, add 'a' back
                r[i] = (char)((s[i] - 'a' + 13) % 26 + 'a');
            } else if (isupper(s[i])) {
                // For uppercase: subtract 'A', add 13, take modulo 26, add 'A' back
                r[i] = (char)((s[i] - 'A' + 13) % 26 + 'A');
            }
        } else {
            // Copy non-alphabetic characters as is
            r[i] = s[i];
        }
    }
    
    // Add null terminator at the end
    r[strlen(s)] = '\0';
}

int main() {
    char s[] = "example String 1!";
    printf("Original: %s\n", s);

    // Dynamically allocate memory for the result
    char *r = (char *)malloc((strlen(s) + 1) * sizeof(char));
    if (r == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        return 1;
    }

    rot13(r, s);
    printf("Encrypted: %s\n", r);
    
    // Free allocated memory
    free(r);

    return 0;
}
```

</TabItem>

<TabItem value="solution2" label="Solution 2">

```c
void rot13(char *r, const char *s) {
    int i = 0;
    while (s[i] != '\0') {
        char c = s[i];
        if ('a' <= c && c <= 'z') {
            r[i] = 'a' + ((c - 'a' + 13) % 26);
        } else if ('A' <= c && c <= 'Z') {
            r[i] = 'A' + ((c - 'A' + 13) % 26);
        } else {
            r[i] = c; // Not a letter, copy as is
        }
        i++;
    }
    r[i] = '\0'; // Add null terminator
}

// Example usage:
int main() {
    const char *original = "Hello, World!";
    char encrypted[20];
    char decrypted[20];
    
    rot13(encrypted, original);
    rot13(decrypted, encrypted);  // Applying ROT13 twice gets the original text
    
    printf("Original: %s\nEncrypted: %s\nDecrypted: %s\n", 
           original, encrypted, decrypted);
    
    return 0;
}
```

</TabItem>
</Tabs>

</details>

### Finding a value in an array (★☆☆)

Write a function that finds the position of a specific value in an integer array, using the following prototype:

```c
long findi(int t, const int *values, unsigned size);
```

Where:

- `t` is the value to search for
- `values` is a pointer to the array
- `size` is the size of the array
- The function should return the index of the first occurrence of the value, or -1 if not found

<details>
<summary>Show solution</summary>

```c
long findi(int t, const int *values, unsigned size) {
    for (unsigned i = 0; i < size; i++) {
        if (values[i] == t) {
            return i;
        }
    }
    return -1; // Not found
}

// Example usage:
int main() {
    int array[] = {10, 20, 30, 40, 50, 30, 60};
    unsigned size = 7;
    
    printf("Position of 30: %ld\n", findi(30, array, size));  // Should print 2
    printf("Position of 35: %ld\n", findi(35, array, size));  // Should print -1
    
    return 0;
}
```

</details>

### Capitalizing words in a string (★★☆)

Write a function that converts a string so that the first letter of each word is capitalized and all other letters are lowercase. Use the following prototype:

```c
void capitalize(char *r, const char *s);
```

Where:

- `r` is a pointer to the destination string where the capitalized string will be stored
- `s` is a pointer to the source string

<Spoiler>
You'll need to keep track of whether the next character should be capitalized (i.e., after a space or at the beginning of the string).
</Spoiler>

<details>
<summary>Show solution</summary>

```c
void capitalize(char *r, const char *s) {
    int i = 0;
    int capitalize_next = 1; // Start with capitalizing the first letter
    
    while (s[i] != '\0') {
        if (s[i] == ' ') {
            r[i] = ' ';
            capitalize_next = 1;
        } else if (capitalize_next && 'a' <= s[i] && s[i] <= 'z') {
            // Convert lowercase to uppercase if it comes after a space
            r[i] = s[i] - 'a' + 'A';
            capitalize_next = 0;
        } else if (!capitalize_next && 'A' <= s[i] && s[i] <= 'Z') {
            // Convert uppercase to lowercase otherwise
            r[i] = s[i] - 'A' + 'a';
            capitalize_next = 0;
        } else {
            // Keep as is for non-alphabetic characters
            r[i] = s[i];
            capitalize_next = 0;
        }
        i++;
    }
    r[i] = '\0'; // Add null terminator
}

// Example usage:
int main() {
    const char *original = "hello WORLD how ARE you";
    char capitalized[50];
    
    capitalize(capitalized, original);
    printf("Original: %s\nCapitalized: %s\n", original, capitalized);
    
    return 0;
}
```

</details>

### Counting letter frequencies (★★☆)

Write a function that counts the frequency of each letter (case-insensitive) in a string and stores the results in an array. Use the following prototype:

```c
void freqs(unsigned *r, const char *s);
```

Where:

- `r` is a pointer to an array of size 26, where each element will store the count of a letter (r[0] for 'a'/'A', r[1] for 'b'/'B', etc.)
- `s` is a pointer to the source string

<details>
<summary>Show solution</summary>

```c
void freqs(unsigned *r, const char *s) {
    // Initialize frequency array to 0
    for (int i = 0; i < 26; i++) {
        r[i] = 0;
    }
    
    // Count frequencies
    int i = 0;
    while (s[i] != '\0') {
        if ('a' <= s[i] && s[i] <= 'z') {
            r[s[i] - 'a']++;
        } else if ('A' <= s[i] && s[i] <= 'Z') {
            r[s[i] - 'A']++;
        }
        i++;
    }
}

// Example usage:
int main() {
    const char *text = "Hello, World!";
    unsigned frequencies[26] = {0}; // All initialized to 0
    
    freqs(frequencies, text);
    
    printf("Letter frequencies in '%s':\n", text);
    for (int i = 0; i < 26; i++) {
        if (frequencies[i] > 0) {
            printf("%c: %u\n", 'a' + i, frequencies[i]);
        }
    }
    
    return 0;
}
```

</details>

### Merging sorted arrays (★★☆)

Write a function that merges two sorted integer arrays into a single sorted array. Use the following prototype:

```c
void merge(int *r, const int *a1, unsigned s1, const int *a2, unsigned s2);
```

Where:

- `r` is a pointer to the destination array where the merged result will be stored
- `a1` is a pointer to the first sorted array
- `s1` is the size of the first array
- `a2` is a pointer to the second sorted array
- `s2` is the size of the second array

<Spoiler>
This is similar to the "merge" part of the merge sort algorithm. Keep track of the position in each array and always choose the smaller element.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
void merge(int *r, const int *a1, unsigned s1, const int *a2, unsigned s2) {
    unsigned i = 0, j = 0, k = 0;
    
    // Merge arrays
    while (i < s1 && j < s2) {
        if (a1[i] <= a2[j]) {
            r[k++] = a1[i++];
        } else {
            r[k++] = a2[j++];
        }
    }
    
    // Copy remaining elements of a1
    while (i < s1) {
        r[k++] = a1[i++];
    }
    
    // Copy remaining elements of a2
    while (j < s2) {
        r[k++] = a2[j++];
    }
}

// Example usage:
int main() {
    int array1[] = {1, 3, 5, 7, 9};
    int array2[] = {2, 4, 6, 8, 10};
    unsigned size1 = 5, size2 = 5;
    int merged[10];
    
    merge(merged, array1, size1, array2, size2);
    
    printf("Merged array: ");
    for (unsigned i = 0; i < size1 + size2; i++) {
        printf("%d ", merged[i]);
    }
    
    return 0;
}
```

</details>

### Generating Fibonacci sequence (★☆☆)

Write a function that generates the first n numbers in the Fibonacci sequence. Use the following prototype:

```c
void fibonacci(unsigned *r, unsigned n);
```

Where:

- `r` is a pointer to the destination array where the sequence will be stored
- `n` is the number of elements to generate

<Spoiler>
Remember that the Fibonacci sequence starts with 0, 1, and each subsequent number is the sum of the two preceding ones.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
void fibonacci(unsigned *r, unsigned n) {
    if (n >= 1) {
        r[0] = 0;
    }
    if (n >= 2) {
        r[1] = 1;
    }
    
    for (unsigned i = 2; i < n; i++) {
        r[i] = r[i-1] + r[i-2];
    }
}

// Example usage:
int main() {
    unsigned fib[10];
    unsigned n = 10;
    
    fibonacci(fib, n);
    
    printf("First %u Fibonacci numbers: ", n);
    for (unsigned i = 0; i < n; i++) {
        printf("%u ", fib[i]);
    }
    
    return 0;
}
```

</details>

## String Manipulation with Pointers

### String length (★☆☆)

Implement your own version of the `strlen` function that calculates the length of a string using pointers. Your function should have this prototype:

```c
unsigned my_strlen(const char *str);
```

<Spoiler>
`\0` is the character that terminates strings.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
unsigned my_strlen(const char *str) {
    const char *p = str;
    
    // Move pointer until null terminator is found
    while (*p != '\0') {
        p++;
    }
    
    // Calculate the distance between the pointers
    return (unsigned)(p - str);
}
```

</details>

### String copy (★★☆)

Implement your own version of the `strcpy` function that copies a string to another location using pointers. Your function should have this prototype:

```c
char *my_strcpy(char *dest, const char *src);
```

<Spoiler>
Remember to save the original destination pointer before modifying it, as you need to return this pointer at the end of the function.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
char *my_strcpy(char *dest, const char *src) {
    char *original_dest = dest;
    
    // Copy each character until null terminator
    while (*src != '\0') {
        *dest = *src;
        dest++;
        src++;
    }
    
    // Add null terminator
    *dest = '\0';
    
    // Return pointer to the start of destination
    return original_dest;
}
```

Another solution using post-increment:

```c
char *my_strcpy(char *dest, const char *src) {
    char *original_dest = dest;
    
    while ((*dest++ = *src++) != '\0')
        ;
    
    return original_dest;
}
```

</details>

### String concatenation (★★☆)

Implement your own version of the `strcat` function that concatenates two strings using pointers. Your function should have this prototype:

```c
char *my_strcat(char *dest, const char *src);
```

<details>
<summary>Show solution</summary>

```c
char *my_strcat(char *dest, const char *src) {
    char *original_dest = dest;
    
    // Move to the end of dest
    while (*dest != '\0') {
        dest++;
    }
    
    // Copy src to the end of dest
    while (*src != '\0') {
        *dest = *src;
        dest++;
        src++;
    }
    
    // Add null terminator
    *dest = '\0';
    
    return original_dest;
}
```

</details>

## Memory Allocation Exercises

Let's revisit some of our previous exercises with a different approach - now we'll dynamically allocate memory for the results inside the functions instead of using pre-allocated arrays.

### Dynamic Array Reversal (★★☆)

Implement a function that reverses an array of integers but dynamically allocates memory for the result. The function should have this prototype:

```c
int* reversei(const int *values, unsigned size);
```

Where:

- `values` is a pointer to the input array
- `size` is the size of the array
- The function returns a pointer to the dynamically allocated reversed array (or NULL if allocation fails)

<Spoiler>
Remember to handle memory allocation failures by returning NULL, and the caller will be responsible for freeing the memory.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>

int* reversei(const int *values, unsigned size) {
    // Allocate memory for reversed array
    int *result = (int *)malloc(size * sizeof(int));
    if (result == NULL) {
        return NULL; // Memory allocation failed
    }
    
    // Reverse the array
    for (unsigned i = 0; i < size; i++) {
        result[i] = values[size - 1 - i];
    }
    
    return result;
}

// Example usage:
int main() {
    int original[] = {1, 2, 3, 4, 5};
    unsigned size = 5;
    
    int *reversed = reversei(original, size);
    if (reversed == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    printf("Original array: ");
    for (unsigned i = 0; i < size; i++) {
        printf("%d ", original[i]);
    }
    
    printf("\nReversed array: ");
    for (unsigned i = 0; i < size; i++) {
        printf("%d ", reversed[i]);
    }
    printf("\n");
    
    // Don't forget to free the dynamically allocated memory
    free(reversed);
    
    return 0;
}
```

</details>

### Dynamic String Reversal (★★☆)

Implement a function that reverses a C string and dynamically allocates memory for the result. The function should use a double pointer to return the result. Use this prototype:

```c
void reverses(char **r, const char *s);
```

Where:

- `r` is a pointer to a pointer where the reversed string will be stored (set to NULL in case of allocation failure)
- `s` is a pointer to the input string

<Spoiler>
First calculate the length of the input string to allocate the correct amount of memory. Make sure to set `*r = NULL` if allocation fails.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void reverses(char **r, const char *s) {
    if (s == NULL || r == NULL) {
        if (r != NULL) {
            *r = NULL; // Set to NULL in case of invalid input
        }
        return;
    }
    
    // Find the length of the string
    size_t len = strlen(s);
    
    // Allocate memory for reversed string (including null terminator)
    *r = (char *)malloc((len + 1) * sizeof(char));
    if (*r == NULL) {
        return; // Memory allocation failed
    }
    
    // Reverse the string
    for (size_t i = 0; i < len; i++) {
        (*r)[i] = s[len - 1 - i];
    }
    
    // Add null terminator
    (*r)[len] = '\0';
}

// Example usage:
int main() {
    const char *original = "Hello, World!";
    char *reversed = NULL;
    
    reverses(&reversed, original);
    if (reversed == NULL) {
        printf("Memory allocation failed or invalid input!\n");
        return 1;
    }
    
    printf("Original: %s\n", original);
    printf("Reversed: %s\n", reversed);
    
    // Free dynamically allocated memory
    free(reversed);
    
    return 0;
}
```

</details>

### Dynamic Array Merging (★★★)

Implement a function that merges two sorted integer arrays into a single dynamically allocated sorted array. The function should handle duplicates and use a double pointer to return the result. Use this prototype:

```c
void merge(int **r, const int *a1, unsigned s1, const int *a2, unsigned s2);
```

Where:

- `r` is a pointer to a pointer where the merged array will be stored (set to NULL in case of allocation failure)
- `a1` is a pointer to the first sorted array
- `s1` is the size of the first array
- `a2` is a pointer to the second sorted array
- `s2` is the size of the second array

<Spoiler>
Since the arrays may contain duplicates, the result may have up to `s1 + s2` elements. Start by allocating memory of this size, then perform the merge operation as in the earlier exercise.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>

void merge(int **r, const int *a1, unsigned s1, const int *a2, unsigned s2) {
    // Check input validity
    if (r == NULL) {
        return;
    }
    
    // Handle empty input cases
    if (a1 == NULL && a2 == NULL) {
        *r = NULL;
        return;
    }
    
    // Allocate memory for merged array (maximum possible size)
    *r = (int *)malloc((s1 + s2) * sizeof(int));
    if (*r == NULL) {
        return; // Memory allocation failed
    }
    
    unsigned i = 0, j = 0, k = 0;
    
    // Merge arrays
    while (i < s1 && j < s2) {
        if (a1[i] <= a2[j]) {
            (*r)[k++] = a1[i++];
        } else {
            (*r)[k++] = a2[j++];
        }
    }
    
    // Copy remaining elements of a1
    while (i < s1) {
        (*r)[k++] = a1[i++];
    }
    
    // Copy remaining elements of a2
    while (j < s2) {
        (*r)[k++] = a2[j++];
    }
    
    // Note: k now contains the actual size of the merged array
    // We could resize the array to save memory if needed:
    // *r = realloc(*r, k * sizeof(int));
    // But this is optional and might fail, so we're keeping it simple.
}

// Example usage:
int main() {
    int array1[] = {1, 3, 5, 7, 9};
    int array2[] = {2, 4, 6, 8, 10};
    unsigned size1 = 5, size2 = 5;
    int *merged = NULL;
    
    merge(&merged, array1, size1, array2, size2);
    if (merged == NULL) {
        printf("Memory allocation failed or invalid input!\n");
        return 1;
    }
    
    printf("First array: ");
    for (unsigned i = 0; i < size1; i++) {
        printf("%d ", array1[i]);
    }
    
    printf("\nSecond array: ");
    for (unsigned i = 0; i < size2; i++) {
        printf("%d ", array2[i]);
    }
    
    printf("\nMerged array: ");
    for (unsigned i = 0; i < size1 + size2; i++) {
        printf("%d ", merged[i]);
    }
    printf("\n");
    
    // Free dynamically allocated memory
    free(merged);
    
    return 0;
}
```

</details>

### Dynamic String Concatenation (★★☆)

Write a function that concatenates two strings and returns the result in dynamically allocated memory. Use this prototype:

```c
char* concat_strings(const char *s1, const char *s2);
```

Where:

- `s1` and `s2` are the input strings to concatenate
- The function returns a pointer to the dynamically allocated concatenated string, or NULL if allocation fails

<Spoiler>
Calculate the total length needed (length of s1 + length of s2 + 1 for null terminator), then allocate memory and copy both strings in sequence.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* concat_strings(const char *s1, const char *s2) {
    // Handle NULL inputs
    if (s1 == NULL) s1 = "";
    if (s2 == NULL) s2 = "";
    
    // Calculate required length
    size_t len1 = strlen(s1);
    size_t len2 = strlen(s2);
    
    // Allocate memory for concatenated string (including null terminator)
    char *result = (char *)malloc((len1 + len2 + 1) * sizeof(char));
    if (result == NULL) {
        return NULL; // Memory allocation failed
    }
    
    // Copy first string
    strcpy(result, s1);
    
    // Append second string
    strcat(result, s2);
    
    return result;
}

// Example usage:
int main() {
    const char *str1 = "Hello, ";
    const char *str2 = "World!";
    
    char *concatenated = concat_strings(str1, str2);
    if (concatenated == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    printf("String 1: \"%s\"\n", str1);
    printf("String 2: \"%s\"\n", str2);
    printf("Concatenated: \"%s\"\n", concatenated);
    
    // Free dynamically allocated memory
    free(concatenated);
    
    return 0;
}
```

</details>

### Dynamic array (★★☆)

Write a program that:

1. Asks the user for the size of an array
2. Dynamically allocates an array of integers of that size
3. Fills the array with values entered by the user
4. Calculates and prints the sum of all elements
5. Properly frees the memory before exiting

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int size;
    int *array;
    int sum = 0;
    
    // Get the size from the user
    printf("Enter the size of the array: ");
    scanf("%d", &size);
    
    // Allocate memory
    array = (int *)malloc(size * sizeof(int));
    if (array == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    // Get values from the user
    printf("Enter %d integers:\n", size);
    for (int i = 0; i < size; i++) {
        scanf("%d", &array[i]);
        sum += array[i];
    }
    
    // Print the sum
    printf("Sum of all elements: %d\n", sum);
    
    // Free the memory
    free(array);
    
    return 0;
}
```

</details>

### Dynamic 2D array (★★★)

Write a function that creates a dynamic 2D array (matrix) with the specified number of rows and columns. Then write another function to free this matrix. Use these prototypes:

```c
int **create_matrix(int rows, int cols);
void free_matrix(int **matrix, int rows);
```

<Spoiler>
For a 2D array, you need to allocate memory twice: first for the array of row pointers, then for each individual row. Make sure to handle memory allocation failures properly.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>

int **create_matrix(int rows, int cols) {
    // Allocate array of pointers (rows)
    int **matrix = (int **)malloc(rows * sizeof(int *));
    if (matrix == NULL) {
        return NULL;
    }
    
    // Allocate each row
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int *)malloc(cols * sizeof(int));
        if (matrix[i] == NULL) {
            // Free previously allocated rows
            for (int j = 0; j < i; j++) {
                free(matrix[j]);
            }
            free(matrix);
            return NULL;
        }
    }
    
    return matrix;
}

void free_matrix(int **matrix, int rows) {
    // Free each row
    for (int i = 0; i < rows; i++) {
        free(matrix[i]);
    }
    // Free the array of pointers
    free(matrix);
}

// Example usage:
int main() {
    int rows = 3, cols = 4;
    
    // Create matrix
    int **matrix = create_matrix(rows, cols);
    if (matrix == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    // Initialize matrix with values
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = i * cols + j;
        }
    }
    
    // Print matrix
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%2d ", matrix[i][j]);
        }
        printf("\n");
    }
    
    // Free memory
    free_matrix(matrix, rows);
    
    return 0;
}
```

</details>

### Resizing arrays with realloc (★★★)

Write a program that:

1. Allocates memory for an array of 5 integers
2. Fills the array with values
3. Uses `realloc()` to expand the array to hold 10 integers
4. Fills the additional elements
5. Prints all elements
6. Frees the memory

<Spoiler>
When using `realloc()`, remember that it might return a new pointer. Always assign the result to a temporary variable first to avoid losing the original pointer if allocation fails.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *array;
    int original_size = 5;
    int new_size = 10;
    
    // Allocate memory for 5 integers
    array = (int *)malloc(original_size * sizeof(int));
    if (array == NULL) {
        printf("Initial memory allocation failed!\n");
        return 1;
    }
    
    // Fill the first 5 elements
    printf("Filling the first %d elements:\n", original_size);
    for (int i = 0; i < original_size; i++) {
        array[i] = i * 10;
        printf("array[%d] = %d\n", i, array[i]);
    }
    
    // Resize the array to hold 10 integers
    int *new_array = (int *)realloc(array, new_size * sizeof(int));
    if (new_array == NULL) {
        printf("Memory reallocation failed!\n");
        free(array);
        return 1;
    }
    array = new_array;
    
    // Fill the additional elements
    printf("\nFilling the additional %d elements:\n", new_size - original_size);
    for (int i = original_size; i < new_size; i++) {
        array[i] = i * 10;
        printf("array[%d] = %d\n", i, array[i]);
    }
    
    // Print all elements
    printf("\nAll elements after reallocation:\n");
    for (int i = 0; i < new_size; i++) {
        printf("array[%d] = %d\n", i, array[i]);
    }
    
    // Free memory
    free(array);
    
    return 0;
}
```

</details>

## Advanced Pointer Exercises

### Function pointers (★★★)

Write a program that uses function pointers to perform different operations (add, subtract, multiply, divide) on two numbers. The user should be able to choose which operation to perform.

<Spoiler>
A function pointer has the syntax: `return_type (*pointer_name)(parameter_types)`. You can create an array of function pointers to easily select different operations.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>

// Define operation functions
float add(float a, float b) { return a + b; }
float subtract(float a, float b) { return a - b; }
float multiply(float a, float b) { return a * b; }
float divide(float a, float b) { return b != 0 ? a / b : 0; }

int main() {
    // Array of function pointers
    float (*operations[4])(float, float) = {add, subtract, multiply, divide};
    char *op_names[4] = {"Addition", "Subtraction", "Multiplication", "Division"};
    
    float a, b;
    int choice;
    
    // Get input
    printf("Enter two numbers: ");
    scanf("%f %f", &a, &b);
    
    // Display menu
    printf("\nSelect operation:\n");
    printf("1. Addition\n");
    printf("2. Subtraction\n");
    printf("3. Multiplication\n");
    printf("4. Division\n");
    printf("Choice: ");
    scanf("%d", &choice);
    
    // Validate choice
    if (choice < 1 || choice > 4) {
        printf("Invalid choice!\n");
        return 1;
    }
    
    // Perform calculation using function pointer
    float result = operations[choice-1](a, b);
    printf("\n%s of %.2f and %.2f is %.2f\n", 
           op_names[choice-1], a, b, result);
    
    return 0;
}
```

</details>

### Double pointer to modify a pointer (★★★)

Write a function that takes a double pointer to an integer and allocates memory for a new integer value. The function should set this new memory to a value passed as a parameter.

```c
void allocate_and_set(int **ptr, int value);
```

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>

void allocate_and_set(int **ptr, int value) {
    // Allocate new memory
    *ptr = (int *)malloc(sizeof(int));
    
    // Check if allocation was successful
    if (*ptr != NULL) {
        // Set the value
        **ptr = value;
    }
}

int main() {
    int *p = NULL;
    
    // Call function to allocate memory and set value
    allocate_and_set(&p, 42);
    
    // Check if allocation was successful
    if (p != NULL) {
        printf("Value: %d\n", *p);
        free(p);  // Don't forget to free the memory
    } else {
        printf("Memory allocation failed!\n");
    }
    
    return 0;
}
```

</details>

---

These exercises will help you master pointers and memory allocation in C, from basic concepts to advanced applications. Try to solve them on your own before looking at the solutions, and don't hesitate to experiment with variations.
