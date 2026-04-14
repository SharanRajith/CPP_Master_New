const lesson = {
  id: 'm12-l1',
  title: 'Two Pointers (FAANG Basics)',
  module: 12,
  lessonNumber: 1,
  xpReward: 10,
  leetcodeProblems: [
    { id: 125, title: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/', difficulty: 'Easy' },
  ],
  content: `# The Two Pointers Pattern

Two Pointers is the quintessential FAANG warmup question. It involves using two integer variables (often called ` + "`" + `left` + "`" + ` and ` + "`" + `right` + "`" + `) acting as indices to parse a string or array simultaneously.

## Valid Palindrome (LeetCode 125)
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

**The Approach:**
1. Initialize ` + "`" + `left = 0` + "`" + ` and ` + "`" + `right = s.length() - 1` + "`" + `.
2. While ` + "`" + `left < right` + "`" + `:
   - If ` + "`" + `s[left]` + "`" + ` is not alphanumeric, ` + "`" + `left++` + "`" + ` to skip it.
   - If ` + "`" + `s[right]` + "`" + ` is not alphanumeric, ` + "`" + `right--` + "`" + ` to skip it.
   - Now both point to valid characters. If they do not match (ignoring case), return ` + "`" + `false` + "`" + `!
   - They matched! ` + "`" + `left++` + "`" + ` and ` + "`" + `right--` + "`" + ` to continue converging inward.
3. If the pointers cross, return ` + "`" + `true` + "`" + `!

### Why Two Pointers instead of ` + "`" + `reverse()` + "`" + `?
If you just process the string, removing characters, and then run ` + "`" + `reverse()` + "`" + `, you take $O(N)$ extra space to store the cleaned string! 
Two Pointers does this in $O(1)$ space absolutely mechanically.

\`\`\`cpp
#include <cctype> // for std::isalnum and std::tolower
bool isPalindrome(string s) {
    int left = 0, right = s.length() - 1;
    
    while (left < right) {
        // Skip invalid characters
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        
        // Compare lowercase forms
        if (tolower(s[left]) != tolower(s[right])) {
            return false;
        }
        
        // Shrink window
        left++;
        right--;
    }
    return true;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool isPalindrome(string s) {
    // TODO: Initialize left and right pointers
    
    // while left < right
    //   while left is not alphanumeric and left < right -> left++
    //   while right is not alphanumeric and left < right -> right--
    //   if tolower(left) != tolower(right) return false
    //   left++, right--
    
    return true;
}

int main() {
    string s; 
    getline(cin, s); // string might contain spaces!
    cout << (isPalindrome(s) ? "true" : "false") << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool isPalindrome(string s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        while (l < r && !isalnum(s[l])) l++;
        while (l < r && !isalnum(s[r])) r--;
        
        if (tolower(s[l]) != tolower(s[r])) return false;
        l++;
        r--;
    }
    return true;
}

int main() {
    string s; getline(cin, s);
    cout << (isPalindrome(s) ? "true" : "false") << "\\n";
    return 0;
}`,
  testCases: [
    { input: 'A man, a plan, a canal: Panama', expectedOutput: 'true', description: 'Classic alphanumeric test.' },
    { input: 'race a car', expectedOutput: 'false', description: 'Fails at e != a.' },
    { input: '   .', expectedOutput: 'true', description: 'Empty or completely skipped strings are true.' },
  ],
  hints: [
    '`std::isalnum` and `std::tolower` are extremely useful standard library functions.',
    'Always remember to add `l < r` inside the inner `while` loops to prevent index out of bounds if the string is empty!',
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['two-pointers', 'strings', 'easy'],
};
export default lesson;
