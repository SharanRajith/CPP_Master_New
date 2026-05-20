const lesson = {
  id: 'm13-l7',
  title: 'Meta: Merge Intervals',
  module: 13,
  lessonNumber: 7,
  xpReward: 25,
  leetcodeProblems: [
    { id: 56, title: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium' },
  ],
  content: `# Meta: Merge Intervals

**LeetCode #56** — Merge Intervals is a staple of Meta (Facebook) interviews. It appears in calendar scheduling, network packet merging, and genomic range queries. The problem sounds simple but forces you to handle edge cases carefully.

## Why Sorting Is the Key

Given a list of intervals \`[[start, end], ...]\`, you must merge all overlapping ones. Without sorting, you'd have to compare every pair — $O(n^2)$. Once you **sort by start time**, overlapping intervals become adjacent. You only ever need to look at the previous merged interval.

## The Core Logic

After sorting, iterate through intervals. For each interval, ask: does it overlap with the last interval in our result?

Two intervals \`[a, b]\` and \`[c, d]\` overlap if and only if \`c <= b\` (the new start is before or at the old end). If they overlap, merge by extending the end: \`b = max(b, d)\`. Otherwise, push the current interval as a new entry.

\`\`\`
Input:  [[1,3],[2,6],[8,10],[15,18]]
After sort (already sorted here):
  result = [[1,3]]
  [2,6]: 2 <= 3 → merge → result = [[1,6]]
  [8,10]: 8 > 6 → new   → result = [[1,6],[8,10]]
  [15,18]: 15 > 10 → new → result = [[1,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
\`\`\`

## Full Implementation Breakdown

1. **Sort** intervals by \`start\` using a custom comparator.
2. **Initialize** result with the first interval.
3. **For each remaining interval**:
   - Let \`last\` = result.back()
   - If \`interval.start <= last.end\`: merge — update \`last.end = max(last.end, interval.end)\`
   - Else: push the interval to result
4. Return result.

\`\`\`cpp
sort(intervals.begin(), intervals.end(),
     [](auto& a, auto& b){ return a[0] < b[0]; });

vector<vector<int>> result = {intervals[0]};
for (int i = 1; i < intervals.size(); i++) {
    auto& last = result.back();
    if (intervals[i][0] <= last[1])
        last[1] = max(last[1], intervals[i][1]);
    else
        result.push_back(intervals[i]);
}
\`\`\`

## Why Meta Asks This

Real-world scheduling at Meta scale (billions of calendar events, ad slots, content windows) requires exactly this merge logic. Interviewers watch for: correct sort comparator, proper overlap condition (\`<=\` not \`<\`), and mutating the last element in-place rather than copying.

## Variant to Know

**Insert Interval (LC #57)**: Insert a new interval into an already-sorted, non-overlapping list. Same merge logic, but you process in three phases: add all intervals that end before the new one starts, merge all overlapping ones, then add the rest.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    // TODO: sort intervals by start time
    // TODO: initialize result with intervals[0]
    // TODO: for each interval from index 1:
    //   if it overlaps with result.back(), extend result.back()[1]
    //   else push_back the interval
    // TODO: return result
    return {};
}

int main() {
    vector<vector<int>> intervals = {{1,3},{2,6},{8,10},{15,18}};
    vector<vector<int>> res = merge(intervals);
    for (int i = 0; i < (int)res.size(); i++) {
        cout << res[i][0] << " " << res[i][1];
        if (i + 1 < (int)res.size()) cout << " ";
    }
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end(),
         [](const vector<int>& a, const vector<int>& b){ return a[0] < b[0]; });
    vector<vector<int>> result = {intervals[0]};
    for (int i = 1; i < (int)intervals.size(); i++) {
        auto& last = result.back();
        if (intervals[i][0] <= last[1])
            last[1] = max(last[1], intervals[i][1]);
        else
            result.push_back(intervals[i]);
    }
    return result;
}

int main() {
    vector<vector<int>> intervals = {{1,3},{2,6},{8,10},{15,18}};
    vector<vector<int>> res = merge(intervals);
    for (int i = 0; i < (int)res.size(); i++) {
        cout << res[i][0] << " " << res[i][1];
        if (i + 1 < (int)res.size()) cout << " ";
    }
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '1 6 8 10 15 18', description: 'Standard LC56 example — four intervals merged into three' },
  ],
  hints: [
    'Overlapping intervals become adjacent only after you sort them by start time. Do that first.',
    'Two intervals overlap when the new interval\'s start is less than or equal to the previous interval\'s end.',
    'Keep a reference to result.back() and update its end in-place when merging: last[1] = max(last[1], current[1]).',
  ],
  complexity: { time: 'O(n log n)', space: 'O(n)', notes: 'Dominated by the sort; the merge pass is O(n)' },
  tags: ['sorting', 'intervals', 'greedy', 'meta'],
};
export default lesson;
