---
sidebar_position: 18
id: exercises_4
title: Exercises (Part 4)
hide_title: false
hide_table_of_contents: false
sidebar_label: EXERCISES 2
description: Exercises on data structures, strings, and matrices.
slug: /c/exercises_4
custom_edit_url: null
---

import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Spoiler from '@site/src/components/Spoiler';

:::info
This is the second part (or fourth in total) of the C exercises. For previous exercises, refer to:
- For basic programming: C++ exercises [Part 1](/docs/cpp/exercises_1) and [Part 2](/docs/cpp/exercises_2)
- For pointers and memory allocation: C exercises [Part 3](/docs/c/exercises_3)
:::

In this section, you'll find exercises on more advanced topics in C, including data structures, string manipulation, and matrices. Each exercise has a difficulty rating from 1 to 3 stars, but again, this is subjective and might not reflect your personal experience.

## Data Structures Exercises

These exercises focus on using structures (structs) to create more complex data types.

### Array Statistics (★★☆)

Implement a function to calculate the minimum, maximum, mean, and variance of values in an array. The function should use the following prototype:

```c
typedef struct array_info {
    int max;
    int min;
    float mean;
    float variance;
} array_info_t;

array_info_t array_stats(const int *values, unsigned size);
```

Where:
- `array_info_t` is the struct that stores the array information
- `values` is a pointer to the array
- `size` is the size of the array

<Spoiler>
Calculate all the statistics in a single pass through the array for the min, max, and mean. Then make a second pass to calculate the variance using the computed mean.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>

typedef struct array_info {
    int max;
    int min;
    float mean;
    float variance;
} array_info_t;

array_info_t array_stats(const int *values, unsigned size) {
    array_info_t result;
    
    // Initialize min and max with the first value
    result.min = values[0];
    result.max = values[0];
    
    // Calculate sum for mean
    float sum = 0;
    for (unsigned i = 0; i < size; i++) {
        // Update min and max
        if (values[i] < result.min) {
            result.min = values[i];
        }
        if (values[i] > result.max) {
            result.max = values[i];
        }
        
        // Add to sum for mean calculation
        sum += values[i];
    }
    
    // Calculate mean
    result.mean = sum / size;
    
    // Calculate variance
    float sum_squared_diff = 0;
    for (unsigned i = 0; i < size; i++) {
        float diff = values[i] - result.mean;
        sum_squared_diff += diff * diff;
    }
    result.variance = sum_squared_diff / size;
    
    return result;
}

int main() {
    int values[] = {4, 7, 2, 8, 1, 9, 5};
    unsigned size = sizeof(values) / sizeof(values[0]);
    
    array_info_t stats = array_stats(values, size);
    
    printf("Array statistics:\n");
    printf("Min: %d\n", stats.min);
    printf("Max: %d\n", stats.max);
    printf("Mean: %.2f\n", stats.mean);
    printf("Variance: %.2f\n", stats.variance);
    
    return 0;
}
```

</details>

### Array Statistics Variants (★★☆)

Implement the following variants of the array statistics function with different parameter approaches:

#### Variant 1 - Output Parameter

```c
void array_stats(array_info_t *r, const int *values, unsigned size);
```

Where:
- `r` is a pointer to the structure where the calculated values will be stored

<details>
<summary>Show solution</summary>

```c
void array_stats(array_info_t *r, const int *values, unsigned size) {
    // Initialize min and max with the first value
    r->min = values[0];
    r->max = values[0];
    
    // Calculate sum for mean
    float sum = 0;
    for (unsigned i = 0; i < size; i++) {
        // Update min and max
        if (values[i] < r->min) {
            r->min = values[i];
        }
        if (values[i] > r->max) {
            r->max = values[i];
        }
        
        // Add to sum for mean calculation
        sum += values[i];
    }
    
    // Calculate mean
    r->mean = sum / size;
    
    // Calculate variance
    float sum_squared_diff = 0;
    for (unsigned i = 0; i < size; i++) {
        float diff = values[i] - r->mean;
        sum_squared_diff += diff * diff;
    }
    r->variance = sum_squared_diff / size;
}
```

</details>

#### Variant 2 - Dynamic Allocation

```c
array_info_t *array_stats(const int *values, unsigned size);
```

Where:
- The function returns a pointer to a dynamically allocated structure containing the results, or NULL in case of error.

<details>
<summary>Show solution</summary>

```c
#include <stdlib.h>

array_info_t *array_stats(const int *values, unsigned size) {
    // Allocate memory for the result structure
    array_info_t *r = (array_info_t *)malloc(sizeof(array_info_t));
    if (r == NULL) {
        return NULL; // Memory allocation failed
    }
    
    // Initialize min and max with the first value
    r->min = values[0];
    r->max = values[0];
    
    // Calculate sum for mean
    float sum = 0;
    for (unsigned i = 0; i < size; i++) {
        // Update min and max
        if (values[i] < r->min) {
            r->min = values[i];
        }
        if (values[i] > r->max) {
            r->max = values[i];
        }
        
        // Add to sum for mean calculation
        sum += values[i];
    }
    
    // Calculate mean
    r->mean = sum / size;
    
    // Calculate variance
    float sum_squared_diff = 0;
    for (unsigned i = 0; i < size; i++) {
        float diff = values[i] - r->mean;
        sum_squared_diff += diff * diff;
    }
    r->variance = sum_squared_diff / size;
    
    return r;
}

