import React from 'react';
import { View, Text, Image } from 'react-native';
import { appIcons } from '../assets/icons';

type Props = {
  title: string;
  size?: number;
  accent?: string;
  iconKey?: string;
};

export default function AppIconPlaceholder({
  title,
  size = 32,
  accent = '#10b981',
  iconKey,
}: Props) {
  const iconSource = iconKey ? appIcons[iconKey] : undefined;

  if (iconSource) {
    return (
      <Image
        source={iconSource}
        style={{ width: size, height: size, borderRadius: size / 4 }}
        resizeMode="contain"
      />
    );
  }

  const initials = title
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 4,
        backgroundColor: `${accent}22`, // translucent
        borderWidth: 1,
        borderColor: `${accent}55`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: accent, fontWeight: '700', fontSize: size * 0.38 }}>
        {initials}
      </Text>
    </View>
  );
}
