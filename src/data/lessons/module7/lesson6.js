const lesson = {
  id: 'm7-l6',
  title: 'Serialize & Deserialize Binary Tree',
  module: 7,
  lessonNumber: 6,
  xpReward: 15,
  leetcodeProblems: [
    { id: 297, title: 'Serialize and Deserialize Binary Tree', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', difficulty: 'Hard' },
    { id: 449, title: 'Serialize and Deserialize BST',         url: 'https://leetcode.com/problems/serialize-and-deserialize-bst/',         difficulty: 'Medium' },
  ],
  content: `# Serialize & Deserialize

To store a Binary Tree in a file or transmit it over a network, you must convert its pointer-based structure into a flat string (**Serialization**). You must also be able to perfectly reconstruct the tree from that string (**Deserialization**).

## Preorder Serialization (DFS)
The most common approach is a **Preorder Traversal** (Root, Left, Right).
To ensure we can reconstruct exactly where the branches end, we must explicitly record \`nullptr\` values! We usually use a special character like \`"N"\` for nulls, and separate values with spaces or commas.

Given this tree:
\`\`\`
    1
   / \\
  2   3
     / \\
    4   5
\`\`\`
The Preorder serialization with nulls is: \`"1 2 N N 3 4 N N 5 N N "\`

### Code 
\`\`\`cpp
#include <sstream>
#include <string>

// Serialize
void serializeHelper(TreeNode* root, std::ostringstream& out) {
    if (!root) {
        out << "N ";
        return;
    }
    out << root->val << " ";
    serializeHelper(root->left, out);
    serializeHelper(root->right, out);
}

string serialize(TreeNode* root) {
    std::ostringstream out;
    serializeHelper(root, out);
    return out.str();
}

// Deserialize
TreeNode* deserializeHelper(std::istringstream& in) {
    string val;
    in >> val;
    
    if (val == "N") return nullptr;
    
    // Create current node
    TreeNode* root = new TreeNode(stoi(val));
    
    // Because it was saved Preorder, the next items in the stream 
    // construct the left subtree, followed by the right subtree!
    root->left = deserializeHelper(in);
    root->right = deserializeHelper(in);
    return root;
}

TreeNode* deserialize(string data) {
    std::istringstream in(data);
    return deserializeHelper(in);
}
\`\`\`

> **Why Preorder?** Because the first item in the stream is always the root. Once you build the root, you recursively build its left child with the next items, then its right child. It works perfectly with a left-to-right stream!
`,
  starterCode: `#include <iostream>
#include <sstream>
#include <string>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Return a string representation of the tree using Preorder.
// Use "N" for null nodes, separated by spaces.
void serializeHelper(TreeNode* root, ostringstream& out) {
    // TODO: implement
}

// DO NOT MODIFY MAIN
int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->right->left = new TreeNode(4);
    
    ostringstream out;
    serializeHelper(root, out);
    cout << out.str() << "\\n"; // Expect: 1 2 N N 3 4 N N N
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <sstream>
#include <string>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void serializeHelper(TreeNode* root, ostringstream& out) {
    if (!root) {
        out << "N ";
        return;
    }
    out << root->val << " ";
    serializeHelper(root->left, out);
    serializeHelper(root->right, out);
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->right->left = new TreeNode(4);
    
    ostringstream out;
    serializeHelper(root, out);
    cout << out.str() << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '1 2 N N 3 4 N N N ', description: 'Format check for serialization format.' },
  ],
  hints: [
    'If `!root`, do `out << "N ";` and return.',
    'Write the current value: `out << root->val << " ";`',
    'Recursively call left, then right.',
  ],
  complexity: { time: 'O(N) since we visit/process each node once', space: 'O(N) for the string / recursion stack' },
  tags: ['tree', 'serialization', 'dfs', 'string', 'hard', 'faang'],
};
export default lesson;
