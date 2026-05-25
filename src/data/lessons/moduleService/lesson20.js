const lesson = {
  id: 'msvc-l20',
  title: 'Cognizant Interview Process — Complete Breakdown',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 200, title: 'Number of Islands',             url: 'https://leetcode.com/problems/number-of-islands/',             difficulty: 'Medium' },
    { id: 70,  title: 'Climbing Stairs',               url: 'https://leetcode.com/problems/climbing-stairs/',               difficulty: 'Easy'   },
    { id: 104, title: 'Maximum Depth of Binary Tree',  url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy'   },
  ],
  content: `# Cognizant Interview Process — Complete Breakdown

Cognizant hires freshers through **GenC** (General Category) and **GenC Elevate** (elevated package) tracks. The selection process is well-structured and among the most transparent of service companies.

---

## Cognizant Hiring Tracks

| Track | Role | Package | Selection |
|---|---|---|---|
| GenC | Programmer Analyst Trainee | ₹4 LPA | Online test + 2 interviews |
| GenC Elevate | Programmer Analyst | ₹8 LPA | Online test (harder) + 2 interviews |
| GenC Next | Full-stack / Niche | ₹12+ LPA | Competitive coding + system design |

---

## Round 1: Online Assessment (~2.5 hours)

### GenC Section Breakdown

| Section | Questions | Time | Topics |
|---|---|---|---|
| Cognizant Specific Aptitude | 25 | 35 min | Arithmetic, logical, puzzles |
| English Language & Communication | 25 | 25 min | Grammar, vocabulary, comprehension |
| Coding | 2 | 45 min | Easy–Medium DSA |

### GenC Elevate Additional Sections

| Section | Questions | Time |
|---|---|---|
| Advanced DSA Coding | 1–2 extra | 45 min |
| Logical & Quantitative (harder) | 15 | 20 min |

**GenC coding:** Strings, arrays, basic sorting, simple patterns
**GenC Elevate coding:** Graphs (BFS/DFS), DP basics, trees

---

## Round 2: Technical Interview (TR)

**Commonly asked for GenC:**
- OOPs: 4 pillars with real-world analogy + code
- Data structures: array vs linked list, stack vs queue — when to use which
- 1–2 simple coding problems (palindrome, factorial, Fibonacci)
- DBMS: what is a join, normalization up to 3NF
- Basic networking: what is HTTP, TCP vs UDP (for IT roles)
- Project discussion: explain what you built, the tech stack, and challenges

**Commonly asked for GenC Elevate:**
- Graph traversal: BFS/DFS implementation + explanation
- Dynamic programming: climbing stairs, coin change
- Scenario-based: "Design a notification system — what queue/structure would you use?"
- Tree problems: height, level order traversal
- System design basics: how does a web request work end-to-end?

**What interviewers note:**
- Can you explain your logic step-by-step before coding?
- Do you know time/space complexity of your solution?

---

## Round 3: HR Round

- "Tell me about yourself" (1 minute structured answer)
- "Why Cognizant?" — mention CTS's focus on digital modernization, good work-life culture
- Flexibility for relocation and shift timing
- "What do you know about Cognizant's business?" — mention BFS, healthcare IT, retail segments
- Service agreement: 1 year for GenC

---

## Cognizant Technical Interview — Most Asked by Topic

\`\`\`
DSA (GenC):
  • Fibonacci — recursive and iterative
  • Reverse a string
  • Check palindrome
  • Find factorial
  • Bubble sort / Selection sort

DSA (GenC Elevate):
  • BFS and DFS on a graph
  • Number of Islands
  • Climbing Stairs (DP)
  • Binary tree height
  • Detect cycle in linked list

OOPs:
  • Write a class with inheritance in C++ / Java
  • Explain method overloading vs overriding
  • What is an abstract class vs interface?

DBMS:
  • Write SQL for: find employees earning > average salary
  • Explain ACID properties
  • What is a deadlock in DB transactions?
\`\`\`

---

## Cognizant Preparation Checklist

- [ ] Aptitude: focus on puzzles and Cognizant-specific pattern — practice CTS mock tests
- [ ] English: Cognizant's verbal section is harder than TCS/Wipro — read 1 article daily
- [ ] GenC coding: revise strings, arrays, basic recursion thoroughly
- [ ] GenC Elevate coding: practice BFS, DFS, simple DP (top 15 problems)
- [ ] OOPs: code all 4 pillars in C++ with output, be ready to explain each
- [ ] DBMS: 3 SQL queries minimum — subquery, join, aggregate function
- [ ] Project: prepare architecture + what you would improve next

---

## All Four Companies — One-Line Summary

| Company | What Decides Offer | Key Differentiator |
|---|---|---|
| TCS | Technical round | OOPs + project explanation |
| Infosys | Aptitude + TR | Data interpretation + fundamentals |
| Wipro | Written comm + TR | Essay + scenario reasoning |
| Cognizant | TR for Elevate | BFS/DFS/DP + explanation clarity |

> For all four companies: the candidate who explains their thinking clearly beats the one who just writes correct code silently.
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

/*
 * Cognizant GenC Elevate — Common Coding Question
 * ---------------------------------------------------
 * SCENARIO: You're building a staircase game.
 * A player can climb 1 or 2 steps at a time.
 * How many distinct ways can they reach step N?
 *
 * Example: N=4
 *   (1+1+1+1), (1+1+2), (1+2+1), (2+1+1), (2+2) → 5 ways
 *
 * This is essentially Fibonacci DP.
 * Appears frequently in Cognizant GenC Elevate interviews.
 */

int climbStairs(int n) {
    // TODO: Return number of distinct ways to climb n stairs
    // taking 1 or 2 steps at a time
    return 0;
}

int main() {
    cout << climbStairs(4) << "\\n"; // 5
    cout << climbStairs(5) << "\\n"; // 8
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}

int main() {
    cout << climbStairs(4) << "\\n";
    cout << climbStairs(5) << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'climbStairs(4)=5, climbStairs(5)=8', expectedOutput: '5\n8' },
  ],
  hints: [
    'ways(n) = ways(n-1) + ways(n-2) — same as Fibonacci.',
    'Base cases: ways(1) = 1, ways(2) = 2.',
    'Use two variables instead of an array to keep space O(1).',
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['cognizant', 'genc-elevate', 'interview-process', 'dp', 'prep'],
};
export default lesson;
