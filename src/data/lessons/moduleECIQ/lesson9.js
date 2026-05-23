const lesson = {
  id: 'meciq-l9',
  title: 'DMA vs Interrupts vs Polling — When to Use Each',
  module: 'ECIQ',
  lessonNumber: 9,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# DMA vs Interrupts vs Polling — When to Use Each

## The Three I/O Strategies

Every embedded interview asks: *"You need to receive 4096 bytes from SPI. How do you do it?"*

### 1. Polling (Busy-Wait)

\`\`\`c
uint8_t buf[4096];
for (int i = 0; i < 4096; i++) {
    while (!(SPI1->SR & SPI_SR_RXNE)) {}  /* Wait for byte */
    buf[i] = SPI1->DR;                     /* Read byte     */
}
\`\`\`

- CPU **stuck in the loop** — cannot do anything else
- Simplest to code, zero latency for very fast peripherals
- Terrible for battery life — CPU runs at full speed doing nothing useful

### 2. Interrupt-Driven

\`\`\`c
volatile uint8_t buf[4096];
volatile int idx = 0;

void SPI1_IRQHandler(void) {
    buf[idx++] = SPI1->DR;   /* Read one byte per interrupt */
    if (idx == 4096) SPI_DisableRxInterrupt();
}
\`\`\`

- CPU **free between bytes** — can run other tasks
- **4096 interrupts** for 4096 bytes — significant ISR overhead at high speeds
- Good for low-to-medium data rates

### 3. DMA (Direct Memory Access)

\`\`\`c
/* Configure DMA: source = SPI DR, dest = buf, count = 4096 */
DMA_Setup(src: &SPI1->DR, dst: buf, count: 4096, mode: PERIPHERAL_TO_MEMORY);
DMA_EnableTransferCompleteInterrupt();
DMA_Start();
/* CPU is now 100% free — DMA hardware copies data autonomously */

void DMA1_Stream0_IRQHandler(void) {     /* Fires ONCE after 4096 bytes */
    DMA_ClearFlag();
    processBuffer(buf, 4096);
}
\`\`\`

- Hardware copies data with **zero CPU involvement**
- Only **1 interrupt** fires at the end (transfer complete)
- CPU can sleep → **maximum power savings**
- Complex to configure, but worth it for bulk transfers

## Comparison Table

| Strategy | CPU usage | Interrupts | Best for |
|---|---|---|---|
| Polling | 100% blocked | 0 | Sub-microsecond latency, simple peripherals |
| Interrupt | Low (per byte) | N (one per byte) | Low-medium data rates, simple MCUs |
| DMA | ~0% | 1 (at end) | Bulk transfers, ADC streaming, power-sensitive |

## Q: What is double buffering in DMA?

\`\`\`
Buffer A: [DMA fills] ──────────────────► [CPU processes]
Buffer B:                [CPU processes] ◄── [DMA fills]
\`\`\`

While DMA fills buffer A, CPU processes buffer B. Then swap. This eliminates dead-time between consecutive transfers and is essential for audio, video, or continuous ADC sampling.

## Q: When would you choose polling over DMA?

- The operation is **very short** (< 10 bytes, < 1 µs) — DMA setup overhead is not worth it
- You need **deterministic, zero-jitter** timing at start of transfer
- The MCU has **no DMA controller** (common in small 8-bit MCUs like ATtiny)
- **Debugging** — polling is far easier to trace step-by-step`,
  starterCode: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

/* Simulate a DMA transfer: copies src to dst without a loop in "main" */
void simulateDMA(uint8_t *dst, const uint8_t *src, int len) {
    /* TODO: use memcpy to simulate the DMA copy */
}

int main() {
    const uint8_t src[4] = {10, 20, 30, 40};
    uint8_t dst[4] = {0};

    simulateDMA(dst, src, 4);

    for (int i = 0; i < 4; i++)
        printf("%d\\n", dst[i]);

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

void simulateDMA(uint8_t *dst, const uint8_t *src, int len) {
    memcpy(dst, src, len);
}

int main() {
    const uint8_t src[4] = {10, 20, 30, 40};
    uint8_t dst[4] = {0};

    simulateDMA(dst, src, 4);

    for (int i = 0; i < 4; i++)
        printf("%d\\n", dst[i]);

    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '10\n20\n30\n40', description: 'DMA-like copy transfers all 4 bytes correctly.' },
  ],
  hints: [
    'Use memcpy(dst, src, len) inside simulateDMA to copy len bytes from src to dst.',
    'Real DMA works the same way but in hardware — the CPU does not execute the copy loop.',
    'After the copy, print each element of dst.',
  ],
  complexity: { time: 'O(n)', space: 'O(1)', notes: 'DMA copy is O(n) but done in hardware, freeing the CPU.' },
  tags: ['embedded-c', 'DMA', 'interrupts', 'polling', 'power', 'interview'],
};
export default lesson;
