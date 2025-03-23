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

```c
void find_max(int *rmax, int *values, unsigned size) {
    // Initialize rmax to point to the first element
    *rmax = values[0];
    
    // Iterate through the array to find the maximum
    for (unsigned i = 1; i < size; i++) {
        if (values[i] > *rmax) {
            *rmax = values[i];
        }
    }
}
```

Another solution that returns a pointer to the maximum element:

```c
void find_max(int *rmax, int *values, unsigned size) {
    // Initialize rmax to point to the first element
    rmax = values;
    
    // Iterate through the array to find the maximum
    for (unsigned i = 1; i < size; i++) {
        if (values[i] > *rmax) {
            rmax = &values[i];
        }
    }
}
```

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
    *rmin = values[0];
    *rmax = values[0];
    
    // Iterate through the array to find min and max
    for (unsigned i = 1; i < size; i++) {
        if (values[i] < *rmin) {
            *rmin = values[i];
        }
        if (values[i] > *rmax) {
            *rmax = values[i];
        }
    }
}
```

Alternative solution returning pointers to the min and max elements:

```c
void find_minmax(int **rmin, int **rmax, int *values, unsigned size) {
    // Initialize rmin and rmax to point to the first element
    *rmin = values;
    *rmax = values;
    
    // Iterate through the array to find min and max
    for (unsigned i = 1; i < size; i++) {
        if (values[i] < **rmin) {
            *rmin = &values[i];
        }
        if (values[i] > **rmax) {
            *rmax = &values[i];
        }
    }
}
```

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

```c
void compute_mean_variance(float *rmean, float *rvariance, float *values, unsigned size) {
    // Calculate the mean
    float sum = 0.0f;
    for (unsigned i = 0; i < size; i++) {
        sum += values[i];
    }
    *rmean = sum / size;
    
    // Calculate the variance
    float variance_sum = 0.0f;
    for (unsigned i = 0; i < size; i++) {
        float diff = values[i] - *rmean;
        variance_sum += diff * diff;
    }
    *rvariance = variance_sum / size;
}
```

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

## Challenge Exercises

### Memory Efficient String Array (★★★)

Create a program that:

1. Asks the user for `n` strings
2. Stores them efficiently in memory (hint: only allocate as much memory as needed for each string)
3. Sorts the strings alphabetically using pointers
4. Prints the sorted strings
5. Properly frees all allocated memory

<Spoiler>
For each string, measure its length first, then allocate only the memory needed (length + 1 for the null terminator). For sorting, consider using the `qsort()` function with a custom comparison function.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Function to compare strings for qsort
int compare_strings(const void *a, const void *b) {
    return strcmp(*(const char **)a, *(const char **)b);
}

int main() {
    int n;
    char **strings;
    char buffer[100];  // Temporary buffer for reading strings
    
    // Get number of strings
    printf("How many strings? ");
    scanf("%d", &n);
    
    // Consume newline
    getchar();
    
    // Allocate array of string pointers
    strings = (char **)malloc(n * sizeof(char *));
    if (strings == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    // Read each string and allocate just enough memory
    for (int i = 0; i < n; i++) {
        printf("Enter string %d: ", i + 1);
        fgets(buffer, sizeof(buffer), stdin);
        
        // Remove trailing newline if present
        size_t len = strlen(buffer);
        if (len > 0 && buffer[len-1] == '\n') {
            buffer[len-1] = '\0';
            len--;
        }
        
        // Allocate memory for this string (+1 for null terminator)
        strings[i] = (char *)malloc((len + 1) * sizeof(char));
        if (strings[i] == NULL) {
            printf("Memory allocation failed!\n");
            
            // Free previously allocated strings
            for (int j = 0; j < i; j++) {
                free(strings[j]);
            }
            free(strings);
            return 1;
        }
        
        // Copy string to allocated memory
        strcpy(strings[i], buffer);
    }
    
    // Sort strings
    qsort(strings, n, sizeof(char *), compare_strings);
    
    // Print sorted strings
    printf("\nSorted strings:\n");
    for (int i = 0; i < n; i++) {
        printf("%d: %s\n", i + 1, strings[i]);
    }
    
    // Free all allocated memory
    for (int i = 0; i < n; i++) {
        free(strings[i]);
    }
    free(strings);
    
    return 0;
}
```

</details>

### Custom Memory Allocator (★★★)

Implement a simple memory pool allocator that pre-allocates a large chunk of memory and then handles smaller allocation requests from this pool. The allocator should have functions similar to `malloc()` and `free()`.

<Spoiler>
A simple approach is to use a char array as your memory pool and a separate array to track which bytes are used. For allocation, search for a contiguous block of free bytes equal to the requested size.
</Spoiler>

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define POOL_SIZE 1024  // Size of memory pool in bytes

typedef struct {
    char memory[POOL_SIZE];  // The actual memory pool
    char used[POOL_SIZE];    // Tracks which bytes are used (1) or free (0)
} MemoryPool;

// Initialize memory pool
void init_pool(MemoryPool *pool) {
    memset(pool->memory, 0, POOL_SIZE);
    memset(pool->used, 0, POOL_SIZE);
}

