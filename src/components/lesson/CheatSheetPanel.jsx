import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { X, BookMarked, Download } from 'lucide-react';
import { getCheatSheet } from '../../data/cheatsheets';

function buildPrintDoc(title, color, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title} — Cheat Sheet</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      font-size: 13px;
      line-height: 1.6;
      color: #1e1e2e;
      max-width: 820px;
      margin: 0 auto;
      padding: 32px 40px 48px;
    }
    .cover {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 28px;
      padding-bottom: 18px;
      border-bottom: 2px solid ${color};
    }
    .cover-dot {
      width: 14px; height: 14px; border-radius: 50%;
      background: ${color};
      flex-shrink: 0;
    }
    .cover-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: .12em;
      font-weight: 700;
      color: ${color};
      margin-bottom: 2px;
    }
    .cover-title { font-size: 20px; font-weight: 800; color: #0f0f1a; }

    h2 { font-size: 16px; font-weight: 700; color: #0f0f1a; margin: 22px 0 8px; }
    h3 { font-size: 13px; font-weight: 700; color: #2d2d44; margin: 16px 0 6px; }
    p  { margin: 6px 0; color: #2d2d44; }
    ul, ol { padding-left: 18px; margin: 6px 0; color: #2d2d44; }
    li { margin: 3px 0; }

    code {
      font-family: 'Consolas', 'Cascadia Code', 'Fira Code', monospace;
      font-size: 11.5px;
      background: #f0f0f8;
      color: #3b0764;
      padding: 1px 5px;
      border-radius: 4px;
    }
    pre {
      background: #13131f;
      color: #e2e8f0;
      padding: 14px 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 8px 0;
      border-left: 3px solid ${color};
      page-break-inside: avoid;
    }
    pre code {
      background: none;
      color: inherit;
      padding: 0;
      font-size: 11px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: 10px 0;
      font-size: 12px;
      page-break-inside: avoid;
    }
    th {
      background: ${color}18;
      color: #0f0f1a;
      font-weight: 700;
      padding: 7px 12px;
      border: 1px solid ${color}40;
      text-align: left;
    }
    td {
      padding: 6px 12px;
      border: 1px solid #dde;
      color: #2d2d44;
    }
    tr:nth-child(even) td { background: #f8f8fc; }

    hr { border: none; border-top: 1px solid #e0e0ec; margin: 16px 0; }
    strong { color: #0f0f1a; }
    blockquote {
      border-left: 3px solid ${color};
      margin: 8px 0;
      padding: 6px 12px;
      background: ${color}0c;
      color: #2d2d44;
    }

    @media print {
      body { padding: 20px 28px; }
      pre  { color-adjust: exact; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      th   { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="cover">
    <div class="cover-dot"></div>
    <div>
      <div class="cover-label">Cheat Sheet</div>
      <div class="cover-title">${title}</div>
    </div>
  </div>
  ${bodyHtml}
  <script>
    window.onload = function () {
      window.print();
      window.onafterprint = function () { window.close(); };
    };
  </script>
</body>
</html>`;
}

export default function CheatSheetPanel({ moduleId, moduleTitle, moduleColor, onClose }) {
  const content   = getCheatSheet(moduleId);
  const contentRef = useRef(null);

  function handleDownload() {
    const bodyHtml = contentRef.current?.innerHTML || '';
    const doc = buildPrintDoc(moduleTitle, moduleColor, bodyHtml);
    const win = window.open('', '_blank', 'width=900,height=700');
    if (!win) return;
    win.document.open();
    win.document.write(doc);
    win.document.close();
  }

  return (
    <AnimatePresence>
      <motion.div
        key="cheatsheet-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex justify-end"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
      >
        <motion.div
          key="cheatsheet-panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative h-full w-full max-w-sm md:max-w-md flex flex-col shadow-2xl"
          style={{ background: '#0e0e1a', borderLeft: `1px solid ${moduleColor}30` }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="shrink-0 flex items-center gap-3 px-5 py-4 border-b border-dark-700"
            style={{ background: `${moduleColor}0e` }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${moduleColor}20`, border: `1px solid ${moduleColor}40` }}>
              <BookMarked size={16} style={{ color: moduleColor }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: moduleColor }}>
                Cheat Sheet
              </p>
              <p className="text-sm font-semibold text-white truncate">{moduleTitle}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {content && (
                <button
                  onClick={handleDownload}
                  title="Download / Print as PDF"
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all text-dark-300 hover:text-white border border-dark-600 hover:border-dark-500 hover:bg-dark-700"
                >
                  <Download size={12} /> PDF
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-all"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 pb-10">
            {content ? (
              <div ref={contentRef} className="cheatsheet-prose lesson-prose text-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-16">
                <BookMarked size={32} className="mx-auto mb-3 text-dark-600" />
                <p className="text-sm text-dark-500">No cheat sheet for this module yet.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
