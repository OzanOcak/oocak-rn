import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  return (
    <View
      className="flex-1 items-center justify-center p-5"
      style={{ backgroundColor: colors.bg }}
    >
      <Text className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
        Profile
      </Text>
      <Text style={{ color: colors.textMuted }}>Coming soon</Text>
    </View>
  );
}
