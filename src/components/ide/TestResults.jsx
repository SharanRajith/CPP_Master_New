import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestResults({ result, isCompiling }) {
  const [expandedTest, setExpandedTest] = React.useState(null);

  if (isCompiling) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-dark-300 gap-3">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Compiling...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-dark-300 gap-3 p-6 text-center">
        <Terminal size={40} className="opacity-30" />
        <p className="text-sm">Click <strong className="text-dark-200">Run Code</strong> to execute,<br />or <strong className="text-dark-200">Run Tests</strong> to check your solution.</p>
      </div>
    );
  }

  // Raw run output
  if (result.type === 'run') {
    return (
      <div className="p-4 flex flex-col gap-3 animate-fade-in">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-brand-400" />
          <span className="text-sm font-semibold text-white">Output</span>
          {result.exitCode === 0
            ? <span className="ml-auto text-xs text-success bg-green-900/20 px-2 py-0.5 rounded">Exit 0</span>
            : <span className="ml-auto text-xs text-danger bg-red-900/20 px-2 py-0.5 rounded">Exit {result.exitCode}</span>
          }
        </div>

        {result.error && (
          <div className="bg-red-950/40 border border-red-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={14} className="text-danger" />
              <span className="text-xs font-semibold text-danger">{result.compileError ? 'Compilation Error' : 'Runtime Error'}</span>
            </div>
            <pre className="text-xs text-red-300 whitespace-pre-wrap font-mono overflow-x-auto">{result.error}</pre>
          </div>
        )}

        {result.output ? (
          <div className="bg-dark-800 rounded-lg p-3 border border-dark-600">
            <pre className="text-sm text-green-300 whitespace-pre-wrap font-mono">{result.output}</pre>
          </div>
        ) : !result.error ? (
          <p className="text-sm text-dark-300">(No output)</p>
        ) : null}
      </div>
    );
  }

  // Test results
  if (result.type === 'tests') {
    const { results, allPassed } = result;
    const passed = results.filter(r => r.passed).length;

    return (
      <div className="p-4 flex flex-col gap-3 animate-fade-in">
        {/* Summary */}
        <div className={`rounded-lg p-3 flex items-center gap-3 ${
          allPassed
            ? 'bg-green-900/30 border border-green-700/50'
            : 'bg-red-900/20 border border-red-700/30'
        }`}>
          {allPassed
            ? <CheckCircle2 size={20} className="text-success shrink-0" />
            : <XCircle size={20} className="text-danger shrink-0" />
          }
          <div>
            <p className="font-semibold text-white text-sm">
              {allPassed ? '🎉 All Tests Passed!' : `${passed}/${results.length} Tests Passed`}
            </p>
            <p className="text-xs text-dark-300">
              {allPassed
                ? '+10 XP earned! Lesson complete.'
                : 'Fix your code and try again.'}
            </p>
          </div>
        </div>

        {/* Individual test cases */}
        <div className="flex flex-col gap-2">
          {results.map((tc, i) => (
            <div key={i} className={`rounded-lg border overflow-hidden ${
              tc.passed
                ? 'border-green-700/30 bg-green-900/10'
                : 'border-red-700/30 bg-red-900/10'
            }`}>
              <button
                onClick={() => setExpandedTest(expandedTest === i ? null : i)}
                className="w-full flex items-center gap-2 p-3 text-left hover:bg-white/5 transition-colors"
              >
                {tc.passed
                  ? <CheckCircle2 size={14} className="text-success shrink-0" />
                  : <XCircle size={14} className="text-danger shrink-0" />
                }
                <span className="text-sm font-medium text-white flex-1">{tc.description || `Test ${i+1}`}</span>
                {expandedTest === i ? <ChevronUp size={14} className="text-dark-300" /> : <ChevronDown size={14} className="text-dark-300" />}
              </button>

              <AnimatePresence>
                {expandedTest === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 space-y-2 text-xs font-mono">
                      {tc.input && (
                        <div>
                          <span className="text-dark-300">Input: </span>
                          <span className="text-brand-300">{tc.input}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-dark-300">Expected: </span>
                        <span className="text-success">{tc.expectedOutput}</span>
                      </div>
                      <div>
                        <span className="text-dark-300">Got: </span>
                        <span className={tc.passed ? 'text-success' : 'text-danger'}>
                          {tc.actualOutput || '(empty)'}
                        </span>
                      </div>
                      {tc.error && (
                        <div className="text-danger mt-1 whitespace-pre-wrap">{tc.error}</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
