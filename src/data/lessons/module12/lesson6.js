const lesson = {
  id: 'm12-l6',
  title: 'Backtracking',
  module: 12,
  lessonNumber: 6,
  xpReward: 15,
  leetcodeProblems: [
    { id: 46, title: 'Permutations', url: 'https://leetcode.com/problems/permutations/', difficulty: 'Medium' },
    { id: 78, title: 'Subsets', url: 'https://leetcode.com/problems/subsets/', difficulty: 'Medium' },
  ],
  content: `# Backtracking

Backtracking is fundamentally just DFS applied to a tree of decisions. 
Whenever you are asked to generate "All combinations", "All subsets", or "All permutations", it's a 100% guarantee you are using Backtracking.

## The Standard Blueprint
1. **The Choice:** Loop through all possible choices at the current step.
2. **The Action:** Add the choice to your ` + "`" + `path` + "`" + ` (usually appending it to a vector).
3. **The Recurse:** Call DFS on the next state.
4. **The Backtrack:** Remove the choice from your ` + "`" + `path` + "`" + ` (` + "`" + `pop_back` + "`" + `). This "cleans up" the state so the loop can try the *next* choice on a clean slate!

## Permutations (LeetCode 46)
Given an array of distinct integers, return all the possible permutations.

Unlike Subsets (where order doesn't matter and you just pick or skip elements moving left-to-right), in Permutations, ` + "`" + `[1, 2]` + "`" + ` is different from ` + "`" + `[2, 1]` + "`" + `.
This means at every step, we must loop through the ENTIRE array to pick the next number, but we cannot pick a number we already picked! We use a boolean ` + "`" + `used` + "`" + ` array for this constraint.

\`\`\`cpp
void backtrack(vector<int>& nums, vector<int>& path, vector<bool>& used, vector<vector<int>>& res) {
    // Base Case: Path length matches input length!
    if (path.size() == nums.size()) {
        res.push_back(path);
        return;
    }
    
    // Loop through ALL choices
    for (int i = 0; i < nums.size(); i++) {
        // Constraint check
        if (used[i]) continue;
        
        // 1. Action
        path.push_back(nums[i]);
        used[i] = true;
        
        // 2. Recurse
        backtrack(nums, path, used, res);
        
        // 3. Backtrack (Cleanup)
        path.pop_back();
        used[i] = false;
    }
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

void backtrack(vector<int>& nums, vector<int>& path, vector<bool>& used, vector<vector<int>>& res) {
    if (path.size() == nums.size()) {
        res.push_back(path);
        return;
    }
    
    for (int i = 0; i < nums.size(); i++) {
        // TODO: if used[i] is true, continue
        // TODO: push nums[i] to path, set used[i] = true
        // TODO: call backtrack
        // TODO: pop from path, set used[i] = false
    }
}

vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    vector<bool> used(nums.size(), false);
    
    backtrack(nums, path, used, res);
    return res;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    vector<vector<int>> p = permute(nums);
    for(auto vec : p) {
        cout << "[";
        for(int i=0; i<vec.size(); i++) cout << vec[i] << (i==vec.size()-1 ? "" : " ");
        cout << "] ";
    }
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

void backtrack(vector<int>& nums, vector<int>& path, vector<bool>& used, vector<vector<int>>& res) {
    if (path.size() == nums.size()) {
        res.push_back(path);
        return;
    }
    
    for (int i = 0; i < nums.size(); i++) {
        if (used[i]) continue;
        path.push_back(nums[i]);
        used[i] = true;
        
        backtrack(nums, path, used, res);
        
        path.pop_back();
        used[i] = false;
    }
}

vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    vector<bool> used(nums.size(), false);
    backtrack(nums, path, used, res);
    return res;
}

int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    vector<vector<int>> p = permute(nums);
    for(auto vec : p) {
        cout << "[";
        for(int i=0; i<vec.size(); i++) cout << vec[i] << (i==vec.size()-1 ? "" : " ");
        cout << "] ";
    }
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '3\n1 2 3', expectedOutput: '[1 2 3] [1 3 2] [2 1 3] [2 3 1] [3 1 2] [3 2 1] ', description: 'All 6 permutations of elements.' },
    { input: '2\n0 1', expectedOutput: '[0 1] [1 0] ', description: 'All 2 permutations.' },
  ],
  hints: [
    'The "DO, RECURSE, UNDO" structure is absolutely mandatory for backtracking without excessive memory copies.',
  ],
  complexity: { time: 'O(N * N!) Total permutation tree size', space: 'O(N) recursion stack length' },
  tags: ['backtracking', 'recursion', 'dfs'],
};
export default lesson;
