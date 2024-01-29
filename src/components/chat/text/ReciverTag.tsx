/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState } from "react";
import { PlayCircleIcon } from "@heroicons/react/16/solid";
import { PauseCircleIcon } from "@heroicons/react/24/solid";
import { generateAudio } from "~/server/chatGPT/chatgpt";

interface MessageInterface {
  role: "system" | "user" | "assistant";
  content: string;
  voiceUrl: string | null;
}

function ReciverTag({
  text,
  audioUrl,
  setMessages,
  index,
}: {
  text: string;
  audioUrl: string | null;
  setMessages: React.Dispatch<React.SetStateAction<MessageInterface[]>>;
  index: number;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audio, setAudio] = useState<string | null>(audioUrl);
  const [playing, setPlaying] = useState(false);

  const togglePlayPause = async () => {
    try {
      if (audioRef.current) {
        if (playing) {
          audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
        setPlaying(!playing);
      } else {
        // Generate audio and update the state
        const bufferAudio = await generateAudio(text);
        const blob = new Blob([bufferAudio], { type: "audio/mp3" });

        // Create a data URL from the Blob
        const audiourl = URL.createObjectURL(blob);

        // const audio = new Audio(dataUrl);
        // console.log("audio", audio);
        setAudio(audiourl);
        updateMessageVoiceUrl(index, audiourl);
        await togglePlayPause();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateMessageVoiceUrl = (index: number, voiceUrl: string) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      if (index >= 0 && index < updatedMessages.length) {
        // updatedMessages[index] = {
        //   ...updatedMessages[index],
        //   voiceUrl: voiceUrl,
        // };
      }
      return updatedMessages;
    });
  };

  return (
    <div className="mb-4 flex items-center justify-start">
      <img
        src="https://static.vecteezy.com/system/resources/previews/004/996/790/original/robot-chatbot-icon-sign-free-vector.jpg"
        className="h-8 w-8 rounded-full object-cover"
        alt=""
      />
      <div className="ml-2 flex max-w-[90%] items-center justify-end rounded-3xl bg-gray-400 px-4  py-3 text-white md:max-w-[50%]">
        <span className="w-full">{text}</span>
        {playing ? (
          <PauseCircleIcon
            onClick={togglePlayPause}
            className="h-10 w-10 pl-1"
          />
        ) : (
          <PlayCircleIcon
            onClick={togglePlayPause}
            className="h-10 w-10 pl-1"
          />
        )}
      </div>
      {audio !== null && (
        <audio ref={audioRef} className="hidden" src={audio}></audio>
      )}
    </div>
  );
}

export default ReciverTag;
