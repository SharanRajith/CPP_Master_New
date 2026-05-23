const lesson = {
  id: 'm18-l7',
  title: 'Common Table Expressions (CTEs)',
  module: 18,
  lessonNumber: 7,
  xpReward: 10,
  type: 'sql',
  content: `## Common Table Expressions (CTEs)

### What is a CTE?

A **Common Table Expression** (CTE) is a named temporary result set defined at the top of a query using the \`WITH\` keyword. Think of it as a named subquery you can reference multiple times.

\`\`\`sql
WITH cte_name AS (
  SELECT ...
)
SELECT * FROM cte_name;
\`\`\`

The CTE exists only for the duration of the query.

### Why Use CTEs?

| Benefit | Description |
|---|---|
| Readability | Break complex queries into named steps |
| Reusability | Reference the same CTE multiple times |
| Debugging | Test each CTE in isolation |
| Recursion | CTEs can reference themselves (recursive CTEs) |

### Multiple CTEs

Chain them with commas:

\`\`\`sql
WITH dept_avg AS (
  SELECT dept, AVG(salary) AS avg_sal
  FROM employees
  GROUP BY dept
),
top_earners AS (
  SELECT e.name, e.dept, e.salary
  FROM employees e
  JOIN dept_avg d ON e.dept = d.dept
  WHERE e.salary > d.avg_sal
)
SELECT * FROM top_earners ORDER BY salary DESC;
\`\`\`

### Recursive CTE

Used for hierarchical data (e.g. org charts, bill of materials):

\`\`\`sql
WITH RECURSIVE hierarchy AS (
  -- Base case: root nodes
  SELECT id, name, manager_id, 0 AS level
  FROM employees WHERE manager_id IS NULL

  UNION ALL

  -- Recursive step
  SELECT e.id, e.name, e.manager_id, h.level + 1
  FROM employees e
  JOIN hierarchy h ON e.manager_id = h.id
)
SELECT * FROM hierarchy;
\`\`\`

### Key Points

- \`WITH cte_name AS (...)\` defines the CTE before the main SELECT.
- Multiple CTEs: separate with commas.
- CTEs improve readability and can replace deeply nested subqueries.
- Recursive CTEs are powerful for tree/graph traversal.`,

  schema: `CREATE TABLE employees (
  id INTEGER, name TEXT, dept TEXT, salary INTEGER, manager_id INTEGER
);
INSERT INTO employees VALUES (1, 'Alice',  'Engineering', 90000, NULL);
INSERT INTO employees VALUES (2, 'Bob',    'Engineering', 70000, 1);
INSERT INTO employees VALUES (3, 'Carol',  'Engineering', 75000, 1);
INSERT INTO employees VALUES (4, 'David',  'HR',          60000, NULL);
INSERT INTO employees VALUES (5, 'Eve',    'HR',          55000, 4);
INSERT INTO employees VALUES (6, 'Frank',  'Engineering', 80000, 1);`,

  starterCode: `-- Use TWO CTEs:
--   1. dept_stats: compute AVG(salary) per department
--   2. high_earners: employees earning >= 1.1× their dept average
-- Final SELECT: name, dept, salary from high_earners ORDER BY salary DESC.

WITH dept_stats AS (
  ...
),
high_earners AS (
  ...
)
SELECT name, dept, salary FROM high_earners ORDER BY salary DESC;`,

  modelAnswer: `WITH dept_stats AS (
  SELECT dept, AVG(salary) AS avg_sal
  FROM employees
  GROUP BY dept
),
high_earners AS (
  SELECT e.name, e.dept, e.salary
  FROM employees e
  JOIN dept_stats d ON e.dept = d.dept
  WHERE e.salary >= d.avg_sal * 1.1
)
SELECT name, dept, salary FROM high_earners ORDER BY salary DESC;`,

  testCases: [
    {
      input: '',
      expectedOutput: 'Alice|Engineering|90000\nFrank|Engineering|80000\nDavid|HR|60000',
      description: 'CTE chain returns high earners (>=10% above dept avg) sorted by salary desc',
    },
  ],

  hints: [
    'The first CTE uses GROUP BY dept with AVG(salary): SELECT dept, AVG(salary) AS avg_sal FROM employees GROUP BY dept.',
    'The second CTE joins employees with dept_stats on dept, then filters WHERE e.salary >= d.avg_sal * 1.1.',
    'The final SELECT just reads from high_earners — no extra joins needed.',
  ],

  complexity: null,
  tags: ['dbms', 'sql', 'cte', 'with', 'advanced-sql'],
};

export default lesson;
