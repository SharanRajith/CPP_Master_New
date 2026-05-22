const lesson = {
  id: 'm19-l2', title: '1NF & 2NF', module: 19, lessonNumber: 2, xpReward: 10, type: 'theory',
  content: `# 1NF & 2NF

## First Normal Form (1NF)

A relation is in **1NF** if:
1. All column values are **atomic** (indivisible — no sets or lists in a cell)
2. Each column contains values of a **single type**
3. Each row is **uniquely identifiable** (has a primary key)

### 1NF Violation Example

| OrderID | Products |
|---------|----------|
| 1 | Laptop, Mouse |
| 2 | Keyboard |

The Products column holds multiple values — violates 1NF.

### Fix: Decompose into separate rows

| OrderID | Product |
|---------|---------|
| 1 | Laptop |
| 1 | Mouse |
| 2 | Keyboard |

Now PK = {OrderID, Product}.

## Second Normal Form (2NF)

A relation is in **2NF** if:
1. It is in **1NF**, AND
2. Every non-key attribute is **fully functionally dependent** on the entire primary key (no partial dependencies)

2NF only matters when the primary key is **composite** (two or more columns).

### 2NF Violation Example

Relation: **Order_Details(OrderID, ProductID, ProductName, Qty)**  
PK = {OrderID, ProductID}

FDs:
\`\`\`
{OrderID, ProductID} → Qty          (full dependency ✓)
ProductID → ProductName              (partial dependency ✗)
\`\`\`

ProductName depends only on ProductID, not on the full key.

### Fix: Decompose

**Orders(OrderID, ProductID, Qty)** — PK: {OrderID, ProductID}  
**Products(ProductID, ProductName)** — PK: ProductID

No more partial dependencies. Both tables are in 2NF.

## Step-by-Step Check

\`\`\`
Step 1: Is every cell atomic?       → 1NF check
Step 2: Is the PK composite?
  - No  → automatically 2NF (no partial dependency possible)
  - Yes → check each non-key attribute
           Does it depend on ALL of PK? → full ✓
           Does it depend on PART of PK? → partial ✗, decompose
\`\`\`

## Summary Table

| Normal Form | Requirement |
|---|---|
| 1NF | Atomic values, single-valued cells, unique rows |
| 2NF | 1NF + no partial dependencies on the composite PK |`,
  hints: [], complexity: null, tags: ['dbms', 'normalization', '1nf', '2nf'],
};
export default lesson;
