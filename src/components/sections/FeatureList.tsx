import React from 'react';
import { View, Text } from 'react-native';
import { AccentName, colors, getAccent } from '../../theme/colors';

type Item = {
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  desc: string;
};

type Props = {
  accent?: AccentName;
  heading?: string;
  subheading?: string;
  items: Item[];
};

export default function FeatureList({
  accent = 'indigo',
  heading,
  subheading,
  items,
}: Props) {
  const a = getAccent(accent);

  return (
    <View className="px-6 py-12">
      {heading ? (
        <Text
          className="text-2xl font-extrabold text-center mb-3"
          style={{ color: colors.text }}
        >
          {heading}
        </Text>
      ) : null}
      {subheading ? (
        <Text
          className="text-sm text-center leading-6 mb-8"
          style={{ color: colors.textMuted }}
        >
          {subheading}
        </Text>
      ) : null}

      <View className="gap-4">
        {items.map((it, i) => (
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
                backgroundColor: `${a.main}18`,
                borderColor: `${a.main}33`,
              }}
            >
              <it.Icon size={20} color={a.light} />
            </View>
            <Text
              className="text-base font-bold mb-2"
              style={{ color: colors.text }}
            >
              {it.title}
            </Text>
            <Text
              className="text-sm leading-5"
              style={{ color: colors.textMuted }}
            >
              {it.desc}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
