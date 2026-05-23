const lesson = {
  id: 'm18-l5',
  title: 'Self Join & Cross Join',
  module: 18,
  lessonNumber: 5,
  xpReward: 10,
  type: 'sql',
  content: `## Self Join & Cross Join

### Self Join

A **self join** joins a table with itself. Use it when rows in the same table have a hierarchical or paired relationship.

To join a table with itself you must give each copy a **different alias**:

\`\`\`sql
SELECT a.col, b.col
FROM employees a
JOIN employees b ON a.manager_id = b.id;
\`\`\`

#### Classic use case — employee–manager pairs

\`\`\`sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
JOIN employees m ON e.manager_id = m.id;
\`\`\`

Each row in *e* is an employee; the matching row in *m* (same table) is that employee's manager.

---

### Cross Join

A **cross join** produces the **Cartesian product**: every row in the left table paired with every row in the right table.

\`\`\`sql
SELECT a.color, b.size
FROM colors a
CROSS JOIN sizes b;
\`\`\`

If *colors* has 3 rows and *sizes* has 4 rows, the result has **3 × 4 = 12 rows**.

| Use case | Example |
|---|---|
| Generate combinations | Pair every color with every size |
| Seed test data | Combine users × products |
| Calendar generation | Days × time slots |

> Cross joins have no ON condition — every combination is valid by definition.

---

### Key Points

- Self join: alias the same table twice and join on a column that references another row.
- Cross join: no ON clause; produces n × m rows.
- Self joins are often used for hierarchies, comparisons between rows in the same table.`,

  schema: `CREATE TABLE employees (
  id INTEGER, name TEXT, dept TEXT, salary INTEGER, manager_id INTEGER
);
INSERT INTO employees VALUES (1, 'Alice',  'Engineering', 90000, NULL);
INSERT INTO employees VALUES (2, 'Bob',    'Engineering', 70000, 1);
INSERT INTO employees VALUES (3, 'Carol',  'Engineering', 75000, 1);
INSERT INTO employees VALUES (4, 'David',  'HR',          60000, NULL);
INSERT INTO employees VALUES (5, 'Eve',    'HR',          55000, 4);
INSERT INTO employees VALUES (6, 'Frank',  'Engineering', 80000, 1);`,

  starterCode: `-- Use a self join to list each employee paired with their manager.
-- Show: employee_name, manager_name
-- Only include employees who HAVE a manager (exclude top-level).
-- Order by employee_name ASC.

SELECT ...`,

  modelAnswer: `SELECT e.name AS employee_name, m.name AS manager_name
FROM employees e
JOIN employees m ON e.manager_id = m.id
ORDER BY e.name ASC;`,

  testCases: [
    {
      input: '',
      expectedOutput: 'Bob|Alice\nCarol|Alice\nEve|David\nFrank|Alice',
      description: 'Self join returns employee–manager pairs sorted by employee name',
    },
  ],

  hints: [
    'Alias employees twice: FROM employees e JOIN employees m — one alias for the employee side, one for the manager side.',
    'The join condition connects the employee\'s manager_id to the manager\'s id: ON e.manager_id = m.id.',
    'Use SELECT e.name AS employee_name, m.name AS manager_name to label both columns clearly.',
  ],

  complexity: null,
  tags: ['dbms', 'sql', 'joins', 'self-join', 'cross-join'],
};

export default lesson;
