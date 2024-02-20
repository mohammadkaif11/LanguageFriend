/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { uid } from "uid";
function BasisChat({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const router = useRouter();

  const handleChat = () => {
    const id = uid();
    router.push(`/chat/${id}`);
  };

  const handleLearningChat = () => {
    const id = uid();
    router.push(`/learning-chat/${id}`);
  };
  const handlePracticeChat = () => {
    const id = uid();
    router.push(`/learning-chat/${id}`);
  };

  return (
    <div className="relative mt-6 flex max-w-[500px] flex-col  rounded-xl bg-yellow-100 bg-clip-border text-gray-700 shadow-md ">
      <div className="p-4">
        <img
          className="float-left m-2 h-24 w-24  rounded-full"
          src="./bot2.png"
          alt=""
        />
        <h5 className="text-blue-gray-900 mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
          {title}
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {description}
        </p>
        <div className="float-right flex gap-2 pr-2 pt-2">
          <button
            onClick={handleChat}
            className="flex select-none items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:bg-yellow-300 active:bg-yellow-300 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Practice Language
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          </button>
          <button
            onClick={handleLearningChat}
            className="flex select-none items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:bg-yellow-300 active:bg-yellow-300 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
            type="button"
          >
            Learn Language
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasisChat;
