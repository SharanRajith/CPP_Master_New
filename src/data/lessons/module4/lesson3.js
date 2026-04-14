const lesson = {
  id: 'm4-l3',
  title: 'Prefix Sums & Range Queries',
  module: 4,
  lessonNumber: 3,
  xpReward: 10,
  leetcodeProblems: [
    { id: 303, title: 'Range Sum Query - Immutable',   url: 'https://leetcode.com/problems/range-sum-query-immutable/',   difficulty: 'Easy' },
    { id: 560, title: 'Subarray Sum Equals K',         url: 'https://leetcode.com/problems/subarray-sum-equals-k/',        difficulty: 'Medium' },
    { id: 304, title: 'Range Sum Query 2D - Immutable',url: 'https://leetcode.com/problems/range-sum-query-2d-immutable/', difficulty: 'Medium' },
  ],
  content: `# Prefix Sums & Range Queries

A **prefix sum** array stores cumulative sums so that any range query \`sum(L, R)\` can be answered in **O(1)** instead of O(n).

## Building a Prefix Sum Array
\`\`\`cpp
vector<int> nums = {3, 1, 4, 1, 5, 9};
int n = nums.size();

vector<int> prefix(n + 1, 0);   // prefix[0] = 0 (sentinel)
for (int i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
}
// prefix = [0, 3, 4, 8, 9, 14, 23]
\`\`\`

## Range Sum Query O(1)
\`\`\`cpp
// Sum of nums[L..R] inclusive (0-indexed)
int rangeSum(int L, int R) {
    return prefix[R + 1] - prefix[L];
}
// rangeSum(1, 3) = prefix[4] - prefix[1] = 9 - 3 = 6
// Check: nums[1]+nums[2]+nums[3] = 1+4+1 = 6 ✓
\`\`\`

## Advanced: Subarray Sum = K (LeetCode #560)
A powerful technique pairs prefix sums with a **HashMap** to find the count of subarrays summing to K in O(n).

\`\`\`cpp
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixCount;
    prefixCount[0] = 1;   // Empty prefix
    int sum = 0, count = 0;
    
    for (int num : nums) {
        sum += num;
        // If (sum - k) was seen before, there's a subarray summing to k
        count += prefixCount[sum - k];
        prefixCount[sum]++;
    }
    return count;
}
\`\`\`

> **Why prefix[0] = 0?**  
> The sentinel zero means "the empty prefix before any elements." Without it, subarrays starting at index 0 would be missed!
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Given an array, answer multiple range sum queries efficiently.
// Build a prefix sum array first, then answer each query in O(1).

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    // TODO: Build prefix sum array (size n+1, prefix[0] = 0)
    vector<int> prefix(n + 1, 0);
    
    
    int q;
    cin >> q;
    while (q--) {
        int L, R;
        cin >> L >> R;
        // TODO: Print sum of nums[L..R] using prefix array
        cout << 0 << "\\n";
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    vector<int> prefix(n + 1, 0);
    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
    
    int q;
    cin >> q;
    while (q--) {
        int L, R;
        cin >> L >> R;
        cout << prefix[R + 1] - prefix[L] << "\\n";
    }
    return 0;
}`,
  testCases: [
    { input: '6\n3 1 4 1 5 9\n3\n0 2\n1 4\n0 5', expectedOutput: '8\n11\n23', description: 'Multiple range queries on [3,1,4,1,5,9]' },
    { input: '4\n-2 0 3 -5\n2\n0 3\n2 3',          expectedOutput: '-4\n-2',   description: 'Handles negative numbers in ranges' },
  ],
  hints: [
    'Build prefix: `for (int i = 0; i < n; i++) prefix[i+1] = prefix[i] + nums[i];`',
    'Answer query: `prefix[R+1] - prefix[L]`',
    'Make sure prefix has size n+1 with prefix[0] = 0.',
  ],
  complexity: {
    time:  'O(n) build, O(1) per query',
    space: 'O(n) for prefix array',
    notes: 'After O(n) preprocessing any subarray sum is O(1) — ideal for many queries.',
  },
  tags: ['prefix-sum', 'arrays', 'range-query', 'cumulative'],
};
export default lesson;
