const lesson = {
  id: 'msvc-l16',
  title: 'Infosys: Scenario-Based DSA Questions',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 200, title: 'Number of Islands',             url: 'https://leetcode.com/problems/number-of-islands/',             difficulty: 'Medium' },
    { id: 102, title: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'Medium' },
    { id: 56,  title: 'Merge Intervals',               url: 'https://leetcode.com/problems/merge-intervals/',               difficulty: 'Medium' },
  ],
  content: `# Infosys SP / Hackwithinfy — Scenario-Based DSA Questions

Infosys Specialist (SP) and Power Programmer tracks ask scenario questions in the technical interview. You are expected to model the problem, choose a data structure, and explain your reasoning.

---

## Scenario 1 — Hostel Room Allocation

> "A hostel has N floors, each with M rooms. Students arrive and check in to the lowest available room number. When they check out, the room becomes free. Design this system."

**Mapping:** Min-Heap (priority_queue with greater<>) to always give the lowest available room.

\`\`\`cpp
#include <queue>
priority_queue<int, vector<int>, greater<int>> available;

// Initialize: all rooms available
void setup(int floors, int rooms) {
    for (int f = 1; f <= floors; f++)
        for (int r = 1; r <= rooms; r++)
            available.push(f * 100 + r); // e.g., room 201 = floor 2, room 1
}

int checkIn() {
    if (available.empty()) return -1; // fully booked
    int room = available.top(); available.pop();
    return room;
}

void checkOut(int room) {
    available.push(room);
}
// checkIn() → 101, checkIn() → 102, checkOut(101), checkIn() → 101 again
\`\`\`

---

## Scenario 2 — Social Network Friend Suggestion

> "In a social network, suggest friends-of-friends to a user (people who are 2 hops away but not already friends)."

**Mapping:** BFS from the user's node, stop at depth 2. Exclude direct friends.

\`\`\`cpp
vector<int> suggestFriends(int user, vector<vector<int>>& adj) {
    unordered_set<int> directFriends(adj[user].begin(), adj[user].end());
    unordered_set<int> suggestions;
    for (int friend1 : adj[user]) {
        for (int friend2 : adj[friend1]) {
            if (friend2 != user && !directFriends.count(friend2))
                suggestions.insert(friend2);
        }
    }
    return vector<int>(suggestions.begin(), suggestions.end());
}
// If Alice→Bob→Charlie and Alice doesn't know Charlie → suggest Charlie
\`\`\`

---

## Scenario 3 — Meeting Room Scheduler

> "Given a list of meetings with start and end times, find the minimum number of meeting rooms required."

**Mapping:** Sort by start time, use a Min-Heap to track earliest ending room.

\`\`\`cpp
int minMeetingRooms(vector<pair<int,int>>& meetings) {
    sort(meetings.begin(), meetings.end()); // sort by start time
    priority_queue<int, vector<int>, greater<int>> endTimes; // min-heap of end times

    for (auto& [start, end] : meetings) {
        if (!endTimes.empty() && endTimes.top() <= start)
            endTimes.pop(); // reuse room that ended
        endTimes.push(end);
    }
    return endTimes.size();
}
// {[0,30],[5,10],[15,20]} → 2 rooms needed
\`\`\`

---

## Scenario 4 — Flood Fill / Zone Detection

> "In a building floor plan represented as a grid, find how many disconnected zones exist (each zone is a group of connected rooms marked '1')."

**Mapping:** Number of Islands — DFS/BFS on a 2D grid.

\`\`\`cpp
void dfs(vector<vector<char>>& grid, int i, int j) {
    if (i < 0 || i >= grid.size() || j < 0 || j >= grid[0].size() || grid[i][j] != '1') return;
    grid[i][j] = '0'; // mark visited
    dfs(grid, i+1, j); dfs(grid, i-1, j);
    dfs(grid, i, j+1); dfs(grid, i, j-1);
}

int countZones(vector<vector<char>>& grid) {
    int count = 0;
    for (int i = 0; i < grid.size(); i++)
        for (int j = 0; j < grid[0].size(); j++)
            if (grid[i][j] == '1') { dfs(grid, i, j); count++; }
    return count;
}
\`\`\`

---

## Scenario 5 — Task Scheduler with Cooldown

> "A CPU runs tasks. The same task must wait C intervals before running again. Find the minimum time to finish all tasks."

**Mapping:** Frequency sort + Max-Heap + greedy cooldown.

\`\`\`cpp
int leastInterval(vector<char>& tasks, int n) {
    unordered_map<char, int> freq;
    for (char t : tasks) freq[t]++;
    priority_queue<int> pq;
    for (auto& [_, f] : freq) pq.push(f);

    int time = 0;
    while (!pq.empty()) {
        vector<int> temp;
        for (int i = 0; i <= n; i++) { // one cycle of (n+1) slots
            if (!pq.empty()) { temp.push_back(pq.top() - 1); pq.pop(); }
            time++;
            if (pq.empty() && temp.empty()) break;
        }
        for (int f : temp) if (f > 0) pq.push(f);
    }
    return time;
}
// tasks=["A","A","A","B","B","B"], n=2 → 8
\`\`\`

---

## Scenario → DSA Table (Infosys Focus)

| Scenario | Data Structure | Why |
|---|---|---|
| Lowest available room | Min-Heap | Always get minimum in O(log N) |
| Friends-of-friends | Graph + BFS | 2-hop traversal with adjacency list |
| Meeting rooms needed | Min-Heap of end times | Greedily reuse earliest-ending room |
| Connected zones in grid | DFS/BFS on 2D grid | Flood fill per connected component |
| Task cooldown scheduling | Max-Heap + greedy | Always schedule most frequent task first |

---

## How to Answer in Infosys Interview

1. **Restate the problem** in one sentence — shows you understood.
2. **Name the data structure** and say why (e.g., "I'll use a Min-Heap because we always need the minimum end time").
3. **Walk through a small example** before coding.
4. **Code it** — even pseudocode shows problem-solving ability.
5. **State the time complexity** at the end.
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int minMeetingRooms(vector<pair<int,int>>& meetings) {
    // TODO: Return minimum number of meeting rooms needed
    // Hint: Sort by start time, use min-heap to track end times
    return 0;
}

int main() {
    vector<pair<int,int>> meetings = {{0,30},{5,10},{15,20}};
    cout << minMeetingRooms(meetings) << "\\n"; // 2
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int minMeetingRooms(vector<pair<int,int>>& meetings) {
    sort(meetings.begin(), meetings.end());
    priority_queue<int, vector<int>, greater<int>> endTimes;
    for (auto& [start, end] : meetings) {
        if (!endTimes.empty() && endTimes.top() <= start)
            endTimes.pop();
        endTimes.push(end);
    }
    return endTimes.size();
}

int main() {
    vector<pair<int,int>> meetings = {{0,30},{5,10},{15,20}};
    cout << minMeetingRooms(meetings) << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'Meetings {[0,30],[5,10],[15,20]} need 2 rooms', expectedOutput: '2' },
  ],
  hints: [
    'Sort meetings by start time first.',
    'Use a min-heap of end times to track when rooms free up.',
    'If the earliest ending room frees up before the next meeting starts, reuse it (pop and push new end time); otherwise add a new room.',
  ],
  complexity: { time: 'O(N log N)', space: 'O(N)' },
  tags: ['infosys', 'scenario', 'heap', 'graph', 'interview'],
};
export default lesson;
