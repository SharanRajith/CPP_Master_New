const lesson = {
  id: 'm19-l4', title: 'Decomposition & Lossless Joins', module: 19, lessonNumber: 4, xpReward: 10, type: 'theory',
  content: `# Decomposition & Lossless Joins

## What is Decomposition?

When a relation violates a normal form, we **decompose** it into smaller relations that satisfy the form. Good decomposition must be:

1. **Lossless-join**: joining the parts back gives exactly the original
2. **Dependency-preserving**: all original FDs can be checked in the decomposed tables

## Lossless-Join Decomposition

A decomposition of R into R1 and R2 is **lossless** if:

\`\`\`
R1 ∩ R2 → R1   OR   R1 ∩ R2 → R2
\`\`\`

In other words, the common attributes between R1 and R2 must be a key for at least one of them.

### Example

R(A, B, C) with FD: A → B

Decompose into R1(A, B) and R2(A, C).

\`\`\`
R1 ∩ R2 = {A}
A → B means A is a key for R1(A, B)  ✓  Lossless!
\`\`\`

### Lossy Example (Bad)

R(A, B, C) with FD: A → B

Decompose into R1(A, C) and R2(B, C).

\`\`\`
R1 ∩ R2 = {C}
Does C → R1? No.  Does C → R2? No.  ✗  Lossy!
\`\`\`

Joining R1 and R2 on C would produce **spurious tuples** (wrong rows).

## Dependency-Preserving Decomposition

A decomposition preserves FD X → Y if X → Y can be enforced using only the FDs within a single decomposed table (no need to join tables to check the constraint).

## BCNF Decomposition Algorithm

\`\`\`
Input: R with FDs F
Output: set of BCNF relations

while some relation Ri violates BCNF:
  find FD X → Y in Ri where X is not a superkey
  decompose Ri into:
    - R1 = X ∪ Y
    - R2 = Ri − Y  (Ri minus Y)
\`\`\`

### Worked Example

R(A, B, C, D), FDs: A→B, B→C, C→D

Step 1: A→B violates BCNF (A is not a superkey of R)?  
Find key: A⁺ = {A,B,C,D} → A IS a superkey. ✓

Step 2: B→C — is B a superkey? B⁺ = {B,C,D} ≠ all attributes. ✗ Decompose!  
R1(B,C,D), R2(A,B)

Step 3: In R1(B,C,D) — B→C, B→D. B⁺={B,C,D}. B is a key. ✓ BCNF.

Result: **R1(B,C,D)** and **R2(A,B)** — both in BCNF, lossless (R1∩R2={B}, B→B,C,D).

## Normal Forms Summary

| NF | Requirement | Eliminates |
|---|---|---|
| 1NF | Atomic values | Multi-valued cells |
| 2NF | 1NF + no partial deps | Partial dependencies |
| 3NF | 2NF + no transitive deps | Transitive dependencies |
| BCNF | Every determinant is a key | Anomalies from overlapping keys |`,
  hints: [], complexity: null, tags: ['dbms', 'normalization', 'decomposition', 'lossless'],
};
export default lesson;
