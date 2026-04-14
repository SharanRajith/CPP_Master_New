const lesson = {
  id: 'm10-l11',
  title: 'Bitmask DP',
  module: 10,
  lessonNumber: 11,
  xpReward: 20,
  leetcodeProblems: [
    { id: 847, title: 'Shortest Path Visiting All Nodes', url: 'https://leetcode.com/problems/shortest-path-visiting-all-nodes/', difficulty: 'Hard' },
  ],
  content: `# Bitmask DP (Traveling Salesman)

When variables are ridiculously small (like $N \\le 16$), it perfectly signals a **Bitmask DP**.
Instead of using arrays of booleans to track "which tasks have been completed" or "which nodes have been visited", we compress the entire array into a single 32-bit Integer!

## The Bitmask Tricks
- **Check if item $i$ is taken:** ` + "`" + `(mask & (1 << i)) != 0` + "`" + `
- **Set item $i$ to taken:** ` + "`" + `mask = mask | (1 << i)` + "`" + `
- **Has everything been taken?** ` + "`" + `mask == (1 << n) - 1` + "`" + `

## Traveling Salesman Problem (Graph Matrix)
Find the minimum cost to visit all nodes in a complete graph.

State: $DP[mask][u]$
It represents the minimum cost to reach node $u$, given that we have already visited the nodes tracked by the $mask$.

\`\`\`cpp
int tsp(int mask, int pos, vector<vector<int>>& dist, vector<vector<int>>& dp, int VISITED_ALL) {
    if(mask == VISITED_ALL) return dist[pos][0]; // Back to start!
    
    if(dp[mask][pos] != -1) return dp[mask][pos]; // Memo
    
    int ans = 1e9;
    for(int city = 0; city < dist.size(); city++) {
        // If city hasn't been visited yet...
        if((mask & (1 << city)) == 0) { 
            int cost = dist[pos][city] + tsp(mask | (1 << city), city, dist, dp, VISITED_ALL);
            ans = min(ans, cost);
        }
    }
    
    return dp[mask][pos] = ans;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Memoization matrix: DP[mask][pos]
int tsp(int mask, int pos, vector<vector<int>>& dist, vector<vector<int>>& dp, int ALL_VISITED) {
    if (mask == ALL_VISITED) return dist[pos][0]; // Loop back to 0
    if (dp[mask][pos] != -1) return dp[mask][pos]; // Return memoized
    
    int ans = 1e9;
    for (int city = 0; city < dist.size(); city++) {
        // TODO: Is city not visited? 
        // mask & (1 << city) == 0
        // Calculate new cost and update ans
    }
    
    return dp[mask][pos] = ans;
}

int main() {
    int n; cin >> n;
    vector<vector<int>> dist(n, vector<int>(n));
    for(int i=0; i<n; i++)
        for(int j=0; j<n; j++)
            cin >> dist[i][j];
            
    int VISITED_ALL = (1 << n) - 1;
    vector<vector<int>> dp(1 << n, vector<int>(n, -1));
    
    // Start at city 0, so mask is initially 1 (binary 0001)
    cout << tsp(1, 0, dist, dp, VISITED_ALL) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int tsp(int mask, int pos, vector<vector<int>>& dist, vector<vector<int>>& dp, int ALL_VISITED) {
    if (mask == ALL_VISITED) return dist[pos][0];
    if (dp[mask][pos] != -1) return dp[mask][pos];
    
    int ans = 1e9;
    for (int city = 0; city < dist.size(); city++) {
        if ((mask & (1 << city)) == 0) {
            int newCost = dist[pos][city] + tsp(mask | (1 << city), city, dist, dp, ALL_VISITED);
            ans = min(ans, newCost);
        }
    }
    return dp[mask][pos] = ans;
}

int main() {
    int n; cin >> n;
    vector<vector<int>> dist(n, vector<int>(n));
    for(int i=0; i<n; i++)
        for(int j=0; j<n; j++)
            cin >> dist[i][j];
            
    int VISITED_ALL = (1 << n) - 1;
    vector<vector<int>> dp(1 << n, vector<int>(n, -1));
    cout << tsp(1, 0, dist, dp, VISITED_ALL) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4\n0 10 15 20\n10 0 35 25\n15 35 0 30\n20 25 30 0', expectedOutput: '80', description: 'Standard 4x4 TSP cost map. Shortest loop is 80.' },
  ],
  hints: [
    '`if ((mask & (1 << city)) == 0)`',
    '`tsp(mask | (1 << city), city, ...)`'
  ],
  complexity: { time: 'O(N^2 * 2^N)', space: 'O(N * 2^N)' },
  tags: ['dp', 'bitmask', 'tsp', 'hard'],
};
export default lesson;
