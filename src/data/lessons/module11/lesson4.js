const lesson = {
  id: 'm11-l4',
  title: 'Merge Intervals',
  module: 11,
  lessonNumber: 4,
  xpReward: 15,
  leetcodeProblems: [
    { id: 56, title: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium' },
    { id: 57, title: 'Insert Interval', url: 'https://leetcode.com/problems/insert-interval/', difficulty: 'Medium' },
  ],
  content: `# Intervals Deep Dive

An interval is represented as an array ` + "`" + `[start, end]` + "`" + `. Problems involving merging timeslots, schedules, and continuous ranges are ubiquitous.

The fundamental trick to 95% of interval problems is **sorting the intervals by their start times**. Because if they are sorted by start times, overlapping intervals must be structurally adjacent in the array!

## 1. Merge Intervals
Given an array of intervals, merge all overlapping ones!
1. **Sort** the vector: ` + "`" + `sort(intervals.begin(), intervals.end());` + "`" + ` (This sorts automatically based on ` + "`" + `interval[0]` + "`" + ` in C++).
2. Initialize an empty ` + "`" + `merged` + "`" + ` result matrix. Push the first interval into it.
3. Iterate through ` + "`" + `intervals` + "`" + `:
   - Grab the ` + "`" + `back()` + "`" + ` of your ` + "`" + `merged` + "`" + ` matrix. Let's call it ` + "`" + `lastInterval` + "`" + `.
   - If ` + "`" + `currentInterval[0] <= lastInterval[1]` + "`" + `, they overlap! (Since it's sorted, we know ` + "`" + `currentInterval[0]` + "`" + ` is $\\ge$ ` + "`" + `lastInterval[0]` + "`" + ` anyway).
   - Resolve overlap: Expand the right bound! ` + "`" + `lastInterval[1] = max(lastInterval[1], currentInterval[1])` + "`" + `.
   - Else, no overlap! Just push ` + "`" + `currentInterval` + "`" + ` into ` + "`" + `merged` + "`" + `.

\`\`\`cpp
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    
    // 1. Sort by start time!
    sort(intervals.begin(), intervals.end());
    
    vector<vector<int>> merged;
    merged.push_back(intervals[0]);
    
    // 2. Linear scan
    for (int i = 1; i < intervals.size(); i++) {
        // merged.back() gets a reference to the last inserted vector
        if (intervals[i][0] <= merged.back()[1]) {
            // Overlap! Extend the END bound of the merged block.
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            // Distinct interval
            merged.push_back(intervals[i]);
        }
    }
    return merged;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Returns the merged intervals
vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    vector<vector<int>> merged;
    
    // TODO: Sort the intervals natively
    
    // TODO: Push the first interval into merged
    
    // TODO: Loop starting from i=1
    // if intervals[i][0] <= merged.back()[1], update merged.back()[1]
    // else push intervals[i] directly
    
    return merged;
}

int main() {
    int n; cin >> n;
    vector<vector<int>> intervals(n, vector<int>(2));
    for(int i=0; i<n; i++) cin >> intervals[i][0] >> intervals[i][1];
    
    vector<vector<int>> res = mergeIntervals(intervals);
    for(auto t : res) {
        cout << "[" << t[0] << "," << t[1] << "] ";
    }
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    sort(intervals.begin(), intervals.end());
    
    vector<vector<int>> res;
    res.push_back(intervals[0]);
    
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= res.back()[1]) {
            res.back()[1] = max(res.back()[1], intervals[i][1]);
        } else {
            res.push_back(intervals[i]);
        }
    }
    return res;
}

int main() {
    int n; cin >> n;
    vector<vector<int>> intervals(n, vector<int>(2));
    for(int i=0; i<n; i++) cin >> intervals[i][0] >> intervals[i][1];
    
    vector<vector<int>> res = mergeIntervals(intervals);
    for(auto t : res) {
        cout << "[" << t[0] << "," << t[1] << "] ";
    }
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4\n1 3\n2 6\n8 10\n15 18', expectedOutput: '[1,6] [8,10] [15,18] ', description: 'Overlaps 1-3 with 2-6.' },
    { input: '2\n1 4\n4 5', expectedOutput: '[1,5] ', description: 'Touching edges count as overlap!' },
  ],
  hints: [
    'The standard `std::sort(intervals.begin(), intervals.end())` implicitly sorts vectors element-by-element (so [0] first, then fallback to [1]).',
    '`merged.back()[1]` is a reference! Modifying it directly updates the actual element in the `merged` vector.',
  ],
  complexity: { time: 'O(N log N) dominated by sorting', space: 'O(N) structure' },
  tags: ['intervals', 'sorting', 'arrays'],
};
export default lesson;
