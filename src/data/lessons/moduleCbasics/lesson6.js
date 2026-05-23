const lesson = {
  id: 'mcb-l6',
  title: 'Arrays & Strings in C',
  module: 'C Basics for Embedded',
  lessonNumber: 6,
  type: 'theory',
  xpReward: 10,
  content: `## Arrays & Strings in C

### Arrays

An array is a contiguous block of memory storing elements of the same type.

\`\`\`c
int readings[5] = {10, 20, 30, 40, 50};

// Access by index
printf("%d\\n", readings[2]);    // 30

// Iterate
for (int i = 0; i < 5; i++) {
    printf("readings[%d] = %d\\n", i, readings[i]);
}
\`\`\`

#### Multi-dimensional Arrays (2D)

\`\`\`c
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

printf("%d\\n", matrix[1][2]);   // 6
\`\`\`

Used in embedded for look-up tables, PWM duty cycle maps, and display buffers.

---

### Strings in C

C has no built-in string type. A string is a **char array terminated by a null character \`\\0\`**.

\`\`\`c
char name[] = "Alice";
// Stored as: ['A','l','i','c','e','\\0']

printf("Name: %s\\n", name);
printf("Length: %lu\\n", strlen(name));   // 5 (not counting \\0)
\`\`\`

#### String Literals vs Char Arrays

\`\`\`c
char buf[] = "Hello";      // writable copy on stack
const char *ptr = "Hello"; // read-only string literal in flash/rodata
\`\`\`

In embedded, string literals live in Flash memory. Use \`const char *\` when you don't need to modify them — saves RAM.

---

### Common String Functions (string.h)

| Function | Purpose |
|---|---|
| \`strlen(s)\` | Length (excluding \\0) |
| \`strcpy(dst, src)\` | Copy string |
| \`strncpy(dst, src, n)\` | Safe copy (max n bytes) |
| \`strcmp(a, b)\` | Compare — 0 if equal |
| \`strcat(dst, src)\` | Concatenate |
| \`sprintf(buf, fmt, ...)\` | Format into buffer |

> ⚠️ Prefer \`strncpy\` over \`strcpy\` and \`snprintf\` over \`sprintf\` — the safe variants prevent buffer overflows, which are catastrophic in embedded.

---

### sprintf — Format into a Buffer

\`\`\`c
char msg[64];
float temperature = 36.7f;
int   sensor_id   = 3;

snprintf(msg, sizeof(msg), "SENSOR[%d]: %.1f degC", sensor_id, temperature);
// msg = "SENSOR[3]: 36.7 degC"
uart_send(msg);
\`\`\`

This is the standard way to build UART messages without dynamic memory.

---

### Array as Function Parameter

\`\`\`c
void average(int *data, int len, float *out) {
    int sum = 0;
    for (int i = 0; i < len; i++) sum += data[i];
    *out = (float)sum / len;
}

int adc[4] = {512, 648, 590, 700};
float avg;
average(adc, 4, &avg);
printf("Avg: %.1f\\n", avg);
\`\`\`

---

### Key Takeaway

Strings in C are null-terminated char arrays. Always reserve space for the \`\\0\`. Use \`snprintf\` for formatted output into fixed-size buffers — it is the embedded C workhorse for UART logging and display messages.
`,
  hints: [
    'A C string must always have room for the null terminator: `char buf[6] = "Hello"` stores 5 chars + \'\\0\' = 6 bytes.',
    'Use `snprintf(buf, sizeof(buf), ...)` instead of `sprintf` — it caps output at `sizeof(buf)` bytes and prevents buffer overflows.',
    'String literals (`const char *p = "text"`) live in read-only Flash on MCUs; char arrays (`char buf[] = "text"`) are copied to RAM at startup.',
  ],
  complexity: null,
  tags: ['embedded-c', 'c-basics', 'arrays', 'strings', 'snprintf', 'buffers'],
};

export default lesson;
