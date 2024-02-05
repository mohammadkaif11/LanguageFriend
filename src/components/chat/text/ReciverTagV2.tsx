/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState, useEffect } from "react";
import { PlayCircleIcon } from "@heroicons/react/16/solid";
import { PauseCircleIcon } from "@heroicons/react/24/solid";
import { type MessageInterface } from "model";
import { toast } from "sonner";

function ReciverTagV2({
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
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-US");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =useState<SpeechSynthesisVoice | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audio, setAudio] = useState<string | null>(audioUrl);
  const [playing, setPlaying] = useState(false);

  const togglePlayPause = async () => {
    try {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US hi-IN";

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        // Event handler for pause
        utterance.onpause = () => {
          console.log("Speech paused");
        };

        // Event handler for resume
        utterance.onresume = () => {
          speechSynthesis.cancel();
          console.log("Speech resumed");
        };

        utterance.onend = () => {
          console.log("Speech ended");
          speechSynthesis.cancel();
          setPlaying(false);
        };

        // Toggle between play and pause
        if (playing) {
          speechSynthesis.pause();
        } else {
          speechSynthesis.resume();
        }

        setPlaying(!playing);
        speechSynthesis.speak(utterance);
      } else {
        toast.error("SpeechSynthesis not supported in your browser");
        console.error("SpeechSynthesis is not supported in this browser.");
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <div className="mb-4 flex items-center justify-start">
      <img
        src="https://static.vecteezy.com/system/resources/previews/004/996/790/original/robot-chatbot-icon-sign-free-vector.jpg"
        className="h-8 w-8 rounded-full object-cover"
        alt=""
      />
      <div className="ml-2 flex max-w-[90%] items-center justify-end rounded-3xl bg-gray-400 px-4  py-3 text-white md:max-w-[80%]">
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

export default ReciverTagV2;
