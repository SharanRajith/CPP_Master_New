const lesson = {
  id: 'm12-l5',
  title: 'Binary Search on Answer',
  module: 12,
  lessonNumber: 5,
  xpReward: 20,
  leetcodeProblems: [
    { id: 875, title: 'Koko Eating Bananas', url: 'https://leetcode.com/problems/koko-eating-bananas/', difficulty: 'Medium' },
  ],
  content: `# Binary Search on Answer

When a problem asks you to find the **"Minimum capacity/speed to achieve X"** or **"Maximum weight achievable given Y"**, and the possible answers exist in a contiguous monotonic range, you can Binary Search the *answer itself*!

## Koko Eating Bananas (LeetCode 875)
Koko loves to eat bananas. There are ` + "`" + `n` + "`" + ` piles of bananas. The guards have gone and will come back in ` + "`" + `h` + "`" + ` hours.
Koko can decide her bananas-per-hour eating speed of ` + "`" + `k` + "`" + `.
If she finishes a pile early, she does NOT eat any more bananas during that hour.
**Return the minimum integer ` + "`" + `k` + "`" + ` such that she can eat all the bananas within ` + "`" + `h` + "`" + ` hours.**

### The Monotonic Range
- What's the absolute minimum speed? ` + "`" + `k = 1` + "`" + `.
- What's the absolute maximum speed needed? The largest pile in the array! (Eating faster than the largest pile does nothing, she still wastes the rest of the hour).

So, the answer $k$ exists perfectly between ` + "`" + `[1, max(piles)]` + "`" + `.
Because speed is monotonic (if speed 5 works, speed 6 also works), we can binary search this range!

1. Select a ` + "`" + `mid` + "`" + ` speed.
2. Run a completely separate checking function: "At this speed, how many hours does it take?"
   - To find hours for a single pile: ` + "`" + `ceil((double)pile / speed)` + "`" + `
3. If total hours $\\le h$, it means we ate fast enough! Can we eat slower? Move ` + "`" + `right = mid - 1` + "`" + `.
4. If total hours $> h$, we ate too slow. We must move ` + "`" + `left = mid + 1` + "`" + `.

\`\`\`cpp
bool canFinish(vector<int>& piles, int h, int speed) {
    long long hours = 0;
    for (int p : piles) {
        // Integer math trick for ceil(a / b): (a + b - 1) / b
        hours += (p + speed - 1) / speed;
    }
    return hours <= h;
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool canFinish(vector<int>& piles, int h, int speed) {
    long long hours = 0;
    for (int p : piles) {
        hours += (p + speed - 1) / speed;
    }
    return hours <= h;
}

int minEatingSpeed(vector<int>& piles, int h) {
    int left = 1;
    // Find the max element using C++ STL
    int right = *max_element(piles.begin(), piles.end());
    int ans = right;
    
    // TODO: Write the binary search loop
    // while left <= right
    // int mid = left + (right - left) / 2;
    // if canFinish(piles, h, mid) is true: ans = mid, search left half!
    // else search right half!
    
    return ans;
}

int main() {
    int n, h; cin >> n >> h;
    vector<int> piles(n);
    for (int i = 0; i < n; i++) cin >> piles[i];
    
    cout << minEatingSpeed(piles, h) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool canFinish(vector<int>& piles, int h, int speed) {
    long long hours = 0;
    for (int p : piles) {
        hours += (p + speed - 1) / speed;
    }
    return hours <= h;
}

int minEatingSpeed(vector<int>& piles, int h) {
    int left = 1;
    int right = *max_element(piles.begin(), piles.end());
    int ans = right;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (canFinish(piles, h, mid)) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}

int main() {
    int n, h; cin >> n >> h;
    vector<int> piles(n);
    for (int i = 0; i < n; i++) cin >> piles[i];
    
    cout << minEatingSpeed(piles, h) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4 8\n3 6 7 11', expectedOutput: '4', description: 'Requires speed 4 to finish precisely in 8 hours.' },
    { input: '5 5\n30 11 23 4 20', expectedOutput: '30', description: 'Limited time means she must max limit the biggest pile.' },
  ],
  hints: [
    'If `canFinish` is true, we want to try to eat even slower! So `ans = mid; right = mid - 1;`',
    '`left = mid + 1` pushes the speed up when `canFinish` is false.',
  ],
  complexity: { time: 'O(N log(MaxPile))', space: 'O(1)' },
  tags: ['binary-search', 'math', 'array'],
};
export default lesson;
