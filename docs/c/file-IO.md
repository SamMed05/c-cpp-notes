---
sidebar_position: 20
id: file-io
title: File I/O in C
hide_title: false
hide_table_of_contents: false
sidebar_label: File I/O
description: How to perform file input and output operations in C, including text and binary files.
slug: /c/file-io
custom_edit_url: null
---

File Input/Output (I/O) in C allows programs to interact with files stored on secondary storage, enabling data persistence. This means data can be saved and retrieved even after the program terminates.

## Data persistence through files

To retain information beyond the execution of a program, we rely on **persistent storage**—typically achieved through files on disk.

A **file** is:

- An abstraction managed by the operating system's file system.
- A named collection of data stored on secondary storage (such as a hard drive or SSD).
- Organized as a sequence of records or bytes.

Files are generally categorized as:

- **Text files**: Store data as sequences of human-readable characters (e.g., ASCII, UTF-8). Suitable for configuration files, logs, and documents.
- **Binary files**: Store data in raw byte format, mirroring how data is represented in memory. Used for images, executables, and structured data.

:::info Windows vs Unix/Linux: File Types and Extensions

- On **Windows**, file extensions (like `.txt`, `.bin`, `.exe`) are commonly used to indicate file type, and the OS may treat files differently based on their extension. For example, opening a file in text mode (`"rt"`) or binary mode (`"rb"`) can affect how line endings (`\r\n` vs `\n`) are handled.
- On **Unix/Linux**, file extensions are not required or enforced by the OS—they are just part of the filename. The kernel treats all files as streams of bytes, regardless of extension. There is no technical distinction between "text" and "binary" files at the OS level; it's up to programs to interpret the contents.
- In fact, in Unix-like systems, **everything is a file**: not just regular files, but also devices, pipes, and even directories are accessed using file descriptors. This unified approach allows powerful tools like `cat`, `less`, or `vim` to open and edit almost any file, though not all files are human-readable as text.

:::

Using files allows programs to save, retrieve, and share data reliably, making persistent data management possible across program runs.

:::note Buffered I/O
In C, file I/O operations are typically **buffered**. This means data is temporarily stored in a buffer (a small region of memory) before being written to the actual file, or read from the file into the buffer. This improves efficiency by reducing the number of direct interactions with the storage device. The C standard library functions like `fopen`, `fread`, `fwrite`, `fprintf`, `fscanf`, etc., operate on these buffered streams.
:::

## Core File Operations

Working with files in C generally involves three main phases:

1. **Opening a File**:
    * Request access to the file from the operating system.
    * The OS prepares internal data structures to manage the file.
    * A `FILE` pointer is returned to your program to interact with the file.
2. **Reading/Writing Data**:
    * Perform read or write operations using the `FILE` pointer.
    * Data is typically transferred via a buffer.
3. **Closing a File**:
    * Any pending data in the output buffer is written to the file (flushed).
    * Resources allocated by the OS for the file are released.
    * The `FILE` pointer is no longer valid.

## File Opening Modes

When opening a file, you must specify the mode, which dictates how the file can be accessed. Key modes include:

- `"r"` (read): Opens a text file for reading. The file must exist.
- `"w"` (write): Opens a text file for writing. If the file exists, its contents are overwritten. If it doesn't exist, a new file is created.
- `"a"` (append): Opens a text file for appending. Data is written to the end of the file. If the file doesn't exist, a new file is created.
- `"rb"` (read binary): Opens a binary file for reading.
- `"wb"` (write binary): Opens a binary file for writing (truncates or creates).
- `"ab"` (append binary): Opens a binary file for appending (creates if non-existent).

Other modes like `"r+"`, `"w+"`, `"a+"` (and their binary counterparts `"rb+"`, `"wb+"`, `"ab+"`) allow both reading and writing.

## The File Position Indicator (Cursor)

When a file is opened, the system maintains a **file position indicator** (often conceptualized as a cursor). This indicator marks the current position within the file where the next read or write operation will occur.

