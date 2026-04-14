const lesson = {
  id: 'm13-l2',
  title: 'Meta: Minimum Remove to Make Valid Parentheses',
  module: 13,
  lessonNumber: 2,
  xpReward: 20,
  leetcodeProblems: [
    { id: 1249, title: 'Minimum Remove to Make Valid Parentheses', url: 'https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/', difficulty: 'Medium' },
  ],
  content: `# Meta (Facebook): Min Remove to Make Valid Parentheses

This string manipulation problem is notorious in Meta's interview banks. 
Given a string ` + "`" + `s` + "`" + ` of ` + "`" + `'('` + "`" + ` , ` + "`" + `')'` + "`" + ` and lowercase English characters.
Your task is to remove the minimum number of parentheses so that the resulting parentheses string is valid.

## The Strategy: Stacks and Markers
A valid parentheses string requires every ` + "`" + `'('` + "`" + ` to be closed later by a ` + "`" + `')'` + "`" + `.
If we hit a ` + "`" + `')'` + "`" + ` and we haven't seen a matching ` + "`" + `'('` + "`" + `, that ` + "`" + `')'` + "`" + ` is fundamentally invalid and MUST be removed.

**1. Mark the invalid characters**
We iterate through the string.
When we see a ` + "`" + `'('` + "`" + `, we push its **index** onto a Stack.
When we see a ` + "`" + `')'` + "`" + `:
- If the stack is NOT empty, it means we have a matching pair! We ` + "`" + `pop` + "`" + ` from the stack.
- If the stack IS empty, this ` + "`" + `')'` + "`" + ` is illegal! To mark it for deletion without messing up our index loop, we turn it into a special character like ` + "`" + `'*'` + "`" + `.

After the loop, what if the Stack still has items? It means there are ` + "`" + `'('` + "`" + ` characters that were never closed!
We pop them and turn those string indices into ` + "`" + `'*'` + "`" + ` too!

**2. Clean the string**
Run one final loop over the string. If the character is not ` + "`" + `'*'` + "`" + `, append it to a result string.

\`\`\`cpp
string minRemoveToMakeValid(string s) {
    stack<int> st;
    
    for (int i = 0; i < s.length(); i++) {
        if (s[i] == '(') {
            st.push(i);
        } else if (s[i] == ')') {
            if (!st.empty()) {
                st.pop(); // Matched!
            } else {
                s[i] = '*'; // Illegal!
            }
        }
    }
    
    // Any remaining '(' are unclosed and illegal
    while (!st.empty()) {
        s[st.top()] = '*';
        st.pop();
    }
    
    string res = "";
    for (char c : s) {
        if (c != '*') res += c;
    }
    
    return res;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

string minRemoveToMakeValid(string s) {
    stack<int> st;
    
    // TODO: Loop through s
    // Push index of '('
    // If ')', check stack. If empty, s[i] = '*'. Else st.pop()
    
    // TODO: Loop while st is not empty
    // set s[st.top()] = '*' and pop
    
    // TODO: Build and return final string ignoring '*'
    
    return s;
}

int main() {
    string s; cin >> s;
    cout << minRemoveToMakeValid(s) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

string minRemoveToMakeValid(string s) {
    stack<int> st;
    for (int i = 0; i < s.length(); i++) {
        if (s[i] == '(') {
            st.push(i);
        } else if (s[i] == ')') {
            if (!st.empty()) st.pop();
            else s[i] = '*';
        }
    }
    
    while (!st.empty()) {
        s[st.top()] = '*';
        st.pop();
    }
    
    string res = "";
    for (char c : s) {
        if (c != '*') res += c;
    }
    return res;
}

int main() {
    string s; cin >> s;
    cout << minRemoveToMakeValid(s) << "\\n";
    return 0;
}`,
  testCases: [
    { input: 'lee(t(c)o)de)', expectedOutput: 'lee(t(c)o)de', description: 'Removes the unmatched closing brace at the end.' },
    { input: 'a)b(c)d', expectedOutput: 'ab(c)d', description: 'Removes unmatched closing brace at the start.' },
    { input: '(((', expectedOutput: '', description: 'Removes all unmatched opening braces.' },
  ],
  hints: [
    'The stack stores INDICES (`int`), not the characters. This allows you to map directly back to `s[i]` to replace them!',
  ],
  complexity: { time: 'O(N)', space: 'O(N) for stack and result string' },
  tags: ['strings', 'stack', 'meta', 'facebook'],
};
export default lesson;
