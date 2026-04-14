const lesson = {
  id: 'm4-l1',
  title: 'Two-Pointer Technique',
  module: 4,
  lessonNumber: 1,
  xpReward: 10,
  leetcodeProblems: [
    { id: 167, title: 'Two Sum II - Input Array Is Sorted', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', difficulty: 'Medium' },
    { id: 15,  title: '3Sum',                               url: 'https://leetcode.com/problems/3sum/',                               difficulty: 'Medium' },
  ],
  content: `# Two-Pointer Technique

The **two-pointer technique** uses two index variables that move through an array (usually from opposite ends or at different speeds) to solve problems in **O(n)** that would otherwise take **O(n²)** with brute force.

## When to Use It

✅ **Sorted arrays** — finding pairs, triplets with a target sum  
✅ **Palindrome checks** — comparing chars from both ends  
✅ **Removing duplicates** — in-place with a slow/fast pointer  
✅ **Container/water problems** — maximizing area  

## Pattern 1: Opposite Ends (Converging Pointers)

Both pointers start at opposite ends and move toward each other.

\`\`\`cpp
// Two Sum II — sorted array, find pair summing to target
// LeetCode #167

vector<int> twoSum(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        
        if (sum == target) {
            return {left + 1, right + 1};  // 1-indexed
        } else if (sum < target) {
            left++;   // Need larger sum → move left right
        } else {
            right--;  // Need smaller sum → move right left
        }
    }
    return {};  // Not found
}

// Example: nums = [2, 7, 11, 15], target = 9
// left=0 (2), right=3 (15) → sum=17 > 9 → right--
// left=0 (2), right=2 (11) → sum=13 > 9 → right--
// left=0 (2), right=1 (7)  → sum=9 == 9 → return {1, 2} ✓
\`\`\`

### Visualization

\`\`\`
nums = [2, 7, 11, 15]   target = 9
        ↑            ↑   sum = 17 > target → right--
        ↑       ↑        sum = 13 > target → right--
        ↑   ↑            sum = 9  = target → FOUND!
\`\`\`

## Pattern 2: Same Direction (Fast/Slow Pointer)

Used for removing duplicates, finding the n-th from end, etc.

\`\`\`cpp
// Remove duplicates from sorted array (LeetCode #26)
int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    
    int slow = 0;   // Points to last unique element
    
    for (int fast = 1; fast < nums.size(); fast++) {
        if (nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}

// [1,1,2,2,3] → [1,2,3,...] returns 3
\`\`\`

## Pattern 3: Palindrome Check

\`\`\`cpp
bool isPalindrome(string s) {
    int left = 0, right = s.size() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}
\`\`\`

## Pattern 4: Container With Most Water (LeetCode #11)

\`\`\`cpp
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;
    
    while (left < right) {
        int h = min(height[left], height[right]);
        int w = right - left;
        maxWater = max(maxWater, h * w);
        
        // Move the shorter wall (moving the taller one can only decrease)
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}
\`\`\`

## Complexity Analysis

| Approach | Time | Space | When |
|---|---|---|---|
| Brute force (nested loops) | O(n²) | O(1) | Always |
| Two pointers | O(n) | O(1) | Sorted / specific patterns |

## Common Mistakes 🚨

- **Not sorting first** — two pointers on sorted arrays usually require a sorted input
- **Wrong movement logic** — always think: which pointer to move and why?
- **Overlapping pointers** — condition must be \`left < right\`, not \`left <= right\`
- **1-indexed vs 0-indexed** — LeetCode #167 returns 1-indexed; don't forget +1
`,

  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Given a sorted array, find two numbers that sum to 'target'
// Return their 1-indexed positions as a pair
// Guaranteed: exactly one solution exists

pair<int,int> twoSumSorted(vector<int>& nums, int target) {
    // Use two pointers: left starts at 0, right at end
    // TODO: implement
    return {-1, -1};
}

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    auto [a, b] = twoSumSorted(nums, target);
    cout << a << " " << b << endl;
    return 0;
}`,

  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

pair<int,int> twoSumSorted(vector<int>& nums, int target) {
    int left = 0, right = (int)nums.size() - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target)      return {left + 1, right + 1};
        else if (sum < target)  left++;
        else                    right--;
    }
    return {-1, -1};
}

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    auto [a, b] = twoSumSorted(nums, target);
    cout << a << " " << b << endl;
    return 0;
}`,

  testCases: [
    { input: '4 9\n2 7 11 15',    expectedOutput: '1 2',  description: 'nums=[2,7,11,15], target=9 → [1,2]' },
    { input: '3 6\n2 3 4',        expectedOutput: '1 3',  description: 'nums=[2,3,4], target=6 → [1,3]' },
    { input: '2 -1\n-1 0',        expectedOutput: '1 2',  description: 'Negative numbers: [-1,0] → [1,2]' },
  ],

  hints: [
    'Initialize `left = 0` and `right = nums.size() - 1`. Loop while `left < right`.',
    'Compute `sum = nums[left] + nums[right]`. If sum < target, move `left++`. If sum > target, move `right--`. If equal, return.',
    'Remember to return 1-indexed: `{left + 1, right + 1}`, not `{left, right}`.',
  ],

  complexity: {
    time:  'O(n) — single pass with two pointers',
    space: 'O(1) — no extra data structures',
    notes: 'Vs O(n²) brute force — the key insight is that the array is sorted, so we can deduce which pointer to move.',
  },

  tags: ['two-pointers', 'arrays', 'sorted', 'pattern'],
};

export default lesson;
