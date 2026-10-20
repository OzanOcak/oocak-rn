import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shield, Lock, AlertCircle, Sparkles } from 'lucide-react-native';
import { colors, getAccent } from '../../theme/colors';
import Hero from '../../components/sections/Hero';
import StatsStrip from '../../components/sections/StatsStrip';
import FeatureList from '../../components/sections/FeatureList';
import CtaBlock from '../../components/sections/CtaBlock';

const GIF = require('../../assets/gif-files/mac-cleaner.gif');

const GITHUB_URL = 'https://github.com/OzanOcak/Mac-Cleaner-for-Devs';
const DOWNLOAD_URL =
  'https://github.com/OzanOcak/Mac-Cleaner-for-Devs/releases/download/v0.1.0-alpha/maccleaner_0.1.0_aarch64.dmg';

export default function MacCleanerScreen() {
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
        pillText="Privacy First • 100% Local"
        title={
          <>
            Clean Your Mac{'\n'}
            <Text style={{ color: a.light }}>Like a Developer</Text>
          </>
        }
        subtitle="Find and delete developer caches, build artifacts, simulator data, and dependency folders. Everything stays on your machine."
        primaryCta={{ label: 'View on GitHub', url: GITHUB_URL }}
        bullets={['No Uploads', 'No Tracking', 'No Analytics']}
        media={{ source: GIF, height: 240 }}
      />

      <StatsStrip
        accent="blue"
        items={[
          { label: 'Total Scanned', value: '164 GB' },
          { label: 'Safe to Remove', value: '14.6 GB' },
          { label: 'Categories Found', value: '10' },
          { label: 'Privacy First', value: '100%' },
        ]}
      />

      <FeatureList
        accent="blue"
        heading="Why Developers Trust It"
        subheading="Clean up your dev machine without sending a single byte off your laptop."
        items={[
          {
            Icon: Lock,
            title: 'Privacy First',
            desc: 'Your files never leave your machine. No uploads, no tracking, no analytics.',
          },
          {
            Icon: AlertCircle,
            title: 'Review Before Deletion',
            desc: 'Everything is reviewed and confirmed before any action is taken.',
          },
          {
            Icon: Sparkles,
            title: 'Free & Open Source',
            desc: 'Completely free to use. Built for developers, by developers.',
          },
        ]}
      />

      <CtaBlock
        accent="blue"
        heading="Free Up Your Developer Machine"
        body="Download Mac Cleaner for Devs and reclaim gigabytes of storage from build artifacts and caches."
        primaryCta={{ label: 'Download for macOS', url: DOWNLOAD_URL }}
      />
    </ScrollView>
  );
}
