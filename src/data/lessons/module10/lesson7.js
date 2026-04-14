const lesson = {
  id: 'm10-l7',
  title: 'Longest Increasing Subsequence (LIS)',
  module: 10,
  lessonNumber: 7,
  xpReward: 20,
  leetcodeProblems: [
    { id: 300, title: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'Medium' },
  ],
  content: `# Longest Increasing Subsequence

Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.
For example, given ` + "`" + `[10, 9, 2, 5, 3, 7, 101, 18]` + "`" + `, the LIS is ` + "`" + `[2, 3, 7, 101]` + "`" + ` (length 4).

## The $O(N^2)$ DP Approach
Let $DP[i]$ be the length of the LIS that **strictly ends at index $i$**.
Because a single element is technically an increasing subsequence of length 1, we initialize the $DP$ array with $1$s.

For every index $i$, we loop backwards through all previous indices $j$ (where $0 \\le j < i$).
If we find a number smaller than our current number (` + "`" + `nums[j] < nums[i]` + "`" + `), we can attach our current number to the end of that subsequence!
We update $DP[i] = \\max(DP[i], DP[j] + 1)$.

\`\`\`cpp
int lengthOfLIS(vector<int>& nums) {
    if (nums.empty()) return 0;
    int n = nums.size();
    vector<int> dp(n, 1);
    
    int maxLength = 1;
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        maxLength = max(maxLength, dp[i]);
    }
    return maxLength;
}
\`\`\`

## The Optimal $O(N \\log N)$ Approaches
While the $O(N^2)$ DP is the core concept, FAANG interviewers will ask for the optimal solution: Using **Binary Search**.

You maintain an array \`sub\`.
- Iterate through \`nums\`.
- If the current number is strictly greater than the last number in \`sub\`, append it to \`sub\`.
- Otherwise, use **Binary Search (std::lower_bound)** to find the first element in \`sub\` that is $\\ge$ the current number, and **replace** it!
- The length of \`sub\` at the end is the length of the LIS!

\`\`\`cpp
// Using std::lower_bound for O(N log N)
int lengthOfLIS(vector<int>& nums) {
    vector<int> sub;
    for (int x : nums) {
        if (sub.empty() || sub.back() < x) {
            sub.push_back(x);
        } else {
            auto it = lower_bound(sub.begin(), sub.end(), x);
            *it = x; // Replace
        }
    }
    return sub.size();
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Implement the optimal O(N log N) solution using Binary Search
int lengthOfLIS(vector<int>& nums) {
    vector<int> sub;
    
    for (int x : nums) {
        // TODO: If sub is empty OR x is strictly greater than sub.back(), push x
        // TODO: Else, binary search for the first element >= x using lower_bound
        // TODO: Replace that element with x
    }
    
    // return sub.size();
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    cout << lengthOfLIS(nums) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLIS(vector<int>& nums) {
    vector<int> sub;
    for (int x : nums) {
        if (sub.empty() || sub.back() < x) {
            sub.push_back(x);
        } else {
            auto it = lower_bound(sub.begin(), sub.end(), x);
            *it = x;
        }
    }
    return sub.size();
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << lengthOfLIS(nums) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '8\n10 9 2 5 3 7 101 18', expectedOutput: '4', description: 'Classic testcase: 2, 3, 7, 101 is LIS.' },
    { input: '6\n0 1 0 3 2 3', expectedOutput: '4', description: '0, 1, 2, 3 is LIS.' },
    { input: '7\n7 7 7 7 7 7 7', expectedOutput: '1', description: 'Strictly increasing requirement.' },
  ],
  hints: [
    '`auto it = lower_bound(sub.begin(), sub.end(), x);` finds the iterator to the smallest element that is >= x.',
    '`*it = x;` dereferences the iterator to overwrite the value.',
  ],
  complexity: { time: 'O(N log N)', space: 'O(N) for `sub` array' },
  tags: ['dp', 'binary-search', 'array', 'lis'],
};
export default lesson;
