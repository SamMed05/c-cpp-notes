---
sidebar_position: 23
id: important-c-libraries
title: Important C standard libraries
hide_title: false
hide_table_of_contents: false
sidebar_label: Important C libraries
description: Important C standard libraries
slug: /c/important-c-libraries
custom_edit_url: null
---

## `<string.h>`

The `<string.h>` library provides functions for manipulating C strings (null-terminated character arrays) and for general memory block operations.

### String manipulation functions

These functions operate on null-terminated strings.

*   **`size_t strlen(const char *str);`**
    *   Calculates the length of the string `str` (excluding the null terminator).
    :::caution
    Undefined behavior if `str` is not a pointer to a null-terminated array.
    :::

*   **`int strcmp(const char *lhs, const char *rhs);`**
    *   Compares two strings `lhs` and `rhs` lexicographically.
    *   Returns:
        *   `0` if strings are equal.
        *   a negative value if `lhs` comes before `rhs`.
        *   a positive value if `lhs` comes after `rhs`.
    *   Comparison is based on ASCII values.
    :::caution
    Undefined behavior if `lhs` or `rhs` are not pointers to null-terminated arrays.
    :::

*   **`int strncmp(const char *lhs, const char *rhs, size_t count);`**
    *   Compares up to `count` characters of strings `lhs` and `rhs`.
    *   Return value is similar to `strcmp`.
    :::caution
    Undefined behavior if access goes beyond the end of either array if `count` is larger than string lengths.
    :::

*   **`char *strchr(const char *str, int ch);`**
    *   Searches for the first occurrence of the character `ch` (cast to `unsigned char`) in the string `str`.
    *   Returns a pointer to the first occurrence, or `NULL` if not found.
    *   The null terminator can also be searched.

*   **`char *strrchr(const char *str, int ch);`**
    *   Searches for the last occurrence of the character `ch` in `str`.
    *   Returns a pointer to the last occurrence, or `NULL` if not found.

*   **`char *strstr(const char* str, const char* substr);`**
    *   Searches for the first occurrence of the substring `substr` within the string `str`.
    *   Returns a pointer to the beginning of the first occurrence in `str`, or `NULL` if `substr` is not found.
    *   If `substr` is an empty string, returns `str`.
    :::caution
    Undefined behavior if `str` or `substr` are not null-terminated.
    :::

*   **`char *strcpy(char *dest, const char *src);`**
    *   Copies the string `src` (including the null terminator) to `dest`.
    *   Returns `dest`.
    :::danger
    Undefined behavior if `dest` is not large enough.
    Undefined behavior if strings overlap in memory.
    Undefined behavior if `src` is not null-terminated.
    :::

*   **`char *strcat(char *dest, const char *src);`**
    *   Appends (concatenates) the string `src` to the end of `dest`. The first character of `src` overwrites the null terminator of `dest`.
    *   Returns `dest`.
    :::danger
    Undefined behavior if `dest` is not large enough to hold its original content, `src`, and the new null terminator.
    Undefined behavior if strings overlap.
    Undefined behavior if `dest` or `src` are not null-terminated.
    :::

*   **`char *strncpy(char *dest, const char *src, size_t count);`**
    *   Copies up to `count` characters from `src` to `dest`.
    :::warning
    If `src` has fewer than `count` characters, `dest` is padded with null characters up to `count` characters. If `src` has `count` or more characters, **`dest` might not be null-terminated if no null terminator is found within the first `count` characters of `src`**.
    Always performs `count` writes.
    :::
    *   Returns `dest`.

*   **`char *strncat(char *dest, const char *src, size_t count);`**
    *   Appends up to `count` characters from `src` to `dest`, plus a null terminator.
    *   `dest` must be large enough for `strlen(dest) + count + 1` characters.
    *   Always null-terminates the resulting string.
    *   Returns `dest`.

### Memory manipulation functions

These functions operate on generic blocks of memory (arrays of `char` or `void*`) and do not assume null termination. They require the size of the memory block to be specified.