- For modes `"r"`, `"rb"`, `"w"`, `"wb"`, the cursor is initially at the beginning of the file.
    - Remember: for `"w"` and `"wb"`, existing content is deleted.
- For modes `"a"`, `"ab"`, the cursor is initially at the end of the file.
- After each read or write operation, the cursor automatically advances by the number of bytes read or written.

## Working with Files

### The `FILE` Structure

All file operations in C are performed using a pointer to a `FILE` structure. This structure is defined in `<stdio.h>` and holds information about the file stream, such as the buffer, current position, and error indicators.

You don't need to know the internal details of the `FILE` structure. You'll simply declare a pointer of type `FILE*` and use it with standard library functions.

```c
#include <stdio.h>

FILE *fptr; // Declare a file pointer
```

### Opening a File: `fopen()`

The `fopen()` function is used to open a file.

```c
FILE* fopen(const char *filename, const char *mode);
```

- `filename`: A string containing the name (and path) of the file.
- `mode`: A string specifying the access mode (e.g., `"r"`, `"w"`, `"rb"`).
- **Return Value**:
    - On success, `fopen()` returns a `FILE` pointer.
    - On failure (e.g., file not found, no permission), it returns `NULL`.

**Always check the return value of `fopen()`:**

```c
#include <stdio.h>
#include <stdlib.h> // For exit()

int main() {
    FILE *fptr;
    fptr = fopen("myfile.txt", "w");

    if (fptr == NULL) {
        perror("Error opening file"); // Prints a system error message
        // Or: fprintf(stderr, "Error opening file myfile.txt\n");
        return 1; // Or exit(1);
    }

    // ... proceed with file operations ...

    // fclose(fptr); // Don't forget to close (shown later)
    return 0;
}
```

### Closing a File: `fclose()`

The `fclose()` function is used to close an opened file.

```c
int fclose(FILE *stream);
```

- `stream`: The `FILE` pointer to the file to be closed.
- **Return Value**:
    - Returns `0` on success.
    - Returns `EOF` (a special constant, usually -1) on error.
