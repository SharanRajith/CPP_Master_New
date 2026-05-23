const lesson = {
  id: 'm19-l9',
  title: 'Database Design Patterns',
  module: 19,
  lessonNumber: 9,
  xpReward: 10,
  type: 'theory',
  content: `# Database Design Patterns

## 1. Lookup / Reference Table

Replace magic strings or repeated values with a reference table:

\`\`\`sql
-- Instead of: orders.status TEXT ('pending', 'shipped', 'delivered')
CREATE TABLE order_statuses (id INTEGER PRIMARY KEY, label TEXT);
INSERT INTO order_statuses VALUES (1,'pending'),(2,'shipped'),(3,'delivered');

CREATE TABLE orders (id INTEGER, status_id INTEGER REFERENCES order_statuses(id));
\`\`\`

**Why**: adding a new status requires one INSERT instead of scattering a new string everywhere; validates values via FK.

---

## 2. Self-referencing (Adjacency List)

Model hierarchies in the same table:

\`\`\`sql
CREATE TABLE categories (
  id        INTEGER PRIMARY KEY,
  name      TEXT,
  parent_id INTEGER REFERENCES categories(id)  -- NULL = root
);
\`\`\`

**Use**: org charts, category trees, bill of materials. Traverse with recursive CTEs.

---

## 3. Polymorphic Association

One table references rows from multiple other tables:

\`\`\`sql
CREATE TABLE comments (
  id          INTEGER PRIMARY KEY,
  entity_type TEXT,   -- 'post' | 'video' | 'product'
  entity_id   INTEGER,
  body        TEXT
);
\`\`\`

**Caution**: cannot use FK constraints here; validate at the application layer. Alternative: one join table per entity type.

---

## 4. Audit / History Table

Capture every version of a row:

\`\`\`sql
CREATE TABLE employees_history (
  history_id  INTEGER PRIMARY KEY,
  employee_id INTEGER,
  name        TEXT,
  salary      INTEGER,
  changed_at  TEXT,
  changed_by  TEXT
);
\`\`\`

Triggered by INSERT/UPDATE/DELETE on the main table. Enables point-in-time queries.

---

## 5. Soft Delete

Instead of physically deleting rows, mark them deleted:

\`\`\`sql
ALTER TABLE users ADD COLUMN deleted_at TEXT;
-- DELETE becomes:
UPDATE users SET deleted_at = datetime('now') WHERE id = ?;
-- All queries add: WHERE deleted_at IS NULL
\`\`\`

**Why**: preserves referential integrity, enables undo, simplifies audit trails.

---

## 6. Key–Value Extension (Entity–Attribute–Value, EAV)

Store arbitrary attributes without schema changes:

\`\`\`sql
CREATE TABLE product_attributes (
  product_id INTEGER,
  attr_name  TEXT,
  attr_value TEXT
);
\`\`\`

**Use sparingly**: destroys type safety and query performance. Prefer JSONB columns in PostgreSQL for semi-structured data.

---

## Key Takeaways

- Use reference tables to centralize valid values and enforce constraints.
- Adjacency list + recursive CTE = standard hierarchy pattern.
- Soft deletes trade storage for auditability — use WHERE deleted_at IS NULL in all queries.
- EAV is a last resort; JSONB is almost always better for semi-structured data.`,

  hints: [],
  complexity: null,
  tags: ['dbms', 'design-patterns', 'schema-design', 'soft-delete', 'audit-table', 'eav'],
};

export default lesson;
