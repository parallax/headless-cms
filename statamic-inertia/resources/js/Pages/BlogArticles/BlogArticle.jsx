import React from "react";

export default function Blog({ entry }) {
    const { author } = entry;
    console.log("author:%o", author);
    return (
        <div className="flex-1 flex justify-between flex-col h-full container mx-auto">
            <h1 className="text-3xl">{entry.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: entry.content }} />
            {author.name}
        </div>
    );
}
