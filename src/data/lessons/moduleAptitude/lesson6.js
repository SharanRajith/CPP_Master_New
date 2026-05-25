const lesson = {
  id: 'apt-l6',
  title: 'Probability',
  module: 'aptitude',
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Probability

Probability appears in TCS NQT (2–3 questions), Wipro, and Cognizant aptitude sections. Combined with P&C for harder questions.

---

## Core Formula

\`\`\`
P(Event) = Favorable outcomes / Total outcomes

0 ≤ P(E) ≤ 1
P(E) + P(E') = 1     [E' = complement, "not E"]
\`\`\`

---

## Key Rules

### Addition Rule
\`\`\`
P(A or B)  = P(A) + P(B) - P(A and B)
P(A or B)  = P(A) + P(B)    [if A and B are mutually exclusive]
\`\`\`

### Multiplication Rule
\`\`\`
P(A and B) = P(A) × P(B)              [if A, B are independent]
P(A and B) = P(A) × P(B|A)            [conditional]
\`\`\`

### Complement Shortcut
\`\`\`
P(at least one) = 1 - P(none)
\`\`\`
Always use this when "at least one" is asked — much faster than adding cases.

---

## Standard Sample Spaces

\`\`\`
Coin:   {H, T}                → 2 outcomes
2 Coins: {HH, HT, TH, TT}    → 4 outcomes
Die:    {1,2,3,4,5,6}         → 6 outcomes
2 Dice: 6×6 = 36 outcomes
Cards:  52 total
  → 4 suits × 13 cards
  → 26 red (13♥ + 13♦), 26 black (13♠ + 13♣)
  → 4 aces, 4 kings, 12 face cards (J,Q,K × 4 suits)
\`\`\`

---

## Solved Examples

**Q1.** A die is rolled. P(even number)?
\`\`\`
Favorable: {2,4,6} = 3
Total: 6
P = 3/6 = 1/2
\`\`\`

**Q2.** Two dice rolled. P(sum = 7)?
\`\`\`
Pairs: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 pairs
Total = 36
P = 6/36 = 1/6
\`\`\`

**Q3.** Card drawn from 52. P(King or Red)?
\`\`\`
P(King) = 4/52,  P(Red) = 26/52,  P(Red King) = 2/52
P(King or Red) = 4/52 + 26/52 - 2/52 = 28/52 = 7/13
\`\`\`

**Q4.** Bag has 3 red, 4 blue balls. Two drawn without replacement. P(both red)?
\`\`\`
P(1st red) = 3/7
P(2nd red | 1st red) = 2/6 = 1/3
P(both red) = 3/7 × 1/3 = 1/7
\`\`\`

**Q5.** P(at least one head in 3 coin tosses)?
\`\`\`
P(no heads) = P(TTT) = 1/8
P(at least one head) = 1 - 1/8 = 7/8
\`\`\`

---

## NQT Pattern

| Type | Key Approach |
|---|---|
| Dice sum | Count pairs manually or formula |
| Card problems | Know 52-card breakdown |
| Balls from bag | With/without replacement matters |
| At least one | Use complement: 1 - P(none) |
| Independent events | Multiply probabilities |

> **At least one trap:** Students add individual cases manually and waste 3 minutes. Always use 1 - P(none) instead.
`,
  starterCode: `#include <iostream>
using namespace std;

/*
 * APTITUDE: Probability
 * ---------------------------------------------------
 * Implement:
 * 1. probDiceSum(target) — probability that two dice sum to target
 * 2. probAtLeastOneHead(n) — probability of at least one head in n coin tosses
 *
 * Use complement rule for Q2: P(at least one) = 1 - P(none)
 */

double probDiceSum(int target) {
    // TODO: Count pairs (i,j) where i+j == target, divide by 36
    return 0;
}

double probAtLeastOneHead(int n) {
    // TODO: Use complement: 1 - P(all tails)
    // P(all tails in n tosses) = (1/2)^n
    return 0;
}

int main() {
    cout << probDiceSum(7)          << "\\n"; // 0.166667  (1/6)
    cout << probDiceSum(2)          << "\\n"; // 0.027778  (1/36)
    cout << probAtLeastOneHead(3)   << "\\n"; // 0.875     (7/8)
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <cmath>
using namespace std;

double probDiceSum(int target) {
    int count = 0;
    for (int i = 1; i <= 6; i++)
        for (int j = 1; j <= 6; j++)
            if (i + j == target) count++;
    return (double)count / 36.0;
}

double probAtLeastOneHead(int n) {
    return 1.0 - pow(0.5, n);
}

int main() {
    cout << probDiceSum(7)          << "\\n";
    cout << probDiceSum(2)          << "\\n";
    cout << probAtLeastOneHead(3)   << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'probDiceSum(7)≈0.166667, probDiceSum(2)≈0.027778, probAtLeastOneHead(3)=0.875', expectedOutput: '0.166667\n0.0277778\n0.875' },
  ],
  hints: [
    'diceSum: loop i from 1-6, j from 1-6, count pairs where i+j == target. Divide by 36.',
    'atLeastOneHead: complement = 1 - P(all tails) = 1 - (0.5)^n.',
    'pow(0.5, n) gives (1/2)^n.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['aptitude', 'probability', 'tcs', 'wipro', 'cognizant'],
};
export default lesson;
