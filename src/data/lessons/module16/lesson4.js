const lesson = {
  id: 'm16-l4',
  title: 'Relational Algebra',
  module: 16,
  lessonNumber: 4,
  xpReward: 10,
  type: 'theory',
  content: `# Relational Algebra

**Relational Algebra** is the theoretical foundation of SQL. It defines a set of operations on relations (tables) that produce new relations as output. Every SQL query you write is secretly compiled down to a relational algebra expression by the query optimizer. Understanding relational algebra means you understand **why** SQL works the way it does.

We will use two sample tables throughout this lesson:

**Students**

| student_id | name       | dept | age |
|---|---|---|---|
| 101        | Alice      | CS   | 20  |
| 102        | Bob        | EC   | 21  |
| 103        | Carol      | CS   | 19  |
| 104        | Dave       | ME   | 22  |

**Enrollment**

| student_id | course_id | grade |
|---|---|---|
| 101        | CS101     | A     |
| 101        | CS201     | B     |
| 102        | EC101     | A     |
| 103        | CS101     | A     |

---

## 1. SELECT — σ (Filter Rows)

The SELECT operation (σ, sigma) filters rows that satisfy a condition. It is the WHERE clause of SQL.

**Notation:** σ_condition(Relation)

**Example:** Get all CS students.

\`\`\`
σ dept='CS' (Students)
\`\`\`

**SQL equivalent:**
\`\`\`sql
SELECT * FROM Students WHERE dept = 'CS';
\`\`\`

**Result:**

| student_id | name  | dept | age |
|---|---|---|---|
| 101        | Alice | CS   | 20  |
| 103        | Carol | CS   | 19  |

---

## 2. PROJECT — π (Filter Columns)

The PROJECT operation (π, pi) keeps only specified columns. It is the column list in SELECT.

**Notation:** π_attribute_list(Relation)

**Example:** Get only names and departments.

\`\`\`
π name, dept (Students)
\`\`\`

**SQL equivalent:**
\`\`\`sql
SELECT name, dept FROM Students;
\`\`\`

PROJECT also automatically eliminates duplicate rows in pure relational algebra (SQL needs DISTINCT for this).

---

## 3. UNION — ∪

Combines rows from two relations. Both relations must have the **same schema** (same number of columns with compatible domains — called **union compatibility**). Duplicates are removed.

**Notation:** R ∪ S

**Example:** Get IDs of students who are in CS or enrolled in CS101.

\`\`\`
π student_id (σ dept='CS' (Students))
∪
π student_id (σ course_id='CS101' (Enrollment))
\`\`\`

**SQL equivalent:**
\`\`\`sql
SELECT student_id FROM Students WHERE dept = 'CS'
UNION
SELECT student_id FROM Enrollment WHERE course_id = 'CS101';
\`\`\`

---

## 4. INTERSECTION — ∩

Returns rows that appear in BOTH relations. Requires union compatibility.

**Notation:** R ∩ S

**SQL equivalent:**
\`\`\`sql
SELECT student_id FROM Students WHERE dept = 'CS'
INTERSECT
SELECT student_id FROM Enrollment WHERE course_id = 'CS101';
\`\`\`

Result: students who are CS students AND enrolled in CS101 → {101, 103}.

---

## 5. DIFFERENCE — −

Returns rows in the first relation that are NOT in the second. Requires union compatibility.

**Notation:** R − S

**Example:** CS students who are NOT enrolled in CS101.

\`\`\`
π student_id (σ dept='CS' (Students))
−
π student_id (σ course_id='CS101' (Enrollment))
\`\`\`

**SQL equivalent:**
\`\`\`sql
SELECT student_id FROM Students WHERE dept = 'CS'
EXCEPT
SELECT student_id FROM Enrollment WHERE course_id = 'CS101';
\`\`\`

Result: {} (empty — both Alice and Carol are in CS101).

---

## 6. CARTESIAN PRODUCT — × (Cross Product)

Combines every row from R with every row from S. If R has m rows and S has n rows, the result has m × n rows. Rarely useful alone — it becomes powerful combined with SELECT.

**Notation:** R × S

**SQL equivalent:**
\`\`\`sql
SELECT * FROM Students, Enrollment;
-- or: SELECT * FROM Students CROSS JOIN Enrollment;
\`\`\`

A 4-row × 4-row tables produces 16 rows. Most are meaningless — that is why we follow it with a SELECT.

---

## 7. NATURAL JOIN — ⋈

The most useful operation. Automatically joins two tables on all **common attribute names**, keeping only rows where the common attribute values match, and eliminating duplicate columns.

**Notation:** R ⋈ S

**Example:** Join Students and Enrollment on student_id.

\`\`\`
Students ⋈ Enrollment
\`\`\`

**SQL equivalent:**
\`\`\`sql
SELECT * FROM Students NATURAL JOIN Enrollment;
-- or: SELECT * FROM Students JOIN Enrollment USING (student_id);
\`\`\`

**Result:**

| student_id | name  | dept | age | course_id | grade |
|---|---|---|---|---|---|
| 101        | Alice | CS   | 20  | CS101     | A     |
| 101        | Alice | CS   | 20  | CS201     | B     |
| 102        | Bob   | EC   | 21  | EC101     | A     |
| 103        | Carol | CS   | 19  | CS101     | A     |

Note: Dave (104) is excluded because he has no enrollment rows — NATURAL JOIN is equivalent to an INNER JOIN.

---

## 8. RENAME — ρ (Rho)

Renames a relation or its attributes. Essential when joining a table with itself (self-join) to avoid name conflicts.

**Notation:** ρ new_name(old_name) or ρ new_name(A1→B1, A2→B2)(Relation)

**SQL equivalent:**
\`\`\`sql
SELECT * FROM Students AS S1;
\`\`\`

---

## Quick Reference Table

| Operation | Symbol | SQL Equivalent | What It Does |
|---|---|---|---|
| Select | σ | WHERE | Filter rows |
| Project | π | SELECT cols | Filter columns |
| Union | ∪ | UNION | Combine, remove dups |
| Intersection | ∩ | INTERSECT | Rows in both |
| Difference | − | EXCEPT / MINUS | Rows in first, not second |
| Cartesian Product | × | CROSS JOIN | All row combinations |
| Natural Join | ⋈ | NATURAL JOIN | Join on common columns |
| Rename | ρ | AS / alias | Rename relation/attributes |

---

## Worked Example — Combining Multiple Operations

**Question:** Find the names of CS students who have scored an 'A' grade in any course.

**Step 1 — Filter CS students:**
\`\`\`
CS_Students = σ dept='CS' (Students)
\`\`\`

**Step 2 — Filter A-grade enrollments:**
\`\`\`
A_Enrollments = σ grade='A' (Enrollment)
\`\`\`

**Step 3 — Join to link names with grades:**
\`\`\`
Joined = CS_Students ⋈ A_Enrollments
\`\`\`

**Step 4 — Project only the name column:**
\`\`\`
π name (Joined)
\`\`\`

**Full expression:**
\`\`\`
π name ( σ dept='CS'(Students) ⋈ σ grade='A'(Enrollment) )
\`\`\`

**SQL equivalent:**
\`\`\`sql
SELECT DISTINCT S.name
FROM Students S
JOIN Enrollment E ON S.student_id = E.student_id
WHERE S.dept = 'CS' AND E.grade = 'A';
\`\`\`

**Result:** Alice, Carol.

---

## Summary

Relational algebra gives you a mathematical language to express data queries precisely. SELECT and PROJECT are the workhorses. UNION/INTERSECTION/DIFFERENCE handle set operations. NATURAL JOIN is the most common multi-table operation. CARTESIAN PRODUCT is powerful but needs to be filtered. RENAME enables self-joins and aliases. Every SQL query maps to one or more of these eight operations — understanding them makes you a far better SQL programmer.
`,
  hints: [],
  complexity: null,
  tags: ['dbms', 'relational-algebra', 'sql', 'query-language', 'select', 'project', 'join'],
};
export default lesson;
