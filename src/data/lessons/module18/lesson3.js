const lesson = {
  id: 'm18-l3',
  title: 'Subqueries',
  module: 18,
  lessonNumber: 3,
  xpReward: 10,
  type: 'sql',
  content: `## Subqueries

A **subquery** (also called an inner query or nested query) is a SELECT statement embedded inside another SQL statement. The outer query uses the result of the inner query.

### Syntax — Subquery in WHERE

\`\`\`sql
SELECT column
FROM table
WHERE column operator (SELECT ... FROM ...);
\`\`\`

The subquery is always wrapped in parentheses. It is evaluated first, and its result is passed to the outer WHERE clause.

---

### Scalar Subqueries

A **scalar subquery** returns exactly **one row and one column** — a single value. It can be used anywhere a literal value is expected:

\`\`\`sql
-- Find students whose GPA is above the class average
SELECT name, gpa
FROM students
WHERE gpa > (SELECT AVG(gpa) FROM students)
ORDER BY gpa DESC;
\`\`\`

Here \`(SELECT AVG(gpa) FROM students)\` computes the class average (3.44) and the outer query compares each student's GPA against that number.

---

### Subquery Locations

| Location | Example | Notes |
|---|---|---|
| WHERE | \`WHERE x > (SELECT MAX(x) …)\` | Most common; value or list comparison |
| FROM | \`FROM (SELECT …) AS sub\` | Derived table; must have an alias |
| SELECT | \`SELECT (SELECT COUNT(*) …)\` | Scalar only; returns one value per row |
| HAVING | \`HAVING COUNT(*) > (SELECT …)\` | Filter groups against aggregated subquery |

---

### Subqueries Returning a List — IN

When the subquery returns multiple rows, use IN:

\`\`\`sql
-- Find students enrolled in the 'CS' department courses
SELECT name FROM students
WHERE id IN (
  SELECT student_id FROM enrollments
  WHERE course_id IN (SELECT id FROM courses WHERE dept = 'CS')
);
\`\`\`

---

### Correlated Subqueries

A **correlated subquery** references a column from the outer query. It is re-evaluated for each row of the outer query:

\`\`\`sql
-- For each student, find those whose GPA is above their department's average
SELECT name, gpa, dept
FROM students s_outer
WHERE gpa > (
  SELECT AVG(gpa)
  FROM students s_inner
  WHERE s_inner.dept = s_outer.dept   -- references outer query
);
\`\`\`

Correlated subqueries can be powerful but may be slower on large tables because they run once per outer row.

---

### Subquery vs JOIN

| | Subquery | JOIN |
|---|---|---|
| Readability | Often clearer for "check existence" patterns | Better for retrieving columns from both tables |
| Performance | Can be slower (especially correlated) | Often faster; optimiser can merge loops |
| Use case | Scalar comparisons, IN/EXISTS checks | Combining data from multiple tables |

---

### Key Points

- Subqueries are enclosed in parentheses and evaluated before the outer query.
- A scalar subquery must return exactly one value — if it returns more rows, SQL raises an error.
- Use IN when the subquery returns a list of values.
- Correlated subqueries reference the outer query and run once per outer row.`,

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

  starterCode: `-- Find all students whose GPA is above the class average.
-- Show their name and gpa, ordered by gpa descending.
-- Hint: use a scalar subquery to compute the average.

SELECT ...`,

  modelAnswer: `SELECT name, gpa
FROM students
WHERE gpa > (SELECT AVG(gpa) FROM students)
ORDER BY gpa DESC;`,

  testCases: [
    {
      input: '',
      expectedOutput: 'Carol|3.9\nAlice|3.8\nEve|3.5',
      description: 'Returns students with GPA above the class average (3.44), ordered by GPA descending',
    },
  ],

  hints: [
    'Write the subquery first: (SELECT AVG(gpa) FROM students) — this returns the single average value 3.44.',
    'Place the subquery inside the WHERE clause: WHERE gpa > (SELECT AVG(gpa) FROM students).',
    'Add ORDER BY gpa DESC at the end of the outer query to sort from highest to lowest GPA.',
  ],

  complexity: null,
  tags: ['dbms', 'sql', 'subqueries', 'scalar-subquery', 'where', 'aggregation'],
};

export default lesson;
