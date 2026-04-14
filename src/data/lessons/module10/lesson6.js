const lesson = {
  id: 'm10-l6',
  title: 'Longest Common Subsequence (LCS)',
  module: 10,
  lessonNumber: 6,
  xpReward: 20,
  leetcodeProblems: [
    { id: 1143, title: 'Longest Common Subsequence', url: 'https://leetcode.com/problems/longest-common-subsequence/', difficulty: 'Medium' },
    { id: 72,   title: 'Edit Distance',              url: 'https://leetcode.com/problems/edit-distance/',              difficulty: 'Hard' },
  ],
  content: `# Longest Common Subsequence

The **LCS** pattern encompasses problems where you have TWO strings and you need to compare them to find commonalities, edit distances, or alignments.

A **subsequence** is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.
For example, "ace" is a subsequence of "abcde".

## The 2D DP State
Let \`text1\` have length $M$ and \`text2\` have length $N$.
Let $DP[i][j]$ be the length of the LCS of the prefix \`text1[0...i-1]\` and \`text2[0...j-1]\`.

We construct a 2D matrix of size $(M+1) \\times (N+1)$ initialized to $0$.

**The Core Logic:**
If we look at the characters \`text1[i-1]\` and \`text2[j-1]\`:
1. **If they match:** The characters are part of the LCS! We add 1 to the result of the sequences *without* these characters.
   $$DP[i][j] = 1 + DP[i-1][j-1]$$
   *(Look up-and-left in the matrix)*
2. **If they DON'T match:** The LCS is the maximum of ignoring the character from \`text1\` OR ignoring the character from \`text2\`.
   $$DP[i][j] = \\max(DP[i-1][j], \\; DP[i][j-1])$$
   *(Look up and left in the matrix)*

\`\`\`cpp
int longestCommonSubsequence(string text1, string text2) {
    int m = text1.size(), n = text2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    // We use 1-based indexing for the DP to easily represent empty string prefixes
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i-1] == text2[j-1]) {
                dp[i][j] = 1 + dp[i-1][j-1];
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[m][n];
}
\`\`\`

> Many Hard problems like "Edit Distance" or "Regular Expression Matching" use this exact same 2D matrix loop, they just change the transition equations inside an ` + "`" + `if/else` + "`" + ` block!
`,
  starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int longestCommonSubsequence(string text1, string text2) {
    int m = text1.size();
    int n = text2.size();
    
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    // TODO: Loop i from 1 to m
    // TODO: Loop j from 1 to n
    // if text1[i-1] == text2[j-1], dp[i][j] = 1 + dp[i-1][j-1]
    // else dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n];
}

int main() {
    string t1, t2; 
    cin >> t1 >> t2;
    
    cout << longestCommonSubsequence(t1, t2) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int longestCommonSubsequence(string text1, string text2) {
    int m = text1.size();
    int n = text2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i-1] == text2[j-1]) {
                dp[i][j] = 1 + dp[i-1][j-1];
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}

int main() {
    string t1, t2; 
    cin >> t1 >> t2;
    cout << longestCommonSubsequence(t1, t2) << "\\n";
    return 0;
}`,
  testCases: [
    { input: 'abcde\nace', expectedOutput: '3', description: 'LCS is "ace", length 3.' },
    { input: 'abc\nabc',   expectedOutput: '3', description: 'Identical strings.' },
    { input: 'abc\ndef',   expectedOutput: '0', description: 'No common subsequence.' },
  ],
  hints: [
    'The loops start at 1 to handle the base cases (strings of length 0) naturally! The array elements are already cleanly initialized to 0.',
    'Remember to compare `text1[i-1]` against `text2[j-1]` since the string itself is 0-indexed.',
  ],
  complexity: { time: 'O(M * N)', space: 'O(M * N) for the matrix. Can be optimized to O(N) by saving only previous row' },
  tags: ['dp', '2d-dp', 'lcs', 'strings'],
};
export default lesson;
