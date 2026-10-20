import { Platform } from 'react-native';

export const API_BASE = __DEV__
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:5173'
    : 'http://localhost:5173'
  : 'https://oocak.com';

export type PostListItem = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  url: string;
};
export type PostDetail = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  author?: string;
  tags?: string[];
  content: string;
};

export async function fetchPosts(): Promise<PostListItem[]> {
  const res = await fetch(`${API_BASE}/api/posts`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: PostListItem[] = await res.json();
  return data.sort((a, b) => {
    const toNum = (d?: string) => {
      if (!d) return 0;
      const [day, month, year] = d.split('.');
      return Number(`${year}${month}${day}`);
    };
    return toNum(b.date) - toNum(a.date);
  });
}

export async function fetchPost(slug: string): Promise<PostDetail> {
  const res = await fetch(`${API_BASE}/api/posts/${slug}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
