import React from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import { Download } from 'lucide-react-native';
import { AccentName, getAccent } from '../../theme/colors';

type Props = {
  accent?: AccentName;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonUrl: string;
};

export default function CtaBlock({
  accent = 'indigo',
  heading,
  body,
  buttonLabel,
  buttonUrl,
}: Props) {
  const a = getAccent(accent);

  return (
    <View className="px-6 pb-12">
      <View className="p-8 rounded-3xl" style={{ backgroundColor: a.main }}>
        <Text className="text-2xl font-black text-white text-center mb-3">
          {heading}
        </Text>
        <Text
          className="text-sm leading-6 text-center mb-6"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {body}
        </Text>
        <Pressable
          onPress={() => Linking.openURL(buttonUrl)}
          className="py-3.5 rounded-xl items-center flex-row justify-center gap-2"
          style={{ backgroundColor: '#0f172a' }}
        >
          <Download size={16} color={a.light} />
          <Text className="text-white font-bold">{buttonLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}
