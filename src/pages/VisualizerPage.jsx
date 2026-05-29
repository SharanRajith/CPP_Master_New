import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ChevronRight, ChevronLeft, Shuffle, RotateCcw, BarChart2, GitBranch, Share2, BookOpen, Code2, Clock, Database, Volume2, VolumeX } from 'lucide-react';

// ─── ElevenLabs TTS ───────────────────────────────────────────────────────────
const EL_KEY   = import.meta.env.VITE_ELEVENLABS_KEY ?? '';
const EL_VOICE = '21m00Tcm4TlvDq8ikWAM'; // Rachel – calm, educational
const EL_MODEL = 'eleven_turbo_v2_5';
const _audioCache = new Map();

async function elSpeak(text, signal) {
  if (!EL_KEY || !text) return null;
  if (_audioCache.has(text)) {
    const a = new Audio(_audioCache.get(text));
    a.play();
    return a;
  }
  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${EL_VOICE}`,
      {
        method: 'POST', signal,
        headers: { 'xi-api-key': EL_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          model_id: EL_MODEL,
          voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.25 },
        }),
      }
    );
    if (!res.ok) return null;
    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    _audioCache.set(text, url);
    const a = new Audio(url);
    a.play();
    return a;
  } catch { return null; }
}

// ─── Constants ────────────────────────────────────────────────────────────────
const SPEEDS = { Slow: 1800, Normal: 700, Fast: 200 };

const BAR = {
  default:   '#1e3a5f',
  comparing: '#fbbf24',
  swapped:   '#f87171',
  done:      '#34d399',
  range2:    '#a78bfa',   // right-half range for merge sort
};
const NODE = {
  default: { fill: '#0f172a', stroke: '#334155', text: '#94a3b8' },
  current: { fill: '#78350f', stroke: '#fbbf24', text: '#fde68a' },
  visited: { fill: '#064e3b', stroke: '#34d399', text: '#6ee7b7' },
};

// ─── Algorithm info ───────────────────────────────────────────────────────────
const SORT_INFO = {
  Bubble: {
    summary: 'Repeatedly walks through the array comparing adjacent pairs. If a pair is out of order it swaps them. After each full pass, the largest unsorted element is guaranteed to be in its final position — it "bubbles up" to the right.',
    bullets: ['Simple to implement and understand', 'Best case O(n) when already sorted (with early-exit)', 'Rarely used in practice — Selection/Insertion are usually better'],
    time: 'O(n²)', best: 'O(n)', space: 'O(1)',
    code: `#include <bits/stdc++.h>
using namespace std;

// Optimised bubble sort with early-exit flag
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    bool swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        // If no two elements were swapped, break early
        if (!swapped) break;
    }
}

void printVector(const vector<int>& arr) {
    for (int num : arr)
        cout << " " << num;
}

int main() {
    vector<int> arr = { 64, 34, 25, 12, 22, 11, 90 };
    bubbleSort(arr);
    cout << "Sorted array: \\n";
    printVector(arr);
    return 0;
}`,
    ccode: `#include <stdio.h>
#include <stdbool.h>

void swap(int* a, int* b) {
    int temp = *a; *a = *b; *b = temp;
}

void bubbleSort(int arr[], int n) {
    bool swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
                swapped = true;
            }
        }
        // If no two elements were swapped, break early
        if (!swapped) break;
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf(" %d", arr[i]);
}

int main() {
    int arr[] = { 64, 34, 25, 12, 22, 11, 90 };
    int n = sizeof(arr) / sizeof(arr[0]);
    bubbleSort(arr, n);
    printf("Sorted array:\\n");
    printArray(arr, n);
    return 0;
}`,
  },
  Selection: {
    summary: 'Divides the array into a sorted left region and an unsorted right region. Each pass scans the unsorted region to find its minimum, then moves that minimum to the end of the sorted region.',
    bullets: ['Always O(n²) — does not benefit from partially sorted input', 'Minimum number of swaps (at most n−1) — good when writes are expensive', 'Not stable — equal elements can be reordered'],
    time: 'O(n²)', best: 'O(n²)', space: 'O(1)',
    code: `#include <bits/stdc++.h>
using namespace std;

void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }
        // Place minimum at the sorted boundary
        if (minIdx != i)
            swap(arr[i], arr[minIdx]);
    }
}

void printVector(const vector<int>& arr) {
    for (int num : arr)
        cout << " " << num;
}

int main() {
    vector<int> arr = { 64, 25, 12, 22, 11 };
    selectionSort(arr);
    cout << "Sorted array: \\n";
    printVector(arr);
    return 0;
}`,
    ccode: `#include <stdio.h>

void swap(int* a, int* b) {
    int temp = *a; *a = *b; *b = temp;
}

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }
        // Place minimum at the sorted boundary
        if (minIdx != i)
            swap(&arr[i], &arr[minIdx]);
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf(" %d", arr[i]);
}

int main() {
    int arr[] = { 64, 25, 12, 22, 11 };
    int n = sizeof(arr) / sizeof(arr[0]);
    selectionSort(arr, n);
    printf("Sorted array:\\n");
    printArray(arr, n);
    return 0;
}`,
  },
  Insertion: {
    summary: 'Builds the sorted array one element at a time. Each new element is picked from the unsorted right portion and shifted leftward into its correct position within the already-sorted left portion — like sorting playing cards in your hand.',
    bullets: ['Adaptive — O(n) on nearly-sorted data', 'Stable — preserves the relative order of equal elements', 'Preferred for small arrays; used inside Timsort and Introsort'],
    time: 'O(n²)', best: 'O(n)', space: 'O(1)',
    code: `#include <bits/stdc++.h>
using namespace std;

void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        // Shift elements greater than key one position right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

void printVector(const vector<int>& arr) {
    for (int num : arr)
        cout << " " << num;
}

int main() {
    vector<int> arr = { 12, 11, 13, 5, 6 };
    insertionSort(arr);
    cout << "Sorted array: \\n";
    printVector(arr);
    return 0;
}`,
    ccode: `#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        // Shift elements greater than key one position right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf(" %d", arr[i]);
}

int main() {
    int arr[] = { 12, 11, 13, 5, 6 };
    int n = sizeof(arr) / sizeof(arr[0]);
    insertionSort(arr, n);
    printf("Sorted array:\\n");
    printArray(arr, n);
    return 0;
}`,
  },
  Quick: {
    summary: 'Picks a pivot element and partitions the array so all elements ≤ pivot are left of it and all elements > pivot are right. Then recursively sorts both halves. The pivot is in its final sorted position after each partition call.',
    bullets: ['O(n log n) average — one of the fastest sorting algorithms in practice', 'O(n²) worst case when pivot is always the min/max (avoidable with random pivot)', 'In-place and cache-friendly — widely used in standard libraries'],
    time: 'O(n log n)', best: 'O(n log n)', space: 'O(log n)',
    code: `#include <bits/stdc++.h>
using namespace std;

int partition(vector<int>& arr, int lo, int hi) {
    int pivot = arr[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot)
            swap(arr[++i], arr[j]);
    }
    swap(arr[i + 1], arr[hi]); // pivot placed at final position
    return i + 1;
}

void quickSort(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return;
    int pi = partition(arr, lo, hi);
    quickSort(arr, lo, pi - 1);
    quickSort(arr, pi + 1, hi);
}

void printVector(const vector<int>& arr) {
    for (int num : arr)
        cout << " " << num;
}

int main() {
    vector<int> arr = { 10, 7, 8, 9, 1, 5 };
    int n = arr.size();
    quickSort(arr, 0, n - 1);
    cout << "Sorted array: \\n";
    printVector(arr);
    return 0;
}`,
    ccode: `#include <stdio.h>

void swap(int* a, int* b) {
    int temp = *a; *a = *b; *b = temp;
}

int partition(int arr[], int lo, int hi) {
    int pivot = arr[hi], i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot)
            swap(&arr[++i], &arr[j]);
    }
    swap(&arr[i + 1], &arr[hi]); // pivot placed at final position
    return i + 1;
}

void quickSort(int arr[], int lo, int hi) {
    if (lo >= hi) return;
    int pi = partition(arr, lo, hi);
    quickSort(arr, lo, pi - 1);
    quickSort(arr, pi + 1, hi);
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf(" %d", arr[i]);
}

int main() {
    int arr[] = { 10, 7, 8, 9, 1, 5 };
    int n = sizeof(arr) / sizeof(arr[0]);
    quickSort(arr, 0, n - 1);
    printf("Sorted array:\\n");
    printArray(arr, n);
    return 0;
}`,
  },
  Merge: {
    summary: 'Recursively splits the array in half until every subarray has one element (trivially sorted), then merges pairs of sorted subarrays back together — each merge step takes two sorted halves and produces one larger sorted array.',
    bullets: ['Guaranteed O(n log n) in all cases — no worst-case like Quick Sort', 'Stable — equal elements keep their relative order', 'Requires O(n) extra space for the temporary left/right buffers'],
    time: 'O(n log n)', best: 'O(n log n)', space: 'O(n)',
    code: `#include <bits/stdc++.h>
