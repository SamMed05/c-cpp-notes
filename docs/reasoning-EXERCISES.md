---
sidebar_position: 20
id: reasoning_exercises
title: Reasoning exercises
hide_title: false
hide_table_of_contents: false
sidebar_label: 🧠 Reasoning Exercises
description: Exercises that makes you reason on the code meaning and execution.
slug: /reasoning_exercises
custom_edit_url: null
---

import ExCount from '@site/src/components/ExCount';

:::info **Want more (easier) practice?**
Try the [C Programming Quiz](/c/quiz) for a variety of multiple-choice questions on C (but also C++) concepts!
:::

This page presents a series of short, focused problems designed to help you practice and reinforce your understanding of key C concepts. Try to solve each exercise before revealing the answer and explanation.

> **Tip:** you can click on the exercise number to mark it as completed. This helps you keep track of which exercises you've already solved correctly.

## Function calling

<ExCount><h3>What does the following program print?</h3></ExCount>

```cpp
#include<iostream>
using namespace std;

int f2(int n) {
    cout << n << " ";
    return --n;
}

int f3(int n) {
    cout << n << " ";
    if (n % 2) {
        return n - 1;
    }
    return f2(n - 1);
}

int f(int n) {
    if (n == 0) {
        return 0;
    } else if (n < 4) {
        cout << n << " ";
        f(f3(n--));
    } else if (n < 2) {
        return f2(n - 1);
    } else {
        return f(n - 1);
    }
    return n;
}

int main() {
    cout << f(5);
    return 0;
}
```

<details>
<summary>Answer</summary>

1. `f(5)`: `n=5` (≥4) → returns `f(4)`
2. `f(4)`: `n=4` (≥4) → returns `f(3)`
3. `f(3)`: `n=3` (<4)
    - prints `3 `
    - calls `f3(3--)`:
        - `f3(3)` prints `3 ` and since `n % 2` is 1 (≠ 0, so `true`) returns `2`
    - calls `f(2)`
4. `f(2)`: `n=2` (<4)
    - prints `2 `
    - calls `f3(2--)`:
        - `f3(2)` prints `2 `, even → calls `f2(1)`
            - `f2(1)` prints `1 `, returns `0`
        - `f3` returns `0`
    - calls `f(0)` → returns `0`
    - `f(2)` returns `2`
5. `f(3)` returns `3` → `f(4)` returns `3` → `f(5)` returns `3`
6. `main`'s `cout << f(5)` prints `3`

**Output:**
<div class="output">
<code class="output">
3 3 2 2 1 3
</code>
</div><br/>

<iframe width="800" height="610" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=%23include%3Ciostream%3E%0Ausing%20namespace%20std%3B%0A%0Aint%20f2%28int%20n%29%20%7B%0A%20%20%20%20cout%20%3C%3C%20n%20%3C%3C%20%22%20%22%3B%0A%20%20%20%20return%20--n%3B%0A%7D%0A%0Aint%20f3%28int%20n%29%20%7B%0A%20%20%20%20cout%20%3C%3C%20n%20%3C%3C%20%22%20%22%3B%0A%20%20%20%20if%20%28n%20%25%202%29%20%7B%0A%20%20%20%20%20%20%20%20return%20n%20-%201%3B%0A%20%20%20%20%7D%0A%20%20%20%20return%20f2%28n%20-%201%29%3B%0A%7D%0A%0Aint%20f%28int%20n%29%20%7B%0A%20%20%20%20if%20%28n%20%3D%3D%200%29%20%7B%0A%20%20%20%20%20%20%20%20return%200%3B%0A%20%20%20%20%7D%20else%20if%20%28n%20%3C%204%29%20%7B%0A%20%20%20%20%20%20%20%20cout%20%3C%3C%20n%20%3C%3C%20%22%20%22%3B%0A%20%20%20%20%20%20%20%20f%28f3%28n--%29%29%3B%0A%20%20%20%20%7D%20else%20if%20%28n%20%3C%202%29%20%7B%0A%20%20%20%20%20%20%20%20return%20f2%28n%20-%201%29%3B%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20return%20f%28n%20-%201%29%3B%0A%20%20%20%20%7D%0A%20%20%20%20return%20n%3B%0A%7D%0A%0Aint%20main%28%29%20%7B%0A%20%20%20%20cout%20%3C%3C%20f%285%29%3B%0A%20%20%20%20return%200%3B%0A%7D&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=8&heapPrimitives=nevernest&origin=opt-frontend.js&py=cpp_g%2B%2B9.3.0&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>

