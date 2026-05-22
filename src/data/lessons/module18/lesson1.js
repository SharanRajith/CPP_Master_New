const lesson = {
  id: 'm18-l1',
  title: 'INNER JOIN',
  module: 18,
  lessonNumber: 1,
  xpReward: 10,
  type: 'sql',
  content: `## INNER JOIN

An **INNER JOIN** combines rows from two (or more) tables where the join condition is satisfied. Rows that have **no matching counterpart** in the other table are excluded from the result.

### Syntax

\`\`\`sql
SELECT columns
FROM table_a a
INNER JOIN table_b b ON a.foreign_key = b.primary_key;
\`\`\`

The keyword \`INNER\` is optional — plain \`JOIN\` defaults to an inner join.

---

### Why Aliases?

When querying multiple tables it is best practice to give each table a short **alias** (e.g. \`students s\`, \`courses c\`). This lets you prefix column names (\`s.name\`, \`c.title\`) to avoid ambiguity and keep queries concise.

---

### Joining Three Tables

To connect \`students\` to \`courses\` you must go through the bridge table \`enrollments\`:

\`\`\`sql
SELECT s.name, c.title
FROM students s
INNER JOIN enrollments e ON s.id = e.student_id   -- step 1: students ↔ enrollments
INNER JOIN courses    c ON e.course_id = c.id      -- step 2: enrollments ↔ courses
ORDER BY s.name, c.title;
\`\`\`

Think of it as a chain:
\`students\` → (via \`student_id\`) → \`enrollments\` → (via \`course_id\`) → \`courses\`

---

### How the Engine Evaluates a JOIN

1. The engine takes each row in the **left** table.
2. It looks for rows in the **right** table where the ON condition is true.
3. Matched pairs are combined into a single result row.
4. Unmatched rows are **dropped** (this is the defining behaviour of INNER JOIN).

---

### Result Shape

Given the sample data, a student who is enrolled in two courses produces **two rows** — one per course. This is expected and correct: joins produce one row per matched pair.

---

### Common Mistakes

| Mistake | Effect |
|---|---|
| Forgetting the ON clause | Cartesian product — every row × every row |
| Joining on the wrong key | Incorrect or empty results |
| Not qualifying ambiguous columns | SQL error: "column name is ambiguous" |

---

### Key Points

- INNER JOIN returns **only matching rows**.
- Use table aliases to write cleaner, unambiguous queries.
- Chain multiple JOINs to traverse many-to-many relationships through a bridge table.
- ORDER BY applies after all JOINs are resolved.`,

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

  starterCode: `-- List each student's name alongside their enrolled course titles.
-- Order results by student name (A-Z), then course title (A-Z).
-- Hint: you need three tables — students, enrollments, and courses.

SELECT ...`,

  modelAnswer: `SELECT s.name, c.title
FROM students s
INNER JOIN enrollments e ON s.id = e.student_id
INNER JOIN courses c ON e.course_id = c.id
ORDER BY s.name, c.title;`,

  testCases: [
    {
      input: '',
      expectedOutput:
        'Alice|Data Structures\nAlice|Database Systems\nBob|Circuit Theory\nBob|Database Systems\nCarol|Data Structures\nCarol|Database Systems\nDavid|Thermodynamics\nEve|Machine Learning',
      description: 'Returns each enrolled student paired with their course title, ordered by name then title',
    },
  ],

  hints: [
    'Use INNER JOIN … ON to specify which columns link the two tables together, e.g. ON s.id = e.student_id.',
    'Give each table a short alias (s for students, e for enrollments, c for courses) and prefix column names like s.name and c.title to avoid ambiguity.',
    'Chain a second INNER JOIN to bring in courses: after joining students to enrollments, join enrollments to courses on e.course_id = c.id.',
  ],

  complexity: null,
  tags: ['dbms', 'sql', 'joins', 'inner-join', 'foreign-keys'],
};

export default lesson;