using namespace std;

void merge(vector<int>& arr, int lo, int mid, int hi) {
    vector<int> L(arr.begin() + lo,      arr.begin() + mid + 1);
    vector<int> R(arr.begin() + mid + 1, arr.begin() + hi + 1);
    int i = 0, j = 0, k = lo;
    while (i < (int)L.size() && j < (int)R.size())
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < (int)L.size())  arr[k++] = L[i++];
    while (j < (int)R.size())  arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return;
    int mid = lo + (hi - lo) / 2;
    mergeSort(arr, lo, mid);
    mergeSort(arr, mid + 1, hi);
    merge(arr, lo, mid, hi);
}

int main() {
    vector<int> arr = { 38, 27, 43, 3, 9, 82, 10 };
    mergeSort(arr, 0, arr.size() - 1);
    for (int x : arr) cout << x << " ";
    return 0;
}`,
    ccode: `#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int lo, int mid, int hi) {
    int nl = mid - lo + 1, nr = hi - mid;
    int* L = malloc(nl * sizeof(int));
    int* R = malloc(nr * sizeof(int));
    for (int i = 0; i < nl; i++) L[i] = arr[lo + i];
    for (int j = 0; j < nr; j++) R[j] = arr[mid + 1 + j];
    int i = 0, j = 0, k = lo;
    while (i < nl && j < nr)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < nl) arr[k++] = L[i++];
    while (j < nr) arr[k++] = R[j++];
    free(L); free(R);
}

void mergeSort(int arr[], int lo, int hi) {
    if (lo >= hi) return;
    int mid = lo + (hi - lo) / 2;
    mergeSort(arr, lo, mid);
    mergeSort(arr, mid + 1, hi);
    merge(arr, lo, mid, hi);
}

int main() {
    int arr[] = { 38, 27, 43, 3, 9, 82, 10 };
    int n = sizeof(arr) / sizeof(arr[0]);
    mergeSort(arr, 0, n - 1);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
  },
};

const TREE_INFO = {
  Inorder: {
    summary: 'Visits nodes in Left → Root → Right order. On a Binary Search Tree this always produces the elements in ascending sorted order — making it the go-to traversal for sorted output.',
    bullets: ['Produces sorted output on a BST', 'Used to validate whether a tree is a valid BST', 'Recursive and iterative (stack-based) versions are common'],
    time: 'O(n)', space: 'O(h)',
    code: `// Recursive inorder traversal
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

// Iterative version using a stack
void inorderIterative(TreeNode* root) {
    stack<TreeNode*> st;
    TreeNode* curr = root;
    while (curr || !st.empty()) {
        while (curr) { st.push(curr); curr = curr->left; }
        curr = st.top(); st.pop();
        cout << curr->val << " ";
        curr = curr->right;
    }
}`,
    ccode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int val;
    struct Node* left;
    struct Node* right;
};

struct Node* newNode(int val) {
    struct Node* n = malloc(sizeof(struct Node));
    n->val = val; n->left = n->right = NULL;
    return n;
}

void inorder(struct Node* root) {
    if (!root) return;
    inorder(root->left);
    printf("%d ", root->val);
    inorder(root->right);
}

int main() {
    struct Node* root = newNode(50);
    root->left  = newNode(25);  root->right = newNode(75);
    root->left->left  = newNode(12);
    root->left->right = newNode(37);
    root->right->left = newNode(62);
    root->right->right = newNode(88);
    printf("Inorder: ");
    inorder(root);
    return 0;
}`,
  },
  Preorder: {
    summary: 'Visits nodes in Root → Left → Right order. The root is processed before its children, making this ideal for copying a tree or serializing its structure to a file.',
    bullets: ['Root is always visited first — great for tree serialization', 'Used to create a prefix expression from an expression tree', 'Produces the same insertion order to recreate the BST'],
    time: 'O(n)', space: 'O(h)',
    code: `// Recursive preorder traversal
void preorder(TreeNode* root) {
    if (!root) return;
    cout << root->val << " "; // process root first
    preorder(root->left);
    preorder(root->right);
}

// Serialize BST to reconstruct later
void serialize(TreeNode* root, vector<int>& out) {
    if (!root) { out.push_back(-1); return; }
    out.push_back(root->val);
    serialize(root->left, out);
    serialize(root->right, out);
}`,
    ccode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int val;
    struct Node* left;
    struct Node* right;
};

struct Node* newNode(int val) {
    struct Node* n = malloc(sizeof(struct Node));
    n->val = val; n->left = n->right = NULL;
    return n;
}

void preorder(struct Node* root) {
    if (!root) return;
    printf("%d ", root->val); // root first
    preorder(root->left);
    preorder(root->right);
}

int main() {
    struct Node* root = newNode(50);
    root->left  = newNode(25);  root->right = newNode(75);
    root->left->left  = newNode(12);
    root->left->right = newNode(37);
    root->right->left = newNode(62);
    root->right->right = newNode(88);
    printf("Preorder: ");
    preorder(root);
    return 0;
}`,
  },
  Postorder: {
    summary: 'Visits nodes in Left → Right → Root order. Children are always processed before their parent — essential for safely deleting a tree and for evaluating expression trees (compute sub-expressions first).',
    bullets: ['Children processed before parent — safe for deletion', 'Used to evaluate arithmetic expression trees', 'Computes subtree size / height naturally (children first)'],
    time: 'O(n)', space: 'O(h)',
    code: `// Recursive postorder traversal
void postorder(TreeNode* root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->val << " "; // root last
}

// Delete entire tree safely
void deleteTree(TreeNode*& root) {
    if (!root) return;
    deleteTree(root->left);
    deleteTree(root->right);
    delete root;
    root = nullptr;
}`,
    ccode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int val;
    struct Node* left;
    struct Node* right;
};

struct Node* newNode(int val) {
    struct Node* n = malloc(sizeof(struct Node));
    n->val = val; n->left = n->right = NULL;
    return n;
}

void postorder(struct Node* root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    printf("%d ", root->val); // root last
}

int main() {
    struct Node* root = newNode(50);
    root->left  = newNode(25);  root->right = newNode(75);
    root->left->left  = newNode(12);
    root->left->right = newNode(37);
    root->right->left = newNode(62);
    root->right->right = newNode(88);
    printf("Postorder: ");
    postorder(root);
    return 0;
}`,
  },
  'Level-order': {
    summary: 'Uses a queue to visit all nodes level by level, left to right. Also called Breadth-First Search (BFS) on a tree. Useful when you need to process nodes closest to the root first.',
    bullets: ['Finds the shortest path from root to a target node', 'Used to print tree level by level (zigzag, right-side view)', 'The queue is the key data structure — not recursion'],
    time: 'O(n)', space: 'O(w)',
    code: `// Level-order (BFS) traversal
void levelOrder(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int size = q.size(); // nodes at current level
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front(); q.pop();
            cout << node->val << " ";
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        cout << "\\n"; // newline after each level
    }
}`,
    ccode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int val;
    struct Node* left;
    struct Node* right;
};

struct Node* newNode(int val) {
    struct Node* n = malloc(sizeof(struct Node));
    n->val = val; n->left = n->right = NULL;
    return n;
}

void levelOrder(struct Node* root) {
    if (!root) return;
    struct Node* queue[100];
    int front = 0, rear = 0;
    queue[rear++] = root;
    while (front < rear) {
        struct Node* node = queue[front++];
        printf("%d ", node->val);
        if (node->left)  queue[rear++] = node->left;
        if (node->right) queue[rear++] = node->right;
    }
}

int main() {
    struct Node* root = newNode(50);
    root->left  = newNode(25);  root->right = newNode(75);
    root->left->left  = newNode(12);
    root->left->right = newNode(37);
    root->right->left = newNode(62);
    root->right->right = newNode(88);
    printf("Level-order: ");
    levelOrder(root);
    return 0;
}`,
  },
};

