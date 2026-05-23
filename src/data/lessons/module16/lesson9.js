const lesson = {
  id: 'm16-l9',
  title: 'Relational Algebra — Join & Union',
  module: 16,
  lessonNumber: 9,
  xpReward: 10,
  type: 'theory',
  content: `# Relational Algebra — Join & Union

## Natural Join (⋈)

The **natural join** combines two relations on columns with the same name, keeping only rows where those columns match.

**Notation**: R ⋈ S

\`\`\`
Students ⋈ Enrollments
\`\`\`

Joins on all shared column names (e.g., \`student_id\`), removes duplicate columns.

SQL equivalent:
\`\`\`sql
SELECT * FROM Students NATURAL JOIN Enrollments;
\`\`\`

> Use with caution — it silently joins on ALL matching column names.

---

## Theta Join (⋈_θ)

A **theta join** combines two relations on any condition:

\`\`\`
Students ⋈_{Students.gpa > Threshold.min_gpa} Threshold
\`\`\`

SQL:
\`\`\`sql
SELECT * FROM Students, Threshold
WHERE Students.gpa > Threshold.min_gpa;
\`\`\`

---

## Equijoin

A theta join where the condition is equality:

\`\`\`
Students ⋈_{Students.dept_id = Departments.id} Departments
\`\`\`

SQL:
\`\`\`sql
SELECT * FROM Students
JOIN Departments ON Students.dept_id = Departments.id;
\`\`\`

---

## Outer Joins

| Type | Keeps |
|---|---|
| Left outer join (⟕) | All rows from left relation |
| Right outer join (⟖) | All rows from right relation |
| Full outer join (⟗) | All rows from both |

Missing values are filled with **NULL**.

SQL:
\`\`\`sql
-- Left outer join
SELECT * FROM Students LEFT JOIN Enrollments
ON Students.id = Enrollments.student_id;
\`\`\`

---

## Union (∪), Intersection (∩), Difference (−)

These set operations require **union-compatible** relations — same number of columns, matching types.

### Union
Returns all rows from both relations (removes duplicates):
\`\`\`
CS_Students ∪ EE_Students
\`\`\`
SQL: \`SELECT * FROM CS_Students UNION SELECT * FROM EE_Students;\`

### Intersection
Returns only rows present in both:
\`\`\`
CS_Students ∩ Honor_Students
\`\`\`
SQL: \`SELECT * FROM CS_Students INTERSECT SELECT * FROM Honor_Students;\`

### Difference
Returns rows in the first but not the second:
\`\`\`
All_Students − Enrolled_Students
\`\`\`
SQL: \`SELECT * FROM All_Students EXCEPT SELECT * FROM Enrolled_Students;\`

---

## Worked Example

**"Get names of students enrolled in course 101"**

\`\`\`
π_name(σ_course_id=101(Students ⋈ Enrollments))
\`\`\`

SQL:
\`\`\`sql
SELECT DISTINCT s.name
FROM Students s
JOIN Enrollments e ON s.id = e.student_id
WHERE e.course_id = 101;
\`\`\`

---

## Key Points

- Natural join joins on matching column names — predictable only when you control the schema.
- Theta / equijoin: explicit condition — always prefer over natural join in practice.
- Outer joins preserve unmatched rows as NULLs.
- Set operations (∪, ∩, −) require union-compatible schemas.
- Compose operations: σ → ⋈ → π to build complex queries step by step.
`,
  hints: [],
  complexity: null,
  tags: ['dbms', 'relational-algebra', 'join', 'union', 'set-operations', 'outer-join'],
};
export default lesson;
