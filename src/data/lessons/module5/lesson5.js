const lesson = {
  id: 'm5-l5',
  title: 'Remove Nth Node & Dummy Head Patterns',
  module: 5,
  lessonNumber: 5,
  xpReward: 10,
  leetcodeProblems: [
    { id: 19,  title: 'Remove Nth Node From End of List', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', difficulty: 'Medium' },
    { id: 83,  title: 'Remove Duplicates from Sorted List', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list/', difficulty: 'Easy' },
    { id: 203, title: 'Remove Linked List Elements',       url: 'https://leetcode.com/problems/remove-linked-list-elements/',       difficulty: 'Easy' },
  ],
  content: `# Remove Nth Node & Dummy Head Patterns

Many linked list deletion problems require modifying the **predecessor** (the node BEFORE the one being deleted), not the node itself. The Dummy Head pattern makes this seamless.

## Why You Need the Predecessor
\`\`\`cpp
// To delete node B from: A → B → C
// You must do: A->next = C   (modify A, NOT B)
// This is why you need a pointer to A (the predecessor of B)
\`\`\`

## Remove Nth from End — One Pass (LeetCode #19)
Gap the two pointers by N, then advance together. When fast hits null, slow is right before the target.
\`\`\`cpp
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* fast = &dummy;
    ListNode* slow = &dummy;
    
    for (int i = 0; i <= n; i++) fast = fast->next;  // Gap of n+1
    
    while (fast != nullptr) {
        fast = fast->next;
        slow = slow->next;
    }
    // slow is now the predecessor of the node to delete
    slow->next = slow->next->next;
    return dummy.next;
}
\`\`\`

## Visualizing the Gap
\`\`\`
List: 1→2→3→4→5, remove 2nd from end (=node 4)

After gap of n+1=3:
fast=3, slow=dummy

Advance both until fast=null:
fast=4, slow=1
fast=5, slow=2
fast=null, slow=3  ← slow is predecessor of 4 ✓

slow->next = slow->next->next  →  3→5 (skips 4)
\`\`\`

## Remove All Elements With Value (LeetCode #203)
\`\`\`cpp
ListNode* removeElements(ListNode* head, int val) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* curr = &dummy;
    
    while (curr->next) {
        if (curr->next->val == val)
            curr->next = curr->next->next;  // Skip the node
        else
            curr = curr->next;              // Only advance if NOT deleted
    }
    return dummy.next;
}
\`\`\`

> **Critical Bug Warning:** When you delete a node, do **NOT** advance \`curr\`. The new \`curr->next\` is the node after the deleted one — you still need to check it!
`,
  starterCode: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Remove the n-th node from the END of the list. Return the new head.
// Use the two-pointer gap technique. One pass only!
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* fast = &dummy;
    ListNode* slow = &dummy;
    
    // TODO: Advance fast by n+1 steps first
    
    // TODO: Advance both until fast == nullptr
    
    // TODO: Delete the node after slow
    
    return dummy.next;
}

ListNode* build(int n) {
    ListNode* head = nullptr; ListNode* tail = nullptr;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        ListNode* node = new ListNode(v);
        if (!head) head = tail = node;
        else { tail->next = node; tail = node; }
    }
    return head;
}
void print(ListNode* h){ while(h){ cout<<h->val; if(h->next) cout<<" "; h=h->next;} cout<<endl; }

int main() {
    int n, k; cin >> n >> k;
    print(removeNthFromEnd(build(n), k));
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;
struct ListNode {
    int val; ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0); dummy.next = head;
    ListNode* fast = &dummy, *slow = &dummy;
    for (int i = 0; i <= n; i++) fast = fast->next;
    while (fast) { fast = fast->next; slow = slow->next; }
    slow->next = slow->next->next;
    return dummy.next;
}
ListNode* build(int n) {
    ListNode* h = nullptr, *t = nullptr;
    for (int i=0;i<n;i++){ int v; cin>>v; ListNode* nd=new ListNode(v); if(!h) h=t=nd; else{t->next=nd;t=nd;} }
    return h;
}
void print(ListNode* h){ while(h){ cout<<h->val; if(h->next) cout<<" "; h=h->next;} cout<<endl; }
int main() { int n,k; cin>>n>>k; print(removeNthFromEnd(build(n),k)); return 0; }`,
  testCases: [
    { input: '5 2\n1 2 3 4 5', expectedOutput: '1 2 3 5', description: 'Remove 2nd from end (node 4)' },
    { input: '1 1\n1',         expectedOutput: '',         description: 'Remove only node — empty list' },
    { input: '2 1\n1 2',       expectedOutput: '1',        description: 'Remove last node' },
  ],
  hints: [
    'Advance fast by `n+1` steps (not n!) so slow ends up BEFORE the target.',
    'Then advance both until `fast == nullptr`.',
    '`slow->next = slow->next->next;` — this deletes the nth-from-end node.',
    'The dummy ensures this works even when removing the head (n = list size).',
  ],
  complexity: { time: 'O(n) — single pass', space: 'O(1) — two pointers', notes: 'The n+1 gap is the key — it places slow exactly at the predecessor, not at the target.' },
  tags: ['linked-list', 'dummy-head', 'two-pointers', 'deletion'],
};
export default lesson;
