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

In C, all I/O operations are performed on **streams**, which are sequences of bytes. A **file** is a common source or destination for a stream.

The C standard library, primarily through `<stdio.h>`, provides an abstraction layer, allowing uniform access to various data sources and sinks (like disk files, keyboard, screen) as if they were all files.

## Data persistence through files

To retain information beyond the execution of a program, we rely on **persistent storage**—typically achieved through files on disk.

A **file stream** in C is:

- An abstraction managed by the operating system's file system, accessed via functions in `<stdio.h>`.
- A named collection of data stored on secondary storage (such as a hard drive or SSD) or a device (like the keyboard or console).
- Conceptually, a sequence of bytes that can be read from or written to sequentially.

Even devices like the keyboard (`stdin`) and screen (`stdout`, `stderr`) are treated as files by C programs, allowing for consistent I/O operations. The C standard library handles the underlying details, so the programmer doesn't need to manage device-specific complexities.

Files are generally categorized by how C interprets their content when opened in different modes:

- **Text files**: When opened in text mode, data is interpreted as sequences of human-readable characters. Special processing, like newline character translation (`\n` to `\r\n` on Windows), might occur. Suitable for configuration files, logs, and documents.
- **Binary files**: When opened in binary mode, data is treated as a raw sequence of bytes, mirroring how it's represented in memory. No translation occurs. Used for images, executables, and structured data.

- **Text files**: Store data as sequences of human-readable characters (e.g., ASCII, UTF-8). Suitable for configuration files, logs, and documents.
- **Binary files**: Store data in raw byte format, mirroring how data is represented in memory. Used for images, executables, and structured data.

:::info Windows vs Unix/Linux: File types and extensions

- On **Windows**, file extensions (like `.txt`, `.bin`, `.exe`) are commonly used to indicate file type, and the OS may treat files differently based on their extension. For example, opening a file in text mode (`"rt"`) or binary mode (`"rb"`) can affect how line endings (`\r\n` vs `\n`) are handled.
    - In text mode on Windows, `\n` (newline) characters are automatically translated to `\r\n` (carriage return + newline) when writing, and `\r\n` is translated back to `\n` when reading.
    - In binary mode, no such translation occurs, preserving the exact byte sequence.
- On **Unix/Linux**, file extensions are not required or enforced by the OS—they are just part of the filename. The kernel treats all files as streams of bytes, regardless of extension. There is no technical distinction between "text" and "binary" files at the OS level; it's up to programs to interpret the contents.
- In fact, in Unix-like systems, **everything is a file**: not just regular files, but also devices, pipes, and even directories are accessed using file descriptors. This unified approach allows powerful tools like `cat`, `less`, or `vim` to open and edit almost any file, though not all files are human-readable as text.

:::

Using files allows programs to save, retrieve, and share data reliably, making persistent data management possible across program runs.

:::note Buffered I/O
In C, file I/O operations are typically **buffered**. This means data is temporarily stored in a buffer (a small region of memory) before being written to the actual file, or read from the file into the buffer. This improves efficiency by reducing the number of direct interactions with the storage device. The C standard library functions like `fopen`, `fread`, `fwrite`, `fprintf`, `fscanf`, etc., operate on these buffered streams.
:::

## Core file operations

Working with files in C generally involves three main phases:

1. **Opening a file**:
    * Request access to the file from the operating system.
    * The OS prepares internal data structures to manage the file.
    * A `FILE` pointer is returned to your program to interact with the file.
2. **Reading/Writing data**:
    * Perform read or write operations using the `FILE` pointer.
    * Data is typically transferred via a buffer.
3. **Closing a file**:
    * Any pending data in the output buffer is written to the file (flushed).
    * Resources allocated by the OS for the file are released.
    * The `FILE` pointer is no longer valid.

## File opening modes

When opening a file, you must specify the mode, which dictates how the file can be accessed. Key modes include:

| Mode | Description |
|------|-------------|
| `"r"` | Opens a text file for reading. The file must exist. |
| `"w"` | Opens a text file for writing. If the file exists, its contents are overwritten. If it doesn't exist, a new file is created. |
| `"a"` | Opens a text file for appending. Data is written to the end of the file. If the file doesn't exist, a new file is created. |
| `"rb"` | Opens a binary file for reading. |
| `"wb"` | Opens a binary file for writing (truncates or creates). |
| `"ab"` | Opens a binary file for appending (creates if non-existent). |

