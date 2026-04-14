const lesson = {
  id: 'm3-l5',
  title: 'Maps & Hash Maps',
  module: 3,
  lessonNumber: 5,
  xpReward: 10,
  leetcodeProblems: [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      url: "https://leetcode.com/problems/two-sum/"
    }
  ],
  content: `# Maps & Hash Maps

A **Map** (often called a Dictionary or Associative Array) stores elements as **Key-Value pairs**. 

Imagine a phonebook: The person's name is the *Key*, and their phone number is the *Value*. Keys are always unique!

Just like Sets, C++ provides two main variants:

## 1. std::map (Ordered Map)
Implemented as a Binary Search Tree. 
- Keys are sorted automatically.
- Lookups take $O(\\log N)$ time.

\`\`\`cpp
#include <map>
std::map<std::string, int> ages; // Key=string, Value=int

ages["Alice"] = 25;
ages["Bob"] = 30;

std::cout << ages["Alice"]; // Fast $O(\\log N)$ lookup! Prints 25.
\`\`\`

## 2. std::unordered_map (Hash Map)
Implemented as a Hash Table. **This is the most important data structure for LeetCode.**
- Keys are NOT sorted.
- Lookups, insertions, and deletions take **$O(1)$ average time!**

\`\`\`cpp
#include <unordered_map>
std::unordered_map<char, int> freq;

freq['A'] = 5;
freq['A']++; // In C++, if a key doesn't exist, doing operator[] creates it automatically with a default value (0 for ints)!

std::cout << freq['A']; // Prints 6
\`\`\`

> **The Power of Maps:** Maps are frequently used to count character frequencies in strings, or to "remember" numbers we have seen in the past (like in the famous Two Sum problem!).
`,
  starterCode: `#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    string text = "abracadabra";
    unordered_map<char, int> charCounts;
    
    // TODO: Write a loop to count the frequency of each character in the string.
    
    
    // Print the frequency of 'a' and 'b'
    cout << charCounts['a'] << " " << charCounts['b'] << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    string text = "abracadabra";
    unordered_map<char, int> charCounts;
    
    for (char c : text) {
        charCounts[c]++;
    }
    
    cout << charCounts['a'] << " " << charCounts['b'] << endl;
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '5 2', description: 'Correctly tallies the frequency map.' }
  ],
  hints: [
    'Use `for (char c : text)` to loop through the string.',
    'Inside the loop, simply do `charCounts[c]++;`. C++ handles initializing the counter to zero for you!'
  ],
  complexity: { time: 'O(N)', space: 'O(N)' },
  tags: ['map', 'unordered_map', 'hash-table', 'stl', 'arrays'],
};
export default lesson;