- `fclose()` flushes any unwritten data from the buffer to the file and releases system resources.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *fptr;
    fptr = fopen("myfile.txt", "w");
    if (fptr == NULL) {
        fprintf(stderr, "Cannot open file\n");
        return 1;
    }

    // Write something to demonstrate buffer flushing (optional here)
    fprintf(fptr, "Hello, World!\n");

    if (fclose(fptr) == EOF) {
        fprintf(stderr, "Error closing file\n");
        return 1;
    }

    printf("File opened, written, and closed successfully.\n");
    return 0;
}
```

### Standard I/O Streams

When a C program starts, three standard I/O streams are automatically opened:

- `stdin`: Standard input (usually the keyboard).
- `stdout`: Standard output (usually the terminal/screen).
- `stderr`: Standard error (usually the terminal/screen, for error messages).

These are `FILE` pointers. Functions like `printf()` and `scanf()` are convenient wrappers:

- `printf(...)` is equivalent to `fprintf(stdout, ...)`
- `scanf(...)` is equivalent to `fscanf(stdin, ...)`

## Text File I/O

### Writing to Text Files

- **`fprintf()`**: Writes formatted output to a file.
    ```c
    int fprintf(FILE *stream, const char *format, ...);
    // Returns the number of characters written, or a negative value on error.
    ```
    Example:
    ```c
    fprintf(fptr, "Name: %s, Age: %d\n", "Alice", 30);
    ```

- **`fputc()`**: Writes a single character.
    ```c
    int fputc(int character, FILE *stream);
    // Returns the character written, or EOF on error.
    ```

- **`fputs()`**: Writes a string (does not append a newline character automatically).
    ```c
    int fputs(const char *str, FILE *stream);
    // Returns a non-negative value on success, or EOF on error.
    ```

### Reading from Text Files

- **`fscanf()`**: Reads formatted input from a file.
    ```c
    int fscanf(FILE *stream, const char *format, ...);
    // Returns the number of input items successfully matched and assigned,
    // or EOF if an input failure occurs before any conversion.
    ```
    Example:
    ```c
    char name[50];
    int age;
    fscanf(fptr, "%s %d", name, &age);
    ```

- **`fgetc()`**: Reads a single character.
    ```c
    int fgetc(FILE *stream);
    // Returns the character read (as an int), or EOF on end-of-file or error.
    ```

- **`fgets()`**: Reads a string (safer than `fscanf` for strings as it prevents buffer overflows).
    ```c
    char* fgets(char *str, int num, FILE *stream);
    // Reads up to num-1 characters, or until a newline, or EOF.
    // Stores the newline if read. Appends a null terminator.
    // Returns str on success, NULL on error or EOF if no characters were read.
    ```
    Example:
    ```c
    char line[256];
    if (fgets(line, sizeof(line), fptr) != NULL) {
        // Process the line
    }
    ```

## Binary File I/O

Binary files store data as raw bytes, exactly as they are represented in memory. This is efficient for non-textual data like images, audio, or complex data structures.

### Writing to Binary Files: `fwrite()`

```c
size_t fwrite(const void *ptr, size_t size, size_t nmemb, FILE *stream);
```

- `ptr`: Pointer to the array of elements to be written.
- `size`: Size in bytes of each element to be written.
- `nmemb`: Number of elements, each one with a size of `size` bytes.
- `stream`: The `FILE` pointer.
- **Return Value**: The number of elements successfully written (which may be less than `nmemb` if an error occurs).

### Reading from Binary Files: `fread()`

```c
size_t fread(void *ptr, size_t size, size_t nmemb, FILE *stream);
```

- `ptr`: Pointer to a block of memory with a minimum size of `size*nmemb` bytes.
- `size`: Size in bytes of each element to be read.
- `nmemb`: Number of elements, each one with a size of `size` bytes.
- `stream`: The `FILE` pointer.
- **Return Value**: The number of elements successfully read (which may be less than `nmemb` if the end of the file is reached or an error occurs).

:::tip Using `sizeof`
Always use the `sizeof` operator to determine the `size` argument for `fread` and `fwrite`. This ensures portability, as data type sizes can vary across different systems.
:::

**Example: `fwrite` and `fread` with an array of integers**

```c
#include <stdio.h>
#include <stdlib.h>

#define NUM_INTS 5

int main() {
    FILE *fptr;
    int numbers[NUM_INTS] = {10, 20, 30, 40, 50};
    int read_numbers[NUM_INTS];
    size_t items_written, items_read;

    // Write to binary file
    fptr = fopen("numbers.dat", "wb");
    if (fptr == NULL) {
        perror("Error opening file for writing");
        return 1;
    }
    items_written = fwrite(numbers, sizeof(int), NUM_INTS, fptr);
    if (items_written < NUM_INTS) {
        fprintf(stderr, "Error writing to file or partial write.\n");
    }
    fclose(fptr);
    printf("%zu integers written to numbers.dat\n", items_written);

    // Read from binary file
    fptr = fopen("numbers.dat", "rb");
    if (fptr == NULL) {
        perror("Error opening file for reading");
        return 1;
    }
    items_read = fread(read_numbers, sizeof(int), NUM_INTS, fptr);
    if (items_read < NUM_INTS) {
        if (feof(fptr)) {
            printf("End of file reached before reading all items.\n");
        } else if (ferror(fptr)) {
            perror("Error reading from file");
        }
    }
    fclose(fptr);

    printf("%zu integers read from numbers.dat: ", items_read);
    for (size_t i = 0; i < items_read; i++) {
        printf("%d ", read_numbers[i]);
    }
    printf("\n");

    return 0;
}
```
<div class="output">
<code class="output">
5 integers written to numbers.dat<br/>
5 integers read from numbers.dat: 10 20 30 40 50 
</code>
</div>

### `fprintf` vs. `fwrite` for an Integer

Consider `int x = 31466;` (which is `0x7AEA` in hexadecimal).

1. **`fprintf(fptr, "%d", x);`**
    - Converts the integer `31466` to its character representation `"31466"`.
    - Writes these 5 characters (ASCII bytes) to the file.
    - If you inspect the file with a hex editor (like `xxd`), you'd see the ASCII codes for '3', '1', '4', '6', '6'.
        ```bash
        $ xxd output_fprintf.txt
        00000000: 3331 3436 36                             31466
        ```

2. **`fwrite(&x, sizeof(int), 1, fptr);`**
    - Takes the raw binary representation of `x` from memory (e.g., 4 bytes for a typical `int`).
    - Writes these bytes directly to the file.
    - If `int` is 4 bytes and the system is little-endian, `31466` (0x00007AEA) would be stored as `EA 7A 00 00`.
        ```bash
        $ xxd output_fwrite.bin
        00000000: ea7a 0000                                .z..
        ```

This distinction is crucial. Text files are human-readable; binary files are machine-readable and generally more compact and faster for structured data.

## File Positioning

You can control the file position indicator using these functions:

- **`fseek()`**: Sets the file position indicator to a specific location.
    ```c
    int fseek(FILE *stream, long offset, int origin);
    ```
    - `stream`: The `FILE` pointer.
    - `offset`: Number of bytes to move from `origin`.
    - `origin`: Reference point for the offset. Can be:
        - `SEEK_SET`: Beginning of the file.
        - `SEEK_CUR`: Current file position.
        - `SEEK_END`: End of the file.
    - Returns `0` on success, non-zero on error.

- **`ftell()`**: Returns the current value of the file position indicator.
    ```c
    long ftell(FILE *stream);
    // Returns current position in bytes from the beginning, or -1L on error.
    ```

- **`rewind()`**: Sets the file position indicator to the beginning of the file.
    ```c
    void rewind(FILE *stream);
    // Equivalent to fseek(stream, 0L, SEEK_SET), but clears error indicators.
    ```

**Example: Get file size using `fseek` and `ftell`**
```c
#include <stdio.h>

