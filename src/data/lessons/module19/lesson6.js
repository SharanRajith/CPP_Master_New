const lesson = {
  id: 'm19-l6',
  title: 'Denormalization Strategies',
  module: 19,
  lessonNumber: 6,
  xpReward: 10,
  type: 'theory',
  content: `# Denormalization Strategies

## What is Denormalization?

**Denormalization** is the deliberate introduction of redundancy into a schema — the opposite of normalization — to improve **read performance**.

Normalization minimizes redundancy and update anomalies. Denormalization trades storage and update complexity for faster queries.

---

## When to Denormalize

| Signal | Explanation |
|---|---|
| Slow reads on large joins | Joining many tables at query time is expensive |
| Read-heavy workload | Writes are rare; reads dominate |
| Analytics / reporting | Aggregations over millions of rows |
| Caching layer not viable | Can't cache effectively |

---

## Common Denormalization Techniques

### 1. Storing Precomputed Aggregates

Instead of computing COUNT(*) on every request, store it in the parent table:

\`\`\`
-- Normalized: count enrollments at query time
SELECT COUNT(*) FROM enrollments WHERE course_id = 1;

-- Denormalized: courses.student_count updated on insert/delete
SELECT student_count FROM courses WHERE id = 1;
\`\`\`

Trade-off: faster reads, but you must update the counter on every INSERT/DELETE to enrollments.

### 2. Duplicating Columns Across Tables

Store \`user_name\` in the \`orders\` table even though it's in \`users\`:

\`\`\`
orders(order_id, user_id, user_name, total)
\`\`\`

Avoids the JOIN to \`users\` on every order read. Risk: if the user changes their name, all order rows must be updated.

### 3. Flattened Tables (Star Schema)

In data warehousing, combine dimension and fact data into a single wide table to eliminate joins:

\`\`\`
sales_fact(date, product_name, category, region, amount)
\`\`\`

No joins needed for typical analytical queries.

### 4. Materialized Views

Pre-compute and store the result of complex queries as a physical table. Refreshed periodically or on write.

---

## The Trade-off Summary

| Aspect | Normalized | Denormalized |
|---|---|---|
| Storage | Minimal | Higher |
| Update cost | Low | Higher (must maintain copies) |
| Query speed | Slower (joins) | Faster (pre-joined) |
| Data integrity | Guaranteed | Risk of inconsistency |

---

## Key Rules

- Never denormalize prematurely — profile first, optimize after.
- Document every denormalization decision and the trigger that maintains consistency.
- Prefer materialized views over manual duplication when the DB supports them.`,

  hints: [],
  complexity: null,
  tags: ['dbms', 'normalization', 'denormalization', 'performance', 'star-schema'],
};

export default lesson;
