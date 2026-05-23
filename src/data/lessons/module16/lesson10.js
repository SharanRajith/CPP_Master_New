const lesson = {
  id: 'm16-l10',
  title: 'ER to Relational Mapping',
  module: 16,
  lessonNumber: 10,
  xpReward: 10,
  type: 'theory',
  content: `# ER to Relational Mapping

## Overview

Converting an ER (Entity-Relationship) diagram to a relational schema is a mechanical process with well-defined rules. Master these rules and you can design any database schema from scratch.

---

## Rule 1 — Strong Entity → Table

Each strong entity becomes a table. Its attributes become columns. The primary key attribute becomes the PK.

**ER**: Student(student_id, name, email, gpa)

\`\`\`sql
CREATE TABLE Students (
  student_id INTEGER PRIMARY KEY,
  name       TEXT    NOT NULL,
  email      TEXT    NOT NULL UNIQUE,
  gpa        REAL
);
\`\`\`

---

## Rule 2 — Weak Entity → Table with Composite PK

A weak entity table includes the owner's PK as a FK. The composite PK = owner FK + partial key.

**ER**: OrderItem depends on Order (partial key: line_no)

\`\`\`sql
CREATE TABLE OrderItems (
  order_id   INTEGER NOT NULL REFERENCES Orders(order_id),
  line_no    INTEGER NOT NULL,
  product    TEXT    NOT NULL,
  qty        INTEGER NOT NULL,
  PRIMARY KEY (order_id, line_no)
);
\`\`\`

---

## Rule 3 — 1:1 Relationship → FK on Optional Side

Place the FK on the entity that may not always participate (optional side).

**ER**: Employee optionally manages Department

\`\`\`sql
CREATE TABLE Departments (
  dept_id    INTEGER PRIMARY KEY,
  name       TEXT    NOT NULL,
  manager_id INTEGER REFERENCES Employees(emp_id)  -- nullable = optional
);
\`\`\`

---

## Rule 4 — 1:N Relationship → FK on "Many" Side

The entity on the "many" side holds the FK.

**ER**: Department has many Employees

\`\`\`sql
CREATE TABLE Employees (
  emp_id  INTEGER PRIMARY KEY,
  name    TEXT    NOT NULL,
  dept_id INTEGER NOT NULL REFERENCES Departments(dept_id)
);
\`\`\`

---

## Rule 5 — M:N Relationship → Junction Table

Create a separate table with FKs to both entities. The composite PK = both FKs. Relationship attributes go here too.

**ER**: Student enrolls in Course (with grade attribute)

\`\`\`sql
CREATE TABLE Enrollments (
  student_id INTEGER NOT NULL REFERENCES Students(student_id),
  course_id  INTEGER NOT NULL REFERENCES Courses(course_id),
  grade      TEXT,
  enrolled_at TEXT DEFAULT (date('now')),
  PRIMARY KEY (student_id, course_id)
);
\`\`\`

---

## Rule 6 — Multi-valued Attribute → Separate Table

A multi-valued attribute (e.g., phone numbers) becomes its own table with a FK back to the entity.

**ER**: Employee has multiple PhoneNumbers

\`\`\`sql
CREATE TABLE EmployeePhones (
  emp_id INTEGER NOT NULL REFERENCES Employees(emp_id),
  phone  TEXT    NOT NULL,
  PRIMARY KEY (emp_id, phone)
);
\`\`\`

---

## Rule 7 — Composite Attribute → Flatten

Break composite attributes into individual columns.

**ER**: Address(street, city, state, zip)

\`\`\`sql
-- Instead of one "address" column:
street TEXT,
city   TEXT,
state  TEXT,
zip    TEXT
\`\`\`

---

## Complete Example

**ER**: University with Students, Courses, Instructors, Enrollments

\`\`\`sql
CREATE TABLE Instructors (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  dept TEXT NOT NULL
);

CREATE TABLE Courses (
  id            INTEGER PRIMARY KEY,
  title         TEXT    NOT NULL,
  credits       INTEGER NOT NULL,
  instructor_id INTEGER NOT NULL REFERENCES Instructors(id)
);

CREATE TABLE Students (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  gpa   REAL CHECK(gpa BETWEEN 0 AND 4)
);

CREATE TABLE Enrollments (
  student_id INTEGER NOT NULL REFERENCES Students(id),
  course_id  INTEGER NOT NULL REFERENCES Courses(id),
  grade      TEXT,
  PRIMARY KEY (student_id, course_id)
);
\`\`\`

---

## Mapping Summary Table

| ER Element | Relational Mapping |
|---|---|
| Strong entity | One table, entity key → PK |
| Weak entity | Table, owner FK + partial key → composite PK |
| 1:1 relationship | FK on optional side |
| 1:N relationship | FK on "many" side |
| M:N relationship | Junction table, both FKs as composite PK |
| Multi-valued attribute | Separate table with FK |
| Composite attribute | Flatten into multiple columns |

---

## Key Takeaway

ER-to-relational mapping is systematic: one rule per ER construct. Once the schema is in SQL, apply normalization (1NF→3NF) to eliminate remaining redundancy.
`,
  hints: [],
  complexity: null,
  tags: ['dbms', 'er-diagram', 'relational-mapping', 'schema-design', 'ddl', 'normalization'],
};
export default lesson;
