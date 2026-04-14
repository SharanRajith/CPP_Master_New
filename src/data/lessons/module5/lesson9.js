const lesson = {
  id: 'm5-l9',
  title: 'Palindrome & Copy List with Random Pointer',
  module: 5,
  lessonNumber: 9,
  xpReward: 10,
  leetcodeProblems: [
    { id: 234, title: 'Palindrome Linked List',                 url: 'https://leetcode.com/problems/palindrome-linked-list/',                 difficulty: 'Easy' },
    { id: 138, title: 'Copy List with Random Pointer',         url: 'https://leetcode.com/problems/copy-list-with-random-pointer/',         difficulty: 'Medium' },
    { id: 61,  title: 'Rotate List',                          url: 'https://leetcode.com/problems/rotate-list/',                          difficulty: 'Medium' },
  ],
  content: `# Palindrome & Deep Copy Linked List

## Palindrome Linked List (LeetCode #234) — O(1) Space
The elegant O(1) approach avoids converting to an array. It uses **three techniques** in sequence:

1. **Fast/slow pointers** → find the middle
2. **Reverse** the second half in-place
3. **Compare** both halves side by side

\`\`\`cpp
bool isPalindrome(ListNode* head) {
    // Step 1: Find middle
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next; fast = fast->next->next;
    }
    
    // Step 2: Reverse second half
    ListNode* prev = nullptr, *curr = slow;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev; prev = curr; curr = next;
    }
    
    // Step 3: Compare from both ends
    ListNode* left = head, *right = prev;
    while (right) {
        if (left->val != right->val) return false;
        left = left->next; right = right->next;
    }
    return true;
}
\`\`\`

## Copy List with Random Pointer (LeetCode #138) — HashMap Approach
Each node has a \`next\` and a \`random\` pointer (can point anywhere). Deep copy requires O(n) space.

\`\`\`cpp
Node* copyRandomList(Node* head) {
    if (!head) return nullptr;
    unordered_map<Node*, Node*> clone;   // original → copy
    
    Node* curr = head;
    // Pass 1: Create all clones
    while (curr) {
        clone[curr] = new Node(curr->val);
        curr = curr->next;
    }
    // Pass 2: Set next and random pointers
    curr = head;
    while (curr) {
        clone[curr]->next   = clone[curr->next];
        clone[curr]->random = clone[curr->random];
        curr = curr->next;
    }
    return clone[head];
}
\`\`\`

## Rotate List (LeetCode #61)
Rotating by k is equivalent to making the list circular, then cutting at position \`n-k\`:
\`\`\`cpp
ListNode* rotateRight(ListNode* head, int k) {
    if (!head || !head->next || k == 0) return head;
    int n = 1;
    ListNode* tail = head;
    while (tail->next) { tail = tail->next; n++; }
    tail->next = head;   // Make circular
    int cut = n - (k % n);
    ListNode* newTail = head;
    for (int i = 1; i < cut; i++) newTail = newTail->next;
    ListNode* newHead = newTail->next;
    newTail->next = nullptr;
    return newHead;
}
\`\`\`
`,
  starterCode: `#include <iostream>
using namespace std;
struct ListNode {
    int val; ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Check if the linked list is a palindrome.
// Must run in O(n) time and O(1) space.
// Steps: find middle → reverse second half → compare both halves
bool isPalindrome(ListNode* head) {
    // Step 1: Find middle using slow/fast pointers
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    // Step 2: Reverse the second half starting from 'slow'
    ListNode* prev = nullptr, *curr = slow;
    while (curr) {
        // TODO: standard reversal
    }
    // Step 3: Compare 'head' (left) with 'prev' (right half reversed)
    // TODO: return true if all match
    return true;
}

ListNode* build(int n){ListNode* h=nullptr,*t=nullptr;for(int i=0;i<n;i++){int v;cin>>v;ListNode* nd=new ListNode(v);if(!h)h=t=nd;else{t->next=nd;t=nd;}}return h;}

int main(){int n;cin>>n;cout<<(isPalindrome(build(n))?"true":"false")<<endl;return 0;}`,
  modelAnswer: `#include <iostream>
using namespace std;
struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };
bool isPalindrome(ListNode* head) {
    ListNode* slow=head, *fast=head;
    while (fast && fast->next) { slow=slow->next; fast=fast->next->next; }
    ListNode* prev=nullptr, *curr=slow;
    while (curr) { ListNode* next=curr->next; curr->next=prev; prev=curr; curr=next; }
    ListNode* left=head, *right=prev;
    while (right) { if(left->val!=right->val) return false; left=left->next; right=right->next; }
    return true;
}
ListNode* build(int n){ListNode* h=nullptr,*t=nullptr;for(int i=0;i<n;i++){int v;cin>>v;ListNode* nd=new ListNode(v);if(!h)h=t=nd;else{t->next=nd;t=nd;}}return h;}
int main(){int n;cin>>n;cout<<(isPalindrome(build(n))?"true":"false")<<endl;return 0;}`,
  testCases: [
    { input: '5\n1 2 3 2 1', expectedOutput: 'true',  description: '[1,2,3,2,1] is a palindrome' },
    { input: '4\n1 2 2 1',   expectedOutput: 'true',  description: '[1,2,2,1] even-length palindrome' },
    { input: '4\n1 2 3 4',   expectedOutput: 'false', description: '[1,2,3,4] not a palindrome' },
  ],
  hints: [
    'Find middle: `while (fast && fast->next) { slow=slow->next; fast=fast->next->next; }`',
    'Reverse from slow: standard 3-pointer reversal, result is in `prev`.',
    'Compare: `while (right) { if (left->val != right->val) return false; ... }`',
    'Odd-length lists: the middle node is in both halves but that\'s fine — it always matches itself.',
  ],
  complexity: { time: 'O(n) — three sequential O(n) passes', space: 'O(1) — in-place reversal', notes: 'This is a perfect combination problem: it tests fast/slow pointers, reversal, and comparison all in one.' },
  tags: ['palindrome', 'linked-list', 'reverse', 'fast-slow'],
};
export default lesson;
