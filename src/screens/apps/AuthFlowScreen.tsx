import React from 'react';
import { View, Text, ScrollView, Pressable, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Shield,
  Lock,
  Key,
  Layers,
  Globe,
  Cloud,
  Server,
  Database,
  ExternalLink,
} from 'lucide-react-native';
import { colors, getAccent } from '../../theme/colors';
import Hero from '../../components/sections/Hero';
import StatsStrip from '../../components/sections/StatsStrip';
import FeatureList from '../../components/sections/FeatureList';
import CtaBlock from '../../components/sections/CtaBlock';

const GIF = require('../../assets/gif-files/auth.gif');

const GITHUB_URL = 'https://github.com/OzanOcak/website';
const BLOG_URL =
  'https://oocak.com/blogpost/raspberry-pi-cloudflare-vercel-architecture';

const ARCHITECTURE_LAYERS = [
  {
    Icon: Globe,
    title: 'Frontend (Vercel)',
    desc: 'React + TypeScript application hosted on Vercel with global CDN and automatic SSL.',
  },
  {
    Icon: Cloud,
    title: 'API Gateway (Cloudflare)',
    desc: 'Cloudflare Tunnel securely exposes the Raspberry Pi without port forwarding.',
  },
  {
    Icon: Server,
    title: 'Backend (Raspberry Pi)',
    desc: 'Express.js server running on Raspberry Pi with NGINX reverse proxy.',
  },
  {
    Icon: Database,
    title: 'Database (PostgreSQL)',
    desc: 'PostgreSQL database hosted on the Raspberry Pi with Drizzle ORM.',
  },
];

const RELATED_POSTS = [
  {
    date: '10.03.2025',
    title:
      'Building a Secure and Scalable Architecture with Raspberry Pi, Cloudflare, and Vercel',
    desc: 'A deep dive into self-hosting a full-stack application with Raspberry Pi, Cloudflare Tunnels, and Vercel.',
    url: BLOG_URL,
  },
  {
    date: 'Coming Soon',
    title: 'Authentication & Authorization System',
    desc: 'A complete guide to building a secure JWT-based auth system with MFA, role-based access, and a self-hosted architecture.',
    url: BLOG_URL,
  },
];

export default function AuthFlowScreen() {
  const insets = useSafeAreaInsets();
  const a = getAccent('indigo');

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      <Hero
        accent="indigo"
        pillIcon={Shield}
        pillText="OWASP Best Practices • Self-Hosted"
        title={
          <>
            Secure Auth &{'\n'}
            <Text style={{ color: a.light }}>Scalable Architecture</Text>
          </>
        }
        subtitle="A robust authentication system built from scratch with JWT, MFA, and role-based access control. Complete with a self-hosted infrastructure using Raspberry Pi, Cloudflare, and Vercel."
        primaryCta={{ label: 'View on GitHub', url: GITHUB_URL }}
        secondaryCta={{ label: 'Read Blog Post', url: BLOG_URL }}
        bullets={['JWT Security', 'MFA Support', 'Role-Based Access']}
        media={{
          source: GIF,
          height: 240,
        }}
      />

      <StatsStrip
        accent="indigo"
        items={[
          { label: 'Architecture Layers', value: '4' },
          { label: 'Security Features', value: '8+' },
          { label: 'Self-Hosted', value: '100%' },
          { label: 'Open Source', value: 'Yes' },
        ]}
      />

      <FeatureList
        accent="indigo"
        heading="Built with Security in Mind"
        subheading="A complete authentication system built from scratch with OWASP best practices."
        items={[
          {
            Icon: Shield,
            title: 'End-to-End JWT Security',
            desc: 'Stateless authentication using access/refresh tokens with token invalidation (token IDs). Secure cookie handling and Axios interceptor integration for seamless token renewal.',
          },
          {
            Icon: Lock,
            title: 'Multi-Layered Authentication',
            desc: 'Time-based OTP (TOTP), email-based 2FA, customizable password policies, and brute-force protection.',
          },
          {
            Icon: Key,
            title: 'User-Centric Authorization',
            desc: "Role and permission management inspired by OAuth's scope logic, enabling granular access control (e.g., user:read, admin:write).",
          },
          {
            Icon: Layers,
            title: 'Modern Tech Stack',
            desc: 'React + TypeScript, React Query, Zod, Express.js, Drizzle ORM, PostgreSQL. Fully containerized with Docker.',
          },
        ]}
      />

      {/* ============ ARCHITECTURE LAYERS (inline, AuthFlow-specific) ============ */}
      <View
        className="px-6 py-10 border-t border-b"
        style={{ backgroundColor: colors.bgMuted, borderColor: colors.border }}
      >
        <Text
          className="text-[10px] font-mono font-bold text-center mb-2 uppercase tracking-widest"
          style={{ color: a.light }}
        >
          Infrastructure
        </Text>
        <Text
          className="text-2xl font-extrabold text-center mb-3"
          style={{ color: colors.text }}
        >
          Self-Hosted Architecture
        </Text>
        <Text
          className="text-sm text-center leading-6 mb-8"
          style={{ color: colors.textMuted }}
        >
          Raspberry Pi • Cloudflare Tunnels • Vercel • PostgreSQL
        </Text>

        <View className="gap-3">
          {ARCHITECTURE_LAYERS.map((layer, i) => (
            <View
              key={i}
              className="p-5 rounded-2xl border items-center"
              style={{ backgroundColor: colors.bg, borderColor: colors.border }}
            >
              <View
                className="w-12 h-12 rounded-xl items-center justify-center border mb-3"
                style={{
                  backgroundColor: `${a.main}18`,
                  borderColor: `${a.main}33`,
                }}
              >
                <layer.Icon size={22} color={a.light} />
              </View>
              <Text
                className="text-base font-bold mb-1 text-center"
                style={{ color: colors.text }}
              >
                {layer.title}
              </Text>
              <Text
                className="text-xs text-center leading-5"
                style={{ color: colors.textMuted }}
              >
                {layer.desc}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ============ RELATED BLOG POSTS (inline, AuthFlow-specific) ============ */}
      <View className="px-6 py-12">
        <Text
          className="text-[10px] font-mono font-bold text-center mb-2 uppercase tracking-widest"
          style={{ color: a.light }}
        >
          Blog
        </Text>
        <Text
          className="text-2xl font-extrabold text-center mb-6"
          style={{ color: colors.text }}
        >
          Related Articles
        </Text>

        <View className="gap-3">
          {RELATED_POSTS.map((post, i) => (
            <Pressable
              key={i}
              onPress={() => Linking.openURL(post.url)}
              className="p-5 rounded-2xl border"
              style={{
                backgroundColor: colors.bgMuted,
                borderColor: colors.border,
              }}
            >
              <View className="flex-row justify-between items-start mb-2">
                <Text
                  className="text-[10px] font-mono"
                  style={{ color: colors.textDim }}
                >
                  {post.date}
                </Text>
                <ExternalLink size={14} color={colors.textDim} />
              </View>
              <Text
                className="text-base font-bold mb-2"
                style={{ color: colors.text }}
              >
                {post.title}
              </Text>
              <Text
                className="text-sm leading-5"
                style={{ color: colors.textMuted }}
              >
                {post.desc}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <CtaBlock
        accent="indigo"
        heading="Explore the Code"
        body="Check out the complete authentication system on GitHub. Open source and ready to use."
        primaryCta={{ label: 'View on GitHub', url: GITHUB_URL }}
        secondaryCta={{ label: 'Read the Blog', url: BLOG_URL }}
      />
    </ScrollView>
  );
}
