const lesson = {
  id: 'm7-l5',
  title: 'Balanced BST Check',
  module: 7,
  lessonNumber: 5,
  xpReward: 10,
  leetcodeProblems: [
    { id: 110, title: 'Balanced Binary Tree', url: 'https://leetcode.com/problems/balanced-binary-tree/', difficulty: 'Easy' },
  ],
  content: `# Balanced Binary Tree Check

A binary tree is considered **height-balanced** if, for every node in the tree, the height of its left subtree and the height of its right subtree differ by *at most* 1.

## The Naive Approach ($O(N^2)$)
A naive approach would be to calculate the height of the left and right subtrees for every node from the top down.
\`\`\`cpp
bool isBalancedNaive(TreeNode* root) {
    if (!root) return true;
    int lh = height(root->left);
    int rh = height(root->right);
    
    if (abs(lh - rh) > 1) return false;
    
    return isBalancedNaive(root->left) && isBalancedNaive(root->right);
}
\`\`\`
This is $O(N^2)$ because \`height()\` takes $O(N)$ and we do it $O(N)$ times.

## The Optimized Approach ($O(N)$)
Just like in the Diameter problem, we can use a Bottom-Up Post-Order traversal. We calculate the height, BUT if any subtree is found to be unbalanced, we **return -1** as a signal to abort early.

\`\`\`cpp
int checkHeight(TreeNode* root) {
    if (!root) return 0;
    
    int leftHeight = checkHeight(root->left);
    if (leftHeight == -1) return -1; // Abort, left was unbalanced
    
    int rightHeight = checkHeight(root->right);
    if (rightHeight == -1) return -1; // Abort, right was unbalanced
    
    if (abs(leftHeight - rightHeight) > 1) return -1; // Abort, current node unbalanced
    
    return 1 + max(leftHeight, rightHeight); // Return valid height
}

bool isBalanced(TreeNode* root) {
    return checkHeight(root) != -1;
}
\`\`\`

> **Trick:** Using `-1` as an error code propagates the failure up the recursion chain immediately, short-circuiting the remaining calculations perfectly.
`,
  starterCode: `#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int checkHeight(TreeNode* root) {
    // TODO: implement O(N) balanced check
    // return -1 if unbalanced
    return 0; 
}

bool isBalanced(TreeNode* root) {
    return checkHeight(root) != -1;
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    
    cout << (isBalanced(root) ? "true" : "false") << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int checkHeight(TreeNode* root) {
    if (!root) return 0;
    int lh = checkHeight(root->left);
    if (lh == -1) return -1;
    
    int rh = checkHeight(root->right);
    if (rh == -1) return -1;
    
    if (abs(lh - rh) > 1) return -1;
    return max(lh, rh) + 1;
}

bool isBalanced(TreeNode* root) {
    return checkHeight(root) != -1;
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    
    cout << (isBalanced(root) ? "true" : "false") << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: 'true', description: 'Checking hardcoded tree. Left is H=2, Right is H=1. Difference is 1 => true.' },
  ],
  hints: [
    'Return 0 if !root',
    'Calculate left height. If it is -1, return -1.',
    'Calculate right height. If it is -1, return -1.',
    'If `abs(lh - rh) > 1`, return -1. Otherwise, return `1 + max(lh, rh)`.',
  ],
  complexity: { time: 'O(N)', space: 'O(H) recursion stack' },
  tags: ['tree', 'balanced', 'dfs', 'optimization'],
};
export default lesson;
