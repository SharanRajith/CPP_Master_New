const lesson = {
  id: 'm11-l2',
  title: 'Single Number',
  module: 11,
  lessonNumber: 2,
  xpReward: 15,
  leetcodeProblems: [
    { id: 136, title: 'Single Number', url: 'https://leetcode.com/problems/single-number/', difficulty: 'Easy' },
    { id: 137, title: 'Single Number II', url: 'https://leetcode.com/problems/single-number-ii/', difficulty: 'Medium' },
  ],
  content: `# Single Number (The XOR Trick)

Given a non-empty array of integers ` + "`" + `nums` + "`" + `, every element appears **twice** except for one. Find that single one.
You must implement a solution with $O(N)$ runtime complexity and use only $O(1)$ extra space.

## XOR to the Rescue
The XOR (` + "`" + `^` + "`" + `) operator evaluates to 1 if bits differ, and 0 if they match.
Two magical properties of XOR:
1. $A \\oplus 0 = A$
2. $A \\oplus A = 0$

Because XOR is commutative (order doesn't matter), if we XOR every single number in the array together, any numbers that appear twice will $A \\oplus A = 0$ each other out!
The only number remaining will be the single number!

\`\`\`cpp
int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num; 
    }
    return result;
}
\`\`\`

## Single Number II (Appears Thrice)
What if every element appears **three** times except for one? XOR trick fails!
Instead, we can use Bit-level addition.

Because numbers are 32-bit integers, we can loop exactly 32 times (focusing on one bit position at a time).
For a specific bit position, we sum up that bit across all numbers in the array.
If every other number appears 3 times, then the sum of bits at that position MUST be a multiple of 3... **except for the bit belonging to our Single Number!**
So we do ` + "`" + `sum % 3` + "`" + `. If it's not 0, it means our single number has a 1-bit at this position!

\`\`\`cpp
int singleNumberII(vector<int>& nums) {
    int singleNum = 0;
    
    // Loop through all 32 bit slots
    for (int i = 0; i < 32; i++) {
        int sum = 0;
        // Check this specific bit position for all numbers
        for (int num : nums) {
            // (num >> i) shifts the target bit to the rightmost place
            if ((num >> i) & 1) {
                sum++;
            }
        }
        
        // If it isn't divisible by 3, the single number has this bit!
        if (sum % 3 != 0) {
            singleNum = singleNum | (1 << i); // Rebuild the number
        }
    }
    return singleNum; // $O(32 \\times N)$ which is just $O(N)$.
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Implement Single Number I (Elements appear TWICE, one appears ONCE)
// Try to do it with O(1) space!
int singleNumber(vector<int>& nums) {
    int ans = 0;
    
    // TODO: loop through nums and apply continuous XOR
    
    return ans;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    cout << singleNumber(nums) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

int singleNumber(vector<int>& nums) {
    int ans = 0;
    for (int x : nums) {
        ans ^= x;
    }
    return ans;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for(int i=0; i<n; ++i) cin >> nums[i];
    cout << singleNumber(nums) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '5\n4 1 2 1 2', expectedOutput: '4', description: 'Classic XOR reduction test.' },
    { input: '3\n2 2 1', expectedOutput: '1', description: 'Small case.' },
  ],
  hints: [
    '`ans ^= x;` handles the logic perfectly.',
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['bit-manipulation', 'xor', 'array'],
};
export default lesson;
