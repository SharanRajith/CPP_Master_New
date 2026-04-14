const lesson = {
  id: 'm4-l10',
  title: 'Greedy Algorithms on Arrays',
  module: 4,
  lessonNumber: 10,
  xpReward: 15,
  leetcodeProblems: [
    { id: 55,  title: 'Jump Game',              url: 'https://leetcode.com/problems/jump-game/',              difficulty: 'Medium' },
    { id: 45,  title: 'Jump Game II',           url: 'https://leetcode.com/problems/jump-game-ii/',           difficulty: 'Medium' },
    { id: 135, title: 'Candy',                  url: 'https://leetcode.com/problems/candy/',                  difficulty: 'Hard' },
    { id: 121, title: 'Best Time to Buy and Sell Stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'Easy' },
  ],
  content: `# Greedy Algorithms on Arrays

A **Greedy Algorithm** makes the locally optimal choice at each step, hoping it leads to the global optimum. When it works, it's beautiful — O(n) with no DP table.

## When Does Greedy Work?
✅ When choosing the local best at each step doesn't hurt future choices  
✅ When a "greedy exchange argument" can prove correctness  
❌ When past decisions affect future constraints (use DP instead)

## Pattern 1: Best Time to Buy & Sell Stock (LeetCode #121)
Track the minimum price seen so far — that's your best buy date.
\`\`\`cpp
int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, maxProfit = 0;
    for (int price : prices) {
        minPrice  = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    return maxProfit;
}
\`\`\`

## Pattern 2: Jump Game (LeetCode #55)
Track the furthest index reachable. If current index exceeds it, you're stuck.
\`\`\`cpp
bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (i > maxReach) return false;           // Can't reach here
        maxReach = max(maxReach, i + nums[i]);    // Update furthest jump
    }
    return true;
}
\`\`\`

## Pattern 3: Jump Game II — Minimum Jumps (LeetCode #45)
Use "level" boundaries like BFS. Jump when you exhaust the current level.
\`\`\`cpp
int jump(vector<int>& nums) {
    int jumps = 0, curEnd = 0, farthest = 0;
    for (int i = 0; i < (int)nums.size() - 1; i++) {
        farthest = max(farthest, i + nums[i]);
        if (i == curEnd) {   // Must make a jump here
            jumps++;
            curEnd = farthest;
        }
    }
    return jumps;
}
\`\`\`

## Greedy vs DP Decision Matrix
| Problem | Greedy? | Why |
|---|---|---|
| Max stock profit (1 trade) | ✅ | Track running minimum |
| Max stock profit (unlimited trades) | ✅ | Take every upswing |
| Coin change (minimize coins) | ❌ | Greedy fails for [1,3,4], target=6 |
| Jump Game (can reach?) | ✅ | Max reach is monotonic |
`,
  starterCode: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Best Time to Buy and Sell Stock.
// Find the maximum profit from one buy and one sell.
// You must buy before you sell. If no profit possible, return 0.
int maxProfit(vector<int>& prices) {
    // TODO: Track minimum price seen so far.
    // At each price, compute profit = price - minPrice.
    // Return the max profit seen.
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> prices(n);
    for (int i = 0; i < n; i++) cin >> prices[i];
    cout << maxProfit(prices) << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, maxP = 0;
    for (int price : prices) {
        minPrice = min(minPrice, price);
        maxP     = max(maxP, price - minPrice);
    }
    return maxP;
}

int main() {
    int n;
    cin >> n;
    vector<int> prices(n);
    for (int i = 0; i < n; i++) cin >> prices[i];
    cout << maxProfit(prices) << endl;
    return 0;
}`,
  testCases: [
    { input: '6\n7 1 5 3 6 4', expectedOutput: '5',  description: 'Buy at 1, sell at 6 → profit 5' },
    { input: '5\n7 6 4 3 1',   expectedOutput: '0',  description: 'Always decreasing → no profit → 0' },
    { input: '2\n1 2',          expectedOutput: '1',  description: 'Simple single trade' },
  ],
  hints: [
    'Initialize `int minPrice = INT_MAX, maxProfit = 0;`',
    'Loop through prices. Update `minPrice = min(minPrice, price);`',
    'Then update `maxProfit = max(maxProfit, price - minPrice);`',
    'You cannot sell before you buy — updating minPrice first guarantees we only sell after buying.',
  ],
  complexity: {
    time:  'O(n) — single greedy pass',
    space: 'O(1) — two variables only',
    notes: 'The greedy insight: always buy at the lowest price seen so far. The optimal sell date is whatever comes after.',
  },
  tags: ['greedy', 'arrays', 'stock', 'pattern'],
};
export default lesson;
