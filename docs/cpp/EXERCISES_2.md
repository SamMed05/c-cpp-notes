---
sidebar_position: 16
id: exercises_2
title: Exercises (Part 2)
hide_title: false
hide_table_of_contents: false
sidebar_label: EXERCISES
description: Exercises.
slug: /cpp/exercises_2
custom_edit_url: null
---

import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Now that you know the theory, it's time for some practice!

In this section you'll find a collection of exercises on what we have done since the last training (the generation of random numbers with C++). For each exercise one or multiple solutions are provided, but try to make the program yourself first. Sometimes there will be and hint to help you if you are struggling.

For simplicity, we will (almost always) assume for these exercises that the input of the user is valid. If you want to handle the case of invalid inputs, you may want to use a do-while loop. Also, all exercises (except for the first) require the use of dynamic random numbers generation (using `srand()`), so avoid static generation.

A difficulty is assigned to each exercise using a 3-star rating. The difficulty is calibrated for beginners. Keep in mind that it is a subjective parameter, therefore may not be accurate.


### Pseudorandom number generation (★☆☆)

import prng_static from '!!raw-loader!./code-snippets/random/prng-static.cpp';
import prng_dynamic from '!!raw-loader!./code-snippets/random/prng-dynamic.cpp';

Write a program to generate 5 random numbers between 1 and 10 statically, then convert the program to use the `srand()` function, generating dynamic random numbers.

<details>

<summary>Show solution(s)</summary>

<Tabs>
<TabItem value="s1" label="Solution 1">

<CodeBlock 
	language="cpp" 
	title="prng-static.cpp">
	{prng_static}
</CodeBlock>

</TabItem>
<TabItem value="s2" label="Solution 2">

<CodeBlock 
	language="cpp" 
	title="prng-dynamic.cpp">
	{prng_dynamic}
</CodeBlock>

</TabItem>

</Tabs>

</details>


### Greatest and smallest number (★☆☆)

import greatest_and_smallest_number from '!!raw-loader!./code-snippets/random/greatest-and-smallest-number.cpp';

Write a program that generates dynamically two numbers, then prints out what is the greatest and smallest of the two.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="greatest-and-smallest-number.cpp">
	{greatest_and_smallest_number}
</CodeBlock>

</details>


### Greatest number (★☆☆)

import greatest_number from '!!raw-loader!./code-snippets/random/greatest-number.cpp';

Write a program that generates 10 random numbers between 5 and 30, then determines the greatest among them.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="greatest-number.cpp">
	{greatest_number}
</CodeBlock>

</details>


### Heads or tails (★☆☆)

import heads_or_tails from '!!raw-loader!./code-snippets/random/head-or-tails.cpp';

Write a program that simulates the toss of 3 coins, prints out the results and counts how many heads and tails came out.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="head-or-tails.cpp">
	{heads_or_tails}
</CodeBlock>

</details>


### Perfect square (★☆☆)

import perfect_square from '!!raw-loader!./code-snippets/random/perfect-square.cpp';

Write a program that generates 3 positive random numbers between 1 and 10 (extremes included), then prints out whether their sum is a perfect square or not.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="perfect-square.cpp">
	{perfect_square}
</CodeBlock>

</details>


### Count multiples (★☆☆)

import count_multiples from '!!raw-loader!./code-snippets/random/count-multiples.cpp';

Write a program that generates *n* positive random numbers (let the user choose *n*) in a non-specified range and counts how many numbers are multiples of 3, printing them on the console.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="count-multiples.cpp">
	{count_multiples}
</CodeBlock>

</details>


### Random average (★☆☆)

import random_average from '!!raw-loader!./code-snippets/random/rand-average.cpp';

Write a program that generates 20 random numbers in the interval [5, 30], calculates the average and counts how how many numbers are greater than 20, printing all information on the console.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="rand-average.cpp">
	{random_average}
</CodeBlock>

</details>


### Dice roll (★☆☆)

import dice_roll from '!!raw-loader!./code-snippets/random/dice-roll.cpp';

Write a program that simulates the roll of a six-sided dice (where each side has a unique number) for *n* times, showing the results and how many times the number 6 came out.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="dice-roll.cpp">
	{dice_roll}
</CodeBlock>

</details>


### Vowels counter (★★☆)

import vowels_counter from '!!raw-loader!./code-snippets/random/vowels-counter.cpp';

Write a program that generates 3 uppercase characters of the English alphabet and prints how many of these characters are vowels on the terminal.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="vowels-counter.cpp">
	{vowels_counter}
</CodeBlock>

</details>


### Guess the number (★☆☆)

import guess_the_number from '!!raw-loader!./code-snippets/random/guess-the-number.cpp';
import guess_the_number_with_n_attempts from '!!raw-loader!./code-snippets/random/guess-the-number-with-n-attempts.cpp';

Write a program to generate a random number between 1 and 20 that the user has to guess. Give the user some hints after their attempts, revealing if the generated number is greater or smaller than the one entered on the console. Write a variation of the program where there are only 3 attempts to guess the number, but reduce the range to [1, 10].

<details>

<summary>Show solution(s)</summary>

<Tabs>
<TabItem value="s1" label="Solution 1">

<CodeBlock 
	language="cpp" 
	title="guess-the-number.cpp">
	{guess_the_number}
</CodeBlock>

</TabItem>
<TabItem value="s2" label="Solution 2">

<CodeBlock 
	language="cpp" 
	title="guess-the-number-with-n-attempts.cpp">
	{guess_the_number_with_n_attempts}
</CodeBlock>

</TabItem>

</Tabs>

</details>


### Prime numbers (★★☆)

import prime_numbers from '!!raw-loader!./code-snippets/random/prime-numbers.cpp';
import prime_numbers_with_bool from '!!raw-loader!./code-snippets/random/prime-numbers-with-bool.cpp';

Write a program that generates 10 numbers in the interval [10, 100] (extremes included) then counts how many prime numbers have been generated.

<details>

<summary>Show solution(s)</summary>

<Tabs>
<TabItem value="s1" label="Solution 1">

<CodeBlock 
	language="cpp" 
	title="prime-numbers.cpp">
	{prime_numbers}
</CodeBlock>

</TabItem>
<TabItem value="s2" label="Solution 2">

<CodeBlock 
	language="cpp" 
	title="prime-numbers-with-bool.cpp">
	{prime_numbers_with_bool}
</CodeBlock>

</TabItem>

</Tabs>

</details>


### Dividers (★★☆)

import dividers from '!!raw-loader!./code-snippets/random/dividers.cpp';

Write a program that generates 10 numbers in the interval [10, 50] (extremes included) then prints out all the dividers (those without the remainder) of the generated number.

<details>

<summary>Show solution(s)</summary>

<CodeBlock 
	language="cpp" 
	title="dividers.cpp">
	{dividers}
</CodeBlock>

</details>
