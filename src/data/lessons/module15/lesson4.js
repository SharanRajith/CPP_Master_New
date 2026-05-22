// src/data/lessons/module15/lesson4.js
const lesson = {
  id: 'm15-l4',
  title: 'Interrupt-Driven Programming',
  module: 15,
  lessonNumber: 4,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Interrupt-Driven Programming

## Polling vs Interrupts

There are two ways to respond to external events in an MCU:

### Polling (busy-wait)
\`\`\`c
while (1) {
    if (PIND & (1 << 2)) {   /* check button every loop */
        handle_button();
    }
    /* Can't do anything else while checking */
}
\`\`\`

The CPU is stuck checking constantly. 99% of its time is wasted, and you still miss events that happen between checks.

### Interrupts
\`\`\`
CPU runs main loop
      |
      |    [Hardware event: timer fires, UART byte arrives, button pressed]
      |          |
      +-------> [CPU saves state, jumps to ISR]
                     |
                [ISR runs (microseconds)]
                     |
              [CPU restores state, resumes main loop]
\`\`\`

The CPU does useful work in the main loop. The hardware **interrupts** it when something important happens.

## ISR (Interrupt Service Routine)

Rules for writing good ISRs:
1. **Keep it short** — do minimal work (set a flag, push to buffer)
2. **No printf/malloc** — these are not ISR-safe
3. **Use volatile flags** — share data with main loop safely
4. **Disable same-priority interrupts** if needed (critical section)

\`\`\`c
volatile uint8_t timer_flag = 0;

/* This function represents what the MCU's interrupt hardware calls */
void TIMER_IRQHandler(void) {
    timer_flag = 1;   /* set flag, return immediately */
}
\`\`\`

## The Volatile Flag Pattern

The most important embedded idiom:

\`\`\`c
volatile uint8_t timer_flag = 0;

/* Main loop */
while (1) {
    if (timer_flag) {
        timer_flag = 0;     /* clear flag FIRST */
        do_periodic_work(); /* then do work */
    }
    /* CPU free to do other things here */
}
\`\`\`

Why \`volatile\`? The compiler sees that \`timer_flag\` is never written in the main loop and might "optimise" \`if (timer_flag)\` to \`if (0)\`. The \`volatile\` keyword prevents this.

## Critical Sections

If the ISR and main loop both access shared data (not just a single flag), you need to disable interrupts temporarily:

\`\`\`c
/* On AVR: */
/* cli();          disable global interrupts */
/* shared_data++;  read-modify-write (atomic) */
/* sei();          re-enable interrupts       */

/* On ARM Cortex-M: */
/* __disable_irq(); */
/* shared_data++;   */
/* __enable_irq();  */
\`\`\`

In this simulation we just use sequential function calls.

## Simulation Model

We cannot simulate real hardware interrupts in standard C, but we can demonstrate the pattern:

\`\`\`c
volatile uint8_t flag = 0;
int handled = 0;

void simulate_isr(void) { flag = 1; }   /* hardware would call this */

void main_loop_iteration(void) {
    if (flag) {
        flag = 0;
        handled++;
        printf("Interrupt %d handled\\n", handled);
    }
}

int main() {
    int i;
    for (i = 0; i < 3; i++) {
        simulate_isr();          /* hardware fires interrupt */
        main_loop_iteration();   /* main loop checks flag */
    }
    return 0;
}
\`\`\``,
  starterCode: `#include <stdio.h>
#include <stdint.h>

volatile uint8_t timer_flag = 0;
int interrupt_count = 0;

/* Simulates what hardware would call asynchronously */
void simulate_isr(void) {
    timer_flag = 1;
}

int main() {
    int i;
    for (i = 0; i < 3; i++) {
        simulate_isr();

        /* TODO: Check timer_flag */
        /* TODO: If set, clear it, increment interrupt_count */
        /* TODO: Print "Interrupt X handled" where X = interrupt_count */
    }
    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

volatile uint8_t timer_flag = 0;
int interrupt_count = 0;

void simulate_isr(void) {
    timer_flag = 1;
}

int main() {
    int i;
    for (i = 0; i < 3; i++) {
        simulate_isr();

        if (timer_flag) {
            timer_flag = 0;
            interrupt_count++;
            printf("Interrupt %d handled\\n", interrupt_count);
        }
    }
    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: 'Interrupt 1 handled\nInterrupt 2 handled\nInterrupt 3 handled',
      description: 'Three simulated interrupts set and cleared via volatile flag, handler called each time.',
    },
  ],
  hints: [
    'After `simulate_isr()`, check `if (timer_flag)` — the ISR set it to 1.',
    'Inside the if: clear the flag first `timer_flag = 0;` then do the work (increment counter, print).',
    'Use `printf("Interrupt %d handled\\n", interrupt_count);` — the count increments 1, 2, 3 over the three iterations.',
  ],
  complexity: { time: 'O(n)', space: 'O(1)', notes: 'n = number of interrupts handled; single flag variable.' },
  tags: ['embedded-c', 'interrupts', 'isr', 'volatile', 'polling', 'rtos'],
};
export default lesson;
