import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Zap,
  FolderOpen,
  Share2,
  Sparkles,
  Image,
  Code,
  FileJson,
  Database,
  Layout,
} from 'lucide-react-native';
import { colors, getAccent } from '../../theme/colors';
import Hero from '../../components/sections/Hero';
import StatsStrip from '../../components/sections/StatsStrip';
import FeatureList from '../../components/sections/FeatureList';
import ModuleList from '../../components/sections/ModuleList';
import CtaBlock from '../../components/sections/CtaBlock';

const GIF = require('../../assets/gif-files/markle.gif');

const GITHUB_URL = 'https://github.com/OzanOcak/merkle';

export default function MarkleScreen() {
  const insets = useSafeAreaInsets();
  const a = getAccent('emerald');

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      <Hero
        accent="emerald"
        pillIcon={Zap}
        pillText="Electron • React • TypeScript"
        title={
          <>
            Unlock Your{'\n'}
            <Text style={{ color: a.light }}>Writing Potential</Text>
          </>
        }
        subtitle="A powerful and user-friendly Markdown editor built with Electron. Combines the simplicity of Markdown with advanced features to enhance your productivity."
        primaryCta={{ label: 'View on GitHub', url: GITHUB_URL }}
        bullets={[
          'VSCode-like Explorer',
          'LaTeX Support',
          'Mermaid Integration',
        ]}
        media={{ source: GIF, height: 240 }}
      />

      <StatsStrip
        accent="emerald"
        items={[
          { label: 'Markdown Editor', value: 'Markle' },
          { label: 'Export Formats', value: '3+' },
          { label: 'Built With', value: 'Electron' },
          { label: 'Platforms', value: 'macOS / Win / Linux' },
        ]}
      />

      <FeatureList
        accent="emerald"
        heading="Everything You Need to Write"
        subheading="Built for writers, developers, and anyone who loves to create."
        items={[
          {
            Icon: FolderOpen,
            title: 'VSCode-like Explorer',
            desc: 'Navigate your projects effortlessly with an intuitive file explorer that keeps your workspace organized.',
          },
          {
            Icon: Share2,
            title: 'Multiple Export Formats',
            desc: 'Seamlessly export your documents in HTML, Markdown, and PDF formats for easy sharing and publishing.',
          },
          {
            Icon: Sparkles,
            title: 'LaTeX Support',
            desc: 'Perfect for academics and technical writers. Typeset complex mathematical equations with full LaTeX support.',
          },
          {
            Icon: Image,
            title: 'Mermaid Integration',
            desc: 'Create beautiful diagrams and flowcharts directly within your documents using Mermaid syntax.',
          },
          {
            Icon: Code,
            title: 'Code Snippets',
            desc: 'Boost your coding efficiency with customizable code snippets that save you time and effort.',
          },
          {
            Icon: FileJson,
            title: 'Front Matter Builder',
            desc: 'Easily manage metadata with our front matter builder, adding essential information to your Markdown files.',
          },
          {
            Icon: Database,
            title: 'SQLite Support',
            desc: 'Utilize SQLite for efficient data storage and management, making it easy to handle your notes and documents.',
          },
          {
            Icon: Layout,
            title: 'Clean & Modern UI',
            desc: 'Enjoy a clean and modern interface designed for a smooth writing experience.',
          },
        ]}
      />

      <ModuleList
        accent="emerald"
        kicker="Export Options"
        heading="Share Your Work Anywhere"
        items={[
          { name: 'HTML', count: 'Web-ready documents', tag: 'Format' },
          { name: 'Markdown', count: 'Plain-text writing', tag: 'Format' },
          { name: 'PDF', count: 'Print-ready export', tag: 'Format' },
        ]}
      />

      <ModuleList
        accent="emerald"
        kicker="Tech Stack"
        heading="Built for Performance"
        items={[
          { name: 'Electron', count: 'Desktop shell', tag: 'Framework' },
          { name: 'React', count: 'UI layer', tag: 'Framework' },
          { name: 'TypeScript', count: 'Type safety', tag: 'Language' },
          { name: 'SQLite', count: 'Local storage', tag: 'Database' },
        ]}
      />

      <CtaBlock
        accent="emerald"
        heading="Start Writing with Markle"
        body="Download Markle and unlock your writing potential today."
        primaryCta={{ label: 'Source Code in Github', url: GITHUB_URL }}
      />
    </ScrollView>
  );
}
