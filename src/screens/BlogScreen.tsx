import React, { useEffect, useState } from 'react';
import {
  Text,
  ScrollView,
  ActivityIndicator,
  View,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import BlogCard from '../components/BlogCard';

const API_BASE = __DEV__
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:5173'
    : 'http://localhost:5173'
  : 'https://oocak.com';

type Post = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  url: string;
};

export default function BlogScreen() {
  const navigation = useNavigation<any>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/api/posts`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Post[]) => {
        if (!cancelled) {
          const sorted = [...data].sort((a, b) => {
            // Dates are "DD.MM.YYYY" — convert to comparable numbers
            const toNum = (d?: string) => {
              if (!d) return 0;
              const [day, month, year] = d.split('.');
              return Number(`${year}${month}${day}`); // YYYYMMDD
            };
            return toNum(b.date) - toNum(a.date); // newest first
          });
          setPosts(sorted);
        }
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
  }, []);

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <Text
        className="text-xs font-mono uppercase mb-2"
        style={{ color: colors.indigo }}
      >
        Writing
      </Text>
      <Text
        className="text-3xl font-extrabold mb-3"
        style={{ color: colors.text }}
      >
        Blog
      </Text>
      <Text
        className="text-sm leading-6 mb-8"
        style={{ color: colors.textMuted }}
      >
        Tutorials, tips, and insights on programming, architecture, and modern
        web development.
      </Text>

      {loading ? (
        <View className="py-10 items-center">
          <ActivityIndicator color={colors.emerald} />
        </View>
      ) : error ? (
        <View className="py-10 items-center">
          <Text className="text-sm mb-2" style={{ color: colors.text }}>
            Couldn&apos;t load posts
          </Text>
          <Text className="text-xs" style={{ color: colors.textMuted }}>
            {error}
          </Text>
        </View>
      ) : (
        posts.map(post => (
          <BlogCard
            key={post.slug}
            post={post}
            onPress={() =>
              navigation.navigate('BlogPost', {
                slug: post.slug,
                title: post.title,
              })
            }
          />
        ))
      )}
    </ScrollView>
  );
}
