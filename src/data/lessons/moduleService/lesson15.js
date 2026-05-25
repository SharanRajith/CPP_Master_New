const lesson = {
  id: 'msvc-l15',
  title: 'TCS: Scenario-Based DSA Questions',
  module: 'service',
  xpReward: 10,
  leetcodeProblems: [
    { id: 155, title: 'Min Stack',                     url: 'https://leetcode.com/problems/min-stack/',                     difficulty: 'Medium' },
    { id: 146, title: 'LRU Cache',                     url: 'https://leetcode.com/problems/lru-cache/',                     difficulty: 'Medium' },
    { id: 232, title: 'Implement Queue using Stacks',  url: 'https://leetcode.com/problems/implement-queue-using-stacks/', difficulty: 'Easy'   },
  ],
  content: `# TCS Interview — Scenario-Based DSA Questions

TCS Technical HR and MR rounds now present real-world situations and ask you to pick the right data structure and write code for it. The DSA concept is the same — only the framing changes.

---

## How to Approach Scenario Questions

1. **Identify the core operation** — what does the system need to do fast? (insert, delete, find min, find recent, etc.)
2. **Map to a data structure** — match the operation to what you know.
3. **Write the code** — implement the key operation.

---

## Scenario 1 — Browser History (Back / Forward)

> "Design the Back and Forward buttons of a browser."

**Mapping:** Two stacks — one for back history, one for forward history.

\`\`\`cpp
stack<string> back, forward;
string current = "home";

void visit(string url) {
    back.push(current);
    current = url;
    while (!forward.empty()) forward.pop(); // clear forward on new visit
}

void goBack() {
    if (back.empty()) return;
    forward.push(current);
    current = back.top(); back.pop();
}

void goForward() {
    if (forward.empty()) return;
    back.push(current);
    current = forward.top(); forward.pop();
}
\`\`\`

---

## Scenario 2 — OTP Expiry System

> "Build a system where OTPs expire after 5 minutes. Check if an OTP is still valid."

**Mapping:** HashMap storing OTP → timestamp. Check if current time - stored time < 300 seconds.

\`\`\`cpp
#include <chrono>
#include <unordered_map>
using namespace std;

unordered_map<string, long long> otpStore;

long long now() {
    return chrono::duration_cast<chrono::seconds>(
        chrono::system_clock::now().time_since_epoch()).count();
}

void generateOTP(string otp) {
    otpStore[otp] = now();
}

bool isValid(string otp) {
    if (!otpStore.count(otp)) return false;
    return (now() - otpStore[otp]) < 300; // 5 minutes
}
\`\`\`

---

## Scenario 3 — Stock Price Tracker (Get Min Price Anytime)

> "Track stock prices. At any point, return the minimum price seen so far in O(1)."

**Mapping:** Min Stack — a stack that also tracks the current minimum.

\`\`\`cpp
stack<pair<int,int>> st; // {value, currentMin}

void push(int val) {
    int minVal = st.empty() ? val : min(val, st.top().second);
    st.push({val, minVal});
}

int getMin() { return st.top().second; }
int top()    { return st.top().first; }
void pop()   { st.pop(); }

// push(5) → min=5
// push(3) → min=3
// push(7) → min=3
// getMin() → 3
\`\`\`

---

## Scenario 4 — Recently Viewed Products (LRU Cache)

> "An e-commerce site shows the last K products a user viewed. If a product is viewed again, move it to the front."

**Mapping:** LRU Cache — doubly linked list + hash map.

\`\`\`cpp
// Use C++ built-in: list (doubly linked) + unordered_map
class LRUCache {
    int cap;
    list<pair<int,int>> lst;          // {key, value}
    unordered_map<int, list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int capacity) : cap(capacity) {}

    int get(int key) {
        if (!mp.count(key)) return -1;
        lst.splice(lst.begin(), lst, mp[key]); // move to front
        return mp[key]->second;
    }

    void put(int key, int value) {
        if (mp.count(key)) lst.erase(mp[key]);
        lst.push_front({key, value});
        mp[key] = lst.begin();
        if (lst.size() > cap) { mp.erase(lst.back().first); lst.pop_back(); }
    }
};
\`\`\`

---

## Scenario 5 — Cab Booking Priority (Nearest Driver First)

> "Multiple drivers are available. Always assign the one with the shortest ETA first."

**Mapping:** Min-Heap (priority_queue with greater<>).

\`\`\`cpp
priority_queue<pair<int,string>, vector<pair<int,string>>, greater<>> pq;
// {eta, driverName}

pq.push({5, "Driver A"});
pq.push({2, "Driver B"});
pq.push({8, "Driver C"});

auto [eta, driver] = pq.top(); pq.pop();
// driver = "Driver B" (ETA = 2, lowest)
\`\`\`

---

## Scenario → DSA Mapping Table

| Scenario | Data Structure | Key Insight |
|---|---|---|
| Browser back/forward | Two Stacks | Back = undo stack, Forward = redo stack |
| OTP / session expiry | HashMap + timestamp | Store time of creation, compare on check |
| Get min/max in O(1) | Min/Max Stack | Track running min alongside values |
| Recently viewed / LRU | Doubly linked list + HashMap | O(1) access + O(1) reorder |
| Nearest / highest priority | Min/Max Heap | Always serves the extreme element first |
| Autocomplete / prefix search | Trie | Common prefix tree for string lookup |
| Friend-of-friend / network | Graph (BFS) | Model connections as adjacency list |

> In your TCS interview: state the data structure first, explain why, then code it. Interviewers give marks for the reasoning, not just the code.
`,
  starterCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

/*
 * SCENARIO: Browser History — Back and Forward
 * ---------------------------------------------------
 * A browser has Back and Forward buttons.
 * - visit(url)   : go to a new page
 * - goBack()     : go to the previous page
 *
 * Data Structure: Two Stacks
 *   back  stack → stores pages you came from
 *   fwd   stack → stores pages you went forward through
 */

stack<string> back, fwd;
string current = "home";

void visit(string url) {
    // TODO: Push current to back stack, update current, clear forward stack
}

void goBack() {
    // TODO: Move current to forward stack, restore previous from back
}

int main() {
    visit("google.com");
    visit("youtube.com");
    visit("github.com");
    cout << current << "\\n"; // github.com
    goBack();
    cout << current << "\\n"; // youtube.com
    goBack();
    cout << current << "\\n"; // google.com
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

stack<string> back, fwd;
string current = "home";

void visit(string url) {
    back.push(current);
    current = url;
    while (!fwd.empty()) fwd.pop();
}

void goBack() {
    if (back.empty()) return;
    fwd.push(current);
    current = back.top(); back.pop();
}

int main() {
    visit("google.com");
    visit("youtube.com");
    visit("github.com");
    cout << current << "\\n";
    goBack();
    cout << current << "\\n";
    goBack();
    cout << current << "\\n";
    return 0;
}`,
  testCases: [
    { description: 'Visit 3 pages, go back twice — should print github.com, youtube.com, google.com', expectedOutput: 'github.com\nyoutube.com\ngoogle.com' },
  ],
  hints: [
    'visit(): push current to back stack, set current = url, clear the forward stack.',
    'goBack(): push current to forward stack, pop from back stack and set as current.',
    'Clearing the forward stack on visit() matches real browser behavior.',
  ],
  complexity: { time: 'O(1) per operation', space: 'O(N) history size' },
  tags: ['tcs', 'scenario', 'stack', 'hashmap', 'interview'],
};
export default lesson;
