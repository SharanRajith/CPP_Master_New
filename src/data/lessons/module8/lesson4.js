const lesson = {
  id: 'm8-l4',
  title: 'Merge K Sorted Lists',
  module: 8,
  lessonNumber: 4,
  xpReward: 20,
  leetcodeProblems: [
    { id: 23, title: 'Merge k Sorted Lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'Hard' },
  ],
  content: `# Merge K Sorted Lists

You are given an array of \`k\` linked-lists, each sorted in ascending order. You need to merge all the linked-lists into one sorted linked-list and return it.

## The Priority Queue Solution
This is one of the most famous **Hard** interview questions, and a Priority Queue makes it almost trivial.

Since each individual list is already sorted, the absolute smallest element across ALL \`k\` lists must be in the **current heads** of the \`k\` lists.
Instead of comparing \`k\` heads manually in a loop (which takes $O(K)$ per step), we can throw all the heads into a **Min-Heap**.

### The Flow:
1. Push the head node of every list into a Min-Heap.
2. The Min-Heap will instantly surface the smallest node overall.
3. Pop the absolute smallest node from the heap, and attach it to your \`merged\` result list.
4. **Crucial Step:** If the node you just popped has a \`next\` node, push that \`next\` node into the Min-Heap!
5. Repeat until the heap is empty.

## Custom Comparators in Priority Queues
By default, placing pointers (\`ListNode*\`) into a priority queue sorts them by their *memory address*, not their value! We must write a custom comparator logic.

\`\`\`cpp
struct compareNodes {
    bool operator()(ListNode* a, ListNode* b) {
        // We want a Min-Heap: parent should be <= child
        // So we return true if 'a' should be placed below 'b' (a > b)
        return a->val > b->val;
    }
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    std::priority_queue<ListNode*, vector<ListNode*>, compareNodes> minHeap;
    
    // 1. Push all initial heads
    for (auto node : lists) {
        if (node) minHeap.push(node);
    }
    
    ListNode dummy(0);
    ListNode* tail = &dummy;
    
    // 2. Continually pop the smallest, and push its successor
    while (!minHeap.empty()) {
        ListNode* smallest = minHeap.top();
        minHeap.pop();
        
        tail->next = smallest;
        tail = tail->next;
        
        if (smallest->next) {
            minHeap.push(smallest->next);
        }
    }
    return dummy.next;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct ListNode {
    int val; ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Custom Comparator for Priority Queue
struct compareNodes {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val; 
    }
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    priority_queue<ListNode*, vector<ListNode*>, compareNodes> minHeap;
    
    // TODO: Push all non-null heads into minHeap
    
    ListNode dummy(0);
    ListNode* tail = &dummy;
    
    // TODO: while minHeap is not empty
    // Grab the top node, pop it
    // append it to tail
    // if it has a next node, push the next node into minHeap
    
    return dummy.next;
}

// IO Helper (Ignore)
int main() {
    int k; cin >> k;
    vector<ListNode*> lists(k, nullptr);
    for (int i = 0; i < k; i++) {
        int len; cin >> len;
        ListNode dummy(0); ListNode* t = &dummy;
        while(len--) { int v; cin >> v; t->next = new ListNode(v); t = t->next; }
        lists[i] = dummy.next;
    }
    
    ListNode* merged = mergeKLists(lists);
    while (merged) { cout << merged->val << " "; merged = merged->next; }
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct ListNode {
    int val; ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

struct compareNodes {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val;
    }
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    priority_queue<ListNode*, vector<ListNode*>, compareNodes> pq;
    for (auto node : lists) {
        if (node) pq.push(node);
    }
    
    ListNode dummy(0);
    ListNode* tail = &dummy;
    
    while (!pq.empty()) {
        ListNode* smallest = pq.top();
        pq.pop();
        
        tail->next = smallest;
        tail = tail->next;
        
        if (smallest->next) {
            pq.push(smallest->next);
        }
    }
    return dummy.next;
}

int main() {
    int k; cin >> k;
    vector<ListNode*> lists(k, nullptr);
    for (int i = 0; i < k; i++) {
        int len; cin >> len;
        ListNode dummy(0); ListNode* t = &dummy;
        while(len--) { int v; cin >> v; t->next = new ListNode(v); t = t->next; }
        lists[i] = dummy.next;
    }
    
    ListNode* merged = mergeKLists(lists);
    while (merged) { cout << merged->val << " "; merged = merged->next; }
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '3\n3 1 4 5\n3 1 3 4\n2 2 6', expectedOutput: '1 1 2 3 4 4 5 6 ', description: 'Merges three standard lists.' },
    { input: '2\n0\n1 1', expectedOutput: '1 ', description: 'Handles completely empty lists seamlessly.' },
  ],
  hints: [
    'Loop over the array of lists: `for(auto head : lists) if(head) minHeap.push(head);`',
    '`tail->next = pq.top()`, then `pq.pop()`, then advance `tail`.',
    'if `smallest->next` is not null, `pq.push(smallest->next)`. Let the heap figure out the new minimum!',
  ],
  complexity: { time: 'O(N log K)', space: 'O(K) for the heap size', notes: 'N is total nodes across all lists, K is number of lists.' },
  tags: ['heap', 'priority-queue', 'linked-list', 'hard', 'faang'],
};
export default lesson;
