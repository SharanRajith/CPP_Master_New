const lesson = {
  id: 'm13-l13',
  title: 'Microsoft: Word Break',
  module: 13,
  lessonNumber: 13,
  xpReward: 25,
  leetcodeProblems: [
    { id: 139, title: 'Word Break', url: 'https://leetcode.com/problems/word-break/', difficulty: 'Medium' },
  ],
  content: `# Microsoft: Word Break

**LeetCode #139** — Word Break is a quintessential DP problem that Microsoft returns to repeatedly because it mirrors real-world NLP tasks: tokenization, spell-checking, and autocorrect — all products Microsoft ships in Office and Bing.

## The Problem

Given a string \`s\` and a dictionary \`wordDict\`, determine if \`s\` can be segmented into a sequence of one or more dictionary words.

Example: \`s = "leetcode"\`, \`wordDict = ["leet","code"]\` → \`true\` ("leet" + "code")

## Why Plain Recursion Fails

A naive recursive approach tries every prefix: is \`s[0..i]\` a word? If yes, recurse on \`s[i+1..]\`. This creates exponential branching because the same suffixes are solved repeatedly. **Memoization or bottom-up DP** eliminates this.

## The DP Definition

Define \`dp[i] = true\` if the substring \`s[0..i-1]\` (first \`i\` characters) can be segmented using the dictionary.

Base case: \`dp[0] = true\` (empty string is always valid).

Recurrence:
\`\`\`
dp[i] = true  if there exists some j < i such that:
               dp[j] == true  AND  s[j..i-1] is in wordDict
\`\`\`

## Visualization for "leetcode"

\`\`\`
dp: [T, F, F, F, ?, F, F, F, ?]
       0  1  2  3  4  5  6  7  8

i=4: check j=0: dp[0]=T and s[0..3]="leet"∈dict → dp[4]=T
i=8: check j=4: dp[4]=T and s[4..7]="code"∈dict → dp[8]=T
Answer: dp[8] = true
\`\`\`

## Full Implementation Breakdown

1. Convert \`wordDict\` to an \`unordered_set\` for $O(1)$ lookups.
2. Create \`dp\` of size \`n+1\`, all \`false\`, set \`dp[0] = true\`.
3. For each end position \`i\` from 1 to \`n\`:
   - For each start position \`j\` from 0 to \`i-1\`:
     - If \`dp[j] == true\` AND \`s.substr(j, i-j)\` is in the set → set \`dp[i] = true\`, break inner loop.
4. Return \`dp[n]\`.

\`\`\`cpp
unordered_set<string> dict(wordDict.begin(), wordDict.end());
vector<bool> dp(n + 1, false);
dp[0] = true;
for (int i = 1; i <= n; i++)
    for (int j = 0; j < i; j++)
        if (dp[j] && dict.count(s.substr(j, i - j))) { dp[i] = true; break; }
\`\`\`

## Optimization: Limit Inner Loop to Max Word Length

If the longest word in the dictionary has length \`maxLen\`, you only need \`j\` from \`max(0, i-maxLen)\` to \`i-1\`. This significantly prunes the search for large strings with short dictionaries.

## Variant to Know

**Word Break II (LC #140)**: Return all valid segmentations as strings. Requires backtracking + memoization, since you can't break the inner loop early.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

bool wordBreak(string s, vector<string>& wordDict) {
    // TODO: put wordDict contents into an unordered_set for O(1) lookup
    // TODO: create dp vector of size s.size()+1, all false, set dp[0]=true
    // TODO: for i from 1 to s.size():
    //   for j from 0 to i-1:
    //     if dp[j] is true and s.substr(j, i-j) is in the set:
    //       set dp[i] = true and break
    // TODO: return dp[s.size()]
    return false;
}

int main() {
    vector<string> wordDict = {"leet", "code"};
    cout << (wordBreak("leetcode", wordDict) ? 1 : 0) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> dict(wordDict.begin(), wordDict.end());
    int n = s.size();
    vector<bool> dp(n + 1, false);
    dp[0] = true;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && dict.count(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n];
}

int main() {
    vector<string> wordDict = {"leet", "code"};
    cout << (wordBreak("leetcode", wordDict) ? 1 : 0) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '1', description: '"leetcode" can be segmented as "leet"+"code" → output 1 (true)' },
  ],
  hints: [
    'Recursion with no caching is exponential because the same suffix gets solved many times. Think about how DP can cache results.',
    'Define dp[i] = can the first i characters of s be segmented? The base case dp[0]=true (empty string).',
    'For each position i, scan backwards to find a split point j where dp[j] is true AND s[j..i-1] is a dictionary word. If found, dp[i]=true.',
  ],
  complexity: { time: 'O(n^2 * k)', space: 'O(n + m)', notes: 'n=string length, k=average word length for substr, m=dict size; unordered_set gives O(k) per lookup' },
  tags: ['dynamic-programming', 'string', 'hash-set', 'microsoft'],
};
export default lesson;
