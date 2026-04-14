const lesson = {
  id: 'm7-l3',
  title: 'Height, Diameter & Depth',
  module: 7,
  lessonNumber: 3,
  xpReward: 10,
  leetcodeProblems: [
    { id: 104, title: 'Maximum Depth of Binary Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy' },
    { id: 543, title: 'Diameter of Binary Tree',      url: 'https://leetcode.com/problems/diameter-of-binary-tree/',      difficulty: 'Easy' },
    { id: 110, title: 'Balanced Binary Tree',         url: 'https://leetcode.com/problems/balanced-binary-tree/',         difficulty: 'Easy' },
  ],
  content: `# Height, Diameter & Depth

Tree dimensional calculations usually rely on **Post-Order Traversal** (Bottom-Up). You cannot know the height of the current node until you calculate the heights of its children!

## 1. Maximum Depth (Height)
The depth of a node is the number of edges from the root to the node. The height of a tree is the maximum depth.
\`\`\`cpp
int maxDepth(TreeNode* root) {
    if (!root) return 0;
    
    int leftHeight = maxDepth(root->left);
    int rightHeight = maxDepth(root->right);
    
    return 1 + max(leftHeight, rightHeight);
}
\`\`\`

## 2. Diameter of A Binary Tree
The diameter is the length of the **longest path between any two nodes** in a tree. This path may or may not pass through the root!

The longest path passing through *a specific node* is:
\`left_height + right_height\`

So, we can just calculate the height of the tree, and at *each node*, update a global \`maxDiameter\` variable!

\`\`\`cpp
int heightAndDiameter(TreeNode* root, int& maxDiameter) {
    if (!root) return 0;
    
    int leftH = heightAndDiameter(root->left, maxDiameter);
    int rightH = heightAndDiameter(root->right, maxDiameter);
    
    // Update the maximum diameter found so far
    maxDiameter = max(maxDiameter, leftH + rightH);
    
    // Return the height of this subtree to the parent
    return 1 + max(leftH, rightH);
}

int diameterOfBinaryTree(TreeNode* root) {
    int maxDiameter = 0;
    heightAndDiameter(root, maxDiameter);
    return maxDiameter;
}
\`\`\`

> Notice how this is just the \`maxDepth\` algorithm, with ONE extra line added to calculate the diameter on the fly. This avoids an $O(N^2)$ brute-force approach.
`,
  starterCode: `#include <iostream>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Return the height of the tree, AND update maxDiameter via reference.
int maxDepth(TreeNode* root, int& maxDiameter) {
    // TODO: base case (return 0)
    // TODO: recursively get leftH and rightH
    // TODO: update maxDiameter = max(maxDiameter, leftH + rightH)
    // TODO: return 1 + max(leftH, rightH)
    return 0;
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    
    int maxDiam = 0;
    maxDepth(root, maxDiam);
    cout << maxDiam << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int maxDepth(TreeNode* root, int& maxDiam) {
    if (!root) return 0;
    int lh = maxDepth(root->left, maxDiam);
    int rh = maxDepth(root->right, maxDiam);
    maxDiam = max(maxDiam, lh + rh);
    return 1 + max(lh, rh);
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    
    int maxDiam = 0;
    maxDepth(root, maxDiam);
    cout << maxDiam << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '3', description: 'Diameter of hardcoded tree. Longest path is 4 -> 2 -> 1 -> 3 (3 edges)' },
  ],
  hints: [
    'You are combining the height function and the diameter calculation into one pass.',
    '`lh = maxDepth(root->left, maxDiameter)`',
    '`maxDiameter = max(maxDiameter, lh + rh)`',
  ],
  complexity: { time: 'O(N) single pass', space: 'O(H) recursion stack' },
  tags: ['tree', 'dfs', 'diameter', 'height'],
};
export default lesson;
