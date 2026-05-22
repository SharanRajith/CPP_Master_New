// src/data/lessons/module14/lesson6.js
const lesson = {
  id: 'm14-l6',
  title: 'Structs, Unions & Bitfields',
  module: 14,
  lessonNumber: 6,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Structs, Unions & Bitfields

## Structs as Register Models

In real firmware (e.g. STM32 HAL), entire peripheral register banks are modelled as structs. This gives you named access instead of raw pointer arithmetic:

\`\`\`c
typedef struct {
    volatile uint32_t MODER;   /* Mode register         */
    volatile uint32_t OTYPER;  /* Output type register  */
    volatile uint32_t OSPEEDR; /* Output speed          */
    volatile uint32_t IDR;     /* Input data register   */
    volatile uint32_t ODR;     /* Output data register  */
} GPIO_TypeDef;

/* Then use it like: */
/* GPIO_TypeDef *GPIOA = (GPIO_TypeDef *)0x40020000; */
/* GPIOA->ODR |= (1 << 5); */
\`\`\`

This pattern gives readable, maintainable register access without magic numbers everywhere.

## Unions — Type Punning

A union allows multiple types to **share the same memory location**. Only one member is "active" at a time:

\`\`\`c
union SensorData {
    uint16_t raw;       /* 16-bit raw ADC value */
    uint8_t  bytes[2];  /* Same 16 bits as two bytes */
};

union SensorData sd;
sd.raw = 0x1234;
/* sd.bytes[0] == 0x34, sd.bytes[1] == 0x12 (little-endian) */
\`\`\`

Unions are used in embedded to split a multi-byte value into individual bytes for transmission over UART/SPI.

## Bitfields — Named Bit Access

Bitfields let you name individual bits or groups of bits inside a struct. The compiler handles the masking and shifting for you:

\`\`\`c
struct StatusReg {
    uint8_t ready    : 1;  /* 1 bit  — bit 0 */
    uint8_t error    : 1;  /* 1 bit  — bit 1 */
    uint8_t busy     : 1;  /* 1 bit  — bit 2 */
    uint8_t reserved : 5;  /* 5 bits — bits 3-7 (padding) */
};
\`\`\`

Usage:
\`\`\`c
struct StatusReg sr;
sr.ready = 1;
sr.error = 0;
sr.busy  = 1;

if (sr.busy) {
    /* wait */
}
\`\`\`

This is far more readable than: \`if (STATUS_REG & 0x04)\`

## sizeof with Bitfields

\`\`\`c
printf("%zu\\n", sizeof(struct StatusReg));   /* typically 1 byte */
\`\`\`

The compiler packs all 8 bits into a single byte — very memory-efficient.

## Caution: Bitfield Portability

Bitfields are implementation-defined in C — the bit order and padding depend on the compiler. For portable embedded code, many teams prefer explicit masking macros. Bitfields are fine within a single compiler/MCU combination.

## Combined Union + Bitfield Pattern

\`\`\`c
typedef union {
    uint8_t byte;
    struct {
        uint8_t ready    : 1;
        uint8_t error    : 1;
        uint8_t busy     : 1;
        uint8_t reserved : 5;
    } bits;
} StatusReg_t;

StatusReg_t sr;
sr.byte = 0x00;
sr.bits.ready = 1;
/* Access as: sr.byte (for raw register write) or sr.bits.ready (named) */
\`\`\`

This union trick is widely used in embedded HALs.`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

struct StatusReg {
    uint8_t ready    : 1;
    uint8_t error    : 1;
    uint8_t busy     : 1;
    uint8_t reserved : 5;
};

int main() {
    struct StatusReg sr;

    /* TODO: Set ready=1, error=0, busy=1 */

    /* TODO: Print sr.ready  on its own line */
    /* TODO: Print sr.error  on its own line */
    /* TODO: Print sr.busy   on its own line */

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

struct StatusReg {
    uint8_t ready    : 1;
    uint8_t error    : 1;
    uint8_t busy     : 1;
    uint8_t reserved : 5;
};

int main() {
    struct StatusReg sr;

    sr.ready = 1;
    sr.error = 0;
    sr.busy  = 1;

    printf("%u\\n", sr.ready);
    printf("%u\\n", sr.error);
    printf("%u\\n", sr.busy);

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '1\n0\n1',
      description: 'Bitfield ready=1, error=0, busy=1 printed in order.',
    },
  ],
  hints: [
    'Declare `struct StatusReg sr;` then assign individual bitfields: `sr.ready = 1;` `sr.error = 0;` `sr.busy = 1;`',
    'Bitfields store only the bit width you declared (1 bit here), so they can only hold 0 or 1.',
    'Print each field with `printf("%u\\n", sr.ready);` — bitfields are unsigned here.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Struct occupies 1 byte; all field accesses are O(1).' },
  tags: ['embedded-c', 'structs', 'unions', 'bitfields', 'registers'],
};
export default lesson;
