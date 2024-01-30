/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState } from "react";
import { PlayCircleIcon } from "@heroicons/react/16/solid";
import { PauseCircleIcon } from "@heroicons/react/24/solid";
import { generateAudio } from "~/server/chatGPT/chatgpt";
import { type MessageInterface } from "model";
import VoiceLoadSpiner from "~/components/loader/voice-load-spinner";

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
  const [loader, setLoader] = useState(false);

  const playAudio = async () => {
    console.log('audio play');
    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const pauseAudio = () => {
    console.log('audio pause');
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const loadAndPlayGeneratedAudio = async () => {
    try {
      setLoader(true)
      const bufferAudio = await generateAudio(text);
      const base64DecodedAudio = Buffer.from(bufferAudio, "base64");
      const blob = new Blob([base64DecodedAudio], { type: "audio/mp3" });
      const audiourl = URL.createObjectURL(blob);

      setAudio(audiourl);
      updateMessageVoiceUrl(index, audiourl);
      setLoader(false)
      await playAudio();
    } catch (error) {
      console.error("Error loading and playing generated audio:", error);
    }
  };

  const togglePlayPause = async () => {
    console.log('togglePlayPause');
    try {
      if (audioRef.current) {
        playing ? pauseAudio() : await playAudio();
      } else {
        await loadAndPlayGeneratedAudio();
      }
    } catch (error) {
      console.error("Error toggling play/pause:", error);
    }
  };

  const updateMessageVoiceUrl = (index: number, voiceUrl: string) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      if (
        index >= 0 &&
        index < updatedMessages.length &&
        updatedMessages[index]?.role === "assistant"
      ) {
        updatedMessages[index] = {
          role: updatedMessages[index]?.role ?? "assistant",
          voiceUrl: voiceUrl,
          content: updatedMessages[index]?.content ?? "",
        };
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
        {loader ? (
          <VoiceLoadSpiner/>
        ) : playing ? (
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
