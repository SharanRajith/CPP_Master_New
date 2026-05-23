const lesson = {
  id: 'm18-l9',
  title: 'EXISTS vs IN vs NOT IN',
  module: 18,
  lessonNumber: 9,
  xpReward: 10,
  type: 'sql',
  content: `## EXISTS vs IN vs NOT IN

### IN — Match Against a List

\`\`\`sql
SELECT name FROM students
WHERE id IN (SELECT student_id FROM enrollments);
\`\`\`

Returns rows where the column value appears in the subquery result set.

- Subquery runs **once** and returns a set of values.
- Outer query checks each row against that set.
- Works well for small-to-medium sets.

---

### EXISTS — Check for the Existence of Rows

\`\`\`sql
SELECT name FROM students s
WHERE EXISTS (
  SELECT 1 FROM enrollments WHERE student_id = s.id
);
\`\`\`

Returns rows where the correlated subquery finds **at least one matching row**.

- **Short-circuits**: stops as soon as the first matching row is found.
- Faster than IN when the inner table is large and matches are common.
- SELECT 1 (or SELECT *) — the actual value doesn't matter, only existence.

---

### NOT IN — Rows NOT in a Set

\`\`\`sql
SELECT name FROM students
WHERE id NOT IN (SELECT student_id FROM enrollments);
\`\`\`

> **NULL Trap**: if the subquery returns any NULL, NOT IN returns NO rows at all (because x NOT IN {1, 2, NULL} is UNKNOWN for any x). Use NOT EXISTS instead when NULLs are possible.

---

### NOT EXISTS — Safe Alternative

\`\`\`sql
SELECT name FROM students s
WHERE NOT EXISTS (
  SELECT 1 FROM enrollments WHERE student_id = s.id
);
\`\`\`

NULL-safe — returns rows where no match exists.

---

### Comparison Table

| | IN | EXISTS | NOT IN | NOT EXISTS |
|---|---|---|---|---|
| Runs inner once | ✓ | No (correlated) | ✓ | No (correlated) |
| Short-circuits | No | ✓ | No | ✓ |
| NULL safe | Yes | Yes | **No** | **Yes** |

---

### Key Points

- Use EXISTS/NOT EXISTS when the subquery is large or correlated — they short-circuit.
- Avoid NOT IN when the subquery can contain NULLs.
- IN is fine for small static sets.`,

  schema: `CREATE TABLE students (id INTEGER, name TEXT, age INTEGER, gpa REAL, dept TEXT);
CREATE TABLE enrollments (student_id INTEGER, course_id INTEGER, grade TEXT);
INSERT INTO students VALUES (1,'Alice',20,3.8,'CS');
INSERT INTO students VALUES (2,'Bob',21,3.2,'EE');
INSERT INTO students VALUES (3,'Carol',19,3.9,'CS');
INSERT INTO students VALUES (4,'David',22,2.8,'ME');
INSERT INTO students VALUES (5,'Eve',20,3.5,'CS');
INSERT INTO enrollments VALUES (1,1,'A');
INSERT INTO enrollments VALUES (1,3,'B');
INSERT INTO enrollments VALUES (2,2,'A');
INSERT INTO enrollments VALUES (3,1,'A');`,

  starterCode: `-- Find students who are NOT enrolled in any course.
-- Use NOT EXISTS (safer than NOT IN).
-- Show: name, dept
-- Order by name ASC.

SELECT name, dept
FROM students s
WHERE NOT EXISTS (
  ...
)
ORDER BY name ASC;`,

  modelAnswer: `SELECT name, dept
FROM students s
WHERE NOT EXISTS (
  SELECT 1 FROM enrollments WHERE student_id = s.id
)
ORDER BY name ASC;`,

  testCases: [
    {
      input: '',
      expectedOutput: 'David|ME\nEve|CS',
      description: 'NOT EXISTS returns students with no enrollment records, sorted by name',
    },
  ],

  hints: [
    'The correlated subquery checks: SELECT 1 FROM enrollments WHERE student_id = s.id — replace s.id with the outer alias.',
    'NOT EXISTS returns a row when the inner subquery finds ZERO matching rows.',
    'David (id=4) and Eve (id=5) have no entries in enrollments, so they qualify.',
  ],

  complexity: null,
  tags: ['dbms', 'sql', 'exists', 'in', 'not-exists', 'subquery'],
};

export default lesson;
