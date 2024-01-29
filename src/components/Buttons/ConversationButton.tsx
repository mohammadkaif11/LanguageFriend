import React from "react";
import { PlayIcon } from "@heroicons/react/16/solid";

function ConversationButton() {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-200"
      >
        <span className="flex gap-2">
          Start Conversation <PlayIcon className="h-5 w-5" />
        </span>
      </button>
    </div>
  );
}

export default ConversationButton;