*   **`void *memset(void *dest, int ch, size_t count);`**
    *   Fills the first `count` bytes of the memory area pointed to by `dest` with the constant byte `ch` (cast to `unsigned char`).
    *   Returns `dest`.
    :::caution
    Undefined behavior if `dest` is `NULL` or if `count` exceeds the allocated size of `dest`.
    :::

*   **`void *memchr(const void* ptr, int ch, size_t count);`**
    *   Searches for the first occurrence of `ch` (cast to `unsigned char`) within the first `count` bytes of the memory area pointed to by `ptr`.
    *   Returns a pointer to the matching byte or `NULL` if not found.
    :::caution
    Undefined behavior if `ptr` is `NULL` or if `count` exceeds accessible memory.
    :::

*   **`int memcmp(const void* lhs, const void* rhs, size_t count);`**
    *   Compares the first `count` bytes of memory areas `lhs` and `rhs`.
    *   Return value is similar to `strcmp` (0 for equal, negative if `lhs` < `rhs`, positive if `lhs` > `rhs`).
    :::caution
    Undefined behavior if access goes beyond allocated memory for `lhs` or `rhs`.
    :::

*   **`void *memcpy(void *dest, const void *src, size_t count);`**
    *   Copies `count` bytes from memory area `src` to memory area `dest`.
    *   Returns `dest`.
    :::danger
    Undefined behavior if memory areas `src` and `dest` overlap. Use `memmove` for overlapping regions.
    :::
    :::caution
    Undefined behavior if `dest` or `src` are `NULL` or if `count` leads to access beyond allocated memory.
    :::

*   **`void *memmove(void *dest, const void *src, size_t count);`**
    *   Copies `count` bytes from `src` to `dest`. Handles overlapping memory regions correctly (as if using a temporary buffer).
    *   Returns `dest`.
    :::caution
    Undefined behavior if `dest` or `src` are `NULL` or if `count` leads to access beyond allocated memory.
    :::

## `<assert.h>`

The `<assert.h>` library provides a single macro, `assert`, used for debugging.

*   **`void assert(scalar expression);`**
    *   If `expression` evaluates to false (0), `assert` prints an error message to `stderr` (including the expression, source file name, and line number) and then calls `abort()` to terminate the program.
    *   If `expression` is true (non-zero), `assert` does nothing.
    *   **`NDEBUG` macro**: if the macro `NDEBUG` is defined at the point `<assert.h>` is included, the `assert` macro is disabled and expands to `((void)0)`, meaning it has no effect. `NDEBUG` is typically defined for release builds to remove assertion checks.

```c
// Example:
#include <assert.h>
// #define NDEBUG // Uncomment to disable asserts

int main(void) {
    int x = -5;
    // assert(x > 0); // This would trigger an assertion failure if not NDEBUG
    return 0;
}
```

## `<float.h>` and `<limits.h>`

These libraries define macros that represent various limits and characteristics of fundamental data types. They are crucial for writing portable code.

### `<float.h>`

Defines macros for floating-point types (`float`, `double`, `long double`).
Examples:
*   `FLT_MIN`, `FLT_MAX`: minimum and maximum representable finite float values.
*   `DBL_MIN`, `DBL_MAX`: for `double`.
*   `LDBL_MIN`, `LDBL_MAX`: for `long double`.
*   `FLT_EPSILON`: smallest `x` such that `1.0 + x != 1.0`.
*   `FLT_DIG`, `DBL_DIG`, `LDBL_DIG`: number of decimal digits of precision.
*   `FLT_MANT_DIG`: number of base-`FLT_RADIX` digits in the mantissa.
*   `FLT_MIN_EXP`, `FLT_MAX_EXP`: minimum and maximum integer exponents.

Using these macros ensures that the code uses correct values for the specific architecture and compiler.

### `<limits.h>`

