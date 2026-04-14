const lesson = {
  id: 'm1-l2',
  title: 'Variables, Data Types & Type Casting',
  module: 1,
  lessonNumber: 2,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Variables, Data Types & Type Casting

Variables are **named memory locations** that store data. C++ is **statically typed** — you must declare the type of every variable before using it.

## Fundamental Data Types

| Type | Size | Range | Example |
|---|---|---|---|
| \`int\` | 4 bytes | -2,147,483,648 to 2,147,483,647 | \`int age = 25;\` |
| \`long long\` | 8 bytes | ±9.2 × 10¹⁸ | \`long long big = 1e18;\` |
| \`float\` | 4 bytes | ~7 decimal digits | \`float pi = 3.14f;\` |
| \`double\` | 8 bytes | ~15 decimal digits | \`double pi = 3.14159265;\` |
| \`char\` | 1 byte | ASCII 0–127 | \`char c = 'A';\` |
| \`bool\` | 1 byte | true / false | \`bool flag = true;\` |
| \`string\` | varies | any text | \`string name = "Alice";\` |

## Declaring Variables

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Declaration with initialization
    int age = 25;
    double gpa = 3.85;
    char grade = 'A';
    bool isStudent = true;
    string name = "Alice";
    
    // Multiple declarations
    int x = 5, y = 10, z = 15;
    
    // Declaration then assignment
    int score;          // Uninitialized — DANGEROUS (garbage value)
    score = 100;        // Now safe to use
    
    cout << name << " is " << age << " years old." << endl;
    cout << "GPA: " << gpa << ", Grade: " << grade << endl;
    return 0;
}
\`\`\`

## The \`auto\` Keyword (C++11)

Let the compiler deduce the type automatically:

\`\`\`cpp
auto x = 42;         // int
auto pi = 3.14;      // double
auto name = "Bob";   // const char*
auto flag = true;    // bool
\`\`\`

## Type Limits with \`<climits>\`

\`\`\`cpp
#include <climits>
#include <iostream>
using namespace std;

int main() {
    cout << "Max int: " << INT_MAX << endl;    // 2147483647
    cout << "Min int: " << INT_MIN << endl;    // -2147483648
    cout << "Max long long: " << LLONG_MAX << endl;
    return 0;
}
\`\`\`

## Type Casting

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    // Implicit casting (automatic)
    int i = 42;
    double d = i;     // int → double (safe, no data loss)
    
    // Explicit C-style cast
    double ratio = 7 / 2;              // = 3.0 (integer division!)
    double correct = (double)7 / 2;   // = 3.5  ✓
    
    // C++ style cast (preferred)
    int x = static_cast<int>(3.99);   // = 3 (truncates, not rounds)
    
    cout << "ratio (wrong): " << ratio << endl;
    cout << "correct: " << correct << endl;
    cout << "truncated: " << x << endl;
    
    // char ↔ int
    char ch = 'A';
    cout << "ASCII of A: " << (int)ch << endl;  // 65
    cout << "Char 66: " << (char)66 << endl;    // B
    
    return 0;
}
\`\`\`

## Integer Overflow ⚠️

\`\`\`cpp
int a = INT_MAX;   // 2147483647
a = a + 1;         // OVERFLOW! Undefined behavior → wraps to -2147483648
// Fix: use long long
long long b = (long long)INT_MAX + 1;  // Safe
\`\`\`

## Common Mistakes 🚨

- **Uninitialized variables** — always initialize before use
- **Integer division** — \`7/2 = 3\`, not \`3.5\`; cast to double first  
- **float vs double** — use \`double\` for precision; float has ~7 sig figs
- **Integer overflow** — use \`long long\` for large numbers in competitive programming
`,

  starterCode: `#include <iostream>
using namespace std;

int main() {
    // Declare variables for: age (int), gpa (double), grade (char)
    // Set: age = 20, gpa = 3.75, grade = 'B'
    // Print: "Age: 20, GPA: 3.75, Grade: B"
    
    return 0;
}`,

  modelAnswer: `#include <iostream>
using namespace std;

int main() {
    int age = 20;
    double gpa = 3.75;
    char grade = 'B';
    
    cout << "Age: " << age << ", GPA: " << gpa << ", Grade: " << grade << endl;
    return 0;
}`,

  testCases: [
    {
      input: '',
      expectedOutput: 'Age: 20, GPA: 3.75, Grade: B',
      description: 'Prints variable values in correct format',
    },
  ],

  hints: [
    'Declare three separate variables: `int age = 20;`, `double gpa = 3.75;`, `char grade = \'B\';`',
    'Use `cout` with multiple `<<` operators to chain output.',
    'The exact output must be: `Age: 20, GPA: 3.75, Grade: B` — watch commas and spaces!',
  ],

  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['variables', 'types', 'casting'],
};

export default lesson;
