import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Filter, Search } from 'lucide-react';

const COMPANY_META = {
  Google:    { color: '#4285F4', bg: 'rgba(66,133,244,0.12)',  border: 'rgba(66,133,244,0.3)'  },
  Meta:      { color: '#0668E1', bg: 'rgba(6,104,225,0.12)',   border: 'rgba(6,104,225,0.3)'   },
  Amazon:    { color: '#FF9900', bg: 'rgba(255,153,0,0.12)',   border: 'rgba(255,153,0,0.3)'   },
  Microsoft: { color: '#00A4EF', bg: 'rgba(0,164,239,0.12)',   border: 'rgba(0,164,239,0.3)'   },
  Apple:     { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)',  border: 'rgba(148,163,184,0.25)' },
};

const DIFF_COLOR = { Easy: '#34d399', Medium: '#f59e0b', Hard: '#f87171' };
const DIFF_BG    = { Easy: 'rgba(52,211,153,0.1)', Medium: 'rgba(245,158,11,0.1)', Hard: 'rgba(248,113,113,0.1)' };

const PROBLEMS = [
  { id: 'm13-l1',  title: 'LRU Cache',                        company: 'Google',    diff: 'Easy',   topic: 'Hash Map + Linked List', lessonId: 'm13-l1'  },
  { id: 'm13-l2',  title: 'Min Remove to Make Valid Parens',  company: 'Meta',      diff: 'Easy',   topic: 'Stack + String',         lessonId: 'm13-l2'  },
  { id: 'm13-l3',  title: 'Rotting Oranges',                  company: 'Amazon',    diff: 'Medium', topic: 'Multi-source BFS',       lessonId: 'm13-l3'  },
  { id: 'm13-l4',  title: 'Spiral Matrix',                    company: 'Microsoft', diff: 'Medium', topic: 'Matrix Simulation',      lessonId: 'm13-l4'  },
  { id: 'm13-l5',  title: 'Product of Array Except Self',     company: 'Apple',     diff: 'Medium', topic: 'Prefix / Suffix',        lessonId: 'm13-l5'  },
  { id: 'm13-l6',  title: 'Trapping Rain Water',              company: 'Google',    diff: 'Medium', topic: 'Two Pointers',           lessonId: 'm13-l6'  },
  { id: 'm13-l7',  title: 'Merge Intervals',                  company: 'Meta',      diff: 'Hard',   topic: 'Sorting + Greedy',       lessonId: 'm13-l7'  },
  { id: 'm13-l8',  title: 'Coin Change',                      company: 'Amazon',    diff: 'Hard',   topic: 'Dynamic Programming',    lessonId: 'm13-l8'  },
  { id: 'm13-l9',  title: 'Course Schedule',                  company: 'Microsoft', diff: 'Hard',   topic: 'Topological Sort',       lessonId: 'm13-l9'  },
  { id: 'm13-l10', title: 'Median of Two Sorted Arrays',      company: 'Google',    diff: 'Hard',   topic: 'Binary Search',          lessonId: 'm13-l10' },
  { id: 'm13-l11', title: 'Find All Anagrams in a String',    company: 'Meta',      diff: 'Hard',   topic: 'Sliding Window',         lessonId: 'm13-l11' },
  { id: 'm13-l12', title: 'Number of Islands',                company: 'Amazon',    diff: 'Hard',   topic: 'DFS / BFS',              lessonId: 'm13-l12' },
  { id: 'm13-l13', title: 'Word Break',                       company: 'Microsoft', diff: 'Hard',   topic: 'Dynamic Programming',    lessonId: 'm13-l13' },
  { id: 'm13-l14', title: 'Word Search',                      company: 'Google',    diff: 'Hard',   topic: 'Backtracking',           lessonId: 'm13-l14' },
  { id: 'm13-l15', title: '3Sum',                             company: 'Meta',      diff: 'Hard',   topic: 'Two Pointers',           lessonId: 'm13-l15' },
];

const COMPANIES = ['All', 'Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'];
const DIFFS     = ['All', 'Easy', 'Medium', 'Hard'];

export default function ProblemsPage({ progress }) {
  const navigate = useNavigate();
  const [company, setCompany] = useState('All');
  const [diff,    setDiff]    = useState('All');
  const [search,  setSearch]  = useState('');

  const filtered = PROBLEMS.filter(p =>
    (company === 'All' || p.company === company) &&
    (diff    === 'All' || p.diff    === diff) &&
    (search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.topic.toLowerCase().includes(search.toLowerCase()))
  );

  const solved = (id) => !!progress?.completedLessons?.[id];

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#0a0f1c' }}>
      <div className="max-w-4xl mx-auto px-4 py-8 pb-20">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-black text-white mb-1">Company Problem Sets</h1>
          <p className="text-dark-400 text-sm">FAANG-style problems tagged by company — sorted Easy to Hard.</p>
        </motion.div>

        {/* Company logos strip */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {COMPANIES.map(c => {
            const meta = COMPANY_META[c];
            const active = company === c;
            return (
              <button key={c} onClick={() => setCompany(c)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={active
                  ? { background: c === 'All' ? 'rgba(99,102,241,0.2)' : meta.bg, color: c === 'All' ? '#a5b4fc' : meta.color, border: `1px solid ${c === 'All' ? 'rgba(99,102,241,0.4)' : meta.border}` }
                  : { background: 'rgba(255,255,255,0.04)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.08)' }
                }>
                {c}
              </button>
            );
          })}
        </div>

        {/* Difficulty + Search row */}
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
          <div className="flex-1 min-w-[180px] relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search problems or topics…"
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs text-slate-300 outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#cbd5e1' }}
            />
          </div>
          <span className="text-xs text-dark-500">{filtered.length} problem{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Problem list */}
        <div className="flex flex-col gap-2">
          {filtered.map((p, i) => {
            const cm = COMPANY_META[p.company];
            const isSolved = solved(p.id);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => navigate(`/lesson/${p.lessonId}`)}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer group transition-all hover:scale-[1.005]"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Number */}
                <span className="text-xs text-dark-600 w-5 text-right shrink-0">{i + 1}</span>

                {/* Solved indicator */}
                <div className={`w-2 h-2 rounded-full shrink-0 ${isSolved ? 'bg-emerald-500' : 'bg-dark-700'}`} />

                {/* Title + topic */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">{p.title}</p>
                  <p className="text-xs text-dark-500 mt-0.5">{p.topic}</p>
                </div>

                {/* Company badge */}
                <span className="hidden sm:inline-flex shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: cm.bg, color: cm.color, border: `1px solid ${cm.border}` }}>
                  {p.company}
                </span>

                {/* Difficulty badge */}
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
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { label: 'Total',  value: PROBLEMS.length },
            { label: 'Solved', value: PROBLEMS.filter(p => solved(p.id)).length },
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
