const lesson = {
  id: 'm5-l2',
  title: 'Reversing a Linked List',
  module: 5,
  lessonNumber: 2,
  xpReward: 10,
  leetcodeProblems: [
    { id: 206, title: 'Reverse Linked List',          url: 'https://leetcode.com/problems/reverse-linked-list/',          difficulty: 'Easy' },
    { id: 92,  title: 'Reverse Linked List II',       url: 'https://leetcode.com/problems/reverse-linked-list-ii/',       difficulty: 'Medium' },
    { id: 25,  title: 'Reverse Nodes in k-Group',     url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',     difficulty: 'Hard' },
  ],
  content: `# Reversing a Linked List

Reversing a linked list is arguably the most commonly asked linked list question in interviews. Master both the iterative and recursive approaches.

## Iterative Reversal — The 3-Pointer Trick
\`\`\`
Before: 1 → 2 → 3 → 4 → nullptr
After:  nullptr ← 1 ← 2 ← 3 ← 4
\`\`\`

Three pointers: **prev**, **curr**, **next**

\`\`\`cpp
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    
    while (curr != nullptr) {
        ListNode* next = curr->next;  // 1. Save next
        curr->next = prev;            // 2. Reverse pointer
        prev = curr;                  // 3. Advance prev
        curr = next;                  // 4. Advance curr
    }
    return prev;  // prev is now the new head
}
\`\`\`

## Visualizing Each Step
\`\`\`
Initially:   prev=null  curr=1  next=?

Step 1:  save next=2  →  1→null,  prev=1,  curr=2
Step 2:  save next=3  →  2→1,    prev=2,  curr=3
Step 3:  save next=4  →  3→2,    prev=3,  curr=4
Step 4:  save next=null → 4→3,   prev=4,  curr=null

Return prev=4  →  4→3→2→1→null  ✓
\`\`\`

## Recursive Reversal (Elegant but uses O(n) stack space)
\`\`\`cpp
ListNode* reverseList(ListNode* head) {
    if (!head || !head->next) return head;        // Base case
    
    ListNode* newHead = reverseList(head->next);  // Recurse to end
    head->next->next = head;  // Make next node point back to current
    head->next = nullptr;     // Cut old forward pointer
    return newHead;
}
\`\`\`

## Partial Reversal — Reverse Between Positions (LeetCode #92)
\`\`\`cpp
// Reverse nodes from position left to right (1-indexed)
ListNode* reverseBetween(ListNode* head, int left, int right) {
    ListNode dummy(0); dummy.next = head;
    ListNode* pre = &dummy;
    for (int i = 1; i < left; i++) pre = pre->next;  // Reach left-1
    
    ListNode* curr = pre->next;
    for (int i = 0; i < right - left; i++) {
        ListNode* next = curr->next;
        curr->next = next->next;
        next->next = pre->next;
        pre->next = next;
    }
    return dummy.next;
}
\`\`\`
`,
  starterCode: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Reverse the linked list iteratively using 3 pointers: prev, curr, next.
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    // TODO: while curr != nullptr:
    //   1. save next = curr->next
    //   2. curr->next = prev  (reverse the link)
    //   3. prev = curr
    //   4. curr = next
    // Return prev (new head)
    return nullptr;
}

// Helper: build list from array, returns head
ListNode* build(int arr[], int n) {
    ListNode* head = nullptr; ListNode* tail = nullptr;
    for (int i = 0; i < n; i++) {
        ListNode* node = new ListNode(arr[i]);
        if (!head) head = tail = node;
        else { tail->next = node; tail = node; }
    }
    return head;
}

int main() {
    int n; cin >> n;
    int arr[100];
    for (int i = 0; i < n; i++) cin >> arr[i];
    ListNode* head = build(arr, n);
    head = reverseList(head);
    ListNode* curr = head;
    while (curr) { cout << curr->val; if (curr->next) cout << " "; curr = curr->next; }
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

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

ListNode* build(int arr[], int n) {
    ListNode* head = nullptr; ListNode* tail = nullptr;
    for (int i = 0; i < n; i++) {
        ListNode* node = new ListNode(arr[i]);
        if (!head) head = tail = node;
        else { tail->next = node; tail = node; }
    }
    return head;
}

int main() {
    int n; cin >> n;
    int arr[100];
    for (int i = 0; i < n; i++) cin >> arr[i];
    ListNode* head = build(arr, n);
    head = reverseList(head);
    ListNode* curr = head;
    while (curr) { cout << curr->val; if (curr->next) cout << " "; curr = curr->next; }
    cout << endl;
    return 0;
}`,
  testCases: [
    { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1', description: 'Reverse [1,2,3,4,5]' },
    { input: '2\n1 2',       expectedOutput: '2 1',       description: 'Two-node reversal' },
    { input: '1\n7',         expectedOutput: '7',         description: 'Single node stays the same' },
  ],
  hints: [
    'Three pointers: `ListNode* prev = nullptr, *curr = head;`',
    'Inside loop: `ListNode* next = curr->next;` then `curr->next = prev;`',
    'Advance: `prev = curr; curr = next;`',
    'After loop, `prev` is the new head — return it!',
  ],
  complexity: { time: 'O(n) — one pass', space: 'O(1) — iterative (vs O(n) stack for recursive)', notes: 'Always prefer the iterative version to avoid stack overflow on very long lists.' },
  tags: ['linked-list', 'reverse', 'two-pointers', 'in-place'],
};
export default lesson;
