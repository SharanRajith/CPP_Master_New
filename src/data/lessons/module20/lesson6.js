const lesson = {
  id: 'm20-l6',
  title: 'B-Tree & Hash Indexes',
  module: 20,
  lessonNumber: 6,
  xpReward: 10,
  type: 'theory',
  content: `# B-Tree & Hash Indexes

## Why Indexes?

An index is a separate data structure that maps search-key values to the rows that contain them. Without one, every query must scan the entire table — O(n). A good index reduces lookup to O(log n) or O(1).

---

## B+ Tree Index

The most common index structure. All data pointers live in **leaf nodes**; internal nodes store only routing keys.

\`\`\`
          [30 | 60]
         /    |    \\
    [10|20] [40|50] [70|80]   ← leaf nodes, linked ↔
       ↓        ↓       ↓
    row ptrs  row ptrs  row ptrs
\`\`\`

### Properties

| Property | Detail |
|---|---|
| Search | O(log n) |
| Insert / Delete | O(log n) — rebalancing |
| Range scan | Efficient — follow leaf linked list |
| Order by | Can eliminate sort step |
| Multi-column | Leftmost-prefix rule applies |

### Leftmost-Prefix Rule

For index on (a, b, c):
- Queries on (a), (a, b), (a, b, c) **use** the index.
- Queries on (b) or (c) alone do **not** use the index.

---

## Hash Index

Uses a hash function to map keys to buckets containing row pointers.

\`\`\`
hash(42) = bucket 7 → [row at page 3, offset 120]
\`\`\`

### Properties

| Property | Detail |
|---|---|
| Equality lookup | O(1) average |
| Range query | **Not supported** — hashing destroys order |
| Order by | **Not supported** |
| Collision | Handled via chaining or open addressing |

### When to Use Hash Index

- Columns used only in equality conditions (`WHERE id = ?`)
- In-memory hash tables (e.g. PostgreSQL hash index, MySQL MEMORY engine)
- Join hash tables built at query time (hash join algorithm)

---

## Comparison

| Feature | B+ Tree | Hash |
|---|---|---|
| Equality | O(log n) | O(1) |
| Range | ✓ | ✗ |
| Order by | ✓ | ✗ |
| Partial match | ✓ (prefix) | ✗ |
| Disk-based | ✓ | Mostly in-memory |
| Default index | Most DBs | Only specific engines |

---

## Clustered vs Non-Clustered

| | Clustered | Non-Clustered |
|---|---|---|
| Row storage | Physically ordered by key | Separate from table |
| Per table | One (usually PK) | Many allowed |
| Range scan | Very fast | Extra I/O to fetch rows |

PostgreSQL calls non-clustered indexes "heap-based." MySQL InnoDB always clusters on the PK.

---

## Key Points

- B+ Tree: O(log n), supports range/order/prefix — default choice for most indexes.
- Hash: O(1) equality — only when you never need ranges.
- Clustered index physically orders data; secondary indexes point to the PK.`,

  hints: [],
  complexity: null,
  tags: ['dbms', 'indexing', 'b-tree', 'hash-index', 'clustered', 'non-clustered'],
};

export default lesson;
