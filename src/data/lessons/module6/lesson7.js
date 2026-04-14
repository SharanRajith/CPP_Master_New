const lesson = {
  id: 'm6-l7',
  title: 'Min Stack Implementation',
  module: 6,
  lessonNumber: 7,
  xpReward: 10,
  leetcodeProblems: [
    { id: 155, title: 'Min Stack', url: 'https://leetcode.com/problems/min-stack/', difficulty: 'Medium' },
  ],
  content: `# Min Stack

Design a stack that supports push, pop, top, and retrieving the minimum element in **O(1) time**.

Getting the top in O(1) is standard. But how do we get the minimum element in O(1) time without searching through the stack?

## The Parallel Stack Strategy
The trick is to maintain **two stacks**:
1. \`mainStack\`: Holds the actual values.
2. \`minStack\`: Holds the minimum value seen *at the time each element was pushed*.

If we push values: \`[5, 2, 7, 1]\`
\`\`\`
mainStack: [5, 2, 7, 1]  (top is 1)
minStack:  [5, 2, 2, 1]  (top is 1)
\`\`\`

Notice the \`minStack\`! When we pushed \`7\`, the minimum of the stack was still \`2\`, so we pushed \`2\` onto the \`minStack\` again. When we push \`1\`, \`1\` becomes the new minimum, so we push \`1\`.

### Operations
- **Push(x):** Push \`x\` to \`mainStack\`. For \`minStack\`, push \`min(x, minStack.top())\`.
- **Pop:** Pop from BOTH \`mainStack\` and \`minStack\`.
- **GetMin:** Just return \`minStack.top()\`.

\`\`\`cpp
class MinStack {
    std::stack<int> mainStack;
    std::stack<int> minStack;
public:
    void push(int val) {
        mainStack.push(val);
        if (minStack.empty() || val <= minStack.top()) {
            minStack.push(val);
        } else {
            // Push the current minimum again
            minStack.push(minStack.top());
        }
    }
    
    void pop() {
        mainStack.pop();
        minStack.pop();
    }
    
    int getMin() {
        return minStack.top();
    }
};
\`\`\`

> **Optimization (Store Pairs):** Instead of two stacks, you can use one stack of pairs: \`std::stack<std::pair<int, int>> st;\` where \`.first\` is the value and \`.second\` is the minimum at that point.
`,
  starterCode: `#include <iostream>
#include <stack>
#include <algorithm>
using namespace std;

class MinStack {
    stack<pair<int, int>> st; // pair<value, current_min>
public:
    void push(int val) {
        // TODO: if empty, push {val, val}
        // else push {val, min(val, st.top().second)}
    }
    
    void pop() {
        // TODO: pop the stack
    }
    
    int top() {
        // TODO: return the top's first value
        return -1;
    }
    
    int getMin() {
        // TODO: return the top's second value
        return -1;
    }
};

int main() {
    int q; cin >> q;
    MinStack st;
    while (q--) {
        string op; cin >> op;
        if (op == "push") {
            int val; cin >> val; st.push(val);
        } else if (op == "pop") {
            st.pop();
        } else if (op == "top") {
            cout << st.top() << "\\n";
        } else if (op == "getMin") {
            cout << st.getMin() << "\\n";
        }
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <stack>
using namespace std;

class MinStack {
    stack<pair<int, int>> st; 
public:
    void push(int val) {
        if (st.empty()) st.push({val, val});
        else st.push({val, min(val, st.top().second)});
    }
    void pop() { st.pop(); }
    int top() { return st.top().first; }
    int getMin() { return st.top().second; }
};

int main() {
    int q; cin >> q;
    MinStack st;
    while (q--) {
        string op; cin >> op;
        if (op == "push") { int v; cin >> v; st.push(v); }
        else if (op == "pop") st.pop();
        else if (op == "top") cout << st.top() << "\\n";
        else cout << st.getMin() << "\\n";
    }
    return 0;
}`,
  testCases: [
    { input: '7\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin', expectedOutput: '-3\n0\n-2', description: 'Push multiple, check min, pop, check min again.' },
    { input: '4\npush 1\npush 2\ngetMin\ntop', expectedOutput: '1\n2', description: 'Min is beneath top element.' },
  ],
  hints: [
    'Using `stack<pair<int, int>>` combines the value and the "minimum so far".',
    'When pushing: `current_min = min(val, st.top().second)`',
    '`pop` and `top` just look at standard stack interactions.',
  ],
  complexity: { time: 'O(1) for all operations', space: 'O(N) for maintaining pairs/extra states' },
  tags: ['stack', 'design', 'min-max', 'faang'],
};
export default lesson;
