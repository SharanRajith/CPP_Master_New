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

A binary tree is **height-balanced** if for every node, the heights of its left and right subtrees differ by **at most 1**.

## Example

\`\`\`
        1
       / \\
      2   3
     / \\
    4   5
\`\`\`

This tree is balanced — every node's subtrees differ in height by ≤ 1.

\`\`\`
        1
       /
      2
     /
    3
\`\`\`

This is **not** balanced — node 1's left subtree has height 2, right subtree has height 0 (diff = 2).

---

## Approach 1 — Naive O(N²)

Check height at every node from the top down:

\`\`\`cpp
int height(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(height(root->left), height(root->right));
}

bool isBalanced(TreeNode* root) {
    if (!root) return true;
    int lh = height(root->left);
    int rh = height(root->right);
    if (abs(lh - rh) > 1) return false;
    return isBalanced(root->left) && isBalanced(root->right);
}
\`\`\`

**Problem:** \`height()\` is called O(N) times, each taking O(N) → **O(N²) total**.

---

## Approach 2 — Optimised O(N) ✅

Use a **bottom-up** post-order traversal. Return the height normally, but return **-1 as a signal** if any subtree is unbalanced. This short-circuits the recursion immediately.

\`\`\`cpp
int checkHeight(TreeNode* root) {
    if (!root) return 0;

    int lh = checkHeight(root->left);
    if (lh == -1) return -1;          // left subtree is unbalanced

    int rh = checkHeight(root->right);
    if (rh == -1) return -1;          // right subtree is unbalanced

    if (abs(lh - rh) > 1) return -1; // current node is unbalanced

    return 1 + max(lh, rh);           // return valid height
}

bool isBalanced(TreeNode* root) {
    return checkHeight(root) != -1;
}
\`\`\`

> **Key insight:** -1 acts as an error code that bubbles up instantly — once any node is unbalanced, we skip all remaining work.

---

## Complexity

| | Naive | Optimised |
|---|---|---|
| **Time** | O(N²) | O(N) |
| **Space** | O(H) | O(H) |

H = height of the tree (O(log N) for balanced, O(N) worst case).
`,
  starterCode: `#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Return height if balanced, -1 if unbalanced
int checkHeight(TreeNode* root) {
    // TODO: implement O(N) balanced check
    return 0;
}

bool isBalanced(TreeNode* root) {
    return checkHeight(root) != -1;
}

int main() {
    // Balanced tree: height diff = 1
    TreeNode* root = new TreeNode(1);
    root->left  = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);

    cout << (isBalanced(root) ? "true" : "false") << "\\n"; // true

    // Unbalanced tree
    TreeNode* root2 = new TreeNode(1);
    root2->left = new TreeNode(2);
    root2->left->left = new TreeNode(3);

    cout << (isBalanced(root2) ? "true" : "false") << "\\n"; // false
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int checkHeight(TreeNode* root) {
    if (!root) return 0;
    int lh = checkHeight(root->left);
    if (lh == -1) return -1;
    int rh = checkHeight(root->right);
    if (rh == -1) return -1;
    if (abs(lh - rh) > 1) return -1;
    return 1 + max(lh, rh);
}

bool isBalanced(TreeNode* root) {
    return checkHeight(root) != -1;
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left  = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    cout << (isBalanced(root) ? "true" : "false") << "\\n";

    TreeNode* root2 = new TreeNode(1);
    root2->left = new TreeNode(2);
    root2->left->left = new TreeNode(3);
    cout << (isBalanced(root2) ? "true" : "false") << "\\n";
    return 0;
}`,
  testCases: [
    {
      description: 'Tree with left height=2, right height=1 (diff=1) → balanced. Second tree skewed left (diff=2) → unbalanced.',
      expectedOutput: 'true\nfalse',
    },
  ],
  hints: [
    'Base case: an empty node (null) has height 0.',
    'Recursively get the left height. If it returns -1, immediately return -1 — the subtree is already unbalanced.',
    'Do the same for the right height.',
    'If abs(lh - rh) > 1, return -1. Otherwise return 1 + max(lh, rh).',
  ],
  complexity: { time: 'O(N)', space: 'O(H) recursion stack' },
  tags: ['tree', 'balanced', 'dfs', 'bottom-up', 'optimization'],
};

export default lesson;
