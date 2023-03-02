import { BlogCard, BlogList } from "cms-components";
import Link from "next/link";
import { SANITY } from "~/utils/sanity";

export default async function Page() {
  const posts = await SANITY.posts.get();

  return (
    <>
      <main>
        <BlogList>
          {posts.map((post) => {
            return (
              <BlogCard
                blog={{
                  ...post,
                  ...{
                    id: post._id,
                    author: "Sam Sutherland",
                    createdAt: Date.now().toString(),
                  },
                }}
                key={post._id}
              >
                <Link
                  href={`/blogs/${post._id}`}
                  className=" text-primary-600 inline-flex items-center font-medium hover:underline dark:text-white"
                >
                  Read more
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </BlogCard>
            );
          })}
        </BlogList>
      </main>
    </>
  );
}