Defines macros for integer types.
Examples:
*   `CHAR_BIT`: number of bits in a `char`.
*   `SCHAR_MIN`, `SCHAR_MAX`: min/max for `signed char`.
*   `UCHAR_MAX`: max for `unsigned char`.
*   `SHRT_MIN`, `SHRT_MAX`: min/max for `short int`.
*   `USHRT_MAX`: max for `unsigned short int`.
*   `INT_MIN`, `INT_MAX`: min/max for `int`.
*   `UINT_MAX`: max for `unsigned int`.
*   `LONG_MIN`, `LONG_MAX`: min/max for `long int`.
*   `ULONG_MAX`: max for `unsigned long int`.
*   `LLONG_MIN`, `LLONG_MAX`: min/max for `long long int` (C99 and later).
*   `ULLONG_MAX`: max for `unsigned long long int` (C99 and later).

## `<time.h>`

The `<time.h>` library provides functions for working with dates and times.

### Time representation

*   **`time_t`**: an arithmetic type capable of representing time. Often a `long long` representing seconds since the Epoch (January 1, 1970, 00:00:00 UTC).
*   **`struct tm`**: a structure holding a calendar date and time broken down into components:
    ```c
    struct tm {
        int tm_sec;   // seconds after the minute - [0, 60] (60 for leap second)
        int tm_min;   // minutes after the hour - [0, 59]
        int tm_hour;  // hours since midnight - [0, 23]
        int tm_mday;  // day of the month - [1, 31]
        int tm_mon;   // months since January - [0, 11]
        int tm_year;  // years since 1900
        int tm_wday;  // days since Sunday - [0, 6]
        int tm_yday;  // days since January 1 - [0, 365]
        int tm_isdst; // Daylight Saving Time flag (>0 if DST is in effect, 0 if not, <0 if information is not available)
    };
    ```

### Core functions

*   **`time_t time(time_t *timer);`**
    *   Returns the current calendar time as a `time_t` value.
    *   If `timer` is not `NULL`, the return value is also stored in the object pointed to by `timer`.
    *   Common usage: `time_t now = time(NULL);`

### Conversions: `time_t` to `struct tm`

These functions convert a `time_t` value into a `struct tm`. The `_r` versions are thread-safe (reentrant) and part of POSIX, standardized in C23.
*   **`struct tm *gmtime_r(const time_t *timer, struct tm *result);`**
    *   Converts `time_t` to `struct tm` expressed in Coordinated Universal Time (UTC).
    *   Stores the result in the user-provided `result` buffer and returns it. Returns `NULL` on error.
*   **`struct tm *localtime_r(const time_t *timer, struct tm *result);`**
    *   Converts `time_t` to `struct tm` expressed in local time (considering timezone and DST).
    *   Stores the result in `result` and returns it. Returns `NULL` on error.
    *   (Note: older, non-thread-safe versions `gmtime()` and `localtime()` exist but return pointers to static internal buffers, making them problematic in multithreaded code or with multiple calls.)
    *   Microsoft provides `gmtime_s` and `localtime_s` which have a different signature but similar purpose.

### Conversions: `struct tm` to string

*   **`errno_t asctime_s(char *buf, rsize_t bufsz, const struct tm *timeptr);` (C11 Annex K - bounds-checking interfaces)**
    *   Converts `struct tm` to a string of the form `"Www Mmm dd hh:mm:ss yyyy\n"`.
    *   `buf` is the user-provided buffer, `bufsz` is its size.
    *   Returns zero on success.
    *   (The older `asctime()` is not bounds-checked and returns a pointer to a static buffer.)

*   **`size_t strftime(char *s, size_t maxsize, const char *format, const struct tm *timeptr);`**
    *   Formats the `struct tm` `timeptr` into the string `s` according to the `format` string.
    *   `maxsize` is the maximum number of characters to write to `s` (including null terminator).
    *   `format` contains conversion specifiers (e.g., `%Y` for year, `%m` for month, `%d` for day, `%H` for hour, `%M` for minute, `%S` for second).
    *   Example format: `"%d/%m/%Y %H:%M:%S"` might produce `"15/11/2023 08:46:20"`.
    *   Returns the number of characters written (excluding null terminator) on success, or 0 if `maxsize` was too small.

