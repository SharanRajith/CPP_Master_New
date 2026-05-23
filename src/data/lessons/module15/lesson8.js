const lesson = {
  id: 'm15-l8',
  title: 'I2C Communication Protocol',
  module: 15,
  lessonNumber: 8,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# I2C Communication Protocol

## What is I2C?

**Inter-Integrated Circuit (I2C)** is a two-wire synchronous serial protocol. Multiple masters and up to 127 slaves share the same two lines. Used for sensors, EEPROMs, RTCs, and displays.

---

## I2C Signals

| Signal | Purpose |
|---|---|
| **SDA** | Serial Data (bidirectional, open-drain) |
| **SCL** | Serial Clock (master drives) |

Both lines are pulled HIGH by resistors. Devices pull LOW to signal; releasing lets the resistor pull HIGH.

---

## I2C Transaction Structure

\`\`\`
START  [ADDR 7-bit] [R/W] [ACK]  [DATA] [ACK]  ... STOP
\`\`\`

1. **START**: SDA falls while SCL is HIGH
2. **Address**: 7-bit slave address + R/W bit
3. **ACK**: slave pulls SDA LOW to acknowledge
4. **Data bytes**: sent with ACK after each
5. **STOP**: SDA rises while SCL is HIGH

---

## I2C vs SPI

| | I2C | SPI |
|---|---|---|
| Wires | 2 | 4 |
| Speed | 100kHz–1MHz | 10MHz+ |
| Slaves | 127 (addressed) | Many (one CS each) |
| Full-duplex | No | Yes |
| Complexity | Higher (ACK, addr) | Lower |

---

## Simulating I2C Write

\`\`\`c
#include <stdio.h>
#include <stdint.h>

#define I2C_ACK  0
#define I2C_NACK 1

// Simulated device register map (address 0x68 = MPU-6050)
static uint8_t device_regs[256] = {0};
static uint8_t device_addr      = 0x68;

int i2c_write(uint8_t addr, uint8_t reg, uint8_t data) {
    if (addr != device_addr) return I2C_NACK;
    device_regs[reg] = data;
    printf("WRITE reg[0x%02X] = 0x%02X\\n", reg, data);
    return I2C_ACK;
}

int i2c_read(uint8_t addr, uint8_t reg, uint8_t *data) {
    if (addr != device_addr) return I2C_NACK;
    *data = device_regs[reg];
    printf("READ  reg[0x%02X] = 0x%02X\\n", reg, *data);
    return I2C_ACK;
}
\`\`\`

---

## Key Points

- Only 2 wires for many devices — saves GPIO pins.
- Each slave has a unique 7-bit address hardwired or configurable.
- ACK/NACK handshake confirms each byte was received.
- Open-drain: multiple devices can pull LOW safely; resistors pull HIGH.
- Slower than SPI — suitable for configuration registers and slow sensors (not streaming ADCs).
`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

#define I2C_ACK  0
#define I2C_NACK 1

static uint8_t device_regs[256] = {0};
static uint8_t device_addr      = 0x68;

int i2c_write(uint8_t addr, uint8_t reg, uint8_t data) {
    if (addr != device_addr) return I2C_NACK;
    device_regs[reg] = data;
    return I2C_ACK;
}

int i2c_read(uint8_t addr, uint8_t reg, uint8_t *out) {
    if (addr != device_addr) return I2C_NACK;
    *out = device_regs[reg];
    return I2C_ACK;
}

int main() {
    // TODO:
    // 1. Write 0x01 to register 0x10 on device 0x68
    // 2. Write 0xFF to register 0x20 on device 0x68
    // 3. Read register 0x10 and print "REG10=0xXX"
    // 4. Read register 0x20 and print "REG20=0xXX"
    // 5. Try writing to wrong address 0x55 and print "NACK" if it fails

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

#define I2C_ACK  0
#define I2C_NACK 1

static uint8_t device_regs[256] = {0};
static uint8_t device_addr      = 0x68;

int i2c_write(uint8_t addr, uint8_t reg, uint8_t data) {
    if (addr != device_addr) return I2C_NACK;
    device_regs[reg] = data;
    return I2C_ACK;
}

int i2c_read(uint8_t addr, uint8_t reg, uint8_t *out) {
    if (addr != device_addr) return I2C_NACK;
    *out = device_regs[reg];
    return I2C_ACK;
}

int main() {
    i2c_write(0x68, 0x10, 0x01);
    i2c_write(0x68, 0x20, 0xFF);

    uint8_t val;
    i2c_read(0x68, 0x10, &val);
    printf("REG10=0x%02X\\n", val);

    i2c_read(0x68, 0x20, &val);
    printf("REG20=0x%02X\\n", val);

    int ack = i2c_write(0x55, 0x10, 0x00);
    if (ack == I2C_NACK) printf("NACK\\n");

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: 'REG10=0x01\nREG20=0xFF\nNACK',
      description: 'Write then read two registers; wrong-address write returns NACK',
    },
  ],
  hints: [
    'Call `i2c_write(0x68, 0x10, 0x01)` and `i2c_write(0x68, 0x20, 0xFF)` first to populate the registers.',
    'Call `i2c_read(0x68, 0x10, &val)` then print `"REG10=0x%02X"` using val. Repeat for 0x20.',
    'A write to address 0x55 returns `I2C_NACK` — check `if (ack == I2C_NACK)` and print "NACK".',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Each I2C transaction is O(1) bytes' },
  tags: ['embedded-c', 'i2c', 'protocols', 'serial', 'communication', 'sensors'],
};
export default lesson;
