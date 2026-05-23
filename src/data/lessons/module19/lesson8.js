const lesson = {
  id: 'm19-l8',
  title: 'Schema Refinement Process',
  module: 19,
  lessonNumber: 8,
  xpReward: 10,
  type: 'theory',
  content: `# Schema Refinement Process

## Overview

Schema refinement is a systematic method for converting a raw design (often derived from an ER diagram or a flat spreadsheet) into a clean normalized schema. It consists of four phases:

\`\`\`
1. Identify all attributes
2. Identify functional dependencies
3. Identify keys
4. Check and achieve the target normal form
\`\`\`

---

## Phase 1 — Attribute Inventory

List every piece of data the system must store. For each attribute note:
- Its domain (string, integer, date, …)
- Whether it can be NULL
- Its cardinality (how many distinct values exist)

---

## Phase 2 — Discover Functional Dependencies

For every pair of attribute sets X and Y ask: *does knowing X always determine Y?*

Notation: X → Y

**Armstrong's Axioms** let you derive implied FDs:

| Axiom | Rule |
|---|---|
| Reflexivity | If Y ⊆ X then X → Y |
| Augmentation | If X → Y then XZ → YZ |
| Transitivity | If X → Y and Y → Z then X → Z |

Use closure (X⁺) to find all attributes determined by X.

---

## Phase 3 — Find Keys

A **superkey** is any set of attributes whose closure = all attributes.
A **candidate key** is a minimal superkey (remove any attribute and it stops being a superkey).

**Algorithm**:
1. Start with all attributes as a candidate.
2. For each attribute, check if removing it still gives a full closure.
3. Minimal sets that determine everything are candidate keys.

---

## Phase 4 — Normalize

Check each relation for the target normal form:

\`\`\`
Is every non-prime attribute fully dependent on every candidate key?
→ No → Decompose to 2NF

Does any non-prime attribute transitively depend on a key?
→ Yes → Decompose to 3NF

Does every determinant in every FD contain a superkey?
→ No → Decompose to BCNF

Are there non-trivial MVDs where X is not a superkey?
→ Yes → Decompose to 4NF
\`\`\`

---

## Iteration

Schema refinement is iterative:

\`\`\`
Draft schema → FD analysis → Decompose → Verify lossless join
→ Verify dependency preservation → Repeat if needed
\`\`\`

Each decomposition must be verified:
1. **Lossless join** — natural join of parts = original
2. **Dependency preserving** — all original FDs still checkable within one table

---

## Practical Tips

- Capture FDs from business rules (e.g. "each order has one customer") not just from sample data.
- Sample data can mislead — a column that looks unique in 10 rows may not be unique in production.
- Stop at 3NF for most OLTP schemas; BCNF/4NF when correctness is critical.
- Document every FD decision in a design document for future maintainers.`,

  hints: [],
  complexity: null,
  tags: ['dbms', 'normalization', 'schema-refinement', 'functional-dependencies', 'keys'],
};

export default lesson;
