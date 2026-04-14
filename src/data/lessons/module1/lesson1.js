const lesson = {
  id: 'm1-l1',
  title: 'Hello World & The Compilation Model',
  module: 1,
  lessonNumber: 1,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Hello World & The Compilation Model

Welcome to your first step in C++! Before writing complex algorithms, you need to understand how C++ programs are **structured**, **compiled**, and **executed**.

## What is C++?

C++ is a **compiled, statically-typed, general-purpose** language. Unlike Python or JavaScript that run code line-by-line (interpreted), C++ source code is transformed into native machine code by a **compiler** — making it extremely fast.

## The Compilation Pipeline

\`\`\`
Source Code (.cpp)
      ↓  [Preprocessor]  — handles #include, #define
Header Expansion (.i)
      ↓  [Compiler]      — translates to assembly
Assembly (.s)
      ↓  [Assembler]     — assembles to object code
Object File (.o)
      ↓  [Linker]        — links libraries + object files
Executable (a.out / main.exe)
\`\`\`

## Your First Program

\`\`\`cpp
#include <iostream>   // Include the I/O library
using namespace std;  // Use the standard namespace

int main() {
    cout << "Hello, World!" << endl;
    return 0;         // 0 = success
}
\`\`\`

### Breaking it down line by line:

| Line | What it does |
|---|---|
| \`#include <iostream>\` | Tells the preprocessor to paste the iostream header (contains \`cout\`, \`cin\`) |
| \`using namespace std;\` | Avoids writing \`std::cout\` everywhere |
| \`int main()\` | Entry point of every C++ program — OS calls this first |
| \`cout << "Hello"\` | \`cout\` = character output stream. \`<<\` is the insertion operator |
| \`endl\` | Outputs a newline AND flushes the buffer (or use \`"\\n"\` which is faster) |
| \`return 0;\` | Signals success to the OS. Non-zero = error |

## Output Operators

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Line 1\\n";         // Faster newline
    cout << "Line 2" << endl;   // Newline + flush
    cout << "A " << "B " << "C" << "\\n";  // Chaining
    return 0;
}
\`\`\`

## Common Mistakes 🚨

- **Forgetting the semicolon** — every statement ends with \`;\`
- **Missing \`#include <iostream>\`** — \`cout\` won't exist
- **Typo in \`main\`** — must be lowercase \`main\`, not \`Main\` or \`MAIN\`
- **Not returning 0** — technically optional in C++11+, but good practice

## Complexity Analysis

| Operation | Time | Space |
|---|---|---|
| Hello World execution | O(1) | O(1) |

> **Key Insight**: The \`main()\` function is where your program begins. Everything you write will eventually execute from this entry point.
`,

  starterCode: `#include <iostream>
using namespace std;

int main() {
    // TODO: Print "Hello, World!" to the console
    
    return 0;
}`,

  modelAnswer: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,

  testCases: [
    {
      input: '',
      expectedOutput: 'Hello, World!',
      description: 'Prints "Hello, World!" exactly',
    },
  ],

  hints: [
    'Use `cout` to print to the console — it stands for "character output".',
    'The insertion operator `<<` sends data to the output stream. Try: `cout << "text";`',
    'Don\'t forget the semicolon at the end! Full solution: `cout << "Hello, World!" << endl;`',
  ],

  complexity: {
    time:  'O(1)',
    space: 'O(1)',
    notes: 'Printing a constant string is always constant time and space.',
  },

  tags: ['basics', 'output', 'compilation'],
};

export default lesson;
