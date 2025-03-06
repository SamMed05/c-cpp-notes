---
sidebar_position: 3
id: makefile
title: Makefile
hide_title: false
hide_table_of_contents: false
sidebar_label: Makefile
description: What is Makefile and how to use it.
slug: /c/makefile
custom_edit_url: null
---

To compile a simple C program, we've seen that we can use the command `gcc -Wall -g -o outputfile sourcefile.c` in the terminal.

However, as the number of files in your project increases, managing the compilation process manually becomes cumbersome. To handle the compilation of a more complex C project, we can use a **makefile**.

A makefile is a text file, conventionally named "*Makefile*" or "*makefile*", that contains a series of rules for automating the compilation of the project and decide which parts of a large program need to be recompiled.

These rules specify how the source files should be compiled and linked to create the executable, plus they ensure that only the necessary files are recompiled when changes are made, making the build process more efficient and manageable.

## Installing `make` on Windows

If you are on Linux the `make` command, used to run makefiles, should already work out of the box, but in Windows we don't have it by default. You'll get an error if you try this command now in the Command Prompt.

There are several ways to install `make` on Windows, but I would recommend one of these two:

1. **MSYS2/MinGW:**
   * If you've followed the [guide](https://code.visualstudio.com/docs/cpp/config-mingw#_installing-the-mingww64-toolchain) I recommended in the previous lesson to install the MSYS2/MinGW utility for the C/C++ compiler, you should now have the `C:\msys64\ucrt64\bin` address (or your corresponding MSYS2 installation directory) in your system's *PATH* environment variable and a file named `mingw32-make.exe` in that folder (if not present, try running `pacman -S make` in the MSYS2 MINGW64 terminal).
   * At this point, instead of using the (not functioning) `make` command, you should have to write `mingw32-make` to use the makefile every time.
   * To avoid that, either rename `mingw32-make.exe` inside of `C:\msys64\ucrt64\bin` to `make.exe` or create an empty batch file, named `make.bat` at the same location and edit it adding the following single line:
    ```batch
    mingw32-make.exe %*
    ```
   This command is invoked by `make` and runs `mingw32-make.exe` passing to it all the arguments provided to the batch file (thanks to `%*`).
   * To verify the command `make` is now working, you can open a *new* command prompt (to ensure the *PATH* is updated) and type `make --version`. You should see output from GNU Make.

2.  **Chocolatey Package Manager:**

    * An alternative is to install the Chocolatey package manager for Windows from [https://chocolatey.org/install](https://chocolatey.org/install) using PowerShell (follow their instructions carefully), then open an *administrator* command prompt and run: `choco install make`.

## Basic Makefile Structure

A basic rule looks like this:

```makefile
A: B
	commands to produce A from B
```

where:

* `A` is the placeholder for the **target**, which is usually a file to be created (e.g. an executable).
* `B` are the **dependencies** (prerequisites), so files that the target depends on.
* After the *tab character* we have the shell **commands** (recipe) we want to execute to create the target.

:::warning Warning

The indentation *must* be a single **tab character**, *not* spaces. This is a common source of errors for beginners.

If using VS Code, configure this as follows: in the bottom bar click the Select Indentation button "spaces: 4" → "Indent using tabs" → "4 spaces". Alternatively, press <kbd>CTRL + SHIFT + P</kbd> and type "*Convert Indentation to Tabs*", then press <kbd>ENTER/RETURN ⏎</kbd>.

:::

### Concrete example

Let's try it on our previous *helloworld.c* program:

```makefile {title="Makefile"}
helloworld: helloworld.c
	gcc -Wall -g -o helloworld helloworld.c
```

This rule states:

* **Target:** `helloworld` (the executable)
* **Dependency:** `helloworld.c` (the source file)
* **Command:** `gcc -Wall -g -o helloworld helloworld.c` (the compilation command)

If `helloworld.c` is modified, running `make` will recompile it.  If `helloworld` is already up-to-date, `make` will do nothing.

## More advanced Makefile features

Let's take the example from earlier and add a few more things:

```makefile {title="Makefile"}
CC=gcc
CFLAGS=-Wall -g

helloworld: helloworld.c
    $(CC) $(CFLAGS) -o helloworld helloworld.c

clean:
    rm -f helloworld
```

What are those extra lines?

* **CC** defines the name of the compiler we want to use.
* **CFLAGS** sets the *flags*, which are the arguments that will be passed to the compiler.
* **helloworld: helloworld.c**, as we said before, is a rule specifying that the target `helloworld` depends on the file `helloworld.c`.
* **\$(CC) \$(CFLAGS) -o helloworld helloworld.c** is the command that will be executed if `helloworld.c` is newer than `helloworld` or if `helloworld` does not exist. It is preceded by the two varibales we defined before, which determine how the compilation of `helloworld.c` will be made.
* **clean** is a special target that does not create a file but executes a command to "clean" temporary files.
* **rm -f helloworld** will be executed when you type `make clean`.

If you successfully installed the make utility, you can compile the program above using the command `make` (or `make helloworld`) and you can run `make clean` to delete temporary files.

:::note Note

It's possible to specify multiple targets, multiple objectives, and multiple dependencies.

:::

## Common `make` versions and compatibility

There are several implementations of `make`:

* **BSD `make`:**  The original `make` lineage, still used on BSD systems.  `nmake` (Microsoft's `make`) is derived from this.  These generally adhere to the POSIX standard for `make`.
* **GNU `make`:**  A widely used and feature-rich version, common on Linux systems (and the one we're using with MinGW).  It extends the basic `make` functionality considerably.

A `Makefile` written for GNU `make` might not work with BSD `make` or `nmake`, and vice-versa.  Telltale signs of a GNU `Makefile` include:

* `:=` for variable assignments (though this isn't exclusively GNU).
* Extensive use of functions like `$(shell ...)`, `$(foreach ...)`, `$(patsubst ...)`.

:::note Note

If a project provides a `Makefile`, it's generally best to use the intended `make` version. If you're writing your own, GNU `make` is a powerful and common choice. If a software package has a Visual Studio project file (`.vcproj` or similar), you should generally use that to build, rather than trying to force it into a Makefile-based build.

:::