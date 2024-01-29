"use client";
import React, { useState } from "react";
import SenderTag from "./SenderTag";
import ReciverTag from "./ReciverTag";
import InputFormTag from "./InputFormTag";

interface VoiceData {
  voiceUrl: string;
  sender: "bot" | "person";
}

function ChatWindow() {
  const [data, setData] = useState<VoiceData[]>();
  return (
    <div className="flex h-[90vh] w-full flex-col justify-between px-5">
      <div className="mt-5 flex flex-col">
        {data?.map((data: VoiceData, index: number) => (
          <div key={index}>
            {data.sender==="person"? <SenderTag  audioUrl={data.voiceUrl} /> : <ReciverTag audioUrl={data.voiceUrl}/>}
          </div>
        ))}
      </div>
      <InputFormTag setData={setData} />
    </div>
  );
}

export default ChatWindow;
