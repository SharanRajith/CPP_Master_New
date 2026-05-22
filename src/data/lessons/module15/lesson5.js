// src/data/lessons/module15/lesson5.js
const lesson = {
  id: 'm15-l5',
  title: 'Fixed-Point Arithmetic',
  module: 15,
  lessonNumber: 5,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Fixed-Point Arithmetic

## Why Avoid Floating-Point on MCUs?

| Issue | Details |
|---|---|
| No FPU on 8-bit MCUs | AVR ATmega has no hardware FPU — a float add takes ~100 cycles |
| Non-deterministic | Float latency varies — bad for real-time control loops |
| Large code size | GCC soft-float library adds ~10 KB to binary |
| Precision surprises | 0.1 + 0.2 ≠ 0.3 in IEEE 754 |

**Fixed-point arithmetic** solves all these problems by representing fractional numbers as integers scaled by a power of 2.

## Q Format Notation

Fixed-point numbers are described in **Q format**: \`Qm.n\` means m bits for the integer part, n bits for the fractional part.

### Q8.8 (16-bit, scale = 256 = 2^8)

\`\`\`
  Bit 15..8   Bit 7..0
  [int part]  [frac part]
\`\`\`

To convert a real number to Q8.8: multiply by 256 (= 2^8):
\`\`\`
  1.5  × 256 = 384    (Q8 representation of 1.5)
  2.5  × 256 = 640    (Q8 representation of 2.5)
  3.75 × 256 = 960    (Q8 representation of 3.75)
\`\`\`

## Fixed-Point Multiplication (Q8)

\`\`\`
  A_fp × B_fp = (A × 256) × (B × 256)
              = A × B × 65536
              = (A × B) × 256  ×  256
\`\`\`

The result is in Q16 — it needs one right-shift by 8 to come back to Q8:

\`\`\`c
int32_t q8_mul(int32_t a, int32_t b) {
    return (a * b) >> 8;
}

/* Example: 1.5 × 2.5 */
int32_t a = 384;   /* 1.5 × 256 */
int32_t b = 640;   /* 2.5 × 256 */
int32_t result = q8_mul(a, b);   /* (384 × 640) >> 8 = 245760 >> 8 = 960 */
/* 960 / 256 = 3.75 ✓ */
\`\`\`

## Temperature Sensor Example

A 10-bit ADC reading a 3.3 V reference with a TMP36 sensor:

\`\`\`
ADC_raw = 512
Voltage = ADC_raw × 3300 mV / 1023 = 1650 mV
TMP36: temp_C = (voltage_mV - 500) / 10 = (1650 - 500) / 10 = 115°C ?
\`\`\`

Using integer arithmetic to avoid float:
\`\`\`c
int32_t adc   = 512;
int32_t vcc   = 3300;       /* mV */
int32_t vmv   = (adc * vcc) / 1023;   /* 1650 mV */
int32_t temp  = (vmv - 500) / 10;     /* 115 — unit: 0.1°C steps */
\`\`\`

No float used, completely deterministic.

## Q8 Division

\`\`\`c
int32_t q8_div(int32_t a, int32_t b) {
    return (a << 8) / b;   /* scale numerator before dividing */
}
\`\`\`

## Integer Part Extraction

To get just the integer part from a Q8 value:
\`\`\`c
int32_t int_part = result >> 8;          /* 960 >> 8 = 3 */
int32_t frac_256 = result & 0xFF;        /* 960 & 255 = 192 */
/* 192/256 = 0.75 — the fractional part */
\`\`\`

## Why Q8.8 Specifically?

- Fits in 16-bit or 32-bit integer (available on all MCUs)
- Scale of 256 means shifts are cheap (no division needed)
- Precision: 1/256 ≈ 0.0039 — fine for sensor data`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

/* Q8 fixed-point multiply: inputs are Q8 values (real × 256) */
int32_t q8_mul(int32_t a, int32_t b) {
    /* TODO: return (a * b) >> 8 */
    return 0;
}

int main() {
    /* 1.5 in Q8 = 1.5 × 256 = 384 */
    /* 2.5 in Q8 = 2.5 × 256 = 640 */
    int32_t a = 384;
    int32_t b = 640;

    int32_t result = q8_mul(a, b);

    /* TODO: print result (should be 960) */
    /* TODO: print integer part of result (result >> 8, should be 3) */

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

int32_t q8_mul(int32_t a, int32_t b) {
    return (a * b) >> 8;
}

int main() {
    int32_t a = 384;
    int32_t b = 640;

    int32_t result = q8_mul(a, b);

    printf("%d\\n", (int)result);
    printf("%d\\n", (int)(result >> 8));

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '960\n3',
      description: 'Q8 multiply 384×640 >> 8 = 960 (representing 3.75); integer part 960>>8 = 3.',
    },
  ],
  hints: [
    'Q8 multiply: `return (a * b) >> 8;` — multiply the two Q8 values and right-shift by 8 to scale back.',
    '384 × 640 = 245760; 245760 >> 8 = 960. Verify: 960 / 256 = 3.75 which is 1.5 × 2.5.',
    'Integer part: `result >> 8` = 960 >> 8 = 3. Print both with `printf("%d\\n", ...)`.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Single multiply and shift — constant time, no loops.' },
  tags: ['embedded-c', 'fixed-point', 'arithmetic', 'q-format', 'no-float'],
};
export default lesson;
