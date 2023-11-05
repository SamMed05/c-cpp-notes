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

Write a program to multiply a number entered by the user 10 times and print each multiplication to the console.

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

Write a program that asks for the lower and upper limit of a numerical range, then accepts *n* numbers and checks if they are between that range or outside of it, printing the information on screen. The program keeps track of how many numbers are inside the range with a counter.

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


### Even or odd? (★☆☆)

import even_or_odd from '!!raw-loader!./code-snippets/even-or-odd.cpp';

Write a program that, given a number *num*, determines if it's even or odd.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="even-or-odd.cpp">
	{even_or_odd}
</CodeBlock>

</details>


### Prime numbers (★★☆)

import prime_numbers from '!!raw-loader!./code-snippets/prime-numbers.cpp';
import prime_numbers_2 from '!!raw-loader!./code-snippets/prime-numbers-2.cpp';
import prime_numbers_3 from '!!raw-loader!./code-snippets/prime-numbers-3.cpp';

Write a program that checks whether a number entered by the user is prime or not.

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


### Maximum number (non-negative) (★☆☆)

import max_number from '!!raw-loader!./code-snippets/max-number.cpp';

Write a program that asks for 10 numbers and finds the maximum. Use a while loop with a counter.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="max-number.cpp">
	{max_number}
</CodeBlock>

</details>


### Maximum and minimum number (★★☆)

import max_min_number from '!!raw-loader!./code-snippets/max-min-number.cpp';

Write a program that asks the user for *n* numbers (either positive, negative or null) and saves which one is the biggest and the smallest of them. Print max and min to the console.

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


### Month duration & leap year (★★☆)

import month_duration_leap_year from '!!raw-loader!./code-snippets/month-duration-leap-year.cpp';

Write a program that, given a month as a number between 1 and 12, informs the user of how many days that month consists of. It's suggested to use a switch-case statement. Handle the leap year case, knowing that a year is a year is "leap" when it is divisible by 4 and not by 100 or it is divisible by 400 ([explanation with code](https://www.programiz.com/cpp-programming/examples/leap-year)).

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="month-duration-leap-year.cpp">
	{month_duration_leap_year}
</CodeBlock>

</details>


### Basic calculator (★☆☆)

import basic_calculator from '!!raw-loader!./code-snippets/basic-calculator.cpp';

Write a program that simulates a simple calculator with the operators +, -, * and /. The user enter two numbers and an operator. Use a `char` for storing the operator.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="basic-calculator.cpp">
	{basic_calculator}
</CodeBlock>

</details>


### Factorial (★★☆)

import factorial from '!!raw-loader!./code-snippets/factorial.cpp';

Write a program that calculates the factorial of a number *n* entered by the user (*n!*).

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="factorial.cpp">
	{factorial}
</CodeBlock>

</details>


### Pythagorean table (★★☆)

import pythagorean_table from '!!raw-loader!./code-snippets/pythagorean-table.cpp';

Write a program that prints on the console the Pythagorean table.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="pythagorean-table.cpp">
	{pythagorean_table}
</CodeBlock>

<div class="output">
<code class="output">

1	2	3	4	5	6	7	8	9	10	
2	4	6	8	10	12	14	16	18	20	
3	6	9	12	15	18	21	24	27	30	
4	8	12	16	20	24	28	32	36	40	
5	10	15	20	25	30	35	40	45	50	
6	12	18	24	30	36	42	48	54	60	
7	14	21	28	35	42	49	56	63	70	
8	16	24	32	40	48	56	64	72	80	
9	18	27	36	45	54	63	72	81	90	
10	20	30	40	50	60	70	80	90	100

</code>
</div>

</details>


### Sum till 50 (★☆☆)

import sum_till_50 from '!!raw-loader!./code-snippets/sum-till-50.cpp';

Write a program that, given a number *num* between 1 and 10, adds its first 10 successors to the number, interrupting the sum prematurely the first time it exceeds the value 50. Print the sum and the index for each iteration and use `break` to interrupt the loop.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="sum-till-50.cpp">
	{sum_till_50}
</CodeBlock>

</details>


### Rectangle pattern (★☆☆)

import rectangle_pattern from '!!raw-loader!./code-snippets/rectangle-pattern.cpp';

Write a program that asks for two integers, a base *b* and a height *h*, and prints the pattern of a rectangle using asterisks/stars ("* ") with *b* stars for the base and h stars for the height (check that both *b* and *h* are numbers between 1 and 10). For example, if b = 5 and h = 3 the output is:

