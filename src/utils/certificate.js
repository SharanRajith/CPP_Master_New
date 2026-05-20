export function downloadCertificate(userName, totalLessons, dateStr) {
  const W = 1400, H = 900;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#08080f');
  bg.addColorStop(0.5, '#0d0d1a');
  bg.addColorStop(1, '#09090e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle grid pattern
  ctx.strokeStyle = 'rgba(99,102,241,0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // Outer glow border
  ctx.shadowColor = '#6366f1';
  ctx.shadowBlur = 25;
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 3;
  roundRect(ctx, 35, 35, W - 70, H - 70, 16);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Inner border
  ctx.strokeStyle = 'rgba(99,102,241,0.25)';
  ctx.lineWidth = 1;
  roundRect(ctx, 52, 52, W - 104, H - 104, 10);
  ctx.stroke();

  // Corner ornaments
  const ornamentColor = '#6366f1';
  drawCornerOrnament(ctx, 70, 70, ornamentColor);
  drawCornerOrnament(ctx, W - 70, 70, ornamentColor, true);
  drawCornerOrnament(ctx, 70, H - 70, ornamentColor, false, true);
  drawCornerOrnament(ctx, W - 70, H - 70, ornamentColor, true, true);

  // Logo badge circle
  const cx = W / 2;
  const logoGrad = ctx.createRadialGradient(cx, 175, 0, cx, 175, 58);
  logoGrad.addColorStop(0, '#818cf8');
  logoGrad.addColorStop(1, '#4338ca');
  ctx.fillStyle = logoGrad;
  ctx.shadowColor = '#6366f1';
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(cx, 175, 58, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 38px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('C+', cx, 176);

  // Stars around logo
  drawStars(ctx, cx, 175, 80, 6, '#6366f150');

  // "CERTIFICATE OF COMPLETION"
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#a5b4fc';
  ctx.font = '900 20px Arial, sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('CERTIFICATE OF COMPLETION', cx, 285);
  ctx.letterSpacing = '0px';

  // Divider line with dots
  const lineY = 308;
  ctx.strokeStyle = 'rgba(99,102,241,0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx - 280, lineY); ctx.lineTo(cx - 20, lineY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx + 20, lineY); ctx.lineTo(cx + 280, lineY); ctx.stroke();
  ctx.fillStyle = '#6366f1';
  ctx.beginPath(); ctx.arc(cx, lineY, 4, 0, Math.PI * 2); ctx.fill();

  // "This is to certify that"
  ctx.fillStyle = '#6b7280';
  ctx.font = 'italic 22px Georgia, serif';
  ctx.fillText('This is to certify that', cx, 365);

  // Name
  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 68px Georgia, serif';
  ctx.fillText(userName, cx, 460);

  // Name underline
  const nameW = ctx.measureText(userName).width;
  const uGrad = ctx.createLinearGradient(cx - nameW / 2, 0, cx + nameW / 2, 0);
  uGrad.addColorStop(0, 'transparent');
  uGrad.addColorStop(0.3, '#6366f1');
  uGrad.addColorStop(0.7, '#6366f1');
  uGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = uGrad;
  ctx.fillRect(cx - nameW / 2, 472, nameW, 2);

  // "has successfully mastered"
  ctx.fillStyle = '#9ca3af';
  ctx.font = '23px Georgia, serif';
  ctx.fillText('has successfully mastered', cx, 530);

  // Course title
  const titleGrad = ctx.createLinearGradient(cx - 300, 0, cx + 300, 0);
  titleGrad.addColorStop(0, '#818cf8');
  titleGrad.addColorStop(0.5, '#a5b4fc');
  titleGrad.addColorStop(1, '#818cf8');
  ctx.fillStyle = titleGrad;
  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.fillText('C++ Data Structures & Algorithms', cx, 586);

  ctx.fillStyle = '#6b7280';
  ctx.font = '20px Arial, sans-serif';
  ctx.fillText(`completing all ${totalLessons} lessons in the CppMaster curriculum`, cx, 630);

  // Bottom divider
  ctx.strokeStyle = 'rgba(99,102,241,0.2)';
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 6]);
  ctx.beginPath(); ctx.moveTo(140, 710); ctx.lineTo(W - 140, 710); ctx.stroke();
  ctx.setLineDash([]);

  // Date label
  ctx.fillStyle = '#374151';
  ctx.font = '15px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('DATE OF COMPLETION', 160, 752);
  ctx.fillStyle = '#6b7280';
  ctx.font = '18px Georgia, serif';
  ctx.fillText(dateStr, 160, 778);

  // Issued by
  ctx.textAlign = 'right';
  ctx.fillStyle = '#374151';
  ctx.font = '15px Arial, sans-serif';
  ctx.fillText('ISSUED BY', W - 160, 752);
  ctx.fillStyle = '#6b7280';
  ctx.font = '18px Georgia, serif';
  ctx.fillText('CppMaster', W - 160, 778);

  // Bottom branding
  ctx.textAlign = 'center';
  ctx.fillStyle = '#1f2937';
  ctx.font = '14px Arial, sans-serif';
  ctx.fillText('cpp-master-new.vercel.app', cx, 845);

  const link = document.createElement('a');
  link.download = `CppMaster-Certificate-${userName.replace(/\s+/g, '-')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawCornerOrnament(ctx, x, y, color, flipX = false, flipY = false) {
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(sx, sy);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 20); ctx.lineTo(0, 0); ctx.lineTo(20, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 12); ctx.lineTo(0, 0); ctx.lineTo(12, 0); ctx.stroke();
  ctx.restore();
}

function drawStars(ctx, cx, cy, radius, count, color) {
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
