const lesson = {
  id: 'mcb-l1',
  title: 'Variables & Data Types in C',
  module: 'C Basics for Embedded',
  lessonNumber: 1,
  type: 'theory',
  xpReward: 10,
  content: `
## Variables & Data Types in C

Unlike C++, embedded systems use **C** — a simpler, lower-level language with no classes or STL. Everything you write maps almost directly to hardware.

---

### Declaring Variables

\`\`\`c
int age = 25;
float temperature = 36.6f;
char grade = 'A';
unsigned int count = 0;
\`\`\`

---

### Core Data Types

| Type | Size | Range | Use in Embedded |
|------|------|-------|-----------------|
| \`char\` | 1 byte | -128 to 127 | Single byte values, characters |
| \`unsigned char\` | 1 byte | 0 to 255 | GPIO values, register bytes |
| \`int\` | 2 or 4 bytes | Platform-dependent | General integers |
| \`unsigned int\` | 2 or 4 bytes | 0 to 65535 / 4B | Counters, addresses |
| \`float\` | 4 bytes | ±3.4×10³⁸ | Sensor readings |
| \`double\` | 8 bytes | ±1.7×10³⁰⁸ | Rarely used in embedded |

> ⚠️ In embedded C, the size of \`int\` depends on the MCU architecture (8-bit, 16-bit, 32-bit). This is why we use **fixed-width types** from \`<stdint.h>\` in practice — covered in Module 14.

---

### Constants

\`\`\`c
#define MAX_SPEED   100        // preprocessor constant (no type, no memory)
const int BAUD_RATE = 9600;   // typed constant (has memory)
\`\`\`

In embedded, \`#define\` is very common for hardware constants (register addresses, pin numbers).

---

### Type Modifiers

\`\`\`c
short int x = 100;      // smaller int
long int  y = 100000L;  // larger int
unsigned char reg = 0xFF;  // no sign bit — full 8 bits usable
\`\`\`

---

### Printf in C

\`\`\`c
#include <stdio.h>

int main() {
    int    a = 10;
    float  b = 3.14f;
    char   c = 'X';

    printf("Integer: %d\\n", a);
    printf("Float:   %.2f\\n", b);
    printf("Char:    %c\\n", c);
    printf("Hex:     0x%X\\n", a);   // useful for register values

    return 0;
}
\`\`\`

**Format specifiers to remember:**
- \`%d\` → int
- \`%u\` → unsigned int
- \`%f\` → float
- \`%c\` → char
- \`%s\` → string
- \`%x\` / \`%X\` → hex (lowercase / uppercase)

---

### Implicit vs Explicit Type Casting

\`\`\`c
int   a = 5;
int   b = 2;
float result = (float)a / b;   // 2.5 — explicit cast needed
float wrong  = a / b;          // 2.0 — integer division!
\`\`\`

Always cast explicitly in C. The compiler won't warn you by default.

---

### Key Takeaway

C has no objects, no templates, no \`std::\` — just variables, functions, and memory. This simplicity is what makes it ideal for embedded systems where you need **full control over every byte**.
`,
  hints: [
    'Use `unsigned char` (0–255) for register values and GPIO bytes — it maps directly to a single hardware register.',
    'Use `#define` for pin numbers and addresses (no memory cost); use `const` when you need a typed constant.',
    'Always cast explicitly when mixing int and float: `(float)a / b` gives 2.5, but `a / b` gives 2 (integer division).',
  ],
  complexity: null,
  tags: ['embedded-c', 'c-basics', 'variables', 'data-types', 'printf'],
};

export default lesson;
