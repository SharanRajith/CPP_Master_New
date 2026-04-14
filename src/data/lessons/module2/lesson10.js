const lesson = {
  id: 'm2-l10',
  title: 'Move Semantics (The Rule of Five)',
  module: 2,
  lessonNumber: 10,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Move Semantics (C++11)

In the previous lesson, we learned the Rule of Three for deep copies. But deep copying large arrays or objects is incredibly slow! 

What if we are copying from an object that is about to be destroyed anyway? (Like returning a massive vector from a function). C++11 introduced **Move Semantics** to "steal" resources instead of copying them.

## The Move Constructor

Instead of allocating new memory and copying elements one by one, a move constructor simply:
1. Points its own pointer to the other object's memory block.
2. Sets the other object's pointer to \`nullptr\` so its destructor doesn't delete the memory!

\`\`\`cpp
class ArrayWrapper {
public:
    int* data;
    
    // Normal Copy Constructor (Slow!)
    ArrayWrapper(const ArrayWrapper& other) {
        data = new int[10000]; // Allocation
        // ... loop to copy ...
    }
    
    // Move Constructor (Extremely fast O(1))
    // Note the && (r-value reference). This means "other" is a temporary object!
    ArrayWrapper(ArrayWrapper&& other) noexcept {
        data = other.data;  // Steal the memory address!
        other.data = nullptr; // Nullify the old pointer so it isn't deleted
    }
};
\`\`\`

## The Rule of Five

In modern C++, if you manage dynamic memory, you need 5 things:
1. Destructor
2. Copy Constructor
3. Copy Assignment Operator
4. **Move Constructor**
5. **Move Assignment Operator**

> **When is moving triggered?** When you return a local object from a function, or when you explicitly cast a variable using \`std::move(obj)\`.
`,
  starterCode: `#include <iostream>
using namespace std;

class ResourceManager {
public:
    int* data;
    
    // Initial Constructor
    ResourceManager(int val) {
        data = new int(val);
        cout << "Constructed\\n";
    }
    
    // Destructor
    ~ResourceManager() {
        if (data != nullptr) {
            delete data;
            cout << "Deleted\\n";
        }
    }
    
    // TODO: Write the Move Constructor here
    // ResourceManager(ResourceManager&& other) noexcept { ... }

};

int main() {
    ResourceManager original(10);
    
    // std::move strongly forces C++ to treat 'original' as a temporary object, triggering your Move Constructor!
    ResourceManager stolen = std::move(original); 
    
    // If your move constructor worked, 'stolen.data' has the pointer, and 'original.data' is nullptr!
    if (original.data == nullptr) {
        cout << "Successfully moved! " << *(stolen.data) << endl;
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

class ResourceManager {
public:
    int* data;
    
    ResourceManager(int val) {
        data = new int(val);
        cout << "Constructed\\n";
    }
    
    ~ResourceManager() {
        if (data != nullptr) {
            delete data;
            cout << "Deleted\\n";
        }
    }
    
    ResourceManager(ResourceManager&& other) noexcept {
        data = other.data;
        other.data = nullptr;
    }
};

int main() {
    ResourceManager original(10);
    ResourceManager stolen = std::move(original); 
    
    if (original.data == nullptr) {
        cout << "Successfully moved! " << *(stolen.data) << endl;
    }
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: 'Constructed\nSuccessfully moved! 10\nDeleted', description: 'Triggers move construction and prevents double deletion.' }
  ],
  hints: [
    'Signature is `ResourceManager(ResourceManager&& other) noexcept`',
    '`this->data = other.data;`',
    '`other.data = nullptr;`'
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['move-semantics', 'rule-of-five', 'c++11', 'pointers'],
};
export default lesson;
