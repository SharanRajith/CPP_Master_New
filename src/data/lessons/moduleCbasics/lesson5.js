const lesson = {
  id: 'mcb-l5',
  title: 'Structs & Memory in C',
  module: 'C Basics for Embedded',
  type: 'theory',
  xpReward: 10,
  content: `
## Structs & Memory in C

Structs are C's way of grouping related data. In embedded systems they're used everywhere — sensor readings, protocol packets, device configurations, and register maps all use structs.

---

### Defining a Struct

\`\`\`c
struct Sensor {
    char  name[16];
    float value;
    int   pin;
    int   active;
};
\`\`\`

---

### Using typedef (common embedded pattern)

\`\`\`c
typedef struct {
    float voltage;
    float current;
    float temperature;
    int   status;
} PowerModule_t;

// Now use it without the 'struct' keyword
PowerModule_t psu;
psu.voltage     = 12.0f;
psu.current     = 1.5f;
psu.temperature = 45.2f;
psu.status      = 1;

printf("Voltage: %.1fV\\n", psu.voltage);
\`\`\`

The \`_t\` suffix is a naming convention from \`<stdint.h>\` — most embedded codebases follow it.

---

### Struct Initialization

\`\`\`c
typedef struct {
    int   id;
    float reading;
    char  unit[8];
} ADC_Channel_t;

ADC_Channel_t ch0 = { .id = 0, .reading = 3.3f, .unit = "V" };
ADC_Channel_t ch1 = { 1, 1.65f, "V" };   // positional init
\`\`\`

---

### Pointer to Struct

\`\`\`c
typedef struct {
    unsigned char r, g, b;
} RGB_t;

RGB_t led = { 255, 128, 0 };
RGB_t *p  = &led;

// Two ways to access members via pointer:
printf("R: %d\\n", (*p).r);   // dereference then access
printf("G: %d\\n", p->g);     // arrow operator (shorthand, preferred)
printf("B: %d\\n", p->b);
\`\`\`

The **arrow operator \`->\`** is used almost exclusively in embedded C for struct pointers.

---

### Structs as Packet Descriptors

\`\`\`c
typedef struct {
    unsigned char  start_byte;   // 0xAA
    unsigned char  device_id;
    unsigned short payload_len;
    unsigned char  data[64];
    unsigned char  checksum;
} UART_Packet_t;

UART_Packet_t rx_packet;
// Fill from received bytes...
rx_packet.start_byte = 0xAA;
rx_packet.device_id  = 0x01;
\`\`\`

---

### Memory Layout: Stack vs Data Segment

\`\`\`c
// Stack — fast, auto freed, limited size (~1–8 KB on MCU)
void foo(void) {
    int local_var = 10;          // on stack
    char buffer[64];             // on stack — 64 bytes!
}

// Data segment — persists for program lifetime
int  global_count = 0;           // initialized data (.data)
int  uninitialized;              // zero-initialized (.bss)
const int LIMIT = 100;           // read-only (.rodata / Flash)
\`\`\`

> ⚠️ On a microcontroller with 2KB RAM, a 64-byte local array is 3% of your total memory. Stack overflow = undefined behavior (often a crash or wrong values with no error message).

---

### sizeof — Know Your Memory

\`\`\`c
printf("char:   %lu bytes\\n", sizeof(char));     // 1
printf("int:    %lu bytes\\n", sizeof(int));      // 4 (on 32-bit)
printf("float:  %lu bytes\\n", sizeof(float));    // 4
printf("double: %lu bytes\\n", sizeof(double));   // 8

typedef struct {
    char  a;    // 1 byte
    int   b;    // 4 bytes — but struct may be padded to 8 bytes!
} Example_t;

printf("struct: %lu bytes\\n", sizeof(Example_t));  // likely 8 due to padding
\`\`\`

---

### Struct Padding & __attribute__((packed))

The compiler adds padding for alignment. In embedded (e.g. parsing raw packets), you often need packed structs:

\`\`\`c
typedef struct __attribute__((packed)) {
    unsigned char  id;       // 1 byte
    unsigned short length;   // 2 bytes
    unsigned int   address;  // 4 bytes
} RegMap_t;                  // exactly 7 bytes, no padding
\`\`\`

---

### Enums for State & Config

\`\`\`c
typedef enum {
    STATE_IDLE,       // 0
    STATE_RUNNING,    // 1
    STATE_ERROR,      // 2
    STATE_SHUTDOWN,   // 3
} SystemState_t;

SystemState_t state = STATE_IDLE;

if (state == STATE_IDLE) {
    printf("System idle\\n");
}
\`\`\`

Enums give names to integer constants — essential for readable state machines.

---

### Key Takeaway

Structs + enums + typedefs are the backbone of embedded C architecture. When you see a struct pointer with \`->\` in a driver, you now know exactly what's happening. The next modules build directly on this.
`,
};

export default lesson;
