import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';

export default function AppsScreen() {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 p-5" style={{ backgroundColor: colors.bg }}>
      <Text
        className="text-xs font-mono uppercase mb-2"
        style={{ color: colors.emerald }}
      >
        Phase 1 • Apps list
      </Text>
      <Text
        className="text-2xl font-extrabold mb-6"
        style={{ color: colors.text }}
      >
        Software Catalog
      </Text>

      <Pressable
        onPress={() =>
          navigation.navigate('AppDetail', {
            slug: 'gofrench',
            title: 'Go French',
          })
        }
        className="p-5 rounded-2xl border mb-4"
        style={{ backgroundColor: colors.bgMuted, borderColor: colors.border }}
      >
        <Text className="text-lg font-bold" style={{ color: colors.text }}>
          Go French
        </Text>
        <Text className="text-sm mt-1" style={{ color: colors.textMuted }}>
          Tap to open detail (Phase 2 will make this real)
        </Text>
      </Pressable>
    </View>
  );
}
