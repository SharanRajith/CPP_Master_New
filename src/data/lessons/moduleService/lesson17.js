const lesson = {
  id: 'msvc-l17',
  title: 'TCS Interview Process — Complete Breakdown',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 9,   title: 'Palindrome Number',             url: 'https://leetcode.com/problems/palindrome-number/',             difficulty: 'Easy' },
    { id: 412, title: 'Fizz Buzz',                     url: 'https://leetcode.com/problems/fizz-buzz/',                     difficulty: 'Easy' },
    { id: 1,   title: 'Two Sum',                       url: 'https://leetcode.com/problems/two-sum/',                       difficulty: 'Easy' },
  ],
  content: `# TCS Interview Process — Complete Breakdown

TCS hires through two tracks: **TCS NQT** (National Qualifier Test) and **TCS CodeVita** (coding competition). Here is exactly what happens at each stage.

---

## Track 1 — TCS NQT (Mass Hiring)

### Round 1: NQT Online Test (~3 hours)

| Section | Questions | Time | Topics |
|---|---|---|---|
| Cognitive Skills | 30 | 50 min | Verbal, logical, numerical aptitude |
| Programming Logic | 10 | 15 min | Flowcharts, output prediction |
| Coding | 2 | 60 min | Easy–Medium DSA (arrays, strings, math) |
| Advanced Coding *(optional)* | 1–2 | 20 min | Unlocks higher package (NQT with Higher Studies) |

**What they look for in coding:**
- The solution must pass all test cases — partial marks are given per test case
- Common topics: prime check, palindrome, Fibonacci, pattern printing, array operations
- Language: C, C++, Java, Python allowed

---

### Round 2: Technical Interview (TR)

Face-to-face or video call with a TCS engineer.

**Commonly asked:**
- Explain your final year project in detail
- 1–2 DSA problems (linked list, sorting, searching)
- OOPs concepts: inheritance, polymorphism, encapsulation — with C++ examples
- Difference between stack and queue, array vs linked list
- OS basics: process vs thread, deadlock
- DBMS basics: joins, normalization, primary vs foreign key
- 1 scenario question: "How would you design X using a data structure?"

**Tip:** They do NOT expect LeetCode Hard. They want you to explain your approach clearly.

---

### Round 3: Managerial Round (MR)

Not always held — depends on the role.

**Commonly asked:**
- Situational: "Tell me about a time you handled a conflict in your team."
- "Why TCS over other companies?"
- Brief technical recap from TR
- Project discussion continued

---

### Round 4: HR Round

- Salary discussion (NQT package is fixed: ₹3.36 LPA for NQT, ₹7 LPA for NQT with Higher Studies)
- Relocation preference
- Background verification consent
- "Are you comfortable with any domain/technology TCS assigns?"

---

## Track 2 — TCS CodeVita (Coding Competition → Direct Hire)

- **Pre-qualifier + Final round** — 3–6 hard algorithmic problems
- Top performers get direct offer or fast-track technical interview
- Package: higher than NQT (up to ₹7–15 LPA depending on rank)
- Topics: graphs, DP, number theory, combinatorics, geometry

---

## TCS NQT Coding — What Actually Gets Asked

\`\`\`
Round 1 Coding Examples:
• Print Fibonacci series up to N
• Check if a number is Armstrong
• Find second largest element in array
• Count vowels and consonants in a string
• Reverse a linked list
• Check balanced parentheses
\`\`\`

---

## TCS Preparation Checklist

- [ ] Aptitude: 30 min/day on verbal + logical + numerical (IndiaBix, TCS iON mock)
- [ ] Coding: 2 easy problems/day — array, string, math, recursion
- [ ] OOPs: write one example each for inheritance, polymorphism, abstraction
- [ ] DBMS: practice 5 SQL queries — joins, GROUP BY, subqueries
- [ ] Project: prepare a 2-minute verbal explanation of your project
- [ ] HR: prepare answers for "Tell me about yourself", "Why TCS?", "Strengths/Weaknesses"

---

## Package Structure (2024–25)

| Track | CTC |
|---|---|
| TCS NQT (Ninja) | ₹3.36 LPA |
| TCS NQT (Digital / Higher Studies) | ₹7 LPA |
| TCS CodeVita Top Ranks | ₹14.5–15+ LPA |

> The Technical round is the deciding factor. Most rejections happen here. Focus on clear explanation over perfect code.
`,
  starterCode: `#include <iostream>
using namespace std;

/*
 * TCS NQT Round 1 — Typical Coding Question
 * ---------------------------------------------------
 * SCENARIO: Given a number N, print all Armstrong numbers
 * from 1 to N.
 *
 * An Armstrong number = sum of its digits each raised to
 * the power of (number of digits).
 * Example: 153 = 1³ + 5³ + 3³ = 153  ✓
 *          371 = 3³ + 7³ + 1³ = 371  ✓
 *
 * This is a real TCS NQT question type.
 */

bool isArmstrong(int n) {
    // TODO: Return true if n is an Armstrong number
    return false;
}

int main() {
    int N = 500;
    for (int i = 1; i <= N; i++)
        if (isArmstrong(i)) cout << i << " ";
    cout << "\\n";
    // Expected: 1 2 3 4 5 6 7 8 9 153 370 371 407
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
#include <cmath>
using namespace std;

bool isArmstrong(int n) {
    int digits = to_string(n).size();
    int temp = n, sum = 0;
    while (temp > 0) {
        int d = temp % 10;
        sum += pow(d, digits);
        temp /= 10;
    }
    return sum == n;
}

int main() {
    int N = 500;
    for (int i = 1; i <= N; i++)
        if (isArmstrong(i)) cout << i << " ";
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'Print all Armstrong numbers from 1 to 500', expectedOutput: '1 2 3 4 5 6 7 8 9 153 370 371 407 ' },
  ],
  hints: [
    'Count the number of digits first: digits = to_string(n).size().',
    'Extract each digit with n % 10, raise it to power "digits", add to sum.',
    'If sum == original number, it\'s Armstrong.',
  ],
  complexity: { time: 'O(d) per number where d = digits', space: 'O(1)' },
  tags: ['tcs', 'nqt', 'interview-process', 'armstrong', 'prep'],
};
export default lesson;
