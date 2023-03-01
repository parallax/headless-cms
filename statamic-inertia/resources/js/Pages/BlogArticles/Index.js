import React from "react";

export default function Blog({ title, ready, entry }) {
    console.log(entry);
    const { author } = entry;
    console.log("author:%o", author);
    return (
        <div className="flex-1 flex justify-between flex-col h-full">
            <p>{entry.title}</p>
            <div>{entry.content}</div>
            {author.name}
            <img src={author.profile_picture.permalink} alt="" />
        </div>
    );
}
