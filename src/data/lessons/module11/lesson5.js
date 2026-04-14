const lesson = {
  id: 'm11-l5',
  title: 'Math: Primes & GCD',
  module: 11,
  lessonNumber: 5,
  xpReward: 10,
  leetcodeProblems: [
    { id: 204, title: 'Count Primes', url: 'https://leetcode.com/problems/count-primes/', difficulty: 'Medium' },
    { id: 1979, title: 'Find Greatest Common Divisor of Array', url: 'https://leetcode.com/problems/find-greatest-common-divisor-of-array/', difficulty: 'Easy' },
  ],
  content: `# Math: Sieve of Eratosthenes & GCD

## Counting Primes
Given an integer $N$, return the number of prime numbers strictly less than $N$.
Checking each number individually using a loop from $2$ to $\\sqrt{N}$ takes $O(N \\sqrt{N})$ time. This is too slow if $N = 10^7$.

**The Sieve of Eratosthenes ($O(N \\log \\log N)$)**
Instead of checking if numbers are prime, we assume all numbers are prime, and then systematically cross out their multiples!
1. Create a boolean array \`isPrime\` of size \`n\` initialized to true.
2. Start from $p = 2$. If \`isPrime[p]\` is true, then $p$ is a prime!
3. Iterate through all multiples of $p$ ($p^2, p^2+p, p^2+2p \\dots$) and mark them strictly as false (composite).
4. Do this up to $\\sqrt{N}$. Whatever is left marked as true is prime!

\`\`\`cpp
int countPrimes(int n) {
    if (n <= 2) return 0;
    vector<bool> isPrime(n, true);
    isPrime[0] = isPrime[1] = false;
    
    // We only need to check up to sqrt(N)
    for (int p = 2; p * p < n; p++) {
        if (isPrime[p]) {
            // Mark all multiples starting from p*p
            for (int i = p * p; i < n; i += p) {
                isPrime[i] = false;
            }
        }
    }
    
    // Count the remaining primes
    int count = 0;
    for (int i = 2; i < n; i++) {
        if (isPrime[i]) count++;
    }
    return count;
}
\`\`\`

## Greatest Common Divisor (Euclidean Algorithm)
To find the GCD of two numbers $A$ and $B$, you do not need to factorize them. You just recursively do:
$GCD(A, B) = GCD(B, A \\% B)$ until $B$ is $0$.

C++ actually has this natively built-in!
\`\`\`cpp
#include <numeric>
int result = std::gcd(36, 60); // returns 12
\`\`\`

If you need the **Least Common Multiple (LCM)**:
$LCM(A, B) = (A \\times B) / GCD(A, B)$
`,
  starterCode: `#include <iostream>
#include <vector>
// C++17 includes std::gcd in <numeric>
#include <numeric> 
using namespace std;

// Sieve of Eratosthenes implementation
int countPrimes(int n) {
    if (n <= 2) return 0;
    
    // TODO: init vector<bool> isPrime to true
    
    // TODO: for p from 2 to p*p < n
    // if isPrime[p] is true -> loop i from p*p to n, step by p, mark false
    
    // TODO: count all remaining trues
    return 0;
}

int main() {
    int n; cin >> n;
    cout << countPrimes(n) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

int countPrimes(int n) {
    if (n <= 2) return 0;
    vector<bool> isPrime(n, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int p = 2; p * p < n; p++) {
        if (isPrime[p]) {
            for (int i = p * p; i < n; i += p) {
                isPrime[i] = false;
            }
        }
    }
    
    int count = 0;
    for (int i = 2; i < n; i++) {
        if (isPrime[i]) count++;
    }
    return count;
}

int main() {
    int n; cin >> n;
    cout << countPrimes(n) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '10', expectedOutput: '4', description: 'Primes strictly less than 10 are 2, 3, 5, 7.' },
    { input: '1',  expectedOutput: '0', description: 'No primes less than 1.' },
  ],
  hints: [
    '`vector<bool> isPrime(n, true);` initializes the array.',
    'Inner loop step: `for (int i = p * p; i < n; i += p)`',
  ],
  complexity: { time: 'O(N log log N)', space: 'O(N) for boolean array' },
  tags: ['math', 'sieve', 'primes'],
};
export default lesson;
