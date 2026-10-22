import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerifyOtpRecoveryScreen from '../screens/auth/private/VerifyOtpRecoveryScreen';
import VerifyOtpRegistryScreen from '../screens/auth/private/VerifyOtpRegistryScreen';
import PrivateRoute from '../components/PrivateRoute';
import { colors } from '../theme/colors';
import UpdatePasswordScreen from '../screens/auth/private/UpdatePasswordScreen';

const Stack = createNativeStackNavigator();

export default function PrivateAuthNavigator() {
  return (
    <PrivateRoute>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen
          name="VerifyOtpRecovery"
          component={VerifyOtpRecoveryScreen}
          options={{ title: 'Verify OTP' }}
        />
        <Stack.Screen
          name="VerifyOtpRegistry"
          component={VerifyOtpRegistryScreen}
          options={{ title: 'Verify OTP' }}
        />
        <Stack.Screen
          name="UpdatePassword"
          component={UpdatePasswordScreen}
          options={{ title: 'Update Password' }}
        />
      </Stack.Navigator>
    </PrivateRoute>
  );
}
