const lesson = {
  id: 'mcb-l10',
  title: 'Multi-file Programs & Makefiles',
  module: 'C Basics for Embedded',
  lessonNumber: 10,
  type: 'theory',
  xpReward: 10,
  content: `## Multi-file Programs & Makefiles

Real embedded projects span many files. Understanding how to split code across files and build it is essential before moving into hardware-specific modules.

---

### Project Structure

\`\`\`
project/
├── main.c
├── Makefile
├── uart/
│   ├── uart.c
│   └── uart.h
├── sensor/
│   ├── sensor.c
│   └── sensor.h
└── utils/
    ├── utils.c
    └── utils.h
\`\`\`

Each peripheral or subsystem gets its own \`.c\`/\`.h\` pair. \`main.c\` wires them together.

---

### The .h File — Interface

\`\`\`c
// uart.h
#ifndef UART_H
#define UART_H

#include <stdint.h>

void     uart_init(uint32_t baud_rate);
void     uart_send_byte(uint8_t byte);
void     uart_send_string(const char *s);
uint8_t  uart_recv_byte(void);

#endif
\`\`\`

The header declares **what** the module provides. Other files \`#include\` the header to use it.

---

### The .c File — Implementation

\`\`\`c
// uart.c
#include "uart.h"
#include <stdio.h>

static uint32_t baud = 9600;   // private — hidden from other files

void uart_init(uint32_t baud_rate) {
    baud = baud_rate;
    // configure hardware registers...
}

void uart_send_string(const char *s) {
    while (*s) uart_send_byte(*s++);
}
\`\`\`

Use \`static\` on file-scope variables and functions you don't want exported.

---

### Makefile Basics

A Makefile automates compilation:

\`\`\`makefile
CC     = gcc
CFLAGS = -Wall -Wextra -O2

# Targets
all: firmware

firmware: main.o uart.o sensor.o
\t$(CC) $(CFLAGS) -o firmware main.o uart.o sensor.o

main.o: main.c uart.h sensor.h
\t$(CC) $(CFLAGS) -c main.c

uart.o: uart/uart.c uart/uart.h
\t$(CC) $(CFLAGS) -c uart/uart.c

sensor.o: sensor/sensor.c sensor/sensor.h
\t$(CC) $(CFLAGS) -c sensor/sensor.c

clean:
\trm -f *.o firmware
\`\`\`

> Makefile indentation uses **TAB characters**, not spaces — this is mandatory.

#### Key Makefile Concepts

| Concept | Meaning |
|---|---|
| Target | What to build (\`firmware\`, \`main.o\`) |
| Dependencies | Files the target needs |
| Recipe | Shell command to build the target |
| \`-c\` flag | Compile to .o without linking |
| \`make clean\` | Remove build artifacts |

---

### Compilation Pipeline

\`\`\`
uart.c  →  (preprocess) → uart.i
        →  (compile)    → uart.s  (assembly)
        →  (assemble)   → uart.o  (object file)
        ↘
main.o + uart.o + sensor.o  →  (link)  →  firmware
\`\`\`

Each \`.c\` compiles independently to a \`.o\` file. The linker combines all \`.o\` files into the final binary.

---

### Compiler Warning Flags to Always Use

\`\`\`makefile
CFLAGS = -Wall -Wextra -Werror -pedantic -std=c99
\`\`\`

- \`-Wall\` — enable common warnings
- \`-Wextra\` — enable extra warnings
- \`-Werror\` — treat warnings as errors (enforces clean code)
- \`-std=c99\` — use C99 standard

---

### Key Takeaway

Split every peripheral into a \`.c\`/\`.h\` pair. Use include guards on every header. Use \`static\` to hide internals. A Makefile builds only changed files — essential for large projects. These patterns form the foundation of every professional embedded firmware codebase.
`,
  hints: [
    'The .h file is the public interface — it declares function prototypes. The .c file is the implementation — it defines the functions. Other modules only need to `#include` the .h.',
    'Use `static` on any file-scope variable or function you want to keep private — it prevents other .c files from accessing it.',
    'Makefile recipes must start with a TAB character (not spaces) — this is a hard requirement of the make tool.',
  ],
  complexity: null,
  tags: ['embedded-c', 'c-basics', 'makefile', 'multi-file', 'header-files', 'compilation', 'linking'],
};

export default lesson;
