import React from 'react';
import { View, Text } from 'react-native';
import { AccentName, getAccent } from '../../theme/colors';

type Stat = { label: string; value: string };

type Props = {
  accent?: AccentName;
  items: Stat[];
};

export default function StatsStrip({ accent = 'indigo', items }: Props) {
  const a = getAccent(accent);

  return (
    <View style={{ backgroundColor: a.main }} className="py-8">
      <View className="flex-row flex-wrap px-6">
        {items.map((s, i) => (
          <View key={i} className="w-1/2 items-center px-2 mb-6">
            <Text className="text-xl font-black text-white text-center">
              {s.value}
            </Text>
            <Text
              className="text-[10px] font-semibold uppercase tracking-wider mt-1 text-center"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {s.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
