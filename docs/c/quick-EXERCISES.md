---
sidebar_position: 19
id: quick_exercises_1
title: Quick exercises
hide_title: false
hide_table_of_contents: false
sidebar_label: QUICK EXERCISES
description: Quick exercises on various C topics.
slug: /c/quick_exercises_1
custom_edit_url: null
---

import ExCount from '@site/src/components/ExCount';

This page presents a series of short, focused problems designed to help you practice and reinforce your understanding of key C concepts. Try to solve each exercise before revealing the answer and explanation.

> **Tip:** you can click on the exercise number to mark it as completed. This helps you keep track of which exercises you've already solved correctly.

## Pointers

<ExCount><h3>What does the following program print?</h3></ExCount>

```cpp
#include <stdio.h>

int main() {
    int v[4] = {1, 2, 3, 4};
    int *p = v + 1;
    int i;

    *(p + 2) = 6;
    *p = (*p) + 2;
    
    for (i = 0; i < 4; i++) printf("%d ", v[i]);
}
```

<details>
<summary>Answer</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[4] = {1, 2, 3, 4};
    int *p = v + 1;  // p points to v[1] (the second element of v)
    int i;

    *(p + 2) = 6;    // modifies v[3] to 6 (p points to v[1], so p+2 is v[3])
    *p = (*p) + 2;   // modifies v[1] to v[1] + 2 (so v[1] becomes 4)

    for (i = 0; i < 4; i++) cout << v[i] << " ";
    // Final array: {1, 4, 3, 6}
}
```

**Notes:**

The `*` operator has two distinct meanings in pointer-related code:

- **When declaring a pointer:** `int *p;`, `*` indicates that `p` is a pointer to an integer. It tells the compiler that `p` will store the address of an integer variable.

- **When dereferencing a pointer:** `*p = 10;`, `*` is the dereference operator. It accesses the value at the memory address the pointer `p` holds, allowing you to **read and/or modify** that value being pointed to.

- `*(p + n)` accesses the element `n` positions after the one `p` points to.

**Extra note:**

In C and C++, dereferencing a pointer with `*(p + 2)` yields an lvalue (referring to a memory location); when used in a context that requires a value (such as printing), this lvalue undergoes an lvalue-to-rvalue conversion to produce the stored value.

**Output:**
<div class="output">
<code class="output">
1 4 3 6
</code>
</div>

</details>

<ExCount><h3>What does the following program print?</h3></ExCount>

```c
#include <stdio.h>

void f(int *p, int **rp) {
    int *tmp = p;
    p = *rp;
    *tmp = 10;
    *p = 20;
    *rp = p;
}

int main() {
    int a = 10, b = 10;
    int *ptr = &a;
    int *prp = &b;
    f(ptr, &prp);
    printf("%d %d %d %d\n", a, *ptr, b, *prp);
}
```

<details>
<summary>Answer</summary>

```c
#include <stdio.h>

void f(int *p, int **rp) {
    int *tmp = p;         // tmp points to a
    p = *rp;              // p now points to b
    *tmp = 10;            // sets a = 10
    *p = 20;              // sets b = 20
    *rp = p;              // prp still points to b
}

int main() {
    int a = 10, b = 10;
    int *ptr = &a;        // ptr points to a
    int *prp = &b;        // prp points to b
    f(ptr, &prp);
    printf("%d %d %d %d\n", a, *ptr, b, *prp);
    // Output: 10 10 20 20
}
```

**Explanation:**
When we call `f(ptr, &prp)`, we're passing a pointer to `a` and a pointer to the pointer `prp`. Inside the function, `tmp` saves the pointer to `a`, then `p` is redirected to point to `b`. We set `a` to 10 (which doesn't change its value) and `b` to 20. The pointer `prp` continues to point to `b`. After the function call, `a` is 10, `ptr` still points to `a` so `*ptr` is 10, `b` is 20, and `prp` points to `b` so `*prp` is 20.

**Output:**
<div class="output">
<code class="output">
10 10 20 20
</code>
</div>

</details>

<ExCount><h3>What does the following program print?</h3></ExCount>

```c
#include <stdio.h>
#include <stdlib.h>

void f(int i, int *p, int *ri, int **rp) {
    int *q = malloc(sizeof(int)); // or "int *q = new int" in C++
    *q = 10;
    i = 12;
    *rp = q;
    *p = (*q)--;
    *ri = 19;
    (*q)++;
}

int main() {
    int a = 5, b = 3;
    int *ptr;
    ptr = &b;
    int *prp;
    prp = &a;
    f(a, ptr, &b, &prp);
    printf("%d %d %d %d\n", a, *ptr, b, *prp);
    // Note: memory allocated for q is not freed and no return for simplicity.
}
```

<details>
<summary>Answer</summary>

```c
#include <stdio.h>
#include <stdlib.h>

void f(int i, int *p, int *ri, int **rp) {
    int *q = malloc(sizeof(int));  // Allocate memory for q
    *q = 10;                       // Set q to point to value 10
    i = 12;                        // Local variable change, doesn't affect main
    *rp = q;                       // prp now points to q instead of a
    *p = (*q)--;                   // b gets 10, q now points to 9
    *ri = 19;                      // b is set to 19
    (*q)++;                        // q now points to 10 again
}

int main() {
    int a = 5, b = 3;              // Initialize variables
    int *ptr;
    ptr = &b;                      // ptr points to b
    int *prp;
    prp = &a;                      // prp points to a
    f(a, ptr, &b, &prp);
    printf("%d %d %d %d\n", a, *ptr, b, *prp);
    // Output: 5 19 19 10
}
```

**Explanation:**
The function performs several operations:
1. `a` remains unchanged (5) in main because `i` is passed by value
2. `b` is set to 10 through `*p = (*q)--` but then changed to 19 through `*ri = 19`
3. `ptr` points to `b`, so `*ptr` is 19
4. `prp` initially points to `a` but is changed to point to `q` which has value 10

**Output:**
<div class="output">
<code class="output">
5 19 19 10
</code>
</div>

</details>
