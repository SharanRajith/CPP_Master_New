const lesson = {
  id: 'm16-l7',
  title: 'Database Schema Design',
  module: 16,
  lessonNumber: 7,
  xpReward: 10,
  type: 'theory',
  content: `# Database Schema Design

## What is a Schema?

A **database schema** is the formal description of the structure of a database: the tables, their columns, data types, constraints, and relationships.

---

## Schema Design Process

\`\`\`
Requirements → ER Diagram → Relational Schema → Normalization → DDL (SQL)
\`\`\`

1. **Gather requirements** — what data must be stored, what queries must run
2. **ER Diagram** — entities, attributes, relationships, cardinality
3. **Relational schema** — convert ER to tables
4. **Normalize** — eliminate redundancy (2NF, 3NF)
5. **Write DDL** — CREATE TABLE statements

---

## ER → Relational Mapping Rules

| ER Element | Relational Mapping |
|---|---|
| Strong entity | One table, PK = entity key |
| Weak entity | Table, PK = owner FK + partial key |
| 1:1 relationship | Add FK to either side (usually the optional side) |
| 1:N relationship | Add FK on the "many" side |
| M:N relationship | Create a junction table with both FKs as composite PK |
| Multi-valued attribute | Separate table with FK back to entity |
| Composite attribute | Flatten into multiple columns |

---

## Example: University Schema

**Requirements**: students enroll in courses, each course has an instructor, students can leave reviews.

\`\`\`sql
CREATE TABLE instructors (
  id   INTEGER PRIMARY KEY,
  name TEXT    NOT NULL,
  dept TEXT    NOT NULL
);

CREATE TABLE courses (
  id            INTEGER PRIMARY KEY,
  title         TEXT    NOT NULL,
  credits       INTEGER NOT NULL CHECK(credits > 0),
  instructor_id INTEGER NOT NULL REFERENCES instructors(id)
);

CREATE TABLE students (
  id    INTEGER PRIMARY KEY,
  name  TEXT    NOT NULL,
  email TEXT    NOT NULL UNIQUE,
  gpa   REAL    CHECK(gpa BETWEEN 0.0 AND 4.0)
);

CREATE TABLE enrollments (
  student_id INTEGER NOT NULL REFERENCES students(id),
  course_id  INTEGER NOT NULL REFERENCES courses(id),
  grade      TEXT,
  enrolled_at TEXT NOT NULL DEFAULT (date('now')),
  PRIMARY KEY (student_id, course_id)
);

CREATE TABLE reviews (
  id         INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id),
  course_id  INTEGER NOT NULL REFERENCES courses(id),
  rating     INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
  body       TEXT
);
\`\`\`

---

## Naming Conventions

| Element | Convention |
|---|---|
| Tables | Plural nouns: \`students\`, \`orders\` |
| Primary key | \`id\` or \`table_name_id\` |
| Foreign key | Referenced table name + \`_id\` |
| Columns | snake_case |
| Indexes | \`idx_tablename_column\` |

---

## Common Design Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| Storing multiple values in one column | Hard to query | Use a separate table |
| Missing FK constraints | Orphaned rows | Add REFERENCES |
| Overusing nullable columns | NULL handling complexity | Be explicit about what can be NULL |
| Generic column names (data1, val) | Unreadable schema | Use descriptive names |

---

## Key Takeaway

Good schema design starts with a clear ER diagram. Map entities to tables, relationships to FKs, and M:N to junction tables. Enforce constraints at the DB level. Consistent naming makes the schema self-documenting.
`,
  hints: [],
  complexity: null,
  tags: ['dbms', 'schema-design', 'er-diagram', 'relational-mapping', 'ddl', 'normalization'],
};
export default lesson;
