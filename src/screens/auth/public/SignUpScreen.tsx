import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SignUpForm from '../../../components/auth/SignUpForm';
import { colors } from '../../../theme/colors';

export default function SignUpScreen() {
  const navigation = useNavigation<any>();
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
        className="text-2xl font-bold text-center mb-2"
        style={{ color: colors.text }}
      >
        Sign Up
      </Text>

      <Text
        className="text-sm text-center mb-6"
        style={{ color: colors.textMuted }}
      >
        Already have an account?{' '}
        <Text
          onPress={() => navigation.navigate('SignIn')}
          style={{ color: '#3b82f6', textDecorationLine: 'underline' }}
        >
          Login
        </Text>
      </Text>

      <SignUpForm />
    </ScrollView>
  );
}
