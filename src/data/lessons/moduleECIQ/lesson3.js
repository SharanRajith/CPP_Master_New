const lesson = {
  id: 'meciq-l3',
  title: 'Memory Segments — Stack, Heap, BSS, Data, Text',
  module: 'ECIQ',
  lessonNumber: 3,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Memory Segments — Stack, Heap, BSS, Data, Text

## Q: Describe the 5 memory segments of a C program

\`\`\`
High Address
┌─────────────┐
│    Stack    │ ← Local variables, function call frames (grows downward)
├─────────────┤
│      ↓      │
│    (gap)    │
│      ↑      │
├─────────────┤
│    Heap     │ ← malloc/calloc/realloc (grows upward)
├─────────────┤
│    BSS      │ ← Uninitialized globals & statics (zeroed at startup)
├─────────────┤
│    Data     │ ← Initialized globals & statics
├─────────────┤
│    Text     │ ← Program code (read-only in Flash/ROM)
└─────────────┘
Low Address
\`\`\`

## Where Does Each Variable Live?

\`\`\`c
const uint32_t LOOKUP[4] = {1,2,3,4}; /* .rodata / .text → Flash (ROM) */
uint32_t globalCount = 5;              /* .data  → RAM (init value in Flash) */
uint32_t txBuffer[64];                 /* .BSS   → RAM (zeroed by startup)   */

void task(void) {
    uint8_t local = 0;      /* Stack → RAM (temporary, freed on return) */
    uint8_t *p = malloc(8); /* Heap  → RAM (you must free it manually!)  */
}
\`\`\`

## Critical for Embedded: RAM is Tiny

A typical microcontroller has 256 KB Flash but only **16–64 KB RAM**. Knowing segments matters:

| Segment | Location | Size impact |
|---|---|---|
| .text / .rodata | Flash | Free — doesn't use RAM |
| .data | Flash + RAM | Counts against both (initial values in Flash, copy in RAM) |
| .BSS | RAM only | Zero-initialized — just counts against RAM |
| Stack | RAM | Fixed size set by linker — overflow = silent corruption |
| Heap | RAM | Fragmentation risk — avoid in bare-metal |

## Q: Why avoid malloc/free in embedded systems?

1. **Non-deterministic** — allocation time varies, breaks real-time guarantees
2. **Heap fragmentation** — repeated alloc/free leaves gaps, eventually fails
3. **No OS to recover** — heap corruption crashes the whole system
4. **Hard to size** — how much heap do you need? Hard to predict

**Preferred alternatives:**
- Static arrays sized at compile time
- Memory pools (fixed-size block allocator)
- Stack allocation (local variables)

## Q: What is BSS and why is it separate from .data?

BSS (Block Started by Symbol) stores **uninitialized** global/static variables. They're **all zero** at program start — the startup code (\`crt0\`) does a fast \`memset(bss_start, 0, bss_size)\`.

This is cheaper than storing 10,000 zeros in Flash — BSS just records the start address and size.

## Q: What happens on stack overflow in embedded?

**Silent memory corruption.** There is no OS guard page. The stack overwrites adjacent memory (globals, heap, or even code). The system behaves unpredictably or hard-faults. Always:
- Estimate maximum stack depth
- Fill stack with a pattern (e.g., 0xDEADBEEF) and check watermark at runtime`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

/* TODO: declare one variable in each segment:
   - a global initialized to 42 (data segment)
   - a global uninitialized (BSS segment)
   Then in main(), print both values */

int main() {
    /* TODO: also declare a local variable = 7 (stack) and print it */
    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

int dataVar = 42;   /* .data segment */
int bssVar;         /* .BSS segment — automatically 0 */

int main() {
    int stackVar = 7;  /* stack */
    printf("%d\\n", dataVar);
    printf("%d\\n", bssVar);
    printf("%d\\n", stackVar);
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '42\n0\n7', description: 'data=42, BSS=0 (zero-initialized), stack=7.' },
  ],
  hints: [
    'Declare int dataVar = 42; outside main — it goes in the .data segment.',
    'Declare int bssVar; outside main without initialization — goes in BSS, automatically 0.',
    'Declare int stackVar = 7; inside main — it goes on the stack.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Three reads from different memory segments.' },
  tags: ['embedded-c', 'memory', 'stack', 'heap', 'BSS', 'interview'],
};
export default lesson;
