const lesson = {
  id: 'm20-l4',
  title: 'Isolation Levels',
  module: 20,
  lessonNumber: 4,
  xpReward: 10,
  type: 'theory',
  content: `# Isolation Levels

## Why Isolation Levels?

Full serializable isolation (transactions behave as if run one-at-a-time) is expensive — it requires locking or MVCC overhead that reduces throughput. SQL defines four isolation levels that trade correctness guarantees for performance.

---

## The Four Anomalies

| Anomaly | Description |
|---|---|
| **Dirty Read** | Read uncommitted data from another transaction that later rolls back |
| **Non-repeatable Read** | Same row read twice gives different values (because another TX committed in between) |
| **Phantom Read** | A range query returns a different set of rows on re-execution (rows inserted by another TX) |
| **Lost Update** | Two TXs read then overwrite the same value; one update is silently discarded |

---

## The Four Isolation Levels

| Level | Dirty Read | Non-repeatable | Phantom |
|---|---|---|---|
| **READ UNCOMMITTED** | Possible | Possible | Possible |
| **READ COMMITTED** | Prevented | Possible | Possible |
| **REPEATABLE READ** | Prevented | Prevented | Possible |
| **SERIALIZABLE** | Prevented | Prevented | Prevented |

### READ UNCOMMITTED

- Lowest isolation; highest concurrency.
- Transactions can see uncommitted changes of others.
- Almost never used in production.

### READ COMMITTED

- Default in most databases (PostgreSQL, Oracle, SQL Server).
- Reads see only committed data at the moment of the read.
- Non-repeatable reads possible (data can change between two reads in the same TX).

### REPEATABLE READ

- Default in MySQL/InnoDB.
- All reads within a TX see a snapshot from TX start.
- Phantom reads still possible (new rows can appear via INSERT).

### SERIALIZABLE

- Highest isolation; lowest concurrency.
- Transactions are completely isolated — as if run serially.
- Implemented via range locks or serializable snapshot isolation (SSI).

---

## Setting Isolation Level

\`\`\`sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
  SELECT ...;
  UPDATE ...;
COMMIT;
\`\`\`

---

## Practical Guidance

| Scenario | Recommended Level |
|---|---|
| Reporting / analytics (reads only) | READ COMMITTED |
| E-commerce inventory (avoid oversell) | REPEATABLE READ or SERIALIZABLE |
| Financial transfers | SERIALIZABLE |
| High-throughput read-mostly | READ COMMITTED + application-level retry |`,

  hints: [],
  complexity: null,
  tags: ['dbms', 'transactions', 'isolation-levels', 'acid', 'concurrency'],
};

export default lesson;
