const lesson = {
  id: 'm17-l5',
  title: 'UPDATE & DELETE',
  module: 17,
  lessonNumber: 5,
  xpReward: 10,
  type: 'sql',
  content: `## UPDATE & DELETE

So far you have only read data. Now learn how to **modify** existing rows and **remove** rows you no longer need.

### UPDATE — Changing Existing Rows

\`\`\`sql
UPDATE table_name
SET    column1 = value1, column2 = value2
WHERE  condition;
\`\`\`

- \`SET\` lists every column you want to change and its new value.
- \`WHERE\` restricts which rows are affected.

**Example:**

\`\`\`sql
UPDATE students SET gpa = 4.0 WHERE name = 'Alice';
\`\`\`

Only Alice's row is updated; all others stay the same.

> **Warning:** An \`UPDATE\` without \`WHERE\` changes **every row** in the table. Always double-check your condition before running.

### DELETE — Removing Rows

\`\`\`sql
DELETE FROM table_name WHERE condition;
\`\`\`

**Example:**

\`\`\`sql
DELETE FROM students WHERE id = 4;
\`\`\`

This permanently removes the row where \`id = 4\`.

> **Warning:** \`DELETE FROM students;\` (no \`WHERE\`) deletes every row. There is no undo in SQLite — be careful!

### Running Multiple Statements

SQL scripts can contain several statements separated by semicolons. They execute in order, top to bottom. This lets you perform an update, a delete, and then a select — all in one script:

\`\`\`sql
UPDATE students SET gpa = 3.5 WHERE name = 'Bob';
DELETE FROM students WHERE id = 4;
SELECT name, gpa FROM students ORDER BY id;
\`\`\`

The \`SELECT\` at the end acts as a **verification step** — it shows you the state of the table after the mutations.

### Summary Table

| Statement | Purpose                         | Key Clause |
|-----------|---------------------------------|------------|
| \`UPDATE\` | Change values in existing rows  | \`SET … WHERE\` |
| \`DELETE\` | Remove rows from a table        | \`WHERE\`   |
| \`SELECT\` | Read / verify current state     | —          |

> **Tip:** In production systems, wrap destructive statements in a transaction (\`BEGIN; … COMMIT;\`) so you can roll back on mistakes. For this exercise, a plain script is fine.
`,
  schema: `CREATE TABLE students (id INTEGER, name TEXT, age INTEGER, gpa REAL, dept TEXT);
INSERT INTO students VALUES (1,'Alice',20,3.8,'CS');
INSERT INTO students VALUES (2,'Bob',21,3.2,'EE');
INSERT INTO students VALUES (3,'Carol',19,3.9,'CS');
INSERT INTO students VALUES (4,'David',22,2.8,'ME');
INSERT INTO students VALUES (5,'Eve',20,3.5,'CS');`,
  starterCode: `-- Task: Modify the students table, then verify the result.
--
-- Write SQL that does the following in order:
--   1. UPDATE Bob's gpa to 3.5 (use WHERE name = 'Bob')
--   2. DELETE the student with id = 4 (David)
--   3. SELECT name, gpa FROM students ORDER BY id

-- Write your SQL below:
`,
  modelAnswer: `UPDATE students SET gpa = 3.5 WHERE name = 'Bob';
DELETE FROM students WHERE id = 4;
SELECT name, gpa FROM students ORDER BY id;`,
  testCases: [
    {
      input: '',
      expectedOutput: 'Alice|3.8\nBob|3.5\nCarol|3.9\nEve|3.5',
      description: "Should show remaining students with updated GPAs after Bob's update and David's deletion, ordered by id",
    },
  ],
  hints: [
    "UPDATE syntax: UPDATE students SET gpa = 3.5 WHERE name = 'Bob'; — don't forget the WHERE clause or every row will be changed.",
    'DELETE syntax: DELETE FROM students WHERE id = 4; — always specify a WHERE condition to target only the intended row.',
    'You can run all three statements (UPDATE, DELETE, SELECT) together in one script — they execute top-to-bottom and the SELECT output is what gets tested.',
  ],
  complexity: null,
  tags: ['dbms', 'sql', 'update', 'delete', 'dml', 'mutation'],
};
export default lesson;
