import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Markdown from 'react-native-markdown-display';
import { colors } from '../theme/colors';

const API_BASE = 'https://oocak.com';

type Post = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  content: string;
};

// Custom render rules for fences — smaller font for ```text diagrams
const rules = {
  fence: (node: any) => {
    const lang = (node.sourceInfo || '').trim().toLowerCase();
    const isDiagram = lang === 'text' || lang === 'ascii';

    return (
      <ScrollView
        key={node.key}
        horizontal
        showsHorizontalScrollIndicator
        style={{
          backgroundColor: colors.bgSoft,
          borderRadius: 8,
          marginBottom: 14,
        }}
        contentContainerStyle={{ padding: isDiagram ? 10 : 14 }}
      >
        <Text
          style={{
            color: colors.text,
            fontFamily: 'Menlo',
            fontSize: isDiagram ? 10 : 13,
            lineHeight: isDiagram ? 13 : 20,
          }}
        >
          {node.content}
        </Text>
      </ScrollView>
    );
  },
};

export default function BlogPostScreen() {
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const slug = route.params?.slug as string | undefined;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('No post slug provided');
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/api/posts/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Post) => {
        if (!cancelled) setPost(data);
      })
      .catch(e => {
        if (!cancelled) setError(e.message ?? 'Failed to load');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!slug) {
    return (
      <View
        className="flex-1 items-center justify-center p-6"
        style={{ backgroundColor: colors.bg }}
      >
        <Text style={{ color: colors.textMuted }}>Post not found</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: colors.bg }}
      >
        <ActivityIndicator color={colors.emerald} />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View
        className="flex-1 items-center justify-center p-6"
        style={{ backgroundColor: colors.bg }}
      >
        <Text
          className="text-base font-bold mb-2"
          style={{ color: colors.text }}
        >
          Couldn&apos;t load the post
        </Text>
        <Text
          className="text-xs mb-4 text-center"
          style={{ color: colors.textMuted }}
        >
          {error ?? 'Unknown error'}
        </Text>
        <Pressable
          onPress={() => {
            setError(null);
            setLoading(true);
            if (slug) {
              fetch(`${API_BASE}/api/posts/${slug}`)
                .then(r => r.json())
                .then(data => {
                  setPost(data);
                  setLoading(false);
                })
                .catch(e => {
                  setError(e.message);
                  setLoading(false);
                });
            }
          }}
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: colors.emerald }}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg, flex: 1 }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: insets.bottom + 40,
      }}
    >
      <Text
        className="text-[10px] font-mono uppercase tracking-widest mb-3"
        style={{ color: colors.emerald }}
      >
        {post.date ?? 'Blog Post'}
      </Text>

      <Text
        className="text-3xl font-extrabold mb-6"
        style={{ color: colors.text }}
      >
        {post.title}
      </Text>

      <Markdown style={markdownStyles} rules={rules}>
        {post.content}
      </Markdown>
    </ScrollView>
  );
}

const markdownStyles = {
  body: { color: colors.textMuted, fontSize: 16, lineHeight: 26 },
  heading1: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800' as const,
    marginTop: 24,
    marginBottom: 12,
  },
  heading2: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700' as const,
    marginTop: 24,
    marginBottom: 10,
  },
  heading3: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700' as const,
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: { marginBottom: 14 },
  strong: { fontWeight: '700' as const, color: colors.text },
  em: { fontStyle: 'italic' as const },
  link: { color: colors.emerald, textDecorationLine: 'underline' as const },
  bullet_list: { marginBottom: 14 },
  ordered_list: { marginBottom: 14 },
  list_item: { marginBottom: 6 },
  code_inline: {
    backgroundColor: colors.bgSoft,
    color: colors.emerald,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'Menlo',
    fontSize: 14,
  },
  blockquote: {
    borderLeftWidth: 3,
    borderLeftColor: colors.emerald,
    paddingLeft: 12,
    marginVertical: 12,
    opacity: 0.9,
  },
  hr: { backgroundColor: colors.border, height: 1, marginVertical: 20 },
  image: { borderRadius: 8, marginVertical: 12 },
};
