const lesson = {
  id: 'm14-l8',
  title: 'Timer & Counter Peripherals',
  module: 14,
  lessonNumber: 8,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Timer & Counter Peripherals

## What is a Timer?

A **timer** is a hardware counter that increments (or decrements) on each clock tick. When it reaches a compare value or overflows, it triggers an interrupt or output event — with zero CPU involvement.

---

## Timer Registers (Generic Model)

\`\`\`
TIMx_CNT   — Current counter value
TIMx_ARR   — Auto-Reload Register (period)
TIMx_PSC   — Prescaler (divides clock frequency)
TIMx_SR    — Status Register (flags)
TIMx_DIER  — Interrupt Enable Register
\`\`\`

The timer increments at:
\`\`\`
f_timer = f_clock / (PSC + 1)
\`\`\`

It overflows and restarts at \`ARR\`. Overflow period:
\`\`\`
T_period = (ARR + 1) / f_timer
\`\`\`

---

## Example: 1-Second Tick

If \`f_clock = 72 MHz\`:

\`\`\`c
PSC = 7199;     // f_timer = 72MHz / 7200 = 10 kHz
ARR = 9999;     // T_period = 10000 / 10kHz = 1 second
\`\`\`

---

## Timer Modes

| Mode | Use case |
|---|---|
| Up-counting | Basic delay, periodic interrupt |
| Down-counting | Watchdog-style deadlines |
| Center-aligned (up/down) | PWM with symmetric dead-time |
| Input capture | Measure pulse width / frequency |
| Output compare | Generate precise output pulses |

---

## Simulating a Timer in C

\`\`\`c
#include <stdio.h>

typedef struct {
    unsigned int cnt;
    unsigned int arr;
    unsigned int psc;
    unsigned int psc_cnt;
    int          overflow_flag;
} Timer_t;

void timer_init(Timer_t *t, unsigned int arr, unsigned int psc) {
    t->cnt = 0; t->arr = arr; t->psc = psc;
    t->psc_cnt = 0; t->overflow_flag = 0;
}

void timer_tick(Timer_t *t) {
    t->psc_cnt++;
    if (t->psc_cnt > t->psc) {
        t->psc_cnt = 0;
        t->cnt++;
        if (t->cnt > t->arr) {
            t->cnt = 0;
            t->overflow_flag = 1;
        }
    }
}
\`\`\`

---

## Key Points

- Timers free the CPU — hardware counts independently.
- PSC divides the clock; ARR sets the period.
- Overflow flag → trigger interrupt handler.
- Used for: delays, PWM, UART baud generation, watchdogs, input capture.
`,
  starterCode: `#include <stdio.h>

typedef struct {
    unsigned int cnt;
    unsigned int arr;
    unsigned int psc;
    unsigned int psc_cnt;
    int          overflow_flag;
} Timer_t;

void timer_init(Timer_t *t, unsigned int arr, unsigned int psc) {
    t->cnt = 0; t->arr = arr; t->psc = psc;
    t->psc_cnt = 0; t->overflow_flag = 0;
}

void timer_tick(Timer_t *t) {
    t->psc_cnt++;
    if (t->psc_cnt > t->psc) {
        t->psc_cnt = 0;
        t->cnt++;
        if (t->cnt > t->arr) {
            t->cnt = 0;
            t->overflow_flag = 1;
        }
    }
}

int main() {
    Timer_t tim;
    // ARR=3, PSC=1 -> overflows every (3+1)*(1+1)=8 ticks
    timer_init(&tim, 3, 1);

    int overflows = 0;
    // TODO: tick the timer 24 times
    // Each time overflow_flag is set, increment overflows and clear the flag
    // Print the number of overflows at the end

    return 0;
}`,
  modelAnswer: `#include <stdio.h>

typedef struct {
    unsigned int cnt;
    unsigned int arr;
    unsigned int psc;
    unsigned int psc_cnt;
    int          overflow_flag;
} Timer_t;

void timer_init(Timer_t *t, unsigned int arr, unsigned int psc) {
    t->cnt = 0; t->arr = arr; t->psc = psc;
    t->psc_cnt = 0; t->overflow_flag = 0;
}

void timer_tick(Timer_t *t) {
    t->psc_cnt++;
    if (t->psc_cnt > t->psc) {
        t->psc_cnt = 0;
        t->cnt++;
        if (t->cnt > t->arr) {
            t->cnt = 0;
            t->overflow_flag = 1;
        }
    }
}

int main() {
    Timer_t tim;
    timer_init(&tim, 3, 1);

    int overflows = 0;
    for (int i = 0; i < 24; i++) {
        timer_tick(&tim);
        if (tim.overflow_flag) {
            overflows++;
            tim.overflow_flag = 0;
        }
    }
    printf("%d\\n", overflows);
    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: '3',
      description: 'ARR=3 PSC=1: overflow every 8 ticks; 24 ticks → 3 overflows',
    },
  ],
  hints: [
    'Call `timer_tick(&tim)` inside a loop 24 times.',
    'After each tick, check `if (tim.overflow_flag)` — if set, increment overflows and clear the flag with `tim.overflow_flag = 0`.',
    'With ARR=3 and PSC=1, each overflow takes (3+1)*(1+1)=8 ticks. 24/8 = 3 overflows.',
  ],
  complexity: { time: 'O(n)', space: 'O(1)', notes: 'n = number of ticks simulated' },
  tags: ['embedded-c', 'timers', 'peripherals', 'hardware', 'interrupt'],
};
export default lesson;
