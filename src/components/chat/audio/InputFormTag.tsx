/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { MicrophoneIcon } from "@heroicons/react/16/solid";
import { PlayIcon } from "@heroicons/react/16/solid";
import { PauseIcon } from "@heroicons/react/16/solid";
import SenderTag from "./SenderTag";
const mimeType = "audio/webm";

interface VoiceData {
  voiceUrl: string;
  sender: "bot" | "person";
}

interface ChatWindowProps {
  setData: React.Dispatch<React.SetStateAction<VoiceData[] | undefined>>;
}

function InputFormTag(props:ChatWindowProps) {
  console.log('props', props);
  const [recordingstart, setRecordingStart] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState<string>("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permission, setPermission] = useState<boolean>(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>();
  const [audio, setAudio] = useState<string>();

  const startRecording = async () => {
    setRecordingStatus("recording");
    setRecordingStart(true);

    if (stream === null || stream === undefined) {
      console.log("stream is null or undefined");
      alert("stream is null or undefined");
      return;
    }

    const media = new MediaRecorder(stream, { mimeType });

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    const localAudioChunks = [] as Blob[];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    setRecordingStart(false);

    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        const voiceData: VoiceData = {
          voiceUrl: audioUrl,
          sender: 'person',
        };
        
        props.setData((prevDataList) => (prevDataList ? [...prevDataList, voiceData] : [voiceData]));
        console.log("audio url: ", audioUrl);
        console.log("audio blob", audioBlob, audioChunks);
        setAudio(audioUrl);
        setAudioChunks([]);
      };
    }
  };

  useEffect(() => {
    // Check for MediaRecorder support and request user media permissions
    if ("MediaRecorder" in window) {
      try {
        const getMediaStream = async () => {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
          });
          setPermission(true);
          setStream(mediaStream);
        };

        getMediaStream().catch((error) => {
          console.log("error", error);
        });
      } catch (err: unknown) {
        alert(err);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  }, []);

  return (
    <div className="flex py-5">
      <div className="w-full rounded-xl bg-gray-300 px-3 py-5"></div>
      <div>
        {recordingstart && (
          <PauseIcon
            onClick={() => {
              stopRecording();
            }}
            className="h-12 w-12"
          ></PauseIcon>
        )}
        {!recordingstart && (
          <MicrophoneIcon
            onClick={() => {
              startRecording().catch((error) => {
                console.log("error", error);
              });
            }}
            className="h-12 w-12"
          ></MicrophoneIcon>
        )}
      </div>
    </div>
  );
}

export default InputFormTag;
