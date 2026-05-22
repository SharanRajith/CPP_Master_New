const lesson = {
  id: 'm18-l2',
  title: 'LEFT JOIN & NULL Handling',
  module: 18,
  lessonNumber: 2,
  xpReward: 10,
  type: 'sql',
  content: `## LEFT JOIN & NULL Handling

A **LEFT JOIN** (also written as LEFT OUTER JOIN) returns **all rows from the left table** plus matched rows from the right table. When there is no match in the right table the right-side columns are filled with **NULL**.

### Syntax

\`\`\`sql
SELECT columns
FROM left_table l
LEFT JOIN right_table r ON l.key = r.key;
\`\`\`

---

### INNER vs LEFT JOIN — At a Glance

| Behaviour | INNER JOIN | LEFT JOIN |
|---|---|---|
| Matched rows | Included | Included |
| Left-only rows | Excluded | Included (right cols = NULL) |
| Right-only rows | Excluded | Excluded |

---

### Detecting Non-Matches with IS NULL

After a LEFT JOIN, rows from the left table that had no match will have NULL in every right-table column. You can filter for them with:

\`\`\`sql
WHERE r.key IS NULL
\`\`\`

This is the standard way to find "students who are not enrolled in any course".

---

### Replacing NULLs with COALESCE

\`COALESCE(value, fallback)\` returns the first non-NULL argument. Use it to display a friendly default instead of NULL:

\`\`\`sql
SELECT s.name, COALESCE(e.course_id, 'none') AS course
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id;
\`\`\`

---

### Counting with LEFT JOIN

\`COUNT(*)\` counts every row, including those with NULLs. \`COUNT(column)\` ignores NULLs. This distinction is critical after a LEFT JOIN:

\`\`\`sql
-- Correctly counts only actual enrollments (ignores NULL course_id rows)
SELECT s.name, COUNT(e.course_id) AS courses
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id, s.name
ORDER BY s.name;
\`\`\`

- \`COUNT(e.course_id)\` → 0 for students with no enrollments (NULL is not counted).
- \`COUNT(*)\` → 1 even for students with no enrollments (the NULL row itself is counted).

---

### GROUP BY Best Practice

When grouping after a LEFT JOIN, include the primary key of the left table in the GROUP BY (\`s.id\`) in addition to any display columns (\`s.name\`). This prevents incorrect aggregation if two students share the same name.

---

### Key Points

- LEFT JOIN preserves all rows from the left table regardless of matches.
- Unmatched right-side columns are NULL — use IS NULL to detect them.
- Use COALESCE to substitute readable defaults for NULL values.
- COUNT(column) skips NULLs; COUNT(*) does not — choose deliberately after a LEFT JOIN.`,

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

  starterCode: `-- Show every student's name and the number of courses they are enrolled in.
-- Students with zero enrollments should still appear (with count 0).
-- Order results by student name (A-Z).

SELECT ...`,

  modelAnswer: `SELECT s.name, COUNT(e.course_id) as courses
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id, s.name
ORDER BY s.name;`,

  testCases: [
    {
      input: '',
      expectedOutput: 'Alice|2\nBob|2\nCarol|2\nDavid|1\nEve|1',
      description: 'Returns all students with their enrollment count, including those with 0 enrollments, ordered by name',
    },
  ],

  hints: [
    'Use LEFT JOIN instead of INNER JOIN so that students with no enrollments are still included in the result.',
    'Use COUNT(e.course_id) rather than COUNT(*) — COUNT on a specific column ignores NULL, giving 0 for students with no enrollments.',
    'Group by s.id as well as s.name to handle potential duplicate names correctly: GROUP BY s.id, s.name.',
  ],

  complexity: null,
  tags: ['dbms', 'sql', 'joins', 'left-join', 'null', 'coalesce', 'aggregation'],
};

export default lesson;
