const lesson = {
  id: 'm19-l10',
  title: 'Normalization vs Performance',
  module: 19,
  lessonNumber: 10,
  xpReward: 10,
  type: 'theory',
  content: `# Normalization vs Performance

## The Core Tension

**Normalization** reduces redundancy and ensures data integrity by spreading data across many tables.

**Query performance** often benefits from fewer joins — reads that touch one table are faster than reads that join five.

These two goals are in direct tension on large-scale systems.

---

## When Normalization Hurts Performance

### 1. Many-Table Joins

\`\`\`sql
-- Joining 5 tables for a simple product listing
SELECT p.name, c.name, b.name, i.qty, pr.amount
FROM products p
JOIN categories c ON p.category_id = c.id
JOIN brands b ON p.brand_id = b.id
JOIN inventory i ON p.id = i.product_id
JOIN prices pr ON p.id = pr.product_id
WHERE p.id = 42;
\`\`\`

Each join adds overhead. At millions of rows, this can be the query bottleneck.

### 2. Aggregation Queries

Analytical reports that SUM or COUNT across large normalized tables require full scans with joins.

---

## Strategies to Balance Both

| Strategy | How it helps |
|---|---|
| Indexes on FK columns | Speeds up JOIN conditions |
| Materialized views | Pre-join heavy queries; refresh on a schedule |
| Covering indexes | Fetch all needed columns from index without hitting row data |
| Caching layer | Redis/Memcached caches read-heavy results |
| Read replicas | Separate OLTP (writes) from OLAP (heavy reads) |
| Selective denormalization | Duplicate only the hottest columns |
| Star/Snowflake schema | Data warehouse schemas optimized for analytics |

---

## OLTP vs OLAP

| | OLTP | OLAP |
|---|---|---|
| Workload | Many small read/write transactions | Few large analytical queries |
| Schema | Highly normalized (3NF/BCNF) | Denormalized (star schema) |
| Goal | Data integrity, low latency | Query speed, aggregation |
| Example | E-commerce checkout | Monthly sales dashboard |

Most systems run OLTP as the operational DB and ETL data into a separate OLAP warehouse (e.g. Snowflake, BigQuery) for analytics.

---

## Decision Framework

\`\`\`
Is this a transaction-heavy system?
  Yes → Normalize to 3NF; add indexes on FK columns

Are read queries becoming slow?
  Profile first → identify the slow joins
  → Add indexes / materialized views before denormalizing

Is this an analytics system?
  Yes → Consider star schema or column-store DB
\`\`\`

---

## Key Takeaway

Normalize first — it is easier to introduce controlled redundancy later than to fix consistency bugs caused by premature denormalization. Always measure before optimizing.`,

  hints: [],
  complexity: null,
  tags: ['dbms', 'normalization', 'performance', 'oltp', 'olap', 'denormalization'],
};

export default lesson;
