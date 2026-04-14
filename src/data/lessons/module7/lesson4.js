const lesson = {
  id: 'm7-l4',
  title: 'Lowest Common Ancestor (LCA)',
  module: 7,
  lessonNumber: 4,
  xpReward: 15,
  leetcodeProblems: [
    { id: 236, title: 'Lowest Common Ancestor of a Binary Tree', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', difficulty: 'Medium' },
    { id: 235, title: 'Lowest Common Ancestor of a BST',         url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', difficulty: 'Easy' },
  ],
  content: `# Lowest Common Ancestor (LCA)

The Lowest Common Ancestor (LCA) of two nodes \`p\` and \`q\` in a tree is the lowest node that has both \`p\` and \`q\` as descendants (where we allow a node to be a descendant of itself).

## LCA in a Binary Search Tree (Easy)
Because a BST is sorted, we can use the values to guide us perfectly without exploring the whole tree!
- If both \`p\` and \`q\` are **smaller** than the root, the LCA must be in the **left** subtree.
- If both \`p\` and \`q\` are **larger** than the root, the LCA must be in the **right** subtree.
- If one is smaller and one is larger (or one equals the root), we have found the split point! The current root **is the LCA**.

\`\`\`cpp
TreeNode* lowestCommonAncestorBST(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (p->val < root->val && q->val < root->val) 
        return lowestCommonAncestorBST(root->left, p, q);
    if (p->val > root->val && q->val > root->val) 
        return lowestCommonAncestorBST(root->right, p, q);
    
    return root; // Found the split!
}
\`\`\`

## LCA in a standard Binary Tree (Medium)
Without the BST properties, we must search the entire tree using DFS (Post-order). 
The function returns the node if it finds \`p\` or \`q\`, otherwise it returns \`nullptr\`.

\`\`\`cpp
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    // 1. Base case: Hit a null node, or found p or q
    if (!root || root == p || root == q) return root;
    
    // 2. Search left and right
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    
    // 3. If BOTH left and right returned something, p and q are separated by this root.
    if (left && right) return root; // THIS is the LCA
    
    // 4. Otherwise, return whichever side actually found a target.
    return left ? left : right;
}
\`\`\`
`,
  starterCode: `#include <iostream>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// standard Binary Tree LCA
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    // TODO: implement DFS
    // Base case: !root || root == p || root == q
    // search left side
    // search right side
    // if left && right are not null => return root
    // else return the non-null side
    return nullptr; 
}

int main() {
    TreeNode* root = new TreeNode(3);
    TreeNode* p = new TreeNode(5);
    TreeNode* q = new TreeNode(1);
    root->left = p;
    root->right = q;
    
    TreeNode* lca = lowestCommonAncestor(root, p, q);
    if (lca) cout << lca->val << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}

int main() {
    TreeNode* root = new TreeNode(3);
    TreeNode* p = new TreeNode(5);
    TreeNode* q = new TreeNode(1);
    root->left = p;
    root->right = q;
    
    TreeNode* lca = lowestCommonAncestor(root, p, q);
    if (lca) cout << lca->val << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '3', description: 'LCA of 5 and 1 where root is 3.' },
  ],
  hints: [
    'Base cases come first. Return `root` if it matches `p` or `q`.',
    'Get `left` result from `lowestCommonAncestor(root->left, p, q)`.',
    'if `left != nullptr` AND `right != nullptr`, it means one target is left, one is right. The LCA is `root`.',
  ],
  complexity: { time: 'O(N) for BT, O(H) for BST', space: 'O(H) recursion stack for both' },
  tags: ['tree', 'lca', 'dfs', 'faang'],
};
export default lesson;
