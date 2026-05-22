const lesson = {
  id: 'm19-l3', title: '3NF & BCNF', module: 19, lessonNumber: 3, xpReward: 10, type: 'theory',
  content: `# 3NF & BCNF

## Third Normal Form (3NF)

A relation is in **3NF** if:
1. It is in **2NF**, AND
2. No non-key attribute transitively depends on the primary key

In other words: every non-key attribute must depend **directly** on the primary key, not via another non-key attribute.

### 3NF Violation Example

**Student(StudentID, Dept, DeptHead)**  
FDs: \`StudentID → Dept\` and \`Dept → DeptHead\`

DeptHead depends on Dept (non-key), which depends on StudentID (PK).  
This is a **transitive dependency** — DeptHead does not directly depend on the PK.

### Fix: Decompose

**Student(StudentID, Dept)** — PK: StudentID  
**Department(Dept, DeptHead)** — PK: Dept

Now every non-key attribute depends directly on its table's PK. ✓

## Boyce-Codd Normal Form (BCNF)

BCNF is **stricter than 3NF**. A relation is in BCNF if:

> For every non-trivial FD X → Y, X must be a **superkey** (candidate key or superset of one).

Most relations in 3NF are also in BCNF. Violations only occur when there are **multiple overlapping candidate keys**.

### BCNF Violation Example

**Teaching(Student, Subject, Teacher)**  
FDs: \`{Student, Subject} → Teacher\` and \`Teacher → Subject\`

Candidate keys: {Student, Subject} and {Student, Teacher}

Teacher → Subject violates BCNF because Teacher is **not** a superkey.

### Fix: Decompose

**TeacherSubject(Teacher, Subject)** — PK: Teacher  
**StudentTeacher(Student, Teacher)** — PK: {Student, Teacher}

**⚠ Warning**: BCNF decomposition may **not preserve all FDs**. In the example, \`{Student, Subject} → Teacher\` cannot be enforced in a single table anymore.

## 3NF vs BCNF

| Property | 3NF | BCNF |
|---|---|---|
| Eliminates transitive deps | ✓ | ✓ |
| Always lossless decomposition | ✓ | ✓ |
| Always FD-preserving | ✓ | ✗ (sometimes) |
| Stronger guarantee | ✗ | ✓ |

**Rule of thumb**: Prefer BCNF when possible; fall back to 3NF when BCNF would lose FD preservation.`,
  hints: [], complexity: null, tags: ['dbms', 'normalization', '3nf', 'bcnf'],
};
export default lesson;
