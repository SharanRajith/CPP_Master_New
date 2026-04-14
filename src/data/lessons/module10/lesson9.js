const lesson = {
  id: 'm10-l9',
  title: 'DP on Trees (House Robber III)',
  module: 10,
  lessonNumber: 9,
  xpReward: 20,
  leetcodeProblems: [
    { id: 337, title: 'House Robber III', url: 'https://leetcode.com/problems/house-robber-iii/', difficulty: 'Medium' },
  ],
  content: `# DP on Trees

What happens when your "array" of houses is suddenly a Binary Tree?
This blends **Depth-First Search (DFS)** perfectly with **Dynamic Programming**.

Instead of a matrix or array, the DP state is simply passed up the recursion stack!

## The Concept (Post-Order Traversal)
For every node in the tree, we want to return TWO states to its parent:
1. The maximum loot if we **DO NOT rob** this current node.
2. The maximum loot if we **DO rob** this current node.

So our DFS function returns a \`pair<int, int>\` representing \`{notRobbed, robbed}\`.

### The Math
If we are at \`node\` and we receive \`leftPair\` and \`rightPair\` from our children:

1. **If we DO NOT rob the current node:**
   We are free to choose the optimal path from our children! (We can either rob them or not, whichever gives more money).
   \`notRobbed = max(left.robbed, left.notRobbed) + max(right.robbed, right.notRobbed)\`

2. **If we DO rob the current node:**
   We strictly CANNOT rob our children. We are absolutely forced to take their ` + "`" + `notRobbed` + "`" + ` values.
   ` + "`" + `robbed = node->val + left.notRobbed + right.notRobbed` + "`" + `

### The Implementation
\`\`\`cpp
struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Returns {notRobbed, robbed}
pair<int, int> dfs(TreeNode* root) {
    if (!root) return {0, 0}; // Base case
    
    pair<int, int> left = dfs(root->left);
    pair<int, int> right = dfs(root->right);
    
    int notRobbed = max(left.first, left.second) + max(right.first, right.second);
    int robbed = root->val + left.first + right.first;
    
    return {notRobbed, robbed};
}

int rob(TreeNode* root) {
    pair<int, int> res = dfs(root);
    return max(res.first, res.second);
}
\`\`\`

> Notice how we don't even use a ` + "`" + `memo` + "`" + ` array? The strict tree structure ensures we only visit each node exactly once, so the DFS itself is strictly $O(N)$.
`,
  starterCode: `#include <iostream>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Returns {notRobbed, robbed}
pair<int, int> dfs(TreeNode* root) {
    // TODO: Base case
    
    // TODO: Recursive calls to left and right
    
    // TODO: Calculate notRobbed and robbed
    
    return {0, 0};
}

int rob(TreeNode* root) {
    pair<int, int> res = dfs(root);
    return max(res.first, res.second);
}

int main() {
    // Hardcoded tree:
    //      3
    //     / \\
    //    2   3
    //     \\   \\
    //      3   1
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->right = new TreeNode(3);
    root->right->right = new TreeNode(1);
    
    cout << rob(root) << "\\n"; // Expect 7 (rob 3, 3, 1)
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

pair<int, int> dfs(TreeNode* root) {
    if (!root) return {0, 0};
    
    pair<int, int> l = dfs(root->left);
    pair<int, int> r = dfs(root->right);
    
    int notRobbed = max(l.first, l.second) + max(r.first, r.second);
    int robbed = root->val + l.first + r.first;
    
    return {notRobbed, robbed};
}

int rob(TreeNode* root) {
    pair<int, int> res = dfs(root);
    return max(res.first, res.second);
}

int main() {
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->right = new TreeNode(3);
    root->right->right = new TreeNode(1);
    
    cout << rob(root) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '7', description: 'Optimal path is robbing the root layer (3) and the grandchildren layer (3,1), skipping the children layer (2,3)' },
  ],
  hints: [
    'Return a `pair<int, int>` using `{notR, robbed}` syntax.',
    'If we do not rob the current node, we can afford to take `max(left_notR, left_R)` safely.',
  ],
  complexity: { time: 'O(N)', space: 'O(H) recursion stack limit' },
  tags: ['dp', 'tree', 'dfs', 'house-robber'],
};
export default lesson;
