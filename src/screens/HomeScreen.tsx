import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Cpu,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react-native';
import { colors } from '../theme/colors';
import { appsByCategory, findApp } from '../data/apps';
import AppCard from '../components/AppCard';
import SectionHeading from '../components/SectionHeading';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const authflow = findApp('authflow')!;

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* ===== HERO ===== */}
      <View className="px-6 pt-12 pb-16 items-center">
        {/* Pill */}
        <View
          className="flex-row items-center gap-2 px-3 py-1 rounded-full border mb-6"
          style={{
            borderColor: `${colors.emerald}66`,
            backgroundColor: `${colors.emerald}22`,
          }}
        >
          <Cpu size={12} color={colors.emerald} />
          <Text
            className="text-[10px] font-mono"
            style={{ color: colors.emerald }}
          >
            Local-First & Developer Ecosystem
          </Text>
        </View>

        {/* Title */}
        <Text
          className="text-4xl font-extrabold text-center leading-tight mb-4"
          style={{ color: colors.text }}
        >
          High-Performance Apps &{'\n'}
          <Text style={{ color: colors.emerald }}>Developer Tools</Text>
        </Text>

        {/* Subtitle */}
        <Text
          className="text-base text-center leading-6 mb-8"
          style={{ color: colors.textMuted }}
        >
          Exploring software engineering, local-first architecture, offline
          vocabulary engines, and modern frontend platforms.
        </Text>

        {/* Buttons */}
        <Pressable
          onPress={() => navigation.navigate('AppsTab')}
          className="w-full py-4 rounded-xl items-center mb-3"
          style={{ backgroundColor: colors.emerald }}
        >
          <Text className="text-white font-semibold">Explore Applications</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('AppsTab')}
          className="w-full py-4 rounded-xl items-center border"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.bgMuted,
          }}
        >
          <Text className="font-semibold" style={{ color: colors.text }}>
            All Software
          </Text>
        </Pressable>
      </View>

      {/* ===== FEATURED APPS ===== */}
      <View className="px-6 pb-4">
        <SectionHeading
          kicker="Software Catalog"
          title="Featured Applications"
          subtitle="Dedicated applications designed for speed, privacy, and long-term utility."
        />

        {/* Mobile */}
        <View className="mt-4 mb-10">
          <View className="flex-row items-center gap-3 mb-4">
            <View
              className="w-1 h-5 rounded-full"
              style={{ backgroundColor: colors.emerald }}
            />
            <Text
              className="text-xs font-mono font-bold uppercase tracking-wider"
              style={{ color: colors.emerald }}
            >
              Mobile Apps
            </Text>
            <Text
              className="text-[10px] font-mono"
              style={{ color: colors.textDim }}
            >
              iOS • Offline-First
            </Text>
          </View>

          {appsByCategory.mobile.map(app => (
            <AppCard key={app.slug} app={app} />
          ))}
        </View>

        {/* Desktop */}
        <View className="mb-6">
          <View className="flex-row items-center gap-3 mb-4">
            <View
              className="w-1 h-5 rounded-full"
              style={{ backgroundColor: colors.purple }}
            />
            <Text
              className="text-xs font-mono font-bold uppercase tracking-wider"
              style={{ color: colors.purple }}
            >
              Desktop Apps
            </Text>
            <Text
              className="text-[10px] font-mono"
              style={{ color: colors.textDim }}
            >
              Tauri • Electron • Rust
            </Text>
          </View>

          {appsByCategory.desktop.map(app => (
            <AppCard key={app.slug} app={app} />
          ))}
        </View>
      </View>

      {/* ===== SECURITY / ARCHITECTURE ===== */}
      <View
        className="mt-6 px-6 py-10 border-t border-b"
        style={{
          backgroundColor: colors.bgMuted,
          borderTopColor: colors.border,
          borderBottomColor: colors.border,
        }}
      >
        <View className="items-center mb-4">
          <View
            className="w-12 h-12 rounded-xl items-center justify-center border"
            style={{
              backgroundColor: `${colors.indigo}18`,
              borderColor: `${colors.indigo}33`,
            }}
          >
            <ShieldCheck size={24} color={colors.indigo} />
          </View>
        </View>

        <Text
          className="text-2xl font-extrabold text-center mb-3"
          style={{ color: colors.text }}
        >
          Security, Architecture & Infrastructure
        </Text>

        <Text
          className="text-sm text-center leading-6 mb-6"
          style={{ color: colors.textMuted }}
        >
          From self-hosted authentication systems to scalable infrastructure
          with Raspberry Pi, Cloudflare Tunnels, and Vercel — engineered with
          privacy-first standards.
        </Text>

        {/* AuthFlow card */}
        <Pressable
          onPress={() =>
            navigation.navigate('AppsTab', {
              screen: 'AppDetail',
              params: { slug: authflow.slug },
            })
          }
          className="p-5 rounded-2xl border mb-6"
          style={{ backgroundColor: colors.bg, borderColor: colors.border }}
        >
          <View className="flex-row items-center gap-4 mb-3">
            <View
              className="w-12 h-12 rounded-xl items-center justify-center border"
              style={{
                backgroundColor: `${colors.indigo}18`,
                borderColor: `${colors.indigo}33`,
              }}
            >
              <ShieldCheck size={22} color={colors.indigo} />
            </View>
            <View className="flex-1">
              <Text
                className="text-base font-bold"
                style={{ color: colors.text }}
              >
                AuthFlow
              </Text>
              <Text
                className="text-[10px] font-mono mt-1"
                style={{ color: colors.indigo }}
              >
                Architecture & Security
              </Text>
            </View>
            <ArrowRight size={18} color={colors.textDim} />
          </View>

          <Text
            className="text-sm leading-5 mb-3"
            style={{ color: colors.textMuted }}
          >
            A complete authentication system built from scratch with JWT
            security, MFA, role-based access, and self-hosted infrastructure.
          </Text>

          <View className="flex-row flex-wrap gap-3">
            {['JWT Security', 'MFA Support', 'Self-Hosted'].map(label => (
              <View key={label} className="flex-row items-center gap-1">
                <CheckCircle2 size={12} color={colors.emerald} />
                <Text
                  className="text-[10px] font-mono"
                  style={{ color: colors.textDim }}
                >
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </Pressable>

        {/* Buttons */}
        <Pressable
          onPress={() =>
            navigation.navigate('AppsTab', {
              screen: 'AppDetail',
              params: { slug: authflow.slug },
            })
          }
          className="py-3 rounded-lg items-center mb-3"
          style={{ backgroundColor: colors.indigo }}
        >
          <Text className="text-white font-semibold">Explore AuthFlow</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('AppsTab')}
          className="py-3 rounded-lg items-center border"
          style={{ borderColor: colors.border, backgroundColor: colors.bg }}
        >
          <Text className="font-semibold" style={{ color: colors.text }}>
            Browse All Projects
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
