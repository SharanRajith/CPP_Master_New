const lesson = {
  id: 'meciq-l8',
  title: 'Memory-Mapped I/O & Register Access Patterns',
  module: 'ECIQ',
  lessonNumber: 8,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Memory-Mapped I/O & Register Access Patterns

## Q: What is memory-mapped I/O?

In embedded systems, **hardware peripherals (GPIO, UART, SPI, timers) are not separate from RAM** — they appear at specific fixed addresses in the same memory map. Writing to those addresses directly controls the hardware.

\`\`\`
ARM Cortex-M memory map:
0x00000000 ── Flash (code)
0x20000000 ── SRAM (variables)
0x40000000 ── APB/AHB peripherals  ← GPIO, UART, SPI live here
0xE0000000 ── Core peripherals (NVIC, SysTick)
\`\`\`

## Q: Write code to set GPIO pin 5 HIGH using raw register access

\`\`\`c
/* STM32 GPIOA example */
#define GPIOA_BASE   0x40020000U
#define GPIOA_MODER  (*(volatile uint32_t *)(GPIOA_BASE + 0x00))
#define GPIOA_ODR    (*(volatile uint32_t *)(GPIOA_BASE + 0x14))

/* Configure pin 5 as output (MODER bits [11:10] = 01) */
GPIOA_MODER &= ~(3U << 10);   /* Clear bits 11:10 */
GPIOA_MODER |=  (1U << 10);   /* Set  bits 11:10 = 01 (output) */

/* Drive pin 5 HIGH */
GPIOA_ODR |= (1U << 5);
\`\`\`

## Q: Why Read-Modify-Write instead of direct assignment?

\`\`\`c
/* WRONG — overwrites all other pin configurations */
GPIOA_MODER = 0x00000400;  /* Resets all other pins to input mode! */

/* CORRECT — only touches the bits we care about */
GPIOA_MODER &= ~(3U << 10);  /* Clear our bits */
GPIOA_MODER |=  (1U << 10);  /* Set our bits */
\`\`\`

Registers have **multiple fields** — each controls a different pin or feature. Direct assignment would reset all other fields.

## Struct-Based Register Map (CMSIS Style)

Real HAL libraries map registers as C structs — cleaner and type-safe:

\`\`\`c
typedef struct {
    volatile uint32_t MODER;   /* Mode register          offset 0x00 */
    volatile uint32_t OTYPER;  /* Output type register   offset 0x04 */
    volatile uint32_t OSPEEDR; /* Output speed register  offset 0x08 */
    volatile uint32_t PUPDR;   /* Pull-up/down register  offset 0x0C */
    volatile uint32_t IDR;     /* Input data register    offset 0x10 */
    volatile uint32_t ODR;     /* Output data register   offset 0x14 */
    volatile uint32_t BSRR;    /* Bit set/reset register offset 0x18 */
} GPIO_TypeDef;

#define GPIOA  ((GPIO_TypeDef *)0x40020000U)

/* Usage: */
GPIOA->MODER &= ~(3U << 10);
GPIOA->MODER |=  (1U << 10);
GPIOA->ODR   |=  (1U << 5);
\`\`\`

## Q: What is the BSRR register and why is it better than ODR for atomic set/clear?

\`\`\`c
/* ODR — Read-Modify-Write — NOT atomic (ISR can corrupt between read and write) */
GPIOA->ODR |=  (1U << 5);   /* Set pin 5 */
GPIOA->ODR &= ~(1U << 5);   /* Clear pin 5 */

/* BSRR — single write, atomic — preferred */
GPIOA->BSRR = (1U << 5);          /* Set pin 5 — upper 16 bits = clear, lower = set */
GPIOA->BSRR = (1U << (5 + 16));   /* Clear pin 5 */
\`\`\`

BSRR is a **write-only** register where writing a single 32-bit value atomically sets or clears pins without a read step.`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

/* Simulate a register in regular memory for practice */
volatile uint32_t SIM_REG = 0;

#define SET_PIN(reg, pin)    ((reg) |=  (1U << (pin)))
#define CLEAR_PIN(reg, pin)  ((reg) &= ~(1U << (pin)))
#define READ_PIN(reg, pin)   (((reg) >> (pin)) & 1U)

int main() {
    /* TODO: Set pin 5, print its value, then clear it and print again */
    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

volatile uint32_t SIM_REG = 0;

#define SET_PIN(reg, pin)    ((reg) |=  (1U << (pin)))
#define CLEAR_PIN(reg, pin)  ((reg) &= ~(1U << (pin)))
#define READ_PIN(reg, pin)   (((reg) >> (pin)) & 1U)

int main() {
    SET_PIN(SIM_REG, 5);
    printf("%u\\n", READ_PIN(SIM_REG, 5));
    CLEAR_PIN(SIM_REG, 5);
    printf("%u\\n", READ_PIN(SIM_REG, 5));
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '1\n0', description: 'Pin 5 set to 1, then cleared to 0.' },
  ],
  hints: [
    'Call SET_PIN(SIM_REG, 5) to set pin 5.',
    'READ_PIN(SIM_REG, 5) returns 1 after setting, 0 after clearing.',
    'These macros mirror how you control real GPIO pins on a microcontroller.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Single register read/write operations.' },
  tags: ['embedded-c', 'memory-mapped-io', 'GPIO', 'registers', 'interview'],
};
export default lesson;
