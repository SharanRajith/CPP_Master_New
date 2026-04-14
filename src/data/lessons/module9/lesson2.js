const lesson = {
  id: 'm9-l2',
  title: 'Breadth-First Search (BFS)',
  module: 9,
  lessonNumber: 2,
  xpReward: 10,
  leetcodeProblems: [
    { id: 1091, title: 'Shortest Path in Binary Matrix', url: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/', difficulty: 'Medium' },
    { id: 994,  title: 'Rotting Oranges',                 url: 'https://leetcode.com/problems/rotting-oranges/',                 difficulty: 'Medium' },
  ],
  content: `# Breadth-First Search (BFS)

BFS explores a graph **level by level**. It visits all immediate neighbors of a node before moving on to the neighbors of the neighbors.

Because of this specific ripple-like expansion, BFS is the **ultimate algorithm for finding the Shortest Path** in an unweighted graph. The first time BFS discovers a node, it is mathematically guaranteed to be via the shortest sequence of edges!

## How it works
BFS requires a **Queue** and a **Visited Array** (so we don't process the same node twice and get trapped in an infinite loop).

### The Algorithm
1. Push the starting node into a Queue, and mark it as \`visited\`.
2. While the Queue is not empty:
   - Pop the front node.
   - Iterate over all its neighbors.
   - If a neighbor hasn't been visited:
     - Mark it as visited!
     - Push it into the Queue!

\`\`\`cpp
void bfs(int startNode, vector<vector<int>>& adjList) {
    int n = adjList.size();
    vector<bool> visited(n, false);
    queue<int> q;
    
    // 1. Initialize
    q.push(startNode);
    visited[startNode] = true;
    
    // 2. Loop
    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        
        std::cout << curr << " "; // Process node
        
        // 3. Check neighbors
        for (int neighbor : adjList[curr]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true; // Mark as soon as detected!
                q.push(neighbor);
            }
        }
    }
}
\`\`\`

> **Critical Mistake Warning:** Always mark the node as \`visited\` **before** you push it into the queue! If you wait to mark it visited until it pops, the identical node might get pushed into the queue multiple times in the interim!
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Return a vector representing the nodes in the order they were visited by BFS.
// Start BFS from node 1.
vector<int> bfsOfGraph(int V, vector<vector<int>>& adj) {
    vector<int> bfs_result;
    vector<bool> vis(V + 1, false);
    queue<int> q;
    
    // TODO: Initialize starting from node 1
    // Mark node 1 as visited, push 1 to q
    
    // TODO: While !q.empty()
    // Pop 'curr'
    // push_back 'curr' to bfs_result
    // Loop through neighbors: if !vis[neighbor], mark visited and push
    
    return bfs_result;
}

// IO Helper
int main() {
    int V, E; cin >> V >> E;
    vector<vector<int>> adj(V + 1);
    for (int i = 0; i < E; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        // Assuming directed edges for structured traversal output
    }
    
    vector<int> res = bfsOfGraph(V, adj);
    for (int i = 0; i < res.size(); i++) cout << res[i] << (i == res.size()-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> bfsOfGraph(int V, vector<vector<int>>& adj) {
    vector<int> bfs_result;
    vector<bool> vis(V + 1, false);
    queue<int> q;
    
    q.push(1);
    vis[1] = true;
    
    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        bfs_result.push_back(curr);
        
        for (int neighbor : adj[curr]) {
            if (!vis[neighbor]) {
                vis[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    return bfs_result;
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<int>> adj(V + 1);
    for (int i = 0; i < E; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
    }
    vector<int> res = bfsOfGraph(V, adj);
    for (int i = 0; i < res.size(); i++) cout << res[i] << (i == res.size()-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '5 4\n1 2\n1 3\n2 4\n3 5', expectedOutput: '1 2 3 4 5', description: 'Standard tree-like branching graph.' },
    { input: '4 4\n1 2\n2 3\n3 4\n1 3', expectedOutput: '1 2 3 4', description: 'Graph with cross edge to test visited logic.' },
  ],
  hints: [
    '`q.push(1);` then immediately `vis[1] = true;`',
    '`for(int neighbor : adj[curr])` iterates through all connected vectors.',
    'Make sure to push to `bfs_result` immediately after popping from the queue.',
  ],
  complexity: { time: 'O(V + E) visits every node and checks every edge once', space: 'O(V) for queue and visited array' },
  tags: ['graph', 'bfs', 'queue', 'shortest-path'],
};
export default lesson;
