const lesson = {
  id: 'msvc-l19',
  title: 'Wipro Interview Process — Complete Breakdown',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 53,  title: 'Maximum Subarray',              url: 'https://leetcode.com/problems/maximum-subarray/',              difficulty: 'Medium' },
    { id: 268, title: 'Missing Number',                url: 'https://leetcode.com/problems/missing-number/',                difficulty: 'Easy'   },
    { id: 283, title: 'Move Zeroes',                   url: 'https://leetcode.com/problems/move-zeroes/',                   difficulty: 'Easy'   },
  ],
  content: `# Wipro Interview Process — Complete Breakdown

Wipro hires freshers primarily through **NLTH** (National Level Talent Hunt) and campus drives. The process is structured and fairly predictable — good news for preparation.

---

## Wipro Hiring Tracks

| Track | Role | Package |
|---|---|---|
| WILP / NLTH | Project Engineer | ₹3.5 LPA |
| Wipro Elite | Senior Engineer | ₹6.5 LPA |
| Wipro Turbo | Tech roles | ₹10 LPA |

---

## Round 1: Online Test — NLTH / Elite (~2 hours)

| Section | Questions | Time | Topics |
|---|---|---|---|
| Aptitude | 20 | 25 min | Quant, logical, verbal |
| Written Communication | 1 essay | 20 min | Write 200–250 words on a given topic |
| Online Programming Test | 2 | 60 min | Arrays, strings, math, sorting |

**Key difference from TCS/Infosys:** Wipro's written communication test is unique. They check grammar, structure, and clarity — not just technical ability.

**Coding level (NLTH):** Easy to Medium. Kadane's algorithm, binary search, string reversal, missing number.

**Coding level (Elite):** Medium to Hard. Sliding window, trees, graphs.

---

## Round 2: Technical Interview (TR)

**Commonly asked:**
- Walk me through your code from the online test
- C++ / Java OOPs: polymorphism, inheritance with code
- Write a program on the spot: Find missing number in 1 to N, Move zeros to end
- Data structures: When would you use a stack over a queue?
- Scenario question: "You're designing a parking lot system — what data structures would you use?"
- DBMS: ER diagram, normalization, SQL query on the spot
- OS: Scheduling algorithms (FCFS, SJF, Round Robin) — explain with example

**What makes Wipro TR different:**
- They often ask you to explain trade-offs — "Why did you choose this approach over X?"
- Communication is weighted heavily alongside correctness

---

## Round 3: HR Round

- Introduce yourself (practiced answer — 60–90 seconds)
- "Why Wipro?" — mention Wipro's focus on sustainability, digital transformation, global reach
- Willing to relocate? (answer: yes, always)
- "Where do you see yourself in 5 years?"
- Background check consent
- For Elite track: brief discussion of expected package range

---

## Wipro Online Test — Typical Coding Questions

\`\`\`
NLTH Level:
  • Find the missing number in array [1..N]
  • Move all zeros to end of array
  • Maximum sum subarray (Kadane's)
  • Count frequency of each character
  • Check if two strings are anagrams

Elite Level:
  • Longest substring without repeating characters
  • Level order traversal of binary tree
  • Find kth largest element
  • Detect cycle in linked list
\`\`\`

---

## Wipro Written Communication Tips

The essay is 200–250 words on topics like:
- "Impact of AI on jobs"
- "Remote work: pros and cons"
- "Importance of soft skills in engineering"

**Structure:** Introduction (2–3 lines) → 2 body paragraphs → Conclusion. Avoid slang. Use transition words (Furthermore, However, In conclusion).

---

## Wipro Preparation Checklist

- [ ] Aptitude: quant (percentages, time-speed-distance, profit-loss) — 15 min/day
- [ ] Essay: practice writing 3 essays per week on current tech topics
- [ ] Coding: master Kadane's, binary search, two pointers, sliding window
- [ ] OOPs: inheritance and polymorphism with working code
- [ ] SQL: practice 5–8 queries (GROUP BY, HAVING, joins)
- [ ] Scenario prep: parking lot, elevator system, inventory tracker → pick right data structure
- [ ] HR prep: write down your "Why Wipro?" answer and practice saying it

---

## Wipro vs TCS vs Infosys — Quick Compare

| | Wipro NLTH | TCS NQT | Infosys Campus |
|---|---|---|---|
| Aptitude weight | Medium | High | Very High |
| Coding difficulty | Easy–Medium | Easy–Medium | Easy |
| Written test | Yes (essay) | No | No |
| Scenario questions | TR round | MR round | TR round |
| Package (base) | ₹3.5 LPA | ₹3.36 LPA | ₹3.6 LPA |

> Wipro is known for rejecting candidates in the written communication section. Treat it as seriously as the coding section.
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

/*
 * Wipro NLTH — Common Coding Question
 * ---------------------------------------------------
 * SCENARIO: You have an array of N integers containing
 * numbers from 1 to N with exactly one number missing.
 * Find the missing number.
 *
 * Example: {1, 2, 4, 5, 6}  N=6 → missing = 3
 *
 * Approach: Sum formula — sum of 1..N = N*(N+1)/2
 * Subtract actual array sum to get missing number.
 */

int missingNumber(vector<int>& arr, int n) {
    // TODO: Find and return the missing number from 1 to N
    return 0;
}

int main() {
    vector<int> arr = {1, 2, 4, 5, 6};
    cout << missingNumber(arr, 6) << "\\n"; // 3
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

int missingNumber(vector<int>& arr, int n) {
    int expected = n * (n + 1) / 2;
    int actual = 0;
    for (int x : arr) actual += x;
    return expected - actual;
}

int main() {
    vector<int> arr = {1, 2, 4, 5, 6};
    cout << missingNumber(arr, 6) << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'Missing number in {1,2,4,5,6} with N=6 is 3', expectedOutput: '3' },
  ],
  hints: [
    'Sum of first N natural numbers = N*(N+1)/2.',
    'Subtract the actual sum of the array from the expected sum.',
    'The difference is the missing number.',
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['wipro', 'nlth', 'interview-process', 'array', 'prep'],
};
export default lesson;
