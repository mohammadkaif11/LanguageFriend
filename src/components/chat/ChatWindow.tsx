"use client";
import React, { useEffect, useState, useRef } from "react";
import SenderTag from "./text/SenderTag";
import ReciverTag from "./text/ReciverTag";
import InputFormTag from "./text/InputFormTag";
import { startChart } from "~/server/chatGPT/chatgpt";
import { type MessageInterface } from "model";
import { extractNativeLanguageByLanguageCode } from "~/server/utils/helper";
import { useRouter } from "next/navigation";
import { HomeIcon } from "@heroicons/react/24/solid";

function ChatWindow({ nativeLanguageCode }: { nativeLanguageCode: string }) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [reciverloading, setReciverLoading] = useState<boolean>(true);
  const nativeLange = extractNativeLanguageByLanguageCode(nativeLanguageCode);
  const chatPropmt = `You are ai chat bot name Language Frieng you only talk with ${nativeLange} and resposne is always in ${nativeLange}`;

  useEffect(() => {
    feedModel(chatPropmt).catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === "user") {
        setReciverLoading(true);
      } else if (lastMessage && lastMessage.role === "assistant") {
        setReciverLoading(false);
      }
    }
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (reciverloading && loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [reciverloading]);

  const feedModel = async (chatPrompt: string) => {
    const sendObj: MessageInterface = {
      role: "system",
      content: chatPrompt,
      voiceUrl: null,
    };

    setMessages((prevMessages) => [...prevMessages, sendObj]);
    if (messages.length === 0) {
      try {
        const response = await startChart([...messages, sendObj]);
        const res = response as MessageInterface;
        res.voiceUrl = null;
        setMessages((prevMessages) => [...prevMessages, res]);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="flex h-screen flex-row justify-center">
      <div className="flex w-full flex-col justify-between gap-12  md:w-[550px]">
        <div
          className="mt-5 flex h-[75%] flex-col overflow-y-scroll px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="inline-block text-left md:hidden">
            <HomeIcon
              className="block h-8 w-8"
              aria-hidden="true"
              onClick={() => {
                router.push("/");
              }}
            />
          </div>
          {messages?.map((data: MessageInterface, index: number) => (
            <div
              key={index}
              ref={index === messages.length - 1 ? scrollRef : null}
            >
              {data.role === "user" && (
                <SenderTag
                  text={data.content}
                  audioUrl={data.voiceUrl}
                  index={index}
                  setMessages={setMessages}
                />
              )}
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
          {reciverloading && (
            <div ref={loaderRef} className="flex justify-start">
              <span className="chatLoader h-10 w-24 border-gray-500 text-black"></span>
            </div>
          )}
        </div>
        <InputFormTag setMessages={setMessages} chatHistory={messages} />
      </div>
      <div className="relative hidden text-left md:inline-block">
        <div className="ml-2 mt-2">
          <HomeIcon
            className="block h-8 w-8"
            aria-hidden="true"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
