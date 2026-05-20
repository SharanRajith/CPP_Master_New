const lesson = {
  id: 'm8-l9',
  title: 'Task Scheduler',
  module: 8,
  lessonNumber: 9,
  xpReward: 20,
  leetcodeProblems: [
    { id: 621, title: 'Task Scheduler', url: 'https://leetcode.com/problems/task-scheduler/', difficulty: 'Medium' },
  ],
  content: `# Task Scheduler

You are given a list of CPU tasks and a **cooldown** \`n\`. The same task cannot be executed within \`n\` intervals of its last execution. Idle cycles can fill the gaps. Return the **minimum** number of intervals to finish all tasks.

## Example

\`\`\`
tasks = [A, A, A, B, B, B],  n = 2

One valid schedule:
 A B _ A B _ A B
 1 2 3 4 5 6 7 8  → 8 intervals

Wait — that's 8. But we can do:
 A B _ A B _ A B → 8  (correct!)
\`\`\`

Actually with \`n=2\`: after executing A, we must wait 2 slots before executing A again. The most frequent task drives the minimum time.

## The Math Formula (O(N) — no heap needed)

Let \`maxFreq\` = the frequency of the most frequent task.
Let \`maxCount\` = the number of tasks that share that maximum frequency.

Imagine laying out the schedule in "frames" of size \`n+1\`:

\`\`\`
[ A  B  _  ]  [ A  B  _  ]  [ A  B ]
  ← n+1 = 3 →   ← n+1 = 3 →   ← last frame
\`\`\`

- Number of complete frames = \`maxFreq - 1\`
- Each complete frame has \`n + 1\` slots
- The last frame has \`maxCount\` tasks (all tasks tied for maxFreq)

Formula: \`(maxFreq - 1) * (n + 1) + maxCount\`

But we must also consider: if we have many distinct tasks, we might not need any idle time at all. In that case the answer is just the total number of tasks.

\`\`\`
answer = max(totalTasks, (maxFreq - 1) * (n + 1) + maxCount)
\`\`\`

### Verification

\`\`\`
tasks=AAABBB, n=2:
  freq: A=3, B=3.  maxFreq=3, maxCount=2
  formula = (3-1)*(2+1) + 2 = 2*3 + 2 = 8 ✓

tasks=AAABBB, n=0:
  maxFreq=3, maxCount=2
  formula = (3-1)*(0+1) + 2 = 2 + 2 = 4
  totalTasks = 6
  answer = max(6, 4) = 6 ✓   (no idle time needed)

tasks=AAABC, n=2:
  freq: A=3,B=1,C=1. maxFreq=3, maxCount=1
  formula = (3-1)*(2+1) + 1 = 6 + 1 = 7 ✓
\`\`\`

## The Greedy Heap Approach (more intuitive, O(N log N))

At each step, schedule as many distinct tasks as possible within a window of \`n+1\`. Always prefer the most frequent remaining task (greedy choice via max-heap).

\`\`\`
1. Count frequency of each task.
2. Push all frequencies into a max-heap.
3. Repeat until all tasks done:
   a. Collect up to (n+1) tasks in this cycle, picking highest-frequency first.
   b. Decrement each chosen task's frequency.
   c. Add back tasks with remaining count > 0.
   d. intervals += max(n+1, tasks_processed_this_cycle)
\`\`\`

We implement the **math formula** approach here since it's O(N) and cleaner.

## Implementation

\`\`\`cpp
int leastInterval(string tasks, int n) {
    int freq[26] = {};
    for (char c : tasks) freq[c - 'A']++;

    int maxFreq = *max_element(freq, freq + 26);
    int maxCount = 0;
    for (int f : freq) if (f == maxFreq) maxCount++;

    int formula = (maxFreq - 1) * (n + 1) + maxCount;
    return max((int)tasks.size(), formula);
}
\`\`\`

## Visual Layout for AAABC, n=2

\`\`\`
Frame 1: [ A  B  C ]   ← n+1 = 3 slots
Frame 2: [ A  _  _ ]   ← only A left, 2 idles
Final:   [ A ]         ← last task

Total: 3 + 3 + 1 = 7

Or compactly: A B C A _ _ A → 7 intervals ✓
\`\`\`

## Input Format

\`\`\`
AAABBB   ← tasks as a string of uppercase letters (no spaces)
2        ← cooldown n
\`\`\`
`,
  starterCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int leastInterval(const string& tasks, int n) {
    int freq[26] = {};
    for (char c : tasks) freq[c - 'A']++;

    // TODO: find maxFreq (maximum frequency among all tasks)
    int maxFreq = 0;

    // TODO: count how many tasks share that maxFreq (maxCount)
    int maxCount = 0;

    // TODO: formula = (maxFreq - 1) * (n + 1) + maxCount
    // TODO: return max(totalTasks, formula)
    return 0;
}

int main() {
    string tasks; int n;
    cin >> tasks >> n;
    cout << leastInterval(tasks, n) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int leastInterval(const string& tasks, int n) {
    int freq[26] = {};
    for (char c : tasks) freq[c - 'A']++;

    int maxFreq = *max_element(freq, freq + 26);
    int maxCount = 0;
    for (int f : freq) if (f == maxFreq) maxCount++;

    int formula = (maxFreq - 1) * (n + 1) + maxCount;
    return max((int)tasks.size(), formula);
}

int main() {
    string tasks; int n;
    cin >> tasks >> n;
    cout << leastInterval(tasks, n) << "\\n";
    return 0;
}`,
  testCases: [
    { input: 'AAABBB\n2', expectedOutput: '8', description: 'A and B both appear 3 times with cooldown 2 → 8 intervals.' },
    { input: 'AAABBB\n0', expectedOutput: '6', description: 'No cooldown — just execute all 6 tasks back-to-back.' },
    { input: 'AAABC\n2',  expectedOutput: '7', description: 'A appears 3 times, B and C once each; cooldown 2 → 7 intervals.' },
  ],
  hints: [
    'Count how many times each task letter appears. Only the **frequency** matters, not the identity of the task.',
    'Find `maxFreq` = the highest frequency. Imagine laying tasks out in chunks of size `n+1` around the most frequent task. The number of complete chunks is `maxFreq - 1`.',
    'Formula: `(maxFreq - 1) * (n + 1) + maxCount`, where `maxCount` is how many tasks tie for the highest frequency. The final answer is `max(totalTasks, formula)` because if tasks are dense enough, no idle time is needed.',
  ],
  complexity: { time: 'O(N log N)', space: 'O(1) for fixed alphabet', notes: 'With the math formula it is O(N). The fixed alphabet (26 letters) makes space O(1).' },
  tags: ['heap', 'greedy', 'math', 'medium', 'task-scheduling'],
};
export default lesson;
