const lesson = {
  id: 'm5-l3',
  title: "Fast & Slow Pointers — Floyd's Cycle Detection",
  module: 5,
  lessonNumber: 3,
  xpReward: 10,
  leetcodeProblems: [
    { id: 141, title: 'Linked List Cycle',              url: 'https://leetcode.com/problems/linked-list-cycle/',              difficulty: 'Easy' },
    { id: 142, title: 'Linked List Cycle II',           url: 'https://leetcode.com/problems/linked-list-cycle-ii/',           difficulty: 'Medium' },
    { id: 876, title: 'Middle of the Linked List',      url: 'https://leetcode.com/problems/middle-of-the-linked-list/',      difficulty: 'Easy' },
    { id: 234, title: 'Palindrome Linked List',         url: 'https://leetcode.com/problems/palindrome-linked-list/',         difficulty: 'Easy' },
  ],
  content: `# Fast & Slow Pointers (Floyd's Algorithm)

Two pointers moving at different speeds solve a surprising range of linked list problems **without extra space**.

## Finding the Middle Node (LeetCode #876)
Move slow by 1, fast by 2. When fast reaches the end, slow is at the middle.
\`\`\`cpp
ListNode* middleNode(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;        // Move 1 step
        fast = fast->next->next;  // Move 2 steps
    }
    return slow;  // At middle when fast hits end
}
// 1→2→3→4→5: returns node 3
// 1→2→3→4:   returns node 3 (second middle)
\`\`\`

## Cycle Detection (LeetCode #141)
If there's a cycle, fast and slow will **meet** — like two runners on a circular track.
\`\`\`cpp
bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;  // They met → cycle!
    }
    return false;  // fast hit nullptr → no cycle
}
\`\`\`

## Finding the Cycle Start (LeetCode #142)
After detection, reset one pointer to head. Move both by 1 — they meet exactly at the cycle start!
\`\`\`cpp
ListNode* detectCycle(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            slow = head;               // Reset slow to head
            while (slow != fast) {     // Move both by 1
                slow = slow->next;
                fast = fast->next;
            }
            return slow;               // Cycle start!
        }
    }
    return nullptr;
}
\`\`\`

## Why Does Floyd's Proof Work?
If the cycle start is distance **F** from head, and slow travels distance **F + a** before meeting fast, then fast travels **2(F + a)**. Using modular arithmetic on the cycle length **C**:
\`\`\`
2(F + a) - (F + a) = a    →    fast is a steps ahead of slow in cycle
Reset slow to head: both travel F more steps to reach cycle start
\`\`\`
`,
  starterCode: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Find the MIDDLE node of the linked list.
// For even-length lists, return the SECOND middle node.
ListNode* middleNode(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    // TODO: advance slow by 1, fast by 2 in a while loop
    // Condition: fast != nullptr && fast->next != nullptr
    return slow;
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
    ListNode* mid = middleNode(build(arr, n));
    cout << mid->val << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* middleNode(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
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
    cout << middleNode(build(arr, n))->val << endl;
    return 0;
}`,
  testCases: [
    { input: '5\n1 2 3 4 5', expectedOutput: '3', description: 'Odd length [1..5] — middle is 3' },
    { input: '6\n1 2 3 4 5 6', expectedOutput: '4', description: 'Even length [1..6] — second middle is 4' },
    { input: '1\n99',          expectedOutput: '99', description: 'Single node — itself is the middle' },
  ],
  hints: [
    'Initialize: `ListNode* slow = head, *fast = head;`',
    'Loop: `while (fast && fast->next)` — check both, fast can skip off the end.',
    'Inside: `slow = slow->next; fast = fast->next->next;`',
    'When the loop ends, `slow` points to the middle.',
  ],
  complexity: { time: 'O(n) — fast pointer covers full list once', space: 'O(1) — just two pointers', notes: 'This same pattern finds middle, detects cycles, and even checks palindrome lists.' },
  tags: ['fast-slow-pointers', 'floyd', 'cycle-detection', 'linked-list'],
};
export default lesson;
