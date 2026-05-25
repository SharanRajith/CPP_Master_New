const lesson = {
  id: 'apt-l8',
  title: 'Logical Reasoning & Coding-Decoding',
  module: 'aptitude',
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Logical Reasoning & Coding-Decoding

Logical reasoning is tested in **all service company aptitude sections**. Coding-decoding, blood relations, and syllogisms are the highest frequency sub-topics.

---

## 1. Coding-Decoding

A word is coded using a fixed rule. Find the rule, apply it to the new word.

### Type 1 — Letter Shift
\`\`\`
If CAT = FDW, find rule:
C→F (+3), A→D (+3), T→W (+3)
Rule: shift each letter +3

So DOG = GRJ  (D+3=G, O+3=R, G+3=J)
\`\`\`

### Type 2 — Reverse Alphabet (A=Z, B=Y, C=X ...)
\`\`\`
Position from start + position from end = 27
A(1)↔Z(26), B(2)↔Y(25), C(3)↔X(24)...

If HELP is coded as SVOK:
H(8)→S(19): 8+19=27 ✓  (mirror coding)
\`\`\`

### Type 3 — Substitution
\`\`\`
If TABLE = GZYOV, find mapping:
T→G, A→Z, B→Y, O→V... each letter mapped to its mirror

Apply same map to new word.
\`\`\`

### Type 4 — Position Swap / Rearrangement
\`\`\`
If BOARD = OARDB, rule is: last letter moves to front
BREAD → READB
\`\`\`

---

## 2. Blood Relations

Draw a family tree. Assign symbols: M = male, F = female.

### Key Relations Cheat Sheet
\`\`\`
Father's/Mother's father = Grandfather
Father's/Mother's mother = Grandmother
Father's brother         = Uncle
Father's sister          = Aunt
Uncle's/Aunt's child     = Cousin
Sibling's child          = Nephew (M) / Niece (F)
Spouse's father          = Father-in-law
\`\`\`

### Solved Example
> "A is B's father. C is A's sister. D is C's mother. E is B's brother. How is D related to E?"

Step by step:
\`\`\`
A = B's father → A(M), B is child of A
C = A's sister → C(F) is A's sibling
D = C's mother → D(F) is mother of C and A (grandparent of B)
E = B's brother → E is also child of A
D is A's mother → D is E's grandmother
\`\`\`

---

## 3. Syllogisms

Two statements → draw a Venn diagram → pick valid conclusion.

### Rules
\`\`\`
"All A are B"     → A circle fully inside B circle
"No A is B"       → A and B circles don't overlap
"Some A are B"    → A and B circles partially overlap
"Some A are not B"→ Part of A is outside B
\`\`\`

### Solved Example
> Statement 1: All dogs are animals.
> Statement 2: Some animals are cats.
> Conclusion I: Some cats are dogs.
> Conclusion II: Some animals are dogs.

\`\`\`
All dogs ⊆ animals → Conclusion II is valid (all dogs = some animals)
Some animals = cats — these could be non-dog animals → I is not certain
Answer: Only Conclusion II follows
\`\`\`

---

## 4. Direction & Distance

\`\`\`
Start at origin. Track movements.
North/South affect Y. East/West affect X.

N=+Y, S=-Y, E=+X, W=-X

Distance = √(X² + Y²) (if asked for straight-line distance)
\`\`\`

**Example:**
> Walk 5km North, 3km East, 5km South. Final position?
\`\`\`
Y: +5 - 5 = 0,  X: +3
Position = (3, 0) → 3km East of start
\`\`\`

---

## NQT Pattern

| Topic | Questions | Key Skill |
|---|---|---|
| Coding-Decoding | 3–5 | Find rule fast, apply |
| Blood Relations | 2–3 | Draw tree step by step |
| Syllogisms | 2–4 | Draw Venn diagram |
| Direction-Distance | 2–3 | Track X/Y coordinates |

> For coding-decoding: the #1 skill is finding the rule in under 20 seconds. Check shift (+/-), mirror, and swap — in that order.
`,
  starterCode: `#include <iostream>
#include <string>
using namespace std;

/*
 * APTITUDE: Logical Reasoning — Coding-Decoding
 * ---------------------------------------------------
 * Two common coding schemes used in NQT:
 *
 * 1. shiftCode(word, shift) — shift each letter by 'shift' positions
 *    Example: shiftCode("CAT", 3) = "FDW"
 *
 * 2. mirrorCode(word) — replace each letter with its mirror (A↔Z, B↔Y, ...)
 *    Example: mirrorCode("CAT") = "XZG"
 */

string shiftCode(string word, int shift) {
    // TODO: Shift each letter forward by 'shift' positions (wrap around Z→A)
    return "";
}

string mirrorCode(string word) {
    // TODO: Replace each letter with its mirror: A↔Z, B↔Y, C↔X...
    // Mirror of letter at position p (1-indexed) = letter at position 27-p
    return "";
}

int main() {
    cout << shiftCode("CAT", 3)   << "\\n"; // FDW
    cout << shiftCode("XYZ", 3)   << "\\n"; // ABC (wraps around)
    cout << mirrorCode("CAT")     << "\\n"; // XZG
    cout << mirrorCode("HELP")    << "\\n"; // SVOK
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
using namespace std;

string shiftCode(string word, int shift) {
    for (char& c : word)
        c = 'A' + (c - 'A' + shift) % 26;
    return word;
}

string mirrorCode(string word) {
    for (char& c : word)
        c = 'A' + (25 - (c - 'A'));
    return word;
}

int main() {
    cout << shiftCode("CAT", 3)   << "\\n";
    cout << shiftCode("XYZ", 3)   << "\\n";
    cout << mirrorCode("CAT")     << "\\n";
    cout << mirrorCode("HELP")    << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'shiftCode CAT+3=FDW, XYZ+3=ABC, mirrorCode CAT=XZG, HELP=SVOK', expectedOutput: 'FDW\nABC\nXZG\nSVOK' },
  ],
  hints: [
    'shiftCode: c = \'A\' + (c - \'A\' + shift) % 26. The % 26 handles wrap-around.',
    'mirrorCode: mirror of position p is position 27-p. In 0-indexed: 25 - (c - \'A\').',
    'Both work only on uppercase letters in this implementation.',
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['aptitude', 'logical-reasoning', 'coding-decoding', 'tcs', 'infosys'],
};
export default lesson;
