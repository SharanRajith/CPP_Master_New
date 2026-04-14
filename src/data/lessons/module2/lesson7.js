const lesson = {
  id: 'm2-l7',
  title: 'Templates (Generics)',
  module: 2,
  lessonNumber: 7,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Templates

C++ **Templates** allow you to write generic programs. Pass data types as parameters so that you don't need to write the same code for different data types! This is similar to Generics in Java or C#.

## Function Templates

Imagine writing a function to find the maximum of two numbers:
\`\`\`cpp
int findMax(int a, int b) { return (a > b) ? a : b; }
double findMax(double a, double b) { return (a > b) ? a : b; }
\`\`\`
It's repetitive! Instead, we define a template:

\`\`\`cpp
template <typename T>
T findMax(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    cout << findMax<int>(5, 10);      // T becomes int
    cout << findMax<double>(3.5, 2.1); // T becomes double
    cout << findMax(3, 4);            // C++ can auto-deduce T!
}
\`\`\`

## Class Templates

You can also make entire classes generic. This is exactly how the C++ Standard Template Library (STL) works (like \`std::vector<int>\`)!

\`\`\`cpp
template <typename T>
class Box {
private:
    T content;
public:
    Box(T c) : content(c) {}
    T getContent() { return content; }
};

int main() {
    Box<int> intBox(123);
    Box<string> strBox("Hello");
}
\`\`\`

> **Note:** The compiler actually generates a completely new copy of the template code for every distinct type you use it with during compilation! This is why C++ templates are incredibly fast at runtime.
`,
  starterCode: `#include <iostream>
using namespace std;

// TODO: Create a function template named 'getMin'
// It should take two arguments of type T, and return the smaller one.


int main() {
    // Tests
    // cout << getMin<int>(5, 2) << endl;
    // cout << getMin<double>(3.14, 6.28) << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

template <typename T>
T getMin(T a, T b) {
    return (a < b) ? a : b;
}

int main() {
    cout << getMin<int>(5, 2) << endl;
    cout << getMin<double>(3.14, 6.28) << endl;
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '2\n3.14', description: 'Tests template function with integers and doubles.' }
  ],
  hints: [
    'Define the template using `template <typename T>` above the function.',
    'The function signature should be `T getMin(T a, T b)`.',
    'Uncomment the lines in main() to see it work.'
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['templates', 'generics', 'functions', 'C++'],
};
export default lesson;