int main() {
    FILE *fptr = fopen("somefile.txt", "rb"); // Open in binary mode for accurate size
    if (fptr == NULL) {
        perror("Error opening file");
        return 1;
    }

    if (fseek(fptr, 0, SEEK_END) != 0) { // Go to the end of the file
        perror("fseek error");
        fclose(fptr);
        return 1;
    }

    long file_size = ftell(fptr); // Get current position (which is the size)
    if (file_size == -1L) {
        perror("ftell error");
        fclose(fptr);
        return 1;
    }

    printf("File size: %ld bytes\n", file_size);

    rewind(fptr); // Go back to the beginning
    // ... can now read from the start ...
    fclose(fptr);
    return 0;
}
```
:::note
For text files, the value returned by `ftell` might not always correspond to the exact byte count from the beginning on some systems due to character encoding or line ending conversions. For accurate byte offsets and file sizes, it's often better to open files in binary mode (`"rb"`, `"wb"`, etc.) when using `fseek` and `ftell`.
:::

## Buffer Management: `fflush()`

As mentioned, output to files is usually buffered. The `fflush()` function forces a write of any unwritten data in the stream's buffer to the host environment's file.

```c
int fflush(FILE *stream);
```

- If `stream` points to an output stream, `fflush` causes unwritten data to be delivered to the host environment.
- If `stream` is `NULL`, `fflush` flushes all output streams.
- Returns `0` on success, `EOF` on a write error.

`fclose()` automatically calls `fflush()` before closing the file. However, `fflush()` can be useful if you need to ensure data is written at a specific point without closing the file, for example, in applications that log data continuously. Frequent use of `fflush()` can degrade performance.

## Error Handling

After file operations, it's good practice to check for errors using:

- **`ferror()`**: Checks if the error indicator for the given stream is set.
    ```c
    int ferror(FILE *stream);
    // Returns non-zero if error indicator is set, 0 otherwise.
    ```
- **`feof()`**: Checks if the end-of-file indicator for the given stream is set.
    ```c
    int feof(FILE *stream);
    // Returns non-zero if EOF indicator is set, 0 otherwise.
    ```
- **`perror()`**: Prints a system error message corresponding to the current value of `errno`.
    ```c
    void perror(const char *s);
    // Prints s, a colon, a space, the error message, and a newline.
    ```
- **`clearerr()`**: Clears the end-of-file and error indicators for the stream.
    ```c
    void clearerr(FILE *stream);
    ```

## 📝 Exercises

### Exercise 1: Storing Person Data

Create a program `insert_person.c` that prompts the user to enter data for one person (surname, name, gender, birth year) and writes this data as a single record to a binary file named `people.dat`.

**Data Structure:**

- Surname (max 30 characters)
- Name (max 30 characters)
- Gender (a single character: 'M', 'F', 'N')
- Birth Year (integer)

<details>
<summary>Show Solution for Exercise 1</summary>

```c
// insert_person.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h> // For strncpy, if needed for safety, though fgets is better

