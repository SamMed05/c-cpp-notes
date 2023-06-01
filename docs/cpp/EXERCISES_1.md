---
sidebar_position: 14
id: exercises_1
title: Exercises (Part 1)
hide_title: false
hide_table_of_contents: false
sidebar_label: EXERCISES
description: Exercises.
slug: /cpp/exercises_1
custom_edit_url: null
---

import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Now that you know the theory, it's time for some practice!

In this section you'll find a collection of exercises on what we have done so far (the basics of programming with C++). For each exercise one or multiple solutions are provided, but try to make the program yourself first. Sometimes there will be and hint to help you if you are struggling.

For simplicity, we will (almost always) assume for these exercises that the input of the user is valid. If you want to handle the case of invalid inputs, you may want to use a do-while loop.

A difficulty is assigned to each exercise using a 3-star rating. The difficulty is calibrated for beginners. Keep in mind that it is a subjective parameter, therefore may not be accurate. 


### Compare two numbers (★☆☆)

import compare_two_numbers from '!!raw-loader!./code-snippets/compare-two-numbers.cpp';
import compare_two_numbers_2 from '!!raw-loader!./code-snippets/compare-two-numbers-2.cpp';

Compare two numbers entered by the user and print which one is bigger and lower.

<details>

<summary>Show solution(s)</summary>

<Tabs>
<TabItem value="s1" label="Solution 1">

<CodeBlock 
	language="cpp" 
	title="compare-two-numbers.cpp">
	{compare_two_numbers}
</CodeBlock>

</TabItem>
<TabItem value="s2" label="Solution 2">

<CodeBlock 
	language="cpp" 
	title="compare-two-numbers-2.cpp">
	{compare_two_numbers_2}
</CodeBlock>

</TabItem>

</Tabs>

</details>


### Multiplication loop (★☆☆)

import multiplication_loop from '!!raw-loader!./code-snippets/multiplication-loop.cpp';

Write a program to multiplicate a number entered by the user 10 times and print each multiplication to the console.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
language="cpp" 
title="compare-two-numbers_2.cpp">
{compare_two_numbers_2}
</CodeBlock>

</details>


### Repeated sum (★☆☆)

import repeated_sum from '!!raw-loader!./code-snippets/repeated-sum.cpp';

Write a program that repeatedly asks for integers and adds them together until 0 is entered, then prints the sum.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
language="cpp" 
title="repeated-sum.cpp">
{repeated_sum}
</CodeBlock>

</details>


### Numbers in range (★☆☆)

import numbers_in_range from '!!raw-loader!./code-snippets/numbers-in-range.cpp';

Write a program that asks for the lower and upper limit of a numerical range, then accepts *n* numbers and checks if they are between that range or outside of it, printing the information on screen. The program keeps track of how many numbers arer inside the range with a counter.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
language="cpp" 
title="numbers-in-range.cpp">
{numbers_in_range}
</CodeBlock>

</details>


### Triangle categorizer (★★☆)

import triangle_categorizer from '!!raw-loader!./code-snippets/triangle-categorizer.cpp';

Write a program to check if a triangle is equilateral, isosceles or scalene given the 3 sides.

Note:
- An *equilateral* triangle has all three sides the same length
- An *isosceles* triangle has exactly two sides of the same length
- A *scalene* triangle has all sides of different lengths

Remember: any side of a triangle must be shorter than the other two sides added together. If a side is equal to the other two sides or greater, the triangle is not valid.

Criteria for a valid triangle:

1. a + b > c
2. a + c > b
3. b + c > a

<br/>

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
language="cpp" 
title="triangle-categorizer.cpp">
{triangle_categorizer}
</CodeBlock>

</details>


### Prime numbers (★★☆)

import prime_numbers from '!!raw-loader!./code-snippets/prime-numbers.cpp';
import prime_numbers_2 from '!!raw-loader!./code-snippets/prime-numbers-2.cpp';
import prime_numbers_3 from '!!raw-loader!./code-snippets/prime-numbers-3.cpp';

Write a program that checks whether a number entered by the user is prime or not (partial solution).

<details>

<summary>Show solution(s)</summary>

<Tabs>
<TabItem value="s1" label="Solution 1">
<p>Incomplete solution:</p>
<CodeBlock 
	language="cpp" 
	title="prime-numbers.cpp">
	{prime_numbers}
</CodeBlock>

</TabItem>
<TabItem value="s2" label="Solution 2">
<p>Incomplete solution alternative:</p>
<CodeBlock 
	language="cpp" 
	title="prime-numbers-2.cpp">
	{prime_numbers_2}
</CodeBlock>

</TabItem>
<TabItem value="s3" label="Solution 3 👑">
<p>Complete and efficient solution:</p>
<CodeBlock 
	language="cpp" 
	title="prime-numbers-3.cpp">
	{prime_numbers_3}
</CodeBlock>

Full explanation with code: [Programiz.com](https://www.programiz.com/cpp-programming/examples/prime-number)

</TabItem>

</Tabs>

</details>


### Maximum and minimum number (★★☆)

import max_min_number from '!!raw-loader!./code-snippets/max-min-number.cpp';

Write a program that asks the user for *n* numbers and saves which one is the biggest and the smallest of them. Print max and min to the console.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
language="cpp" 
title="max-min-number.cpp">
{max_min_number}
</CodeBlock>

</details>




### Quadratic equation solver (★★☆)

import quadratic_equation_solver from '!!raw-loader!./code-snippets/quadratic-equation-solver.cpp';

Make a program that solves a quadratic equation using the formula $
x = \frac{-b \pm \sqrt{b^2 + 4ac}}{2a}$, where $\sqrt{b^2 + 4ac}$ is the delta $\Delta$. Use the [`<cmath>` header](https://en.cppreference.com/w/cpp/header/cmath) for performing the exponentiation and the square root (`pow()` and `sqrt()`function respectively).

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
language="cpp" 
title="quadratic-equation-solver.cpp">
{quadratic_equation_solver}
</CodeBlock>

</details>