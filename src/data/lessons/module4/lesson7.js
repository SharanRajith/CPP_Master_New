const lesson = {
  id: 'm4-l7',
  title: 'Matrix & 2D Array Problems',
  module: 4,
  lessonNumber: 7,
  xpReward: 10,
  leetcodeProblems: [
    { id: 48,  title: 'Rotate Image',              url: 'https://leetcode.com/problems/rotate-image/',              difficulty: 'Medium' },
    { id: 54,  title: 'Spiral Matrix',             url: 'https://leetcode.com/problems/spiral-matrix/',             difficulty: 'Medium' },
    { id: 73,  title: 'Set Matrix Zeroes',         url: 'https://leetcode.com/problems/set-matrix-zeroes/',         difficulty: 'Medium' },
  ],
  content: `# Matrix & 2D Array Problems

2D arrays (matrices) are a huge category in interviews. The key skill is translating concepts like "rotate", "transpose", and "spiral" into index arithmetic.

## Transpose a Matrix
Swap matrix[i][j] with matrix[j][i] — reflects across the diagonal.
\`\`\`cpp
// Transpose in-place (n×n matrix)
for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)
        swap(matrix[i][j], matrix[j][i]);
\`\`\`

## Rotate 90° Clockwise (LeetCode #48)
= Transpose + Reverse each row
\`\`\`cpp
void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    // Step 1: Transpose
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            swap(matrix[i][j], matrix[j][i]);
    // Step 2: Reverse each row
    for (int i = 0; i < n; i++)
        reverse(matrix[i].begin(), matrix[i].end());
}
\`\`\`

## Spiral Order Traversal (LeetCode #54)
Maintain 4 boundaries and shrink them as you peel each layer.
\`\`\`cpp
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    int top=0, bottom=matrix.size()-1, left=0, right=matrix[0].size()-1;
    vector<int> res;
    while (top <= bottom && left <= right) {
        for (int c = left;  c <= right;  c++) res.push_back(matrix[top][c]);   top++;
        for (int r = top;   r <= bottom; r++) res.push_back(matrix[r][right]); right--;
        if (top <= bottom)
          for (int c = right; c >= left;   c--) res.push_back(matrix[bottom][c]); bottom--;
        if (left <= right)
          for (int r = bottom; r >= top;  r--) res.push_back(matrix[r][left]); left++;
    }
    return res;
}
\`\`\`

## 4-Directional BFS/DFS on Grids
Many matrix problems (islands, shortest path) use direction arrays:
\`\`\`cpp
int dx[] = {0, 0, 1, -1};   // Up, Down, Right, Left (delta-x)
int dy[] = {1, -1, 0, 0};   // corresponding delta-y

for (int d = 0; d < 4; d++) {
    int nx = x + dx[d];
    int ny = y + dy[d];
    if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
        // Valid cell — process it
    }
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Rotate an NxN matrix 90 degrees clockwise, IN-PLACE.
// Step 1: Transpose (swap matrix[i][j] with matrix[j][i])
// Step 2: Reverse each row

void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    // TODO: Transpose
    
    // TODO: Reverse each row
}

int main() {
    int n;
    cin >> n;
    vector<vector<int>> matrix(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cin >> matrix[i][j];
    rotate(matrix);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) cout << matrix[i][j] << " \\n"[j == n-1];
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            swap(matrix[i][j], matrix[j][i]);
    for (int i = 0; i < n; i++)
        reverse(matrix[i].begin(), matrix[i].end());
}

int main() {
    int n;
    cin >> n;
    vector<vector<int>> matrix(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cin >> matrix[i][j];
    rotate(matrix);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cout << matrix[i][j] << " \\n"[j == n-1];
    return 0;
}`,
  testCases: [
    { input: '3\n1 2 3\n4 5 6\n7 8 9',       expectedOutput: '7 4 1\n8 5 2\n9 6 3', description: '3x3 matrix rotated 90° clockwise' },
    { input: '2\n5 1\n2 4',                  expectedOutput: '2 5\n4 1',            description: '2x2 matrix rotation' },
  ],
  hints: [
    'Transpose: `for (i=0..n) for (j=i+1..n) swap(matrix[i][j], matrix[j][i]);`',
    'Then reverse each row: `reverse(matrix[i].begin(), matrix[i].end());`',
    'Note j starts at i+1 to avoid double-swapping.',
  ],
  complexity: {
    time:  'O(n²) — must touch every element',
    space: 'O(1) — in-place rotation',
    notes: 'Transpose + reverse is the elegant O(1)-space trick. Naive approach uses O(n²) auxiliary matrix.',
  },
  tags: ['matrix', 'arrays', '2d', 'rotate', 'in-place'],
};
export default lesson;
