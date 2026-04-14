const lesson = {
  id: 'm6-l2',
  title: 'Queue using Array & Linked List',
  module: 6,
  lessonNumber: 2,
  xpReward: 10,
  leetcodeProblems: [
    { id: 232, title: 'Implement Queue using Stacks', url: 'https://leetcode.com/problems/implement-queue-using-stacks/', difficulty: 'Easy' },
    { id: 622, title: 'Design Circular Queue',        url: 'https://leetcode.com/problems/design-circular-queue/',        difficulty: 'Medium' },
  ],
  content: `# Queue Fundamentals

A **Queue** is a FIFO (First-In, First-Out) data structure. Like a line at the grocery store, elements join at the back (\`push\`) and leave from the front (\`pop\`).

## Linked List Implementation
A linked list queue is very efficient as long as you keep pointers to **both the head and the tail**.

\`\`\`cpp
struct Node { int val; Node* next; Node(int x): val(x), next(nullptr){} };

class LinkedListQueue {
    Node* head;  // Front of queue (to pop)
    Node* tail;  // Back of queue (to push)
public:
    LinkedListQueue() : head(nullptr), tail(nullptr) {}
    
    void push(int val) {
        Node* node = new Node(val);
        if (!tail) { head = tail = node; } // Empty queue
        else { tail->next = node; tail = node; }
    }
    
    int pop() {
        if (!head) return -1;
        Node* temp = head;
        int val = temp->val;
        head = head->next;
        if (!head) tail = nullptr;  // If queue became empty, reset tail
        delete temp;
        return val;
    }
};
\`\`\`

## Array Implementation (Warning!)
A naive array implementation is **O(N) for pop**, because if you pop from the front (index 0), you have to shift all remaining elements down by one.

To get O(1) popping in an array, you need a **Circular Queue**. You track a \`head\` index and a \`tail\` index, and they wrap around the array using modulo arithmetic: \`(tail + 1) % capacity\`.

> **STL Equivalent:** \`std::queue<T>\` gives you O(1) FIFO operations!
`,
  starterCode: `#include <iostream>
using namespace std;

struct Node { int val; Node* next; Node(int x): val(x), next(nullptr){} };

// Implement a basic Linked List-based Queue for O(1) push and pop.
class Queue {
    Node* head;
    Node* tail;
public:
    Queue() { head = tail = nullptr; }
    
    void push(int val) {
        // TODO: Create node, append to tail, update head/tail
    }
    
    int pop() {
        // TODO: Remove head, update head (and tail if empty), return value
        return -1;
    }
};

int main() {
    int q; cin >> q;
    Queue qu;
    while (q--) {
        string op; cin >> op;
        if (op == "push") { int val; cin >> val; qu.push(val); }
        else if (op == "pop") cout << qu.pop() << "\\n";
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

struct Node { int val; Node* next; Node(int x): val(x), next(nullptr){} };

class Queue {
    Node* head; Node* tail;
public:
    Queue() { head = tail = nullptr; }
    void push(int val) {
        Node* node = new Node(val);
        if (!tail) { head = tail = node; }
        else { tail->next = node; tail = node; }
    }
    int pop() {
        if (!head) return -1;
        Node* temp = head;
        int val = temp->val;
        head = head->next;
        if (!head) tail = nullptr;
        delete temp;
        return val;
    }
};

int main() {
    int q; cin >> q;
    Queue qu;
    while (q--) {
        string op; cin >> op;
        if (op == "push") { int v; cin >> v; qu.push(v); }
        else if (op == "pop") cout << qu.pop() << "\\n";
    }
    return 0;
}`,
  testCases: [
    { input: '5\npush 1\npush 2\npop\npop\npop', expectedOutput: '1\n2\n-1', description: 'Standard FIFO test. Prints 1 then 2.' },
    { input: '3\npop\npush 5\npop',            expectedOutput: '-1\n5',    description: 'Empty pop handling' },
  ],
  hints: [
    'For `push`: if `!tail`, the queue is empty, so `head = tail = newNode;`. Otherwise `tail->next = newNode; tail = newNode;`',
    'For `pop`: save `head->val`, move `head = head->next`.',
    'Crucial edge case in `pop`: if `head` becomes `nullptr`, you MUST set `tail = nullptr` too!',
  ],
  complexity: { time: 'O(1) for push and pop', space: 'O(N) for linked list nodes', notes: 'By keeping a tail pointer, push is O(1). Without it, push would be O(N).' },
  tags: ['queue', 'data-structures', 'linked-list', 'fifo'],
};
export default lesson;
