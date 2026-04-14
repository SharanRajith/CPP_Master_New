const lesson = {
  id: 'm7-l9',
  title: 'Binary Indexed Tree (Fenwick)',
  module: 7,
  lessonNumber: 9,
  xpReward: 20,
  leetcodeProblems: [
    { id: 307, title: 'Range Sum Query - Mutable', url: 'https://leetcode.com/problems/range-sum-query-mutable/', difficulty: 'Medium' },
  ],
  content: `# Binary Indexed Tree (Fenwick Tree)

A **Binary Indexed Tree (BIT)** solves the exact same problem as a Segment Tree (Range Queries and Point Updates in $O(\\log N)$ time), but it takes **way less code** and **less memory** ($O(N)$ instead of $O(4N)$).

However, it is less versatile than a Segment Tree (e.g. it's much harder to use for Range Min/Max).

## The Magic: Two's Complement
A BIT array stores cumulative sums covering specific lengths. The length it covers is dictated by the **Last Set Bit** (the lowest \`1\`) in the binary representation of the index \`i\`.
To isolate the last set bit in C++: \`i & (-i)\`!

Examples of \`i & (-i)\`:
- If \`i = 4\` (100 in binary), \`i & -i\` is \`4\`. (Covers 4 elements)
- If \`i = 3\` (011 in binary), \`i & -i\` is \`1\`. (Covers 1 element)

> **BIT Arrays are 1-Indexed!** \`arr[0]\` is always ignored because \`0 & -0\` creates an infinite loop.

## The Code
The algorithms for adding a value and getting a prefix sum are unbelievably short:

\`\`\`cpp
class BIT {
    vector<int> tree;
public:
    BIT(int n) {
        // 1-indexed, so size is n + 1
        tree.assign(n + 1, 0); 
    }
    
    // Add 'delta' to element at index 'i' (1-based index)
    // Moves UP the tree: i += i & (-i)
    void add(int i, int delta) {
        while (i < tree.size()) {
            tree[i] += delta;
            i += (i & -i); 
        }
    }
    
    // Get prefix sum from 1 to 'i' (1-based index)
    // Moves DOWN the tree: i -= i & (-i)
    int query(int i) {
        int sum = 0;
        while (i > 0) {
            sum += tree[i];
            i -= (i & -i); 
        }
        return sum;
    }
};
\`\`\`

To query a range \`[L, R]\` (both 1-indexed), you just do:
\`query(R) - query(L - 1)\`
(Exactly like standard prefix sums!)
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

class BIT {
    vector<int> tree;
public:
    BIT(int n) {
        tree.assign(n + 1, 0);
    }
    
    void add(int i, int delta) {
        // TODO: while i < tree.size(), add delta to tree[i], then i += (i & -i)
    }
    
    int query(int i) {
        int sum = 0;
        // TODO: while i > 0, add tree[i] to sum, then i -= (i & -i)
        return sum; 
    }
};

int main() {
    int n, q; cin >> n >> q;
    BIT bit(n);
    
    // Arrays in BIT logic are usually 1-indexed for the user as well
    for(int i = 1; i <= n; i++) {
        int val; cin >> val;
        bit.add(i, val); // Initialize by adding
    }
    
    while(q--) {
        int L, R; cin >> L >> R;
        // Output sum from L to R inclusive
        cout << bit.query(R) - bit.query(L - 1) << "\\n";
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

class BIT {
    vector<int> tree;
public:
    BIT(int n) { tree.assign(n + 1, 0); }
    
    void add(int i, int delta) {
        while (i < tree.size()) {
            tree[i] += delta;
            i += (i & -i);
        }
    }
    
    int query(int i) {
        int sum = 0;
        while (i > 0) {
            sum += tree[i];
            i -= (i & -i);
        }
        return sum;
    }
};

int main() {
    int n, q; cin >> n >> q;
    BIT bit(n);
    for(int i = 1; i <= n; i++) {
        int val; cin >> val;
        bit.add(i, val);
    }
    while(q--) {
        int L, R; cin >> L >> R;
        cout << bit.query(R) - bit.query(L - 1) << "\\n";
    }
    return 0;
}`,
  testCases: [
    { input: '5 3\n1 3 5 7 9\n1 5\n2 4\n3 3', expectedOutput: '25\n15\n5', description: 'Range queries using 1-indexed queries.' },
  ],
  hints: [
    'The "Bitwise AND with Two\'s Complement" logic is `i & -i` or `i & (~i + 1)`.',
    'In `add(i, delta)` you INCREASE `i` because you are updating all combinations that encapsulate `i`.',
    'In `query(i)` you DECREASE `i` because you are summing smaller and smaller disjoint chunks leading down to 0.',
  ],
  complexity: { time: 'O(log N) for both add and query', space: 'O(N) exactly.' },
  tags: ['fenwick-tree', 'bit', 'range-query', 'advanced', 'math'],
};
export default lesson;
