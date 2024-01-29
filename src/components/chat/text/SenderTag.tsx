/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { PlayCircleIcon } from "@heroicons/react/16/solid";
import { PauseCircleIcon } from "@heroicons/react/24/solid";

function SenderTag({ text }: { text: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { data: session } = useSession();
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mb-4 flex items-center justify-end">
      <div className="mr-2 flex  max-w-[90%] items-center  justify-end  rounded-3xl bg-blue-400 px-4 py-3 text-white md:max-w-[50%]">
        {playing ? (
          <PauseCircleIcon
            onClick={() => {
              setPlaying(!playing);
            }}
            className="h-10 w-10 pr-1"
          />
        ) : (
          <PlayCircleIcon
            onClick={() => {
              setPlaying(!playing);
            }}
            className="h-10 w-10 pr-1"
          />
        )}
        <span className="w-full">{text}</span>
      </div>
      <img
        src={
          session?.user?.image ??
          `https://avatar.vercel.sh/${session?.user?.email}`
        }
        className="h-8 w-8 rounded-full object-cover"
        alt=""
      />
      <audio
        ref={audioRef}
        className="hidden"
        src="https://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/soundtrack.mp3"
      ></audio>
    </div>
  );
}

export default SenderTag;
