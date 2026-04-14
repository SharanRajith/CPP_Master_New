const lesson = {
  id: 'm11-l6',
  title: 'Two Pointers Advanced',
  module: 11,
  lessonNumber: 6,
  xpReward: 15,
  leetcodeProblems: [
    { id: 15, title: '3Sum', url: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium' },
    { id: 11, title: 'Container With Most Water', url: 'https://leetcode.com/problems/container-with-most-water/', difficulty: 'Medium' },
  ],
  content: `# Two Pointers Advanced

The **Two Pointers** pattern typically uses a ` + "`" + `left` + "`" + ` and ` + "`" + `right` + "`" + ` pointer that converge towards the center. This pattern usually absolutely requires the array to be **Sorted**.

## 3Sum (LeetCode 15)
Find all unique triplets in an array that sum exactly to $0$.

A brute force triple-loop is $O(N^3)$. We can reduce it to $O(N^2)$ using sorting and Two Pointers!
1. **Sort** the array.
2. Iterate ` + "`" + `i` + "`" + ` through the array. This ` + "`" + `nums[i]` + "`" + ` is our fixed "1st element".
3. We need to find two other elements that sum to ` + "`" + `-nums[i]` + "`" + `.
4. Initialize ` + "`" + `left = i + 1` + "`" + ` and ` + "`" + `right = n - 1` + "`" + `.
5. While ` + "`" + `left < right` + "`" + `:
   - If ` + "`" + `nums[left] + nums[right] < -nums[i]` + "`" + `, we need a bigger sum. Since it's sorted, we increment ` + "`" + `left` + "`" + `.
   - If the sum is $>$, we need a smaller sum. Decrement ` + "`" + `right` + "`" + `.
   - If it matches, save the triplet! Then boldly advance both pointers.

**Deduplication Trick:** Since we can't have duplicate triplets, if ` + "`" + `nums[i] == nums[i-1]` + "`" + `, we immediately ` + "`" + `continue` + "`" + `. Likewise, after finding a match, we while-loop to skip consecutive identical ` + "`" + `left` + "`" + ` and ` + "`" + `right` + "`" + ` values.

\`\`\`cpp
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    
    for (int i = 0; i < nums.size(); i++) {
        // Skip duplicate fixed element
        if (i > 0 && nums[i] == nums[i-1]) continue;
        
        int left = i + 1, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) left++;
            else if (sum > 0) right--;
            else {
                res.push_back({nums[i], nums[left], nums[right]});
                left++; right--;
                // Skip duplicate lefts and rights
                while(left < right && nums[left] == nums[left-1]) left++;
                while(left < right && nums[right] == nums[right+1]) right--;
            }
        }
    }
    return res;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Implement 3Sum!
vector<vector<int>> threeSum(vector<int>& nums) {
    if (nums.size() < 3) return {};
    
    // TODO: Sort the array
    
    vector<vector<int>> res;
    
    // TODO: Loop i from 0 to bounds
    // skip duplicates for i
    // TODO: setup left and right
    // while left < right
    // check sum = nums[i] + nums[left] + nums[right]
    // if sum < 0: left++
    // else if sum > 0: right--
    // else: push triplet, advance both, deduplicate both!
    
    return res;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    vector<vector<int>> res = threeSum(nums);
    for (auto tri : res) {
        cout << "[" << tri[0] << "," << tri[1] << "," << tri[2] << "] ";
    }
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    if (nums.size() < 3) return {};
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    
    for (int i = 0; i < nums.size(); i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int left = i + 1, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) {
                left++;
            } else if (sum > 0) {
                right--;
            } else {
                res.push_back({nums[i], nums[left], nums[right]});
                left++;
                right--;
                while (left < right && nums[left] == nums[left - 1]) left++;
                while (left < right && nums[right] == nums[right + 1]) right--;
            }
        }
    }
    return res;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    vector<vector<int>> res = threeSum(nums);
    for (auto tri : res) cout << "[" << tri[0] << "," << tri[1] << "," << tri[2] << "] ";
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '6\n-1 0 1 2 -1 -4', expectedOutput: '[-1,-1,2] [-1,0,1] ', description: 'Outputs unique triplets summing to 0.' },
    { input: '3\n0 0 0', expectedOutput: '[0,0,0] ', description: 'Zero array handles edge case natively.' },
  ],
  hints: [
    'Outer loop duplicate skip: `if (i > 0 && nums[i] == nums[i-1]) continue;`',
    'Inner loop duplicate skip: `while (left < right && nums[left] == nums[left - 1]) left++;`',
  ],
  complexity: { time: 'O(N^2)', space: 'O(1) excluding the result returned' },
  tags: ['two-pointers', 'sorting', 'arrays'],
};
export default lesson;
