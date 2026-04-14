const lesson = {
  id: 'm1-l6',
  title: 'Loops (for, while, do-while, range-based)',
  module: 1,
  lessonNumber: 6,
  xpReward: 10,
  leetcodeProblems: [
    { id: 509, title: 'Fibonacci Number', url: 'https://leetcode.com/problems/fibonacci-number/', difficulty: 'Easy' },
  ],
  content: `# Loops in C++

Loops allow you to **repeat code** a certain number of times or until a condition changes.

## for Loop — When you know the count

\`\`\`cpp
// Syntax: for (init; condition; update)
for (int i = 0; i < 5; i++) {
    cout << i << " ";   // 0 1 2 3 4
}

// Counting down
for (int i = 10; i >= 1; i--) {
    cout << i << " ";   // 10 9 8 ... 1
}

// Step by 2
for (int i = 0; i <= 10; i += 2) {
    cout << i << " ";   // 0 2 4 6 8 10
}
\`\`\`

## while Loop — When you don't know the count

\`\`\`cpp
int n = 1;
while (n <= 10) {
    cout << n << " ";
    n++;
}

// Reading until 0
int x;
while (cin >> x && x != 0) {
    cout << "Got: " << x << "\\n";
}
\`\`\`

## do-while Loop — Executes at least once

\`\`\`cpp
int input;
do {
    cout << "Enter positive number: ";
    cin >> input;
} while (input <= 0);   // Loop until valid input
\`\`\`

## Range-based for Loop (C++11) — For containers

\`\`\`cpp
#include <vector>
vector<int> nums = {1, 2, 3, 4, 5};

// Read only
for (int n : nums) {
    cout << n << " ";
}

// Modify elements (use &)
for (int& n : nums) {
    n *= 2;
}

// With auto
for (auto x : nums) {
    cout << x << " ";
}
\`\`\`

## break and continue

\`\`\`cpp
// break: exit the loop entirely
for (int i = 0; i < 10; i++) {
    if (i == 5) break;
    cout << i << " ";   // 0 1 2 3 4
}

// continue: skip to next iteration
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;
    cout << i << " ";   // 1 3 5 7 9 (odd only)
}
\`\`\`

## Nested Loops (for 2D problems)

\`\`\`cpp
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        cout << i * j << "\\t";
    }
    cout << "\\n";
}
// Output:
// 1  2  3
// 2  4  6
// 3  6  9
\`\`\`

## Practice: Print multiplication table

\`\`\`cpp
int n = 5;
for (int i = 1; i <= 10; i++) {
    cout << n << " x " << i << " = " << n*i << "\\n";
}
\`\`\`

## Common Mistakes 🚨

- **Infinite loop** — forgetting to update the loop variable
- **Off-by-one** — \`i < n\` vs \`i <= n\` (does it include n?)
- **Modifying the loop variable inside** — can cause unexpected behavior
`,

  starterCode: `#include <iostream>
using namespace std;

int main() {
    // Read n from input
    // Print the sum of numbers from 1 to n
    // Example: n=5 → output "15"  (1+2+3+4+5)
    
    int n;
    cin >> n;
    
    // Your code here
    
    return 0;
}`,

  modelAnswer: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    cout << sum << endl;
    return 0;
}`,

  testCases: [
    { input: '5',  expectedOutput: '15',  description: 'Sum 1 to 5' },
    { input: '10', expectedOutput: '55',  description: 'Sum 1 to 10' },
    { input: '1',  expectedOutput: '1',   description: 'Sum 1 to 1' },
    { input: '100',expectedOutput: '5050',description: 'Sum 1 to 100 (Gauss)' },
  ],

  hints: [
    'Initialize `sum = 0`, then use a for loop from `i = 1` to `i <= n`.',
    'Add each `i` to `sum` inside the loop: `sum += i;`',
    'After the loop, print `sum`. Formula check: n*(n+1)/2.',
  ],

  complexity: { time: 'O(n)', space: 'O(1)', notes: 'Single pass through 1..n' },
  tags: ['loops', 'for', 'while', 'iteration'],
};

export default lesson;
