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

#### Compare two numbers (★☆☆)

import compare_two_numbers from '!!raw-loader!./codeSnippets1/compare-two-numbers.cpp';
import compare_two_numbers_2 from '!!raw-loader!./codeSnippets1/compare-two-numbers_2.cpp';

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
	title="compare-two-numbers_2.cpp">
	{compare_two_numbers_2}
</CodeBlock>

</TabItem>

</Tabs>

</details>
