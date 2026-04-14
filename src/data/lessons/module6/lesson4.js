const lesson = {
  id: 'm6-l4',
  title: 'Monotonic Stack Fundamentals',
  module: 6,
  lessonNumber: 4,
  xpReward: 15,
  leetcodeProblems: [
    { id: 739, title: 'Daily Temperatures',           url: 'https://leetcode.com/problems/daily-temperatures/',           difficulty: 'Medium' },
    { id: 496, title: 'Next Greater Element I',       url: 'https://leetcode.com/problems/next-greater-element-i/',       difficulty: 'Easy' },
    { id: 901, title: 'Online Stock Span',            url: 'https://leetcode.com/problems/online-stock-span/',            difficulty: 'Medium' },
  ],
  content: `# Monotonic Stack

A **Monotonic Stack** is a stack whose elements are strictly increasing or strictly decreasing. It is the silver bullet for **"Next Greater Element"** problems, reducing $O(N^2)$ brute-force solutions to an elegant $O(N)$.

## The Next Greater Element Problem
Given an array \`[2, 1, 2, 4, 3]\`, find the next strictly greater element for each item:
Answers: \`[4, 2, 4, -1, -1]\`

### The Algorithm (Monotonic Decreasing Stack):
We iterate from left to right. We use the stack to keep track of elements (specifically their indices) that are **waiting** for a greater element.

1. If the current element is **smaller** than the top of the stack, we just push its index. (It's waiting).
2. If the current element is **greater** than the top of the stack, *we found the answer for the top element!* We pop it, and record the answer. We keep popping until the stack is empty or the top is larger than the current element.

\`\`\`cpp
vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> ans(n, -1);     // Default answer is -1
    stack<int> st;              // Stores indices!
    
    for (int i = 0; i < n; i++) {
        // While stack is not empty AND current element > element at st.top()
        while (!st.empty() && nums[i] > nums[st.top()]) {
            int prevIndex = st.top();
            st.pop();
            ans[prevIndex] = nums[i]; // Answer found!
        }
        st.push(i); // Push current index to wait for its next greater
    }
    return ans;
}
\`\`\`

## Why is this O(N)?
There's a nested \`while\` loop inside the \`for\` loop, so it looks like $O(N^2)$. But think about the stack operations:
- Every element is pushed onto the stack exactly **once**.
- Every element is popped from the stack at most **once**.
Total operations = $2N$. Therefore, the time complexity is strictly $O(N)$.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

// Find the Next Greater Element for each item in the array.
// Return a vector of the answers. If none exists, use -1.
vector<int> nextGreaterElements(vector<int>& nums) {
    vector<int> ans(nums.size(), -1);
    stack<int> st; // store indices!
    
    // TODO: implement monotonic stack
    
    return ans;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    vector<int> ans = nextGreaterElements(nums);
    for (int i = 0; i < n; i++) cout << ans[i] << (i == n-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreaterElements(vector<int>& nums) {
    vector<int> ans(nums.size(), -1);
    stack<int> st; 
    for (int i = 0; i < (int)nums.size(); i++) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            ans[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return ans;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for(int i=0; i<n; ++i) cin >> nums[i];
    vector<int> ans = nextGreaterElements(nums);
    for(int i=0; i<n; ++i) cout << ans[i] << (i == n-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '5\n2 1 2 4 3', expectedOutput: '4 2 4 -1 -1', description: 'Basic next greater sequence.' },
    { input: '4\n4 3 2 1',   expectedOutput: '-1 -1 -1 -1', description: 'Strictly decreasing sequence -> no next greater.' },
    { input: '4\n1 2 3 4',   expectedOutput: '2 3 4 -1',    description: 'Strictly increasing sequence.' },
  ],
  hints: [
    'Initialize `vector<int> ans(n, -1);` so the default is -1.',
    'Push the **index**, not the value, onto the `stack<int> st`.',
    'Loop condition: `while (!st.empty() && nums[i] > nums[st.top()])`',
    '`ans[st.top()] = nums[i]`, then `st.pop()` inside the while loop.',
  ],
  complexity: { time: 'O(N) - each element pushed/popped once', space: 'O(N) for stack and result array' },
  tags: ['stack', 'monotonic-stack', 'arrays', 'optimization'],
};
export default lesson;
