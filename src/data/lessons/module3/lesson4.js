const lesson = {
  id: 'm3-l4',
  title: 'Sets & Hash Sets',
  module: 3,
  lessonNumber: 4,
  xpReward: 10,
  leetcodeProblems: [
    {
      id: 217,
      title: "Contains Duplicate",
      difficulty: "Easy",
      url: "https://leetcode.com/problems/contains-duplicate/"
    }
  ],
  content: `# Sets & Hash Sets

A **Set** is a container that stores *unique* elements. If you try to insert a duplicate, it just ignores it!

C++ provides two main types of sets that are crucial for interviews:

## 1. std::set (Ordered Set)
Under the hood, a regular \`set\` is implemented as a **Self-Balancing Binary Search Tree** (usually a Red-Black Tree).
- Elements are always **sorted** in ascending order automatically!
- Insertion, Deletion, and Searching take $O(\\log N)$ time.

\`\`\`cpp
#include <set>
std::set<int> mySet;
mySet.insert(10);
mySet.insert(5);
mySet.insert(10); // Ignored, 10 already exists!

// Printing will output: 5, 10 (sorted automatically)
\`\`\`

## 2. std::unordered_set (Hash Set)
Under the hood, an \`unordered_set\` is implemented using a **Hash Table**.
- Elements are **NOT sorted**. They are scattered randomly based on their hash.
- Insertion, Deletion, and Searching take astonishingly fast **$O(1)$ average time**.

> **Interview Tip:** Always default to using \`std::unordered_set\` for $O(1)$ lookups unless you explicitly need the numbers to be kept in sorted order!

\`\`\`cpp
#include <unordered_set>
std::unordered_set<int> hashSet;
hashSet.insert(42);

// Checking if an element exists (The O(1) way!)
if (hashSet.count(42)) {
    std::cout << "42 is in the set!";
}
\`\`\`
*(Note: \`.count()\` returns 1 if it exists, and 0 if it doesn't)*
`,
  starterCode: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    unordered_set<int> seen;
    int arr[] = {3, 1, 4, 1, 5, 9, 3}; // 1 and 3 are duplicates!
    
    int duplicateCount = 0;
    
    // TODO: Loop through the array.
    // If the number is already in the 'seen' set, increment duplicateCount.
    // If it's not, insert it into the set!
    
    
    
    cout << duplicateCount << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    unordered_set<int> seen;
    int arr[] = {3, 1, 4, 1, 5, 9, 3};
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
}`,
  testCases: [
    { input: '', expectedOutput: '2', description: 'Counts exactly 2 duplicate encounters in the constant array.' }
  ],
  hints: [
    'Use a range-based for loop: `for (int num : arr) { ... }`',
    '`if (seen.count(num)) { duplicateCount++; }`',
    '`else { seen.insert(num); }`'
  ],
  complexity: { time: 'O(N)', space: 'O(N)' },
  tags: ['set', 'unordered_set', 'hash-table', 'stl'],
};
export default lesson;
