"use client";
import React, { useEffect, useState, useRef } from "react";
import SenderTag from "./SenderTag";
import ReciverTag from "./ReciverTag";
import InputFormTag from "./InputFormTag";
import { useSearchParams } from "next/navigation";
import { startChart } from "~/server/chatGPT/chatgpt";
import {
  type MessageLearningModelInterface,
  type LearningObjectResponseInterface,
} from "model";
import { getNormalConversationFeedPrompt } from "~/server/prompt/prompt";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

function ChatWindow({
  nativeLanguage,
  targetLanguage,
}: {
  nativeLanguage: string;
  targetLanguage: string;
}) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const senderLoadingRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<MessageLearningModelInterface[]>([]);
  const sceneId = searchParams?.get("sceneId");
  const [reciverloading, setReciverLoading] = useState<boolean>(true);
  const [senderLoading, setSenderLoading] = useState<boolean>(false);
  const chatPropmt = getNormalConversationFeedPrompt(
    sceneId,
    nativeLanguage,
    targetLanguage,
  );

  useEffect(() => {
    const sendObj: MessageLearningModelInterface = {
      role: "system",
      content: chatPropmt,
      nativeLanguage: null,
      targetLanguage: null,
      voiceUrl: null,
    };
    setMessages((prevMessages) => [...prevMessages, sendObj]);
    if (messages.length === 0) {
      startChart([...messages, sendObj])
        .then((response) => {
          const res = response as MessageLearningModelInterface;
          const obj = JSON.parse(
            res.content,
          ) as LearningObjectResponseInterface;
          res.nativeLanguage = obj.inNativeLanguage ?? "";
          res.targetLanguage = obj.inTargetLanguage ?? "";
          res.voiceUrl = null;
          setMessages((prevMessages) => [...prevMessages, res]);
        })
        .catch((errors) => {
          console.log("error", errors);
        });
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === "user") {
        alert("user send");
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
    if (senderLoading && senderLoadingRef.current) {
      senderLoadingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [reciverloading, senderLoading]);

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
          {messages?.map(
            (data: MessageLearningModelInterface, index: number) => (
              <div
                key={index}
                ref={index === messages.length - 1 ? scrollRef : null}
              >
                {data.role === "user" && (
                  <SenderTag
                    text={data.content}
                    audioUrl={data.voiceUrl}
                    index={index}
                    nativeText={data.nativeLanguage}
                    targetText={data.targetLanguage}
                    setMessages={setMessages}
                  />
                )}
                {data.role === "assistant" && (
                  <ReciverTag
                    text={data.content}
                    audioUrl={data.voiceUrl}
                    index={index}
                    nativeText={data.nativeLanguage}
                    targetText={data.targetLanguage}
                    setMessages={setMessages}
                  />
                )}
              </div>
            ),
          )}
          {reciverloading && (
            <div ref={loaderRef} className="flex justify-start">
              <span className="chatLoader h-10 w-24 border-gray-500 text-black"></span>
            </div>
          )}
          {senderLoading && (
            <div ref={senderLoadingRef} className="flex justify-end">
              <span className="chatLoader h-10 w-24 border-gray-500 text-black"></span>
            </div>
          )}
        </div>
        <InputFormTag
          setMessages={setMessages}
          chatHistory={messages}
          setSenderLoading={setSenderLoading}
        />
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
