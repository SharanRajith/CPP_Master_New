// src/data/lessons/module15/lesson6.js
const lesson = {
  id: 'm15-l6',
  title: 'Memory Optimization Techniques',
  module: 15,
  lessonNumber: 6,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Memory Optimization Techniques

## The Embedded Memory Constraint

| MCU | Flash (program) | SRAM (variables) |
|---|---|---|
| ATmega328P (Arduino UNO) | 32 KB | 2 KB |
| STM32F103 (Blue Pill) | 64 KB | 20 KB |
| ESP32 | 4 MB | 520 KB |
| Cortex-M0+ (typical IoT) | 256 KB | 32 KB |

On a 2 KB SRAM chip, you literally cannot afford to waste even 100 bytes.

## Technique 1: Use the Smallest Type That Fits

\`\`\`c
/* Bad — wastes 3 bytes per element on ARM */
int   gpio_pins[8];    /* 8 × 4 = 32 bytes */

/* Good — exact fit */
uint8_t gpio_pins[8];  /* 8 × 1 =  8 bytes */
\`\`\`

Rule: use \`uint8_t\` for values 0-255, \`uint16_t\` for 0-65535, only use \`int\`/\`uint32_t\` when you truly need it.

## Technique 2: const Puts Data in Flash (Not SRAM)

\`\`\`c
/* This lookup table lives in FLASH (read-only), not SRAM */
const uint8_t sin_table[256] = { 0, 3, 6, 9, ... };

/* Without const it goes to SRAM — 256 bytes wasted! */
uint8_t sin_table_bad[256] = { 0, 3, 6, 9, ... };
\`\`\`

On AVR, you additionally need \`PROGMEM\` attribute to force Flash storage. On ARM Cortex-M, \`const\` is sufficient — the linker places it in the \`.rodata\` section in Flash.

## Technique 3: static Locals (Single Instance)

\`\`\`c
void uart_get_state(void) {
    static uint8_t rx_count = 0;  /* allocated once, persists between calls */
    rx_count++;
    /* ... */
}
\`\`\`

A \`static\` local is not on the stack — it is in SRAM but allocated only once (not once per call). Useful for driver state that must persist.

## Technique 4: Bit-Packing with Bitfields

\`\`\`c
/* 8 boolean flags in 1 byte instead of 8 bytes */
struct Flags {
    uint8_t led_on    : 1;
    uint8_t error     : 1;
    uint8_t uart_busy : 1;
    uint8_t adc_ready : 1;
    uint8_t reserved  : 4;
} flags;

sizeof(flags) == 1   /* just 1 byte for 4 flags! */
\`\`\`

## Technique 5: Static Memory Pools (No malloc)

\`\`\`c
#define POOL_SIZE 16

typedef struct {
    uint8_t data[8];
    uint8_t in_use;
} Packet;

static Packet pool[POOL_SIZE];   /* static pool — never grows/shrinks */

Packet *alloc_packet(void) {
    int i;
    for (i = 0; i < POOL_SIZE; i++) {
        if (!pool[i].in_use) {
            pool[i].in_use = 1;
            return &pool[i];
        }
    }
    return NULL;   /* pool exhausted */
}
\`\`\`

No \`malloc\`, no heap fragmentation, deterministic allocation time.

## sizeof Comparison

\`\`\`c
int   arr_int[4]     = {0, 1, 4, 9};   /* 16 bytes on ARM */
uint8_t arr_u8[4]    = {0, 1, 4, 9};   /* 4 bytes */
const uint8_t lu[4]  = {0, 1, 4, 9};   /* 4 bytes in Flash */

printf("int array:    %zu bytes\\n", sizeof(arr_int));    /* 16 */
printf("uint8 array:  %zu bytes\\n", sizeof(arr_u8));     /* 4  */
printf("const uint8:  %zu bytes\\n", sizeof(lu));         /* 4  */
\`\`\`

## Static Counter Pattern

\`\`\`c
int get_next_id(void) {
    static int counter = 0;
    return ++counter;
}
\`\`\`

Called 3 times: returns 1, 2, 3. The \`static\` keyword ensures the variable survives between calls without being a global.`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

const uint8_t lookup[4] = {0, 1, 4, 9};

int get_next_id(void) {
    static int counter = 0;
    /* TODO: increment counter and return it */
    return 0;
}

int main() {
    /* TODO: print lookup[2] */
    /* TODO: print lookup[3] */

    /* TODO: call get_next_id() 3 times, print each result */

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

const uint8_t lookup[4] = {0, 1, 4, 9};

int get_next_id(void) {
    static int counter = 0;
    return ++counter;
}

int main() {
    printf("%u\\n", lookup[2]);
    printf("%u\\n", lookup[3]);

    printf("%d\\n", get_next_id());
    printf("%d\\n", get_next_id());
    printf("%d\\n", get_next_id());

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '4\n9\n1\n2\n3',
      description: 'lookup[2]=4, lookup[3]=9, then static counter increments: 1, 2, 3.',
    },
  ],
  hints: [
    'Print `lookup[2]` and `lookup[3]` with `printf("%u\\n", lookup[2]);` — values are 4 and 9.',
    'In `get_next_id`, use `return ++counter;` (pre-increment) so the first call returns 1.',
    'Call `get_next_id()` three separate times, each with its own `printf`. The static counter persists between calls.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Lookup is O(1) index access; static counter is O(1) per call.' },
  tags: ['embedded-c', 'memory-optimization', 'const', 'static', 'bitfields', 'sram'],
};
export default lesson;
