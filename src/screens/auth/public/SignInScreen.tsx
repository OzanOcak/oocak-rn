import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LoginForm from '../../../components/auth/LoginForm';
import { colors } from '../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignInButton } from '../../../components/oauth/GoogleSignInButton';
import { FaceIdSignInButton } from '../../../components/faceid/FaceIdSignInButton';

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

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
            navigation.replace('RequestPasswordReset');
          }}
          style={{ color: '#3b82f6' }}
        >
          Forgot your password?
        </Text>
      </Text>
      <Text
        className="text-xs font-mono uppercase text-center mt-6 mb-4"
        style={{ color: colors.textDim }}
      >
        Or continue with
      </Text>

      <GoogleSignInButton />

      {/* Face ID Button - It will hide itself automatically if not enabled in Zustand */}
      <FaceIdSignInButton />
    </ScrollView>
  );
}