const GRAPH_INFO = {
  BFS: {
    summary: 'Breadth-First Search uses a queue to explore all neighbors of the current node before moving deeper. It processes the graph layer by layer, guaranteeing the shortest path (in terms of edge count) to any reachable node in an unweighted graph.',
    bullets: ['Guarantees shortest path in unweighted graphs', 'Visited set prevents revisiting nodes in cycles', 'Time O(V+E) — visits every vertex and edge once'],
    time: 'O(V + E)', space: 'O(V)',
    code: `void BFS(int start, vector<vector<int>>& adj, int V) {
    vector<bool> visited(V, false);
    queue<int> q;

    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";

        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`,
    ccode: `#include <stdio.h>
#include <stdbool.h>

#define V 8

int adj[V][V] = {
    {0,1,1,0,0,0,0,0}, {1,0,0,1,1,0,0,0},
    {1,0,0,0,0,1,1,0}, {0,1,0,0,0,0,0,1},
    {0,1,0,0,0,1,0,1}, {0,0,1,0,1,0,0,0},
    {0,0,1,0,0,0,0,0}, {0,0,0,1,1,0,0,0},
};

void BFS(int start) {
    bool visited[V] = { false };
    int queue[V], front = 0, rear = 0;
    visited[start] = true;
    queue[rear++] = start;
    while (front < rear) {
        int node = queue[front++];
        printf("%d ", node);
        for (int i = 0; i < V; i++) {
            if (adj[node][i] && !visited[i]) {
                visited[i] = true;
                queue[rear++] = i;
            }
        }
    }
}

int main() {
    printf("BFS from node 0:\\n");
    BFS(0);
    return 0;
}`,
  },
  DFS: {
    summary: 'Depth-First Search dives as deep as possible along each branch before backtracking. The call stack (or an explicit stack) keeps track of the path. Used to detect cycles, find connected components, and generate topological orderings.',
    bullets: ['Uses the call stack (implicit) or an explicit stack', 'Detects cycles, finds connected components, topological sort', 'Does NOT guarantee shortest path — use BFS for that'],
    time: 'O(V + E)', space: 'O(V)',
    code: `void DFS(int node, vector<vector<int>>& adj,
         vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";

    for (int neighbor : adj[node]) {
        if (!visited[neighbor])
            DFS(neighbor, adj, visited);
    }
}

// Entry point
void DFSAll(int V, vector<vector<int>>& adj) {
    vector<bool> visited(V, false);
    for (int i = 0; i < V; i++)
        if (!visited[i])
            DFS(i, adj, visited);
}`,
    ccode: `#include <stdio.h>
#include <stdbool.h>

#define V 8

int adj[V][V] = {
    {0,1,1,0,0,0,0,0}, {1,0,0,1,1,0,0,0},
    {1,0,0,0,0,1,1,0}, {0,1,0,0,0,0,0,1},
    {0,1,0,0,0,1,0,1}, {0,0,1,0,1,0,0,0},
    {0,0,1,0,0,0,0,0}, {0,0,0,1,1,0,0,0},
};

bool visited[V];

void DFS(int node) {
    visited[node] = true;
    printf("%d ", node);
    for (int i = 0; i < V; i++) {
        if (adj[node][i] && !visited[i])
            DFS(i);
    }
}

int main() {
    // initialise visited to false
    for (int i = 0; i < V; i++) visited[i] = false;
    printf("DFS from node 0:\\n");
    DFS(0);
    return 0;
}`,
  },
  'Topo Sort': {
    summary: "Topological Sort (Kahn's algorithm) orders the nodes of a Directed Acyclic Graph (DAG) so that every edge u→v has u appearing before v. It repeatedly removes nodes whose in-degree is 0, updating neighbors' in-degrees until all nodes are ordered.",
    bullets: [
      'Only works on DAGs — a cycle makes topological ordering impossible',
      'If the result has fewer nodes than the graph, a cycle exists',
      'Common use-cases: build systems, task scheduling, course prerequisites',
    ],
    time: 'O(V + E)', space: 'O(V)',
    code: `#include <bits/stdc++.h>
using namespace std;

vector<int> topoSort(int V, vector<vector<int>>& adj) {
    // Step 1: count incoming edges for each node
    vector<int> inDegree(V, 0);
    for (int u = 0; u < V; u++)
        for (int v : adj[u])
            inDegree[v]++;

    // Step 2: start with all nodes that have no prerequisites
    queue<int> q;
    for (int i = 0; i < V; i++)
        if (inDegree[i] == 0) q.push(i);

    vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);

        // Remove u: reduce in-degree of its neighbors
        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) // prerequisite fulfilled
                q.push(v);
        }
    }
    // if order.size() != V, a cycle was detected
    return order;
}

int main() {
    int V = 7;
    vector<vector<int>> adj(V);
    adj[0] = {1, 2};
    adj[1] = {3, 4};
    adj[2] = {4, 5};
    adj[3] = {6};
    adj[4] = {6};
    adj[5] = {6};

    vector<int> result = topoSort(V, adj);
    for (int node : result)
        cout << node << " ";
    return 0;
}`,
    ccode: `#include <stdio.h>
#define V 7

// Adjacency matrix (directed edges only)
int adj[V][V] = {
    {0,1,1,0,0,0,0},
    {0,0,0,1,1,0,0},
    {0,0,0,0,1,1,0},
    {0,0,0,0,0,0,1},
    {0,0,0,0,0,0,1},
    {0,0,0,0,0,0,1},
    {0,0,0,0,0,0,0},
};

void topoSort() {
    int inDegree[V] = {0};
    for (int u = 0; u < V; u++)
        for (int v = 0; v < V; v++)
            if (adj[u][v]) inDegree[v]++;

    // Queue holds nodes whose in-degree reached 0
    int queue[V], front = 0, rear = 0;
    for (int i = 0; i < V; i++)
        if (inDegree[i] == 0) queue[rear++] = i;

    int order[V], cnt = 0;
    while (front < rear) {
        int u = queue[front++];
        order[cnt++] = u;
        for (int v = 0; v < V; v++) {
            if (adj[u][v]) {
                inDegree[v]--;
                if (inDegree[v] == 0)
                    queue[rear++] = v;
            }
        }
    }

    for (int i = 0; i < cnt; i++)
        printf("%d ", order[i]);
}

int main() {
    topoSort();
    return 0;
}`,
  },
  Dijkstra: {
    summary: "Greedily finds the shortest path from a source to every other node in a weighted graph with non-negative edges. Each round it picks the unsettled node with the smallest known distance, permanently finalises it, then relaxes its neighbors' distances.",
    bullets: [
      'Greedy guarantee: once a node is settled its distance is optimal',
      'Requires non-negative weights — use Bellman-Ford for negative edges',
      'O((V+E) log V) with a min-heap priority queue; O(V²) with a simple array',
    ],
    time: 'O((V+E) log V)', space: 'O(V)',
    code: `#include <bits/stdc++.h>
using namespace std;

// adj[u] holds {neighbor, weight} pairs
vector<int> dijkstra(int src, int V,
        vector<vector<pair<int,int>>>& adj) {

    vector<int> dist(V, INT_MAX);
    // min-heap: {distance, node}
    priority_queue<pair<int,int>,
                   vector<pair<int,int>>,
                   greater<pair<int,int>>> pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (d > dist[u]) continue; // outdated entry

        for (int i = 0; i < adj[u].size(); i++) {
            int v = adj[u][i].first;
            int w = adj[u][i].second;
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    int V = 7;
    vector<vector<pair<int,int>>> adj(V);
    // add edge u -- v with weight w (undirected)
    adj[0].push_back({1, 3}); adj[1].push_back({0, 3});
    adj[0].push_back({2, 4}); adj[2].push_back({0, 4});
    adj[1].push_back({3, 5}); adj[3].push_back({1, 5});
    adj[1].push_back({4, 2}); adj[4].push_back({1, 2});
    adj[2].push_back({4, 8}); adj[4].push_back({2, 8});
    adj[2].push_back({5, 3}); adj[5].push_back({2, 3});
    adj[3].push_back({4, 6}); adj[4].push_back({3, 6});
    adj[3].push_back({6, 7}); adj[6].push_back({3, 7});
    adj[4].push_back({5, 1}); adj[5].push_back({4, 1});
    adj[4].push_back({6, 4}); adj[6].push_back({4, 4});
    adj[5].push_back({6, 5}); adj[6].push_back({5, 5});

    vector<int> d = dijkstra(0, V, adj);
    for (int i = 0; i < V; i++)
        cout << "Node " << i << ": " << d[i] << "\\n";
    return 0;
}`,
    ccode: `#include <stdio.h>
#include <limits.h>
#include <stdbool.h>
#define V 7

int minDist(int dist[], bool done[]) {
    int min = INT_MAX, idx = -1;
    for (int v = 0; v < V; v++)
        if (!done[v] && dist[v] < min)
            min = dist[v], idx = v;
    return idx;
}

void dijkstra(int g[V][V], int src) {
    int  dist[V];
    bool done[V];
    for (int i = 0; i < V; i++)
        dist[i] = INT_MAX, done[i] = false;
    dist[src] = 0;

    for (int c = 0; c < V - 1; c++) {
        int u = minDist(dist, done);
        if (u == -1) break;
        done[u] = true;
        for (int v = 0; v < V; v++) {
            if (!done[v] && g[u][v] &&
                dist[u] != INT_MAX &&
                dist[u] + g[u][v] < dist[v])
                dist[v] = dist[u] + g[u][v];
        }
    }
    for (int i = 0; i < V; i++)
        printf("Node %d: %d\\n", i, dist[i]);
}

int main() {
    int g[V][V] = {
        {0,3,4,0,0,0,0},
        {3,0,0,5,2,0,0},
        {4,0,0,0,8,3,0},
        {0,5,0,0,6,0,7},
        {0,2,8,6,0,1,4},
        {0,0,3,0,1,0,5},
        {0,0,0,7,4,5,0},
    };
    dijkstra(g, 0);
    return 0;
}`,
  },
};

