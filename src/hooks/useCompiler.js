// ─── useCompiler.js ───────────────────────────────────────────────────────────
// Hook wrapping compiler.js for React components

import { useState, useCallback, useEffect } from 'react';
import { compileCode, checkPistonAvailability, warmUpBackend } from '../utils/compiler';
import { runTestCases } from '../utils/testRunner';

export function useCompiler() {
  const [isCompiling, setIsCompiling]           = useState(false);
  const [compilerResult, setCompilerResult]     = useState(null);
  const [compilerStatus, setCompilerStatus]     = useState('checking'); // 'piston-local'|'piston'|'jdoodle'|'offline'|'checking'
  const [showSettings, setShowSettings]         = useState(false);

  // Check which compiler is available on mount; warm up Render if sleeping
  useEffect(() => {
    checkPistonAvailability().then(status => {
      if (status === 'piston-local' || status === 'piston') {
        setCompilerStatus(status);
      } else {
        setCompilerStatus('warming');
        warmUpBackend().then(awake => setCompilerStatus(awake ? 'piston' : 'offline'));
      }
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
