---
sidebar_position: 23
id: command-line
title: Command Line Arguments
hide_title: false
hide_table_of_contents: false
sidebar_label: Command Line Arguments
description: An overview of command line arguments in C
slug: /c/command-line
custom_edit_url: null
---

Command line arguments allow users to pass information to a C program when it is executed from the command line. This provides a flexible way to configure program behavior without modifying the source code.

## Declaration of main

In C you can declare `main` in two equivalent ways to receive command-line parameters:

```c
extern int main(int argc, char **argv);
extern int main(int argc, char *argv[]);
```

- `argc` (argument count): number of arguments passed, including the program name  
- `argv` (argument vector): array of C-strings, where  
  - `argv[0]` is the program name  
  - `argv[1]` … `argv[argc-1]` are the user-supplied arguments  

The shell splits the command line on whitespace (while keeping text inside double quotes together).

## Printing all parameters

```c title="printargs.c"
#include <stdio.h>

int main(int argc, char **argv)
{
    for (int i = 0; i < argc; ++i) {
        printf("parameter %d: \"%s\"\n", i, argv[i]);
    }
    return 0;
}
```

<div class="output">
<code class="output">
> printargs.exe first second third fourth<br/>
parameter 0: "printargs.exe"<br/>
parameter 1: "first"<br/>
parameter 2: "second"<br/>
parameter 3: "third"<br/>
parameter 4: "fourth"<br/>
</code>
</div>

## Memory representation

Command line arguments are stored as an array of pointers to null-terminated strings, to allow to process arguments as regular C strings.

Each string (`argv[i]`) represents one argument and ends with a `'\0'` character.

The `argv` array itself is terminated by a `NULL` pointer at `argv[argc]`.

## Converting strings to numbers

Often, command line arguments represent numbers but are passed as strings. You need to convert them to numeric types for calculations. The following example shows how to convert arguments to `int` and `float` using standard library functions.

```c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    if (argc < 3) {
        printf("Usage: %s <integer> <float>\n", argv[0]);
        return EXIT_FAILURE;
    }

    int   num   = atoi(argv[1]);
    float value = atof(argv[2]);

    printf("Integer: %d\n", num);
    printf("Float: %.2f\n", value);
    return EXIT_SUCCESS;
}
```
:::note
Common conversion functions:  

- `atoi()`: convert string to integer  
- `atof()`: convert string to float  
- `atol()`: convert string to long integer  
- `strtol()`, `strtod()`, `strtof()`: more robust conversions with error checking  

:::

## Flags and options

Flags (like `-v` or `--verbose`) enable or disable features, while options (like `-f file` or `--file filename`) let users provide extra input or configuration. The example below shows how to handle both types using simple string comparisons:

```c
#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[])
{
    int   verbose = 0;
    char *file    = NULL;

    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-v") == 0 ||
            strcmp(argv[i], "--verbose") == 0) {
            verbose = 1;
        }
        else if ((strcmp(argv[i], "-f") == 0 ||
                  strcmp(argv[i], "--file") == 0) &&
                 i + 1 < argc) {
            file = argv[++i];
        }
    }

    printf("Verbose: %s\n", verbose ? "ON" : "OFF");
    printf("File: %s\n", file ? file : "not provided");
    return 0;
}
```
<div class="output">
<code class="output">
$ ./program -v --file data.txt<br/>
Verbose: ON<br/>
File: data.txt<br/>
</code>
</div>

## Error handling example

When working with command line arguments, it's important to check for errors such as missing or invalid arguments, or files that cannot be opened. The following example shows basic error handling for file input.

```c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    if (argc < 2) {
        fprintf(stderr, "Error: no argument provided\n");
        fprintf(stderr, "Usage: %s <filename>\n", argv[0]);
        return EXIT_FAILURE;
    }

    FILE *f = fopen(argv[1], "r");
    if (!f) {
        fprintf(stderr, "Cannot open '%s'\n", argv[1]);
        return EXIT_FAILURE;
    }
    // ...processing...
    fclose(f);
    return EXIT_SUCCESS;
}
```

