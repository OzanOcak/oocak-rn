import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Cpu, ShieldCheck } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { findApp } from '../data/apps';
import FeatureCard from '../components/FeatureCard';
import { useStore } from '../stores/useStore';
import { useLogout } from '../hooks/auth/useLogout';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const goFrench = findApp('gofrench')!;
  const smartWords = findApp('smartwords')!;
  const frontendPro = findApp('frontendpro')!;
  const authflow = findApp('authflow')!;

  const accessToken = useStore(s => s.accessToken);
  const isSignedIn = !!accessToken;
  const logoutMutation = useLogout();

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
        {/* Login — primary, blue */}
        <Pressable
          onPress={() =>
            isSignedIn ? logoutMutation.mutate() : navigation.navigate('SignIn')
          }
          disabled={logoutMutation.isPending}
          className="w-full mt-4 py-4 rounded-xl items-center mb-3"
          style={{ backgroundColor: isSignedIn ? '#ef4444' : colors.blue }}
        >
          {logoutMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">
              {isSignedIn ? 'Sign Out' : 'Sign In'}
            </Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('SignUp')}
          className="mt-4"
        >
          <Text className="text-sm" style={{ color: colors.textMuted }}>
            Already have an account?{' '}
            <Text style={{ color: colors.emerald }}>Sign up</Text>
          </Text>
        </Pressable>
      </View>

      {/* ===== GO FRENCH ===== */}
      <FeatureCard
        app={goFrench}
        headline="Go French"
        primaryLabel="View Details"
        secondaryLabel="App Store"
      />

      {/* ===== SMART WORDS DICTIONARY ===== */}
      <FeatureCard
        app={smartWords}
        headline="Smart Words Dictionary"
        primaryLabel="View Details"
        secondaryLabel="App Store"
      />

      {/* ===== FRONTEND PRO ===== */}
      <FeatureCard
        app={frontendPro}
        headline="Frontend Pro"
        primaryLabel="View Details"
        secondaryLabel="App Store"
      />

      {/* ===== AUTHFLOW (using same FeatureCard, custom icon + 2 buttons) ===== */}
      <FeatureCard
        app={authflow}
        headline="AuthFlow"
        IconOverride={({ size, color }) => (
          <ShieldCheck size={size} color={color} />
        )}
        primaryLabel="View Details"
        secondaryLabel="Learn More"
        secondaryUrl="https://github.com/" // ← replace with real AuthFlow link
      />
    </ScrollView>
  );
}