// ─── AlgoInfo panel ───────────────────────────────────────────────────────────
function AlgoInfo({ info }) {
  const [tab, setTab] = useState('explain');
  if (!info) return null;
  return (
    <motion.div
      key={info.summary}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mt-4 rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(99,102,241,0.18)', background: 'rgba(12,12,22,0.85)' }}
    >
      {/* Tab bar */}
      <div className="flex border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        {[['explain', <BookOpen size={12} />, 'How it works'], ['code', <Code2 size={12} />, 'C++ Code'], ['ccode', <Code2 size={12} />, 'C Code']].map(([id, icon, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold transition-all"
            style={tab === id
              ? { color: '#a5b4fc', borderBottom: '2px solid #6366f1', background: 'rgba(99,102,241,0.08)' }
              : { color: '#6b7280', borderBottom: '2px solid transparent' }}
          >
            {icon} {label}
          </button>
        ))}
        {/* Complexity chips */}
        <div className="ml-auto flex items-center gap-2 px-4">
          <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded"
            style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}>
            <Clock size={9} /> {info.time}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded"
            style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>
            <Database size={9} /> {info.space}
          </span>
          {info.best && info.best !== info.time && (
            <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded"
              style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }}>
              Best {info.best}
            </span>
          )}
        </div>
      </div>

      {tab === 'explain' ? (
        <div className="p-5">
          <p className="text-sm text-slate-300 leading-relaxed mb-4">{info.summary}</p>
          <ul className="flex flex-col gap-2">
            {info.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-dark-300 leading-relaxed">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#6366f1' }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="relative">
          <pre
            className="overflow-x-auto text-xs leading-relaxed p-5 m-0"
            style={{ background: 'transparent', color: '#e2e8f0', fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace" }}
          >
            <code dangerouslySetInnerHTML={{ __html: highlight(tab === 'ccode' ? info.ccode : info.code) }} />
          </pre>
        </div>
      )}
    </motion.div>
  );
}

// Minimal syntax highlighter — numbers run first so later span injections don't get re-matched
function highlight(code) {
  const keywords = ['void', 'int', 'bool', 'for', 'while', 'if', 'else', 'return', 'true', 'false', 'nullptr', 'struct', 'class', 'auto', 'break', 'continue', 'new', 'delete', 'const', 'static', 'include', 'define', 'typedef', 'sizeof', 'malloc', 'free'];
  const types    = ['vector', 'queue', 'priority_queue', 'stack', 'deque', 'set', 'map', 'pair', 'TreeNode', 'string', 'INT_MAX'];

  // Escape HTML entities first so injected spans aren't re-escaped
  let out = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Tokenise in one pass: collect [start, end, html] replacements for non-overlapping regions.
  // Order: comments → string literals → numbers. Keywords/types run after and only match \w tokens.
  const regions = [];   // { start, end }

  // 1. Line comments
  out = out.replace(/\/\/.*/g, (m, offset) => {
    regions.push({ start: offset, end: offset + m.length });
    return `\x00COM${regions.length - 1}\x00`;
  });
  const commentTokens = regions.map(r => out); // save for restore below — handled inline

  // Simpler: build the output sequentially using a replacer that records occupied spans
  // Reset and use a cleaner two-phase approach:
  out = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Phase 1: mark literal regions (comments + strings) with placeholders so later
  //          regexes don't corrupt them.
  const slots = [];
  function protect(str, color, italic = false) {
    const style = italic
      ? `color:${color};font-style:italic`
      : `color:${color}`;
    slots.push(`<span style='${style}'>${str}</span>`);
    return `\x00${slots.length - 1}\x00`;
  }

  // Comments first (greedy to end of line)
  out = out.replace(/\/\/.*/g, m => protect(m, 'slategray', true));
  // String literals (lazy, double-quoted only — safe now because injected spans use single quotes)
  out = out.replace(/"[^"\n]*"/g, m => protect(m, 'lightgreen'));

  // Phase 2: highlight numbers, keywords, types in the remaining plain text
  out = out.replace(/\b(\d+)\b/g, "<span style='color:#f9a8d4'>$1</span>");

  keywords.forEach(k => {
    out = out.replace(
      new RegExp(`\\b(${k})\\b`, 'g'),
      "<span style='color:#c084fc;font-weight:bold'>$1</span>",
    );
  });
  types.forEach(t => {
    out = out.replace(
      new RegExp(`\\b(${t})\\b`, 'g'),
      "<span style='color:#67e8f9'>$1</span>",
    );
  });

  // Phase 3: restore protected slots
  out = out.replace(/\x00(\d+)\x00/g, (_, i) => slots[Number(i)]);

  return out;
}

// ─── Sorting helpers ──────────────────────────────────────────────────────────
function randArray(n = 20) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 80) + 12);
}

function bubbleSteps(orig) {
  const steps = [], a = [...orig], n = a.length, done = new Set();
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ a: [...a], hi: [j, j + 1], swap: false, done: new Set(done), info: `Compare a[${j}]=${a[j]} and a[${j+1}]=${a[j+1]}` });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ a: [...a], hi: [j, j + 1], swap: true, done: new Set(done), info: `Swap — ${a[j+1]} > ${a[j]}, larger element bubbles right` });
      }
    }
    done.add(n - 1 - i);
  }
  done.add(0);
  steps.push({ a: [...a], hi: [], swap: false, done: new Set(done), info: '✓ Sorted! Every pass moved the largest unsorted element to its correct position.' });
  return steps;
}

function selectionSteps(orig) {
  const steps = [], a = [...orig], n = a.length, done = new Set();
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({ a: [...a], hi: [minIdx], swap: false, done: new Set(done), info: `Pass ${i+1}: finding minimum in a[${i}..${n-1}]` });
    for (let j = i + 1; j < n; j++) {
      steps.push({ a: [...a], hi: [minIdx, j], swap: false, done: new Set(done), info: `Compare current min ${a[minIdx]} with a[${j}]=${a[j]}` });
      if (a[j] < a[minIdx]) {
        minIdx = j;
        steps.push({ a: [...a], hi: [minIdx], swap: false, done: new Set(done), info: `New minimum: ${a[minIdx]} at index ${minIdx}` });
      }
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({ a: [...a], hi: [i, minIdx], swap: true, done: new Set(done), info: `Swap minimum ${a[i]} into position ${i}` });
    }
    done.add(i);
  }
  done.add(n - 1);
  steps.push({ a: [...a], hi: [], swap: false, done: new Set(done), info: '✓ Sorted! Each pass selected the minimum and placed it at the front.' });
  return steps;
}

function insertionSteps(orig) {
  const steps = [], a = [...orig], n = a.length;
  for (let i = 1; i < n; i++) {
    const key = a[i];
    steps.push({ a: [...a], hi: [i], swap: false, done: new Set(), info: `Insert a[${i}]=${key} into sorted portion a[0..${i-1}]` });
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      steps.push({ a: [...a], hi: [j, j + 1], swap: true, done: new Set(), info: `Shift ${a[j]} right — ${a[j]} > ${key}` });
      j--;
    }
    a[j + 1] = key;
    steps.push({ a: [...a], hi: [j + 1], swap: false, done: new Set(), info: `Place ${key} at index ${j + 1}` });
  }
  steps.push({ a: [...a], hi: [], swap: false, done: new Set(Array.from({ length: a.length }, (_, i) => i)), info: '✓ Sorted! Built the sorted array one insertion at a time.' });
  return steps;
}

function quickSteps(orig) {
  const steps = [], a = [...orig], done = new Set();
  function partition(lo, hi) {
    const pivot = a[hi];
    steps.push({ a: [...a], hi: [hi], swap: false, done: new Set(done), info: `Pivot = ${pivot} (index ${hi})` });
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      steps.push({ a: [...a], hi: [j, hi], swap: false, done: new Set(done), info: `a[${j}]=${a[j]} vs pivot=${pivot} — ${a[j] <= pivot ? 'move to left partition' : 'skip'}` });
      if (a[j] <= pivot) {
        i++;
        if (i !== j) {
          [a[i], a[j]] = [a[j], a[i]];
          steps.push({ a: [...a], hi: [i, j], swap: true, done: new Set(done), info: `Swap a[${i}] and a[${j}]` });
        }
      }
    }
    [a[i + 1], a[hi]] = [a[hi], a[i + 1]];
    done.add(i + 1);
    steps.push({ a: [...a], hi: [i + 1], swap: false, done: new Set(done), info: `Pivot ${pivot} placed at final position ${i + 1} ✓` });
    return i + 1;
  }
  function qs(lo, hi) {
    if (lo >= hi) { if (lo === hi) done.add(lo); return; }
    const pi = partition(lo, hi);
    qs(lo, pi - 1);
    qs(pi + 1, hi);
  }
  qs(0, a.length - 1);
  steps.push({ a: [...a], hi: [], swap: false, done: new Set(Array.from({ length: a.length }, (_, i) => i)), info: '✓ Sorted! Each pivot was placed in its correct position recursively.' });
  return steps;
}

