const lesson = {
  id: 'm7-l2',
  title: 'Binary Search Tree (BST)',
  module: 7,
  lessonNumber: 2,
  xpReward: 10,
  leetcodeProblems: [
    { id: 700, title: 'Search in a Binary Search Tree', url: 'https://leetcode.com/problems/search-in-a-binary-search-tree/', difficulty: 'Easy' },
    { id: 98,  title: 'Validate Binary Search Tree',    url: 'https://leetcode.com/problems/validate-binary-search-tree/',    difficulty: 'Medium' },
  ],
  content: `# Binary Search Tree (BST)

A **Binary Search Tree** is a standard Binary Tree with one massive constraint that makes it incredibly powerful:
For **every** node, all values in its **left subtree** must be strictly smaller, and all values in its **right subtree** must be strictly greater.

## Searching in a BST
Because of this property, searching takes O(log N) time on average (O(H) where H is height). It's exactly like Binary Search on an array!

\`\`\`cpp
TreeNode* searchBST(TreeNode* root, int val) {
    if (!root || root->val == val) return root; // Found it, or hit a leaf
    
    if (val < root->val) 
        return searchBST(root->left, val);      // Go Left
    else 
        return searchBST(root->right, val);     // Go Right
}
\`\`\`

## Validating a BST (LeetCode #98)
The biggest trap when validating a BST is only checking against the direct parent.
\`\`\`
    5
   / \\
  4   6
     / \\
    3   7
\`\`\`
Here, 3 is less than 6, so locally \`6 -> 3\` looks valid. BUT 3 is on the *right* side of 5! The whole right subtree of 5 must be > 5. This tree is **invalid**.

**Solution:** Pass down the allowed \`min\` and \`max\` boundaries!

\`\`\`cpp
bool isValidBST(TreeNode* root, long minVal, long maxVal) {
    if (!root) return true;
    
    if (root->val <= minVal || root->val >= maxVal) 
        return false;
        
    return isValidBST(root->left, minVal, root->val) && 
           isValidBST(root->right, root->val, maxVal);
}

// Initial call: isValidBST(root, LONG_MIN, LONG_MAX);
\`\`\`

> **The Inorder Trick:** An **Inorder Traversal** of a *valid* BST will always yield a strictly sorted array!
`,
  starterCode: `#include <iostream>
#include <climits>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Return true if the tree is a valid BST
bool isValidBSTHelper(TreeNode* root, long minVal, long maxVal) {
    // TODO: implement boundary checking algorithm
    return false;
}

bool isValidBST(TreeNode* root) {
    return isValidBSTHelper(root, LONG_MIN, LONG_MAX);
}

int main() {
    TreeNode* root = new TreeNode(5);
    root->left = new TreeNode(1);
    root->right = new TreeNode(4); // INVALID! 4 is on the right of 5
    root->right->left = new TreeNode(3);
    root->right->right = new TreeNode(6);
    
    cout << (isValidBST(root) ? "true" : "false") << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <climits>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

bool isValid(TreeNode* root, long minV, long maxV) {
    if (!root) return true;
    if (root->val <= minV || root->val >= maxV) return false;
    return isValid(root->left, minV, root->val) && isValid(root->right, root->val, maxV);
}

bool isValidBST(TreeNode* root) {
    return isValid(root, LONG_MIN, LONG_MAX);
}

int main() {
    TreeNode* root = new TreeNode(5);
    root->left = new TreeNode(1);
    root->right = new TreeNode(4);
    root->right->left = new TreeNode(3);
    root->right->right = new TreeNode(6);
    
    cout << (isValidBST(root) ? "true" : "false") << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: 'false', description: 'Hardcoded tree is invalid (4 is right child of 5)' },
  ],
  hints: [
    'Base case: `if (!root) return true;`',
    'Constraint breach: `if (root->val <= minVal || root->val >= maxVal) return false;`',
    'Recursive left: `minVal` stays the same, `maxVal` becomes `root->val`.',
    'Recursive right: `minVal` becomes `root->val`, `maxVal` stays the same.',
  ],
  complexity: { time: 'O(N) - visits every node once', space: 'O(H) - recursion stack' },
  tags: ['bst', 'tree', 'validation', 'recursion'],
};
export default lesson;
