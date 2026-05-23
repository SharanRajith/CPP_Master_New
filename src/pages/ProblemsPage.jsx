import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Search, ArrowUpDown } from 'lucide-react';

const COMPANY_META = {
  Google:    { color: '#4285F4', bg: 'rgba(66,133,244,0.12)',  border: 'rgba(66,133,244,0.3)'  },
  Meta:      { color: '#0668E1', bg: 'rgba(6,104,225,0.12)',   border: 'rgba(6,104,225,0.3)'   },
  Amazon:    { color: '#FF9900', bg: 'rgba(255,153,0,0.12)',   border: 'rgba(255,153,0,0.3)'   },
  Microsoft: { color: '#00A4EF', bg: 'rgba(0,164,239,0.12)',   border: 'rgba(0,164,239,0.3)'   },
  Apple:     { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)',  border: 'rgba(148,163,184,0.25)' },
};

const DIFF_COLOR = { Easy: '#34d399', Medium: '#f59e0b', Hard: '#f87171' };
const DIFF_BG    = { Easy: 'rgba(52,211,153,0.1)', Medium: 'rgba(245,158,11,0.1)', Hard: 'rgba(248,113,113,0.1)' };
const DIFF_ORDER = { Easy: 0, Medium: 1, Hard: 2 };

const PROBLEMS = [
  // ── Arrays & Strings (Module 4) ── 8 problems ─────────────────────────────
  { id: 'arr-1',  title: 'Two Sum',                              company: 'Google',    diff: 'Easy',   topic: 'HashMap',             module: 'Arrays & Strings', lessonId: 'm4-l9'  },
  { id: 'arr-2',  title: 'Best Time to Buy and Sell Stock',      company: 'Amazon',    diff: 'Easy',   topic: 'Greedy',              module: 'Arrays & Strings', lessonId: 'm4-l10' },
  { id: 'arr-3',  title: 'Container With Most Water',            company: 'Google',    diff: 'Medium', topic: 'Two Pointers',        module: 'Arrays & Strings', lessonId: 'm4-l1'  },
  { id: 'arr-4',  title: 'Longest Substring Without Repeating',  company: 'Meta',      diff: 'Medium', topic: 'Sliding Window',      module: 'Arrays & Strings', lessonId: 'm4-l2'  },
  { id: 'arr-5',  title: 'Maximum Subarray',                     company: 'Amazon',    diff: 'Medium', topic: "Kadane's Algorithm",  module: 'Arrays & Strings', lessonId: 'm4-l5'  },
  { id: 'arr-6',  title: 'Subarray Sum Equals K',                company: 'Meta',      diff: 'Medium', topic: 'Prefix Sums',         module: 'Arrays & Strings', lessonId: 'm4-l3'  },
  { id: 'arr-7',  title: 'Search in Rotated Sorted Array',       company: 'Microsoft', diff: 'Medium', topic: 'Binary Search',       module: 'Arrays & Strings', lessonId: 'm4-l4'  },
  { id: 'arr-8',  title: 'Rotate Image (90°)',                   company: 'Google',    diff: 'Medium', topic: 'Matrix Simulation',   module: 'Arrays & Strings', lessonId: 'm4-l7'  },

  // ── Linked Lists (Module 5) ── 6 problems ──────────────────────────────────
  { id: 'll-1',   title: 'Reverse Linked List',                  company: 'Amazon',    diff: 'Easy',   topic: 'Linked List',          module: 'Linked Lists', lessonId: 'm5-l2'  },
  { id: 'll-2',   title: 'Detect Cycle in Linked List',          company: 'Google',    diff: 'Easy',   topic: 'Fast & Slow Pointers', module: 'Linked Lists', lessonId: 'm5-l3'  },
  { id: 'll-3',   title: 'Merge Two Sorted Lists',               company: 'Meta',      diff: 'Easy',   topic: 'Linked List',          module: 'Linked Lists', lessonId: 'm5-l4'  },
  { id: 'll-4',   title: 'Remove Nth Node From End',             company: 'Amazon',    diff: 'Medium', topic: 'Two Pointers',         module: 'Linked Lists', lessonId: 'm5-l5'  },
  { id: 'll-5',   title: 'Reorder List',                         company: 'Microsoft', diff: 'Medium', topic: 'Linked List',          module: 'Linked Lists', lessonId: 'm5-l8'  },
  { id: 'll-6',   title: 'Add Two Numbers',                      company: 'Meta',      diff: 'Medium', topic: 'Linked List',          module: 'Linked Lists', lessonId: 'm5-l10' },

  // ── Stacks & Queues (Module 6) ── 6 problems ───────────────────────────────
  { id: 'sq-1',   title: 'Valid Parentheses',                    company: 'Meta',      diff: 'Easy',   topic: 'Stack',               module: 'Stacks & Queues', lessonId: 'm6-l4'  },
  { id: 'sq-2',   title: 'Min Stack',                            company: 'Amazon',    diff: 'Easy',   topic: 'Stack',               module: 'Stacks & Queues', lessonId: 'm6-l7'  },
  { id: 'sq-3',   title: 'Next Greater Element',                 company: 'Google',    diff: 'Easy',   topic: 'Monotonic Stack',     module: 'Stacks & Queues', lessonId: 'm6-l5'  },
  { id: 'sq-4',   title: 'Daily Temperatures',                   company: 'Amazon',    diff: 'Medium', topic: 'Monotonic Stack',     module: 'Stacks & Queues', lessonId: 'm6-l10' },
  { id: 'sq-5',   title: 'Evaluate Reverse Polish Notation',     company: 'Amazon',    diff: 'Medium', topic: 'Stack',               module: 'Stacks & Queues', lessonId: 'm6-l11' },
  { id: 'sq-6',   title: 'Largest Rectangle in Histogram',       company: 'Google',    diff: 'Hard',   topic: 'Monotonic Stack',     module: 'Stacks & Queues', lessonId: 'm6-l9'  },

  // ── Trees (Module 7) ── 6 problems ─────────────────────────────────────────
  { id: 'tr-1',   title: 'Maximum Depth of Binary Tree',         company: 'Amazon',    diff: 'Easy',   topic: 'DFS / BFS',           module: 'Trees', lessonId: 'm7-l1'  },
  { id: 'tr-2',   title: 'Balanced Binary Tree',                 company: 'Google',    diff: 'Easy',   topic: 'Tree DFS',            module: 'Trees', lessonId: 'm7-l5'  },
  { id: 'tr-3',   title: 'Validate Binary Search Tree',          company: 'Microsoft', diff: 'Medium', topic: 'BST',                 module: 'Trees', lessonId: 'm7-l2'  },
  { id: 'tr-4',   title: 'Lowest Common Ancestor of BST',        company: 'Meta',      diff: 'Medium', topic: 'Tree DFS',            module: 'Trees', lessonId: 'm7-l4'  },
  { id: 'tr-5',   title: 'Implement Trie (Prefix Tree)',         company: 'Microsoft', diff: 'Medium', topic: 'Trie',                module: 'Trees', lessonId: 'm7-l7'  },
  { id: 'tr-6',   title: 'Serialize & Deserialize Binary Tree',  company: 'Google',    diff: 'Hard',   topic: 'Tree BFS',            module: 'Trees', lessonId: 'm7-l6'  },

  // ── Heaps (Module 8) ── 5 problems ─────────────────────────────────────────
  { id: 'hp-1',   title: 'Kth Largest Element in Array',         company: 'Amazon',    diff: 'Medium', topic: 'Min-Heap',            module: 'Heaps', lessonId: 'm8-l3'  },
  { id: 'hp-2',   title: 'Top K Frequent Elements',              company: 'Google',    diff: 'Medium', topic: 'Max-Heap / Bucket',   module: 'Heaps', lessonId: 'm8-l6'  },
  { id: 'hp-3',   title: 'Task Scheduler',                       company: 'Meta',      diff: 'Medium', topic: 'Greedy + Heap',       module: 'Heaps', lessonId: 'm8-l9'  },
  { id: 'hp-4',   title: 'Merge K Sorted Lists',                 company: 'Amazon',    diff: 'Hard',   topic: 'Min-Heap',            module: 'Heaps', lessonId: 'm8-l4'  },
  { id: 'hp-5',   title: 'Find Median from Data Stream',         company: 'Google',    diff: 'Hard',   topic: 'Two Heaps',           module: 'Heaps', lessonId: 'm8-l7'  },

  // ── Graphs (Module 9) ── 6 problems ────────────────────────────────────────
  { id: 'gr-1',   title: 'Clone Graph',                          company: 'Meta',      diff: 'Medium', topic: 'BFS',                 module: 'Graphs', lessonId: 'm9-l1'  },
  { id: 'gr-2',   title: 'Number of Islands',                    company: 'Amazon',    diff: 'Medium', topic: 'DFS / BFS',           module: 'Graphs', lessonId: 'm9-l11' },
  { id: 'gr-3',   title: 'Pacific Atlantic Water Flow',           company: 'Google',    diff: 'Medium', topic: 'Multi-source DFS',    module: 'Graphs', lessonId: 'm9-l2'  },
  { id: 'gr-4',   title: 'Network Delay Time',                   company: 'Amazon',    diff: 'Medium', topic: "Dijkstra's",          module: 'Graphs', lessonId: 'm9-l6'  },
  { id: 'gr-5',   title: 'Bipartite Graph Check',                company: 'Microsoft', diff: 'Medium', topic: 'BFS Coloring',        module: 'Graphs', lessonId: 'm9-l10' },
  { id: 'gr-6',   title: "Minimum Spanning Tree (Kruskal's)",    company: 'Google',    diff: 'Hard',   topic: 'MST / Union-Find',    module: 'Graphs', lessonId: 'm9-l8'  },

  // ── Dynamic Programming (Module 10) ── 6 problems ──────────────────────────
  { id: 'dp-1',   title: 'Climbing Stairs',                      company: 'Amazon',    diff: 'Easy',   topic: '1D DP',               module: 'Dynamic Programming', lessonId: 'm10-l2' },
  { id: 'dp-2',   title: 'House Robber',                         company: 'Google',    diff: 'Medium', topic: '1D DP',               module: 'Dynamic Programming', lessonId: 'm10-l3' },
  { id: 'dp-3',   title: 'Unique Paths',                         company: 'Microsoft', diff: 'Medium', topic: '2D DP',               module: 'Dynamic Programming', lessonId: 'm10-l4' },
  { id: 'dp-4',   title: 'Longest Common Subsequence',           company: 'Google',    diff: 'Medium', topic: '2D DP',               module: 'Dynamic Programming', lessonId: 'm10-l6' },
  { id: 'dp-5',   title: 'Longest Increasing Subsequence',       company: 'Microsoft', diff: 'Medium', topic: 'DP + Binary Search',  module: 'Dynamic Programming', lessonId: 'm10-l7' },
  { id: 'dp-6',   title: 'Partition Equal Subset Sum',           company: 'Amazon',    diff: 'Hard',   topic: '0/1 Knapsack',        module: 'Dynamic Programming', lessonId: 'm10-l5' },

  // ── Advanced Topics (Module 11) ── 4 problems ──────────────────────────────
  { id: 'adv-1',  title: 'Single Number (Bit Manipulation)',     company: 'Amazon',    diff: 'Easy',   topic: 'Bit XOR',             module: 'Advanced', lessonId: 'm11-l2' },
  { id: 'adv-2',  title: 'Merge Intervals',                      company: 'Meta',      diff: 'Medium', topic: 'Intervals + Sort',    module: 'Advanced', lessonId: 'm11-l4' },
  { id: 'adv-3',  title: 'Word Ladder',                          company: 'Google',    diff: 'Hard',   topic: 'BFS Shortest Path',   module: 'Advanced', lessonId: 'm11-l3' },
  { id: 'adv-4',  title: "Tarjan's Bridge Finding",              company: 'Google',    diff: 'Hard',   topic: 'DFS / SCC',           module: 'Advanced', lessonId: 'm11-l7' },

  // ── Interview Patterns (Module 12) ── 5 problems ────────────────────────────
  { id: 'ip-1',   title: 'Valid Palindrome',                     company: 'Meta',      diff: 'Easy',   topic: 'Two Pointers',        module: 'Interview Patterns', lessonId: 'm12-l1' },
  { id: 'ip-2',   title: 'Linked List Cycle II',                 company: 'Amazon',    diff: 'Medium', topic: 'Fast & Slow',         module: 'Interview Patterns', lessonId: 'm12-l2' },
  { id: 'ip-3',   title: 'Longest Repeating Char Replacement',   company: 'Google',    diff: 'Medium', topic: 'Sliding Window',      module: 'Interview Patterns', lessonId: 'm12-l3' },
  { id: 'ip-4',   title: 'Subarray Sum Equals K (Pattern)',      company: 'Meta',      diff: 'Medium', topic: 'Prefix Sum Map',      module: 'Interview Patterns', lessonId: 'm12-l4' },
  { id: 'ip-5',   title: 'Koko Eating Bananas',                  company: 'Amazon',    diff: 'Medium', topic: 'Binary Search',       module: 'Interview Patterns', lessonId: 'm12-l5' },

  // ── FAANG Bank (Module 13) ── 30 problems — sorted Easy → Medium → Hard ───
  // Easy (7)
  { id: 'fb-e1',  title: 'Two Sum',                              company: 'Google',    diff: 'Easy',   topic: 'HashMap',                module: 'FAANG Bank', lessonId: 'm4-l9'  },
  { id: 'fb-e2',  title: 'Valid Parentheses',                    company: 'Meta',      diff: 'Easy',   topic: 'Stack',                  module: 'FAANG Bank', lessonId: 'm6-l4'  },
  { id: 'fb-e3',  title: 'Reverse Linked List',                  company: 'Amazon',    diff: 'Easy',   topic: 'Linked List',            module: 'FAANG Bank', lessonId: 'm5-l2'  },
  { id: 'fb-e4',  title: 'Best Time to Buy and Sell Stock',      company: 'Amazon',    diff: 'Easy',   topic: 'Greedy / Sliding Window', module: 'FAANG Bank', lessonId: 'm4-l10' },
  { id: 'fb-e5',  title: 'Maximum Depth of Binary Tree',         company: 'Amazon',    diff: 'Easy',   topic: 'Tree DFS',               module: 'FAANG Bank', lessonId: 'm7-l1'  },
  { id: 'fb-e6',  title: 'LRU Cache',                            company: 'Google',    diff: 'Easy',   topic: 'Hash Map + Linked List', module: 'FAANG Bank', lessonId: 'm13-l1' },
  { id: 'fb-e7',  title: 'Min Remove to Make Valid Parens',      company: 'Meta',      diff: 'Easy',   topic: 'Stack + String',         module: 'FAANG Bank', lessonId: 'm13-l2' },
  // Medium (15)
  { id: 'fb-m1',  title: 'Group Anagrams',                       company: 'Google',    diff: 'Medium', topic: 'HashMap + Sorting',      module: 'FAANG Bank', lessonId: 'm4-l9'  },
  { id: 'fb-m2',  title: 'Container With Most Water',            company: 'Google',    diff: 'Medium', topic: 'Two Pointers',           module: 'FAANG Bank', lessonId: 'm4-l1'  },
  { id: 'fb-m3',  title: 'Maximum Subarray',                     company: 'Amazon',    diff: 'Medium', topic: "Kadane's Algorithm",     module: 'FAANG Bank', lessonId: 'm4-l5'  },
  { id: 'fb-m4',  title: 'Longest Palindromic Substring',        company: 'Amazon',    diff: 'Medium', topic: 'DP / Expand Around Center', module: 'FAANG Bank', lessonId: 'm10-l8' },
  { id: 'fb-m5',  title: 'House Robber',                         company: 'Google',    diff: 'Medium', topic: '1D DP',                  module: 'FAANG Bank', lessonId: 'm10-l3' },
  { id: 'fb-m6',  title: 'Validate Binary Search Tree',          company: 'Microsoft', diff: 'Medium', topic: 'BST Inorder',            module: 'FAANG Bank', lessonId: 'm7-l2'  },
  { id: 'fb-m7',  title: 'Top K Frequent Elements',              company: 'Google',    diff: 'Medium', topic: 'Heap / Bucket Sort',     module: 'FAANG Bank', lessonId: 'm8-l6'  },
  { id: 'fb-m8',  title: 'Binary Tree Level Order Traversal',    company: 'Amazon',    diff: 'Medium', topic: 'BFS',                    module: 'FAANG Bank', lessonId: 'm7-l1'  },
  { id: 'fb-m9',  title: 'Number of Islands',                    company: 'Amazon',    diff: 'Medium', topic: 'DFS / BFS',              module: 'FAANG Bank', lessonId: 'm9-l11' },
  { id: 'fb-m10', title: 'Find All Anagrams in a String',        company: 'Meta',      diff: 'Medium', topic: 'Sliding Window',         module: 'FAANG Bank', lessonId: 'm13-l11' },
  { id: 'fb-m11', title: '3Sum',                                 company: 'Meta',      diff: 'Medium', topic: 'Two Pointers',           module: 'FAANG Bank', lessonId: 'm13-l15' },
  { id: 'fb-m12', title: 'Rotting Oranges',                      company: 'Amazon',    diff: 'Medium', topic: 'Multi-source BFS',       module: 'FAANG Bank', lessonId: 'm13-l3'  },
  { id: 'fb-m13', title: 'Spiral Matrix',                        company: 'Microsoft', diff: 'Medium', topic: 'Matrix Simulation',      module: 'FAANG Bank', lessonId: 'm13-l4'  },
  { id: 'fb-m14', title: 'Product of Array Except Self',         company: 'Apple',     diff: 'Medium', topic: 'Prefix / Suffix',        module: 'FAANG Bank', lessonId: 'm13-l5'  },
  { id: 'fb-m15', title: 'Trapping Rain Water',                  company: 'Google',    diff: 'Medium', topic: 'Two Pointers',           module: 'FAANG Bank', lessonId: 'm13-l6'  },
  // Hard (8)
  { id: 'fb-h1',  title: 'Minimum Window Substring',             company: 'Meta',      diff: 'Hard',   topic: 'Sliding Window',         module: 'FAANG Bank', lessonId: 'm4-l2'  },
  { id: 'fb-h2',  title: 'Merge K Sorted Lists',                 company: 'Amazon',    diff: 'Hard',   topic: 'Min-Heap',               module: 'FAANG Bank', lessonId: 'm8-l4'  },
  { id: 'fb-h3',  title: 'Find Median from Data Stream',         company: 'Google',    diff: 'Hard',   topic: 'Two Heaps',              module: 'FAANG Bank', lessonId: 'm8-l7'  },
  { id: 'fb-h4',  title: 'Longest Consecutive Sequence',         company: 'Amazon',    diff: 'Hard',   topic: 'HashSet',                module: 'FAANG Bank', lessonId: 'm4-l9'  },
  { id: 'fb-h5',  title: 'Coin Change',                          company: 'Amazon',    diff: 'Hard',   topic: 'Dynamic Programming',    module: 'FAANG Bank', lessonId: 'm13-l8'  },
  { id: 'fb-h6',  title: 'Course Schedule',                      company: 'Microsoft', diff: 'Hard',   topic: 'Topological Sort',       module: 'FAANG Bank', lessonId: 'm13-l9'  },
  { id: 'fb-h7',  title: 'Median of Two Sorted Arrays',          company: 'Google',    diff: 'Hard',   topic: 'Binary Search',          module: 'FAANG Bank', lessonId: 'm13-l10' },
  { id: 'fb-h8',  title: 'Word Break',                           company: 'Microsoft', diff: 'Hard',   topic: 'Dynamic Programming',    module: 'FAANG Bank', lessonId: 'm13-l13' },
  { id: 'fb-h9',  title: 'Word Search',                          company: 'Google',    diff: 'Hard',   topic: 'Backtracking',           module: 'FAANG Bank', lessonId: 'm13-l14' },
  { id: 'fb-h10', title: 'Merge Intervals',                      company: 'Meta',      diff: 'Hard',   topic: 'Sorting + Greedy',       module: 'FAANG Bank', lessonId: 'm13-l7'  },
];

