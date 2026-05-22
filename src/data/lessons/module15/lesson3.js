// src/data/lessons/module15/lesson3.js
const lesson = {
  id: 'm15-l3',
  title: 'UART — Serial Communication',
  module: 15,
  lessonNumber: 3,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# UART — Serial Communication

## What is UART?

UART (Universal Asynchronous Receiver-Transmitter) is the most common serial protocol in embedded systems. It is used for:

- **Debug logging** (printing from MCU to a PC terminal via USB-UART adapter)
- **GPS modules** (NMEA sentences at 9600 baud)
- **Bluetooth modules** (HC-05, HM-10)
- **GSM/LTE modems** (AT commands)

"Asynchronous" means there is no shared clock line — both sender and receiver must be configured to the same **baud rate** (bits per second).

## UART Frame Structure

Each byte is transmitted as a **frame**:

\`\`\`
  IDLE  START  D0  D1  D2  D3  D4  D5  D6  D7  STOP  IDLE
   1     0     b0  b1  b2  b3  b4  b5  b6  b7    1     1
                   <---- 8 data bits ---->
\`\`\`

- **Idle line**: Logic HIGH (1) when no data
- **Start bit**: Always 0 — signals "byte coming"
- **8 data bits**: LSB first (bit 0 sent first)
- **Stop bit**: Always 1 — signals "byte done"

### Common Baud Rates

| Baud Rate | Bits/sec | Use Case |
|---|---|---|
| 9600 | 9600 | GPS, legacy |
| 115200 | 115200 | Debug output |
| 1M | 1,000,000 | High-speed data |

## Error Detection: XOR Checksum

For simple reliability, add a checksum byte at the end of a packet:

\`\`\`
Packet: [DATA][DATA][DATA][CHECKSUM]
CHECKSUM = DATA[0] ^ DATA[1] ^ DATA[2]
\`\`\`

The receiver XORs all received data bytes and compares with the checksum byte. Any single-byte corruption is detected.

\`\`\`c
uint8_t compute_checksum(uint8_t *data, uint8_t len) {
    uint8_t chk = 0;
    uint8_t i;
    for (i = 0; i < len; i++) {
        chk ^= data[i];
    }
    return chk;
}
\`\`\`

## UART Simulation in C

We simulate UART by treating bytes as characters and computing the checksum:

\`\`\`c
uint8_t payload[2] = { 'H', 'I' };  /* 0x48, 0x49 */
/* Send: */
uart_send(payload[0]);   /* prints 'H' */
uart_send(payload[1]);   /* prints 'I' */

/* Checksum: 0x48 ^ 0x49 = 0x01 */
uint8_t chk = compute_checksum(payload, 2);
printf("%u\\n", chk);   /* prints 1 */
\`\`\`

## Bit-Level Frame Assembly (Concept)

On a real MCU, the UART peripheral handles framing in hardware. But understanding the bit level helps with debugging:

\`\`\`c
/* Transmit byte 0x48 ('H') = 0b01001000 */
/* Line: START(0) 0 0 0 1 0 0 1 0 STOP(1) */
/*                D0 D1 D2 D3 D4 D5 D6 D7         */
\`\`\`

The MCU UART peripheral has registers like:
- **UDR** (UART Data Register) — write byte to transmit
- **UCSRA** (Status Register) — bit 5 = TX buffer empty
- **UBRR** (Baud Rate Register) — sets baud rate from clock

\`\`\`c
/* Simplified transmit on AVR (concept): */
/* while (!(UCSRA & (1 << 5)));  wait for TX ready */
/* UDR = byte;                   send byte         */
\`\`\``,
  starterCode: `#include <stdio.h>
#include <stdint.h>

void uart_send_char(uint8_t byte) {
    printf("%c\\n", byte);
}

uint8_t compute_checksum(uint8_t *data, uint8_t len) {
    /* TODO: XOR all bytes together and return the result */
    return 0;
}

int main() {
    uint8_t payload[2] = { 0x48, 0x49 };  /* 'H', 'I' */

    uart_send_char(payload[0]);
    uart_send_char(payload[1]);

    uint8_t chk = compute_checksum(payload, 2);
    /* TODO: print chk as unsigned decimal */

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

void uart_send_char(uint8_t byte) {
    printf("%c\\n", byte);
}

uint8_t compute_checksum(uint8_t *data, uint8_t len) {
    uint8_t chk = 0;
    uint8_t i;
    for (i = 0; i < len; i++) {
        chk ^= data[i];
    }
    return chk;
}

int main() {
    uint8_t payload[2] = { 0x48, 0x49 };

    uart_send_char(payload[0]);
    uart_send_char(payload[1]);

    uint8_t chk = compute_checksum(payload, 2);
    printf("%u\\n", chk);

    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: 'H\nI\n1',
      description: 'Send 0x48=H and 0x49=I as characters, then XOR checksum 0x48^0x49=0x01=1.',
    },
  ],
  hints: [
    'In `compute_checksum`, initialise `uint8_t chk = 0;` then loop: `chk ^= data[i];` for each byte.',
    '0x48 XOR 0x49: binary 01001000 XOR 01001001 = 00000001 = 1.',
    'Print the checksum with `printf("%u\\n", chk);` not `%c` — we want the numeric value, not a character.',
  ],
  complexity: { time: 'O(n)', space: 'O(1)', notes: 'Checksum computation is O(n) in packet length; O(1) space.' },
  tags: ['embedded-c', 'uart', 'serial', 'checksum', 'xor', 'protocols'],
};
export default lesson;
