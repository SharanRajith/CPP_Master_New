const lesson = {
  id: 'm7-l8',
  title: 'Segment Tree Basics',
  module: 7,
  lessonNumber: 8,
  xpReward: 20,
  leetcodeProblems: [
    { id: 307, title: 'Range Sum Query - Mutable', url: 'https://leetcode.com/problems/range-sum-query-mutable/', difficulty: 'Medium' },
  ],
  content: `# Segment Trees
  
If you have an array and need to find the sum of elements from index \`L\` to \`R\`, a **Prefix Sum** array does this in $O(1)$ time!
BUT, what if the array is **mutable**? If you change \`arr[3] = 50\`, you have to recalculate the entire Prefix Sum array, taking $O(N)$ time.

A **Segment Tree** solves this perfectly by allowing both **Range Queries** AND **Point Updates** in **$O(\\log N)$** time.

## Concept
A Segment Tree is a binary tree where the root represents the entire array range \`[0, N-1]\`.
Its left child represents the left half \`[0, mid]\`, and its right child represents the right half \`[mid+1, N-1]\`.
Leaf nodes represent single elements \`[i, i]\`.

Since it's a perfectly balanced binary tree, we can represent it using an array (just like a Heap!). The array requires $4 \\times N$ size.

### Building the Tree ($O(N)$)
\`\`\`cpp
void build(int node, int start, int end, vector<int>& arr, vector<int>& tree) {
    if (start == end) { // Leaf node
        tree[node] = arr[start];
        return;
    }
    int mid = start + (end - start) / 2;
    int leftChild = 2 * node;
    int rightChild = 2 * node + 1;
    
    build(leftChild, start, mid, arr, tree);
    build(rightChild, mid + 1, end, arr, tree);
    
    // Internal node stores the sum of its children
    tree[node] = tree[leftChild] + tree[rightChild]; 
}
\`\`\`

### Range Query ($O(\\log N)$)
If the current node's range \`[start, end]\` is completely inside the query \`[L, R]\`, return \`tree[node]\`.
If it's completely outside, return 0.
Else, overlap! Query both children and add their results.
\`\`\`cpp
int query(int node, int start, int end, int L, int R, vector<int>& tree) {
    if (R < start || L > end) return 0; // Completely outside
    if (L <= start && end <= R) return tree[node]; // Completely inside
    
    int mid = start + (end - start) / 2;
    return query(2 * node, start, mid, L, R, tree) + 
           query(2 * node + 1, mid + 1, end, L, R, tree);
}
\`\`\`

> Segment Trees can be configured for Range Minimum, Range Maximum, Range GCD, etc., just by changing the combination logic from \`+\` to \`min()\` or \`max()\`.
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Array to hold the Segment Tree. Size needs to be 4 * N.
vector<int> tree;

// Build the Segment Tree for Range Sum
void build(int node, int start, int end, const vector<int>& arr) {
    // TODO: if start == end, assign tree[node] = arr[start]
    // TODO: calc mid, recursively call for 2*node and 2*node+1
    // TODO: tree[node] = tree[2*node] + tree[2*node+1]
}

// Query the sum from index L to R
int query(int node, int start, int end, int L, int R) {
    // TODO: Complete overlap condition? Return tree[node]
    // TODO: No overlap condition? Return 0
    // TODO: Partial overlap? return sum of left child query and right child query
    return 0;
}

int main() {
    int n, q; cin >> n >> q;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    
    tree.resize(4 * n, 0);
    // Root node is at index 1, representing range [0, n-1]
    build(1, 0, n - 1, arr);
    
    while(q--) {
        int L, R; cin >> L >> R;
        cout << query(1, 0, n - 1, L, R) << "\\n";
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

vector<int> tree;

void build(int node, int start, int end, const vector<int>& arr) {
    if (start == end) {
        tree[node] = arr[start];
        return;
    }
    int mid = start + (end - start) / 2;
    build(2 * node, start, mid, arr);
    build(2 * node + 1, mid + 1, end, arr);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

int query(int node, int start, int end, int L, int R) {
    if (R < start || L > end) return 0;
    if (L <= start && end <= R) return tree[node];
    
    int mid = start + (end - start) / 2;
    return query(2 * node, start, mid, L, R) + 
           query(2 * node + 1, mid + 1, end, L, R);
}

int main() {
    int n, q; cin >> n >> q;
    vector<int> arr(n);
    for(int i = 0; i < n; i++) cin >> arr[i];
    
    tree.resize(4 * n, 0);
    build(1, 0, n - 1, arr);
    
    while(q--) {
        int L, R; cin >> L >> R;
        cout << query(1, 0, n - 1, L, R) << "\\n";
    }
    return 0;
}`,
  testCases: [
    { input: '5 3\n1 3 5 7 9\n0 4\n1 3\n2 2', expectedOutput: '25\n15\n5', description: 'Queries spanning whole array, sub segment, and single element.' },
  ],
  hints: [
    '`tree.resize(4 * n, 0);` handles the mathematical bound for a segment tree array.',
    'Build base case: `if(start == end) { tree[node] = arr[start]; return; }`',
    'Query completely outside: `if(R < start || L > end) return 0;`',
    'Query completely inside: `if(L <= start && end <= R) return tree[node];`',
  ],
  complexity: { time: 'O(N) to build, O(log N) per query', space: 'O(N) for tree array' },
  tags: ['segment-tree', 'range-query', 'advanced', 'binary-tree'],
};
export default lesson;
