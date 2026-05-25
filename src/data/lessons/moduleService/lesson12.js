const lesson = {
  id: 'msvc-l12',
  title: 'Cognizant: Hashing & Frequency Problems',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 1,   title: 'Two Sum',                        url: 'https://leetcode.com/problems/two-sum/',                        difficulty: 'Easy'   },
    { id: 49,  title: 'Group Anagrams',                 url: 'https://leetcode.com/problems/group-anagrams/',                 difficulty: 'Medium' },
    { id: 128, title: 'Longest Consecutive Sequence',   url: 'https://leetcode.com/problems/longest-consecutive-sequence/',   difficulty: 'Medium' },
  ],
  content: `# Cognizant GenC Elevate — Hashing & Frequency Problems

Hash maps turn O(N²) brute force solutions into O(N). These are among the most frequently asked problems in all service company coding tests.

---

## 1. Two Sum (Classic Hash Map)

\`\`\`cpp
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen; // value → index
    for (int i = 0; i < nums.size(); i++) {
        int need = target - nums[i];
        if (seen.count(need)) return {seen[need], i};
        seen[nums[i]] = i;
    }
    return {};
}
// {2,7,11,15}, target=9 → {0,1}
\`\`\`

---

## 2. First Non-Repeating Character

\`\`\`cpp
char firstUnique(string s) {
    unordered_map<char, int> freq;
    for (char c : s) freq[c]++;
    for (char c : s)
        if (freq[c] == 1) return c;
    return '\\0';
}
// "leetcode" → 'l'
// "aabb"     → '\\0' (none)
\`\`\`

---

## 3. Find All Duplicates in Array

\`\`\`cpp
vector<int> findDuplicates(vector<int>& nums) {
    unordered_map<int, int> freq;
    for (int n : nums) freq[n]++;
    vector<int> res;
    for (auto& [val, cnt] : freq)
        if (cnt > 1) res.push_back(val);
    return res;
}
// {4,3,2,7,8,2,3,1} → {2,3}
\`\`\`

---

## 4. Group Anagrams

\`\`\`cpp
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> mp;
    for (string& s : strs) {
        string key = s;
        sort(key.begin(), key.end()); // sorted form is the key
        mp[key].push_back(s);
    }
    vector<vector<string>> res;
    for (auto& [key, group] : mp) res.push_back(group);
    return res;
}
// {"eat","tea","tan","ate","nat","bat"} → {{"eat","tea","ate"},{"tan","nat"},{"bat"}}
\`\`\`

---

## 5. Longest Consecutive Sequence — O(N)

\`\`\`cpp
int longestConsecutive(vector<int>& nums) {
    unordered_set<int> s(nums.begin(), nums.end());
    int best = 0;
    for (int n : s) {
        if (!s.count(n - 1)) { // start of a sequence
            int cur = n, len = 1;
            while (s.count(cur + 1)) { cur++; len++; }
            best = max(best, len);
        }
    }
    return best;
}
// {100,4,200,1,3,2} → 4  (sequence: 1,2,3,4)
\`\`\`

---

## Hash Map Cheat Sheet

| Operation | unordered_map | Time |
|---|---|---|
| Insert | mp[key] = val | O(1) avg |
| Lookup | mp.count(key) | O(1) avg |
| Iterate | for (auto& [k,v] : mp) | O(N) |

> When you see "find pair", "find duplicate", or "group by property" — reach for a hash map first.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // TODO: Return indices of the two numbers that add up to target
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    auto res = twoSum(nums, 9);
    cout << res[0] << " " << res[1] << "\\n"; // 0 1
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < (int)nums.size(); i++) {
        int need = target - nums[i];
        if (seen.count(need)) return {seen[need], i};
        seen[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    auto res = twoSum(nums, 9);
    cout << res[0] << " " << res[1] << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'twoSum({2,7,11,15}, 9) returns indices 0 and 1', expectedOutput: '0 1' },
  ],
  hints: [
    'Use a hash map: for each number, check if (target - number) is already in the map.',
    'Store number → index in the map as you go.',
    'This is O(N) — one pass through the array.',
  ],
  complexity: { time: 'O(N)', space: 'O(N)' },
  tags: ['cognizant', 'hashing', 'frequency', 'dsa'],
};
export default lesson;
