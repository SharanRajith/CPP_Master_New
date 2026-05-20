const lesson = {
  id: 'm8-l7',
  title: 'Find Median from Data Stream',
  module: 8,
  lessonNumber: 7,
  xpReward: 20,
  leetcodeProblems: [
    { id: 295, title: 'Find Median from Data Stream', url: 'https://leetcode.com/problems/find-median-from-data-stream/', difficulty: 'Hard' },
  ],
  content: `# Find Median from Data Stream

The **median** is the middle value of a sorted list. If the list has an even number of elements, the median is the average of the two middle elements.

The challenge: numbers arrive one at a time (a stream). After each insertion, you must be able to report the current median efficiently.

## Why Sorting Doesn't Scale

If we kept a sorted array and binary-searched for the insertion point, \`addNum\` would be O(N) due to shifting. We need O(log N) insertions.

## The Two-Heap Trick

Partition the numbers into **two halves**:
- **Lower half** stored in a **Max-Heap** (\`lo\`): the smaller numbers, with the largest at the top.
- **Upper half** stored in a **Min-Heap** (\`hi\`): the larger numbers, with the smallest at the top.

\`\`\`
        lo (max-heap)   hi (min-heap)
          [... | MAX]   [MIN | ...]
                  ↑       ↑
              these two are the "middle"
\`\`\`

### Invariants to maintain

1. Every element in \`lo\` ≤ every element in \`hi\`.
2. The size difference between the two heaps is at most 1. We keep \`lo\` with equal or one more element than \`hi\`.

### Reading off the median

- If sizes are **equal**: median = (lo.top() + hi.top()) / 2.0
- If \`lo\` has one more element: median = lo.top()

### Inserting a new number

\`\`\`
addNum(num):
  1. Push num into lo (max-heap)
  2. Move lo's max to hi:  hi.push(lo.top()); lo.pop();
  3. Re-balance if hi got bigger than lo:
         lo.push(hi.top()); hi.pop();
\`\`\`

This three-step procedure guarantees both invariants after every insertion.

## Step-by-Step Trace

\`\`\`
add(1):
  lo = [1], hi = []
  Step 2: hi=[1], lo=[]
  Step 3: lo size < hi size → lo=[1], hi=[]
  Sizes: lo=1, hi=0 → median = lo.top() = 1.0

add(2):
  lo = [2, 1] (push 2)  ← max-heap, so 2 is at top
  Step 2: hi=[2], lo=[1]
  Step 3: balanced (1 == 1) → no change
  Sizes equal → median = (1 + 2) / 2.0 = 1.5

add(3):
  lo = [3, 1] (push 3, max-heap, 3 at top)
  Step 2: hi=[2, 3], lo=[1]  ← min-heap, 2 at top
  Step 3: hi.size > lo.size → lo=[2,1], hi=[3]
  Sizes: lo=2, hi=1 → median = lo.top() = 2.0
\`\`\`

Output for the test case:
\`\`\`
addNum 1        → (internal)
addNum 2        → (internal)
findMedian      → 1.50000
addNum 3        → (internal)
findMedian      → 2.00000
\`\`\`

## C++ Implementation

In C++, \`priority_queue<int>\` is a **max-heap** by default.
For a **min-heap**, use \`priority_queue<int, vector<int>, greater<int>>\`.

\`\`\`cpp
class MedianFinder {
    priority_queue<int>                          lo; // max-heap (lower half)
    priority_queue<int, vector<int>, greater<int>> hi; // min-heap (upper half)
public:
    void addNum(int num) {
        lo.push(num);
        hi.push(lo.top()); lo.pop();
        if (hi.size() > lo.size()) {
            lo.push(hi.top()); hi.pop();
        }
    }
    double findMedian() {
        if (lo.size() == hi.size())
            return (lo.top() + (double)hi.top()) / 2.0;
        return lo.top();
    }
};
\`\`\`

## Why is this O(log N)?

Each \`addNum\` does at most 3 heap operations (push/pop), each O(log N). \`findMedian\` just peeks at tops — O(1).

## Visual Summary

\`\`\`
Stream: 5, 1, 7, 2, 9, 3

After 5: lo=[5]              hi=[]            median=5.0
After 1: lo=[1]              hi=[5]           median=3.0  ← (1+5)/2
After 7: lo=[5,1]            hi=[7]           median=5.0
After 2: lo=[2,1]            hi=[5,7]         median=3.5  ← (2+5)/2
After 9: lo=[5,2,1]          hi=[7,9]         median=5.0
After 3: lo=[3,2,1]          hi=[5,7,9]       median=4.0  ← (3+5)/2
\`\`\`

The max-heap top and min-heap top are always the two candidates for the median.
`,
  starterCode: `#include <iostream>
#include <queue>
#include <string>
#include <iomanip>
using namespace std;

class MedianFinder {
    priority_queue<int> lo;                               // max-heap: lower half
    priority_queue<int, vector<int>, greater<int>> hi;    // min-heap: upper half
public:
    void addNum(int num) {
        // TODO: push num into lo
        // TODO: balance: move lo's max to hi
        // TODO: if hi is larger than lo, move hi's min back to lo
    }
    double findMedian() {
        // TODO: if sizes equal, return average of both tops
        // TODO: otherwise return lo.top()
        return 0.0;
    }
};

int main() {
    MedianFinder mf;
    string op;
    while (cin >> op) {
        if (op == "addNum") {
            int x; cin >> x;
            mf.addNum(x);
        } else if (op == "findMedian") {
            cout << fixed << setprecision(5) << mf.findMedian() << "\\n";
        }
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <queue>
#include <string>
#include <iomanip>
using namespace std;

class MedianFinder {
    priority_queue<int> lo;
    priority_queue<int, vector<int>, greater<int>> hi;
public:
    void addNum(int num) {
        lo.push(num);
        hi.push(lo.top()); lo.pop();
        if (hi.size() > lo.size()) {
            lo.push(hi.top()); hi.pop();
        }
    }
    double findMedian() {
        if (lo.size() == hi.size())
            return (lo.top() + (double)hi.top()) / 2.0;
        return lo.top();
    }
};

int main() {
    MedianFinder mf;
    string op;
    while (cin >> op) {
        if (op == "addNum") {
            int x; cin >> x;
            mf.addNum(x);
        } else if (op == "findMedian") {
            cout << fixed << setprecision(5) << mf.findMedian() << "\\n";
        }
    }
    return 0;
}`,
  testCases: [
    {
      input: 'addNum 1\naddNum 2\nfindMedian\naddNum 3\nfindMedian',
      expectedOutput: '1.50000\n2.00000',
      description: 'Stream 1,2 → median 1.5; stream 1,2,3 → median 2.0',
    },
  ],
  hints: [
    'Maintain two heaps: a max-heap for the lower half and a min-heap for the upper half. The median lives at the boundary between them.',
    'After every `addNum`, restore the invariant that `lo.size() >= hi.size()` and every element in `lo` is ≤ every element in `hi`. A three-step push-and-rebalance sequence achieves this.',
    'In C++, a max-heap is `priority_queue<int>` (default). A min-heap is `priority_queue<int, vector<int>, greater<int>>`. Use `fixed << setprecision(5)` to format the median output.',
  ],
  complexity: { time: 'O(log N) addNum, O(1) findMedian', space: 'O(N)', notes: 'Each element is stored in exactly one of the two heaps.' },
  tags: ['heap', 'priority-queue', 'design', 'two-heaps', 'hard'],
};
export default lesson;
