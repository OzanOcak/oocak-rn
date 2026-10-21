import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PasswordRequestForm from '../../../components/auth/PasswordRequestForm';
import { colors } from '../../../theme/colors';

export default function RequestPasswordResetScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
        paddingBottom: insets.bottom + 24,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Text
        className="text-2xl font-bold text-center mb-6"
        style={{ color: colors.text }}
      >
        Request Password Reset
      </Text>

      <PasswordRequestForm />
    </ScrollView>
  );
}
