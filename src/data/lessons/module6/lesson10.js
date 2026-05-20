const lesson = {
  id: 'm6-l10',
  title: 'Daily Temperatures',
  module: 6,
  lessonNumber: 10,
  xpReward: 15,
  leetcodeProblems: [
    { id: 739, title: 'Daily Temperatures', url: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'Medium' },
  ],
  content: `# Daily Temperatures

Given an array \`temperatures\`, return an array \`answer\` where \`answer[i]\` is the number of days you have to wait after the \`i\`-th day to get a warmer temperature. If there is no future day with a warmer temperature, \`answer[i] = 0\`.

## Example

\`\`\`
temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
answer       = [ 1,  1,  4,  2,  1,  1,  0,  0]
\`\`\`

Day 0 (73°): the next warmer day is day 1 (74°) → wait 1 day.
Day 2 (75°): the next warmer day is day 6 (76°) → wait 4 days.
Day 7 (73°): no warmer day exists → 0.

## Brute Force — O(N²)

For every day, scan forward until you find a warmer temperature. This is correct but too slow.

## The "Next Greater Element" Pattern

This is the classic **Next Greater Element** problem — a standard application of a **monotonic decreasing stack**.

The stack will hold **indices** of days whose "next warmer day" we haven't found yet. We keep those indices in the stack such that temperatures at those indices are in **decreasing order** from bottom to top.

When a new temperature \`T\` arrives:
- While the stack is non-empty and \`T > temperatures[stack.top()]\`, we have found the answer for \`stack.top()\`.
- Pop it, compute \`answer[popped] = i - popped\`.
- Push the current index \`i\`.

## Step-by-Step Trace

\`\`\`
temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
answer       = [ 0,  0,  0,  0,  0,  0,  0,  0]  (initialized)

i=0, T=73 → stack empty, push 0           stack: [0]
i=1, T=74 → 74>T[0]=73, pop 0, answer[0]=1-0=1   stack: []
             push 1                        stack: [1]
i=2, T=75 → 75>T[1]=74, pop 1, answer[1]=2-1=1   stack: []
             push 2                        stack: [2]
i=3, T=71 → 71 < T[2]=75, just push 3    stack: [2, 3]
i=4, T=69 → 69 < T[3]=71, just push 4    stack: [2, 3, 4]
i=5, T=72 → 72>T[4]=69, pop 4, answer[4]=5-4=1
             72>T[3]=71, pop 3, answer[3]=5-3=2
             72 < T[2]=75, stop. push 5   stack: [2, 5]
i=6, T=76 → 76>T[5]=72, pop 5, answer[5]=6-5=1
             76>T[2]=75, pop 2, answer[2]=6-2=4
             stack empty, push 6          stack: [6]
i=7, T=73 → 73 < T[6]=76, push 7         stack: [6, 7]

End: remaining indices 6 and 7 have no warmer day → answer stays 0.

Final answer = [1, 1, 4, 2, 1, 1, 0, 0] ✓
\`\`\`

## Implementation

\`\`\`cpp
vector<int> dailyTemperatures(vector<int>& temperatures) {
    int n = temperatures.size();
    vector<int> answer(n, 0);
    stack<int> stk; // indices of unresolved days

    for (int i = 0; i < n; i++) {
        while (!stk.empty() && temperatures[i] > temperatures[stk.top()]) {
            int idx = stk.top(); stk.pop();
            answer[idx] = i - idx;
        }
        stk.push(i);
    }
    return answer;
}
\`\`\`

Any indices left in the stack at the end already have \`answer[idx] = 0\` from initialization.

## Why Monotonic Decreasing?

The stack always has temperatures in **decreasing order** from bottom to top.

\`\`\`
Bottom → [index of coldest so far ... index of warmest recent]  ← Top
         [  75°,          71°,                   69°         ]
\`\`\`

When a hotter temperature arrives, it "resolves" all the colder days waiting at the top before being pushed itself. This ensures each index is pushed and popped exactly once.

## Variations of this Pattern

- **Next Greater Element I & II** (LeetCode 496, 503)
- **Largest Rectangle in Histogram** (LeetCode 84) — monotonic *increasing* stack
- **Trapping Rain Water** (LeetCode 42)

Once you recognize the pattern, these problems become straightforward.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> dailyTemperatures(vector<int>& temperatures) {
    int n = temperatures.size();
    vector<int> answer(n, 0);
    stack<int> stk; // TODO: store indices of unresolved days

    for (int i = 0; i < n; i++) {
        // TODO: while stack is non-empty and current temp > temp at stack top:
        //         pop the top index, compute answer[top] = i - top
        // TODO: push i onto the stack
    }
    return answer;
}

int main() {
    int n; cin >> n;
    vector<int> temps(n);
    for (int& t : temps) cin >> t;
    vector<int> ans = dailyTemperatures(temps);
    for (int i = 0; i < n; i++) cout << ans[i] << " \\n"[i == n - 1];
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> dailyTemperatures(vector<int>& temperatures) {
    int n = temperatures.size();
    vector<int> answer(n, 0);
    stack<int> stk;

    for (int i = 0; i < n; i++) {
        while (!stk.empty() && temperatures[i] > temperatures[stk.top()]) {
            int idx = stk.top(); stk.pop();
            answer[idx] = i - idx;
        }
        stk.push(i);
    }
    return answer;
}

int main() {
    int n; cin >> n;
    vector<int> temps(n);
    for (int& t : temps) cin >> t;
    vector<int> ans = dailyTemperatures(temps);
    for (int i = 0; i < n; i++) cout << ans[i] << " \\n"[i == n - 1];
    return 0;
}`,
  testCases: [
    { input: '8\n73 74 75 71 69 72 76 73', expectedOutput: '1 1 4 2 1 1 0 0', description: 'Classic LeetCode example with varied wait times.' },
    { input: '3\n30 40 50',               expectedOutput: '1 1 0',           description: 'Strictly increasing — each day waits exactly 1 day.' },
    { input: '3\n30 60 90',               expectedOutput: '1 1 0',           description: 'Strictly increasing with larger jumps.' },
  ],
  hints: [
    'You need the "next greater element" to the right of each index. A stack is the key data structure.',
    'Store **indices**, not temperature values, in the stack so you can compute the distance.',
    'When `temperatures[i] > temperatures[stack.top()]`, you have found the answer for the top element. Pop it and record `answer[top] = i - top`.',
  ],
  complexity: { time: 'O(N)', space: 'O(N)', notes: 'Each index is pushed once and popped at most once — total 2N stack operations.' },
  tags: ['stack', 'monotonic-stack', 'next-greater-element', 'medium'],
};
export default lesson;
