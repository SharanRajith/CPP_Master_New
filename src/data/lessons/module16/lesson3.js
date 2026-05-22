const lesson = {
  id: 'm16-l3',
  title: 'ER Diagrams',
  module: 16,
  lessonNumber: 3,
  xpReward: 10,
  type: 'theory',
  content: `# ER Diagrams

An **Entity-Relationship (ER) Diagram** is a visual blueprint of a database. Before writing a single line of SQL, database designers draw an ER diagram to capture what data exists, what properties it has, and how different pieces of data relate to each other. It is the architect's floor plan before the builders pour concrete.

## Core Building Blocks

### Entities
An **entity** is any real-world object or concept about which data is stored. Think: Student, Course, Professor, Bank Account, Product.

An **entity set** is the collection of all similar entities — like the set of all students enrolled in a university.

### Attributes
An **attribute** is a property of an entity.

| Attribute Type | Meaning | Example |
|---|---|---|
| **Simple** | Single, indivisible value | student_id, age |
| **Composite** | Made of sub-parts | full_name → (first_name, last_name) |
| **Multi-valued** | Can hold multiple values | phone_numbers (a student may have many) |
| **Derived** | Computed from another attribute | age derived from date_of_birth |
| **Key Attribute** | Uniquely identifies the entity | student_id (underlined in diagrams) |

### Relationships
A **relationship set** describes an association between two or more entity sets. Example: "Student **enrolls in** Course" or "Professor **teaches** Course".

## ER Diagram Notation

\`\`\`
Shape           Meaning
─────────────────────────────────────────
Rectangle  [ ]  Entity set
Ellipse    ( )  Attribute
Double     (()) Multi-valued attribute
Dashed     (- ) Derived attribute
Diamond    < >  Relationship set
Underline       Key attribute
Double rect     Weak entity set
Double diamond  Identifying relationship
\`\`\`

## Cardinality (Mapping Constraints)

Cardinality tells you how many entities on one side can be associated with how many entities on the other side.

| Cardinality | Meaning | Real Example |
|---|---|---|
| **1 : 1** | One entity maps to exactly one other | Person ↔ Passport |
| **1 : N** | One entity maps to many on the other side | Department → Employees |
| **M : N** | Many on both sides | Students ↔ Courses |

## Participation Constraints

- **Total participation** (double line): Every entity in the set MUST participate in the relationship. Example: every Loan **must** have a Borrower.
- **Partial participation** (single line): Entities may or may not participate. Example: not every Customer has a Loan.

## Weak Entities

A **weak entity** cannot be uniquely identified by its own attributes alone — it depends on an **identifying (owner) entity**. The weak entity has a **partial key** (dashed underline) that is unique only within the context of its owner.

Example: a \`Section\` of a course (section_number = 1, 2, 3) is not unique across all courses — you need (course_id + section_number) together. Section is the weak entity; Course is the owner.

## University ER Diagram Example

\`\`\`
                  (student_id)  (name)
                       |          |
  (dept_name)       [Student]-----(age)
       |                |
  [Department]---(1)--<works_in>--(N)--[Professor]--(prof_id)
                                             |           |
                                          (name)    <teaches>
                                                        |
  (course_id)  (title)                            [Course]
        |         |                              /
      [Course]---(credits)     [Student]--<enrolls_in>
                                    ||           |
                                  (total)   (grade) — attribute on relationship
\`\`\`

**Simplified clean view:**

\`\`\`
[Student] ---<enrolls_in>--- [Course] ---<taught_by>--- [Professor]
    ||             M:N                       1:N               |
(total part.)                                            (partial part.)
\`\`\`

- Student–Course is **M:N** (a student takes many courses; a course has many students).
- Course–Professor is **1:N** (a professor teaches many courses, but each course has one professor — simplified).
- Student has **total participation** in enrolls_in (every student must be enrolled in at least one course in this model).
- Professor has **partial participation** in taught_by (a visiting professor may not teach any course yet).

## Mapping ER Diagrams to Relational Tables

Converting an ER diagram to actual tables follows clear rules:

### Rule 1 — Strong Entity
Each strong entity becomes a table. Attributes become columns. The key attribute becomes the primary key.

\`\`\`
Student(student_id, name, age, dept_id)
Course(course_id, title, credits)
Professor(prof_id, name)
\`\`\`

### Rule 2 — M:N Relationship
An M:N relationship becomes its own table with the primary keys of both entities as a composite primary key. Any attributes on the relationship (like \`grade\`) become columns too.

\`\`\`
Enrollment(student_id, course_id, grade)
  PK = (student_id, course_id)
  FK: student_id → Student, course_id → Course
\`\`\`

### Rule 3 — 1:N Relationship
The foreign key goes on the "many" side. No new table needed.

\`\`\`
Course gets a column: taught_by (FK → Professor.prof_id)
\`\`\`

### Rule 4 — 1:1 Relationship
The foreign key can go on either side (prefer the side with total participation).

### Rule 5 — Weak Entity
The weak entity's table includes the owner's primary key as part of its own composite primary key.

\`\`\`
Section(course_id, section_number, room)
  PK = (course_id, section_number)
  FK: course_id → Course
\`\`\`

## Summary

ER diagrams bridge the gap between real-world requirements and database tables. The key things to identify are: entities, their attributes and key attributes, relationship types (1:1, 1:N, M:N), participation (total vs partial), and weak entities. Once the ER diagram is solid, converting it to a relational schema is a mechanical, rule-based process.
`,
  hints: [],
  complexity: null,
  tags: ['dbms', 'er-diagram', 'entity-relationship', 'cardinality', 'schema-design'],
};
export default lesson;
