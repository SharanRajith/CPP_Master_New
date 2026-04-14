const lesson = {
  id: 'm11-l3',
  title: 'Word Ladder (Implicit Graphs)',
  module: 11,
  lessonNumber: 3,
  xpReward: 20,
  leetcodeProblems: [
    { id: 127, title: 'Word Ladder', url: 'https://leetcode.com/problems/word-ladder/', difficulty: 'Hard' },
  ],
  content: `# Advanced Graphs (Word Ladder)

Sometimes, the graph is implicit. You don't get an Adjacency List. Instead, you have to generate valid neighbors mathematically on the fly!

## Word Ladder Problem
Given two words (` + "`" + `beginWord` + "`" + ` and ` + "`" + `endWord` + "`" + `), and a dictionary's word list, return the length of the shortest transformation sequence from ` + "`" + `beginWord` + "`" + ` to ` + "`" + `endWord` + "`" + `.
- Only one letter can be changed at a time.
- Each transformed word must exist in the word list.

### Graph Generation
This is a Shortest Path problem, so we must use **BFS (*Queue*)**!
But how do we find a node's neighbors?
**Iterate through the English Alphabet!**
For a given string "hit", we change the first letter from 'a' to 'z' ("ait", "bit", "cit"...). We check if it exists in the dictionary. If it does, we push it to the Queue and delete it from the dictionary so we don't visit it again!

\`\`\`cpp
int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    unordered_set<string> dict(wordList.begin(), wordList.end());
    if (dict.find(endWord) == dict.end()) return 0;
    
    queue<pair<string, int>> q; // {word, path_length}
    q.push({beginWord, 1});
    dict.erase(beginWord);
    
    while (!q.empty()) {
        string word = q.front().first;
        int steps = q.front().second;
        q.pop();
        
        if (word == endWord) return steps; // Found shortest path!
        
        // Generate Neighbors
        for (int i = 0; i < word.length(); i++) {
            char original_char = word[i];
            
            // Try all 26 lowercase English letters
            for (char c = 'a'; c <= 'z'; c++) {
                word[i] = c;
                
                // Is this new word in the dictionary?
                if (dict.find(word) != dict.end()) {
                    q.push({word, steps + 1});
                    dict.erase(word); // Mark visited
                }
            }
            
            word[i] = original_char; // Restore for next index
        }
    }
    return 0; // Did not reach endWord
}
\`\`\`
`,
  starterCode: `#include <iostream>
#include <string>
#include <vector>
#include <unordered_set>
#include <queue>
using namespace std;

int ladderLength(string begin, string end, vector<string>& wordList) {
    unordered_set<string> dict(wordList.begin(), wordList.end());
    if (dict.find(end) == dict.end()) return 0;
    
    // Queue stores pairs of {current_word, steps_taken}
    queue<pair<string, int>> q;
    q.push({begin, 1});
    // Remove from dict so we don't cycle back to it
    dict.erase(begin);
    
    // TODO: Write BFS logic
    // while !q.empty()
    // pop word and steps. if word == end, return steps
    // double loop: loop positions in word, loop characters 'a' to 'z'
    // check if dict.find(newWord) exists!
    
    return 0;
}

int main() {
    string b, e; cin >> b >> e;
    int n; cin >> n;
    vector<string> wl(n);
    for (int i = 0; i < n; i++) cin >> wl[i];
    
    cout << ladderLength(b, e, wl) << "\\n";
    return 0;
}`,
  modelAnswer: `#include <iostream>
#include <string>
#include <vector>
#include <unordered_set>
#include <queue>
using namespace std;

int ladderLength(string begin, string end, vector<string>& wordList) {
    unordered_set<string> dict(wordList.begin(), wordList.end());
    if (dict.find(end) == dict.end()) return 0;
    queue<pair<string, int>> q;
    q.push({begin, 1});
    dict.erase(begin);
    
    while (!q.empty()) {
        string word = q.front().first;
        int steps = q.front().second;
        q.pop();
        if (word == end) return steps;
        
        for (int i = 0; i < word.length(); i++) {
            char orig = word[i];
            for (char c = 'a'; c <= 'z'; c++) {
                word[i] = c;
                if (dict.find(word) != dict.end()) {
                    q.push({word, steps + 1});
                    dict.erase(word);
                }
            }
            word[i] = orig;
        }
    }
    return 0;
}

int main() {
    string b, e; cin >> b >> e;
    int n; cin >> n;
    vector<string> wl(n);
    for(int i=0; i<n; i++) cin >> wl[i];
    cout << ladderLength(b, e, wl) << "\\n";
    return 0;
}`,
  testCases: [
    { input: 'hit cog\n6\nhot dot dog lot log cog', expectedOutput: '5', description: 'Shortest path hit->hot->dot->dog->cog' },
    { input: 'hit cog\n5\nhot dot dog lot log', expectedOutput: '0', description: 'cog is not in dictionary, impossible path.' },
  ],
  hints: [
    'Always restore the character: `word[i] = original_char;` before the inner letter-loop ends.',
    '`dict.erase(word)` acts perfectly as a VISITED check. Deleting it prevents backwards movement and cycles natively!',
  ],
  complexity: { time: 'O(N * M * 26) where M is word length', space: 'O(N) for dictionary and queue' },
  tags: ['graph', 'bfs', 'implicit-graph', 'hard'],
};
export default lesson;
