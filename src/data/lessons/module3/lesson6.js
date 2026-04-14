const lesson = {
  id: 'm3-l6',
  title: 'std::pair & std::tuple',
  module: 3,
  lessonNumber: 6,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Pairs & Tuples

Sometimes you need to bundle a few pieces of data together, but creating a whole new \`class\` or \`struct\` feels like overkill. The STL provides quick, anonymous data bundles!

## 1. std::pair
A pair bundles exactly **two** values of any data types together. They are heavily used in C++ under the hood (e.g., when you loop through a \`std::map\`, you are actually looping through a collection of \`std::pair<const Key, Value>\` objects!).

\`\`\`cpp
#include <utility>

std::pair<int, std::string> p1 = {1, "Apple"};
// or you can use std::make_pair(1, "Apple")

std::cout << p1.first;  // Prints 1
std::cout << p1.second; // Prints "Apple"
\`\`\`

## 2. std::tuple (C++11)
A tuple is just like a pair, but it can hold **any number** of values!

\`\`\`cpp
#include <tuple>

std::tuple<int, double, std::string> t = {10, 3.14, "Pi"};

// Accessing tuple elements requires std::get (which looks weird!)
std::cout << std::get<0>(t); // 10
std::cout << std::get<2>(t); // "Pi"
\`\`\`

## 3. Structured Bindings (C++17 Magic)
In modern C++17, you no longer have to use \`.first\`, \`.second\`, or \`std::get\`. You can automatically "unpack" pairs and tuples directly into named variables! This makes code incredibly clean.

\`\`\`cpp
std::pair<int, int> coordinates = {5, 10};

// Unpacking directly!
auto [x, y] = coordinates;

std::cout << x; // 5
std::cout << y; // 10
\`\`\`
`,
  starterCode: `#include <iostream>
#include <utility>
#include <vector>
using namespace std;

int main() {
    // 1. Create a pair of <int, int> containing (10, 20)
    // auto myPair = ...
    
    // 2. Use C++17 structured bindings to unpack the pair into variables x and y
    // auto [x, y] = ...
    
    // 3. Print their product
    // cout << ... << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <utility>
using namespace std;

int main() {
    pair<int, int> myPair = {10, 20};
    auto [x, y] = myPair;
    cout << x * y << endl;
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '200', description: 'Properly unpacks the pair using structured bindings and multiplies the components.' }
  ],
  hints: [
    '`pair<int, int> myPair = {10, 20};`',
    '`auto [x, y] = myPair;`',
    '`cout << (x * y) << endl;`'
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['pair', 'tuple', 'c++17', 'structured-bindings'],
};
export default lesson;
