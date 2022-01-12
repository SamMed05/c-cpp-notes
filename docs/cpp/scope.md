---
sidebar_position: 5
id: scope
title: Scope
hide_title: false
hide_table_of_contents: false
sidebar_label: Scope
description: What is the scope of variables.
slug: /cpp/scope
custom_edit_url: null
---


## Definition

Each time we declare a variable, depending on where it is declared, we assign it to a certain scope.

A scope is a region of the program (a code block) where the name of that variable can be used to 
refer to the entity.
In other words, it is the extent of the program code within which the variable can be accessed or 
declared or worked with.

In fact, each name that appears in a C++ program is only visible in some limited portion of the 
source code called its scope, also known as **visibility**.

## Types of scope

There are mainly two types of variable scopes:

### Local (block scope)

Local variables are variables declared **inside a code block** (so anything between `{` and `}`, 
like in [functions](https://c-cpp-notes.vercel.app/docs/cpp/functions), if statements, loops etc.) 
and they do not exist outside the block in which they are declared, i.e. they **can not be accessed** 
or used outside that block. Local variables are not known to functions outside their own.

:::note

I know that we still haven't talked about functions and constructs, but don't worry if you don't 
understand this now. You can come back here for reference after reading those parts or when you 
encounter the error `Error: X was not declared in this scope`. I think, though, it's important to 
introduce and cover also this topic before moving on.

:::


### Global (file scope)

Global variables are defined outside of all the functions or blocks, usually on top of the program 
after the linking section. They are visible and accessible **everywhere** in the program, unlike 
local variables, meaning that they are available for use throughout your entire program after their 
declaration.

For now we don't need to know how to declare global variables, just know the difference between 
these two scope types.

## Naming conflicts

It's usually best practice to avoid global variables when unnecessary, because it's easy to 
generate conflicts. 

What if we have two variables with the same name but different scopes?

Usually when two variable with same name are defined then the compiler produces a compile time 
error. But if the variables are defined in different scopes then the compiler allows it.
Whenever there is a local variable defined with same name as that of a global variable then the 
compiler will give **precedence to the local variable**[^1].


[^1]: [GeeksforGeeks.org - Scope of Variables in C++](https://www.geeksforgeeks.org/scope-of-variables-in-c/)