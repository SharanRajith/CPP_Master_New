const lesson = {
  id: 'm16-l8',
  title: 'Relational Algebra — Select & Project',
  module: 16,
  lessonNumber: 8,
  xpReward: 10,
  type: 'theory',
  content: `# Relational Algebra — Select & Project

## What is Relational Algebra?

Relational algebra is the formal mathematical language underlying SQL. Every SQL query can be expressed as a relational algebra expression. Understanding it deepens your ability to reason about query correctness and optimization.

---

## SELECT (σ) — Filter Rows

The **select** operation (σ) filters rows based on a condition. It is the relational algebra equivalent of SQL's WHERE clause.

**Notation**: σ_condition(R)

\`\`\`
σ_dept='CS'(Students)
\`\`\`

SQL equivalent:
\`\`\`sql
SELECT * FROM Students WHERE dept = 'CS';
\`\`\`

### Compound Conditions

\`\`\`
σ_dept='CS' ∧ gpa>3.5(Students)     -- AND
σ_dept='CS' ∨ dept='EE'(Students)   -- OR
σ_¬(dept='CS')(Students)            -- NOT
\`\`\`

SQL:
\`\`\`sql
SELECT * FROM Students WHERE dept = 'CS' AND gpa > 3.5;
\`\`\`

---

## PROJECT (π) — Select Columns

The **project** operation (π) selects specific columns and removes duplicates from the result.

**Notation**: π_col1,col2(R)

\`\`\`
π_name,gpa(Students)
\`\`\`

SQL equivalent:
\`\`\`sql
SELECT DISTINCT name, gpa FROM Students;
\`\`\`

> Note: relational algebra PROJECT always removes duplicates. SQL SELECT does NOT unless you add DISTINCT.

---

## Combining SELECT and PROJECT

Operations can be composed — apply them in sequence:

\`\`\`
π_name(σ_dept='CS'(Students))
\`\`\`

"Get the names of all CS students."

SQL:
\`\`\`sql
SELECT DISTINCT name FROM Students WHERE dept = 'CS';
\`\`\`

---

## Worked Examples

### Example 1 — Students with GPA above 3.7

\`\`\`
π_name,gpa(σ_gpa>3.7(Students))
\`\`\`

### Example 2 — CS courses with more than 3 credits

\`\`\`
π_title(σ_dept='CS' ∧ credits>3(Courses))
\`\`\`

### Example 3 — All unique departments

\`\`\`
π_dept(Students)
\`\`\`

SQL: \`SELECT DISTINCT dept FROM Students;\`

---

## Key Points

- σ (select) = WHERE clause — filters rows.
- π (project) = SELECT columns — filters columns.
- Composition: apply σ first to reduce rows, then π to reduce columns.
- PROJECT removes duplicates; SQL SELECT does not (use DISTINCT).
- These are the two most fundamental relational algebra operations.
`,
  hints: [],
  complexity: null,
  tags: ['dbms', 'relational-algebra', 'select', 'project', 'query-language', 'sql'],
};
export default lesson;
