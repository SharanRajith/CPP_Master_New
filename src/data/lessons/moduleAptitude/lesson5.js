const lesson = {
  id: 'apt-l5',
  title: 'Permutations & Combinations',
  module: 'aptitude',
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Permutations & Combinations

P&C appears in TCS NQT (3–5 questions), Cognizant, and Infosys. Mastering the formulas and when to apply them is the full battle.

---

## Core Formulas

\`\`\`
n! = n × (n-1) × (n-2) × ... × 1

nPr = n! / (n-r)!          (Permutation — ORDER matters)
nCr = n! / (r! × (n-r)!)  (Combination — ORDER doesn't matter)

nCr = nC(n-r)              (useful shortcut)
nC0 = nCn = 1
nC1 = n
\`\`\`

---

## When to Use What

| Situation | Use |
|---|---|
| Arrange r items from n | nPr |
| Select r items from n (no order) | nCr |
| Arrange all n items | n! |
| Circular arrangement | (n-1)! |
| Items with repetition | n^r |
| Identical items in arrangement | n! / (p! × q! × ...) |

---

## Key Shortcuts & Rules

### Circular Permutation
\`\`\`
n people around a table = (n-1)!
Necklace/garland (can flip) = (n-1)! / 2
\`\`\`

### Selection with at least / at most
\`\`\`
At least 1 = Total - (none selected) = 2ⁿ - 1
At most k  = C(n,0) + C(n,1) + ... + C(n,k)
\`\`\`

### Division into groups
\`\`\`
n items into groups of a, b, c (a+b+c=n):
= n! / (a! × b! × c!)
\`\`\`

---

## Solved Examples

**Q1.** How many 3-digit numbers from {1,2,3,4,5} with no repetition?
\`\`\`
5P3 = 5! / (5-3)! = 5×4×3 = 60
\`\`\`

**Q2.** Choose 3 from 7 students for a team?
\`\`\`
7C3 = 7! / (3! × 4!) = (7×6×5) / (3×2×1) = 35
\`\`\`

**Q3.** 5 people sit around a circular table. Arrangements?
\`\`\`
(5-1)! = 4! = 24
\`\`\`

**Q4.** Word MISSISSIPPI — how many arrangements?
\`\`\`
Total letters = 11
M=1, I=4, S=4, P=2
= 11! / (1! × 4! × 4! × 2!) = 34650
\`\`\`

**Q5.** From 6 men and 4 women, select 3 men and 2 women?
\`\`\`
6C3 × 4C2 = 20 × 6 = 120
\`\`\`

---

## NQT Pattern

| Type | Frequency | Formula |
|---|---|---|
| Arrange letters of a word | High | n! / (repetitions!) |
| Select team with conditions | High | nCr × mCs |
| Circular seating | Medium | (n-1)! |
| At least one selected | Medium | 2ⁿ - 1 |
| 3/4-digit numbers, no repeat | High | nPr |

> **TCS NQT tip:** Always check whether order matters. "Arrange" → Permutation. "Select/Choose/Committee" → Combination.
`,
  starterCode: `#include <iostream>
using namespace std;

/*
 * APTITUDE: Permutations & Combinations
 * ---------------------------------------------------
 * Implement:
 * 1. factorial(n) — n!
 * 2. nPr(n, r)   — permutation (ordered selection)
 * 3. nCr(n, r)   — combination (unordered selection)
 */

long long factorial(int n) {
    // TODO: Return n!
    return 0;
}

long long nPr(int n, int r) {
    // TODO: Return nPr = n! / (n-r)!
    return 0;
}

long long nCr(int n, int r) {
    // TODO: Return nCr = n! / (r! × (n-r)!)
    return 0;
}

int main() {
    cout << nPr(5, 3) << "\\n"; // 60
    cout << nCr(7, 3) << "\\n"; // 35
    cout << nCr(6, 3) * nCr(4, 2) << "\\n"; // 120
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

long long nPr(int n, int r) {
    return factorial(n) / factorial(n - r);
}

long long nCr(int n, int r) {
    return factorial(n) / (factorial(r) * factorial(n - r));
}

int main() {
    cout << nPr(5, 3) << "\\n";
    cout << nCr(7, 3) << "\\n";
    cout << nCr(6, 3) * nCr(4, 2) << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'nPr(5,3)=60, nCr(7,3)=35, nCr(6,3)*nCr(4,2)=120', expectedOutput: '60\n35\n120' },
  ],
  hints: [
    'factorial: base case n<=1 returns 1. Recursive: n * factorial(n-1).',
    'nPr = factorial(n) / factorial(n-r).',
    'nCr = factorial(n) / (factorial(r) * factorial(n-r)).',
  ],
  complexity: { time: 'O(N)', space: 'O(N) recursive stack' },
  tags: ['aptitude', 'permutation', 'combination', 'tcs', 'cognizant'],
};
export default lesson;
