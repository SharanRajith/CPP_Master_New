const lesson = {
  id: 'm10-l3',
  title: '1D DP: House Robber I & II',
  module: 10,
  lessonNumber: 3,
  xpReward: 15,
  leetcodeProblems: [
    { id: 198, title: 'House Robber', url: 'https://leetcode.com/problems/house-robber/', difficulty: 'Medium' },
    { id: 213, title: 'House Robber II', url: 'https://leetcode.com/problems/house-robber-ii/', difficulty: 'Medium' },
  ],
  content: `# House Robber

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed.
The only constraint: **You cannot rob two adjacent houses**, as it will trip an alarm.
Return the maximum amount of money you can rob.

## Defining the State
Let $DP[i]$ be the maximum money you can safely rob considering houses up to index $i$.

If we are standing at house $i$, we have exactly two choices:
1. **Rob house $i$**: If we rob it, we GET \`money[i]\`. But we CANNOT rob house $i-1$. The previous valid state was $i-2$. So we gain \`money[i] + DP[i-2]\`.
2. **Skip house $i$**: We don't get any money from $i$, but we get to keep whatever the optimal strategy was up to $i-1$. So we gain \`DP[i-1]\`.

**Transition Equation:**
$$DP[i] = \\max(DP[i-1], \\; money[i] + DP[i-2])$$

Notice that we only rely on $i-1$ and $i-2$, just like Fibonacci. This can be $O(1)$ space optimized!

## House Robber II (Circular Street)
What if the houses are arranged in a **Circle**? Meaning the First house and the Last house are adjacent!
If you rob house 0, you CANNOT rob house $N-1$.
If you rob house $N-1$, you CANNOT rob house 0.

**The beautiful trick:** Just run the standard House Robber algorithm **twice**:
1. Run it on the array excluding the last house: \`nums[0]\` to \`nums[N-2]\`.
2. Run it on the array excluding the first house: \`nums[1]\` to \`nums[N-1]\`.
Return the maximum of the two results!
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// House Robber I implementation (O(1) Space)
// Returns maximum loot using array segment from 'start' to 'end' inclusive.
int robSegment(vector<int>& nums, int start, int end) {
    int prev2 = 0; // max loot up to i-2
    int prev = 0;  // max loot up to i-1
    
    for (int i = start; i <= end; i++) {
        // TODO: int curr = max(prev, nums[i] + prev2)
        // Shift pointers
    }
    return 0; // TODO: return prev
}

int robCircular(vector<int>& nums) {
    int n = nums.size();
    if (n == 1) return nums[0];
    
    // Run twice and compare!
    int case1 = robSegment(nums, 0, n - 2);
    int case2 = robSegment(nums, 1, n - 1);
    
    return max(case1, case2);
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    cout << robCircular(nums) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int robSegment(vector<int>& nums, int start, int end) {
    int prev2 = 0;
    int prev = 0;
    
    for (int i = start; i <= end; i++) {
        int curr = max(prev, nums[i] + prev2);
        prev2 = prev;
        prev = curr;
    }
    return prev;
}

int robCircular(vector<int>& nums) {
    int n = nums.size();
    if (n == 1) return nums[0];
    
    int case1 = robSegment(nums, 0, n - 2);
    int case2 = robSegment(nums, 1, n - 1);
    
    return max(case1, case2);
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    cout << robCircular(nums) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '3\n2 3 2', expectedOutput: '3', description: 'Circular street! If you rob 2, you cant rob the other 2. Best is to rob the 3.' },
    { input: '4\n1 2 3 1', expectedOutput: '4', description: 'Rob house 1 (value 2) and house 3 (value 3, wait circular means 0 and 2 so 1+3=4)' },
    { input: '1\n5', expectedOutput: '5', description: 'Single house edge case handled by `if (n == 1)` check.' },
  ],
  hints: [
    '`int curr = max(prev, nums[i] + prev2);` checks if it\'s better to skip current or rob current + previous valid state.',
    'Don\'t forget `prev2 = prev; prev = curr;` to advance the sliding window of state.',
  ],
  complexity: { time: 'O(N) (Two loops of size N)', space: 'O(1) highly optimized' },
  tags: ['dp', '1d-dp', 'house-robber', 'array'],
};
export default lesson;
