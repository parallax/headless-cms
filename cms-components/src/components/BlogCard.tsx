import { PropsWithChildren, ReactElement } from "react";

type Props = {
  blog: {
    id: number | string;
    title: string;
    description: string;
    author: string;
    createdAt: string;
  };
};

const BlogCard = ({ blog, children }: PropsWithChildren<Props>) => {
  const { id, title, description, createdAt, author } = blog;
  return (
    <article
      key={id}
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="mb-5 flex items-center justify-between text-gray-500">
        <span className="text-sm">{createdAt}</span>
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

        {children}
      </div>
    </article>
  );
};
export default BlogCard;
