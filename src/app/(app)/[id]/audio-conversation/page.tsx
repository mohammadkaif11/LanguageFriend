import React from "react";
import ChatWindow from "~/components/chat/audio/ChatWindow";

function page() {
  return (
    <div className="container mx-auto rounded-lg shadow-lg">
      <div className="flex flex-row justify-between bg-white">
        <ChatWindow/>
      </div>
    </div>
  );
}

export default page;
