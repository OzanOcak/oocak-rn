import React from 'react';
import { Text, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text
        className="text-xs font-mono uppercase mb-2"
        style={{ color: colors.emerald }}
      >
        Phase 1 • Home
      </Text>
      <Text
        className="text-3xl font-extrabold mb-3"
        style={{ color: colors.text }}
      >
        High-Performance Apps{'\n'}& Developer Tools
      </Text>
      <Text className="text-base leading-6" style={{ color: colors.textMuted }}>
        Tabs are working. Navigate to Apps and Blog to confirm the shell is
        wired up correctly.
      </Text>
    </ScrollView>
  );
}
