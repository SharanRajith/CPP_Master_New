const lesson = {
  id: 'm2-l5',
  title: 'Polymorphism & Virtual Functions',
  module: 2,
  lessonNumber: 5,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Polymorphism & Virtual Functions

**Polymorphism** (Greek for "many forms") occurs when we have many classes that are related to each other by inheritance. It allows us to perform a single action in different ways.

In C++, true runtime polymorphism is achieved through **Pointers** and **Virtual Functions**.

## The Problem

If you have a base class pointer that points to a derived class object, C++ will naturally call the **Base Class** version of the method, because the pointer is of the Base type!

\`\`\`cpp
class Animal {
public:
    void makeSound() { cout << "Animal sound\\n"; }
};

class Dog : public Animal {
public:
    void makeSound() { cout << "Woof!\\n"; }
};

int main() {
    Animal* myAnimal = new Dog();
    myAnimal->makeSound(); // Prints "Animal sound" (Uh oh!)
}
\`\`\`

## The Solution: \`virtual\`

By declaring the base class method as \`virtual\`, we tell the C++ compiler: *"Don't decide which function to run right now (at compile time). Wait until the program is running, look at what object the pointer is ACTUALLY pointing to, and call that object's function."*

This is called **Dynamic Dispatch**.

\`\`\`cpp
class Animal {
public:
    // Now it's virtual!
    virtual void makeSound() { cout << "Animal sound\\n"; }
};

class Dog : public Animal {
public:
    // 'override' is optional but great practice!
    void makeSound() override { cout << "Woof!\\n"; } 
};

int main() {
    Animal* myAnimal = new Dog();
    myAnimal->makeSound(); // Prints "Woof!" (Yay!)
}
\`\`\`

> **Important:** Creating a single base class pointer and using it to point to various different child classes is extremely powerful for creating arrays/vectors of mixed objects!
`,
  starterCode: `#include <iostream>
#include <vector>
using namespace std;

class Shape {
public:
    // TODO: Make this function virtual
    void draw() {
        cout << "Drawing Base Shape\\n";
    }
};

class Circle : public Shape {
public:
    void draw() { // Try adding 'override' here
        cout << "Drawing Circle\\n";
    }
};

class Square : public Shape {
public:
    void draw() {
        cout << "Drawing Square\\n";
    }
};

int main() {
    // Array of Shape pointers pointing to different children!
    vector<Shape*> shapes;
    shapes.push_back(new Circle());
    shapes.push_back(new Square());
    
    // Iterate and call draw()
    for (Shape* s : shapes) {
        s->draw(); 
    }
    
    // Memory cleanup
    for (Shape* s : shapes) delete s;
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <vector>
using namespace std;

class Shape {
public:
    virtual void draw() {
        cout << "Drawing Base Shape\\n";
    }
    virtual ~Shape() {} // Good practice for base classes
};

class Circle : public Shape {
public:
    void draw() override {
        cout << "Drawing Circle\\n";
    }
};

class Square : public Shape {
public:
    void draw() override {
        cout << "Drawing Square\\n";
    }
};

int main() {
    vector<Shape*> shapes;
    shapes.push_back(new Circle());
    shapes.push_back(new Square());
    
    for (Shape* s : shapes) {
        s->draw(); 
    }
    
    for (Shape* s : shapes) delete s;
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: 'Drawing Circle\nDrawing Square', description: 'Creates vector of Shapes and accurately delegates calls via dynamic dispatch.' }
  ],
  hints: [
    'Add the word `virtual` before the return type `void` in the `Shape` class.',
    'Add `override` after the `draw()` function signature in the child classes to be explicit.'
  ],
  complexity: { time: 'O(N)', space: 'O(N)' },
  tags: ['polymorphism', 'virtual', 'OOP', 'classes', 'dynamic-dispatch'],
};
export default lesson;
