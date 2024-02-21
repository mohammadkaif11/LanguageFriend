"use client";
import React, { useEffect, useState,useRef } from "react";
import SenderTag from "./SenderTag";
import ReciverTag from "./ReciverTag";
import InputFormTag from "./InputFormTag";
import { useSearchParams } from "next/navigation";
import { startChart } from "~/server/chatGPT/chatgpt";
import { type MessageInterface } from "model";
import { useSession } from "next-auth/react";
import { getFeedPrompt } from "~/server/prompt/prompt";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function ChatWindow() {
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const session = useSession();
  const [open, setOpen] = useState(false);
  const [isLearningMode, setIsLearningMode] = useState(false);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const sceneId = searchParams?.get("sceneId");
  const characterId = searchParams?.get("characterId");
  const [reciverloading, setReciverLoading] = useState<boolean>(true);
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
    const sendObj: MessageInterface = {
      role: "system",
      content: chatPropmt,
      voiceUrl: null,
    };
    setMessages((prevMessages) => [...prevMessages, sendObj]);
    if (messages.length === 0) {
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
  return (
    <div className="flex h-screen flex-row justify-center">
      <div className="flex w-full flex-col justify-between gap-12  md:w-[550px]">
        <div
          className="mt-5 flex h-[75%] flex-col overflow-y-scroll px-2"
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
          {messages?.map((data: MessageInterface, index: number) => (
            <div key={index} ref={index === messages.length - 1 ? scrollRef : null}>
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
            {reciverloading && (
            <div ref={loaderRef} className="flex justify-start">
              <span className="chatLoader h-10 w-24 border-gray-500 text-black"></span>
            </div>
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
