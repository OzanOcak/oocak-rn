export const colors = {
  // Backgrounds
  bg: '#020617', // slate-950
  bgMuted: '#0f172a', // slate-900
  bgSoft: '#1e293b', // slate-800

  // Borders
  border: '#1e293b', // slate-800

  // Text
  text: '#f1f5f9', // slate-100
  textMuted: '#94a3b8', // slate-400
  textDim: '#64748b', // slate-500

  // Accents
  emerald: '#10b981',
  purple: '#a855f7',
  indigo: '#6366f1',
  amber: '#f59e0b',
  blue: '#3b82f6',
};

export type AccentName = 'emerald' | 'purple' | 'indigo' | 'amber' | 'blue';

export const accents: Record<AccentName, string> = {
  emerald: colors.emerald,
  purple: colors.purple,
  indigo: colors.indigo,
  amber: colors.amber,
  blue: colors.blue,
};

// Used by reusable section components (Hero, StatsStrip, FeatureList, etc.)
// where a single color isn't enough — we need a lighter variant
// for icons and text sitting on top of the "main" background.

export type AccentColors = {
  main: string;
  light: string;
};

export const accentsFull: Record<AccentName, AccentColors> = {
  emerald: { main: colors.emerald, light: '#34d399' },
  purple: { main: colors.purple, light: '#c084fc' },
  indigo: { main: colors.indigo, light: '#818cf8' },
  amber: { main: colors.amber, light: '#fbbf24' },
  blue: { main: colors.blue, light: '#60a5fa' },
};

export const getAccent = (name: AccentName = 'indigo'): AccentColors =>
  accentsFull[name] ?? accentsFull.indigo;
