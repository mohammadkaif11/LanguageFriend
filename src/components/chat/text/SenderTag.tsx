/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { PlayCircleIcon } from "@heroicons/react/16/solid";
import { PauseCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";

function SenderTag({ text }: { text: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { data: session } = useSession();
  const [playing, setPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-US");
  const [selectedVoice, setSelectedVoice] =useState<SpeechSynthesisVoice | null>(null);

  const togglePlayPause = async () => {
    try {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedLanguage;

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
    <div className="mb-4 flex items-center justify-end">
      <div
        className="mr-2 flex max-w-[90%]  flex-col items-start justify-end rounded-3xl px-4  py-3 md:max-w-[80%]"
        style={{ backgroundColor: "#c35a5a" }}
      >
        <span className="w-full">{text}</span>

        {playing ? (
          <PauseCircleIcon onClick={togglePlayPause} className="mt-2 h-6 w-6" />
        ) : (
          <PlayCircleIcon
            onClick={togglePlayPause}
            className="mr-2 mt-1 h-6 w-6"
          />
        )}
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
