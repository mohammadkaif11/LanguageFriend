"use client";
import React, { useState } from "react";

function SenderTag({audioUrl}:{audioUrl:string}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="mb-4 flex justify-end items-center">
      <audio className="mr-2 flex h-[60px] w-[40%] justify-end rounded-3xl  bg-blue-400 p-2  text-white" src={audioUrl} controls></audio>
      <img
        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
        className="h-10 w-10 rounded-full object-cover"
        alt=""
      />
    </div>
  );
}

export default SenderTag;
