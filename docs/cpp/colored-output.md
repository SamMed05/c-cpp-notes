---
sidebar_position: 11
id: colored-output
title: Colored output
hide_title: false
hide_table_of_contents: false
sidebar_label: Colored output
description: A technique to change to color of the output text in the Windows console.
slug: /cpp/colored-output
custom_edit_url: null
---

:::caution

This sections is about a feature of C++ that is **only present on Windows** platform. If you are using another operating system, feel free to skip this part without any problem.

:::

A nice little feature that we have in Windows with C++ is the ability to change the text and the foreground color in the console window.

There are mainly two ways of doing that.

### `system("color XX")`

The `iostream` header file allows us to use the command `system("color XX");` to change the entire colors of the console window. After the world `color` there are two characters: the first controls the color of the background while the second controls the color of the text.

```cpp {5}
#include <iostream>
using namespace std;

int main() {
    system("color 0A");

    cout<<"green!"<<endl;

    return 0;
}
```

Try to run this program and experiment changing `0A` with other numbers or letters. These are the different colors you can use, each with his own ID.

| Color ID | Color  | Color ID | Color        |
|----------|--------|----------|--------------|
| 1        | Blue   | 9        | Light Blue   |
| 2        | Green  | 0        | Black        |
| 3        | Aqua   | A        | Light Green  |
| 4        | Red    | B        | Light Aqua   |
| 5        | Purple | C        | Light Red    |
| 6        | Yellow | D        | Light Purple |
| 7        | White  | E        | Light Yellow |
| 8        | Gray   | F        | Bright White |

### `SetConsoleTextAttribute`

An alternative of using `system();` is the [SetConsoleTextAttribute](https://docs.microsoft.com/en-us/windows/console/setconsoletextattribute) function in this way:

```cpp
SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), color);
```

where `color` is a numerical value to which it corresponds a certain color.

The difference with this method is that you can modify individual output colors. See this example by [vegaseat](https://www.daniweb.com/programming/software-development/code/216345/add-a-little-color-to-your-console-text):

```cpp
// colorAttribute = foreground + background * 16
// to get red text on yellow use 4 + 14*16 = 228
// light red on yellow would be 12 + 14*16 = 236

#include <iostream>
#include <windows.h>
using namespace std;

int main() {
    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);

    // you can loop k higher to see more color choices
    for(int k = 1; k < 255; k++) {
        // pick the colorattribute k you want
        SetConsoleTextAttribute(hConsole, k);
        cout<<k<<" some text"<<endl;
    }

    cin.get(); // wait

    return 0;
}
```

:::note

There's a for loop in the code above. Don't worry if you don't know what it is or what it does. We'll discuss about loops in a future chapter.

:::