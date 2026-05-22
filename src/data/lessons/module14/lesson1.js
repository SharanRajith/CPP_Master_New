// src/data/lessons/module14/lesson1.js
const lesson = {
  id: 'm14-l1',
  title: 'What is Embedded C?',
  module: 14,
  lessonNumber: 1,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# What is Embedded C?

## Standard C vs Embedded C

**Standard C** is what you write on a PC — it has a full OS underneath, a heap managed by the OS, a standard library, and essentially unlimited RAM. **Embedded C** is a *subset* of standard C, trimmed down to fit inside a microcontroller (MCU) that might have only 2 KB of RAM and 32 KB of Flash.

The core language rules are identical — it is still ISO C99/C11. The differences are practical:

| Feature | Standard C (PC) | Embedded C (MCU) |
|---|---|---|
| RAM | GBs available | 256 B – 256 KB |
| OS | Linux / Windows | Bare-metal or RTOS |
| stdlib (malloc, printf) | Full support | Often absent or restricted |
| Startup time | Milliseconds | Must be instant |
| Headers like \`avr/io.h\` | Not needed | MCU-specific |

## MCU Architecture

A typical 8-bit MCU (e.g. ATmega328P) or 32-bit ARM Cortex-M looks like this:

\`\`\`
+------------------------------------------+
|              MICROCONTROLLER             |
|                                          |
|  +--------+  +-------+  +------------+  |
|  |  CPU   |  |  RAM  |  |   Flash    |  |
|  | (ALU,  |  | (SRAM)|  | (Program   |  |
|  |  regs) |  | 2 KB  |  |  Memory)   |  |
|  +--------+  +-------+  | 32 KB      |  |
|       |                  +------------+  |
|  +----+----------------------------------+  |
|  |          Peripheral Bus              |  |
|  +------+--------+--------+----------+  |
|         |        |        |          |  |
|       GPIO     UART     Timer       SPI |
+------------------------------------------+
\`\`\`

- **CPU**: Executes your C code as machine instructions.
- **Flash**: Stores your compiled program permanently (non-volatile).
- **SRAM**: Holds variables at runtime (volatile — wiped on reset).
- **Peripherals**: GPIO, UART, SPI, I2C, ADC — each controlled via **memory-mapped registers**.

## Compilation Pipeline for Embedded

On a PC you compile with \`gcc main.c -o main\`. For embedded you use a **cross-compiler** (runs on your PC, produces code for a different CPU architecture):

\`\`\`
[C Source] --> [Cross-Compiler: arm-none-eabi-gcc]
           --> [Object File .o]
           --> [Linker + Linker Script]
           --> [ELF Binary]
           --> [avrdude / ST-Link flash utility]
           --> [MCU Flash Memory]
\`\`\`

In this course we **simulate** the MCU using plain GCC — registers are just \`uint8_t\` variables.

## Why C (not C++) for Embedded?

| Reason | Details |
|---|---|
| No RTTI | C++ Run-Time Type Information adds memory overhead |
| No exceptions | Exception tables bloat binary size |
| No vtables by default | Virtual functions add indirection |
| Smaller footprint | C binary is often 30-50% smaller |
| Deterministic | No hidden constructor/destructor calls |

C++ *can* be used in embedded (Arduino does it) but you must disable exceptions and RTTI, and avoid \`new\`/\`delete\`.

## Simulating GPIO — LED Blink

On a real MCU, you set bit 5 of \`PORTB\` to turn on an LED. Here we simulate with a variable:

\`\`\`c
#include <stdio.h>
#include <stdint.h>

uint8_t PORTB = 0x00;   // simulated 8-bit GPIO register

int main() {
    PORTB |= (1 << 5);           // SET bit 5 -> LED ON
    printf("LED ON\\n");
    PORTB &= ~(1 << 5);          // CLEAR bit 5 -> LED OFF
    printf("LED OFF\\n");
    return 0;
}
\`\`\`

The bit-manipulation operators (\`|=\`, \`&=\`, \`~\`, \`<<\`) are the heart of embedded C — you will use them constantly.`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

/* Simulated 8-bit GPIO output register */
uint8_t PORTB = 0x00;

/* Print the LED state based on bit 5 of PORTB */
void print_led_state(void) {
    if (PORTB & (1 << 5)) {
        printf("LED ON\\n");
    } else {
        printf("LED OFF\\n");
    }
}

int main() {
    int i;
    for (i = 0; i < 2; i++) {
        /* TODO: Set bit 5 of PORTB, then call print_led_state() */
        /* TODO: Clear bit 5 of PORTB, then call print_led_state() */
    }
    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

uint8_t PORTB = 0x00;

void print_led_state(void) {
    if (PORTB & (1 << 5)) {
        printf("LED ON\\n");
    } else {
        printf("LED OFF\\n");
    }
}

int main() {
    int i;
    for (i = 0; i < 2; i++) {
        PORTB |= (1 << 5);
        print_led_state();
        PORTB &= ~(1 << 5);
        print_led_state();
    }
    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: 'LED ON\nLED OFF\nLED ON\nLED OFF',
      description: 'Two full blink cycles: ON then OFF, repeated twice.',
    },
  ],
  hints: [
    'Use the bitwise OR-assign operator to set a bit: `PORTB |= (1 << 5);`',
    'To clear a bit, use AND with the bitwise NOT of the mask: `PORTB &= ~(1 << 5);`',
    'Call `print_led_state()` immediately after setting the bit and again after clearing it, inside the for loop.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Single register, fixed loop — constant time and space.' },
  tags: ['embedded-c', 'gpio', 'bitwise', 'fundamentals'],
};
export default lesson;
