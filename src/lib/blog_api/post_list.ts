import { http } from '../http/client';

export type PostListItem = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  url: string;
};

export async function fetchPosts(): Promise<PostListItem[]> {
  const data = await http<PostListItem[]>('/api/posts');

  // Sort newest first (dates come as "DD.MM.YYYY")
  return data.sort((a, b) => {
    const toNum = (d?: string) => {
      if (!d) return 0;
      const [day, month, year] = d.split('.');
      return Number(`${year}${month}${day}`);
    };
    return toNum(b.date) - toNum(a.date);
  });
}
