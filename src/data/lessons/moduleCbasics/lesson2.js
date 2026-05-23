const lesson = {
  id: 'mcb-l2',
  title: 'Conditionals & Loops in C',
  module: 'C Basics for Embedded',
  lessonNumber: 2,
  type: 'theory',
  xpReward: 10,
  content: `
## Conditionals & Loops in C

Control flow in C is nearly identical to C++, but understanding it deeply matters in embedded — every unnecessary branch or loop iteration wastes clock cycles.

---

### if / else if / else

\`\`\`c
int temperature = 85;

if (temperature > 100) {
    printf("CRITICAL: Overheat!\\n");
} else if (temperature > 75) {
    printf("WARNING: High temp\\n");
} else {
    printf("Normal\\n");
}
\`\`\`

---

### switch / case

Preferred over long if-else chains in embedded for **state machines and command decoders** — compilers often optimize it to a jump table.

\`\`\`c
char command = 'S';

switch (command) {
    case 'S':
        printf("Start motor\\n");
        break;
    case 'P':
        printf("Stop motor\\n");
        break;
    case 'R':
        printf("Reset\\n");
        break;
    default:
        printf("Unknown command\\n");
        break;
}
\`\`\`

> Always include \`break\` — missing it causes **fall-through** (execution continues into the next case).

---

### for Loop

\`\`\`c
// Send 8 bits of a byte over a serial line
unsigned char data = 0b10110010;

for (int i = 7; i >= 0; i--) {
    int bit = (data >> i) & 1;
    printf("Bit %d: %d\\n", i, bit);
}
\`\`\`

---

### while Loop

\`\`\`c
// Wait until a button is pressed (active-low GPIO)
while (GPIO_PIN == 1) {
    // busy-wait — common in bare-metal embedded
}
printf("Button pressed!\\n");
\`\`\`

---

### do-while Loop

Runs **at least once** — useful for menu systems or retry logic.

\`\`\`c
int attempts = 0;
int success  = 0;

do {
    success = try_connect();
    attempts++;
} while (!success && attempts < 3);
\`\`\`

---

### Infinite Loop — The Embedded Main Loop

Every embedded program has a **superloop** — an infinite loop that keeps the MCU running:

\`\`\`c
int main() {
    hardware_init();   // setup once

    while (1) {        // run forever
        read_sensors();
        process_data();
        update_outputs();
    }

    return 0;  // never reached
}
\`\`\`

This is the fundamental structure of almost every bare-metal embedded program.

---

### Ternary Operator

\`\`\`c
int led_state = (temperature > 80) ? 1 : 0;
\`\`\`

---

### Logical & Comparison Operators

| Operator | Meaning |
|----------|---------|
| \`==\` | Equal |
| \`!=\` | Not equal |
| \`>\`, \`<\`, \`>=\`, \`<=\` | Comparison |
| \`&&\` | Logical AND |
| \`\|\|\` | Logical OR |
| \`!\` | Logical NOT |

---

### Key Takeaway

The \`while(1)\` superloop is the heartbeat of embedded firmware. Knowing when to use \`for\`, \`while\`, and \`switch\` efficiently directly impacts your MCU's responsiveness and power consumption.
`,
  hints: [
    'Always add `break` at the end of each `switch` case — omitting it causes fall-through where execution continues into the next case.',
    'Use `switch` instead of long if-else chains for command decoders and state machines — compilers often turn it into a jump table (O(1) dispatch).',
    'The embedded superloop pattern is `while(1) { read_sensors(); process(); update_outputs(); }` — the MCU runs this forever after `main()` starts.',
  ],
  complexity: null,
  tags: ['embedded-c', 'c-basics', 'control-flow', 'loops', 'switch', 'superloop'],
};

export default lesson;
