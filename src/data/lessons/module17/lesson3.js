const lesson = {
  id: 'm17-l3',
  title: 'ORDER BY, LIMIT & DISTINCT',
  module: 17,
  lessonNumber: 3,
  xpReward: 10,
  type: 'sql',
  content: `## ORDER BY, LIMIT & DISTINCT

This lesson covers three clauses that give you fine-grained control over **how many rows** you get back and **which duplicates** to suppress.

### ORDER BY — Sorting Results

You already know \`ORDER BY col\` sorts ascending. Key details:

\`\`\`sql
-- Ascending (default, A→Z / 0→9)
SELECT name, gpa FROM students ORDER BY gpa;

-- Descending (Z→A / 9→0)
SELECT name, gpa FROM students ORDER BY gpa DESC;
\`\`\`

You can sort by **multiple columns**:

\`\`\`sql
ORDER BY dept ASC, gpa DESC   -- sort by dept first, then by gpa within each dept
\`\`\`

### LIMIT — Capping Row Count

\`LIMIT n\` keeps only the first \`n\` rows **after** sorting. This is perfect for "top-N" queries:

\`\`\`sql
-- Top 2 students by GPA
SELECT name, gpa
FROM   students
ORDER BY gpa DESC
LIMIT 2;
\`\`\`

Always place \`LIMIT\` **after** \`ORDER BY\` in your query.

### DISTINCT — Removing Duplicates

\`DISTINCT\` eliminates duplicate rows from the result:

\`\`\`sql
-- How many unique departments exist?
SELECT DISTINCT dept FROM students;
\`\`\`

Without \`DISTINCT\`, CS would appear three times (once per CS student). With it, each department name appears only once.

\`DISTINCT\` applies to the **entire row** of selected columns, not just the first one:

\`\`\`sql
SELECT DISTINCT dept, age FROM students;
-- A (dept, age) pair is kept once even if two students share both.
\`\`\`

### Full Clause Order

\`\`\`
SELECT [DISTINCT] columns
FROM   table
WHERE  condition
ORDER BY column [ASC|DESC]
LIMIT  n;
\`\`\`

Every clause is optional except \`SELECT ... FROM ...\`. When present, they must appear in this order.

> **Tip:** \`LIMIT\` without \`ORDER BY\` returns an arbitrary set of rows — the database chooses which ones. Always pair them when you need a meaningful "top N."
`,
  schema: `CREATE TABLE students (id INTEGER, name TEXT, age INTEGER, gpa REAL, dept TEXT);
INSERT INTO students VALUES (1,'Alice',20,3.8,'CS');
INSERT INTO students VALUES (2,'Bob',21,3.2,'EE');
INSERT INTO students VALUES (3,'Carol',19,3.9,'CS');
INSERT INTO students VALUES (4,'David',22,2.8,'ME');
INSERT INTO students VALUES (5,'Eve',20,3.5,'CS');`,
  starterCode: `-- Task: Find the top 3 students by GPA.
--
-- Write a query that:
--   1. Selects only the 'name' and 'gpa' columns
--   2. Orders results by gpa in DESCENDING order (highest first)
--   3. Returns only the top 3 rows

-- Write your SQL below:
`,
  modelAnswer: `SELECT name, gpa FROM students ORDER BY gpa DESC LIMIT 3;`,
  testCases: [
    {
      input: '',
      expectedOutput: 'Carol|3.9\nAlice|3.8\nEve|3.5',
      description: 'Should return the top 3 students by GPA in descending order',
    },
  ],
  hints: [
    'Use ORDER BY gpa DESC to sort from the highest GPA to the lowest — DESC means descending.',
    'Place LIMIT 3 at the very end of the query to keep only the first 3 rows after sorting.',
    'Select only the two required columns: SELECT name, gpa — extra columns will cause the output to mismatch.',
  ],
  complexity: null,
  tags: ['dbms', 'sql', 'order-by', 'limit', 'distinct', 'top-n'],
};
export default lesson;
