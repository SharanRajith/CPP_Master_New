const lesson = {
  id: 'm20-l5',
  title: 'Deadlocks & Resolution',
  module: 20,
  lessonNumber: 5,
  xpReward: 10,
  type: 'theory',
  content: `# Deadlocks & Resolution

## What is a Deadlock?

A **deadlock** occurs when two or more transactions each hold a lock that the other needs, and neither can proceed.

### Classic Two-Transaction Deadlock

\`\`\`
T1:  LOCK(A)  →  wait for B
T2:  LOCK(B)  →  wait for A
\`\`\`

T1 holds A and wants B. T2 holds B and wants A. Neither can advance → deadlock.

---

## Wait-for Graph

The DBMS detects deadlocks by maintaining a **wait-for graph**:
- Node = transaction
- Edge T1 → T2 = T1 is waiting for a lock held by T2

A **cycle** in the graph signals a deadlock.

\`\`\`
T1 → T2 → T1   ← cycle = deadlock
\`\`\`

---

## Resolution Strategies

### 1. Detection + Victim Selection

The DBMS periodically checks for cycles, then **aborts one transaction** (the victim) to break the cycle.

Victim selection heuristics:
- Youngest transaction (least work done → cheapest to redo)
- Transaction with fewest locks
- Transaction that has been rolled back least often

### 2. Timeout

Each transaction is given a maximum wait time. If it waits longer → abort and retry.

\`\`\`
SET innodb_lock_wait_timeout = 5;  -- 5 seconds (MySQL)
\`\`\`

Simple but imprecise — may abort transactions that aren't actually deadlocked.

### 3. Prevention — Consistent Lock Ordering

Always acquire locks in the **same order** across all transactions:

\`\`\`
Rule: always lock Table A before Table B
T1: LOCK(A) then LOCK(B)
T2: LOCK(A) then LOCK(B)  ← same order → T2 blocks on A but no cycle
\`\`\`

Eliminates circular waits entirely.

### 4. Prevention — Two-Phase Locking (2PL)

Transactions acquire all locks before releasing any.

- **Growing phase**: acquire locks
- **Shrinking phase**: release locks (no new acquisitions)

Guarantees serializability. Strict 2PL holds all locks until commit/abort.

---

## Application-Level Best Practices

1. Keep transactions short — reduce the window for conflicts.
2. Access tables and rows in a consistent order across all code paths.
3. Implement retry logic: catch deadlock errors (e.g. MySQL error 1213) and retry the transaction.
4. Avoid user interaction inside transactions (never wait for input mid-transaction).

---

## Key Points

- Deadlock = circular wait among transactions.
- Detection: wait-for graph cycle → abort the victim and retry.
- Prevention: consistent lock ordering, short transactions, retry on deadlock error.
- Most production DBs (MySQL, PostgreSQL) detect and auto-resolve deadlocks by aborting one TX.`,

  hints: [],
  complexity: null,
  tags: ['dbms', 'transactions', 'deadlock', 'concurrency', 'locking', '2pl'],
};

export default lesson;
