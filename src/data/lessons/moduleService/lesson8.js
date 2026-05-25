const lesson = {
  id: 'msvc-l8',
  title: 'Cognizant: Dynamic Programming Basics',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 70,  title: 'Climbing Stairs',            url: 'https://leetcode.com/problems/climbing-stairs/',            difficulty: 'Easy' },
    { id: 322, title: 'Coin Change',                url: 'https://leetcode.com/problems/coin-change/',                difficulty: 'Medium' },
    { id: 300, title: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'Medium' },
  ],
  content: `# Cognizant & All Companies — DP Basics

Dynamic Programming appears in Cognizant GenC Elevate and is also tested in Infosys Power Programmer interviews.

---

## Core Idea

DP = **memoization** (top-down) or **tabulation** (bottom-up) to avoid recomputing overlapping subproblems.

---

## 1. Climbing Stairs (Fibonacci DP)

How many ways to reach step n taking 1 or 2 steps at a time?

\`\`\`cpp
int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b; b = c;
    }
    return b;
}
// n=5 → 8 ways
\`\`\`

---

## 2. 0/1 Knapsack

\`\`\`cpp
int knapsack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
    for (int i=1; i<=n; i++)
        for (int w=0; w<=W; w++) {
            dp[i][w] = dp[i-1][w]; // don't take item i
            if (wt[i-1] <= w)
                dp[i][w] = max(dp[i][w], dp[i-1][w-wt[i-1]] + val[i-1]);
        }
    return dp[n][W];
}
\`\`\`

---

## 3. Longest Common Subsequence (LCS)

\`\`\`cpp
int lcs(string a, string b) {
    int m=a.size(), n=b.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i=1; i<=m; i++)
        for (int j=1; j<=n; j++)
            dp[i][j] = (a[i-1]==b[j-1])
                      ? dp[i-1][j-1]+1
                      : max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}
\`\`\`

---

## 4. Coin Change (Minimum Coins)

\`\`\`cpp
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount+1, INT_MAX);
    dp[0] = 0;
    for (int i=1; i<=amount; i++)
        for (int c : coins)
            if (c <= i && dp[i-c] != INT_MAX)
                dp[i] = min(dp[i], dp[i-c] + 1);
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}
\`\`\`

---

## 5. Longest Increasing Subsequence (LIS)

\`\`\`cpp
int lis(vector<int>& arr) {
    int n = arr.size();
    vector<int> dp(n, 1);
    int res = 1;
    for (int i=1; i<n; i++) {
        for (int j=0; j<i; j++)
            if (arr[j] < arr[i]) dp[i] = max(dp[i], dp[j]+1);
        res = max(res, dp[i]);
    }
    return res;
}
\`\`\`

---

## DP Tips for Interviews

| Problem | DP Type | Complexity |
|---|---|---|
| Climbing Stairs | 1D DP | O(N) |
| Knapsack | 2D DP | O(N×W) |
| LCS | 2D DP | O(M×N) |
| Coin Change | 1D DP | O(N×coins) |
| LIS | 1D DP | O(N²) |

> Start every DP problem by defining **what dp[i] represents**, then write the recurrence relation.
`,
  starterCode: `#include <iostream>
using namespace std;

int climbStairs(int n) {
    // TODO: Return number of ways to climb n stairs
    // taking 1 or 2 steps at a time
    return 0;
}

int main() {
    cout << climbStairs(3) << "\\n"; // 3
    cout << climbStairs(5) << "\\n"; // 8
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b; b = c;
    }
    return b;
}

int main() {
    cout << climbStairs(3) << "\\n";
    cout << climbStairs(5) << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'climbStairs(3) = 3 ways, climbStairs(5) = 8 ways', expectedOutput: '3\n8' },
  ],
  hints: [
    'This is essentially Fibonacci: ways(n) = ways(n-1) + ways(n-2).',
    'Base cases: ways(1) = 1, ways(2) = 2.',
    'Use two variables a and b to track the last two values — no need for an array.',
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['cognizant', 'dp', 'dynamic-programming', 'dsa'],
};
export default lesson;
