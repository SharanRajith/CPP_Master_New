const lesson = {
  id: 'apt-l1',
  title: 'Percentages & Profit-Loss',
  module: 'aptitude',
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Percentages & Profit-Loss

This topic appears in **every** service company online test — TCS NQT, Infosys, Wipro NLTH, and Cognizant. Usually 3–5 questions.

---

## Core Formulas

### Percentage
\`\`\`
Percentage = (Value / Total) × 100

x% of y = (x × y) / 100

% increase = ((New - Old) / Old) × 100
% decrease = ((Old - New) / Old) × 100
\`\`\`

### Profit & Loss
\`\`\`
Profit     = Selling Price (SP) - Cost Price (CP)
Loss       = Cost Price (CP) - Selling Price (SP)
Profit %   = (Profit / CP) × 100
Loss %     = (Loss / CP) × 100

SP = CP × (1 + Profit% / 100)    [when profit]
SP = CP × (1 - Loss% / 100)      [when loss]
CP = SP × 100 / (100 + Profit%)  [find CP from SP]
\`\`\`

---

## Shortcut Tricks

### Successive % change
If a value changes by x% then y%:
\`\`\`
Net change = x + y + (x × y) / 100
\`\`\`
Example: 20% increase then 10% decrease
= 20 + (-10) + (20 × -10)/100 = 10 - 2 = **8% net increase**

### Marked Price & Discount
\`\`\`
Discount %  = (Marked Price - SP) / Marked Price × 100
SP          = MP × (1 - Discount% / 100)
\`\`\`

### Dishonest Shopkeeper
Uses faulty weight of w grams instead of 1000g:
\`\`\`
Profit % = (1000 - w) / w × 100
\`\`\`

---

## Solved Examples

**Q1.** A shirt costs ₹400, sold for ₹500. Profit %?
\`\`\`
Profit = 500 - 400 = 100
Profit % = (100/400) × 100 = 25%
\`\`\`

**Q2.** After 10% discount, price is ₹900. Marked price?
\`\`\`
SP = MP × 0.9 → 900 = MP × 0.9 → MP = 1000
\`\`\`

**Q3.** Population increases 10% then decreases 10%. Net change?
\`\`\`
Net = 10 + (-10) + (10 × -10)/100 = 0 - 1 = -1% (net decrease)
\`\`\`

**Q4.** CP = ₹200, SP = ₹180. Loss %?
\`\`\`
Loss = 200 - 180 = 20
Loss % = (20/200) × 100 = 10%
\`\`\`

---

## NQT Pattern — Common Question Types

| Type | Frequency | Key Formula |
|---|---|---|
| Find Profit % | Very High | (Profit/CP) × 100 |
| Find SP given CP and % | High | SP = CP × (1 ± %/100) |
| Find CP given SP and % | High | CP = SP × 100/(100 ± %) |
| Successive discounts | Medium | Net = a + b + ab/100 |
| Faulty weight profit | Medium | (1000-w)/w × 100 |

> **TCS NQT tip:** Always work with CP as the base for profit/loss percentages — never SP. This is the most common mistake.
`,
  starterCode: `#include <iostream>
using namespace std;

/*
 * APTITUDE: Percentages & Profit-Loss
 * ---------------------------------------------------
 * Write functions to calculate:
 * 1. profitPercent(cp, sp) — profit percentage
 * 2. sellingPrice(cp, profitPct) — SP when CP and profit% are known
 *
 * These are the two most asked calculations in NQT aptitude rounds.
 */

double profitPercent(double cp, double sp) {
    // TODO: Return profit % if sp > cp, else return negative (loss %)
    return 0;
}

double sellingPrice(double cp, double profitPct) {
    // TODO: Return SP given CP and profit percentage
    // If profitPct is negative, it means loss
    return 0;
}

int main() {
    cout << profitPercent(400, 500)   << "\\n"; // 25   (25% profit)
    cout << profitPercent(200, 180)   << "\\n"; // -10  (10% loss)
    cout << sellingPrice(300, 20)     << "\\n"; // 360  (20% profit)
    cout << sellingPrice(500, -10)    << "\\n"; // 450  (10% loss)
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

double profitPercent(double cp, double sp) {
    return ((sp - cp) / cp) * 100;
}

double sellingPrice(double cp, double profitPct) {
    return cp * (1 + profitPct / 100.0);
}

int main() {
    cout << profitPercent(400, 500)   << "\\n";
    cout << profitPercent(200, 180)   << "\\n";
    cout << sellingPrice(300, 20)     << "\\n";
    cout << sellingPrice(500, -10)    << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'profitPercent(400,500)=25, profitPercent(200,180)=-10, sellingPrice(300,20)=360, sellingPrice(500,-10)=450', expectedOutput: '25\n-10\n360\n450' },
  ],
  hints: [
    'profitPercent: ((SP - CP) / CP) × 100. If result is negative, it\'s a loss.',
    'sellingPrice: CP × (1 + profitPct/100). Works for both profit (positive) and loss (negative).',
    'Always divide by CP, not SP, for profit/loss percentage.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['aptitude', 'percentage', 'profit-loss', 'tcs', 'infosys', 'wipro'],
};
export default lesson;
