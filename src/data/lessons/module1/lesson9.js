const lesson = {
  id: 'm1-l9',
  title: 'Scope, Namespaces & Header Files',
  module: 1,
  lessonNumber: 9,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Scope, Namespaces & Header Files

Understanding **where variables live** and **how code is organized** across files is critical for writing maintainable C++ programs.

## Variable Scope

Scope is the region of code where a variable is **accessible**.

\`\`\`cpp
int globalVar = 100;  // Global scope — accessible everywhere

void func() {
    int localVar = 10;  // Local scope — only inside func()
    cout << globalVar;  // ✓ can access global
    cout << localVar;   // ✓ can access local
}

int main() {
    cout << globalVar;   // ✓ global
    // cout << localVar; // ✗ ERROR: out of scope
    
    {
        int blockVar = 5;  // Block scope
        cout << blockVar;  // ✓
    }
    // cout << blockVar;  // ✗ ERROR: out of scope
}
\`\`\`

## Variable Shadowing

\`\`\`cpp
int x = 10;

void test() {
    int x = 20;     // Shadows the global x within this function
    cout << x;      // 20 (local)
    cout << ::x;    // 10 (global — use :: scope resolution)
}
\`\`\`

## Namespaces

Namespaces **prevent name collisions** when combining code from different sources.

\`\`\`cpp
namespace math {
    int add(int a, int b) { return a + b; }
    const double PI = 3.14159;
}

namespace graphics {
    int add(int x, int y) { return x + y + 1; }  // Different add!
}

int main() {
    cout << math::add(2, 3);       // 5
    cout << graphics::add(2, 3);   // 6
    cout << math::PI;              // 3.14159
}
\`\`\`

## \`using namespace std\`

\`std\` is the standard library namespace. \`cout\`, \`cin\`, \`vector\`, \`string\` all live in it.

\`\`\`cpp
// Without using namespace:
std::cout << "Hello";
std::vector<int> v;
std::string s = "hi";

// With using namespace std:
using namespace std;
cout << "Hello";     // ✓ cleaner
vector<int> v;
string s = "hi";
\`\`\`

> **Best practice**: Avoid \`using namespace std;\` in header files — it pollutes everyone who includes that header. Use it only in .cpp files.

## Header Files & Multiple Files

**mathutils.h** — declarations (interface):
\`\`\`cpp
#ifndef MATHUTILS_H    // Include guard — prevents double inclusion
#define MATHUTILS_H

int add(int a, int b);
int multiply(int a, int b);

#endif
\`\`\`

**mathutils.cpp** — definitions (implementation):
\`\`\`cpp
#include "mathutils.h"

int add(int a, int b)      { return a + b; }
int multiply(int a, int b) { return a * b; }
\`\`\`

**main.cpp** — usage:
\`\`\`cpp
#include <iostream>
#include "mathutils.h"    // Use quotes for local headers
using namespace std;

int main() {
    cout << add(3, 4);       // 7
    cout << multiply(3, 4);  // 12
}
\`\`\`

## \`#pragma once\`

Modern alternative to include guards (simpler):
\`\`\`cpp
#pragma once

int add(int a, int b);
\`\`\`

## Static Variables

\`\`\`cpp
void counter() {
    static int count = 0;  // Initialized ONCE, persists between calls
    count++;
    cout << count << "\\n";
}

counter(); // 1
counter(); // 2
counter(); // 3
\`\`\`

## Common Mistakes 🚨

- **No include guards** — double inclusion causes redefinition errors
- **Defining functions in headers** — causes "multiple definition" linker errors (use \`inline\` or move to .cpp)
- **Circular includes** — A includes B includes A (use forward declarations)
`,

  starterCode: `#include <iostream>
using namespace std;

// Create a function that counts how many times it's been called
// using a static variable. Print the count each call.

void callCounter() {
    // Your code here
}

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        callCounter();
    }
    return 0;
}`,

  modelAnswer: `#include <iostream>
using namespace std;

void callCounter() {
    static int count = 0;
    count++;
    cout << count << "\\n";
}

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        callCounter();
    }
    return 0;
}`,

  testCases: [
    { input: '3', expectedOutput: '1\n2\n3', description: 'Counter increments across calls' },
    { input: '5', expectedOutput: '1\n2\n3\n4\n5', description: 'Five calls' },
  ],

  hints: [
    'Use `static int count = 0;` inside the function — static variables persist between calls.',
    'Increment: `count++;` then print: `cout << count << "\\n";`',
    'The key: static variables are initialized ONCE when the function is first called.',
  ],

  complexity: { time: 'O(n)', space: 'O(1)' },
  tags: ['scope', 'namespaces', 'headers', 'static'],
};

export default lesson;
