const lesson = {
  id: 'apt-l7',
  title: 'Data Interpretation',
  module: 'aptitude',
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Data Interpretation (DI)

DI is **Infosys's most heavily tested section** — typically 10–15 questions from one or two data sets. Wipro and Cognizant also include it. The math is simple; the challenge is reading tables/charts quickly and accurately.

---

## Types of DI Questions

### 1. Table DI
A table with rows (categories) and columns (years/quarters).
Questions ask for: totals, % change, ratio, difference.

**Example Table:**
| Year | Sales (₹ Cr) | Expenses (₹ Cr) |
|---|---|---|
| 2020 | 120 | 80 |
| 2021 | 150 | 90 |
| 2022 | 180 | 100 |

Q: % increase in sales from 2020 to 2022?
\`\`\`
= (180 - 120) / 120 × 100 = 50%
\`\`\`

Q: Profit in 2021?
\`\`\`
= 150 - 90 = ₹60 Cr
\`\`\`

---

### 2. Bar Graph DI
Same questions, data shown as bars. Read values carefully — look at the Y-axis scale.

---

### 3. Pie Chart DI
Data shown as % of a whole (total = 360° or 100%).

**Example:** Total revenue = ₹500 Cr.
Product A = 30%, Product B = 20%, Product C = 50%.

Q: Revenue from Product A?
\`\`\`
= 30% × 500 = ₹150 Cr
\`\`\`

Q: Ratio of A to B?
\`\`\`
= 30% : 20% = 3 : 2
\`\`\`

---

## Key Calculations in DI

### % Change
\`\`\`
% change = (New - Old) / Old × 100
\`\`\`

### Ratio
\`\`\`
A : B = value of A / value of B   (simplify using GCD)
\`\`\`

### Average
\`\`\`
Average = Sum of all values / Count
\`\`\`

### % of Total (Pie Chart)
\`\`\`
Value = (Sector %) / 100 × Total
\`\`\`

---

## Speed Techniques for NQT

**Approximation:** In DI you rarely need exact answers. Use approximation.
\`\`\`
183/62 ≈ 180/60 = 3   (close enough for MCQ)
\`\`\`

**Ratio shortcut:** Compare directly using ratios without computing actual values.
\`\`\`
Which is greater: 125/320 or 130/340?
Cross multiply: 125×340 = 42500,  130×320 = 41600
→ 125/320 is greater
\`\`\`

**% Change shortcut:** When values are close, use mental math.
\`\`\`
40 → 46: increase = 6/40 = 15%
\`\`\`

---

## Solved DI Set

**Data:** Number of students in 5 departments.
| Dept | 2022 | 2023 |
|---|---|---|
| CS | 200 | 240 |
| IT | 150 | 180 |
| EC | 180 | 162 |
| ME | 120 | 132 |
| CE | 100 | 110 |

**Q1.** Total students in 2023?
\`\`\`
240+180+162+132+110 = 824
\`\`\`

**Q2.** Which dept had highest % growth?
\`\`\`
CS: (240-200)/200 = 20%
IT: (180-150)/150 = 20%
ME: (132-120)/120 = 10%
→ CS and IT tied at 20%
\`\`\`

**Q3.** EC had a decrease. % decrease?
\`\`\`
(180-162)/180 × 100 = 10%
\`\`\`

---

## DI Checklist for Infosys

- [ ] Read the question BEFORE reading all the data — find what you need
- [ ] Note the units (Cr, thousands, %) — don't mix them
- [ ] For % change: always use the OLD value as denominator
- [ ] Approximate freely — options are usually far apart enough
- [ ] Time per DI question: max 45 seconds

> Infosys DI sets have 5 questions on one table. Read the table ONCE, answer all 5. Don't re-read the table for each question.
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

/*
 * APTITUDE: Data Interpretation
 * ---------------------------------------------------
 * Given sales data for multiple years, compute:
 * 1. totalSales(data) — total across all years
 * 2. percentChange(oldVal, newVal) — % increase or decrease
 * 3. maxGrowthIndex(data) — index of year with highest % growth
 *    (compare each year to the previous year)
 */

double percentChange(double oldVal, double newVal) {
    // TODO: Return % change from oldVal to newVal
    return 0;
}

double totalSales(vector<double>& data) {
    // TODO: Return sum of all values
    return 0;
}

int maxGrowthIndex(vector<double>& data) {
    // TODO: Return index (1-based) of the year with highest % growth
    // Compare data[i] to data[i-1] for each i starting from 1
    return 0;
}

int main() {
    vector<double> sales = {120, 150, 180, 160, 200};
    cout << totalSales(sales)       << "\\n"; // 810
    cout << percentChange(120, 150) << "\\n"; // 25
    cout << maxGrowthIndex(sales)   << "\\n"; // 2 (150 from 120 = 25% growth)
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

double percentChange(double oldVal, double newVal) {
    return (newVal - oldVal) / oldVal * 100.0;
}

double totalSales(vector<double>& data) {
    double sum = 0;
    for (double d : data) sum += d;
    return sum;
}

int maxGrowthIndex(vector<double>& data) {
    int best = 1;
    double bestPct = percentChange(data[0], data[1]);
    for (int i = 2; i < (int)data.size(); i++) {
        double pct = percentChange(data[i-1], data[i]);
        if (pct > bestPct) { bestPct = pct; best = i; }
    }
    return best;
}

int main() {
    vector<double> sales = {120, 150, 180, 160, 200};
    cout << totalSales(sales)       << "\\n";
    cout << percentChange(120, 150) << "\\n";
    cout << maxGrowthIndex(sales)   << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'totalSales=810, percentChange(120,150)=25, maxGrowthIndex=2', expectedOutput: '810\n25\n2' },
  ],
  hints: [
    'percentChange: (newVal - oldVal) / oldVal × 100. Negative means decrease.',
    'totalSales: simple loop summing all elements.',
    'maxGrowthIndex: track the index where percentChange(data[i-1], data[i]) is maximum.',
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['aptitude', 'data-interpretation', 'infosys', 'wipro'],
};
export default lesson;
