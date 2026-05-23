const lesson = {
  id: 'm17-l10',
  title: 'Aliases & Computed Columns',
  module: 17,
  lessonNumber: 10,
  xpReward: 10,
  type: 'sql',
  content: `# Aliases & Computed Columns

## Column Aliases (AS)

Rename a column in the result set using \`AS\`:

\`\`\`sql
SELECT name AS employee_name,
       salary AS monthly_salary
FROM employees;
\`\`\`

\`AS\` is optional but recommended for readability:
\`\`\`sql
SELECT name employee_name FROM employees;   -- also works
\`\`\`

---

## Computed Columns

Any expression in the SELECT list creates a computed column:

\`\`\`sql
SELECT name,
       salary * 12            AS annual_salary,
       salary * 0.1           AS bonus_estimate,
       salary + salary * 0.1  AS total_comp
FROM employees;
\`\`\`

---

## Table Aliases

Short aliases for table names — essential in JOINs:

\`\`\`sql
SELECT e.name, d.dept_name
FROM employees AS e
JOIN departments AS d ON e.dept_id = d.id;
\`\`\`

---

## Using Aliases in ORDER BY

Column aliases defined in SELECT can be used in ORDER BY (but NOT in WHERE or HAVING — those run before SELECT):

\`\`\`sql
SELECT name, salary * 12 AS annual
FROM employees
ORDER BY annual DESC;    -- OK

-- This would fail:
WHERE annual > 100000    -- ERROR: alias not available yet
\`\`\`

---

## Computed Column Examples

\`\`\`sql
-- Price with tax
SELECT product_name,
       price,
       price * 1.18           AS price_with_gst,
       ROUND(price * 1.18, 2) AS price_rounded
FROM products;

-- Name formatting
SELECT first_name || ' ' || last_name AS full_name,
       UPPER(SUBSTR(first_name, 1, 1)) || '.' AS initials
FROM users;
\`\`\`

---

## Practice

The \`items\` table has: \`name\`, \`price\`, \`quantity\`.

Return: item name, price, total value (price × quantity) aliased as \`total_value\`, and only items where total value > 200. Sort by total_value descending.
`,
  starterCode: `CREATE TABLE items (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price REAL,
  quantity INTEGER
);
INSERT INTO items VALUES
  (1, 'Pen',      1.5,  50),
  (2, 'Notebook', 5.0,  30),
  (3, 'Laptop',   800,   1),
  (4, 'Mouse',    25,    3),
  (5, 'Keyboard', 45,    5);

-- Write your query here:
`,
  modelAnswer: `SELECT name,
       price,
       price * quantity AS total_value
FROM items
WHERE price * quantity > 200
ORDER BY price * quantity DESC;`,
  hints: [
    'Compute total_value as price * quantity in the SELECT list and alias it with AS total_value.',
    'You cannot use the alias in WHERE — repeat the expression: WHERE price * quantity > 200.',
    'Use ORDER BY price * quantity DESC (or just ORDER BY total_value DESC — SQLite allows this).',
  ],
  complexity: null,
  tags: ['sql', 'aliases', 'computed-columns', 'as', 'expressions'],
};
export default lesson;
