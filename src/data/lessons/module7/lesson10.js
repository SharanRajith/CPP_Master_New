const lesson = {
  id: 'm7-l10',
  title: 'Binary Tree Right Side View',
  module: 7,
  lessonNumber: 10,
  xpReward: 25,
  leetcodeProblems: [
    { id: 199, title: 'Binary Tree Right Side View', url: 'https://leetcode.com/problems/binary-tree-right-side-view/', difficulty: 'Medium' },
  ],
  content: `# Binary Tree Right Side View

Imagine standing to the **right** of a binary tree and looking left. Which nodes do you see? You see exactly **one node per level** — the rightmost node at that depth.

## The Key Insight
For each level of the tree, we only care about the **last node** we process. If we traverse level by level (BFS) and record the last node at every level, that gives us the right side view.

## BFS Level-Order Traversal
The trick is to use a **queue** and process nodes level by level. At the end of processing each level, the last node dequeued is the rightmost — we add its value to our result.

\`\`\`cpp
vector<int> rightSideView(TreeNode* root) {
    vector<int> result;
    if (!root) return result;

    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int levelSize = q.size(); // How many nodes are on this level?

        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();

            // The last node in this level is the rightmost
            if (i == levelSize - 1) {
                result.push_back(node->val);
            }

            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    return result;
}
\`\`\`

## Why \`levelSize\` is Critical
Before you start the inner loop, you snapshot \`q.size()\`. This captures exactly how many nodes belong to the **current** level. Children pushed during the loop belong to the **next** level and are not counted — they'll be handled in the next iteration of the outer while loop.

## Worked Example
Tree: \`[1, 2, 3, null, 5, null, 4]\`

\`\`\`
        1          ← Level 0: see 1
       / \\
      2   3        ← Level 1: see 3 (rightmost)
       \\    \\
        5   4      ← Level 2: see 4 (rightmost)
\`\`\`

Result: **[1, 3, 4]**

At level 0 there is only node 1. At level 1 we have nodes 2 and 3 — the last one is 3. At level 2 we have nodes 5 and 4 — the last one is 4.

## DFS Alternative (Just for Awareness)
You can also solve this with DFS by tracking the current depth and only recording a node if it is the **first** one visited at that depth in a right-first traversal. However, BFS is more intuitive and is the standard approach interviewers expect.

## Complexity
- **Time:** $O(N)$ — every node is enqueued and dequeued exactly once.
- **Space:** $O(W)$ where $W$ is the maximum width of the tree (at most $N/2$ nodes at the widest level).
`,
  starterCode: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> rightSideView(TreeNode* root) {
    vector<int> result;
    if (!root) return result;

    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int levelSize = q.size();

        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();

            // TODO: if this is the last node in the level, push to result

            // TODO: push left and right children if they exist
        }
    }
    return result;
}

int main() {
    // Build tree: [1, 2, 3, null, 5, null, 4]
    TreeNode* root = new TreeNode(1);
    root->left        = new TreeNode(2);
    root->right       = new TreeNode(3);
    root->left->right = new TreeNode(5);
    root->right->right = new TreeNode(4);

    vector<int> view = rightSideView(root);
    for (int v : view) cout << v << " ";
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> rightSideView(TreeNode* root) {
    vector<int> result;
    if (!root) return result;

    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int levelSize = q.size();

        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();

            if (i == levelSize - 1) {
                result.push_back(node->val);
            }

            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    return result;
}

int main() {
    // Build tree: [1, 2, 3, null, 5, null, 4]
    TreeNode* root = new TreeNode(1);
    root->left        = new TreeNode(2);
    root->right       = new TreeNode(3);
    root->left->right = new TreeNode(5);
    root->right->right = new TreeNode(4);

    vector<int> view = rightSideView(root);
    for (int v : view) cout << v << " ";
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '1 3 4', description: 'Tree [1,2,3,null,5,null,4]: right side sees 1 at level 0, 3 at level 1, 4 at level 2.' },
  ],
  hints: [
    'Snapshot `int levelSize = q.size()` before the inner for-loop so you know exactly how many nodes are on the current level.',
    'The rightmost node at each level is the one where `i == levelSize - 1` inside the inner loop.',
    'Push left child before right child — this ensures right children are always closer to the front of the queue for the next level.',
  ],
  complexity: { time: 'O(N)', space: 'O(W) where W is the maximum width of the tree' },
  tags: ['tree', 'bfs', 'amazon'],
};
export default lesson;
