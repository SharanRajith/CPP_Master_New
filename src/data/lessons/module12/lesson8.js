const lesson = {
  id: 'm12-l8',
  title: 'Sweep Line (Meeting Rooms II)',
  module: 12,
  lessonNumber: 8,
  xpReward: 20,
  leetcodeProblems: [
    { id: 253, title: 'Meeting Rooms II', url: 'https://leetcode.com/problems/meeting-rooms-ii/', difficulty: 'Medium' },
    { id: 218, title: 'The Skyline Problem', url: 'https://leetcode.com/problems/the-skyline-problem/', difficulty: 'Hard' },
  ],
  content: `# Sweep Line Algorithm

When dealing with a massive amount of intervals, overlapping events, or geographic ranges, the **Sweep Line** technique is incredibly powerful.
Instead of keeping arrays of start and end times grouped together, we decouple them into isolated "Events"!

## The Paradigm Shift
Given ` + "`" + `[start, end]` + "`" + ` times for multiple meetings.
- Create an Event for ` + "`" + `(start, +1)` + "`" + ` (We need 1 more room)
- Create an Event for ` + "`" + `(end, -1)` + "`" + ` (A room just freed up)

Toss all these events into a single array (` + "`" + `vector<pair<int, int>>` + "`" + `), and **Sort them by time**.
If you just iterate through the sorted events array, adding the "+1" or "-1" to a running ` + "`" + `current_rooms` + "`" + ` counter, the maximum value that counter hits is the answer!
You essentially "Sweep" an imaginary vertical timeline from left to right.

\`\`\`cpp
int minMeetingRooms(vector<vector<int>>& intervals) {
    // Stores {time, room_delta}
    vector<pair<int, int>> events;
    
    for (auto& interval : intervals) {
        events.push_back({interval[0], 1});   // Meeting starts (+1 room needed)
        // If a meeting starts at the exact same time another ends,
        // we want the end to be processed FIRST to save rooms! 
        // So we give ends a -1 value, which naturally sorts before 1!
        events.push_back({interval[1], -1});  // Meeting ends (-1 room needed)
    }
    
    sort(events.begin(), events.end());
    
    int maxRooms = 0, currentRooms = 0;
    
    for (auto& event : events) {
        currentRooms += event.second; // Add +1 or -1
        maxRooms = max(maxRooms, currentRooms);
    }
    
    return maxRooms;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Implement Meeting Rooms II using Sweep Line
int minMeetingRooms(vector<vector<int>>& intervals) {
    vector<pair<int, int>> events;
    
    // TODO: Create +1 and -1 events
    
    // TODO: Sort the events array
    // (C++ pairs sort automatically based on `.first` and then `.second`)
    
    int maxR = 0, currentR = 0;
    // TODO: Traverse sorted events, accumulate currentR, track maxR
    
    return maxR;
}

int main() {
    int n; cin >> n;
    vector<vector<int>> intervals(n, vector<int>(2));
    for (int i = 0; i < n; i++) cin >> intervals[i][0] >> intervals[i][1];
    
    cout << minMeetingRooms(intervals) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int minMeetingRooms(vector<vector<int>>& intervals) {
    vector<pair<int, int>> events;
    for (auto& interval : intervals) {
        events.push_back({interval[0], 1});
        events.push_back({interval[1], -1});
    }
    
    sort(events.begin(), events.end());
    
    int maxR = 0, currentR = 0;
    for (auto& e : events) {
        currentR += e.second;
        maxR = max(maxR, currentR);
    }
    return maxR;
}

int main() {
    int n; cin >> n;
    vector<vector<int>> intervals(n, vector<int>(2));
    for (int i = 0; i < n; i++) cin >> intervals[i][0] >> intervals[i][1];
    
    cout << minMeetingRooms(intervals) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '3\n0 30\n5 10\n15 20', expectedOutput: '2', description: 'Overlaps are (0,30) with (5,10) and (15,20). Max concurrent is 2.' },
    { input: '2\n7 10\n2 4', expectedOutput: '1', description: 'Non overlapping.' },
  ],
  hints: [
    'Pushing `{interval[0], 1}` and `{interval[1], -1}` and then sorting does absolutely all the heavy lifting automatically.',
  ],
  complexity: { time: 'O(N log N) from sorting the Events array', space: 'O(N) for Events array' },
  tags: ['sweep-line', 'intervals', 'sorting'],
};
export default lesson;
