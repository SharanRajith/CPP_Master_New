const lesson = {
  id: 'm1-l7',
  title: 'Functions (pass by value, reference, overloading)',
  module: 1,
  lessonNumber: 7,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Functions in C++

Functions are **reusable blocks of code** that perform a specific task. Good use of functions makes code readable, testable, and maintainable.

## Function Anatomy

\`\`\`cpp
//  return_type  name(parameters)
    int          add (int a, int b) {
        return a + b;   // must match return_type
    }

int main() {
    int result = add(3, 5);   // Call the function
    cout << result;           // 8
}
\`\`\`

## Return Types

\`\`\`cpp
void greet(string name) {       // void: returns nothing
    cout << "Hello, " << name << "!\\n";
}

int square(int n) {             // returns an int
    return n * n;
}

double average(int a, int b) {  // returns double
    return (double)(a + b) / 2;
}
\`\`\`

## Pass by Value vs Pass by Reference

\`\`\`cpp
// PASS BY VALUE — function gets a COPY, original unchanged
void doubleValue(int n) {
    n = n * 2;      // Only modifies the copy!
}

// PASS BY REFERENCE — function works with ORIGINAL
void doubleRef(int& n) {    // & makes it a reference
    n = n * 2;      // Modifies the actual variable!
}

int main() {
    int x = 5;
    doubleValue(x);
    cout << x;      // Still 5!
    
    doubleRef(x);
    cout << x;      // Now 10 ✓
}
\`\`\`

> Use **pass by reference** when you want to: (1) modify the original, or (2) avoid copying large objects.
> Use **const reference** (\`const T&\`) to avoid copying without allowing modification.

## Default Arguments

\`\`\`cpp
void printLine(string sep = "---", int count = 3) {
    for (int i = 0; i < count; i++) cout << sep;
    cout << "\\n";
}

printLine();           // ---  (3 times)
printLine("===");      // === (3 times)
printLine("***", 5);   // ***** (5 times)
\`\`\`

> Default arguments must be **rightmost** parameters.

## Function Overloading

Same function name, different parameter types or counts:

\`\`\`cpp
int add(int a, int b)         { return a + b; }
double add(double a, double b){ return a + b; }
int add(int a, int b, int c)  { return a + b + c; }

// Compiler picks the right one:
add(1, 2);          // → int version
add(1.5, 2.5);      // → double version  
add(1, 2, 3);       // → 3-arg version
\`\`\`

## Inline Functions

\`\`\`cpp
inline int max(int a, int b) {
    return a > b ? a : b;
}
// Compiler may replace calls with the body (avoids function call overhead)
\`\`\`

## The Call Stack

Each function call creates a **stack frame** — local variables live here. When the function returns, its frame is popped.

\`\`\`
main() calls factorial(3)
  factorial(3) calls factorial(2)
    factorial(2) calls factorial(1)
      factorial(1) returns 1
    factorial(2) returns 2
  factorial(3) returns 6
Back in main()
\`\`\`

## Common Mistakes 🚨

- **Returning wrong type** — function signature must match return statement
- **Using uninitialized return** — always return a value if not \`void\`
- **Default args in wrong order** — defaults must be at the end
- **Overload ambiguity** — \`add(1, 2)\` is ambiguous if both \`int\` and \`double\` versions exist
`,

  starterCode: `#include <iostream>
using namespace std;

// Write a function called 'power' that raises base to the exp
// power(2, 10) should return 1024
// Do NOT use the built-in pow() function

long long power(int base, int exp) {
    // Your code here
}

int main() {
    int base, exp;
    cin >> base >> exp;
    cout << power(base, exp) << endl;
    return 0;
}`,

  modelAnswer: `#include <iostream>
using namespace std;

long long power(int base, int exp) {
    long long result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

int main() {
    int base, exp;
    cin >> base >> exp;
    cout << power(base, exp) << endl;
    return 0;
}`,

  testCases: [
    { input: '2 10', expectedOutput: '1024',       description: '2^10 = 1024' },
    { input: '3 5',  expectedOutput: '243',         description: '3^5 = 243' },
    { input: '10 0', expectedOutput: '1',           description: '10^0 = 1' },
    { input: '5 1',  expectedOutput: '5',           description: '5^1 = 5' },
  ],

  hints: [
    'Initialize `result = 1`, then multiply `base` by itself `exp` times in a loop.',
    'Use `long long` for the return type to handle large values like 2^30.',
    'Special case: any number to the power 0 is 1 — your loop handles this (runs 0 times).',
  ],

  complexity: { time: 'O(exp)', space: 'O(1)' },
  tags: ['functions', 'pass-by-reference', 'overloading'],
};

export default lesson;
