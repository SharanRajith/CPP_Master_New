import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ChevronRight, ChevronLeft, Shuffle, RotateCcw, BarChart2, GitBranch, Share2, BookOpen, Code2, Clock, Database } from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const SPEEDS = { Slow: 1800, Normal: 700, Fast: 200 };

const BAR = {
  default:   '#1e3a5f',
  comparing: '#fbbf24',
  swapped:   '#f87171',
  done:      '#34d399',
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
  },
  Selection: {
    summary: 'Divides the array into a sorted left region and an unsorted right region. Each pass scans the unsorted region to find its minimum, then moves that minimum to the end of the sorted region.',
    bullets: ['Always O(n²) — does not benefit from partially sorted input', 'Minimum number of swaps (at most n−1) — good when writes are expensive', 'Not stable — equal elements can be reordered'],
    time: 'O(n²)', best: 'O(n²)', space: 'O(1)',
    code: `void selectionSort(int arr[], int n) {
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
}`,
  },
  Insertion: {
    summary: 'Builds the sorted array one element at a time. Each new element is picked from the unsorted right portion and shifted leftward into its correct position within the already-sorted left portion — like sorting playing cards in your hand.',
    bullets: ['Adaptive — O(n) on nearly-sorted data', 'Stable — preserves the relative order of equal elements', 'Preferred for small arrays; used inside Timsort and Introsort'],
    time: 'O(n²)', best: 'O(n)', space: 'O(1)',
    code: `void insertionSort(int arr[], int n) {
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
}`,
  },
  Quick: {
    summary: 'Picks a pivot element and partitions the array so all elements ≤ pivot are left of it and all elements > pivot are right. Then recursively sorts both halves. The pivot is in its final sorted position after each partition call.',
    bullets: ['O(n log n) average — one of the fastest sorting algorithms in practice', 'O(n²) worst case when pivot is always the min/max (avoidable with random pivot)', 'In-place and cache-friendly — widely used in standard libraries'],
    time: 'O(n log n)', best: 'O(n log n)', space: 'O(log n)',
    code: `int partition(int arr[], int lo, int hi) {
    int pivot = arr[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot)
            swap(arr[++i], arr[j]);
    }
    swap(arr[i + 1], arr[hi]); // pivot in final position
    return i + 1;
}

void quickSort(int arr[], int lo, int hi) {
    if (lo >= hi) return;
    int pi = partition(arr, lo, hi);
    quickSort(arr, lo, pi - 1);
    quickSort(arr, pi + 1, hi);
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
        {[['explain', <BookOpen size={12} />, 'How it works'], ['code', <Code2 size={12} />, 'C++ Code']].map(([id, icon, label]) => (
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
            <code dangerouslySetInnerHTML={{ __html: highlight(info.code) }} />
          </pre>
        </div>
      )}
    </motion.div>
  );
}

// Minimal syntax highlighter — numbers run first so later span injections don't get re-matched
function highlight(code) {
  const keywords = ['void', 'int', 'bool', 'for', 'while', 'if', 'return', 'true', 'false', 'nullptr', 'struct', 'class', 'auto', 'break'];
  const types    = ['vector', 'queue', 'stack', 'deque', 'set', 'map', 'TreeNode', 'string'];
  // Escape HTML entities first
  let out = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Numbers before any HTML is injected — avoids matching digits inside style attributes
  out = out.replace(/\b(\d+)\b/g, '<span style="color:pink">$1</span>');
  // Comments, strings, keywords, types — all use named colors (no hex digits)
  out = out.replace(/\/\/.*/g, m => `<span style="color:slategray;font-style:italic">${m}</span>`);
  out = out.replace(/(".*?")/g, '<span style="color:lightgreen">$1</span>');
  keywords.forEach(k => {
    out = out.replace(new RegExp(`\\b(${k})\\b`, 'g'), '<span style="color:violet;font-weight:bold">$1</span>');
  });
  types.forEach(t => {
    out = out.replace(new RegExp(`\\b(${t})\\b`, 'g'), '<span style="color:cyan">$1</span>');
  });
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

const SORT_GEN = { 'Bubble': bubbleSteps, 'Selection': selectionSteps, 'Insertion': insertionSteps, 'Quick': quickSteps };

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

// ─── Shared controls ──────────────────────────────────────────────────────────
function Controls({ stepIdx, total, playing, onToggle, onPrev, onNext, onReset, speed, onSpeed, onShuffle }) {
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

function InfoBox({ text }) {
  return (
    <div className="mt-3 px-3 py-2 rounded-lg text-xs font-mono" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', color: '#a5b4fc', minHeight: 32 }}>
      {text || 'Press Play or use arrow buttons to step through.'}
    </div>
  );
}

function usePlayer(steps, speed) {
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);

  useEffect(() => { setStepIdx(0); setPlaying(false); }, [steps]);

  useEffect(() => {
    clearInterval(ref.current);
    if (!playing) return;
    ref.current = setInterval(() => {
      setStepIdx(prev => {
        if (prev >= steps.length - 1) { setPlaying(false); return prev; }
        return prev + 1;
      });
    }, SPEEDS[speed]);
    return () => clearInterval(ref.current);
  }, [playing, steps.length, speed]);

  return {
    stepIdx,
    playing,
    onToggle:  () => setPlaying(v => !v),
    onPrev:    () => { setPlaying(false); setStepIdx(v => Math.max(0, v - 1)); },
    onNext:    () => { setPlaying(false); setStepIdx(v => Math.min(steps.length - 1, v + 1)); },
    onReset:   () => { setPlaying(false); setStepIdx(0); },
  };
}

// ─── Sorting section ──────────────────────────────────────────────────────────
function SortingSection() {
  const [algo, setAlgo]   = useState('Bubble');
  const [arr,  setArr]    = useState(() => randArray());
  const [speed, setSpeed] = useState('Normal');

  const steps = useMemo(() => SORT_GEN[algo](arr), [algo, arr]);
  const player = usePlayer(steps, speed);
  const step = steps[player.stepIdx] || { a: arr, hi: [], swap: false, done: new Set() };
  const maxVal = Math.max(...step.a, 1);

  function barColor(i) {
    if (step.done.has(i)) return BAR.done;
    if (step.hi.includes(i)) return step.swap ? BAR.swapped : BAR.comparing;
    return BAR.default;
  }

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
        <div className="flex items-center gap-4 mt-3 text-[10px] text-dark-500">
          {[['Comparing', BAR.comparing], ['Swapping', BAR.swapped], ['Sorted', BAR.done], ['Unsorted', BAR.default]].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: c }} />{l}</div>
          ))}
        </div>
        <InfoBox text={step.info} />
        <Controls {...player} total={steps.length} speed={speed} onSpeed={setSpeed} onShuffle={() => setArr(randArray())} />
      </div>
      <AlgoInfo info={SORT_INFO[algo]} />
    </div>
  );
}

// ─── Tree section ─────────────────────────────────────────────────────────────
function TreeSection() {
  const [algo,   setAlgo]   = useState('Inorder');
  const [vals,   setVals]   = useState(DEFAULT_BST);
  const [speed,  setSpeed]  = useState('Normal');

  const { root, pos, edges, width, height } = useMemo(() => {
    const root = buildBST(vals);
    const layout = layoutBST(root);
    return { root, ...layout };
  }, [vals]);

  const steps = useMemo(() => treeSteps(root, algo, pos), [root, algo, pos]);
  const player = usePlayer(steps, speed);
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
        <InfoBox text={step.info} />
        <Controls {...player} total={steps.length} speed={speed} onSpeed={setSpeed} onShuffle={() => setVals(randBST())} />
      </div>
      <AlgoInfo info={TREE_INFO[algo]} />
    </div>
  );
}

// ─── Graph section ────────────────────────────────────────────────────────────
function GraphSection() {
  const [algo,  setAlgo]  = useState('BFS');
  const [start, setStart] = useState(0);
  const [speed, setSpeed] = useState('Normal');

  const steps = useMemo(() => algo === 'BFS' ? graphBFS(start) : graphDFS(start), [algo, start]);
  const player = usePlayer(steps, speed);
  const step = steps[player.stepIdx] || { current: null, visited: new Set(), edges: new Set() };

  function nc(id) {
    if (step.current === id)     return NODE.current;
    if (step.visited?.has(id))   return NODE.visited;
    return NODE.default;
  }
  function edgeHighlighted(a, b) {
    return step.edges?.has([Math.min(a, b), Math.max(a, b)].join('-'));
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        <div className="flex gap-2">
          {['BFS', 'DFS'].map(a => (
            <button key={a} onClick={() => setAlgo(a)}
              className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={algo === a
                ? { background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc' }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280' }}>
              {a}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-dark-500">
          Start node:
          {G_NODES.map(n => (
            <button key={n.id} onClick={() => setStart(n.id)}
              className="w-6 h-6 rounded-full text-[10px] font-bold transition-all"
              style={start === n.id
                ? { background: 'rgba(99,102,241,0.3)', border: '1px solid #818cf8', color: '#a5b4fc' }
                : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#6b7280' }}>
              {n.id}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-2xl p-5" style={{ background: 'rgba(17,17,24,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex justify-center overflow-x-auto">
          <svg width={440} height={400}>
            {G_EDGES.map(([a, b]) => {
              const na = G_NODES[a], nb = G_NODES[b], lit = edgeHighlighted(a, b);
              return <line key={`${a}-${b}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={lit ? '#6366f1' : '#1e293b'} strokeWidth={lit ? 3 : 2} style={{ transition: 'stroke 0.3s' }} />;
            })}
            {G_NODES.map(n => {
              const c = nc(n.id);
              return (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r={22} fill={c.fill} stroke={c.stroke} strokeWidth={2.5} style={{ transition: 'fill 0.25s, stroke 0.25s' }} />
                  <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central" fill={c.text} fontSize={13} fontWeight="bold">{n.id}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex items-center gap-4 mt-1 text-[10px] text-dark-500">
          {[['Current', NODE.current.stroke], ['Visited', NODE.visited.stroke], ['Traversed edge', '#6366f1']].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full border-2" style={{ borderColor: c }} />{l}</div>
          ))}
        </div>
        <InfoBox text={step.info} />
        <Controls {...player} total={steps.length} speed={speed} onSpeed={setSpeed} />
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
