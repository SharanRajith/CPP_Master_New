const lesson = {
  id: 'm1-l4',
  title: 'Input / Output (cin, cout, printf, scanf)',
  module: 1,
  lessonNumber: 4,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Input / Output in C++

C++ has two main I/O systems: the **C++ streams** (\`cin\`/\`cout\`) and the **C-style** functions (\`scanf\`/\`printf\`). Both are important to know.

## cout — Standard Output

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int x = 42;
    double pi = 3.14159;
    string name = "Alice";
    
    cout << "Value: " << x << endl;
    cout << "Pi = " << pi << "\\n";        // \\n is faster than endl
    cout << "Hello, " << name << "!\\n";
    
    // Formatting
    cout << fixed;                          // disable scientific notation
    cout.precision(2);                      // 2 decimal places
    cout << pi << "\\n";                    // 3.14
    return 0;
}
\`\`\`

## cin — Standard Input

\`\`\`cpp
int age;
cin >> age;             // Read one integer

double height;
cin >> height;          // Read one double

string word;
cin >> word;            // Read one word (stops at whitespace)

string line;
cin.ignore();           // Clear leftover \\n from buffer
getline(cin, line);     // Read entire line including spaces
\`\`\`

## Reading Multiple Values

\`\`\`cpp
int a, b;
cin >> a >> b;          // Read two ints (space/newline separated)

int n;
cin >> n;
for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    // process x
}
\`\`\`

## printf / scanf (C-style, fast for competitive programming)

\`\`\`cpp
#include <cstdio>

int main() {
    int age = 25;
    double pi = 3.14159;
    
    printf("Age: %d\\n", age);       // %d for int
    printf("Pi: %.2f\\n", pi);       // %.2f for double, 2 decimals
    printf("Hex: %x\\n", 255);       // ff
    
    int n;
    scanf("%d", &n);                 // Note the & (address-of)
    printf("You entered: %d\\n", n);
    return 0;
}
\`\`\`

## Format Specifiers for printf

| Specifier | Type |
|---|---|
| \`%d\` | int |
| \`%ld\` | long |
| \`%lld\` | long long |
| \`%f\` | float/double |
| \`%.2f\` | double, 2 decimal places |
| \`%c\` | char |
| \`%s\` | C-string |
| \`%x\` | hexadecimal |

## Fast I/O (Competitive Programming)

\`\`\`cpp
ios_base::sync_with_stdio(false);
cin.tie(NULL);
\`\`\`

Add these two lines at the start of \`main()\` to make \`cin\`/\`cout\` as fast as \`scanf\`/\`printf\`.

## Common Mistakes 🚨

- **Forgetting \`&\` in scanf** — \`scanf("%d", n)\` is wrong; must be \`scanf("%d", &n)\`
- **endl vs \\n** — \`endl\` flushes the buffer (slow in loops); prefer \`"\\n"\`
- **Mixing cin and getline** — always \`cin.ignore()\` after \`cin >>\` before \`getline()\`
`,

  starterCode: `#include <iostream>
using namespace std;

int main() {
    // Read two integers from input
    // Print their sum on a new line
    // Example: input "3 7" → output "10"
    
    return 0;
}`,

  modelAnswer: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}`,

  testCases: [
    { input: '3 7',   expectedOutput: '10', description: 'Sum of 3 and 7' },
    { input: '100 200', expectedOutput: '300', description: 'Sum of 100 and 200' },
    { input: '-5 15',  expectedOutput: '10', description: 'Sum with negative number' },
  ],

  hints: [
    'Use `cin >> a >> b;` to read two integers from input in one line.',
    'Then use `cout << (a + b) << endl;` to print the result.',
    'The `>>` operator reads values separated by spaces or newlines automatically.',
  ],

  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['io', 'cin', 'cout', 'scanf', 'printf'],
};

export default lesson;
