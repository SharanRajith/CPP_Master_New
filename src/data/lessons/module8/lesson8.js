const lesson = {
  id: 'm8-l8',
  title: 'K Closest Points to Origin',
  module: 8,
  lessonNumber: 8,
  xpReward: 15,
  leetcodeProblems: [
    { id: 973, title: 'K Closest Points to Origin', url: 'https://leetcode.com/problems/k-closest-points-to-origin/', difficulty: 'Medium' },
  ],
  content: `# K Closest Points to Origin

Given an array of 2D \`points\`, return the \`k\` closest points to the **origin** (0, 0).

The distance from point \`(x, y)\` to the origin is √(x² + y²). Since √ is monotonically increasing, we can compare **squared distances** \`x² + y²\` and avoid the square root entirely.

## Example

\`\`\`
Points: (1,3), (-2,2), (5,8)   k=1

Distances²:
  (1,3):  1 + 9  = 10
  (-2,2): 4 + 4  = 8   ← smallest
  (5,8):  25 + 64 = 89

Closest 1 point: (-2, 2)
\`\`\`

## Approach 1: Sort — O(N log N)

Sort all points by squared distance and return the first \`k\`. Simple and often fast enough.

\`\`\`cpp
sort(points.begin(), points.end(), [](auto& a, auto& b) {
    return a[0]*a[0] + a[1]*a[1] < b[0]*b[0] + b[1]*b[1];
});
return vector<vector<int>>(points.begin(), points.begin() + k);
\`\`\`

## Approach 2: Max-Heap of Size K — O(N log K)

This is better when N is huge but K is small (streaming scenario).

Keep a **max-heap** of size K. The heap is ordered by squared distance (largest at top).

For each point:
- Push it onto the heap.
- If the heap exceeds K elements, pop the top (farthest point).

After processing all N points, the heap contains exactly the K closest.

\`\`\`cpp
// Max-heap stores {dist², index}
priority_queue<pair<int,int>> pq;

for (int i = 0; i < n; i++) {
    int d = points[i][0]*points[i][0] + points[i][1]*points[i][1];
    pq.push({d, i});
    if ((int)pq.size() > k) pq.pop();   // evict the farthest
}
\`\`\`

## Why Max-Heap for "Smallest K"?

This is the same idea as Top-K Frequent Elements: we want to *keep* small distances and *discard* large ones. Keeping a max-heap means the element we discard is always the current largest (farthest) — exactly what we want.

\`\`\`
Heap after each point (k=1):

point (1,3),   d²=10  → heap: [(10,0)]
point (-2,2),  d²=8   → heap: [(10,0), (8,1)] → size>k → pop (10,0) → heap: [(8,1)]
point (5,8),   d²=89  → heap: [(89,2), (8,1)] → size>k → pop (89,2) → heap: [(8,1)]

Result: index 1 → (-2, 2) ✓
\`\`\`

## Output Format

The problem allows the output in any order, but for **deterministic test cases** we sort the output by x-coordinate, then by y-coordinate.

## Full Implementation

\`\`\`cpp
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int n; cin >> n;
    vector<pair<int,int>> pts(n);
    for (auto& [x, y] : pts) cin >> x >> y;
    int k; cin >> k;

    // Max-heap: {squared_distance, index}
    priority_queue<pair<int,int>> pq;
    for (int i = 0; i < n; i++) {
        int d = pts[i].first * pts[i].first + pts[i].second * pts[i].second;
        pq.push({d, i});
        if ((int)pq.size() > k) pq.pop();
    }

    vector<pair<int,int>> res;
    while (!pq.empty()) {
        res.push_back(pts[pq.top().second]);
        pq.pop();
    }
    // Sort for deterministic output
    sort(res.begin(), res.end());
    for (auto& [x, y] : res) cout << x << " " << y << "\\n";
    return 0;
}
\`\`\`

## Complexity Comparison

| Approach | Time | Space | Best when |
|---|---|---|---|
| Sort | O(N log N) | O(1) | K ≈ N |
| Max-Heap size K | O(N log K) | O(K) | K << N |
| QuickSelect | O(N) avg | O(1) | Need optimal avg |

## Input Format

\`\`\`
3        ← n (number of points)
1 3      ← point 0: (1, 3)
-2 2     ← point 1: (-2, 2)
5 8      ← point 2: (5, 8)
1        ← k
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int n; cin >> n;
    vector<pair<int,int>> pts(n);
    for (auto& [x, y] : pts) cin >> x >> y;
    int k; cin >> k;

    // TODO: Build a max-heap of {squared_distance, index}, keeping only k elements.
    // Hint: priority_queue<pair<int,int>> is a max-heap by default.
    priority_queue<pair<int,int>> pq;

    for (int i = 0; i < n; i++) {
        // TODO: compute squared distance
        // TODO: push {dist, i}
        // TODO: if heap size exceeds k, pop()
    }

    vector<pair<int,int>> res;
    // TODO: extract points from heap into res
    // Sort res for deterministic output (by x, then y)
    sort(res.begin(), res.end());
    for (auto& [x, y] : res) cout << x << " " << y << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int n; cin >> n;
    vector<pair<int,int>> pts(n);
    for (auto& [x, y] : pts) cin >> x >> y;
    int k; cin >> k;

    priority_queue<pair<int,int>> pq;
    for (int i = 0; i < n; i++) {
        int d = pts[i].first * pts[i].first + pts[i].second * pts[i].second;
        pq.push({d, i});
        if ((int)pq.size() > k) pq.pop();
    }

    vector<pair<int,int>> res;
    while (!pq.empty()) {
        res.push_back(pts[pq.top().second]);
        pq.pop();
    }
    sort(res.begin(), res.end());
    for (auto& [x, y] : res) cout << x << " " << y << "\\n";
    return 0;
}`,
  testCases: [
    {
      input: '3\n1 3\n-2 2\n5 8\n1',
      expectedOutput: '-2 2',
      description: 'k=1: (-2,2) has distance² 8, which is smallest.',
    },
    {
      input: '3\n3 3\n-2 4\n5 1\n2',
      expectedOutput: '-2 4\n3 3',
      description: 'k=2: dist² values are 18, 20, 26 — two closest are (3,3) and (-2,4), sorted by x.',
    },
  ],
  hints: [
    'You don\'t need the actual distance — compare `x*x + y*y` (squared distance). Avoids floating point entirely.',
    'For "K smallest", use a **max-heap** of size K. Pop the largest element whenever the heap exceeds K, so only the K smallest remain.',
    'Store the **index** in the heap (not a copy of the coordinates) so you can look up the original point when extracting results. Sort the output for a deterministic answer.',
  ],
  complexity: { time: 'O(N log K)', space: 'O(K)', notes: 'Heap never exceeds K elements. Much better than O(N log N) sort when K << N.' },
  tags: ['heap', 'priority-queue', 'geometry', 'medium'],
};
export default lesson;
