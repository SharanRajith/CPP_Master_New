const lesson = {
  id: 'm1-l13',
  title: 'Strings (C-style & std::string)',
  module: 1, lessonNumber: 13, xpReward: 10,
  leetcodeProblems: [
    { id: 125, title: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/', difficulty: 'Easy' },
    { id: 344, title: 'Reverse String', url: 'https://leetcode.com/problems/reverse-string/', difficulty: 'Easy' },
  ],
  content: `# Strings in C++

C++ has two string systems: the older C-style char arrays and the modern \`std::string\`.

## C-style Strings (char arrays)

\`\`\`cpp
#include <cstring>

char cs[20] = "Hello";    // Array of chars ending with \\0
char cs2[] = {'H','i','\\0'};

cout << strlen(cs);       // 5 (length, not counting \\0)
strcpy(cs, "World");      // Copy string (buffer overflow risk!)
strcat(cs, "!!!");        // Concatenate (risky!)
strcmp("abc", "abd");     // < 0 (lexicographically less)
\`\`\`

> **Avoid C-style strings** — they're error-prone. Use \`std::string\` instead.

## std::string

\`\`\`cpp
#include <string>
using namespace std;

string s = "Hello, World!";
string empty = "";
string s2(5, 'x');    // "xxxxx" — repeat constructor

// Size
cout << s.size();      // 13
cout << s.length();    // 13 (same as size())
cout << s.empty();     // false

// Access
cout << s[0];          // 'H'
cout << s.at(1);       // 'e' (with bounds checking)
cout << s.front();     // 'H'
cout << s.back();      // '!'

// Modifying
s += " Hi!";           // Concatenation
s.push_back('?');      // Append char
s.pop_back();          // Remove last char
s.insert(5, " Big");   // Insert at position
s.erase(5, 4);         // Erase 4 chars starting at 5
\`\`\`

## Substring & Search

\`\`\`cpp
string s = "Hello, World!";

// Substring
string sub = s.substr(7, 5);     // "World" (start=7, length=5)

// Find
size_t pos = s.find("World");    // 7 (index)
if (pos != string::npos) {
    cout << "Found at " << pos;
}

// Replace
s.replace(7, 5, "C++");  // "Hello, C++!"

// Find last
s.rfind('l');             // Last position of 'l'
\`\`\`

## String ↔ Number Conversions

\`\`\`cpp
// String to number
string numStr = "42";
int i = stoi(numStr);      // string to int
double d = stod("3.14");   // string to double
long long l = stoll("123456789012345");

// Number to string
string s1 = to_string(42);     // "42"
string s2 = to_string(3.14);   // "3.140000"
\`\`\`

## stringstream

\`\`\`cpp
#include <sstream>

// Build strings
stringstream ss;
ss << "Name: " << "Alice" << ", Age: " << 25;
string result = ss.str();  // "Name: Alice, Age: 25"

// Parse space-separated values
string line = "10 20 30";
istringstream iss(line);
int a, b, c;
iss >> a >> b >> c;   // a=10, b=20, c=30
\`\`\`

## String Comparison

\`\`\`cpp
string a = "apple", b = "banana";
if (a < b) cout << "apple comes first";    // ✓ lexicographic
if (a == "apple") cout << "match";          // ✓
\`\`\`

## Iterate Over String

\`\`\`cpp
string s = "Hello";
for (char c : s) cout << c << " ";    // H e l l o
for (int i = 0; i < s.size(); i++) cout << s[i];
\`\`\`

## Common Mistakes 🚨

- **Signed/unsigned comparison** — \`s.size()\` returns \`size_t\` (unsigned); compare with other \`size_t\` or cast
- **s.find() returning npos** — always check \`!= string::npos\`
- **Modifying string while iterating** — use index-based loop or copy
`,
  starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Read a string, print it reversed
    string s;
    cin >> s;
    
    // Your code here
    
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    reverse(s.begin(), s.end());
    cout << s << endl;
    return 0;
}`,
  testCases: [
    { input: 'hello',   expectedOutput: 'olleh',   description: 'Reverse "hello"' },
    { input: 'abcde',   expectedOutput: 'edcba',   description: 'Reverse "abcde"' },
    { input: 'racecar', expectedOutput: 'racecar',  description: 'Palindrome unchanged' },
  ],
  hints: [
    'Include `<algorithm>` for the `reverse()` function.',
    '`reverse(s.begin(), s.end())` reverses the string in-place.',
    'Alternatively, loop from back to front: `for (int i = s.size()-1; i >= 0; i--) cout << s[i];`',
  ],
  complexity: { time: 'O(n)', space: 'O(1)' },
  tags: ['strings', 'std::string', 'stringstream', 'substr'],
};
export default lesson;
