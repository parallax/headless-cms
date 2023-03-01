import React from "react";

export default function Example({ entry }) {
    return (
        <div className="bg-white py-32 px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                <figure className="mb-10">
                    <img
                        className="aspect-video rounded-xl bg-gray-50 object-cover"
                        src={entry.image.permalink}
                        alt=""
                    />
                </figure>
                <ul className="flex">
                    {entry.categories.map((category) => (
                        <li
                            key={category.id}
                            className="text-base font-semibold leading-7 text-indigo-600 mr-3"
                        >
                            {category.title}
                        </li>
                    ))}
                </ul>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {entry.title}
                </h1>
                <p className="mt-6 text-xl leading-8">{entry.description}</p>

                <div className="mt-10">
                    {entry.body.map((block, i) => {
                        switch (block.type) {
                            case "text":
                                return (
                                    <div
                                        key={`${block.type}-${i}`}
                                        className="rich-text max-w-2xl"
                                        dangerouslySetInnerHTML={{
                                            __html: block.text,
                                        }}
                                    ></div>
                                );
                                break;
                            case "blockquote":
                                return (
                                    <figure
                                        key={`${block.type}-${i}`}
                                        className="my-10 border-l border-indigo-600 pl-9"
                                    >
                                        <blockquote className="font-semibold text-gray-900">
                                            <p>{block.quote}</p>
                                        </blockquote>
                                        <figcaption className="mt-6 flex gap-x-4">
                                            <img
                                                className="h-6 w-6 flex-none rounded-full bg-gray-50"
                                                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                            <div className="text-sm leading-6">
                                                <strong className="font-semibold text-gray-900">
                                                    {block.author}
                                                </strong>{" "}
                                                – {block.job_title}
                                            </div>
                                        </figcaption>
                                    </figure>
                                );
                                break;
                            case "image":
                                return (
                                    <figure
                                        key={`${block.type}-${i}`}
                                        className="mt-16 mb-10"
                                    >
                                        <img
                                            className="aspect-video rounded-xl bg-gray-50 object-cover"
                                            src={block.image.permalink}
                                            alt=""
                                        />
                                        <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
                                            {block.caption}
                                        </figcaption>
                                    </figure>
                                );
                                break;
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

// export default function Blog({ entry }) {
//     const { author, categories } = entry;
//     return (
//         <div className="flex-1 flex justify-between flex-col h-full container mx-auto my-10">
//             <h1 className="text-3xl">{entry.title}</h1>
//             <div dangerouslySetInnerHTML={{ __html: entry.content }} />
//             <div className="my-10">
//                 <ul>
//                     {categories &&
//                         categories.map((category) => (
//                             <li key={category.id}>{category.title}</li>
//                         ))}
//                 </ul>
//             </div>
//             <div className="flex items-center">
//                 <img
//                     className="w-[100px] h-[100px] rounded-full"
//                     src={author.profile_picture.permalink}
//                     alt=""
//                 />
//                 <p className="text-xl ml-5">{author.name}</p>
//             </div>
//         </div>
//     );
// }
