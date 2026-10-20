import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Cpu, Zap, Shield, Layers, Sparkles } from 'lucide-react-native';
import { colors, getAccent } from '../../theme/colors';
import Hero from '../../components/sections/Hero';
import StatsStrip from '../../components/sections/StatsStrip';
import FeatureList from '../../components/sections/FeatureList';
import CtaBlock from '../../components/sections/CtaBlock';

const GIF = require('../../assets/gif-files/pixel_shrink.gif');

const GITHUB_URL = 'https://github.com/OzanOcak/Pixel-Shrink';
const DOWNLOAD_URL =
  'https://github.com/OzanOcak/Pixel-Shrink/releases/download/v0.1.0-alpha/Pixel.Shrink_0.1.0_aarch64.dmg';

const COMPRESSION_LEVELS = [
  { name: 'Lossless', ratio: '1.2x', quality: '100%', bar: 25 },
  { name: 'Visually Lossless', ratio: '80x', quality: '98%', bar: 80 },
  { name: 'High Compression', ratio: '120x', quality: '92%', bar: 95 },
  { name: 'Maximum', ratio: '200x', quality: '85%', bar: 100 },
];

export default function PixelShrinkScreen() {
  const insets = useSafeAreaInsets();
  const a = getAccent('purple');

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      <Hero
        accent="purple"
        pillIcon={Cpu}
        pillText="Native Performance • Rust Backend"
        title={
          <>
            Aggressive <Text style={{ color: a.light }}>Web Optimization</Text>
            {'\n'}for Desktop
          </>
        }
        subtitle="Visually lossless compression, metadata purging, and high-ratio quantization. Built with Rust for blazing-fast desktop performance."
        primaryCta={{ label: 'Download for macOS', url: DOWNLOAD_URL }}
        secondaryCta={{ label: 'View on GitHub', url: GITHUB_URL }}
        bullets={['Batch Processing', 'Lossless + Lossy', 'Rust Native']}
        media={{ source: GIF, height: 240 }}
      />

      <StatsStrip
        accent="purple"
        items={[
          { label: 'Total Images Optimized', value: '2,847' },
          { label: 'Data Saved', value: '4.2 GB' },
          { label: 'Avg. Compression', value: '94.7%' },
          { label: 'Processing Speed', value: '2.3x' },
        ]}
      />

      <FeatureList
        accent="purple"
        heading="Three Pillars of Aggressive Optimization"
        subheading="Native Rust performance with visually lossless compression."
        items={[
          {
            Icon: Sparkles,
            title: 'Visually Lossless Compression',
            desc: "Shrink 1.2 MB files down to 15 KB while keeping near-perfect visual quality. Your eyes won't notice the difference.",
          },
          {
            Icon: Shield,
            title: 'Metadata Stripping',
            desc: 'Automatically purge EXIF, GPS, color profiles, and software headers. Remove up to 200 KB of hidden bloat per image.',
          },
          {
            Icon: Layers,
            title: 'High-Ratio Quantization',
            desc: 'Intelligently group millions of color shades into optimized palettes, drastically reducing file size without visible artifacts.',
          },
          {
            Icon: Zap,
            title: 'Batch Processing',
            desc: 'Optimize hundreds of images at once with native Rust speed. Built for production workflows and large catalogs.',
          },
        ]}
      />

      {/* ============ COMPRESSION LEVELS (inline — preserves progress bar) ============ */}
      <View
        className="px-6 py-10 border-t border-b"
        style={{ backgroundColor: colors.bgMuted, borderColor: colors.border }}
      >
        <Text
          className="text-[10px] font-mono font-bold text-center mb-2 uppercase tracking-widest"
          style={{ color: a.light }}
        >
          Compression Settings
        </Text>
        <Text
          className="text-2xl font-extrabold text-center mb-6"
          style={{ color: colors.text }}
        >
          Choose Your Optimization Level
        </Text>

        <View className="gap-3">
          {COMPRESSION_LEVELS.map((level, i) => (
            <View
              key={i}
              className="p-5 rounded-2xl border"
              style={{ backgroundColor: colors.bg, borderColor: colors.border }}
            >
              <View className="flex-row items-baseline justify-between mb-1">
                <Text
                  className="text-base font-bold flex-1"
                  style={{ color: colors.text }}
                >
                  {level.name}
                </Text>
                <Text
                  className="text-xl font-black ml-3"
                  style={{ color: a.light }}
                >
                  {level.ratio}
                </Text>
              </View>
              <Text
                className="text-[10px] font-mono mb-3"
                style={{ color: colors.textDim }}
              >
                Quality: {level.quality}
              </Text>
              <View
                className="h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: colors.bgSoft }}
              >
                <View
                  style={{
                    width: `${level.bar}%`,
                    height: '100%',
                    backgroundColor: a.main,
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <CtaBlock
        accent="purple"
        heading="Optimize Smarter, Faster."
        body="Download PixelShrink for desktop and experience native Rust performance with visually lossless compression."
        primaryCta={{ label: 'Download for macOS', url: DOWNLOAD_URL }}
      />
    </ScrollView>
  );
}
