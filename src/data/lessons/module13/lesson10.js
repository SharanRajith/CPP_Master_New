const lesson = {
  id: 'm13-l10',
  title: 'Google: Median of Two Sorted Arrays',
  module: 13,
  lessonNumber: 10,
  xpReward: 25,
  leetcodeProblems: [
    { id: 4, title: 'Median of Two Sorted Arrays', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', difficulty: 'Hard' },
  ],
  content: `# Google: Median of Two Sorted Arrays

**LeetCode #4** — This is considered one of the hardest binary search problems. Google asks it specifically because the $O(\log(m+n))$ constraint forces you beyond the obvious merge approach. It tests whether you can apply binary search to a **partition problem** rather than a simple value search.

## Why the Naive Approach Fails the Constraint

Merging both arrays and finding the middle is $O(m+n)$. The problem demands $O(\log(\\min(m,n)))$. This forces binary search.

## The Partition Insight

The median splits the combined array into two equal halves. We can binary search on the **partition point in nums1**. Once we know how many elements from nums1 go to the left half, the number from nums2 is determined.

For arrays of total length \`total\`, the left half has \`half = total/2\` elements. If we take \`i\` elements from nums1, we take \`half - i\` from nums2.

\`\`\`
nums1: [1, 3, 8, 9]       partitioned at i=2: [1,3 | 8,9]
nums2: [2, 4, 5, 7, 10]   partitioned at j=3: [2,4,5 | 7,10]

Left half:  [1,3,2,4,5]  maxLeft  = max(3,5) = 5
Right half: [8,9,7,10]   minRight = min(8,7) = 7

Median = (5 + 7) / 2 = 6.0  (even total)
\`\`\`

The partition is valid when: \`nums1[i-1] <= nums2[j]\` AND \`nums2[j-1] <= nums1[i]\`

Binary search adjusts \`i\`: if \`nums1[i-1] > nums2[j]\`, move left; else move right.

## Full Implementation Breakdown

1. Ensure \`nums1\` is the shorter array (swap if needed) — binary search on the smaller array.
2. Binary search \`i\` from 0 to \`m\` (elements taken from nums1 for left partition).
3. \`j = half - i\` (elements taken from nums2).
4. Compute boundary values with sentinel \`INT_MIN\`/\`INT_MAX\` for out-of-bounds partitions.
5. If valid: compute median based on total parity (odd → \`minRight\`, even → average of \`maxLeft\` and \`minRight\`).
6. If not valid: adjust binary search bounds.

\`\`\`cpp
// Validity check
int maxLeft1  = (i == 0) ? INT_MIN : nums1[i-1];
int minRight1 = (i == m) ? INT_MAX : nums1[i];
int maxLeft2  = (j == 0) ? INT_MIN : nums2[j-1];
int minRight2 = (j == n) ? INT_MAX : nums2[j];
if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
    // valid partition → compute median
}
\`\`\`

## Why This Is a Google Signature Problem

Google's search ranking aggregates sorted signals from multiple sources. Efficient median/percentile computation over distributed sorted data requires exactly this kind of logarithmic partition logic. The elegance of binary searching on a partition rather than a value is a hallmark of advanced algorithmic thinking.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // TODO: ensure nums1 is the shorter array (swap if needed)
    // TODO: compute total length and half = total/2
    // TODO: binary search i from 0 to m:
    //   j = half - i
    //   get maxLeft1, minRight1, maxLeft2, minRight2 (use INT_MIN/INT_MAX for boundaries)
    //   if maxLeft1 <= minRight2 && maxLeft2 <= minRight1:
    //     if total is odd: return (double)min(minRight1, minRight2)
    //     else: return (max(maxLeft1,maxLeft2) + min(minRight1,minRight2)) / 2.0
    //   else if maxLeft1 > minRight2: move left (hi = i-1)
    //   else: move right (lo = i+1)
    return 0.0;
}

int main() {
    vector<int> nums1 = {1, 3};
    vector<int> nums2 = {2, 4};
    cout << findMedianSortedArrays(nums1, nums2) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    if (nums1.size() > nums2.size()) swap(nums1, nums2);
    int m = nums1.size(), n = nums2.size();
    int total = m + n;
    int half = total / 2;
    int lo = 0, hi = m;
    while (lo <= hi) {
        int i = (lo + hi) / 2;
        int j = half - i;
        int maxLeft1  = (i == 0) ? INT_MIN : nums1[i - 1];
        int minRight1 = (i == m) ? INT_MAX : nums1[i];
        int maxLeft2  = (j == 0) ? INT_MIN : nums2[j - 1];
        int minRight2 = (j == n) ? INT_MAX : nums2[j];
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if (total % 2 == 1)
                return (double)min(minRight1, minRight2);
            else
                return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0;
        } else if (maxLeft1 > minRight2) {
            hi = i - 1;
        } else {
            lo = i + 1;
        }
    }
    return 0.0;
}

int main() {
    vector<int> nums1 = {1, 3};
    vector<int> nums2 = {2, 4};
    cout << findMedianSortedArrays(nums1, nums2) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '2.5', description: 'nums1=[1,3], nums2=[2,4] → combined [1,2,3,4] → median = (2+3)/2 = 2.5' },
  ],
  hints: [
    'Merging then finding the middle is O(m+n). The O(log) constraint forces binary search — but on what? Not a value, but a partition point.',
    'Binary search on how many elements to take from nums1 for the left half. Once you fix that count, the count from nums2 is determined.',
    'A partition is valid when nums1[i-1] <= nums2[j] and nums2[j-1] <= nums1[i]. If nums1\'s left boundary is too large, move the partition left (hi = i-1).',
  ],
  complexity: { time: 'O(log(min(m,n)))', space: 'O(1)', notes: 'Binary search on the shorter array\'s partition; no extra space needed' },
  tags: ['binary-search', 'array', 'divide-and-conquer', 'google', 'hard'],
};
export default lesson;
