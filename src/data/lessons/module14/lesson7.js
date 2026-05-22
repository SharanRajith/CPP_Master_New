// src/data/lessons/module14/lesson7.js
const lesson = {
  id: 'm14-l7',
  title: 'Pointers & Function Pointers in Embedded',
  module: 14,
  lessonNumber: 7,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Pointers & Function Pointers in Embedded

## Pointers as Register Addresses

In embedded C, a pointer is not just an abstraction — it is a **physical memory address**. When you write:

\`\`\`c
volatile uint32_t *GPIOA_ODR = (volatile uint32_t *)0x40020014;
*GPIOA_ODR |= (1 << 5);   /* Write directly to hardware address */
\`\`\`

you are telling the CPU: "go to address 0x40020014 and modify the value there." The silicon peripheral is literally mapped to that address.

In this course we **simulate** this concept with ordinary variables (since GCC on a PC cannot access real MCU addresses):

\`\`\`c
uint32_t fake_reg = 0;
uint32_t *reg_ptr = &fake_reg;   /* "pretend" this is address 0x40020014 */
*reg_ptr |= (1 << 5);
\`\`\`

## Void Pointers for Generic Drivers

A \`void *\` pointer holds an address but has no type. Driver APIs use it so the same function works with any data type:

\`\`\`c
void memcpy_embedded(void *dst, const void *src, uint32_t len) {
    uint8_t *d = (uint8_t *)dst;
    const uint8_t *s = (const uint8_t *)src;
    while (len--) {
        *d++ = *s++;
    }
}
\`\`\`

This is how \`memcpy\` is implemented in \`<string.h>\` — and it is what DMA copy functions look like in firmware.

## Function Pointers

A function pointer stores the address of a function. This enables:

1. **ISR callbacks** — register your handler and the ISR calls it.
2. **Command dispatch tables** — instead of a giant \`switch\`, use an array of function pointers.
3. **Driver abstraction** — HAL provides a struct of function pointers (like a C vtable).

### Syntax

\`\`\`c
/* Declare a function pointer type: takes two ints, returns int */
typedef int (*ArithFn)(int, int);

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }

ArithFn fn = add;
int result = fn(3, 4);   /* result = 7 */
\`\`\`

### Array of Function Pointers (Command Dispatcher)

\`\`\`c
typedef int (*CmdFn)(int, int);

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

CmdFn dispatch[3] = { add, sub, mul };

int i;
for (i = 0; i < 3; i++) {
    printf("%d\\n", dispatch[i](3, 4));
}
/* Output: 7, -1, 12 */
\`\`\`

### ISR Callback Pattern

\`\`\`c
typedef void (*ISR_Callback)(void);

ISR_Callback timer_callback = NULL;

void TIMER_RegisterCallback(ISR_Callback cb) {
    timer_callback = cb;
}

/* Called by hardware timer interrupt */
void TIMER_IRQHandler(void) {
    if (timer_callback != NULL) {
        timer_callback();
    }
}
\`\`\`

Your application code registers its own handler: \`TIMER_RegisterCallback(my_tick_handler);\` — clean separation between driver and application.

## Summary

| Concept | Use in Embedded |
|---|---|
| Regular pointer | Access memory-mapped registers |
| \`volatile\` pointer | Prevent compiler from caching register reads |
| \`void *\` | Generic driver APIs, DMA, memcpy |
| Function pointer | ISR callbacks, command tables, driver HAL |`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

typedef int (*ArithFn)(int, int);

int add(int a, int b) {
    return a + b;
}

int sub(int a, int b) {
    return a - b;
}

int mul(int a, int b) {
    return a * b;
}

int main() {
    /* TODO: Declare an ArithFn array of 3 elements: {add, sub, mul} */
    /* TODO: Loop i from 0 to 2, print dispatch[i](3, 4) on its own line */
    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

typedef int (*ArithFn)(int, int);

int add(int a, int b) {
    return a + b;
}

int sub(int a, int b) {
    return a - b;
}

int mul(int a, int b) {
    return a * b;
}

int main() {
    ArithFn dispatch[3] = { add, sub, mul };
    int i;
    for (i = 0; i < 3; i++) {
        printf("%d\\n", dispatch[i](3, 4));
    }
    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '7\n-1\n12',
      description: 'add(3,4)=7, sub(3,4)=-1, mul(3,4)=12 called via function pointer array.',
    },
  ],
  hints: [
    'Declare the array as `ArithFn dispatch[3] = { add, sub, mul };` — function names without parentheses are their addresses.',
    'Call via: `dispatch[i](3, 4)` — the syntax is identical to a regular function call.',
    'Print with `printf("%d\\n", dispatch[i](3, 4));` inside a loop from i=0 to i<3.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Fixed-size dispatch table; each call is O(1) indirection.' },
  tags: ['embedded-c', 'pointers', 'function-pointers', 'callbacks', 'dispatch-table'],
};
export default lesson;
