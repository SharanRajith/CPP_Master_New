const lesson = {
  id: 'm13-l1',
  title: 'Google: LRU Cache',
  module: 13,
  lessonNumber: 1,
  xpReward: 25,
  leetcodeProblems: [
    { id: 146, title: 'LRU Cache', url: 'https://leetcode.com/problems/lru-cache/', difficulty: 'Medium' },
  ],
  content: `# Google: LRU Cache

The **Least Recently Used (LRU) Cache** is arguably the single most frequently asked design question at Google. 

You must design a data structure that follows these constraints:
1. ` + "`" + `get(key)` + "`" + `: Return the value of the key if it exists, otherwise return -1.
2. ` + "`" + `put(key, value)` + "`" + `: Update the value of the key if it exists. Otherwise, add the key-value pair.
3. If the number of keys exceeds the capacity, **evict the least recently used key**.
4. Both operations MUST be strictly $O(1)$ time complexity!

## The $O(1)$ Strategy
To get $O(1)$ lookups, we absolutely need a **Hash Map** (` + "`" + `unordered_map` + "`" + `).
To get $O(1)$ eviction and ordering based on "recency", we absolutely need a **Doubly Linked List**.
- When an item is accessed (via ` + "`" + `get` + "`" + ` or ` + "`" + `put` + "`" + `), we delete it from its current position in the linked list and move it to the **Head**.
- When we reach maximum capacity, we pop the node at the **Tail**, as it represents the least recently used item!

To make moving nodes inside the list $O(1)$, our Hash Map must store pointers directly to the Linked List nodes!
` + "`" + `unordered_map<int, Node*> cache;` + "`" + `

### The Implementation Blueprint
\`\`\`cpp
struct Node {
    int key, val;
    Node *prev, *next;
    Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
};

class LRUCache {
    int capacity;
    unordered_map<int, Node*> cache;
    Node *head, *tail;

    // Helper functions
    void removeNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    
    void insertHead(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }
    ...
};
\`\`\`
> **Pro Tip:** Always initialize ` + "`" + `head` + "`" + ` and ` + "`" + `tail` + "`" + ` as dummy nodes linked to each other! This prevents null-pointer errors when deleting or inserting into an empty list.
`,
  starterCode: `#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

// This is a simplified wrapper for testing logic.
// We'll simulate the LRU Cache with standard arrays for simplicity in this IDE
// but the architecture is modeled after the real class!

class LRUCache {
private:
    struct Node {
        int key, val;
        Node *prev, *next;
        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };
    
    int capacity;
    unordered_map<int, Node*> cache;
    Node *head, *tail;
    
    void removeNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    
    void insertHead(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }

public:
    LRUCache(int cap) {
        capacity = cap;
        head = new Node(-1, -1);
        tail = new Node(-1, -1);
        head->next = tail;
        tail->prev = head;
    }
    
    int get(int key) {
        // TODO: if key not in cache, return -1
        // TODO: grab the node, removeNode(node), insertHead(node)
        // TODO: return node->val
        return -1;
    }
    
    void put(int key, int value) {
        // TODO: if key in cache, remove Node, update val, insertHead
        // TODO: else prepare to add new node.
        // TODO: If cache.size() == capacity, grab tail->prev, cache.erase it, removeNode it.
        // TODO: Create new node, insertHead, add to cache
    }
};

int main() {
    LRUCache lru(2);
    lru.put(1, 1); // cache is {1=1}
    lru.put(2, 2); // cache is {1=1, 2=2}
    cout << lru.get(1) << " ";    // returns 1, cache is {2=2, 1=1}
    lru.put(3, 3); // LRU key was 2, evicts 2, cache is {1=1, 3=3}
    cout << lru.get(2) << " ";    // returns -1 (not found)
    lru.put(4, 4); // evicts 1, cache is {3=3, 4=4}
    cout << lru.get(1) << " ";    // returns -1
    cout << lru.get(3) << " ";    // returns 3
    cout << lru.get(4) << "\\n";   // returns 4
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <unordered_map>
using namespace std;

class LRUCache {
private:
    struct Node {
        int key, val;
        Node *prev, *next;
        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };
    
    int capacity;
    unordered_map<int, Node*> cache;
    Node *head, *tail;
    
    void removeNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    
    void insertHead(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }

public:
    LRUCache(int cap) {
        capacity = cap;
        head = new Node(-1, -1);
        tail = new Node(-1, -1);
        head->next = tail;
        tail->prev = head;
    }
    
    int get(int key) {
        if (cache.find(key) == cache.end()) return -1;
        Node* node = cache[key];
        removeNode(node);
        insertHead(node);
        return node->val;
    }
    
    void put(int key, int value) {
        if (cache.find(key) != cache.end()) {
            Node* node = cache[key];
            removeNode(node);
            node->val = value;
            insertHead(node);
        } else {
            if (cache.size() == capacity) {
                Node* lru = tail->prev;
                cache.erase(lru->key);
                removeNode(lru);
                delete lru;
            }
            Node* newNode = new Node(key, value);
            insertHead(newNode);
            cache[key] = newNode;
        }
    }
};

int main() {
    LRUCache lru(2);
    lru.put(1, 1);
    lru.put(2, 2);
    cout << lru.get(1) << " ";
    lru.put(3, 3);
    cout << lru.get(2) << " ";
    lru.put(4, 4);
    cout << lru.get(1) << " ";
    cout << lru.get(3) << " ";
    cout << lru.get(4) << "\\n";
    return 0;
}`,
  testCases: [
    { input: '', expectedOutput: '1 -1 -1 3 4', description: 'Simulates the standard LeetCode test suite for LRU cache.' },
  ],
  hints: [
    'Always use dummy Head and Tail nodes! `tail->prev` will magically always be the LRU node, even if there is only 1 item.',
    'Don\'t forget to `cache.erase(lru->key);` when evicting!',
  ],
  complexity: { time: 'O(1) for both get and put', space: 'O(capacity)' },
  tags: ['design', 'linked-list', 'hash-map', 'google'],
};
export default lesson;
