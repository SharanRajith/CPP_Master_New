const lesson = {
  id: 'm3-l8',
  title: 'String Algorithms & Manipulation',
  module: 3,
  lessonNumber: 8,
  xpReward: 10,
  leetcodeProblems: [
    {
      id: 344,
      title: "Reverse String",
      difficulty: "Easy",
      url: "https://leetcode.com/problems/reverse-string/"
    },
    {
      id: 125,
      title: "Valid Palindrome",
      difficulty: "Easy",
      url: "https://leetcode.com/problems/valid-palindrome/"
    }
  ],
  content: `# Strings in C++

A \`std::string\` is just an array of characters under the hood. Therefore, it supports almost everything a \`std::vector\` supports, including iterators!

## 1. Substrings

You can extract a chunk of a string using \`.substr(startIndex, length)\`.
\`\`\`cpp
std::string s = "Hello World";
std::string sub = s.substr(6, 5); // Start at index 6, grab 5 characters
std::cout << sub; // "World"
\`\`\`

## 2. Searching

Finding substrings or characters is incredibly common. \`.find()\` returns the index of the first occurrence. If it *doesn't* find the substring, it returns a special constant called \`std::string::npos\`.

\`\`\`cpp
size_t idx = s.find("World");
if (idx != std::string::npos) {
    std::cout << "Found at index: " << idx;
}
\`\`\`

## 3. Reversing a String

Instead of writing a manual two-pointer swap loop, you can just use the \`std::reverse\` algorithm from the \`<algorithm>\` library directly on the string!

\`\`\`cpp
#include <algorithm>

std::string myStr = "racecar";
std::reverse(myStr.begin(), myStr.end());
\`\`\`

> **Character Manipulation:** Include the \`<cctype>\` header to use built-in C-functions like \`isdigit(c)\`, \`isalpha(c)\`, \`tolower(c)\`, and \`toupper(c)\`. These are essential for parsing problems!
`,
  starterCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string paragraph = "Welcome to the C++ DSA Platform!";
    
    // 1. Extract the word "C++" using .substr() (Hint: it starts at index 15, length 3)
    string lang = ""; // TODO
    
    
    // 2. Reverse the extracted string 'lang' IN-PLACE using std::reverse
    // (It should become "++C")
    
    
    cout << lang << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string paragraph = "Welcome to the C++ DSA Platform!";
    
    string lang = paragraph.substr(15, 3);
    reverse(lang.begin(), lang.end());
    
    cout << lang << endl;
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '++C', description: 'Accurately slices the string and reverses the extraction.' }
  ],
  hints: [
    '`string lang = paragraph.substr(15, 3);`',
    '`reverse(lang.begin(), lang.end());`'
  ],
  complexity: { time: 'O(N)', space: 'O(N)' },
  tags: ['string', 'substr', 'reverse', 'stl'],
};
export default lesson;
