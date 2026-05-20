const lesson = {
  id: 'm3-l5',
  title: 'map, multimap & unordered_map',
  module: 3,
  lessonNumber: 5,
  xpReward: 10,
  content: `# map, multimap & unordered_map

A **map** stores **key-value pairs** where keys are unique. Think of it as a dictionary: look up a key and retrieve its associated value in sub-linear time.

---

## std::map — Ordered Key-Value Store

Implemented as a **Red-Black Tree**. Keys are stored in **sorted order**. All operations are O(log n).

\`\`\`cpp
#include <map>
std::map<std::string, int> ages;
ages["Alice"] = 25;
ages["Bob"]   = 30;
ages["Alice"] = 26;  // update; keys are unique

std::cout << ages["Alice"]; // 26
std::cout << ages.size();   // 2
\`\`\`

### map Operations

| Operation | Time | Notes |
|-----------|------|-------|
| \`operator[]\` | O(log n) | Creates key with default value if absent! |
| \`at(key)\` | O(log n) | Throws \`std::out_of_range\` if absent |
| \`insert({k,v})\` | O(log n) | No-op if key exists |
| \`erase(key)\` | O(log n) | |
| \`count(key)\` | O(log n) | Returns 0 or 1 |
| \`find(key)\` | O(log n) | Returns iterator or \`end()\` |
| \`lower_bound(key)\` | O(log n) | First key >= key |
| Iteration | O(n) | In sorted key order |

\`\`\`cpp
// Safe lookup pattern
auto it = ages.find("Charlie");
if (it != ages.end()) {
    std::cout << it->second;  // access value via iterator
}

// Iterating key-value pairs
for (auto& [name, age] : ages) {  // C++17 structured binding
    std::cout << name << ": " << age << "\\n";
}
\`\`\`

---

## std::multimap — Map With Duplicate Keys

Allows **multiple values per key**. \`operator[]\` is not available; use \`insert\` and \`equal_range\`.

\`\`\`cpp
#include <map>
std::multimap<std::string, int> scores;
scores.insert({"Alice", 90});
scores.insert({"Alice", 85});
scores.insert({"Bob",   70});

auto [lo, hi] = scores.equal_range("Alice");
for (auto it = lo; it != hi; ++it) {
    std::cout << it->second << " ";  // 90 85
}
\`\`\`

---

## std::unordered_map — Hash Map

Implemented as a **hash table**. Keys are NOT sorted. Average O(1) for all primary operations — the most frequently used map in LeetCode solutions.

\`\`\`cpp
#include <unordered_map>
std::unordered_map<char, int> freq;

std::string s = "abracadabra";
for (char c : s) freq[c]++;   // auto-initialises missing keys to 0

std::cout << freq['a'];  // 5
std::cout << freq['b'];  // 2
\`\`\`

| Operation | Average | Worst |
|-----------|---------|-------|
| \`operator[]\` | O(1) | O(n) |
| \`find\` / \`count\` | O(1) | O(n) |
| \`insert\` / \`erase\` | O(1) | O(n) |

---

## Choosing the Right Map

| Need | Use |
|------|-----|
| Sorted keys, range queries | \`std::map\` |
| Multiple values per key, sorted | \`std::multimap\` |
| Fastest lookup, no ordering | \`std::unordered_map\` |

### Common interview pattern — Two Sum

\`\`\`cpp
// O(n) solution using unordered_map
std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;  // value -> index
    for (int i = 0; i < (int)nums.size(); ++i) {
        int complement = target - nums[i];
        if (seen.count(complement)) return {seen[complement], i};
        seen[nums[i]] = i;
    }
    return {};
}
\`\`\`

### Pitfall: operator[] creates entries

\`\`\`cpp
std::map<std::string, int> m;
int x = m["missing"];  // x == 0, but "missing" is now in the map!
// Use m.count("missing") or m.find("missing") for existence checks.
\`\`\`
`,
  starterCode: `#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    string text = "abracadabra";
    unordered_map<char, int> charCounts;

    // TODO: Loop through each character in 'text'
    // and count its frequency using charCounts.
    // Then print the frequency of 'a' and 'b' separated by a space.
    // Expected output: 5 2

    cout << charCounts['a'] << " " << charCounts['b'] << endl;
    return 0;
}
`,
  modelAnswer: `#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    string text = "abracadabra";
    unordered_map<char, int> charCounts;

    for (char c : text) {
        charCounts[c]++;
    }

    cout << charCounts['a'] << " " << charCounts['b'] << endl;
    return 0;
}
`,
  testCases: [
    {
      input: '',
      expectedOutput: '5 2',
      description: "Counts frequency of 'a' (5) and 'b' (2) in \"abracadabra\"",
    },
  ],
  hints: [
    "Use a range-based for loop: for (char c : text) to iterate every character.",
    "Inside the loop do charCounts[c]++; — if the key doesn't exist, operator[] creates it with value 0 first.",
    'After the loop, print: cout << charCounts[\'a\'] << " " << charCounts[\'b\'] << endl;',
  ],
  complexity: {
    time: 'O(n) average to build the frequency map; O(1) average per lookup',
    space: 'O(k) where k is the number of distinct keys',
    notes: 'std::map would be O(n log k); unordered_map is O(n) average but keys are unordered.',
  },
  leetcodeProblems: [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', url: 'https://leetcode.com/problems/two-sum/' },
    { id: 146, title: 'LRU Cache', difficulty: 'Medium', url: 'https://leetcode.com/problems/lru-cache/' },
    { id: 49, title: 'Group Anagrams', difficulty: 'Medium', url: 'https://leetcode.com/problems/group-anagrams/' },
    { id: 560, title: 'Subarray Sum Equals K', difficulty: 'Medium', url: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
  ],
  tags: ['stl', 'map', 'multimap', 'unordered-map', 'hash-table', 'key-value'],
};
export default lesson;
