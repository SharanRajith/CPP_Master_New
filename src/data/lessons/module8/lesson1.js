const lesson = {
  id: 'm8-l1',
  title: 'Min-Heap & Max-Heap',
  module: 8,
  lessonNumber: 1,
  xpReward: 10,
  leetcodeProblems: [
    { id: 1046, title: 'Last Stone Weight', url: 'https://leetcode.com/problems/last-stone-weight/', difficulty: 'Easy' },
  ],
  content: `# Min-Heap & Max-Heap Basics

A **Heap** is a complete binary tree that perfectly satisfies the **Heap Property**:
- **Max-Heap:** Every parent is strictly $\\ge$ its children. (Largest element is always at the root).
- **Min-Heap:** Every parent is strictly $\\le$ its children. (Smallest element is always at the root).

## Array Representation
Because a heap is a *Complete* Binary Tree (no gaps until the last level), we don't need pointers! We can store it seamlessly in a standard array:
If a node is at index \`i\`:
- **Left Child** is at \`2 * i + 1\`
- **Right Child** is at \`2 * i + 2\`
- **Parent** is at \`(i - 1) / 2\`

## Under the Hood: std::priority_queue
In C++, the STL structure for a Heap is \`std::priority_queue\`. 
By default, it is a **Max-Heap**.
\`\`\`cpp
#include <queue>

// MAX-HEAP (Default)
std::priority_queue<int> maxHeap;
maxHeap.push(10);
maxHeap.push(50);
maxHeap.push(5);
std::cout << maxHeap.top(); // Prints 50 in O(1) time
\`\`\`

To create a **Min-Heap**, the syntax is notoriously verbose:
\`\`\`cpp
// MIN-HEAP
std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
minHeap.push(10);
minHeap.push(50);
minHeap.push(5);
std::cout << minHeap.top(); // Prints 5 in O(1) time
\`\`\`

> **Time Complexity:** 
> - \`push()\`: $O(\\log N)$ — element is added to the end and "bubbles up".
> - \`pop()\`: $O(\\log N)$ — root is swapped with end, removed, and new root "sinks down".
> - \`top()\`: $O(1)$ — root is instantly accessible.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// LeetCode 1046: Last Stone Weight
// You are given an array of stones. In each turn, we smash the two heaviest 
// stones together. If x == y, both are destroyed. If x != y, stone x is destroyed
// and stone y has a new weight of y - x.
// Return the weight of the last remaining stone (or 0 if none left).
int lastStoneWeight(vector<int>& stones) {
    // TODO: Create a Max-Heap (priority_queue)
    // TODO: Push all stones into the heap
    // TODO: While heap has > 1 element, pop the top 2 elements
    // TODO: If they are not equal, push the difference back into the heap
    // TODO: Return the remaining element, or 0 if empty
    return 0;
}

int main() {
    int n; cin >> n;
    vector<int> stones(n);
    for (int i = 0; i < n; i++) cin >> stones[i];
    
    cout << lastStoneWeight(stones) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int lastStoneWeight(vector<int>& stones) {
    priority_queue<int> pq(stones.begin(), stones.end());
    
    while (pq.size() > 1) {
        int y = pq.top(); pq.pop();
        int x = pq.top(); pq.pop();
        
        if (y != x) {
            pq.push(y - x);
        }
    }
    
    return pq.empty() ? 0 : pq.top();
}

int main() {
    int n; cin >> n;
    vector<int> stones(n);
    for(int i=0; i<n; ++i) cin >> stones[i];
    cout << lastStoneWeight(stones) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '6\n2 7 4 1 8 1', expectedOutput: '1', description: 'Standard simulation from LeetCode. Heavy stones smashed.' },
    { input: '2\n2 2',          expectedOutput: '0', description: 'Equal stones destroy each other.' },
    { input: '1\n5',            expectedOutput: '5', description: 'Only one stone.' },
  ],
  hints: [
    'You can initialize a priority queue directly from a vector: `priority_queue<int> pq(stones.begin(), stones.end());`',
    '`pq.top()` gets you the heaviest stone. Be sure to `pq.pop()` right after!',
    'Grab `y` and `x`. If `y > x`, you `pq.push(y - x)`.',
  ],
  complexity: { time: 'O(N log N) to build and process the heap', space: 'O(N) for the priority queue' },
  tags: ['heap', 'priority-queue', 'max-heap', 'simulation'],
};
export default lesson;
