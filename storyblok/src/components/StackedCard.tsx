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
  console.log("image", image);
  return (
    <li key={slug} className="flex py-4">
      <img className="h-10 w-10 rounded-full" src={image} alt="" />
      <div className="ml-3">
        <a className="text-sm font-medium text-gray-900" href={slug}>
          {title}
        </a>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </li>
  );
};

export default StackedCard;
