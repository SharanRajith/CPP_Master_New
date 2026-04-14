const lesson = {
  id: 'm8-l2',
  title: 'Heap Sort',
  module: 8,
  lessonNumber: 2,
  xpReward: 10,
  leetcodeProblems: [
    { id: 912, title: 'Sort an Array', url: 'https://leetcode.com/problems/sort-an-array/', difficulty: 'Medium' },
  ],
  content: `# Heap Sort

Heap Sort is a fascinating $O(N \\log N)$ sorting algorithm that sorts an array **in-place** with $O(1)$ extra space!

## How it works
1. **Heapify:** Rearrange the given array so it represents a valid Max-Heap. $O(N)$ time.
2. **Extract:** Swap the root of the heap (the maximum element) with the last element of the heap. Now the largest element is locked in place at the very end of the array!
3. **Sift Down:** The new root is probably out of place. "Sift it down" to restore the Max-Heap property. (The heap size is now $N-1$).
4. Repeat Steps 2 and 3 until the heap is empty.

### 1. The Heapify Process (Building the Heap)
To build a heap from an unsorted array in $O(N)$ time, we start from the last non-leaf node, which is at index \`N/2 - 1\`, and sift it down.

\`\`\`cpp
void heapify(vector<int>& arr, int n, int i) {
    int largest = i;          // Initialize largest as root
    int left = 2 * i + 1;     // Left child
    int right = 2 * i + 2;    // Right child
    
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) largest = left;
    
    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    // If largest is not root
    if (largest != i) {
        swap(arr[i], arr[largest]);
        
        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}
\`\`\`

### 2. The Sorting Loop
\`\`\`cpp
void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    // Step 1: Build max heap (Rearrange array)
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Step 2: One by one extract an element from heap
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]); // Move current root to end
        heapify(arr, i, 0);   // Call max heapify on the reduced heap
    }
}
\`\`\`

> **Why Heap Sort?** QuickSort is normally faster in practice due to better cache locality, but QuickSort has an $O(N^2)$ worst case. HeapSort is strictly $O(N \\log N)$ even in the worst case!
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    // TODO: Determine the largest among i, left, and right
    // If a child is larger, update 'largest'
    // If largest != i, swap arr[i] with arr[largest] and call heapify(arr, n, largest)
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        // TODO: Swap the root (arr[0]) with the last element (arr[i])
        // TODO: Call heapify on the root using the reduced size 'i'
    }
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    heapSort(arr);
    
    for (int i = 0; i < n; i++) cout << arr[i] << (i == n-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; ++i) cin >> arr[i];
    heapSort(arr);
    for(int i=0; i<n; ++i) cout << arr[i] << (i == n-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '6\n12 11 13 5 6 7', expectedOutput: '5 6 7 11 12 13', description: 'Unsorted array elements.' },
    { input: '4\n4 3 2 1',         expectedOutput: '1 2 3 4',       description: 'Reverse sorted array.' },
  ],
  hints: [
    'In `heapify`, be sure to bounds-check the children: `if (left < n && arr[left] > arr[largest]) largest = left;`',
    '`swap(arr[0], arr[i]);` pushes the maximum number to the end of the array.',
    'When calling `heapify` inside the sort loop, the size passed is `i`, not `n`. This prevents the sorted elements at the end from being touched.',
  ],
  complexity: { time: 'O(N log N) guaranteed', space: 'O(log N) for recursion stack during heapify, but effectively O(1) auxiliary.' },
  tags: ['heap', 'sorting', 'in-place', 'arrays'],
};
export default lesson;
