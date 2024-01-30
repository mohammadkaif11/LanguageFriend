"use client";
import React, { useEffect, useState } from "react";
import SenderTag from "./SenderTag";
import ReciverTag from "./ReciverTagV2";
import InputFormTag from "./InputFormTag";
import { feed_chat_prompt } from "~/server/chatGPT/Prompt";
import { startChart } from "~/server/chatGPT/chatgpt";
import { MessageInterface } from "model";

interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  system_fingerprint: string;
}

interface ChatChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  logprobs: null;
  finish_reason: string;
}

function ChatWindow() {
  const [messages, setMessages] = useState<MessageInterface[]>([]);

  useEffect(() => {
    const sendObj: MessageInterface = {
      role: "system",
      content: "you are ai chat bot return respnse only in one word",
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
