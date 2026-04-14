const lesson = {
  id: 'm2-l9',
  title: 'Copy Constructor & Assignment',
  module: 2,
  lessonNumber: 9,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# The Copy Constructor & The Rule of Three

By default, C++ provides a shallow copy constructor and a shallow assignment operator for your classes. This means if you copy an object, it copies the member variables exactly as-is.

Usually, this is fine! But what if your class contains a **Pointer** to dynamically allocated memory on the heap?

## The Problem with Shallow Copies

\`\`\`cpp
class ArrayWrapper {
public:
    int* data;
    ArrayWrapper() { data = new int[10]; }
    ~ArrayWrapper() { delete[] data; }
};

int main() {
    ArrayWrapper a;
    ArrayWrapper b = a; // Shallow copy!
    // Uh oh! 'b.data' now points to the EXACT SAME memory address as 'a.data'.
    // When 'a' and 'b' are destroyed, 'delete[]' is called TWICE on the same memory (Double Free Error!)
}
\`\`\`

## The Copy Constructor (Deep Copy)

You must define your own **Copy Constructor** to allocate *brand new* memory, and then copy the values over.

\`\`\`cpp
class ArrayWrapper {
public:
    int* data;
    int size;
    
    // Normal Constructor
    ArrayWrapper(int s) : size(s) { data = new int[size]; }
    
    // Copy Constructor! Takes a const reference to another object
    ArrayWrapper(const ArrayWrapper& other) {
        size = other.size;
        data = new int[size]; // Deep copy! New memory!
        for(int i=0; i<size; i++) {
            data[i] = other.data[i];
        }
    }
};
\`\`\`

## The Rule of Three
In older C++, if your class manages a dynamic resource (like a pointer to heap memory), you must manually implement ALL THREE of these:
1. Destructor
2. Copy Constructor
3. Copy Assignment Operator (\`operator=\`)
`,
  starterCode: `#include <iostream>
using namespace std;

class DeepInt {
public:
    int* ptr;
    
    // Normal constructor
    DeepInt(int val) {
        ptr = new int(val);
    }
    
    // Destructor
    ~DeepInt() {
        delete ptr;
    }
    
    // TODO: Write the Copy Constructor here
    // DeepInt(const DeepInt& other) { ... }

};

int main() {
    DeepInt obj1(42);
    DeepInt obj2 = obj1; // Calls your copy constructor
    
    // Changing obj1 should NOT affect obj2 if deep copied correctly!
    *(obj1.ptr) = 100;
    
    cout << *(obj1.ptr) << " " << *(obj2.ptr) << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

class DeepInt {
public:
    int* ptr;
    
    DeepInt(int val) {
        ptr = new int(val);
    }
    
    ~DeepInt() {
        delete ptr;
    }
    
    DeepInt(const DeepInt& other) {
        ptr = new int(*(other.ptr)); 
    }
};

int main() {
    DeepInt obj1(42);
    DeepInt obj2 = obj1;
    *(obj1.ptr) = 100;
    cout << *(obj1.ptr) << " " << *(obj2.ptr) << endl;
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '100 42', description: 'Ensures modifying original pointer memory does not corrupt the copied object.' }
  ],
  hints: [
    'The signature is `DeepInt(const DeepInt& other)`',
    'Allocate new memory and assign the value from the other pointer: `ptr = new int(*(other.ptr));`'
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['rule-of-three', 'copy-constructor', 'pointers', 'OOP'],
};
export default lesson;
