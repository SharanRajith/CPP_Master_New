const lesson = {
  id: 'm13-l4',
  title: 'Microsoft: Spiral Matrix',
  module: 13,
  lessonNumber: 4,
  xpReward: 15,
  leetcodeProblems: [
    { id: 54, title: 'Spiral Matrix', url: 'https://leetcode.com/problems/spiral-matrix/', difficulty: 'Medium' },
  ],
  content: `# Microsoft: Spiral Matrix

Simulation problems are heavily favored in Microsoft and Apple interviews. They test your ability to keep track of strict boundary conditions without getting lost in ` + "`" + `off-by-one` + "`" + ` errors.

Given an $m \\times n$ ` + "`" + `matrix` + "`" + `, return all elements of the matrix in **spiral order**.

## The Boundary Simulation
Instead of trying to calculate complex modulo turning math, just use four rigid mathematical walls!
- ` + "`" + `top` + "`" + ` border (initialized to 0)
- ` + "`" + `bottom` + "`" + ` border (initialized to $M-1$)
- ` + "`" + `left` + "`" + ` border (initialized to 0)
- ` + "`" + `right` + "`" + ` border (initialized to $N-1$)

Your robot moves in a rigid sequence:
1. Traverse Left to Right across the ` + "`" + `top` + "`" + ` wall. Then increment ` + "`" + `top++` + "`" + ` (the top wall literally caves inwards).
2. Traverse Top to Bottom across the ` + "`" + `right` + "`" + ` wall. Then decrement ` + "`" + `right--` + "`" + ` (the right wall caves inwards).
3. Traverse Right to Left across the ` + "`" + `bottom` + "`" + ` wall. Then decrement ` + "`" + `bottom--` + "`" + `.
4. Traverse Bottom to Top across the ` + "`" + `left` + "`" + ` wall. Then increment ` + "`" + `left++` + "`" + `.

To prevent the robot from crossing over itself in non-square matrices (e.g., a $1 \\times 3$ matrix), you must strictly check if ` + "`" + `top <= bottom && left <= right` + "`" + ` throughout the loop!

\`\`\`cpp
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    if (matrix.empty()) return {};
    vector<int> res;
    
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    
    while (top <= bottom && left <= right) {
        // 1. Traverse Top Layer
        for (int i = left; i <= right; i++) res.push_back(matrix[top][i]);
        top++;
        
        // 2. Traverse Right Layer
        for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);
        right--;
        
        // Safety Check before moving back!
        if (top <= bottom) {
            // 3. Traverse Bottom Layer
            for (int i = right; i >= left; i--) res.push_back(matrix[bottom][i]);
            bottom--;
        }
        
        // Safety Check before moving back up!
        if (left <= right) {
            // 4. Traverse Left Layer
            for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);
            left++;
        }
    }
    return res;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

vector<int> spiralOrder(vector<vector<int>>& matrix) {
    if (matrix.empty()) return {};
    vector<int> res;
    
    // TODO: Init 4 boundaries
    // int top = 0, bottom = matrix.size() - 1;
    // int left = 0, right = matrix[0].size() - 1;
    
    // TODO: while (top <= bottom && left <= right)
    
        // 1. L -> R on top row
        // for (int i = left; i <= right; i++) res.push_back(matrix[top][i]);
        // top++;
        
        // 2. T -> B on right col
        
        // 3. check top <= bottom!
        // R -> L on bottom row
        
        // 4. check left <= right!
        // B -> T on left col
        
    return res;
}

int main() {
    int m, n; cin >> m >> n;
    vector<vector<int>> matrix(m, vector<int>(n));
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            cin >> matrix[i][j];
        }
    }
    
    vector<int> res = spiralOrder(matrix);
    for (int x : res) cout << x << " ";
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

vector<int> spiralOrder(vector<vector<int>>& matrix) {
    if (matrix.empty()) return {};
    vector<int> res;
    
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    
    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) res.push_back(matrix[top][i]);
        top++;
        
        for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);
        right--;
        
        if (top <= bottom) {
            for (int i = right; i >= left; i--) res.push_back(matrix[bottom][i]);
            bottom--;
        }
        
        if (left <= right) {
            for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);
            left++;
        }
    }
    return res;
}

int main() {
    int m, n; cin >> m >> n;
    vector<vector<int>> matrix(m, vector<int>(n));
    for(int i=0; i<m; ++i)
        for(int j=0; j<n; ++j) cin >> matrix[i][j];
        
    vector<int> res = spiralOrder(matrix);
    for(int x : res) cout << x << " ";
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '3 3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '1 2 3 6 9 8 7 4 5 ', description: 'Classic 3x3 square spiral.' },
    { input: '3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12', expectedOutput: '1 2 3 4 8 12 11 10 9 5 6 7 ', description: 'Rectangular matrix triggers safety logic.' },
  ],
  hints: [
    'The `if (top <= bottom)` checks inside the loop are strictly required because `top` increments mid-loop and might pass `bottom`!',
  ],
  complexity: { time: 'O(M * N)', space: 'O(1) excluding result vector' },
  tags: ['logic', 'simulation', 'matrix', 'microsoft'],
};
export default lesson;
