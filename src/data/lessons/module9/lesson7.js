const lesson = {
  id: 'm9-l7',
  title: 'Bellman-Ford Algorithm',
  module: 9,
  lessonNumber: 7,
  xpReward: 10,
  leetcodeProblems: [
    { id: 787, title: 'Cheapest Flights Within K Stops', url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', difficulty: 'Medium' },
  ],
  content: `# Bellman-Ford Algorithm

What happens when a graph has **Negative Weights**?
Dijkstra's algorithm assumes that any path extended by an edge becomes strictly worse (since weights are positive). If an edge can be negative, taking a longer, wildly winding path might suddenly slash your total cost! Dijkstra completely breaks down.

The **Bellman-Ford Algorithm** calculates the shortest path from a single source vertex to all others by iteratively relaxing all edges. It takes $O(V \\times E)$ time.

## How it works
The fundamental math states: The longest possible simple path (no cycles) in a graph with $V$ vertices has exactly $V - 1$ edges.
So, if we take **EVERY** edge, and update the distances ($dist[v] = \\min(dist[v], dist[u] + weight)$), and we do this entire process $V - 1$ times, we are guaranteed to find the shortest path for all nodes!

## Detecting Negative Cycles
If a cycle contains edges that sum to a negative number, you can loop infinitely to reach $-\\infty$ distance. This breaks all shortest-path math!

Bellman-Ford detects this wonderfully:
Run the relaxation loop *one more time* (the $V$-th time). If any distance updates on the $V$-th pass, we know a **negative cycle exists**!

\`\`\`cpp
vector<int> bellmanFord(int V, int source, vector<vector<int>>& edges) {
    vector<int> dist(V, 1e8);
    dist[source] = 0;
    
    // Relax all edges V-1 times
    for (int i = 0; i < V - 1; i++) {
        for (auto edge : edges) {
            int u = edge[0], v = edge[1], weight = edge[2];
            
            if (dist[u] != 1e8 && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
            }
        }
    }
    
    // The V-th pass to detect negative cycles
    for (auto edge : edges) {
        int u = edge[0], v = edge[1], weight = edge[2];
        if (dist[u] != 1e8 && dist[u] + weight < dist[v]) {
            return {-1}; // Cycle Detected!
        }
    }
    
    return dist;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Implement Bellman Ford for 0-indexed nodes.
// If a negative cycle exists, return an array consisting of single element -1.
vector<int> bellmanFord(int V, int source, vector<vector<int>>& edges) {
    vector<int> dist(V, 1e8); // Use 1e8 for infinity
    dist[source] = 0;
    
    // TODO: Loop 0 to V - 2
    // Process every edge: u, v, w
    // dist[v] = min(dist[v], dist[u] + w) if dist[u] is not 1e8
    
    // TODO: Loop one more time to check negatives
    
    return dist;
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<int>> edges(E, vector<int>(3));
    for (int i = 0; i < E; i++) {
        cin >> edges[i][0] >> edges[i][1] >> edges[i][2]; // u, v, w
    }
    
    vector<int> dist = bellmanFord(V, 0, edges);
    if (dist.size() == 1 && dist[0] == -1) cout << "-1\\n";
    else {
        for (int i = 0; i < V; i++) cout << dist[i] << (i == V-1 ? "" : " ");
        cout << "\\n";
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

vector<int> bellmanFord(int V, int source, vector<vector<int>>& edges) {
    vector<int> dist(V, 1e8);
    dist[source] = 0;
    
    for (int i = 0; i < V - 1; i++) {
        for (auto edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != 1e8 && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    for (auto edge : edges) {
        int u = edge[0], v = edge[1], w = edge[2];
        if (dist[u] != 1e8 && dist[u] + w < dist[v]) {
            return {-1};
        }
    }
    return dist;
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<int>> edges(E, vector<int>(3));
    for (int i = 0; i < E; i++) cin >> edges[i][0] >> edges[i][1] >> edges[i][2];
    
    vector<int> dist = bellmanFord(V, 0, edges);
    if (dist.size() == 1 && dist[0] == -1) cout << "-1\\n";
    else {
        for (int i = 0; i < V; i++) cout << dist[i] << (i == V-1 ? "" : " ");
        cout << "\\n";
    }
    return 0;
}`,
  testCases: [
    { input: '3 3\n0 1 -1\n1 2 -2\n0 2 1', expectedOutput: '0 -1 -3', description: 'Simple negative edge reductions. Path 0->1->2 (-3) beats direct 0->2 (1).' },
    { input: '3 3\n0 1 -1\n1 2 -2\n2 0 -1', expectedOutput: '-1', description: 'Negative cycle detected! -1 - 2 - 1 = -4.' },
  ],
  hints: [
    'You are looping over a raw `edges` array, NOT an adjacency list.',
    'Relax equation is: `if (dist[u] != 1e8 && dist[u] + weight < dist[v]) dist[v] = dist[u] + weight;`',
    'Return `vector<int>{-1};` if the N-th pass updates any distance.',
  ],
  complexity: { time: 'O(V * E)', space: 'O(V) for the distance array' },
  tags: ['graph', 'bellman-ford', 'shortest-path', 'negative-cycle'],
};
export default lesson;
