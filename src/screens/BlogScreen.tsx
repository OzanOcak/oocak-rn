import { Text, ScrollView, ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import BlogCard from '../components/BlogCard';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../lib/api';

export default function BlogScreen() {
  const navigation = useNavigation<any>();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

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

      {isLoading ? (
        <View className="py-10 items-center">
          <ActivityIndicator color={colors.emerald} />
        </View>
      ) : error ? (
        <View className="py-10 items-center">
          <Text className="text-sm mb-2" style={{ color: colors.text }}>
            Couldn&apos;t load posts
          </Text>
          <Text className="text-xs" style={{ color: colors.textMuted }}>
            {(error as Error).message}
          </Text>
        </View>
      ) : (
        posts?.map(post => (
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