[🔗 Permanent link](https://pythontutor.com/render.html#code=%23include%3Ciostream%3E%0Ausing%20namespace%20std%3B%0A%0Aint%20f2%28int%20n%29%20%7B%0A%20%20%20%20cout%20%3C%3C%20n%20%3C%3C%20%22%20%22%3B%0A%20%20%20%20return%20--n%3B%0A%7D%0A%0Aint%20f3%28int%20n%29%20%7B%0A%20%20%20%20cout%20%3C%3C%20n%20%3C%3C%20%22%20%22%3B%0A%20%20%20%20if%20%28n%20%25%202%29%20%7B%0A%20%20%20%20%20%20%20%20return%20n%20-%201%3B%0A%20%20%20%20%7D%0A%20%20%20%20return%20f2%28n%20-%201%29%3B%0A%7D%0A%0Aint%20f%28int%20n%29%20%7B%0A%20%20%20%20if%20%28n%20%3D%3D%200%29%20%7B%0A%20%20%20%20%20%20%20%20return%200%3B%0A%20%20%20%20%7D%20else%20if%20%28n%20%3C%204%29%20%7B%0A%20%20%20%20%20%20%20%20cout%20%3C%3C%20n%20%3C%3C%20%22%20%22%3B%0A%20%20%20%20%20%20%20%20f%28f3%28n--%29%29%3B%0A%20%20%20%20%7D%20else%20if%20%28n%20%3C%202%29%20%7B%0A%20%20%20%20%20%20%20%20return%20f2%28n%20-%201%29%3B%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20return%20f%28n%20-%201%29%3B%0A%20%20%20%20%7D%0A%20%20%20%20return%20n%3B%0A%7D%0A%0Aint%20main%28%29%20%7B%0A%20%20%20%20cout%20%3C%3C%20f%285%29%3B%0A%20%20%20%20return%200%3B%0A%7D&cumulative=false&curInstr=1&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=cpp_g%2B%2B9.3.0&rawInputLstJSON=%5B%5D&textReferences=false)

</details>

<ExCount><h3>What does the following program print? (functions pointers)</h3></ExCount>

```cpp
#include <iostream>
using namespace std;

int f1(int p) { return (p * p); }
int f2(int p) { return (p * 2); }
void f(int (*fun1)(int), int (*fun2)(int), int *v, int n) {
    for (int i = 0; i < n; i++)
        if (i < 2)
            v[i] = fun1(v[i] + 1);
        else
            v[i] = fun2(v[i] + v[i - 2]);
}

int main() {
    int a[] = {0, 1, 1, 0};
    f(f1, f2, a, 4);
    for (int i = 0; i < 4; i++)
        cout << a[i] << " ";
    cout << endl;
    return 0;
}
```

<details>
<summary>Answer</summary>

**How the call works:**  
- `f(f1, f2, a, 4);` passes two function pointers (`f1` and `f2`), the array `a`, and its length `4` into `f`.  
- Inside `f`, the parameter `fun1` refers to `f1` and `fun2` refers to `f2`.  
- `f` then applies these callbacks to array elements based on the index.

**Element-by-element computation:**  
- i = 0 (<2): v[0] = fun1(0+1) = f1(1) = 1×1 = 1  
- i = 1 (<2): v[1] = fun1(1+1) = f1(2) = 2×2 = 4  
- i = 2 (≥2): v[2] = fun2(1 + v[0]) = f2(1+1) = f2(2) = 2×2 = 4  
- i = 3 (≥2): v[3] = fun2(0 + v[1]) = f2(0+4) = f2(4) = 2×4 = 8  

**Output sequence:**
<div class="output">
<code class="output">
1 4 4 8
</code>
</div><br/>

<iframe width="800" height="650" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=%23include%20%3Ciostream%3E%0Ausing%20namespace%20std%3B%0A%0Aint%20f1%28int%20p%29%20%7B%20return%20%28p%20*%20p%29%3B%20%7D%0Aint%20f2%28int%20p%29%20%7B%20return%20%28p%20*%202%29%3B%20%7D%0Avoid%20f%28int%20%28*fun1%29%28int%29,%20int%20%28*fun2%29%28int%29,%20int%20*v,%20int%20n%29%20%7B%0A%20%20%20%20for%20%28int%20i%20%3D%200%3B%20i%20%3C%20n%3B%20i%2B%2B%29%0A%20%20%20%20%20%20%20%20if%20%28i%20%3C%202%29%0A%20%20%20%20%20%20%20%20%20%20%20%20v%5Bi%5D%20%3D%20fun1%28v%5Bi%5D%20%2B%201%29%3B%0A%20%20%20%20%20%20%20%20else%0A%20%20%20%20%20%20%20%20%20%20%20%20v%5Bi%5D%20%3D%20fun2%28v%5Bi%5D%20%2B%20v%5Bi%20-%202%5D%29%3B%0A%7D%0A%0Aint%20main%28%29%20%7B%0A%20%20%20%20int%20a%5B%5D%20%3D%20%7B0,%201,%201,%200%7D%3B%0A%20%20%20%20f%28f1,%20f2,%20a,%204%29%3B%0A%20%20%20%20for%20%28int%20i%20%3D%200%3B%20i%20%3C%204%3B%20i%2B%2B%29%0A%20%20%20%20%20%20%20%20cout%20%3C%3C%20a%5Bi%5D%20%3C%3C%20%22%20%22%3B%0A%20%20%20%20cout%20%3C%3C%20endl%3B%0A%20%20%20%20return%200%3B%0A%7D&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=25&heapPrimitives=nevernest&origin=opt-frontend.js&py=cpp_g%2B%2B9.3.0&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>

[🔗 Permanent link](https://pythontutor.com/render.html#code=%23include%20%3Ciostream%3E%0Ausing%20namespace%20std%3B%0A%0Aint%20f1%28int%20p%29%20%7B%20return%20%28p%20*%20p%29%3B%20%7D%0Aint%20f2%28int%20p%29%20%7B%20return%20%28p%20*%202%29%3B%20%7D%0Avoid%20f%28int%20%28*fun1%29%28int%29,%20int%20%28*fun2%29%28int%29,%20int%20*v,%20int%20n%29%20%7B%0A%20%20%20%20for%20%28int%20i%20%3D%200%3B%20i%20%3C%20n%3B%20i%2B%2B%29%0A%20%20%20%20%20%20%20%20if%20%28i%20%3C%202%29%0A%20%20%20%20%20%20%20%20%20%20%20%20v%5Bi%5D%20%3D%20fun1%28v%5Bi%5D%20%2B%201%29%3B%0A%20%20%20%20%20%20%20%20else%0A%20%20%20%20%20%20%20%20%20%20%20%20v%5Bi%5D%20%3D%20fun2%28v%5Bi%5D%20%2B%20v%5Bi%20-%202%5D%29%3B%0A%7D%0A%0Aint%20main%28%29%20%7B%0A%20%20%20%20int%20a%5B%5D%20%3D%20%7B0,%201,%201,%200%7D%3B%0A%20%20%20%20f%28f1,%20f2,%20a,%204%29%3B%0A%20%20%20%20for%20%28int%20i%20%3D%200%3B%20i%20%3C%204%3B%20i%2B%2B%29%0A%20%20%20%20%20%20%20%20cout%20%3C%3C%20a%5Bi%5D%20%3C%3C%20%22%20%22%3B%0A%20%20%20%20cout%20%3C%3C%20endl%3B%0A%20%20%20%20return%200%3B%0A%7D&cumulative=false&curInstr=25&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=cpp_g%2B%2B9.3.0&rawInputLstJSON=%5B%5D&textReferences=false)

</details>

<ExCount><h3>Complete the functions in XXX and YYY so the program prints <code>4 2 3 15 9</code></h3></ExCount>

```cpp
#include <iostream>
using namespace std;

int f1(int n) {
    XXX
}

int f2(int n) {
    YYY
}

int main() {
    int a[] = {1, 4, 2, 3, 9};
    for (int i = 0; i < 4; i++) {
        if (i % 2)
            a[i] = f1(i);
        else
            a[i] = f2(a[i]);
        a[i] = a[i] | a[i + 1];
    }
    for (int i = 0; i < 5; i++)
        cout << a[i] << " ";
}
```

<details>
<summary>Solution</summary>

The two missing lines are (multiple solutions):

- XXX: `return n * 2;` and YYY: `return n / 2;`
- XXX: `return n * 2;` and YYY: `return n - 1;`
- XXX: `return n << 1;` and YYY: `return 0;`

With these definitions the program outputs:
    
<div class="output">
<code class="output">
4 2 3 15 9
</code>
</div>
</details>


<ExCount><h3>What does the following program print? (functions pointers)</h3></ExCount>

```cpp
#include <iostream>
using namespace std;

int f1(int n) {
    return n - 1;
}

int f2(int n) {
    return n - 2;
}

int f(int n, int (*fun)(int)) {
    if (n < 0)
        return n;
    if (n % 2 == 0)
        return f(fun(n), fun);
    else
        return f(fun(n), f2);
}

int main() {
    cout << f(6, f2);
    return 0;
}
```

<details>
<summary>Answer</summary>

**What is `fun`?**

The parameter `fun` in `f(int n, int (*fun)(int))` is a pointer to a function that takes an `int` and returns an `int`. By passing in `f1` or `f2`, you tell `f` which helper function to apply at each recursive call.

**Step-by-step evaluation:**

1. f(6, f2): 6 ≥ 0 and even
   → f(f2(6)=4, f2)  
2. f(4, f2): even  
   → f(f2(4)=2, f2)  
3. f(2, f2): even  
   → f(f2(2)=0, f2)  
4. f(0, f2): even  
   → f(f2(0)=−2, f2)  
5. f(−2, f2): n < 0 → returns −2  

Final output:
<div class="output">
<code class="output">
-2
</code>
</div>
</details>



























---


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

<ExCount><h3>What does the following program print?</h3></ExCount>

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[6] = {0, 3, 4, 6, 6, 5};
    int *p = &a[2];

    a[*p] = a[*(p - 1)];
    a[3] = *a;
    p = p - 2;
    *p = 18;
    *(p + 1) = *(p + 3);

    for (int i = 0; i < 6; i++) {
        cout << a[i] << " ";
    }
}
```

<details>
<summary>Answer and explanation</summary>

At the start the array `a` is `{0, 3, 4, 6, 6, 5}` and the pointer `p` points to `a[2]` (value `4`).  

1. The line `a[*p] = a[*(p-1)];` means “take `*p` (which is `4`) as the LHS index, and `*(p-1)` (which reads `a[1] = 3`) as the RHS index for `a`. So we assign `a[4] = a[3]`, writing `6` into `a[4]` (it stays `6`).  
2. Next, `a[3] = *a;` sets `a[3]` to the first element `a[0]`, which is `0`.  
3. After `p = p - 2;`, `p` points back to `a[0]`. Then `*p = 18;` writes `18` into `a[0]`.  
4. Finally, `*(p+1) = *(p+3);` takes `a[3]` (now `0`) and stores it into `a[1]`, making `a[1] = 0`.  

At this point the array is:.

<div class="output">
<code class="output">
18 0 4 0 6 5
</code>
</div>
</details>
