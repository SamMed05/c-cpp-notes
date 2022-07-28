---
sidebar_position: 3
id: cout-and-cin
title: Cout and Cin
hide_title: false
hide_table_of_contents: false
sidebar_label: Cout/Cin
description: Cout and cin explanation.
slug: /cpp/cout-and-cin
custom_edit_url: null
---


To interact with the user we need a way to communicate results and take inputs respectively 
*to* and *from* the outside world.

To do that we use the Command Prompt with the help of two predefined variables located in the 
`iostream` library, called `cout` and `cin`.


## Cout

The `cout` is used when we want to **print** some text or a value to the console as an output. 
The world itself stands for "**c**haracter **out**put".

We already encountered this command in the previous chapter, when talking about printing "Hello 
Wolrd!". This command will be used a lot in our programs.

#### Syntax

To print something using `cout` we have to write two angular brackets `<<` (*insertion operator*) 
after that command, and the text between double quotation marks/quotes `""`, like as follows:

```cpp
// ... linking section and main()
cout<<"some text";
```

:::caution

In C and in C++ double quotes `""` are used for strings variables (objects that represent 
sequences of characters). Technically a **string** is a one-dimensional array of characters, 
called *string literal*. Don't use single quotes `''` for more than one **character**, since single 
quotes can only represent 1 single character (**char** data type), which is called *character literal*.
So `'a'` is a single character literal, while `"a"` is a string literal containing an `'a'` 
and a null terminator `\0` (that is a 2 char array).

:::

:::note Note (advanced)

We can go deeper in the explanation on the caution note above.
Try to print a string with single quotes, like here:

```cpp {5}
#include <iostream>
using namespace std;

int main() {
	cout<<'text'<<endl;
	return 0;
}
```

The output will be `1952807028`. Why on the earth does this number turn up?

That decimal number is a *multi-character literal*. It corresponds to the hexadecimal 
`0x74657874` or the binary `01110100011001010111100001110100`. You can easily convert it 
too [here](https://www.rapidtables.com/convert/number/decimal-to-binary.html) if you want to 
check. 

If we separate this long binary number into groups of **8 bits** (1 byte) excluding the 
first "0" on the left for each group (so 7 bits) and then search for 
the corresponding number by comparing it with the 
[ASCII table](https://en.wikipedia.org/wiki/ASCII#:~:text=110%200001,z),
we find <mark>**[t](https://en.wikipedia.org/wiki/ASCII#:~:text=111%200100,t)** (<del>`0`</del>`1110100`), 
**[e](https://en.wikipedia.org/wiki/ASCII#:~:text=110%200101,e)** (<del>`0`</del>`1100101`), 
**[x](https://en.wikipedia.org/wiki/ASCII#:~:text=111%201000,x)** (<del>`0`</del>`1111000`) and 
**[t](https://en.wikipedia.org/wiki/ASCII#:~:text=111%200100,t)** (<del>`0`</del>`1110100`)</mark> 
again, just like the message we have put between single quotes!

That's because computer programs (in most cases) use the ASCII (**A**merican **S**tandard 
**C**ode for **I**nformation **I**nterchange) code to represent characters, and each of them 
has a number that uniquely identifies it. If you still haven't understood how to convert from 
binary to ASCII code you can watch this [video explanation](https://youtu.be/H4l42nbYmrU).

:::

We can also print values or variables, and in this case the double quotation marks `""` mustn't 
be used.

```cpp {2}
int a = 5;
cout<<a;
```

We will see what a variable is in a subsequent lesson.

In addition to that, we can also concatenate more than one thing on the same line using the 
insertion operator `<<` as many times as we want to print multiple pieces of output.

```cpp {2}
int a = 5;
cout << "The value stored in a is: " << a;
```

:::note

I've inserted a space before and after the insertion operator `<<`, and the same for the equal 
sign `=` one line up. For both of these cases the space is optional, choose whether to put it 
or not according to your preferences. Remember to be always consistent with your choice, though.

:::

Little calculations can also be done here (keeping in mind the order of operations).
```cpp {2}
int a = 5;
cout<<a+2*(6-3);
```

However, it's better to do calculations outside of `cout`.

### Endl

If we want to print two or more outputs to the console into separate lines, we need the `endl` 
command. As in the case of the world "cout", the world itself stands for “end line”.

```cpp {3}
cout<<"new line"<<endl;
```

Alternatively, to put a line break we can also use the *escape sequence* `\n`. When it is used 
by itself to move the cursor to the next line, the single quotes are needed, but when embedded 
into text that is already double-quoted, the single quotes aren't needed.

```cpp {3}
cout<<"new line\n";
cout<<"new line"<<'\n';
```

You can put freely both `endl` and `\n` *before* and/or *after* the text or variable that you 
want to print, but be aware that changing the order will result in a different behavior.

### Escape sequences

As I said, `\n` is an escape sequence, but it's not the only one. The other ones are listed in the 
table[^1] below:

| Escape sequence   | Character represented                   |
|-------------------|-----------------------------------------|
| `\a`              | Alert (Beep, Bell) (added in C89)       |
| `\b`              | Backspace                               |
| `\e`              | Escape character                        |
| `\f`              | Formfeed Page Break                     |
| `\n`              | Newline (Line Feed)                     |
| `\r`              | Carriage Return                         |
| `\t`              | Horizontal Tab                          |
| `\v`              | Vertical Tab                            |
| `\\`              | Backslash                               |
| `\'`              | Apostrophe or single quotation mark     |
| `\"`              | Double quotation mark                   |
| `\?`              | Question mark (used to avoid trigraphs) |
| `\0`              | Null character, with value zero         |


## Cin

Whereas `cout` prints data to the console using the insertion operator `<<`, `cin` reads 
input from the keyboard using the *extraction operator* `>>`. Cin stands for "character input".

To do that, the input inserted by the user must be stored in a variable to be used. 
If a value is already stored in that variable, it will be replaced.

Every time you use `cin` and ask for an input, the program will pause and wait for the input 
and the <kbd>ENTER/RETURN ⏎</kbd> key to confirm.

Try this program yourself:
```cpp
#include <iostream>
using namespace std;

int main() {
	int x; // declare an empty variable x to hold user input
    cout<<"Enter a number: "; // ask the user for a number and go to a new line
    cin>>x; // get number from keyboard and store it in x

    cout<<"You entered "<<x<<endl;
	
    return 0;
}
```

When you run the program it will print “Enter a number: “, then wait for you to enter an input. 
Once you enter a number (and press enter), the number you enter will be assigned to variable x. 
Finally, on line 10, the program will print “You entered ” followed by the number you just entered.

Of course this program it's not very useful, but it shows how `cin` works and how it can be 
combined with `cout` to interact with the user.

Multiple `cin` can also be concatenated one after the other just like we do with `cout`:

```cpp
#include <iostream>
using namespace std;

int main() {
	int a, b, c;
	int sumOfValues;

	cout<<"Insert 3 values: "<<endl;
	cin>>a>>b>>c; // the order must be respected

	sumOfValues = a+b+c;
	float average = float(sumOfValues/3);

	cout<<"The average is: "<<average<<endl;

	return 0;
}
```

[^1]: [Wikipedia - Escape sequences in C](https://en.wikipedia.org/wiki/Escape_sequences_in_C#Table_of_escape_sequences)