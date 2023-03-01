import { type ReactElement } from "react";
import { type PostContent } from "~/utils/sanity";

export default function Content({
  content,
}: {
  content: PostContent[];
}): ReactElement {
  return (
    <>
      {content.map((block) => {
        return block.children.map((block) => {
          return (
            <div key={block._key}>
              <p>{block.text}</p>
            </div>
          );
        });
      })}
    </>
  );
}
