const lesson = {
  id: 'msvc-l14',
  title: 'Infosys NQT: Bit Manipulation',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 191, title: 'Number of 1 Bits',              url: 'https://leetcode.com/problems/number-of-1-bits/',              difficulty: 'Easy'   },
    { id: 231, title: 'Power of Two',                  url: 'https://leetcode.com/problems/power-of-two/',                  difficulty: 'Easy'   },
    { id: 136, title: 'Single Number',                 url: 'https://leetcode.com/problems/single-number/',                 difficulty: 'Easy'   },
  ],
  content: `# Infosys NQT — Bit Manipulation

Bit tricks come up in Infosys Specialist track, TCS NQT, and Accenture coding tests. They enable O(1) solutions to problems that look like they need loops.

---

## Bit Operators Quick Reference

| Operator | Symbol | Example (5 = 101) |
|---|---|---|
| AND | & | 5 & 3 = 1 (101 & 011) |
| OR  | \\| | 5 \\| 3 = 7 (101 \\| 011) |
| XOR | ^ | 5 ^ 3 = 6 (101 ^ 011) |
| NOT | ~ | ~5 = -6 |
| Left shift | << | 5 << 1 = 10 |
| Right shift | >> | 5 >> 1 = 2 |

---

## 1. Check if bit i is set

\`\`\`cpp
bool isBitSet(int n, int i) {
    return (n >> i) & 1;
}
// n=5 (101), i=0 → 1 (set), i=1 → 0 (not set), i=2 → 1 (set)
\`\`\`

---

## 2. Set bit i

\`\`\`cpp
int setBit(int n, int i) {
    return n | (1 << i);
}
// n=5 (101), i=1 → 7 (111)
\`\`\`

---

## 3. Clear bit i

\`\`\`cpp
int clearBit(int n, int i) {
    return n & ~(1 << i);
}
// n=7 (111), i=1 → 5 (101)
\`\`\`

---

## 4. Count Set Bits (Brian Kernighan's Algorithm)

\`\`\`cpp
int countBits(int n) {
    int count = 0;
    while (n) {
        n &= (n - 1); // removes lowest set bit
        count++;
    }
    return count;
}
// n=13 (1101) → 3 set bits
\`\`\`

---

## 5. Power of Two Check

\`\`\`cpp
bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
// 8 (1000) → 8 & 7 = 1000 & 0111 = 0 → true
// 6 (110)  → 6 & 5 = 110 & 101 = 100 ≠ 0 → false
\`\`\`

---

## 6. Find the Single Number (XOR trick)

In an array where every element appears twice except one — XOR all elements:

\`\`\`cpp
int singleNumber(vector<int>& nums) {
    int res = 0;
    for (int n : nums) res ^= n;
    return res;
}
// {2,2,1} → 0^2^2^1 = 1
// {4,1,2,1,2} → 4
\`\`\`

---

## 7. Swap Without Temp Variable

\`\`\`cpp
void swapXOR(int& a, int& b) {
    a ^= b;
    b ^= a;
    a ^= b;
}
\`\`\`

---

## Key Bit Tricks

| Trick | Expression | Effect |
|---|---|---|
| Clear lowest set bit | n & (n-1) | Removes rightmost 1 |
| Isolate lowest set bit | n & (-n) | Keeps only rightmost 1 |
| Power of 2 check | n & (n-1) == 0 | True if power of 2 |
| XOR self | a ^ a = 0 | Any number XOR itself = 0 |
| XOR identity | a ^ 0 = a | XOR with 0 unchanged |

> XOR is the go-to for "find the odd one out" problems because duplicates cancel each other.
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

int singleNumber(vector<int>& nums) {
    // TODO: Find the element that appears only once
    // Every other element appears exactly twice
    return 0;
}

int countBits(int n) {
    // TODO: Count set bits (1s) in the binary representation of n
    return 0;
}

int main() {
    vector<int> nums = {4, 1, 2, 1, 2};
    cout << singleNumber(nums) << "\\n"; // 4
    cout << countBits(13)       << "\\n"; // 3
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

int singleNumber(vector<int>& nums) {
    int res = 0;
    for (int n : nums) res ^= n;
    return res;
}

int countBits(int n) {
    int count = 0;
    while (n) { n &= (n - 1); count++; }
    return count;
}

int main() {
    vector<int> nums = {4, 1, 2, 1, 2};
    cout << singleNumber(nums) << "\\n";
    cout << countBits(13)       << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'singleNumber({4,1,2,1,2})=4, countBits(13)=3', expectedOutput: '4\n3' },
  ],
  hints: [
    'For singleNumber: XOR all elements. Duplicates cancel out (a^a=0), leaving the unique number.',
    'For countBits: use n &= (n-1) to strip the lowest set bit on each iteration.',
    '13 in binary is 1101 — it has three 1 bits.',
  ],
  complexity: { time: 'O(N) for singleNumber, O(set bits) for countBits', space: 'O(1)' },
  tags: ['infosys', 'nqt', 'bit-manipulation', 'xor', 'dsa'],
};
export default lesson;
