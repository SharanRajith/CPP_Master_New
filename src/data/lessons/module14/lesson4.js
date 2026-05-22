// src/data/lessons/module14/lesson4.js
const lesson = {
  id: 'm14-l4',
  title: 'Bit Masking — Set, Clear, Toggle, Read',
  module: 14,
  lessonNumber: 4,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Bit Masking — Set, Clear, Toggle, Read

These four operations are the bread-and-butter of embedded firmware. Every time you configure a GPIO pin, enable a peripheral, or check a status flag, you use one of these patterns.

Think of an 8-bit register like PORTB as 8 individual light switches:

\`\`\`
  Bit:  7   6   5   4   3   2   1   0
PORTB: [0] [0] [0] [0] [0] [0] [0] [0]
\`\`\`

## The Four Operations

### 1. SET a bit (turn it ON)
\`\`\`c
reg |= (1 << bit);
\`\`\`
Logic: OR with a mask that has only bit N set.
Example: set bit 3 of PORTB
\`\`\`
  PORTB  = 0b00000000
  mask   = 0b00001000   (1 << 3)
  result = 0b00001000   (PORTB = 8)
\`\`\`

### 2. CLEAR a bit (turn it OFF)
\`\`\`c
reg &= ~(1 << bit);
\`\`\`
Logic: AND with a mask that has all bits set EXCEPT bit N.
Example: clear bit 3
\`\`\`
  PORTB  = 0b00001000
  ~mask  = 0b11110111
  result = 0b00000000   (PORTB = 0)
\`\`\`

### 3. TOGGLE a bit (flip it)
\`\`\`c
reg ^= (1 << bit);
\`\`\`
Logic: XOR flips only the target bit (1 XOR 1 = 0, 0 XOR 1 = 1).
Example: toggle bit 3 when PORTB=0
\`\`\`
  PORTB  = 0b00000000
  mask   = 0b00001000
  result = 0b00001000   (PORTB = 8)  <- was 0, now 1
\`\`\`

Toggle again:
\`\`\`
  PORTB  = 0b00001000
  mask   = 0b00001000
  result = 0b00000000   (PORTB = 0)  <- was 1, now 0
\`\`\`

### 4. READ a bit (check its value)
\`\`\`c
uint8_t bit_val = (reg >> bit) & 1;
\`\`\`
Logic: shift the target bit to position 0, then mask all other bits.
Result is always 0 or 1.

Example: read bit 0 of PORTB=0b00000001
\`\`\`
  PORTB >> 0  = 0b00000001
  & 1         = 1
\`\`\`

## Quick Reference Table

| Operation | Code | Effect |
|---|---|---|
| SET bit N | \`reg |= (1 << N)\` | Force bit N to 1 |
| CLEAR bit N | \`reg &= ~(1 << N)\` | Force bit N to 0 |
| TOGGLE bit N | \`reg ^= (1 << N)\` | Flip bit N |
| READ bit N | \`(reg >> N) & 1\` | Get 0 or 1 |

## Real-World Register Analogy (STM32 GPIOA)

\`\`\`c
uint32_t GPIOA_ODR = 0;        /* Output Data Register */

GPIOA_ODR |=  (1 << 5);        /* PA5 = LED ON  */
GPIOA_ODR &= ~(1 << 5);        /* PA5 = LED OFF */
GPIOA_ODR ^=  (1 << 5);        /* PA5 = TOGGLE  */
uint8_t state = (GPIOA_ODR >> 5) & 1;  /* read PA5 */
\`\`\`

These four lines are literally what every HAL (Hardware Abstraction Library) implements internally.`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

int main() {
    uint8_t reg = 0x00;

    /* TODO: SET bit 3 of reg, then print reg */
    /* TODO: TOGGLE bit 3 of reg, then print reg */
    /* TODO: SET bit 0 of reg, then print reg */
    /* TODO: READ bit 0 of reg, then print the result */

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

int main() {
    uint8_t reg = 0x00;

    reg |= (1 << 3);
    printf("%u\\n", reg);

    reg ^= (1 << 3);
    printf("%u\\n", reg);

    reg |= (1 << 0);
    printf("%u\\n", reg);

    uint8_t bit_val = (reg >> 0) & 1;
    printf("%u\\n", bit_val);

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '8\n0\n1\n1',
      description: 'SET bit3 → 8, TOGGLE bit3 → 0, SET bit0 → 1, READ bit0 → 1.',
    },
  ],
  hints: [
    'SET bit 3: `reg |= (1 << 3);` — this gives 0b00001000 = 8.',
    'TOGGLE bit 3 when it is already 1: XOR flips it back to 0, so reg becomes 0.',
    'After setting bit 0, reg = 1. READ bit 0: `(reg >> 0) & 1` shifts nothing and masks, giving 1.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Each bitwise operation is a single CPU instruction.' },
  tags: ['embedded-c', 'bit-masking', 'gpio', 'registers'],
};
export default lesson;