### High-precision time (C11)

*   **`struct timespec`**: represents time with nanosecond precision.
    ```c
    struct timespec {
        time_t tv_sec;  // Seconds
        long   tv_nsec; // Nanoseconds [0, 999999999]
    };
    ```
*   **`int timespec_get(struct timespec *ts, int base);`**
    *   Gets the current calendar time with nanosecond resolution.
    *   `ts` points to the `struct timespec` to be filled.
    *   `base` must be `TIME_UTC`. Other values are for future extensions or implementation-defined bases.
    *   Returns `base` on success, 0 on failure.

```c
// Example:
#include <time.h>
#include <stdio.h> // For printf

// For gmtime_r/localtime_r on systems that might not have C23 versions directly
// (e.g., using Microsoft's _s versions as a fallback)
#if defined(_MSC_VER)
struct tm* my_gmtime_r(const time_t* timer, struct tm* buf) {
    return gmtime_s(buf, timer) == 0 ? buf : NULL;
}
struct tm* my_localtime_r(const time_t* timer, struct tm* buf) {
    return localtime_s(buf, timer) == 0 ? buf : NULL;
}
#else
#define my_gmtime_r gmtime_r
#define my_localtime_r localtime_r
#endif

int main(void) {
    time_t now_t = time(NULL);
    struct tm now_tm_utc, now_tm_local;
    char time_str[100];

    if (my_gmtime_r(&now_t, &now_tm_utc)) {
        strftime(time_str, sizeof(time_str), "%Y-%m-%d %H:%M:%S UTC", &now_tm_utc);
        printf("UTC Time: %s\n", time_str);
    }

    if (my_localtime_r(&now_t, &now_tm_local)) {
        strftime(time_str, sizeof(time_str), "%Y-%m-%d %H:%M:%S Local", &now_tm_local);
        printf("Local Time: %s\n", time_str);
    }

    struct timespec ts;
    if (timespec_get(&ts, TIME_UTC)) {
        printf("High-res seconds: %ld, nanoseconds: %ld\n", (long)ts.tv_sec, ts.tv_nsec);
    }
    return 0;
}
```

## `<stdlib.h>` (additional features)

Beyond memory allocation (`malloc`, `free`, etc.), `<stdlib.h>` offers various utility functions.

### Pseudo-random number generation

*   **`int rand(void);`**
    *   Returns a pseudo-random integer in the range `[0, RAND_MAX]`. `RAND_MAX` is a macro defined in `<stdlib.h>` (guaranteed to be at least 32767).
*   **`void srand(unsigned int seed);`**
    *   Initializes (seeds) the pseudo-random number generator used by `rand()`.
    *   Using the same seed will produce the same sequence of random numbers.
    *   To get different sequences on different runs, seed with a value that changes, e.g., current time:
        ```c
        #include <stdlib.h>
        #include <time.h> // For time()
        // ...
        srand((unsigned int)time(NULL)); // Seed once at program start
        int random_num = rand();
        ```

### Program utilities

*   **`void exit(int status);`**
    *   Terminates the calling process immediately. Any open streams are flushed, temporary files are removed, and functions registered with `atexit()` are called.
    *   `status` is an integer value returned to the parent process or operating system.
*   **`EXIT_SUCCESS`**: macro expanding to an integer value (typically 0) indicating successful termination.
*   **`EXIT_FAILURE`**: macro expanding to an integer value (typically 1 or non-zero) indicating unsuccessful termination.
    ```c
    // Example:
    if (/* error condition */) {
        fprintf(stderr, "An error occurred.\n");
        exit(EXIT_FAILURE);
    }
    exit(EXIT_SUCCESS);
    ```

### Integer arithmetic

*   **`int abs(int n);`**
*   **`long labs(long n);`**
*   **`long long llabs(long long n);`** (C99)
    *   Return the absolute value of `n`.

