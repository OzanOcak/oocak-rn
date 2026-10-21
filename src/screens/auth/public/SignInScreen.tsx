import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LoginForm from '../../../components/auth/LoginForm';
import { colors } from '../../../theme/colors';

export default function SignInScreen() {
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
        Sign in
      </Text>

      <LoginForm />

      <Text
        className="text-sm text-center mt-4"
        style={{ color: colors.textMuted }}
      >
        <Text
          onPress={() => {
            // TODO: navigation.navigate('ForgotPassword')
          }}
          style={{ color: '#3b82f6' }}
        >
          Forgot your password?
        </Text>
      </Text>
    </ScrollView>
  );
}
