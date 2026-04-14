const lesson = {
  id: 'm11-l7',
  title: 'Advanced Graphs: Tarjan\'s & Bridges',
  module: 11,
  lessonNumber: 7,
  xpReward: 20,
  leetcodeProblems: [
    { id: 1192, title: 'Critical Connections in a Network', url: 'https://leetcode.com/problems/critical-connections-in-a-network/', difficulty: 'Hard' },
  ],
  content: `# Tarjan's Algorithm (Bridges)

A **Bridge** in a graph (also called a "Critical Connection") is an edge that, if removed, splits the graph into two disconnected components. Finding bridges is mathematically difficult.

## Tarjan's Algorithm Concept
We run a single DFS and maintain two timing markers for EVERY node:
1. ` + "`" + `discovery_time[u]` + "`" + `: The strict step-counter value when DFS first reached ` + "`" + `u` + "`" + `.
2. ` + "`" + `lowest_reach[u]` + "`" + `: The lowest ` + "`" + `discovery_time` + "`" + ` achievable from ` + "`" + `u` + "`" + ` (including through back-edges!).

**The Golden Rule:** 
For an edge ` + "`" + `u -> v` + "`" + `, if ` + "`" + `lowest_reach[v] > discovery_time[u]` + "`" + `, the edge is a **Bridge**!
This means that NO path expanding outwards from ` + "`" + `v` + "`" + ` was able to creatively weave its way back "up" to ` + "`" + `u` + "`" + ` or higher. ` + "`" + `v` + "`" + ` is stranded, and this edge is the only lifeline.

### Post-Order Logic
As DFS backtracks, nodes update their ` + "`" + `lowest_reach` + "`" + ` value using the ` + "`" + `lowest_reach` + "`" + ` values of their children recursively.

\`\`\`cpp
int timer = 0;
void dfs(int u, int p, vector<vector<int>>& adj, vector<bool>& vis, vector<int>& disc, vector<int>& low, vector<vector<int>>& bridges) {
    vis[u] = true;
    disc[u] = low[u] = timer++;
    
    for (int v : adj[u]) {
        if (v == p) continue; // Don't bounce back to parent
        
        if (vis[v]) { 
            // Back-edge found! This means 'v' was previously discovered.
            // Just update 'low[u]' directly from the old discovery time.
            low[u] = min(low[u], disc[v]);
        } else {
            dfs(v, u, adj, vis, disc, low, bridges); // Recursively explore 'v'
            
            // Post-order: 'v' has finished exploring. Inherit its lowest reach!
            low[u] = min(low[u], low[v]);
            
            // Bridge validation!
            if (low[v] > disc[u]) {
                bridges.push_back({u, v});
            }
        }
    }
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int timer = 0;

void dfs(int u, int p, vector<vector<int>>& adj, vector<bool>& vis, 
         vector<int>& disc, vector<int>& low, vector<vector<int>>& bridges) {
    // TODO: implement Tarjan's Bridge finding algorithm
}

vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
    vector<vector<int>> adj(n);
    for (auto c : connections) {
        adj[c[0]].push_back(c[1]);
        adj[c[1]].push_back(c[0]);
    }
    
    vector<bool> vis(n, false);
    vector<int> disc(n, -1), low(n, -1);
    vector<vector<int>> bridges;
    timer = 0;
    
    for (int i = 0; i < n; i++) {
        if (!vis[i]) dfs(i, -1, adj, vis, disc, low, bridges);
    }
    return bridges;
}

int main() {
    int n, e; cin >> n >> e;
    vector<vector<int>> conns(e, vector<int>(2));
    for (int i = 0; i < e; i++) cin >> conns[i][0] >> conns[i][1];
    
    vector<vector<int>> res = criticalConnections(n, conns);
    // Sort output for deterministic testing
    for (auto& b : res) sort(b.begin(), b.end());
    sort(res.begin(), res.end());
    
    for (auto b : res) cout << "[" << b[0] << "," << b[1] << "] ";
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int timer = 0;

void dfs(int u, int p, vector<vector<int>>& adj, vector<bool>& vis, 
         vector<int>& disc, vector<int>& low, vector<vector<int>>& bridges) {
    vis[u] = true;
    disc[u] = low[u] = timer++;
    
    for (int v : adj[u]) {
        if (v == p) continue;
        if (vis[v]) {
            low[u] = min(low[u], disc[v]);
        } else {
            dfs(v, u, adj, vis, disc, low, bridges);
            low[u] = min(low[u], low[v]);
            if (low[v] > disc[u]) {
                bridges.push_back({min(u, v), max(u, v)});
            }
        }
    }
}

vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
    vector<vector<int>> adj(n);
    for (auto c : connections) {
        adj[c[0]].push_back(c[1]);
        adj[c[1]].push_back(c[0]);
    }
    
    vector<bool> vis(n, false);
    vector<int> disc(n, -1), low(n, -1);
    vector<vector<int>> bridges;
    timer = 0;
    
    for (int i = 0; i < n; i++) {
        if (!vis[i]) dfs(i, -1, adj, vis, disc, low, bridges);
    }
    return bridges;
}

int main() {
    int n, e; cin >> n >> e;
    vector<vector<int>> conns(e, vector<int>(2));
    for (int i = 0; i < e; i++) cin >> conns[i][0] >> conns[i][1];
    
    vector<vector<int>> res = criticalConnections(n, conns);
    for (auto& b : res) sort(b.begin(), b.end());
    sort(res.begin(), res.end());
    
    for (auto b : res) cout << "[" << b[0] << "," << b[1] << "] ";
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4 4\n0 1\n1 2\n2 0\n1 3', expectedOutput: '[1,3] ', description: '0-1-2 form a triangle loop (no bridges). Node 3 is a lone strand from 1.' },
  ],
  hints: [
    'Just follow the core state machine equations for `disc[]` and `low[]`.',
    'Bridge detected when `low[child] > disc[parent]`.',
  ],
  complexity: { time: 'O(V + E)', space: 'O(V) for recursion and structural arrays' },
  tags: ['graph', 'tarjan', 'bridges', 'dfs', 'hard'],
};
export default lesson;
