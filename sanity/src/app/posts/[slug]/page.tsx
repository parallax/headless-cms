import { SANITY } from "~/utils/sanity";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await SANITY.posts.find(slug);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div>{post._id}</div>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await SANITY.posts.get();

  console.log(posts);

  return posts.map((post) => ({
    slug: post._id,
  }));
}
