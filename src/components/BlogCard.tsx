import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { colors } from '../theme/colors';
import type { BlogPost } from '../data/posts';

type Props = {
  post: BlogPost;
  onPress: () => void;
};

export default function BlogCard({ post, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="p-5 rounded-2xl border mb-4"
      style={{ backgroundColor: colors.bgMuted, borderColor: colors.border }}
    >
      <Text className="text-base font-bold mb-2" style={{ color: colors.text }}>
        {post.title}
      </Text>
      <Text className="text-[10px] font-mono" style={{ color: colors.textDim }}>
        {post.date}
      </Text>

      <Text
        className="text-sm leading-5 mb-4"
        style={{ color: colors.textMuted }}
      >
        {post.description}
      </Text>

      <View
        className="pt-4 flex-row items-center justify-between border-t"
        style={{ borderTopColor: colors.border }}
      >
        <Text
          className="text-[10px] font-mono"
          style={{ color: colors.textDim }}
        >
          oocak.com/blogpost/{post.slug}
        </Text>
        <ArrowRight size={16} color={colors.indigo} />
      </View>
    </Pressable>
  );
}
