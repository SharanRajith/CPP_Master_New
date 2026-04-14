const lesson = {
  id: 'm11-l8',
  title: 'Rolling Hash (Rabin-Karp)',
  module: 11,
  lessonNumber: 8,
  xpReward: 20,
  leetcodeProblems: [
    { id: 28, title: 'Find the Index of the First Occurrence in a String', url: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/', difficulty: 'Easy' },
    { id: 1044, title: 'Longest Duplicate Substring', url: 'https://leetcode.com/problems/longest-duplicate-substring/', difficulty: 'Hard' },
  ],
  content: `# String Search: Rabin-Karp Algorithm

Searching for a string $P$ inside string $TEXT$ using a brute-force double loop takes $O(N \\times M)$ time. 
The **Rabin-Karp Algorithm** reduces this expected time to $O(N)$ using the magic of a **Rolling Hash**.

## Polynomial Hashing
Instead of comparing strings character by character, we turn both strings into integers (hashes) and compare the integers!
A common hash formula treats strings like numbers in base 256 (for ASCII), modulo a giant prime to prevent overflow:
$$H(S) = (S_0 \\times 256^K + S_1 \\times 256^{K-1} \\dots) \\pmod M$$

## The Rolling Property
If we have the hash for "abc", and we want the hash for "bcd" (sliding the window right):
1. **Subtract** the leading character: ` + "`" + `hash = (hash - 'a' * 256^2)` + "`" + `
2. **Shift** everything: ` + "`" + `hash = (hash * 256)` + "`" + `
3. **Add** the new character: ` + "`" + `hash = (hash + 'd')` + "`" + `
*(All modulo M)*

This guarantees we can slide a window of length $|P|$ along $TEXT$ and calculate its new hash in $O(1)$ time! 

\`\`\`cpp
int strStr(string haystack, string needle) {
    if (needle.empty()) return 0;
    
    int M = 1e9 + 7; // Large prime
    int base = 256;
    
    long long pHash = 0, hHash = 0, hBase = 1;
    
    // Calculate hash for needle and first window of haystack
    for (int i = 0; i < needle.size(); i++) {
        pHash = (pHash * base + needle[i]) % M;
        hHash = (hHash * base + haystack[i]) % M;
        
        // hBase = base^(len-1), needed for character removal step
        if (i < needle.size() - 1) hBase = (hBase * base) % M;
    }
    
    if (pHash == hHash) return 0;
    
    // Slide the window!
    for (int i = needle.size(); i < haystack.size(); i++) {
        // 1. Remove trailing char from old window
        hHash = (hHash - haystack[i - needle.size()] * hBase) % M;
        if (hHash < 0) hHash += M; // Prevent negative modulo logic bugs!
        
        // 2 & 3. Shift and add new char
        hHash = (hHash * base + haystack[i]) % M;
        
        if (hHash == pHash) {
            // Collision-check is technically required for production code.
            return i - needle.size() + 1;
        }
    }
    return -1;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <string>
using namespace std;

// Implement Rabin-Karp or standard search 
// (For this mock, feel free to just use string::substr if you are rusty on the math)
int strStr(string haystack, string needle) {
    if (needle.empty()) return 0;
    int h = haystack.size(), n = needle.size();
    if (n > h) return -1;
    
    // Standard rolling hash logic or substr
    for (int i = 0; i <= h - n; i++) {
        if (haystack.substr(i, n) == needle) return i;
    }
    return -1;
}

int main() {
    string haystack, needle;
    cin >> haystack >> needle;
    cout << strStr(haystack, needle) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
using namespace std;

int strStr(string haystack, string needle) {
    if (needle.empty()) return 0;
    int h = haystack.size(), n = needle.size();
    if (n > h) return -1;
    
    long long M = 1e9 + 7;
    long long base = 256;
    long long pHash = 0, hHash = 0, hBase = 1;
    
    for (int i = 0; i < n; i++) {
        pHash = (pHash * base + needle[i]) % M;
        hHash = (hHash * base + haystack[i]) % M;
        if (i < n - 1) hBase = (hBase * base) % M;
    }
    
    if (pHash == hHash) return 0;
    
    for (int i = n; i < h; i++) {
        hHash = (hHash - haystack[i - n] * hBase) % M;
        if (hHash < 0) hHash += M;
        hHash = (hHash * base + haystack[i]) % M;
        if (hHash == pHash) return i - n + 1;
    }
    return -1;
}

int main() {
    string haystack, needle;
    cin >> haystack >> needle;
    cout << strStr(haystack, needle) << "\\n";
    return 0;
}`,
  testCases: [
    { input: 'sadbutsad\nsad', expectedOutput: '0', description: 'Outputs first match index.' },
    { input: 'leetcode\nleeto', expectedOutput: '-1', description: 'Subsequence not found.' },
  ],
  hints: [
    'The modulo arithmetic with negative numbers in C++ is famously annoying. Ensure `hHash += M` if it dips negative!',
  ],
  complexity: { time: 'O(N) Expected, O(NM) Worst Case (Collisions)', space: 'O(1)' },
  tags: ['string', 'rabin-karp', 'hash', 'rolling-hash'],
};
export default lesson;
