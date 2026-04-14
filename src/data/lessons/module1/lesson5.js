const lesson = {
  id: 'm1-l5',
  title: 'Conditionals (if/else, switch, ternary)',
  module: 1,
  lessonNumber: 5,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Conditionals in C++

Conditionals let your program make **decisions** based on runtime values.

## if / else if / else

\`\`\`cpp
int score = 85;

if (score >= 90) {
    cout << "A" << endl;
} else if (score >= 80) {
    cout << "B" << endl;   // This executes
} else if (score >= 70) {
    cout << "C" << endl;
} else {
    cout << "F" << endl;
}
\`\`\`

Only the **first matching** branch executes. The rest are skipped.

## Nested if

\`\`\`cpp
int x = 10;
if (x > 0) {
    if (x % 2 == 0) {
        cout << "Positive even";
    } else {
        cout << "Positive odd";
    }
}
\`\`\`

## Ternary Operator (one-line if/else)

\`\`\`cpp
// Syntax: condition ? value_if_true : value_if_false
int a = 5, b = 10;
int max_val = (a > b) ? a : b;           // 10
cout << (x % 2 == 0 ? "even" : "odd");  // Inline use
\`\`\`

## switch Statement

Best for checking a variable against **multiple exact values** (integers or chars):

\`\`\`cpp
int day = 3;

switch (day) {
    case 1: cout << "Monday";    break;
    case 2: cout << "Tuesday";   break;
    case 3: cout << "Wednesday"; break;  // Executes
    case 4: cout << "Thursday";  break;
    case 5: cout << "Friday";    break;
    default: cout << "Weekend";  break;
}
\`\`\`

> **Always add \`break;\`** — without it, execution **falls through** to the next case!

### Intentional Fall-through

\`\`\`cpp
switch (month) {
    case 1: case 3: case 5: case 7:
    case 8: case 10: case 12:
        cout << "31 days"; break;
    case 4: case 6: case 9: case 11:
        cout << "30 days"; break;
    case 2:
        cout << "28 or 29 days"; break;
}
\`\`\`

## Truthy and Falsy Values

In C++, **any non-zero integer is true**, zero is false:
\`\`\`cpp
if (5)    cout << "true";   // ✓
if (0)    cout << "true";   // ✗
if (-1)   cout << "true";   // ✓
if (nullptr) cout << "true"; // ✗
\`\`\`

## Common Mistakes 🚨

- **\`=\` vs \`==\`** — \`if (x = 5)\` always true (assignment); \`if (x == 5)\` is the check
- **Missing \`break\` in switch** — causes fall-through bugs
- **Floating point comparison** — never use \`==\` with float/double; use \`abs(a-b) < 1e-9\`
`,

  starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Print "Positive" if n > 0, "Negative" if n < 0, "Zero" if n == 0
    
    return 0;
}`,

  modelAnswer: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    if (n > 0) {
        cout << "Positive" << endl;
    } else if (n < 0) {
        cout << "Negative" << endl;
    } else {
        cout << "Zero" << endl;
    }
    return 0;
}`,

  testCases: [
    { input: '5',  expectedOutput: 'Positive', description: 'Positive number' },
    { input: '-3', expectedOutput: 'Negative', description: 'Negative number' },
    { input: '0',  expectedOutput: 'Zero',     description: 'Zero' },
  ],

  hints: [
    'Use `if (n > 0)` to check for positive, `else if (n < 0)` for negative.',
    'The `else` clause handles the remaining case (zero) automatically.',
    'Make sure print exactly: "Positive", "Negative", or "Zero" (capital first letter).',
  ],

  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['conditionals', 'if-else', 'switch', 'ternary'],
};

export default lesson;
