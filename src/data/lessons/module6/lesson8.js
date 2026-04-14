const lesson = {
  id: 'm6-l8',
  title: 'Circular Queue Implementation',
  module: 6,
  lessonNumber: 8,
  xpReward: 15,
  leetcodeProblems: [
    { id: 622, title: 'Design Circular Queue', url: 'https://leetcode.com/problems/design-circular-queue/', difficulty: 'Medium' },
    { id: 641, title: 'Design Circular Deque', url: 'https://leetcode.com/problems/design-circular-deque/', difficulty: 'Medium' },
  ],
  content: `# Circular Queue

A naive array-based queue struggles with reused space. If you enqueue and dequeue elements, the \`front\` and \`rear\` pointers keep shifting right, leaving empty, unusable space at the start of the array.

A **Circular Queue** mathematically connects the end of the array back to the start using the modulo operator (\`%\`).

## The Math Backend
If capacity is \`K\`:
- \`next_index = (current_index + 1) % K\`
- \`prev_index = (current_index - 1 + K) % K\` (add K to avoid negative numbers before modulo!)

## Two Pointers + Count vs. Empty Cell
There are two main ways to track if a circular queue is full or empty:
1. Keep a \`size\` variable. If \`size == 0\` it's empty. If \`size == K\` it's full. (Easiest & most intuitive)
2. Leave one cell empty intentionally. If \`front == rear\` it's empty. If \`(rear + 1) % K == front\` it's full.

We will use the **Size Variable** approach.

\`\`\`cpp
class MyCircularQueue {
    int* arr;
    int head, tail, size, capacity;
public:
    MyCircularQueue(int k) {
        capacity = k;
        arr = new int[k];
        head = 0;
        tail = -1;  // Meaningful tail positions will be calculated
        size = 0;
    }
    
    bool enQueue(int value) {
        if (isFull()) return false;
        tail = (tail + 1) % capacity;
        arr[tail] = value;
        size++;
        return true;
    }
    
    bool deQueue() {
        if (isEmpty()) return false;
        head = (head + 1) % capacity;
        size--;
        return true;
    }
    
    int Front() { return isEmpty() ? -1 : arr[head]; }
    int Rear()  { return isEmpty() ? -1 : arr[tail]; }
    bool isEmpty() { return size == 0; }
    bool isFull()  { return size == capacity; }
};
\`\`\`

> Circular Queues are extensively used in OS packet scheduling, ring buffers, and streaming video!
`,
  starterCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class CircularQueue {
    vector<int> arr;
    int head, tail, size, capacity;
public:
    CircularQueue(int k) {
        capacity = k;
        arr.resize(k);
        head = 0;
        tail = -1;
        size = 0;
    }
    
    bool enQueue(int value) {
        // TODO: check isFull, return false
        // TODO: tail = (tail + 1) % capacity, set array at tail, size++, return true
        return false;
    }
    
    bool deQueue() {
        // TODO: check isEmpty, return false
        // TODO: head = (head + 1) % capacity, size--, return true
        return false;
    }
    
    int Front() { return size == 0 ? -1 : arr[head]; }
    int Rear() { return size == 0 ? -1 : arr[tail]; }
    bool isEmpty() { return size == 0; }
    bool isFull() { return size == capacity; }
};

int main() {
    int k, q; cin >> k >> q;
    CircularQueue cq(k);
    while (q--) {
        string op; cin >> op;
        if (op == "enQueue") { int v; cin >> v; cout << (cq.enQueue(v) ? "true" : "false") << "\\n"; }
        else if (op == "deQueue") cout << (cq.deQueue() ? "true" : "false") << "\\n";
        else if (op == "Front") cout << cq.Front() << "\\n";
        else if (op == "Rear") cout << cq.Rear() << "\\n";
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class CircularQueue {
    vector<int> arr;
    int head, tail, size, capacity;
public:
    CircularQueue(int k) {
        capacity = k;
        arr.resize(k);
        head = 0; tail = -1; size = 0;
    }
    bool enQueue(int value) {
        if (size == capacity) return false;
        tail = (tail + 1) % capacity;
        arr[tail] = value;
        size++;
        return true;
    }
    bool deQueue() {
        if (size == 0) return false;
        head = (head + 1) % capacity;
        size--;
        return true;
    }
    int Front() { return size == 0 ? -1 : arr[head]; }
    int Rear() { return size == 0 ? -1 : arr[tail]; }
    bool isEmpty() { return size == 0; }
    bool isFull() { return size == capacity; }
};

int main() {
    int k, q; cin >> k >> q;
    CircularQueue cq(k);
    while (q--) {
        string op; cin >> op;
        if (op == "enQueue") { int v; cin >> v; cout << (cq.enQueue(v) ? "true" : "false") << "\\n"; }
        else if (op == "deQueue") cout << (cq.deQueue() ? "true" : "false") << "\\n";
        else if (op == "Front") cout << cq.Front() << "\\n";
        else if (op == "Rear") cout << cq.Rear() << "\\n";
    }
    return 0;
}`,
  testCases: [
    { input: '3 8\nenQueue 1\nenQueue 2\nenQueue 3\nenQueue 4\nRear\nisFull\ndeQueue\nenQueue 4', expectedOutput: 'true\ntrue\ntrue\nfalse\n3\n1\ntrue\ntrue', description: 'Full Queue Wraparound sequence matching LeetCode.' },
    { input: '1 3\nenQueue 42\ndeQueue\ndeQueue', expectedOutput: 'true\ntrue\nfalse', description: 'Dequeue on empty circular queue.' },
  ],
  hints: [
    'Update tail: `tail = (tail + 1) % capacity;`',
    'Update head: `head = (head + 1) % capacity;`',
    '`isFull()` safely checks `size == capacity`.',
  ],
  complexity: { time: 'O(1) for all operations', space: 'O(K) for the array of capacity K' },
  tags: ['queue', 'circular-array', 'design'],
};
export default lesson;
