// ─── useCompiler.js ───────────────────────────────────────────────────────────
// Hook wrapping compiler.js for React components

import { useState, useCallback, useEffect } from 'react';
import { compileCode, checkPistonAvailability } from '../utils/compiler';
import { runTestCases } from '../utils/testRunner';

export function useCompiler() {
  const [isCompiling, setIsCompiling]           = useState(false);
  const [compilerResult, setCompilerResult]     = useState(null);
  const [compilerStatus, setCompilerStatus]     = useState('checking'); // 'piston-local'|'piston'|'jdoodle'|'offline'|'checking'
  const [showSettings, setShowSettings]         = useState(false);

  // Check which compiler is available on mount
  useEffect(() => {
    // Try local first
    fetch('http://localhost:2000/api/v2/piston/runtimes', {
      signal: AbortSignal.timeout(2000),
    })
      .then(r => { if (r.ok) setCompilerStatus('piston-local'); else throw new Error(); })
      .catch(() => {
        checkPistonAvailability().then(ok => {
          setCompilerStatus(ok ? 'piston' : 'jdoodle');
        });
      });
  }, []);

  /** Run code and show raw output */
  const runCode = useCallback(async (code, stdin = '') => {
    setIsCompiling(true);
    setCompilerResult(null);
    try {
      const result = await compileCode(code, stdin);
      setCompilerStatus(result.compilerStatus);
      setCompilerResult({ type: 'run', ...result });
      if (result.needsCredentials) setShowSettings(true);
    } finally {
      setIsCompiling(false);
    }
  }, []);

  /** Run code against test cases */
  const runTests = useCallback(async (code, testCases) => {
    setIsCompiling(true);
    setCompilerResult(null);
    try {
      const result = await runTestCases(code, testCases);
      setCompilerStatus(result.compilerStatus);
      setCompilerResult({ type: 'tests', ...result });
    } finally {
      setIsCompiling(false);
    }
  }, []);

  return {
    isCompiling,
    compilerResult,
    compilerStatus,
    showSettings,
    setShowSettings,
    runCode,
    runTests,
  };
}
