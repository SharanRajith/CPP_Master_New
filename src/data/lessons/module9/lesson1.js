const lesson = {
  id: 'm9-l1',
  title: 'Graph Representation',
  module: 9,
  lessonNumber: 1,
  xpReward: 10,
  leetcodeProblems: [
    { id: 133, title: 'Clone Graph', url: 'https://leetcode.com/problems/clone-graph/', difficulty: 'Medium' },
  ],
  content: `# Graph Representation

A **Graph** is a set of Nodes (Vertices) and the edges that connect them.
There are two main ways to represent a graph in C++ algorithms.

## 1. Adjacency Matrix
A 2D array of size $V \\times V$ (where V is the number of vertices).
- \`adjMatrix[i][j] = 1\` means there is an edge from \`i\` to \`j\`.
- **Pros:** Checking if an edge exists between two nodes is exactly $O(1)$.
- **Cons:** It takes $O(V^2)$ memory! This is a massive waste of space for sparse graphs (graphs without many edges).
\`\`\`cpp
int adj[100][100]; // 10,000 integers to store maybe 5 edges.
\`\`\`

## 2. Adjacency List (The Gold Standard)
An array (or vector) of Lists. Each node maintains a small list of only the nodes it is directly connected to.
- **Pros:** Memory usage is extremely tight: $O(V + E)$ where $E$ is edges. Iterating over a node's neighbors is very fast.
- **Cons:** Checking if an edge exists between \`i-\>j\` takes $O(K)$ time where K is the number of neighbors \`i\` has.

\`\`\`cpp
#include <vector>

// Creating a graph with 5 vertices (0 to 4)
std::vector<int> adjList[5];

// Adding an undirected edge between node 0 and node 2:
adjList[0].push_back(2);
adjList[2].push_back(0);

// Iterating over the neighbors of node 0:
for (int neighbor : adjList[0]) {
    std::cout << neighbor << " ";
}
\`\`\`

> **Edge Weights:** If edges have weights (cost/distance), you just change the list to store pairs!
> \`std::vector<std::pair<int, int>> adjList[5];\` $\\rightarrow$ \`[0].push_back({neighbor, weight})\`
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Create an undirected Adjacency List from the given edges.
// V is the number of vertices (labelled 1 to V).
// Return a vector of vectors representing the graph.
vector<vector<int>> buildGraph(int V, vector<pair<int, int>>& edges) {
    // 1-indexed elements means we need size V + 1!
    vector<vector<int>> adj(V + 1);
    
    // TODO: Loop through 'edges'
    // For each edge (u, v), push v into adj[u] AND push u into adj[v]
    
    return adj;
}

int main() {
    int V, E; cin >> V >> E;
    vector<pair<int, int>> edges(E);
    for (int i = 0; i < E; i++) {
        cin >> edges[i].first >> edges[i].second;
    }
    
    vector<vector<int>> adj = buildGraph(V, edges);
    
    // Output neighbors of Node 1
    for (int n : adj[1]) cout << n << " ";
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> buildGraph(int V, vector<pair<int, int>>& edges) {
    vector<vector<int>> adj(V + 1);
    for (auto edge : edges) {
        int u = edge.first;
        int v = edge.second;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    return adj;
}

int main() {
    int V, E; cin >> V >> E;
    vector<pair<int, int>> edges(E);
    for (int i = 0; i < E; i++) cin >> edges[i].first >> edges[i].second;
    vector<vector<int>> adj = buildGraph(V, edges);
    for (int n : adj[1]) cout << n << " ";
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4 4\n1 2\n1 3\n2 4\n3 4', expectedOutput: '2 3 ', description: 'Graph forms a square. Node 1 is connected to 2 and 3.' },
    { input: '3 2\n2 1\n3 1',          expectedOutput: '2 3 ', description: 'Direction given backwards, but since it is undirected, 1 knows about both.' },
  ],
  hints: [
    '`adj[u].push_back(v);` connects `u` to `v`.',
    'Because it is an **undirected** graph, you MUST also do `adj[v].push_back(u);`!',
  ],
  complexity: { time: 'O(V + E) to build', space: 'O(V + E) memory structure' },
  tags: ['graph', 'adjacency-list', 'representation'],
};
export default lesson;
