const lesson = {
  id: 'm20-l3', title: 'Indexing & Query Optimization', module: 20, lessonNumber: 3, xpReward: 10, type: 'theory',
  content: `# Indexing & Query Optimization

## Why Indexes?

Without an index, SELECT * FROM students WHERE id = 5 scans every row — O(n).
With a B+ tree index on id, the lookup is O(log n).

## B+ Tree Index

All data pointers live in leaf nodes. Leaf nodes are linked for efficient range scans.

\`\`\`
        [30 | 60]           <- internal nodes (routing)
       /    |    \
  [10|20] [40|50] [70|80]  <- leaf nodes with row pointers
    <->     <->     <->    <- leaves linked left-to-right
\`\`\`

Best for: equality, range queries (BETWEEN, >, <), ORDER BY. O(log n) for search, insert, delete.

## Hash Index
- O(1) average equality lookup
- Cannot do range queries
- Best for exact-match WHERE clauses

## Clustered vs Non-Clustered

| | Clustered | Non-Clustered |
|--|--|--|
| Row order | Physically sorted by key | Separate structure |
| Per table | Only 1 (usually PK) | Many allowed |

## Selectivity

High selectivity (few rows match) — index is highly effective.
Low selectivity (many rows match) — full table scan may be faster.

## EXPLAIN

\`\`\`sql
EXPLAIN SELECT * FROM students WHERE dept = 'CS';
\`\`\`

Shows the query execution plan: which index is used, estimated rows, cost.

## Index Guidelines

| Situation | Action |
|---|---|
| Columns in WHERE or JOIN ON | Create an index |
| Columns in ORDER BY | Index can eliminate sort step |
| Low-cardinality columns | Usually not worth indexing |
| Frequently updated columns | Use sparingly (maintenance cost) |

A covering index includes all columns a query needs — avoids fetching row data entirely.`,
  hints: [], complexity: null, tags: ['dbms', 'indexing', 'b-tree', 'query-optimization'],
};
export default lesson;
