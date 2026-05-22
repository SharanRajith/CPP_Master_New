const lesson = {
  id: 'mcb-l3',
  title: 'Functions & Scope in C',
  module: 'C Basics for Embedded',
  type: 'theory',
  xpReward: 10,
  content: `
## Functions & Scope in C

Functions in C are the primary way to organize embedded firmware. Good function design makes firmware readable, testable, and reusable across hardware targets.

---

### Basic Function Syntax

\`\`\`c
// Declaration (prototype) — tells the compiler the function exists
int add(int a, int b);

// Definition — actual implementation
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(3, 5);
    printf("Result: %d\\n", result);   // 8
    return 0;
}
\`\`\`

---

### void Functions

\`\`\`c
void blink_led(int pin, int times) {
    for (int i = 0; i < times; i++) {
        gpio_write(pin, 1);   // ON
        delay_ms(500);
        gpio_write(pin, 0);   // OFF
        delay_ms(500);
    }
}
\`\`\`

---

### Function Prototypes (Forward Declarations)

In C, you **must** declare a function before calling it. Put prototypes at the top of your file or in a header (\`.h\`):

\`\`\`c
// mydevice.h
void  init_sensor(void);
float read_temperature(void);
int   check_alarm(float temp, float threshold);
\`\`\`

\`\`\`c
// mydevice.c
#include "mydevice.h"

void init_sensor(void) { /* ... */ }

float read_temperature(void) {
    return 36.5f;
}

int check_alarm(float temp, float threshold) {
    return temp > threshold;
}
\`\`\`

---

### Variable Scope

\`\`\`c
int global_counter = 0;    // global — visible everywhere, persists forever

void increment(void) {
    int local = 10;         // local — only visible inside this function
    global_counter += local;
}
\`\`\`

**In embedded**, globals are used for state shared between functions or ISRs (interrupt service routines). Overusing them makes code hard to debug — prefer passing parameters.

---

### static Variables

\`\`\`c
void count_calls(void) {
    static int count = 0;   // persists between calls, but only visible here
    count++;
    printf("Called %d times\\n", count);
}
\`\`\`

\`static\` inside a function = persistent local. Very useful for keeping state without exposing it globally.

---

### static Functions (File Scope)

\`\`\`c
static void internal_helper(void) {
    // only visible within this .c file — not exported
}
\`\`\`

Use \`static\` on functions you don't want to expose. This is good embedded practice for **encapsulation without classes**.

---

### Passing by Value vs Pointer

C only passes by value. To modify a variable in the caller, pass a **pointer**:

\`\`\`c
// ❌ Won't work — value is copied
void double_it(int x) {
    x = x * 2;
}

// ✅ Works — modifies original
void double_it(int *x) {
    *x = (*x) * 2;
}

int main() {
    int val = 5;
    double_it(&val);
    printf("%d\\n", val);   // 10
    return 0;
}
\`\`\`

---

### Header Files & Multiple Files

Real embedded projects split code across files:

\`\`\`
project/
  main.c
  uart.c      uart.h
  gpio.c      gpio.h
  sensor.c    sensor.h
\`\`\`

\`\`\`c
// gpio.h
#ifndef GPIO_H
#define GPIO_H

void gpio_init(int pin, int mode);
void gpio_write(int pin, int value);
int  gpio_read(int pin);

#endif
\`\`\`

The \`#ifndef / #define / #endif\` guard prevents double-inclusion.

---

### Key Takeaway

Functions + header files = the C equivalent of classes for embedded. A well-structured embedded project looks like \`uart.c/h\`, \`sensor.c/h\`, \`main.c\` — each \`.c\` file owns one peripheral or responsibility.
`,
};

export default lesson;