// Allocate from pool
void *pool_alloc(MemoryPool *pool, size_t size) {
    if (size == 0 || size > POOL_SIZE) {
        return NULL;
    }
    
    // Find a free block of sufficient size
    int start = -1;
    int count = 0;
    
    for (int i = 0; i < POOL_SIZE; i++) {
        if (pool->used[i] == 0) {
            if (start == -1) {
                start = i;  // Mark start of a free block
            }
            count++;
            
            if (count == size) {
                // Found a sufficiently large block
                // Mark as used
                for (int j = start; j < start + size; j++) {
                    pool->used[j] = 1;
                }
                return &pool->memory[start];
            }
        } else {
            // Reset on encountering a used byte
            start = -1;
            count = 0;
        }
    }
    
    return NULL;  // No suitable free block found
}

// Free memory in pool
void pool_free(MemoryPool *pool, void *ptr) {
    if (ptr == NULL) {
        return;
    }
    
    // Check if ptr is within pool
    char *cptr = (char *)ptr;
    if (cptr < pool->memory || cptr >= pool->memory + POOL_SIZE) {
        return;  // Not from our pool
    }
    
    // Calculate offset in pool
    int offset = cptr - pool->memory;
    
    // Find end of allocated block
    int end = offset;
    while (end < POOL_SIZE && pool->used[end] == 1) {
        pool->used[end] = 0;  // Mark as free
        end++;
    }
}

int main() {
    MemoryPool pool;
    init_pool(&pool);
    
    // Allocate some memory
    int *a = (int *)pool_alloc(&pool, sizeof(int));
    char *str = (char *)pool_alloc(&pool, 20);
    
    if (a != NULL && str != NULL) {
        *a = 42;
        strcpy(str, "Hello, World!");
        
        printf("Integer: %d\n", *a);
        printf("String: %s\n", str);
        
        // Free memory
        pool_free(&pool, a);
        pool_free(&pool, str);
        
        // Try re-allocating
        int *b = (int *)pool_alloc(&pool, sizeof(int));
        *b = 100;
        printf("New integer: %d\n", *b);
    } else {
        printf("Allocation failed!\n");
    }
    
    return 0;
}
```

Note: This is a simple implementation for educational purposes. A real memory allocator would need to handle alignment, fragmentation, and many other issues.

</details>

### Generic Sorting with Function Pointers (★★★)

Create a generic sorting function that can sort arrays of any data type by using function pointers for comparison and element swapping.

<details>
<summary>Show solution</summary>

```c
#include <stdio.h>
#include <string.h>

// Type for comparison function pointer
typedef int (*CmpFunc)(const void *, const void *);

// Type for swap function pointer
typedef void (*SwapFunc)(void *, void *, size_t);

// Generic swap function
void swap_elements(void *a, void *b, size_t size) {
    // Create a temporary buffer
    char temp[size];
    
    // a -> temp
    memcpy(temp, a, size);
    
    // b -> a
    memcpy(a, b, size);
    
    // temp -> b
    memcpy(b, temp, size);
}

// Generic bubble sort implementation
void generic_sort(void *array, size_t num_elements, size_t element_size, 
                 CmpFunc compare, SwapFunc swap) {
    char *base_ptr = (char *)array;
    
    for (size_t i = 0; i < num_elements - 1; i++) {
        for (size_t j = 0; j < num_elements - i - 1; j++) {
            // Calculate pointers to the elements to compare
            char *elem1 = base_ptr + j * element_size;
            char *elem2 = base_ptr + (j + 1) * element_size;
            
            // Compare and swap if necessary
            if (compare(elem1, elem2) > 0) {
                swap(elem1, elem2, element_size);
            }
        }
    }
}

// Comparison function for integers
int compare_ints(const void *a, const void *b) {
    int int_a = *((const int *)a);
    int int_b = *((const int *)b);
    
    if (int_a < int_b) return -1;
    if (int_a > int_b) return 1;
    return 0;
}

// Comparison function for floats
int compare_floats(const void *a, const void *b) {
    float float_a = *((const float *)a);
    float float_b = *((const float *)b);
    
    if (float_a < float_b) return -1;
    if (float_a > float_b) return 1;
    return 0;
}

// Comparison function for strings
int compare_strings(const void *a, const void *b) {
    return strcmp(*(const char **)a, *(const char **)b);
}

int main() {
    // Sort integers
    int numbers[] = {64, 25, 12, 22, 11};
    int n_numbers = sizeof(numbers) / sizeof(numbers[0]);
    
    generic_sort(numbers, n_numbers, sizeof(int), compare_ints, swap_elements);
    
    printf("Sorted integers: ");
    for (int i = 0; i < n_numbers; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");
    
    // Sort floats
    float floats[] = {3.14, 1.41, 2.72, 1.62};
    int n_floats = sizeof(floats) / sizeof(floats[0]);
    
    generic_sort(floats, n_floats, sizeof(float), compare_floats, swap_elements);
    
    printf("Sorted floats: ");
    for (int i = 0; i < n_floats; i++) {
        printf("%.2f ", floats[i]);
    }
    printf("\n");
    
    // Sort strings
    char *strings[] = {"apple", "zebra", "banana", "orange"};
    int n_strings = sizeof(strings) / sizeof(strings[0]);
    
    generic_sort(strings, n_strings, sizeof(char *), compare_strings, swap_elements);
    
    printf("Sorted strings: ");
    for (int i = 0; i < n_strings; i++) {
        printf("%s ", strings[i]);
    }
    printf("\n");
    
    return 0;
}
```

</details>

These exercises will help you master pointers and memory allocation in C, from basic concepts to advanced applications. Try to solve them on your own before looking at the solutions, and don't hesitate to experiment with variations.
