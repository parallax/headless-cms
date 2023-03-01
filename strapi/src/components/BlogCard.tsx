import moment from "moment";
import Link from "next/link";

type Props = {
  id: number;
  title: string;
  description: string;
  author: string;
};
const BlogCard = ({ id, title, description,author, createdAt }: Props) => {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-5 flex items-center justify-between text-gray-500">
        <span className="text-sm">
          {moment(createdAt).format("MM/DD/YYYY")}
        </span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <a href="#">{title}</a>
      </h2>
      <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            className="h-7 w-7 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
            alt="Jese Leos avatar"
          />
          <span className="font-medium dark:text-white">{author}</span>
        </div>
        <Link
          href={`/blogs/${id}`}
          className=" dark:text-white text-primary-600 inline-flex items-center font-medium hover:underline"
        >
          Read more
          <svg
            className="ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </article>
  );
};
export default BlogCard;
