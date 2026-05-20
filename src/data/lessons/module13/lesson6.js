const lesson = {
  id: 'm13-l6',
  title: 'Google: Trapping Rain Water',
  module: 13,
  lessonNumber: 6,
  xpReward: 25,
  leetcodeProblems: [
    { id: 42, title: 'Trapping Rain Water', url: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'Hard' },
  ],
  content: `# Google: Trapping Rain Water

**LeetCode #42** — This is a Google favourite because it tests whether you can reason about spatial relationships in an array and eliminate brute-force thinking.

## Why This Pattern Matters

The naive solution scans left and right from every bar to find the local max walls — that's $O(n^2)$. Google interviewers want $O(n)$ time and $O(1)$ space. The key insight is: **you never need to look both directions simultaneously if you track running maximums**.

Water trapped above position \`i\` is:
\`\`\`
water[i] = min(maxLeft[i], maxRight[i]) - height[i]
\`\`\`
But computing \`maxLeft\` and \`maxRight\` arrays takes $O(n)$ space. The **two-pointer** approach eliminates these arrays entirely.

## The Two-Pointer Insight

Place one pointer at the left end (\`lo\`) and one at the right end (\`hi\`). Maintain \`maxLeft\` and \`maxRight\` as running maximums.

The critical observation: **the side with the smaller maximum is the bottleneck**. If \`maxLeft < maxRight\`, the water above \`lo\` is determined entirely by \`maxLeft\` — we don't care how tall the right wall is because it's already taller. We can safely calculate water at \`lo\` and advance the pointer inward.

\`\`\`
lo=0, hi=11, maxL=0, maxR=0, water=0
[0,1,0,2,1,0,1,3,2,1,2,1]
 ^                       ^

Step: height[lo]=0 <= height[hi]=1
  maxL = max(0,0) = 0
  water += 0 - 0 = 0, lo++

Step: height[lo]=1, maxL becomes 1 ... and so on
Final accumulated water = 6
\`\`\`

## Full Implementation Breakdown

1. **Initialize**: \`lo=0\`, \`hi=n-1\`, \`maxLeft=0\`, \`maxRight=0\`, \`water=0\`
2. **Loop while lo < hi**:
   - If \`height[lo] <= height[hi]\`: update \`maxLeft\`, add \`maxLeft - height[lo]\` to water, advance \`lo++\`
   - Else: update \`maxRight\`, add \`maxRight - height[hi]\` to water, retreat \`hi--\`
3. Return \`water\`

The beauty: we process every element exactly once. No extra arrays needed. This is the pattern Google looks for — eliminating redundant work by maintaining invariants across two converging pointers.

## Common Pitfalls

- Forgetting to update \`maxLeft\`/\`maxRight\` **before** computing water (must update first or you get negative values)
- Using \`<\` instead of \`<=\` in the comparison — either works but be consistent
- Trying to use a stack-based approach (valid but $O(n)$ space, less elegant in interviews)
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int trap(vector<int>& height) {
    // TODO: initialize lo=0, hi=height.size()-1, maxLeft=0, maxRight=0, water=0
    // TODO: while lo < hi:
    //   if height[lo] <= height[hi]:
    //     update maxLeft, add maxLeft - height[lo] to water, lo++
    //   else:
    //     update maxRight, add maxRight - height[hi] to water, hi--
    // TODO: return water
    return 0;
}

int main() {
    vector<int> height = {0,1,0,2,1,0,1,3,2,1,2,1};
    cout << trap(height) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int trap(vector<int>& height) {
    int lo = 0, hi = (int)height.size() - 1;
    int maxLeft = 0, maxRight = 0, water = 0;
    while (lo < hi) {
        if (height[lo] <= height[hi]) {
            maxLeft = max(maxLeft, height[lo]);
            water += maxLeft - height[lo];
            lo++;
        } else {
            maxRight = max(maxRight, height[hi]);
            water += maxRight - height[hi];
            hi--;
        }
    }
    return water;
}

int main() {
    vector<int> height = {0,1,0,2,1,0,1,3,2,1,2,1};
    cout << trap(height) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '6', description: 'Standard LC42 example — 12-bar histogram traps 6 units of water' },
  ],
  hints: [
    'Think about what determines how much water sits above a single bar. You need both neighboring walls, but only the shorter one matters.',
    'Instead of precomputing left/right max arrays, try maintaining running maximums with two pointers converging from both ends.',
    'The pointer on the side with the smaller running max is the "safe" side to process — its water contribution is fully determined. Update that max, add the difference, then advance that pointer inward.',
  ],
  complexity: { time: 'O(n)', space: 'O(1)', notes: 'Two-pointer eliminates the need for prefix/suffix max arrays' },
  tags: ['two-pointers', 'array', 'google', 'hard'],
};
export default lesson;
