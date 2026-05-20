const lesson = {
  id: 'm3-l4',
  title: 'set, multiset & unordered_set',
  module: 3,
  lessonNumber: 4,
  xpReward: 10,
  content: `# set, multiset & unordered_set

A **set** stores only **unique** elements. Inserting a duplicate is silently ignored. C++ offers three set variants with different trade-offs between ordering and speed.

---

## std::set — Ordered Unique Set

Implemented as a **Red-Black Tree** (self-balancing BST). Elements are always kept in **sorted ascending order**.

\`\`\`cpp
#include <set>
std::set<int> s;
s.insert(10);
s.insert(5);
s.insert(10);  // ignored — already present
s.insert(3);

for (int x : s) std::cout << x << " ";
// Prints: 3 5 10  (always sorted)
\`\`\`

### set Operations

| Operation | Time | Notes |
|-----------|------|-------|
| \`insert(x)\` | O(log n) | |
| \`erase(x)\` | O(log n) | Erase by value |
| \`count(x)\` | O(log n) | Returns 0 or 1 |
| \`find(x)\` | O(log n) | Returns iterator or \`end()\` |
| \`lower_bound(x)\` | O(log n) | First element >= x |
| \`upper_bound(x)\` | O(log n) | First element > x |
| \`size()\` / \`empty()\` | O(1) | |

\`\`\`cpp
auto it = s.find(5);
if (it != s.end()) s.erase(it);   // erase by iterator — also O(log n)

// Range query: all elements in [4, 10]
auto lo = s.lower_bound(4);
auto hi = s.upper_bound(10);
for (auto it2 = lo; it2 != hi; ++it2) std::cout << *it2 << " ";
\`\`\`

---

## std::multiset — Ordered Set With Duplicates

Same Red-Black Tree implementation, but allows **multiple copies** of the same value.

\`\`\`cpp
#include <set>  // multiset lives here too
std::multiset<int> ms = {3, 1, 4, 1, 5, 9, 2, 6, 1};
// Sorted: 1 1 1 2 3 4 5 6 9
std::cout << ms.count(1); // 3

ms.erase(ms.find(1));    // erase exactly ONE copy of 1
// Now: 1 1 2 3 4 5 6 9
\`\`\`

**Warning:** \`ms.erase(1)\` removes **all** copies of 1. Use \`ms.erase(ms.find(1))\` to remove just one.

---

## std::unordered_set — Hash Set

Implemented as a **hash table**. Elements are **not sorted**; they are bucketed by hash. Average-case operations are O(1).

\`\`\`cpp
#include <unordered_set>
std::unordered_set<int> hs;
hs.insert(42);
hs.insert(7);
hs.insert(42); // ignored

if (hs.count(42)) std::cout << "found";  // O(1) average
hs.erase(7);
\`\`\`

| Operation | Average | Worst (hash collision) |
|-----------|---------|----------------------|
| \`insert\` | O(1) | O(n) |
| \`erase\` | O(1) | O(n) |
| \`count\` / \`find\` | O(1) | O(n) |

---

## Choosing the Right Set

| Need | Use |
|------|-----|
| Unique elements, sorted order, range queries | \`std::set\` |
| Duplicate elements, sorted order | \`std::multiset\` |
| Unique elements, fastest lookup, no ordering needed | \`std::unordered_set\` |

### Pitfalls

- Custom types in \`set\`/\`multiset\` need \`operator<\` defined (or a custom comparator).
- Custom types in \`unordered_set\` need a custom hash function.
- \`unordered_set\` can degrade to O(n) under adversarial inputs; prefer \`set\` in competitive programming when keys can be crafted by an adversary.

## Full Example — Counting Duplicates

\`\`\`cpp
#include <iostream>
#include <unordered_set>

int main() {
    int arr[] = {3, 1, 4, 1, 5, 9, 3};
    std::unordered_set<int> seen;
    int dupes = 0;
    for (int x : arr) {
        if (seen.count(x)) dupes++;
        else seen.insert(x);
    }
    std::cout << dupes << "\\n";  // 2
    return 0;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    int arr[] = {3, 1, 4, 1, 5, 9, 3};
    unordered_set<int> seen;
    int duplicateCount = 0;

    // TODO: Loop through arr.
    // If the number is already in 'seen', increment duplicateCount.
    // Otherwise, insert it into 'seen'.
    // Print duplicateCount at the end.
    // Expected output: 2

    cout << duplicateCount << endl;
    return 0;
}
`,
  modelAnswer: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    int arr[] = {3, 1, 4, 1, 5, 9, 3};
    unordered_set<int> seen;
    int duplicateCount = 0;

    for (int num : arr) {
        if (seen.count(num)) {
            duplicateCount++;
        } else {
            seen.insert(num);
        }
    }

    cout << duplicateCount << endl;
    return 0;
}
`,
  testCases: [
    {
      input: '',
      expectedOutput: '2',
      description: 'Counts 2 duplicate encounters (1 appears again, 3 appears again)',
    },
  ],
  hints: [
    'Use a range-based for loop: for (int num : arr) { ... }',
    'Inside the loop: if (seen.count(num)) { duplicateCount++; } else { seen.insert(num); }',
    'seen.count(x) returns 1 if x is present (in unordered_set, count is always 0 or 1), so it can be used directly as a boolean.',
  ],
  complexity: {
    time: 'O(n) average for n elements using unordered_set; O(n log n) with std::set',
    space: 'O(n) for the set',
    notes: 'unordered_set gives O(1) average lookup; std::set gives O(log n) but maintains sorted order and supports lower_bound/upper_bound.',
  },
  leetcodeProblems: [
    { id: 217, title: 'Contains Duplicate', difficulty: 'Easy', url: 'https://leetcode.com/problems/contains-duplicate/' },
    { id: 128, title: 'Longest Consecutive Sequence', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
    { id: 349, title: 'Intersection of Two Arrays', difficulty: 'Easy', url: 'https://leetcode.com/problems/intersection-of-two-arrays/' },
    { id: 220, title: 'Contains Duplicate III', difficulty: 'Hard', url: 'https://leetcode.com/problems/contains-duplicate-iii/' },
  ],
  tags: ['stl', 'set', 'multiset', 'unordered-set', 'hash-table', 'bst'],
};
export default lesson;
