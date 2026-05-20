const lesson = {
  id: 'm6-l11',
  title: 'Evaluate Reverse Polish Notation',
  module: 6,
  lessonNumber: 11,
  xpReward: 15,
  leetcodeProblems: [
    { id: 150, title: 'Evaluate Reverse Polish Notation', url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', difficulty: 'Medium' },
  ],
  content: `# Evaluate Reverse Polish Notation

**Reverse Polish Notation (RPN)**, also called *postfix notation*, is a mathematical notation where every operator follows its operands. It eliminates the need for parentheses and operator precedence rules.

## Infix vs Postfix

| Infix (normal)    | Postfix (RPN)     |
|-------------------|-------------------|
| 2 + 3             | 2 3 +             |
| (2 + 1) * 3       | 2 1 + 3 *         |
| 4 + (13 / 5)      | 4 13 5 / +        |

## Why Stacks?

RPN was literally designed for stack-based evaluation. The algorithm is:

1. Read tokens left to right.
2. If the token is a **number**, push it onto the stack.
3. If the token is an **operator** (\`+\`, \`-\`, \`*\`, \`/\`), pop the top **two** values, apply the operator, and push the result.
4. At the end, the stack contains exactly one element — the answer.

## Step-by-Step Trace: "2 1 + 3 *"

\`\`\`
Token  Action                      Stack (bottom → top)
─────  ──────────────────────────  ────────────────────
  2    push 2                      [2]
  1    push 1                      [2, 1]
  +    pop 1 and 2, push 2+1=3     [3]
  3    push 3                      [3, 3]
  *    pop 3 and 3, push 3*3=9     [9]

Result = 9 ✓
\`\`\`

## Trace: "4 13 5 / +"

\`\`\`
Token  Action                      Stack
─────  ──────────────────────────  ──────────────────
  4    push 4                      [4]
 13    push 13                     [4, 13]
  5    push 5                      [4, 13, 5]
  /    pop 5, pop 13, 13/5=2       [4, 2]
  +    pop 2, pop 4, 4+2=6         [6]

Result = 6 ✓
\`\`\`

## Order of Operands Matters for - and /

When you pop two operands for \`-\` or \`/\`, the **first popped** is the **right operand** and the **second popped** is the **left operand**:

\`\`\`cpp
int b = stk.top(); stk.pop();   // right operand
int a = stk.top(); stk.pop();   // left operand
// for '-': result = a - b
// for '/': result = a / b  (truncation toward zero)
\`\`\`

This is critical. For \`"5 3 -"\`, you get \`5 - 3 = 2\`, not \`3 - 5 = -2\`.

## Full Implementation

\`\`\`cpp
int evalRPN(vector<string>& tokens) {
    stack<long long> stk;
    for (const string& tok : tokens) {
        if (tok == "+" || tok == "-" || tok == "*" || tok == "/") {
            long long b = stk.top(); stk.pop();
            long long a = stk.top(); stk.pop();
            if      (tok == "+") stk.push(a + b);
            else if (tok == "-") stk.push(a - b);
            else if (tok == "*") stk.push(a * b);
            else                 stk.push(a / b);   // truncates toward zero
        } else {
            stk.push(stoll(tok));   // stoll handles negatives like "-3"
        }
    }
    return (int)stk.top();
}
\`\`\`

Using \`long long\` avoids overflow during intermediate multiplications.

## Reading Input

The problem statement says there are \`n\` tokens in the expression. We read \`n\` and then \`n\` space-separated tokens. Note: the single-token count \`n\` corresponds to the number of space-separated items including numbers and operators.

\`\`\`
Input format:
  4          ← number of tokens
  2 1 + 3 *  ← tokens on a single line

Output:
  9
\`\`\`

## Applications of RPN

- **Compilers and interpreters** use postfix evaluation internally.
- **Scientific calculators** (HP calculators famously use RPN).
- **Stack-based virtual machines** (JVM bytecode, CPython bytecode).
`,
  starterCode: `#include <iostream>
#include <vector>
#include <stack>
#include <string>
using namespace std;

int evalRPN(vector<string>& tokens) {
    stack<long long> stk;
    for (const string& tok : tokens) {
        if (tok == "+" || tok == "-" || tok == "*" || tok == "/") {
            // TODO: pop b (right operand) then a (left operand)
            // TODO: compute a op b and push result
        } else {
            // TODO: push the integer value of tok (use stoll)
        }
    }
    return (int)stk.top();
}

int main() {
    int n; cin >> n;
    vector<string> tokens(n);
    for (string& s : tokens) cin >> s;
    cout << evalRPN(tokens) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <stack>
#include <string>
using namespace std;

int evalRPN(vector<string>& tokens) {
    stack<long long> stk;
    for (const string& tok : tokens) {
        if (tok == "+" || tok == "-" || tok == "*" || tok == "/") {
            long long b = stk.top(); stk.pop();
            long long a = stk.top(); stk.pop();
            if      (tok == "+") stk.push(a + b);
            else if (tok == "-") stk.push(a - b);
            else if (tok == "*") stk.push(a * b);
            else                 stk.push(a / b);
        } else {
            stk.push(stoll(tok));
        }
    }
    return (int)stk.top();
}

int main() {
    int n; cin >> n;
    vector<string> tokens(n);
    for (string& s : tokens) cin >> s;
    cout << evalRPN(tokens) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4\n2 1 + 3 *',                          expectedOutput: '9',  description: '(2 + 1) * 3 = 9' },
    { input: '4\n4 13 5 / +',                         expectedOutput: '6',  description: '4 + (13 / 5) = 4 + 2 = 6' },
    { input: '9\n10 6 9 3 + -11 * / * 17 + 5 +',     expectedOutput: '22', description: 'Complex nested expression from LeetCode.' },
  ],
  hints: [
    'If the current token is NOT one of the four operators, it must be a number — push it. Use `stoll()` to convert a string to a number (it handles negative numbers like "-3").',
    'When you see an operator, you need **two** operands. Pop them one at a time. The **first** popped is the **right** operand, the second is the **left** operand.',
    'For subtraction and division, order matters: `a - b` and `a / b`, where `b` was popped first and `a` was popped second.',
  ],
  complexity: { time: 'O(N)', space: 'O(N)', notes: 'Single pass through the token list; stack holds at most N/2 numbers at once.' },
  tags: ['stack', 'math', 'expression-evaluation', 'medium'],
};
export default lesson;
