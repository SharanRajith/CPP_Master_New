const lesson = {
  id: 'm9-l10',
  title: 'Bipartite Graphs',
  module: 9,
  lessonNumber: 10,
  xpReward: 10,
  leetcodeProblems: [
    { id: 785, title: 'Is Graph Bipartite?', url: 'https://leetcode.com/problems/is-graph-bipartite/', difficulty: 'Medium' },
    { id: 886, title: 'Possible Bipartition', url: 'https://leetcode.com/problems/possible-bipartition/', difficulty: 'Medium' },
  ],
  content: `# Bipartite Graphs

A **Bipartite Graph** is a graph where the nodes can be divided into two independent sets (like "Red Nodes" and "Blue Nodes"), such that **every edge connects a node from set A to a node from set B**.
No edge can connect two nodes "of the same color".

This concept is heavily used in matching algorithms (e.g. assigning M workers to N jobs).

## The Coloring Algorithm
We use standard BFS or DFS.
1. Create a \`color\` array initialized to \`-1\` (uncolored).
2. For each uncolored node, start a traversal and color it \`0\`.
3. Look at all its neighbors.
   - If a neighbor is **uncolored** (\`-1\`), color it the **opposite** of the current node (\`1 - curr_color\`).
   - If a neighbor **is already colored**, check its color! If its color is exactly the same as the current node's color, the graph is NOT bipartite!

## Visualizing Cycles
A graph with no cycles is always bipartite.
A graph with an **even** length cycle is always bipartite.
A graph with an **odd** length cycle is **NEVER** bipartite.

### BFS Implementation
\`\`\`cpp
// Assume color vector initialized to -1
bool bfsCheck(int start, vector<vector<int>>& adj, vector<int>& color) {
    queue<int> q;
    q.push(start);
    color[start] = 0; // Color start node 0
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        
        for (int neighbor : adj[node]) {
            // If completely uncolored, color it the opposite and push
            if (color[neighbor] == -1) {
                color[neighbor] = 1 - color[node]; 
                q.push(neighbor);
            } 
            // If colored the SAME as current, it's impossible!
            else if (color[neighbor] == color[node]) {
                return false; 
            }
        }
    }
    return true;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Return true if the graph is bipartite, false otherwise.
bool isBipartite(int V, vector<vector<int>>& adj) {
    vector<int> color(V, -1);
    
    // We loop through all V to handle disconnected components
    for (int i = 0; i < V; i++) {
        if (color[i] == -1) {
            queue<int> q;
            q.push(i);
            color[i] = 0;
            
            while (!q.empty()) {
                // TODO: Pop node
                // TODO: Loop through adj[node]
                // if uncolored: color opposite (1 - color[node]), push
                // if colored same: return false
            }
        }
    }
    return true;
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<int>> adj(V);
    for (int i = 0; i < E; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u); // Undirected
    }
    
    cout << (isBipartite(V, adj) ? "true" : "false") << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool isBipartite(int V, vector<vector<int>>& adj) {
    vector<int> color(V, -1);
    
    for (int i = 0; i < V; i++) {
        if (color[i] == -1) {
            queue<int> q;
            q.push(i);
            color[i] = 0;
            
            while (!q.empty()) {
                int node = q.front();
                q.pop();
                
                for (int neighbor : adj[node]) {
                    if (color[neighbor] == -1) {
                        color[neighbor] = 1 - color[node];
                        q.push(neighbor);
                    } else if (color[neighbor] == color[node]) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<int>> adj(V);
    for (int i = 0; i < E; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    cout << (isBipartite(V, adj) ? "true" : "false") << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4 4\n0 1\n0 3\n1 2\n2 3', expectedOutput: 'true', description: 'Square cycle (Even length, so valid).' },
    { input: '3 3\n0 1\n1 2\n2 0', expectedOutput: 'false', description: 'Triangle cycle (Odd length, impossible to separate!).' },
  ],
  hints: [
    '`1 - color[node]` mathematically maps `0 -> 1` and `1 -> 0`. It is perfect for toggling colors.',
    'Always handle disconnected components with a `for(i=0 to V-1)` surrounding loop that finds `-1`!',
  ],
  complexity: { time: 'O(V + E)', space: 'O(V) for queue and color array' },
  tags: ['graph', 'bipartite', 'coloring', 'bfs'],
};
export default lesson;
