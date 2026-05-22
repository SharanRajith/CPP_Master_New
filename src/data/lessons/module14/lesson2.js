// src/data/lessons/module14/lesson2.js
const lesson = {
  id: 'm14-l2',
  title: 'Fixed-Width Integer Types (stdint.h)',
  module: 14,
  lessonNumber: 2,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Fixed-Width Integer Types (stdint.h)

## The Problem with Plain \`int\`

On a desktop compiler, \`int\` is 32 bits. On an 8-bit AVR MCU, \`int\` is only **16 bits**. If your code assumes \`int\` can hold 65536, it will silently overflow on AVR and produce wrong results.

This is why embedded C uses **\`<stdint.h>\`** — it guarantees exact widths on *every* platform.

## The Types

| Type | Width | Range |
|---|---|---|
| \`uint8_t\` | 8 bits | 0 to 255 |
| \`int8_t\` | 8 bits | -128 to 127 |
| \`uint16_t\` | 16 bits | 0 to 65535 |
| \`int16_t\` | 16 bits | -32768 to 32767 |
| \`uint32_t\` | 32 bits | 0 to 4,294,967,295 |
| \`int32_t\` | 32 bits | -2,147,483,648 to 2,147,483,647 |
| \`size_t\` | platform | unsigned, result of sizeof() |

## Overflow Wrapping (Modular Arithmetic)

Unsigned types **wrap around** when they overflow — they do not crash, they silently start from zero again:

\`\`\`
uint8_t  max = 255;
max + 1  = 0    (wraps: 256 mod 256 = 0)

uint16_t big = 65535;
big + 1  = 0    (wraps: 65536 mod 65536 = 0)
\`\`\`

This wrapping is **defined behaviour** for unsigned types in C (unlike signed overflow which is undefined).

In embedded, overflow wrap is used intentionally — e.g. a millisecond counter in \`uint32_t\` rolls over after ~49 days, and time-difference code still works correctly.

## sizeof() on Different Platforms

\`\`\`c
#include <stdio.h>
#include <stdint.h>

int main() {
    printf("sizeof(char)     = %zu\\n", sizeof(char));       // always 1
    printf("sizeof(int)      = %zu\\n", sizeof(int));        // 2 on AVR, 4 on ARM
    printf("sizeof(uint8_t)  = %zu\\n", sizeof(uint8_t));    // always 1
    printf("sizeof(uint32_t) = %zu\\n", sizeof(uint32_t));   // always 4
    return 0;
}
\`\`\`

## Overflow Demonstration

\`\`\`c
uint8_t x = 255;
x++;              // x is now 0 (wrapped)

uint16_t y = 65535;
y++;              // y is now 0 (wrapped)
\`\`\`

The key: the C expression \`x + 1\` where x is \`uint8_t\` promotes to \`int\` first — you need to cast back or assign to \`uint8_t\` to see the wrap. The easiest way is to cast: \`(uint8_t)(255 + 1)\` or store in a \`uint8_t\` variable and increment it.

## Register Usage Example

\`\`\`c
uint8_t  PORTB  = 0x00;  /* 8-bit GPIO register — fits exactly */
uint16_t ADC_DR = 0x0000; /* 12-bit ADC result in 16-bit reg   */
uint32_t TIM_CNT = 0;    /* 32-bit timer counter               */
\`\`\`

Always choose the smallest type that fits your data — it saves RAM and often executes faster on 8-bit MCUs.`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

int main() {
    /* TODO: Declare uint8_t x = 255 */
    /* TODO: Increment x (it wraps to 0) */
    /* TODO: Print x with printf("%u\\n", x) */

    /* TODO: Declare uint16_t y = 65535 */
    /* TODO: Increment y (it wraps to 0) */
    /* TODO: Print y with printf("%u\\n", y) */

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

int main() {
    uint8_t x = 255;
    x++;
    printf("%u\\n", x);

    uint16_t y = 65535;
    y++;
    printf("%u\\n", y);

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '0\n0',
      description: 'uint8_t wraps 255+1=0, uint16_t wraps 65535+1=0.',
    },
  ],
  hints: [
    'Declare `uint8_t x = 255;` then do `x++;` — the increment wraps because 256 does not fit in 8 bits.',
    'The same pattern works for uint16_t: `uint16_t y = 65535; y++;` gives 0.',
    'Print with `printf("%u\\n", x);` — use `%u` for unsigned types.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Fixed number of variables, no loops.' },
  tags: ['embedded-c', 'stdint', 'overflow', 'data-types'],
};
export default lesson;
