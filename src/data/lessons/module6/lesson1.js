const lesson = {
  id: 'm6-l1',
  title: 'Stack using Array & Linked List',
  module: 6,
  lessonNumber: 1,
  xpReward: 10,
  leetcodeProblems: [
    { id: 225, title: 'Implement Stack using Queues', url: 'https://leetcode.com/problems/implement-stack-using-queues/', difficulty: 'Easy' },
    { id: 155, title: 'Min Stack',                    url: 'https://leetcode.com/problems/min-stack/',                    difficulty: 'Medium' },
  ],
  content: `# Stack Fundamentals

A **Stack** is a LIFO (Last-In, First-Out) data structure. Imagine a stack of plates: you can only add a plate to the top (\`push\`) and remove a plate from the top (\`pop\`).

## Array-Based Implementation
An array-based stack is incredibly fast because of cache locality, but it has a fixed maximum capacity (unless dynamically resized, like \`std::vector\`).

\`\`\`cpp
class ArrayStack {
private:
    int* arr;
    int topIndex;
    int capacity;
public:
    ArrayStack(int size) {
        capacity = size;
        arr = new int[capacity];
        topIndex = -1;  // -1 means empty
    }
    
    void push(int val) {
        if (topIndex == capacity - 1) return; // Overflow
        arr[++topIndex] = val;
    }
    
    int pop() {
        if (topIndex == -1) return -1; // Underflow
        return arr[topIndex--];
    }
    
    int top() {
        if (topIndex == -1) return -1;
        return arr[topIndex];
    }
};
\`\`\`

## Linked List-Based Implementation
A linked list stack never overflows (until RAM is full) and never wastes memory, but each node requires an extra pointer and allocation overhead.

\`\`\`cpp
struct Node { int val; Node* next; Node(int x): val(x), next(nullptr){} };

class LinkedListStack {
private:
    Node* head;
public:
    LinkedListStack() : head(nullptr) {}
    
    void push(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }
    
    int pop() {
        if (!head) return -1;
        Node* temp = head;
        int val = temp->val;
        head = head->next;
        delete temp;
        return val;
    }
    
    int top() {
        return head ? head->val : -1;
    }
};
\`\`\`

> **STL Equivalent:** \`std::stack<T>\` wraps an underlying container (by default \`std::deque\`) into a LIFO interface.
`,
  starterCode: `#include <iostream>
using namespace std;

// Implement a basic Array-based Stack.
// You do not need to handle dynamic resizing.
class ArrayStack {
    int arr[100];
    int topIdx;
public:
    ArrayStack() { topIdx = -1; }
    
    void push(int val) {
        // TODO: increment topIdx and insert val
    }
    
    int pop() {
        // TODO: if empty return -1, else return value at topIdx AND decrement it
        return -1;
    }
    
    int top() {
        // TODO: return value at topIdx if not empty, else -1
        return -1;
    }
};

int main() {
    int q;
    cin >> q;
    ArrayStack st;
    while (q--) {
        string op;
        cin >> op;
        if (op == "push") {
            int val; cin >> val; st.push(val);
        } else if (op == "pop") {
            cout << st.pop() << "\\n";
        } else if (op == "top") {
            cout << st.top() << "\\n";
        }
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

class ArrayStack {
    int arr[100];
    int topIdx;
public:
    ArrayStack() { topIdx = -1; }
    void push(int val) {
        if (topIdx < 99) arr[++topIdx] = val;
    }
    int pop() {
        if (topIdx == -1) return -1;
        return arr[topIdx--];
    }
    int top() {
        if (topIdx == -1) return -1;
        return arr[topIdx];
    }
};

int main() {
    int q; cin >> q;
    ArrayStack st;
    while (q--) {
        string op; cin >> op;
        if (op == "push") { int v; cin >> v; st.push(v); }
        else if (op == "pop") cout << st.pop() << "\\n";
        else cout << st.top() << "\\n";
    }
    return 0;
}`,
  testCases: [
    { input: '6\npush 5\npush 10\ntop\npop\npop\npop', expectedOutput: '10\n10\n5\n-1', description: 'Basic push, top, pop and underflow handling' },
    { input: '2\ntop\npop', expectedOutput: '-1\n-1', description: 'Operations on empty stack' },
  ],
  hints: [
    'For `push`: Pre-increment `topIdx` before assigning, e.g. `arr[++topIdx] = val;`',
    'For `pop`: Return the element at `topIdx`, then decrement it. E.g. `return arr[topIdx--];`',
    'Always check `if (topIdx == -1)` for underflow before popping/topping.',
  ],
  complexity: { time: 'O(1) for all operations', space: 'O(N) for the underlying array', notes: 'This array approach is how the actual call stack works in hardware!' },
  tags: ['stack', 'data-structures', 'array', 'lifo'],
};
export default lesson;
