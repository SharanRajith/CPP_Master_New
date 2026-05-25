const lesson = {
  id: 'msvc-l4',
  title: 'Infosys: Stack & Queue Problems',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 20,  title: 'Valid Parentheses',          url: 'https://leetcode.com/problems/valid-parentheses/',          difficulty: 'Easy' },
    { id: 155, title: 'Min Stack',                  url: 'https://leetcode.com/problems/min-stack/',                  difficulty: 'Medium' },
    { id: 232, title: 'Implement Queue using Stacks', url: 'https://leetcode.com/problems/implement-queue-using-stacks/', difficulty: 'Easy' },
  ],
  content: `# Infosys — Stack & Queue DSA Questions

Stack and queue problems are heavily tested in Infosys interviews, especially **parenthesis validation** and **next greater element**.

---

## 1. Valid Parentheses

\`\`\`cpp
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if (c == ')' && top != '(') return false;
            if (c == ']' && top != '[') return false;
            if (c == '}' && top != '{') return false;
        }
    }
    return st.empty();
}
\`\`\`

---

## 2. Next Greater Element

\`\`\`cpp
vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> st; // stores indices
    for (int i = 0; i < n; i++) {
        while (!st.empty() && arr[i] > arr[st.top()]) {
            result[st.top()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}
// {4,5,2,10,8} → {5,10,10,-1,-1}
\`\`\`

---

## 3. Min Stack (O(1) getMin)

\`\`\`cpp
class MinStack {
    stack<int> s, minS;
public:
    void push(int val) {
        s.push(val);
        if (minS.empty() || val <= minS.top()) minS.push(val);
    }
    void pop() {
        if (s.top() == minS.top()) minS.pop();
        s.pop();
    }
    int top()    { return s.top(); }
    int getMin() { return minS.top(); }
};
\`\`\`

---

## 4. Implement Queue using Two Stacks

\`\`\`cpp
class MyQueue {
    stack<int> inbox, outbox;
public:
    void push(int x) { inbox.push(x); }
    int pop() {
        if (outbox.empty())
            while (!inbox.empty()) { outbox.push(inbox.top()); inbox.pop(); }
        int val = outbox.top(); outbox.pop();
        return val;
    }
    int peek() {
        if (outbox.empty())
            while (!inbox.empty()) { outbox.push(inbox.top()); inbox.pop(); }
        return outbox.top();
    }
    bool empty() { return inbox.empty() && outbox.empty(); }
};
\`\`\`

---

## Infosys Tips

- Valid Parentheses is a **must-know** — appears in almost every Infosys interview.
- Next Greater Element shows you understand monotonic stacks — a key pattern.
- Be ready to explain WHY you use a stack (LIFO property is key for matching brackets).
`,
  starterCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    // TODO: Return true if all brackets are properly matched
    return false;
}

int main() {
    cout << isValid("()[]{}") << "\\n";  // 1
    cout << isValid("([)]")   << "\\n";  // 0
    cout << isValid("{[]}")   << "\\n";  // 1
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c=='(' || c=='[' || c=='{') { st.push(c); continue; }
        if (st.empty()) return false;
        char t = st.top(); st.pop();
        if (c==')' && t!='(') return false;
        if (c==']' && t!='[') return false;
        if (c=='}' && t!='{') return false;
    }
    return st.empty();
}

int main() {
    cout << isValid("()[]{}") << "\\n";
    cout << isValid("([)]")   << "\\n";
    cout << isValid("{[]}")   << "\\n";
    return 0;
}`,
  testCases: [
    { description: '"()[]{}" valid=1, "([)]" invalid=0, "{[]}" valid=1', expectedOutput: '1\n0\n1' },
  ],
  hints: [
    'Push opening brackets onto the stack.',
    'For closing brackets, check if the stack top is the matching opening bracket.',
    'At the end, the stack must be empty for the string to be valid.',
  ],
  complexity: { time: 'O(N)', space: 'O(N)' },
  tags: ['infosys', 'stack', 'queue', 'dsa'],
};
export default lesson;
