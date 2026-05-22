// src/data/lessons/module15/lesson1.js
const lesson = {
  id: 'm15-l1',
  title: 'Finite State Machines',
  module: 15,
  lessonNumber: 1,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Finite State Machines (FSM)

FSMs are the **single most important design pattern** in embedded firmware. If you work on any product with a microcontroller — smart meters, washing machines, industrial PLCs, automotive ECUs — the firmware is likely structured as one or more FSMs.

## What is an FSM?

An FSM has:
- A **finite set of states** (e.g. IDLE, RUNNING, ERROR)
- A **current state** (one at a time)
- **Events** or conditions that trigger transitions
- **Actions** performed on entry or during a state

\`\`\`
  +-------+   button press   +--------+   timeout   +--------+
  |  OFF  | --------------> |   ON   | ----------> |  OFF   |
  +-------+                  +--------+             +--------+
     ^                                                  |
     +--------------------------------------------------+
\`\`\`

## Implementation in C

The cleanest C approach uses an \`enum\` for states and a \`switch\` for transitions:

\`\`\`c
typedef enum { LED_OFF, LED_ON } LedState;

LedState state = LED_OFF;

void fsm_step(void) {
    switch (state) {
        case LED_OFF: state = LED_ON;  printf("LED ON\\n");  break;
        case LED_ON:  state = LED_OFF; printf("LED OFF\\n"); break;
    }
}
\`\`\`

## Traffic Light FSM

A classic 3-state FSM:

\`\`\`
  RED  --[3s]--> GREEN  --[2s]--> YELLOW  --[1s]--> RED
\`\`\`

In firmware the "timers" are hardware timer interrupts. Here we simulate by calling \`fsm_step()\` repeatedly:

\`\`\`c
typedef enum { RED, GREEN, YELLOW } TrafficState;

TrafficState state = RED;

void fsm_step(void) {
    switch (state) {
        case RED:    printf("RED\\n");    state = GREEN;  break;
        case GREEN:  printf("GREEN\\n");  state = YELLOW; break;
        case YELLOW: printf("YELLOW\\n"); state = RED;    break;
    }
}

int main() {
    int i;
    for (i = 0; i < 4; i++) {
        fsm_step();
    }
    return 0;
}
/* Output: RED GREEN YELLOW RED */
\`\`\`

## Why Not a Giant if-else?

| if-else chain | FSM (enum + switch) |
|---|---|
| Hard to add states | Just add enum value + case |
| State hidden in conditions | State is explicit variable |
| Hard to debug | Print state name easily |
| Monolithic | Can split into sub-FSMs |

## State Entry/Exit Actions

Real FSMs often have actions on state **entry** (run once when entering) vs **during** (run every tick). A common pattern:

\`\`\`c
typedef enum { ST_IDLE, ST_ACTIVE, ST_ERROR } State;
State prev_state = ST_IDLE;
State curr_state = ST_IDLE;

void fsm_run(void) {
    int entered = (curr_state != prev_state);
    prev_state = curr_state;
    switch (curr_state) {
        case ST_IDLE:
            if (entered) printf("Entering IDLE\\n");
            break;
        /* ... */
    }
}
\`\`\`

This pattern prevents re-running initialisation code every tick.`,
  starterCode: `#include <stdio.h>
#include <stdint.h>

typedef enum { RED, GREEN, YELLOW } TrafficState;

TrafficState state = RED;

void fsm_step(void) {
    /* TODO: switch on state */
    /* case RED:    print "RED\\n",    transition to GREEN  */
    /* case GREEN:  print "GREEN\\n",  transition to YELLOW */
    /* case YELLOW: print "YELLOW\\n", transition to RED    */
}

int main() {
    int i;
    for (i = 0; i < 4; i++) {
        fsm_step();
    }
    return 0;
}`,
  modelAnswer: `#include <stdio.h>
#include <stdint.h>

typedef enum { RED, GREEN, YELLOW } TrafficState;

TrafficState state = RED;

void fsm_step(void) {
    switch (state) {
        case RED:
            printf("RED\\n");
            state = GREEN;
            break;
        case GREEN:
            printf("GREEN\\n");
            state = YELLOW;
            break;
        case YELLOW:
            printf("YELLOW\\n");
            state = RED;
            break;
    }
}

int main() {
    int i;
    for (i = 0; i < 4; i++) {
        fsm_step();
    }
    return 0;
}`,
  testCases: [
    {
      input: '',
      expectedOutput: 'RED\nGREEN\nYELLOW\nRED',
      description: 'Traffic light FSM: 4 steps starting at RED, cycling RED→GREEN→YELLOW→RED.',
    },
  ],
  hints: [
    'Use `typedef enum { RED, GREEN, YELLOW } TrafficState;` and a global `TrafficState state = RED;`.',
    'In `fsm_step()`, switch on `state`: each case prints the state name and sets `state` to the next one.',
    'Call `fsm_step()` 4 times in a loop — the transitions wrap: RED→GREEN→YELLOW→RED.',
  ],
  complexity: { time: 'O(n)', space: 'O(1)', notes: 'n = number of FSM steps; single state variable.' },
  tags: ['embedded-c', 'fsm', 'state-machine', 'firmware-patterns'],
};
export default lesson;
