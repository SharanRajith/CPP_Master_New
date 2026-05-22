// src/data/lessons/module19/lesson1.js
const lesson = {
  id: 'm19-l1',
  title: 'Functional Dependencies',
  module: 19,
  lessonNumber: 1,
  xpReward: 10,
  type: 'theory',
  content: `# Functional Dependencies

## What is a Functional Dependency?

A **functional dependency (FD)** A → B means: knowing A's value, you can uniquely determine B's value.

\`\`\`
StudentID → Name
StudentID → DOB, Dept
StudentID, CourseID → Grade
\`\`\`

## Armstrong's Axioms

1. **Reflexivity**: If B ⊆ A then A → B
2. **Augmentation**: If A → B then AC → BC
3. **Transitivity**: If A → B and B → C then A → C

Derived: **Union**, **Decomposition**, **Pseudotransitivity**.

## Full vs Partial Dependency

- **Full**: removing any attribute from the LHS breaks the FD  
  \`{StudentID, CourseID} → Grade\` — full
- **Partial**: a proper subset of LHS already determines RHS  
  \`{StudentID, CourseID} → StudentName\` — partial (StudentID alone determines Name)

Partial dependencies → eliminate in **2NF**.

## Transitive Dependency

A → B → C where A is the PK and B is a non-key attribute.

\`\`\`
StudentID → Dept → DeptHead
\`\`\`

DeptHead transitively depends on StudentID. Eliminate in **3NF**.

## Attribute Closure (X⁺)

All attributes determinable from X using the given FDs.

**Algorithm:**
\`\`\`
closure = X
for each FD (A → B): if A ⊆ closure, add B to closure
repeat until stable
\`\`\`

**Example** — FDs: A→B, B→C, A→D, D→E. Find {A}⁺:
\`\`\`
{A} → add B → {A,B} → add C → {A,B,C} → add D → {A,B,C,D} → add E
{A}⁺ = {A,B,C,D,E}   A is a key!
\`\`\`

## Finding Candidate Keys

- Compute closure for every minimal attribute subset
- K is a candidate key if K⁺ = all attributes and no proper subset of K has this property
- **Tip**: attributes that never appear on the RHS of any FD MUST be in every candidate key`,
  hints: [],
  complexity: null,
  tags: ['dbms', 'normalization', 'functional-dependencies'],
};
export default lesson;
