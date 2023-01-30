---
sidebar_position: 2
id: for-loop
title: For loop
hide_title: false
hide_table_of_contents: false
sidebar_label: For loop
description: How the for loop works.
slug: /cpp/for-loop
custom_edit_url: null
---

The first type of loop that we are going to learn is the "for loop".

This is probably the most common and well-known type of loop, for reasons that will become clear in a moment.

First, let's see its syntax:

```cpp
for (initialization; condition; update) {
    // code to be repeated
}
```

### Explanation

- The **initialization** statement sets an initial value for the counter variable. This happens only at the beginning of the loop.
- Before every iteration, including the first one, the **condition** of the for loop is checked and the iterations continue until the condition is evaluated to false. In that case, the loop terminates
- At every iteration, after successful execution of statements inside the body of the loop, the counter is **updated** with a specified increment (or decrement).

For example, this is a **loop that iterates 10 times with a counter starting from 0 and an increment of 1 for each iteration**:

```cpp
for (int i=0; i<10; i++) { // ++i is fine too
    // ...
}
```

<details>
  <summary>Output</summary>
	<div class="output">
		<code class="output">
			0<br/>
			1<br/>
			2<br/>
			3<br/>
			4<br/>
			5<br/>
			6<br/>
			7<br/>
			8<br/>
			9<br/>
		</code>
	</div>
</details>

:::info Note

The letter `i` (and the subsequent `j`, `k` and so on if needed) is conventionally used as the identifier (name) of the loop counter. It typically stands for "index" or "iterator" (or maybe integer, since it's the obvious choice for a loop counter), but you can use any letter you want.

:::

For loops are used to repeat a section of code *known* number of times, so they are especially useful when the number of iterations is known ahead of time. They let us clearly define and change the values of loop variables and integrate a counter directly, unlike the other kinds of loops (while and do-while).

The incrementation can also be bigger than one or negative. If you decrease the counter, you must be cautious about the condition for exiting the loop. See this example:

```cpp
for (int i=20; i>0; i-=2) { // or i=i-2
    // code repeated 10 times
}
```

<details>
  <summary>Output</summary>
	<div class="output">
		<code class="output">
			20<br/>
			18<br/>
			16<br/>
			14<br/>
			12<br/>
			10<br/>
			8<br/>
			6<br/>
			4<br/>
			2<br/>
		</code>
	</div>
</details>

### Off-by-one error

A frequently occurring logic error for programmers is the "off-by-one error", in which the number of iterations of a loop is stated improperly, being either 1 less or 1 more than we would expect. In other words, there's an error in the initial value of the loop variable or in the end condition of the loop.

```cpp
// loop n times
for (int i=1; i<n; i++) { ... } // ❌ n-1 times
for (int i=0; i<=n; i++) { ... } // ❌ n+1 times
for (int i=0; i<n; i++) { ... } // ✔️ n times
```