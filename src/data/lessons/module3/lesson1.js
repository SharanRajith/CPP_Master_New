const lesson = {
  id: 'm3-l1',
  title: 'vector Internals & Amortized Complexity',
  module: 3,
  lessonNumber: 1,
  xpReward: 10,
  content: `# vector Internals & Amortized Complexity

## What is std::vector?

\`std::vector\` is C++'s dynamic array — the workhorse of competitive programming and production code alike. Under the hood it owns a **heap-allocated contiguous buffer** of a given *capacity*; the *size* tracks how many elements are actually in use.

\`\`\`cpp
#include <vector>
std::vector<int> v;   // size=0, capacity=0
v.push_back(1);       // size=1, capacity=1 (implementation-defined growth)
v.push_back(2);       // size=2, capacity=2
v.push_back(3);       // size=3, capacity=4  ← reallocation doubled the buffer
\`\`\`

## Memory Layout

\`\`\`
capacity = 4
 ┌────┬────┬────┬────┐
 │  1 │  2 │  3 │  ? │
 └────┴────┴────┴────┘
  size = 3
\`\`\`

The **size** is the number of live elements; **capacity** is the total allocated slots. When \`size == capacity\` and you call \`push_back\`, the vector allocates a new buffer (typically 2× the old capacity), moves all elements, and releases the old buffer.

## Key Operations & Complexity

| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| \`push_back(x)\` | **O(1) amortized** | Occasional O(n) reallocation |
| \`pop_back()\` | O(1) | |
| \`operator[]\` / \`at(i)\` | O(1) | \`at\` does bounds checking |
| \`insert(it, x)\` | O(n) | Shifts elements right |
| \`erase(it)\` | O(n) | Shifts elements left |
| \`front()\` / \`back()\` | O(1) | |
| \`size()\` / \`empty()\` | O(1) | |
| \`reserve(n)\` | O(n) | Pre-allocates; avoids reallocations |
| \`clear()\` | O(n) | Destroys elements; keeps capacity |
| \`resize(n)\` | O(n) | Adds default-constructed elements |

## Why O(1) Amortized push_back?

Each element is moved at most O(log n) times across all doublings. Summing over n insertions the total work is O(n), so each push is **amortized O(1)**. This is the classic **geometric growth** argument.

## Practical Tips

**Pre-allocate with reserve:**
\`\`\`cpp
std::vector<int> v;
v.reserve(1000);        // one allocation, no reallocations for ≤ 1000 elements
for (int i = 0; i < 1000; ++i) v.push_back(i);
\`\`\`

**Shrink capacity after erasure:**
\`\`\`cpp
v.shrink_to_fit();      // request to release excess capacity (non-binding hint)
\`\`\`

**2D vectors:**
\`\`\`cpp
std::vector<std::vector<int>> grid(3, std::vector<int>(4, 0)); // 3×4 grid of zeros
\`\`\`

**Initialiser list:**
\`\`\`cpp
std::vector<int> primes = {2, 3, 5, 7, 11};
\`\`\`

## Common Pitfalls

- **Iterator invalidation**: any reallocation (triggered by \`push_back\`, \`insert\`, \`resize\`) invalidates all iterators and pointers into the vector. Cache indices, not iterators, when growing a vector.
- **\`v[i]\` vs \`v.at(i)\`**: \`operator[]\` has undefined behaviour on out-of-bounds; \`at()\` throws \`std::out_of_range\`.
- **Copying is deep**: \`std::vector<int> b = a;\` copies every element — O(n).

## Complete Example

\`\`\`cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    v.reserve(5);
    for (int i = 1; i <= 5; ++i) v.push_back(i * i);

    std::cout << "size=" << v.size() << " capacity=" << v.capacity() << "\\n";
    for (int x : v) std::cout << x << " ";
    std::cout << "\\n";

    v.erase(v.begin() + 2);   // remove element at index 2 (value 9)
    for (int x : v) std::cout << x << " ";
    std::cout << "\\n";
    return 0;
}
// Output:
// size=5 capacity=5
// 1 4 9 16 25
// 1 4 16 25
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // TODO: Create a vector of integers, push_back the values 1 through 5,
    // then print each element separated by spaces on one line.
    // Expected output: 1 2 3 4 5

    return 0;
}
`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;
    for (int i = 1; i <= 5; ++i) v.push_back(i);
    for (int i = 0; i < (int)v.size(); ++i) {
        if (i > 0) cout << " ";
        cout << v[i];
    }
    cout << endl;
    return 0;
}
`,
  testCases: [
    {
      input: '',
      expectedOutput: '1 2 3 4 5',
      description: 'Prints integers 1 through 5 space-separated',
    },
  ],
  hints: [
    'Declare a std::vector<int> and use push_back in a loop from 1 to 5.',
    'Use a range-based for loop or index loop to print elements. Print a space between elements, not after the last one.',
    'Use a regular for loop: for (int i = 0; i < v.size(); ++i) { if (i > 0) cout << " "; cout << v[i]; } then cout << endl;',
  ],
  complexity: {
    time: 'O(n) for n push_back operations (amortized O(1) each)',
    space: 'O(n) for storing n elements',
    notes: 'reserve() avoids reallocations; erase/insert at arbitrary position is O(n) due to shifting.',
  },
  leetcodeProblems: [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', url: 'https://leetcode.com/problems/two-sum/' },
    { id: 238, title: 'Product of Array Except Self', difficulty: 'Medium', url: 'https://leetcode.com/problems/product-of-array-except-self/' },
    { id: 189, title: 'Rotate Array', difficulty: 'Medium', url: 'https://leetcode.com/problems/rotate-array/' },
    { id: 283, title: 'Move Zeroes', difficulty: 'Easy', url: 'https://leetcode.com/problems/move-zeroes/' },
  ],
  tags: ['stl', 'vector', 'amortized', 'dynamic-array'],
};
export default lesson;
