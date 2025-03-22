---
sidebar_position: 11
id: memory-allocation
title: Dynamic memory allocation
hide_title: false
hide_table_of_contents: false
sidebar_label: Memory allocation
description: Understanding dynamic memory allocation in C
slug: /c/memory-allocation
custom_edit_url: null
---

Until now, we've been creating variables and arrays with fixed sizes determined at compile time. But what if we need to allocate memory based on user input or other runtime conditions? That's where dynamic memory allocation comes in.

Dynamic memory allocation allows us to request memory from the system during program execution, which offers greater flexibility than static allocation.

## Memory management functions

C provides several functions for dynamic memory allocation, all found in the `<stdlib.h>` library:

| Function | Purpose |
|----------|---------|
| `malloc()` | Allocates a specified number of bytes |
| `calloc()` | Allocates and initializes memory to zero |
| `realloc()` | Resizes previously allocated memory |
| `free()` | Releases allocated memory back to the system |

## Basic allocation with `malloc()`

The most common function for dynamic allocation is `malloc()` (memory allocation):

```c
void *malloc(size_t size);
```

It takes a single argument: the number of bytes to allocate, and returns a pointer to the allocated memory (or NULL if allocation fails).

```c
int *p;
p = (int*) malloc(sizeof(int));  // Allocate space for one integer

if (p == NULL) {
    // Allocation failed
    fprintf(stderr, "Memory allocation failed\n");
    return 1;
}

*p = 42;  // Use the allocated memory
printf("Value: %d\n", *p);

free(p);  // Release the memory when done
```

<div class="output">
<code class="output">
Value: 42
</code>
</div>

:::warning
Always check if `malloc()` returned NULL before using the allocated memory!
:::

### The `void*` return type

Notice that `malloc()` returns `void*`, which is a generic pointer that doesn't have a specific data type. Before using it, we cast it to the appropriate pointer type:

```c
int *p = (int*) malloc(sizeof(int));
```

In modern C, the cast is technically optional but considered good practice for clarity.

## Zeroing memory with `calloc()`

The `calloc()` function (clear allocation) allocates memory and initializes it to zero:

```c
void *calloc(size_t nmemb, size_t size);
```

It takes two arguments:

- `nmemb`: Number of elements
- `size`: Size of each element in bytes

```c
int *array;
int size = 10;

array = (int*) calloc(size, sizeof(int));
if (array == NULL) {
    // Handle allocation failure
    return 1;
}

// All elements are already initialized to 0
for (int i = 0; i < size; i++) {
    printf("%d ", array[i]);  // Will print "0 0 0 0 0 0 0 0 0 0"
}

free(array);
```

<div class="output">
<code class="output">
0 0 0 0 0 0 0 0 0 0
</code>
</div>

### `malloc()` vs `calloc()`

When deciding between the two:

- Use `malloc()` when you'll immediately overwrite all values
- Use `calloc()` when you need elements initialized to zero

## Resizing memory with `realloc()`

The `realloc()` function changes the size of a previously allocated memory block:

```c
void *realloc(void *ptr, size_t size);
```

This is useful when you need to expand or shrink an array:

```c
int *data = (int*) malloc(5 * sizeof(int));
if (data == NULL) return 1;

// Fill the array with values...

// Now let's expand it to hold 10 elements
int *new_data = (int*) realloc(data, 10 * sizeof(int));
if (new_data == NULL) {
    // Handle reallocation failure
    free(data);  // Don't forget to free the original memory
    return 1;
}

data = new_data;  // Point to the new memory block
// Original values are preserved, new elements are uninitialized

// Use the expanded array...

free(data);  // Free when done
```

:::tip
`realloc()` preserves the content of the original memory block up to the smaller of the new and old sizes.
:::

:::warning
Always assign `realloc()` to a temporary variable first! If reallocation fails but the original pointer is overwritten, you'll lose access to the original memory, causing a memory leak.
:::

## Dynamic arrays

One of the most common uses of dynamic memory allocation is creating arrays whose size is determined at runtime:

```c {title="dynamic_array_example.c"}
#include <stdio.h>
#include <stdlib.h>

// Function to print the array
void print_array(int *array, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");
}

int main() {
    int size;
    printf("Enter array size: ");
    scanf("%d", &size);

    // Allocate memory for the array
    int *dynamic_array = (int*) malloc(size * sizeof(int));
    if (dynamic_array == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        return 1;
    }

    // Initialize the array
    for (int i = 0; i < size; i++) {
        dynamic_array[i] = i * 10;
    }

    // Print the array
    print_array(dynamic_array, size);

    // Free the allocated memory
    free(dynamic_array);

    return 0;
}
```

<div class="output">
<code class="output">
Enter array size: 5<br/>
0 10 20 30 40
</code>
</div>

