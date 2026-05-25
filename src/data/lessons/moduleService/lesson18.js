const lesson = {
  id: 'msvc-l18',
  title: 'Infosys Interview Process — Complete Breakdown',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 206, title: 'Reverse Linked List',           url: 'https://leetcode.com/problems/reverse-linked-list/',           difficulty: 'Easy'   },
    { id: 344, title: 'Reverse String',                url: 'https://leetcode.com/problems/reverse-string/',                difficulty: 'Easy'   },
    { id: 21,  title: 'Merge Two Sorted Lists',        url: 'https://leetcode.com/problems/merge-two-sorted-lists/',        difficulty: 'Easy'   },
  ],
  content: `# Infosys Interview Process — Complete Breakdown

Infosys hires freshers through **Hackwithinfy** (online coding) and **InfyTQ** (certification-based). There are three job roles with different selection processes.

---

## The Three Infosys Tracks

| Track | Role | Package | How to Get |
|---|---|---|---|
| Systems Engineer (SE) | General IT | ₹3.6 LPA | InfyTQ certification or campus drive |
| Specialist Programmer (SP) | Dev/coding role | ₹9 LPA | Hackwithinfy — top performers |
| Power Programmer (PP) | Advanced dev | ₹11 LPA | Hackwithinfy — top rank only |

---

## Track 1 — Campus Drive / InfyTQ (SE Role)

### Round 1: Online Test (~2.5 hours)

| Section | Questions | Topics |
|---|---|---|
| Aptitude | 30 | Arithmetic, logical reasoning, data interpretation |
| Verbal | 20 | Reading comprehension, grammar |
| Pseudocode | 5 | Predict output from flowcharts |
| Coding | 2 | Easy problems — strings, arrays, basic math |

**Coding level:** Easier than TCS NQT. Focus on correct output, not optimization.

---

### Round 2: Technical Interview (TR)

**Commonly asked:**
- C++ / Java fundamentals: pointers, references, OOPs pillars
- Data structures: arrays, linked lists, stacks — "explain with diagram"
- 1 coding question: reverse a string, check palindrome, find duplicates
- DBMS: what is a primary key, difference between DELETE and TRUNCATE
- Final year project: explain architecture, what problem it solves
- Scenario question: "If you had to store student records efficiently, what would you use and why?"

**What they look for:**
- Communication — explain your thought process
- Basic fundamentals, not advanced algorithms

---

### Round 3: HR Round

- "Tell me about yourself" (prepare a 60-second answer)
- "Why Infosys?" — mention Infosys's scale, training (Mysore campus), global presence
- Relocation: Infosys can post you anywhere — must say yes
- Bond: 1-year service agreement (no bond for laterals)
- Salary negotiation: package is fixed for freshers

---

## Track 2 — Hackwithinfy (SP / PP Roles)

### Round 1: Online Coding Test (3 hours)

- 3 coding problems
- SP level: Medium–Hard DSA (graphs, DP, trees)
- PP level: Hard–Very Hard (advanced DP, segment trees, competitive programming level)

### Round 2: Technical Interview (SP/PP)

- Deep dive into your Hackwithinfy solutions — "Walk me through your approach"
- 2–3 additional DSA problems on the spot
- System design basics (SP): "How would you design a URL shortener?"
- Strong focus on time/space complexity analysis

---

## Infosys Technical Interview — Most Asked Topics

\`\`\`
DSA:
  • Reverse a linked list
  • Check if a string is palindrome
  • Find middle of linked list
  • Binary search implementation

OOPs (C++ / Java):
  • 4 pillars with code examples
  • Virtual functions, abstract classes
  • Constructor vs destructor

DBMS:
  • Joins (inner, left, right)
  • Normalization up to 3NF
  • Write a SQL query for given problem

OS:
  • Process vs Thread
  • Paging vs Segmentation
  • Deadlock conditions (Coffman's)
\`\`\`

---

## Infosys Preparation Checklist

- [ ] Complete InfyTQ free courses + get certification (direct shortlist for campus)
- [ ] Aptitude: focus on data interpretation — Infosys gives DI heavily
- [ ] Practice 2 medium DSA problems daily for SP track
- [ ] Prepare SQL: 10 standard queries (joins, subqueries, GROUP BY)
- [ ] OOPs: write code for each of the 4 pillars in your preferred language
- [ ] Project: prepare system architecture diagram + 3-minute explanation
- [ ] Practice "scenario → data structure" mapping for technical round

---

## Key Difference from TCS

| | TCS NQT | Infosys Campus |
|---|---|---|
| Coding difficulty | Easy–Medium | Easy |
| Aptitude weight | Medium | High |
| Technical depth | Moderate | Basic fundamentals |
| Scenario questions | MR round | Technical round |

> Infosys rejects more people in the aptitude round than the technical round. Don't underestimate the verbal and data interpretation sections.
`,
  starterCode: `#include <iostream>
using namespace std;

/*
 * Infosys Technical Interview — Most Common Coding Question
 * ---------------------------------------------------
 * SCENARIO: Reverse a linked list.
 * This appears in almost every Infosys technical interview.
 *
 * Given: 1 -> 2 -> 3 -> 4 -> 5
 * Output: 5 -> 4 -> 3 -> 2 -> 1
 *
 * Data Structure: Singly Linked List
 * Approach: Three-pointer iterative reversal
 */

struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

Node* reverse(Node* head) {
    // TODO: Reverse the linked list and return new head
    return nullptr;
}

void print(Node* head) {
    while (head) { cout << head->data; if (head->next) cout << " -> "; head = head->next; }
    cout << "\\n";
}

int main() {
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);
    head->next->next->next = new Node(4);
    head->next->next->next->next = new Node(5);
    head = reverse(head);
    print(head); // 5 -> 4 -> 3 -> 2 -> 1
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

Node* reverse(Node* head) {
    Node* prev = nullptr;
    Node* curr = head;
    while (curr) {
        Node* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

void print(Node* head) {
    while (head) { cout << head->data; if (head->next) cout << " -> "; head = head->next; }
    cout << "\\n";
}

int main() {
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);
    head->next->next->next = new Node(4);
    head->next->next->next->next = new Node(5);
    head = reverse(head);
    print(head);
    return 0;
}`,
  testCases: [
    { description: 'Reverse 1->2->3->4->5 gives 5->4->3->2->1', expectedOutput: '5 -> 4 -> 3 -> 2 -> 1' },
  ],
  hints: [
    'Use three pointers: prev (nullptr), curr (head), next.',
    'In each step: save next = curr->next, point curr->next = prev, move prev = curr, move curr = next.',
    'When curr is null, prev is the new head.',
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['infosys', 'interview-process', 'linked-list', 'prep'],
};
export default lesson;
