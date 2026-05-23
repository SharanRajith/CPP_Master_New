const lesson = {
  id: 'meciq-l6',
  title: 'Struct Padding, Alignment & Bit Fields',
  module: 'ECIQ',
  lessonNumber: 6,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Struct Padding, Alignment & Bit Fields

## Q: What is sizeof this struct?

\`\`\`c
struct A {
    char  a;   /* 1 byte */
    int   b;   /* 4 bytes */
    char  c;   /* 1 byte */
};
/* sizeof(struct A) = ? */
\`\`\`

Answer: **12 bytes**, not 6!

\`\`\`
Memory layout:
[a][pad][pad][pad][b  b  b  b][c][pad][pad][pad]
 1    3           4            1    3
\`\`\`

The compiler inserts **padding** so each member is aligned to its own size:
- \`int b\` must start at a 4-byte boundary
- The struct size is rounded up to the largest member's alignment

## Q: How do you minimize padding?

**Order members from largest to smallest:**

\`\`\`c
struct B {
    int   b;   /* 4 bytes at offset 0  */
    char  a;   /* 1 byte  at offset 4  */
    char  c;   /* 1 byte  at offset 5  */
    /* 2 bytes padding at end to round up to 4 */
};
/* sizeof(struct B) = 8 — better than 12! */
\`\`\`

## Q: How do you eliminate padding entirely?

Use \`__attribute__((packed))\` or \`#pragma pack(1)\`:

\`\`\`c
struct __attribute__((packed)) Packet {
    uint8_t  cmd;     /* 1 byte */
    uint16_t length;  /* 2 bytes — unaligned! */
    uint32_t crc;     /* 4 bytes — unaligned! */
};
/* sizeof = 7 — no padding */
\`\`\`

**Warning:** On ARM Cortex-M0/M0+, unaligned access causes a **HardFault**. Only use packed structs for communication frames where you control access carefully.

## Q: What are bit fields and when are they used?

Bit fields let you declare members that occupy fewer than a full byte:

\`\`\`c
typedef struct {
    uint32_t EN   : 1;   /* bit 0   — enable */
    uint32_t MODE : 2;   /* bits 2:1 — 00=input, 01=output, 10=AF, 11=analog */
    uint32_t PUPD : 2;   /* bits 4:3 — pull-up/down */
    uint32_t      : 27;  /* remaining bits — reserved (unnamed) */
} GPIO_CTRL;
\`\`\`

Use cases:
- Hardware register maps (map physical register layout)
- Compressed data structures (flags word, protocol fields)
- Status/flag bytes

## Q: Are bit fields portable across compilers?

**No.** Bit order (MSB-first or LSB-first), packing, and padding in bit field structs are **implementation-defined**. For true portability in hardware register maps, use bit manipulation macros instead.

## Interview Trick: sizeof on Bit Field Struct

\`\`\`c
struct Flags {
    uint8_t a : 1;
    uint8_t b : 1;
    uint8_t c : 1;
};
sizeof(struct Flags) == 1  /* All 3 bits fit in one byte */

struct Mixed {
    uint8_t  x : 4;
    uint16_t y : 12;
};
/* Depends on compiler — may be 2 or 4 bytes due to type boundary */
\`\`\``,
  starterCode: `#include <stdio.h>
#include <stdint.h>

struct Unoptimized {
    char  a;
    int   b;
    char  c;
};

struct Optimized {
    int   b;
    char  a;
    char  c;
};

int main() {
    /* TODO: print sizeof both structs */
    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

struct Unoptimized {
    char  a;
    int   b;
    char  c;
};

struct Optimized {
    int   b;
    char  a;
    char  c;
};

int main() {
    printf("%zu\\n", sizeof(struct Unoptimized));
    printf("%zu\\n", sizeof(struct Optimized));
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '12\n8', description: 'Unoptimized has padding (12 bytes); optimized has less padding (8 bytes).' },
  ],
  hints: [
    'Use printf("%zu\\n", sizeof(struct Unoptimized)); — %zu is the correct format for size_t.',
    'The unoptimized struct has padding after char a (3 bytes) and after char c (3 bytes) = 12 total.',
    'The optimized struct puts int b first, then two chars. Only 2 bytes of padding at the end = 8 total.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Sizeof is computed at compile time.' },
  tags: ['embedded-c', 'struct', 'padding', 'alignment', 'bit-fields', 'interview'],
};
export default lesson;
