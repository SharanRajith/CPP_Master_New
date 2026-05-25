const lesson = {
  id: 'apt-l4',
  title: 'Number Series & Patterns',
  module: 'aptitude',
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Number Series & Patterns

Number series appears in every service company logical reasoning section. TCS NQT gives 5–8 series questions. The key is recognizing the pattern fast.

---

## The 6 Most Common Series Types

### 1. Arithmetic Series (AP)
Constant difference between terms.
\`\`\`
2, 5, 8, 11, 14, ?
Difference = 3 → next = 17

Formula: nth term = a + (n-1)d
\`\`\`

### 2. Geometric Series (GP)
Constant ratio between terms.
\`\`\`
3, 6, 12, 24, 48, ?
Ratio = 2 → next = 96

Formula: nth term = a × r^(n-1)
\`\`\`

### 3. Squares / Cubes Series
\`\`\`
1, 4, 9, 16, 25, ?     → perfect squares → 36
1, 8, 27, 64, 125, ?   → perfect cubes  → 216

Mixed: 2, 5, 10, 17, 26, ?  → (n²+1): 1+1, 4+1, 9+1... → 37
\`\`\`

### 4. Difference Series (second-order)
Differences between terms form their own AP/GP.
\`\`\`
1, 2, 4, 7, 11, 16, ?
Differences: 1, 2, 3, 4, 5 → next diff = 6 → answer = 22
\`\`\`

### 5. Fibonacci-type Series
Each term = sum of two preceding terms.
\`\`\`
1, 1, 2, 3, 5, 8, 13, ?  → 21
2, 3, 5, 8, 13, 21, ?    → 34
\`\`\`

### 6. Alternating / Two-interleaved Series
Two separate series merged alternately.
\`\`\`
1, 2, 4, 6, 7, 10, 10, 14, 13, ?
Odd positions:  1, 4, 7, 10, 13 (+3)
Even positions: 2, 6, 10, 14    (+4) → next odd = 13, answer = 18
\`\`\`

---

## Approach for Any Series in NQT

1. Check differences (D1) — is D1 constant? → AP
2. Check ratios — constant? → GP
3. Check D1 differences (D2) — is D2 constant or a pattern? → 2nd order
4. Check squares/cubes — familiar perfect powers?
5. Check if even/odd positions form separate series — alternating?
6. Check Fibonacci pattern — each = sum of previous two?

---

## Solved NQT Examples

**Q1.** 6, 11, 21, 41, 81, ?
\`\`\`
Differences: 5, 10, 20, 40 → ×2 each time → next = 80
Answer: 81 + 80 = 161
\`\`\`

**Q2.** 3, 9, 27, 81, ?
\`\`\`
Ratio = 3 (GP) → next = 243
\`\`\`

**Q3.** 2, 6, 12, 20, 30, ?
\`\`\`
Differences: 4, 6, 8, 10 → next = 12 → answer = 42
(Also: n(n+1): 1×2, 2×3, 3×4... → 6×7 = 42)
\`\`\`

**Q4.** Find the wrong term: 2, 3, 7, 22, 89, 440
\`\`\`
Pattern: ×1+1, ×2+1, ×3+1, ×4+1, ×5+1
2×1+1=3, 3×2+1=7, 7×3+1=22, 22×4+1=89, 89×5+1=446 ≠ 440
Wrong term: 440 (should be 446)
\`\`\`

---

## Quick Pattern Recognition Table

| Pattern | How to spot |
|---|---|
| AP | Constant D1 |
| GP | Constant ratio |
| Squares | 1,4,9,16,25... |
| Cubes | 1,8,27,64... |
| 2nd order | D1 is itself AP |
| Fibonacci | Term = sum of prev 2 |
| Alternating | Odd/even positions differ |

> In NQT: if you can't find the pattern in 30 seconds, eliminate the obvious wrong options and move on. Time is the real constraint.
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

/*
 * APTITUDE: Number Series
 * ---------------------------------------------------
 * Given an arithmetic series (AP), find the next term.
 * Input: vector of terms forming an AP
 * Output: the next term
 *
 * Then find the nth term of a GP given first term, ratio, and n.
 */

int nextAP(vector<int>& series) {
    // TODO: Find the common difference and return the next term
    return 0;
}

long long nthGP(long long a, long long r, int n) {
    // TODO: Return nth term of GP: a × r^(n-1)
    return 0;
}

int main() {
    vector<int> ap1 = {2, 5, 8, 11, 14};
    vector<int> ap2 = {3, 7, 11, 15};
    cout << nextAP(ap1) << "\\n"; // 17
    cout << nextAP(ap2) << "\\n"; // 19
    cout << nthGP(3, 2, 5) << "\\n"; // 48  (3,6,12,24,48)
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

int nextAP(vector<int>& series) {
    int d = series[1] - series[0];
    return series.back() + d;
}

long long nthGP(long long a, long long r, int n) {
    return a * (long long)pow(r, n - 1);
}

int main() {
    vector<int> ap1 = {2, 5, 8, 11, 14};
    vector<int> ap2 = {3, 7, 11, 15};
    cout << nextAP(ap1) << "\\n";
    cout << nextAP(ap2) << "\\n";
    cout << nthGP(3, 2, 5) << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'nextAP({2,5,8,11,14})=17, nextAP({3,7,11,15})=19, nthGP(3,2,5)=48', expectedOutput: '17\n19\n48' },
  ],
  hints: [
    'AP: common difference d = series[1] - series[0]. Next term = last + d.',
    'GP: nth term = a × r^(n-1). Use pow() or a loop.',
    'Always check series[1] - series[0] == series[2] - series[1] to confirm it\'s AP.',
  ],
  complexity: { time: 'O(1) for AP, O(n) for GP with loop', space: 'O(1)' },
  tags: ['aptitude', 'number-series', 'patterns', 'logical-reasoning', 'tcs'],
};
export default lesson;
