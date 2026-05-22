const lesson = {
  id: 'm18-l4',
  title: 'CREATE VIEW & Indexes',
  module: 18,
  lessonNumber: 4,
  xpReward: 10,
  type: 'sql',
  content: `## CREATE VIEW & Indexes

### What is a View?

A **view** is a saved SELECT query stored under a name. It behaves like a virtual table — you can query it with SELECT, filter it with WHERE, and join it with other tables — but it holds no data of its own. Every time you query a view, the underlying SELECT runs.

### Creating a View

\`\`\`sql
CREATE VIEW view_name AS
SELECT column1, column2
FROM some_table
WHERE condition;
\`\`\`

### Querying a View

Once created, a view is used exactly like a regular table:

\`\`\`sql
SELECT * FROM view_name;
SELECT * FROM view_name WHERE column = 'value';
SELECT v.col, t.col FROM view_name v JOIN other_table t ON …;
\`\`\`

### Why Use Views?

| Benefit | Description |
|---|---|
| Simplicity | Hide complex joins/filters behind a simple name |
| Security | Expose only certain columns/rows to specific users |
| Reusability | Write the query once; reference it many times |
| Abstraction | Callers don't need to know the underlying schema |

### Dropping a View

\`\`\`sql
DROP VIEW IF EXISTS view_name;
\`\`\`

---

## Indexes

An **index** is a data structure (usually a B+ tree) that allows the database engine to find rows quickly without scanning the entire table.

### Without an Index

The engine performs a **full table scan**: it reads every row and checks the condition. On a table with 1 million rows this is slow (O(n)).

### With an Index

The engine traverses the index tree to find matching rows directly in O(log n) time — dramatically faster for large tables.

### Creating an Index

\`\`\`sql
CREATE INDEX idx_name ON table_name (column_name);

-- Multi-column (composite) index
CREATE INDEX idx_dept_gpa ON students (dept, gpa);
\`\`\`

### When to Use Indexes

**Good candidates** for indexing:
- Columns frequently used in WHERE clauses (\`WHERE dept = 'CS'\`)
- Columns used in JOIN conditions (\`ON s.id = e.student_id\`)
- Columns used in ORDER BY when large result sets are sorted

**Avoid indexing**:
- Columns with very low cardinality (e.g. a boolean flag — only 2 values)
- Tables that are tiny (full scan is faster than index overhead)
- Columns that are updated extremely frequently (index maintenance cost)

### Index Trade-offs

| Aspect | Detail |
|---|---|
| Read speed | Greatly improved for indexed lookups |
| Write speed | Slightly slower — index must be updated on INSERT/UPDATE/DELETE |
| Storage | Index occupies extra disk space |

### Unique Index

\`\`\`sql
CREATE UNIQUE INDEX idx_unique_name ON students (name);
\`\`\`

Enforces that no two rows share the same value in that column — effectively the same as a UNIQUE constraint.

---

### Key Points

- A VIEW is a named SELECT query; it acts like a table but stores no data.
- Query a view with SELECT just as you would a real table.
- An INDEX speeds up lookups at the cost of slightly slower writes and extra storage.
- Index columns that appear frequently in WHERE, JOIN, or ORDER BY.`,

  schema: `CREATE TABLE students (id INTEGER, name TEXT, age INTEGER, gpa REAL, dept TEXT);
CREATE TABLE courses (id INTEGER, title TEXT, credits INTEGER, dept TEXT);
CREATE TABLE enrollments (student_id INTEGER, course_id INTEGER, grade TEXT);
INSERT INTO students VALUES (1,'Alice',20,3.8,'CS');
INSERT INTO students VALUES (2,'Bob',21,3.2,'EE');
INSERT INTO students VALUES (3,'Carol',19,3.9,'CS');
INSERT INTO students VALUES (4,'David',22,2.8,'ME');
INSERT INTO students VALUES (5,'Eve',20,3.5,'CS');
INSERT INTO courses VALUES (1,'Database Systems',3,'CS');
INSERT INTO courses VALUES (2,'Circuit Theory',4,'EE');
INSERT INTO courses VALUES (3,'Data Structures',3,'CS');
INSERT INTO courses VALUES (4,'Thermodynamics',4,'ME');
INSERT INTO courses VALUES (5,'Machine Learning',3,'CS');
INSERT INTO enrollments VALUES (1,1,'A');
INSERT INTO enrollments VALUES (1,3,'B');
INSERT INTO enrollments VALUES (2,2,'A');
INSERT INTO enrollments VALUES (3,1,'A');
INSERT INTO enrollments VALUES (3,3,'A');
INSERT INTO enrollments VALUES (4,4,'C');
INSERT INTO enrollments VALUES (5,5,'B');
INSERT INTO enrollments VALUES (2,1,'C');`,

  starterCode: `-- Step 1: Create a view called cs_students that contains
--         the name and gpa of all students in the 'CS' department.
-- Step 2: SELECT * FROM that view, ordered by gpa descending.

CREATE VIEW cs_students AS
...

SELECT ...`,

  modelAnswer: `CREATE VIEW cs_students AS
SELECT name, gpa FROM students WHERE dept = 'CS';
SELECT * FROM cs_students ORDER BY gpa DESC;`,

  testCases: [
    {
      input: '',
      expectedOutput: 'Carol|3.9\nAlice|3.8\nEve|3.5',
      description: 'Creates the cs_students view and returns CS students ordered by GPA descending',
    },
  ],

  hints: [
    'The CREATE VIEW syntax is: CREATE VIEW name AS SELECT … — the AS keyword introduces the query that defines the view.',
    'After creating the view, query it exactly like a table: SELECT * FROM cs_students.',
    'Append ORDER BY gpa DESC to the SELECT on the view to sort results from highest to lowest GPA.',
  ],

  complexity: null,
  tags: ['dbms', 'sql', 'views', 'create-view', 'indexes', 'query-optimization'],
};

export default lesson;
