const lesson = {
  id: 'm17-l6',
  title: 'HAVING Clause',
  module: 17,
  lessonNumber: 6,
  xpReward: 10,
  type: 'sql',
  content: `# HAVING Clause

## What is HAVING?

\`HAVING\` filters **groups** after \`GROUP BY\` is applied — think of it as a WHERE clause for aggregated results.

\`\`\`sql
SELECT dept, COUNT(*) AS total
FROM employees
GROUP BY dept
HAVING COUNT(*) > 5;
\`\`\`

Returns only departments that have more than 5 employees.

---

## WHERE vs HAVING

| | WHERE | HAVING |
|---|---|---|
| Filters | Individual rows | Groups |
| Runs | Before GROUP BY | After GROUP BY |
| Can use aggregates? | No | Yes |

\`\`\`sql
-- Wrong: aggregate in WHERE
SELECT dept, AVG(salary) FROM employees
WHERE AVG(salary) > 60000   -- ERROR
GROUP BY dept;

-- Correct: aggregate in HAVING
SELECT dept, AVG(salary) FROM employees
GROUP BY dept
HAVING AVG(salary) > 60000;
\`\`\`

---

## Combining WHERE and HAVING

\`\`\`sql
SELECT dept, COUNT(*) AS cnt
FROM employees
WHERE hire_year >= 2020       -- filter rows first
GROUP BY dept
HAVING COUNT(*) >= 3;         -- then filter groups
\`\`\`

---

## Practice

The \`orders\` table has: \`customer_id\`, \`amount\`, \`status\`.

Find customers who have placed more than 2 orders with a total amount above 500.
`,
  starterCode: `-- orders(id, customer_id, amount, status)
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  amount REAL,
  status TEXT
);
INSERT INTO orders VALUES
  (1, 1, 120, 'completed'),
  (2, 1, 200, 'completed'),
  (3, 1, 250, 'completed'),
  (4, 2, 80,  'pending'),
  (5, 2, 90,  'completed'),
  (6, 3, 500, 'completed'),
  (7, 3, 300, 'completed'),
  (8, 3, 400, 'completed');

-- Write your query here:
`,
  modelAnswer: `SELECT customer_id,
       COUNT(*) AS order_count,
       SUM(amount) AS total_amount
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 2 AND SUM(amount) > 500;`,
  hints: [
    'Use GROUP BY customer_id to group each customer\'s orders together.',
    'Use COUNT(*) > 2 in the HAVING clause to filter customers with more than 2 orders.',
    'Add AND SUM(amount) > 500 to the HAVING clause to also filter by total amount.',
  ],
  complexity: null,
  tags: ['sql', 'having', 'group-by', 'aggregate', 'filter'],
};
export default lesson;
