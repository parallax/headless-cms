import moment from "moment";
import type { ReactElement } from "react";

interface Props {
  date: string;
  slug: string;
  title: string;
  description: ReactElement;
  image?: string;
}

const StackedCard = ({ date, slug, title, description, image }: Props) => {
  return (
    <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="bg-slate-200 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
          Article
        </span>
        <span className="text-sm">{date}</span>
      </div>
      {image && (
        <a href={slug}>
          <img
            className="object-cover cent w-full h-64 rounded-sm mb-4"
            src={image}
            alt={title}
          />
        </a>
      )}

      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <a href={slug}>{title}</a>
      </h2>
      <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            className="w-7 h-7 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
            alt="Jese Leos avatar"
          />
          {/* <span className="font-medium dark:text-white">{author}</span> */}
        </div>
        <a
          href={slug}
          className="inline-flex items-center font-medium text-white dark:text-primary-500 hover:underline"
        >
          Read more
          <svg
            className="ml-2 w-4 h-4"
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
        </a>
      </div>
    </article>
  );
};

export default StackedCard;
