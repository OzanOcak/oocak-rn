import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Zap,
  Brain,
  Layers,
  GraduationCap,
  WifiOff,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';
import Hero from '../../components/sections/Hero';
import StatsStrip from '../../components/sections/StatsStrip';
import FeatureList from '../../components/sections/FeatureList';
import ModuleList from '../../components/sections/ModuleList';
import MemoryBlock from '../../components/sections/MemoryBlock';
import CtaBlock from '../../components/sections/CtaBlock';

// Try FastImage if installed — fallback to Image if not
let FastImage: any;
try {
  FastImage = require('react-native-fast-image');
} catch {
  FastImage = null;
}

const APP_STORE_URL =
  'https://apps.apple.com/ca/app/smart-words-dictionary/id6748163293';

const GIF = require('../../assets/gif-files/smart_words.gif');

export default function SmartWordsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      {/* ============ HERO ============ */}
      <Hero
        accent="indigo"
        pillIcon={Zap}
        pillText="SQLite Powered • Zero Latency"
        title={
          <>
            The Ultimate{' '}
            <Text style={{ color: '#818cf8' }}>Offline Vocabulary</Text> Engine.
          </>
        }
        subtitle="Master 30,000+ words, idioms, and phrasal verbs with 200,000+ practice questions and adaptive memory tracking—completely offline."
        primaryCta={{ label: 'Download on App Store', url: APP_STORE_URL }}
        secondaryCta={{ label: 'Explore Modules' }}
        bullets={['100% Offline Database', 'Free', 'IELTS / TOEFL / GRE']}
        media={{ source: GIF, width: 280, height: 520, phoneFrame: true }}
      />

      {/* ============ DEVICE MOCKUP + GIF ============ */}
      <View className="items-center px-6 mb-10">
        <View
          className="rounded-[40px] p-2"
          style={{
            backgroundColor: '#374151',
            borderWidth: 6,
            borderColor: '#4b5563',
            width: 280,
          }}
        >
          <View
            className="rounded-[32px] overflow-hidden"
            style={{ backgroundColor: '#000', height: 520 }}
          >
            {FastImage ? (
              <FastImage
                source={GIF}
                style={{ flex: 1 }}
                resizeMode={FastImage.resizeMode.contain}
              />
            ) : (
              <Image source={GIF} style={{ flex: 1 }} resizeMode="contain" />
            )}
          </View>
        </View>
      </View>

      {/* ============ STATS ============ */}
      <StatsStrip
        accent="indigo"
        items={[
          { label: 'Offline Database Words', value: '30,000+' },
          { label: 'Practice Questions', value: '200,000+' },
          { label: 'Targeted Exam Tracks', value: 'IELTS / TOEFL / GRE' },
          { label: 'Data Sync Requirement', value: '0 (Local First)' },
        ]}
      />

      {/* ============ FEATURES ============ */}
      <FeatureList
        accent="indigo"
        heading="Engineered for High-Recall Learning"
        subheading="Combines structured dictionary lookup with spaced repetition algorithms and high-volume test sets."
        items={[
          {
            Icon: WifiOff,
            title: '100% Offline Architecture',
            desc: 'Access over 30,000 words and 200,000 interactive practice questions without Wi-Fi or data connection.',
          },
          {
            Icon: Layers,
            title: 'Beyond Basic Definitions',
            desc: 'Master essential categories often missed by standard dictionaries: Idioms, Phrasal Verbs, and Proverbs.',
          },
          {
            Icon: Brain,
            title: 'Adaptive Memory Tracking',
            desc: 'Every word tracks your unique performance score, prioritizing forgotten words and weak spots for revision.',
          },
          {
            Icon: GraduationCap,
            title: 'Targeted Exam Paths',
            desc: 'Filter and practice specific vocabulary sets curated for IELTS, TOEFL, GRE, and real-world proficiency levels.',
          },
        ]}
      />

      {/* ============ EXAM TRACKS ============ */}
      <ModuleList
        accent="indigo"
        kicker="Targeted Modules"
        heading="Curated Vocabulary Tracks"
        items={[
          {
            name: 'IELTS Prep',
            count: 'Academic & General',
            tag: 'Exam Track',
          },
          {
            name: 'TOEFL Mastery',
            count: 'High-Frequency Words',
            tag: 'Exam Track',
          },
          {
            name: 'GRE Vocabulary',
            count: 'Advanced Verbal Track',
            tag: 'Exam Track',
          },
          {
            name: 'Phrasal Verbs',
            count: 'Essential Combinations',
            tag: 'Specialized',
          },
          {
            name: 'Idioms & Sayings',
            count: 'Natural Expressions',
            tag: 'Specialized',
          },
          {
            name: 'Proverbs Catalog',
            count: 'Cultural Expressions',
            tag: 'Specialized',
          },
        ]}
      />

      {/* ============ MEMORY ENGINE ============ */}
      <MemoryBlock
        accent="indigo"
        heading="Adaptive Memory Scoring Algorithm"
        body="Traditional flashcards ask you every word equally. Smart Words tracks a dynamic memory score for every single term based on your answer accuracy and review intervals."
        bullets={[
          'Filters out mastered words so you stop wasting time on what you already know.',
          'Automatically re-introduces forgotten words in upcoming practice sets.',
        ]}
        progress={[
          { label: 'IELTS Target Mastered', value: 76, color: '#6366f1' },
          { label: 'Weak / Forgotten Terms', value: 24, color: '#f59e0b' },
        ]}
      />

      {/* ============ CTA ============ */}
      <CtaBlock
        accent="indigo"
        heading="Build Your Mastery Today"
        body="Download Smart Words Dictionary and get complete offline access to 30,000+ words and 200,000+ interactive questions."
        buttonLabel="Download on App Store"
        buttonUrl={APP_STORE_URL}
      />
    </ScrollView>
  );
}
