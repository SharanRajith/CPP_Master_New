import { useState } from 'react';
import { X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { readEditorSettings, writeEditorSettings } from '../../hooks/useEditorSettings';

const FONT_SIZES = [12, 14, 16, 18];
const TAB_SIZES  = [2, 4];

export default function SettingsModal({ onClose, onEditorSettingsChange }) {
  const [settings, setSettings] = useState(() => readEditorSettings());

  function update(patch) {
    setSettings(prev => {
      const next = writeEditorSettings(patch, prev);
      onEditorSettingsChange?.(next);
      return next;
    });
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass rounded-2xl w-full max-w-sm mx-4 relative overflow-hidden"
          style={{ border: '1px solid rgba(99,102,241,0.3)' }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-6 pt-6 pb-5">
            <div className="p-2 rounded-lg bg-brand-900">
              <Settings size={18} className="text-brand-400" />
            </div>
            <h2 className="text-lg font-bold text-white flex-1">Editor Settings</h2>
            <button onClick={onClose} className="text-dark-300 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="px-6 pb-6 space-y-5">
            {/* Font size */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Font Size</label>
              <div className="flex gap-2">
                {FONT_SIZES.map(sz => (
                  <button
                    key={sz}
                    onClick={() => update({ fontSize: sz })}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${
                      settings.fontSize === sz
                        ? 'bg-brand-600/20 border-brand-500 text-white'
                        : 'border-dark-500 text-dark-300 hover:border-dark-400 hover:text-white'
                    }`}
                  >
                    {sz}px
                  </button>
                ))}
              </div>
            </div>

            {/* Tab size */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Tab Size</label>
              <div className="flex gap-2">
                {TAB_SIZES.map(ts => (
                  <button
                    key={ts}
                    onClick={() => update({ tabSize: ts })}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${
                      settings.tabSize === ts
                        ? 'bg-brand-600/20 border-brand-500 text-white'
                        : 'border-dark-500 text-dark-300 hover:border-dark-400 hover:text-white'
                    }`}
                  >
                    {ts} spaces
                  </button>
                ))}
              </div>
            </div>

            {/* Word wrap */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-300">Word Wrap</p>
                <p className="text-xs text-dark-500 mt-0.5">Wrap long lines in the editor</p>
              </div>
              <button
                onClick={() => update({ wordWrap: !settings.wordWrap })}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings.wordWrap ? 'bg-brand-600' : 'bg-dark-600'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    settings.wordWrap ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <p className="text-xs text-dark-500">Changes apply instantly.</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
