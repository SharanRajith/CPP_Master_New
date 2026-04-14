const lesson = {
  id: 'm12-l7',
  title: 'Greedy (Jump Game)',
  module: 12,
  lessonNumber: 7,
  xpReward: 10,
  leetcodeProblems: [
    { id: 55, title: 'Jump Game', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'Medium' },
    { id: 45, title: 'Jump Game II', url: 'https://leetcode.com/problems/jump-game-ii/', difficulty: 'Medium' },
  ],
  content: `# Greedy Algorithm

A Greedy Algorithm builds up a solution piece by piece, always choosing the next piece that offers the most immediate and obvious benefit. 
It differs from DP because Greedy never reconsiders its choices; it assumes the local optimal choice leads to the global optimal solution.

## Jump Game (LeetCode 55)
You are given an integer array \`nums\`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.
Return ` + "`" + `true` + "`" + ` if you can reach the last index!

**The DP way (Too slow):** Make a DP array, and for every index, recursively test jumping to all valid future indices until you reach the end. $O(N^2)$.
**The Greedy way ($O(N)$):**
Just maintain a single variable: ` + "`" + `maxReach` + "`" + `.
As you iterate through the array, if the current index is $\\le$ ` + "`" + `maxReach` + "`" + `, it means you can physically reach this index! 
If you can reach it, you use its jump value (` + "`" + `nums[i] + i` + "`" + `) to possibly extend your ` + "`" + `maxReach` + "`" + ` even further!

\`\`\`cpp
bool canJump(vector<int>& nums) {
    int maxReach = 0;
    
    for (int i = 0; i < nums.size(); i++) {
        // If my current index is further than my absolute max reach, I am stuck!
        if (i > maxReach) return false;
        
        // Greedily update max reach
        maxReach = max(maxReach, i + nums[i]);
        
        // Early exit: If I can already reach the end, success!
        if (maxReach >= nums.size() - 1) return true;
    }
    
    return true;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool canJump(vector<int>& nums) {
    int maxReach = 0;
    
    // TODO: Loop through all elements in nums
    // TODO: If i > maxReach, return false 
    // TODO: Update maxReach using max(maxReach, i + nums[i])
    // TODO: If maxReach >= nums.size() - 1, return true
    
    return true;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    cout << (canJump(nums) ? "true" : "false") << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (i > maxReach) return false;
        maxReach = max(maxReach, i + nums[i]);
        if (maxReach >= nums.size() - 1) return true;
    }
    return true;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    cout << (canJump(nums) ? "true" : "false") << "\\n";
    return 0;
}`,
  testCases: [
    { input: '5\n2 3 1 1 4', expectedOutput: 'true', description: 'Jump 1 step from idx 0 to 1, then 3 steps to end.' },
    { input: '5\n3 2 1 0 4', expectedOutput: 'false', description: 'Trapped at the 0! maxReach peaks at index 3.' },
  ],
  hints: [
    '`i + nums[i]` dictates exactly how far index `i` can throw you forward.',
  ],
  complexity: { time: 'O(N)', space: 'O(1)' },
  tags: ['greedy', 'arrays'],
};
export default lesson;
