const lesson = {
  id: 'm1-l14',
  title: 'STL Introduction (vector, pair, auto)',
  module: 1, lessonNumber: 14, xpReward: 10,
  leetcodeProblems: [
    { id: 26, title: 'Remove Duplicates from Sorted Array', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', difficulty: 'Easy' },
    { id: 1, title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy' },
  ],
  content: `# STL Introduction

The **Standard Template Library (STL)** is the backbone of competitive and professional C++ programming. It provides ready-made, highly optimized data structures and algorithms.

## std::vector — Dynamic Array

\`\`\`cpp
#include <vector>
using namespace std;

vector<int> v;               // Empty vector
vector<int> v2(5, 0);       // [0, 0, 0, 0, 0]
vector<int> v3 = {1,2,3};   // Initializer list

// Add/Remove
v3.push_back(4);    // [1, 2, 3, 4]
v3.pop_back();      // [1, 2, 3]
v3.insert(v3.begin()+1, 10); // [1, 10, 2, 3]
v3.erase(v3.begin()+1);      // [1, 2, 3]

// Access
cout << v3[0];          // 1 (no bounds check)
cout << v3.at(0);       // 1 (with bounds check)
cout << v3.front();     // 1 (first element)
cout << v3.back();      // 3 (last element)

// Info
cout << v3.size();      // 3
cout << v3.empty();     // false
v3.clear();             // Remove all elements

// Iterate
for (int i = 0; i < v3.size(); i++) cout << v3[i];
for (int x : v3) cout << x;       // Range-based ✓
for (auto x : v3) cout << x;      // auto ✓
\`\`\`

## Vector of Vectors (2D)

\`\`\`cpp
vector<vector<int>> matrix(3, vector<int>(4, 0));  // 3×4 zeros
matrix[0][0] = 1;
matrix[2][3] = 9;
\`\`\`

## std::pair

\`\`\`cpp
#include <utility>

pair<int, string> p = {1, "Alice"};
cout << p.first;    // 1
cout << p.second;   // Alice

auto p2 = make_pair(3.14, 'A');
\`\`\`

## auto Keyword

Let the compiler deduce the type:

\`\`\`cpp
auto x = 42;             // int
auto pi = 3.14;          // double
auto v = vector<int>();  // vector<int>
auto& ref = v;           // reference to vector<int>
\`\`\`

## Sorting

\`\`\`cpp
#include <algorithm>

vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end());              // [1,2,5,8,9] ascending
sort(v.begin(), v.end(), greater<int>()); // [9,8,5,2,1] descending

// Sort pairs by second element
vector<pair<int,int>> pairs = {{1,3},{2,1},{3,2}};
sort(pairs.begin(), pairs.end(), [](auto& a, auto& b){
    return a.second < b.second;
});
\`\`\`

## Useful STL Algorithms

\`\`\`cpp
#include <algorithm>
#include <numeric>

vector<int> v = {3,1,4,1,5,9,2,6};

auto it = find(v.begin(), v.end(), 4);  // Iterator to 4
int mx = *max_element(v.begin(), v.end());  // 9
int mn = *min_element(v.begin(), v.end());  // 1
int total = accumulate(v.begin(), v.end(), 0);  // Sum = 31
reverse(v.begin(), v.end());
\`\`\`

## Amortized Complexity of vector

| Operation | Average | Worst |
|---|---|---|
| push_back | O(1) amortized | O(n) when resize |
| pop_back | O(1) | O(1) |
| Access [i] | O(1) | O(1) |
| insert at front | O(n) | O(n) |
| sort | O(n log n) | O(n log n) |

> **Why O(1) amortized for push_back?** When vector runs out of capacity, it doubles its size. Most pushes are O(1), but occasional O(n) copies are amortized across many operations.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Read n integers into a vector, sort ascending, print them
    
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    
    // Your code: sort and print
    
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    
    sort(v.begin(), v.end());
    for (int i = 0; i < n; i++) {
        cout << v[i];
        if (i < n-1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
  testCases: [
    { input: '5\n5 2 8 1 9',    expectedOutput: '1 2 5 8 9', description: 'Sort 5 numbers' },
    { input: '3\n3 1 2',        expectedOutput: '1 2 3',     description: 'Sort 3 numbers' },
    { input: '1\n42',           expectedOutput: '42',         description: 'Single element' },
  ],
  hints: [
    'Use `sort(v.begin(), v.end());` to sort in ascending order.',
    'Then loop and print each element with a space between them.',
    'Be careful: no trailing space — use `if (i < n-1) cout << " ";`',
  ],
  complexity: { time: 'O(n log n) for sort', space: 'O(n)' },
  tags: ['STL', 'vector', 'pair', 'auto', 'sort', 'algorithms'],
};
export default lesson;