function mergeSteps(orig) {
  const steps = [], a = [...orig];

  // hi  = left-half indices  (yellow)
  // hi2 = right-half indices (violet)
  // swap=true + hi=[k]       = element being placed (red)
  function push(hi, hi2, swap, info) {
    steps.push({ a: [...a], hi, hi2, swap, done: new Set(), info });
  }

  function lRange(lo, mid)       { return Array.from({ length: mid - lo + 1 },  (_, x) => lo + x); }
  function rRange(mid1, hi)      { return Array.from({ length: hi - mid1 + 1 }, (_, x) => mid1 + x); }

  function merge(lo, mid, hi) {
    const left  = a.slice(lo, mid + 1);
    const right = a.slice(mid + 1, hi + 1);

    // Show the two halves before merging — yellow left, violet right
    push(lRange(lo, mid), rRange(mid + 1, hi), false,
      `Merge: yellow=left a[${lo}..${mid}]  violet=right a[${mid+1}..${hi}]`);

    let i = 0, j = 0, k = lo;
    while (i < left.length && j < right.length) {
      const li = left[i], rj = right[j];
      const picked = li <= rj ? left[i++] : right[j++];
      a[k] = picked;
      push([k], [], true, `${li} ${li <= rj ? '≤' : '>'} ${rj}  →  place ${picked} at index ${k}`);
      k++;
    }
    while (i < left.length) {
      a[k] = left[i++];
      push([k], [], true, `Copy remaining left element ${a[k]} → index ${k}`);
      k++;
    }
    while (j < right.length) {
      a[k] = right[j++];
      push([k], [], true, `Copy remaining right element ${a[k]} → index ${k}`);
      k++;
    }
  }

  function ms(lo, hi) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    // Split step: left half yellow, right half violet
    push(lRange(lo, mid), rRange(mid + 1, hi), false,
      `Split a[${lo}..${hi}]  →  yellow left a[${lo}..${mid}]  |  violet right a[${mid+1}..${hi}]`);
    ms(lo, mid);
    ms(mid + 1, hi);
    merge(lo, mid, hi);
  }

  ms(0, a.length - 1);
  steps.push({
    a: [...a], hi: [], hi2: [], swap: false,
    done: new Set(Array.from({ length: a.length }, (_, i) => i)),
    info: '✓ Sorted! Merge Sort recursively divided then merged every subarray.',
  });
  return steps;
}

const SORT_GEN = { 'Bubble': bubbleSteps, 'Selection': selectionSteps, 'Insertion': insertionSteps, 'Quick': quickSteps, 'Merge': mergeSteps };

// ─── BST helpers ──────────────────────────────────────────────────────────────
function insertBST(root, val) {
  if (!root) return { val, id: val, left: null, right: null };
  if (val === root.val) return root;
  if (val < root.val) return { ...root, left: insertBST(root.left, val) };
  return { ...root, right: insertBST(root.right, val) };
}
function buildBST(vals) {
  let root = null;
  for (const v of vals) root = insertBST(root, v);
  return root;
}
function layoutBST(root) {
  let col = 0;
  const pos = {}, edges = [];
  function place(node, depth) {
    if (!node) return;
    place(node.left, depth + 1);
    pos[node.id] = { x: col * 56 + 34, y: depth * 68 + 34, val: node.val };
    col++;
    place(node.right, depth + 1);
  }
  place(root, 0);
  function collectEdges(node) {
    if (!node) return;
    if (node.left)  edges.push([node.id, node.left.id]);
    if (node.right) edges.push([node.id, node.right.id]);
    collectEdges(node.left);
    collectEdges(node.right);
  }
  collectEdges(root);
  const xs = Object.values(pos).map(p => p.x);
  const ys = Object.values(pos).map(p => p.y);
  return { pos, edges, width: Math.max(...xs) + 40, height: Math.max(...ys) + 40 };
}
function treeSteps(root, algo, pos) {
  const steps = [], visited = [];
  const path = () => visited.map(id => pos[id]?.val).join(' → ');
  if (algo === 'Level-order') {
    const queue = [root];
    while (queue.length) {
      const node = queue.shift();
      if (!node) continue;
      visited.push(node.id);
      steps.push({ current: node.id, visited: [...visited], info: `Visit ${node.val}   queue: [${queue.filter(Boolean).map(n => n.val).join(', ')}]   path: ${path()}` });
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  } else {
    function inorder(n)   { if (!n) return; inorder(n.left); visited.push(n.id); steps.push({ current: n.id, visited: [...visited], info: `Visit ${n.val}   path: ${path()}` }); inorder(n.right); }
    function preorder(n)  { if (!n) return; visited.push(n.id); steps.push({ current: n.id, visited: [...visited], info: `Visit ${n.val}   path: ${path()}` }); preorder(n.left); preorder(n.right); }
    function postorder(n) { if (!n) return; postorder(n.left); postorder(n.right); visited.push(n.id); steps.push({ current: n.id, visited: [...visited], info: `Visit ${n.val}   path: ${path()}` }); }
    if (algo === 'Inorder')   inorder(root);
    if (algo === 'Preorder')  preorder(root);
    if (algo === 'Postorder') postorder(root);
  }
  return steps;
}
const DEFAULT_BST = [50, 25, 75, 12, 37, 62, 88];
function randBST() { const s = new Set(); while (s.size < 7) s.add(Math.floor(Math.random() * 85) + 10); return [...s]; }

// ─── Graph helpers ────────────────────────────────────────────────────────────
const G_NODES = [
  { id: 0, x: 210, y: 44 }, { id: 1, x: 95,  y: 140 }, { id: 2, x: 325, y: 140 },
  { id: 3, x: 38,  y: 248 }, { id: 4, x: 165, y: 248 }, { id: 5, x: 270, y: 248 }, { id: 6, x: 385, y: 248 },
  { id: 7, x: 105, y: 355 },
];
const G_EDGES = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[4,7],[4,5]];
const G_ADJ = Object.fromEntries(G_NODES.map(n => [n.id, []]));
G_EDGES.forEach(([a, b]) => { G_ADJ[a].push(b); G_ADJ[b].push(a); });

function graphBFS(start) {
  const steps = [], visited = new Set([start]), queue = [start], tEdges = new Set();
  while (queue.length) {
    const node = queue.shift();
    steps.push({ current: node, visited: new Set(visited), edges: new Set(tEdges), info: `Visit node ${node}   queue: [${queue.join(', ')}]` });
    for (const nb of G_ADJ[node]) {
      if (!visited.has(nb)) {
        visited.add(nb); queue.push(nb);
        tEdges.add([Math.min(node, nb), Math.max(node, nb)].join('-'));
      }
    }
  }
  return steps;
}
function graphDFS(start) {
  const steps = [], visited = new Set(), tEdges = new Set();
  function dfs(node) {
    visited.add(node);
    steps.push({ current: node, visited: new Set(visited), edges: new Set(tEdges), info: `Visit node ${node}   neighbors: [${G_ADJ[node].join(', ')}]` });
    for (const nb of G_ADJ[node]) {
      if (!visited.has(nb)) { tEdges.add([Math.min(node, nb), Math.max(node, nb)].join('-')); dfs(nb); }
    }
  }
  dfs(start);
  return steps;
}

// ─── Dijkstra graph data ──────────────────────────────────────────────────────
// Hexagonal layout — 7 nodes, all edges have non-negative weights
const DJ_NODES = [
  { id: 0, x: 220, y: 50  },
  { id: 1, x: 80,  y: 155 },
  { id: 2, x: 360, y: 155 },
  { id: 3, x: 80,  y: 275 },
  { id: 4, x: 220, y: 205 },
  { id: 5, x: 360, y: 275 },
  { id: 6, x: 220, y: 355 },
];
const DJ_EDGES = [
  [0, 1, 3], [0, 2, 4],
  [1, 3, 5], [1, 4, 2],
  [2, 4, 8], [2, 5, 3],
  [3, 4, 6], [3, 6, 7],
  [4, 5, 1], [4, 6, 4],
  [5, 6, 5],
];
const DJ_ADJ = {};
DJ_NODES.forEach(n => { DJ_ADJ[n.id] = []; });
DJ_EDGES.forEach(([a, b, w]) => { DJ_ADJ[a].push({ node: b, w }); DJ_ADJ[b].push({ node: a, w }); });

