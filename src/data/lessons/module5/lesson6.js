const lesson = {
  id: 'm5-l6',
  title: 'Doubly Linked List & Deque',
  module: 5,
  lessonNumber: 6,
  xpReward: 10,
  leetcodeProblems: [
    { id: 430, title: 'Flatten a Multilevel Doubly Linked List', url: 'https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/', difficulty: 'Medium' },
    { id: 641, title: 'Design Circular Deque',                   url: 'https://leetcode.com/problems/design-circular-deque/',                   difficulty: 'Medium' },
  ],
  content: `# Doubly Linked List & Deque

A **Doubly Linked List (DLL)** adds a \`prev\` pointer to each node, enabling O(1) insertion and deletion **in both directions**.

## Node Structure
\`\`\`cpp
struct DLLNode {
    int val;
    DLLNode* prev;
    DLLNode* next;
    DLLNode(int x) : val(x), prev(nullptr), next(nullptr) {}
};
\`\`\`

## Inserting After a Node (O(1))
\`\`\`cpp
void insertAfter(DLLNode* node, int val) {
    DLLNode* newNode = new DLLNode(val);
    newNode->next = node->next;    // New node's next = old next
    newNode->prev = node;          // New node's prev = current node
    if (node->next)
        node->next->prev = newNode; // Old next's prev = new node
    node->next = newNode;          // Current's next = new node
}
\`\`\`

## Deleting a Node (O(1) if pointer known)
\`\`\`cpp
void deleteNode(DLLNode* node) {
    if (node->prev) node->prev->next = node->next;
    if (node->next) node->next->prev = node->prev;
    delete node;
}
\`\`\`

## Sentinel Head & Tail Pattern
Using two dummy sentinel nodes removes ALL edge cases (empty list, single node, head/tail deletion):
\`\`\`cpp
class DoublyLinkedList {
    DLLNode* head;  // Sentinel left  (never removed)
    DLLNode* tail;  // Sentinel right (never removed)
public:
    DoublyLinkedList() {
        head = new DLLNode(0);
        tail = new DLLNode(0);
        head->next = tail;
        tail->prev = head;
    }
    void addToFront(int val) { insertAfter(head, val); }
    void removeLast() {
        if (tail->prev != head) deleteNode(tail->prev);
    }
};
\`\`\`

> **Why DLL matters for LRU Cache:** The LRU Cache (next lesson!) needs O(1) move-to-front and O(1) remove-last. A DLL with sentinels gives you exactly this.  
> **STL equivalent:** \`std::list<T>\` is already a doubly linked list. \`std::deque<T>\` uses chunked memory for even faster access.
`,
  starterCode: `#include <iostream>
using namespace std;

struct DLLNode {
    int val;
    DLLNode *prev, *next;
    DLLNode(int x) : val(x), prev(nullptr), next(nullptr) {}
};

// Implement a doubly linked list with:
// - addFront(val): insert at the front (after sentinel head)
// - printForward(): print all values left to right
// Use sentinel head and tail nodes.

class DoublyLinkedList {
    DLLNode* head; // sentinel
    DLLNode* tail; // sentinel
public:
    DoublyLinkedList() {
        head = new DLLNode(0);
        tail = new DLLNode(0);
        head->next = tail;
        tail->prev = head;
    }
    
    void addFront(int val) {
        // TODO: Create a new node and insert it between head and head->next
    }
    
    void printForward() {
        DLLNode* curr = head->next;
        while (curr != tail) {
            cout << curr->val;
            if (curr->next != tail) cout << " ";
            curr = curr->next;
        }
        cout << endl;
    }
};

int main() {
    int n; cin >> n;
    DoublyLinkedList dll;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        dll.addFront(v);  // Each insert goes to front
    }
    dll.printForward();
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;
struct DLLNode {
    int val; DLLNode *prev, *next;
    DLLNode(int x) : val(x), prev(nullptr), next(nullptr) {}
};
class DoublyLinkedList {
    DLLNode* head; DLLNode* tail;
public:
    DoublyLinkedList() {
        head = new DLLNode(0); tail = new DLLNode(0);
        head->next = tail; tail->prev = head;
    }
    void addFront(int val) {
        DLLNode* node = new DLLNode(val);
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }
    void printForward() {
        DLLNode* curr = head->next;
        while (curr != tail) {
            cout << curr->val;
            if (curr->next != tail) cout << " ";
            curr = curr->next;
        }
        cout << endl;
    }
};
int main() {
    int n; cin >> n;
    DoublyLinkedList dll;
    for (int i=0;i<n;i++){ int v; cin>>v; dll.addFront(v); }
    dll.printForward();
    return 0;
}`,
  testCases: [
    { input: '4\n1 2 3 4', expectedOutput: '4 3 2 1', description: 'Adding [1,2,3,4] to front each time reverses the order' },
    { input: '1\n42',      expectedOutput: '42',       description: 'Single element' },
  ],
  hints: [
    'Create node: `DLLNode* node = new DLLNode(val);`',
    'Set: `node->next = head->next; node->prev = head;`',
    'Fix old first node: `head->next->prev = node;`',
    'Finally: `head->next = node;`',
  ],
  complexity: { time: 'O(1) per insertion', space: 'O(n) total nodes', notes: 'The sentinel pattern eliminates all nullptr edge cases — no special handling for empty list or inserting at ends.' },
  tags: ['doubly-linked-list', 'sentinel', 'deque', 'data-structures'],
};
export default lesson;
