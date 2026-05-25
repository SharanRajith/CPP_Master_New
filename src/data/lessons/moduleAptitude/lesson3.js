const lesson = {
  id: 'apt-l3',
  title: 'Time & Work',
  module: 'aptitude',
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Time & Work

Appears in every service company aptitude test. TCS NQT and Infosys frequently combine this with pipes & cisterns.

---

## Core Formula

\`\`\`
If A completes work in N days → A's 1-day work = 1/N

If A does 1/a and B does 1/b work per day:
  Together per day = 1/a + 1/b
  Together finish  = 1 / (1/a + 1/b) = ab/(a+b) days
\`\`\`

---

## Key Shortcuts

### Three people working together
\`\`\`
1/A + 1/B + 1/C = 1/T  →  T = 1 / (1/A + 1/B + 1/C)
\`\`\`

### LCM method (fastest for NQT)
Assume total work = LCM of all days given.
Convert to units of work per day.

Example: A finishes in 6 days, B in 4 days.
- LCM(6,4) = 12 units total work
- A does 12/6 = 2 units/day, B does 12/4 = 3 units/day
- Together = 5 units/day → finish in 12/5 = **2.4 days**

### Work done in X days, remainder by B
\`\`\`
Work left after X days by A = 1 - X/A
Time for B to finish remainder = (1 - X/A) × B
\`\`\`

### Pipes & Cisterns
\`\`\`
Inlet fills  in A hours → rate = +1/A
Outlet drains in B hours → rate = -1/B
Net rate = 1/A - 1/B
Time to fill = 1 / (1/A - 1/B) = AB/(B-A)   (if B > A)
\`\`\`

---

## Solved Examples

**Q1.** A takes 12 days, B takes 8 days. Together?
\`\`\`
LCM(12,8) = 24
A = 2 units/day, B = 3 units/day
Together = 5 units/day → 24/5 = 4.8 days
\`\`\`

**Q2.** A and B together finish in 6 days. A alone in 10 days. B alone?
\`\`\`
1/B = 1/6 - 1/10 = 5/30 - 3/30 = 2/30 = 1/15
B alone = 15 days
\`\`\`

**Q3.** A works 3 days then leaves. B finishes rest in 8 days. A alone = 6 days. B alone?
\`\`\`
Work done by A in 3 days = 3/6 = 1/2
Remaining = 1/2
B does 1/2 work in 8 days → B does full work in 16 days
\`\`\`

**Q4.** Pipe A fills in 6h, pipe B drains in 8h. Both open. Fill time?
\`\`\`
Net rate = 1/6 - 1/8 = 4/24 - 3/24 = 1/24
Time = 24 hours
\`\`\`

---

## NQT Pattern

| Question Type | Method |
|---|---|
| A and B together | LCM method or ab/(a+b) |
| Find one person's days | 1/T = 1/A + 1/B → solve for unknown |
| A works X days, B finishes | Find remainder × B's days |
| Pipes fill/drain | Same as time & work with +/- signs |
| Efficiency ratio | Faster worker does more — set up ratio |

> **LCM method beats fractions every time in NQT.** Set total work = LCM and work in whole numbers.
`,
  starterCode: `#include <iostream>
using namespace std;

/*
 * APTITUDE: Time & Work
 * ---------------------------------------------------
 * Implement:
 * 1. togetherDays(a, b) — days A and B take working together
 * 2. pipesFillTime(fillHours, drainHours) — hours to fill tank
 *    with one inlet pipe and one outlet pipe both open
 */

double togetherDays(double a, double b) {
    // TODO: Return days when A (takes a days) and B (takes b days) work together
    return 0;
}

double pipesFillTime(double fillHours, double drainHours) {
    // TODO: Return hours to fill the tank with both pipes open
    // Inlet: +1/fillHours per hour, Outlet: -1/drainHours per hour
    return 0;
}

int main() {
    cout << togetherDays(12, 8)      << "\\n"; // 4.8
    cout << togetherDays(10, 15)     << "\\n"; // 6
    cout << pipesFillTime(6, 8)      << "\\n"; // 24
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

double togetherDays(double a, double b) {
    return (a * b) / (a + b);
}

double pipesFillTime(double fillHours, double drainHours) {
    double netRate = 1.0 / fillHours - 1.0 / drainHours;
    return 1.0 / netRate;
}

int main() {
    cout << togetherDays(12, 8)      << "\\n";
    cout << togetherDays(10, 15)     << "\\n";
    cout << pipesFillTime(6, 8)      << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'togetherDays(12,8)=4.8, togetherDays(10,15)=6, pipesFillTime(6,8)=24', expectedOutput: '4.8\n6\n24' },
  ],
  hints: [
    'Together formula: (a × b) / (a + b). This is the harmonic mean of the two times.',
    'Pipes: net rate = 1/fill - 1/drain. Time = 1/net_rate.',
    'If drain rate > fill rate, the tank never fills (net rate is negative).',
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['aptitude', 'time-work', 'pipes-cisterns', 'infosys', 'tcs'],
};
export default lesson;
