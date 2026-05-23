const lesson = {
  id: 'm12-l10',
  title: 'Longest Consecutive Sequence',
  module: 12,
  lessonNumber: 10,
  xpReward: 10,
  leetcodeProblems: [{ id: 128, title: 'Longest Consecutive Sequence', difficulty: 'Medium' }],
  content: `# Longest Consecutive Sequence

## Problem

Given an unsorted array of integers, find the length of the **longest consecutive elements sequence**.

The algorithm must run in **O(n)** time.

**Example**:
\`\`\`
Input:  [100, 4, 200, 1, 3, 2]
Output: 4    (sequence 1, 2, 3, 4)

Input:  [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
Output: 9    (sequence 0..8)
\`\`\`

---

## Key Insight — Hash Set

1. Insert all numbers into an **unordered_set** (O(1) lookup).
2. For each number \`n\`, only start a sequence if \`n-1\` is **not** in the set (i.e., \`n\` is the start of a streak).
3. From that start, count consecutive numbers \`n, n+1, n+2, …\` while they exist in the set.

Because each number is the start of at most one streak, the total work across all streaks is O(n).

---

## Worked Trace

Array: [100, 4, 200, 1, 3, 2]
Set:   {100, 4, 200, 1, 3, 2}

| Start? | n   | Streak |
|--------|-----|--------|
| 100-1=99 ∉ set → start | 100 | length 1 |
| 4-1=3 ∈ set → skip | — | — |
| 200-1=199 ∉ set → start | 200 | length 1 |
| 1-1=0 ∉ set → start | 1 → 2 → 3 → 4 | length **4** |
| 3-1=2 ∈ set → skip | — | — |
| 2-1=1 ∈ set → skip | — | — |

Longest = **4**

---

## Complexity

| | |
|---|---|
| Time | O(n) — each element visited at most twice |
| Space | O(n) — the hash set |
`,
  starterCode: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

int longestConsecutive(vector<int>& nums) {
    // TODO: implement
    return 0;
}

int main() {
    vector<int> a = {100, 4, 200, 1, 3, 2};
    cout << longestConsecutive(a) << endl;   // 4

    vector<int> b = {0, 3, 7, 2, 5, 8, 4, 6, 0, 1};
    cout << longestConsecutive(b) << endl;   // 9

    vector<int> c = {};
    cout << longestConsecutive(c) << endl;   // 0

    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

int longestConsecutive(vector<int>& nums) {
    unordered_set<int> s(nums.begin(), nums.end());
    int best = 0;
    for (int n : s) {
        if (s.count(n - 1)) continue;   // not the start of a streak
        int len = 1;
        while (s.count(n + len)) len++;
        best = max(best, len);
    }
    return best;
}

int main() {
    vector<int> a = {100, 4, 200, 1, 3, 2};
    cout << longestConsecutive(a) << endl;

    vector<int> b = {0, 3, 7, 2, 5, 8, 4, 6, 0, 1};
    cout << longestConsecutive(b) << endl;

    vector<int> c = {};
    cout << longestConsecutive(c) << endl;

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '4\n9\n0',
      description: '[100,4,200,1,3,2]→4, [0..8 mixed]→9, []→0',
    },
  ],
  hints: [
    'Insert all numbers into an unordered_set for O(1) lookup.',
    'Only start counting a streak when n-1 is NOT in the set — this ensures you count each streak exactly once from its beginning.',
    'From the streak start, increment a counter while n+len exists in the set; update the global best.',
  ],
  complexity: { time: 'O(n)', space: 'O(n)', notes: 'Each element visited at most twice across all streaks' },
  tags: ['hash-set', 'array', 'greedy', 'sequence', 'unordered-set'],
};
export default lesson;
