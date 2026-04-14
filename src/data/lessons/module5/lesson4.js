const lesson = {
  id: 'm5-l4',
  title: 'Merge Two Sorted Linked Lists',
  module: 5,
  lessonNumber: 4,
  xpReward: 10,
  leetcodeProblems: [
    { id: 21,  title: 'Merge Two Sorted Lists',     url: 'https://leetcode.com/problems/merge-two-sorted-lists/',     difficulty: 'Easy' },
    { id: 23,  title: 'Merge K Sorted Lists',       url: 'https://leetcode.com/problems/merge-k-sorted-lists/',       difficulty: 'Hard' },
    { id: 148, title: 'Sort List',                  url: 'https://leetcode.com/problems/sort-list/',                  difficulty: 'Medium' },
  ],
  content: `# Merge Two Sorted Linked Lists

Merging two sorted linked lists is a foundational operation that underpins **Merge Sort on linked lists** and **Merge K Sorted Lists** (a classic FAANG question).

## The Dummy Head Trick
Using a dummy/sentinel node at the start eliminates special-casing the empty result list:
\`\`\`cpp
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);         // Sentinel — we never return this node itself
    ListNode* tail = &dummy;   // Tail of our result list
    
    while (l1 && l2) {
        if (l1->val <= l2->val) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;  // Attach remaining nodes
    return dummy.next;           // Skip the dummy, return real head
}
\`\`\`

## Trace: l1=[1,3,5] and l2=[2,4,6]
\`\`\`
dummy → ...
Compare 1 vs 2 → take 1: dummy→1, l1=3
Compare 3 vs 2 → take 2: dummy→1→2, l2=4
Compare 3 vs 4 → take 3: dummy→1→2→3, l1=5
Compare 5 vs 4 → take 4: dummy→1→2→3→4, l2=6
Compare 5 vs 6 → take 5: dummy→1→2→3→4→5, l1=null
Attach l2: dummy→1→2→3→4→5→6 ✓
\`\`\`

## Sort List in O(n log n) — Merge Sort on Linked Lists (LeetCode #148)
\`\`\`cpp
ListNode* sortList(ListNode* head) {
    if (!head || !head->next) return head;  // Base case
    
    // Split at middle using fast/slow pointers
    ListNode* slow = head, *fast = head->next;
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    
    ListNode* mid = slow->next;
    slow->next = nullptr;         // Cut list in half
    
    ListNode* left  = sortList(head);
    ListNode* right = sortList(mid);
    return mergeTwoLists(left, right);
}
\`\`\`

> **Why Merge Sort on Linked Lists but Quick Sort on Arrays?**  
> Arrays have O(1) random access — QuickSort's in-place partition is efficient.  
> Linked lists have no random access — Merge Sort's split-and-merge pattern is natural and O(1) space!
`,
  starterCode: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Merge two sorted linked lists into one sorted list.
// Use the dummy head pattern.
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    
    // TODO: while both l1 and l2 are not null,
    // compare l1->val and l2->val, attach the smaller one to tail,
    // advance that pointer, and advance tail.
    
    // TODO: Attach the remaining non-null list to tail.
    
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
void print(ListNode* h) { while(h){ cout<<h->val; if(h->next) cout<<" "; h=h->next;} cout<<endl; }

int main() {
    int n, m; cin >> n >> m;
    ListNode* l1 = build(n);
    ListNode* l2 = build(m);
    print(mergeTwoLists(l1, l2));
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) { tail->next = l1; l1 = l1->next; }
        else                    { tail->next = l2; l2 = l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
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
void print(ListNode* h) { while(h){ cout<<h->val; if(h->next) cout<<" "; h=h->next;} cout<<endl; }

int main() {
    int n, m; cin >> n >> m;
    print(mergeTwoLists(build(n), build(m)));
    return 0;
}`,
  testCases: [
    { input: '3 3\n1 3 5\n2 4 6',   expectedOutput: '1 2 3 4 5 6', description: 'Merge [1,3,5] and [2,4,6]' },
    { input: '0 3\n2 4 6',           expectedOutput: '2 4 6',       description: 'One empty list — return the other' },
    { input: '2 2\n1 4\n1 4',        expectedOutput: '1 1 4 4',     description: 'Lists with equal elements' },
  ],
  hints: [
    '`ListNode dummy(0); ListNode* tail = &dummy;` — start with a dummy.',
    'Inside while: compare `l1->val` and `l2->val`, attach the smaller.',
    'After the loop: `tail->next = l1 ? l1 : l2;` — attach the non-empty remainder.',
    'Return `dummy.next` — skip the dummy node itself.',
  ],
  complexity: { time: 'O(n + m) — linear in total nodes', space: 'O(1) — no extra nodes, just rearranging pointers', notes: 'The dummy node is the key trick — it removes the need for a special case to initialize the result head.' },
  tags: ['linked-list', 'merge', 'sorted', 'dummy-head'],
};
export default lesson;
