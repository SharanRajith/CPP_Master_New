// ─── compile-server.js ───────────────────────────────────────────────────────
// Universal C++ compilation server.
// Runs locally via WSL on Windows, or natively on Linux (Render / Railway).

import express from 'express';
import cors    from 'cors';
import { exec } from 'child_process';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { existsSync }              from 'fs';
import { join }                    from 'path';
import { tmpdir, platform }        from 'os';
import { randomBytes }             from 'crypto';

const app  = express();
// Railway and Render automatically set the PORT environment variable
const PORT = process.env.PORT || 2000;
const isWindows = platform() === 'win32';

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// ── Temp directory for compile jobs ──────────────────────────────────────────
const JOB_DIR = join(tmpdir(), 'cpp-backend');
if (!existsSync(JOB_DIR)) {
  await mkdir(JOB_DIR, { recursive: true });
}

// ── Health / runtimes endpoint ───────────────────────────────────────────────
app.get('/api/v2/piston/runtimes', (req, res) => {
  res.json([
    {
      language:    'cpp',
      version:     '13.3.0',
      aliases:     ['c++', 'g++', 'cpp17', 'cpp20'],
      runtime:     'gcc',
    },
  ]);
});

// ── Execute endpoint ──────────────────────────────────────────────────────────
app.post('/api/v2/piston/execute', async (req, res) => {
  const { files = [], stdin = '', run_timeout = 5000 } = req.body;

  if (!files.length) {
    return res.status(400).json({ message: 'No files provided' });
  }

  const code    = files[0].content || '';
  const jobId   = randomBytes(8).toString('hex');
  const srcPath = join(JOB_DIR, `${jobId}.cpp`);
  const binPath = join(JOB_DIR, jobId);

  // If on Windows (local dev), we route through WSL. 
  // If on Linux (Render/Railway), we run natively.  
  const toCompilerPath = (p) => {
    if (isWindows) return p.replace(/\\/g, '/').replace(/^([A-Za-z]):/, (_, d) => `/mnt/${d.toLowerCase()}`);
    return p;
  };

  const compilerSrc = toCompilerPath(srcPath);
  const compilerBin = toCompilerPath(binPath);

  const compilerCmd = isWindows ? 'wsl g++' : 'g++';
  const executeCmd  = isWindows ? 'wsl ' : '';

  try {
    // 1. Write source file
    await writeFile(srcPath, code, 'utf8');

    // 2. Compile via g++
    const compileResult = await new Promise((resolve) => {
      exec(
        `${compilerCmd} -std=c++17 -O2 -o "${compilerBin}" "${compilerSrc}" 2>&1`,
        { timeout: 15000 },
        (err, stdout, stderr) => {
          resolve({ err, stdout: stdout || '', stderr: stderr || '' });
        }
      );
    });

    if (compileResult.err && compileResult.err.code !== 0) {
      // Compile failed
      return res.json({
        language: 'cpp',
        version: '13.3.0',
        compile: { stdout: '', stderr: compileResult.stdout, code: 1, signal: null },
        run:     { stdout: '', stderr: '',                   code: 1, signal: null },
      });
    }

    // 3. Run binary with optional stdin
    const stdinArg  = stdin ? `echo '${stdin.replace(/'/g, "'\\''")}' | ` : '';
    const runResult = await new Promise((resolve) => {
      exec(
        `${stdinArg}${executeCmd}"${compilerBin}"`,
        { timeout: run_timeout },
        (err, stdout, stderr) => {
          resolve({
            stdout: stdout || '',
            stderr: stderr || '',
            code:   err ? (err.code ?? 1) : 0,
          });
        }
      );
    });

    return res.json({
      language: 'cpp',
      version: '13.3.0',
      compile: { stdout: '', stderr: '', code: 0, signal: null },
      run: {
        stdout: runResult.stdout,
        stderr: runResult.stderr,
        code:   runResult.code,
        signal: null,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    // 4. Cleanup temp files securely
    try { await unlink(srcPath); } catch {}
    try { await unlink(binPath); } catch {}
  }
});

// Root ping for platform health checks
app.get('/', (req, res) => res.send('C++ Compiler Backend is Active!'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Universal C++ Compile Server running at http://0.0.0.0:${PORT}`);
  console.log(`   Environment: ${isWindows ? 'Windows (Routing to WSL)' : 'Linux (Native Runtime)'}`);
  console.log(`   Endpoint: POST /api/v2/piston/execute\n`);
});
