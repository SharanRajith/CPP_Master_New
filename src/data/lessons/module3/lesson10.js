const lesson = {
  id: 'm3-l10',
  title: 'Bit Manipulation',
  module: 3,
  lessonNumber: 10,
  xpReward: 10,
  content: `# Bit Manipulation

Modern CPUs execute bitwise operations in a **single clock cycle** — faster than division or modulo. Mastering bit tricks unlocks O(1) solutions to problems that otherwise require loops.

---

## The Six Bitwise Operators

| Operator | Symbol | Example | Result |
|----------|--------|---------|--------|
| AND | \`&\` | \`5 & 3\` = \`101 & 011\` | \`001\` = 1 |
| OR | \`|\` | \`5 | 3\` = \`101 | 011\` | \`111\` = 7 |
| XOR | \`^\` | \`5 ^ 3\` = \`101 ^ 011\` | \`110\` = 6 |
| NOT | \`~\` | \`~5\` = \`~00000101\` | \`11111010\` = -6 |
| Left shift | \`<<\` | \`1 << 3\` | \`1000\` = 8 |
| Right shift | \`>>\` | \`16 >> 2\` | \`0100\` = 4 |

\`\`\`cpp
int a = 5;   // binary: 0101
int b = 3;   // binary: 0011

std::cout << (a & b);   // 1  (AND)
std::cout << (a | b);   // 7  (OR)
std::cout << (a ^ b);   // 6  (XOR)
std::cout << (a << 1);  // 10 (multiply by 2)
std::cout << (a >> 1);  // 2  (divide by 2, floor)
\`\`\`

---

## Essential Bit Tricks

### Check if a number is even or odd

\`\`\`cpp
if (n & 1)  { /* odd  */ }
else        { /* even */ }
// Faster than n % 2 == 1
\`\`\`

### Check if bit k is set

\`\`\`cpp
bool isSet = (n >> k) & 1;
\`\`\`

### Set bit k

\`\`\`cpp
n |= (1 << k);
\`\`\`

### Clear bit k

\`\`\`cpp
n &= ~(1 << k);
\`\`\`

### Toggle bit k

\`\`\`cpp
n ^= (1 << k);
\`\`\`

### Check if n is a power of 2

\`\`\`cpp
bool isPow2 = (n > 0) && ((n & (n - 1)) == 0);
// n & (n-1) clears the lowest set bit; if result is 0, exactly one bit was set
\`\`\`

### Isolate the lowest set bit

\`\`\`cpp
int lowest = n & (-n);   // e.g. n=12 (1100) → 4 (0100)
\`\`\`

### The XOR trick — find the unique number

XOR is its own inverse: \`A ^ A = 0\` and \`0 ^ A = A\`. If every number appears twice except one, XOR-ing all values cancels the pairs:

\`\`\`cpp
int arr[] = {4, 1, 2, 1, 2};
int unique = 0;
for (int x : arr) unique ^= x;
std::cout << unique;  // 4
\`\`\`

---

## GCC Built-in Functions

| Function | Description |
|----------|-------------|
| \`__builtin_popcount(n)\` | Count of 1-bits (for \`unsigned int\`) |
| \`__builtin_popcountll(n)\` | Count of 1-bits (for \`unsigned long long\`) |
| \`__builtin_clz(n)\` | Count leading zeros |
| \`__builtin_ctz(n)\` | Count trailing zeros |
| \`__builtin_parity(n)\` | 1 if odd number of 1-bits |

\`\`\`cpp
int x = 7;    // binary: 0111
std::cout << __builtin_popcount(x);   // 3
std::cout << __builtin_ctz(8);        // 3  (8 = 1000, three trailing zeros)
\`\`\`

In C++20 you can use the standard \`<bit>\` header:

\`\`\`cpp
#include <bit>
std::popcount(7u);   // 3
\`\`\`

---

## Bitmask — Enumerate All Subsets

\`\`\`cpp
int n = 3;
// Iterate over all 2^n subsets of {0,1,...,n-1}
for (int mask = 0; mask < (1 << n); ++mask) {
    for (int i = 0; i < n; ++i) {
        if (mask & (1 << i)) std::cout << i << " ";
    }
    std::cout << "\\n";
}
\`\`\`

---

## Complexity

All single bitwise operations are **O(1)**. Iterating over bits of a 32-bit integer takes **O(32) = O(1)** constant time.

---

## Full Example — Count 1-bits manually

\`\`\`cpp
#include <iostream>

int countBits(int n) {
    int count = 0;
    while (n) {
        count += (n & 1);
        n >>= 1;
    }
    return count;
}

int main() {
    std::cout << countBits(7) << "\\n";   // 3
    std::cout << countBits(12) << "\\n";  // 2
    return 0;
}
\`\`\`
`,
  starterCode: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {4, 1, 2, 1, 2};
    int uniqueNum = 0;

    // TODO: Use the XOR operator to find the one number that
    // appears only once. XOR all elements into uniqueNum.
    // Every number that appears twice will cancel out (A^A=0).
    // Print uniqueNum.
    // Expected output: 4

    cout << uniqueNum << endl;
    return 0;
}
`,
  modelAnswer: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {4, 1, 2, 1, 2};
    int uniqueNum = 0;

    for (int num : arr) {
        uniqueNum ^= num;
    }

    cout << uniqueNum << endl;
    return 0;
}
`,
  testCases: [
    {
      input: '',
      expectedOutput: '4',
      description: 'XOR of {4,1,2,1,2} cancels pairs, leaving 4',
    },
  ],
  hints: [
    'Use a range-based for loop: for (int num : arr) { ... }',
    'Inside the loop, apply XOR: uniqueNum ^= num; (same as uniqueNum = uniqueNum ^ num;)',
    'After the loop, uniqueNum holds the value that appeared an odd number of times. Print it with cout << uniqueNum << endl;',
  ],
  complexity: {
    time: 'O(n) — one pass through the array',
    space: 'O(1) — only one extra integer variable',
    notes: 'XOR approach beats hash-set (also O(n) time but O(n) space) and sorting (O(n log n)). Works because XOR is commutative, associative, and self-inverse.',
  },
  leetcodeProblems: [
    { id: 136, title: 'Single Number', difficulty: 'Easy', url: 'https://leetcode.com/problems/single-number/' },
    { id: 191, title: 'Number of 1 Bits', difficulty: 'Easy', url: 'https://leetcode.com/problems/number-of-1-bits/' },
    { id: 338, title: 'Counting Bits', difficulty: 'Easy', url: 'https://leetcode.com/problems/counting-bits/' },
    { id: 231, title: 'Power of Two', difficulty: 'Easy', url: 'https://leetcode.com/problems/power-of-two/' },
    { id: 268, title: 'Missing Number', difficulty: 'Easy', url: 'https://leetcode.com/problems/missing-number/' },
  ],
  tags: ['bit-manipulation', 'xor', 'bitwise', 'bitmask', '__builtin_popcount'],
};
export default lesson;
