const lesson = {
  id: 'm10-l5',
  title: '0/1 Knapsack Pattern',
  module: 10,
  lessonNumber: 5,
  xpReward: 20,
  leetcodeProblems: [
    { id: 416, title: 'Partition Equal Subset Sum', url: 'https://leetcode.com/problems/partition-equal-subset-sum/', difficulty: 'Medium' },
  ],
  content: `# 0/1 Knapsack Pattern

The Knapsack problem is the grandfather of all subsets/combinations DP questions. 
You are given a bag with a weight capacity $W$, and $N$ items. Each item has a \`weight\` and a \`value\`. You can either take an item (1) or leave it (0). Maximize the value!

Many problems are exact clones of this pattern.

## Partition Equal Subset Sum
Given an integer array \`nums\`, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal.
If the total sum of the array is $S$, we are essentially asking: **Can we find a subset of items that sums exactly to $S/2$?**
If $S$ is odd, it's impossible.

This is a classic 0/1 Knapsack problem where the "capacity" is $S/2$, and the "weight" and "value" of an item are both just \`nums[i]\`.

### The 1D DP Solution
Let \`dp[j]\` be a boolean representing whether a subset sum of exactly \`j\` is possible.
We initialize \`dp[0] = true\` (we can always make a sum of 0 by picking nothing).

We iterate through every number in \`nums\`. For each number, we iterate *backwards* through the possible sums \`j\` from \`Capacity\` down to \`num\`.
If ` + "`" + `dp[j - num]` + "`" + ` is true, it means we can make the sum \`j - num\`. If we add our current \`num\` to that subset, we can make the sum \`j\`!
So, ` + "`" + `dp[j] = dp[j] || dp[j - num];` + "`" + `

\`\`\`cpp
bool canPartition(vector<int>& nums) {
    int sum = 0;
    for (int num : nums) sum += num;
    
    // If sum is odd, we cannot split it perfectly in half
    if (sum % 2 != 0) return false;
    
    int target = sum / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    
    // Iterate through all items
    for (int num : nums) {
        // Iterate backwards from target to num
        for (int j = target; j >= num; j--) {
            // Can we make sum 'j'?
            // Yes, if we could already make it (dp[j]) 
            // OR if we can make (j - num) and we add this num!
            dp[j] = dp[j] || dp[j - num];
        }
    }
    
    return dp[target];
}
\`\`\`

> **Why iterate backwards?** If we iterate forwards, we might use the SAME ` + "`" + `num` + "`" + ` multiple times in the same pass! Iterating backwards guarantees we only use the current element once.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

// Return true if the array can be partitioned into two equal sum subsets.
bool canPartition(vector<int>& nums) {
    int sum = 0;
    for (int num : nums) sum += num;
    
    if (sum % 2 != 0) return false;
    
    int target = sum / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    
    for (int num : nums) {
        // TODO: iterate j backwards from target down to num
        // apply the transition: dp[j] = dp[j] || dp[j - num]
    }
    
    return dp[target];
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    cout << (canPartition(nums) ? "true" : "false") << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

bool canPartition(vector<int>& nums) {
    int sum = 0;
    for (int num : nums) sum += num;
    
    if (sum % 2 != 0) return false;
    
    int target = sum / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    
    for (int num : nums) {
        for (int j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    return dp[target];
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    cout << (canPartition(nums) ? "true" : "false") << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4\n1 5 11 5', expectedOutput: 'true', description: 'Can be partitioned as [1, 5, 5] and [11].' },
    { input: '4\n1 2 3 5', expectedOutput: 'false', description: 'Sum is 11 (odd), automatically false.' },
  ],
  hints: [
    'The inner loop must go backwards: `for (int j = target; j >= num; j--)`',
    '`dp[j] = dp[j] || dp[j - num];` means "I can make sum j if I could already make it before, OR if I could make sum (j - num) and I add the current num to it".',
  ],
  complexity: { time: 'O(N * target)', space: 'O(target) for the 1D DP array' },
  tags: ['dp', 'knapsack', 'subset-sum'],
};
export default lesson;
