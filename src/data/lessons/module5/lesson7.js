const lesson = {
  id: 'm5-l7',
  title: 'LRU Cache Implementation',
  module: 5,
  lessonNumber: 7,
  xpReward: 15,
  leetcodeProblems: [
    { id: 146, title: 'LRU Cache',  url: 'https://leetcode.com/problems/lru-cache/',  difficulty: 'Medium' },
    { id: 460, title: 'LFU Cache',  url: 'https://leetcode.com/problems/lfu-cache/',  difficulty: 'Hard' },
  ],
  content: `# LRU Cache — The Ultimate Linked List Problem

**LRU (Least Recently Used) Cache** evicts the least recently used item when the cache is full. It is one of the most famous interview questions and appears at Google, Meta, Amazon, and Microsoft.

## Requirements
- \`get(key)\`: O(1) — return value if exists, else -1
- \`put(key, value)\`: O(1) — insert/update, evict LRU item if over capacity

## Data Structure Insight
We need two things:
1. **O(1) key lookup** → \`unordered_map<key, node_pointer>\`
2. **O(1) move-to-front & remove-back** → **Doubly Linked List with sentinels**

The HashMap maps keys to DLL nodes. The DLL orders by recency (front = most recent, back = least recent).

## Implementation
\`\`\`cpp
class LRUCache {
    struct Node {
        int key, val;
        Node *prev, *next;
        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };
    
    int capacity;
    unordered_map<int, Node*> cache;  // key → node
    Node* head;  // Sentinel (most recent end)
    Node* tail;  // Sentinel (least recent end)
    
    void addToFront(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }
    void removeNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

public:
    LRUCache(int cap) : capacity(cap) {
        head = new Node(0,0); tail = new Node(0,0);
        head->next = tail; tail->prev = head;
    }
    
    int get(int key) {
        if (!cache.count(key)) return -1;
        Node* node = cache[key];
        removeNode(node);
        addToFront(node);  // Mark as most recently used
        return node->val;
    }
    
    void put(int key, int val) {
        if (cache.count(key)) {
            removeNode(cache[key]);
            cache[key]->val = val;
            addToFront(cache[key]);
        } else {
            if (cache.size() == capacity) {
                Node* lru = tail->prev;  // Evict least recently used
                removeNode(lru);
                cache.erase(lru->key);
                delete lru;
            }
            Node* node = new Node(key, val);
            cache[key] = node;
            addToFront(node);
        }
    }
};
\`\`\`

> **STL shortcut:** In C++ you can use \`std::list<pair<int,int>>\` + \`unordered_map<int, list::iterator>\` for the same result without implementing the DLL manually!
`,
  starterCode: `#include <iostream>
#include <unordered_map>
#include <list>
using namespace std;

// Implement LRU Cache using std::list (doubly linked) +
// unordered_map for O(1) lookups.
// std::list::iterator stays valid through insertions/deletions!

class LRUCache {
    int capacity;
    list<pair<int,int>> dll;                    // {key, value}, front=most recent
    unordered_map<int, list<pair<int,int>>::iterator> cache;  // key → iterator

public:
    LRUCache(int capacity) : capacity(capacity) {}

    int get(int key) {
        if (!cache.count(key)) return -1;
        // TODO: Move to front (splice), return value
        return -1;
    }

    void put(int key, int value) {
        if (cache.count(key)) {
            // TODO: Update value, move to front
        } else {
            if ((int)dll.size() == capacity) {
                // TODO: Evict LRU (remove from back, erase from cache)
            }
            // TODO: Insert new node at front, add to cache
        }
    }
};

int main() {
    int cap, q; cin >> cap >> q;
    LRUCache lru(cap);
    while (q--) {
        string op; cin >> op;
        if (op == "put") {
            int k, v; cin >> k >> v;
            lru.put(k, v);
        } else {
            int k; cin >> k;
            cout << lru.get(k) << "\\n";
        }
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
    int capacity;
    list<pair<int,int>> dll;
    unordered_map<int, list<pair<int,int>>::iterator> cache;
public:
    LRUCache(int capacity) : capacity(capacity) {}
    int get(int key) {
        if (!cache.count(key)) return -1;
        dll.splice(dll.begin(), dll, cache[key]);
        return cache[key]->second;
    }
    void put(int key, int value) {
        if (cache.count(key)) {
            cache[key]->second = value;
            dll.splice(dll.begin(), dll, cache[key]);
        } else {
            if ((int)dll.size() == capacity) {
                cache.erase(dll.back().first);
                dll.pop_back();
            }
            dll.push_front({key, value});
            cache[key] = dll.begin();
        }
    }
};

int main() {
    int cap, q; cin >> cap >> q;
    LRUCache lru(cap);
    while (q--) {
        string op; cin >> op;
        if (op == "put") { int k,v; cin>>k>>v; lru.put(k,v); }
        else             { int k; cin>>k; cout<<lru.get(k)<<"\\n"; }
    }
    return 0;
}`,
  testCases: [
    { input: '2 8\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nput 4 4\nget 1\nget 3', expectedOutput: '1\n-1\n1\n3', description: 'Classic LRU test: capacity=2, evicts LRU on overflow' },
    { input: '1 4\nput 2 1\nget 2\nput 3 2\nget 2', expectedOutput: '1\n-1', description: 'Capacity=1: put 3 evicts 2' },
  ],
  hints: [
    '`dll.splice(dll.begin(), dll, cache[key]);` — moves existing node to front in O(1).',
    'On eviction: `cache.erase(dll.back().first); dll.pop_back();`',
    'On new insert: `dll.push_front({key, value}); cache[key] = dll.begin();`',
  ],
  complexity: { time: 'O(1) for both get and put', space: 'O(capacity) for the cache', notes: 'The list::splice trick is the key — it moves a node to the front in O(1) without any memory allocation!' },
  tags: ['lru-cache', 'linked-list', 'hashmap', 'design', 'faang'],
};
export default lesson;
