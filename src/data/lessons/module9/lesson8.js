const lesson = {
  id: 'm9-l8',
  title: 'Minimum Spanning Tree (MST)',
  module: 9,
  lessonNumber: 8,
  xpReward: 20,
  leetcodeProblems: [
    { id: 1584, title: 'Min Cost to Connect All Points', url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', difficulty: 'Medium' },
  ],
  content: `# Minimum Spanning Tree (MST)

Given an undirected, weighted graph, imagine you want to lay fiber optic cable to connect all the cities together. You want to use the absolute minimum amount of cable (lowest cost) to ensure every city is connected.
This subgraph is called a **Minimum Spanning Tree**!

A spanning tree of a graph perfectly connects all vertices using exactly $V - 1$ edges with no cycles. An **MST** is the spanning tree with the minimum possible total edge weight.

## Prim's Algorithm
Prim's Algorithm grows the MST entirely from a single starting node using a **Priority Queue** (Min-Heap).
It is incredibly similar to Dijkstra's!

1. Start with an empty MST and a \`visited\` array.
2. Push any starting node (e.g. 0) with distance 0 to the priority queue: \`{weight=0, node=0}\`.
3. While the PQ is not empty:
   - Pop the edge with the lowest weight \`w\` connecting to node \`u\`.
   - If \`u\` is already visited, \`continue\`.
   - **Mark \`u\` as visited** and add \`w\` to your \`totalMSTSum\`.
   - Iterate over all neighbors of \`u\`. If a neighbor is not visited, push the connecting edge into the PQ!

\`\`\`cpp
int primsMST(int V, vector<vector<pair<int, int>>>& adj) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<bool> visited(V, false);
    int sum = 0;
    
    // {weight, node}
    pq.push({0, 0}); 
    
    while (!pq.empty()) {
        int wt = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        
        // If node already belongs to the MST, skip!
        if (visited[u]) continue;
        
        visited[u] = true;
        sum += wt; // Added to MST!
        
        for (auto edge : adj[u]) {
            int v = edge.first;
            int edge_wt = edge.second;
            
            if (!visited[v]) {
                pq.push({edge_wt, v});
            }
        }
    }
    return sum;
}
\`\`\`

> What's the difference between Prim's and Dijkstra? 
> Dijkstra's PQ stores the total accumulated distance from the source. Prim's PQ stores ONLY the **direct edge weight** connecting a new isolated node to the existing MST bloc!
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Return the total sum of weights of the Minimum Spanning Tree using Prim's algorithm.
int primsMST(int V, vector<vector<pair<int, int>>>& adj) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<bool> vis(V, false);
    int sum = 0;
    
    // TODO: implement Prim's
    // pq.push({0, 0})
    // Loop via PQ.
    // If not visited -> mark visited, add weight to sum
    // loop neighbors.
    
    return sum;
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<pair<int, int>>> adj(V);
    for (int i = 0; i < E; i++) {
        int u, v, w; cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w}); // Undirected
    }
    
    cout << primsMST(V, adj) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int primsMST(int V, vector<vector<pair<int, int>>>& adj) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<bool> vis(V, false);
    int sum = 0;
    pq.push({0, 0});
    
    while (!pq.empty()) {
        int wt = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        
        if (vis[u]) continue;
        vis[u] = true;
        sum += wt;
        
        for (auto edge : adj[u]) {
            int v = edge.first;
            int edge_wt = edge.second;
            if (!vis[v]) pq.push({edge_wt, v});
        }
    }
    return sum;
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<pair<int, int>>> adj(V);
    for (int i = 0; i < E; i++) {
        int u, v, w; cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    cout << primsMST(V, adj) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '3 3\n0 1 5\n1 2 3\n0 2 1', expectedOutput: '4', description: 'Triangle graph. Uses edge (0,2)[w=1] and (1,2)[w=3]. Ignores edge=5.' },
    { input: '4 5\n0 1 10\n0 2 6\n0 3 5\n1 3 15\n2 3 4', expectedOutput: '19', description: 'MST sum is 19. Edges used: (0,3)[5], (2,3)[4], (0,1)[10]' },
  ],
  hints: [
    '`if (vis[u]) continue;` is critical because multiple edges connecting to `u` might have been placed in the PQ before `u` was resolved.',
    'Only add the weight to `sum` immediately after the `vis[u] continue` check. This means `u` officially joined the Tree!',
  ],
  complexity: { time: 'O(E log E) or O(E log V)', space: 'O(V + E)' },
  tags: ['graph', 'mst', 'prims', 'priority-queue'],
};
export default lesson;
