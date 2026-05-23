const lesson = {
  id: 'm15-l9',
  title: 'PWM Signal Generation',
  module: 15,
  lessonNumber: 9,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# PWM Signal Generation

## What is PWM?

**Pulse Width Modulation (PWM)** is a technique to simulate an analog output using a digital pin by rapidly switching it ON and OFF at a fixed frequency. The percentage of time the signal is HIGH is the **duty cycle**.

\`\`\`
Period = 1/frequency

100% duty:  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾  (always HIGH)
 50% duty:  ‾‾‾‾‾‾‾‾________  (half HIGH, half LOW)
 25% duty:  ‾‾‾‾____________  (quarter HIGH)
  0% duty:  ________________  (always LOW)
\`\`\`

---

## Key Formula

\`\`\`
Duty Cycle (%) = (ON time / Period) * 100
\`\`\`

Timer compare register (CCR):
\`\`\`
CCR = (duty_percent / 100.0) * (ARR + 1)
\`\`\`

---

## PWM Applications

| Application | Duty Cycle Effect |
|---|---|
| LED brightness | 0% = off, 100% = full brightness |
| DC motor speed | 0% = stopped, 100% = full speed |
| Servo position | 1ms pulse = 0°, 2ms pulse = 180° (at 50Hz) |
| Buzzer tone | Frequency controls pitch |

---

## Servo PWM

Servo motors use 50Hz PWM (20ms period):
- **1ms pulse** (5% duty) → 0°
- **1.5ms pulse** (7.5% duty) → 90°
- **2ms pulse** (10% duty) → 180°

\`\`\`c
float servo_duty(float angle_deg) {
    // Map 0°-180° to 1ms-2ms pulse within 20ms period
    float pulse_ms = 1.0f + (angle_deg / 180.0f) * 1.0f;
    return (pulse_ms / 20.0f) * 100.0f;   // duty cycle %
}
\`\`\`

---

## Simulating PWM in C

\`\`\`c
#include <stdio.h>

typedef struct {
    unsigned int arr;   // period - 1
    unsigned int ccr;   // compare value
    unsigned int cnt;   // current count
    int          out;   // output state
} PWM_t;

void pwm_init(PWM_t *p, unsigned int arr, float duty_pct) {
    p->arr = arr;
    p->ccr = (unsigned int)((duty_pct / 100.0f) * (arr + 1));
    p->cnt = 0;
    p->out = 1;
}

void pwm_tick(PWM_t *p) {
    p->cnt++;
    if (p->cnt > p->arr) p->cnt = 0;
    p->out = (p->cnt < p->ccr) ? 1 : 0;
}
\`\`\`

---

## Key Points

- PWM = fixed frequency, variable duty cycle.
- Duty cycle is set via the timer compare register (CCR).
- LED dimming, motor control, and servo positioning all use PWM.
- Servo requires precise 50Hz frequency with 1–2ms pulses.
`,
  starterCode: `#include <stdio.h>

typedef struct {
    unsigned int arr;
    unsigned int ccr;
    unsigned int cnt;
    int          out;
} PWM_t;

void pwm_init(PWM_t *p, unsigned int arr, float duty_pct) {
    p->arr = arr;
    p->ccr = (unsigned int)((duty_pct / 100.0f) * (arr + 1));
    p->cnt = 0;
    p->out = 1;
}

void pwm_tick(PWM_t *p) {
    p->cnt++;
    if (p->cnt > p->arr) p->cnt = 0;
    p->out = (p->cnt < p->ccr) ? 1 : 0;
}

int main() {
    PWM_t pwm;
    // ARR=9 (period=10 ticks), 30% duty => CCR=3
    pwm_init(&pwm, 9, 30.0f);

    // TODO: tick 10 times and count how many ticks output is HIGH
    // Print: "HIGH: N"

    return 0;
}`,
  modelAnswer: `#include <stdio.h>

typedef struct {
    unsigned int arr;
    unsigned int ccr;
    unsigned int cnt;
    int          out;
} PWM_t;

void pwm_init(PWM_t *p, unsigned int arr, float duty_pct) {
    p->arr = arr;
    p->ccr = (unsigned int)((duty_pct / 100.0f) * (arr + 1));
    p->cnt = 0;
    p->out = 1;
}

void pwm_tick(PWM_t *p) {
    p->cnt++;
    if (p->cnt > p->arr) p->cnt = 0;
    p->out = (p->cnt < p->ccr) ? 1 : 0;
}

int main() {
    PWM_t pwm;
    pwm_init(&pwm, 9, 30.0f);

    int high_count = 0;
    for (int i = 0; i < 10; i++) {
        pwm_tick(&pwm);
        if (pwm.out) high_count++;
    }
    printf("HIGH: %d\\n", high_count);
    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: 'HIGH: 3',
      description: '30% of 10 ticks = 3 HIGH ticks (CCR=3, cnt 0,1,2 are HIGH)',
    },
  ],
  hints: [
    'Call `pwm_tick(&pwm)` inside a loop 10 times. After each tick, check `pwm.out` and increment a counter if it is 1.',
    'CCR = (30/100) * 10 = 3. The output is HIGH when `cnt < 3` (cnt = 0, 1, 2) = 3 ticks out of 10.',
    'Print with `printf("HIGH: %d\\n", high_count)` after the loop.',
  ],
  complexity: { time: 'O(n)', space: 'O(1)', notes: 'n = number of PWM ticks simulated' },
  tags: ['embedded-c', 'pwm', 'timers', 'motor-control', 'servo', 'led-dimming'],
};
export default lesson;
