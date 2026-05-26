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

// ── Email / OTP setup ────────────────────────────────────────────────────────
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL     = 'CppMaster <onboarding@resend.dev>'; // change to your domain once verified

// email → { otp, expiry, name }
const otpStore = new Map();

function makeOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function otpEmail(name, otp) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>CppMaster — Verify your email</title>
</head>
<body style="margin:0;padding:0;background:#06080f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#06080f;">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:480px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <div style="display:inline-block;width:60px;height:60px;border-radius:18px;background:linear-gradient(135deg,#4f46e5,#7c3aed);text-align:center;line-height:60px;font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-1px;">
                C+
              </div>
              <div style="margin-top:12px;font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">CppMaster</div>
              <div style="font-size:12px;color:#6366f1;margin-top:3px;letter-spacing:0.5px;">C++ &amp; DSA Learning Platform</div>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#0c0920;border-radius:20px;border:1px solid rgba(99,102,241,0.3);padding:40px 36px;">

              <p style="margin:0 0 6px;font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">Verify your email</p>
              <p style="margin:0 0 32px;font-size:14px;color:#64748b;line-height:1.6;">
                Hi <strong style="color:#a5b4fc;">${name}</strong>, welcome to CppMaster!<br/>
                Use the code below to complete your signup.
              </p>

              <!-- OTP box -->
              <div style="background:rgba(79,70,229,0.08);border:1px solid rgba(99,102,241,0.3);border-radius:16px;padding:32px 24px;text-align:center;margin-bottom:32px;">
                <div style="font-size:11px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:3px;margin-bottom:20px;">
                  Your verification code
                </div>
                <div style="display:inline-block;">
                  <table cellpadding="0" cellspacing="6" role="presentation" style="margin:0 auto;">
                    <tr>
                      ${otp.split('').map(d => `
                      <td style="background:rgba(99,102,241,0.18);border:1px solid rgba(99,102,241,0.4);border-radius:10px;width:50px;height:58px;text-align:center;vertical-align:middle;">
                        <span style="font-size:32px;font-weight:900;color:#ffffff;font-family:'Courier New',Courier,monospace;">${d}</span>
                      </td>`).join('')}
                    </tr>
                  </table>
                </div>
                <div style="font-size:12px;color:#475569;margin-top:20px;">
                  &#x23F0;&nbsp; Expires in <strong style="color:#94a3b8;">10 minutes</strong>
                </div>
              </div>

              <!-- Security note -->
              <div style="background:rgba(251,191,36,0.06);border:1px solid rgba(251,191,36,0.2);border-radius:12px;padding:14px 18px;margin-bottom:28px;">
                <p style="margin:0;font-size:12px;color:#92400e;line-height:1.6;">
                  <strong style="color:#fbbf24;">&#x26A0;&nbsp; Security tip:</strong>&nbsp;
                  CppMaster will never ask for this code via phone or chat.
                  If you didn't request this, ignore this email — your account is safe.
                </p>
              </div>

              <!-- Footer -->
              <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;text-align:center;">
                <p style="margin:0 0 6px;font-size:12px;color:#475569;">
                  Need help?&nbsp;
                  <a href="mailto:sharanrajithk@gmail.com" style="color:#818cf8;text-decoration:none;font-weight:600;">sharanrajithk@gmail.com</a>
                </p>
                <p style="margin:0;font-size:11px;color:#1e293b;">
                  &copy; 2026 CppMaster &middot; Secured with love &hearts;
                </p>
              </div>
            </td>
          </tr>

          <!-- Bottom tag -->
          <tr>
            <td align="center" style="padding-top:20px;">
              <p style="margin:0;font-size:11px;color:#1e293b;">
                You're receiving this because you signed up at CppMaster.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

app.post('/api/send-otp', async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) return res.status(400).json({ error: 'Missing email or name.' });

  const otp    = makeOtp();
  const expiry = Date.now() + 10 * 60 * 1000;
  otpStore.set(email.toLowerCase(), { otp, expiry, name });

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    FROM_EMAIL,
        to:      [email],
        subject: `${otp} is your CppMaster verification code`,
        html:    otpEmail(name, otp),
      }),
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.message || `Resend error ${r.status}`);
    }
    res.json({ success: true });
  } catch (err) {
    console.error('OTP mail error:', err.message);
    otpStore.delete(email.toLowerCase());
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Missing fields.' });

  const key    = email.toLowerCase();
  const stored = otpStore.get(key);
  if (!stored)                    return res.status(400).json({ error: 'No code found. Please request a new one.' });
  if (Date.now() > stored.expiry) { otpStore.delete(key); return res.status(400).json({ error: 'Code expired. Please request a new one.' }); }
  if (stored.otp !== otp)         return res.status(400).json({ error: 'Incorrect code. Please try again.' });

  otpStore.delete(key);
  res.json({ success: true });
});

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
