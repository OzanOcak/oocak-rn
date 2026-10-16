import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppsScreen from '../screens/AppsScreen';
import AppDetailScreen from '../screens/AppDetailScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function AppsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="AppsList"
        component={AppsScreen}
        options={{ title: 'Apps' }}
      />
      <Stack.Screen
        name="AppDetail"
        component={AppDetailScreen}
        options={{ title: 'App' }}
      />
    </Stack.Navigator>
  );
}
