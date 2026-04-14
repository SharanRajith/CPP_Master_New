const lesson = {
  id: 'm7-l7',
  title: 'Trie (Prefix Tree)',
  module: 7,
  lessonNumber: 7,
  xpReward: 15,
  leetcodeProblems: [
    { id: 208, title: 'Implement Trie (Prefix Tree)', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/', difficulty: 'Medium' },
    { id: 211, title: 'Design Add and Search Words Data Structure', url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', difficulty: 'Medium' },
  ],
  content: `# Trie (Prefix Tree)

A **Trie** (pronounced "try", as in retrieval) is a highly specialized tree optimized for searching strings and prefixes. It is the data structure powering autocomplete engines and spell-checkers.

Unlike a Binary Tree with 2 children, a Trie node typically has an array of 26 children (one for each letter of the alphabet). It also has a boolean flag \`isEnd\` to mark where valid words officially finish.

## Core Structure
\`\`\`cpp
struct TrieNode {
    TrieNode* children[26];
    bool isEnd;
    
    TrieNode() {
        isEnd = false;
        for (int i = 0; i < 26; i++) children[i] = nullptr;
    }
};
\`\`\`

## Inserting a Word
To insert "APPLE":
- Start at the root. Looking at 'A' (\`children[0]\`). If it is null, create a new Node. Move to that Node.
- Look at 'P' (\`children[15]\`). If null, create. Move to Node.
- Repeat. After entering 'E', set \`isEnd = true\` on the final node.

\`\`\`cpp
void insert(string word) {
    TrieNode* curr = root;
    for (char c : word) {
        int idx = c - 'a';
        if (!curr->children[idx]) {
            curr->children[idx] = new TrieNode();
        }
        curr = curr->children[idx];
    }
    curr->isEnd = true;
}
\`\`\`

## Searching
Searching for a word is exactly the same looping process.
1. If at any point \`curr->children[idx]\` is null before the word finishes $\\rightarrow$ the word doesn't exist (\`return false\`).
2. If loop finishes, return \`curr->isEnd\`! (If \`isEnd\` is false, it means we only found a *prefix*, not a complete inserted word).

> **Speed:** Inserting or searching for a word of length \`L\` takes exactly $O(L)$ time. The number of words already in the dictionary does not slow it down at all!
`,
  starterCode: `#include <iostream>
#include <string>
using namespace std;

struct TrieNode {
    TrieNode* children[26];
    bool isEnd;
    TrieNode() {
        isEnd = false;
        for (int i = 0; i < 26; i++) children[i] = nullptr;
    }
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    
    void insert(string word) {
        TrieNode* curr = root;
        // TODO: iterate over characters, create nodes if they don't exist
        // set isEnd = true at the end
    }
    
    bool search(string word) {
        TrieNode* curr = root;
        // TODO: iterate over characters, return false if child is null
        // return curr->isEnd at the end
        return false;
    }
};

int main() {
    int q; cin >> q;
    Trie t;
    while (q--) {
        string op, word; cin >> op >> word;
        if (op == "insert") t.insert(word);
        else if (op == "search") cout << (t.search(word) ? "Found" : "Miss") << "\\n";
    }
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
using namespace std;

struct TrieNode {
    TrieNode* children[26];
    bool isEnd;
    TrieNode() {
        isEnd = false;
        for (int i = 0; i < 26; i++) children[i] = nullptr;
    }
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    void insert(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            int i = c - 'a';
            if (!curr->children[i]) curr->children[i] = new TrieNode();
            curr = curr->children[i];
        }
        curr->isEnd = true;
    }
    bool search(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            int i = c - 'a';
            if (!curr->children[i]) return false;
            curr = curr->children[i];
        }
        return curr->isEnd;
    }
};

int main() {
    int q; cin >> q;
    Trie t;
    while (q--) {
        string op, word; cin >> op >> word;
        if (op == "insert") t.insert(word);
        else if (op == "search") cout << (t.search(word) ? "Found" : "Miss") << "\\n";
    }
    return 0;
}`,
  testCases: [
    { input: '4\ninsert apple\nsearch apple\nsearch app\ninsert app', expectedOutput: 'Found\nMiss', description: 'Tests insertion, full word search, and prefix failure' },
    { input: '2\ninsert cat\nsearch dog', expectedOutput: 'Miss', description: 'Early failure on completely different word' },
  ],
  hints: [
    'Convert character to index using `int idx = c - \'a\';`',
    '`if (!curr->children[idx])` checks if the path exists.',
    'Always move the pointer forward: `curr = curr->children[idx];`',
  ],
  complexity: { time: 'O(L) where L is string length', space: 'O(L) per word inserted (worst case)' },
  tags: ['trie', 'prefix-tree', 'string', 'advanced'],
};
export default lesson;
