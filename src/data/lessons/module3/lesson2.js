const lesson = {
  id: 'm3-l2',
  title: 'list & deque',
  module: 3,
  lessonNumber: 2,
  xpReward: 10,
  content: `# list & deque

## std::list — Doubly-Linked List

\`std::list\` is a **doubly-linked list**: each node holds a value plus pointers to the previous and next node. There is no contiguous memory; nodes live scattered on the heap.

\`\`\`cpp
#include <list>
std::list<int> lst = {10, 20, 30};
lst.push_front(5);   // {5, 10, 20, 30}
lst.push_back(40);   // {5, 10, 20, 30, 40}
lst.pop_front();     // {10, 20, 30, 40}
\`\`\`

### list Complexity

| Operation | Time | Notes |
|-----------|------|-------|
| \`push_front\` / \`push_back\` | O(1) | No shifting needed |
| \`pop_front\` / \`pop_back\` | O(1) | |
| \`insert(it, x)\` | O(1) | You must already hold the iterator |
| \`erase(it)\` | O(1) | Other iterators remain valid |
| Random access \`[i]\` | **N/A** | Must iterate step by step |
| \`size()\` | O(1) | |
| \`sort()\` | O(n log n) | Member function; \`std::sort\` won't work |
| \`splice(it, other)\` | O(1) | Move nodes between lists without copying |
| \`remove(val)\` | O(n) | Erases all elements equal to val |

### Iterating

\`\`\`cpp
for (int x : lst) std::cout << x << " ";
// or using an iterator explicitly:
auto it = lst.begin();
std::advance(it, 2);   // move forward 2 steps — O(n), not O(1)!
lst.erase(it);
\`\`\`

### When to use list

- You need O(1) insertion/deletion at **positions you already have an iterator to** (classic use: LRU Cache with a hash map + list).
- You \`splice\` large blocks of elements between containers without copying.
- You do **not** need random access.

### Cache performance warning

\`list\` nodes are scattered in memory, causing frequent cache misses. In benchmarks, \`vector\` with its O(n) middle-insert often beats \`list\` in real wall-clock time because cache locality dominates at typical sizes.

---

## std::deque — Double-Ended Queue

\`std::deque\` (pronounced "deck") provides **O(1) push/pop at both ends** and **O(1) random access**. Internally it uses a segmented buffer: a map of pointers each pointing to a fixed-size chunk of elements.

\`\`\`cpp
#include <deque>
std::deque<int> dq;
dq.push_back(10);    // [10]
dq.push_front(5);    // [5, 10]
dq.push_back(20);    // [5, 10, 20]
dq.pop_front();      // [10, 20]
std::cout << dq[0];  // 10  (random access is O(1))
\`\`\`

### deque Complexity

| Operation | Time | Notes |
|-----------|------|-------|
| \`push_front\` / \`push_back\` | O(1) amortized | May expand chunk map |
| \`pop_front\` / \`pop_back\` | O(1) | |
| \`operator[]\` / \`at(i)\` | O(1) | Two pointer indirections |
| \`insert\` / \`erase\` (middle) | O(n) | Shifts elements |
| \`size()\` | O(1) | |

### When to use deque

- Sliding window problems where you need fast access to both ends.
- BFS level-order traversal (but \`std::queue\` wraps \`deque\` by default anyway).
- When you need \`push_front\` performance that \`vector\` cannot provide.

---

## Side-by-Side Comparison

| Feature | vector | list | deque |
|---------|--------|------|-------|
| Random access | O(1) | No | O(1) |
| \`push_back\` | O(1) amortized | O(1) | O(1) amortized |
| \`push_front\` | O(n) | O(1) | O(1) amortized |
| Middle insert/erase | O(n) | O(1)* | O(n) |
| Cache friendly | Yes | No | Partial |
| Memory overhead | Low | High (2 ptrs/node) | Medium |

\`*\` O(1) only when you already hold the iterator to that position.

## Complete Example

\`\`\`cpp
#include <iostream>
#include <deque>

int main() {
    std::deque<int> dq;
    dq.push_back(1);
    dq.push_back(2);
    dq.push_back(3);
    dq.push_front(0);
    dq.pop_back();        // removes 3
    // dq = {0, 1, 2}
    for (int x : dq) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}
// Output: 0 1 2
\`\`\`
`,
  starterCode: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    // TODO: Create a deque<int>.
    // push_back 1, 2, 3 in that order.
    // Then push_front 0.
    // Then pop_back once.
    // Print all remaining elements separated by spaces.
    // Expected output: 0 1 2

    return 0;
}
`,
  modelAnswer: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    dq.push_back(1);
    dq.push_back(2);
    dq.push_back(3);
    dq.push_front(0);
    dq.pop_back();
    for (int i = 0; i < (int)dq.size(); ++i) {
        if (i > 0) cout << " ";
        cout << dq[i];
    }
    cout << endl;
    return 0;
}
`,
  testCases: [
    {
      input: '',
      expectedOutput: '0 1 2',
      description: 'push_front, push_back, pop_back then print all elements',
    },
  ],
  hints: [
    'Use push_back for 1, 2, 3 and push_front for 0. Then call pop_back() once to remove 3.',
    'After all operations the deque contains {0, 1, 2}. Iterate and print with spaces between elements.',
    'Use: for (int i = 0; i < (int)dq.size(); ++i) { if (i > 0) cout << " "; cout << dq[i]; } cout << endl;',
  ],
  complexity: {
    time: 'O(1) amortized for push/pop at both ends; O(n) for middle insert/erase',
    space: 'O(n)',
    notes: 'list offers O(1) middle insert but no random access and poor cache behaviour; deque balances both ends with random access.',
  },
  leetcodeProblems: [
    { id: 239, title: 'Sliding Window Maximum', difficulty: 'Hard', url: 'https://leetcode.com/problems/sliding-window-maximum/' },
    { id: 641, title: 'Design Circular Deque', difficulty: 'Medium', url: 'https://leetcode.com/problems/design-circular-deque/' },
    { id: 146, title: 'LRU Cache', difficulty: 'Medium', url: 'https://leetcode.com/problems/lru-cache/' },
    { id: 1670, title: 'Design Front Middle Back Queue', difficulty: 'Medium', url: 'https://leetcode.com/problems/design-front-middle-back-queue/' },
  ],
  tags: ['stl', 'list', 'deque', 'linked-list', 'double-ended-queue'],
};
export default lesson;
