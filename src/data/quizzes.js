export const QUIZZES = {
  'module-1': [
    {
      q: 'What is the output of this code?\n```cpp\nint x = 5;\ncout << x++ << " " << ++x;\n```',
      options: ['5 7', '6 7', '5 6', '6 6'],
      answer: 0,
      explanation: 'x++ returns 5 (post-increment), then ++x increments to 7 and returns 7. The output is "5 7".',
    },
    {
      q: 'Which pointer declaration is valid for pointing to an integer constant?',
      options: ['int* const p', 'const int* p', 'int const* const p', 'Both B and C'],
      answer: 3,
      explanation: '"const int* p" and "int const* const p" both make the pointed-to value constant; either prevents modifying *p.',
    },
    {
      q: 'What is the time complexity of this recursive function?\n```cpp\nint f(int n) { return n <= 1 ? 1 : f(n-1) + f(n-1); }\n```',
      options: ['O(n)', 'O(n log n)', 'O(2^n)', 'O(n^2)'],
      answer: 2,
      explanation: 'Each call makes two recursive calls, doubling the work at every level, resulting in O(2^n) time complexity.',
    },
    {
      q: 'What does `std::string::npos` represent when returned by `find()`?',
      options: ['Index 0', 'The last character', 'Substring not found', 'String is empty'],
      answer: 2,
      explanation: '`npos` is a special value (typically `size_t` max) returned by `find()` to indicate the substring was not found.',
    },
    {
      q: 'What is the output?\n```cpp\nint arr[] = {1,2,3};\nint* p = arr;\ncout << *(p+2);\n```',
      options: ['1', '2', '3', 'Undefined behavior'],
      answer: 2,
      explanation: 'p points to arr[0]; p+2 points to arr[2] which holds 3, so *(p+2) is 3.',
    },
  ],

  'module-2': [
    {
      q: 'Which constructor is called when you write `MyClass obj = other_obj;`?',
      options: ['Default constructor', 'Copy constructor', 'Move constructor', 'Assignment operator'],
      answer: 1,
      explanation: 'Initialization with another object of the same type invokes the copy constructor, not the assignment operator.',
    },
    {
      q: 'What keyword makes a member function overridable in a derived class?',
      options: ['abstract', 'override', 'virtual', 'interface'],
      answer: 2,
      explanation: 'The `virtual` keyword in the base class enables runtime polymorphism by marking the function as overridable.',
    },
    {
      q: 'What is the output?\n```cpp\nstruct A { A() { cout << "A"; } ~A() { cout << "~A"; } };\nint main() { A a; }\n```',
      options: ['A', 'A~A', '~AA', 'Nothing'],
      answer: 1,
      explanation: 'The constructor prints "A" on creation, then the destructor prints "~A" when `a` goes out of scope.',
    },
    {
      q: 'Which of the following best describes a move constructor?',
      options: [
        'Copies all members deeply',
        'Transfers ownership of resources from a temporary',
        'Deletes the source object',
        'Called only for primitive types',
      ],
      answer: 1,
      explanation: 'A move constructor "steals" the resources (e.g., heap memory) from an rvalue/temporary, leaving it in a valid but empty state.',
    },
    {
      q: 'What is the purpose of a template parameter in C++?\n```cpp\ntemplate<typename T>\nT add(T a, T b) { return a + b; }\n```',
      options: [
        'Forces the function to use int',
        'Allows the function to work with any type',
        'Makes the function virtual',
        'Restricts to numeric types only',
      ],
      answer: 1,
      explanation: 'Template parameters allow the compiler to instantiate the function for any type T at compile time, enabling generic programming.',
    },
  ],

  'module-3': [
    {
      q: 'What is the time complexity of inserting an element into a `std::map`?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 1,
      explanation: '`std::map` is a red-black tree; insertion maintains balance in O(log n) time.',
    },
    {
      q: 'What does this lambda return?\n```cpp\nauto f = [](int x) { return x * x; };\ncout << f(4);\n```',
      options: ['4', '8', '16', 'Compile error'],
      answer: 2,
      explanation: 'The lambda squares its argument; f(4) returns 4*4 = 16.',
    },
    {
      q: 'Which STL algorithm finds the first element satisfying a predicate?',
      options: ['std::search', 'std::find_if', 'std::locate', 'std::detect'],
      answer: 1,
      explanation: '`std::find_if` iterates a range and returns an iterator to the first element for which the predicate returns true.',
    },
    {
      q: 'What is the result of `6 & 3` in C++?',
      options: ['9', '5', '2', '0'],
      answer: 2,
      explanation: '6 is 110 and 3 is 011 in binary; bitwise AND yields 010, which is 2.',
    },
    {
      q: 'What container should you use to store unique sorted integers with O(log n) lookup?',
      options: ['std::vector', 'std::unordered_set', 'std::set', 'std::list'],
      answer: 2,
      explanation: '`std::set` stores unique elements in sorted order using a balanced BST, providing O(log n) lookup, insertion, and deletion.',
    },
  ],

  'module-4': [
    {
      q: 'What is the time complexity of the sliding window approach for finding the maximum sum subarray of size k?',
      options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(k)'],
      answer: 2,
      explanation: 'The sliding window slides once across the array, computing each window sum in O(1) using the previous sum, giving O(n) overall.',
    },
    {
      q: 'Kadane\'s algorithm solves which classic problem?',
      options: [
        'Maximum subarray sum',
        'Longest palindromic substring',
        'Two-sum problem',
        'Matrix rotation',
      ],
      answer: 0,
      explanation: "Kadane's algorithm finds the contiguous subarray with the maximum sum in O(n) time by tracking local and global maximums.",
    },
    {
      q: 'Given a sorted array, what is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
      answer: 1,
      explanation: 'Binary search halves the search space each iteration, resulting in O(log n) comparisons.',
    },
    {
      q: 'Which technique is best for finding all pairs in an array that sum to a target, with O(n) time?',
      options: ['Nested loops', 'Sorting + binary search', 'Hashmap (unordered_set)', 'Two pointers on unsorted array'],
      answer: 2,
      explanation: 'A hashmap stores seen elements for O(1) lookup per element, yielding O(n) overall time to find all pairs.',
    },
    {
      q: 'What does a prefix sum array `pre[i]` store?',
      options: [
        'The maximum of arr[0..i]',
        'The sum of arr[0..i]',
        'The index of element i',
        'The product of arr[0..i]',
      ],
      answer: 1,
      explanation: 'A prefix sum array stores cumulative sums so that the sum of any subarray arr[l..r] = pre[r] - pre[l-1] in O(1).',
    },
  ],

  'module-5': [
    {
      q: 'Floyd\'s cycle detection algorithm uses which technique?',
      options: [
        'Two stacks',
        'Fast and slow pointers',
        'Hashing node addresses',
        'Recursion with a visited array',
      ],
      answer: 1,
      explanation: "Floyd's algorithm uses a slow pointer (moves 1 step) and a fast pointer (moves 2 steps); they meet inside a cycle if one exists.",
    },
    {
      q: 'What is the time complexity of reversing a singly linked list?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      answer: 2,
      explanation: 'Every node must be visited exactly once to redirect its next pointer, so reversal is O(n).',
    },
    {
      q: 'In an LRU cache with O(1) get and put, which data structures are typically combined?',
      options: [
        'Array + stack',
        'Hashmap + doubly linked list',
        'BST + queue',
        'Min-heap + hashmap',
      ],
      answer: 1,
      explanation: 'A hashmap provides O(1) key lookup to a node in a doubly linked list, which maintains access order for O(1) eviction.',
    },
    {
      q: 'To find the middle of a linked list in one pass, you should:',
      options: [
        'Count nodes then traverse again',
        'Use a stack',
        'Use fast and slow pointers',
        'Copy to an array',
      ],
      answer: 2,
      explanation: 'When the fast pointer (2 steps) reaches the end, the slow pointer (1 step) is at the middle, requiring only one traversal.',
    },
    {
      q: 'What is an advantage of a doubly linked list over a singly linked list?',
      options: [
        'Uses less memory',
        'O(1) traversal',
        'Supports backward traversal and O(1) deletion given a node pointer',
        'Sorted insertion is faster',
      ],
      answer: 2,
      explanation: 'The prev pointer lets you traverse backwards and delete a node in O(1) without needing to find its predecessor.',
    },
  ],

  'module-6': [
    {
      q: 'What is the output of evaluating the RPN expression `"3 4 + 2 *"`?',
      options: ['9', '14', '10', '11'],
      answer: 1,
      explanation: '3+4=7, then 7*2=14. In Reverse Polish Notation operands are pushed and operators pop and combine the top two.',
    },
    {
      q: 'A monotonic decreasing stack is used to efficiently solve which problem?',
      options: [
        'Balanced parentheses',
        'Next greater element',
        'Evaluate RPN',
        'Implement a queue',
      ],
      answer: 1,
      explanation: 'A monotonic decreasing stack maintains elements in decreasing order; when a larger element is encountered, it is the "next greater element" for all popped items.',
    },
    {
      q: 'Which data structure allows O(1) push, pop, and getMin?',
      options: [
        'Regular stack',
        'Queue with two stacks',
        'Min stack with auxiliary stack',
        'Sorted array',
      ],
      answer: 2,
      explanation: 'A min stack keeps a parallel auxiliary stack tracking the current minimum; every push/pop updates both stacks in O(1).',
    },
    {
      q: 'To check balanced parentheses in `"({[]})"`, you should:',
      options: [
        'Count opening and closing brackets',
        'Use a stack, push opening and pop/verify on closing',
        'Sort the characters first',
        'Use two pointers from both ends',
      ],
      answer: 1,
      explanation: 'A stack ensures brackets close in the correct LIFO order; mismatches or non-empty stack at the end indicate imbalance.',
    },
    {
      q: 'How can you implement a queue using two stacks with amortized O(1) enqueue and dequeue?',
      options: [
        'Always transfer all elements on every dequeue',
        'Use one stack for enqueue, transfer to the second only when the second is empty',
        'Keep both stacks synchronized at all times',
        'Use a circular buffer instead',
      ],
      answer: 1,
      explanation: 'Elements are pushed onto stack1; dequeue pops from stack2, which is refilled from stack1 only when empty, giving amortized O(1).',
    },
  ],

  'module-7': [
    {
      q: 'In-order traversal of a BST produces elements in which order?',
      options: ['Random order', 'Reverse sorted', 'Sorted ascending', 'Level by level'],
      answer: 2,
      explanation: 'In-order traversal visits left subtree, root, then right subtree; for a BST this always yields elements in sorted ascending order.',
    },
    {
      q: 'What is the height of a balanced BST with n nodes?',
      options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(sqrt(n))'],
      answer: 1,
      explanation: 'A balanced BST splits nodes roughly in half at each level, so its height is O(log n).',
    },
    {
      q: 'The Lowest Common Ancestor (LCA) of nodes p and q in a BST can be found by:',
      options: [
        'BFS from the root',
        'Comparing node values: go left if both < root, right if both > root, else root is LCA',
        'Storing all ancestors of p and q in sets',
        'Sorting the node values',
      ],
      answer: 1,
      explanation: 'BST ordering lets you narrow down: if both p and q are smaller than the current node, LCA is in the left subtree; if both larger, in the right; otherwise the current node is LCA.',
    },
    {
      q: 'A Trie is most efficient for which operation compared to a hashmap?',
      options: [
        'Exact key lookup',
        'Prefix search / autocomplete',
        'Range queries',
        'Frequency counting',
      ],
      answer: 1,
      explanation: 'A Trie stores strings character-by-character, enabling prefix enumeration in O(prefix_length), which a hashmap cannot do efficiently.',
    },
    {
      q: 'A Segment Tree supports range sum queries and point updates in what time complexity?',
      options: ['O(n) query, O(1) update', 'O(log n) query, O(log n) update', 'O(1) query, O(n) update', 'O(n) both'],
      answer: 1,
      explanation: 'A Segment Tree divides the range in half at each level (height = log n), so both range queries and point updates run in O(log n).',
    },
  ],

  'module-8': [
    {
      q: 'What is the time complexity of extracting the minimum from a min-heap?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 1,
      explanation: 'The minimum is at the root (O(1) access) but after removal the heap must be restored via sift-down, which is O(log n).',
    },
    {
      q: 'To find the K-th largest element in an array efficiently, you should use:',
      options: [
        'Sort the array and index from the end',
        'A max-heap of size n',
        'A min-heap of size K',
        'A balanced BST',
      ],
      answer: 2,
      explanation: 'Maintaining a min-heap of size K ensures the root is always the K-th largest; any element larger than the root replaces it, costing O(n log K).',
    },
    {
      q: 'In heap sort, after building a max-heap, what is the next step?',
      options: [
        'Recursively sort left and right halves',
        'Repeatedly swap the root with the last element and sift down',
        'Extract min and place at front',
        'Apply merge sort on the heap array',
      ],
      answer: 1,
      explanation: 'Swapping the max (root) with the last unsorted element places it correctly, then sift-down restores the heap property for the remaining elements.',
    },
    {
      q: 'The Median Finder (find median from a data stream) problem is solved with:',
      options: [
        'A sorted array with binary search',
        'A max-heap for the lower half and a min-heap for the upper half',
        'A single min-heap',
        'A segment tree',
      ],
      answer: 1,
      explanation: 'Two heaps keep the lower and upper halves balanced; the median is the top of the larger heap or the average of both tops.',
    },
    {
      q: '`std::priority_queue<int>` in C++ is a:',
      options: ['Min-heap', 'Max-heap', 'Sorted array', 'Deque'],
      answer: 1,
      explanation: 'By default, `std::priority_queue` uses `std::less<int>`, making it a max-heap where the largest element is at the top.',
    },
  ],

  'module-9': [
    {
      q: 'Dijkstra\'s algorithm fails on graphs with:',
      options: ['Directed edges', 'Negative weight edges', 'Disconnected components', 'Self-loops with positive weight'],
      answer: 1,
      explanation: "Dijkstra's greedy relaxation assumes shortest paths grow monotonically, which breaks when negative weights allow shorter paths through later relaxations.",
    },
    {
      q: 'BFS on an unweighted graph finds:',
      options: ['Shortest path by edge weight', 'Shortest path by number of edges', 'Topological order', 'Minimum spanning tree'],
      answer: 1,
      explanation: 'BFS explores nodes level by level, so the first time it reaches a node is via the fewest edges, guaranteeing the shortest hop-count path.',
    },
    {
      q: 'Union-Find (Disjoint Set Union) with path compression and union by rank supports each operation in:',
      options: ['O(log n)', 'O(n)', 'O(α(n)) — nearly O(1)', 'O(n log n)'],
      answer: 2,
      explanation: 'With both optimizations, the amortized cost per operation is the inverse Ackermann function α(n), which is effectively constant for all practical inputs.',
    },
    {
      q: 'Topological sort is only possible on a graph that is:',
      options: ['Undirected and connected', 'A Directed Acyclic Graph (DAG)', 'Weighted', 'Complete'],
      answer: 1,
      explanation: 'Topological ordering requires a direction for ordering and no cycles; a cycle would make it impossible to assign a linear order.',
    },
    {
      q: 'Bellman-Ford is preferred over Dijkstra when:',
      options: [
        'The graph is dense',
        'The graph has negative weight edges',
        'All weights are equal',
        'The graph is a tree',
      ],
      answer: 1,
      explanation: 'Bellman-Ford relaxes all edges V-1 times and correctly handles negative weights; it also detects negative cycles.',
    },
  ],

  'module-10': [
    {
      q: 'Memoization converts a recursive solution from exponential to polynomial time by:',
      options: [
        'Using iteration instead of recursion',
        'Caching results of subproblems to avoid recomputation',
        'Sorting the input first',
        'Reducing the problem size',
      ],
      answer: 1,
      explanation: 'Storing the result of each unique subproblem ensures it is computed only once, reducing overlapping recursive calls.',
    },
    {
      q: 'What is the time and space complexity of the classic 0/1 Knapsack DP solution (n items, capacity W)?',
      options: ['O(nW) time, O(W) space', 'O(n^2) time, O(n^2) space', 'O(nW) time, O(nW) space', 'O(n log W) time, O(n) space'],
      answer: 0,
      explanation: 'The 2D DP table is O(nW) time, but it can be space-optimized to O(W) by reusing a single row and iterating in reverse.',
    },
    {
      q: 'The Longest Common Subsequence (LCS) of "ABCDE" and "ACE" has length:',
      options: ['2', '3', '4', '5'],
      answer: 1,
      explanation: '"ACE" is itself a common subsequence of length 3, and no longer common subsequence exists, so LCS = 3.',
    },
    {
      q: 'Bitmask DP is useful when the state needs to track:',
      options: [
        'A continuous range of values',
        'Which subset of items has been selected',
        'A sorted sequence',
        'A graph traversal order',
      ],
      answer: 1,
      explanation: 'A bitmask compactly encodes which elements of a small set (typically ≤ 20) have been used, enabling DP over subsets.',
    },
    {
      q: 'The Longest Increasing Subsequence (LIS) can be found in O(n log n) using:',
      options: [
        'Plain DP with O(n^2) patience',
        'Binary search on a maintained array of smallest tail elements',
        'Merge sort on the input',
        'A min-heap of all elements',
      ],
      answer: 1,
      explanation: 'Maintaining an array of the smallest tail for each possible LIS length and using binary search to update it achieves O(n log n).',
    },
  ],

  'module-11': [
    {
      q: 'What does `x & (x - 1)` compute for a positive integer x?',
      options: [
        'x with its highest set bit cleared',
        'x with its lowest set bit cleared',
        'The number of set bits in x',
        'x modulo 2',
      ],
      answer: 1,
      explanation: 'Subtracting 1 flips the lowest set bit and all bits below it; ANDing with x clears only the lowest set bit.',
    },
    {
      q: 'Tarjan\'s algorithm is used to find:',
      options: [
        'Shortest paths in a weighted graph',
        'Strongly Connected Components (SCCs)',
        'Minimum spanning tree',
        'Topological sort only',
      ],
      answer: 1,
      explanation: "Tarjan's algorithm uses DFS with a stack and discovery/low-link values to identify all SCCs in O(V+E).",
    },
    {
      q: 'The rolling hash technique in Rabin-Karp string matching allows the hash of the next window to be computed in:',
      options: ['O(m) per slide', 'O(1) per slide', 'O(n) per slide', 'O(log m) per slide'],
      answer: 1,
      explanation: 'Rolling hash updates by subtracting the outgoing character and adding the incoming one, giving O(1) per window slide.',
    },
    {
      q: 'In game theory (Nim), a position is a losing position for the player to move when:',
      options: [
        'The XOR (nim-sum) of all pile sizes is non-zero',
        'The XOR (nim-sum) of all pile sizes is zero',
        'All piles are of equal size',
        'The total number of stones is odd',
      ],
      answer: 1,
      explanation: 'A nim-sum of 0 means any move creates a non-zero nim-sum for the opponent, who can always restore 0 and win.',
    },
    {
      q: 'Fermat\'s little theorem states that for prime p and integer a not divisible by p: `a^(p-1) ≡ ?` (mod p)',
      options: ['0', 'a', '1', 'p-1'],
      answer: 2,
      explanation: "Fermat's little theorem guarantees a^(p-1) ≡ 1 (mod p), which is used to compute modular inverses as a^(p-2) mod p.",
    },
  ],

  'module-12': [
    {
      q: 'The two-pointer technique on a sorted array can solve "Two Sum" in:',
      options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(log n)'],
      answer: 2,
      explanation: 'One pointer starts at the left, one at the right; they move inward based on the current sum, finding the answer in a single O(n) pass.',
    },
    {
      q: 'Backtracking prunes the search space by:',
      options: [
        'Sorting candidates before recursing',
        'Abandoning a partial solution as soon as it cannot lead to a valid solution',
        'Using a greedy heuristic at each step',
        'Memoizing repeated states',
      ],
      answer: 1,
      explanation: 'Backtracking tries candidates and backtracks (undoes the choice) when constraints are violated, avoiding full exploration of dead-end branches.',
    },
    {
      q: 'A greedy algorithm is guaranteed to give the optimal solution for:',
      options: [
        'All optimization problems',
        'Problems with the greedy-choice property and optimal substructure',
        'Only problems on trees',
        'Problems with overlapping subproblems',
      ],
      answer: 1,
      explanation: 'Greedy correctness requires that locally optimal choices lead to a globally optimal solution — the greedy-choice property and optimal substructure.',
    },
    {
      q: '"Binary search on the answer" is used when:',
      options: [
        'The input array is sorted',
        'The answer space is monotonic (feasibility is monotone in the answer)',
        'The problem has overlapping subproblems',
        'The problem requires finding an exact index',
      ],
      answer: 1,
      explanation: 'When you can define a predicate "is X achievable?" that is monotone (false then true or vice versa), binary search finds the boundary in O(log(answer_range)) × check_cost.',
    },
    {
      q: 'A sweep line algorithm processes events in sorted order. It is commonly used for:',
      options: [
        'Finding the shortest path',
        'Interval overlap / meeting rooms problems',
        'Tree traversals',
        'String matching',
      ],
      answer: 1,
      explanation: 'Sweep line sorts interval endpoints as events and processes them left to right, efficiently counting overlaps or merging intervals.',
    },
  ],

  'module-13': [
    {
      q: 'The "Trapping Rain Water" problem on a height array is solvable in O(n) time and O(1) space using:',
      options: [
        'A stack of indices',
        'Prefix and suffix max arrays',
        'Two pointers tracking left and right max',
        'Dynamic programming with a 2D table',
      ],
      answer: 2,
      explanation: 'Two pointers advance from both ends; the side with the smaller max determines trapped water for that position, requiring only O(1) extra space.',
    },
    {
      q: 'Coin Change (minimum coins to make amount n) is solved optimally with:',
      options: [
        'Greedy (always pick largest coin)',
        'BFS on the amount',
        'Bottom-up DP with dp[i] = min coins for amount i',
        'Backtracking with pruning',
      ],
      answer: 2,
      explanation: 'Bottom-up DP fills dp[0..n] where dp[i] = min(dp[i-coin]+1) for each coin, giving O(n × coins) time.',
    },
    {
      q: 'Course Schedule (detect cycle in directed graph) is best solved with:',
      options: [
        'Union-Find',
        'DFS with coloring (white/gray/black) or Kahn\'s topological sort',
        'Dijkstra\'s algorithm',
        'BFS level order',
      ],
      answer: 1,
      explanation: 'A gray (in-progress) node reached again during DFS indicates a cycle; alternatively, if Kahn\'s BFS cannot process all nodes, a cycle exists.',
    },
    {
      q: 'The 3Sum problem (find all triplets summing to 0) is solved in O(n^2) by:',
      options: [
        'Three nested loops',
        'Sort + fix one element + two-pointer scan on the rest',
        'Hashmap for all pairs then binary search',
        'Divide and conquer',
      ],
      answer: 1,
      explanation: 'Sorting (O(n log n)) then fixing each element and using two pointers on the remainder gives O(n^2) with duplicate-skipping.',
    },
    {
      q: 'An LRU Cache with O(1) get and put: when capacity is full and a new key is inserted, which entry is evicted?',
      options: [
        'The entry with the smallest key',
        'The entry with the largest value',
        'The least recently used entry',
        'A random entry',
      ],
      answer: 2,
      explanation: 'LRU (Least Recently Used) evicts the entry that was accessed furthest in the past, maintained via a doubly linked list ordered by recency.',
    },
  ],

  'module-14': [
    {
      q: 'What is the value of `uint8_t x = 255; x++;`?',
      options: ['256', '255', '0', '-1'],
      answer: 2,
      explanation: 'uint8_t holds values 0–255. Adding 1 to 255 wraps around to 0 due to unsigned integer overflow (modulo 256).',
    },
    {
      q: 'Which operation correctly sets bit 4 of a register `reg`?',
      options: ['reg &= (1 << 4)', 'reg |= (1 << 4)', 'reg ^= (1 << 4)', 'reg -= (1 << 4)'],
      answer: 1,
      explanation: 'OR-ing with a mask sets a bit without affecting others. `reg |= (1 << 4)` forces bit 4 to 1 while leaving all other bits unchanged.',
    },
    {
      q: 'Why is `volatile` used with hardware registers?',
      options: [
        'To make the variable faster to access',
        'To store the variable in Flash memory',
        'To prevent the compiler from optimizing away reads/writes',
        'To make the variable thread-safe',
      ],
      answer: 2,
      explanation: 'Without volatile, the compiler may cache the value in a register and skip repeated reads, missing hardware-driven changes. volatile forces every access to go to actual memory.',
    },
    {
      q: 'What does `uint8_t a = 0b00001111; uint8_t b = 0b11110000; printf("%d", a & b);` print?',
      options: ['255', '0', '15', '240'],
      answer: 1,
      explanation: 'AND of 0b00001111 and 0b11110000 produces 0b00000000 = 0 because no bit is set in both values simultaneously.',
    },
    {
      q: 'In `struct S { uint8_t a:3; uint8_t b:5; };`, what is sizeof(struct S)?',
      options: ['8 bytes', '2 bytes', '1 byte', '3 bytes'],
      answer: 2,
      explanation: 'The two bitfields total 3+5=8 bits = 1 byte. The compiler packs them into a single uint8_t with no padding needed.',
    },
  ],

  'module-15': [
    {
      q: 'What is the primary advantage of a circular buffer over a plain array for UART receive?',
      options: [
        'It uses dynamic memory allocation',
        'Pop is O(1) with no data shifting',
        'It automatically grows when full',
        'It uses pointers so it is faster',
      ],
      answer: 1,
      explanation: 'A plain array requires O(n) shifting when an element is removed from the front. The circular buffer advances a tail pointer in O(1), reusing the vacated slot without moving data.',
    },
    {
      q: 'In interrupt-driven embedded code, why must shared flags be declared `volatile`?',
      options: [
        'To allocate them in faster SRAM',
        'So the linker places them at a fixed address',
        'To stop the compiler from caching the value and missing ISR updates',
        'To make them accessible from other translation units',
      ],
      answer: 2,
      explanation: 'The ISR modifies the flag asynchronously. Without volatile, the main loop compiler may read the flag once and keep it in a CPU register, never seeing the ISR write.',
    },
    {
      q: 'Which FSM transition sequence is correct for a traffic light starting at RED?',
      options: ['RED→YELLOW→GREEN→RED', 'RED→GREEN→YELLOW→RED', 'GREEN→YELLOW→RED→GREEN', 'RED→GREEN→RED→GREEN'],
      answer: 1,
      explanation: 'Standard traffic light sequence: RED (stop) → GREEN (go) → YELLOW (caution) → RED. Each state has a single defined next state.',
    },
    {
      q: 'In Q8 fixed-point format, integer 384 represents which real number?',
      options: ['384', '3.0', '1.5', '48'],
      answer: 2,
      explanation: 'Q8 format uses 8 fractional bits so the scale factor is 2^8 = 256. Real value = 384 / 256 = 1.5.',
    },
    {
      q: 'Which C keyword causes global/static data to be stored in Flash (ROM) rather than RAM on most MCUs?',
      options: ['static', 'volatile', 'const', 'extern'],
      answer: 2,
      explanation: '`const` global/static arrays are placed in Flash by most embedded compilers, preserving precious RAM. `static` controls lifetime and linkage, not storage location.',
    },
  ],

  // ── DBMS Track ───────────────────────────────────────────────────────────────
  'module-16': [
    {
      q: 'Which of the following is NOT a property of a primary key?',
      options: ['Uniquely identifies each row', 'Can contain NULL values', 'Only one per table', 'Values cannot change once set'],
      answer: 1,
      explanation: 'A primary key must be NOT NULL and unique. NULL values are not allowed because a NULL primary key would make a row unidentifiable.',
    },
    {
      q: 'In an ER diagram, a diamond shape represents:',
      options: ['An entity set', 'An attribute', 'A relationship set', 'A weak entity'],
      answer: 2,
      explanation: 'Rectangles = entity sets, ellipses = attributes, diamonds = relationship sets, double rectangles = weak entities.',
    },
    {
      q: 'A foreign key constraint ensures:',
      options: ['The column has unique values', 'The column cannot be NULL', 'Referenced values exist in the parent table', 'The column is a primary key'],
      answer: 2,
      explanation: 'A foreign key enforces referential integrity — every value in the foreign key column must exist in the referenced primary key column (or be NULL if permitted).',
    },
    {
      q: 'Which relational algebra operation keeps only specified columns?',
      options: ['SELECT (σ)', 'PROJECT (π)', 'JOIN (⋈)', 'UNION'],
      answer: 1,
      explanation: 'PROJECT (π) returns a vertical subset — only the specified columns. SELECT (σ) returns a horizontal subset — only rows matching a condition.',
    },
    {
      q: 'In a 1:N relationship between Department and Employee, the foreign key is placed in:',
      options: ['Department table', 'Employee table', 'A new junction table', 'Both tables'],
      answer: 1,
      explanation: 'In a 1:N relationship, the foreign key goes on the "many" side. Each Employee has one Department, so dept_id (FK) is stored in the Employee table.',
    },
  ],

  'module-17': [
    {
      q: 'Which SQL clause filters rows AFTER grouping?',
      options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
      answer: 1,
      explanation: 'WHERE filters rows before grouping; HAVING filters after GROUP BY. Use HAVING to filter on aggregate results like `HAVING COUNT(*) > 2`.',
    },
    {
      q: 'What does SELECT DISTINCT do?',
      options: ['Sorts the result set', 'Removes duplicate rows from the result', 'Selects only NULL rows', 'Limits the number of rows'],
      answer: 1,
      explanation: 'DISTINCT eliminates duplicate rows in the result. `SELECT DISTINCT dept FROM students` returns each department name only once.',
    },
    {
      q: 'Which SQL statement modifies existing rows?',
      options: ['INSERT', 'DELETE', 'UPDATE', 'ALTER'],
      answer: 2,
      explanation: 'UPDATE changes values in existing rows. INSERT adds new rows, DELETE removes rows, ALTER modifies table structure.',
    },
    {
      q: 'What is the output of: SELECT COUNT(*) FROM students WHERE gpa > 3.5?  (students: Alice 3.8, Bob 3.2, Carol 3.9, David 2.8, Eve 3.5)',
      options: ['1', '2', '3', '4'],
      answer: 1,
      explanation: 'Only Alice (3.8) and Carol (3.9) have gpa > 3.5. Eve has exactly 3.5 which is NOT greater than 3.5. COUNT = 2.',
    },
    {
      q: 'Which aggregate function returns the largest value in a column?',
      options: ['COUNT()', 'SUM()', 'AVG()', 'MAX()'],
      answer: 3,
      explanation: 'MAX() returns the maximum value. MIN() returns the minimum. COUNT() counts rows, SUM() totals values, AVG() averages them.',
    },
  ],

  'module-18': [
    {
      q: 'An INNER JOIN returns:',
      options: ['All rows from the left table', 'All rows from both tables', 'Only rows with matching values in both tables', 'All rows from the right table'],
      answer: 2,
      explanation: 'INNER JOIN returns only rows that have matching values in both tables. Rows with no match on either side are excluded.',
    },
    {
      q: 'A LEFT JOIN with WHERE right_table.id IS NULL finds:',
      options: ['All matched rows', 'Rows in the left table with no match in the right table', 'All right table rows', 'Duplicate rows'],
      answer: 1,
      explanation: 'LEFT JOIN + WHERE right.id IS NULL is the standard pattern for finding rows in the left table that have no corresponding row in the right table.',
    },
    {
      q: 'A subquery in the WHERE clause that returns a single value is called a:',
      options: ['Correlated subquery', 'Scalar subquery', 'Derived table', 'EXISTS subquery'],
      answer: 1,
      explanation: 'A scalar subquery returns exactly one row and one column. It can be used anywhere a single value is expected, like `WHERE salary > (SELECT AVG(salary) FROM emp)`.',
    },
    {
      q: 'A VIEW in SQL is:',
      options: ['A physical copy of table data', 'A virtual table defined by a stored SELECT query', 'An index on a table', 'A stored procedure'],
      answer: 1,
      explanation: 'A VIEW is a named SELECT query stored in the database. It behaves like a table when queried but contains no data itself — data comes from the underlying tables.',
    },
    {
      q: 'Which JOIN type would you use to find all students and their grades, including students not enrolled in any course?',
      options: ['INNER JOIN', 'RIGHT JOIN students', 'LEFT JOIN from students', 'CROSS JOIN'],
      answer: 2,
      explanation: 'LEFT JOIN from the students table ensures all students appear in the result. Students not enrolled in any course will show NULL for the grade columns.',
    },
  ],

  'module-19': [
    {
      q: 'If A → B and B → C, then A → C by:',
      options: ['Reflexivity', 'Augmentation', 'Transitivity', 'Union rule'],
      answer: 2,
      explanation: 'Armstrong\'s transitivity axiom: if A → B and B → C then A → C. This is how transitive dependencies arise and why 3NF eliminates them.',
    },
    {
      q: 'A table is in 2NF if it is in 1NF and:',
      options: ['Has no repeating groups', 'Has no partial dependencies on the primary key', 'Has no transitive dependencies', 'Every determinant is a candidate key'],
      answer: 1,
      explanation: '2NF requires 1NF + no partial dependency. A partial dependency is when a non-key attribute depends on PART of a composite primary key rather than the whole key.',
    },
    {
      q: 'Which normal form eliminates transitive dependencies?',
      options: ['1NF', '2NF', '3NF', 'BCNF'],
      answer: 2,
      explanation: '3NF (Third Normal Form) requires that no non-key attribute transitively depends on the primary key. Every non-key attribute must depend directly on the primary key.',
    },
    {
      q: 'BCNF is violated when:',
      options: ['A table has repeating groups', 'A non-key attribute depends on part of the PK', 'A determinant is not a candidate key', 'The table has no primary key'],
      answer: 2,
      explanation: 'BCNF requires every determinant (left side of an FD) to be a candidate key. If a non-candidate-key determines another attribute, BCNF is violated.',
    },
    {
      q: 'A decomposition is lossless if:',
      options: ['No FDs are lost', 'The natural join reconstructs the original relation exactly', 'Each table has fewer attributes', 'All tables are in BCNF'],
      answer: 1,
      explanation: 'A lossless-join decomposition guarantees that joining the decomposed tables back together produces exactly the original relation — no spurious tuples are introduced.',
    },
  ],

  'module-20': [
    {
      q: 'Which ACID property ensures that a failed transaction leaves the database unchanged?',
      options: ['Consistency', 'Isolation', 'Durability', 'Atomicity'],
      answer: 3,
      explanation: 'Atomicity guarantees all-or-nothing: either all operations in a transaction commit, or none do. A failure mid-transaction rolls back all partial changes.',
    },
    {
      q: 'Which isolation level prevents dirty reads but still allows non-repeatable reads?',
      options: ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'],
      answer: 1,
      explanation: 'READ COMMITTED prevents dirty reads (reading uncommitted changes) but allows non-repeatable reads (same query returning different values within one transaction).',
    },
    {
      q: 'Two-Phase Locking (2PL) guarantees:',
      options: ['Deadlock prevention', 'Serializability of concurrent transactions', 'Maximum throughput', 'Durability after crash'],
      answer: 1,
      explanation: '2PL (growing phase: acquire locks; shrinking phase: release locks) guarantees conflict-serializability. However, it does NOT prevent deadlocks on its own.',
    },
    {
      q: 'A B+ tree index is BEST suited for:',
      options: ['Equality queries only', 'Range queries and ordered scans', 'Bulk insert operations', 'Joins only'],
      answer: 1,
      explanation: 'B+ trees store data sorted and link leaf nodes, making them ideal for range queries (BETWEEN, >, <) and ORDER BY operations. Hash indexes are faster for equality but cannot do range queries.',
    },
    {
      q: 'Which of the following is a "phantom read" anomaly?',
      options: ['Reading uncommitted data from another transaction', 'Getting different values for the same row in one transaction', 'New rows appearing in a repeated query due to another transaction\'s INSERT', 'A committed write being lost'],
      answer: 2,
      explanation: 'A phantom read occurs when a transaction re-executes a query and finds new rows that were inserted by another committed transaction since the first execution.',
    },
  ],
};
