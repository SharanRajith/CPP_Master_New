const lesson = {
  id: 'm5-l8',
  title: 'Intersection & Reorder List',
  module: 5,
  lessonNumber: 8,
  xpReward: 10,
  leetcodeProblems: [
    { id: 160, title: 'Intersection of Two Linked Lists', url: 'https://leetcode.com/problems/intersection-of-two-linked-lists/', difficulty: 'Easy' },
    { id: 143, title: 'Reorder List',                    url: 'https://leetcode.com/problems/reorder-list/',                    difficulty: 'Medium' },
    { id: 328, title: 'Odd Even Linked List',            url: 'https://leetcode.com/problems/odd-even-linked-list/',            difficulty: 'Medium' },
  ],
  content: `# Intersection & Reorder List

These two problems combine multiple linked list techniques — making them perfect for coding interviews.

## Finding Intersection (LeetCode #160)
Two lists intersect when they share the same node object (same memory address, not just same value).

**Elegant O(n) trick:** Let pointers from both heads race. When one hits the end, redirect it to the OTHER list's head. They will meet exactly at the intersection!

\`\`\`cpp
ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    ListNode* a = headA;
    ListNode* b = headB;
    while (a != b) {
        a = a ? a->next : headB;  // Redirect to B's head when done
        b = b ? b->next : headA;  // Redirect to A's head when done
    }
    return a;  // nullptr if no intersection
}
\`\`\`
*Why it works: both pointers travel the same total distance (len(A) + len(B)) before meeting.*

## Reorder List (LeetCode #143)
Transform: 1→2→3→4→5 into 1→5→2→4→3

**Three-step approach:**
1. Find the middle (fast/slow pointers)
2. Reverse the second half
3. Interleave both halves

\`\`\`cpp
void reorderList(ListNode* head) {
    // Step 1: Find middle
    ListNode* slow = head, *fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next; fast = fast->next->next;
    }
    
    // Step 2: Reverse second half
    ListNode* prev = nullptr, *curr = slow->next;
    slow->next = nullptr;  // Split
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev; prev = curr; curr = next;
    }
    
    // Step 3: Interleave
    ListNode* first = head, *second = prev;
    while (second) {
        ListNode* tmp1 = first->next, *tmp2 = second->next;
        first->next = second;
        second->next = tmp1;
        first = tmp1; second = tmp2;
    }
}
\`\`\`

## Odd-Even Linked List (LeetCode #328)
Group all odd-indexed nodes first, then even-indexed nodes.
\`\`\`cpp
ListNode* oddEvenList(ListNode* head) {
    if (!head) return head;
    ListNode* odd = head, *even = head->next, *evenHead = even;
    while (even && even->next) {
        odd->next = even->next;   odd = odd->next;
        even->next = odd->next;   even = even->next;
    }
    odd->next = evenHead;  // Connect odd tail to even head
    return head;
}
\`\`\`
`,
  starterCode: `#include <iostream>
using namespace std;
struct ListNode {
    int val; ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Odd-Even Linked List: rearrange so odd-indexed nodes come first,
// then even-indexed nodes. Preserve relative order within each group.
// 1→2→3→4→5  becomes  1→3→5→2→4
ListNode* oddEvenList(ListNode* head) {
    if (!head) return head;
    ListNode* odd = head;
    ListNode* even = head->next;
    ListNode* evenHead = even;
    // TODO: advance odd and even pointers together
    // odd->next = even->next; odd = odd->next;
    // even->next = odd->next; even = even->next;
    // Connect: odd->next = evenHead;
    return head;
}

ListNode* build(int n) {
    ListNode* h=nullptr,*t=nullptr;
    for(int i=0;i<n;i++){int v;cin>>v;ListNode* nd=new ListNode(v);if(!h)h=t=nd;else{t->next=nd;t=nd;}}
    return h;
}
void print(ListNode* h){while(h){cout<<h->val;if(h->next)cout<<" ";h=h->next;}cout<<endl;}

int main(){int n;cin>>n;print(oddEvenList(build(n)));return 0;}`,
  modelAnswer: `#include <iostream>
using namespace std;
struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };
ListNode* oddEvenList(ListNode* head) {
    if (!head) return head;
    ListNode* odd=head, *even=head->next, *evenHead=even;
    while (even && even->next) {
        odd->next=even->next; odd=odd->next;
        even->next=odd->next; even=even->next;
    }
    odd->next=evenHead;
    return head;
}
ListNode* build(int n){ListNode* h=nullptr,*t=nullptr;for(int i=0;i<n;i++){int v;cin>>v;ListNode* nd=new ListNode(v);if(!h)h=t=nd;else{t->next=nd;t=nd;}}return h;}
void print(ListNode* h){while(h){cout<<h->val;if(h->next)cout<<" ";h=h->next;}cout<<endl;}
int main(){int n;cin>>n;print(oddEvenList(build(n)));return 0;}`,
  testCases: [
    { input: '5\n1 2 3 4 5', expectedOutput: '1 3 5 2 4', description: 'Odd positions [1,3,5] followed by even [2,4]' },
    { input: '4\n2 1 3 5',   expectedOutput: '2 3 1 5',   description: 'Even-length list rearranged' },
    { input: '1\n1',         expectedOutput: '1',          description: 'Single node unchanged' },
  ],
  hints: [
    'Save `evenHead = even` before the loop — you need it to connect at the end.',
    'Inside loop: `odd->next = even->next; odd = odd->next;`',
    'Then: `even->next = odd->next; even = even->next;`',
    'After loop: `odd->next = evenHead;`',
  ],
  complexity: { time: 'O(n) — single pass', space: 'O(1) — in-place rearrangement', notes: 'The key is keeping two separate chains and stitching together at the end — same pattern as reorder list.' },
  tags: ['linked-list', 'reorder', 'in-place', 'two-pointers'],
};
export default lesson;
