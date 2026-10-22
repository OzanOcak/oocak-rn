import { http } from '../http/nextApiClient';

export type PostDetail = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  author?: string;
  tags?: string[];
  content: string;
};

export async function fetchPost(slug: string): Promise<PostDetail> {
  return http<PostDetail>(`/api/posts/${slug}`);
}
