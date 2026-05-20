const lesson = {
  id: 'm13-l11',
  title: 'Meta: Find All Anagrams in a String',
  module: 13,
  lessonNumber: 11,
  xpReward: 25,
  leetcodeProblems: [
    { id: 438, title: 'Find All Anagrams in a String', url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', difficulty: 'Medium' },
  ],
  content: `# Meta: Find All Anagrams in a String

**LeetCode #438** — Find All Anagrams is a sliding window classic. Meta asks it because it sits at the intersection of string processing, hash maps, and the sliding window pattern — a combination that appears constantly in content moderation, search, and NLP pipelines.

## Why Sliding Window + Frequency Count?

Two strings are anagrams of each other if and only if they have **identical character frequency counts**. A brute-force approach generates every substring of length \`p.length()\` and sorts/compares it — $O(n \cdot k \log k)$.

The sliding window insight: **instead of recomputing the frequency of each window from scratch, slide the window one character at a time**. Add the new right character, remove the old left character. The window always has \`p.length()\` characters in $O(1)$ per step.

## The \`matches\` Counter Trick

Comparing two frequency maps of 26 characters each at every step is $O(26)$ per step — acceptable but avoidable. The elegant optimization uses a \`matches\` counter tracking how many of the 26 characters currently have equal frequency in the window and in \`p\`.

\`\`\`
p = "abc"   pCount = {a:1, b:1, c:1}
s = "cbaebacd"

Window [c,b,a]: wCount={a:1,b:1,c:1} → matches=26 → anagram! push index 0
Slide:  remove c, add e  → wCount={a:1,b:1,e:1} → matches=24
Slide:  remove b, add b  → wCount={a:1,b:1,e:1}... (no change, b removed and added)
Window [e,b,a]: not anagram
...
Window [b,a,c]: anagram! push index 6
\`\`\`

## Full Implementation Breakdown

1. Build \`pCount[26]\` and \`wCount[26]\` frequency arrays from the first window.
2. Initialize \`matches\` = number of characters where \`pCount[c] == wCount[c]\`.
3. Slide from index \`p.size()\` to \`s.size()-1\`:
   - **Add** \`s[r]\`: update wCount, adjust matches (+1 if now equal, -1 if was equal before).
   - **Remove** \`s[l]\`: update wCount, adjust matches (+1 if now equal, -1 if was equal before). Advance \`l\`.
   - If \`matches == 26\`: record start index \`l\`.
4. Check the last window separately.

\`\`\`cpp
// Adjusting matches when adding character c:
if (wCount[c] == pCount[c]) matches++;
else if (wCount[c] - 1 == pCount[c]) matches--;
\`\`\`

## Why Meta Uses This

Facebook's content search must identify semantically similar strings (permutations of keywords) across billions of posts in near real-time. The sliding window is the building block for stream processing with constant-time updates — a key principle in reactive systems.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> findAnagrams(string s, string p) {
    vector<int> result;
    if (s.size() < p.size()) return result;
    // TODO: build pCount[26] and wCount[26] from p and first window of s
    // TODO: count initial matches (how many of 26 chars have equal frequency)
    // TODO: if matches==26, push index 0
    // TODO: slide window: for r from p.size() to s.size()-1:
    //   add s[r] to wCount, adjust matches
    //   remove s[r - p.size()] from wCount, adjust matches
    //   if matches==26, push (r - p.size() + 1)
    return result;
}

int main() {
    vector<int> res = findAnagrams("cbaebacd", "abc");
    for (int i = 0; i < (int)res.size(); i++) {
        cout << res[i];
        if (i + 1 < (int)res.size()) cout << " ";
    }
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> findAnagrams(string s, string p) {
    vector<int> result;
    if (s.size() < p.size()) return result;
    int pCount[26] = {}, wCount[26] = {};
    for (char c : p) pCount[c - 'a']++;
    for (int i = 0; i < (int)p.size(); i++) wCount[s[i] - 'a']++;
    int matches = 0;
    for (int i = 0; i < 26; i++)
        if (pCount[i] == wCount[i]) matches++;
    if (matches == 26) result.push_back(0);
    for (int r = (int)p.size(); r < (int)s.size(); r++) {
        int add = s[r] - 'a';
        wCount[add]++;
        if (wCount[add] == pCount[add]) matches++;
        else if (wCount[add] - 1 == pCount[add]) matches--;
        int rem = s[r - (int)p.size()] - 'a';
        wCount[rem]--;
        if (wCount[rem] == pCount[rem]) matches++;
        else if (wCount[rem] + 1 == pCount[rem]) matches--;
        if (matches == 26) result.push_back(r - (int)p.size() + 1);
    }
    return result;
}

int main() {
    vector<int> res = findAnagrams("cbaebacd", "abc");
    for (int i = 0; i < (int)res.size(); i++) {
        cout << res[i];
        if (i + 1 < (int)res.size()) cout << " ";
    }
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '0 6', description: '"cbaebacd" contains anagrams of "abc" at indices 0 and 6' },
  ],
  hints: [
    'Two strings are anagrams if their character frequency counts are identical. You don\'t need to sort — just compare 26-element arrays.',
    'Instead of rebuilding the window\'s frequency from scratch each step, slide it: add the new right character, remove the leftmost character.',
    'Track a "matches" counter for how many of the 26 characters currently have equal frequency. When matches==26, you have an anagram. Update matches in O(1) when sliding.',
  ],
  complexity: { time: 'O(n)', space: 'O(1)', notes: 'Fixed 26-char frequency arrays; linear scan with O(1) per slide step' },
  tags: ['sliding-window', 'hash-map', 'string', 'meta'],
};
export default lesson;
