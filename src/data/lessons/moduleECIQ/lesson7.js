const lesson = {
  id: 'meciq-l7',
  title: 'Function Pointers, Callbacks & State Machines',
  module: 'ECIQ',
  lessonNumber: 7,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Function Pointers, Callbacks & State Machines

## Q: What is a function pointer and how do you declare one?

A function pointer stores the address of a function and lets you call it indirectly — the basis of callbacks, HAL drivers, and state machines in C.

\`\`\`c
/* Syntax: returnType (*pointerName)(paramTypes) */
void (*handler)(int pin);         /* pointer to void f(int) */
int  (*compare)(const void *, const void *);  /* for qsort */

/* typedef makes it readable */
typedef void (*GPIO_Callback)(int pin);
GPIO_Callback myHandler = NULL;
\`\`\`

## Q: Write a GPIO driver with a registered callback

\`\`\`c
typedef void (*PinCallback)(int pin);

static PinCallback callbacks[16] = {NULL};  /* one per GPIO pin */

void GPIO_RegisterCallback(int pin, PinCallback cb) {
    if (pin >= 0 && pin < 16)
        callbacks[pin] = cb;
}

/* Called from the real ISR */
void GPIO_IRQHandler(void) {
    int pin = GPIO_GetPendingPin();
    if (callbacks[pin] != NULL)
        callbacks[pin](pin);  /* Fire the registered callback */
}

/* Application code */
void onButtonPress(int pin) {
    toggleLED(pin);
}

int main(void) {
    GPIO_RegisterCallback(5, onButtonPress);
    /* Now pressing the button on pin 5 calls onButtonPress(5) */
}
\`\`\`

## Q: Implement a simple state machine using function pointers

\`\`\`c
typedef enum { STATE_IDLE, STATE_ACTIVE, STATE_ERROR, NUM_STATES } State;
typedef void (*StateHandler)(void);

void handleIdle(void)   { /* wait for trigger */ }
void handleActive(void) { /* do work */          }
void handleError(void)  { /* blink LED, log */   }

StateHandler dispatch[NUM_STATES] = {
    handleIdle,
    handleActive,
    handleError,
};

State current = STATE_IDLE;

int main(void) {
    while (1) {
        dispatch[current]();   /* Call current state's handler */
        current = getNextState();
    }
}
\`\`\`

This is the **table-driven state machine** — preferred in embedded because:
- No giant switch/if-else
- Adding states = adding a function + one line in the table
- O(1) dispatch regardless of number of states

## Q: What is the difference between a callback and a hook?

- **Callback**: caller provides a function pointer; callee (library/driver) calls it at a specific event (interrupt, completion)
- **Hook**: a weak symbol or empty function that the application can override to intercept a framework event

\`\`\`c
/* Hook pattern — define weakly in library */
__attribute__((weak)) void onSysTickHook(void) {}  /* Default: do nothing */

/* Application overrides it (no registration needed) */
void onSysTickHook(void) { myScheduler_tick(); }   /* Linker picks this one */
\`\`\``,
  starterCode: `#include <stdio.h>

typedef void (*Operation)(int a, int b);

void add(int a, int b) { printf("%d\\n", a + b); }
void mul(int a, int b) { printf("%d\\n", a * b); }

int main() {
    /* TODO: declare a function pointer 'op' of type Operation */
    /* TODO: assign it to add, call op(3, 4) */
    /* TODO: assign it to mul, call op(3, 4) */
    return 0;
}`,
  modelAnswer: `#include <stdio.h>

typedef void (*Operation)(int a, int b);

void add(int a, int b) { printf("%d\\n", a + b); }
void mul(int a, int b) { printf("%d\\n", a * b); }

int main() {
    Operation op;
    op = add;
    op(3, 4);
    op = mul;
    op(3, 4);
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '7\n12', description: 'add(3,4)=7 via function pointer; mul(3,4)=12 via function pointer.' },
  ],
  hints: [
    'Declare: Operation op; — this is a function pointer variable.',
    'Assign: op = add; then call: op(3, 4);',
    'Reassign: op = mul; then call: op(3, 4); — same syntax, different target.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Indirect function call — one pointer dereference.' },
  tags: ['embedded-c', 'function-pointers', 'callbacks', 'state-machine', 'interview'],
};
export default lesson;
