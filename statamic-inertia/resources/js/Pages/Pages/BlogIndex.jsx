import React from "react";

export default function PlayerList({ name, ready, entry }) {
    console.log(entry);
    return (
        <div className="flex-1 flex justify-between flex-col h-full">
            {name}
            {entry.content}
        </div>
    );
}
