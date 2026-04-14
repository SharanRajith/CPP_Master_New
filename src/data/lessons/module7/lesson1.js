const lesson = {
  id: 'm7-l1',
  title: 'Binary Tree & Traversals',
  module: 7,
  lessonNumber: 1,
  xpReward: 10,
  leetcodeProblems: [
    { id: 144, title: 'Binary Tree Preorder Traversal',  url: 'https://leetcode.com/problems/binary-tree-preorder-traversal/',  difficulty: 'Easy' },
    { id: 94,  title: 'Binary Tree Inorder Traversal',   url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',   difficulty: 'Easy' },
    { id: 145, title: 'Binary Tree Postorder Traversal', url: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', difficulty: 'Easy' },
    { id: 102, title: 'Binary Tree Level Order Traversal',url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',difficulty: 'Medium' },
  ],
  content: `# Binary Tree & Traversals

A **Binary Tree** is a hierarchical data structure where each node has at most two children: a left child and a right child.

## The Node Structure
\`\`\`cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
\`\`\`

## Depth-First Search (DFS) Traversals
DFS goes as deep as possible down one path before backtracking. There are three variations based on when we process the "root" (current) node:

1. **Pre-order (Root, Left, Right)**
2. **In-order (Left, Root, Right)**
3. **Post-order (Left, Right, Root)**

\`\`\`cpp
void inorderTraversal(TreeNode* root, vector<int>& res) {
    if (!root) return;
    inorderTraversal(root->left, res);  // Left
    res.push_back(root->val);           // Root
    inorderTraversal(root->right, res); // Right
}
\`\`\`

> **Trick to Remember:** The name tells you where the ROOT is. *Pre*-order = Root first. *In*-order = Root in middle. *Post*-order = Root last.

## Breadth-First Search (BFS) / Level Order Traversal
BFS explores the tree level by level, from top to bottom, left to right. This requires a **Queue**.

\`\`\`cpp
#include <queue>

void levelOrder(TreeNode* root) {
    if (!root) return;
    std::queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int levelSize = q.size(); // Number of nodes at current level
        for (int i = 0; i < levelSize; i++) {
            TreeNode* curr = q.front();
            q.pop();
            
            std::cout << curr->val << " ";
            
            if (curr->left) q.push(curr->left);
            if (curr->right) q.push(curr->right);
        }
        std::cout << "\\n"; // End of current level
    }
}
\`\`\`

> BFS is fundamentally tied to Queues. DFS is fundamentally tied to Stacks (the call stack in recursion, or \`std::stack\` iteratively).
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Perform a PRE-ORDER traversal (Root, Left, Right)
// Append the node values to the 'res' vector.
void preorder(TreeNode* root, vector<int>& res) {
    // TODO: implement
}

int main() {
    // Hardcoded tree: 
    //      1
    //       \\
    //        2
    //       /
    //      3
    TreeNode* root = new TreeNode(1);
    root->right = new TreeNode(2);
    root->right->left = new TreeNode(3);
    
    vector<int> res;
    preorder(root, res);
    
    for (int i = 0; i < (int)res.size(); i++) {
        cout << res[i] << (i == res.size() - 1 ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
    int val; TreeNode* left; TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void preorder(TreeNode* root, vector<int>& res) {
    if (!root) return;
    res.push_back(root->val);
    preorder(root->left, res);
    preorder(root->right, res);
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->right = new TreeNode(2);
    root->right->left = new TreeNode(3);
    
    vector<int> res;
    preorder(root, res);
    for (int i = 0; i < (int)res.size(); i++) {
        cout << res[i] << (i == res.size() - 1 ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '1 2 3', description: 'Preorder traversal of hardcoded tree 1 -> null, 2 -> 3, null.' },
  ],
  hints: [
    'Base case: `if (!root) return;`',
    '`res.push_back(root->val);`',
    'Recursive call on left child.',
    'Recursive call on right child.',
  ],
  complexity: { time: 'O(N) since every node is visited exactly once', space: 'O(H) recursion stack where H is the height of the tree' },
  tags: ['tree', 'dfs', 'preorder', 'recursion'],
};
export default lesson;
