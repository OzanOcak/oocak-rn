import React from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import { colors } from '../theme/colors';

const BLOG_URL = 'https://YOUR_DOMAIN.com'; // ← change this

const samplePosts = [
  { slug: 'getting-started', title: 'Getting Started' },
  { slug: 'local-first-arch', title: 'Local-First Architecture' },
];

export default function BlogScreen() {
  const openPost = (slug: string) => {
    Linking.openURL(`${BLOG_URL}/blog/${slug}`);
  };

  return (
    <View className="flex-1 p-5" style={{ backgroundColor: colors.bg }}>
      <Text
        className="text-xs font-mono uppercase mb-2"
        style={{ color: colors.indigo }}
      >
        Phase 1 • Blog list
      </Text>
      <Text
        className="text-2xl font-extrabold mb-6"
        style={{ color: colors.text }}
      >
        Blog
      </Text>

      {samplePosts.map(post => (
        <Pressable
          key={post.slug}
          onPress={() => openPost(post.slug)}
          className="p-4 rounded-xl border mb-3"
          style={{
            backgroundColor: colors.bgMuted,
            borderColor: colors.border,
          }}
        >
          <Text
            className="text-base font-semibold"
            style={{ color: colors.text }}
          >
            {post.title}
          </Text>
          <Text className="text-xs mt-1" style={{ color: colors.textDim }}>
            Opens in browser → {BLOG_URL}/blog/{post.slug}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
