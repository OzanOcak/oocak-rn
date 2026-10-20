import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppsScreen from '../screens/AppsScreen';
import AppDetailScreen from '../screens/AppDetailScreen';
import { colors } from '../theme/colors';
import { APP_SCREEN_REGISTRY } from './appScreens';

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
      {/* Auto-registered from the registry — no manual edits needed per app */}
      {Object.values(APP_SCREEN_REGISTRY).map(entry => (
        <Stack.Screen
          key={entry.screenName}
          name={entry.screenName}
          component={entry.component}
          options={{ title: entry.title }}
        />
      ))}
    </Stack.Navigator>
  );
}
