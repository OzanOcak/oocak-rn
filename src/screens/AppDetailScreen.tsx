import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors } from '../theme/colors';

export default function AppDetailScreen() {
  const route = useRoute<any>();
  const { slug, title } = route.params || {};

  return (
    <View className="flex-1 p-5" style={{ backgroundColor: colors.bg }}>
      <Text
        className="text-xs font-mono uppercase mb-2"
        style={{ color: colors.purple }}
      >
        Phase 1 • App detail
      </Text>
      <Text
        className="text-2xl font-extrabold mb-2"
        style={{ color: colors.text }}
      >
        {title ?? 'Unknown App'}
      </Text>
      <Text className="text-sm" style={{ color: colors.textMuted }}>
        slug: {slug}
      </Text>
    </View>
  );
}
