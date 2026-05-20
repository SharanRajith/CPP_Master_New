const lesson = {
  id: 'm13-l9',
  title: 'Microsoft: Course Schedule (Topological Sort)',
  module: 13,
  lessonNumber: 9,
  xpReward: 25,
  leetcodeProblems: [
    { id: 207, title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium' },
  ],
  content: `# Microsoft: Course Schedule (Topological Sort)

**LeetCode #207** — This problem is the gateway to graph theory in technical interviews. Microsoft asks it to test whether candidates understand **directed graphs, cycles, and dependency resolution** — core to build systems, task schedulers, and package managers.

## Problem Translation

You have \`n\` courses (0 to n-1) and a list of prerequisite pairs \`[a, b]\` meaning "to take course \`a\`, you must first take \`b\`." Can you finish all courses? This is asking: **does the directed graph contain a cycle?**

A dependency cycle means you can never start (e.g., course A requires B, B requires A). If no cycle exists, you can always find a valid ordering — this is **Topological Sort**.

## Why BFS + In-Degree (Kahn's Algorithm)

The elegant BFS approach uses **in-degree** (number of prerequisites for each course):

\`\`\`
Courses: 4, Prerequisites: [[1,0],[2,0],[3,1],[3,2]]

Graph:  0 → 1 → 3
        0 → 2 → 3

In-degrees: [0, 1, 1, 2]
Queue (in-degree 0): [0]

Step 1: process 0 → reduce neighbors 1,2 → in-degrees: [-, 0, 0, 2] → add 1,2 to queue
Step 2: process 1 → reduce neighbor 3 → in-degrees: [-, -, 0, 1]
Step 3: process 2 → reduce neighbor 3 → in-degrees: [-, -, -, 0] → add 3 to queue
Step 4: process 3 → no neighbors
Processed 4 nodes == numCourses → no cycle → return true
\`\`\`

## Full Implementation Breakdown

1. Build an **adjacency list** from prerequisites: \`adj[b].push_back(a)\` (b must come before a).
2. Compute **in-degree** of every node.
3. **BFS**: push all nodes with in-degree 0 into a queue.
4. While queue is not empty: pop a node, increment a counter, and for each neighbor reduce its in-degree. If a neighbor's in-degree becomes 0, push it.
5. If counter equals \`numCourses\`, all nodes were processed → **no cycle** → return \`true\`.

This is also called **Kahn's Algorithm** for topological sort.

## DFS Alternative

You can also use DFS with three states per node: unvisited (0), in-progress (1), done (2). If DFS visits an in-progress node, there's a cycle. Both approaches are $O(V + E)$.

## Real-World Relevance

Microsoft's Azure DevOps pipeline system resolves task dependencies using exactly this algorithm. npm/pip package managers use it to find installation order. The "can we complete all courses" question is isomorphic to "is this build/install/deploy plan valid?"
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    // TODO: build adjacency list: adj[b].push_back(a) for [a,b]
    // TODO: compute in-degree for each course
    // TODO: push all courses with in-degree 0 into a queue
    // TODO: BFS: pop node, count++, for each neighbor decrement in-degree,
    //            if in-degree becomes 0, push to queue
    // TODO: return count == numCourses
    return false;
}

int main() {
    int numCourses = 4;
    vector<vector<int>> prerequisites = {{1,0},{2,0},{3,1},{3,2}};
    cout << (canFinish(numCourses, prerequisites) ? 1 : 0) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> inDegree(numCourses, 0);
    for (auto& p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        inDegree[p[0]]++;
    }
    queue<int> q;
    for (int i = 0; i < numCourses; i++)
        if (inDegree[i] == 0) q.push(i);
    int count = 0;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        count++;
        for (int neighbor : adj[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) q.push(neighbor);
        }
    }
    return count == numCourses;
}

int main() {
    int numCourses = 4;
    vector<vector<int>> prerequisites = {{1,0},{2,0},{3,1},{3,2}};
    cout << (canFinish(numCourses, prerequisites) ? 1 : 0) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '1', description: '4 courses, no cycle → can finish all → output 1' },
  ],
  hints: [
    'Translate the problem: can you finish all courses = does the prerequisite graph have a cycle? No cycle = yes.',
    'Track the in-degree (number of prerequisites) for each course. Courses with in-degree 0 have no prerequisites and can be taken immediately.',
    'Use BFS (Kahn\'s algorithm): start with zero-in-degree courses, process them, reduce neighbors\' in-degrees. If you process all numCourses nodes, there\'s no cycle.',
  ],
  complexity: { time: 'O(V + E)', space: 'O(V + E)', notes: 'V = numCourses, E = number of prerequisite pairs; standard BFS graph traversal' },
  tags: ['graph', 'topological-sort', 'bfs', 'cycle-detection', 'microsoft'],
};
export default lesson;
