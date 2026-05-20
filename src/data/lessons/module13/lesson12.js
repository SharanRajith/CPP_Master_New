const lesson = {
  id: 'm13-l12',
  title: 'Amazon: Number of Islands',
  module: 13,
  lessonNumber: 12,
  xpReward: 25,
  leetcodeProblems: [
    { id: 200, title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium' },
  ],
  content: `# Amazon: Number of Islands

**LeetCode #200** — Number of Islands is the most fundamental graph connectivity problem. Amazon asks it constantly because it directly models real-world problems: counting connected components in warehouse maps, network topology analysis, and logistics route clustering.

## Why DFS/BFS on a Grid?

A 2D grid is just an implicit graph. Each cell is a node; edges exist between adjacent cells (up, down, left, right). Finding the number of islands = **counting connected components** of '1' cells.

The key insight: when you find a '1', you've found a new island. Immediately **flood-fill** all connected '1's to mark them as visited so you don't count them again. Increment your island count. Repeat.

## Flood Fill Visualization

\`\`\`
Grid:
  1 1 0 0 0
  1 1 0 0 0
  0 0 1 0 0
  0 0 0 1 1

Step 1: grid[0][0]='1' → island #1, DFS floods [0][0],[0][1],[1][0],[1][1] → mark as '0'
Step 2: scan continues, grid[2][2]='1' → island #2, DFS floods [2][2]
Step 3: grid[3][3]='1' → island #3, DFS floods [3][3],[3][4]
Answer: 3 islands
\`\`\`

## Full Implementation Breakdown

1. Iterate every cell \`(r, c)\` in the grid.
2. If \`grid[r][c] == '1'\`: increment island count, call \`dfs(grid, r, c)\`.
3. In \`dfs\`: mark the current cell as '0' (visited), then recursively call \`dfs\` on all 4 neighbors that are in bounds and equal '1'.

\`\`\`cpp
void dfs(vector<vector<char>>& grid, int r, int c) {
    int rows = grid.size(), cols = grid[0].size();
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == '0') return;
    grid[r][c] = '0'; // mark visited
    dfs(grid, r+1, c);
    dfs(grid, r-1, c);
    dfs(grid, r, c+1);
    dfs(grid, r, c-1);
}
\`\`\`

**Important**: We modify the grid in-place to mark visited cells. If you must preserve the input, use a separate \`visited\` boolean grid.

## BFS Alternative

Replace the recursive DFS with a queue. Push the starting cell, then iteratively pop and expand. BFS is often safer for very large grids (avoids stack overflow from deep recursion). Both are $O(m \cdot n)$.

## Union-Find Alternative

A third approach uses **Union-Find (Disjoint Set Union)**: initialize each '1' cell as its own component, then union adjacent '1' pairs. Count remaining distinct components. This becomes advantageous when the grid is updated dynamically (LC #305: Number of Islands II).

## Amazon's Real-World Connection

Amazon's warehouse grid navigation, delivery zone clustering, and AWS network topology analysis all involve connected component counting. Knowing DFS, BFS, and Union-Find gives you three tools for the same problem at different constraint profiles.
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

void dfs(vector<vector<char>>& grid, int r, int c) {
    // TODO: check bounds and if grid[r][c]=='0', return
    // TODO: mark grid[r][c] = '0'
    // TODO: recursively call dfs on all 4 neighbors
}

int numIslands(vector<vector<char>>& grid) {
    // TODO: iterate all cells
    // TODO: if cell == '1', increment count, call dfs(grid, r, c)
    // TODO: return count
    return 0;
}

int main() {
    vector<vector<char>> grid = {
        {'1','1','0','0','0'},
        {'1','1','0','0','0'},
        {'0','0','1','0','0'},
        {'0','0','0','1','1'}
    };
    cout << numIslands(grid) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

void dfs(vector<vector<char>>& grid, int r, int c) {
    int rows = grid.size(), cols = grid[0].size();
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == '0') return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
}

int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for (int r = 0; r < (int)grid.size(); r++) {
        for (int c = 0; c < (int)grid[0].size(); c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    return count;
}

int main() {
    vector<vector<char>> grid = {
        {'1','1','0','0','0'},
        {'1','1','0','0','0'},
        {'0','0','1','0','0'},
        {'0','0','0','1','1'}
    };
    cout << numIslands(grid) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '3', description: '4x5 grid with three distinct island groups → 3' },
  ],
  hints: [
    'Treat the grid as a graph. Each \'1\' cell is a node with edges to its four neighbors. The answer is the number of connected components.',
    'When you find a \'1\', you\'ve found a new island. Use DFS or BFS to mark all connected \'1\'s as visited so you don\'t count them again.',
    'Marking a cell as \'0\' during DFS is the simplest visited-tracking trick. The DFS base case is: return if out of bounds OR cell is \'0\'.',
  ],
  complexity: { time: 'O(m * n)', space: 'O(m * n)', notes: 'Every cell is visited at most once; recursion stack can be O(m*n) in worst case' },
  tags: ['dfs', 'bfs', 'graph', 'matrix', 'amazon'],
};
export default lesson;
