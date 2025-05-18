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

## Overview of memory organization in C programs

Understanding how memory is organized in a C program is crucial for effective memory management. A typical C program's memory is divided into several key segments:

1.  **Code Segment (Text Segment)**:
    *   Contains the compiled machine code of the program.
    *   This area is typically read-only to prevent accidental modification of instructions.

2.  **Data Segment**:
    *   Stores global variables, static variables, and string literals that are initialized by the programmer.
    *   Further divided into:
        *   **Initialized data segment**: For variables with explicit initial values (e.g., `int global_var = 10;`).
        *   **Uninitialized data segment (BSS - Block Started by Symbol)**: For global and static variables that are not explicitly initialized. These are typically initialized to zero (or `NULL` for pointers) by the operating system when the program loads.

3.  **Stack**:
    *   Used for static memory allocation (not to be confused with `static` keyword variables).
    *   Stores local variables (automatic variables) declared inside functions, function parameters, and return addresses.
    *   Memory is managed in a Last-In, First-Out (LIFO) manner. When a function is called, a new "stack frame" is pushed onto the stack for its local variables. When the function returns, its stack frame is popped off, automatically deallocating its local variables.
    *   Stack memory is fast to allocate and deallocate but is limited in size. Exceeding this limit (e.g., by deep recursion or very large local arrays) causes a "stack overflow."

4.  **Heap**:
    *   Used for dynamic memory allocation, managed by functions like `malloc()`, `calloc()`, and `realloc()`.
    *   Memory in the heap is allocated and deallocated by the programmer explicitly.
    *   The heap is generally much larger than the stack, suitable for allocating large objects or data whose lifetime needs to extend beyond the scope of a single function.
    *   Improper management of heap memory can lead to issues like memory leaks (forgetting to `free()`) or dangling pointers (using memory after it has been `free`d).

Variables with `static storage duration` (global variables and variables declared with the `static` keyword) reside in the data segment. Variables with `automatic storage duration` (local variables not declared `static`) reside on the stack. Memory with `allocated storage duration` (obtained via `malloc`, etc.) resides on the heap.

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

These functions typically operate on memory from the **heap**.

### Key Types and Macros (`<stdlib.h>`)

Before diving into the functions, it's important to know about `size_t` and `NULL`, both defined in `<stdlib.h>` (among other headers):

-   **`size_t`**: This is an unsigned integer type used to represent the size of objects in memory. It's the type returned by the `sizeof` operator and is used for arguments that specify memory sizes (like in `malloc`). Its actual underlying type (e.g., `unsigned int`, `unsigned long`) can vary between systems but is guaranteed to be able to hold the maximum size of any object.
-   **`NULL`**: This is a macro that expands to a null pointer constant. It represents a pointer that does not point to any valid memory location. It's often defined as `((void*)0)`. Comparing a pointer to `NULL` is the standard way to check if it's valid.

## Basic allocation with `malloc()`

The most common function for dynamic allocation is `malloc()` (memory allocation):

```c
void *malloc(size_t size);
```

It takes a single argument: the number of bytes to allocate, and returns a pointer to the allocated memory (or `NULL` if allocation fails). The allocated memory is **not initialized** and may contain garbage values.

```c
#include <stdio.h>
#include <stdlib.h> // For malloc, free, NULL, size_t

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
p = NULL; // Good practice to avoid dangling pointer issues
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

Notice that `malloc()` (and `calloc()`, `realloc()`) returns `void*`. A `void*` is a "generic pointer" or "pointer to void." It can point to any data type, but it has special characteristics:
-   It cannot be dereferenced directly (e.g., `*my_void_ptr` is illegal) because the compiler doesn't know the size or type of the data it points to.
-   Pointer arithmetic is not allowed on `void*` pointers directly for the same reason.

In C, a `void*` can be implicitly converted to any other pointer type upon assignment, and any other pointer type can be implicitly converted to `void*`.

```c
int *p_int;
void *v_ptr;

p_int = malloc(sizeof(int)); // malloc returns void*, implicitly converted to int*
v_ptr = p_int;               // int* implicitly converted to void*
p_int = v_ptr;               // void* implicitly converted back to int*
```
While the cast `(int*)` in `p = (int*) malloc(sizeof(int));` is common, it's not strictly necessary in C (unlike C++). Some C programmers prefer to omit it, as it can hide a missing `#include <stdlib.h>` (which would cause `malloc` to be implicitly declared as returning `int`, leading to potential issues). However, including the cast can improve clarity for programmers coming from C++.

## Zeroing memory with `calloc()`

The `calloc()` function (clear allocation) allocates memory for an array of elements, initializes all bytes in the allocated memory to zero, and returns a pointer to the allocated memory.

```c
void *calloc(size_t nmemb, size_t size);
```

It takes two arguments:
- `nmemb`: The number of elements to allocate.
- `size`: The size (in bytes) of each element.

The total memory allocated is `nmemb * size` bytes.

