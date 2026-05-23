const lesson = {
  id: 'm18-l10',
  title: 'FULL OUTER JOIN & Set Operations',
  module: 18,
  lessonNumber: 10,
  xpReward: 10,
  type: 'sql',
  content: `## FULL OUTER JOIN & Set Operations

### FULL OUTER JOIN

Returns all rows from **both** tables. Where there is no match, NULLs fill in the missing side.

\`\`\`sql
SELECT a.col, b.col
FROM table_a a
FULL OUTER JOIN table_b b ON a.id = b.id;
\`\`\`

Think of it as LEFT JOIN ∪ RIGHT JOIN.

> **SQLite note**: SQLite does not natively support FULL OUTER JOIN. Simulate it with:
\`\`\`sql
SELECT * FROM a LEFT JOIN b ON a.id = b.id
UNION
SELECT * FROM a RIGHT JOIN b ON a.id = b.id;
\`\`\`
Or: LEFT JOIN UNION ALL RIGHT JOIN … WHERE a.id IS NULL.

---

### Set Operations

Set operations combine the result sets of two SELECT statements.

| Operation | Meaning |
|---|---|
| UNION | All rows from both, **duplicates removed** |
| UNION ALL | All rows from both, **duplicates kept** |
| INTERSECT | Rows that appear in **both** |
| EXCEPT | Rows in the first that are **not** in the second |

**Rules**: both SELECTs must return the same number of columns with compatible types.

\`\`\`sql
-- Students in CS OR EE
SELECT name FROM students WHERE dept = 'CS'
UNION
SELECT name FROM students WHERE dept = 'EE';

-- Students enrolled in BOTH course 1 and course 3
SELECT student_id FROM enrollments WHERE course_id = 1
INTERSECT
SELECT student_id FROM enrollments WHERE course_id = 3;

-- Students in CS who are NOT in EE (trivial with our data, but shows syntax)
SELECT name FROM students WHERE dept = 'CS'
EXCEPT
SELECT name FROM students WHERE dept = 'EE';
\`\`\`

---

### UNION vs UNION ALL

\`\`\`sql
-- UNION removes duplicates (slower — must sort/hash)
SELECT dept FROM students UNION SELECT dept FROM courses;

-- UNION ALL keeps all rows (faster)
SELECT dept FROM students UNION ALL SELECT dept FROM courses;
\`\`\`

---

### Key Points

- FULL OUTER JOIN = left + right, NULLs on non-matching sides.
- UNION removes duplicates; UNION ALL preserves them.
- INTERSECT finds common rows; EXCEPT subtracts.
- All set operations require matching column counts and compatible types.`,

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
INSERT INTO enrollments VALUES (4,4,'C');`,

  starterCode: `-- Find student_ids who are enrolled in BOTH course 1 AND course 3.
-- Use INTERSECT.
-- Show only: student_id
-- Order by student_id ASC.

SELECT student_id FROM enrollments WHERE course_id = 1
INTERSECT
SELECT student_id FROM enrollments WHERE course_id = 3
ORDER BY student_id ASC;`,

  modelAnswer: `SELECT student_id FROM enrollments WHERE course_id = 1
INTERSECT
SELECT student_id FROM enrollments WHERE course_id = 3
ORDER BY student_id ASC;`,

  testCases: [
    {
      input: '',
      expectedOutput: '1\n3',
      description: 'INTERSECT returns student_ids enrolled in both course 1 and course 3',
    },
  ],

  hints: [
    'INTERSECT returns rows common to both SELECT results — students in course 1 AND course 3.',
    'Alice (id=1) is in course 1 and 3. Carol (id=3) is in course 1 and 3. Bob (id=2) is only in course 2.',
    'Add ORDER BY student_id ASC after the second SELECT to sort the result.',
  ],

  complexity: null,
  tags: ['dbms', 'sql', 'union', 'intersect', 'except', 'set-operations', 'full-outer-join'],
};

export default lesson;
