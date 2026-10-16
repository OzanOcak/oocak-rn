import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BlogScreen from '../screens/BlogScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function BlogStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="BlogList"
        component={BlogScreen}
        options={{ title: 'Blog' }}
      />
    </Stack.Navigator>
  );
}
