import React from 'react';
import { View, Text, Pressable, Image, Linking } from 'react-native';
import { CheckCircle2, Download } from 'lucide-react-native';
import { AccentName, colors, getAccent } from '../../theme/colors';

let FastImage: any;
try {
  FastImage = require('react-native-fast-image');
} catch {
  FastImage = null;
}

type Cta = { label: string; url?: string };

type Media = {
  source: any;
  width?: number;
  height?: number;
  phoneFrame?: boolean;
};

type Props = {
  accent?: AccentName;
  pillIcon?: React.ComponentType<{ size?: number; color?: string }>;
  pillText?: string;
  title: React.ReactNode;
  subtitle?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  bullets?: string[];
  media?: Media;
};

export default function Hero({
  accent = 'indigo',
  pillIcon: PillIcon,
  pillText,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  bullets,
  media,
}: Props) {
  const a = getAccent(accent);

  const openCta = (cta?: Cta) => {
    if (cta?.url) Linking.openURL(cta.url);
  };

  return (
    <>
      <View className="px-6 pt-6 pb-10">
        {/* Pill */}
        {pillText ? (
          <View
            className="self-start flex-row items-center gap-2 px-3 py-1 rounded-full border mb-5"
            style={{
              backgroundColor: `${a.main}22`,
              borderColor: `${a.main}55`,
            }}
          >
            {PillIcon ? <PillIcon size={12} color={a.light} /> : null}
            <Text className="text-[10px] font-mono" style={{ color: a.light }}>
              {pillText}
            </Text>
          </View>
        ) : null}

        {/* Title */}
        <Text
          className="text-3xl font-extrabold leading-tight mb-4"
          style={{ color: colors.text }}
        >
          {title}
        </Text>

        {/* Subtitle */}
        {subtitle ? (
          <Text
            className="text-sm leading-6 mb-6"
            style={{ color: colors.textMuted }}
          >
            {subtitle}
          </Text>
        ) : null}

        {/* Primary CTA */}
        {primaryCta ? (
          <Pressable
            onPress={() => openCta(primaryCta)}
            className="py-3.5 rounded-xl items-center flex-row justify-center gap-2 mb-3"
            style={{ backgroundColor: a.main }}
          >
            <Download size={16} color="#fff" />
            <Text className="text-white font-bold">{primaryCta.label}</Text>
          </Pressable>
        ) : null}

        {/* Secondary CTA */}
        {secondaryCta ? (
          <Pressable
            onPress={() => openCta(secondaryCta)}
            className="py-3.5 rounded-xl items-center mb-6 border"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.bgMuted,
            }}
          >
            <Text className="font-bold" style={{ color: colors.text }}>
              {secondaryCta.label}
            </Text>
          </Pressable>
        ) : null}

        {/* Bullets */}
        {bullets?.length ? (
          <View className="gap-2">
            {bullets.map(b => (
              <View key={b} className="flex-row items-center gap-2">
                <CheckCircle2 size={14} color={a.light} />
                <Text
                  className="text-xs font-mono"
                  style={{ color: colors.textMuted }}
                >
                  {b}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      {/* Media */}
      {media ? (
        <View className="items-center px-6 mb-10">
          <View
            className={media.phoneFrame ? 'rounded-[40px] p-2' : ''}
            style={
              media.phoneFrame
                ? {
                    backgroundColor: '#374151',
                    borderWidth: 6,
                    borderColor: '#4b5563',
                    width: media.width ?? 280,
                  }
                : undefined
            }
          >
            <View
              className={
                media.phoneFrame ? 'rounded-[32px] overflow-hidden' : ''
              }
              style={
                media.phoneFrame
                  ? {
                      backgroundColor: '#000',
                      height: media.height ?? 520,
                    }
                  : { width: media.width, height: media.height }
              }
            >
              {FastImage ? (
                <FastImage
                  source={media.source}
                  style={{ flex: 1 }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              ) : (
                <Image
                  source={media.source}
                  style={{ flex: 1 }}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
}
