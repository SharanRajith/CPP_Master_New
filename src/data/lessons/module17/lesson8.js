const lesson = {
  id: 'm17-l8',
  title: 'String Functions',
  module: 17,
  lessonNumber: 8,
  xpReward: 10,
  type: 'sql',
  content: `# String Functions

## Core String Functions

### Length
\`\`\`sql
SELECT name, LENGTH(name) AS name_len FROM employees;
\`\`\`

### Case Conversion
\`\`\`sql
SELECT UPPER('hello');   -- HELLO
SELECT LOWER('WORLD');   -- world
\`\`\`

### Substring
\`\`\`sql
-- SUBSTR(string, start, length)  — 1-indexed
SELECT SUBSTR('Database', 1, 4);   -- Data
SELECT SUBSTR('Database', 5);      -- base (to end)
\`\`\`

### Trim Whitespace
\`\`\`sql
SELECT TRIM('  hello  ');        -- 'hello'
SELECT LTRIM('  hello');         -- 'hello'
SELECT RTRIM('hello  ');         -- 'hello'
\`\`\`

### Concatenation
\`\`\`sql
SELECT first_name || ' ' || last_name AS full_name FROM employees;
-- or: CONCAT(first_name, ' ', last_name)  -- MySQL/PostgreSQL
\`\`\`

### Replace
\`\`\`sql
SELECT REPLACE('hello world', 'world', 'SQL');  -- 'hello SQL'
\`\`\`

### Position / INSTR
\`\`\`sql
SELECT INSTR('database', 'base');   -- 5  (1-indexed position)
\`\`\`

---

## Pattern Matching

\`\`\`sql
-- LIKE: % = any chars, _ = one char
SELECT * FROM users WHERE email LIKE '%@gmail.com';
SELECT * FROM users WHERE name  LIKE 'A__';   -- A + exactly 2 chars
\`\`\`

---

## Practice

The \`products\` table has: \`name\`, \`sku\`.

Return the product name in uppercase, the first 3 chars of the sku as \`sku_prefix\`, and only rows where the name contains 'Pro'.
`,
  starterCode: `CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT,
  sku TEXT
);
INSERT INTO products VALUES
  (1, 'ProBook 450',  'PB-450-X'),
  (2, 'EliteDesk',    'ED-800-Y'),
  (3, 'ProDisplay',   'PD-270-Z'),
  (4, 'WorkStation',  'WS-100-A'),
  (5, 'ProTablet',    'PT-110-B');

-- Write your query here:
`,
  modelAnswer: `SELECT UPPER(name) AS name_upper,
       SUBSTR(sku, 1, 3) AS sku_prefix
FROM products
WHERE name LIKE '%Pro%';`,
  hints: [
    'Use UPPER(name) to convert the name to uppercase.',
    'Use SUBSTR(sku, 1, 3) to extract the first 3 characters of sku.',
    'Add WHERE name LIKE \'%Pro%\' to filter rows containing "Pro".',
  ],
  complexity: null,
  tags: ['sql', 'string-functions', 'like', 'substr', 'upper', 'lower'],
};
export default lesson;