const MODULES   = ['All', 'Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees', 'Heaps', 'Graphs', 'Dynamic Programming', 'Advanced', 'Interview Patterns', 'FAANG Bank'];
const COMPANIES = ['All', 'Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'];
const DIFFS     = ['All', 'Easy', 'Medium', 'Hard'];

export default function ProblemsPage({ progress }) {
  const navigate = useNavigate();
  const [mod,       setMod]       = useState('All');
  const [company,   setCompany]   = useState('All');
  const [diff,      setDiff]      = useState('All');
  const [search,    setSearch]    = useState('');
  const [sortByDiff, setSortByDiff] = useState(false);

  let filtered = PROBLEMS.filter(p =>
    (mod     === 'All' || p.module  === mod) &&
    (company === 'All' || p.company === company) &&
    (diff    === 'All' || p.diff    === diff) &&
    (search  === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.topic.toLowerCase().includes(search.toLowerCase()))
  );

  if (sortByDiff) {
    filtered = [...filtered].sort((a, b) => DIFF_ORDER[a.diff] - DIFF_ORDER[b.diff]);
  }

  const solved = (id) => !!progress?.completedLessons?.[id];

  // counts per difficulty in current view
  const easyCt   = filtered.filter(p => p.diff === 'Easy').length;
  const mediumCt = filtered.filter(p => p.diff === 'Medium').length;
  const hardCt   = filtered.filter(p => p.diff === 'Hard').length;

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#0a0f1c' }}>
      <div className="max-w-4xl mx-auto px-4 py-8 pb-20">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl font-black text-white mb-1">Problem Sets</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-dark-400 text-sm">{PROBLEMS.length} problems across {MODULES.length - 1} modules</p>
            <div className="flex items-center gap-2 text-xs">
              <span style={{ color: DIFF_COLOR.Easy }}>● {PROBLEMS.filter(p => p.diff === 'Easy').length} Easy</span>
              <span style={{ color: DIFF_COLOR.Medium }}>● {PROBLEMS.filter(p => p.diff === 'Medium').length} Medium</span>
              <span style={{ color: DIFF_COLOR.Hard }}>● {PROBLEMS.filter(p => p.diff === 'Hard').length} Hard</span>
            </div>
          </div>
        </motion.div>

        {/* Module filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {MODULES.map(m => (
            <button key={m} onClick={() => setMod(m)}
              className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={mod === m
                ? { background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.4)' }
                : { background: 'rgba(255,255,255,0.04)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.08)' }
              }>
              {m}
            </button>
          ))}
        </div>

        {/* Company strip */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {COMPANIES.map(c => {
            const meta   = COMPANY_META[c];
            const active = company === c;
            return (
              <button key={c} onClick={() => setCompany(c)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={active
                  ? { background: c === 'All' ? 'rgba(99,102,241,0.2)' : meta.bg, color: c === 'All' ? '#a5b4fc' : meta.color, border: `1px solid ${c === 'All' ? 'rgba(99,102,241,0.4)' : meta.border}` }
                  : { background: 'rgba(255,255,255,0.04)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.08)' }
                }>
                {c}
              </button>
            );
          })}
        </div>

        {/* Difficulty + Search + Sort */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="flex gap-2">
            {DIFFS.map(d => (
              <button key={d} onClick={() => setDiff(d)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={diff === d
                  ? { background: d === 'All' ? 'rgba(99,102,241,0.15)' : DIFF_BG[d], color: d === 'All' ? '#a5b4fc' : DIFF_COLOR[d], border: `1px solid ${d === 'All' ? 'rgba(99,102,241,0.3)' : DIFF_COLOR[d] + '40'}` }
                  : { background: 'rgba(255,255,255,0.04)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.08)' }
                }>
                {d}
              </button>
            ))}
          </div>

          <div className="flex-1 min-w-[150px] relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search problems or topics…"
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#cbd5e1' }}
            />
          </div>

          <button
            onClick={() => setSortByDiff(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0"
            style={sortByDiff
              ? { background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.4)' }
              : { background: 'rgba(255,255,255,0.04)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.08)' }
            }
            title="Sort by difficulty"
          >
            <ArrowUpDown size={12} /> Sort
          </button>

          <span className="text-xs text-dark-500 shrink-0">{filtered.length} shown</span>
        </div>

        {/* Difficulty summary bar for current filter */}
        {filtered.length > 0 && (
          <div className="flex gap-3 mb-4 text-xs">
            {easyCt   > 0 && <span className="flex items-center gap-1 font-semibold" style={{ color: DIFF_COLOR.Easy   }}>● {easyCt} Easy</span>}
            {mediumCt > 0 && <span className="flex items-center gap-1 font-semibold" style={{ color: DIFF_COLOR.Medium }}>● {mediumCt} Medium</span>}
            {hardCt   > 0 && <span className="flex items-center gap-1 font-semibold" style={{ color: DIFF_COLOR.Hard   }}>● {hardCt} Hard</span>}
          </div>
        )}

        {/* Problem list */}
        <div className="flex flex-col gap-2">
          {filtered.map((p, i) => {
            const cm       = COMPANY_META[p.company];
            const isSolved = solved(p.lessonId);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.015, 0.3) }}
                onClick={() => navigate(`/lesson/${p.lessonId}`)}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer group transition-all hover:scale-[1.005]"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-xs text-dark-600 w-5 text-right shrink-0">{i + 1}</span>
                <div className={`w-2 h-2 rounded-full shrink-0 ${isSolved ? 'bg-emerald-500' : 'bg-dark-700'}`} />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">{p.title}</p>
                  <p className="text-xs text-dark-500 mt-0.5">{p.topic}</p>
                </div>

                <span className="hidden md:inline-flex shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}>
                  {p.module}
                </span>

                <span className="hidden sm:inline-flex shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: cm.bg, color: cm.color, border: `1px solid ${cm.border}` }}>
                  {p.company}
                </span>

                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: DIFF_BG[p.diff], color: DIFF_COLOR[p.diff], border: `1px solid ${DIFF_COLOR[p.diff]}30` }}>
                  {p.diff}
                </span>

                <ExternalLink size={13} className="text-dark-600 group-hover:text-indigo-400 transition-colors shrink-0" />
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-dark-500 text-sm">No problems match your filters.</div>
          )}
        </div>

        {/* Stats row */}
        <div className="mt-8 grid grid-cols-4 gap-3">
          {[
            { label: 'Total',     value: PROBLEMS.length },
            { label: 'Solved',    value: PROBLEMS.filter(p => solved(p.lessonId)).length },
            { label: 'Modules',   value: MODULES.length - 1 },
            { label: 'Companies', value: 5 },
          ].map((s, i) => (
            <div key={i} className="rounded-xl py-4 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xl font-black text-white">{s.value}</p>
              <p className="text-xs text-dark-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
