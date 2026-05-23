const lesson = {
  id: 'meciq-l5',
  title: 'Endianness — Detection, Swapping & Safe Casting',
  module: 'ECIQ',
  lessonNumber: 5,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Endianness — Detection, Swapping & Safe Casting

## Q: What is endianness?

Endianness describes the **byte order** used to store multi-byte values in memory.

For \`uint32_t x = 0x01020304\`:

\`\`\`
Address:     0x1000  0x1001  0x1002  0x1003
Little-Endian:  04      03      02      01    (LSB first — Intel, ARM default)
Big-Endian:     01      02      03      04    (MSB first — network byte order)
\`\`\`

**ARM Cortex-M** is little-endian by default. **Network protocols (TCP/IP)** use big-endian.

## Q: Write a function to detect endianness at runtime

\`\`\`c
int isLittleEndian(void) {
    uint16_t x = 0x0001;
    return *((uint8_t *)&x) == 0x01;
    /* On LE: byte at &x is 0x01 (the low byte)
       On BE: byte at &x is 0x00 (the high byte) */
}
\`\`\`

## Q: Write a 32-bit byte swap function

\`\`\`c
uint32_t byteSwap32(uint32_t val) {
    return ((val & 0xFF000000U) >> 24)
         | ((val & 0x00FF0000U) >>  8)
         | ((val & 0x0000FF00U) <<  8)
         | ((val & 0x000000FFU) << 24);
}

/* GCC/Clang built-in — compiles to a single BSWAP instruction on x86: */
uint32_t fast = __builtin_bswap32(val);
\`\`\`

## Network Byte Order Conversion

\`\`\`c
#include <arpa/inet.h>   /* Linux / POSIX */

uint32_t hostVal = 0x12345678;
uint32_t netVal  = htonl(hostVal);  /* host-to-network (big-endian) */
uint32_t back    = ntohl(netVal);   /* network-to-host */

/* htons / ntohs for 16-bit values */
\`\`\`

## Q: Why can't you just cast pointers to reinterpret bytes?

\`\`\`c
/* WRONG — violates strict aliasing rules, undefined behavior */
uint32_t x = 0x01020304;
uint8_t  first = *((uint8_t *)&x);  /* Technically UB in C99/C11 */

/* CORRECT — use memcpy to reinterpret bytes safely */
uint32_t x = 0x01020304;
uint8_t bytes[4];
memcpy(bytes, &x, 4);  /* Well-defined, compiler optimizes to register ops */
\`\`\`

## Q: Spot the endianness bug

\`\`\`c
/* Sensor sends 2 bytes MSB-first over UART: 0x03, 0xE8 = 1000 */
uint8_t raw[2] = {0x03, 0xE8};

/* BUG on little-endian system: */
uint16_t value = *(uint16_t *)raw;   /* Gets 0xE803 = 59395 — WRONG */

/* FIX: manual reconstruction */
uint16_t value = ((uint16_t)raw[0] << 8) | raw[1];  /* = 0x03E8 = 1000 ✓ */
\`\`\``,
  starterCode: `#include <stdio.h>
#include <stdint.h>

int isLittleEndian(void) {
    uint16_t x = 0x0001;
    return *((uint8_t *)&x) == 0x01;
}

uint32_t byteSwap32(uint32_t val) {
    /* TODO: implement byte swap */
    return 0;
}

int main() {
    printf("%d\\n", isLittleEndian());
    printf("0x%08X\\n", byteSwap32(0x01020304));
    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

int isLittleEndian(void) {
    uint16_t x = 0x0001;
    return *((uint8_t *)&x) == 0x01;
}

uint32_t byteSwap32(uint32_t val) {
    return ((val & 0xFF000000U) >> 24)
         | ((val & 0x00FF0000U) >>  8)
         | ((val & 0x0000FF00U) <<  8)
         | ((val & 0x000000FFU) << 24);
}

int main() {
    printf("%d\\n", isLittleEndian());
    printf("0x%08X\\n", byteSwap32(0x01020304));
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '1\n0x04030201', description: 'Little-endian system detected; bytes of 0x01020304 reversed to 0x04030201.' },
  ],
  hints: [
    'byteSwap32: shift byte 3 right by 24, byte 2 right by 8, byte 1 left by 8, byte 0 left by 24, then OR them together.',
    'Use masks: 0xFF000000U, 0x00FF0000U, 0x0000FF00U, 0x000000FFU.',
    'The output should be 0x04030201 — the bytes of 0x01020304 in reverse order.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Fixed number of bit operations.' },
  tags: ['embedded-c', 'endianness', 'byte-swap', 'network', 'interview'],
};
export default lesson;
