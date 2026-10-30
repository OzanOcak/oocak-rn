import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootTabs from './src/navigation/RootTabs';
import ProfileScreen from './src/screens/ProfileScreen';
import Header from './src/components/Header';
import { colors } from './src/theme/colors';
import { Providers } from './src/providers/Providers';
import SignInScreen from './src/screens/auth/public/SignInScreen';
import SignUpScreen from './src/screens/auth/public/SignUpScreen';
import PrivateAuthNavigator from './src/navigation/PrivateAuthNavigator';
import RequestPasswordResetScreen from './src/screens/auth/public/RequestPasswordResetScreen';
import { ActivityIndicator, View } from 'react-native';
import { useSessionRestore } from './src/hooks/auth/useSessionRestore';

const RootStack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bg,
    card: colors.bg,
    text: colors.text,
    border: colors.border,
    primary: colors.emerald,
  },
};

// Create an inner component for the Navigation
function AppNavigator() {
  const { isRestoring } = useSessionRestore();

  if (isRestoring) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.bg,
        }}
      >
        <ActivityIndicator size="large" color={colors.emerald} />
      </View>
    );
  }

  return (
    <Providers>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <RootStack.Navigator>
            <RootStack.Screen
              name="Root"
              component={RootTabs}
              options={{ header: () => <Header /> }}
            />
            {/* Public auth screens (modals) */}
            <RootStack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ presentation: 'modal', title: 'Sign In' }}
            />
            <RootStack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ presentation: 'modal', title: 'Sign Up' }}
            />
            <RootStack.Screen
              name="RequestPasswordReset"
              component={RequestPasswordResetScreen}
              options={{ presentation: 'modal', title: 'Reset Password' }}
            />
            <RootStack.Screen
              name="PrivateAuth"
              component={PrivateAuthNavigator}
              options={{ presentation: 'modal', headerShown: false }}
            />
            <RootStack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'Profile' }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Providers>
  );
}

// 2. Keep your main App export clean
export default function App() {
  return (
    <Providers>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Providers>
  );
}
