const lesson = {
  id: 'mcb-l7',
  title: 'Dynamic Memory — malloc & free',
  module: 'C Basics for Embedded',
  lessonNumber: 7,
  type: 'theory',
  xpReward: 10,
  content: `## Dynamic Memory — malloc & free

### Stack vs Heap

| | Stack | Heap |
|---|---|---|
| Allocation | Automatic (on function entry) | Manual (malloc/free) |
| Size | Fixed at compile time | Runtime — as much as available |
| Speed | Very fast | Slower (allocator overhead) |
| Lifetime | Until function returns | Until you call free() |
| Embedded use | Preferred | Avoid or use sparingly |

---

### malloc & free

\`\`\`c
#include <stdlib.h>

// Allocate memory for 10 integers
int *buf = (int *)malloc(10 * sizeof(int));

if (buf == NULL) {
    // Allocation failed — always check!
    handle_error();
}

// Use the buffer
for (int i = 0; i < 10; i++) buf[i] = i * 2;

// Release when done
free(buf);
buf = NULL;   // prevent dangling pointer
\`\`\`

### calloc — Allocate & Zero-Initialize

\`\`\`c
int *data = (int *)calloc(10, sizeof(int));
// All elements are 0 — no need to memset
\`\`\`

### realloc — Resize an Existing Allocation

\`\`\`c
buf = (int *)realloc(buf, 20 * sizeof(int));
// Grows or shrinks the block; old data is preserved
\`\`\`

---

### Memory Errors to Avoid

| Error | Description | Consequence |
|---|---|---|
| Null dereference | Use pointer without checking NULL | Hard fault / crash |
| Buffer overflow | Write beyond allocated size | Corruption / crash |
| Memory leak | malloc without free | Heap exhaustion |
| Use-after-free | Access memory after free() | Undefined behavior |
| Double-free | Call free() twice | Heap corruption |

---

### Why Embedded Systems Avoid Dynamic Memory

1. **Heap fragmentation** — repeated malloc/free creates unusable holes in heap
2. **Non-deterministic timing** — malloc can take variable time, breaking real-time guarantees
3. **No heap in bare-metal** — small MCUs (e.g. 2KB RAM) may have no heap at all
4. **Hard to debug** — memory errors are silent and crash far from the cause

### Embedded Alternatives

\`\`\`c
// 1. Static allocation — know sizes at compile time
static uint8_t uart_rx_buf[256];

// 2. Memory pool — fixed-size blocks, O(1) alloc/free
typedef struct { uint8_t data[64]; int used; } Block;
static Block pool[8];

// 3. Stack allocation — for short-lived buffers
void process_packet(void) {
    uint8_t tmp[32];   // freed automatically on return
    // ...
}
\`\`\`

---

### memset & memcpy (string.h)

\`\`\`c
uint8_t buf[64];

memset(buf, 0, sizeof(buf));          // zero all bytes
memcpy(dst, src, sizeof(src));        // copy raw bytes
memmove(dst, src, n);                 // safe even if src/dst overlap
\`\`\`

---

### Key Takeaway

Understand malloc/free, but in embedded prefer static buffers and memory pools. If you must use dynamic memory, always check for NULL and always pair every malloc with a free.
`,
  hints: [
    'Always check `if (buf == NULL)` after malloc — allocation can fail if heap is exhausted.',
    'Set the pointer to NULL after free: `free(buf); buf = NULL;` — prevents accidental use-after-free.',
    'In embedded, prefer `static uint8_t buf[N]` over malloc — deterministic, no fragmentation, no runtime overhead.',
  ],
  complexity: null,
  tags: ['embedded-c', 'c-basics', 'dynamic-memory', 'malloc', 'free', 'heap', 'memory-management'],
};

export default lesson;
