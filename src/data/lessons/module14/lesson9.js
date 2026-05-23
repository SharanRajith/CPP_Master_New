const lesson = {
  id: 'm14-l9',
  title: 'ADC — Analog to Digital Conversion',
  module: 14,
  lessonNumber: 9,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# ADC — Analog to Digital Conversion

## What is an ADC?

An **Analog-to-Digital Converter (ADC)** samples a continuous voltage and converts it to a digital integer. Every MCU with sensor inputs uses one.

---

## Key Parameters

| Parameter | Description |
|---|---|
| **Resolution** | Bits of precision (8, 10, 12, 16-bit) |
| **Reference voltage** | Max measurable voltage (V_REF) |
| **Sampling rate** | Samples per second (SPS) |
| **Channels** | Number of analog inputs |

## Voltage → Digital Formula

\`\`\`
digital = (V_in / V_ref) * (2^bits - 1)
\`\`\`

## Digital → Voltage Formula

\`\`\`
V_in = (digital / (2^bits - 1)) * V_ref
\`\`\`

### Example: 12-bit ADC, V_REF = 3.3V

\`\`\`
Reading = 2048
V = (2048 / 4095) * 3.3 = 1.65V
\`\`\`

---

## Common Sensor Conversions

### Temperature (NTC thermistor or LM35)

\`\`\`c
// LM35: 10mV per degree C, V_REF = 5V, 10-bit ADC
float adc_to_celsius(int adc_val) {
    float voltage = (adc_val / 1023.0f) * 5.0f;   // V
    return voltage * 100.0f;                        // mV -> degC
}
\`\`\`

### Potentiometer (0–100%)

\`\`\`c
float adc_to_percent(int adc_val, int max_val) {
    return (adc_val / (float)max_val) * 100.0f;
}
\`\`\`

---

## ADC Noise Reduction — Averaging

Raw ADC readings are noisy. Average multiple samples:

\`\`\`c
int adc_average(int *samples, int count) {
    long sum = 0;
    for (int i = 0; i < count; i++) sum += samples[i];
    return (int)(sum / count);
}
\`\`\`

---

## Key Points

- ADC resolution determines accuracy: 12-bit = 4096 steps over V_REF.
- Always convert raw reading to engineering units (V, °C, %) before displaying.
- Average multiple samples to reduce noise.
- Check V_REF — a 3.3V reference means you can only measure 0–3.3V.
`,
  starterCode: `#include <stdio.h>

// 12-bit ADC (0-4095), V_REF = 3.3V
// Convert ADC reading to voltage, then print in format: X.XXV
// Also average 4 samples and print average voltage

float adc_to_voltage(int adc_val, float vref, int bits) {
    // TODO: implement
    return 0.0f;
}

int adc_average(int *samples, int count) {
    // TODO: implement
    return 0;
}

int main() {
    // Single conversion
    int reading = 2048;
    float v = adc_to_voltage(reading, 3.3f, 12);
    printf("%.2fV\\n", v);

    // Averaged
    int samples[4] = {2000, 2100, 1950, 2050};
    int avg = adc_average(samples, 4);
    float avg_v = adc_to_voltage(avg, 3.3f, 12);
    printf("%.2fV\\n", avg_v);

    return 0;
}`,
  modelAnswer: `#include <stdio.h>

float adc_to_voltage(int adc_val, float vref, int bits) {
    int max_val = (1 << bits) - 1;
    return ((float)adc_val / max_val) * vref;
}

int adc_average(int *samples, int count) {
    long sum = 0;
    for (int i = 0; i < count; i++) sum += samples[i];
    return (int)(sum / count);
}

int main() {
    int reading = 2048;
    float v = adc_to_voltage(reading, 3.3f, 12);
    printf("%.2fV\\n", v);

    int samples[4] = {2000, 2100, 1950, 2050};
    int avg = adc_average(samples, 4);
    float avg_v = adc_to_voltage(avg, 3.3f, 12);
    printf("%.2fV\\n", avg_v);

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '1.65V\n1.63V',
      description: '2048/4095*3.3=1.65V; avg of samples=2025, 2025/4095*3.3≈1.63V',
    },
  ],
  hints: [
    '`max_val = (1 << bits) - 1` gives 4095 for 12-bit. The conversion is `(adc_val / (float)max_val) * vref`.',
    'In `adc_average`, sum all samples with a `long` to avoid overflow, then divide by count.',
    'Average of {2000, 2100, 1950, 2050} = 8100/4 = 2025. Then 2025/4095*3.3 ≈ 1.63V.',
  ],
  complexity: { time: 'O(n)', space: 'O(1)', notes: 'n = number of samples averaged' },
  tags: ['embedded-c', 'adc', 'sensors', 'analog', 'conversion', 'averaging'],
};
export default lesson;