function dijkstraSteps(source) {
  const INF = Infinity;
  const dist = {}, prev = {};
  DJ_NODES.forEach(n => { dist[n.id] = INF; prev[n.id] = null; });
  dist[source] = 0;
  const settled = new Set();

  function snap(current, activeEdge, info) {
    const te = new Set();
    DJ_NODES.forEach(n => {
      if (prev[n.id] !== null)
        te.add([Math.min(n.id, prev[n.id]), Math.max(n.id, prev[n.id])].join('-'));
    });
    return { current, settled: new Set(settled), dist: { ...dist }, activeEdge, treeEdges: te, info };
  }

  const steps = [snap(null, null, `Initialize: dist[${source}] = 0, all other nodes = ∞. Each round picks the nearest unsettled node.`)];

  while (settled.size < DJ_NODES.length) {
    let u = -1;
    for (const n of DJ_NODES) {
      if (!settled.has(n.id) && dist[n.id] < INF)
        if (u === -1 || dist[n.id] < dist[u]) u = n.id;
    }
    if (u === -1) break;

    settled.add(u);
    steps.push(snap(u, null, `Settle node ${u} — shortest distance confirmed: ${dist[u]}. Now relax its neighbors.`));

    for (const { node: v, w } of DJ_ADJ[u]) {
      if (settled.has(v)) continue;
      const dv = dist[v] === INF ? '∞' : dist[v];
      const nd = dist[u] + w;
      steps.push(snap(u, [u, v], `Relax ${u}→${v}  (weight ${w}):  ${dist[u]} + ${w} = ${nd}  vs  dist[${v}] = ${dv}`));
      if (nd < dist[v]) {
        dist[v] = nd;
        prev[v] = u;
        steps.push(snap(u, [u, v], `✓ Update dist[${v}] = ${nd}  (shorter path found via node ${u})`));
      }
    }
  }

  steps.push(snap(null, null,
    `✓ Done!  Shortest distances from ${source}: ` +
    DJ_NODES.map(n => `${n.id}→${dist[n.id] === INF ? '∞' : dist[n.id]}`).join('  ')
  ));
  return steps;
}

