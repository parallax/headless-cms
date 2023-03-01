import Link from "next/link";
import moment from "moment";
import BlogCard from "~/components/BlogCard";

const BlogsIndex = ({ blogs }) => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
              Our Blog
            </h2>
            <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {blogs.map(
              ({
                id,
                attributes: { title, description, author, createdAt },
              }) => {
                return (
                  <BlogCard id={id} title={title} description={description} author={author} createdAt={createdAt} />
                );
              }
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogsIndex;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("http://localhost:1337/api/blogs?populate=*");
  const data = await res.json();

  // Pass data to the page via props
  return { props: { blogs: data.data } };
}
