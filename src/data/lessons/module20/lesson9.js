const lesson = {
  id: 'm20-l9',
  title: 'Partitioning & Sharding',
  module: 20,
  lessonNumber: 9,
  xpReward: 10,
  type: 'theory',
  content: `# Partitioning & Sharding

## The Scalability Problem

When a table grows to hundreds of millions of rows, even indexed queries slow down — the index tree becomes deep, cache eviction increases, and full scans are prohibitively expensive.

Two complementary techniques address this: **partitioning** (within one DB server) and **sharding** (across multiple servers).

---

## Partitioning

**Partitioning** divides a single logical table into multiple physical **partitions** on the same server. The application sees one table; the DB routes queries to the right partition(s).

### Partition Types

| Type | How rows are split | Best for |
|---|---|---|
| **Range** | Rows with key in a range go to one partition | Time-series data (by year, month) |
| **List** | Rows matching specific values go to one partition | Region or category data |
| **Hash** | Hash of a column determines partition | Even distribution of arbitrary data |
| **Composite** | Combine range + hash | Large datasets with time and user dimensions |

### Range Partitioning Example

\`\`\`sql
CREATE TABLE orders (
  id INTEGER, user_id INTEGER, amount REAL, created_at DATE
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2023 PARTITION OF orders FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');
CREATE TABLE orders_2024 PARTITION OF orders FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
\`\`\`

Queries with \`WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31'\` touch only orders_2024 — **partition pruning**.

---

## Sharding

**Sharding** is **horizontal partitioning across multiple database servers** (shards). Each shard holds a subset of rows. No single server holds the whole dataset.

\`\`\`
User 1–10M  →  Shard 1 (DB server A)
User 10M–20M → Shard 2 (DB server B)
User 20M–30M → Shard 3 (DB server C)
\`\`\`

### Shard Key Selection

The **shard key** determines which shard a row belongs to. A bad shard key causes **hot spots** (one shard receives most traffic).

| Key | Trade-off |
|---|---|
| User ID (hash) | Uniform distribution; cross-user queries require scatter-gather |
| Tenant ID | Perfect isolation per tenant; hotspot risk if tenants differ in size |
| Geography | Low latency for regional data; cross-region queries are expensive |

### Challenges with Sharding

| Challenge | Description |
|---|---|
| Cross-shard joins | Must be done in application layer |
| Cross-shard transactions | No native multi-shard atomicity (use 2PC or eventual consistency) |
| Re-sharding | Splitting a shard as data grows is operationally complex |
| Schema changes | Must apply to every shard |

---

## Partitioning vs Sharding

| | Partitioning | Sharding |
|---|---|---|
| Scope | Single server | Multiple servers |
| Complexity | Low | High |
| Scales to | Hundreds of GB | Petabytes |
| Joins | Normal SQL | Scatter-gather or application-side |

---

## Key Points

- Partitioning = split one table into parts on the same server; use when a single server is the bottleneck.
- Sharding = split data across multiple servers; use when you need to scale beyond one machine.
- Choose a shard key with high cardinality and uniform access to avoid hot spots.
- Both techniques complement indexing — they reduce the scope each query touches.`,

  hints: [],
  complexity: null,
  tags: ['dbms', 'partitioning', 'sharding', 'scalability', 'distributed-systems'],
};

export default lesson;
