const lesson = {
  id: 'm4-l8',
  title: 'String Parsing & Pattern Matching',
  module: 4,
  lessonNumber: 8,
  xpReward: 10,
  leetcodeProblems: [
    { id: 14,  title: 'Longest Common Prefix',        url: 'https://leetcode.com/problems/longest-common-prefix/',        difficulty: 'Easy' },
    { id: 49,  title: 'Group Anagrams',               url: 'https://leetcode.com/problems/group-anagrams/',               difficulty: 'Medium' },
    { id: 438, title: 'Find All Anagrams in a String', url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', difficulty: 'Medium' },
  ],
  content: `# String Parsing & Pattern Matching

Strings are arrays of characters. Every array technique applies — plus special string-specific operations.

## Anagram Detection
Two strings are anagrams if they contain the same characters with the same frequencies.
\`\`\`cpp
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    int count[26] = {};              // Frequency table
    for (char c : s) count[c - 'a']++;
    for (char c : t) count[c - 'a']--;
    for (int freq : count) if (freq != 0) return false;
    return true;
}
\`\`\`

## Find All Anagrams in String (Sliding Window + Freq Table)
\`\`\`cpp
// LeetCode #438 — find all starting indices of p's anagrams in s
vector<int> findAnagrams(string s, string p) {
    if (s.size() < p.size()) return {};
    int freq[26] = {};
    for (char c : p) freq[c - 'a']++;
    
    int window[26] = {};
    int k = p.size();
    vector<int> result;
    
    for (int i = 0; i < s.size(); i++) {
        window[s[i] - 'a']++;               // Expand right
        if (i >= k) window[s[i-k] - 'a']--; // Shrink left
        if (memcmp(freq, window, sizeof(freq)) == 0) result.push_back(i - k + 1);
    }
    return result;
}
\`\`\`

## String Splitting / Tokenization
\`\`\`cpp
#include <sstream>
string sentence = "hello world foo";
stringstream ss(sentence);
string token;
while (ss >> token) {
    cout << token << endl; // Splits on whitespace
}
\`\`\`

## Longest Common Prefix
\`\`\`cpp
string longestCommonPrefix(vector<string>& strs) {
    string prefix = strs[0];
    for (int i = 1; i < strs.size(); i++) {
        while (strs[i].find(prefix) != 0)  // prefix not at start
            prefix.pop_back();              // Shrink prefix
    }
    return prefix;
}
\`\`\`

> **Key trick:** Sort the array first — then only compare the first and last strings! The LCP of all strings = LCP of the lexicographically smallest and largest.
`,
  starterCode: `#include <iostream>
#include <string>
using namespace std;

// Check if two strings are anagrams of each other.
// Only lowercase English letters. Return "true" or "false".
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    // TODO: Use a frequency table (int count[26] = {})
    // Increment for s, decrement for t, check all zeros
    return false;
}

int main() {
    string s, t;
    cin >> s >> t;
    cout << (isAnagram(s, t) ? "true" : "false") << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
using namespace std;

bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    int count[26] = {};
    for (char c : s) count[c - 'a']++;
    for (char c : t) count[c - 'a']--;
    for (int f : count) if (f != 0) return false;
    return true;
}

int main() {
    string s, t;
    cin >> s >> t;
    cout << (isAnagram(s, t) ? "true" : "false") << endl;
    return 0;
}`,
  testCases: [
    { input: 'anagram nagaram', expectedOutput: 'true',  description: '"anagram" and "nagaram" are anagrams' },
    { input: 'rat car',         expectedOutput: 'false', description: '"rat" and "car" are not anagrams' },
    { input: 'a ab',            expectedOutput: 'false', description: 'Different lengths → false' },
  ],
  hints: [
    'Declare `int count[26] = {};` — zero-initialized frequency array.',
    'Loop through s: `count[c - \'a\']++;`',
    'Loop through t: `count[c - \'a\']--;`',
    'If all counts are 0 at the end, it\'s an anagram.',
  ],
  complexity: {
    time:  'O(n) — single pass each string',
    space: 'O(1) — fixed 26-element array',
    notes: 'The fixed-size frequency table trick works for any bounded character set.',
  },
  tags: ['strings', 'anagram', 'frequency-table', 'hashing'],
};
export default lesson;
