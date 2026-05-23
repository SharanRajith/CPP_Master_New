const lesson = {
  id: 'm16-l5',
  title: 'Entity & Relationship Types',
  module: 16,
  lessonNumber: 5,
  xpReward: 10,
  type: 'theory',
  content: `# Entity & Relationship Types

## Entity Types

An **entity** is a real-world object or concept stored in the database.

| Entity Type | Description | Example |
|---|---|---|
| **Strong** | Has its own primary key | Student, Employee |
| **Weak** | Depends on another entity for identification | OrderItem (depends on Order) |
| **Associative** | Represents a many-to-many relationship | Enrollment (Student ↔ Course) |

### Weak Entity

A weak entity uses a **partial key** combined with its owner's key:

\`\`\`
Order (order_id PK)
  └── OrderItem (order_id FK + line_number → composite PK)
\`\`\`

\`line_number\` alone doesn't identify an item — you need \`order_id + line_number\`.

---

## Relationship Types

### By Degree (Number of Entities)

| Degree | Name | Example |
|---|---|---|
| 2 | Binary | Student ENROLLS_IN Course |
| 3 | Ternary | Doctor PRESCRIBES Drug TO Patient |
| 1 | Unary (recursive) | Employee MANAGES Employee |

### By Cardinality

| Cardinality | Notation | Example |
|---|---|---|
| One-to-One (1:1) | —\|—\|— | Person has one Passport |
| One-to-Many (1:N) | —\|—< | Department has many Employees |
| Many-to-Many (M:N) | >—< | Students enroll in many Courses |

---

## Participation Constraints

| Type | Meaning | Notation |
|---|---|---|
| **Total** | Every entity must participate | Double line |
| **Partial** | Participation is optional | Single line |

Example: Every Employee must belong to a Department (total), but a Department may have no employees yet (partial).

---

## Converting M:N to Tables

Many-to-many relationships need a **junction table**:

\`\`\`
Student (student_id PK, name)
Course  (course_id PK, title)
Enrollment (student_id FK, course_id FK, grade)  ← junction table
\`\`\`

The junction table holds the foreign keys of both sides + any relationship attributes (like \`grade\`).

---

## Recursive Relationship

\`\`\`
Employee (emp_id PK, name, manager_id FK → Employee.emp_id)
\`\`\`

\`manager_id\` is a self-referencing FK — models the org chart tree.

---

## Key Points

- Strong entities stand alone; weak entities depend on an owner for their key.
- Cardinality (1:1, 1:N, M:N) determines table structure.
- M:N always needs a junction table.
- Recursive relationships use a self-referencing FK.
`,
  hints: [],
  complexity: null,
  tags: ['dbms', 'er-diagram', 'entities', 'relationships', 'cardinality', 'weak-entity'],
};
export default lesson;
