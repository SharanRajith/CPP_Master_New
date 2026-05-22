// Cheat sheet markdown content keyed by module ID
export const CHEAT_SHEETS = {

'module-1': `
## C++ Fundamentals

### Data Types
| Type | Size | Range |
|------|------|-------|
| \`int\` | 4 B | ±2.1 × 10⁹ |
| \`long long\` | 8 B | ±9.2 × 10¹⁸ |
| \`float\` | 4 B | ~7 sig digits |
| \`double\` | 8 B | ~15 sig digits |
| \`char\` | 1 B | 0–255 |
| \`bool\` | 1 B | true/false |

### Operators
\`\`\`cpp
// Arithmetic: + - * / % ++ --
// Comparison: == != < > <= >=
// Logical:    && || !
// Bitwise:    & | ^ ~ << >>
// Ternary:    x > 0 ? x : -x
\`\`\`

### I/O
\`\`\`cpp
cin >> x >> y;
cout << "val=" << x << "\\n";
getline(cin, str);           // read full line
cin.ignore();                // flush newline before getline
printf("%.2f\\n", 3.14);     // C-style
\`\`\`

### Loops
\`\`\`cpp
for (int i = 0; i < n; i++) { }
for (auto& x : vec) { }      // range-for
while (cond) { }
do { } while (cond);
break; continue;
\`\`\`

### Functions
\`\`\`cpp
int add(int a, int b) { return a + b; }
void swap(int& a, int& b) { int t=a; a=b; b=t; } // pass by ref
int factorial(int n) {                             // recursion
  return n <= 1 ? 1 : n * factorial(n-1);
}
\`\`\`

### Pointers & References
\`\`\`cpp
int x = 5;
int* p = &x;   // pointer to x
*p = 10;       // dereference (x is now 10)
int& r = x;    // reference (alias)

int* arr = new int[n];   // heap alloc
delete[] arr;            // free heap
\`\`\`

### Arrays & Strings
\`\`\`cpp
int a[5] = {1,2,3,4,5};
int b[3][3] = {};            // 2D, zero-init

string s = "hello";
s.size();  s.length();
s.substr(start, len);
s.find("lo");                // returns index or string::npos
s += " world";               // concatenation
stoi(s); to_string(42);
\`\`\`

### Type Casting
\`\`\`cpp
int x = (int)3.7;            // C-style
double d = static_cast<double>(5) / 2;  // 2.5
\`\`\`
`,

'module-2': `
## Object-Oriented Programming

### Class Basics
\`\`\`cpp
class Animal {
public:
  string name;
  Animal(string n) : name(n) {}   // constructor
  virtual void speak() { cout << "...\\n"; }
  virtual ~Animal() {}             // virtual destructor
};
\`\`\`

### Access Modifiers
| Modifier | Class | Subclass | Outside |
|----------|-------|----------|---------|
| \`public\` | ✓ | ✓ | ✓ |
| \`protected\` | ✓ | ✓ | ✗ |
| \`private\` | ✓ | ✗ | ✗ |

### Inheritance
\`\`\`cpp
class Dog : public Animal {
public:
  Dog(string n) : Animal(n) {}
  void speak() override { cout << "Woof\\n"; }
};
Animal* a = new Dog("Rex");
a->speak();   // Woof — runtime polymorphism
delete a;
\`\`\`

### Constructors
\`\`\`cpp
class Point {
  int x, y;
public:
  Point() : x(0), y(0) {}            // default
  Point(int x, int y) : x(x), y(y) {} // parameterized
  Point(const Point& p) : x(p.x), y(p.y) {} // copy
  Point& operator=(const Point& p) { x=p.x; y=p.y; return *this; }
};
\`\`\`

### Move Semantics (C++11)
\`\`\`cpp
Point(Point&& p) noexcept : x(p.x), y(p.y) {}  // move ctor
Point& operator=(Point&& p) noexcept { ... }
std::move(obj);  // cast to rvalue
\`\`\`

### Templates
\`\`\`cpp
template<typename T>
T maxOf(T a, T b) { return a > b ? a : b; }

template<typename T>
class Stack {
  vector<T> data;
public:
  void push(T val) { data.push_back(val); }
  T top() { return data.back(); }
};
\`\`\`

### Operator Overloading
\`\`\`cpp
Point operator+(const Point& p) const {
  return Point(x+p.x, y+p.y);
}
friend ostream& operator<<(ostream& os, const Point& p) {
  return os << "(" << p.x << "," << p.y << ")";
}
\`\`\`

### Abstract Class
\`\`\`cpp
class Shape {
public:
  virtual double area() = 0;  // pure virtual
  virtual ~Shape() {}
};
\`\`\`
`,

'module-3': `
## STL Deep Dive

### vector
\`\`\`cpp
vector<int> v = {3,1,4,1,5};
v.push_back(9);  v.pop_back();
v.size();  v.empty();
v.front();  v.back();
v.resize(10);  v.assign(5, 0);
sort(v.begin(), v.end());
reverse(v.begin(), v.end());
\`\`\`

### list / deque
\`\`\`cpp
list<int> l;
l.push_front(1);  l.push_back(2);
l.pop_front();    l.pop_back();

deque<int> dq;
dq.push_front(1);  dq.push_back(2);
\`\`\`

### stack / queue / priority_queue
\`\`\`cpp
stack<int> st;
st.push(x);  st.top();  st.pop();

queue<int> q;
q.push(x);  q.front();  q.back();  q.pop();

priority_queue<int> maxpq;          // max-heap
priority_queue<int,vector<int>,greater<int>> minpq; // min-heap
pq.push(x);  pq.top();  pq.pop();
\`\`\`

### set / map
\`\`\`cpp
set<int> s;
s.insert(x);  s.erase(x);
s.find(x) != s.end();  s.count(x);

map<string,int> m;
m["key"] = 5;
m.count("key");
for (auto& [k,v] : m) { }

unordered_map<string,int> um;  // O(1) avg
unordered_set<int> us;
\`\`\`

### pair / tuple
\`\`\`cpp
pair<int,int> p = {3, 5};
auto [a, b] = p;               // structured binding

tuple<int,string,double> t = {1,"hi",3.14};
auto [x,y,z] = t;
get<0>(t);
\`\`\`

### Algorithms
\`\`\`cpp
sort(v.begin(), v.end());
sort(v.begin(), v.end(), greater<int>());
sort(v.begin(), v.end(), [](int a, int b){ return a > b; });
binary_search(v.begin(), v.end(), x);   // must be sorted
lower_bound(v.begin(), v.end(), x);     // first >= x
upper_bound(v.begin(), v.end(), x);     // first > x
accumulate(v.begin(), v.end(), 0);
max_element(v.begin(), v.end());
count(v.begin(), v.end(), x);
find(v.begin(), v.end(), x);
unique(v.begin(), v.end());             // remove consecutive dups
\`\`\`

### Lambda
\`\`\`cpp
auto fn = [](int x) { return x * 2; };
auto add = [&total](int x) { total += x; };  // capture by ref
sort(v.begin(), v.end(), [](auto& a, auto& b){ return a.second < b.second; });
\`\`\`

### Bit Manipulation
\`\`\`cpp
x & (1<<i)   // check bit i
x | (1<<i)   // set bit i
x & ~(1<<i)  // clear bit i
x ^ (1<<i)   // toggle bit i
x & (x-1)    // clear lowest set bit
x & (-x)     // isolate lowest set bit
__builtin_popcount(x)  // count set bits
\`\`\`
`,

'module-4': `
## Arrays & Strings DSA

### Two Pointers
\`\`\`cpp
// Sorted pair sum
int l = 0, r = n-1;
while (l < r) {
  int s = a[l] + a[r];
  if (s == target) return {l, r};
  s < target ? l++ : r--;
}
\`\`\`

### Sliding Window
\`\`\`cpp
// Fixed window of size k
int sum = 0;
for (int i = 0; i < k; i++) sum += a[i];
int maxSum = sum;
for (int i = k; i < n; i++) {
  sum += a[i] - a[i-k];
  maxSum = max(maxSum, sum);
}

// Variable window (longest subarray with condition)
int l = 0;
for (int r = 0; r < n; r++) {
  // expand window with a[r]
  while (/* violated */) l++;
  ans = max(ans, r - l + 1);
}
\`\`\`

### Prefix Sum
\`\`\`cpp
vector<int> pre(n+1, 0);
for (int i = 0; i < n; i++) pre[i+1] = pre[i] + a[i];
int rangeSum = pre[r+1] - pre[l];  // sum [l..r]
\`\`\`

### Binary Search
\`\`\`cpp
int lo = 0, hi = n-1;
while (lo <= hi) {
  int mid = lo + (hi-lo)/2;
  if (a[mid] == x) return mid;
  a[mid] < x ? lo = mid+1 : hi = mid-1;
}
// Binary search on answer: lo=min, hi=max, check feasibility
\`\`\`

### Kadane's (Max Subarray)
\`\`\`cpp
int cur = a[0], best = a[0];
for (int i = 1; i < n; i++) {
  cur = max(a[i], cur + a[i]);
  best = max(best, cur);
}
\`\`\`

### HashMap Patterns
\`\`\`cpp
// Frequency count
unordered_map<int,int> freq;
for (int x : a) freq[x]++;

// Prefix sum + map (subarray sum = k)
unordered_map<int,int> seen{{0,1}};
int sum = 0, ans = 0;
for (int x : a) {
  sum += x;
  ans += seen[sum - k];
  seen[sum]++;
}
\`\`\`

### Sorting
| Algorithm | Best | Avg | Worst | Space |
|-----------|------|-----|-------|-------|
| QuickSort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| MergeSort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| HeapSort | O(n log n) | O(n log n) | O(n log n) | O(1) |
| Counting | O(n+k) | O(n+k) | O(n+k) | O(k) |
`,

'module-5': `
## Linked Lists

### Node Definition
\`\`\`cpp
struct ListNode {
  int val;
  ListNode* next;
  ListNode(int x) : val(x), next(nullptr) {}
};
\`\`\`

### Common Patterns
\`\`\`cpp
// Traverse
ListNode* cur = head;
while (cur) { cur = cur->next; }

// Reverse
ListNode* prev = nullptr, *cur = head;
while (cur) {
  ListNode* nxt = cur->next;
  cur->next = prev;
  prev = cur;
  cur = nxt;
}
return prev;

// Dummy head (insert/delete at head)
ListNode dummy(0);
dummy.next = head;
ListNode* cur = &dummy;

// Find length
int len = 0;
ListNode* t = head;
while (t) { len++; t = t->next; }
\`\`\`

### Fast & Slow Pointers
\`\`\`cpp
// Detect cycle
ListNode *slow = head, *fast = head;
while (fast && fast->next) {
  slow = slow->next;
  fast = fast->next->next;
  if (slow == fast) return true; // cycle
}
return false;

// Find middle
while (fast && fast->next) {
  slow = slow->next;
  fast = fast->next->next;
}
// slow is at middle
\`\`\`

### Merge Two Sorted Lists
\`\`\`cpp
ListNode dummy(0);
ListNode* cur = &dummy;
while (l1 && l2) {
  if (l1->val <= l2->val) { cur->next = l1; l1 = l1->next; }
  else                    { cur->next = l2; l2 = l2->next; }
  cur = cur->next;
}
cur->next = l1 ? l1 : l2;
return dummy.next;
\`\`\`

### Remove Nth from End
\`\`\`cpp
ListNode dummy(0); dummy.next = head;
ListNode* fast = &dummy, *slow = &dummy;
for (int i = 0; i <= n; i++) fast = fast->next;
while (fast) { fast = fast->next; slow = slow->next; }
slow->next = slow->next->next;
return dummy.next;
\`\`\`
`,

'module-6': `
## Stacks & Queues

### Stack (LIFO)
\`\`\`cpp
stack<int> st;
st.push(x);
st.top();          // peek, no remove
st.pop();          // remove top
st.empty();
st.size();
\`\`\`

### Queue (FIFO)
\`\`\`cpp
queue<int> q;
q.push(x);
q.front();         // peek front
q.back();          // peek back
q.pop();           // remove front
q.empty();
\`\`\`

### Monotonic Stack
\`\`\`cpp
// Next Greater Element
vector<int> nge(n, -1);
stack<int> st;  // stores indices
for (int i = 0; i < n; i++) {
  while (!st.empty() && a[st.top()] < a[i]) {
    nge[st.top()] = a[i];
    st.pop();
  }
  st.push(i);
}

// Decreasing stack (for next smaller: flip comparison)
\`\`\`

### Balanced Parentheses
\`\`\`cpp
stack<char> st;
for (char c : s) {
  if (c == '(' || c == '[' || c == '{') st.push(c);
  else {
    if (st.empty()) return false;
    char top = st.top(); st.pop();
    if ((c==')' && top!='(') || (c==']' && top!='[') || (c=='}' && top!='{'))
      return false;
  }
}
return st.empty();
\`\`\`

### Min Stack
\`\`\`cpp
stack<int> main_st, min_st;
void push(int x) {
  main_st.push(x);
  if (min_st.empty() || x <= min_st.top()) min_st.push(x);
}
void pop() {
  if (main_st.top() == min_st.top()) min_st.pop();
  main_st.pop();
}
int getMin() { return min_st.top(); }
\`\`\`

### Circular Queue
\`\`\`cpp
class CircularQueue {
  vector<int> buf;
  int head, tail, sz, cap;
public:
  CircularQueue(int k) : buf(k), head(0), tail(0), sz(0), cap(k) {}
  bool enqueue(int val) {
    if (sz == cap) return false;
    buf[tail] = val; tail = (tail+1)%cap; sz++;
    return true;
  }
  bool dequeue() {
    if (!sz) return false;
    head = (head+1)%cap; sz--;
    return true;
  }
};
\`\`\`
`,

'module-7': `
## Trees

### Node Definition
\`\`\`cpp
struct TreeNode {
  int val;
  TreeNode *left, *right;
  TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
\`\`\`

### Traversals
\`\`\`cpp
void inorder(TreeNode* r) {    // Left→Root→Right (sorted for BST)
  if (!r) return;
  inorder(r->left); visit(r); inorder(r->right);
}
void preorder(TreeNode* r) {   // Root→Left→Right (clone/serialize)
  if (!r) return;
  visit(r); preorder(r->left); preorder(r->right);
}
void postorder(TreeNode* r) {  // Left→Right→Root (delete)
  if (!r) return;
  postorder(r->left); postorder(r->right); visit(r);
}

// Level-order (BFS)
queue<TreeNode*> q; q.push(root);
while (!q.empty()) {
  int sz = q.size();
  while (sz--) {
    auto node = q.front(); q.pop();
    if (node->left)  q.push(node->left);
    if (node->right) q.push(node->right);
  }
}
\`\`\`

### BST Operations
\`\`\`cpp
// Search: go left if val < node, right if val > node
// Insert: same logic, attach at null leaf
// Delete: find node, handle 3 cases:
//   leaf → just delete
//   one child → replace with child
//   two children → replace with inorder successor

bool isValidBST(TreeNode* r, long lo = LLONG_MIN, long hi = LLONG_MAX) {
  if (!r) return true;
  if (r->val <= lo || r->val >= hi) return false;
  return isValidBST(r->left, lo, r->val) && isValidBST(r->right, r->val, hi);
}
\`\`\`

### Height & Diameter
\`\`\`cpp
int height(TreeNode* r) {
  if (!r) return 0;
  return 1 + max(height(r->left), height(r->right));
}

int ans = 0;
int dfs(TreeNode* r) {       // diameter
  if (!r) return 0;
  int l = dfs(r->left), ri = dfs(r->right);
  ans = max(ans, l + ri);
  return 1 + max(l, ri);
}
\`\`\`

### LCA
\`\`\`cpp
TreeNode* lca(TreeNode* r, TreeNode* p, TreeNode* q) {
  if (!r || r==p || r==q) return r;
  auto l = lca(r->left, p, q), ri = lca(r->right, p, q);
  return l && ri ? r : (l ? l : ri);
}
\`\`\`
`,

'module-8': `
## Heaps & Priority Queue

### Priority Queue
\`\`\`cpp
// Max-heap (default)
priority_queue<int> maxpq;

// Min-heap
priority_queue<int, vector<int>, greater<int>> minpq;

// Custom comparator
auto cmp = [](pair<int,int>& a, pair<int,int>& b){ return a.first > b.first; };
priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);

pq.push(x);   // O(log n)
pq.top();     // O(1)
pq.pop();     // O(log n)
pq.size();
\`\`\`

### K-th Largest
\`\`\`cpp
// Use min-heap of size k
priority_queue<int,vector<int>,greater<int>> minpq;
for (int x : nums) {
  minpq.push(x);
  if (minpq.size() > k) minpq.pop();
}
return minpq.top();  // k-th largest
\`\`\`

### Merge K Sorted Lists
\`\`\`cpp
using T = pair<int, ListNode*>;
priority_queue<T, vector<T>, greater<T>> pq;
for (auto* l : lists) if (l) pq.push({l->val, l});
ListNode dummy(0); auto* cur = &dummy;
while (!pq.empty()) {
  auto [val, node] = pq.top(); pq.pop();
  cur->next = node; cur = cur->next;
  if (node->next) pq.push({node->next->val, node->next});
}
return dummy.next;
\`\`\`

### Top K Frequent
\`\`\`cpp
unordered_map<int,int> freq;
for (int x : nums) freq[x]++;
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
for (auto& [val, cnt] : freq) {
  pq.push({cnt, val});
  if (pq.size() > k) pq.pop();
}
\`\`\`

### Heap Complexity
| Op | Binary Heap |
|----|-------------|
| Insert | O(log n) |
| Delete max/min | O(log n) |
| Peek max/min | O(1) |
| Heapify | O(n) |
| Heap Sort | O(n log n) |
`,

'module-9': `
## Graphs

### Representation
\`\`\`cpp
// Adjacency list (most common)
vector<vector<int>> adj(n);
adj[u].push_back(v);           // directed
adj[u].push_back(v); adj[v].push_back(u); // undirected

// Weighted
vector<vector<pair<int,int>>> adj(n);  // {neighbor, weight}
adj[u].push_back({v, w});
\`\`\`

### BFS — Shortest path (unweighted)
\`\`\`cpp
vector<int> dist(n, -1);
queue<int> q; q.push(src); dist[src] = 0;
while (!q.empty()) {
  int u = q.front(); q.pop();
  for (int v : adj[u]) {
    if (dist[v] == -1) { dist[v] = dist[u]+1; q.push(v); }
  }
}
\`\`\`

### DFS — Connectivity, Cycles
\`\`\`cpp
vector<bool> vis(n, false);
void dfs(int u) {
  vis[u] = true;
  for (int v : adj[u]) if (!vis[v]) dfs(v);
}
\`\`\`

### Topological Sort (Kahn's BFS)
\`\`\`cpp
vector<int> indeg(n, 0);
for (int u = 0; u < n; u++) for (int v : adj[u]) indeg[v]++;
queue<int> q;
for (int i = 0; i < n; i++) if (!indeg[i]) q.push(i);
vector<int> order;
while (!q.empty()) {
  int u = q.front(); q.pop(); order.push_back(u);
  for (int v : adj[u]) if (--indeg[v] == 0) q.push(v);
}
// if order.size() != n → cycle exists
\`\`\`

### Dijkstra (Weighted Shortest Path)
\`\`\`cpp
vector<int> dist(n, INT_MAX);
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
dist[src] = 0; pq.push({0, src});
while (!pq.empty()) {
  auto [d, u] = pq.top(); pq.pop();
  if (d > dist[u]) continue;
  for (auto [v, w] : adj[u]) {
    if (dist[u]+w < dist[v]) { dist[v] = dist[u]+w; pq.push({dist[v], v}); }
  }
}
\`\`\`

### Union-Find (DSU)
\`\`\`cpp
vector<int> parent(n), rank_(n, 0);
iota(parent.begin(), parent.end(), 0);
int find(int x) {
  return parent[x] == x ? x : parent[x] = find(parent[x]); // path compress
}
bool unite(int x, int y) {
  x = find(x); y = find(y); if (x == y) return false;
  if (rank_[x] < rank_[y]) swap(x,y);
  parent[y] = x; if (rank_[x]==rank_[y]) rank_[x]++;
  return true;
}
\`\`\`
`,

'module-10': `
## Dynamic Programming

### Framework
1. Define state: \`dp[i]\` = answer for subproblem i
2. Base case: smallest valid input
3. Transition: dp[i] in terms of smaller states
4. Return: dp[n] or max/min over dp

### 1D DP Patterns
\`\`\`cpp
// Fibonacci / Climbing Stairs
dp[0]=1; dp[1]=1;
for (int i=2; i<=n; i++) dp[i] = dp[i-1] + dp[i-2];

// House Robber (no adjacent)
dp[0]=a[0]; dp[1]=max(a[0],a[1]);
for (int i=2; i<n; i++) dp[i] = max(dp[i-1], dp[i-2]+a[i]);

// Coin Change (min coins)
dp[0]=0; fill(dp+1, dp+n+1, INT_MAX);
for (int i=1; i<=amount; i++)
  for (int c : coins)
    if (c<=i && dp[i-c]!=INT_MAX) dp[i]=min(dp[i], dp[i-c]+1);
\`\`\`

### 2D DP Patterns
\`\`\`cpp
// Unique Paths
dp[0][j]=1; dp[i][0]=1;
for (int i=1; i<m; i++) for (int j=1; j<n; j++)
  dp[i][j] = dp[i-1][j] + dp[i][j-1];

// LCS (Longest Common Subsequence)
for (int i=1; i<=m; i++) for (int j=1; j<=n; j++) {
  if (a[i-1]==b[j-1]) dp[i][j] = dp[i-1][j-1]+1;
  else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
}
\`\`\`

### 0/1 Knapsack
\`\`\`cpp
// dp[j] = max value using capacity j
for (int i=0; i<n; i++)
  for (int j=W; j>=wt[i]; j--)   // reverse to avoid reuse
    dp[j] = max(dp[j], dp[j-wt[i]] + val[i]);
\`\`\`

### LIS (Longest Increasing Subsequence)
\`\`\`cpp
// O(n log n) — patience sorting
vector<int> tails;
for (int x : a) {
  auto it = lower_bound(tails.begin(), tails.end(), x);
  if (it == tails.end()) tails.push_back(x);
  else *it = x;
}
return tails.size();
\`\`\`

### Memoization Template
\`\`\`cpp
unordered_map<int,int> memo;
int dp(int n) {
  if (n <= 1) return n;
  if (memo.count(n)) return memo[n];
  return memo[n] = dp(n-1) + dp(n-2);
}
\`\`\`
`,

'module-11': `
## Advanced Topics

### Bit Tricks
\`\`\`cpp
n & (n-1)        // clear lowest set bit; 0 if power of 2
n & (-n)         // isolate lowest set bit
n | (n+1)        // set lowest 0 bit
__builtin_popcount(n)   // count 1-bits
__builtin_clz(n)        // leading zeros
__builtin_ctz(n)        // trailing zeros
(n >> i) & 1     // get bit i
n ^ n = 0        // XOR tricks: find single number
a ^ b ^ b = a    // cancellation
\`\`\`

### Intervals
\`\`\`cpp
// Merge intervals (sort by start)
sort(ivs.begin(), ivs.end());
vector<pair<int,int>> res = {ivs[0]};
for (auto [s,e] : ivs) {
  if (s <= res.back().second) res.back().second = max(res.back().second, e);
  else res.push_back({s,e});
}

// Meeting rooms II (min conference rooms)
sort(starts.begin(), starts.end());
sort(ends.begin(), ends.end());
int rooms=0, e=0;
for (int s : starts) rooms += (s < ends[e] ? 1 : (e++, 0));
\`\`\`

### Two Pointers Advanced
\`\`\`cpp
// 3Sum
sort(a.begin(), a.end());
for (int i=0; i<n-2; i++) {
  if (i>0 && a[i]==a[i-1]) continue;
  int l=i+1, r=n-1;
  while (l<r) {
    int s=a[i]+a[l]+a[r];
    if (s==0) { result.push_back({a[i],a[l],a[r]}); while(l<r&&a[l]==a[l+1])l++; while(l<r&&a[r]==a[r-1])r--; l++; r--; }
    else if (s<0) l++; else r--;
  }
}
\`\`\`

### Math
\`\`\`cpp
// GCD / LCM
int gcd(int a, int b) { return b ? gcd(b, a%b) : a; }
int lcm(int a, int b) { return a / gcd(a,b) * b; }

// Sieve of Eratosthenes
vector<bool> is_prime(n+1, true);
is_prime[0]=is_prime[1]=false;
for (int i=2; i*i<=n; i++)
  if (is_prime[i]) for (int j=i*i; j<=n; j+=i) is_prime[j]=false;

// Fast power
long long power(long long b, long long e, long long mod) {
  long long res=1; b%=mod;
  while (e>0) { if (e&1) res=res*b%mod; b=b*b%mod; e>>=1; }
  return res;
}
\`\`\`
`,

'module-12': `
## Interview Patterns

### Pattern → Technique Map
| Signal in problem | Technique |
|-------------------|-----------|
| Sorted array + target | Two pointers / Binary search |
| Substring / subarray | Sliding window |
| Subarray sum = k | Prefix sum + HashMap |
| K largest / smallest | Heap (priority_queue) |
| Shortest path (unweighted) | BFS |
| Shortest path (weighted) | Dijkstra |
| All paths / combinations | DFS / Backtracking |
| Optimal substructure | DP |
| Repeated subproblems | Memoization |
| Connected components | Union-Find or DFS |
| Ordered stream / next greater | Monotonic stack |
| LRU / LFU | HashMap + Doubly linked list |

### Backtracking Template
\`\`\`cpp
void backtrack(int start, vector<int>& cur, vector<vector<int>>& res) {
  res.push_back(cur);
  for (int i = start; i < n; i++) {
    cur.push_back(nums[i]);
    backtrack(i+1, cur, res);
    cur.pop_back();             // undo
  }
}
\`\`\`

### Binary Search on Answer
\`\`\`cpp
int lo = min_val, hi = max_val;
while (lo < hi) {
  int mid = lo + (hi-lo)/2;
  if (feasible(mid)) hi = mid;   // or lo = mid+1
  else lo = mid+1;               // depends on direction
}
return lo;
\`\`\`

### Greedy Checklist
1. Define what "locally optimal" means
2. Prove/argue the greedy choice never blocks a better future choice
3. Sort first (most greedy problems need sorted input)
4. Scan left to right, always take the best local option

### Time Complexity Quick-Ref
| Pattern | Typical Complexity |
|---------|-------------------|
| Sorting | O(n log n) |
| Binary search | O(log n) |
| BFS/DFS | O(V + E) |
| DP 1D | O(n) |
| DP 2D | O(n²) |
| Heap ops | O(log n) |
| Hash ops | O(1) avg |
`,

'module-13': `
## FAANG Interview Patterns

### Frequency Map
\`\`\`cpp
unordered_map<char,int> freq;
for (char c : s) freq[c]++;
\`\`\`

### Sliding Window (Anagram/Substring)
\`\`\`cpp
// Find all anagrams of p in s
unordered_map<char,int> need, window;
for (char c : p) need[c]++;
int l=0, valid=0;
for (int r=0; r<s.size(); r++) {
  if (need.count(s[r])) { window[s[r]]++; if (window[s[r]]==need[s[r]]) valid++; }
  while (r-l+1 == p.size()) {
    if (valid == need.size()) res.push_back(l);
    if (need.count(s[l])) { if (window[s[l]]==need[s[l]]) valid--; window[s[l]]--; }
    l++;
  }
}
\`\`\`

### LRU Cache
\`\`\`cpp
list<pair<int,int>> cache;  // {key, val}
unordered_map<int, list<pair<int,int>>::iterator> map;
int cap;
int get(int key) {
  if (!map.count(key)) return -1;
  cache.splice(cache.begin(), cache, map[key]);
  return map[key]->second;
}
void put(int key, int val) {
  if (map.count(key)) cache.erase(map[key]);
  else if (cache.size() == cap) { map.erase(cache.back().first); cache.pop_back(); }
  cache.push_front({key,val}); map[key] = cache.begin();
}
\`\`\`

### Trapping Rain Water
\`\`\`cpp
// O(n) two-pointer
int l=0, r=n-1, lmax=0, rmax=0, res=0;
while (l < r) {
  if (h[l] < h[r]) { lmax=max(lmax,h[l]); res+=lmax-h[l]; l++; }
  else { rmax=max(rmax,h[r]); res+=rmax-h[r]; r--; }
}
\`\`\`

### Multi-Source BFS
\`\`\`cpp
// Rotting Oranges / Islands
queue<pair<int,int>> q;
for (int i=0; i<m; i++) for (int j=0; j<n; j++)
  if (grid[i][j]==source) q.push({i,j});
int steps=0;
while (!q.empty()) {
  int sz=q.size(); steps++;
  while (sz--) {
    auto [r,c]=q.front(); q.pop();
    for (auto [dr,dc] : dirs)
      if (valid(r+dr,c+dc)) { mark; q.push({r+dr,c+dc}); }
  }
}
\`\`\`
`,

'module-c-basics': `
## C Basics for Embedded

### Data Types
| Type | Size | Use |
|------|------|-----|
| \`char\` | 1 B | Single byte, GPIO values |
| \`unsigned char\` | 1 B | Register bytes (0–255) |
| \`int\` | 4 B (32-bit MCU) | General integers |
| \`unsigned int\` | 4 B | Counters, addresses |
| \`float\` | 4 B | Sensor readings |
| \`double\` | 8 B | Avoid on MCUs |

### Constants
\`\`\`c
#define MAX_SPEED  100         // no type, no memory (preprocessor)
const int BAUD_RATE = 9600;   // typed, has memory
\`\`\`

### Printf Format Specifiers
\`\`\`c
%d   int          %u   unsigned int
%f   float        %x   hex lowercase
%c   char         %X   hex uppercase
%s   string       %p   pointer
%lu  unsigned long
\`\`\`

### Control Flow
\`\`\`c
// Embedded superloop
int main() {
  hardware_init();
  while (1) {          // never exits
    read_sensors();
    process_data();
    update_outputs();
  }
}
\`\`\`

### Functions
\`\`\`c
// Pass by pointer (only way to modify caller's variable)
void double_it(int *x) { *x = (*x) * 2; }
// Call: double_it(&val);

// Static — persists between calls, private to file
static int call_count = 0;
static void helper(void) { }
\`\`\`

### Pointers
\`\`\`c
int x = 5;
int *p = &x;    // p holds address of x
*p = 10;        // dereference — changes x
int *q = NULL;  // always init unused pointers

// Hardware register (core embedded pattern)
volatile unsigned int *GPIO = (volatile unsigned int *)0x40020000;
*GPIO = 0x01;   // set pin HIGH
\`\`\`

### Structs
\`\`\`c
typedef struct {
  float voltage;
  float current;
  int   status;
} PowerModule_t;

PowerModule_t psu;
psu.voltage = 12.0f;

// Pointer to struct — use -> operator
PowerModule_t *p = &psu;
p->voltage = 5.0f;      // preferred in embedded
(*p).voltage = 5.0f;    // equivalent
\`\`\`

### Memory Layout
| Section | What lives here |
|---------|-----------------|
| Stack | Local variables, function args — fast, limited (~1–8KB on MCU) |
| .data | Initialized globals |
| .bss | Zero-init globals |
| .rodata / Flash | \`const\` variables, string literals |
| Heap | \`malloc\` — avoid on bare-metal |
`,

'module-14': `
## Embedded C Fundamentals

### Fixed-Width Types (stdint.h)
\`\`\`c
#include <stdint.h>
uint8_t   val8  = 0xFF;     //  8-bit unsigned (0–255)
uint16_t  val16 = 0xFFFF;   // 16-bit unsigned
uint32_t  val32 = 0xDEADBEEF;
int8_t    s8    = -128;     //  8-bit signed
int32_t   s32   = -1000;
\`\`\`

### Bitwise Operators
| Op | Meaning | Example |
|----|---------|---------|
| \`&\` | AND (clear bits) | \`reg & ~(1<<3)\` clears bit 3 |
| \`|\` | OR (set bits) | \`reg | (1<<3)\` sets bit 3 |
| \`^\` | XOR (toggle) | \`reg ^ (1<<3)\` toggles bit 3 |
| \`~\` | NOT (invert) | \`~0x0F\` = \`0xF0\` |
| \`<<\` | Left shift | \`1 << n\` = 2ⁿ |
| \`>>\` | Right shift | \`reg >> 4\` |

### Bit Masking Recipes
\`\`\`c
#define BIT(n)       (1U << (n))
#define SET(r,n)     ((r) |=  BIT(n))
#define CLEAR(r,n)   ((r) &= ~BIT(n))
#define TOGGLE(r,n)  ((r) ^=  BIT(n))
#define READ(r,n)    (((r) >> (n)) & 1U)

// Multi-bit field extract
uint8_t field = (reg >> shift) & mask;

// Multi-bit field set
reg = (reg & ~(mask << shift)) | ((value & mask) << shift);
\`\`\`

### volatile
\`\`\`c
// Tells compiler: DO NOT optimize this access away
volatile uint32_t *GPIOA_ODR = (volatile uint32_t *)0x40020014;
*GPIOA_ODR = 0x01;    // always written to hardware

// Must use volatile for:
// - Memory-mapped registers
// - Variables shared with ISRs
// - Variables changed by DMA
\`\`\`

### Structs, Unions, Bitfields
\`\`\`c
// Union — all members share same memory
union { uint32_t raw; uint8_t bytes[4]; } u;
u.raw = 0x12345678;
// u.bytes[0] = 0x78 (little-endian)

// Bitfield — precise bit layout
typedef struct {
  uint8_t enable  : 1;
  uint8_t mode    : 2;
  uint8_t channel : 4;
  uint8_t reserved: 1;
} ControlReg_t;

// Packed struct — no padding (for hardware maps)
typedef struct __attribute__((packed)) {
  uint8_t  id;
  uint16_t length;
  uint32_t address;
} RegMap_t;            // exactly 7 bytes
\`\`\`

### Function Pointers
\`\`\`c
// Callback / dispatch table pattern
typedef void (*ISR_Handler)(void);
void on_uart_rx(void) { ... }
ISR_Handler handler = on_uart_rx;
handler();             // call through pointer

// Table of handlers
ISR_Handler irq_table[8] = { on_uart_rx, on_timer, ... };
irq_table[irq_num]();
\`\`\`
`,

'module-15': `
## Embedded Patterns & Protocols

### Finite State Machine (FSM)
\`\`\`c
typedef enum { STATE_IDLE, STATE_ACTIVE, STATE_ERROR } State_t;
State_t state = STATE_IDLE;

void fsm_run(Event_t evt) {
  switch (state) {
    case STATE_IDLE:
      if (evt == EVT_START) state = STATE_ACTIVE;
      break;
    case STATE_ACTIVE:
      if (evt == EVT_DONE)  state = STATE_IDLE;
      if (evt == EVT_ERROR) state = STATE_ERROR;
      break;
    case STATE_ERROR:
      if (evt == EVT_RESET) state = STATE_IDLE;
      break;
  }
}
\`\`\`

### Circular (Ring) Buffer
\`\`\`c
#define BUF_SIZE 64
uint8_t  buf[BUF_SIZE];
uint8_t  head = 0, tail = 0, count = 0;

bool enqueue(uint8_t byte) {
  if (count == BUF_SIZE) return false;     // full
  buf[tail] = byte;
  tail = (tail + 1) % BUF_SIZE;
  count++; return true;
}
bool dequeue(uint8_t *byte) {
  if (count == 0) return false;            // empty
  *byte = buf[head];
  head = (head + 1) % BUF_SIZE;
  count--; return true;
}
\`\`\`

### Interrupt-Driven Pattern
\`\`\`c
volatile uint8_t rx_flag = 0;
volatile uint8_t rx_byte = 0;

// ISR — keep SHORT, set flag only
void USART1_IRQHandler(void) {
  rx_byte = USART1->DR;
  rx_flag = 1;
}

// Main loop — do work here
while (1) {
  if (rx_flag) {
    process(rx_byte);
    rx_flag = 0;
  }
}
\`\`\`

### UART Frame
\`\`\`
[Start bit][D0–D7][Parity?][Stop bit]
 1 bit(0)  8 bits  optional  1–2 bits(1)

Baud rate = bits/second
Common: 9600, 115200
\`\`\`

### Fixed-Point Arithmetic
\`\`\`c
// Q8.8 format — 8 bits integer, 8 bits fraction
typedef int16_t fixed_t;
#define FIXED_SHIFT 8
#define TO_FIXED(x) ((fixed_t)((x) * (1 << FIXED_SHIFT)))
#define FROM_FIXED(x) ((float)(x) / (1 << FIXED_SHIFT))
#define FIXED_MUL(a,b) ((fixed_t)(((int32_t)(a)*(b)) >> FIXED_SHIFT))
\`\`\`

### Memory Optimization
\`\`\`c
// Pack variables (smallest types that fit)
uint8_t  flag;           // not int!
uint16_t sensor_raw;     // not int!

// Avoid float — use scaled integers
int16_t temp_x10;        // temp * 10 (avoids FPU)

// __attribute__((section)) — put large arrays in specific RAM
uint8_t bigbuf[4096] __attribute__((section(".ccmram")));

// sizeof check at compile time
_Static_assert(sizeof(MyStruct_t) == 7, "struct size wrong");
\`\`\`
`,

'module-16': `
## Relational Model & ER Diagrams

### Key Types
| Key | Description |
|-----|-------------|
| Primary Key | Uniquely identifies each row; NOT NULL, unique |
| Foreign Key | References PK in another table |
| Candidate Key | Any minimal unique identifier |
| Super Key | Any set of attributes that uniquely identifies a row |
| Composite Key | PK made of multiple columns |

### Constraints
\`\`\`sql
PRIMARY KEY (id)
FOREIGN KEY (dept_id) REFERENCES dept(id)
UNIQUE (email)
NOT NULL
CHECK (age > 0)
DEFAULT 'active'
\`\`\`

### ER Diagram Notation
- **Entity** → rectangle (becomes a table)
- **Attribute** → oval (becomes a column)
- **Relationship** → diamond (becomes FK or junction table)
- **Weak entity** → double rectangle (depends on another entity)

### Cardinality
| Type | Notation | Example |
|------|----------|---------|
| One-to-One | 1:1 | Person ↔ Passport |
| One-to-Many | 1:N | Dept → Employees |
| Many-to-Many | M:N | Students ↔ Courses |

### Relational Algebra (Quick Ref)
| Symbol | Operation | SQL Equivalent |
|--------|-----------|----------------|
| σ | Selection | WHERE |
| π | Projection | SELECT columns |
| ⨝ | Natural Join | JOIN |
| ∪ | Union | UNION |
| ∩ | Intersection | INTERSECT |
| − | Difference | EXCEPT |
| × | Cartesian Product | CROSS JOIN |
| ρ | Rename | AS |
`,

'module-17': `
## SQL Basics

### DDL
\`\`\`sql
CREATE TABLE employees (
  id      INTEGER PRIMARY KEY,
  name    TEXT    NOT NULL,
  dept_id INTEGER REFERENCES departments(id),
  salary  REAL    DEFAULT 0,
  joined  DATE
);

ALTER TABLE employees ADD COLUMN email TEXT;
DROP TABLE employees;
TRUNCATE TABLE employees;  -- delete all rows, keep structure
\`\`\`

### DML
\`\`\`sql
INSERT INTO employees (name, dept_id, salary)
  VALUES ('Alice', 1, 75000);

UPDATE employees SET salary = salary * 1.1
  WHERE dept_id = 2;

DELETE FROM employees WHERE salary < 30000;
\`\`\`

### SELECT Clause Order
\`\`\`sql
SELECT   columns / expressions
FROM     table
JOIN     other_table ON condition
WHERE    row filter (before grouping)
GROUP BY columns
HAVING   group filter (after grouping)
ORDER BY columns [ASC|DESC]
LIMIT    n OFFSET m;
\`\`\`

### Common Patterns
\`\`\`sql
-- Distinct values
SELECT DISTINCT dept_id FROM employees;

-- Alias
SELECT name AS employee_name, salary * 12 AS annual FROM employees;

-- NULL handling
WHERE column IS NULL
WHERE column IS NOT NULL
COALESCE(col, 'default')  -- first non-null
\`\`\`

### Aggregate Functions
| Function | Description |
|----------|-------------|
| \`COUNT(*)\` | Number of rows |
| \`COUNT(col)\` | Non-null values |
| \`SUM(col)\` | Total |
| \`AVG(col)\` | Average |
| \`MAX(col)\` | Maximum |
| \`MIN(col)\` | Minimum |

\`\`\`sql
SELECT dept_id, COUNT(*) as headcount, AVG(salary) as avg_sal
FROM employees
GROUP BY dept_id
HAVING COUNT(*) > 5
ORDER BY avg_sal DESC;
\`\`\`
`,

'module-18': `
## SQL Joins & Subqueries

### Join Types
\`\`\`sql
-- INNER JOIN — only matching rows
SELECT e.name, d.name AS dept
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;

-- LEFT JOIN — all left rows + matching right (NULL if no match)
SELECT e.name, d.name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;

-- RIGHT JOIN — all right + matching left
-- FULL OUTER JOIN — all rows from both sides

-- SELF JOIN — table joined with itself
SELECT a.name, b.name AS manager
FROM employees a
JOIN employees b ON a.manager_id = b.id;

-- CROSS JOIN — every combination (Cartesian product)
SELECT * FROM colors CROSS JOIN sizes;
\`\`\`

### Subqueries
\`\`\`sql
-- Scalar subquery (returns one value)
SELECT name FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- IN subquery
SELECT name FROM employees
WHERE dept_id IN (SELECT id FROM departments WHERE location = 'NY');

-- EXISTS
SELECT name FROM employees e
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.emp_id = e.id);

-- Correlated subquery (references outer query)
SELECT name, salary FROM employees e1
WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.dept_id = e1.dept_id);
\`\`\`

### Views & Indexes
\`\`\`sql
-- View — saved query, not stored data
CREATE VIEW high_earners AS
SELECT name, salary FROM employees WHERE salary > 80000;

SELECT * FROM high_earners;  -- use like a table

DROP VIEW high_earners;

-- Index — speeds up lookups on that column
CREATE INDEX idx_emp_dept ON employees(dept_id);
CREATE UNIQUE INDEX idx_emp_email ON employees(email);
DROP INDEX idx_emp_dept;
\`\`\`

### NULL Rules
\`\`\`sql
NULL = NULL   → FALSE  (use IS NULL)
NULL + 5      → NULL
SUM ignores NULLs; COUNT(*) counts NULLs; COUNT(col) ignores them
\`\`\`
`,

'module-19': `
## Database Normalization

### Normal Forms (Quick Ref)
| Form | Requirement |
|------|-------------|
| **1NF** | Atomic values, no repeating groups, primary key exists |
| **2NF** | 1NF + no partial dependency (non-key attr depends on full PK) |
| **3NF** | 2NF + no transitive dependency (non-key → non-key) |
| **BCNF** | Every determinant is a candidate key |

### Functional Dependency Notation
\`\`\`
A → B   "A determines B" (knowing A uniquely determines B)
{A,B} → C   "A and B together determine C"
\`\`\`

### Anomalies (problems normalization solves)
- **Insert anomaly**: Can't insert data without unrelated data
- **Update anomaly**: Same fact stored in multiple rows → inconsistency
- **Delete anomaly**: Deleting one thing accidentally deletes another

### 1NF Violations → Fix
\`\`\`
Bad: | StudentID | Courses        |    ← multi-value
     | 1         | Math, Physics  |
Fix: One course per row (separate rows or table)
\`\`\`

### 2NF Violations → Fix
\`\`\`
PK = {StudentID, CourseID}
Bad column: StudentName (depends only on StudentID → partial dep)
Fix: Move StudentName to a separate Students table
\`\`\`

### 3NF Violations → Fix
\`\`\`
Bad: EmployeeID → DeptID → DeptName  (transitive)
Fix: Separate Departments table with DeptID PK, store only DeptID in Employees
\`\`\`

### BCNF
Every non-trivial functional dependency X → Y must have X as a superkey.
Stronger than 3NF — may lose some functional dependencies when decomposing.

### Decomposition Rules
- **Lossless join**: Can reconstruct original table by joining decomposed tables
- **Dependency preserving**: All FDs can be checked in decomposed tables (not always achievable with BCNF)
`,

'module-20': `
## Transactions & Indexing

### ACID Properties
| Property | Meaning |
|----------|---------|
| **Atomicity** | All ops succeed or all are rolled back |
| **Consistency** | DB moves from one valid state to another |
| **Isolation** | Concurrent transactions don't see each other's uncommitted data |
| **Durability** | Committed transactions survive crashes |

### Transaction Commands
\`\`\`sql
BEGIN;                    -- start transaction
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;                   -- save

-- on error:
ROLLBACK;                 -- undo everything since BEGIN

SAVEPOINT sp1;            -- partial rollback point
ROLLBACK TO SAVEPOINT sp1;
\`\`\`

### Isolation Levels (weakest → strongest)
| Level | Dirty Read | Non-Repeatable | Phantom |
|-------|-----------|----------------|---------|
| READ UNCOMMITTED | ✓ possible | ✓ | ✓ |
| READ COMMITTED | ✗ | ✓ possible | ✓ |
| REPEATABLE READ | ✗ | ✗ | ✓ possible |
| SERIALIZABLE | ✗ | ✗ | ✗ |

### Concurrency Problems
- **Dirty read**: Read uncommitted data that is later rolled back
- **Non-repeatable read**: Same row read twice returns different values
- **Phantom read**: Re-running a query returns new rows (another tx inserted)
- **Lost update**: Two txs read → modify → write; one overwrites the other

### Index Types
| Type | Use Case |
|------|----------|
| B-Tree (default) | Range queries, equality, ORDER BY |
| Hash | Equality only (=), no ranges |
| Composite | Multiple columns; leftmost prefix must be used |
| Covering | All queried columns in the index — no table access |

### When Indexes Help vs Hurt
\`\`\`
Good for: SELECT with WHERE/JOIN on indexed column
Bad for:  INSERT/UPDATE/DELETE (index maintenance overhead)
         Low cardinality columns (e.g., boolean)
         Small tables (full scan is faster)

EXPLAIN SELECT ...;   -- check if index is being used
\`\`\`

### Query Optimization Tips
\`\`\`sql
-- Use indexed columns in WHERE
-- Avoid functions on indexed columns in WHERE
--   Bad:  WHERE YEAR(created_at) = 2024
--   Good: WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'
-- Avoid SELECT * — select only needed columns
-- Use LIMIT when possible
\`\`\`
`,

};

export function getCheatSheet(moduleId) {
  return CHEAT_SHEETS[moduleId] || null;
}
