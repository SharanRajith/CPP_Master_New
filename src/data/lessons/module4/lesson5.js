const lesson = {
  id: 'm4-l5',
  title: "Kadane's Algorithm — Maximum Subarray",
  module: 4,
  lessonNumber: 5,
  xpReward: 10,
  leetcodeProblems: [
    { id: 53,  title: 'Maximum Subarray',            url: 'https://leetcode.com/problems/maximum-subarray/',            difficulty: 'Medium' },
    { id: 918, title: 'Maximum Sum Circular Subarray',url: 'https://leetcode.com/problems/maximum-sum-circular-subarray/',difficulty: 'Medium' },
    { id: 152, title: 'Maximum Product Subarray',     url: 'https://leetcode.com/problems/maximum-product-subarray/',     difficulty: 'Medium' },
  ],
  content: `# Kadane's Algorithm

**Kadane's Algorithm** solves the Maximum Subarray Sum problem in O(n) — one of the most elegant algorithms in computer science.

## The Core Idea
At each index, you have exactly two choices:
1. **Extend** the current subarray by adding \`nums[i]\`
2. **Start fresh** at \`nums[i]\` (when the running sum goes negative, it only drags you down)

\`\`\`cpp
int maxSubArray(vector<int>& nums) {
    int currentSum = nums[0];   // Best sum ending at current index
    int maxSum     = nums[0];   // Global best seen so far
    
    for (int i = 1; i < nums.size(); i++) {
        // Extend or restart?
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum     = max(maxSum, currentSum);
    }
    return maxSum;
}
\`\`\`

## Trace Through Example
\`\`\`
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

i=0: cur=-2,  max=-2
i=1: cur=max(1,-2+1)=1,     max=1
i=2: cur=max(-3,1-3)=-2,   max=1
i=3: cur=max(4,-2+4)=4,     max=4
i=4: cur=max(-1,4-1)=3,     max=4
i=5: cur=max(2,3+2)=5,      max=5
i=6: cur=max(1,5+1)=6,      max=6  ← Answer!
i=7: cur=max(-5,6-5)=1,     max=6
i=8: cur=max(4,1+4)=5,      max=6

Answer: 6  (subarray [4,-1,2,1])
\`\`\`

## The Reformulation
\`currentSum = max(nums[i], currentSum + nums[i])\` means:

- **If** currentSum is negative → it makes any extension worse → **reset to nums[i]**
- **If** currentSum is positive → extending always helps → **keep accumulating**

> This algorithm is a classic example of **Dynamic Programming** — each \`currentSum[i]\` only depends on \`currentSum[i-1]\` and \`nums[i]\`, so we don't need an array of states, just one variable!
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Find the contiguous subarray with the largest sum.
// Must handle arrays with all negative numbers (return the largest single element).
int maxSubArray(vector<int>& nums) {
    // TODO: Implement Kadane's Algorithm
    // Hint: currentSum = max(nums[i], currentSum + nums[i])
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << maxSubArray(nums) << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int currentSum = nums[0];
    int maxSum     = nums[0];
    for (int i = 1; i < (int)nums.size(); i++) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum     = max(maxSum, currentSum);
    }
    return maxSum;
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << maxSubArray(nums) << endl;
    return 0;
}`,
  testCases: [
    { input: '9\n-2 1 -3 4 -1 2 1 -5 4',  expectedOutput: '6',  description: 'Classic example — best subarray [4,-1,2,1]=6' },
    { input: '1\n1',                        expectedOutput: '1',  description: 'Single element' },
    { input: '4\n-3 -1 -2 -4',             expectedOutput: '-1', description: 'All negatives — return max single element' },
  ],
  hints: [
    'Initialize both `currentSum` and `maxSum` to `nums[0]`, not 0 (handles all-negatives case).',
    'At each step: `currentSum = max(nums[i], currentSum + nums[i]);`',
    'Update global max: `maxSum = max(maxSum, currentSum);`',
  ],
  complexity: {
    time:  'O(n) — single pass',
    space: 'O(1) — only two variables',
    notes: 'This is DP with constant space. The "table" shrinks to a single variable because each state only depends on the previous one.',
  },
  tags: ['kadane', 'dynamic-programming', 'arrays', 'subarray'],
};
export default lesson;
