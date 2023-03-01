import Image from "next/image";
import Link from "next/link";
import { SANITY } from "~/utils/sanity";

const Home = async () => {
  const posts = await SANITY.posts.get();

  return (
    <>
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#FFF] to-[#E0E0E0] p-10">
        <h1 className="mb-4 text-4xl ">Blog</h1>
        <h2 className="mb-4 text-2xl">Posts</h2>

        <div className="space-y-4">
          {posts.map(({ _id, title, description, content, image }) => {
            return (
              <div className="rounded p-3 shadow" key={_id}>
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={image.url}
                    alt="blog image"
                    className="object-contain"
                    fill
                  />
                </div>
                <h1 className="text-xl text-blue-500 underline">
                  <Link href={`/posts/${_id}`} prefetch={false}>
                    {title}
                  </Link>
                </h1>
                <h2>{description}</h2>

                {content.map((block) => {
                  return block.children.map((block) => {
                    return (
                      <div key={block._key}>
                        <p>{block.text}</p>
                      </div>
                    );
                  });
                })}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
