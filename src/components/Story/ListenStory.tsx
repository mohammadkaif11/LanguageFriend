import React from "react";
import { MicrophoneIcon } from "@heroicons/react/24/outline";

function ListenStory() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="underline">Listen the Story-:</h1>
      <div className="ml-4  flex w-full  justify-center rounded-lg border-2 border-gray-300 p-4">
        <MicrophoneIcon className="h-12 w-12" />
      </div>
    </div>
  );
}

export default ListenStory;
