import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootTabs from './src/navigation/RootTabs';
import ProfileScreen from './src/screens/ProfileScreen';
import Header from './src/components/Header';
import { colors } from './src/theme/colors';
import { Providers } from './src/providers/Providers';

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

export default function App() {
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
