/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { MicrophoneIcon } from "@heroicons/react/16/solid";
import { PauseIcon } from "@heroicons/react/16/solid";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function MicroPhone(props) {
  const [recordingstart, setRecordingStart] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    props.setMessage(transcript);
    console.log(transcript);
  }, [transcript, listening]);

  const startListening = () => {
    if (!browserSupportsSpeechRecognition) {
      console.error("browserSupportsSpeechRecognition");
    }
    setRecordingStart(!recordingstart);
    console.log("Started listening in", selectedLanguage);
    void SpeechRecognition.startListening({
      language: "en-US",
      continuous: true,
    });
  };

  const stopListening = () => {
    setRecordingStart(!recordingstart);

    console.log("Stopped listening");
    void SpeechRecognition.stopListening();
  };

  return (
    <div>
      {recordingstart && (
        <PauseIcon
          onClick={() => {
            stopListening();
          }}
          className="h-12 w-12 text-black"
        ></PauseIcon>
      )}
      {!recordingstart && (
        <MicrophoneIcon
          onClick={() => {
            startListening();
          }}
          className="h-12 w-12 text-black"
        ></MicrophoneIcon>
      )}
    </div>
  );
}

export default MicroPhone;
