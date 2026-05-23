const lesson = {
  id: 'm19-l5',
  title: '4NF & Multi-valued Dependencies',
  module: 19,
  lessonNumber: 5,
  xpReward: 10,
  type: 'theory',
  content: `# 4NF & Multi-valued Dependencies

## Recap: BCNF

BCNF eliminates anomalies from **functional dependencies (FDs)**. But a BCNF relation can still have redundancy caused by **multi-valued dependencies (MVDs)**.

---

## Multi-valued Dependency (MVD)

A **multi-valued dependency** X →→ Y exists in relation R when:

- For each value of X, the set of Y values is **independent** of the other attributes of R.

In other words, X determines a **set** of Y values, not a single one.

### Example

Relation: Professor(prof, course, hobby)

| prof  | course    | hobby    |
|-------|-----------|----------|
| Alice | Database  | Hiking   |
| Alice | Database  | Cooking  |
| Alice | OS        | Hiking   |
| Alice | OS        | Cooking  |

Here, \`prof →→ course\` and \`prof →→ hobby\`. Alice's courses and hobbies are **independent** — if she teaches a new course, every hobby must be paired with it, creating redundancy.

---

## Fourth Normal Form (4NF)

A relation R is in **4NF** if for every non-trivial MVD X →→ Y, X is a **superkey**.

If a relation has a non-trivial MVD where X is not a superkey, decompose it.

### Decomposition

Split Professor(prof, course, hobby) into:

- **ProfCourse**(prof, course) — captures prof →→ course
- **ProfHobby**(prof, hobby) — captures prof →→ hobby

Now each table is in 4NF: the only MVD in each is trivial (prof →→ all other columns, and prof is the key).

---

## Trivial vs Non-trivial MVD

| Type | Condition |
|------|-----------|
| Trivial | X →→ Y where Y ⊆ X or X ∪ Y = all attributes |
| Non-trivial | All others — these can cause redundancy |

---

## Summary

| Normal Form | Handles |
|---|---|
| 1NF | Non-atomic values |
| 2NF | Partial functional dependencies |
| 3NF | Transitive functional dependencies |
| BCNF | All non-trivial FDs violating key constraint |
| 4NF | Non-trivial multi-valued dependencies |

4NF ⊂ BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF (each is a stricter subset).`,

  hints: [],
  complexity: null,
  tags: ['dbms', 'normalization', '4nf', 'mvd', 'multi-valued-dependency'],
};

export default lesson;
