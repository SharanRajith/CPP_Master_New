const lesson = {
  id: 'm6-l3',
  title: 'Valid Parentheses',
  module: 6,
  lessonNumber: 3,
  xpReward: 10,
  leetcodeProblems: [
    { id: 20,   title: 'Valid Parentheses',           url: 'https://leetcode.com/problems/valid-parentheses/',           difficulty: 'Easy' },
    { id: 1249, title: 'Minimum Remove to Make Valid', url: 'https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/', difficulty: 'Medium' },
    { id: 32,   title: 'Longest Valid Parentheses',   url: 'https://leetcode.com/problems/longest-valid-parentheses/',   difficulty: 'Hard' },
  ],
  content: `# Valid Parentheses

Validating nested structures (like brackets, HTML tags, or code blocks) is the **ultimate use case for a Stack**.

Every time you open a bracket, you push it to the stack. Every time you find a closing bracket, it **must** match the bracket at the top of the stack.

## LeetCode #20: Valid Parentheses

The algorithm:
1. Iterate over the string.
2. If it's an open bracket \`(\`, \`[\`, \`{\`, push it onto the stack.
3. If it's a closed bracket \`)\`, \`]\`, \`}\`:
   - If the stack is empty $\\rightarrow$ Invalid! (e.g. \`"() ]"\`)
   - If the top of the stack doesn't match $\\rightarrow$ Invalid! (e.g. \`"( ]"\`)
   - Otherwise $\\rightarrow$ Pop the matching open bracket from the stack!
4. At the end, the stack **must be empty**. If not, there are unmatched open brackets! (e.g. \`"( ()"\`)

\`\`\`cpp
#include <stack>
#include <string>

bool isValid(string s) {
    std::stack<char> st;
    
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false; // Missing open bracket
            char top = st.top();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) {
                return false; // Mismatched brackets
            }
            st.pop(); // Matches!
        }
    }
    return st.empty(); // Should be empty at the end
}
\`\`\`

> **Trick:** You can also push the *expected closing bracket* onto the stack when you see an open bracket. Then when you see a closing bracket, just check if it equals \`st.top()\`. It looks cleaner!
`,
  starterCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

// Return true if the string possesses valid parentheses, false otherwise.
bool isValid(string s) {
    stack<char> st;
    // TODO: Loop through each character
    // If opening bracket => push
    // If closing bracket => check if stack is empty OR top doesn't match
    // Pop if matches.
    
    return false;
}

int main() {
    string s;
    cin >> s;
    cout << (isValid(s) ? "true" : "false") << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else {
            if (st.empty() || st.top() != c) return false;
            st.pop();
        }
    }
    return st.empty();
}

int main() {
    string s; cin >> s;
    cout << (isValid(s) ? "true" : "false") << "\\n";
    return 0;
}`,
  testCases: [
    { input: '()[]{}', expectedOutput: 'true',  description: 'Regular sequential valid brackets' },
    { input: '([{}])', expectedOutput: 'true',  description: 'Deeply nested valid brackets' },
    { input: '(]',     expectedOutput: 'false', description: 'Mismatched brackets' },
    { input: '((()',   expectedOutput: 'false', description: 'Unclosed brackets (stack not empty at end)' },
    { input: ']',      expectedOutput: 'false', description: 'Premature closing bracket' },
  ],
  hints: [
    'Use `std::stack<char> st;`.',
    'When you see `(`, push `)` to the stack! It makes comparison trivial later.',
    'If you see a closing bracket: check `if (st.empty() || st.top() != c) return false;`. Then `st.pop();`.',
    'Return `st.empty();` at the very end.',
  ],
  complexity: { time: 'O(N)', space: 'O(N) for the stack', notes: 'N is the length of the string.' },
  tags: ['stack', 'parentheses', 'parsing', 'faang'],
};
export default lesson;
