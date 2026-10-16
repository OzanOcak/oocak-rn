import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { User } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function Header() {
  const navigation = useNavigation<any>();

  return (
    <View
      className="flex-row items-center justify-between px-5 py-3 border-b"
      style={{ backgroundColor: colors.bg, borderBottomColor: colors.border }}
    >
      <Pressable onPress={() => navigation.navigate('HomeTab')}>
        <Text className="text-xl font-extrabold" style={{ color: colors.text }}>
          o.O
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Profile')}
        className="w-9 h-9 rounded-full items-center justify-center border"
        style={{ borderColor: colors.border, backgroundColor: colors.bgMuted }}
      >
        <User size={18} color={colors.textMuted} />
      </Pressable>
    </View>
  );
}
