const lesson = {
  id: 'm8-l3',
  title: 'K-th Largest Element',
  module: 8,
  lessonNumber: 3,
  xpReward: 15,
  leetcodeProblems: [
    { id: 215, title: 'Kth Largest Element in an Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'Medium' },
  ],
  content: `# K-th Largest Element

Finding the "top K", "bottom K", "K-th largest", or "K-th smallest" element is the defining use-case of Priority Queues.

## The Problem
You are given an unsorted array of size $N$. You need to find the $K$-th largest element.
- Brute Force: Sort the array ($O(N \\log N)$) and return \`arr[N - K]\`.
- **Optimal:** Use a Heap ($O(N \\log K)$).

## The Min-Heap Trick
If we want the K-th **Largest**, we paradoxically use a **Min-Heap**.

Here's the algorithm:
1. Initialize a Min-Heap of size $K$.
2. Iterate through the array. \`push\` each element into the Min-Heap.
3. If the size of the heap exceeds $K$, \`pop()\` the top element!
   - Because it is a Min-Heap, popping removes the *smallest* element currently in the heap.
4. When the loop finishes, the heap contains exactly the $K$ largest elements of the array. The root of the Min-Heap (\`top()\`) is the $K$-th largest element!

\`\`\`cpp
int findKthLargest(vector<int>& nums, int k) {
    // 1. Min-Heap!
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    
    // 2. Iterate elements
    for (int num : nums) {
        minHeap.push(num);
        
        // 3. Eject smallest element if we exceed capacity K
        if (minHeap.size() > k) {
            minHeap.pop(); 
        }
    }
    
    // 4. The K-th largest is sitting comfortably on top
    return minHeap.top();
}
\`\`\`

> **Why is this so fast?** 
> A full array sort takes $O(N \\log N)$. 
> By capping the heap size at $K$, every push/pop takes $O(\\log K)$. Thus, total time is $O(N \\log K)$. If $K$ is small (e.g. top 5 in an array of 1,000,000), $\\log(5)$ is microscopic compared to $\\log(1,000,000)$!
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Find the K-th largest element in an array using a Min-Heap.
int findKthLargest(vector<int>& nums, int k) {
    // Syntactic nightmare: setup Min-Heap
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    // TODO: Loop through nums
    // Push into minHeap
    // if size > k, pop
    
    return -1; // return the top
}

int main() {
    int n, k; cin >> n >> k;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    cout << findKthLargest(nums, k) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    return minHeap.top();
}

int main() {
    int n, k; cin >> n >> k;
    vector<int> nums(n);
    for(int i=0; i<n; ++i) cin >> nums[i];
    cout << findKthLargest(nums, k) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '6 2\n3 2 1 5 6 4', expectedOutput: '5', description: '2nd largest element in unsorted array.' },
    { input: '9 4\n3 2 3 1 2 4 5 5 6', expectedOutput: '4', description: 'Duplicates are handled perfectly by Priority Queue.' },
  ],
  hints: [
    'The `priority_queue` is configured for you in the starter code as a Min-Heap.',
    'Use a simple range-based for loop: `for(int x : nums) { ... }`',
    '`if (minHeap.size() > k)` ensures the heap never holds more than `k` elements. `pop()` deletes the smallest one.',
  ],
  complexity: { time: 'O(N log K)', space: 'O(K) auxiliary space for the heap' },
  tags: ['heap', 'priority-queue', 'kth-largest', 'min-heap', 'faang'],
};
export default lesson;
