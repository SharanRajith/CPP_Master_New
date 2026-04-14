import React from 'react';
import Editor from '@monaco-editor/react';

const MONACO_OPTIONS = {
  fontSize: 14,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  fontLigatures: true,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  lineNumbers: 'on',
  rulers: [],
  wordWrap: 'on',
  tabSize: 4,
  insertSpaces: true,
  theme: 'vs-dark',
  padding: { top: 16, bottom: 16 },
  automaticLayout: true,
  suggestOnTriggerCharacters: true,
  quickSuggestions: true,
  bracketPairColorization: { enabled: true },
  renderWhitespace: 'selection',
  smoothScrolling: true,
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: 'on',
};

export default function CodeEditor({ value, onChange, height = '100%' }) {
  return (
    <div style={{ height, minHeight: 200, background: '#0d0d14' }}>
      <Editor
        height={height}
        defaultLanguage="cpp"
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={MONACO_OPTIONS}
        beforeMount={monaco => {
          // Custom dark theme matching our design
          monaco.editor.defineTheme('cpp-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
              { token: 'keyword',       foreground: 'c084fc', fontStyle: 'bold' },
              { token: 'string',        foreground: '86efac' },
              { token: 'comment',       foreground: '6b7280', fontStyle: 'italic' },
              { token: 'number',        foreground: 'fb923c' },
              { token: 'type',          foreground: '34d399' },
              { token: 'delimiter',     foreground: 'e2e8f0' },
              { token: 'identifier',    foreground: 'e2e8f0' },
              { token: 'function',      foreground: '60a5fa' },
            ],
            colors: {
              'editor.background':           '#0a0a0f',
              'editor.foreground':           '#e2e8f0',
              'editorLineNumber.foreground': '#3d3d50',
              'editorLineNumber.activeForeground': '#6366f1',
              'editor.selectionBackground':  '#6366f133',
              'editor.lineHighlightBackground': '#111118',
              'editorCursor.foreground':     '#6366f1',
              'editorGutter.background':     '#0a0a0f',
            },
          });
          monaco.editor.setTheme('cpp-dark');
        }}
        onMount={(editor, monaco) => {
          monaco.editor.setTheme('cpp-dark');
        }}
      />
    </div>
  );
}
