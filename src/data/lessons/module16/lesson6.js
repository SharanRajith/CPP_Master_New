const lesson = {
  id: 'm16-l6',
  title: 'Constraints — NOT NULL, UNIQUE, CHECK',
  module: 16,
  lessonNumber: 6,
  xpReward: 10,
  type: 'theory',
  content: `# Constraints — NOT NULL, UNIQUE, CHECK

## What are Constraints?

Constraints enforce rules on data at the database level — they prevent bad data from entering the table regardless of what the application does.

---

## NOT NULL

Ensures a column always has a value:

\`\`\`sql
CREATE TABLE employees (
  id    INTEGER PRIMARY KEY,
  name  TEXT    NOT NULL,    -- must always have a name
  email TEXT    NOT NULL,
  dept  TEXT                 -- nullable — dept is optional
);
\`\`\`

Inserting a row without \`name\` raises an error.

---

## UNIQUE

Ensures all values in a column (or combination of columns) are distinct:

\`\`\`sql
CREATE TABLE users (
  id       INTEGER PRIMARY KEY,
  username TEXT    NOT NULL UNIQUE,
  email    TEXT    NOT NULL UNIQUE
);

-- Composite unique (username + domain must be unique together)
CREATE TABLE accounts (
  username TEXT,
  domain   TEXT,
  UNIQUE(username, domain)
);
\`\`\`

A PRIMARY KEY is implicitly UNIQUE + NOT NULL.

---

## CHECK

Validates that a value satisfies a boolean expression:

\`\`\`sql
CREATE TABLE products (
  id     INTEGER PRIMARY KEY,
  name   TEXT    NOT NULL,
  price  REAL    CHECK(price > 0),
  stock  INTEGER CHECK(stock >= 0),
  rating REAL    CHECK(rating BETWEEN 0 AND 5)
);

CREATE TABLE employees (
  id         INTEGER PRIMARY KEY,
  name       TEXT    NOT NULL,
  hire_date  TEXT    NOT NULL,
  leave_date TEXT,
  CHECK(leave_date IS NULL OR leave_date > hire_date)
);
\`\`\`

---

## DEFAULT

Provides a value when none is specified:

\`\`\`sql
CREATE TABLE orders (
  id         INTEGER PRIMARY KEY,
  status     TEXT    NOT NULL DEFAULT 'pending',
  created_at TEXT    NOT NULL DEFAULT (datetime('now')),
  quantity   INTEGER NOT NULL DEFAULT 1
);
\`\`\`

---

## FOREIGN KEY

Enforces referential integrity — values must exist in the referenced table:

\`\`\`sql
CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  product_id  INTEGER NOT NULL REFERENCES products(id)
);
\`\`\`

Inserting an \`order\` with a non-existent \`customer_id\` fails.

---

## Constraint Summary

| Constraint | Prevents |
|---|---|
| NOT NULL | Missing required data |
| UNIQUE | Duplicate values |
| PRIMARY KEY | NULL + duplicates in the key column |
| CHECK | Values outside defined rules |
| DEFAULT | Missing optional data |
| FOREIGN KEY | Orphaned rows / broken references |

---

## Key Takeaway

Constraints are your last line of defence against bad data. Define them at the database level — don't rely solely on application-level validation.
`,
  hints: [],
  complexity: null,
  tags: ['dbms', 'sql', 'constraints', 'not-null', 'unique', 'check', 'foreign-key', 'ddl'],
};
export default lesson;
