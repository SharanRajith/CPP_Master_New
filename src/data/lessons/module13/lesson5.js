const lesson = {
  id: 'm13-l5',
  title: 'Apple: Product of Array Except Self',
  module: 13,
  lessonNumber: 5,
  xpReward: 20,
  leetcodeProblems: [
    { id: 238, title: 'Product of Array Except Self', url: 'https://leetcode.com/problems/product-of-array-except-self/', difficulty: 'Medium' },
  ],
  content: `# Apple: Product of Array Except Self

This is a classic problem that tests if you understand Prefix mathematics conceptually.
Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` **except** \`nums[i]\`.
You **must** write an algorithm that runs in $O(N)$ time and **without using the division operation**.

## Why not Division?
If you just multiply all numbers together and then divide by ` + "`" + `nums[i]` + "`" + `, what happens if ` + "`" + `nums[i] == 0` + "`" + `? You get a divide by zero error! You'd have to write weird edge case handling for arrays with 1 zero, and 2 zeroes. Division is messy.

## The Prefix/Suffix Approach
For any given index $i$, the "product of array except $i$" is simply:
\`(Product of all numbers to the LEFT of $i$)  *  (Product of all numbers to the RIGHT of $i$)\`

Normally, you would build a ` + "`" + `prefix_product` + "`" + ` array and a ` + "`" + `suffix_product` + "`" + ` array.
But we can do it in $O(1)$ extra space by building the result array directly!

### The Two-Pass $O(1)$ Strategy
1. **Left-to-Right Pass:** 
   Initialize your ` + "`" + `res` + "`" + ` array with $1$. 
   Maintain a running ` + "`" + `leftMult` + "`" + ` variable.
   For each element, store ` + "`" + `leftMult` + "`" + ` inside ` + "`" + `res[i]` + "`" + `, then multiply ` + "`" + `leftMult` + "`" + ` by ` + "`" + `nums[i]` + "`" + `.
   Now ` + "`" + `res[i]` + "`" + ` holds the product of all elements to the left of $i$.

2. **Right-to-Left Pass:**
   Maintain a running ` + "`" + `rightMult` + "`" + ` variable (starts at 1).
   Loop backwards from $N-1$ down to 0.
   Multiply ` + "`" + `res[i]` + "`" + ` by ` + "`" + `rightMult` + "`" + `! Then multiply ` + "`" + `rightMult` + "`" + ` by ` + "`" + `nums[i]` + "`" + `.
   Now ` + "`" + `res[i]` + "`" + ` holds ` + "`" + `LEFT * RIGHT` + "`" + `!

\`\`\`cpp
vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, 1);
    
    // First pass
    int leftMult = 1;
    for (int i = 0; i < n; i++) {
        res[i] = leftMult;
        leftMult *= nums[i]; 
    }
    
    // Second pass
    int rightMult = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= rightMult;
        rightMult *= nums[i];
    }
    
    return res;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, 1);
    
    // TODO: Write Left-To-Right pass
    // int leftMult = 1;
    // loop i from 0 to n-1
    // res[i] = leftMult; leftMult *= nums[i];
    
    
    // TODO: Write Right-To-Left pass
    // int rightMult = 1;
    // loop i from n-1 down to 0
    // res[i] *= rightMult; rightMult *= nums[i];
    
    return res;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    vector<int> res = productExceptSelf(nums);
    for (int x : res) cout << x << " ";
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, 1);
    
    int leftMult = 1;
    for (int i = 0; i < n; i++) {
        res[i] = leftMult;
        leftMult *= nums[i];
    }
    
    int rightMult = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= rightMult;
        rightMult *= nums[i];
    }
    
    return res;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    vector<int> res = productExceptSelf(nums);
    for (int x : res) cout << x << " ";
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4\n1 2 3 4', expectedOutput: '24 12 8 6 ', description: 'Classic testcase.' },
    { input: '5\n-1 1 0 -3 3', expectedOutput: '0 0 9 0 0 ', description: 'Zero handling natively succeeds without exceptions.' },
  ],
  hints: [
    '`res[i] *= rightMult;` is a multiplication assignment, because `res[i]` already holds the left prefix block!',
  ],
  complexity: { time: 'O(N)', space: 'O(1) (Result array does not count as extra space)' },
  tags: ['arrays', 'prefix-sum', 'apple'],
};
export default lesson;
