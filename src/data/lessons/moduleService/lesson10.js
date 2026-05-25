const lesson = {
  id: 'msvc-l10',
  title: 'Infosys: Recursion & Backtracking',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 78,  title: 'Subsets',                   url: 'https://leetcode.com/problems/subsets/',                   difficulty: 'Medium' },
    { id: 46,  title: 'Permutations',              url: 'https://leetcode.com/problems/permutations/',              difficulty: 'Medium' },
    { id: 50,  title: 'Pow(x, n)',                 url: 'https://leetcode.com/problems/powx-n/',                   difficulty: 'Medium' },
  ],
  content: `# Infosys Hackwithinfy — Recursion & Backtracking

Recursion is tested in all service company rounds. Infosys Hackwithinfy (Specialist track) includes medium-level backtracking.

---

## 1. Factorial & Fibonacci

\`\`\`cpp
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
// factorial(5) = 120
// fibonacci(6) = 8
\`\`\`

---

## 2. Fast Power — O(log N)

\`\`\`cpp
double myPow(double x, int n) {
    if (n == 0) return 1;
    if (n < 0) { x = 1.0 / x; n = -n; }
    double half = myPow(x, n / 2);
    return (n % 2 == 0) ? half * half : half * half * x;
}
// myPow(2, 10) = 1024
\`\`\`

---

## 3. Generate All Subsets (Power Set)

\`\`\`cpp
void subsets(vector<int>& nums, int idx, vector<int>& curr, vector<vector<int>>& res) {
    res.push_back(curr);
    for (int i = idx; i < nums.size(); i++) {
        curr.push_back(nums[i]);
        subsets(nums, i + 1, curr, res);
        curr.pop_back(); // backtrack
    }
}
// {1,2,3} → {},{1},{1,2},{1,2,3},{1,3},{2},{2,3},{3}
\`\`\`

---

## 4. All Permutations

\`\`\`cpp
void permute(vector<int>& nums, int start, vector<vector<int>>& res) {
    if (start == nums.size()) { res.push_back(nums); return; }
    for (int i = start; i < nums.size(); i++) {
        swap(nums[start], nums[i]);
        permute(nums, start + 1, res);
        swap(nums[start], nums[i]); // backtrack
    }
}
// {1,2,3} → 6 permutations
\`\`\`

---

## 5. Tower of Hanoi

\`\`\`cpp
void hanoi(int n, char from, char to, char aux) {
    if (n == 1) { cout << "Move disk 1 from " << from << " to " << to << "\\n"; return; }
    hanoi(n-1, from, aux, to);
    cout << "Move disk " << n << " from " << from << " to " << to << "\\n";
    hanoi(n-1, aux, to, from);
}
// n=3: needs 2³-1 = 7 moves
\`\`\`

---

## Recursion Pattern Cheat Sheet

| Problem | Pattern | Key Step |
|---|---|---|
| Factorial | Linear recursion | n * f(n-1) |
| Power | Divide & conquer | split at n/2 |
| Subsets | Backtrack with include/exclude | push, recurse, pop |
| Permutations | Swap-based backtrack | swap, recurse, swap back |
| Hanoi | 3-step rule | move n-1, move n, move n-1 |

> Every backtracking solution: **choose → explore → unchoose**. The undo step is what makes it backtracking.
`,
  starterCode: `#include <iostream>
using namespace std;

int factorial(int n) {
    // TODO: Return n! using recursion
    return 0;
}

double myPow(double x, int n) {
    // TODO: Return x^n using fast exponentiation
    return 0;
}

int main() {
    cout << factorial(5) << "\\n"; // 120
    cout << myPow(2, 10) << "\\n"; // 1024
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

double myPow(double x, int n) {
    if (n == 0) return 1;
    if (n < 0) { x = 1.0 / x; n = -n; }
    double half = myPow(x, n / 2);
    return (n % 2 == 0) ? half * half : half * half * x;
}

int main() {
    cout << factorial(5) << "\\n";
    cout << myPow(2, 10) << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'factorial(5)=120, myPow(2,10)=1024', expectedOutput: '120\n1024' },
  ],
  hints: [
    'factorial: base case is n <= 1, recursive case is n * factorial(n-1).',
    'myPow: compute half = myPow(x, n/2), then return half*half if n is even, half*half*x if odd.',
    'Handle n < 0 by inverting x and negating n.',
  ],
  complexity: { time: 'O(N) factorial, O(log N) fast power', space: 'O(N) recursive stack' },
  tags: ['infosys', 'recursion', 'backtracking', 'dsa'],
};
export default lesson;
