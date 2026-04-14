const lesson = {
  id: 'm3-l2',
  title: 'std::list & std::deque',
  module: 3,
  lessonNumber: 2,
  xpReward: 10,
  leetcodeProblems: [
    {
      id: 641,
      title: "Design Circular Deque",
      difficulty: "Medium",
      url: "https://leetcode.com/problems/design-circular-deque/"
    }
  ],
  content: `# std::list & std::deque

While \`std::vector\` is incredibly fast for reading and adding to the *end*, adding to the *front* is extremely slow $O(N)$ because every element must shift. C++ provides two structures to solve this: **list** and **deque**.

## 1. std::list (Doubly-Linked List)
\`std::list\` stores elements in non-contiguous memory blocks, linked by pointers.
- **Fast:** Insertion/deletion anywhere is $O(1)$ (if you already have the iterator).
- **Slow:** No random access. You cannot do \`myList[3]\`. You must iterate step-by-step.

\`\`\`cpp
#include <list>
std::list<int> l = {1, 2, 3};
l.push_front(0); // Extremely fast!
l.push_back(4);
\`\`\`

## 2. std::deque (Double-Ended Queue)
\`std::deque\` (pronounced "deck") is a hybrid. It allocates memory in "chunks".
- **Fast:** Insertion at *both* the front and back is $O(1)$.
- **Fast:** Random access is allowed! \`myDeque[3]\` works in $O(1)$ time.
- **Tradeoff:** Slightly more memory overhead than a vector, and elements are not guaranteed to be perfectly contiguous in memory.

\`\`\`cpp
#include <deque>
std::deque<int> dq;
dq.push_back(10);
dq.push_front(20);
std::cout << dq[0]; // Prints 20
\`\`\`

> **Rule of Thumb:** Use \`std::vector\` by default. If you need to constantly add/remove from the *front* and the back, use \`std::deque\`. Only use \`std::list\` if you absolutely need to rapidly insert/delete elements in the *middle* of the container.
`,
  starterCode: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    // 1. Create a deque of integers named 'dq'
    
    // 2. Add the numbers 1, 2, 3 to the BACK of the deque
    
    // 3. Add the numbers 0 and -1 to the FRONT of the deque
    // (Hint: push -1, then 0, or just push 0, then push_front -1)
    
    // 4. Print the VERY FIRST element and the VERY LAST element, separated by a space.
    // Use the .front() and .back() methods!
    
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    
    dq.push_back(1);
    dq.push_back(2);
    dq.push_back(3);
    
    dq.push_front(0);
    dq.push_front(-1);
    
    cout << dq.front() << " " << dq.back() << endl;
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '-1 3', description: 'Checks if elements were correctly pushed to the back and front.' }
  ],
  hints: [
    'Use `dq.push_back(X)` and `dq.push_front(X)` respectfully.',
    'Make sure `-1` goes in *after* `0` if you want it to be the new absolute front, or push it first depending on how you think!',
    'Output format: `cout << dq.front() << " " << dq.back() << endl;`'
  ],
  complexity: { time: 'O(1)', space: 'O(N)' },
  tags: ['deque', 'list', 'stl', 'cpp'],
};
export default lesson;
