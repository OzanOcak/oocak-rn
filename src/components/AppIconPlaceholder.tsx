import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  title: string;
  size?: number;
  accent?: string;
};

export default function AppIconPlaceholder({
  title,
  size = 32,
  accent = '#10b981',
}: Props) {
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
