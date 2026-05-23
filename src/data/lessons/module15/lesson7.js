const lesson = {
  id: 'm15-l7',
  title: 'SPI Communication Protocol',
  module: 15,
  lessonNumber: 7,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# SPI Communication Protocol

## What is SPI?

**Serial Peripheral Interface (SPI)** is a synchronous, full-duplex serial protocol used between an MCU (master) and peripherals (slaves): SD cards, displays, sensors, ADCs.

---

## SPI Signals

| Signal | Direction | Purpose |
|---|---|---|
| **SCLK** | Master → Slave | Clock |
| **MOSI** | Master → Slave | Master Out Slave In (data) |
| **MISO** | Slave → Master | Master In Slave Out (data) |
| **CS/SS** | Master → Slave | Chip Select (active LOW) |

Each slave has its own CS line. To talk to a slave, pull CS LOW.

---

## SPI Transaction

\`\`\`
CS  ‾‾‾‾|_________________________|‾‾‾‾
SCLK     _‾_‾_‾_‾_‾_‾_‾_‾
MOSI     [D7][D6][D5][D4][D3][D2][D1][D0]
MISO     [R7][R6][R5][R4][R3][R2][R1][R0]
\`\`\`

Data is shifted out on MOSI and shifted in on MISO simultaneously, one bit per clock edge.

---

## SPI Modes (Clock Polarity + Phase)

| Mode | CPOL | CPHA | Clock idle | Sample on |
|---|---|---|---|---|
| 0 | 0 | 0 | Low | Rising edge |
| 1 | 0 | 1 | Low | Falling edge |
| 2 | 1 | 0 | High | Falling edge |
| 3 | 1 | 1 | High | Rising edge |

Check your peripheral's datasheet for the required mode.

---

## Bit-Bang SPI in C

\`\`\`c
#include <stdio.h>

// Simulated pin state
static int miso_line = 0;

void cs_low(void)  { /* pull CS low  */ }
void cs_high(void) { /* pull CS high */ }
void sclk_set(int v) { /* set clock */ }
void mosi_set(int v) { /* set data  */ }
int  miso_get(void)  { return miso_line; }

uint8_t spi_transfer(uint8_t tx) {
    uint8_t rx = 0;
    for (int bit = 7; bit >= 0; bit--) {
        mosi_set((tx >> bit) & 1);   // put bit on MOSI
        sclk_set(1);                  // rising edge — slave samples
        rx = (rx << 1) | miso_get(); // read MISO
        sclk_set(0);                  // falling edge
    }
    return rx;
}
\`\`\`

---

## SPI vs I2C vs UART

| | SPI | I2C | UART |
|---|---|---|---|
| Wires | 4 | 2 | 2 |
| Speed | Fastest (MHz) | Medium (100k–1MHz) | Slow (baud) |
| Slaves | Many (one CS each) | 127 (addressed) | Point-to-point |
| Full-duplex | Yes | No | Yes |

---

## Key Points

- SPI is the fastest common serial bus — used for SD cards, displays, fast ADCs.
- 4 wires: SCLK, MOSI, MISO, CS.
- Each slave needs its own CS line.
- Mode (CPOL/CPHA) must match the slave device's datasheet.
`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

// Simulate SPI: MISO returns the bitwise complement of MOSI byte
// (pretend slave echoes back ~tx)

static uint8_t fake_miso_byte = 0;

uint8_t spi_transfer(uint8_t tx) {
    // Simulate: for each bit sent on MOSI, read complemented bit on MISO
    // Return the received byte
    // TODO: implement bit-bang loop (MSB first)
    return 0;
}

int main() {
    fake_miso_byte = ~0xA5;   // slave will return complement of 0xA5

    // Set MISO source for simulation
    uint8_t result = spi_transfer(0xA5);
    printf("0x%02X\\n", result);   // should print 0x5A

    fake_miso_byte = ~0xFF;
    result = spi_transfer(0xFF);
    printf("0x%02X\\n", result);   // should print 0x00

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

static uint8_t fake_miso_byte = 0;

uint8_t spi_transfer(uint8_t tx) {
    uint8_t rx = 0;
    for (int bit = 7; bit >= 0; bit--) {
        int mosi_bit = (tx >> bit) & 1;
        int miso_bit = (fake_miso_byte >> bit) & 1;
        rx = (rx << 1) | miso_bit;
    }
    return rx;
}

int main() {
    fake_miso_byte = ~0xA5;
    uint8_t result = spi_transfer(0xA5);
    printf("0x%02X\\n", result);

    fake_miso_byte = ~0xFF;
    result = spi_transfer(0xFF);
    printf("0x%02X\\n", result);

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '0x5A\n0x00',
      description: '~0xA5 = 0x5A; ~0xFF = 0x00',
    },
  ],
  hints: [
    'Loop from bit 7 down to 0 (MSB first). Extract each bit with `(tx >> bit) & 1`.',
    'Build the received byte with `rx = (rx << 1) | miso_bit` — shift left and OR in the new bit.',
    '~0xA5 = 0x5A (all bits flipped); ~0xFF = 0x00.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Always 8 clock cycles per byte transfer' },
  tags: ['embedded-c', 'spi', 'protocols', 'serial', 'bit-bang', 'communication'],
};
export default lesson;
