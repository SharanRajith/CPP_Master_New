// src/data/lessons/module14/lesson5.js
const lesson = {
  id: 'm14-l5',
  title: 'volatile & Memory-Mapped I/O',
  module: 14,
  lessonNumber: 5,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# volatile & Memory-Mapped I/O

## The Problem Without \`volatile\`

Modern C compilers are smart — they **optimize** your code. If the compiler sees you reading the same variable in a loop without writing to it, it concludes "this variable never changes" and replaces every read with a cached register value. This is great for normal variables, but **fatal for hardware registers**.

Consider a peripheral status register — the hardware changes it, not your code:

\`\`\`c
/* WITHOUT volatile — WRONG */
uint8_t PIND = 0;           /* simulated pin input register */

while (PIND == 0) {         /* compiler may cache PIND=0 forever */
    /* wait for pin to go high */
}
/* This loop may never exit! */
\`\`\`

The compiler might convert the loop into \`while(true)\` because it "proved" PIND never changes.

## The \`volatile\` Keyword

\`volatile\` tells the compiler: **"This variable can change at any time by something outside my control (hardware, ISR, another thread). Always read from actual memory. Never cache it."**

\`\`\`c
volatile uint8_t PIND = 0;  /* CORRECT — hardware register */

while (PIND == 0) {
    /* compiler will re-read PIND from memory on every iteration */
}
\`\`\`

## Memory-Mapped I/O

In a real MCU, peripherals are **not separate chips** — they are special addresses in the same memory map as RAM:

\`\`\`
Memory Map (ARM Cortex-M example):
  0x00000000 - 0x0007FFFF  : Flash (program code)
  0x20000000 - 0x2001FFFF  : SRAM (variables)
  0x40000000 - 0x4007FFFF  : Peripherals (GPIO, UART, SPI...)
  0xE0000000 - 0xE00FFFFF  : Core peripherals (NVIC, SysTick)
\`\`\`

When you write to address 0x40020014, you are writing to the GPIO output register — the silicon responds immediately. This is why all peripheral registers must be declared \`volatile\`.

\`\`\`c
/* Concept — not executed here, just for understanding */
volatile uint32_t *GPIOA_ODR = (volatile uint32_t *)0x40020014;
*GPIOA_ODR |= (1 << 5);   /* Set PA5 HIGH — LED on */
\`\`\`

## Read-Modify-Write

The most common register operation:

\`\`\`
READ current register value
MODIFY the specific bit(s)
WRITE back the entire register
\`\`\`

\`\`\`c
volatile uint8_t PORTB = 0x00;

/* Read-Modify-Write: set bit 3 without affecting other bits */
PORTB |= (1 << 3);    /* RMW in one line */
\`\`\`

If PORTB were not volatile, the compiler might eliminate this as dead code (nothing reads PORTB in your program — the hardware does).

## When to Use volatile

| Use volatile? | Scenario |
|---|---|
| YES | MCU peripheral registers |
| YES | Variables modified in an ISR (Interrupt Service Routine) |
| YES | Variables shared between threads |
| NO | Regular local variables |
| NO | Loop counters |`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

int main() {
    volatile uint8_t val = 42;

    /* TODO: Print val */

    val = 100;

    /* TODO: Print val again */

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

int main() {
    volatile uint8_t val = 42;

    printf("%u\\n", val);

    val = 100;

    printf("%u\\n", val);

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '42\n100',
      description: 'Reads volatile variable twice — both reads must go to memory, not a cached value.',
    },
  ],
  hints: [
    'Declare the variable with `volatile uint8_t val = 42;` so the compiler always reads from memory.',
    'Print with `printf("%u\\n", val);` — the `%u` format specifier is correct for unsigned types.',
    'After `val = 100;`, the second printf must show 100. Without volatile, an aggressive optimizer could print 42 twice.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Two reads of a single byte register.' },
  tags: ['embedded-c', 'volatile', 'memory-mapped-io', 'optimization'],
};
export default lesson;