```c
#include <stdio.h>
#include <stdlib.h>

int *array;
int num_elements = 10;

// Allocate memory for 10 integers and initialize them to 0
array = (int*) calloc(num_elements, sizeof(int));
if (array == NULL) {
    fprintf(stderr, "calloc failed\n");
    return 1;
}

// All elements are already initialized to 0
printf("Array elements after calloc:\n");
for (int i = 0; i < num_elements; i++) {
    printf("%d ", array[i]);  // Will print "0 0 0 0 0 0 0 0 0 0"
}
printf("\n");

free(array);
array = NULL;
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

Parameters:
- `ptr`: A pointer to a memory block previously allocated by `malloc()`, `calloc()`, or `realloc()`. If `ptr` is `NULL`, `realloc()` behaves like `malloc(new_size)`.
- `new_size`: The new size for the memory block, in bytes. If `new_size` is 0 and `ptr` is not `NULL`, `realloc()` behaves like `free(ptr)` (though this behavior is implementation-defined for the return value, so it's better to use `free()` explicitly).

Behavior:
-   If `new_size` is larger than the old size, the existing content is preserved, and the additional memory at the end of the block is **uninitialized**.
-   If `new_size` is smaller than the old size, the content is preserved up to `new_size`, and the memory beyond that is released.
-   `realloc()` may move the memory block to a new location if it cannot be resized in place. If it moves the block, the old block pointed to by `ptr` is automatically freed.
-   It returns a pointer to the newly allocated (or resized) memory, or `NULL` if the request fails (in which case the original memory block pointed to by `ptr` remains unchanged and valid).

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

:::warning
Always assign the result of `realloc()` to a temporary pointer first! If `realloc()` fails, it returns `NULL`. If you assign this `NULL` directly back to your original pointer, you lose the only reference to your previously allocated memory, causing a memory leak.

Correct usage:
```c
int *data = (int*) malloc(5 * sizeof(int));
// ... (check data for NULL, use data) ...

// Try to resize
int *temp_data = (int*) realloc(data, 10 * sizeof(int));
if (temp_data == NULL) {
    // Reallocation failed. 'data' is still valid and points to the original 5 ints.
    fprintf(stderr, "realloc failed\n");
    // You might want to free(data) here if you can't continue, or try other recovery.
} else {
    // Reallocation succeeded.
    data = temp_data; // Update 'data' to point to the new, larger block.
}
// ... use 'data' (now potentially pointing to 10 ints) ...
free(data);
data = NULL;
```
:::

## Freeing Memory with `free()`

The `free()` function deallocates a block of memory previously allocated by `malloc()`, `calloc()`, or `realloc()`, making it available for future allocations.

```c
void free(void *ptr);
```

-   `ptr`: Must be a pointer previously returned by a memory allocation function, or `NULL`.
-   If `ptr` is `NULL`, `free(NULL)` does nothing, which is safe.
-   After `free(ptr)` is called, the memory pointed to by `ptr` is no longer valid. `ptr` itself still holds the same address (it becomes a "dangling pointer"), but accessing that memory location leads to undefined behavior.

It's good practice to set the pointer to `NULL` immediately after freeing it to prevent accidental use of the dangling pointer:

```c
free(my_pointer);
my_pointer = NULL;
```

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

- **Memory leaks**: Forgetting to call `free()` on allocated memory. This happens when dynamically allocated memory is no longer needed but isn't returned to the system. Over time, this can exhaust available memory.
  ```c
  void function_that_leaks() {
      int *p = malloc(100 * sizeof(int));
      // ... use p ...
      // Forgot to call free(p);
  } // p goes out of scope, but the memory it pointed to is still allocated.
  ```
- **Dangling pointers**: Using a pointer that points to memory that has already been freed or is out of scope.
  ```c
  int *p = malloc(sizeof(int));
  free(p);
  // *p = 10; // Error: p is a dangling pointer, accessing freed memory.
  ```
- **Double free**: Calling `free()` twice on the same pointer (that hasn't been reallocated in between). This can corrupt the memory management data structures.
  ```c
  int *p = malloc(sizeof(int));
  free(p);
  // ... some other code ...
  // free(p); // Error: double free if p wasn't set to NULL or reallocated.
  // If p was set to NULL after the first free, free(NULL) is safe.
  ```
- **Use after free**: A specific type of dangling pointer issue where freed memory is accessed.
- **Buffer overflows/overruns**: Writing beyond the allocated memory block. This can corrupt adjacent memory or cause crashes.
  ```c
  char *buffer = malloc(10); // Allocates 10 bytes
  // strcpy(buffer, "This string is too long"); // Writes beyond the 10 bytes, buffer overflow!
  free(buffer);
  ```
- **Freeing non-dynamically allocated memory**: Calling `free()` on a pointer that was not obtained from `malloc()`, `calloc()`, or `realloc()` (e.g., a pointer to a stack variable or a global variable).
  ```c
  int x;
  int *p = &x;
  // free(p); // Error: p points to stack memory, not heap memory.
  ```
:::

Dynamic memory allocation gives you great power but requires careful management. Always keep track of what memory you've allocated and ensure it's properly freed when no longer needed. Using tools like Valgrind can help detect memory errors during development.
