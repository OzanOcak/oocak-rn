import React from 'react';
import { View, Text } from 'react-native';
import { Brain, CheckCircle2 } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { AccentName, getAccent } from '../../theme/colors';

type Progress = { label: string; value: number; color: string };

type Props = {
  accent?: AccentName;
  heading: string;
  body: string;
  bullets: string[];
  progress?: Progress[];
};

export default function MemoryBlock({
  accent = 'indigo',
  heading,
  body,
  bullets,
  progress,
}: Props) {
  const a = getAccent(accent);

  return (
    <View className="px-6 py-12">
      <View
        className="w-11 h-11 rounded-xl items-center justify-center border mb-4"
        style={{
          backgroundColor: `${a.main}18`,
          borderColor: `${a.main}33`,
        }}
      >
        <Brain size={20} color={a.light} />
      </View>

      <Text
        className="text-2xl font-extrabold mb-3"
        style={{ color: colors.text }}
      >
        {heading}
      </Text>
      <Text
        className="text-sm leading-6 mb-4"
        style={{ color: colors.textMuted }}
      >
        {body}
      </Text>

      <View className="gap-3 mb-6">
        {bullets.map((b, i) => (
          <View key={i} className="flex-row gap-3">
            <CheckCircle2 size={16} color={a.light} style={{ marginTop: 2 }} />
            <Text
              className="flex-1 text-sm leading-5"
              style={{ color: colors.textMuted }}
            >
              {b}
            </Text>
          </View>
        ))}
      </View>

      {progress?.length ? (
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
              style={{ color: a.light }}
            >
              ACTIVE TRACKING
            </Text>
          </View>

          {progress.map((p, i) => (
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
      ) : null}
    </View>
  );
}
