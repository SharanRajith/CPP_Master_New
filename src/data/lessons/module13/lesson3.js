const lesson = {
  id: 'm13-l3',
  title: 'Amazon: Rotting Oranges (BFS)',
  module: 13,
  lessonNumber: 3,
  xpReward: 20,
  leetcodeProblems: [
    { id: 994, title: 'Rotting Oranges', url: 'https://leetcode.com/problems/rotting-oranges/', difficulty: 'Medium' },
  ],
  content: `# Amazon: Rotting Oranges

This problem heavily dominates the Amazon Online Assessment (OA).
You are given an $m \\times n$ ` + "`" + `grid` + "`" + ` where each cell can have one of three values:
- ` + "`" + `0` + "`" + ` representing an empty cell,
- ` + "`" + `1` + "`" + ` representing a fresh orange, or
- ` + "`" + `2` + "`" + ` representing a rotten orange.

Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.
Return the minimum number of minutes that must elapse until no cell has a fresh orange. If impossible, return `-1`.

## Multi-Source BFS
Because rot spreads simultaneously from ALL initially rotten oranges, a standard DFS or single-source BFS is incorrect! 
We must use **Multi-Source BFS**.

1. **Initialization:** 
   Scan the entire grid. Every time we find a rotting orange (` + "`" + `2` + "`" + `), push its ` + "`" + `{row, col}` + "`" + ` coordinates into the BFS ` + "`" + `queue` + "`" + `!
   We also count the total number of ` + "`" + `fresh_oranges` + "`" + `.
2. **The Spread:**
   Run a ` + "`" + `while` + "`" + ` loop keeping track of the ` + "`" + `minutes` + "`" + `.
   Inside the loop, get the ` + "`" + `queue.size()` + "`" + `. This tells us exactly how many rotting oranges exist at the CURRENT minute!
   Iterate that many times. Pop a rotten orange, check its 4 neighbors. If a neighbor is fresh (` + "`" + `1` + "`" + `), rot it (` + "`" + `2` + "`" + `), push it into the queue, and decrement ` + "`" + `fresh_oranges` + "`" + `.
3. **Completion:**
   If the BFS finishes and ` + "`" + `fresh_oranges > 0` + "`" + `, some oranges were trapped behind empty cells! Return `-1`.

\`\`\`cpp
int minutes = 0;
while (!q.empty() && fresh_count > 0) {
    int q_size = q.size();
    
    // Process all oranges that rot at this specific minute
    for (int i = 0; i < q_size; i++) {
        auto [r, c] = q.front();
        q.pop();
        
        for (int d = 0; d < 4; d++) {
            int nr = r + dx[d], nc = c + dy[d];
            if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] == 1) {
                grid[nr][nc] = 2; // Rot it!
                fresh_count--;
                q.push({nr, nc});
            }
        }
    }
    minutes++; // One minute passes
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};

int orangesRotting(vector<vector<int>>& grid) {
    int R = grid.size();
    int C = grid[0].size();
    queue<pair<int, int>> q;
    int freshCount = 0;
    
    // 1. Initial Scan
    for (int r = 0; r < R; r++) {
        for (int c = 0; c < C; c++) {
            if (grid[r][c] == 2) q.push({r, c});
            else if (grid[r][c] == 1) freshCount++;
        }
    }
    
    int minutes = 0;
    
    // 2. BFS
    // TODO: Write the Multi-source BFS logic
    // while !q.empty() && freshCount > 0
    // get q.size()
    // inner loop for that size: pop, check 4 dirs.
    // if valid and grid==1: grid=2, freshCount--, q.push
    // after inner loop, minutes++
    
    // 3. Final verification
    return freshCount == 0 ? minutes : -1;
}

int main() {
    int R, C; cin >> R >> C;
    vector<vector<int>> grid(R, vector<int>(C));
    for(int i=0; i<R; i++)
        for(int j=0; j<C; j++) cin >> grid[i][j];
        
    cout << orangesRotting(grid) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};

int orangesRotting(vector<vector<int>>& grid) {
    int R = grid.size();
    int C = grid[0].size();
    queue<pair<int, int>> q;
    int freshCount = 0;
    
    for (int r = 0; r < R; r++) {
        for (int c = 0; c < C; c++) {
            if (grid[r][c] == 2) q.push({r, c});
            else if (grid[r][c] == 1) freshCount++;
        }
    }
    
    int minutes = 0;
    while (!q.empty() && freshCount > 0) {
        int q_size = q.size();
        for (int i = 0; i < q_size; i++) {
            auto curr = q.front(); q.pop();
            int r = curr.first;
            int c = curr.second;
            
            for (int d = 0; d < 4; d++) {
                int nr = r + dx[d];
                int nc = c + dy[d];
                
                if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    freshCount--;
                    q.push({nr, nc});
                }
            }
        }
        minutes++;
    }
    
    return freshCount == 0 ? minutes : -1;
}

int main() {
    int R, C; cin >> R >> C;
    vector<vector<int>> grid(R, vector<int>(C));
    for(int i=0; i<R; i++)
        for(int j=0; j<C; j++) cin >> grid[i][j];
        
    cout << orangesRotting(grid) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '3 3\n2 1 1\n1 1 0\n0 1 1', expectedOutput: '4', description: 'Classic propagation timeline.' },
    { input: '3 3\n2 1 1\n0 1 1\n1 0 1', expectedOutput: '-1', description: 'Trapped fresh orange in bottom left returns -1.' },
    { input: '1 2\n0 2', expectedOutput: '0', description: 'No fresh oranges to begin with, so 0 minutes.' },
  ],
  hints: [
    'The critical condition is ensuring you loop across `q_size`! Without this layer loop, you cannot track distinct minutes properly.',
  ],
  complexity: { time: 'O(R * C)', space: 'O(R * C) worst case if completely rotten' },
  tags: ['bfs', 'grid', 'graph', 'amazon'],
};
export default lesson;
