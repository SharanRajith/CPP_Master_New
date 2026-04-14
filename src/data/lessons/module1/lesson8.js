const lesson = {
  id: 'm1-l8',
  title: 'Recursion Basics',
  module: 1,
  lessonNumber: 8,
  xpReward: 10,
  leetcodeProblems: [
    { id: 509, title: 'Fibonacci Number', url: 'https://leetcode.com/problems/fibonacci-number/', difficulty: 'Easy' },
    { id: 206, title: 'Reverse Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'Easy' },
  ],
  content: `# Recursion Basics

Recursion is when a **function calls itself**. It's a powerful technique that models problems where the solution depends on solutions to smaller subproblems.

## The Two Rules of Recursion

1. **Base case** — the condition where the function stops calling itself (prevents infinite recursion)
2. **Recursive case** — the function calls itself with a **smaller/simpler** input

\`\`\`cpp
int factorial(int n) {
    // Base case
    if (n == 0 || n == 1) return 1;
    
    // Recursive case: n! = n × (n-1)!
    return n * factorial(n - 1);
}
// factorial(5) = 5 × 4 × 3 × 2 × 1 = 120
\`\`\`

## How the Call Stack Works

\`\`\`
factorial(4)
  = 4 × factorial(3)
       = 3 × factorial(2)
            = 2 × factorial(1)
                 = 1           ← base case
            returns 2
       returns 6
  returns 24
\`\`\`

Each call is **pushed** onto the call stack. When it returns, it's **popped** and the result propagates back.

## Fibonacci Numbers

\`\`\`cpp
// Naive recursion — O(2^n) time (very slow!)
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

// Memoized — O(n) time (much better)
#include <unordered_map>
unordered_map<int, int> memo;

int fib_memo(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];
    return memo[n] = fib_memo(n-1) + fib_memo(n-2);
}
\`\`\`

## Sum of digits recursively

\`\`\`cpp
int digitSum(int n) {
    if (n < 10) return n;          // base case: single digit
    return n % 10 + digitSum(n / 10);  // last digit + rest
}
// digitSum(1234) = 4 + digitSum(123)
//               = 4 + 3 + digitSum(12)
//               = 4 + 3 + 2 + digitSum(1)
//               = 4 + 3 + 2 + 1 = 10
\`\`\`

## Power function recursively

\`\`\`cpp
// Naive: O(n)
long long power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

// Fast Power (Binary Exponentiation): O(log n)
long long fastPow(long long base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        long long half = fastPow(base, exp / 2);
        return half * half;
    }
    return base * fastPow(base, exp - 1);
}
\`\`\`

## When to Use Recursion

✅ Tree/graph traversals, divide & conquer, backtracking  
❌ Simple loops (recursion adds function call overhead)  
⚠️ Deep recursion → stack overflow (default stack ~1–8 MB)

## Tail Recursion

\`\`\`cpp
// Normal recursion (NOT tail recursive)
int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n-1);  // has work after recursive call
}

// Tail recursive version (accumulator pattern)
int factTail(int n, int acc = 1) {
    if (n == 0) return acc;
    return factTail(n-1, n * acc);  // last thing is recursive call
}
\`\`\`

## Common Mistakes 🚨

- **Missing base case** — infinite recursion → stack overflow
- **Incorrect base case** — wrong termination
- **No progress toward base case** — always make the problem smaller
- **Naive recursion for overlapping subproblems** — use memoization (DP)
`,

  starterCode: `#include <iostream>
using namespace std;

// Compute the nth Fibonacci number recursively
// F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)
// Use memoization to avoid TLE!

int memo[100] = {};  // 0 = not computed

int fib(int n) {
    // Your code here
}

int main() {
    int n;
    cin >> n;
    cout << fib(n) << endl;
    return 0;
}`,

  modelAnswer: `#include <iostream>
using namespace std;

int memo[100] = {};

int fib(int n) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    return memo[n] = fib(n - 1) + fib(n - 2);
}

int main() {
    int n;
    cin >> n;
    cout << fib(n) << endl;
    return 0;
}`,

  testCases: [
    { input: '0',  expectedOutput: '0',   description: 'F(0) = 0' },
    { input: '1',  expectedOutput: '1',   description: 'F(1) = 1' },
    { input: '10', expectedOutput: '55',  description: 'F(10) = 55' },
    { input: '20', expectedOutput: '6765',description: 'F(20) = 6765' },
  ],

  hints: [
    'Base cases: if n <= 1, return n (F(0)=0, F(1)=1).',
    'Recursive case: return fib(n-1) + fib(n-2). Without memoization this is O(2^n).',
    'Check `if (memo[n]) return memo[n];` before computing, and store result before returning.',
  ],

  complexity: {
    time: 'O(n) with memoization, O(2^n) without',
    space: 'O(n) for memo array + call stack',
  },
  tags: ['recursion', 'fibonacci', 'memoization', 'base-case'],
};

export default lesson;