typedef struct {
    char surname[31];
    char name[31];
    char gender;
    int birth_year;
} Person;

// Helper function to read a line safely
void read_line(char *buffer, int size) {
    if (fgets(buffer, size, stdin) != NULL) {
        // Remove newline character if present
        size_t len = strlen(buffer);
        if (len > 0 && buffer[len - 1] == '\n') {
            buffer[len - 1] = '\0';
        }
    } else {
        buffer[0] = '\0'; // Ensure empty string on error
    }
}

int main() {
    Person p;
    FILE *fptr;

    printf("Enter surname (max 30 chars): ");
    read_line(p.surname, sizeof(p.surname));

    printf("Enter name (max 30 chars): ");
    read_line(p.name, sizeof(p.name));
    
    printf("Enter gender (M/F/N): ");
    char gender_input[5]; // Buffer for gender input
    read_line(gender_input, sizeof(gender_input));
    if (strlen(gender_input) > 0) {
        p.gender = gender_input[0];
    } else {
        p.gender = 'N'; // Default or error
    }

    printf("Enter birth year: ");
    char year_input[10];
    read_line(year_input, sizeof(year_input));
    p.birth_year = atoi(year_input); // Convert string to int

    fptr = fopen("people.dat", "ab"); // Open in append binary mode
    if (fptr == NULL) {
        perror("Error opening people.dat");
        return 1;
    }

    size_t items_written = fwrite(&p, sizeof(Person), 1, fptr);
    if (items_written < 1) {
        fprintf(stderr, "Error writing person data to file.\n");
        fclose(fptr);
        return 1;
    }

    printf("Person data successfully written to people.dat\n");
    fclose(fptr);
    return 0;
}
```
**To compile and run:**
```bash
gcc insert_person.c -o insert_person
./insert_person
```
</details>

### Exercise 2: Reading Person Data

Create a program `read_people.c` that reads all person records from the binary file `people.dat` (created in Exercise 1) and prints them to the console.

<details>
<summary>Show Solution for Exercise 2</summary>

```c
// read_people.c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char surname[31];
    char name[31];
    char gender;
    int birth_year;
} Person;

int main() {
    Person p;
    FILE *fptr;
    int count = 0;

    fptr = fopen("people.dat", "rb"); // Open in read binary mode
    if (fptr == NULL) {
        perror("Error opening people.dat. (Has it been created by insert_person?)");
        return 1;
    }

    printf("--- People Data ---\n");
    // Read records one by one until fread returns 0 (EOF or error)
    while (fread(&p, sizeof(Person), 1, fptr) == 1) {
        count++;
        printf("Record %d:\n", count);
        printf("  Surname: %s\n", p.surname);
        printf("  Name: %s\n", p.name);
        printf("  Gender: %c\n", p.gender);
        printf("  Birth Year: %d\n", p.birth_year);
        printf("--------------------\n");
    }

    if (ferror(fptr)) {
        perror("Error reading from file");
    } else if (count == 0 && feof(fptr)) {
        printf("No records found in people.dat or file is empty.\n");
    } else if (count > 0) {
         printf("%d record(s) read successfully.\n", count);
    }

    fclose(fptr);
    return 0;
}
```
**To compile and run (after running `insert_person` at least once):**
```bash
gcc read_people.c -o read_people
./read_people
```
</details>
