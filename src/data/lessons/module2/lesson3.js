const lesson = {
  id: 'm2-l3',
  title: 'Encapsulation & Access Modifiers',
  module: 2,
  lessonNumber: 3,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Encapsulation & Access Modifiers

**Encapsulation** is the bundling of data (variables) and the methods (functions) that operate on that data into a single unit (class). It also involves restricting direct access to some of the object's components, which is crucial for preventing accidental interference and misuse.

This restriction is achieved in C++ using **Access Modifiers**.

## Access Modifiers

1. \`public\`: Members are accessible from anywhere outside the class.
2. \`private\`: Members are accessible **only** from within the class itself (and by its \`friend\` functions). This is the default for \`class\`.
3. \`protected\`: Similar to \`private\`, but members are also accessible in **derived (child) classes**. (Covered more in Inheritance).

## Why use Private Data?

If everything is public, anyone can change a variable to an invalid state.

\`\`\`cpp
class BankAccount {
public: // BAD IDEA!
    double balance; 
};

BankAccount myAcct;
myAcct.balance = -9999.0; // Oops! Invalid state allowed.
\`\`\`

By making data \`private\`, you force users of your class to go through your \`public\` **Getter and Setter** methods. This allows you to add validation logic!

\`\`\`cpp
class BankAccount {
private:
    double balance; // Hidden from the outside world

public:
    BankAccount(double initial) : balance(initial) {}

    // Getter
    double getBalance() { return balance; }

    // Setter with validation
    bool deposit(double amount) {
        if (amount <= 0) return false;
        balance += amount;
        return true;
    }
};
\`\`\`

### Key Takeaways
- Always default to making member variables \`private\`.
- Only expose what absolutely needs to be exposed via \`public\` methods (the interface).
- This separation of internal implementation and external interface reduces bugs and makes code easier to maintain!
`,
  starterCode: `#include <iostream>
using namespace std;

class Temperature {
// Make the temperature variable private!
// It should store the temperature in Celsius

public:
    // Create a constructor that initializes the Celsius value
    
    // Create a setter 'setCelsius(double c)' that only updates the value if c >= -273.15 (Absolute Zero)
    // Return true if successful, false otherwise.
    
    // Create a getter 'getCelsius()'
    
    // Create a getter 'getFahrenheit()' returning: (celsius * 9.0 / 5.0) + 32.0
};

int main() {
    Temperature t(25.0);
    cout << t.getCelsius() << " " << t.getFahrenheit() << endl;
    
    // Attempting invalid temp
    bool success = t.setCelsius(-300.0);
    cout << success << " " << t.getCelsius() << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

class Temperature {
private:
    double celsius;

public:
    Temperature(double c) {
        if (c >= -273.15) celsius = c;
        else celsius = -273.15;
    }
    
    bool setCelsius(double c) {
        if (c >= -273.15) {
            celsius = c;
            return true;
        }
        return false;
    }
    
    double getCelsius() { return celsius; }
    
    double getFahrenheit() { return (celsius * 9.0 / 5.0) + 32.0; }
};

int main() {
    Temperature t(25.0);
    cout << t.getCelsius() << " " << t.getFahrenheit() << endl;
    bool success = t.setCelsius(-300.0);
    cout << success << " " << t.getCelsius() << endl;
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '25 77\n0 25', description: 'Checks valid initial temp, calculates F, then rejects -300 update.' }
  ],
  hints: [
    'Add `private: double celsius;` at the top.',
    'For the constructor: `Temperature(double c) : celsius(c) {}` (you can assume initial is valid for simplicity).',
    'In `setCelsius`, check `if (c >= -273.15)`. Note that `cout << false` prints `0`.'
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['encapsulation', 'access-modifiers', 'OOP', 'classes'],
};
export default lesson;
