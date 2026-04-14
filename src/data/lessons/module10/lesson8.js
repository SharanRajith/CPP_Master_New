const lesson = {
  id: 'm10-l8',
  title: 'Longest Palindromic Substring',
  module: 10,
  lessonNumber: 8,
  xpReward: 15,
  leetcodeProblems: [
    { id: 5, title: 'Longest Palindromic Substring', url: 'https://leetcode.com/problems/longest-palindromic-substring/', difficulty: 'Medium' },
    { id: 647, title: 'Palindromic Substrings',      url: 'https://leetcode.com/problems/palindromic-substrings/',       difficulty: 'Medium' },
  ],
  content: `# Longest Palindromic Substring

Given a string \`s\`, return the longest palindromic substring in \`s\`.

While there is a 2D DP solution for this, it takes $O(N^2)$ space and is often discouraged. There is an incredibly elegant and intuitive $O(N^2)$ time, $O(1)$ space solution called **Expand Around Center**.

## Expand Around Center
A palindrome mirrors around its center. 
- "racecar" mirrors around the 'e'. (Odd length, 1 center character).
- "abba" mirrors around the gap between the 'b's. (Even length, 2 center characters).

Wait... that means there are $2N - 1$ possible centers in a string!
(One at every character, and one between every pair of characters).

The algorithm:
1. Iterate through every possible center.
2. For each center, define a \`left\` and \`right\` pointer. Expand them outwards (\`left--\`, \`right++\`) as long as they stay within bounds AND the characters match!
3. Track the maximum length found and its starting index to extract the final substring.

\`\`\`cpp
string longestPalindrome(string s) {
    if (s.length() < 2) return s;
    int maxLen = 1, startIdx = 0;
    
    // Expand function
    auto expand = [&](int left, int right) {
        while (left >= 0 && right < s.length() && s[left] == s[right]) {
            int currentLen = right - left + 1;
            if (currentLen > maxLen) {
                maxLen = currentLen;
                startIdx = left;
            }
            left--;
            right++;
        }
    };
    
    for (int i = 0; i < s.length(); i++) {
        expand(i, i);     // Odd length palindromes (centered at char)
        expand(i, i + 1); // Even length palindromes (centered between chars)
    }
    
    return s.substr(startIdx, maxLen);
}
\`\`\`

> *Note:* There is an algorithmic beast called **Manacher's Algorithm** that solves this in $O(N)$ time. However, Expand Around Center is the standard expected answer for nearly all interviews!
`,
  starterCode: `#include <iostream>
#include <string>
using namespace std;

string longestPalindrome(string s) {
    if (s.length() < 2) return s;
    int maxLen = 1;
    int startIdx = 0;
    
    // We can use a C++ lambda to capture variables by reference
    auto expand = [&](int L, int R) {
        // TODO: Implement expansion loop
        // while L >= 0, R < s.length(), and chars match
        // if length > maxLen, update maxLen and startIdx
        // decrement L, increment R
    };
    
    for (int i = 0; i < s.length(); i++) {
        // TODO: Call expand for Odd length
        // TODO: Call expand for Even length
    }
    
    return s.substr(startIdx, maxLen);
}

int main() {
    string s; cin >> s;
    cout << longestPalindrome(s) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
using namespace std;

string longestPalindrome(string s) {
    if (s.length() < 2) return s;
    int maxLen = 1, startIdx = 0;
    
    auto expand = [&](int L, int R) {
        while (L >= 0 && R < s.length() && s[L] == s[R]) {
            int currentLen = R - L + 1;
            if (currentLen > maxLen) {
                maxLen = currentLen;
                startIdx = L;
            }
            L--;
            R++;
        }
    };
    
    for (int i = 0; i < s.length(); i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    
    return s.substr(startIdx, maxLen);
}

int main() {
    string s; cin >> s;
    cout << longestPalindrome(s) << "\\n";
    return 0;
}`,
  testCases: [
    { input: 'babad', expectedOutput: 'bab', description: 'Odd length palindrome in string. ("aba" is also valid but "bab" is fine)' },
    { input: 'cbbd',  expectedOutput: 'bb', description: 'Even length palindrome.' },
    { input: 'a',     expectedOutput: 'a',  description: 'Single character edgecase.' },
  ],
  hints: [
    'Length of a window defined by L and R is `R - L + 1`.',
    'Don\'t forget that the C++ lambda `auto expand = [&](int L, int R) {...};` captures `maxLen`, `startIdx`, and `s` so you can modify them entirely inside the lambda.',
  ],
  complexity: { time: 'O(N^2)', space: 'O(1) highly optimized' },
  tags: ['string', 'palindrome', 'two-pointers'],
};
export default lesson;