```
* * * * * 
* * * * * 
* * * * * 
```

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="rectangle-pattern.cpp">
	{rectangle_pattern}
</CodeBlock>

</details>


### Right triangle pattern (★☆☆)

import right_triangle_pattern from '!!raw-loader!./code-snippets/right-triangle-pattern.cpp';

Write a program that asks for the number of rows (integer) and prints the pattern of a right triangle (with the right angle on the bottom left) using numbers (use the number if the loop index). For example, if rows = 5 the output is:

```
1 
1 2 
1 2 3 
1 2 3 4 
1 2 3 4 5 
```

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="right-triangle-pattern.cpp">
	{right_triangle_pattern}
</CodeBlock>

</details>


### Pyramid pattern (★★☆)

import pyramid_pattern from '!!raw-loader!./code-snippets/pyramid-pattern.cpp';
import pyramid_pattern_2 from '!!raw-loader!./code-snippets/pyramid-pattern-2.cpp';
import pyramid_pattern_3 from '!!raw-loader!./code-snippets/pyramid-pattern-3.cpp';

Write three programs that print these patterns to the console:
```

    *
   ***
  *****
 *******
*********

    * 
   * * 
  * * * 
 * * * * 
* * * * * 

        *
      * * *
    * * * * *
  * * * * * * *
* * * * * * * * *
```

Each pyramid has 5 rows, but for the last pattern, ask the user how many rows are going to be generated.

<details>

<summary>Show solution(s)</summary>

<Tabs>
<TabItem value="s1" label="Solution 1">
<p>First pattern:</p>
<CodeBlock 
	language="cpp" 
	title="pyramid-pattern.cpp">
	{pyramid_pattern}
</CodeBlock>

</TabItem>
<TabItem value="s2" label="Solution 2">
<p>Second pattern:</p>
<CodeBlock 
	language="cpp" 
	title="pyramid-pattern-2.cpp">
	{pyramid_pattern_2}
</CodeBlock>

</TabItem>
<TabItem value="s3" label="Solution 3">
<p>Third pattern:</p>
<CodeBlock 
	language="cpp" 
	title="pyramid-pattern-3.cpp">
	{pyramid_pattern_3}
</CodeBlock>

</TabItem>

</Tabs>

</details>


### Painting value predictor (★☆☆)

import painting_value_predictor from '!!raw-loader!./code-snippets/painting-value-predictor.cpp';

Write a program that prompts the user to enter the amount they paid for a painting and the number of years until they plan to resell it. Assuming that its value increases by 5% each year, the program estimates the painting's value for each year and displays the result for every year.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="painting-value-predictor.cpp">
	{painting_value_predictor}
</CodeBlock>

</details>


### Pendulum oscillation (★☆☆)

import pendulum_oscillation from '!!raw-loader!./code-snippets/pendulum-oscillation.cpp';

A pendulum oscillates with a period *p* expressed in seconds which is a function of the length *l* in meters of the suspension thread according to the following formula: $p = 2 * \pi * \sqrt{l/g}$ where the constant *g* is the acceleration of gravity, which on Earth is 9.81 m/s^2. Write a C++ program that determines the oscillation period of the pendulum, given its length *l* in centimeters.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="pendulum-oscillation.cpp">
	{pendulum_oscillation}
</CodeBlock>

</details>


### BMI calculator (★☆☆)

import bmi_calculator from '!!raw-loader!./code-snippets/bmi-calculator.cpp';

Write a program that calculates the BMI given a height and weight. The BMI formula is the following:

$$

BMI = \frac{weight}{height^2}

$$

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="bmi-calculator.cpp">
	{bmi_calculator}
</CodeBlock>

</details>


### Time in seconds (★☆☆)

import time_in_seconds from '!!raw-loader!./code-snippets/time-in-seconds.cpp';

Write a program that converts a time expressed in hours, minutes and seconds in only seconds.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="time-in-seconds.cpp">
	{time_in_seconds}
</CodeBlock>

</details>


### Fraction simplifier (★★☆)

import fraction_simplifier from '!!raw-loader!./code-snippets/fraction-simplifier.cpp';

Write a program that prompts the user to enter a fraction as a numerator and denominator. It checks if the denominator is not equal to zero and displays the fraction, then simplifies the fraction and displays the result. Indicate whether the fraction was simplified or not.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="fraction-simplifier.cpp">
	{fraction_simplifier}
</CodeBlock>

</details>