## Dynamic matrices (2D arrays)

There are two main approaches to creating dynamic 2D arrays:

### 1. Contiguous memory block

This approach allocates a single block of memory and provides 2D access.

```c {title="contiguous_memory_block.c"}
#include <stdio.h>
#include <stdlib.h>

// Function to print the matrix
void print_matrix(int *matrix, int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%d ", matrix[i * cols + j]);
        }
        printf("\n");
    }
}

int main() {
    int rows = 3, cols = 4;

    // Allocate a single block of memory
    int *matrix = (int*) malloc(rows * cols * sizeof(int));
    if (matrix == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        return 1;
    }

    // Initialize the matrix
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i * cols + j] = i * j;
        }
    }

    // Print the matrix
    print_matrix(matrix, rows, cols);

    // Free the allocated memory
    free(matrix);

    return 0;
}
```

<div class="output">
<code class="output">
0 0 0 0<br/>
0 1 2 3<br/>
0 2 4 6
</code>
</div>

### 2. Array of pointers

This approach uses a double pointer structure (an array of pointers to arrays):

```c
int rows = 3, cols = 4;

// Allocate array of pointers
int **matrix = (int**) malloc(rows * sizeof(int*));
if (matrix == NULL) return 1;

// Allocate each row
for (int i = 0; i < rows; i++) {
    matrix[i] = (int*) malloc(cols * sizeof(int));
    if (matrix[i] == NULL) {
        // Free previously allocated rows
        for (int j = 0; j < i; j++) {
            free(matrix[j]);
        }
        free(matrix);
        return 1;
    }
}

// Use matrix[i][j] notation
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        matrix[i][j] = i * j;
        printf("%d ", matrix[i][j]);
    }
    printf("\n");
}

// Free in reverse order
for (int i = 0; i < rows; i++) {
    free(matrix[i]);
}
free(matrix);
```

<div class="output">
<code class="output">
0 0 0 0<br/>
0 1 2 3<br/>
0 2 4 6
</code>
</div>

This second approach allows for variable row sizes and more familiar `matrix[i][j]` notation.

## Variable-size arrays

A powerful use of dynamic allocation is creating arrays where each row has a different size:

```c {title="jagged_array.c"}
#include <stdio.h>
#include <stdlib.h>

// Function to print the jagged array
void print_jagged_array(int **jagged_array, int rows) {
    for (int i = 0; i < rows; i++) {
        int row_size = i + 1;
        for (int j = 0; j < row_size; j++) {
            printf("%d ", jagged_array[i][j]);
        }
        printf("\n");
    }
}

int main() {
    int rows = 3;

    // Allocate array of pointers
    int **jagged_array = (int**) malloc(rows * sizeof(int*));
    if (jagged_array == NULL) return 1;

    // Allocate each row with different sizes
    for (int i = 0; i < rows; i++) {
        int row_size = i + 1;  // Each row has size equal to its index + 1
        jagged_array[i] = (int*) malloc(row_size * sizeof(int));
        if (jagged_array[i] == NULL) {
            // Clean up on failure
            for (int j = 0; j < i; j++) {
                free(jagged_array[j]);
            }
            free(jagged_array);
            return 1;
        }

        // Initialize row values
        for (int j = 0; j < row_size; j++) {
            jagged_array[i][j] = i * 10 + j;
        }
    }

    // Print the jagged array
    print_jagged_array(jagged_array, rows);

    // Free memory
    for (int i = 0; i < rows; i++) {
        free(jagged_array[i]);
    }
    free(jagged_array);

    return 0;
}
```

<div class="output">
<code class="output">
0<br/>
10 11<br/>
20 21 22
</code>
</div>

This creates a "jagged" array where row 0 has 1 element, row 1 has 2 elements, etc.

## Memory management best practices

1. **Always check for allocation failures**:
   ```c
   ptr = malloc(size);
   if (ptr == NULL) {
       // Handle error
   }
   ```

2. **Always free allocated memory**:
   ```c
   free(ptr);
   ptr = NULL;  // Optional but recommended to avoid using after free
   ```

3. **Free memory in reverse order of allocation** for nested structures:
   ```c
   // Free the "children" before the "parent"
   for (int i = 0; i < rows; i++) {
       free(matrix[i]);
   }
   free(matrix);
   ```

4. **Use valgrind or similar tools** to detect memory leaks during development

:::danger Common memory mistakes

- **Memory leaks**: Forgetting to call `free()` on allocated memory
- **Double free**: Calling `free()` twice on the same pointer
- **Use after free**: Using memory after it's been freed
- **Buffer overflows**: Writing beyond the allocated memory
:::

Dynamic memory allocation gives you great power but requires careful management. Always keep track of what memory you've allocated and ensure it's properly freed when no longer needed.
