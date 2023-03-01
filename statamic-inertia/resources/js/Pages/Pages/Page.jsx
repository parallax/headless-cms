import React from "react";

export default function PlayerList({ name, ready, entry }) {
    console.log(entry);
    return (
        <div className="flex-1 flex justify-between flex-col h-full my-10 container mx-auto">
            <h1 className="text-3xl">{entry.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: entry.content }} />
        </div>
    );
}
