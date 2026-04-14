const lesson = {
  id: 'm2-l1', title: 'Structs vs Classes', module: 2, lessonNumber: 1, xpReward: 10,
  leetcodeProblems: [],
  content: `# Structs vs Classes in C++

Both \`struct\` and \`class\` create user-defined types. The **only difference** in C++ is default access:

- **struct** — members are \`public\` by default
- **class** — members are \`private\` by default

## Struct Example

\`\`\`cpp
struct Point {
    int x;        // public by default
    int y;
    
    void print() {
        cout << "(" << x << ", " << y << ")\\n";
    }
};

Point p = {3, 4};
p.print();    // (3, 4)
p.x = 10;    // ✓ accessible (public)
\`\`\`

## Class Example

\`\`\`cpp
class Circle {
private:
    double radius;    // private by default

public:
    Circle(double r) : radius(r) {}
    double area() { return 3.14159 * radius * radius; }
    double getRadius() { return radius; }
    void setRadius(double r) { radius = r; }
};

Circle c(5.0);
cout << c.area();       // 78.54
// c.radius = 3;        // ERROR: private!
c.setRadius(3.0);       // Use public setter ✓
\`\`\`

## When to Use Which

| Use \`struct\` for | Use \`class\` for |
|---|---|
| Plain data holders | Objects with behavior |
| POD types (Point, Color) | Encapsulated entities |
| Simple grouping | Business logic |

> In modern C++, the distinction is mostly stylistic. Many codebases use \`struct\` for data-only types and \`class\` for types with significant behavior.
`,
  starterCode: `#include <iostream>
using namespace std;

struct Rectangle {
    // Add: width (double), height (double)
    // Add: area() function (returns width * height)
    // Add: perimeter() function (returns 2*(width+height))
};

int main() {
    double w, h;
    cin >> w >> h;
    Rectangle r = {w, h};
    cout << r.area() << "\\n" << r.perimeter() << endl;
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

struct Rectangle {
    double width, height;
    double area() { return width * height; }
    double perimeter() { return 2 * (width + height); }
};

int main() {
    double w, h;
    cin >> w >> h;
    Rectangle r = {w, h};
    cout << r.area() << "\\n" << r.perimeter() << endl;
    return 0;
}`,
  testCases: [
    { input: '4 5', expectedOutput: '20\n18', description: '4×5 rect: area=20, perimeter=18' },
    { input: '3 3', expectedOutput: '9\n12',  description: 'Square: area=9, perimeter=12' },
  ],
  hints: [
    'Inside the struct, declare `double width, height;` as member variables.',
    'Add `double area() { return width * height; }`',
    'Add `double perimeter() { return 2 * (width + height); }`',
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['struct', 'class', 'OOP', 'encapsulation'],
};
export default lesson;
