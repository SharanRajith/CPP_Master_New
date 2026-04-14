const lesson = {
  id: 'm3-l7',
  title: 'Iterators & Essential Algorithms',
  module: 3,
  lessonNumber: 7,
  xpReward: 10,
  leetcodeProblems: [
    {
      id: 912,
      title: "Sort an Array",
      difficulty: "Medium",
      url: "https://leetcode.com/problems/sort-an-array/"
    }
  ],
  content: `# Iterators & Essential Algorithms

C++ algorithms act on containers using **Iterators**. Think of an iterator as a special pointer that points to a specific element inside a container, and knows how to move to the next element.

Every standard container gives you two crucial iterator functions:
- \`.begin()\`: Points to the FIRST element.
- \`.end()\`: Points to one spot **past** the last element!

## The \`<algorithm>\` Library

Instead of writing \`for\` loops to search, reverse, or sort an array manually, the STL provides highly optimized algorithms out of the box!

### 1. std::sort
Sorts a container in $O(N \\log N)$ time. Usually implemented as Introsort (QuickSort + HeapSort).
\`\`\`cpp
#include <algorithm>
#include <vector>

std::vector<int> v = {4, 1, 3, 2};

// Sort the whole vector (ascending)
std::sort(v.begin(), v.end()); 
\`\`\`

### 2. std::reverse
Flips an array backward in $O(N)$ time.
\`\`\`cpp
std::reverse(v.begin(), v.end());
\`\`\`

### 3. std::max_element / std::min_element
Finds the largest/smallest element in $O(N)$ time. Note that it returns an iterator, so you have to dereference it (with \`*\`) to get the actual value!
\`\`\`cpp
int biggest = *std::max_element(v.begin(), v.end());
\`\`\`

### 4. std::accumulate (from \`<numeric>\`)
Adds up all elements in a range. The 3rd parameter is the starting sum.
\`\`\`cpp
#include <numeric>
int sum = std::accumulate(v.begin(), v.end(), 0);
\`\`\`
`,
  starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> nums = {45, 12, 89, 33, 7};
    
    // 1. Sort the vector
    
    
    // 2. Find the sum of all elements using std::accumulate
    int totalSum = 0; // TODO
    
    // 3. Find the maximum element using std::max_element
    int maxVal = 0; // TODO
    
    cout << totalSum << " " << maxVal << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> nums = {45, 12, 89, 33, 7};
    
    sort(nums.begin(), nums.end());
    
    int totalSum = accumulate(nums.begin(), nums.end(), 0);
    int maxVal = *max_element(nums.begin(), nums.end());
    
    cout << totalSum << " " << maxVal << endl;
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '186 89', description: 'Successfully utilizes algorithms library to rapidly compute vector metrics.' }
  ],
  hints: [
    '`sort(nums.begin(), nums.end());`',
    '`accumulate(nums.begin(), nums.end(), 0);`',
    'Remember to dereference the result of max_element: `*max_element(...)`'
  ],
  complexity: { time: 'O(N log N)', space: 'O(1)' },
  tags: ['algorithms', 'sort', 'iterators', 'stl'],
};
export default lesson;
