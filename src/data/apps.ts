export type AppCategory = 'mobile' | 'desktop' | 'architecture';
export type AppAccent = 'emerald' | 'purple' | 'indigo' | 'amber' | 'blue';

export interface AppItem {
  slug: string;
  title: string;
  desc: string;
  tag: string;
  iconKey: string; // will map to a real image later
  metrics: string;
  category: AppCategory;
  accent: AppAccent;
  appStoreUrl?: string;
}

export const apps: AppItem[] = [
  // ===== Mobile =====
  {
    slug: 'gofrench',
    title: 'Go French',
    desc: 'Interactive language acquisition suite focused on real-world conversational patterns, grammar drills, and spaced recall.',
    tag: 'iOS & Mobile',
    iconKey: 'gofrench',
    metrics: 'Grammar • Active Recall',
    category: 'mobile',
    accent: 'emerald',
    appStoreUrl: 'https://apps.apple.com/us/app/gofrench/id6802869115',
  },
  {
    slug: 'frontendpro',
    title: 'Frontend Pro',
    desc: 'Targeted technical interview practice engine and interactive quizzes for modern web developers.',
    tag: 'iOS & Mobile',
    iconKey: 'frontend_pro',
    metrics: 'React • TypeScript • Web Architecture',
    category: 'mobile',
    accent: 'emerald',
    appStoreUrl: 'https://apps.apple.com/ca/app/frontend-pro/id6754517273',
  },
  {
    slug: 'smartwords',
    title: 'Smart Words Dictionary',
    desc: 'Offline-first vocabulary engine featuring 30,000+ words, spaced-repetition memory tracking, and exam practice modules.',
    tag: 'iOS & Mobile',
    iconKey: 'smart_words',
    metrics: '30k+ Words • 200k Questions',
    category: 'mobile',
    accent: 'emerald',
    appStoreUrl:
      'https://apps.apple.com/ca/app/smart-words-dictionary/id6748163293',
  },
  // ===== Desktop =====
  {
    slug: 'pixelshrink',
    title: 'PixelShrink',
    desc: 'Visually lossless image compression with metadata purging and high-ratio quantization. Built with Rust and Tauri.',
    tag: 'Desktop App',
    iconKey: 'pixel_shrink',
    metrics: 'Rust • Tauri • 80x Compression',
    category: 'desktop',
    accent: 'purple',
  },
  {
    slug: 'maccleaner',
    title: 'Mac Cleaner for Devs',
    desc: 'Scan and delete developer caches, build artifacts, simulator data, and dependency folders. Privacy first, no uploads.',
    tag: 'Desktop App',
    iconKey: 'mac_cleaner',
    metrics: 'Rust • Tauri • React',
    category: 'desktop',
    accent: 'purple',
  },
  {
    slug: 'markle',
    title: 'Markle',
    desc: 'Powerful Markdown editor with VSCode-like explorer, LaTeX, Mermaid, and multiple export formats. Built with Electron.',
    tag: 'Desktop Editor',
    iconKey: 'markle',
    metrics: 'Electron • React • SQLite',
    category: 'desktop',
    accent: 'purple',
  },
  // ===== Architecture =====
  {
    slug: 'authflow',
    title: 'AuthFlow',
    desc: 'A complete authentication and authorization system built from scratch with JWT security, MFA, and role-based access control. Self-hosted on Raspberry Pi with Cloudflare Tunnels.',
    tag: 'Architecture & Security',
    iconKey: 'authflow',
    metrics: 'JWT • MFA • Self-Hosted',
    category: 'architecture',
    accent: 'indigo',
  },
];

// Convenience helpers
export const appsByCategory = {
  mobile: apps.filter(a => a.category === 'mobile'),
  desktop: apps.filter(a => a.category === 'desktop'),
  architecture: apps.filter(a => a.category === 'architecture'),
};

export const findApp = (slug: string) => apps.find(a => a.slug === slug);
