const lesson = {
  id: 'meciq-l1',
  title: 'volatile & const volatile — Interview Deep Dive',
  module: 'ECIQ',
  lessonNumber: 1,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# volatile & const volatile — Interview Deep Dive

## Q: What does \`volatile\` do and when must you use it?

\`volatile\` tells the compiler: **"This variable can change at any time outside my control. Never cache it — always read/write directly from memory."**

Without it, the compiler may optimize a loop like this into an infinite loop:

\`\`\`c
uint8_t *STATUS_REG = (uint8_t *)0x40001000;
while (*STATUS_REG == 0) {}  /* Compiler caches: "always 0" → infinite loop */
\`\`\`

With \`volatile\`:

\`\`\`c
volatile uint8_t *STATUS_REG = (volatile uint8_t *)0x40001000;
while (*STATUS_REG == 0) {}  /* Re-reads hardware register on every iteration ✓ */
\`\`\`

## Three Mandatory Use Cases

| Scenario | Why volatile? |
|---|---|
| Hardware peripheral registers | Hardware changes them, not the CPU |
| Variables modified in an ISR | ISR can fire between any two instructions |
| Shared variables in multi-threaded code | Another task can modify at any time |

## Q: What is \`const volatile\`? Is it valid?

Yes — and it's common for **read-only hardware registers**:

\`\`\`c
/* Read-only status register — you can't write it, but hardware can change it */
const volatile uint32_t *ADC_RESULT = (const volatile uint32_t *)0x40012040;

uint32_t val = *ADC_RESULT;  /* OK — read */
*ADC_RESULT  = 0;            /* Error — const prevents write ✓ */
\`\`\`

\`const\` = you cannot write it from C code.
\`volatile\` = the hardware can change it — re-read it every time.

## Q: Can volatile replace a mutex?

**No.** volatile only prevents caching — it does NOT make operations atomic.

\`\`\`c
volatile int counter = 0;
counter++;  /* This is READ → ADD → WRITE — three separate instructions */
            /* An ISR can fire between any of them → data corruption */
\`\`\`

For atomicity you need: disable/enable interrupts, atomic builtins, or a mutex.

## Common Interview Trap

\`\`\`c
volatile int x = 10;
int y = x + x;  /* Is x read once or twice? */
\`\`\`

Answer: **twice** — volatile forces a fresh read every time x is accessed, even in the same expression. Some compilers may generate two separate memory loads.`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

/* Simulate a hardware status register that "changes" */
volatile uint8_t STATUS = 0;

int main() {
    /* TODO: print STATUS, then change it to 1 and print again */

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

volatile uint8_t STATUS = 0;

int main() {
    printf("%u\\n", STATUS);
    STATUS = 1;
    printf("%u\\n", STATUS);
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '0\n1', description: 'Reads volatile register twice — both reads hit memory.' },
  ],
  hints: [
    'Declare STATUS as volatile uint8_t and print it with printf("%u\\n", STATUS).',
    'After printing 0, assign STATUS = 1 and print again.',
    'The volatile keyword ensures the compiler cannot optimize away either read.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Two volatile reads.' },
  tags: ['embedded-c', 'volatile', 'interview', 'optimization'],
};
export default lesson;
