const lesson = {
  id: 'm11-l1',
  title: 'Bit Manipulation Tricks',
  module: 11,
  lessonNumber: 1,
  xpReward: 10,
  leetcodeProblems: [
    { id: 191, title: 'Number of 1 Bits', url: 'https://leetcode.com/problems/number-of-1-bits/', difficulty: 'Easy' },
    { id: 338, title: 'Counting Bits', url: 'https://leetcode.com/problems/counting-bits/', difficulty: 'Easy' },
  ],
  content: `# Bit Manipulation Tricks

Bit manipulation is one of the most mechanically fast tools in computer science because processors do it natively in one clock cycle. 
In C++, bitwise operators operate on integers at the binary level.

## The Core Operators
- **AND (` + "`" + `&` + "`" + `):** 1 if both bits are 1. (` + "`" + `1010 & 1100 = 1000` + "`" + `)
- **OR (` + "`" + `|` + "`" + `):** 1 if either bit is 1. (` + "`" + `1010 | 1100 = 1110` + "`" + `)
- **XOR (` + "`" + `^` + "`" + `):** 1 if bits are DIFFERENT. (` + "`" + `1010 ^ 1100 = 0110` + "`" + `). Crucially, $A \\oplus A = 0$!
- **NOT (` + "`" + `~` + "`" + `):** Flips all bits. (Inverts 0s to 1s and 1s to 0s).
- **Left Shift (` + "`" + `<<` + "`" + `):** Shifts bits left by $k$. Equivalent to doing $num \\times 2^k$.
- **Right Shift (` + "`" + `>>` + "`" + `):** Shifts bits right. Equivalent to $num / 2^k$ (integer division).

## Essential Tricks
1. **Check if a number is Even or Odd:**
   Don't use ` + "`" + `x % 2 == 0` + "`" + `. Use ` + "`" + `(x & 1) == 0` + "`" + `. The rightmost bit of any odd integer is always 1!

2. **Check if a number is a Power of Two:**
   A power of two has exactly one ` + "`" + `1` + "`" + ` bit (e.g., 4 is 100).
   The trick ` + "`" + `x & (x - 1)` + "`" + ` flips the lowest set bit to 0. So if ` + "`" + `x & (x - 1) == 0` + "`" + `, it's a power of two!

3. **Count the number of 1 bits (Hamming Weight):**
   Instead of shifting 32 times, you can just repeatedly do ` + "`" + `n = n & (n - 1)` + "`" + ` inside a while loop and count how many times it takes to reach 0. It perfectly deletes the rightmost ` + "`" + `1` + "`" + ` each loop!

\`\`\`cpp
int hammingWeight(uint32_t n) {
    int count = 0;
    while (n != 0) {
        n = n & (n - 1); // Delete rightmost 1-bit
        count++;
    }
    return count;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// LeetCode 338: Counting Bits
// Given an integer n, return an array ans of length n + 1 where ans[i] is 
// the number of 1's in the binary representation of i.
// O(N) DP approach!
vector<int> countBits(int n) {
    vector<int> ans(n + 1, 0);
    
    for (int i = 1; i <= n; i++) {
        // TODO: The number of bits in 'i' is the same as the number of bits 
        // in 'i / 2' (which is i >> 1), PLUS 1 if 'i' is odd!
        // Try filling this out in a single O(1) step based on DP.
    }
    
    return ans;
}

int main() {
    int n; cin >> n;
    vector<int> ans = countBits(n);
    for (int i = 0; i < ans.size(); i++) cout << ans[i] << (i == ans.size()-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

vector<int> countBits(int n) {
    vector<int> ans(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return ans;
}

int main() {
    int n; cin >> n;
    vector<int> ans = countBits(n);
    for (int i = 0; i < ans.size(); i++) cout << ans[i] << (i == ans.size()-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '2', expectedOutput: '0 1 1', description: '0 is 0 bits, 1 is 1 bit, 2(10) is 1 bit.' },
    { input: '5', expectedOutput: '0 1 1 2 1 2', description: 'Counts bits optimally using 1D DP.' },
  ],
  hints: [
    '`ans[i >> 1]` retrieves the bit count from `i / 2`, because bit shifting right effectively deletes the lowest bit.',
    '`(i & 1)` checks if that lowest bit we deleted was a 1, so we add it back!',
  ],
  complexity: { time: 'O(N)', space: 'O(N) for the result array' },
  tags: ['bit-manipulation', 'dp', 'easy', 'math'],
};
export default lesson;
