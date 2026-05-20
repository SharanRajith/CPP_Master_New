const lesson = {
  id: 'm3-l9',
  title: 'Custom Comparators & Lambdas',
  module: 3,
  lessonNumber: 9,
  xpReward: 10,
  content: `# Custom Comparators & Lambdas

By default \`std::sort\` sorts in ascending order and \`std::priority_queue\` is a max-heap. **Custom comparators** let you redefine what "less than" means, so you can sort structs, sort descending, or build custom heaps.

---

## Lambda Functions

A **lambda** is an anonymous function you write inline. The general syntax is:

\`\`\`cpp
[capture](parameters) -> return_type { body }
\`\`\`

The return type is usually omitted (inferred). The capture clause \`[]\` controls which outer variables the lambda can see.

\`\`\`cpp
auto add = [](int a, int b) { return a + b; };
std::cout << add(3, 4);  // 7
\`\`\`

### Capture clause options

| Syntax | Meaning |
|--------|---------|
| \`[]\` | Capture nothing |
| \`[=]\` | Capture all by value |
| \`[&]\` | Capture all by reference |
| \`[x]\` | Capture \`x\` by value |
| \`[&x]\` | Capture \`x\` by reference |

\`\`\`cpp
int threshold = 10;
auto above = [threshold](int x) { return x > threshold; };
// above can use threshold because it's captured by value
\`\`\`

---

## Custom Comparator with std::sort

A comparator is a callable that takes two elements and returns \`true\` if the first should come **before** the second.

### Descending sort

\`\`\`cpp
std::vector<int> v = {4, 1, 3, 2};
std::sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;  // put larger elements first
});
// v = {4, 3, 2, 1}
\`\`\`

### Sort by struct member

\`\`\`cpp
struct Student { std::string name; int score; };

std::vector<Student> students = {{"Alice",95}, {"Bob",82}, {"Charlie",100}};

// Sort by score descending, then by name ascending on tie
std::sort(students.begin(), students.end(), [](const Student& a, const Student& b) {
    if (a.score != b.score) return a.score > b.score;
    return a.name < b.name;
});
// Order: Charlie(100), Alice(95), Bob(82)
\`\`\`

### Sort pairs by second element

\`\`\`cpp
std::vector<std::pair<int,int>> pts = {{1,5},{4,2},{3,9}};
std::sort(pts.begin(), pts.end(), [](auto& a, auto& b) {
    return a.second < b.second;
});
// pts = {{4,2},{1,5},{3,9}}
\`\`\`

---

## Custom Comparator with priority_queue

For \`priority_queue\` the comparator works **opposite** to what you might expect: returning \`true\` means the first element has **lower** priority (is popped later).

\`\`\`cpp
// Min-heap using lambda:
auto cmp = [](int a, int b) { return a > b; };  // larger value = lower priority
std::priority_queue<int, std::vector<int>, decltype(cmp)> minHeap(cmp);
minHeap.push(5); minHeap.push(1); minHeap.push(3);
std::cout << minHeap.top();  // 1 (smallest)
\`\`\`

Alternatively use the built-in: \`std::priority_queue<int, std::vector<int>, std::greater<int>>\`.

---

## Function Objects (Functors)

Before C++11 lambdas, comparators were written as structs with \`operator()\`:

\`\`\`cpp
struct ByScore {
    bool operator()(const Student& a, const Student& b) const {
        return a.score > b.score;
    }
};
std::sort(students.begin(), students.end(), ByScore{});
\`\`\`

Functors are still useful when the comparator needs to be stored or passed as a template parameter.

---

## std::function — Storing Lambdas

\`\`\`cpp
#include <functional>
std::function<bool(int,int)> cmpFn = [](int a, int b){ return a < b; };
\`\`\`

---

## Complexity

Sorting with a custom comparator is still **O(n log n)**; the comparator itself is called O(n log n) times and should be O(1).

---

## Full Example

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>

struct Student { std::string name; int score; };

int main() {
    std::vector<Student> students = {{"Alice",95},{"Bob",82},{"Charlie",100}};
    std::sort(students.begin(), students.end(), [](const Student& a, const Student& b){
        return a.score > b.score;
    });
    std::cout << students[0].name << "\\n";  // Charlie
    return 0;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {
        {"Alice", 95}, {"Bob", 82}, {"Charlie", 100}
    };

    // TODO: Use std::sort with a lambda comparator to sort students
    // in DESCENDING order of score (highest score first).
    // Then print the name of the student at index 0.
    // Expected output: Charlie

    cout << students[0].name << endl;
    return 0;
}
`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {
        {"Alice", 95}, {"Bob", 82}, {"Charlie", 100}
    };

    sort(students.begin(), students.end(), [](const Student& a, const Student& b) {
        return a.score > b.score;
    });

    cout << students[0].name << endl;
    return 0;
}
`,
  testCases: [
    {
      input: '',
      expectedOutput: 'Charlie',
      description: 'After sorting by score descending, Charlie (100) is first',
    },
  ],
  hints: [
    'The third argument to sort is a lambda: [](const Student& a, const Student& b) { ... }',
    'To sort descending, return a.score > b.score; inside the lambda.',
    'After sorting, students[0] is the student with the highest score — print students[0].name.',
  ],
  complexity: {
    time: 'O(n log n) — same as std::sort; the comparator is called O(n log n) times',
    space: 'O(log n) stack for sort',
    notes: 'Comparator must be a strict weak ordering: irreflexive, asymmetric, transitive. Violating this causes undefined behaviour.',
  },
  leetcodeProblems: [
    { id: 973, title: 'K Closest Points to Origin', difficulty: 'Medium', url: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
    { id: 179, title: 'Largest Number', difficulty: 'Medium', url: 'https://leetcode.com/problems/largest-number/' },
    { id: 1235, title: 'Maximum Profit in Job Scheduling', difficulty: 'Hard', url: 'https://leetcode.com/problems/maximum-profit-in-job-scheduling/' },
    { id: 937, title: 'Reorder Data in Log Files', difficulty: 'Medium', url: 'https://leetcode.com/problems/reorder-data-in-log-files/' },
  ],
  tags: ['stl', 'lambda', 'comparator', 'sort', 'priority-queue', 'functor'],
};
export default lesson;
