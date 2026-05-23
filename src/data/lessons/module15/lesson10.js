const lesson = {
  id: 'm15-l10',
  title: 'Bootloader Basics',
  module: 15,
  lessonNumber: 10,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Bootloader Basics

## What is a Bootloader?

A **bootloader** is a small program that runs before the main application. It starts on every power-up or reset and decides what to execute next. It can:

- Load and verify the application firmware
- Accept firmware updates over UART, USB, CAN, or Ethernet
- Perform integrity checks (CRC, hash)
- Fall back to a safe mode if the application is corrupted

---

## Boot Sequence on an MCU

\`\`\`
Power ON / Reset
    │
    ▼
Reset Vector → Bootloader starts
    │
    ├─ Update requested? (pin, flag, timeout)
    │       │
    │       └─ YES → Enter DFU mode (receive new firmware via UART/USB)
    │
    └─ NO → Verify application CRC
                │
                ├─ CRC OK → Jump to application
                └─ CRC FAIL → Stay in bootloader (error LED / wait)
\`\`\`

---

## Flash Memory Layout

\`\`\`
0x08000000  ┌──────────────────┐
            │   Bootloader     │  16KB – 32KB
0x08008000  ├──────────────────┤
            │   Application    │  rest of flash
            │   (user firmware)│
0x0807FFFF  └──────────────────┘
\`\`\`

The bootloader occupies the first flash sector. The application starts at a known offset.

---

## Jumping to Application in C

\`\`\`c
typedef void (*AppEntry)(void);

void jump_to_app(uint32_t app_addr) {
    // Read the stack pointer and reset handler from app vector table
    uint32_t app_sp    = *(volatile uint32_t *)(app_addr);
    uint32_t app_entry = *(volatile uint32_t *)(app_addr + 4);

    // Set stack pointer
    __set_MSP(app_sp);

    // Jump to app reset handler
    AppEntry app = (AppEntry)app_entry;
    app();
}
\`\`\`

---

## CRC Verification

\`\`\`c
uint32_t crc32(const uint8_t *data, size_t len) {
    uint32_t crc = 0xFFFFFFFF;
    for (size_t i = 0; i < len; i++) {
        crc ^= data[i];
        for (int j = 0; j < 8; j++)
            crc = (crc >> 1) ^ (0xEDB88320 & -(crc & 1));
    }
    return ~crc;
}

int verify_firmware(const uint8_t *fw, size_t len, uint32_t expected_crc) {
    return crc32(fw, len) == expected_crc;
}
\`\`\`

---

## Update Trigger Methods

| Method | How it works |
|---|---|
| GPIO pin | Hold a button during reset → enter DFU |
| Magic flag | App writes a flag to RAM; bootloader checks it |
| Timeout | Bootloader waits 3s for update command before jumping |
| Always check | Bootloader always looks for update packet first |

---

## Key Points

- Bootloader = tiny program that runs before your app, enables field updates.
- Flash is divided: bootloader in sector 0, application starts at a fixed offset.
- Always verify firmware with CRC before jumping.
- A corrupt bootloader = bricked device — test it thoroughly.
`,
  starterCode: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

// Simulate CRC8 (simple version for practice)
uint8_t crc8(const uint8_t *data, int len) {
    uint8_t crc = 0xFF;
    for (int i = 0; i < len; i++) {
        crc ^= data[i];
        for (int j = 0; j < 8; j++)
            crc = (crc & 0x80) ? (crc << 1) ^ 0x07 : (crc << 1);
    }
    return crc;
}

// Simulate bootloader decision:
// If update_pin is 1 OR firmware CRC doesn't match -> print "BOOTLOADER"
// Otherwise -> print "APP"

int bootloader(int update_pin, const uint8_t *fw, int fw_len, uint8_t expected_crc) {
    // TODO: implement
    return 0;
}

int main() {
    uint8_t firmware[] = {0x01, 0x02, 0x03, 0x04};
    uint8_t good_crc = crc8(firmware, 4);

    bootloader(0, firmware, 4, good_crc);       // should print APP
    bootloader(1, firmware, 4, good_crc);       // should print BOOTLOADER
    bootloader(0, firmware, 4, good_crc ^ 0xFF); // should print BOOTLOADER

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

uint8_t crc8(const uint8_t *data, int len) {
    uint8_t crc = 0xFF;
    for (int i = 0; i < len; i++) {
        crc ^= data[i];
        for (int j = 0; j < 8; j++)
            crc = (crc & 0x80) ? (crc << 1) ^ 0x07 : (crc << 1);
    }
    return crc;
}

int bootloader(int update_pin, const uint8_t *fw, int fw_len, uint8_t expected_crc) {
    uint8_t actual_crc = crc8(fw, fw_len);
    if (update_pin || actual_crc != expected_crc) {
        printf("BOOTLOADER\\n");
        return 0;
    }
    printf("APP\\n");
    return 1;
}

int main() {
    uint8_t firmware[] = {0x01, 0x02, 0x03, 0x04};
    uint8_t good_crc = crc8(firmware, 4);

    bootloader(0, firmware, 4, good_crc);
    bootloader(1, firmware, 4, good_crc);
    bootloader(0, firmware, 4, good_crc ^ 0xFF);

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: 'APP\nBOOTLOADER\nBOOTLOADER',
      description: 'Good CRC + no update pin → APP; update pin set → BOOTLOADER; bad CRC → BOOTLOADER',
    },
  ],
  hints: [
    'Compute `uint8_t actual_crc = crc8(fw, fw_len)` and compare with `expected_crc`.',
    'If `update_pin` is non-zero OR `actual_crc != expected_crc`, print "BOOTLOADER"; otherwise print "APP".',
    'Combine both conditions: `if (update_pin || actual_crc != expected_crc)`.',
  ],
  complexity: { time: 'O(n)', space: 'O(1)', notes: 'n = firmware size for CRC computation' },
  tags: ['embedded-c', 'bootloader', 'crc', 'firmware-update', 'flash', 'dfu'],
};
export default lesson;
