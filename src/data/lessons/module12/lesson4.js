const lesson = {
  id: 'm12-l4',
  title: 'Prefix Sums & Hashing',
  module: 12,
  lessonNumber: 4,
  xpReward: 20,
  leetcodeProblems: [
    { id: 560, title: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium' },
  ],
  content: `# Prefix Sums & Hashing

If a problem asks for **Subarrays** (contiguous chunks) that sum to a specific value $K$, and the array contains **Negative Numbers**, the Sliding Window absolutely fails! Shrinking the window might actually increase the sum!

We must use **Prefix Sums** combined with a Hash Map.

## Subarray Sum Equals K
Given an array of integers \`nums\` and an integer \`k\`, return the total number of continuous subarrays whose sum equals to \`k\`.

**The Math:**
A Prefix Sum is a running total of the array elements. Let ` + "`" + `P[i]` + "`" + ` be the sum from index 0 to index ` + "`" + `i` + "`" + `.
The sum of a subarray between index ` + "`" + `L` + "`" + ` and ` + "`" + `R` + "`" + ` is exactly ` + "`" + `P[R] - P[L-1]` + "`" + `.

We want subarrays that equal $K$.
$$P[R] - P[L-1] = K$$
Rearranging the algebra:
$$P[L-1] = P[R] - K$$

**The English Translation:**
As we iterate rightwards, we maintain a running ` + "`" + `current_sum` + "`" + ` ($P[R]$). We check if we have EVER seen a prefix sum earlier in the array equal to ` + "`" + `current_sum - K` + "`" + `. If we have, that prior sum essentially "chops off" exactly the right amount of weight to leave a subarray perfectly equal to $K$!

\`\`\`cpp
int subarraySum(vector<int>& nums, int k) {
    // Map to store {prefix_sum -> frequency}
    unordered_map<int, int> map;
    
    // IMPORTANT BASE CASE: A prefix sum of 0 has been seen exactly 1 time!
    // This allows picking subarrays that start from index 0.
    map[0] = 1; 
    
    int current_sum = 0;
    int count = 0;
    
    for (int num : nums) {
        current_sum += num;
        
        // Has (sum - k) occurred before? If so, we found valid subarrays!
        if (map.find(current_sum - k) != map.end()) {
            count += map[current_sum - k];
        }
        
        // Add current_sum to the map for future numbers to look back at
        map[current_sum]++;
    }
    
    return count;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Implement Subarray Sum Equals K
int subarraySum(vector<int>& nums, int k) {
    // TODO: Init unordered_map<int, int> map
    // TODO: Prime the map with map[0] = 1
    
    // TODO: Loop through nums
    // sum += num
    // if map holds (sum - k), add its frequency to count
    // increment map[sum]++
    
    return 0; // Return count
}

int main() {
    int n, k; cin >> n >> k;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    cout << subarraySum(nums, k) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> map;
    map[0] = 1;
    int sum = 0, count = 0;
    
    for (int x : nums) {
        sum += x;
        if (map.find(sum - k) != map.end()) {
            count += map[sum - k];
        }
        map[sum]++;
    }
    return count;
}

int main() {
    int n, k; cin >> n >> k;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << subarraySum(nums, k) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '3 2\n1 1 1', expectedOutput: '2', description: 'Subarrays [1,1] starting at index 0 and index 1.' },
    { input: '3 3\n1 2 3', expectedOutput: '2', description: 'Subarray [1,2] and [3].' },
  ],
  hints: [
    '`map[0] = 1;` ensures that if `current_sum` equals `k` directly, `sum - k == 0` evaluates successfully and adds 1 to the count!',
  ],
  complexity: { time: 'O(N) amortized for unordered_map lookup', space: 'O(N) for map' },
  tags: ['prefix-sum', 'hash-map', 'arrays'],
};
export default lesson;
