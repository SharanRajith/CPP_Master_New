const lesson = {
  id: 'm13-l8',
  title: 'Amazon: Coin Change',
  module: 13,
  lessonNumber: 8,
  xpReward: 25,
  leetcodeProblems: [
    { id: 322, title: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/', difficulty: 'Medium' },
  ],
  content: `# Amazon: Coin Change

**LeetCode #322** — Coin Change is the canonical Dynamic Programming problem. Amazon asks it because it perfectly tests whether a candidate understands the DP framework: **overlapping subproblems + optimal substructure**.

## Why Greedy Fails

Your first instinct might be greedy: always pick the largest coin. This fails for \`coins=[1,3,4], amount=6\`: greedy picks 4+1+1=3 coins, but 3+3=2 coins is optimal. You need DP.

## The DP Insight

Define \`dp[i]\` = the minimum number of coins needed to make amount \`i\`. The recurrence is:

\`\`\`
dp[0] = 0  (base case: 0 coins needed for amount 0)
dp[i] = min(dp[i - coin] + 1) for each coin where coin <= i
\`\`\`

This works because: if you can make amount \`i - coin\` with \`k\` coins, you can make amount \`i\` with \`k + 1\` coins by adding \`coin\`. We take the minimum over all valid coins.

## Visualization for amount=11, coins=[1,5,6,9]

\`\`\`
i:   0  1  2  3  4  5  6  7  8  9  10  11
dp:  0  1  2  3  4  1  1  2  2  1   2   2
\`\`\`

- \`dp[5]\` = \`dp[5-5]+1\` = \`dp[0]+1\` = 1 ✓ (one 5-coin)
- \`dp[11]\` = min(\`dp[10]+1\`, \`dp[6]+1\`, \`dp[5]+1\`, \`dp[2]+1\`) = min(3,2,2,3) = 2 ✓ (5+6)

## Full Implementation Breakdown

1. **Initialize** \`dp\` array of size \`amount+1\` filled with \`amount+1\` (a sentinel "infinity" value — we use \`amount+1\` because that's always larger than any valid answer).
2. Set \`dp[0] = 0\`.
3. **Fill bottom-up**: for each amount \`i\` from 1 to \`amount\`, try every coin. If \`coin <= i\`, update \`dp[i] = min(dp[i], dp[i-coin]+1)\`.
4. Return \`dp[amount]\` if it's \`<= amount\`, else return \`-1\`.

\`\`\`cpp
vector<int> dp(amount + 1, amount + 1);
dp[0] = 0;
for (int i = 1; i <= amount; i++)
    for (int coin : coins)
        if (coin <= i)
            dp[i] = min(dp[i], dp[i - coin] + 1);
return dp[amount] > amount ? -1 : dp[amount];
\`\`\`

## Why Amazon Loves This Pattern

Amazon's pricing engine, discount stacking, and reward redemption systems all involve similar "minimum cost to reach a target" problems. The ability to formulate the recurrence and implement bottom-up DP cleanly is the differentiating skill.

## Top-Down Alternative

You can also use memoized recursion: \`memo[amount] = min coins for that amount\`. Both are $O(n \cdot k)$ where $n$ is the amount and $k$ is the number of coin denominations. Bottom-up is preferred in interviews for clarity.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    // TODO: create dp array of size amount+1, initialized to amount+1
    // TODO: set dp[0] = 0
    // TODO: for i from 1 to amount:
    //   for each coin in coins:
    //     if coin <= i: dp[i] = min(dp[i], dp[i-coin]+1)
    // TODO: return dp[amount] > amount ? -1 : dp[amount]
    return -1;
}

int main() {
    vector<int> coins = {1, 5, 6, 9};
    int amount = 11;
    cout << coinChange(coins, amount) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}

int main() {
    vector<int> coins = {1, 5, 6, 9};
    int amount = 11;
    cout << coinChange(coins, amount) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '2', description: 'coins=[1,5,6,9], amount=11 → 2 coins (5+6)' },
  ],
  hints: [
    'Greedy (always pick largest coin) does not work here. You need to try all possibilities — that\'s the hallmark of a DP problem.',
    'Define dp[i] as the fewest coins needed to reach amount i. The answer builds from dp[0]=0 upward.',
    'For each amount i, try subtracting every coin denomination. If dp[i - coin] is reachable, then dp[i] = min(dp[i], dp[i-coin]+1).',
  ],
  complexity: { time: 'O(amount * k)', space: 'O(amount)', notes: 'k is number of coin denominations; classic unbounded knapsack DP' },
  tags: ['dynamic-programming', 'bottom-up', 'amazon', 'medium'],
};
export default lesson;
