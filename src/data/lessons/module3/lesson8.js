const lesson = {
  id: 'm3-l8',
  title: 'String Algorithms',
  module: 3,
  lessonNumber: 8,
  xpReward: 10,
  content: `# String Algorithms

\`std::string\` is essentially a \`std::vector<char>\` with string-specific methods added. It supports iterators, \`size()\`, \`push_back\`, and all the \`<algorithm>\` functions.

---

## Essential std::string Methods

### Length and access

\`\`\`cpp
std::string s = "Hello, World!";
s.size();         // 13  (same as s.length())
s[0];             // 'H'
s.front();        // 'H'
s.back();         // '!'
s.empty();        // false
\`\`\`

### substr

Extract a substring starting at \`pos\` with \`len\` characters.

\`\`\`cpp
std::string s = "Hello, World!";
std::string sub = s.substr(7, 5);  // "World"
// substr(pos)           → from pos to end
// substr(pos, len)      → len chars starting at pos
\`\`\`

### find

Returns the index of the first occurrence, or \`std::string::npos\` if not found.

\`\`\`cpp
size_t idx = s.find("World");
if (idx != std::string::npos) {
    std::cout << "Found at " << idx;  // 7
}

// find from a position:
size_t idx2 = s.find('l', 4);  // search from index 4 → 10

// rfind — search backwards:
size_t last = s.rfind('l');  // 10
\`\`\`

### Concatenation and append

\`\`\`cpp
std::string a = "Hello";
a += ", World";    // operator+=  O(n)
a.append("!");     // same as +=
a.push_back('?');  // append single char
\`\`\`

### replace and erase

\`\`\`cpp
s.replace(7, 5, "C++");    // replaces 5 chars at pos 7 with "C++"
s.erase(0, 7);              // remove first 7 chars
\`\`\`

### compare and relational operators

\`\`\`cpp
std::string a = "apple", b = "banana";
if (a < b) std::cout << "apple comes first";  // lexicographic comparison
\`\`\`

---

## Character Classification (\`<cctype>\`)

\`\`\`cpp
#include <cctype>
char c = 'A';
std::isupper(c);   // true
std::islower(c);   // false
std::isdigit(c);   // false
std::isalpha(c);   // true
std::isalnum(c);   // true
std::tolower(c);   // 'a'
std::toupper('z'); // 'Z'
\`\`\`

---

## Algorithms on Strings

Because \`std::string\` provides random-access iterators, all \`<algorithm>\` functions work on it:

\`\`\`cpp
#include <algorithm>
std::string t = "racecar";
std::reverse(t.begin(), t.end());   // "racecar" (palindrome)
std::sort(t.begin(), t.end());       // "aacerr" (sort chars)
int cnt = std::count(t.begin(), t.end(), 'a'); // 2
\`\`\`

---

## std::stringstream — Parsing and Conversion

\`std::stringstream\` (from \`<sstream>\`) lets you treat a string like a stream for easy tokenisation and type conversion.

\`\`\`cpp
#include <sstream>

// Split by whitespace:
std::string sentence = "one two three";
std::stringstream ss(sentence);
std::string word;
while (ss >> word) std::cout << word << "\\n";

// Integer to string:
int n = 42;
std::string str = std::to_string(n);

// String to integer:
int m = std::stoi("123");
double d = std::stod("3.14");
\`\`\`

---

## Complexity Reference

| Operation | Time | Notes |
|-----------|------|-------|
| \`s[i]\` / \`s.at(i)\` | O(1) | |
| \`find(sub)\` | O(n·m) | n=string length, m=pattern length |
| \`substr(pos, len)\` | O(len) | Copies characters |
| \`+\` concatenation | O(n+m) | Creates new string |
| \`+=\` append | O(k) amortized | Like vector push_back |
| \`reverse\` / \`sort\` | O(n) / O(n log n) | Via \`<algorithm>\` |

---

## Full Example — Reverse Words

\`\`\`cpp
#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <algorithm>

int main() {
    std::string sentence = "hello world cpp";
    std::stringstream ss(sentence);
    std::vector<std::string> words;
    std::string w;
    while (ss >> w) words.push_back(w);
    std::reverse(words.begin(), words.end());
    for (int i = 0; i < (int)words.size(); ++i) {
        if (i) std::cout << " ";
        std::cout << words[i];
    }
    std::cout << "\\n";
    // Output: cpp world hello
    return 0;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string paragraph = "Welcome to the C++ DSA Platform!";

    // TODO:
    // 1. Extract the substring "C++" using substr().
    //    It starts at index 15 and has length 3.
    // 2. Reverse the extracted string in-place using std::reverse.
    // 3. Print the result.
    // Expected output: ++C

    return 0;
}
`,
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
}
`,
  testCases: [
    {
      input: '',
      expectedOutput: '++C',
      description: 'Extracts "C++" at index 15 and reverses it to "++C"',
    },
  ],
  hints: [
    'Use paragraph.substr(15, 3) to extract 3 characters starting at index 15.',
    'Call reverse(lang.begin(), lang.end()) to reverse the string in-place.',
    'Print the reversed string with cout << lang << endl;',
  ],
  complexity: {
    time: 'O(n) for substr (copies n chars); O(k) for reverse (k = substr length)',
    space: 'O(k) for the extracted substring',
    notes: 'std::string::find is O(n*m) naive; for production use KMP or std::boyer_moore_searcher (C++17).',
  },
  leetcodeProblems: [
    { id: 344, title: 'Reverse String', difficulty: 'Easy', url: 'https://leetcode.com/problems/reverse-string/' },
    { id: 125, title: 'Valid Palindrome', difficulty: 'Easy', url: 'https://leetcode.com/problems/valid-palindrome/' },
    { id: 151, title: 'Reverse Words in a String', difficulty: 'Medium', url: 'https://leetcode.com/problems/reverse-words-in-a-string/' },
    { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
  ],
  tags: ['stl', 'string', 'substr', 'find', 'reverse', 'stringstream'],
};
export default lesson;
