const lesson = {
  id: 'msvc-l2',
  title: 'TCS: String & Hashing Problems',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 242, title: 'Valid Anagram',              url: 'https://leetcode.com/problems/valid-anagram/',              difficulty: 'Easy' },
    { id: 3,   title: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium' },
    { id: 344, title: 'Reverse String',             url: 'https://leetcode.com/problems/reverse-string/',             difficulty: 'Easy' },
  ],
  content: `# TCS — String & Hashing DSA Questions

Strings are the **second most tested topic** in TCS after arrays. Combined with hashmaps, they cover a huge chunk of questions.

---

## 1. Check Palindrome

\`\`\`cpp
bool isPalindrome(string s) {
    int l = 0, r = s.size() - 1;
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++; r--;
    }
    return true;
}
\`\`\`

---

## 2. Check Anagram

\`\`\`cpp
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    int freq[26] = {};
    for (char c : s) freq[c - 'a']++;
    for (char c : t) {
        if (--freq[c - 'a'] < 0) return false;
    }
    return true;
}
\`\`\`

---

## 3. First Non-Repeating Character

\`\`\`cpp
char firstUnique(string s) {
    unordered_map<char, int> freq;
    for (char c : s) freq[c]++;
    for (char c : s) if (freq[c] == 1) return c;
    return '\\0';
}
\`\`\`

---

## 4. Count & Say / Frequency Map

\`\`\`cpp
void charFrequency(string s) {
    unordered_map<char, int> freq;
    for (char c : s) freq[c]++;
    for (auto& [ch, cnt] : freq)
        cout << ch << ": " << cnt << "\\n";
}
\`\`\`

---

## 5. Longest Substring Without Repeating Characters

\`\`\`cpp
int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> idx;
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.size(); right++) {
        if (idx.count(s[right]) && idx[s[right]] >= left)
            left = idx[s[right]] + 1;
        idx[s[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
\`\`\`

---

## TCS String Tips

- **Palindrome check** and **anagram check** appear in nearly every TCS batch.
- Always clarify: case-sensitive? spaces included? The interviewer expects you to ask.
- Use \`unordered_map\` for O(1) lookups instead of nested loops (avoid O(N²)).
`,
  starterCode: `#include <iostream>
#include <string>
using namespace std;

bool isPalindrome(string s) {
    // TODO: Return true if s reads same forwards and backwards
    return false;
}

int main() {
    cout << isPalindrome("racecar") << "\\n"; // 1
    cout << isPalindrome("hello")   << "\\n"; // 0
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
using namespace std;

bool isPalindrome(string s) {
    int l = 0, r = s.size() - 1;
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++; r--;
    }
    return true;
}

int main() {
    cout << isPalindrome("racecar") << "\\n";
    cout << isPalindrome("hello")   << "\\n";
    return 0;
}`,
  testCases: [
    { description: '"racecar" is palindrome (1), "hello" is not (0)', expectedOutput: '1\n0' },
  ],
  hints: [
    'Use two pointers: one at start, one at end.',
    'Move both pointers inward, comparing characters.',
    'If any mismatch is found, return false immediately.',
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['tcs', 'string', 'hashing', 'dsa'],
};
export default lesson;
