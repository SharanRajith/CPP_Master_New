const lesson = {
  id: 'm10-l10',
  title: 'DP on Intervals',
  module: 10,
  lessonNumber: 10,
  xpReward: 20,
  leetcodeProblems: [
    { id: 312, title: 'Burst Balloons', url: 'https://leetcode.com/problems/burst-balloons/', difficulty: 'Hard' },
    { id: 1039, title: 'Minimum Score Triangulation of Polygon', url: 'https://leetcode.com/problems/minimum-score-triangulation-of-polygon/', difficulty: 'Medium' },
  ],
  content: `# DP on Intervals

Also known as **Matrix Chain Multiplication DP**, this is a category of Hard problems where the state depends on an increasingly smaller *interval* or sub-segment of an array.

You generally define $DP[L][R]$ as the optimal answer for the contiguous subarray from index $L$ to index $R$.

## The Blueprint
Instead of choosing what to do first, we often choose **what is the LAST action that happens in this interval?** 
If the action splits the interval into two independent parts: $DP[L][K]$ and $DP[K][R]$, we can use DP to solve them!

\`\`\`cpp
// Generic Interval DP structure
for (int length = 2; length <= n; length++) {
    for (int L = 0; L <= n - length; L++) {
        int R = L + length - 1;
        
        for (int K = L + 1; K < R; K++) {
            int cost = DP[L][K] + DP[K][R] + calculation(L, K, R);
            DP[L][R] = min(DP[L][R], cost);
        }
    }
}
\`\`\`

## Burst Balloons (LeetCode 312)
You have \`n\` balloons. If you burst the \`i\`-th balloon, you get \`nums[i-1] * nums[i] * nums[i+1]\` coins.
Since bursting changes the adjacency of other balloons, doing things forwards is impossible!

**Trick: Go backwards.**
Assume balloon $K$ is the **LAST** balloon to be burst in the interval $(L, R)$.
The penalty (coins gained) for bursting $K$ last is simply \`nums[L-1] * nums[K] * nums[R+1]\`.
Because $K$ is the last, the intervals $(L, K-1)$ and $(K+1, R)$ must have been fully burst independently!
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Implement Burst Balloons (O(N^3))
int maxCoins(vector<int>& nums) {
    int n = nums.size();
    
    // Pad the array with implicit 1s at boundaries
    vector<int> A(n + 2, 1);
    for (int i = 0; i < n; i++) A[i + 1] = nums[i];
    
    // DP table initialized to 0
    vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
    
    // Interval DP loop
    // L goes backwards from n to 1
    for (int left = n; left >= 1; left--) {
        for (int right = left; right <= n; right++) {
            // Pick K, the LAST balloon to be burst in (left, right)
            for (int k = left; k <= right; k++) {
                int cost = A[left - 1] * A[k] * A[right + 1] + 
                           dp[left][k - 1] + dp[k + 1][right];
                dp[left][right] = max(dp[left][right], cost);
            }
        }
    }
    
    return dp[1][n];
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    cout << maxCoins(nums) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxCoins(vector<int>& nums) {
    int n = nums.size();
    vector<int> A(n + 2, 1);
    for (int i = 0; i < n; i++) A[i + 1] = nums[i];
    
    vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
    
    for (int left = n; left >= 1; left--) {
        for (int right = left; right <= n; right++) {
            for (int k = left; k <= right; k++) {
                int cost = A[left - 1] * A[k] * A[right + 1] + dp[left][k - 1] + dp[k + 1][right];
                dp[left][right] = max(dp[left][right], cost);
            }
        }
    }
    return dp[1][n];
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << maxCoins(nums) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4\n3 1 5 8', expectedOutput: '167', description: 'Classic LeetCode Hard test case.' },
    { input: '2\n1 5',     expectedOutput: '10',  description: 'Small array.' },
  ],
  hints: [
    'The 1 padding is critical because bursting a boundary balloon multiplies it by the out-of-bounds 1.',
  ],
  complexity: { time: 'O(N^3)', space: 'O(N^2)' },
  tags: ['dp', 'hard', 'interval-dp'],
};
export default lesson;
