import React from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckCircle2 } from 'lucide-react-native';
import { colors, accents } from '../theme/colors';
import type { AppItem } from '../data/apps';
import AppIconPlaceholder from './AppIconPlaceholder';

type Props = {
  app: AppItem;
  /** Optional override for the headline (defaults to app.title) */
  headline?: string;
  /** Optional override for the icon (e.g. ShieldCheck for AuthFlow) */
  IconOverride?: React.ComponentType<{ size?: number; color?: string }>;
  /** Primary button label */
  primaryLabel?: string;
  /** Secondary button label + action */
  secondaryLabel?: string;
  secondaryUrl?: string;
};

export default function FeatureCard({
  app,
  headline,
  IconOverride,
  primaryLabel = 'View Details',
  secondaryLabel = 'App Store',
  secondaryUrl,
}: Props) {
  const navigation = useNavigation<any>();
  const accent = accents[app.accent];

  // Split metrics on bullet and use as chips
  const chips = app.metrics
    .split('•')
    .map(m => m.trim())
    .filter(Boolean);

  const goToDetail = () => {
    navigation.navigate('AppsTab', {
      screen: 'AppDetail',
      params: { slug: app.slug },
    });
  };

  const onSecondary = () => {
    const url = secondaryUrl ?? app.appStoreUrl;
    if (url) Linking.openURL(url);
  };

  return (
    <View
      className="mt-6 px-6 py-10 border-t border-b"
      style={{
        backgroundColor: colors.bgMuted,
        borderTopColor: colors.border,
        borderBottomColor: colors.border,
      }}
    >
      {/* Icon */}
      <View className="items-center mb-4">
        <View
          className="w-12 h-12 rounded-xl items-center justify-center border"
          style={{
            backgroundColor: `${accent}18`,
            borderColor: `${accent}33`,
          }}
        >
          {IconOverride ? (
            <IconOverride size={24} color={accent} />
          ) : (
            <AppIconPlaceholder title={app.title} accent={accent} size={28} />
          )}
        </View>
      </View>

      {/* Heading */}
      <Text
        className="text-2xl font-extrabold text-center mb-3"
        style={{ color: colors.text }}
      >
        {headline ?? app.title}
      </Text>

      {/* Description */}
      <Text
        className="text-sm text-center leading-6 mb-6"
        style={{ color: colors.textMuted }}
      >
        {app.desc}
      </Text>

      {/* Chips row */}
      <View className="flex-row flex-wrap justify-center gap-2 mb-6">
        {chips.map(label => (
          <View
            key={label}
            className="flex-row items-center gap-1 px-2 py-1 rounded-md"
            style={{ backgroundColor: colors.bgSoft }}
          >
            <CheckCircle2 size={10} color={colors.emerald} />
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
      <Pressable
        onPress={goToDetail}
        className="py-3 rounded-lg items-center mb-3"
        style={{ backgroundColor: accent }}
      >
        <Text className="text-white font-semibold">{primaryLabel}</Text>
      </Pressable>

      <Pressable
        onPress={onSecondary}
        className="py-3 rounded-lg items-center border"
        style={{ borderColor: colors.border, backgroundColor: colors.bg }}
      >
        <Text className="font-semibold" style={{ color: colors.text }}>
          {secondaryLabel}
        </Text>
      </Pressable>
    </View>
  );
}
