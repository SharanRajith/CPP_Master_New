const lesson = {
  id: 'm11-l10',
  title: 'Game Theory (Nim & Sprague-Grundy)',
  module: 11,
  lessonNumber: 10,
  xpReward: 15,
  leetcodeProblems: [
    { id: 292, title: 'Nim Game', url: 'https://leetcode.com/problems/nim-game/', difficulty: 'Easy' },
    { id: 877, title: 'Stone Game', url: 'https://leetcode.com/problems/stone-game/', difficulty: 'Medium' },
  ],
  content: `# Game Theory in CP

Competitive programming game theory usually involves two players taking turns recursively under a set of rules, trying to force the opponent into a losing state.

## The Basic Principles
1. A state is a **Losing State** if ALL valid moves from it lead to a **Winning State** for the next player.
2. A state is a **Winning State** if AT LEAST ONE valid move from it leads to a **Losing State** for the next player.

## The Classic Nim Game
There is a heap of $n$ stones. You and your friend take turns. On each turn, a player may remove 1, 2, or 3 stones. The one who removes the last stone wins.
If you go first, can you guarantee a win?

Let's test states!
- 0 stones: Lose.
- 1, 2, 3 stones: Win! Just take them all.
- 4 stones: You must take 1, 2, or 3. No matter what, you leave the opponent with 3, 2, or 1 stones (which are Winning States). Therefore, 4 is a **Losing State**.
- 5, 6, 7 stones: You can easily just take stones to force the opponent down to exactly 4 stones. Therefore, you hand the opponent a Losing State. So 5, 6, and 7 are **Winning States**!
- 8 stones: Forced to hand 5, 6, or 7. Losing state!

**The Pattern:** You win as long as the number of stones is NOT a multiple of 4!
\`\`\`cpp
bool canWinNim(int n) {
    return (n % 4 != 0); // Mathematical $O(1)$!
}
\`\`\`

## Advanced Games (Sprague-Grundy Theorem)
For arbitrary game rules, Game Theory maps out to DP algorithms or XOR tricks.
The **Sprague-Grundy Theorem** states that every impartial game is equivalent to a Nim game with some modified heap sizes. You calculate the "Grundy Value" (or "Nim-value") of states using the $MEX$ (Minimum Excluded) function recursively.
If $XOR$ of all Grundy values of all sub-games $\\ne 0$, the first player wins!
 *(You likely won't see this unless you're in the hard round of Google Code Jam or ICPC)*.
`,
  starterCode: `#include <iostream>
using namespace std;

// Stone Game (LeetCode 877)
// You have an array of piles of stones. 
// Alice and Bob take turns picking the entire first XOR last pile.
// Alice always wins on LeetCode mathematically.
// Wait... if you just return true, does it pass? YES!
// But let's write out the mathematical truth for Nim game here instead.

bool canWinNim(int n) {
    // TODO: Write the O(1) mathematical solution
    return false;
}

int main() {
    int n; cin >> n;
    cout << (canWinNim(n) ? "true" : "false") << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

bool canWinNim(int n) {
    return (n % 4 != 0);
}

int main() {
    int n; cin >> n;
    cout << (canWinNim(n) ? "true" : "false") << "\\n";
    return 0;
}`,
  testCases: [
    { input: '4', expectedOutput: 'false', description: 'Multiple of 4 means P2 forces a win.' },
    { input: '1', expectedOutput: 'true',  description: 'Take the only stone.' },
    { input: '7', expectedOutput: 'true',  description: 'Take 3 stones, forcing opponent to face 4.' },
  ],
  hints: [
    'Read the pattern! The only guaranteed loss is when the stones are a perfect multiple of 4.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['math', 'game-theory', 'brainteaser'],
};
export default lesson;
