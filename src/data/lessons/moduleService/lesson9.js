const lesson = {
  id: 'msvc-l9',
  title: 'TCS NQT: Number Theory',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 204, title: 'Count Primes',                    url: 'https://leetcode.com/problems/count-primes/',                    difficulty: 'Medium' },
    { id: 1979, title: 'Find Greatest Common Divisor of Array', url: 'https://leetcode.com/problems/find-greatest-common-divisor-of-array/', difficulty: 'Easy' },
    { id: 7,   title: 'Reverse Integer',                url: 'https://leetcode.com/problems/reverse-integer/',                difficulty: 'Medium' },
  ],
  content: `# TCS NQT — Number Theory

Number theory questions appear heavily in TCS NQT, Infosys Hackwithinfy, and Wipro NLTH aptitude + coding rounds.

---

## 1. Prime Check — O(√N)

\`\`\`cpp
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}
\`\`\`

---

## 2. Sieve of Eratosthenes — All primes up to N

\`\`\`cpp
vector<bool> sieve(int n) {
    vector<bool> is_prime(n + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i * i <= n; i++)
        if (is_prime[i])
            for (int j = i * i; j <= n; j += i)
                is_prime[j] = false;
    return is_prime;
}
// Count primes up to 10: {2,3,5,7} → 4
\`\`\`

---

## 3. GCD & LCM

\`\`\`cpp
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

int lcm(int a, int b) {
    return (a / gcd(a, b)) * b; // divide first to avoid overflow
}
// gcd(12, 8) = 4,  lcm(12, 8) = 24
\`\`\`

---

## 4. Armstrong Number

A number equal to the sum of its digits each raised to the power of the number of digits.

\`\`\`cpp
bool isArmstrong(int n) {
    int temp = n, digits = to_string(n).size(), sum = 0;
    while (temp > 0) {
        int d = temp % 10;
        sum += pow(d, digits);
        temp /= 10;
    }
    return sum == n;
}
// 153 = 1³+5³+3³ = 153 → true
// 371 = 3³+7³+1³ = 371 → true
\`\`\`

---

## 5. Perfect Number

Sum of proper divisors equals the number itself.

\`\`\`cpp
bool isPerfect(int n) {
    int sum = 1;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            sum += i;
            if (i != n / i) sum += n / i;
        }
    }
    return n > 1 && sum == n;
}
// 28 → divisors {1,2,4,7,14} → sum=28 → true
\`\`\`

---

## 6. Palindrome Number

\`\`\`cpp
bool isPalindromeNum(int n) {
    if (n < 0) return false;
    int rev = 0, temp = n;
    while (temp > 0) {
        rev = rev * 10 + temp % 10;
        temp /= 10;
    }
    return rev == n;
}
// 121 → true,  123 → false
\`\`\`

---

## Quick Reference

| Concept | Time | Key Formula |
|---|---|---|
| Prime Check | O(√N) | trial division up to √N |
| Sieve | O(N log log N) | mark multiples |
| GCD | O(log N) | Euclidean: gcd(a,b)=gcd(b,a%b) |
| LCM | O(log N) | lcm = a/gcd × b |

> TCS NQT often asks: "Print all Armstrong numbers between 1 and 500" or "Check if N is prime/perfect."
`,
  starterCode: `#include <iostream>
using namespace std;

bool isPrime(int n) {
    // TODO: Return true if n is prime, false otherwise
    return false;
}

int gcd(int a, int b) {
    // TODO: Return GCD of a and b using Euclidean algorithm
    return 0;
}

int main() {
    cout << isPrime(7)  << "\\n"; // 1
    cout << isPrime(10) << "\\n"; // 0
    cout << gcd(12, 8)  << "\\n"; // 4
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}

int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

int main() {
    cout << isPrime(7)  << "\\n";
    cout << isPrime(10) << "\\n";
    cout << gcd(12, 8)  << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'isPrime(7)=true, isPrime(10)=false, gcd(12,8)=4', expectedOutput: '1\n0\n4' },
  ],
  hints: [
    'For isPrime: loop i from 2 up to √n. If n % i == 0 at any point, it\'s not prime.',
    'For GCD: use recursion — gcd(a, b) = gcd(b, a % b), base case b == 0.',
    'Remember: 0 and 1 are NOT prime numbers.',
  ],
  complexity: { time: 'O(√N) for prime check, O(log N) for GCD', space: 'O(log N) recursive stack for GCD' },
  tags: ['tcs', 'nqt', 'number-theory', 'prime', 'gcd', 'math'],
};
export default lesson;
