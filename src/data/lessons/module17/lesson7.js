const lesson = {
  id: 'm17-l7',
  title: 'CASE WHEN Expressions',
  module: 17,
  lessonNumber: 7,
  xpReward: 10,
  type: 'sql',
  content: `# CASE WHEN Expressions

## What is CASE WHEN?

\`CASE WHEN\` adds conditional logic directly inside a SQL query — like an if/else in the result set.

\`\`\`sql
SELECT name,
       salary,
       CASE
         WHEN salary >= 100000 THEN 'Senior'
         WHEN salary >= 60000  THEN 'Mid'
         ELSE 'Junior'
       END AS level
FROM employees;
\`\`\`

---

## Simple vs Searched CASE

### Searched CASE (condition per branch)
\`\`\`sql
CASE WHEN score >= 90 THEN 'A'
     WHEN score >= 80 THEN 'B'
     WHEN score >= 70 THEN 'C'
     ELSE 'F'
END
\`\`\`

### Simple CASE (compare one value)
\`\`\`sql
CASE status
  WHEN 'active'   THEN 'Active User'
  WHEN 'inactive' THEN 'Inactive'
  ELSE 'Unknown'
END
\`\`\`

---

## CASE with Aggregates

\`\`\`sql
-- Count completed vs pending per user
SELECT customer_id,
       COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed,
       COUNT(CASE WHEN status = 'pending'   THEN 1 END) AS pending
FROM orders
GROUP BY customer_id;
\`\`\`

---

## Practice

The \`students\` table has: \`name\`, \`gpa\`.

Add a column \`grade_band\`: 'Distinction' if gpa >= 3.7, 'Merit' if >= 3.0, else 'Pass'.
`,
  starterCode: `CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT,
  gpa REAL
);
INSERT INTO students VALUES
  (1, 'Alice', 3.9),
  (2, 'Bob',   3.4),
  (3, 'Carol', 2.8),
  (4, 'Dave',  3.7),
  (5, 'Eve',   2.5);

-- Write your query here:
`,
  modelAnswer: `SELECT name,
       gpa,
       CASE
         WHEN gpa >= 3.7 THEN 'Distinction'
         WHEN gpa >= 3.0 THEN 'Merit'
         ELSE 'Pass'
       END AS grade_band
FROM students;`,
  hints: [
    'Use a CASE WHEN ... THEN ... END expression in the SELECT list.',
    'Check the highest threshold (>= 3.7) first, then >= 3.0, then use ELSE for the remaining rows.',
    'Give the CASE expression an alias with AS grade_band.',
  ],
  complexity: null,
  tags: ['sql', 'case-when', 'conditional', 'expressions'],
};
export default lesson;
