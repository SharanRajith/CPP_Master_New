const lesson = {
  id: 'msvc-l1',
  title: 'TCS: Array DSA Questions',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 53,  title: 'Maximum Subarray',          url: 'https://leetcode.com/problems/maximum-subarray/',          difficulty: 'Medium' },
    { id: 283, title: 'Move Zeroes',               url: 'https://leetcode.com/problems/move-zeroes/',               difficulty: 'Easy' },
    { id: 169, title: 'Majority Element',          url: 'https://leetcode.com/problems/majority-element/',          difficulty: 'Easy' },
  ],
  content: `# TCS Digital — Array DSA Questions

TCS Digital and TCS NQT both heavily test **array manipulation**. These are the patterns that repeat every year.

---

## 1. Find Second Largest Element

\`\`\`cpp
int secondLargest(vector<int>& arr) {
    int first = INT_MIN, second = INT_MIN;
    for (int x : arr) {
        if (x > first) { second = first; first = x; }
        else if (x > second && x != first) second = x;
    }
    return second;
}
\`\`\`

> **TCS favourite** — asked in almost every batch.

---

## 2. Move All Zeros to End

\`\`\`cpp
void moveZeros(vector<int>& arr) {
    int pos = 0;
    for (int x : arr) if (x != 0) arr[pos++] = x;
    while (pos < arr.size()) arr[pos++] = 0;
}
\`\`\`

---

## 3. Majority Element (Moore's Voting)

Element appearing more than n/2 times:

\`\`\`cpp
int majorityElement(vector<int>& arr) {
    int candidate = arr[0], count = 1;
    for (int i = 1; i < arr.size(); i++) {
        count += (arr[i] == candidate) ? 1 : -1;
        if (count == 0) { candidate = arr[i]; count = 1; }
    }
    return candidate;
}
\`\`\`

---

## 4. Maximum Subarray Sum (Kadane's)

\`\`\`cpp
int maxSubArray(vector<int>& arr) {
    int maxSum = arr[0], curr = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        curr = max(arr[i], curr + arr[i]);
        maxSum = max(maxSum, curr);
    }
    return maxSum;
}
\`\`\`

---

## 5. Rotate Array by K positions

\`\`\`cpp
void rotate(vector<int>& arr, int k) {
    int n = arr.size();
    k %= n;
    reverse(arr.begin(), arr.end());
    reverse(arr.begin(), arr.begin() + k);
    reverse(arr.begin() + k, arr.end());
}
\`\`\`

---

## TCS Interview Tips

- Always handle **edge cases**: empty array, single element, all duplicates.
- TCS Digital asks medium-difficulty problems; NQT stays at easy-medium.
- Time complexity explanation is expected — know O(N) vs O(N²).
`,
  starterCode: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int secondLargest(vector<int>& arr) {
    // TODO: Return second largest element
    // Handle case where all elements are same (return -1)
    return -1;
}

int main() {
    vector<int> arr = {12, 35, 1, 10, 34, 1};
    cout << secondLargest(arr) << "\\n"; // 34
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int secondLargest(vector<int>& arr) {
    int first = INT_MIN, second = INT_MIN;
    for (int x : arr) {
        if (x > first) { second = first; first = x; }
        else if (x > second && x != first) second = x;
    }
    return (second == INT_MIN) ? -1 : second;
}

int main() {
    vector<int> arr = {12, 35, 1, 10, 34, 1};
    cout << secondLargest(arr) << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'Find second largest from {12, 35, 1, 10, 34, 1}', expectedOutput: '34' },
  ],
  hints: [
    'Track two variables: first (largest) and second (second largest).',
    'When a new element is larger than first, shift first to second before updating first.',
    'When element is smaller than first but larger than second (and not equal to first), update second.',
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['tcs', 'array', 'dsa', 'nqt'],
};
export default lesson;