// ─── Shared controls ──────────────────────────────────────────────────────────
function Controls({ stepIdx, total, playing, onToggle, onPrev, onNext, onReset, speed, onSpeed, onShuffle, narrating, onNarrate }) {
  return (
    <div className="flex items-center gap-2 flex-wrap mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="flex items-center gap-1">
        {onShuffle && (
          <button onClick={onShuffle} title="Randomize" className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-all">
            <Shuffle size={14} />
          </button>
        )}
        <button onClick={onReset} title="Restart" className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-all">
          <RotateCcw size={14} />
        </button>
        <button onClick={onPrev} disabled={stepIdx === 0} className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-all disabled:opacity-25">
          <ChevronLeft size={14} />
        </button>
        <button onClick={onToggle}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all"
          style={playing
            ? { background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }
            : { background: 'rgba(99,102,241,0.2)',  border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc' }}>
          {playing ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Play</>}
        </button>
        <button onClick={onNext} disabled={stepIdx >= total - 1} className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-all disabled:opacity-25">
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="flex-1" />
      <span className="text-[11px] text-dark-600">{stepIdx + 1} / {total}</span>
      <button onClick={onNarrate} title={narrating ? 'Mute narration' : 'Read steps aloud'}
        className="p-2 rounded-lg transition-all"
        style={narrating
          ? { background: 'rgba(99,102,241,0.15)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)' }
          : { color: '#374151' }}>
        {narrating ? <Volume2 size={14} /> : <VolumeX size={14} />}
      </button>
      <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
        {Object.keys(SPEEDS).map(s => (
          <button key={s} onClick={() => onSpeed(s)}
            className="px-3 py-1 text-[11px] font-medium transition-all"
            style={{ background: speed === s ? 'rgba(99,102,241,0.2)' : 'transparent', color: speed === s ? '#a5b4fc' : '#6b7280' }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function SoundWaves() {
  return (
    <span className="flex items-end gap-px" style={{ height: 14 }}>
      {[0, 1, 2, 3, 4].map(i => (
        <motion.span key={i}
          className="block rounded-full"
          style={{ width: 3, background: '#818cf8', originY: 1 }}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.13, ease: 'easeInOut' }} />
      ))}
    </span>
  );
}

function TeacherBox({ text, narrating }) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="mt-3 flex items-start gap-3 px-4 py-3 rounded-xl"
      style={{ background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
    >
      <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg select-none"
        style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
        👨‍🏫
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#6366f1' }}>Instructor</span>
          {narrating && <SoundWaves />}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#c7d2fe' }}>
          {text || 'Press Play or use the arrow buttons to step through the algorithm.'}
        </p>
      </div>
    </motion.div>
  );
}

// ─── TTS narration helpers ────────────────────────────────────────────────────
function toSpeech(text) {
  if (!text) return '';
  return text
    .replace(/✓/g, '')
    .replace(/→/g, ' to ')
    .replace(/≤/g, ' is less than or equal to ')
    .replace(/≥/g, ' is greater than or equal to ')
    .replace(/−/g, ' minus ')
    .replace(/\.\./g, ' to ')
    .replace(/in-degree/g, 'in degree')
    .replace(/\[|\]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function pickVoice() {
  const vs = window.speechSynthesis.getVoices();
  return (
    vs.find(v => v.name === 'Google US English') ||
    vs.find(v => /Microsoft (Zira|David|Mark)/.test(v.name)) ||
    vs.find(v => v.lang === 'en-US' && !v.localService) ||
    vs.find(v => v.lang === 'en-US') ||
    vs.find(v => v.lang.startsWith('en')) ||
    null
  );
}

function usePlayer(steps, speed, narrate) {
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);
  const synthRef    = useRef(window.speechSynthesis);
  const voiceRef    = useRef(null);
  const audioRef    = useRef(null); // ElevenLabs Audio element

  function stopAll() {
    synthRef.current.cancel();
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
  }

  // Load best browser voice (fallback when no EL key)
  useEffect(() => {
    voiceRef.current = pickVoice();
    const onChanged = () => { voiceRef.current = pickVoice(); };
    synthRef.current.onvoiceschanged = onChanged;
    return () => { synthRef.current.onvoiceschanged = null; };
  }, []);

  useEffect(() => {
    setStepIdx(0); setPlaying(false); stopAll();
  }, [steps]); // eslint-disable-line react-hooks/exhaustive-deps

  // Interval-based advance (narration off)
  useEffect(() => {
    clearInterval(intervalRef.current);
    if (narrate || !playing) return;
    intervalRef.current = setInterval(() => {
      setStepIdx(prev => {
        if (prev >= steps.length - 1) { setPlaying(false); return prev; }
        return prev + 1;
      });
    }, SPEEDS[speed]);
    return () => clearInterval(intervalRef.current);
  }, [playing, steps.length, speed, narrate]);

  // Speech-gated advance (narration on) — re-runs on every step change
  useEffect(() => {
    stopAll();
    const text = steps[stepIdx]?.info;
    if (!narrate || !text) return;

    const clean = toSpeech(text);
    const ctrl  = new AbortController();

    function onFinish() {
      setStepIdx(prev => {
        if (prev >= steps.length - 1) { setPlaying(false); return prev; }
        return prev + 1;
      });
    }

    if (EL_KEY) {
      elSpeak(clean, ctrl.signal).then(audio => {
        if (ctrl.signal.aborted) { audio?.pause(); return; }
        if (!audio) { speakBrowser(clean, playing, onFinish, synthRef, voiceRef); return; }
        audioRef.current = audio;
        if (playing) audio.onended = onFinish;
      });
    } else {
      speakBrowser(clean, playing, onFinish, synthRef, voiceRef);
    }

    return () => { ctrl.abort(); stopAll(); };
  }, [narrate, playing, stepIdx, steps]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    stepIdx, playing,
    onToggle: () => setPlaying(v => !v),
    onPrev:   () => { setPlaying(false); stopAll(); setStepIdx(v => Math.max(0, v - 1)); },
    onNext:   () => { setPlaying(false); stopAll(); setStepIdx(v => Math.min(steps.length - 1, v + 1)); },
    onReset:  () => { setPlaying(false); stopAll(); setStepIdx(0); },
  };
}

function speakBrowser(text, playing, onFinish, synthRef, voiceRef) {
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.93; utt.pitch = 1.0;
  if (voiceRef.current) utt.voice = voiceRef.current;
  if (playing) utt.onend = onFinish;
  synthRef.current.speak(utt);
}

// ─── Sorting section ──────────────────────────────────────────────────────────
function SortingSection() {
  const [algo, setAlgo]     = useState('Bubble');
  const [arr,  setArr]      = useState(() => randArray());
  const [speed, setSpeed]   = useState('Normal');
  const [narrate, setNarrate] = useState(false);

  const steps = useMemo(() => SORT_GEN[algo](arr), [algo, arr]);
  const player = usePlayer(steps, speed, narrate);
  const step = steps[player.stepIdx] || { a: arr, hi: [], swap: false, done: new Set() };
  const maxVal = Math.max(...step.a, 1);

  function barColor(i) {
    if (step.done.has(i)) return BAR.done;
    if (step.hi2?.includes(i)) return BAR.range2;
    if (step.hi.includes(i)) return step.swap ? BAR.swapped : BAR.comparing;
    return BAR.default;
  }

  const isMerge = algo === 'Merge';
  const legend = isMerge
    ? [['Left half', BAR.comparing], ['Right half', BAR.range2], ['Placing', BAR.swapped], ['Sorted', BAR.done]]
    : [['Comparing', BAR.comparing], ['Swapping', BAR.swapped], ['Sorted', BAR.done], ['Unsorted', BAR.default]];

  return (
    <div>
      <div className="flex gap-2 mb-5 flex-wrap">
        {Object.keys(SORT_GEN).map(a => (
          <button key={a} onClick={() => setAlgo(a)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={algo === a
              ? { background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc' }
              : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280' }}>
            {a} Sort
          </button>
        ))}
      </div>
      <div className="rounded-2xl p-5" style={{ background: 'rgba(17,17,24,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-end gap-0.5 h-52 px-1">
          {step.a.map((val, i) => (
            <div key={i} className="flex-1 rounded-t-sm transition-all duration-150"
              style={{ height: `${(val / maxVal) * 100}%`, background: barColor(i), minWidth: 3 }}
              title={String(val)} />
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 text-[10px] text-dark-500 flex-wrap">
          {legend.map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: c }} />{l}</div>
          ))}
        </div>
        <TeacherBox text={step.info} narrating={narrate} />
        <Controls {...player} total={steps.length} speed={speed} onSpeed={setSpeed} onShuffle={() => setArr(randArray())} narrating={narrate} onNarrate={() => setNarrate(v => !v)} />
      </div>
      <AlgoInfo info={SORT_INFO[algo]} />
    </div>
  );
}

// ─── Tree section ─────────────────────────────────────────────────────────────
function TreeSection() {
  const [algo,   setAlgo]     = useState('Inorder');
  const [vals,   setVals]     = useState(DEFAULT_BST);
  const [speed,  setSpeed]    = useState('Normal');
  const [narrate, setNarrate] = useState(false);

  const { root, pos, edges, width, height } = useMemo(() => {
    const root = buildBST(vals);
    const layout = layoutBST(root);
    return { root, ...layout };
  }, [vals]);

  const steps = useMemo(() => treeSteps(root, algo, pos), [root, algo, pos]);
  const player = usePlayer(steps, speed, narrate);
  const step = steps[player.stepIdx] || { current: null, visited: [] };
  const visitedSet = new Set(step.visited || []);

  function nc(id) {
    if (step.current === id) return NODE.current;
    if (visitedSet.has(id))  return NODE.visited;
    return NODE.default;
  }

  return (
    <div>
      <div className="flex gap-2 mb-5 flex-wrap">
        {['Inorder', 'Preorder', 'Postorder', 'Level-order'].map(a => (
          <button key={a} onClick={() => setAlgo(a)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={algo === a
              ? { background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc' }
              : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280' }}>
            {a}
          </button>
        ))}
      </div>
      <div className="rounded-2xl p-5" style={{ background: 'rgba(17,17,24,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="overflow-x-auto">
          <svg width={Math.max(width, 380)} height={Math.max(height, 220)} className="mx-auto block">
            {edges.map(([f, t]) => {
              const fp = pos[f], tp = pos[t];
              return fp && tp ? <line key={`${f}-${t}`} x1={fp.x} y1={fp.y} x2={tp.x} y2={tp.y} stroke="#1e293b" strokeWidth={2} /> : null;
            })}
            {Object.entries(pos).map(([id, p]) => {
              const nid = Number(id), c = nc(nid);
              return (
                <g key={id}>
                  <circle cx={p.x} cy={p.y} r={21} fill={c.fill} stroke={c.stroke} strokeWidth={2.5} style={{ transition: 'fill 0.25s, stroke 0.25s' }} />
                  <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fill={c.text} fontSize={12} fontWeight="bold">{p.val}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex items-center gap-4 mt-2 text-[10px] text-dark-500">
          {[['Current', NODE.current.stroke], ['Visited', NODE.visited.stroke], ['Unvisited', NODE.default.stroke]].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full border-2" style={{ borderColor: c }} />{l}</div>
          ))}
        </div>
        <TeacherBox text={step.info} narrating={narrate} />
        <Controls {...player} total={steps.length} speed={speed} onSpeed={setSpeed} onShuffle={() => setVals(randBST())} narrating={narrate} onNarrate={() => setNarrate(v => !v)} />
      </div>
      <AlgoInfo info={TREE_INFO[algo]} />
    </div>
  );
}

// ─── Topological Sort graph data (directed acyclic graph) ────────────────────
const TOPO_NODES = [
  { id: 0, x: 220, y: 55  },
  { id: 1, x: 95,  y: 170 },
  { id: 2, x: 345, y: 170 },
  { id: 3, x: 55,  y: 290 },
  { id: 4, x: 220, y: 290 },
  { id: 5, x: 385, y: 290 },
  { id: 6, x: 220, y: 400 },
];
// Directed edges [from, to]
const TOPO_EDGES = [
  [0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,6],[4,6],[5,6],
];

// Returns the two adjusted endpoints for a directed edge (stops before circle boundary)
function tEdgePts(a, b) {
  const na = TOPO_NODES[a], nb = TOPO_NODES[b];
  const dx = nb.x - na.x, dy = nb.y - na.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return {
    x1: na.x + (dx / len) * 23,
    y1: na.y + (dy / len) * 23,
    x2: nb.x - (dx / len) * 27,
    y2: nb.y - (dy / len) * 27,
  };
}

function topoSteps() {
  const inDeg = {}, adj = {};
  TOPO_NODES.forEach(n => { inDeg[n.id] = 0; adj[n.id] = []; });
  TOPO_EDGES.forEach(([u, v]) => { adj[u].push(v); inDeg[v]++; });

  const processed = new Set(), inQueue = new Set(), order = [];
  const steps = [];

  function snap(current, activeEdge, info) {
    return { current, processed: new Set(processed), inQueue: new Set(inQueue), inDeg: { ...inDeg }, order: [...order], activeEdge, info };
  }

  // Init: enqueue all zero-in-degree nodes
  const queue = [];
  TOPO_NODES.forEach(n => { if (inDeg[n.id] === 0) { queue.push(n.id); inQueue.add(n.id); } });
  steps.push(snap(null, null,
    `Compute in-degrees. Nodes with in-degree 0: [${queue.join(', ')}] → enqueue them.`));

  while (queue.length) {
    const u = queue.shift();
    inQueue.delete(u);
    steps.push(snap(u, null,
      `Dequeue node ${u} → append to order.  Order so far: [${[...order, u].join(' → ')}]`));
    order.push(u);
    processed.add(u);

    for (const v of adj[u]) {
      steps.push(snap(u, [u, v],
        `Edge ${u}→${v}: in-degree[${v}]  ${inDeg[v]} − 1 = ${inDeg[v] - 1}`));
      inDeg[v]--;
      if (inDeg[v] === 0) {
        inQueue.add(v); queue.push(v);
        steps.push(snap(u, [u, v],
          `in-degree[${v}] reached 0 → enqueue ${v}.  Queue: [${queue.join(', ')}]`));
      }
    }
  }

  steps.push(snap(null, null,
    `✓ Topological order: ${order.join(' → ')}`));
  return steps;
}

// ─── Graph section ────────────────────────────────────────────────────────────
function GraphSection() {
  const [algo,  setAlgo]  = useState('BFS');
  const [start, setStart] = useState(0);
  const [speed, setSpeed]     = useState('Normal');
  const [narrate, setNarrate] = useState(false);

  const isDijkstra = algo === 'Dijkstra';
  const isTopo     = algo === 'Topo Sort';

  const steps = useMemo(() => {
    if (algo === 'BFS')       return graphBFS(start);
    if (algo === 'DFS')       return graphDFS(start);
    if (algo === 'Topo Sort') return topoSteps();
    return dijkstraSteps(start);
  }, [algo, start]);

  const player = usePlayer(steps, speed, narrate);
  const step = steps[player.stepIdx] || {};

  function nc(id) {
    if (isTopo) {
      if (step.current === id)        return NODE.current;
      if (step.processed?.has(id))    return NODE.visited;
      if (step.inQueue?.has(id))      return { fill: '#1e1b4b', stroke: '#818cf8', text: '#a5b4fc' };
      return NODE.default;
    }
    if (isDijkstra) {
      if (step.current === id)        return NODE.current;
      if (step.settled?.has(id))      return NODE.visited;
      return NODE.default;
    }
    if (step.current === id)          return NODE.current;
    if (step.visited?.has(id))        return NODE.visited;
    return NODE.default;
  }

  function bfsEdgeLit(a, b) {
    return step.edges?.has([Math.min(a, b), Math.max(a, b)].join('-'));
  }

  function djEdgeStyle(a, b) {
    const key = [Math.min(a, b), Math.max(a, b)].join('-');
    const ae  = step.activeEdge;
    if (ae && ((ae[0] === a && ae[1] === b) || (ae[0] === b && ae[1] === a)))
      return { stroke: '#fbbf24', width: 3 };
    if (step.treeEdges?.has(key)) return { stroke: '#34d399', width: 2.5 };
    return { stroke: '#1e293b', width: 2 };
  }

  function topoEdgeColor(u, v) {
    const ae = step.activeEdge;
    if (ae && ae[0] === u && ae[1] === v) return '#fbbf24';
    if (step.processed?.has(u))           return '#34d399';
    return '#1e293b';
  }

  const legends = {
    BFS:        [['Processing', NODE.current.stroke], ['Visited', NODE.visited.stroke], ['Tree edge', '#6366f1']],
    DFS:        [['Processing', NODE.current.stroke], ['Visited', NODE.visited.stroke], ['Tree edge', '#6366f1']],
    Dijkstra:   [['Settling', NODE.current.stroke], ['Settled', NODE.visited.stroke], ['Relaxing edge', '#fbbf24'], ['Shortest tree', '#34d399']],
    'Topo Sort':[['Dequeuing', NODE.current.stroke], ['In queue', '#818cf8'], ['Done', NODE.visited.stroke], ['Active edge', '#fbbf24']],
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {['BFS', 'DFS', 'Dijkstra', 'Topo Sort'].map(a => (
            <button key={a} onClick={() => setAlgo(a)}
              className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={algo === a
                ? { background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc' }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280' }}>
              {a}
            </button>
          ))}
        </div>
        {!isTopo && (
          <div className="flex items-center gap-2 text-xs text-dark-500">
            Start:
            {(isDijkstra ? DJ_NODES : G_NODES).map(n => (
              <button key={n.id} onClick={() => setStart(n.id)}
                className="w-6 h-6 rounded-full text-[10px] font-bold transition-all"
                style={start === n.id
                  ? { background: 'rgba(99,102,241,0.3)', border: '1px solid #818cf8', color: '#a5b4fc' }
                  : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#6b7280' }}>
                {n.id}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl p-5" style={{ background: 'rgba(17,17,24,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex justify-center overflow-x-auto">

          {isTopo ? (
            /* ── Topological Sort: directed graph with arrowheads + in-degree badges ── */
            <svg width={440} height={435}>
              <defs>
                {[['arr-d','#1e293b'],['arr-a','#fbbf24'],['arr-g','#34d399']].map(([id,fill]) => (
                  <marker key={id} id={id} markerWidth="10" markerHeight="7"
                    refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
                    <polygon points="0,0 10,3.5 0,7" fill={fill} />
                  </marker>
                ))}
              </defs>
              {TOPO_EDGES.map(([u, v]) => {
                const { x1,y1,x2,y2 } = tEdgePts(u, v);
                const col = topoEdgeColor(u, v);
                const markerId = col === '#fbbf24' ? 'arr-a' : col === '#34d399' ? 'arr-g' : 'arr-d';
                return (
                  <line key={`${u}-${v}`} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={col} strokeWidth={col !== '#1e293b' ? 2.5 : 1.5}
                    markerEnd={`url(#${markerId})`}
                    style={{ transition: 'stroke 0.3s' }} />
                );
              })}
              {TOPO_NODES.map(n => {
                const c  = nc(n.id);
                const id = step.inDeg?.[n.id] ?? 0;
                return (
                  <g key={n.id}>
                    {/* In-degree badge above node */}
                    <text x={n.x} y={n.y - 28} textAnchor="middle"
                      fill={id === 0 ? '#34d399' : '#64748b'} fontSize={10} fontWeight="bold">
                      in:{id}
                    </text>
                    <circle cx={n.x} cy={n.y} r={22} fill={c.fill} stroke={c.stroke} strokeWidth={2.5}
                      style={{ transition: 'fill 0.25s, stroke 0.25s' }} />
                    <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central"
                      fill={c.text} fontSize={13} fontWeight="bold">{n.id}</text>
                  </g>
                );
              })}
            </svg>
          ) : isDijkstra ? (
            /* ── Dijkstra: weighted undirected graph with distance badges ── */
            <svg width={440} height={420}>
              {DJ_EDGES.map(([a, b, w]) => {
                const na = DJ_NODES[a], nb = DJ_NODES[b];
                const { stroke, width } = djEdgeStyle(a, b);
                const mx = (na.x + nb.x) / 2, my = (na.y + nb.y) / 2;
                return (
                  <g key={`${a}-${b}`}>
                    <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                      stroke={stroke} strokeWidth={width} style={{ transition: 'stroke 0.3s' }} />
                    <rect x={mx-11} y={my-9} width={22} height={18} rx={4} fill="#0a0f1c" opacity={0.92} />
                    <text x={mx} y={my} textAnchor="middle" dominantBaseline="central"
                      fill="#94a3b8" fontSize={11} fontWeight="bold">{w}</text>
                  </g>
                );
              })}
              {DJ_NODES.map(n => {
                const c = nc(n.id);
                const d = step.dist?.[n.id];
                const dLabel = d === undefined ? '' : d === Infinity ? '∞' : String(d);
                return (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r={22} fill={c.fill} stroke={c.stroke} strokeWidth={2.5}
                      style={{ transition: 'fill 0.25s, stroke 0.25s' }} />
                    <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central"
                      fill={c.text} fontSize={13} fontWeight="bold">{n.id}</text>
                    <text x={n.x} y={n.y+34} textAnchor="middle"
                      fill={d === undefined || d === Infinity ? '#4b5563' : '#fbbf24'}
                      fontSize={11} fontWeight="bold">{dLabel}</text>
                  </g>
                );
              })}
            </svg>
          ) : (
            /* ── BFS / DFS: unweighted undirected graph ── */
            <svg width={440} height={400}>
              {G_EDGES.map(([a, b]) => {
                const na = G_NODES[a], nb = G_NODES[b], lit = bfsEdgeLit(a, b);
                return <line key={`${a}-${b}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke={lit ? '#6366f1' : '#1e293b'} strokeWidth={lit ? 3 : 2}
                  style={{ transition: 'stroke 0.3s' }} />;
              })}
              {G_NODES.map(n => {
                const c = nc(n.id);
                return (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r={22} fill={c.fill} stroke={c.stroke} strokeWidth={2.5}
                      style={{ transition: 'fill 0.25s, stroke 0.25s' }} />
                    <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central"
                      fill={c.text} fontSize={13} fontWeight="bold">{n.id}</text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        {/* Topological order result strip */}
        {isTopo && step.order?.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-dark-500 shrink-0">Order:</span>
            {step.order.map((id, i) => (
              <div key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-dark-600 text-xs">→</span>}
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                  style={{ background: '#064e3b', border: '1px solid #34d399', color: '#6ee7b7' }}>
                  {id}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2 text-[10px] text-dark-500 flex-wrap">
          {(legends[algo] || legends.BFS).map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: c }} />{l}
            </div>
          ))}
          {isDijkstra && <span style={{ color: '#fbbf24' }} className="ml-1 text-[10px]">Numbers = best distance</span>}
          {isTopo     && <span style={{ color: '#34d399' }} className="ml-1 text-[10px]">in:0 = ready to dequeue</span>}
        </div>

        <TeacherBox text={step.info} narrating={narrate} />
        <Controls {...player} total={steps.length} speed={speed} onSpeed={setSpeed} narrating={narrate} onNarrate={() => setNarrate(v => !v)} />
      </div>

      <AlgoInfo info={GRAPH_INFO[algo]} />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'sorting', label: 'Sorting',  icon: <BarChart2 size={14} /> },
  { id: 'trees',   label: 'Trees',    icon: <GitBranch size={14} /> },
  { id: 'graphs',  label: 'Graphs',   icon: <Share2 size={14} /> },
];

export default function VisualizerPage() {
  const [tab, setTab] = useState('sorting');

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#0a0f1c' }}>
      <div className="max-w-3xl mx-auto px-4 py-8 pb-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
          <h1 className="text-2xl font-black text-white mb-1">Algorithm Visualizer</h1>
          <p className="text-dark-400 text-sm">Step through sorting, tree traversal, and graph algorithms one move at a time.</p>
        </motion.div>

        <div className="flex gap-2 mb-6">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={tab === t.id
                ? { background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc' }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#6b7280' }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {tab === 'sorting' && <SortingSection />}
        {tab === 'trees'   && <TreeSection />}
        {tab === 'graphs'  && <GraphSection />}
      </div>
    </div>
  );
}
