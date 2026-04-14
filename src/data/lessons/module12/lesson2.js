const lesson = {
  id: 'm12-l2',
  title: 'Fast & Slow Pointers (Floyd\'s Cycle)',
  module: 12,
  lessonNumber: 2,
  xpReward: 15,
  leetcodeProblems: [
    { id: 141, title: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle/', difficulty: 'Easy' },
    { id: 287, title: 'Find the Duplicate Number', url: 'https://leetcode.com/problems/find-the-duplicate-number/', difficulty: 'Medium' },
  ],
  content: `# Fast & Slow Pointers

Also known as the **Tortoise and Hare** algorithm, this pattern is specifically used to detect cycles in Linked Lists or Arrays.

## Detecting a Cycle
You have two pointers starting at the head of a linked list.
- **Slow (Tortoise):** Moves 1 step at a time (` + "`" + `slow = slow->next` + "`" + `).
- **Fast (Hare):** Moves 2 steps at a time (` + "`" + `fast = fast->next->next` + "`" + `).

If there is NO cycle, the Fast pointer will eventually hit ` + "`" + `null` + "`" + `.
If there IS a cycle, the Fast pointer will loop around and eventually "lap" the Slow pointer from behind. If ` + "`" + `slow == fast` + "`" + ` at any moment, a cycle exists!

\`\`\`cpp
bool hasCycle(ListNode *head) {
    if (!head) return false;
    ListNode *slow = head;
    ListNode *fast = head;
    
    // Fast needs to check both its current position and next position 
    // to avoid null pointer dereferencing when jumping by 2.
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        
        if (slow == fast) return true; // Collision!
    }
    
    return false;
}
\`\`\`

## Find the Duplicate Number (LeetCode 287)
You are given an array of size $N+1$, containing numbers from $1$ to $N$. There is exactly one duplicated number. Find it without modifying the array and using $O(1)$ space.

Since the values are perfectly bounded $[1, N]$, we can treat the **array indices as nodes**, and the **array values as pointers** to the next node! ` + "`" + `node = nums[current_node]` + "`" + `.
Because multiple indices point to the duplicate value, it mathematically creates a Linked List Cycle!

1. Find the collision point using Fast & Slow.
2. **Phase 2:** Reset Slow to the beginning. Move BOTH pointers 1 step at a time. The exact position they collide again is the start of the cycle (the duplicate number)!
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Find the Duplicate Number using Floyd's Cycle Detection
int findDuplicate(vector<int>& nums) {
    // Phase 1: Detect cycle (fast jumps 2, slow jumps 1)
    int slow = nums[0];
    int fast = nums[0];
    
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    
    // Phase 2: Find cycle entrance (reset slow, both jump 1)
    // TODO: Reset slow = nums[0]
    // TODO: while slow != fast, advance both by 1
    // TODO: Return slow (or fast)
    
    return 0;
}

int main() {
    int n; cin >> n; // Reads total elements (N+1)
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    cout << findDuplicate(nums) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

int findDuplicate(vector<int>& nums) {
    int slow = nums[0];
    int fast = nums[0];
    
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    
    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    cout << findDuplicate(nums) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '5\n1 3 4 2 2', expectedOutput: '2', description: 'Duplicate is 2.' },
    { input: '5\n3 1 3 4 2', expectedOutput: '3', description: 'Duplicate is 3.' },
  ],
  hints: [
    '`do-while` is perfect for Phase 1 to force the initial jump before the first check!',
    'In Phase 2, `fast = nums[fast]` (it only jumps 1 step now).',
  ],
  complexity: { time: 'O(N)', space: 'O(1) conforming strictly to limits' },
  tags: ['two-pointers', 'fast-slow', 'cycle-detection', 'math'],
};
export default lesson;
