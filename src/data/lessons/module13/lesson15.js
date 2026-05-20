const lesson = {
  id: 'm13-l15',
  title: 'Meta: 3Sum',
  module: 13,
  lessonNumber: 15,
  xpReward: 25,
  leetcodeProblems: [
    { id: 15, title: '3Sum', url: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium' },
  ],
  content: `# Meta: 3Sum

**LeetCode #15** — 3Sum is one of Meta's most frequently asked problems. It tests whether you can reduce a multi-pointer problem to a simpler two-pointer subproblem, and whether you can handle **duplicate elimination** cleanly — a detail that trips up most candidates.

## The Problem

Find all unique triplets \`[a, b, c]\` in the array such that \`a + b + c = 0\`. The result set must not contain duplicate triplets.

## Why Sort First?

The brute force checks all $\binom{n}{3}$ triplets — $O(n^3)$. The optimal approach:
1. **Sort** the array — $O(n \log n)$.
2. Fix one element \`a = nums[i]\`, then use **two pointers** on the remaining subarray to find \`b + c = -a\` — $O(n)$ per fixed element.
3. Total: $O(n^2)$.

Sorting also makes duplicate elimination trivial: skip \`nums[i]\` if it equals the previous element (same fixed value → same triplets).

## Two-Pointer Inner Loop

With \`a = nums[i]\` fixed, set \`lo = i+1\` and \`hi = n-1\`. Move them toward each other:

\`\`\`
nums = [-4, -1, -1, 0, 1, 2]  (sorted)

Fix i=0, a=-4: target b+c=4
  lo=1(-1), hi=5(2): sum=-3 < 4 → lo++
  lo=2(-1), hi=5(2): sum=1 < 4 → lo++
  lo=3(0),  hi=5(2): sum=2 < 4 → lo++
  lo=4(1),  hi=5(2): sum=3 < 4 → lo++ → lo>hi, done
Fix i=1, a=-1: target b+c=1
  lo=2(-1), hi=5(2): sum=1 == 1 → record [-1,-1,2], skip dupes
  lo=3(0),  hi=4(1): sum=1 == 1 → record [-1,0,1], skip dupes
Fix i=2 (nums[2]=nums[1]=-1) → skip (duplicate)
Fix i=3, a=0: target b+c=0
  lo=4(1), hi=5(2): sum=3 > 0 → hi--
  lo=4(1), hi=4(1): lo>=hi, done
Result: [[-1,-1,2],[-1,0,1]]
\`\`\`

## Duplicate Skipping Rules (Critical!)

- **Outer loop**: after finding a valid triplet OR when \`nums[i] == nums[i-1]\`, skip.
- **Inner loop after match**: advance \`lo\` while \`nums[lo] == nums[lo-1]\`; retreat \`hi\` while \`nums[hi] == nums[hi+1]\`.

\`\`\`cpp
for (int i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] == nums[i-1]) continue; // skip outer dupes
    int lo = i+1, hi = n-1;
    while (lo < hi) {
        int sum = nums[i] + nums[lo] + nums[hi];
        if (sum == 0) {
            result.push_back({nums[i], nums[lo], nums[hi]});
            while (lo < hi && nums[lo] == nums[lo+1]) lo++;
            while (lo < hi && nums[hi] == nums[hi-1]) hi--;
            lo++; hi--;
        } else if (sum < 0) lo++;
        else hi--;
    }
}
\`\`\`

## Why Meta Asks This

Meta's friend recommendation, ad targeting, and content clustering systems frequently solve "find k elements satisfying a constraint" problems. 3Sum is the canonical demonstration that reducing higher-dimensional search to two-pointer is both correct and efficient. It also tests code hygiene — the duplicate-skip logic reveals whether you write careful, production-quality code.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> result;
    // TODO: sort nums
    // TODO: for i from 0 to n-3:
    //   skip if i>0 and nums[i]==nums[i-1]
    //   set lo=i+1, hi=n-1
    //   while lo < hi:
    //     compute sum = nums[i]+nums[lo]+nums[hi]
    //     if sum==0: record triplet, skip lo/hi duplicates, lo++, hi--
    //     else if sum<0: lo++
    //     else: hi--
    // TODO: return result
    return result;
}

int main() {
    vector<int> nums = {-1, 0, 1, 2, -1, -4};
    vector<vector<int>> res = threeSum(nums);
    for (int i = 0; i < (int)res.size(); i++) {
        for (int j = 0; j < (int)res[i].size(); j++) {
            cout << res[i][j];
            if (j + 1 < (int)res[i].size()) cout << " ";
        }
        if (i + 1 < (int)res.size()) cout << " ";
    }
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> result;
    sort(nums.begin(), nums.end());
    int n = nums.size();
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int lo = i + 1, hi = n - 1;
        while (lo < hi) {
            int sum = nums[i] + nums[lo] + nums[hi];
            if (sum == 0) {
                result.push_back({nums[i], nums[lo], nums[hi]});
                while (lo < hi && nums[lo] == nums[lo + 1]) lo++;
                while (lo < hi && nums[hi] == nums[hi - 1]) hi--;
                lo++;
                hi--;
            } else if (sum < 0) {
                lo++;
            } else {
                hi--;
            }
        }
    }
    return result;
}

int main() {
    vector<int> nums = {-1, 0, 1, 2, -1, -4};
    vector<vector<int>> res = threeSum(nums);
    for (int i = 0; i < (int)res.size(); i++) {
        for (int j = 0; j < (int)res[i].size(); j++) {
            cout << res[i][j];
            if (j + 1 < (int)res[i].size()) cout << " ";
        }
        if (i + 1 < (int)res.size()) cout << " ";
    }
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '-1 -1 2 -1 0 1', description: '[-1,0,1,2,-1,-4] → two unique triplets: [-1,-1,2] and [-1,0,1]' },
  ],
  hints: [
    'Sort the array first. Then fix one element with a for loop and reduce the problem to 2Sum on the remaining subarray.',
    'Use two pointers (lo=i+1, hi=n-1) for the inner search. If the sum is too small, move lo right; if too large, move hi left.',
    'Duplicate triplets come from duplicate values. Skip the outer loop element if it matches the previous one. After finding a valid triplet, skip duplicate lo and hi values before moving the pointers.',
  ],
  complexity: { time: 'O(n^2)', space: 'O(1)', notes: 'Sorting is O(n log n); the nested two-pointer scan is O(n^2) dominating; output space not counted' },
  tags: ['two-pointers', 'sorting', 'array', 'meta'],
};
export default lesson;
