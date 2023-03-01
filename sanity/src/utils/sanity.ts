import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "y62idgeu",
  dataset: "production",
  apiVersion: "2023-03-01",
  useCdn: true,
  token: process.env.SANITY_SECRET_TOKEN,
});

type Post = {
  _id: string;
  title: string;
  description: string;
  content: {
    _key: string;
    children: {
      _key: string;
      text: string;
    }[];
  }[];
  image: {
    url: string;
  };
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
