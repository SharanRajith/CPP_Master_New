const lesson = {
  id: 'm6-l5',
  title: 'Next Greater Element II (Circular Arrays)',
  module: 6,
  lessonNumber: 5,
  xpReward: 10,
  leetcodeProblems: [
    { id: 503, title: 'Next Greater Element II', url: 'https://leetcode.com/problems/next-greater-element-ii/', difficulty: 'Medium' },
    { id: 42,  title: 'Trapping Rain Water',     url: 'https://leetcode.com/problems/trapping-rain-water/',     difficulty: 'Hard' },
  ],
  content: `# Next Greater Element in a Circular Array

In the standard "Next Greater Element" problem, if an element doesn't have a greater element to its right, the answer is -1. 

But what if the array is **circular**? Meaning you can wrap around from the end of the array back to the beginning to find a greater element.

Example: \`[1, 2, 1]\`
- The next greater for \`1\` is \`2\`.
- The next greater for \`2\` is \`-1\` (it's the max).
- The next greater for the last \`1\` is **\`2\`**, because we loop around!
Answers: \`[2, -1, 2]\`

## The 2N Loop Trick
To simulate a circular array without actually doing complex modulo mathematics iteratively, we can just **process the array twice**.

Imagine the array is duplicated: \`[1, 2, 1]\` becomes \`[1, 2, 1, 1, 2, 1]\`.
If we run our standard monotonic stack algorithm on this conceptual $2N$ array, we perfectly solve the circular condition!

\`\`\`cpp
vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> ans(n, -1);
    stack<int> st;
    
    // Process array twice (2*n)
    for (int i = 0; i < 2 * n; i++) {
        // Use modulo to safely access the original array
        int idx = i % n;
        
        while (!st.empty() && nums[idx] > nums[st.top()]) {
            ans[st.top()] = nums[idx];
            st.pop();
        }
        
        // We only need to push indices from the first pass!
        // In the second pass we just pop to find answers.
        if (i < n) {
            st.push(idx);
        }
    }
    return ans;
}
\`\`\`

> **Key Insight:** You don't literally duplicate the array in memory constraints. You just loop up to $2 \times N$ and use \`i % n\` to get the values.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

// Find the Next Greater Element for each item in a CIRCULAR array.
// Return a vector of the answers. If none exists, use -1.
vector<int> nextGreaterElementsCircular(vector<int>& nums) {
    int n = nums.size();
    vector<int> ans(n, -1);
    stack<int> st; // store indices
    
    // TODO: Loop from i = 0 to 2*n - 1
    // Update indices using modulo (idx = i % n)
    // Run the monotonic stack pop logic
    // Only push to the stack if i < n
    
    return ans;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    vector<int> ans = nextGreaterElementsCircular(nums);
    for (int i = 0; i < n; i++) cout << ans[i] << (i == n-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreaterElementsCircular(vector<int>& nums) {
    int n = nums.size();
    vector<int> ans(n, -1);
    stack<int> st; 
    for (int i = 0; i < 2 * n; i++) {
        int idx = i % n;
        while (!st.empty() && nums[idx] > nums[st.top()]) {
            ans[st.top()] = nums[idx];
            st.pop();
        }
        if (i < n) st.push(idx);
    }
    return ans;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for(int i=0; i<n; ++i) cin >> nums[i];
    vector<int> ans = nextGreaterElementsCircular(nums);
    for(int i=0; i<n; ++i) cout << ans[i] << (i == n-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '3\n1 2 1', expectedOutput: '2 -1 2', description: 'Basic circular sequence.' },
    { input: '5\n1 2 3 4 3',   expectedOutput: '2 3 4 -1 4', description: 'Wraparound finds 4 for the final 3.' },
    { input: '1\n42',   expectedOutput: '-1',    description: 'Single element -> -1.' },
  ],
  hints: [
    'The loop runs `2 * n` times.',
    'Access values using `nums[i % n]`.',
    'Do the standard Monotonic Stack pop logic: `while (!st.empty() && nums[i % n] > nums[st.top()])`',
    '`st.push(i % n)` should only happen when `i < n`. The second pass is purely to resolve waiting elements.',
  ],
  complexity: { time: 'O(N) - 2N iterations, each element pushed once', space: 'O(N) for the stack and answer array' },
  tags: ['stack', 'monotonic-stack', 'circular-array', 'arrays'],
};
export default lesson;
