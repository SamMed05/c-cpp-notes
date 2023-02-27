---
sidebar_position: 5
id: break-continue
title: Break and continue
hide_title: false
hide_table_of_contents: false
sidebar_label: Break and continue
description: How break and continue commands work.
slug: /cpp/break-continue
custom_edit_url: null
---

To alter the normal flow of the looping constructs, i.e. change their behavior, we can use two important keywords: `break` and `continue`. They both work for all types of loops.

## `break` statement

This instruction (just like for switch statements) is used to **jump out** of a loop. `break` terminates the loop when it is encountered.

### Example 1

```cpp {2-4}
for (int i = 0; i < 5; i++) {
  if (i == 3) {
    break;
  }
  cout << i << endl;
}
```

<div class="output">
<code class="output">
    0<br/>
    1<br/>
    2<br/>
</code>
</div>

### Example 2

:::note

`break` commands are usually used in conjunction with if statements and are the only way to stop an infinite loop (except for closing the program while it's running).

:::

```cpp
int x = 0;

while (true) {
    cout << x << endl;

    if (x > 100) {
        break; 
    }

    x++;
}
```

## `continue` statement

The `continue` statement is used to **skip** the current iteration of the loop and go to the next iteration. Unlike the `break` statement, `continue` doesn't skip all the remaining iterations of the loop but just one.

### Example

```cpp
for (int i = 0; i < 10; i++) {
  if (i > 4) {
    continue;
  }
  // when i > 4 this instruction is no longer executed
  cout << i << "\n";
}
```

<div class="output">
<code class="output">
    0<br/>
    1<br/>
    2<br/>
    3<br/>
    4<br/>
</code>
</div>