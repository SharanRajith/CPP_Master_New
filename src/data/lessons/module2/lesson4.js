const lesson = {
  id: 'm2-l4',
  title: 'Inheritance',
  module: 2,
  lessonNumber: 4,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Inheritance

**Inheritance** allows us to define a new class (derived or child class) based on an existing class (base or parent class). The derived class inherits all non-private fields and methods from the base class, promoting code reusability.

## Basic Syntax

In C++, you use a colon \`:\` followed by an access specifier (usually \`public\`) to inherit from a base class.

\`\`\`cpp
class Animal {
protected: // Accessible to derived classes, but private to the outside!
    string name;
public:
    Animal(string n) : name(n) {}
    void eat() { cout << name << " is eating.\\n"; }
};

// Dog inherits publicly from Animal
class Dog : public Animal {
public:
    // Calling the base class constructor
    Dog(string n) : Animal(n) {}
    
    void bark() { cout << name << " says woof!\\n"; } // Uses protected 'name'
};

int main() {
    Dog d("Buddy");
    d.eat();  // Inherited method
    d.bark(); // Dog's own method
}
\`\`\`

## Access Modifiers in Inheritance

When you inherit \`class Derived : public Base\`:
1. **public** members of \`Base\` become **public** in \`Derived\`.
2. **protected** members of \`Base\` become **protected** in \`Derived\`.
3. **private** members of \`Base\` are **inaccessible** directly within \`Derived\`.

> **Note:** If you forget the \`public\` keyword (\`class Dog : Animal\`), C++ defaults to **private inheritance** for classes, meaning all inherited features become private to the child class!

## Overriding Methods
A derived class can easily provide a new implementation for a method defined in the base class. 
*(Note: True runtime polymorphism requires \`virtual\` functions, which we will cover in the next lesson!)*
`,
  starterCode: `#include <iostream>
#include <string>
using namespace std;

class Vehicle {
protected:
    string brand;
public:
    Vehicle(string b) : brand(b) {}
    void honk() { cout << "Tuut, tuut!\\n"; }
};

// TODO: Create a class 'Car' that publicly inherits from 'Vehicle'
// 1. Add a public string 'modelName'
// 2. Create a constructor: Car(string b, string m) that calls Vehicle constructor
// 3. Add a printDetails() method that prints: "[brand] [modelName]"

int main() {
    // Car myCar("Ford", "Mustang");
    // myCar.honk();
    // myCar.printDetails();
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
using namespace std;

class Vehicle {
protected:
    string brand;
public:
    Vehicle(string b) : brand(b) {}
    void honk() { cout << "Tuut, tuut!\\n"; }
};

class Car : public Vehicle {
public:
    string modelName;
    Car(string b, string m) : Vehicle(b), modelName(m) {}
    
    void printDetails() {
        cout << brand << " " << modelName << endl;
    }
};

int main() {
    Car myCar("Ford", "Mustang");
    myCar.honk();
    myCar.printDetails();
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: 'Tuut, tuut!\nFord Mustang', description: 'Creating a Ford Mustang and calling inherited and local methods.' }
  ],
  hints: [
    'Define the class: `class Car : public Vehicle { ... };`',
    'Constructor syntax: `Car(string b, string m) : Vehicle(b) { modelName = m; }` or use full initializer list.',
    'Make sure to uncomment the code inside `main()` after you define the class!'
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['inheritance', 'OOP', 'classes', 'derived'],
};
export default lesson;
