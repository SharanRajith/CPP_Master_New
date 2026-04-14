const lesson = {
  id: 'm10-l1',
  title: 'Intro to DP: Memoization vs Tabulation',
  module: 10,
  lessonNumber: 1,
  xpReward: 10,
  leetcodeProblems: [
    { id: 509, title: 'Fibonacci Number', url: 'https://leetcode.com/problems/fibonacci-number/', difficulty: 'Easy' },
  ],
  content: `# Intro to Dynamic Programming

Dynamic Programming (DP) is simply an optimization technique. It is used when a problem can be broken down into identical, overlapping subproblems. 

The classic example is the **Fibonacci Sequence**: $F(n) = F(n-1) + F(n-2)$.
If we use strict Recursion:
\`\`\`cpp
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
\`\`\`
This creates an exponential $O(2^N)$ tree. We end up recalculating \`fib(3)\` over and over again on different branches!

DP solves this by **saving the answers** so we only calculate each state exactly once. There are two ways to do this:

## 1. Top-Down (Memoization)
You keep the recursive structure, but you pass an array (or hash map) called a \`memo\`.
Before calculating \`fib(n)\`, you check if \`memo[n]\` is already filled. If it is, return it! If not, calculate it, save it in \`memo[n]\`, and return it.
- **Time limits:** Drops from $O(2^N)$ to $O(N)$.
- **Space limits:** $O(N)$ for the array AND $O(N)$ for the recursion stack.

## 2. Bottom-Up (Tabulation)
Instead of recursion, you use a \`for\` loop to build the answers from the base cases up.
\`\`\`cpp
int fib(int n) {
    if (n <= 1) return n;
    vector<int> dp(n + 1);
    dp[0] = 0; 
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
\`\`\`
- **Time limits:** $O(N)$.
- **Space limits:** $O(N)$ for the array. Wait, look closely: you only ever need the *last two values*! We can optimize space to $O(1)$!

> **The Golden Rule of DP:** Always try to get to the Tabulation step, because it completely eliminates the Recursion Stack overhead and often allows for $O(1)$ Space Optimizations!
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Calculate Fibonacci using $O(1)$ Space Tabulation
int fib(int n) {
    if (n <= 1) return n;
    
    int prev2 = 0; // F(0)
    int prev = 1;  // F(1)
    
    for (int i = 2; i <= n; i++) {
        // TODO: Calculate curr
        // TODO: Shift prev2 and prev forward
    }
    
    // return prev;
    return 0;
}

int main() {
    int n; cin >> n;
    cout << fib(n) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

int fib(int n) {
    if (n <= 1) return n;
    int prev2 = 0;
    int prev = 1;
    for (int i = 2; i <= n; i++) {
        int curr = prev + prev2;
        prev2 = prev;
        prev = curr;
    }
    return prev;
}

int main() {
    int n; cin >> n;
    cout << fib(n) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4', expectedOutput: '3', description: 'Fibonacci of 4 is 3.' },
    { input: '10', expectedOutput: '55', description: 'Fibonacci of 10 is 55.' },
  ],
  hints: [
    '`int curr = prev + prev2;` gives the current step.',
    'Update pointers: `prev2` takes the old value of `prev`, and `prev` takes the value of `curr`.',
  ],
  complexity: { time: 'O(N)', space: 'O(1) highly optimized' },
  tags: ['dp', 'fibonacci', 'tabulation', 'memoization'],
};
export default lesson;