Other modes like `"r+"`, `"w+"`, `"a+"` (and their binary counterparts `"rb+"`, `"wb+"`, `"ab+"`) allow both reading and writing.

## The file position indicator (cursor)

When a file is opened, the system maintains a **file position indicator** (often conceptualized as a cursor). This indicator marks the current position within the file where the next read or write operation will occur.

- For modes `"r"`, `"rb"`, `"w"`, `"wb"`, the cursor is initially at the beginning of the file.
    - Remember: for `"w"` and `"wb"`, existing content is deleted (file is truncated).
- For modes `"a"`, `"ab"`, the cursor is initially at the end of the file. All writes happen at the current end of the file, regardless of explicit positioning attempts with `fseek` before writing.
- After each read or write operation, the cursor automatically advances by the number of bytes read or written.

It's worth noting that **EOF (End-Of-File)** is not a character stored at the end of a file. It's a special signal (a negative integer constant, typically -1) returned by input functions (like `fgetc`, `fscanf`) to indicate that the end of the file has been reached or an error has occurred. The operating system knows the size of the file and signals an end-of-file condition when a read operation attempts to go beyond the last byte.

## Working with files

### The `FILE` structure

All file operations in C are performed using a pointer to a `FILE` structure. This structure is defined in `<stdio.h>` and is an **opaque type**; its internal details are hidden from the programmer and should not be accessed directly. It holds information necessary to manage the stream, such as the buffer, current position, error indicators, and end-of-file status.

You don't need to know the internal details of the `FILE` structure. You'll simply declare a pointer of type `FILE*` and use it with standard library functions. All standard file I/O functions take a `FILE*` as an argument to specify the stream they operate on.

```c
#include <stdio.h>

FILE *fptr; // Declare a file pointer
```

### Opening a file: `fopen()`

The `fopen()` function is used to open a file and associate it with a stream.

```c
FILE* fopen(const char *filename, const char *mode);
```

- `filename`: A string containing the name (and path) of the file.
- `mode`: A string specifying the access mode (e.g., `"r"`, `"w"`, `"rb"`).
- **Return value**:
    - On success, `fopen()` returns a `FILE` pointer.
    - On failure (e.g., file not found for reading, no permission, invalid mode), it returns `NULL`.

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

### Closing a file: `fclose()`

The `fclose()` function is used to close an opened file, disassociating it from the stream.

```c
int fclose(FILE *stream);
```

- `stream`: The `FILE` pointer to the file to be closed.
- **Return value**:
    - Returns `0` on success.
    - Returns `EOF` (a special constant, usually -1) on error.
- `fclose()` flushes any unwritten data from the output buffer to the file and releases system resources (like file descriptors) allocated by the OS for the file.

It's crucial to close files when they are no longer needed. Operating systems have a limit on the number of files a process can have open simultaneously (e.g., 1024 on Linux by default, 2048 on Windows). Failing to close files can lead to resource leaks and prevent the program (or other programs) from opening more files.

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

### Standard I/O streams

When a C program starts, three standard I/O streams are automatically opened:

- `stdin`: Standard input (usually the keyboard).
- `stdout`: Standard output (usually the terminal/screen).
- `stderr`: Standard error (usually the terminal/screen, for error messages).

These are `FILE` pointers. Functions like `printf()` and `scanf()` are convenient wrappers:

- `printf(...)` is equivalent to `fprintf(stdout, ...)`
- `scanf(...)` is equivalent to `fscanf(stdin, ...)`

## 1️⃣ Text file I/O

### Writing to text files

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

### Reading from text files

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

## 2️⃣ Binary file I/O

Binary files store data as raw bytes, exactly as they are represented in memory. This is efficient for non-textual data like images, audio, or complex data structures.

### Writing to binary files: `fwrite()`

```c
size_t fwrite(const void *ptr, size_t size, size_t nmemb, FILE *stream);
```

- `ptr`: Pointer to the array of elements to be written.
- `size`: Size in bytes of each element to be written.
- `nmemb`: Number of elements, each one with a size of `size` bytes.
- `stream`: The `FILE` pointer.
- **Return value**: The number of elements successfully written (which may be less than `nmemb` if an error occurs).

### Reading from binary files: `fread()`

```c
size_t fread(void *ptr, size_t size, size_t nmemb, FILE *stream);
```

