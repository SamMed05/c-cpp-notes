---
sidebar_position: 1
id: loops
title: Loops
hide_title: false
hide_table_of_contents: false
sidebar_label: Loops
description: How loops work.
slug: /cpp/loops
custom_edit_url: null
---

Oftentimes, programmers need to repeat a certain block of code multiple times.

Since code repetition is impractical and also a bad practice, most programming languages provide a concept called ***loop***, which helps in executing one or more statements up to a desired number of times until a certain condition is reached.

An early form of loop (available both in C and C++ but not in other languages like Java and Python) was the `goto` statement, which transfers the program's flow to another line of code using labels. Although used a lot in the past, `goto` statements are rarely useful and not recommended since they lead to **[spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code)** (unreadable code with a path of execution similar to a bowl of spaghetti, all tangled and twisted) and don't fit with the structured programming paradigm we now use.[^1] 

> "The fact that 'goto' can do anything is exactly why we don't use it" —Bjarne Stroustrup (creator of C/C++)

Loops are a better alternative and they come in various forms:
1. For loop
2. While loop
3. Do-while loop

These three types of loops are a little different from each other, but they all have one fundamental thing in common: the code inside the loop is repeatedly executed, whether a specified number of times or until some condition is met, or even indefinitely.

In the next sections we'll discuss how these loops work exactly.


[^1]: [Wikipedia - Goto](https://en.wikipedia.org/wiki/Goto)