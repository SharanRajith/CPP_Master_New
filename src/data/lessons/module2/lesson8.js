const lesson = {
  id: 'm2-l8',
  title: 'Operator Overloading',
  module: 2,
  lessonNumber: 8,
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Operator Overloading

In C++, you can change the way operators (like \`+\`, \`-\`, \`==\`, \`<<\`) work for user-defined classes. This makes classes feel like built-in primitive types!

## Overloading +

Imagine we have a \`Vector2D\` class. Normally, we can't do \`v1 + v2\`. Let's define it using the \`operator\` keyword:

\`\`\`cpp
class Vector2D {
public:
    int x, y;
    Vector2D(int x, int y) : x(x), y(y) {}

    // Overload the + operator
    Vector2D operator+(const Vector2D& other) {
        return Vector2D(this->x + other.x, this->y + other.y);
    }
};

int main() {
    Vector2D v1(1, 2);
    Vector2D v2(3, 4);
    Vector2D v3 = v1 + v2; // Calls v1.operator+(v2)
    // v3 is now (4, 6)
}
\`\`\`

## Overloading ==

You can also overload comparison operators to check if two objects are equal.

\`\`\`cpp
bool operator==(const Vector2D& other) {
    return (this->x == other.x && this->y == other.y);
}
\`\`\`

> **Insight:** By passing parameters as \`const Type&\` (constant references), we prevent C++ from making unnecessary copies of the objects, which is excellent for performance.
`,
  starterCode: `#include <iostream>
using namespace std;

class Point {
public:
    int x, y;
    Point(int x=0, int y=0) : x(x), y(y) {}

    // TODO: Overload the '-' operator to subtract two Points
    // return a new Point(this.x - other.x, this.y - other.y)

    
    // TODO: Overload the '==' operator to compare two Points
    // return true if both x and y are strictly equal

};

int main() {
    Point p1(10, 5);
    Point p2(3, 2);
    Point p3 = p1 - p2;
    
    cout << p3.x << " " << p3.y << endl;
    cout << (p1 == p2) << endl;
    cout << (p3 == Point(7, 3)) << endl;
    
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

class Point {
public:
    int x, y;
    Point(int x=0, int y=0) : x(x), y(y) {}

    Point operator-(const Point& other) {
        return Point(x - other.x, y - other.y);
    }
    
    bool operator==(const Point& other) {
        return (x == other.x && y == other.y);
    }
};

int main() {
    Point p1(10, 5);
    Point p2(3, 2);
    Point p3 = p1 - p2;
    
    cout << p3.x << " " << p3.y << endl;
    cout << (p1 == p2) << endl;
    cout << (p3 == Point(7, 3)) << endl;
    
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '7 3\n0\n1', description: 'Tests subtraction yielding a new point and correctly evaluated boolean comparisons.' }
  ],
  hints: [
    'The minus operator looks like: `Point operator-(const Point& other)`',
    'The equality operator looks like: `bool operator==(const Point& other)`'
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['operator-overloading', 'OOP', 'classes', 'C++'],
};
export default lesson;
