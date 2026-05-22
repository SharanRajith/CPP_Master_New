const lesson = {
  id: 'm16-l2',
  title: 'Tables, Keys & Constraints',
  module: 16,
  lessonNumber: 2,
  xpReward: 10,
  type: 'theory',
  content: `# Tables, Keys & Constraints

The relational model organises data into **tables** (also called **relations**). Every table has a fixed structure and every value stored in it must obey a set of rules called **constraints**. Getting keys and constraints right is the difference between a database that protects your data and one that silently stores garbage.

## Anatomy of a Table

| Term | Meaning |
|---|---|
| **Relation / Table** | A 2-D structure of rows and columns |
| **Tuple / Row / Record** | One entry in the table (one student) |
| **Attribute / Column / Field** | One property being tracked (student name) |
| **Domain** | The set of allowed values for an attribute (e.g., age must be an integer 0–150) |
| **Degree** | Number of columns in the table |
| **Cardinality** | Number of rows currently in the table |

### Example: Students Table

| student_id | name       | dept_id | age |
|---|---|---|---|
| 101        | Alice Rao  | CS      | 20  |
| 102        | Bob Patel  | EC      | 21  |
| 103        | Carol Sen  | CS      | 22  |

Each row is a **tuple**. There are 4 attributes (degree = 4). There are 3 rows (cardinality = 3).

## Types of Keys

Keys are the most critical concept in relational databases. They uniquely identify rows and link tables together.

| Key Type | Definition | Example |
|---|---|---|
| **Super Key** | Any set of attributes that uniquely identifies a tuple | {student_id}, {student_id, name}, {student_id, name, age} |
| **Candidate Key** | Minimal super key — removing any attribute breaks uniqueness | {student_id}, {email} |
| **Primary Key** | The chosen candidate key for the table | student_id |
| **Alternate Key** | A candidate key that was NOT chosen as primary key | email |
| **Composite Key** | A primary key made of two or more attributes | (student_id, course_id) in an Enrollment table |
| **Foreign Key** | An attribute that references the primary key of another table | dept_id in Students → dept_id in Departments |

### Super Key vs Candidate Key — The Minimal Rule
{student_id, name} is a super key because the combination is unique — but it is **not** a candidate key because you can remove "name" and still have uniqueness. {student_id} alone is the minimal set — that is the candidate key.

## Primary Key in Detail

A primary key must satisfy two properties:
- **Unique** — no two rows can have the same value.
- **Not Null** — every row must have a value; NULL is not allowed.

\`\`\`
Students Table
┌─────────────┬────────────┬─────────┬─────┐
│ student_id  │ name       │ dept_id │ age │
│ (PK)        │            │ (FK)    │     │
├─────────────┼────────────┼─────────┼─────┤
│ 101         │ Alice Rao  │ CS      │ 20  │
│ 102         │ Bob Patel  │ EC      │ 21  │
└─────────────┴────────────┴─────────┴─────┘

Departments Table
┌─────────┬──────────────────────┐
│ dept_id │ dept_name            │
│ (PK)    │                      │
├─────────┼──────────────────────┤
│ CS      │ Computer Science     │
│ EC      │ Electronics          │
└─────────┴──────────────────────┘
\`\`\`

## Foreign Key & Referential Integrity

A **foreign key** is an attribute in one table that points to the primary key of another table. In the example above, \`dept_id\` in Students references \`dept_id\` in Departments.

**Referential Integrity** means the database refuses to accept a foreign key value that does not exist in the referenced table. If you try to insert a student with \`dept_id = 'ME'\` but Departments has no row for 'ME', the insert is rejected automatically.

This prevents **orphan records** — students whose department has been deleted, leaving them pointing at nothing.

## Composite Key Example

Consider an **Enrollment** table where a student can enrol in many courses and a course can have many students. Neither \`student_id\` alone nor \`course_id\` alone is unique in this table — but the **combination** is:

| student_id | course_id | grade |
|---|---|---|
| 101        | CS101     | A     |
| 101        | CS102     | B     |
| 102        | CS101     | A     |

Primary Key = **(student_id, course_id)** — this is a composite key.

## Constraints

Constraints are rules enforced by the DBMS on every INSERT and UPDATE operation.

| Constraint | What it Does | Example |
|---|---|---|
| **NOT NULL** | Column must always have a value | name NOT NULL |
| **UNIQUE** | All values in the column must differ (NULLs may be allowed) | email UNIQUE |
| **PRIMARY KEY** | NOT NULL + UNIQUE; identifies each row | student_id PRIMARY KEY |
| **FOREIGN KEY** | Value must exist in referenced table | dept_id REFERENCES Departments(dept_id) |
| **CHECK** | Value must satisfy a condition | age CHECK (age >= 18) |
| **DEFAULT** | Inserts a default value if none is provided | status DEFAULT 'active' |

### Why Constraints Matter

Without constraints, nothing stops someone from inserting a student with age = -5, a NULL name, or a department code that doesn't exist. Constraints push data validation **into the database layer**, so it works regardless of which application writes the data.

## Summary

- A table is made of rows (tuples) and columns (attributes), each with a defined domain.
- A **candidate key** is the minimal unique identifier; the chosen one becomes the **primary key**.
- A **foreign key** links tables and referential integrity keeps those links valid.
- Constraints (NOT NULL, UNIQUE, CHECK) act as automatic guards on every write operation.

Mastering keys and constraints is essential before you can design a schema that avoids data anomalies.
`,
  hints: [],
  complexity: null,
  tags: ['dbms', 'relational-model', 'keys', 'constraints', 'primary-key', 'foreign-key'],
};
export default lesson;
