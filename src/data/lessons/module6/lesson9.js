const lesson = {
  id: 'm6-l9',
  title: 'Largest Rectangle in Histogram',
  module: 6,
  lessonNumber: 9,
  xpReward: 15,
  leetcodeProblems: [
    { id: 84, title: 'Largest Rectangle in Histogram', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', difficulty: 'Hard' },
  ],
  content: `# Largest Rectangle in Histogram

Given an array of non-negative integers \`heights\` where each element represents the height of a bar of width 1, find the area of the **largest rectangle** that can be formed in the histogram.

## Visualizing the Problem

\`\`\`
heights = [2, 1, 5, 6, 2, 3]

    6
  5 6
  5 6 2
  5 6 2 3
2 1 5 6 2 3
─────────────
0 1 2 3 4 5   (indices)
\`\`\`

The largest rectangle has area **10** (bars at index 2 and 3, height 5 × width 2).

## Brute Force — O(N²)

For every pair of left and right boundaries, compute the minimum height between them and multiply by the width. This is O(N²) and too slow for large inputs.

## Key Insight: When does a bar "close"?

A bar of height \`h\` at position \`i\` can extend as a rectangle as long as every bar to its **right** is also ≥ \`h\`. The moment we see a bar shorter than the top of our stack, we know the top bar can no longer extend to the right. That is when we calculate its rectangle.

## Monotonic Stack — O(N)

We maintain a stack of indices in **increasing order of heights** (monotonic increasing). Whenever a new bar is shorter than the top of the stack, we pop the top and compute the area of the rectangle with that popped bar as the shortest bar.

### Step-by-Step Trace

\`\`\`
heights = [2, 1, 5, 6, 2, 3]
Stack stores indices.

i=0, h=2 → stack empty, push 0         stack: [0]
i=1, h=1 → h < heights[0]=2, POP index 0
           width = 1 (stack empty, so left boundary is -1)
           area  = 2 * (1 - (-1) - 1) = 2 * 1 = 2   maxArea=2
           h=1 still >= nothing, push 1               stack: [1]
i=2, h=5 → 5 > 1, push 2              stack: [1, 2]
i=3, h=6 → 6 > 5, push 3              stack: [1, 2, 3]
i=4, h=2 → 2 < 6, POP index 3
           left = top of stack = 2
           width = 4 - 2 - 1 = 1
           area  = 6 * 1 = 6           maxArea=6
         → 2 < 5, POP index 2
           left = top of stack = 1
           width = 4 - 1 - 1 = 2
           area  = 5 * 2 = 10          maxArea=10
         → 2 >= 1, push 4              stack: [1, 4]
i=5, h=3 → 3 > 2, push 5              stack: [1, 4, 5]

End of array — pop remaining elements:
POP index 5: width = 6 - 4 - 1 = 1, area = 3 * 1 = 3
POP index 4: width = 6 - 1 - 1 = 4, area = 2 * 4 = 8   maxArea still 10
POP index 1: width = 6 - (-1) - 1 = 6, area = 1 * 6 = 6

Final maxArea = 10 ✓
\`\`\`

## Width Formula

When we pop index \`top\`:
- **Right boundary**: \`i\` (current index, exclusive)
- **Left boundary**: new top of stack (exclusive), or \`-1\` if stack is empty
- **Width** = \`i - left - 1\`
- **Area** = \`heights[top] * width\`

\`\`\`cpp
// Core pop logic
int top = stk.top(); stk.pop();
int left = stk.empty() ? -1 : stk.top();
int area = heights[top] * (i - left - 1);
maxArea = max(maxArea, area);
\`\`\`

## Complete Algorithm

\`\`\`cpp
int largestRectangleArea(vector<int>& heights) {
    stack<int> stk;    // indices, monotonic increasing by height
    int maxArea = 0;
    int n = heights.size();

    for (int i = 0; i <= n; i++) {
        // Treat a virtual bar of height 0 at position n to flush the stack
        int curH = (i == n) ? 0 : heights[i];
        while (!stk.empty() && heights[stk.top()] > curH) {
            int top = stk.top(); stk.pop();
            int left = stk.empty() ? -1 : stk.top();
            maxArea = max(maxArea, heights[top] * (i - left - 1));
        }
        stk.push(i);
    }
    return maxArea;
}
\`\`\`

The trick of iterating up to \`i <= n\` and using a sentinel height of 0 at \`i == n\` ensures any remaining bars in the stack are popped and processed at the end — no extra post-loop needed.

## Complexity

| | |
|---|---|
| Time | O(N) — each index is pushed and popped at most once |
| Space | O(N) — stack can hold up to N indices |
`,
  starterCode: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int largestRectangleArea(vector<int>& heights) {
    // TODO: use a monotonic increasing stack of indices
    // For each bar, while the stack top is taller than the current bar,
    // pop it and compute the rectangle area using the width formula:
    //   width = i - (new stack top, or -1 if empty) - 1
    // Push i onto the stack. Process leftover bars after the loop ends.
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> h(n);
    for (int& x : h) cin >> x;
    cout << largestRectangleArea(h) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int largestRectangleArea(vector<int>& heights) {
    stack<int> stk;
    int maxArea = 0;
    int n = heights.size();

    for (int i = 0; i <= n; i++) {
        int curH = (i == n) ? 0 : heights[i];
        while (!stk.empty() && heights[stk.top()] > curH) {
            int top = stk.top(); stk.pop();
            int left = stk.empty() ? -1 : stk.top();
            maxArea = max(maxArea, heights[top] * (i - left - 1));
        }
        stk.push(i);
    }
    return maxArea;
}

int main() {
    int n; cin >> n;
    vector<int> h(n);
    for (int& x : h) cin >> x;
    cout << largestRectangleArea(h) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '6\n2 1 5 6 2 3', expectedOutput: '10', description: 'Classic LeetCode example — bars 2,3 (heights 5,6) form area 10.' },
    { input: '2\n2 4',         expectedOutput: '4',  description: 'Two bars — tallest bar standing alone gives area 4.' },
    { input: '1\n5',           expectedOutput: '5',  description: 'Single bar — area equals its height.' },
  ],
  hints: [
    'Think about when a bar\'s rectangle is "finalized": it is when you see a shorter bar to its right.',
    'Use a stack of **indices** (not values). Keep the stack sorted so the bottom is always the smallest height.',
    'Width formula when you pop index `top`: `width = i - (stack.top() or -1) - 1`. Area = `heights[top] * width`.',
  ],
  complexity: { time: 'O(N)', space: 'O(N)', notes: 'Each index is pushed once and popped once — total 2N stack operations.' },
  tags: ['stack', 'monotonic-stack', 'histogram', 'hard'],
};
export default lesson;
