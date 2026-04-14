const lesson = {
  id: 'm4-l9',
  title: 'HashMap Patterns for Arrays',
  module: 4,
  lessonNumber: 9,
  xpReward: 10,
  leetcodeProblems: [
    { id: 1,   title: 'Two Sum',                    url: 'https://leetcode.com/problems/two-sum/',                    difficulty: 'Easy' },
    { id: 128, title: 'Longest Consecutive Sequence', url: 'https://leetcode.com/problems/longest-consecutive-sequence/', difficulty: 'Medium' },
    { id: 525, title: 'Contiguous Array',            url: 'https://leetcode.com/problems/contiguous-array/',            difficulty: 'Medium' },
  ],
  content: `# HashMap Patterns for Arrays

HashMaps transform many O(n²) brute-force array problems into elegant O(n) solutions by allowing O(1) lookups of "have we seen X before?"

## Pattern 1: Two Sum (Store Complements)
\`\`\`cpp
// LeetCode #1 — find two indices that sum to target
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;   // value → index
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement))
            return {seen[complement], i};
        seen[nums[i]] = i;
    }
    return {};
}
\`\`\`
*The trick: for each number, ask "does its complement already exist?" instead of nested looping.*

## Pattern 2: Frequency Counting
\`\`\`cpp
// Find most frequent element
int mostFrequent(vector<int>& nums) {
    unordered_map<int, int> freq;
    for (int n : nums) freq[n]++;
    return max_element(freq.begin(), freq.end(),
        [](auto& a, auto& b){ return a.second < b.second; })->first;
}
\`\`\`

## Pattern 3: Prefix Sum + HashMap (Subarray Sum = K)
\`\`\`cpp
// Count subarrays summing to exactly k
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixCount = {{0, 1}};
    int sum = 0, count = 0;
    for (int num : nums) {
        sum += num;
        count += prefixCount[sum - k];   // How many times (sum-k) appeared
        prefixCount[sum]++;
    }
    return count;
}
\`\`\`

## Pattern 4: Longest Consecutive Sequence (Use a Set)
\`\`\`cpp
// LeetCode #128 — O(n) with unordered_set
int longestConsecutive(vector<int>& nums) {
    unordered_set<int> numSet(nums.begin(), nums.end());
    int longest = 0;
    for (int num : numSet) {
        if (!numSet.count(num - 1)) {     // Only start counting at sequence beginnings
            int cur = num, length = 1;
            while (numSet.count(cur + 1)) { cur++; length++; }
            longest = max(longest, length);
        }
    }
    return longest;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Two Sum: Given an array and a target, return the two indices
// whose values sum to target. Guaranteed exactly one solution.
// NOTE: Return smaller index first.
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen; // value → index
    // TODO: For each element, check if its complement exists in 'seen'.
    // If yes, return {seen[complement], i}. Otherwise, add nums[i] to seen.
    return {};
}

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    auto res = twoSum(nums, target);
    cout << res[0] << " " << res[1] << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < (int)nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement))
            return {seen[complement], i};
        seen[nums[i]] = i;
    }
    return {};
}

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    auto res = twoSum(nums, target);
    cout << res[0] << " " << res[1] << endl;
    return 0;
}`,
  testCases: [
    { input: '4 9\n2 7 11 15',   expectedOutput: '0 1', description: '[2,7,11,15], target=9 → [0,1]' },
    { input: '3 6\n3 2 4',       expectedOutput: '1 2', description: '[3,2,4], target=6 → [1,2]' },
    { input: '2 6\n3 3',         expectedOutput: '0 1', description: 'Duplicate values: [3,3], target=6 → [0,1]' },
  ],
  hints: [
    'For each nums[i], compute complement = target - nums[i].',
    'Check `if (seen.count(complement))` — if found, return `{seen[complement], i}`.',
    'Otherwise, add the current element: `seen[nums[i]] = i;`',
    'Never add before checking — otherwise you might pair an element with itself.',
  ],
  complexity: {
    time:  'O(n) — single pass with O(1) hash lookups',
    space: 'O(n) — the hash map can store up to n elements',
    notes: 'Vs O(n²) brute force nested loop. The HashMap converts "find complement" from O(n) search to O(1) lookup.',
  },
  tags: ['hashmap', 'two-sum', 'arrays', 'complement', 'pattern'],
};
export default lesson;