- `ptr`: Pointer to a block of memory with a minimum size of `size*nmemb` bytes.
- `size`: Size in bytes of each element to be read.
- `nmemb`: Number of elements, each one with a size of `size` bytes.
- `stream`: The `FILE` pointer.
- **Return value**: The number of elements successfully read (which may be less than `nmemb` if the end of the file is reached or an error occurs).

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

### Text vs binary file operations: A comparison

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

This distinction is crucial:
- Text files are human-readable but less space-efficient
- Binary files are compact and faster for data exchange between programs but not directly readable
- Binary files preserve exact memory representation, which is vital for structured data
- Text files are better for interoperability between systems with different architectures

## File positioning

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
    ```
    
    This function returns the current position in bytes from the beginning of the file, or -1L on error. For files opened in binary mode, this is the exact byte offset from the start. For files opened in text mode, the value might not be a simple byte count due to potential newline translations or other system-specific encodings. However, the value returned by `ftell()` in text mode can still be reliably used with `fseek()` to return to that position.

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
For text files, the value returned by `ftell` might not always correspond to the exact byte count from the beginning on some systems due to character encoding or line ending conversions (e.g., `\n` vs. `\r\n`). 

For accurate byte offsets and file sizes, it's generally better to open files in binary mode (`"rb"`, `"wb"`, etc.) when using `fseek` and `ftell` for arbitrary positioning or size calculation. 

However, any value returned by `ftell()` (even for a text stream) is guaranteed to be usable by `fseek()` with `SEEK_SET` to return to that same position.
:::

## Buffer management: `fflush()`

As mentioned, output to files is usually buffered. The `fflush()` function forces a write of any unwritten data in the stream's buffer to the host environment's file.

```c
int fflush(FILE *stream);
```

- If `stream` points to an output stream, `fflush` causes unwritten data to be delivered to the host environment.
- If `stream` is `NULL`, `fflush` flushes all output streams.
- Returns `0` on success, `EOF` on a write error.

`fclose()` automatically calls `fflush()` before closing the file. However, `fflush()` can be useful if you need to ensure data is written at a specific point without closing the file, for example, in applications that log data continuously. Frequent use of `fflush()` can degrade performance.

## Error handling

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

### Exercise 1: Storing person data

Create a program `insert_person.c` that prompts the user to enter data for one person (surname, name, gender, birth year) and writes this data as a single record to a binary file named `people.dat`.

**Data structure:**

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

### Exercise 2: Reading person data

Create a program `read_people.c` that reads all person records from the binary file `people.dat` (created in Exercise 1) and prints them to the console.

import Spoiler from '@site/src/components/Spoiler';

What to do?
<Spoiler>
<ol>
    <li>Define a <code>person</code> structure.</li>
    <li>In <code>main</code>, define an array of <code>person</code> structures.</li>
    <li>Open the file for reading.</li>
    <li>Read one record at a time, and store the data for each person in an element of the array.</li>
    <li>Print the records that were read.</li>
</ol>
</Spoiler>

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

### Exercise 3: Merging exam records

Create a program that processes student exam records from two different sources:

**Requirements:**
- Read two binary files (`transcript1.bin` and `transcript2.bin`) containing exam records
- Each record consists of:
  - A course name (string up to 20 characters plus null terminator)
  - A grade (integer)
- For each exam, select the higher grade between the two files
- Write a new binary file (`results.bin`) containing all exams with their highest grades
- After writing, read and display the output file to verify correctness
- Use proper error handling for all file operations

**Notes:**
- Both input files have the same structure and contain the same exams in the same order
- Organize your code using functions to handle file operations and data processing
- Define appropriate structures to represent the exam records

<details>
<summary>Show Solution for Exercise 3</summary>

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_COURSE_LEN 21  // 20 characters + null terminator

typedef struct {
    char course[MAX_COURSE_LEN];
    int grade;
} ExamRecord;

int main() {
    ExamRecord rec1, rec2;
    FILE *f1, *f2, *fout;
    
    f1 = fopen("transcript1.bin", "rb");
    f2 = fopen("transcript2.bin", "rb");
    fout = fopen("results.bin", "w+b");  // w+ for write and read
    
    if (f1 == NULL || f2 == NULL || fout == NULL) {
        printf("Error opening one of the files. Exiting...\n");
        exit(-1);
    }

    // Read both files and write the higher grade to the output file
    while (fread(&rec1, sizeof(ExamRecord), 1, f1)) {
        fread(&rec2, sizeof(ExamRecord), 1, f2);
        
        if (strcmp(rec1.course, rec2.course) == 0) {  // Verify courses match
            if (rec1.grade < rec2.grade) {
                rec1.grade = rec2.grade;  // Take the higher grade
            }
            fwrite(&rec1, sizeof(ExamRecord), 1, fout);
        }
    }
    
    fclose(f1);
    fclose(f2);
    
    // Rewind the output file to read from the beginning
    rewind(fout);
    
    // Read and print the results file to verify
    printf("Contents of results.bin:\n");
    printf("------------------------\n");
    printf("%-20s | %s\n", "Course", "Grade");
    printf("------------------------\n");
    
    while (fread(&rec1, sizeof(ExamRecord), 1, fout)) {
        printf("%-20s | %d\n", rec1.course, rec1.grade);
    }
    
    fclose(fout);
    
    return 0;
}
```

