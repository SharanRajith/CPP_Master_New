const lesson = {
  id: 'm3-l9',
  title: 'Custom Comparators & Lambdas',
  module: 3,
  lessonNumber: 9,
  xpReward: 10,
  leetcodeProblems: [
    {
      id: 973,
      title: "K Closest Points to Origin",
      difficulty: "Medium",
      url: "https://leetcode.com/problems/k-closest-points-to-origin/"
    }
  ],
  content: `# Custom Comparators & Lambdas

Sorting an array of integers is easy (\`std::sort\`). But what if you have an array of custom Objects (like \`Student\` classes or 2D \`std::pair\` coordinates) and you want to sort them by a specific rule?

## The Lambda Function

A Lambda is an "anonymous function" that you can write directly inside other functions. It's incredibly useful for defining quick sorting rules on the fly!

**Syntax:** \`[](Type a, Type b) { return ... }\`

\`\`\`cpp
std::vector<int> v = {4, 1, 3, 2};

// Sort DESCENDING instead of ascending!
std::sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;  // "Element 'a' should come BEFORE 'b' if 'a' is greater than 'b'"
});
\`\`\`

## Sorting Custom Objects

Imagine you have a vector of pairs, representing \`(x, y)\` coordinates. You want to sort them based purely on their \`y\` values.

\`\`\`cpp
#include <vector>
#include <utility>
#include <algorithm>

std::vector<std::pair<int, int>> points = {{1, 5}, {4, 2}, {3, 9}};

// Sort based on the SECOND element of the pair
std::sort(points.begin(), points.end(), [](std::pair<int,int> p1, std::pair<int,int> p2) {
    return p1.second < p2.second; 
});

// Result order: {4, 2}, {1, 5}, {3, 9}
\`\`\`

> **Capture Clause:** The \`[]\` at the beginning of a lambda is called the capture clause. If you put \`[&]\` inside it, your lambda can magically view and modify any variables outside of it!
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
    
    // TODO: Use std::sort and a lambda comparator to sort the students 
    // in DESCENDING order of their score. (Highest score first!)
    
    
    
    // Print the name of the student who is first in the sorted array
    cout << students[0].name << endl;
    return 0;
}`,
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
}`,
  testCases: [
    { input: '', expectedOutput: 'Charlie', description: 'Accurately sorts struct objects descending by member property.' }
  ],
  hints: [
    'The 3rd argument to sort should be: `[](Student a, Student b) { return a.score > b.score; }`',
    '`return a > b` enforces descending order.'
  ],
  complexity: { time: 'O(N log N)', space: 'O(1)' },
  tags: ['sorting', 'lambda', 'comparator', 'stl'],
};
export default lesson;
