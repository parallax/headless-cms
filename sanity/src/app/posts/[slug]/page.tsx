import { SANITY } from "~/utils/sanity";

export default async function Page() {
  const post = await SANITY.posts.find("71666907-7b4a-4596-96eb-0866c2c388db");

  return (
    <>
      <div>{post._id}</div>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await SANITY.posts.get();

  return posts.map((post) => ({
    slug: post._id,
  }));
}
