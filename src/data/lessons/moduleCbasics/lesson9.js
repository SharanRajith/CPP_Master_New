const lesson = {
  id: 'mcb-l9',
  title: 'Preprocessor Directives & Macros',
  module: 'C Basics for Embedded',
  lessonNumber: 9,
  type: 'theory',
  xpReward: 10,
  content: `## Preprocessor Directives & Macros

The C preprocessor runs **before** compilation and performs text substitution. In embedded C it is heavily used for hardware abstraction, conditional compilation, and constants.

---

### #define — Constants & Macros

\`\`\`c
#define LED_PIN     13
#define MAX_TEMP    85
#define PI          3.14159f

#define BAUD_RATE   9600UL   // UL = unsigned long
\`\`\`

Unlike \`const\`, \`#define\` has no type — it's pure text replacement before compilation. No memory is consumed.

#### Function-like Macros

\`\`\`c
#define MAX(a, b)       ((a) > (b) ? (a) : (b))
#define BIT(n)          (1U << (n))
#define SET_BIT(reg, n) ((reg) |= BIT(n))
#define CLR_BIT(reg, n) ((reg) &= ~BIT(n))
#define TST_BIT(reg, n) (((reg) >> (n)) & 1U)
\`\`\`

> ⚠️ Always wrap macro arguments in parentheses — otherwise operator precedence bugs bite you.
\`\`\`c
#define SQUARE(x) x * x        // WRONG: SQUARE(2+3) = 2+3*2+3 = 11
#define SQUARE(x) ((x) * (x))  // RIGHT: SQUARE(2+3) = (2+3)*(2+3) = 25
\`\`\`

---

### #include — File Inclusion

\`\`\`c
#include <stdio.h>      // system header — searches system paths
#include "my_driver.h"  // local header — searches current directory first
\`\`\`

#### Include Guards — Prevent Double Inclusion

\`\`\`c
#ifndef UART_H
#define UART_H

void uart_init(uint32_t baud);
void uart_send(const char *data);

#endif /* UART_H */
\`\`\`

Every header file should have include guards. Modern compilers also support \`#pragma once\` as a shorthand.

---

### #ifdef / #ifndef — Conditional Compilation

\`\`\`c
#define DEBUG_MODE   // comment this out for release

#ifdef DEBUG_MODE
  #define LOG(msg) printf("[DEBUG] %s\\n", msg)
#else
  #define LOG(msg)   // expands to nothing — zero overhead
#endif
\`\`\`

Used to enable/disable debug prints without touching the code — just toggle the \`#define\`.

#### Platform Selection

\`\`\`c
#ifdef STM32F4
  #include "stm32f4xx.h"
#elif defined(STM32H7)
  #include "stm32h7xx.h"
#else
  #error "Unsupported MCU"
#endif
\`\`\`

---

### Predefined Macros

| Macro | Value |
|---|---|
| \`__FILE__\` | Current filename |
| \`__LINE__\` | Current line number |
| \`__DATE__\` | Compilation date |
| \`__func__\` | Current function name (C99) |

Useful for debug assertions:

\`\`\`c
#define ASSERT(cond) \\
  if (!(cond)) { \\
    printf("Assert failed: %s line %d\\n", __FILE__, __LINE__); \\
    while(1); \\
  }
\`\`\`

---

### Key Takeaway

In embedded C, macros are everywhere: pin definitions, bit manipulation helpers, debug logging, and platform selection. Always parenthesize macro arguments, use include guards on every header, and use \`#ifdef DEBUG_MODE\` to strip logging from release builds.
`,
  hints: [
    'Always wrap macro arguments in parentheses: `#define SQUARE(x) ((x)*(x))` — without them, operator precedence causes subtle bugs.',
    'Use `#ifdef DEBUG_MODE` + `#define LOG(msg) printf(...)` to have zero-overhead logging in release — just remove the `#define DEBUG_MODE` line.',
    'Every header file needs include guards (`#ifndef MY_H / #define MY_H / ... / #endif`) to prevent double-inclusion errors.',
  ],
  complexity: null,
  tags: ['embedded-c', 'c-basics', 'preprocessor', 'macros', 'define', 'ifdef', 'include-guards'],
};

export default lesson;