// Example usage:
int main() {
    int values[] = {4, 7, 2, 8, 1, 9, 5};
    unsigned size = sizeof(values) / sizeof(values[0]);
    
    array_info_t *stats = array_stats(values, size);
    if (stats == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    printf("Array statistics:\n");
    printf("Min: %d\n", stats->min);
    printf("Max: %d\n", stats->max);
    printf("Mean: %.2f\n", stats->mean);
    printf("Variance: %.2f\n", stats->variance);
    
    // Free allocated memory
    free(stats);
    
    return 0;
}
```

</details>

#### Variant 3 - Double Pointer

```c
void array_stats(array_info_t **r, const int *values, unsigned size);
```

Where:
- `r` is a pointer to a pointer to the structure, which will be dynamically allocated within the function. It will be set to NULL in case of error.

<details>
<summary>Show solution</summary>

```c
#include <stdlib.h>

void array_stats(array_info_t **r, const int *values, unsigned size) {
    // Allocate memory for the result structure
    *r = (array_info_t *)malloc(sizeof(array_info_t));
    if (*r == NULL) {
        return; // Memory allocation failed
    }
    
    // Initialize min and max with the first value
    (*r)->min = values[0];
    (*r)->max = values[0];
    
    // Calculate sum for mean
    float sum = 0;
    for (unsigned i = 0; i < size; i++) {
        // Update min and max
        if (values[i] < (*r)->min) {
            (*r)->min = values[i];
        }
        if (values[i] > (*r)->max) {
            (*r)->max = values[i];
        }
        
        // Add to sum for mean calculation
        sum += values[i];
    }
    
    // Calculate mean
    (*r)->mean = sum / size;
    
    // Calculate variance
    float sum_squared_diff = 0;
    for (unsigned i = 0; i < size; i++) {
        float diff = values[i] - (*r)->mean;
        sum_squared_diff += diff * diff;
    }
    (*r)->variance = sum_squared_diff / size;
}

// Example usage:
int main() {
    int values[] = {4, 7, 2, 8, 1, 9, 5};
    unsigned size = sizeof(values) / sizeof(values[0]);
    
    array_info_t *stats = NULL;
    array_stats(&stats, values, size);
    
    if (stats == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    printf("Array statistics:\n");
    printf("Min: %d\n", stats->min);
    printf("Max: %d\n", stats->max);
    printf("Mean: %.2f\n", stats->mean);
    printf("Variance: %.2f\n", stats->variance);
    
    // Free allocated memory
    free(stats);
    
    return 0;
}
```

</details>

### Merging Sorted Arrays with Structures (★★★)

Implement a function that merges two sorted arrays of integers into a third array, where the arrays are managed using a structure. The function should have the following prototype:

```c
typedef struct int_array {
    int *p;
    unsigned size;
} int_array_t;

void merge(int_array_t **r, const int_array_t *a1, const int_array_t *a2);
```

Where:
- `int_array_t` is the structure for managing an integer array
- `r` is a pointer to the structure that will manage the resulting array
- `a1` is a pointer to the structure managing the first input array
- `a2` is a pointer to the structure managing the second input array

<Spoiler>
First allocate memory for the result structure, then allocate memory for the merged array of size a1->size + a2->size. Use a similar merging algorithm as in previous exercises but with structure members.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct int_array {
    int *p;
    unsigned size;
} int_array_t;

void merge(int_array_t **r, const int_array_t *a1, const int_array_t *a2) {
    // Allocate memory for the result structure
    *r = (int_array_t *)malloc(sizeof(int_array_t));
    if (*r == NULL) {
        return; // Memory allocation failed
    }
    
    // Set the size of the result array
    (*r)->size = a1->size + a2->size;
    
    // Allocate memory for the merged array
    (*r)->p = (int *)malloc((*r)->size * sizeof(int));
    if ((*r)->p == NULL) {
        free(*r); // Free the structure if array allocation fails
        *r = NULL;
        return;
    }
    
    unsigned i = 0, j = 0, k = 0;
    
    // Merge arrays
    while (i < a1->size && j < a2->size) {
        if (a1->p[i] <= a2->p[j]) {
            (*r)->p[k++] = a1->p[i++];
        } else {
            (*r)->p[k++] = a2->p[j++];
        }
    }
    
    // Copy remaining elements of a1
    while (i < a1->size) {
        (*r)->p[k++] = a1->p[i++];
    }
    
    // Copy remaining elements of a2
    while (j < a2->size) {
        (*r)->p[k++] = a2->p[j++];
    }
}

int main() {
    // Create and initialize first array
    int_array_t a1;
    a1.size = 5;
    a1.p = (int *)malloc(a1.size * sizeof(int));
    for (unsigned i = 0; i < a1.size; i++) {
        a1.p[i] = i * 2; // Even numbers: 0, 2, 4, 6, 8
    }
    
    // Create and initialize second array
    int_array_t a2;
    a2.size = 5;
    a2.p = (int *)malloc(a2.size * sizeof(int));
    for (unsigned i = 0; i < a2.size; i++) {
        a2.p[i] = i * 2 + 1; // Odd numbers: 1, 3, 5, 7, 9
    }
    
    // Merge arrays
    int_array_t *result = NULL;
    merge(&result, &a1, &a2);
    
    if (result == NULL) {
        printf("Memory allocation failed!\n");
        free(a1.p);
        free(a2.p);
        return 1;
    }
    
    // Print merged array
    printf("Merged array: ");
    for (unsigned i = 0; i < result->size; i++) {
        printf("%d ", result->p[i]);
    }
    printf("\n");
    
    // Free all allocated memory
    free(a1.p);
    free(a2.p);
    free(result->p);
    free(result);
    
    return 0;
}
```

</details>

### Computing Polygon Area (★★★)

Implement a function to calculate the area of an irregular polygon given the coordinates of its vertices. Use the shoelace formula:

$$
A = \frac{1}{2} \left| \sum_{i=1}^{n} (x_i y_{i+1} - x_{i+1} y_i) \right|
$$

where $x_{n+1}$ and $y_{n+1}$ are to be understood as modulo $n$, so $x_1$ and $y_1$.

The function should have the following prototype:

```c
typedef struct point {
    float x;
    float y;
} point_t;

typedef struct polygon {
    unsigned n;
    point_t *vertices;
} polygon_t;

float compute_area(const polygon_t *p);
```

Where:
- `point_t` represents a point on the plane with $x$ and $y$ coordinates
- `polygon_t` represents a polygon with $n$ vertices
- `compute_area` calculates the area of the polygon

<Spoiler>
The shoelace formula requires you to iterate through each vertex and its next vertex (wrapping around to the first vertex after the last). For each pair, compute (x₁×y₂ - x₂×y₁) and sum these values. The absolute value of half this sum is the area.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

typedef struct point {
    float x;
    float y;
} point_t;

typedef struct polygon {
    unsigned n;
    point_t *vertices;
} polygon_t;

float compute_area(const polygon_t *p) {
    if (p == NULL || p->n < 3 || p->vertices == NULL) {
        return 0.0f; // Invalid polygon
    }
    
    float area = 0.0f;
    
    // Apply the shoelace formula
    for (unsigned i = 0; i < p->n; i++) {
        unsigned next = (i + 1) % p->n; // Next vertex, wrapping to 0 for the last one
        area += (p->vertices[i].x * p->vertices[next].y) - 
                (p->vertices[next].x * p->vertices[i].y);
    }
    
    // Take the absolute value and divide by 2
    return fabsf(area) / 2.0f;
}

int main() {
    // Create a square with vertices at (0,0), (1,0), (1,1), (0,1)
    polygon_t square;
    square.n = 4;
    square.vertices = (point_t *)malloc(square.n * sizeof(point_t));
    
    square.vertices[0].x = 0; square.vertices[0].y = 0;
    square.vertices[1].x = 1; square.vertices[1].y = 0;
    square.vertices[2].x = 1; square.vertices[2].y = 1;
    square.vertices[3].x = 0; square.vertices[3].y = 1;
    
    float area = compute_area(&square);
    printf("Area of the square: %.2f\n", area); // Should be 1.00
    
    // Create a triangle with vertices at (0,0), (1,0), (0.5,0.866)
    polygon_t triangle;
    triangle.n = 3;
    triangle.vertices = (point_t *)malloc(triangle.n * sizeof(point_t));
    
    triangle.vertices[0].x = 0; triangle.vertices[0].y = 0;
    triangle.vertices[1].x = 1; triangle.vertices[1].y = 0;
    triangle.vertices[2].x = 0.5; triangle.vertices[2].y = 0.866f;
    
    area = compute_area(&triangle);
    printf("Area of the triangle: %.2f\n", area); // Should be ~0.43
    
    // Free allocated memory
    free(square.vertices);
    free(triangle.vertices);
    
    return 0;
}
```

</details>

### String Indexing with Opaque Structure (★★★)

Implement a function that, given a C string containing a sequence of words separated by spaces, creates an index of all the words without copying them. Use an opaque structure that will be treated by users as a black box. The function should have the following prototypes:

```c
typedef struct string_index string_index_t;

string_index_t *index_string(const char *s);

void print_string(const string_index_t *st, unsigned i);

void destroy_index(string_index_t *st);
```

Where:
- `string_index_t` is an opaque structure
- `index_string` accepts the string and returns a pointer to the indexed structure
- `print_string` displays the i-th word (0-indexed)
- `destroy_index` deallocates memory used by the index structure

<Spoiler>
The opaque structure should store the original string and an array of pointers to the beginning of each word in the string. You'll need to parse the string to identify word boundaries (spaces) and store pointers to where each word begins.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// Complete definition of the opaque structure
struct string_index {
    char *original_string;  // Copy of the original string
    char **word_starts;     // Array of pointers to starts of words
    unsigned word_count;    // Number of words found
};

typedef struct string_index string_index_t;

string_index_t *index_string(const char *s) {
    if (s == NULL) {
        return NULL;
    }
    
    // Allocate the structure
    string_index_t *index = (string_index_t *)malloc(sizeof(string_index_t));
    if (index == NULL) {
        return NULL;
    }
    
    // Make a copy of the original string
    index->original_string = strdup(s);
    if (index->original_string == NULL) {
        free(index);
        return NULL;
    }
    
    // First pass: count words
    index->word_count = 0;
    int in_word = 0;
    for (const char *p = s; *p != '\0'; p++) {
        if (!isspace(*p) && !in_word) {
            in_word = 1;
            index->word_count++;
        } else if (isspace(*p)) {
            in_word = 0;
        }
    }
    
    // Allocate array for word pointers
    index->word_starts = (char **)malloc(index->word_count * sizeof(char *));
    if (index->word_starts == NULL) {
        free(index->original_string);
        free(index);
        return NULL;
    }
    
    // Second pass: store word pointers
    in_word = 0;
    unsigned word_index = 0;
    char *p = index->original_string;
    
    while (*p != '\0') {
        if (!isspace(*p) && !in_word) {
            in_word = 1;
            index->word_starts[word_index++] = p;
        } else if (isspace(*p) && in_word) {
            in_word = 0;
            *p = '\0';  // Replace space with null terminator to end the word
        }
        p++;
    }
    
    return index;
}

void print_string(const string_index_t *st, unsigned i) {
    if (st == NULL || i >= st->word_count) {
        return;
    }
    
    printf("%s\n", st->word_starts[i]);
}

void destroy_index(string_index_t *st) {
    if (st == NULL) {
        return;
    }
    
    free(st->original_string);
    free(st->word_starts);
    free(st);
}

int main() {
    const char *sentence = "This is a test sentence with multiple words";
    
    string_index_t *index = index_string(sentence);
    if (index == NULL) {
        printf("Failed to create index!\n");
        return 1;
    }
    
    printf("Words in the sentence:\n");
    for (unsigned i = 0; i < 7; i++) {  // Assuming 7 words in the sentence
        printf("Word %u: ", i);
        print_string(index, i);
    }
    
    destroy_index(index);
    
    return 0;
}
```

</details>

## String Manipulation Exercises

These exercises focus on working with strings in C.

### Suffix Comparison (★★☆)

Write a function that finds a specific substring within two strings and checks if the strings are identical from that point forward. The function should have the following prototype:

```c
int suffix_compare(const char *s1, const char *s2, const char *st);
```

Where:
- `s1` and `s2` are the two input strings
- `st` is the substring to find in both strings
- The function returns 1 if the comparison succeeds, or 0 if the strings differ or if the substring is not found in one of them

<Spoiler>
First locate the substring in both strings using `strstr()`. Then compare the strings starting from those positions using `strcmp()`.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <string.h>

int suffix_compare(const char *s1, const char *s2, const char *st) {
    // Check for NULL pointers
    if (s1 == NULL || s2 == NULL || st == NULL) {
        return 0;
    }
    
    // Find the substring in both strings
    const char *pos1 = strstr(s1, st);
    const char *pos2 = strstr(s2, st);
    
    // If the substring is not found in either string, return 0
    if (pos1 == NULL || pos2 == NULL) {
        return 0;
    }
    
    // Compare the strings from the positions where the substring was found
    return strcmp(pos1, pos2) == 0 ? 1 : 0;
}

int main() {
    const char *str1 = "Hello, World!";
    const char *str2 = "Goodbye, World!";
    const char *substr = "World";
    
    if (suffix_compare(str1, str2, substr)) {
        printf("The strings are identical after \"%s\"\n", substr);
    } else {
        printf("The strings are different after \"%s\"\n", substr);
    }
    
    const char *str3 = "Testing with suffix";
    const char *str4 = "Different testing with suffix";
    const char *substr2 = "with";
    
    if (suffix_compare(str3, str4, substr2)) {
        printf("The strings are identical after \"%s\"\n", substr2);
    } else {
        printf("The strings are different after \"%s\"\n", substr2);
    }
    
    return 0;
}
```

</details>

### Substring Extraction (★★☆)

Write a function that, given a string and a character, finds the last occurrence of the character and returns a new string containing all characters after it. The function should have the following prototype:

```c
char* mysubstring(const char *s, char symbol);
```

Where:
- `s` is the input string
- `symbol` is the character to find
- The function returns a pointer to a new dynamically allocated string containing the substring, or NULL if the character is not found or if memory allocation fails

<Spoiler>
Find the last occurrence of the character using `strrchr()`. Then allocate memory for the substring and copy the characters starting from the position after the found character.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* mysubstring(const char *s, char symbol) {
    // Check for NULL input
    if (s == NULL) {
        return NULL;
    }
    
    // Find the last occurrence of the symbol
    const char *pos = strrchr(s, symbol);
    
    // If the symbol is not found, return NULL
    if (pos == NULL) {
        return NULL;
    }
    
    // Move to the character after the symbol
    pos++;
    
    // Allocate memory for the new string
    char *result = (char *)malloc(strlen(pos) + 1); // +1 for null terminator
    if (result == NULL) {
        return NULL; // Memory allocation failed
    }
    
    // Copy the substring
    strcpy(result, pos);
    
    return result;
}

int main() {
    const char *str = "Hello, World!";
    
    // Find substring after the last 'l'
    char *substr = mysubstring(str, 'l');
    if (substr != NULL) {
        printf("Substring after last 'l': %s\n", substr);
        free(substr);
    } else {
        printf("Character not found or memory allocation failed\n");
    }
    
    // Find substring after 'W'
    substr = mysubstring(str, 'W');
    if (substr != NULL) {
        printf("Substring after 'W': %s\n", substr);
        free(substr);
    } else {
        printf("Character not found or memory allocation failed\n");
    }
    
    // Find substring after 'Z' (not in the string)
    substr = mysubstring(str, 'Z');
    if (substr != NULL) {
        printf("Substring after 'Z': %s\n", substr);
        free(substr);
    } else {
        printf("Character not found or memory allocation failed\n");
    }
    
    return 0;
}
```

</details>

### String to Numbers Conversion (★★★)

Implement a function that converts a comma-separated list of integers in a string to an array of long integers. The function should have the following prototype:

```c
int stringsplit(long **values, const char *s);
```

Where:
- `values` is a pointer to a pointer that will be set to the dynamically allocated array of numbers
- `s` is the input string containing comma-separated numbers
- The function returns the number of values successfully converted, or a negative value in case of error

<Spoiler>
First count the number of commas in the string to determine the number of values. Then allocate an array of the appropriate size. Finally, parse the string using `strtol` to convert each number.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>

int stringsplit(long **values, const char *s) {
    // Check for NULL pointers or empty string
    if (values == NULL || s == NULL || *s == '\0') {
        if (values != NULL) {
            *values = NULL;
        }
        return 0;
    }
    
    // Count commas to determine the number of values
    int count = 1; // Start with 1 (for the last value with no comma after it)
    for (const char *p = s; *p != '\0'; p++) {
        if (*p == ',') {
            count++;
        }
    }
    
    // Allocate memory for the array
    *values = (long *)malloc(count * sizeof(long));
    if (*values == NULL) {
        return -2; // Memory allocation error
    }
    
    // Make a copy of the string to avoid modifying the original
    char *str_copy = strdup(s);
    if (str_copy == NULL) {
        free(*values);
        *values = NULL;
        return -2; // Memory allocation error
    }
    
    // Parse the string and convert numbers
    char *token = strtok(str_copy, ",");
    int index = 0;
    
    while (token != NULL) {
        // Skip leading whitespace
        while (*token == ' ') {
            token++;
        }
        
        // Check if the token is empty
        if (*token == '\0') {
            free(str_copy);
            free(*values);
            *values = NULL;
            return -1; // Conversion error
        }
        
        // Convert to long
        char *endptr;
        errno = 0;
        long val = strtol(token, &endptr, 10);
        
        // Check for conversion errors
        if (errno != 0 || *endptr != '\0') {
            free(str_copy);
            free(*values);
            *values = NULL;
            return -1; // Conversion error
        }
        
        (*values)[index++] = val;
        token = strtok(NULL, ",");
    }
    
    free(str_copy);
    return count;
}

int main() {
    const char *numstr = "5,7,-10,42,0";
    long *numbers = NULL;
    
    int count = stringsplit(&numbers, numstr);
    
    if (count > 0) {
        printf("Successfully converted %d numbers:\n", count);
        for (int i = 0; i < count; i++) {
            printf("%ld ", numbers[i]);
        }
        printf("\n");
        free(numbers);
    } else if (count == 0) {
        printf("Empty string or NULL input\n");
    } else if (count == -1) {
        printf("Conversion error\n");
    } else if (count == -2) {
        printf("Memory allocation error\n");
    }
    
    return 0;
}
```

</details>

### Matrix String Conversion (★★★)

Write a function that converts a string representation of a matrix (tab-separated columns, newline-separated rows) into a matrix of integers. The function should have the following prototype:

```c
int convert_matrix(unsigned rows_num, unsigned cols_num, int r[][cols_num], const char *s);
```

Where:
- `rows_num` and `cols_num` are the expected dimensions of the matrix
- `r` is the pre-allocated matrix where the converted values will be stored
- `s` is the input string
- The function returns 1 if the conversion succeeds, 0 otherwise

<Spoiler>
Parse the string character by character, keeping track of the current row and column. Use `strtol` to convert numbers as you encounter them. Verify that the matrix dimensions match what's expected.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int convert_matrix(unsigned rows_num, unsigned cols_num, int r[][cols_num], const char *s) {
    if (s == NULL || r == NULL || rows_num == 0 || cols_num == 0) {
        return 0;
    }
    
    const char *p = s;
    char *endptr;
    unsigned row = 0, col = 0;
    
    while (*p != '\0') {
        // Skip whitespace
        while (*p == ' ') {
            p++;
        }
        
        // Check for end of string
        if (*p == '\0') {
            break;
        }
        
        // Convert number
        long val = strtol(p, &endptr, 10);
        
        // Check for conversion errors
        if (p == endptr) {
            // Not a number
            if (*p == '\t') {
                // Skip tab and move to next column
                col++;
                p++;
            } else if (*p == '\n') {
                // Skip newline and move to next row
                row++;
                col = 0;
                p++;
            } else {
                // Invalid character
                return 0;
            }
        } else {
            // Valid number
            if (row >= rows_num || col >= cols_num) {
                // Matrix dimensions exceeded
                return 0;
            }
            
            // Store the value
            r[row][col] = (int)val;
            
            // Move to next column
            col++;
            p = endptr;
            
            // Skip any whitespace
            while (*p == ' ') {
                p++;
            }
            
            // Check for delimiter
            if (*p == '\t') {
                p++; // Skip tab
            } else if (*p == '\n') {
                row++;
                col = 0;
                p++; // Skip newline
            }
        }
    }
    
    // Check if we processed the entire matrix
    return (row == rows_num - 1 && col == cols_num) || (row == rows_num && col == 0);
}

int main() {
    const char *matstr = "1\t2\t3\n4\t5\t6\n7\t8\t9";
    unsigned rows = 3;
    unsigned cols = 3;
    int matrix[3][3];
    
    if (convert_matrix(rows, cols, matrix, matstr)) {
        printf("Successfully converted matrix:\n");
        for (unsigned i = 0; i < rows; i++) {
            for (unsigned j = 0; j < cols; j++) {
                printf("%d\t", matrix[i][j]);
            }
            printf("\n");
        }
    } else {
        printf("Conversion failed\n");
    }
    
    return 0;
}
```

</details>

### Variable-Size Matrix Conversion (★★★)

Write a function that converts a string representation of a tabular format with varying row sizes into a structure containing arrays of integers. The function should have the following prototype:

```c
typedef struct int_list {
    unsigned size;
    unsigned *sizes;
    int **values;
} int_list_t;

long convert_var_matrix(int_list_t *r, const char *s);
```

Where:
- `r` is a pointer to the structure that will hold the converted values
- `s` is the input string
- The function returns the total number of values converted, or 0 if the string is empty

<Spoiler>
First count the number of rows (newlines) in the string, then for each row count the number of values to allocate memory appropriately. Finally, parse the string row by row, converting each number.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct int_list {
    unsigned size;
    unsigned *sizes;
    int **values;
} int_list_t;

long convert_var_matrix(int_list_t *r, const char *s) {
    if (r == NULL || s == NULL) {
        if (r != NULL) {
            r->size = 0;
            r->sizes = NULL;
            r->values = NULL;
        }
        return 0;
    }
    
    // Count rows (newlines + 1)
    unsigned row_count = 1;
    for (const char *p = s; *p != '\0'; p++) {
        if (*p == '\n') {
            row_count++;
        }
    }
    
    // Handle empty string
    if (*s == '\0') {
        r->size = 0;
        r->sizes = NULL;
        r->values = NULL;
        return 0;
    }
    
    // Allocate memory for row sizes
    r->size = row_count;
    r->sizes = (unsigned *)malloc(row_count * sizeof(unsigned));
    if (r->sizes == NULL) {
        r->size = 0;
        r->values = NULL;
        return 0;
    }
    
    // Allocate memory for row pointers
    r->values = (int **)malloc(row_count * sizeof(int *));
    if (r->values == NULL) {
        free(r->sizes);
        r->size = 0;
        r->sizes = NULL;
        return 0;
    }
    
    // Count values in each row and allocate memory
    const char *row_start = s;
    long total_values = 0;
    
    for (unsigned row = 0; row < row_count; row++) {
        // Find end of row
        const char *row_end = strchr(row_start, '\n');
        if (row_end == NULL) {
            // Last row
            row_end = s + strlen(s);
        }
        
        // Count tabs + 1 to get number of values in this row
        unsigned col_count = 1;
        for (const char *p = row_start; p < row_end; p++) {
            if (*p == '\t') {
                col_count++;
            }
        }
        
        // Store row size
        r->sizes[row] = col_count;
        total_values += col_count;
        
        // Allocate memory for this row
        r->values[row] = (int *)malloc(col_count * sizeof(int));
        if (r->values[row] == NULL) {
            // Clean up on failure
            for (unsigned i = 0; i < row; i++) {
                free(r->values[i]);
            }
            free(r->values);
            free(r->sizes);
            r->size = 0;
            r->sizes = NULL;
            r->values = NULL;
            return 0;
        }
        
        // Parse values in this row
        const char *p = row_start;
        char *endptr;
        
        for (unsigned col = 0; col < col_count; col++) {
            // Convert number
            long val = strtol(p, &endptr, 10);
            r->values[row][col] = (int)val;
            
            // Move to next value
            p = endptr;
            while (*p == ' ') {
                p++;
            }
            if (*p == '\t') {
                p++; // Skip tab
            }
        }
        
        // Move to next row
        row_start = row_end + 1;
    }
    
    return total_values;
}

int main() {
    const char *matstr = "1\t2\t3\n4\t5\n6\t7\t8\t9";
    int_list_t matrix;
    
    long total = convert_var_matrix(&matrix, matstr);
    
    if (total > 0) {
        printf("Successfully converted %ld values in %u rows:\n", total, matrix.size);
        
        for (unsigned i = 0; i < matrix.size; i++) {
            printf("Row %u (%u values): ", i, matrix.sizes[i]);
            for (unsigned j = 0; j < matrix.sizes[i]; j++) {
                printf("%d ", matrix.values[i][j]);
            }
            printf("\n");
        }
        
        // Clean up
        for (unsigned i = 0; i < matrix.size; i++) {
            free(matrix.values[i]);
        }
        free(matrix.values);
        free(matrix.sizes);
    } else {
        printf("Empty string or conversion failed\n");
    }
    
    return 0;
}
```

</details>

## Matrix Exercises

These exercises focus on working with matrices (2D arrays) in C.

### Matrix Edge Sum (★★☆)

Implement a function that calculates the sum of all values on the "edge" of a matrix (first and last rows, first and last columns). The function should have the following prototype:

```c
long matrix_edge(unsigned n_rows, unsigned n_cols, int m[][n_cols]);
```

Where:
- `n_rows` and `n_cols` are the dimensions of the matrix
- `m` is the matrix
- The function returns the sum of the edge values

<Spoiler>
Be careful not to count corner elements twice. One approach is to sum the first and last rows entirely, then sum the first and last columns excluding the corners.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>

long matrix_edge(unsigned n_rows, unsigned n_cols, int m[][n_cols]) {
    long sum = 0;
    
    // Empty matrix case
    if (n_rows == 0 || n_cols == 0) {
        return 0;
    }
    
    // Special case: 1x1 matrix
    if (n_rows == 1 && n_cols == 1) {
        return m[0][0];
    }
    
    // Special case: single row
    if (n_rows == 1) {
        for (unsigned j = 0; j < n_cols; j++) {
            sum += m[0][j];
        }
        return sum;
    }
    
    // Special case: single column
    if (n_cols == 1) {
        for (unsigned i = 0; i < n_rows; i++) {
            sum += m[i][0];
        }
        return sum;
    }
    
    // First row
    for (unsigned j = 0; j < n_cols; j++) {
        sum += m[0][j];
    }
    
    // Last row (if different from first row)
    for (unsigned j = 0; j < n_cols; j++) {
        sum += m[n_rows - 1][j];
    }
    
    // First column (excluding first and last elements already counted)
    for (unsigned i = 1; i < n_rows - 1; i++) {
        sum += m[i][0];
    }
    
    // Last column (excluding first and last elements already counted)
    for (unsigned i = 1; i < n_rows - 1; i++) {
        sum += m[i][n_cols - 1];
    }
    
    return sum;
}

int main() {
    int matrix[4][5] = {
        {1, 2, 3, 4, 5},
        {6, 7, 8, 9, 10},
        {11, 12, 13, 14, 15},
        {16, 17, 18, 19, 20}
    };
    
    long sum = matrix_edge(4, 5, matrix);
    printf("Sum of edge elements: %ld\n", sum);
    
    return 0;
}
```

</details>

### Extracting Matrix Diagonals (★★☆)

Implement a function that extracts the main diagonal and secondary diagonal of a square matrix. The function should have the following prototype:

```c
void diagonals(int *rdp, int *rds, unsigned size, const int m[][size]);
```

Where:
- `rdp` is a pointer to the array where the main diagonal will be stored
- `rds` is a pointer to the array where the secondary diagonal will be stored
- `size` is the size of the square matrix
- `m` is the matrix

<Spoiler>
The main diagonal elements are at positions (i,i). The secondary diagonal elements are at positions (i, size-1-i).
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>

void diagonals(int *rdp, int *rds, unsigned size, const int m[][size]) {
    for (unsigned i = 0; i < size; i++) {
        // Main diagonal: elements where row == column
        rdp[i] = m[i][i];
        
        // Secondary diagonal: elements where row + column = size - 1
        rds[i] = m[i][size - 1 - i];
    }
}

int main() {
    int matrix[4][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12},
        {13, 14, 15, 16}
    };
    unsigned size = 4;
    
    int main_diag[size];
    int sec_diag[size];
    
    diagonals(main_diag, sec_diag, size, matrix);
    
    printf("Main diagonal: ");
    for (unsigned i = 0; i < size; i++) {
        printf("%d ", main_diag[i]);
    }
    
    printf("\nSecondary diagonal: ");
    for (unsigned i = 0; i < size; i++) {
        printf("%d ", sec_diag[i]);
    }
    printf("\n");
    
    return 0;
}
```

</details>

### Tabula Recta (★★☆)

Implement a function that creates a tabula recta (a table where each row is the alphabet shifted by one position from the previous row). The function should have the following prototype:

```c
void tabula_recta(char t[][26]);
```

Where:
- `t` is the matrix where the tabula recta will be stored

<Spoiler>
Each row starts with a different letter (first row starts with 'A', second with 'B', etc.) and cycles through the alphabet. You can use the modulo operator to wrap around when you reach 'Z'.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>

void tabula_recta(char t[][26]) {
    for (int i = 0; i < 26; i++) {
        for (int j = 0; j < 26; j++) {
            // Calculate the letter for position (i,j)
            t[i][j] = 'A' + (i + j) % 26;
        }
    }
}

int main() {
    char table[26][26];
    
    tabula_recta(table);
    
    printf("Tabula Recta (first 5 rows and columns):\n");
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            printf("%c ", table[i][j]);
        }
        printf("\n");
    }
    
    return 0;
}
```

</details>

### Creating and Destroying String Lists (★★☆)

Implement functions to create and destroy a list of strings. The functions should have the following prototypes:

```c
char **crea_lista(unsigned list_size, const unsigned *sizes);
void distruggi_lista(char **list_p);
```

Where:
- `list_size` is the number of strings in the list
- `sizes` is an array containing the size to allocate for each string
- `list_p` is the list to destroy

<Spoiler>
For creation, allocate an array of pointers, then allocate each string with the specified size. For destruction, free each string, then free the array of pointers.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char **crea_lista(unsigned list_size, const unsigned *sizes) {
    // Allocate array of string pointers
    char **list = (char **)malloc(list_size * sizeof(char *));
    if (list == NULL) {
        return NULL;
    }
    
    // Allocate each string
    for (unsigned i = 0; i < list_size; i++) {
        list[i] = (char *)malloc((sizes[i] + 1) * sizeof(char)); // +1 for null terminator
        if (list[i] == NULL) {
            // Clean up on failure
            for (unsigned j = 0; j < i; j++) {
                free(list[j]);
            }
            free(list);
            return NULL;
        }
        
        // Initialize to empty string
        list[i][0] = '\0';
    }
    
    return list;
}

void distruggi_lista(char **list_p) {
    if (list_p == NULL) {
        return;
    }
    
    // Free each string
    for (unsigned i = 0; list_p[i] != NULL; i++) {
        free(list_p[i]);
    }
    
    // Free the array of pointers
    free(list_p);
}

int main() {
    unsigned sizes[] = {5, 10, 15, 20};
    unsigned list_size = 4;
    
    char **list = crea_lista(list_size, sizes);
    if (list == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    // Fill the strings with sample data
    strcpy(list[0], "Hello");
    strcpy(list[1], "World");
    strcpy(list[2], "How are you");
    strcpy(list[3], "Today is a good day");
    
    // Print the strings
    printf("String list:\n");
    for (unsigned i = 0; i < list_size; i++) {
        printf("%u: \"%s\"\n", i, list[i]);
    }
    
    // Set the end marker (NULL)
    list = realloc(list, (list_size + 1) * sizeof(char *));
    list[list_size] = NULL;
    
    // Clean up
    distruggi_lista(list);
    
    return 0;
}
```

</details>

### Splitting a String into a List (★★★)

Implement a function that splits a space-separated string into a list of strings, with the last element of the list followed by a NULL pointer. The function should have the following prototype:

```c
char **split(const char *s);
```

Where:
- `s` is the input string
- The function returns a pointer to the dynamically allocated list of strings, or NULL in case of error

<Spoiler>
First count the number of words in the string by counting spaces, then allocate memory for the array of pointers plus one for the NULL terminator. Then iterate through the string again, allocating memory for each word and copying it to the list.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

char **split(const char *s) {
    if (s == NULL) {
        return NULL;
    }
    
    // Count words
    unsigned word_count = 0;
    int in_word = 0;
    
    for (const char *p = s; *p != '\0'; p++) {
        if (!isspace(*p) && !in_word) {
            in_word = 1;
            word_count++;
        } else if (isspace(*p)) {
            in_word = 0;
        }
    }
    
    // Allocate array of string pointers (word_count + 1 for NULL terminator)
    char **list = (char **)malloc((word_count + 1) * sizeof(char *));
    if (list == NULL) {
        return NULL;
    }
    
    // Initialize list
    for (unsigned i = 0; i <= word_count; i++) {
        list[i] = NULL;
    }
    
    // Extract words
    in_word = 0;
    unsigned word_index = 0;
    const char *word_start = NULL;
    
    for (const char *p = s; ; p++) {
        if (*p != '\0' && !isspace(*p) && !in_word) {
            // Start of a new word
            in_word = 1;
            word_start = p;
        } else if ((*p == '\0' || isspace(*p)) && in_word) {
            // End of a word
            in_word = 0;
            unsigned word_len = p - word_start;
            
            // Allocate memory for the word
            list[word_index] = (char *)malloc((word_len + 1) * sizeof(char));
            if (list[word_index] == NULL) {
                // Clean up on failure
                for (unsigned i = 0; i < word_index; i++) {
                    free(list[i]);
                }
                free(list);
                return NULL;
            }
            
            // Copy the word
            strncpy(list[word_index], word_start, word_len);
            list[word_index][word_len] = '\0';
            word_index++;
        }
        
        if (*p == '\0') {
            break;
        }
    }
    
    // Set the NULL terminator at the end of the list
    list[word_count] = NULL;
    
    return list;
}

int main() {
    const char *sentence = "This is a test sentence with multiple words";
    
    char **word_list = split(sentence);
    if (word_list == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    printf("Words in the sentence:\n");
    for (unsigned i = 0; word_list[i] != NULL; i++) {
        printf("%u: \"%s\"\n", i, word_list[i]);
    }
    
    // Clean up
    for (unsigned i = 0; word_list[i] != NULL; i++) {
        free(word_list[i]);
    }
    free(word_list);
    
    return 0;
}
```

</details>

These exercises cover a range of topics in C programming, from data structures to string manipulation and matrix operations. The solutions provided demonstrate different approaches and techniques for solving these problems.
