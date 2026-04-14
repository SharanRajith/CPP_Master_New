const lesson = {
  id: 'm4-l4',
  title: 'Binary Search on Arrays',
  module: 4,
  lessonNumber: 4,
  xpReward: 10,
  leetcodeProblems: [
    { id: 704, title: 'Binary Search',                    url: 'https://leetcode.com/problems/binary-search/',                    difficulty: 'Easy' },
    { id: 35,  title: 'Search Insert Position',           url: 'https://leetcode.com/problems/search-insert-position/',           difficulty: 'Easy' },
    { id: 153, title: 'Find Minimum in Rotated Sorted Array', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium' },
  ],
  content: `# Binary Search

Binary search eliminates **half the search space** at each step, achieving O(log n) on sorted arrays. It is one of the most fundamentally important algorithms to master.

## The Core Template
\`\`\`cpp
int binarySearch(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {            // Note: <= not <
        int mid = left + (right - left) / 2;  // Prevent integer overflow
        
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target)  left = mid + 1;   // Target in right half
        else                          right = mid - 1;  // Target in left half
    }
    return -1;  // Not found
}
\`\`\`

> **Overflow Safety:** Always use \`mid = left + (right - left) / 2\` instead of \`(left + right) / 2\`. The latter can overflow for large indices!

## Finding the Boundary (Lower Bound)
Many problems ask for the first/last position. Use this pattern:
\`\`\`cpp
// Find leftmost index where nums[mid] >= target
int lowerBound(vector<int>& nums, int target) {
    int left = 0, right = nums.size();  // right = n (open interval)
    while (left < right) {             // Note: < not <=
        int mid = left + (right - left) / 2;
        if (nums[mid] < target) left = mid + 1;
        else                    right = mid;    // Keep mid as candidate
    }
    return left;
}
\`\`\`

## Binary Search on the Answer
A brilliant technique — instead of searching for an element, binary search for the **answer value** when:
- The answer has a monotonic property (valid answers form a contiguous range)
- Checking validity is easy once you have a candidate

\`\`\`cpp
// Minimum days to make m bouquets of k consecutive flowers
// (LeetCode #1482 preview)
bool canMake(vector<int>& bloom, int days, int m, int k) { /* ... */ }

int minDays = -1;
int left = 1, right = *max_element(bloom.begin(), bloom.end());
while (left <= right) {
    int mid = left + (right - left) / 2;
    if (canMake(bloom, mid, m, k)) { minDays = mid; right = mid - 1; }
    else                             left = mid + 1;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Classic binary search: return the index of target, or -1 if not found.
int binarySearch(vector<int>& nums, int target) {
    // TODO: Implement binary search with left/right pointers
    // Remember: mid = left + (right - left) / 2  (overflow safe!)
    return -1;
}

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << binarySearch(nums, target) << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& nums, int target) {
    int left = 0, right = (int)nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if      (nums[mid] == target) return mid;
        else if (nums[mid] < target)  left = mid + 1;
        else                          right = mid - 1;
    }
    return -1;
}

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << binarySearch(nums, target) << endl;
    return 0;
}`,
  testCases: [
    { input: '6 9\n-1 0 3 5 9 12',  expectedOutput: '4', description: 'Target 9 found at index 4' },
    { input: '6 2\n-1 0 3 5 9 12',  expectedOutput: '-1', description: 'Target 2 not present → -1' },
    { input: '1 0\n0',              expectedOutput: '0',  description: 'Single element array' },
  ],
  hints: [
    'Start: `int left = 0, right = nums.size() - 1;`',
    'Loop condition: `while (left <= right)`',
    'Mid: `int mid = left + (right - left) / 2;`',
    'If nums[mid] < target → `left = mid + 1;` else → `right = mid - 1;`',
  ],
  complexity: {
    time:  'O(log n) — halves search space each step',
    space: 'O(1) — iterative, no recursion stack',
    notes: 'O(log n) is so fast that log₂(1,000,000,000) ≈ 30 iterations max.',
  },
  tags: ['binary-search', 'arrays', 'sorted', 'divide-and-conquer'],
};
export default lesson;
