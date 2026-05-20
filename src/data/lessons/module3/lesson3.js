const lesson = {
  id: 'm3-l3',
  title: 'stack, queue & priority_queue',
  module: 3,
  lessonNumber: 3,
  xpReward: 10,
  content: `# stack, queue & priority_queue

These three structures are **container adaptors**: they wrap an existing container (default: \`std::deque\`) and expose a restricted, purpose-built interface.

---

## std::stack — LIFO

Last-In, First-Out. Imagine a stack of plates: you can only add or remove from the top.

\`\`\`cpp
#include <stack>
std::stack<int> st;
st.push(5);
st.push(10);
st.push(3);
std::cout << st.top();  // 3  (most recently pushed)
st.pop();               // removes 3
std::cout << st.top();  // 10
std::cout << st.size(); // 2
std::cout << st.empty(); // 0 (false)
\`\`\`

| Operation | Time |
|-----------|------|
| \`push(x)\` | O(1) |
| \`pop()\` | O(1) |
| \`top()\` | O(1) |
| \`size()\` / \`empty()\` | O(1) |

**Note:** \`pop()\` does not return a value. To get the top and remove it, do: \`int v = st.top(); st.pop();\`

---

## std::queue — FIFO

First-In, First-Out. Like a checkout line: join at the back, leave from the front.

\`\`\`cpp
#include <queue>
std::queue<int> q;
q.push(1);
q.push(2);
q.push(3);
std::cout << q.front(); // 1
std::cout << q.back();  // 3
q.pop();                // removes 1
std::cout << q.front(); // 2
\`\`\`

| Operation | Time |
|-----------|------|
| \`push(x)\` | O(1) |
| \`pop()\` | O(1) |
| \`front()\` / \`back()\` | O(1) |
| \`size()\` / \`empty()\` | O(1) |

Queues are the standard container for **BFS** (Breadth-First Search).

---

## std::priority_queue — Binary Heap

Elements leave in **priority order**, not insertion order. By default it is a **max-heap**: the largest element is always at the top.

\`\`\`cpp
#include <queue>
std::priority_queue<int> pq;  // max-heap
pq.push(10);
pq.push(100);
pq.push(5);
std::cout << pq.top(); // 100  (largest, regardless of insertion order)
pq.pop();              // removes 100
std::cout << pq.top(); // 10
\`\`\`

### Min-Heap

To get the smallest element first, pass \`std::greater<int>\` as the comparator:

\`\`\`cpp
std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
minHeap.push(10);
minHeap.push(1);
minHeap.push(50);
std::cout << minHeap.top(); // 1  (smallest on top)
\`\`\`

| Operation | Time |
|-----------|------|
| \`push(x)\` | O(log n) |
| \`pop()\` | O(log n) |
| \`top()\` | O(1) |
| Build from n elements | O(n) |

### Comparison Table

| Adaptor | Order | Access | Underlying container |
|---------|-------|--------|---------------------|
| \`stack\` | LIFO | \`top()\` | \`deque\` (default) |
| \`queue\` | FIFO | \`front()\`, \`back()\` | \`deque\` (default) |
| \`priority_queue\` | By priority | \`top()\` | \`vector\` (default) |

### Classic interview patterns

| Pattern | Data structure |
|---------|---------------|
| Valid parentheses matching | \`stack\` |
| BFS level-order traversal | \`queue\` |
| K-th largest / smallest | \`priority_queue\` |
| Dijkstra's shortest path | min-heap \`priority_queue\` |

## Full Example — max-heap

\`\`\`cpp
#include <iostream>
#include <queue>

int main() {
    std::priority_queue<int> pq;
    for (int x : {15, 3, 99, 42}) pq.push(x);
    pq.pop();               // removes 99
    std::cout << pq.top();  // prints 42
    return 0;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    // TODO: Create a max-heap priority_queue<int>.
    // Push the values 15, 3, 99, and 42.
    // Pop the top element (removes the maximum, 99).
    // Print the new top element.
    // Expected output: 42

    return 0;
}
`,
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
}
`,
  testCases: [
    {
      input: '',
      expectedOutput: '42',
      description: 'Max-heap pops 99, leaving 42 as the new top',
    },
  ],
  hints: [
    'Declare priority_queue<int> pq; then call pq.push() four times with 15, 3, 99, 42.',
    'pq.pop() removes the current maximum (99) without returning it.',
    'Use pq.top() to read the new maximum and print it with cout << pq.top() << endl;',
  ],
  complexity: {
    time: 'O(log n) per push/pop; O(1) for top()',
    space: 'O(n)',
    notes: 'stack and queue push/pop are O(1). priority_queue uses a binary heap so push/pop are O(log n).',
  },
  leetcodeProblems: [
    { id: 20, title: 'Valid Parentheses', difficulty: 'Easy', url: 'https://leetcode.com/problems/valid-parentheses/' },
    { id: 739, title: 'Daily Temperatures', difficulty: 'Medium', url: 'https://leetcode.com/problems/daily-temperatures/' },
    { id: 215, title: 'Kth Largest Element in an Array', difficulty: 'Medium', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
    { id: 703, title: 'Kth Largest Element in a Stream', difficulty: 'Easy', url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
  ],
  tags: ['stl', 'stack', 'queue', 'priority-queue', 'heap', 'container-adaptor'],
};
export default lesson;
