const lesson = {
  id: 'm9-l3',
  title: 'Depth-First Search (DFS)',
  module: 9,
  lessonNumber: 3,
  xpReward: 10,
  leetcodeProblems: [
    { id: 200, title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium' },
    { id: 547, title: 'Number of Provinces', url: 'https://leetcode.com/problems/number-of-provinces/', difficulty: 'Medium' },
  ],
  content: `# Depth-First Search (DFS)

DFS explores a graph by going **as deep as possible** along a branch before backtracking. It relies heavily on recursion (which uses the call stack).

Because it perfectly models "decision branches," DFS is the go-to algorithm for **Backtracking, Maze Solving, and Cycle Detection.**

## The Recursive Algorithm
1. Mark the current node as \`visited\`.
2. Process the current node (e.g., print it).
3. Loop through all its neighbors.
4. If a neighbor is **not visited**, recursively call DFS on that neighbor!

\`\`\`cpp
void dfsHelper(int curr, vector<vector<int>>& adjList, vector<bool>& visited) {
    // 1. Mark visited
    visited[curr] = true;
    std::cout << curr << " ";
    
    // 2. Visit neighbors
    for (int neighbor : adjList[curr]) {
        if (!visited[neighbor]) {
            // 3. Go deep!
            dfsHelper(neighbor, adjList, visited);
        }
    }
}
\`\`\`

## Handling Disconnected Graphs
What if your graph is broken into isolated "islands" (components)? If you just call DFS on node \`0\`, you'll never discover the island containing node \`8\`.

**Solution:** Loop through EVERY node. If it isn't visited yet, call DFS on it. This loop perfectly counts the number of disconnected components!

\`\`\`cpp
int findConnectedComponents(int V, vector<vector<int>>& adjList) {
    vector<bool> visited(V, false);
    int components = 0;
    
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            components++; // Found a brand new unconnected island!
            dfsHelper(i, adjList, visited); // This marks the WHOLE island as visited
        }
    }
    return components;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

// Push nodes to dfs_result as they are visited.
void dfs(int node, vector<vector<int>>& adj, vector<bool>& vis, vector<int>& res) {
    // TODO: mark vis[node] = true
    // TODO: push node into res
    // TODO: loop through adj[node], if neighbor !vis, recursively call dfs
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<int>> adj(V + 1);
    for (int i = 0; i < E; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u); // Undirected
    }
    
    vector<bool> vis(V + 1, false);
    vector<int> res;
    
    // Start DFS strictly from node 1 for the test case
    dfs(1, adj, vis, res);
    
    for (int i = 0; i < res.size(); i++) cout << res[i] << (i == res.size()-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

void dfs(int node, vector<vector<int>>& adj, vector<bool>& vis, vector<int>& res) {
    vis[node] = true;
    res.push_back(node);
    
    for (int neighbor : adj[node]) {
        if (!vis[neighbor]) {
            dfs(neighbor, adj, vis, res);
        }
    }
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<int>> adj(V + 1);
    for (int i = 0; i < E; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u); 
    }
    vector<bool> vis(V + 1, false);
    vector<int> res;
    dfs(1, adj, vis, res);
    
    for (int i = 0; i < res.size(); i++) cout << res[i] << (i == res.size()-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4 3\n1 2\n2 4\n1 3', expectedOutput: '1 2 4 3', description: 'Visits 2, goes deep to 4, backtracks, then visits 3.' },
    { input: '3 2\n1 2\n1 3', expectedOutput: '1 2 3', description: 'Standard branching tree structure.' },
  ],
  hints: [
    '`vis[node] = true;` comes absolutely first.',
    '`res.push_back(node);` logs the specific visitation path requested by the tests.',
    `Don't forget to pass the arrays by reference in the recursive function!`,
  ],
  complexity: { time: 'O(V + E) assuming adjacency list', space: 'O(V) for visited array and recursion stack' },
  tags: ['graph', 'dfs', 'recursion', 'components'],
};
export default lesson;
