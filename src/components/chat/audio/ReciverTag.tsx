/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

function ReciverTag({ audioUrl }: { audioUrl: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="mb-4 flex justify-start">
      <img
        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
        className="h-8 w-8 rounded-full object-cover"
        alt=""
      />
      <audio
        className="ml-2 flex h-[60px] w-[40%] justify-start rounded-br-3xl rounded-tl-xl rounded-tr-3xl bg-gray-400 px-4 py-3 text-white"
        src={audioUrl}
        controls
      ></audio>
    </div>
  );
}

export default ReciverTag;
