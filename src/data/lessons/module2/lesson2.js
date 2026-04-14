const lesson = {
  id: 'm2-l2', title: 'Constructors & Destructors', module: 2, lessonNumber: 2, xpReward: 10,
  leetcodeProblems: [],
  content: `# Constructors & Destructors

## Constructor

A constructor is a special function that runs when an object is **created**. It initializes the object's state.

\`\`\`cpp
class Dog {
private:
    string name;
    int age;
public:
    // Default constructor
    Dog() : name("Unknown"), age(0) {}
    
    // Parameterized constructor
    Dog(string n, int a) : name(n), age(a) {}
    
    void bark() { cout << name << " says Woof!\\n"; }
};

Dog d1;             // Default constructor
Dog d2("Rex", 3);   // Parameterized constructor
d2.bark();          // Rex says Woof!
\`\`\`

## Destructor

Called automatically when object goes out of scope. Used to **clean up resources**.

\`\`\`cpp
class Buffer {
    int* data;
public:
    Buffer(int size) {
        data = new int[size];
        cout << "Buffer allocated\\n";
    }
    ~Buffer() {           // Destructor: ~ prefix, no args
        delete[] data;    // Free heap memory!
        cout << "Buffer freed\\n";
    }
};
// When Buffer goes out of scope, destructor auto-called
\`\`\`

## Initializer List (preferred)

\`\`\`cpp
class Person {
    string name;
    int age;
public:
    // Initializer list: faster than assignment in body
    Person(string n, int a) : name(n), age(a) {}
};
\`\`\`
`,
  starterCode: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
    string owner;
    double balance;
public:
    // Constructor: initialize owner and balance
    BankAccount(string name, double initial) : owner(name), balance(initial) {}
    
    void deposit(double amount) { balance += amount; }
    void withdraw(double amount) { if (amount <= balance) balance -= amount; }
    void print() { cout << owner << ": $" << balance << endl; }
};

int main() {
    BankAccount acc("Alice", 1000.0);
    acc.deposit(500.0);
    acc.withdraw(200.0);
    acc.print();
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
    string owner;
    double balance;
public:
    BankAccount(string name, double initial) : owner(name), balance(initial) {}
    void deposit(double amount) { balance += amount; }
    void withdraw(double amount) { if (amount <= balance) balance -= amount; }
    void print() { cout << owner << ": $" << balance << endl; }
};

int main() {
    BankAccount acc("Alice", 1000.0);
    acc.deposit(500.0);
    acc.withdraw(200.0);
    acc.print();
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: 'Alice: $1300', description: '1000 + 500 - 200 = 1300' },
  ],
  hints: [
    'The constructor is already given. Just run the starter code to test.',
    'deposit(500) → balance = 1500, withdraw(200) → balance = 1300.',
    'cout fixed precision: `cout << fixed; cout.precision(0);` if you see decimals.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['constructor', 'destructor', 'OOP', 'initializer-list'],
};
export default lesson;
