const lesson = {
  id: 'meciq-l10',
  title: 'RTOS — Mutex, Semaphore & Priority Inversion',
  module: 'ECIQ',
  lessonNumber: 10,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# RTOS — Mutex, Semaphore & Priority Inversion

## Q: What is an RTOS?

A **Real-Time Operating System** schedules multiple tasks with guaranteed timing. Unlike a desktop OS, an RTOS guarantees that a high-priority task will preempt a low-priority task within a deterministic time bound.

Popular RTOS: **FreeRTOS**, Zephyr, ThreadX, CMSIS-RTOS.

## Q: Mutex vs Binary Semaphore — What's the difference?

| Feature | Mutex | Binary Semaphore |
|---|---|---|
| Ownership | Yes — only taker can release | No — anyone can post |
| Priority inheritance | Yes (in most RTOS) | No |
| Use case | Protect shared resource | Signal between tasks / ISR |
| ISR safe to give? | No (may cause priority inheritance issues) | Yes |

\`\`\`c
/* FreeRTOS examples */
SemaphoreHandle_t mutex = xSemaphoreCreateMutex();
SemaphoreHandle_t sem   = xSemaphoreCreateBinary();

/* Mutex — protect shared I2C bus */
xSemaphoreTake(mutex, portMAX_DELAY);
I2C_Write(addr, data, len);
xSemaphoreGive(mutex);

/* Binary semaphore — ISR signals task */
void UART_IRQHandler(void) {
    BaseType_t woken;
    xSemaphoreGiveFromISR(sem, &woken);  /* Wake waiting task */
    portYIELD_FROM_ISR(woken);
}

void uartTask(void *arg) {
    while (1) {
        xSemaphoreTake(sem, portMAX_DELAY);  /* Block until ISR signals */
        processData();
    }
}
\`\`\`

## Q: What is Priority Inversion?

A situation where a **high-priority task is effectively blocked by a lower-priority task**:

\`\`\`
Time →
T-High (P=3): ─────────WAIT────────────────────RUN►
T-Med  (P=2): ─────────────────RUN──────────────►
T-Low  (P=1): RUN (holds mutex)──────────────────►

T-Low holds a mutex needed by T-High.
T-Med preempts T-Low (P-Med > P-Low).
T-High is now blocked by T-Med! T-High has effectively the priority of T-Low.
\`\`\`

This caused the Mars Pathfinder mission crash in 1997.

## Q: How does Priority Inheritance fix it?

When a high-priority task blocks on a mutex held by a low-priority task, the RTOS **temporarily raises** the low-priority task's priority to match the waiting high-priority task:

\`\`\`
T-High (P=3): ─────────WAIT────────RUN►
T-Med  (P=2): ──────────────────────────RUN►  (must wait — T-Low now runs at P=3)
T-Low  (P=1→3): RUN at P=3 ─────►  releases mutex, drops back to P=1
\`\`\`

T-Low finishes quickly, releases the mutex, T-High unblocks immediately.

## Q: What is a deadlock? How do you prevent it?

Two tasks each hold a mutex and wait for the other's mutex — neither can proceed:

\`\`\`
Task A: holds M1, waits for M2 ─► blocked
Task B: holds M2, waits for M1 ─► blocked
\`\`\`

Prevention strategies:
1. **Lock ordering** — always acquire mutexes in the same global order
2. **Try-lock with timeout** — \`xSemaphoreTake(m, 100ms)\` — give up if can't acquire
3. **Resource hierarchy** — assign each resource a level; only lock in ascending order

## Q: What is a counting semaphore?

Tracks a count of available resources:

\`\`\`c
/* 3 DMA channels available */
SemaphoreHandle_t dmaPool = xSemaphoreCreateCounting(3, 3);

void requestDMA(void) {
    xSemaphoreTake(dmaPool, portMAX_DELAY);  /* Count: 3→2→1→0 (blocks) */
    /* use DMA channel */
    xSemaphoreGive(dmaPool);                 /* Count: ++  */
}
\`\`\``,
  starterCode: `#include <stdio.h>

/* Simulate a simple mutex using an int flag */
int mutex = 1;  /* 1 = free, 0 = locked */

int takeMutex(void) {
    if (mutex == 1) { mutex = 0; return 1; }  /* acquired */
    return 0;                                   /* already locked */
}

void giveMutex(void) { mutex = 1; }

int main() {
    /* TODO: Take the mutex, print "locked", give it back, print "released" */
    /* TODO: Try to take the mutex again (should succeed), print "locked again" */
    return 0;
}`,
  modelAnswer: `#include <stdio.h>

int mutex = 1;

int takeMutex(void) {
    if (mutex == 1) { mutex = 0; return 1; }
    return 0;
}

void giveMutex(void) { mutex = 1; }

int main() {
    if (takeMutex()) printf("locked\\n");
    giveMutex();
    printf("released\\n");
    if (takeMutex()) printf("locked again\\n");
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: 'locked\nreleased\nlocked again', description: 'Mutex take, release, and re-take cycle.' },
  ],
  hints: [
    'Call takeMutex() — if it returns 1, print "locked".',
    'Call giveMutex() then print "released".',
    'Call takeMutex() again — mutex is free now so it returns 1, print "locked again".',
  ],
  complexity: { time: 'O(1)', space: 'O(1)', notes: 'Mutex operations are O(1) in RTOS implementations.' },
  tags: ['embedded-c', 'RTOS', 'mutex', 'semaphore', 'priority-inversion', 'FreeRTOS', 'interview'],
};
export default lesson;