*   **`div_t div(int numer, int denom);`**
    *   Computes `numer / denom` and `numer % denom` simultaneously.
    *   Returns a `div_t` struct:
        ```c
        typedef struct {
            int quot; // quotient
            int rem;  // remainder
        } div_t;
        ```
    *   Similar functions `ldiv_t ldiv(long numer, long denom);` and `lldiv_t lldiv(long long numer, long long denom);` (C99) exist.

### String to number conversion

These functions convert strings to numerical types. They are more robust than older functions like `atoi()`, `atof()`.

*   **Floating-point conversion:**
    *   `double strtod(const char *restrict nptr, char **restrict endptr);`
    *   `float strtof(const char *restrict nptr, char **restrict endptr);` (C99)
    *   `long double strtold(const char *restrict nptr, char **restrict endptr);` (C99)
        *   `nptr`: the string to convert.
        *   `endptr`: if not `NULL`, it's set to point to the character in `nptr` after the last character used in the conversion. This is useful for error checking or parsing multiple numbers from a string.
        *   Skips leading whitespace.
        *   Returns the converted value. If no conversion could be performed, 0 is returned. If the value is out of range, `HUGE_VAL`, `HUGE_VALF`, or `HUGE_VALL` (possibly with a sign) is returned, and `errno` is set to `ERANGE`.

*   **Integer conversion:**
    *   `long int strtol(const char *restrict nptr, char **restrict endptr, int base);`
    *   `long long int strtoll(const char *restrict nptr, char **restrict endptr, int base);` (C99)
    *   `unsigned long int strtoul(const char *restrict nptr, char **restrict endptr, int base);`
    *   `unsigned long long int strtoull(const char *restrict nptr, char **restrict endptr, int base);` (C99)
        *   `nptr`, `endptr`: same as for floating-point versions.
        *   `base`: the numerical base (2-36). If `base` is 0, the base is auto-detected from the string prefix: `0` for octal, `0x` or `0X` for hexadecimal, otherwise decimal.
        *   Returns the converted value. If no conversion, 0 is returned. If out of range, `LONG_MIN/MAX`, `LLONG_MIN/MAX`, `ULONG_MAX`, `ULLONG_MAX` is returned, and `errno` is set to `ERANGE`.

```c {13-18}
// Example strtol:
#include <stdlib.h>
#include <stdio.h>
#include <errno.h> // For errno

int main(void) {
    const char *str = "  12345 and some text";
    char *endptr;
    long val;

    errno = 0; // Clear errno before call

    // Convert the string starting at pointer p to a long integer, 
    // interpreting the number in base 10 (decimal).
    // endptr will point to the first character after the number in the string.
    val = strtol(str, &endptr, 10);
    // val == 12345
    // endptr points to " and some text"

    if (endptr == str) {
        printf("No digits were found.\n");
    } else if (*endptr != '\0') {
        printf("Converted value: %ld\n", val);
        printf("Remaining string: \"%s\"\n", endptr);
    } else {
        printf("Converted value: %ld (entire string consumed)\n", val);
    }

    if (errno == ERANGE) {
        printf("Value out of range.\n");
    }
    return 0;
}
```

<div class="output">
<code class="output">
Converted value: 12345<br/>
Remaining string: " and some text"
</code>
</div>

## `<math.h>`

The `<math.h>` library provides common mathematical functions. Most functions operate on `double` arguments and return `double`. Versions for `float` (suffixed with `f`) and `long double` (suffixed with `l`) also exist (e.g., `sinf()`, `sinl()`).

### Trigonometric functions
(Angles are in radians)
*   `double sin(double x);`
*   `double cos(double x);`
*   `double tan(double x);`
*   `double asin(double x);` (arc sine, result in `[-PI/2, PI/2]`)
*   `double acos(double x);` (arc cosine, result in `[0, PI]`)
*   `double atan(double x);` (arc tangent, result in `[-PI/2, PI/2]`)
*   `double atan2(double y, double x);` (arc tangent of `y/x`, using signs to determine quadrant, result in `[-PI, PI]`)

