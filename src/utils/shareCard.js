// Generates a 1200×630 shareable progress card (standard OG image size)
// Uses Canvas 2D API — no extra dependencies.

const W = 1200, H = 630;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function drawGradientText(ctx, text, x, y, size, from, to) {
  const g = ctx.createLinearGradient(x, y - size, x + text.length * size * 0.6, y);
  g.addColorStop(0, from);
  g.addColorStop(1, to);
  ctx.fillStyle = g;
  ctx.font = `900 ${size}px system-ui, -apple-system, sans-serif`;
  ctx.fillText(text, x, y);
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export async function downloadShareCard({ userName, photoURL, xp, level, levelTitle, streak, lessonsCompleted, totalLessons, modulesCompleted, totalModules }) {
  const canvas = document.createElement('canvas');
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // ── Background ──────────────────────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#08060f');
  bg.addColorStop(0.5, '#0c0a1e');
  bg.addColorStop(1, '#060810');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = 'rgba(99,102,241,0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // Left glow blob
  const blob1 = ctx.createRadialGradient(0, 0, 0, 0, 0, 500);
  blob1.addColorStop(0, 'rgba(79,70,229,0.25)');
  blob1.addColorStop(1, 'transparent');
  ctx.fillStyle = blob1;
  ctx.fillRect(0, 0, W, H);

  // Right glow blob
  const blob2 = ctx.createRadialGradient(W, H, 0, W, H, 450);
  blob2.addColorStop(0, 'rgba(124,58,237,0.18)');
  blob2.addColorStop(1, 'transparent');
  ctx.fillStyle = blob2;
  ctx.fillRect(0, 0, W, H);

  // Border
  ctx.strokeStyle = 'rgba(99,102,241,0.3)';
  ctx.lineWidth = 2;
  roundRect(ctx, 24, 24, W - 48, H - 48, 24);
  ctx.stroke();

  // ── CppMaster Logo (top-left) ────────────────────────────────────────────────
  const logoX = 60, logoY = 52;

  // Logo box
  const logoGrad = ctx.createLinearGradient(logoX, logoY, logoX + 52, logoY + 52);
  logoGrad.addColorStop(0, '#4f46e5');
  logoGrad.addColorStop(1, '#7c3aed');
  ctx.fillStyle = logoGrad;
  roundRect(ctx, logoX, logoY, 52, 52, 12);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 22px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('C+', logoX + 26, logoY + 34);

  // Brand name
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 26px system-ui, sans-serif';
  ctx.fillText('CppMaster', logoX + 64, logoY + 24);
  ctx.fillStyle = 'rgba(99,102,241,0.9)';
  ctx.font = '500 14px system-ui, sans-serif';
  ctx.fillText('C++ & DSA Learning Platform', logoX + 64, logoY + 44);

  // ── User avatar (right side, top) ────────────────────────────────────────────
  const avatarX = W - 120, avatarY = 78, avatarR = 44;

  let avatarImg = null;
  if (photoURL) avatarImg = await loadImage(photoURL);

  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
  ctx.clip();
  if (avatarImg) {
    ctx.drawImage(avatarImg, avatarX - avatarR, avatarY - avatarR, avatarR * 2, avatarR * 2);
  } else {
    const avGrad = ctx.createLinearGradient(avatarX - avatarR, avatarY - avatarR, avatarX + avatarR, avatarY + avatarR);
    avGrad.addColorStop(0, '#4f46e5');
    avGrad.addColorStop(1, '#7c3aed');
    ctx.fillStyle = avGrad;
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 32px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText((userName || 'U')[0].toUpperCase(), avatarX, avatarY + 11);
  }
  ctx.restore();

  // Avatar ring
  ctx.strokeStyle = 'rgba(99,102,241,0.6)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarR + 3, 0, Math.PI * 2);
  ctx.stroke();

  // ── Main headline ────────────────────────────────────────────────────────────
  const centerY = 230;
  ctx.textAlign = 'left';

  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.font = '500 18px system-ui, sans-serif';
  ctx.fillText("My C++ Journey", 60, centerY - 60);

  ctx.fillStyle = '#ffffff';
  ctx.font = `900 64px system-ui, sans-serif`;
  const displayName = userName?.split(' ')[0] || 'Coder';
  ctx.fillText(displayName, 60, centerY);

  // Level badge (right of name)
  const nameW = ctx.measureText(displayName).width;
  const badgeX = 60 + nameW + 20;
  const badgeW = 160, badgeH = 36;

  const badgeGrad = ctx.createLinearGradient(badgeX, centerY - 28, badgeX + badgeW, centerY);
  badgeGrad.addColorStop(0, '#f59e0b');
  badgeGrad.addColorStop(1, '#f97316');
  ctx.fillStyle = badgeGrad;
  roundRect(ctx, badgeX, centerY - 30, badgeW, badgeH, 8);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.font = '700 15px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`Lvl ${level} · ${levelTitle}`, badgeX + badgeW / 2, centerY - 8);

  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '400 18px system-ui, sans-serif';
  ctx.fillText('has been mastering C++ & DSA', 60, centerY + 34);

  // ── Stat cards (4 across) ────────────────────────────────────────────────────
  const statY  = 330;
  const statH  = 120;
  const statW  = 240;
  const statGap = 20;
  const statStartX = 60;

  const STATS = [
    { label: 'Total XP',       value: xp.toLocaleString(),               color: '#f59e0b', emoji: '⚡' },
    { label: 'Day Streak',     value: `${streak}d`,                      color: '#f97316', emoji: '🔥' },
    { label: 'Lessons Done',   value: `${lessonsCompleted}/${totalLessons}`, color: '#6366f1', emoji: '📚' },
    { label: 'Modules Done',   value: `${modulesCompleted}/${totalModules}`,  color: '#34d399', emoji: '🏆' },
  ];

  STATS.forEach((s, i) => {
    const sx = statStartX + i * (statW + statGap);

    // Card bg
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    roundRect(ctx, sx, statY, statW, statH, 16);
    ctx.fill();
    ctx.strokeStyle = `${s.color}40`;
    ctx.lineWidth = 1.5;
    roundRect(ctx, sx, statY, statW, statH, 16);
    ctx.stroke();

    // Top color bar
    ctx.fillStyle = s.color;
    roundRect(ctx, sx, statY, statW, 4, 2);
    ctx.fill();

    // Emoji
    ctx.font = '28px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(s.emoji, sx + 16, statY + 42);

    // Value
    ctx.fillStyle = '#ffffff';
    ctx.font = `900 28px system-ui, sans-serif`;
    ctx.fillText(s.value, sx + 16, statY + 82);

    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.font = '500 13px system-ui, sans-serif';
    ctx.fillText(s.label, sx + 16, statY + 104);
  });

  // ── Overall progress bar ─────────────────────────────────────────────────────
  const barY = statY + statH + 32;
  const barX = 60, barW = W - 120;
  const pct  = Math.min(lessonsCompleted / Math.max(totalLessons, 1), 1);

  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  roundRect(ctx, barX, barY, barW, 10, 5);
  ctx.fill();

  const fillGrad = ctx.createLinearGradient(barX, barY, barX + barW, barY);
  fillGrad.addColorStop(0, '#4f46e5');
  fillGrad.addColorStop(1, '#7c3aed');
  ctx.fillStyle = fillGrad;
  roundRect(ctx, barX, barY, Math.max(barW * pct, 12), 10, 5);
  ctx.fill();

  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = '500 13px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`${Math.round(pct * 100)}% complete`, barX + barW, barY - 8);
  ctx.textAlign = 'left';
  ctx.fillText('Overall Progress', barX, barY - 8);

  // ── Footer ───────────────────────────────────────────────────────────────────
  ctx.fillStyle = 'rgba(99,102,241,0.5)';
  ctx.fillRect(60, H - 56, W - 120, 1);

  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.font = '500 14px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('cpp-master-new.vercel.app', 60, H - 30);

  ctx.textAlign = 'right';
  ctx.fillText(`Generated ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, W - 60, H - 30);

  // ── Download ─────────────────────────────────────────────────────────────────
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = `cppmaster-progress-${userName?.replace(/\s+/g, '-').toLowerCase() || 'card'}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
}
