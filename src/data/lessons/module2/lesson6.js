const lesson = {
  id: 'm2-l6',
  title: 'Abstract Classes & Interfaces',
  module: 2,
  lessonNumber: 6,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Abstract Classes & Interfaces

Sometimes, you want to create a Base class solely as a blueprint. For example, a \`Shape\` class. What does a generic "Shape" look like? You can't draw a generic shape—you can only draw specific shapes like a Circle or Square.

Therefore, making an actual \`Shape\` object shouldn't be allowed! We achieve this using **Pure Virtual Functions**.

## Pure Virtual Functions

A **pure virtual function** is a virtual function that we declare in a base class, but provide absolutely no implementation for. We force any child classes to provide the implementation themselves.

Syntax: add \`= 0\` after the virtual function declaration.

\`\`\`cpp
class Shape {
public:
    // Pure Virtual Function
    virtual double getArea() = 0; 
};
\`\`\`

## Abstract Classes

A class containing at least one **pure virtual function** becomes an **Abstract Class**.
1. You **cannot** instantiate an Abstract Class (\`Shape s;\` will cause a compiler error).
2. You **can** create pointers of an Abstract Class type (\`Shape* s = new Circle();\`).
3. Any class that inherits from an Abstract Class **must** implement all pure virtual functions, otherwise it remains abstract itself.

## Interfaces in C++

Unlike Java or C#, C++ doesn't have an \`interface\` keyword. Instead, an interface in C++ is simply an Abstract Class that contains **only** pure virtual functions and no member variables.

\`\`\`cpp
class ILogger {
public:
    virtual void logError(string msg) = 0;
    virtual void logInfo(string msg) = 0;
    virtual ~ILogger() {} // Always provide virtual destructors for interfaces!
};
\`\`\`
`,
  starterCode: `#include <iostream>
using namespace std;

// 1. Make this an Abstract Class by creating a pure virtual method: virtual void sound() = 0;
class Animal {
public:
    
};

class Cat : public Animal {
public:
    // 2. Implement the pure virtual function to print "Meow"
    
};

class Cow : public Animal {
public:
    // 3. Implement the pure virtual function to print "Moo"
    
};

int main() {
    // We cannot do: Animal a; 
    
    Animal* myCat = new Cat();
    Animal* myCow = new Cow();
    
    myCat->sound();
    myCow->sound();
    
    delete myCat;
    delete myCow;
    
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

class Animal {
public:
    virtual void sound() = 0;
    virtual ~Animal() {}
};

class Cat : public Animal {
public:
    void sound() override {
        cout << "Meow" << endl;
    }
};

class Cow : public Animal {
public:
    void sound() override {
        cout << "Moo" << endl;
    }
};

int main() {
    Animal* myCat = new Cat();
    Animal* myCow = new Cow();
    
    myCat->sound();
    myCow->sound();
    
    delete myCat;
    delete myCow;
    
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: 'Meow\nMoo', description: 'Instantiates derived classes from an abstract base and calls implemented overrides.' }
  ],
  hints: [
    'The pure virtual function syntax is: `virtual void sound() = 0;`',
    'In Cat, write `void sound() { cout << "Meow" << endl; }`'
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['abstract-class', 'pure-virtual', 'interfaces', 'OOP', 'classes'],
};
export default lesson;
