import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Layers, BookOpen, User } from 'lucide-react-native';
import HomeScreen from '../screens/HomeScreen';
import AppsStack from './AppsStack';
import BlogStack from './BlogStack';
import { colors } from '../theme/colors';
import ProfileScreen from '../screens/ProfileScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';

const Tab = createBottomTabNavigator();

export default function RootTabs() {
  // Read from Redux
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isSignedIn = !!accessToken;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.emerald,
        tabBarInactiveTintColor: colors.textDim,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="AppsTab"
        component={AppsStack}
        options={{
          title: 'Apps',
          tabBarIcon: ({ color, size }) => <Layers size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="BlogTab"
        component={BlogStack}
        options={{
          title: 'Blog',
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      {isSignedIn && (
        <Tab.Screen
          name="ProfileTab"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          }}
        />
      )}
    </Tab.Navigator>
  );
}
