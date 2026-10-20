import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Linking,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Zap,
  Brain,
  CheckCircle2,
  Download,
  Layers,
  GraduationCap,
  WifiOff,
  ChevronRight,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';

// Try FastImage if installed — fallback to Image if not
let FastImage: any;
try {
  FastImage = require('react-native-fast-image');
} catch {
  FastImage = null;
}

const INDIGO = '#6366f1';
const INDIGO_LIGHT = '#818cf8';
const AMBER = '#f59e0b';

const APP_STORE_URL =
  'https://apps.apple.com/ca/app/smart-words-dictionary/id6748163293';

const GIF = require('../../assets/gif-files/smart_words.gif');

export default function SmartWordsScreen() {
  const insets = useSafeAreaInsets();

  const openStore = () => Linking.openURL(APP_STORE_URL);

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      {/* ============ HERO ============ */}
      <View className="px-6 pt-6 pb-10">
        {/* Pill */}
        <View
          className="self-start flex-row items-center gap-2 px-3 py-1 rounded-full border mb-5"
          style={{
            backgroundColor: `${INDIGO}22`,
            borderColor: `${INDIGO}55`,
          }}
        >
          <Zap size={12} color={INDIGO_LIGHT} />
          <Text
            className="text-[10px] font-mono"
            style={{ color: INDIGO_LIGHT }}
          >
            SQLite Powered • Zero Latency
          </Text>
        </View>

        {/* Title */}
        <Text
          className="text-3xl font-extrabold leading-tight mb-4"
          style={{ color: colors.text }}
        >
          The Ultimate{' '}
          <Text style={{ color: INDIGO_LIGHT }}>Offline Vocabulary</Text>{' '}
          Engine.
        </Text>

        {/* Subtitle */}
        <Text
          className="text-sm leading-6 mb-6"
          style={{ color: colors.textMuted }}
        >
          Master 30,000+ words, idioms, and phrasal verbs with 200,000+ practice
          questions and adaptive memory tracking—completely offline.
        </Text>

        {/* Buttons */}
        <Pressable
          onPress={openStore}
          className="py-3.5 rounded-xl items-center flex-row justify-center gap-2 mb-3"
          style={{ backgroundColor: INDIGO }}
        >
          <Download size={16} color="#fff" />
          <Text className="text-white font-bold">Download on App Store</Text>
        </Pressable>

        <Pressable
          className="py-3.5 rounded-xl items-center mb-6 border"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.bgMuted,
          }}
        >
          <Text className="font-bold" style={{ color: colors.text }}>
            Explore Modules
          </Text>
        </Pressable>

        {/* Bullets */}
        <View className="gap-2">
          {['100% Offline Database', 'Free', 'IELTS / TOEFL / GRE'].map(
            bullet => (
              <View key={bullet} className="flex-row items-center gap-2">
                <CheckCircle2 size={14} color={INDIGO_LIGHT} />
                <Text
                  className="text-xs font-mono"
                  style={{ color: colors.textMuted }}
                >
                  {bullet}
                </Text>
              </View>
            ),
          )}
        </View>
      </View>

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
      <View style={{ backgroundColor: INDIGO }} className="py-8">
        <View className="flex-row flex-wrap px-6">
          {[
            { label: 'Offline Database Words', value: '30,000+' },
            { label: 'Practice Questions', value: '200,000+' },
            { label: 'Targeted Exam Tracks', value: 'IELTS / TOEFL / GRE' },
            { label: 'Data Sync Requirement', value: '0 (Local First)' },
          ].map((stat, i) => (
            <View key={i} className="w-1/2 items-center px-2 mb-6">
              <Text className="text-xl font-black text-white text-center">
                {stat.value}
              </Text>
              <Text
                className="text-[10px] font-semibold uppercase tracking-wider mt-1 text-center"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ============ FEATURES ============ */}
      <View className="px-6 py-12">
        <Text
          className="text-2xl font-extrabold text-center mb-3"
          style={{ color: colors.text }}
        >
          Engineered for High-Recall Learning
        </Text>
        <Text
          className="text-sm text-center leading-6 mb-8"
          style={{ color: colors.textMuted }}
        >
          Combines structured dictionary lookup with spaced repetition
          algorithms and high-volume test sets.
        </Text>

        <View className="gap-4">
          {[
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
          ].map((f, i) => (
            <View
              key={i}
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: colors.bgMuted,
                borderColor: colors.border,
              }}
            >
              <View
                className="w-11 h-11 rounded-xl items-center justify-center border mb-4"
                style={{
                  backgroundColor: `${INDIGO}18`,
                  borderColor: `${INDIGO}33`,
                }}
              >
                <f.Icon size={20} color={INDIGO_LIGHT} />
              </View>
              <Text
                className="text-base font-bold mb-2"
                style={{ color: colors.text }}
              >
                {f.title}
              </Text>
              <Text
                className="text-sm leading-5"
                style={{ color: colors.textMuted }}
              >
                {f.desc}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ============ EXAM TRACKS ============ */}
      <View
        className="px-6 py-10 border-t border-b"
        style={{
          backgroundColor: colors.bgMuted,
          borderColor: colors.border,
        }}
      >
        <Text
          className="text-[10px] font-mono font-bold text-center mb-2 uppercase tracking-widest"
          style={{ color: INDIGO_LIGHT }}
        >
          Targeted Modules
        </Text>
        <Text
          className="text-2xl font-extrabold text-center mb-6"
          style={{ color: colors.text }}
        >
          Curated Vocabulary Tracks
        </Text>

        <View className="gap-3">
          {[
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
          ].map((t, i) => (
            <View
              key={i}
              className="p-5 rounded-2xl border"
              style={{
                backgroundColor: colors.bg,
                borderColor: colors.border,
              }}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text
                  className="text-[10px] font-mono font-semibold"
                  style={{ color: INDIGO_LIGHT }}
                >
                  {t.tag}
                </Text>
                <ChevronRight size={14} color={colors.textDim} />
              </View>
              <Text
                className="text-base font-bold mb-1"
                style={{ color: colors.text }}
              >
                {t.name}
              </Text>
              <Text className="text-xs" style={{ color: colors.textDim }}>
                {t.count}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ============ MEMORY ENGINE ============ */}
      <View className="px-6 py-12">
        <View
          className="w-11 h-11 rounded-xl items-center justify-center border mb-4"
          style={{
            backgroundColor: `${INDIGO}18`,
            borderColor: `${INDIGO}33`,
          }}
        >
          <Brain size={20} color={INDIGO_LIGHT} />
        </View>

        <Text
          className="text-2xl font-extrabold mb-3"
          style={{ color: colors.text }}
        >
          Adaptive Memory Scoring Algorithm
        </Text>
        <Text
          className="text-sm leading-6 mb-4"
          style={{ color: colors.textMuted }}
        >
          Traditional flashcards ask you every word equally. Smart Words tracks
          a dynamic memory score for every single term based on your answer
          accuracy and review intervals.
        </Text>

        <View className="gap-3 mb-6">
          {[
            'Filters out mastered words so you stop wasting time on what you already know.',
            'Automatically re-introduces forgotten words in upcoming practice sets.',
          ].map((b, i) => (
            <View key={i} className="flex-row gap-3">
              <CheckCircle2
                size={16}
                color={INDIGO_LIGHT}
                style={{ marginTop: 2 }}
              />
              <Text
                className="flex-1 text-sm leading-5"
                style={{ color: colors.textMuted }}
              >
                {b}
              </Text>
            </View>
          ))}
        </View>

        {/* Progress card */}
        <View
          className="p-5 rounded-2xl border gap-4"
          style={{
            backgroundColor: colors.bgMuted,
            borderColor: colors.border,
          }}
        >
          <View
            className="flex-row justify-between items-center pb-3 border-b"
            style={{ borderBottomColor: colors.border }}
          >
            <Text
              className="text-[10px] font-mono"
              style={{ color: colors.textDim }}
            >
              ALGORITHM STATUS
            </Text>
            <Text
              className="text-[10px] font-mono font-bold"
              style={{ color: INDIGO_LIGHT }}
            >
              ACTIVE TRACKING
            </Text>
          </View>

          {[
            { label: 'IELTS Target Mastered', value: 76, color: INDIGO },
            { label: 'Weak / Forgotten Terms', value: 24, color: AMBER },
          ].map((p, i) => (
            <View key={i}>
              <View className="flex-row justify-between mb-2">
                <Text
                  className="text-xs font-mono"
                  style={{ color: colors.textMuted }}
                >
                  {p.label}
                </Text>
                <Text
                  className="text-xs font-mono font-bold"
                  style={{ color: p.color }}
                >
                  {p.value}%
                </Text>
              </View>
              <View
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: colors.bgSoft }}
              >
                <View
                  style={{
                    width: `${p.value}%`,
                    height: '100%',
                    backgroundColor: p.color,
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* ============ CTA ============ */}
      <View className="px-6 pb-12">
        <View className="p-8 rounded-3xl" style={{ backgroundColor: INDIGO }}>
          <Text className="text-2xl font-black text-white text-center mb-3">
            Build Your Mastery Today
          </Text>
          <Text
            className="text-sm leading-6 text-center mb-6"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Download Smart Words Dictionary and get complete offline access to
            30,000+ words and 200,000+ interactive questions.
          </Text>
          <Pressable
            onPress={openStore}
            className="py-3.5 rounded-xl items-center flex-row justify-center gap-2"
            style={{ backgroundColor: '#0f172a' }}
          >
            <Download size={16} color={INDIGO_LIGHT} />
            <Text className="text-white font-bold">Download on App Store</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
