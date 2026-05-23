const lesson = {
  id: 'm20-l7',
  title: 'Composite & Covering Indexes',
  module: 20,
  lessonNumber: 7,
  xpReward: 10,
  type: 'theory',
  content: `# Composite & Covering Indexes

## Composite Index

A **composite index** (also called multi-column index) is built on two or more columns.

\`\`\`sql
CREATE INDEX idx_dept_salary ON employees (dept, salary);
\`\`\`

### Leftmost-Prefix Rule

The index can be used for queries that filter on the **leading columns** in order:

\`\`\`
Index: (dept, salary, name)

Queries that CAN use the index:
  WHERE dept = 'CS'
  WHERE dept = 'CS' AND salary > 70000
  WHERE dept = 'CS' AND salary = 80000 AND name = 'Alice'

Queries that CANNOT use the index (skip the leading column):
  WHERE salary > 70000          ← no dept filter
  WHERE name = 'Alice'          ← skips dept and salary
\`\`\`

### Column Order Matters

Put the most selective column first (highest cardinality → smallest range of matching rows), unless query patterns dictate otherwise.

---

## Covering Index

A **covering index** includes all the columns a query needs — both the filter columns AND the SELECT columns.

\`\`\`sql
-- Query:
SELECT name, salary FROM employees WHERE dept = 'CS';

-- Covering index:
CREATE INDEX idx_covering ON employees (dept, name, salary);
\`\`\`

The DB can answer the query **entirely from the index** without fetching the actual row data (no "heap fetch"). This is called an **index-only scan**.

### Benefit

| Without covering index | With covering index |
|---|---|
| Scan index → fetch row page for each match | Scan index → done |
| Extra I/O per matched row | Zero extra I/O |
| Slower on large result sets | Much faster |

---

## Index Selectivity

**Selectivity** = fraction of rows matching the condition.

- High selectivity (small fraction → e.g. 0.1%) → index is very effective.
- Low selectivity (large fraction → e.g. 80%) → full scan may be cheaper.

Rule of thumb: an index on a boolean column (only 2 values) is almost never useful because each lookup returns ~50% of rows.

---

## When NOT to Index

| Situation | Reason |
|---|---|
| Very small tables | Full scan is fast enough |
| Low-cardinality columns | Selectivity too low |
| Write-heavy columns | Maintenance cost on every write |
| Columns not in WHERE/JOIN/ORDER BY | Index is never used |

---

## Key Points

- Composite indexes follow the leftmost-prefix rule — column order is critical.
- Covering indexes eliminate heap fetches for matching queries.
- High selectivity = effective index; low selectivity = reconsider.
- Indexes are not free — every write must update each relevant index.`,

  hints: [],
  complexity: null,
  tags: ['dbms', 'indexing', 'composite-index', 'covering-index', 'selectivity', 'query-optimization'],
};

export default lesson;
