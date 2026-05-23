const lesson = {
  id: 'm18-l8',
  title: 'Window Functions — ROW_NUMBER & RANK',
  module: 18,
  lessonNumber: 8,
  xpReward: 10,
  type: 'sql',
  content: `## Window Functions — ROW_NUMBER & RANK

### What are Window Functions?

**Window functions** perform a calculation across a set of rows related to the current row — without collapsing them into a single output row (unlike GROUP BY + aggregate).

\`\`\`sql
function_name() OVER (
  PARTITION BY column   -- split rows into groups
  ORDER BY column       -- define row order within each group
)
\`\`\`

The result is added as an extra column alongside every row.

---

### ROW_NUMBER()

Assigns a unique sequential integer starting at 1 within each partition.

\`\`\`sql
SELECT name, dept, salary,
       ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS row_num
FROM employees;
\`\`\`

Ties receive **different** numbers (arbitrary ordering among equals).

---

### RANK()

Like ROW_NUMBER but **ties share the same rank**, and the next rank skips.

\`\`\`sql
SELECT name, salary,
       RANK() OVER (ORDER BY salary DESC) AS rnk
FROM employees;
\`\`\`

Example: if two employees both score rank 2, the next employee gets rank 4 (rank 3 is skipped).

---

### DENSE_RANK()

Ties share the same rank, but the **next rank does NOT skip**.

| Function | Ties | Gaps |
|---|---|---|
| ROW_NUMBER | different | never |
| RANK | same | yes |
| DENSE_RANK | same | no |

---

### Common Use — Top-N per Group

\`\`\`sql
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn
  FROM employees
)
SELECT * FROM ranked WHERE rn = 1;
\`\`\`

Returns the highest-paid employee in each department.

---

### Key Points

- Window functions don't change the number of rows (unlike GROUP BY).
- Use PARTITION BY to define the window group; ORDER BY defines ordering within it.
- ROW_NUMBER → unique rank; RANK → skipping rank on ties; DENSE_RANK → no gaps.`,

  schema: `CREATE TABLE employees (
  id INTEGER, name TEXT, dept TEXT, salary INTEGER, manager_id INTEGER
);
INSERT INTO employees VALUES (1, 'Alice',  'Engineering', 90000, NULL);
INSERT INTO employees VALUES (2, 'Bob',    'Engineering', 70000, 1);
INSERT INTO employees VALUES (3, 'Carol',  'Engineering', 75000, 1);
INSERT INTO employees VALUES (4, 'David',  'HR',          60000, NULL);
INSERT INTO employees VALUES (5, 'Eve',    'HR',          55000, 4);
INSERT INTO employees VALUES (6, 'Frank',  'Engineering', 80000, 1);`,

  starterCode: `-- Rank employees within their department by salary (highest = 1).
-- Use ROW_NUMBER() partitioned by dept, ordered by salary DESC.
-- Show: name, dept, salary, row_num
-- Order final result by dept ASC, row_num ASC.

SELECT name, dept, salary,
       ROW_NUMBER() OVER (...) AS row_num
FROM employees
ORDER BY dept ASC, row_num ASC;`,

  modelAnswer: `SELECT name, dept, salary,
       ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS row_num
FROM employees
ORDER BY dept ASC, row_num ASC;`,

  testCases: [
    {
      input: '',
      expectedOutput: 'Alice|Engineering|90000|1\nFrank|Engineering|80000|2\nCarol|Engineering|75000|3\nBob|Engineering|70000|4\nDavid|HR|60000|1\nEve|HR|55000|2',
      description: 'ROW_NUMBER partitioned by dept ordered by salary desc, then sorted by dept and row_num',
    },
  ],

  hints: [
    'OVER (PARTITION BY dept ORDER BY salary DESC) — PARTITION BY splits by department, ORDER BY salary DESC makes the highest salary rank 1.',
    'ROW_NUMBER() always assigns unique numbers even when salaries are equal.',
    'The final ORDER BY dept ASC, row_num ASC sorts the output, not the window calculation.',
  ],

  complexity: null,
  tags: ['dbms', 'sql', 'window-functions', 'row-number', 'rank', 'advanced-sql'],
};

export default lesson;
