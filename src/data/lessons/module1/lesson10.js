const lesson = {
  id: 'm1-l10',
  title: 'Pointers & References',
  module: 1, lessonNumber: 10, xpReward: 10,
  leetcodeProblems: [],
  content: `# Pointers & References

Pointers are one of C++'s most powerful (and most misused) features. They let you work directly with memory addresses.

## Memory Basics

Every variable has:
- A **value** (what it holds)
- An **address** (where it lives in memory)

\`\`\`cpp
int x = 42;
cout << x;    // 42         (value)
cout << &x;   // 0x7ffd...  (address in hex)
\`\`\`

## Pointers

A pointer stores a **memory address**.

\`\`\`cpp
int x = 42;
int* ptr = &x;   // ptr = pointer to int, holds address of x

cout << ptr;     // address (e.g., 0x7ffd...)
cout << *ptr;    // 42  — dereference: value AT that address
cout << &ptr;    // ptr's own address

*ptr = 100;      // modify x through pointer
cout << x;       // 100
\`\`\`

## Pointer Arithmetic

\`\`\`cpp
int arr[] = {10, 20, 30, 40, 50};
int* p = arr;    // Points to arr[0]

cout << *p;      // 10
p++;             // Move to next int (4 bytes ahead)
cout << *p;      // 20
cout << *(p+2);  // 40 (2 ints ahead)
\`\`\`

## nullptr

\`\`\`cpp
int* ptr = nullptr;   // Safe "empty" pointer (C++11)
// int* ptr = NULL;   // Old C-style, avoid

if (ptr == nullptr) {
    cout << "Pointer is null\\n";
}

// NEVER dereference null! → segmentation fault
// *ptr = 5;  // CRASH
\`\`\`

## References

A reference is an **alias** for an existing variable. Unlike pointers, references:
- Must be initialized at declaration
- Cannot be reassigned to point elsewhere
- Cannot be null
- Don't need dereferencing

\`\`\`cpp
int x = 10;
int& ref = x;    // ref IS x (same memory location)

ref = 20;        // x is now 20
cout << x;       // 20

// References are often used for function parameters:
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int p = 3, q = 7;
swap(p, q);
cout << p << " " << q;  // 7 3
\`\`\`

## Pointers to Pointers

\`\`\`cpp
int x = 5;
int* p = &x;
int** pp = &p;

cout << **pp;  // 5 (double dereference)
\`\`\`

## const with Pointers

\`\`\`cpp
int x = 10, y = 20;
const int* p = &x;  // pointer to const: can't change value
// *p = 5;  // ERROR

int* const q = &x;  // const pointer: can't change address
// q = &y;  // ERROR
*q = 5;             // ✓ can change value

const int* const r = &x;  // Both const
\`\`\`

## Pointers vs References Summary

| Feature | Pointer | Reference |
|---|---|---|
| Can be null | Yes | No |
| Can be reassigned | Yes | No |
| Needs \`*\` to access value | Yes | No |
| Syntax | \`int* p = &x;\` | \`int& r = x;\` |
| Use for | Dynamic memory, optional | Function params, aliases |

## Common Mistakes 🚨

- **Dangling pointer** — pointing to memory that's been freed
- **Uninitialized pointer** — contains garbage address
- **Null dereference** — dereferencing nullptr → crash
- **Memory leak** — allocating with new, forgetting to delete
`,
  starterCode: `#include <iostream>
using namespace std;

// Write a function using pointers to swap two integers
// Then call it from main with a=5, b=10

void swapByPointer(int* a, int* b) {
    // Your code here
}

int main() {
    int a = 5, b = 10;
    swapByPointer(&a, &b);
    cout << a << " " << b << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

void swapByPointer(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int a = 5, b = 10;
    swapByPointer(&a, &b);
    cout << a << " " << b << endl;
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '10 5', description: 'Swap 5 and 10 via pointers' },
  ],
  hints: [
    'Use `*a` to dereference the pointer (access the value AT address a).',
    'Temporary variable trick: `int temp = *a; *a = *b; *b = temp;`',
    'In main, pass addresses: `swapByPointer(&a, &b);`',
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['pointers', 'references', 'memory', 'nullptr'],
};
export default lesson;
