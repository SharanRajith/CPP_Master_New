const lesson = {
  id: 'm1-l11',
  title: 'Dynamic Memory Management',
  module: 1, lessonNumber: 11, xpReward: 10,
  leetcodeProblems: [],
  content: `# Dynamic Memory Management

Static memory (stack) has a fixed size. **Dynamic memory (heap)** lets you allocate memory at runtime — as much as needed.

## The Stack vs The Heap

| | Stack | Heap |
|---|---|---|
| Allocation | Automatic | Manual (new/delete) |
| Size | Limited (~1–8 MB) | Large (system RAM) |
| Speed | Fast | Slower |
| Lifetime | Until scope ends | Until you delete it |
| Risk | Stack overflow | Memory leak |

## \`new\` and \`delete\`

\`\`\`cpp
// Allocate a single int on the heap
int* p = new int;     // Allocate
*p = 42;              // Use
cout << *p;           // 42
delete p;             // FREE (must do this!)
p = nullptr;          // Good practice: nullify after delete

// Allocate with initialization
int* q = new int(100);
cout << *q;           // 100
delete q;
\`\`\`

## Dynamic Arrays

\`\`\`cpp
int n = 5;
int* arr = new int[n];   // Allocate array of n ints

for (int i = 0; i < n; i++) {
    arr[i] = i * i;
}
// arr: [0, 1, 4, 9, 16]

delete[] arr;    // MUST use delete[] for arrays (not delete!)
arr = nullptr;
\`\`\`

## Memory Leaks

\`\`\`cpp
void leak() {
    int* p = new int(42);
    // Forgot to delete p → MEMORY LEAK!
    // Memory remains allocated until program ends
}
\`\`\`

Memory leaks cause programs to slowly consume more and more RAM. Detect with tools like **Valgrind** or **AddressSanitizer**.

## Smart Pointers (C++11) — The Modern Way

Smart pointers automatically free memory when no longer needed (RAII):

\`\`\`cpp
#include <memory>

// unique_ptr — single owner, auto-deleted
unique_ptr<int> p = make_unique<int>(42);
cout << *p;    // 42
// p automatically deleted when out of scope ✓

// unique_ptr for arrays
unique_ptr<int[]> arr = make_unique<int[]>(5);
arr[0] = 10;

// shared_ptr — shared ownership, reference counted
shared_ptr<int> a = make_shared<int>(100);
shared_ptr<int> b = a;  // Both point to same memory
// Memory freed when both a and b go out of scope

// weak_ptr — non-owning reference (breaks cycles)
weak_ptr<int> w = a;
\`\`\`

## Rule of Thumb

| Situation | Use |
|---|---|
| You need dynamic memory | Prefer \`make_unique\` / \`make_shared\` |
| Need raw pointer | Use it, but always \`delete\` |
| Fixed-size collection | Prefer \`vector\` or \`array\` |

## Common Mistakes 🚨

- **Double deletion** — \`delete p; delete p;\` → undefined behavior/crash
- **delete vs delete[]** — mismatching causes undefined behavior
- **Using after delete** — dangling pointer, garbage values
- **Not checking new** — throws \`std::bad_alloc\` if out of memory
`,
  starterCode: `#include <iostream>
using namespace std;

int main() {
    // Read n, dynamically allocate array, fill with 1..n
    // Print sum of array, then properly free memory
    
    int n;
    cin >> n;
    
    // Your code here (use new[] and delete[])
    
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int* arr = new int[n];
    int sum = 0;
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
        sum += arr[i];
    }
    cout << sum << endl;
    
    delete[] arr;
    arr = nullptr;
    return 0;
}`,
  testCases: [
    { input: '5',  expectedOutput: '15',   description: 'Sum 1+2+3+4+5=15' },
    { input: '10', expectedOutput: '55',   description: 'Sum 1..10=55' },
    { input: '1',  expectedOutput: '1',    description: 'Single element' },
  ],
  hints: [
    'Allocate: `int* arr = new int[n];` — this creates n integers on the heap.',
    'Fill: `for (int i = 0; i < n; i++) arr[i] = i + 1;` then sum them.',
    'Always free: `delete[] arr;` — note: `delete[]` for arrays, NOT `delete`',
  ],
  complexity: { time: 'O(n)', space: 'O(n)' },
  tags: ['dynamic-memory', 'pointers', 'new', 'delete', 'smart-pointers'],
};
export default lesson;
