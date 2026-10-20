import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Layers,
  Shield,
  Sparkles,
  Lock,
  MousePointerClick,
  Palette,
  Smartphone,
  Zap,
  Image as ImageIcon,
} from 'lucide-react-native';
import { colors, getAccent } from '../../theme/colors';
import Hero from '../../components/sections/Hero';
import StatsStrip from '../../components/sections/StatsStrip';
import FeatureList from '../../components/sections/FeatureList';
import CtaBlock from '../../components/sections/CtaBlock';

const GIF = require('../../assets/gif-files/topdown-slider.gif');

const WP_URL = 'https://wordpress.org/plugins/oocak-fullscreen-slider/';
const GITHUB_URL = 'https://github.com/OzanOcak/oocak-fullscreen-slider';

export default function FullscreenSliderScreen() {
  const insets = useSafeAreaInsets();
  const a = getAccent('blue');

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      <Hero
        accent="blue"
        pillIcon={Shield}
        pillText="Free · GPL-2.0"
        title={
          <>
            Build Full-Screen{'\n'}
            <Text style={{ color: a.light }}>Scroll Experiences</Text>
          </>
        }
        subtitle="A WordPress plugin for single-page landing experiences. Full-screen slides, scroll-snap navigation, per-slide animations, and a modern React admin editor."
        primaryCta={{ label: 'Get it from WordPress.org', url: WP_URL }}
        secondaryCta={{ label: 'View on GitHub', url: GITHUB_URL }}
        bullets={['No External Calls', 'Open Source', '15 KB Frontend']}
        media={{ source: GIF, height: 240 }}
      />

      <StatsStrip
        accent="blue"
        items={[
          { label: 'Frontend Size', value: '15 KB' },
          { label: 'Animations', value: '10' },
          { label: 'Text Positions', value: '5' },
          { label: 'Dependencies', value: '0' },
        ]}
      />

      <FeatureList
        accent="blue"
        heading="Everything You Need, Nothing You Don't"
        subheading="A focused tool for one job. No page builders, no jQuery, no bloat."
        items={[
          {
            Icon: ImageIcon,
            title: 'Full-Screen Slides',
            desc: 'Every slide fills the viewport. The image is the design — nothing else competes for attention.',
          },
          {
            Icon: MousePointerClick,
            title: 'Scroll-Snap Navigation',
            desc: 'Each slide snaps cleanly into place. Users scroll naturally, and the slider follows.',
          },
          {
            Icon: Sparkles,
            title: 'Per-Slide Animations',
            desc: 'Text fades, slides, or zooms in. Images pan or zoom. Every slide can animate differently.',
          },
          {
            Icon: Palette,
            title: 'Text Positioning',
            desc: 'Place text top-left, top-right, center, bottom-left, or bottom-right. Per slide.',
          },
          {
            Icon: Zap,
            title: 'Optional CTA Button',
            desc: 'Add a button to any slide. Link to a page on your site or a custom URL. Ghost or solid style.',
          },
          {
            Icon: Layers,
            title: 'Multiple Sliders',
            desc: 'Create unlimited sliders, each with its own shortcode. Use different ones on different pages.',
          },
          {
            Icon: Smartphone,
            title: 'Responsive Navigation',
            desc: 'Top nav on desktop, slide-in panel on tablet and mobile. Built-in, no configuration needed.',
          },
          {
            Icon: Shield,
            title: 'Accessibility',
            desc: 'Respects prefers-reduced-motion. Keyboard navigation. Semantic HTML with ARIA labels.',
          },
        ]}
      />

      <FeatureList
        accent="blue"
        heading="Built Right"
        items={[
          {
            Icon: Lock,
            title: 'No External Calls',
            desc: 'Every asset is bundled in the plugin. Nothing phones home. No analytics, no tracking, no third-party services.',
          },
          {
            Icon: Shield,
            title: 'Security First',
            desc: 'Whitelist sanitization on every field, nonce verification on every write, capability checks on every admin action.',
          },
          {
            Icon: Sparkles,
            title: 'Free Forever',
            desc: 'GPL-2.0 licensed. No pro version, no upsells, no feature gating. Use it on as many sites as you want.',
          },
        ]}
      />

      <CtaBlock
        accent="blue"
        heading="Ship a Full-Screen Landing Page"
        body="Install oocak fullscreen slider from WordPress.org, add your slides, and paste one shortcode. That's the whole workflow."
        primaryCta={{ label: 'Get it from WordPress.org', url: WP_URL }}
        secondaryCta={{ label: 'View Source', url: GITHUB_URL }}
      />
    </ScrollView>
  );
}
