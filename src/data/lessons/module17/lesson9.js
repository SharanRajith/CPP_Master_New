const lesson = {
  id: 'm17-l9',
  title: 'NULL Handling — IS NULL, COALESCE',
  module: 17,
  lessonNumber: 9,
  xpReward: 10,
  type: 'sql',
  content: `# NULL Handling — IS NULL, COALESCE

## What is NULL?

NULL means **unknown / missing value** — it is not zero, not an empty string. Any arithmetic or comparison with NULL returns NULL.

\`\`\`sql
SELECT NULL = NULL;    -- NULL  (not TRUE!)
SELECT NULL + 5;       -- NULL
SELECT NULL OR TRUE;   -- TRUE  (special case)
\`\`\`

---

## IS NULL / IS NOT NULL

The only correct way to test for NULL:

\`\`\`sql
-- Find employees without a manager
SELECT name FROM employees WHERE manager_id IS NULL;

-- Find employees who do have a manager
SELECT name FROM employees WHERE manager_id IS NOT NULL;
\`\`\`

Never use \`= NULL\` — it always returns NULL (no rows matched).

---

## COALESCE — Return First Non-NULL

\`COALESCE(a, b, c, ...)\` returns the first non-NULL argument:

\`\`\`sql
-- Show 'N/A' when phone is missing
SELECT name, COALESCE(phone, 'N/A') AS phone FROM contacts;

-- Use bonus if set, else commission, else 0
SELECT name, COALESCE(bonus, commission, 0) AS payout
FROM employees;
\`\`\`

---

## NULLIF — Return NULL on Equality

\`NULLIF(a, b)\` returns NULL if a = b, else returns a. Useful to avoid division by zero:

\`\`\`sql
SELECT sales / NULLIF(days_open, 0) AS daily_avg
FROM stores;
\`\`\`

---

## NULL in Aggregates

Aggregates (COUNT, SUM, AVG) **ignore NULLs** except \`COUNT(*)\`:

\`\`\`sql
SELECT COUNT(*),        -- counts all rows
       COUNT(phone),    -- counts only non-NULL phones
       AVG(salary)      -- averages non-NULL salaries
FROM employees;
\`\`\`

---

## Practice

The \`employees\` table has: \`name\`, \`salary\`, \`bonus\` (nullable).

Return each employee's name and their effective pay = salary + COALESCE(bonus, 0). Also filter to show only rows where bonus IS NULL.
`,
  starterCode: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary REAL,
  bonus REAL
);
INSERT INTO employees VALUES
  (1, 'Alice', 80000, 5000),
  (2, 'Bob',   60000, NULL),
  (3, 'Carol', 70000, NULL),
  (4, 'Dave',  90000, 10000),
  (5, 'Eve',   55000, NULL);

-- Write your query here:
`,
  modelAnswer: `SELECT name,
       salary + COALESCE(bonus, 0) AS effective_pay
FROM employees
WHERE bonus IS NULL;`,
  hints: [
    'Use COALESCE(bonus, 0) to treat NULL bonus as 0 in the addition.',
    'Use WHERE bonus IS NULL (not WHERE bonus = NULL) to filter rows where bonus is missing.',
    'Alias the computed column as effective_pay.',
  ],
  complexity: null,
  tags: ['sql', 'null', 'coalesce', 'is-null', 'nullif'],
};
export default lesson;
