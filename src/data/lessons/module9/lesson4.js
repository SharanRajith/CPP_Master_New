const lesson = {
  id: 'm9-l4',
  title: 'Topological Sort (Kahn\'s Algorithm)',
  module: 9,
  lessonNumber: 4,
  xpReward: 15,
  leetcodeProblems: [
    { id: 207, title: 'Course Schedule',   url: 'https://leetcode.com/problems/course-schedule/',   difficulty: 'Medium' },
    { id: 210, title: 'Course Schedule II', url: 'https://leetcode.com/problems/course-schedule-ii/', difficulty: 'Medium' },
  ],
  content: `# Topological Sort

Imagine you are building a CI/CD pipeline or planning a university course schedule. "Task B depends on Task A." This is a **Directed Acyclic Graph (DAG)**. 
A **Topological Sort** is a linear ordering of vertices such that for every directed edge \`u -> v\`, vertex \`u\` comes before \`v\` in the ordering.

*(Note: Topological Sort ONLY works on graphs with absolutely no cycles!)*

## Kahn's Algorithm (BFS Approach)
The most intuitive way to build a topological sort relies on analyzing **In-Degrees** (how many incoming edges a node has).
If a node has an In-Degree of 0, it has no dependencies! It is ready to be executed immediately.

### Algorithm Steps:
1. **Calculate In-Degrees:** Loop through your edge list and count the incoming edges for every node.
2. **Find Roots:** Push all nodes with an In-Degree of \`0\` into a Queue.
3. **Process (BFS):**
   - Pop a node from the Queue. Append it to your \`Topological_Order\` array.
   - Look at all of its neighbors. We conceptually "delete" the current node, so we **decrement the In-Degree** of all its neighbors!
   - If a neighbor's In-Degree hits \`0\`, we push it into the Queue!
4. **Cycle Check:** At the end, if the size of \`Topological_Order\` is less than $V$, the graph had a cycle, and a topological sort was mathematically impossible!

\`\`\`cpp
vector<int> topologicalSort(int V, vector<vector<int>>& adj) {
    vector<int> in_degree(V, 0);
    // 1. Calculate in-degrees
    for (int u = 0; u < V; u++) {
        for (int v : adj[u]) {
            in_degree[v]++;
        }
    }
    
    // 2. Queue nodes with 0 in-degree
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (in_degree[i] == 0) q.push(i);
    }
    
    vector<int> top_order;
    // 3. Process
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        top_order.push_back(u);
        
        for (int v : adj[u]) {
            // Decrement in-degree
            in_degree[v]--;
            // If dependency cleared, push to queue!
            if (in_degree[v] == 0) q.push(v);
        }
    }
    
    // Cycle check: if (top_order.size() != V) return {};
    return top_order;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> topologicalSort(int V, vector<vector<int>>& adj) {
    vector<int> in_deg(V, 0);
    vector<int> ans;
    queue<int> q;
    
    // 1. Calculate in-degrees for all neighbors (0-indexed)
    for (int i = 0; i < V; i++) {
        // TODO: iterate over adj[i] and increment their in_deg
    }
    
    // 2. Push all nodes with in_deg == 0 to Q
    // TODO: implement
    
    // 3. BFS loop
    // TODO: pop from Q, push to ans, iterate neighbors, decrement neighbor in_deg,
    // if neighbor in_deg == 0, push to Q.
    
    return ans;
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<int>> adj(V);
    for (int i = 0; i < E; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v); // Directed Edge u -> v
    }
    
    vector<int> res = topologicalSort(V, adj);
    for (int i = 0; i < res.size(); i++) cout << res[i] << (i == res.size()-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> topologicalSort(int V, vector<vector<int>>& adj) {
    vector<int> in_deg(V, 0);
    for (int i = 0; i < V; i++) {
        for (int neighbor : adj[i]) {
            in_deg[neighbor]++;
        }
    }
    
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (in_deg[i] == 0) q.push(i);
    }
    
    vector<int> ans;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        ans.push_back(u);
        
        for (int v : adj[u]) {
            in_deg[v]--;
            if (in_deg[v] == 0) q.push(v);
        }
    }
    return ans;
}

int main() {
    int V, E; cin >> V >> E;
    vector<vector<int>> adj(V);
    for (int i = 0; i < E; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
    }
    
    vector<int> res = topologicalSort(V, adj);
    for (int i = 0; i < res.size(); i++) cout << res[i] << (i == res.size()-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '6 6\n5 0\n5 2\n4 0\n4 1\n2 3\n3 1', expectedOutput: '4 5 2 0 3 1', description: 'Classic DAG. Output is a valid topological sorting.' },
    { input: '2 1\n1 0', expectedOutput: '1 0', description: 'Simple dependency 1 -> 0' },
  ],
  hints: [
    'Graph is 0-indexed in this problem.',
    '`in_deg` calculation: `for(int n : adj[i]) in_deg[n]++;`',
    '`in_deg[v]--` conceptually removes the edge. If it hits 0, it has been resolved: `if (in_deg[v] == 0) q.push(v);`',
  ],
  complexity: { time: 'O(V + E)', space: 'O(V) for the queue and in_deg array' },
  tags: ['graph', 'dag', 'topological-sort', 'bfs'],
};
export default lesson;
