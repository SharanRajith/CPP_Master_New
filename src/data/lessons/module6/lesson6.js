const lesson = {
  id: 'm6-l6',
  title: 'Implement Queue using Stacks',
  module: 6,
  lessonNumber: 6,
  xpReward: 10,
  leetcodeProblems: [
    { id: 232, title: 'Implement Queue using Stacks', url: 'https://leetcode.com/problems/implement-queue-using-stacks/', difficulty: 'Easy' },
    { id: 225, title: 'Implement Stack using Queues', url: 'https://leetcode.com/problems/implement-stack-using-queues/', difficulty: 'Easy' },
  ],
  content: `# Queue using Stacks

A Queue is FIFO (First-In, First-Out). A Stack is LIFO (Last-In, First-Out).
How can we build a FIFO queue using only LIFO stacks? 

**Answer:** We need **two stacks**.

Imagine pouring a stack of plates into another stack. The order entirely reverses! If we push elements into Stack A, they are in LIFO order. If we then pop them from Stack A and push them into Stack B, they are now in FIFO order in Stack B!

## The Two-Stack Architecture
- \`pushStack\`: Used exclusively for pushing new elements.
- \`popStack\`: Used exclusively for popping/peeking elements.

### Rules of Engagement
1. **Push:** Always push into \`pushStack\`. (Time: $O(1)$)
2. **Pop/Peek:** If \`popStack\` is empty, pour EVERYTHING from \`pushStack\` into \`popStack\`. Then pop/peek from \`popStack\`. (Amortized Time: $O(1)$)

\`\`\`cpp
class MyQueue {
    std::stack<int> s1; // pushStack
    std::stack<int> s2; // popStack
    
    void transferIfNeeded() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
    }
public:
    void push(int x) {
        s1.push(x);
    }
    
    int pop() {
        transferIfNeeded();
        int val = s2.top();
        s2.pop();
        return val;
    }
    
    int peek() {
        transferIfNeeded();
        return s2.top();
    }
    
    bool empty() {
        return s1.empty() && s2.empty();
    }
};
\`\`\`

> **Why is Pop Amortized O(1)?**  
> While a single pop might trigger a transfer taking $O(N)$ time, that $O(N)$ cost only happens once per $N$ elements. Across $N$ operations, the average cost per operation is strictly $O(1)$.
`,
  starterCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

// Implement a Queue using exactly two std::stack instances.
class MyQueue {
    stack<int> s1; // For pushing
    stack<int> s2; // For popping/peeking
    
    // Helper to pour s1 into s2 if s2 is empty
    void transfer() {
        // TODO: implement
    }
    
public:
    void push(int x) {
        // TODO: Push to s1
    }
    
    int pop() {
        // TODO: Transfer, grab top of s2, pop s2, return it
        return -1;
    }
    
    int peek() {
        // TODO: Transfer, return top of s2
        return -1;
    }
};

int main() {
    int q; cin >> q;
    MyQueue qu;
    while (q--) {
        string op; cin >> op;
        if (op == "push") {
            int val; cin >> val; qu.push(val);
        } else if (op == "pop") {
            cout << qu.pop() << "\\n";
        } else if (op == "peek") {
            cout << qu.peek() << "\\n";
        }
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

class MyQueue {
    stack<int> s1;
    stack<int> s2;
    void transfer() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
    }
public:
    void push(int x) { s1.push(x); }
    int pop() {
        transfer();
        int val = s2.top();
        s2.pop();
        return val;
    }
    int peek() {
        transfer();
        return s2.top();
    }
};

int main() {
    int q; cin >> q;
    MyQueue qu;
    while (q--) {
        string op; cin >> op;
        if (op == "push") { int v; cin >> v; qu.push(v); }
        else if (op == "pop") cout << qu.pop() << "\\n";
        else cout << qu.peek() << "\\n";
    }
    return 0;
}`,
  testCases: [
    { input: '6\npush 1\npush 2\npeek\npop\npeek\npop', expectedOutput: '1\n1\n2\n2', description: 'Basic push/pop sequence.' },
    { input: '3\npush 42\npush 10\npop',            expectedOutput: '42',        description: 'Verifying FIFO behavior.' },
  ],
  hints: [
    'Write a `transfer()` method. If `s2` is empty, write a while loop to pop everything off `s1` and push it to `s2`.',
    'Before you `pop()` or `peek()`, always call `transfer()`.',
    'Do not call transfer if `s2` is not empty. You must drain `s2` entirely before pouring more in!',
  ],
  complexity: { time: 'Amortized O(1) for pop/peek, exact O(1) for push', space: 'O(N) across the two stacks' },
  tags: ['stack', 'queue', 'design', 'amortized'],
};
export default lesson;
