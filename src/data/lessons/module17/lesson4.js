const lesson = {
  id: 'm17-l4',
  title: 'Aggregate Functions & GROUP BY',
  module: 17,
  lessonNumber: 4,
  xpReward: 10,
  type: 'sql',
  content: `## Aggregate Functions & GROUP BY

Aggregate functions **collapse multiple rows into a single summary value**. They are the foundation of analytical SQL queries.

### Common Aggregate Functions

| Function    | Description                          |
|-------------|--------------------------------------|
| \`COUNT(*)\` | Number of rows                       |
| \`SUM(col)\` | Total of a numeric column            |
| \`AVG(col)\` | Mean (average) of a numeric column   |
| \`MAX(col)\` | Largest value in a column            |
| \`MIN(col)\` | Smallest value in a column           |

\`\`\`sql
-- Overall statistics
SELECT COUNT(*), AVG(gpa), MAX(gpa) FROM students;
\`\`\`

### GROUP BY — Aggregating Per Group

Without \`GROUP BY\`, an aggregate collapses **all rows** into one. \`GROUP BY\` splits the rows into groups first, then applies the aggregate to each group separately:

\`\`\`sql
SELECT dept, COUNT(*) AS num_students
FROM   students
GROUP BY dept;
\`\`\`

This returns one row per department with the count of students in it.

**Rule:** Every column in \`SELECT\` must either be:
- Listed in \`GROUP BY\`, **or**
- Wrapped in an aggregate function.

### Column Aliases with AS

\`AS\` gives an expression a readable name in the output:

\`\`\`sql
SELECT dept, AVG(gpa) AS avg_gpa FROM students GROUP BY dept;
\`\`\`

### ROUND() — Controlling Decimal Places

\`AVG()\` often produces long decimal results. Use \`ROUND(value, decimals)\` to trim them:

\`\`\`sql
SELECT dept, ROUND(AVG(gpa), 2) AS avg_gpa
FROM   students
GROUP BY dept;
\`\`\`

### Full Example

\`\`\`sql
SELECT   dept,
         COUNT(*)          AS students,
         ROUND(AVG(gpa),2) AS avg_gpa,
         MAX(gpa)          AS top_gpa
FROM     students
GROUP BY dept
ORDER BY dept;
\`\`\`

> **Tip:** \`ORDER BY\` after \`GROUP BY\` sorts the grouped results. Use it to make output predictable — especially important when your query is tested automatically.
`,
  schema: `CREATE TABLE students (id INTEGER, name TEXT, age INTEGER, gpa REAL, dept TEXT);
INSERT INTO students VALUES (1,'Alice',20,3.8,'CS');
INSERT INTO students VALUES (2,'Bob',21,3.2,'EE');
INSERT INTO students VALUES (3,'Carol',19,3.9,'CS');
INSERT INTO students VALUES (4,'David',22,2.8,'ME');
INSERT INTO students VALUES (5,'Eve',20,3.5,'CS');`,
  starterCode: `-- Task: Calculate average GPA per department.
--
-- Write a query that:
--   1. Selects the 'dept' column
--   2. Calculates the average GPA per department, rounded to 2 decimal places,
--      and aliases it as avg_gpa
--   3. Groups the results by department
--   4. Orders the results by dept (ascending)

-- Write your SQL below:
`,
  modelAnswer: `SELECT dept, ROUND(AVG(gpa), 2) AS avg_gpa FROM students GROUP BY dept ORDER BY dept;`,
  testCases: [
    {
      input: '',
      expectedOutput: 'CS|3.73\nEE|3.2\nME|2.8',
      description: 'Should return average GPA per department rounded to 2 decimal places, sorted by department name',
    },
  ],
  hints: [
    'Use AVG(gpa) to compute the mean GPA — wrap it in ROUND(AVG(gpa), 2) to limit to two decimal places.',
    'Add GROUP BY dept so the average is calculated separately for each department rather than across all students.',
    'End the query with ORDER BY dept to sort the departments alphabetically and produce deterministic output.',
  ],
  complexity: null,
  tags: ['dbms', 'sql', 'aggregate', 'group-by', 'avg', 'round'],
};
export default lesson;
