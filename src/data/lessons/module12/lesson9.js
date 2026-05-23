const lesson = {
  id: 'm12-l9',
  title: 'Maximum Product Subarray',
  module: 12,
  lessonNumber: 9,
  xpReward: 10,
  leetcodeProblems: [{ id: 152, title: 'Maximum Product Subarray', difficulty: 'Medium' }],
  content: `# Maximum Product Subarray

## Problem

Given an integer array, find the contiguous subarray with the **largest product** and return that product.

**Example**:
\`\`\`
Input:  [2, 3, -2, 4]
Output: 6        (subarray [2, 3])

Input:  [-2, 0, -1]
Output: 0        (subarray [0])
\`\`\`

---

## Why Kadane's Doesn't Directly Apply

Unlike maximum sum, products of negatives can flip sign:
- Two negatives → large positive
- One negative → kills the product

So we must track **both** the current maximum AND minimum at every step.

---

## Algorithm

At each index maintain:
- \`maxSoFar\` — largest product ending here
- \`minSoFar\` — smallest (most negative) product ending here

At each element \`x\`:
\`\`\`
newMax = max(x, maxSoFar * x, minSoFar * x)
newMin = min(x, maxSoFar * x, minSoFar * x)
\`\`\`

Update global answer with \`newMax\`.

---

## Worked Trace

Array: [2, 3, -2, 4]

| i | x  | maxSoFar | minSoFar | ans |
|---|----|----------|----------|-----|
| 0 | 2  | 2        | 2        | 2   |
| 1 | 3  | 6        | 3        | 6   |
| 2 | -2 | -2       | -12      | 6   |
| 3 | 4  | -8       | -48      | 6   |

Answer: **6**

---

## Complexity

| | |
|---|---|
| Time | O(n) — single pass |
| Space | O(1) — two variables |
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxProduct(vector<int>& nums) {
    // TODO: implement
    return 0;
}

int main() {
    vector<int> a = {2, 3, -2, 4};
    cout << maxProduct(a) << endl;   // 6

    vector<int> b = {-2, 0, -1};
    cout << maxProduct(b) << endl;   // 0

    vector<int> c = {-2, 3, -4};
    cout << maxProduct(c) << endl;   // 24

    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxProduct(vector<int>& nums) {
    int maxSoFar = nums[0];
    int minSoFar = nums[0];
    int result   = nums[0];

    for (int i = 1; i < (int)nums.size(); i++) {
        int x = nums[i];
        int tempMax = max({x, maxSoFar * x, minSoFar * x});
        int tempMin = min({x, maxSoFar * x, minSoFar * x});
        maxSoFar = tempMax;
        minSoFar = tempMin;
        result = max(result, maxSoFar);
    }
    return result;
}

int main() {
    vector<int> a = {2, 3, -2, 4};
    cout << maxProduct(a) << endl;

    vector<int> b = {-2, 0, -1};
    cout << maxProduct(b) << endl;

    vector<int> c = {-2, 3, -4};
    cout << maxProduct(c) << endl;

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '6\n0\n24',
      description: '[2,3,-2,4]→6, [-2,0,-1]→0, [-2,3,-4]→24',
    },
  ],
  hints: [
    'A negative number can flip a large negative product into a large positive — track both max and min products ending at each index.',
    'At each step: newMax = max(nums[i], maxSoFar*nums[i], minSoFar*nums[i]); similarly for newMin.',
    'Use a tempMax variable before overwriting maxSoFar, otherwise minSoFar computation uses the already-updated value.',
  ],
  complexity: { time: 'O(n)', space: 'O(1)', notes: 'Single pass, two tracking variables' },
  tags: ['dynamic-programming', 'array', 'kadane', 'product', 'sliding-window'],
};
export default lesson;
