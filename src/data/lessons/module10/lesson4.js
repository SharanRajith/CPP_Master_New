const lesson = {
  id: 'm10-l4',
  title: '2D DP: Unique Paths & Variations',
  module: 10,
  lessonNumber: 4,
  xpReward: 15,
  leetcodeProblems: [
    { id: 62, title: 'Unique Paths', url: 'https://leetcode.com/problems/unique-paths/', difficulty: 'Medium' },
    { id: 63, title: 'Unique Paths II', url: 'https://leetcode.com/problems/unique-paths-ii/', difficulty: 'Medium' },
    { id: 64, title: 'Minimum Path Sum', url: 'https://leetcode.com/problems/minimum-path-sum/', difficulty: 'Medium' },
  ],
  content: `# 2D Grid DP (Unique Paths)

There is an $m \\times n$ grid. A robot is located perfectly at the top-left corner ` + "`" + `(0, 0)` + "`" + `.
The robot can only move **DOWN** or **RIGHT** at any point in time. It wants to reach the bottom-right corner ` + "`" + `(m-1, n-1)` + "`" + `.
How many unique paths are there?

## The 2D DP State
Let $DP[i][j]$ be the number of unique paths to reach cell ` + "`" + `(i, j)` + "`" + `.
Because the robot can only move down or right, the ONLY way to arrive at ` + "`" + `(i, j)` + "`" + ` is from:
1. The cell directly above it: ` + "`" + `(i-1, j)` + "`" + `
2. The cell directly to its left: ` + "`" + `(i, j-1)` + "`" + `

**Transition Equation:**
$$DP[i][j] = DP[i-1][j] + DP[i][j-1]$$

### Base Case
To start the chain reaction, $DP[0][0] = 1$ (there is exactly 1 way to be sitting on the start square). Also, the entire top row and entire left column have exactly 1 path (just moving straight).

## 2D to 1D Space Optimization
Instead of keeping the entire $m \\times n$ matrix in memory ($O(M \\times N)$ space), notice that the calculation for the current row $i$ **ONLY** requires the current row and the row immediately above it ($i-1$).
We can compress the entire 2D matrix into just a single 1D array representing the *current* row!

\`\`\`cpp
int uniquePaths(int m, int n) {
    vector<int> prevRow(n, 1); // 1st row has exactly 1 path to all cells
    vector<int> currRow(n, 1);
    
    for (int r = 1; r < m; r++) {
        for (int c = 1; c < n; c++) {
            // Paths to cell = (paths from left) + (paths from above)
            currRow[c] = currRow[c-1] + prevRow[c];
        }
        prevRow = currRow; // Move down to next row
    }
    return prevRow[n-1];
}
\`\`\`

> **Obstacles (Unique Paths II):** If the problem introduces rocks or obstacles where ` + "`" + `grid[r][c] == 1` + "`" + `, all you change is ` + "`" + `if (obstacle) DP[r][c] = 0;` + "`" + `. The DP will naturally route paths around it!
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Minimum Path Sum (LeetCode 64)
// Given a grid filled with non-negative numbers, find a path from top left to 
// bottom right, which minimizes the sum of all numbers along its path.
int minPathSum(vector<vector<int>>& grid) {
    int m = grid.size();
    int n = grid[0].size();
    
    // Let's modify the grid completely in-place to achieve O(1) auxiliary space!
    // 1. Fill top row (can only arrive from the left)
    for (int c = 1; c < n; c++) grid[0][c] += grid[0][c-1];
    
    // 2. Fill left column (can only arrive from above)
    for (int r = 1; r < m; r++) grid[r][0] += grid[r-1][0];
    
    // 3. Fill the rest of the DP state
    for (int r = 1; r < m; r++) {
        for (int c = 1; c < n; c++) {
            // TODO: The cost to reach (r,c) is its own value PLUS the minimum of 
            // the cell above it and the cell to its left.
        }
    }
    
    return grid[m-1][n-1];
}

int main() {
    int m, n; cin >> m >> n;
    vector<vector<int>> grid(m, vector<int>(n));
    for(int i=0; i<m; i++)
        for(int j=0; j<n; j++)
            cin >> grid[i][j];
            
    cout << minPathSum(grid) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int minPathSum(vector<vector<int>>& grid) {
    int m = grid.size();
    int n = grid[0].size();
    
    for (int c = 1; c < n; c++) grid[0][c] += grid[0][c-1];
    for (int r = 1; r < m; r++) grid[r][0] += grid[r-1][0];
    
    for (int r = 1; r < m; r++) {
        for (int c = 1; c < n; c++) {
            grid[r][c] += min(grid[r-1][c], grid[r][c-1]);
        }
    }
    
    return grid[m-1][n-1];
}

int main() {
    int m, n; cin >> m >> n;
    vector<vector<int>> grid(m, vector<int>(n));
    for(int i=0; i<m; i++)
        for(int j=0; j<n; j++)
            cin >> grid[i][j];
            
    cout << minPathSum(grid) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '3 3\n1 3 1\n1 5 1\n4 2 1', expectedOutput: '7', description: 'Optimal path: 1 -> 3 -> 1 -> 1 -> 1 (Sum = 7)' },
    { input: '2 3\n1 2 3\n4 5 6', expectedOutput: '12', description: 'Optimal path minimizes huge numbers below.' },
  ],
  hints: [
    'Since we are changing `grid` in place, it already holds the cell\'s own value `grid[r][c]`.',
    'Just add the minimum of the two possible prior paths: `grid[r][c] += min(grid[r-1][c], grid[r][c-1]);`',
  ],
  complexity: { time: 'O(M * N)', space: 'O(1) using the input grid to store DP state inplace' },
  tags: ['dp', '2d-dp', 'grid', 'in-place'],
};
export default lesson;
