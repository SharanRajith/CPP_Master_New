const lesson = {
  id: 'm16-l1',
  title: 'What is a DBMS?',
  module: 16,
  lessonNumber: 1,
  xpReward: 10,
  type: 'theory',
  content: `# What is a DBMS?

A **Database Management System (DBMS)** is software that lets you store, retrieve, and manage data in an organised, reliable way. Before DBMS existed, developers stored data in plain **flat files** — think CSV files or plain text logs. That worked for tiny programs, but it falls apart quickly at scale.

## File Systems vs. DBMS

Imagine running a college with 50,000 students. Without a DBMS you'd have hundreds of text files: \`students.txt\`, \`marks.txt\`, \`fees.txt\`, and so on. Every time you need to find a student's fee status you must open multiple files, write custom parsing code, and hope the data is consistent across all of them.

| Problem with Flat Files | How DBMS Solves It |
|---|---|
| Data duplication across files | Single source of truth |
| No concurrent access control | Built-in locking / transactions |
| No query language | SQL — ask questions in plain English |
| Manual integrity checks | Constraints enforced automatically |
| Security left to the OS | Fine-grained user privileges |
| Crash recovery is your problem | ACID transactions + write-ahead logs |

Think of a flat file like an **Excel spreadsheet** you email around — people edit their own copies and eventually no one knows which version is correct. A DBMS is like a shared Google Sheet with access controls, version history, and automatic conflict resolution — but infinitely more powerful.

## What Does a DBMS Actually Do?

At its core, a DBMS handles four things:

1. **Store** data persistently on disk in an efficient format.
2. **Retrieve** data quickly using indexes and query optimisation.
3. **Manage** concurrent access so two users don't overwrite each other.
4. **Protect** data through security, backups, and crash recovery.

## DBMS Architecture — The Three Layers

\`\`\`
+-----------------------------------------------+
|            USER / APPLICATION LAYER           |
|  (SQL queries, application code, reports)      |
+-----------------------------------------------+
                        |
+-----------------------------------------------+
|              QUERY PROCESSOR                  |
|  Parser → Optimizer → Execution Engine        |
+-----------------------------------------------+
                        |
+-----------------------------------------------+
|            STORAGE MANAGER                   |
|  Buffer Pool · Index Manager · File Manager  |
+-----------------------------------------------+
                        |
+-----------------------------------------------+
|          TRANSACTION MANAGER                 |
|  Concurrency Control · Recovery Manager      |
+-----------------------------------------------+
                        |
              [ Physical Disk / SSD ]
\`\`\`

### Query Processor
Receives your SQL, checks its syntax (parser), figures out the fastest way to run it (optimizer), and then executes it. The optimizer is why \`SELECT * FROM students WHERE id = 42\` can return a result in microseconds even in a table of 10 million rows — it uses indexes instead of scanning every row.

### Storage Manager
Handles reading and writing blocks of data to and from disk. The **buffer pool** keeps frequently-accessed pages in memory so disk I/O is minimised. The index manager maintains B-tree or hash indexes that speed up lookups.

### Transaction Manager
Guarantees **ACID** properties:
- **Atomicity** — a transaction either completes fully or not at all.
- **Consistency** — data always satisfies defined rules/constraints.
- **Isolation** — concurrent transactions don't see each other's partial changes.
- **Durability** — once committed, data survives crashes.

## Popular DBMS Examples

| DBMS | Type | Common Use |
|---|---|---|
| **MySQL** | Relational, open-source | Web apps (WordPress, Shopify) |
| **PostgreSQL** | Relational, open-source | Advanced apps, geospatial data |
| **Oracle DB** | Relational, commercial | Enterprise banking, ERP systems |
| **SQLite** | Relational, embedded | Mobile apps, browsers, IoT |
| **MongoDB** | Document (NoSQL) | JSON-heavy web APIs |
| **Redis** | Key-value (NoSQL) | Caching, real-time leaderboards |

For this module we focus on **Relational DBMS (RDBMS)** — MySQL, PostgreSQL, and SQLite are the most exam-relevant.

## Key Advantages of DBMS Over Flat Files

1. **Data Independence** — change the physical storage format without rewriting application code.
2. **Concurrent Access** — hundreds of users can read/write simultaneously without corruption.
3. **Data Integrity** — constraints (PRIMARY KEY, NOT NULL, CHECK) stop bad data from entering.
4. **Security** — GRANT/REVOKE controls who can read or modify which tables.
5. **Backup & Recovery** — built-in tools to restore data after hardware failures.
6. **Reduced Redundancy** — normalisation eliminates duplicate data, saving space and avoiding update anomalies.

## Summary

A DBMS is not just "a place to put data" — it is a complete system that manages the entire data lifecycle. The query processor, storage manager, and transaction manager work together to give you fast, safe, and concurrent access to your data. Understanding this architecture is the foundation for everything else in this module.
`,
  hints: [],
  complexity: null,
  tags: ['dbms', 'database-fundamentals', 'architecture', 'acid', 'file-systems'],
};
export default lesson;
