"use client";
import React, { useEffect, useState } from "react";
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
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function ChatWindow({
  nativeLanguage,
  targetLanguage,
}: {
  nativeLanguage: string;
  targetLanguage: string;
}) {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<MessageLearningModelInterface[]>([]);
  const sceneId = searchParams?.get("sceneId");
  const [loading, setLoading] = useState<boolean>(true);
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
          console.log("res.content>>>>>>>", res.content);
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
        setLoading(true);
      } else if (lastMessage && lastMessage.role === "assistant") {
        setLoading(false);
      }
      console.log("Last message:", lastMessage);
    }
  }, [messages]);

  return (
    <div className="flex h-screen flex-row justify-center bg-green-400">
      <div className="flex w-full flex-col justify-between  bg-gray-600 md:w-[550px]">
        <div
          className="mt-5 flex flex-col overflow-y-scroll px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <Menu as="div" className="inline-block text-left md:hidden">
            <Menu.Button>
              {open ? (
                <XMarkIcon
                  className="block h-8 w-8"
                  aria-hidden="true"
                  onClick={() => {
                    setOpen(!open);
                  }}
                />
              ) : (
                <Bars3Icon
                  className="block h-8 w-8"
                  aria-hidden="true"
                  onClick={() => {
                    setOpen(!open);
                  }}
                />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-2 z-10 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    <button className="block px-4 py-2 text-sm text-gray-700">
                      Back
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {messages?.map(
            (data: MessageLearningModelInterface, index: number) => (
              <div key={index}>
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
          {loading && (
            <span className="chatLoader h-10 w-24 border-gray-500 text-black"></span>
          )}
        </div>
        <InputFormTag setMessages={setMessages} chatHistory={messages} />
      </div>
      <Menu as="div" className="relative hidden text-left md:inline-block">
        <Menu.Button className="ml-2 mt-2">
          {open ? (
            <XMarkIcon
              className="block h-8 w-8"
              aria-hidden="true"
              onClick={() => {
                setOpen(!open);
              }}
            />
          ) : (
            <Bars3Icon
              className="block h-8 w-8"
              aria-hidden="true"
              onClick={() => {
                setOpen(!open);
              }}
            />
          )}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0  z-10  w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                <button className="block px-4 py-2 text-sm text-gray-700">
                  Back
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default ChatWindow;
