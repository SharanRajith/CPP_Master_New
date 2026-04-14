const lesson = {
  id: 'm1-l12',
  title: 'Arrays (1D, 2D, Multidimensional)',
  module: 1, lessonNumber: 12, xpReward: 10,
  leetcodeProblems: [
    { id: 1, title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy' },
    { id: 26, title: 'Remove Duplicates from Sorted Array', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', difficulty: 'Easy' },
  ],
  content: `# Arrays in C++

An array is a **contiguous block of memory** holding elements of the same type.

## 1D Arrays

\`\`\`cpp
// Declaration & initialization
int arr[5] = {10, 20, 30, 40, 50};   // Fixed size, all specified
int odds[5] = {1, 3, 5};              // {1, 3, 5, 0, 0} (rest zeroed)
int zeros[100] = {};                   // All zeros

// Access (0-indexed)
cout << arr[0];    // 10
cout << arr[4];    // 50
// arr[5]          → UNDEFINED BEHAVIOR (out of bounds!)

// Length
int len = sizeof(arr) / sizeof(arr[0]);  // 5

// Loop through
for (int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}
\`\`\`

## Arrays as Parameters

\`\`\`cpp
// Arrays decay to pointers when passed to functions!
void printArray(int arr[], int n) {   // same as int* arr
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
}
// sizeof(arr) inside function = pointer size (4 or 8), NOT array size!
// Always pass the size separately
\`\`\`

## 2D Arrays

\`\`\`cpp
// 2D array: matrix with rows and columns
int matrix[3][4] = {
    {1,  2,  3,  4},
    {5,  6,  7,  8},
    {9, 10, 11, 12}
};

cout << matrix[1][2];  // 7 (row 1, col 2)

// Iterate 2D
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        cout << matrix[i][j] << "\\t";
    }
    cout << "\\n";
}
\`\`\`

## Common Array Algorithms

\`\`\`cpp
// Find max
int findMax(int arr[], int n) {
    int maxVal = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > maxVal) maxVal = arr[i];
    return maxVal;
}

// Reverse in place
void reverse(int arr[], int n) {
    int left = 0, right = n - 1;
    while (left < right) {
        swap(arr[left], arr[right]);
        left++; right--;
    }
}

// Binary search (on sorted array)
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;  // Not found
}
\`\`\`

## Why Use vector Instead?

C-style arrays have limitations:
- Fixed size (can't resize)
- No bounds checking
- Decay to pointers

**Prefer \`std::vector\`** for most use cases (next lesson!). Use raw arrays only when performance is critical.

## Common Mistakes 🚨

- **Out-of-bounds access** — \`arr[n]\` is undefined behavior (but no error thrown!)
- **Forgetting to pass size** — can't get array size inside a function
- **VLAs** — Variable Length Arrays (\`int arr[n];\`) are not standard C++17 (GCC extension only)
`,
  starterCode: `#include <iostream>
using namespace std;

int main() {
    // Read n numbers into an array, then print:
    // 1. The maximum value
    // 2. The sum of all elements
    
    int n;
    cin >> n;
    int arr[1000];
    
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    // Your code: find max and sum
    
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    int maxVal = arr[0], sum = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
        sum += arr[i];
    }
    cout << maxVal << "\\n" << sum << endl;
    return 0;
}`,
  testCases: [
    { input: '5\n3 1 4 1 5', expectedOutput: '5\n14', description: 'Max=5, Sum=14' },
    { input: '3\n10 20 30',  expectedOutput: '30\n60', description: 'Max=30, Sum=60' },
    { input: '1\n42',        expectedOutput: '42\n42', description: 'Single element' },
  ],
  hints: [
    'Initialize `maxVal = arr[0]` and `sum = 0` before the loop.',
    'Inside the loop: `if (arr[i] > maxVal) maxVal = arr[i]; sum += arr[i];`',
    'Print max first, then sum, each on its own line.',
  ],
  complexity: { time: 'O(n)', space: 'O(n) for array storage' },
  tags: ['arrays', '1D', '2D', 'traversal', 'binary-search'],
};
export default lesson;
