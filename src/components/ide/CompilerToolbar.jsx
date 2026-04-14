import React from 'react';
import { Play, Loader2, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

const STATUS_CONFIG = {
  'piston-local': { icon: '⚡', label: 'Local (Unlimited)', color: 'text-green-400' },
  piston:         { icon: '🟢', label: 'Piston (Live)',      color: 'text-success' },
  jdoodle:        { icon: '🟡', label: 'JDoodle (Fallback)', color: 'text-warning' },
  offline:        { icon: '🔴', label: 'Offline',            color: 'text-danger' },
  checking:       { icon: '⚪', label: 'Checking...',         color: 'text-dark-300' },
};

export default function CompilerToolbar({
  isCompiling,
  compilerStatus,
  onRun,
  onRunTests,
  onOpenSettings,
  hasTestCases,
}) {
  const status = STATUS_CONFIG[compilerStatus] || STATUS_CONFIG.checking;

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-600">
      {/* Left: Run buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onRun}
          disabled={isCompiling}
          className="btn-primary text-sm py-1.5 px-4"
        >
          {isCompiling ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Play size={14} />
          )}
          {isCompiling ? 'Running...' : 'Run Code'}
        </button>

        {hasTestCases && (
          <button
            onClick={onRunTests}
            disabled={isCompiling}
            className="flex items-center gap-1.5 text-sm py-1.5 px-4 rounded-lg border border-dark-500 text-dark-300 hover:text-white hover:border-brand-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCompiling ? <Loader2 size={14} className="animate-spin" /> : null}
            ✅ Run Tests
          </button>
        )}
      </div>

      {/* Right: Compiler status + settings */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs">
          <span>{status.icon}</span>
          <span className={status.color + ' font-medium'}>{status.label}</span>
        </div>

        {compilerStatus === 'offline' && (
          <span className="text-xs text-danger bg-red-900/20 px-2 py-0.5 rounded">
            Both APIs failed
          </span>
        )}

        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-lg text-dark-300 hover:text-white hover:bg-dark-600 transition-all"
          title="Compiler Settings"
        >
          <span className="text-sm">⚙️</span>
        </button>
      </div>
    </div>
  );
}
