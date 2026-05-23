const lesson = {
  id: 'mcb-l4',
  title: 'Pointers & Arrays in C',
  module: 'C Basics for Embedded',
  lessonNumber: 4,
  type: 'theory',
  xpReward: 10,
  content: `
## Pointers & Arrays in C

Pointers are **the most important concept in embedded C**. Memory-mapped I/O, DMA buffers, register access — all of it uses pointers. If you understand pointers, you understand embedded.

---

### What is a Pointer?

A pointer stores the **memory address** of a variable.

\`\`\`c
int  x   = 42;
int *ptr = &x;     // ptr holds the address of x

printf("Value of x:       %d\\n",  x);      // 42
printf("Address of x:     %p\\n",  &x);     // e.g. 0x7ffd3a20
printf("ptr holds:        %p\\n",  ptr);    // same address
printf("Value at ptr:     %d\\n",  *ptr);   // 42  (dereference)
\`\`\`

- \`&x\` → "address of x"
- \`*ptr\` → "value at the address stored in ptr"

---

### Modifying via Pointer

\`\`\`c
int  voltage = 330;
int *p       = &voltage;

*p = 500;   // changes voltage through the pointer

printf("%d\\n", voltage);   // 500
\`\`\`

---

### Pointer Types Must Match

\`\`\`c
char  reg = 0xFF;
char *p   = &reg;   // ✅ correct

int  *q   = &reg;   // ❌ wrong — type mismatch, UB
\`\`\`

---

### Arrays in C

An array is a contiguous block of memory. The array name **is** a pointer to the first element.

\`\`\`c
int readings[5] = {10, 20, 30, 40, 50};

printf("%d\\n", readings[0]);    // 10 — index access
printf("%d\\n", *readings);      // 10 — pointer dereference (same thing)
printf("%d\\n", *(readings + 2)); // 30 — pointer arithmetic
\`\`\`

---

### Iterating Arrays

\`\`\`c
int adc_values[4] = {512, 638, 712, 490};

// With index
for (int i = 0; i < 4; i++) {
    printf("ADC[%d] = %d\\n", i, adc_values[i]);
}

// With pointer arithmetic
int *p = adc_values;
for (int i = 0; i < 4; i++) {
    printf("%d\\n", *(p + i));
}
\`\`\`

---

### Passing Arrays to Functions

Arrays decay to pointers when passed to functions:

\`\`\`c
void print_buffer(int *buf, int len) {
    for (int i = 0; i < len; i++) {
        printf("0x%X ", buf[i]);
    }
    printf("\\n");
}

int main() {
    int uart_rx[4] = {0xAA, 0xBB, 0xCC, 0xDD};
    print_buffer(uart_rx, 4);   // AA BB CC DD
    return 0;
}
\`\`\`

---

### Pointer to Hardware Register (Core Embedded Pattern)

\`\`\`c
// Directly access a memory-mapped register at address 0x40020000
volatile unsigned int *GPIOA_ODR = (volatile unsigned int *)0x40020014;

*GPIOA_ODR = 0x01;   // Set pin PA0 HIGH
\`\`\`

This is the **fundamental pattern** behind every embedded HAL and bare-metal driver. \`volatile\` tells the compiler not to optimize away the access.

---

### NULL Pointer

Always initialize pointers. A pointer that isn't assigned yet should be \`NULL\`:

\`\`\`c
int *ptr = NULL;

if (ptr != NULL) {
    *ptr = 10;   // safe
}
\`\`\`

Dereferencing \`NULL\` crashes the program (or in embedded: hard fault / watchdog reset).

---

### String as char Array

\`\`\`c
char name[] = "Arduino";
printf("Length: %lu\\n", strlen(name));   // 7
printf("First:  %c\\n",  name[0]);        // A
printf("Via ptr: %c\\n", *name);          // A
\`\`\`

---

### Key Takeaway

Pointers = addresses. In embedded, **registers are just addresses** — you cast an integer address to a pointer and read/write hardware directly. Mastering pointers means you can write drivers from scratch without any HAL.
`,
  hints: [
    '`&x` gives the address of x; `*ptr` dereferences ptr to get the value at that address — these two operators are inverses of each other.',
    'Array names are already pointers to the first element: `readings[2]` and `*(readings + 2)` are identical.',
    'Hardware registers are accessed by casting an integer address to a volatile pointer: `volatile unsigned int *REG = (volatile unsigned int *)0x40020014;` — `volatile` prevents the compiler from optimizing away the access.',
  ],
  complexity: null,
  tags: ['embedded-c', 'c-basics', 'pointers', 'arrays', 'memory-mapped-io', 'volatile'],
};

export default lesson;
