const lesson = {
  id: 'm9-l11',
  title: 'Flood Fill & Islands',
  module: 9,
  lessonNumber: 11,
  xpReward: 10,
  leetcodeProblems: [
    { id: 200, title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium' },
    { id: 733, title: 'Flood Fill',        url: 'https://leetcode.com/problems/flood-fill/',        difficulty: 'Easy' },
  ],
  content: `# 2D Grid Graphs (Flood Fill)

A huge percentage of graph problems in coding interviews don't give you nodes and edges. Instead, they give you a **2D Matrix (Grid)**. 
- Each cell `(r, c)` is a node.
- The 4 adjacent cells (Up, Down, Left, Right) are its connected neighbors.

## Exploring the Grid
To explore, we use standard DFS or BFS. But instead of an \`adjList\`, we generate our neighbors dynamically by adding $(+1, 0)$, $(-1, 0)$, $(0, +1)$, and $(0, -1)$ to our current coordinates.

### The Bounds Check (Crucial)
You MUST ensure that the neighbors you generate are actually inside the matrix boundaries before accessing them!
\`\`\`cpp
int dRow[] = {-1, 1, 0, 0};
int dCol[] = {0, 0, -1, 1};

bool isValid(int r, int c, int max_R, int max_C) {
    return r >= 0 && r < max_R && c >= 0 && c < max_C;
}
\`\`\`

## Flood Fill Algorithm
Imagine the classic "paint bucket" tool in MS Paint. You click a pixel, and the color spreads to all connected pixels of the same starting color. This is just a DFS!

\`\`\`cpp
void dfs(vector<vector<int>>& image, int r, int c, int startColor, int newColor) {
    // Modify current cell
    image[r][c] = newColor;
    
    // Visit all 4 neighbors
    for (int i = 0; i < 4; i++) {
        int nr = r + dRow[i];
        int nc = c + dCol[i];
        
        // Is it inside grid? Does it have the target color?
        if (isValid(nr, nc, image.size(), image[0].size()) && image[nr][nc] == startColor) {
            dfs(image, nr, nc, startColor, newColor);
        }
    }
}
\`\`\`

> **"Number of Islands" logic:** 
> Loop through every cell in the grid. If it's land (\`1\`), increment your island count, then trigger a DFS that turns that whole island into water (\`0\`). This ensures you never count the same island twice!
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

int dRow[] = {-1, 1, 0, 0};
int dCol[] = {0, 0, -1, 1};

void dfs(vector<vector<int>>& image, int r, int c, int startColor, int newColor) {
    // TODO: implement recursive DFS flood fill
    // change image[r][c] to newColor
    // loop 4 times, calculate nx and ny
    // bound checks! if valid AND image[nx][ny] == startColor, call dfs again
}

// Perform a flood fill starting at (sr, sc) with newColor.
vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
    int startColor = image[sr][sc];
    if (startColor != newColor) {
        dfs(image, sr, sc, startColor, newColor);
    }
    return image;
}

int main() {
    int R, C; cin >> R >> C;
    vector<vector<int>> image(R, vector<int>(C));
    for(int i=0; i<R; ++i) 
        for(int j=0; j<C; ++j) 
            cin >> image[i][j];
            
    int sr, sc, newColor; cin >> sr >> sc >> newColor;
    
    vector<vector<int>> res = floodFill(image, sr, sc, newColor);
    for(int i=0; i<R; ++i) {
        for(int j=0; j<C; ++j) cout << res[i][j] << (j == C-1 ? "" : " ");
        cout << "\\n";
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

int dRow[] = {-1, 1, 0, 0};
int dCol[] = {0, 0, -1, 1};

void dfs(vector<vector<int>>& image, int r, int c, int startColor, int newColor) {
    image[r][c] = newColor;
    int R = image.size();
    int C = image[0].size();
    
    for (int i = 0; i < 4; i++) {
        int nr = r + dRow[i];
        int nc = c + dCol[i];
        
        if (nr >= 0 && nr < R && nc >= 0 && nc < C && image[nr][nc] == startColor) {
            dfs(image, nr, nc, startColor, newColor);
        }
    }
}

vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
    int startColor = image[sr][sc];
    if (startColor != newColor) {
        dfs(image, sr, sc, startColor, newColor);
    }
    return image;
}

int main() {
    int R, C; cin >> R >> C;
    vector<vector<int>> image(R, vector<int>(C));
    for(int i=0; i<R; ++i) 
        for(int j=0; j<C; ++j) 
            cin >> image[i][j];
            
    int sr, sc, newColor; cin >> sr >> sc >> newColor;
    vector<vector<int>> res = floodFill(image, sr, sc, newColor);
    for(int i=0; i<R; ++i) {
        for(int j=0; j<C; ++j) cout << res[i][j] << (j == C-1 ? "" : " ");
        cout << "\\n";
    }
    return 0;
}`,
  testCases: [
    { input: '3 3\n1 1 1\n1 1 0\n1 0 1\n1 1 2', expectedOutput: '2 2 2\n2 2 0\n2 0 1', description: 'Classic flood fill. Connected 1s turn to 2.' },
  ],
  hints: [
    'The 4-directional array is extremely helpful. `for(int i=0; i<4; i++)` to iterate neighbors.',
    'Bounds check: `r >= 0 && r < R && c >= 0 && c < C`',
  ],
  complexity: { time: 'O(R * C) representing total vertices in grid', space: 'O(R * C) recursion limits' },
  tags: ['graph', 'dfs', 'grid', 'flood-fill', 'islands'],
};
export default lesson;
