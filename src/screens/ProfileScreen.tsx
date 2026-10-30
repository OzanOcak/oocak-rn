import React from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { useUserName } from '../hooks/roles/useUserName';
import { EnableFaceIdButton } from '../components/faceid/EnableFaceIdButton';

export default function ProfileScreen() {
  const { data: profile, isLoading, error } = useUserName();

  if (isLoading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: colors.bg }}
      >
        <ActivityIndicator color={colors.emerald} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        className="flex-1 items-center justify-center p-6"
        style={{ backgroundColor: colors.bg }}
      >
        <Text
          className="text-base font-bold mb-2"
          style={{ color: colors.text }}
        >
          Couldn't load profile
        </Text>
        <Text className="text-xs" style={{ color: colors.textMuted }}>
          {(error as any)?.message}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-6" style={{ backgroundColor: colors.bg }}>
      <Text className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
        Profile
      </Text>

      <View
        className="p-4 rounded-lg mb-3"
        style={{ backgroundColor: colors.bgMuted }}
      >
        <Text
          className="text-[10px] font-mono uppercase mb-1"
          style={{ color: colors.textMuted }}
        >
          Username
        </Text>
        <Text
          className="text-base font-semibold"
          style={{ color: colors.text }}
        >
          {profile?.username ?? '—'}
        </Text>
      </View>

      <View
        className="p-4 rounded-lg mb-3"
        style={{ backgroundColor: colors.bgMuted }}
      >
        <Text
          className="text-[10px] font-mono uppercase mb-1"
          style={{ color: colors.textMuted }}
        >
          Email
        </Text>
        <Text className="text-base" style={{ color: colors.text }}>
          {profile?.email ?? '—'}
        </Text>
      </View>

      <View
        className="p-4 rounded-lg"
        style={{ backgroundColor: colors.bgMuted }}
      >
        <Text
          className="text-[10px] font-mono uppercase mb-1"
          style={{ color: colors.textMuted }}
        >
          Role
        </Text>
        <Text className="text-base" style={{ color: colors.text }}>
          {profile?.role ?? '—'}
        </Text>
      </View>
      {/* Face ID Section */}
      <Text className="text-lg font-bold mb-4" style={{ color: colors.text }}>
        Security
      </Text>

      <EnableFaceIdButton />
    </ScrollView>
  );
}
