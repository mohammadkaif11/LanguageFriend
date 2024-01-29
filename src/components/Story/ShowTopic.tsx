import React from "react";

function ShowTopic() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="underline">Topic of Day-:</h1>
      <div className="ml-4 block w-full rounded-lg  border-2 border-gray-300 p-4">
        How to handle stress
      </div>
    </div>
  );
}

export default ShowTopic;
