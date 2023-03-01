import type { ReactElement } from "react";

interface Props {
  title: string;
  children: ReactElement;
}

const SimpleCardHeading = ({ title = "Home", children }: Props) => {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {title}
      </h3>

      {children}
    </div>
  );
};

export default SimpleCardHeading;
