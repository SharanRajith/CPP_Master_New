// ─── compiler.js ─────────────────────────────────────────────────────────────
// Priority: Local Piston (dev) → Public Piston → JDoodle (fallback)

// In dev mode (Vite sets MODE), hit local compile server first.
// In production (Vercel), fall through to public Piston API.
const LOCAL_PISTON_URL  = 'http://localhost:2000/api/v2/piston/execute';
const PUBLIC_PISTON_URL = 'https://cpp-master-backend-ha5y.onrender.com/api/v2/piston/execute';
const JDOODLE_URL       = '/api/jdoodle/v1/execute';

const IS_DEV = import.meta.env.DEV;

/** Retrieve JDoodle credentials from localStorage */
function getJDoodleCredentials() {
  return {
    clientId:     localStorage.getItem('jdoodle_client_id')     || '',
    clientSecret: localStorage.getItem('jdoodle_client_secret') || '',
  };
}

/** Core Piston request (works for both local + public) */
async function pistonRequest(url, code, stdin = '') {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language: 'cpp',
      version:  '*',           // local server accepts *, public needs '10.2.0'
      files:    [{ name: 'main.cpp', content: code }],
      stdin,
      compile_timeout: 15000,
      run_timeout:     5000,
    }),
  });

  if (!res.ok) throw new Error(`Piston HTTP ${res.status}`);

  const data         = await res.json();
  const compileError = data.compile?.stderr || '';
  const runError     = data.run?.stderr     || '';
  const output       = data.run?.stdout     || '';
  const exitCode     = data.run?.code       ?? -1;

  return { output, error: compileError || runError, exitCode, compileError, runError };
}

/** Compile with JDoodle API (last-resort fallback) */
async function compileWithJDoodle(code) {
  const { clientId, clientSecret } = getJDoodleCredentials();

  if (!clientId || !clientSecret) {
    return {
      output: '',
      error: 'JDoodle credentials not set. Please open Settings (⚙) and enter your JDoodle Client ID and Secret.',
      exitCode: -1,
      usedFallback: true,
      needsCredentials: true,
    };
  }

  const res = await fetch(JDOODLE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientId,
      clientSecret,
      script: code,
      language: 'cpp17',
      versionIndex: '0',
    }),
  });

  if (!res.ok) throw new Error(`JDoodle HTTP ${res.status}`);

  const data = await res.json();
  return {
    output:         data.output || '',
    error:          data.error  || '',
    exitCode:       data.statusCode === 200 ? 0 : 1,
    usedFallback:   true,
    needsCredentials: false,
  };
}

/**
 * Main compile function.
 * Priority: Local Piston (dev) → Public Piston → JDoodle
 */
export async function compileCode(code, stdin = '') {
  // ── 1. Try local server (only in dev mode) ───────────────────────────────
  if (IS_DEV) {
    try {
      const result = await pistonRequest(LOCAL_PISTON_URL, code, stdin);
      return { ...result, usedFallback: false, compilerStatus: 'piston-local' };
    } catch (localErr) {
      console.warn('[Compiler] Local Piston unavailable, trying public Piston…');
    }
  }

  // ── 2. Try public Piston ────────────────────────────────────────────────
  try {
    // public Piston needs explicit version
    const res = await fetch(PUBLIC_PISTON_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'cpp',
        version:  '10.2.0',
        files:    [{ name: 'main.cpp', content: code }],
        stdin,
        compile_timeout: 15000,
        run_timeout:     5000,
      }),
    });
    if (!res.ok) throw new Error(`Public Piston HTTP ${res.status}`);
    const data = await res.json();
    const result = {
      output:       data.run?.stdout     || '',
      error:        data.compile?.stderr || data.run?.stderr || '',
      exitCode:     data.run?.code       ?? -1,
      compileError: data.compile?.stderr || '',
      runError:     data.run?.stderr     || '',
    };
    return { ...result, usedFallback: false, compilerStatus: 'piston' };
  } catch (pistonErr) {
    console.warn('[Compiler] Public Piston failed, falling back to JDoodle…', pistonErr.message);
  }

  // ── 3. JDoodle fallback ────────────────────────────────────────────────
  try {
    const result = await compileWithJDoodle(code);
    return { ...result, compilerStatus: 'jdoodle' };
  } catch (jdoodleErr) {
    console.error('[Compiler] All backends failed:', jdoodleErr.message);
    return {
      output: '',
      error: 'All compilers unavailable. Make sure your local server is running (`npm run dev`).',
      exitCode: -1,
      usedFallback: true,
      compilerStatus: 'offline',
    };
  }
}

/**
 * Check which compiler is available.
 * Returns: 'piston-local' | 'piston' | 'jdoodle' | 'offline'
 */
export async function checkPistonAvailability() {
  // Check local first (dev only)
  if (IS_DEV) {
    try {
      const res = await fetch('http://localhost:2000/api/v2/piston/runtimes', {
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) return true; // returns true => status shows 'piston'
    } catch {}
  }

  // Check public Piston
  try {
    const res = await fetch('https://cpp-master-backend-ha5y.onrender.com/api/v2/piston/runtimes', {
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
