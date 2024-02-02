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
import { useSession } from "next-auth/react";

const defaultLangauge="en-US";
function MicroPhone(props) {
  const [recordingstart, setRecordingStart] = useState(false);
  const session=useSession();
  const userNativeLanguage = session?.data?.user?.nativeLanguageSetting? session?.data?.user?.nativeLanguageSetting : defaultLangauge;

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    props.setMessage(transcript);
  }, [transcript, listening]);

  useEffect(()=>{
    console.log('session changed',session);
  },[session])
  
  const startListening = () => {
    if (!browserSupportsSpeechRecognition) {
      console.error("browserSupportsSpeechRecognition");
    }
    setRecordingStart(!recordingstart);
    console.log("Started listening in", userNativeLanguage);
    void SpeechRecognition.startListening({
      language: userNativeLanguage,
      continuous: true,
    });
  };

  const stopListening = () => {
    setRecordingStart(!recordingstart);
    console.log("Stopped listening");
    void SpeechRecognition.stopListening();
    //  resetTranscription();
  };

  return (
    <div>
      {recordingstart && (
        <PauseIcon
          onClick={() => {
            stopListening();
          }}
          className="h-8 w-8 text-black"
        ></PauseIcon>
      )}
      {!recordingstart && (
        <MicrophoneIcon
          onClick={() => {
            startListening();
          }}
          className="h-8 w-8 text-black"
        ></MicrophoneIcon>
      )}
    </div>
  );
}

export default MicroPhone;
