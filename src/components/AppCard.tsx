import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowRight } from 'lucide-react-native';
import { colors, accents } from '../theme/colors';
import type { AppItem } from '../data/apps';
import AppIconPlaceholder from './AppIconPlaceholder';

type Props = {
  app: AppItem;
};

export default function AppCard({ app }: Props) {
  const navigation = useNavigation<any>();
  const accent = accents[app.accent];

  return (
    <Pressable
      onPress={() => {
        if (app.slug === 'smartwords') {
          navigation.navigate('AppsTab', { screen: 'SmartWords' });
        } else {
          navigation.navigate('AppsTab', {
            screen: 'AppDetail',
            params: { slug: app.slug },
          });
        }
      }}
      className="p-5 rounded-2xl border mb-4"
      style={{
        backgroundColor: colors.bgMuted,
        borderColor: colors.border,
      }}
    >
      {/* Top row: icon + tag */}
      <View className="flex-row items-center justify-between mb-4">
        <View
          className="w-12 h-12 rounded-xl items-center justify-center border"
          style={{
            backgroundColor: `${accent}18`,
            borderColor: `${accent}33`,
          }}
        >
          <AppIconPlaceholder title={app.title} accent={accent} size={32} />
        </View>

        <Text
          className="text-[10px] font-mono px-2 py-1 rounded-md"
          style={{ color: colors.textMuted, backgroundColor: colors.bgSoft }}
        >
          {app.tag}
        </Text>
      </View>

      {/* Title */}
      <Text className="text-lg font-bold mb-2" style={{ color: colors.text }}>
        {app.title}
      </Text>

      {/* Description */}
      <Text
        className="text-sm leading-5 mb-4"
        style={{ color: colors.textMuted }}
      >
        {app.desc}
      </Text>

      {/* Bottom: metrics + arrow */}
      <View
        className="pt-4 flex-row items-center justify-between border-t"
        style={{ borderTopColor: colors.border }}
      >
        <Text
          className="text-xs font-mono flex-1 pr-2"
          style={{ color: colors.textDim }}
        >
          {app.metrics}
        </Text>
        <ArrowRight size={16} color={accent} />
      </View>
    </Pressable>
  );
}
