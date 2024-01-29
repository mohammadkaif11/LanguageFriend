'use client'
import React from "react";
import { useRouter } from 'next/navigation'

function StartingCard({
  text,
  description,
  inputValue,
}: {
  text: string;
  description: string;
  inputValue: string;
}) {
  const router = useRouter()

  const handleClick = (input: string) => {
    router.push(`/${inputValue}`);
  };

  return (
    <button
      type="button"
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-800 focus:outline-none"
      onClick={()=>{handleClick(inputValue)}}
    >
      <svg
        className="mx-auto h-20 w-20 text-gray-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
        />
      </svg>
      <span className="mt-2 block text-sm font-semibold text-gray-900">
        {text}
      </span>
      <p className="mt-2 block text-sm font-normal	 text-gray-600">
        {description}
      </p>
    </button>
  );
}

export default StartingCard;
