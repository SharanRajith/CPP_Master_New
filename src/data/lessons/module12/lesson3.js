const lesson = {
  id: 'm12-l3',
  title: 'Sliding Window',
  module: 12,
  lessonNumber: 3,
  xpReward: 15,
  leetcodeProblems: [
    { id: 3, title: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium' },
  ],
  content: `# Sliding Window

When you need to find the "Longest/Shortest/Max Subarray or Substring" that satisfies a specific condition, the **Sliding Window** pattern is the answer.
Instead of checking all $O(N^2)$ subarrays, you maintain a "window" using ` + "`" + `left` + "`" + ` and ` + "`" + `right` + "`" + ` pointers.

**The Golden Blueprint:**
1. Expand the ` + "`" + `right` + "`" + ` pointer to add elements to the window.
2. If the window breaks the required condition, loop and shrink the ` + "`" + `left` + "`" + ` pointer until the window is valid again!
3. Update the global maximum/minimum.

## Longest Substring Without Repeating Characters
Given a string \`s\`, find the length of the longest substring without repeating characters.

**Condition to maintain:** Every character inside the window ` + "`" + `(left, right)` + "`" + ` must be unique. We can track this using an ` + "`" + `unordered_set` + "`" + ` or an array!

\`\`\`cpp
int lengthOfLongestSubstring(string s) {
    // Array of booleans serving as our HashSet for 128 ASCII characters
    vector<bool> seen(128, false); 
    
    int left = 0;
    int maxLen = 0;
    
    // Right pointer endlessly expands
    for (int right = 0; right < s.length(); right++) {
        char curr = s[right];
        
        // If condition breaks (we've seen this char!), shrink window
        while (seen[curr] == true) {
            seen[s[left]] = false; // Remove left char from set
            left++;                // Shrink
        }
        
        // Now it's valid again. Add current char and update result.
        seen[curr] = true;
        maxLen = max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

// Implement sliding window!
int lengthOfLongestSubstring(string s) {
    vector<bool> seen(128, false);
    int left = 0, maxLen = 0;
    
    for (int right = 0; right < s.length(); right++) {
        // TODO: while seen[s[right]] is true, shrink left side window
        
        // TODO: Mark seen[s[right]] = true
        // TODO: Update maxLen with right - left + 1
    }
    
    return maxLen;
}

int main() {
    string s; cin >> s;
    cout << lengthOfLongestSubstring(s) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    vector<bool> seen(128, false);
    int left = 0, maxLen = 0;
    
    for (int right = 0; right < s.length(); right++) {
        while (seen[s[right]]) {
            seen[s[left]] = false;
            left++;
        }
        seen[s[right]] = true;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}

int main() {
    string s; cin >> s;
    cout << lengthOfLongestSubstring(s) << "\\n";
    return 0;
}`,
  testCases: [
    { input: 'abcabcbb', expectedOutput: '3', description: 'Longest is "abc".' },
    { input: 'bbbbb', expectedOutput: '1', description: 'Longest is "b".' },
    { input: 'pwwkew', expectedOutput: '3', description: 'Longest is "wke".' },
  ],
  hints: [
    'Shrinking loop: `while (seen[s[right]]) { seen[s[left]] = false; left++; }`',
  ],
  complexity: { time: 'O(N)', space: 'O(1) using standard ASCII array' },
  tags: ['sliding-window', 'strings', 'hash-set'],
};
export default lesson;
