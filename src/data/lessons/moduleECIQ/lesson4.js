const lesson = {
  id: 'meciq-l4',
  title: 'ISR Design — The 5 Golden Rules',
  module: 'ECIQ',
  lessonNumber: 4,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# ISR Design — The 5 Golden Rules

## Q: What is an ISR and how does it differ from a normal function?

An **Interrupt Service Routine (ISR)** is a function called automatically by hardware when an event occurs (UART byte received, timer expired, GPIO edge detected). It **preempts** your main code at any point.

Differences from a normal function:
- Called by hardware, not by your code
- Must execute fast — blocks all lower-priority interrupts
- Cannot return a value or accept parameters
- Often has a special attribute: \`__attribute__((interrupt))\` or \`ISR(TIMER1_vect)\`

## The 5 Golden Rules

**1. Keep it short — do minimal work**
\`\`\`c
/* BAD: long operation in ISR */
void UART_IRQHandler(void) {
    processEntirePacket();  /* May take milliseconds — blocks other ISRs! */
}

/* GOOD: set a flag, process in main loop */
volatile bool uartDataReady = false;
void UART_IRQHandler(void) {
    rxByte = UART1->DR;     /* Read hardware register immediately */
    uartDataReady = true;   /* Signal main loop */
}
\`\`\`

**2. Never call blocking functions**
- No \`printf\`, \`scanf\`, \`delay_ms\`, \`HAL_Delay\`
- No \`malloc\` / \`free\`
- No mutex lock (can deadlock if main holds the mutex)

**3. Always clear the interrupt flag**

If you don't clear the pending flag, the ISR fires again immediately on return — infinite loop:
\`\`\`c
void TIM2_IRQHandler(void) {
    TIM2->SR &= ~TIM_SR_UIF;  /* MUST clear Update Interrupt Flag first */
    /* Now handle the event */
}
\`\`\`

**4. Use volatile for shared variables**
\`\`\`c
volatile uint8_t rxBuf[64];
volatile uint8_t rxHead = 0;

void UART_IRQHandler(void) {
    rxBuf[rxHead++] = UART1->DR;  /* volatile ensures main() sees the update */
}
\`\`\`

**5. Keep ISR variables in scope (global or static)**

Local variables in an ISR are fine for temporaries, but state that must persist between ISR calls must be static or global.

## Deferred Processing Pattern

The professional pattern: ISR signals, main loop does the work.

\`\`\`c
volatile bool buttonPressed = false;

void EXTI0_IRQHandler(void) {        /* ISR: ~5 instructions */
    buttonPressed = true;
    EXTI->PR = EXTI_PR_PR0;         /* Clear flag */
}

int main(void) {
    while (1) {
        if (buttonPressed) {
            buttonPressed = false;
            handleButtonPress();     /* Heavy work here, not in ISR */
        }
        /* other tasks... */
    }
}
\`\`\`

## Q: What is interrupt latency?

The time from hardware event → first ISR instruction executes. On ARM Cortex-M: **~12 clock cycles** (register stacking). Keeping ISRs short minimizes the latency seen by other ISRs.`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

/* Simulate the deferred processing pattern */
volatile int eventFlag = 0;

/* Simulate ISR being called */
void simulateISR(void) {
    /* TODO: set eventFlag to 1 (as an ISR would) */
}

int main() {
    simulateISR();

    /* TODO: check eventFlag and if set, clear it and print "Event handled" */

    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

volatile int eventFlag = 0;

void simulateISR(void) {
    eventFlag = 1;
}

int main() {
    simulateISR();
    if (eventFlag) {
        eventFlag = 0;
        printf("Event handled\\n");
    }
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: 'Event handled', description: 'ISR sets flag; main loop detects and handles it.' },
  ],
  hints: [
    'In simulateISR, set eventFlag = 1.',
    'In main, check if (eventFlag), then clear it and print.',
    'This is the deferred processing pattern used in real embedded firmware.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Constant-time flag check.' },
  tags: ['embedded-c', 'ISR', 'interrupt', 'deferred-processing', 'interview'],
};
export default lesson;
