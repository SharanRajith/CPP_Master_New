const lesson = {
  id: 'm10-l2',
  title: '1D DP: Climbing Stairs & Min Cost',
  module: 10,
  lessonNumber: 2,
  xpReward: 15,
  leetcodeProblems: [
    { id: 70, title: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy' },
    { id: 746, title: 'Min Cost Climbing Stairs', url: 'https://leetcode.com/problems/min-cost-climbing-stairs/', difficulty: 'Easy' },
  ],
  content: `# Climbing Stairs Structure

A massive percentage of DP problems are just reskinned versions of Fibonacci.

## Climbing Stairs (LeetCode 70)
You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?
- To get to step \`i\`, where did you come from? You either came from step \`i-1\` (a 1-step jump), or step \`i-2\` (a 2-step jump).
- So, total ways to reach \`i\` is the sum of ways to reach \`i-1\` and \`i-2\`.
- This is literally exactly the Fibonacci sequence! $DP[i] = DP[i-1] + DP[i-2]$.

## Min Cost Climbing Stairs (LeetCode 746)
You are given an integer array \`cost\` where \`cost[i]\` is the cost of step \`i\` on a staircase. Once you pay the cost, you can either climb one or two steps.
What is the MINIMUM cost to reach the top floor? (You can start from step 0 or step 1).

### Defining the DP State
Let $DP[i]$ be the **minimum cost** to reach step \`i\`.
To reach step \`i\`, I must have stood on step \`i-1\` or \`i-2\`, and paid their respective costs!

**The Transition Equation:**
$$DP[i] = \\min(DP[i-1] + cost[i-1], \\; DP[i-2] + cost[i-2])$$

### Code
\`\`\`cpp
int minCostClimbingStairs(vector<int>& cost) {
    int n = cost.size();
    vector<int> dp(n + 1, 0); 
    // dp[0] = 0, dp[1] = 0 (Free to start at either)
    
    for (int i = 2; i <= n; i++) {
        dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]);
    }
    return dp[n]; // Reached the top!
}
\`\`\`

> **Note:** The "top" of the staircase is actually index \`n\`, which is just past the end of the \`cost\` array. That's why the \`dp\` array is size \`n + 1\`.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Re-implement Min Cost Climbing Stairs using O(1) Space!
int minCostClimbingStairs(vector<int>& cost) {
    int n = cost.size();
    
    // Start free
    int prev2 = 0; // Cost to reach step 0
    int prev = 0;  // Cost to reach step 1
    
    for (int i = 2; i <= n; i++) {
        // TODO: Calculate curr = min of taking 1 step from prev OR 2 steps from prev2
        // Update prev2 and prev
    }
    
    // return prev;
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> cost(n);
    for (int i = 0; i < n; i++) cin >> cost[i];
    
    cout << minCostClimbingStairs(cost) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int minCostClimbingStairs(vector<int>& cost) {
    int n = cost.size();
    int prev2 = 0;
    int prev = 0;
    
    for (int i = 2; i <= n; i++) {
        int curr = min(prev + cost[i-1], prev2 + cost[i-2]);
        prev2 = prev;
        prev = curr;
    }
    return prev;
}

int main() {
    int n; cin >> n;
    vector<int> cost(n);
    for (int i = 0; i < n; i++) cin >> cost[i];
    cout << minCostClimbingStairs(cost) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '3\n10 15 20', expectedOutput: '15', description: 'Start at index 1 (pay 15), climb 2 steps to the top.' },
    { input: '10\n1 100 1 1 1 100 1 1 100 1', expectedOutput: '6', description: 'Optimal path avoids all 100s by making selective jumps.' },
  ],
  hints: [
    'To arrive from `prev`, you had to be on the step `i-1`. To leave that step, you paid `cost[i-1]`. So total cost via that route is `prev + cost[i-1]`.',
    'Just like Fibonacci, `int curr = min(prev + cost[i-1], prev2 + cost[i-2]);`'
  ],
  complexity: { time: 'O(N)', space: 'O(1) heavily optimized' },
  tags: ['dp', '1d-dp', 'fibonacci', 'space-optimization'],
};
export default lesson;
