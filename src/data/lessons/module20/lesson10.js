const lesson = {
  id: 'm20-l10',
  title: 'NoSQL vs SQL — When to Use Each',
  module: 20,
  lessonNumber: 10,
  xpReward: 10,
  type: 'theory',
  content: `# NoSQL vs SQL — When to Use Each

## Relational Databases (SQL)

SQL databases store data in **tables with a fixed schema**. Relationships between tables are expressed via foreign keys and enforced via joins.

Examples: PostgreSQL, MySQL, SQLite, Oracle, SQL Server

**Strengths**:
- ACID guarantees — safe for financial and critical data
- Rich query language (SQL) — complex joins, aggregates, subqueries
- Mature tooling — decades of optimization, monitoring, backup tooling
- Strong consistency — always reads the latest committed data
- Schema enforcement — bad data is rejected at the DB level

**Weaknesses**:
- Schema changes require migrations (ALTER TABLE can be slow on large tables)
- Horizontal scaling is hard — sharding is complex
- Object-relational impedance mismatch for deeply nested document data

---

## NoSQL Databases

NoSQL databases relax one or more relational constraints to gain flexibility or scalability. There is no single "NoSQL" — it's a family of different data models.

### Document Stores (MongoDB, Firestore)

Store JSON-like documents. Schema is flexible per document.

\`\`\`json
{
  "_id": "u123",
  "name": "Alice",
  "address": { "city": "NY", "zip": "10001" },
  "orders": [{ "id": "o1", "total": 99 }]
}
\`\`\`

Best for: CMS, catalogs, user profiles, applications with rapidly evolving schemas.

### Key-Value Stores (Redis, DynamoDB)

Map keys to values (strings, lists, sets, sorted sets).

Best for: caching, sessions, leaderboards, rate limiting — ultra-low latency O(1) lookups.

### Wide-Column Stores (Cassandra, HBase)

Rows have many columns; columns can vary per row; data sorted by partition + clustering key.

Best for: time-series, IoT, write-heavy workloads at petabyte scale.

### Graph Databases (Neo4j)

Nodes and edges. Traversal queries are native and fast.

Best for: social networks, recommendation engines, fraud detection.

---

## CAP Theorem

In a distributed system, you can guarantee at most two of three:

- **C**onsistency — every read returns the latest write
- **A**vailability — every request gets a response (no errors)
- **P**artition tolerance — system works despite network failures

SQL databases prioritize **CP**. Many NoSQL databases prioritize **AP** (eventual consistency).

---

## Decision Guide

| Need | Choose |
|---|---|
| ACID transactions, complex queries | SQL |
| Flexible schema, document-shaped data | MongoDB / Firestore |
| Ultra-low latency caching | Redis |
| Massive write throughput (IoT, logs) | Cassandra |
| Relationship traversal | Neo4j |
| Scalable key-value with strong guarantees | DynamoDB |
| Analytics on large datasets | BigQuery / Redshift (columnar SQL) |

---

## The Polyglot Persistence Pattern

Modern systems often use **multiple databases**:

\`\`\`
PostgreSQL  → transactional data (orders, payments)
Redis       → sessions, caching, rate limiting
Elasticsearch → full-text search
MongoDB     → user-generated content (flexible schema)
\`\`\`

Each store is used for what it does best.

---

## Key Points

- SQL: ACID, structured data, complex queries — the default for most applications.
- NoSQL: flexibility, scale, or specialized access patterns.
- No single database wins all use cases — choose based on your workload.
- Many production systems use both SQL and NoSQL (polyglot persistence).`,

  hints: [],
  complexity: null,
  tags: ['dbms', 'nosql', 'sql', 'mongodb', 'redis', 'cassandra', 'cap-theorem', 'database-selection'],
};

export default lesson;
