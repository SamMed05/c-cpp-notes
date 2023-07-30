---
sidebar_position: 6
id: for-each
title: For-each loop
hide_title: false
hide_table_of_contents: false
sidebar_label: For-each
description: How the for-each loop works.
slug: /cpp/for-each
custom_edit_url: null
---

A more recent and less known type of loop is the for-each loop. It was introduced with the C++11 (2011) and it is useful for iterating over the elements of an array (or other iterable data structures) quickly.

:::caution

We haven't talked about arrays and other structured data types yet. If you don't know what they are tou can safely skip this page and go to the next session. You can come back later when we'll talk about arrays in a future lesson.

:::

It is a more convenient way to traverse the elements because it eliminates the the need for explicit index manipulation, making the code cleaner and less error-prone. The key aspect of this type of loop is that it **executes whatever is defined inside it's body for every element** rather than doing something n times like a simple for loop would.

The syntax of the for-each loop in C++ is the following:

```cpp
for (type var_name : array_name) {
    // statements (using the var_name)
}
```

### Explanation

- `type` represents the data type of the elements in the array or collection you want to iterate over. For example, if you have an array of integers, int would be the type.
- `var_name` is the name you give to a new variable that will hold the value of each element in the collection during each iteration of the loop. At every new iteration, `var_name` will hold the value of the next element in the container.
- `array_name` is the name of the array or collection you want to traverse. It can be any iterable data set (array, vector, list, etc).

Inside the body of the loop, you can use the `var_name` to access and manipulate the elements of the collection. The loop will automatically iterate over each element of the array and terminate once it has processed all the elements in the collection.

To demonstrate the use of the for-each loop, suppose we want to calculate the sum of the elements in an array:

```cpp
#include <iostream>
using namespace std;

int main() {
    int numbers[] = {1, 2, 3, 4, 5};

    int sum = 0;
    for (int num : numbers) {
        sum += num;
    }

    cout << "The sum of the elements is: " << sum << endl;

    return 0;
}
```

In this example, we use the for-each loop to iterate over each element in the array `numbers`. The variable `num` takes the value of each element in the array during each iteration, and we add it to the `sum` variable. After the loop finishes, we print the sum of the elements.

:::info

Instead of explicitly defining the type of the loop variable (int num in the example above), you can use the auto keyword in the for-each loop to let the compiler automatically deduce the type of the loop variable. The compiler will infer the correct type based on the elements in the collection you are iterating over.

```cpp {8}
#include <iostream>
using namespace std;

int main() {
    int numbers[] = {1, 2, 3, 4, 5};

    int sum = 0;
    for (auto num : numbers) {
        sum += num;
    }

    cout << "The sum of the elements is: " << sum << endl;

    return 0;
}
```

Using the `auto` keyword is generally recommended because the loop variable's type should always be the same as the array elements, so it's better to let the compiler deduce the correct type of the loop variable automatically, avoiding errors that can occur especially in situations where the type can be complex or not immediately obvious.

:::

### References

But there's a catch: the for-each loop creates a copy of each element in the array during iteration, so if we try to modify the iterated variable, no changes will be kept outside of the loop. To solve this problem we use an `&` to create a **reference** and avoid the creation of a copy of the array, which can even be expensive.

```cpp {7}
#include <iostream>
using namespace std;

int main() {
    int numbers[] = {1, 2, 3, 4, 5};

    for (auto& num : numbers) {
        num += 1;
    }

    for (int num : numbers) {
        cout << num << " ";
    }

    return 0;
}
```

<div class="output">
<code class="output">
    2<br/>
    3<br/>
    4<br/>
    5<br/>
    6<br/>
</code>
</div>

If the intention is to use the variable in a read-only fashion, we can make the reference of type `const` to get the performance benefit of not copying the array and prevent accidental modifications[^1].

[^1]: [LearnCpp.com - For-each loops](https://www.learncpp.com/cpp-tutorial/for-each-loops/)