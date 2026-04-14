// ─── testRunner.js ───────────────────────────────────────────────────────────
// Runs user code against hidden test cases using the Piston API

import { compileCode } from './compiler';

/**
 * Run test cases against user code.
 * @param {string} code - User's C++ code
 * @param {Array}  testCases - [{ input, expectedOutput, description }]
 * @returns {{ results, allPassed, compilerStatus }}
 */
export async function runTestCases(code, testCases) {
  const results = [];
  let compilerStatus = 'piston';

  for (const tc of testCases) {
    try {
      const result = await compileCode(code, tc.input || '');
      compilerStatus = result.compilerStatus;

      if (result.error && !result.output) {
        results.push({
          ...tc,
          passed: false,
          actualOutput: '',
          error: result.error,
          status: 'error',
        });
        continue;
      }

      const actual   = normalizeOutput(result.output);
      const expected = normalizeOutput(tc.expectedOutput);
      const passed   = actual === expected;

      results.push({
        ...tc,
        passed,
        actualOutput: result.output,
        error: result.error,
        status: passed ? 'pass' : 'fail',
      });
    } catch (err) {
      results.push({
        ...tc,
        passed: false,
        actualOutput: '',
        error: err.message,
        status: 'error',
      });
    }
  }

  const allPassed = results.length > 0 && results.every(r => r.passed);
  return { results, allPassed, compilerStatus };
}

/** Normalize output for comparison: trim whitespace, normalize line endings */
function normalizeOutput(str) {
  return (str || '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(l => l.trimEnd())
    .join('\n')
    .trim();
}
