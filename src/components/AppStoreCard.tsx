import React from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowRight, Apple } from 'lucide-react-native';
import { colors, accents } from '../theme/colors';
import type { AppItem } from '../data/apps';
import AppIconPlaceholder from './AppIconPlaceholder';

type Props = {
  app: AppItem;
  /** Optional custom headline (defaults to app.title) */
  headline?: string;
  /** Optional sub-line above the title (e.g. "Architecture & Security") */
  kicker?: string;
  /** What to show for the primary button label */
  primaryLabel?: string;
};

export default function AppStoreCard({
  app,
  headline,
  kicker,
  primaryLabel = 'View Details',
}: Props) {
  const navigation = useNavigation<any>();
  const accent = accents[app.accent];

  const openStore = () => {
    if (app.appStoreUrl) Linking.openURL(app.appStoreUrl);
  };

  const openDetail = () => {
    navigation.navigate('AppsTab', {
      screen: 'AppDetail',
      params: { slug: app.slug },
    });
  };

  return (
    <View
      className="p-5 rounded-2xl border mb-4"
      style={{ backgroundColor: colors.bgMuted, borderColor: colors.border }}
    >
      {/* Header row: icon + title + tag */}
      <View className="flex-row items-center gap-4 mb-4">
        <View
          className="w-12 h-12 rounded-xl items-center justify-center border"
          style={{
            backgroundColor: `${accent}18`,
            borderColor: `${accent}33`,
          }}
        >
          <AppIconPlaceholder title={app.title} accent={accent} size={32} />
        </View>

        <View className="flex-1">
          <Text className="text-base font-bold" style={{ color: colors.text }}>
            {headline ?? app.title}
          </Text>
          {kicker ? (
            <Text
              className="text-[10px] font-mono mt-1 uppercase tracking-wider"
              style={{ color: accent }}
            >
              {kicker}
            </Text>
          ) : null}
        </View>

        <ArrowRight size={18} color={colors.textDim} />
      </View>

      {/* Description */}
      <Text
        className="text-sm leading-5 mb-4"
        style={{ color: colors.textMuted }}
      >
        {app.desc}
      </Text>

      {/* Metrics chips */}
      <View className="flex-row flex-wrap gap-2 mb-4">
        {app.metrics
          .split('•')
          .map(m => m.trim())
          .filter(Boolean)
          .map(label => (
            <View
              key={label}
              className="px-2 py-1 rounded-md"
              style={{ backgroundColor: colors.bgSoft }}
            >
              <Text
                className="text-[10px] font-mono"
                style={{ color: colors.textDim }}
              >
                {label}
              </Text>
            </View>
          ))}
      </View>

      {/* Buttons */}
      <View className="flex-row gap-3">
        <Pressable
          onPress={openDetail}
          className="flex-1 py-3 rounded-lg items-center border"
          style={{
            borderColor: `${accent}66`,
            backgroundColor: `${accent}18`,
          }}
        >
          <Text className="text-sm font-semibold" style={{ color: accent }}>
            {primaryLabel}
          </Text>
        </Pressable>

        {app.appStoreUrl ? (
          <Pressable
            onPress={openStore}
            className="flex-1 py-3 rounded-lg items-center flex-row justify-center gap-2"
            style={{ backgroundColor: accent }}
          >
            <Apple size={14} color="#fff" />
            <Text className="text-sm font-semibold text-white">App Store</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
