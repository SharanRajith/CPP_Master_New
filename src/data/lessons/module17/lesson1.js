const lesson = {
  id: 'm17-l1',
  title: 'CREATE TABLE & INSERT',
  module: 17,
  lessonNumber: 1,
  xpReward: 10,
  type: 'sql',
  content: `## CREATE TABLE & INSERT

Every relational database stores data in **tables**. Before you can store anything, you need to define the table's structure — its **columns** and their **data types**.

### CREATE TABLE Syntax

\`\`\`sql
CREATE TABLE table_name (
  column1 datatype,
  column2 datatype,
  column3 datatype
);
\`\`\`

SQLite supports several core data types:

| Type      | Description                          | Example          |
|-----------|--------------------------------------|------------------|
| \`INTEGER\` | Whole numbers                        | 1, 42, -7        |
| \`TEXT\`    | Strings of any length                | 'Alice', 'CS'    |
| \`REAL\`    | Floating-point (decimal) numbers     | 3.14, 999.99     |
| \`BLOB\`    | Raw binary data                      | file contents    |

### INSERT INTO Syntax

Once the table exists, you add rows with \`INSERT INTO\`:

\`\`\`sql
INSERT INTO table_name VALUES (val1, val2, val3);
\`\`\`

Values must appear in the **same order** as the columns were declared. Text values must be wrapped in **single quotes**; numbers must not be.

You can also name the columns explicitly (useful when inserting partial rows):

\`\`\`sql
INSERT INTO table_name (column1, column3) VALUES (val1, val3);
\`\`\`

### SELECT * — Reading All Rows

After inserting data, use \`SELECT * FROM table_name;\` to read every column and every row back out. The \`*\` is a wildcard meaning "all columns."

\`\`\`sql
SELECT * FROM products;
\`\`\`

### Putting It Together

\`\`\`sql
CREATE TABLE products (
  id      INTEGER,
  name    TEXT,
  price   REAL,
  stock   INTEGER
);

INSERT INTO products VALUES (1, 'Laptop',   999.99, 50);
INSERT INTO products VALUES (2, 'Mouse',     29.99, 200);

SELECT * FROM products;
\`\`\`

This outputs every row in insertion order, with columns separated by \`|\` in the test harness.

> **Tip:** In SQLite you do not need a semicolon after \`CREATE TABLE\` to run it interactively, but it is good practice to always include one.
`,
  schema: ``,
  starterCode: `-- Task: Build a small products catalogue from scratch.
--
-- 1. CREATE TABLE products with columns:
--      id      INTEGER
--      name    TEXT
--      price   REAL
--      stock   INTEGER
--
-- 2. INSERT the following three rows:
--      (1, 'Laptop',   999.99, 50)
--      (2, 'Mouse',     29.99, 200)
--      (3, 'Keyboard',  79.99, 150)
--
-- 3. SELECT * FROM products;

-- Write your SQL below:
`,
  modelAnswer: `CREATE TABLE products (
  id    INTEGER,
  name  TEXT,
  price REAL,
  stock INTEGER
);

INSERT INTO products VALUES (1, 'Laptop',   999.99, 50);
INSERT INTO products VALUES (2, 'Mouse',     29.99, 200);
INSERT INTO products VALUES (3, 'Keyboard',  79.99, 150);

SELECT * FROM products;`,
  testCases: [
    {
      input: '',
      expectedOutput: '1|Laptop|999.99|50\n2|Mouse|29.99|200\n3|Keyboard|79.99|150',
      description: 'products table should contain all three rows in insertion order',
    },
  ],
  hints: [
    'CREATE TABLE syntax: CREATE TABLE name (col1 TYPE, col2 TYPE, ...); — list every column with its data type inside parentheses.',
    'INSERT syntax: INSERT INTO products VALUES (1, \'Laptop\', 999.99, 50); — text values need single quotes, numbers do not.',
    'To read all columns and rows use SELECT * FROM products; — the asterisk (*) means "all columns".',
  ],
  complexity: null,
  tags: ['dbms', 'sql', 'ddl', 'create-table', 'insert'],
};
export default lesson;
