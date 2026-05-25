const lesson = {
  id: 'apt-l2',
  title: 'Time, Speed & Distance',
  module: 'aptitude',
  xpReward: 10,
  leetcodeProblems: [],
  content: `# Time, Speed & Distance

TSD is one of the highest-frequency topics in TCS NQT and Wipro NLTH. Expect 2–4 questions per test.

---

## Core Formula

\`\`\`
Speed = Distance / Time
Distance = Speed × Time
Time = Distance / Speed
\`\`\`

**Unit Conversions:**
\`\`\`
km/h → m/s : multiply by 5/18
m/s  → km/h: multiply by 18/5

Example: 72 km/h = 72 × 5/18 = 20 m/s
\`\`\`

---

## Key Shortcuts

### Average Speed (two equal distances)
\`\`\`
Average Speed = 2ab / (a + b)    where a, b are the two speeds
\`\`\`
❌ NOT (a + b) / 2 — that's the common wrong answer in NQT!

Example: Travels 60 km/h one way, 40 km/h return.
Average = 2×60×40 / (60+40) = 4800/100 = **48 km/h**

### Relative Speed
\`\`\`
Same direction    : |S1 - S2|
Opposite direction: S1 + S2
\`\`\`

### Train Problems
\`\`\`
Time to cross a pole/person  = Train Length / Speed
Time to cross a platform     = (Train + Platform Length) / Speed
Two trains crossing each other = (L1 + L2) / Relative Speed
\`\`\`

### Boat & Stream
\`\`\`
Downstream speed = Boat speed + Stream speed   (u + v)
Upstream speed   = Boat speed - Stream speed   (u - v)
Boat speed       = (Downstream + Upstream) / 2
Stream speed     = (Downstream - Upstream) / 2
\`\`\`

---

## Solved Examples

**Q1.** A train 200m long crosses a 300m platform in 25 seconds. Speed?
\`\`\`
Total distance = 200 + 300 = 500m
Speed = 500/25 = 20 m/s = 20 × 18/5 = 72 km/h
\`\`\`

**Q2.** A goes 60 km/h, B goes 40 km/h, same direction, B starts 2 hrs early. When does A catch B?
\`\`\`
Head start = 40 × 2 = 80 km
Relative speed = 60 - 40 = 20 km/h
Time to catch = 80 / 20 = 4 hours
\`\`\`

**Q3.** Boat speed 10 km/h, stream 2 km/h. Time to go 24 km upstream?
\`\`\`
Upstream speed = 10 - 2 = 8 km/h
Time = 24 / 8 = 3 hours
\`\`\`

---

## NQT Pattern — Common Question Types

| Type | Trick |
|---|---|
| Average speed | 2ab/(a+b) — not arithmetic mean |
| Train crossing pole | length / speed |
| Train crossing train | sum of lengths / relative speed |
| Boat upstream/downstream | u±v formula |
| Meeting point | Sum of distances / sum of speeds |

> The **average speed trap** (using (a+b)/2 instead of 2ab/(a+b)) is the #1 way students lose marks in this section.
`,
  starterCode: `#include <iostream>
using namespace std;

/*
 * APTITUDE: Time, Speed & Distance
 * ---------------------------------------------------
 * Implement two functions:
 * 1. averageSpeed(s1, s2) — average speed for equal distances at s1 and s2
 * 2. trainCrossTime(trainLen, platformLen, speedKmh) — seconds to cross platform
 *
 * Both are commonly asked in NQT aptitude sections.
 */

double averageSpeed(double s1, double s2) {
    // TODO: Return average speed using harmonic mean formula 2ab/(a+b)
    // Do NOT use (s1 + s2) / 2
    return 0;
}

double trainCrossTime(double trainLen, double platformLen, double speedKmh) {
    // TODO: Return time in seconds to cross the platform
    // Convert speed from km/h to m/s first (multiply by 5/18)
    return 0;
}

int main() {
    cout << averageSpeed(60, 40)           << "\\n"; // 48
    cout << trainCrossTime(200, 300, 72)   << "\\n"; // 25
    return 0;
}`,
  modelAnswer: `#include <iostream>
using namespace std;

double averageSpeed(double s1, double s2) {
    return (2 * s1 * s2) / (s1 + s2);
}

double trainCrossTime(double trainLen, double platformLen, double speedKmh) {
    double speedMs = speedKmh * 5.0 / 18.0;
    return (trainLen + platformLen) / speedMs;
}

int main() {
    cout << averageSpeed(60, 40)           << "\\n";
    cout << trainCrossTime(200, 300, 72)   << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'averageSpeed(60,40)=48, trainCrossTime(200,300,72)=25', expectedOutput: '48\n25' },
  ],
  hints: [
    'Average speed formula: 2×s1×s2 / (s1+s2). Using (s1+s2)/2 is WRONG for equal distances.',
    'Convert km/h to m/s: multiply by 5/18.',
    'Train crossing time = (train length + platform length) / speed in m/s.',
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  tags: ['aptitude', 'tsd', 'time-speed-distance', 'tcs', 'wipro'],
};
export default lesson;
