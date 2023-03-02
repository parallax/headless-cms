import Image from "next/image";
import Link from "next/link";
import Content from "~/components/content";
import { SANITY } from "~/utils/sanity";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { title, description, content, image } = await SANITY.posts.find(slug);

  return (
    <div className="flex flex-col items-center pt-4">
      <Link href={`/`} className="text-white underline">
        Back
      </Link>

      <div className="relative h-40 w-full">
        <Image src={image.url} alt="blog banner" fill className="object-contain" />
      </div>

      <main className="bg-white pt-8 pb-16 dark:bg-gray-900 dark:text-white lg:pt-16 lg:pb-24">
        <div className="mx-auto flex max-w-screen-xl justify-between px-4 ">
          <article className="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full max-w-2xl">
            <header className="not-format mb-4 lg:mb-6">
              <address className="mb-6 flex items-center not-italic">
                <div className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
                  <div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {"Sam Sutherland"}
                    </span>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      {Date.now().toString()}
                    </p>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 dark:text-white lg:mb-6 lg:text-4xl">
                {title}
              </h1>
            </header>

            <p>{description}</p>

            <Content content={content} />
          </article>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await SANITY.posts.get();

  return posts.map((post) => ({
    slug: post._id,
  }));
}
