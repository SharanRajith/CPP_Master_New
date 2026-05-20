const LOCAL_PISTON_URL  = 'http://localhost:2000/api/v2/piston/execute';
const PUBLIC_PISTON_URL = 'https://cpp-master.onrender.com/api/v2/piston/execute';

const IS_DEV = import.meta.env.DEV;

async function pistonRequest(url, code, stdin = '') {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language: 'cpp',
      version:  '*',
      files:    [{ name: 'main.cpp', content: code }],
      stdin,
      compile_timeout: 15000,
      run_timeout:     5000,
    }),
  });

  if (!res.ok) throw new Error(`Piston HTTP ${res.status}`);

  const data = await res.json();
  return {
    output:       data.run?.stdout     || '',
    error:        data.compile?.stderr || data.run?.stderr || '',
    exitCode:     data.run?.code       ?? -1,
    compileError: data.compile?.stderr || '',
    runError:     data.run?.stderr     || '',
  };
}

export async function compileCode(code, stdin = '') {
  // 1. Local server (dev only)
  if (IS_DEV) {
    try {
      const result = await pistonRequest(LOCAL_PISTON_URL, code, stdin);
      return { ...result, usedFallback: false, compilerStatus: 'piston-local' };
    } catch {
      console.warn('[Compiler] Local server unavailable, trying Render…');
    }
  }

  // 2. Render backend
  try {
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
    if (!res.ok) throw new Error(`Render HTTP ${res.status}`);
    const data = await res.json();
    return {
      output:       data.run?.stdout     || '',
      error:        data.compile?.stderr || data.run?.stderr || '',
      exitCode:     data.run?.code       ?? -1,
      compileError: data.compile?.stderr || '',
      runError:     data.run?.stderr     || '',
      usedFallback: false,
      compilerStatus: 'piston',
    };
  } catch (err) {
    console.error('[Compiler] Render backend failed:', err.message);
    return {
      output:         '',
      error:          'Compiler unavailable. The backend may be starting up — try again in a moment.',
      exitCode:       -1,
      usedFallback:   false,
      compilerStatus: 'offline',
    };
  }
}

export async function checkPistonAvailability() {
  if (IS_DEV) {
    try {
      const res = await fetch('http://localhost:2000/api/v2/piston/runtimes', {
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) return 'piston-local';
    } catch {}
  }

  try {
    const res = await fetch('https://cpp-master.onrender.com/api/v2/piston/runtimes', {
      signal: AbortSignal.timeout(4000),
    });
    return res.ok ? 'piston' : 'offline';
  } catch {
    return 'offline';
  }
}

export async function warmUpBackend() {
  try {
    const res = await fetch('https://cpp-master.onrender.com/api/v2/piston/runtimes', {
      signal: AbortSignal.timeout(90000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
