const lesson = {
  id: 'm19-l7',
  title: 'Practical Normalization Case Study',
  module: 19,
  lessonNumber: 7,
  xpReward: 10,
  type: 'theory',
  content: `# Practical Normalization Case Study

## Starting Point: Unnormalized Table

A university stores all course-registration data in one flat table:

\`\`\`
Registration(
  student_id, student_name, student_email,
  course_id, course_title, dept, credits,
  instructor_id, instructor_name,
  grade
)
\`\`\`

Sample data:

| stu_id | stu_name | email            | crs_id | title   | dept | credits | ins_id | ins_name | grade |
|--------|----------|------------------|--------|---------|------|---------|--------|----------|-------|
| 1      | Alice    | alice@uni.edu    | CS101  | Intro   | CS   | 3       | 10     | Dr. Roy  | A     |
| 1      | Alice    | alice@uni.edu    | CS201  | DSA     | CS   | 4       | 11     | Dr. Lee  | B     |
| 2      | Bob      | bob@uni.edu      | CS101  | Intro   | CS   | 3       | 10     | Dr. Roy  | C     |

**Problems**: student info repeated per enrollment; course info repeated per enrollment; instructor info repeated.

---

## Step 1 → 1NF

All cells are already atomic. ✓

---

## Step 2 → 2NF

**Primary key**: {student_id, course_id}

Partial dependencies (attribute depends on part of PK only):
- student_id → student_name, email
- course_id → course_title, dept, credits, instructor_id, instructor_name

**Decompose**:

\`\`\`
Students(student_id PK, student_name, email)
Courses(course_id PK, course_title, dept, credits, instructor_id, instructor_name)
Enrollment(student_id FK, course_id FK, grade)
\`\`\`

---

## Step 3 → 3NF

Check Courses for transitive dependencies:

\`\`\`
course_id → instructor_id → instructor_name
\`\`\`

instructor_name depends on instructor_id (non-key), not directly on course_id.

**Decompose**:

\`\`\`
Instructors(instructor_id PK, instructor_name)
Courses(course_id PK, course_title, dept, credits, instructor_id FK)
\`\`\`

---

## Final 3NF Schema

\`\`\`
Students    (student_id, student_name, email)
Courses     (course_id, course_title, dept, credits, instructor_id)
Instructors (instructor_id, instructor_name)
Enrollment  (student_id, course_id, grade)
\`\`\`

All relations are in 3NF. Each fact is stored exactly once.

---

## What We Gained

| Before | After |
|--------|-------|
| Student info duplicated per enrollment | Stored once in Students |
| Course info duplicated per enrollment | Stored once in Courses |
| Instructor name repeated per course | Stored once in Instructors |
| Update anomaly (rename instructor) | Update one row in Instructors |
| Insertion anomaly (new course, no students) | Can insert into Courses independently |

---

## Key Takeaway

Normalization is a systematic process: identify the PK → find partial deps (→ 2NF) → find transitive deps (→ 3NF). Each step eliminates a class of anomaly.`,

  hints: [],
  complexity: null,
  tags: ['dbms', 'normalization', 'case-study', '2nf', '3nf', 'decomposition'],
};

export default lesson;
