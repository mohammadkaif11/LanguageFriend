import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import ContentEditable from "react-contenteditable";
import { startChart } from "~/server/chatGPT/chatgpt";
import { type MessageInterface } from "model";
import MicroPhone from "~/components/speech-text-js/MicroPhone";

interface InputFormTagProps {
  setMessages: React.Dispatch<React.SetStateAction<MessageInterface[]>>;
  chatHistory: MessageInterface[];
}

function InputFormTag(props: InputFormTagProps) {
  const [message, setMessage] = useState<string>();

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
      console.error("error", errors);
    }
  }

  return (
    <div className="relative flex h-[25%] w-full items-center justify-center rounded-t-[25%] bg-teal-200">
      <div className="relative flex flex-col items-center justify-center gap-2 p-4">
        <textarea
          rows={3}
          onChange={(e)=>{setMessage(e.target.value)}}
          cols={60}
          className="mt-[40px] block w-full rounded-lg border-2 border-gray-500  bg-transparent p-4 text-xl text-black"
          placeholder="Your message..."
        ></textarea>
        <button
          onClick={onMessageSend}
          className="flex w-20 items-center justify-center rounded-md  bg-yellow-200 text-xl text-black "
        >
          Send
          <PaperAirplaneIcon className="h-6 w-6" />{" "}
        </button>
      </div>
      <div className="absolute left-[42%] top-[-32px]">
        <MicroPhone setMessage={setMessage} />
      </div>
    </div>
  );
}

export default InputFormTag;
