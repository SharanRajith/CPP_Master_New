const lesson = {
  id: 'm3-l7',
  title: 'Iterators & Algorithms',
  module: 3,
  lessonNumber: 7,
  xpReward: 10,
  content: `# Iterators & Algorithms

## What is an Iterator?

An **iterator** is a generalised pointer that points to an element inside a container and knows how to advance to the next element. Every STL container exposes two key iterators:

- \`.begin()\` — points to the **first** element
- \`.end()\` — points to **one past** the last element (a sentinel; never dereference it)

\`\`\`cpp
std::vector<int> v = {10, 20, 30};
auto it = v.begin();
std::cout << *it;   // 10  (dereference)
++it;
std::cout << *it;   // 20
\`\`\`

### Iterator categories

| Category | Supports | Examples |
|----------|----------|---------|
| Random access | \`it + n\`, \`it[n]\`, \`<\` | vector, deque, array |
| Bidirectional | \`++\`, \`--\` | list, set, map |
| Forward | \`++\` only | forward_list, unordered containers |

---

## The \`<algorithm>\` Library

Instead of writing error-prone loops, use the battle-tested algorithms in \`<algorithm>\`. They all work on **half-open ranges** \`[begin, end)\`.

### std::sort

Sorts a random-access range in O(n log n). Uses Introsort (QuickSort + HeapSort hybrid).

\`\`\`cpp
#include <algorithm>
#include <vector>

std::vector<int> v = {4, 1, 3, 2};
std::sort(v.begin(), v.end());           // ascending: 1 2 3 4
std::sort(v.begin(), v.end(), std::greater<int>()); // descending: 4 3 2 1
\`\`\`

### std::find

Linear search; returns iterator to first match or \`end()\`.

\`\`\`cpp
auto it = std::find(v.begin(), v.end(), 3);
if (it != v.end()) std::cout << "Found at index " << (it - v.begin());
\`\`\`

### std::count

Returns the number of elements equal to a value.

\`\`\`cpp
std::vector<int> nums = {1, 2, 2, 3, 2};
int c = std::count(nums.begin(), nums.end(), 2); // 3
\`\`\`

### std::reverse

Reverses a range in-place in O(n).

\`\`\`cpp
std::reverse(v.begin(), v.end());
\`\`\`

### std::max_element / std::min_element

Returns an **iterator** to the max/min element. Dereference with \`*\`.

\`\`\`cpp
int biggest = *std::max_element(v.begin(), v.end());
int smallest = *std::min_element(v.begin(), v.end());
\`\`\`

### std::accumulate (in \`<numeric>\`)

Sums a range. The third argument is the initial value.

\`\`\`cpp
#include <numeric>
int total = std::accumulate(v.begin(), v.end(), 0);
\`\`\`

### std::binary_search

O(log n) search on a **sorted** range. Returns bool.

\`\`\`cpp
std::sort(v.begin(), v.end());
bool found = std::binary_search(v.begin(), v.end(), 3); // true/false
\`\`\`

### std::unique

Removes consecutive duplicates (call \`sort\` first). Returns iterator to new logical end.

\`\`\`cpp
std::sort(v.begin(), v.end());
auto newEnd = std::unique(v.begin(), v.end());
v.erase(newEnd, v.end());
\`\`\`

### std::lower_bound / std::upper_bound

Binary search on a sorted range.

\`\`\`cpp
// lower_bound: first element >= val
// upper_bound: first element >  val
auto lo = std::lower_bound(v.begin(), v.end(), 3);
auto hi = std::upper_bound(v.begin(), v.end(), 3);
\`\`\`

---

## Algorithm Complexity Reference

| Algorithm | Time | Space |
|-----------|------|-------|
| \`sort\` | O(n log n) | O(log n) stack |
| \`find\` / \`count\` | O(n) | O(1) |
| \`reverse\` | O(n) | O(1) |
| \`accumulate\` | O(n) | O(1) |
| \`binary_search\` | O(log n) | O(1) |
| \`max_element\` | O(n) | O(1) |

## Full Example

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> nums = {45, 12, 89, 33, 7};
    std::sort(nums.begin(), nums.end());
    int total = std::accumulate(nums.begin(), nums.end(), 0);
    int maxVal = *std::max_element(nums.begin(), nums.end());
    std::cout << total << " " << maxVal << "\\n"; // 186 89
    return 0;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> nums = {45, 12, 89, 33, 7};

    // TODO:
    // 1. Sort the vector ascending with std::sort.
    // 2. Compute the sum with std::accumulate (initial value 0).
    // 3. Find the maximum with std::max_element (remember to dereference).
    // 4. Print: "<sum> <max>" on one line.
    // Expected output: 186 89

    return 0;
}
`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> nums = {45, 12, 89, 33, 7};
    sort(nums.begin(), nums.end());
    int totalSum = accumulate(nums.begin(), nums.end(), 0);
    int maxVal = *max_element(nums.begin(), nums.end());
    cout << totalSum << " " << maxVal << endl;
    return 0;
}
`,
  testCases: [
    {
      input: '',
      expectedOutput: '186 89',
      description: 'Sum of {45,12,89,33,7} is 186 and max is 89',
    },
  ],
  hints: [
    'Call sort(nums.begin(), nums.end()); to sort in-place.',
    'int totalSum = accumulate(nums.begin(), nums.end(), 0); — the third argument is the starting sum.',
    'int maxVal = *max_element(nums.begin(), nums.end()); — max_element returns an iterator, so dereference it with *.',
  ],
  complexity: {
    time: 'O(n log n) for sort; O(n) for accumulate and max_element',
    space: 'O(log n) stack space for sort; O(1) for others',
    notes: 'All algorithms operate on half-open ranges [begin, end). Works on any random-access container.',
  },
  leetcodeProblems: [
    { id: 912, title: 'Sort an Array', difficulty: 'Medium', url: 'https://leetcode.com/problems/sort-an-array/' },
    { id: 704, title: 'Binary Search', difficulty: 'Easy', url: 'https://leetcode.com/problems/binary-search/' },
    { id: 75, title: 'Sort Colors', difficulty: 'Medium', url: 'https://leetcode.com/problems/sort-colors/' },
    { id: 315, title: 'Count of Smaller Numbers After Self', difficulty: 'Hard', url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/' },
  ],
  tags: ['stl', 'iterators', 'algorithms', 'sort', 'accumulate', 'binary-search'],
};
export default lesson;
