import React, { useState, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import ContentEditable from "react-contenteditable";

import { startChart } from "~/server/chatGPT/chatgpt";
import { type MessageInterface } from "model";
import MicroPhone from "~/components/speech-text-js/MicroPhone";
import { useSession } from "next-auth/react";

interface InputFormTagProps {
  setMessages: React.Dispatch<React.SetStateAction<MessageInterface[]>>;
  chatHistory: MessageInterface[];
}

function InputFormTag(props: InputFormTagProps) {
  const [message, setMessage] = useState<string>();
  const session = useSession();

  async function onMessageSend() {
    if (!message) {
      return;
    }

    const userMessage: MessageInterface = {
      content: message,
      role: "user",
      voiceUrl: null,
    };

    const updatedChatHistory = [...props.chatHistory, userMessage];
    props.setMessages(updatedChatHistory);

    try {
      const response = await startChart(updatedChatHistory);
      const assistantMessage = response as MessageInterface;

      const updatedChatHistoryWithResponse = [
        ...updatedChatHistory,
        assistantMessage,
      ];
      props.setMessages(updatedChatHistoryWithResponse);
    } catch (errors) {
      console.log("error", errors);
    }
  }

  useEffect(() => {
    console.log("message changed", message);
  }, [message]);

  return (
    <div
      className="relative flex h-[25%] w-full items-center justify-center rounded-t-[25%]"
      style={{ background: "#93bfc9" }}
    >
      <div className="relative flex flex-col items-center justify-center gap-2 ">
        <ContentEditable
          tagName="div"
          html={message ?? "Hello!"}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className=" w-full p-4 text-xl text-black"
        />
        <button
          onClick={onMessageSend}
          className="flex w-20 items-center justify-center rounded-md  bg-yellow-200 text-xl text-black "
        >
          Send
          <PaperAirplaneIcon className="h-8 w-8" />{" "}
        </button>
      </div>
      <div className="absolute left-[42%] top-[-32px]">
        <MicroPhone setMessage={setMessage} />
      </div>
    </div>
  );
}

export default InputFormTag;
