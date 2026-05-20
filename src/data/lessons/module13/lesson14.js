const lesson = {
  id: 'm13-l14',
  title: 'Google: Word Search',
  module: 13,
  lessonNumber: 14,
  xpReward: 25,
  leetcodeProblems: [
    { id: 79, title: 'Word Search', url: 'https://leetcode.com/problems/word-search/', difficulty: 'Medium' },
  ],
  content: `# Google: Word Search

**LeetCode #79** — Word Search is the archetypal **backtracking on a grid** problem. Google asks it because it combines DFS, visited-state management, and pruning — three skills that are central to constraint satisfaction problems like crossword generation, Boggle, and game-tree search.

## The Problem

Given an \`m x n\` character grid and a string \`word\`, return \`true\` if the word exists in the grid, formed by sequentially adjacent (horizontal or vertical) cells. Each cell may be used at most once per path.

## Why Backtracking?

There's no greedy approach here — you must explore all possible paths. But unlike brute force, **backtracking prunes dead ends immediately**: if the current cell doesn't match the next character, stop exploring that branch entirely.

## The Backtracking Template

\`\`\`
dfs(r, c, index):
  if index == word.length(): return TRUE  ← found the full word
  if out-of-bounds OR cell != word[index]: return FALSE  ← prune

  mark cell as visited (e.g., board[r][c] = '#')
  found = dfs(r+1,c,index+1) OR dfs(r-1,c,index+1)
        OR dfs(r,c+1,index+1) OR dfs(r,c-1,index+1)
  restore cell (board[r][c] = word[index])  ← backtrack
  return found
\`\`\`

The **mark-then-restore** pattern is the essence of backtracking: temporarily claim a resource, recurse, then unclaim it so other branches can use it.

## Full Walkthrough

\`\`\`
Grid:         Word: "ABCCED"
A B C E
S F C S
A D E E

Start at (0,0)='A' ✓ index=0
  → (0,1)='B' ✓ index=1
    → (0,2)='C' ✓ index=2
      → (1,2)='C' ✓ index=3
        → (2,2)='E' ✓ index=4
          → (2,1)='D' ✓ index=5 → index==6 → FOUND!
\`\`\`

## Full Implementation Breakdown

1. For every cell \`(r, c)\` in the grid: if it matches \`word[0]\`, launch DFS.
2. In DFS with current index \`i\`:
   - **Base case**: if \`i == word.size()\`, return \`true\`.
   - **Prune**: if out-of-bounds or \`board[r][c] != word[i]\`, return \`false\`.
   - Mark visited: \`board[r][c] = '#'\`.
   - Recurse in 4 directions with \`i+1\`.
   - Restore: \`board[r][c] = word[i]\`.
   - Return OR of all 4 directions.
3. If any DFS call returns true, return true immediately.

## Key Pruning Optimization

Check \`board[r][c] != word[i]\` **before** marking as visited — this avoids unnecessary work. You can also precount character frequencies to prune early if the board doesn't contain enough of each letter.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

bool dfs(vector<vector<char>>& board, string& word, int r, int c, int i) {
    // TODO: if i == word.size(), return true
    // TODO: if out-of-bounds or board[r][c] != word[i], return false
    // TODO: mark board[r][c] = '#'
    // TODO: try all 4 directions, OR the results
    // TODO: restore board[r][c] = word[i]
    // TODO: return result
    return false;
}

bool exist(vector<vector<char>>& board, string word) {
    // TODO: iterate all cells, if board[r][c] == word[0], call dfs
    // TODO: return false if no starting point works
    return false;
}

int main() {
    vector<vector<char>> board = {
        {'A','B','C','E'},
        {'S','F','C','S'},
        {'A','D','E','E'}
    };
    string word = "ABCCED";
    cout << (exist(board, word) ? 1 : 0) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

bool dfs(vector<vector<char>>& board, string& word, int r, int c, int i) {
    if (i == (int)word.size()) return true;
    if (r < 0 || r >= (int)board.size() || c < 0 || c >= (int)board[0].size()) return false;
    if (board[r][c] != word[i]) return false;
    char tmp = board[r][c];
    board[r][c] = '#';
    bool found = dfs(board, word, r+1, c, i+1)
              || dfs(board, word, r-1, c, i+1)
              || dfs(board, word, r, c+1, i+1)
              || dfs(board, word, r, c-1, i+1);
    board[r][c] = tmp;
    return found;
}

bool exist(vector<vector<char>>& board, string word) {
    int rows = board.size(), cols = board[0].size();
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
            if (dfs(board, word, r, c, 0)) return true;
    return false;
}

int main() {
    vector<vector<char>> board = {
        {'A','B','C','E'},
        {'S','F','C','S'},
        {'A','D','E','E'}
    };
    string word = "ABCCED";
    cout << (exist(board, word) ? 1 : 0) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '1', description: 'Word "ABCCED" exists in the 3x4 grid → output 1 (true)' },
  ],
  hints: [
    'You need to explore all possible paths on the grid. Backtracking is the right approach — try a direction, and if it fails, undo and try another.',
    'Mark a cell as visited before recursing (e.g., replace it with \'#\'). Restore it after recursion. This lets other branches use the same cell.',
    'The base case is: if your index equals the word length, you\'ve matched all characters — return true. Prune early if the current cell doesn\'t match the next character.',
  ],
  complexity: { time: 'O(m * n * 4^L)', space: 'O(L)', notes: 'L = word length; 4 choices at each step, recursion stack depth is L; in practice heavily pruned' },
  tags: ['backtracking', 'dfs', 'matrix', 'string', 'google'],
};
export default lesson;
