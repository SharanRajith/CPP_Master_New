const lesson = {
  id: 'msvc-l3',
  title: 'Infosys: Linked List Problems',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 206, title: 'Reverse Linked List',        url: 'https://leetcode.com/problems/reverse-linked-list/',        difficulty: 'Easy' },
    { id: 141, title: 'Linked List Cycle',          url: 'https://leetcode.com/problems/linked-list-cycle/',          difficulty: 'Easy' },
    { id: 21,  title: 'Merge Two Sorted Lists',     url: 'https://leetcode.com/problems/merge-two-sorted-lists/',     difficulty: 'Easy' },
  ],
  content: `# Infosys SP/Power Programmer — Linked List DSA

Infosys SP (System Engineer) and Power Programmer tracks both test linked lists. These are the must-know problems.

---

## Node Structure

\`\`\`cpp
struct Node {
    int data;
    Node* next;
    Node(int x) : data(x), next(nullptr) {}
};
\`\`\`

---

## 1. Reverse a Linked List

\`\`\`cpp
Node* reverse(Node* head) {
    Node* prev = nullptr;
    Node* curr = head;
    while (curr) {
        Node* nxt = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
}
\`\`\`

---

## 2. Detect Cycle — Floyd's Algorithm

\`\`\`cpp
bool hasCycle(Node* head) {
    Node* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
\`\`\`

---

## 3. Find Middle Node

\`\`\`cpp
Node* findMiddle(Node* head) {
    Node* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}
\`\`\`

---

## 4. Merge Two Sorted Lists

\`\`\`cpp
Node* mergeSorted(Node* l1, Node* l2) {
    if (!l1) return l2;
    if (!l2) return l1;
    if (l1->data <= l2->data) {
        l1->next = mergeSorted(l1->next, l2);
        return l1;
    }
    l2->next = mergeSorted(l1, l2->next);
    return l2;
}
\`\`\`

---

## 5. Delete Nth Node from End

\`\`\`cpp
Node* removeNthFromEnd(Node* head, int n) {
    Node dummy(0); dummy.next = head;
    Node* fast = &dummy, *slow = &dummy;
    for (int i = 0; i <= n; i++) fast = fast->next;
    while (fast) { slow = slow->next; fast = fast->next; }
    Node* del = slow->next;
    slow->next = slow->next->next;
    delete del;
    return dummy.next;
}
\`\`\`

---

## Infosys Tips

- Reversing a linked list is **guaranteed to appear** in Infosys interviews.
- Floyd's cycle detection is a common follow-up question.
- Always handle **null/empty list** edge cases.
`,
  starterCode: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int x) : data(x), next(nullptr) {}
};

Node* reverse(Node* head) {
    // TODO: Reverse the linked list iteratively
    return nullptr;
}

void print(Node* head) {
    while (head) { cout << head->data << " "; head = head->next; }
    cout << "\\n";
}

int main() {
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);
    head->next->next->next = new Node(4);
    head = reverse(head);
    print(head); // 4 3 2 1
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int x) : data(x), next(nullptr) {}
};

Node* reverse(Node* head) {
    Node* prev = nullptr, *curr = head;
    while (curr) {
        Node* nxt = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
}

void print(Node* head) {
    while (head) { cout << head->data << " "; head = head->next; }
    cout << "\\n";
}

int main() {
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);
    head->next->next->next = new Node(4);
    head = reverse(head);
    print(head);
    return 0;
}`,
  testCases: [
    { description: 'Reverse list 1→2→3→4 to get 4→3→2→1', expectedOutput: '4 3 2 1 ' },
  ],
  hints: [
    'You need three pointers: prev (starts null), curr (starts at head), and next.',
    'In each step: save curr->next, point curr->next to prev, then advance both prev and curr.',
    'When curr becomes null, prev is the new head.',
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['infosys', 'linked-list', 'dsa', 'reversal'],
};
export default lesson;
