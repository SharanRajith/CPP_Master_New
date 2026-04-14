const lesson = {
  id: 'm5-l1',
  title: 'Singly Linked List from Scratch',
  module: 5,
  lessonNumber: 1,
  xpReward: 10,
  leetcodeProblems: [
    { id: 707, title: 'Design Linked List',    url: 'https://leetcode.com/problems/design-linked-list/',    difficulty: 'Medium' },
    { id: 237, title: 'Delete Node in a Linked List', url: 'https://leetcode.com/problems/delete-node-in-a-linked-list/', difficulty: 'Medium' },
  ],
  content: `# Singly Linked List from Scratch

A **Linked List** is a collection of **nodes** where each node holds a value and a pointer to the next node. Unlike arrays, nodes are scattered in memory — no contiguous block required.

## The Node Structure
\`\`\`cpp
struct ListNode {
    int val;
    ListNode* next;
    
    ListNode(int x) : val(x), next(nullptr) {}
};
\`\`\`

## Building a List
\`\`\`cpp
ListNode* head = new ListNode(1);
head->next     = new ListNode(2);
head->next->next = new ListNode(3);
// 1 → 2 → 3 → nullptr
\`\`\`

## Traversal — The Golden Loop
\`\`\`cpp
ListNode* curr = head;
while (curr != nullptr) {
    cout << curr->val << " ";
    curr = curr->next;      // Move to next node
}
\`\`\`

## Inserting at the Head (O(1))
\`\`\`cpp
void insertFront(ListNode*& head, int val) {
    ListNode* newNode = new ListNode(val);
    newNode->next = head;  // New node points to old head
    head = newNode;        // Update head
}
\`\`\`

## Deleting a Node (O(n) to find it)
\`\`\`cpp
void deleteVal(ListNode*& head, int val) {
    if (!head) return;
    if (head->val == val) { head = head->next; return; }
    ListNode* curr = head;
    while (curr->next && curr->next->val != val)
        curr = curr->next;
    if (curr->next) curr->next = curr->next->next;
}
\`\`\`

## Array vs Linked List

| Operation | Array | Linked List |
|---|---|---|
| Access by index | O(1) | O(n) |
| Insert at front | O(n) — shift all | O(1) |
| Insert at back | O(1) amortized | O(n) — traverse |
| Delete arbitrary | O(n) | O(n) find + O(1) delete |
| Memory | Contiguous | Scattered |

> **Key Rule:** Always check \`curr != nullptr\` before accessing \`curr->val\` or \`curr->next\`. Null pointer dereference is the #1 linked list bug!
`,
  starterCode: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Build a linked list from n values read from stdin.
// Then traverse and print each value space-separated.
int main() {
    int n;
    cin >> n;
    
    ListNode* head = nullptr;
    ListNode* tail = nullptr;
    
    for (int i = 0; i < n; i++) {
        int val;
        cin >> val;
        // TODO: Create a new node and append it to the list
        // Hint: handle the case when head == nullptr (first node)
    }
    
    // TODO: Traverse and print values space-separated
    ListNode* curr = head;
    // while (curr != nullptr) { ... }
    
    cout << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

int main() {
    int n;
    cin >> n;
    ListNode* head = nullptr;
    ListNode* tail = nullptr;
    for (int i = 0; i < n; i++) {
        int val; cin >> val;
        ListNode* node = new ListNode(val);
        if (!head) { head = tail = node; }
        else { tail->next = node; tail = node; }
    }
    ListNode* curr = head;
    while (curr) {
        cout << curr->val;
        if (curr->next) cout << " ";
        curr = curr->next;
    }
    cout << endl;
    return 0;
}`,
  testCases: [
    { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5', description: 'Build and print a 5-node linked list' },
    { input: '1\n42',        expectedOutput: '42',         description: 'Single node list' },
    { input: '3\n-1 0 1',   expectedOutput: '-1 0 1',     description: 'Negative values in list' },
  ],
  hints: [
    'Create a new node: `ListNode* node = new ListNode(val);`',
    'If head is null (first insert): set both head and tail to the new node.',
    'Otherwise: `tail->next = node; tail = node;`',
    'Traverse: `while (curr) { cout << curr->val; curr = curr->next; }`',
  ],
  complexity: { time: 'O(n) build, O(n) traverse', space: 'O(n) for n nodes', notes: 'Building at the tail requires tracking a tail pointer to avoid O(n²) append time.' },
  tags: ['linked-list', 'pointers', 'data-structures', 'nodes'],
};
export default lesson;
