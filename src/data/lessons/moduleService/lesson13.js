const lesson = {
  id: 'msvc-l13',
  title: 'TCS CodeVita: Matrix Problems',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 54,  title: 'Spiral Matrix',                      url: 'https://leetcode.com/problems/spiral-matrix/',                      difficulty: 'Medium' },
    { id: 48,  title: 'Rotate Image',                       url: 'https://leetcode.com/problems/rotate-image/',                       difficulty: 'Medium' },
    { id: 240, title: 'Search a 2D Matrix II',              url: 'https://leetcode.com/problems/search-a-2d-matrix-ii/',              difficulty: 'Medium' },
  ],
  content: `# TCS CodeVita — Matrix Problems

Matrix problems are a staple of TCS CodeVita and Wipro NLTH. They test 2D array manipulation skills.

---

## 1. Spiral Order Traversal

\`\`\`cpp
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> res;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    while (top <= bottom && left <= right) {
        for (int c = left;  c <= right;  c++) res.push_back(matrix[top][c]);    top++;
        for (int r = top;   r <= bottom; r++) res.push_back(matrix[r][right]);  right--;
        if (top <= bottom)
            for (int c = right; c >= left;   c--) res.push_back(matrix[bottom][c]); bottom--;
        if (left <= right)
            for (int r = bottom;r >= top;    r--) res.push_back(matrix[r][left]);  left++;
    }
    return res;
}
// {{1,2,3},{4,5,6},{7,8,9}} → {1,2,3,6,9,8,7,4,5}
\`\`\`

---

## 2. Rotate Matrix 90° Clockwise (In-Place)

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
// {{1,2,3},{4,5,6},{7,8,9}} → {{7,4,1},{8,5,2},{9,6,3}}
\`\`\`

---

## 3. Search in Row-Wise and Column-Wise Sorted Matrix

Start from top-right corner:

\`\`\`cpp
bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int r = 0, c = matrix[0].size() - 1;
    while (r < matrix.size() && c >= 0) {
        if (matrix[r][c] == target) return true;
        else if (matrix[r][c] > target) c--; // eliminate column
        else r++;                             // eliminate row
    }
    return false;
}
// target=5 in sorted matrix → true
\`\`\`

---

## 4. Set Matrix Zeroes

If a cell is 0, set its entire row and column to 0.

\`\`\`cpp
void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    vector<int> rows, cols;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (matrix[i][j] == 0) { rows.push_back(i); cols.push_back(j); }
    for (int r : rows) fill(matrix[r].begin(), matrix[r].end(), 0);
    for (int c : cols) for (int i = 0; i < m; i++) matrix[i][c] = 0;
}
\`\`\`

---

## 5. Diagonal Sum

\`\`\`cpp
int diagonalSum(vector<vector<int>>& mat) {
    int n = mat.size(), sum = 0;
    for (int i = 0; i < n; i++) {
        sum += mat[i][i];           // primary diagonal
        if (i != n - 1 - i)        // avoid double-counting center
            sum += mat[i][n-1-i];  // secondary diagonal
    }
    return sum;
}
\`\`\`

---

## Matrix Trick Patterns

| Problem | Key Insight |
|---|---|
| Spiral | Shrink boundaries inward after each side |
| Rotate 90° | Transpose then reverse rows |
| Search sorted matrix | Start top-right, move left or down |
| Set zeros | Record positions first, then zero out |

> Always check boundary conditions when shrinking top/bottom/left/right in spiral traversal.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void rotate(vector<vector<int>>& matrix) {
    // TODO: Rotate the matrix 90 degrees clockwise, in-place
    // Hint: Transpose first, then reverse each row
}

int main() {
    vector<vector<int>> mat = {{1,2,3},{4,5,6},{7,8,9}};
    rotate(mat);
    for (auto& row : mat) {
        for (int v : row) cout << v << " ";
        cout << "\\n";
    }
    // Expected:
    // 7 4 1
    // 8 5 2
    // 9 6 3
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
    vector<vector<int>> mat = {{1,2,3},{4,5,6},{7,8,9}};
    rotate(mat);
    for (auto& row : mat) {
        for (int v : row) cout << v << " ";
        cout << "\\n";
    }
    return 0;
}`,
  testCases: [
    { description: 'Rotate {{1,2,3},{4,5,6},{7,8,9}} 90° clockwise', expectedOutput: '7 4 1 \n8 5 2 \n9 6 3 ' },
  ],
  hints: [
    'Step 1: Transpose — swap matrix[i][j] with matrix[j][i] for all j > i.',
    'Step 2: Reverse each row using std::reverse.',
    'These two steps together achieve a 90° clockwise rotation.',
  ],
  complexity: { time: 'O(N²)', space: 'O(1) in-place' },
  tags: ['tcs', 'codevita', 'matrix', '2d-array', 'dsa'],
};
export default lesson;
