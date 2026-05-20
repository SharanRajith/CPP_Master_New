const lesson = {
  id: 'm6-l12',
  title: 'Decode String',
  module: 6,
  lessonNumber: 12,
  xpReward: 15,
  leetcodeProblems: [
    { id: 394, title: 'Decode String', url: 'https://leetcode.com/problems/decode-string/', difficulty: 'Medium' },
  ],
  content: `# Decode String

Given an encoded string, return its decoded form. The encoding rule is:

\`k[encoded_string]\`

where \`k\` is a positive integer and \`encoded_string\` inside the brackets should be repeated exactly \`k\` times.

Encodings can be **nested**.

## Examples

\`\`\`
"3[a]2[bc]"    → "aaabcbc"
"3[a2[c]]"     → "accaccacc"
"2[abc]3[cd]ef"→ "abcabccdcdcdef"
\`\`\`

## Why a Stack?

The nested structure \`k[...k[...]]...\` is a classic recursive problem. We can handle recursion iteratively with an explicit **stack**.

The key challenge: when we see a closing \`]\`, we need to:
1. Know the string we built since the matching \`[\`.
2. Know the repeat count \`k\` that came before \`[\`.
3. Repeat that string \`k\` times and append it to whatever was being built before the \`[\`.

This is exactly what a stack stores: the "context" from before the opening bracket.

## Two-Stack Approach

We maintain **two stacks**:
- \`countStack\` — saves the repeat count \`k\` when we enter a \`[\`.
- \`strStack\` — saves the string built so far when we enter a \`[\`.

And two working variables:
- \`curStr\` — the string being assembled right now.
- \`curNum\` — the number being parsed right now (digits can be multi-digit!).

## Algorithm

\`\`\`
for each character c in s:
  if c is a digit:
      curNum = curNum * 10 + (c - '0')   // handle multi-digit numbers
  else if c == '[':
      push curNum onto countStack
      push curStr onto strStack
      reset curNum = 0, curStr = ""
  else if c == ']':
      k   = countStack.top(); countStack.pop()
      prev = strStack.top();  strStack.pop()
      curStr = prev + repeat(curStr, k)
  else:   // normal letter
      curStr += c
\`\`\`

## Full Trace: "3[a2[c]]"

\`\`\`
c='3'  curNum=3, curStr=""
c='['  push (3,"") onto stacks, reset: curNum=0, curStr=""
c='a'  curStr="a"
c='2'  curNum=2
c='['  push (2,"a") onto stacks, reset: curNum=0, curStr=""
c='c'  curStr="c"
c=']'  k=2, prev="a", curStr = "a" + "cc" = "acc"
c=']'  k=3, prev="",  curStr = "" + "accaccacc" = "accaccacc"

Result = "accaccacc" ✓
\`\`\`

## Trace: "2[abc]3[cd]ef"

\`\`\`
c='2'  curNum=2
c='['  push (2,""), reset
c='a'  curStr="a"
c='b'  curStr="ab"
c='c'  curStr="abc"
c=']'  k=2, prev="", curStr = "" + "abcabc" = "abcabc"
c='3'  curNum=3
c='['  push (3,"abcabc"), reset
c='c'  curStr="c"
c='d'  curStr="cd"
c=']'  k=3, prev="abcabc", curStr="abcabc"+"cdcdcd"="abcabccdcdcd"
c='e'  curStr="abcabccdcdcde"
c='f'  curStr="abcabccdcdcdef"

Result = "abcabccdcdcdef" ✓
\`\`\`

## Full Implementation

\`\`\`cpp
string decodeString(const string& s) {
    stack<int>    countStack;
    stack<string> strStack;
    string curStr;
    int    curNum = 0;

    for (char c : s) {
        if (isdigit(c)) {
            curNum = curNum * 10 + (c - '0');
        } else if (c == '[') {
            countStack.push(curNum);
            strStack.push(curStr);
            curNum = 0;
            curStr = "";
        } else if (c == ']') {
            int k = countStack.top(); countStack.pop();
            string prev = strStack.top(); strStack.pop();
            string repeated;
            for (int i = 0; i < k; i++) repeated += curStr;
            curStr = prev + repeated;
        } else {
            curStr += c;
        }
    }
    return curStr;
}
\`\`\`

## Multi-digit Numbers

Note that \`curNum = curNum * 10 + (c - '0')\` correctly handles repeat counts like \`12[a]\`. It accumulates digit by digit, just like how you would read a number from left to right.

## Complexity

| | |
|---|---|
| Time | O(N · k_max) where k_max is the maximum repeat factor |
| Space | O(N) for the two stacks and the result string |

For deeply nested strings the decoded length can be exponential, but the algorithm itself only does work proportional to the **output size**.
`,
  starterCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

string decodeString(const string& s) {
    stack<int>    countStack;
    stack<string> strStack;
    string curStr;
    int    curNum = 0;

    for (char c : s) {
        if (isdigit(c)) {
            // TODO: accumulate digits (curNum = curNum * 10 + digit)
        } else if (c == '[') {
            // TODO: push curNum and curStr onto their stacks, then reset both
        } else if (c == ']') {
            // TODO: pop k from countStack and prev from strStack
            // TODO: curStr = prev + (curStr repeated k times)
        } else {
            // TODO: append character to curStr
        }
    }
    return curStr;
}

int main() {
    string s; cin >> s;
    cout << decodeString(s) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

string decodeString(const string& s) {
    stack<int>    countStack;
    stack<string> strStack;
    string curStr;
    int    curNum = 0;

    for (char c : s) {
        if (isdigit(c)) {
            curNum = curNum * 10 + (c - '0');
        } else if (c == '[') {
            countStack.push(curNum);
            strStack.push(curStr);
            curNum = 0;
            curStr = "";
        } else if (c == ']') {
            int k = countStack.top(); countStack.pop();
            string prev = strStack.top(); strStack.pop();
            string repeated;
            for (int i = 0; i < k; i++) repeated += curStr;
            curStr = prev + repeated;
        } else {
            curStr += c;
        }
    }
    return curStr;
}

int main() {
    string s; cin >> s;
    cout << decodeString(s) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '3[a]2[bc]',      expectedOutput: 'aaabcbc',       description: 'Two independent encoded segments.' },
    { input: '3[a2[c]]',       expectedOutput: 'accaccacc',     description: 'Nested encoding: inner 2[c] inside outer 3[...].' },
    { input: '2[abc]3[cd]ef',  expectedOutput: 'abcabccdcdcdef', description: 'Two encoded segments followed by literal characters.' },
  ],
  hints: [
    'When you hit `[`, you need to "save" your current progress and start fresh inside the brackets. Push `curStr` and `curNum` onto their respective stacks, then reset both.',
    'When you hit `]`, you are done with the inner string. Pop `k` and `prevStr`, then set `curStr = prevStr + (curStr repeated k times)`.',
    'Numbers can be multi-digit (e.g., `12[a]`). Build them up with `curNum = curNum * 10 + (c - \'0\')`; reset `curNum = 0` when you push it at `[`.',
  ],
  complexity: { time: 'O(N·k)', space: 'O(N)', notes: 'N is the length of the encoded string, k is the maximum nesting/repetition factor.' },
  tags: ['stack', 'string', 'recursion', 'medium'],
};
export default lesson;
