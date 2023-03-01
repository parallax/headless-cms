import React from "react";
import { isError, useQuery } from "@tanstack/react-query";
import http from "../../utils/http";
import moment from "moment";

export default function BlogIndex({ entry }) {
    const { data, fetching, isLoading, isError } = useQuery(
        ["articles"],
        async () => {
            const { data } = await http.get(
                "/collections/blog_articles/entries"
            );
            return data;
        }
    );

    if (isLoading || isError) return <></>;

    const { data: articles } = data;

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {entry.title}
                    </h2>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {articles.length &&
                        articles.map((post) => (
                            <article
                                key={post.id}
                                className="flex flex-col items-start justify-between"
                            >
                                <div className="relative w-full">
                                    <img
                                        src={post?.image?.permalink}
                                        alt=""
                                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                    />
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                </div>
                                <div className="max-w-xl">
                                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                                        <time
                                            dateTime={post.date}
                                            className="text-gray-500"
                                        >
                                            {moment(post.date).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </time>
                                        {post.categories &&
                                            post.categories.map((category) => (
                                                <div
                                                    key={category.id}
                                                    className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600"
                                                >
                                                    {category.title}
                                                </div>
                                            ))}
                                    </div>
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            <a href={post.permalink}>
                                                <span className="absolute inset-0" />
                                                {post.title}
                                            </a>
                                        </h3>
                                        <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
                                            {post.description}
                                        </p>
                                    </div>
                                    <div className="relative mt-8 flex items-center gap-x-4">
                                        {/* <img
                                            src={post.author.imageUrl}
                                            alt=""
                                            className="h-10 w-10 rounded-full bg-gray-100"
                                        /> */}
                                    </div>
                                </div>
                            </article>
                        ))}
                </div>
            </div>
        </div>
    );
}
