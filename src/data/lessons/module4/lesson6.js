const lesson = {
  id: 'm4-l6',
  title: 'Sorting Algorithms Deep Dive',
  module: 4,
  lessonNumber: 6,
  xpReward: 10,
  leetcodeProblems: [
    { id: 912, title: 'Sort an Array',           url: 'https://leetcode.com/problems/sort-an-array/',           difficulty: 'Medium' },
    { id: 148, title: 'Sort List',               url: 'https://leetcode.com/problems/sort-list/',               difficulty: 'Medium' },
    { id: 75,  title: 'Sort Colors (Dutch Flag)', url: 'https://leetcode.com/problems/sort-colors/',             difficulty: 'Medium' },
  ],
  content: `# Sorting Algorithms Deep Dive

While \`std::sort\` handles all practical cases, knowing how sorting algorithms work is essential for interviews and understanding algorithm design.

## Merge Sort — O(n log n) Guaranteed
Divide & Conquer. Split in half, recursively sort each half, merge.
\`\`\`cpp
void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size())
        arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    while (i < left.size())  arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int mid = l + (r - l) / 2;
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, r);
    merge(arr, l, mid, r);
}
\`\`\`

## Quick Sort — O(n log n) Average, O(n²) Worst
Pick a pivot, partition around it. Extremely fast in practice.

## Dutch National Flag (3-Way Partition) — LeetCode #75
Sort an array of 0s, 1s, and 2s in **one pass** — no extra space.
\`\`\`cpp
void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if      (nums[mid] == 0) swap(nums[low++], nums[mid++]);
        else if (nums[mid] == 1) mid++;
        else                     swap(nums[mid], nums[high--]);
    }
}
\`\`\`

## Big Picture Comparison
| Algorithm | Best | Average | Worst | Space | Stable? |
|---|---|---|---|---|---|
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ No |
| Heap Sort  | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ No |
| std::sort  | O(n log n) | O(n log n) | O(n log n) | O(log n) | ❌ No |

> **std::sort** in C++ is **Introsort** — a hybrid of QuickSort + HeapSort + InsertionSort that guarantees O(n log n) worst case.
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Dutch National Flag: sort an array of 0s, 1s, 2s in one pass.
// Do NOT use std::sort. Use the 3-pointer technique.
void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    // TODO: implement Dutch national flag algorithm
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    sortColors(nums);
    for (int i = 0; i < n; i++) cout << nums[i] << " \\n"[i == n-1];
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = (int)nums.size() - 1;
    while (mid <= high) {
        if      (nums[mid] == 0) swap(nums[low++], nums[mid++]);
        else if (nums[mid] == 1) mid++;
        else                     swap(nums[mid], nums[high--]);
    }
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    sortColors(nums);
    for (int i = 0; i < n; i++) cout << nums[i] << " \\n"[i == n-1];
    return 0;
}`,
  testCases: [
    { input: '6\n2 0 2 1 1 0', expectedOutput: '0 0 1 1 2 2', description: 'Classic Dutch flag input' },
    { input: '3\n2 0 1',       expectedOutput: '0 1 2',       description: 'Simple 3-element case' },
    { input: '1\n0',           expectedOutput: '0',           description: 'Single element' },
  ],
  hints: [
    'Three pointers: `low=0, mid=0, high=n-1`',
    'If nums[mid]==0: swap(nums[low], nums[mid]); low++; mid++;',
    'If nums[mid]==1: mid++ only (it\'s in the right place)',
    'If nums[mid]==2: swap(nums[mid], nums[high]); high-- (do NOT increment mid!)',
  ],
  complexity: {
    time:  'O(n) — single pass',
    space: 'O(1) — in-place sorting',
    notes: 'The key insight: when swapping with high, we don\'t advance mid because the swapped element hasn\'t been examined yet.',
  },
  tags: ['sorting', 'dutch-flag', 'two-pointers', 'arrays'],
};
export default lesson;
