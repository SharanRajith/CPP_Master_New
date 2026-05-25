const lesson = {
  id: 'msvc-l7',
  title: 'Cognizant: Graph DSA Questions',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 200, title: 'Number of Islands',          url: 'https://leetcode.com/problems/number-of-islands/',          difficulty: 'Medium' },
    { id: 133, title: 'Clone Graph',                url: 'https://leetcode.com/problems/clone-graph/',                difficulty: 'Medium' },
    { id: 207, title: 'Course Schedule',            url: 'https://leetcode.com/problems/course-schedule/',            difficulty: 'Medium' },
  ],
  content: `# Cognizant GenC Elevate — Graph DSA Questions

Cognizant GenC Elevate (the top hiring track) tests graph problems using BFS and DFS.

---

## Graph Representation

\`\`\`cpp
// Adjacency List
vector<vector<int>> adj(n);
adj[u].push_back(v); // directed
adj[v].push_back(u); // undirected
\`\`\`

---

## 1. BFS — Level-order Graph Traversal

\`\`\`cpp
void bfs(int src, vector<vector<int>>& adj, int n) {
    vector<bool> visited(n, false);
    queue<int> q;
    q.push(src);
    visited[src] = true;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";
        for (int nb : adj[node]) {
            if (!visited[nb]) { visited[nb] = true; q.push(nb); }
        }
    }
}
\`\`\`

---

## 2. DFS — Recursive

\`\`\`cpp
void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    for (int nb : adj[node])
        if (!visited[nb]) dfs(nb, adj, visited);
}
\`\`\`

---

## 3. Number of Islands (2D BFS)

\`\`\`cpp
void sink(vector<vector<char>>& grid, int i, int j) {
    if (i<0||i>=grid.size()||j<0||j>=grid[0].size()||grid[i][j]!='1') return;
    grid[i][j] = '0';
    sink(grid, i+1, j); sink(grid, i-1, j);
    sink(grid, i, j+1); sink(grid, i, j-1);
}

int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for (int i=0; i<grid.size(); i++)
        for (int j=0; j<grid[0].size(); j++)
            if (grid[i][j]=='1') { sink(grid,i,j); count++; }
    return count;
}
\`\`\`

---

## 4. Detect Cycle in Directed Graph (DFS)

\`\`\`cpp
bool dfsCheck(int node, vector<vector<int>>& adj, vector<int>& visited) {
    visited[node] = 1; // in recursion stack
    for (int nb : adj[node]) {
        if (visited[nb] == 1) return true;        // back edge = cycle
        if (visited[nb] == 0 && dfsCheck(nb, adj, visited)) return true;
    }
    visited[node] = 2; // fully processed
    return false;
}
\`\`\`

---

## 5. Topological Sort (Kahn's BFS)

\`\`\`cpp
vector<int> topoSort(int n, vector<vector<int>>& adj) {
    vector<int> indegree(n, 0);
    for (int u=0; u<n; u++) for (int v : adj[u]) indegree[v]++;
    queue<int> q;
    for (int i=0; i<n; i++) if (indegree[i]==0) q.push(i);
    vector<int> order;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);
        for (int nb : adj[node]) if (--indegree[nb]==0) q.push(nb);
    }
    return order;
}
\`\`\`

---

## Cognizant Tips

- BFS is for **shortest path** / level problems; DFS is for **connectivity** / cycle detection.
- Always mark nodes visited BEFORE pushing to queue (not after popping).
- Number of Islands is Cognizant's most frequently asked graph problem.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void bfs(int src, vector<vector<int>>& adj, int n) {
    // TODO: BFS traversal from src, print each node
}

int main() {
    int n = 5;
    vector<vector<int>> adj(n);
    adj[0] = {1, 2};
    adj[1] = {3};
    adj[2] = {4};
    bfs(0, adj, n); // 0 1 2 3 4
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void bfs(int src, vector<vector<int>>& adj, int n) {
    vector<bool> visited(n, false);
    queue<int> q;
    q.push(src); visited[src] = true;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";
        for (int nb : adj[node])
            if (!visited[nb]) { visited[nb] = true; q.push(nb); }
    }
    cout << "\\n";
}

int main() {
    int n = 5;
    vector<vector<int>> adj(n);
    adj[0] = {1, 2};
    adj[1] = {3};
    adj[2] = {4};
    bfs(0, adj, n);
    return 0;
}`,
  testCases: [
    { description: 'BFS from node 0: should visit 0 1 2 3 4 in order', expectedOutput: '0 1 2 3 4 ' },
  ],
  hints: [
    'Use a queue and a visited array.',
    'Mark a node visited when you PUSH it (not when you pop), to avoid duplicates in the queue.',
    'For each dequeued node, print it and push all unvisited neighbours.',
  ],
  complexity: { time: 'O(V + E)', space: 'O(V)' },
  tags: ['cognizant', 'graph', 'bfs', 'dfs', 'dsa'],
};
export default lesson;