:::tip
In VS Code, you can set command line arguments for debugging by editing your `.vscode/launch.json` file and adding them to the `"args"` array of your launch configuration.
:::

---

## 📝 Exercises

### Exercise 1: Calculator

Write a program that accepts three arguments: two numbers and an operator (`+ - * /`) and prints the result.  
<details><summary>Solution</summary>

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[])
{
    if (argc != 4) {
        printf("Usage: %s <num1> <op> <num2>\n", argv[0]);
        return EXIT_FAILURE;
    }

    double a   = atof(argv[1]);
    char  *op  = argv[2];
    double b   = atof(argv[3]);
    double res;

    if      (strcmp(op, "+") == 0) res = a + b;
    else if (strcmp(op, "-") == 0) res = a - b;
    else if (strcmp(op, "*") == 0) res = a * b;
    else if (strcmp(op, "/") == 0) {
        if (b == 0) { printf("Error: division by zero\n"); return EXIT_FAILURE; }
        res = a / b;
    }
    else {
        printf("Unknown operator '%s'\n", op);
        return EXIT_FAILURE;
    }

    printf("%.2f %s %.2f = %.2f\n", a, op, b, res);
    return EXIT_SUCCESS;
}
```

<div class="output">
<code class="output">
> calculator.exe 5 + 3<br/>
5.00 + 3.00 = 8.00<br/><br/>
> calculator.exe 10 / 2<br/>
10.00 / 2.00 = 5.00<br/><br/>
> calculator.exe 7 * 4<br/>
7.00 * 4.00 = 28.00<br/><br/>
> calculator.exe 9 - 12<br/>
9.00 - 12.00 = -3.00<br/><br/>
> calculator.exe 5 / 0<br/>
Error: division by zero<br/><br/>
> calculator.exe 5 ^ 2<br/>
Unknown operator '^'<br/><br/>
> calculator.exe 5 +<br/>
Usage: calculator.exe &lt;num1&gt; &lt;op&gt; &lt;num2&gt;<br/>
</code>
</div>

</details>

### Exercise 2: Count "hello"

Write a program `writehello.c` that takes a single positive integer argument and prints **hello** that many times.  

- If `argc != 2` or the argument is not a positive integer (use `strtol`), return `EXIT_FAILURE`.  
- Otherwise, print **hello** `n` times and return `EXIT_SUCCESS`.

<details><summary>Solution</summary>

```c
#include <stdlib.h>
#include <stdio.h>

int main(int argc, char **argv)
{
    if (argc != 2) {
        return EXIT_FAILURE;
    }
    char *endptr;
    long n = strtol(argv[1], &endptr, 10);
    if (*endptr != '\0' || n <= 0) {
        return EXIT_FAILURE;
    }
    for (long i = 0; i < n; ++i) {
        printf("hello");
    }
    printf("\n");
    return EXIT_SUCCESS;
}
```

<div class="output">
<code class="output">
> writehello.exe 12 && echo Ok!<br/>
hellohellohellohellohellohellohellohellohellohellohellohello<br/>
Ok!<br/><br/>
> writehello.exe -12 && echo Ok!<br/>
<br/>
> writehello.exe xyz && echo Ok!<br/>
<br/>
> writehello.exe 12.8 && echo Ok!<br/>
<br/>
> writehello.exe 6 4 && echo Ok!<br/>
<br/>
> writehello.exe && echo Ok!<br/>
<br/>
> writehello.exe 100 && echo Ok!<br/>
hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello<br/>
Ok!<br/>
</code>
</div>

<br/>

:::note

The `Ok!` message appears because `echo Ok!` is executed only if the program returns `EXIT_SUCCESS` (exit code 0). This is due to the use of the `&&` operator in the command: `writehello.exe ... && echo Ok!`. The `&&` operator ensures that the second command (`echo Ok!`) runs only if the first command succeeds (returns exit code 0). If the program fails (returns `EXIT_FAILURE`), `Ok!` is not printed.

:::

</details>
