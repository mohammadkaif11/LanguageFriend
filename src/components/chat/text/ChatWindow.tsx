"use client";
import React, { useEffect, useState } from "react";
import SenderTag from "./SenderTag";
import ReciverTag from "./ReciverTagV2";
import InputFormTag from "./InputFormTag";
import { useSearchParams } from "next/navigation";
import { startChart } from "~/server/chatGPT/chatgpt";
import { basis_propmt } from "~/server/prompt/chatPropmt";
import { type MessageInterface } from "model";



function ChatWindow() {
  const searchParams = useSearchParams();
  let chatPropmt: string;
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const sceneId = searchParams?.get("sceneId");
  const characterId = searchParams?.get("characterId");
  if(sceneId===null && characterId===null){
    console.log('both are null');
    chatPropmt = basis_propmt;
  }

  useEffect(() => {
    const sendObj: MessageInterface = {
      role: "system",
      content:chatPropmt,
      voiceUrl: null,
    };
    setMessages((prevMessages) => [...prevMessages, sendObj]);
    if (messages.length===0) {
      startChart([...messages, sendObj])
        .then((response) => {
          const res = response as MessageInterface;
          res.voiceUrl = null;
          setMessages((prevMessages) => [...prevMessages, res]);
        })
        .catch((errors) => {
          console.log("error", errors);
        });
    }
  }, []);

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  return (
    <div className="flex h-[90vh] w-full flex-col justify-between px-2">
      <div className="mt-5 flex flex-col overflow-y-scroll	">
        {messages?.map((data: MessageInterface, index: number) => (
          <div key={index}>
            {data.role === "user" && <SenderTag text={data.content} />}
            {data.role === "assistant" && (
              <ReciverTag
                text={data.content}
                audioUrl={data.voiceUrl}
                index={index}
                setMessages={setMessages}
              />
            )}
          </div>
        ))}
      </div>
      <InputFormTag setMessages={setMessages} chatHistory={messages} />
    </div>
  );
}

export default ChatWindow;
