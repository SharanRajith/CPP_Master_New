const lesson = {
  id: 'm20-l2', title: 'Concurrency Control', module: 20, lessonNumber: 2, xpReward: 10, type: 'theory',
  content: `# Concurrency Control

## Concurrency Anomalies

| Anomaly | Description |
|---|---|
| Dirty Read | Reading uncommitted data from another transaction |
| Lost Update | Two txns overwrite each others changes |
| Unrepeatable Read | Same row returns different values within one transaction |
| Phantom Read | New rows appear in a repeated range query |

## Lock Types
- Shared lock (S): multiple readers allowed simultaneously
- Exclusive lock (X): writer only; no other lock permitted concurrently

## Two-Phase Locking (2PL)

A transaction acquires ALL locks before releasing ANY.

Growing phase (acquire only) → Lock point → Shrinking phase (release only)

2PL guarantees conflict-serializability but does NOT prevent deadlocks.

## Deadlock Handling

Detection: Wait-for graph — abort the victim if a cycle is found.

Prevention strategies:
- Wait-Die: older transaction waits; younger transaction aborts
- Wound-Wait: older transaction aborts younger; younger waits

## Isolation Levels

| Level | Dirty Read | Unrepeatable | Phantom |
|---|---|---|---|
| READ UNCOMMITTED | Possible | Possible | Possible |
| READ COMMITTED | Prevented | Possible | Possible |
| REPEATABLE READ | Prevented | Prevented | Possible |
| SERIALIZABLE | Prevented | Prevented | Prevented |

Higher isolation = fewer anomalies, lower concurrency throughput.

## MVCC
Modern databases (PostgreSQL, MySQL InnoDB) use Multi-Version Concurrency Control. Readers see a consistent snapshot; writers create new row versions. Readers and writers do not block each other.`,
  hints: [], complexity: null, tags: ['dbms', 'transactions', 'concurrency', 'locking'],
};
export default lesson;
