import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Zap, Brain, Shield, Filter } from 'lucide-react-native';
import { colors, getAccent } from '../../theme/colors';
import Hero from '../../components/sections/Hero';
import FeatureList from '../../components/sections/FeatureList';
import ModuleList from '../../components/sections/ModuleList';
import CtaBlock from '../../components/sections/CtaBlock';

const GIF = require('../../assets/gif-files/frontend_pro.gif');

const APP_STORE_URL = 'https://apps.apple.com/ca/app/frontend-pro/id6754517273';

export default function FrontendProScreen() {
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
        pillText="4,200+ Practice Questions"
        title={
          <>
            Master <Text style={{ color: a.light }}>Frontend Dev</Text>{' '}
            Anywhere, Anytime.
          </>
        }
        subtitle="Engineered practice sets covering HTML, CSS, JavaScript, React, Vue, Angular, TypeScript, and Accessibility with AI diagnostics."
        primaryCta={{ label: 'Download on App Store', url: APP_STORE_URL }}
        secondaryCta={{ label: 'Explore Features' }}
        bullets={['Full Offline Mode', 'Free']}
        media={{ source: GIF, width: 280, height: 520, phoneFrame: true }}
      />

      <FeatureList
        accent="emerald"
        heading="Built for Efficient Learning"
        subheading="Everything you need to clear technical interviews and master the modern web stack."
        items={[
          {
            Icon: Zap,
            title: '4,200+ Practice Questions',
            desc: 'Deep coverage across HTML, CSS, JavaScript, React, Vue, Angular, TypeScript, and WCAG Accessibility standards.',
          },
          {
            Icon: Brain,
            title: 'Smart Performance Analysis',
            desc: 'AI insights track weak areas and generate customized revision focus plans.',
          },
          {
            Icon: Shield,
            title: 'Offline Mode',
            desc: 'Study anywhere, anytime — no server connection or latency involved.',
          },
          {
            Icon: Filter,
            title: 'Advanced Custom Test Filtering',
            desc: 'Generate mock exams based on specific technologies, difficulty parameters, or historical error trends.',
          },
        ]}
      />

      <ModuleList
        accent="emerald"
        kicker="Stack Coverage"
        heading="Master All Technologies"
        items={[
          { name: 'HTML5', count: '720 Qs', tag: 'Markup' },
          { name: 'CSS3', count: '680 Qs', tag: 'Styling' },
          { name: 'JavaScript', count: '850 Qs', tag: 'Language' },
          { name: 'React', count: '620 Qs', tag: 'Framework' },
          { name: 'TypeScript', count: '530 Qs', tag: 'Language' },
          { name: 'Vue.js', count: '380 Qs', tag: 'Framework' },
          { name: 'Angular', count: '420 Qs', tag: 'Framework' },
          { name: 'Accessibility', count: '320 Qs', tag: 'WCAG / A11y' },
        ]}
      />

      <CtaBlock
        accent="emerald"
        heading="Start Mastering Frontend Today"
        body="Take full control of your web development interview prep with 4,200+ offline questions and smart diagnostic tracking."
        primaryCta={{ label: 'Download App', url: APP_STORE_URL }}
      />
    </ScrollView>
  );
}
