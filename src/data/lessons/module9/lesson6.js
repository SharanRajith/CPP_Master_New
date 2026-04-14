const lesson = {
  id: 'm9-l6',
  title: 'Dijkstra\'s Algorithm',
  module: 9,
  lessonNumber: 6,
  xpReward: 20,
  leetcodeProblems: [
    { id: 743, title: 'Network Delay Time', url: 'https://leetcode.com/problems/network-delay-time/', difficulty: 'Medium' },
    { id: 1514, title: 'Path with Maximum Probability', url: 'https://leetcode.com/problems/path-with-maximum-probability/', difficulty: 'Medium' },
  ],
  content: `# Dijkstra's Algorithm

Dijkstra's Algorithm finds the **shortest path from a single source node to all other nodes** in a graph with **non-negative weights**.

If all edges had a weight of 1, we could just use BFS. 
But because edges have varying costs (e.g. driving 5 miles vs 50 miles), we use a modified BFS that utilizes a **Priority Queue (Min-Heap)**.

## How it Works
Instead of a standard queue (which processes nodes in the order they append), the Priority Queue always processes the node that is currently *closest* to the source!

1. Create a \`dist\` array filled with \`INFINITY\`. Set \`dist[source] = 0\`.
2. Push \`{0, source}\` into the Min-Heap. (Distance is the first element so the heap sorts by distance).
3. While the heap is not empty:
   - Pop the closest node \`u\` with distance \`d\`.
   - Iterate over all its neighbors \`v\` with edge weight \`w\`.
   - If \`d + w < dist[v]\`, we found a strictly shorter path to \`v\`!
   - Update \`dist[v] = d + w\` and push \`{dist[v], v}\` to the Min-Heap.

\`\`\`cpp
#include <queue>
#include <vector>

void dijkstra(int source, int V, vector<vector<pair<int, int>>>& adjList) {
    // Min-Heap: {distance, node}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> dist(V, 1e9); // 1e9 represents Infinity
    
    dist[source] = 0;
    pq.push({0, source});
    
    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        
        // Skip stale pairs in the PQ
        if (d > dist[u]) continue;
        
        for (auto edge : adjList[u]) {
            int v = edge.first;     // neighbor
            int w = edge.second;    // weight
            
            // Relaxation
            if (d + w < dist[v]) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }
}
\`\`\`

> **Why non-negative weights?** If an edge has a negative cost, going in a circle over and over could cause your distance to approach negative infinity! Dijkstra cannot handle this. You need Bellman-Ford for negative edges.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Find shortest paths from source 0 to all other vertices.
// Return the dist vector.
vector<int> dijkstra(int V, int source, vector<vector<pair<int, int>>>& adj) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> dist(V, 1e9);
    
    // TODO: init source
    // TODO: loop while pq is not empty
    // pop node u with distance d. (skip if d > dist[u])
    // loop through adj[u]. If d + weight < dist[neighbor], update and push.
    
    return dist;
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<pair<int, int>>> adj(V);
    for (int i = 0; i < E; i++) {
        int u, v, w; cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w}); // Undirected
    }
    // Start from node 0
    vector<int> dist = dijkstra(V, 0, adj);
    for (int i = 0; i < V; i++) cout << dist[i] << (i == V-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> dijkstra(int V, int source, vector<vector<pair<int, int>>>& adj) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> dist(V, 1e9);
    
    dist[source] = 0;
    pq.push({0, source});
    
    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto edge : adj[u]) {
            int v = edge.first;
            int w = edge.second;
            if (d + w < dist[v]) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<pair<int, int>>> adj(V);
    for (int i = 0; i < E; i++) {
        int u, v, w; cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    vector<int> dist = dijkstra(V, 0, adj);
    for (int i = 0; i < V; i++) cout << dist[i] << (i == V-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '3 3\n0 1 10\n0 2 3\n1 2 2', expectedOutput: '0 5 3', description: 'Optimal path to 1 is through 2 (3 + 2 = 5) instead of direct (10).' },
  ],
  hints: [
    'Edges are stored as `{neighbor_index, weight}` in `adj`. Priority Queue stores as `{distance_so_far, node_index}`.',
    'Relaxation equation: `if (d + w < dist[v]) { dist[v] = d + w; pq.push({dist[v], v}); }`',
  ],
  complexity: { time: 'O(E log V)', space: 'O(V + E)' },
  tags: ['graph', 'dijkstra', 'shortest-path', 'priority-queue'],
};
export default lesson;