</details>

### Exercise 4: Alien communication decoder

NASA operators have intercepted strange signals from an alien civilization! The signals consist of sequences of 'g' and 'G' characters. A secret file has been discovered that contains the key to decode these messages.

**Part 1: Decoding alien messages**

Create a program that:
- Reads a translation key from `correspondence.txt` where:
  - Each line contains a Latin letter, a space, and a 3-character sequence of 'g' and 'G'
  - Example: `H GgG`
- Reads alien messages from `messages.txt` where:
  - Each message consists of sequences of 'g' and 'G' characters grouped in threes
- Decodes each message and displays the translated text
- Uses appropriate data structures to organize the translation data
- Handles file operations safely with error checking

**Part 2: Encoding messages for aliens**

Extend your program to:
- Allow users to input messages in Latin characters
- Encode these messages into the alien 'g'/'G' format
- Display the encoded message
- Design your solution with appropriate functions for modularity

<details>
<summary>Show Solution for Exercise 4</summary>

```c
#include <stdio.h>
#include <string.h>

typedef struct {
    char letter[2];    // Latin letter + null terminator
    char code[4];      // 3 character alien code + null terminator
} TranslationPair;

int main() {
    int table_size = 0;
    int i = 0;
    int j;
    char current_triplet[4];   // Buffer for reading triplets (3 chars + null terminator)
    char message[50];          // Buffer for reading message lines
    FILE *fp;                  // File pointer
    TranslationPair translations[26];  // Array to store letter-code pairs (max 26 letters)

    // Open correspondence.txt file
    fp = fopen("correspondence.txt", "rt");

    // Error handling for file opening
    if (fp == NULL) {
        printf("Cannot open correspondence.txt file\n");
        return -1;
    }

    // Read translation table from file
    while (fscanf(fp, "%s %s", translations[table_size].letter, translations[table_size].code) > 0) {
        printf("%c %s\n", translations[table_size].letter[0], translations[table_size].code);
        table_size++;
    }

    fclose(fp);

    // Open messages.txt file
    fp = fopen("messages.txt", "rt");

    if (fp == NULL) {
        printf("Cannot open messages.txt file\n");
        return -1;
    }

    // Process each line from messages.txt
    printf("\nDecoded messages:\n");
    printf("----------------\n");
    
    while (fscanf(fp, "%s", message) > 0) {
        i = 0;
        printf("Encoded: %s\n", message);
        printf("Decoded: ");

        // Process each triplet in the message
        while (message[i] != '\0') {
            // Extract a triplet
            current_triplet[0] = message[i];
            current_triplet[1] = message[i+1];
            current_triplet[2] = message[i+2];
            current_triplet[3] = '\0';

            // Look up the triplet in our translation table
            for (j = 0; j < table_size; j++) {
                if (strcmp(current_triplet, translations[j].code) == 0) {
                    printf("%c", translations[j].letter[0]);
                    i += 3;  // Move to the next triplet
                    break;
                }
            }
            
            // If no match found, we should have some error handling here
            if (j == table_size) {
                i++;  // Move forward if no match (prevents infinite loop)
            }
        }

        printf("\n\n");
    }

    fclose(fp);

    // Part 2: Encode a message from the user
    printf("Enter a message to encode: ");
    scanf("%s", message);

    // Encode the message
    printf("Encoded: ");
    i = 0;
    while (message[i] != '\0') {
        for (j = 0; j < table_size; j++) {
            if (translations[j].letter[0] == message[i]) {
                printf("%s", translations[j].code);
                break;
            }
        }
        i++;
    }
    printf("\n");

    return 0;
}
```

</details>
