const lesson = {
  id: 'm8-l10',
  title: 'Reorganize String',
  module: 8,
  lessonNumber: 10,
  xpReward: 15,
  leetcodeProblems: [
    { id: 767, title: 'Reorganize String', url: 'https://leetcode.com/problems/reorganize-string/', difficulty: 'Medium' },
  ],
  content: `# Reorganize String

Given a string \`s\`, rearrange its characters so that no two **adjacent** characters are the same. Return any valid rearrangement, or an empty string \`""\` if it is impossible.

## When is it Impossible?

A rearrangement is impossible when one character appears more than \`⌈N/2⌉\` times (where N is the string length). For example, \`"aaab"\` has A appearing 3 times in a 4-character string — it cannot be rearranged without two A's being adjacent.

\`\`\`
Impossible: "aaab"  → A appears 3 > ceil(4/2) = 2 times
Possible:   "aab"   → A appears 2 = ceil(3/2) = 2 times → "aba"
Possible:   "aabb"  → A appears 2 = ceil(4/2) = 2 times → "abab"
\`\`\`

## Greedy Strategy with Max-Heap

**Key Insight:** At each position, greedily place the **most frequent** remaining character, as long as it is not the same as the character we just placed.

A **max-heap ordered by frequency** always gives us the most frequent available character in O(log N).

### Algorithm

\`\`\`
1. Count character frequencies.
2. Push all {frequency, char} pairs into a max-heap.
3. prev = {0, '#'}   ← dummy "previous character" placeholder
4. While heap is not empty:
   a. Pop the most frequent character: cur = heap.top(); heap.pop()
   b. Append cur.char to result.
   c. Decrement cur.freq.
   d. Push prev back onto heap (if prev.freq > 0).
   e. prev = cur
5. Return result (length == s.length() → success, else return "").
\`\`\`

The trick of "pushing the previous character back" ensures we never place the same character in two consecutive positions. We hold the previous character out for one step, then re-insert it.

## Step-by-Step Trace: "aab"

\`\`\`
freq: a=2, b=1
heap: [(2,'a'), (1,'b')]    ← max-heap (max freq at top)
prev: (0, '#')
result: ""

Step 1: pop (2,'a'), result="a", dec→(1,'a'), push prev=(0,'#')? no (freq=0). prev=(1,'a')
        heap: [(1,'b')]

Step 2: pop (1,'b'), result="ab", dec→(0,'b'), push prev=(1,'a'). prev=(0,'b')
        heap: [(1,'a')]

Step 3: pop (1,'a'), result="aba", dec→(0,'a'), push prev=(0,'b')? no. prev=(0,'a')
        heap: []

Done. result="aba", length 3 == s.length() 3. Return "aba" ✓
\`\`\`

## Trace: "aabb"

\`\`\`
freq: a=2, b=2
heap: [(2,'b'), (2,'a')]   ← tie-broken by char value; 'b' > 'a' in ASCII
prev: (0,'#')
result: ""

Step 1: pop (2,'b'), result="b", prev=(1,'b'). heap: [(2,'a')]
Step 2: pop (2,'a'), result="ba", push (1,'b'). prev=(1,'a'). heap: [(1,'b')]
Step 3: pop (1,'b'), result="bab", push (1,'a'). prev=(0,'b'). heap: [(1,'a')]
Step 4: pop (1,'a'), result="baba", push nothing (freq=0). prev=(0,'a'). heap: []

Return "baba" ✓   (any valid arrangement is accepted)
\`\`\`

## Impossible Case: "aaab"

\`\`\`
freq: a=3, b=1
heap: [(3,'a'), (1,'b')]

Step 1: pop (3,'a'), result="a", prev=(2,'a'). heap: [(1,'b')]
Step 2: pop (1,'b'), result="ab", push (2,'a'). prev=(0,'b'). heap: [(2,'a')]
Step 3: pop (2,'a'), result="aba", prev=(1,'a'). heap: []
Step 4: heap empty. Push prev=(1,'a') back? We check: result.length()=3 < s.length()=4
        → return ""
\`\`\`

## Implementation

\`\`\`cpp
string reorganizeString(const string& s) {
    int freq[26] = {};
    for (char c : s) freq[c - 'a']++;

    // Max-heap: {frequency, character}
    priority_queue<pair<int,char>> pq;
    for (int i = 0; i < 26; i++)
        if (freq[i] > 0) pq.push({freq[i], 'a' + i});

    string result;
    pair<int,char> prev = {0, '#'};

    while (!pq.empty()) {
        auto [f, c] = pq.top(); pq.pop();
        result += c;
        if (prev.first > 0) pq.push(prev);
        prev = {f - 1, c};
    }
    // Re-insert any leftover previous character
    if (prev.first > 0) result += prev.second;

    return (result.size() == s.size()) ? result : "";
}
\`\`\`

Wait — the last \`if (prev.first > 0) result += prev.second\` handles the case where the heap runs out but we still have one character held back. Let's verify with "aab": after step 3 the heap is empty but prev=(0,'a') so freq=0 and nothing is appended. Correct.

## Simplified check for impossibility

An equivalent and early check:
\`\`\`cpp
int maxFreq = *max_element(freq, freq + 26);
if (maxFreq > (s.size() + 1) / 2) return "";
\`\`\`
This can short-circuit before the heap simulation.

## Complexity

| | |
|---|---|
| Time | O(N log 26) = O(N log N) since alphabet is fixed |
| Space | O(1) — heap has at most 26 entries, result string O(N) |
`,
  starterCode: `#include <iostream>
#include <queue>
#include <string>
using namespace std;

string reorganizeString(const string& s) {
    int freq[26] = {};
    for (char c : s) freq[c - 'a']++;

    // Max-heap: {frequency, character}
    priority_queue<pair<int,char>> pq;
    for (int i = 0; i < 26; i++)
        if (freq[i] > 0) pq.push({freq[i], 'a' + i});

    string result;
    pair<int,char> prev = {0, '#'};   // "held back" character from last step

    while (!pq.empty()) {
        // TODO: pop the most frequent character
        // TODO: append it to result
        // TODO: push prev back onto the heap if its freq > 0
        // TODO: update prev = {popped_freq - 1, popped_char}
    }
    // TODO: if prev still has remaining count, append it once more
    // Return result if its length equals s.length(), otherwise ""
    return "";
}

int main() {
    string s; cin >> s;
    cout << reorganizeString(s) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <queue>
#include <string>
using namespace std;

string reorganizeString(const string& s) {
    int freq[26] = {};
    for (char c : s) freq[c - 'a']++;

    priority_queue<pair<int,char>> pq;
    for (int i = 0; i < 26; i++)
        if (freq[i] > 0) pq.push({freq[i], 'a' + i});

    string result;
    pair<int,char> prev = {0, '#'};

    while (!pq.empty()) {
        auto [f, c] = pq.top(); pq.pop();
        result += c;
        if (prev.first > 0) pq.push(prev);
        prev = {f - 1, c};
    }
    if (prev.first > 0) result += prev.second;

    return (result.size() == s.size()) ? result : "";
}

int main() {
    string s; cin >> s;
    cout << reorganizeString(s) << "\\n";
    return 0;
}`,
  testCases: [
    { input: 'aab',  expectedOutput: 'aba',  description: 'a=2,b=1 — one valid arrangement: aba.' },
    { input: 'aaab', expectedOutput: '',     description: 'a=3 > ceil(4/2)=2 — impossible, return empty string.' },
    { input: 'aabb', expectedOutput: 'baba', description: 'a=2,b=2 — valid arrangement: baba (or abab).' },
  ],
  hints: [
    'Count character frequencies. If any character appears more than `ceil(N/2)` times, return `""` immediately — it\'s impossible.',
    'Use a max-heap of `{frequency, char}` pairs. Always pick the most frequent character that is NOT the same as the one you just placed.',
    'The "hold back one step" trick: after placing a character, don\'t push it back immediately. Save it as `prev`. On the next iteration, push `prev` back (if its count > 0) before popping the next character. This ensures two consecutive placements are always different.',
  ],
  complexity: { time: 'O(N log N)', space: 'O(1)', notes: 'The heap has at most 26 entries (fixed alphabet), so heap ops are O(log 26) = O(1). Overall O(N).' },
  tags: ['heap', 'greedy', 'string', 'medium', 'priority-queue'],
};
export default lesson;
