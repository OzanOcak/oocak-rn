import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors, accents } from '../theme/colors';
import { findApp } from '../data/apps';
import AppIconPlaceholder from '../components/AppIconPlaceholder';

export default function AppDetailScreen() {
  const route = useRoute<any>();
  const slug = route.params?.slug as string | undefined;
  const app = slug ? findApp(slug) : undefined;

  if (!app) {
    return (
      <View
        className="flex-1 items-center justify-center p-6"
        style={{ backgroundColor: colors.bg }}
      >
        <Text style={{ color: colors.textMuted }}>App not found</Text>
      </View>
    );
  }

  const accent = accents[app.accent];

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      {/* Tag */}
      <Text
        className="text-[10px] font-mono uppercase tracking-widest mb-3"
        style={{ color: accent }}
      >
        {app.tag}
      </Text>

      {/* Icon + Title */}
      <View className="flex-row items-center gap-4 mb-6">
        <View
          className="w-16 h-16 rounded-2xl items-center justify-center border"
          style={{
            backgroundColor: `${accent}18`,
            borderColor: `${accent}33`,
          }}
        >
          <AppIconPlaceholder title={app.title} accent={accent} size={40} />
        </View>
        <Text
          className="text-2xl font-extrabold flex-1"
          style={{ color: colors.text }}
        >
          {app.title}
        </Text>
      </View>

      {/* Description */}
      <Text
        className="text-base leading-6 mb-6"
        style={{ color: colors.textMuted }}
      >
        {app.desc}
      </Text>

      {/* Metrics */}
      <View
        className="p-4 rounded-xl border mb-6"
        style={{ backgroundColor: colors.bgMuted, borderColor: colors.border }}
      >
        <Text
          className="text-[10px] font-mono uppercase mb-2"
          style={{ color: colors.textDim }}
        >
          Tech Stack
        </Text>
        <Text className="text-sm font-mono" style={{ color: colors.text }}>
          {app.metrics}
        </Text>
      </View>

      {/* Placeholder for future content */}
      <View
        className="p-5 rounded-xl border items-center"
        style={{ backgroundColor: colors.bgMuted, borderColor: colors.border }}
      >
        <Text className="text-xs font-mono" style={{ color: colors.textDim }}>
          More details coming soon
        </Text>
      </View>
    </ScrollView>
  );
}
