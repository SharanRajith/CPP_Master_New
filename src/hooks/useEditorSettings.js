const DEFAULTS = { fontSize: 14, tabSize: 4, wordWrap: true };
const KEY = 'cpp_editor_settings';

export function readEditorSettings() {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') };
  } catch {
    return { ...DEFAULTS };
  }
}

export function writeEditorSettings(patch, current) {
  const next = { ...current, ...patch };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
