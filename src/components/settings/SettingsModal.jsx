import React, { useState } from 'react';
import { X, Settings, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsModal({ onClose }) {
  const [clientId, setClientId]         = useState(() => localStorage.getItem('jdoodle_client_id') || '');
  const [clientSecret, setClientSecret] = useState(() => localStorage.getItem('jdoodle_client_secret') || '');
  const [saved, setSaved]               = useState(false);

  function handleSave() {
    localStorage.setItem('jdoodle_client_id',     clientId.trim());
    localStorage.setItem('jdoodle_client_secret', clientSecret.trim());
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1200);
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
          className="glass rounded-2xl p-8 w-full max-w-md mx-4 relative"
          style={{ border: '1px solid rgba(99,102,241,0.3)' }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-dark-300 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-brand-900">
              <Settings size={20} className="text-brand-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Compiler Settings</h2>
              <p className="text-sm text-dark-300">JDoodle API (fallback compiler)</p>
            </div>
          </div>

          <div className="bg-dark-700 rounded-lg p-4 mb-6 text-sm">
            <p className="text-warning font-semibold mb-1">🟡 JDoodle Fallback Required</p>
            <p className="text-dark-300">
              The primary Piston API is unavailable. Enter your free JDoodle credentials below.
              Get them at{' '}
              <a
                href="https://jdoodle.com"
                target="_blank"
                rel="noreferrer"
                className="text-brand-400 underline"
              >
                jdoodle.com
              </a>
              {' '}(free: 200 compilations/day).
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">
                Client ID
              </label>
              <input
                type="text"
                value={clientId}
                onChange={e => setClientId(e.target.value)}
                placeholder="Your JDoodle Client ID"
                className="w-full bg-dark-700 border border-dark-500 rounded-lg px-4 py-2.5 text-white placeholder-dark-300 focus:outline-none focus:border-brand-500 transition-colors font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">
                Client Secret
              </label>
              <input
                type="password"
                value={clientSecret}
                onChange={e => setClientSecret(e.target.value)}
                placeholder="Your JDoodle Client Secret"
                className="w-full bg-dark-700 border border-dark-500 rounded-lg px-4 py-2.5 text-white placeholder-dark-300 focus:outline-none focus:border-brand-500 transition-colors font-mono text-sm"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="btn-primary w-full mt-6 justify-center"
          >
            <Save size={16} />
            {saved ? '✅ Saved!' : 'Save Credentials'}
          </button>

          <p className="text-xs text-dark-300 mt-3 text-center">
            Credentials stored locally in your browser only
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
