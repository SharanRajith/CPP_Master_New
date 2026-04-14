const lesson = {
  id: 'm3-l10',
  title: 'Bit Manipulation Hacks',
  module: 3,
  lessonNumber: 10,
  xpReward: 10,
  leetcodeProblems: [
    {
      id: 136,
      title: "Single Number",
      difficulty: "Easy",
      url: "https://leetcode.com/problems/single-number/"
    },
    {
      id: 191,
      title: "Number of 1 Bits",
      difficulty: "Easy",
      url: "https://leetcode.com/problems/number-of-1-bits/"
    }
  ],
  content: `# Bit Manipulation

In highly optimized, low-level algorithms (and extreme FAANG optimization rounds), directly manipulating the binary bits of an integer is required.

## The Bitwise Operators

- **AND (\`&\`)**: 1 if both bits are 1. Useful for masking.
- **OR (\`|\`)**: 1 if either bit is 1. Useful for turning bits on.
- **XOR (\`^\`)**: 1 if bits are *different*. Crucial property: \`A ^ A = 0\`!
- **Left Shift (\`<< X\`)**: Multiplies a number by $2^X$.
- **Right Shift (\`>> X\`)**: Divides a number by $2^X$.

## Check If Even or Odd
Instead of doing \`num % 2 != 0\`, you can check the very last binary bit! If it's a \`1\`, the number is odd.
\`\`\`cpp
if (num & 1) { 
    // It is Odd!
}
\`\`\`

## The XOR Trick (Single Number)
XOR (\`^\`) cancels out duplicate numbers! 
\`\`\`cpp
5 ^ 5 = 0;
0 ^ 9 = 9;
\`\`\`
If you have an array where every number appears twice except for one number, you can find the unique number by XOR'ing all of them together. The duplicates will cancel each other out to zero!

## Built-in Functions
C++ GCC compilers give a massive cheat code to count how many \`1\` bits are inside an integer:
\`\`\`cpp
int x = 7; // Binary 0111
int ones = __builtin_popcount(x); // Returns 3
\`\`\`
`,
  starterCode: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {4, 1, 2, 1, 2}; // 4 is the only number that occurs once!
    int uniqueNum = 0;
    
    // TODO: Find the unique number using a loop and the XOR '^' operator
    
    
    cout << uniqueNum << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {4, 1, 2, 1, 2};
    int uniqueNum = 0;
    
    for (int num : arr) {
        uniqueNum ^= num;
    }
    
    cout << uniqueNum << endl;
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '4', description: 'Successfully utilizes bitwise XOR to cancel out duplicates.' }
  ],
  hints: [
    'Use a loop to go through the array.',
    'Inside the loop, update the unique number: `uniqueNum = uniqueNum ^ num;` (or `uniqueNum ^= num`)'
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['bit-manipulation', 'xor', 'math', 'optimization'],
};
export default lesson;
