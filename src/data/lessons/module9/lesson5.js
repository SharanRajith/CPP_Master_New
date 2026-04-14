const lesson = {
  id: 'm9-l5',
  title: 'Cycle Detection',
  module: 9,
  lessonNumber: 5,
  xpReward: 15,
  leetcodeProblems: [
    { id: 207, title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium' },
    { id: 684, title: 'Redundant Connection', url: 'https://leetcode.com/problems/redundant-connection/', difficulty: 'Medium' },
  ],
  content: `# Cycle Detection

Detecting a cycle is a fundamental graph problem. If a cycle exists in a dependency graph, it means the tasks are deadlocked and can never be completed.

The algorithm for cycle detection depends heavily on whether the graph is **Directed** or **Undirected**.

## 1. Undirected Graphs
If an edge goes from \`A - B\`, it goes both ways. 
In a DFS, if we visit a node that is **already visited**, we have found a cycle! 
**BUT wait!** Because it goes both ways, \`A\` will naturally see its parent \`B\` as a neighbor. We must ignore the parent node!

\`\`\`cpp
bool dfsUndirected(int curr, int parent, vector<vector<int>>& adj, vector<bool>& vis) {
    vis[curr] = true;
    for (int neighbor : adj[curr]) {
        if (!vis[neighbor]) {
            if (dfsUndirected(neighbor, curr, adj, vis)) return true;
        } 
        // If neighbor is visited AND is NOT the parent we just came from
        else if (neighbor != parent) {
            return true; // Cycle found!
        }
    }
    return false;
}
\`\`\`

## 2. Directed Graphs
In a directed graph, finding a previously visited node does **not** necessarily mean there's a cycle. (e.g., \`A->B\`, \`A->C\`, \`B->C\` is not a cycle, it's just two paths to C).
To find a cycle, we must find a node that is currently **in the active recursion stack**.

We use an extra array called \`inRecursion\` (or \`pathVis\`).
\`\`\`cpp
bool dfsDirected(int curr, vector<vector<int>>& adj, vector<bool>& vis, vector<bool>& inRec) {
    vis[curr] = true;
    inRec[curr] = true; // Add to current path
    
    for (int neighbor : adj[curr]) {
        if (!vis[neighbor]) {
            if (dfsDirected(neighbor, adj, vis, inRec)) return true;
        } 
        // Cycle: We hit a node that is currently in our active path!
        else if (inRec[neighbor]) {
            return true; 
        }
    }
    
    inRec[curr] = false; // Remove from path as we backtrack
    return false;
}
\`\`\`

> **Pro Tip:** In Kahn's Algorithm (Topological Sort BFS), you can detect a cycle in a Directed Graph just by checking if the sorted array size is less than $V$!
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Detect cycle in an Undirected Graph. Return true if cycle exists.
bool dfs(int node, int parent, vector<vector<int>>& adj, vector<bool>& vis) {
    // TODO: mark visited
    // TODO: iterate neighbors
    // if not visited -> recursive call dfs(neighbor, node). If true, return true.
    // else if neighbor != parent -> cycle found, return true!
    return false;
}

bool hasCycle(int V, vector<vector<int>>& adj) {
    vector<bool> vis(V + 1, false);
    // Handle disconnected components
    for (int i = 1; i <= V; i++) {
        if (!vis[i]) {
            if (dfs(i, -1, adj, vis)) return true;
        }
    }
    return false;
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<int>> adj(V + 1);
    for (int i = 0; i < E; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    cout << (hasCycle(V, adj) ? "Cycle" : "No Cycle") << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

bool dfs(int node, int parent, vector<vector<int>>& adj, vector<bool>& vis) {
    vis[node] = true;
    for (int neighbor : adj[node]) {
        if (!vis[neighbor]) {
            if (dfs(neighbor, node, adj, vis)) return true;
        } else if (neighbor != parent) {
            return true;
        }
    }
    return false;
}

bool hasCycle(int V, vector<vector<int>>& adj) {
    vector<bool> vis(V + 1, false);
    for (int i = 1; i <= V; i++) {
        if (!vis[i]) {
            if (dfs(i, -1, adj, vis)) return true;
        }
    }
    return false;
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<int>> adj(V + 1);
    for (int i = 0; i < E; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    cout << (hasCycle(V, adj) ? "Cycle" : "No Cycle") << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: 'Cycle', description: 'Square graph forms a clear cycle.' },
    { input: '4 3\n1 2\n2 3\n3 4', expectedOutput: 'No Cycle', description: 'Straight line graph (no cycle).' },
  ],
  hints: [
    'The parent of the starting node `i` is passed as `-1`.',
    'if `vis[neighbor] == true`, you only check `neighbor != parent`. If it is NOT the parent, it\'s a cycle!',
  ],
  complexity: { time: 'O(V + E)', space: 'O(V) for visited array and call stack' },
  tags: ['graph', 'cycle-detection', 'dfs', 'undirected'],
};
export default lesson;
