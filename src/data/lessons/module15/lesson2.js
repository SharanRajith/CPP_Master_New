// src/data/lessons/module15/lesson2.js
const lesson = {
  id: 'm15-l2',
  title: 'Circular (Ring) Buffer',
  module: 15,
  lessonNumber: 2,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Circular (Ring) Buffer

## Why Embedded Systems Need Buffers

In embedded systems, data arrives asynchronously — a UART character can arrive while the CPU is busy processing a sensor reading. You cannot afford to lose it.

The circular buffer (also called a ring buffer) is the standard solution: a **fixed-size FIFO queue** that reuses its own memory by wrapping around. No \`malloc\` required — the array is declared statically.

\`\`\`
Circular buffer of size 8:

  [1][2][3][ ][ ][ ][ ][ ]
   ^     ^
  tail  head
  (read) (next write)
\`\`\`

When head reaches the end, it wraps back to index 0.

## Structure and Operations

\`\`\`c
#define RB_SIZE 8

typedef struct {
    uint8_t buf[RB_SIZE];
    uint8_t head;   /* next write position */
    uint8_t tail;   /* next read position  */
    uint8_t count;  /* number of items     */
} RingBuffer;
\`\`\`

### Push (Enqueue)
\`\`\`c
int rb_push(RingBuffer *rb, uint8_t val) {
    if (rb->count == RB_SIZE) return -1;   /* full */
    rb->buf[rb->head] = val;
    rb->head = (rb->head + 1) % RB_SIZE;  /* wrap */
    rb->count++;
    return 0;
}
\`\`\`

### Pop (Dequeue)
\`\`\`c
int rb_pop(RingBuffer *rb, uint8_t *out) {
    if (rb->count == 0) return -1;          /* empty */
    *out = rb->buf[rb->tail];
    rb->tail = (rb->tail + 1) % RB_SIZE;   /* wrap */
    rb->count--;
    return 0;
}
\`\`\`

The magic is the modulo operator: \`(index + 1) % SIZE\` — when index reaches SIZE it wraps to 0.

## Visual Walkthrough

\`\`\`
Initial:  head=0, tail=0, count=0
push(1):  buf[0]=1, head=1, count=1
push(2):  buf[1]=2, head=2, count=2
push(3):  buf[2]=3, head=3, count=3
pop():    returns buf[0]=1, tail=1, count=2
push(4):  buf[3]=4, head=4, count=3
pop():    returns buf[1]=2, tail=2, count=2
pop():    returns buf[2]=3, tail=3, count=1
pop():    returns buf[3]=4, tail=4, count=0
\`\`\`

## Real Use: UART RX Buffer

\`\`\`
[UART hardware] --byte arrives--> [ISR: rb_push(&uart_rx, byte)]
                                          |
[Main loop: rb_pop(&uart_rx, &byte)] <----+
\`\`\`

The ISR writes fast, the main loop reads at its own pace. No bytes are lost as long as the buffer does not overflow. This is why the ISR only calls \`rb_push\` and never does heavy processing.

## Advantages Over a Plain Array

| Plain array | Circular buffer |
|---|---|
| Shift data on pop — O(n) | No shift — O(1) pop |
| Fixed start/end | Wraps automatically |
| Wastes space when tail advances | Reuses vacated slots |`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

#define RB_SIZE 8

typedef struct {
    uint8_t buf[RB_SIZE];
    uint8_t head;
    uint8_t tail;
    uint8_t count;
} RingBuffer;

void rb_init(RingBuffer *rb) {
    rb->head = 0; rb->tail = 0; rb->count = 0;
}

int rb_push(RingBuffer *rb, uint8_t val) {
    if (rb->count == RB_SIZE) return -1;
    rb->buf[rb->head] = val;
    rb->head = (rb->head + 1) % RB_SIZE;
    rb->count++;
    return 0;
}

int rb_pop(RingBuffer *rb, uint8_t *out) {
    /* TODO: return -1 if empty */
    /* TODO: read buf[tail] into *out */
    /* TODO: advance tail with wrap */
    /* TODO: decrement count, return 0 */
    return -1;
}

int main() {
    RingBuffer rb;
    rb_init(&rb);
    uint8_t val;

    rb_push(&rb, 1);
    rb_push(&rb, 2);
    rb_push(&rb, 3);

    rb_pop(&rb, &val); printf("%u\\n", val);  /* 1 */
    rb_push(&rb, 4);
    rb_pop(&rb, &val); printf("%u\\n", val);  /* 2 */
    rb_pop(&rb, &val); printf("%u\\n", val);  /* 3 */
    rb_pop(&rb, &val); printf("%u\\n", val);  /* 4 */

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

#define RB_SIZE 8

typedef struct {
    uint8_t buf[RB_SIZE];
    uint8_t head;
    uint8_t tail;
    uint8_t count;
} RingBuffer;

void rb_init(RingBuffer *rb) {
    rb->head = 0; rb->tail = 0; rb->count = 0;
}

int rb_push(RingBuffer *rb, uint8_t val) {
    if (rb->count == RB_SIZE) return -1;
    rb->buf[rb->head] = val;
    rb->head = (rb->head + 1) % RB_SIZE;
    rb->count++;
    return 0;
}

int rb_pop(RingBuffer *rb, uint8_t *out) {
    if (rb->count == 0) return -1;
    *out = rb->buf[rb->tail];
    rb->tail = (rb->tail + 1) % RB_SIZE;
    rb->count--;
    return 0;
}

int main() {
    RingBuffer rb;
    rb_init(&rb);
    uint8_t val;

    rb_push(&rb, 1);
    rb_push(&rb, 2);
    rb_push(&rb, 3);

    rb_pop(&rb, &val); printf("%u\\n", val);
    rb_push(&rb, 4);
    rb_pop(&rb, &val); printf("%u\\n", val);
    rb_pop(&rb, &val); printf("%u\\n", val);
    rb_pop(&rb, &val); printf("%u\\n", val);

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '1\n2\n3\n4',
      description: 'Push 1,2,3; pop one (1); push 4; pop remaining in FIFO order: 2, 3, 4.',
    },
  ],
  hints: [
    'In `rb_pop`, check `if (rb->count == 0) return -1;` first to guard against underflow.',
    'Read the value: `*out = rb->buf[rb->tail];` then advance tail: `rb->tail = (rb->tail + 1) % RB_SIZE;`',
    'Don\'t forget to decrement count after a successful pop: `rb->count--;`',
  ],
  complexity: { time: 'O(1)', space: 'O(n)', notes: 'Push and pop are O(1); buffer uses O(n) static memory.' },
  tags: ['embedded-c', 'ring-buffer', 'circular-buffer', 'fifo', 'uart'],
};
export default lesson;
