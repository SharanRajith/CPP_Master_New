const lesson = {
  id: 'm18-l6',
  title: 'Correlated Subqueries',
  module: 18,
  lessonNumber: 6,
  xpReward: 10,
  type: 'sql',
  content: `## Correlated Subqueries

### What Makes a Subquery "Correlated"?

A **correlated subquery** references a column from the **outer query**. It is re-evaluated for each row the outer query processes.

\`\`\`sql
SELECT name, salary
FROM employees e
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
  WHERE dept = e.dept   -- ← references outer alias e
);
\`\`\`

For every row in the outer query (each employee *e*), the subquery computes the average salary *in that employee's department* and checks whether the employee's salary exceeds it.

### Non-Correlated vs Correlated

| | Non-Correlated | Correlated |
|---|---|---|
| Outer reference | None | References outer row |
| Execution | Once | Once per outer row |
| Performance | Faster | Can be slow on large tables |

### Common Pattern — "Above Department Average"

\`\`\`sql
SELECT name, dept, salary
FROM employees e
WHERE salary > (
  SELECT AVG(salary) FROM employees WHERE dept = e.dept
);
\`\`\`

### Using EXISTS with a Correlated Subquery

\`\`\`sql
SELECT name
FROM students s
WHERE EXISTS (
  SELECT 1 FROM enrollments WHERE student_id = s.id
);
\`\`\`

Returns students who have at least one enrollment. EXISTS short-circuits as soon as one matching row is found.

### Key Points

- A correlated subquery references the outer table alias inside the inner SELECT.
- It runs once per outer row — powerful but potentially expensive.
- Commonly used with \`>\`, \`<\`, \`=\`, \`EXISTS\`, \`NOT EXISTS\`.
- Can often be rewritten as a JOIN for better performance.`,

  schema: `CREATE TABLE employees (
  id INTEGER, name TEXT, dept TEXT, salary INTEGER, manager_id INTEGER
);
INSERT INTO employees VALUES (1, 'Alice',  'Engineering', 90000, NULL);
INSERT INTO employees VALUES (2, 'Bob',    'Engineering', 70000, 1);
INSERT INTO employees VALUES (3, 'Carol',  'Engineering', 75000, 1);
INSERT INTO employees VALUES (4, 'David',  'HR',          60000, NULL);
INSERT INTO employees VALUES (5, 'Eve',    'HR',          55000, 4);
INSERT INTO employees VALUES (6, 'Frank',  'Engineering', 80000, 1);`,

  starterCode: `-- Find employees who earn MORE than the average salary in their department.
-- Show: name, dept, salary
-- Order by dept ASC, salary DESC.

SELECT name, dept, salary
FROM employees e
WHERE salary > (
  -- subquery here
)
ORDER BY dept ASC, salary DESC;`,

  modelAnswer: `SELECT name, dept, salary
FROM employees e
WHERE salary > (
  SELECT AVG(salary) FROM employees WHERE dept = e.dept
)
ORDER BY dept ASC, salary DESC;`,

  testCases: [
    {
      input: '',
      expectedOutput: 'Alice|Engineering|90000\nFrank|Engineering|80000\nDavid|HR|60000',
      description: 'Returns employees earning above their department average, sorted by dept then salary desc',
    },
  ],

  hints: [
    'The subquery must reference the outer alias: SELECT AVG(salary) FROM employees WHERE dept = e.dept — the e.dept part ties the inner query to the current outer row.',
    'The outer WHERE checks salary > (result of correlated subquery).',
    'Engineering average = (90000+70000+75000+80000)/4 = 78750 → Alice(90k) and Frank(80k) qualify. HR average = (60000+55000)/2 = 57500 → David(60k) qualifies.',
  ],

  complexity: null,
  tags: ['dbms', 'sql', 'subquery', 'correlated-subquery', 'exists'],
};

export default lesson;
