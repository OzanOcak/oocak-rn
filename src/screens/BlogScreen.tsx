import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { posts } from '../data/posts';
import BlogCard from '../components/BlogCard';

export default function BlogScreen() {
  const navigation = useNavigation<any>();

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

      {posts.map(post => (
        <BlogCard
          key={post.slug}
          post={post}
          onPress={() =>
            navigation.navigate('BlogPost', {
              url: post.url,
              title: post.title,
            })
          }
        />
      ))}
    </ScrollView>
  );
}
