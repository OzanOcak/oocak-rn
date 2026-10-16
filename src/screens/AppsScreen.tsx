import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { appsByCategory } from '../data/apps';
import AppCard from '../components/AppCard';

export default function AppsScreen() {
  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      {/* Header */}
      <Text
        className="text-xs font-mono uppercase mb-2"
        style={{ color: colors.emerald }}
      >
        Software Catalog
      </Text>
      <Text
        className="text-3xl font-extrabold mb-3"
        style={{ color: colors.text }}
      >
        Apps I&apos;ve Built
      </Text>
      <Text
        className="text-sm leading-6 mb-8"
        style={{ color: colors.textMuted }}
      >
        A living catalog of everything I&apos;ve built, learned, and
        open-sourced.
      </Text>

      {/* Mobile */}
      <View className="mb-8">
        <View className="flex-row items-center gap-3 mb-4">
          <View
            className="w-1 h-5 rounded-full"
            style={{ backgroundColor: colors.emerald }}
          />
          <Text
            className="text-xs font-mono font-bold uppercase tracking-wider"
            style={{ color: colors.emerald }}
          >
            Mobile Apps
          </Text>
        </View>
        {appsByCategory.mobile.map(app => (
          <AppCard key={app.slug} app={app} />
        ))}
      </View>

      {/* Desktop */}
      <View className="mb-8">
        <View className="flex-row items-center gap-3 mb-4">
          <View
            className="w-1 h-5 rounded-full"
            style={{ backgroundColor: colors.purple }}
          />
          <Text
            className="text-xs font-mono font-bold uppercase tracking-wider"
            style={{ color: colors.purple }}
          >
            Desktop Apps
          </Text>
        </View>
        {appsByCategory.desktop.map(app => (
          <AppCard key={app.slug} app={app} />
        ))}
      </View>

      {/* Architecture */}
      <View className="mb-8">
        <View className="flex-row items-center gap-3 mb-4">
          <View
            className="w-1 h-5 rounded-full"
            style={{ backgroundColor: colors.indigo }}
          />
          <Text
            className="text-xs font-mono font-bold uppercase tracking-wider"
            style={{ color: colors.indigo }}
          >
            Architecture & Security
          </Text>
        </View>
        {appsByCategory.architecture.map(app => (
          <AppCard key={app.slug} app={app} />
        ))}
      </View>
    </ScrollView>
  );
}
