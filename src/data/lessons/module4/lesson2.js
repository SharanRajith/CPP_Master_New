const lesson = {
  id: 'm4-l2',
  title: 'Sliding Window Technique',
  module: 4,
  lessonNumber: 2,
  xpReward: 10,
  leetcodeProblems: [
    { id: 643,  title: 'Maximum Average Subarray I',              url: 'https://leetcode.com/problems/maximum-average-subarray-i/',              difficulty: 'Easy' },
    { id: 3,    title: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium' },
    { id: 76,   title: 'Minimum Window Substring',                url: 'https://leetcode.com/problems/minimum-window-substring/',                difficulty: 'Hard' },
  ],
  content: `# Sliding Window Technique

The **Sliding Window** technique efficiently computes results for **contiguous subarrays** by maintaining a window that expands and contracts instead of recomputing from scratch.

## Why It Matters
- Brute force for "best subarray of size k" = O(n·k)
- Sliding window = **O(n)** — the window slides one step at a time

## Pattern 1: Fixed-Size Window
The window size is constant. Add the right element, remove the left element.

\`\`\`cpp
// Maximum sum of k consecutive elements
int maxSum(vector<int>& nums, int k) {
    int windowSum = 0;
    
    // Build first window
    for (int i = 0; i < k; i++) windowSum += nums[i];
    
    int maxS = windowSum;
    
    // Slide window: add right, subtract left
    for (int i = k; i < nums.size(); i++) {
        windowSum += nums[i] - nums[i - k];
        maxS = max(maxS, windowSum);
    }
    return maxS;
}
\`\`\`

## Pattern 2: Variable-Size Window (Expand/Shrink)
The window grows from the right and shrinks from the left when a constraint is violated.

\`\`\`cpp
// Longest substring with at most K distinct characters
int longestSubstringK(string s, int k) {
    unordered_map<char, int> freq;
    int left = 0, maxLen = 0;
    
    for (int right = 0; right < s.size(); right++) {
        freq[s[right]]++;                 // Expand right
        
        while (freq.size() > k) {         // Constraint violated
            freq[s[left]]--;
            if (freq[s[left]] == 0) freq.erase(s[left]);
            left++;                       // Shrink left
        }
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
\`\`\`

## Sliding Window Template
\`\`\`
right → always moves forward (one step per iteration)
left  → only moves when constraint is violated
result → window size = right - left + 1
\`\`\`

> **Key Insight:** When the window slides, only ONE element enters and ONE element leaves — so each element is processed at most twice: once when entering, once when leaving. This gives O(n) total time.
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Find the maximum sum of any contiguous subarray of exactly size k.
int maxSumSubarray(vector<int>& nums, int k) {
    // TODO: Use the fixed-size sliding window pattern
    // 1. Build the first window of size k
    // 2. Slide: add nums[i], subtract nums[i-k]
    return 0;
}

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << maxSumSubarray(nums, k) << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

int maxSumSubarray(vector<int>& nums, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += nums[i];
    int maxS = windowSum;
    for (int i = k; i < (int)nums.size(); i++) {
        windowSum += nums[i] - nums[i - k];
        maxS = max(maxS, windowSum);
    }
    return maxS;
}

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << maxSumSubarray(nums, k) << endl;
    return 0;
}`,
  testCases: [
    { input: '5 3\n2 1 5 1 3', expectedOutput: '9',  description: 'Max sum window of size 3 in [2,1,5,1,3] = 5+1+3=9' },
    { input: '4 2\n-1 4 2 1',  expectedOutput: '6',  description: 'Handles negative numbers, max window = 4+2=6' },
    { input: '3 3\n1 2 3',     expectedOutput: '6',  description: 'Single window covers whole array' },
  ],
  hints: [
    'First compute the sum of the first k elements as your initial window.',
    'Then loop from i=k to n-1: add nums[i] and subtract nums[i-k].',
    'Track the maximum at each step with `maxS = max(maxS, windowSum);`.',
  ],
  complexity: {
    time:  'O(n) — single pass',
    space: 'O(1) — only tracking window sum',
    notes: 'Key insight: each element enters and exits the window at most once.',
  },
  tags: ['sliding-window', 'arrays', 'subarray', 'pattern'],
};
export default lesson;
