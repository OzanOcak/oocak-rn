import React from 'react';
import { View, Text } from 'react-native';
import { colors, accents, AccentName } from '../theme/colors';

type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  accent?: AccentName;
};

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  accent = 'emerald',
}: Props) {
  return (
    <View className="mb-5">
      {kicker ? (
        <Text
          className="text-[10px] font-mono font-bold uppercase tracking-widest mb-2"
          style={{ color: accents[accent] }}
        >
          {kicker}
        </Text>
      ) : null}
      <Text className="text-2xl font-extrabold" style={{ color: colors.text }}>
        {title}
      </Text>
      {subtitle ? (
        <Text className="text-sm mt-2" style={{ color: colors.textMuted }}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
