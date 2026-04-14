const lesson = {
  id: 'm3-l3',
  title: 'std::stack, queue & priority_queue',
  module: 3,
  lessonNumber: 3,
  xpReward: 10,
  leetcodeProblems: [
    {
      id: 20,
      title: "Valid Parentheses",
      difficulty: "Easy",
      url: "https://leetcode.com/problems/valid-parentheses/"
    },
    {
      id: 215,
      title: "Kth Largest Element in an Array",
      difficulty: "Medium",
      url: "https://leetcode.com/problems/kth-largest-element-in-an-array/"
    }
  ],
  content: `# Stacks, Queues, & Priority Queues

These three structures aren't actually new containers! They are called **Container Adapters**. They just wrap around an existing container (like \`deque\` or \`vector\`) and restrict how you interact with it.

## 1. std::stack (LIFO)
Last-In, First-Out. Imagine a stack of plates. You can only add (\`push\`) or remove (\`pop\`) from the top.
\`\`\`cpp
#include <stack>
std::stack<int> st;
st.push(5);
st.push(10);
std::cout << st.top(); // 10
st.pop();              // Removes 10
\`\`\`

## 2. std::queue (FIFO)
First-In, First-Out. Imagine a line at a grocery store. You join at the back (\`push\`) and get served from the front (\`front\`).
\`\`\`cpp
#include <queue>
std::queue<int> q;
q.push(1);
q.push(2);
std::cout << q.front(); // 1
q.pop();                // Removes 1
\`\`\`

## 3. std::priority_queue (Max-Heap)
Elements are ordered by priority! By default in C++, \`std::priority_queue\` is a **Max-Heap**, meaning the *largest* element always bubbles up to the top instantly, no matter what order you insert them in.
- Insertion (\`push\`): $O(\\log N)$
- Removal (\`pop\`): $O(\\log N)$
- Top access: $O(1)$

\`\`\`cpp
#include <queue> // priority_queue is in the queue header!
std::priority_queue<int> pq;
pq.push(10);
pq.push(100);
pq.push(5);
std::cout << pq.top(); // Instantly prints 100!
\`\`\`

> **Pro Tip:** To make a Min-Heap (smallest element on top), the syntax is horrifying but essential to memorize for FAANG interviews:
> \`std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;\`
`,
  starterCode: `#include <iostream>
#include <stack>
#include <queue>
using namespace std;

int main() {
    // 1. Create a Max Heap (priority_queue)
    // 2. Put the numbers 15, 3, 99, and 42 in the priority queue.
    
    
    // 3. Pop the top element (which removes the 99).
    
    
    // 4. Print the new top element!
    // cout << ... << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(15);
    pq.push(3);
    pq.push(99);
    pq.push(42);
    
    pq.pop();
    
    cout << pq.top() << endl;
    
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '42', description: 'Checks if max-heap logic correctly floats 99 and 42 to the top.' }
  ],
  hints: [
    '`priority_queue<int> pq;`',
    '`pq.push(15);`',
    '`pq.pop()` removes the top (largest) element without returning it.',
    '`pq.top()` returns the current largest element.'
  ],
  complexity: { time: 'O(log N)', space: 'O(N)' },
  tags: ['stack', 'queue', 'heap', 'priority-queue', 'stl'],
};
export default lesson;
