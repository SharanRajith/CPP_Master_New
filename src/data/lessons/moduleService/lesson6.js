const lesson = {
  id: 'msvc-l6',
  title: 'Wipro: Sorting & Searching',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 704, title: 'Binary Search',              url: 'https://leetcode.com/problems/binary-search/',              difficulty: 'Easy' },
    { id: 34,  title: 'Find First and Last Position', url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', difficulty: 'Medium' },
    { id: 75,  title: 'Sort Colors (Dutch Flag)',   url: 'https://leetcode.com/problems/sort-colors/',                difficulty: 'Medium' },
  ],
  content: `# Wipro — Sorting & Searching DSA

Every Wipro interview has at least one sorting or binary search question. These are the patterns that matter.

---

## 1. Binary Search

\`\`\`cpp
int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
\`\`\`

> Always use \`lo + (hi - lo) / 2\` to avoid integer overflow.

---

## 2. Find First & Last Position (Binary Search variant)

\`\`\`cpp
int lowerBound(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size(), result = -1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] >= target) { result = mid; hi = mid; }
        else lo = mid + 1;
    }
    return result;
}
\`\`\`

---

## 3. Dutch National Flag (Sort 0s, 1s, 2s)

\`\`\`cpp
void sortColors(vector<int>& arr) {
    int lo = 0, mid = 0, hi = arr.size() - 1;
    while (mid <= hi) {
        if      (arr[mid] == 0) swap(arr[lo++], arr[mid++]);
        else if (arr[mid] == 1) mid++;
        else                    swap(arr[mid],  arr[hi--]);
    }
}
\`\`\`

---

## 4. Merge Sort

\`\`\`cpp
void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> L(arr.begin()+l, arr.begin()+m+1);
    vector<int> R(arr.begin()+m+1, arr.begin()+r+1);
    int i=0, j=0, k=l;
    while (i<L.size() && j<R.size())
        arr[k++] = (L[i]<=R[j]) ? L[i++] : R[j++];
    while (i<L.size()) arr[k++] = L[i++];
    while (j<R.size()) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);
    merge(arr, l, m, r);
}
\`\`\`

---

## 5. Quick Select — Kth Largest

\`\`\`cpp
int partition(vector<int>& a, int l, int r) {
    int pivot = a[r], i = l;
    for (int j = l; j < r; j++)
        if (a[j] <= pivot) swap(a[i++], a[j]);
    swap(a[i], a[r]);
    return i;
}

int kthLargest(vector<int>& a, int k) {
    int l=0, r=a.size()-1, target=a.size()-k;
    while (l<r) {
        int p = partition(a,l,r);
        if (p==target) break;
        else if (p<target) l=p+1;
        else r=p-1;
    }
    return a[target];
}
\`\`\`

---

## Wipro Tips

- Binary search is asked in EVERY Wipro Elite / Turbo interview.
- Dutch Flag is Wipro's favourite 3-partition array question.
- Know time complexities: Binary Search O(log N), Merge Sort O(N log N), Quick Sort O(N log N) avg.
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    // TODO: Return index of target, or -1 if not found
    return -1;
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13};
    cout << binarySearch(arr, 7)  << "\\n"; // 3
    cout << binarySearch(arr, 4)  << "\\n"; // -1
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13};
    cout << binarySearch(arr, 7)  << "\\n";
    cout << binarySearch(arr, 4)  << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'Binary search: 7 is at index 3, 4 is not found (-1)', expectedOutput: '3\n-1' },
  ],
  hints: [
    'Start with lo=0 and hi=arr.size()-1.',
    'Calculate mid = lo + (hi - lo) / 2 to avoid overflow.',
    'If arr[mid] < target, search right half (lo = mid+1). If larger, search left (hi = mid-1).',
  ],
  complexity: { time: 'O(log N)', space: 'O(1)' },
  tags: ['wipro', 'binary-search', 'sorting', 'dsa'],
};
export default lesson;
