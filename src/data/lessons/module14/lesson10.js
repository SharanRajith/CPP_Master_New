const lesson = {
  id: 'm14-l10',
  title: 'Interrupt Service Routines (ISR)',
  module: 14,
  lessonNumber: 10,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Interrupt Service Routines (ISR)

## What is an Interrupt?

An **interrupt** is a hardware signal that pauses the main program, runs a special handler (ISR), then returns. This lets you react to events (button press, UART byte received, timer overflow) without polling.

---

## Interrupt vs Polling

| | Polling | Interrupt |
|---|---|---|
| CPU usage | Wastes cycles checking | Only runs on event |
| Latency | Depends on poll loop | Near-instant |
| Complexity | Simple | Requires ISR design |
| Power | Higher | Lower (CPU can sleep) |

---

## ISR Rules

1. **Keep ISRs short** — do minimal work; set a flag, copy data, then return
2. **No blocking calls** — no printf, malloc, or long loops inside an ISR
3. **volatile flags** — variables shared between ISR and main must be \`volatile\`
4. **Atomic access** — multi-byte reads of shared data must be protected

\`\`\`c
volatile int button_pressed = 0;   // shared between ISR and main

// ISR — called by hardware on button press
void EXTI0_IRQHandler(void) {
    button_pressed = 1;            // set flag only
    EXTI->PR = EXTI_PR_PR0;       // clear pending bit
}

int main(void) {
    // ... init ...
    while (1) {
        if (button_pressed) {
            button_pressed = 0;
            handle_button();       // do the work here, not in ISR
        }
    }
}
\`\`\`

---

## Interrupt Priority

MCUs have priority levels — lower number = higher priority. A higher-priority ISR can interrupt a lower-priority one (preemption).

\`\`\`c
NVIC_SetPriority(TIM2_IRQn, 0);    // highest priority
NVIC_SetPriority(USART1_IRQn, 3);  // lower priority
NVIC_EnableIRQ(TIM2_IRQn);
\`\`\`

---

## Simulating ISR Pattern in C

\`\`\`c
#include <stdio.h>

volatile int timer_flag = 0;
volatile int uart_flag  = 0;

void simulate_timer_isr(void) { timer_flag = 1; }
void simulate_uart_isr(void)  { uart_flag  = 1; }

void main_loop(int cycles) {
    for (int i = 0; i < cycles; i++) {
        if (i % 5 == 0) simulate_timer_isr();
        if (i % 7 == 0) simulate_uart_isr();

        if (timer_flag) { timer_flag = 0; printf("TIMER\\n"); }
        if (uart_flag)  { uart_flag  = 0; printf("UART\\n");  }
    }
}
\`\`\`

---

## Key Points

- ISR = short handler; main loop = where work happens.
- \`volatile\` is mandatory on variables shared between ISR and main.
- Never call blocking functions inside an ISR.
- Priorities control which ISR can preempt another.
`,
  starterCode: `#include <stdio.h>

volatile int timer_ticks = 0;
volatile int byte_received = 0;

void on_timer_isr(void)  { timer_ticks++;    }
void on_uart_isr(void)   { byte_received = 1; }

// Simulate: run 20 cycles
// Timer fires every 4 cycles (i % 4 == 0, i > 0)
// UART fires at cycle 6 and cycle 14
// In main loop:
//   - print "TICK N" when timer fires (N = timer_ticks at that moment)
//   - print "BYTE" when uart fires and clear byte_received
// TODO: implement main_loop and call it

void main_loop(int cycles) {
    // implement here
}

int main() {
    main_loop(20);
    return 0;
}`,
  modelAnswer: `#include <stdio.h>

volatile int timer_ticks  = 0;
volatile int byte_received = 0;

void on_timer_isr(void)  { timer_ticks++;     }
void on_uart_isr(void)   { byte_received = 1; }

void main_loop(int cycles) {
    for (int i = 1; i <= cycles; i++) {
        if (i % 4 == 0)          on_timer_isr();
        if (i == 6 || i == 14)   on_uart_isr();

        if (timer_ticks > 0) {
            printf("TICK %d\\n", timer_ticks);
        }
        if (byte_received) {
            byte_received = 0;
            printf("BYTE\\n");
        }
    }
}

int main() {
    main_loop(20);
    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: 'TICK 1\nTICK 2\nBYTE\nTICK 3\nBYTE\nTICK 4\nTICK 5',
      description: 'Timer fires at cycles 4,8,12,16,20; UART fires at 6 and 14',
    },
  ],
  hints: [
    'Timer fires when `i % 4 == 0` (cycles 4, 8, 12, 16, 20). UART fires when `i == 6 || i == 14`.',
    'Call `on_timer_isr()` and `on_uart_isr()` to simulate hardware interrupts, then check the volatile flags in the main loop.',
    'Print `timer_ticks` (cumulative count) on each timer event; clear `byte_received` after printing "BYTE".',
  ],
  complexity: { time: 'O(n)', space: 'O(1)', notes: 'n = number of simulated cycles' },
  tags: ['embedded-c', 'interrupts', 'isr', 'volatile', 'real-time', 'event-driven'],
};
export default lesson;
