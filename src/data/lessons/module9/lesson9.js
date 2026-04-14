const lesson = {
  id: 'm9-l9',
  title: 'Disjoint Set Union (Union-Find)',
  module: 9,
  lessonNumber: 9,
  xpReward: 15,
  leetcodeProblems: [
    { id: 547, title: 'Number of Provinces', url: 'https://leetcode.com/problems/number-of-provinces/', difficulty: 'Medium' },
    { id: 684, title: 'Redundant Connection', url: 'https://leetcode.com/problems/redundant-connection/', difficulty: 'Medium' },
  ],
  content: `# Disjoint Set Union (DSU)

Also known as **Union-Find**, this is an incredibly elegant data structure designed to solve one specific problem efficiently: **Dynamic Connectivity**.
If you have $N$ isolated nodes, and you randomly start adding edges between them, DSU allows you to instantly answer: "Are Node A and Node B in the same connected component?"

It is heavily used in **Kruskal's Algorithm** for Minimum Spanning Trees, and for finding cycles in undirected graphs.

## The Two Functions
1. \`find(i)\`: Determines which component the node \`i\` belongs to. It does this by finding the "root" of \`i\`'s component.
2. \`unionByRank(u, v)\`: Connects the component containing \`u\` with the component containing \`v\`.

### Core Data Structures
You maintain an array \`parent[]\`. Initially, \`parent[i] = i\` (every node is its own separate root).
When you union \`u\` and \`v\`, you basically say: \`parent[root_of_u] = root_of_v\`. They are now connected!

## Optimizations (MANDATORY)
If you just blindly attach roots, your DSU might form a long linked-list, making \`find()\` take $O(N)$ time. We use two massive optimizations that drop the time complexity to practically $O(1)$!

1. **Path Compression:** When you call \`find(i)\`, you traverse up the tree to find the root. Once you find the root, *update* the parent of \`i\` directly to the root! Future calls will be instant.
2. **Union by Rank (or Size):** Maintain a \`rank[]\` array tracking the tree height. Always attach the smaller tree under the root of the larger tree! This prevents the tree from getting tall.

\`\`\`cpp
class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++) parent[i] = i; // Self roots
    }
    
    int find(int i) {
        if (parent[i] == i) return i;
        // PATH COMPRESSION: Assign to parent during recursion
        return parent[i] = find(parent[i]); 
    }
    
    void unionByRank(int u, int v) {
        int rootU = find(u);
        int rootV = find(v);
        
        if (rootU != rootV) {
            // Attach smaller tree under larger tree
            if (rank[rootU] < rank[rootV]) {
                parent[rootU] = rootV;
            } else if (rank[rootU] > rank[rootV]) {
                parent[rootV] = rootU;
            } else {
                parent[rootV] = rootU; // Tie! 
                rank[rootU]++;         // Height increases by 1
            }
        }
    }
};
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Implement Disjoint Set Union
class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) {
        parent.resize(n); rank.resize(n, 0);
        for(int i = 0; i < n; i++) parent[i] = i;
    }
    
    int find(int i) {
        // TODO: implement with Path Compression
        return 0;
    }
    
    void unionByRank(int u, int v) {
        // TODO: find root of u and v
        // if roots differ, attach smaller rank to larger rank
        // if ranks are equal, attach one to other and increment rank
    }
};

// Given N nodes and a list of edges, find how many standalone components exist.
int countComponents(int n, vector<vector<int>>& edges) {
    DSU dsu(n);
    int components = n;
    
    for (auto edge : edges) {
        int u = edge[0], v = edge[1];
        // If they are in different components, union them and decrement total components
        if (dsu.find(u) != dsu.find(v)) {
            dsu.unionByRank(u, v);
            components--;
        }
    }
    return components;
}

int main() {
    int n, e; cin >> n >> e;
    vector<vector<int>> edges(e, vector<int>(2));
    for (int i = 0; i < e; i++) cin >> edges[i][0] >> edges[i][1];
    
    cout << countComponents(n, edges) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) {
        parent.resize(n); rank.resize(n, 0);
        for(int i=0; i<n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    void unionByRank(int u, int v) {
        int rootU = find(u);
        int rootV = find(v);
        if (rootU != rootV) {
            if (rank[rootU] < rank[rootV]) {
                parent[rootU] = rootV;
            } else if (rank[rootU] > rank[rootV]) {
                parent[rootV] = rootU;
            } else {
                parent[rootV] = rootU;
                rank[rootU]++;
            }
        }
    }
};

int countComponents(int n, vector<vector<int>>& edges) {
    DSU dsu(n);
    int components = n;
    for (auto edge : edges) {
        int u = edge[0], v = edge[1];
        if (dsu.find(u) != dsu.find(v)) {
            dsu.unionByRank(u, v);
            components--;
        }
    }
    return components;
}

int main() {
    int n, e; cin >> n >> e;
    vector<vector<int>> edges(e, vector<int>(2));
    for(int i=0; i<e; i++) cin >> edges[i][0] >> edges[i][1];
    cout << countComponents(n, edges) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '5 3\n0 1\n1 2\n3 4', expectedOutput: '2', description: 'Nodes 0,1,2 form one component. 3,4 form another.' },
    { input: '4 4\n0 1\n1 2\n2 3\n3 0', expectedOutput: '1', description: 'Cycle creates a single component.' },
  ],
  hints: [
    'Path compression: `return parent[i] = find(parent[i]);`',
    '`unionByRank` should only do work if `rootU != rootV`.',
  ],
  complexity: { time: 'O(a(N)) per operation (inverse Ackermann function, essentially O(1))', space: 'O(N) for parent and rank arrays' },
  tags: ['graph', 'dsu', 'union-find', 'components'],
};
export default lesson;
