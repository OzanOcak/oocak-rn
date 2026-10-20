import React from 'react';
import { View, Text } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { AccentName, colors, getAccent } from '../../theme/colors';

type Item = { name: string; count: string; tag: string };

type Props = {
  accent?: AccentName;
  kicker?: string;
  heading?: string;
  items: Item[];
};

export default function ModuleList({
  accent = 'indigo',
  kicker,
  heading,
  items,
}: Props) {
  const a = getAccent(accent);

  return (
    <View
      className="px-6 py-10 border-t border-b"
      style={{
        backgroundColor: colors.bgMuted,
        borderColor: colors.border,
      }}
    >
      {kicker ? (
        <Text
          className="text-[10px] font-mono font-bold text-center mb-2 uppercase tracking-widest"
          style={{ color: a.light }}
        >
          {kicker}
        </Text>
      ) : null}
      {heading ? (
        <Text
          className="text-2xl font-extrabold text-center mb-6"
          style={{ color: colors.text }}
        >
          {heading}
        </Text>
      ) : null}

      <View className="gap-3">
        {items.map((t, i) => (
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
                style={{ color: a.light }}
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
  );
}
