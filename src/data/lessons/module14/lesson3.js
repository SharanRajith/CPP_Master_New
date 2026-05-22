// src/data/lessons/module14/lesson3.js
const lesson = {
  id: 'm14-l3',
  title: 'Bitwise Operators',
  module: 14,
  lessonNumber: 3,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Bitwise Operators

Bitwise operators work directly on the binary representation of integers. They are the **most important operators in embedded C** — every register manipulation uses them.

## The Six Operators

| Operator | Symbol | Description |
|---|---|---|
| AND | \`&\` | Both bits must be 1 |
| OR | \`|\` | Either bit can be 1 |
| XOR | \`^\` | Bits differ → 1 |
| NOT | \`~\` | Flip all bits |
| Left Shift | \`<<\` | Shift bits left (multiply by 2) |
| Right Shift | \`>>\` | Shift bits right (divide by 2) |

## Truth Tables

### AND (\`&\`)
\`\`\`
A   B   A & B
0   0     0
0   1     0
1   0     0
1   1     1
\`\`\`

### OR (\`|\`)
\`\`\`
A   B   A | B
0   0     0
0   1     1
1   0     1
1   1     1
\`\`\`

### XOR (\`^\`)
\`\`\`
A   B   A ^ B
0   0     0
0   1     1
1   0     1
1   1     0       <-- same bits cancel
\`\`\`

## Worked Example: 0b00001111 and 0b11110000

\`\`\`
  a = 0b00001111  (0x0F = 15)
  b = 0b11110000  (0xF0 = 240)

  a | b  = 0b11111111 = 255  (union of all 1-bits)
  a & b  = 0b00000000 = 0    (no overlapping 1-bits)
  a ^ b  = 0b11111111 = 255  (every bit differs)
  a << 2 = 0b00111100 = 60   (shift left by 2 positions)
\`\`\`

## Shift Operators

Left shift by N multiplies by 2^N:
\`\`\`c
1 << 0  =   1  (bit 0)
1 << 1  =   2  (bit 1)
1 << 3  =   8  (bit 3)
1 << 7  = 128  (bit 7, MSB of uint8_t)
\`\`\`

Right shift by N divides by 2^N (unsigned):
\`\`\`c
0b10000000 >> 3  =  0b00010000  (128 >> 3 = 16)
\`\`\`

## Practical Uses

### Masking — extract a nibble (4 bits)
\`\`\`c
uint8_t reg    = 0b10110101;
uint8_t lower  = reg & 0x0F;   // 0b00000101 = 5 (lower nibble)
uint8_t upper  = (reg >> 4) & 0x0F;  // 0b00001011 = 11 (upper nibble)
\`\`\`

### Setting a specific bit
\`\`\`c
uint8_t PORTB = 0x00;
PORTB |= (1 << 3);   // set bit 3 -> PORTB = 0b00001000 = 8
\`\`\`

### Checking a flag register
\`\`\`c
uint8_t STATUS = 0b00000101;
if (STATUS & (1 << 2)) {
    /* bit 2 is set — handle overflow flag */
}
\`\`\`

## NOT (\`~\`) — Bitwise Complement

\`\`\`c
uint8_t mask = ~(1 << 3);   // 0b11110111 — all bits set except bit 3
\`\`\`

This is used in the CLEAR operation: \`reg &= ~(1 << bit);\``,
  starterCode: `#include <stdio.h>
#include <stdint.h>

int main() {
    uint8_t a = 0x0F;   /* 0b00001111 */
    uint8_t b = 0xF0;   /* 0b11110000 */

    /* TODO: print a | b  on its own line */
    /* TODO: print a & b  on its own line */
    /* TODO: print a ^ b  on its own line */
    /* TODO: print (uint8_t)(a << 2)  on its own line */

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

int main() {
    uint8_t a = 0x0F;
    uint8_t b = 0xF0;

    printf("%u\\n", (uint8_t)(a | b));
    printf("%u\\n", (uint8_t)(a & b));
    printf("%u\\n", (uint8_t)(a ^ b));
    printf("%u\\n", (uint8_t)(a << 2));

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '255\n0\n255\n60',
      description: 'OR=255, AND=0, XOR=255, left-shift-2=60 for the given nibble values.',
    },
  ],
  hints: [
    '0x0F is 00001111 and 0xF0 is 11110000 — they have no overlapping 1-bits so AND=0, but together cover all 8 bits so OR=255.',
    'XOR of 0x0F and 0xF0 is 0xFF=255 because every bit position differs between the two values.',
    'Left shifting 0x0F by 2: 00001111 becomes 00111100 = 32+16+8+4 = 60. Cast to uint8_t to drop overflow bits.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'All operations are single CPU instructions.' },
  tags: ['embedded-c', 'bitwise', 'masking', 'operators'],
};
export default lesson;
