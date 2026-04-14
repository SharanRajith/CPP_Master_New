const lesson = {
  id: 'm1-l3',
  title: 'Operators',
  module: 1,
  lessonNumber: 3,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Operators in C++

Operators are symbols that perform operations on one or more **operands** (values/variables).

## 1. Arithmetic Operators

\`\`\`cpp
int a = 17, b = 5;
cout << a + b;   // 22  (addition)
cout << a - b;   // 12  (subtraction)
cout << a * b;   // 85  (multiplication)
cout << a / b;   // 3   (integer division — truncates!)
cout << a % b;   // 2   (modulo / remainder)
\`\`\`

> **Key**: \`17 / 5 = 3\` (not 3.4) because both operands are integers. Use \`(double)a / b\` for decimal division.

## 2. Relational (Comparison) Operators

| Operator | Meaning | Example (5 op 3) |
|---|---|---|
| \`==\` | Equal to | false |
| \`!=\` | Not equal | true |
| \`<\` | Less than | false |
| \`>\` | Greater than | true |
| \`<=\` | Less or equal | false |
| \`>=\` | Greater or equal | true |

All return **bool** (true/false).

## 3. Logical Operators

\`\`\`cpp
bool a = true, b = false;
cout << (a && b);  // false — AND: both must be true
cout << (a || b);  // true  — OR:  at least one true
cout << (!a);      // false — NOT: flips the value
\`\`\`

**Short-circuit evaluation**: In \`A && B\`, if A is false, B is never evaluated. In \`A || B\`, if A is true, B is skipped.

## 4. Bitwise Operators

Operate on individual bits. Critical for competitive programming!

\`\`\`cpp
int a = 0b1010;  // 10 in binary
int b = 0b1100;  // 12 in binary

cout << (a & b);    // 0b1000 = 8   AND: both bits 1
cout << (a | b);    // 0b1110 = 14  OR:  either bit 1
cout << (a ^ b);    // 0b0110 = 6   XOR: exactly one bit 1
cout << (~a);       // Bitwise NOT (inverts all bits)
cout << (a << 1);   // 0b10100 = 20 Left shift (× 2)
cout << (a >> 1);   // 0b0101  = 5  Right shift (÷ 2)
\`\`\`

**Common bit tricks**:
- Check if n is even: \`n & 1 == 0\`
- Multiply by 2: \`n << 1\`
- Divide by 2: \`n >> 1\`
- Swap without temp: \`a ^= b; b ^= a; a ^= b;\`

## 5. Assignment Operators

\`\`\`cpp
int x = 10;
x += 5;    // x = x + 5 = 15
x -= 3;    // x = x - 3 = 12
x *= 2;    // x = x * 2 = 24
x /= 4;    // x = x / 4 = 6
x %= 4;    // x = x % 4 = 2
\`\`\`

## 6. Increment & Decrement

\`\`\`cpp
int n = 5;
n++;    // Post-increment: use n (5), then increment → n = 6
++n;    // Pre-increment:  increment first → n = 7, then use
n--;    // Post-decrement
--n;    // Pre-decrement
\`\`\`

## Operator Precedence (High to Low)

\`(), [], ->\` → \`!, ~, ++, --\` → \`*, /, %\` → \`+, -\` → \`<<, >>\` → \`<, >, <=, >=\` → \`==, !=\` → \`&\` → \`^\` → \`|\` → \`&&\` → \`||\` → \`=, +=, etc.\`

> **When in doubt, use parentheses!**
`,

  starterCode: `#include <iostream>
using namespace std;

int main() {
    int a = 15, b = 4;
    
    // Print: quotient and remainder when dividing a by b
    // Format: "15 / 4 = 3 remainder 3"
    
    return 0;
}`,

  modelAnswer: `#include <iostream>
using namespace std;

int main() {
    int a = 15, b = 4;
    cout << a << " / " << b << " = " << (a / b) << " remainder " << (a % b) << endl;
    return 0;
}`,

  testCases: [
    { input: '', expectedOutput: '15 / 4 = 3 remainder 3', description: 'Integer division with remainder' },
  ],

  hints: [
    'Use `/` for integer division and `%` for remainder (modulo).',
    'In C++, `15 / 4 = 3` (not 3.75) because both are integers.',
    'Combine with `cout`: `cout << a << " / " << b << " = " << (a/b) << " remainder " << (a%b);`',
  ],

  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['operators', 'arithmetic', 'bitwise'],
};

export default lesson;
