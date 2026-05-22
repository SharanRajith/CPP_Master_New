const lesson = {
  id: 'm20-l1', title: 'ACID Properties', module: 20, lessonNumber: 1, xpReward: 10, type: 'theory',
  content: `# ACID Properties

ACID defines the four guarantees every database transaction must satisfy.

## A — Atomicity
All-or-nothing execution. If any operation fails, the whole transaction rolls back.

\`\`\`sql
BEGIN;
UPDATE accounts SET balance = balance - 1000 WHERE name = 'Alice';
UPDATE accounts SET balance = balance + 1000 WHERE name = 'Bob';
COMMIT;
\`\`\`
If the system crashes between the two UPDATEs, the DBMS rolls back the debit automatically.

## C — Consistency
A transaction moves the database from one valid state to another. All integrity constraints hold before AND after.

## I — Isolation
Concurrent transactions behave as if serial. Intermediate states are invisible to other transactions. Controlled by isolation levels.

## D — Durability
Committed changes survive crashes. Implemented via Write-Ahead Logging (WAL): changes are written to the log disk before being applied to data files.

## SQL Transaction Commands

| Command | Effect |
|---|---|
| BEGIN | Start a transaction |
| COMMIT | Permanently save all changes |
| ROLLBACK | Undo all changes |
| SAVEPOINT sp1 | Mark a partial rollback point |
| ROLLBACK TO sp1 | Undo back to the savepoint |

## Summary

| Property | Guarantee | Mechanism |
|---|---|---|
| Atomicity | All-or-nothing | Undo logs |
| Consistency | Valid state always | Integrity constraints |
| Isolation | No interference | Locking / MVCC |
| Durability | Commits survive crashes | WAL / Redo logs |`,
  hints: [], complexity: null, tags: ['dbms', 'transactions', 'acid'],
};
export default lesson;
