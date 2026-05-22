const lesson = {
  id: 'm17-l2',
  title: 'SELECT & WHERE',
  module: 17,
  lessonNumber: 2,
  xpReward: 10,
  type: 'sql',
  content: `## SELECT & WHERE

The real power of SQL comes from **filtering** rows so you only retrieve the data you need. The \`WHERE\` clause lets you specify conditions that each row must satisfy.

### Selecting Specific Columns

Instead of \`SELECT *\` (all columns), you can list only the columns you care about:

\`\`\`sql
SELECT name, gpa FROM students;
\`\`\`

This returns only the \`name\` and \`gpa\` columns for every row.

### Filtering Rows with WHERE

\`\`\`sql
SELECT column1, column2
FROM   table_name
WHERE  condition;
\`\`\`

The condition is evaluated for each row; only rows where it is **true** are returned.

**Comparison operators:**

| Operator | Meaning               |
|----------|-----------------------|
| \`=\`      | Equal to              |
| \`<>\` or \`!=\` | Not equal to    |
| \`<\`      | Less than             |
| \`>\`      | Greater than          |
| \`<=\`     | Less than or equal    |
| \`>=\`     | Greater than or equal |

**Examples:**

\`\`\`sql
-- Students in the CS department
SELECT name, gpa FROM students WHERE dept = 'CS';

-- Students with GPA above 3.5
SELECT name, gpa FROM students WHERE gpa > 3.5;
\`\`\`

Text comparisons use single quotes and are **case-sensitive** in most databases.

### Sorting Results with ORDER BY

\`\`\`sql
SELECT name, gpa
FROM   students
WHERE  dept = 'CS'
ORDER BY name;
\`\`\`

\`ORDER BY column\` sorts ascending (A → Z, 0 → 9) by default. Add \`DESC\` for descending order.

### Combining WHERE and ORDER BY

The clause order always follows: \`SELECT → FROM → WHERE → ORDER BY\`. You cannot swap them.

\`\`\`sql
SELECT name, gpa
FROM   students
WHERE  dept = 'CS'
ORDER BY gpa DESC;   -- highest GPA first
\`\`\`

> **Remember:** string literals in SQL always use **single quotes** (\`'CS'\`), not double quotes.
`,
  schema: `CREATE TABLE students (id INTEGER, name TEXT, age INTEGER, gpa REAL, dept TEXT);
INSERT INTO students VALUES (1,'Alice',20,3.8,'CS');
INSERT INTO students VALUES (2,'Bob',21,3.2,'EE');
INSERT INTO students VALUES (3,'Carol',19,3.9,'CS');
INSERT INTO students VALUES (4,'David',22,2.8,'ME');
INSERT INTO students VALUES (5,'Eve',20,3.5,'CS');`,
  starterCode: `-- Task: Retrieve CS students sorted alphabetically.
--
-- Write a query that:
--   1. Selects only the 'name' and 'gpa' columns
--   2. Filters rows to only the 'CS' department
--   3. Orders results by name (ascending, A → Z)

-- Write your SQL below:
`,
  modelAnswer: `SELECT name, gpa FROM students WHERE dept = 'CS' ORDER BY name;`,
  testCases: [
    {
      input: '',
      expectedOutput: 'Alice|3.8\nCarol|3.9\nEve|3.5',
      description: 'Should return name and gpa for CS students sorted alphabetically by name',
    },
  ],
  hints: [
    'Use WHERE dept = \'CS\' to filter rows — text values must be wrapped in single quotes.',
    'Add ORDER BY name at the end of the query to sort results alphabetically (ascending is the default).',
    'Only list the columns you need: SELECT name, gpa — not SELECT * — so that the output matches the expected format.',
  ],
  complexity: null,
  tags: ['dbms', 'sql', 'select', 'where', 'order-by', 'filter'],
};
export default lesson;
