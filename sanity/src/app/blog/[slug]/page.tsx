import Image from "next/image";
import Link from "next/link";
import Content from "~/components/content";
import { SANITY } from "~/utils/sanity";

import {BlogItem} from "components/dist/esm/index";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { title, description, content, image } = await SANITY.posts.find(slug);

  return (
    <div className="flex flex-col items-center pt-4">
      <Link href={`/`} className="underline">
        Back
      </Link>
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={image.url}
          alt="blog image"
          className="object-contain"
          fill
        />
      </div>

      <BlogItem />

      <div className="item-center">
        <h1>{title}</h1>
        <h2>{description}</h2>

        <Content content={content} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await SANITY.posts.get();

  return posts.map((post) => ({
    slug: post._id,
  }));
}
