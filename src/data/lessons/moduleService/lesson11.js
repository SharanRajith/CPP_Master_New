const lesson = {
  id: 'msvc-l11',
  title: 'Wipro: Two Pointer & Sliding Window',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 167, title: 'Two Sum II — Input Array Is Sorted', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', difficulty: 'Medium' },
    { id: 3,   title: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium' },
    { id: 209, title: 'Minimum Size Subarray Sum',          url: 'https://leetcode.com/problems/minimum-size-subarray-sum/',          difficulty: 'Medium' },
  ],
  content: `# Wipro NLTH — Two Pointer & Sliding Window

Two-pointer and sliding window are the go-to patterns for O(N) solutions to subarray/substring problems. Very common in Wipro and TCS CodeVita.

---

## 1. Two Pointer — Pair with Target Sum (Sorted Array)

\`\`\`cpp
pair<int,int> twoSum(vector<int>& arr, int target) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        int sum = arr[l] + arr[r];
        if (sum == target) return {l, r};
        else if (sum < target) l++;
        else r--;
    }
    return {-1, -1}; // not found
}
// {1,2,3,4,6}, target=6 → indices {1,3} (2+4)
\`\`\`

---

## 2. Two Pointer — Container With Most Water

\`\`\`cpp
int maxArea(vector<int>& h) {
    int l = 0, r = h.size() - 1, res = 0;
    while (l < r) {
        res = max(res, min(h[l], h[r]) * (r - l));
        if (h[l] < h[r]) l++;
        else r--;
    }
    return res;
}
\`\`\`

---

## 3. Sliding Window — Longest Substring Without Repeating Chars

\`\`\`cpp
int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> last; // char → last seen index
    int res = 0, left = 0;
    for (int right = 0; right < s.size(); right++) {
        if (last.count(s[right]) && last[s[right]] >= left)
            left = last[s[right]] + 1;
        last[s[right]] = right;
        res = max(res, right - left + 1);
    }
    return res;
}
// "abcabcbb" → 3 ("abc")
\`\`\`

---

## 4. Sliding Window — Fixed Size (Max Sum Subarray of Size K)

\`\`\`cpp
int maxSumSubarray(vector<int>& arr, int k) {
    int sum = 0, maxSum = 0;
    for (int i = 0; i < k; i++) sum += arr[i]; // first window
    maxSum = sum;
    for (int i = k; i < arr.size(); i++) {
        sum += arr[i] - arr[i - k]; // slide: add new, remove old
        maxSum = max(maxSum, sum);
    }
    return maxSum;
}
// {2,1,5,1,3,2}, k=3 → 9 (5+1+3)
\`\`\`

---

## 5. Sliding Window — Minimum Window with Sum ≥ Target

\`\`\`cpp
int minSubarrayLen(int target, vector<int>& nums) {
    int left = 0, sum = 0, res = INT_MAX;
    for (int right = 0; right < nums.size(); right++) {
        sum += nums[right];
        while (sum >= target) {
            res = min(res, right - left + 1);
            sum -= nums[left++];
        }
    }
    return res == INT_MAX ? 0 : res;
}
// {2,3,1,2,4,3}, target=7 → 2 (subarray {4,3})
\`\`\`

---

## Pattern Guide

| Pattern | When to Use | Direction |
|---|---|---|
| Two Pointer | Sorted array, pair sum | converge inward |
| Sliding Window Fixed | Exactly K elements | expand right, slide |
| Sliding Window Variable | At least/most K | expand right, shrink left |

> Two pointer works on sorted arrays. Sliding window works on any array for contiguous subarrays.
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

int maxSumSubarray(vector<int>& arr, int k) {
    // TODO: Return the maximum sum of any contiguous subarray of size k
    return 0;
}

int main() {
    vector<int> arr = {2, 1, 5, 1, 3, 2};
    cout << maxSumSubarray(arr, 3) << "\\n"; // 9
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

int maxSumSubarray(vector<int>& arr, int k) {
    int sum = 0, maxSum = 0;
    for (int i = 0; i < k; i++) sum += arr[i];
    maxSum = sum;
    for (int i = k; i < (int)arr.size(); i++) {
        sum += arr[i] - arr[i - k];
        maxSum = max(maxSum, sum);
    }
    return maxSum;
}

int main() {
    vector<int> arr = {2, 1, 5, 1, 3, 2};
    cout << maxSumSubarray(arr, 3) << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'maxSumSubarray({2,1,5,1,3,2}, 3) = 9', expectedOutput: '9' },
  ],
  hints: [
    'First compute the sum of the first k elements.',
    'Then slide the window: add arr[i] and subtract arr[i-k].',
    'Track the maximum sum seen across all windows.',
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['wipro', 'two-pointer', 'sliding-window', 'dsa'],
};
export default lesson;
