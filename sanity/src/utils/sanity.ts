import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "y62idgeu",
  dataset: "production",
  apiVersion: "2023-03-01",
  useCdn: true,
  token: process.env.SANITY_SECRET_TOKEN,
});

export type Post = {
  _id: string;
  title: string;
  description: string;
  content: PostContent[];
  image: {
    url: string;
  };
};

export type PostContent = {
  _key: string;
  children: {
    _key: string;
    text: string;
  }[];
};

export const SANITY = {
  posts: {
    get: async (): Promise<Post[]> => {
      return client.fetch(`*[_type == "posts"]{
        _id,
        title,
        description,
        content,
        "image": image.asset->,
      }`);
    },
    find: async (id: string): Promise<Post> => {
      return client.fetch(`*[_type == "posts" && _id == "${id}"]{
        _id,
        title,
        description,
        content,
        "image": image.asset->,
      }[0]`);
    },
  },
};
