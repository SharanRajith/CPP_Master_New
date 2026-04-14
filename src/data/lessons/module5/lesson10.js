const lesson = {
  id: 'm5-l10',
  title: 'Linked List Mastery — Mixed Challenge',
  module: 5,
  lessonNumber: 10,
  xpReward: 20,
  leetcodeProblems: [
    { id: 2,   title: 'Add Two Numbers',            url: 'https://leetcode.com/problems/add-two-numbers/',            difficulty: 'Medium' },
    { id: 445, title: 'Add Two Numbers II',         url: 'https://leetcode.com/problems/add-two-numbers-ii/',         difficulty: 'Medium' },
    { id: 86,  title: 'Partition List',             url: 'https://leetcode.com/problems/partition-list/',             difficulty: 'Medium' },
  ],
  content: `# Linked List Mastery — Add Two Numbers

## Add Two Numbers (LeetCode #2)
Numbers stored in **reverse order** in linked lists. Add them digit by digit using a carry, just like grade-school addition.

\`\`\`cpp
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    int carry = 0;
    
    while (l1 || l2 || carry) {
        int sum = carry;
        if (l1) { sum += l1->val; l1 = l1->next; }
        if (l2) { sum += l2->val; l2 = l2->next; }
        carry = sum / 10;
        curr->next = new ListNode(sum % 10);
        curr = curr->next;
    }
    return dummy.next;
}
\`\`\`

## Trace: 342 + 465 = 807 (stored as 2→4→3 and 5→6→4)
\`\`\`
2+5=7, carry=0 → digit 7
4+6=10, carry=1 → digit 0
3+4+1=8, carry=0 → digit 8
Result: 7→0→8 = 807 ✓
\`\`\`

## Partition List (LeetCode #86)
Partition around value x: all nodes < x come first, maintaining original relative order.
\`\`\`cpp
ListNode* partition(ListNode* head, int x) {
    ListNode lessHead(0), greaterHead(0);
    ListNode* less = &lessHead, *greater = &greaterHead;
    
    while (head) {
        if (head->val < x) { less->next = head;    less = less->next; }
        else               { greater->next = head; greater = greater->next; }
        head = head->next;
    }
    greater->next = nullptr;       // Terminate greater chain
    less->next = greaterHead.next; // Connect the two chains
    return lessHead.next;
}
\`\`\`

## Module 5 Summary — Techniques Mastered
| Technique | Problems |
|---|---|
| Traversal + dummy head | Merge lists, remove elements |
| Fast/slow pointers | Middle, cycle detection, palindrome |
| In-place reversal | Reverse list, palindrome check |
| HashMap + DLL | LRU Cache |
| Two separate chains | Partition, odd-even, reorder |
| Digit-by-digit simulation | Add two numbers |

> **Interview Strategy:** When you see a linked list problem, ask yourself:  
> 1. Do I need to find the middle → **fast/slow pointers**  
> 2. Do I need O(1) deletion → **doubly linked list**  
> 3. Do I need to reverse → **3-pointer iterative reversal**  
> 4. Do I need to split and reconnect → **two dummy heads**
`,
  starterCode: `#include <iostream>
using namespace std;
struct ListNode {
    int val; ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Add Two Numbers: each list represents a number in REVERSE order.
// Return the sum as a linked list also in reverse order.
// Example: (2→4→3) + (5→6→4) = 807 → 7→0→8
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    int carry = 0;
    
    while (l1 || l2 || carry) {
        int sum = carry;
        // TODO: add l1->val if l1 exists, advance l1
        // TODO: add l2->val if l2 exists, advance l2
        // TODO: compute carry = sum / 10
        // TODO: create node with digit = sum % 10
    }
    return dummy.next;
}

ListNode* build(int n){ListNode* h=nullptr,*t=nullptr;for(int i=0;i<n;i++){int v;cin>>v;ListNode* nd=new ListNode(v);if(!h)h=t=nd;else{t->next=nd;t=nd;}}return h;}
void print(ListNode* h){while(h){cout<<h->val;if(h->next)cout<<" ";h=h->next;}cout<<endl;}

int main(){
    int n,m; cin>>n>>m;
    print(addTwoNumbers(build(n), build(m)));
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;
struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0); ListNode* curr = &dummy;
    int carry = 0;
    while (l1 || l2 || carry) {
        int sum = carry;
        if (l1) { sum += l1->val; l1 = l1->next; }
        if (l2) { sum += l2->val; l2 = l2->next; }
        carry = sum / 10;
        curr->next = new ListNode(sum % 10);
        curr = curr->next;
    }
    return dummy.next;
}
ListNode* build(int n){ListNode* h=nullptr,*t=nullptr;for(int i=0;i<n;i++){int v;cin>>v;ListNode* nd=new ListNode(v);if(!h)h=t=nd;else{t->next=nd;t=nd;}}return h;}
void print(ListNode* h){while(h){cout<<h->val;if(h->next)cout<<" ";h=h->next;}cout<<endl;}
int main(){int n,m;cin>>n>>m;print(addTwoNumbers(build(n),build(m)));return 0;}`,
  testCases: [
    { input: '3 3\n2 4 3\n5 6 4', expectedOutput: '7 0 8', description: '342+465=807 stored reversed → 7→0→8' },
    { input: '1 1\n5\n5',         expectedOutput: '0 1',   description: '5+5=10 → 0→1 (carry into new node)' },
    { input: '3 4\n9 9 9\n9 9 9 9', expectedOutput: '8 9 9 0 1', description: '999+9999=10998 → with cascading carry' },
  ],
  hints: [
    'Start `carry = 0`, `sum = carry`.',
    'If l1 exists: `sum += l1->val; l1 = l1->next;`',
    'If l2 exists: `sum += l2->val; l2 = l2->next;`',
    'Create node: `curr->next = new ListNode(sum % 10); carry = sum / 10;`',
    'Loop condition includes `carry` so the final carry digit is never missed.',
  ],
  complexity: { time: 'O(max(n,m)) — loop runs for the longer list', space: 'O(max(n,m)) — result list length', notes: 'Including `carry` in the while condition elegantly handles the final overflow digit without special casing.' },
  tags: ['linked-list', 'math', 'carry', 'simulation', 'faang'],
};
export default lesson;
