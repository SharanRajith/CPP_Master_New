const lesson = {
  id: 'msvc-l5',
  title: 'Wipro: Tree DSA Questions',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 104, title: 'Maximum Depth of Binary Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy' },
    { id: 102, title: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'Medium' },
    { id: 226, title: 'Invert Binary Tree',           url: 'https://leetcode.com/problems/invert-binary-tree/',           difficulty: 'Easy' },
  ],
  content: `# Wipro Elite/Turbo — Tree DSA Questions

Wipro Elite and Turbo tracks ask tree problems. These four are the most commonly seen.

---

## Node Structure

\`\`\`cpp
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
\`\`\`

---

## 1. Inorder / Preorder / Postorder Traversal

\`\`\`cpp
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

void preorder(TreeNode* root) {
    if (!root) return;
    cout << root->val << " ";
    preorder(root->left);
    preorder(root->right);
}
\`\`\`

---

## 2. Height of Binary Tree

\`\`\`cpp
int height(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(height(root->left), height(root->right));
}
\`\`\`

---

## 3. Level Order Traversal (BFS)

\`\`\`cpp
void levelOrder(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        while (sz--) {
            TreeNode* node = q.front(); q.pop();
            cout << node->val << " ";
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        cout << "\\n";
    }
}
\`\`\`

---

## 4. Invert Binary Tree (Mirror)

\`\`\`cpp
TreeNode* invertTree(TreeNode* root) {
    if (!root) return nullptr;
    swap(root->left, root->right);
    invertTree(root->left);
    invertTree(root->right);
    return root;
}
\`\`\`

---

## 5. Lowest Common Ancestor (BST)

\`\`\`cpp
TreeNode* lca(TreeNode* root, int p, int q) {
    if (!root) return nullptr;
    if (p < root->val && q < root->val) return lca(root->left,  p, q);
    if (p > root->val && q > root->val) return lca(root->right, p, q);
    return root;
}
\`\`\`

---

## Wipro Tips

- **Inorder traversal of BST gives sorted output** — a key insight Wipro interviewers love.
- Always check if the tree is a BST vs a general binary tree before applying BST-specific logic.
- Height and level-order appear in almost every Wipro tree question.
`,
  starterCode: `#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int height(TreeNode* root) {
    // TODO: Return height of the binary tree
    return 0;
}

void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left  = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left  = new TreeNode(4);
    root->left->right = new TreeNode(5);

    cout << height(root) << "\\n"; // 3
    inorder(root);                 // 4 2 5 1 3
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int height(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(height(root->left), height(root->right));
}

void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left  = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left  = new TreeNode(4);
    root->left->right = new TreeNode(5);
    cout << height(root) << "\\n";
    inorder(root);
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'Height of tree = 3, inorder traversal = 4 2 5 1 3', expectedOutput: '3\n4 2 5 1 3 ' },
  ],
  hints: [
    'Height base case: null node has height 0.',
    'Height = 1 + max(left height, right height).',
    'Inorder: left → root → right.',
  ],
  complexity: { time: 'O(N)', space: 'O(H)' },
  tags: ['wipro', 'tree', 'dsa', 'traversal'],
};
export default lesson;
