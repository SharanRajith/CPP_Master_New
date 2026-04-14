const lesson = {
  id: 'm11-l9',
  title: 'Modular Exponentiation & Inverses',
  module: 11,
  lessonNumber: 9,
  xpReward: 20,
  leetcodeProblems: [
    { id: 50, title: 'Pow(x, n)', url: 'https://leetcode.com/problems/powx-n/', difficulty: 'Medium' },
  ],
  content: `# Number Theory

When scaling to massive numbers, problems will ask you to return the answer **modulo $10^9 + 7$**.
This introduces some heavy number theory logic.

## Modulo Arithmetic Rules
- $(A + B) \\pmod M = ((A \\pmod M) + (B \\pmod M)) \\pmod M$
- $(A \\times B) \\pmod M = ((A \\pmod M) \\times (B \\pmod M)) \\pmod M$
- $(A - B) \\pmod M = ((A \\pmod M) - (B \\pmod M) + M) \\pmod M$  *(Notice the $+M$ to prevent negative modulo bugs in C++)*
- **Division is fundamentally broken:** $(A / B) \\pmod M \\ne ((A \\pmod M) / (B \\pmod M)) \\pmod M$! If you need to divide under modulo, you MUST use Modular Multiplicative Inverses (Fermat's Little Theorem).

## Fast Exponentiation
How do you calculate $x^n$ when $n = 2^{31}$? A ` + "`" + `for` + "`" + ` loop would take 2 billion iterations (Time Limit Exceeded).
We use **Binary Exponentiation**, solving it in $O(\\log N)$ time.

**The concept:**
$3^{10} = (3^2)^5 = 9^5$
$9^5 = 9 \\times 9^4 = 9 \\times (9^2)^2 = 9 \\times 81^2$

Every time the power is **even**, we square the base and halve the power.
Every time the power is **odd**, we multiply the result by the base and subtract 1 from the power.

\`\`\`cpp
long long fastExponentiation(long long x, long long n, long long M) {
    long long res = 1;
    x = x % M; // Base safely under modulo
    
    while (n > 0) {
        if (n % 2 == 1) { // n is odd
            res = (res * x) % M;
        }
        // Now n is conceptually even
        x = (x * x) % M; // Square the base
        n /= 2;          // Halve the power
    }
    return res;
}
\`\`\`

> **Handling negative powers (LeetCode 50):** If $n < 0$, $x^n = (1/x)^{-n}$. Just be careful that $n = -2^{31}$ will overflow a 32-bit integer when converted to positive, so immediately cast $n$ to a ` + "`" + `long long` + "`" + `!
`,
  starterCode: `#include <iostream>
using namespace std;

// Implement Pow(x, n). No modulo for this exercise.
// Just standard LeetCode 50 Fast Exponentiation.
double myPow(double x, int n) {
    long long N = n; // Cast to prevent -2^31 overflow!
    if (N < 0) {
        x = 1 / x;
        N = -N;
    }
    
    double ans = 1;
    double current_product = x;
    
    for (long long i = N; i > 0; i /= 2) {
        // TODO: Is i odd? ans *= current_product
        // TODO: Square the current_product
    }
    
    return ans;
}

int main() {
    double x; int n;
    cin >> x >> n;
    cout << myPow(x, n) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

double myPow(double x, int n) {
    long long N = n;
    if (N < 0) {
        x = 1 / x;
        N = -N;
    }
    double ans = 1;
    double current_product = x;
    
    for (long long i = N; i > 0; i /= 2) {
        if (i % 2 == 1) {
            ans *= current_product;
        }
        current_product *= current_product;
    }
    return ans;
}

int main() {
    double x; int n;
    cin >> x >> n;
    cout << myPow(x, n) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '2.00000 10', expectedOutput: '1024', description: 'Standard power.' },
    { input: '2.00000 -2', expectedOutput: '0.25', description: 'Negative power implies fraction.' },
  ],
  hints: [
    'The core logic is exactly the same as the reading material, just dropping the `% M` everywhere since we want pure floats.',
  ],
  complexity: { time: 'O(log N)', space: 'O(1)' },
  tags: ['math', 'binary-exponentiation'],
};
export default lesson;
