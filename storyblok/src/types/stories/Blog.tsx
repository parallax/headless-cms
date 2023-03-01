export interface BlogStoryProps {
  content: {
    title: string;
    date: string;
    description: string;
    image: { filename: string };
    author: { title: string };
  };
  created_at: string;
  full_slug: string;
}
