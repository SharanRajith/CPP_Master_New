const lesson = {
  id: 'm20-l8',
  title: 'Query Execution Plan (EXPLAIN)',
  module: 20,
  lessonNumber: 8,
  xpReward: 10,
  type: 'theory',
  content: `# Query Execution Plan (EXPLAIN)

## What is a Query Execution Plan?

Before running a query, the **query optimizer** generates a **query execution plan (QEP)** — a tree of physical operators that describes exactly how the query will be run: which indexes to use, what join algorithm to apply, and in what order.

\`EXPLAIN\` lets you inspect this plan.

---

## Using EXPLAIN

\`\`\`sql
EXPLAIN SELECT name, salary
FROM employees
WHERE dept = 'CS';
\`\`\`

### SQLite output (simplified)

\`\`\`
SCAN employees
\`\`\`

Add an index and re-run:

\`\`\`sql
CREATE INDEX idx_dept ON employees (dept);
EXPLAIN SELECT name, salary FROM employees WHERE dept = 'CS';
-- Output: SEARCH employees USING INDEX idx_dept (dept=?)
\`\`\`

### PostgreSQL (EXPLAIN ANALYZE)

\`\`\`
Seq Scan on employees  (cost=0.00..15.00 rows=500 width=32) (actual rows=120 loops=1)
  Filter: (dept = 'CS')
\`\`\`

- **cost=start..total** — optimizer's estimate
- **rows** — estimated output rows
- **actual rows** — real row count (with ANALYZE)
- **loops** — how many times this node ran

---

## Key Plan Nodes

| Node | Meaning |
|---|---|
| Seq Scan | Full table scan — no usable index |
| Index Scan | Traverses index, then fetches row data |
| Index Only Scan | Index covers all needed columns — no row fetch |
| Hash Join | Builds hash table on smaller input, probes with larger |
| Nested Loop | For each outer row, scan the inner side |
| Merge Join | Both sides sorted; merge them together |
| Sort | Explicit sort step — look for missing index on ORDER BY column |
| Aggregate | GROUP BY or aggregate function |

---

## Red Flags in a Plan

| What you see | What it means | Fix |
|---|---|---|
| Seq Scan on large table | No usable index | Add an index on the WHERE column |
| Rows estimate wildly off | Stale statistics | ANALYZE table |
| Nested Loop with large outer | O(n×m) joins | Add an index on the inner-side join column |
| Sort node on ORDER BY | Missing index | Add index on ORDER BY column |

---

## Refreshing Statistics

The optimizer relies on table statistics (row counts, value distributions) to estimate costs:

\`\`\`sql
ANALYZE employees;        -- PostgreSQL / SQLite
ANALYZE TABLE employees;  -- MySQL
\`\`\`

Run after large bulk imports or when query plans suddenly degrade.

---

## Key Points

- EXPLAIN shows the physical plan the optimizer chose — essential for debugging slow queries.
- Seq Scan on a large table = missing index.
- EXPLAIN ANALYZE (PostgreSQL) gives both estimated and actual row counts.
- Stale statistics mislead the optimizer — keep them fresh with ANALYZE.`,

  hints: [],
  complexity: null,
  tags: ['dbms', 'query-optimization', 'explain', 'execution-plan', 'performance'],
};

export default lesson;