### Exponential and logarithmic functions
*   `double exp(double x);` (computes e<sup>x</sup>)
*   `double log(double x);` (natural logarithm, ln(x))
*   `double log10(double x);` (base-10 logarithm)
*   `double log2(double x);` (base-2 logarithm, C99)
*   `double exp2(double x);` (computes 2<sup>x</sup>, C99)

### Power and root functions
*   `double pow(double base, double exponent);` (computes base<sup>exponent</sup>)
*   `double sqrt(double x);` (square root, x >= 0)
*   `double cbrt(double x);` (cube root, C99)
*   `double hypot(double x, double y);` (computes sqrt(x<sup>2</sup> + y<sup>2</sup>), C99)

### Rounding and remainder functions
*   `double ceil(double x);` (smallest integer not less than x)
*   `double floor(double x);` (largest integer not greater than x)
*   `double trunc(double x);` (rounds x towards zero, C99)
*   `double round(double x);` (rounds to nearest integer, halfway cases away from zero, C99)
*   `long int lround(double x);` (rounds to nearest long int, C99)
*   `long long int llround(double x);` (rounds to nearest long long int, C99)
*   `double fmod(double x, double y);` (floating-point remainder of x/y. Result has same sign as x.)

### Absolute value
*   `double fabs(double x);` (absolute value for `double`)
*   `float fabsf(float x);`
*   `long double fabsl(long double x);`

### NaN and infinity (C99)
Macros:
*   `NAN`: represents a "Not-a-Number" quiet NaN value.
*   `INFINITY`: represents a positive infinity value.
Functions to check:
*   `int isinf(x)`: returns non-zero if `x` is positive or negative infinity.
*   `int isnan(x)`: returns non-zero if `x` is NaN.
*   `int isfinite(x)`: returns non-zero if `x` is a normal, subnormal, or zero value (not NaN or infinity).
*   `int isnormal(x)`: returns non-zero if `x` is a normal number (not zero, subnormal, NaN, or infinity).

## `<errno.h>`

The `<errno.h>` library provides a way for C library functions to report error conditions.

*   **`errno`**: a macro that expands to a modifiable lvalue of type `int`. It's a global variable (or a macro expanding to a function call that returns a pointer to it, especially in multithreaded environments) that is set by system calls and some library functions when an error occurs.
    :::important
    `errno` is only set on error. It is *not* cleared on success. Therefore, you must set `errno = 0;` *before* calling a function that might set it, and then check its value *after* the call.
    :::
*   **Error code macros**: `<errno.h>` defines symbolic names for common error codes. Examples:
    *   `EDOM`: domain error (e.g., `sqrt(-1)`). Used by `<math.h>`.
    *   `ERANGE`: range error (e.g., result of a function is too large or too small to be represented). Used by `<math.h>` and string conversion functions in `<stdlib.h>`.
    *   `EILSEQ`: illegal byte sequence (relevant for multibyte character conversions).

*   **`char *strerror(int errnum);`** (defined in `<string.h>`)
    *   Takes an error number (`errnum`, typically the value of `errno`) and returns a pointer to a human-readable string describing that error.
    *   The string returned should not be modified by the program.

```c
// Example using errno with sqrt:
#include <math.h>
#include <errno.h>
#include <stdio.h>
#include <string.h> // For strerror

int main(void) {
    double result;

    errno = 0; // Clear errno before the call
    result = sqrt(-1.0);

    if (errno != 0) {
        printf("Error calculating sqrt(-1.0): %s (errno code: %d)\n", strerror(errno), errno);
        if (errno == EDOM) {
            printf("This was a domain error.\n");
        }
    } else {
        printf("sqrt(-1.0) = %f\n", result); // Will likely print nan
    }

    errno = 0;
    result = exp(1000.0); // Might cause a range error
    if (errno == ERANGE) {
         printf("Error calculating exp(1000.0): %s (errno code: %d)\n", strerror(errno), errno);
         printf("Result: %f\n", result); // Will likely print inf
    }

    return 0;
}
```
