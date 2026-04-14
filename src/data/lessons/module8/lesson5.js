const lesson = {
  id: 'm8-l5',
  title: 'Sliding Window Maximum',
  module: 8,
  lessonNumber: 5,
  xpReward: 20,
  leetcodeProblems: [
    { id: 239, title: 'Sliding Window Maximum', url: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'Hard' },
  ],
  content: `# Sliding Window Maximum

You are given an array of integers \`nums\`, there is a sliding window of size \`k\` moving from the very left to the very right. You can only see the \`k\` numbers in the window.
Return the maximum in each window state.

## Approach 1: Max-Heap ($O(N \\log N)$)
We can use a \`priority_queue<pair<int, int>>\` storing \`(value, index)\`. As the window slides:
1. Push the new element and its index into the heap.
2. The current maximum is at the top of the heap. **However, it might be an element from an old window!**
3. While the top index is *less than or equal* to \`(current_index - k)\`, keep popping. It's out of bounds!
4. The remaining top element is the valid maximum for the current window.

\`\`\`cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    std::priority_queue<pair<int, int>> pq;
    vector<int> ans;
    
    for (int i = 0; i < nums.size(); ++i) {
        pq.push({nums[i], i});
        
        // Remove maximums if their indices are out of the window
        while (pq.top().second <= i - k) {
            pq.pop();
        }
        
        // Window has formed at index k - 1
        if (i >= k - 1) {
            ans.push_back(pq.top().first);
        }
    }
    return ans;
}
\`\`\`

## Approach 2: Monotonic Deque ($O(N)$)
A strictly better, FAANG-level approach is a Monotonic Deque (\`std::deque\`).
We maintain a strictly decreasing sequence of elements in the deque. 
- Elements smaller than our current element are "useless" (they can never be the maximum because the current element is larger AND entered the window later!). So we pop them from the back.
- Elements that are "out of bounds" are popped from the front.

Both approaches are completely valid, but the Heap approach is far more intuitive to conceptualize!
`,
  starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Find the maximum element in every sliding window of size K
// Reimplement the Heap approach.
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    priority_queue<pair<int, int>> pq;
    vector<int> ans;
    
    for (int i = 0; i < nums.size(); i++) {
        // TODO: Push {nums[i], i}
        // TODO: Clean up the top element if its index <= i - k
        // TODO: If i >= k - 1, push the top's value into ans
    }
    
    return ans;
}

int main() {
    int n, k; cin >> n >> k;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    vector<int> ans = maxSlidingWindow(nums, k);
    for (int i = 0; i < ans.size(); i++) cout << ans[i] << (i == ans.size()-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    priority_queue<pair<int, int>> pq;
    vector<int> ans;
    
    for (int i = 0; i < nums.size(); i++) {
        pq.push({nums[i], i});
        
        while (pq.top().second <= i - k) {
            pq.pop();
        }
        
        if (i >= k - 1) {
            ans.push_back(pq.top().first);
        }
    }
    return ans;
}

int main() {
    int n, k; cin >> n >> k;
    vector<int> nums(n);
    for(int i = 0; i < n; i++) cin >> nums[i];
    
    vector<int> ans = maxSlidingWindow(nums, k);
    for(int i = 0; i < ans.size(); i++) cout << ans[i] << (i == ans.size()-1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
  testCases: [
    { input: '8 3\n1 3 -1 -3 5 3 6 7', expectedOutput: '3 3 5 5 6 7', description: 'Standard negative/positive sliding window.' },
    { input: '1 1\n1',                 expectedOutput: '1', description: 'Window size 1 resolves to the array itself.' },
  ],
  hints: [
    'The standard max heap pairs `pair<int, int>` naturally sort by the first value (the array value).',
    'Loop logic: `while(pq.top().second <= i - k) pq.pop();` safely evicts out-of-bounds nodes.',
    'Only record answers when a full window is initialized: `if (i >= k - 1)`',
  ],
  complexity: { time: 'O(N log N) Heap Approach', space: 'O(N) bounds size' },
  tags: ['heap', 'sliding-window', 'hard', 'faang'],
};
export default lesson;
