import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, Sparkles, Mic, Search, BookOpen } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import Hero from '../../components/sections/Hero';
import StatsStrip from '../../components/sections/StatsStrip';
import FeatureList from '../../components/sections/FeatureList';
import CtaBlock from '../../components/sections/CtaBlock';

const GIF = require('../../assets/gif-files/gofrench.gif');
const APP_STORE_URL = 'https://apps.apple.com/us/app/gofrench/id6802869115';

export default function GoFrenchScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      <Hero
        accent="amber"
        pillIcon={MapPin}
        pillText="Real Montréal Stories & Context"
        title={
          <>
            Ditch the drills.{'\n'}Learn French through{' '}
            <Text style={{ color: '#fbbf24' }}>Story Adventures.</Text>
          </>
        }
        subtitle="Meet local characters, explore 93 gamified chapters, and unlock real Canadian French fluency without dry flashcards."
        primaryCta={{ label: 'Download GoFrench', url: APP_STORE_URL }}
        secondaryCta={{ label: 'Explore Map' }}
        bullets={['1,000+ Instant Cognates', 'Synced Native Narration', 'Free']}
        media={{ source: GIF, width: 280, height: 520, phoneFrame: true }}
      />

      <StatsStrip
        accent="amber"
        items={[
          { label: 'Interactive Chapters', value: '93' },
          { label: 'Story Adventures', value: '25' },
          { label: 'Cognate Vocabulary', value: '1,000+' },
          { label: 'Dictionary Words', value: '1,200+' },
        ]}
      />

      <FeatureList
        accent="amber"
        heading="Why GoFrench Works"
        subheading="Combines charming narratives, native speech tracks, and puzzle-like gameplay to anchor French in your memory."
        items={[
          {
            Icon: BookOpen,
            title: 'Story-First Immersion',
            desc: 'Learn naturally through continuous narratives set in Montréal. Listen to native speech tracks synced line-by-line with text translation.',
          },
          {
            Icon: Sparkles,
            title: '1,000+ English-French Cognates',
            desc: 'Fast-track fluency by tapping into words that look and mean the exact same in English and French (e.g., confortable, attention).',
          },
          {
            Icon: Mic,
            title: 'Complete Exercise Suite',
            desc: 'Master syntax with drag-and-drop Sentence Builders, test oral pronunciation with live mic feedback, and solve visual quizzes.',
          },
          {
            Icon: Search,
            title: '1,200+ Word Smart Dictionary',
            desc: 'Filter by word types (nouns, verbs, adjectives), inspect verb tenses, and check noun genders without leaving the app.',
          },
        ]}
      />

      {/* TODO: Cognates spotlight section — pending CognateShowcase component */}

      <CtaBlock
        accent="amber"
        heading="Start Your French Adventure Today"
        body="Master 93 chapters, explore 25 rich stories, and practice oral pronunciation with your local beaver guide."
        buttonLabel="Download on the App Store"
        buttonUrl={APP_STORE_URL}
      />
    </ScrollView>
  );
}
