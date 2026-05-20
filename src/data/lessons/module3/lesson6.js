const lesson = {
  id: 'm3-l6',
  title: 'pair & tuple',
  module: 3,
  lessonNumber: 6,
  xpReward: 10,
  content: `# pair & tuple

Sometimes you need to bundle two or three values together without creating a full \`struct\` or \`class\`. The STL provides lightweight, generic bundles: \`std::pair\` and \`std::tuple\`.

---

## std::pair

\`std::pair<T1, T2>\` holds exactly **two** values of (potentially different) types. It lives in \`<utility>\`.

\`\`\`cpp
#include <utility>
#include <string>

std::pair<int, std::string> p1 = {1, "apple"};
// Alternative construction:
auto p2 = std::make_pair(2, "banana");

std::cout << p1.first;   // 1
std::cout << p1.second;  // apple
\`\`\`

### Pair comparison

Pairs are compared **lexicographically**: first by \`first\`, then by \`second\`. This makes them directly sortable:

\`\`\`cpp
std::vector<std::pair<int,int>> edges = {{3,5},{1,2},{3,1}};
std::sort(edges.begin(), edges.end());
// Sorted: {1,2}, {3,1}, {3,5}
\`\`\`

### Pairs inside maps

When you iterate a \`std::map\`, each element is a \`std::pair<const Key, Value>\`:

\`\`\`cpp
std::map<std::string, int> m = {{"a", 1}, {"b", 2}};
for (auto& p : m) {
    std::cout << p.first << "=" << p.second << " ";
}
// a=1 b=2
\`\`\`

---

## std::tuple

\`std::tuple<T1, T2, ...>\` holds **any number** of values. It lives in \`<tuple>\`.

\`\`\`cpp
#include <tuple>

std::tuple<int, double, std::string> t = {42, 3.14, "pi"};

// Access by compile-time index:
std::cout << std::get<0>(t);  // 42
std::cout << std::get<1>(t);  // 3.14
std::cout << std::get<2>(t);  // pi
\`\`\`

### Constructing tuples

\`\`\`cpp
auto t2 = std::make_tuple(1, 2.5, 'x');
\`\`\`

### std::tie — unpack into existing variables

\`\`\`cpp
int a; double b; std::string c;
std::tie(a, b, c) = t;
\`\`\`

---

## C++17 Structured Bindings

The cleanest modern syntax — works for \`pair\`, \`tuple\`, arrays, and structs:

\`\`\`cpp
// pair
auto [x, y] = std::make_pair(10, 20);
std::cout << x * y;  // 200

// tuple
auto [id, price, name] = std::make_tuple(7, 9.99, "Book");
std::cout << name;   // Book

// map iteration
std::map<std::string, int> m = {{"a", 1}, {"b", 2}};
for (auto& [key, val] : m) {
    std::cout << key << ":" << val << " ";
}
\`\`\`

---

## Practical patterns

### Returning multiple values from a function

\`\`\`cpp
std::pair<int,int> minMax(std::vector<int>& v) {
    return {*std::min_element(v.begin(), v.end()),
            *std::max_element(v.begin(), v.end())};
}
auto [lo, hi] = minMax(v);
\`\`\`

### Sorting by secondary key

\`\`\`cpp
// Sort people by (age DESC, name ASC)
std::vector<std::pair<int,std::string>> people = {{25,"Bob"},{25,"Alice"},{30,"Eve"}};
std::sort(people.begin(), people.end(), [](auto& a, auto& b){
    if (a.first != b.first) return a.first > b.first; // age desc
    return a.second < b.second;                         // name asc
});
\`\`\`

---

## Complexity

All operations on \`pair\` and \`tuple\` (construction, access, comparison) are **O(1)** because the number of elements is fixed at compile time.
`,
  starterCode: `#include <iostream>
#include <utility>
using namespace std;

int main() {
    // TODO: Create a pair<int, int> with values (10, 20).
    // Use C++17 structured bindings to unpack it into variables x and y.
    // Print the product x * y.
    // Expected output: 200

    return 0;
}
`,
  modelAnswer: `#include <iostream>
#include <utility>
using namespace std;

int main() {
    pair<int, int> myPair = {10, 20};
    auto [x, y] = myPair;
    cout << x * y << endl;
    return 0;
}
`,
  testCases: [
    {
      input: '',
      expectedOutput: '200',
      description: 'Unpacks pair (10,20) with structured bindings and prints product 200',
    },
  ],
  hints: [
    'Declare: pair<int, int> myPair = {10, 20};',
    'Use structured binding: auto [x, y] = myPair;',
    'Print the result: cout << x * y << endl;',
  ],
  complexity: {
    time: 'O(1) for all pair/tuple construction and access',
    space: 'O(1)',
    notes: 'pair and tuple sizes are fixed at compile time; no heap allocation is involved.',
  },
  leetcodeProblems: [
    { id: 1229, title: 'Meeting Scheduler', difficulty: 'Medium', url: 'https://leetcode.com/problems/meeting-scheduler/' },
    { id: 973, title: 'K Closest Points to Origin', difficulty: 'Medium', url: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
    { id: 56, title: 'Merge Intervals', difficulty: 'Medium', url: 'https://leetcode.com/problems/merge-intervals/' },
  ],
  tags: ['stl', 'pair', 'tuple', 'structured-bindings', 'c++17'],
};
export default lesson;
