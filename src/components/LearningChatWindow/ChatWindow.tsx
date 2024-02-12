"use client";
import React, { useEffect, useState } from "react";
import SenderTag from "./SenderTag";
import ReciverTag from "./ReciverTag";
import InputFormTag from "./InputFormTag";
import { useSearchParams } from "next/navigation";
import { startChart } from "~/server/chatGPT/chatgpt";
import { type MessageLearningModelInterface } from "model";
import { useSession } from "next-auth/react";
import { getFeedPrompt } from "~/server/chatGPT/PromptHelper";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function ChatWindow() {
  const searchParams = useSearchParams();
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [isLearningMode, setIsLearningMode] = useState(false);
  const [messages, setMessages] = useState<MessageLearningModelInterface[]>([]);
  const sceneId = searchParams?.get("sceneId");
  const characterId = searchParams?.get("characterId");
  const [loading, setLoading] = useState<boolean>(true);
  const nativeLanguageCode = session?.data?.user?.nativeLanguageSetting
    ? session?.data?.user?.nativeLanguageSetting
    : "en-US";
  const targetLanguageCode = session?.data?.user?.targetLanguageSetting
    ? session?.data?.user?.targetLanguageSetting
    : "en-US";
  const chatPropmt = getFeedPrompt(
    sceneId,
    nativeLanguageCode,
    targetLanguageCode,
    isLearningMode,
  );

  useEffect(() => {
    const sendObj: MessageLearningModelInterface = {
      role: "system",
      content: chatPropmt,
      nativeLanguage:null,
      targetLanguage:null,
      voiceUrl: null,
    };
    setMessages((prevMessages) => [...prevMessages, sendObj]);
    if (messages.length === 0) {
      startChart([...messages, sendObj])
        .then((response) => {
          const res = response as MessageLearningModelInterface;
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
          {messages?.map((data: MessageLearningModelInterface, index: number) => (
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
          {loading && (
            <span className="h-10 w-24 border-gray-500 text-black chatLoader">
            </span>
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