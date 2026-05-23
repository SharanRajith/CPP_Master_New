const lesson = {
  id: 'meciq-l2',
  title: 'Bit Manipulation — Must-Know Interview Macros',
  module: 'ECIQ',
  lessonNumber: 2,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Bit Manipulation — Must-Know Interview Macros

## The Four Essential Macros

Every embedded C interview asks about these:

\`\`\`c
#define SET_BIT(reg, n)    ((reg) |=  (1U << (n)))   /* Set bit n to 1   */
#define CLR_BIT(reg, n)    ((reg) &= ~(1U << (n)))   /* Clear bit n to 0 */
#define TOG_BIT(reg, n)    ((reg) ^=  (1U << (n)))   /* Toggle bit n     */
#define CHK_BIT(reg, n)    (((reg) >> (n)) & 1U)     /* Check bit n      */
\`\`\`

## Why 1U and not 1?

\`1\` is a signed int. Shifting a signed integer into the sign bit is **undefined behavior** in C:

\`\`\`c
uint32_t x = 0;
x |= (1 << 31);   /* UB — shifts into sign bit of signed int */
x |= (1U << 31);  /* OK — 1U is unsigned, well-defined */
\`\`\`

Always use \`1U\` (unsigned int) or \`1UL\` (unsigned long) for register bit masks.

## Q: Set bit 5, clear bit 3, toggle bit 7 of a register

\`\`\`c
uint8_t REG = 0x00;

SET_BIT(REG, 5);   /* REG = 0b00100000 = 0x20 */
CLR_BIT(REG, 3);   /* Bit 3 was already 0 — no change */
TOG_BIT(REG, 7);   /* REG = 0b10100000 = 0xA0 */
\`\`\`

## Q: Count the number of set bits (Hamming Weight)

\`\`\`c
int countBits(uint32_t n) {
    int count = 0;
    while (n) {
        count += (n & 1U);  /* Check LSB */
        n >>= 1;            /* Shift right */
    }
    return count;
}

/* Brian Kernighan's trick — faster: */
int countBitsKB(uint32_t n) {
    int count = 0;
    while (n) {
        n &= (n - 1);  /* Clears the lowest set bit */
        count++;
    }
    return count;
}
\`\`\`

## Q: Check if a number is a power of 2

\`\`\`c
int isPow2(uint32_t n) {
    return n && !(n & (n - 1));
    /* Powers of 2 have exactly one bit set.
       n-1 flips all bits below the set bit.
       AND = 0 only if exactly one bit was set. */
}
\`\`\`

## Q: Swap two variables without a temp

\`\`\`c
void xorSwap(int *a, int *b) {
    if (a != b) {        /* Must check — xorSwap(x, x) would zero x! */
        *a ^= *b;
        *b ^= *a;
        *a ^= *b;
    }
}
\`\`\`

## Q: Extract a bit field (e.g., bits [5:3])

\`\`\`c
#define EXTRACT_BITS(reg, start, len)  (((reg) >> (start)) & ((1U << (len)) - 1))

uint8_t reg = 0b01101000;
uint8_t field = EXTRACT_BITS(reg, 3, 3);  /* bits [5:3] = 0b101 = 5 */
\`\`\``,
  starterCode: `#include <stdio.h>
#include <stdint.h>

#define SET_BIT(reg, n)  ((reg) |=  (1U << (n)))
#define CLR_BIT(reg, n)  ((reg) &= ~(1U << (n)))
#define CHK_BIT(reg, n)  (((reg) >> (n)) & 1U)

int main() {
    uint8_t reg = 0;

    /* TODO: Set bit 3, then print whether bit 3 is set (1 or 0) */
    /* TODO: Clear bit 3, then print whether bit 3 is set (1 or 0) */

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

#define SET_BIT(reg, n)  ((reg) |=  (1U << (n)))
#define CLR_BIT(reg, n)  ((reg) &= ~(1U << (n)))
#define CHK_BIT(reg, n)  (((reg) >> (n)) & 1U)

int main() {
    uint8_t reg = 0;
    SET_BIT(reg, 3);
    printf("%u\\n", CHK_BIT(reg, 3));
    CLR_BIT(reg, 3);
    printf("%u\\n", CHK_BIT(reg, 3));
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '1\n0', description: 'Set bit 3 → check = 1; Clear bit 3 → check = 0.' },
  ],
  hints: [
    'Use SET_BIT(reg, 3) to set bit 3.',
    'Use CHK_BIT(reg, 3) and print the result with printf("%u\\n", ...).',
    'After CLR_BIT(reg, 3), CHK_BIT should return 0.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Bit operations are single CPU instructions.' },
  tags: ['embedded-c', 'bit-manipulation', 'interview', 'macros'],
};
export default lesson;
